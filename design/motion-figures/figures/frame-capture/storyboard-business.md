# Frame capture: business edition storyboard

Edition `business`, workplace cast, round 2 (after `tests/business-figure-read-1.md`). Built from `editions/business.json` on the core in `storyboard.md` (layout, motion, colour grammar, nameplate). This file lists what differs from PME. If it and the data disagree, the data is what ships.

Open it with `index.html?edition=business`, or the "See this with: Workplace" link on the page. Runtime: 91.9 s on the figure clock, 94.9 s in the player (PME: 86.2 and 89.2).

## 1. Source and evidence

*Illustration based on Obermeyer, Powers, Vogeli & Mullainathan (2019), "Dissecting racial bias in an algorithm used to manage the health of populations," Science 366: 447–453.* Option A (EDITIONS-PLAN.md), with one exception Jack approved where the finding is the turn: the check in beat 12.

- **Setup:** "Illustration based on Obermeyer et al. (2019). The analysts, their AI and the task are constructed."
- **Under the final frame:**
  - "Illustration based on Obermeyer et al., Science (2019)." is in the SVG, fading in 1 s after the check.
  - On the stacked phone view, it sits just under the controls.
- **On the page:** "The study behind this example".
  - Every quote is from the abstract, word for word, checked against the PubMed record (PMID 31649194).
  - The race finding is stated in the abstract's words.
  - The section says the study's algorithm was a prediction model, with no generative AI involved.
  - It says what the paper did: it compared how sick patients were at the same risk score, and that score was the algorithm's prediction of cost.
  - It states that the figure's people, considerations, rankings and check are constructed.
- **The figure's check** is worded as "At the same predicted cost, some patients are sicker." This is the abstract's "At a given risk score, … considerably sicker", with the race named only on the page.

Sensitivity handling:
- Race appears only on the page, in the paper's words.
- The chips never mention race. "Access to care" is the chip.
- Neither analyst is biased; the frame produces the effect.

### Source notes for the companion's source spine

**Verified, abstract (p. 447), from the PubMed record retrieved October 28, 2026:**
- "Health systems rely on commercial prediction algorithms to identify and help patients with complex health needs."
- "a widely used algorithm, typical of this industry-wide approach and affecting millions of patients, exhibits significant racial bias"
- "At a given risk score, Black patients are considerably sicker than White patients, as evidenced by signs of uncontrolled illnesses."
- "Remedying this disparity would increase the percentage of Black patients receiving additional help from 17.7 to 46.5%."
- "The bias arises because the algorithm predicts health care costs rather than illness, but unequal access to care means that we spend less money caring for Black patients than for White patients."
- "Thus, despite health care cost appearing to be an effective proxy for health by some measures of predictive accuracy, large racial biases arise."
- "We suggest that the choice of convenient, seemingly effective proxies for ground truth can be an important source of algorithmic bias in many contexts."
- Citation: *Science* 2019 Oct 25; 366(6464): 447–453. doi:10.1126/science.aax2342.

**Not verified, so removed from the page.** These need a check against the published full text. A bot check blocked the full text from this session. The open copy (eScholarship) is the *submitted* version, so its wording and pages may differ from *Science*'s.
- the 97th-percentile automatic enrolment (cited p. 448);
- "well calibrated across races" (p. 449);
- "reasonable" and "by no means the only reasonable choice" (pp. 450–451);
- "7758, an 84% reduction in bias" (p. 453);
- "high-risk care management";
- "roughly 200 million people".

BUSINESS-EXAMPLES.md still lists these as verified.

## 2. Core changes (for Jack to confirm)

**The payoff is the study's finding** (cold read 1, problem 1).
- In round 1, the second analyst kept cost and shipped the same ranking. In the real case the condition they named held, so both rankings would have been wrong.
- **What happens now:**
  - The second analyst keeps cost for now and writes down what would change it (beat 9).
  - When the manager asks "What would change it?", the second analyst checks that condition (beat 12). It holds: at the same predicted cost, some patients are sicker.
  - Their frame changes: chronic illness replaces next year's costs, and next year's costs joins the set-aside four.
  - Their ranking is rewritten, with red change bars, as "Which patients are sickest?".
  - Under the first analyst's frame: "Nothing to check". They never named what would change it.
