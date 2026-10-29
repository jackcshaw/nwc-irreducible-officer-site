# Frame capture: business edition storyboard

Edition `business`, workplace cast. Round 3 makes the final fixes after `tests/business-figure-read-2.md`. Built from `editions/business.json` on the core in `storyboard.md` (layout, motion, colour grammar, nameplate). This file lists what differs from PME. If it and the data disagree, the data is what ships.

Open it with `index.html?edition=business`, or the "See this with: Workplace" link on the page. Runtime: 95.8 s on the figure clock, 98.8 s in the player (PME: 86.2 and 89.2).

## 1. Source and evidence

*Illustration based on Obermeyer, Powers, Vogeli & Mullainathan (2019), "Dissecting racial bias in an algorithm used to manage the health of populations," Science 366: 447–453.* Option A (EDITIONS-PLAN.md), with one exception Jack approved where the finding is the turn: the check in beats 12–13.

- **Setup:** "Illustration based on Obermeyer et al. (2019). The analysts, their AI and the task are constructed." A sentence before it bridges to general business: "It can happen whenever a measure stands in for what you actually care about, like sales for customer value or tickets closed for problems solved."
- **Under the final frame:** two lines in the SVG, fading in 1 s after the check:
  - "Illustration based on Obermeyer et al., Science (2019)."
  - "In the study, at a given risk score, Black patients were considerably sicker than White patients." This is the abstract's finding, in its own terms.

  On phones the same text is the last section of the stacked view's final beat, inside the player.
- **On the page:** "The study behind this example".
  - Abstract quotes, word for word: what the algorithm was for; the race finding, with 17.7% to 46.5%; the cause; cost "by some measures of predictive accuracy"; and the conclusion on proxies.
  - *Science*'s editor's summary, quoted and attributed: "Reformulating the algorithm so that it no longer uses costs as a proxy for needs eliminates the racial bias in predicting who needs extra care."
  - "Chronic illness is this illustration's measure of need, not the study's."
  - It says the study's algorithm was a prediction model, with no generative AI involved.
  - It states that the figure's people, considerations, rankings and check are constructed.
- **The figure's check** draws two patients with the same predicted cost, one with more chronic conditions. It reads "Checked: at the same predicted cost, some patients are sicker."

### Source notes for the companion's source spine

**Verified, abstract (p. 447), from the PubMed record (PMID 31649194), retrieved October 28, 2026:**
- "Health systems rely on commercial prediction algorithms to identify and help patients with complex health needs."
- "a widely used algorithm, typical of this industry-wide approach and affecting millions of patients, exhibits significant racial bias"
- "At a given risk score, Black patients are considerably sicker than White patients, as evidenced by signs of uncontrolled illnesses."
- "Remedying this disparity would increase the percentage of Black patients receiving additional help from 17.7 to 46.5%."
- "The bias arises because the algorithm predicts health care costs rather than illness, but unequal access to care means that we spend less money caring for Black patients than for White patients."
- "Thus, despite health care cost appearing to be an effective proxy for health by some measures of predictive accuracy, large racial biases arise."
- "We suggest that the choice of convenient, seemingly effective proxies for ground truth can be an important source of algorithmic bias in many contexts."

**Verified, *Science* editor's summary ("Racial bias in health algorithms"), from the Crossref record for doi:10.1126/science.aax2342:**
- "Black patients assigned the same level of risk by the algorithm are sicker than White patients"
- "this racial bias reduces the number of Black patients identified for extra care by more than half"
- "Bias occurs because the algorithm uses health costs as a proxy for health needs."
- "Reformulating the algorithm so that it no longer uses costs as a proxy for needs eliminates the racial bias in predicting who needs extra care."

**Not verified, so kept off the page.** These need the published full text, which a bot check blocked from this session. The open eScholarship copy is the *submitted* version.
- the 97th-percentile automatic enrolment (cited p. 448);
- "well calibrated across races" (p. 449);
- "reasonable" and "by no means the only reasonable choice" (pp. 450–451);
- "7758, an 84% reduction in bias" (p. 453).

BUSINESS-EXAMPLES.md still lists these as verified.

