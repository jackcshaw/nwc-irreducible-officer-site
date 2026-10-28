# Institutional monoculture: storyboard

Motion figure 6 of 8 · slug `institutional-monoculture` · storyboard round 5, revised after figure cold read 2 · October 28, 2026

*Cold-read copy. The Intent section is removed.*

## 2. Scenario

A war-college seminar of ten students gets one open task: recommend a strategy for our partnership with Country A. The context lists our trade, its ports, its election, its minerals and a rival's loans. Each student asks an AI for an outline, and the outlines come back alike. Each student writes their own paper, with different evidence, structure and layout, and faculty find that each one holds up. Lined up, the papers' one-line problems are worded differently ("Outbid rival lenders", "Win back trade", "Deny them mines"), and faculty judge that every one sets the same goal: counter the rival. Every AI outline had opened with that frame. Faculty then ask what other frames the task could take, and the question stays open. Last, the figure imagines the seminar working the way the essay proposes: each student defines the problem first, then asks the AI to challenge it. Those papers hold up too, and in this one possible spread their problems fall under three goals: counter the rival, back the partner's goals, and secure what we need.

*Sources.* The task, the context, the seminar, the outlines, the papers and every problem line are constructed for this figure, and the task card says "Example task". *The Irreducible Officer*, Section II, defines institutional monoculture: similar systems, prompts and defaults narrow the range of frames available to a seminar, behind a surface of different arguments, structures and evidence. Section VIII asks each student to name the problem frame before submitting; in the figure each paper's first line stands for it, and lining the lines up across a class is the figure's own application. Section IX's pilot has students write a problem frame without AI, then ask an AI to find assumptions they missed and generate alternative frames; the imagined seminar follows those two steps. The essay proposes that order; whether it spreads a seminar's frames is untested. The figure shows no numbers and plots no study.

## 3. Cast and grammar

**The colour rule.**
- *Grey* is what the AI supplied: the AI panel, the outlines, the AI's opening-line card and the line that traces it, the first seminar's frame bracket after beat 6, the "AI'S FRAME" pill, the AI's question card and its speech bubbles, "All drafted with AI", and the AI steps in the sequence labels.
- *Red* is what a student decided, plus the people: the dots, the name labels for each run, the imagined seminar's problem lines written before the AI (and the small copies sent to it), and "DEFINE PROBLEM" in its sequence label.
- *Navy ink* is the page and faculty's work: the task card, the students' own writing, every lined-up problem line in both runs, the faculty's reading marks, the frame brackets faculty draw, the goal labels and headings, faculty's ring and ticks, and the faculty's question.
- *Dashed* means nobody has taken the frame up yet.

**Palette.** Paper `#f6f1e8`, paper-bright `#fffdfa`, ink `#0a2242`, machine grey `#5b564f` with a `#ded5c4` band behind AI-supplied text and outlines, red `#b81b2b`. Type: Source Serif 4 for the task, problem lines and captions; Source Sans 3 for name labels; IBM Plex Mono for small labels (13 units in this figure, so they stay at 11 px or more when the picture scales to a laptop window).

**Stage.** An SVG with a 960 × 540 viewBox. One view, no camera moves. Two layouts on the same stage:
- *The seminar, large* (beats 1–7): the AI panel at top left, the task card at top right, the seminar grid at left, the lineup board at right, and open space between the panel and the card.
- *Two runs, compact* (beats 8–11): the AI panel (shrunk to 40 high) and task card stay. The seminar's block shrinks into the upper half (block top Y = 146) and the imagined seminar's block sits in the lower half (Y = 340), with a hairline divider at y 331. Each block has its grid at left (x 24–300) and its board at right. The seminar's board holds its column of ten lines (x 340–520), the AI's card above it, the pill beside it and the faculty's question in open space; the imagined seminar's board has a heading and three goal columns at x 340, 540 and 750, each 180 wide.

Positions are viewBox units. Widths of text-sized elements and line breaks come from measured text at build time.

