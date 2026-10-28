# Institutional monoculture: storyboard

Motion figure 6 of 8 · slug `institutional-monoculture` · storyboard round 3, revised after storyboard cold read 2 (passed with fixes) · October 28, 2026

*Cold-read copy. The Intent section is removed.*

## 2. Scenario

A war-college seminar of ten students gets one open task: recommend a strategy for our partnership with Country A. A context card lists our trade, its ports, its election, its minerals and a rival's loans. Each student asks an AI for an outline, and every outline opens the same way: counter the rival's influence. Each student writes their own paper, with different evidence, structure and layout, and faculty find that each one holds up. Lined up, though, every paper's one-line problem sets out to counter the rival: outbid rival lenders, block rival ports, counter rival media and so on. The figure then imagines the seminar working the way the essay proposes: each student defines the problem first, then asks the AI to challenge it and suggest others. Those papers hold up too, and in this one possible result their problems spread across three goals: counter the rival, back the partner's own goals, and secure what we need. A real seminar can't be rerun, so the figure ends on what faculty can do: line up each paper's problem, then ask what other frames the task could take.

*Sources.* The task, the context, the seminar, the outlines, the papers and every problem line are constructed for this figure, and the task card says "Example task". *The Irreducible Officer*, Section II, defines institutional monoculture: similar systems, prompts and defaults narrow the range of frames available to a seminar, behind a surface of different arguments, structures and evidence. Section VIII asks each student to name the problem frame before submitting; in the figure each paper's first line stands for it. Section IX's pilot has students write a problem frame without AI, then ask an AI to find assumptions they missed and generate alternative frames; the imagined seminar follows those two steps. No source shows the spread such a seminar would reach. The figure shows no numbers and plots no study.

## 3. Cast and grammar

**The colour rule.**
- *Grey* is what the AI supplied: the AI panel and its shared opening line, the outlines, the challenge notes, "All drafted with AI", the AI steps in the sequence labels, and, from beat 6, the first seminar's frame bracket and its "AI'S FRAME" label.
- *Red* is what a student decided, plus the people: the dots, the name labels for each run, the imagined seminar's problem lines written before the AI (and the small copies sent to it), and "DEFINE PROBLEM" in its sequence label.
- *Navy ink* is the page and faculty's work: the task card, the students' own writing, every lined-up problem line and chip in both runs, the underline, the frame brackets faculty draw, the goal labels and tags, faculty's ring and ticks, and the question mark.
- *Dashed* means nobody has taken the frame up yet.

**Palette.** Paper `#f6f1e8`, paper-bright `#fffdfa`, ink `#0a2242`, machine grey `#5b564f` with a `#ded5c4` band behind AI-supplied text and outlines, red `#b81b2b`. Type: Source Serif 4 for the task, problem lines and captions; Source Sans 3 for name labels; IBM Plex Mono for small labels (12 units, never smaller).

**Stage.** An SVG with a 960 × 540 viewBox. One view, no camera moves. Two layouts on the same stage:
- *The seminar, large* (beats 1–6): the AI panel at top left, the task card at top right, the seminar grid at left, the lineup board at right.
- *Two runs, compact* (beats 7–10): the AI panel and task card stay. The seminar's block shrinks into the upper half (block top Y = 146) and the imagined seminar's block sits in the lower half (Y = 334), with a hairline divider at y 327. Each block has its grid at left (x 24–300) and its board at right. The seminar's board holds its column of ten lines (x 340–520) and open space; the imagined seminar's board has three goal columns at x 340, 536 and 732, each 180 wide.

Positions are viewBox units. Widths of text-sized elements and line breaks come from measured text at build time.

