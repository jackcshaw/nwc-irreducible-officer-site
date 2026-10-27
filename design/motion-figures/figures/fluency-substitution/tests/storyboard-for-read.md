# Fluency substitution: storyboard

Motion figure 2 of 8 · slug `fluency-substitution` · storyboard round 2, revised after storyboard cold read 1 · October 27, 2026

*Cold-read copy. The Intent section is removed.*

## 2. Scenario

A war-college student must recommend whether to send forces to reassure a threatened ally. The student asks an AI for a draft. It writes a polished paragraph that weighs escalation against the ally's trust and concludes, on balance, that the forces should go, with clear limits. The student reads it closely, cuts one weak sentence and agrees with the rest. A second student first writes a plain note, "Send them. The ally's trust matters most, and troops show we mean it.", then has an AI write it up and reads that draft just as closely. The two papers are identical, and both are tagged as drafted with AI. With the papers set aside, faculty ask each student why. Both answer, the first in the paper's words. Then faculty ask what if the ally doesn't want troops on its soil. The first student repeats the paper's balancing line. The second keeps the reason and changes the call: send aid and hold exercises instead.

*Sources.* The task, the paragraph, the note and every answer are constructed for this figure, and the task card says "Example task". *The Irreducible Officer*, Section II, describes the AI's "balanced paragraphs, caveats in the right places, the measured voice of a considered judgment". Section VIII names the student who "revises under challenge rather than retreating to the artifact's language". Section I notes that disclosure doesn't show whose judgment the work holds. The follow-up question is from the oral defense in Section IX. The figure shows no numbers.

## 3. Cast and grammar

**The colour rule.** Grey is what the AI wrote: both drafts, which stay grey on the papers, and its sentences when a student repeats them. Red is what a student decided or said in their own words (the first student's cut, the second student's note and answers), plus the name labels beside the dots and the note's label. Navy ink is the page: the task, the labels, the questions and the key. A small key in the final frame says grey is "written by AI" and red is "a student's own words".

**Palette.** Paper `#f6f1e8`, paper-bright `#fffdfa`, ink `#0a2242`, machine grey `#5b564f` with a `#ded5c4` band behind AI-written text, red `#b81b2b`. Type: Source Serif 4 for drafts, notes, answers, questions and captions; Source Sans 3 for name labels; IBM Plex Mono for small labels (12 units, never smaller).

**Stage.** An SVG with a 960 × 540 viewBox. One view, no camera moves.
- *Beats 1–3:* the first student's draft, large, at centre left.
- *Beats 4–5:* the first paper shrinks into the left column. The second student's note sits at lower centre, and their draft appears large at centre right.
- *Beats 6–10:* a table with two rows and three columns. Each row is one student: their paper, their answer to "why", and their answer to the changed fact. The questions head the columns.

Positions are viewBox units. Widths of text-sized elements and line breaks come from measured text at build time.

