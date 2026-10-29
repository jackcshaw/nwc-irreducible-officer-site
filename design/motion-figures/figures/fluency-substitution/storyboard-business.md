# Fluency substitution: business edition storyboard

Edition `business`, round 3: final fixes after business cold read 2 (`tests/business-figure-read-2.md`), which passed on the point. It is built from `editions/business.json` on top of the core in `storyboard.md`: motion, colour grammar and nameplate, plus the timeline up to beat 9. This file lists only what differs from the PME edition. Role words are written literally in `editions/business.json` ("associate", "the partner"), so the edition takes no words from the workplace cast. A per-edition cast override can replace them later. If this file and the data disagree, the data is what ships.

Open it with `index.html?edition=business`, or with the "See this with: Workplace" link on the page.

## 1. Source and evidence treatment

*Illustration based on Autor, Rodchenko, Martin, Iscenko, Strand, Pearl & Ferere (2026), "Does AI Assistance Enhance or Erode Expertise? Evidence from a Three-Month Field Experiment in Patent Drafting," NBER Working Paper 35720 (revised October 2026).* The scenario and sensitivity rules are in BUSINESS-EXAMPLES.md, section 2. Evidence follows option A (EDITIONS-PLAN.md), so there is no evidence beat.

- **Setup:** two *junior* associates with the same task, the same inventor's notes and the same AI (lessons 11 and 12). A bridge sentence carries the setting to everyday work: "The same goes for any polished draft you sign: change one fact, and you find out whether the reasoning in it is yours." It ends with "Illustration based on Autor et al. (2026). The associates, the invention and the older patent are constructed."
- **Meta description:** "Two associates hand in the same AI-drafted patent claims. Changing one fact shows which of them owns the reasoning."
- **Under the final frame:** "Illustration based on Autor et al., NBER (2026)." On the picture stage it sits right of the key and fades in 1 s after the check. In the stacked view it sits just under the controls.
- **On the page:** a section after the check, "The study behind this example". It covers:
  - the trial: 133 lawyers, 91 of whom completed it;
  - the abstract's drafting finding;
  - the unassisted test, taken by the 91 who completed the study, with the abstract's quote;
  - the split was among juniors (fewer than seven years); seniors gained ("Measured by unassisted judgment, only senior lawyers emerged …", p. 2); 15 redlines were flagged for possible AI use;
  - the limits: "does not answer why" (p. 2), one profession, a small junior group, a custom tool, Google conducting and funding it;
  - what the figure is: one way the split among juniors could arise. The study's look at reasons is quoted in the paper's own words, "post-experiment interviews with treated participants and an LLM-based qualitative analysis of redlining submissions" (p. 29), in supplementary materials "not intended for publication" (p. 9, note 8). The authors float time spent as a possible mechanism (p. 30). The figure's account is an illustration, not a finding;
  - the full source with a constructed-parts sentence.

**Sensitivity, from BUSINESS-EXAMPLES.md:** Google's funding is disclosed. The page doesn't say AI harms juniors, and it says seniors gained. Legal jargon is held to "claims" (defined in the setup), "narrower claim", "fallback" and "an older patent".

## 2. Core changes and additions

**The contrast (lessons 8–12, read-2 fixes 1–4):**
- **Same draft, same edits.** There is no weak line to cut. Both associates get the same AI draft and hand it in unchanged. The first reads it closely and agrees with every line.
- **The deliverable includes the sensor.** The draft: "Claim reading through clothing broadly: no earlier device does it. Narrower claim: the sensor's fabric adjustment. Fallback: the battery design." So the second associate signs claims that do include their key point, as a narrower claim. Only they know it is the part that matters once an older patent appears.
- **Beat 7 doesn't separate them.** Both answer "what do you claim, and why?" with a claim and a reason. The first restates the draft's ("No earlier device does it"), and the second gives the same reason in their own words.
- **The changed fact decides it.** Asked "What if an older patent covers reading through clothing?", the first associate takes the draft's designated fallback in good faith: "Then lead with the battery design." The second leads with what their note says is new: "Then lead with the sensor that adjusts to each fabric." Then the partner adds, "It covers the battery too." The fallback fails against the fact, and of the claims both handed in only the sensor is still new. "As the draft says" is gone, because the picture now carries the verdict.
- **The colours have their own beat and caption** ("The colours show whose words these are."). The first associate's own words ("Then lead with") now turn red, so every word in an answer is either the AI's (grey band) or the associate's own (red), matching the key.

