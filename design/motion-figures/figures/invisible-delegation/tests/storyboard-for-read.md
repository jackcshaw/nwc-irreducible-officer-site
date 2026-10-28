# Invisible delegation: storyboard

Motion figure 5 of 8 · slug `invisible-delegation` · storyboard round 2, revised after storyboard cold read 1 · October 27, 2026

*Cold-read copy. The Intent section is removed.*

## 2. Scenario

A war-college student wants to improve a draft paper recommending whether to keep a forward base open. They ask an AI for feedback, then a better structure, then a more strategic version, and revise after each, through four drafts. Each request names only the kind of help. Each carries a decision to the AI: the criteria, the argument, what "strategic" means. A second student writes each of those decisions down first, then asks for the same three things, saying "against my criteria", "for my argument" and "as I define it", and gets just as much help. Both papers come back revised with AI. Faculty, who have only the papers, ask each student "Better by whose standard?" The first says "The AI's, I suppose. I'm not sure what good looks like here." The second says "Mine. I set it first: does the evidence back my call?"

*Sources.* The task, the requests, the papers and both answers are constructed for this figure, and the task card says "Example task". *The Irreducible Officer*, Section II, defines invisible delegation and supplies the request pairs: feedback and criteria, a better structure and the argument, a more strategic version and the meaning of strategic. Section V describes structured prompting with explicit purpose and evaluation criteria, which the second student follows. The figure shows no numbers.

## 3. Cast and grammar

**The colour rule.**
- *Grey* is what the AI supplied: its notes, the headings and paragraph it adds to each paper, the "Revised with AI" tags, "THE AI DECIDES", the decisions it makes, and the unsaid part of each of the first student's requests.
- *Red* is what a student decided, plus the dots, their name labels and "THE STUDENT DECIDES": the second student's three decisions, the words in their requests that state them, and the pointers back to the cards.
- *Navy ink* is the page: the task, the students' own writing and draft counters, their requests, "REQUESTS", the card labels while undecided, the dividers, faculty's question and both spoken answers.
- *Dashed* means nobody has decided. An empty slot is a faint outline with "—".

**Palette.** Paper `#f6f1e8`, paper-bright `#fffdfa`, ink `#0a2242`, machine grey `#5b564f` with a `#ded5c4` band behind AI-supplied text and AI-decided cards, red `#b81b2b`. Type: Source Serif 4 for requests, quotes, speech and captions; Source Sans 3 for card labels and name labels; IBM Plex Mono for small labels (12 units, never smaller).

**Stage.** An SVG with a 960 × 540 viewBox. One view, no camera moves.
- *Right column* (x 690–936): the task card at the top throughout; from beat 8, faculty's question and the two spoken answers.
- *Student blocks* (x 24–670), each 205 units tall. The first student's block sits centre stage (block top Y = 168) for beats 1–5, then slides up to Y = 24. The second student's block appears at Y = 290 in beat 6.
- *Inside a block*, left to right: the paper (x 24–104), the dot's home (118, Y + 30), the student's lane (x 130–300), the requests lane (x 310–490), the AI's lane (x 500–670). Hairline dividers at x 305 and x 495.
- *Rows.* Each block has three rows, one per decision. Row k (k = 0, 1, 2) has its cards at Y + 50 + 60k to Y + 80 + 60k, and its quote line in the requests lane centred on the same band.

Positions are viewBox units. Widths of text-sized elements and line breaks come from measured text at build time.

