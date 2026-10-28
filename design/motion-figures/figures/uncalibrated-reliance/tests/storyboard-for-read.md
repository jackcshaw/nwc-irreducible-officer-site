# Uncalibrated reliance: storyboard

Motion figure 4 of 8 · slug `uncalibrated-reliance` · storyboard round 5, revised after figure cold read 2 (passed with final fixes) · October 28, 2026

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
| Task card | The assignment | Paper-bright card, hairline ink border. Full-ink mono 13 "EXAMPLE TASK"; Serif 16 ink "Part 1 · Ships needed a day" and "Part 2 · Ships the port takes a day" on a 20-unit step, each fading in on its own | x 24–308, y 16–100; baselines 37, 61, 81 at x 40 |
| Reports | The four sources | Paper-bright cards 136 × 36, mono 12 ink labels: AID REPORT, AID REPORT, PORT SURVEY, HARBOR LOG | y 20–56; x 338, 486, 652, 800 |
| Opened aid report | A close read | Grows 14 units down and shows two ink note bars; closes when its reader leaves | Inside the card |
| Opened port report | What it says | A callout under the card: a mono 13 heading over Serif 13 lines, the exception set apart in muted italic. Port survey: "CAPACITY / 4 docks, 5 each / (survey, last year)". Harbor log: "OPEN TODAY / Docks 1, 3, 4 / ✕ Dock 2: closed". Both stay open, at full strength, to the end | Survey x 652–788, log x 800–936; y 60–112 |
| Copies to the AI | Handing over the reports | Four small grey-banded rectangles sliding from each report into a stack above the AI column, where they stay to the end | Stack at (456, 84), each 4 units further down and right |
| Red dots and names | The two students | Solid red circles, radius 5, with Sans 600 13 red names: "Student" while there is one; "First student" beside the first dot at home from beat 5; "Second student" when the second appears. In the final frame each is named once in red under their answer | Homes (36, 456) and (664, 456); final names at (52, 512) and (680, 512) |
| "AI'S ANSWERS" | Names the centre column | Mono 12 grey | Baseline (338, 128) |
| AI answer cards | The AI's two answers | Paper-bright cards. Mono 12 grey "PART 1" / "PART 2"; a filled grey "READY" pill at top right; Serif 16 grey on a grey band. Part 1: "24 ships a day:" / "480 tons at 20 each". Part 2: "20 ships a day:" / "4 docks at 5 each" | x 338–622; y 140–208 and 300–368 |
| Briefs | What each student hands in | Paper-bright sheets labelled mono 12 ink "FIRST STUDENT'S BRIEF" / "SECOND STUDENT'S BRIEF", each part in the AI's grey text on its band, in the same rows as the AI's cards. The second brief's Part 2 has "20" and "4" struck in red, then red "15" and "3 open": "~~20~~ 15 ships a day:" / "~~4~~ 3 open docks at 5 each" | x 24–308 and 652–936, y 134–374 |
| Working marks | Each student's decision while working | Red mono 12 at the top right of each part, written by the dot: "✓ CHECKED" or "USED AS IS". Lift 6 units and fade at hand-in | Right edges x 296 / 924; baselines 158 and 318 |
| Pattern marks | Why Part 2 sits outside | A navy underline under the AI's "4 docks at 5 each" with mono navy "CAPACITY" beside it; a navy underline under the harbor log's "Docks 1, 3, 4" | AI card underline from x 352, y 364; log underline from x 808, y 92 |
| Jagged frontier | The uneven edge of what the AI did well here | An irregular navy line, stroke 1.6, uneven teeth, across the AI column only, between its cards. Mono 12 ink "INSIDE THE FRONTIER" above, "OUTSIDE THE FRONTIER" below | Line x 330–630, y 238–270; labels centred x 480, baselines 228 and 290 |
| Dimmed scene | Attention moves to the study | Everything on the stage drops to 25% | Beat 8 |
| Evidence panel | The study | Paper-bright panel, soft shadow. Sans 600 18 "Right answers on a task outside the jagged frontier". Rows, Sans 16: "Without AI" with one bar to 84.5% ("84.5%"); "With AI" over mono "TWO GROUPS" with two bars to 60% and 70%. All bars 18 high, ink 85%, 4 units per point. Mono 12 source "DELL'ACQUA ET AL. (2023) · BCG CONSULTANTS · HBS WORKING PAPER 24-013" | x 120–840, y 140–400 |
| Quality bracket | The quality finding | Navy bracket beside the "With AI" bars, Serif italic 17 "Graders rated higher" / "in quality" | Bracket x 652, text from x 666 |
| Faculty label | Faculty see the product only | Mono 13 ink "FACULTY SEE ONLY THE BRIEFS", centred | (480, 412) |
| Key | What the colours mean in the final frame | An 18 × 12 band swatch with grey mono "WRITTEN BY AI"; a red r 5 dot with red mono "A STUDENT'S OWN WORK". Fades in at hand-in | x 372–576, y 437–470 |
| Faculty outlines | Which part faculty mean | Navy rounded outlines around the same part in both briefs, moving from Part 1 to Part 2 | x 30–302 and 658–930 |
| Speech panels | What each student says | Paper-bright box, rounded 8, hairline ink border, tail toward the dot; two rows, "1 ·" and "2 ·", Serif 15 ink, words at about 3 a second | x 52–308 and 680–936, y 386–490 |
| Caption band | The words for each beat | Mono counter and Serif 22 caption; in beat 10 the check and the move line at the same size | Under the stage |
| Beat list | Text equivalent | Ten captions with "On screen" lines | Under the controls |

