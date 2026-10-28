# Institutional monoculture: storyboard

Motion figure 6 of 8 · slug `institutional-monoculture` · storyboard round 1 · October 28, 2026

*Cold-read copy. The Intent section is removed.*

## 2. Scenario

A war-college seminar of ten students gets one open task: recommend a strategy as a rival courts a partner country. Each student asks an AI for an outline, and the outlines come back alike, each opening with the rival's influence. Each student writes their own paper, with different evidence, structure and layout, and faculty find that each one holds up. Lined up, though, every paper's problem statement makes the rival the problem: the rival's loans, ports, media, arms and so on. Replayed with one change, each student defining the problem in one line before asking the AI, the same seminar's papers look just as varied, and lined up they fall into four frames: the rival, the partner, our interests and the cost.

*Sources.* The task, the seminar, the outlines, the papers and every problem line are constructed for this figure, and the task card says "Example task". *The Irreducible Officer*, Section II, defines institutional monoculture: similar systems, prompts and defaults narrow the range of frames available to a seminar, behind a surface of different arguments, structures and evidence. Section VIII asks each student to name the problem frame before submitting, which is what faculty line up. Section IX's pilot starts with a problem frame written without AI, which the replay follows. The figure shows no numbers and plots no study.

## 3. Cast and grammar

**The colour rule.**
- *Grey* is what the AI supplied: the AI panel, its outlines, the grey row the students keep in each paper, "All drafted with AI", "AI OUTLINE" in the sequence labels, the outline's opening line, and, from beat 6, the first run's frame bracket and the grey bands on that run's problem lines.
- *Red* is what a student decided, plus the people: the dots, the name labels for each run, the replay's problem lines written before the AI, and "DEFINE PROBLEM" in the replay's sequence label.
- *Navy ink* is the page and faculty's work: the task card, the students' own writing, every lined-up problem line in both runs, the underline, the frame brackets faculty draw, the frame labels, faculty's ring and ticks, and "MISSING".
- *Dashed* means nobody took the frame up.

**Palette.** Paper `#f6f1e8`, paper-bright `#fffdfa`, ink `#0a2242`, machine grey `#5b564f` with a `#ded5c4` band behind AI-supplied text and outlines, red `#b81b2b`. Type: Source Serif 4 for the task, problem lines and captions; Source Sans 3 for name labels; IBM Plex Mono for small labels (12 units, never smaller).

**Stage.** An SVG with a 960 × 540 viewBox. One view, no camera moves. Two layouts on the same stage:
- *First run, large* (beats 1–6): the AI panel at top left, the task card at top right, the seminar grid at left, the lineup board at right.
- *Two runs, compact* (beats 7–9): the AI panel and task card stay. The first run's block shrinks into the top half (block top Y = 124) and the replay's block sits in the bottom half (Y = 330). Each block has its grid at left (x 24–304) and a four-column board at right (columns at x 340, 489, 638, 787, each 140 wide).

Positions are viewBox units. Widths of text-sized elements and line breaks come from measured text at build time.