| Element | Stands for | How it looks | Where |
| --- | --- | --- | --- |
| Task card | The assignment | Paper-bright card, hairline ink border (15%). Mono 12 "EXAMPLE TASK", then Serif 16 ink over two lines: "Recommend whether to send forces / to reassure a threatened ally." It stays in place throughout | x 656–946, y 24–106 |
| Red dot | The first student | Solid red circle, radius 5, labelled "Student" (Sans 600 13, red) in beats 1–2 | Starts at (70, 242) |
| The AI's draft for the first student | The paragraph the AI writes | Paper-bright sheet, hairline border, soft shadow, with a grey mono 12 tag "AI'S DRAFT" above it. Serif 20 grey text on a grey band: "Any course must weigh escalation against the ally's trust. On balance, losing that trust is the greater risk: the forces should go, with clear limits to contain escalation. Either choice carries real consequences." | Sheet x 120–580, y 132–386 (six lines, baselines 176–346); after the cut, y 132–352 |
| The cut | The first student's edit | A red strike through "Either choice carries real consequences."; the sentence then fades, and the sheet's lower edge rises to fit five lines | Lines 5–6 |
| Paper A | The paper the first student hands in | The same sheet, still grey on its band: "Any course must weigh escalation against the ally's trust. On balance, losing that trust is the greater risk: the forces should go, with clear limits to contain escalation." The tag becomes navy mono "FIRST STUDENT'S PAPER" followed by grey mono "· DRAFTED WITH AI" | From beat 4: 66% at x 24–328, y 204–349; label baseline (24, 196) |
| Second red dot | The second student | Solid red circle, radius 5, labelled "Another student" (Sans 600 13, red) in beats 4–5 | Starts at (382, 436) |
| The note | The second student's own judgment | Paper-bright card, hairline border, with red mono 12 "SECOND STUDENT'S NOTE". Serif 18 red over three lines: "Send them. The ally's trust / matters most, and troops / show we mean it." | x 400–700, y 388–484. In beat 5 it slides up behind the second draft and is hidden |
| The AI's draft for the second student | The paragraph the AI writes from the note | A sheet the same size, grey tag "AI'S DRAFT", the same 28 grey words on a grey band as paper A | x 380–840, y 132–352 |
| Paper B | The paper the second student hands in | Identical to paper A, labelled navy "SECOND STUDENT'S PAPER" and grey "· DRAFTED WITH AI" | From beat 6: 66% at x 24–328, y 382–527; label baseline (24, 374) |
| Faculty header | What faculty receive | Mono 12 600 ink "WHAT FACULTY RECEIVE" | (24, 154) |
| Set aside | Faculty ask without the paper | Both papers (sheet and words) dim to 70%. Their labels stay full strength | Beats 7–10 |
| Source brightening | Where a repeated sentence comes from | The sentence on dimmed paper A returns to full strength while the first student says it, then dims again | Beats 7 and 8 |
| Question 1 | What faculty ask first | Mono 12 ink "FACULTY ASK, PAPERS ASIDE" over Serif italic 17 ink "What do you recommend, and why?" | Column 2 header, x 386–640; baselines 128 and 154 |
| Question 2 | The changed fact | Mono 12 ink "THEN THEY ASK" over Serif italic 17 ink in two lines: "What if the ally doesn't want / our troops on its soil?" | Column 3 header, x 660–946; baselines 128, 154, 176 |
| The dots, answering | The two students | The same red dots, each level with its own paper | (372, 276) and (372, 454) |
| Speech panels | What each student says | Paper-bright box, rounded 8, hairline ink border (25%), small tail on its left. Serif 16. The first student's words are grey on a grey band; the second student's are red | Column 2: x 386–640, rows at y 236–318 and 414–496. Column 3: x 660–946, rows at y 250–304 and 428–482 |
| Colour key | How to read the colours | Mono 12: a grey band swatch with grey "WRITTEN BY AI", then a red dot with red "A STUDENT'S OWN WORDS" | Baseline (386, 526), from beat 6 |
| Caption band | The words for each beat | Real text under the picture: a mono counter ("3 / 10") and the caption in Serif 22 ink. In beat 10: mono 13 ink "FACULTY CHECK" over the question in Serif italic 30, then mono 12 "THEN ASK" with "What evidence would change your recommendation?" in Serif 20. Fixed height on desktop | Under the stage |
| Beat list | Text equivalent and navigation | Ten numbered captions with "On screen" lines (visible in reduced-motion, print and narrow views; always available to screen readers). The current beat has a navy rule | Under the controls |

**The answers.**

