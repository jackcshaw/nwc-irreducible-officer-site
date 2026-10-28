# Uncalibrated reliance: storyboard

Motion figure 4 of 8 · slug `uncalibrated-reliance` · storyboard round 4, revised after figure cold read 1 · October 28, 2026

Starting point: `concepts-v0/proposal.md` §2.4, "Same confidence" (7 s, not built). This version keeps its mechanism: AI answers that look equally sure, with a hidden jagged line between them. It cuts six answers down to two look-alike parts of one task, so the comparison is exact. Both students check Part 1 the same way. The second also checks Part 2 at its source, which is the one difference. The frontier, its reason and the Dell'Acqua et al. evidence come after both students have worked. The shared runtime and `CONVENTIONS.md` apply throughout.

## 1. Intent

*The cold-read tester does not see this section.*

**The point.** Two AI answers can look and sound equally sure and still fall on opposite sides of what the tool does well, and nothing on the page shows which is which. A student who checks one answer, finds it right and relies on the look-alike one has evidence about the wrong part of the task. Faculty find out by pointing to each part and asking what evidence justified relying on the system there, and listening for whether the evidence was about that part.

**What a first-time educator should be able to say afterwards.** "The task had two parts that looked the same: how many relief ships are needed a day, and how many the port can take a day. The student gave the AI four reports, and it answered both the same way, both marked ready. The student checked Part 1 against the aid reports, found it right, and used both. Another student got the same answers and checked each part at its source. Part 1 checked out for them too, but for Part 2 the harbor log showed a closed dock, so they corrected it. On the page the two parts looked the same, but Part 2 depended on what was open today, and the AI had worked from capacity. That uneven edge is the jagged frontier: in a field experiment, consultants using AI were right less often on a task outside it, and graders still rated their work higher. Faculty saw only the briefs, pointed to each part and asked what justified relying on it. On Part 1 both named the aid reports. On Part 2 the first said Part 1 checked out; the second named the harbor log. So I'd ask what evidence justified relying on the system here, part by part, and check that the evidence was about that part."

