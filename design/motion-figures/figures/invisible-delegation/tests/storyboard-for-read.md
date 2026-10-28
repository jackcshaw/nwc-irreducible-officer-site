# Invisible delegation: storyboard

Motion figure 5 of 8 · slug `invisible-delegation` · storyboard round 4, revised after figure cold read 1 · October 28, 2026

*Cold-read copy. The Intent section is removed.*

## 2. Scenario

A war-college student wants to improve a draft paper recommending whether to keep a forward base. The task card carries the course rubric: evidence must back the call. The student asks an AI for feedback, then a better structure, then a more strategic version. They work through every note and revise after each request, through four drafts. Each request names only the kind of help. Each carries a decision to the AI: the criteria, the argument, what "strategic" means. A second student, with the same task, starts from the rubric. Before each request, they write the decision down, then ask for the same help: "against my criteria", "for my argument", "as I define it". Both get the same AI notes. The second turns one down, "Be more decisive", writing "if the evidence is". Both papers come back revised with AI and look alike. Faculty, who have only the papers, ask each student "Better by whose standard?" The first says "The AI's notes, I suppose. I worked through what it flagged." The second says "Mine, set first from the rubric: does the evidence back my call?"

*Sources.* The task, the rubric, the notes, the requests, the papers and both answers are constructed for this figure, and the task card says "Example task". *The Irreducible Officer*, Section II, defines invisible delegation and supplies the request pairs. Section V describes structured prompting with explicit purpose and evaluation criteria. The figure shows no numbers.

## 3. Cast and grammar

**The colour rule.**
- *Grey* is what the AI supplied: its notes, the headings and paragraph it adds to each paper, the "Revised with AI" tags, "THE AI DECIDES", the decisions it makes, and the unsaid words.
- *Red* is what a student decided, plus the dots, their name labels and "THE STUDENT DECIDES": the second student's three decisions, the words in their requests that state them, the pointers, and their strike and reason.
- *Navy ink* is the page: the task and rubric, the students' own writing, draft counters and ticks, their requests, "REQUESTS", "UNSAID" and the key, undecided card labels, the dividers, faculty's question and both spoken answers.
- *Dashed* means nobody has decided, or, for the ghost box, nobody said it. An empty slot is a faint outline with "—".

**Palette and type.** Paper `#f6f1e8`, paper-bright `#fffdfa`, ink `#0a2242`, machine grey `#5b564f` with a `#ded5c4` band, red `#b81b2b`. Source Serif 4 for the task, notes, requests, speech and captions; Source Sans 3 for card and name labels; IBM Plex Mono for small labels. Key evidence (notes, ticks, the struck note and reason, UNSAID tags, unsaid words and quotes) is 15 units; the smallest text is 12 units.

**Stage.** An SVG with a 960 × 540 viewBox. One view, no camera moves.
- *Top band:* the task card at left (x 24–424, y 14–98). From beat 9, faculty's question at right (x 724).
- *Student blocks* (x 24–712), each about 200 units tall. The first student's block sits at block top Y = 168 for beats 1–5, then slides up to Y = 108. The second student's block appears at Y = 330 in beat 6.
- *Inside a block:*
  - the dot's home (30, Y + 7), beside the red name label at (42, Y + 12);
  - the paper (x 24–96, Y + 22 to Y + 92), with "DRAFT n" and "REVISED / WITH AI" beside it at x 104;
  - the notes card (x 24–174, Y + 100 to Y + 200);
  - three lanes: student x 178–332, requests x 346–548, AI x 558–712, with dividers at x 338 and x 552.
- *Rows:* row k has its cards at Y + 44 + 58k. Its quote's baseline is Y + 56 + 58k. The second student's second quote line, or the first student's unsaid line, sits 18–20 units below.
- *Right column* (x 724–936): from beat 9, each student's spoken answer beside their block.

