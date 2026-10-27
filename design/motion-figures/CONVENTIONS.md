# Motion figure conventions

Shared visual vocabulary for the eight figures. The first figures settle these; later figures reuse them. Each entry says which figure introduced it. "FC" is frame capture (figure 1).

## Colour and marks

- **Colour grammar** (FC, refining the reel's rule; accepted by the orchestrator and flagged for Jack).
  - Grey (`#5b564f`) is what the AI supplied.
  - Red (`#b81b2b`) is what a person decided, plus the labels that name that person.
  - Navy (`#0a2242`) is the page's ink: the task, labels, and words a person wrote with no decision attached.
  - Paper is `#f6f1e8`; cards and sheets are `#fffdfa`.
  - The reel said "grey and navy are machine work". The figures keep every machine element grey and use navy only as ink, so a change from AI to apparent authorship can be shown as grey turning to ink.
- **AI-supplied text sits on a grey-tinted band** (`#ded5c4`) (FC). A change from grey to ink then shows as a shape disappearing, not only as a hue change between two dark colours.
- **Red appears only for a person's decisions in the picture** (FC). Player chrome, the current-beat marker and the "FACULTY CHECK" label are navy. Red margin marks can read as a teacher's pen, so a red mark should be visibly made by its person (the dot draws it) and named by a red label in the final frame.
- **Dashed means nobody has taken it up; solid means someone did** (FC, from concepts-v0).
- **A frame is corner brackets joined by a hairline** (FC), with a mono tag naming whose frame it is ("AI'S FRAME"). The hairline closes the sides so "inside" is unambiguous. A frame a person chose would be red.
- **The red dot is the person** when there is one person (concepts-v0). Label it in words the first time it appears.
- **Nothing decorative** (FC). Every mark on the stage stands for something named in the storyboard's cast.
- **Constructed examples say so on screen** (FC): "EXAMPLE TASK".

## Camera

- **The camera is how close we stand** (FC). A push-in narrows what can be seen; a pull-back restores it.
- **The caption must say whose view it is** (FC). "Up close, it's all they see" makes the close view the student's; "Step back with us" makes the wide view ours. Without that, a pull-back reads as the person gaining distance.
- Moves are eased (`inOutStrong`), at most 2.5 s, one at a time, and removed under reduced motion.

## Type and size

- Source Serif 4 for captions and titles, Source Sans 3 for labels in the picture (15 units), and IBM Plex Mono for small labels (12 units, never smaller).
- **Stage:** an SVG with a 960 × 540 viewBox. On the standalone page the figure is up to 1,040 px wide, so 12-unit mono renders at 13 px at 1440.
- **Legibility rule** (FC). Picture text carries `data-fs` (its size in viewBox units). `MotionFigures.legibility()` hides any text that would render under 11 px and adds `.is-narrow` to the figure. The beat list then shows each beat's "On screen" line, and the caption band carries the words at full size. Shapes and motion stay.

## Pacing and captions

- **Beat rhythm** (FC, from PLAN.md):
  - The caption changes first, with a 0.3 s fade.
  - Nothing in the picture moves for the first 1.0 s.
  - Movements run one at a time.
  - A change the caption is about starts only after the caption can be read once (words ÷ 3 s).
  - At least 1.5 s of hold follows the last movement.
  - No beat is shorter than twice its caption's reading time.
  - A beat with no movement is allowed when the caption is the event (FC beat 9).
- **Length.** Figures run 30 to 75 s. FC is 74.8 s in 10 beats.
- **The setup beat names the situation before anything goes wrong.** The turn beat makes the mechanism visible. The figure ends on the faculty check.
- **Caption band** (FC). Captions are real text directly under the picture, inside the figure's shot area (`[data-mf-shot]`), so stills, video and the poster include them. A mono counter ("3 / 10") leads each caption.
- **The faculty check is the last caption** (FC). It is styled as the check: a mono "FACULTY CHECK" label over the question in large italic, verbatim from the site's Core Failure Modes table. The picture doesn't repeat it. A smaller follow-up line from the essay may appear after the check can be read once ("Then ask: …").
- **Captions name who does what.** No "X, not Y" openings, slogans or morals. Run the copy through `writing-as-jack`.

## Final frame, text equivalent, page

- **The final frame is the reduced-motion view, the print view and the poster.** The poster is the shot area (stage plus caption band). Design it first.
- **Text equivalent** (FC). The beat list is the captions, each with an "On screen" line describing the picture. The lines are always in the accessibility tree, and visible under reduced motion, in print and in narrow views. The SVG and caption band are `aria-hidden`; a visually hidden paragraph summarises the whole figure.
- **Standalone page** (FC), in this order:
  1. a kicker ("Failure mode 1 of 7");
  2. the title;
  3. a one-paragraph setup;
  4. the figure: shot area, controls (Play/Pause, Restart, scrubber, time) and the beat list;
  5. the faculty check, with the essay's follow-up;
  6. the essay passage;
  7. links to the book chapter, Practice (`judgmentlab.net/#companion`) and the essay section (`judgmentlab.net/#<section-slug>`).

## Runtime (`runtime/motion.js`, `runtime/figures.css`)

Created for FC from `concepts-v0/motion.js` and `figures.css`, and backward compatible with them: a v0 figure (toggle button plus beat grid) mounts unchanged.

- **A figure is `render(t)`,** a pure function of time. Captions and their fades are drawn from `t` too, so seeking gives identical frames for export.
- **`MotionFigures.mount(root, {duration, render, beats})`.** Each beat is `{at, text, list?, detail?, check?}`. `check` is `{label, question, followLabel?, follow?, followAt?}`.
- **Optional hooks inside the root:**
  - `[data-mf-toggle]` (Play/Pause/Replay);
  - `[data-mf-replay]` (Restart);
  - `[data-mf-scrub]` (range input; keyboard accessible, with `aria-valuetext`);
  - `[data-mf-time]`;
  - `[data-mf-caption]`;
  - `[data-mf-beats].is-list` (vertical list with "On screen" details).
- **Helpers added:**
  - `bracketPath(rect, arm)`;
  - `pathAt(segs, start)` for a mark's piecewise path;
  - `legibility(root, svg, viewWidth, minPx)`.
- **Behaviour:**
  - The figure plays once at 60% visibility; `data-mf-autoplay="off"` disables this.
  - Reduced motion (`prefers-reduced-motion` or `?reduced`) shows the final frame, and beat clicks jump between settled stills.
  - `?t=12.5` holds a moment.
  - Printing draws the final frame.
  - `window.__motionFigures[id]` exposes `seek`, `settle(i)`, `beats` and `duration` for scripts.

## Scripts (`scripts/`)

Serve `motion-figures/` with `python3 -m http.server 5291 --bind 127.0.0.1`. Don't use ports 5180, 5187 or 5199.

- `node scripts/figure-shots.mjs <slug> [port]` does three things:
  - writes a still per beat (at its settled moment) and the final frame to `figures/<slug>/shots/`, plus reduced-motion and 390/768 px pages;
  - checks overflow, reduced motion, keyboard access and the smallest rendered text;
  - reports console errors.
- `node scripts/figure-export.mjs <slug> [port] [fps]` renders the shot area frame by frame through `seek` into `shots/<slug>.mp4`, `.webm` and `.gif`. It uses the showreel's Remotion ffmpeg read-only.