| Element | Stands for | How it looks | Where |
| --- | --- | --- | --- |
| Task card | The assignment and its context | Paper-bright card, hairline ink border (15%). Mono 12 "EXAMPLE TASK", then Serif 15 ink over two lines: "Recommend a strategy for our / partnership with Country A." A hairline, then mono 12 "CONTEXT" over Serif 13 ink on two lines: "Our trade, its ports, its election, / its minerals, a rival's loans." Stays throughout | x 670–936, y 16–138; baselines 32, 52, 70; hairline y 80; 96, 112, 128 |
| AI panel | The AI tools the students use | Rounded box, grey stroke 1.5, grey-band fill at 40%. Mono 12 grey "AI". From beat 2 to beat 6: mono 12 grey "EVERY OUTLINE OPENS WITH" over Serif 15 grey on a grey band, "Counter the rival's influence", beside a small outline sheet; these fade in beat 7, when the panel shrinks to 40 high. Stays throughout | x 24–300, y 16–100; "AI" at (36, 32); the opening line at (36, 56) and (36, 82); sheet x 236–284, y 26–92 |
| Red dots | The students | Solid red circles, radius 5 (large) or 3 (compact), one at each paper's top-left corner. Pulse to ask; move a little over the paper to write | Large: (x + 8, y − 12) for each paper |
| Name labels | Name each run's students | Red Sans 600 13: "The seminar" (beat 1); "The same seminar, imagined" (beat 7) | Large: (40, 132). Compact: (24, Y + 12) |
| Papers | Each student's work | Paper-bright sheets, hairline border, soft shadow. Blank at first; then a grey outline (first seminar) or a red first line and a grey challenge note (imagined seminar); then the student's own layout in ink. Ten layouts: headings with rows; bullets; a bar chart; a table; dense text; two columns; a numbered list; a pull quote; a timeline; a small map. Each paper's first line is its one-line problem statement, drawn as a short bar (ink in the seminar; red in the imagined seminar) | Large: 80 × 104 in a 5 × 2 grid, columns at x 40, 140, 240, 340, 440; rows y 164–268 and 300–404. Compact: 44 × 56, columns at x 24, 80, 136, 192, 248; rows Y + 38 and Y + 102 |
| Ticks | Faculty found the paper holds up | A small navy ✓ (12 units large, 7 compact) inside each paper's top-right corner. Stays to the end | Each paper |
| Faculty ring | Faculty reading each paper | A navy rounded outline (1.6) that steps from paper to paper | Over a grid |
| Request lines | A student asking the AI | Seminar: thin ink lines (1 unit) from each dot up to the AI panel, fading as they arrive. Imagined seminar: a small red copy of the student's problem line rises to the panel | Dot to panel's lower edge |
| Outlines | What the AI sends back to the first seminar | Grey sheets on the grey band: an opening bar, then three heading bars with two rows each. One pattern, small differences in line lengths | Fly from the panel into each paper |
| Challenge notes | What the AI sends back to the imagined seminar: its challenge and other frames | A small grey-band note with a grey "?" and two short grey bars, landing under each red line. Stays on the paper | Inside each imagined paper, under its first line |
| "ALL DRAFTED WITH AI" | Each run's disclosure | Grey mono 12, under the grid. Stays | Large: (40, 430). Compact: (24, Y + 176) |
| First-line marks | Faculty picking out each paper's problem | A light navy outline (1.0) around each paper's first line, in beat 4 only | Each large paper |
| Problem lines | Each first-seminar paper's problem statement, as faculty read it | Serif 16 ink in the large board, baselines 204 + 26k; Serif 12.4 ink in the compact column, baselines Y + 34 + 15k. Each is a copy lifted from its paper; the paper keeps its own line | Large: x 600. Compact: x 350 |
| Underline | What every line shares | A navy underline (1.2) under "rival" in each line | Under the large list |
| Frame bracket (first seminar) | The goal all ten lines share | Corner brackets joined by a hairline (frame convention), navy, labelled in mono 12 "ONE FRAME: COUNTER THE RIVAL" under it. In beat 6 the bracket and its label turn grey and the label reads "AI'S FRAME: COUNTER THE RIVAL". Compact: "ONE FRAME" above, "COUNTER THE RIVAL" (ink) and "AI'S FRAME" (grey) at the column's top | Large: x 578–800, y 184–448, label at (578, 470). Compact: x 340–520, from Y + 22 to just under the last line |
| Imagined chips | Each imagined paper's problem statement | Ink bars 130 × 5, rounded 2, one per paper, stacked 11 apart in their goal's column | Columns at x 355, 551, 747; from Y + 34 |
| Goal brackets (imagined seminar) | The goals the imagined problems set out | Navy brackets with mono 12 labels: "COUNTER THE RIVAL" (3 chips), "BACK THE PARTNER'S GOALS" (4), "SECURE WHAT WE NEED" (3) | Labels at (column + 8, Y + 14); brackets from Y + 22 |
| Tags | What each board shows | Mono 12 ink: "ONE FRAME" (seminar, compact) and "ONE POSSIBLE RESULT" (imagined seminar) | (340, Y + 4) |
| Question bracket | Frames faculty still have to ask about | One dashed ink bracket (45%), empty, with a centred Serif italic 28 "?" at 60% ink, in the open space of the seminar's board, aligned with none of the imagined columns | x 600–760, y 200–276 |
| Sequence labels | The order each run worked in | Mono 12 under each name label: seminar "AI OUTLINE → WRITE" ("AI OUTLINE" grey, "WRITE" ink); imagined seminar "DEFINE PROBLEM → AI CHALLENGES → WRITE" ("DEFINE PROBLEM" red, "AI CHALLENGES" grey) | (24, Y + 28) |
| Caption band | The words for each beat | Real text under the picture: a mono counter ("3 / 10") and the caption in Serif 22 ink. In beat 10: mono 13 ink "FACULTY CHECK" over the check in Serif italic 30, then directly under it at the same size and style, "Line up each paper's problem, then ask what other frames the task could take." Fixed height on desktop, sized for the check and a two-line second line | Under the stage |
| Beat list | Text equivalent and navigation | Ten numbered captions with "On screen" lines (visible in reduced-motion, print and narrow views; always available to screen readers). The current beat has a navy rule | Under the controls |