| Element | Stands for | How it looks |
| --- | --- | --- |
| Task card | The assignment and course standard | Mono 12 "EXAMPLE TASK"; Serif 16 "Recommend whether to keep a forward base."; mono 12 "RUBRIC ·" and Serif italic 15 "Evidence must back the call." In beat 6 the rubric line grows to 130% on a navy highlight (9%) and gets an underline; in beat 7 it returns to size with the underline at 40% |
| Red dot and name | A student | Solid red circle, radius 5, at home beside a red Sans 600 13 name: "First student" / "Second student" |
| Paper | The draft, then what faculty receive | A small sheet with an ink title bar and seven rows; four rows turn into the AI's grey text (two headings, a two-row paragraph). Beside it: ink mono "DRAFT 2/3/4" and grey mono "REVISED / WITH AI" |
| Notes card | The AI's feedback | Grey band card: mono 12 "AI'S NOTES", then Serif 15 grey "Tighter opening", "Add the costs", "Be more decisive". Ink ✓ (15) before each note acted on. A struck note gets a red line and a red Serif italic 15 reason underneath |
| Lanes | The ledger | Navy hairline dividers; mono 12 headings "THE STUDENT DECIDES" (red), "REQUESTS" (ink), "THE AI DECIDES" (grey) |
| Decision cards | The three decisions | 154 × 30, Sans 600 13: "The criteria", "How the argument runs", "What “strategic” means". Dashed when undecided; grey band when the AI decided; red outline and label when a student decided, with a short bar drawn under the label |
| Empty slot | No decision here | Faint outline with a centred "—" |
| Request bubble | What a student asks | Paper-bright rounded box with a tail, Serif 14. A first-student bubble clips onto its card, and the two travel together |
| Quote line | A delivered request | Serif italic 15 in quotation marks; the second student's red words stay red, with a red pointer back to the card |
| Unsaid line | What a first-student request left out | Mono 15 ink "UNSAID", then grey Serif italic 15 words in a dashed ghost box (no fill): "against your criteria", "for your argument", "as you define it" |
| Unsaid key | What the ghost box means | Dashed swatch and mono 13 "LEFT UNSAID", beside "REQUESTS" |
| Faculty | The question | Mono 12 "FACULTY ASK" over Serif italic 19 "Better by whose standard?" |
| Speech panels | What each student says | Paper-bright box with a tail, the student's name in red Sans 600 13, then Serif 15 ink words appearing at about 3 words a second |
| Caption band, beat list | As in figures 1–4 | Counter "3 / 10"; the check in beat 10 with the second line at the same size |

**The requests.**

| Decision | First student | Left unsaid (beat 5) | Second student |
| --- | --- | --- | --- |
| The criteria | "Give me feedback" | against your criteria | "Give me feedback **against my criteria**" |
| How the argument runs | "Suggest a better structure" | for your argument | "Suggest a better structure **for my argument**" |
| What "strategic" means | "Make it more strategic" | as you define it | "Make it more strategic, **as I define it**" |

**The answers** to "Better by whose standard?" First student: "The AI's notes, I suppose. I worked through what it flagged." Second student: "Mine, set first from the rubric: does the evidence back my call?"

**Narrow screens.** Whenever any picture text would render under 11 px (a stage narrower than about 880 px), the SVG collapses and the stacked text stage takes over, driven by the same clock, at 12–16 px:
- *Top:* the task and rubric (highlighted and larger during the rubric beat, then underlined), and from beat 9 "Faculty ask: Better by whose standard?"
- *Two columns,* the students side by side. Each column has the name and draft counter, "Revised with AI", the AI's notes (ticked or struck, with the reason), and one cell per decision:
  - the request, shown when it's asked;
  - for the first student from the turn, "UNSAID" and the words in a dashed box, with a "Left unsaid" key above the cells;
  - a chip naming the decision and who decides it ("Undecided", "AI decides", "Student decides").
  - The spoken answer comes last, from beat 9.
- The stage holds its tallest moment's height. At 390 px the final frame, check and controls measure 828 px.

## 4. Beats

Times are absolute seconds. In every beat the caption changes first (0.3 s fade) and nothing in the picture moves for the first second. A change the caption is about starts only after the caption can be read once, except a lead-in that the caption's first clause describes.

### Beat 1 · 0.0–8.7 s · The draft
- **Moves:** 1.0–1.6 the task card fades in at top left. 1.7–2.1 the red dot and "First student" appear together. 2.2–2.8 the draft paper fades in. 3.0–3.4 the rubric line fades in. Hold.
- **Caption:** "A student wants to improve a draft strategy paper."
- **Notice:** the red dot is the student, named beside it. The task card carries the course's standard.

### Beat 2 · 8.7–16.7 s · Three decisions
- **Moves:** 9.7–10.3 the dividers and lane headings. 10.5–11.9 three dashed cards, one at a time, in the student's lane. 12.0–12.4 three empty slots in the AI's lane. Hold.
- **Caption:** "Improving it takes many decisions. We'll track three."
- **Notice:** the decisions start in the student's lane, dashed. The ledger is ours.

### Beat 3 · 16.7–29.0 s · Feedback: the request carries the criteria
- **Moves:**
  1. 17.7–18.1: the dot moves from its home to the criteria row.
  2. 18.1–18.5: it pulses, and the bubble "Give me feedback" grows and clips onto the criteria card.
  3. 21.0–23.4: one slow movement carries the bubble and card together into the AI's lane, where the card turns grey. An empty slot marks where it was.
  4. 23.5–24.0: the bubble settles in the requests lane as a quote.
  5. 24.1–24.5: the notes card appears.
  6. 24.6–26.5: the dot ticks the three notes, 0.6 s apiece.
  7. 26.5–27.1: "DRAFT 2" and "REVISED WITH AI" appear.
  8. 27.1–27.5: the dot goes home.
  9. Hold 1.5 s.