| Element | Stands for | How it looks | Where |
| --- | --- | --- | --- |
| Task card | The assignment | Paper-bright card, hairline ink border (15%). Mono 12 "EXAMPLE TASK", then Serif 15 ink over two lines: "Recommend a strategy as a rival / courts a partner country." Stays throughout | x 670–936, y 16–104 |
| AI panel | The AI tools the students use | Rounded box, grey stroke 1.5, grey-band fill at 40%. Mono 12 grey "AI". From beat 6: mono 12 grey "EACH OUTLINE OPENED WITH" over Serif 15 grey on a grey band, "The rival's influence", beside a small outline sheet. Stays throughout | x 24–300, y 16–100; "AI" at (36, 32); the opening line at (36, 56) and (36, 82); sheet x 236–284, y 26–92 |
| Red dots | The students | Solid red circles, radius 5 (large) or 3 (compact), one at each paper's top-left corner. Pulse to ask; move a little over the paper to write | Large: (x + 8, y − 12) for each paper |
| Name labels | Name each run's students | Red Sans 600 13: "The seminar" (beat 1); "The same seminar, replayed" (beat 7) | Large: (40, 132). Compact: (24, Y + 14) |
| Papers | Each student's work | Paper-bright sheets, hairline border, soft shadow. Blank at first; then a grey outline; then the student's own layout in ink with one grey row kept. Ten layouts: headings with rows; bullets; a bar chart; a table; dense text; two columns; a numbered list; a pull quote; a timeline; a small map. Each paper's first line is its one-line problem statement, drawn as a short bar (ink; red in the replay) | Large: 80 × 104 in a 5 × 2 grid, columns at x 40, 140, 240, 340, 440; rows y 164–268 and 300–404. Compact: 48 × 62, columns at x 24, 82, 140, 198, 256; rows Y + 44 and Y + 118 |
| Request lines | A student asking the AI | Thin ink lines (1 unit) running from a dot up to the AI panel; they fade as they arrive | Dot to panel's lower edge |
| Outlines | What the AI sends back | Grey sheets on the grey band: a title bar and three heading bars with two rows each. Alike: one pattern, small differences in line lengths. In the replay each outline sits under the student's red line | Fly from the panel into each paper |
| "ALL DRAFTED WITH AI" | Each run's disclosure | Grey mono 12, under the grid. Stays | Large: (40, 430). Compact: (24, Y + 196) |
| Faculty ring and ticks | Faculty reading each paper | A navy rounded outline (1.6) that steps from paper to paper, and a small navy ✓ (12 units) left at each paper's top-right corner. The ticks fade in beat 4 | Over the large grid |
| Board header | What faculty are lining up | Mono 12 ink "EACH PAPER'S PROBLEM" | Large: (590, 150) |
| Problem lines | Each paper's problem statement, as faculty read it | Serif 16 ink in the large board, baselines 186 + 27k; Serif 12.4 ink in a compact column, baselines Y + 38 + 15k. Each is a copy lifted from its paper; the paper keeps its own line | Large: x 600. Compact: x (column + 10) |
| Underline | What every line shares | A navy underline (1.2) under "The rival's" in each line | Under the large list |
| Frame bracket | A frame the lines share | Corner brackets joined by a hairline (frame convention), navy, with a mono 12 label. First run: "ONE FRAME: THE RIVAL" under the bracket (large); in beat 6 the bracket turns grey and the label reads "AI'S FRAME: THE RIVAL". In the compact layout "THE RIVAL" sits at the column's top and grey "AI'S FRAME" under the bracket. Replay: four navy brackets labelled "THE RIVAL", "THE PARTNER", "OUR INTERESTS", "THE COST" | Large: x 578–800, y 166–440, label at (578, 462). Compact: label at (column + 8, Y + 16); bracket from Y + 24 to just under the last line; "AI'S FRAME" at (348, Y + 196) |
| Missing frames | Frames nobody in the first run took up | Dashed ink brackets (45%), empty, under the replay's three other labels at 60% ink; one mono 12 ink "MISSING" above them | First run's board, columns at x 489, 638, 787; y Y + 24 to Y + 78; "MISSING" at (489, Y + 4) |
| Sequence labels | The order each run worked in | Mono 12 under each name label: first run "AI OUTLINE → WRITE" ("AI OUTLINE" grey, "WRITE" ink); replay "DEFINE PROBLEM → AI OUTLINE → WRITE" ("DEFINE PROBLEM" red) | (24, Y + 30) |
| Caption band | The words for each beat | Real text under the picture: a mono counter ("3 / 9") and the caption in Serif 22 ink. In beat 9: mono 13 ink "FACULTY CHECK" over the check in Serif italic 30, then directly under it at the same size and style, "To find out, line up the problem each paper defines." Fixed height on desktop, sized for both lines | Under the stage |
| Beat list | Text equivalent and navigation | Nine numbered captions with "On screen" lines (visible in reduced-motion, print and narrow views; always available to screen readers). The current beat has a navy rule | Under the controls |

**The problem lines.**

