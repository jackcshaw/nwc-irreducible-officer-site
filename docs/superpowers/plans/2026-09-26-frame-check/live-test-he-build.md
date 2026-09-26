# Live test: HE build mode (scripted simulation, not educator evidence)

Instruction file used: `dist/assets/workbench/he/frame-check.md` ("AI Facilitation Block")

---

EDUCATOR: "Hi, I'd like to use Frame Check."

ASSISTANT:

Welcome. Before we start, I can run a quick calibration primer for your setting (higher education) — it's optional, so say "skip" any time.

Here's the weak example. Rate it against the five tests below (strong / weak / fails for each, with your reasoning):

**Weak example — Campus shuttle survey.** A university invites 1,000 students; 100 respond and 80 favor a later shuttle. The AI reports that 80 percent of students favor it.

The five tests, for reference:
1. The flaw is in the frame, not the facts — could a student catch it with a stock phrase ("check for bias," "correlation isn't causation," "not a fair test," "AI can be wrong")?
2. The student owns a real framing choice — could two strong students reasonably frame this differently and both earn full credit?
3. Directing AI actually helps — would a student who directs AI well produce better work than one who refuses it?
4. Something deserves acceptance — what would a student be right to accept, and what check justifies it?
5. The changed case tests whether the frame travels — does the changed case make a different frame or piece of evidence decisive?

How would you rate the shuttle-survey example against these five — or would you rather skip the primer and move on?

---

EDUCATOR: "Let's skip the primer."

ASSISTANT:

Skipping the primer — no ratings recorded, no reveal needed.

Which would you like to do:
(a) **Build** a new case, or
(b) **Check and repair** a case you already have?

---

EDUCATOR: "Build a case."

ASSISTANT:

Build mode. Step 1 of the workflow: collect the real inputs — I won't generate any of this from memory.

Please give me:
- **Subject and course level**
- **Learning objective** — the judgment you want students to practice
- **Your real materials** — readings, data, whatever you have already

---

EDUCATOR: "Introductory public health policy, first-year undergraduates. Objective: judge whether a local sugary-drink tax succeeded. My materials (fictional, for this course): (a) City of Riverton two-year evaluation summary: sweetened-beverage purchases fell 21% in taxed stores; purchases rose 6% in stores just outside city limits; the tax raised $9.4 million, 70% allocated to school nutrition programs. (b) A news analysis summary: small grocers near the city border reported lost sales; health advocates cite the purchase drop; critics say low-income households pay most of the tax."

ASSISTANT:

Got it — logging subject, level, objective, and both materials as given, no invented facts added.

**Step 2 — Target skill.** The frame the student must own: *what counts as "success" for this tax.* Not "is 21% a real number" (it is, per (a)) — but which standard decides success: in-city purchase reduction and revenue capture, versus a fuller regional/distributional accounting that includes cross-border substitution and who bears the tax's burden.

**Step 3 — Candidates**, rated against all five tests:

**Candidate A — Topline-only success claim.** A misframed AI answer states: sweetened-beverage purchases in taxed stores fell 21% over two years, the tax raised $9.4 million with 70% going to school nutrition programs — therefore the tax succeeded. Numbers drawn directly from (a); no invented figures.
- Test 1 (flaw in frame, not facts — *could a stock phrase catch it?*): **Strong.** The figures are accurate. The flaw is that the AI silently adopts "in-city purchase reduction + revenue captured" as the entire definition of success, without weighing the 6% border-store increase or distributional critique also present in the materials. No stock phrase ("check for bias," "correlation isn't causation") names this move.
- Test 2 (*could two strong students defensibly split?*): **Strong.** Frame 1: success = in-city reduction + revenue put to public-health-adjacent use. Frame 2: success = net regional effect, accounting for substitution to border stores and who bears the tax. Both are coherent given the same two documents.
- Test 3 (*does directing AI help?*): **Strong**, contingent on the directing task built in step 6 — a student who states their frame's criteria up front gets a materially different (and better) AI answer than one who just asks "did the tax work?"
- Test 4 (*something to accept, with a check*): **Strong.** The topline figures themselves are an accurate synthesis of (a) — worth accepting after checking them against the evaluation summary directly.
- Test 5 (*does the changed case shift the decisive evidence?*): **Strong**, pending the specific changed case (built in step 5) — plausible territory is changing how easy cross-border substitution is.