**The answers.**

| | Part 1 | Part 2 |
| --- | --- | --- |
| First student | "The aid reports." | "Part 1 checked out, so I trusted the rest." |
| Second student | "The aid reports." | "The harbor log. One dock is closed." |

**Narrow screens.** Picture text is at least 13 units, so it stays at 11 px or more down to a letterboxed scale of 0.846 (the runtime caps the stage height to fit the viewport). Below that, the SVG collapses and a stacked text stage, driven by the same clock, takes its place. Its layout is fixed from the first frame: the task, the reports and both port callouts, the AI's answers with their "Ready" tags and the frontier between them, both briefs side by side with their marks, and both students' answers, each fading in when its moment comes. The study is an overlay over the dimmed stage. The caption band has a fixed height, so the controls never move. The beat list shows its "On screen" lines.

## 4. Beats

Times are absolute seconds. In every beat the caption changes first (0.3 s fade) and nothing in the picture moves for the first second. Each caption is readable at 3 words a second with at least 1.5 s of hold after the last movement. A change the caption is about waits until the caption can be read once, except a lead-in its first or main clause describes, and the study's bars, which start as the panel lands.

### Beat 1 · 0.0–8.6 s · The task and the reports

- **What moves:** 1.0–1.6 the task card fades in; 1.7–2.1 "Part 1 · Ships needed a day"; 2.2–2.6 "Part 2 · Ships the port takes a day"; 2.7–3.0 the red dot, "Student"; 4.0–5.1 four reports fade in one at a time; 5.2–5.5 the dot pulses; 5.5–6.3 a grey copy of each report slides into a stack above the AI's column; 6.3–6.7 "GIVEN TO THE AI"; hold.
- **Caption:** "A student gets a two-part task and gives an AI four reports."
- **Notice:** both parts ask for ships a day. The AI gets every report, including the harbor log. On a phone, the student appears as a red "Student" marker beside the task.
- **Why:** merged from round 4's first two beats, which dragged.

### Beat 2 · 8.6–15.6 s · Equal confidence

- **What moves:** 9.6–10.0 "AI'S ANSWERS"; 10.0–10.6 two cards rise together; 10.7–11.5 both first lines write in at once; 11.7–12.5 both second lines; 12.7–13.1 a grey "READY" pill on both at the same moment; hold 2.5 s.
- **Caption:** "It answers both with equal confidence."
- **Notice:** same form, same flat statement, same tag.

### Beat 3 · 15.6–23.1 s · The first student checks Part 1

- **What moves:** 16.6–17.2 the dot moves to the first aid report; 17.2–17.8 it opens; 17.8–18.2 to the second; 18.2–18.8 it opens; 19.6–20.3 "FIRST STUDENT'S BRIEF" fades in as Part 1 slides into it; 20.4–20.8 "✓ CHECKED"; 20.8–21.1 the dot steps clear; hold.
- **Caption:** "The student checks Part 1 against the two aid reports. It's right."
- **Notice:** a real check, of Part 1 only. The closing question depends on it.

### Beat 4 · 23.1–30.3 s · And uses Part 2

