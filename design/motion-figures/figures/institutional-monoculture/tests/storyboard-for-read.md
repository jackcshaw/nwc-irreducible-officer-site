# Institutional monoculture: storyboard

Motion figure 6 of 8 · slug `institutional-monoculture` · storyboard round 5, revised after figure cold read 2 · October 28, 2026

*Cold-read copy. The Intent section is removed.*

## 2. Scenario

A war-college seminar of ten students gets one open task: recommend a strategy for partner Country A. The context lists our trade, its ports, election and minerals, and a rival's loans. Each student asks an AI for an outline, and the outlines come back alike. Each student writes their own paper, with different evidence, structure and layout, and faculty find that each one holds up. Lined up, the papers' one-line problems are worded differently ("Outbid rival lenders", "Win back trade", "Deny them mines"), and faculty judge that every one sets the same goal: counter the rival. Every AI outline had opened with that frame. Faculty then ask what other frames the task could take, and the question stays open. Last, the figure imagines the seminar working the way the essay proposes: each student defines the problem first, then asks the AI to challenge it. Those papers hold up too, and in this one imagined spread their problems fall under three goals: counter the rival, back the partner, and secure our needs.

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
| Task card | The assignment and its context | Paper-bright card, hairline ink border (15%). Mono 13 "EXAMPLE TASK", then Serif 15 ink over two lines: "Recommend a strategy for / partner Country A." A hairline, then Serif 13.5 ink on two lines: "Our trade, its ports, election, / minerals, a rival's loans." Stays throughout | x 670–936, y 16–138 |
| AI panel | The AI tools the students use | Rounded box, grey stroke 1.5, grey-band fill at 40%. Mono 13 grey "AI". Shrinks to 40 high in beat 8. Stays throughout | x 24–300, y 16–100 |
| Red dots | The students | Solid red circles, radius 5 (large) or 3 (compact), one at each paper's top-left corner. Pulse to ask; move a little over the paper to write | (x − 2, y − 2) for each paper |
| Name labels | Name each run's students | Red Sans 600 13: "The seminar" (beat 1); "Same seminar, imagined" (beat 8) | Large: (40, 138). Compact: (24, Y + 12) |
| Papers | Each student's work | Paper-bright sheets, hairline border, soft shadow. Blank at first; then a grey outline (first seminar) or a red first line and a grey speech bubble (imagined seminar); then the student's own layout in ink. Ten layouts: headings with rows; bullets; a bar chart; a table; dense text; two columns; a numbered list; a pull quote; a timeline; a small map. Each paper's first line is its one-line problem statement, drawn as a short bar (ink in the seminar; red in the imagined seminar) | Large: 80 × 104 in a 5 × 2 grid, columns at x 40, 140, 240, 340, 440; rows y 164–268 and 300–404. Compact: 44 × 57, columns at x 24, 80, 136, 192, 248; rows Y + 38 and Y + 102 |
| Ticks | Faculty found the paper holds up | A small navy ✓ inside each paper's top-right corner. Stays to the end | Each paper |
| Faculty ring | Faculty reading each paper | A navy rounded outline that steps from paper to paper | Over a grid |
| Request marks | A student asking the AI | Small ink dots (radius 3.6) that travel from each student's dot to the AI panel and fade as they arrive | Dot to panel's lower edge |
| Outlines | What the AI sends back to the first seminar | Grey sheets on the grey band: three heading bars with two rows each, the same pattern line for line in all ten | Fly from the panel into each paper |
| First-line marks | Faculty picking out each paper's problem | A light navy outline around each paper's first line, in beat 4 only | Each large paper |
| Problem lines (first seminar) | Each paper's problem statement, as faculty read it | Serif 16 ink in the large board, baselines 204 + 26k; Serif 13 ink in the compact column, baselines Y + 36 + 15k. Each is a copy lifted from its paper; the paper keeps its own line. Worded differently; only three contain "rival" | Large: x 600. Compact: x 350 |
| Reading marks | Faculty reading each line before judging | A small navy dot at the start of each line, appearing in turn in beat 5; gone after beat 7 | 9 units left of each large line |
| Frame bracket (first seminar) | The goal faculty judge all ten share | Corner brackets joined by a hairline (frame convention), navy, labelled mono 13 "ONE FRAME: COUNTER THE RIVAL" under it. Turns grey in beat 6; the label stays navy. Compact: "ONE FRAME" above, then "COUNTER THE RIVAL" at the column's top | Large: x 578–800, y 184–448, label at (578, 470). Compact: x 340–520, from Y + 24 |
| The AI's card | Where the shared frame came from | A grey-band card, 300 × 70, grey outline: mono 13 grey "EVERY OUTLINE OPENED" over Serif 18 grey on a grey band, "Counter the rival's influence". Grows out of the AI panel in beat 6; in beat 8 it moves above the first seminar's board at full size (so its label stays at 11 px or more) and dims with it | Large: x 330–630, y 22–92. Compact: x 340–640, y 64–134 |
| Trace line | The card's line to the frame | A grey line (1.4) drawn from the card's lower edge to the pill | Card to pill |
| "AI'S FRAME" pill | Whose frame the bracket holds | Grey-band pill, grey outline, mono 13 grey "AI'S FRAME", apart from the goal's name | Large: above the bracket's top-left corner, (578, 157). Compact: right of the bracket's top, (528, 168) |
| The faculty's question | Frames faculty still have to ask about | Mono 13 ink "FACULTY ASK" over one dashed ink bracket, empty, with a centred Serif italic 28 "?" at 65% ink. Appears in beat 7, before any imagined answer, and stays empty; pulses once under the check | Large: (812, 240), 120 × 72, right of the list. Compact: (675, 186), in open space over the gap between the imagined columns 2 and 3 |
| Imagined heading | What the lower board is | Mono 13 ink "ONE IMAGINED SPREAD", above the goal labels | (348, Y + 4) |
| The AI's question card | The AI's challenge, once in words | A grey-band speech bubble pointing at the imagined papers: Serif italic 18 grey "What did you assume?" over "What else could it be?". Beat 9 only | x 350–648, y Y + 36 to Y + 112 |
| Speech bubbles | The AI's challenge on each imagined paper | A small grey-band speech bubble with two short grey bars, under the student's red line. Its shape, a bubble with a tail, differs from the outline's sheet. Stays | Inside each imagined paper |
| Problem lines (imagined) | Each imagined paper's problem statement | Serif 13 ink words, lifted from each paper's red line (red turning to ink), group by group, into their goal's column | Columns at x 352, 552, 762; baselines Y + 44 + 15k |
| Goal brackets | The goals faculty judge the imagined problems set | Navy brackets with mono 13 labels: "COUNTER THE RIVAL" (3 lines), "BACK THE PARTNER" (4), "SECURE OUR NEEDS" (3) | Labels at (column + 8, Y + 22); brackets from Y + 28 |
| "ALL DRAFTED WITH AI" | Each run's disclosure | Grey mono 13, under the grid. Stays | Large: (40, 432). Compact: (24, Y + 176) |
| Sequence labels | The order each run worked in | Mono 13: seminar "AI OUTLINE → WRITE" ("AI OUTLINE" grey, "WRITE" ink), beside "The seminar" from beat 3 and under it from beat 8; imagined seminar "DEFINE PROBLEM → AI CHALLENGES → WRITE" ("DEFINE PROBLEM" red, "AI CHALLENGES" grey) | (24, Y + 28) |
| Name card (beat 0) | Which failure mode this is | Drawn by the runtime: "FAILURE MODE 6 OF 7" (mono 13, muted) over "Institutional monoculture" (Serif 600, about 52 px), centred over the stage on a paper scrim for 2 s, then moving and shrinking into the plate over 1 s. The caption band stays quiet. Before play, the waiting view shows the card over the poster (beat 3 settled) | Centre of the stage, then the plate |
| Plate | The name, throughout | "INSTITUTIONAL MONOCULTURE · 6 OF 7", mono 12 ink, in a 23 px strip above the stage's top-left corner, in every beat and view (drawn stage, stacked stage, reduced motion, print, stills, video). It never covers the picture | Above the stage |
| Caption band | The words for each beat | Real text under the picture: a mono counter ("3 / 11") and the caption in Serif 22 ink. In beat 11 the runtime sets the name ("INSTITUTIONAL MONOCULTURE", mono 13) beside the definition ("Shared systems and defaults narrow the range of frames a group considers."), then "FACULTY CHECK" beside the check in Serif italic, with "Line up each paper's problem, then ask what other frames the task could take." directly under it at the same size and style. Fixed heights: 176 px (tall desktop), 92 px (laptop windows), 220 px (phones) | Under the stage |
| Beat list | Text equivalent and navigation | Eleven numbered captions with "On screen" lines (visible in reduced-motion, print and narrow views; always available to screen readers). The current beat has a navy rule | Under the controls |

