# Appropriate reliance: business edition

Motion figure 8 of 8 · slug `appropriate-reliance` · `editions/business.json`, workplace cast · final, after business cold read 2 and verification (`tests/business-figure-read-2.md`, `tests/business-verify.md`) · October 28, 2026

**Example.** The study's own consulting tasks, as built (BUSINESS-EXAMPLES.md §8, approved). Dell'Acqua et al. (2023) ran the field experiment with BCG consultants on business tasks, so the PME scenario already is the business scenario. This edition is a cast change plus fully business page copy.

**Core change: none.** The timeline, picture, gates, locks, `?t=` clamping, the hidden-answer rule, the screen-reader summary and Start over are shared with PME. The contrast doesn't endorse anything the study found wrong. The suggested calls follow the finding: rely on Task A (inside the frontier, where AI helped) and spend the one check on Task B (outside it, where AI users were right less often and still rated higher).

## The workplace check, for Jack

> **Reviewer's check:** What evidence justified relying on the AI here, and what would have changed the call?
> Change one condition, like details AI tends to miss, and ask again.

The question is the EDITIONS-PLAN.md draft, word for word. PME says "relying on the system", and this says "relying on the AI". The follow-up is set at the same size, so it keeps its equal weight. Round 2 makes it name a condition that would move the check. The cold read pointed out that the figure's own changed condition, the launch plan, doesn't move the call. A question about what would change it should come with a modelled answer. Beat 9 models that answer just before the check: "Details AI tends to miss would move the check." Round 3 changes the wording from "facts the AI couldn't see", which pointed at data access. In Task B the consultants could give GPT-4 every file, and it still missed the deciding details. PME keeps "Change one condition and ask for the call again." The heading comes from the cast (`{check}`).

## Round 3: final fixes after business cold read 2

All of these are business-only and gated by `business.json`. PME regression: 0 differing frames.

1. **Finding and reasoning are separate.**
   - Caption 7 becomes "AI helped on tasks like A. The suggested call: rely on A, work B yourself." That's 15 words: the study's finding, then the figure's call.
   - Task A's label becomes "REASONING: READING IS ENOUGH", which stays 4 words in beat 6's budget. It's set in the reasoning style (mono 500 over italic serif), which differs from the study's facts.
2. **Bar labels:**
   - "With GPT-4" and "With GPT-4 + tips" (the stacked view says "With GPT-4 + prompting tips"). "Prompting tips" doesn't fit before the bars at 14 px.
   - In the last frame, two notes sit under the bars: "TIPS: A SHORT PROMPTING OVERVIEW" and "THE GAP BETWEEN THE AI GROUPS IS UNCERTAIN". The gap is significant only at the 10% level. Beat 5 has no reading time left for them, so they come in with the final frame, which rests.
3. **The closing rule matches Task B:**
   - beat 9: "Inside the frontier: rely on it, read it first. Details AI tends to miss would move the check." (18 words);
   - the follow-up: "Change one condition, like details AI tends to miss, and ask again.";
   - the panel: "a detail the AI tends to miss: if the segmentation turned on something buried in the source material, as Task B's answer did".
4. **Go further:** the note reads "The skill and the reviewer's question come from an essay on judgment with AI." Only the original-essay link mentions military education.
5. **No hint before the reader's calls (after verification).** The page's Reviewer's check shows only the question until both calls are made. The follow-up line ("…like details AI tends to miss…") is filled in only then (`page.checkLinesAfter`), and Start over empties it again. "Details AI tends to miss" first appears after the calls, in beat 9, the follow-up and the final frame. The beat list entries that carry it stay locked until question 2 is answered, and so does the screen-reader summary part that says it.
6. The phone and desktop cost notes match: "Defensible · a week late".

## Round 2: changes after business cold read 1

All of these are gated to the business edition through `business.json` or `[data-edition-id="business"]`, so PME is unchanged. PME regression: 0 differing frames.

