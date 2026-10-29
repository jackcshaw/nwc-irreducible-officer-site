# Uncalibrated reliance: business edition storyboard

Edition `business`, workplace cast (for `{check}` only; see section 3). It's built from `editions/business.json` on top of the core described in `storyboard.md`: the timeline, layout, motion, colour grammar and nameplate. This file lists only what differs from the PME edition. The words live in the data files, and if this file and the data disagree, the data is what ships.

Open it with `index.html?edition=business`, or use the "See this with: Workplace" link on the page.

## 1. Source and evidence treatment

*Illustration based on Otis, Clarke, Delecourt, Holtz & Koning (2026), "The Uneven Impact of Generative Artificial Intelligence on Entrepreneurial Performance: Evidence from a Field Experiment in Kenya," Management Science (online July 10, 2026), doi 10.1287/mnsc.2024.06909.* The scenario and sensitivity rules come from BUSINESS-EXAMPLES.md, section 4. Evidence follows option A, keeping the evidence beat, because for this figure the finding is the turn:

- **Setup:** "Illustration based on Otis et al. (2026). The owners, their documents and the numbers in their plans are constructed."
- **Under the final frame:** "Illustration based on Otis et al., Management Science (2026)." This line sits in the SVG, centred under the key, and fades in at 84.9–85.4 s, 1.0 s after the check. On the stacked phone stage it sits just under the controls, outside the fixed-height player.
- **On the page:** a section after the check, "The study behind this example", in five paragraphs:
  1. the published abstract's findings, quoted word for word;
  2. where the gap came from, again in the abstract's words;
  3. the limits;
  4. the working paper's detail, including its exploratory reading, labelled as exploratory;
  5. what in the figure is constructed.

### The evidence beat: Otis, not BCG

PME's beat 8 shows Dell'Acqua et al. (BCG). The business edition replaces that panel with Otis et al. These are the reasons:

1. **The scene and the study have to be the same study.** The setup says "Illustration based on Otis et al." If the panel then showed consultants, the reader would be asked to carry a result from a different setting into a Nairobi print shop, with nothing to bridge the gap. With Otis, the panel reports on the people the scene illustrates.
2. **Otis's headline finding is the act the figure slows down.** Owners in the same trial, with the same assistant, split apart. In the abstract's words, the gap came "from the advice that entrepreneurs chose to implement," not from "the questions posed to the AI or the advice that it provided." The two owners in the figure get identical answers. The only difference between them is which answers they act on, and on what evidence. That's also what the check asks.
3. **BCG keeps one home.** Figure 8 (appropriate reliance) is built on BCG, and its business edition is the consulting tasks. With Otis here, each study appears once across the eight business figures, which is what BUSINESS-EXAMPLES.md recommended.

**What this costs, said plainly.** BCG measured the frontier itself: look-alike tasks where AI helped and where it hurt. Otis doesn't measure a task boundary. It measures who gained and who lost, and traces the gap to what owners acted on. So in this edition, beat 7's jagged frontier is the figure's reasoning and the essay's term, not a measured result. Beat 7 keeps the same definition sentence as PME and figure 8 ("A jagged frontier marks where an AI stops being reliable"). The page credits the term to Dell'Acqua et al. (2023) and links to the appropriate reliance figure, where BCG's numbers are shown.

**Rejected: both panels.** The shared timeline has one 9.5 s evidence beat, and showing both studies would have meant BCG's second use and a core timing change.

**The generic-versus-tailored detail stays off the picture.** The working paper's exploratory reading has low performers more often acting on "generic" advice (lowering prices, advertising) and high performers finding "tailored and specific changes" (for example, power during blackouts). The figure's two parts are built to echo it: a blackout battery that deserves acceptance, and a price cut that doesn't fit this shop. The reading appears only on the page, labelled as exploratory and as coming from the working paper. No panel line rests on it, so the panel needs no "WHAT THE EVIDENCE SUGGESTS" line.