**The problem lines.**

| Student | The seminar (all judged "counter the rival") | The same seminar, imagined | Imagined goal |
| --- | --- | --- | --- |
| 1 | Outbid rival lenders | Outbid rival lenders | Counter the rival |
| 2 | Block rival ports | Block rival ports | Counter the rival |
| 3 | Outshout their media | Outshout their media | Counter the rival |
| 4 | Undersell foreign arms | Ease its debts | Back the partner |
| 5 | Win back trade | Grow export jobs | Back the partner |
| 6 | Fund competing roads | Back fair elections | Back the partner |
| 7 | Shadow foreign fleets | Keep port access | Secure our needs |
| 8 | Outspend their grants | Fund its plans | Back the partner |
| 9 | Deny them mines | Secure mineral supplies | Secure our needs |
| 10 | Replace rival cables | Protect undersea cables | Secure our needs |

The first seminar's lines share a goal and not a word: "rival" appears in three, and "Win back trade" names no one. Faculty read each line and judge the goal.

**Laptop windows and narrow screens.** The ten different papers carry the figure without labels, so the picture stays whenever there is width for it. On laptop windows (at least 720 px wide and at most 860 px high) the caption band is compact (112 px; check and second line at 22 px, one line each) and the player's chrome allowance is 196 px, which leaves about 19 px of slack: the picture scales to fit with every label at 11 px or more (12.6 px at 1280 × 720, 11.1 px at 1366 × 657), and the caption band and controls are in view whenever the picture is. Between 480 px and laptop widths the legibility rule hides labels under 11 px and the beat list shows each beat's "On screen" line. Only a figure narrower than 480 px gets the stacked text stage, on the same clock, with text at 13–17 px:
- *Top:* the task and the context (the context folds away once the lineup starts), and a grey "AI" chip. The chip shows "Every AI outline opened with: Counter the rival's influence" in beats 6–8 and "The AI asks: What did you assume? What else could it be?" in beat 9, and pulses whenever a request or reply travels.
- *Each run:* a name and sequence line, one row of ten paper glyphs (24 × 31 px: blank, then grey outlines or red lines and grey bubbles, then ink layouts in three styles, with navy ticks), and "All drafted with AI". The glyph that is changing gets a navy outline for that moment, so the waves can be followed.
- *The first board:* "One frame: counter the rival", the grey "AI's frame" pill and, from beat 7, the dashed "?" on the same row, clear of the papers. Under it, the ten lines in two columns, each gaining a navy reading dot in beat 5. From beat 8 the lines fold away and the row stays.
- *The imagined board* (from beat 8): "One imagined spread", then from beat 10 three goal groups, each a label over its lines.
- Sections that arrive later stay `display: none` until they arrive, the stage holds its tallest moment, and with the check and controls it measures 834 px at 390 px wide.

