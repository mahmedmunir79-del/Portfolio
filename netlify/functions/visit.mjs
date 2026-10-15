// Anonymous visit alert.
// page ping → this function (adds city/country, filters bots) → Google Apps Script → one Gmail to the owner.
// Never reads or forwards the visitor's IP address, never forwards the raw User-Agent, sets no cookies.

const SITE = "mahmedmunir-portfolio.netlify.app";
const BOTS = /bot|crawl|spider|slurp|preview|headless|lighthouse|facebookexternalhit|whatsapp|telegrambot|discordbot|slack|skype|embedly|quora|pinterest|vkshare|w3c_validator|curl|wget|python|axios|node-fetch|go-http|java\/|okhttp|postman|insomnia|phantom|puppeteer|playwright|selenium|applebot|bingpreview|linkedinbot|twitterbot|googlebot|bingbot|yandex|baiduspider|duckduckbot|semrush|ahrefs|mj12bot|dotbot|petalbot|bytespider|gptbot|claudebot|ccbot|perplexity/i;
const REF_TAGS = { cv: "My CV", linkedin: "My LinkedIn profile", email: "A link I emailed" };
const REFERRERS = [
  [/(^|\.)google\./, "Google search"], [/(^|\.)bing\.com$/, "Bing search"], [/(^|\.)duckduckgo\.com$/, "DuckDuckGo search"],
  [/(^|\.)yahoo\./, "Yahoo search"], [/(^|\.)(linkedin\.com|lnkd\.in)$/, "LinkedIn"], [/(^|\.)(whatsapp\.com|wa\.me)$/, "WhatsApp"],
  [/(^|\.)(facebook\.com|fb\.com|messenger\.com)$/, "Facebook"], [/(^|\.)instagram\.com$/, "Instagram"],
  [/(^|\.)(t\.co|twitter\.com|x\.com)$/, "X (Twitter)"], [/(^|\.)github\.com$/, "GitHub"],
  [/(^|\.)(mail\.google\.com|outlook\.(live|office)\.com|mail\.yahoo\.com)$/, "Webmail link"],
  [/(^|\.)(teams\.microsoft\.com|teams\.live\.com)$/, "Microsoft Teams"]
];

const allowedOrigin = (value) => {
  try { const h = new URL(value).hostname; return h === SITE || h.endsWith("--" + SITE); } catch { return false; }
};
const clean = (v, max, re) => (typeof v === "string" ? v.replace(re, "").slice(0, max) : "");

function device(ua) {
  const os = /windows/i.test(ua) ? "Windows" : /iphone|ipad|ipod/i.test(ua) ? "iOS" : /android/i.test(ua) ? "Android"
    : /mac os x|macintosh/i.test(ua) ? "macOS" : /cros/i.test(ua) ? "ChromeOS" : /linux/i.test(ua) ? "Linux" : "Other OS";
  const type = /ipad|tablet|(android(?!.*mobile))/i.test(ua) ? "Tablet" : /mobi|iphone|ipod|android/i.test(ua) ? "Phone" : "Laptop/Desktop";
  const browser = /edg\//i.test(ua) ? "Edge" : /opr\/|opera/i.test(ua) ? "Opera" : /samsungbrowser/i.test(ua) ? "Samsung Internet"
    : /firefox|fxios/i.test(ua) ? "Firefox" : /chrome|crios/i.test(ua) ? "Chrome" : /safari/i.test(ua) ? "Safari" : "Other browser";
  return { type, os, browser };
}

function foundVia(ref, referrer) {
  if (ref) return REF_TAGS[ref.toLowerCase()] || "Tag: " + ref;
  if (referrer) {
    for (const [re, label] of REFERRERS) if (re.test(referrer)) return label;
    return referrer;
  }
  return "Direct (typed or bookmarked)";
}

function formatTime(date, timeZone, withZone) {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-GB", {
    timeZone, weekday: "short", day: "2-digit", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true
  }).formatToParts(date).map((x) => [x.type, x.value]));
  return `${p.weekday} ${p.day} ${p.month} ${p.year}, ${p.hour}:${p.minute} ${(p.dayPeriod || "").toUpperCase()}${withZone ? " " + withZone : ""}`;
}

const flag = (code) => (/^[A-Z]{2}$/.test(code || "") ? String.fromCodePoint(...[...code].map((c) => 0x1f1a5 + c.charCodeAt(0))) : "");

async function forward(payload) {
  const url = Netlify.env.get("VISIT_WEBHOOK_URL"), secret = Netlify.env.get("VISIT_WEBHOOK_SECRET");
  if (!url || !secret) { console.log("visit: env missing", !!url, !!secret); return; }
  try {
    const r = await fetch(url, {
      method: "POST", headers: { "content-type": "application/json" }, redirect: "manual",
      body: JSON.stringify({ ...payload, secret }), signal: AbortSignal.timeout(3000)
    });
    console.log("visit: forwarded", r.status);
  } catch (e) { console.log("visit: forward failed", e && e.name); }
}

export default async (req, context) => {
  const done = new Response(null, { status: 204 });
  try {
    if (req.method !== "POST") return done;
    if (!allowedOrigin(req.headers.get("origin") || req.headers.get("referer") || "")) return done;
    const ua = req.headers.get("user-agent") || "";
    if (!ua || BOTS.test(ua)) return done;
    const raw = await req.text();
    if (raw.length > 2048) return done;
    const d = JSON.parse(raw || "{}");

    const ref = clean(d.ref, 30, /[^A-Za-z0-9-]/g);
    const referrer = clean(d.referrer, 80, /[^a-z0-9.-]/gi).toLowerCase();
    const now = new Date();
    const geo = context.geo || {};
    const { type, os, browser } = device(ua);
    const preview = d.isPreview === true || (context.deploy && context.deploy.context && context.deploy.context !== "production");

    const payload = {
      preview,
      when: formatTime(now, "Asia/Karachi", "PKT"),
      flag: flag(geo.country && geo.country.code),
      city: geo.city || "Unknown city",
      region: (geo.subdivision && geo.subdivision.name) || "",
      country: (geo.country && geo.country.name) || "Unknown country",
      device: type, os, browser,
      foundVia: foundVia(ref, referrer),
      page: clean(d.page, 100, /[^A-Za-z0-9/_.\-]/g) || "/",
    };
    context.waitUntil(forward(payload)); // answer the browser immediately; email is sent in the background
  } catch (e) { console.log("visit: handler error", e && e.name); }
  return done;
};

export const config = { path: "/api/visit" };