| Element | Stands for | How it looks | Where |
| --- | --- | --- | --- |
| Task card | The assignment and its context | Paper-bright card, hairline ink border (15%). Mono 13 "EXAMPLE TASK", then Serif 15 ink over two lines: "Recommend a strategy for our / partnership with Country A." A hairline, then Serif 13.5 ink on two lines: "Our trade, its ports, its election, / its minerals, a rival's loans." Stays throughout | x 670–936, y 16–138 |
| AI panel | The AI tools the students use | Rounded box, grey stroke 1.5, grey-band fill at 40%. Mono 13 grey "AI". Shrinks to 40 high in beat 8. Stays throughout | x 24–300, y 16–100 |
| Red dots | The students | Solid red circles, radius 5 (large) or 3 (compact), one at each paper's top-left corner. Pulse to ask; move a little over the paper to write | (x − 2, y − 2) for each paper |
| Name labels | Name each run's students | Red Sans 600 13: "The seminar" (beat 1); "The same seminar, imagined" (beat 8) | Large: (40, 138). Compact: (24, Y + 12) |
| Papers | Each student's work | Paper-bright sheets, hairline border, soft shadow. Blank at first; then a grey outline (first seminar) or a red first line and a grey speech bubble (imagined seminar); then the student's own layout in ink. Ten layouts: headings with rows; bullets; a bar chart; a table; dense text; two columns; a numbered list; a pull quote; a timeline; a small map. Each paper's first line is its one-line problem statement, drawn as a short bar (ink in the seminar; red in the imagined seminar) | Large: 80 × 104 in a 5 × 2 grid, columns at x 40, 140, 240, 340, 440; rows y 164–268 and 300–404. Compact: 44 × 57, columns at x 24, 80, 136, 192, 248; rows Y + 38 and Y + 102 |
| Ticks | Faculty found the paper holds up | A small navy ✓ inside each paper's top-right corner. Stays to the end | Each paper |
| Faculty ring | Faculty reading each paper | A navy rounded outline that steps from paper to paper | Over a grid |
| Request marks | A student asking the AI | Small ink dots (radius 3.6) that travel from each student's dot to the AI panel and fade as they arrive | Dot to panel's lower edge |
| Outlines | What the AI sends back to the first seminar | Grey sheets on the grey band: three heading bars with two rows each, the same pattern line for line in all ten | Fly from the panel into each paper |
| First-line marks | Faculty picking out each paper's problem | A light navy outline around each paper's first line, in beat 4 only | Each large paper |
| Problem lines (first seminar) | Each paper's problem statement, as faculty read it | Serif 16 ink in the large board, baselines 204 + 26k; Serif 13 ink in the compact column, baselines Y + 36 + 15k. Each is a copy lifted from its paper; the paper keeps its own line. Worded differently; only three contain "rival" | Large: x 600. Compact: x 350 |
| Reading marks | Faculty reading each line before judging | A small navy dot at the start of each line, appearing in turn in beat 5; gone after beat 7 | 9 units left of each large line |
| Frame bracket (first seminar) | The goal faculty judge all ten share | Corner brackets joined by a hairline (frame convention), navy, labelled mono 13 "ONE FRAME: COUNTER THE RIVAL" under it. Turns grey in beat 6; the label stays navy. Compact: "ONE FRAME" above, then "COUNTER THE RIVAL" at the column's top | Large: x 578–800, y 184–448, label at (578, 470). Compact: x 340–520, from Y + 24 |
| The AI's card | Where the shared frame came from | A grey-band card, grey outline: mono 13 grey "EVERY AI OUTLINE OPENED WITH" over Serif 18 grey on a grey band, "Counter the rival's influence". Grows out of the AI panel in beat 6; in beat 8 it moves above the first seminar's board at 75% and dims with it | Large: x 320–650, y 20–96. Compact: x 340–588, y 80–137 |
| Trace line | The card's line to the frame | A grey line (1.4) drawn from the card's lower edge to the pill | Card to pill |
| "AI'S FRAME" pill | Whose frame the bracket holds | Grey-band pill, grey outline, mono 13 grey "AI'S FRAME", apart from the goal's name | Large: above the bracket's top-left corner, (578, 157). Compact: right of the bracket's top, (528, 168) |
| The faculty's question | Frames faculty still have to ask about | Mono 13 ink "FACULTY ASK" over one dashed ink bracket, empty, with a centred Serif italic 28 "?" at 65% ink. Appears in beat 7, before any imagined answer, and stays empty; pulses once under the check | Large: (812, 240), 120 × 72, right of the list. Compact: (675, 186), in open space over the gap between the imagined columns 2 and 3 |
| Imagined heading | What the lower board is | Mono 13 ink "IMAGINED: ONE POSSIBLE SPREAD", above the goal labels | (340, Y + 4) |
| The AI's question card | The AI's challenge, once in words | A grey-band speech bubble pointing at the imagined papers: mono 13 grey "THE AI ASKS" over Serif italic 18 grey "What did you assume?" and "What else could it be?". Beat 9 only | x 350–668, y Y + 36 to Y + 130 |
| Speech bubbles | The AI's challenge on each imagined paper | A small grey-band speech bubble with two short grey bars, under the student's red line. Its shape, a bubble with a tail, differs from the outline's sheet. Stays | Inside each imagined paper |
| Problem lines (imagined) | Each imagined paper's problem statement | Serif 13 ink words, lifted from each paper's red line (red turning to ink), group by group, into their goal's column | Columns at x 352, 552, 762; baselines Y + 44 + 15k |
| Goal brackets | The goals faculty judge the imagined problems set | Navy brackets with mono 13 labels: "COUNTER THE RIVAL" (3 lines), "BACK THE PARTNER'S GOALS" (4), "SECURE WHAT WE NEED" (3) | Labels at (column + 8, Y + 22); brackets from Y + 28 |
| "ALL DRAFTED WITH AI" | Each run's disclosure | Grey mono 13, under the grid. Stays | Large: (40, 432). Compact: (24, Y + 176) |
| Sequence labels | The order each run worked in | Mono 13 under each name label: seminar "AI OUTLINE → WRITE" ("AI OUTLINE" grey, "WRITE" ink); imagined seminar "DEFINE PROBLEM → AI CHALLENGES → WRITE" ("DEFINE PROBLEM" red, "AI CHALLENGES" grey) | (24, Y + 28) |
| Caption band | The words for each beat | Real text under the picture: a mono counter ("3 / 11") and the caption in Serif 22 ink. In beat 11: mono 13 ink "FACULTY CHECK" over the check in Serif italic 30, then directly under it at the same size and style, "Line up each paper's problem, then ask what other frames the task could take." Fixed height on desktop | Under the stage |
| Beat list | Text equivalent and navigation | Eleven numbered captions with "On screen" lines (visible in reduced-motion, print and narrow views; always available to screen readers). The current beat has a navy rule | Under the controls |

