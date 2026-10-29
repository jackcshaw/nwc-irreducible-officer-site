# Responsibility laundering: business edition storyboard

Edition `business`, workplace cast. It is built from `editions/business.json` on top of the unchanged core in `storyboard.md`: timeline, layout, motion, colour grammar and nameplate. This file lists only what differs from the PME edition. The words live in the data files: `editions/business.json` for the scenario, and `../../casts.json` (workplace) for role words. If this file and the data disagree, the data is what ships.

To open it, use `index.html?edition=business`, or the page's "See this with: Workplace" link.

## 1. Source and evidence treatment

*Illustration based on* Moffatt v. Air Canada, *2024 BCCRT 149* (Civil Resolution Tribunal, February 14, 2024). The scenario and sensitivity rules come from BUSINESS-EXAMPLES.md, section 7.

Evidence follows option A. There is no evidence beat, because the ruling isn't the figure's turn; the turn is still "Why did you rely on it?".
- **Setup:** "Illustration based on *Moffatt v. Air Canada* (2024), a tribunal decision. The retailer, the analysts, their AI, the chatbot and the 97% are constructed."
- **Under the final frame:** "Based on Moffatt v. Air Canada (2024)."
  - On the drawn stage it is serif italic 13, right-aligned at x 936 on the key's baseline (530), and fades in at 87.9–88.4 s figure time, 1 s after the line under the check.
  - "Illustration based on…" didn't fit beside the key without touching it, so the line says "Based on".
  - On the stacked phone view it sits just under the controls, outside the fixed-height player (the frame-capture pattern).
- **On the page,** "The case behind this example", after the check:
  - what the chatbot said (quoted), and what the airline's own page said (as the decision reports it);
  - the airline's argument and the tribunal's answer, in the decision's words;
  - the finding and the order;
  - the limits;
  - how the figure uses it;
  - the source line.

  Every quote was checked word for word against the decision (section 6).

How the case is handled:
- **The ruling is stated as fact, from the decision.** There is no legal advice and no general legal claim. The limits paragraph describes the record only: one decision of British Columbia's Civil Resolution Tribunal, in a small claims dispute. It says nothing about precedent.
- **Air Canada is named only on the page and in the source line.** The scenario's company is a constructed online retailer.
- **Two AI systems, kept apart:** the drafting AI is "AI", as in PME (the tags read "drafted with AI" and the key "written by AI"). The system under review is "the chatbot", the decision's own word, and it appears only in the task card and the draft.
- **The page says what the decision doesn't establish:** how the chatbot worked (para. 14).

## 2. Core change

There is none. The business edition uses PME's timeline, beats, layout and motion. Every caption and picture word fits the PME beat budgets (section 5).

Additions, all gated on data, so PME draws exactly as before:
- `labels.source`: the SVG source line (see above).
- `narrow.source`: the stacked view's source line, shown under the controls (`[data-rl-source]`).
- Page furniture, the same in both editions: the edition switch and its note, the evidence section (hidden when `page.evidence` is null), the links note (hidden when empty), and the essay-quote section (hidden when `page.quotes` is null).
- One CSS rule on desktop: the check label doesn't wrap. "REVIEWER'S CHECK" is longer than the name's longest word ("RESPONSIBILITY"), and when it wrapped, the caption band grew 11 px in beat 9 and the controls moved. "FACULTY CHECK" never wrapped, so PME is unchanged (the frame-diff proves it).

**Lesson 1, checked.** The contrast doesn't endorse what the record found wrong:
- The airline's position, that the chatbot answered for its own words, is the first analyst's move ("It was the AI's estimate") made at company scale. The figure shows that move as the failure.
- The second analyst isn't shown as right. They signed the same recommendation, and they say what they should have done: "I should have tested exceptions." The chatbot in the case went wrong on exactly that kind of question, a special rule for bereavement fares.
- Both analysts carry the weight. That matches the case, where the company answered for its chatbot.

## 3. Words that differ, beat by beat

The cast supplies the role words: "student" becomes "analyst", "faculty" becomes "the manager", and "Faculty check" becomes "Reviewer's check". Beats 3, 7 and 8 differ only in the role word.