| Element | Stands for | How it looks | Where |
| --- | --- | --- | --- |
| Task card | The assignment | Paper-bright card, hairline ink border (15%). Mono 12 "EXAMPLE TASK", then Serif 15 ink over two lines: "Recommend whether to keep / a forward base open." Stays throughout | x 690–936, y 16–100; baselines 36, 60, 80 at x 706 |
| Red dot | A student | Solid red circle, radius 5. Moves to act: onto the paper to revise, to a row to ask, onto a card to decide | Home (118, Y + 30) |
| Name label | Names the block's student | Red Sans 600 13: "First student" / "Second student". Stays | (24, Y + 14) |
| Paper | The draft, then what faculty receive | Paper-bright sheet, hairline border, soft shadow. An ink title bar and about 10 ink rows. The two drafts differ in row lengths | x 24–104, y Y + 24 to Y + 150 |
| Draft counter | The student's revisions | Ink mono 12 "DRAFT 2", then "DRAFT 3", "DRAFT 4", appearing with the first revision | (24, Y + 166) |
| "REVISED WITH AI" | The paper's disclosure | Grey mono 12, from the first revision. Stays | (24, Y + 182) |
| "AI'S NOTES" chip | The AI's feedback | Grey band chip, mono 12 grey "AI'S NOTES", on the paper's top edge, with a short grey tick on three rows. Fades as the student works through them | Paper's top edge |
| AI-supplied text | What the AI adds and the student keeps | Two grey section headings (from the structure request) and a two-row grey paragraph (from the strategic request), on a grey band inside the paper. Stay to the end, the same in both papers | Inside the paper |
| Dividers and lane headings | The ledger | Navy hairlines (30%). Mono 12 headings: "THE STUDENT DECIDES" red, "REQUESTS" ink, "THE AI DECIDES" grey | Dividers x 305 and x 495, Y + 2 to Y + 204; headings baseline Y + 14 at x 135, 315, 505 |
| Decision cards | The three decisions in improving the paper | 160 × 30, rounded 3, Sans 600 13 label (two lines if measured too wide): "The criteria", "How the argument runs", "What “strategic” means". *Undecided:* paper-bright, dashed ink outline (45%), ink label. *AI-decided:* grey band fill, solid grey outline, grey label, a darker grey bar under the label. *Student-decided:* paper-bright, solid red outline (1.6), red label, a red bar under the label | Student's lane x 135–295; AI's lane x 505–665 |
| Empty slot | No decision here | Hairline outline (15%) the size of a card, with a centred ink "—" (45%). No label, no dashes | Wherever a card isn't |
| Request bubble | What the student asks | Paper-bright rounded box (radius 8), hairline ink border (25%), small tail to the dot. Serif 14 ink, no final full stop. Grows just above the row's card. A first-student bubble clips onto the card's top edge with a small ink clip, and the two travel together | Above the card, then across |
| Quote line | A delivered request | Serif italic 13 ink in quotation marks, one or two lines. The second student's red words stay red | Requests lane, x 315–485 |
| Unsaid part | What a first-student request left out | Grey Serif italic 13 on a grey band, appended to the quote: "against your criteria", "for your argument", ", as you define it" | After each first-student quote |
| Red pointer | The clause points to a decision already made | A short red hairline with a small arrowhead, from the red words back to the card in the student's lane | Between the lanes |
| Faculty header | What faculty ask | Mono 12 ink "FACULTY ASK EACH STUDENT" over Serif italic 19 ink "Better by whose standard?" | x 690; baselines 128 and 152 |
| Speech panels | What each student says | Paper-bright box, rounded 8, hairline ink border (25%), small tail toward that student's block. Serif 15 ink in quotation marks, two lines. Words appear at about 3 words a second | First x 690–936, y 164–220; second x 690–936, y 380–436 |
| Caption band | The words for each beat | Real text under the picture: a mono counter ("3 / 9") and the caption in Serif 22 ink. In beat 9: mono 13 ink "FACULTY CHECK" over the check in Serif italic 30, then directly under it at the same size and style, "To find out, ask each student: better by whose standard?" Fixed height on desktop, sized for both lines | Under the stage |
| Beat list | Text equivalent and navigation | Nine numbered captions with "On screen" lines (visible in reduced-motion, print and narrow views; always available to screen readers). The current beat has a navy rule | Under the controls |

**The requests.**

| Row and decision | First student | What it left unsaid (grey, beat 5) | Second student |
| --- | --- | --- | --- |
| 0 · The criteria | "Give me feedback" | "against your criteria" | "Give me feedback **against my criteria**" |
| 1 · How the argument runs | "Suggest a better structure" | "for your argument" | "Suggest a better structure **for my argument**" |
| 2 · What "strategic" means | "Make it more strategic" | ", as you define it" | "Make it more strategic, **as I define it**" |

The bold words are red on screen. The second student's requests are the first student's words plus a red clause, and the grey phrases mirror those clauses.

**The answers** to "Better by whose standard?"

| | Answer (ink, both) |
| --- | --- |
| First student | "The AI's, I suppose. I'm not sure what good looks like here." |
| Second student | "Mine. I set it first: does the evidence back my call?" |

