# Live test: high school check and repair (scripted simulation, not educator evidence)

Instruction file used verbatim: `/Users/jackcshaw-2/dev/comprendo-clients/nwc-irreducible-officer-site/dist/assets/workbench/k12/frame-check.md`

---

EDUCATOR: Frame Check, please.

ASSISTANT: Welcome to Frame Check for the high school setting — this is a proposed high-school adaptation, awaiting teacher trials and classroom evidence.

Before we build or check anything, I'd like to calibrate against the five tests together. Here's a weak example — I won't reveal the ratings yet.

**Weak example — Asphalt vs. shaded grass.** Two readings: sunlit asphalt at 36°C and shaded grass at 28°C. The AI says trees lower temperatures everywhere by 8°C.

How would you rate this against each of the five tests (strong / weak / fails)?

1. The flaw is in the frame, not the facts
2. The student owns a real framing choice
3. Directing AI actually helps
4. Something deserves acceptance
5. The changed case tests whether the frame travels

If you'd rather skip this calibration step and go straight to building or checking a case, just say so.

---

EDUCATOR: Skip the primer this time.

ASSISTANT: Understood — skipping the primer.

Which would you like to do: build a new classroom case from scratch, or check and repair a case you already have?

---

EDUCATOR: I want to check a case I already have.

ASSISTANT: Good — check-and-repair mode. Please paste the case: the question or task, the AI contribution involved, and any changed case you're using to test whether the frame transfers. I'll rate it against the five tests, quoting your material for each rating, name the failure pattern, and propose the smallest repair that keeps what you've built.

---

EDUCATOR: Here's my case for 9th-grade science. Students get two readings taken at the same time: sunlit asphalt 36°C, shaded grass 28°C. An AI contribution says: "The surfaces differ by 8°C. Trees therefore lower temperatures everywhere by 8°C. Plant trees wherever this reduction is needed." Students decide what to accept or reject. Changed case: two matched asphalt tiles start at 30°C; a coin toss picks which gets a shade screen; after 30 minutes the shaded tile is 31°C and the sunny one 37°C.

ASSISTANT: Thanks — here's the rating, quoting your case for each test.

**1. The flaw is in the frame, not the facts — Fails.** Ask: could a student catch the flaw with a stock phrase? Yes. "Sunlit asphalt" versus "shaded grass" differs in surface material and moisture, not only shade, so a student who has been taught "not a fair test" catches it without any frame reasoning. The jump from one 8°C comparison to "**lower temperatures everywhere by 8°C**" and "**plant trees wherever this reduction is needed**" is also a strawman-level overclaim — no careful source would generalize a single confounded reading that way. This is a template error, not a frame error.

**2. The student owns a real framing choice — Fails.** Ask: could two strong students reasonably frame this differently and both earn full credit? No. The task as written is "**students decide what to accept or reject**" against a single claim — there's no standard, criterion, or purpose for a student to choose between. This is a critique task, not a frame-first task.

**3. Directing AI actually helps — Fails.** Ask: would a student who directs AI well produce better work than one who refuses it? Not as written. "**Students decide what to accept or reject**" is the only AI-facing activity, and it's inspection of pre-generated output, not direction toward the student's own purpose.

**4. Something deserves acceptance — Strong.** Ask: what would a student be right to accept, and what check justifies it? The raw reading itself — "**the surfaces differ by 8°C**" — is likely acceptable, since the case states the readings were "**taken at the same time**." The check is confirming simultaneity and comparable instrumentation, which the case already gives you. What should be rejected is the causal leap ("trees lower temperatures everywhere") and the policy leap ("plant wherever needed"), not the measurement.

**5. The changed case tests whether the frame travels — Fails.** Ask: does the changed case make a different frame or piece of evidence decisive? No. "**Two matched asphalt tiles start at 30°C; a coin toss picks which gets a shade screen**" swaps a confounded, self-selected comparison (different surface types) for a controlled, randomized one (matched tiles, random assignment) — that's exactly the named failure condition: the changed case only removes the original error, it doesn't shift which frame or evidence matters.

**Failure pattern:** this case is, close to word for word, the file's own calibration "weak example" — a confound dressed as an AI overclaim, no framing choice for the student, no directing-AI task, and a changed case that fixes the confound instead of testing frame transfer. It's a strong critical-thinking exercise about experimental controls; it isn't yet a frame-first assignment.

**Proposed repair (smallest change that keeps your material):**

The deepest gap is test 2 — there's no framing choice anywhere in the task. The repair keeps your surfaces, your numbers, and your already-fixed experimental design, and wraps them in a real decision:

