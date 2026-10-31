# Responsibility laundering: final verification

October 30, 2026, against `motion-figures` at `7e607cb`. This report replaces the October 28 verification. It covers the four versions after the polish, wording and classroom changes. I only reported: no figure or runtime file was edited.

**Method.** I served `design/motion-figures/` on 127.0.0.1:5373 and drove Playwright 1.63 (site-motion `node_modules`), running one browser at a time and closing it between viewports. Moments were held through the runtime's `window.__motionFigures['responsibility-laundering'].seek(t)` in player time, which is figure time plus the 3 s name card. Sizes and text came from the live DOM. Screenshots are in the scratchpad (`fv3-rl-ar/out/rl/`).

Versions: PME (no query, `seminar` cast, "Faculty"); workplace (`?edition=business`); classroom (`?edition=business&cast=classroom`, "the instructor"); high school (`&cast=high-school`, "the teacher").

| # | Item | Result |
| --- | --- | --- |
| 1 | The definition in every version | **FAIL**, on the meta description only. The final frame, the nameplate and noscript pass |
| 2 | PME: the dot is whole again as "Answerable" lands, and the ring stays | **PASS** |
| 3 | The picture at 1280×720 and 1366×657 | **PASS**, all four versions |
| 4a | Classroom and high school: the handout framing | **PASS** |
| 4b | High school: plain wording ("test exceptions" explained) | **PASS** |
| 4c | *Moffatt* as a related question | **PASS** (one note) |
| 4d | Singular reviewer grammar, no "Faculty" | **PASS** |
| — | Switch, `aria-current`, 390 scroll, console, reduced motion, no-JS | **PASS** |

## 1. The definition: FAIL (meta description)

Expected: "The model’s recommendation makes responsibility feel shared, or easier to defend."

- **Final frame: PASS.** `.mf-final-def` matches exactly in all four versions at 1440×900, 1280×720, 1366×657 and 390×844 (seek to the end), and under reduced motion at 1280×720 and 390×844. It sets on one line at the three laptop sizes (screenshots `*-1280x720-final.png`, `*-1366x657-final.png`).
- **Nameplate: PASS.** `NAMEPLATE.definition` in `responsibility-laundering.js` (line 22) matches, as does `NAMEPLATE-DEFINITIONS.md`. The runtime sets it above the check in the last caption.
- **Noscript: PASS.** With JavaScript off, every version shows "FAILURE MODE 7 OF 7 / Responsibility laundering / The model’s recommendation makes responsibility feel shared, or easier to defend. / This figure needs JavaScript to play."
- **Meta description: FAIL in all four versions once JavaScript runs.**
  - The static `<meta name="description">` (served to no-JS readers) carries the words, inside a longer sentence: "Responsibility laundering: the model's recommendation makes responsibility feel shared, or easier to defend, and asking why…". The capital T is lowercase there, and the apostrophe is straight.
  - But the tag has `data-ed-content="page.description"`, so `fillPage` replaces it with each edition's `page.description`, and none of those contains the definition. Live values:
    - PME: "A teaching figure: two students sign the same AI-drafted recommendation, and faculty find out who can account for it by asking why they relied on the AI's estimate."
    - Workplace: "Two analysts sign the same AI-drafted recommendation, and the manager asks each of them why they relied on the AI's estimate."
    - Classroom: "…and the instructor asks each of them…"
    - High school: "…and the teacher asks each of them…"
  - Fix: add the definition to `page.description` in `editions/pme.json` and `editions/business.json`, or drop `data-ed-content` so the static tag stays.

## 2. PME: whole again as the weight lands: PASS

The first student's weight lands at player 83.2 s (figure 80.2).

**Drawn stage, 1280×900** (dot radius; weight `translate`):