**The problem lines.**

| Student | The seminar (all judged "counter the rival") | The same seminar, imagined | Imagined goal |
| --- | --- | --- | --- |
| 1 | Outbid rival lenders | Outbid rival lenders | Counter the rival |
| 2 | Block rival ports | Block rival ports | Counter the rival |
| 3 | Outshout their media | Outshout their media | Counter the rival |
| 4 | Undersell foreign arms | Ease its debts | Back the partner's goals |
| 5 | Win back trade | Grow export jobs | Back the partner's goals |
| 6 | Fund competing roads | Back fair elections | Back the partner's goals |
| 7 | Shadow foreign fleets | Keep port access | Secure what we need |
| 8 | Outspend their grants | Fund its plans | Back the partner's goals |
| 9 | Deny them mines | Secure mineral supplies | Secure what we need |
| 10 | Replace rival cables | Protect undersea cables | Secure what we need |

The first seminar's lines share a goal and not a word: "rival" appears in three, and "Win back trade" names no one. Faculty read each line and judge the goal.

**Laptop windows and narrow screens.** The ten different papers carry the figure without labels, so the picture stays whenever there is width for it. On laptop windows (at least 720 px wide and at most 860 px high) the caption band is compact (112 px; check and second line at 22 px, one line each) and the player's chrome allowance is 196 px, which leaves about 19 px of slack: the picture scales to fit with every label at 11 px or more (12.6 px at 1280 × 720, 11.1 px at 1366 × 657), and the caption band and controls are in view whenever the picture is. Between 480 px and laptop widths the legibility rule hides labels under 11 px and the beat list shows each beat's "On screen" line. Only a figure narrower than 480 px gets the stacked text stage, on the same clock, with text at 13–17 px:
- *Top:* the task and the context (the context folds away once the lineup starts), and a grey "AI" chip. The chip shows "Every AI outline opened with: Counter the rival's influence" in beats 6–8 and "The AI asks: What did you assume? What else could it be?" in beat 9, and pulses whenever a request or reply travels.
- *Each run:* a name and sequence line, one row of ten paper glyphs (24 × 31 px: blank, then grey outlines or red lines and grey bubbles, then ink layouts in three styles, with navy ticks), and "All drafted with AI". The glyph that is changing gets a navy outline for that moment, so the waves can be followed.
- *The first board:* "One frame: counter the rival", the grey "AI's frame" pill and, from beat 7, the dashed "?" on the same row, clear of the papers. Under it, the ten lines in two columns, each gaining a navy reading dot in beat 5. From beat 8 the lines fold away and the row stays.
- *The imagined board* (from beat 8): "Imagined: one possible spread", then from beat 10 three goal groups, each a label over its lines.
- Sections that arrive later stay `display: none` until they arrive, the stage holds its tallest moment, and with the check and controls it measures 834 px at 390 px wide.

## 4. Beats

Times are absolute seconds. In every beat the caption changes first (0.3 s fade) and nothing in the picture moves for the first second. A change the caption is about starts only after the caption can be read once, except a lead-in that the caption's first clause describes.

### Beat 1 · 0.0–11.0 s · A seminar, one task

- **On screen at the start:** an empty paper stage.
- **What moves:**
  1. 1.0–1.6: the task card fades in and rises 6 units at top right, showing the task.
  2. 1.7–2.9: ten blank papers fade in with their red dots, one at a time in reading order (0.1 s apart, 0.3 s each). "The seminar" fades in in red above the grid.
  3. 3.4–6.9: under a hairline on the task card, the context fades in one item at a time (0.75 s apart, 0.5 s each): our trade, its ports, its election, its minerals, a rival's loans.
  4. 6.9–11.0: hold.
- **Caption:** "Ten students in a seminar get the same task."
- **Notice:** ten red dots, ten blank papers, one task. The task asks for a strategy for a partnership and doesn't say what the problem is. Every context item has an owner.
- **Why:** the setup names the situation before anything goes wrong.

### Beat 2 · 11.0–19.0 s · The outlines come back alike

- **What moves:**
  1. 12.0–12.4: the AI panel fades in at top left: a grey box marked "AI".
  2. 12.4–13.9: each dot pulses, and a small ink mark travels from it up to the AI panel, one after another (0.1 s apart, 0.6 s each).
  3. 15.0–16.5: ten grey outlines drop from the AI panel into the ten papers, one after another (0.1 s apart, 0.6 s each), all in the same pattern, line for line.
  4. 16.5–19.0: hold.
- **Caption:** "Each asks an AI for an outline. The outlines come back alike."
- **Notice:** ten requests go up; ten identical outlines come back. What they say is held for beat 6.
- **Why:** similar systems, prompts and defaults, as an ordinary step, one movement at a time. The outlines start 4.0 s in.