## 4. Beats

Times below are the figure's own clock. The player adds the runtime's 3.0 s name card in front (beat 0), so player time is 3.0 s later. In every beat the caption changes first (0.3 s fade) and nothing in the picture moves for the first second. A change the caption is about starts only after the caption can be read once, except a lead-in that the caption's first clause describes. Every beat lasts at least (caption words + new picture words) ÷ 3 + 1.5 s (section 7).

### Beat 0 · player 0.0–3.0 s · The name card

- **On screen:** "Institutional monoculture", with "FAILURE MODE 6 OF 7" above it, large and centred over an empty stage for 2 s; over 1 s it moves and shrinks into the plate above the stage's top-left corner, where it stays. Drawn by the runtime.
- **Caption:** none; the caption band stays quiet.
- **Notice:** the figure names the failure mode before anything happens.
- **Why:** Jack's standard for all eight figures, so the viewer always knows which named failure mode is on screen.

### Beat 1 · 0.0–10.9 s · A seminar, one task

- **On screen at the start:** an empty paper stage.
- **What moves:**
  1. 1.0–1.6: the task card fades in and rises 6 units at top right, showing the task.
  2. 1.7–2.9: ten blank papers fade in with their red dots, one at a time in reading order (0.1 s apart, 0.3 s each). "The seminar" fades in in red above the grid.
  3. 3.4–6.9: under a hairline on the task card, the context fades in one item at a time (0.75 s apart, 0.5 s each): our trade, its ports, election, minerals, a rival's loans.
  4. 6.9–10.9: hold.
- **Caption:** "Ten students in a seminar get one task."
- **Notice:** ten red dots, ten blank papers, one task. The task asks for a strategy for a partner and doesn't say what the problem is. Every context item has an owner.
- **Why:** the setup names the situation before anything goes wrong.

### Beat 2 · 10.9–18.3 s · The outlines come back alike