**Additions to the core, each drawn only when the edition supplies the data,** so PME draws exactly as before:
- `paper.cut` absent: no strike, lifted card or cut label. The first dot rests after the last line, and both papers are the same length. The red half of the key arrives with the note instead (`timeline.times.keyRed`).
- `timeline` (beats 9–12): `beatAt` adds two beats, and `times` moves the reveal, check, follow-up, source and end, and adds `fact2` for the partner's added line. Business runs 1:38; PME is unchanged at 1:31.
- `labels.q2.more` / `narrow.q2.more`: "It covers the battery too." It sits under the changed fact in the picture and runs on after the question on phones.
- `picture: {minText: 13, laptop: true}` (round 2): the drawn picture holds at 1280 × 720 and 1366 × 657.
- Phones: `narrow.sameAt` (verification fix) shows "Suppose it matches the first associate's draft word for word." once the second draft is composed (37.0–37.4 s), so it is fully shown for 6.0 s before beat 6 (it needs 4.8 s). `narrow.noteKept` keeps the second associate's note. `narrow.paperFull` keeps the handed-in claims in full, with the label running into the text from beat 7. Answer segments in the AI's words take the answer's size, 13.5 px (the draft's 15 px class no longer leaks into them).
- Core fixes for papers of any length: the second paper ends where the cut starts, and its sheet height and last-line dot position follow its line count. PME has five lines, so it draws the same.

**PME regression:** against `regression/baseline`: 206/206 identical, 1280 × 720 included.

## 3. Words that differ, beat by beat

| Beat | Caption (business) | Picture words that differ from PME |
| --- | --- | --- |
| 0 · Name card | (band quiet) | None: the name and definition are universal |
| 1 · The task | An associate must draft a client's patent claims. | Task card: "Draft the patent claims: / what does the client's / invention protect?"; dot label "Associate" |
| 2 · The AI drafts | The associate asks an AI for a draft. It writes polished claims. | The draft (above), four lines |
| 3 · Agrees | The associate reads it closely and agrees with every line. | Tag "THEIR CLAIMS · DRAFTED WITH AI"; nothing struck |
| 4 · Writes first | A second associate first writes down what's new and how it works. | "SECOND ASSOCIATE'S NOTE": "What's new: it reads heart rate / through clothing, by adjusting / its sensor to each fabric."; key "ASSOCIATE'S OWN WORK" arrives |
| 5 · Drafts from the note | An AI drafts from the note. Suppose it matches the first draft word for word. | Stacked: "Suppose it matches the first associate's draft word for word." |
| 6 · Receives | The partner receives two identical drafts, made with AI. | "WHAT THE PARTNER RECEIVES"; the first associate's own-work cell is empty |
| 7 · Drafts aside | Without the drafts, both explain the claims clearly. | "THE PARTNER ASKS"; "Reading through clothing. No earlier device does it." / "Reading through clothing. No one has done that before." |
| 8 · Change one fact | Change one fact. | "What if an older patent covers / reading through clothing?" |
| 9 · The answers | One associate takes the draft's fallback, the other the sensor. | "Then lead with the battery design." / "Then lead with the sensor that adjusts to each fabric." |
| 10 · The fact decides | But the older patent covers the battery too. | **New:** "It covers the battery too." under the changed fact |
| 11 · The colours | The colours show whose words these are. | **New beat:** AI words go grey on the band (all of the first associate's first answer, and "the battery design"); own words go red; the draft's matching words are underlined for 2.6 s |
| 12 · Check | Partner's check: Can the associate explain the call plainly, without the draft? / Then change one fact. What would you recommend now? | The source line, right of the key |

## 4. The workplace check (for Jack)

> **Partner's check** · *Can the associate explain the call plainly, without the draft?*
> *Then change one fact. What would you recommend now?* (the same size)

## 5. Verified figures (for the companion's source spine)

All checked in the full paper text (revised October 2026); cold read 2 rechecked them against the NBER PDF:
- "133 practicing patent lawyers at eleven U.S. intellectual property law firms" (abstract); "91 of whom completed the full protocol" (p. 1).
- "AI access raised the quality of work delivered on benchmark patent drafting tasks at 10 days (0.34 SD, p = 0.03) and 90 days (0.38 SD, p = 0.01), with larger gains among junior lawyers." (abstract)
- "Treated lawyers outperformed controls by 0.32 SD (p = 0.04), but this advantage was concentrated entirely among senior lawyers (0.45 SD, p = 0.02). Junior lawyers showed no average gain. Their scores instead bifurcated, …" (abstract)
- "Measured by unassisted judgment, only senior lawyers emerged from three months of AI use with improved capability." (p. 2)
- "we identify 15 of 91 redlining submissions where AI use appears possible … Excluding them lowers the full-sample estimate below conventional significance, while the senior effect remains significant at the 10 percent level." (p. 3)
- "Our experiment does not answer why the effects appear positive for some lawyers and negative for others." (p. 2)
- Junior means "fewer than seven years" of experience (p. 23).
- "Section 1 of the Supplementary Materials reports post-experiment interviews with treated participants and an LLM-based qualitative analysis of redlining submissions." (p. 29); "The Supplementary Materials are not intended for publication and accompany this submission." (p. 9, note 8)
- "Juniors using AI worked faster but showed no unassisted gains." (p. 30)
- Google: "The study was conducted by Google"; "Funding for the direct costs of this experiment was provided by Google"; all firms "have ongoing patent-drafting relationships with Google LLC" (title page and p. 1).

**Not used:** the September 2026 version's qualitative analysis (not verified in that version's text), and Camuffo et al. (2026) (abstract only).

