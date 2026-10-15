# Portfolio Redesign — Ahmed Munir

## Project context
- Live site: https://mahmedmunir-portfolio.netlify.app/
- Hosting: Netlify (site: mahmedmunir-portfolio). Source code is also on GitHub: https://github.com/mahmedmunir79-del/Portfolio
- Work from the GitHub repo as the source of truth. Use the Netlify connector to check how the site is deployed (is it linked to the GitHub repo for auto-deploys, or uploaded manually?) and tell me what you find before deploying anything.
- Owner: Ahmed, a chemical/process engineer, not a web developer. Explain anything I need to do in plain, step-by-step language.
- Current sections: About, Experience, Projects, Awards, Education, Contact.

## Tools to use
- **Chrome (Claude in Chrome):** open and study the live site and the reference site. Take screenshots before and after your changes.
- **Context7:** look up current GSAP / Motion docs before writing animation code. Don't rely on memory for library APIs.
- **frontend-design skill:** use it if it's available.
- **Netlify connector:** deploy previews only (see the rules below).

## How to report back (important)
- Keep chat messages short. Only send what I need: questions you must ask, the preview link, and a brief list of what changed. No step-by-step narration, no long explanations, no repeating these instructions back to me.

## Rules (apply to every step)
1. **Content fidelity:** keep all my existing text, project details, dates and names exactly as they are. Don't rewrite, shorten, or invent content. If something looks wrong, ask me; don't fix it silently.
2. **No video:** no video files, background videos, or heavy media. All motion is code (CSS, SVG, GSAP or Motion).
3. **Restrained motion:** the site should feel modern, not busy. Every animation must have a purpose.
4. **Not dull:** use a vibrant but professional palette with one strong main colour and one accent on a clean background. Propose the palette to me before applying it site-wide.
5. **Accessibility:** respect `prefers-reduced-motion` (animations off or minimal) and keep text contrast readable.
6. **Performance:** the site must stay fast. Animate only transform and opacity where possible, and load libraries from a CDN or npm with no bloat.
7. **Mobile:** everything must work and look good at phone width. Scroll animations must not stutter on mobile.
8. **Safe deploys:** work on a separate branch and give me a Netlify deploy preview link. Never deploy to the live site without my explicit "yes."
9. **Vendor content is fixed:** the four vendors (Desmet and JJ-Lurgi, Malaysia; CMB and Technoilogy, Italy), their logos in `images/` and their flags must stay exactly as they are. Don't add product names or labels to the column that I haven't given you.

---

## DONE
- **Step 1** (branch `redesign-step1`): card layout, emerald/amber palette, scroll line and grow effects.
- **Step 2 + 2b**: scroll fixes, intro loader, thicker line, looping fractionation storyboard, doodle background.
- **Step 3**: PRJ-05 Project Tracker Automation motion piece.
- **Step 4**: PRJ-05 title fix + PRJ-04 CI Idea Portal motion piece. Approved. Not live yet.

## CURRENT TASK: Step 5 — anonymous visit alerts to my Gmail
Keep working on `redesign-step1`. Don't change anything visual on the site.

### Goal
Every time someone opens my portfolio, I get **one email in my Gmail** within a minute, saying roughly where they are, what device they used, and how they found the site. Visitors see nothing: no banner, no pop-up, no sign-in, no change to the page.

### Hard rules for this step
1. **No cookies, no consent banner, no login, and no visible notice or statement of any kind.** Don't add a privacy line, footer text, badge or anything else to the page. This is my decision.
2. **Anonymous only.** Never store, log or email the visitor's IP address. No fingerprinting, no persistent visitor IDs, no third-party analytics or tracking scripts. Location is city/country only, taken from Netlify's built-in geo data.
3. **Zero visual or performance impact.** The client code is a few lines, runs after the page has loaded, never blocks rendering, never shows an error to the visitor, and fails silently if anything goes wrong.
4. **No new paid services and no npm dependencies.** Netlify Functions (free tier) + a Google Apps Script under my own Google account. Nothing else.
5. **My email address must not appear anywhere in the repo or the site code.** The repo is public.

### Architecture
`page load → tiny client ping → Netlify Function (adds location, filters bots) → Google Apps Script web app (secret-protected) → Gmail to me`

**1. Client ping (inline script at the end of `index.html`)**
- Runs once per browser tab session: use `sessionStorage` so refreshes and in-page scrolling don't send repeats. Fire it after the `load` event (with `requestIdleCallback` where available) so it never competes with the intro loader or animations.
- Sends with `navigator.sendBeacon('/api/visit', …)` (fall back to `fetch` with `keepalive: true`). Payload, all non-identifying:
  - `ref`: the `?ref=` tag (see the three links below), or none;
  - `referrer`: the **domain only** of `document.referrer` (e.g. `linkedin.com`), never the full URL;
  - `page`: the path;
  - `lang`, `tz` (browser timezone), and `screen` as width×height;
  - `isPreview`: true when the host isn't the production domain.
- After reading `ref`, **remove it from the address bar** with `history.replaceState`, so the URL looks clean and a visitor who forwards the link doesn't get mis-tagged as "via CV".
- **Skip the ping** if `navigator.webdriver` is true, or if the owner flag is set (below).
- **Owner exclusion:** visiting the site once with `?owner=on` sets `localStorage['skipVisitPing']='1'` on that device, and `?owner=off` removes it. Wrap all storage access in try/catch. This is how I stop my own visits from emailing me; explain it to me in plain steps.

