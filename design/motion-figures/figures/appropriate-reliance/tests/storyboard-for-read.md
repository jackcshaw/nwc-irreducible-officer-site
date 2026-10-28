# Appropriate reliance: storyboard

Motion figure 8 of 8 · slug `appropriate-reliance` · storyboard round 3, revised after storyboard cold read 2 and the working-paper check · October 28, 2026
*Cold-read copy. The Intent section is removed.*

## 2. Scenario

You have time to check one of two tasks from Dell'Acqua et al.'s 2023 field experiment with BCG consultants. Task A: segment the footwear industry market based on users. Task B: use a spreadsheet and insider interviews to pick the brand a clothing firm should back. An AI gives both answers in the same finished form, and both will go into your team's first draft. A check means working the task yourself, then comparing with the AI's answer. You choose which task gets your one check, and you rely on the AI for the other. Then the frontier is drawn between the tasks, the study's results split them, and the figure shows what set the tasks apart and the suggested call. Then one condition changes: your segmentation goes straight into the launch plan. You choose to rely on Task A, move your check to it, or ask for time to check both, and the figure shows the suggested call and what moving the check costs. The figure ends on the faculty check.

*Sources.* Task A's wording is the paper's ("Segment the footwear industry market based on users", one of 18 product-development tasks for a fictional footwear company). Task B paraphrases the paper's Appendix A (a CEO choosing one of the company's brands to invest in, with a spreadsheet of financial data and interviews with company insiders). "The deciding details were in the interviews; the spreadsheet only looked complete" follows section 3.2 ("While the spreadsheet data alone was designed to seem to be comprehensive, a careful review of the interview notes revealed crucial details"). The study figures are from the source spine's Jagged Frontier entry (Dell'Acqua et al., 2023, HBS working paper 24-013): inside the frontier, consultants with AI finished 12.2% more tasks, 25.1% faster and at more than 40% higher quality; on a task chosen to fall outside it, consultants without AI were right about 84.5% of the time and the two AI groups 60% and 70%, and graders still rated the AI users' recommendations higher in quality "regardless of the correctness of their answer". The check in `BCG-VERIFY.md` confirms each against the working paper. The AI's answers are drawn as lines, not text. The conditions (a first draft for your team, time for one check, the launch plan) are added for the exercise. *The Irreducible Officer*, Section V, defines trust, reliance and appropriate reliance, and describes the jagged frontier and pattern recognition across task types.

## 3. Cast and grammar

**The colour rule.** Grey is what the AI supplied: its two answers, their "AI'S ANSWER" labels and their "READY" pills. Red is the reader: the red dot in the option they chose, "You rely on it" on the task they didn't check, the "Your call" labels during a gate, and the "YOUR CALLS" key. Navy ink is the page: the tasks, the conditions, the budget, the option pills, the frontier, the pattern tags, the evidence, the suggested calls and their key.

**Palette.** Paper `#f6f1e8`, paper-bright `#fffdfa`, ink `#0a2242`, machine grey `#5b564f` with a `#ded5c4` band behind AI-supplied work, red `#b81b2b`. Type: Source Serif 4 for the tasks, numbers and captions; Source Sans 3 for pills, person labels and evidence labels; IBM Plex Mono for small labels, at 13 units.

**Stage.** An SVG with a 960 × 540 viewBox. One view, no camera moves.
- *Top band* (y 0–46): the source line at left (y 18), then the frontier's two labels (y 40).
- *Two cards* (y 48–476): Task A at left (x 24–456), Task B at right (x 504–936). The frontier is drawn in the 48-unit gap.
- *Bottom band* (y 480–540): the budget and the definition of a check (y 498); the keys (y 526).
- *Centre stage* (beat 5 only): Task B's evidence, enlarged over the dimmed scene.

Positions inside a card are given for Task A (x0 = 24); Task B's are the same with x0 = 504.

