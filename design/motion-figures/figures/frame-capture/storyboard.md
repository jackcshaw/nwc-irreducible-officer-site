# Frame capture: storyboard

Motion figure 1 of 8 · slug `frame-capture` · round 3 (final for build) · October 27, 2026

Starting point: `concepts-v0/frame-capture.html` ("The crop", 8.8 s). This version keeps the crop and the pull-back. It slows them to teaching pace, shows the whole problem before anything goes wrong, makes the question visibly narrow, and adds what faculty receive, what owning the frame would have looked like, and how the difference shows.

## 1. Intent

*The cold-read tester does not see this section.*

**The point.** When a student builds on an AI's reasonable first frame and never steps back to choose it, every revision improves the paper inside a boundary the student never chose. The finished paper looks the same as one from a student who weighed the alternatives and chose that frame. Only questions about the choice, or a changed case, tell the two apart.

**What a first-time educator should be able to say afterwards.** "The task asked for a response; the AI turned it into 'deter the adversary' and built on two of six considerations. That was a reasonable frame. The student took it up, did real work inside it, and never stepped back to decide whether it was the right problem. The paper I'd receive doesn't show where the frame came from. A student who weighed all six and chose deterrence could hand in the same paper. So I'd ask what problem they chose to solve, then why this frame and what would change it."