**The problem lines.**

| Student | The seminar (all in the frame "counter the rival") | The same seminar, imagined: goal |
| --- | --- | --- |
| 1 | Outbid rival lenders | Counter the rival |
| 2 | Block rival ports | Counter the rival |
| 3 | Counter rival media | Counter the rival |
| 4 | Undersell rival arms | Back the partner's goals |
| 5 | Undercut rival traders | Back the partner's goals |
| 6 | Outbuild rival roads | Back the partner's goals |
| 7 | Track rival fleets | Secure what we need |
| 8 | Outspend rival grants | Back the partner's goals |
| 9 | Contest rival mines | Secure what we need |
| 10 | Replace rival cables | Secure what we need |

The imagined seminar's lines are drawn as chips; only their goals are named.

**Narrow screens.** Whenever any picture text would render under 11 px (a stage narrower than about 880 px, so every phone and some tablets), the SVG collapses and the stacked text stage takes over on the same clock, with text at 13–16 px:
- *Top:* the task in one line, the context in one line, and a grey "AI" chip that shows "Every outline opens with: Counter the rival's influence" from beat 2 to beat 6.
- *The seminar's panel:* "The seminar" in red with its sequence line; ten small paper glyphs in a five-by-two grid (blank, then grey outlines, then ink layouts, with navy ticks from beat 3 to the end); "All drafted with AI". Under it, the board as text: in beats 4–6 the ten problem lines in two columns of five inside a bracket box, the underline under "rival", then "One frame: counter the rival", then "AI's frame".
- *From beat 7:* the seminar's panel compacts and dims, and the imagined panel sits under it with the same parts; each glyph shows its red first line as a red bar, then a small grey note. In beat 9 the first panel returns to full strength, the glyphs get ticks, and the board fills as three goal groups stacked one under another, each a label and a row of chips, under "One possible result".
- *Each panel* sets its paper glyphs (14 × 19 px) in a column beside its board, so the two runs read row against row.
- *Beat 10:* a dashed chip with "?" appears in the open space beside the first board, under the glyphs.
- *Final frame:* the task, the AI chip, both panels with their boards, then the check (20 px at this width) and the controls. Fix the stage at its tallest beat and the caption band's height on phones, so the controls never move; the build checks the final frame against an 844 px phone.

## 4. Beats

Times are absolute seconds. In every beat the caption changes first (0.3 s fade) and nothing in the picture moves for the first second. A change the caption is about starts only after the caption can be read once, except a lead-in that the caption's first clause describes.

### Beat 1 · 0.0–11.5 s · A seminar, one task

- **On screen at the start:** an empty paper stage.
- **What moves:**
  1. 1.0–1.6: the task card fades in and rises 6 units at top right, showing the task.
  2. 1.7–2.9: ten blank papers fade in with their red dots, one at a time in reading order (0.1 s apart, 0.3 s each). "The seminar" fades in in red above the grid.
  3. 3.4–6.9: under a hairline on the task card, "CONTEXT" fades in, then its five items one at a time (0.75 s apart, 0.5 s each): our trade, its ports, its election, its minerals, a rival's loans.
  4. 6.9–11.5: hold.
- **Caption:** "Ten students in a seminar get the same task."
- **Notice:** ten red dots, ten blank papers, one task. The task asks for a strategy for a partnership and doesn't say what the problem is. Every context item has an owner; the rival's loans are one of five.
- **Why:** the setup names the situation before anything goes wrong, with an open task and context that doesn't single out the rival.

### Beat 2 · 11.5–19.5 s · The outlines come back alike

- **What moves:**
  1. 12.5–12.9: the AI panel fades in at top left: a grey box marked "AI".
  2. 12.9–14.2: each dot pulses, and a thin ink line runs from it up to the AI panel, one after another (0.1 s apart, 0.4 s each). The lines fade as they arrive.
  3. 15.5–17.0: ten grey outlines drop from the AI panel into the ten papers, one after another (0.1 s apart, 0.6 s each). As the first lands, the panel shows "EVERY OUTLINE OPENS WITH" over "Counter the rival's influence", in grey.
  4. 17.0–19.5: hold.
- **Caption:** "Each asks an AI for an outline. The outlines come back alike."
- **Notice:** ten requests go up; ten outlines come back in one pattern, all opening with the same line. Asking for an outline is ordinary help.
- **Why:** similar systems, prompts and defaults, shown as an ordinary step, with "alike" visible in words. The requests are the lead-in the first sentence describes; the outlines start 4.0 s in.

### Beat 3 · 19.5–28.2 s · Their own papers