**Narrow screens.** Whenever any picture text would render under 11 px (a stage narrower than about 880 px, so every phone and some tablets), the SVG collapses and the stacked text stage takes over, driven by the same clock, with text at 13–16 px:
- *Top:* the task, one line.
- *Each student* gets a full-width panel: the name, the draft counter and "Revised with AI", then three rows. Each row shows the request as a quote across the full width. Under it is a two-cell track, "Student decides" and "AI decides", with the decision chip in one cell.
  - A first-student chip slides from the left cell to the right and turns grey. At the turn the grey unsaid words join the quote.
  - A second-student chip turns red in the left cell, and the quote's red words stay red.
- *Beats 1–5* show the first student's panel. From beat 6 the second student's panel sits under it.
- *Beats 8–9:* "Better by whose standard?" and both answers, side by side under the panels. In beat 8 the panels dim, as on desktop.
- *Final frame:* the task, both panels, the question and both answers, then the check (20 px at this width) and the controls, about 780 px in all. The build checks this against an 844 px phone.
- The papers aren't drawn at this width; the draft counter and "Revised with AI" stand in for them.

## 4. Beats

Times are absolute seconds. In every beat the caption changes first (0.3 s fade) and nothing in the picture moves for the first second. A change the caption is about starts only after the caption can be read once, except a lead-in that the caption's first clause describes.

### Beat 1 · 0.0–7.0 s · The draft

- **On screen at the start:** an empty paper stage.
- **What moves:**
  1. 1.0–1.6: the task card fades in and rises 6 units at top right.
  2. 1.6–2.0: the red dot grows in at (118, 198), and "First student" fades in at (24, 182).
  3. 2.1–2.7: the draft paper fades in at left (y 192–318): a title bar and rows of ink.
  4. 2.7–7.0: hold.
- **Caption:** "A student wants to improve a draft strategy paper."
- **Notice:** the red dot is the student, and the paper is their own draft. The task asks for a recommendation.
- **Why:** the setup names the situation before anything goes wrong.

### Beat 2 · 7.0–15.0 s · Three decisions

- **What moves:**
  1. 8.0–8.6: two hairline dividers draw down the block, and the three lane headings fade in: "THE STUDENT DECIDES" in red, "REQUESTS" in ink, "THE AI DECIDES" in grey.
  2. 8.8–10.2: three dashed cards appear one at a time in the student's lane (0.35 s each, one every 0.45 s): "The criteria", "How the argument runs", "What “strategic” means".
  3. 10.3–10.7: three empty slots, each a faint outline with "—", fade in across from them in the AI's lane.
  4. 10.7–15.0: hold.
- **Caption:** "Improving it takes many decisions. We'll track three."
- **Notice:** the three decisions start in the student's lane, dashed, because nobody has made them yet. The requests lane is empty, and the AI's lane holds only empty slots. The ledger is ours: "We'll track three."
- **Why:** the decisions are named and placed before any request, and the three read as a sample. The lanes and cards are the lead-in the first sentence describes.

### Beat 3 · 15.0–26.1 s · Feedback: the request carries the criteria

- **What moves:**
  1. 16.0–16.3: the dot moves to the left end of the criteria row.
  2. 16.3–16.7: it pulses, and a bubble grows just above the criteria card: "Give me feedback". Its lower edge clips onto the card's top edge.
  3. 16.7–19.3: nothing moves while the caption is read.
  4. 19.3–21.7: one slow movement (2.4 s, eased). The bubble and the card, both fully visible, travel right together: out of the student's lane, across the requests lane, into the AI's lane. The card settles onto the first empty slot. As it leaves, an empty slot with "—" fades in where it was. In the last 0.4 s, as it settles, the card turns grey: grey band, grey outline, grey label.
  5. 21.8–22.3: the bubble unclips and slides back into the requests lane, shrinking into its quote line: "Give me feedback".
  6. 22.4–22.8: a grey "AI'S NOTES" chip appears on the paper's top edge, and three rows get a short grey tick.
  7. 22.9–24.1: the dot works over the paper. The ticks and chip fade, "DRAFT 2" appears under the paper, and "REVISED WITH AI" appears in grey under that.
  8. 24.1–24.5: the dot returns home.
  9. 24.5–26.1: hold.
