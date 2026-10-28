# Uncalibrated reliance: storyboard

Motion figure 4 of 8 · slug `uncalibrated-reliance` · storyboard round 2, revised after storyboard cold read 1 · October 27, 2026

*Cold-read copy. The Intent section is removed.*

## 2. Scenario

A war-college student must estimate relief capacity for a port city, using four reports. The task has two parts that look alike: relief trucks a day by road, and relief ships a day by sea. The student gives an AI all four reports, and it answers both in the same form and with the same confidence: about 60 trucks a day from 3 checkpoints at 20 each, and about 20 ships a day from 4 docks at 5 each. The student checks the first answer against the two road reports, finds it right, and uses both. A second student gets the same answers and checks each against its own reports. Part 1 checks out, but for Part 2 the port survey's 4 docks are out of date: the harbor log says dock 2 is closed for repairs, so the second student corrects the estimate to about 15. When faculty ask each what justified relying on Part 2, the first student points to Part 1 and the sure tone; the second points to the port reports.

*Sources.* The task, the four reports, both AI answers, the checkpoints, the docks and both students' answers are constructed for this figure, and the task card says "Example task". *The Irreducible Officer*, Section II, defines uncalibrated reliance; Section V describes the jagged frontier and the difference between trust and reliance. The study figures are from the source spine's Jagged Frontier entry (Dell'Acqua et al., 2023, HBS working paper 24-013): on a task chosen to fall outside the frontier, consultants without AI were right about 84.5% of the time and the two AI groups 60% and 70%, and graders still rated the AI users' recommendations higher in quality. The only other numbers on screen are the scenario's, which are constructed.

## 3. Cast and grammar

**The colour rule.** Grey is what the AI supplied: its two answers, their "READY" tags, the "AI'S ANSWERS" label, the copies of the reports it was given, and the AI's words wherever they are copied into a brief. Red is what a student decided, plus the dots and their name labels: the reliance tags and the second student's corrections. Navy ink is the page: the task, the reports, the labels, the frontier, the evidence panel, faculty's outlines, and everything a student says aloud.

**Palette.** Paper `#f6f1e8`, paper-bright `#fffdfa`, ink `#0a2242`, machine grey `#5b564f` with a `#ded5c4` band behind AI-supplied text, red `#b81b2b`. Type: Source Serif 4 for answers, callouts, speech and captions; Source Sans 3 for name labels and the evidence panel; IBM Plex Mono for small labels (12 units, never smaller).

**Stage.** An SVG with a 960 × 540 viewBox. One view, no camera moves.
- *Top band* (y 16–116): the task card at left, the four reports at right.
- *Three columns* (y 132–370): the first student's brief (x 24–308), the AI's answers (x 338–622), the second student's brief (x 652–936). Part 1 sits in a row at y 144–212 and Part 2 in a row at y 296–364, across all three columns.
- *Bottom band* (y 384–528): the students' dots, then faculty's header and the speech panels in beat 9.
- *Centre stage* (beats 7–8): the evidence panel over the dimmed scene.

Positions are viewBox units. Widths of text-sized elements and line breaks come from measured text at build time.

| Element | Stands for | How it looks | Where |
| --- | --- | --- | --- |
| Task card | The assignment | Paper-bright card, hairline ink border (15%). Mono 12 "EXAMPLE TASK", then Serif 16 ink "For relief planners, estimate:", then Serif 15 ink "Part 1 · Trucks a day by road" and "Part 2 · Ships a day by sea". Stays throughout | x 24–308, y 16–110; baselines 36, 60, 82, 102 at x 40 |
| Reports | The four sources | Paper-bright cards 136 × 40, hairline ink border (15%), rounded 3, mono 12 ink labels: ROAD REPORT A, ROAD REPORT B, PORT SURVEY, HARBOR LOG. Stay throughout | y 24–64; x 338, 486, 652, 800 |
| Opened road report | A close read | The card grows 16 units downward and shows two ink note bars (70%, 3 high). Closes when its reader leaves | Inside the card |
| Opened port report | Its relevant line | A callout under the card: paper-bright box, hairline ink border, Serif 15 ink on two lines. Port survey: "4 docks," / "about 5 ships each." Harbor log: "Dock 2: closed" / "for repairs." Stays open once opened | Survey x 648–792, harbor log x 800–936; y 70–114 |
| Copies to the AI | The student handing over the reports | Four faint grey rectangles, one from each report, sliding down to the AI column and fading as they arrive | From each report to (480, 132) |
| First red dot | The first student | Solid red circle, radius 5, labelled "Student" (Sans 600 13, red) in beats 1–2 | Home (36, 430); label at (48, 434) |
| "AI'S ANSWERS" | Names the centre column | Mono 12 grey | Baseline (338, 132) |
| AI answer cards | The AI's two answers | Paper-bright cards with hairline border. Mono 12 grey "PART 1" / "PART 2" at top left; grey "READY" tag at top right; Serif 15 grey text on a grey band in two fixed lines. Part 1: "About 60 trucks a day:" / "3 checkpoints at 20 each." Part 2: "About 20 ships a day:" / "4 docks at 5 each." Stay throughout | Part 1 x 338–622, y 144–212; Part 2 x 338–622, y 296–364. Labels baselines 162 / 314; text baselines 186, 206 / 338, 358 |
| First student's brief | What the first student hands in | Paper-bright sheet, hairline border, soft shadow, labelled mono 12 ink "FIRST STUDENT'S BRIEF". Two sections laid out like the AI cards, with ink "PART 1" / "PART 2" labels and the AI's grey text on its band | Sheet x 24–308, y 138–370; label baseline (24, 132) |
| Reliance tags | Each student's decision on each part | Red mono 12, right-aligned at the top of a section, written by that student's dot: "✓ CHECKED" or "USED AS IS" | Right edge x 296 (first brief) or x 924 (second brief); baselines 162 and 314 |
| Second red dot | The second student | Solid red circle, radius 5, labelled "Second student" (Sans 600 13, red) in beat 4 | Home (664, 430); label at (676, 434) |
| Second student's brief | What the second student hands in | Same as the first brief, labelled "SECOND STUDENT'S BRIEF". In Part 2, the AI's "20" and "4" are struck through with a red line and followed by red "15" and "3 working": "About ~~20~~ 15 ships a day:" / "~~4~~ 3 working docks at 5 each." | Sheet x 652–936, y 138–370; label baseline (652, 132) |
| Jagged frontier | The uneven edge of what the AI did well on this task | An irregular navy line, stroke 1.6, with uneven teeth (segments 10–40 units long, 4–16 deep), drawn only across the AI column between its two cards. One tooth reaches within 8 units of the Part 2 card, another within 8 units of the Part 1 card. Mono 12 ink "INSIDE THE FRONTIER" above it and "OUTSIDE THE FRONTIER" below it | Line x 330–630, y 236–276; labels centred x 480, baselines 228 and 290 |
| Dimmed scene | Attention moves to the study | Everything on the stage drops to 25% while the evidence panel is up | Beats 7–8 |
| Evidence panel | The study | Paper-bright panel, hairline border, soft shadow. Sans 600 18 ink "Right answers on a task chosen to fall outside the frontier". Row "Without AI" (Sans 16): one ink bar (85%), 20 high, to 84.5%, value "84.5%". Row "With AI" with mono 12 "TWO GROUPS" under it: two ink bars, 12 high, to 60% and 70%, values "60%" and "70%". Scale 4 units per percentage point. Mono 12 ink (60%) source line "DELL'ACQUA ET AL. (2023) · BCG CONSULTANTS · HBS WORKING PAPER 24-013" | Panel x 120–840, y 150–400. Title baseline 192 at x 148; bars from x 300; rows at y 232–252 and y 286–298, 304–316; source baseline 382 |
| Quality bracket | The quality finding | A navy bracket beside the two "With AI" bars, with Serif italic 17 ink "Rated higher" / "in quality" | Bracket x 680, y 282–320; text from x 694 |
| Faculty header | Faculty ask about one part | Mono 12 ink "FACULTY POINT TO PART 2" over "AND ASK EACH STUDENT", centred | Centred x 480, baselines 410 and 426 |
| Faculty outlines | Which part faculty mean | A navy rounded outline (radius 6, stroke 1.5) around Part 2 in both briefs | x 30–302 and x 658–930, y 290–370 |
| Speech panels | What each student says | Paper-bright box, rounded 8, hairline ink border (25%), small tail toward the student's dot. Serif 15 ink in quotation marks. Words appear at about 3 words a second | First x 52–308, second x 680–936; y 390–478 |
| Caption band | The words for each beat | Real text under the picture: a mono counter ("3 / 10") and the caption in Serif 22 ink. In beat 10: mono 13 ink "FACULTY CHECK" over the check in Serif italic 30, then directly under it at the same size and style, "Point to one part. Was the evidence about that part?" Fixed height on desktop, sized for both lines | Under the stage |
| Beat list | Text equivalent and navigation | Ten numbered captions with "On screen" lines (visible in reduced-motion, print and narrow views; always available to screen readers). The current beat has a navy rule | Under the controls |

**The answers.**

| | "What justified relying on Part 2?" |
| --- | --- |
| First student (ink) | "I checked Part 1, and it was right. This sounded just as sure." |
| Second student (ink) | "I checked it against the port reports. One dock is closed." |

**Narrow screens.** Any picture text that would render under 11 px is hidden, and at 390 px wide that is all of it. The speech panels and callouts hide with their text, so no empty boxes show. The stage then shows the shapes: the cards and sheets with their grey bands, the dots, the frontier, the bars, the red strikes and the outlines. Each beat's "On screen" line shows under its caption in the beat list and quotes every answer, tag and number in full. The caption band carries the captions at full size.

## 4. Beats

Times are absolute seconds. In every beat the caption changes first (0.3 s fade) and nothing in the picture moves for the first second. A change the caption is about starts only after the caption can be read once, except a lead-in that the caption's first clause describes.

### Beat 1 · 0.0–8.0 s · The task

- **On screen at the start:** an empty paper stage.
- **What moves:**
  1. 1.0–1.6: the task card fades in and rises 6 units at top left.
  2. 1.6–2.0: the red dot grows in at (36, 430), with its "Student" label.
  3. 2.1–3.5: the four reports fade in one at a time across the top right, 0.3 s each, one every 0.37 s: Road report A, Road report B, Port survey, Harbor log.
  4. 3.5–8.0: hold.
- **Caption:** "A student gets a two-part task and four reports to use."
- **Notice:** the red dot is the student. The two parts read the same way: trucks a day by road, ships a day by sea. Four reports sit unopened, two about the road and two about the port.
- **Why:** the setup names the situation before anything goes wrong, and shows that the parts look alike from the start.

### Beat 2 · 8.0–16.7 s · The AI answers both

- **What moves:**
  1. 9.0–9.4: the dot pulses once. The student asks.
  2. 9.4–10.2: a faint grey copy slides from each report down to the centre column, one after another, and fades as it arrives. The AI has all four reports.
  3. 10.2–10.6: "AI'S ANSWERS" fades in above the centre column.
  4. 10.6–11.8: both answer cards rise 8 units and fade in together, with identical motion: Part 1 above, Part 2 below.
  5. 12.3–12.7: a grey "READY" tag fades in on each card at the same moment.
  6. 12.7–16.7: hold.
- **Caption:** "The student gives an AI the reports. It answers both with equal confidence."
- **Notice:** the AI gets every report, including the harbor log. Its two answers have the same shape, the same tone and the same tag. Part 1: "About 60 trucks a day: 3 checkpoints at 20 each." Part 2: "About 20 ships a day: 4 docks at 5 each."
- **Why:** this is "the output is confident", shown as two answers nobody could tell apart by their presentation. The copies are the lead-in the first sentence describes; the tags arrive 4.3 s in, after the caption can be read once.

### Beat 3 · 16.7–25.4 s · The student checks Part 1 and uses both

- **What moves:**
  1. 17.7–18.3: the "Student" label fades as the dot moves up to Road report A.
  2. 18.3–18.9: Road report A opens and shows its note bars.
  3. 18.9–19.3: the dot moves to Road report B.
  4. 19.3–19.9: Road report B opens.
  5. 20.1–20.8: an empty sheet labelled "FIRST STUDENT'S BRIEF" fades in at left while a copy of the Part 1 answer slides into its Part 1 section. The dot moves to the top of that section.
  6. 20.9–21.3: the dot writes "✓ CHECKED" in red.
  7. 21.4–22.0: a copy of the Part 2 answer slides into the Part 2 section.
  8. 22.0–22.4: the dot writes "USED AS IS" in red.
  9. 22.5–23.0: the road reports close, and the dot returns to its place.
  10. 23.0–25.4: hold.
- **Caption:** "The student checks Part 1, and it's right, so they use both answers."
- **Notice:** the student does real checking: both road reports, before using anything. Part 1 passes. Part 2 goes into the brief on the strength of that check. The port reports stay closed.
- **Why:** this is the reasonable impulse, and the moment trust earned on one part becomes reliance on the other. The check is the lead-in the first clause describes; Part 2 goes in 4.7 s in, after the caption can be read once.

### Beat 4 · 25.4–34.1 s · Another student checks each answer

- **What moves:**
  1. 26.4–26.8: a second red dot grows in at (664, 430), labelled "Second student".
  2. 26.8–27.2: an empty sheet labelled "SECOND STUDENT'S BRIEF" fades in at right.
  3. 27.3–27.7: the dot pulses once, and both "READY" tags blink: the AI gives this student the same two answers.
  4. 27.8–28.4: the "Second student" label fades as the dot moves up to Road report A.
  5. 28.4–29.0: Road report A opens.
  6. 29.0–29.4: the dot moves to Road report B.
  7. 29.4–30.0: Road report B opens.
  8. 30.2–30.9: a copy of the Part 1 answer slides into the second brief's Part 1 section. The dot moves to the top of that section.
  9. 31.0–31.4: the dot writes "✓ CHECKED" in red.
  10. 31.5–32.0: the road reports close, and the dot returns to its place.
  11. 32.0–34.1: hold.
- **Caption:** "Another student, with the same AI answers, checks each against its own reports."
- **Notice:** the second student starts exactly as the first did: the same answers, the same two road reports, the same pace, the same tag. Nothing on screen tells them anything about Part 2 yet.
- **Why:** this sets up the one difference. The caption states the second student's habit before any reveal, so what comes next follows from the habit, not from knowing the answer. The check is the lead-in the caption's main clause describes.

### Beat 5 · 34.1–42.1 s · That student checks Part 2 too

- **What moves:**
  1. 35.1–35.6: the dot moves up to the Port survey.
  2. 35.6–36.2: the Port survey opens; its callout reads "4 docks, about 5 ships each."
  3. 36.2–36.6: the dot moves to the Harbor log.
  4. 36.6–37.4: the Harbor log opens; its callout reads "Dock 2: closed for repairs."
  5. 37.5–38.1: a copy of the Part 2 answer slides into the second brief's Part 2 section. The dot follows.
  6. 38.2–38.8: the dot strikes through "20" with a red line and writes "15" after it in red.
  7. 38.8–39.4: the dot strikes through "4" and writes "3 working" after it.
  8. 39.5–39.9: the dot writes "✓ CHECKED" in red on Part 2.
  9. 40.0–40.4: the dot returns to its place.
  10. 40.4–42.1: hold.
- **Caption:** "That student checks Part 2 against the port reports, and corrects it."
- **Notice:** the port survey agrees with the AI. The harbor log doesn't: one of the four docks is closed. The second student keeps the AI's wording and changes two numbers. The first student's brief, beside it, still says 20.
- **Why:** this is the independent check the essay asks for, made before the error travels downstream. The callouts are the lead-in the first clause describes; the correction starts 4.1 s in, after the caption can be read once.

### Beat 6 · 42.1–52.8 s · From outside, both parts look the same (the turn)

- **What moves:**
  1. 43.1–43.7: the AI's Part 1 card pulses: its band and "READY" tag brighten and settle.
  2. 43.9–44.5: the AI's Part 2 card pulses the same way.
  3. 47.4–48.8: an irregular navy line with uneven teeth draws from left to right across the AI column, between its two cards. One tooth reaches close to Part 2, another close to Part 1.
  4. 48.8–49.2: "INSIDE THE FRONTIER" fades in above the line and "OUTSIDE THE FRONTIER" below it.
  5. 49.2–52.8: hold.
- **Caption:** "From outside, both parts look the same. Researchers call an edge like this a jagged frontier."
- **Notice:** the two answers pulse identically: same form, same tag. The line between them is uneven and runs close to both. Part 1 sits inside it, Part 2 just outside, and nothing on the cards shows that.
- **Why:** this is the mechanism made visible: look-alike tasks on opposite sides of an edge the output doesn't show. The pulses carry the first sentence; the line starts 5.3 s in, after the caption can be read once.

### Beat 7 · 52.8–62.1 s · The study

- **What moves:**
  1. 53.8–54.3: everything on the stage dims to 25%.
  2. 54.3–54.9: the evidence panel rises centre stage: "Right answers on a task chosen to fall outside the frontier", the row labels "Without AI" and "With AI · two groups", and the source line.
  3. 57.5–58.1: the "Without AI" bar grows to 84.5%.
  4. 58.2–58.8: the two "With AI" bars grow together, to 60% and 70%.
  5. 58.8–62.1: hold.
- **Caption:** "In a field experiment, consultants with AI were right less often outside the frontier."
- **Notice:** the bars for the two groups with AI stop short of the bar for the group without. This is a real study of consultants, not the port task.
- **Why:** it shows the edge isn't a quirk of one example. The panel is the lead-in the first clause describes; the bars start 4.7 s in, after the caption can be read once.

### Beat 8 · 62.1–68.8 s · Rated higher

- **What moves:**
  1. 65.4–65.9: a navy bracket draws beside the two "With AI" bars.
  2. 65.9–66.3: beside it, in italic: "Rated higher in quality".
  3. 66.3–68.8: hold.
- **Caption:** "Graders still rated the AI users' recommendations higher in quality."
- **Notice:** the bracket sits on the two shorter bars. The groups that were right less often turned in work that graders rated higher.
- **Why:** polish and confidence don't show which side of the frontier an answer came from, for students or for graders. It sets up why faculty have to ask. The bracket starts 3.3 s in.

### Beat 9 · 68.8–82.7 s · Faculty ask

- **On screen at the start:** the dimmed scene with the evidence panel.
- **What moves:**
  1. 69.8–70.3: the evidence panel fades, and the scene returns to full strength.
  2. 70.3–70.9: centred in the bottom band, "FACULTY POINT TO PART 2 / AND ASK EACH STUDENT" fades in and rises 6 units.
  3. 71.0–71.6: navy outlines draw around Part 2 in both briefs.
  4. 72.1–72.5: a speech panel opens beside the first student's dot.
  5. 72.5–76.8: the first student's words appear at about 3 words a second: "I checked Part 1, and it was right. This sounded just as sure."
  6. 77.1–77.5: a speech panel opens beside the second student's dot.
  7. 77.5–81.2: the second student's words appear at the same pace: "I checked it against the port reports. One dock is closed."
  8. 81.2–82.7: hold.
- **Caption:** "Faculty ask each student what justified relying on Part 2."
- **Notice:** both students give a reason, in their own words, in the same ink. The first student's reason is a check of Part 1 and how Part 2 sounded. The second student's reason is a check of Part 2's own reports.
- **Why:** this is the essay's "what evidence would justify that delegation", asked aloud. Faculty hear the difference. The first answer starts 3.3 s in, after the caption can be read once.

### Beat 10 · 82.7–89.4 s · The faculty check

- **What moves:**
  1. 82.7–82.9: caption 9 fades out.
  2. 82.9–83.5: the faculty check rises into the caption band: "FACULTY CHECK" in navy mono, then the question in large italic.
  3. 86.0–86.5: directly under it, at the same size, "Point to one part. Was the evidence about that part?"
  4. 86.5–89.4: hold. At 89.4 the player shows Replay and the figure rests on this frame.
- **Caption:** "Faculty check: What evidence justified relying on the system here?" Second line, same size: "Point to one part. Was the evidence about that part?"
- **Notice:** the picture above is that move, made on two students who used the same AI answers. Point to either part of the second brief and there is evidence about it.
- **Why:** the figure ends on the check and the move an educator can make.

## 5. Final frame

The still at 89.4 s. It is also the reduced-motion view, the print view and the poster (stage plus caption band).

**Stage:**
- **Top left:** the task card, "EXAMPLE TASK" over "For relief planners, estimate: Part 1 · Trucks a day by road. Part 2 · Ships a day by sea."
- **Top right:** four reports, Road report A, Road report B, Port survey and Harbor log. The port survey is open ("4 docks, about 5 ships each.") and so is the harbor log ("Dock 2: closed for repairs.").
- **Three columns,** with Part 1 in the upper row and Part 2 in the lower row:
  - *Left,* "FIRST STUDENT'S BRIEF": Part 1 in the AI's grey text, tagged "✓ CHECKED"; Part 2 in the AI's grey text, "About 20 ships a day: 4 docks at 5 each.", tagged "USED AS IS" and outlined in navy.
  - *Centre,* "AI'S ANSWERS": both answer cards, each tagged "READY". Between them, the irregular navy frontier, with "INSIDE THE FRONTIER" above and "OUTSIDE THE FRONTIER" below.
  - *Right,* "SECOND STUDENT'S BRIEF": Part 1 in the AI's grey text, tagged "✓ CHECKED"; Part 2 in the AI's grey text with "20" and "4" struck through and red "15" and "3 working" written in, tagged "✓ CHECKED" and outlined in navy.
- **Bottom band:** at left, the first student's red dot and their answer: "I checked Part 1, and it was right. This sounded just as sure." In the centre, "FACULTY POINT TO PART 2 / AND ASK EACH STUDENT". At right, the second student's red dot and their answer: "I checked it against the port reports. One dock is closed."

**Caption band:**

> FACULTY CHECK *(navy mono)*
> *What evidence justified relying on the system here?* *(Serif italic, about 30 px)*
> *Point to one part. Was the evidence about that part?* *(Serif italic, same size as the line above)*

**In the reduced-motion and print views,** all ten captions and their "On screen" lines are readable below the controls. Clicking a beat shows its settled still.

**What the still says alone:** two students got the same two AI answers, alike in form and both marked ready. Both checked Part 1. The first used Part 2 as is; the second checked it against the port reports, found a closed dock and corrected it. An uneven line between the AI's answers puts Part 2 just outside the frontier. Asked what justified relying on Part 2, one names a check of Part 1, the other a check of Part 2's reports. The lines under the picture say what to ask and what to listen for.

## 6. Standalone page copy

**Title:** Uncalibrated reliance

**Kicker:** Failure mode 4 of 7

**Setup:**

A student asks an AI for help with a two-part task. They check its first answer, find it right, and use both. *The Irreducible Officer* calls what can happen next uncalibrated reliance: the student accepts confident output without knowing whether the task fits the tool. The figure runs a minute and a half; pause it or step through the beats below. The task, the reports and both students are a constructed example. The research figures come from Dell'Acqua et al. (2023).

**Figure summary** (visually hidden, for screen readers): An animated figure. A red dot stands for a student with an example task for relief planners in two parts: estimate trucks a day by road, and ships a day by sea. Four reports sit unopened: two road reports, a port survey and a harbor log. The student gives the AI all four reports. It gives two answers in identical cards, each marked ready. Part 1: "About 60 trucks a day: 3 checkpoints at 20 each." Part 2: "About 20 ships a day: 4 docks at 5 each." The student checks Part 1 against both road reports, finds it right, and puts both answers into their brief, tagging Part 1 "checked" and Part 2 "used as is". A second student gets the same answers and checks each against its own reports. Part 1 checks out against the road reports. For Part 2, the port survey says 4 docks at about 5 ships each, but the harbor log says dock 2 is closed for repairs. The second student corrects the estimate to about 15 ships from 3 working docks, keeping the AI's wording, and tags both parts "checked". The two AI answers pulse alike, and an uneven line labelled the frontier is drawn between them, with Part 1 inside and Part 2 outside. A panel shows a field experiment with BCG consultants: on a task chosen to fall outside the frontier, the group without AI got the right answer about 84.5% of the time, and the two groups with AI 60% and 70%. Graders still rated the AI users' recommendations higher in quality. Faculty point to Part 2 in both briefs and ask each student what justified relying on it. The first student says, "I checked Part 1, and it was right. This sounded just as sure." The second says, "I checked it against the port reports. One dock is closed." The figure ends on the faculty check. Each beat is listed below with what is on screen.

**Beat list (text equivalent):**

1. **A student gets a two-part task and four reports to use.** *On screen:* a task card appears at the top left: "Example task. For relief planners, estimate: Part 1, trucks a day by road. Part 2, ships a day by sea." A red dot labelled Student appears below. Four reports appear across the top right: Road report A, Road report B, Port survey and Harbor log.
2. **The student gives an AI the reports. It answers both with equal confidence.** *On screen:* the dot pulses, and a faint copy of each report slides to the centre. Two answer cards labelled "AI's answers" appear together, each tagged "Ready". Part 1: "About 60 trucks a day: 3 checkpoints at 20 each." Part 2: "About 20 ships a day: 4 docks at 5 each."
3. **The student checks Part 1, and it's right, so they use both answers.** *On screen:* the dot opens both road reports. A sheet labelled "First student's brief" appears at left. The Part 1 answer goes into it, and the dot tags it "Checked". The Part 2 answer goes in too, and the dot tags it "Used as is".
4. **Another student, with the same AI answers, checks each against its own reports.** *On screen:* a second red dot labelled Second student appears at right, with an empty sheet labelled "Second student's brief". The dot pulses and both "Ready" tags blink. The dot opens both road reports, puts the Part 1 answer into its brief and tags it "Checked".
5. **That student checks Part 2 against the port reports, and corrects it.** *On screen:* the dot opens the port survey, "4 docks, about 5 ships each", and the harbor log, "Dock 2: closed for repairs." The Part 2 answer goes into the second brief. The dot strikes out "20" and "4" and writes "15" and "3 working", so it reads "About 15 ships a day: 3 working docks at 5 each." It tags Part 2 "Checked". The first brief still says 20.
6. **From outside, both parts look the same. Researchers call an edge like this a jagged frontier.** *On screen:* the AI's two answer cards pulse one after the other, identically. An uneven line is drawn between them, labelled "Inside the frontier" above and "Outside the frontier" below.
7. **In a field experiment, consultants with AI were right less often outside the frontier.** *On screen:* the picture dims and a panel rises in the middle: right answers on a task chosen to fall outside the frontier. Without AI: 84.5%. With AI, two groups: 60% and 70%. Source: Dell'Acqua et al. (2023), BCG consultants, HBS working paper 24-013.
8. **Graders still rated the AI users' recommendations higher in quality.** *On screen:* a bracket beside the two "With AI" bars reads "Rated higher in quality".
9. **Faculty ask each student what justified relying on Part 2.** *On screen:* the panel goes and the picture returns. "Faculty point to Part 2 and ask each student" appears between the students, and Part 2 is outlined in both briefs. The first student says: "I checked Part 1, and it was right. This sounded just as sure." The second student says: "I checked it against the port reports. One dock is closed."
10. **Faculty check: What evidence justified relying on the system here? Point to one part. Was the evidence about that part?** *On screen:* the questions appear under the picture at the same size. Both briefs, the AI's answers, the frontier and both answers stay in view.

**Faculty check:** What evidence justified relying on the system here?
**Point to one part. Was the evidence about that part?** (same size)

Both students in the figure give a reason for relying on Part 2. The second line separates them. The first student's evidence is about Part 1; the second student's is about Part 2. The second student checks each answer against the reports it rests on, so their evidence for each part is about that part. Section II of the essay asks students to identify which part of the task they are delegating, what evidence would justify that delegation, and what independent checks are required.

**From the essay** (*The Irreducible Officer*, Section II, What the Problem Looks Like):

> Uncalibrated reliance begins with a reasonable impulse: AI is useful, the output is confident, and parts of the task feel tedious. The problem is that AI performance is uneven in ways that are not always visible from the outside. Tasks that look similar may differ significantly in whether AI helps or hurts. Appropriate reliance requires the student to identify which part of the task they are delegating, what evidence would justify that delegation, and what independent checks are required before discovering the error downstream.

And from Section V, Appropriate Reliance as a Teachable Competency:

> The distinction between trust and reliance matters here. Trust is a subjective disposition, a feeling of confidence that a system will perform well. Reliance is the observable act of accepting its output and acting on it. Appropriate reliance is harder and more discriminating: accepting support when it is warranted, refusing or verifying when it is not, and being able to give an account of the difference (Raees & Papangelis, 2026).

**Evidence:** Dell'Acqua et al., [Navigating the Jagged Technological Frontier](https://www.hbs.edu/faculty/Pages/item.aspx?num=64700), HBS working paper 24-013 (2023). On a task chosen to fall outside the frontier, consultants without AI were right about 84.5% of the time and the two AI groups 60% and 70%: in the working paper's words, "19 percentage points less likely to produce correct solutions." Graders still rated the AI users' recommendations higher in quality "regardless of the correctness of their answer."

**Links:**
- Make the call yourself: in the appropriate reliance figure, you decide whether to rely on the AI for two tasks from the same study before the frontier appears → `../appropriate-reliance/`
- Book chapter: Calibrate the tool → `../../book-v0/four-moves-book.html?spread=3`
- Practice: test uncalibrated reliance with your AI assistant → `https://judgmentlab.net/#companion`
- Essay: Section II, What the Problem Looks Like → `https://judgmentlab.net/#ii-what-the-problem-looks-like`
- Essay: Section V, Appropriate Reliance as a Teachable Competency → `https://judgmentlab.net/#v-appropriate-reliance-as-a-teachable-competency`

## 7. Pacing table

Reading time is caption words ÷ 3. The beat total is lead + motion + hold, and every total is at least twice the caption's reading time. Label words are new words inside the picture, answers included; motion includes any wait for the caption to be read once, and the time the answers take to appear.

| Beat | Time (s) | Caption words | Reading (s) | 2× (s) | Label words | Lead (s) | Motion (s) | Hold (s) | Total (s) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · The task | 0.0–8.0 | 11 | 3.7 | 7.3 | 31 | 1.0 | 2.5 | 4.5 | 8.0 |
| 2 · The AI answers both | 8.0–16.7 | 13 | 4.3 | 8.7 | 26 | 1.0 | 3.7 | 4.0 | 8.7 |
| 3 · Checks Part 1, uses both | 16.7–25.4 | 13 | 4.3 | 8.7 | 11 | 1.0 | 5.3 | 2.4 | 8.7 |
| 4 · Another student checks each answer | 25.4–34.1 | 13 | 4.3 | 8.7 | 10 | 1.0 | 5.6 | 2.1 | 8.7 |
| 5 · That student checks Part 2 too | 34.1–42.1 | 12 | 4.0 | 8.0 | 15 | 1.0 | 5.3 | 1.7 | 8.0 |
| 6 · Both parts look the same | 42.1–52.8 | 16 | 5.3 | 10.7 | 6 | 1.0 | 6.1 | 3.6 | 10.7 |
| 7 · The study | 52.8–62.1 | 14 | 4.7 | 9.3 | 20 | 1.0 | 5.0 | 3.3 | 9.3 |
| 8 · Rated higher | 62.1–68.8 | 10 | 3.3 | 6.7 | 4 | 1.0 | 3.2 | 2.5 | 6.7 |
| 9 · Faculty ask | 68.8–82.7 | 10 | 3.3 | 6.7 | 33 | 1.0 | 11.4 | 1.5 | 13.9 |
| 10 · Faculty check | 82.7–89.4 | 8 + 10 second line | 2.7 + 3.3 | 5.3 (check) | 0 | 0.0 | 3.8 | 2.9 | 6.7, then rests |
| **Total** | | **130** | **43.3** | | **156** | | **51.9** | | **89.4** |

Checks:
- One idea per beat; movements run one after another.
- Changes a caption names wait until it can be read once: the "READY" tags (beat 2, 4.3 s in), Part 2 going into the first brief (beat 3, 4.7 s), the correction (beat 5, 4.1 s, after 4.0 s of reading), the frontier (beat 6, 5.3 s), the bars (beat 7, 4.7 s), the bracket (beat 8, 3.3 s), the first answer (beat 9, 3.3 s) and the second line under the check (beat 10, 3.3 s after the check).
- Lead-ins the caption's first or main clause describes start early, as in figures 1–3: the copies to the AI (beat 2), the check of the road reports (beats 3 and 4), the port callouts (beat 5), the pulses (beat 6) and the panel (beat 7).
- Both students check Part 1 with the same motion and timing: 0.6 s to the first road report, 0.6 s to open it, 0.4 s to the second, 0.6 s to open it, 0.7 s to place Part 1, 0.4 s for the tag.
- The second student's work (beats 4–5) is complete before the frontier appears (beat 6).
- Spoken words appear at about 3 words a second: 13 words in 4.3 s and 11 words in 3.7 s. Each stays on screen to the end, and the second holds 1.5 s before the check.
- Every hold is at least 1.5 s.
- **In-picture reading.**
  - Beat 1 adds the task card (20 words) and the report labels (10). Only the caption and the task card need reading here, 31 words in 8.0 s. The report labels stay on screen throughout.
  - Beat 2 adds 26 words, mostly the two answers, which stay on screen to the end and are reread in beats 3–6. Beats 2 and 3 together carry 63 words in 17.4 s.
  - Beat 5 carries 27 words (caption, two callouts, corrections, tag) in 8.0 s.
  - Beats 6–8, round 1's dense stretch, now carry 70 words in 26.7 s: 22 in beat 6, 34 in beat 7 and 14 in beat 8. The panel's text stays up through beat 8. The source line isn't counted; it is reference, not reading.
  - Beat 9 carries 43 words (caption, header, two answers) in 13.9 s, with the answers at reading pace.
- No camera moves. The scene dims once, for the evidence panel, and returns. Reduced motion shows the final frame.
- Total 89.4 s.
