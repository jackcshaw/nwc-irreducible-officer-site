# Frame capture: business edition storyboard

Edition `business`, workplace cast. Round 3 makes the final fixes after `tests/business-figure-read-2.md`, then the fixes from `tests/business-verify.md`. Built from `editions/business.json` on the core in `storyboard.md` (layout, motion, colour grammar, nameplate). This file lists what differs from PME. If it and the data disagree, the data is what ships.

Open it with `index.html?edition=business`, or the "See this with: Workplace" link on the page. Runtime: 100.6 s on the figure clock, 104.8 s in the player (PME: 86.2 and 90.4).

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
  - "The figure uses chronic illness as its measure of need." It says nothing either way about what the study measured.
  - It says the study's algorithm was a prediction model, with no generative AI involved.
  - It states that the figure's people, considerations, rankings and check are constructed.
- **The figure's check:** under "SAME PREDICTED COST", it draws two patients with equal cost bars, one with more chronic conditions, then "Checked: some patients are sicker." Phones draw it too.

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

**Verification fixes** (`tests/business-verify.md`):
- **Reading time for picture text.** Each new label or panel line keeps the screen for its words ÷ 3 + 1.5 s before the next change:
  - the question, 2.85 s;
  - the panel, drawn in one step (7 words), 3.85 s;
  - the result (5 words), 3.2 s;
  - the rewritten ranking (6 words), 3.5 s;
  - the note on the first ranking with "Nothing to check" (7 words, together on the left), 3.85 s.
- **Words cut first:** the panel lost its intro line and the patient names; the result is now "Checked: some patients are sicker."
- **Timeline:** beat 12 is 9.9 s and beat 13 is 8.75 s; the run is 103.6 s.
- **Phones:**
  - Beat 12 gets its own check section: the question, the note, two equal cost bars with condition dots and a legend, and the result.
  - "↓ Sicker ranked lower" sits inside the first ranking's box. Its space is kept from the start, so nothing jumps.
  - The ask line leaves at a beat boundary, never mid-beat.
- **Page load:** the runtime keeps the page hidden until the edition fills it, so the PME note no longer flashes on the business page. The static meta is role-neutral. INTEGRATION-PLAN.md asks the build for a static page per edition.

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
- Holds add 24.7 s:
  - beat 8, 2.0 s;
  - beat 9's note, 4.1 s;
  - beat 12, 9.9 s;
  - beat 13, 8.7 s.

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
| 12 | The second analyst checks it: at the same predicted cost, some patients are sicker. | "What would change it?"; "SAME PREDICTED COST", two equal bars with 2 and 5 dots, "predicted cost · chronic condition"; "Checked: some patients are sicker." |
| 13 | So the frame changes, and so does the ranking. The cost ranking put sicker patients lower. | chip swap; "Which patients are sickest?", "Chronic illness"; "Sicker patients / ranked lower" with "NOTHING TO CHECK" (phone: "↓ Sicker ranked lower") |
| 14 | Reviewer's check: What problem did the analyst choose to solve? / Why this frame? What would change it? | Two source lines under the picture |

**Moments:**
- **Beat 12** (seconds in): 0.0, the question; 2.85–3.45, the panel drawn in one step; 6.7, the result; the beat ends at 9.9.
- **Beat 13:** 0.3–1.1, the swap; 1.3–2.7, the rewrite; 4.8, the note on the first ranking and "Nothing to check"; the beat ends at 8.75.

## 4. Pace

Reading time is caption words ÷ 3. Each beat runs at least its reading time plus 1.5 s. Times are on the figure clock; add 4.2 s for the player.

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
| 12 | 75.25 | 9.9 | 14 | 6.2 |
| 13 | 85.15 | 8.75 | 16 | 6.8 |
| 14 | 93.9 | 6.7, then rests | 10 + 7 | 4.8 |
| **Total** | | **100.6 (104.8 player)** | **162** | |

## 5. Final frame (business)

Player 104.8 s.
- **Right:** the task card ("need the most help"); "THE MANAGER ASKS EACH ANALYST / Why this frame? / What would change it?"; and the check panel, showing two patients with the same predicted cost, one with more chronic conditions, and "Checked: …".
- **Left, under "WHAT THE MANAGER RECEIVES":**
  - "First analyst": "Which patients cost the most?", with the red note "↓ Sicker patients ranked lower". The AI's grey frame and "NOTHING TO CHECK" are under it.
  - "Second analyst": "Which patients are sickest?", with change bars. Under it are the red chosen frame (chronic illness, program budget), the set-aside four and the note.
- **Bottom:** the two source lines.
- **Caption band:** the definition and the reviewer's check.

**On phones,** the final stacked view shows:
- the task line;
- both titles, with "↓ Sicker ranked lower" in the first box;
- both columns;
- set-aside, the note and the check, full width;
- the source.

Beat 12 shows the drawn check. The player is 827 px at 390 × 844.

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