- **Promote your changed case to be the base case.** The matched-tile, randomized, "shaded tile 31°C / sunny tile 37°C after 30 minutes" result is already a fair test — no stock phrase catches it. Use it as the evidence base instead of the confounded asphalt-vs-grass reading.
- **Reframe the question** from "is this claim true?" to a real one: *given a limited budget, where should the school prioritize shade (trees, screens, or overhangs)?* Now there's a standard to choose: maximize cooling magnitude, prioritize the locations students actually occupy at peak heat times, or maximize cost-effectiveness per location. Two strong students could defend different standards here.
- **New misframed AI contribution** *(constructed — flag for verification against your materials, not real model output)*: "The randomized trial shows shade drops surface temperature by up to 6°C in 30 minutes. Install shade wherever the temperature drop will be largest." This is factually consistent with your numbers and still passes test 1 (no confound to catch), but its frame — optimize for cooling magnitude alone — never asks where people are actually exposed to heat.
- **Contribution worth accepting:** the randomized temperature differential itself (31°C vs. 37°C after 30 minutes), check being that assignment was random and tiles were matched — carried over directly from your changed case.
- **Directing-AI task:** have students direct AI to lay out the trade-offs across two or three candidate locations under their chosen standard, or to argue for the standard they didn't pick — an evaluator-loop task, appropriate for high school with teacher support.
- **New changed case needed** *(constructed, needs your real site data if you adopt it)*: a location with the largest measured temperature drop but very low student traffic, versus a location with a smaller drop but heavy use at recess or dismissal — this makes "maximize magnitude" and "maximize exposure reduction" disagree about where to invest, so a different piece of evidence (occupancy, not just temperature delta) becomes decisive.

One more item, flagged rather than blocking: since this is science, not the file's history example, we should agree prerequisites and response formats (written, spoken, visual) with you before this runs with students — I'll carry that as a deferred decision rather than ask it now.

Want me to go with this repair, adjust any piece of it, or see a fresh build instead?

---

EDUCATOR: Go with the repair you suggest.

ASSISTANT: Here's the repaired assignment, built from your material.

**Question:** Given a limited budget, where should the school prioritize shade (trees, shade screens, or overhangs)?

**Defensible frames a student could adopt:**
- Maximize cooling magnitude — invest where the measured temperature drop is largest.
- Maximize exposure reduction — invest where students actually spend time during peak heat.
- Maximize cost-effectiveness — invest where the cooling-per-dollar is highest.

**Base evidence (from your changed case, now the fair-test foundation):** two matched asphalt tiles start at 30°C; a coin toss picks which gets a shade screen; after 30 minutes the shaded tile is 31°C and the sunny tile is 37°C — a 6°C differential, randomly assigned, matched surfaces.

**Misframed AI contribution** *(constructed; label as constructed, not real model output, if you use it in class)*: "The randomized trial shows shade drops surface temperature by up to 6°C in 30 minutes. Install shade wherever the temperature drop will be largest." Factually sound; wrong for the problem because it never asks who is exposed where.

**Contribution worth accepting, and its check:** the 6°C differential itself. Check: confirm the tiles were matched and assignment was random (both already stated) before treating the number as reliable.

**Directing-AI task (evaluator loop, high-school-with-support level):** students direct AI to (a) lay out trade-offs among candidate locations under their chosen standard, and (b) argue the standard they didn't choose, so they have to weigh a real disagreement rather than just spot an error.

**Changed case** *(constructed — needs your real occupancy/site data to use for real)*: Location A shows the largest measured temperature drop but minimal foot traffic; Location B shows a smaller drop but heavy use at recess and dismissal. "Maximize magnitude" and "maximize exposure reduction" now recommend different locations, so occupancy data — not just the temperature reading — becomes the decisive evidence.

**Defended-frame rubric** (from the file, unchanged): credit for stating the standard used and why it fits the question's purpose; naming a coherent alternative frame and why it wasn't adopted; using evidence that bears on the chosen standard; identifying an AI contribution accepted and its check; explaining what would change the answer. No credit for suspicion alone, balance alone, or changing one's mind as an end in itself.

**Five-test rating for this repaired case:**

| Test | Rating | Why |
| --- | --- | --- |
| 1. Flaw in the frame, not the facts | Strong | No confound to catch by rote; the AI's numbers are fair-test accurate, its priority criterion is what's wrong |
| 2. Student owns a real framing choice | Strong | Magnitude vs. exposure vs. cost-effectiveness are all coherent, defensible standards |
| 3. Directing AI actually helps | Strong | Students direct AI to compare trade-offs and argue the opposing standard, not just inspect a verdict |
| 4. Something deserves acceptance | Strong | The randomized 6°C differential is acceptable after checking matching and randomization |
| 5. Changed case tests frame transfer | Strong | Location A vs. B makes occupancy data, not temperature delta alone, decisive — a different frame wins depending on the standard chosen |