- **Caption:** "The student asks an AI for feedback. The request carries the criteria across."
- **Notice:** a decision moves, in full view, into "THE AI DECIDES". The student works through every note.

### Beat 4 · 29.0–41.1 s · Structure and strategy
- **Moves:**
  1. 30.0–30.7: the dot moves to the second row, and "Suggest a better structure" grows and clips onto "How the argument runs".
  2. 32.4–33.8: they travel across, and the card turns grey.
  3. 33.9–34.4: the bubble settles as a quote.
  4. 34.5–34.9: grey headings appear in the paper.
  5. 35.0–35.6: the dot works over the paper; "DRAFT 3".
  6. 35.7–36.1: "Make it more strategic" grows and clips onto "What “strategic” means".
  7. 36.2–37.6: they travel across, and the card turns grey.
  8. 37.7–38.2: the bubble settles as a quote.
  9. 38.3–38.7: a grey paragraph appears in the paper.
  10. 38.8–39.6: the dot works over the paper; "DRAFT 4"; the dot goes home.
  11. Hold 1.5 s.
- **Caption:** "Then for a better structure, and a more strategic version."
- **Notice:** all three decisions are now in the AI's lane. The student revised after every request.

### Beat 5 · 41.1–50.6 s · What the requests left out (the turn)
- **Moves:** 42.5–43.0 the three quotes pulse. 45.4–45.8 the key "LEFT UNSAID". 45.9–47.3 under each quote, one after another, "UNSAID" and the words in a dashed box. 47.5–48.1 the grey cards pulse. Hold 2.5 s.
- **Caption:** "Each request left out whose standard to use. The AI used its own."
- **Notice:** each request named only the kind of help. What it left out, the AI filled with its own standard: the grey cards.

### Beat 6 · 50.6–58.0 s · A second student starts from the rubric
- **Moves:**
  1. 51.6–52.8: the first student's block slides up.
  2. 52.9–53.5: the second student's block fades in below: name and dot, draft, lanes, dashed cards, empty slots.
  3. 54.3–54.9: the dot travels up the left margin to the task card, beside the rubric line.
  4. 54.9–55.4: the rubric line grows to 130% on a navy highlight and is underlined.
  5. 55.4–58.0: hold, 2.6 s.
- **Caption:** "A second student, with the same task, starts from the rubric."
- **Notice:** the same rubric the first student had, enlarged: evidence must back the call.

### Beat 7 · 58.0–69.2 s · Before each request, a decision
- **Moves:**
  1. 59.0–59.4: the rubric line returns to size, its underline staying at 40%.
  2. 61.3–61.8: the dot comes down to "The criteria".
  3. 61.8–62.3: the dot writes the card red.
  4. 62.45–62.8: back at the row, it asks "Give me feedback against my criteria".
  5. 62.9–63.5: the request settles as a quote with a red pointer to the card.
  6. 63.6–65.45: the same for "How the argument runs" and "Suggest a better structure for my argument".
  7. 65.55–67.4: the same for "What “strategic” means" and "Make it more strategic, as I define it".
  8. 67.4–67.7: the dot goes home.
  9. Hold 1.5 s.
- **Caption:** "Before each request, the second student writes the decision down."
- **Notice:** write, then ask, three times. All three cards stay red in the student's lane; the AI's lane stays empty.

### Beat 8 · 69.2–79.0 s · The same notes, one turned down
- **Moves:**
  1. 70.2–70.6: the same notes card appears under the second paper.
  2. 70.7–72.1: the dot ticks "Tighter opening" and "Add the costs".
  3. 73.4–73.8: it strikes "Be more decisive" in red.
  4. 74.0–74.7: it writes the reason underneath in red: "if the evidence is".
  5. 74.8–75.1: "DRAFT 2" and "REVISED WITH AI" appear.
  6. 75.2–77.5: the grey headings and paragraph appear as the student revises to draft 4.
  7. Hold 1.5 s.
- **Caption:** "Both get the same AI notes. The second student turns one down."
- **Notice:** the same three notes; one is struck, with a reason that comes from the rubric.

### Beat 9 · 79.0–94.0 s · Faculty ask
- **Moves:**
  1. 80.0–81.0: the ledgers and notes dim to 15%; papers, counters and tags stay.
  2. 83.0–83.5: "FACULTY ASK / Better by whose standard?" appears at top right.
  3. 83.7–87.8: the first student's panel opens, named in red, and the words appear: "The AI's notes, I suppose. I worked through what it flagged."
  4. 88.1–92.5: the second student's panel, the same way: "Mine, set first from the rubric: does the evidence back my call?"
  5. Hold 1.5 s.
