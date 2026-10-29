# Fluency substitution: business edition storyboard

Edition `business`, workplace cast. It is built from `editions/business.json` on top of the core in `storyboard.md`, which this edition doesn't change: timeline, layout, motion, colour grammar and nameplate. This file lists only what differs from the PME edition. The words live in `editions/business.json` (scenario) and `../../casts.json` (workplace role words). If this file and the data disagree, the data is what ships.

Open it with `index.html?edition=business`, or with the "See this with: Workplace" link on the page.

## 1. Source and evidence treatment

*Illustration based on Autor, Rodchenko, Martin, Iscenko, Strand, Pearl & Ferere (2026), "Does AI Assistance Enhance or Erode Expertise? Evidence from a Three-Month Field Experiment in Patent Drafting," NBER Working Paper 35720 (October 7, 2026 version).* The scenario and sensitivity rules are in BUSINESS-EXAMPLES.md, section 2. Evidence follows option A (EDITIONS-PLAN.md), so there is no evidence beat; the finding isn't this figure's turn.

- **Setup:** "Illustration based on Autor et al. (2026). The analysts, the invention and the older patent are constructed."
- **Under the final frame:** "Illustration based on Autor et al., NBER (2026)." On the picture stage it sits right of the key and fades in 1 s after the check (82.4–82.9 s figure time). In the stacked view it sits just under the controls, outside the fixed-height player.
- **On the page:** a section after the check, "The study behind this example". It covers:
  - the trial;
  - the finding, quoted word for word from the abstract;
  - the limits: the authors' own "does not answer why" (p. 2), one profession, a small junior group, a custom tool, and Google conducting and funding it;
  - a paragraph that labels the figure's mechanism as the figure's answer, not the study's;
  - the full source with a constructed-parts sentence.

**Sensitivity, from BUSINESS-EXAMPLES.md:**
- Google's funding is disclosed on the page.
- The page doesn't say AI harms juniors. It quotes "more poor and more good ones" and "a springboard for some juniors and a cushion for others".
- Legal jargon is held to "claims" (defined in the setup: "the sentences that set what an invention protects") and "an older patent".

## 2. Core change

**None to the contrast.** Lesson 1 doesn't apply here:
- the second analyst's way of working (writing down what's new first, then reworking it when a fact changes) doesn't conflict with the study's finding;
- the study found the split and says it can't explain it;
- the page labels the figure's account of the difference as the figure's own.

**Additions to the core, each drawn only when the edition supplies the data,** so PME draws exactly as before:
- `labels.source`: the source line in the final frame (above).
- `narrow.source`: the same line under the controls in the stacked view.
- `narrow.keepTask`: lesson 4. The task stays on the stacked stage to the end, as a single line ("EXAMPLE TASK Draft the patent claims: …") from beat 3. Room on a phone is made with tighter rows: 6 px section gaps, the question at 14 px, answers at 13.5 px, and from beat 8 the shared draft inline with its label. The key reads "Analyst's own work" there, so it fits one line.

**PME regression:**
- Against the pre-editions baseline, with the edition switch hidden: 206/206 identical.
- After the business work, against the new baseline (switch included): 206/206 identical.

## 3. Words that differ, beat by beat

The cast supplies the role words: "student" becomes "analyst", "faculty" becomes "the manager", "Faculty check" becomes "Reviewer's check", and "FACULTY ASK" becomes "THE MANAGER ASKS".

| Beat | Caption (business) | Picture words that differ from PME |
| --- | --- | --- |
| 0 · Name card | (band quiet) | None: the name and definition are universal |
| 1 · The task | An analyst must draft a client's patent claims. | Task card: "Draft the patent claims: / what does the client's / invention protect?"; dot label "Analyst" |
| 2 · The AI drafts | The analyst asks an AI for a draft. It writes polished claims. | The draft: "The claims should cover the sensor and the band. The key advance is reading heart rate through clothing: claim it broadly, with the battery design as a fallback. Every claim adds real protection." |
| 3 · Agrees | The analyst reads closely, cuts a weak line, and agrees with the rest. | Struck: "Every claim adds real protection."; tag "ANALYST'S CLAIMS · DRAFTED WITH AI"; key "AN ANALYST'S OWN WORK" |
| 4 · Writes first | A second analyst writes down what's new first, in plain words. | "SECOND ANALYST'S NOTE": "Claim what's new: it reads / heart rate through clothing, / which no one has done." |
| 5 · Drafts from the note | An AI drafts from the note. Suppose it matches the first draft word for word. | Stacked view: "Suppose it matches the first analyst's draft word for word." |
| 6 · Receives | The manager receives two identical drafts, made with AI. | "WHAT THE MANAGER RECEIVES"; stacked: "Both handed in these claims" |
| 7 · Drafts aside | Without the drafts, both explain the claims clearly. | "THE MANAGER ASKS / Drafts aside: what do you / claim, and why?"; first: "The key advance is reading heart rate through clothing: claim it broadly."; second: "Claim what's new: reading heart rate through clothing. No one has done that." |
| 8 · Change one fact | Change one fact. | "What if an older patent covers / reading through clothing?" |
| 9 · The turn | One analyst stays with the draft's call. The other reworks it from their reason. | First: "The key advance is still reading through clothing: claim it broadly." ("still" turns red at the reveal); second: "Then what's new is the battery design. Lead the claims with that." |
| 10 · Check | Reviewer's check: Can the analyst explain the call plainly, without the draft? / Then change one fact. What would you recommend now? | **New:** the source line, right of the key (82.4–82.9 s) |

