# Uncalibrated reliance: business edition storyboard

Edition `business`, round 2, revised after business figure cold read 1 (`tests/business-figure-read-1.md`) and lessons 7–12 in BUSINESS-BRIEF.md. It's built from `editions/business.json` on top of the core described in `storyboard.md`: the timeline, layout, motion, colour grammar and nameplate. This file lists only what differs from the PME edition. The words live in the data files, and if this file and the data disagree, the data is what ships.

Open it with `index.html?edition=business`, or use the "See this with: Workplace" link on the page.

## 1. Source and evidence treatment

*Illustration based on Otis, Clarke, Delecourt, Holtz & Koning (2026), "The Uneven Impact of Generative Artificial Intelligence on Entrepreneurial Performance: Evidence from a Field Experiment in Kenya," Management Science (online July 10, 2026), doi 10.1287/mnsc.2024.06909, and its working paper.* The scenario and sensitivity rules come from BUSINESS-EXAMPLES.md, section 4. Evidence follows option A, keeping the evidence beat, because for this figure the finding is the turn:

- **Setup:** "Illustration based on Otis et al. (2026) and its working paper. The owners, their documents and every number in their plans are constructed."
- **Under the final frame:** "Illustration based on Otis et al. (2026) and its working paper." It sits in the SVG under the key and fades in at 84.9–85.4 s, 1.0 s after the check. On the stacked phone stage it's the stage's last line, "Based on Otis et al. (2026) and its working paper.", inside the player. In round 1 it sat below the controls, where it was cut off.
- **On the page:** "The study behind this example", in five paragraphs:
  1. the published abstract's findings, quoted word for word;
  2. where the gap came from, and what the study didn't measure;
  3. the limits;
  4. the revised working paper's detail, with its exploratory reading labelled as exploratory and the earlier version's different explanation;
  5. what in the figure is constructed.

### The evidence beat: Otis, not BCG (unchanged from round 1)

PME's beat 8 shows Dell'Acqua et al. (BCG); the business edition shows Otis et al. The reasons:

1. **The scene and the panel must come from the same study.** The setup cites Otis. A consulting panel after a Nairobi print shop would ask the reader to carry a result across settings with nothing to bridge the gap.
2. **Otis's headline finding concerns the act the figure slows down.** The gap came "from the advice that entrepreneurs chose to implement," not from "the questions posed to the AI or the advice that it provided."
3. **BCG keeps one home:** figure 8 (appropriate reliance).

**The cost:** BCG measured the frontier itself and Otis doesn't. So beat 7's jagged frontier is the essay's term and the figure's reasoning, not a measured result. The page credits the term to Dell'Acqua et al. (2023) and links to the appropriate reliance figure.

### Round 2: the panel is the study's result, not the two owners

The cold read mapped "started weaker" onto the first owner and "started stronger" onto the second. That reads checking as the cause of the study's gap, and the study didn't measure checking. Beat 8 now:

- **Caption:** "A real study gave owners the same AI. It didn't measure checking." "Real" sets the study apart from the invented owners, and the second sentence rules out the causal reading before any bar is drawn.
- **Panel title, the key line:** "Results seem to hinge on which advice owners acted on". It arrives with the panel at 59.8–60.4 and stays until 68.9. That's 8.5 s on screen against the 4.8 s it needs (10 words ÷ 3 + 1.5). Round 1 put the key line in a bracket that came last and stayed up for 5.5 s.
- **Rows:**
  - "Started weaker" is a solid bar left of zero, labelled "nearly 10% worse".
  - "Started stronger" is a light dashed bar right of zero, labelled "may have gained over 15%", with "LESS CERTAIN" under it. In the revised working paper, the weaker group's loss has p = 0.007 and the stronger group's gain has p = 0.07, which the paper calls "noisier" (p. 9).
  - The zero line is centred in the panel (x 480), under the AI's column rather than between the owners' columns.