### Lesson 1 check: does the contrast endorse what the study found wrong?

It doesn't. The first owner acts on the price cut, which is the kind of advice the working paper links (exploratorily) with worse results. The second owner keeps prices and competes on speed. The second owner's plan deliberately drops "advertise". BUSINESS-EXAMPLES.md had them "advertise same-day printing", but advertising is half of the study's "generic" advice, so the good plan avoids it: "Keep prices: outpace the new shop". No contrast had to be reversed, so the one allowed core change wasn't used.

### Sensitivity, kept from BUSINESS-EXAMPLES.md

- Neither owner is labelled weak, low or high, and both are competent. The first checks Part 1 exactly as carefully as the second does. The only difference in the figure is one check.
- Nairobi appears only in the setup, matter-of-fact. Blackouts appear only as the task's first part.
- "May have gained" keeps its hedge on the panel. The panel's row labels are "Started weaker" and "Started stronger". Those are the study's baseline groups, not the two owners.

## 2. Core changes (gated on data; PME frame-diffs to 0)

The timeline is unchanged: the same `BEAT_AT`, the same `T`, and 90.6 s of figure time. Every change below draws only when its key is present, so PME draws exactly as before. PME was re-diffed after the changes: **0 of 209 frames differ** against the re-captured `regression/baseline`, which includes the edition switch.

1. **Signed results panel (`labels.panel.rows`).** Otis reports changes against a control group, not rates, and one of the changes is negative. Drawing it as PME's rightward rate bars would show a loss as if it were a gain. So when `rows` exists, the panel draws rows around a zero line (x 360, 6 units per percentage point):
   - each bar grows from zero toward its sign;
   - a zero result is a short tick;
   - each value label sits just right of its bar or of the zero line;
   - the bracket spans the two group rows, placed after the longest label.

   The bar lengths come from the data: −9.5 for "nearly 10% worse" and +15 for "over 15%". The timings are PME's: the average's tick on `bar1` (60.5–61.1), both group bars on `bars2` (61.2–61.8), then the bracket and its text.
2. **Source line under the final frame (`labels.source`, `narrow.source`)**, with a new optional timing, `T.source` (84.9–85.4). The stacked view's copy goes in `[data-ur-source]` under the controls.
3. **Shorter stacked-stage wordings (`narrow.answers`, `narrow.speech`).** The phone stage can now take its own wording for the AI's answers and the spoken answers. With them, and with shorter document chips, the 390 × 844 player measures 822 px. The first build, with the desktop wordings, measured 931 px.
4. **Stacked evidence rows** fade in generically: row 0 on `bar1`, and every later row on `bars2`. PME's two rows behave as before.
5. **Page:**
   - the edition switch and note (CONVENTIONS.md wording);
   - a business-only study section (`data-ed-section="page.evidence"`, `.fig-ed-evidence` paragraphs), hidden for PME;
   - PME's evidence section, now hidden when an edition has no `page.evidenceText`.

The nameplate is unchanged: "Uncalibrated reliance", "Failure mode 4 of 7", "Confident output is accepted without knowing whether the task fits the tool."

## 3. Role words

The people here are two shop owners, and their reviewer is a mentor. The workplace cast says "analyst" and "the manager", which would misdescribe a two-person print shop and the study's entrepreneurs. So this edition writes "owner", "First owner", "Second owner" and "the mentor" as scenario words in `business.json`, and takes only `{check}` ("Reviewer's check") from the cast. The AI is "an AI assistant", the published abstract's own term ("AI business assistant"). That keeps it apart from the human mentor.

If the edition needs to stay cast-switchable, there are two options. One is an edition-level cast override in `loadEdition` (a runtime change, not made). The other is to accept literal roles for scenarios whose people aren't employees. That's a question for Jack and the coordinator.