### Beat 3 · 19.0–27.7 s · Their own papers

- **What moves:**
  1. 20.0–22.6: the dots write over their outlines, one after another (0.2 s apart, 0.8 s each). In each paper the grey drains to ink as it takes its own layout.
  2. 22.7–23.1: "ALL DRAFTED WITH AI" fades in under the grid, in grey.
  3. 24.0–26.2: a navy ring steps across the papers (0.2 s each), and each paper keeps a small navy ✓.
  4. 26.2–27.7: hold.
- **Caption:** "Each writes their own paper. Faculty read each one, and each holds up."
- **Notice:** ten papers that look nothing alike, each one passing when read on its own. The AI's help is disclosed.
- **Why:** the surface variety is real, and no paper or student is at fault. Faculty's reading starts 5.0 s in.

### Beat 4 · 27.7–41.0 s · Faculty line up the problems (the turn, part 1)

- **What moves:**
  1. 28.7–29.3: a light navy outline appears around each paper's first line.
  2. 30.7–37.7: one at a time (0.7 s apart, 0.7 s each), a copy of each paper's first line lifts out, grows into words and settles in a list at the right, in Serif 16 ink: "Outbid rival lenders", "Block rival ports", "Outshout their media", "Undersell foreign arms", "Win back trade", "Fund competing roads", "Shadow foreign fleets", "Outspend their grants", "Deny them mines", "Replace rival cables". Each paper keeps its own line and its tick.
  3. 37.7–41.0: hold.
- **Caption:** "Then faculty line up the problem each paper defines."
- **Notice:** the papers stay where they are, still ticked and still different. Only their problem statements move, into one list, each in its own words.
- **Why:** the faculty move and the mechanism at once: reading across the papers. The lines start 3.0 s in and arrive at about reading pace.

### Beat 5 · 41.0–48.0 s · One frame, judged

- **What moves:**
  1. 42.0–43.4: a navy reading mark appears at the start of each line in turn, top to bottom (0.12 s apart).
  2. 44.0–44.8: navy corner brackets joined by a hairline draw around the whole list, and "ONE FRAME: COUNTER THE RIVAL" fades in under it.
  3. 44.8–48.0: hold.
- **Caption:** "Different words, one frame: each paper counters the rival."
- **Notice:** the lines share no single word. Faculty read each one and judge that all ten set the same goal.
- **Why:** the common assumption at the level of problem definition, found by judgment. The bracket starts 3.0 s in.

### Beat 6 · 48.0–54.5 s · The AI's frame (the turn, part 2)

- **What moves:**
  1. 49.0–49.8: a grey card grows out of the AI panel into the open space between the panel and the task card: "EVERY AI OUTLINE OPENED WITH" over "Counter the rival's influence".
  2. 50.5–51.3: together: a grey line draws from the card to the bracket, the bracket turns grey, and the grey "AI'S FRAME" pill appears above its top-left corner, where the line lands.
  3. 51.3–54.5: hold.
- **Caption:** "Every AI outline opened with that frame."
- **Notice:** the goal every student wrote, in their own words, is the line every outline opened with. This is the first time the outlines' words are shown.
- **Why:** the origin, shown after the pattern faculty can see. The card is the lead-in; the line, bracket and pill change together 2.5 s in.

### Beat 7 · 54.5–60.5 s · Faculty ask

- **What moves:**
  1. 57.5–58.1: in the open space right of the bracket, "FACULTY ASK" appears over a dashed, empty bracket with a "?".
  2. 58.1–60.5: hold.
- **Caption:** "Faculty ask what other frames the task could take."
- **Notice:** lining up showed one frame; it can't show what's missing. The question is the faculty's, and nothing fills it.
- **Why:** the move that works in a real seminar, placed before any imagined answer. The question appears 3.0 s in.

### Beat 8 · 60.5–68.3 s · Imagine the essay's proposal

- **What moves:**
  1. 61.5–62.7: the seminar moves into the upper half, shrinks and dims to 35%: the papers to 55% with their ticks, the list to Serif 13 in a column under "COUNTER THE RIVAL" with "ONE FRAME" above, the pill beside the bracket, the AI's card above the board at 75% with its line still running to the pill, and the faculty's question in open space to the right. "The seminar" and "AI OUTLINE → WRITE" settle at its top left. The AI panel shrinks to 40 high.
  2. 62.8–63.4: the imagined seminar fades in below a hairline: "The same seminar, imagined", ten red dots and ten blank papers, and the heading "IMAGINED: ONE POSSIBLE SPREAD" at the board's top.
  3. 64.8–66.3: each dot writes a short red line at the top of its blank paper, one after another (0.1 s apart, 0.6 s each). "DEFINE PROBLEM" appears in red as the start of its sequence label.
  4. 66.3–68.3: hold.
- **Caption:** "Imagine the essay's proposal: each student defines the problem first."
- **Notice:** the same ten students, task and context. Each writes their own problem first, in red, before any AI help. The first seminar waits, dimmed, with its question still open.
- **Why:** the first half of the change, framed as a proposal to imagine. The red lines start 4.3 s in.

