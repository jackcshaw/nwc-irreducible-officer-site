# Appropriate reliance: storyboard

Motion figure 8 of 8 · slug `appropriate-reliance` · storyboard round 2, revised after storyboard cold read 1 · October 28, 2026
*Cold-read copy. The Intent section is removed.*

## 2. Scenario

You have time to check one of two tasks from Dell'Acqua et al.'s 2023 field experiment with 758 BCG consultants using GPT-4. Task A: segment the footwear market by user and pick the segment that matters most. Task B: use a spreadsheet and insider interviews to pick the brand a clothing company should back. An AI gives both answers in the same finished form, and both will go into a first draft for your team. A check means working the task yourself, then comparing with the AI's answer. You choose which task gets your one check, and you rely on the AI for the other. Then the frontier is drawn between the tasks, the study's results split them, and the figure shows what each answer rested on and what the evidence suggests. Then one condition changes: the company will build the segment you pick. You decide whether to rely on Task A now, and the figure shows the call that the evidence and the new condition suggest. The figure ends on the faculty check.

*Sources.* The tasks are paraphrased from the working paper's task descriptions; their wording on screen is the figure's. The study figures are from the source spine's Jagged Frontier entry (Dell'Acqua et al., 2023, HBS working paper 24-013): inside the frontier, consultants with AI finished 12.2% more tasks, 25.1% faster and at more than 40% higher quality; on a task chosen to fall outside it, consultants without AI were right about 84.5% of the time and the two AI groups 60% and 70%, and graders still rated the AI users' recommendations higher in quality "regardless of the correctness of their answer". That the right answer on Task B depended on interview details that cut against the spreadsheet is from the working paper's task design, not the spine. The AI's answers are drawn as lines, not text. The conditions (a first draft for your team, time for one check, the company will build what you pick) are added for the exercise; the study didn't vary them. *The Irreducible Officer*, Section V, defines trust, reliance and appropriate reliance, and describes the jagged frontier and pattern recognition across task types.

## 3. Cast and grammar

**The colour rule.** Grey is what the AI supplied: its two answers, their "AI'S ANSWER" labels and their "READY" pills. Red is what the reader decided: the red dot in the radio they chose, "YOU RELY ON IT" on the task they didn't check, and the labels that name the reader ("YOUR CALL" during a gate, the "YOUR CALLS" key at the end). Navy ink is the page: the tasks, the conditions, the budget, the pills, the frontier, the pattern marks, the evidence, the suggestion tags and their key.