- **What moves:**
  1. 20.5–23.1: the dots write over their outlines, one after another (0.2 s apart, 0.8 s each). In each paper the grey drains to ink as it takes its own layout: headings, bullets, a chart, a table, dense text, two columns, a numbered list, a pull quote, a timeline, a map. Each paper's first line is a short ink bar.
  2. 23.2–23.6: "ALL DRAFTED WITH AI" fades in under the grid, in grey.
  3. 24.5–26.7: a navy ring steps across the papers in reading order (0.2 s each), and each paper gets a small navy ✓ as the ring leaves it. The ticks stay.
  4. 26.7–28.2: hold.
- **Caption:** "Each writes their own paper. Faculty read each one, and each holds up."
- **Notice:** ten papers that look nothing alike. Each student did real work, and each paper passes when faculty read it on its own. The AI's help is disclosed.
- **Why:** the surface variety is real, and no paper or student is at fault. The writing is the lead-in the first sentence describes; faculty's reading starts 5.0 s in.

### Beat 4 · 28.2–41.7 s · Faculty line up the problems (the turn, part 1)

- **What moves:**
  1. 29.2–29.8: a light navy outline appears around each paper's first line.
  2. 31.2–38.2: one at a time (0.7 s apart, 0.7 s each), a copy of each paper's first line lifts out, grows into words and settles in a list at the right, in Serif 16 ink: "Outbid rival lenders", "Block rival ports", "Counter rival media", "Undersell rival arms", "Undercut rival traders", "Outbuild rival roads", "Track rival fleets", "Outspend rival grants", "Contest rival mines", "Replace rival cables". As each leaves, its outline fades. Each paper keeps its own line and its tick.
  3. 38.2–41.7: hold.
- **Caption:** "Then faculty line up the problem each paper defines."
- **Notice:** the papers stay where they are, still ticked and still different. Only their problem statements move, into one list, and every one is aimed at the rival.
- **Why:** this is the faculty move and the mechanism at once: reading across the papers instead of through each one. The outlines are the lead-in; the lines start 3.0 s in and arrive at about reading pace. The hold is for reading the list.

### Beat 5 · 41.7–49.7 s · One frame

- **What moves:**
  1. 42.7–43.3: the last word of each line (lenders, ports, media …) brightens once, top to bottom.
  2. 45.7–46.9: a navy underline runs under "rival" in every line, top to bottom (0.1 s apart).
  3. 47.1–47.9: navy corner brackets joined by a hairline draw around the whole list, and "ONE FRAME: COUNTER THE RIVAL" fades in under it.
  4. 47.9–49.7: hold.
- **Caption:** "Different details, one frame: every paper sets out to counter the rival."
- **Notice:** each paper picked different evidence and different words, and all ten set themselves the same goal. One bracket holds the whole seminar.
- **Why:** the common assumption at the level of problem definition, as a goal faculty can read. The details are the lead-in the first clause names; the underline starts 4.0 s in.

### Beat 6 · 49.7–56.7 s · The AI's frame (the turn, part 2)

- **What moves:**
  1. 50.7–51.3: the AI panel's opening line, "Counter the rival's influence", brightens once.
  2. 52.2–53.0: the bracket around the list turns grey, and its label turns grey and reads "AI'S FRAME: COUNTER THE RIVAL".
  3. 53.0–56.7: hold.
- **Caption:** "Every AI outline opened with that frame."
- **Notice:** the goal every student wrote down, in their own words, is the line every outline opened with.
- **Why:** this is the origin, shown after the pattern faculty can see, as one change. The panel's line is the lead-in; the bracket changes 2.5 s in.

### Beat 7 · 56.7–64.5 s · Imagine the essay's proposal

- **On screen at the start:** the seminar: ten ticked papers, "All drafted with AI", and the list in its grey bracket.
- **What moves:**
  1. 57.7–58.9: the seminar moves into the upper half, shrinks and dims to 35%: the papers to 55% with their ticks, the list to Serif 12.4 in a column under "COUNTER THE RIVAL" and grey "AI'S FRAME", with "ONE FRAME" above. "The seminar" and "AI OUTLINE → WRITE" settle at its top left. The AI panel's opening line fades; the panel is plain "AI" again. The task card stays.
  2. 59.0–59.6: the imagined seminar fades in below: "The same seminar, imagined", ten red dots and ten blank papers in the same grid.
  3. 61.0–62.5: each dot writes a short red line at the top of its blank paper, one after another (0.1 s apart, 0.6 s each). "DEFINE PROBLEM" appears in red as the start of its sequence label.
  4. 62.5–64.5: hold.
- **Caption:** "Imagine the essay's proposal: each student defines the problem first."
- **Notice:** the same ten students, task and context. Each writes their own problem first, in red, before any AI help arrives. The first seminar waits, dimmed, above.
- **Why:** the first half of the one change, framed as a proposal to imagine. The block move and the imagined seminar's arrival are the lead-in "Imagine the essay's proposal" describes; the red lines start 4.3 s in.

