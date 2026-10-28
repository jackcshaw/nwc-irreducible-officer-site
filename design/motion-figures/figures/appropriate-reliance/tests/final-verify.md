# Final verification: appropriate-reliance

October 28, 2026. Report only: nothing in the figure, runtime or other figures was edited.

**How it was run.** `motion-figures/` was served on 127.0.0.1:5317, which was stopped afterwards. Playwright came from the site-motion `node_modules`. Readers' paths were driven by clicks, taps and keys, without the `?t=` hook. Real-time play-throughs ran at 1440×900, 1280×720 and 390×844. Stills for specific branches used `?t=0&calls=…` and the export `seek`. No run logged a console error or page error.

| # | Item | Result |
|---|------|--------|
| 1 | No leaks before a call | **Pass** (one note) |
| 2 | Play at an unanswered question | **Pass** |
| 3 | Question 2's suggested call | **Pass** |
| 4 | Reasoning labelled | **Pass** |
| 5 | First view and phone | **Fail** (phone only: cards and captions partly below the fold) |
| 6 | Numbers | **Pass** |
| 7 | Regression, other seven figures | **Pass** |
| 8 | Final frame | **Pass** |

## 1. No leaks before a call: pass

- **Panel.** On load, `#ar-after` is hidden and the line "After you make your call: make or skip both calls to open this." shows. The panel stays hidden after question 1. It opens after both questions are answered (b, then rely) and also after both are skipped. Start over locks it again.
- **`?t=50`, `?t=95`, `?t=110`.** Each one holds at 25.5 s with question 1 open and the caption "3 / 10 You have time to check one. Which one?". Beats 4–10 are locked and the panel is hidden.
- **Beat list.** Beats 4–10 show only "Make your call to see this." and are disabled. After question 1, beats 9–10 stay locked.
- **Scrubber.** Setting the value to 110, pressing End and pressing Shift+→ thirty times all leave the figure at 25.5. After question 1, the same moves stop at 88.0, which is question 2.
- **Beat buttons.** Clicking beat 10 does nothing. Re-enabling beat 6 by script and clicking it still holds at 25.5 because of the runtime lock.
- **Screen-reader summary.** `sum2` and `sum3` stay hidden until their questions are resolved. The aria snapshot of the page at question 1 has none of the 18 spoiler strings tested.
- **Tab order at question 1.** It runs: links, option A, Skip, Play, Start over, scrubber, beats 1–3, then the links below the figure. Nothing in it reveals an answer.
- **Print.** This was tested both with `page.pdf()` and with `beforeprint` plus print media. Page 1 shows only the question frame and "The answer follows on the next page". Page 2 is the final frame, with the faculty check in the caption. "What a good answer says", "Evidence" and "About the tasks" print on page 4, after the figure. The page returns to question 1, still locked, after `afterprint`.
- **Note (outside the channels listed).** At desktop widths every SVG label exists from the moment the figure mounts, at opacity 0 (`appropriate-reliance.js` lines 105–227). The SVG is `aria-hidden`, so screen readers don't read it. However, `window.find` (a proxy for find-in-page) and `innerText` both match strings like "84.5", "Rely on it" and "No hidden facts". The invisible text layer of the printed PDF's page 1 also carries them. The stacked stage is clean, because its later parts use `display:none`.

## 2. Play at an unanswered question: pass

- **Question 1.** Pressing Play, by click or by Space on the button, keeps t at 25.5. It shows "Make your call first, or skip this question." and announces the same text in the live region. Focus moves to option A.
- **Question 2.** The same happens: t stays at 88, the prompt shows and focus goes to "Rely on it".
- **Labels.** Pressing Play leaves both labels at "Your call". Only Skip changes them to "No call made", on both cards at question 1 and on Task A's second line at question 2. Once a call is chosen, Play continues.

## 3. Question 2's suggested call: pass