- The final frame shows both titles beside the task card's "need": "cost the most?" and "sickest?".

**Still core:**
- the reasonable first frame becomes the working frame (beats 3–5);
- the pull-back turn (beat 6);
- the final copy carries no sign of the AI (beats 7–8);
- identical rankings until someone asks (beat 10);
- "Why this frame? What would change it?" (beats 11–13).

**Beat 7 is split** (problem 2).
- "The manager receives the final ranking." plays while the key, the wipe and the brackets are on screen.
- "Nothing in it shows the frame came from the AI." starts only after the key and brackets have gone (core 52.45 s). A 2.0 s hold gives it reading time.

**The note has its own hold** (problem 3). After it lands, the picture holds for 5.8 s (13 words ÷ 3 + 1.5 s) before the next caption and before the second ranking is drawn. It fades with the weighing in beat 10, so it no longer hangs alone.

**The phone keeps the task to the end** (problem 5).
- An "EXAMPLE TASK" line stays from beat 9 to the final frame, beside the rankings' titles.
- The note uses the same words as on desktop.
- To fit 844 px, these beats use compact papers (title only), a one-line ask, the note and the check full width, and 8 px section gaps (business only). The player measures 826 px at 390 × 844.

**How the clock differs.** `timeline.edits` in the edition data changes the clock; the core is untouched, and PME has no edits.
- Cuts trim static holds by 8.9 s in all, all within reading time plus 1.5 s:
  - beat 1, 1.5 s;
  - beat 2, 2.0 s;
  - beat 6, 1.8 s;
  - beat 10, 1.8 s;
  - beat 11, 1.8 s.
- Holds add 14.6 s:
  - beat 8 (7b), 2.0 s;
  - beat 9's note, 4.1 s;
  - the turn, 8.5 s.

## 3. Words that differ, beat by beat

The cast supplies the role words: "student" becomes "analyst", "faculty" becomes "the manager", and "Faculty check" becomes "Reviewer's check".

| # | Caption | Picture words that differ from PME |
| --- | --- | --- |
| 1 | An analyst gets an open care-program task. | Task card: "Which patients need the most / help from the program?"; "Analyst" |
| 2 | Many things could matter. Framing means picking which ones define the problem. | Chips: Chronic illness, Next year's costs, Avoidable visits; Program budget, Access to care, Who it can help |
| 3 | The analyst asks an AI. It proposes a reasonable, narrower frame. | Title "Which patients cost the most?" (kept: Which, patients, the, most; added: cost, ?) |
| 4–5 | …takes up the frame… / …adding evidence and a firmer cut-off. | "ANALYST'S DRAFT n" |
| 6 | Step back with us: every revision stayed inside the AI's frame. | — |
| 7 | The manager receives the final ranking. | "WHAT THE MANAGER RECEIVES: THE FINAL RANKING", "AI-SUPPLIED" |
| 8 | Nothing in it shows the frame came from the AI. | "WHAT THE MANAGER RECEIVES", "FROM THIS ANALYST" |
| 9 | A second analyst, also using AI, weighs all six and keeps cost, for now. | "WOULD CHANGE IT / If some patients cost less / because they get less care" |
| 10 | That analyst writes the same ranking; the weighing doesn't show. | "Second analyst" |
| 11 | Ask each analyst why this frame. One knows what would change it. | "THE MANAGER ASKS EACH ANALYST / Why this frame?" |
| 12 | The second analyst checks it: at the same predicted cost, some patients are sicker. The frame changes. | "What would change it?"; red panel "THE CHECK / Patients at the same predicted cost: / fewer illnesses / more illnesses / Some are sicker. The condition holds."; chip swap; "Which patients are sickest?", "Chronic illness"; "NOTHING TO CHECK" |
| 13 | Reviewer's check: What problem did the analyst choose to solve? / Why this frame? What would change it? | Source line under the picture |