PME now uses the merged keys: `{reviewer_sees}` (label and stacked label), `{Another}` (beat 5), `{That_person}` (beat 6), `{reviewer_points}` (beat 9), plus `{each_person}`, `{the_first}` and `{person}` in beat 9's description. These fill to the identical classroom words, and the PME diff stays 0.

One caution: PME's beat 9 reads "{reviewer_points} to each part in turn and ask…". The "ask" agrees with "Faculty" but not with "The manager points", so PME rendered with the workplace cast would be ungrammatical there. Fixing it would change PME's words, so I left it.

## 4. Words that differ, beat by beat

The two owners' answers, their documents and the mentor replace the students, the port and faculty. Beat 2's caption is unchanged.

| Beat | Caption (business) | Picture words that differ from PME |
| --- | --- | --- |
| 1 · The task | A shop owner gives an AI two questions and four documents. | Task: "Part 1 · Keep printing in blackouts", "Part 2 · Win back customers". Documents: BATTERY QUOTE, BATTERY QUOTE, RIVAL'S FLYER, SALES BOOK. Dot: "Owner". Stacked: "2 quotes", "Rival's flyer", "Sales book" |
| 2 · Equal confidence | (same) | Part 1: "Buy battery A: / runs 6 hours, costs less". Part 2: "Cut prices 10%: / match the new shop". Stacked: "Battery A: 6 hours, cheaper" and "Cut prices 10%" |
| 3 · Checks Part 1 | The owner checks Part 1 against the two battery quotes. It's right. | "FIRST OWNER'S PLAN" |
| 4 · Uses Part 2 | (same: "Part 2 looks just as sure, so they use it.") | — |
| 5 · Checks each part | Another owner, with the same answers, checks each at its source. | "Second owner", "SECOND OWNER'S PLAN", "First owner" |
| 6 · Checks Part 2 too | That owner checks Part 2 against the flyer and the sales book, and changes it. | Flyer callout: "THEIR PRICES / 10% below ours / *(the new shop)*". Sales book callout: "OUR SALES / Mostly same-day / *Margin: under 10%*". Note: "FLYER AND SALES BOOK / Flyer: new shop 10% cheaper. / Book: same-day jobs, thin margin." Edits: ~~Cut prices 10%~~ **Keep prices**: / ~~match~~ **outpace** the new shop. Stacked: ~~Cut prices 10%~~ **Keep prices; outpace them** |
| 7 · The reason and the frontier | Part 2 depends on why customers come here. A jagged frontier marks where an AI stops being reliable. | "Mostly same-day" underlined. The AI's "match the new shop" is underlined and tagged "THEIR PRICES" (PME: "CAPACITY") |
| 8 · The study | In a field experiment in Kenya, the same AI assistant split owners' results. | Panel: "Effect on revenue and profit". On average: tick at zero, "no clear change". Started weaker: bar left, "nearly 10% worse". Started stronger: bar right, "may have gained over 15%". Bracket: "The gap seems to / come from which / advice they acted on". Source: "OTIS ET AL. (2026) · KENYAN ENTREPRENEURS · MANAGEMENT SCIENCE" |
| 9 · The mentor points | The mentor points to each part in turn and asks what justified relying on it. | "THE MENTOR SEES ONLY THE PLANS". Key: "AN OWNER'S OWN WORK". Answers: 1 "The battery quotes." (both); 2 "Part 1 checked out, so I trusted the rest." and "Our sales book. They come for speed." Names: "First owner", "Second owner". Stacked: 1 "The quotes." |
| 10 · Reviewer's check | Reviewer's check: What evidence justified relying on the AI here? / Ask part by part: was the evidence about that part? | **New:** "Illustration based on Otis et al., Management Science (2026)." under the picture at 84.9 s |

### The workplace check (for Jack)

> **Reviewer's check:** What evidence justified relying on the AI here?
> Ask part by part: was the evidence about that part?

