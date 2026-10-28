# Appropriate reliance: storyboard

Motion figure 8 of 8 · slug `appropriate-reliance` · storyboard round 4, revised after figure cold read 1 · October 28, 2026
*Cold-read copy. The Intent section is removed.*

## 2. Scenario

You have time to check one of two tasks from Dell'Acqua et al.'s 2023 field experiment with BCG consultants. Task A: segment the footwear industry market based on users. Task B: use a spreadsheet and insider interviews to pick the brand a clothing firm should back. An AI gives both answers in the same finished form, and both will go into your team's first draft. A check means working the task yourself, then comparing with the AI's answer. You choose which task gets your one check, and you rely on the AI for the other, or skip the question. Then the frontier is drawn between the tasks, the study's results split them, and the figure shows what set the tasks apart and the suggested call. Then one condition changes: your segmentation goes straight into the launch plan. You choose to rely on Task A, move your check to it, or ask for a week to check both, and the figure shows the suggested call and what moving the check costs. The figure ends on the faculty check.

*Sources.* Task A's wording is the paper's ("Segment the footwear industry market based on users", one of 18 product-development tasks for a fictional footwear company). Task B paraphrases the paper's Appendix A (a CEO choosing one of the company's brands to invest in, with a spreadsheet of financial data and interviews with company insiders). "The deciding details were in the interviews; the spreadsheet only looked complete" follows section 3.2. The study figures are from the source spine's Jagged Frontier entry (Dell'Acqua et al., 2023, HBS working paper 24-013): inside the frontier, consultants with AI finished 12.2% more tasks, 25.1% faster and at more than 40% higher quality; on the task chosen to fall outside it, consultants without AI were right about 84.5% of the time, with GPT-4 alone 70.6%, and with GPT-4 plus a prompt-engineering overview 60%, and graders still rated the AI users' recommendations higher in quality "regardless of the correctness of their answer". The AI's answers are drawn as lines, not text. The conditions are added for the exercise. *The Irreducible Officer*, Section V, defines trust, reliance and appropriate reliance, and describes the jagged frontier and pattern recognition across task types.

## 3. Cast and grammar

**The colour rule.** Grey is what the AI supplied: its two answers, their "AI'S ANSWER" labels and "READY" pills. Red is the reader: the red dot in the option they chose (a ring once the check moves), "You rely on it" or "Check moved to Task A", the "Your call" labels during a question, and the "YOUR CALLS" key. Navy ink is the page: tasks, conditions, budget, option pills, frontier, pattern tags, evidence, suggested calls and their key, and "No call made".

**Palette and type.** Paper `#f6f1e8`, paper-bright `#fffdfa`, ink `#0a2242`, machine grey `#5b564f` with a `#ded5c4` band behind AI-supplied work, red `#b81b2b`. Source Serif 4 for tasks, numbers and captions; Source Sans 3 for pills, person labels and evidence labels; IBM Plex Mono for small labels, at 13 units.

**Stage.** An SVG with a 960 × 540 viewBox. One view, no camera moves. Top band (y 0–46): the source line, then the frontier labels. Two cards (y 48–476): Task A at left (x 24–456), Task B at right (x 504–936), with the frontier in the 48-unit gap. Bottom band (y 480–540): the budget and definition, then the keys. Centre stage (beat 5 only): Task B's evidence at 1.5× over the dimmed scene. Positions inside a card are for Task A (x0 = 24); Task B's are the same with x0 = 504.