**Palette.** Paper `#f6f1e8`, paper-bright `#fffdfa`, ink `#0a2242`, machine grey `#5b564f` with a `#ded5c4` band behind AI-supplied work, red `#b81b2b`. Type: Source Serif 4 for the tasks, numbers and captions; Source Sans 3 for pill and evidence labels; IBM Plex Mono for small labels, at 13 units (so labels survive the runtime's viewport fit at 1280 × 720).

**Stage.** An SVG with a 960 × 540 viewBox. One view, no camera moves.
- *Top band* (y 0–46): the source line at left, then the frontier's two labels.
- *Two cards* (y 48–472): Task A at left (x 24–456), Task B at right (x 504–936). The frontier is drawn in the 48-unit gap between them.
- *Bottom band* (y 476–540): the budget and the definition of a check; then the keys.
- *Centre stage* (beat 6 only): Task B's evidence panel, over the dimmed scene.

Positions inside a card are given for Task A (x0 = 24); Task B's are the same with x0 = 504.

| Element | Stands for | How it looks | Where |
| --- | --- | --- | --- |
| Source line | Where and when | Mono 13 ink "FIELD EXPERIMENT, 2023 · 758 BCG CONSULTANTS · GPT-4" | Left-aligned (24, 18) |
| Task cards | The two tasks | Paper-bright, hairline ink border | A x 24–456, B x 504–936; y 48–472 |
| Task tags | Names the tasks | Mono 13 ink "TASK A", "TASK B" | (x0+16, 70) |
| Task text | What each task asks | Serif 18 ink, two lines each. A: "Segment the footwear market by user and" / "pick the segment that matters most." B: "Use a spreadsheet and insider interviews to" / "pick the brand a clothing company should back." | Baselines 96 and 119, from x0+16 |
| AI's answer | What the AI gives back | Mono 13 grey "AI'S ANSWER"; a `#ded5c4` band holding two grey lines (writing drawn as lines, lengths 384 and 236); identical on both cards | Label (x0+16, 180); band x0+16 to x0+416, y 188–214 |
| "READY" pill | The tool presents it as finished | Filled grey pill, paper mono 13 "READY"; same style, same moment on both | x0+344 to x0+416, y 168–184 |
| Condition, row 1 | What the answers are for | Mono 13 ink "IF IT'S A FIRST DRAFT FOR YOUR TEAM", identical on both cards | (x0+16, 236) |
| "Check this one" pill | Where the one check can go | Paper pill, rounded 14, hairline ink outline; an empty radio (r 5.5) at its left; Sans 600 13 ink "Check this one" | x0+16 to x0+176, y 244–272 |
| Budget and definition | What a check costs and is | Mono 13 ink, centred: "TIME FOR ONE CHECK · A CHECK: WORK IT YOURSELF, THEN COMPARE" | (480, 496) |
| "YOUR CALL" | Names the reader during a gate | Red mono 13, right-aligned on the open row's label line, shown until that row's suggestion appears | Row 1 (x0+416, 236); row 2 (440, 340) |
| Reader's check | Where the reader spent it | A solid red dot (r 4) in that card's radio; the pill's outline thickens to 1.8 | In the pill |
| "YOU RELY ON IT" | What the reader didn't check | Red mono 13 beside the other card's pill | (x0+192, 263) |
| Condition, row 2 | The changed condition | Mono 13 ink "IF THE COMPANY BUILDS WHAT YOU PICK" | (40, 340), card A only |
| Pills, row 2 | The call again | Two pills as above: "Rely on it" (x 40–160), "Check it" (x 168–272) | y 348–376, card A only |
| Jagged frontier | The uneven edge of where AI is reliable | An irregular navy line, stroke 1.8, uneven teeth, drawn top to bottom between the two cards only. Mono 13 ink "INSIDE THE FRONTIER" (right-aligned at x 456) and "OUTSIDE THE FRONTIER" (from x 504) | Line within x 466–494, y 52–468; labels baseline 40 |
| Pattern marks | What each answer rested on | A navy underline (stroke 1.5) under key words, and navy mono 13 tags under the task text. A: underline under "Segment the footwear market by user"; tag "IDEA WORK · JUDGE IT BY READING". B: underline under "insider interviews"; tags "THE RIGHT ANSWER DEPENDED ON INTERVIEW DETAILS" and "THAT CUT AGAINST THE SPREADSHEET" | Tags (x0+16, 142) and (x0+16, 158) |
| Inside evidence | The study, inside the frontier | In card A's slot: mono "WITH AI, ACROSS TASKS INSIDE THE FRONTIER"; three Serif 600 22 numbers with Sans 13 labels: "12.2%" more tasks, "25.1%" faster, "40%+" higher quality | Title y 426; numbers y 450, labels y 466; columns x 40, 176, 312 |
| Dimmed scene | Attention moves to centre | Everything on the stage drops to 25% | Beat 6 |
| Outside evidence | The study, on Task B | First a centre-stage panel (paper-bright, soft shadow, x 200–760, y 140–400, content at 1.5×), then settled into card B's slot: mono "RIGHT ANSWERS ON TASK B, CHOSEN TO FALL OUTSIDE"; Sans 14 rows "Without AI" (one bar, "84.5%") and "With AI" over mono "TWO GROUPS" (two bars, "60%" and "70%"). Bars 14 high, ink 85%, 2.8 units a point. A navy bracket under the two AI bars, Serif italic 15 "Rated higher in quality, right or wrong". Mono "DELL'ACQUA ET AL. (2023)" | Slot y 318–468: title 332; bars from x 620 at y 345, 375, 393; bracket y 418; text centred (718, 438); source (520, 462) |
| Suggestion key | Says the navy tags are reasoning | A small filled navy swatch and mono 13 ink "WHAT THE EVIDENCE SUGGESTS" | Right-aligned (936, 522) |
| Suggestion tags | What the evidence suggests | Filled navy tag (rounded 3), paper mono 13. A, row 1: "RELY ON IT". B, row 1: "WORK IT FROM THE INTERVIEWS, THEN COMPARE". A, row 2: "CHECK IT · MAKE TIME FOR A SECOND CHECK" | Row 1 y 280–298; row 2 y 384–402; from x0+16 |
| Cost note | What checking Task A costs | Mono 13 ink "A CHECK HERE LEAVES TASK B UNCHECKED" | (40, 314) |
| "YOUR CALLS" key | Says the red marks are the reader's | A red dot and red mono 13 "YOUR CALLS". Only when the reader made a call | (24, 522) |
| Caption band | The words for each beat | Mono counter and Serif 22 caption; at a gate, two buttons under the caption; in beat 11 the check and the move line at the same size | Under the stage |
| Beat list | Text equivalent | Eleven captions with "On screen" lines, released gate by gate | Under the controls |

**The suggestions.** The same for every reader, whichever call they made.

| Row | What the evidence suggests | Note |
| --- | --- | --- |
| Task A · if it's a first draft for your team | RELY ON IT | A CHECK HERE LEAVES TASK B UNCHECKED |
| Task B · if it's a first draft for your team | WORK IT FROM THE INTERVIEWS, THEN COMPARE | |
| Task A · if the company builds what you pick | CHECK IT · MAKE TIME FOR A SECOND CHECK | |

**Branches.**

| Gate | Reader's call | Red marks | What the marks sit beside after the reveal |
| --- | --- | --- | --- |
| 1 | Task A gets the check | A red dot in Task A's "Check this one"; "YOU RELY ON IT" beside Task B's pill | Task A: "RELY ON IT" and "A CHECK HERE LEAVES TASK B UNCHECKED". Task B: "WORK IT FROM THE INTERVIEWS, THEN COMPARE", above the bars |
| 1 | Task B gets the check | A red dot in Task B's pill; "YOU RELY ON IT" beside Task A's | Both suggestions match |
| 1 | No call | None | Suggestions only |
| 2 | Rely on it | A red dot in "Rely on it" | "CHECK IT · MAKE TIME FOR A SECOND CHECK" |
| 2 | Check it | A red dot in "Check it" | The suggestion matches |
| 2 | No call | None | Suggestion only |

**Interaction.**
- *Gate 1 control.* One radio group, legend "Your one check goes to", with options "Task A" and "Task B" placed over each card's "Check this one" pill. Arrow keys move between them. Choosing one puts the red dot in that pill and "YOU RELY ON IT" beside the other card's pill (the dot grows in over 0.26 s, removed under reduced motion). The reader can change it until they press Show what happened.
- *Gate 2 control.* One radio group on card A's second row, legend "If the company builds what you pick: Task A", options "Rely on it" and "Check it".
- *Buttons.* At a gate, the caption band shows **Show what happened** (enabled once the open question has a call) and **Play without choosing**. Focus is visible on everything.
- *Resuming.* Show what happened jumps the playhead to 1.5 s before the gate beat ends (only a hold remains, so nothing visibly skips) and plays. Play without choosing, or the main Play button at a gate, plays on with no call for that gate. Play without choosing at gate 1 also passes gate 2.
- *Scrubbing.* The scrubber can move past a gate at any time; a gate without a call renders as no call. Moving back to a gate opens its control again with any earlier call in place.
- *Start over.* Clears every call and plays from 0.
- *Screen readers.* The SVG and the caption band are `aria-hidden`. A polite live region announces each gate ("You have time to check one of the two tasks. Choose which one.") and, after each suggestion beat, the suggestion and the reader's call. Example: "The evidence suggests relying on Task A and working Task B yourself from the interviews. You checked Task A and relied on Task B."
- *Question before answer.* Every view that doesn't play shows the question first:
  - *Poster and first frame* (in-page waiting frame and social card): beat 3 settled, with both tasks, both answers marked ready, the first-draft condition, the budget, both "Check this one" pills and the caption "Both are for your team's first draft. You have time to check one. Which one?"
  - *Reduced motion:* opens on beat 3 settled, with its control live and beats 1–3 in the beat list. Beats 4–11 sit behind a disclosure, "Make your call, then show the answer". Show what happened (or "Show the answer without choosing") opens beats 4–9 and shows beat 9 settled: every round-1 result plus the second question, with its control live. A second Show what happened opens beats 10–11 and the final frame.
  - *Beat list while playing:* entries 4–9 appear when the playhead passes gate 1, and entries 10–11 when it passes gate 2. A "Show all beats" button opens them at any time.
  - *Hidden summary:* describes the setup and the question; the rest is in the beat list, after the gate.
  - *Print:* the beat 3 still, then a page break and the final frame, with any calls the reader made.
  - *The preview video* is the no-call path. Each gate holds its full length with the question on screen, and the viewer can pause there.

**Narrow screens.** Picture text is at least 13 units, so the drawn stage keeps its labels down to a letterboxed scale of 0.846. Below that, the SVG collapses and a stacked stage, driven by the same clock and calls, takes its place. The layout is fixed from the first frame, and parts only fade in:
- The source line and the frontier labels sit on top; the two tasks run as side-by-side columns with the jagged line drawn down the gutter between them.
- Each column, top to bottom: tag; task text (Serif 14); the pattern tags' space (mono 13); the AI's answer as a grey "AI's answer · Ready" chip with two grey lines; the row label (mono 13, two lines); a full-width "Check this one" radio button, 44 px tall, with "You rely on it" in red under the other column's; the suggestion tag's space; on Task A the cost note and the second row (two radio buttons); then the evidence (A: three numbers in a list; B: three thin bars with values and the bracket line).
- The budget and definition run under both columns, then the keys. Task B's panel is an overlay over the dimmed stacked stage before its content appears in the slot.
- The stage holds its tallest height (measured once per width), and the caption band is a fixed height with room for the gate buttons, so the controls never move.
- Target at 390 × 844: the whole player fits. If it doesn't, the page may scroll at a gate, which is untimed. The site is desktop-first.

## 4. Beats

Times are absolute seconds on the no-call path. In every beat the caption changes first (0.3 s fade) and nothing in the picture moves for the first second. A change the caption is about starts only after the caption can be read once, except a lead-in that the caption's first or main clause describes. Each beat holds its caption plus new picture words at 3 words a second or less; words repeated identically on both cards count once.

### Beat 1 · 0.0–16.5 s · Two tasks

- **Start:** an empty paper stage.
- **What moves:** 1.0–1.6 card A fades in and rises 6 units, with "TASK A"; 1.6–2.4 its two lines fade in, one after the other; 2.6–3.0 the source line fades in at top left, "FIELD EXPERIMENT, 2023 · 758 BCG CONSULTANTS · GPT-4"; 6.5–7.1 card B fades in and rises, with "TASK B"; 7.1–7.9 its two lines; hold.
- **Caption:** "These tasks come from a field experiment with 758 consultants."
- **Notice:** both tasks end in one pick, and both second lines start "pick the …". Task B names its materials. The study is from 2023, with GPT-4.
- **Why:** the setup, with the two tasks looking alike from the start. Task B appears after there's time to read Task A.

### Beat 2 · 16.5–23.5 s · The AI answers both

- **Start:** both cards, task text only.
- **What moves:** 17.5–17.9 "AI'S ANSWER" and an empty grey band appear on both cards; 17.9–18.7 two grey lines write into both bands at once; 19.9–20.3 a grey "READY" pill drops onto both at the same moment; hold.
- **Caption:** "An AI answers both. The two answers look equally finished."
- **Notice:** same form, same length, same tag, same moment.
- **Why:** the felt signal is the same for both, so it can't decide where the check goes.

### Beat 3 · 23.5–36.5 s · One check (gate 1)

- **Start:** both cards with tasks and the AI's answers.
- **What moves:** 24.5–24.9 "IF IT'S A FIRST DRAFT FOR YOUR TEAM" fades in on both cards; 28.5–28.9 the bottom band fades in, "TIME FOR ONE CHECK · A CHECK: WORK IT YOURSELF, THEN COMPARE"; 29.3–29.8 a "Check this one" pill with an empty radio fades in on each card, with a red "YOUR CALL" on each row's label line. The control is live from 29.8.
- **Gate:** at 29.8, playback pauses until the reader presses Show what happened or Play without choosing. On Show what happened it resumes from 35.0. On the no-call path the beat holds to 36.5. This beat, settled, is the poster and the first frame.
- **Caption:** "Both are for your team's first draft. You have time to check one. Which one?"
- **Branches:** Task A, Task B or no call. A call puts a red dot in that card's pill and "YOU RELY ON IT" beside the other card's pill. Nothing else on the stage changes, and nothing yet shows a side, a reason or a suggestion.
- **Notice:** the condition is identical for both tasks, and a check is defined before anyone spends it. Choosing one task means relying on the other.
- **Why:** predict before reveal, with a cost. The only difference between the tasks is the tasks.

### Beat 4 · 36.5–46.0 s · The jagged frontier

- **Start:** both cards with their answers; the reader's red marks if they made a call.
- **What moves:** 37.5–39.1 an irregular navy line draws downward between the two cards; 39.1–39.5 "INSIDE THE FRONTIER" appears above card A and "OUTSIDE THE FRONTIER" above card B; hold.
- **Caption:** "A jagged frontier marks where AI stops being reliable. It ran between these tasks."
- **Branches:** the reader's red marks stay in place, so a reader can set their call beside the sides.
- **Notice:** Task A is inside and Task B outside. The hold leaves time to compare.
- **Why:** defines the term in its own beat before the study uses it, with the same definition the uncalibrated-reliance figure uses.

### Beat 5 · 46.0–56.0 s · Inside the frontier

- **Start:** as beat 4 settled.
- **What moves:** 47.0–47.4 "WITH AI, ACROSS TASKS INSIDE THE FRONTIER" fades into card A's evidence slot; 51.0–51.4 "12.2% more tasks"; 51.6–52.0 "25.1% faster"; 52.2–52.6 "40%+ higher quality"; hold.
- **Caption:** "On tasks inside the frontier, consultants with AI finished more tasks, faster, at higher quality."
- **Notice:** all three measures went up with AI. The title says these are results across the inside tasks.
- **Why:** the evidence for relying on Task A. The numbers start 5.0 s in.

### Beat 6 · 56.0–71.0 s · Outside the frontier

- **Start:** as beat 5 settled.
- **What moves:** 57.0–57.5 the scene dims to 25%; 57.5–58.1 the panel rises centre stage with "RIGHT ANSWERS ON TASK B, CHOSEN TO FALL OUTSIDE", its two row labels and "DELL'ACQUA ET AL. (2023)"; 59.4–60.0 the "Without AI" bar grows to 84.5%; 60.2–60.8 the two "With AI" bars grow to 60% and 70%; 61.4–61.9 a navy bracket draws under the two AI bars; 61.9–62.3 "Rated higher in quality, right or wrong"; the panel holds at full size for 5.0 s; 67.3–68.5 its content shrinks into card B's evidence slot as the scene returns; hold.
- **Caption:** "On Task B, consultants with AI were right less often. Graders still rated their work higher."
- **Notice:** both AI groups fall short of the group without AI, and the bracket sits on the shorter bars. The study chose this task to fall outside the frontier.
- **Why:** the scores split, and polish didn't show which picks were right. This is the surprise, so it gets the centre stage and the long hold. The bars start after the first sentence (3.4 s in), the bracket after the whole caption (5.4 s).

### Beat 7 · 71.0–82.5 s · What each answer rested on

- **Start:** both cards with their evidence; the frontier and its labels.
- **What moves:** 72.0–72.6 a navy underline runs under "Segment the footwear market by user" in Task A, and "IDEA WORK · JUDGE IT BY READING" appears under the task; 76.4–77.0 a navy underline runs under "insider interviews" in Task B, and "THE RIGHT ANSWER DEPENDED ON INTERVIEW DETAILS" appears under the task; 77.6–78.0 "THAT CUT AGAINST THE SPREADSHEET" appears on the line below; hold.
- **Caption:** "Task A is idea work you can judge by reading. Task B turned on interview details."
- **Notice:** the reason is a kind of task. An answer that misses those details still reads well, so reading it won't show the miss. Nothing on the page showed this before the call; the study chose Task B to fall outside the frontier.
- **Why:** the pattern that travels: ask what a right answer rests on, whether a detail could cut against the obvious reading, and whether reading the answer would show a miss. Task B's mark waits until the caption can be read once (5.3 s).

### Beat 8 · 82.5–94.5 s · What the evidence suggests

- **Start:** as beat 7 settled; red "YOUR CALL" still on both rows.
- **What moves:** 83.5–83.9 the key "WHAT THE EVIDENCE SUGGESTS" appears at bottom right with its navy swatch; 85.0–85.4 a navy "RELY ON IT" tag appears on Task A; 85.8–86.2 "A CHECK HERE LEAVES TASK B UNCHECKED" under it; 88.0–88.4 a navy "WORK IT FROM THE INTERVIEWS, THEN COMPARE" tag appears on Task B; 88.6–89.0 the red "YOUR CALL" labels fade, and the "YOUR CALLS" key fades in at bottom left if the reader made a call; hold.
- **Caption:** "The evidence suggests relying on Task A and working Task B yourself from the interviews."
- **Branches:** the tags and note are identical for everyone. A reader who checked Task A sees their red dot beside "A CHECK HERE LEAVES TASK B UNCHECKED", and "YOU RELY ON IT" on Task B beside the bars. A reader who checked Task B sees both suggestions match. The live region reads the suggestion and the reader's call.
- **Notice:** warranted acceptance, with its reasons on screen: inside the frontier, idea work the team can judge by reading, and only a first draft. Relying on Task A is what frees the check for Task B. On Task B the check starts from the interviews, before the AI's answer can anchor it.
- **Why:** warranted acceptance gets its own result. The suggestions are labelled as reasoning from the evidence. Task A's tag starts 2.5 s in (after "relying on Task A"); Task B's after the whole caption (5.5 s).

### Beat 9 · 94.5–104.5 s · One thing changes (gate 2)

- **Start:** as beat 8 settled.
- **What moves:** 95.5–95.9 "IF THE COMPANY BUILDS WHAT YOU PICK" fades in as a second row on card A, under the first; 97.5–97.9 two pills fade in on that row, "Rely on it" and "Check it", with empty radios and a red "YOUR CALL". The control is live from 97.9.
- **Gate:** at 99.5, playback pauses until Show what happened or Play without choosing (skipped if the reader chose Play without choosing at gate 1). On Show what happened it resumes from 103.0. On the no-call path the beat holds to 104.5.
- **Caption:** "Now the company will build the segment you pick. Would you rely on Task A?"
- **Branches:** Rely on it, Check it, or no call; a call puts a red dot in that radio.
- **Notice:** the task, the AI's answer, the frontier and the evidence haven't changed. Only the condition has, and the first row's condition sits right above the new one.
- **Why:** makes "what would have changed the call" something the reader decides before seeing the answer.

### Beat 10 · 104.5–114.5 s · The call flips

- **Start:** as beat 9 settled, with the reader's second call if made.
- **What moves:** 105.5–106.1 the frontier pulses once where it was, and "INSIDE THE FRONTIER" brightens; 109.5–109.9 a navy "CHECK IT · MAKE TIME FOR A SECOND CHECK" tag appears on the second row; 109.9–110.3 the red "YOUR CALL" fades; hold.
- **Caption:** "Same task, same side of the frontier. Now a miss gets built, so check it."
- **Branches:** as beat 8, for the second row.
- **Notice:** two rows on one card, two conditions, two suggestions. Task B still needs its check, so this one needs more time. The AI's answer stays in use, with a check.
- **Why:** risk changes the call while the task stays the same. The tag waits until the caption can be read once (5.0 s).

### Beat 11 · 114.5–124.5 s · The faculty check

- **What moves:** 114.5–114.7 caption 10 fades out; 114.7–115.3 "FACULTY CHECK" and the question rise; 119.8–120.3 directly under it, at the same size, "Change one condition and ask for the call again."; hold; the figure rests here.
- **Caption:** "Faculty check: What evidence justified relying on the system here, and what would have changed the call?" Second line, same size: "Change one condition and ask for the call again."
- **Why:** the figure ends on the check and the move. The move line waits until the check can be read once (5.0 s).

## 5. Final frame

The still at 124.5 s, on the no-call path. It is the end of play, the last step of the reduced-motion view and the second printed page. It is not the poster: the poster and the first frame are beat 3 settled, which shows the question.

**Stage:**
- **Top:** "FIELD EXPERIMENT, 2023 · 758 BCG CONSULTANTS · GPT-4" at left; "INSIDE THE FRONTIER" to the left of the jagged line, "OUTSIDE THE FRONTIER" to the right.
- **Card A, left:**
  - "TASK A" · "Segment the footwear market by user and pick the segment that matters most.", with "Segment the footwear market by user" underlined and the tag "IDEA WORK · JUDGE IT BY READING".
  - "AI'S ANSWER": grey lines on the grey band, "READY".
  - "IF IT'S A FIRST DRAFT FOR YOUR TEAM": the "Check this one" pill; "RELY ON IT"; "A CHECK HERE LEAVES TASK B UNCHECKED".
  - "IF THE COMPANY BUILDS WHAT YOU PICK": "Rely on it" and "Check it" pills; "CHECK IT · MAKE TIME FOR A SECOND CHECK".
  - "WITH AI, ACROSS TASKS INSIDE THE FRONTIER": 12.2% more tasks · 25.1% faster · 40%+ higher quality.
- **Centre:** the jagged frontier between the cards.
- **Card B, right:**
  - "TASK B" · "Use a spreadsheet and insider interviews to pick the brand a clothing company should back.", with "insider interviews" underlined and the tags "THE RIGHT ANSWER DEPENDED ON INTERVIEW DETAILS / THAT CUT AGAINST THE SPREADSHEET".
  - "AI'S ANSWER": identical to Task A's, "READY".
  - "IF IT'S A FIRST DRAFT FOR YOUR TEAM": the "Check this one" pill; "WORK IT FROM THE INTERVIEWS, THEN COMPARE".
  - "RIGHT ANSWERS ON TASK B, CHOSEN TO FALL OUTSIDE": Without AI 84.5%; With AI, two groups, 60% and 70%; bracket "Rated higher in quality, right or wrong"; "DELL'ACQUA ET AL. (2023)".
- **Bottom:** "TIME FOR ONE CHECK · A CHECK: WORK IT YOURSELF, THEN COMPARE"; at right, the navy swatch and "WHAT THE EVIDENCE SUGGESTS".

**In an interactive branch,** the same frame adds the reader's red marks (the dot in the pill they chose, "YOU RELY ON IT" on the other task, the dot in their second-row choice) and the "YOUR CALLS" key at bottom left.

**Caption band:** FACULTY CHECK / *What evidence justified relying on the system here, and what would have changed the call?* / *Change one condition and ask for the call again.* (same size)

**What the still says alone:** with time for one check, two look-alike tasks got the same finished AI answer. The study put them on opposite sides of the frontier: AI helped on the idea work, and on the pick that depended on interview details cutting against the spreadsheet, AI users were right less often while graders rated their work higher. As a first draft, the evidence suggests relying on Task A and working Task B from the interviews yourself; checking Task A would have left Task B unchecked. When the company builds what you pick, Task A needs a check too, and that means making time. The check asks for the evidence and for what would change the call, and the move under it says how to test the answer.

## 6. Standalone page copy

**Title:** Appropriate reliance

**Kicker:** The competency

**Setup:** Appropriate reliance means accepting AI support when it's warranted, checking or refusing it when it's not, and being able to say why. Checking takes time, so this figure gives you two tasks from a field experiment with 758 consultants and time to check only one. You decide where the check goes before you see what happened, and then make one more call after a condition changes. You can also let it play through without choosing.

**Figure summary, before the call** (visually hidden, at the start): An interactive figure with two task cards from a 2023 field experiment with 758 BCG consultants using GPT-4. Task A: segment the footwear market by user and pick the segment that matters most. Task B: use a spreadsheet and insider interviews to pick the brand a clothing company should back. An AI answers both in the same form, each marked ready, and both answers will go into a first draft for your team. You have time to check one task, and a check means working it yourself, then comparing with the AI's answer. You choose which task gets the check; you rely on the AI for the other. What happened follows in the beat list, after your call.

**Figure summary, after the call** (visually hidden, released with beats 4–11): A jagged line, the frontier, is drawn between the tasks: Task A inside, Task B outside. On tasks inside the frontier, consultants with AI finished 12.2% more tasks, 25.1% faster, at more than 40% higher quality. On Task B, which the study chose to fall outside, consultants without AI were right 84.5% of the time and the two groups with AI 60% and 70%, and graders rated the AI users' work higher in quality, right or wrong. Task A is marked as idea work you can judge by reading. On Task B, the right answer depended on interview details that cut against the spreadsheet. The evidence suggests relying on Task A, since a check there leaves Task B unchecked, and working Task B from the interviews yourself, then comparing. Then the company will build the segment you pick, and you decide whether to rely on Task A now. The evidence now suggests checking it and making time for a second check, because a miss would get built. The figure ends on the faculty check.

**Beat list (text equivalent).** Entries 4–9 are released at gate 1 and entries 10–11 at gate 2, or all at once with "Show all beats".

1. **These tasks come from a field experiment with 758 consultants.** *On screen:* two task cards. Task A: "Segment the footwear market by user and pick the segment that matters most." Task B: "Use a spreadsheet and insider interviews to pick the brand a clothing company should back." At top left: "Field experiment, 2023 · 758 BCG consultants · GPT-4".
2. **An AI answers both. The two answers look equally finished.** *On screen:* under each task, "AI's answer" and two grey lines of writing on a beige band. Each gets the same grey "Ready" tag at the same moment.
3. **Both are for your team's first draft. You have time to check one. Which one?** *On screen:* each card gets the line "If it's a first draft for your team" and a "Check this one" button. Along the bottom: "Time for one check. A check: work it yourself, then compare." The figure waits for your choice; you can also play on without choosing. Your choice shows as a red dot on that card, and "You rely on it" in red on the other.
4. **A jagged frontier marks where AI stops being reliable. It ran between these tasks.** *On screen:* an uneven line is drawn down between the cards, labelled "Inside the frontier" over Task A and "Outside the frontier" over Task B.
5. **On tasks inside the frontier, consultants with AI finished more tasks, faster, at higher quality.** *On screen:* on Task A's card: with AI, across tasks inside the frontier, 12.2% more tasks, 25.1% faster, more than 40% higher quality.
6. **On Task B, consultants with AI were right less often. Graders still rated their work higher.** *On screen:* the picture dims and a panel rises: right answers on Task B, chosen to fall outside. Without AI, 84.5%. With AI, two groups, 60% and 70%. A bracket under the AI bars: "Rated higher in quality, right or wrong." Source: Dell'Acqua et al. (2023). The panel settles onto Task B's card.
7. **Task A is idea work you can judge by reading. Task B turned on interview details.** *On screen:* in Task A, "Segment the footwear market by user" is underlined and marked "Idea work. Judge it by reading." In Task B, "insider interviews" is underlined and marked "The right answer depended on interview details that cut against the spreadsheet."
8. **The evidence suggests relying on Task A and working Task B yourself from the interviews.** *On screen:* a key at bottom right, "What the evidence suggests", with a navy swatch. Task A gets a navy "Rely on it" tag, with the note "A check here leaves Task B unchecked". Task B gets "Work it from the interviews, then compare". Your choice stays marked in red.
9. **Now the company will build the segment you pick. Would you rely on Task A?** *On screen:* a second line appears on Task A, under the first: "If the company builds what you pick", with two buttons, "Rely on it" and "Check it". The figure waits for your choice.
10. **Same task, same side of the frontier. Now a miss gets built, so check it.** *On screen:* the frontier pulses where it was. Task A's second line gets a navy tag: "Check it. Make time for a second check."
11. **Faculty check: What evidence justified relying on the system here, and what would have changed the call? Change one condition and ask for the call again.** *On screen:* both lines appear under the picture at the same size. Both tasks, both answers, the frontier, the evidence and every suggestion stay in view.

**Faculty check:** What evidence justified relying on the system here, and what would have changed the call?
**Change one condition and ask for the call again.** (same size)

A good answer says where the checks went and why. Task A is idea work you can judge by reading, and the study found it inside the frontier, so as a first draft it can go without a check. Task B looked the same, but its right answer depended on interview details that cut against the spreadsheet, and graders rated the AI users' work higher whether or not it was right, so reading the answer wouldn't show a miss. That's where the one check belongs, and it starts from the interviews. When the company builds what you pick, a miss on Task A gets built, so it needs a check too, and the time to do it. A student who checked everything hasn't shown that judgment, and neither has one who checked nothing. Changing one condition and asking again shows whether the student has a reason for the call.

**From the essay:** Section V, the trust and reliance paragraph, with its citation (Raees & Papangelis, 2026), and the jagged frontier paragraph ending "what independent checks are required before the output governs the work."

**Evidence:** Dell'Acqua et al., [Navigating the Jagged Technological Frontier](https://www.hbs.edu/faculty/Pages/item.aspx?num=64700), HBS working paper 24-013 (2023). In the field experiment, 758 BCG consultants using GPT-4 finished 12.2% more tasks, 25.1% faster and at more than 40% higher quality on tasks inside the frontier. On a task chosen to fall outside it, consultants without AI were right about 84.5% of the time and the two AI groups 60% and 70%: in the working paper's words, "19 percentage points less likely to produce correct solutions." Graders still rated the AI users' recommendations higher in quality "regardless of the correctness of their answer."

**About the tasks** (from the working paper, not the source spine): the inside-the-frontier tasks were product-development work for a new shoe, including segmenting the footwear market by user. In the task chosen to fall outside, consultants used a spreadsheet of company data and interviews with company insiders to recommend which brand the company should focus on. The right answer depended on details in the interviews that cut against what the spreadsheet suggested. The two AI groups differed in whether they also got a short overview of prompting. The task wording on screen is paraphrased. The study compared consultants with and without AI. It didn't test checking, a time budget, or what the work was for, so the suggestions on screen are reasoning from these results. The frontier moves as models change; this is where it sat in 2023, with GPT-4.

**Links:** See the failure: Uncalibrated reliance (`../uncalibrated-reliance/`); Book chapter: Calibrate the tool (`../../book-v0/four-moves-book.html?spread=3`); Practice (`https://judgmentlab.net/#companion`); Essay Section V (`https://judgmentlab.net/#v-appropriate-reliance-as-a-teachable-competency`).

## 7. Pacing table

Reading is caption words plus new picture words, ÷ 3; words repeated identically on both cards count once. Every beat is at least that long, at least twice its caption's reading time, and holds at least 1.5 s after its last movement. Times are on the no-call path.

| Beat | Time (s) | Caption words | Picture words | Reading (s) | Lead (s) | Motion (s) | Hold (s) | Total (s) | Gate |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · Two tasks | 0.0–16.5 | 10 | 39 | 16.3 | 1.0 | 6.9 | 8.6 | 16.5 | |
| 2 · The AI answers both | 16.5–23.5 | 10 | 3 | 4.3 | 1.0 | 2.8 | 3.2 | 7.0 | |
| 3 · One check | 23.5–36.5 | 15 | 24 | 13.0 | 1.0 | 5.3 | 6.7 | 13.0 | Pauses at 29.8; resumes from 35.0 |
| 4 · The jagged frontier | 36.5–46.0 | 14 | 6 | 6.7 | 1.0 | 2.0 | 6.5 | 9.5 | |
| 5 · Inside the frontier | 46.0–56.0 | 15 | 15 | 10.0 | 1.0 | 5.6 | 3.4 | 10.0 | |
| 6 · Outside the frontier | 56.0–71.0 | 16 | 29 | 15.0 | 1.0 | 11.5 | 2.5 | 15.0 | |
| 7 · What each rested on | 71.0–82.5 | 16 | 18 | 11.3 | 1.0 | 6.0 | 4.5 | 11.5 | |
| 8 · What the evidence suggests | 82.5–94.5 | 15 | 21 | 12.0 | 1.0 | 5.5 | 5.5 | 12.0 | |
| 9 · One thing changes | 94.5–104.5 | 15 | 12 | 9.0 | 1.0 | 2.4 | 6.6 | 10.0 | Pauses at 99.5; resumes from 103.0 |
| 10 · The call flips | 104.5–114.5 | 15 | 8 | 7.7 | 1.0 | 4.8 | 4.2 | 10.0 | |
| 11 · Faculty check | 114.5–124.5 | 15 + 9 | 0 | 8.0 | 0.0 | 5.8 | 4.2 | 10.0, then rests | |
| **Total** | | **165** | **175** | | | | | **124.5** | |

Picture words per beat: 1, the tags, both tasks and the source line; 2, "AI'S ANSWER" and "READY"; 3, the condition, the budget and definition, "Check this one" and "YOUR CALL"; 4, the frontier labels; 5, the slot title, numbers and labels; 6, the panel title, row labels, values, bracket and source; 7, the three pattern tags; 8, the key, three tags and the note ("YOUR CALLS" adds two in a branch); 9, the new condition and two pills; 10, the new tag.

Checks:
- Changes a caption names wait until it can be read once: the "READY" pills (beat 2, 3.4 s in), the budget (beat 3, 5.0 s), the numbers (beat 5, 5.0 s), the bracket (beat 6, 5.4 s), Task B's pattern mark (beat 7, 5.4 s), Task B's tag (beat 8, 5.5 s), the second-row tag (beat 10, 5.0 s), the move line (beat 11, 5.0 s after the check).
- Lead-ins described by the caption's first or main clause: the first-draft condition (beat 3), the frontier line (beat 4), the slot title (beat 5), Task A's pattern mark (beat 7), the key and Task A's tag (beat 8, after "relying on Task A"), the second-row condition (beat 9), the frontier's pulse (beat 10).
- Nothing shows a side, a reason or a suggestion before the reader's call at either gate, in any view.
- Task B's panel holds 5.0 s at full size before it settles. Every hold is at least 1.5 s; one movement at a time; no camera moves. The scene dims once, for Task B's panel.
- **Interactive path:** the gates skip the 5.2 s and 3.5 s holds that follow them, so the figure plays 115.8 s plus the reader's decision time.
- **Cut from round 1:** 9.0 s (133.5 to 124.5): beat 5's panel, beat 9's large condition and beat 4's pulse, plus shorter captions, against new words for the budget, the definition of a check and the reason.
- **Phone:** the stacked stage and the caption band have fixed heights, so the caption and controls stay put through the whole run; target 844 px tall at 390 px wide, final frame included.
