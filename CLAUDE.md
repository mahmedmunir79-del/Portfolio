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
9. **Keep the existing fractionation-column animation as it is for now.** We will rebuild it in a later step.

---

## CURRENT TASK: Step 1 — UI/UX overhaul + two new sections

### Part A: Study first (no code yet)
1. Open my live site in Chrome. Note its current layout, structure, colours, fonts and any existing animations.
2. Open the reference site: **https://lusion.co/**
   - Note: Lusion builds much of its motion with WebGL/3D rendering. **Do not use WebGL or Three.js.** Recreate the *feel* of its scroll effects with lightweight SVG + CSS + GSAP ScrollTrigger so the site stays fast. If an effect truly can't be done without WebGL, tell me rather than adding it.
   - Study **only its scroll animations**, specifically:
     - **Contract/expand on scroll:** how elements and sections shrink, grow or reveal as the page scrolls.
     - **Flowing line:** a line that flows and wiggles along the page as you scroll, drawing itself in step with scroll progress.
   - **Ignore its videos and video-based animations completely. Do not copy them.**
   - Don't copy its branding, content, or exact design. Learn the motion techniques only.
3. Report back in 5–10 short bullet points: what the two scroll effects are doing technically and how you plan to recreate them. Then continue to Part B unless something is unclear.

### Part B: Build
1. **Proper sections (the main problem):** right now my Nimir work, internship and other projects all run together in one long line with no separation. Restructure this into clear, separate sections and blocks:
   - Each job, internship or project gets its own **card/block** with a light-coloured background.
   - **On hover:** the card changes colour subtly and/or lifts slightly with a soft shadow.
   - Clear headings, spacing and visual hierarchy between sections.
2. **Scroll animations** (inspired by the reference):
   - The flowing/wiggling line running down the page and drawing as you scroll. It should connect the sections visually, like a journey or timeline.
   - Sections contracting/expanding gently as they enter the view.
   - Keep these to the two effects above. Don't add more animation types.
3. **Two new sections** (place them where they fit best in the Projects area and tell me where you put them):
   - **Continuous Improvement Idea Portal (Power Apps)**
     - Short description (draft below; use it as written unless I change it).
     - An **empty image placeholder** box, properly styled and sized, labelled "Image coming soon." I'll add the image later.
   - **Project Tracker Automation (Power Automate)**
     - Short description (draft below).
     - An **empty animation placeholder** box, styled and sized, labelled "Animation coming soon." We'll build the animation in a later step.

**Draft description: CI Idea Portal**
> Built a Continuous Improvement Idea Portal using Microsoft Power Apps, giving everyone at the company one place to submit improvement ideas. Upper management reviews each idea and approves or declines it, and the originator is credited by name to encourage participation. Available in Microsoft Teams and as a web app in the browser.

**Draft description: Project Tracker Automation**
> Automated project deadline tracking with Microsoft Power Automate. Instead of manually checking the MS Project schedule every morning, the system emails the responsible person and me automatically when a deadline is approaching or has passed, and keeps an Excel log of every reminder sent.

### When Step 1 is done
- Give me the deploy preview link.
- Show before/after screenshots (desktop and mobile).
- List what you changed and anything you weren't sure about.
- Wait for my review. Don't start the next step on your own.
