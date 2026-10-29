# Motion figures: status and decisions for Jack

Updated October 28, 2026. Open [index.html](index.html) to play the figures, or [the book](book-v1/four-moves-book.html) to read them in place. Each figure has its storyboard and test reports beside it.

## Where it stands

- **Done (8 of 8, military-education editions):** frame capture, fluency substitution, premature synthesis, uncalibrated reliance, invisible delegation, institutional monoculture, responsibility laundering, appropriate reliance. Each passed two storyboard cold reads and two figure cold reads; a separate verifier checked the final fixes. All eight are switched on in the book.
- **Nameplate (added October 28):** every figure opens on its failure mode's name, keeps it in the corner throughout, and closes with the name and a role-neutral definition above the check ([NAMEPLATE-DEFINITIONS.md](NAMEPLATE-DEFINITIONS.md)). It's verified on all eight ([NAMEPLATE-VERIFY.md](NAMEPLATE-VERIFY.md)).
- **Appropriate reliance** is interactive: it opens on a live question, gives you one check to spend, and locks every answer until you make your call.
- **Consistency:** a cross-figure review matched all figures on posters, red "First student" and "Second student" labels, a stacked text view whenever labels would fall under 11px, fixed control heights on phones, and reading pace (every caption at 3 words per second plus a 1.5-second hold). See [CONSISTENCY.md](CONSISTENCY.md).
- **Running times:** 86–96 seconds; appropriate reliance runs about 79–118 seconds depending on choices.

## Also ready to read

- **The four-moves book** (`book-v1/`): cover, contents, one chapter per move, each failure mode on its own spread with the figure playing over the book.
- **Next stage:** [INTEGRATION-PLAN.md](INTEGRATION-PLAN.md). Real paths per figure, the runtime in the site build, and ten small PRs into judgmentlab.net.
- ***Judgment at Work*, first draft:** in the companion repo, `essays/business.md` on the `business-lens` branch. Marked DRAFT; three voice judgment checks are flagged for you.
- **The consulting study, corrected:** [BCG-VERIFY.md](BCG-VERIFY.md) checked the task details against the working paper; companion PR #12 corrected the source spine. It goes live with the next site release.

## Decisions waiting for you

1. **The faculty checks.** In every figure, both students could answer the site's verbatim check the same way, so each figure shows the separating question directly under it, at the same size. Keep the checks as they are with these follow-ups, or revise them.
2. **The colour rule:** grey is AI-supplied, red is a person's decision or own work, navy is the page's ink.
3. **Standalone pages:** real paths per figure (recommended in the integration plan) or hash routes.
4. **The book mapping** of failure modes to moves (provisional).
5. **Length:** 86–96 seconds each. Right for teaching?
6. **A general edition:** five figures use PME examples. Make one broadly understandable edition (keeping the PME versions for the essay) rather than four per-domain versions? A pilot on frame capture is ready to start on your go.
7. **Appropriate reliance opens on a live question** rather than autoplaying like the others, so the reader makes the call first.
8. **Institutional monoculture is flat, not 3D.** Faculty read across a seminar rather than rotate it; the testers read the line-up clearly.

## Business editions (October 28–29)