| | Question 1: "What do you recommend, and why?" | Question 2: "What if the ally doesn't want our troops on its soil?" |
| --- | --- | --- |
| First student (grey band) | "On balance, losing that trust is the greater risk: the forces should go." (the paper's second sentence, word for word) | "Any course must weigh escalation against the ally's trust." (the paper's first sentence, word for word) |
| Second student (red) | "Send them. Their trust matters most, and troops show we mean it." | "Then troops would cost their trust. I'd send aid and hold exercises instead." |

**Narrow screens.** Any picture text that would render under 11 px is hidden. Each beat's "On screen" line then shows under its caption in the beat list, and the caption band carries the words at full size. The paragraph and answers are this figure's content, so the "On screen" lines quote them in full.

## 4. Beats

Times are absolute seconds. In every beat the caption changes first (0.3 s fade) and nothing in the picture moves for the first second. A change the caption is about starts only after the caption can be read once.

### Beat 1 · 0.0–6.0 s · The task

- **On screen at the start:** an empty paper stage.
- **What moves:**
  1. 1.0–1.6: the task card fades in and rises 6 units at top right.
  2. 1.6–2.0: the red dot grows in at (70, 242), with its "Student" label.
  3. 2.0–6.0: hold.
- **Caption:** "A student gets a task that needs a decision."
- **Notice:** the red dot is the student. The task asks *whether* to send forces, so the answer has to come down on one side.
- **Why:** the setup names the situation before anything goes wrong.

### Beat 2 · 6.0–14.7 s · The AI drafts

- **What moves:**
  1. 7.0–7.4: the red dot pulses once. The student asks.
  2. 7.4–7.9: a blank sheet fades in at centre left, with the grey tag "AI'S DRAFT" above it.
  3. 8.0–10.4: the paragraph composes line by line, 0.4 s a line, each line's words arriving in grey on their band.
  4. 10.4–14.7: hold.
- **Caption:** "The student asks an AI for a draft. It writes a polished recommendation."
- **Notice:** the paragraph weighs escalation against the ally's trust, says "On balance", makes a call (the forces should go) and adds a caveat (clear limits). It ends on a general line, "Either choice carries real consequences."
- **Why:** this is the essay's "tone of analytic maturity", large enough to read, and good enough to agree with.

### Beat 3 · 14.7–23.7 s · The student agrees

- **What moves:**
  1. 15.7–16.1: the dot moves onto the sheet, to the start of line 1. Its label fades.
  2. 16.1–20.3: the dot reads along each line, about 0.7 s a line, just under the words. Nothing on the page changes.
  3. 20.4–21.0: the dot draws a red strike through "Either choice carries real consequences."
  4. 21.0–21.4: the struck sentence fades, and the sheet's lower edge rises to fit the five lines left.
  5. 21.5–21.9: the tag becomes navy "FIRST STUDENT'S PAPER" with grey "· DRAFTED WITH AI".
  6. 21.9–23.7: hold.
- **Caption:** "The student reads closely, cuts a weak line, and agrees with the rest."
- **Notice:** the student reads every line and cuts the one sentence that says nothing. The rest stays exactly as the AI wrote it, still grey, and the paper is now the student's, labelled as drafted with AI.
- **Why:** this is "the student mistakes well-ordered language for well-owned reasoning", shown as a careful, sincere student. The edit is a real judgment about the text.

### Beat 4 · 23.7–32.2 s · Another student writes first

- **What moves:**
  1. 24.7–25.0: the first student's dot fades out.
  2. 25.0–26.2: paper A and its label shrink to 66% and move into the left column (x 24–328, y 204–349).
  3. 26.3–26.7: a second red dot grows in at (382, 436), labelled "Another student".
  4. 26.7–27.1: a blank note card fades in beside it (x 400–700, y 388–484), labelled in red "SECOND STUDENT'S NOTE".
  5. 27.2–29.2: the dot writes on the card, word by word in red: "Send them. The ally's trust matters most, and troops show we mean it."
  6. 29.2–32.2: hold.
- **Caption:** "Another student writes their own judgment first, in plain words."
- **Notice:** the note holds a call, the reason for it, and why troops serve that reason. No AI is involved yet.
- **Why:** this is the start of what doing it well looks like, shown large.

### Beat 5 · 32.2–43.2 s · The AI writes it up

- **What moves:**
  1. 33.2–33.5: the second dot pulses once. The student asks.
  2. 33.5–33.9: a sheet with the grey tag "AI'S DRAFT" fades in above the note, at centre right (x 380–840, y 132–352).
  3. 34.0–36.0: the AI's paragraph composes line by line in grey, 0.4 s a line. It is word for word the paragraph on paper A.
  4. 36.1–36.5: the dot moves to the start of line 1.
  5. 36.5–40.0: the dot reads along each line at the first student's pace, about 0.7 s a line.
  6. 40.1–40.7: the note slides up behind the sheet and is hidden.
  7. 40.8–41.2: the tag becomes navy "SECOND STUDENT'S PAPER" with grey "· DRAFTED WITH AI".
  8. 41.2–43.2: hold.
- **Caption:** "That student has an AI write it up, then reads it closely."
- **Notice:** this student's AI use looks like the first student's: a grey draft, a close read, a kept paper with the same tag. The note goes behind the paper, where faculty won't see it.
- **Why:** both students use an AI the same way on screen. The only difference so far, the note, is now out of sight.

### Beat 6 · 43.2–49.2 s · What faculty receive

- **What moves:**
  1. 44.2–44.5: the second dot and its label fade out.
  2. 44.5–45.7: paper B, with the note hidden behind it, shrinks to 66% and moves into the left column under paper A (x 24–328, y 382–527).
  3. 45.8–46.3: "WHAT FACULTY RECEIVE" fades in above the column.
  4. 46.4–46.8: the colour key fades in at the bottom right: grey "WRITTEN BY AI", red "A STUDENT'S OWN WORDS".
  5. 46.8–49.2: hold.
- **Caption:** "Faculty receive two identical papers, both drafted with AI."
- **Notice:** the two papers match word for word and line for line, both grey, both tagged.
- **Why:** this is the essay's "easier to miss". Nothing on the page can separate the two students.

### Beat 7 · 49.2–64.2 s · Papers aside: why?

- **On screen at the start:** the two papers in the left column; the task card at top right; the key at bottom right; the rest of the right side empty.
- **What moves:**
  1. 50.2–50.8: both papers dim to 70%.
  2. 51.0–51.6: the first column header fades in and rises 6 units: "FACULTY ASK, PAPERS ASIDE" over "What do you recommend, and why?"
  3. 51.8–52.2: the two students' dots grow in, each level with its own paper.
  4. 55.6–56.9: a speech panel opens beside the first student's dot, and grey words on a grey band appear at speaking pace: "On balance, losing that trust is the greater risk: the forces should go." As they appear, the same sentence on paper A returns to full strength.
  5. 57.0–57.3: that sentence on paper A dims again.
  6. 57.4–58.6: a speech panel opens beside the second student's dot, and red words appear at the same pace: "Send them. Their trust matters most, and troops show we mean it."
  7. 58.6–64.2: hold.
- **Caption:** "Without the papers, both students explain. One uses the paper's words."
- **Notice:** both give the same recommendation and the same reason, fluently. The first student's answer is the paper's sentence word for word, and the paper shows where it came from. The second student's answer is in their own words.
- **Why:** the first question doesn't separate them. A fluent answer can pass it, which is why fluency is easy to miss.

### Beat 8 · 64.2–75.2 s · One fact changes

- **What moves:**
  1. 65.2–68.2: nothing moves while the caption is read.
  2. 68.2–68.8: the second column header fades in and rises 6 units: "THEN THEY ASK" over "What if the ally doesn't want our troops on its soil?"
  3. 72.2–73.1: a speech panel opens in that column beside the first student, and grey words appear: "Any course must weigh escalation against the ally's trust." The same sentence on paper A returns to full strength.
  4. 73.2–73.5: that sentence on paper A dims again.
  5. 73.5–75.2: hold.
- **Caption:** "Faculty change one fact. The first student repeats the paper's balancing line."
- **Notice:** the answer is fluent and measured, and it is the paper's opening sentence. It names no risk as the one that matters now and no course of action.
- **Why:** this is the turn. Under challenge, the student retreats to the paper's language, and fluency is shown standing in for a decision the student never made.

### Beat 9 · 75.2–83.2 s · The second student reworks the call

- **What moves:**
  1. 76.2–78.5: nothing moves while the caption is read.
  2. 78.5–79.8: a speech panel opens beside the second student in the same column, and red words appear: "Then troops would cost their trust. I'd send aid and hold exercises instead."
  3. 79.8–83.2: hold.
- **Caption:** "The second student keeps the reason and changes the call."
- **Notice:** the reason is the same as in the note and the first answer: the ally's trust. Because troops now work against it, the student picks a different course, in plain words.
- **Why:** this is "revises under challenge", and it is the only place the two students differ.

### Beat 10 · 83.2–89.9 s · The faculty check

- **What moves:**
  1. 83.2–83.4: caption 9 fades out.
  2. 83.4–84.0: the faculty check rises into the caption band: "FACULTY CHECK" in navy mono, then the question in large italic.
  3. 86.7–87.2: below it, smaller, "THEN ASK" and "What evidence would change your recommendation?".
  4. 87.2–89.9: hold. At 89.9 the player shows Replay and the figure rests on this frame.
- **Caption:** "Faculty check: Can the student independently explain the judgment in plain speech?" Follow-up: "Then ask: What evidence would change your recommendation?"
- **Notice:** the picture already shows the check run on two students who handed in the same AI-drafted paper.
- **Why:** the figure ends on the questions an educator can ask.

## 5. Final frame

The still at 89.9 s. It is also the reduced-motion view, the print view and the poster (stage plus caption band).

**Stage:**
- **Top right:** the task card, "EXAMPLE TASK" over "Recommend whether to send forces to reassure a threatened ally."
- **Column headers, one row:** "WHAT FACULTY RECEIVE" (left); "FACULTY ASK, PAPERS ASIDE" over "What do you recommend, and why?" (middle); "THEN THEY ASK" over "What if the ally doesn't want our troops on its soil?" (right).
- **Left column:** two identical papers, both dimmed to 70%, in grey on a grey band: "Any course must weigh escalation against the ally's trust. On balance, losing that trust is the greater risk: the forces should go, with clear limits to contain escalation." They are labelled "FIRST STUDENT'S PAPER · DRAFTED WITH AI" and "SECOND STUDENT'S PAPER · DRAFTED WITH AI".
- **Top row (first student):** a red dot. Middle: grey, "On balance, losing that trust is the greater risk: the forces should go." Right: grey, "Any course must weigh escalation against the ally's trust."
- **Bottom row (second student):** a red dot. Middle: red, "Send them. Their trust matters most, and troops show we mean it." Right: red, "Then troops would cost their trust. I'd send aid and hold exercises instead."
- **Bottom right:** the key, grey "WRITTEN BY AI" and red "A STUDENT'S OWN WORDS".

**Caption band:**

> FACULTY CHECK *(navy mono)*
> *Can the student independently explain the judgment in plain speech?* *(Serif italic, about 30 px)*
> THEN ASK *(navy mono)* What evidence would change your recommendation? *(Serif, about 20 px)*

**In the reduced-motion and print views,** all ten captions and their "On screen" lines are readable below the controls. Clicking a beat shows its settled still.

**What the still says alone:** two students handed in the same paper, drafted with AI. Asked why without it, one answered in the paper's sentence and one in their own words. Asked what happens if the ally doesn't want troops, one repeated the paper's balancing line and the other changed course for the same reason. The check below says what to ask.

## 6. Standalone page copy

**Title:** Fluency substitution

**Kicker:** Failure mode 2 of 7

**Setup:**

A student asks an AI to draft a strategy recommendation, reads it closely and agrees with it. The paper reads like a considered judgment, and it can be identical to a paper from a student who made the call first. *The Irreducible Officer* calls the risk fluency substitution: polished analysis stands in for owned reasoning. The figure runs about a minute and a half; pause it or step through the beats below. The task, the paper and all the answers are a constructed example.

**Figure summary** (visually hidden, for screen readers): An animated figure. A red dot stands for a student with an example task: recommend whether to send forces to reassure a threatened ally. An AI drafts a polished paragraph in grey: weigh escalation against the ally's trust; on balance, losing that trust is the greater risk, so the forces should go, with clear limits. The student reads it closely, cuts one weak sentence and keeps the rest. A second student first writes a plain note in red, "Send them. The ally's trust matters most, and troops show we mean it.", then has an AI write it up and reads that draft just as closely. Faculty receive two identical papers, both tagged as drafted with AI. With the papers set aside, they ask each student why. The first answers with the paper's sentence; the second answers in their own words. Then faculty ask what if the ally doesn't want troops on its soil. The first student repeats the paper's opening line about weighing escalation against trust. The second says troops would then cost the ally's trust and proposes aid and exercises instead. The figure ends on the faculty check. Each beat is listed below with what is on screen.

**Beat list (text equivalent):**

1. **A student gets a task that needs a decision.** *On screen:* a task card appears at the top right: "Example task: Recommend whether to send forces to reassure a threatened ally." A red dot labelled Student appears on the left.
2. **The student asks an AI for a draft. It writes a polished recommendation.** *On screen:* the dot pulses. A sheet labelled "AI's draft" appears, and a grey paragraph writes itself line by line: "Any course must weigh escalation against the ally's trust. On balance, losing that trust is the greater risk: the forces should go, with clear limits to contain escalation. Either choice carries real consequences."
3. **The student reads closely, cuts a weak line, and agrees with the rest.** *On screen:* the dot reads along each line, then strikes out "Either choice carries real consequences." in red, and that sentence disappears. The rest stays grey. The label changes to "First student's paper, drafted with AI".
4. **Another student writes their own judgment first, in plain words.** *On screen:* the first paper moves to the left. A second red dot labelled Another student writes on a note card in red: "Send them. The ally's trust matters most, and troops show we mean it."
5. **That student has an AI write it up, then reads it closely.** *On screen:* the dot pulses, and a sheet labelled "AI's draft" fills with the same grey paragraph as the first paper. The dot reads along each line at the same pace. The note slides behind the sheet, and the label changes to "Second student's paper, drafted with AI".
6. **Faculty receive two identical papers, both drafted with AI.** *On screen:* the second paper moves under the first, under the heading "What faculty receive". The two match word for word. A key appears: grey is written by AI, red is a student's own words.
7. **Without the papers, both students explain. One uses the paper's words.** *On screen:* both papers dim. "Faculty ask, papers aside: What do you recommend, and why?" appears. The first student says, in grey, "On balance, losing that trust is the greater risk: the forces should go.", and the same sentence lights up on their paper. The second student says, in red, "Send them. Their trust matters most, and troops show we mean it."
8. **Faculty change one fact. The first student repeats the paper's balancing line.** *On screen:* "Then they ask: What if the ally doesn't want our troops on its soil?" appears. The first student says, in grey, "Any course must weigh escalation against the ally's trust.", and that sentence lights up on their paper.
9. **The second student keeps the reason and changes the call.** *On screen:* the second student says, in red, "Then troops would cost their trust. I'd send aid and hold exercises instead."
10. **Faculty check: Can the student independently explain the judgment in plain speech? Then ask: What evidence would change your recommendation?** *On screen:* the questions appear under the picture. The two papers and all four answers stay in view.

**Faculty check:** Can the student independently explain the judgment in plain speech?

To test it, set the paper aside, ask why, then change one fact. Section VIII of the essay looks for the student who "revises under challenge rather than retreating to the artifact's language". In the oral defense in Section IX, faculty ask what evidence would change the recommendation.

**From the essay** (*The Irreducible Officer*, Section II, What the Problem Looks Like), with its link to Chow et al. (2026):

> Fluency substitution is easier to miss. AI produces the tone of analytic maturity (balanced paragraphs, caveats in the right places, the measured voice of a considered judgment) and the student mistakes well-ordered language for well-owned reasoning. Researchers studying AI's effects on student cognition have introduced the concept of epistemic confinement to describe this condition: an illusion of competence while operating entirely within AI-constructed analytical boundaries, where the student believes they are thinking independently while the frame doing the work was never theirs ([Chow et al., 2026](https://ojs.aut.ac.nz/pjtel/article/view/246)). In strategy, fluency substitutes for deciding. A paragraph that balances every consideration may never identify which risk actually matters most.

**Links:**
- Book chapter: Own the decision → `../../book-v0/four-moves-book.html?spread=5`
- Practice: test fluency substitution with your AI assistant → `https://judgmentlab.net/#companion`
- Essay: Section II, What the Problem Looks Like → `https://judgmentlab.net/#ii-what-the-problem-looks-like`

## 7. Pacing table

Reading time is caption words ÷ 3. The beat total is lead + motion + hold, and every total is at least twice the caption's reading time. Label words are new words inside the picture; motion includes any wait for the caption to be read once.

| Beat | Time (s) | Caption words | Reading (s) | 2× (s) | Label words | Lead (s) | Motion (s) | Hold (s) | Total (s) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · The task | 0.0–6.0 | 9 | 3.0 | 6.0 | 13 | 1.0 | 1.0 | 4.0 | 6.0 |
| 2 · The AI drafts | 6.0–14.7 | 13 | 4.3 | 8.7 | 35 | 1.0 | 3.4 | 4.3 | 8.7 |
| 3 · The student agrees | 14.7–23.7 | 13 | 4.3 | 8.7 | 6 | 1.0 | 6.2 | 1.8 | 9.0 |
| 4 · Another student writes first | 23.7–32.2 | 10 | 3.3 | 6.7 | 18 | 1.0 | 4.5 | 3.0 | 8.5 |
| 5 · The AI writes it up | 32.2–43.2 | 12 | 4.0 | 8.0 | 36 | 1.0 | 8.0 | 2.0 | 11.0 |
| 6 · What faculty receive | 43.2–49.2 | 9 | 3.0 | 6.0 | 10 | 1.0 | 2.6 | 2.4 | 6.0 |
| 7 · Papers aside: why? | 49.2–64.2 | 11 | 3.7 | 7.3 | 35 | 1.0 | 8.4 | 5.6 | 15.0 |
| 8 · One fact changes | 64.2–75.2 | 12 | 4.0 | 8.0 | 23 | 1.0 | 8.3 | 1.7 | 11.0 |
| 9 · The second student reworks the call | 75.2–83.2 | 10 | 3.3 | 6.7 | 13 | 1.0 | 3.6 | 3.4 | 8.0 |
| 10 · Faculty check | 83.2–89.9 | 10 + 6 follow-up | 3.3 + 2.0 | 6.7 (check) | 0 | 0.0 | 4.0 | 2.7 | 6.7, then rests |
| **Total** | | **115** | **38.3** | | **189** | | **50.0** | | **89.9** |

Checks:
- One idea per beat; movements run one after another.
- Changes a caption names wait until it can be read once: the cut (beat 3, 5.7 s in), the note (beat 4, 3.5 s), the second student's close read (beat 5, 4.3 s), the first answer (beat 7, 6.4 s, after the caption and the question), the changed fact (beat 8, 4.0 s) and the first student's reply to it (beat 8, 8.0 s, after the question), the second student's reply (beat 9, 3.3 s), and the follow-up line (beat 10, 3.3 s after the check).
- Every hold is at least 1.5 s.
- **In-picture reading.**
  - The first draft (33 words) is on screen at full size from 8.0 s to 25.0 s, alongside two 13-word captions: 59 words in 17 s, about 3.5 words a second. The paragraph doesn't need a full read here. It returns in beat 5, stays readable at 66% to the end, and beats 7 and 8 light up each sentence as it is repeated.
  - Beat 5's draft is the same 28 words, so viewers recognise it more than read it.
  - Beat 7 carries 46 words (caption, question, two answers) in 15.0 s, 3.1 words a second.
  - Beat 8 carries 35 words in 11.0 s, 3.2 words a second. The first student's 9-word reply can be read once by the end of the beat, and it stays on screen to the end.
  - Beat 9 carries 23 words in 8.0 s.
- Both students read their drafts at the same pace (about 0.7 s a line), and both AI drafts compose at the same speed (0.4 s a line).
- No camera moves. The two paper moves (beats 4 and 6) are 1.2 s each and eased; reduced motion removes them.
- Total 89.9 s.