### Beat 9 · 68.3–77.0 s · The AI challenges each frame

- **What moves:**
  1. 69.3–70.3: a small red copy of each student's line rises to the AI panel, one after another (0.06 s apart, 0.5 s each).
  2. 71.8–72.4: a grey speech bubble appears in the imagined board, pointing at the papers: "THE AI ASKS" over "What did you assume?" and "What else could it be?".
  3. 72.1–73.5: small grey speech bubbles drop from the AI panel into each paper, under its red line (0.1 s apart, 0.5 s each). "→ AI CHALLENGES" appears in grey.
  4. 73.7–74.9: the dots write. Each paper takes a layout from the same ten kinds, in a different order, and keeps its red line and its bubble. "→ WRITE" appears, then "ALL DRAFTED WITH AI".
  5. 74.9–77.0: hold.
- **Caption:** "Then each asks the AI to challenge it, and writes."
- **Notice:** the AI is still in the work, and its reply looks different from beat 2's outline: questions in a speech bubble, aimed at the student's own problem.
- **Why:** the essay's pilot step two, in a picture of its own. The question card arrives 3.5 s in.

### Beat 10 · 77.0–90.7 s · Lined up the same way

- **What moves:**
  1. 78.0–79.2: together: the AI's question card fades, the first seminar returns to full strength, and a navy ring sweeps across the imagined papers (0.1 s each), leaving a ✓ on each.
  2. 81.0–82.0: three of the imagined papers' red lines (students 1–3) lift out and grow into ink words in the first column: "Outbid rival lenders", "Block rival ports", "Outshout their media". "COUNTER THE RIVAL" fades in above them.
  3. 82.2–83.2: four more lift into the second column: "Ease its debts", "Grow export jobs", "Back fair elections", "Fund its plans". "BACK THE PARTNER'S GOALS" fades in.
  4. 83.4–84.4: the last three lift into the third column: "Keep port access", "Secure mineral supplies", "Protect undersea cables". "SECURE WHAT WE NEED" fades in.
  5. 84.6–85.4: navy brackets draw around the three groups.
  6. 85.4–90.7: hold.
- **Caption:** "These papers hold up too. Faculty line them up the same way."
- **Notice:** both grids look equally varied and every paper is ticked. Lined up, the imagined problems read as three goals, the AI's among them, under a heading that says this is one imagined spread.
- **Why:** the contrast, readable in words and kept honest. The groups start 4.0 s in, one group at a time; the hold is for reading the lines.

### Beat 11 · 90.7–97.7 s · The faculty check

- **What moves:**
  1. 90.7–90.9: caption 10 fades out.
  2. 90.9–91.5: the faculty check rises into the caption band: "FACULTY CHECK" in navy mono, then the question in large italic.
  3. 93.7–94.5: directly under the check, at the same size, "Line up each paper's problem, then ask what other frames the task could take.", and the faculty's dashed "?" beside the first seminar's frame pulses once. It stays empty.
  4. 94.5–97.7: hold. At 97.7 the player shows Replay and the figure rests on this frame.
- **Caption:** "Faculty check: What frames are missing across the seminar?" Second line, same size: "Line up each paper's problem, then ask what other frames the task could take."
- **Notice:** the second line names the two moves the first seminar showed: lining up, then asking. The question box stays open.
- **Why:** the figure ends on the check and a move an educator can run in one seminar. The second line appears 3.0 s in, once the check can be read.

## 5. Final frame

The still at 97.7 s. It is also the reduced-motion view, the print view and the poster (stage plus caption band).

**Stage:**
- **Top left:** the grey AI panel, marked "AI".
- **Top centre:** the AI's grey card, "EVERY AI OUTLINE OPENED WITH" over "Counter the rival's influence", with a grey line down to the first seminar's "AI'S FRAME" pill.
- **Top right:** the task card: "EXAMPLE TASK" over "Recommend a strategy for our partnership with Country A.", then "Our trade, its ports, its election, its minerals, a rival's loans."
- **Upper block:** red "The seminar" over "AI OUTLINE → WRITE" ("AI OUTLINE" grey). Ten small papers in ten different layouts, each with a red dot, an ink first line and a navy tick; "ALL DRAFTED WITH AI". At right, under "ONE FRAME" and "COUNTER THE RIVAL": a grey bracket around ten ink lines, "Outbid rival lenders" through "Replace rival cables", with the grey "AI'S FRAME" pill beside its top. In the open space to its right, "FACULTY ASK" over a dashed, empty bracket with a "?".
- **Lower block:** red "The same seminar, imagined" over "DEFINE PROBLEM → AI CHALLENGES → WRITE". Ten small papers, just as varied, each with a red dot, a red first line, a small grey speech bubble and a navy tick; "ALL DRAFTED WITH AI". At right, under "IMAGINED: ONE POSSIBLE SPREAD", three navy brackets of ink lines: "COUNTER THE RIVAL" (outbid rival lenders, block rival ports, outshout their media), "BACK THE PARTNER'S GOALS" (ease its debts, grow export jobs, back fair elections, fund its plans) and "SECURE WHAT WE NEED" (keep port access, secure mineral supplies, protect undersea cables).