### Beat 8 · 64.5–73.5 s · The AI challenges each frame

- **What moves:**
  1. 65.5–66.5: a small red copy of each student's line rises to the AI panel, one after another (0.06 s apart, 0.5 s each).
  2. 69.2–70.6: a grey challenge note drops back into each paper, under its red line (0.1 s apart, 0.5 s each): a "?" and two short bars for other frames. "→ AI CHALLENGES" appears in grey.
  3. 70.8–72.0: the dots write. Each paper takes a layout from the same ten kinds, in a different order, and keeps its red first line and its note. "→ WRITE" appears, and "ALL DRAFTED WITH AI" appears under the grid.
  4. 72.0–73.5: hold.
- **Caption:** "Then each asks the AI to challenge it and suggest others, and writes."
- **Notice:** the AI is still in the work. It gets each student's own problem and answers with a challenge and other frames, which stay on the paper. Then each student writes as before.
- **Why:** the second half of the change, the essay's pilot step two. The requests are the lead-in "Then each asks the AI" describes; the notes start 4.7 s in.

### Beat 9 · 73.5–83.5 s · Lined up by frame

- **What moves:**
  1. 74.5–75.7: together: the first seminar returns to full strength, and a navy ring sweeps across the imagined papers (0.1 s each), leaving a ✓ on each.
  2. 77.5–78.3: three of the imagined papers' red lines (students 1–3) lift out as ink chips into the first column, and "COUNTER THE RIVAL" fades in above them.
  3. 78.5–79.3: four more (students 4, 5, 6 and 8) lift into the second column, and "BACK THE PARTNER'S GOALS" fades in.
  4. 79.5–80.3: the last three (students 7, 9 and 10) lift into the third column, and "SECURE WHAT WE NEED" fades in.
  5. 80.5–81.3: navy brackets draw around the three groups, and "ONE POSSIBLE RESULT" fades in above the board.
  6. 81.3–83.5: hold.
- **Caption:** "These papers hold up too. Faculty line up their problems by frame."
- **Notice:** both grids look equally varied and every paper is ticked, so the papers can't tell the two seminars apart. Lined up, the imagined seminar's problems set out three different goals, the AI's among them. The tag says this is one possible result.
- **Why:** this is the contrast, kept honest: the same lineup finds several goals where the first seminar had one, as an imagined outcome. The ticks are the lead-in the first sentence describes; the groups start 4.0 s in, one group at a time.

### Beat 10 · 83.5–90.5 s · The faculty check

- **What moves:**
  1. 83.5–83.7: caption 9 fades out.
  2. 83.7–84.3: the faculty check rises into the caption band: "FACULTY CHECK" in navy mono, then the question in large italic.
  3. 86.5–87.1: together: directly under the check, at the same size, "Line up each paper's problem, then ask what other frames the task could take."; and in the open space of the first seminar's board, a dashed, empty bracket with a "?" draws.
  4. 87.1–90.5: hold. At 90.5 the player shows Replay and the figure rests on this frame.
- **Caption:** "Faculty check: What frames are missing across the seminar?" Second line, same size: "Line up each paper's problem, then ask what other frames the task could take."
- **Notice:** the second line splits the job. Lining up shows which frames a seminar has; the question mark is what faculty still have to ask about. It sits in open space, so the imagined board below doesn't answer it.
- **Why:** the figure ends on the check and a move an educator can run in one seminar. The second line and the question mark appear 2.8 s after the check begins to rise, once it can be read.

## 5. Final frame

The still at 90.5 s. It is also the reduced-motion view, the print view and the poster (stage plus caption band).

**Stage:**
- **Top left:** the grey AI panel, marked "AI".
- **Top right:** the task card: "EXAMPLE TASK" over "Recommend a strategy for our partnership with Country A.", then "CONTEXT" over "Our trade, its ports, its election, its minerals, a rival's loans."
- **Upper block:** red "The seminar" over "AI OUTLINE → WRITE" ("AI OUTLINE" grey). Ten small papers in ten different layouts, each with a red dot, an ink first line and a navy tick; "ALL DRAFTED WITH AI" under them. At right, under "ONE FRAME": a grey bracket under "COUNTER THE RIVAL" and grey "AI'S FRAME", around ten ink lines, "Outbid rival lenders" through "Replace rival cables". In the open space to its right, a dashed, empty bracket with a "?".
- **Lower block:** red "The same seminar, imagined" over "DEFINE PROBLEM → AI CHALLENGES → WRITE" ("DEFINE PROBLEM" red, "AI CHALLENGES" grey). Ten small papers, just as varied, each with a red dot, a red first line, a small grey challenge note and a navy tick; "ALL DRAFTED WITH AI". At right, under "ONE POSSIBLE RESULT", three navy brackets of ink chips: "COUNTER THE RIVAL" (three), "BACK THE PARTNER'S GOALS" (four), "SECURE WHAT WE NEED" (three).

