# Responsibility laundering: business edition storyboard

Edition `business`, workplace cast. Round 2, revised after `tests/business-figure-read-1.md`, with the final fixes from `tests/business-figure-read-2.md`.

It is built from `editions/business.json` on top of the core in `storyboard.md`: layout, motion, colour grammar and nameplate. This file lists only what differs from the PME edition. The words live in the data files: `editions/business.json` for the scenario, and `../../casts.json` (workplace) for role words. If this file and the data disagree, the data is what ships.

To open it, use `index.html?edition=business`, or the page's "See this with: Workplace" link.

## Final fixes after cold read 2

Cold read 2 passed on the point. These are its final fixes.

1. **The first analyst's dot is whole again when "Answerable" lands** (first built as `split.whole`, business only; since the PME polish of October 30 it is core, in both editions). After the split, the smaller dot left at the signature could read as "half the responsibility went to the AI".
   - Now, as the first weight comes to rest (beat 8), the remaining half grows back into a whole dot over 0.6 s, so the weight lands on a whole person.
   - The grey ring stays by "The analysis estimates" as the reason handed to the AI.
   - At 390 the stacked dot returns to full size as its chip appears. The weight rests where the second analyst's does.
   - **PME had the same reading.** Jack approved the fix for PME (October 30), so it is core now; business renders identically (212/212).
2. **The source line carries its context:** "Related case: Moffatt v. Air Canada (2024), where a company was held responsible for its chatbot's answer."
   - On the drawn stage it is three right-aligned lines of serif italic 13 at the top right, beside the task card, the final frame's widest free space. That area is empty in beat 9; the "doesn't see this" tag that uses it is gone after beat 6.
   - It keeps a clear gap from the card at 1280 × 720 and 1440 × 900.
   - On phones it sits inside the player, under the key, in two lines of serif italic 13 (`narrow.sourceInView`). Its space is held from the start, so the player doesn't move, and it fades in with the drawn stage's line.
     - Verification found the earlier position, under the controls, below the fold at 390 × 844 (829–868 px).
     - To make room, the note is two lines on the phone: "Rests on last quarter's questions. / Recent: similar."
     - The player measures 841 px in every beat.
   - It now fades in 0.5 s after the line under the check (87.4–87.9 s core). A 1.0 s hold at core 93.1 lets its 16 words get their reading time plus 1.5 s before the figure rests.
   - The run is now 96.6 s on the figure's clock and 99.6 s in the player.
3. **Attribution.** The agents/servants/representatives sentence is presented as the tribunal's summary of the airline's position, quoted from "Air Canada argues…" (para. 27).
   - Paras. 2, 14, 28 and 44 were confirmed by paragraph number in both CanLII-stamped copies (section 6), so they stay.
4. The switch label and the meta description are left for the sweep across all eight figures.

## Changes after cold read 1

1. **Moffatt is a related case.** The case isn't the basis of the scenario any more; it's the organizational version of the same move: a company argued, in effect, that its chatbot was responsible for its own answers, and the tribunal held the company responsible.
   - The setup and the final-frame source line say "Related case: *Moffatt v. Air Canada* (2024)".
   - The page no longer links the case to the exceptions the analysts didn't test. It says the decision doesn't say how the chatbot worked or how it was tested.
   - The page says "answer for it" means inside the organization, that the order was against the airline, and that the figure makes no claim about anyone's personal legal liability.
2. **Quotes and pinpoints.** The chatbot quote ends with an ellipsis where it's cut mid-sentence. Every paragraph pinpoint was re-confirmed by paragraph number in both CanLII-stamped copies of the decision (section 6). No bot checks were bypassed: the CRT and CanLII pages refuse scripted requests and weren't retried.
   - Added from para. 28: the tribunal noted the airline "does not explain why customers should have to double-check information found in one part of its website on another part of its website".
   - Added from para. 16: the chatbot's answer linked to the bereavement page.