1. **Task A's line is labelled as reasoning.** "What the evidence suggests" becomes "WHY READING IS ENOUGH", and round 3 changes that to "REASONING: READING IS ENOUGH"; the line under it is unchanged. Beat 6's caption becomes "Task B's deciding details were in the interviews. Task A, the figure reasons, has none." It stays at 15 words. Under "What a good answer says", the unlocked panel adds the blind spot: reliance on Task A is warranted for quality, but the study found AI users' ideas less varied, and a careful read of one segmentation won't show that. The Evidence paragraph quotes the finding with its page (p. 12).
2. **What would move the check is shown.** Beat 9 names a condition that would move the check. Round 2 wrote it as "Facts the AI couldn't see would move the check." Round 3 replaced that with "Details AI tends to miss would move the check." Both are 18 words, as in PME. Beat 9 also drops "before it's built", which the reader found unclear. The tag becomes "RELY ON IT · READ IT FIRST". The check's follow-up names the same condition, and the unlocked panel spells it out: if the segmentation rested on customer data the AI never had, Task A would need working through too.
3. **Asking for a week reads as defensible on screen.** Its cost note becomes "DEFENSIBLE · A WEEK LATE", which differs from the move option's "TASK B: READ-THROUGH ONLY". In the last frame, the key sets the reader's calls against the suggested ones in words, so the comparison doesn't rest on colour: "YOUR CALLS · FIRST DRAFT: MATCHES / DIFFERS / NO CALL · LAUNCH PLAN: MATCHES / DIFFERS / DEFENSIBLE / NO CALL". The stacked view does the same. That text exists only from beat 10.
4. **No jump on Continue where the first view shows the picture.** `layout.holdFirstView` keeps the first view's stage size for the rest of the figure at 1440 × 900 and 1280 × 900, so Continue doesn't resize or scroll anything (measured: same shot height, same scroll). Labels are 11.7 px there. Where the first view is the compact stacked stage (1280 × 720, 1366 × 657, phones), Continue still opens the drawn picture or the full stacked stage. Reserving that space would push the question and Continue off the first screen, and lesson 7 needs the drawn picture there.
5. **Sources:** listed below, with their references.
6. **JS-off "Faculty check":** left to the runtime's noscript fix.

At 768 × 1024 the business follow-up takes two lines, so the business caption band is 180 px there (176 measured). PME keeps 156.

## Words that differ from PME, beat by beat

Beats 0–4 and 8 have the same words in both editions. This is the shipped business wording where it differs:

| Beat | PME | Business |
| --- | --- | --- |
| 5 · bar labels | GPT-4 alone / GPT-4 + overview | With GPT-4 / With GPT-4 + tips. The stacked view says "With GPT-4 + prompting tips" |
| 6 · caption | "…For Task A, the evidence suggests none." | "…Task A, the figure reasons, has none." |
| 6 · Task A label | WHAT THE EVIDENCE SUGGESTS | REASONING: READING IS ENOUGH |
| 7 · caption | "The evidence suggests relying on Task A and working Task B yourself from the interviews." | "AI helped on tasks like A. The suggested call: rely on A, work B yourself." |
| 9 · caption | "Still inside the frontier: rely on it, and read it before it's built. Task B needs the check." | "Inside the frontier: rely on it, read it first. Details AI tends to miss would move the check." |
| 9 · tag | RELY ON IT · READ IT BEFORE IT'S BUILT | RELY ON IT · READ IT FIRST |
| 9 · cost note | LAUNCH SLIPS A WEEK | DEFENSIBLE · A WEEK LATE (the stacked view says "Defensible · a week late") |
| 10 · key | YOUR CALLS | YOUR CALLS · FIRST DRAFT: … · LAUNCH PLAN: … |
| 10 · under Task B's bars | (none) | TIPS: A SHORT PROMPTING OVERVIEW / THE GAP BETWEEN THE AI GROUPS IS UNCERTAIN |
| 10 · caption | "Faculty check: What evidence justified relying on the system here, and what would have changed the call?" | "Reviewer's check: What evidence justified relying on the AI here, and what would have changed the call?" |
| 10 · follow-up | "Change one condition and ask for the call again." | "Change one condition, like details AI tends to miss, and ask again." |
| Screen-reader summary, part 3 | "The figure ends on the faculty check." | "The figure ends on the reviewer's check." |
| Live region | Same | Same |

## Page copy (business)

- **Top:** kicker, title and lede are unchanged ("The skill", "Appropriate reliance", "You have time to check one of two AI answers…"). The lede stays one line so the first view still fits the live question.
- **Faculty check section** becomes "Reviewer's check", with the workplace question and the same follow-up.
- **How this figure works** (the figure's fuller setup, below it): "two consulting tasks from a 2023 field experiment", ending "Illustration based on Dell'Acqua et al. (2023): the tasks and results are the study's, and the time budget, the first draft and the launch plan are this figure's."
- **After you make your call** (still locked until both calls are made, since it states the answers):
  - *What a good answer says:* unchanged, except "whether the analyst has a reason for the call".
  - *Evidence:* PME's paragraph, with the sample described exactly (758 BCG consultants, about 7% of the firm's individual-contributor consultants: 385 worked the tasks inside the frontier, 373 the task outside it; within each set they were randomly assigned to no AI, GPT-4, or GPT-4 plus the overview). It also says where each quote sits ("(abstract)", "(p. 15)"). It adds two limits: "the gap between the two AI groups is significant only at the 10% level, and so is the higher rating among wrong answers alone. The study examined GPT-4 as it was in 2023."
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