**Caption band:**

> FACULTY CHECK *(navy mono)*
> *What frames are missing across the seminar?* *(Serif italic, about 30 px)*
> *Line up each paper's problem, then ask what other frames the task could take.* *(Serif italic, same size as the line above)*

**In the reduced-motion and print views,** all ten captions and their "On screen" lines are readable below the controls. Clicking a beat shows its settled still.

**At 390 px** the final frame is the stacked text stage: the task and context, the AI chip, both panels with their boards, then the check and the controls.

**What the still says alone:** ten students with the same AI wrote papers that all passed and look nothing alike. In the seminar, every problem line sets out to counter the rival, inside one grey bracket marked as the AI's frame; beside it, a dashed bracket holds a question mark. In the imagined seminar, where each student defined the problem first and had the AI challenge it, the papers also passed and their problems spread across three goals, one possible result. The lines under the picture ask what is missing and say how to look: line up the problems, then ask what other frames the task could take.

## 6. Standalone page copy

**Title:** Institutional monoculture

**Kicker:** Failure mode 6 of 7

**Setup:**

Ten students in a seminar each use an AI to help write the same strategy paper. Each writes their own, and each paper holds up when read alone. *The Irreducible Officer* calls what can still go wrong institutional monoculture: shared systems and defaults narrow the range of frames available to the class. The seminar, the task and the papers are a constructed example.

**Figure summary** (visually hidden, for screen readers): An animated figure. Ten red dots stand for ten students in a seminar with an example task: recommend a strategy for our partnership with Country A. A context card lists our trade, its ports, its election, its minerals and a rival's loans. Each student asks an AI for an outline. Ten grey outlines come back alike, and the AI box shows that every outline opens with "Counter the rival's influence". Each student writes their own paper, in ten different layouts, all marked "All drafted with AI". Faculty read each paper and tick it, and the ticks stay. Then faculty line up the one-line problem statement from every paper: outbid rival lenders, block rival ports, counter rival media, undersell rival arms, undercut rival traders, outbuild rival roads, track rival fleets, outspend rival grants, contest rival mines, replace rival cables. An underline runs under "rival" in every line, and one bracket closes around all ten, labelled "One frame: counter the rival". The bracket turns grey and reads "AI's frame". Next, while the first seminar dims above, the figure imagines the same seminar working the way the essay proposes: each student writes the problem in red first, then asks the AI to challenge it and suggest other frames, and a grey challenge note lands on each paper before they write. Faculty tick each of these papers too. Lined up, the imagined problems fall into three goals, tagged "One possible result": counter the rival (three papers), back the partner's goals (four) and secure what we need (three). At the end, a dashed bracket with a question mark appears in the open space beside the first seminar's single frame. The figure ends on the faculty check. Each beat is listed below with what is on screen.

**Beat list (text equivalent):**

1. **Ten students in a seminar get the same task.** *On screen:* a task card appears at the top right: "Example task. Recommend a strategy for our partnership with Country A." Ten blank papers appear in two rows of five, each with a red dot, labelled "The seminar". The card adds a context list, one item at a time: our trade, its ports, its election, its minerals, a rival's loans.
2. **Each asks an AI for an outline. The outlines come back alike.** *On screen:* a grey box marked AI appears at the top left. A line runs from each dot up to it, and ten grey outlines drop back into the papers, all in one pattern. The box shows "Every outline opens with: Counter the rival's influence".
3. **Each writes their own paper. Faculty read each one, and each holds up.** *On screen:* each dot writes over its outline, and each paper turns to ink in its own layout: headings, bullets, a chart, a table, dense text, two columns, a numbered list, a pull quote, a timeline, a map. "All drafted with AI" appears under them. A navy ring steps across the papers and leaves a tick on each.
4. **Then faculty line up the problem each paper defines.** *On screen:* each paper's first line is outlined, then lifts out and joins a list at the right: outbid rival lenders, block rival ports, counter rival media, undersell rival arms, undercut rival traders, outbuild rival roads, track rival fleets, outspend rival grants, contest rival mines, replace rival cables. The papers stay where they are, ticked.
5. **Different details, one frame: every paper sets out to counter the rival.** *On screen:* an underline runs under "rival" in every line, and a bracket closes around all ten, labelled "One frame: counter the rival".
6. **Every AI outline opened with that frame.** *On screen:* the AI box's line, "Counter the rival's influence", brightens. The bracket turns grey and reads "AI's frame: counter the rival".
7. **Imagine the essay's proposal: each student defines the problem first.** *On screen:* the first seminar moves to the upper half and dims, labelled "The seminar: AI outline, write". Below it, "The same seminar, imagined" appears with ten blank papers, and each dot writes a red first line. Its label begins "Define problem".
8. **Then each asks the AI to challenge it and suggest others, and writes.** *On screen:* a copy of each red line goes up to the AI box, and a grey challenge note comes back into each paper under its line. Each dot writes its paper. The label now reads "Define problem, AI challenges, write", and the papers are marked "All drafted with AI".
9. **These papers hold up too. Faculty line up their problems by frame.** *On screen:* the first seminar returns to full strength, and a navy ring ticks each imagined paper. The imagined problems move, group by group, into three labelled columns: counter the rival (three papers), back the partner's goals (four), secure what we need (three). Brackets close around them, under "One possible result".
10. **Faculty check: What frames are missing across the seminar? Line up each paper's problem, then ask what other frames the task could take.** *On screen:* the questions appear under the picture at the same size. In the open space beside the first seminar's single frame, a dashed, empty bracket with a question mark appears.

