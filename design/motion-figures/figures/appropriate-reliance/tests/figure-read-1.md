# Figure read 1: appropriate-reliance

Cold read of `figures/appropriate-reliance/index.html`. Served on 127.0.0.1:5233 and driven with Playwright Chromium (headless). Frames were captured every 0.5 s through every non-gate stretch at 1280×900, 1280×720 and 390×844. I ran five complete playthroughs: B then ask for time, A then rely, skip then skip, B then move, and a keyboard-only run. I also checked reduced motion (media query and `?reduced`), `?t=` holds and print emulation. I didn't open the storyboard, the shots folder, the rest of `tests/`, or any other figure before writing this.

**Disclosure.** I know the Dell'Acqua "jagged frontier" study, so my first call wasn't a naive one. I wrote that call down before touching the DOM. While working out selectors I dumped the figure's DOM structure. That showed me the wording of the second question's three options, and the Task B numbers in the hidden phone layout, before playback reached them. It didn't show me the suggested answer to either question.

## My calls and why

| Run | Gate 1 (one check) | Gate 2 (segmentation goes straight into the launch plan) | Figure's suggested call |
|---|---|---|---|
| 1, first time | **Check Task B.** It joins two sources and has one right answer that can be confidently wrong. Task A is a framing job, and its errors show on reading. | **Ask for time to check both.** Moving the check leaves B's hidden-fact risk unchecked, and A now skips the draft stage. | G1: rely on A, work B from the interviews. G2: "Move your check here, or ask for time for both." I matched both. |
| 2, replay | Check Task A (the "wrong" call) | Rely on it ("rely on everything") | My G1 call is shown against "Rely on it" on A. At G2 the chip still reads "Move your check here", although my option was "Keep my check here". |
| 3 | Skip | Skip | Both suggested calls play. No "Your calls" key appears. |
| 4 | Check Task B | Move my check here | Endorsed. The picture still shows my check on B (see problem 5). |
| 5 | Keyboard: arrow to B, Continue | Keyboard (focus problems below) | Same as run 1 |

## 1. Beat by beat (1280×900, run 1)

The timeline is 1:50. Each Continue skips about 5 s of timeline (0:25 to 0:30, and 1:23 to 1:28), so you watch about 100 s plus your own decision time.

1. **0:00–0:15, "Two tasks from one study."** Task A's card draws in, then Task B's by 0:05. The source line reads "Dell'Acqua et al. · Field experiment, 2023 · 758 BCG consultants · some with GPT-4". After that the stage sits still for about 10 s. The hold is generous; I'd read everything by about 0:09.
2. **0:15–0:22, "An AI answers both. The two answers look equally finished."** An "AI's answer" band appears with two grey lines and an identical "Ready" tag on each card. It's clear and it fits the caption. The answers are abstract, so the decision has to rest on the task type. That's the right design.
3. **0:22–0:25, then the gate. "You have time to check one. Which one?"** The caption arrives about 3 s before the pills and the bottom band ("Time for one check · A check: work it yourself, then compare"). The gate shows a disabled Continue and an active Skip. Choosing puts a red dot on your pill and red "You rely on it" on the other card. Clear. The bottom half of each card is empty at this point.
4. **0:32–0:44, "A jagged frontier marks where an AI stops being reliable. Inside this one, AI helped."** A zigzag draws between the cards, labelled "Inside the frontier" over A and "Outside the frontier" over B. A stat row lands at the foot of A: "12.2% more tasks · 25.1% faster · 40%+ higher quality". "Inside this one" took me a second to parse: this frontier, or this task? I read it as "inside the frontier".
5. **0:44–0:56, "On Task B, consultants with AI were right less often. Graders still rated their work higher."** The stage dims and a panel rises: "Right answers on Task B · Without AI 84.5% · With AI, two groups: 60%, 70%", with a bracket reading "Rated higher in quality, right or wrong". The panel then settles into B's card. This is the reveal that taught me most: a wrong answer can be graded better than a right one. "Two groups" is never explained in the picture. I wondered what separated them.
6. **0:56–1:07, "Task A had no hidden fact. Task B had one, in the interviews."** Under A: "No hidden fact · Reading shows a weak answer". On B, "insider interviews" is underlined, with "The deciding details were in the interviews / The spreadsheet only looked complete". This gives the mechanism, not just the result. On first read I parsed "Reading shows a weak answer" as "a reading showed the AI's answer was weak". It means "a weak answer is visible if you read it". The caption says "one" hidden fact; the picture says "details", plural.
7. **1:07–1:19, "The evidence suggests relying on Task A and working Task B yourself from the interviews."** A "Suggested call" key appears. Navy chips: A gets "Rely on it", with the note "A check here leaves Task B unchecked"; B gets "Work it from the interviews, then compare". My red choice stays. There's no explicit "you matched" or "you differed". You compare the red mark with the navy chip yourself, which suits a non-judgmental tone. The opportunity-cost note ("a check here leaves Task B unchecked") was a useful framing I hadn't put into words.
8. **1:19–1:23, then the gate. "Now your segmentation goes straight into the launch plan. What about Task A?"** A second line appears on A, "If it goes straight into the launch plan", with "Rely on it", "Move my check here" and "Ask for time to check both". The option wording adapts if your first check went to A ("Keep my check here"), which is nice.
9. **1:30–1:40, "Same task, same side of the frontier. Now a miss goes into the launch."** A navy chip reads "Move your check here, or ask for time for both", noted "Moving it leaves Task B's draft unchecked". The beat's lesson is that the call follows the consequence, not just the AI's reliability. That landed.
10. **1:40–1:50, Faculty check.** The caption area becomes "What evidence justified relying on the system here, and what would have changed the call?" (from 1:42), then "Change one condition and ask for the call again." (by 1:46). The button becomes Replay.