- **Tag and caption.** The tag reads "RELY ON IT · READ IT BEFORE IT'S BUILT". The beat 9 caption reads: "Still inside the frontier: rely on it, and read it before it's built. Task B needs the check."
- **Costs at 1440.** "TASK B: READ-THROUGH ONLY" sits beside the move pill: its centre is at y 569, the same as the pill's, and it starts 11 px to the right. "LAUNCH SLIPS A WEEK" sits beside "Ask for a week": centre at y 599 against the pill's 600, starting 11 px to the right. On the stacked stage each cost line follows its own option.
- **Choosing "Rely on it".** The pill keeps the same red dot and 1.8 stroke as any other chosen pill, with no wrong-answer marking. The live verdict ends "You chose to rely on it after a careful read."

## 4. Reasoning labelled: pass

On the SVG, Task A carries the label "WHAT THE EVIDENCE SUGGESTS" in mono. Directly under it is "No hidden facts: a weak answer shows when read." in italic serif. Task B's study lines are plain mono with no such label. The stacked stage, the beat 6 caption and detail, `sum2` and the page copy all frame Task A's line as what the evidence suggests.

## 5. First view and phone: fail (phone only)

- **1280×900: pass.** The SVG runs from 176 to 696 px, the caption from 696 to 832, Continue from 780 to 820 and the controls from 832 to 897. The page doesn't scroll (scrollY is 0), and choosing an option doesn't scroll it either.
- **1280×720: pass.** The figure switches to the compact stacked stage, from 176 to 449 px. The caption runs from 449 to 585 and Continue from 533 to 573. scrollY is 0.
- **Keyboard: pass.** This was tested at 1440×900, 1280×720 and 390×844, using Tab, Enter at Play, an arrow or Space to choose, and Enter to continue, through both questions. Focus moved from the Play button to the options, then back to Play, then to the question 2 options, then to Play again. A per-frame check never found focus on the page body after the first Tab. At the end, focus is on the button, which reads Replay.
- **390×844, question 2's options: pass.** The options run from 293 to 438 px, Continue sits at 792–832, and focus is on "Rely on it".
- **390×844, cards in view during play: fail.** Measured during play:
  - *Beats 4–7, after Continue (scrollY 209).* Card A runs from 92 to 927 px and card B from 92 to 820. Card A's "12.2% / 25.1% / 40%+" lines sit at 855–918 px, below the 844 px fold, while beat 4 introduces them. The caption band (1013–1195) and the controls (1195–1314) are entirely below the fold for beats 4–7.
  - *Beats 9–10, after question 2 (scrollY 562).* Both card tops are at −261, so the task text and the beat 6 tags are above the fold. The caption runs from 813 to 995, so the beat 9 caption and the final faculty check sit below the fold.
  - *Locations.* `showPicture()` (lines 660–664) scrolls only to the top of the stacked stage. The phase-3 growth after question 2 (CSS line 51, `renderNarrow` line 470) pushes the caption down, and nothing scrolls after it. Card A's evidence block (`N.a.ev`, lines 427–429) sits at the bottom of a 835 px card.
  - The phone layout is secondary for this project. Everything else in this item passes.

## 6. Numbers: pass

Everything below matches `sources/source-spine.md`:

- 758 BCG consultants and the 2023 study date.
- 12.2% more tasks, 25.1% faster, and more than 40% higher quality (shown as "40%+").
- 84.5% right without AI ("about" in the Evidence section), 70.6% with GPT-4 alone, and 60% with GPT-4 plus the overview, with the bars drawn in proportion.
- "19 percentage points less likely to produce correct solutions" and "regardless of the correctness of their answer".
- The 18 product-development questions: the press release, "a persuasive memo", and the task built so that GPT-4 would get it wrong.
- HBS working paper 24-013, and the Raees & Papangelis link.

Two notes:

- The Evidence section adds "with the two AI groups pooled". The spine doesn't say this, but the paper does ("when combining the AI treatment conditions", `BCG-VERIFY.md` line 78).
- The tasks section says "which of its brands" where the spine says "three brands". That is an omission, not a contradiction.

