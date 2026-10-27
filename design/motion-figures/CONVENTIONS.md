# Motion figure conventions

Shared visual vocabulary for the eight figures. The first figures settle these; later figures reuse them. Each entry says which figure introduced it. "FC" is frame capture (figure 1); "FS" is fluency substitution (figure 2); "PS" is premature synthesis (figure 3).

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
- **Show, don't tell, the contrast** (FC). If a caption describes a second person's process, the picture shows it: a second red dot doing the work, one movement at a time.
- **What a product rests on sits behind it** (FC). A person's reasoning can be drawn as a strip clipped to the area below the paper. It slides up behind the paper to hide and down to reveal, so asking visibly brings it out.
- **Key a colour on screen before it changes** (FC). A small key ("AI-SUPPLIED" with a tinted swatch) points at the tint before the wipe drains it. Show the change centre stage and large.
- **Contrasts are about ownership, not tool use** (FC). A contrasting person who does it right also works with AI: the AI proposes to them too (grey), and their frame turns red only after they examine the alternatives.
- **Origin changes keep the content** (FC). When AI-supplied text becomes indistinguishable, the words stay and only the grey band and colour drain to ink. Blank boxes read as deletion.
- **Drain only when invisibility is the point** (FS). FC drains the AI's grey because its point is that the origin vanishes from the product. When origin isn't hidden, the AI's words stay grey to the end, so nothing reads as hiding authorship.
- **A disclosure tag** (FS). A product made with AI carries a grey mono "DRAFTED WITH AI" tag through the final frame. It shows the AI's part without making disclosure the question.
- **Set aside is a dim of the sheet, not the words** (FS). When faculty ask without the paper, the sheet fades into the page and the grey bands lighten to 55%; the words stay at full strength (5.6:1). An 80% opacity dim of the whole paper drops grey-on-band text to 3.6:1.
- **Set aside can be a move** (PS). When "papers aside" must read as the papers being out of reach, they shrink to 56% and slide out of the people's rows into a strip, slightly tilted. Paths don't cross (the lower paper travels sideways before it rises), and labels fade out and back in rather than sliding across each other. Small text inside the papers fades as they shrink; the titles stay (Serif 19, still 11.5 px at 1,040).
- **Same argument, own words** (PS). Two papers that must be indistinguishable without looking copied share a title, citations and disclosure, differ in line lengths, and carry a label saying "SAME ARGUMENT, OWN WORDS". A qualifier the better student learned can sit in their paper as one line, with no caption on it.
- **A source lights up when someone repeats it** (FS), but only where repeating it is the failure, and only after the difference is audible. The band behind the repeated words returns to full strength and a navy underline runs under them, then both fade.
- **A speech panel is what a person says without the paper** (FS). A rounded paper-bright box with the words in quotation marks. Both people's answers arrive at the same speaking pace.
- **Show what faculty hear before showing origin** (FS). Spoken answers arrive in plain ink, because colours are invisible in the room. Origin colours (grey band for the AI's words, red for a person's own) come back only after the difference faculty can hear has landed, as part of the turn.
- **What faculty observe stays ink for everyone** (PS). Sketches and spoken answers are ink for both people to the end, and the difference is in what they say. Process colour (grey AI lines, red own lines) lives only on the students' side.
- **A connection is a line between two cards** (PS). Dashed grey: the AI proposed it and nobody has taken it up. Solid grey: a person took it up as given. Red: a person drew it, or checked it against the sources before keeping it. Lines run centre to centre under the cards, so only the gaps show.
- **A card opens when someone reads it closely** (PS). It grows and shows two ink note bars, and closes when that reader leaves. Two people who read equally closely get the same motion at the same pace, so reading depth can't be mistaken for the difference.
- **A connection that doesn't hold** (PS) gets a red ✕ at its middle and retracts. The ✕ stays at half strength while that map is on screen, so a later absence (the AI drew nothing there) can be pointed at: the ✕ brightens once.
- **What a person learns is a red italic note with no card** (PS). It appears where they learned it and returns, labelled "WHAT THEY LEARNED", when they use it. No card, so it reads as memory and not as notes brought to an oral check.
- **Faculty pointing** (PS) is a navy ring drawn around one line, which thickens while the others dim to 40%.

## Camera