- **What moves:**
  1. 11.9–12.3: the AI panel fades in at top left: a grey box marked "AI".
  2. 12.3–13.8: each dot pulses, and a small ink mark travels from it up to the AI panel, one after another (0.1 s apart, 0.6 s each).
  3. 14.6–16.1: ten grey outlines drop from the AI panel into the ten papers, one after another (0.1 s apart, 0.6 s each), all in the same pattern, line for line.
  4. 16.1–18.3: hold.
- **Caption:** "Each asks an AI for an outline. They come back alike."
- **Notice:** ten requests go up; ten identical outlines come back. What they say is held for beat 6.
- **Why:** similar systems, prompts and defaults, as an ordinary step, one movement at a time. The outlines start 3.7 s in.

### Beat 3 · 18.3–26.3 s · Their own papers

- **What moves:**
  1. 19.3–21.9: the dots write over their outlines, one after another (0.2 s apart, 0.8 s each). In each paper the grey drains to ink as it takes its own layout.
  2. 22.0–22.4: "ALL DRAFTED WITH AI" fades in under the grid, and "AI OUTLINE → WRITE" beside "The seminar".
  3. 22.3–24.4: a navy ring steps across the papers (0.2 s each), and each paper keeps a small navy ✓.
  4. 24.4–26.3: hold.
- **Caption:** "Each writes their own paper. Each holds up when faculty read it."
- **Notice:** ten papers that look nothing alike, each one passing when read on its own. The AI's help is disclosed.
- **Why:** the surface variety is real, and no paper or student is at fault. Faculty's reading starts 4.0 s in.

### Beat 4 · 26.3–39.8 s · Faculty line up the problems (the turn, part 1)

- **What moves:**
  1. 27.3–27.9: a light navy outline appears around each paper's first line.
  2. 28.3–35.3: one at a time (0.7 s apart, 0.7 s each), a copy of each paper's first line lifts out, grows into words and settles in a list at the right, in Serif 16 ink: "Outbid rival lenders", "Block rival ports", "Outshout their media", "Undersell foreign arms", "Win back trade", "Fund competing roads", "Shadow foreign fleets", "Outspend their grants", "Deny them mines", "Replace rival cables". Each paper keeps its own line and its tick.
  3. 35.3–39.8: hold.
- **Caption:** "Faculty line up each paper's problem."
- **Notice:** the papers stay where they are, still ticked and still different. Only their problem statements move, into one list, each in its own words.
- **Why:** the faculty move and the mechanism at once: reading across the papers. The lines start 2.0 s in; the hold is for reading them.

### Beat 5 · 39.8–46.0 s · One frame, judged

- **What moves:**
  1. 40.8–42.2: a navy reading mark appears at the start of each line in turn, top to bottom (0.12 s apart).
  2. 42.8–43.6: navy corner brackets joined by a hairline draw around the whole list, and "ONE FRAME: COUNTER THE RIVAL" fades in under it.
  3. 43.6–46.0: hold.
- **Caption:** "Different words, one frame: each paper counters the rival."
- **Notice:** the lines share no single word. Faculty read each one and judge that all ten set the same goal.
- **Why:** the common assumption at the level of problem definition, found by judgment. The bracket starts 3.0 s in.

### Beat 6 · 46.0–52.9 s · The AI's frame (the turn, part 2)

- **What moves:**
  1. 47.0–47.8: a grey card grows out of the AI panel into the open space between the panel and the task card: "EVERY OUTLINE OPENED" over "Counter the rival's influence".
  2. 48.5–49.3: together: a grey line draws from the card to the bracket, the bracket turns grey, and the grey "AI'S FRAME" pill appears above its top-left corner, where the line lands.
  3. 49.3–52.9: hold.
- **Caption:** "Every AI outline opened with that frame."
- **Notice:** the goal every student wrote, in their own words, is the line every outline opened with. This is the first time the outlines' words are shown.
- **Why:** the origin, shown after the pattern faculty can see. The card is the lead-in; the line, bracket and pill change together 2.5 s in.

### Beat 7 · 52.9–58.9 s · Faculty ask

- **What moves:**
  1. 55.9–56.5: in the open space right of the bracket, "FACULTY ASK" appears over a dashed, empty bracket with a "?".
  2. 56.5–58.9: hold.
- **Caption:** "Faculty ask what other frames the task could take."
- **Notice:** lining up showed one frame; it can't show what's missing. The question is the faculty's, and nothing fills it.
- **Why:** the move that works in a real seminar, placed before any imagined answer. The question appears 3.0 s in.

### Beat 8 · 58.9–66.1 s · Imagine the essay's proposal

