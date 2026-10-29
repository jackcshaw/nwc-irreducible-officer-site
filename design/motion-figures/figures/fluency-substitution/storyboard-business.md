# Fluency substitution: business edition storyboard

Edition `business`, round 2 (after business cold read 1, `tests/business-figure-read-1.md`). It is built from `editions/business.json` on top of the core in `storyboard.md`: timeline, motion, colour grammar and nameplate. This file lists only what differs from the PME edition. Role words are written literally in `editions/business.json` ("associate", "the partner"), so the edition no longer takes any words from the workplace cast. A per-edition cast override can replace them later. If this file and the data disagree, the data is what ships.

Open it with `index.html?edition=business`, or with the "See this with: Workplace" link on the page.

## 1. Source and evidence treatment

*Illustration based on Autor, Rodchenko, Martin, Iscenko, Strand, Pearl & Ferere (2026), "Does AI Assistance Enhance or Erode Expertise? Evidence from a Three-Month Field Experiment in Patent Drafting," NBER Working Paper 35720 (revised October 2026).* The scenario and sensitivity rules are in BUSINESS-EXAMPLES.md, section 2. Evidence follows option A (EDITIONS-PLAN.md), so there is no evidence beat.

- **Setup:** two *junior* associates with the same task, the same inventor's notes and the same AI (lessons 11 and 12). A bridge sentence carries the setting to everyday work: "The same goes for any polished draft you sign: change one fact, and you find out whether the reasoning in it is yours." It ends with "Illustration based on Autor et al. (2026). The associates, the invention and the older patent are constructed."
- **Under the final frame:** "Illustration based on Autor et al., NBER (2026)." On the picture stage it sits right of the key and fades in 1 s after the check (82.4–82.9 s figure time). In the stacked view it sits just under the controls.
- **On the page:** a section after the check, "The study behind this example". It covers:
  - the trial: 133 lawyers, 91 of whom completed it;
  - the abstract's drafting finding;
  - the unassisted test, taken by the 91 who completed the study, with the abstract's quote;
  - a plain paragraph: the split was among juniors (fewer than seven years), seniors gained, and 15 redlines were flagged for possible AI use;
  - the limits: "does not answer why" (p. 2), one profession, a small junior group, a custom tool, Google conducting and funding it;
  - what the figure is: one way the split among juniors could arise. The study's tested results are scores. Its look at reasons (interviews and an exploratory, AI-assisted reading of the redlines) is in non-public supplementary materials. The authors float time spent as a possible mechanism. The figure's account is an illustration, not a finding;
  - the full source with a constructed-parts sentence.

**Sensitivity, from BUSINESS-EXAMPLES.md:**
- Google's funding is disclosed on the page.
- The page doesn't say AI harms juniors. It quotes "more poor and more good ones" and "a springboard for some juniors and a cushion for others", and says seniors gained.
- Legal jargon is held to "claims" (defined in the setup) and "an older patent".

## 2. Core changes and additions

**The contrast, round 2 (lessons 8–10):**
- **Beat 7 no longer separates them.** Both answer "what do you claim, and why?" with a claim and a reason. The first restates the draft's reason ("No earlier device does it" is the draft's "which no earlier device does"). The second gives the same reason in their own words. Only the colours, after the reveal, tell them apart.
- **The first associate's answer to the changed fact is reasonable but borrowed:** "Then lead with the battery design, as the draft says." Going to the fallback is a sound move. Their only reason for it is the draft.
- **The second associate's move is their own.** Their note, written before any AI, records how the device works ("by adjusting its sensor to each fabric"). When an older patent covers the idea, they narrow the claims to that mechanism, which the draft never mentions. A lay reader can follow it: if someone else owns the idea, you protect your own way of doing it.
- **The draft keeps its fallback**, so the first associate's borrowing is visible: at the reveal, "the battery design" in their answer and in the first draft is marked as the AI's.
- **Against the paper (lesson 10).** The paper's only floated mechanism is time spent: juniors using AI worked faster and showed no unassisted gains. The second associate spends more time, not less, by writing the reason down first, so their practice isn't one the paper ties to poor outcomes.