| Player time (s) | 79.0 | 82.0 | 83.0 | 83.2 | 83.4 | 83.6 | 83.8 | 84.5–96.2 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| First dot, r | 3.5 | 3.5 | 3.5 | 3.5 | 3.72 | 4.78 | **5** | 5 |
| Weight y | hidden | −3.4 | 88 | **122** (rest) | 120 (settle) | 122 | 122 | 122 |

- **Ring.** The grey ring stays the whole time, at (82, 180) by "The analysis estimates": r 7, `stroke-opacity` 1, dashed `3 2.2`, fill 0.
- **Final frame.** The PME final-frame screenshot at 1280×720 shows a whole red dot under ANSWERABLE, with the dashed ring before "The analysis".

**Stacked stage, 390×844.**

- **Dot.** It scales from 0.7 (83.0 s) through 0.712 (83.2) and 0.924 (83.4) to no transform, 7 px, at 83.6 s.
- **Chip.** The "Answerable" chip fades in over the same span: opacity 0.29, 0.86, then 1.
- **Ring.** The 12 px dashed grey ring (`rgb(91, 86, 79)`) stays to the end.
- **Screenshots.** The 82.0 s and 83.8 s crops (`dot-pair-390x844.png`) show the small dot under the falling weight, then a whole dot beside the chip, with the ring kept.

Workplace still makes the dot whole after its own landing (r 4 to 5 by 90 s), so the shared code didn't regress it.

## 3. The picture at laptop sizes: PASS

The drawn SVG stage (not the stacked text view) shows in every version, both on load and at the final frame.

| Viewport | Versions | Mono 13 renders at | Caption band | Shot + controls height |
| --- | --- | --- | --- | --- |
| 1280×720 | all four | 11.10 px | 144 px | 693 px (fits 720) |
| 1366×657 | all four | 11.07 px | 92 px (compact band) | 640 px (fits 657) |
| 1440×900 | all four | 14.06 px | 144 px | 816 px |

In the final-frame screenshots at both laptop sizes, the plate, both copies, the answers, the key, the name, the definition, the check, the follow-up and the controls are all on screen, with nothing cut off.

## 4. Classroom and high school

**a. Handout framing: PASS.**
- **Setup (both).** "In a business class working a retailer's case, the instructor [the teacher] gives every student the same AI-drafted recommendation to review, then sign or revise. … The class allows AI, and each copy is tagged "drafted with AI", so identical copies are expected."
- **Caption 2.** "The instructor gives both the same AI draft to review." (high school: "The teacher gives…")
- **Note row.** "THEIR OWN NOTE · NOT HANDED IN". The two signed copies read as two reviews of a shared handout.

**b. High-school plain wording: PASS.**
- **The crux.** On stage, the second answer is "I didn’t try unusual requests." "Test exceptions" appears nowhere on the high-school page.
- **Check paragraph.** "what they didn't try: unusual requests, like a refund asked for late".
- **Glosses.** Bereavement fares are "the lower fares some airlines offer for travel after a death in the family". Retroactive applications are "claims made after the trip". The tribunal is the one "which decides small claims (para. 7)".
- **Classroom.** The higher-ed cast keeps "I didn’t test exceptions", as designed.

**c. *Moffatt* as a related question: PASS, with one note.**
- **Evidence (every business cast).** It opens under "A RELATED CASE": "*Moffatt v. Air Canada* (2024) is a related case at the scale of an organization: who answers for an AI's answer? … It differs from the figure: the airline disowned its chatbot's answer, and the first student owns the call and hands off only the reason."
- **Setup and stage line.** The setup says "Related case: … held an airline responsible for what its chatbot told a customer", and the stage line reads "Related case: Moffatt v. Air Canada (2024): / a company was held responsible / for what its chatbot told a customer."
- **Note.** The links note still says "This page shows the same move in a business class working a retailer's case." There, "the same move" refers to the essay's failure mode, not *Moffatt*. It sits directly above "The case: Moffatt v. Air Canada", though, so a skimmer could join the two. This is optional wording, not a defect.

