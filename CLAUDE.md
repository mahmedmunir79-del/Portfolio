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
- **Step 2 + 2b**: scroll fixes, intro loader, thicker line, looping fractionation storyboard, doodle background. Not live yet.

## CURRENT TASK: Step 3 — motion design for "Project Tracker Automation" (PRJ-05)
Keep working on `redesign-step1`. Replace the "Animation coming soon" placeholder (`.ph` box in the PRJ-05 card) with a looping, code-only motion piece. Change nothing else on the site. **The Power Apps card (CI Idea Portal) keeps its placeholder for now.**

**Reference:** `design-refs/automation-flow-ref.png` is the real flow diagram I made for this automation. Open it and study it. Use **only the middle diagram** (the four stages and their cards). **Ignore its header, the four stat boxes and the footer.** Some characters in the image are garbled by encoding: `Â·` means `·` and `â†'` means `→`.

**Same tech and rules as the fractionation piece:** inline SVG + one GSAP timeline + ScrollTrigger (already loaded from cdnjs). No video, no WebGL, no Lottie, no new libraries. Check GSAP docs with Context7. Animate transform, opacity and SVG stroke only.

### The story
*Every morning at 08:00, a system I built reads the project schedule, decides who needs a reminder, emails them and logs it, with nobody touching it.* The viewer should come away thinking: "he designed an automated system end to end."

### Exact text to use (from my diagram; don't add, reword or invent labels)
- **Title (Scene 1):** "Automated Deadline Reminders"
- **Stage labels:** 1 PLAN & EXPORT · 2 TRIGGER & READ · 3 DECIDE & DE-DUPLICATE · 4 NOTIFY & LOG
- **Stage 1:** Project Schedule — MS Project · 129 tasks | ExportTasksToExcel — Macro · one-click sync | Project_Tasks.xlsx — OneDrive · tasks + settings
- **Stage 2:** Recurrence — Daily · 08:00 | List Settings — Window, recipients | List Tasks — Live schedule | List Log — Already reminded
- **Stage 3:** Filter Eligible — Open · active · real dates | For each candidate — Overdue · Due today · Due soon (dark card) | Filter Prior Sends — No duplicate reminders
- **Stage 4:** Digest Mode — Switch · from settings (dark card) → Send Digest [TRUE] — One daily summary email / Send Each Task [FALSE] — Email to each task owner → Add a row · Reminder Log — Every reminder logged · failures retried
- Icons as in the reference: simple coloured letter tiles (P green, VBA purple, X green for Excel, clock blue, {x} violet, loop icon, envelope blue, switch icon). **Don't use real Microsoft logo artwork**; the letter tiles are enough.

### Scene 1: Title zoom (~1.8 s)
- The block starts dark navy. "Automated Deadline Reminders" starts small and slightly blurred in the distance and **zooms toward the viewer** to full size (`expo.out`).
- Three small line icons **snap onto the words** as they land, each with one tiny reaction:
  - an **alarm clock** on the first word, which rings (a quick shake with two little sound arcs);
  - a **lightning bolt** (automation/power) near the middle, which flashes once with a brief amber glow;
  - an **envelope** on the last word, whose flap opens and closes.
- Two or three small 4-point sparkles twinkle around the title.
- Transition: the whole title keeps zooming past the viewer (scale up + fade), and the background flips to the light dotted canvas of Scene 2.

### Scene 2: The flow builds (~3 s)
Recreate the reference diagram's layout: four rows, white cards with a coloured left edge and soft shadow, a dotted-grid background, and the small "+" connector circles on the arrows.
- **Row by row, left to right:** the stage badge (number circle + label) pops first, then each card **pops in** (scale 0.85→1, slight `back.out`, about 0.12 s apart). Between cards, the **arrow draws itself** and its "+" circle pops when the line passes it.
- The connector that drops from the end of one row to the start of the next **draws along its full elbow path**, so the eye follows the flow down.
- Rhythm: 3 cards → 4 cards → 3 cards → the stage 4 branch. Row 4: Digest Mode appears, the line **splits** into the TRUE and FALSE branches, then both **merge** into Reminder Log.
- The whole build takes about 3 seconds: quick but readable.

### Scene 3: The system runs (~3 s)
Now show it working. A single **glowing pulse** (a bright emerald dot with a short sparkle trail) travels the whole path from Project Schedule to Reminder Log. As it reaches each card, that card **lights up briefly** (border glow + a small tick on the icon).
- **Recurrence:** the clock icon's hands sweep round and stop at 08:00, with a small ring. This is the trigger, so the pulse "launches" from here with a little burst.
- **For each candidate:** its loop icon spins once, and the pulse **splits into three small dots** in red, amber and green (Overdue, Due today, Due soon).
- **Filter Prior Sends:** one of the three dots is **filtered out** (it fades with a tiny ✕). This visibly shows the de-duplication.
- **Digest Mode:** the switch icon **flips**, and the pulse takes **one branch**. **Alternate each loop:** TRUE (Send Digest) on one loop, FALSE (Send Each Task) on the next, so both paths get shown over time. The unused branch dims.
- **Reminder Log:** a "+1" row slides into the Excel tile, with a soft sparkle.

### Scene 4: Delivery (~3 s)
- The camera **pulls back**: the whole flow diagram shrinks and settles into the **screen of a PC monitor** in the centre of the block. On the monitor's stand or corner sits a small **lightning-bolt automation badge** that pulses: this is the system running by itself.
- From the monitor, **envelopes fly out** along curved dotted paths to **three generic person avatars** (simple head-and-shoulders circles, no names, no faces) placed around it. The envelopes are staggered and slightly arc-shaped, as if they were thrown.
- As each envelope lands, its avatar gets a small **notification dot / check mark** and a tiny sparkle burst.
- On the alternating "digest" loop, send **one** envelope to one avatar instead (one daily summary), so it matches the branch that was taken in Scene 3.

### Loop
- Hold the delivered state for about 1.2 s, fade the whole scene out gently, and restart at Scene 1. No jump or flash at the restart. **One loop ≈ 11–12 s.**
- Loops forever **only while visible**; pauses when off-screen and resumes when back. No Replay button.
- `prefers-reduced-motion`: show the finished Scene 2 diagram, static.
- Effects budget, to stay light and calm: at most about 12 sparkles on screen at once, one pulse trail, and no continuous background motion beyond a very faint dotted grid.

### Size and layout
- 13 cards won't be readable in a small card thumbnail. **Make the PRJ-05 card span the full width of the projects grid** on desktop, with the animation box at roughly 16:9 above the existing text. Tell me if this upsets the grid, and suggest an alternative.
- **Phones:** turn the flow into a **single vertical column** (stage badge, then that stage's cards stacked, arrows pointing down), using the same order and timing. Scene 1 and Scene 4 work as they are, just scaled. Text must stay readable; shorten nothing.
- Colours: keep the reference's product colours for the icon tiles so they stay recognisable; everything else (pulse, glows, sparkles, title) uses the site's emerald/amber palette.
- The card's existing number, heading, description and footer text stay exactly as they are.

### When Step 3 is done
- Push to `redesign-step1` and send the deploy preview link.
- Send a short GIF covering two loops (so both the TRUE and FALSE branches show).
- One short list: what changed and anything you weren't sure about. Nothing else.
- Wait for my review. Don't put anything on the live site.
