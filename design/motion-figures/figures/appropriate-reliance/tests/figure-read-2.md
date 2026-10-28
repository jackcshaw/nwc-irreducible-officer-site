# Figure read, round 2: appropriate-reliance

Tester: cold reader acting as a first-time educator. I had not seen the storyboard, earlier tests, shots or other figures.
Method: served the motion-figures folder on 127.0.0.1:5263 and drove it with Playwright from the site's node_modules. Main viewport was 1280×900. I captured frames every 0.5 s at real speed from each Continue to the next gate and to the end. I did 8 full or partial plays (listed below), then leak, keyboard, print and viewport probes at 1280×720 and 390×844.

Plays:

| # | Gate 1 | Gate 2 | Purpose |
|---|---|---|---|
| 1 | Task B | Rely on it | My own calls |
| 2 | Task B | Move my check here | "Move" strategy |
| 3 | Skip | Skip | Skipping |
| 4 | Task A | Ask for a week to check both | Wrong first call, "ask for time" |
| 5 | Task A | Keep my check here | A-checker wording |
| 6 | Task A | Rely on it | "Rely on everything" (closest available) |
| 7 | Skip | (looked at options) | Gate-2 wording after a skip |
| 8 | Play pressed at each gate | — | What the Play button does at a gate |

---

## 1. Beat by beat (play 1, my own calls)

**Opening (0:25, beat 3 of 10, paused).** The page opens on the question, not on motion. There are two cards. Task A: "Segment the footwear industry market based on users." Task B: "Use a spreadsheet and insider interviews to pick the brand a clothing firm should back." Each card has a grey "AI's answer" band with a "Ready" tag. Each also has "If it's your team's first draft · Your call" and a "Check this one" pill. The footer reads "Time for one check · A check: work it yourself, then compare." The header strip reads "Dell'Acqua et al. · Field experiment, 2023 · 758 BCG consultants · some with GPT-4." The intro paragraph above explains the game clearly.
- At 1280×900 and at 1280×720, the caption line ("3 / 10 You have time to check one. Which one?") and the Continue button sit **below the fold** on first load. You can see the cards and the "Check this one" pills, but not the question or how to submit it. I had to scroll to find Continue.
- The bottom half of each card is empty at this stage, because space is held for later content. That empty space is what pushes the question below the fold.

**My gate-1 call: check Task B.** My reasoning: Task A is open-ended work that a language model does fluently, and a weak segmentation would be visible if I read it. Task B joins numbers to interview nuance and has one right answer that a fluent summary can hide. A wrong brand pick is the costlier miss.
- After I picked, Task B showed a red dot and Task A showed "You rely on it" in red. That was clear and immediate feedback.

**Beat 4 (~11 s), "A jagged frontier marks where an AI stops being reliable. Inside it, AI helped."** A jagged line draws down between the cards, labelled "Inside the frontier" (A) and "Outside the frontier" (B). About 8 s in, a stat row fades in on A: "With AI, across tasks inside the frontier: 12.2% more tasks · 25.1% faster · 40%+ higher quality."
- Picture and caption agree. The stat row arrives late in the beat, but there is time to read it.
- The figure states the term "frontier" but doesn't show how anyone decided where it sits. That's fine for a figure.

**Beat 5 (~12 s), "On Task B, consultants with AI were right less often. Graders still rated their work higher."** The picture dims and a panel rises: "Right answers on Task B: Without AI 84.5% · GPT-4 alone 70.6% · GPT-4 + overview 60%." A bracket under the two AI bars reads "Rated higher in quality, right or wrong." The panel then shrinks onto Task B's card and stays there.
- This is the strongest reveal. It taught me something: the wrong answers were *rated higher*, so reading the output would not have caught them.
- It raised a question the figure never answers: why did the group *with* the prompt-engineering overview do worst? A room of teachers will ask that.

**Beat 6 (~11 s), "Task A had no hidden facts. Task B's were in the interviews."** Under A: "No hidden facts / A weak answer shows when read." In B, "insider interviews" is underlined, with "The deciding details were in the interviews / The spreadsheet only looked complete."
- It taught the mechanism, which is the real lesson of gate 1. Caption and picture agree.