Every figure now has two editions: **Military education** (the essay's examples, frame-for-frame as you approved them) and **Business** (a workplace example grounded in a real study, with analysts and a manager). Open a figure and use "See this with: Workplace · Military education", or the Business links on the [review page](index.html).

| Figure | Business example (source) | Status |
| --- | --- | --- |
| Frame capture | Health-system care program; the check reveals sicker patients at the same predicted cost (Obermeyer et al., 2019) | Done: two cold reads, verified |
| Fluency substitution | Patent firm associates; an older patent covers the draft's fallback (Autor et al., 2026) | Done: two cold reads, verified |
| Premature synthesis | Product engineers; conceptual questions versus delegation (Shen & Tamkin, 2026) | Done: two cold reads, verified |
| Uncalibrated reliance | Nairobi print shop owners; advice that turns on records the AI never saw (Otis et al., 2026) | Done: two cold reads, verified |
| Invisible delegation | Bad-news client email; the firm's standard (Lee et al., 2025) | Done: two cold reads, verified |
| Institutional monoculture | Ten analysts answer a low-cost rival with one frame (trendslop research; Bottesch, 2025) | Done: two cold reads, verified |
| Responsibility laundering | Support chatbot go-live; related case *Moffatt v. Air Canada* (2024) | Done: two cold reads, verified |
| Appropriate reliance | The BCG consulting tasks (Dell'Acqua et al., 2023) | Done: two cold reads, verified across 9 paths; no answer reaches readers or the accessibility tree before a call |

What the cold reads caught along the way: two figures contradicted their study (the cost frame in frame capture, and the engineer's workflow in premature synthesis), plus straw men, second differences between the two people, and overstated sources. All were fixed. Every business edition's sources were checked against the paper or decision; the remaining limits are noted on each page.

**Also done:** the shared player now waits for a slow edition rather than swapping it, survives a missing data file, and shows a notice without JavaScript. The integration plan requires pre-rendering each edition and making business the default on standalone pages, per your decision. The switch reads "Military education" rather than "PME", because business testers didn't know the acronym; revert if you prefer.

## Classroom cast (in progress, October 29)

You said to build the classroom cast after business, so it's underway. [CLASSROOM-PLAN.md](CLASSROOM-PLAN.md) has the full plan.
- **What it is:** the business scenarios worked by students as a class case, with faculty (higher ed) or a teacher (high school) as reviewer.
- **What it takes:**
  - Seven figures need only role words and a few framing lines.
  - Uncalibrated reliance needs a real change: the shop's records become an exhibit in the case packet every student gets.
  - Nothing is skipped.
- **Order:**
  1. The mechanism is being built now. Gate: every existing edition stays identical frame for frame.
  2. Frame capture follows as the pilot, built on the plan's recommended defaults.
  3. **It stops for you after the pilot,** before the other seven.

**The pilot is ready for your review.** Frame capture in three versions:
- [higher ed](figures/frame-capture/index.html?edition=business&cast=classroom): students and faculty;
- [high school](figures/frame-capture/index.html?edition=business&cast=high-school): students and the teacher, with a boxed "For teachers" note on the race finding;
- [workplace](figures/frame-capture/index.html?edition=business), for comparison.

Where it stands:
- **Reads:** a light read by an educator found the point lands in both classroom versions, with no workplace wording and nothing that reads as "don't use AI". Its fixes are in.
- **No regressions:** the workplace and military-education editions are unchanged frame for frame.
- **The switch** reads "Workplace · Classroom · Military education". High school is a variant of Classroom, reached through the K–12 setting.
- **Previews:** the classroom preview video is stale, because the machine ran low on memory during export. The stills are current.

Decisions, each with a recommendation in the plan:
1. Overrides on the business edition, or a separate classroom file per figure.
2. A high-school cast ("the teacher") beside higher ed's "faculty".
3. The business checks under "Faculty check", or the site's verbatim checks.
4. The switch: "Workplace · Classroom · Military education", with high school reached through the K–12 setting.
5. The race line in frame capture for high school: on screen with a teacher note.
6. Uncalibrated reliance as a case packet, or skip its classroom version.
7. Fluency substitution (patent law) for high school only if its read passes.

## Editions: decisions for Jack (added October 28, evening)

The business editions are in progress: every figure's words now live in data files, PME is unchanged frame for frame, and each business edition goes through two cold reads. These came up along the way:

1. **Race in frame capture's business edition.** The study's finding is racial: at the same predicted cost, Black patients were sicker than White patients. The final-frame source line now says so in the paper's terms rather than leaving it only in the page text. Keep it, or move it back to the page?
2. **"Agency" in responsibility laundering's definition** ("The model’s recommendation makes agency feel shared, or easier to defend.") A business tester found "agency" ambiguous (it can mean a company or a government body). An option: "makes ownership of the decision feel shared, or easier to defend." The definition is universal across editions, so it's your call.
3. **Role words per example.** Several business examples need their own roles (engineer and tech lead; associate and partner; owner and mentor). They're written into each business edition for now. The classroom cast will need a per-edition override; it gets built at that step.
4. **Workplace check wording** for each figure is in its `storyboard-business.md`.
6. **Responsibility laundering's split dot (PME).** After the split, the first student's dot stays half-size and the "Answerable" weight lands on it, which a business tester read as "half the responsibility went to the AI", the illusion the figure argues against. The business edition now restores the dot to full size as the weight lands. PME has the same reading; applying the fix there changes an approved figure, so it waits for your go.
7. **Invisible delegation's stacked view (PME).** In the stacked layouts, only the second student's read of the rubric stays underlined to the end, which a tester read as a second difference between them. The business edition now underlines it only while either person reads it. PME has the same asymmetry; fixing it there waits for your go.
8. **A PME polish pass (one decision for items 5–7 and these).** The business verifiers were stricter than the original loop and found small issues that the PME editions share. Each is fixed in business only, so PME stays frame-for-frame as you approved it:
   - premature synthesis: the "Second engineer" dot label is up 0.7 s (needs 2.2 s);
   - fluency substitution at 390: "Suppose it matches…" is up 2.1 s (needs 4.8 s).
   - frame capture, beat 3: the switch from "need" to "cost" overlaps text briefly for about 2 s. This is in the shared motion, so every edition has it; the classroom caption now names the change.
   One short pass could apply the same fixes to PME, re-verified frame by frame.
5. **PME at laptop size.** Some PME figures (e.g. premature synthesis) switch to the text-only stacked view at 1280×720, a common laptop size. The business editions were reworked to show the picture there. Applying the same fix to PME changes approved figures, so it waits for your go.

## Not part of the figures, still waiting

- **The open-call sign-up page** is reviewed and ready. It needs the updated script published (Deploy, then Manage deployments, then the pencil, then New version), then the inbox test and a release.
- **The workplace-evidence correction** (companion PR #12) and the sign-up page can go out in one site release.

## Companion source-spine follow-ups (from the business-edition paper checks)

To land as one companion PR once the editions settle:
- **Correct** Shen & Tamkin (2026): "52 mostly junior engineers" is wrong; the paper's Table 1 shows 29 of 52 had 7+ years of experience. The study's assistant was GPT-4o.
- **Add** the verified figures the editions use: Obermeyer et al. (2019) abstract (17.7% to 46.5%), Lee et al. (2025) (319 knowledge workers, 936 examples), Otis et al. (2026) published figures, Autor et al. (2026) (91 of 133 lawyers redlined; split among juniors only), Bottesch (2025), and *Moffatt v. Air Canada* (2024).