- **Cut:** the "On average" row and the bracket. The average is on the page.
- **Stacked view:** the label reads "A real study, not these owners", the stronger row ends "(less certain)", and the key line is in italic.
- **Word count:** the caption and panel together come to 36 words (12 + 24). That compares with 46 in round 1 and 45 in PME.

### Round 2: the wrong answer hinges on what the AI didn't have

In round 1 the AI was given the sales book, so its 10% price cut looked careless. Now:

- **Same access on both sides** (lesson 12). Both owners have the same four documents. Each shares only the two battery quotes and the new shop's flyer with the AI; the sales records stay with them. Beat 1 says so ("sharing everything but the sales records"), and only three grey copies slide into "GIVEN TO THE AI".
- **The AI's answers are good on their inputs and equally confident.** Part 1, "Buy battery A: runs 6 hours, costs less", follows from the quotes. Part 2, "Win them back: cut prices 20%", is a fair answer to the flyer alone, and beat 7 tags it "FROM THEIR FLYER".
- **The decisive fact is outside the AI's input.** The sales records say "Mostly same-day", with "(not given to AI)" set apart in the callout. The second owner's change, "same-day service", rests on them.
- **The margin argument is gone.** The tester noted it was never stated, so I removed it rather than add words.
- **Smaller changes:**
  - The scenario's number is now 20%, so it no longer echoes the study's "nearly 10%".
  - "Sales book" is now "sales records", for US readers.

### Lesson checks