**Faculty check** (verbatim from the site's Core Failure Modes table): *What problem did the student choose to solve?* The final frame adds, smaller, the essay's own follow-ups from Section VIII: *Why this frame? What would change it?*

**Essay passage** (Section II, "What the Problem Looks Like"):

> **Frame capture** occurs when the model supplies the first plausible frame and the student never achieves enough distance to revise it. The danger is not that the frame is obviously wrong; it may be entirely reasonable. It may simply define the problem too narrowly, privilege one set of interests over others, assume a theory of adversary behavior, or treat a structural constraint as fixed when it should be contested. Once accepted, later revisions improve the answer inside the wrong boundary. The frame capture is invisible inside the final product.

Related:
- Section I, on two officers' papers: "Now ask which officer understands the problem. The papers will not tell you by themselves." (beat 8)
- Section VIII, frame evidence: "The questions are: why this problem, why this frame, what would change it? The student who answers those questions under questioning, and revises under challenge rather than retreating to the artifact's language, has owned the frame." (beats 9 and 10)
- Section VIII, transfer evidence: whether "the discipline travels" when the case changes. (beat 9)
- Section IV: "The student has to frame the problem before the analytic structure arrives."

**How the beats map to the passage.**

| Essay clause | Beat |
| --- | --- |
| "the model supplies the first plausible frame" | 3 |
| "it may be entirely reasonable" | 3 (caption says "reasonable"), 8 (a student who chose the same frame is fine) |
| "define the problem too narrowly" | 3 (the task sentence shrinks to "Deter the adversary"; the final frame shows both) |
| "assume a theory of adversary behavior" | 3 (the frame is built on the adversary's intent) |
| "Once accepted" | 4 (the student steps into the frame) |
| "the student never achieves enough distance to revise it" | 4 (up close, the frame is all the student sees), 6 (we step back; the student's dot does not move) |
| "later revisions improve the answer inside the wrong boundary" | 5 and 6 |
| "invisible inside the final product" | 7 and 8 |

**Misreadings to design against.**

1. *The AI gave a bad frame.* Beat 3 says "reasonable", the frame is a credible extended-deterrence frame (adversary's intent plus allies' interests), and beat 8's student chose the same frame.
2. *More coverage fixes it.* Beat 2 defines framing as picking. Beat 8's student kept the same two.
3. *Using an AI-proposed frame is the failure.* Beat 8 says only that the other student weighed all six and chose; it says nothing about avoiding AI.
4. *The student was lazy or cheated.* The student writes every line and revises twice.
5. *The student saw the whole problem and stayed put.* Beat 6's caption makes the distance ours ("Step back with us"), and beat 4 has already said the frame is all the student sees.
6. *Visible revision, or a revision history, proves ownership.* Beats 5 and 6 show real revisions that never touch the boundary. The papers carry no red marks, so beat 7's one visible change is about the frame.
7. *Faculty can spot frame capture by reading the paper.* Beats 7 and 8 show two identical papers.
8. *Same output, so no harm.* Beat 9: asked why this frame, or given a changed case, the two students come apart.
9. *The check is a gotcha, or a disclosure question.* The check is followed in the picture by the essay's follow-ups. A captured student can still answer "deterring the adversary"; "why this frame" and "what would change it" are what separate the two.
10. *The AI trapped the student.* The frame forms beside the student, not around them, and the student steps in.

**Changes from round 2** (cold read `tests/storyboard-read-2.md` and the orchestrator's notes):

- *Beat 6.* The caption is now "Step back with us: every revision stayed inside the AI's frame." The distance is ours; the student's dot stays put.
- *Two students apart.* The caption band in beat 10 keeps the check verbatim and adds, smaller, "Then ask: Why this frame? What would change it?"
- *The cost.* New beat 9: "Ask why this frame, or change the case, and they come apart."
- *Labels.*
  - Mono labels are 12 units, so they render at 13 px or larger in the figure's 1,040 px desktop width. Picture text that would render under 11 px is hidden on narrow screens.
  - Paper A is unlabelled while it still shows grey. "WHAT FACULTY RECEIVE" appears only after the wipe and the brackets have gone.
- *From the tester, kept small.*
  - The student starts beside the space where the frame forms and steps in during beat 4, so there is an acceptance moment and no trap closing.
  - Beat 3 shows the AI's frame and tag first, then narrows the sentence once the caption can be read.
  - The frame now builds on "Adversary's intent" and "Allies' interests", so PME viewers see a credible deterrence frame. "Past buildups" moves outside.
  - The paper labels are parallel ("WHAT FACULTY RECEIVE", then "FROM THIS STUDENT" and "FROM A STUDENT WHO CHOSE THIS FRAME"), and the red mark beside paper B is gone.
  - "FACULTY CHECK" and the player's current-beat marker are navy, so red appears only for the student.
  - The possessive in "adversary's" fades with the other words.

**Considered and left out.** The tester suggested having the AI mention the other four in passing. That would be more realistic, but beat 3 is already the busiest beat. Beat 8 carries the fairness point instead.

**Why this scenario.** The lab's frame-capture case is about an institution's success measure, while this figure's check asks about a student. So the figure uses a constructed student task in the essay's PME setting. The considerations are constructed too, and deliberately not taken from Section I's agent roles: those roles belong to an officer who owns her frame.

**Edition variants (later).** The higher-education memo and the high-school New Deal essay can supply labels as data (`concepts-v0/proposal.md` §4).

**Book link target.** `../../book-v0/four-moves-book.html?spread=2` opens move 1, "Frame the problem", until `book-v1/` exists. The mapping still waits for Jack.

**Conventions this figure sets** are written up in `../../CONVENTIONS.md`.

## 2. Scenario

A war-college student must recommend a response to an adversary's military buildup. The student asks an AI for help, and it proposes a reasonable frame: deter the adversary, working from the adversary's intent and allies' interests. The student takes up that frame and writes and revises inside it, without weighing past buildups, domestic politics, room to negotiate or economic pressure. At the end, a second paper stands for a different student, who weighs all six, chooses the same frame and hands in the same paper.

*Sources.* The task, the six considerations and the AI's title, "Deter the adversary", are constructed for this figure, and the task card says "Example task". *The Irreducible Officer*, Section II, warns that a reasonable frame can "define the problem too narrowly" or "assume a theory of adversary behavior". "Room to negotiate" and "Economic pressure" are other kinds of response, so the narrowing from "a response" to "deter" is visible to a non-specialist. The second student follows Section I's point that two papers "will not tell you by themselves" which author understands the problem. The follow-up questions are Section VIII's. The figure shows no numbers.

## 3. Cast and grammar

**The colour rule.** Grey is what the AI supplied. Red is what the student decided, plus the labels that name the student; nothing else in the picture is red. Navy ink is the page itself: the task, the labels, and the words the student wrote. A dashed outline means nobody has taken a consideration up; solid means someone did.

**Palette.** Paper `#f6f1e8` (stage), paper-bright `#fffdfa` (cards and sheets), ink `#0a2242`, machine grey `#5b564f` for strokes and text with a `#ded5c4` band or fill behind AI-supplied text, red `#b81b2b`. Type: Source Serif 4 for titles and captions, Source Sans 3 for consideration labels, IBM Plex Mono for small labels (12 units, never smaller).

**Stage.** An SVG with a 960 × 540 viewBox. The left part (x 0–650) is where the student works; the right column (x 670–946) holds the task and, later, the papers faculty receive. Positions are viewBox units at 1×. Widths of text-sized elements come from measured text at build time.

| Element | Stands for | How it looks | Where (at 1×) |
| --- | --- | --- | --- |
| Stage | The whole problem, and what faculty see of it | Plain paper | 0–960 × 0–540 |
| Task card | The assignment | Paper-bright card, hairline ink border (15%). Mono 12 "EXAMPLE TASK", then Serif 16 ink over two lines: "Recommend a response to an / adversary's military buildup." | x 670–946, y 24–106 |
| Red dot | The student | Solid red circle, radius 5. "Student" (Sans 600 13, red) centred under it in beats 1–3 | Starts at (80, 270), left of the open space |
| Six considerations | Things that could shape the answer | Sans 600 15 ink labels in chips 30 high, rounded 3, dashed ink outline at 45% (dash 4, gap 3) | Top row, y 60–90: Past buildups (x 24), Adversary's intent (x 249), Room to negotiate (x 480). Bottom row, y 470–500: Allies' interests (x 24), Domestic politics (x 250), Economic pressure (x 480) |
| The AI's frame | The frame the AI proposes | Four grey corner brackets (stroke 2.6, square caps, arms 24) joined by a grey hairline (1 unit, 40%). Mono 12 tag "AI'S FRAME" in grey above the top-left corner | x 140–510, y 130–410; tag baseline (140, 120) |
| The AI's title | The AI's restatement of the problem | Serif 600 18, grey, on a grey-tinted band: "Deter the adversary" | Baseline (162, 160) |
| The AI's headings | The two considerations the AI built on | "Adversary's intent" and "Allies' interests", moved inside and redrawn solid at 85%: grey outline, grey-tinted fill, grey text | (162, 176) and (330, 176) |
| The student's draft | The student's writing | Ink bars at 85%, 4.5 high, rounded, in two columns: left x 162–316, right x 330–488, rows every 12 units from y 222. Later a four-bar ink chart and a thicker conclusion bar | Inside the frame |
| Draft label | Names the red work | Mono 12, red: "STUDENT'S DRAFT 1/2/3", right-aligned | (492, 398) |
| Change bars | The student's revisions | Red vertical bars 2.5 wide in the left margin beside what changed, drawn by the dot | Left margin x 153, right margin x 321 |
| Camera | How close we stand | 1× shows the whole stage. 1.6× (centred on 325, 270) shows only the frame | Beats 4–5 at 1.6×; all others at 1× |
| Paper A | The paper this student hands in | Paper-bright sheet, hairline ink border, soft shadow, holding the frame's contents at 60%: title, headings, draft 3, chart. No change bars, no dot | Sheet x 680–900, y 158–302 |
| Paper labels | Who the papers come from | Mono 12 ink: "WHAT FACULTY RECEIVE" (600) over "FROM THIS STUDENT" above paper A; "FROM A STUDENT WHO CHOSE THIS FRAME" above paper B | Baselines (680, 132), (680, 150), (680, 326) |
| Paper B | The same paper from a student who chose this frame | Identical to paper A, all ink | Sheet x 680–900, y 334–478 |
| Caption band | The words for each beat | Real text under the picture, inside the figure: a mono counter ("3 / 10") and the caption in Serif 22 ink. In beat 10 it holds the check: mono 13 ink "FACULTY CHECK" over the question in Serif italic 30 ink, then mono 12 "THEN ASK" with "Why this frame? What would change it?" in Serif 20 | Under the stage |
| Beat list | Text equivalent and navigation | Ten numbered captions under the player controls; the current beat has a navy rule and number. Each beat's "On screen" line is visible in reduced-motion, print and narrow views, and always available to screen readers | Under the controls |

**Draft geometry** (for the build).

- *Draft 1*, ragged: four rows per column. Left widths 144, 116, 132, 70 with x offsets 0, 5, −3, 8. Right widths 150, 124, 154, 88 with offsets 0, 6, −2, 3.
- *Draft 2*, straightened: six rows per column, full width except the last (left 96, right 104), rows y 222 to 282.
- *Draft 3*: draft 2, plus a chart under the right column (four ink bars 12 wide, 7 apart from x 330, baseline y 326, heights 20, 13, 28, 17) and a conclusion bar across both columns (x 162–488, y 342, 7 high, ink at 100%).
- *Change bars*: draft 2 adds one per column (y 218–287). Draft 3 adds one beside the chart (x 321, y 296–328) and one beside the conclusion (x 153, y 339–352).

**Narrow screens.** Any picture text that would render under 11 px is hidden. Below about 880 px of figure width that includes the mono labels, and below about 700 px the chip labels and the task card text too. The shapes and motion stay. Each beat's "On screen" line then shows under its caption in the beat list, and the caption band carries the words at full size.

## 4. Beats

Times are absolute seconds. In every beat the caption changes first (0.3 s crossfade) and nothing in the picture moves for the first second. A change the caption is about starts only after the caption can be read once.

### Beat 1 · 0.0–6.0 s · The task

- **On screen at the start:** an empty paper stage. The caption band is empty.
- **What moves:**
  1. 0.0–0.3: caption 1 fades in.
  2. 1.0–1.6: the task card fades in and rises 6 units into place at top right.
  3. 1.6–2.0: the red dot grows in at (80, 270), left of the open space, with its "Student" label.
  4. 2.0–6.0: hold.
- **Caption:** "A student gets an open strategy task."
- **Notice:** the red dot is the student. The task asks for "a response" and doesn't say what kind.
- **Why:** the setup names the situation before anything goes wrong. "Open" primes the narrowing in beat 3.

### Beat 2 · 6.0–14.0 s · Many things could matter

- **On screen at the start:** the task card and the labelled dot.
- **What moves:**
  1. 6.0–6.3: caption 2 fades in.
  2. 7.0–9.6: six considerations appear one at a time, each fading in and rising 6 units over 0.35 s, one every 0.45 s. They alternate top and bottom rows, left to right: Past buildups, Allies' interests, Adversary's intent, Domestic politics, Room to negotiate, Economic pressure. All six are dashed and look alike.
  3. 9.6–14.0: hold.
- **Caption:** "Many things could matter. Framing means picking which ones define the problem."
- **Notice:** six equal considerations, three above the open space and three below. Nobody has picked yet.
- **Why:** the whole problem has to be in view before the crop, along with a plain definition of framing as picking.

### Beat 3 · 14.0–22.0 s · The AI proposes a narrower frame

- **On screen at the start:** the task card, the labelled dot, and the six dashed considerations.
- **What moves:**
  1. 14.0–14.3: caption 3 fades in.
  2. 15.0–15.4: the red dot pulses once (radius 5 to 7.5 and back). The student asks.
  3. 15.5–16.2: grey brackets appear around a wider area (x 110–540, y 104–436) and spring tight to the frame (x 140–510, y 130–410), with the hairline. The open space now has a grey boundary; the student is just outside it.
  4. 16.2–16.5: the tag "AI'S FRAME" fades in.
  5. 17.7–18.5: a grey copy of the task sentence lifts off the card, which stays as it is, and travels to the top of the frame (around 162, 152).
  6. 18.5–19.5: the copy narrows. Every word except "adversary" fades out, the possessive included (0.4 s). "Adversary" slides to the end of the title line (0.3 s). "Deter the" fades in in front of it, on its grey band (0.3 s). The line now reads "Deter the adversary".
  7. 19.6–20.3: Adversary's intent (top row) and Allies' interests (bottom row) slide into the frame as headings, shrinking to 85% and turning solid grey. Their old places stay empty.
  8. 20.3–22.0: hold.
- **Caption:** "The student asks an AI. It proposes a reasonable, narrower frame."
- **Notice:** the grey frame is labelled as the AI's before anything else happens. Then the task's open "a response" visibly shrinks to "Deter the adversary". The frame takes in two of the six considerations. Nothing about it looks wrong.
- **Why:** this is the moment the first plausible frame arrives. The narrowing starts 3.7 s into the beat, once the 11-word caption can be read, so the viewer can watch it.

### Beat 4 · 22.0–30.0 s · The student takes it up

- **On screen at the start:** the whole stage as beat 3 left it, at 1×, with the dot outside the frame on its left.
- **What moves:**
  1. 22.0–22.3: caption 4 fades in.
  2. 23.0–23.8: the dot moves into the frame, crossing its left side, to the start of the left column's first row (162, 224). The "Student" label fades out as it leaves.
  3. 24.0–25.9: the camera pushes in to 1.6×, centred on the frame, which then fills the view. Everything outside the frame leaves the view.
  4. 26.1–28.1: the dot writes draft 1, eight ragged rows at 0.25 s each, left column top to bottom, then the right. Each bar grows behind the dot. "STUDENT'S DRAFT 1" fades in as writing starts.
  5. 28.1–30.0: hold.
- **Caption:** "The student takes up the frame. Up close, it's all they see."
- **Notice:** the student chooses to step in; nothing pushes them. Then the rest of the problem goes out of sight.
- **Why:** this is "once accepted" in the essay, plus its mechanism of distance. The close view is the student's view.

### Beat 5 · 30.0–37.0 s · Revisions

- **On screen at the start:** at 1.6×, the frame filling the view, with draft 1 in ink under the grey title and headings.
- **What moves:**
  1. 30.0–30.3: caption 5 fades in.
  2. 31.0–31.8: draft 2, left column. The dot runs down the left margin, drawing a red change bar, and the rows straighten into six as it passes. The label changes to "STUDENT'S DRAFT 2".
  3. 31.8–32.6: the same for the right column.
  4. 32.6–33.1: pause.
  5. 33.1–34.0: draft 3, evidence. The dot draws a red bar beside the space under the right column, then moves along the chart's baseline as four ink bars grow. The label changes to "STUDENT'S DRAFT 3".
  6. 34.0–34.3: pause.
  7. 34.3–35.2: draft 3, conclusion. The dot draws a red bar in the left margin, then sweeps left to right as a thick conclusion bar draws across both columns. The dot stops at its right end (488, 345.5).
  8. 35.2–37.0: hold.
- **Caption:** "The student revises twice, adding evidence and a firmer conclusion."
- **Notice:** the paper gains a chart and a conclusion. Every red mark is the student's. The grey title and headings never change.
- **Why:** the student's effort has to be real and visible, so the failure reads as structural.

### Beat 6 · 37.0–44.3 s · Step back with us (the turn)

- **On screen at the start:** at 1.6×, draft 3 inside the frame, red change bars in both margins, the dot at the end of the conclusion.
- **What moves:**
  1. 37.0–37.3: caption 6 fades in.
  2. 38.0–40.4: the camera pulls back to 1×. The four dashed considerations and the task card come back into view, exactly as they were. The dot does not move.
  3. 40.4–44.3: hold.
- **Caption:** "Step back with us: every revision stayed inside the AI's frame."
- **Notice:** we see the whole problem again; the student, still at the end of the conclusion, doesn't. Every red mark sits inside the grey boundary. The four considerations outside are still dashed. The frame never moved.
- **Why:** this is the mechanism made visible. The caption makes the distance ours, so the still dot reads as a student who never got this view.

### Beat 7 · 44.3–52.3 s · What faculty receive

- **On screen at the start:** the whole stage at 1×. Below the task card, the right column is empty.
- **What moves:**
  1. 44.3–44.6: caption 7 fades in.
  2. 45.3–46.2: paper A fades in and rises 6 units under the task card, unlabelled. It sits inside its own grey corner brackets and hairline, and its title band and headings are still grey. It has no red marks.
  3. 46.2–48.0: nothing moves while the caption is read.
  4. 48.0–49.2: a wipe crosses paper A from left to right, its front marked by a thin ink line. Behind the line, the grey band and fills are gone and the title and headings are the same navy ink as the student's text.
  5. 49.2–49.5: pause.
  6. 49.5–50.4: the grey brackets and hairline around paper A fade away.
  7. 50.4–50.8: "WHAT FACULTY RECEIVE" and "FROM THIS STUDENT" fade in above paper A.
  8. 50.8–52.3: hold.
- **Caption:** "The paper faculty receive doesn't show where the frame came from."
- **Notice:** after the wipe, nothing marks the title or headings as the AI's. Once the brackets go, nothing shows the paper was framed at all. Only then is it labelled as what faculty receive.
- **Why:** the essay says frame capture "is invisible inside the final product." The frame's origin disappears from the paper one change at a time.

### Beat 8 · 52.3–59.8 s · The same paper

- **On screen at the start:** the stage as beat 7 left it.
- **What moves:**
  1. 52.3–52.6: caption 8 fades in.
  2. 53.3–54.2: paper B fades in and rises 6 units below paper A, with its label "FROM A STUDENT WHO CHOSE THIS FRAME". It is identical to paper A.
  3. 54.2–59.8: hold.
- **Caption:** "Another student weighed all six and chose this frame: same paper."
- **Notice:** the two papers can't be told apart. Only the labels, which faculty don't get, differ.
- **Why:** without this beat, viewers can leave thinking the AI's frame was bad or that the student should have covered all six. The same frame, chosen, gives the same paper.

### Beat 9 · 59.8–67.8 s · Where they differ

- **On screen at the start:** the stage as beat 8 left it.
- **What moves:**
  1. 59.8–60.1: caption 9 fades in.
  2. Nothing in the picture moves. 60.1–67.8: hold.
- **Caption:** "Ask why this frame, or change the case, and they come apart."
- **Notice:** the papers stay identical. The difference lives in the students, and only a question or a changed case reaches it.
- **Why:** two identical papers invite "same output, no harm". This is the essay's answer: the student who chose the frame can defend it and carry the method into a changed case.

### Beat 10 · 67.8–74.8 s · The faculty check

- **On screen at the start:** the stage as beat 9 left it, with caption 9 in the band.
- **What moves:**
  1. 67.8–68.0: caption 9 fades out.
  2. 68.0–68.6: the faculty check rises 8 units into the caption band and fades in: "FACULTY CHECK" in navy mono, then the question in large italic serif.
  3. 71.4–71.9: below it, smaller, "THEN ASK" and "Why this frame? What would change it?" fade in.
  4. 71.9–74.8: hold. At 74.8 the player shows Replay and the figure rests on this frame.
- **Caption:** "Faculty check: What problem did the student choose to solve?" Follow-up line: "Then ask: Why this frame? What would change it?"
- **Notice:** both papers answer the first question the same way, "Deter the adversary". The follow-ups are the questions that separate the two students.
- **Why:** the figure ends on the questions an educator can ask.

## 5. Final frame

The still at 74.8 s. It is also the reduced-motion view, the print view and the poster for social cards (stage plus caption band).

**Stage, at 1×:**

- **Left, top and bottom rows:** four dashed considerations, with gaps where the AI took two. Top: Past buildups, (gap), Room to negotiate. Bottom: (gap), Domestic politics, Economic pressure.
- **Left, middle:** the AI's frame. Grey corner brackets joined by a grey hairline (x 140–510, y 130–410), with "AI'S FRAME" above the top-left corner. Inside, from the top:
  - "Deter the adversary" in grey on its band;
  - the grey headings "Adversary's intent" and "Allies' interests";
  - draft 3 in ink, with two columns of rows, a four-bar chart under the right column, and a conclusion bar across both;
  - red change bars in both margins, beside the chart and beside the conclusion;
  - the red dot at the end of the conclusion;
  - "STUDENT'S DRAFT 3" in red at bottom right.
- **Right column, top to bottom:**
  - The task card: "EXAMPLE TASK" over "Recommend a response to an adversary's military buildup."
  - "WHAT FACULTY RECEIVE" over "FROM THIS STUDENT" and paper A: the paper at 60% in one navy ink, titled "Deter the adversary".
  - "FROM A STUDENT WHO CHOSE THIS FRAME" over paper B, identical.

**Caption band:**

> FACULTY CHECK *(navy mono, letter-spaced)*
> *What problem did the student choose to solve?* *(Source Serif 4 italic, about 30 px on desktop)*
> THEN ASK *(navy mono, smaller)* Why this frame? What would change it? *(Source Serif 4, about 20 px)*

**In the reduced-motion and print views,** the full beat list sits below the controls with all ten captions and their "On screen" lines readable at once. Clicking a beat shows its settled still without tweening.

**What the still says alone:**
- The task asked for a response. The AI's grey frame redefined it as deterrence and took in two considerations.
- The student's red work sits entirely inside that frame, with four considerations outside.
- Faculty receive a paper in one ink, identical to one from a student who chose the frame.
- The questions under the picture are how to tell them apart.

## 6. Standalone page copy

**Title:** Frame capture

**Kicker:** Failure mode 1 of 7

**Setup:**

A student asks an AI for help with a strategy paper, and the AI proposes a reasonable way to frame the problem. The student works hard from there. *The Irreducible Officer* calls what can happen next frame capture: the first plausible frame becomes the student's frame. The figure runs a little over a minute; pause it or step through the beats below. The task and the six considerations are a constructed example.

**Beat list (text equivalent):**

1. **A student gets an open strategy task.** *On screen:* a task card appears at the top right: "Example task: Recommend a response to an adversary's military buildup." A red dot labelled Student appears on the left.
2. **Many things could matter. Framing means picking which ones define the problem.** *On screen:* six considerations appear one at a time in dashed outline, three above an open space and three below: past buildups, allies' interests, adversary's intent, domestic politics, room to negotiate, and economic pressure.
3. **The student asks an AI. It proposes a reasonable, narrower frame.** *On screen:* the dot pulses. Grey corner brackets labelled "AI's frame" snap around the open space beside the student. A grey copy of the task sentence moves into the frame; every word fades except "adversary", and "Deter the" appears in front of it. Adversary's intent and allies' interests slide inside as grey headings.
4. **The student takes up the frame. Up close, it's all they see.** *On screen:* the dot steps into the frame. The view moves in until the frame fills it, and the dot writes a rough first draft in two columns under the AI's headings.
5. **The student revises twice, adding evidence and a firmer conclusion.** *On screen:* the dot straightens the rows, then adds a chart and a conclusion across both columns. Red change bars mark each revision. The red label reads Student's draft 3.
6. **Step back with us: every revision stayed inside the AI's frame.** *On screen:* the view pulls back to the whole picture while the dot stays where it is. The four dashed considerations sit where they were. Every red mark is inside the grey brackets.
7. **The paper faculty receive doesn't show where the frame came from.** *On screen:* under the task card, a copy of the paper appears inside grey brackets. A wipe crosses it, and the grey title and headings turn the same ink as the student's text. The brackets fade, and the label "What faculty receive: from this student" appears.
8. **Another student weighed all six and chose this frame: same paper.** *On screen:* a second, identical paper appears below the first, labelled "From a student who chose this frame".
9. **Ask why this frame, or change the case, and they come apart.** *On screen:* nothing moves. The two papers stay identical.
10. **Faculty check: What problem did the student choose to solve? Then ask: Why this frame? What would change it?** *On screen:* the questions appear under the picture. The task card's "a response" and the papers' title, "Deter the adversary", are both in view.

**Faculty check:** What problem did the student choose to solve?

To follow up, Section VIII of the essay asks: why this problem, why this frame, what would change it?

**From the essay** (*The Irreducible Officer*, Section II):

> Frame capture occurs when the model supplies the first plausible frame and the student never achieves enough distance to revise it. The danger is not that the frame is obviously wrong; it may be entirely reasonable. It may simply define the problem too narrowly, privilege one set of interests over others, assume a theory of adversary behavior, or treat a structural constraint as fixed when it should be contested. Once accepted, later revisions improve the answer inside the wrong boundary. The frame capture is invisible inside the final product.

**Links:**

- Book chapter: Frame the problem
- Practice: test frame capture with your AI assistant → `https://judgmentlab.net/#companion`
- Essay: Section II, What the Problem Looks Like → `https://judgmentlab.net/#ii-what-the-problem-looks-like`

## 7. Pacing table

Reading time is caption words ÷ 3. The beat total is lead + motion + hold, and every total is at least twice the reading time. Lead is the first second of a beat, when only the caption changes. Motion runs from the first movement to the last, including pauses between movements. Label words are new words inside the picture.

| Beat | Time (s) | Caption words | Reading (s) | 2× reading (s) | Label words | Lead (s) | Motion (s) | Hold (s) | Total (s) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · The task | 0.0–6.0 | 7 | 2.3 | 4.7 | 11 | 1.0 | 1.0 | 4.0 | 6.0 |
| 2 · Many things could matter | 6.0–14.0 | 12 | 4.0 | 8.0 | 13 | 1.0 | 2.6 | 4.4 | 8.0 |
| 3 · A narrower frame | 14.0–22.0 | 11 | 3.7 | 7.3 | 5 | 1.0 | 5.3 | 1.7 | 8.0 |
| 4 · The student takes it up | 22.0–30.0 | 12 | 4.0 | 8.0 | 3 | 1.0 | 5.1 | 1.9 | 8.0 |
| 5 · Revisions | 30.0–37.0 | 10 | 3.3 | 6.7 | 2 | 1.0 | 4.2 | 1.8 | 7.0 |
| 6 · Step back with us | 37.0–44.3 | 11 | 3.7 | 7.3 | 0 | 1.0 | 2.4 | 3.9 | 7.3 |
| 7 · What faculty receive | 44.3–52.3 | 11 | 3.7 | 7.3 | 6 | 1.0 | 5.5 | 1.5 | 8.0 |
| 8 · The same paper | 52.3–59.8 | 11 | 3.7 | 7.3 | 7 | 1.0 | 0.9 | 5.6 | 7.5 |
| 9 · Where they differ | 59.8–67.8 | 12 | 4.0 | 8.0 | 0 | 0.3 (fade only) | 0.0 | 7.7 | 8.0 |
| 10 · Faculty check | 67.8–74.8 | 10 + 9 follow-up | 3.3 + 3.0 | 6.7 (check) | 0 | 0.0 | 4.1 | 2.9 | 7.0, then rests |
| **Total** | | **116** | **38.7** | | **47** | | **31.1** | | **74.8** |

Checks against the pacing rules:

- One idea per beat; movements run one after another.
- Changes the caption is about wait until the caption can be read once: the narrowing in beat 3 starts at 3.7 s, the wipe in beat 7 at 3.7 s, and the follow-up line in beat 10 at 3.6 s.
- Every hold after motion is at least 1.5 s. The figure rests on its final frame indefinitely after 74.8 s, so the follow-up line stays up.
- The camera moves are 1.9 s in and 2.4 s out, eased, under 2.5 s. Reduced motion removes them.
- Total 74.8 s, under the 75 s limit. The setup (beats 1 and 2, 14 s) names the situation before anything goes wrong; the turn is beat 6; the figure ends on the faculty check.
