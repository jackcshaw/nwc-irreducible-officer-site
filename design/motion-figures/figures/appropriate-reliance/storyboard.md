# Appropriate reliance: storyboard

Motion figure 8 of 8 · slug `appropriate-reliance` · storyboard round 5, revised after figure cold read 2, with the nameplate · October 28, 2026

Starting point: `concepts-v0/reliance.html`, "Make the call" (`concepts-v0/proposal.md` §2.8, built). This version keeps its mechanism: the reader makes a reliance call on two tasks from the Dell'Acqua et al. study before anything shows which side of the frontier each sits on, and the study's results then split the two. Checking costs something here: the reader has time to check only one task, so the call is where to spend that check. The figure opens on that question, live. The reader's choice gates the timeline, warranted acceptance is a result in its own right, and a second question after one condition changes makes "what would have changed the call" something the reader decides. The shared runtime and `CONVENTIONS.md` apply throughout.

## 1. Intent

*The cold-read tester does not see this section.*

**The point.** Appropriate reliance means putting your checks where the task needs them, and being able to say why. Checking costs time, and two tasks can get equally finished AI answers, so the answer can't tell you where to check. The task can: whether its right answer depends on something a fluent answer could miss, and what a miss would cost. When the task is the kind the AI does well and a weak answer shows when you read it, the right call is to rely on it, and that frees the check for the task that needs it. When a condition raises what a miss costs, the call can stay the same while what it requires changes: someone now has to read the answer carefully before it governs the work. That is calibrated acceptance; reflexive caution isn't. Faculty ask for that account: the evidence for relying, and what would have changed the call.

**What a first-time educator should be able to say afterwards.** "I had time to check one of two tasks from a 2023 study of BCG consultants: segmenting the footwear market by users, or picking a clothing brand from a spreadsheet and insider interviews. Both AI answers looked finished, and both were going into my team's first draft. The segmentation sat inside the jagged frontier: with AI, consultants finished more tasks, faster, at higher quality. The brand pick sat outside it: with AI they were right less often, and graders still rated their work higher. The brand pick's deciding details were in the interviews, and the spreadsheet only looked complete, so a polished answer could be wrong and a read-through wouldn't show it. For the segmentation, the evidence suggests no hidden facts: a weak answer shows when you read it. So the suggested call is to rely on the segmentation and spend the check on the brand pick, working it from the interviews myself before comparing. Then the segmentation was going straight into the launch plan. It's still inside the frontier, so I'd still rely on it, but someone has to read it carefully before it's built. The brand pick still needs the check. Moving the check would leave the brand pick to a read-through, and asking for a week slips the launch. That's what I'd ask a student: what evidence justified relying here, and what would have changed the call? Then I'd change one condition and ask again."