No caption changed before I could read it. Every caption holds 10–12 s except beat 3, which hands over to the gate.

## 2. The point

Spend a scarce check where a miss wouldn't show when you read the answer: here, the task whose deciding fact is buried in sources the AI handles badly. Then move the check, or ask for more time, when a change in what the output feeds raises the cost of a miss on the other task.

## 3. The question a teacher should ask afterwards

"Where did you put your one check, what did you expect it to catch that reading the AI's answer wouldn't, and what would have to change for you to move it?"

## 4. The final frame alone

It mostly carries the idea without the animation, but it's dense. Read left to right it says:
- Task A is inside the frontier: rely on it as a draft, but check it or get more time once it feeds the launch.
- Task B is outside: work it from the interviews, because AI users were right less often (84.5% vs 60/70%) and were still graded higher.

It depends on the key: red is "your calls", navy is "suggested call". In the skip path the "Your calls" key never appears, which is correct. "Two groups" stays unexplained. The stat row "With AI, across tasks inside the frontier" crowds right under the gate-2 note at 1280×900. The "What a good answer says" panel below the figure does the explaining the picture can't.

## 5. Problems, ranked

1. **"Show all beats" gives both answers away before the first choice.** At load, one click on the button right under the beat list expands all ten beats and their "On screen" text, including "The evidence suggests relying on Task A…" and "Move your check here, or ask for time for both". The button's label doesn't change after the click, and it has no `aria-expanded`. Clicking a beat (say beat 9), dragging the scrubber, PageUp or End all jump past the gate with no choice made too. That's expected of a scrubber, but there's no guard and no nudge.
2. **The screen-reader summary gives away gate 2's answer.** When gate 2 opens (animated and reduced-motion paths alike), the second sr-only figcaption paragraph is unhidden. It includes "The suggested call is to move your check there or ask for time for both…". A screen-reader user reading the figure at gate 2 hears the answer before choosing. Gate 1 is protected: the paragraph is hidden at load.
3. **At gate 2 the most cautious option always wins, and one endorsed option strains against the figure's own lesson.**
   - "Ask for time to check both" is endorsed, and nothing on screen shows what asking for time costs. A viewer who reflexively picks "check everything" is validated without reasoning. Only "Rely on it" is ever wrong at gate 2.
   - "Move your check here" leaves Task B unchecked. The figure has just shown that graders rated wrong Task B answers higher. So "it's only a draft" is exactly the safety net the figure discredited. The note ("Moving it leaves Task B's draft unchecked") names the cost but doesn't say why it's acceptable. A sharp student will push on this.
   - At gate 1 the trade-off is forced, which is good, but blanket strategies still exist there. "Check the complicated-looking task" wins without any frontier reasoning, because Task B's wording ("spreadsheet and insider interviews") signals where a fact could hide. "Rely on everything" is impossible at gate 1 and loses at gate 2.