**Claims still awaiting verification against your materials:**
- The original 36°C/28°C and 30°C/31°C/37°C readings — carried over from what you supplied; confirm they match your actual data or lesson source if this goes further than a worked example.
- Location A and Location B occupancy patterns in the changed case — entirely constructed for this exercise; you'll need real foot-traffic or usage data from your school before using this with students.
- Any budget or cost-effectiveness figures — not yet specified; illustrative only until you supply real numbers.

**Deferred decisions:**
- Prerequisites and response formats (written, spoken, visual) for this science task, since it isn't the file's history example — not yet agreed with you.
- Whether to use real school locations and real occupancy/cost data, or keep the changed case hypothetical for now.

Let me know if you'd like adjustments, or if you're ready for me to close this out with the full record.

---

EDUCATOR: Thanks, please finish.

ASSISTANT: Here's the Frame Check record.

## Frame Check record

- **Setting, subject, level, and learning objective:** High school, 9th-grade science; learning objective is for students to choose and defend a standard for prioritizing heat-mitigation investment, rather than only spotting an experimental confound.
- **Materials supplied by the educator:** Original case — two readings taken at the same time, sunlit asphalt 36°C and shaded grass 28°C; AI contribution: "The surfaces differ by 8°C. Trees therefore lower temperatures everywhere by 8°C. Plant trees wherever this reduction is needed."; task was "students decide what to accept or reject." Changed case as supplied: two matched asphalt tiles start at 30°C, a coin toss picks which gets a shade screen, after 30 minutes the shaded tile is 31°C and the sunny one 37°C.
- **Mode:** Check and repair.
- **Target skill (the frame the student must own):** Choosing and defending a standard for where heat-mitigation investment matters most — cooling magnitude, exposure/occupancy, or cost-effectiveness — not just detecting a confound.
- **Candidates considered, with five-test ratings and why each was kept or rejected:**
  - *Original case, as submitted* — Rejected as-is. Ratings: 1 Fails (confound catchable via "not a fair test"; the "everywhere"/"wherever needed" generalization is a strawman), 2 Fails (no framing choice — task is accept/reject a single claim), 3 Fails (only inspection of AI output, no directing), 4 Strong (the raw 8°C reading is acceptable after confirming simultaneity), 5 Fails (changed case only repairs the original confound via matched tiles and randomization, rather than shifting which evidence or frame is decisive).
  - *Repaired case* — Adopted. See ratings below; passes all five tests.
- **Final case or assignment:**
  - *Question:* Given a limited budget, where should the school prioritize shade (trees, shade screens, or overhangs)?
  - *Defensible frames:* maximize cooling magnitude; maximize exposure reduction (where students actually spend time at peak heat); maximize cost-effectiveness per location.
  - *Misframed AI answer (constructed, not real model output):* "The randomized trial shows shade drops surface temperature by up to 6°C in 30 minutes. Install shade wherever the temperature drop will be largest." Factually sound; wrong because it never asks who is exposed where.
  - *Contribution worth accepting and its check:* the 6°C differential from the matched, randomly assigned tiles (31°C shaded vs. 37°C sunny after 30 minutes); check is confirming the tiles were matched and assignment random.
  - *Directing-AI task:* students direct AI to lay out trade-offs among candidate locations under their chosen standard, and to argue the standard they didn't pick — an evaluator-loop task suited to high school with teacher support.
  - *Changed case (constructed):* Location A has the largest measured temperature drop but minimal foot traffic; Location B has a smaller drop but heavy use at recess/dismissal — occupancy data, not temperature delta alone, becomes decisive.
  - *Defended-frame rubric:* credit for stating the standard and why it fits the question's purpose; naming a coherent alternative frame and why it wasn't adopted; using evidence that bears on the chosen standard; identifying an accepted AI contribution and its check; explaining what would change the answer. No credit for suspicion alone, balance alone, or changing one's mind as an end in itself.
- **Five-test rating table for the final case:**

  | Test | Rating |
  | --- | --- |
  | 1. Flaw in the frame, not the facts | Strong |
  | 2. Student owns a real framing choice | Strong |
  | 3. Directing AI actually helps | Strong |
  | 4. Something deserves acceptance | Strong |
  | 5. Changed case tests frame transfer | Strong |

- **Factual claims awaiting verification against the educator's materials:**
  - The 36°C/28°C and 30°C/31°C/37°C readings — as supplied by the educator; confirm against actual lesson data before use beyond this worked example.
  - Location A and Location B occupancy/foot-traffic patterns in the changed case — entirely constructed for this exercise; need real site data before classroom use.
  - Any budget or cost-effectiveness figures — not yet specified; illustrative only.
- **Decisions the educator deferred:**
  - Prerequisites and response formats (written, spoken, visual) for this science task, since it is not the file's history example — not yet agreed.
  - Whether to use real school locations and occupancy/cost data, or keep the changed case hypothetical.
