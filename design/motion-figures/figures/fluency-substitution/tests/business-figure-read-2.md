# Fluency substitution: business figure read, round 2

Reader: a manager at a company or nonprofit, not an educator, not a lawyer. First time seeing the figure, and I haven't read the essay.

Material: `figures/fluency-substitution/index.html?edition=business`, served locally on port 5273.

Method: Playwright (Chromium). I scrolled the figure fully into view so it autoplayed, then captured a frame every 0.5 s for the whole 1:31 run at 1280×900 (193 frames), 1280×720 (192 frames) and 390×844 (198 frames). With each frame I logged the caption text and the playhead time, and I looked at the frames in order. I also held key moments with `?t=`. Scripts are in my scratchpad, not in this folder.

At 1280×720 the animated picture does show. The SVG stage shrinks to 523 px tall, and the stage, caption and controls together come to 703 px, so they fit the 720 px window with nothing cut off. The final frame is fully legible at 720. The draft text in the table is small (about 13 px) but readable. At 390 px the page swaps the animation for a stacked text version that builds beat by beat (see problem 5).

## 1. Beat by beat

Times are the figure's own playhead readout at 1280×900. The other two viewports ran within about a second of these.

- **0 (0:00–0:03), name card.** "Failure mode 2 of 7 / Fluency substitution" appears large, then shrinks into the top-left plate. Clear.
- **1 (0:03–0:09), "An associate must draft a client's patent claims."** A task card ("Example task: Draft the patent claims: what does the client's invention protect?") and a red dot labelled Associate. The caption is on screen about 5.5 s for 8 words. Easy.
- **2 (0:09–0:17), "The associate asks an AI for a draft. It writes polished claims."** An "AI's draft" sheet types out a paragraph in grey on a beige band, and the key "Written by AI" appears under the stage. It finishes typing by 0:13 and holds for about 4 s. I read the beige as "the AI wrote this" without needing the key. One small snag: what's on the sheet ("Cover the sensor and the band… claim it broadly, with the battery design as a fallback") reads like advice about what to claim, not like claims. As a non-lawyer I let it go.
- **3 (0:17–0:26), "The associate reads closely, cuts a weak line, and agrees with the rest."** The dot travels along each line. It's a small red dot, but its reading motion is clear at full size. It strikes "Every claim adds real protection." in red, and the key adds "Associate's own work" in red. The struck sentence lifts out above the draft under "Cut one sentence from the AI's draft:", a quick move of about 1 s followed by a 2 s hold. The sheet's label changes to "Their claims · drafted with AI". I took this to mean a real, careful person who did some genuine editing. Not a lazy one.
- **4 (0:26–0:35), "A second associate first writes down what's new and how it works."** The first draft shrinks into a "First associate" column, and a "Second associate" column appears. A red note card writes itself (0:30–0:32): "What's new: it reads heart rate through clothing, by adjusting its sensor to each fabric." It holds for 3 s. Clear.
- **5 (0:35–0:46), "An AI drafts from the note. Suppose it matches the first draft word for word."** The note shrinks into the top row. A large "AI's draft" sheet types out the same paragraph (0:37–0:40), the second dot reads it, and thin underlines appear under every line of both drafts (0:43). This is the busiest stretch, but the caption stays up for 11 s, so I kept up. The underlines read as "these match". **This is where I first hesitated.** The second associate's note names the sensor that adjusts to each fabric as the "how", yet the draft built from that note never mentions fabric, and she accepts it. "Suppose" covers it, but it nagged at me for the rest of the run.
- **6 (0:46–0:53), "The partner receives two identical drafts, made with AI."** The second draft shrinks into its column. Row labels appear: "Their own work / not handed in" and "What the partner receives". Both drafts are tagged "Their claims · drafted with AI". Clear.
- **7 (0:53–1:06), "Without the drafts, both explain the claims clearly."** The drafts dim and a row appears: "The partner asks: Drafts aside: what do you claim, and why?" The answers type in plain ink: "Reading through clothing. No earlier device does it." and "Reading through clothing. No one has done that before." This holds for about 6 s after the typing ends. Only on a second look did I notice that the first answer echoes the draft's "which no earlier device does" and the second doesn't. That's a good, fair tell.
- **8 (1:06–1:13), "Change one fact."** A new row: "Then one fact changes: What if an older patent covers reading through clothing?" As an outsider, I understood that the "key advance" is no longer new.
- **9 (1:13–1:24), "One associate takes the draft's fallback. The other reworks the call from how it works."** The answers type: "Then lead with the battery design, as the draft says." and "Then claim how ours does it: the sensor adjusts to each fabric." Then, at about 1:18, the colours arrive. The first associate's entire beat-7 answer goes onto the beige AI band, and so does "the battery design". Underlines appear in the first draft, and the second associate's two answers turn red. This is the payoff: the first person's clear explanation in beat 7 was the AI's words all along. But the caption says nothing about colour. I was reading the second answer when it happened and only registered the change on the next frame. It holds about 6 s before the caption is replaced.
- **10 (1:24–1:31), end card.** The caption area becomes "Fluency substitution: Polished analysis stands in for owned reasoning." followed by "Partner's check: Can the associate explain the call plainly, without the draft?" The source line "Illustration based on Autor et al., NBER (2026)." appears under the table (1:25), and "Then change one fact. What would you recommend now?" fades in (1:27). The underlines in the first draft are removed, and the whole table stays in view. It ends with a Replay button at 1:31.

