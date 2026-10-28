# Invisible delegation: storyboard

Motion figure 5 of 8 · slug `invisible-delegation` · storyboard round 3, revised after storyboard cold read 2 (passed with fixes) · October 28, 2026

Starting point: `concepts-v0/proposal.md` §2.5, "What crossed over" (8.5 s, not built). This version keeps v0's mechanism: a ledger of decisions, and ordinary requests that carry cards across it. It uses three of the essay's four request pairs, the three the site names (criteria, structure, meaning). The ledger has three lanes: what the student decides, what the student asked, and what the AI decides. Each of the first student's requests visibly carries a decision card across into the AI's lane. The turn shows what each request left unsaid: whose standard to use. The AI used its own. A second student, with the same task and rubric, writes each decision down first and then asks for the same help, with words that point back to that decision. That habit is the one difference. It shows in their working: they turn down one AI note that doesn't serve the rubric. Faculty can't see the ledger or the notes. They ask a question each student can answer honestly, and the answers show whose standard the help followed. The shared runtime and `CONVENTIONS.md` apply throughout.

## 1. Intent

*The cold-read tester does not see this section.*

**The point.** Ordinary requests for help (feedback, a better structure, a more strategic version) can each hand the AI a decision: the criteria, the argument, what "strategic" means. The request names the kind of help and leaves out whose standard to use, so the AI uses its own. A student with the same task and rubric who decides first, and points to that decision when asking, gets the same help and keeps the decisions. Their standard shapes what they accept. The papers don't show the difference. Faculty find it by asking each student whose standard the help followed. The student who handed the decisions over answers honestly that they followed the AI's notes.

**What a first-time educator should be able to say afterwards.** "Both students had the same task and the same rubric: the evidence must back the call. The first asked an AI for feedback, then a better structure, then a more strategic version, and revised after each one. Each request carried a decision across to the AI: what counts as good, how the argument runs, what 'strategic' means. The requests never said whose standard to use, so the AI used its own. The student worked through every note it flagged. The second student wrote each decision down first, the criteria straight from the rubric, then asked for the same three things: 'against my criteria', 'for my argument', 'as I define it'. They got the same notes. They turned one down, 'Sound more decisive', because the rubric says the evidence must back the call. Both papers came back revised with AI and look alike. Asked 'Better by whose standard?', the first said 'The AI's notes, I suppose. I worked through what it flagged.' The second said 'Mine, set first from the rubric.' So I'd ask what the AI decided for the student, and to find out I'd ask each student whose standard the help followed."