**Additions to the core, each drawn only when the edition supplies the data,** so PME draws exactly as before:
- `picture: {minText: 13, laptop: true}` (lesson 7): the smallest picture text is 13 units, which means mono labels at 13 and the paper and note cells at scale 0.65. On laptop windows (720 px wide or more, 860 px high or less), a compact caption band (92 px; name, definition, check and follow-up one line each at 15 and 20 px) and a 166 px `--mf-chrome` let the drawn picture stay. The stacked view takes over only when 13-unit text would render under 11 px.
- `narrow.noteKept` (fix 6, phones): from beat 7 the stacked stage keeps the second associate's note under one label, "Second associate's note, not handed in", so the final frame shows why the two differ.
- `labels.source`, `narrow.source`, `narrow.keepTask`: as in round 1. Phone rows are tight: questions at 13 px, answers at 13.5 px, and the shared draft inline from beat 8.
- Core fix: the second paper now ends wherever the cut sentence starts on line 5, instead of after line 5's first segment. PME's line 5 has one segment before the cut, so it draws the same.

**PME regression:** after the round-2 work, against `regression/baseline`: 206/206 identical. That includes 1280 × 720, which stays stacked for PME.

## 3. Words that differ, beat by beat

| Beat | Caption (business) | Picture words that differ from PME |
| --- | --- | --- |
| 0 · Name card | (band quiet) | None: the name and definition are universal |
| 1 · The task | An associate must draft a client's patent claims. | Task card: "Draft the patent claims: / what does the client's / invention protect?"; dot label "Associate" |
| 2 · The AI drafts | The associate asks an AI for a draft. It writes polished claims. | The draft: "Cover the sensor and the band. The key advance is reading heart rate through clothing, which no earlier device does: claim it broadly, with the battery design as a fallback. Every claim adds real protection." |
| 3 · Agrees | The associate reads closely, cuts a weak line, and agrees with the rest. | Struck: "Every claim adds real protection."; tag "THEIR CLAIMS · DRAFTED WITH AI"; key "ASSOCIATE'S OWN WORK" (the same words on phones) |
| 4 · Writes first | A second associate first writes down what's new and how it works. | "SECOND ASSOCIATE'S NOTE": "What's new: it reads heart rate / through clothing, by adjusting / its sensor to each fabric." |
| 5 · Drafts from the note | An AI drafts from the note. Suppose it matches the first draft word for word. | Stacked view: "Suppose it matches the first associate's draft word for word." |
| 6 · Receives | The partner receives two identical drafts, made with AI. | "WHAT THE PARTNER RECEIVES"; stacked: "Both handed in these claims" |
| 7 · Drafts aside | Without the drafts, both explain the claims clearly. | "THE PARTNER ASKS / Drafts aside: what do you / claim, and why?"; first: "Reading through clothing. No earlier device does it."; second: "Reading through clothing. No one has done that before." |
| 8 · Change one fact | Change one fact. | "What if an older patent covers / reading through clothing?" |
| 9 · The turn | One associate takes the draft's fallback. The other reworks the call from how it works. | First: "Then lead with the battery design, as the draft says." ("the battery design" takes the AI's band at the reveal; the rest stays ink); second: "Then claim how ours does it: the sensor adjusts to each fabric." |
| 10 · Check | Partner's check: Can the associate explain the call plainly, without the draft? / Then change one fact. What would you recommend now? | The source line, right of the key (82.4–82.9 s) |

The kept-draft tag is "THEIR CLAIMS" because "ASSOCIATE'S CLAIMS · DRAFTED WITH AI" at 13 units ran into the second tag in beat 5.

## 4. The workplace check (for Jack)

> **Partner's check** · *Can the associate explain the call plainly, without the draft?*
> *Then change one fact. What would you recommend now?* (the same size)

The heading is "Partner's check" in the caption, the beat list and the page section. Apart from the role word, the wording is the same as in round 1.

## 5. Verified figures (for the companion's source spine)