- **The camera is how close we stand** (FC). A push-in narrows what can be seen; a pull-back restores it.
- **The caption must say whose view it is** (FC). "Up close, it's all they see" makes the close view the student's; "Step back with us" makes the wide view ours. Without that, a pull-back reads as the person gaining distance.
- **A pan changes which side we look at** (FC). The world can be two panels wide, the person's side and the faculty side. The view pans across while following the thing that travels (FC: the paper). Elements that belong to the viewer, such as the task card, stay put on screen during the pan.
- Moves are eased (`inOutStrong`), at most 2.5 s, one at a time, and removed under reduced motion.

## Type and size

- Source Serif 4 for captions and titles, Source Sans 3 for labels in the picture (15 units), and IBM Plex Mono for small labels (12 units, never smaller).
- **Stage:** an SVG with a 960 × 540 viewBox. On the standalone page the figure is up to 1,040 px wide, so 12-unit mono renders at 13 px at 1440.
- **Narrow stacked stage** (FS). When the words are the figure's content, below 480 px the SVG can give way to a stacked HTML text view of the current beat, driven by the same `render(t)`, with text at 13–16 px. Collapse the SVG (`height: 0; overflow: hidden`) rather than `display: none`, so its text can still be measured.
- **Legibility rule** (FC). Picture text carries `data-fs` (its size in viewBox units). `MotionFigures.legibility()` hides any text that would render under 11 px and adds `.is-narrow` to the figure. The beat list then shows each beat's "On screen" line, and the caption band carries the words at full size. Shapes and motion stay.
- **Real words when the words are the point** (FS). FC draws writing as bars. When the failure lives in the wording (fluency), set the real sentences: Serif 20 while they're read, no smaller than 12.4 units once settled, with fixed line breaks if two copies must match line for line.

## Pacing and captions

- **Beat rhythm** (FC, from PLAN.md):
  - The caption changes first, with a 0.3 s fade.
  - Nothing in the picture moves for the first 1.0 s.
  - Movements run one at a time.
  - A change the caption is about starts only after the caption can be read once (words ÷ 3 s).
  - At least 1.5 s of hold follows the last movement.
  - No beat is shorter than twice its caption's reading time.
  - A beat with no movement is allowed when the caption is the event (FC beat 9).
- **Length.** Figures run 30 to about 90 s. FC is 85.6 s in 11 beats; FS is 88.6 s in 9 beats; PS is 90.0 s in 10 beats.
- **Speech pace** (PS). Spoken words appear at about 3 words a second and hold at least 1.5 s after the last word. Both people speak at the same pace.
- **Labels arrive with their beat** (FC). A label that says what something is appears by the time that thing settles, never late in the beat.
- **The setup beat names the situation before anything goes wrong.** The turn beat makes the mechanism visible. The figure ends on the faculty check.
- **Caption band** (FC). Captions are real text directly under the picture, inside the figure's shot area (`[data-mf-shot]`), so stills, video and the poster include them. A mono counter ("3 / 11") leads each caption. On desktop the band has a fixed minimum height (136 px) sized for the check, so the controls never jump.
- **The faculty check is the last caption** (FC). It is styled as the check: a mono "FACULTY CHECK" label over the question in large italic, verbatim from the site's Core Failure Modes table. The picture doesn't repeat it. When the check alone can't separate the cases the figure shows, the separating question sits directly under it at the same size (FC: "Why this frame? What would change it?"). It appears after the check can be read once (`check.follow` with no `followLabel`).
- **Captions name who does what.** No "X, not Y" openings, slogans or morals. Run the copy through `writing-as-jack`.

## Final frame, text equivalent, page

- **The final frame is the reduced-motion view, the print view and the poster.** The poster is the shot area (stage plus caption band). Design it first.
- **A comparison can end as a table** (FS). Rows are steps (their own work, what faculty receive, each question); columns are people, each headed by their red dot and name. Each item appears large first, then settles into its cell, so the final frame reads top to bottom on its own.
- **Order as a sequence label** (PS). When the difference between two people is the order they worked in, each row carries a compact mono sequence ("READ → AI CONNECTS → WRITES", "READ → TRIES → AI CHECKS → WRITES"), AI steps in grey and the person's decisive step in red, so the final frame carries the cause as well as the test.
- **Hide empty boxes on narrow screens** (PS). A speech panel or note hides with its words when the legibility rule hides them, so phones show no empty boxes.
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