**Faculty check** (verbatim from `PLAN.md` and the site's Core Failure Modes table): *What evidence justified relying on the system here, and what would have changed the call?* The final frame adds, directly under it and at the same size, the move the figure makes: *Change one condition and ask for the call again.*

**Essay passages** (Section V, "Appropriate Reliance as a Teachable Competency"):

> The distinction between trust and reliance matters here. Trust is a subjective disposition, a feeling of confidence that a system will perform well. Reliance is the observable act of accepting its output and acting on it. Appropriate reliance is harder and more discriminating: accepting support when it is warranted, refusing or verifying when it is not, and being able to give an account of the difference ([Raees & Papangelis, 2026](https://arxiv.org/abs/2604.23896)). A student who trusts AI generally has learned almost nothing transferable. One who has developed a disciplined account of when and why to rely, across task types, risk levels, and domains, has developed something real.

> AI improved performance on some tasks and degraded it on others, and the boundary was not obvious in advance. Tasks that looked similar from the outside differed in whether AI helped or hurt, a finding Dell'Acqua et al. describe as the jagged technological frontier ... The educational response is pattern recognition: learning to identify what kind of task is in front of you, where models tend to be strong, where they tend to fail, and what independent checks are required before the output governs the work.

> Users who can only inspect an AI answer are still downstream of the frame. Users who can change the task, revise the context, reset the criteria, and design the checks are exercising the judgment the assignment is meant to build.

**How the beats map to the passages.**

| Essay clause | Beat |
| --- | --- |
| "a feeling of confidence that a system will perform well" | 2 (identical answers, identical "READY" tags) |
| "the observable act of accepting its output and acting on it" | 3 and 8 (the reader's calls, red; the task not checked reads "You rely on it") |
| "Tasks that looked similar from the outside differed in whether AI helped or hurt" | 1–2; 4–5 (the frontier and the split results) |
| "learning to identify what kind of task is in front of you, where models tend to be strong, where they tend to fail" | 6 (Task B's deciding details in the interviews; what the evidence suggests about Task A) |
| "accepting support when it is warranted" | 7 and 9 (rely on Task A; still rely on it in the launch plan, after a careful read) |
| "refusing or verifying when it is not" | 7 (work Task B from the interviews yourself, then compare) |
| "what independent checks are required before the output governs the work" | 9 (read it before it's built) |
| "being able to give an account of the difference" | 10 (the faculty check and the move) |

**Misreadings to design against.**

1. *AI is bad at judgment work, so don't use it.* Both suggested calls for Task A are to rely on it; Task B's ends "then compare".
2. *More checking is always safer.* There's time for one check; question 2's suggested call keeps it on Task B and relies on Task A after a careful read. "Ask for a week to check both" shows its cost ("LAUNCH SLIPS A WEEK"), and "Move my check here" shows its cost ("TASK B: READ-THROUGH ONLY").
3. *Relying means not reading.* Question 2's first option is "Rely on it, after a careful read", and the suggested call is "RELY ON IT · READ IT BEFORE IT'S BUILT".
4. *The figure's reasoning is a study finding.* Task A's line sits under its own label, "WHAT THE EVIDENCE SUGGESTS", in italic; the suggested calls sit under "SUGGESTED CALL · REASONED FROM THE RESULTS". Task B's line is the study's own description.
5. *Checking the AI's answer would have fixed Task B.* The AI groups had the same materials and scored 70.6% and 60%; the suggestion is to work it from the interviews yourself.
6. *You can tell from the answer.* Identical answers and "READY" tags; graders rated AI users' work higher, right or wrong.
7. *It's a quiz with an answer key.* Nothing reveals a call before it's made, in any view or control, including the page copy and `?t=`. Suggestions are the same for every reader and labelled as reasoning. There is no score.
8. *Play means skip.* Play at a question asks for the call; only Skip records "No call made".

**Changes after figure cold read 2** (`tests/figure-read-2.md` and the orchestrator's notes):
- *Leaks closed.* The page's "After you make your call" disclosure is replaced by "After you make your call: make or skip both calls to open this" until both questions are done; print shows it after the figure. `?t=` holds now stop at an unanswered question, like the scrubber (the runtime's window seek hook stays the export path).
- *Play doesn't skip.* Play at a question shows "Make your call first, or skip this question." and focuses the first option; with a call made, it continues. Only Skip records "No call made".
- *Question 2 teaches calibrated acceptance.* Options: "Rely on it, after a careful read", "Move my check here" (or "Keep…" / "Put…"), "Ask for a week to check both". The suggested call is "RELY ON IT · READ IT BEFORE IT'S BUILT", and the caption names it: "Still inside the frontier: rely on it, and read it before it's built. Task B needs the check." Cost notes sit beside the other two options.
- *Reasoning labelled as reasoning.* Beat 6 now shows Task B's study fact first, then, under "WHAT THE EVIDENCE SUGGESTS", Task A's line in italic: "No hidden facts: a weak answer shows when read." Caption: "Task B's deciding details were in the interviews. For Task A, the evidence suggests none."
- *First view.* The page top is compact (title and a one-line lede; the fuller setup moves below the figure), and until the first question is answered the picture is capped so the question and Continue fit on screen with it, without scrolling: SVG at 1280 × 900, the compact stacked stage at 1280 × 720. After Continue the cap lifts and the picture is brought into view.
- *Phone.* After question 1 the page brings the cards into view; question 2 scrolls its options and Continue into view instantly.
- *Evidence line.* The "19 percentage points" quote says the two AI groups are pooled.
- *Length.* 117.9 s on the no-call path, plus the 3 s name card at the start of play (120.9 s in the player); a reader who answers at load watches about 81 s plus decision time.

**Changes after final verification** (`tests/final-verify.md`): answer text in the SVG now exists only from its reveal (filled by `render(t)`, cleared on Start over), so find-in-page and the printed question page can't give a call away. On phones the caption band and controls stay at the bottom while the stacked stage scrolls, and in play the page follows the action: the inside numbers (beat 4), Task B's panel (5), the facts and reasoning (6), the suggested calls (7), question 2's options (8) and its call (9) each come into view above the caption.

**Changes for the nameplate** (the family standard; `CONVENTIONS.md`, "Every figure names its failure mode"). The runtime's `nameplate` option names the skill: "Appropriate reliance", kicker "The skill", and the definition from `NAMEPLATE-DEFINITIONS.md`, "Accept AI support where it’s warranted, check or refuse it where it isn’t, and be able to say why." Because this figure opens on a live question, the name card shows over question 1 when the figure comes into view, holds 1.2 s and moves into the corner over 0.8 s, with the caption band and Continue quiet until it settles. Question 1's options (the two "Check this one" pills and "Your call") stay out while the card is large and fade in only as it reaches the corner, so the card never covers them at any size. The question is live underneath: any touch, click, key, wheel or focus in the figure puts the card in its corner at once, so it never delays focus or covers the options while the reader acts. Play from the start (Start over, or beat 0) shows the standard 3 s card over the opening. All the figure's times stay on its own clock; the player adds the card, so the scrubber, `?t=` and the time readout run 3 s ahead (question 1 at 0:28, question 2 at 1:31, the end at 2:00), and every question lock holds in player time. The last caption sets the name and definition above the check, so the definition is set at 16 px and both check lines at 20 px: from 1024 px up each takes one line and the band keeps the runtime's 144 px (156 px from 720 to 1023 px). On phones the band stays at the bottom of the screen at 182 px for beats 1 to 9 and grows to 264 px for the last caption without moving the controls (124 px in the first view, so question 1's options sit above it). The page kicker becomes "The skill", "How this figure works" uses the definition's wording, and the printed question page carries the plate line.

**Coordination with figure 4 (uncalibrated reliance).** Figure 4 shows the failure in a student, with a constructed port relief task: one checked part doesn't justify relying on a look-alike part. This figure uses the study's own two tasks, the reader makes the calls, and it adds what figure 4 left out: warranted acceptance, kept and conditioned when the stakes change. Shared: the "READY" pill, the jagged frontier's look and labels, and its definition. Figure 4's page links here as "Make the call yourself".

**Lessons from figures 1–7, applied.** Captions match the picture and never branch; no answer key and a transferable reason; fair costs on every option; one difference per question; each term defined in its own beat; the check verbatim with the move under it; `CONSISTENCY.md` (question poster, red reader marks and key, 13-unit text with `syncStacked`, fixed phone band, no "pause it"); the reading budget in every beat.

**Conventions this figure adds** (appended to `CONVENTIONS.md`): gates, `lockedAt`, `onGatePlay` and a forced export seek in the runtime; question before answer in every view, including page copy and `?t=`; locked beat-list entries; a budgeted call; suggested calls and figure reasoning labelled as reasoning; a changed condition that adds a row; "Start over"; a stacked stage that grows only at a question; a first view that fits the question on screen; autoplay only before first play.

**Why this scenario.** The study's own tasks make the reveal evidence rather than the author's opinion. The conditions (a first draft for your team, time for one check, the launch plan, a week's delay) are added for the exercise; the study didn't vary them, and each consultant worked only one set of tasks.

**Considered and left out.** Three options per task (checking was never wrong); "check it first" as warranted on Task B; "ask for a week" as the suggested call at question 2 (it rewarded reflexive caution and ignored that a weak Task A answer shows when read); "Show all beats"; readable AI answers; a score.

**Open questions for Jack.** The suggested calls are reasoning from the evidence (the key says so). The figure opens on the question instead of autoplaying. The move line is this figure's wording. The chapter mapping is provisional.

## 2. Scenario

You have time to check one of two tasks from Dell'Acqua et al.'s 2023 field experiment with BCG consultants. Task A: segment the footwear industry market based on users. Task B: use a spreadsheet and insider interviews to pick the brand a clothing firm should back. An AI gives both answers in the same finished form, and both will go into your team's first draft. A check means working the task yourself, then comparing with the AI's answer. You choose which task gets your one check and rely on the AI for the other, or skip the question. The frontier is drawn between the tasks, the study's results split them, and the figure shows Task B's deciding details, what the evidence suggests about Task A, and the suggested call. Then your segmentation goes straight into the launch plan. You choose to rely on Task A after a careful read, move your check to it, or ask for a week to check both, and the figure shows the suggested call and what the other two cost. The figure ends on the faculty check.

*Sources.* Task A's wording is the paper's; Task B paraphrases the paper's Appendix A; "the deciding details were in the interviews; the spreadsheet only looked complete" follows section 3.2. The figures are from the source spine's Jagged Frontier entry: inside the frontier, 12.2% more tasks, 25.1% faster, more than 40% higher quality with AI; outside it, right about 84.5% of the time without AI, 70.6% with GPT-4 alone and 60% with GPT-4 plus a prompt-engineering overview, and AI users' recommendations rated higher in quality "regardless of the correctness of their answer". "No hidden facts: a weak answer shows when read" is the figure's reasoning and is labelled so. The conditions are added for the exercise.

## 3. Cast and grammar

**Colour.** Grey is what the AI supplied (answers, "AI'S ANSWER", "READY"). Red is the reader (the dot in a chosen option, a ring once the check moves, "You rely on it" or "Check moved to Task A", "Your call", the "YOUR CALLS" key). Navy ink is the page (tasks, conditions, budget, pills, frontier, study facts, the figure's reasoning, evidence, suggested calls, "No call made"). Type: Source Serif 4, Source Sans 3, IBM Plex Mono at 13 units; the figure's reasoning is Serif italic.

**Stage.** 960 × 540. Top band: source line (y 18) and frontier labels (y 40). Cards: Task A x 24–456, Task B x 504–936, y 48–476; the frontier in the gap. Bottom band: budget and definition (y 498), keys (y 526). Task B's evidence rises at 1.5× over the dimmed scene in beat 5.

| Element | How it looks | Where |
| --- | --- | --- |
| Source line | Mono 13 "DELL'ACQUA ET AL. · FIELD EXPERIMENT, 2023 · 758 BCG CONSULTANTS · SOME WITH GPT-4" | (24, 18) |
| Task text | Serif 18. A: "Segment the footwear industry market / based on users." B: "Use a spreadsheet and insider interviews to / pick the brand a clothing firm should back." | Baselines 92, 114 |
| Task B's fact | Underline under "insider interviews"; mono "THE DECIDING DETAILS WERE IN THE INTERVIEWS" / "THE SPREADSHEET ONLY LOOKED COMPLETE" | y 136, 151 |
| Task A's reasoning | Mono 13 (500) "WHAT THE EVIDENCE SUGGESTS", then Serif italic 15 "No hidden facts: a weak answer shows when read." | y 136, 153 |
| AI's answer | Grey label, band with two grey lines, filled "READY" pill; identical on both | y 160–200 |
| Row 1 | Mono "IF IT'S YOUR TEAM'S FIRST DRAFT"; "Check this one" pill; red "Your call" (or ink "No call made"); red "You rely on it" / "Check moved to Task A" | y 220–254 |
| Budget | Mono "TIME FOR ONE CHECK · A CHECK: WORK IT YOURSELF, THEN COMPARE" | (480, 498) |
| Row 1 suggestions | Navy tags "RELY ON IT" (A) and "WORK IT FROM THE INTERVIEWS, THEN COMPARE" (B); note "A CHECK HERE LEAVES TASK B UNCHECKED" | y 262, 294 |
| Row 2 (A) | Mono "IF IT GOES STRAIGHT INTO THE LAUNCH PLAN"; stacked pills "Rely on it, after a careful read" (y 324), "Move my check here" / "Keep my check here" / "Put my check here" (y 352), "Ask for a week to check both" (y 380); "Your call" beside the first pill | y 316–404 |
| Row 2 costs and call | Mono notes beside their pills: "TASK B: READ-THROUGH ONLY", "LAUNCH SLIPS A WEEK"; navy tag "RELY ON IT · READ IT BEFORE IT'S BUILT" | y 368, 396; tag y 410 |
| Inside evidence | Rule; mono "WITH AI, ACROSS TASKS INSIDE THE FRONTIER"; one line: "12.2% more tasks", "25.1% faster", "40%+ higher quality" | y 435–468 |
| Outside evidence | Mono "RIGHT ANSWERS ON TASK B"; bars "Without AI" 84.5%, "GPT-4 alone" 70.6%, "GPT-4 + overview" 60%; bracket "Rated higher in quality, right or wrong" | Card B, y 316–415 |
| Frontier | Irregular navy line; "INSIDE THE FRONTIER", "OUTSIDE THE FRONTIER" | x 466–494 |
| Keys | Red dot "YOUR CALLS" (only with a call); navy swatch "SUGGESTED CALL · REASONED FROM THE RESULTS" | y 526 |
| Caption band | Runtime caption; at a question, "Make your call first, or skip this question." (after Play), **Continue**, **Skip this question** | Under the stage |

**Branches.**

| Question | Call | Red marks | After the reveal |
| --- | --- | --- | --- |
| 1 | Task A / Task B | Dot in that pill; "You rely on it" on the other card | Row 1 suggestions beside the marks |
| 1 | Skip | "No call made" on both cards | Suggestions only |
| 2 | Rely on it, after a careful read | Dot | Matches "RELY ON IT · READ IT BEFORE IT'S BUILT" |
| 2 | Move my check here (check was on B) | Dot; B's dot becomes a ring, "Check moved to Task A" | "TASK B: READ-THROUGH ONLY" beside the choice |
| 2 | Keep my check here (on A) / Put my check here (skipped) | Dot | Same note |
| 2 | Ask for a week to check both | Dot | "LAUNCH SLIPS A WEEK" beside the choice |
| 2 | Skip | "No call made" on row 2 | Suggestion only |

**Interaction.**
- *Opening and first view.* The figure opens on question 1, live, with the name card over it: "THE SKILL" above "Appropriate reliance", large, over a pale scrim. Once the figure is in view the card holds 1.2 s, then moves into the top-left corner (0.8 s), where "APPROPRIATE RELIANCE · THE SKILL" stays in a strip above the stage in every view. The question's options wait until the card reaches the corner, then fade in. The caption band and Continue fade in as it settles; any touch, key or focus in the figure settles it at once. Until question 1 is answered, the picture is capped so the question and Continue fit on screen with it; the page doesn't scroll on load. After Continue the cap lifts and the picture is brought into view (on a phone, the top of the cards).
- *Controls.* At a question, the drawn options are real radio buttons (labels over each drawn pill or chip, visible focus ring; arrows move, Enter continues). Continue and Skip sit at the caption band's bottom right; Tab goes options, Continue, Skip, player.
- *Play at a question.* With no call, it shows "Make your call first, or skip this question." and focuses the first option; with a call, it continues. Only Skip records "No call made".
- *No passing an unanswered question.* Scrubber, End, beat clicks, seeks and `?t=` stop at it and open it.
- *When a question opens in play.* The page scrolls instantly so the whole picture shows if it fits, otherwise the options and Continue, and focus moves to the first option. After Continue or Skip, focus moves to Play/Pause.
- *Question before answer.* Beat-list entries after an unanswered question read "Make your call to see this."; the hidden summary releases one part per question; the page's disclosure stays locked until both questions are done; print shows question 1, then the final frame, the beat list and the disclosure, and restores the screen afterwards; reduced motion steps question by question.
- *Narrow screens.* A stacked stage replaces the SVG below a letterboxed scale of 0.846; it grows only at a question (phase 1 shows only what question 1 needs).

## 4. Beats

Times are absolute seconds on the no-call path, on the figure's own clock; the player adds the 3 s name card before 0.0, so its scrubber and `?t=` read 3 s more. The caption changes first (0.3 s fade); nothing moves for the first second; a change the caption is about waits until the caption can be read once, except a lead-in its first clause describes; each beat holds its caption plus new picture words at 3 words a second or less.

### Beat 0 · the name card (3 s before 0.0)
- **Moves:** in play from the start, "THE SKILL" and "Appropriate reliance" hold large over the opening (2 s), then move into the top-left strip (1 s). At load the card shows over question 1 instead (see Interaction). Under reduced motion the plate is in place and the card doesn't move.
- **Caption:** none; the band stays quiet.

### Beat 1 · 0.0–15.0 s · Two tasks
- **Moves:** card A and its lines (1.0–2.2); the source line (2.4–2.8); card B and its lines (4.0–5.4); hold.
- **Caption:** "Two tasks from one study."

### Beat 2 · 15.0–21.7 s · The AI answers both
- **Moves:** "AI'S ANSWER" and bands (16.0–16.4); grey lines on both (16.4–17.2); "READY" on both at once (18.4–18.8).
- **Caption:** "An AI answers both. The two answers look equally finished."

### Beat 3 · 21.7–31.7 s · One check (question 1)
- **Moves:** the budget line (22.7–23.1); "IF IT'S YOUR TEAM'S FIRST DRAFT" (24.4–24.8); the pills with "Your call" (25.0–25.5).
- **Question:** opens at 25.5 (and at load); Continue or Skip resumes from 30.2; the no-call path holds to 31.7.
- **Caption:** "You have time to check one. Which one?"

### Beat 4 · 31.7–43.7 s · The frontier, and inside it
- **Moves:** the jagged line (32.7–34.3); its labels (34.3–34.7); the inside title and rule on card A (36.7–37.1); "12.2% more tasks", "25.1% faster", "40%+ higher quality" (37.5–39.1).
- **Caption:** "A jagged frontier marks where an AI stops being reliable. Inside it, AI helped."

### Beat 5 · 43.7–56.7 s · Outside the frontier
- **Moves:** the scene dims (44.7–45.2); Task B's evidence rises at 1.5× (45.2–45.8); "Without AI" 84.5% (47.1–47.7); "GPT-4 alone" 70.6% and "GPT-4 + overview" 60% (47.9–48.5); the bracket and its words (49.1–50.0); a 4.0 s hold at full size; it settles into card B (54.0–55.2).
- **Caption:** "On Task B, consultants with AI were right less often. Graders still rated their work higher."

### Beat 6 · 56.7–70.2 s · What set them apart
- **Moves:** an underline under "insider interviews" and "THE DECIDING DETAILS WERE IN THE INTERVIEWS" (57.7–58.3); "THE SPREADSHEET ONLY LOOKED COMPLETE" (58.5–58.9); under Task A, "WHAT THE EVIDENCE SUGGESTS" (61.8–62.2) and the italic "No hidden facts: a weak answer shows when read." (62.4–62.8); hold.
- **Caption:** "Task B's deciding details were in the interviews. For Task A, the evidence suggests none."
- **Notice:** Task B's line is the study's description; Task A's is labelled as reasoning.

### Beat 7 · 70.2–83.2 s · The suggested call
- **Moves:** the key "SUGGESTED CALL · REASONED FROM THE RESULTS" (71.2–71.6); unchosen row-1 pills fade to 40% (71.8–72.2); "RELY ON IT" (72.7–73.1); "A CHECK HERE LEAVES TASK B UNCHECKED" (73.5–73.9); "WORK IT FROM THE INTERVIEWS, THEN COMPARE" (75.2–75.6); "Your call" fades and "YOUR CALLS" appears if the reader made a call (75.8–76.2).
- **Caption:** "The evidence suggests relying on Task A and working Task B yourself from the interviews."

### Beat 8 · 83.2–96.2 s · One thing changes (question 2)
- **Moves:** "IF IT GOES STRAIGHT INTO THE LAUNCH PLAN" (84.2–84.6); the three pills with "Your call" (87.5–88.0).
- **Question:** opens at 88.0; Continue or Skip resumes from 94.7; the no-call path holds to 96.2. Moving the check from Task B shows at once (ring, "Check moved to Task A").
- **Caption:** "Now your segmentation goes straight into the launch plan. What about Task A?"

### Beat 9 · 96.2–108.2 s · The call
- **Moves:** unchosen row-2 pills fade to 40% (97.2–97.6); "RELY ON IT · READ IT BEFORE IT'S BUILT" (102.2–102.6); "TASK B: READ-THROUGH ONLY" beside "Move my check here" (103.0–103.4); "LAUNCH SLIPS A WEEK" beside "Ask for a week…" (103.6–104.0); "Your call" fades (104.2–104.6); hold.
- **Caption:** "Still inside the frontier: rely on it, and read it before it's built. Task B needs the check."
- **Notice:** the call stays "rely"; what changed is that a careful read must happen before the answer governs the work. Each other option shows its cost.

### Beat 10 · 108.2–117.9 s · The faculty check
- **Moves:** the check rises (108.4–109.0); "Change one condition and ask for the call again." at the same size (113.4–113.9); rests.
- **Caption:** "Faculty check: What evidence justified relying on the system here, and what would have changed the call?" / "Change one condition and ask for the call again."

## 5. Final frame

The still at 117.9 s on the no-call path (120.9 s in the player; the end of play, reduced motion's last step and the second printed page); the poster and first frame are question 1, with the name card over it. Above the stage, the strip: "APPROPRIATE RELIANCE · THE SKILL". Card A: task; "WHAT THE EVIDENCE SUGGESTS · No hidden facts: a weak answer shows when read."; the AI's answer; row 1 (faded pill, "RELY ON IT", "A CHECK HERE LEAVES TASK B UNCHECKED"); row 2 (three faded pills with "TASK B: READ-THROUGH ONLY" and "LAUNCH SLIPS A WEEK", "RELY ON IT · READ IT BEFORE IT'S BUILT"); the inside numbers. Card B: task with "insider interviews" underlined; "THE DECIDING DETAILS WERE IN THE INTERVIEWS / THE SPREADSHEET ONLY LOOKED COMPLETE"; the AI's answer; row 1 (faded pill, "WORK IT FROM THE INTERVIEWS, THEN COMPARE"); 84.5%, 70.6%, 60% and the bracket. The frontier between; the budget and the key below; in a branch, the reader's red marks and "No call made". Caption band, in two columns (stacked on phones): "APPROPRIATE RELIANCE" beside the definition, "Accept AI support where it’s warranted, check or refuse it where it isn’t, and be able to say why."; then FACULTY CHECK beside the check, with the move line under it at the same size.

**What the still says alone:** with time for one check, two tasks got the same finished AI answer. AI helped on the segmentation and hurt on the brand pick, whose deciding details were in the interviews, while graders rated the wrong answers well. For a first draft, rely on Task A and work Task B from the interviews. Once the segmentation goes straight into the launch plan, still rely on it, but read it before it's built; Task B keeps the check, and the other options' costs are written beside them.

## 6. Standalone page copy

**Kicker / title / lede:** "The skill" / "Appropriate reliance" / "You have time to check one of two AI answers. Decide where the check goes, then see what the study found."

**Faculty check** (visible): the check and the move line.

**How this figure works** (visible, below the check): "Appropriate reliance means accepting AI support where it's warranted, checking or refusing it where it isn't, and being able to say why. Checking takes time, so the figure gives you two tasks from a 2023 field experiment and time to check only one. You decide where the check goes before you see what happened, then make one more call after a condition changes. You can skip either question, and Start over plays the whole figure from the beginning."

**Disclosure "After you make your call"** (locked, "make or skip both calls to open this", until both questions are done; opens itself at the check; prints after the figure):
- *What a good answer says* (labelled as the figure's reasoning): the check belongs on Task B, whose deciding details were in the interviews and whose wrong answers were still rated higher; Task A is inside the frontier and, the figure reads, has no hidden facts, so as a first draft it goes without a check; in the launch plan it is still inside the frontier, so the call is still to rely on it, but someone must read it carefully before it's built; moving the check leaves Task B to a read-through; asking for a week is defensible and slips the launch a week.
- *Evidence:* the spine's entry, with "19 percentage points" marked as the two AI groups pooled.
- *About the tasks:* the 18 product-development questions (including "a persuasive memo"); the outside task's spreadsheet and interviews, built so GPT-4 would get it wrong; the one-check choice and the launch-plan condition are this figure's; the frontier moves as models change.

**Hidden summary:** part 1 (setup and question 1); part 2 after question 1 (results, Task B's fact, what the evidence suggests about Task A, the first suggested call, question 2); part 3 after question 2 (the second suggested call and the other options' costs).

**Beat list:** beat 0, "Appropriate reliance · The skill" (the name card; never locked), then the captions above, each with its "On screen" line; locked entries read "Make your call to see this."

## 7. Pacing table

| Beat | Time (s) | Caption words | Picture words | Reading (s) | Lead (s) | Motion (s) | Hold (s) | Total (s) | Question |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 · Name card | 3.0 s before 0.0 | 0 | 4 | 1.3 | 0 | 1.0 | 2.0 | 3.0 (player only) | |
| 1 · Two tasks | 0.0–15.0 | 5 | 39 | 14.7 | 1.0 | 4.4 | 9.6 | 15.0 | |
| 2 · The AI answers both | 15.0–21.7 | 10 | 3 | 4.3 | 1.0 | 2.8 | 2.9 | 6.7 | |
| 3 · One check | 21.7–31.7 | 8 | 22 | 10.0 | 1.0 | 2.8 | 6.2 | 10.0 | Opens 25.5; resumes 30.2 |
| 4 · The frontier, and inside it | 31.7–43.7 | 14 | 21 | 11.7 | 1.0 | 6.4 | 4.6 | 12.0 | |
| 5 · Outside the frontier | 43.7–56.7 | 16 | 22 | 12.7 | 1.0 | 10.5 | 1.5 | 13.0 | |
| 6 · What set them apart | 56.7–70.2 | 15 | 25 | 13.3 | 1.0 | 5.1 | 7.4 | 13.5 | |
| 7 · The suggested call | 70.2–83.2 | 15 | 23 | 12.7 | 1.0 | 5.0 | 7.0 | 13.0 | |
| 8 · One thing changes | 83.2–96.2 | 13 | 25 | 12.7 | 1.0 | 3.8 | 8.2 | 13.0 | Opens 88.0; resumes 94.7 |
| 9 · The call | 96.2–108.2 | 18 | 16 | 11.3 | 1.0 | 7.4 | 3.6 | 12.0 | |
| 10 · Faculty check | 108.2–117.9 | 15 + 9 | 0 | 8.0 | 0.2 | 5.7 | 4.0 | 9.7, then rests | |
| **Total** | | **138** | **200** | | | | | **117.9 (120.9 with the card)** | |

Checks: every caption-named change waits until the caption can be read once (beat 6's Task A line at 5.1 s, beat 8's pills at 4.3 s, beat 9's tag at 6.0 s); every hold is at least 1.5 s; one movement at a time; nothing reveals a call before it's made. A reader who answers question 1 at load watches about 81 s plus decision time.
