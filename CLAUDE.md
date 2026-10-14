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

## DONE: Step 1 (branch `redesign-step1`)
Card layout, emerald/amber palette, scroll line and grow effects. Approved apart from the two fixes in Step 2. Not live yet.

## CURRENT TASK: Step 2 — two scroll fixes + fractionation animation rebuild
Keep working on the `redesign-step1` branch. Change only what's listed below. Everything else from Step 1 stays as it is.

### Fix 1: the scroll line is too fast
- Problem: the flowing line races down the page ahead of me, reaching the bottom of the screen before I've scrolled there.
- Fix: the line must draw **in step with my reading position**. Its tip should stay level with about the middle of the screen as I scroll, never ahead of the content I'm looking at.
- Tie it directly to scroll (GSAP ScrollTrigger `scrub`, with light smoothing so it glides rather than jumps). Check the start/end points against the full page height so the line finishes exactly at the end of the last section, not early.
- Test it on desktop and phone width by scrolling slowly and quickly. The tip must never run ahead.

### Fix 2: add the contract/expand effect (like lusion.co)
- What's missing: on lusion.co, content you've scrolled past **shrinks slightly** as it leaves the top of the screen, and content coming up from below **grows** into place. We currently only have part of this.
- Build both directions, tied to scroll (`scrub`):
  - **Entering from below:** a section/card starts slightly smaller (about 92–94% size) and slightly faded, and grows to full size as it reaches the middle of the screen.
  - **Leaving at the top:** as it scrolls up past the top, it shrinks back slightly (to about 94%) and fades a little.
- Subtle, not dramatic. Use transform and opacity only, with no layout shifts and no overlapping text.
- On phones, use a smaller amount (about 97%) so it stays smooth. With `prefers-reduced-motion`, turn it off.
- Check that the existing card hover effects still work alongside it.

### Rebuild: the fractionation "vendor network" animation
Replace the current animation in the `.pfd` block ("PRJ-150 · Fractionation Column — Vendor Network") with a short, video-like sequence built entirely in code (SVG + GSAP timeline). **No video files.** Use Context7 to check the current GSAP timeline and ScrollTrigger docs before writing it.

**Sequence (about 8–10 seconds in total):**
1. **Logos intro (~3 s):** the four vendor logos pop in one after another (scale up from small, with a slight overshoot), each with its flag and country label. Hold briefly, then all four fade away together.
2. **Column builds (~3 s):** the fractionation column appears in the centre. The outline draws itself, then the internals fade in:
   - **Packed beds** (two or three sections of structured packing, drawn as a fine crosshatch or angled pattern) with liquid distributors above each bed.
   - **Reboiler** at the bottom and **condenser** at the top.
   - A **temperature gradient** inside the shell, warm orange at the bottom fading to cool blue at the top.
3. **Process running (continuous):**
   - **Vapour** rising up through the packing as small soft dots or wisps.
   - **Liquid** trickling down through the packing as thin streaks.
   - **Bubbling** in the bottom sump/reboiler, where the liquid is boiling.
   - Keep it calm and slow, not busy.
4. **Vendor network returns (~2 s):** the four arrows draw out from the column, one to each vendor, in the same positions as the current diagram. Each logo, flag and country label reappears at the end of its arrow as the arrow arrives.

**Behaviour:**
- The sequence starts when the block scrolls into view and plays **once**. After that it rests on the final diagram, with only the gentle internal flow (vapour, liquid, bubbles) continuing.
- Add a small, discreet **"Replay"** button in the corner of the block to play the full sequence again.
- Pause all motion when the block is off-screen, to save battery.
- With `prefers-reduced-motion`, skip the sequence and show the final diagram with no motion.
- Keep the block's existing heading and caption text exactly as they are.
- Use the site's palette (emerald and amber) for the column and arrows so it matches the rest of the site.
- It must look good and stay readable at phone width. The logos can stack or scale down on small screens.

### When Step 2 is done
- Push to `redesign-step1` and give me the updated deploy preview link.
- Give me a short screen recording or GIF of the fractionation sequence, plus before/after notes for the two fixes.
- List anything you weren't sure about.
- Wait for my review. Don't put anything on the live site.
