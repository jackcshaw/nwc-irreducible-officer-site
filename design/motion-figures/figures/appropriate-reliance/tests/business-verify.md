# Verification: appropriate reliance, business edition, final fixes

Checks the round 3 fixes (commit 63febca) requested by `tests/business-figure-read-2.md`, against `storyboard-business.md`. October 29, 2026.

**Method.** I served `motion-figures/` on port 5367 and drove headless Chromium with Playwright. Each play ran in real time, with a sampler inside the page every 100 ms. It recorded the caption band and every text on the stage (drawn or stacked) with its effective opacity. Screenshots were taken every 3 s and at each question and at the end. Full-height phone frames are stills taken through the export hook, which isn't a reader route. Scripts and output are in the session scratchpad under `ar-biz-verify/` (`play.mjs`, `pace.mjs`, `leak.mjs`, `stills.mjs`).

## Verdict

| Check | Result |
| --- | --- |
| 1. Caption 7 separates finding from call; Task A's reason marked as reasoning | **Pass** |
| 2. Bar labels, "tips" explained, uncertain gap noted on screen | **Pass**, with notes |
| 3. Beat 9, the closing rule and the follow-up say "details AI tends to miss" | **Pass** |
| 4. "Go further" in business wording; military education once | **Pass** |
| No route reveals an answer before the reader commits | **Pass** on every screen route. Print follows its documented design: the question on page 1 and the answers from page 2. See the notes. |
| Pacing: (words ÷ 3) + 1.5 s | **Pass**: no short stretch in 11 plays |
| No horizontal scroll at 390; no console errors | **Pass** |
| PME edition plays; its gates work | **Pass** |

No blocking defects. The low-severity loose ends are listed at the end.

## Plays

| Path | Viewport | Question 1 | Question 2 | Key at the end |
| --- | --- | --- | --- | --- |
| My calls | 1280×900, 1280×720, 390×844 | Check Task B | Rely on it, after a careful read | First draft: matches · Launch plan: matches |
| Always check | 1280×720 | Check Task A | Ask for a week to check both | differs · defensible |
| Always check | 390×844 | Check Task B | Ask for a week to check both | matches · defensible |
| Always check | 1280×900 | Check Task A | Keep my check here | differs · differs |
| Never check | 390×844, 1280×720 | Skip | Skip | no call · no call |
| Never check | 1280×900 | Skip | Rely on it, after a careful read | no call · matches |
| PME | 1280×900 | Check Task B | Rely on it, after a careful read | (PME key: "Your calls") |
| PME | 390×844 | Check Task A | Move my check here | (PME key) |

**My calls.** Check Task B. Its answer turns on reading the interviews against a spreadsheet, so a finished-looking pick can be wrong in a way a read-through won't catch. A segmentation draft can be judged by reading it. For the launch plan, rely on Task A after a careful read. Every path reached question 2 and the end. Each one took about 88–94 s of wall time, so playback ran in real time.

## 1. Caption 7 and Task A's reason: pass

- **Caption 7**, at all three sizes: "AI helped on tasks like A. The suggested call: rely on A, work B yourself." That's 15 words, on screen for 12.9 s against 6.5 s needed. The first sentence is the study's finding. The second is labelled as the call. The key "SUGGESTED CALL · REASONED FROM THE RESULTS" appears during the caption, at 74.4 s player time.
- **Final frame, Task A:** "REASONING: READING IS ENOUGH" over the italic "No hidden facts: a weak answer shows when read." The same label is on screen at 1280×900, 1280×720 and 390×844 (stacked: "Reasoning: reading is enough", set in capitals by CSS, over italic serif). It is also in reduced motion and on print page 2. Task B's line keeps the plain style of a study finding ("THE DECIDING DETAILS WERE IN THE INTERVIEWS").
- Not in scope, unchanged: caption 6 still reads "Task A, the figure reasons, has none." (cold read 2, problem 9).

## 2. The bars: pass, with notes

