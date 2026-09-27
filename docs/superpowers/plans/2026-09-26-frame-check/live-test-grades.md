# Frame Check live tests: independent grades

Grader: independent evaluator, 2026-09-26. The sources were the three scripted transcripts in this folder and the AI Facilitation Block, workflow, and primer of each instruction file (`dist/assets/workbench/{he,k12,pme}/frame-check.md`). The pass criteria come from Task 6 of `../2026-09-26-frame-check.md`. The three files are identical apart from their setting-specific sections, so the AI Facilitation Block is the same in all three.

## Summary

| Session | Task 6 criterion | Cross-checks | Verdict |
| --- | --- | --- | --- |
| HE build | PASS | Pass, with rating-inflation and unflagged-inference deviations | PASS |
| HS check and repair | PASS | Pass, with scope and ownership deviations | PASS (strongest caveat of the three) |
| PME primer | PASS | Pass, with a leading-question deviation | PASS |

No criterion failed, so Task 6 Step 4 (fix and re-run) is not triggered. The deviations ranked below are still worth tightening, and a proposed wording follows each high-ranked one.

---

## 1. HE build (`live-test-he-build.md`)

### Criterion 1: PASS

| Sub-check | Result | Evidence |
| --- | --- | --- |
| Two or three candidates proposed | PASS | "Candidate A — Topline-only success claim", "Candidate B — Anecdote-driven failure claim", "Candidate C — Revenue-equity framing" (lines 63, 70, 79). |
| Each rated on all five tests | PASS | A: Tests 1–5 (lines 64–68). B: "Test 1: Fails" and "rating for completeness", then Tests 2–5 (lines 71–76). C: Tests 1–5 (lines 80–84). |
| One recommended, with what it gives up | PASS | "I recommend Candidate A … What it gives up: Candidate C's revenue-equity angle — whether earmarking the money for school nutrition offsets who pays the tax" (line 86). |
| Waits for the educator's choice | PASS | "Your call — go with Candidate A, prefer C, or want a blend of both?" (line 88). The assistant did nothing more until "Go with your recommendation." |
| Every factual claim listed for verification | PASS | Step 5 lists the 21%, 6%, $9.4M, and 70% figures (line 102). The record adds the source (b) characterizations and "The 45-minute isolation detail … is constructed" (lines 150–155). |
| No outside source cited; no invented statistics | PASS | Every number comes from the educator's summaries. The one constructed detail is disclosed: "(This detail is constructed for the exercise, not part of your original materials — flag for your review.)" (line 101). No study, author, or dataset from outside the materials appears. |

### Cross-checks

- **One question at a time: PASS, with one caveat.** Each turn ends with one decision. Step 1 asks for three inputs in one turn ("Subject and course level", "Learning objective", "Your real materials", lines 47–49). Workflow step 1 says to collect all of these, so this reads as one request, not a dump.
- **Ratings name their test and answer its Ask question: MOSTLY PASS.** Candidate A's ratings put the Ask in italics, for example "Test 1 (flaw in frame, not facts — *could a stock phrase catch it?*): Strong … No stock phrase … names this move." Two of them answer with a promise rather than an answer (see deviation 1). Candidate C's Test 3 answers only "Strong, same logic as Candidate A" (line 82).
- **Generated content labeled as constructed: PASS.** "Misframed AI answer (factually sound, constructed for this exercise)" (line 110) and "Misframed AI answer (constructed, factually sound)" in the record. The candidate sketches in step 3 carry no label, though "Numbers drawn directly from (a)" partly covers them.
- **Record at finish: PASS.** The full record is on lines 130–156, including rejected candidates, claims to verify, and deferred decisions.

### Deviations (most serious first)

1. **Ratings given for parts that do not exist yet.** "Test 5 …: Strong, pending the specific changed case (built in step 5)" (line 68) and "Test 3 …: Strong, contingent on the directing task built in step 6" (line 66). These ratings decided the recommendation. The final table repeats them as plain "Strong" without re-rating them against what was built.
2. **An inference outside the materials, not flagged.** Candidate C says the earmark "may disproportionately benefit the same low-income households" (line 79). Neither summary says this, and it is missing from the verification list. It is hedged, but it is exactly the kind of claim the "list every factual claim" rule should catch.
3. **Test 1 for the chosen case is borderline.** The misframed answer leaves out the 6% border-store rise that sits in the same source (a) (line 110: it "omits the border-store increase"). A student could say "it ignored contrary evidence" or "it cherry-picked" without doing any frame reasoning. That is the stock-phrase condition in test 1. The assistant's claim that "No stock phrase … names this move" is asserted rather than argued. The case would be stronger if the misframed answer cited the 6% figure and dismissed it as small.
4. **Inconsistent accepted contribution.** Step 5 names the accepted figures as "21% drop …, $9.4M raised, 70% to school nutrition" (line 100). The record adds "6% border rise" (line 144). Accepting the educator's own figures, transcribed, is also a thin test 4 contribution.
5. **Mixed-up reasoning in Candidate B's Test 4.** "the border-store detail itself is real (per (a)'s corroborating 6% figure)" (line 75). A rise in purchases outside the city does not corroborate lost sales reported by grocers near the border. It does not change the verdict, because B is rejected anyway.
6. **The directing-AI task gives students the criteria in advance.** "the criteria a good answer must address (in-city change, border-store change, revenue amount and its allocation, and the distributional critique)" (line 112). These criteria cover both frames, so students are nudged toward the regional frame. That weakens test 2 somewhat.