| Element | Stands for | How it looks | Where |
| --- | --- | --- | --- |
| Source line | Where and when | Mono 13 ink "DELL'ACQUA ET AL. · FIELD EXPERIMENT, 2023 · 758 BCG CONSULTANTS · SOME WITH GPT-4" | (24, 18) |
| Task cards | The two tasks | Paper-bright, 15% hairline ink; mono 13 "TASK A", "TASK B" | y 48–476; tags (x0+16, 68) |
| Task text | What each task asks | Serif 18 ink. A: "Segment the footwear industry market" / "based on users." B: "Use a spreadsheet and insider interviews to" / "pick the brand a clothing firm should back." | Baselines 92 and 114 |
| AI's answer | What the AI gives back | Mono 13 grey "AI'S ANSWER"; a band with two grey lines; a filled grey "READY" pill; identical on both cards | Label y 172; band y 180–200; pill x0+344 to x0+416 |
| Condition, row 1 | What the answers are for | Mono 13 ink "IF IT'S YOUR TEAM'S FIRST DRAFT" | (x0+16, 220) |
| "Check this one" pill | Where the one check can go | Paper pill, rounded, hairline ink; empty radio at left; Sans 600 13 | x0+16 to x0+176, y 228–254 |
| Budget and definition | What a check costs and is | Mono 13 ink "TIME FOR ONE CHECK · A CHECK: WORK IT YOURSELF, THEN COMPARE" | Centred (480, 498) |
| "Your call" / "No call made" | Names the reader during a question; records a skip | Red Sans 600 13 "Your call" until that row's suggestion appears; ink (70%) "No call made" instead if the reader skipped | (x0+416, 220); row 2 (440, 368) |
| Reader's choice | The option chosen | Solid red dot (r 4.5) in its radio, thicker outline; a red ring if the check later moved | In the pill |
| "You rely on it" / "Check moved to Task A" | What the reader didn't check, or where the check went | Red Sans 600 13 beside the other card's pill; on Task B it changes to "Check moved to Task A" if the reader moves the check | (x0+192, 246) |
| Condition, row 2 | The changed condition | Mono 13 ink "IF IT GOES STRAIGHT INTO THE LAUNCH PLAN" | (40, 316), card A only |
| Pills, row 2 | The call again | "Rely on it" and "Move my check here" (or "Keep my check here") on one line, y 324–348; "Ask for a week to check both" below, y 352–376 | Card A only |
| Jagged frontier | The uneven edge of where an AI is reliable | Irregular navy line between the cards only; mono "INSIDE THE FRONTIER", "OUTSIDE THE FRONTIER" | x 466–494, y 52–470; labels y 40 |
| Evidence rules | Separate evidence from calls | 15% ink hairline above each evidence slot | A y 423; B y 302 |
| Inside evidence | The study, inside the frontier | Mono "WITH AI, ACROSS TASKS INSIDE THE FRONTIER"; Serif 600 20 "12.2%", "25.1%", "40%+" over Sans 13 "more tasks", "faster", "higher quality" | Title y 436; numbers y 456 |
| Outside evidence | The study, on Task B | Mono "RIGHT ANSWERS ON TASK B"; Sans 14 rows with ink bars (2.6 units a point) and values: "Without AI" 84.5%, "GPT-4 alone" 70.6%, "GPT-4 + overview" 60%; a navy bracket under the two GPT-4 bars, Serif italic 15 "Rated higher in quality, right or wrong". First at 1.5× centre stage on a paper-bright panel, then in card B's slot | Title y 316; bars from x 648 at y 329, 351, 373; bracket y 397 |
| Pattern tags | What set the tasks apart | Navy mono 13. A: "NO HIDDEN FACTS" / "A WEAK ANSWER SHOWS WHEN READ". B: underline under "insider interviews", then "THE DECIDING DETAILS WERE IN THE INTERVIEWS" / "THE SPREADSHEET ONLY LOOKED COMPLETE" | y 136 and 151 |
| Suggested calls | Reasoned from the results and the condition | Filled navy tags, paper mono 13. A row 1: "RELY ON IT". B row 1: "WORK IT FROM THE INTERVIEWS, THEN COMPARE". A row 2: "ASK FOR A WEEK TO CHECK BOTH" | Row 1 y 262; row 2 y 384 |
| Cost notes | What a choice costs | Mono 13 ink. "A CHECK HERE LEAVES TASK B UNCHECKED"; "MOVING IT LEAVES TASK B TO A READ-THROUGH" | (40, 294); (40, 416) |
| Keys | What red and navy mean | Left: red dot and red mono "YOUR CALLS", only if the reader made a call. Right: navy swatch and mono "SUGGESTED CALL · REASONED FROM THE RESULTS" | y 526 |
| Caption band | The words for each beat | Runtime caption; at a question, **Continue** and **Skip this question** at its bottom right | Under the stage |
| Beat list | Text equivalent | Ten captions with "On screen" lines; entries after an unanswered question read "Make your call to see this." | Under the controls |