No caption changed before I'd read it. Caption times ran 5.5–14.5 s for 3–15 words, and every movement finished with at least about 2 s of hold before the next caption.

## 2. The point

Two people can hand in the same polished, AI-assisted draft and both explain it fluently. You only find out which one owns the reasoning when a fact changes and the other can do nothing but go back to what the draft said.

## 3. The question a manager should ask afterwards

"Put the draft away. If [the assumption this recommendation rests on] turned out to be wrong, what would you recommend instead, and why?"

## 4. The final frame alone

Mostly yes. Read top to bottom, the table tells the story: own work that wasn't handed in, identical drafts, both answer the partner, one fact changes, one person retreats to the draft. With the colour key you can tell whose words are whose without the animation, and the definition and both check questions sit under the table.

The still loses two things. It doesn't show that the note came *before* the AI draft (the top row says "not handed in", not "written first"), and it doesn't show the "suppose they're word for word" stipulation. It also never shows *why* the battery-design fallback is the weaker call (see problem 2).

On a phone the final frame is noticeably weaker. The first associate's cut has gone, the handed-in claims are cut short to "Cover the sen…", and the source line sits below the controls.

## 5. Problems, ranked

1. **Plausibility, unfair to the second associate.** The second associate writes that the sensor "adjusts to each fabric" as the key *how*, then signs claims that leave it out. I see why: the drafts have to be identical, and if the draft named the mechanism, the first associate could answer beat 9 too. But a manager will ask "if she knew, why didn't she put it in?" That weakens the very person the figure holds up as owning the reasoning. "Suppose" makes it honest but not convincing.
2. **Outsider comprehension: the figure never shows why the first answer is worse.** To a non-lawyer, falling back on a plan the draft already prepared ("lead with the battery design") sounds prudent. The figure delivers its verdict through provenance (beige versus red, and "as the draft says"), not through visible quality. If the point is only about ownership, that's defensible. But most viewers will read the first associate as *wrong*, and nothing on screen says the battery design is a minor or easily copied feature.
3. **The first associate drifts toward straw man in beat 9.** "…as the draft says" is a line no competent associate would say to a partner, and it hands the viewer the answer. The beat-7 echo ("No earlier device does it") is a fairer, subtler tell, and up to beat 8 the first associate is a fair portrait: they read closely, cut a weak line and explain clearly. Problem 5 makes this worse on phones.
4. **The caption doesn't match the picture at the climax, and the key has a gap.** The colour reveal (about 1:18) is the payoff, but caption 9 only describes the answers. The beat-7 answer turning fully beige ("that clear explanation was the AI's words") is the most important thing that happens, and nothing narrates it. Separately, the first associate's plain-ink words ("Then lead with", "as the draft says") fit neither key entry. Red is labelled "Associate's own work", so plain ink reads as nobody's words, even though they are literally the associate's own.
5. **The phone view tilts the comparison.** At 390 px:
   - from beat 7 on, the top section shows only "Second associate's note, not handed in", so the first associate's red cut disappears;
   - from beat 4 until beat 6, the first draft is missing;
   - the handed-in claims are cut short to "Cover the sen…", so the phone reader can't check "as the draft says" against the draft;
   - the AI-band spans render at 15 px and the own-work spans at 13.5 px, so the first associate's answers look bigger than the second's even before the colours arrive.
6. **Minor caption/picture mismatch.** In beat 9 the underline in the first draft also covers "heart rate" and "claim it broadly", which neither of the first associate's answers uses. The beat list says "the same words in the first draft are underlined".
7. **Minor.** The caption says "It writes polished claims", but the sheet holds a claims *strategy* paragraph. Patent readers would notice. Outsiders won't.
8. **Minor.** The partner's check changes voice mid-way: "Can the associate explain…?" then "What would you recommend now?" I worked out that the second line is the partner speaking to the associate, but it jolts.
9. **Minor layout.** At 1280 in beat 5, the full-size second draft butts right up against the first column's draft card for about 2 s. They don't overlap, but it's crowded.
10. **Factual claims I'd want sourced.** The page text below the figure carries many study numbers (see the numbers check below). The figure itself shows none.