## 6. Pace table (business captions)

Reading is words ÷ 3 s, plus a 1.5 s hold. The PME rule, a beat at least twice the reading time, also holds.

| Beat | Words | Reading + 1.5 s hold (s) | 2× reading (s) | Beat (s) | Fits |
| --- | --- | --- | --- | --- | --- |
| 1 | 8 | 4.2 | 5.3 | 6.0 | Yes |
| 2 | 12 | 5.5 | 8.0 | 8.7 | Yes |
| 3 | 10 | 4.8 | 6.7 | 8.8 | Yes |
| 4 | 12 | 5.5 | 8.0 | 8.5 | Yes |
| 5 | 15 | 6.5 | 10.0 | 11.4 | Yes |
| 6 | 9 | 4.5 | 6.0 | 6.0 | Yes (exactly) |
| 7 | 8 | 4.2 | 5.3 | 14.5 | Yes |
| 8 | 3 | 2.5 | 2.0 | 6.5 | Yes |
| 9 | 10 | 4.8 | 6.7 | 6.7 | Yes (exactly) |
| 10 | 8 | 4.2 | 5.3 | 5.6 | Yes |
| 11 | 7 | 3.8 | 4.7 | 5.6 | Yes |
| 12 | 10 (check) + 9 (follow-up) | check read by 3.3 s; follow-up at 3.5 s | — | 7.2 | Yes |

**On-screen text with new words:**
- Beat 4's note (15 words) is written 27.3–29.3 s and stays full size until 33.0 s.
- Beat 9's answers (6 + 10 words) are typed 71.4–74.2 s. The partner's added line (5 words) arrives at 77.5 s and is read, with its hold, by 80.7 s. The colours come at 83.3 s, 5.8 s later.

## 7. Checks (October 28, round 3)

| Check | 1440 × 900 | 1366 × 657 | 1280 × 720 | 390 × 844 (stacked) |
| --- | --- | --- | --- | --- |
| Layout | picture | picture | picture | stacked |
| Smallest picture text | 14.1 px | 11.1 px | 12.6 px | (HTML, 13 px or more) |
| Control travel during the run | 0 px | 0 px | 0 px | 0 px |
| Player height | 846 px | 640 px | 703 px | 842 px (fits 844) |
| Final frame: note, full claims, both answers rows | yes | yes | yes | yes |
| Horizontal overflow, console errors | none | none | none | none |

- Reduced and print views show the final frame, the name and definition, the check, the source line and all thirteen beat-list entries.
- The page has no "student", "faculty", "seminar", "adversary", "analyst" or "manager". Its three military references are labelled attributions: the edition switch's PME note, the check note's line on the essay, and the link to the original essay.
- The business copy passes the writing-as-jack mechanical check. The nameplate is unchanged.

## 8. Open points for Jack

- **Role words.** "Associate" and "the partner" are written literally in this edition; they can move to the per-edition cast override when it lands.
- **Run time.** The changed fact's second line and the captioned colour beat bring the business edition to 1:38, against 1:31 for PME.