**Caption band:**

> FACULTY CHECK *(navy mono)*
> *What frames are missing across the seminar?* *(Serif italic, about 30 px)*
> *Line up each paper's problem, then ask what other frames the task could take.* *(Serif italic, same size as the line above)*

**In the reduced-motion and print views,** all eleven captions and their "On screen" lines are readable below the controls. Clicking a beat shows its settled still.

**At 390 px** the final frame is the stacked text stage: the task, the AI chip, the first seminar's glyphs with its frame row ("One frame: counter the rival", the "AI's frame" pill and the dashed "?"), the imagined seminar's glyphs with its heading and three goal groups, then the check and the controls.

**What the still says alone:** ten students with the same AI wrote papers that all passed and look nothing alike. In the seminar, ten differently worded problems sit in one grey bracket marked as the AI's frame, the frame every AI outline opened with; beside it, the faculty's question stays an empty dashed box. Below, set apart and headed as imagined, the same students define the problem first and have the AI challenge it, and their problems spread across three goals, one possible spread. The lines under the picture say how to look: line up the problems, then ask what other frames the task could take.

## 6. Standalone page copy

**Title:** Institutional monoculture

**Kicker:** Failure mode 6 of 7

**Setup:**

Ten students in a seminar each use an AI to help write the same strategy paper. Each writes their own, and each paper holds up when read alone. *The Irreducible Officer* calls what can still go wrong institutional monoculture: shared systems and defaults narrow the range of frames available to the class. The seminar, the task and the papers are a constructed example.

**Figure summary** (visually hidden, for screen readers): An animated figure. Ten red dots stand for ten students in a seminar with an example task: recommend a strategy for our partnership with Country A. The context lists our trade, its ports, its election, its minerals and a rival's loans. Each student asks an AI for an outline, and ten grey outlines come back in the same pattern. Each student writes their own paper, in ten different layouts, all marked "All drafted with AI". Faculty read each paper and tick it, and the ticks stay. Then faculty line up the one-line problem statement from every paper: outbid rival lenders, block rival ports, outshout their media, undersell foreign arms, win back trade, fund competing roads, shadow foreign fleets, outspend their grants, deny them mines, replace rival cables. Faculty read each line, and a bracket closes around all ten, labelled "One frame: counter the rival". A grey card comes out of the AI box: every AI outline opened with "Counter the rival's influence". A grey line runs from it to the bracket, which turns grey, with a grey tag: "AI's frame". Faculty then ask what other frames the task could take: a dashed, empty box with a question mark appears beside the bracket and stays empty. Next, while the first seminar dims above, the figure imagines the same seminar the way the essay proposes, under the heading "Imagined: one possible spread". Each student writes the problem in red first, then asks the AI to challenge it ("What did you assume? What else could it be?"), and a grey speech bubble lands on each paper before they write. Faculty tick these papers too and line up their problems: counter the rival (outbid rival lenders, block rival ports, outshout their media); back the partner's goals (ease its debts, grow export jobs, back fair elections, fund its plans); secure what we need (keep port access, secure mineral supplies, protect undersea cables). The figure ends on the faculty check. Each beat is listed below with what is on screen.

**Beat list (text equivalent):**

1. **Ten students in a seminar get the same task.** *On screen:* a task card appears at the top right: "Example task. Recommend a strategy for our partnership with Country A." Ten blank papers appear in two rows of five, each with a red dot, labelled "The seminar". Under a line on the card, the context appears one item at a time: our trade, its ports, its election, its minerals, a rival's loans.
2. **Each asks an AI for an outline. The outlines come back alike.** *On screen:* a grey box marked AI appears at the top left. A small mark travels from each red dot up to it, and ten grey outlines drop back into the papers, all in the same pattern.
3. **Each writes their own paper. Faculty read each one, and each holds up.** *On screen:* each dot writes over its outline, and each paper turns to ink in its own layout: headings, bullets, a chart, a table, dense text, two columns, a numbered list, a pull quote, a timeline, a map. "All drafted with AI" appears under them. A navy ring steps across the papers and leaves a tick on each.
4. **Then faculty line up the problem each paper defines.** *On screen:* each paper's first line is outlined, then lifts out and joins a list at the right: outbid rival lenders, block rival ports, outshout their media, undersell foreign arms, win back trade, fund competing roads, shadow foreign fleets, outspend their grants, deny them mines, replace rival cables. The papers stay where they are, ticked.
5. **Different words, one frame: each paper counters the rival.** *On screen:* a navy mark appears beside each line in turn as faculty read it. Then a bracket closes around all ten, labelled "One frame: counter the rival".
6. **Every AI outline opened with that frame.** *On screen:* a grey card comes out of the AI box: "Every AI outline opened with: Counter the rival's influence". A grey line runs from it to the bracket, which turns grey, and a grey tag beside the bracket reads "AI's frame".
7. **Faculty ask what other frames the task could take.** *On screen:* beside the bracket, in open space, a dashed, empty box with a question mark appears, labelled "Faculty ask". Nothing fills it.
8. **Imagine the essay's proposal: each student defines the problem first.** *On screen:* the first seminar moves to the upper half and dims, labelled "The seminar: AI outline, write", with the grey card above its list and the question box beside it. Below a line, "The same seminar, imagined" appears with ten blank papers and the heading "Imagined: one possible spread". Each dot writes a red first line, and the label begins "Define problem".
9. **Then each asks the AI to challenge it, and writes.** *On screen:* a copy of each red line goes up to the AI box. A grey speech bubble appears: "The AI asks: What did you assume? What else could it be?", and small grey speech bubbles land on each paper under its red line. Each dot writes its paper. The label now reads "Define problem, AI challenges, write", and the papers are marked "All drafted with AI".
10. **These papers hold up too. Faculty line them up the same way.** *On screen:* the speech bubble fades, the first seminar returns to full strength, and a navy ring ticks each imagined paper. Group by group, their problem lines lift out as words into three labelled columns: counter the rival (outbid rival lenders, block rival ports, outshout their media); back the partner's goals (ease its debts, grow export jobs, back fair elections, fund its plans); secure what we need (keep port access, secure mineral supplies, protect undersea cables). Brackets close around them.
11. **Faculty check: What frames are missing across the seminar? Line up each paper's problem, then ask what other frames the task could take.** *On screen:* the questions appear under the picture at the same size, and the dashed question box beside the first seminar's frame pulses once. It stays empty.