- **Caption:** "The student asks an AI for feedback. The request carries the criteria across."
- **Notice:** a decision moves. The criteria card travels under the request, in full view, into "THE AI DECIDES", and turns grey there. The student's lane now shows an empty slot. The request itself rests in the middle lane. The notes are useful, and the student revises.
- **Why:** this is the first transfer, large, slow and named. It starts 4.3 s in, once the caption can be read; the bubble is the lead-in the first sentence describes.

### Beat 4 · 26.1–37.1 s · Structure and strategy

- **What moves:**
  1. 27.1–27.4: the dot moves to the second row.
  2. 27.4–27.8: it pulses, and a bubble grows above "How the argument runs" and clips onto it: "Suggest a better structure".
  3. 27.9–29.3: the bubble and the card travel across together (1.4 s). The card settles on the empty slot in the AI's lane and turns grey; an empty slot appears where it was.
  4. 29.4–29.9: the bubble slides back into the requests lane as a quote line.
  5. 30.0–30.4: two grey section headings appear in the paper.
  6. 30.5–31.3: the dot works over the paper; "DRAFT 3".
  7. 31.4–31.7: the dot moves to the third row.
  8. 31.7–32.1: it pulses, and a bubble grows above "What “strategic” means" and clips onto it: "Make it more strategic".
  9. 32.2–33.6: the two travel across; the card settles and turns grey; an empty slot appears where it was.
  10. 33.7–34.2: the bubble slides back as a quote line.
  11. 34.3–34.7: a two-row grey paragraph appears in the paper.
  12. 34.8–35.6: the dot works over the paper, "DRAFT 4" appears, and the dot returns home.
  13. 35.6–37.1: hold.
- **Caption:** "Then for a better structure, and a more strategic version."
- **Notice:** two more decisions travel across under their requests. The student's lane is now three empty slots, the AI's lane three grey cards, and the requests lane three plain requests. The student revised after every request, up to draft 4, and the paper keeps the AI's grey headings and paragraph.
- **Why:** the pattern holds for structure and for meaning, and the student's effort stays visible. The second request is the lead-in the first clause describes; the third starts 5.6 s in.

### Beat 5 · 37.1–45.7 s · What the requests left out (the turn)

- **On screen at the start:** the first student's block: three empty slots, three plain requests, three grey cards.
- **What moves:**
  1. 38.5–39.0: the three quote lines in the requests lane pulse together.
  2. 41.4–41.8: after "Give me feedback", a grey phrase on a grey band appears: "against your criteria".
  3. 41.9–42.3: after "Suggest a better structure": "for your argument".
  4. 42.4–42.8: after "Make it more strategic": ", as you define it".
  5. 43.0–43.6: the three grey cards in the AI's lane pulse once.
  6. 43.6–45.7: hold.
- **Caption:** "Each request left out whose standard to use. The AI used its own."
- **Notice:** each request named only the kind of help. The grey words are what each one left unsaid, and the AI filled them in with its own criteria, its own argument and its own meaning of "strategic". Those are the three grey cards.
- **Why:** this is the mechanism made visible: the language of the request hid whose judgment would govern the help. The pulse is the lead-in the first clause names; the grey words start 4.3 s in.

### Beat 6 · 45.7–56.6 s · A second student writes first

- **What moves:**
  1. 46.7–47.9: the first student's block slides up to the top half (Y 168 → 24).
  2. 48.0–48.6: the second student's block fades in below (Y = 290): "Second student", the red dot at (118, 320), their draft, the lanes and headings, three dashed cards in their lane and three empty slots in their AI lane.
  3. 50.4–51.2: the dot moves onto "The criteria" and writes in it. The outline turns solid red, a red bar appears under the label, and the label turns red.
  4. 51.3–51.6: the dot steps back to the left end of the row.
  5. 51.6–52.0: it pulses, and a bubble grows above the card: "Give me feedback against my criteria", with "against my criteria" in red. It doesn't clip onto the card.
  6. 52.1–52.9: the bubble slides into the requests lane and settles as a quote line. As it settles, a short red pointer draws from "against my criteria" back to the red card. The card stays in the student's lane.
  7. 53.0–53.4: the "AI'S NOTES" chip and three grey ticks appear on this paper.
  8. 53.5–54.7: the dot works over the paper with the same motion and pace as the first student. "DRAFT 2" and "REVISED WITH AI" appear.
  9. 54.7–55.1: the dot returns home.
  10. 55.1–56.6: hold.