3. **Beat 7 runs one change at a time** and grows from 8.2 s to 14.4 s:
   - +1.0 s: the frame goes and the note returns;
   - +3.7 s: the outlines appear;
   - a 1.5 s pause;
   - +5.7 s: the first analyst's dot parts into two halves side by side, over 0.9 s;
   - a 0.8 s pause;
   - +7.4 s: one half travels up the copy's edge over about 2.3 s, larger (radius 4), with a soft red halo and a dashed trail;
   - +8.9 s: it turns into the grey ring (radius 9), and "Reason handed to the AI" joins the key; the trail fades as it arrives;
   - a 1.5 s pause;
   - +11.7 s: the red bracket;
   - a 1.5 s hold.

   At 390 the travelling half is 10 px with a 5 px halo, and the ring is 14 px. The extra time comes from static holds: 1.4 s from beat 2's closing hold, 2.0 s from beat 5's (its answers are shorter now) and 0.4 s from beat 8's.

   Beat 1 keeps its 7.4 s. Its task card and two names are 13 words, and with the caption the reading rule needs 7.2 s.

   The run is 95.6 s on the figure's clock and 98.6 s in the player (was 96.2).
4. **Both marks sit on the answers to "Why did you rely on it?"**
   - The first analyst's answer 2 now repeats the draft, "The analysis estimated 97%. It seemed solid.", and "The analysis" is outlined there and on their copy.
   - The second analyst's answer 2 carries the bracket, as before.
   - To keep question 2 the first point of difference (brief lesson 9), both analysts give the same answer to question 1: "I did. I signed it."
5. **"Their own note · not sent"** replaces "not handed in", in the note row, the beat list and the summary.
6. **At 390, the outline in a spoken answer hugs the phrase** (inline-block, line height 1.1, no offset), so its top edge no longer reads as an underline of the line above. On the drawn stage the outline starts 1.5 units later after an opening quote mark, so it doesn't cover it.
7. **No PME/National War College note on the business page.** The note now comes from the edition (`page.editionNote`), and it is null for business. The definition's "agency" stayed for Jack to decide; on October 30 he changed it to "responsibility" in every edition.

Also:
- "I should have tested exceptions" is now "I didn't test exceptions". The question is hypothetical, so the answer states the gap without implying the failure happened.
- The beat list no longer describes desktop-only layout ("cell shows a dash", "under the picture, at the right").

## 1. Source and evidence treatment

**Related case:** *Moffatt v. Air Canada*, 2024 BCCRT 149 (Civil Resolution Tribunal, February 14, 2024).

Evidence follows option A. There is no evidence beat, because the case isn't the figure's turn; the turn is "Why did you rely on it?".
- **Setup:** "The retailer, the analysts, their AI, the chatbot and the 97% are constructed. Related case: *Moffatt v. Air Canada* (2024), in which a tribunal held an airline responsible for its chatbot's answers."
- **In the final frame:** "Related case: Moffatt v. Air Canada (2024), where a company was held responsible for its chatbot's answer."
  - On the drawn stage it is three lines of serif italic 13, right-aligned at x 936 on baselines 28, 43 and 58, beside the task card. It fades in 0.5 s after the line under the check.
  - On the stacked phone view it sits inside the player, under the key.
- **On the page,** "A related case", after the check. In order:
  - how the case relates, and how it differs;
  - what the chatbot said (quoted, with an ellipsis), the link to the bereavement page, and what that page said (as the decision reports it);
  - the airline's argument and the tribunal's answer, in the decision's words;
  - the reasonable-care finding and the double-checking point;
  - the order, and what "answer for it" means in the figure;
  - the limits;
  - the source line.

How the case is handled:
- **The ruling is stated as fact, from the decision.** There is no legal advice and no general legal claim; the limits paragraph describes the record only.
- **Air Canada is named only on the page and in the source line.** The scenario's company is a constructed online retailer.
- **Two AI systems, kept apart.** The drafting AI is "AI", as in PME. The system under review is "the chatbot", the decision's own word.

## 2. Core change

There is no change to PME. Everything below is gated on business data, so PME draws exactly as before (section 7).

- **`timeline.edits`: the business edition's own clock,** as edits to the core clock in core seconds. A hold freezes the core and adds time; a cut skips a static stretch; a stretch plays an interval slower.
  - Beat 7: hold 1.5 s at 71.3; stretch 71.3–71.6 ×3; hold 0.8 s at 71.6; stretch 71.6–72.5 ×3; hold 1.5 s at 72.5.
  - Cuts: 1.4 s at 16.5 (beat 2), 2.0 s at 49.6 (beat 5), 0.4 s at 82.2 (beat 8).
  - Hold: 1.0 s at 93.1 (beat 9), for the source line's reading time.
  - Beat starts, the follow-up and the poster are mapped onto the edition clock. The core keeps its own times, and with no edits both maps are the identity.
