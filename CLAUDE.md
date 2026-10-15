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
- **Step 3**: PRJ-05 Project Tracker Automation motion piece (title zoom → 7-chip flow → pulse run → delivery). Approved. Not live yet.

## CURRENT TASK: Step 4 — one text fix + motion design for "CI Idea Portal" (PRJ-04)
Keep working on `redesign-step1`. Change only what's listed here.

### Fix: PRJ-05 title text
- In the PRJ-05 animation's Scene 1 title, change **"Automated Deadline Reminders"** to **"Automated Project Tracking"** (both the desktop and phone layouts of the title, around `title: {...}` in the script). Keep the three icons on the first, middle and last word as they are. Nothing else in that animation changes.

### PRJ-04: Continuous Improvement Idea Portal
Replace the "Image coming soon" placeholder (`.ph` box in the PRJ-04 card) with a looping, code-only motion piece. **Same tech, rules and visual language as PRJ-05**, so the two cards feel like a matching pair: inline SVG + one GSAP timeline + ScrollTrigger, no video, no WebGL, no Lottie, no new libraries. Same title-zoom style, sparkles, palette and loop behaviour.

**The story:** *anyone on the plant floor can have an idea that saves money, and this portal I built turns it into action and credits them for it.* It's about inclusivity and recognition.

**Character style (applies to all scenes):** one simple, friendly **flat-vector engineer**: hard hat (amber), coveralls (emerald/navy), simple rounded shapes. **No facial features**: show him from the side or three-quarter back view, with emotion carried by body language. Keep him under about 15 SVG shapes so he stays light. The plant is a simple skyline silhouette (columns, tanks, a pipe rack), similar to the line-art plant illustration in the real app's sidebar.

**Scene 1: Title zoom (~1.8 s)**
- Dark navy start. **"Every idea matters."** zooms toward the viewer (`expo.out`), exactly like PRJ-05's title.
- Small line icons snap onto the words with one reaction each: a **brain** (two quick pulses of thought lines), a **hard hat** (a little bounce), a **light bulb** (flickers on with an amber glow). Two or three sparkles twinkle around the words.
- The title zooms past the viewer and hands over to Scene 2.

**Scene 2: The spark (~2.5 s)**
- The engineer stands on the left looking at the plant silhouette on the right. Faint steam drifts from a stack, so the plant feels alive.
- He tilts his head slightly. Three small **thought bubbles** rise from his head, growing (small → medium → large), and a **light bulb** pops into the large one and switches on with a bright amber burst and rays. He does a small "aha" gesture (a hand raised, or a little hop).
- **Money signs** (a few small "₨" and "$" coins/notes, emerald and amber) float up and around him and gently fade, showing that the idea saves money. Keep it to about 5–6 of them; playful, not cartoonish.

**Scene 3: Scan to submit (~1.8 s)**
- A small **QR-code poster** on a wall/pillar slides into view beside him. He lifts his **phone** toward it.
- A **scan line** sweeps across the QR code twice, the code's corners flash, and the phone screen lights up.
- Camera move: **zoom into the phone screen**; it expands to fill the block and becomes the portal (Scene 4). This zoom is the key transition, so make it smooth (`power3.inOut`).

**Scene 4: The portal (~3 s)**
Recreate a **simplified, stylised version of my real app** (description below; there is no image file, so build from this). Use its colours: deep navy header, bright blue buttons, light grey canvas, pastel-tinted field cards.
- **Header bar:** a light-bulb icon + "Continuous Improvement" / "Idea Portal". **Don't recreate the NIMIR company logo or name**, and don't show any personal name.
- **Slim left sidebar:** a blue **"+ New Record"** button, then icon rows (home, person, check-circle, document, gear) with **no labels**. Keep it minimal.
- **Main panel heading:** a light-bulb tile + **"New Idea"**, with a blue **"Submit"** button top-right.
- **Only 4 field cards** pop in one after another (scale + fade, `back.out`, about 0.15 s apart), each with its tinted background and icon tile exactly as in the app:
  1. **Idea Title** (light blue, bulb icon)
  2. **Existing Conditions** (soft peach, warning-triangle icon)
  3. **Potential Saving (PKR)** (soft green, coin icon)
  4. **Department** (light lavender, people icon)
- As each card lands, its input **"types itself"**: animated grey text-bars grow from left to right with a blinking cursor. **Use bars, not real words**, so no idea content is invented. On the Potential Saving card, a small **₨** symbol pulses as the bar fills.
- A cursor/finger taps **"Submit"**: the button presses down, then a small **paper plane** flies off the top right of the screen with a sparkle trail.

**Scene 5: Approved & recognised (~2.5 s)**
- Back to the plant view. A green **"Approved"** stamp thumps onto a small idea card floating above the plant (squash-and-settle, a few dust sparkles). This reflects the real process: management approves or declines.
- The improvement is **commissioned**: one section of the plant silhouette (a pipe run or vessel) **lights up in emerald** and a soft glow pulse travels through it.
- The engineer (still no face) **celebrates**: both arms up, or a fist pump with a small jump. A **star medal / badge** pops onto his chest (the portal credits the originator by name), and a short, tasteful burst of **confetti** in emerald and amber falls (about 20 pieces, gone in about 1 s).

**Text allowed inside this animation:** "Every idea matters.", "Continuous Improvement", "Idea Portal", "New Record", "New Idea", "Submit", the four field labels above, and "Approved". **Nothing else.** No names, no company logo, no invented idea text or amounts.

**Loop and behaviour (same as PRJ-05):**
- One loop ≈ 13–14 s. Hold the celebration for about 1 s, fade out gently, and restart at Scene 1 with no jump.
- Loops forever **only while visible**; pauses off-screen. No Replay button.
- `prefers-reduced-motion`: a static frame of Scene 4 (the portal with the 4 cards filled).
- Effects budget: at most about 12 sparkles at once (confetti counts separately, max 20, short-lived). Animate transform, opacity and SVG stroke only.

**Size and layout:**
- Keep the PRJ-04 card its normal size and match the PRJ-05 animation box's proportions, so the two cards sit side by side as a pair.
- Phones: scale everything down. In Scene 4 hide the sidebar and stack the 4 field cards in a single column. Text must stay readable.
- The card's existing number, heading, description and footer text stay exactly as they are.

### When Step 4 is done
- Push to `redesign-step1` and send the deploy preview link.
- Send a short GIF of one PRJ-04 loop.
- One short list: what changed and anything you weren't sure about. Nothing else.
- Wait for my review. Don't put anything on the live site.
