# Appropriate reliance: business edition

Motion figure 8 of 8 · slug `appropriate-reliance` · `editions/business.json`, workplace cast · October 28, 2026

**Example.** The study's own consulting tasks, as built (BUSINESS-EXAMPLES.md §8, approved). Dell'Acqua et al. (2023) ran the field experiment with BCG consultants on business tasks, so the PME scenario already is the business scenario. This edition is a cast change plus fully business page copy.

**Core change: none.** The timeline, picture, gates, locks, `?t=` clamping, the hidden-answer rule, the screen-reader summary and Start over are shared with PME. The contrast doesn't endorse anything the study found wrong. The suggested calls follow the finding: rely on Task A (inside the frontier, where AI helped) and spend the one check on Task B (outside it, where AI users were right less often and still rated higher).

## The workplace check, for Jack

> **Reviewer's check:** What evidence justified relying on the AI here, and what would have changed the call?
> Change one condition and ask for the call again.

The question is the EDITIONS-PLAN.md draft, word for word. PME says "relying on the system", and this says "relying on the AI". The follow-up is unchanged and set at the same size, so it keeps its equal weight. The heading comes from the cast (`{check}`).

## Words that differ from PME, beat by beat

Every picture word is the same in both editions: the tasks, labels, results, options, costs and suggested calls. So are beats 0–9.

| Beat | PME | Business |
| --- | --- | --- |
| 10 · caption | "Faculty check: What evidence justified relying on the system here, and what would have changed the call?" | "Reviewer's check: What evidence justified relying on the AI here, and what would have changed the call?" |
| 10 · check band | FACULTY CHECK / "…relying on the system here…" | REVIEWER'S CHECK / "…relying on the AI here…" |
| Screen-reader summary, part 3 | "The figure ends on the faculty check." | "The figure ends on the reviewer's check." |
| Live region | Same | Same |

## Page copy (business)