- **Caption:** "A second student writes down each decision first, then asks for the same help."
- **Notice:** the order. The student decides the criteria before asking, and only then asks. The red words in the request point back to that decision, the card stays in their lane, and the same notes come back.
- **Why:** the caption states the second student's habit, and its order, before anything happens to them. The block move is the lead-in; the decision starts 4.7 s in.

### Beat 7 · 56.6–68.1 s · Each request points to a decision

- **What moves:**
  1. 57.6–58.4: the dot writes in "How the argument runs": red outline, red bar, red label.
  2. 58.5–58.8: the dot moves to that row's left end.
  3. 58.8–59.2: a bubble grows: "Suggest a better structure for my argument", with "for my argument" in red.
  4. 59.3–60.1: it settles in the requests lane, and a red pointer draws back to the card.
  5. 61.3–61.7: two grey section headings appear in this paper.
  6. 61.8–62.6: the dot works over the paper; "DRAFT 3".
  7. 62.7–63.5: the dot writes in "What “strategic” means".
  8. 63.6–63.9: the dot moves to that row's left end.
  9. 63.9–64.3: a bubble grows: "Make it more strategic, as I define it", with "as I define it" in red.
  10. 64.4–65.2: it settles in the requests lane, and a red pointer draws back to the card.
  11. 65.3–65.7: a two-row grey paragraph appears in this paper.
  12. 65.8–66.6: the dot works over the paper, "DRAFT 4" appears, and the dot returns home.
  13. 66.6–68.1: hold.
- **Caption:** "Each request points to a decision already made. The AI helps just as much."
- **Notice:** each decision is written before its request. All three stay red in the student's lane, the AI's lane stays empty, and the requests lane holds three requests with red words and pointers. This paper gets the same grey headings and paragraph as the first: the AI supplies text without deciding.
- **Why:** this completes the one difference and shows the help is equal. The first decision is the lead-in the first sentence describes; the AI's help starts 4.7 s in.

### Beat 8 · 68.1–82.4 s · Faculty ask

- **On screen at the start:** both blocks. Above: three empty slots, three plain requests with their grey unsaid words, three grey cards. Below: three red cards, three requests with red words, three empty slots. Both papers read "DRAFT 4" and "REVISED WITH AI".
- **What moves:**
  1. 69.1–70.1: both ledgers (dividers, headings, cards, slots, requests, pointers) dim to 15%. The papers, counters, tags, dots and names stay at full strength.
  2. 70.2–70.7: in the right column, under the task card, "FACULTY ASK EACH STUDENT" and "Better by whose standard?" fade in and rise 6 units.
  3. 72.1–72.5: a speech panel opens beside the first student's block.
  4. 72.5–76.5: their words appear at about 3 words a second: "The AI's, I suppose. I'm not sure what good looks like here."
  5. 76.8–77.2: a speech panel opens beside the second student's block.
  6. 77.2–80.9: their words appear at the same pace: "Mine. I set it first: does the evidence back my call?"
  7. 80.9–82.4: hold.
- **Caption:** "Faculty have only the papers. They ask each student about the standard."
- **Notice:** faculty can't see the ledgers, only two papers revised with AI. Both students answer honestly, in the same ink. The first names the AI and says they aren't sure what good looks like for their own paper. The second names a standard they set first.
- **Why:** this is the difference faculty can hear, and the cost to the first student. The dim is the lead-in the first sentence describes; the first answer starts 4.0 s in.

### Beat 9 · 82.4–90.0 s · The faculty check

- **What moves:**
  1. 82.4–82.6: caption 8 fades out.
  2. 82.6–83.2: the faculty check rises into the caption band: "FACULTY CHECK" in navy mono, then the question in large italic.
  3. 85.9–86.9: both ledgers return to full strength.
  4. 87.1–87.6: directly under the check, at the same size, "To find out, ask each student: better by whose standard?"
  5. 87.6–90.0: hold. At 90.0 the player shows Replay and the figure rests on this frame.