**Faculty check** (verbatim from the site's Core Failure Modes table): *What did the AI decide for the student?* The final frame adds, directly under it and at the same size, the move the figure makes: *To find out, ask each student: better by whose standard?*

**Essay passage** (Section II, "What the Problem Looks Like"):

> **Invisible delegation** occurs when the student does not notice which parts of the work they have handed over. Asking for "feedback" may delegate criteria. Asking for "a better structure" may delegate the argument. Asking for "counterarguments" may delegate the range of imaginable objections. Asking for "a more strategic version" may delegate the meaning of strategic. The language of assistance hides the transfer of judgment. The student believes they are working; the model has already done the framing.

Related:
- Section IV: "When the human fails to provide a purpose, provides one too vaguely, or accepts the system's inferred purpose without noticing, a default can govern the work. That is still not the same as authorizing the purpose." (beat 5)
- Section V: "Minimal-context prompting inherits the model's frame almost entirely. Structured prompting with explicit purpose and evaluation criteria moves the human contribution upstream." And: "The goal is students who can shape AI systems, specifying what they are asking the system to do, why, and what would count as a satisfactory result." (beats 6–7)
- Section VIII, frame evidence: before submitting, "the student names the problem frame, the key assumptions, the criteria for success, the evidence standard, and the role AI played in the work." (beat 8)
- Section I: "Disclosure tells faculty that a student used AI. It does not tell them whether the judgment in the work is theirs." (both papers carry the same "Revised with AI" tag)

**How the beats map to the passage.**

| Essay clause | Beat |
| --- | --- |
| "Asking for 'feedback' may delegate criteria" | 3 (the request carries "The criteria" into the AI's lane), 5 ("against your criteria", unsaid) |
| "Asking for 'a better structure' may delegate the argument" | 4, 5 ("for your argument", unsaid) |
| "Asking for 'a more strategic version' may delegate the meaning of strategic" | 4, 5 ("as you define it", unsaid) |
| "The language of assistance hides the transfer of judgment" | 3–4 (each request names only the help), 5 (what each left unsaid appears, marked "UNSAID") |
| "the student does not notice which parts of the work they have handed over" and "The student believes they are working" | 3–4 (the student ticks every note and revises after every request: drafts 2, 3, 4), 8 ("I worked through what it flagged.") |
| "the model has already done the framing" | 5 (all three decisions in the AI's lane), 9 (the ledgers return under the check) |
| Section V, "explicit purpose and evaluation criteria moves the human contribution upstream" | 6–7 (the second student takes the criteria from the rubric, writes each decision, then asks with words that point to it, and turns down a note that doesn't serve it) |

**Misreadings to design against.**

1. *Asking an AI for help is the failure.* The second student asks for the same three kinds of help and gets the same notes, headings and paragraph. Both papers say "Revised with AI", and both students' requests stay in the requests lane to the end.
2. *The AI's decisions were bad.* The cards carry only the name of each decision. The AI's notes are ordinary. The one the second student turns down ("Sound more decisive") isn't wrong in general; it doesn't serve their rubric.
3. *The first student was lazy or careless.* They tick every note and revise after every request, through four drafts, at the same pace as the second student. Their answer is honest and says what they did: "I worked through what it flagged."
4. *The first student lacked knowledge.* Both have the same task card with the same rubric line from beat 1. The first student's answer is about a habit (following the notes), and the rubric was in front of them too.
5. *"Mine" puts a personal standard above the course's.* The second student's criteria come from the rubric: their dot visits the rubric line before writing the criteria card, and their answer says "set first from the rubric".
6. *Deciding first changed nothing.* In their working, the second student turns down one AI note, striking it with the reason "only if the evidence is". The first student ticks it. The handed-in papers still look alike, which is the point for faculty.
7. *The fix is a prompt phrase.* The second student writes each decision before asking. Beat 6's caption names the order, beat 7's says each request "points to a decision already made", and a red pointer runs from the clause back to the card.
8. *The unsaid words were typed.* They sit on their own line under each request, outside the quotation marks, in a dashed ghost box tagged "UNSAID", with a key ("LEFT UNSAID") beside the lane heading. The narrow view labels them the same way.
9. *Faculty can see delegation in the paper.* The papers carry the same AI help and the same tag. When faculty ask, the ledgers and notes dim.
10. *Faculty knew the answer.* They ask both students the same open question.
11. *Requests are decisions.* Requests sit in their own lane, and the AI's lane holds only what the AI decided.
12. *The check is enough on its own.* A student who didn't notice could honestly answer "What did the AI decide for you?" with "Nothing." The line under the check says how to find out.

**Changes after storyboard cold read 2** (`tests/storyboard-read-2.md` and the orchestrator's notes):
- *Unsaid is marked as unsaid everywhere.* The grey phrases no longer join the quotes. Each sits on its own line under its request, outside the quotation marks, in a dashed ghost box led by a mono "UNSAID" tag. A key, a dashed swatch and "LEFT UNSAID", appears beside the "REQUESTS" heading as the first one arrives. The final, reduced-motion, print and narrow views keep the tag and the key.
- *A habit, with ability held equal.*
  - The task card carries the course's standard from beat 1: "RUBRIC · Evidence must back the call."
  - The first student's answer is about a habit: "The AI's notes, I suppose. I worked through what it flagged."
  - The second student's dot visits the rubric line before writing the criteria card. Their answer: "Mine, set first from the rubric: does the evidence back my call?"
- *Deciding first changes what's accepted.* Both students get the same three AI notes, readable in a notes card under the paper: "Tighten the opening", "Add a cost estimate", "Sound more decisive". The first ticks all three. The second ticks two and strikes "Sound more decisive" in red, with the reason "only if the evidence is". The handed-in papers still look alike, and the notes dim with the ledgers when faculty ask.
- *From the tester's other points.*
  - Beat 4's first crossing now waits until its caption can be read once.
  - The turn holds 2.5 s, and its words are Serif italic 13 in grey on paper-bright, in a box.
  - Faculty's question in beat 8 appears 4.0 s in, after the caption naming it.
  - The task card moves to a top band, and the blocks are rearranged so that "REVISED WITH AI", the notes card and two-line requests have room.
- *Total:* 96.1 s in 9 beats (round 2: 90.0 s). The rubric line, the readable notes and the turn's hold account for the extra 6 s, under the 3-words-a-second reading budget.

**Lessons from figures 1–4, applied.**

| Lesson | Here |
| --- | --- |
| Every caption's claim visible on screen; captions change only with the picture; no outcome announced early | Each beat's "Notice" names the event that carries its caption, and the event follows within the beat. |
| Show what doing it well looks like, with AI visible in the final still | Beats 6–7. The final still keeps both students' requests, both notes cards, the AI's grey help in both papers and the first student's grey cards. |
| Exactly one difference | Same task, rubric, notes, kinds of help and pace. The second student writes each decision first and points to it when asking; what they accept follows from that. |
| The model student passes the check with visible evidence | Their decisions stay red in their lane, they turn down a note for a stated reason, and asked whose standard, they name it and where it came from. |
| A difference faculty can observe | Faculty hear two answers in the same ink. The ledger and the notes are the viewer's view and dim when faculty ask. |
| Faculty don't seem to know the answer | Both students get the same open question; the second student's habit is stated in beat 6, before anything is asked. |
| Fair to the student who fails | A careful student with the same rubric, who works through every note and answers honestly. |
| Check verbatim, the figure's move under it at equal weight | "To find out, ask each student: better by whose standard?" sits directly under the check. |
| Big, centre-stage changes; no static stretches; legible at 390 px | The first crossing is one slow movement across the whole ledger. Below the legibility threshold the stacked text stage takes over. |
| Pace | 9 beats, 96.1 s, with every beat at 3 words a second or less. |

**Why this scenario.** The lab's invisible-delegation case has an educator asking an assistant to improve a rubric, and this figure's check asks about a student. The essay gives its own examples as request pairs, so the figure uses three of them, the three the site names. The setting is a short strategy paper in the PME setting of figures 1–4, with a new task. The rubric line is a course standard any educator recognises, so the second student's criteria come from the course. The task, the rubric, the notes, the requests, the papers and both answers are constructed, and the task card says "Example task".

**Considered and left out.**
- *Round 1's hidden card.* The card rode under the bubble with only an edge showing, and viewers saw no decision move.
- *Unsaid words appended to the quotes* (round 2). In the still they read as typed.
- *Sending the second student's bubbles into the AI's lane and back.* It adds about 4 s. The same notes come back from the AI, which shows the request arrived.
- *The fourth pair* ("counterarguments" may delegate the range of imaginable objections). The page quotes the whole paragraph.
- *Showing the AI's chosen criteria as words on the cards.* Viewers would judge the AI's criteria against the second student's. The notes card shows the AI's help in ordinary words instead.
- *Different papers.* The papers must look alike to faculty. The difference in what each accepted lives in the working view.
- *A second student who inspects the AI's decisions afterwards and keeps them.* Section V says users who can only inspect an answer "are still downstream of the frame". The lab's objection goes in the page copy.
- *Higher-education and high-school variants.* HE's "Summarize the research" handed over the criterion; high school's "Write an essay" handed over what success means.

**Running time.** 96.1 s in 9 beats (frame capture 85.6 s, fluency substitution 88.6 s, premature synthesis 90.0 s, uncalibrated reliance 94.7 s).

**Book link target.** `../../book-v0/four-moves-book.html?spread=2` (Move 1, Frame the problem) until `book-v1/` exists.

**Conventions this figure would add** (to `CONVENTIONS.md` after the build):
- *A decision ledger in three lanes.* Hairline dividers separate "THE STUDENT DECIDES" (red mono 12), "REQUESTS" (ink mono 12) and "THE AI DECIDES" (grey mono 12).
  - A decision is a card named by what is decided: dashed ink outline when undecided, grey on a grey band when the AI decided, red outline with a red bar when a student decided.
  - An empty slot is a faint outline with a centred "—".
  - The AI's lane holds only decisions the AI made.
- *A request* is a speech bubble in the student's words, grown from their dot, that settles as a Serif italic quote line in the requests lane. A request that carries a decision clips onto the card, and the two travel together in full view.
- *What a request left unsaid* sits on its own line under the quote, outside the quotation marks, in grey italic inside a dashed ghost box, led by a mono "UNSAID" tag, with a "LEFT UNSAID" key.
- *Words in a request that state a student's decision are red,* with a short red pointer back to the card they refer to.
- *An AI's notes* are a grey-band card of short lines. A student ticks each note they act on (ink) and strikes one they turn down (red), with their reason in red underneath.
- *A course standard on the task card* ("RUBRIC · …") is ink, and a student who draws on it visits it with their dot.
- *A draft counter* under a small paper shows revision when rewriting inside the paper would be too small to read.
- *The viewer's diagram and working notes dim to 15% when faculty ask,* and return with the check.

**Open questions for Jack.**
- **The check's wording.** "What did the AI decide for the student?" can honestly be answered "Nothing" by a student who didn't notice, which is the failure itself. The figure keeps the check verbatim and bridges it with "To find out, ask each student: better by whose standard?" Should the site's check carry the follow-up?
- **Running time.** 96.1 s, over the 90 s guide, like figure 4. Cutting the notes card would save about 3 s, but the second student's rejected note is the evidence that deciding first changed something.
- **The fourth pair is left out of the picture.** The page quotes the full paragraph.
- **One good pattern.** The second student decides first. The essay also leaves room for an AI that proposes criteria a student then examines and adopts, and the page copy says so.
- **Red for the good student.** The second student's lane ends red, and red can read as a teacher's pen. The dot visibly writes each red mark.
- **The chapter mapping** (Frame the problem) is the book proposal's, and still provisional.

## 2. Scenario

A war-college student wants to improve a draft paper recommending whether to keep a forward base. The task card carries the course rubric: the evidence must back the call. The student asks an AI for feedback, then a better structure, then a more strategic version. They work through every note and revise after each request, through four drafts. Each request names only the kind of help. Each carries a decision to the AI: the criteria, the argument, what "strategic" means. A second student, with the same task and rubric, writes each of those decisions down first, the criteria from the rubric, then asks for the same three things: "against my criteria", "for my argument", "as I define it". They get the same notes and turn one down, "Sound more decisive", because the evidence has to back the call. Both papers come back revised with AI and look alike. Faculty, who have only the papers, ask each student "Better by whose standard?" The first says "The AI's notes, I suppose. I worked through what it flagged." The second says "Mine, set first from the rubric: does the evidence back my call?"

*Sources.* The task, the rubric, the notes, the requests, the papers and both answers are constructed for this figure, and the task card says "Example task". *The Irreducible Officer*, Section II, defines invisible delegation and supplies the request pairs. Section V describes structured prompting with explicit purpose and evaluation criteria, which the second student follows. The figure shows no numbers.

## 3. Cast and grammar

**The colour rule.**
- *Grey* is what the AI supplied: its notes, the headings and paragraph it adds to each paper, the "Revised with AI" tags, "THE AI DECIDES", the decisions it makes, and the unsaid part of each of the first student's requests.
- *Red* is what a student decided, plus the dots, their name labels and "THE STUDENT DECIDES": the second student's three decisions, the words in their requests that state them, the pointers back to the cards, and their strike and reason on the note they turn down.
- *Navy ink* is the page: the task and rubric, the students' own writing, draft counters and ticks, their requests, "REQUESTS", "UNSAID" and the key, the card labels while undecided, the dividers, faculty's question and both spoken answers.
- *Dashed* means nobody has decided, or, for the ghost box, nobody said it. An empty slot is a faint outline with "—".

**Palette.** Paper `#f6f1e8`, paper-bright `#fffdfa`, ink `#0a2242`, machine grey `#5b564f` with a `#ded5c4` band behind AI-supplied text and AI-decided cards, red `#b81b2b`. Type: Source Serif 4 for the task, notes, requests, quotes, speech and captions; Source Sans 3 for card labels and name labels; IBM Plex Mono for small labels (12 units, never smaller).

**Stage.** An SVG with a 960 × 540 viewBox. One view, no camera moves.
- *Top band* (y 14–98): the task card at left (x 24–424); from beat 8, faculty's question at right (x 716–936).
- *Student blocks* (x 24–700), each 202 units tall. The first student's block sits centre stage (block top Y = 168) for beats 1–5, then slides up to Y = 108. The second student's block appears at Y = 330 in beat 6.
- *Inside a block*, left to right:
  - the paper (x 24–104, Y + 20 to Y + 96), with the draft counter and "REVISED WITH AI" under it and the notes card below (x 24–164, Y + 132 to Y + 202);
  - the dot's home (168, Y + 30);
  - the student's lane (x 176–336), the requests lane (x 348–528) and the AI's lane (x 540–700), with hairline dividers at x 342 and x 534.
- *Rows.* Three per block, one per decision. Row k (k = 0, 1, 2) has its cards at Y + 44 + 58k to Y + 74 + 58k. In the requests lane, its quote's first baseline is Y + 54 + 58k, and a second line or the unsaid line sits at Y + 70 + 58k.
- *Right column* (x 716–936): from beat 8, each student's spoken answer beside their block.

Positions are viewBox units. Widths of text-sized elements and line breaks come from measured text at build time.

| Element | Stands for | How it looks | Where |
| --- | --- | --- | --- |
| Task card | The assignment and the course standard | Paper-bright card, hairline ink border (15%). Mono 12 "EXAMPLE TASK"; Serif 16 ink "Recommend whether to keep a forward base."; then mono 12 "RUBRIC ·" and Serif italic 15 ink "Evidence must back the call." Stays throughout | x 24–424, y 14–98; baselines 34, 58, 84 at x 40 |
| Red dot | A student | Solid red circle, radius 5. Moves to act: onto the notes to work through them, to the rubric to consult it, onto a card to decide | Home (168, Y + 30) |
| Name label | Names the block's student | Red Sans 600 13: "First student" / "Second student". Stays | (24, Y + 12) |
| Paper | The draft, then what faculty receive | Paper-bright sheet, hairline border, soft shadow: an ink title bar and seven ink rows. The two drafts differ in row lengths | x 24–104, y Y + 20 to Y + 96 |
| Draft counter | Revisions | Ink mono 12 "DRAFT 2", "DRAFT 3", "DRAFT 4" | (24, Y + 110) |
| "REVISED WITH AI" | The paper's disclosure | Grey mono 12, from the first revision. Stays | (24, Y + 124) |
| Notes card | The AI's feedback | Grey band card, mono 12 grey "AI'S NOTES", three Serif 12 grey lines: "Tighten the opening", "Add a cost estimate", "Sound more decisive". The dot puts an ink ✓ before each note it acts on. A struck note gets a red line through it and a red Serif italic 12 reason underneath. Stays to the end; dims in beat 8 | x 24–164, y Y + 132 to Y + 202 |
| AI-supplied text | What the AI adds and the student keeps | Two grey section headings and a two-row grey paragraph, on a grey band inside the paper. The same in both papers | Inside the paper |
| Dividers and lane headings | The ledger | Navy hairlines (30%). Mono 12 headings: "THE STUDENT DECIDES" red, "REQUESTS" ink, "THE AI DECIDES" grey | Dividers x 342 and x 534; headings baseline Y + 12 at x 178, 350, 542 |
| Decision cards | The three decisions in improving the paper | 156 × 30, rounded 3, Sans 600 13 label: "The criteria", "How the argument runs", "What “strategic” means". *Undecided:* paper-bright, dashed ink outline (45%). *AI-decided:* grey band fill, solid grey outline, grey label. *Student-decided:* paper-bright, solid red outline (1.6), red label | Student's lane x 178–334; AI's lane x 542–698 |
| Empty slot | No decision here | Hairline outline (15%) the size of a card, with a centred ink "—" (45%). No label, no dashes | Wherever a card isn't |
| Request bubble | What the student asks | Paper-bright rounded box (radius 8), hairline ink border (25%), small tail to the dot. Serif 14 ink, 26 high. A first-student bubble clips onto the card's top edge, and the two travel together | Grows just above the row's card |
| Quote line | A delivered request | Serif italic 13 ink in quotation marks, one or two lines. The second student's red words stay red | Requests lane from x 350 |
| Unsaid line | What a first-student request left out | Mono 12 ink "UNSAID", then a dashed grey ghost box (no fill, dash 3 3) holding grey Serif italic 13 words, no quotation marks: "against your criteria", "for your argument", "as you define it" | Under each first-student quote, baseline Y + 70 + 58k |
| Unsaid key | What the ghost box means | A small dashed ghost swatch and mono 12 ink "LEFT UNSAID" | Beside "REQUESTS", x 420 |
| Red pointer | The clause points to a decision already made | A short red hairline with a small arrowhead, from the red words back to the card | Between the student's lane and the requests lane |
| Rubric underline | The second student consults the rubric | A navy underline drawn under the rubric line, then held at 40% | Under the task card's rubric line |
| Faculty header | What faculty ask | Mono 12 ink "FACULTY ASK EACH STUDENT" over Serif italic 19 ink "Better by whose standard?" | x 716; baselines 44 and 70 |
| Speech panels | What each student says | Paper-bright box, rounded 8, hairline ink border (25%), small tail toward the block. Serif 15 ink in quotation marks, three lines. Words appear at about 3 words a second | First x 716–936, y Y1 + 40 to Y1 + 118; second the same beside the second block |
| Caption band | The words for each beat | A mono counter ("3 / 9") and the caption in Serif 22 ink. In beat 9: mono 13 "FACULTY CHECK" over the check in Serif italic 30, then directly under it at the same size, "To find out, ask each student: better by whose standard?" | Under the stage |
| Beat list | Text equivalent and navigation | Nine numbered captions with "On screen" lines (visible in reduced-motion, print and narrow views) | Under the controls |

**The requests.**

| Row and decision | First student | Left unsaid (beat 5) | Second student |
| --- | --- | --- | --- |
| 0 · The criteria | "Give me feedback" | against your criteria | "Give me feedback **against my criteria**" |
| 1 · How the argument runs | "Suggest a better structure" | for your argument | "Suggest a better structure **for my argument**" |
| 2 · What "strategic" means | "Make it more strategic" | as you define it | "Make it more strategic, **as I define it**" |

The bold words are red on screen.

**The notes** (the same for both): "Tighten the opening", "Add a cost estimate", "Sound more decisive". The first student ticks all three. The second ticks the first two and strikes the third, with the reason "only if the evidence is".

**The answers** to "Better by whose standard?"

| | Answer (ink, both) |
| --- | --- |
| First student | "The AI's notes, I suppose. I worked through what it flagged." |
| Second student | "Mine, set first from the rubric: does the evidence back my call?" |

**Narrow screens.** Whenever any picture text would render under 11 px (a stage narrower than about 880 px), the SVG collapses and the stacked text stage takes over, driven by the same clock, with text at 12–16 px:
- *Top:* the task and the rubric line (underlined once the second student consults it), then, from beat 8, "Faculty ask: Better by whose standard?"
- *The two students side by side,* as two columns. Each column has:
  - the name and draft counter, then "Revised with AI";
  - the AI's notes, ticked or struck as on desktop, with the second student's reason;
  - one cell per decision: the request as a quote, then a chip naming the decision and who decides it ("Student's to decide", dashed; "AI decides", grey; "Student decides", red). A first-student chip nudges sideways and turns grey as its request carries it across.
  - At the turn, the first student's column gains the key "Left unsaid", and each cell gains a line, "UNSAID", followed by the words in a dashed box.
  - The spoken answer, from beat 8.
- *Beats 1–5* show the first student's column; the second column appears in beat 6.
- *Beat 8:* the notes and cells dim, as on desktop; the counters and "Revised with AI" stay bright.
- *Height:* the stage holds the height of its tallest moment, so the caption band and controls never move. At 390 px the final frame, check and controls measure 836 px, inside an 844 px phone.

## 4. Beats

Times are absolute seconds. In every beat the caption changes first (0.3 s fade) and nothing in the picture moves for the first second. A change the caption is about starts only after the caption can be read once, except a lead-in that the caption's first clause describes.

### Beat 1 · 0.0–8.7 s · The draft

- **On screen at the start:** an empty paper stage.
- **What moves:**
  1. 1.0–1.6: the task card fades in and rises 6 units at top left, with "EXAMPLE TASK" and the task.
  2. 1.7–2.1: the red dot grows in at (168, 198), and "First student" fades in at (24, 180).
  3. 2.2–2.8: the draft paper fades in at left.
  4. 3.0–3.4: the rubric line fades in on the task card: "RUBRIC · Evidence must back the call."
  5. 3.4–8.7: hold.
- **Caption:** "A student wants to improve a draft strategy paper."
- **Notice:** the red dot is the student and the paper is their draft. The task card carries the course's standard.
- **Why:** the setup names the situation, and the standard both students will have, before anything goes wrong.

### Beat 2 · 8.7–16.7 s · Three decisions

- **What moves:**
  1. 9.7–10.3: two hairline dividers draw down the block, and the three lane headings fade in.
  2. 10.5–11.9: three dashed cards appear one at a time in the student's lane: "The criteria", "How the argument runs", "What “strategic” means".
  3. 12.0–12.4: three empty slots ("—") fade in across from them in the AI's lane.
  4. 12.4–16.7: hold.
- **Caption:** "Improving it takes many decisions. We'll track three."
- **Notice:** the decisions start in the student's lane, dashed, because nobody has made them yet. The ledger is ours.
- **Why:** the decisions are named and placed before any request.

### Beat 3 · 16.7–28.1 s · Feedback: the request carries the criteria

- **What moves:**
  1. 17.7–18.1: the dot pulses, and a bubble grows just above the criteria card, its tail to the dot: "Give me feedback". It clips onto the card.
  2. 18.1–21.0: nothing moves while the caption is read.
  3. 21.0–23.4: one slow movement (2.4 s, eased). The bubble and the card, both fully visible, travel right together across the requests lane into the AI's lane. The card settles on the first empty slot, and an empty slot fades in where it was. As it settles, the card turns grey.
  4. 23.5–24.0: the bubble unclips and slides back into the requests lane as its quote line: "Give me feedback".
  5. 24.1–24.5: the AI's notes card appears under the paper: "AI'S NOTES", "Tighten the opening", "Add a cost estimate", "Sound more decisive".
  6. 24.6–25.8: the dot moves down the notes and ticks each one, 0.4 s apiece. "DRAFT 2" appears under the paper.
  7. 25.9–26.2: "REVISED WITH AI" appears in grey.
  8. 26.2–26.6: the dot returns home.
  9. 26.6–28.1: hold.
- **Caption:** "The student asks an AI for feedback. The request carries the criteria across."
- **Notice:** a decision moves. The criteria card travels under the request, in full view, into "THE AI DECIDES", and turns grey. The student works through every note.
- **Why:** this is the first transfer, large, slow and named. It starts 4.3 s in, once the caption can be read.

### Beat 4 · 28.1–40.1 s · Structure and strategy

- **What moves:**
  1. 29.1–29.5: the dot pulses, and a bubble grows above "How the argument runs" and clips onto it: "Suggest a better structure".
  2. 31.5–32.9: the two travel across (1.4 s); the card settles and turns grey; an empty slot appears where it was.
  3. 33.0–33.5: the bubble slides back into the requests lane as a quote line.
  4. 33.6–34.0: two grey section headings appear in the paper.
  5. 34.1–34.7: the dot works over the paper; "DRAFT 3".
  6. 34.8–35.2: the dot pulses, and a bubble grows above "What “strategic” means" and clips onto it: "Make it more strategic".
  7. 35.3–36.7: the two travel across; the card turns grey; an empty slot appears.
  8. 36.8–37.3: the bubble slides back as a quote line.
  9. 37.4–37.8: a two-row grey paragraph appears in the paper.
  10. 37.9–38.6: the dot works over the paper, "DRAFT 4" appears, and the dot returns home.
  11. 38.6–40.1: hold.
- **Caption:** "Then for a better structure, and a more strategic version."
- **Notice:** two more decisions travel across under their requests. The student's lane is three empty slots; the AI's lane three grey cards. The student revised after every request, up to draft 4.
- **Why:** the pattern holds for structure and meaning, and the effort stays visible. The first crossing waits 3.4 s, until the caption can be read once.

### Beat 5 · 40.1–49.6 s · What the requests left out (the turn)

- **On screen at the start:** the first student's block: three empty slots, three plain requests, three grey cards, the ticked notes.
- **What moves:**
  1. 41.5–42.0: the three quote lines pulse together.
  2. 44.4–44.8: beside "REQUESTS", the key fades in: a dashed swatch and "LEFT UNSAID".
  3. 44.9–45.3: under "Give me feedback", a line appears: "UNSAID", then a dashed ghost box holding "against your criteria".
  4. 45.4–45.8: under "Suggest a better structure": "UNSAID" and "for your argument".
  5. 45.9–46.3: under "Make it more strategic": "UNSAID" and "as you define it".
  6. 46.5–47.1: the three grey cards in the AI's lane pulse once.
  7. 47.1–49.6: hold.
- **Caption:** "Each request left out whose standard to use. The AI used its own."
- **Notice:** each request named only the kind of help. The dashed lines, marked "UNSAID", are what each one left out. The AI filled each gap with its own criteria, argument and meaning of "strategic": the three grey cards.
- **Why:** this is the mechanism made visible. The pulse is the lead-in the first clause names; the unsaid lines start 4.3 s in.

### Beat 6 · 49.6–62.6 s · A second student writes first

- **What moves:**
  1. 50.6–51.8: the first student's block slides up (Y 168 → 108).
  2. 51.9–52.5: the second student's block fades in below (Y = 330): "Second student", the dot, their draft, the lanes, three dashed cards and three empty slots.
  3. 54.3–54.8: the dot rises straight up the gap at x 168 to the task card's rubric line.
  4. 54.8–55.1: a navy underline draws under the rubric line and stays at 40%.
  5. 55.2–55.8: the dot comes back down onto "The criteria".
  6. 55.8–56.6: it writes in the card: red outline, red bar, red label.
  7. 56.7–57.1: back home, the dot pulses, and a bubble grows: "Give me feedback against my criteria", with "against my criteria" in red. It doesn't clip onto the card.
  8. 57.2–58.0: the bubble settles in the requests lane as a two-line quote, and a red pointer draws from "against my criteria" back to the card. The card stays.
  9. 58.1–58.5: the same AI notes card appears under this paper.
  10. 58.6–59.4: the dot ticks "Tighten the opening" and "Add a cost estimate".
  11. 59.4–59.8: it strikes "Sound more decisive" with a red line.
  12. 59.8–60.4: it writes the reason under it in red: "only if the evidence is".
  13. 60.5–60.8: "DRAFT 2" and "REVISED WITH AI" appear.
  14. 60.8–61.1: the dot returns home.
  15. 61.1–62.6: hold.
- **Caption:** "A second student writes down each decision first, then asks for the same help."
- **Notice:** the order. The student takes the criteria from the rubric and writes them before asking. The request points back to them, and the card stays in their lane. The same notes come back, and the student turns down the one that doesn't serve the rubric.
- **Why:** the caption states the habit and its order before anything happens to the student. The decision work starts 4.7 s in.

### Beat 7 · 62.6–73.5 s · Each request points to a decision

- **What moves:**
  1. 63.6–64.4: the dot writes in "How the argument runs".
  2. 64.5–64.9: a bubble grows: "Suggest a better structure for my argument", "for my argument" in red.
  3. 65.0–65.8: it settles as a quote, with a red pointer back to the card.
  4. 67.3–67.7: two grey section headings appear in this paper.
  5. 67.8–68.4: the dot works over the paper; "DRAFT 3".
  6. 68.5–69.3: the dot writes in "What “strategic” means".
  7. 69.4–69.8: a bubble grows: "Make it more strategic, as I define it", "as I define it" in red.
  8. 69.9–70.7: it settles as a quote, with a red pointer back to the card.
  9. 70.8–71.2: a two-row grey paragraph appears in this paper.
  10. 71.3–72.0: the dot works over the paper, "DRAFT 4" appears, and the dot returns home.
  11. 72.0–73.5: hold.
- **Caption:** "Each request points to a decision already made. The AI helps just as much."
- **Notice:** each decision is written before its request. All three stay red; the AI's lane stays empty. This paper gets the same grey headings and paragraph as the first.
- **Why:** this completes the one difference and shows the help is equal. The AI's help starts 4.7 s in.

### Beat 8 · 73.5–88.5 s · Faculty ask

- **On screen at the start:** both blocks complete. Both papers read "DRAFT 4" and "REVISED WITH AI".
- **What moves:**
  1. 74.5–75.5: both ledgers and both notes cards dim to 15%. The papers, counters, tags, dots, names and the task card stay at full strength.
  2. 77.5–78.0: at top right, "FACULTY ASK EACH STUDENT" and "Better by whose standard?" fade in and rise 6 units.
  3. 78.2–78.6: a speech panel opens beside the first student's block.
  4. 78.6–82.3: their words appear at about 3 words a second: "The AI's notes, I suppose. I worked through what it flagged."
  5. 82.6–83.0: a speech panel opens beside the second student's block.
  6. 83.0–87.0: their words appear at the same pace: "Mine, set first from the rubric: does the evidence back my call?"
  7. 87.0–88.5: hold.
- **Caption:** "Faculty have only the papers. They ask each student about the standard."
- **Notice:** faculty see two papers revised with AI, nothing else. Both students answer honestly, in the same ink. The first followed the AI's notes. The second names a standard they set first, from the rubric.
- **Why:** this is the difference faculty can hear. The dim is the lead-in the first sentence describes; the question appears 4.0 s in.

### Beat 9 · 88.5–96.1 s · The faculty check

- **What moves:**
  1. 88.5–88.7: caption 8 fades out.
  2. 88.7–89.3: the faculty check rises into the caption band.
  3. 92.0–93.0: both ledgers and notes cards return to full strength.
  4. 93.2–93.7: directly under the check, at the same size, "To find out, ask each student: better by whose standard?"
  5. 93.7–96.1: hold. At 96.1 the player shows Replay and the figure rests on this frame.
- **Caption:** "Faculty check: What did the AI decide for the student?" Second line, same size: "To find out, ask each student: better by whose standard?"
- **Notice:** the ledgers come back as the answer to the check: for the first student, all three decisions; for the second, none.
- **Why:** the figure ends on the check and the move an educator can make. The ledgers return 2.7 s after the check.

## 5. Final frame

The still at 96.1 s. It is also the reduced-motion view, the print view and the poster (stage plus caption band).

**Stage:**
- **Top band:** at left, the task card: "EXAMPLE TASK", "Recommend whether to keep a forward base.", "RUBRIC · Evidence must back the call." (the rubric line underlined at 40%). At right, "FACULTY ASK EACH STUDENT" over "Better by whose standard?"
- **Upper block, "First student":**
  - The paper with grey headings and paragraph, "DRAFT 4", "REVISED WITH AI", and the notes card with all three notes ticked.
  - Under red "THE STUDENT DECIDES": three empty slots marked "—".
  - Under "REQUESTS", with the key "LEFT UNSAID" beside the heading: "Give me feedback", "Suggest a better structure" and "Make it more strategic". Under each is an "UNSAID" line in a dashed box: "against your criteria", "for your argument", "as you define it".
  - Under grey "THE AI DECIDES": three grey cards.
  - At right, their answer: "The AI's notes, I suppose. I worked through what it flagged."
- **Lower block, "Second student":**
  - The paper with the same grey headings and paragraph, "DRAFT 4", "REVISED WITH AI", and the notes card with two notes ticked and "Sound more decisive" struck in red, over "only if the evidence is".
  - Under "THE STUDENT DECIDES": three red cards.
  - Under "REQUESTS": "Give me feedback against my criteria", "Suggest a better structure for my argument" and "Make it more strategic, as I define it". The red words each have a pointer back to their card.
  - Under "THE AI DECIDES": three empty slots.
  - At right, their answer: "Mine, set first from the rubric: does the evidence back my call?"

**Caption band:**

> FACULTY CHECK *(navy mono)*
> *What did the AI decide for the student?* *(Serif italic, about 30 px)*
> *To find out, ask each student: better by whose standard?* *(Serif italic, same size)*

**What the still says alone:** two students with the same task and rubric asked an AI for the same three kinds of help and got the same notes. Both papers came back revised with AI after four drafts. The first student's requests left whose standard unsaid. All three of their decisions sit with the AI, and they took every note. The second student's decisions sit in their own lane, in red. Each of their requests points to one, and they turned down a note that didn't serve the rubric. Asked whose standard, one names the AI's notes and the other names their own, from the rubric. The lines under the picture say what to ask, and how to find out.

## 6. Standalone page copy

**Title:** Invisible delegation

**Kicker:** Failure mode 5 of 7

**Setup:**

A student asks an AI for feedback on a draft paper, then a better structure, then a more strategic version, and revises after each. *The Irreducible Officer* calls what can happen next invisible delegation: a request for help transfers criteria, structure or meaning, and the student doesn't notice. The task, the rubric, the requests and both students are a constructed example.

**Figure summary** (visually hidden): An animated figure. A red dot stands for a student improving a draft strategy paper, for an example task: recommend whether to keep a forward base. The task card carries a rubric: the evidence must back the call. Beside the paper is a ledger in three lanes: "The student decides", "Requests" and "The AI decides". Three decisions start in the student's lane as dashed cards: the criteria, how the argument runs, and what "strategic" means. The student asks an AI, "Give me feedback." The request carries the criteria card across into the AI's lane, where it turns grey. The AI's notes come back ("Tighten the opening", "Add a cost estimate", "Sound more decisive"), and the student ticks all three and revises. The student then asks, "Suggest a better structure," and "Make it more strategic." Each request carries a card across, and the student revises to draft 4. Then, under each request, a dashed line marked "unsaid" shows what it left out: against your criteria, for your argument, as you define it. A second student, with the same task and rubric, checks the rubric, writes each decision in red in their own lane first, and then asks: "Give me feedback against my criteria," "Suggest a better structure for my argument," "Make it more strategic, as I define it." Their cards stay in their lane. They get the same notes, tick two, and strike "Sound more decisive" with the reason "only if the evidence is". Their paper gets the same AI help. Faculty, who have only the two papers, both marked "Revised with AI", ask each student, "Better by whose standard?" The first says, "The AI's notes, I suppose. I worked through what it flagged." The second says, "Mine, set first from the rubric: does the evidence back my call?" The figure ends on the faculty check. Each beat is listed below with what is on screen.

**Beat list (text equivalent):**

1. **A student wants to improve a draft strategy paper.** *On screen:* a task card at the top left: "Example task. Recommend whether to keep a forward base. Rubric: evidence must back the call." A red dot labelled First student appears beside a draft paper.
2. **Improving it takes many decisions. We'll track three.** *On screen:* a ledger in three lanes: "The student decides", "Requests" and "The AI decides". Three dashed cards in the student's lane: "The criteria", "How the argument runs" and "What 'strategic' means". The AI's lane shows three empty slots.
3. **The student asks an AI for feedback. The request carries the criteria across.** *On screen:* a speech bubble, "Give me feedback", clips onto the criteria card, and the two travel slowly across into the AI's lane, where the card turns grey. The request settles in the middle lane. The AI's notes appear under the paper: "Tighten the opening", "Add a cost estimate", "Sound more decisive". The student ticks all three: draft 2, revised with AI.
4. **Then for a better structure, and a more strategic version.** *On screen:* "Suggest a better structure" carries "How the argument runs" across, and "Make it more strategic" carries "What 'strategic' means". Both turn grey in the AI's lane. The AI's grey headings and paragraph appear in the paper, and the student revises to draft 4.
5. **Each request left out whose standard to use. The AI used its own.** *On screen:* a key appears, "Left unsaid". Under each request, a dashed line marked "unsaid": against your criteria; for your argument; as you define it. The three grey cards pulse.
6. **A second student writes down each decision first, then asks for the same help.** *On screen:* a second student appears below. Their dot goes up to the rubric line, comes back, and writes in the criteria card, which turns red. Then it asks, "Give me feedback against my criteria," with a red pointer back to the card. The same notes come back. The student ticks two and strikes "Sound more decisive" in red: "only if the evidence is".
7. **Each request points to a decision already made. The AI helps just as much.** *On screen:* the dot writes in "How the argument runs", then asks, "Suggest a better structure for my argument." It writes in "What 'strategic' means", then asks, "Make it more strategic, as I define it." All three cards stay red, and the AI's lane stays empty. The same grey headings and paragraph appear in this paper, up to draft 4.
8. **Faculty have only the papers. They ask each student about the standard.** *On screen:* the ledgers and notes fade; the two papers stay, both at draft 4 and marked "Revised with AI". "Faculty ask each student: Better by whose standard?" appears. The first student says, "The AI's notes, I suppose. I worked through what it flagged." The second says, "Mine, set first from the rubric: does the evidence back my call?"
9. **Faculty check: What did the AI decide for the student? To find out, ask each student: better by whose standard?** *On screen:* both ledgers and notes return: the first student's three decisions in the AI's lane, the second student's three in their own.

**Faculty check:** What did the AI decide for the student?
**To find out, ask each student: better by whose standard?** (same size)

A student who didn't notice what they handed over can honestly answer the first question with "nothing". The second line is a question they can answer, and the answer shows whose standard the help followed. In the figure, both students have the same rubric. The first followed the AI's notes. The second set their criteria from the rubric before asking, and turned down a note that didn't serve it. The essay's own pairs give the follow-ups: feedback against which criteria, a better structure for which argument, more strategic in what sense. The companion's failure-mode lab adds a fair objection: an assistant can legitimately propose criteria. The trouble starts when a student accepts them without seeing how they relate to the task.

**From the essay** (*The Irreducible Officer*, Section II, What the Problem Looks Like): the invisible delegation paragraph, quoted in full as in section 1. And from Section V, Appropriate Reliance as a Teachable Competency: "Minimal-context prompting inherits the model's frame almost entirely. Structured prompting with explicit purpose and evaluation criteria moves the human contribution upstream."

**Links:**
- Book chapter: Frame the problem → `../../book-v0/four-moves-book.html?spread=2`
- In the same chapter: Frame capture → `../frame-capture/`
- Practice: test invisible delegation with your AI assistant → `https://judgmentlab.net/#companion`
- Essay: Section II, What the Problem Looks Like → `https://judgmentlab.net/#ii-what-the-problem-looks-like`
- Essay: Section V, Appropriate Reliance as a Teachable Competency → `https://judgmentlab.net/#v-appropriate-reliance-as-a-teachable-competency`

## 7. Pacing table

Reading time is caption words ÷ 3. Picture words are new words inside the picture, answers included; repeated headings, labels and notes in the second block aren't counted. The reading budget is caption plus picture words divided by the beat's length, at 3 words a second or less.

| Beat | Time (s) | Caption words | Reading (s) | 2× (s) | Picture words | Budget (words/s) | Lead (s) | Motion (s) | Hold (s) | Total (s) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · The draft | 0.0–8.7 | 9 | 3.0 | 6.0 | 17 | 3.0 | 1.0 | 2.4 | 5.3 | 8.7 |
| 2 · Three decisions | 8.7–16.7 | 8 | 2.7 | 5.3 | 16 | 3.0 | 1.0 | 2.7 | 4.3 | 8.0 |
| 3 · Feedback | 16.7–28.1 | 13 | 4.3 | 8.7 | 20 | 2.9 | 1.0 | 8.9 | 1.5 | 11.4 |
| 4 · Structure and strategy | 28.1–40.1 | 10 | 3.3 | 6.7 | 10 | 1.7 | 1.0 | 9.5 | 1.5 | 12.0 |
| 5 · What the requests left out | 40.1–49.6 | 13 | 4.3 | 8.7 | 15 | 2.9 | 1.4 | 5.6 | 2.5 | 9.5 |
| 6 · A second student writes first | 49.6–62.6 | 14 | 4.7 | 9.3 | 13 | 2.1 | 1.0 | 10.5 | 1.5 | 13.0 |
| 7 · Each request points to a decision | 62.6–73.5 | 14 | 4.7 | 9.3 | 17 | 2.8 | 1.0 | 8.4 | 1.5 | 10.9 |
| 8 · Faculty ask | 73.5–88.5 | 12 | 4.0 | 8.0 | 31 | 2.9 | 1.0 | 12.5 | 1.5 | 15.0 |
| 9 · Faculty check | 88.5–96.1 | 8 + 10 second line | 2.7 + 3.3 | 5.3 | 0 | 2.4 | 0.0 | 5.2 | 2.4 | 7.6, then rests |
| **Total** | | **111** | **37.0** | | **139** | | **8.4** | **65.7** | **22.0** | **96.1** |

Checks:
- Changes a caption names wait until it can be read once: the criteria's crossing (beat 3, 4.3 s), the first crossing of beat 4 (3.4 s), the unsaid lines (beat 5, 4.3 s), the second student's rubric visit (beat 6, 4.7 s), the AI's help to the second student (beat 7, 4.7 s), faculty's question (beat 8, 4.0 s) and the line under the check (4.5 s after the check begins to rise).
- The first crossing is one slow 2.4 s movement with the card fully visible; the next two take 1.4 s each.
- Both students work through the notes at the same pace, 0.4 s a note, and revise with the same timing after the structure and strategy help.
- Spoken words appear at about 3 words a second: 11 words in 3.7 s, then 12 words in 4.0 s.
- Every hold is at least 1.5 s; the turn holds 2.5 s.
- No camera moves. The first student's block moves once (beat 6), and the ledgers and notes dim once (beat 8) and return (beat 9). Reduced motion shows the final frame.
- Total 96.1 s.
