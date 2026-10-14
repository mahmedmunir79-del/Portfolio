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
Replace the current animation in the `.pfd` block ("PRJ-150 · Fractionation Column — Vendor Network") with a short, video-like sequence built entirely in code: inline SVG + one GSAP timeline + ScrollTrigger. **No video files, no WebGL, no Lottie.** Use Context7 to check the current GSAP timeline, ease and ScrollTrigger docs before writing it.

**The story it tells:** *four international vendors come together to build one plant.* I lead the erection and execution of this plant, so the animation should feel like the project itself: vendors converge, the column is erected section by section, the plant is commissioned and comes to life, and the vendor network is shown around it. Every scene has a reason; nothing moves just for decoration.

**Scene 1: The vendors (~2.5 s)**
- The block's blueprint grid background fades in first, as a faint engineering-drawing feel.
- The four vendor logos pop in at their corner positions one after another (about 0.25 s apart): scale from 0.6 to 1 with a gentle overshoot (`back.out`), with the flag and country label sliding up just after each logo.
- Hold for about 1 second so each logo can be recognised.

**Scene 2: Convergence (~1.5 s)**
- Instead of a plain fade-out, each logo **shrinks and glides toward the centre** of the block (`power2.inOut`), dissolving into a small amber point of light as it travels.
- The four points meet at the column's base position and flash softly once. That flash is where the column will rise from.

**Scene 3: Erection (~3 s)**
Build the column the way a real one goes up on site, bottom to top:
- The bottom head and skirt draw first (SVG stroke drawing).
- Then each shell section **lowers into place from slightly above**, like a crane lift, with a tiny settle at the end (`power3.out`). Stack in order: bottom section with sump, packed bed 1, liquid distributor, packed bed 2, liquid distributor, packed bed 3, top head.
- **Packing:** draw each bed as structured packing, a fine diagonal crosshatch inside the shell. Distributors are thin horizontal bars with small drip points.
- Last, the **reboiler** (bottom, beside the sump) and the **condenser** (top) draw in with their connecting pipes. Pipes draw along their length as if being run.

**Scene 4: Commissioning (~3 s)**
Start the column up in the same order a real start-up follows:
1. **Heat on:** the reboiler glows warm, and bubbles start in the sump.
2. **Column heats up:** a warm-to-cool temperature gradient (amber at the bottom fading to a cool emerald/teal at the top, matching the site palette) **fills upward** inside the shell, like the temperature profile establishing.
3. **Vapour rises:** small soft dots travel up through the packing (slightly zig-zag, as if finding a path through it).
4. **Overhead and reflux:** when the first vapour reaches the top, the condenser activates (a subtle cool pulse), and then **liquid starts trickling down** through the packing as thin streaks, slower than the vapour.
This order (heat, vapour up, then reflux down) must be kept. It's what makes it read as a real column to an engineer.

**Scene 5: The network (~2 s)**
- The four arrows draw out from the column to the four corner positions (same layout as the current diagram), staggered about 0.2 s apart.
- As each arrow arrives, its logo, flag and country label pop back in at the arrow's end.
- A single soft pulse travels along each arrow once, then the arrows settle into the slow dashed "flow" style the current diagram uses.

**Resting state (after the sequence)**
- Only the gentle internal process keeps moving: bubbles in the sump, vapour rising, liquid trickling, and the slow dashed flow on the arrows. All of it is calm and slow. A visitor should be able to read the logos without being distracted.
- Particle limits so it stays light: about 12 vapour dots, 8 liquid streaks and 6 bubbles at once, recycled in loops.

**One interaction**
- Hovering over (or tapping, on a phone) a vendor logo highlights its arrow in amber and gently dims the other three. Moving away restores them. Nothing else is interactive.

**Behaviour**
- The sequence starts when the block is about 40% into view and plays **once**. After that it rests in the final state.
- A small, discreet **"Replay"** button (an icon with that word) sits in the bottom-left corner of the block and restarts the full sequence.
- Pause all motion when the block is off-screen.
- With `prefers-reduced-motion`: skip the sequence and show the final diagram with no motion.
- Keep the block's existing heading and caption text exactly as they are. **Don't add any new words or labels** inside the animation.
- Colours: use the site palette, emerald and amber, with the existing dark navy column body if it still fits.
- **Phone width:** scale the scene so logos stay readable. If they get too small, place two vendors above the column and two below instead of in the corners, and shorten the arrows to match.
- Animate only transform, opacity and SVG stroke drawing. Use GSAP core + ScrollTrigger only, with no other plugins unless they're free and genuinely needed.
- Timing guide: the full sequence is about 12 seconds. If it feels long when you watch it, tighten the holds rather than speeding up the motion.

### When Step 2 is done
- Push to `redesign-step1` and give me the updated deploy preview link.
- Give me a short screen recording or GIF of the fractionation sequence, plus before/after notes for the two fixes.
- List anything you weren't sure about.
- Wait for my review. Don't put anything on the live site.