- **Top:** kicker, title and lede are unchanged ("The skill", "Appropriate reliance", "You have time to check one of two AI answers…"). The lede stays one line so the first view still fits the live question.
- **Faculty check section** becomes "Reviewer's check", with the workplace question and the same follow-up.
- **How this figure works** (the figure's fuller setup, below it): "two consulting tasks from a 2023 field experiment", ending "Illustration based on Dell'Acqua et al. (2023): the tasks and results are the study's, and the time budget, the first draft and the launch plan are this figure's."
- **After you make your call** (still locked until both calls are made, since it states the answers):
  - *What a good answer says:* unchanged, except "whether the analyst has a reason for the call".
  - *Evidence:* PME's paragraph, plus where each quote sits ("(abstract)", "(p. 15)"). It adds two limits: "the gap between the two AI groups is significant only at the 10% level, and so is the higher rating among wrong answers alone. The study examined GPT-4 as it was in 2023."
  - *About the tasks:* unchanged.
- **From the essay:** removed. The quotes assume the essay.
- **Go further:**
  - The note: "The skill and the reviewer's question come from an essay about judgment in military education. This page shows them with the consulting tasks from the study the essay cites."
  - The links: "The study: Dell'Acqua et al. (2023), HBS working paper 24-013"; "See the failure: Uncalibrated reliance" (business edition); "The original essay, written for military education: The Irreducible Officer, Section V". The book chapter and companion links are PME-only, so they're dropped.
- No "student", "faculty", "seminar" or "adversary" anywhere in the business copy. "Military" appears only in the essay label and note.

## Evidence, option A

- **"Illustration based on…"** sits in "How this figure works". That's this figure's setup, which moved below the figure so the first view fits the question.
- **The source line** is on the stage from beat 1 through the final frame, at the top left: "DELL'ACQUA ET AL. · FIELD EXPERIMENT, 2023 · 758 BCG CONSULTANTS · SOME WITH GPT-4". A second source line under the final frame would repeat it, so there isn't one. `labels.source` / `narrow.source` hold that line in both editions.
- **The evidence beat** (5) stays, because the finding is the turn.
- **The full finding with its limits** is on the page, behind the disclosure. It reveals the answers, so the hidden-answer rule keeps it locked until both calls are made.

## The edition switch

"See this with: Workplace · PME" shares the kicker's row, at the right, and its line box, so it adds no height. Under the setup it would have pushed the figure down about 40 px, and at 1440 × 900 the first view would have dropped to the stacked stage. The note "PME (professional military education): the example from *The Irreducible Officer*, the National War College essay." sits under "How this figure works". The PME link points to it (`aria-describedby`).

## Pace table

Every caption and on-screen text at 3 words a second, plus a 1.5 s hold, and the PME rules. The PME rules are: a beat holds its caption and new picture words at 3 words a second or less, and twice the caption's reading time. The words match PME's except beat 10's "AI" for "system", which leaves the count unchanged.

| Beat | Time (s) | Caption words | Caption ÷ 3 + 1.5 s | Picture words | (Caption + picture) ÷ 3 | 2 × caption ÷ 3 | Length (s) | Fits |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · Two tasks | 0.0–15.0 | 5 | 3.2 | 39 | 14.7 | 3.3 | 15.0 | Yes |
| 2 · The AI answers both | 15.0–21.7 | 10 | 4.8 | 3 | 4.3 | 6.7 | 6.7 | Yes |
| 3 · One check | 21.7–31.7 | 8 | 4.2 | 22 | 10.0 | 5.3 | 10.0 | Yes (waits at the question) |
| 4 · The frontier | 31.7–43.7 | 14 | 6.2 | 21 | 11.7 | 9.3 | 12.0 | Yes |
| 5 · Outside the frontier | 43.7–56.7 | 16 | 6.8 | 22 | 12.7 | 10.7 | 13.0 | Yes |
| 6 · What set them apart | 56.7–70.2 | 15 | 6.5 | 25 | 13.3 | 10.0 | 13.5 | Yes |
| 7 · The suggested call | 70.2–83.2 | 15 | 6.5 | 23 | 12.7 | 10.0 | 13.0 | Yes |
| 8 · One thing changes | 83.2–96.2 | 13 | 5.8 | 25 | 12.7 | 8.7 | 13.0 | Yes (waits at the question) |
| 9 · The call | 96.2–108.2 | 18 | 7.5 | 16 | 11.3 | 12.0 | 12.0 | Yes |
| 10 · Reviewer's check | 108.2–117.9 | 15 + 9 | 9.5 | 0 | 8.0 | 16.0 | 9.7, then rests | Yes (the last frame rests) |

The name card (3 s before 0.0) is unchanged, as is the nameplate's definition in the last caption. No new note or label is added in this edition. On phones the task cards stay on the stacked stage through the final frame.

## Verified figures (for the companion's source spine)

These are checked against the full working paper text (HBS Working Paper 24-013, September 2023) and BCG-VERIFY.md. Each reference gives the printed page first, then the PDF page in brackets.

- 758 BCG consultants: abstract [4]; p. 6 [10].
- Inside the frontier, 12.2% more tasks, 25.1% more quickly and more than 40% higher quality: abstract [4]. The 12.2% is also on p. 11 [15].
- 18 product-development tasks for a fictional footwear company, including "Segment the footwear industry market based on users.": p. 9 [13]; Appendix A, p. 41 [45].
- The outside task's spreadsheet and insider interviews, with the spreadsheet "designed to seem to be comprehensive": p. 13 [17]. The task was built so GPT-4 would err: p. 8 [12].
- Correct answers outside the frontier:
  - 84.5% without AI: p. 14 [18];
  - 70.6% with GPT-4 alone and 60.0% with the overview: Figure 7, p. 33 [37]. The text rounds them to "60% and 70%".
- "19 percentage points less likely to produce correct solutions", with the two AI groups pooled: abstract [4]; p. 14 [18].
- "regardless of the correctness of their answer": p. 15 [19].
- Limits:
  - the gap between the two AI groups: p = 0.082, Table 4, column 1, p. 37 [41];
  - the higher rating among wrong answers alone: significant only at the 10% level (Table 6, column 3, n = 105, from BCG-VERIFY.md).

**Not verified here.** "No hidden facts: a weak answer shows when read" is the figure's reasoning about Task A, and it is labelled that way ("What the evidence suggests"). The study doesn't test checking, a time budget or a launch plan, and the page says so. I took the Table 6 figure from BCG-VERIFY.md and didn't reopen it.