- **Labels.** "Without AI / With GPT-4 / With GPT-4 + tips" on the drawn stage, and "With GPT-4 + prompting tips" on the stacked stage. "GPT-4 alone" is gone from the business page; the only "alone" left is "wrong answers alone" in Evidence.
- **Final frame, under the bars.** Desktop: "TIPS: A SHORT PROMPTING OVERVIEW" and "THE GAP BETWEEN THE AI GROUPS IS UNCERTAIN". Phone: "Tips: a short prompting overview." and "The gap between the two AI groups is uncertain." Both notes sit inside Task B's card with no overlap at all three sizes.
- **Notes.**
  - (a) Both explanations arrive only with the final frame. From the bars' reveal (48 s player time) to the last beat (111 s), "tips" is unexplained on the stage. That's about 60 s of play, including the second question. Beat 5's beat-list entry explains it once it unlocks.
  - (b) On the stage, the caveat is "uncertain". The 10% level is stated only in Evidence. I count that as "or similar".
  - (c) At 390 the sticky caption band covers the notes in the final frame until the reader scrolls. This was already so (cold read 2, problem 11).

## 3. The closing rule: pass

- **Beat 9:** "Inside the frontier: rely on it, read it first. Details AI tends to miss would move the check." That's 18 words, on screen for 11.8 s against 7.5 s needed.
- **Follow-up**, in the last caption and in the page's Reviewer's check section: "Change one condition, like details AI tends to miss, and ask again."
- **Live region** (the second suggested call) and **screen-reader summary, part 3:** "Details AI tends to miss would move the check."
- **What a good answer says:** "…a detail the AI tends to miss: if the segmentation turned on something buried in the source material, as Task B's answer did…". That is consistent with Task B, where the deciding details were in the interviews.
- **"couldn't see"** appears nowhere in the rendered business page at the end of any path, and nowhere in `editions/business.json`.

## 4. Go further: pass

What the page renders:
- **Note:** "The skill and the reviewer's question come from an essay on judgment with AI. This page shows them with the consulting tasks from the study it cites."
- **Links:**
  - "The study: Dell'Acqua et al. (2023), HBS working paper 24-013".
  - "See the failure: Uncalibrated reliance", which goes to `../uncalibrated-reliance/?edition=business` (HTTP 200).
  - "The original essay, written for military education: The Irreducible Officer, Section V".

Military education is mentioned once in this section. For awareness, it also appears outside the section, which is out of scope: the edition switch ("Military education"), the note under "How this figure works" ("Military education: the original example from *The Irreducible Officer*, the National War College essay."), and the header's "Essay" link.

## No reveal before the reader commits

`leak.mjs` ran at 1280×900, 1280×720 and 390×844. Business: 96 checks pass. Three flagged items were a false positive in my test, explained under "At question 2" below.

- **Arrival.** `body.innerText`, the accessibility tree and `window.find` (a stand-in for find-in-page) contain none of 30+ answer strings (results, frontier, reasoning, suggested calls, tips, verdicts).
- **Play at question 1** holds at 0:28 and shows "Make your call first, or skip this question."
- **Scrubber.** End, ArrowRight ×10, PageUp, a value of 110 with an input event, and a mouse drag to the right end all stay at 28.5 s.
- **`?t=`.** 50, 75, 110, 120.9, 1:40 and 200 all land on question 1 with no answer text.
- **Beat list.** Entries 4–10 are disabled, and a click dispatched on a locked entry does nothing. At question 2, entries 9–10 are locked and 4–8 are open.
- **Screen reader.**
  - At question 1, summary parts 2 and 3 are `hidden`; at question 2, part 3 still is.
  - The SVG and the stacked stage are `aria-hidden`, and the disclosure is hidden.
  - The live region reads only the question.