- **What moves:** 24.1–24.7 the "READY" pill on the AI's Part 2 swells and settles (on a phone, the Part 2 row's tag swells and its border darkens); 24.9–25.5 the dot moves down to the Part 2 row; 26.4–27.0 Part 2 slides into the first brief; 27.0–27.4 "USED AS IS"; 27.4–27.7 the dot steps clear; 28.3–28.8 the aid reports close and the dot goes home; hold.
- **Caption:** "Part 2 looks just as sure, so they use it."
- **Notice:** the reason is the look of the answer and the Part 1 check. The port reports stay closed.
- **Why:** the lead-in is shorter than round 4's, and something moves every second.

### Beat 5 · 30.3–37.6 s · Another student checks each part

- **What moves:** 31.3–31.7 a second red dot, "Second student"; 31.7–32.1 an empty sheet, "SECOND STUDENT'S BRIEF"; 32.2–32.6 the dot pulses and both "READY" pills blink; 32.7–33.3 the dot moves between the two aid reports; 33.3–33.9 both open at once; 34.1–34.8 Part 1 slides into the second brief; 34.9–35.3 "✓ CHECKED"; 35.6–36.1 the aid reports close; hold.
- **Caption:** "Another student, with the same answers, checks each at its source."
- **Notice:** the same answers and the same Part 1 check, in one move. The habit is stated before any reveal.
- **Why:** shortened from round 4, where this repeated beat 3 move for move.

### Beat 6 · 37.6–48.6 s · That student checks Part 2 too (the crux)

- **What moves:**
  1. 38.6–39.1 the dot moves to the port survey.
  2. 39.1–39.7 its callout opens: "CAPACITY / 4 docks, 5 each / (survey, last year)".
  3. 39.7–40.1 in the empty middle of the second brief, large: "PORT REPORTS" and "Survey: 4 docks, 5 ships each."
  4. 40.3–40.7 the dot moves to the harbor log.
  5. 40.7–41.3 its callout opens: "OPEN TODAY / Docks 1, 3, 4", and set apart in muted italic, "✕ Dock 2: closed".
  6. 41.3–41.7 the note adds, large: "Log: dock 2 closed for repairs."
  7. 41.7–43.2 nothing moves while the note is read.
  8. 43.2–43.8 Part 2 slides into the second brief.
  9. 43.9–44.2 the dot strikes "20"; 44.2–44.5 writes "15".
  10. 44.7–45.0 strikes "4"; 45.0–45.3 writes "3 open".
  11. 45.5–45.9 "✓ CHECKED"; 45.9–46.2 the dot steps clear; 46.6–47.1 it goes home; hold.
- **Caption:** "That student checks Part 2 against the port reports, and corrects it."
- **Notice:** the reason for the red "15" is on screen, large, for 2 s before the 15 appears. The harbor log can't be misread: its heading lists the docks open today, and the closed dock sits apart. The first brief still says 20.
- **Why:** cold read 2 found this, the crux, the fastest beat. It is 2.3 s longer, one movement at a time, with the reading note set large.

### Beat 7 · 48.6–58.4 s · The reason and the jagged frontier

- **What moves:** 49.6–50.1 "Docks 1, 3, 4" in the harbor log is underlined; 50.3–50.8 the AI's "4 docks at 5 each" is underlined and marked "CAPACITY"; 54.3–55.7 an irregular navy line draws between the AI's two cards; 55.7–56.1 "INSIDE THE FRONTIER" above it, "OUTSIDE THE FRONTIER" below; 56.3–56.9 the two cards, alike in form, pulse together; hold.
- **Caption:** "Part 2 depends on what's open today. A jagged frontier marks where an AI stops being reliable."
- **Notice:** the AI's figure is last year's capacity; the answer depends on what's open today. The term is defined here, before the study uses it, and the line stays uncovered for 3.7 s after it is drawn.
- **Why:** merged from round 4's beats 8 and 9, which held still for most of 18 s.

### Beat 8 · 58.4–67.9 s · The study

- **What moves:** 59.4–59.8 the scene dims; 59.8–60.4 the panel rises; 60.5–61.1 the "Without AI" bar grows to about 84.5%; 61.2–61.8 the two "With AI" bars to 60% and 70%; 62.0–62.5 a bracket; 62.5–62.9 "Rated higher in quality than without AI, regardless of correctness"; hold 5.0 s.
- **Caption:** "In a field experiment, consultants with AI got a task outside the frontier right less often."
- **Notice:** "a task", as in the source. Both AI groups fall short and were still rated higher.
- **Why:** the bars start as the panel lands; round 4 left the panel empty for 3 s.