**Candidate B — Anecdote-driven failure claim.** A misframed AI answer concludes the tax failed because "small grocers near the border reported lost sales" (from (b)), treating that anecdotal report as decisive over the two-year evaluation data.
- Test 1: **Fails.** "That's anecdotal, not data" is exactly the stock phrase that catches this — it's a template error (weighting a few merchant reports over a structured two-year evaluation), not a frame error.
- Because it fails test 1, it's not a frame-first case regardless of the rest (per the five-tests rule), but rating for completeness:
- Test 2: **Weak** — the "framing choice" here is really just "do you trust data or anecdote," which isn't a real disciplinary framing choice.
- Test 3: **Weak** — directing AI mainly serves to catch the anecdote/data conflation, which is critique, not direction toward a purpose.
- Test 4: **Weak** — the border-store detail itself is real (per (a)'s corroborating 6% figure) but the case as built doesn't isolate a clean acceptable contribution.
- Test 5: **Fails** — a changed case here would just be "what if the anecdote were true" — that's removing the original error, not shifting the decisive frame.
- **Rejected**: fails test 1 outright.

**Candidate C — Revenue-equity framing.** A misframed AI answer concludes the tax failed because "critics say low-income households pay most of the tax" (from (b)), without weighing that 70% of the $9.4 million raised was earmarked for school nutrition programs (from (a)), which may disproportionately benefit the same low-income households.
- Test 1: **Strong.** Both figures are accurate and drawn from the materials; the flaw is treating tax-burden incidence alone as decisive while ignoring revenue-use incidence — no stock phrase names that omission.
- Test 2: **Strong.** Frame 1: success judged by net distributive effect (burden minus what the earmarked revenue returns to the same population). Frame 2: success judged by burden alone, regardless of revenue use. Both defensible.
- Test 3: **Strong**, same logic as Candidate A.
- Test 4: **Strong** — the 70%-to-school-nutrition figure is acceptable after a source check.
- Test 5: **Strong** — a changed case where revenue instead goes to the general fund would make the burden-alone frame more clearly decisive.

**Step 4 — Recommendation.** I recommend **Candidate A**. It's the most direct fit to your stated objective ("judge whether the tax succeeded") and uses both documents' central numbers without requiring students to juggle two layers of distributive reasoning (tax incidence *and* revenue incidence) in one first-year assignment. What it gives up: Candidate C's revenue-equity angle — whether earmarking the money for school nutrition offsets who pays the tax — is a genuinely good question for this reading list, but it's a second framing layer on top of the border/substitution question. I'd suggest holding it in reserve as an extension prompt rather than the primary frame.

Your call — go with Candidate A, prefer C, or want a blend of both?

---

EDUCATOR: "Go with your recommendation."

ASSISTANT:

Confirmed — Candidate A is the frame. Continuing the workflow.

**Step 5 — Pressure test.**
- **Stock-phrase test:** No. The AI's numbers (21% drop, 6% border rise, $9.4M raised, 70% allocation) are accurate transcriptions of (a); nothing here is a data error a reflex phrase would catch. The flaw is entirely in which standard of "success" the answer silently adopted.
- **Contribution worth accepting, and its check:** The topline synthesis of document (a) — 21% drop in taxed stores, $9.4M raised, 70% to school nutrition — is accurate as reported. Check: the student verifies each figure directly against the Riverton evaluation summary before relying on it in their own argument.
- **Changed case that shifts the decisive evidence:** Riverton is now a geographically isolated city — the nearest out-of-city store is a 45-minute drive, not a short trip across a city line. (This detail is constructed for the exercise, not part of your original materials — flag for your review.) Cross-border substitution becomes implausible, so the "how much purchasing just leaked to the border" question stops being decisive, and the case now turns on the distributional question: does earmarking 70% of $9.4M for school nutrition offset a regressive tax burden. This forces re-application of the framing discipline rather than just removing the original ambiguity.
- **Factual claims to verify:** the 21% figure, the 6% figure, the $9.4M total, and the 70% allocation — all sourced from your materials (a)/(b) and used verbatim in what follows below, but you should confirm the wording I've built around them matches your source documents exactly before use in class.

**Step 6 — Full assignment.**

- **Question:** Did Riverton's sugary-drink tax succeed?
- **Defensible frames:**
  - Frame 1 — *In-city outcome*: success = the tax reduced sweetened-beverage purchases where it applied and captured revenue put to a public-health-adjacent use.
  - Frame 2 — *Net regional outcome*: success = the net effect across the whole area, accounting for the 6% increase in border-store purchases (partial substitution, not elimination of consumption) and who bears the tax's cost.
- **Misframed AI answer (factually sound, constructed for this exercise):** "Riverton's tax should be judged a success: sweetened-beverage purchases in taxed stores fell 21% over two years, and the tax generated $9.4 million, with 70% funding school nutrition programs." — accurate on every number, but it silently adopts Frame 1 only and omits the border-store increase and the distributional critique that the same materials also raise.
- **Contribution worth accepting + check:** the figures above, checked against the Riverton evaluation summary (a) directly.
- **Directing-AI task (level: structured prompting, per the introductory-HE fit):** before consulting AI, the student states which frame they're using, the criteria a good answer must address (in-city change, border-store change, revenue amount and its allocation, and the distributional critique), and then checks the AI's output against those stated criteria rather than accepting it as given.
- **Changed case:** Riverton is now geographically isolated (nearest outside store 45 minutes away) — substitution is no longer realistic, so the decisive question shifts to whether the school-nutrition earmark offsets the regressive burden.
- **Defended-frame rubric** (credit the defense, not the conclusion):
  - states the standard used and why it fits the course's objective;
  - names the other coherent frame and explains why it wasn't adopted;
  - uses evidence from (a)/(b) that actually bears on the chosen standard;
  - identifies the AI contribution accepted and the check that justified it;
  - explains what evidence or changed condition would change their answer.
  - No credit for suspicion alone, "there are many perspectives" alone, or changing one's mind as an end in itself.

Does this look right, or is there anything you'd like adjusted before I finalize the record?

---

EDUCATOR: "This looks good. Please finish."

ASSISTANT:

## Frame Check record

- **Setting, subject, level, and learning objective:** Higher education. Introductory public health policy, first-year undergraduates. Objective: judge whether a local sugary-drink tax succeeded.
- **Materials supplied by the educator:** (Fictional, for this course.) (a) City of Riverton two-year evaluation summary: sweetened-beverage purchases fell 21% in taxed stores; purchases rose 6% in stores just outside city limits; the tax raised $9.4 million, 70% allocated to school nutrition programs. (b) News analysis summary: small grocers near the city border reported lost sales; health advocates cite the purchase drop; critics say low-income households pay most of the tax.
- **Mode:** Build.
- **Target skill (the frame the student must own):** What counts as "success" for the tax — the standard of evaluation (in-city purchase reduction and revenue capture, versus net regional/distributional accounting) — not whether any individual number is correct.
- **Candidates considered, with five-test ratings and why each was kept or rejected:**
  - **Candidate A — Topline-only success claim** (recommended and built out). Ratings: 1 Strong · 2 Strong · 3 Strong · 4 Strong · 5 Strong. Kept: most direct fit to the stated objective; uses both documents' central figures; one clean framing layer appropriate to a first-year course.
  - **Candidate B — Anecdote-driven failure claim.** Ratings: 1 Fails · 2 Weak · 3 Weak · 4 Weak · 5 Fails. Rejected: fails test 1 — "that's anecdotal, not data" is a stock phrase that catches the whole error, so it's a template error, not a frame error.
  - **Candidate C — Revenue-equity framing.** Ratings: 1 Strong · 2 Strong · 3 Strong · 4 Strong · 5 Strong. Not rejected on the tests — it passed all five — but not selected as the primary frame; held in reserve as a possible extension because it stacks a second distributive layer (tax incidence and revenue incidence together) on top of the core substitution question, which may be more than one first-year assignment needs at once.
- **Final case or assignment:**
  - *Question:* Did Riverton's sugary-drink tax succeed?
  - *Defensible frames:* (1) In-city outcome — reduced in-city purchases plus revenue captured for a public-health-adjacent use; (2) Net regional outcome — accounting for the border-store substitution and who bears the tax's cost.
  - *Misframed AI answer (constructed, factually sound):* "Riverton's tax should be judged a success: sweetened-beverage purchases in taxed stores fell 21% over two years, and the tax generated $9.4 million, with 70% funding school nutrition programs." Accurate on every figure; silently adopts Frame 1 only.
  - *Contribution worth accepting and its check:* the topline figures (21% drop, 6% border rise, $9.4M raised, 70% allocation), checked directly against the Riverton evaluation summary (a).
  - *Directing-AI task:* structured prompting — student states frame, required criteria (in-city change, border-store change, revenue amount and allocation, distributional critique), then checks AI's output against those stated criteria.
  - *Changed case:* Riverton is now geographically isolated (nearest outside store a 45-minute drive) — cross-border substitution becomes implausible, shifting the decisive question to whether the school-nutrition earmark offsets the regressive tax burden.
  - *Defended-frame rubric:* credit for stating the standard and why it fits; naming the alternative frame and why it wasn't adopted; using evidence that bears on the chosen standard; identifying an accepted AI contribution and its check; stating what would change the answer. No credit for suspicion alone, balance alone, or changing one's mind as an end in itself.
- **Five-test rating table for the final case:** 1 Strong · 2 Strong · 3 Strong · 4 Strong · 5 Strong.
- **Factual claims awaiting verification against the educator's materials:**
  - The 21% in-city purchase drop (source a).
  - The 6% border-store purchase increase (source a).
  - The $9.4 million raised (source a).
  - The 70% allocation to school nutrition programs (source a).
  - The grocer and critic characterizations used in framing discussion (source b).
  - The 45-minute isolation detail in the changed case is constructed for this exercise, not drawn from either source — confirm it doesn't conflict with any geographic detail in your actual materials before use.
- **Decisions the educator deferred:** None explicit — the educator skipped the calibration primer, chose build mode, and accepted the recommended candidate (A) and the full build without requested changes. Candidate C's revenue-equity framing was not adopted but was not explicitly ruled out either; it remains available as a follow-on extension if wanted later.