"See this with: Workplace · PME" shares the kicker's row, at the right, and its line box, so it adds no height. Under the setup it would have pushed the figure down about 40 px, and at 1440 × 900 the first view would have dropped to the stacked stage. On phones "See this with:" is read but not shown, so the switch still fits the row. The note "PME (professional military education): the original example from *The Irreducible Officer*, the National War College essay." sits under "How this figure works". The military-education link points to it (`aria-describedby`). The static meta description is role-neutral: the name, the definition and one clause. The business edition fills it with business wording.

## Round-1 lessons (BUSINESS-BRIEF.md, 7–12)

- **7, the picture at 1280 × 720 and 1366 × 657.** Once question 1 is answered, the drawn picture shows at both:
  - at 1280 × 720, labels are 11.1 px, as before;
  - at 1366 × 657 (and 1280 × 657 or 1440 × 700), a short-window rule takes the caption band from 144 px to 100 px with tighter padding, for windows 1200 px wide and up and 716 px tall or less. The last caption measures 94 px there, and the drawn picture keeps 11.0 px labels. Before, these windows used the stacked view throughout.

  Question 1 itself still uses the compact stacked stage at these sizes. The first view has to fit the live question and Continue without scrolling the page (figure cold read 2), and the drawn picture would be 7 px there. After question 1 the page now scrolls to the shot's top, so the nameplate strip stays in view. Both rules leave 1440 × 900, 1280 × 720 and 390 × 844 unchanged, so the PME diff holds.
- **8, 9, 12.** These don't apply: there's no second person, and the reader makes both calls. Both tasks get the same AI answer in the same form.
- **10, the good move matches the study.** The suggested calls follow what the paper links to good outcomes:
  - relying on the AI inside the frontier, where AI users did more, faster and better;
  - working the outside task yourself from the interviews and comparing. Consultants without AI were right most often there (84.5%), and the right answer depended on details in the interviews.

  Gate 2's suggested "rely on it, and read it before it's built" keeps the inside-the-frontier reliance and adds a read, which the study doesn't contradict. Its fallbacks are the reader's options, not the AI's.
- **11, the sample.** On screen the figure says "758 BCG consultants · some with GPT-4", which is accurate. The page gives the 7% share, the 385/373 split between the two experiments, and the three arms within each. Every result is tied to its own experiment: the inside numbers come from the 385, the outside numbers from the 373. Nothing exploratory is used.

## Pace table

Every caption and on-screen text at 3 words a second, plus a 1.5 s hold, and the PME rules. The PME rules are: a beat holds its caption and new picture words at 3 words a second or less, and twice the caption's reading time. The words match PME's except beat 10's "AI" for "system", which leaves the count unchanged.

| Beat | Time (s) | Caption words | Caption ÷ 3 + 1.5 s | Picture words | (Caption + picture) ÷ 3 | 2 × caption ÷ 3 | Length (s) | Fits |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · Two tasks | 0.0–15.0 | 5 | 3.2 | 39 | 14.7 | 3.3 | 15.0 | Yes |
| 2 · The AI answers both | 15.0–21.7 | 10 | 4.8 | 3 | 4.3 | 6.7 | 6.7 | Yes |
| 3 · One check | 21.7–31.7 | 8 | 4.2 | 22 | 10.0 | 5.3 | 10.0 | Yes (waits at the question) |
| 4 · The frontier | 31.7–43.7 | 14 | 6.2 | 21 | 11.7 | 9.3 | 12.0 | Yes |
| 5 · Outside the frontier | 43.7–56.7 | 16 | 6.8 | 22 | 12.7 | 10.7 | 13.0 | Yes |
| 6 · What set them apart | 56.7–70.2 | 15 | 6.5 | 25 | 13.3 | 10.0 | 13.5 | Yes ("REASONING: READING IS ENOUGH" has as many words as PME's label) |
| 7 · The suggested call | 70.2–83.2 | 15 | 6.5 | 23 | 12.7 | 10.0 | 13.0 | Yes (round 3 caption: 15 words) |
| 8 · One thing changes | 83.2–96.2 | 13 | 5.8 | 25 | 12.7 | 8.7 | 13.0 | Yes (waits at the question) |
| 9 · The call | 96.2–108.2 | 18 | 7.5 | 15 | 11.0 | 12.0 | 12.0 | Yes. The new note "DEFENSIBLE · A WEEK LATE" (4 words) appears at 103.6 and holds 4.2 s, over its 1.3 s plus 1.5 s |
| 10 · Reviewer's check | 108.2–117.9 | 15 + 12 | 10.5 | 9 (the key's verdict) + 13 (the bar notes) | 16.3 | 18.0 | 9.7, then rests | Yes (the last frame rests) |