## 2. Core changes (for Jack to confirm)

**The payoff is the study's finding** (since round 2).
- The second analyst keeps cost for now and writes down what would change it.
- When the manager asks "What would change it?", they check it, and it holds.
- Their frame changes to chronic illness, and their ranking is rewritten as "Which patients are sickest?".
- The first analyst has "Nothing to check".

**Round 3 fixes:**
- **The turn is staged as two beats,** one region at a time:
  - **Beat 12, the check, in the right column:** the second question, the panel, two patients with equal cost bars, their chronic-condition dots (2 and 5), then "Checked: at the same predicted cost, some patients are sicker."
  - **Beat 13, the consequences:** the chip swap (middle), the rewritten ranking (top), a red note on the first ranking, "↓ Sicker patients ranked lower" (left), then "Nothing to check" (left).
- **Beat 11's reveal is at the start.** The ask arrives 1.0 s in and the frames slide in from 1.7 to 2.7 s, leaving about 3 s to compare. A cut moves the static stretch that came before the reveal.
- **The final frame keeps the point.** The first ranking carries "Sicker patients ranked lower". The source line names who the study found sicker.
- **The keyboard:** see CONVENTIONS.md, Runtime. If focus enters the player before autoplay fires, it doesn't autoplay.

**From round 2, still in place:**
- the beat 7 split (the caption's claim waits until the key has gone);
- the note's own 5.8 s hold;
- the phone task line kept to the end.

**How the clock differs** (`timeline.edits`; the core is untouched, and PME has none):
- Cuts take out 10.3 s:
  - beat 1, 2.0 s;
  - beat 2, 2.4 s;
  - beat 6, 1.8 s;
  - beat 10, 1.8 s;
  - beat 11, 2.3 s, before its reveal.
- Holds add 19.9 s:
  - beat 8, 2.0 s;
  - beat 9's note, 4.1 s;
  - beat 12, 6.8 s;
  - beat 13, 7.0 s.

## 3. Words that differ, beat by beat

The cast supplies the role words: "student" becomes "analyst", "faculty" becomes "the manager", and "Faculty check" becomes "Reviewer's check".

| # | Caption | Picture words that differ from PME |
| --- | --- | --- |
| 1 | An analyst gets an open care-program task. | Task card: "Which patients need the most / help from the program?"; "Analyst" |
| 2 | Many things could matter. Framing means picking which ones define the problem. | Chips: Chronic illness, Next year's costs, Avoidable visits; Program budget, Access to care, Who it can help |
| 3 | The analyst asks an AI. It proposes a reasonable, narrower frame. | Title "Which patients cost the most?" |
| 4–5 | …takes up the frame… / …adding evidence and a firmer cut-off. | "ANALYST'S DRAFT n" |
| 6 | Step back with us: every revision stayed inside the AI's frame. | — |
| 7 | The manager receives the final ranking. | "WHAT THE MANAGER RECEIVES: THE FINAL RANKING", "AI-SUPPLIED" |
| 8 | Nothing in it shows the frame came from the AI. | "FROM THIS ANALYST" |
| 9 | A second analyst, also using AI, weighs all six and keeps cost, for now. | "WOULD CHANGE IT / If some patients cost less / because they get less care" |
| 10 | That analyst writes the same ranking; the weighing doesn't show. | "Second analyst" |
| 11 | Ask each analyst why this frame. One knows what would change it. | "THE MANAGER ASKS EACH ANALYST / Why this frame?" |
| 12 | The second analyst checks it: at the same predicted cost, some patients are sicker. | "What would change it?"; "THE CHECK / Two patients, same predicted cost: / Patient A, Patient B / predicted cost, chronic condition / Checked: at the same predicted cost, / some patients are sicker." |
| 13 | So the frame changes, and so does the ranking. The cost ranking put sicker patients lower. | chip swap; "Which patients are sickest?", "Chronic illness"; "Sicker patients / ranked lower"; "NOTHING TO CHECK" |
| 14 | Reviewer's check: What problem did the analyst choose to solve? / Why this frame? What would change it? | Two source lines under the picture |

**Moments:**
- **Beat 12** (seconds in): 0.3, the question; 1.2, the panel; 1.9–2.6, the patients and cost bars; 2.9–3.9, the dots one by one; 4.3, the result; then a 2.1 s hold.
- **Beat 13:** 0.6–1.6, the swap; 2.0–3.4, the rewrite; 3.9, the note on the first ranking; 4.6, "Nothing to check"; then a 2 s hold.

## 4. Pace

Reading time is caption words ÷ 3. Each beat runs at least its reading time plus 1.5 s. Times are on the figure clock; add 3.0 s for the player.

| # | Start | Length (s) | Words | Reading + 1.5 (s) |
| --- | --- | --- | --- | --- |
| 1 | 0.0 | 4.0 | 7 | 3.8 |
| 2 | 4.0 | 5.6 | 12 | 5.5 |
| 3 | 9.6 | 9.0 | 11 | 5.2 |
| 4 | 18.6 | 8.0 | 12 | 5.5 |
| 5 | 26.6 | 7.0 | 10 | 4.8 |
| 6 | 33.6 | 5.5 | 11 | 5.2 |
| 7 | 39.1 | 7.15 | 6 | 3.5 |
| 8 | 46.25 | 4.85 | 10 | 4.8 |
| 9 | 51.1 | 13.5 | 14 | 6.2 (note: 5.8 s of its own) |
| 10 | 64.6 | 5.0 | 10 | 4.8 |
| 11 | 69.6 | 5.65 | 12 | 5.5 |
| 12 | 75.25 | 6.8 | 14 | 6.2 |
| 13 | 82.05 | 7.05 | 16 | 6.8 |
| 14 | 89.1 | 6.7, then rests | 10 + 7 | 4.8 |
| **Total** | | **95.8 (98.8 player)** | **162** | |

## 5. Final frame (business)

Player 98.8 s.
- **Right:** the task card ("need the most help"); "THE MANAGER ASKS EACH ANALYST / Why this frame? / What would change it?"; and the check panel, showing two patients with the same predicted cost, one with more chronic conditions, and "Checked: …".
- **Left, under "WHAT THE MANAGER RECEIVES":**
  - "First analyst": "Which patients cost the most?", with the red note "↓ Sicker patients ranked lower". The AI's grey frame and "NOTHING TO CHECK" are under it.
  - "Second analyst": "Which patients are sickest?", with change bars. Under it are the red chosen frame (chronic illness, program budget), the set-aside four and the note.
- **Bottom:** the two source lines.
- **Caption band:** the definition and the reviewer's check.

**On phones,** the final stacked view shows:
- the task line;
- both titles, with "↑ Sicker patients ranked lower";
- both columns;
- set-aside, the note and the check, full width;
- the source.

The ask line is left out, because the caption band asks the same questions. The player is 831 px at 390 × 844.

Stills: `shots/business/` (a still per beat, `final.png`, `final-1440.png`, `final-390.png`, reduced and page views). Preview: `shots/frame-capture-business.mp4`, `.webm` and `.gif`.

## 6. Page (business)

All copy is in `editions/business.json` → `page`.
- **Meta description:** "An analyst builds on an AI's reasonable first frame, and the finished ranking can't show who chose it. One question can."
- **Edition note:** none. `page.editionNote` is null, so the PME note above the figure is hidden. The switch still reads "Workplace · PME".
- **Setup:** includes the bridge sentence above.
- **Reviewer's check follow-up:** "Before the check, both analysts in the figure would answer the first question the same way. The second line separates them: one can say what would change their frame, and check it."
- **Evidence:** as in section 1.
- **"Go further":** the note "The failure mode and the reviewer's question come from the essay below…", then "The study" (doi) and "The original essay: The Irreducible Officer, Section II". It uses no military wording beyond the title.

The copy passed writing-as-jack's mechanical check.

## 7. Questions for Jack

1. The payoff and its evidence exception (check, condition holds, frame changes): confirm it is the faithful variant.
2. The four unverified passages (section 1) need a check against the published full text before they return to the page or reach the source spine.