| Beat | Caption (business) | Picture words that differ from PME |
| --- | --- | --- |
| 1 · The task | Two analysts, one task. | Task card: "Should the support chatbot answer refund questions?"; dots "First analyst", "Second analyst" |
| 2 · Same prompt, same draft | (same) | Draft: "The analysis estimates / 97% accuracy." and "It is recommended that the chatbot / go live."; tags "FIRST/SECOND ANALYST'S COPY · DRAFTED WITH AI" |
| 4 · Signs; notes first | The first analyst signs. The second notes what the estimate rests on, then signs. | Key "AN ANALYST'S DECISION"; note "Rests on last quarter's questions. / Recent ones match." |
| 5 · The manager asks | The manager asks each analyst. | "THE MANAGER DOESN'T SEE THIS"; frame "WHAT THE MANAGER SEES"; "1 · If it misleads a customer, who made this call?"; first: "I signed it. The analysis said 97%." Second (same as PME): "I did. I chose to rely on the estimate." |
| 6 · Why | The manager asks why. | Second: "It rests on last quarter's questions. Recent ones matched, so I accepted it. I should have tested exceptions." First (same as PME): "It was the AI's estimate. It seemed solid." |
| 9 · Reviewer's check | Reviewer's check: Who owns the recommendation if it proves wrong? / Name one way it could prove wrong. Ask why they relied on it. | **New:** "Based on Moffatt v. Air Canada (2024)." right of the key (87.9–88.4 s) |

The words stay parallel to PME so the difference between the analysts stays the same: the note's "Rests on…" comes back in the answer's "It rests on…", as PME's open port does. "The analysis" stays the phrase the first answer leans on, so the outlines, the halved dot and the grey ring land on the same words.

Fitting the phone (390 × 844) set some of the wording: the draft's rows fit three lines each, question 1 fits one line, and the second answer fits six lines. With those, the player measures 837 px in every beat, the same as PME.

## 4. Workplace check (for Jack)

**Reviewer's check:** *Who owns the recommendation if it proves wrong?*
*Name one way it could prove wrong. Ask why they relied on it.*

EDITIONS-PLAN.md drafted "Who owns the recommendation if it proves wrong? Ask why they relied on it." This version keeps that and, as PME does, adds the reviewer's first move, "Name one way it could prove wrong", because the figure shows the manager doing it ("If it misleads a customer…"). The separating line sits under the check at the same size.

## 5. Pace

The rule: every beat lasts at least (caption words + new on-screen words) ÷ 3 + 1.5 s. Lengths are PME's, figure time; the player adds the 3.0 s name card. Question numbers and repeated names aren't counted.

| Beat | Caption words | On-screen words (business) | Needed (s) | Length (s) | Spare (s) |
| --- | --- | --- | --- | --- | --- |
| 0 · Name card | 0 | 7 (runtime standard) | 3.8 | 3.0 | as in all eight |
| 1 · The task | 4 | 13 (task card 9, names 4) | 7.2 | 7.4 | 0.2 |
| 2 · Same prompt, same draft | 10 | 17 (draft 13, tags 4) | 10.5 | 12.0 | 1.5 |
| 3 · Both read it closely | 7 | 3 (key) | 4.8 | 7.2 | 2.4 |
| 4 · Signs; notes first | 14 | 17 (key 3, note label 6, note 8) | 11.8 | 12.3 | 0.5 |
| 5 · The manager asks | 5 | 33 (overlays 9, question 9, answers 6 + 9) | 14.2 | 14.6 | 0.4 |
| 6 · Why | 4 | 32 (question 6, answers 8 + 18) | 13.5 | 13.6 | 0.1 |
| 7 · Whose reason | 11 | 5 (key) | 6.8 | 8.2 | 1.4 |
| 8 · Suppose it proves wrong | 13 | 1 ("Answerable") | 6.2 | 8.7 | 2.5 |
| 9 · Reviewer's check | 8 + 13 second line | 2 ("Reviewer's check"); source 7 after the check | 9.2 | 9.2, then rests | 0.0 |
| **Total** | **89** (PME 87) | **130** (PME 129) | | **93.2 figure, 96.2 player** | |