### Beat 9 · 67.9–83.9 s · Faculty point to each part

- **What moves:** 68.9–69.4 the panel fades and the scene returns; 69.5–70.1 the working marks and the second student's note lift off both briefs; 70.1–70.6 "FACULTY SEE ONLY THE BRIEFS", and the reports, the AI's column and the frontier fade back to 55% (the two port callouts stay at full strength); 72.6–73.1 navy outlines around Part 1 in both briefs (on a phone, outlines around the Part 1 boxes); 73.2–73.6 both speech panels open; 73.6–74.6 "1 · The aid reports."; 74.8–75.8 "1 · The aid reports."; 76.1–76.6 the outlines move to Part 2; 76.8–79.8 "2 · Part 1 checked out, so I trusted the rest."; 80.1–82.4 "2 · The harbor log. One dock is closed."; hold.
- **Caption:** "Faculty point to each part in turn and ask what justified relying on it."

### Beat 10 · 83.9–90.6 s · The faculty check

- **What moves:** 83.9–84.1 caption 9 fades; 84.1–84.7 the check rises; 87.2–87.7 "Point to each part. Was the evidence about that part?" at the same size; hold; the figure rests here.
- **Caption:** "Faculty check: What evidence justified relying on the system here?" Second line, same size: "Point to each part. Was the evidence about that part?"

## 5. Final frame

The still at 90.6 s; also the reduced-motion view and the print view. The poster (shown while the figure waits to play) is beat 1 settled.

**Stage:**
- **Top left:** the task card: "EXAMPLE TASK · Part 1 · Ships needed a day · Part 2 · Ships the port takes a day".
- **Top right:** the four reports, both port callouts open at full strength: the survey's "CAPACITY / 4 docks, 5 each / (survey, last year)" and the harbor log's "OPEN TODAY / Docks 1, 3, 4" (underlined) with "✕ Dock 2: closed" set apart. The copies' stack, "GIVEN TO THE AI", sits above the AI's column. The report tabs, the AI's column and the frontier are faded back to 55%.
- **Columns,** Part 1 above, Part 2 below:
  - *Left,* "FIRST STUDENT'S BRIEF": both parts in the AI's grey text; Part 2 reads "20 ships a day: 4 docks at 5 each". No marks.
  - *Centre,* "AI'S ANSWERS": both cards with "READY" pills; "4 docks at 5 each" underlined, "CAPACITY". Between the cards, the irregular frontier with "INSIDE THE FRONTIER" and "OUTSIDE THE FRONTIER".
  - *Right,* "SECOND STUDENT'S BRIEF": Part 1 in grey; Part 2 with "20" and "4" struck in red and "15" and "3 open" written in. No marks.
  - Navy outlines around Part 2 in both briefs.
- **Bottom band:** the first student's dot and panel: "1 · The aid reports." / "2 · Part 1 checked out, so I trusted the rest.", named "First student" in red underneath. In the centre, "FACULTY SEE ONLY THE BRIEFS" over the key ("WRITTEN BY AI", "A STUDENT'S OWN WORK"). The second student's dot and panel: "1 · The aid reports." / "2 · The harbor log. One dock is closed.", named "Second student" in red.

**Caption band:** FACULTY CHECK / *What evidence justified relying on the system here?* / *Point to each part. Was the evidence about that part?* (same size)

**What the still says alone:** two students used the same two AI answers, both marked ready. Asked about each part, both named the aid reports for Part 1. For Part 2, which depends on what's open today and sits outside the frontier, one pointed back to Part 1 and the other to the harbor log, and corrected the number.

## 6. Standalone page copy

**Title:** Uncalibrated reliance

**Kicker:** Failure mode 4 of 7

**Setup:** A student asks an AI for help with a two-part task. They check its first answer, find it right, and use both. *The Irreducible Officer* calls what can happen next uncalibrated reliance: the student accepts confident output without knowing whether the task fits the tool. The research figures come from Dell'Acqua et al. (2023), and the task, the reports and both students are a constructed example.