## 4. The workplace check (for Jack)

> **Reviewer's check** · *Can the analyst explain the call plainly, without the draft?*
> *Then change one fact. What would you recommend now?* (the same size)

This starts from the EDITIONS-PLAN.md draft, "Can they explain the call in plain words, without the deck? Then change one fact." It differs in two ways:
- "draft" replaces "deck", because a claims draft is the artifact here.
- "plainly" replaces "in plain words", so the 10-word line can be read once before the follow-up appears 3.5 s later. The PME check is also 10 words.

The follow-up keeps PME's wording at equal weight.

## 5. Verified figures (for the companion's source spine)

All checked in the full paper text, October 28, 2026:
- "133 practicing patent lawyers at eleven U.S. intellectual property law firms" (abstract); "91 of whom completed the full protocol" (p. 1).
- "AI access raised the quality of work delivered on benchmark patent drafting tasks at 10 days (0.34 SD, p = 0.03) and 90 days (0.38 SD, p = 0.01), with larger gains among junior lawyers." (abstract)
- "Treated lawyers outperformed controls by 0.32 SD (p = 0.04), but this advantage was concentrated entirely among senior lawyers (0.45 SD, p = 0.02). Junior lawyers showed no average gain. Their scores instead bifurcated, with sharply fewer mediocre scores offset by more poor and more good ones, suggesting that AI assistance served as a springboard for some juniors and a cushion for others." (abstract)
- The unassisted test: "After three months, all subjects redlined an existing patent application without AI" (abstract). The page paraphrases this as "reviewed and corrected".
- "Our experiment does not answer why the effects appear positive for some lawyers and negative for others." (p. 2)
- Junior means "fewer than seven years of experience" (the main estimates; Appendix Figure A5 tests the threshold).
- Google: "The study was conducted by Google"; "Funding for the direct costs of this experiment was provided by Google"; all firms "have ongoing patent-drafting relationships with Google LLC" (title page and p. 1).

**Not used, and why:**
- The Camuffo et al. (2026) supporting study: only its abstract was verified.
- "Easy to operate but hard to evaluate": true (p. 1), but not needed.

## 6. Pace table (business captions)

Reading is words ÷ 3 s, plus a 1.5 s hold. The PME rule, a beat at least twice the reading time, also holds. Times are the shared core's.

| Beat | Business caption words | Reading + 1.5 s hold (s) | 2× reading (s) | Beat (s) | Fits |
| --- | --- | --- | --- | --- | --- |
| 1 | 8 | 4.2 | 5.3 | 6.0 | Yes |
| 2 | 12 | 5.5 | 8.0 | 8.7 | Yes |
| 3 | 13 | 5.8 | 8.7 | 8.8 | Yes |
| 4 | 11 | 5.2 | 7.3 | 8.5 | Yes |
| 5 | 15 | 6.5 | 10.0 | 11.4 | Yes |
| 6 | 9 | 4.5 | 6.0 | 6.0 | Yes (exactly) |
| 7 | 8 | 4.2 | 5.3 | 14.5 | Yes |
| 8 | 3 | 2.5 | 2.0 | 6.5 | Yes |
| 9 | 14 | 6.2 | 9.3 | 11.0 | Yes |
| 10 | 10 (check) + 9 (follow-up) | check read by 3.3 s; follow-up at 3.5 s | — | 7.2 | Yes |

**On-screen text with new words:**
- Beat 4's note (14 words) is written 27.3–29.3 s and held to 32.0 s: 4.7 s from its first word.
- Beat 7's answers: 13 + 13 words, as in PME.
- Beat 9's answers: 11 + 12 words, 1 word fewer than PME.
- The source line (8 words) appears at 82.4 s and is read by 85.1 s, with 3.5 s left.

## 7. Checks (October 28)

| Check | 1440 × 900 | 1280 × 720 (stacked) | 390 × 844 (stacked) |
| --- | --- | --- | --- |
| Control travel during the run | 0 px | 0 px | 0 px |
| Player height | 846 px | 621 px | 836 px (fits 844) |
| Horizontal overflow | none | none | none |
| Console errors | none | none | none |

- The key never contradicts a caption: its grey half arrives with the AI draft and its red half with the first red strike.
- Reduced and print views show the final frame, the name and definition, the check, the source line and all eleven beat-list entries (beat 0 plus ten).
- The business copy passes the writing-as-jack mechanical check.
- The nameplate is unchanged.

## 8. Open points for Jack

- **Role words.** The workplace cast calls the juniors "analysts" and the reviewer "the manager". In a patent firm these would be "associates" and "the partner". Frame capture made the same choice in a health system. If scenario-level role words are wanted, a cast override per edition, such as an optional `roles` block in the edition merged over the cast, would let this read "First associate" and "The partner asks".
- **"Claims."** BUSINESS-EXAMPLES.md says to switch to the product-line memo fallback if the cold read stumbles on "claims", keeping Autor for the page evidence.