- **Lesson 1 (don't endorse what the study found wrong).** The first owner acts on a price cut, the kind of advice the working paper's exploratory reading links with worse results. The second owner's change avoids both halves of that reading's "generic" advice, price cuts and advertising. No contrast had to be reversed.
- **Lesson 8 (no straw man).** The first owner checks Part 1 carefully. Their reason, "Part 1 checked out, so I trusted the rest", is a reasonable person's reason.
- **Lesson 9 (the separating question comes first).** Both owners answer the Part 1 question identically. Part 2 is the first difference.
- **Lesson 10 (the good move is the owner's own).** "Same-day service" comes from the second owner's own records, which the AI never saw. It isn't an AI fallback.
- **Lesson 11 (describe the sample accurately).** The page describes the participants as Kenyan entrepreneurs (median age 26, a year in business, a college degree). It also gives the median split and the exploratory label.

### Sensitivity, kept from BUSINESS-EXAMPLES.md

- Neither owner is labelled weak or strong, and both are competent. The panel's groups are the study's.
- Nairobi appears only in the setup.
- "May have gained" keeps its hedge, and the uncertain bar now looks uncertain.

## 2. Core changes (gated on data; PME frame-diffs to 0)

The timeline is unchanged: the same `BEAT_AT` and `T`, and 90.6 s of figure time. Each change below draws only when its key is present, so PME draws exactly as before. After all changes, PME re-diffed at **0 of 209 frames** against `regression/baseline`.

1. **`ed.reportsGiven`:** only the listed documents' copies slide to the AI. The default is all four.
2. **Empty edit segments draw nothing:** no band and no strike. That lets business edit a single line: "~~cut prices 20%~~ same-day service".
3. **No `labels.slot` means no reading note.** Business drops the large note in the second plan, which takes two events out of beat 6 (cold read item 5).
4. **The panel's signed rows,** extending round 1:
   - `zeroX` sets the zero line;
   - two rows get their own spacing;
   - `row.uncertain` draws a light dashed bar;
   - `row.note` adds a mono note under the value;
   - the bracket is optional; with no bracket, the stacked view's italic line appears with the panel.
5. **`labels.dot.keepB`:** the second owner keeps the "Second owner" label until the names appear at the end (cold read item 7). In round 1 that dot was unlabelled from beat 5.
6. **`narrow.source`** is now the stacked stage's last line, inside the player. The line under the controls is gone.
7. **Laptop windows** (both editions; page CSS). At 1200 px wide or more and 716 px tall or less:
   - the caption band is 100 px, with the check at 20 px;
   - `--mf-chrome` is 168 px, as in AR.

   The picture now shows at 1366 × 657 (lesson 7) instead of giving way to the stacked view. The frame-diff sizes (1440 × 900, 1280 × 720) are taller than 716 px, so they're unaffected.
8. **Page:**
   - The PME/National War College note above the figure shows only when the edition has `page.editionNote`: PME keeps it, business drops it.
   - The meta description is in business wording.
   - The screen-reader title says "eleven beats" in both editions. It used to say twelve; it isn't visible.

**Kept from round 1:** the signed-results panel, the source line under the final frame, the shorter stacked wordings (`narrow.answers`, `narrow.speech`) and the generic stacked evidence rows. The nameplate is unchanged.

## 3. Role words

The people are two shop owners and **a reviewer**, and "reviewer" is now the one name throughout:
- The setup introduces the role: "Later a reviewer, say a lender or business adviser, sees only the plan and asks about each part."
- Beat 9 says "A reviewer who sees only the plans…", and the label reads "THE REVIEWER SEES ONLY THE PLANS".
- The check card is the cast's "Reviewer's check".

Round 1's "mentor" is gone everywhere: Otis et al.'s earlier version called the AI itself an "AI business mentor". "Owner", "First owner" and "Second owner" are written into `business.json`; only `{check}` comes from the workplace cast.

PME uses the merged cast keys (`{reviewer_sees}`, `{Another}`, `{That_person}`, `{reviewer_points}`, `{each_person}`, `{the_first}`, `{person}`) and still diffs to 0. One known wrinkle: PME's beat 9 says "…point to each part in turn and ask…", which agrees only with a plural reviewer.

## 4. Words that differ, beat by beat

| Beat | Caption (business) | Picture words that differ from PME |
| --- | --- | --- |
| 1 · The task | A shop owner asks an AI two questions, sharing everything but the sales records. | Task: "Part 1 · Keep printing in blackouts", "Part 2 · Win back customers". Documents: BATTERY QUOTE ×2, RIVAL'S FLYER, SALES RECORDS. Three copies (not the records) go to "GIVEN TO THE AI". Dot: "Owner" |
| 2 · Equal confidence | (same) | "Buy battery A: / runs 6 hours, costs less"; "Win them back: / cut prices 20%". Stacked: "Battery A: 6 hours, cheaper", "Cut prices 20%" |
| 3 · Checks Part 1 | The owner checks Part 1 against the two battery quotes. It's right. | "FIRST OWNER'S PLAN" |
| 4 · Uses Part 2 | (same) | — |
| 5 · Checks each part | Another owner, with the same answers, checks each at its source. | "Second owner" (now kept to the end), "SECOND OWNER'S PLAN", "First owner" |
| 6 · Checks Part 2 too | That owner checks Part 2 against the flyer and records, and changes it. | Flyer: "THEIR PRICES / 20% below ours". Records: "OUR SALES / Mostly same-day / *(not given to AI)*". No reading note. Edit: Win them back: ~~cut prices 20%~~ **same-day service** |
| 7 · The frontier | Part 2 depends on why customers come here. A jagged frontier marks where an AI stops being reliable. | "Mostly same-day" underlined; the AI's "cut prices 20%" underlined and tagged "FROM THEIR FLYER" |
| 8 · The study | A real study gave owners the same AI. It didn't measure checking. | Title: "Results seem to hinge on which advice owners acted on". Started weaker: solid bar, "nearly 10% worse". Started stronger: light dashed bar, "may have gained over 15%", "LESS CERTAIN". Source: "OTIS ET AL. (2026) · KENYAN ENTREPRENEURS · MANAGEMENT SCIENCE" |
| 9 · The reviewer | A reviewer who sees only the plans points to each part and asks what justified relying on it. | "THE REVIEWER SEES ONLY THE PLANS". Key: "AN OWNER'S OWN WORK". Answers: "The battery quotes." (both); "Part 1 checked out, so I trusted the rest." / "Our sales records. They come for speed." |
| 10 · Reviewer's check | Reviewer's check: What evidence justified relying on the AI here? / Ask part by part: was the evidence about that part? | "Illustration based on Otis et al. (2026) and its working paper." at 84.9 s |

### The workplace check (for Jack)

> **Reviewer's check:** What evidence justified relying on the AI here?
> Ask part by part: was the evidence about that part?

The check keeps the EDITIONS-PLAN draft ("Ask part by part") and PME's separating question, at equal weight.

## 5. Pace

Reading time is words ÷ 3, plus a hold of at least 1.5 s after the reading. Picture words are the new words drawn in each beat, counted the same way for both editions. Times are figure time; the player adds the 3.0 s name card.

| Beat | Time (s) | Caption words (PME) | Reading (s) | Reading + 1.5 (s) | 2× reading (s) | Picture words (PME) | Beat (s) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0.0–8.6 | 14 (12) | 4.7 | 6.2 | 9.3 ✕ | 26 (29) | 8.6 |
| 2 | 8.6–15.6 | 6 (6) | 2.0 | 3.5 | 4.0 | 22 (26) | 7.0 |
| 3 | 15.6–23.1 | 12 (12) | 4.0 | 5.5 | 8.0 ✕ | 4 (4) | 7.5 |
| 4 | 23.1–30.3 | 10 (10) | 3.3 | 4.8 | 6.7 | 3 (3) | 7.2 |
| 5 | 30.3–37.6 | 11 (11) | 3.7 | 5.2 | 7.3 | 8 (8) | 7.3 |
| 6 | 37.6–48.6 | 13 (12) | 4.3 | 5.8 | 8.7 | 17 (37) | 11.0 |
| 7 | 48.6–58.4 | 18 (17) | 6.0 | 7.5 | 12.0 ✕ | 9 (7) | 9.8 |
| 8 | 58.4–67.9 | 12 (16) | 4.0 | 5.5 | 8.0 | 24 (29) + source | 9.5 |
| 9 | 67.9–83.9 | 18 (14) | 6.0 | 7.5 | 12.0 | 39 (38) | 16.0 |
| 10 | 83.9–90.6 | 20 (20) | 6.7 | 8.2 (then rests) | — | 11 (0) | 6.7, then rests |
| **Total** | | **134 (130)** | | | | **163 (181)** | **90.6 figure, 93.6 player** |

Notes:
- **Every caption meets reading + 1.5 s.** Twice the reading time isn't met in beats 1, 3 and 7 (✕). PME misses beats 3 and 7 the same way. Beat 1 is two words over PME, because it now says that the sales records stay back.
- **Beat 6** now carries 30 words in all, against PME's 49. Its events:
  - the flyer opens (39.1);
  - the records open (40.7);
  - Part 2 slides in (43.2);
  - one strike and one insertion (44.7–45.3);
  - the check mark (45.5).

  Round 1 also had two notes and a second edit.
- **Beat 8** carries 36 words in all (46 in round 1, 45 in PME). The key line leads the panel and gets 8.5 s against the 4.8 s it needs.
- **Beat 9:** the second owner's answer is 7 words, the same as PME's, so it's read and held before the check.

## 6. Verified figures (for the companion's source spine)

**Published abstract** (Crossref, doi 10.1287/mnsc.2024.06909, read October 28, 2026):
- "randomizing access to a GPT-4-powered AI business assistant";
- "unable to reject the null hypothesis of no average treatment effect on firm revenues and profits";
- "over 0.20-standard-deviations lower than for initial high performers";
- "low performers did nearly 10% worse because of the AI assistant, whereas high performers may have benefited by over 15%";
- "This differential impact does not appear to result from differences in the questions posed to the AI or the advice that it provided but rather, from the advice that entrepreneurs chose to implement."

**Revised working paper** (eScholarship qt40s41244). The listing is dated 2024-02-27, but the PDF was created July 1, 2024 and modified July 17, 2024. Page numbers are the printed ones:
- 640 entrepreneurs randomly assigned to "a GPT-4-powered AI business assistant via WhatsApp" (p. 3), with control participants given "business training guides" (pp. 7–8);
- the median entrepreneur "26 years old, had been running their business for one year, and held a college degree" (p. 8);
- businesses ranging "from fast-food joints to poultry farms to cybershops", with the cybershops footnote (p. 8);
- the split at the median (p. 9);
- low performers β = −0.09 s.d. (p = 0.007), high performers β = 0.19 s.d. (p = 0.07), "noisier given the long right tail" (p. 9);
- "exploratory text analysis" (p. 3);
- the "generic" versus "tailored and specific changes" passage, including blackouts and the car wash detergent (p. 4).

**February 2024 version** (NBER conference copy f194654, read the same day):
- its abstract calls the AI an "AI business mentor";
- it explains the gap differently: "low performers did worse because they sought help on more challenging business tasks."

**Not used:** the working papers' "0.27 standard deviations", "about 8% worse" and "just over 15%". The figure uses only the published figures.

## 7. What I couldn't verify

- **The published full text** is paywalled (HTTP 403), so I don't know whether the generic-versus-tailored reading survives in it. The page says that the published abstract doesn't mention it.
- **The figure's constructed numbers** (battery A, 6 hours, 20%) are labelled as constructed in the setup and on the page.

## 8. Final frame and checks

The final frame, at player time 93.6 s:
- **Top:** the task card and the four documents. The flyer callout reads "THEIR PRICES / 20% below ours"; the records callout reads "OUR SALES / Mostly same-day / (not given to AI)", with "Mostly same-day" underlined.
- **Plans:** both owners' plans, with Part 2 outlined. The second reads "Win them back: ~~cut prices 20%~~ same-day service".
- **The AI's column:** receded, with the frontier between its answers and "FROM THEIR FLYER" under Part 2.
- **Below:** both answer bubbles, the names, "THE REVIEWER SEES ONLY THE PLANS" with the key, and the source line.
- **Caption band:** the name and definition, then "REVIEWER'S CHECK · What evidence justified relying on the AI here? / Ask part by part: was the evidence about that part?"

**Checks:**
- Both editions were checked at 1440 × 900, 1280 × 720, 1366 × 657, 390 × 844 and 768 × 1024.
- **Laptop picture:** it shows at 1280 × 720 and 1366 × 657 in both editions. The last caption fits the 100 px band there (99 px).
- **Stability:** the controls stay fixed through the run, with no horizontal scroll and no console errors.
- **Phone:** the player is 841 px at 390 × 844, source line included (PME: 838).
- **Other views:** reduced and print views checked.
- **Voice:** the visitor copy passes the writing-as-jack mechanical check.

**Stills:** `shots/business/`:
- `beat-01.png` to `beat-10.png`;
- `final.png`, `final-1440.png`, `final-1366.png`, `final-390.png` and `player-390-final.png`;
- `reduced-figure.png` and the page views.

**Preview:** `shots/uncalibrated-reliance-business.mp4`, `.webm` and `.gif`.

## 9. Questions for Jack

1. **The evidence beat uses Otis,** with its result shown as the study's, apart from the two owners: "A real study gave owners the same AI. It didn't measure checking."
2. **The workplace check:** the wording in section 4.
3. **The held-back sales records.** The owner keeps them from the AI, so Part 2 depends on something it didn't have. Is that a fair stand-in for the study's owners, who asked questions over WhatsApp?
4. **Phone wordings are shorter than desktop,** to keep the phone player within 844 px.