4. **The phone layout (390×844) can't show the picture, the question and the button at once.**
   - The stage-plus-caption block is 1,269 px tall, about 1.5 viewports, and the whole figure is 2,033 px.
   - At gate 1, focus jumps to the Task A pill and scrolls the stage top into view. The caption ("Which one?", 1,102 px) and Continue (1,219 px) are then below the 844 px fold, so you pick, then hunt downward for Continue.
   - After Continue the viewport sits on the bottom of the picture. Most of beats 4–9 (frontier labels, the Task B notes, the navy chips) happen above the fold unless you scroll up.
   - At gate 2 the three options sit above the viewport (top −115 px) while the disabled Continue is in view, and focus doesn't move. A phone user sees a question and a greyed button with no visible options.
   - No horizontal scroll, and the text is legible. The frontier line is nearly straight at this width, and the cards are uneven heights with large empty areas.
5. **In some paths the picture contradicts the choice or the chip doesn't fit.**
   - B then "Move my check here": the end frame still shows B's red "Check this one", the "Work it from the interviews" chip, and red "You rely on it" on A. The picture never shows the check moving.
   - A then "Keep my check here" or "Rely on it": the endorsement reads "Move your check here", and its note "Moving it leaves Task B's draft unchecked" refers to a move this viewer never had to make.
6. **Keyboard focus gets lost after the first gate.**
   - At gate 1, focus lands on the Task A radio. Arrows select. Enter does nothing.
   - Continue and Skip come before the radios in DOM order, so Tab from your choice goes to Play. Play at a gate acts as Continue, or as a silent skip if nothing is chosen. It works, but it's unexpected.
   - After Continue, focus falls to `<body>` because the button hides. Gate 2 never takes focus, and pressing Space there scrolls the page.
7. **The opening poster misleads.** At 1280×900 the load frame shows the gate-1 cards with "Check this one" pills, while the question caption sits below the fold.
   - Clicking a pill does nothing.
   - Scrolling about 300 px autoplays from 0:00 and blanks the cards. The intro says "You decide where the check goes before you see what happened", so a teacher will try the pills first and get a dead click, then a reset.
   - Pressing the toggle right after scrolling pauses the autoplay just begun, so it looks like Play "didn't work". That's correct behaviour, but it confused me at first.
8. **You can read ahead after gate 1.** The moment you continue, the beat list fills with beats 4–8, including beat 7's suggested call, about 40 s before the animation gets there. This doesn't spoil your choice, but it pulls the eye off the stage.
9. **Wording inside the figure.**
   - "With AI · two groups" is never named in the picture. The details panel explains it, and there 70% becomes 70.6%.
   - "Reading shows a weak answer" is ambiguous (beat 6).
   - Caption "one" hidden fact vs picture "details".
   - "Inside this one, AI helped" (beat 4) is awkward.
10. **Overclaiming.** Beat 7's caption says "The evidence suggests…". The honest caveat ("The study didn't test checking, a time budget, or what the work was for, so the suggested calls are reasoning from these results") lives only in the collapsed panel. A teacher who never opens it will think the study tested the calls.
11. **An internal note is visible to readers.** The panel reads "From the working paper; these descriptions are being added to the source spine." It's process language in public copy, and it prints.
12. **Pacing.** The 15 s beat 1 is slow. Beats 4–7 at about 12 s each suit their density. In reduced motion the gate-1 reveal and the gate-2 question arrive together, so the first reveal gets no moment of its own.
13. **Fairness.** It's fair to the AI. It says the frontier moves and the result is GPT-4 in 2023, though only in the panel. It's fair to students too: no shaming for a different call.

**Factual claims I'd want sourced:**
- 758 BCG consultants; "some with GPT-4"
- 12.2% more tasks, 25.1% faster, 40%+ higher quality
- 84.5% / 60% / 70% (70.6%) right on Task B, and "19 percentage points less likely"
- graders rated AI users higher "regardless of the correctness"
- 18 product-development questions
- "the authors designed the task so that GPT-4 would get it wrong"
- the prompt-overview group did worse (60 vs 70.6)
- HBS working paper 24-013 (2023)

