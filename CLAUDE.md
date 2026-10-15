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

**Reference:** `design-refs/automation-flow-ref.png` is the real flow diagram I made for this automation. Open it and study it. Use **only the middle diagram** as the source of the flow's logic. **Ignore its header, the four stat boxes and the footer.** Some characters in the image are garbled by encoding: `Â·` means `·` and `â†'` means `→`.

**Same tech and rules as the fractionation piece:** inline SVG + one GSAP timeline + ScrollTrigger (already loaded from cdnjs). No video, no WebGL, no Lottie, no new libraries. Check GSAP docs with Context7. Animate transform, opacity and SVG stroke only.

### The story
*Every morning at 08:00, a system I built reads the project schedule, decides who needs a reminder, emails them and logs it, with nobody touching it.* The viewer should come away thinking: "he designed an automated system end to end."

### Simplify the diagram (creative freedom)
Don't reproduce all 14 cards. **Distil the flow to its 7 key moments**, shown as compact **chips** (icon tile + title only, no subtitles, no stage badges) strung along **one flowing path** that gently curves or snakes, rather than the rigid four-row grid. Aim for aesthetics over completeness: the viewer should grasp the idea in a glance.

The 7 chips, in order (titles exactly as in my diagram):
1. **Project Schedule** (P tile, green): the source.
2. **Project_Tasks.xlsx** (X tile, Excel green): the export lands here. The VBA macro is shown as a tiny "VBA" spark riding the arrow between 1 and 2, not as its own chip.
3. **Recurrence** (clock tile, blue): the daily trigger.
4. **For each candidate** (loop tile, dark chip): where it splits into three.
5. **Filter Prior Sends** ({x} tile, violet): de-duplication.
6. **Digest Mode** (switch tile, dark chip): one chip with a small TRUE/FALSE toggle on it, instead of two branch cards.
7. **Reminder Log** (X tile, Excel green): the end of the line.

Icons: simple coloured letter/glyph tiles as in the reference. **Don't use real Microsoft logo artwork.** No other text inside the animation besides these titles, the Scene 1 title, and "08:00".

### Scene 1: Title zoom (~1.8 s)
- The block starts dark navy. "Automated Deadline Reminders" starts small and slightly blurred in the distance and **zooms toward the viewer** to full size (`expo.out`).
- Three small line icons **snap onto the words** as they land, each with one tiny reaction:
  - an **alarm clock** on the first word, which rings (a quick shake with two little sound arcs);
  - a **lightning bolt** (automation/power) near the middle, which flashes once with a brief amber glow;
  - an **envelope** on the last word, whose flap opens and closes.
- Two or three small 4-point sparkles twinkle around the title.
- Transition: the whole title keeps zooming past the viewer (scale up + fade), and the background flips to the light dotted canvas of Scene 2.

### Scene 2: The flow builds (~2.5 s)
- Light canvas with a faint dotted grid. The path **draws itself** from left to right (stroke drawing, `power2.inOut`), and each chip **pops in** (scale 0.85→1, slight `back.out`) the moment the line reaches it.
- Small "+" connector circles from the reference sit on the path between chips and pop as the line passes, a nod to the Power Automate look.
- The VBA spark zips along the first segment as it draws.

### Scene 3: The system runs (~3 s)
Now show it working. A single **glowing pulse** (a bright emerald dot with a short sparkle trail) travels the whole path from Project Schedule to Reminder Log. As it reaches each chip, that chip **lights up briefly** (border glow + a small tick on the icon).
- **Recurrence:** the clock icon's hands sweep round and stop at 08:00, with a small ring. This is the trigger, so the pulse "launches" from here with a little burst.
- **For each candidate:** its loop icon spins once, and the pulse **splits into three small dots** in red, amber and green (Overdue, Due today, Due soon).
- **Filter Prior Sends:** one of the three dots is **filtered out** (it fades with a tiny ✕). This visibly shows the de-duplication.
- **Digest Mode:** the TRUE/FALSE toggle on the chip **flips**. **Alternate each loop:** TRUE on one loop (the dots merge into one, the daily digest) and FALSE on the next (the dots stay separate, one email each), so both behaviours get shown over time.
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
- **Keep the PRJ-05 card its normal size** if the chips are readable there. Only widen it (span two columns) if they aren't, and tell me if you did.
- **Phones:** the path runs top to bottom as a gentle zig-zag, with the same chips and order. Titles must stay readable.
- Colours: product colours for the icon tiles; everything else (path, pulse, glows, sparkles, title) uses the site's emerald/amber palette.
- The card's existing number, heading, description and footer text stay exactly as they are.

### When Step 3 is done
- Push to `redesign-step1` and send the deploy preview link.
- Send a short GIF covering two loops (so both the TRUE and FALSE branches show).
- One short list: what changed and anything you weren't sure about. Nothing else.
- Wait for my review. Don't put anything on the live site.