| Student | First run (every line in the frame "The rival") | Replay | Replay frame |
| --- | --- | --- | --- |
| 1 | The rival's loans | The rival's loans | THE RIVAL |
| 2 | The rival's ports | The rival's ports | THE RIVAL |
| 3 | The rival's media | The rival's media | THE RIVAL |
| 4 | The rival's arms | The partner's debts | THE PARTNER |
| 5 | The rival's trade | The partner's jobs | THE PARTNER |
| 6 | The rival's roads | The partner's voters | THE PARTNER |
| 7 | The rival's fleet | Our port access | OUR INTERESTS |
| 8 | The rival's grants | The cost of competing | THE COST |
| 9 | The rival's mines | The cost of overreach | THE COST |
| 10 | The rival's cables | Our cable links | OUR INTERESTS |

Three students frame it the same way in both runs. Student 10 works from the same evidence, cables, in both runs and defines a different problem in the replay.

**Narrow screens.** Whenever any picture text would render under 11 px (a stage narrower than about 880 px, so every phone and some tablets), the SVG collapses and the stacked text stage takes over on the same clock, with text at 13–16 px:
- *Top:* the task in one line, and a grey "AI" chip that gains "Each outline opened with: The rival's influence" in beat 6.
- *The first run's panel:* "The seminar" in red with its sequence line; ten small paper glyphs in a five-by-two grid (blank, then grey outlines, then ink layouts, with navy ticks in beat 3); "All drafted with AI". Under it, the board as text: in beats 4–6 the ten problem lines in two columns of five inside a bracket box, the underline, then the label "One frame: the rival", then "AI's frame: the rival".
- *From beat 7:* the first run's panel compacts, and the replay's panel sits under it with the same parts; each glyph shows its red problem line as a red bar. In beat 8 its board fills as four labelled groups in a two-by-two grid.
- *Beat 9:* "Missing: the partner · our interests · the cost" appears as three dashed chips under the first board.
- *Final frame:* the task, the AI chip, both panels with their boards, then the check (20 px at this width) and the controls. Fix the stage at its tallest beat and the caption band's height on phones, so the controls never move; the build checks the final frame against an 844 px phone.

## 4. Beats

Times are absolute seconds. In every beat the caption changes first (0.3 s fade) and nothing in the picture moves for the first second. A change the caption is about starts only after the caption can be read once, except a lead-in that the caption's first clause describes.

### Beat 1 · 0.0–8.0 s · A seminar, one task

- **On screen at the start:** an empty paper stage.
- **What moves:**
  1. 1.0–1.6: the task card fades in and rises 6 units at top right.
  2. 1.7–2.9: ten blank papers fade in with their red dots, one at a time in reading order (0.1 s apart, 0.3 s each). "The seminar" fades in in red above the grid.
  3. 2.9–8.0: hold.
- **Caption:** "Ten students in a seminar get the same strategy task."
- **Notice:** ten red dots, ten blank papers, one task. The task is open: it asks for a strategy and doesn't say what the problem is.
- **Why:** the setup names the situation before anything goes wrong.

### Beat 2 · 8.0–16.0 s · The outlines come back alike

- **What moves:**
  1. 9.0–9.4: the AI panel fades in at top left: a grey box marked "AI".
  2. 9.4–10.7: each dot pulses, and a thin ink line runs from it up to the AI panel, one after another (0.1 s apart, 0.4 s each). The lines fade as they arrive.
  3. 12.0–13.5: ten grey outlines drop from the AI panel into the ten papers, one after another (0.1 s apart, 0.6 s each). They share one pattern, with small differences in line lengths.
  4. 13.5–16.0: hold.
- **Caption:** "Each asks an AI for an outline. The outlines come back alike."
- **Notice:** ten requests go up; ten outlines come back that look like one another. Asking for an outline is ordinary help.
- **Why:** similar systems, prompts and defaults, shown as an ordinary step. The requests are the lead-in the first sentence describes; the outlines start 4.0 s in.

### Beat 3 · 16.0–25.5 s · Their own papers

- **What moves:**
  1. 17.0–19.6: the dots write over their outlines, one after another (0.2 s apart, 0.8 s each). In each paper the grey drains to ink as it takes its own layout: headings, bullets, a chart, a table, dense text, two columns, a numbered list, a pull quote, a timeline, a map. One grey row stays in each. Each paper's first line stays a short ink bar.
  2. 19.7–20.1: "ALL DRAFTED WITH AI" fades in under the grid, in grey.
  3. 21.0–23.2: a navy ring steps across the papers in reading order (0.2 s each), and each paper gets a small navy ✓ as the ring leaves it.
  4. 23.2–25.5: hold.