**Beat 7 (~12 s), "The evidence suggests relying on Task A and working Task B yourself from the interviews."** A key appears: "● Your calls" in red, "■ Suggested call · reasoned from the results" in navy. A gets a navy "Rely on it" tag plus "A check here leaves Task B unchecked." B gets "Work it from the interviews, then compare." My red call stays visible.
- My call matched the suggestion. Nothing says "you matched" or "you differed". You compare red with navy yourself. That works, but it's quiet.

**Beat 8 (gate 2, pauses ~5 s in), "Now your segmentation goes straight into the launch plan. What about Task A?"** A new line appears on A: "If it goes straight into the launch plan," with three pills: "Rely on it · Move my check here · Ask for a week to check both · Your call."
- The beat-7 "Rely on it" tag stays visible just above the new question. I read it as the previous condition's answer, which is fair. It does anchor you toward "Rely on it", which is the answer that loses.

**My gate-2 call: Rely on it.** My reasoning: the frontier didn't move. The figure had just told me a weak Task A answer "shows when read". My one check should stay where the AI is demonstrably weak (B), and I'd read A before it went in.

**Beat 9 (~12 s), "Same task, same side of the frontier. Now a miss gets built, and Task B still needs its check."** About 5 s in, a navy tag appears on A's second line: "Ask for a week to check both," with "Moving it leaves Task B to a read-through."
- The reveal half-taught me. I accept that stakes can change the call when reliability doesn't, and that was the point I missed. I'm not convinced "Rely on it" was wrong rather than different, for two reasons:
  - Beat 6 said a weak answer on A shows when read.
  - The week costs nothing on screen.
- The caption gives the reason but never names the call. The call itself is only in a small mono tag inside the card. Gate 1's reveal named the call in the caption ("The evidence suggests relying on Task A…"); gate 2's doesn't. Someone who reads captions and not cards could miss the gate-2 answer entirely.
- The phrase "read-through" appears here for the first time on stage. It is explained only in the expandable text below the figure.

**Beat 10 (~9 s, then hold at 1:54), "Faculty check: What evidence justified relying on the system here, and what would have changed the call? Change one condition and ask for the call again."** The controls become "Replay · Start over". The "After you make your call…" panel below the figure opens automatically, which is nice.

**Other paths.**
- **Play 4 (Task A first):** the reveal was clear and a little pointed. My red check sat on A next to "Rely on it / A check here leaves Task B unchecked", and B read "You rely on it" next to "Work it from the interviews". The wrong call was visible without any scolding.
- **Play 2 (B, then Move):** B's mark turned to a ring reading "Check moved to Task A." That was clear.
- **Play 3 (skip both):** both cards said "No call made" and the "Your calls" key was dropped. That's correct.
- **Captions are the same on every path.** Only the red marks change.

## 2. The point (my words)

AI help is uneven. Put your scarce checking where the AI is weak and its wrong answers still look good. When the output starts going straight into action, the call can change even though the AI's reliability hasn't.

## 3. The question a teacher should ask afterwards

"Where did your one check go, and what evidence put it there? Then the segmentation started going straight into the launch plan and nothing about the AI changed. What made you change your call, or keep it, and what would it have cost?"

## 4. The final frame alone

It mostly carries the idea. Both cards stay in place, along with:
- the frontier line and its inside/outside labels;
- the Task B accuracy bars with the "Rated higher in quality, right or wrong" bracket;
- both suggested calls in navy, with my calls in red;
- the faculty check.

Read top to bottom, Task A's card tells a small story: first-draft line, then "Rely on it", then the launch-plan line, then "Ask for a week to check both".

Weaknesses:
- The frame is dense with small mono caps labels.
- It doesn't say what the second call *cost*.
- Without the animation, nothing marks the launch-plan condition as a change rather than a second fact about Task A.

It says to me: "AI wins inside the line and quietly loses outside it; check where it loses; when stakes rise, buy more checking."

## 5. Problems, ranked