**Faculty check** (verbatim from the site's Core Failure Modes table): *What evidence justified relying on the system here?* The final frame adds, directly under it and at the same size, the move the figure makes: *Point to each part. Was the evidence about that part?*

**Essay passage** (Section II, "What the Problem Looks Like"):

> **Uncalibrated reliance** begins with a reasonable impulse: AI is useful, the output is confident, and parts of the task feel tedious. The problem is that AI performance is uneven in ways that are not always visible from the outside. Tasks that look similar may differ significantly in whether AI helps or hurts. Appropriate reliance requires the student to identify which part of the task they are delegating, what evidence would justify that delegation, and what independent checks are required before discovering the error downstream.

Related, Section V, "Appropriate Reliance as a Teachable Competency":
- "AI improved performance on some tasks and degraded it on others, and the boundary was not obvious in advance. Tasks that looked similar from the outside differed in whether AI helped or hurt, a finding Dell'Acqua et al. describe as the jagged technological frontier." (beats 7–8)
- "The educational response is pattern recognition: learning to identify what kind of task is in front of you, where models tend to be strong, where they tend to fail, and what independent checks are required before the output governs the work." (beat 7: Part 2 depends on what's open today; the AI worked from capacity)
- "Trust is a subjective disposition, a feeling of confidence that a system will perform well. Reliance is the observable act of accepting its output and acting on it. Appropriate reliance is harder and more discriminating: accepting support when it is warranted, refusing or verifying when it is not, and being able to give an account of the difference." (beat 4: trust earned on Part 1 becomes reliance on Part 2; beats 5–6: each part verified; beat 9: the account)

Related, Section VIII, reliance evidence: "Students identify which outputs they accepted, which they modified, which they rejected, which they verified independently... and why in each case. A short oral defense tests whether the student genuinely owns those choices rather than recording them after the fact." (the working marks in beats 4–6; the oral answers in beat 9)

**How the beats map to the passage.**

| Essay clause | Beat |
| --- | --- |
| "a reasonable impulse: AI is useful, the output is confident" | 3 (both answers arrive equally sure, both tagged "Ready"), 4 (the student checks Part 1 and it is right) |
| "identify which part of the task they are delegating" | 5 (the second student checks each part at its source) |
| "what independent checks are required before discovering the error downstream" | 6 (the second student checks Part 2 and corrects it before it goes into the brief; the first brief still says 20) |
| "uneven in ways that are not always visible from the outside" and "Tasks that look similar may differ" | 7 (both answers pulse alike; checking shows Part 2 depends on what's open today; the frontier runs between them) |
| Section V, "the jagged technological frontier" | 8 (the Dell'Acqua et al. evidence) |
| "what evidence would justify that delegation" | 9 (faculty point to each part; on Part 2 one student's evidence is about Part 1, the other's about Part 2) |

**Misreadings to design against.**

1. *AI is bad at this; don't use it.* The AI's Part 1 answer is right. Both students use AI for both parts. The second student keeps the AI's Part 2 wording and two of its numbers, and the AI's answers stay on screen to the end.
2. *The frontier is wherever the AI slipped this time.* Beat 7 names the reason Part 2 sits outside, as a pattern: the AI worked from capacity, and Part 2 depends on what's open today. Part 1 depends only on figures the aid reports agree on.
3. *You can tell the two kinds of task apart on sight.* Both parts are "ships a day" estimates answered in the same form. Beat 7's caption says both look the same on the page, and that checking is what shows the difference.
4. *The second student had the answer key.* Their habit (check each part at its source) is in beat 5's caption, and all their work comes before the frontier appears. They open both port reports, including the survey that agrees with the AI.
5. *The model student would fail the check.* Faculty point to each part, and the second student has evidence about each.
6. *Faculty can read the reliance off the brief.* The working marks ("✓ CHECKED", "USED AS IS") lift off before faculty see the briefs, and a label says faculty see only the briefs.
7. *The first student was lazy.* They check Part 1 against both aid reports before using anything, at the same pace as the second student. Their answer is honest and reasonable: "Part 1 checked out, so I trusted the rest."
8. *A confident answer is a reliable one.* Both answers carry the same "READY" tag and state their numbers flatly; one is wrong.
9. *The AI didn't have the harbor log.* Beat 2 shows the student giving the AI all four reports.
10. *Faculty can grade correctness from the brief.* Beat 8: graders in the study rated AI users' work higher in quality. The two briefs are equally polished.
11. *Faculty need to know where the error is.* They ask about each part in turn and hear the difference only on Part 2.

**Changes after figure cold read 1** (`tests/figure-read-1.md` and the orchestrator's notes):
- *"Frontier" is explained before it is used.* A new beat 9, "A jagged frontier marks where an AI stops being reliable. It doesn't follow how tasks look.", draws and labels the line and holds it for 9.3 s before the panel. Beat 8 now gives only the reason ("The AI worked from capacity. Part 2 depends on what's open today."). The study's caption and title use the word after that.
- *Beat 4 is two beats.* "The student checks Part 1 against the two aid reports. It's right." gets its own beat and hold; "Part 2 looks just as sure, so they use it as is." follows, with the AI's Part 2 "READY" pill swelling as its lead-in.
- *A stable phone stage.* The stacked stage now lays out every section from the first frame and only fades them in; the caption band has a fixed height. The task, both port callouts, the AI's answers and both briefs stay on screen to the end, the study is an overlay, and the final phone frame shows the harbor log line behind "3 open".
- *Smaller fixes from the read.* The copies of the reports are labelled "GIVEN TO THE AI". Both port callouts stay open, so the survey isn't on screen for only 1.5 s. At hand-in the reports, the AI's column and the frontier fade back to 55% under "FACULTY SEE ONLY THE BRIEFS". The bracket reads "Graders still rated these higher in quality, regardless of correctness", and the bar reads "about 84.5%".
- *Picture text is 13 units at least* (mono 13), so the stage keeps its labels down to a letterboxed scale of 0.846, which covers 1280 × 720 under the runtime's new viewport fit. The stacked stage takes over below that, measured at the same letterboxed scale the runtime uses.
- *Total:* 113.2 s in 12 beats, up from 94.7 s, for the new frontier beat, the split beat 4 and the reading budget.

**Changes after storyboard cold read 2** (`tests/storyboard-read-2.md` and the orchestrator's notes):
- *"Outside" means only the frontier.* Beat 7 now opens "On the page, both parts look the same."
- *The frontier has a reason.* Part 1 is now ships needed a day (from aid reports that agree) and Part 2 ships the port takes a day. Beat 7 shows the pattern: the AI's "4 docks at 5 each" is marked "CAPACITY", the harbor log's line is marked "OPEN TODAY", and the caption says checking shows Part 2 depends on what's open today. That also states the essay's two-sided point: the edge doesn't show on the page, and checking each part finds it.
- *The tags are working marks.* "✓ CHECKED" and "USED AS IS" lift off the briefs at hand-in, under "FACULTY SEE ONLY THE BRIEFS".
- *Faculty ask about each part in turn.* On Part 1 both students say "The aid reports." On Part 2 the first says "Part 1 checked out, so I trusted the rest." (the tester's fairer line) and the second "The harbor log. One dock is closed." The move line is now "Point to each part. Was the evidence about that part?"
- *Reading budget.* Every beat holds its caption plus new picture words at 3 words a second or less. The reports get their own short beat, and the AI's answers their own 10-second beat.
- *Smaller fixes.* The AI's answers drop "About" so they state their numbers flatly, and the "READY" tags are filled pills in identical style. The dot steps away from "USED AS IS" and waits before leaving. The study and the quality finding share one beat; the quality finding is the bracket "Graders rated higher in quality". All evidence bars are the same height. "Jagged frontier" is in the panel's title. The bar label reads "84.5%"; the page text keeps "about 84.5%".
- *Narrow screens.* Mono-12 text would drop under 11 px on a stage narrower than 880 px, so the stacked text stage (fluency substitution's) takes over whenever any picture label would be hidden, not only below 480 px.
- *Total:* 94.7 s in 10 beats, up from 89.4 s, for the reading budget and the second faculty question.

**Lessons from figures 1–3, applied.**

| Lesson | Here |
| --- | --- |
| Every caption's claim visible on screen | Each beat's "Notice" names the event that carries its caption, and the event arrives by the time the caption can be read once. |
| Captions never announce an outcome before it appears | Beat 9's caption says only what faculty ask. The answers arrive as speech. |
| Show what doing it well looks like, with AI | Beats 5–6: the second student gets the same AI answers, checks each and keeps the AI's work apart from one fix. |
| AI visible in the final still | The AI's two answers stay in the centre column with their "READY" tags, and both briefs keep the AI's grey text. |
| Exactly one difference | Same answers, the same check of Part 1 with the same motion. The only difference is the second student's check of Part 2. |
| A difference faculty can observe | Faculty see only the briefs and hear the answers. The second brief shows a correction. |
| Fair to the student who fails | A careful student who checks before using anything and gives a reasonable answer. |
| Check verbatim, the figure's move under it at equal weight | "Point to each part. Was the evidence about that part?" |
| Big, centre-stage changes; no frozen stretches | Answers, briefs and frontier sit in a three-column layout. The evidence panel rises large and centre stage. Every beat moves. |
| Reading pace | Caption plus new picture words at 3 words a second or less in every beat. |

**Coordination with figure 8 (appropriate reliance).** Figure 8 is the interactive "Make the call": the reader decides whether to rely on the AI for two of the study's own tasks, then sees the frontier and the results, and gives an account. This figure shows the failure in a student, with a constructed classroom task, and uses the study only as evidence: no BCG tasks, no choices, no reader interaction. Both label the sides "Inside the frontier" and "Outside the frontier" and tag AI answers "Ready". This figure's model student checks every part; accepting support without a check when it is warranted belongs to figure 8's "Rely on it" call. Only the source spine's figures appear here: about 84.5%, 60% and 70%, and the quality finding.

**Why this scenario.** The lab's uncalibrated-reliance case asks an educator how far the source spine's learning evidence can guide AI use, which a viewer can't follow without the essay. The figure keeps the PME setting of figures 1–3 with a new kind of task. A relief estimate is staff work any educator can follow, and the arithmetic needs no specialist knowledge. The two parts look alike: both are "ships a day" estimates from the same packet, answered in the same form. They differ in a way the page doesn't show: Part 1 rests on figures the two aid reports agree on, while Part 2 depends on what's open today, which only the harbor log records. The AI was given all four reports and worked from the survey's capacity. The task, the reports, the answers and both students are constructed, and the task card says "Example task". The figure claims nothing general about AI; the study supplies only the evidence that look-alike tasks can differ.

**Considered and left out.**
- *Round 1's mirrored design* (each student checks one part). The model student had no evidence for Part 1.
- *A downstream scene* (24 ships needed, 15 a day at the docks). It would add a beat; the wrong number in the first brief carries the cost, and the shortfall is there for a discussion.
- *Two separate turn beats* (frontier, then naming it). The reading budget and the second faculty question needed the time.
- *A single combined "With AI" bar.* It would invent an average.
- *The study's inside-the-frontier figures.* This figure's brief limits it to the outside task; figure 8 shows them.

**Running time.** 113.2 s in 12 beats (frame capture 85.6 s, fluency substitution 88.6 s, premature synthesis 90.0 s). Over the 90 s guide because of the reading budget, the second faculty question, the frontier's own beat and the split beat 4.

**Book link target.** `../../book-v0/four-moves-book.html?spread=3` (Move 2, Calibrate the tool) until `book-v1/` exists.

**Conventions this figure adds** (to `CONVENTIONS.md`):
- *A "READY" tag on an AI answer* (a filled grey pill) means the tool presented it as finished. Right and wrong answers carry identical tags. Shared with figure 8.
- *Working marks* are red mono 12 tags ("✓ CHECKED", "USED AS IS") a student's dot writes on their own product while working. They lift off at hand-in, under "FACULTY SEE ONLY THE BRIEFS", so faculty receive the product alone.
- *The jagged frontier* is an irregular navy line with uneven teeth, drawn only between the look-alike items it separates, labelled "INSIDE THE FRONTIER" and "OUTSIDE THE FRONTIER". It appears only after the people have worked, with its reason on screen.
- *An evidence panel* rises centre stage while the scene dims to 25%, with equal-height ink bars, values from the source spine and a mono source line.
- *A source opens to its relevant line* in a callout under its card.
- *Giving the AI material* is small grey copies sliding from each source into a stack beside the AI's work, which stays.
- *Faculty pointing at a section of text* is a navy rounded outline, which can move from part to part.
- *The stacked text stage takes over whenever any picture label would be hidden* (extends FS's below-480 rule), so labels never vanish from a stage that is still drawn.

**Open questions for Jack.**
- **The move line is this figure's wording,** adapted from Section II. Should the site's check carry it, for example "What evidence justified relying on the system here, part by part?"
- **A logistics task for a war-college figure.** Chosen because anyone can follow the arithmetic.
- **Red corrections can read as a teacher's pen** (cold read 1). The figure keeps the convention: red is the student's, and the dot draws every red mark.
- **The running time** is 113.2 s, well over the 90 s guide. The cuts available would undo cold-read fixes: merging the frontier into the reason beat, or the second student's two checks into one beat.
- **The chapter mapping** (Calibrate the tool) is provisional.

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