| Element | Stands for | How it looks | Where |
| --- | --- | --- | --- |
| Source line | Where and when | Mono 13 ink "DELL'ACQUA ET AL. · FIELD EXPERIMENT, 2023 · 758 BCG CONSULTANTS · SOME WITH GPT-4" | Left-aligned (24, 18) |
| Task cards | The two tasks | Paper-bright, 15% hairline ink border | y 48–476 |
| Task tags | Names the tasks | Mono 13 ink "TASK A", "TASK B" | (x0+16, 68) |
| Task text | What each task asks | Serif 18 ink. A: "Segment the footwear industry market" / "based on users." B: "Use a spreadsheet and insider interviews to" / "pick the brand a clothing firm should back." | Baselines 92 and 114 |
| AI's answer | What the AI gives back | Mono 13 grey "AI'S ANSWER"; a `#ded5c4` band with two grey lines (lengths 384 and 236); identical on both cards | Label (x0+16, 172); band y 180–200 |
| "READY" pill | The tool presents it as finished | Filled grey pill, paper mono 13 "READY" | x0+344 to x0+416, y 160–176 |
| Condition, row 1 | What the answers are for | Mono 13 ink "IF IT'S YOUR TEAM'S FIRST DRAFT" on both cards | (x0+16, 220) |
| "Check this one" pill | Where the one check can go | Paper pill, rounded 13, hairline ink; an empty radio (r 6.5) at left; Sans 600 13 ink | x0+16 to x0+176, y 228–254 |
| Budget and definition | What a check costs and is | Mono 13 ink, centred: "TIME FOR ONE CHECK · A CHECK: WORK IT YOURSELF, THEN COMPARE" | (480, 498) |
| "Your call" | Names the reader during a gate | Red Sans 600 13, right-aligned on the open row's label line, until that row's suggestion appears | (x0+416, 220); row 2 (440, 316) |
| Reader's choice | The option the reader chose | A solid red dot (r 4.5) in its radio; the pill's outline thickens | In the pill |
| "You rely on it" | What the reader didn't check | Red Sans 600 13 beside the other card's pill | (x0+192, 246) |
| Condition, row 2 | The changed condition | Mono 13 ink "IF IT GOES STRAIGHT INTO THE LAUNCH PLAN" | (40, 316), card A only |
| Pills, row 2 | The call again | "Rely on it" (x 40–134) and "Move my check here" (x 142–288) on one line, y 324–348; "Ask for time to check both" (x 40–232) below, y 352–376. A reader whose check is on Task A sees "Keep my check here" | Card A only |
| Jagged frontier | The uneven edge of where an AI is reliable | Irregular navy line, stroke 1.8, drawn top to bottom between the cards only; mono 13 "INSIDE THE FRONTIER" (right-aligned at x 456) and "OUTSIDE THE FRONTIER" (from x 504) | Line within x 466–494, y 52–470 |
| Evidence rules | Separate the evidence from the calls | A 15% ink hairline above each card's evidence slot, appearing with its evidence | A y 423; B y 302 |
| Inside evidence | The study, inside the frontier | In card A's slot: mono "WITH AI, ACROSS TASKS INSIDE THE FRONTIER"; Serif 600 20 "12.2%", "25.1%", "40%+" over Sans 13 "more tasks", "faster", "higher quality" | Title y 436; numbers y 456; labels y 469; columns x 40, 176, 312 |
| Dimmed scene | Attention moves to centre | Everything but Task B's evidence drops to 25% | Beat 5 |
| Outside evidence | The study, on Task B | Mono "RIGHT ANSWERS ON TASK B"; Sans 14 "Without AI" with one bar ("84.5%"), "With AI" over mono "TWO GROUPS" with two bars ("60%", "70%"); bars 14 high, ink 85%, 2.8 units a point; a navy bracket under the AI bars with Serif italic 15 "Rated higher in quality, right or wrong". First at 1.5× centre stage on a paper-bright panel, then settled into card B's slot | Slot: title y 316; bars from x 620 at y 329, 357, 375; bracket y 400; text centred (718, 418) |
| Pattern tags | What set the tasks apart | Navy mono 13 under the task text. A: "NO HIDDEN FACT · READING SHOWS A WEAK ANSWER". B: a navy underline under "insider interviews", then "THE DECIDING DETAILS WERE IN THE INTERVIEWS" and "THE SPREADSHEET ONLY LOOKED COMPLETE" | (x0+16, 136) and (x0+16, 151) |
| Suggested calls | What the evidence and the condition suggest | Filled navy tags, paper mono 13. A row 1: "RELY ON IT". B row 1: "WORK IT FROM THE INTERVIEWS, THEN COMPARE". A row 2: "MOVE YOUR CHECK HERE, OR ASK FOR TIME FOR BOTH" | Row 1 y 262–279; row 2 y 384–401 |
| Cost notes | What a choice costs | Mono 13 ink. A row 1: "A CHECK HERE LEAVES TASK B UNCHECKED". A row 2: "MOVING IT LEAVES TASK B'S DRAFT UNCHECKED" | (40, 294); (40, 416) |
| Keys | What red and navy tags mean | Left: a red dot (r 5) and red mono "YOUR CALLS", only when the reader made a call. Right: a navy swatch and mono "SUGGESTED CALL" | (24, 526); right-aligned (936, 526) |
| Caption band | The words for each beat | Runtime caption; at a gate, **Continue** and **Skip this question** sit at its bottom right | Under the stage |
| Beat list | Text equivalent | Ten captions with "On screen" lines, released gate by gate | Under the controls |

