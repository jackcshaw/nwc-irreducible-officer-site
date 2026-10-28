# Motion figures: status and decisions for Jack

Updated October 28, 2026. Open [index.html](index.html) to play the figures, or [the book](book-v1/four-moves-book.html) to read them in place. Each figure has its storyboard and test reports beside it.

## Where it stands

- **Done (8 of 8):** frame capture, fluency substitution, premature synthesis, uncalibrated reliance, invisible delegation, institutional monoculture, responsibility laundering, appropriate reliance. Each passed two storyboard cold reads and two figure cold reads; a separate verifier checked the final fixes. All seven are switched on in the book.
- **Appropriate reliance** is interactive: it opens on a live question, gives you one check to spend, and locks every answer until you make your call.
- **Consistency:** a cross-figure review matched all figures on posters, red "First student" and "Second student" labels, a stacked text view whenever labels would fall under 11px, fixed control heights on phones, and reading pace (every caption at 3 words per second plus a 1.5-second hold). See [CONSISTENCY.md](CONSISTENCY.md).
- **Running times:** 86–96 seconds; appropriate reliance runs about 79–115 seconds depending on choices.

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

## Not part of the figures, still waiting

- **The open-call sign-up page** is reviewed and ready. It needs the updated script published (Deploy, then Manage deployments, then the pencil, then New version), then the inbox test and a release.
- **The workplace-evidence correction** (companion PR #12) and the sign-up page can go out in one site release.
