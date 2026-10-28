# Appropriate reliance: storyboard

Motion figure 8 of 8 · slug `appropriate-reliance` · storyboard round 1 · October 28, 2026
*Cold-read copy. The Intent section is removed.*

## 2. Scenario

You make the reliance call on two tasks from Dell'Acqua et al.'s field experiment with 758 BCG consultants. Task A: segment the footwear market by user and pick the segment that matters most. Task B: use a spreadsheet and insider interviews to pick the brand a clothing company should back. An AI gives both answers in the same finished form, and both will go into a first draft for your team. For each task you choose "Rely on it", "Check it first" or "Don't use it". Then the frontier is drawn between the tasks, the study's results split them, and the figure shows what each answer rested on and which calls were warranted. Then one condition changes on Task A: the company will build the segment you pick. You make that call again, and the warranted call flips to checking. The figure ends on the faculty check.

*Sources.* The tasks are paraphrased from the working paper's task descriptions; their wording on screen is the figure's. The study figures are from the source spine's Jagged Frontier entry (Dell'Acqua et al., 2023, HBS working paper 24-013): inside the frontier, consultants with AI finished 12.2% more tasks, 25.1% faster and at more than 40% higher quality; on a task chosen to fall outside it, consultants without AI were right about 84.5% of the time and the two AI groups 60% and 70%, and graders still rated the AI users' recommendations higher in quality "regardless of the correctness of their answer". The AI's answers are drawn as lines, not text. The two conditions ("a first draft for your team", "the company will build what you pick") are added for the exercise; the study didn't vary them. *The Irreducible Officer*, Section V, defines trust, reliance and appropriate reliance, and describes the jagged frontier and pattern recognition across task types.

## 3. Cast and grammar

**The colour rule.** Grey is what the AI supplied: its two answers, their "AI'S ANSWER" labels and their "READY" pills. Red is what the reader decided: their calls, as red dots in the option radios, plus the labels that name the reader ("YOUR CALL" during a gate, the "YOUR CALLS" key at the end). Navy ink is the page: the tasks, the condition labels, the option pills, the frontier, the pattern marks, the evidence, the "WARRANTED" tags and the notes.