- **`split`: the staged split** (sizes and spacing). With it, the dot parts before the half travels; a halo and a dashed trail show the travelling half, and the trail fades on arrival. The dot is whole again as the "Answerable" weight lands, in both editions (core). Without `split`, PME's split draws as before.
- **The phrase outline** now sits on the first person's first answer that contains the phrase. That is answer 1 in PME, so nothing changes there, and answer 2 in business.
- **`labels.source` / `narrow.source`:** the source line. A list of lines draws as a block at the top right; a single string draws right of the key.
- **Page furniture:**
  - the edition switch;
  - `page.editionNote`, hidden when null;
  - the evidence section, hidden when `page.evidence` is null;
  - the links note;
  - the essay quotes, hidden when `page.quotes` is null.
- **CSS:**
  - the desktop check label doesn't wrap ("REVIEWER'S CHECK" would grow the band 11 px and move the controls);
  - business answers use the tighter phrase outline.

**Brief lessons, checked:**
- **1. The contrast doesn't endorse what the record found wrong.** The airline's position, that the chatbot answered for its own words, is the first analyst's move made at company scale, and the figure shows that move as the failure. The second analyst isn't shown as right: they signed the same recommendation and name the test they didn't run.
- **7. Laptop sizes show the drawn stage:** 11.1 px at 1280 × 720, and 11.1 px at 1366 × 657 since the PME polish. Windows under 700 px high get a compact 92 px caption band and 166 px chrome, as institutional monoculture does. 1280 × 720 and taller are unchanged.
- **8. No straw man.** The first analyst repeats the draft's own reasoning.
- **9. Question 2 is the first point of difference:** both give the same answer to question 1.
- **10. The second analyst's move is their own:** a note on what the estimate rests on. It isn't a fallback the draft offered.
- **12. Same access:** both have the same draft, the same estimate and the same task.

## 3. Words that differ, beat by beat