## 7. Regression: pass

Each of the seven figures was loaded at 1440×900 with the page starting below the figure. Results were the same for all seven:

- The figure mounted and did not play while out of view.
- Scrolled in, it played: t went from 1.5 to 2.5 and the button read Pause.
- Scrolled out, it paused: t held at 2.5 and the button read Play. It did not resume by itself when scrolled back in.
- With `?t=duration−2.5`, pressing Play ran it to the full duration, ending with state `ended`, the button reading Replay, and the faculty check showing.

| Figure | Duration | Beats |
|---|---|---|
| frame-capture | 86.2 s | 11 |
| fluency-substitution | 88.6 s | 10 |
| premature-synthesis | 90 s | 10 |
| uncalibrated-reliance | 90.6 s | 10 |
| invisible-delegation | 90.5 s | 9 |
| institutional-monoculture | 96.3 s | 11 |
| responsibility-laundering | 93.2 s | 9 |

## 8. Final frame: pass

The caption reads "FACULTY CHECK", then "What evidence justified relying on the system here, and what would have changed the call?", then "Change one condition and ask for the call again." (`mf-follow is-equal`).

The check and the follow-up are both italic Source Serif 4 at the same size: 23 px at 1440 and at 1280×720, and 20 px at 390. Nothing is clipped by the caption band. The final frame is the same in the reduced-motion path. At 390 it lands below the fold (see item 5).

## Re-verify

October 28, 2026. Report only: nothing in the figure, runtime or other figures was edited.

**How it was run.** `motion-figures/` was served on 127.0.0.1:5341, which was stopped afterwards. Playwright came from the site-motion `node_modules`. Every run used the reader's path, with clicks, taps and keys, in real time, without `?t=`. The phone runs used a 390×844 mobile context with touch. The text audit checked three things for each string: `document.body.innerText`, `window.find` (a proxy for find-in-page), and every element of the full DOM whose `textContent` contains the string. Each DOM hit was then sorted with `checkVisibility()` into one of five groups: not rendered (`display:none` or `[hidden]`), `visibility:hidden`, rendered at opacity 0, rendered in an `sr-only` element, or visible. It tested 41 strings: the first suggested call ("Rely on it" as a tag, "Work it from the interviews", "Suggested call", "A check here leaves Task B unchecked"), the reveal text (frontier labels, all six numbers, the bracket, both evidence lines, the launch-plan condition, "Check moved to Task A") and the second call's answer ("read it before it's built", "read-through only", "launch slips a week", "Task B needs the check", "still inside the frontier", "You chose").

| # | Item | Result |
|---|------|--------|
| 1 | No hidden spoiler text | **Fail**: one leak after Start over, in the live region |
| 2 | Phone fold, 390×844 | **Pass** |
| — | First view, 1280×900 | **Pass** |
| — | frame-capture still plays | **Pass** |

### 1. No hidden spoiler text: fail (one leak)

- **Question 1, before any call (1440×900 and 390×844): clean.** No string appears in `innerText` or find-in-page. No rendered node carries one, including at opacity 0 and in `sr-only` elements. The `lazy()` fix works: at desktop widths the SVG holds no answer text until its moment.
- **Question 2, before the second call (both sizes): clean** for the second answer, by the same three measures. The live region holds only the question 2 prompt.
- **After Start over: fail.** The SVG, the stacked stage, the beat list (beats 4–10 locked again), `sum2`, `sum3` and `#ar-after` all clear or re-lock at t = 0. The live region `[data-ar-live]` doesn't. It still holds the second verdict: "Suggested call: Task A is still inside the frontier, so rely on it, and read it before it's built. Task B needs the check. Moving the check leaves Task B to a read-through only; asking for a week slips the launch a week. You chose …". The element is `sr-only` and rendered, so `innerText`, find-in-page and a screen reader in browse mode all reach it. This was the same at both sizes. It lasts from Start over until question 1 reopens at 25.5 s, when `say(ASK(0))` replaces it. The Start over handler (`appropriate-reliance.js` lines 781–786) resets the calls but not `live.textContent`. Pressing Start over after question 1 alone would leave the first verdict there in the same way.
- **What the full DOM text still holds.** A raw `textContent` search still finds every tested string at question 1, and the second answer at question 2. Every hit is in a container that isn't rendered:
  - the stacked stage: all of it at desktop widths, and its phase-gated parts on phones;
  - the locked beat entries;
  - `sum2` and `sum3` while they are `[hidden]`;
  - `#ar-after` while it is `[hidden]`;
  - the question 2 hit targets;
  - on phones, the evidence overlay, which is `visibility:hidden`.

  CONVENTIONS line 208 accepts text in `display:none` or `[hidden]` containers, and no reader-facing channel reaches it. If the bar is literal `textContent`, this is a second failure.

