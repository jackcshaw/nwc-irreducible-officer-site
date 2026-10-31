# Uncalibrated reliance: business edition storyboard

Edition `business`, round 3: final fixes after business figure cold read 2 (`tests/business-figure-read-2.md`), on top of round 2's fixes after cold read 1 and lessons 7–12 in BUSINESS-BRIEF.md. It's built from `editions/business.json` on top of the core described in `storyboard.md`: the timeline, layout, motion, colour grammar and nameplate. This file lists only what differs from the PME edition. The words live in the data files, and if this file and the data disagree, the data is what ships.

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

### The panel is the study's result, not the two owners (rounds 2 and 3)

Cold read 1 mapped "started weaker" onto the first owner and "started stronger" onto the second, reading checking as the cause of the study's gap. The study didn't measure checking. Cold read 2 found the desktop panel still implied it. Beat 8 now:

- **Caption, the key line:** "A real study suggests what mattered was which AI advice owners acted on." It's on screen for the whole 9.5 s beat, so the key line has its reading time and much more.
- **Heading on desktop and phone:** "A REAL STUDY, NOT THESE OWNERS".
- **Title naming the measure:** "Revenue and profit", the published abstract's terms ("firm revenues and profits"). The panel's percentages are the published abstract's own. The page notes that the revised working paper builds its estimates from a revenue-and-profit index and converts them to percentages of its own, without applying that conversion to the published figures.
- **Rows by business, not by person:**
  - "Weaker businesses": a solid bar left of zero, "nearly 10% worse".
  - "Stronger businesses": a light dashed bar right of zero, "may have gained over 15%", with "LESS CERTAIN" under it.
  - The zero line is centred in the panel, under the AI's column.
- **Visual separation:** while the panel is up, the scene dims to 10% instead of 25%, so the owners and their plans almost disappear behind it.
- **Word count:** caption and panel together come to 36 words. That's the same as round 2, against 46 in round 1 and 45 in PME.

### The wrong answer hinges on what the AI didn't have, and the right one is decisive (rounds 2 and 3)

- **Same access on both sides** (lesson 12). Both owners have the same four documents, and each shares only the two battery quotes and the new shop's flyer with the AI. The sales records stay with them. Beat 1 says so, and only three grey copies slide into "GIVEN TO THE AI".
- **The AI's answers are fair to their inputs and equally confident.**
  - Part 1, "Buy battery A: runs 6 hours, costs less", follows from the quotes.
  - Part 2, "Win them back: loyalty discount", is a modest, ordinary answer to the flyer ("THEIR OFFER / Cheaper prints"). Beat 7 tags it "THEIR FLYER".
  - Round 3 replaced round 2's "cut prices 20%", which the tester found too big a move for a careful owner to accept. The first owner now accepts a plausible suggestion.
- **The records settle Part 2.** Cold read 2 noted that round 2's "Mostly same-day" described the customers who stayed, not the ones who left, so a sharp owner could still argue for a price response. The records now read "OUR SALES / Lost: rush jobs / (not given to AI)", and the second owner says "Our records. Rush customers left in blackouts."
  - The customers who left wanted speed and left on blackout days, not over price.
  - A discount chases the wrong customers, and "same-day service" (which the battery from Part 1 makes possible) wins them back.
  - The decisive fact is one the AI never had.
- **Smaller changes:**
  - Beat 7's caption is now "Part 2 depends on why customers left."
  - No scenario number echoes the study's percentages: the flyer has no figure, and the discount has none.

### Lesson checks