**Faculty check:** What frames are missing across the seminar?
**Line up each paper's problem, then ask what other frames the task could take.** (same size)

Read one at a time, every paper in the seminar holds up, and the papers look nothing alike. Lined up, they share one problem definition, the one every AI outline opened with. Lining up shows which frames a seminar has. It can't show which are missing. For that, faculty ask what other frames the task could take, and answer from their own knowledge of the problem or let the class name them before discussion settles on one. The figure's imagined seminar follows the essay's proposal for the next assignment: each student writes a problem frame without AI, then asks an AI to find assumptions they missed and suggest other frames (Section IX, steps one and two). No source has tested whether that spreads a seminar's frames; the imagined board is one possible result, and the essay offers the pilot as a way to find out. The companion's failure-mode lab adds a fair objection: convergence can reflect a justified shared purpose or strong evidence, and difference isn't better by itself. A seminar can compare several frames and still agree on one.

**About the example.** Each paper's first line stands for the frame evidence the essay asks students to name before submitting (Section VIII), which the essay describes as a short page: the problem frame, key assumptions, criteria for success, evidence standard and the role AI played. The figure groups problems by the goal they set, and names three goals for the imagined seminar as one possible spread. Telling real frames apart takes reading, and, as the lab notes, authored examples don't show the output of any model or actual class.

**From the essay** (*The Irreducible Officer*, Section II, What the Problem Looks Like):