**Faculty check:** What frames are missing across the seminar?
**Line up each paper's problem, then ask what other frames the task could take.** (same size)

Read one at a time, every paper in the seminar holds up, and the papers look nothing alike. Lined up, they share one problem definition, the one every AI outline opened with. Lining up shows which frames a seminar has. It can't show which are missing. For that, faculty ask what other frames the task could take, and answer from their own knowledge of the problem or let the class name them before discussion settles on one. The figure's imagined seminar follows the essay's proposal for a framing assignment: each student writes a problem frame without AI, then asks an AI to find assumptions they missed and suggest other frames (Section IX, steps one and two). The essay proposes framing first; whether it spreads frames across a seminar is untested, and the imagined board is one possible spread. Lining up the problems across a seminar is this figure's way of applying the essay's per-student frame evidence (Section VIII) to a class. The companion's failure-mode lab adds a fair objection: convergence can reflect a justified shared purpose or strong evidence, and difference isn't better by itself. A seminar can compare several frames and still agree on one.

**About the example.** Each paper's first line stands for the frame evidence the essay asks students to name before submitting (Section VIII), which the essay describes as a short page: the problem frame, key assumptions, criteria for success, evidence standard and the role AI played. The figure groups problems by the goal they set, and names three goals for the imagined seminar as one possible spread. Telling real frames apart takes reading, and, as the lab notes, authored examples don't show the output of any model or actual class.

**From the essay** (*The Irreducible Officer*, Section II, What the Problem Looks Like):