**d. Singular reviewer, no "Faculty": PASS.**
- **No "Faculty".** Searching the page text, beat list, stage SVG and stacked stage finds 0 hits for "faculty" in classroom and high school.
- **Classroom.** "The instructor asks each student.", "The instructor asks why.", "THE INSTRUCTOR DOESN’T SEE THIS", "WHAT THE INSTRUCTOR SEES", "Instructor’s check", and the meta "…the instructor asks each of them…".
- **High school.** "The teacher asks each student.", "The teacher asks why.", "THE TEACHER DOESN’T SEE THIS", "WHAT THE TEACHER SEES", "Teacher’s check".
- **PME.** It keeps "Faculty ask each student", "They ask why", "Faculty check".

## Also checked

- **Switch: PASS.** It reads "See this with: Workplace · Classroom · PME" at every size.
  - **`aria-current="page"`:** PME on PME; Workplace on workplace; Classroom on both classroom and high school.
  - **Links:** on a high-school page, Classroom links to `?edition=business&cast=high-school`.
- **No horizontal scroll at 390: PASS.** `scrollWidth` is 390 in all four versions, and the stacked player measures 837–842 px of the 844.
- **Console: PASS.** There were no errors or warnings in any load (16 viewport loads, 8 reduced, 3 seek sweeps).
- **Reduced motion: PASS.** All four versions open on the final frame (1:36 PME, 1:39 business) with the full name, definition, check label, question and follow-up, at 1280×720 and 390×844.
- **`edition-check`: PASS** (see `RUNTIME-VERIFY.md`).

## Defects

1. **The meta description loses the definition in every version once JavaScript runs.** `page.description` in `editions/pme.json` and `editions/business.json` replaces the static tag (item 1).

## Fix after this verification (October 30)

**Meta description (defect 1).** `page.description` now starts with the definition, then says what the figure shows, in each version's words:
- PME (`editions/pme.json`): "The model’s recommendation makes responsibility feel shared, or easier to defend. A teaching figure: two students sign the same AI draft, and faculty ask each why they relied on its estimate."
- Workplace, classroom, high school (`editions/business.json`, one string with cast keys; no `byCast` override exists): "…Two analysts (students) sign the same AI draft, and the manager (the instructor, the teacher) asks each why they relied on its estimate."
- The static fallback in `index.html` now carries the definition word for word too: "The model’s recommendation makes responsibility feel shared, or easier to defend. Asking why each signer relied on the AI’s estimate shows who can account for it."

Checked live in all four versions and with JavaScript off. Frame diff against HEAD: identical in all four versions (209/209 PME, 212/212 each business cast).

## Recheck (October 30, after the 4.2 s name card)

**Build:** `d54d0cb`, served on port 5463 (stopped afterwards), one headless Chromium at a time. I read `meta[name=description]` after the edition had loaded, so the runtime's `fillPage` had already replaced the static tag. Script: scratchpad `recheck-final/copy.mjs`.

| Version | Runtime `meta[name=description]` | Result |
|---|---|---|
| PME | "The model’s recommendation makes responsibility feel shared, or easier to defend. A teaching figure: two students sign the same AI draft, and faculty ask each why they relied on its estimate." | **Pass** |
| Workplace | "The model’s recommendation makes responsibility feel shared, or easier to defend. Two analysts sign the same AI draft, and the manager asks each why they relied on its estimate." | **Pass** |
| Classroom | "… Two students sign the same AI draft, and the instructor asks each why they relied on its estimate." | **Pass** |
| High school | "… Two students sign the same AI draft, and the teacher asks each why they relied on its estimate." | **Pass** |

- Each one contains the definition word for word, with the curly apostrophe.
- **Name card kicker, "Failure mode 7 of 7":** fully opaque and still 0–3.2 s (needs 3.17 s), PME and workplace, at 1440×900 and 390×844. **Pass.**
- The console showed 0 errors and 0 warnings.