## 6. Mechanical checks

- **Reduced motion.** Both `?reduced` and an emulated `prefers-reduced-motion: reduce` open on the final frame at 1:31, with the full table, the source line, the definition and both check lines, and a Play button. Yes, at 1280 and at 390.
- **Horizontal scroll at 390 px.** None. `scrollWidth` stays at 390 at every time I sampled (0–91 s). Some hidden SVG nodes extend past 390 but are clipped.
- **Keyboard.** Yes. The Tab order runs from the nav links to Play/Pause, Restart, the scrubber, then the beat buttons, each with a visible 2 px focus outline. Space and Enter toggle play and pause, the arrow keys step the scrubber 1 s at a time, End jumps to the end, and Enter on a beat button jumps there and plays.
- **Numbers.** The animation shows no research numbers, only "2 of 7", the beat counter and the timer. The page text below it uses 133 lawyers, three months and 0.45 SD, all of which are in `sources/source-spine.md`. These are *not* in the source spine: eleven firms, 91 completers, 10 and 90 days, 0.34 / 0.38 / 0.32 SD with their p-values, juniors as under seven years, 15 of 91 redlines, the 10 percent level, and the page numbers. Whether they're in the essay is checked below, after this read.

## Answers to the round's extra questions

- **Would a business or nonprofit reader see their own work?** Partly. The scene is a law firm, and "patent claims", "partner" and "older patent" aren't my world. What carries over is the shape: a junior drafts with AI, a senior reviews, a follow-up question tests it. The page's intro makes that bridge in one sentence ("The same goes for any polished draft you sign: change one fact…"). I saw my own work by translation: a board memo, a grant proposal, a pricing recommendation. I didn't recognise it directly.
- **Would someone outside patent law follow it?** Yes, for the shape. "Patent claims" is defined in the intro, "older patent covers reading through clothing" reads plainly as "your key idea isn't new any more", and "claim how ours does it" reads as "protect the specific way it works". What an outsider can't judge is whether the battery-design fallback is actually worse (problem 2).
- **Is either person a straw man?** Not through beat 8. The first associate reads closely, cuts a weak line and explains clearly, which is a fair portrait. Beat 9's "as the draft says" pushes them toward caricature (problem 3). The second associate is the opposite case: weakened by having to sign claims that drop their own key point (problem 1).
- **Is there any second difference between them?** Yes, a few small ones:
  - The first associate edits (cuts a sentence). The second's AI draft never contained that sentence, so writing the note first also bought a cleaner first draft. That's an unacknowledged extra advantage.
  - Their beat-7 wording differs (an echo of the draft versus their own phrasing). That's a fair tell rather than a second variable.
  - On phones, the type sizes differ, and the first associate's own work vanishes.
  - Implied but never shown: both had "the same inventor's notes", yet only the second knows about the fabric mechanism, so the first apparently never absorbed the notes. That is arguably the figure's own variable, but it isn't stated.
- **Where do they first differ?** In process, at beat 4 (the note written before prompting). In what they say, faintly at beat 7 (the echo), then plainly at beat 9.
- **Does the figure contradict what its cited research found?** Not on its face. Two juniors, both using AI, handing in equally good work and then splitting fits "larger gains among junior lawyers" on delivered work plus a split among juniors. But the study's split was measured on an unassisted redline task scored by raters, not on an oral fact-change question. The figure's mechanism (writing your own reasoning first) is not something the study tested. The page says both things. The figure alone (with "Illustration based on…") doesn't.
- **Is the source line clear, without overclaiming?** Clear, and mostly fair. "Illustration based on Autor et al., NBER (2026)" sits under the table at the end. "Based on" slightly overstates: the scene, the test and the mechanism are all constructed, and only the setting (junior patent lawyers using AI) comes from the study. Something like "Setting from Autor et al. (2026); scene constructed" would be safer. The page intro does add "The associates, the invention and the older patent are constructed."
- **Military or classroom wording?** None in the figure itself. On the page, it appears only as deliberate attribution: the edition switch "Workplace · PME" with the line "PME (professional military education): the example from The Irreducible Officer, the National War College essay"; the provenance note under the partner's check ("an essay written for military education"); and the "Go further" link. Those are labelled as the source, not used in the scenario. One leftover: the meta description begins "A teaching figure:", which is classroom framing and would show in link previews.

---

## After the read: fact check

I checked these only after writing everything above.

### Numbers against the source spine and the essay

The essay (`the-irreducible-officer.md`) never cites Autor et al. and contains none of the study's numbers. It does contain the quoted phrase, word for word, at line 137: "revises under challenge rather than retreating to the artifact's language". So the earlier finding stands. Of the page's study numbers, only 133 lawyers, three months and 0.45 SD are in the source spine. Every other number checks out against the paper itself (below), but none of them is in the source spine or the essay.