- **Reduced motion** (`?reduced` and `prefers-reduced-motion`). It opens on question 1. Continue steps to question 2, which shows no question-2 answer. A click on locked beat 10 stays at question 2. The final frame comes only after both calls.
- **At question 2.** No question-2 answer appears anywhere. The flagged string, "the gap between the two AI groups is uncertain", comes from summary part 2. That part unlocks with question 1 and describes Task B's evidence, not the launch-plan call.
- **Print at question 1** (`page.pdf` with print media, 1280×900).
  - Page 1 is the question frame with "The answer follows on the next page.", and its text layer holds no answer string.
  - Page 2 is the final frame, with "no call" in the key. Later pages carry the unlocked text.
  - After printing, the screen is back at question 1, still locked.

  This is the documented print design (CONVENTIONS.md, "Question before answer"), and PME behaves the same way. But a reader who opens print preview at question 1 can see page 2. Please confirm that's intended.
- **A hint, not an answer (low).** The page's Reviewer's check section is visible below the figure before any call. It reads "Change one condition, like details AI tends to miss, and ask again." That names the principle behind both suggested calls before the reader commits. PME's line names no condition. Decide whether that's acceptable, or show the follow-up only once both calls are made.

## Pacing: pass

- **Method.** I took every continuous stretch in which a caption or stage text was at opacity 0.5 or more, and compared it with (words ÷ 3) + 1.5 s. Each stretch was measured in both player time and wall time, and the smaller value counts. Stretches that include a question, or run into the final frame (which rests), are paced by the reader.
- **Result.** No stretch was short: 9 business plays, about 100 stretches each, plus 2 PME plays. The smallest margins:
  - At 390, the evidence panel's "Rated higher in quality, right or wrong": 4.8 s against 3.8 s. The same line then stays in Task B's slot.
  - On desktop, "40%+ higher quality": 6.1 s against 2.2 s.
  - On the skip-then-rely path, the "YOUR CALLS" key: 3.8 s against 2.2 s, before it becomes the verdict line.
- **Last beat.** The verdict key, the bar notes, the check and the follow-up come in between 111.3 s and 116.4 s player time and then stay.

## Mechanical

- **Horizontal scroll at 390:** none. `scrollWidth` was 390 in every 100 ms sample of all four plays at 390, and in the leak runs.
- **Console:** no errors or warnings in any of the 11 plays or the 198 leak checks (business and PME).

## PME edition: pass

- **Plays.** PME plays to the end at 1280×900 (Task B, rely) and 390×844 (Task A, move) with no errors. Its wording is intact: "Faculty check", "GPT-4 alone", "GPT-4 + overview", "WHAT THE EVIDENCE SUGGESTS".
- **Gates.** The same checks as for business: 99 of 99 pass.
- **Regression** (`ar-regress.mjs diff` against `regression/baseline`). 1245 of 1246 frames are identical, and none of the 32 text states differs. The one differing frame (1440×900, t = 20.00) is a single pixel off by 1–2 colour levels. I captured that frame six more times with the same code: five matched the baseline byte for byte and one matched the variant. So it's raster noise; `frame-diff.mjs` launches without `--disable-partial-raster`.

## Loose ends (low, none blocking)

1. **`storyboard-business.md` is partly stale.**
   - Line 47 says beats 0–5, 7 and 8 have the same words in both editions. Round 3 changed beat 7's caption and beat 5's bar labels.
   - The table at lines 52–57 still shows "WHY READING IS ENOUGH" and "Facts the AI couldn't see".
   - Line 74 still gives the old Go further note ("an essay about judgment in military education").
   - Line 76 says military appears only in the essay label and note.
   - Line 142 says Task A's line is labelled "What the evidence suggests".
2. **Desktop and phone copy differ** (cold read 2, problem 12, still present): the desktop note is "DEFENSIBLE · A WEEK LATE", the phone note "Defensible · launch slips a week" (`business.json`, `noteTime`, lines 87 and 130).
3. **The pre-commit hint** in the Reviewer's check section (above).
4. **Print preview at question 1** shows the answers on page 2, by design (above).