**Suggested calls and costs.** The same for every reader.

| Row | Suggested call | Cost note |
| --- | --- | --- |
| Task A · if it's your team's first draft | RELY ON IT | A CHECK HERE LEAVES TASK B UNCHECKED |
| Task B · if it's your team's first draft | WORK IT FROM THE INTERVIEWS, THEN COMPARE | |
| Task A · if it goes straight into the launch plan | MOVE YOUR CHECK HERE, OR ASK FOR TIME FOR BOTH | MOVING IT LEAVES TASK B'S DRAFT UNCHECKED |

**Branches.**

| Gate | Reader's call | Red marks | After the reveal |
| --- | --- | --- | --- |
| 1 | Task A | Red dot in Task A's pill; "You rely on it" beside Task B's | Task A's "RELY ON IT" and its cost note sit beside the reader's dot; Task B's suggestion sits beside "You rely on it" and the bars |
| 1 | Task B | Red dot in Task B's pill; "You rely on it" beside Task A's | Both suggestions match |
| 1 | No call | None | Suggestions only |
| 2 | Rely on it | Red dot | Beside the suggestion and the caption "Now a miss goes into the launch" |
| 2 | Move (or keep) my check here | Red dot | Matches half the suggestion; the cost note applies |
| 2 | Ask for time to check both | Red dot | Matches half the suggestion |
| 2 | No call | None | Suggestion only |

**Interaction.**
- *Controls.* At a gate, the options in the picture become real radio buttons: invisible labels laid over each drawn pill (or each chip in the stacked stage), with a visible focus ring. Gate 1 is one group, "Your one check goes to", options "Task A" and "Task B". Gate 2 is one group, "If your segmentation goes straight into the launch plan, Task A", with three options. Arrow keys move within a group. **Continue** (enabled once the open question has a call) and **Skip this question** sit at the bottom right of the caption band.
- *Gates.* Playback stops when the question is fully on screen. Continue or Skip jumps to 1.5 s before the beat ends (only a hold remains) and plays. Play at a gate does the same as Continue if a call is made, otherwise Skip. Skip this question passes only the open gate.
- *Scrubbing.* The scrubber can move past a gate; a gate without a call renders as no call. Moving back before a gate re-arms it, with the earlier call in place.
- *Start over.* Clears every call and plays from 0.
- *Screen readers.* The SVG and the caption band are `aria-hidden`; the radio groups and buttons are not. A polite live region announces each question when its gate opens, and after each reveal the suggested call and the reader's call.
- *Question before answer.*
  - *Poster and first frame* (the in-page waiting frame and the social card): the gate-1 question, settled.
  - *Reduced motion:* opens on the gate-1 question, with its controls live and beats 1–3 in the beat list. Continue (or Skip) shows the gate-2 question settled, with every round-1 result, and releases beats 4–8. A second Continue shows the final frame and releases beats 9–10.
  - *Beat list:* entries after a gate appear once the playhead passes it, or with "Show all beats".
  - *Hidden summary:* the first part describes the setup and the question; the second appears with beats 4–10.
  - *Page copy:* the "A good answer…" paragraph, the Evidence block and "About the tasks" sit in a disclosure, "After you make your call", which opens itself when the figure reaches its check.
  - *Print:* the gate-1 question, then a page break, the final frame (with any calls), the beat list and the opened disclosure.
  - *Preview video:* the no-call path. Each gate holds its full length.

