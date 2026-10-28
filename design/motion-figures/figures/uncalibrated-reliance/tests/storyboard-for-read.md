# Uncalibrated reliance: storyboard

Motion figure 4 of 8 · slug `uncalibrated-reliance` · storyboard round 4, revised after figure cold read 1 · October 28, 2026

*Cold-read copy. The Intent section is removed.*

## 2. Scenario

A war-college student must estimate two things for relief planners: how many supply ships are needed a day, and how many ships the port can take a day. The student gives an AI four reports: two aid reports, a port survey and the harbor log. It answers both in the same form and with the same confidence: 24 ships a day (480 tons at 20 each) and 20 ships a day (4 docks at 5 each). The student checks the first answer against the aid reports, finds it right, and uses both. A second student gets the same answers and checks each part at its source. Part 1 checks out. For Part 2, the port survey agrees with the AI, but the harbor log says dock 2 is closed for repairs, so the second student corrects the estimate to 15. On the page both parts look the same; Part 2 depends on what's open today, and the AI worked from capacity. Faculty see only the briefs. They point to each part and ask what justified relying on it. On Part 1 both students name the aid reports. On Part 2 the first says Part 1 checked out; the second names the harbor log.

*Sources.* The task, the four reports, both AI answers, the docks and both students' answers are constructed for this figure, and the task card says "Example task". *The Irreducible Officer*, Section II, defines uncalibrated reliance; Section V describes the jagged frontier, pattern recognition across task types, and the difference between trust and reliance. The study figures are from the source spine's Jagged Frontier entry (Dell'Acqua et al., 2023, HBS working paper 24-013): on a task chosen to fall outside the frontier, consultants without AI were right about 84.5% of the time and the two AI groups 60% and 70%, and graders still rated the AI users' recommendations higher in quality. The scenario's numbers are constructed.

## 3. Cast and grammar

**The colour rule.** Grey is what the AI supplied: its answers, their "READY" pills, the "AI'S ANSWERS" label, the copies of the reports it was given, and its words in the briefs. Red is what a student decided, plus the dots and their name labels: the working marks and the second student's corrections. Navy ink is the page: the task, the reports, labels, the pattern marks, the frontier, the evidence panel, faculty's outlines, and everything a student says aloud.

**Palette.** Paper `#f6f1e8`, paper-bright `#fffdfa`, ink `#0a2242`, machine grey `#5b564f` with a `#ded5c4` band behind AI-supplied text, red `#b81b2b`. Type: Source Serif 4 for answers, callouts, speech and captions; Source Sans 3 for name labels and the evidence panel; IBM Plex Mono for small labels (13 units here, so labels survive the runtime's viewport fit at 1280 × 720).

**Stage.** An SVG with a 960 × 540 viewBox. One view, no camera moves.
- *Top band* (y 16–102): the task card at left, the four reports at right.
- *Three columns* (y 128–374): the first student's brief (x 24–308), the AI's answers (x 338–622), the second student's brief (x 652–936). Part 1 sits in a row at y 140–208 and Part 2 in a row at y 300–368.
- *Bottom band* (y 384–528): the students' dots, then faculty's label and the speech panels.
- *Centre stage* (beat 8): the evidence panel over the dimmed scene.

| Element | Stands for | How it looks | Where |
| --- | --- | --- | --- |
| Task card | The assignment | Paper-bright card, hairline ink border. Mono 12 "EXAMPLE TASK"; Serif 15 ink "Part 1 · Ships needed a day" and "Part 2 · Ships the port takes a day", each fading in on its own | x 24–308, y 16–100; baselines 36, 62, 84 at x 40 |
| Reports | The four sources | Paper-bright cards 136 × 36, mono 12 ink labels: AID REPORT, AID REPORT, PORT SURVEY, HARBOR LOG | y 20–56; x 338, 486, 652, 800 |
| Opened aid report | A close read | Grows 14 units down and shows two ink note bars; closes when its reader leaves | Inside the card |
| Opened port report | Its relevant line | A callout under the card, Serif 14 ink on two lines. Port survey: "4 docks," / "5 ships each". Harbor log: "Dock 2: closed" / "for repairs.". Both stay open once opened | Survey x 652–792, log x 800–936; y 62–102 |
| Copies to the AI | Handing over the reports | Four small grey-banded rectangles sliding from each report into a stack above the AI column, where they stay to the end | Stack at (456, 84), each 4 units further down and right |
| Red dots | The two students | Solid red circles, radius 5. "Student" (beats 1–4) and "Second student" (beat 5), Sans 600 13 red | Homes (36, 456) and (664, 456) |
| "AI'S ANSWERS" | Names the centre column | Mono 12 grey | Baseline (338, 128) |
| AI answer cards | The AI's two answers | Paper-bright cards. Mono 12 grey "PART 1" / "PART 2"; a filled grey "READY" pill at top right; Serif 16 grey on a grey band. Part 1: "24 ships a day:" / "480 tons at 20 each". Part 2: "20 ships a day:" / "4 docks at 5 each" | x 338–622; y 140–208 and 300–368 |
| Briefs | What each student hands in | Paper-bright sheets labelled mono 12 ink "FIRST STUDENT'S BRIEF" / "SECOND STUDENT'S BRIEF", each part in the AI's grey text on its band, in the same rows as the AI's cards. The second brief's Part 2 has "20" and "4" struck in red, then red "15" and "3 open": "~~20~~ 15 ships a day:" / "~~4~~ 3 open docks at 5 each" | x 24–308 and 652–936, y 134–374 |
| Working marks | Each student's decision while working | Red mono 12 at the top right of each part, written by the dot: "✓ CHECKED" or "USED AS IS". Lift 6 units and fade at hand-in | Right edges x 296 / 924; baselines 158 and 318 |
| Pattern marks | Why Part 2 sits outside | Navy underline under the AI's "4 docks at 5 each" with mono navy "CAPACITY"; a navy underline under the harbor log's "Dock 2: closed" with mono navy "OPEN TODAY" as the callout's third line | AI card underline from x 352, tag beside it; "OPEN TODAY" right edge (790, 86) |
| Jagged frontier | The uneven edge of what the AI did well here | An irregular navy line, stroke 1.6, uneven teeth, across the AI column only, between its cards. Mono 12 ink "INSIDE THE FRONTIER" above, "OUTSIDE THE FRONTIER" below | Line x 330–630, y 238–270; labels centred x 480, baselines 228 and 290 |
| Dimmed scene | Attention moves to the study | Everything on the stage drops to 25% | Beat 8 |
| Evidence panel | The study | Paper-bright panel, soft shadow. Sans 600 18 "Right answers on a task outside the jagged frontier". Rows, Sans 16: "Without AI" with one bar to 84.5% ("84.5%"); "With AI" over mono "TWO GROUPS" with two bars to 60% and 70%. All bars 18 high, ink 85%, 4 units per point. Mono 12 source "DELL'ACQUA ET AL. (2023) · BCG CONSULTANTS · HBS WORKING PAPER 24-013" | x 120–840, y 140–400 |
| Quality bracket | The quality finding | Navy bracket beside the "With AI" bars, Serif italic 17 "Graders rated higher" / "in quality" | Bracket x 652, text from x 666 |
| Faculty label | Faculty see the product only | Mono 12 ink "FACULTY SEE ONLY THE BRIEFS", centred | (480, 412) |
| Faculty outlines | Which part faculty mean | Navy rounded outlines around the same part in both briefs, moving from Part 1 to Part 2 | x 30–302 and 658–930 |
| Speech panels | What each student says | Paper-bright box, rounded 8, hairline ink border, tail toward the dot; two rows, "1 ·" and "2 ·", Serif 15 ink, words at about 3 a second | x 52–308 and 680–936, y 386–490 |
| Caption band | The words for each beat | Mono counter and Serif 22 caption; in beat 10 the check and the move line at the same size | Under the stage |
| Beat list | Text equivalent | Twelve captions with "On screen" lines | Under the controls |

**The answers.**

| | Part 1 | Part 2 |
| --- | --- | --- |
| First student | "The aid reports." | "Part 1 checked out, so I trusted the rest." |
| Second student | "The aid reports." | "The harbor log. One dock is closed." |

**Narrow screens.** Picture text is at least 13 units, so it stays at 11 px or more down to a letterboxed scale of 0.846 (the runtime caps the stage height to fit the viewport). Below that, the SVG collapses and a stacked text stage, driven by the same clock, takes its place. Its layout is fixed from the first frame: the task, the reports and both port callouts, the AI's answers with their "Ready" tags and the frontier between them, both briefs side by side with their marks, and both students' answers, each fading in when its moment comes. The study is an overlay over the dimmed stage. The caption band has a fixed height, so the controls never move. The beat list shows its "On screen" lines.

## 4. Beats

Times are absolute seconds. In every beat the caption changes first (0.3 s fade) and nothing in the picture moves for the first second. A change the caption is about starts only after the caption can be read once, except a lead-in that the caption's first or main clause describes. Each beat holds its caption plus new picture words at 3 words a second or less.

### Beat 1 · 0.0–7.7 s · The task

- **What moves:** 1.0–1.6 the task card fades in and rises 6 units, showing "EXAMPLE TASK"; 1.8–2.2 "Part 1 · Ships needed a day" fades in; 3.0–3.4 "Part 2 · Ships the port takes a day"; 3.6–4.0 the red dot grows in at (36, 456) with its "Student" label; hold.
- **Caption:** "A student gets a two-part task."
- **Notice:** both parts ask for ships a day.
- **Why:** the setup, with both parts looking alike from the start.

### Beat 2 · 7.7–14.0 s · The reports go to the AI

- **What moves:** 8.7–10.1 four reports fade in across the top right, one at a time; 10.2–10.6 the dot pulses; 10.6–11.4 a grey copy slides from each report into a small stack above the AI's column, where it stays; 11.5–11.9 "GIVEN TO THE AI" appears beside the stack; hold.
- **Caption:** "The student gives an AI four reports."
- **Notice:** the AI gets every report, including the harbor log, and the stack stays on screen to the end.
- **Why:** the AI's later miss isn't missing input.

### Beat 3 · 14.0–24.0 s · Equal confidence

- **What moves:** 15.0–15.4 "AI'S ANSWERS"; 15.4–16.0 two cards rise together; 16.1–16.9 both first lines write in at once ("24 ships a day:", "20 ships a day:"); 17.1–17.9 both second lines ("480 tons at 20 each", "4 docks at 5 each"); 19.1–19.5 a grey "READY" pill on both at the same moment; hold.
- **Caption:** "It answers both with equal confidence."
- **Notice:** same form, same flat statement, same tag.
- **Why:** "the output is confident", with nothing to tell the answers apart.

### Beat 4 · 24.0–32.0 s · The first student checks Part 1

- **What moves:** 25.0–25.6 the "Student" label fades as the dot moves to the first aid report; 25.6–26.2 it opens; 26.2–26.6 the dot moves to the second; 26.6–27.2 it opens; 28.0–28.7 a sheet labelled "FIRST STUDENT'S BRIEF" fades in as Part 1 slides into it; 28.8–29.2 the dot writes "✓ CHECKED" in red; 29.2–29.5 the dot steps 40 units clear; hold 2.5 s.
- **Caption:** "The student checks Part 1 against the two aid reports. It's right."
- **Notice:** the check is real, and it is a check of Part 1 only. The closing question depends on it.
- **Why:** split from round 3's beat 4 so this check has its own beat and hold. The reading is the lead-in the first sentence describes; the brief arrives 4.0 s in.

### Beat 5 · 32.0–40.1 s · And uses Part 2 as is

- **What moves:** 33.0–33.6 the "READY" pill on the AI's Part 2 swells and settles; 36.0–36.6 Part 2 slides into the first brief, the dot following; 36.6–37.0 the dot writes "USED AS IS"; 37.0–37.3 the dot steps 40 units clear and waits; 38.0–38.5 the aid reports close and the dot returns to its place; hold.
- **Caption:** "Part 2 looks just as sure, so they use it as is."
- **Notice:** the reason is the look of the answer and the Part 1 check. The port reports stay closed.
- **Why:** trust earned on one part becomes reliance on the other. Part 2 goes in 4.0 s in.

### Beat 6 · 40.1–48.8 s · Another student checks each part

- **What moves:** 41.1–41.5 a second red dot, "Second student"; 41.5–41.9 an empty sheet, "SECOND STUDENT'S BRIEF"; 42.0–42.4 the dot pulses and both "READY" pills blink; 42.5–43.1 the dot moves to the first aid report; 43.1–43.7 it opens; 43.7–44.1 to the second; 44.1–44.7 it opens; 44.9–45.6 Part 1 slides into the second brief; 45.7–46.1 "✓ CHECKED"; 46.1–46.4 the dot steps clear; 46.2–46.7 the aid reports close; hold.
- **Caption:** "Another student, with the same AI answers, checks each part at its source."
- **Notice:** the same answers, the same reports, the same reading pace, the same mark.
- **Why:** the habit is stated before any reveal.

### Beat 7 · 48.8–57.5 s · That student checks Part 2 too

- **What moves:** 49.8–50.3 the dot moves to the port survey; 50.3–50.9 its callout opens, "4 docks, 5 ships each", and stays open; 50.9–51.3 the dot moves to the harbor log; 51.3–52.1 its callout opens, "Dock 2: closed for repairs.", and stays open; 52.2–52.8 Part 2 slides into the second brief; 52.9–53.2 the dot strikes "20"; 53.2–53.5 writes "15"; 53.65–53.8 strikes "4"; 53.8–54.1 writes "3 open"; 54.2–54.6 "✓ CHECKED"; 54.6–54.9 the dot steps clear; 55.5–56.0 it returns to its place; hold.
- **Caption:** "That student checks Part 2 against the port reports, and corrects it."
- **Notice:** the survey agrees with the AI; the harbor log doesn't. The AI's wording stays. The first brief still says 20.
- **Why:** the independent check, made before the error travels. Both sources stay on screen to the end.

### Beat 8 · 57.5–65.5 s · The reason

- **What moves:** 58.5–59.0 a navy underline runs under the AI's "4 docks at 5 each" and "CAPACITY" appears beside it; 61.5–62.0 "Dock 2: closed" in the harbor log is underlined and "OPEN TODAY" appears under it; hold.
- **Caption:** "The AI worked from capacity. Part 2 depends on what's open today."
- **Notice:** the AI's figure is the survey's capacity; the real number depends on the one report that says what's open today.
- **Why:** the reason Part 2 sits outside, as a pattern that travels to other tasks, before the frontier is named.

### Beat 9 · 65.5–76.2 s · The jagged frontier

- **What moves:** 66.5–67.9 an irregular navy line draws across the AI column, between its two cards; 67.9–68.3 "INSIDE THE FRONTIER" above it and "OUTSIDE THE FRONTIER" below; 70.8–71.4 the two cards, alike in form, pulse together; hold 4.8 s.
- **Caption:** "A jagged frontier marks where an AI stops being reliable. It doesn't follow how tasks look."
- **Notice:** the line falls between two answers that look alike. The term is defined here, before the study uses it.
- **Why:** cold read 1 found "frontier" used before it was explained. This beat explains it and holds the line on screen for more than 7 s before anything covers it.

### Beat 10 · 76.2–90.5 s · The study

- **What moves:** 77.2–77.7 the scene dims to 25%; 77.7–78.3 the evidence panel rises centre stage with its title, row labels and source; 80.9–81.5 the "Without AI" bar grows to about 84.5%; 81.6–82.2 the two "With AI" bars grow to 60% and 70%; 82.5–83.0 a bracket draws beside them; 83.0–83.4 "Graders still rated these higher in quality, regardless of correctness" appears; hold.
- **Caption:** "In a field experiment, consultants with AI were right less often outside the frontier."
- **Notice:** both AI groups fall short of the group without AI, and their work was still rated higher. This is a study of consultants, not the port task.
- **Why:** evidence that look-alike tasks can differ, and that polish doesn't show it. The bars start 4.7 s in.

### Beat 11 · 90.5–106.5 s · Faculty point to each part

- **What moves:** 91.5–92.0 the panel fades and the scene returns; 92.1–92.7 the working marks lift off both briefs; 92.7–93.2 "FACULTY SEE ONLY THE BRIEFS" fades in, and the reports, the AI's column and the frontier fade back to 55%; 95.2–95.7 navy outlines around Part 1 in both briefs; 95.8–96.2 both speech panels open; 96.2–97.2 "1 · The aid reports." (first student); 97.4–98.4 "1 · The aid reports." (second); 98.7–99.2 the outlines move to Part 2; 99.4–102.4 "2 · Part 1 checked out, so I trusted the rest."; 102.7–105.0 "2 · The harbor log. One dock is closed."; hold.
- **Caption:** "Faculty point to each part in turn and ask what justified relying on it."
- **Notice:** faculty see only the briefs. On Part 1 the answers match; on Part 2 one student's evidence is about Part 1, the other's about Part 2.
- **Why:** the essay's "what evidence would justify that delegation", part by part. The outlines start 4.7 s in.

### Beat 12 · 106.5–113.2 s · The faculty check

- **What moves:** 106.5–106.7 caption 11 fades out; 106.7–107.3 "FACULTY CHECK" and the question rise; 109.8–110.3 directly under it, at the same size, "Point to each part. Was the evidence about that part?"; hold; the figure rests here.
- **Caption:** "Faculty check: What evidence justified relying on the system here?" Second line, same size: "Point to each part. Was the evidence about that part?"
- **Why:** the figure ends on the check and the move.

## 5. Final frame

The still at 113.2 s; also the reduced-motion view and the print view. The poster (shown while the figure waits to play) is beat 1 settled.

**Stage:**
- **Top left:** the task card: "EXAMPLE TASK · Part 1 · Ships needed a day · Part 2 · Ships the port takes a day".
- **Top right:** the four reports, both port callouts open: the survey's "4 docks, 5 ships each" and the harbor log's "Dock 2: closed for repairs.", with "Dock 2: closed" underlined and marked "OPEN TODAY". The copies' stack, "GIVEN TO THE AI", sits above the AI's column. The reports, the AI's column and the frontier are faded back to 55%.
- **Columns,** Part 1 above, Part 2 below:
  - *Left,* "FIRST STUDENT'S BRIEF": both parts in the AI's grey text; Part 2 reads "20 ships a day: 4 docks at 5 each". No marks.
  - *Centre,* "AI'S ANSWERS": both cards with "READY" pills; "4 docks at 5 each" underlined, "CAPACITY". Between the cards, the irregular frontier with "INSIDE THE FRONTIER" and "OUTSIDE THE FRONTIER".
  - *Right,* "SECOND STUDENT'S BRIEF": Part 1 in grey; Part 2 with "20" and "4" struck in red and "15" and "3 open" written in. No marks.
  - Navy outlines around Part 2 in both briefs.
- **Bottom band:** the first student's dot and panel: "1 · The aid reports." / "2 · Part 1 checked out, so I trusted the rest." In the centre, "FACULTY SEE ONLY THE BRIEFS". The second student's dot and panel: "1 · The aid reports." / "2 · The harbor log. One dock is closed."

**Caption band:** FACULTY CHECK / *What evidence justified relying on the system here?* / *Point to each part. Was the evidence about that part?* (same size)

**What the still says alone:** two students used the same two AI answers, both marked ready. Asked about each part, both named the aid reports for Part 1. For Part 2, which depends on what's open today and sits outside the frontier, one pointed back to Part 1 and the other to the harbor log, and corrected the number.

## 6. Standalone page copy

**Title:** Uncalibrated reliance

**Kicker:** Failure mode 4 of 7

**Setup:** A student asks an AI for help with a two-part task. They check its first answer, find it right, and use both. *The Irreducible Officer* calls what can happen next uncalibrated reliance: the student accepts confident output without knowing whether the task fits the tool. The figure runs about a minute and a half; pause it or step through the beats below. The task, the reports and both students are a constructed example. The research figures come from Dell'Acqua et al. (2023).

**Figure summary** (visually hidden): An animated figure. A red dot stands for a student with an example task in two parts: ships needed a day, and ships the port takes a day. The student gives an AI four reports: two aid reports, a port survey and a harbor log. The AI answers both in the same form, each marked ready: "24 ships a day: 480 tons at 20 each" and "20 ships a day: 4 docks at 5 each". The student checks Part 1 against both aid reports, finds it right, and puts both answers into their brief, marking Part 1 checked and Part 2 used as is. A second student gets the same answers and checks each part at its source. Part 1 checks out. For Part 2, the port survey says 4 docks at 5 ships each, but the harbor log says dock 2 is closed for repairs, so the second student corrects the estimate to 15 ships from 3 open docks. On the page both parts look the same, but the AI worked from capacity and Part 2 depends on what's open today. An uneven line, the frontier, is drawn between the AI's answers, with Part 1 inside and Part 2 outside. A panel shows a field experiment with BCG consultants: on a task outside the jagged frontier, the group without AI was right 84.5% of the time and the two groups with AI 60% and 70%, and graders rated the AI users' work higher in quality. The students' working marks come off the briefs, and faculty see only the briefs. Faculty point to Part 1 in both: each student says, "The aid reports." Then Part 2: the first student says, "Part 1 checked out, so I trusted the rest." The second says, "The harbor log. One dock is closed." The figure ends on the faculty check.

**Beat list (text equivalent):**

1. **A student gets a two-part task.** *On screen:* a task card appears at the top left: "Example task. Part 1: Ships needed a day. Part 2: Ships the port takes a day." A red dot labelled Student appears below.
2. **The student gives an AI four reports.** *On screen:* four reports appear across the top: Aid report, Aid report, Port survey and Harbor log. The dot pulses, and a grey copy of each report slides into a small stack labelled "Given to the AI", where it stays.
3. **It answers both with equal confidence.** *On screen:* two answer cards labelled "AI's answers" write in together, in grey on a beige band. Part 1: "24 ships a day: 480 tons at 20 each." Part 2: "20 ships a day: 4 docks at 5 each." Each gets the same grey "Ready" tag at the same moment.
4. **The student checks Part 1 against the two aid reports. It's right.** *On screen:* the dot opens both aid reports. A sheet labelled "First student's brief" appears, Part 1 slides into it, and the dot marks it "Checked" in red.
5. **Part 2 looks just as sure, so they use it as is.** *On screen:* the "Ready" tag on the AI's Part 2 pulses. Part 2 slides into the first brief, and the dot marks it "Used as is". The aid reports close.
6. **Another student, with the same AI answers, checks each part at its source.** *On screen:* a second red dot labelled Second student and an empty sheet labelled "Second student's brief" appear. The dot pulses and both "Ready" tags blink. The dot opens both aid reports, and Part 1 slides into its brief, marked "Checked".
7. **That student checks Part 2 against the port reports, and corrects it.** *On screen:* the dot opens the port survey, "4 docks, 5 ships each", then the harbor log, "Dock 2: closed for repairs." Both stay open. Part 2 slides into the second brief. The dot strikes out "20" and "4" in red and writes "15" and "3 open", so it reads "15 ships a day: 3 open docks at 5 each", and marks it "Checked". The first brief still says 20.
8. **The AI worked from capacity. Part 2 depends on what's open today.** *On screen:* the AI's "4 docks at 5 each" is underlined and marked "Capacity". The harbor log's "Dock 2: closed" is underlined and marked "Open today".
9. **A jagged frontier marks where an AI stops being reliable. It doesn't follow how tasks look.** *On screen:* an uneven line is drawn between the AI's two answer cards, labelled "Inside the frontier" above and "Outside the frontier" below. Then the two cards, alike in form, pulse together.
10. **In a field experiment, consultants with AI were right less often outside the frontier.** *On screen:* the picture dims and a panel rises: right answers on a task outside the jagged frontier. Without AI: about 84.5%. With AI, two groups: 60% and 70%. A bracket beside the AI bars: "Graders still rated these higher in quality, regardless of correctness." Source: Dell'Acqua et al. (2023), BCG consultants, HBS working paper 24-013.
11. **Faculty point to each part in turn and ask what justified relying on it.** *On screen:* the panel goes. The red marks lift off both briefs, the reports and the AI's column fade back, and "Faculty see only the briefs" appears. Part 1 is outlined in both briefs, and each student says, "The aid reports." Then Part 2: the first student says, "Part 1 checked out, so I trusted the rest." The second says, "The harbor log. One dock is closed."
12. **Faculty check: What evidence justified relying on the system here? Point to each part. Was the evidence about that part?** *On screen:* both lines appear under the picture at the same size. The briefs, both answers, the AI's answers, the frontier and the harbor log stay in view.

**Faculty check:** What evidence justified relying on the system here?
**Point to each part. Was the evidence about that part?** (same size)

Both students give the same reason for Part 1. For Part 2, the first student's evidence is about Part 1 and the second student's is about Part 2. The edge between the two parts doesn't show on the page; the second student found it by checking each part against the reports it rests on. Section II of the essay asks students to identify which part of the task they are delegating, what evidence would justify that delegation, and what independent checks are required.

**From the essay:** the Section II paragraph above, and from Section V the trust and reliance paragraph, with its citation (Raees & Papangelis, 2026).

**Evidence:** Dell'Acqua et al., [Navigating the Jagged Technological Frontier](https://www.hbs.edu/faculty/Pages/item.aspx?num=64700), HBS working paper 24-013 (2023). On a task chosen to fall outside the frontier, consultants without AI were right about 84.5% of the time and the two AI groups 60% and 70%: in the working paper's words, "19 percentage points less likely to produce correct solutions." Graders still rated the AI users' recommendations higher in quality "regardless of the correctness of their answer."

**Links:** Make the call yourself (`../appropriate-reliance/`); Book chapter: Calibrate the tool (`../../book-v0/four-moves-book.html?spread=3`); Practice (`https://judgmentlab.net/#companion`); Essay Section II (`#ii-what-the-problem-looks-like`) and Section V (`#v-appropriate-reliance-as-a-teachable-competency`).

## 7. Pacing table

Reading is caption words plus new picture words, ÷ 3. Every beat is at least that long, at least twice its caption's reading time, and holds at least 1.5 s after its last movement.

| Beat | Time (s) | Caption words | Picture words | Reading (s) | Lead (s) | Motion (s) | Hold (s) | Total (s) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · The task | 0.0–7.7 | 6 | 17 | 7.7 | 1.0 | 3.0 | 3.7 | 7.7 |
| 2 · Reports to the AI | 7.7–14.0 | 7 | 12 | 6.3 | 1.0 | 3.2 | 2.1 | 6.3 |
| 3 · Equal confidence | 14.0–24.0 | 6 | 24 | 10.0 | 1.0 | 4.5 | 4.5 | 10.0 |
| 4 · Checks Part 1 | 24.0–32.0 | 12 | 5 | 5.7 | 1.0 | 4.5 | 2.5 | 8.0 |
| 5 · Uses Part 2 as is | 32.0–40.1 | 12 | 3 | 5.0 | 1.0 | 5.5 | 1.6 | 8.1 |
| 6 · Checks each part | 40.1–48.8 | 13 | 7 | 6.7 | 1.0 | 5.6 | 2.1 | 8.7 |
| 7 · Checks Part 2 too | 48.8–57.5 | 12 | 14 | 8.7 | 1.0 | 6.2 | 1.5 | 8.7 |
| 8 · The reason | 57.5–65.5 | 12 | 3 | 5.0 | 1.0 | 3.5 | 3.5 | 8.0 |
| 9 · The jagged frontier | 65.5–76.2 | 16 | 6 | 7.3 | 1.0 | 4.9 | 4.8 | 10.7 |
| 10 · The study | 76.2–90.5 | 14 | 29 | 14.3 | 1.0 | 6.2 | 7.1 | 14.3 |
| 11 · Faculty point to each part | 90.5–106.5 | 14 | 31 | 15.0 | 1.0 | 13.5 | 1.5 | 16.0 |
| 12 · Faculty check | 106.5–113.2 | 8 + 10 | 0 | 6.0 | 0.0 | 3.8 | 2.9 | 6.7, then rests |
| **Total** | | **142** | **151** | | | **64.4** | | **113.2** |

Checks:
- Changes a caption names wait until it can be read once: the "READY" pills (beat 3), Part 1 into the first brief (beat 4, 4.0 s in), Part 2 into it (beat 5, 4.0 s), the correction (beat 7, 4.1 s), "OPEN TODAY" (beat 8, 4.0 s), the paired pulse (beat 9, 5.3 s), the bars (beat 10, 4.7 s), the outlines (beat 11, 4.7 s), the move line (beat 12, 3.3 s after the check).
- The frontier is on screen, uncovered, for 9.3 s (66.5–75.8) before the scene dims for the panel.
- Both students read the aid reports with the same motion and timing (0.6, 0.6, 0.4, 0.6 s).
- The second student's work is done before the reason and the frontier appear.
- Every hold is at least 1.5 s; one movement at a time.
- No camera moves; the scene dims once for the panel and our side recedes once at hand-in. Reduced motion shows the final frame.
- **Phone:** the stacked stage and the caption band have fixed heights, so the caption and controls stay put through the whole run (measured at 390, 768, 900 and 1280 px wide). The player is 833 px tall at 390 × 844, final frame included.