- **Caption:** "Faculty check: What did the AI decide for the student?" Second line, same size: "To find out, ask each student: better by whose standard?"
- **Notice:** the ledgers come back as the answer to the check: for the first student, all three decisions; for the second, none. The second line tells faculty how to find that out, with the question they just asked.
- **Why:** the figure ends on the check and the move an educator can make. The ledgers return 2.7 s after the check, once it can be read.

## 5. Final frame

The still at 90.0 s. It is also the reduced-motion view, the print view and the poster (stage plus caption band).

**Stage:**
- **Right column:** the task card, "EXAMPLE TASK" over "Recommend whether to keep a forward base open." Under it, "FACULTY ASK EACH STUDENT" over "Better by whose standard?" Then the first student's answer beside their block, "The AI's, I suppose. I'm not sure what good looks like here.", and lower down the second student's, beside theirs: "Mine. I set it first: does the evidence back my call?"
- **Top block, "First student":**
  - At left, their paper with grey headings and a grey paragraph, "DRAFT 4" and "REVISED WITH AI" under it.
  - Under red "THE STUDENT DECIDES": three empty slots marked "—".
  - Under "REQUESTS": "Give me feedback", "Suggest a better structure", "Make it more strategic", each followed by its grey unsaid words: "against your criteria", "for your argument", ", as you define it".
  - Under grey "THE AI DECIDES": three grey cards, "The criteria", "How the argument runs", "What “strategic” means".
- **Bottom block, "Second student":**
  - At left, their paper with the same grey headings and paragraph, "DRAFT 4" and "REVISED WITH AI".
  - Under "THE STUDENT DECIDES": three red cards with the same labels.
  - Under "REQUESTS": "Give me feedback against my criteria", "Suggest a better structure for my argument", "Make it more strategic, as I define it", the red words each with a red pointer back to its card.
  - Under "THE AI DECIDES": three empty slots marked "—".

**Caption band:**

> FACULTY CHECK *(navy mono)*
> *What did the AI decide for the student?* *(Serif italic, about 30 px)*
> *To find out, ask each student: better by whose standard?* *(Serif italic, same size as the line above)*

**In the reduced-motion and print views,** all nine captions and their "On screen" lines are readable below the controls. Clicking a beat shows its settled still.

**At 390 px** the final frame is the stacked text stage: the task, both students' panels one above the other, the question and both answers side by side, then the check and the controls.

**What the still says alone:** two students asked an AI for the same three kinds of help, and both papers came back revised with AI after four drafts. The first student's plain requests left whose standard unsaid; all three decisions sit with the AI, and their own lane is empty. The second student's decisions sit in their own lane, in red, and each request points to one. The AI helped both; it decided only for the first. Asked whose standard, one names the AI and isn't sure what good looks like, and the other names their own. The lines under the picture say what to ask, and how to find out.

## 6. Standalone page copy

**Title:** Invisible delegation

**Kicker:** Failure mode 5 of 7

**Setup:**

A student asks an AI for feedback on a draft paper, then a better structure, then a more strategic version, and revises after each. *The Irreducible Officer* calls what can happen next invisible delegation: a request for help transfers criteria, structure or meaning, and the student doesn't notice. The figure runs a minute and a half; pause it or step through the beats below. The task, the requests and both students are a constructed example.

**Figure summary** (visually hidden, for screen readers): An animated figure. A red dot stands for a student improving a draft strategy paper, for an example task: recommend whether to keep a forward base open. Beside the paper is a ledger in three lanes: "The student decides", "Requests" and "The AI decides". Three decisions start in the student's lane as dashed cards: the criteria, how the argument runs, and what "strategic" means. The AI's lane holds empty slots. The student asks an AI, "Give me feedback." The request carries the criteria card across into the AI's lane, where it turns grey, and the request settles in the middle lane. The AI's notes come back and the student revises to draft 2. The student then asks, "Suggest a better structure," and "Make it more strategic." Each request carries a card across, and the student revises to draft 4. Then, after each request, grey words appear for what it left unsaid: "against your criteria", "for your argument", "as you define it". A second student writes each decision in red in their own lane first, and then asks: "Give me feedback against my criteria," "Suggest a better structure for my argument," "Make it more strategic, as I define it." Red pointers run from those words back to the decisions. Their cards stay in their lane, their AI lane stays empty, and their paper gets the same AI help. Faculty, who have only the two papers, both marked "Revised with AI", ask each student, "Better by whose standard?" The first says, "The AI's, I suppose. I'm not sure what good looks like here." The second says, "Mine. I set it first: does the evidence back my call?" The figure ends on the faculty check. Each beat is listed below with what is on screen.