**Palette.** Paper `#f6f1e8`, paper-bright `#fffdfa`, ink `#0a2242`, machine grey `#5b564f` with a `#ded5c4` band behind AI-supplied work, red `#b81b2b`. Type: Source Serif 4 for the tasks, numbers and captions; Source Sans 3 for option labels and evidence labels; IBM Plex Mono for small labels, at 13 units (so labels survive the runtime's viewport fit at 1280 × 720).

**Stage.** An SVG with a 960 × 540 viewBox. One view, no camera moves.
- *Top band* (y 0–40): the frontier's two labels.
- *Two cards* (y 42–500): Task A at left (x 24–456), Task B at right (x 504–936). The frontier is drawn in the 48-unit gap between them.
- *Bottom band* (y 500–540): the source line, centred, and the "YOUR CALLS" key at left.
- *Centre stage* (beats 5, 6 and 9): an evidence panel or the changed condition, over the dimmed scene.

Positions inside a card are given for Task A (x0 = 24); Task B's are the same with x0 = 504.

| Element | Stands for | How it looks | Where |
| --- | --- | --- | --- |
| Task cards | The two tasks | Paper-bright, hairline ink border | A x 24–456, B x 504–936; y 42–500 |
| Task tags | Names the tasks | Mono 13 ink "TASK A", "TASK B" | (x0+16, 64) |
| Task text | What each task asks | Serif 18 ink, two lines each. A: "Segment the footwear market by user and" / "pick the segment that matters most." B: "Use a spreadsheet and insider interviews to" / "pick the brand a clothing company should back." | Baselines 90 and 113, from x0+16 |
| Source line | Where the tasks come from | Mono 13 ink. Beat 1: "FIELD EXPERIMENT · 758 BCG CONSULTANTS". From beat 5: "FIELD EXPERIMENT · 758 BCG CONSULTANTS · DELL'ACQUA ET AL. (2023)" | Centred (480, 524) |
| AI's answer | What the AI gives back | Mono 13 grey "AI'S ANSWER"; a `#ded5c4` band holding three grey lines (writing drawn as lines, lengths 384, 384, 236); identical on both cards | Label (x0+16, 166); band x0+16 to x0+416, y 176–218 |
| "READY" pill | The tool presents it as finished | Filled grey pill, paper mono 13 "READY"; same style, same moment on both | x0+344 to x0+416, y 153–171 |
| Condition label, row 1 | What the answer is for | Mono 13 ink "IF IT'S A FIRST DRAFT FOR YOUR TEAM", identical on both cards | (x0+16, 246) |
| Option pills, row 1 | The three calls | Paper pills, rounded 17, hairline ink outline; Sans 600 13 ink "Rely on it", "Check it first", "Don't use it"; an empty radio circle (r 5.5, hairline) at each pill's left | y 256–290; x0+16 to x0+144, x0+152 to x0+280, x0+288 to x0+416 |
| "YOUR CALL" | Names the reader during a gate | Red mono 13, right-aligned on the row's label line. Shown only while that row is open and until its verdict | (x0+416, 246); row 2 (440, 338) |
| Reader's call | A call the reader made | A solid red dot (r 4) in the chosen pill's radio, and that pill's outline thickens to 1.8. Interactive branches only | In the pill |
| Notes | What each option would have meant | Mono 13 ink, centred under each pill | Row 1 y 308; row 2 y 400 |
| "WARRANTED" tag | An option the evidence and the condition support | Filled navy tag (rounded 3), paper mono 13 "WARRANTED", centred under the pill | Row 1 y 297–315; row 2 y 389–407 |
| Condition label, row 2 | The changed condition | Mono 13 ink "IF THE COMPANY BUILDS WHAT YOU PICK" (arrives large first, beat 9) | (40, 338), card A only |
| Option pills, row 2 | The call again | As row 1 | y 348–382, card A only |
| Jagged frontier | The uneven edge of where AI is reliable | An irregular navy line, stroke 1.8, uneven teeth, drawn top to bottom between the two cards only. Mono 13 ink "INSIDE THE FRONTIER" (right-aligned at x 456) and "OUTSIDE THE FRONTIER" (from x 504) | Line within x 466–494, y 50–494; labels baseline 30 |
| Pattern marks | What each answer rested on | A navy underline (stroke 1.5) under key words, and a navy mono 13 tag on the free third line. A: underline under "Segment the footwear market by user"; tag "IDEA WORK · YOU CAN JUDGE IT BY READING". B: underline under "insider interviews"; tag "THE RIGHT ANSWER TURNED ON THE INTERVIEWS" | Tags (x0+16, 136) |
| Dimmed scene | Attention moves to centre | Everything on the stage drops to 25% (40% in beat 9) | Beats 5, 6, 9 |
| Evidence panel, inside | The study, inside the frontier | Paper-bright panel, soft shadow, content at 1.5×: mono "WITH AI, ON TASKS INSIDE THE FRONTIER"; three Serif 600 numbers with Sans labels: "12.2%" more tasks, "25.1%" faster, "40%+" higher quality. Shrinks into card A's slot | Panel x 200–760, y 140–400; slot y 418–492 (title 432, numbers 464, labels 484; columns x 40, 176, 312) |
| Evidence panel, outside | The study, on Task B | Same panel: mono "RIGHT ANSWERS ON TASK B"; Sans 14 rows "Without AI" (one bar, "84.5%") and "With AI" over mono "TWO GROUPS" (two bars, "60%" and "70%"). Bars 16 high, ink 85%, 2.8 units a point. A navy bracket under the two AI bars, Serif italic 15 "Rated higher in quality, right or wrong". Shrinks into card B's slot | Slot y 330–492: title 344; bars from x 620 at y 358, 388, 408; bracket y 432; text centred (718, 452) |
| Changed condition, large | The one thing that changes | Mono 22 ink "IF THE COMPANY BUILDS WHAT YOU PICK" on a paper-bright band; scales down into row 2's label | Centre (480, 270), band x 160–800, y 240–290 |
| "YOUR CALLS" key | Says the red dots are the reader's | A red dot and red mono 13 "YOUR CALLS". Only when the reader made a call | (24, 524) |
| Caption band | The words for each beat | Mono counter and Serif 22 caption; at a gate, two buttons under the caption; in beat 11 the check and the move line at the same size | Under the stage |
| Beat list | Text equivalent | Eleven captions with "On screen" lines | Under the controls |

**The notes.** The same for every reader, whichever call they made.

| Row | Rely on it | Check it first | Don't use it |
| --- | --- | --- | --- |
| Task A · if it's a first draft for your team | WARRANTED | SAFE, SLOWER | LOSES THE HELP |
| Task B · if it's a first draft for your team | RIGHT LESS OFTEN | WARRANTED | WARRANTED |
| Task A · if the company builds what you pick | A MISS GETS BUILT | WARRANTED | LOSES THE HELP |

**Interaction.**
- *Controls.* At a gate, each open row is a real radio group (`fieldset` with legend "Task A, if it's a first draft for your team: your call"), positioned over its pills, with arrow keys moving within a group and Tab between groups. Each option's accessible description says what it means: "Use the AI's answer as your answer", "Test it against the task's sources before using it", "Do the task without the AI's answer". The caption band shows two buttons: **Show what happened** (enabled once every open row has a call) and **Play without choosing**. Focus is visible on everything.
- *Making a call.* The red dot grows in the chosen radio (0.26 s, removed under reduced motion), and the pill's outline thickens. A call can be changed until the reader presses Show what happened.
- *Resuming.* Show what happened jumps the playhead to 1.5 s before the gate beat ends (only a hold remains, so nothing visibly skips) and plays. Play without choosing, or the main Play button at a gate, plays on and treats any row without a call as no call; calls already made are kept. Play without choosing at the first gate also passes the second.
- *Scrubbing.* The scrubber can move past a gate at any time; rows without a call render as no call. Moving back to a gate opens its rows again, with earlier calls in place.
- *Start over.* Clears every call and plays from 0.
- *Screen readers.* The SVG and the caption band are `aria-hidden`. A polite live region announces each gate ("Make your call on each task. Three choices for each.") and, after each verdict beat, the warranted call and the reader's call with its note, for example "Task B: checking it or not using it was warranted. Your call: Rely on it. Right less often."
- *No-call path.* With no calls, the figure plays straight through: each gate beat holds its full length with empty radios, and no red dot or key appears. This is also what plays in the preview video and what `?t=`, reduced motion, print and the poster show.

**Narrow screens.** Picture text is at least 13 units, so the drawn stage keeps its labels down to a letterboxed scale of 0.846. Below that, the SVG collapses and a stacked stage, driven by the same clock and calls, takes its place. The layout is fixed from the first frame, and parts only fade in:
- The frontier labels sit on top, and the two tasks run as side-by-side columns with the jagged line drawn down the gutter between them.
- Each column, top to bottom: tag; task text (Serif 14); the pattern tag's space (mono 13); the AI's answer as a grey "AI's answer · Ready" chip with two grey lines; the row label (mono 13, two lines); the three options as full-width radio buttons, 40 px tall, with the note or "Warranted" tag shown inside the button after the verdict; on Task A the second row; then the evidence (A: three numbers in a list; B: three thin bars with values and the bracket line).
- The source line runs under both columns. The evidence panels are overlays over the dimmed stacked stage before their content appears in the slots.
- The stage holds its tallest height (measured once per width), and the caption band is a fixed height with room for the gate buttons, so the controls never move.
- Target at 390 × 844: the whole player fits. If it doesn't, the page may scroll at a gate, which is untimed. The site is desktop-first.

## 4. Beats

Times are absolute seconds on the no-call path. In every beat the caption changes first (0.3 s fade) and nothing in the picture moves for the first second. A change the caption is about starts only after the caption can be read once, except a lead-in that the caption's first or main clause describes. Each beat holds its caption plus new picture words at 3 words a second or less; words repeated identically on both cards count once.

### Beat 1 · 0.0–16.0 s · Two tasks

- **Start:** an empty paper stage.
- **What moves:** 1.0–1.6 card A fades in and rises 6 units, with "TASK A"; 1.6–2.4 its two lines fade in, one after the other; 2.6–3.0 the source line fades in at the bottom, "FIELD EXPERIMENT · 758 BCG CONSULTANTS"; 6.5–7.1 card B fades in and rises, with "TASK B"; 7.1–7.9 its two lines; hold.
- **Caption:** "These two tasks come from a field experiment with 758 consultants."
- **Notice:** both tasks end in one pick, and both second lines start "pick the …". Task B names its materials.
- **Why:** the setup, with the two tasks looking alike from the start. Task B appears after there's time to read Task A.

### Beat 2 · 16.0–24.5 s · The AI answers both

- **Start:** both cards, task text only.
- **What moves:** 17.0–17.4 "AI'S ANSWER" and an empty grey band appear on both cards; 17.4–18.6 three grey lines write into both bands at once; 19.4–19.8 a grey "READY" pill drops onto both at the same moment; hold.
- **Caption:** "An AI answers both. The two answers look equally finished."
- **Notice:** same form, same length, same tag, same moment.
- **Why:** the felt signal is the same for both, so it can't decide the call.

### Beat 3 · 24.5–37.0 s · Your call (gate 1)

- **Start:** both cards with tasks and the AI's answers.
- **What moves:** 25.5–25.9 "IF IT'S A FIRST DRAFT FOR YOUR TEAM" fades in on both cards; 27.0–27.5 three option pills fade in on each card, "Rely on it", "Check it first", "Don't use it", each with an empty radio, and a red "YOUR CALL" on each row's label line. The radios are live from 27.5.
- **Gate:** at 30.5, playback pauses until the reader presses Show what happened or Play without choosing. On Show what happened it resumes from 35.5. On the no-call path the beat holds to 37.0.
- **Caption:** "Both answers will go into a first draft for your team. Make your call on each task."
- **Branches:** for each task, one of three calls, or none. A call puts a red dot in that radio and thickens the pill's outline. Nothing else on the stage changes, and nothing yet marks either side.
- **Notice:** the condition is identical for both tasks. The stage says nothing about which call is right.
- **Why:** predict before reveal. With the condition equal, the only difference between the tasks is the tasks.

### Beat 4 · 37.0–50.5 s · The jagged frontier

- **Start:** both cards with their answers and calls; red dots where the reader called.
- **What moves:** 38.0–39.6 an irregular navy line draws downward between the two cards; 39.6–40.0 "INSIDE THE FRONTIER" appears above card A and "OUTSIDE THE FRONTIER" above card B; 43.7–44.3 the two "READY" pills pulse together; hold.
- **Caption:** "A jagged frontier marks where AI stops being reliable. It runs between these tasks, and the answers don't show it."
- **Branches:** the reader's red dots stay in place, so a reader can set their calls beside the sides.
- **Notice:** Task A is inside and Task B outside. The two answers pulse alike across the line.
- **Why:** defines the term in its own beat before the study uses it, with the same definition the uncalibrated-reliance figure uses.

### Beat 5 · 50.5–62.5 s · Inside the frontier

- **Start:** as beat 4 settled.
- **What moves:** 51.5–52.0 the scene dims to 25%; 52.0–52.6 the evidence panel rises centre stage with "WITH AI, ON TASKS INSIDE THE FRONTIER"; 55.5–55.9 "12.2% more tasks"; 56.1–56.5 "25.1% faster"; 56.7–57.1 "40%+ higher quality"; 59.1–60.3 the panel's content shrinks into card A's evidence slot as the scene returns; 60.3–60.7 the source line extends with "· DELL'ACQUA ET AL. (2023)"; hold.
- **Caption:** "On tasks inside the frontier, consultants with AI finished more tasks, faster, at higher quality."
- **Notice:** all three measures went up with AI, and the numbers stay on card A.
- **Why:** the evidence for warranted acceptance, shown big first and kept for the final frame. The numbers start 5.0 s in.

### Beat 6 · 62.5–75.5 s · Outside the frontier

- **Start:** as beat 5 settled.
- **What moves:** 63.5–64.0 the scene dims to 25%; 64.0–64.6 the panel rises with "RIGHT ANSWERS ON TASK B" and its two row labels; 65.9–66.5 the "Without AI" bar grows to 84.5%; 66.7–67.3 the two "With AI" bars grow to 60% and 70%; 68.6–69.1 a navy bracket draws under the two AI bars; 69.1–69.5 "Rated higher in quality, right or wrong"; 71.5–72.7 the content shrinks into card B's evidence slot as the scene returns; hold.
- **Caption:** "On Task B, consultants with AI were right less often. Graders still rated their work higher."
- **Notice:** both AI groups fall short of the group without AI, and the bracket sits on the shorter bars.
- **Why:** the scores split, and polish didn't show which picks were right. The bars start after the first sentence (3.3 s); the bracket after the whole caption.

### Beat 7 · 75.5–87.5 s · What each answer rested on

- **Start:** both cards with their evidence; the frontier and its labels.
- **What moves:** 76.5–77.1 a navy underline runs under "Segment the footwear market by user" in Task A, and "IDEA WORK · YOU CAN JUDGE IT BY READING" appears under the task; 81.5–82.1 a navy underline runs under "insider interviews" in Task B, and "THE RIGHT ANSWER TURNED ON THE INTERVIEWS" appears; hold.
- **Caption:** "Task A is idea work you can judge by reading. Task B's right answer turned on the interviews."
- **Notice:** the reason is in the task text, which was on screen before the call. It doesn't come from the AI's answers.
- **Why:** the pattern that travels: ask what the answer rests on, and whether reading it would show a miss. Task B's mark waits until the caption can be read once (6.0 s).

### Beat 8 · 87.5–99.5 s · The calls, as a first draft

- **Start:** as beat 7 settled; red "YOUR CALL" still on both rows.
- **What moves:** 89.6–90.0 a "WARRANTED" tag appears under "Rely on it" on Task A; 90.4–90.8 "SAFE, SLOWER" under "Check it first" and "LOSES THE HELP" under "Don't use it"; 93.3–93.7 "WARRANTED" tags appear under "Check it first" and "Don't use it" on Task B; 94.1–94.5 "RIGHT LESS OFTEN" under "Rely on it"; 94.7–95.1 the red "YOUR CALL" labels fade, and the "YOUR CALLS" key fades in at bottom left if the reader made a call; hold.
- **Caption:** "Relying on Task A was warranted. Task B needed a check against the interviews, or no AI."
- **Branches:** the tags and notes are identical for everyone. The reader's red dot sits on whichever option they chose, so a reader who checked Task A sees "SAFE, SLOWER" beside their dot, and one who relied on Task B sees "RIGHT LESS OFTEN". The live region reads each warranted call and the reader's call with its note.
- **Notice:** warranted acceptance, with its reasons on screen: inside the frontier, idea work you can judge by reading, and a first draft the team will see. On Task B the same first-draft condition doesn't make relying safe.
- **Why:** warranted acceptance gets its own result, with its reasons on screen. Task A's tag starts 2.1 s in (after the first sentence); Task B's after the whole caption (5.7 s).

### Beat 9 · 99.5–111.5 s · One thing changes (gate 2)

- **Start:** as beat 8 settled.
- **What moves:** 100.5–101.1 the scene dims to 40% and "IF THE COMPANY BUILDS WHAT YOU PICK" rises large at centre; 103.6–104.8 it shrinks and moves into card A's second-row label slot as the scene returns; 105.0–105.5 three fresh pills fade in on that row, with empty radios and a red "YOUR CALL". The radios are live from 105.5.
- **Gate:** at 105.5, playback pauses until Show what happened or Play without choosing (skipped if the reader chose Play without choosing at gate 1). On Show what happened it resumes from 110.0. On the no-call path the beat holds to 111.5.
- **Caption:** "One thing changes on Task A: the company will build the segment you pick. Make the call again."
- **Branches:** one of three calls on the new row, or none; a call puts a red dot in that radio.
- **Notice:** the task, the AI's answer, the frontier and the evidence haven't changed. Only the condition has, and the first row's condition sits right above the new one.
- **Why:** makes "what would have changed the call" something the reader decides on, before seeing the answer.

### Beat 10 · 111.5–123.5 s · The call flips

- **Start:** as beat 9 settled, with the reader's second-row call if made.
- **What moves:** 112.5–113.1 the frontier pulses once where it was, and "INSIDE THE FRONTIER" brightens; 117.3–117.7 "WARRANTED" appears under "Check it first" on the second row; 118.1–118.5 "A MISS GETS BUILT" under "Rely on it" and "LOSES THE HELP" under "Don't use it"; 118.5–118.9 the red "YOUR CALL" fades; hold.
- **Caption:** "Same task, same side of the frontier. Now a miss would get built, so check it first."
- **Branches:** as beat 8, for the second row.
- **Notice:** two rows on one card, two conditions, two warranted calls. The AI stays in use with a check.
- **Why:** shows risk changing the call while the task kind stays fixed. The tag waits until the caption can be read once (5.7 s).

### Beat 11 · 123.5–133.5 s · The faculty check

- **What moves:** 123.5–123.7 caption 10 fades out; 123.7–124.3 "FACULTY CHECK" and the question rise; 128.8–129.3 directly under it, at the same size, "Change one condition and ask for the call again."; hold; the figure rests here.
- **Caption:** "Faculty check: What evidence justified relying on the system here, and what would have changed the call?" Second line, same size: "Change one condition and ask for the call again."
- **Why:** the figure ends on the check and the move. The move line waits until the check can be read once (5.0 s).

## 5. Final frame

The still at 133.5 s, on the no-call path. It is also the reduced-motion view, the print view and the social-card poster. While the figure waits to play on the page, it shows beat 2 settled (both tasks, both answers marked ready), and play starts from 0.

**Stage:**
- **Top:** "INSIDE THE FRONTIER" to the left of the jagged line, "OUTSIDE THE FRONTIER" to the right.
- **Card A, left:**
  - "TASK A" · "Segment the footwear market by user and pick the segment that matters most.", with "Segment the footwear market by user" underlined and the tag "IDEA WORK · YOU CAN JUDGE IT BY READING".
  - "AI'S ANSWER": grey lines on the grey band, "READY".
  - "IF IT'S A FIRST DRAFT FOR YOUR TEAM": Rely on it · WARRANTED; Check it first · SAFE, SLOWER; Don't use it · LOSES THE HELP.
  - "IF THE COMPANY BUILDS WHAT YOU PICK": Rely on it · A MISS GETS BUILT; Check it first · WARRANTED; Don't use it · LOSES THE HELP.
  - "WITH AI, ON TASKS INSIDE THE FRONTIER": 12.2% more tasks · 25.1% faster · 40%+ higher quality.
- **Centre:** the jagged frontier between the cards.
- **Card B, right:**
  - "TASK B" · "Use a spreadsheet and insider interviews to pick the brand a clothing company should back.", with "insider interviews" underlined and the tag "THE RIGHT ANSWER TURNED ON THE INTERVIEWS".
  - "AI'S ANSWER": identical to Task A's, "READY".
  - "IF IT'S A FIRST DRAFT FOR YOUR TEAM": Rely on it · RIGHT LESS OFTEN; Check it first · WARRANTED; Don't use it · WARRANTED.
  - "RIGHT ANSWERS ON TASK B": Without AI 84.5%; With AI, two groups, 60% and 70%; bracket "Rated higher in quality, right or wrong".
- **Bottom:** "FIELD EXPERIMENT · 758 BCG CONSULTANTS · DELL'ACQUA ET AL. (2023)".

**In an interactive branch,** the same frame adds the reader's red dots in the pills they chose (up to three) and the "YOUR CALLS" key at bottom left. Printing after making calls prints them.

**Caption band:** FACULTY CHECK / *What evidence justified relying on the system here, and what would have changed the call?* / *Change one condition and ask for the call again.* (same size)

**What the still says alone:** two tasks that look alike got the same finished answer from an AI. The study put them on opposite sides of the frontier: AI helped on the idea work and hurt on the pick that turned on the interviews, while graders rated the AI users' work higher either way. As a first draft for the team, relying on Task A was warranted; Task B needed a check or no AI. When the company builds what you pick, the same Task A needs a check. The check asks for the evidence and for what would change the call, and the move under it says how to test the answer.

## 6. Standalone page copy

**Title:** Appropriate reliance

**Kicker:** The competency

**Setup:** Appropriate reliance means accepting AI support when it's warranted, checking or refusing it when it's not, and being able to say why. This figure asks you to make that call on two tasks from a field experiment with 758 consultants, before you see what happened. Then one condition changes and you make one more call. You can also let it play through without choosing.

**Figure summary** (visually hidden): An interactive figure with two task cards from a field experiment with 758 BCG consultants. Task A: segment the footwear market by user and pick the segment that matters most. Task B: use a spreadsheet and insider interviews to pick the brand a clothing company should back. An AI answers both in the same form, each marked ready, and both answers will go into a first draft for your team. For each task the reader can choose Rely on it, Check it first or Don't use it. A jagged line, the frontier, is drawn between the tasks: Task A inside, Task B outside. On tasks inside the frontier, consultants with AI finished 12.2% more tasks, 25.1% faster, at more than 40% higher quality. On Task B, consultants without AI were right 84.5% of the time and the two groups with AI 60% and 70%, and graders rated the AI users' work higher in quality, right or wrong. Task A is marked as idea work you can judge by reading; Task B's right answer turned on the interviews. As a first draft, relying on Task A is marked warranted, and for Task B, checking it or not using it. Then one condition changes on Task A: the company will build the segment you pick. The reader calls again, and checking it first is marked warranted, because a miss would get built. The figure ends on the faculty check.

**Beat list (text equivalent):**

1. **These two tasks come from a field experiment with 758 consultants.** *On screen:* two task cards. Task A: "Segment the footwear market by user and pick the segment that matters most." Task B: "Use a spreadsheet and insider interviews to pick the brand a clothing company should back." A line at the bottom reads "Field experiment · 758 BCG consultants".
2. **An AI answers both. The two answers look equally finished.** *On screen:* under each task, "AI's answer" and three grey lines of writing on a beige band. Each gets the same grey "Ready" tag at the same moment.
3. **Both answers will go into a first draft for your team. Make your call on each task.** *On screen:* each card gets the line "If it's a first draft for your team" and three choices: Rely on it, Check it first, Don't use it. The figure waits for your calls; you can also play on without choosing. A call shows as a red dot in that choice.
4. **A jagged frontier marks where AI stops being reliable. It runs between these tasks, and the answers don't show it.** *On screen:* an uneven line is drawn down between the cards, labelled "Inside the frontier" over Task A and "Outside the frontier" over Task B. The two "Ready" tags pulse together.
5. **On tasks inside the frontier, consultants with AI finished more tasks, faster, at higher quality.** *On screen:* a panel rises: with AI, on tasks inside the frontier, 12.2% more tasks, 25.1% faster, more than 40% higher quality. It settles onto Task A's card. Source: Dell'Acqua et al. (2023).
6. **On Task B, consultants with AI were right less often. Graders still rated their work higher.** *On screen:* a panel rises: right answers on Task B. Without AI, 84.5%. With AI, two groups, 60% and 70%. A bracket under the AI bars: "Rated higher in quality, right or wrong." It settles onto Task B's card.
7. **Task A is idea work you can judge by reading. Task B's right answer turned on the interviews.** *On screen:* in Task A, "Segment the footwear market by user" is underlined and marked "Idea work. You can judge it by reading." In Task B, "insider interviews" is underlined and marked "The right answer turned on the interviews."
8. **Relying on Task A was warranted. Task B needed a check against the interviews, or no AI.** *On screen:* on Task A, "Rely on it" is tagged "Warranted"; "Check it first" reads "Safe, slower" and "Don't use it" reads "Loses the help". On Task B, "Check it first" and "Don't use it" are tagged "Warranted"; "Rely on it" reads "Right less often". Your calls stay marked in red.
9. **One thing changes on Task A: the company will build the segment you pick. Make the call again.** *On screen:* "If the company builds what you pick" appears large in the middle, then settles as a second line of choices on Task A, under the first. The figure waits for your call.
10. **Same task, same side of the frontier. Now a miss would get built, so check it first.** *On screen:* the frontier pulses where it was. On Task A's second line, "Check it first" is tagged "Warranted"; "Rely on it" reads "A miss gets built" and "Don't use it" reads "Loses the help".
11. **Faculty check: What evidence justified relying on the system here, and what would have changed the call? Change one condition and ask for the call again.** *On screen:* both lines appear under the picture at the same size. Both tasks, both answers, the frontier, the evidence and every call stay in view.

**Faculty check:** What evidence justified relying on the system here, and what would have changed the call?
**Change one condition and ask for the call again.** (same size)

A good answer names two things. The first is the kind of task, including what its answer rests on: Task A is idea work you can judge by reading, and the study found it inside the frontier. Task B looked the same, but its right answer turned on the interviews, and graders rated the AI users' work higher whether or not it was right, so reading it wouldn't show a miss. The second is what a miss would cost. As a first draft for the team, a weak segment pick is cheap and visible; when the company builds what you pick, it isn't. Changing one condition and asking again shows whether a student has a reason for the call or only a sense that the answer looked right.

**From the essay:** Section V, the trust and reliance paragraph, with its citation (Raees & Papangelis, 2026), and the jagged frontier paragraph ending "what independent checks are required before the output governs the work."

**Evidence:** Dell'Acqua et al., [Navigating the Jagged Technological Frontier](https://www.hbs.edu/faculty/Pages/item.aspx?num=64700), HBS working paper 24-013 (2023). In the field experiment, 758 BCG consultants using GPT-4 finished 12.2% more tasks, 25.1% faster and at more than 40% higher quality on tasks inside the frontier. On a task chosen to fall outside it, consultants without AI were right about 84.5% of the time and the two AI groups 60% and 70%: in the working paper's words, "19 percentage points less likely to produce correct solutions." Graders still rated the AI users' recommendations higher in quality "regardless of the correctness of their answer." The task wording is paraphrased from the working paper. The study compared consultants with and without AI; it didn't test checking, and it didn't vary what the work was for. Those two conditions are added for this exercise.

**Links:** See the failure: Uncalibrated reliance (`../uncalibrated-reliance/`); Book chapter: Calibrate the tool (`../../book-v0/four-moves-book.html?spread=3`); Practice (`https://judgmentlab.net/#companion`); Essay Section V (`https://judgmentlab.net/#v-appropriate-reliance-as-a-teachable-competency`).

## 7. Pacing table

Reading is caption words plus new picture words, ÷ 3; words repeated identically on both cards count once. Every beat is at least that long, at least twice its caption's reading time, and holds at least 1.5 s after its last movement. Times are on the no-call path.

| Beat | Time (s) | Caption words | Picture words | Reading (s) | Lead (s) | Motion (s) | Hold (s) | Total (s) | Gate |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · Two tasks | 0.0–16.0 | 11 | 37 | 16.0 | 1.0 | 6.9 | 8.1 | 16.0 | |
| 2 · The AI answers both | 16.0–24.5 | 10 | 3 | 4.3 | 1.0 | 2.8 | 4.7 | 8.5 | |
| 3 · Your call | 24.5–37.0 | 17 | 19 | 12.0 | 1.0 | 2.0 | 9.5 | 12.5 | Pauses at 30.5; resumes from 35.5 |
| 4 · The jagged frontier | 37.0–50.5 | 20 | 6 | 8.7 | 1.0 | 6.3 | 6.2 | 13.5 | |
| 5 · Inside the frontier | 50.5–62.5 | 15 | 19 | 11.3 | 1.0 | 9.2 | 1.8 | 12.0 | |
| 6 · Outside the frontier | 62.5–75.5 | 16 | 21 | 12.3 | 1.0 | 9.2 | 2.8 | 13.0 | |
| 7 · What each rested on | 75.5–87.5 | 18 | 15 | 11.0 | 1.0 | 5.6 | 5.4 | 12.0 | |
| 8 · The calls, as a first draft | 87.5–99.5 | 17 | 11 | 9.3 | 2.1 | 5.5 | 4.4 | 12.0 | |
| 9 · One thing changes | 99.5–111.5 | 18 | 7 | 8.3 | 1.0 | 5.0 | 6.0 | 12.0 | Pauses at 105.5; resumes from 110.0 |
| 10 · The call flips | 111.5–123.5 | 17 | 4 | 7.0 | 1.0 | 6.4 | 4.6 | 12.0 | |
| 11 · Faculty check | 123.5–133.5 | 15 + 9 | 0 | 8.0 | 0.0 | 5.8 | 4.2 | 10.0, then rests | |
| **Total** | | **183** | **142** | | | | | **133.5** | |

Picture words per beat: 1, the tags, both tasks and the source line; 2, "AI'S ANSWER" and "READY"; 3, the condition, "YOUR CALL" and the three options; 4, the frontier labels; 5, the panel title, numbers and labels, and the citation added to the source line; 6, the panel title, row labels, values and bracket; 7, the two pattern tags; 8, "WARRANTED", three notes and the "YOUR CALLS" key; 9, the large condition; 10, the one new note.

Checks:
- Changes a caption names wait until it can be read once: the "READY" pills (beat 2, 3.4 s in), the paired pulse (beat 4, 6.7 s), the numbers (beat 5, 5.0 s), the bracket (beat 6, 6.1 s), Task B's pattern mark (beat 7, 6.0 s), Task B's tags (beat 8, 5.8 s), the second-row tag (beat 10, 5.8 s), the move line (beat 11, 5.0 s after the check).
- Lead-ins described by the caption's first or main clause: the condition labels (beat 3), the frontier line (beat 4), Task A's pattern mark (beat 7), Task A's tag (beat 8, after its own sentence), the large condition (beat 9), the frontier's pulse (beat 10).
- Nothing marks a side, a reason or a verdict before the reader's call at either gate.
- Every hold is at least 1.5 s; one movement at a time; no camera moves. The scene dims three times (two evidence panels, the changed condition) and returns each time.
- **Interactive path:** the gates skip the 5.0 s and 4.5 s holds that follow them, so the figure plays 124.0 s plus the reader's decision time.
- **Reduced motion:** the final frame with the full beat list. Beat 3 and beat 9 in the list open their gate as a settled still with live radios; Show what happened then shows the next beat settled, and the beat list steps from there.
- **Phone:** the stacked stage and the caption band have fixed heights, so the caption and controls stay put through the whole run; target 844 px tall at 390 px wide, final frame included.