- **Caption:** "Each writes their own paper. Faculty read each one, and each holds up."
- **Notice:** ten papers that look nothing alike. Each student did real work, and each paper passes when faculty read it on its own. The AI's help is disclosed.
- **Why:** the surface variety is real, and no paper or student is at fault. The writing is the lead-in the first sentence describes; faculty's reading starts 5.0 s in.

### Beat 4 · 25.5–39.5 s · Faculty line up the problems (the turn, part 1)

- **What moves:**
  1. 26.5–26.9: the ticks fade, and "EACH PAPER'S PROBLEM" fades in at the right.
  2. 28.5–34.5: one at a time (0.6 s apart, 0.6 s each), a copy of each paper's first line lifts out, grows into words and settles in a list at the right, in Serif 16 ink: "The rival's loans", "The rival's ports", "The rival's media", "The rival's arms", "The rival's trade", "The rival's roads", "The rival's fleet", "The rival's grants", "The rival's mines", "The rival's cables". Each paper keeps its own line.
  3. 34.5–39.5: hold.
- **Caption:** "Then faculty line up the problem each paper defines."
- **Notice:** the papers stay where they are and stay different. Only their problem statements move, into one list, and the same two words open every line.
- **Why:** this is the faculty move and the mechanism at once: reading across the papers instead of through each one. The header is the lead-in; the lines start 3.0 s in and arrive at about reading pace. The long hold is for reading the list.

### Beat 5 · 39.5–48.0 s · One frame

- **What moves:**
  1. 40.5–41.1: the last word of each line (loans, ports, media …) brightens once, top to bottom.
  2. 43.2–44.4: a navy underline runs under "The rival's" in every line, top to bottom (0.1 s apart).
  3. 44.6–45.4: navy corner brackets joined by a hairline draw around the whole list, and "ONE FRAME: THE RIVAL" fades in under it.
  4. 45.4–48.0: hold.
- **Caption:** "Different details, one frame: every paper makes the rival the problem."
- **Notice:** each paper picked different evidence, and all ten defined the problem the same way. One bracket holds the whole seminar.
- **Why:** the common assumption at the level of problem definition, in words faculty can read. The details are the lead-in the first clause names; the underline starts 3.7 s in.

### Beat 6 · 48.0–56.5 s · Where the frame came from (the turn, part 2)

- **What moves:**
  1. 49.0–49.8: in the AI panel, a small outline sheet appears, and its opening line opens into words beside it: "EACH OUTLINE OPENED WITH" over "The rival's influence", in grey on the grey band.
  2. 52.0–52.8: the bracket around the list turns grey, and its label changes to "AI'S FRAME: THE RIVAL". At the same moment each paper's first line takes a grey band.
  3. 52.8–56.5: hold.
- **Caption:** "Each AI outline opened with that frame, and each student kept it."
- **Notice:** the shared frame is the AI's opening line. Each student kept it from their own outline and wrote everything else themselves. Nobody copied anybody.
- **Why:** this is the origin, shown after the pattern faculty can see. The outline's line is the lead-in the first clause describes; the bracket changes 4.0 s in.

### Beat 7 · 56.5–69.0 s · Replay with one change

- **On screen at the start:** the first run: the ten papers with grey-banded first lines, "All drafted with AI", and the list in its grey bracket.
- **What moves:**
  1. 57.5–58.7: the first run moves into the top half and shrinks: the papers to 60%, the list to Serif 12.4 as the first column of a board, with "THE RIVAL" at its top and "AI'S FRAME" under it. The AI panel and task card stay. "The seminar" and "AI OUTLINE → WRITE" settle at its top left.
  2. 58.8–59.4: the replay fades in below: "The same seminar, replayed", ten red dots and ten blank papers in the same grid.
  3. 61.5–63.0: each dot in the replay writes a short red line at the top of its blank paper, one after another (0.1 s apart, 0.6 s each). "DEFINE PROBLEM" appears in red as the start of its sequence label.
  4. 63.2–64.2: each dot sends a request line up to the AI panel, one after another.
  5. 64.3–65.6: grey outlines drop into the papers, each under its red line. "→ AI OUTLINE" appears in grey.
  6. 65.7–67.5: the dots write. Each paper takes a layout from the same ten kinds, in a different order, and keeps one grey row and its red line. "→ WRITE" appears, and "ALL DRAFTED WITH AI" appears under the grid.
  7. 67.5–69.0: hold.