The cast supplies the role words: "student" becomes "analyst", "faculty" becomes "the manager", and "Faculty check" becomes "Reviewer's check". Beats 3, 7 and 8 differ only in the role word (beat 7's timing differs too; see above).

| Beat | Caption (business) | Picture words that differ from PME |
| --- | --- | --- |
| 1 · The task | Two analysts, one task. | Task card: "Should the support chatbot answer refund questions?"; dots "First analyst", "Second analyst" |
| 2 · Same prompt, same draft | (same) | Draft: "The analysis estimates / 97% accuracy." and "It is recommended that the chatbot / go live."; tags "FIRST/SECOND ANALYST'S COPY · DRAFTED WITH AI" |
| 4 · Signs; notes first | The first analyst signs. The second notes what the estimate rests on, then signs. | Key "AN ANALYST'S DECISION"; row "THEIR OWN NOTE · NOT SENT"; note "Rests on last quarter's questions. / Recent: similar." |
| 5 · The manager asks | The manager asks each analyst. | "THE MANAGER DOESN'T SEE THIS"; frame "WHAT THE MANAGER SEES"; "1 · If it misleads a customer, who made this call?"; both answer "I did. I signed it." |
| 6 · Why | The manager asks why. | First: "The analysis estimated 97%. It seemed solid." Second: "It rests on last quarter's questions. Recent ones matched, so I accepted it. I didn't test exceptions." |
| 8 · Suppose it proves wrong | (role word only) | As the first weight lands, the first analyst's dot is whole again; the grey ring stays |
| 9 · Reviewer's check | Reviewer's check: Who owns the recommendation if it proves wrong? / Name one way it could prove wrong. Ask why they relied on it. | **New:** "Related case: Moffatt v. Air Canada (2024), / where a company was held responsible / for its chatbot's answer." at the top right |

The wording stays parallel to PME: the note's "Rests on…" comes back in the answer's "It rests on…", as PME's open port does. At 390 × 844 the player measures 841 px in every beat, with the source line inside it.

## 4. Workplace check (for Jack)

**Reviewer's check:** *Who owns the recommendation if it proves wrong?*
*Name one way it could prove wrong. Ask why they relied on it.*

EDITIONS-PLAN.md drafted "Who owns the recommendation if it proves wrong? Ask why they relied on it." This version keeps that and, as PME does, adds the reviewer's first move, which the figure shows the manager making ("If it misleads a customer…"). The separating line sits under the check at the same size.

## 5. Pace

The rule: every beat lasts at least (caption words + new on-screen words) ÷ 3 + 1.5 s. Lengths are on the business clock (figure time; the player adds the 3.0 s name card). Question numbers and repeated names aren't counted.

| Beat | Time (s) | Caption words | On-screen words | Needed (s) | Length (s) | Spare (s) |
| --- | --- | --- | --- | --- | --- | --- |
| 0 · Name card | player 0.0–3.0 | 0 | 7 (runtime standard) | 3.8 | 3.0 | as in all eight |
| 1 · The task | 0.0–7.4 | 4 | 13 (task card 9, names 4) | 7.2 | 7.4 | 0.2 |
| 2 · Same prompt, same draft | 7.4–18.0 | 10 | 17 (draft 13, tags 4) | 10.5 | 10.6 | 0.1 |
| 3 · Both read it closely | 18.0–25.2 | 7 | 3 (key) | 4.8 | 7.2 | 2.4 |
| 4 · Signs; notes first | 25.2–37.5 | 14 | 15 (key 3, note row 5, note 7) | 11.2 | 12.3 | 1.1 |
| 5 · The manager asks | 37.5–50.1 | 5 | 28 (overlays 9, question 9, answers 5 + 5) | 12.5 | 12.6 | 0.1 |
| 6 · Why | 50.1–63.7 | 4 | 30 (question 6, answers 7 + 17) | 12.8 | 13.6 | 0.8 |
| 7 · Whose reason (staged) | 63.7–78.1 | 11 | 5 (key) | 6.8 | 14.4 | 7.6 |
| 8 · Suppose it proves wrong | 78.1–86.4 | 13 | 1 ("Answerable") | 6.2 | 8.3 | 2.1 |
| 9 · Reviewer's check | 86.4–96.6 | 8 + 13 second line | 2 ("Reviewer's check"); source 16 | 9.2 | 10.2, then rests | 1.0 |
| **Total** | | **89** | **114** (+16 source) | | **96.6 figure, 99.6 player** | |

Checks:
- Every beat meets the rule. Every cut lands in a static hold and leaves at least 1.5 s after the last movement.
- The source line arrives 0.5 s after the line under the check has appeared, at 89.8 s. Its 16 words get their reading time (5.3 s) plus 1.5 s by 96.6 s, when the figure rests.
- The key never contradicts the caption. On phones the task card stays on screen through the final frame.

## 6. Verified in the decision (for the source spine)

The text was read in two CanLII-stamped PDF copies of *Moffatt v. Air Canada*, 2024 BCCRT 149 (issued February 14, 2024; File SC-2023-005609; Type: Small Claims; Tribunal Member Christopher C. Rivers). Each pinpoint was confirmed by splitting the text into its numbered paragraphs, and both copies agree.

- **Para. 2:** "Mr. Moffatt later learned from Air Canada employees that Air Canada did not permit retroactive applications."
- **Para. 14:** "Air Canada did not provide any information about the nature of its chatbot".
- **Para. 15** (the chatbot's reply, quoted to "…ticket was issued", with the sentence continuing "by completing our Ticket Refund Application form"): "If you need to travel immediately or have already travelled and would like to submit your ticket for a reduced bereavement rate, kindly do so within 90 days of the date your ticket was issued…"
- **Para. 16:** the words "bereavement fares" in the chatbot's reply were a hyperlink to the airline's "Bereavement travel" page.
- **Para. 17:** the webpage "says, in part, the bereavement policy does not apply to requests for bereavement consideration after travel has been completed." This is the decision's report of the webpage, so the page paraphrases it and doesn't quote it as the webpage's words.
- **Para. 27:** "Air Canada argues it cannot be held liable for information provided by one of its agents, servants, or representatives – including a chatbot. … In effect, Air Canada suggests the chatbot is a separate legal entity that is responsible for its own actions. This is a remarkable submission. … It should be obvious to Air Canada that it is responsible for all the information on its website. It makes no difference whether the information comes from a static page or a chatbot."
- **Para. 28:** "I find Air Canada did not take reasonable care to ensure its chatbot was accurate." Also: "It also does not explain why customers should have to double-check information found in one part of its website on another part of its website."
- **Para. 44:** Air Canada was ordered to pay $812.02: $650.88 in damages, $36.14 in pre-judgment interest and $125 in CRT fees.

**Not verified, or not used:**
- The CRT and CanLII pages refuse scripted requests (HTTP 403) and weren't retried. The text comes from two CanLII-stamped PDF copies, at loyaltylobby.com and in an S3 course-materials folder. The page links CanLII's address for the decision, which I couldn't open from here.
- BUSINESS-EXAMPLES.md's research on felt responsibility isn't used, and the page makes no claim about it.
- The 97%, the retailer, the chatbot's test set and both analysts' answers are constructed, and the page says so.

## 7. Checks run

- **PME frame-diff:** 0 differing against `regression/baseline`.
  - All 204 animation frames, at every size, matched the round-1 baseline unchanged.
  - The coordinator's change to `casts.json` (straight to curly apostrophe in "Faculty don't see this") altered beat 5's text in the beat list and summary. That changed five captures: the reduced and full page at 1440 and 390, and print.
  - A text comparison confirmed that's the only difference, so the baseline was re-captured on it.
  - PME now takes `labels.dontSee` and `narrow.dontSee` from the key too, with identical output.
- **PME after the final fixes:** 0 differing (209/209).
  - One capture under heavy machine load (load average about 8, with other figures' agents running) differed in 13 phone frames, at the bottom edge of the stacked "What faculty see" frame.
  - The rerun matched the baseline 209/209, and the two captures differed from each other in exactly those frames, so that run was a capture flake.
- **Business baseline:** `regression/baseline-business` (212 shots), re-captured after the final fixes.
  - Phone captures of moving moments (the travelling half, the falling weight) vary by a few pixels between runs under that load.
  - After the phone source moved inside the player, two fresh business captures matched each other 212/212, and the baseline is one of them. PME matched 209/209 again.
- **Both editions:**
  - 1440 × 900 and 1280 × 720 fit on the drawn stage and autoplay (controls end at 693 px at 1280 × 720);
  - the caption band is 144 px on desktop, 194 px on phones and 188 px at 768;
  - the business phone player is 841 px in every beat, source line included;
  - no horizontal scroll at 390 or 768;
  - reduced motion shows the final frame with ten beat details;
  - print view;
  - no console errors.
- **Beat 7,** viewed every 0.75 s at 1280 × 720 and 390 × 844: one change at a time, with the travelling half followable at both sizes.
- **Voice:** the business visitor copy and beat list pass `jack_eval.py` with no findings.
- **Stills:** `shots/business/` holds the poster, the beat-00 card, move and plate, beats 1–9, `final.png`, `final-390.png`, `player-390-final.png` and the reduced pages.
- **Preview:** `shots/responsibility-laundering-business.mp4/.webm/.gif`.

## 8. Classroom cast (CLASSROOM-PLAN.md section 7; Jack approved the defaults, October 30)

These are the business edition in two more casts, set through data in `editions/business.json` (`casts`, `byCast`). The scenario, timeline, picture, answers and related case stay as built. Open it with `?edition=business&cast=classroom` (higher ed: "faculty", "seminar", "Faculty check") or `&cast=high-school` ("the teacher", "class", "Teacher's check").

**Keys.**
- The one literal `edition-check` flagged ("to the manager and the company", `page.evidence.4`) is now `{reviewer}`. The workplace text resolves exactly as before.
- `casts` is `["workplace", "classroom", "high-school"]`, and `edition-check` passes for all three.
- `byCast.classroom` patches nine strings, and `byCast["high-school"]` is `"classroom"` (inherits). The patches carry no verb after a reviewer key, so plural "Faculty" and singular "The teacher" both read right.

**Framing.** Two students in a business seminar (class) work a retailer's case: should its support chatbot answer refund questions?
- The setup says the course allows AI and both students say they used it, and each copy is tagged "drafted with AI". This keeps "who made this call?" from reading as an academic-integrity question (the plan's risk).
- *Moffatt* stays a related case.
- "Answer for it" means to faculty or the teacher, for the work they submit, in the check paragraph and the evidence.

**Words that differ from workplace** (classroom / high school):

| Where | Classroom | High school |
| --- | --- | --- |
| Setup | "Suppose two students in a business seminar work a retailer's case: should its support chatbot answer refund questions? The seminar allows AI, and both say they used it; each copy is tagged "drafted with AI". They give an AI the same prompt, get the same draft, and sign it as written. …" | "…business class… The class allows AI…" |
| Picture | FIRST/SECOND STUDENT'S COPY, A STUDENT'S DECISION, FACULTY DON'T SEE THIS, WHAT FACULTY SEE, First/Second student, "THEIR OWN NOTE · NOT HANDED IN" | THE TEACHER DOESN'T SEE THIS, WHAT THE TEACHER SEES; the rest as classroom |
| Captions 1, 3, 4, 8 | Two students… / Both students… / The first student signs… / Both students will. | same |
| Captions 5, 6 | Faculty ask each student. / Faculty ask why. | The teacher asks each student. / The teacher asks why. |
| Caption 9 | Faculty check: Who owns the recommendation if it proves wrong? | Teacher's check: … |
| Check paragraph | "…both answer for it to faculty, for the work they submit, and the AI can't." | "…to the teacher…" |
| Evidence 1 | "It says nothing about students signing a recommendation for a class." | same |
| Evidence 5 | "In the figure, "answer for it" means to faculty, for the work they submit." | "…to the teacher…" |
| Links note | "…This page shows the same move in a business seminar working a retailer's case." | "…business class…" |

The note row reads "not handed in" in both classroom casts: "not sent" was the workplace wording for the same thing. The "Was the reliance justified?" link still goes to uncalibrated reliance's workplace edition, since UR's classroom cast isn't built yet.

**Switch:** "See this with: Workplace · Classroom · PME". Classroom is `data-edition-link="business" data-cast-link="classroom"`.
- `aria-current` marks Classroom in both classroom casts.
- On a high-school page the Classroom link keeps `cast=high-school`.

**Pace** (caption + on-screen words ÷ 3 + 1.5 s, business clock):

| Beat | Length (s) | Workplace | Classroom | High school |
| --- | --- | --- | --- | --- |
| 1 | 7.4 | 17 words, 7.2 | 17, 7.2 | 17, 7.2 |
| 2 | 10.6 | 27, 10.5 | 27, 10.5 | 27, 10.5 |
| 3 | 7.2 | 10, 4.8 | 10, 4.8 | 10, 4.8 |
| 4 | 12.3 | 29, 11.2 | 30, 11.5 | 30, 11.5 |
| 5 | 12.6 | 33, 12.5 | 30, 11.5 | 33, 12.5 |
| 6 | 13.6 | 34, 12.8 | 33, 12.5 | 34, 12.8 |
| 7 | 14.4 | 16, 6.8 | 16, 6.8 | 16, 6.8 |
| 8 | 8.3 | 14, 6.2 | 14, 6.2 | 14, 6.2 |
| 9 | 10.2, then rests | 23 + source 16 | same | same |

**Checks** (both classroom casts):
- At 1440 × 900, 1280 × 720 and 1366 × 657 the drawn stage shows, with labels at 14.1, 11.1 and 11.07 px. The caption band holds 144, 144 and 92 px in every beat, with nothing clipped.
- At 390 × 844 the stacked player is 841 px in every beat, with the source line inside it.
- No horizontal scroll, and no console errors or loader warnings.
- The new copy passes `jack_eval.py`.
- Baselines: `regression/baseline-business-classroom` and `regression/baseline-business-high-school` (212 shots each).
- Stills and finals: `shots/business-classroom/` and `shots/business-high-school/`.

## 9. The definition: "agency" becomes "responsibility" (Jack, October 30)

"The model's recommendation makes responsibility feel shared, or easier to defend." It changed in:
- the nameplate (every edition and cast);
- both `srSummary` strings;
- the workplace setup;
- the page's noscript block and meta description;
- `../../NAMEPLATE-DEFINITIONS.md`.

`book-v1` quotes the essay's own table verbatim, as PLAN.md and book-v0 do ("makes agency feel distributed…"), so it is unchanged.

The final-frame definition still fits:
- one line at 1440 × 900, 1280 × 720 and 1366 × 657;
- two lines at 390, as before.

The check and the controls don't move.

**Frame-diff, before and after:**
- **PME:** only the frames showing the final caption changed (player 88.0–96.2 s at all three sizes), plus the reduced, print and page views. Every earlier frame is identical.
- **Workplace business:** the final-caption frames (89.4 s on) changed, plus the page views. The new word also makes the setup paragraph one line longer, which moves the figure down 32 px, and that re-rasterizes every frame.
  - With the old word put back in the setup only, business differed in just the final-caption frames and the page views, which confirms the cause.
- **Determinism fix:** the phone view's first dot now drops its CSS transform once it is whole. An identity transform there rasterized differently from run to run in business phone frames 74–99.6 s.
  - Two fresh captures now match 212/212, and the PME output is pixel-identical.
- Both baselines were re-captured, each confirmed by a second capture.