1. **The answers are one click away before any call (leak, high).** The "After you make your call: what a good answer says, the evidence, the tasks" disclosure sits right under the figure and opens at any time, by mouse or by keyboard (it's in the Tab order straight after beat 3). Its first paragraph gives both answers:
   - "That's where the one check belongs" (Task B);
   - "asking for a week is worth what it costs."

   The label asks you to wait; nothing enforces it. A curious teacher will open it. The beat list, scrubber and screen-reader summary are all locked until the calls are made, and this panel should be too, at least until both calls are made or skipped.
2. **The Play button silently skips a question (confusion, high).** The page opens paused at gate 1 with a prominent "▶ Play". Pressing Play at a gate carries on as if you'd skipped: both cards show "No call made" and the reveal runs. The same happens at gate 2. A first-time viewer's natural first move on a paused figure is to press Play, so many will lose the first question without knowing it existed. Play at a gate should either do nothing until you choose or skip, or prompt you.
3. **"Ask for a week" wins as a blanket strategy (fairness of the test, medium-high).**
   - Gate 1 does discriminate, though "check the more complicated-sounding task" also wins it.
   - At gate 2 the most cautious option, "ask for a week to check both", is the suggested call. Anyone who always picks maximum checking gets gate 2 right without thinking.
   - The figure never shows what the week costs (a launch slip, other work dropped), so on screen the option looks free.
   - A skeptical educator will also ask why time could be bought at gate 2 but not at gate 1.

   The expandable text argues the cost-benefit ("worth what it costs"), but the stage doesn't.
4. **Gate 2's reasoning partly contradicts beat 6 (ambiguity, medium).** Beat 6 says a weak Task A answer "shows when read". At gate 2, "Rely on it" loses because "a miss gets built". If a weak segmentation shows when you read it, why does going into the launch plan need a full check rather than a careful read? The figure needs to say what "rely" includes (does it include reading?), or say that a subtle miss on A doesn't show when read.
5. **The gate-2 answer lives only in a small tag (caption/picture split, medium).** Gate 1's answer is in the caption. Gate 2's caption gives the reason, and the call itself is only an 11-px mono tag inside Task A's card, shown about 7 s before the end beat. Naming the call in the beat-9 caption would make the two reveals consistent.
6. **The question is below the fold on load at desktop sizes (medium).** At 1280×900 and 1280×720 the first screen shows the cards and the "Check this one" pills, but not "You have time to check one. Which one?" or Continue. Clicking a pill gives local feedback and then nothing seems to happen until you scroll. The empty lower half of each card is the cause.
7. **Gate-2 wording doesn't fit every path (low-medium).**
   - After a gate-1 skip, gate 2 offers "Move my check here" when there's no check to move.
   - For someone who checked A, the options are "Rely on it / Keep my check here / Ask for a week". "Rely on it" doesn't say whether the check moves to B, and on screen B still reads "You rely on it", so that path ends with nothing checked on the launch plan and no comment.
   - The suggested-call note "Moving it leaves Task B to a read-through" doesn't match that path's option, "Keep my check here".
8. **Phone layout (390×844, medium for phone, which I understand is secondary).**
   - During autoplay the cards are above the viewport while the captions and controls stay in view, so a phone viewer reads beats 4–7 without seeing the frontier, the bars or the tags unless they scroll up.
   - At gate 2 the three options sit above the viewport. You see "What about Task A?" and a disabled Continue.
   - Focus does move to the first option, but without scrolling it into view.
   - The cards themselves are legible, and there is no horizontal scroll.
9. **"GPT-4 + overview" did worst, and nothing says why (low; the question will come up).**
10. **No "you matched / you differed" line (low).** The red-against-navy key does the job, but a one-line acknowledgement would help the people whose call differed.
11. **Fairness to the AI (low).** On stage, Task B is just "outside the frontier". Only the expandable text says the authors *designed* the task so that GPT-4 would get it wrong, and that the frontier moves with models. Viewers could generalize "AI is bad at spreadsheet-and-interview work" from the stage alone. A short "2023, GPT-4; task built to trip it" note on the stage would be fairer.
12. **Factual claims I'd want sourced:** 758 consultants; 12.2% / 25.1% / 40%+; 84.5% / 70.6% / 60%; "rated higher in quality, right or wrong"; "19 percentage points"; 18 tasks; designed so that GPT-4 would err. See the source check at the end.

Does each reveal teach? Yes for beats 5 and 6 (the core). Beat 4 mostly names things. Beat 7 confirms. Beat 9 half-teaches: the "stakes change the call" idea comes through, but the specific answer is hard to defend over "Rely on it" from what's on screen.

Do captions and pictures agree? Yes on every beat. The only drift is that gate 2's caption doesn't name the call shown in the tag, and "read-through" isn't defined on stage.

## 6. Leak audit (before a call)

| Vector | Leaks? | Notes |
|---|---|---|
| "After you make your call…" disclosure | **Yes** | Opens anytime and gives both answers in its first paragraph. Reachable by Tab. |
| Play button at a gate | No answer leak, but skips | Proceeds with "No call made" and shows the reveal (see problem 2). |
| `?t=` URL | **Yes** | `?t=50` shows the Task B bars at gate 1 with no call. `?t=95` and `?t=110` show both suggested calls, with the disclosure auto-open at 110. Needs URL knowledge, so it's low for first-timers, but any shared deep link with `?t=` spoils the game. `#t=`, `?end`, `?beat=9` and `?poster` don't leak. |
| Print preview | Partial | Page 1 poses only question 1 ("The answer follows on the next page."). Page 2 shows the gate-2 question *with* its answer, so the second call is never posed on its own in print. Page 2 also carries the full beat list and the "What a good answer says" text. As a handout design that's reasonable; it just loses gate 2. |
| Beat list | No | Beats after the gate read "Make your call to see this." and are disabled. After gate 1, beats 9–10 stay locked. |
| Scrubber (click, drag, End, PageUp, arrows) | No | Clamped at the current gate (25.5 at gate 1, 86 at gate 2). |
| Beat buttons (incl. forced click) | No | Disabled. |
| Global End key | No | |
| Screen-reader summary / a11y tree | No | The summary says the rest "appear[s] after you answer or skip each question". The gate-2 group and the hidden captions aren't exposed at gate 1. |
| `?reduced` and prefers-reduced-motion | No | Opens at gate 1. |
| Page source / DOM | Yes, but view-source only | Hidden paragraphs such as "After the second question: the suggested call is to ask for a week to check both…" and all later captions are in the DOM, hidden from the a11y tree. Dev-tools level. |
| Network | No | No data file is fetched (no branches.json request). |
| localStorage / sessionStorage | No | Nothing is persisted, so a second viewer on the same browser starts clean. |

## 7. Pacing

- The page opens paused at the gate, so there is no wait before the first decision. "Start over" plays beats 1 (about 15 s, slow for "Two tasks from one study.") and 2 (about 6.5 s) before pausing again.
- From Continue at gate 1 to the gate-2 pause takes about 47 s: beat 4 ~11 s, beat 5 ~12 s, beat 6 ~11 s, beat 7 ~12 s, beat 8 ~5 s.
- From Continue at gate 2 to the final hold takes about 22 s.
- Captions run 9–18 words and each holds 10–12 s, so nothing changed before I'd read it. If anything, beat 4 feels long for a one-line caption, though the late stat row uses the time.
- The beat-5 panel animates in about 3 s and holds long enough to read all three bars and the bracket.
- The gate-2 tag appears about 5 s into beat 9 and stays through the end, which is enough.

## 8. Mechanical checks

- **Reduced motion** (`?reduced` and the prefers-reduced-motion media query): it opens at gate 1, which is correct for an interactive figure. After each call it jumps straight to the next state and lands on the final frame. The full stage text, the faculty check, and every beat with an "On screen:" description are expanded. Pass.
  - Note: in reduced mode the stage skips the beat 4–7 captions and goes straight to beat 8. Their text is only in the beat list.
  - Note: "Replay" in `?reduced` plays animated from 0:00.
- **Horizontal scroll at 390px:** none (scrollWidth 390 at load and at the end).
- **Keyboard:**
  - Tab order from the top: logo, Essay, Practice, the gate-1 radio group (Task A; arrows move to B), Continue (only once enabled), Skip, Play, Start over, scrubber, unlocked beat buttons, then the disclosure.
  - Focus rings are visible on the radios and buttons.
  - Space selects a radio, and Enter on a radio submits.
  - After Continue, focus moves to the Pause toggle. Pressing Space or Enter again just pauses, which is harmless.
  - At gate 2, focus moves to "Rely on it", but only if focus was already inside the figure. A mouse user who had scrolled away was not yanked back. The live region announces "Question 2. Now your segmentation goes straight into the launch plan. For Task A, choose…, then press Enter or Continue." The radio group is named "If your segmentation goes straight into the launch plan, Task A".
  - Play, pause and scrub are all reachable by keyboard; scrubbing is clamped at the gates.
  - Risk: from the Pause toggle, a keyboard user who reaches a gate with focus still on the toggle and presses Enter will skip that question (problem 2).
- **1280×720:** gate 1 needs a scroll to reach the question and Continue. Once scrolled, gate 2 fits: the options, caption and Continue are all visible in one screen.
- **390×844:** gate 1 fits after scrolling (pills, question and Continue). During play the stage is off-screen above the captions. At gate 2 the options are above the viewport. There is no horizontal scroll and the end frame is legible.
- **Numbers:** see the source check below.

---

## Source check against `sources/source-spine.md` (done after writing the above)

Every number on the stage and in the expandable text appears in the spine entry "Dell'Acqua, Mollick, et al., Navigating the Jagged Technological Frontier" under "Jagged Frontier And Uneven AI Capability".

| Claim on page | In spine? |
|---|---|
| 2023 field experiment, 758 BCG consultants, some with GPT-4; three arms (no AI / GPT-4 / GPT-4 + prompt-engineering overview); two task sets | Yes |
| Inside the frontier: 12.2% more tasks, 25.1% faster, "40%+" / "more than 40%" higher quality | Yes |
| 18 product-development questions, fictional footwear company, market segmented by users | Yes |
| Task B: clothing company's CEO, brands, spreadsheet plus insider interviews; spreadsheet designed to look complete; deciding details in the interviews; designed so that GPT-4 would get it wrong | Yes. The spine says "three brands"; the page says "its brands" and paraphrases the task on stage, which it discloses. |
| 84.5% / 70.6% / 60% right on Task B | Yes |
| "19 percentage points less likely to produce correct solutions" | Yes, working-paper wording. The spine notes the published version (Organization Science, 2026) says "19% less likely". The page cites the working paper, so that's consistent. |
| Graders rated AI users' work higher "regardless of the correctness of their answer" / "Rated higher in quality, right or wrong" | Yes |
| HBS working paper 24-013 | Yes |
| Essay quotes (trust vs. reliance; "pattern recognition") and the Raees & Papangelis 2026 citation | The quotes are verbatim in `the-irreducible-officer.md` §V. Raees and Papangelis is in the spine (arXiv 2604.23896). |

Flags (not errors in the numbers, but claims the spine doesn't carry as stated):

1. **"No hidden facts / A weak answer shows when read" (beat 6, on Task A's card) is the figure's inference.** The spine doesn't say it. It is shown in the same style as the factual annotation on Task B ("The deciding details were in the interviews"), which *is* in the spine. The calls are labelled "Suggested call · reasoned from the results". This annotation has no such label, so a viewer will take it as a study finding. The expandable text does say "This is the figure's reasoning from the study's results", but that sits below the figure and starts collapsed.
2. **"A jagged frontier marks where an AI stops being reliable"** is a fair simplification of the spine's "improve performance on some knowledge-work tasks and degrade it on others". "Stops being reliable" is a bit stronger than "degrade".
3. **Arithmetic a teacher may try.** Right after the three bars, the expandable text says "19 percentage points less likely". 84.5 − 70.6 = 13.9 and 84.5 − 60 = 24.5. The 19 is the pooled AI groups against the control, roughly the mean of the two. Saying "pooled across both AI groups" would head off the "that doesn't add up" moment.
4. **"Time for one check", "ask for a week", and the launch-plan condition are the figure's own constructions.** The expandable text says so ("the choice of where to spend one check, and the launch-plan condition, are this figure's"). Nothing on the stage says so.