**Beat list (text equivalent):**

1. **A student wants to improve a draft strategy paper.** *On screen:* a task card appears at the top right: "Example task. Recommend whether to keep a forward base open." A red dot labelled First student appears beside a draft paper.
2. **Improving it takes many decisions. We'll track three.** *On screen:* a ledger appears beside the paper in three lanes: "The student decides", "Requests" and "The AI decides". Three dashed cards appear in the student's lane: "The criteria", "How the argument runs" and "What 'strategic' means". The AI's lane shows three empty slots.
3. **The student asks an AI for feedback. The request carries the criteria across.** *On screen:* a speech bubble, "Give me feedback", clips onto the criteria card, and the two travel slowly across into the AI's lane. The card turns grey there, and an empty slot marks where it was. The request settles in the middle lane. The AI's notes appear on the paper, and the student revises: draft 2, revised with AI.
4. **Then for a better structure, and a more strategic version.** *On screen:* "Suggest a better structure" carries "How the argument runs" across, and "Make it more strategic" carries "What 'strategic' means". Both turn grey in the AI's lane. The AI's grey headings and paragraph appear in the paper, and the student revises to draft 4. The student's lane is three empty slots.
5. **Each request left out whose standard to use. The AI used its own.** *On screen:* grey words appear after each request: "Give me feedback against your criteria", "Suggest a better structure for your argument", "Make it more strategic, as you define it". The three grey cards pulse.
6. **A second student writes down each decision first, then asks for the same help.** *On screen:* the first student's ledger moves up, and a second student appears below with a draft and the same three dashed cards. The dot writes in the criteria card, which turns red. Then it asks, "Give me feedback against my criteria." The request settles in the middle lane with a red pointer back to the card, which stays in the student's lane. The AI's notes come back and the student revises.
7. **Each request points to a decision already made. The AI helps just as much.** *On screen:* the dot writes in "How the argument runs" and then asks, "Suggest a better structure for my argument." It writes in "What 'strategic' means" and asks, "Make it more strategic, as I define it." Each request gets a red pointer back to its card. All three cards stay red in the student's lane, and the AI's lane stays empty. The same grey headings and paragraph appear in this paper, up to draft 4.
8. **Faculty have only the papers. They ask each student about the standard.** *On screen:* both ledgers fade; the two papers stay, both at draft 4 and marked "Revised with AI". "Faculty ask each student: Better by whose standard?" appears at the right. The first student says, "The AI's, I suppose. I'm not sure what good looks like here." The second says, "Mine. I set it first: does the evidence back my call?"
9. **Faculty check: What did the AI decide for the student? To find out, ask each student: better by whose standard?** *On screen:* the questions appear under the picture at the same size, and both ledgers return: the first student's three decisions in the AI's lane, the second student's three in their own.

**Faculty check:** What did the AI decide for the student?
**To find out, ask each student: better by whose standard?** (same size)

A student who didn't notice what they handed over can honestly answer the first question with "nothing". The second line is a question they can answer, and the answer shows whose standard the help followed. In the figure, the first student names the AI and isn't sure what good looks like for their own paper. The second names a standard they set before asking. The essay's own pairs give the follow-ups: feedback against which criteria, a better structure for which argument, more strategic in what sense. The companion's failure-mode lab adds a fair objection: an assistant can legitimately propose criteria. The trouble starts when a student accepts them without seeing how they relate to the task.

**From the essay** (*The Irreducible Officer*, Section II, What the Problem Looks Like):

> Invisible delegation occurs when the student does not notice which parts of the work they have handed over. Asking for "feedback" may delegate criteria. Asking for "a better structure" may delegate the argument. Asking for "counterarguments" may delegate the range of imaginable objections. Asking for "a more strategic version" may delegate the meaning of strategic. The language of assistance hides the transfer of judgment. The student believes they are working; the model has already done the framing.

And from Section V, Appropriate Reliance as a Teachable Competency:

> Minimal-context prompting inherits the model's frame almost entirely. Structured prompting with explicit purpose and evaluation criteria moves the human contribution upstream.