**Branches.**

| Question | Reader's call | Red marks | After the reveal |
| --- | --- | --- | --- |
| 1 | Task A | Dot in A's pill; "You rely on it" on B | "RELY ON IT" and its cost note sit beside the reader's dot |
| 1 | Task B | Dot in B's pill; "You rely on it" on A | Both suggestions match |
| 1 | Skip | "No call made" on both cards | Suggestions only |
| 2 | Rely on it | Dot | Caption: "Now a miss gets built…" |
| 2 | Move my check here (check was on B) | Dot; B's dot becomes a ring, "Check moved to Task A" | "MOVING IT LEAVES TASK B TO A READ-THROUGH" |
| 2 | Keep my check here (check was on A) | Dot | The same note applies: B had only a read-through |
| 2 | Ask for a week to check both | Dot | Matches the suggestion |
| 2 | Skip | "No call made" on row 2 | Suggestion only |

**Interaction.**
- *Opening.* The figure opens on question 1, live: its options can be chosen at once. Start over plays the whole figure from 0:00, stopping at each question.
- *Controls.* At a question, the drawn options become real radio buttons (invisible labels over each drawn pill or stacked chip, with a visible focus ring). Question 1: "Your one check goes to", Task A or Task B. Question 2: "If your segmentation goes straight into the launch plan, Task A", three options. Arrow keys move within a group; Enter on a chosen option continues. **Continue** (enabled once there's a call) and **Skip this question** sit at the bottom right of the caption band. Tab order: options, Continue, Skip, the player.
- *No passing an unanswered question.* The scrubber, the End key, beat clicks and seeks stop at it, and the question opens there. Play at a question counts as a skip.
- *Focus and scrolling.* When a question opens during play, the page scrolls so the whole picture shows if it fits, or at least the options and Continue, and focus moves to the first option (a drag on the scrubber keeps its focus). After Continue or Skip, focus moves to Play/Pause.
- *Start over.* Clears every call and skip, re-locks the beat list, and plays from 0.
- *Screen readers.* The SVG and the caption band are `aria-hidden`. A polite live region reads each question as it opens, and each suggested call with the reader's call as it appears. The hidden summary has three parts, released after question 1 and question 2.
- *Question before answer.* Poster and first frame: question 1, live. Reduced motion: opens on question 1; Continue shows question 2 settled with every round-1 result; a second Continue shows the final frame. Beat list: locked entries read "Make your call to see this." Page copy: the disclosure "After you make your call" opens when the figure reaches its check. Print: question 1, a page break, then the final frame, the beat list and the opened disclosure; the screen returns to where it was afterwards. Preview video: the no-call path.

**Narrow screens.** Below a letterboxed scale of 0.846, `syncStacked` swaps the SVG for a stacked stage driven by the same clock and calls: source line, two side-by-side columns with the frontier down the gutter, then the budget and keys; Task B's panel is an overlay. Within a phase every part is placed from the start and only fades in. Phase 1 (up to question 1) shows only the tasks, answers, condition and options, so the player fits a 390 × 844 screen; phase 2 adds the frontier, evidence, pattern tags, suggestions and question 2; phase 3 adds question 2's suggestion. The stage grows only when the reader continues. The caption band is fixed (136 px, 182 px on phones), and the check is 20 px on phones.

## 4. Beats

Times are absolute seconds on the no-call path. In every beat the caption changes first (0.3 s fade) and nothing in the picture moves for the first second. A change the caption is about starts only after the caption can be read once, except a lead-in that the caption's first or main clause describes. Each beat holds its caption plus new picture words at 3 words a second or less; words repeated identically on both cards count once.

### Beat 1 · 0.0–15.0 s · Two tasks

- **What moves:** 1.0–1.6 card A fades in and rises 6 units, with "TASK A"; 1.6–2.2 its two lines; 2.4–2.8 the source line; 4.0–4.6 card B; 4.6–5.4 its two lines; hold.
- **Caption:** "Two tasks from one study."
- **Notice:** two realistic consulting tasks; Task B names its materials. The source line says 2023, 758 BCG consultants, some with GPT-4.
- **Why:** the setup. (Seen on Start over; the figure opens at question 1.)

### Beat 2 · 15.0–21.7 s · The AI answers both

- **What moves:** 16.0–16.4 "AI'S ANSWER" and empty bands; 16.4–17.2 two grey lines write in on both; 18.4–18.8 a "READY" pill on both at once; hold.
- **Caption:** "An AI answers both. The two answers look equally finished."
- **Notice:** same form, same tag, same moment.
- **Why:** the felt signal is the same for both.

### Beat 3 · 21.7–31.7 s · One check (question 1)

- **What moves:** 22.7–23.1 the bottom band, "TIME FOR ONE CHECK · A CHECK: WORK IT YOURSELF, THEN COMPARE"; 24.4–24.8 "IF IT'S YOUR TEAM'S FIRST DRAFT" on both cards; 25.0–25.5 a "Check this one" pill on each card, with red "Your call".
- **Question:** opens at 25.5 (and at load). Continue or Skip resumes from 30.2. On the no-call path the beat holds to 31.7.
- **Caption:** "You have time to check one. Which one?"
- **Branches:** Task A, Task B or skip (see the table).
- **Notice:** the condition is the same for both, and a check is defined before anyone spends it.
- **Why:** predict before reveal, with a cost.

### Beat 4 · 31.7–43.7 s · The frontier, and inside it

- **What moves:** 32.7–34.3 the jagged line draws down between the cards; 34.3–34.7 "INSIDE THE FRONTIER" and "OUTSIDE THE FRONTIER"; 36.7–37.1 "WITH AI, ACROSS TASKS INSIDE THE FRONTIER" and its rule on card A; 37.5–39.1 "12.2% more tasks", "25.1% faster", "40%+ higher quality", one after another; hold.
- **Caption:** "A jagged frontier marks where an AI stops being reliable. Inside it, AI helped."
- **Notice:** Task A is inside, Task B outside; the reader's marks stay put.
- **Why:** defines the frontier, then the evidence for relying on Task A (the numbers wait 5.0 s).

### Beat 5 · 43.7–56.7 s · Outside the frontier

- **What moves:** 44.7–45.2 the scene dims to 25%; 45.2–45.8 a panel rises centre stage with Task B's evidence at 1.5×; 47.1–47.7 "Without AI" grows to 84.5%; 47.9–48.5 "GPT-4 alone" to 70.6% and "GPT-4 + overview" to 60%; 49.1–49.6 a bracket under the two GPT-4 bars; 49.6–50.0 "Rated higher in quality, right or wrong"; the panel holds 4.0 s; 54.0–55.2 it settles into card B's slot as the scene returns; hold.
- **Caption:** "On Task B, consultants with AI were right less often. Graders still rated their work higher."
- **Notice:** both GPT-4 groups fall short of the group without AI, and the bracket sits on the shorter bars.
- **Why:** the surprise, centre stage. The bars wait 3.4 s, the bracket 5.4 s.

### Beat 6 · 56.7–68.2 s · What set them apart

- **What moves:** 57.7–58.3 "NO HIDDEN FACTS" under Task A; 58.3–58.7 "A WEAK ANSWER SHOWS WHEN READ"; 60.7–61.3 an underline under "insider interviews" and "THE DECIDING DETAILS WERE IN THE INTERVIEWS"; 61.5–61.9 "THE SPREADSHEET ONLY LOOKED COMPLETE"; hold.
- **Caption:** "Task A had no hidden facts. Task B's were in the interviews."
- **Notice:** the difference was true before the call. A read-through is a fair test of Task A; on Task B it couldn't show the deciding details.
- **Why:** the pattern that travels. Task B's tag waits 4.0 s.

### Beat 7 · 68.2–81.2 s · The suggested call

- **What moves:** 69.2–69.6 the key "SUGGESTED CALL · REASONED FROM THE RESULTS"; 69.8–70.2 the row-1 pills the reader didn't choose fade to 40%; 70.7–71.1 "RELY ON IT" on Task A; 71.5–71.9 "A CHECK HERE LEAVES TASK B UNCHECKED"; 73.2–73.6 "WORK IT FROM THE INTERVIEWS, THEN COMPARE" on Task B; 73.8–74.2 the red "Your call" labels fade, and "YOUR CALLS" appears if the reader made a call; hold.
- **Caption:** "The evidence suggests relying on Task A and working Task B yourself from the interviews."
- **Notice:** relying on Task A frees the check for Task B; on Task B the check starts from the interviews.
- **Why:** warranted acceptance gets its own result, labelled as reasoning.

### Beat 8 · 81.2–93.2 s · One thing changes (question 2)

- **What moves:** 82.2–82.6 "IF IT GOES STRAIGHT INTO THE LAUNCH PLAN" as a second row on card A; 85.5–86.0 three pills, "Rely on it", "Move my check here" (or "Keep…"), "Ask for a week to check both", with red "Your call".
- **Question:** opens at 86.0. Continue or Skip resumes from 91.7. On the no-call path the beat holds to 93.2.
- **Caption:** "Now your segmentation goes straight into the launch plan. What about Task A?"
- **Branches:** see the table. Moving the check from Task B shows at once: B's dot becomes a ring, "Check moved to Task A".
- **Notice:** only the condition has changed, and asking for time shows its cost in the option.
- **Why:** "what would have changed the call", decided before it's answered.

### Beat 9 · 93.2–105.2 s · The call changes

- **What moves:** 94.2–94.6 the row-2 pills the reader didn't choose fade to 40%; 99.2–99.6 "ASK FOR A WEEK TO CHECK BOTH"; 100.0–100.4 "MOVING IT LEAVES TASK B TO A READ-THROUGH"; 100.6–101.0 the red "Your call" fades; hold.
- **Caption:** "Same task, same side of the frontier. Now a miss gets built, and Task B still needs its check."
- **Notice:** both tasks now need a real check, so a week is worth its cost; moving the one check leaves Task B to the kind of read that rated wrong answers higher.
- **Why:** risk changes the call while the task stays the same. The tag waits 6.0 s.

### Beat 10 · 105.2–114.9 s · The faculty check

- **What moves:** 105.2–105.4 caption 9 fades; 105.4–106.0 "FACULTY CHECK" and the question rise; 110.4–110.9 "Change one condition and ask for the call again." at the same size; hold; rests.
- **Caption:** "Faculty check: What evidence justified relying on the system here, and what would have changed the call?" / "Change one condition and ask for the call again."
- **Why:** the figure ends on the check and the move (5.0 s after the check).

## 5. Final frame

The still at 114.9 s, on the no-call path: the end of play, the last step of reduced motion and the second printed page. The poster and first frame are question 1.

**Stage:** the source line; the frontier between the cards. Card A: task; "NO HIDDEN FACTS / A WEAK ANSWER SHOWS WHEN READ"; the AI's answer with "READY"; "IF IT'S YOUR TEAM'S FIRST DRAFT": faded pill, "RELY ON IT", "A CHECK HERE LEAVES TASK B UNCHECKED"; "IF IT GOES STRAIGHT INTO THE LAUNCH PLAN": three faded pills, "ASK FOR A WEEK TO CHECK BOTH", "MOVING IT LEAVES TASK B TO A READ-THROUGH"; the inside numbers. Card B: task with "insider interviews" underlined; "THE DECIDING DETAILS WERE IN THE INTERVIEWS / THE SPREADSHEET ONLY LOOKED COMPLETE"; the AI's answer; "IF IT'S YOUR TEAM'S FIRST DRAFT": faded pill, "WORK IT FROM THE INTERVIEWS, THEN COMPARE"; "RIGHT ANSWERS ON TASK B": Without AI 84.5%, GPT-4 alone 70.6%, GPT-4 + overview 60%, "Rated higher in quality, right or wrong". Bottom: the budget line; "SUGGESTED CALL · REASONED FROM THE RESULTS". In a branch: the reader's red marks, "No call made" on skipped rows, and "YOUR CALLS".

**Caption band:** FACULTY CHECK / *What evidence justified relying on the system here, and what would have changed the call?* / *Change one condition and ask for the call again.*

**What the still says alone:** with time for one check, two tasks got the same finished AI answer. AI helped on the segmentation, which had no hidden facts; on the brand pick, whose deciding details were in the interviews, AI users were right less often while graders rated their work higher. For a first draft, rely on Task A and work Task B from the interviews. Once the segmentation goes straight into the launch plan, ask for a week to check both, because moving the one check leaves Task B to a read-through.

## 6. Standalone page copy

**Title:** Appropriate reliance · **Kicker:** The competency

**Setup:** Appropriate reliance means accepting AI support when it's warranted, checking or refusing it when it's not, and being able to say why. Checking takes time, so this figure gives you two tasks from a 2023 field experiment and time to check only one. You decide where the check goes before you see what happened, then make one more call after a condition changes. You can also skip either question and let it play.

**Hidden summary, part 1** (at load): the setup and question 1, ending "The rest of this description, and the rest of the beat list, appear after you answer or skip each question."

**Part 2** (after question 1): the frontier; the inside numbers; Task B's 84.5%, 70.6% and 60%, and the graders' ratings; what set the tasks apart; the first suggested call, reasoned from the results; question 2 and its three options.

**Part 3** (after question 2): "The suggested call is to ask for a week to check both. A miss on Task A now gets built, and Task B still needs its check; moving the one check would leave Task B to a read-through, and graders reading the recommendations rated AI users' work higher, right or wrong. The figure ends on the faculty check."

**Beat list (text equivalent).** The captions above, each with its "On screen" line (as built). Entries 4–8 unlock after question 1 and 9–10 after question 2; until then they read "Make your call to see this."

**Faculty check** (visible): What evidence justified relying on the system here, and what would have changed the call? / Change one condition and ask for the call again.

**Disclosure: "After you make your call"** (closed until the figure reaches its check, or the reader opens it):
- *What a good answer says.* Opens: "This is the figure's reasoning from the study's results; the study itself didn't test checking, a time budget, or what the work was for." Then: Task A had no hidden facts, so a weak segmentation shows when you read it, and the study found it inside the frontier; as a first draft it can go without a check. Task B's deciding details were in the interviews and the spreadsheet only looked complete; graders rated AI users' recommendations higher whether or not they were right, so a read-through wouldn't show a miss, and the check starts from the interviews. When the segmentation goes straight into the launch plan, a miss gets built and Task B still needs its check; both now need a real check, so asking for a week is worth what it costs. Moving the one check would leave Task B to a read-through.
- *Evidence.* The spine's entry: 758 BCG consultants split between two sets of tasks and randomly assigned to work without AI, with GPT-4, or with GPT-4 plus a prompt-engineering overview; 12.2% more tasks, 25.1% faster, more than 40% higher quality inside; about 84.5%, 70.6% and 60% right outside, "19 percentage points less likely to produce correct solutions"; quality rated higher "regardless of the correctness of their answer".
- *About the tasks.* 18 product-development questions for a fictional footwear company (ideas for a new shoe, segmenting the market by users, steps to launch, a press release and a persuasive memo); the outside task's spreadsheet "designed to look complete" with the deciding details in the interviews, built so GPT-4 would get it wrong; each consultant worked one set of tasks, so the one-check choice and the launch-plan condition are this figure's; the frontier moves as models change.

**From the essay** (visible): the Section V trust and reliance paragraph (Raees & Papangelis, 2026) and the pattern-recognition sentence.

**Links:** See the failure: Uncalibrated reliance; Book chapter: Calibrate the tool; Practice; Essay Section V.

## 7. Pacing table

Reading is caption words plus new picture words, ÷ 3; repeated identical words on both cards count once. Every beat is at least that long, at least twice its caption's reading time, and holds at least 1.5 s after its last movement.

| Beat | Time (s) | Caption words | Picture words | Reading (s) | Lead (s) | Motion (s) | Hold (s) | Total (s) | Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · Two tasks | 0.0–15.0 | 5 | 39 | 14.7 | 1.0 | 4.4 | 9.6 | 15.0 | |
| 2 · The AI answers both | 15.0–21.7 | 10 | 3 | 4.3 | 1.0 | 2.8 | 2.9 | 6.7 | |
| 3 · One check | 21.7–31.7 | 8 | 22 | 10.0 | 1.0 | 2.8 | 6.2 | 10.0 | Opens at 25.5; resumes 30.2 |
| 4 · The frontier, and inside it | 31.7–43.7 | 14 | 21 | 11.7 | 1.0 | 6.4 | 4.6 | 12.0 | |
| 5 · Outside the frontier | 43.7–56.7 | 16 | 22 | 12.7 | 1.0 | 10.5 | 1.5 | 13.0 | |
| 6 · What set them apart | 56.7–68.2 | 12 | 21 | 11.0 | 1.0 | 4.2 | 6.3 | 11.5 | |
| 7 · The suggested call | 68.2–81.2 | 15 | 23 | 12.7 | 1.0 | 5.0 | 7.0 | 13.0 | |
| 8 · One thing changes | 81.2–93.2 | 13 | 22 | 11.7 | 1.0 | 3.8 | 7.2 | 12.0 | Opens at 86.0; resumes 91.7 |
| 9 · The call changes | 93.2–105.2 | 18 | 15 | 11.0 | 1.0 | 6.8 | 4.2 | 12.0 | |
| 10 · Faculty check | 105.2–114.9 | 15 + 9 | 0 | 8.0 | 0.0 | 5.7 | 4.0 | 9.7, then rests | |
| **Total** | | **135** | **188** | | | | | **114.9** | |

Checks:
- Changes a caption names wait until it can be read once: "READY" (beat 2, 3.4 s), the condition (beat 3, 2.7 s), the numbers (beat 4, 5.0 s), the bars and bracket (beat 5, 3.4 s and 5.4 s), Task B's tag (beat 6, 4.0 s), Task B's suggestion (beat 7, 5.0 s), the launch-plan pills (beat 8, 4.3 s), the row-2 suggestion (beat 9, 6.0 s), the move line (beat 10, 5.0 s).
- Nothing reveals a call before it's made, in any view or control.
- Every hold is at least 1.5 s; one movement at a time; no camera moves; the scene dims once.
- **Interactive path:** the figure opens at question 1 (25.5 s); the questions skip 4.7 s and 5.7 s of hold, so a reader who answers watches about 79 s plus decision time.