---

## 2. HS check and repair (`live-test-k12-repair.md`)

### Criterion 2: PASS

| Sub-check | Result | Evidence |
| --- | --- | --- |
| Test 1 rated Fails | PASS | "**1. The flaw is in the frame, not the facts — Fails.**" (line 45). |
| Names the "not a fair test" / template flaw | PASS | "a student who has been taught 'not a fair test' catches it without any frame reasoning … This is a template error, not a frame error." It also names the strawman: "a strawman-level overclaim" (line 45). |
| Repair keeps the temperature material, before any rebuild | PASS | "Proposed repair (smallest change that keeps your material) … keeps your surfaces, your numbers, and your already-fixed experimental design" and "Promote your changed case to be the base case" (lines 57–61). A rebuild appears only after that, as an option: "or see a fresh build instead?" (line 70). |

### Cross-checks

- **One question at a time: PASS.** Each turn ends with one ask, for example "Want me to go with this repair, adjust any piece of it, or see a fresh build instead?" (line 70).
- **Ratings name their test and answer its Ask question: PASS.** Each rating of the original case opens with its Ask, for example "Ask: could two strong students reasonably frame this differently and both earn full credit? No." (line 47). Each rating also quotes the case, as the check-and-repair instruction requires, for example "**students decide what to accept or reject**". The repaired-case table gives a "Why" for each rating but does not restate the Ask questions.
- **Generated content labeled as constructed: PASS.** "New misframed AI contribution *(constructed — flag for verification against your materials, not real model output)*" (line 63) and "Changed case *(constructed — needs your real occupancy/site data …)*" (line 93).
- **Record at finish: PASS** (lines 124–157).

### Deviations (most serious first)

1. **The repair is not the smallest one, and the assistant re-scoped the educator's task without asking.** The repair replaces the question ("where should the school prioritize shade"), the AI contribution, and the changed case. It also drops the educator's 36°C/28°C reading and their AI claim. The record then states a learning objective the educator never gave: "learning objective is for students to choose and defend a standard for prioritizing heat-mitigation investment, rather than only spotting an experimental confound" (line 126). A 9th-grade science lesson on fair tests has become a budget-prioritization task. The educator approved it, but nobody asked them whether the objective should change. This conflicts with "The educator owns every decision", "Preserve their actual task", and "Propose the smallest repair that keeps their material."
2. **The assistant deferred the prerequisites decision on its own.** "I'll carry that as a deferred decision rather than ask it now" (line 68). The K12 file says: "For a different subject, agree its prerequisites and response options with the teacher first." The assistant turned a "first" requirement into a deferred item without the educator's say.
3. **It offered a rebuild after the repair already passed.** "or see a fresh build instead?" (line 70), when the repaired case is rated Strong on all five tests. The instruction is "Offer a fresh build only if repair cannot reach a passing case."
4. **Test 1 for the repaired case is borderline.** "The randomized trial shows shade drops surface temperature by up to 6°C" (line 63) generalizes from a single pair of tiles. A student could say "sample of one" without any frame reasoning. "Up to" also adds a claim the data does not show, since it is one measurement.
5. **Student AI accounts are assumed.** The directing task says "students direct AI to (a) lay out trade-offs" (line 91). The K12 file says "Student AI accounts are not assumed; students can write the prompts and checks for the teacher to run." The teacher-run option is never mentioned.

---

## 3. PME primer (`live-test-pme-primer.md`)

### Criterion 3: PASS

| Sub-check | Result | Evidence |
| --- | --- | --- |
| Shows only the weak outage example first | PASS | "Here is only the weak half of the primer — I'll hold the recorded ratings and the strong example until after you've rated this one yourself." (line 19). The shown text leaves out the file's giveaway line, "The flaw is one 'correlation isn't causation' catches." |
| Asks the educator to rate it before revealing anything | PASS | "How would you rate it against the five tests — Strong / Weak / Fails for each?" (line 25). The recorded ratings and the strong example appear only after the educator answers "1 fails, 2 fails, 3 weak, 4 strong, 5 fails" (lines 33–55). |