## 7. Classroom cast (pilot, CLASSROOM-PLAN.md step 2)

The business edition in two more casts, through data in `editions/business.json` (`casts`, `byCast`). The scenario, timeline, picture and evidence stay as built. Open it with `?edition=business&cast=classroom` (higher ed: "faculty", "seminar", "Faculty check") or `&cast=high-school` ("the teacher", "class", "Teacher's check").

**Keys.**
- The eleven literals `edition-check` flagged are now keys: `{second}`, `{person}`, `{A_person}`, `{people}` and `{That_person}`. The workplace text resolves exactly as before.
- Where a sentence changes beyond role words, there is a `byCast` patch:
  - the first caption;
  - the beat 12 detail ("the second question from {reviewer}");
  - the setup;
  - the source paragraph;
  - the links note.
- `byCast["high-school"]` is classroom's patches plus `page.teacherNote`.
- Two internal stacked-view section ids were renamed (`student` to `dot`, `faculty` to `final`). They were never shown, but the check read them as role words.

**Words that differ from workplace** (classroom / high school):

| Where | Classroom | High school |
| --- | --- | --- |
| Caption 1 | A student gets an open health-system case. | same |
| Caption 3 | The student asks an AI. It turns need into cost: a reasonable, narrower frame. | same |
| Caption 7 | Faculty receive the final ranking. | The teacher receives the final ranking. |
| Captions 9, 11, 12 | A second student… / Ask each student… / The second student checks it… | same |
| Caption 14 | Faculty check: What problem did the student choose to solve? | Teacher's check: … |
| Picture | WHAT FACULTY RECEIVE (: THE FINAL RANKING), FROM THIS STUDENT, STUDENT'S DRAFT, First/Second student, FACULTY ASK EACH STUDENT | WHAT THE TEACHER RECEIVES…, THE TEACHER ASKS EACH STUDENT |
| Phone | Second student: would change it if some patients cost less because they get less care. | same |
| Setup | "A student in a health policy seminar works a health system's case… like test scores for learning, or sales for customer value. Faculty receive the finished ranking, which can't show who chose its frame. The case is an illustration based on Obermeyer et al. (2019), a study of a health-care algorithm and its patients, not of students. The students, their AI and the task are constructed." | "…health policy class… The teacher receives the finished ranking…" |
| Source paragraph | "The study looked at an algorithm and its patients, not at students. The students, their AI, the case, the six considerations, the rankings and the check are constructed." | same |
| Links note | "The failure mode and the faculty check come from the essay below. This page shows the same move in a seminar working a health system's case." | "…the teacher's check… a class…" |
| Teacher note | none | "For teachers: the figure's last line gives the study's finding about Black and White patients in the paper's terms. The study traces it to unequal access to care: less money was spent on Black patients with the same level of need." (abstract; *Science* editor's summary) |

**The race finding stays on screen in every cast** (decision 5).
- **Workplace and classroom:** "In the study, at a given risk score, Black patients were considerably sicker than White patients."
- **High school** (after the light read) explains the score and gives the cause, in the abstract's terms:
  - "Illustration based on Obermeyer et al., Science (2019). In the study, the risk score was the algorithm's prediction of cost."
  - "At the same risk score, Black patients were considerably sicker than White patients, because less was spent on their care."
  - The phone wording is "Obermeyer et al., Science (2019): at the same risk score (a cost prediction), Black patients were sicker than White patients, because less was spent on their care." This keeps it to three lines inside the 844 px player.
  - A boxed "For teachers" note sits just under the player: "The figure's last line gives the study's finding about Black and White patients in the paper's terms, with its cause. The study traces it to unequal access to care: less money was spent on Black patients with the same level of need."

**The check:** the business questions under each cast's heading (decision 3).

**After the light read** (`tests/classroom-light-read.md`):
- **Caption 3 (classroom casts):** "The student asks an AI. It turns need into cost: a reasonable, narrower frame." It names the change the picture makes.
  - The overlap the reader saw at about 16.5 s (the grey copy lifting off the task card) is core motion in every edition, PME and workplace included, so it is flagged for Jack rather than changed.
- **The setup (classroom casts)** adds: "The seminar (class) allows AI, and both students say they used it, so the question is whose frame the ranking rests on." This answers the undisclosed-AI reading of beats 7–8.
- **The switch:** on a high-school page, "Classroom" is current and keeps `cast=high-school` (the runtime's cast families).

**Switch:** "See this with: Workplace · Classroom · PME".
- Classroom is `data-edition-link="business" data-cast-link="classroom"`. High school has no link; it is reached with `?cast=high-school`.
- `aria-current` was checked in six states:
  - no query, and `?edition=pme`: PME;
  - `business` and `cast=workplace`: Workplace;
  - `cast=classroom`: Classroom;
  - `cast=high-school`: Classroom, with its link keeping `cast=high-school`.

**Pace** (caption words ÷ 3 + 1.5 s, on the business timeline, figure clock):

| # | Length (s) | Workplace | Classroom | High school |
| --- | --- | --- | --- | --- |
| 1 | 4.0 | 7 words, 3.8 | 7, 3.8 | 7, 3.8 |
| 2 | 5.6 | 12, 5.5 | 12, 5.5 | 12, 5.5 |
| 3 | 9.0 | 11, 5.2 | 13, 5.8 | 13, 5.8 |
| 4 | 8.0 | 12, 5.5 | 12, 5.5 | 12, 5.5 |
| 5 | 7.0 | 10, 4.8 | 10, 4.8 | 10, 4.8 |
| 6 | 5.5 | 11, 5.2 | 11, 5.2 | 11, 5.2 |
| 7 | 7.15 | 6, 3.5 | 5, 3.2 | 6, 3.5 |
| 8 | 4.85 | 10, 4.8 | 10, 4.8 | 10, 4.8 |
| 9 | 13.5 | 14, 6.2 | 14, 6.2 | 14, 6.2 |
| 10 | 5.0 | 10, 4.8 | 10, 4.8 | 10, 4.8 |
| 11 | 5.65 | 12, 5.5 | 12, 5.5 | 12, 5.5 |
| 12 | 9.9 | 14, 6.2 | 14, 6.2 | 14, 6.2 |
| 13 | 8.75 | 16, 6.8 | 16, 6.8 | 16, 6.8 |
| 14 | 6.7, then rests | 10 + 7, 4.8 | same | same |

The picture's new texts keep workplace's word counts or fewer. For example, "THE TEACHER ASKS EACH STUDENT" has 5 words, the same as "THE MANAGER ASKS EACH ANALYST", so every picture hold still meets words ÷ 3 + 1.5 s.

**Checks** (both classroom casts):
- `edition-check` passes for all three casts.
- 1440 × 900: the picture, smallest label 14.1 px.
- 1280 × 720: the picture, smallest label 11.1 px.
- 1366 × 657: the stacked view, as in workplace and PME.
- 390 × 844: the player is 827 px.
- The controls never move, there's no horizontal scroll, and the console is clean.
- The workplace business edition frame-diffs 248/248 against a baseline taken before the change (switch hidden), and PME 203/203.

**Stills:**
- `shots/business-classroom/` and `shots/business-high-school/`, each with a still per beat, `final.png`, `final-1440.png`, `final-390.png`, and reduced and page views.
- Previews: `shots/frame-capture-business-classroom.mp4` and `shots/frame-capture-business-high-school.mp4`, plus `.webm` and `.gif`.

## 8. PME polish pass (October 30)

- **Beat 3, in every edition** (core).
  - The AI's copy of the task now appears at the top of the frame, instead of flying from the card over a consideration.
  - Then one change at a time: unkept words fade (core 17.7–18.1), kept words slide (18.1–18.5), and added words appear (18.5–18.9).
  - The new title keeps the screen 3.2 s before the headings move in (21.7–22.4). Nothing overlaps.
  - The business captions are unchanged; the classroom casts' caption 3 already names the change.
  - Frame-diff, before against after: only beat 3's frames changed (player 12.6–21.6), plus the page, reduced and print shots, whose beat lists now say the copy "appears". That holds for PME, workplace, classroom and high school.
  - Outside beat 3, the classroom casts show 9–27 pixels at one or two levels in their last beats. Fresh single-frame captures of those moments are identical before and after, so that's the long capture's paint history, not a change.
- **Laptop windows:** see storyboard.md. At 1366 × 657 the picture now shows in every edition (13-unit labels at 11.0 px), through a 100 px caption band on short windows 1200 px or wider. 1280 × 720 already showed it (11.1 px).
- **Baselines** (switch hidden): `regression/baseline-pme`, `baseline-business-nosw`, `baseline-business-classroom` and `baseline-business-high-school`. `baseline-pre-editions` is historical: its beat 3 is the old motion.
- **After the final verification** (tests/final-verify.md, defects 1–4):
  - Core: the second dot's label stays in place until core 58.7–59.0, as premature synthesis's does, so "Second analyst" ("Second student") reads 2.35 s (it needs 2.17 s; it faded as the dot left, 1.85 s).
  - Core, phone: the weighing note arrives with the second ranking (core 66.0–67.2) instead of at 68.0.
  - Business phone words, cut to fit the business clock without adding time: "Neither shows the weighing." (3.1 s, needs 2.83 s; was "The weighing doesn't show in either ranking.", 1.2 s) and "The dashed four: never weighed." (3.3 s, needs 3.17 s; was "The four dashed ones were never weighed."). PME keeps both of its lines.

## 9. Questions for Jack

1. The payoff and its evidence exception (check, condition holds, frame changes): confirm it is the faithful variant.
2. The four unverified passages (section 1) need a check against the published full text before they return to the page or reach the source spine.