**Links:**
- Book chapter: Frame the problem → `../../book-v0/four-moves-book.html?spread=2`
- In the same chapter: Frame capture → `../frame-capture/`
- Practice: test invisible delegation with your AI assistant → `https://judgmentlab.net/#companion`
- Essay: Section II, What the Problem Looks Like → `https://judgmentlab.net/#ii-what-the-problem-looks-like`
- Essay: Section V, Appropriate Reliance as a Teachable Competency → `https://judgmentlab.net/#v-appropriate-reliance-as-a-teachable-competency`

## 7. Pacing table

Reading time is caption words ÷ 3. The beat total is lead + motion + hold, and every total is at least twice the caption's reading time. Picture words are new words inside the picture, answers included; repeated headings and card labels in the second block aren't counted. The reading budget is caption plus picture words divided by the beat's length, and stays at 3 words a second or less.

| Beat | Time (s) | Caption words | Reading (s) | 2× (s) | Picture words | Budget (words/s) | Lead (s) | Motion (s) | Hold (s) | Total (s) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · The draft | 0.0–7.0 | 9 | 3.0 | 6.0 | 12 | 3.0 | 1.0 | 1.7 | 4.3 | 7.0 |
| 2 · Three decisions | 7.0–15.0 | 8 | 2.7 | 5.3 | 16 | 3.0 | 1.0 | 2.7 | 4.3 | 8.0 |
| 3 · Feedback | 15.0–26.1 | 13 | 4.3 | 8.7 | 10 | 2.1 | 1.0 | 8.5 | 1.6 | 11.1 |
| 4 · Structure and strategy | 26.1–37.1 | 10 | 3.3 | 6.7 | 10 | 1.8 | 1.0 | 8.5 | 1.5 | 11.0 |
| 5 · What the requests left out | 37.1–45.7 | 13 | 4.3 | 8.7 | 10 | 2.7 | 1.4 | 5.1 | 2.1 | 8.6 |
| 6 · A second student writes first | 45.7–56.6 | 14 | 4.7 | 9.3 | 8 | 2.0 | 1.0 | 8.4 | 1.5 | 10.9 |
| 7 · Each request points to a decision | 56.6–68.1 | 14 | 4.7 | 9.3 | 17 | 2.7 | 1.0 | 9.0 | 1.5 | 11.5 |
| 8 · Faculty ask | 68.1–82.4 | 12 | 4.0 | 8.0 | 31 | 3.0 | 1.0 | 11.8 | 1.5 | 14.3 |
| 9 · Faculty check | 82.4–90.0 | 8 + 10 second line | 2.7 + 3.3 | 5.3 (check) | 0 | 2.4 | 0.0 | 5.2 | 2.4 | 7.6, then rests |
| **Total** | | **111** | **37.0** | | **114** | | **8.4** | **60.9** | **20.7** | **90.0** |

Checks:
- One idea per beat; movements run one after another.
- Changes a caption names wait until it can be read once: the criteria's crossing (beat 3, 4.3 s in), the third request (beat 4, 5.6 s), the unsaid words (beat 5, 4.3 s), the second student's first decision (beat 6, 4.7 s), the AI's help to the second student (beat 7, 4.7 s), the first answer (beat 8, 4.0 s) and the second line under the check (beat 9, 4.5 s after the check begins to rise).
- Lead-ins the caption's first clause describes start early, as in figures 1–4: the lanes and cards (beat 2), the first bubble (beat 3), the second request (beat 4), the quotes' pulse (beat 5), the block move (beat 6), the second student's next decision (beat 7) and the dim (beat 8).
- The first crossing is one slow 2.4 s movement with the card fully visible; the next two take 1.4 s each, once the pattern is set.
- Both students revise with the same motion and timing: 1.2 s through the notes, then 0.8 s after each of the other two kinds of help.
- Spoken words appear at about 3 words a second: 12 words in 4.0 s, then 11 words in 3.7 s. Each stays on screen to the end, and the second holds 1.5 s before the check.
- Every hold is at least 1.5 s. Beats 1 and 2 hold longer for the task card and the card labels.
- No camera moves. The first student's block moves once (beat 6), and the ledgers dim once (beat 8) and return (beat 9). Reduced motion shows the final frame.
- Total 90.0 s.
