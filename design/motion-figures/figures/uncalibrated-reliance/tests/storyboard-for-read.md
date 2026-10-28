# Uncalibrated reliance: storyboard

Motion figure 4 of 8 · slug `uncalibrated-reliance` · storyboard round 3, revised after storyboard cold read 2 (passed with fixes) · October 27, 2026

*Cold-read copy. The Intent section is removed.*

## 2. Scenario

A war-college student must estimate two things for relief planners: how many supply ships are needed a day, and how many ships the port can take a day. The student gives an AI four reports: two aid reports, a port survey and the harbor log. It answers both in the same form and with the same confidence: 24 ships a day (480 tons at 20 each) and 20 ships a day (4 docks at 5 each). The student checks the first answer against the aid reports, finds it right, and uses both. A second student gets the same answers and checks each part at its source. Part 1 checks out. For Part 2, the port survey agrees with the AI, but the harbor log says dock 2 is closed for repairs, so the second student corrects the estimate to 15. On the page both parts look the same; Part 2 depends on what's open today, and the AI worked from capacity. Faculty see only the briefs. They point to each part and ask what justified relying on it. On Part 1 both students name the aid reports. On Part 2 the first says Part 1 checked out; the second names the harbor log.

*Sources.* The task, the four reports, both AI answers, the docks and both students' answers are constructed for this figure, and the task card says "Example task". *The Irreducible Officer*, Section II, defines uncalibrated reliance; Section V describes the jagged frontier, pattern recognition across task types, and the difference between trust and reliance. The study figures are from the source spine's Jagged Frontier entry (Dell'Acqua et al., 2023, HBS working paper 24-013): on a task chosen to fall outside the frontier, consultants without AI were right about 84.5% of the time and the two AI groups 60% and 70%, and graders still rated the AI users' recommendations higher in quality. The scenario's numbers are constructed.

## 3. Cast and grammar

**The colour rule.** Grey is what the AI supplied: its answers, their "READY" pills, the "AI'S ANSWERS" label, the copies of the reports it was given, and its words in the briefs. Red is what a student decided, plus the dots and their name labels: the working marks and the second student's corrections. Navy ink is the page: the task, the reports, labels, the pattern marks, the frontier, the evidence panel, faculty's outlines, and everything a student says aloud.

**Palette.** Paper `#f6f1e8`, paper-bright `#fffdfa`, ink `#0a2242`, machine grey `#5b564f` with a `#ded5c4` band behind AI-supplied text, red `#b81b2b`. Type: Source Serif 4 for answers, callouts, speech and captions; Source Sans 3 for name labels and the evidence panel; IBM Plex Mono for small labels (12 units, never smaller).

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
| Opened port report | Its relevant line | A callout under the card, Serif 14 ink on two lines. Port survey: "4 docks," / "5 ships each" (closes when the reader moves on). Harbor log: "Dock 2: closed" / "for repairs." (stays open) | Survey x 652–792, log x 800–936; y 62–102 |
| Copies to the AI | Handing over the reports | Four small grey-banded rectangles sliding from each report into a stack above the AI column, where they stay to the end | Stack at (456, 84), each 4 units further down and right |
| Red dots | The two students | Solid red circles, radius 5. "Student" (beats 1–4) and "Second student" (beat 5), Sans 600 13 red | Homes (36, 456) and (664, 456) |
| "AI'S ANSWERS" | Names the centre column | Mono 12 grey | Baseline (338, 128) |
| AI answer cards | The AI's two answers | Paper-bright cards. Mono 12 grey "PART 1" / "PART 2"; a filled grey "READY" pill at top right; Serif 16 grey on a grey band. Part 1: "24 ships a day:" / "480 tons at 20 each". Part 2: "20 ships a day:" / "4 docks at 5 each" | x 338–622; y 140–208 and 300–368 |
| Briefs | What each student hands in | Paper-bright sheets labelled mono 12 ink "FIRST STUDENT'S BRIEF" / "SECOND STUDENT'S BRIEF", each part in the AI's grey text on its band, in the same rows as the AI's cards. The second brief's Part 2 has "20" and "4" struck in red, then red "15" and "3 open": "~~20~~ 15 ships a day:" / "~~4~~ 3 open docks at 5 each" | x 24–308 and 652–936, y 134–374 |
| Working marks | Each student's decision while working | Red mono 12 at the top right of each part, written by the dot: "✓ CHECKED" or "USED AS IS". Lift 6 units and fade at hand-in | Right edges x 296 / 924; baselines 158 and 318 |
| Pattern marks | Why Part 2 sits outside | Navy underline under the AI's "4 docks at 5 each" with mono 12 navy "CAPACITY"; mono 12 navy "OPEN TODAY" with a short tick, left of the harbor log's callout | AI card underline from x 352, tag beside it; "OPEN TODAY" right edge (790, 86) |
| Jagged frontier | The uneven edge of what the AI did well here | An irregular navy line, stroke 1.6, uneven teeth, across the AI column only, between its cards. Mono 12 ink "INSIDE THE FRONTIER" above, "OUTSIDE THE FRONTIER" below | Line x 330–630, y 238–270; labels centred x 480, baselines 228 and 290 |
| Dimmed scene | Attention moves to the study | Everything on the stage drops to 25% | Beat 8 |
| Evidence panel | The study | Paper-bright panel, soft shadow. Sans 600 18 "Right answers on a task outside the jagged frontier". Rows, Sans 16: "Without AI" with one bar to 84.5% ("84.5%"); "With AI" over mono "TWO GROUPS" with two bars to 60% and 70%. All bars 18 high, ink 85%, 4 units per point. Mono 12 source "DELL'ACQUA ET AL. (2023) · BCG CONSULTANTS · HBS WORKING PAPER 24-013" | x 120–840, y 140–400 |
| Quality bracket | The quality finding | Navy bracket beside the "With AI" bars, Serif italic 17 "Graders rated higher" / "in quality" | Bracket x 652, text from x 666 |
| Faculty label | Faculty see the product only | Mono 12 ink "FACULTY SEE ONLY THE BRIEFS", centred | (480, 412) |
| Faculty outlines | Which part faculty mean | Navy rounded outlines around the same part in both briefs, moving from Part 1 to Part 2 | x 30–302 and 658–930 |
| Speech panels | What each student says | Paper-bright box, rounded 8, hairline ink border, tail toward the dot; two rows, "1 ·" and "2 ·", Serif 15 ink, words at about 3 a second | x 52–308 and 680–936, y 386–490 |
| Caption band | The words for each beat | Mono counter and Serif 22 caption; in beat 10 the check and the move line at the same size | Under the stage |
| Beat list | Text equivalent | Ten captions with "On screen" lines | Under the controls |

**The answers.**

| | Part 1 | Part 2 |
| --- | --- | --- |
| First student | "The aid reports." | "Part 1 checked out, so I trusted the rest." |
| Second student | "The aid reports." | "The harbor log. One dock is closed." |

**Narrow screens.** Mono-12 text drops below 11 px on a stage narrower than 880 px. Whenever the legibility check would hide any picture label, the SVG collapses and a stacked text stage, driven by the same clock, shows the current beat: the task, the reports, the AI's answers with their "Ready" tags, both briefs side by side with their marks, the frontier in words, the evidence as a short list, and the answers. The beat list shows its "On screen" lines.

## 4. Beats

Times are absolute seconds. In every beat the caption changes first (0.3 s fade) and nothing in the picture moves for the first second. A change the caption is about starts only after the caption can be read once, except a lead-in that the caption's main clause describes. Each beat holds its caption plus new picture words at 3 words a second or less.

### Beat 1 · 0.0–7.7 s · The task

- **What moves:**
  1. 1.0–1.6: the task card fades in and rises 6 units, showing "EXAMPLE TASK".
  2. 1.8–2.2: "Part 1 · Ships needed a day" fades in.
  3. 3.0–3.4: "Part 2 · Ships the port takes a day" fades in.
  4. 3.6–4.0: the red dot grows in at (36, 456), with its "Student" label.
  5. 4.0–7.7: hold.
- **Caption:** "A student gets a two-part task."
- **Notice:** both parts ask for ships a day.
- **Why:** the setup names the situation before anything goes wrong, and shows that the parts look alike.

### Beat 2 · 7.7–12.9 s · The reports go to the AI

- **What moves:**
  1. 8.7–10.1: four reports fade in across the top right, one at a time: Aid report, Aid report, Port survey, Harbor log.
  2. 10.2–10.6: the dot pulses once.
  3. 10.6–11.4: a grey copy slides from each report into a small stack above the centre column, where it stays.
  4. 11.4–12.9: hold.
- **Caption:** "The student gives an AI four reports."
- **Notice:** the AI gets every report, including the harbor log.
- **Why:** what the AI was given matters later; its miss isn't missing input.

### Beat 3 · 12.9–22.9 s · Equal confidence

- **What moves:**
  1. 13.9–14.3: "AI'S ANSWERS" fades in.
  2. 14.3–14.9: two answer cards rise 8 units and fade in together, labelled Part 1 and Part 2.
  3. 15.0–15.8: the first line of both answers writes in at once: "24 ships a day:" and "20 ships a day:".
  4. 16.0–16.8: the second lines write in at once: "480 tons at 20 each" and "4 docks at 5 each".
  5. 18.0–18.4: a filled grey "READY" pill appears on both cards at the same moment.
  6. 18.4–22.9: hold.
- **Caption:** "It answers both with equal confidence."
- **Notice:** same form, same flat statement, same tag.
- **Why:** this is "the output is confident", with nothing to tell the answers apart.

### Beat 4 · 22.9–31.6 s · The student checks Part 1 and uses both

- **What moves:**
  1. 23.9–24.5: the "Student" label fades as the dot moves to the first aid report.
  2. 24.5–25.1: it opens.
  3. 25.1–25.5: the dot moves to the second aid report.
  4. 25.5–26.1: it opens.
  5. 26.3–27.0: a sheet labelled "FIRST STUDENT'S BRIEF" fades in at left as a copy of Part 1 slides into it.
  6. 27.1–27.5: the dot writes "✓ CHECKED" in red on Part 1.
  7. 27.6–28.2: a copy of Part 2 slides in.
  8. 28.2–28.6: the dot writes "USED AS IS" in red on Part 2.
  9. 28.6–28.9: the dot steps 40 units left of the mark and waits.
  10. 29.6–30.1: the aid reports close, and the dot returns to its place.
  11. 30.1–31.6: hold.
- **Caption:** "The student checks Part 1, and it's right, so they use both."
- **Notice:** real checking, before anything is used. Part 2 goes in on the strength of Part 1. The marks are the student's working notes.
- **Why:** the reasonable impulse: trust earned on one part becomes reliance on the other.

### Beat 5 · 31.6–40.3 s · Another student checks each part

- **What moves:**
  1. 32.6–33.0: a second red dot grows in at (664, 456), "Second student".
  2. 33.0–33.4: an empty sheet labelled "SECOND STUDENT'S BRIEF" fades in at right.
  3. 33.5–33.9: the dot pulses, and both "READY" pills blink: the same answers.
  4. 34.0–34.6: the label fades as the dot moves to the first aid report.
  5. 34.6–35.2: it opens.
  6. 35.2–35.6: the dot moves to the second aid report.
  7. 35.6–36.2: it opens.
  8. 36.4–37.1: a copy of Part 1 slides into the second brief.
  9. 37.2–37.6: the dot writes "✓ CHECKED".
  10. 37.7–38.2: the aid reports close.
  11. 38.2–40.3: hold.
- **Caption:** "Another student, with the same AI answers, checks each part at its source."
- **Notice:** the same answers, the same reports, the same pace, the same mark.
- **Why:** this sets up the one difference. The habit is stated before any reveal.

### Beat 6 · 40.3–49.0 s · That student checks Part 2 too

- **What moves:**
  1. 41.3–41.8: the dot moves to the port survey.
  2. 41.8–42.4: its callout opens: "4 docks, 5 ships each".
  3. 42.4–42.8: the dot moves to the harbor log, and the survey's callout closes.
  4. 42.8–43.6: the harbor log's callout opens: "Dock 2: closed for repairs."
  5. 43.7–44.3: a copy of Part 2 slides into the second brief.
  6. 44.4–45.0: the dot strikes "20" in red and writes "15".
  7. 45.0–45.6: the dot strikes "4" and writes "3 open".
  8. 45.7–46.1: the dot writes "✓ CHECKED".
  9. 46.1–46.4: the dot steps aside and waits.
  10. 47.0–47.5: the dot returns to its place.
  11. 47.5–49.0: hold.
- **Caption:** "That student checks Part 2 against the port reports, and corrects it."
- **Notice:** the survey agrees with the AI; the harbor log doesn't. The AI's wording stays. The first brief still says 20.
- **Why:** the independent check the essay asks for, made before the error travels.

### Beat 7 · 49.0–59.7 s · On the page, both parts look the same (the turn)

- **What moves:**
  1. 50.0–50.6: the AI's Part 1 card pulses.
  2. 50.8–51.4: the AI's Part 2 card pulses the same way.
  3. 54.3–54.8: a navy underline runs under the AI's "4 docks at 5 each", and "CAPACITY" appears beside it.
  4. 54.9–55.4: "OPEN TODAY" appears beside the harbor log's callout, with a tick to "closed".
  5. 55.6–57.0: an irregular navy line draws across the AI column, between its two cards.
  6. 57.0–57.4: "INSIDE THE FRONTIER" fades in above it and "OUTSIDE THE FRONTIER" below.
  7. 57.4–59.7: hold.
- **Caption:** "On the page, both parts look the same. Checking shows Part 2 depends on what's open today."
- **Notice:** the AI worked from capacity; the real number depends on what's open today, which only the harbor log has. Part 1 needs only figures the aid reports agree on. The line between the answers is uneven, and nothing on the cards shows it.
- **Why:** the mechanism and its reason, as a pattern that travels to other tasks. The marks start 5.3 s in.

### Beat 8 · 59.7–72.0 s · The study

- **What moves:**
  1. 60.7–61.2: the scene dims to 25%.
  2. 61.2–61.8: the evidence panel rises centre stage: its title, the row labels and the source.
  3. 64.4–65.0: the "Without AI" bar grows to 84.5%.
  4. 65.1–65.7: the two "With AI" bars grow together, to 60% and 70%.
  5. 66.0–66.5: a navy bracket draws beside the "With AI" bars.
  6. 66.5–66.9: "Graders rated higher in quality" appears beside it.
  7. 66.9–72.0: hold.
- **Caption:** "In a field experiment, consultants with AI were right less often outside the frontier."
- **Notice:** both groups with AI fall short of the group without, and their work was still rated higher. This is a real study, not the port task.
- **Why:** the edge isn't a quirk of one example, and polish doesn't show it. The bars start 4.7 s in.

### Beat 9 · 72.0–88.0 s · Faculty point to each part

- **What moves:**
  1. 73.0–73.5: the panel fades and the scene returns.
  2. 73.6–74.2: the working marks lift off both briefs and fade.
  3. 74.2–74.7: "FACULTY SEE ONLY THE BRIEFS" fades in between the students.
  4. 76.7–77.2: navy outlines draw around Part 1 in both briefs.
  5. 77.3–77.7: both speech panels open.
  6. 77.7–78.7: the first student: "1 · The aid reports."
  7. 78.9–79.9: the second student: "1 · The aid reports."
  8. 80.2–80.7: the outlines move to Part 2.
  9. 80.9–83.9: the first student: "2 · Part 1 checked out, so I trusted the rest."
  10. 84.2–86.5: the second student: "2 · The harbor log. One dock is closed."
  11. 86.5–88.0: hold.
- **Caption:** "Faculty point to each part in turn and ask what justified relying on it."
- **Notice:** faculty see only the briefs. On Part 1 the answers match. On Part 2 one student's evidence is about Part 1, the other's about Part 2.
- **Why:** the essay's "what evidence would justify that delegation", asked part by part. The outlines start 4.7 s in.

### Beat 10 · 88.0–94.7 s · The faculty check

- **What moves:**
  1. 88.0–88.2: caption 9 fades out.
  2. 88.2–88.8: "FACULTY CHECK" and the question rise into the caption band.
  3. 91.3–91.8: directly under it, at the same size: "Point to each part. Was the evidence about that part?"
  4. 91.8–94.7: hold; the figure rests here.
- **Caption:** "Faculty check: What evidence justified relying on the system here?" Second line, same size: "Point to each part. Was the evidence about that part?"
- **Notice:** the picture above is that move.
- **Why:** the figure ends on the check and the move.

## 5. Final frame

The still at 94.7 s; also the reduced-motion view, the print view and the poster.

**Stage:**
- **Top left:** the task card: "EXAMPLE TASK · Part 1 · Ships needed a day · Part 2 · Ships the port takes a day".
- **Top right:** the four reports; the harbor log open, "Dock 2: closed for repairs.", marked "OPEN TODAY".
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

1. **A student gets a two-part task.** *On screen:* a task card: "Example task. Part 1: Ships needed a day. Part 2: Ships the port takes a day." A red dot labelled Student.
2. **The student gives an AI four reports.** *On screen:* four reports appear, Aid report, Aid report, Port survey and Harbor log. The dot pulses, and a faint copy of each slides to the centre.
3. **It answers both with equal confidence.** *On screen:* two answer cards labelled "AI's answers" write in together. Part 1: "24 ships a day: 480 tons at 20 each." Part 2: "20 ships a day: 4 docks at 5 each." Each gets the same "Ready" tag.
4. **The student checks Part 1, and it's right, so they use both.** *On screen:* the dot opens both aid reports. Part 1 goes into "First student's brief", marked "Checked". Part 2 goes in, marked "Used as is".
5. **Another student, with the same AI answers, checks each part at its source.** *On screen:* a second red dot labelled Second student and an empty brief appear. The dot pulses and both "Ready" tags blink. It opens both aid reports, and Part 1 goes into its brief, marked "Checked".
6. **That student checks Part 2 against the port reports, and corrects it.** *On screen:* the port survey opens, "4 docks, 5 ships each", then the harbor log, "Dock 2: closed for repairs." Part 2 goes into the second brief with "20" and "4" struck out and "15" and "3 open" written in: "15 ships a day: 3 open docks at 5 each." It is marked "Checked". The first brief still says 20.
7. **On the page, both parts look the same. Checking shows Part 2 depends on what's open today.** *On screen:* the AI's two cards pulse alike. Its "4 docks at 5 each" is underlined and marked "Capacity"; the harbor log's line is marked "Open today". An uneven line is drawn between the AI's cards, labelled "Inside the frontier" above and "Outside the frontier" below.
8. **In a field experiment, consultants with AI were right less often outside the frontier.** *On screen:* the picture dims and a panel rises: right answers on a task outside the jagged frontier. Without AI: 84.5%. With AI, two groups: 60% and 70%. A bracket: "Graders rated higher in quality". Source: Dell'Acqua et al. (2023), BCG consultants, HBS working paper 24-013.
9. **Faculty point to each part in turn and ask what justified relying on it.** *On screen:* the marks come off both briefs, and "Faculty see only the briefs" appears. Part 1 is outlined in both briefs; each student says, "The aid reports." Then Part 2: the first student says, "Part 1 checked out, so I trusted the rest." The second says, "The harbor log. One dock is closed."
10. **Faculty check: What evidence justified relying on the system here? Point to each part. Was the evidence about that part?** *On screen:* the questions appear under the picture at the same size. The briefs, the AI's answers, the frontier and both answers stay in view.

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
| 2 · Reports to the AI | 7.7–12.9 | 7 | 8 | 5.0 | 1.0 | 2.7 | 1.5 | 5.2 |
| 3 · Equal confidence | 12.9–22.9 | 6 | 24 | 10.0 | 1.0 | 4.5 | 4.5 | 10.0 |
| 4 · Checks Part 1, uses both | 22.9–31.6 | 12 | 7 | 6.3 | 1.0 | 6.2 | 1.5 | 8.7 |
| 5 · Checks each part | 31.6–40.3 | 13 | 6 | 6.3 | 1.0 | 5.6 | 2.1 | 8.7 |
| 6 · Checks Part 2 too | 40.3–49.0 | 12 | 14 | 8.7 | 1.0 | 6.2 | 1.5 | 8.7 |
| 7 · Both parts look the same | 49.0–59.7 | 16 | 9 | 8.3 | 1.0 | 7.4 | 2.3 | 10.7 |
| 8 · The study | 59.7–72.0 | 14 | 23 | 12.3 | 1.0 | 6.2 | 5.1 | 12.3 |
| 9 · Faculty point to each part | 72.0–88.0 | 14 | 31 | 15.0 | 1.0 | 13.5 | 1.5 | 16.0 |
| 10 · Faculty check | 88.0–94.7 | 8 + 10 | 0 | 6.0 | 0.0 | 3.8 | 2.9 | 6.7, then rests |
| **Total** | | **118** | **139** | | | **59.1** | | **94.7** |

Checks:
- Changes a caption names wait until it can be read once: the "READY" pills (beat 3), Part 2 into the first brief (beat 4, 4.7 s in), the correction (beat 6, 4.1 s), the pattern marks (beat 7, 5.3 s), the bars (beat 8, 4.7 s), the outlines (beat 9, 4.7 s), the move line (beat 10, 3.3 s after the check).
- Both students check Part 1 with the same motion and timing.
- The second student's work is done before the frontier appears.
- Speech arrives at about 3 words a second and stays on screen.
- Every hold is at least 1.5 s.
- No camera moves; the scene dims once for the panel. Reduced motion shows the final frame.
