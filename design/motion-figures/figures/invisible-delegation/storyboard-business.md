# Invisible delegation: business edition storyboard

Edition `business`, workplace cast. Built from `editions/business.json` on the unchanged core in `storyboard.md`: the timeline, layout, motion, colour grammar and nameplate. This file lists only what differs from the PME edition. If this file and the data disagree, the data is what ships.

Open it with `index.html?edition=business`, or with the page's "See this with: Workplace" link.

## Classroom light read fixes (October 30, `tests/classroom-light-read.md`), wording for Jack

- **The separating question no longer rewards turning a note down** (classroom light read, problem 1). A student who decided first and agreed with every AI note would also have answered "None" to "What did you turn down?". The follow-up now asks for kept notes with reasons, so the difference is whose reasons they give.
  - The manager, faculty or teacher asks "Better by whose standard?", then "Which notes did you keep, and why?"
  - The check is "What did the AI decide for them? / Ask: whose standard? Which notes did you keep, and why?" PME's first line is "…for the student?". Both lines sit at equal weight, one line each at 1280 and 1440, and the controls don't move.
  - Rejected: "Which notes did you keep or turn down, and why?" (the light read's example). It wraps to a second line at desktop widths, and "keep, and why" already draws out the turned-down notes, as the second answer shows.
  - Answers: both say "The firm's standard." Then the first says "I kept them all. They made it clearer." (reasonable, but the reason is the AI's), and the second says "Kept two that fit what I decided. Struck the recap: not in my outline."
  - The page's check paragraph now says a person who decided first could keep every note and still say why each fits.
- **"Standard" means one thing.** Caption 4 reads "Each request left out whose criteria to use. The AI used its own." The unsaid lines stay "whose criteria? / whose outline? / whose meaning?".
- **Phones pair each request with its card.** Without lanes, each card is indented under its own request with a turn arrow (↳), so "Suggest a better structure" no longer reads as belonging to "The criteria" above it.
  - The phone spacing is tighter, and the stacked pulse is a box-shadow, so it no longer grows the stage.
  - The stage height is measured to the sub-pixel, so the controls hold still.
- **Timing.** Beat 8 holds each line at reading pace: the follow-up at 75.6 s, the first answer typed 78.0–80.7 s, the second 81.3–86.0 s (14 words), and the check at 88.0 s figure time.
  - That is 2.6 s more than round 3. Business, classroom and high school run 97.9 s.
- **Frames** (captured before and after with `--freeze`):
  - At 1440 and 1280, frames before 73 s change only in the caption band during beat 4.
  - From 73 s, the answer panels, the question and the caption band change, and the ledgers return 2.6 s later.
  - At 390 every frame changes (arrows and spacing).
  - All four regression baselines are re-captured.

## Round 3: final fixes after business cold read 2 (`tests/business-figure-read-2.md`)

1. **No straw man.**
   - The manager asks "Better by whose standard?", and both analysts answer the same, at the same time: "The firm's standard."
   - The follow-up, "What did you turn down, and why?", separates them. The first says "None. They all made it clearer." The second says "'Add a recap.' It wasn't in my outline."
   - The workplace check matches (section 3).
   - Beat 8's caption: "The manager has only the emails, and asks each analyst two questions."
   - Business needs 1.8 s more before the check (check at 85.4 s figure time; 95.3 s total).
2. **One difference only.**
   - Caption 5 now reads "A second analyst reads the standard, then decides before asking." (round 3 wording "reads the same standard, then decides before asking" was 11 words, 0.03 s over the 2× reading rule; shortened in the classroom pass).
   - The first analyst's read in beat 1 gets the same highlight as the second's in beat 5: it grows, is washed and is underlined, and the underline clears afterwards on both sides.
   - The first analyst now stays at the standard for 2.1 s.
3. **Stacked layouts.**
   - At 1280 × 720 and 390, the outline card ("Date, reason, plan") pulses when "Add a recap" is struck, as in the wide layout.
   - The pulse lasts 2 s in all layouts, up from 0.6 s.
   - Beat 2's caption no longer says "across": "The analyst asks an AI for feedback. The request hands the criteria to the AI." It is true at 390, where the chip greys in place.
4. **Sources:** see section 6, with the spine entry and Microsoft Research PDF pages.

**After verification:** in the stacked layouts the standard is underlined only while either analyst reads it (`is-consulted`), as in the wide picture. Before this fix, the second analyst's read left an underline that stayed to the end. PME has the same asymmetry by design, because there only the second person reads the rubric. PME is unchanged; flagged for Jack.

**Core changes, gated on edition data,** with PME pixel-identical (0 of 203 frames) to `regression/baseline`:
- `followUp`, with `labels.askQ2` and `answers.split`: the follow-up question, a shared first answer, and the timing overrides.
- The pulse for `notes.judgedBy` now also applies in the stacked view.
- The first person's read uses the same highlight as the second's.

A note on noise: two frame-diff runs showed a one-pixel, six-level difference at 390 from 60 s onwards. The committed state of 75a90fa showed it too, and it flipped between runs of identical code. A third capture of the current code is pixel-identical to the baseline.

## Round 2: changes after business cold read 1 (`tests/business-figure-read-1.md`)

1. **No pronoun trap.** The unsaid lines now ask "whose criteria?", "whose outline?" and "whose meaning?", so the unsaid part plainly belongs to whoever should decide.
2. **The emails differ only where the standard doesn't settle it.**
   - The notes are "Cut the jargon", "Formal phrasing" and "Add a recap".
   - The first analyst keeps all three, and the AI's recap stays in their email as a grey row (`notes.extraRow`).
   - The second analyst strikes "Add a recap", "not in my outline", while their outline card pulses (`notes.judgedBy`).
   - Both emails put the bad news first with the new date, so both meet the firm's standard. Reading the emails can't tell the manager who decided; only the question can.
3. **No magic words.** Lee et al. describe stewardship as deciding what you want and then assessing the AI's response against your quality standards. So the second analyst asks in the same words as the first, and their requests carry no clause. They write each decision down first and judge the same notes against those decisions. Nothing implies the AI received their criteria.
4. **The same access.** The first analyst's dot visits the standard in beat 1, while it is highlighted (`firstReadsStandard`). The beat 1 caption is "An analyst improves a client email to the firm's standard." Only the second analyst decides from the standard before asking.
5. **Consistent standard and ticks.** The second analyst's cards are short, single-line decisions: "New date, and why", "Date, reason, plan" and "Clear and courteous". Ticking "Cut the jargon" and "Formal phrasing" fits "clear and courteous", and nothing claims the standard says "plain".
6. **The 1280 × 720 stacked view.**
   - Each cell is a two-lane track under "ANALYST DECIDES | AI DECIDES", and the first analyst's chips slide across it as their request carries them.
   - The paper line reads "Email revised with AI", so "only the emails" names something on screen.
   - The source line is inside the player, above the controls: "Based on a 2025 study of knowledge workers (Lee et al.)."
   - The player measures 717 px at 1280 × 720 and 835 px at 390 × 844.
7. **Beat 6 at reading pace.** Three short decisions (9 words) and three plain requests replace six red lines.
8. **Source line:** "Illustration based on a 2025 study of knowledge workers' AI use (Lee et al.)." The setup has the same line, and "CHI" is gone.
9. **Page copy.**
   - The PME edition note is hidden on the business edition (`page.editionNote` is PME-only).
   - Military education is mentioned once, in the original-essay link.
   - The meta description is business ("two analysts improve the same client email…"), and "agency" became "firm".
10. **Sources:** see section 6 (numbers and quotes with PDF pages).

**Core changes, all gated on edition data,** with PME at 0 differing frames of 203:
- `firstReadsStandard`: the first person reads the standard.
- requests with no clause: a single-line quote and no pointer.
- a one-line written card: 40 units tall.
- `notes.judgedBy`: which card pulses.
- `notes.extraRow`: the kept note's AI text in the first paper.
- `narrow.lanes`: the sliding two-lane track on a wide stacked stage.
- `narrow.source`: the source line inside the stacked player.

## 1. Source and evidence (option A)

*Illustration based on Lee, Sarkar, Tankelevitch, Drosos, Rintel, Banks & Wilson (2025), "The Impact of Generative AI on Critical Thinking: Self-Reported Reductions in Cognitive Effort and Confidence Effects From a Survey of Knowledge Workers," CHI '25. doi:10.1145/3706598.3713778.* The scenario is BUSINESS-EXAMPLES.md §5, the approved client email.

- **Setup:** "Illustration based on a 2025 study of knowledge workers' AI use (Lee et al.). The analysts, their AI, the email and the firm's standard are constructed."
- **Under the final frame:** "Illustration based on a 2025 / study of knowledge workers' / AI use (Lee et al.)." (round 2 wording) It sits in the SVG's right column under the second answer and fades in 1 s after the check (figure 84.6–85.1 s). On the stacked view it sits under the controls, outside the fixed-height player.
- **On the page:** "The study behind this example", after the check. It gives:
  - the headline finding in the paper's words;
  - P275 (the "make a passage professional" request);
  - P144 (the "changed up my main point" risk);
  - the paper's definition of stewardship, which is what the second analyst does;
  - the limits: self-reported, correlational, single-participant quotes, and the authors' affiliations.
  Every quote carries its PDF page.
- **No evidence beat.** The finding isn't the turn here; the turn is still what the requests left unsaid (beat 4).

## 2. Core changes (gated, for Jack to confirm)

Nothing in the story changes, and the study endorses the model analyst. The paper's stewardship is "translating intentions into queries, steering AI responses, and assessing if the AI response meets their quality standards for work". The first analyst's habit is P275's: a simple task, "so I just never thought about it". No contrast endorses what the study found wrong.

Two additive changes, both inert in PME (frame-diff 0):
- **The source line** is drawn only when the edition has `labels.source` / `narrow.source`.
- **The standard's text** starts after its label. "STANDARD ·" is longer than "RUBRIC ·", so the text moves from x 108 to x 124; PME's label keeps it at 108. While the second analyst consults it, the enlarged line is capped inside the task card. PME's cap is still 130%; business's is 118%.

## 3. The workplace check (wording for Jack)

> REVIEWER'S CHECK
> *What did the AI decide for them?*
> *Ask: whose standard? What did you turn down, and why?* (same size, round 3)

Round 3 changed this after business cold read 2. Both analysts read the same standard, so both honestly answer "whose standard?" the same way ("The firm's standard"). The follow-up is what separates them: the first turned nothing down, and the second can name the recap and the reason. Both questions sit at equal weight on one line, which fits on one line at 1280 and 1440, so the controls never move.
- The manager in the figure asks "Better by whose standard?" and then "What did you turn down, and why?"
- The longer forms ("To find out, ask each analyst: better by whose standard? Which suggestions did you turn down, and why?") wrap to a second line at desktop widths and push the controls down 29 px.
- Earlier drafts: "To find out, ask each analyst: better by whose standard?" (rounds 1 to 2); EDITIONS-PLAN.md's "What did the AI decide for them? Better by whose standard?"

## 4. Words that differ, beat by beat

| Beat | PME | Business |
| --- | --- | --- |
| Task card | "Recommend whether to keep a forward base." · "RUBRIC · Evidence must back the call." | "Tell the client the project slips three weeks." · "STANDARD · Bad news first, with the new date." |
| People and reviewer | First / second student; "FACULTY ASK" | First / second analyst; "THE MANAGER ASKS" |
| Cards | The criteria · How the argument runs · What "strategic" means | The criteria · How the email runs · "Professional" means |
| Requests | … · "Make it more strategic" | … · "Make it more professional" |
| Unsaid | against your criteria · for your argument · as you define it | against your criteria · for your outline · as you define it |
| Second person's requests | … for my argument · … more strategic, as I define it | … for my outline · … more professional, as I define it |
| Second person's decisions | Evidence must back the call · Lead with the call, then its evidence · Serves the ally's long-term interest | Client leaves knowing the new date and why · Date first, then the reason, then the plan · Plain, as our standard says |
| AI's notes | Tighter opening · Add the costs · Be more decisive | Cut the jargon · Formal phrasing · Reassure first |
| Turned down | "Be more decisive": evidence too thin | "Reassure first": bad news first |
| Answers | "The AI's notes, I suppose. I worked through what it flagged." / "Mine, set first from the rubric: does the evidence back my call?" | the first unchanged / "Ours, set first from our standard: bad news first." |
| 1 | "A student wants to improve a draft paper. We'll track three decisions it needs." | "An analyst is improving a bad-news email to a client. We'll track three decisions." |
| 2 | "The student asks …" | "The analyst asks an AI for feedback. The request carries the criteria across." |
| 3 | "… a more strategic version." | "Then for a better structure, and a more professional version." |
| 4 | unchanged | unchanged |
| 5 | "A second student, with the same task, starts from the rubric." | "A second analyst starts from the firm's standard." |
| 6 | "… the second student writes the decision down." | "Before each request, the second analyst writes the decision down." |
| 7 | "… The second student judges them against their decisions." | "Both get the same AI notes. The second analyst judges them against their decisions." |
| 8 | "Faculty have only the papers. They ask each student about the standard." | "The manager has only the emails, and asks each analyst about the standard." |
| 9 | Faculty check | Reviewer's check (section 3) |

The page is fully business: no PME words, and no PME-only links. The links are the study's DOI and "The original essay, written for military education: The Irreducible Officer, Section II".

## 5. Pace table

The timeline is PME's except beat 8, which is 1.8 s longer in business (round 3). Each caption needs its words ÷ 3 plus a 1.5 s hold, and the PME rule needs twice the reading time; both have to fit the beat. Every business caption is at or under its PME length.

| Beat | Caption words | Read + 1.5 s hold | 2× reading | Beat (s) | New on-screen words |
| --- | --- | --- | --- | --- | --- |
| 0 · Name card | — | — | — | 3.0 | 6 (universal) |
| 1 | 14 | 6.2 | 9.3 | 9.5 | 35 (task card, standard, lanes, cards; on screen to the end) |
| 2 | 15 | 6.5 | 10.0 | 11.3 | 15 |
| 3 | 10 | 4.8 | 6.7 | 12.1 | 8 |
| 4 | 13 | 5.8 | 8.7 | 8.7 | 15 |
| 5 | 10 | 4.8 | 6.7 | 7.3 | 2 |
| 6 | 10 | 4.8 | 6.7 | 11.4 | 18 (three plain requests and three one-line decisions; on screen to the end) |
| 7 | 14 | 6.2 | 9.3 | 10.2 | 3 |
| 8 | 12 | 5.5 | 8.0 | 14.9 | 26: the shared answer (3 words, 1.0 s), then the follow-up question (6 words, 2 s to read), then the first answer (5 words, 1.6 s) and the second (6 words, 1.8 s) |
| 9 | 8 + 10 | — | 6.0 | 6.9, then rests | 11 (source line) |

Beats 1 and 6 carry more picture words than the beat holds at 3 words a second, as in PME. Those words stay on screen to the end and are read again in later beats. In beat 8 each new line waits until the one before it has been read: the follow-up question at 2.2 s, the first answer 1.9 s after the question, and the second answer 0.6 s after the first, with 3.4 s to read it before the check.

## 6. Verified figures and quotes (for the source spine)

Checked against the full paper PDF; the round-2 tester confirmed the same page numbers in the copy hosted by Microsoft Research (microsoft.com/en-us/research/wp-content/uploads/2025/01/lee_2025_ai_critical_thinking_survey.pdf). The ACM Digital Library copy returned 403 and is unchecked, so cite the Microsoft Research copy's pages, as the page now says.

For the companion's source spine (Workplace Evidence), the entry I'd add: Lee, Sarkar, Tankelevitch, Drosos, Rintel, Banks & Wilson, "The Impact of Generative AI on Critical Thinking: Self-Reported Reductions in Cognitive Effort and Confidence Effects From a Survey of Knowledge Workers", CHI '25, DOI 10.1145/3706598.3713778. It is a self-report survey, not an observational study. Figures and quotes, with Microsoft Research PDF pages:
- 319 knowledge workers surveyed (p. 1; also pp. 4, 6). 936 first-hand examples of GenAI use at work (p. 1; also pp. 2, 4, 6, 9).
- Participants self-reported critical thinking for 555 of the 936 examples, 59.29% (p. 6; "approximately 60% (555 out of 936)", p. 9). This is verified but not used in the figure.
- "higher confidence in GenAI is associated with less critical thinking, while higher self-confidence is associated with more critical thinking" (abstract, p. 1).
- P275: "It's a simple task [make a passage professional] and I knew ChatGPT could do it without difficulty, so I just never thought about it, as critical thinking didn't feel relevant." (p. 11)
- P144: "whether the AI added irrelevant content and if it changed up my main point of the letter" (p. 8).
- Stewardship: "translating intentions into queries, steering AI responses, and assessing if the AI response meets their quality standards for work, while retaining accountability for the work" (p. 13).
- Authors and affiliations: Lee (Carnegie Mellon University); Sarkar, Tankelevitch, Drosos, Rintel, Banks and Wilson (Microsoft Research) (p. 1).

Not used:
- The optional Jakesch et al. (2023) line. It needs its own verification and labelling.
- The evidence beat suggested in BUSINESS-EXAMPLES.md, which the brief keeps for figures whose finding is the turn.

## 7. Checks

Both editions were checked at 1440 × 900, 1280 × 720 (stacked) and 390 × 844, plus reduced motion and print.

| Check | PME | Business |
| --- | --- | --- |
| Phone player | 840 px | 823 px |
| Desktop player at 1280 × 720 | 677 px | 677 px |

- **Controls:** never move.
- **Overflow:** no horizontal scroll at 390 or 768.
- **Text size:** the smallest is 13 px at 1440.
- **Errors:** no console errors.
- **Nameplate:** unchanged.
- **Regression:** PME frame-diffs to 0 of 203 against `regression/baseline`, which was recaptured with the edition switch. Before that, it diffed to 0 against `regression/baseline-pre-editions` with the switch hidden.
- **Voice:** the visitor copy passes the writing-as-jack mechanical check.

## 8. Classroom cast (CLASSROOM-PLAN.md section 5; Jack approved the defaults, October 30)

These are the business edition in two more casts, set through data in `editions/business.json` (`casts`, `byCast`). The scenario, timeline, picture, notes, answers and check stay as built and cold-read. Open them with `?edition=business&cast=classroom` (higher ed: "faculty", "seminar", "Faculty check") or `&cast=high-school` ("the teacher", "class", "Teacher's check").

**Keys.**
- The eight items `edition-check` flagged are converted:
  - `page.description`, `page.setup`, `page.evidence.4`: "analysts" → `{people}`;
  - `page.evidence.2`: "the second analyst" → `{the_second}`;
  - `page.checkFollow`: "the manager" → `{reviewer}`;
  - `page.srSummary`: "Then the manager asks" → `{then_ask}`.
- **Two verb fixes** for plural "Faculty", using the existing key `{reviewer_asks_each}`:
  - caption 8: "{reviewer_has} only the emails, and asks each {person} two questions." → "{reviewer_asks_each} two questions, with only the emails to go on." It reads "Faculty ask each student…", "The teacher asks each student…" and "The manager asks each analyst…";
  - the same fix in `page.srSummary`.
- `casts` is `["workplace", "classroom", "high-school"]`, and `edition-check` passes for all three.
- `byCast.classroom` patches five strings, and `byCast["high-school"]` is `"classroom"`. No patch has a verb after a reviewer key. No new cast key is needed.

**Workplace wording changed.**
- Captions 5 and 8. Caption 5 is now "A second analyst reads the standard, then decides before asking." The round-3 wording was 11 words, 0.03 s over the 2× reading rule in a 7.3 s beat.
- Page text: the meta description, setup, summary, check paragraph and evidence render as before.
- Business frames changed only in beats 5 and 8. `regression/baseline-business` is re-captured with `--freeze`.

**Framing.** A business-writing assignment: two students work a case and email a client that the project slips three weeks, to the firm's standard.
- The standard belongs to the case, so the answers stay "The firm's standard."
- The setup says the course allows AI and both students say they used it. The picture's "Revised with AI" carries that on screen.
- The setup and the first evidence paragraph note the sample: the study surveyed people at work and included no students.

**Words that differ from workplace** (classroom / high school):

| Where | Classroom | High school |
| --- | --- | --- |
| Setup | "Suppose two students in a business-writing seminar work a case: an email telling a client their project will slip three weeks, written to the firm's standard. The seminar allows AI, and both say they used it. … The study surveyed people at work; it included no students. The students, their AI, the email and the firm's standard are constructed." | "…business-writing class… The class allows AI…" |
| Meta description | "Two students improve the same client email for a business-writing assignment, with the same AI notes. Asking what each turned down, and why, shows who decided." | same |
| Caption 1 | "A student's assignment: a client email, to the firm's standard. We'll track three decisions." (14 words, as workplace) | same |
| Caption 8 | "Faculty ask each student two questions, with only the emails to go on." | "The teacher asks each student two questions, …" |
| Caption 9 / check | "Faculty check: What did the AI decide for them? Ask: whose standard? What did you turn down, and why?" | "Teacher's check: …" |
| Picture | THE STUDENT DECIDES, First/Second student, FACULTY ASK | THE TEACHER ASKS; the rest as classroom |
| Evidence 1 | "…Everyone surveyed was at work, and the study included no students. The students in this figure are constructed." | same |
| Summary | "A red dot stands for a student in a business-writing seminar, improving a draft email for a case… The seminar allows AI, and the students say they used it." | "…class…" |

**Switch:** "See this with: Workplace · Classroom · PME". Classroom is `data-edition-link="business" data-cast-link="classroom"`. `aria-current` marks Classroom in both classroom casts, and on a high-school page the link keeps `cast=high-school`.

**Pace** (captions: words ÷ 3 + 1.5 s and 2× reading, business clock). Every caption passes in all three casts.

| Beat | Length (s) | Workplace | Classroom | High school |
| --- | --- | --- | --- | --- |
| 1 | 9.5 | 14 | 14 | 14 |
| 2 | 11.3 | 15 | 15 | 15 |
| 3 | 12.1 | 10 | 10 | 10 |
| 4 | 8.7 | 13 | 13 | 13 |
| 5 | 7.3 | 10 | 10 | 10 |
| 6 | 11.4 | 10 | 10 | 10 |
| 7 | 10.2 | 14 | 14 | 14 |
| 8 | 14.9 | 14 | 13 | 14 |

Picture text is the same in every cast, except the role words, which are the same length or shorter.

**Checks** (classroom and high school, at 1440 × 900, 1366 × 657, 1280 × 720 and 390 × 844).
- The drawn picture shows at 1440, 1366 × 657 and 1280 × 720. The smallest text is 14.1, 11.1 and 12.6 px.
- At 390 the stacked stage is used, and the player is 839 px.
- The controls hold still, there is no overflow and there are no console errors.
- The reduced view and the beat list are complete.
- The voice check passes on the new copy.
- `regression/baseline-business-classroom` and `-high-school` are captured with `--freeze`.
- Stills are in `shots/business-classroom/` and `shots/business-high-school/`; previews aren't exported.