- **Lesson 1 (don't endorse what the study found wrong).** The first owner acts on a discount, a price move of the kind the working paper's exploratory reading links with worse results. The second owner's change avoids both halves of that reading's "generic" advice, price cuts and advertising. No contrast had to be reversed.
- **Lesson 8 (no straw man).** The first owner checks Part 1 carefully. Their reason, "Part 1 checked out, so I trusted the rest", is a reasonable person's reason.
- **Lesson 9 (the separating question comes first).** Both owners answer the Part 1 question identically. Part 2 is the first difference.
- **Lesson 10 (the good move is the owner's own).** "Same-day service" comes from the second owner's own records, which the AI never saw (rush jobs lost on blackout days). It isn't an AI fallback.
- **Lesson 11 (describe the sample accurately).** The page describes the participants as Kenyan entrepreneurs (median age 26, a year in business, a college degree). It also gives the median split and the exploratory label.

### Sensitivity, kept from BUSINESS-EXAMPLES.md

- Neither owner is labelled weak or strong, and both are competent. The panel's groups are the study's.
- Nairobi appears only in the setup.
- "May have gained" keeps its hedge, and the uncertain bar now looks uncertain.

## 2. Core changes (gated on data; PME frame-diffs to 0)

The timeline is unchanged: the same `BEAT_AT` and `T`, and 90.6 s of figure time. Each change below draws only when its key is present, so PME draws exactly as before. After all changes, PME re-diffed at **0 of 209 frames** against `regression/baseline`.

1. **`ed.reportsGiven`:** only the listed documents' copies slide to the AI. The default is all four.
2. **Empty edit segments draw nothing:** no band and no strike. That lets business edit a single line: "~~loyalty discount~~ same-day service".
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
8. **`ed.timing` (round 3)** moves moments within a beat; beat starts stay shared.
   - Business draws beat 7's frontier at 51.0–52.4, with its labels at 52.4–52.8 and the cards' pulse at 53.0–53.6. PME's times are 54.3–55.7, 55.7–56.1 and 56.3–56.9.
   - The line now draws while the caption's second sentence ("A jagged frontier…") is being read.
   - The finished frontier holds for 6.6 s before the panel dims the stage. Before, it held for 1.5 s.
9. **Panel heading and dim (round 3).** `labels.panel.heading` adds a mono heading above the title, and the title moves down to make room. `labels.panel.dim` sets how far the scene dims behind the panel (business 0.9; PME keeps 0.75).
10. **Page:**
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
| 2 · Equal confidence | (same) | "Buy battery A: / runs 6 hours, costs less"; "Win them back: / loyalty discount". Stacked: "Battery A: 6 hours, cheaper", "Loyalty discount" |
| 3 · Checks Part 1 | The owner checks Part 1 against the two battery quotes. It's right. | "FIRST OWNER'S PLAN" |
| 4 · Uses Part 2 | (same) | — |
| 5 · Checks each part | Another owner, with the same answers, checks each at its source. | "Second owner" (now kept to the end), "SECOND OWNER'S PLAN", "First owner" |
| 6 · Checks Part 2 too | That owner checks Part 2 against the flyer and records, and changes it. | Flyer: "THEIR OFFER / Cheaper prints". Records: "OUR SALES / Lost: rush jobs / *(not given to AI)*". No reading note. Edit: Win them back: ~~loyalty discount~~ **same-day service** |
| 7 · The frontier | Part 2 depends on why customers left. A jagged frontier marks where an AI stops being reliable. | "Lost: rush jobs" underlined; the AI's "loyalty discount" underlined and tagged "THEIR FLYER". The frontier draws at 51.0 (PME 54.3) |
| 8 · The study | A real study suggests what mattered was which AI advice owners acted on. | Heading: "A REAL STUDY, NOT THESE OWNERS". Title: "Revenue and profit". Weaker businesses: solid bar, "nearly 10% worse". Stronger businesses: light dashed bar, "may have gained over 15%", "LESS CERTAIN". Source: "OTIS ET AL. (2026) · KENYAN ENTREPRENEURS · MANAGEMENT SCIENCE". The scene dims to 10% |
| 9 · The reviewer | A reviewer who sees only the plans points to each part and asks what justified relying on it. | "THE REVIEWER SEES ONLY THE PLANS". Key: "AN OWNER'S OWN WORK". Answers: "The battery quotes." (both); "Part 1 checked out, so I trusted the rest." / "Our records. Rush customers left in blackouts." Stacked: "Our records: we lost rush jobs." |
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
| 7 | 48.6–58.4 | 17 (17) | 5.7 | 7.2 | 11.3 ✕ | 9 (7) | 9.8 |
| 8 | 58.4–67.9 | 13 (16) | 4.3 | 5.8 | 8.7 | 23 (29) + source | 9.5 |
| 9 | 67.9–83.9 | 18 (14) | 6.0 | 7.5 | 12.0 | 39 (38) | 16.0 |
| 10 | 83.9–90.6 | 20 (20) | 6.7 | 8.2 (then rests) | — | 11 (0) | 6.7, then rests |
| **Total** | | **134 (130)** | | | | **162 (181)** | **90.6 figure, 93.6 player** |

Notes:
- **Every caption meets reading + 1.5 s.** Twice the reading time isn't met in beats 1, 3 and 7 (✕). PME misses beats 3 and 7 the same way. Beat 1 is two words over PME, because it now says that the sales records stay back.
- **Beat 7:** the frontier draws as its sentence is read, then holds for 6.6 s before the dim.
- **Beat 6** now carries 30 words in all, against PME's 49. Its events:
  - the flyer opens (39.1);
  - the records open (40.7);
  - Part 2 slides in (43.2);
  - one strike and one insertion (44.7–45.3);
  - the check mark (45.5).

  Round 1 also had two notes and a second edit.
- **Beat 8** carries 36 words in all (46 in round 1, 45 in PME). The key line is the caption, on screen for the whole beat.
- **Beat 9:** the second owner's answer is 7 words, the same as PME's, so it's read and held before the check.

## 6. Verified figures, by version (for the companion's source spine)

Every claim on the page names the version it comes from.

**Published abstract** (Crossref record for doi 10.1287/mnsc.2024.06909, read October 28, 2026):
- "randomizing access to a GPT-4-powered AI business assistant";
- "unable to reject the null hypothesis of no average treatment effect on firm revenues and profits";
- "over 0.20-standard-deviations lower than for initial high performers";
- "low performers did nearly 10% worse because of the AI assistant, whereas high performers may have benefited by over 15%";
- "This differential impact does not appear to result from differences in the questions posed to the AI or the advice that it provided but rather, from the advice that entrepreneurs chose to implement."

The cold-read tester couldn't reach the published abstract, so couldn't confirm "over 0.20". It's in the Crossref abstract word for word, so it stays.

**Revised working paper** (eScholarship qt40s41244). I downloaded the PDF and read it. pdfinfo gives a creation date of July 1, 2024 and a modification date of July 17, 2024; the abstract gives "0.27 standard deviations" and "about 8% worse". The tester couldn't reach this version. Page numbers are the printed ones:
- 640 entrepreneurs randomly assigned to "a GPT-4-powered AI business assistant via WhatsApp" (p. 3); "business training guides" for the control group (p. 7);
- "an index that combines standardized measures of weekly and monthly revenue and profits" (p. 8);
- the median entrepreneur was "26 years old, had been running their business for one year, and held a college degree" (p. 8);
- businesses "from fast-food joints to poultry farms to cybershops", with the cybershops footnote (p. 8);
- below- and above-median "initial low performers" and "initial high performers" (p. 9);
- β = −0.09 s.d. (p = 0.007) and β = 0.19 s.d. (p = 0.07), "though this effect is noisier" (p. 9);
- the low-performer estimate "is equivalent to an approximately 8% drop in profits or revenue" (Table A12, p. 11);
- "exploratory text analysis" (p. 3);
- the "generic" versus "tailored and specific changes" passage, with "finding alternative ways to get power during blackouts" and the car wash detergent (p. 4).

**February 2024 working paper** (NBER conference copy f194654, read the same day; the tester confirmed it too):
- its abstract calls the AI an "AI business mentor";
- it says "low performers did worse because they sought help on more challenging business tasks."

**Not used in the figure:** the working papers' "0.27 standard deviations", "about 8% worse" and "just over 15%". The page mentions the revised paper's own conversion (p. 11) without applying it to the published percentages (verify fix 2). The tag on the AI's Part 2 is now "THEIR FLYER", as on the phone; "FROM THEIR FLYER" ran onto the card's border (verify fix 1).

## 7. What I couldn't verify

- **The published full text** is paywalled (HTTP 403), so I don't know whether the generic-versus-tailored reading survives in it. The page says that the published abstract doesn't mention it.
- **The figure's constructed details** (battery A, 6 hours, the discount, the lost rush jobs) are labelled as constructed in the setup and on the page.

## 8. Final frame and checks

The final frame, at player time 94.8 s:
- **Top:** the task card and the four documents. The flyer callout reads "THEIR OFFER / Cheaper prints"; the records callout reads "OUR SALES / Lost: rush jobs / (not given to AI)", with "Lost: rush jobs" underlined.
- **Plans:** both owners' plans, with Part 2 outlined. The second reads "Win them back: ~~loyalty discount~~ same-day service".
- **The AI's column:** receded, with the frontier between its answers and "THEIR FLYER" under Part 2.
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

1. **The evidence beat uses Otis,** shown as the study's result under the heading "A real study, not these owners", with the outcome named (revenue and profit).
2. **The workplace check:** the wording in section 4.
3. **The held-back sales records.** The owner keeps them from the AI, so Part 2 depends on something it didn't have. Is that a fair stand-in for the study's owners, who asked questions over WhatsApp?
4. **Phone wordings are shorter than desktop,** to keep the phone player within 844 px.

## 10. Classroom cast (CLASSROOM-PLAN.md section 4: the case packet)

The business edition in two more casts, through data in `editions/business.json` (`casts`, `castOverrides`, `byCast`). The timeline, picture, documents, answers and evidence stay as built. Open it with `?edition=business&cast=classroom` (higher ed: "the instructor", "class", "Instructor's check") or `&cast=high-school` ("the teacher", "class", "Teacher's check").

**The scenario change: a case packet.**
- The instructor or teacher gives every student the same packet: two battery quotes, the rival's flyer and the shop's sales records.
- Each student gives the AI the quotes and the flyer and leaves the records out, as the owner does in the workplace version. The setup gives a reason, so this doesn't look contrived: the records are "a separate exhibit at the back", and the quotes and flyer "seem to be all the questions need".
- The reviewer sees only the plans.
- The setup adds the disclosure line: "The {group} allows AI, and the students say they used it."

**Logic, kept.**
- Same access: the same packet for both students.
- No straw man: the first student checks Part 1 against both quotes.
- First difference: Part 2.
- **What the check does in class.** The reviewer knows the case, so the first plan's discount may already look off. In class, the check diagnoses rather than detects. The page says so in the check's follow-up: "The question shows why it went in: Part 1 was checked, and Part 2 was trusted because Part 1 checked out."
- The second student's answer is "The shop's records. Rush customers left." It's 6 words, under the 7-word budget, and it claims only what the records show. Blackouts were the owner's own knowledge in the workplace version, so they're dropped here.

**The study stays the study's.** The panel heading becomes "A REAL STUDY OF ENTREPRENEURS" ("A real study of entrepreneurs" on the phone; it was "shop owners" until the final verification, which found the sample described wrongly). The key line still reads "…which AI advice owners acted on". Both name the study's people, and the setup and the evidence paragraph add that no students took part. The business sensitivity rules hold: no weak or strong labels on people, and Nairobi stays matter-of-fact.

**Role conversion.**
- The 55 literals that `edition-check` flagged are now keys:
  - `{first}`, `{second}`, `{Person}`, `{people}`;
  - `{A_person|upper}`, `{the_person}`, `{The_person}`;
  - `{Another}`, `{That_person}`, `{each_person}`;
  - `{the_first}`, `{the_second}`, `{The_second}`, `{A_second}`;
  - `{reviewer_sees}`, `{Reviewer}`, `{reviewer}`.
- `castOverrides.workplace` carries the owner and reviewer words (owner, First owner, the reviewer, The reviewer sees…). The workplace edition therefore resolves string for string as before; a Node check with the runtime's `resolveEdition` compared every string.
- No new cast key was needed.

**`byCast.classroom`** is one patch set for both casts, written for a singular reviewer ("The instructor, who sees…" / "The teacher, who sees…"). `byCast["high-school"]` inherits it. Patched paths:
- the setup and the description;
- beat 1's caption and description, and beat 9's caption and description;
- the second student's spoken answer (picture and phone);
- the panel heading (picture and phone) and the beat 8 description;
- the records callout heading, "SHOP'S SALES";
- the phone's Part 1 line, "Part 1 · Printing in blackouts.", which keeps the phone player at 841 px;
- the check follow-up;
- evidence paragraphs 2 and 4: the study's entrepreneurs "used the assistant for their own small businesses", and the "median entrepreneur";
- the screen-reader summary.

**Words that differ from workplace** (the classroom and high-school wording is the same except for role words):

| Where | Classroom (high school) |
| --- | --- |
| Caption 1 | A student asks an AI two questions about the shop's case, sharing everything but the sales records. |
| Captions 3, 5, 6 | The student checks… / Another student… / That student… |
| Caption 9 | The instructor (The teacher), who sees only the plans, points to each part and asks what justified relying on it. |
| Caption 10 | Instructor's check (Teacher's check): What evidence justified relying on the AI here? / Ask part by part: was the evidence about that part? |
| Picture | FIRST/SECOND STUDENT'S PLAN, Student, First/Second student, THE INSTRUCTOR (TEACHER) SEES ONLY THE PLANS, A STUDENT'S OWN WORK, SHOP'S SALES, A REAL STUDY OF ENTREPRENEURS, "The shop's records. Rush customers left." |
| Setup | "In a business class, the instructor (teacher) gives every student the same case packet… The class allows AI, and the students say they used it… a study of entrepreneurs in Kenya. No students took part in it…" |

**Pace** (caption words ÷ 3 + 1.5 s, figure clock):

| # | Length (s) | Workplace | Classroom | High school |
| --- | --- | --- | --- | --- |
| 1 | 8.6 | 14, 6.2 | 17, 7.2 | 17, 7.2 |
| 2 | 7.0 | 6, 3.5 | same | same |
| 3 | 7.5 | 12, 5.5 | same | same |
| 4 | 7.2 | 10, 4.8 | same | same |
| 5 | 7.3 | 11, 5.2 | same | same |
| 6 | 11.0 | 13, 5.8 | same | same |
| 7 | 9.8 | 17, 7.2 | same | same |
| 8 | 9.5 | 13, 5.8 | same | same |
| 9 | 16.0 | 18, 7.5 | same | same |
| 10 | 6.7, then rests | 20, 8.2 | same | same |

Picture texts keep workplace's word counts or fewer. "THE INSTRUCTOR SEES ONLY THE PLANS" has 6 words, the same as the workplace label. The spoken answer drops from 7 words to 6.

**The switch:** "See this with: Workplace · Classroom · PME". Classroom is `data-edition-link="business" data-cast-link="classroom"`. `aria-current` was checked in four states:
- no query: PME;
- `?edition=business`: Workplace;
- `cast=classroom`: Classroom;
- `cast=high-school`: Classroom, with the link keeping `cast=high-school`.

**Checks** (classroom and high school):
- `edition-check`: no failures for workplace, classroom or high school.
- 1440 × 900: the picture, with the smallest label at 14.1 px.
- 1280 × 720: the picture at 11.1 px.
- 1366 × 657: the picture at 11.0 px.
- 390 × 844: the player is 841 px, the same as workplace.
- The controls never move, there's no horizontal scroll at 390 or 768, and the console is clean.
- The writing-as-jack mechanical check passes on the new copy (setup, description, captions, check, follow-up, evidence paragraphs, summary).
- **Workplace and PME after the change** (switch hidden, `--freeze`):
  - PME diffs 209/209 identical.
  - Workplace business resolves string for string as before. Its figure frames diff identical.
  - The only differences came from the in-progress runtime's name-card timing: the waiting view and one print shot differed between captures. Three fresh captures of the waiting view match the before capture.

**After classroom read 1** (`tests/classroom-read-1.md`). These are classroom-cast patches only; workplace and PME are unchanged.
- **The edge is named for the case.** Workplace's "outside the frontier" framing blamed the AI's ability, while in class the gap is records the student didn't share, so the classroom casts reword it:
  - beat 7's caption: "Part 2 turns on facts the AI wasn't given. Even with them, its answer would still need checking." (17 words, the same as workplace);
  - the labels: "COVERED BY ITS INPUT" and "NEEDS FACTS IT WASN'T GIVEN" (phone: "Input covers it ↑", "Needs facts it lacked ↓");
  - the tag: "FLYER ONLY" (workplace keeps "THEIR FLYER").
  - The follow-up on the page ends on the move itself: "check each part against the evidence for that part, including what the AI didn't see." The study panel is unchanged.
- **No confession.** The first student now gives a reasonable Part 2 answer that points to the flyer: "The flyer. They left because the rival is cheaper." (9 words, the same as workplace's). The second says "The shop's records. Rush customers left." Beat 9 asks a part-specific question: "The instructor (teacher), who sees only the plans, asks what each part rests on and why customers left." (17 words).
- **The check, for Jack:** "Instructor's check (Teacher's check): What evidence justified relying on the AI here? / Ask part by part. Part 2: why did customers leave?" The two lines are at equal weight. The second line is the separating question: the flyer shows only that the rival is cheaper, and the records show why customers left.
- **AI use is visible.** The key now reads "AI-DRAFTED, DISCLOSED" beside "A STUDENT'S OWN WORK". Beat 5's caption explains why the plans match: "Another student asks the same AI the same questions, then checks each answer at its source." (16 words; it needs 6.8 s, and the beat is 7.3 s.)
- **Less telegraphed.** The setup now says the student shares the quotes and the flyer, "judging the records beside the point for a pricing question."
- **Also fixed:** the beat 6 description and the summary say "Shop's sales" (they said "Our sales"), and the phone's frontier label row no longer runs off the edge.
- **Checked:**
  - `edition-check` passes, and the voice check passes on the new copy.
  - Both classroom casts show the picture at 1280 × 720 (11.1 px) and 1366 × 657 (11.0 px), with the smallest label at 14.1 px at 1440 × 900.
  - The phone player is 841 px at 390 × 844, with no overflow and a clean console.
  - Classroom and high-school baselines re-captured; workplace still resolves string for string.

**After classroom read 2** (`tests/classroom-read-2.md`, final fixes):
- **The checking is drawn.** As each student answers in beat 9, that part of their plan gets a red tag, kept to the end:
  - both students' Part 1: "✓ CHECKED: QUOTES";
  - the first student's Part 2: "USED AS IS", the beat 4 working mark's words;
  - the second student's Part 2: "✓ CHECKED: RECORDS".

  The phone tags read "✓ Quotes", "Used as is" and "✓ Records".
  - This is a core change, gated on data: `labels.finalTags` and `narrow.finalTags`. They're empty in the workplace edition, so nothing is drawn there, and `byCast` fills them for the classroom casts.
  - The tags sit where the working marks were, which lifted off at hand-in.
- **The final frame leads with the checks.** The key is relabelled "AI-DRAFTED (DISCLOSED)" and "A STUDENT'S CHECKS AND EDITS". Red still means a person's own decisions, as in every figure: the checks, the edit and the names.
- **Why the records stay out:** "The second question seems to be about the rival's lower prices, so a student asks an AI and shares the quotes and the flyer." Beat 1's caption still says the records stay out.
- **Phone:**
  - In the classroom casts the tabs are 11 px, set by a CSS rule keyed to the page's cast attribute. They now clear the names and the plan text.
  - The names read "Student 1" and "Student 2".
  - A compact key (`narrow.key`: "AI-drafted (disclosed)", "● Checks and edits") sits under the answers.
  - "(not given to AI)" moved into the records line.
  - The player is 844 px.
- **Checked:**
  - `edition-check` passes, and the voice check passes on the new copy.
  - At 1280 × 720 the smallest label is 11.1 px; at 1366 × 657 it's 11.0 px.
  - Phone 844 px, no overflow, clean console.
  - PME diffs 209/209 against its baseline.
  - Workplace: every frame that differs between before and after also differs between two captures of one build (the load noise in CONVENTIONS.md). No frame differs in every before/after pairing, measured with the stable recipe (`--disable-partial-raster`, a 120 ms settle).
  - Classroom and high-school baselines re-captured.

**Stills:** `shots/business-classroom/` and `shots/business-high-school/`. Each has a still per beat, `final.png`, `final-1440.png`, `final-1366.png`, `final-390.png`, `player-390-final.png`, and reduced and page views.

**Baselines** (switch hidden, `--freeze`): `regression/baseline` (PME), `baseline-business`, `baseline-business-classroom`, `baseline-business-high-school`.

## 11. PME polish pass (October 30)

PME already shows the drawn picture on laptop windows, through the short-window rule added in business round 2 (section 2, item 7). It applies to every edition:
- 1280 × 720: the picture, smallest label 11.1 px ("AID REPORT");
- 1366 × 657: the picture, 11.0 px, with a 100 px caption band.

No PME change was needed. A before-and-after capture shows only the waiting view and the page and print shots changed since the old baseline, from other page work (load gate, switch); every figure frame is identical. The PME baseline was re-captured with `--freeze` and the switch hidden.