- **What moves:**
  1. 59.9–61.1: the seminar moves into the upper half, shrinks and dims to 35%: the papers to 55% with their ticks, the list to Serif 13 in a column under "COUNTER THE RIVAL" with "ONE FRAME" above, the pill beside the bracket, the AI's card above the board at full size with its line still running to the pill, and the faculty's question in open space to the right. "The seminar" and "AI OUTLINE → WRITE" settle at its top left. The AI panel shrinks to 40 high.
  2. 61.2–61.8: the imagined seminar fades in below a hairline: "Same seminar, imagined", ten red dots and ten blank papers, and the heading "ONE IMAGINED SPREAD" at the board's top.
  3. 61.9–63.4: each dot writes a short red line at the top of its blank paper, one after another (0.1 s apart, 0.6 s each). "DEFINE PROBLEM" appears in red as the start of its sequence label.
  4. 63.4–66.1: hold.
- **Caption:** "Imagine the essay's proposal: each defines the problem first."
- **Notice:** the same ten students, task and context. Each writes their own problem first, in red, before any AI help. The first seminar waits, dimmed, with its question still open.
- **Why:** the first half of the change, framed as a proposal to imagine. The red lines start 3.0 s in.

### Beat 9 · 66.1–74.3 s · The AI challenges each frame

- **What moves:**
  1. 67.1–68.1: a small red copy of each student's line rises to the AI panel, one after another (0.06 s apart, 0.5 s each).
  2. 69.1–69.7: a grey speech bubble appears in the imagined board, pointing at the papers: "What did you assume?" over "What else could it be?".
  3. 69.4–70.8: small grey speech bubbles drop from the AI panel into each paper, under its red line (0.1 s apart, 0.5 s each). "→ AI CHALLENGES" appears in grey.
  4. 71.0–72.2: the dots write. Each paper takes a layout from the same ten kinds, in a different order, and keeps its red line and its bubble. "→ WRITE" appears, then "ALL DRAFTED WITH AI".
  5. 72.2–74.3: hold.
- **Caption:** "Each asks the AI to challenge it, then writes."
- **Notice:** the AI is still in the work, and its reply looks different from beat 2's outline: questions in a speech bubble, aimed at the student's own problem.
- **Why:** the essay's pilot step two, in a picture of its own. The question card arrives 3.0 s in.

### Beat 10 · 74.3–87.8 s · Lined up again

- **What moves:**
  1. 75.3–76.5: together: the AI's question card fades, the first seminar returns to full strength, and a navy ring sweeps across the imagined papers (0.1 s each), leaving a ✓ on each.
  2. 77.3–78.3: three of the imagined papers' red lines (students 1–3) lift out and grow into ink words in the first column: "Outbid rival lenders", "Block rival ports", "Outshout their media". "COUNTER THE RIVAL" fades in above them.
  3. 78.5–79.5: four more lift into the second column: "Ease its debts", "Grow export jobs", "Back fair elections", "Fund its plans". "BACK THE PARTNER" fades in.
  4. 79.7–80.7: the last three lift into the third column: "Keep port access", "Secure mineral supplies", "Protect undersea cables". "SECURE OUR NEEDS" fades in.
  5. 80.9–81.7: navy brackets draw around the three groups.
  6. 81.7–87.8: hold.
- **Caption:** "These hold up too. Faculty line them up again."
- **Notice:** both grids look equally varied and every paper is ticked. Lined up, the imagined problems read as three goals, the AI's among them, under a heading that says this is one imagined spread.
- **Why:** the contrast, readable in words and kept honest. The groups start 3.0 s in, one group at a time; the hold is for reading the lines.

### Beat 11 · 87.8–96.3 s · The faculty check

- **What moves:**
  1. 87.8–88.0: caption 10 fades out.
  2. 88.0–88.6: the faculty check rises into the caption band: "FACULTY CHECK" in navy mono, then the question in large italic.
  3. 90.8–91.6: directly under the check, at the same size, "Line up each paper's problem, then ask what other frames the task could take.", and the faculty's dashed "?" beside the first seminar's frame pulses once. It stays empty.
  4. 91.6–96.3: hold. At 96.3 the player shows Replay and the figure rests on this frame.
- **Caption:** "Faculty check: What frames are missing across the seminar?" Second line, same size: "Line up each paper's problem, then ask what other frames the task could take."
- **Notice:** the second line names the two moves the first seminar showed: lining up, then asking. The question box stays open.
- **Why:** the figure ends on the check and a move an educator can run in one seminar. The second line appears 3.0 s in, and the beat holds long enough to read both lines before the figure rests.

## 5. Final frame

