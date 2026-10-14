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
- **Step 2**: scroll fixes and the fractionation storyboard animation. Approved apart from the tweaks below. Not live yet.

## CURRENT TASK: Step 2b — four tweaks
Keep working on `redesign-step1`. Change only what's listed here; everything else stays as it is.

### Tweak 1: intro loading screen (like lusion.co)
Re-open https://lusion.co/ in Chrome and study **only its opening**: the short loading screen and the way it hands over to the site. Recreate that feel in lightweight code (no WebGL, no video).

**Sequence (2.5–3 s total, never longer):**
1. **Loader (~1.5 s):** full-screen panel in the site's dark navy with a thin emerald progress bar or counter (0 → 100). While it fills, short goofy engineering lines **roll up one after another** (each slides up into view and out, like an odometer or ticker):
   - "Heating up the reboiler…"
   - "Establishing reflux…"
   - "Checking the mass balance…"
   - "Venting the last bit of steam…"
2. **Final line (~0.6 s):** the ticker stops on **"Let's blow off some steam together."** in larger text, held briefly.
3. **Zoom reveal (~0.6 s):** that line **zooms toward the viewer** (scales up and fades) while the panel opens (splits or wipes away), and the portfolio appears behind it with a slight settle from 1.04 to 1.0 scale. The hero then plays its normal entrance.

**Rules for the loader:**
- Show it **once per visit** (use `sessionStorage`). Reloads within the same visit go straight to the site.
- Any click, tap, scroll or key press **skips** it immediately.
- Never block the page longer than 3 s, even on slow connections. If assets are still loading, reveal anyway.
- With `prefers-reduced-motion`: just a quick fade, no rolling or zoom.
- Use the site's existing fonts and palette. The lines above are the only new text; use them exactly.

### Tweak 2: thicker scroll line
- The flowing scroll line is too thin. Compare it with the line on lusion.co and make it clearly bolder: about **3–4 px on desktop and 2.5–3 px on phones**, with rounded ends.
- Scale the tip marker dot to match. Keep the current colour, speed and path.

### Tweak 3: fractionation animation loops continuously
- **Remove the Replay button** completely.
- The full storyboard sequence (vendors → convergence → erection → commissioning → network) now **loops forever** while the block is on screen: after Scene 5, hold the finished diagram for about 2.5 s, fade the scene out gently, and restart from Scene 1. There must be no jump or flash at the restart.
- Still **pause when off-screen** and resume when it comes back into view.
- **Shorten Scene 1 (vendors):** the logos pop in faster (about 0.12 s apart, each pop about 0.35 s) with a short hold of about 0.4 s. The whole scene should take about 1.2 s instead of 2.5 s. Tighten the other holds slightly so one loop runs about 9–10 s.
- With `prefers-reduced-motion`: show the final diagram, static, with no loop.

### Tweak 4: chemical-engineering doodle background in the fractionation block
- Replace the plain white/blank background of the `.pfd` block with a **WhatsApp-chat-style doodle pattern**: many small, scattered line icons of chemical-engineering equipment in a P&ID / hand-drawn style:
  - distillation column, shell-and-tube heat exchanger, centrifugal pump, valve (bow-tie), storage tank, reactor with agitator, cooling tower, flask, pressure gauge, compressor, cyclone, pipe elbow.
- Draw them as simple thin-stroke SVG icons, varied in size (about 24–40 px) and rotation, spread unevenly so it looks hand-scattered rather than grid-like. Build it as one repeating SVG tile so it's light.
- Keep it **very faint** (about 6–10% opacity, in the navy or emerald tone) so the column, arrows and logos remain the clear focus and stay readable.
- **Subtle motion:** the pattern drifts very slowly (one full tile every 40–60 s), and a few icons gently bob or rotate a few degrees. Calm, never busy. Off for `prefers-reduced-motion`; paused when off-screen.
- This replaces the faint blueprint grid from Step 2. Scene 1 should now fade in the doodle pattern instead.

### When Step 2b is done
- Push to `redesign-step1` and send me the deploy preview link.
- Send a short GIF of the loader and one loop of the fractionation animation.
- One short list: what changed and anything you weren't sure about. Nothing else.
- Wait for my review. Don't put anything on the live site.