Checks:
- Every beat meets the rule. Beats 5 and 6 are the tight ones, so the role words the workplace cast adds ("The manager doesn't see this", "What the manager sees", "The manager asks why.") were paid for by shorter answers.
- The source line arrives 1.0 s after the line under the check. It gets its reading time (2.3 s) plus 1.5 s by 91.7 s, before the figure rests at 93.2 s.
- The key never contradicts the caption: its entries arrive in the same beats as PME's.
- On phones the task card stays on screen through the final frame.

## 6. Verified in the decision (for the source spine)

Read word for word in the decision's text, from a CanLII-stamped PDF of *Moffatt v. Air Canada*, 2024 BCCRT 149, issued February 14, 2024 (File SC-2023-005609, Type: Small Claims; Tribunal Member Christopher C. Rivers):

- **Para. 2:** "The chatbot suggested Mr. Moffatt could apply for bereavement fares retroactively. Mr. Moffatt later learned from Air Canada employees that Air Canada did not permit retroactive applications."
- **Para. 14:** "Air Canada did not provide any information about the nature of its chatbot".
- **Para. 15** (the chatbot's reply): "If you need to travel immediately or have already travelled and would like to submit your ticket for a reduced bereavement rate, kindly do so within 90 days of the date your ticket was issued…"
- **Para. 17:** the airline's webpage "says, in part, the bereavement policy does not apply to requests for bereavement consideration after travel has been completed." This is the decision's report of the webpage, so the page doesn't quote it as the webpage's own words.
- **Para. 22:** an Air Canada representative "admitted the chatbot had provided 'misleading words.'" (Not used on the page.)
- **Para. 27:** "Air Canada argues it cannot be held liable for information provided by one of its agents, servants, or representatives – including a chatbot. … In effect, Air Canada suggests the chatbot is a separate legal entity that is responsible for its own actions. This is a remarkable submission. … It should be obvious to Air Canada that it is responsible for all the information on its website. It makes no difference whether the information comes from a static page or a chatbot."
- **Para. 28:** "I find Air Canada did not take reasonable care to ensure its chatbot was accurate."
- **Para. 44:** Air Canada was ordered to pay $812.02: $650.88 in damages, $36.14 in pre-judgment interest and $125 in CRT fees.

**Not verified, or not used:**
- The CRT and CanLII pages refuse scripted requests (HTTP 403), so the text was read from two CanLII-stamped PDF copies, at loyaltylobby.com and in an S3 course-materials folder. The page links CanLII's address for the decision, which I couldn't open from here.
- BUSINESS-EXAMPLES.md's research on felt responsibility (Köbis et al. 2025, Gaczek et al. 2025, Kirchkamp & Strobel 2019) isn't used. The page makes no claim about how often AI makes people feel less responsible.
- The 97%, the retailer, the chatbot's test set and both analysts' answers are constructed, and the page says so.

## 7. Checks run

- **PME frame-diff:** 0 differing (209/209) against `regression/baseline`, which includes the edition switch. With the switch hidden, PME also matches `regression/baseline-pre-editions` 209/209.
  - One earlier capture of `regression/baseline` differed from every later capture in 14 phone frames, by 7 px at the corner of the "What faculty see" frame.
  - Three later captures matched each other exactly, and the difference stayed with the only CSS change reverted. So that capture was the outlier, and it was replaced.
- **Business baseline:** `regression/baseline-business` (209 shots).
- **Both editions:**
  - 1440 × 900 and 1280 × 720 fit on the drawn stage and autoplay (controls end at 693 px at 1280 × 720);
  - the caption band holds 144 px on desktop, 194 px on phones and 188 px at 768;
  - the phone player is 837 px in every beat;
  - no horizontal scroll at 390 or 768;
  - reduced motion shows the final frame with ten beat details;
  - print view;
  - no console errors.
- **Voice:** the business visitor copy passes `jack_eval.py` with no findings.
- **Stills:** `shots/business/` holds the poster, beat-00 card, move and plate, beats 1–9, `final.png`, `final-390.png`, `player-390-final.png` and the reduced pages.
- **Preview:** `shots/responsibility-laundering-business.mp4/.webm/.gif`.