The check starts from the EDITIONS-PLAN draft ("What evidence justified relying on the AI here? Ask part by part.") and keeps PME's separating question at equal weight. "Ask part by part" on its own tells the reviewer what to do. "Was the evidence about that part?" is the question that separates the two owners: the first owner's evidence for Part 2 is about Part 1. Both lines are set at the same size in the final caption and on the page.

## 5. Pace

Reading time is caption words ÷ 3. Every beat holds at least 1.5 s after the reading. Picture words are the new words drawn in the beat, counted the same way for both editions, with PME's count in brackets. Times are figure time; the player adds the 3.0 s name card.

| Beat | Time (s) | Caption words (PME) | Reading (s) | Reading + 1.5 (s) | 2× reading (s) | Picture words (PME) | Beat (s) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0.0–8.6 | 11 (12) | 3.7 | 5.2 | 7.3 | 26 (29) | 8.6 |
| 2 | 8.6–15.6 | 6 (6) | 2.0 | 3.5 | 4.0 | 23 (26) | 7.0 |
| 3 | 15.6–23.1 | 12 (12) | 4.0 | 5.5 | 8.0 ✕ | 4 (4) | 7.5 |
| 4 | 23.1–30.3 | 10 (10) | 3.3 | 4.8 | 6.7 | 3 (3) | 7.2 |
| 5 | 30.3–37.6 | 11 (11) | 3.7 | 5.2 | 7.3 | 8 (8) | 7.3 |
| 6 | 37.6–48.6 | 15 (12) | 5.0 | 6.5 | 10.0 | 35 (37) | 11.0 |
| 7 | 48.6–58.4 | 18 (17) | 6.0 | 7.5 | 12.0 ✕ | 8 (7) | 9.8 |
| 8 | 58.4–67.9 | 13 (16) | 4.3 | 5.8 | 8.7 | 33 (29) + source 8 (10) | 9.5 |
| 9 | 67.9–83.9 | 15 (14) | 5.0 | 6.5 | 10.0 | 39 (38) | 16.0 |
| 10 | 83.9–90.6 | 20 (20) | 6.7 | 8.2 (check, then rests) | — | 9 (0) | 6.7, then rests |
| **Total** | | **131 (130)** | **43.7** | | | **188 (181)** | **90.6 figure, 93.6 player** |