The still at 96.3 s on the figure's clock (99.3 s in the player). It is also the reduced-motion view, the print view and the poster (stage plus caption band).

**Stage:**
- **Top left:** the grey AI panel, marked "AI".
- **Top centre:** the AI's grey card, "EVERY OUTLINE OPENED" over "Counter the rival's influence", with a grey line down to the first seminar's "AI'S FRAME" pill.
- **Top right:** the task card: "EXAMPLE TASK" over "Recommend a strategy for partner Country A.", then "Our trade, its ports, election, minerals, a rival's loans."
- **Upper block:** red "The seminar" over "AI OUTLINE → WRITE" ("AI OUTLINE" grey). Ten small papers in ten different layouts, each with a red dot, an ink first line and a navy tick; "ALL DRAFTED WITH AI". At right, under "ONE FRAME" and "COUNTER THE RIVAL": a grey bracket around ten ink lines, "Outbid rival lenders" through "Replace rival cables", with the grey "AI'S FRAME" pill beside its top. In the open space to its right, "FACULTY ASK" over a dashed, empty bracket with a "?".
- **Lower block:** red "Same seminar, imagined" over "DEFINE PROBLEM → AI CHALLENGES → WRITE". Ten small papers, just as varied, each with a red dot, a red first line, a small grey speech bubble and a navy tick; "ALL DRAFTED WITH AI". At right, under "ONE IMAGINED SPREAD", three navy brackets of ink lines: "COUNTER THE RIVAL" (outbid rival lenders, block rival ports, outshout their media), "BACK THE PARTNER" (ease its debts, grow export jobs, back fair elections, fund its plans) and "SECURE OUR NEEDS" (keep port access, secure mineral supplies, protect undersea cables).

**Plate:** "INSTITUTIONAL MONOCULTURE · 6 OF 7" in the strip above the stage's top-left corner.

**Caption band:**

> INSTITUTIONAL MONOCULTURE *(navy mono)* · Shared systems and defaults narrow the range of frames a group considers. *(Serif)*
> FACULTY CHECK *(navy mono)* · *What frames are missing across the seminar?* *(Serif italic, about 30 px)*
> *Line up each paper's problem, then ask what other frames the task could take.* *(Serif italic, same size as the line above)*

**In the reduced-motion and print views,** the name card is beat 0 of the list, and all eleven captions and their "On screen" lines are readable below the controls. Clicking a beat shows its settled still.

**At 390 px** the final frame is the stacked text stage: the task, the AI chip, the first seminar's glyphs with its frame row ("One frame: counter the rival", the "AI's frame" pill and the dashed "?"), the imagined seminar's glyphs with its heading and three goal groups, then the check and the controls.

**What the still says alone:** ten students with the same AI wrote papers that all passed and look nothing alike. In the seminar, ten differently worded problems sit in one grey bracket marked as the AI's frame, the frame every outline opened with; beside it, the faculty's question stays an empty dashed box. Below, set apart and headed as imagined, the same students define the problem first and have the AI challenge it, and their problems spread across three goals. The lines under the picture say how to look: line up the problems, then ask what other frames the task could take.

## 6. Standalone page copy

**Title:** Institutional monoculture

**Kicker:** Failure mode 6 of 7

**Setup:**

Ten students in a seminar each use an AI to help write the same strategy paper. Each writes their own, and each paper holds up when read alone. *The Irreducible Officer* calls what can still go wrong institutional monoculture: shared systems and defaults narrow the range of frames available to the class. The seminar, the task and the papers are a constructed example.

**Figure summary** (visually hidden, for screen readers): An animated figure that opens on its name, Institutional monoculture, failure mode 6 of 7. Ten red dots stand for ten students in a seminar with an example task: recommend a strategy for partner Country A. The context lists our trade, its ports, election and minerals, and a rival's loans. Each student asks an AI for an outline, and ten grey outlines come back in the same pattern. Each student writes their own paper, in ten different layouts, all marked "All drafted with AI". Faculty read each paper and tick it, and the ticks stay. Then faculty line up the one-line problem statement from every paper: outbid rival lenders, block rival ports, outshout their media, undersell foreign arms, win back trade, fund competing roads, shadow foreign fleets, outspend their grants, deny them mines, replace rival cables. Faculty read each line, and a bracket closes around all ten, labelled "One frame: counter the rival". A grey card comes out of the AI box: every outline opened with "Counter the rival's influence". A grey line runs from it to the bracket, which turns grey, with a grey tag: "AI's frame". Faculty then ask what other frames the task could take: a dashed, empty box with a question mark appears beside the bracket and stays empty. Next, while the first seminar dims above, the figure imagines the same seminar the way the essay proposes, under the heading "One imagined spread". Each student writes the problem in red first, then asks the AI to challenge it ("What did you assume? What else could it be?"), and a grey speech bubble lands on each paper before they write. Faculty tick these papers too and line up their problems: counter the rival (outbid rival lenders, block rival ports, outshout their media); back the partner (ease its debts, grow export jobs, back fair elections, fund its plans); secure our needs (keep port access, secure mineral supplies, protect undersea cables). The figure ends on the faculty check. Each beat is listed below with what is on screen.