- **Caption:** "Faculty have only the papers. They ask each student about the standard."

### Beat 10 · 94.0–101.6 s · The faculty check
- **Moves:** 94.2–94.8 the check rises. 97.5–98.5 the ledgers and notes return. 98.7–99.2 the second line, at the same size. Hold; the figure rests at 101.6 s.
- **Caption:** "Faculty check: What did the AI decide for the student?" / "To find out, ask each student: better by whose standard?"

## 5. Final frame

The still at 101.6 s: the reduced-motion view, the print view and the poster.

- **Top band:** the task card with the rubric line underlined at 40%; at right, "FACULTY ASK / Better by whose standard?"
- **First student:**
  - Paper at draft 4, revised with AI.
  - Notes, all three ticked.
  - Three empty slots in their lane.
  - Three plain requests, each over an "UNSAID" line in a dashed box, with the "LEFT UNSAID" key.
  - Three grey cards in the AI's lane.
  - At right, their named answer.
- **Second student:**
  - Paper at draft 4, revised with AI.
  - Notes with two ticked and "Be more decisive" struck over "if the evidence is".
  - Three red cards in their lane.
  - Three requests with red words and pointers.
  - Three empty slots in the AI's lane.
  - At right, their named answer.
- **Caption band:** FACULTY CHECK / *What did the AI decide for the student?* / *To find out, ask each student: better by whose standard?* (same size).

**What the still says alone:** the same task, rubric and AI notes for two students, and two papers that look alike. One student's requests left whose standard unsaid; all three decisions sit with the AI, and they took every note. The other's decisions sit in their own lane, each request points to one, and they turned down a note that didn't serve the rubric. Asked whose standard, one names the AI's notes and the other names their own, from the rubric.

## 6. Standalone page copy

**Title:** Invisible delegation · **Kicker:** Failure mode 5 of 7

**Setup:** A student asks an AI for feedback on a draft paper, then a better structure, then a more strategic version, and revises after each. *The Irreducible Officer* calls what can happen next invisible delegation: a request for help transfers criteria, structure or meaning, and the student doesn't notice. The task, the rubric, the requests and both students are a constructed example.

**Beat list:** the ten captions above, each with an "On screen" line (in `invisible-delegation.js`).

**Faculty check:** What did the AI decide for the student? / **To find out, ask each student: better by whose standard?** Then the paragraph on the page: a student who didn't notice can honestly answer "nothing"; the second line is a question they can answer. It closes with the essay's follow-ups and the lab's fair objection.

**From the essay:** the Section II paragraph in full, and Section V's two sentences on minimal-context and structured prompting.

**Links:** Frame the problem (book), Frame capture, Practice, Essay Sections II and V.

## 7. Pacing table

| Beat | Time (s) | Caption words | Picture words | Budget (words/s) | Hold (s) | Total (s) |
| --- | --- | --- | --- | --- | --- | --- |
| 1 · The draft | 0.0–8.7 | 9 | 17 | 3.0 | 5.3 | 8.7 |
| 2 · Three decisions | 8.7–16.7 | 8 | 16 | 3.0 | 4.3 | 8.0 |
| 3 · Feedback | 16.7–29.0 | 13 | 18 | 2.5 | 1.5 | 12.3 |
| 4 · Structure and strategy | 29.0–41.1 | 10 | 10 | 1.7 | 1.5 | 12.1 |
| 5 · What the requests left out | 41.1–50.6 | 13 | 15 | 2.9 | 2.5 | 9.5 |
| 6 · Starts from the rubric | 50.6–58.0 | 11 | 2 | 1.8 | 2.6 | 7.4 |
| 7 · Before each request | 58.0–69.2 | 10 | 21 | 2.8 | 1.5 | 11.2 |
| 8 · The same notes, one turned down | 69.2–79.0 | 12 | 4 | 1.6 | 1.5 | 9.8 |
| 9 · Faculty ask | 79.0–94.0 | 12 | 33 | 3.0 | 1.5 | 15.0 |
| 10 · Faculty check | 94.0–101.6 | 8 + 10 | 0 | 2.4 | 2.4 | 7.6, then rests |
| **Total** | | **116** | **136** | | | **101.6** |

Checks: every caption-named change waits until the caption can be read once (crossing 4.3 s; beat 4's first crossing 3.4 s; unsaid lines 4.3 s; rubric visit 3.7 s; first decision 3.3 s; strike 4.2 s; faculty question 4.0 s). The first crossing is one slow 2.4 s movement. Every hold is at least 1.5 s, and the rubric holds 2.6 s. Spoken words appear at about 3 words a second. Reduced motion shows the final frame.