The results of checking them against the source spine are below.

## 6. Mechanical checks

- **Reduced motion shows the final frame with full text?** Yes. With `prefers-reduced-motion` or `?reduced`, it opens at gate 1 with every past beat's "On screen" text expanded. Continue jumps straight to gate 2 with the gate-1 reveal drawn. After the second call (or two Skips) it lands on 1:50 with all ten beats and their descriptions, every suggested call, and the faculty check. At the end the toggle says "Play", not "Replay".
- **Horizontal scroll at 390 px?** None: `scrollWidth` is 390. It scrolls vertically a lot (page 4,003 px, figure 2,033 px); see problem 4.
- **Play, pause and scrub by keyboard?** Yes. Tab order: Play/Pause → Start over → scrubber (arrows, PageUp, End) → beat buttons → Show all beats → the panel summary. Focus rings are visible, including on the SVG pills. Gate focus has the problems in item 6.
- **1280×720.** It fits: stage plus caption is 628 px, and 693 px with the controls. The smallest labels render at about 10–11 px, readable but small.
- **Print.** Good. Page 1 is the question frame with "You have time to check one. Which one? The answer follows on the next page." Page 2 is the final frame with the suggested calls, the faculty check and the beat list. Pages 3–4 print "What a good answer says", the evidence and the task notes, expanded. The faculty check appears twice, and the internal "source spine" note prints.
- **Every number found in the source spine or the essay?** See below.

## Fact check against `sources/source-spine.md` (done after writing the sections above)

Checked against the spine's "Jagged Frontier And Uneven AI Capability" entry (line 62, the updated BCG entry) and the essay.

**Found in the spine:**
- 758 BCG consultants
- three conditions: no AI, GPT-4, GPT-4 plus a prompt-engineering overview
- 18 product-development questions for a fictional footwear company, including segmenting the market by users
- 12.2% more tasks, 25.1% faster, more than 40% higher quality
- the clothing-company CEO brand task built from a spreadsheet and insider interviews
- the spreadsheet "designed to look complete", with the deciding details in the interviews
- the task designed so GPT-4 would get it wrong
- 84.5% without AI and 60% for the overview group
- "19 percentage points less likely to produce correct solutions"
- "regardless of the correctness of their answer"
- the overview group doing worse than GPT-4 alone
- HBS working paper 24-013 (2023)

The two essay quotes and the section title ("V. Appropriate Reliance as a Teachable Competency") appear word for word in `the-irreducible-officer.md`. Raees & Papangelis is in the spine (line 57).

**Flags:**
1. **70% vs 70.6%.** The spine gives GPT-4 alone as **70.6%**. The bar, the beat text and the screen-reader summary say "70%". The panel says "60% and 70%" in one paragraph and "60% against 70.6%" in the next. 70.6 rounds to 71, so "70%" is a truncation. Use 70.6% or 71% throughout, or label it "about 70%" everywhere.
2. **"A memo to employees"** (the panel's task notes). The spine says "a persuasive memo" and doesn't say who it was for.
3. **Not in the spine (the figure's own reasoning, presented in the panel as findings or close to them):**
   - Task A had "no hidden fact", and "a weak segmentation shows when you read it, which is why graders' quality ratings are a fair guide there". The spine says nothing about grader ratings being reliable on the inside tasks.
   - "The study didn't test checking, a time budget, or what the work was for." It's true to the design as the spine describes it, but the spine doesn't say it.
   - "The frontier moves as models change; this is where it sat in 2023, with GPT-4." A reasonable framing, but not in the spine.
4. **Task wording.** The card text ("Segment the footwear industry market based on users"; "Use a spreadsheet and insider interviews to pick the brand a clothing firm should back") is a paraphrase. The beat list quotes it as on-screen text, which is fine, but don't present it as the study's prompts. The spine says the clothing firm had three brands; the figure leaves the number out, which is harmless.
5. **The scenario's framing.** In the study, each consultant worked one set of tasks; nobody faced both or chose where to check. The figure's "two tasks, one check" setup is a constructed decision. The panel says so, but only in the collapsed section (problem 10).
6. **Published wording.** The spine notes the 2026 Organization Science version says "19% less likely". The figure quotes and cites the working paper, which is consistent.

Every number on the stage is in the spine except the "70%" rounding.