The name card (3 s before 0.0) is unchanged, as is the nameplate's definition in the last caption. No new note or label is added in this edition. On phones the task cards stay on the stacked stage through the final frame.

## Verified figures (for the companion's source spine)

These are checked against the full working paper text (HBS Working Paper 24-013, September 2023) and BCG-VERIFY.md. Each reference gives the printed page first, then the PDF page in brackets.

- 758 BCG consultants: abstract [4]; p. 6 [10]. They were about 7% of BCG's individual-contributor consultants: abstract [4] ("758 consultants comprising about 7% of the individual contributor-level consultants"); p. 5 [9]. BCG-VERIFY.md has the abstract; I read p. 5 in the working paper text.
- The split: 385 consultants on the tasks inside the frontier and 373 on the task outside it, p. 6 [10] ("Approximately half of the participants (385 consultants) … The other half (373 consultants)"). Tables 1–3 have N = 385 and Tables 4–6 N = 373 (pp. 34–38).
- Less varied ideas inside the frontier: p. 12 [16]. On the first inside task (shoe ideas), AI users' ideas were better but showed "a marked reduction in the variability of these ideas compared to those not using AI". This suggests "it might lead to more homogenized outputs" (Figure 6; Appendix D).
- Inside the frontier, 12.2% more tasks, 25.1% more quickly and more than 40% higher quality: abstract [4]. The 12.2% is also on p. 11 [15].
- 18 product-development tasks for a fictional footwear company, including "Segment the footwear industry market based on users.": p. 9 [13]; Appendix A, p. 41 [45].
- The outside task's spreadsheet and insider interviews, with the spreadsheet "designed to seem to be comprehensive": p. 13 [17]. The task was built so GPT-4 would err: p. 8 [12].
- Correct answers outside the frontier:
  - 84.5% without AI: p. 14 [18];
  - 70.6% with GPT-4 ("GenAI use", the paper's GPT Only group) and 60.0% with the overview: Figure 7, p. 33 [37]. The text rounds them to "60% and 70%".
- "19 percentage points less likely to produce correct solutions", with the two AI groups pooled: abstract [4]; p. 14 [18].
- "regardless of the correctness of their answer": p. 15 [19], in the working paper text and BCG-VERIFY.md (Claim 6 table).
- Limits, both significant only at the 10% level:
  - the gap between the two AI groups: p = 0.082, Table 4, column 1, p. 37 [41]; BCG-VERIFY.md, Claim 3;
  - the higher rating among wrong answers alone: Table 6, column 3, n = 105; BCG-VERIFY.md, Claim 6. The paper's sentence on p. 15 [19] is unqualified.

**Not verified here.** "No hidden facts: a weak answer shows when read" is the figure's reasoning about Task A, and it is labelled that way ("What the evidence suggests"). The study doesn't test checking, a time budget or a launch plan, and the page says so. I took the Table 6 figure from BCG-VERIFY.md and didn't reopen it.

## Classroom cast (CLASSROOM-PLAN.md §8, a pure swap)

`editions/business.json` lists `"casts": ["workplace", "classroom", "high-school"]`. Open it with `?edition=business&cast=classroom` for higher ed ("the student", "Instructor’s check", "class") or `&cast=high-school` ("Teacher’s check"). The scenario, timeline, picture, gates and evidence are the same as built. "Your team's first draft" and "the launch plan" read as a class team project, so they stay.

**Keys.** The one literal `edition-check` flagged, "the reviewer's question" in the links note, is now `{check_l}`. Workplace now reads "the reviewer’s check", classroom "the instructor’s check" and high school "the teacher’s check".

**Patches** (`byCast`; high school carries the same two, with its own link):
- *How this figure works*: "…two consulting tasks from a 2023 field experiment as a team project for a class where AI use is allowed, and time to check only one… Illustration based on Dell'Acqua et al. (2023), a study of consultants: the tasks and results are the study's, and the class project, the time budget, the first draft and the launch plan are this figure's." The first of those sentences carries the line Jack asked for: AI use is allowed.
- *Meta description*: "Appropriate reliance for a class using AI: …".
- *Go further*: "See the failure: Uncalibrated reliance" links to that figure in the same cast (`&cast=classroom` or `&cast=high-school`).

**Words that differ from workplace** (classroom / high school):

| Where | Classroom | High school |
| --- | --- | --- |
| Caption 10 and the check band | Instructor’s check: What evidence justified relying on the AI here, and what would have changed the call? | Teacher’s check: … |
| Page check heading | Instructor’s check | Teacher’s check |
| What a good answer says, last line | …shows whether the student has a reason for the call. | same |
| Screen-reader summary, part 3 | …ends on the instructor’s check. | …the teacher’s check. |
| Links note | The skill and the instructor’s check come from an essay on judgment with AI… | …the teacher’s check… |

**The switch:** "See this with: Workplace · Classroom · PME" on the kicker row. Classroom is `data-edition-link="business" data-cast-link="classroom"`; on a high-school page it's the current link. The row stays 22 px at 1440, 1366, 1280, 768, 390 and 360 wide. On phones "See this with:" is read but not shown.

**Checks:**
- `edition-check` passes for all three casts.
- Gate and leak checks pass for both classroom casts: no reader route reaches an answer, and the "details AI tends to miss" line appears only after both calls.
- At 1440 × 900, 1366 × 657, 1280 × 720, 768 × 1024, 390 × 844 and 360 × 740 there's no overflow and no horizontal scroll. The last caption fits its band in every cast, and the drawn picture keeps 11 px labels after question 1 at 1280 × 720 and 1366 × 657.
- The pace is unchanged: no caption or picture word changes, apart from the check heading.
- The figure still never autoplays: it opens on question 1 and waits.

### After the classroom light read (`tests/classroom-light-read.md`)

**The class frame is on the stage.** These are `byCast` patches, for both classroom casts:
- "IF IT'S YOUR GROUP'S FIRST DRAFT" and "IF IT GOES STRAIGHT INTO THE CASE WRITE-UP" on the cards.
- Caption 8 is "Now your segmentation goes straight into the case write-up. What about Task A?"
- The key reads "FIRST DRAFT: … · CASE WRITE-UP: …".
- Asking for a week "misses the deadline by a week" in the text. On the card it's still "DEFENSIBLE · A WEEK LATE", which fits a class.
- "AI USE ALLOWED" opens the budget line ("AI USE ALLOWED · TIME FOR ONE CHECK: WORK IT YOURSELF, THEN COMPARE"). It's on screen from beat 3, before the first call, and the first question's screen-reader prompt says it too ("Your group may use AI").
- The figure waits at question 1, so the two extra words cost no reading time.

**High school in plainer words**, with the same structure and the same study facts:
- Tasks: "Group shoe customers by how they use the shoes." and "Use a spreadsheet and interviews to pick which brand to invest in."
- Reasons and verdicts:
  - "Nothing hidden: a weak answer shows when read.";
  - "THE KEY FACTS WERE IN THE INTERVIEWS / THE SPREADSHEET JUST LOOKED COMPLETE";
  - "DO IT FROM THE INTERVIEWS, THEN COMPARE";
  - "THEN NOBODY CHECKS TASK B";
  - "TASK B: QUICK READ ONLY".
- Caption 6: "Task B's key facts were in the interviews. Task A, the figure reasons, has none." That's 15 words, as before.
- Every patched label keeps or lowers its word count in its beat.

**Projection.** In the classroom casts the stage's mono labels are 15.5 units instead of 13: 14 px at 1440 × 900, 13.2 px at 1280 × 720 and 13.1 px at 1366 × 657, with no overflow and the player still fitting.
- Some labels keep 13 units for room: the key line, the READY tags, the bar notes and the cost note beside "Ask for a week".
- Classroom (higher ed) shortens two labels so they fit the card at the larger size: "THE KEY DETAILS WERE IN THE INTERVIEWS" and "WORK FROM THE INTERVIEWS, THEN COMPARE". Caption 6 says "key details" to match.
- Workplace and PME draw exactly as before.

**The verdict on phones (every business cast; PME has no verdict).** The last beat's line "Your calls · first draft: … · …" sat at the foot of the stacked stage, under the sticky panel. In play, the page now brings it above the caption band once the last caption has grown, and the reduced-motion step to the end does the same. Measured at 390 × 844 in all three casts, in play and reduced: the line is at 402–453 px, above the band at 459 px.