All checked in the full paper text (revised October 2026), October 28, 2026:
- "133 practicing patent lawyers at eleven U.S. intellectual property law firms" (abstract); "91 of whom completed the full protocol" (p. 1).
- "AI access raised the quality of work delivered on benchmark patent drafting tasks at 10 days (0.34 SD, p = 0.03) and 90 days (0.38 SD, p = 0.01), with larger gains among junior lawyers." (abstract)
- "Treated lawyers outperformed controls by 0.32 SD (p = 0.04), but this advantage was concentrated entirely among senior lawyers (0.45 SD, p = 0.02). Junior lawyers showed no average gain. Their scores instead bifurcated, …" (abstract)
- "Measured by unassisted judgment, only senior lawyers emerged from three months of AI use with improved capability." (p. 2)
- "we identify 15 of 91 redlining submissions where AI use appears possible … Excluding them lowers the full-sample estimate below conventional significance, while the senior effect remains significant at the 10 percent level." (p. 3)
- "Our experiment does not answer why the effects appear positive for some lawyers and negative for others." (p. 2)
- Junior means "fewer than seven years" of experience (p. 23).
- "Section 1 of the Supplementary Materials reports post-experiment interviews with treated participants and an LLM-based qualitative analysis of redlining submissions." (p. 29); "The Supplementary Materials are not intended for publication" (footnote 8).
- "Juniors using AI worked faster but showed no unassisted gains." (p. 30)
- Google: "The study was conducted by Google"; "Funding for the direct costs of this experiment was provided by Google"; all firms "have ongoing patent-drafting relationships with Google LLC" (title page and p. 1).

**Not used, and why:**
- The September 2026 version's printed qualitative analysis (seniors' "rationale-rich annotations"): reported by the cold reader, but I didn't verify it in that version's text, and the current version moved it out of the paper.
- The Camuffo et al. (2026) supporting study: only its abstract was verified.

## 6. Pace table (business captions)

Reading is words ÷ 3 s, plus a 1.5 s hold. The PME rule, a beat at least twice the reading time, also holds. Times are the shared core's.

| Beat | Business caption words | Reading + 1.5 s hold (s) | 2× reading (s) | Beat (s) | Fits |
| --- | --- | --- | --- | --- | --- |
| 1 | 8 | 4.2 | 5.3 | 6.0 | Yes |
| 2 | 12 | 5.5 | 8.0 | 8.7 | Yes |
| 3 | 13 | 5.8 | 8.7 | 8.8 | Yes |
| 4 | 12 | 5.5 | 8.0 | 8.5 | Yes |
| 5 | 15 | 6.5 | 10.0 | 11.4 | Yes |
| 6 | 9 | 4.5 | 6.0 | 6.0 | Yes (exactly) |
| 7 | 8 | 4.2 | 5.3 | 14.5 | Yes |
| 8 | 3 | 2.5 | 2.0 | 6.5 | Yes |
| 9 | 15 | 6.5 | 10.0 | 11.0 | Yes |
| 10 | 10 (check) + 9 (follow-up) | check read by 3.3 s; follow-up at 3.5 s | — | 7.2 | Yes |

**On-screen text with new words:**
- Beat 4's note (15 words) is written 27.3–29.3 s and stays full size until 33.0 s: 5.7 s from its first word. It then stays in the table, at 13 units, to the end.
- Beat 7's answers: 8 + 9 words (PME 13 + 13).
- Beat 9's answers: 10 + 12 words, typed 71.4–74.2 s, before the reveal at 75.4 s and the check at 81.4 s.
- The source line (8 words) appears at 82.4 s and is read by 85.1 s, with 3.5 s left.

## 7. Checks (October 28, round 2)

| Check | 1440 × 900 | 1366 × 657 | 1280 × 720 | 390 × 844 (stacked) |
| --- | --- | --- | --- | --- |
| Layout | picture | picture | picture | stacked |
| Smallest picture text | 14.1 px | 11.1 px | 12.6 px | (HTML, 13 px or more) |
| Control travel during the run | 0 px | 0 px | 0 px | 0 px |
| Player height | 846 px | 640 px | 703 px | 828 px (fits 844) |
| Second associate's note in the final frame | yes | yes | yes | yes |
| Horizontal overflow, console errors | none | none | none | none |

- The key never contradicts a caption: its grey half arrives with the AI draft and its red half with the first red strike.
- Reduced and print views show the final frame, the name and definition, the check, the source line and all eleven beat-list entries.
- The page has no "student", "faculty", "seminar", "adversary", "analyst" or "manager". The three military references are honest attributions: the edition switch's PME note, the check note's line on the essay, and the labelled link to the original essay.
- The business copy passes the writing-as-jack mechanical check. The nameplate is unchanged.

## 8. Open points for Jack

- **Role words.** "Associate" and "the partner" are written literally in this edition. When the per-edition cast override lands, they can move there.
- **"Claims."** BUSINESS-EXAMPLES.md says to switch to the product-line memo fallback if the cold read stumbles on "claims", keeping Autor for the page evidence. Cold read 1 followed the claims language.
