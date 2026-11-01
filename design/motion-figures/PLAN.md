# Motion figures: plan

October 27, 2026. Jack's direction: the eight motion concepts all work, but they run too fast to teach. Each needs a scripted, thick storyboard whose beats make it evident what is happening on screen. Each figure lives inside the four-moves book and also stands alone on its own linkable page, because Jack may write one article per failure mode. Loop each figure until it's done, one at a time, all eight, ready for review on the morning of October 28.

## The eight figures, in loop order

Essay order for the seven failure modes, then appropriate reliance, which closes on what good looks like. The faculty checks are verbatim from the site's Core Failure Modes table.

| # | Figure | Slug | What goes wrong | Faculty check | Book chapter (provisional) |
| --- | --- | --- | --- | --- | --- |
| 1 | Frame capture | `frame-capture` | The first plausible frame becomes the student's frame. | What problem did the student choose to solve? | Frame the problem |
| 2 | Fluency substitution | `fluency-substitution` | Polished analysis stands in for owned reasoning. | Can the student independently explain the judgment in plain speech? | Own the decision |
| 3 | Premature synthesis | `premature-synthesis` | The model connects material before the student has built the map. | Can the student explain why these connections matter? | Refuse the garden path |
| 4 | Uncalibrated reliance | `uncalibrated-reliance` | The student accepts confident output without knowing whether the task fits the tool. | What evidence justified relying on the system here? | Calibrate the tool |
| 5 | Invisible delegation | `invisible-delegation` | A request for help transfers criteria, structure, or meaning. | What did the AI decide for the student? | Frame the problem |
| 6 | Institutional monoculture | `institutional-monoculture` | Shared systems and defaults narrow the range of frames available to the class. | What frames are missing across the seminar? | Refuse the garden path |
| 7 | Responsibility laundering | `responsibility-laundering` | The model's recommendation makes agency feel distributed or easier to defend. | Who owns the recommendation if it proves wrong? | Own the decision |
| 8 | Appropriate reliance | `appropriate-reliance` | (The competency.) Accept support when it's warranted, refuse or verify it when it's not, and give an account of the difference. | What evidence justified relying on the system here, and what would have changed the call? | Calibrate the tool |

The chapter mapping is the book proposal's editorial reading (`book-v0/proposal.md`), and Jack hasn't confirmed it yet. It decides only where a figure sits in the book.

## The loop for each figure

1. **Thick storyboard.** The author agent writes `figures/<slug>/storyboard.md` to [AUTHOR_BRIEF.md](AUTHOR_BRIEF.md). It covers every beat with timing, everything on screen and how it moves, the exact caption, what the viewer should notice, and why.
2. **Storyboard cold read.** A separate tester reads the storyboard with its intent section removed, following [COLD_READ.md](COLD_READ.md), and says back what happens and what it means. The orchestrator grades the read against the intent.
   - **Pass:** the tester states the point in substance, identifies the faculty check, flags no beat as confusing or too fast, and finds nothing that distorts the essay.
   - **Fail:** findings go back to the author. At most three rounds, then unresolved issues are flagged for Jack.
3. **Build to the storyboard.** The author agent rebuilds the figure at teaching pace as a standalone page, `figures/<slug>/index.html`, on the shared runtime.
4. **Figure cold read.** A fresh tester runs the page itself, at full speed and frame by frame, with no storyboard, and says back the point. Mechanical checks run at the same time:
   - pacing math;
   - the reduced-motion final frame;
   - 390px width;
   - keyboard access to the player;
   - every number against the sources.
   Same pass rule and round limit as step 2.
5. **Record and commit.** The final storyboard, both test reports, the page, stills and a preview video are committed on this branch and pushed. Then the next figure starts.

Conventions the first figures settle go into [CONVENTIONS.md](CONVENTIONS.md), so later figures reuse the same visual vocabulary.

**Time bound** (added after figure 1, which took about three hours, mostly building the shared runtime):
- **Storyboard:** up to two cold reads. After the second, concrete caption-level fixes pass without another read and go to the build.
- **Figure:** up to two cold reads. Final fixes after the second are verified by the orchestrator from the stills.
- **Overlap:** the next figure's storyboard starts once the previous figure's storyboard has passed and its build begins (tightened from "during final fixes" at figure 3, so all eight can be ready by morning). Each figure's own loop stays in order, and its lessons go into the next author's brief.

**Status:** figure 1 (frame capture) done October 27, after two storyboard reads, two figure reads and final fixes checked from the stills.
Figure 2 (fluency substitution) done October 27: two storyboard reads, two figure reads, final fixes checked from the stills.
Figure 3 (premature synthesis) done October 28: two storyboard reads, two figure reads, final fixes checked from the stills. Its author also fixed the shared runtime: the player fits the viewport, autoplay waits until the caption band and controls are visible, and arrow keys step 1 second.
Figure 4 (uncalibrated reliance) done October 28: two storyboard reads, two figure reads, final fixes checked by a verifier agent (91 seconds after a trim from 113).
Figure 5 (invisible delegation) done October 28: two storyboard reads, two figure reads, final fixes checked by a verifier agent (90 seconds after a trim from 102).
Figure 7 (responsibility laundering) done October 28: two storyboard reads, two figure reads, final fixes checked by verifier agents (93 seconds).
Figure 6 (institutional monoculture) done October 28: two storyboard reads, two figure reads, final fixes checked by verifier agents (96 seconds; flat, not 3D).
Figure 8 (appropriate reliance) done October 28: two storyboard reads, two figure reads, final fixes checked by verifier agents. Interactive: opens on a live question, a one-check budget, answers locked until each call (79–118 seconds depending on choices). All eight figures done.

## Standalone pages

Each figure page works on its own:
- a title and a one-paragraph setup;
- the figure, with a play/pause/replay button and a scrubber;
- the beat list as captions and text equivalent;
- the faculty check;
- the essay passage it comes from;
- links to its book chapter, the Practice lab and the essay section.

For the site, the recommendation is a real path per figure, such as `judgmentlab.net/failure-modes/frame-capture/` and `/appropriate-reliance/`, so articles can link to them and social cards can show a poster frame. The site is a single page with hash routes today, so this is a build change. Jack decides.

## The book

The book's chapters are the four moves. Each move's spread is followed by the spreads for its failure modes, each hosting its figure, and appropriate reliance sits in Calibrate the tool. Figures play on the page; the page-turn layer stays the book prototype's. **Stretch for tonight:** once all eight figures pass, assemble `book-v1/` with the figures on their spreads.

## Morning deliverables

- `index.html`: one page linking all eight standalone figures, their storyboards and test reports, and the book if it was assembled.
- Each figure: final storyboard, cold-read reports, page, stills and preview video.
- A short morning note: what passed, what was flagged, and the decisions waiting for Jack.

## After Jack's review

The figures runtime, the standalone pages and the book go into the site through the PR pipeline, likely in this order: runtime and pages; essay and Practice placement; the book.

## Decisions waiting for Jack

1. Real paths per figure, or hash routes?
2. Confirm the move-to-failure-mode mapping.
3. On-screen captions only, or a voiceover track later?
4. The open questions in `concepts-v0/proposal.md` §10 and `book-v0/proposal.md`.