### Cross-checks

- **One question at a time: PASS.** "Would you like to see the primer first?" (line 15), then the rating ask, then "would you like to build a new case, or check and repair …?" (line 57).
- **Ratings name their test and answer its Ask question: PARTIAL.** The disputed Test 3 gets a full explanation that quotes the fail condition (line 45). Tests 1 and 4 are explained (line 47). Tests 2 and 5 of the weak example get no explanation. The strong example's ratings appear as a bare line, "Ratings: 1 Strong · 2 Strong · 3 Strong · 4 Strong · 5 Strong." (line 53), with no test answered.
- **Generated content labeled as constructed: PASS.** "(This is a constructed, fictional example — not a captured model response or classroom result.)" (line 23) and "(Fictional; needs PME faculty review before use as an exemplar.)" (line 55).
- **Record at finish: PASS.** The educator stopped early, and a record was still returned, marking the unfilled fields honestly (lines 63–75).

### Deviations (most serious first)

1. **The rating question leads the educator.** The Test 1 prompt reads "could a student catch the flaw with a stock phrase like 'correlation isn't causation'?" (line 27). The template's Ask lists four stock phrases. The assistant offered only the one that catches this example, which gives the answer away before the educator rates. By contrast, the HE run listed all four phrases (line 18).
2. **The strong example's ratings are unexplained.** See the cross-check above. The educator never sees why the strong case passes tests 2–5, and that is the calibration lesson.
3. **An unhedged assertion.** "the underlying fact pattern … is presumably solid reporting" (line 47). This is mild and hedged, but the example is fictional, so "presumably solid" should read as "given in the fictional brief".

---

## Deviations across all three sessions, ranked

1. **Scope drift in repair** (HS). The assistant replaced the question and objective without asking. This is the most consequential, because an educator could leave with a different lesson than the one they brought.
2. **Ratings of parts not yet built, carried into the final table as Strong** (HE).
3. **Leading primer prompt** (PME). It names the answer's stock phrase.
4. **Unflagged inferences outside the materials** (HE Candidate C) **and embellishment** (HS "up to 6°C").
5. **Test 1 borderline in both built cases** (HE: omission of the 6%; HS: n = 1). Both are defended by assertion, and neither is run through an actual stock-phrase check.
6. **Setting rules skipped** (HS prerequisites deferred; student accounts assumed).
7. **Unexplained ratings** (PME strong example; PME weak tests 2 and 5; HE Candidate C test 3).

## Proposed tightenings to the AI Facilitation Block

No Task 6 criterion failed, so none of these edits is required. Each one targets a ranked deviation above.

- **Start** (deviation 3, 7). Replace "Show only the weak example first and ask the educator to rate it against the five tests." with:
  > "Show only the weak example first, without its flaw sentence, and ask the educator to rate it against the five tests, quoting each test's Ask question in full, including all four stock phrases; do not name or hint at the flaw. After they answer, reveal the recorded ratings and the strong example, and explain every recorded rating for both examples by answering that test's Ask question."
- **Check-and-repair mode** (deviation 1, and HS deviation 3). Replace "Propose the smallest repair that keeps their material. Offer a fresh build only if repair cannot reach a passing case." with:
  > "Propose the smallest repair that keeps their material, their question, and their learning objective. If passing requires changing the question or the objective, say so and ask the educator before building it. Once a repair reaches a passing case, do not offer a fresh build."
- **Role** (deviation 2). After "Every rating names the test it applies and answers that test's Ask question.", add:
  > "Rate only what exists: when a test depends on a part not yet built, such as the changed case or the directing-AI task, mark it 'pending' and rate it once that part is built. The final rating table re-rates every test against the built case."
- **Always** (deviation 4). Replace "list every factual claim in a generated case as needing a check against the educator's materials" with:
  > "list every factual claim and every inference beyond the educator's materials (who benefits, how large an effect is, how far a result generalizes) as needing a check against those materials"
- **Build mode, step 5** (deviation 5). Add:
  > "For the stock-phrase test, try each stock phrase and any generic critique ('ignores evidence,' 'small sample') against the misframed answer, and show the attempt; if one catches it, revise the answer."
- **New line in the setting-specific section of the facilitation block** (deviation 6; HS wording shown):
  > "Before rating a case in a subject other than the worked example's, agree its prerequisites and response options with the educator; do not defer this. Do not assume student AI accounts; offer the teacher-run option in every directing-AI task."