**Beat list (text equivalent):**

0. **Institutional monoculture · Failure mode 6 of 7** *On screen:* the name appears large over the stage, then moves into the corner, where it stays throughout. (Added by the runtime.)
1. **Ten students in a seminar get one task.** *On screen:* A task card appears at the top right: "Example task. Recommend a strategy for partner Country A." Ten blank papers appear in two rows of five, each with a red dot, labelled "The seminar". Under a line on the card, the context appears one item at a time: our trade, its ports, election, minerals, a rival's loans.
2. **Each asks an AI for an outline. They come back alike.** *On screen:* A grey box marked AI appears at the top left. A small mark travels from each red dot up to it, and ten grey outlines drop back into the papers, all in the same pattern.
3. **Each writes their own paper. Each holds up when faculty read it.** *On screen:* Each dot writes over its outline, and each paper turns to ink in its own layout: headings, bullets, a chart, a table, dense text, two columns, a numbered list, a pull quote, a timeline, a map. "AI outline, write" and "All drafted with AI" appear. A navy ring steps across the papers and leaves a tick on each.
4. **Faculty line up each paper's problem.** *On screen:* Each paper's first line is outlined, then lifts out and joins a list at the right: outbid rival lenders, block rival ports, outshout their media, undersell foreign arms, win back trade, fund competing roads, shadow foreign fleets, outspend their grants, deny them mines, replace rival cables. The papers stay where they are, ticked.
5. **Different words, one frame: each paper counters the rival.** *On screen:* A navy mark appears beside each line in turn as faculty read it. Then a bracket closes around all ten, labelled "One frame: counter the rival".
6. **Every AI outline opened with that frame.** *On screen:* A grey card comes out of the AI box: "Every outline opened: Counter the rival's influence". A grey line runs from it to the bracket, which turns grey, and a grey tag beside the bracket reads "AI's frame".
7. **Faculty ask what other frames the task could take.** *On screen:* Beside the bracket, in open space, a dashed, empty box with a question mark appears, labelled "Faculty ask". Nothing fills it.
8. **Imagine the essay's proposal: each defines the problem first.** *On screen:* The first seminar moves to the upper half and dims, with the grey card above its list and the question box beside it. Below a line, "Same seminar, imagined" appears with ten blank papers and the heading "One imagined spread". Each dot writes a red first line, and its label begins "Define problem".
9. **Each asks the AI to challenge it, then writes.** *On screen:* A copy of each red line goes up to the AI box. A grey speech bubble appears: "What did you assume? What else could it be?", and small grey speech bubbles land on each paper under its red line. Each dot writes its paper. The label now reads "Define problem, AI challenges, write", and the papers are marked "All drafted with AI".
10. **These hold up too. Faculty line them up again.** *On screen:* The speech bubble fades, the first seminar returns to full strength, and a navy ring ticks each imagined paper. Group by group, their problem lines lift out as words into three labelled columns: counter the rival (outbid rival lenders, block rival ports, outshout their media); back the partner (ease its debts, grow export jobs, back fair elections, fund its plans); secure our needs (keep port access, secure mineral supplies, protect undersea cables). Brackets close around them.
11. **Faculty check: What frames are missing across the seminar? Line up each paper's problem, then ask what other frames the task could take.** *On screen:* The questions appear under the picture at the same size, and the dashed question box beside the first seminar's frame pulses once. It stays empty.

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

Reading time is caption words ÷ 3. Picture words are words new in that beat; labels and lines already shown aren't counted again. **Required** is (caption words + picture words) ÷ 3 + 1.5 s, and every beat lasts at least that long. Every beat also lasts at least twice its caption's reading time. Lead is the time before the first movement; motion runs from the first movement to the last, including any pause for reading inside it.