**2. Netlify Function: `netlify/functions/visit.mjs`**
- Modern Netlify Functions format (default export `async (req, context)`, `export const config = { path: "/api/visit" }`). Check the current Netlify Functions docs (Netlify connector / Context7) before writing it; don't rely on memory.
- Accept **POST only** and bodies under 2 KB; return `204` with no body in every case, even errors, so nothing leaks.
- Basic abuse guard: reject requests whose `Origin`/`Referer` isn't my site (production or deploy-preview domains).
- **Bot filter:** drop the request if the User-Agent matches common bots and link-preview crawlers (googlebot, bingbot, linkedinbot, facebookexternalhit, whatsapp, twitterbot, slackbot, telegrambot, discordbot, applebot, headless, crawler, spider, preview, and similar).
- Location from `context.geo`: city, region/subdivision, country name and flag emoji. **Don't read or forward `context.ip`.**
- Parse the User-Agent **with simple regexes, no libraries**, into device type (Phone / Tablet / Laptop-Desktop), OS (Windows, macOS, iOS, Android, Linux) and browser (Chrome, Edge, Safari, Firefox, Samsung Internet, Opera, other). Forward only those parsed labels, never the raw UA string.
- **"How they found it"**, in priority order: the whitelisted `ref` tag (`cv` → "My CV", `linkedin` → "My LinkedIn profile", `email` → "A link I emailed"; any other value → `Tag: <value>`, sanitised to letters/numbers/dashes, max 30 chars); otherwise the referrer domain (e.g. "Google search", "LinkedIn", "WhatsApp"); otherwise "Direct (typed or bookmarked)".
- Visit time formatted in **Pakistan time (Asia/Karachi)**, e.g. `Thu 15 Oct 2026, 11:58 AM PKT`, plus the visitor's own local time from their `tz`.
- POST the result to the Apps Script URL from env var `VISIT_WEBHOOK_URL`, including the shared secret from env var `VISIT_WEBHOOK_SECRET`. Use a 3-second timeout. If the env vars are missing, do nothing.
- Add a `netlify.toml` (or update it) so the functions folder is picked up, and **confirm the function actually deploys** with the way this site is deployed (you checked that in Step 1). If manual drag-and-drop deploys can't carry functions, tell me and give me the simplest fix.

**3. Google Apps Script web app (I set this up; you write the code and the guide)**
- Put the script in `tools/visit-alert-apps-script.gs` in the repo, with **no email address and no secret written in it**:
  - `doPost(e)` checks the secret against a **Script Property** (`VISIT_SECRET`) and silently ignores mismatches.
  - It sends the email with `MailApp.sendEmail` to `Session.getEffectiveUser().getEmail()`, i.e. the account that owns the script (me), so no address is ever typed.
- **Email format** (plain and clean; an HTML version with a simple card layout is fine):
  - **Subject:** `👀 Portfolio visit — {City}, {Country} · {How they found it}`. Prefix `[PREVIEW] ` for deploy-preview visits.
  - **Body:**
    - When: {PKT time} (their local time: {local time})
    - Where: {flag} {City}, {Region}, {Country}
    - Device: {device} · {OS} · {browser} · {screen}
    - Found via: {how they found it}
    - Page: {path}
    - Language: {lang}
    - Footer: "Anonymous visit alert from your portfolio. IP addresses are not collected."
- **Write me a numbered, plain-English setup guide** (no jargon; I'm not a developer), covering:
  1. Opening script.google.com with my Gmail account and creating the project.
  2. Pasting the code.
  3. Adding the Script Property `VISIT_SECRET` (you generate a strong random value and tell me what to paste).
  4. Deploy → New deployment → Web app, "Execute as: Me", "Who has access: Anyone", and what to click on Google's "unverified app" warning (it's my own script, so "Advanced → Go to project" is expected).
  5. Copying the web app URL.
  6. Adding `VISIT_WEBHOOK_URL` and `VISIT_WEBHOOK_SECRET` in Netlify. **Do this for me with the Netlify connector if you can**; if you can't, give me click-by-click steps.

### The three tagged links (generate these exactly)
- CV PDF: `https://mahmedmunir-portfolio.netlify.app/?ref=cv`
- LinkedIn profile: `https://mahmedmunir-portfolio.netlify.app/?ref=linkedin`
- Emails/messages I send: `https://mahmedmunir-portfolio.netlify.app/?ref=email`
(If the production domain has changed, use the current one and tell me.)

### Test before reporting back
On the deploy preview, confirm each of these:
1. A normal visit sends exactly one `[PREVIEW]` email.
2. A refresh in the same tab sends no second email.
3. `?ref=cv`, `?ref=linkedin` and `?ref=email` each show the right "Found via" line, and the tag disappears from the address bar.
4. `?owner=on` stops emails from that browser, and `?owner=off` restores them.
5. A request with a bot User-Agent (e.g. `LinkedInBot`) sends nothing.
6. The page looks and performs exactly as before: intro loader, scroll line and all three animations untouched, with no console errors.

### When Step 5 is done
- Push to `redesign-step1` and send me: the preview link, the three tagged links, and the Apps Script setup guide.
- One short list: what changed and anything you weren't sure about. Nothing else.
- Don't put anything on the live site until I say "yes". The alerts only start for real visitors once it goes live.