**Figure summary** (visually hidden): An animated figure. A red dot stands for a student with an example task in two parts: ships needed a day, and ships the port takes a day. The student gives an AI four reports: two aid reports, a port survey and a harbor log. The AI answers both in the same form, each marked ready: "24 ships a day: 480 tons at 20 each" and "20 ships a day: 4 docks at 5 each". The student checks Part 1 against both aid reports, finds it right, and puts both answers into their brief, marking Part 1 checked and Part 2 used as is. A second student gets the same answers and checks each part at its source. Part 1 checks out. For Part 2, the port survey says 4 docks at 5 ships each, but the harbor log says dock 2 is closed for repairs, so the second student corrects the estimate to 15 ships from 3 open docks. On the page both parts look the same, but the AI worked from capacity and Part 2 depends on what's open today. An uneven line, the frontier, is drawn between the AI's answers, with Part 1 inside and Part 2 outside. A panel shows a field experiment with BCG consultants: on a task outside the jagged frontier, the group without AI was right 84.5% of the time and the two groups with AI 60% and 70%, and graders rated the AI users' work higher in quality. The students' working marks come off the briefs, and faculty see only the briefs. Faculty point to Part 1 in both: each student says, "The aid reports." Then Part 2: the first student says, "Part 1 checked out, so I trusted the rest." The second says, "The harbor log. One dock is closed." The figure ends on the faculty check.

**Beat list (text equivalent):**

1. **A student gets a two-part task and gives an AI four reports.** *On screen:* a task card appears at the top left: "Example task. Part 1: Ships needed a day. Part 2: Ships the port takes a day." A red dot labelled Student appears below. Four reports appear across the top: Aid report, Aid report, Port survey and Harbor log. The dot pulses, and a grey copy of each report slides into a small stack labelled "Given to the AI", where it stays.
2. **It answers both with equal confidence.** *On screen:* two answer cards labelled "AI's answers" write in together, in grey on a beige band. Part 1: "24 ships a day: 480 tons at 20 each." Part 2: "20 ships a day: 4 docks at 5 each." Each gets the same grey "Ready" tag at the same moment.
3. **The student checks Part 1 against the two aid reports. It's right.** *On screen:* the dot opens both aid reports. A sheet labelled "First student's brief" appears, Part 1 slides into it, and the dot marks it "Checked" in red.
4. **Part 2 looks just as sure, so they use it.** *On screen:* the "Ready" tag on the AI's Part 2 swells, and the dot moves down to the Part 2 row. Part 2 slides into the first brief, and the dot marks it "Used as is". The aid reports close.
5. **Another student, with the same answers, checks each at its source.** *On screen:* a second red dot labelled Second student and an empty sheet labelled "Second student's brief" appear. The dot pulses and both "Ready" tags blink. The dot opens both aid reports, and Part 1 slides into its brief, marked "Checked".
6. **That student checks Part 2 against the port reports, and corrects it.** *On screen:* the dot opens the port survey, headed "Capacity": "4 docks, 5 each". Its note appears large in the second brief: "Survey: 4 docks, 5 ships each." The dot opens the harbor log, headed "Open today": "Docks 1, 3, 4", and set apart, "Dock 2: closed". Its note appears: "Log: dock 2 closed for repairs." After a pause, Part 2 slides into the second brief. The dot strikes out "20" and writes "15", strikes out "4" and writes "3 open", so it reads "15 ships a day: 3 open docks at 5 each", and marks it "Checked". The first brief still says 20.
7. **Part 2 depends on what's open today. A jagged frontier marks where an AI stops being reliable.** *On screen:* the harbor log's "Docks 1, 3, 4" is underlined. The AI's "4 docks at 5 each" is underlined and marked "Capacity". Then an uneven line is drawn between the AI's two answer cards, labelled "Inside the frontier" above and "Outside the frontier" below, and the two cards, alike in form, pulse together.
8. **In a field experiment, consultants with AI got a task outside the frontier right less often.** *On screen:* the picture dims and a panel rises: right answers on a task outside the jagged frontier. Without AI: about 84.5%. With AI, two groups: 60% and 70%. A bracket beside the AI bars: "Rated higher in quality than without AI, regardless of correctness." Source: Dell'Acqua et al. (2023), BCG consultants, HBS working paper 24-013.
9. **Faculty point to each part in turn and ask what justified relying on it.** *On screen:* the panel goes. The red marks and the second student's note lift off both briefs, the reports and the AI's column fade back, and "Faculty see only the briefs" appears. Part 1 is outlined in both briefs, and each student says, "The aid reports." Then Part 2: the first student says, "Part 1 checked out, so I trusted the rest." The second says, "The harbor log. One dock is closed."
10. **Faculty check: What evidence justified relying on the system here? Point to each part. Was the evidence about that part?** *On screen:* both lines appear under the picture at the same size. The briefs, both answers, the AI's answers, the frontier and the harbor log stay in view.