### Page claims against Autor et al. (2026), NBER WP 35720, revised October 2026

I downloaded the PDF from nber.org without trouble. Page numbers below are the paper's printed page numbers.

| Page claim | Paper | Verdict |
|---|---|---|
| Pre-registered, three-month randomized trial; "133 practicing patent lawyers at eleven U.S. intellectual property law firms"; custom AI patent drafting assistant | Abstract, verbatim | Supported |
| 91 completed the full protocol | p. 1, "133 patent lawyers, 91 of whom completed the full protocol" | Supported |
| Expert raters, blind to who had the tool | Abstract ("blinded expert patent attorneys"); p. 10 (raters "blind to treatment status") | Supported |
| Abstract quote on 0.34 SD (p = 0.03) at 10 days, 0.38 SD (p = 0.01) at 90 days, larger gains among juniors | Abstract, verbatim | Supported |
| The 91 "each reviewed and corrected an existing patent application without AI" | Abstract ("all subjects redlined an existing patent application without AI"); pp. 3 and 26 ("15 of 91 redlining submissions") | Supported. A fair paraphrase of "redlined". |
| Abstract quote on 0.32 SD (p = 0.04), concentrated among seniors (0.45 SD, p = 0.02), juniors bifurcated, "springboard… cushion" | Abstract, verbatim | Supported |
| Juniors = fewer than seven years (p. 23) | p. 23, Figure 3 note ("fewer than 7 years"); also pp. 12, 25 | Supported |
| "only senior lawyers emerged from three months of AI use with improved capability" (p. 2) | p. 2, verbatim. The page drops the sentence's lead-in, "Measured by unassisted judgment," | Supported. The dropped qualifier is harmless in context but worth keeping. |
| 15 of 91 redlines showed possible AI use; without them the overall gain falls below conventional significance; the senior gain holds at the 10 percent level (p. 3) | p. 3, verbatim in substance. p. 27 gives the numbers: 0.32 falls to 0.25 SD (p = 0.14); seniors 0.45 to 0.39 SD (p = 0.06) | Supported. The paper adds that the flagging was "erring toward over-classification". |
| "Our experiment does not answer why the effects appear positive for some lawyers and negative for others" (p. 2) | p. 2, verbatim | Supported |
| One profession; the junior group was small; custom tool | p. 30 ("The junior subgroup is smaller still"); abstract ("custom") | Supported |
| Conducted by Google; Google funded the direct costs; all eleven firms have patent-drafting relationships with Google | Title-page note; p. 1 ("All firms in the experiment have ongoing patent-drafting relationships with Google LLC") | Supported |
| Post-experiment interviews and an "exploratory, AI-assisted reading of the redlines" are in supplementary materials "that aren't public (p. 29)" | p. 29: "Section 1 of the Supplementary Materials reports post-experiment interviews with treated participants and an LLM-based qualitative analysis of redlining submissions." The not-public part is p. 9, note 8: "The Supplementary Materials are not intended for publication and accompany this submission." | **Partly mis-cited.** The content is right, but "aren't public" rests on p. 9 n. 8, not p. 29. "Exploratory" is the page's word, not the paper's ("LLM-based qualitative analysis"). |
| "Juniors using AI worked faster but showed no unassisted gains" (p. 30), floated as a possible mechanism | p. 30, verbatim. The paper adds that testing time as the cause "would require manipulating time on task directly, which neither our study nor Strömberg et al. (2026) does" | Supported. "Float" is fair. |
| Authors, title, WP 35720, revised October 2026 | Title page ("September 2026, Revised October 2026") | Supported |

**Nothing on the page is unsupported.** Two small fixes:

- Cite p. 9 n. 8 (or "pp. 9, 29") for "supplementary materials that aren't public". Also drop "exploratory" or attribute it to the page, not the paper.
- Optionally restore "Measured by unassisted judgment" in the p. 2 quote.

Three things from the paper bear on the figure:

- **The setting fits.** The study's drafting task gave lawyers "mock-up notes attributed to the 'inventor'" and asked for five to seven dependent claims (p. 9). So "the same inventor's notes" matches the study.
- **The draft doesn't look like the study's output.** The study's lawyers wrote dependent claims. The figure's "AI's draft" is a strategy paragraph about what to claim, not claims, so problem 7 holds against the study's own task.
- **The time hypothesis is consistent, not contradicted.** The only mechanism the authors float is time on task. Writing your own note before prompting takes extra time, so the figure doesn't contradict the hypothesis. But the page presents ownership as the illustrated mechanism, not time, and rightly calls it "an illustration, not a finding".
