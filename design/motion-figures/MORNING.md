# Motion figures: status and decisions for Jack

Updated October 28, 2026. Open [index.html](index.html) to play the figures, or [the book](book-v1/four-moves-book.html) to read them in place. Each figure has its storyboard and test reports beside it.

## Where it stands

- **Done (8 of 8):** frame capture, fluency substitution, premature synthesis, uncalibrated reliance, invisible delegation, institutional monoculture, responsibility laundering, appropriate reliance. Each passed two storyboard cold reads and two figure cold reads; a separate verifier checked the final fixes. All eight are switched on in the book.
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

## Editions: decisions for Jack (added October 28, evening)

The business editions are in progress: every figure's words now live in data files, PME is unchanged frame for frame, and each business edition goes through two cold reads. These came up along the way:

1. **Race in frame capture's business edition.** The study's finding is racial: at the same predicted cost, Black patients were sicker than White patients. The final-frame source line now says so in the paper's terms rather than leaving it only in the page text. Keep it, or move it back to the page?
2. **"Agency" in responsibility laundering's definition** ("The model’s recommendation makes agency feel shared, or easier to defend.") A business tester found "agency" ambiguous (it can mean a company or a government body). An option: "makes ownership of the decision feel shared, or easier to defend." The definition is universal across editions, so it's your call.
3. **Role words per example.** Several business examples need their own roles (engineer and tech lead; associate and partner; owner and mentor). They're written into each business edition for now. The classroom cast will need a per-edition override; it gets built at that step.
4. **Workplace check wording** for each figure is in its `storyboard-business.md`.
5. **PME at laptop size.** Some PME figures (e.g. premature synthesis) switch to the text-only stacked view at 1280×720, a common laptop size. The business editions were reworked to show the picture there. Applying the same fix to PME changes approved figures, so it waits for your go.

## Not part of the figures, still waiting

- **The open-call sign-up page** is reviewed and ready. It needs the updated script published (Deploy, then Manage deployments, then the pencil, then New version), then the inbox test and a release.
- **The workplace-evidence correction** (companion PR #12) and the sign-up page can go out in one site release.

## Companion source-spine follow-ups (from the business-edition paper checks)

To land as one companion PR once the editions settle:
- **Correct** Shen & Tamkin (2026): "52 mostly junior engineers" is wrong; the paper's Table 1 shows 29 of 52 had 7+ years of experience. The study's assistant was GPT-4o.
- **Add** the verified figures the editions use: Obermeyer et al. (2019) abstract (17.7% to 46.5%), Lee et al. (2025) (319 knowledge workers, 936 examples), Otis et al. (2026) published figures, Autor et al. (2026) (91 of 133 lawyers redlined; split among juniors only), Bottesch (2025), and *Moffatt v. Air Canada* (2024).