Notes:
- **Every beat meets reading + 1.5 s.** Twice the reading time isn't met in beats 3 and 7 (✕). PME has the same shortfall in both beats: beat 3 has the identical 12 words, and beat 7 has 17 words, so 11.3 s against 9.8. Business beat 7 is one word longer. "Why customers come here" is the reason the beat underlines, so I kept it.
- **Beat 8:** the business caption is 3 words shorter, which pays for the panel's 4 extra words. The beat carries 46 words against PME's 45. The bracket (11 words) arrives at 62.5–62.9, and the panel holds until 68.9, so it gets its 3.7 s reading time plus 2.3 s.
- **Beat 9:** the second owner's spoken answer was cut to 7 words, the same as PME's, so it is read and held 1.5 s before the check arrives at 83.9 (it's revealed 80.1–82.4). "For speed, not price" would have run 0.7 s into the check.
- **Beat 10:** the source line appears 1.0 s after the check, in small italic ink at the bottom of the stage, so the check stays the last word. Its reading time (3 s) overlaps the check. This is FC's treatment.

## 6. Verified figures (for the companion's source spine)

**Published abstract** (Crossref record for doi 10.1287/mnsc.2024.06909, read October 28, 2026):
- "by randomizing access to a GPT-4-powered AI business assistant";
- "unable to reject the null hypothesis of no average treatment effect on firm revenues and profits";
- "the effect for entrepreneurs who were low performing at baseline is over 0.20-standard-deviations lower than for initial high performers";
- "low performers did nearly 10% worse because of the AI assistant, whereas high performers may have benefited by over 15%";
- "This differential impact does not appear to result from differences in the questions posed to the AI or the advice that it provided but rather, from the advice that entrepreneurs chose to implement."

**Working paper**, HBS 24-042, February 27, 2024 version (eScholarship, qt40s41244, read the same day; printed page numbers):
- "640 Kenyan small business entrepreneurs who were randomly assigned to receive access to a GPT-4-powered AI business assistant via WhatsApp" (p. 3);
- "fast-food joints to poultry farms to cybershops" (p. 8), where the footnote says cybershops offer "computer access, internet browsing, printing, scanning, photocopying" (p. 8);
- "we engage in exploratory text analysis" (p. 3);
- "treated low performers were especially likely to implement 'generic' advice focused on lowering prices and investing in advertising … treated high performers worked with the AI to discover tailored and specific changes … from finding alternative ways to get power during blackouts to introducing a new in-demand car wash detergent" (p. 4).

**Not used:** this working paper's own effect sizes ("0.27 standard deviations", "8% decline"). The 2026 revision's "nearly 0.25" isn't used either. Only the published figures appear.

## 7. What I couldn't verify

- **The published full text.** It's paywalled, and I read only its abstract. The 640, WhatsApp and the generic-versus-tailored reading come from the 2024 working paper. BUSINESS-EXAMPLES.md cites the 2026 revision at different pages (pp. 3, 4, 9, 29), so the page numbers here are the 2024 version's.
- **Whether the exploratory reading survives in the published paper.** The page says so: "The published abstract doesn't mention it."
- The figure's numbers (battery A, 6 hours, 10%, the margin) are constructed and labelled that way in the setup and on the page.

## 8. Final frame (business)

Player 93.6 s, with these elements in place:
- **Top:** the task card, the four documents, and the flyer and sales-book callouts. "Mostly same-day" is underlined.
- **Plans:** both owners' plans, with Part 2 outlined in each. The second plan reads ~~Cut prices 10%~~ Keep prices: ~~match~~ outpace the new shop.
- **The AI's column:** receded, with the frontier between its answers and "THEIR PRICES" under Part 2.
- **Under the plans:** both answer bubbles, the names, "THE MENTOR SEES ONLY THE PLANS" with the key, and the source line.
- **Caption band:** "UNCALIBRATED RELIANCE · Confident output is accepted without knowing whether the task fits the tool." and "REVIEWER'S CHECK · What evidence justified relying on the AI here? / Ask part by part: was the evidence about that part?"

**Checks:** both editions at 1440 × 900, 1280 × 720, 390 × 844 and 768 × 1024. No console errors. Controls stay fixed through the run, with no horizontal scroll. The smallest SVG text is 14.1 px at 1440 and 11.1 px at 1280 × 720, and the stage is stacked below that. The phone player is 822 px at 390 × 844; the source line under the controls brings it to 869 px, outside the player, as in FC. Reduced and print views checked. Visitor copy passes the writing-as-jack mechanical check.

**Stills:** `shots/business/`:
- `beat-01.png` to `beat-10.png`;
- `final.png`, `final-1440.png`, `final-390.png`, `player-390-final.png`;
- `reduced-figure.png`, `page-1440-reduced.png`, `page-390-reduced.png`, `page-768-reduced.png`.

**Preview:** `shots/uncalibrated-reliance-business.mp4`, `.webm` and `.gif`.

## 9. Questions for Jack

1. **The evidence beat uses Otis** (section 1). BCG stays in figure 8, and here the frontier becomes the figure's reasoning rather than a measured result.
2. **The workplace check:** "What evidence justified relying on the AI here? / Ask part by part: was the evidence about that part?"
3. **Literal roles.** The edition uses owners and a mentor rather than the workplace cast's analysts and manager (section 3).
4. **Phone wordings are shorter than desktop.** The answers read "Battery A: 6 hours, cheaper" and "Cut prices 10%", and the second owner's edit is one red phrase, "Keep prices; outpace them". This keeps the phone player within 844 px.