**The turn's moments** (seconds into beat 12):
- 0.3: "What would change it?";
- 1.0: the panel;
- 1.6–2.4: the bars grow;
- 2.6: the result;
- 3.6–4.6: the chip swap, and "Nothing to check";
- 4.4–6.0: the rewritten ranking (title, then rows);
- then a 2.5 s hold.

## 4. Pace

Reading time is caption words ÷ 3. Each beat runs at least its reading time plus 1.5 s. Times are on the figure clock; add 3.0 s for the player.

| # | Start | Length (s) | Words | Reading (s) | Reading + 1.5 (s) |
| --- | --- | --- | --- | --- | --- |
| 1 | 0.0 | 4.5 | 7 | 2.3 | 3.8 |
| 2 | 4.5 | 6.0 | 12 | 4.0 | 5.5 |
| 3 | 10.5 | 9.0 | 11 | 3.7 | 5.2 |
| 4 | 19.5 | 8.0 | 12 | 4.0 | 5.5 |
| 5 | 27.5 | 7.0 | 10 | 3.3 | 4.8 |
| 6 | 34.5 | 5.5 | 11 | 3.7 | 5.2 |
| 7 | 40.0 | 7.15 | 6 | 2.0 | 3.5 |
| 8 | 47.15 | 4.85 | 10 | 3.3 | 4.8 |
| 9 | 52.0 | 13.5 | 14 | 4.7 | 6.2 (note: 5.8 s of its own) |
| 10 | 65.5 | 5.0 | 10 | 3.3 | 4.8 |
| 11 | 70.5 | 6.15 | 12 | 4.0 | 5.5 |
| 12 | 76.65 | 8.55 | 17 | 5.7 | 7.2 |
| 13 | 85.2 | 6.7, then rests | 10 + 7 | 3.3 + 2.3 | 4.8 |
| **Total** | | **91.9 (94.9 player)** | **149** | | |

The turn adds about 31 picture words. They arrive in steps over 6 s and stay through the final beat (about 15 s on screen).

## 5. Final frame (business)

Player 94.9 s.
- On the right: the task card ("Which patients need the most help from the program?"), then "THE MANAGER ASKS EACH ANALYST / Why this frame? / What would change it?", then the red check panel.
- On the left, under "WHAT THE MANAGER RECEIVES":
  - "First analyst": "Which patients cost the most?" (next year's costs, program budget), with the AI's grey frame and "NOTHING TO CHECK" under it.
  - "Second analyst": "Which patients are sickest?" (chronic illness, program budget), with red change bars. Under it are the red chosen frame with chronic illness, the set-aside four (now including next year's costs) and the note.
- Under the picture: the source line.
- Caption band: the definition, "REVIEWER'S CHECK", and both question lines.

On the phone, the final view is the task line, the two rankings' titles, the ask, both columns, the note and the check.

Stills: `shots/business/` (a still per beat, `final.png`, `final-1440.png`, `final-390.png`, reduced and page views). Preview: `shots/frame-capture-business.mp4`, `.webm` and `.gif`.

## 6. Page

All copy is in `editions/business.json` → `page`.
- **Setup and check:** the setup, then the check with "Before the check, both analysts…" as the follow-up.
- **Evidence:** "The study behind this example", abstract quotes only.
- **No essay quote:** the PME quote's "student" and "adversary" wording is gone.
- **"Go further":** a line on where the failure mode comes from, then two links: "The study" (doi) and "The original essay, written for military education" (*The Irreducible Officer*, Section II).
- **Removed:** the PME-only links (book chapter, companion).
- **Switch:** "See this with: Workplace · PME", then "PME (professional military education): the example from *The Irreducible Officer*, the National War College essay."

The copy passed writing-as-jack's mechanical check.

## 7. Questions for Jack

1. The payoff: the second analyst checks, the condition holds, and the frame changes to chronic illness. Confirm this is the faithful variant, with the evidence exception it uses.
2. The workplace check wording (unchanged): "Reviewer's check: What problem did the analyst choose to solve? / Why this frame? What would change it?"
3. The four unverified passages (section 1) need a check against the published full text before they return to the page or reach the source spine.