**Faculty check:** What evidence justified relying on the system here?
**Point to each part. Was the evidence about that part?** (same size)

Both students give the same reason for Part 1. For Part 2, the first student's evidence is about Part 1 and the second student's is about Part 2. The edge between the two parts doesn't show on the page; the second student found it by checking each part against the reports it rests on. Section II of the essay asks students to identify which part of the task they are delegating, what evidence would justify that delegation, and what independent checks are required.

**From the essay:** the Section II paragraph above, and from Section V the trust and reliance paragraph, with its citation (Raees & Papangelis, 2026).

**Evidence:** Dell'Acqua et al., [Navigating the Jagged Technological Frontier](https://www.hbs.edu/faculty/Pages/item.aspx?num=64700), HBS working paper 24-013 (2023). On a task chosen to fall outside the frontier, consultants without AI were right about 84.5% of the time and the two AI groups 60% and 70%: in the working paper's words, "19 percentage points less likely to produce correct solutions." Graders still rated the AI users' recommendations higher in quality "regardless of the correctness of their answer."

**Links,** in the family's order: Book chapter: Calibrate the tool (`../../book-v0/four-moves-book.html?spread=3`); Practice (`https://judgmentlab.net/#companion`); Essay Section II (`#ii-what-the-problem-looks-like`) and Section V (`#v-appropriate-reliance-as-a-teachable-competency`); then Make the call yourself (`../appropriate-reliance/`).

## 7. Pacing table

Reading is caption words ÷ 3. Every beat holds at least 1.5 s after its last movement.

| Beat | Time (s) | Caption words | Picture words | Reading (s) | Lead (s) | Motion (s) | Hold (s) | Total (s) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · The task and the reports | 0.0–8.6 | 12 | 29 | 4.0 | 1.0 | 5.7 | 1.9 | 8.6 |
| 2 · Equal confidence | 8.6–15.6 | 6 | 24 | 2.0 | 1.0 | 3.5 | 2.5 | 7.0 |
| 3 · Checks Part 1 | 15.6–23.1 | 12 | 5 | 4.0 | 1.0 | 4.5 | 2.0 | 7.5 |
| 4 · Uses Part 2 | 23.1–30.3 | 10 | 3 | 3.3 | 1.0 | 4.7 | 1.5 | 7.2 |
| 5 · Checks each part | 30.3–37.6 | 11 | 7 | 3.7 | 1.0 | 4.8 | 1.5 | 7.3 |
| 6 · Checks Part 2 too | 37.6–48.6 | 12 | 36 | 4.0 | 1.0 | 8.5 | 1.5 | 11.0 |
| 7 · The reason and the frontier | 48.6–58.4 | 17 | 7 | 5.7 | 1.0 | 7.3 | 1.5 | 9.8 |
| 8 · The study | 58.4–67.9 | 16 | 29 | 5.3 | 1.0 | 3.5 | 5.0 | 9.5 |
| 9 · Faculty point to each part | 67.9–83.9 | 14 | 31 | 4.7 | 1.0 | 13.5 | 1.5 | 16.0 |
| 10 · Faculty check | 83.9–90.6 | 8 + 10 | 0 | 6.0 | 0.0 | 3.8 | 2.9 | 6.7, then rests |
| **Total** | | **128** | **171** | | | **59.8** | | **90.6** |

Checks:
- The longest stillness is the 1.5 s pause on the second student's reading note (beat 6) and the 5.0 s panel hold (beat 8); beats 7–8 together hold still for about 8 s of 19, against 16 of 25 in round 4.
- The second student's reason for "15" is on screen, large, from 41.3 s; the 15 appears at 44.2 s.
- Both port callouts stay open, at full strength, to the end.
- **Phone:** the caption and controls stay put through the whole run (measured at 390, 768, 900 and 1280 px wide), and the player is 833 px tall at 390 × 844, final frame included.