> **Institutional monoculture** is the class-level version of the same problem. When many students use similar systems, similar prompts, and similar defaults, the range of strategic frames available to a seminar narrows. AI can create a surface appearance of diversity (different arguments, different structures, different evidence) while reproducing common assumptions at the level of problem definition. Research into the diversity of AI-generated ideas finds that language models aggregate knowledge into a unified distribution in ways that human cognition does not: people exhibit knowledge partitioning, each occupying a distinct semantic region, in ways that independent AI samples do not replicate ([Deng, Brucks & Toubia, 2026](https://arxiv.org/abs/2602.20408)). Post-training alignment compounds this further, compressing the distribution of outputs toward the statistical center ([Murthy, Ullman & Hu, 2024](https://arxiv.org/abs/2411.04427)). Pedagogical research on LLM integration in higher education frames this compression as epistemic narrowing: the constraining of students' exposure to diverse, ambiguous, or contested knowledge by tools optimized for convergence and fluency ([Vendrell & Johnston, 2026](https://doi.org/10.1016/j.caeai.2026.100572)). In a war college seminar, that compression raises a serious possibility: the same systems that help students produce stronger work may also narrow the range of strategic imagination the seminar is meant to develop.

**The evidence.** The essay cites three sources for this failure mode: Deng, Brucks & Toubia (2026) on language models aggregating knowledge where people partition it; Murthy, Ullman & Hu (2024) on alignment compressing outputs toward the statistical center; and Vendrell & Johnston (2026), whose work the essay describes as framing this compression as epistemic narrowing. Workplace studies the essay doesn't cite point the same way, within limits:
- Romasanta, Thomas & Levina (HBR, 2026) report that across thousands of simulations, leading models gave the same trendy strategy advice regardless of context, defaulting to options such as differentiation, augmentation and collaboration. It is the closest of these to strategy work. It is a practitioner article, and its methods are visible only through the authors' summary.
- Doshi & Hauser (Science Advances, 2024) found that AI story ideas made individual stories better rated and made the stories more similar to one another. It measured stories, not strategies.
- Kim, Garg, Peng & Garg (ICML, 2025) and Jiang et al. (NeurIPS, 2025) found that when two models both get a question wrong they usually give the same wrong answer, and that different vendors give strikingly similar open-ended answers. Asking a second model is not an independent check.
- Terwiesch et al. (Production and Operations Management, 2026) found that better prompting, assigned personas and pooling several vendors brought the diversity of AI-generated ideas close to human levels. The companion's source notes read this as sameness being the default, with deliberate design needed to escape it. The study is about prompting AI for ideas; it doesn't test a seminar or the essay's pilot.

**Links:**
- Book chapter: Refuse the garden path → `../../book-v0/four-moves-book.html?spread=4`
- In the same chapter: Premature synthesis → `../premature-synthesis/`
- Practice: test institutional monoculture with your AI assistant → `https://judgmentlab.net/#companion`
- Essay: Section II, What the Problem Looks Like → `https://judgmentlab.net/#ii-what-the-problem-looks-like`
- Essay: Section IX, A Foundation Pilot → `https://judgmentlab.net/#ix-a-foundation-pilot`

## 7. Pacing table

Reading time is caption words ÷ 3. The beat total is lead + motion + hold, and every total is at least twice the caption's reading time. Picture words are new words inside the picture; labels that repeat aren't counted again. The reading budget is caption plus picture words divided by the beat's length, and stays at 3 words a second or less. Lead is the time before the first movement; motion runs from the first movement to the last, including any pause for reading inside it.

| Beat | Time (s) | Caption words | Reading (s) | 2× (s) | Picture words | Budget (words/s) | Lead (s) | Motion (s) | Hold (s) | Total (s) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · A seminar, one task | 0.0–11.5 | 9 | 3.0 | 6.0 | 25 | 3.0 | 1.0 | 5.9 | 4.6 | 11.5 |
| 2 · The outlines come back alike | 11.5–19.5 | 12 | 4.0 | 8.0 | 9 | 2.6 | 1.0 | 4.5 | 2.5 | 8.0 |
| 3 · Their own papers | 19.5–28.2 | 13 | 4.3 | 8.7 | 4 | 2.0 | 1.0 | 6.2 | 1.5 | 8.7 |
| 4 · Faculty line up the problems | 28.2–41.7 | 9 | 3.0 | 6.0 | 30 | 2.9 | 1.0 | 9.0 | 3.5 | 13.5 |
| 5 · One frame | 41.7–49.7 | 12 | 4.0 | 8.0 | 5 | 2.1 | 1.0 | 5.2 | 1.8 | 8.0 |
| 6 · The AI's frame | 49.7–56.7 | 7 | 2.3 | 4.7 | 2 | 1.3 | 1.0 | 2.3 | 3.7 | 7.0 |
| 7 · Imagine the essay's proposal | 56.7–64.5 | 10 | 3.3 | 6.7 | 9 | 2.4 | 1.0 | 4.8 | 2.0 | 7.8 |
| 8 · The AI challenges each frame | 64.5–73.5 | 13 | 4.3 | 8.7 | 2 | 1.7 | 1.0 | 6.5 | 1.5 | 9.0 |
| 9 · Lined up by frame | 73.5–83.5 | 12 | 4.0 | 8.0 | 11 | 2.3 | 1.0 | 6.8 | 2.2 | 10.0 |
| 10 · Faculty check | 83.5–90.5 | 7 + 14 second line | 2.3 + 4.7 | 4.7 (check) | 0 | 3.0 | 0.0 | 3.6 | 3.4 | 7.0, then rests |
| **Total** | | **118** | **39.3** | | **97** | | **9.0** | **54.8** | **26.7** | **90.5** |

Checks:
- One idea per beat; movements run one after another. A row of ten (dots, requests, outlines, notes, papers, ticks, lines) runs as one staggered movement.
- Changes a caption names wait until it can be read once: the outlines and their shared line (beat 2, 4.0 s in), faculty's reading (beat 3, 5.0 s), the problem lines (beat 4, 3.0 s), the underline (beat 5, 4.0 s), the grey frame (beat 6, 2.5 s), the red lines (beat 7, 4.3 s), the challenge notes (beat 8, 4.7 s), the groups (beat 9, 4.0 s), and the second line with the question mark (beat 10, 2.8 s after the check begins to rise; the check reads in 2.3 s).
- Lead-ins the caption's first clause describes start early, as in figures 1–5: the requests (beat 2), the writing (beat 3), the first-line outlines (beat 4), the details brightening (beat 5), the panel's line (beat 6), the block move and the imagined seminar's arrival (beat 7), the red copies going up (beat 8), and the first seminar's return with the new ticks (beat 9).
- Problem lines arrive at about reading pace: ten lines of three words in 7.0 s in beat 4, then a 3.5 s hold. The imagined groups arrive one group at a time.
- The second line under the check takes 4.7 s to read and appears 3.4 s before the end; the figure rests on the final frame, so reading continues there.
- Every hold is at least 1.5 s. Beat 1 holds longer for the context.
- No camera moves. The first seminar moves once and dims (beat 7), then returns (beat 9). Reduced motion shows the final frame.
- Total 90.5 s.