| Beat | Time (s) | Caption words | Picture words (new) | Required (s) | 2× caption (s) | Lead (s) | Motion (s) | Hold (s) | Total (s) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 · The name card | player 0.0–3.0 | 0 | 7 (kicker 5, name 2) | 3.8 | 0 | 0.0 | 3.0 (2.0 hold, 1.0 move) | 0.0 | 3.0 (runtime standard, the same in all eight figures) |
| 1 · A seminar, one task | 0.0–10.9 | 8 | 20 (EXAMPLE TASK 2, task 7, context 9, "The seminar" 2) | 10.8 | 5.3 | 1.0 | 5.9 | 4.0 | 10.9 |
| 2 · The outlines come back alike | 10.9–18.3 | 11 | 1 ("AI") | 5.5 | 7.3 | 1.0 | 4.2 | 2.2 | 7.4 |
| 3 · Their own papers | 18.3–26.3 | 12 | 7 ("ALL DRAFTED WITH AI" 4, "AI OUTLINE → WRITE" 3) | 7.8 | 8.0 | 1.0 | 5.1 | 1.9 | 8.0 |
| 4 · Faculty line up the problems | 26.3–39.8 | 6 | 30 (ten lines of three words) | 13.5 | 4.0 | 1.0 | 8.0 | 4.5 | 13.5 |
| 5 · One frame, judged | 39.8–46.0 | 9 | 5 ("ONE FRAME: COUNTER THE RIVAL") | 6.2 | 6.0 | 1.0 | 2.8 | 2.4 | 6.2 |
| 6 · The AI's frame | 46.0–52.9 | 7 | 9 (card heading 3, card line 4, pill 2) | 6.8 | 4.7 | 1.0 | 2.3 | 3.6 | 6.9 |
| 7 · Faculty ask | 52.9–58.9 | 9 | 2 ("FACULTY ASK") | 5.2 | 6.0 | 3.0 | 0.6 | 2.4 | 6.0 |
| 8 · Imagine the essay's proposal | 58.9–66.1 | 9 | 8 (name 3, "DEFINE PROBLEM" 2, heading 3) | 7.2 | 6.0 | 1.0 | 3.5 | 2.7 | 7.2 |
| 9 · The AI challenges each frame | 66.1–74.3 | 9 | 11 (the AI's questions 9, "AI CHALLENGES" 2) | 8.2 | 6.0 | 1.0 | 5.1 | 2.1 | 8.2 |
| 10 · Lined up again | 74.3–87.8 | 9 | 27 (seven new lines 21, two new goal labels 6) | 13.5 | 6.0 | 1.0 | 6.4 | 6.1 | 13.5 |
| 11 · Faculty check | 87.8–96.3 | 7 + 14 second line | 0 | 8.5 | 4.7 (check) | 0.0 | 3.8 | 4.7 | 8.5, then rests |
| **Total** | | **110** | **127** | | | **12.0** | **50.7** | **36.6** | **96.3 figure, 99.3 player** |

Checks:
- Beats 1–11 meet their required time on the clock, including beat 11, which no longer leans on the rest after the figure ends. Beat 0 is the runtime's standard 3.0 s card for all eight figures; its seven words are a name and kicker that stay on screen in the plate, and its definition is read again under the check.
- One idea per beat; movements run one after another. A row of ten (dots, requests, outlines, bubbles, papers, ticks, lines) runs as one staggered movement.
- Changes a caption names wait until it can be read once: the outlines (beat 2, 3.7 s in), faculty's reading (beat 3, 4.0 s), the problem lines (beat 4, 2.0 s), the bracket (beat 5, 3.0 s), the trace line, grey bracket and pill (beat 6, 2.5 s), the faculty's question (beat 7, 3.0 s), the red lines (beat 8, 3.0 s), the AI's question card (beat 9, 3.0 s), the groups (beat 10, 3.0 s), and the second line under the check (beat 11, 3.0 s).
- Lead-ins the caption's first clause describes start early: the requests (beat 2), the writing (beat 3), the first-line outlines (beat 4), the reading marks (beat 5), the AI's card (beat 6), the block move and the imagined seminar's arrival (beat 8), the red copies going up (beat 9), and the ticks on the imagined papers (beat 10).
- Every hold is at least 1.5 s. Beat 7 has no movement until its question, which is the event its caption names.
- Every settled picture label renders at 11 px or more at 1366 × 657 and 1280 × 720, counting scaled groups (`scripts/figure-shots.mjs`, `minRenderedTextPx…`). The AI's card keeps its full size in the compact layout for this reason.
- No camera moves. The first seminar moves once and dims (beat 8), then returns (beat 10). Reduced motion shows the final frame.
- Total 96.3 s on the figure's clock, 99.3 s in the player with the name card. Final verification found six beats short of the reading rule at 97.7 s; tighter captions and labels meet it in every beat while taking 1.4 s off the total.