**Narrow screens.** Picture text is at least 13 units, so the drawn stage keeps its labels down to a letterboxed scale of 0.846, which covers 1280 × 720. Below that, `syncStacked` collapses the SVG and a stacked stage, driven by the same clock and calls, takes its place. Its layout is fixed from the first frame, and parts only fade in:
- The source line on top; the two tasks as side-by-side columns with the jagged line down the gutter and the frontier labels over each column.
- Each column: tag; task text (Serif 14); pattern tags (mono 13); "AI's answer · Ready" chip with two grey lines; the row-1 label; a "Check this one" chip (with "You rely on it" in red under the other column's); the suggested call and note; on Task A the row-2 label and three chips, its suggestion and note; then the evidence.
- The budget, definition and keys run under both columns. Task B's centre-stage panel is an overlay on the dimmed stacked stage.
- The stage holds its tallest height (measured per width), and the caption band is a fixed 166 px with the check at 20 px, so the controls don't move.

## 4. Beats

Times are absolute seconds on the no-call path. In every beat the caption changes first (0.3 s fade) and nothing in the picture moves for the first second. A change the caption is about starts only after the caption can be read once, except a lead-in that the caption's first or main clause describes. Each beat holds its caption plus new picture words at 3 words a second or less; words repeated identically on both cards count once.

### Beat 1 · 0.0–15.0 s · Two tasks

- **Start:** an empty paper stage.
- **What moves:** 1.0–1.6 card A fades in and rises 6 units, with "TASK A"; 1.6–2.2 its two lines; 2.4–2.8 the source line at top left; 4.0–4.6 card B fades in and rises, with "TASK B"; 4.6–5.4 its two lines; hold.
- **Caption:** "Two tasks from one study."
- **Notice:** two realistic consulting tasks. Task B names its materials; Task A doesn't. The source line says 2023, 758 BCG consultants, some with GPT-4.
- **Why:** the setup, before anything is asked.

### Beat 2 · 15.0–21.7 s · The AI answers both

- **What moves:** 16.0–16.4 "AI'S ANSWER" and an empty grey band on both cards; 16.4–17.2 two grey lines write into both bands at once; 18.4–18.8 a grey "READY" pill drops onto both at the same moment; hold.
- **Caption:** "An AI answers both. The two answers look equally finished."
- **Notice:** same form, same length, same tag, same moment.
- **Why:** the felt signal is the same for both, so it can't decide where the check goes.

### Beat 3 · 21.7–31.7 s · One check (gate 1)

- **What moves:** 22.7–23.1 the bottom band fades in, "TIME FOR ONE CHECK · A CHECK: WORK IT YOURSELF, THEN COMPARE"; 24.4–24.8 "IF IT'S YOUR TEAM'S FIRST DRAFT" on both cards; 25.0–25.5 a "Check this one" pill on each card, with a red "Your call" on each row's label line.
- **Gate:** at 25.5, playback stops until Continue or Skip; it resumes from 30.2. On the no-call path the beat holds to 31.7. This moment is the poster and first frame.
- **Caption:** "You have time to check one. Which one?"
- **Branches:** Task A, Task B or no call. A call puts a red dot in that card's pill and "You rely on it" beside the other card's pill. Nothing shows a side, a reason or a suggestion.
- **Notice:** the condition is the same for both, and a check is defined before anyone spends it. Choosing one task means relying on the other.
- **Why:** predict before reveal, with a cost.

### Beat 4 · 31.7–43.7 s · The frontier, and inside it

- **What moves:** 32.7–34.3 an irregular navy line draws down between the cards; 34.3–34.7 "INSIDE THE FRONTIER" over card A, "OUTSIDE THE FRONTIER" over card B; 36.7–37.1 "WITH AI, ACROSS TASKS INSIDE THE FRONTIER" fades into card A's slot; 37.5–37.9 "12.2% more tasks"; 38.1–38.5 "25.1% faster"; 38.7–39.1 "40%+ higher quality"; hold.
- **Caption:** "A jagged frontier marks where an AI stops being reliable. Inside this one, AI helped."
- **Notice:** Task A is inside, Task B outside, and the reader's red marks stay where they were. The numbers are across the inside tasks.
- **Why:** defines the frontier, then gives the evidence for relying on Task A. The numbers wait until the caption can be read once (5.0 s).

### Beat 5 · 43.7–56.2 s · Outside the frontier

- **What moves:** 44.7–45.2 the scene dims to 25%; 45.2–45.8 a paper-bright panel rises centre stage with Task B's evidence at 1.5×: "RIGHT ANSWERS ON TASK B", "Without AI", "With AI · TWO GROUPS"; 47.1–47.7 the "Without AI" bar grows to 84.5%; 47.9–48.5 the two "With AI" bars grow to 60% and 70%; 49.1–49.6 a navy bracket draws under the AI bars; 49.6–50.0 "Rated higher in quality, right or wrong"; the panel holds 3.5 s; 53.5–54.7 it shrinks into card B's slot as the scene returns; hold.
- **Caption:** "On Task B, consultants with AI were right less often. Graders still rated their work higher."
- **Notice:** both AI groups fall short of the group without AI, and the bracket sits on the shorter bars.
- **Why:** the surprise, centre stage. The bars wait for the first sentence (3.4 s), the bracket for the whole caption (5.4 s).

### Beat 6 · 56.2–67.2 s · What set them apart

- **What moves:** 57.2–57.8 "NO HIDDEN FACT · READING SHOWS A WEAK ANSWER" appears under Task A's text; 60.6–61.2 a navy underline runs under "insider interviews" in Task B, and "THE DECIDING DETAILS WERE IN THE INTERVIEWS" appears; 61.4–61.8 "THE SPREADSHEET ONLY LOOKED COMPLETE" below it; hold.
- **Caption:** "Task A had no hidden fact. Task B had one, in the interviews."
- **Notice:** this difference was true before the call. Reading is a fair test of Task A, so graders' quality ratings support relying on it; on Task B reading couldn't show the deciding details, so the same ratings missed wrong answers.
- **Why:** the pattern that travels: does the right answer depend on something a fluent answer could miss? Task B's tag waits until the caption can be read once (4.4 s).

### Beat 7 · 67.2–78.7 s · The suggested call

- **What moves:** 68.2–68.6 the key "SUGGESTED CALL" appears at bottom right; 68.8–69.2 the row-1 pills the reader didn't choose fade to 40% (both, on the no-call path); 69.7–70.1 a navy "RELY ON IT" tag on Task A; 70.5–70.9 "A CHECK HERE LEAVES TASK B UNCHECKED" under it; 72.2–72.6 a navy "WORK IT FROM THE INTERVIEWS, THEN COMPARE" tag on Task B; 72.8–73.2 the red "Your call" labels fade, and the "YOUR CALLS" key appears if the reader made a call; hold.
- **Caption:** "The evidence suggests relying on Task A and working Task B yourself from the interviews."
- **Branches:** the tags are the same for everyone; the reader's dot and "You rely on it" sit beside them.
- **Notice:** relying on Task A is what frees the check for Task B. On Task B the check starts from the interviews, before the AI's answer can anchor it.
- **Why:** warranted acceptance gets its own result. Task A's tag starts after "relying on Task A" (2.5 s); Task B's after the whole caption (5.0 s).

### Beat 8 · 78.7–90.2 s · One thing changes (gate 2)

- **What moves:** 79.7–80.1 "IF IT GOES STRAIGHT INTO THE LAUNCH PLAN" fades in as a second row on card A; 83.0–83.5 three pills fade in on that row, "Rely on it", "Move my check here" (or "Keep my check here") and "Ask for time to check both", with a red "Your call".
- **Gate:** at 83.5, playback stops until Continue or Skip; it resumes from 88.7. On the no-call path the beat holds to 90.2.
- **Caption:** "Now your segmentation goes straight into the launch plan. What about Task A?"
- **Branches:** one of three calls, or none.
- **Notice:** the task, the AI's answer, the frontier and the evidence haven't changed. Only the condition has, and the budget still says one check.
- **Why:** "what would have changed the call", decided before it's answered.

### Beat 9 · 90.2–100.7 s · The call changes

- **What moves:** 91.2–91.6 the row-2 pills the reader didn't choose fade to 40%; 94.9–95.3 a navy "MOVE YOUR CHECK HERE, OR ASK FOR TIME FOR BOTH" tag on row 2; 95.7–96.1 "MOVING IT LEAVES TASK B'S DRAFT UNCHECKED" under it; 96.3–96.7 the red "Your call" fades; hold.
- **Caption:** "Same task, same side of the frontier. Now a miss goes into the launch."
- **Branches:** as beat 7, for row 2.
- **Notice:** two conditions on one card, two suggested calls. Either suggested move keeps the budget honest: move the one check, or ask for more time. The AI's answer stays in use, with a check.
- **Why:** risk changes the call while the task stays the same. The tag waits until the caption can be read once (4.7 s).

### Beat 10 · 100.7–110.4 s · The faculty check

- **What moves:** 100.7–100.9 caption 9 fades out; 100.9–101.5 "FACULTY CHECK" and the question rise; 105.9–106.4 directly under it, at the same size, "Change one condition and ask for the call again."; hold; the figure rests here.
- **Caption:** "Faculty check: What evidence justified relying on the system here, and what would have changed the call?" Second line, same size: "Change one condition and ask for the call again."
- **Why:** the figure ends on the check and the move. The move waits until the check can be read once (5.0 s).

## 5. Final frame

The still at 110.4 s, on the no-call path: the end of play, the last step of reduced motion and the second printed page. The poster and first frame are the gate-1 question (25.5 s).

**Stage:**
- **Top:** "DELL'ACQUA ET AL. · FIELD EXPERIMENT, 2023 · 758 BCG CONSULTANTS · SOME WITH GPT-4"; "INSIDE THE FRONTIER" and "OUTSIDE THE FRONTIER" either side of the jagged line.
- **Card A:** "TASK A" · "Segment the footwear industry market based on users." · "NO HIDDEN FACT · READING SHOWS A WEAK ANSWER" · "AI'S ANSWER" with "READY" · "IF IT'S YOUR TEAM'S FIRST DRAFT": the "Check this one" pill at 40%, "RELY ON IT", "A CHECK HERE LEAVES TASK B UNCHECKED" · "IF IT GOES STRAIGHT INTO THE LAUNCH PLAN": three pills at 40%, "MOVE YOUR CHECK HERE, OR ASK FOR TIME FOR BOTH", "MOVING IT LEAVES TASK B'S DRAFT UNCHECKED" · "WITH AI, ACROSS TASKS INSIDE THE FRONTIER": 12.2% more tasks, 25.1% faster, 40%+ higher quality.
- **Card B:** "TASK B" · "Use a spreadsheet and insider interviews to pick the brand a clothing firm should back.", with "insider interviews" underlined · "THE DECIDING DETAILS WERE IN THE INTERVIEWS / THE SPREADSHEET ONLY LOOKED COMPLETE" · "AI'S ANSWER" with "READY" · "IF IT'S YOUR TEAM'S FIRST DRAFT": the "Check this one" pill at 40%, "WORK IT FROM THE INTERVIEWS, THEN COMPARE" · "RIGHT ANSWERS ON TASK B": Without AI 84.5%; With AI, two groups, 60% and 70%; "Rated higher in quality, right or wrong".
- **Bottom:** "TIME FOR ONE CHECK · A CHECK: WORK IT YOURSELF, THEN COMPARE"; at right, the navy swatch and "SUGGESTED CALL".
- **In a branch:** the reader's chosen pills stay at full strength with their red dots, "You rely on it" on the task they didn't check, and the "YOUR CALLS" key at bottom left.

**Caption band:** FACULTY CHECK / *What evidence justified relying on the system here, and what would have changed the call?* / *Change one condition and ask for the call again.* (same size)

**What the still says alone:** with time for one check, two tasks got the same finished AI answer. The study put them on opposite sides of the frontier: AI helped on the segmentation, which had no hidden fact; on the brand pick, whose deciding details were in the interviews, AI users were right less often while graders rated their work higher. For a first draft, the suggested call is to rely on Task A and work Task B from the interviews. When the segmentation goes straight into the launch plan, the suggestion is to move the check there or ask for time for both, and the cost of moving it is written beside it.

## 6. Standalone page copy

**Title:** Appropriate reliance

**Kicker:** The competency

**Setup:** Appropriate reliance means accepting AI support when it's warranted, checking or refusing it when it's not, and being able to say why. Checking takes time, so this figure gives you two tasks from a 2023 field experiment and time to check only one. You decide where the check goes before you see what happened, then make one more call after a condition changes. You can also skip either question and let it play.

**Figure summary, before the call** (visually hidden): An interactive figure with two tasks from a 2023 field experiment with BCG consultants. Task A: segment the footwear industry market based on users. Task B: use a spreadsheet and insider interviews to pick the brand a clothing firm should back. An AI answers both in the same form, each marked ready, and both answers will go into your team's first draft. You have time to check one task; a check means working it yourself, then comparing with the AI's answer. You choose which task gets the check and rely on the AI for the other. What happened follows in the beat list after your call.

**Figure summary, after the call** (visually hidden, released with beats 4–10): A jagged line, the frontier, is drawn between the tasks: Task A inside, Task B outside. On tasks inside the frontier, consultants with AI finished 12.2% more tasks, 25.1% faster, at more than 40% higher quality. On Task B, consultants without AI were right 84.5% of the time and the two groups with AI 60% and 70%, and graders rated the AI users' work higher in quality, right or wrong. Task A had no hidden fact, so reading shows a weak answer. Task B's deciding details were in the interviews; the spreadsheet only looked complete. The suggested call is to rely on Task A, since a check there leaves Task B unchecked, and to work Task B from the interviews yourself, then compare. Then your segmentation goes straight into the launch plan, and you choose again for Task A: rely on it, move your check to it, or ask for time to check both. The suggested call is to move your check there or ask for time for both, because a miss now goes into the launch; moving it leaves Task B's draft unchecked. The figure ends on the faculty check.

**Beat list (text equivalent).** Entries 4–8 are released at gate 1 and entries 9–10 at gate 2, or all at once with "Show all beats".

1. **Two tasks from one study.** *On screen:* two task cards. Task A: "Segment the footwear industry market based on users." Task B: "Use a spreadsheet and insider interviews to pick the brand a clothing firm should back." At top left: "Dell'Acqua et al. · Field experiment, 2023 · 758 BCG consultants · some with GPT-4".
2. **An AI answers both. The two answers look equally finished.** *On screen:* under each task, "AI's answer" and two grey lines of writing on a beige band. Each gets the same grey "Ready" tag at the same moment.
3. **You have time to check one. Which one?** *On screen:* along the bottom, "Time for one check. A check: work it yourself, then compare." Each card gets the line "If it's your team's first draft" and a "Check this one" button. The figure waits for your choice. Your choice shows as a red dot on that card, and "You rely on it" in red on the other.
4. **A jagged frontier marks where an AI stops being reliable. Inside this one, AI helped.** *On screen:* an uneven line is drawn down between the cards, labelled "Inside the frontier" over Task A and "Outside the frontier" over Task B. On Task A's card: with AI, across tasks inside the frontier, 12.2% more tasks, 25.1% faster, more than 40% higher quality.
5. **On Task B, consultants with AI were right less often. Graders still rated their work higher.** *On screen:* the picture dims and a panel rises: right answers on Task B. Without AI, 84.5%. With AI, two groups, 60% and 70%. A bracket under the AI bars: "Rated higher in quality, right or wrong." The panel settles onto Task B's card.
6. **Task A had no hidden fact. Task B had one, in the interviews.** *On screen:* under Task A: "No hidden fact. Reading shows a weak answer." In Task B, "insider interviews" is underlined, with "The deciding details were in the interviews. The spreadsheet only looked complete."
7. **The evidence suggests relying on Task A and working Task B yourself from the interviews.** *On screen:* a key at bottom right, "Suggested call". The options you didn't choose fade. Task A gets a navy "Rely on it" tag, with the note "A check here leaves Task B unchecked". Task B gets "Work it from the interviews, then compare". Your choice stays in red.
8. **Now your segmentation goes straight into the launch plan. What about Task A?** *On screen:* a second line appears on Task A: "If it goes straight into the launch plan", with three buttons: "Rely on it", "Move my check here" and "Ask for time to check both". The figure waits for your choice.
9. **Same task, same side of the frontier. Now a miss goes into the launch.** *On screen:* the options you didn't choose fade. Task A's second line gets a navy tag, "Move your check here, or ask for time for both", with the note "Moving it leaves Task B's draft unchecked".
10. **Faculty check: What evidence justified relying on the system here, and what would have changed the call? Change one condition and ask for the call again.** *On screen:* both lines under the picture at the same size. Both tasks, both answers, the frontier, the evidence and every suggested call stay in view.

**Faculty check** (visible): What evidence justified relying on the system here, and what would have changed the call? / **Change one condition and ask for the call again.** (same size)

**Disclosure: "After you make your call"** (closed until the figure reaches its check, or the reader opens it):

*What a good answer says.* A good answer says where the check went and why. Task A had no hidden fact: a weak segmentation shows when you read it, which is why graders' quality ratings are a fair guide there, and the study found it inside the frontier. As a first draft, it can go without a check. Task B looked just as finished, but its deciding details were in the interviews, and the spreadsheet only looked complete. Graders rated the AI users' recommendations higher whether or not they were right, so reading the answer wouldn't show a miss. That's where the one check belongs, and it starts from the interviews. When the segmentation goes straight into the launch plan, a miss there goes into the launch, so the check moves to Task A or the student asks for time to check both, and can say what moving it costs. Changing one condition and asking again shows whether the student has a reason for the call.

*Evidence.* Dell'Acqua et al., [Navigating the Jagged Technological Frontier](https://www.hbs.edu/faculty/Pages/item.aspx?num=64700), HBS working paper 24-013 (2023). In the field experiment, 758 BCG consultants were split between two sets of tasks and randomly assigned to work without AI, with GPT-4, or with GPT-4 plus a prompt-engineering overview. On the tasks inside the frontier, consultants with AI finished 12.2% more tasks, 25.1% faster and at more than 40% higher quality. On the task chosen to fall outside it, consultants without AI were right about 84.5% of the time and the two AI groups 60% and 70%: in the working paper's words, "19 percentage points less likely to produce correct solutions." Graders still rated the AI users' recommendations higher in quality "regardless of the correctness of their answer."

*About the tasks* (from the working paper; being added to the source spine): the tasks inside the frontier were 18 product-development questions for a fictional footwear company. Consultants generated ideas for a new shoe, segmented the market by users, listed the steps to launch it, and wrote a press release and a memo to employees. On the task built to fall outside the frontier, consultants told a fictional clothing company's CEO which of its brands to invest in, working from a spreadsheet of financial data and interviews with company insiders. The spreadsheet was designed to look complete, but the deciding details were in the interviews, and the authors designed the task so that GPT-4 would get it wrong. Both AI groups used GPT-4; one also got a short prompt-engineering overview, and on the outside task it did worse (60% against 70.6%). The study didn't test checking, a time budget, or what the work was for, so the suggested calls are reasoning from these results. The frontier moves as models change; this is where it sat in 2023, with GPT-4.

**From the essay** (visible): Section V, the trust and reliance paragraph, with its citation (Raees & Papangelis, 2026), and the jagged frontier paragraph ending "what independent checks are required before the output governs the work."

**Links:** See the failure: Uncalibrated reliance (`../uncalibrated-reliance/`); Book chapter: Calibrate the tool (`../../book-v0/four-moves-book.html?spread=3`); Practice (`https://judgmentlab.net/#companion`); Essay Section V (`https://judgmentlab.net/#v-appropriate-reliance-as-a-teachable-competency`).

## 7. Pacing table

Reading is caption words plus new picture words, ÷ 3; words repeated identically on both cards count once. Every beat is at least that long, at least twice its caption's reading time, and holds at least 1.5 s after its last movement. Times are on the no-call path.

| Beat | Time (s) | Caption words | Picture words | Reading (s) | Lead (s) | Motion (s) | Hold (s) | Total (s) | Gate |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · Two tasks | 0.0–15.0 | 5 | 39 | 14.7 | 1.0 | 4.4 | 9.6 | 15.0 | |
| 2 · The AI answers both | 15.0–21.7 | 10 | 3 | 4.3 | 1.0 | 2.8 | 2.9 | 6.7 | |
| 3 · One check | 21.7–31.7 | 8 | 22 | 10.0 | 1.0 | 2.8 | 6.2 | 10.0 | Stops at 25.5; resumes from 30.2 |
| 4 · The frontier, and inside it | 31.7–43.7 | 15 | 21 | 12.0 | 1.0 | 6.4 | 4.6 | 12.0 | |
| 5 · Outside the frontier | 43.7–56.2 | 16 | 21 | 12.3 | 1.0 | 10.0 | 1.5 | 12.5 | |
| 6 · What set them apart | 56.2–67.2 | 13 | 20 | 11.0 | 1.0 | 4.6 | 5.4 | 11.0 | |
| 7 · The suggested call | 67.2–78.7 | 15 | 19 | 11.3 | 1.0 | 5.0 | 5.5 | 11.5 | |
| 8 · One thing changes | 78.7–90.2 | 13 | 21 | 11.3 | 1.0 | 3.8 | 6.7 | 11.5 | Stops at 83.5; resumes from 88.7 |
| 9 · The call changes | 90.2–100.7 | 14 | 17 | 10.3 | 1.0 | 5.5 | 4.0 | 10.5 | |
| 10 · Faculty check | 100.7–110.4 | 15 + 9 | 0 | 8.0 | 0.0 | 5.7 | 4.0 | 9.7, then rests | |
| **Total** | | **133** | **183** | | | | | **110.4** | |

Checks:
- Changes a caption names wait until it can be read once: the "READY" pills (beat 2, 3.4 s), the condition label (beat 3, 2.7 s), the numbers (beat 4, 5.0 s), the bracket (beat 5, 5.4 s), Task B's tag (beat 6, 4.4 s), Task B's suggestion (beat 7, 5.0 s), the launch-plan pills (beat 8, 4.3 s), the row-2 suggestion (beat 9, 4.7 s), the move line (beat 10, 5.0 s after the check).
- Lead-ins described by the caption's first or main clause: the budget (beat 3), the frontier (beat 4), Task A's tag (beat 6), the key and Task A's suggestion (beat 7), the row-2 condition (beat 8), the fade of unchosen pills (beat 9).
- Nothing shows a side, a reason or a suggestion before either gate, in any view.
- Every hold is at least 1.5 s; one movement at a time; no camera moves. The scene dims once, for Task B's panel.
- **Interactive path:** the gates skip 4.7 s and 5.2 s of hold, so the figure plays 100.5 s plus decision time; the first choice opens at 25.5 s.