- **Caption:** "Replay the seminar with one change: each student defines the problem before asking the AI."
- **Notice:** the same ten students, the same task and the same AI. The only new step is the red line each writes first. Then they ask the AI and write, as before.
- **Why:** this is the one difference, and the AI is still in the work. The block move and the replay's arrival are the lead-in "Replay the seminar" describes; the red lines start 5.0 s in.

### Beat 8 · 69.0–82.5 s · Lined up again

- **What moves:**
  1. 70.0–70.6: both grids of papers brighten once together.
  2. 73.0–78.0: one at a time (0.5 s apart, 0.5 s each), a copy of each replay paper's red line lifts out, turns ink as it travels, and settles in its column on the replay's board, in student order. Each column's label fades in with its first line: "THE RIVAL" ("The rival's loans", "The rival's ports", "The rival's media"), "THE PARTNER" ("The partner's debts", "The partner's jobs", "The partner's voters"), "OUR INTERESTS" ("Our port access", "Our cable links"), "THE COST" ("The cost of competing", "The cost of overreach").
  3. 78.2–79.0: navy brackets draw around each of the four groups.
  4. 79.0–82.5: hold.
- **Caption:** "The papers look just as varied. Faculty line up the problems again."
- **Notice:** the two grids look equally varied, so the papers can't tell the runs apart. Lined up, the replay's problems sort by their first words into four frames. The rival is still one of them, and the largest.
- **Why:** this is the contrast: the same lineup, done the same way, finds four frames where the first run had one. The brightening is the lead-in the first sentence describes; the lines start 4.0 s in.

### Beat 9 · 82.5–90.0 s · The faculty check

- **What moves:**
  1. 82.5–82.7: caption 8 fades out.
  2. 82.7–83.3: the faculty check rises into the caption band: "FACULTY CHECK" in navy mono, then the question in large italic.
  3. 85.2–86.0: on the first run's board, three dashed, empty brackets fade in beside "THE RIVAL", under the labels "THE PARTNER", "OUR INTERESTS" and "THE COST", with "MISSING" above them.
  4. 86.2–86.7: directly under the check, at the same size, "To find out, line up the problem each paper defines."
  5. 86.7–90.0: hold. At 90.0 the player shows Replay and the figure rests on this frame.
- **Caption:** "Faculty check: What frames are missing across the seminar?" Second line, same size: "To find out, line up the problem each paper defines."
- **Notice:** the first run's three missing frames sit directly above the replay's three filled ones. The second line is the move faculty made twice.
- **Why:** the figure ends on the check and the move an educator can make. The missing frames appear 2.5 s after the check begins to rise, once it can be read.

## 5. Final frame

The still at 90.0 s. It is also the reduced-motion view, the print view and the poster (stage plus caption band).

**Stage:**
- **Top left:** the grey AI panel: "AI", then "EACH OUTLINE OPENED WITH" over "The rival's influence" on a grey band, beside a small outline sheet.
- **Top right:** the task card, "EXAMPLE TASK" over "Recommend a strategy as a rival courts a partner country."
- **Top block:** red "The seminar" over "AI OUTLINE → WRITE" ("AI OUTLINE" grey). Ten small papers in ten different layouts, each with a red dot and a grey-banded first line; "ALL DRAFTED WITH AI" under them. At right, the board:
  - first column, under "THE RIVAL", a grey bracket around ten ink lines, "The rival's loans" through "The rival's cables", with grey "AI'S FRAME" under it;
  - three dashed, empty brackets under "THE PARTNER", "OUR INTERESTS" and "THE COST" at 60% ink, with "MISSING" above them.
- **Bottom block:** red "The same seminar, replayed" over "DEFINE PROBLEM → AI OUTLINE → WRITE" ("DEFINE PROBLEM" red, "AI OUTLINE" grey). Ten small papers, just as varied, each with a red dot and a red first line; "ALL DRAFTED WITH AI". At right, four navy brackets with their ink lines:
  - "THE RIVAL": the rival's loans, the rival's ports, the rival's media;
  - "THE PARTNER": the partner's debts, the partner's jobs, the partner's voters;
  - "OUR INTERESTS": our port access, our cable links;
  - "THE COST": the cost of competing, the cost of overreach.