> **Institutional monoculture** is the class-level version of the same problem. When many students use similar systems, similar prompts, and similar defaults, the range of strategic frames available to a seminar narrows. AI can create a surface appearance of diversity (different arguments, different structures, different evidence) while reproducing common assumptions at the level of problem definition. Research into the diversity of AI-generated ideas finds that language models aggregate knowledge into a unified distribution in ways that human cognition does not: people exhibit knowledge partitioning, each occupying a distinct semantic region, in ways that independent AI samples do not replicate ([Deng, Brucks & Toubia, 2026](https://arxiv.org/abs/2602.20408)). Post-training alignment compounds this further, compressing the distribution of outputs toward the statistical center ([Murthy, Ullman & Hu, 2024](https://arxiv.org/abs/2411.04427)). Pedagogical research on LLM integration in higher education frames this compression as epistemic narrowing: the constraining of students' exposure to diverse, ambiguous, or contested knowledge by tools optimized for convergence and fluency ([Vendrell & Johnston, 2026](https://doi.org/10.1016/j.caeai.2026.100572)). In a war college seminar, that compression raises a serious possibility: the same systems that help students produce stronger work may also narrow the range of strategic imagination the seminar is meant to develop.

**The evidence.** The essay cites three sources for this failure mode: Deng, Brucks & Toubia (2026) on language models aggregating knowledge where people partition it; Murthy, Ullman & Hu (2024) on alignment compressing outputs toward the statistical center; and Vendrell & Johnston (2026). "Epistemic narrowing" is the essay's term, describing Vendrell & Johnston; the companion's source notes cite that paper for its advice on sequencing AI-free and AI-assisted work. Studies the essay doesn't cite bear on this too, within limits:
- Romasanta, Thomas & Levina (HBR, 2026) report that across thousands of simulations, leading models gave the same trendy strategy advice regardless of context, defaulting to options such as differentiation, augmentation and collaboration. It is the closest of these to strategy work. It is a practitioner article, and its methods are visible only through the authors' summary.
- Doshi & Hauser (Science Advances, 2024) found that AI story ideas made individual stories better rated and made the stories more similar to one another. It measured stories, not strategies.
- Kim, Garg, Peng & Garg (ICML, 2025) and Jiang et al. (NeurIPS, 2025) found that when two models both get a question wrong they usually give the same wrong answer, and that different vendors give strikingly similar open-ended answers. Asking a second model is not an independent check.
- Counter-evidence: Terwiesch et al. (Production and Operations Management, 2026) found that better prompting, assigned personas and pooling several vendors brought the diversity of AI-generated ideas close to human levels. The companion's source notes read this as sameness being the default, with deliberate design needed to escape it. The study is about prompting AI for ideas; it doesn't test a seminar or the essay's pilot.

**Links:**
- Book chapter: Refuse the garden path → `../../book-v0/four-moves-book.html?spread=4`
- In the same chapter: Premature synthesis → `../premature-synthesis/`
- Practice: test institutional monoculture with your AI assistant → `https://judgmentlab.net/#companion`
- Essay: Section II, What the Problem Looks Like → `https://judgmentlab.net/#ii-what-the-problem-looks-like`
- Essay: Section IX, A Foundation Pilot → `https://judgmentlab.net/#ix-a-foundation-pilot`

## 7. Pacing table

Reading time is caption words ÷ 3. The beat total is lead + motion + hold, and every total is at least twice the caption's reading time. Picture words are new words inside the picture; labels and lines already shown aren't counted again. The reading budget is caption plus picture words divided by the beat's length, and stays at 3 words a second or less. Lead is the time before the first movement; motion runs from the first movement to the last, including any pause for reading inside it.

| Beat | Time (s) | Caption words | Reading (s) | 2× (s) | Picture words | Budget (words/s) | Lead (s) | Motion (s) | Hold (s) | Total (s) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · A seminar, one task | 0.0–11.0 | 9 | 3.0 | 6.0 | 24 | 3.0 | 1.0 | 5.9 | 4.1 | 11.0 |
| 2 · The outlines come back alike | 11.0–19.0 | 12 | 4.0 | 8.0 | 1 | 1.6 | 1.0 | 4.5 | 2.5 | 8.0 |
| 3 · Their own papers | 19.0–27.7 | 13 | 4.3 | 8.7 | 4 | 2.0 | 1.0 | 6.2 | 1.5 | 8.7 |
| 4 · Faculty line up the problems | 27.7–41.0 | 9 | 3.0 | 6.0 | 30 | 2.9 | 1.0 | 9.0 | 3.3 | 13.3 |
| 5 · One frame, judged | 41.0–48.0 | 9 | 3.0 | 6.0 | 5 | 2.0 | 1.0 | 2.8 | 3.2 | 7.0 |
| 6 · The AI's frame | 48.0–54.5 | 7 | 2.3 | 4.7 | 11 | 2.8 | 1.0 | 2.3 | 3.2 | 6.5 |
| 7 · Faculty ask | 54.5–60.5 | 9 | 3.0 | 6.0 | 2 | 1.8 | 3.0 | 0.6 | 2.4 | 6.0 |
| 8 · Imagine the essay's proposal | 60.5–68.3 | 10 | 3.3 | 6.7 | 13 | 2.9 | 1.0 | 4.8 | 2.0 | 7.8 |
| 9 · The AI challenges each frame | 68.3–77.0 | 10 | 3.3 | 6.7 | 14 | 2.8 | 1.0 | 5.6 | 2.1 | 8.7 |
| 10 · Lined up the same way | 77.0–90.7 | 12 | 4.0 | 8.0 | 29 | 3.0 | 1.0 | 7.4 | 5.3 | 13.7 |
| 11 · Faculty check | 90.7–97.7 | 7 + 14 second line | 2.3 + 4.7 | 4.7 (check) | 0 | 3.0 | 0.0 | 3.8 | 3.2 | 7.0, then rests |
| **Total** | | **121** | **40.3** | | **133** | | **12.0** | **52.9** | **32.8** | **97.7** |

Checks:
- One idea per beat; movements run one after another. A row of ten (dots, requests, outlines, bubbles, papers, ticks, lines) runs as one staggered movement.
- Changes a caption names wait until it can be read once: the outlines (beat 2, 4.0 s in), faculty's reading (beat 3, 5.0 s), the problem lines (beat 4, 3.0 s), the bracket (beat 5, 3.0 s), the trace line, grey bracket and pill (beat 6, 2.5 s), the faculty's question (beat 7, 3.0 s), the red lines (beat 8, 4.3 s), the AI's question card (beat 9, 3.5 s), the groups (beat 10, 4.0 s), and the second line under the check (beat 11, 3.0 s).
- Lead-ins the caption's first clause describes start early: the requests (beat 2), the writing (beat 3), the first-line outlines (beat 4), the reading marks (beat 5), the AI's card (beat 6), the block move and the imagined seminar's arrival (beat 8), the red copies going up (beat 9), and the ticks on the imagined papers (beat 10).
- Problem lines arrive at about reading pace: ten lines of three words in 7.0 s in beat 4. The imagined groups arrive one group at a time, with a 5.3 s hold for reading them.
- Every hold is at least 1.5 s. Beat 7 has no movement until its question, which is the event its caption names.
- No camera moves. The first seminar moves once and dims (beat 8), then returns (beat 10). Reduced motion shows the final frame.
- Total 97.7 s, over the 80–90 s guide: figure cold read 2 asked for the faculty's question as its own beat and for the imagined problems in words, which together add about 8 s.