### 2. Phone fold (390×844): pass

There were three play-throughs: taps choosing B then "Rely on it", taps choosing B then "Move my check here", and keys choosing A then "Keep my check here". Each was sampled every frame. In each window below, the key content had settled after its reveal. In 100% of frames, in all three runs, it sat between the top of the viewport and the top of the sticky caption band (y 543). The caption (543–725) and the controls (725–844) were fully on screen in every frame.

| Window | Key content (viewport y) |
|---|---|
| Beat 4, frontier labels | 54–88 |
| Beat 4, card A's numbers | 411–535 (were 855–918) |
| Beat 5, Task B panel | 8–203; settled into card B at 316–529 |
| Beat 6 | B's evidence line 8–110, then A's labelled line 8–99 |
| Beat 7 | "Rely on it" with its note 303–380; "Work it from the interviews" 333–403 |
| After question 2 | the condition 319–389; chosen pill 393–436 or 440–484 |
| Beat 9 | chosen pill 242–333; both cost notes 337–371 and 424–458; the suggested-call tag 464–535 |
| Beat 10 | faculty check in the caption band; nothing moves |

- **Scroll moves were smooth.** Every follow-scroll was animated over 67–300 ms. The largest was 383 px over 300 ms at 36.75 s, bringing card A's numbers in, with a peak of 80 px per frame. The single instant scroll is 67 px when question 2 opens (`presentGate` scrolls with `behavior: 'auto'`). It happens while the figure is stopped, as focus moves to the options.
- **Layout moves only on Continue.** At question 1's Continue, the stage grows into phase 2: the cards drop 38 px and the chosen pill drops 134–145 px, then the page scrolls smoothly to the top of the stage. At question 2's Continue, card A's evidence block drops 154 px and "Ask for a week" drops 40 px. Chromium marks both as input-driven layout shifts. The caption band and the controls never moved during play. In the tap runs the band moved 18 px once, at question 1's Continue.
- **Focus was never lost.** Focus was on the page body only at load, before any input. After that it went to the chosen option, then to Play/Pause after Continue, to "Rely on it" when question 2 opened, and to Replay at the end. The figure never paused itself during play.
- **Note (outside this item).** On the phone's first view at scrollY 0, Task B's "Check this one" target (y 524–564) sits 21 px under the sticky caption band, and its centre is covered. It takes a small scroll to tap. Phone is secondary for this project.
- The fold runs logged one page error, "Cannot read properties of undefined (reading 'toLowerCase')". It came from the test's own layout-shift logger, which called `tagName` on a text node. The audit runs drove the same 390 px path without the logger and logged no errors.

### First view at 1280×900: pass

The SVG sits at 176–696 px, the caption ("3 / 10 You have time to check one. Which one?") at 696–832, Continue at 780–820 and the controls at 832–897. scrollY stayed 0 across 3 s after load and after an option was chosen.

### frame-capture: pass

The figure showed its poster (t 14) until it was in view. Scrolled in, it played: t went from 2.5 to 4.0 and the button read Pause. Loaded with `?t=83.7` and played, it ran to 86.2, ended with the button reading Replay, and showed the faculty check. It logged no errors.