**Caption band:**

> FACULTY CHECK *(navy mono)*
> *What frames are missing across the seminar?* *(Serif italic, about 30 px)*
> *To find out, line up the problem each paper defines.* *(Serif italic, same size as the line above)*

**In the reduced-motion and print views,** all nine captions and their "On screen" lines are readable below the controls. Clicking a beat shows its settled still.

**At 390 px** the final frame is the stacked text stage: the task, the AI chip, both panels with their boards, then the check and the controls.

**What the still says alone:** the same ten students, with the same AI, wrote two sets of papers that look equally varied. In the first, every problem line starts "The rival's", inside one grey bracket marked as the AI's frame, the frame every outline opened with; three frames sit empty and dashed. In the replay, where each student defined the problem before asking the AI, the problems fill four frames, the rival among them. The lines under the picture ask what is missing and say how to find out.

## 6. Standalone page copy

**Title:** Institutional monoculture

**Kicker:** Failure mode 6 of 7

**Setup:**

Ten students in a seminar each use an AI to help write the same strategy paper. Each writes their own, and each paper holds up when read alone. *The Irreducible Officer* calls what can still go wrong institutional monoculture: shared systems and defaults narrow the range of frames available to the class. The seminar, the task and the papers are a constructed example.

**Figure summary** (visually hidden, for screen readers): An animated figure. Ten red dots stand for ten students in a seminar with an example task: recommend a strategy as a rival courts a partner country. Each student asks an AI for an outline, and ten grey outlines come back alike. Each student writes their own paper over it, in ten different layouts, all marked "All drafted with AI". Faculty read each paper and tick it. Then faculty line up the one-line problem statement from every paper: the rival's loans, the rival's ports, the rival's media, the rival's arms, the rival's trade, the rival's roads, the rival's fleet, the rival's grants, the rival's mines, the rival's cables. An underline runs under "The rival's" in every line, and one bracket closes around all ten, labelled "One frame: the rival". The AI panel then shows that each outline opened with "The rival's influence", and the bracket turns grey: "AI's frame". The seminar is replayed with one change: each student writes the problem in red before asking the AI. They ask the AI and write as before, and their papers look just as varied. Lined up, the replay's problems fall into four frames: the rival (the rival's loans, ports and media), the partner (the partner's debts, jobs and voters), our interests (our port access, our cable links) and the cost (the cost of competing, the cost of overreach). Beside the first run's single frame, three dashed, empty frames appear under "Missing": the partner, our interests and the cost. The figure ends on the faculty check. Each beat is listed below with what is on screen.

**Beat list (text equivalent):**

1. **Ten students in a seminar get the same strategy task.** *On screen:* a task card appears at the top right: "Example task. Recommend a strategy as a rival courts a partner country." Ten blank papers appear in two rows of five, each with a red dot, labelled "The seminar".
2. **Each asks an AI for an outline. The outlines come back alike.** *On screen:* a grey box marked AI appears at the top left. A line runs from each dot up to it, and ten grey outlines drop back into the papers, all with the same pattern.
3. **Each writes their own paper. Faculty read each one, and each holds up.** *On screen:* each dot writes over its outline, and each paper turns to ink in its own layout: headings, bullets, a chart, a table, dense text, two columns, a numbered list, a pull quote, a timeline, a map. "All drafted with AI" appears under them. A navy ring steps across the papers and leaves a tick on each.
4. **Then faculty line up the problem each paper defines.** *On screen:* under "Each paper's problem", the first line of each paper lifts out and joins a list at the right: the rival's loans, the rival's ports, the rival's media, the rival's arms, the rival's trade, the rival's roads, the rival's fleet, the rival's grants, the rival's mines, the rival's cables. The papers stay where they are.
5. **Different details, one frame: every paper makes the rival the problem.** *On screen:* an underline runs under "The rival's" in every line, and a bracket closes around all ten, labelled "One frame: the rival".
6. **Each AI outline opened with that frame, and each student kept it.** *On screen:* in the AI box, "Each outline opened with: The rival's influence" appears in grey. The bracket turns grey and reads "AI's frame: the rival", and each paper's first line takes a grey band.
7. **Replay the seminar with one change: each student defines the problem before asking the AI.** *On screen:* the first run moves to the top half, labelled "The seminar: AI outline, write". Below it, "The same seminar, replayed" appears with ten blank papers. Each dot writes a red first line; then each asks the AI, outlines arrive under the red lines, and each writes its paper. Its label reads "Define problem, AI outline, write", and its papers are marked "All drafted with AI".
8. **The papers look just as varied. Faculty line up the problems again.** *On screen:* the replay's problem lines move into four labelled columns: the rival (the rival's loans, ports, media), the partner (the partner's debts, jobs, voters), our interests (our port access, our cable links), and the cost (the cost of competing, the cost of overreach). A bracket closes around each group.
9. **Faculty check: What frames are missing across the seminar? To find out, line up the problem each paper defines.** *On screen:* the questions appear under the picture at the same size. On the first run's board, three dashed, empty frames appear under "Missing": the partner, our interests, the cost.

**Faculty check:** What frames are missing across the seminar?
**To find out, line up the problem each paper defines.** (same size)

Read one at a time, every paper in the first run holds up, and the papers look nothing alike. Lined up, they share one problem definition, the one the AI's outlines opened with. Lining up the problems shows how many frames a seminar has. Naming the missing ones takes faculty judgment, or students who define the problem before they open the AI, the order the essay's foundation pilot uses (Section IX). In the room, faculty can also ask the class for other ways to define the problem before discussion settles on one. The companion's failure-mode lab adds a fair objection: convergence can reflect a justified shared purpose or strong evidence, and difference isn't better by itself. A seminar can compare several frames and still agree on one.

**From the essay** (*The Irreducible Officer*, Section II, What the Problem Looks Like):

> **Institutional monoculture** is the class-level version of the same problem. When many students use similar systems, similar prompts, and similar defaults, the range of strategic frames available to a seminar narrows. AI can create a surface appearance of diversity (different arguments, different structures, different evidence) while reproducing common assumptions at the level of problem definition. Research into the diversity of AI-generated ideas finds that language models aggregate knowledge into a unified distribution in ways that human cognition does not: people exhibit knowledge partitioning, each occupying a distinct semantic region, in ways that independent AI samples do not replicate ([Deng, Brucks & Toubia, 2026](https://arxiv.org/abs/2602.20408)). Post-training alignment compounds this further, compressing the distribution of outputs toward the statistical center ([Murthy, Ullman & Hu, 2024](https://arxiv.org/abs/2411.04427)). Pedagogical research on LLM integration in higher education frames this compression as epistemic narrowing: the constraining of students' exposure to diverse, ambiguous, or contested knowledge by tools optimized for convergence and fluency ([Vendrell & Johnston, 2026](https://doi.org/10.1016/j.caeai.2026.100572)). In a war college seminar, that compression raises a serious possibility: the same systems that help students produce stronger work may also narrow the range of strategic imagination the seminar is meant to develop.

**The evidence.** The essay cites three lines of research for this failure mode: Deng, Brucks & Toubia (2026) on language models aggregating knowledge where people partition it; Murthy, Ullman & Hu (2024) on alignment compressing outputs toward the statistical center; and Vendrell & Johnston (2026) on epistemic narrowing. Workplace studies the essay doesn't cite point the same way, within limits:
- Doshi & Hauser (Science Advances, 2024) found that AI story ideas made individual stories better rated and made the stories more similar to one another. It measured stories, not strategies.
- Kim, Garg, Peng & Garg (ICML, 2025) and Jiang et al. (NeurIPS, 2025) found that when two models both get a question wrong they usually give the same wrong answer, and that different vendors give strikingly similar open-ended answers. Asking a second model is not an independent check.
- Against these, Terwiesch et al. (Production and Operations Management, 2026) found that better prompting, assigned personas and pooling several vendors brought the diversity of AI-generated ideas close to human levels. Sameness is the default, and escaping it takes deliberate design.

**Links:**
- Book chapter: Refuse the garden path → `../../book-v0/four-moves-book.html?spread=4`
- In the same chapter: Premature synthesis → `../premature-synthesis/`
- Practice: test institutional monoculture with your AI assistant → `https://judgmentlab.net/#companion`
- Essay: Section II, What the Problem Looks Like → `https://judgmentlab.net/#ii-what-the-problem-looks-like`
- Essay: Section IX, A Foundation Pilot → `https://judgmentlab.net/#ix-a-foundation-pilot`

## 7. Pacing table

Reading time is caption words ÷ 3. The beat total is lead + motion + hold, and every total is at least twice the caption's reading time. Picture words are new words inside the picture; words already on screen, such as the replay's three lines that match the first run's and labels that repeat, aren't counted again. The reading budget is caption plus picture words divided by the beat's length, and stays at 3 words a second or less. Lead is the time before the first movement; motion runs from the first movement to the last, including any pause for reading inside it.

| Beat | Time (s) | Caption words | Reading (s) | 2× (s) | Picture words | Budget (words/s) | Lead (s) | Motion (s) | Hold (s) | Total (s) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · A seminar, one task | 0.0–8.0 | 10 | 3.3 | 6.7 | 14 | 3.0 | 1.0 | 1.9 | 5.1 | 8.0 |
| 2 · The outlines come back alike | 8.0–16.0 | 12 | 4.0 | 8.0 | 1 | 1.6 | 1.0 | 4.5 | 2.5 | 8.0 |
| 3 · Their own papers | 16.0–25.5 | 13 | 4.3 | 8.7 | 4 | 1.8 | 1.0 | 6.2 | 2.3 | 9.5 |
| 4 · Faculty line up the problems | 25.5–39.5 | 9 | 3.0 | 6.0 | 33 | 3.0 | 1.0 | 8.0 | 5.0 | 14.0 |
| 5 · One frame | 39.5–48.0 | 11 | 3.7 | 7.3 | 4 | 1.8 | 1.0 | 4.9 | 2.6 | 8.5 |
| 6 · Where the frame came from | 48.0–56.5 | 12 | 4.0 | 8.0 | 9 | 2.5 | 1.0 | 3.8 | 3.7 | 8.5 |
| 7 · Replay with one change | 56.5–69.0 | 15 | 5.0 | 10.0 | 9 | 1.9 | 1.0 | 10.0 | 1.5 | 12.5 |
| 8 · Lined up again | 69.0–82.5 | 12 | 4.0 | 8.0 | 29 | 3.0 | 1.0 | 9.0 | 3.5 | 13.5 |
| 9 · Faculty check | 82.5–90.0 | 7 + 10 second line | 2.3 + 3.3 | 4.7 (check) | 1 | 2.4 | 0.0 | 4.2 | 3.3 | 7.5, then rests |
| **Total** | | **111** | **37.0** | | **104** | | **8.0** | **52.5** | **29.5** | **90.0** |

Checks:
- One idea per beat; movements run one after another. A row of ten (dots, requests, outlines, papers, lines) runs as one staggered movement.
- Changes a caption names wait until it can be read once: the outlines (beat 2, 4.0 s in), faculty's reading (beat 3, 5.0 s), the problem lines (beat 4, 3.0 s), the underline (beat 5, 3.7 s), the grey bracket (beat 6, 4.0 s), the replay's red lines (beat 7, 5.0 s), the replay's lines (beat 8, 4.0 s), the missing frames (beat 9, 2.5 s after the check begins to rise) and the second line (3.5 s after).
- Lead-ins the caption's first clause describes start early, as in figures 1–5: the requests (beat 2), the writing (beat 3), the board header (beat 4), the details brightening (beat 5), the outline's opening line (beat 6), the block move and the replay's arrival (beat 7), and the grids brightening (beat 8).
- Problem lines arrive at about reading pace: ten lines of three words in 6.0 s in beat 4, then a 5.0 s hold; ten lines in 5.0 s in beat 8, where three repeat the first run, then a 3.5 s hold that runs on into beat 9.
- Every hold is at least 1.5 s. Beat 1 holds longer for the task card; beat 4 for the list.
- No camera moves. The first run moves once (beat 7). Reduced motion shows the final frame.
- Total 90.0 s.
