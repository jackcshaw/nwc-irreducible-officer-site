/* Fluency substitution: motion figure 2 of 8. Built to storyboard.md (round 3,
   revised after figure cold reads 1 and 2).
   Grey is what the AI wrote, red is a student's own work, navy is ink.
   The picture builds toward a table: a label column on the left, one column
   per student, and four rows (their own work, what faculty receive, the first
   question, the changed fact). The students' answers arrive in plain ink, as
   faculty hear them; their origin colours come back only after the changed fact.
   When picture text would render under 11 px, the SVG gives way to a stacked text
   stage (renderNarrow), so the words stay readable. Every attribute is a pure
   function of t, so the runtime can play, scrub, hold (?t=) and export it frame by
   frame.

   Editions: every visible word comes from editions/<id>.json (default pme) and
   ../../casts.json (role words), loaded by MotionFigures.loadEdition (?edition=,
   ?cast=). This file keeps only the core: timeline, layout and colour grammar,
   plus the nameplate, which is the same in every edition. See CONVENTIONS.md,
   Editions. */
(() => {
	const {mount, E, mix, prog, spring, el, set, pathAt, legibility, mixColor, FONT, loadEdition, fillPage, rich} = MotionFigures;
	const C = {paper: '#f6f1e8', bright: '#fffdfa', ink: '#0a2242', red: '#b81b2b', grey: '#5b564f', band: '#ded5c4'};
	const VW = 960;

	// ---- timeline (absolute seconds, from the storyboard) -------------------
	const T = {
		card: [1.0, 1.6], dotIn: 1.6,
		pulseA: [7.0, 7.4], sheetA: [7.4, 7.9], composeA: 8.0, line: 0.4, keyGrey: [8.0, 8.4],
		enterA: [15.7, 16.1], readA: 16.1, read: 0.6,
		strike: [19.8, 20.6], keyRed: [20.0, 20.4], lift: [20.8, 21.5], cutLabel: [21.5, 21.9], tagA: [21.6, 22.0],
		cellA: [24.5, 25.7], dotB: 25.8, noteIn: [26.3, 26.7], toNote: [26.8, 27.2], write: [27.3, 29.3], backB: [29.4, 29.8],
		noteUp: [33.0, 33.8], pulseB: [34.1, 34.4], sheetB: [34.4, 34.8], composeB: 34.9,
		toLineB: [37.0, 37.4], readB: 37.4, sweep: [40.5, 41.3], tagB: [41.4, 41.8],
		cellB: [44.4, 45.6], rowRecv: [45.7, 46.2], rowOwn: [45.7, 46.2],
		dim: [50.4, 51.0], q1: [51.2, 51.8], a1: [54.3, 55.6], b1: [55.8, 57.1],
		q2: [64.9, 65.5],
		a2: [71.4, 72.7], b2: [72.9, 74.2], reveal: [75.4, 76.2], bright: [75.4, 76.0], unbright: [78.0, 78.5],
		check: 81.4, follow: 84.9, source: [82.4, 82.9], // source: used only by editions that supply one
		end: 88.6,
	};

	// ---- geometry ----------------------------------------------------------
	const COL = {a: 252, b: 606, w: 338};
	// The paper, in its own units: 460 wide, Serif 20, fixed line breaks (the
	// edition's paper.lines) so both papers match line for line. Segment keys: s1
	// first sentence, ans the words the first person repeats, s2b the rest of the
	// call, cut the sentence the first person strikes (the first draft only).
	const P = {w: 460, padX: 22, base: 40, lh: 34, fs: 20, bottom: 18};
	const sheetH = (n) => P.base + (n - 1) * P.lh + P.bottom;
	const baseY = (i) => P.base + P.lh * i;
	const BIG = 0.85, SMALL = 0.62;
	const PA = {big: {x: 300, y: 212}, cell: {x: COL.a, y: 212}};
	const PB = {big: {x: 552, y: 212}, cell: {x: COL.b, y: 212}};
	const NOTE = {big: {x: COL.b, y: 212}, cell: {x: COL.b, y: 112}, w: 338, h: 118, s: 0.62, fs: 20, x: 16, base: [38, 66, 94]};
	const CUT_CARD = {x: COL.a, y: 140, fs: 15};
	const ROWS = {q1: {top: 350}, q2: {top: 428}};
	const PANEL = {h: 58, fs: 15, padX: 14, base: [24, 44]};
	// Where each answer sits; its words (segments: 'ai' the AI's, 'own' the person's
	// own) come from the edition's answers.
	const ANSWER_SLOTS = {a1: {col: 'a', row: 'q1'}, b1: {col: 'b', row: 'q1'}, a2: {col: 'a', row: 'q2'}, b2: {col: 'b', row: 'q2'}};
	// Beat start times (figure time); the words for each beat come from the edition.
	const BEAT_AT = [0, 6.0, 14.7, 23.5, 32.0, 43.4, 49.4, 63.9, 70.4, 81.4];
	const HEAD_Y = 88;
	const DOT_A = {start: {x: 120, y: 300}, head: {x: COL.a + 8, y: HEAD_Y}};
	const DOT_B = {head: {x: COL.b + 8, y: HEAD_Y}};

	const root = document.querySelector('#fluency-substitution');
	// The page's quote carries a link: [text](href), filled after fillPage's *em*.
	const fillQuote = (ed) => document.querySelectorAll('[data-fs-quote]').forEach((n) => {
		if (ed.page.quote) n.innerHTML = rich(ed.page.quote).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
	});
	// The page copy now arrives with the edition, so the faces the figure measures with
	// are loaded explicitly before it builds (static page text used to trigger them).
	const FACES = ['400 16px "Source Serif 4"', 'italic 400 16px "Source Serif 4"', '600 16px "Source Serif 4"',
		'400 16px "Source Sans 3"', '500 16px "Source Sans 3"', '600 16px "Source Sans 3"',
		'400 12px "IBM Plex Mono"', '500 12px "IBM Plex Mono"', '600 12px "IBM Plex Mono"'];
	Promise.all([loadEdition(root), document.fonts.ready, ...FACES.map((f) => document.fonts.load(f))])
		.then(([ed]) => { fillPage(document, ed); fillQuote(ed); build(ed); });

	function build(ed) {
	const L = ed.labels, NW = ed.narrow;
	// Optional (business): a larger smallest picture text and a compact caption band on
	// laptop windows (.fs-laptop), so the drawn picture holds at 1280 × 720 and 1366 × 657:
	// 13-unit text renders at 11 px or more there. Without it the smallest text is 12 units.
	const MIN_TEXT = (ed.picture && ed.picture.minText) || 12;
	const SM = Math.max(SMALL, MIN_TEXT / P.fs), NOTE_S = Math.max(NOTE.s, MIN_TEXT / NOTE.fs);
	root.classList.toggle('fs-laptop', !!(ed.picture && ed.picture.laptop));
	const LINES = ed.paper.lines;
	const ANSWERS = Object.fromEntries(Object.entries(ANSWER_SLOTS).map(([id, slot]) => [id, {...slot, lines: ed.answers[id]}]));
	const svg = root.querySelector('svg');
	const defs = el(svg, 'defs');
	el(svg, 'rect', {width: 960, height: 540, fill: C.paper});
	const stage = el(svg, 'g');

	const text = (parent, x, y, str, {fs, family = FONT.sans, weight = 400, fill = C.ink, anchor = 'start', ls = 0, style, dataFs} = {}) =>
		el(parent, 'text', {x, y, 'font-family': family, 'font-size': fs, 'font-weight': weight, fill, 'text-anchor': anchor, 'letter-spacing': ls, 'data-fs': dataFs ?? fs, ...(style ? {'font-style': style} : {})}, str);
	const mono = (parent, x, y, str, opts = {}) => text(parent, x, y, str, {fs: MIN_TEXT, family: FONT.mono, weight: 600, ls: 1.2, ...opts});
	const serif = (parent, x, y, str, opts = {}) => text(parent, x, y, str, {family: FONT.serif, ...opts});
	let clipN = 0;
	const clipGroup = (parent, rects) => {
		const id = `fs-clip-${clipN++}`;
		const cp = el(defs, 'clipPath', {id});
		const nodes = rects.map((r) => el(cp, 'rect', {...r, width: 0}));
		return {g: el(parent, 'g', {'clip-path': `url(#${id})`}), rects: nodes};
	};

	// ---- task card (label column, stays put) --------------------------------
	const card = el(stage, 'g');
	el(card, 'rect', {x: 16, y: 14, width: 220, height: 96, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.15});
	mono(card, 28, 34, ed.task.label);
	ed.task.lines.forEach((s, i) => serif(card, 28, 56 + 20 * i, s, {fs: 16}));

	// ---- row labels, key ------------------------------------------------------
	const rowOwn = el(stage, 'g');
	mono(rowOwn, 16, 140, L.rowOwn[0]);
	mono(rowOwn, 16, 156, L.rowOwn[1], {weight: 500});
	const rowRecv = mono(stage, 16, 236, L.rowRecv);
	const q1 = el(stage, 'g');
	mono(q1, 16, 362, L.q1.label);
	L.q1.lines.forEach((s, i) => serif(q1, 16, 383 + 20 * i, s, {fs: 16, style: 'italic'}));
	const q2 = el(stage, 'g');
	mono(q2, 16, 440, L.q2.label);
	L.q2.lines.forEach((s, i) => serif(q2, 16, 461 + 20 * i, s, {fs: 16, style: 'italic'}));
	// The key: its grey half arrives with the first AI text, its red half with the first red mark.
	const keyGrey = el(stage, 'g');
	el(keyGrey, 'rect', {x: COL.a, y: 513, width: 18, height: 12, rx: 2, fill: C.band, stroke: C.grey, 'stroke-width': 1});
	mono(keyGrey, COL.a + 26, 524, L.keyAI, {fill: C.grey});
	// Optional (business): a one-line source under the final frame, right of the key.
	const sourceLine = L.source ? text(stage, 944, 524, L.source, {fs: 13, family: FONT.serif, style: 'italic', fill: C.ink, anchor: 'end'}) : null;
	// In the stacked view the source sits just under the controls, outside the fixed-height player.
	const stackedSource = root.querySelector('[data-fs-source]');
	root.classList.toggle('fs-keep-task', !!NW.keepTask);
	if (stackedSource && NW.source) { stackedSource.textContent = NW.source; stackedSource.hidden = false; }
	const keyRed = el(stage, 'g');
	el(keyRed, 'circle', {cx: COL.a + 186, cy: 520, r: 5, fill: C.red});
	mono(keyRed, COL.a + 198, 524, L.keyOwn, {fill: C.red});

	// ---- a paper ------------------------------------------------------------------
	// Built in its own units and placed by a transform. Each line is revealed by
	// its own clip rect as the AI composes it.
	const paper = (withCut) => {
		const g = el(stage, 'g');
		const shadow = el(g, 'rect', {x: 3, y: 4, width: P.w, rx: 1, fill: C.ink, 'fill-opacity': 0.06});
		const sheet = el(g, 'rect', {x: 0, y: 0, width: P.w, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.18, 'stroke-width': 1.2});
		// The second paper ends where the cut sentence starts (line 5, before its space).
		const lines = withCut ? LINES : LINES.slice(0, 5).map((l, i) => (i === 4 ? l.slice(0, l.findIndex(([, k]) => k === 'cut') - 1) : l));
		const clip = clipGroup(g, lines.map((_, i) => ({x: 0, y: baseY(i) - 26, height: P.lh + 2})));
		const bandLayer = el(clip.g, 'g'), overLayer = el(clip.g, 'g'), textLayer = el(clip.g, 'g');
		const segs = [];
		lines.forEach((line, li) => line.forEach(([str, k], si) => {
			if (!k) return;
			const prevSpace = si === 0 || !line[si - 1][1];
			const nextSpace = si === line.length - 1 || !line[si + 1][1];
			const node = serif(textLayer, 0, baseY(li), str, {fs: P.fs, fill: C.grey, dataFs: P.fs * SM});
			// The highlight for the words the first student repeats (beat 8).
			const over = k === 'ans' ? el(overLayer, 'rect', {y: baseY(li) - 18, height: 25, rx: 2, fill: C.band, opacity: 0}) : null;
			const under = k === 'ans' ? el(g, 'line', {y1: baseY(li) + 7, y2: baseY(li) + 7, stroke: C.ink, 'stroke-width': 2.4, opacity: 0}) : null;
			segs.push({li, si, k, str, node, over, under, padL: prevSpace ? 3 : 0, padR: nextSpace ? 3 : 0});
		}));
		const runs = [];
		const sweep = lines.slice(0, 5).map((_, i) => el(g, 'line', {y1: baseY(i) + 7, y2: baseY(i) + 7, stroke: C.ink, 'stroke-width': 2.4, opacity: 0}));
		return {g, shadow, sheet, clip, segs, lines, sweep, lineW: [], runs, bandLayer};
	};
	const paperA = paper(true);
	const paperB = paper(false);
	const strike = [el(paperA.g, 'line', {stroke: C.red, 'stroke-width': 2.6}), el(paperA.g, 'line', {stroke: C.red, 'stroke-width': 2.6})];

	// Tags (outside the scaled groups, so mono stays 12 units).
	const tag = () => {
		const ai = mono(stage, 0, 0, L.tagDraft, {fill: C.grey});
		const kept = mono(stage, 0, 0, '', {});
		const kInk = el(kept, 'tspan', {fill: C.ink}); kInk.textContent = L.tagKept;
		const kGrey = el(kept, 'tspan', {fill: C.grey}); kGrey.textContent = L.tagDisclosed;
		return {ai, kept};
	};
	const tagA = tag();
	const tagB = tag();

	// The cut sentence, once lifted out: a one-line card in the first column's top row.
	const cutCard = el(stage, 'g');
	const cutBand = el(cutCard, 'rect', {x: 6, y: 9, height: 22, rx: 2, fill: C.band});
	const cutText = serif(cutCard, 10, 25, ed.paper.cut, {fs: CUT_CARD.fs, fill: C.grey});
	const cutStrike = el(cutCard, 'line', {y1: 20, y2: 20, x1: 8, stroke: C.red, 'stroke-width': 2.2});
	// Says plainly what the first student did: the struck words are the AI's.
	const cutLabel = text(stage, COL.a + 6, 132, L.cutLabel, {fs: 13, weight: 600, fill: C.red});

	// The second student's note.
	const note = el(stage, 'g');
	el(note, 'rect', {x: 0, y: 0, width: NOTE.w, height: NOTE.h, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.18, 'stroke-width': 1.2});
	const noteClip = clipGroup(note, NOTE.base.map((b) => ({x: 0, y: b - 24, height: 30})));
	const noteText = L.noteLines.map((s, i) => serif(noteClip.g, NOTE.x, NOTE.base[i], s, {fs: NOTE.fs, fill: C.red, dataFs: NOTE.fs * NOTE_S}));
	const noteLabel = mono(stage, COL.b, 204, L.noteLabel, {fill: C.red});

	// Speech panels.
	const panels = {};
	for (const [id, a] of Object.entries(ANSWERS)) {
		const x = COL[a.col], y = ROWS[a.row].top;
		const g = el(stage, 'g');
		const box = el(g, 'rect', {x, y, width: COL.w, height: PANEL.h, rx: 8, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.25, 'stroke-width': 1});
		const clip = clipGroup(g, a.lines.map((_, i) => ({x, y: y + PANEL.base[i] - 15, height: 20})));
		const bandLayer = el(clip.g, 'g');
		// Ink first, as faculty hear it; the origin colours come back at the reveal (beat 9).
		const lines = a.lines.map((segs, i) => {
			const node = serif(clip.g, x + PANEL.padX, y + PANEL.base[i], '', {fs: PANEL.fs, fill: C.ink});
			const parts = segs.map(([str, k]) => {
				const ts = el(node, 'tspan', {}, str);
				const band = k === 'ai' ? el(bandLayer, 'rect', {y: y + PANEL.base[i] - 13.5, height: 19, rx: 2, fill: C.band, opacity: 0}) : null;
				return {str, k, ts, band};
			});
			return {node, parts, full: segs.map(([str]) => str).join('')};
		});
		panels[id] = {g, box, clip, lines, x, w: []};
	}

	// Dots and their labels.
	const dotA = el(stage, 'circle', {r: 5, fill: C.red});
	const dotALabel = text(stage, DOT_A.start.x, DOT_A.start.y + 24, L.person, {fs: 13, weight: 600, fill: C.red, anchor: 'middle'});
	const headA = text(stage, DOT_A.head.x + 12, HEAD_Y + 5, L.first, {fs: 13, weight: 600, fill: C.red});
	const dotB = el(stage, 'circle', {r: 5, fill: C.red});
	const headB = text(stage, DOT_B.head.x + 12, HEAD_Y + 5, L.second, {fs: 13, weight: 600, fill: C.red});

	// ---- measuring and paths ----------------------------------------------------------
	let dotAAt = () => DOT_A.start, dotBAt = () => DOT_B.head;
	const world = (pos, s, lx, ly) => ({x: pos.x + s * lx, y: pos.y + s * ly});
	let cutStart = {x: 0, y: 0}, cutLen = [0, 0], noteW = [], ready = false;

	function measure() {
		const probe = serif(stage, 0, -100, '', {fs: P.fs});
		[paperA, paperB].forEach((p) => {
			p.lines.forEach((line, li) => {
				const full = line.map(([s]) => s).join('');
				probe.textContent = full;
				p.lineW[li] = probe.getComputedTextLength();
				let idx = 0;
				line.forEach(([str, k], si) => {
					const off = idx ? probe.getSubStringLength(0, idx) : 0;
					const w = probe.getSubStringLength(idx, str.length);
					idx += str.length;
					if (!k) return;
					const seg = p.segs.find((s) => s.li === li && s.si === si);
					seg.x = P.padX + off; seg.w = w;
					set(seg.node, {x: seg.x});
					if (seg.over) set(seg.over, {x: seg.x - seg.padL, width: w + seg.padL + seg.padR});
					if (seg.under) set(seg.under, {x1: seg.x, x2: seg.x + w});
				});
			});
			// One band per run of words on a line (a run breaks at a space between
			// sentences, and the cut sentence has its own), so there are no seams.
			p.lines.forEach((_, li) => {
				const segsOnLine = p.segs.filter((sg) => sg.li === li);
				let run = null;
				segsOnLine.forEach((sg, i) => {
					const cut = sg.k === 'cut';
					const joins = run && run.cut === cut && segsOnLine[i - 1].si === sg.si - 1;
					if (!joins) { run = {cut, li, x0: sg.x, x1: sg.x + sg.w}; p.runs.push(run); } else run.x1 = sg.x + sg.w;
				});
			});
			p.runs.forEach((r) => { r.rect = el(p.bandLayer, 'rect', {x: r.x0 - 3, y: baseY(r.li) - 18, width: r.x1 - r.x0 + 6, height: 25, rx: 2, fill: C.band}); });
			p.clip.rects.forEach((r, i) => set(r, {x: P.padX - 4}));
			p.sweep.forEach((l, i) => set(l, {x1: P.padX, x2: P.padX}));
		});
		probe.remove();
		// The strike across the cut sentence (line 5, then line 6).
		const cuts = paperA.segs.filter((s) => s.k === 'cut');
		cuts.forEach((c, i) => set(strike[i], {y1: baseY(c.li) - 6.5, y2: baseY(c.li) - 6.5, x1: c.x, x2: c.x}));
		cutLen = cuts.map((c) => c.w);
		cutStart = {x: cuts[0].x, y: baseY(cuts[0].li)};
		const cw = cutText.getComputedTextLength();
		set(cutBand, {width: cw + 8});
		set(cutStrike, {x2: 12 + cw});
		noteW = noteText.map((n) => n.getComputedTextLength());
		noteClip.rects.forEach((r) => set(r, {x: NOTE.x - 4}));
		for (const p of Object.values(panels)) {
			p.w = p.lines.map((l) => l.node.getComputedTextLength());
			p.lines.forEach((l) => {
				let idx = 0;
				l.parts.forEach((pt) => {
					const off = idx ? l.node.getSubStringLength(0, idx) : 0;
					const w = l.node.getSubStringLength(idx, pt.str.length);
					idx += pt.str.length;
					if (pt.band) set(pt.band, {x: p.x + PANEL.padX + off - 3, width: w + 6});
				});
			});
			p.clip.rects.forEach((r) => set(r, {x: p.x + PANEL.padX - 4}));
		}

		// The first student's dot: in, read each line, strike, rest, then up to its column.
		const segA = [];
		const lineStart = (pos, i) => world(pos, BIG, P.padX, baseY(i) + 6);
		const lineEnd = (p, pos, i) => world(pos, BIG, P.padX + p.lineW[i], baseY(i) + 6);
		segA.push([T.enterA[0], T.enterA[1], DOT_A.start, lineStart(PA.big, 0), E.inOut]);
		paperA.lines.forEach((_, i) => {
			const t0 = T.readA + T.read * i;
			segA.push([t0, t0 + T.read, lineStart(PA.big, i), lineEnd(paperA, PA.big, i)]);
		});
		const [c5, c6] = cuts;
		const split = T.strike[0] + (T.strike[1] - T.strike[0]) * (cutLen[0] / (cutLen[0] + cutLen[1]));
		const sy5 = baseY(c5.li) - 6.5, sy6 = baseY(c6.li) - 6.5;
		segA.push([T.strike[0], split, world(PA.big, BIG, c5.x, sy5), world(PA.big, BIG, c5.x + c5.w, sy5)]);
		segA.push([split, T.strike[1], world(PA.big, BIG, c6.x, sy6), world(PA.big, BIG, c6.x + c6.w, sy6)]);
		const esc = paperA.segs.find((s) => s.li === 4 && s.k === 's2b');
		// After the cut, the first paper's last line ends at "escalation."
		paperA.sweepW = paperA.lineW.slice(0, 5);
		paperA.sweepW[4] = esc.x + esc.w - P.padX;
		paperB.sweepW = paperB.lineW.slice(0, 5);
		const rest = world(PA.big, BIG, esc.x + esc.w + 8, baseY(4) + 6);
		segA.push([T.lift[0], T.lift[1], world(PA.big, BIG, c6.x + c6.w, sy6), rest, E.inOut]);
		segA.push([T.cellA[0], T.cellA[1], rest, DOT_A.head, E.inOutStrong]);
		dotAAt = pathAt(segA, DOT_A.start);

		// The second student's dot: down to the note, write, back up; later read the draft.
		const segB = [];
		const nb = (i) => ({x: NOTE.big.x + NOTE.x, y: NOTE.big.y + NOTE.base[i] + 6});
		segB.push([T.toNote[0], T.toNote[1], DOT_B.head, nb(0), E.inOut]);
		const totalW = noteW.reduce((a, b) => a + b, 0);
		let tw = T.write[0];
		noteW.forEach((w, i) => {
			const d = (T.write[1] - T.write[0]) * (w / totalW);
			segB.push([tw, tw + d, nb(i), {x: nb(i).x + w, y: nb(i).y}]);
			tw += d;
		});
		const noteEnd = {x: nb(2).x + noteW[2], y: nb(2).y};
		segB.push([T.backB[0], T.backB[1], noteEnd, DOT_B.head, E.inOut]);
		segB.push([T.toLineB[0], T.toLineB[1], DOT_B.head, lineStart(PB.big, 0), E.inOut]);
		paperB.lines.forEach((_, i) => {
			const t0 = T.readB + T.read * i;
			segB.push([t0, t0 + T.read, lineStart(PB.big, i), lineEnd(paperB, PB.big, i)]);
		});
		segB.push([T.cellB[0], T.cellB[1], lineEnd(paperB, PB.big, 4), DOT_B.head, E.inOutStrong]);
		dotBAt = pathAt(segB, DOT_B.head);
		noteTiming = (() => { let a = T.write[0]; return noteW.map((w) => { const d = (T.write[1] - T.write[0]) * (w / totalW); const r = [a, a + d]; a += d; return r; }); })();
		ready = true;
	}
	let noteTiming = [];

	// Reveal a set of clip rects line by line across [t0, t1], in proportion to widths.
	const revealLines = (rects, widths, t, t0, t1, pad = 8) => {
		const total = widths.reduce((a, b) => a + b, 0);
		let a = t0;
		rects.forEach((r, i) => {
			const d = (t1 - t0) * (widths[i] / total);
			set(r, {width: (widths[i] + pad) * prog(t, a, a + d)});
			a += d;
		});
	};
	const place = (g, pos, s) => set(g, {transform: `translate(${pos.x.toFixed(2)} ${pos.y.toFixed(2)}) scale(${s.toFixed(4)})`});
	const lerpPos = (a, b, k) => ({x: mix(a.x, b.x, k), y: mix(a.y, b.y, k)});

	const render = (t) => {
		if (!ready) return;
		// Beat 1: task card, first dot.
		const ck = prog(t, ...T.card, E.house);
		set(card, {opacity: ck, transform: `translate(0 ${mix(6, 0, ck).toFixed(2)})`});
		const pa = dotAAt(t);
		const growA = spring(t, T.dotIn, {stiffness: 300, damping: 20});
		const pulseA = Math.sin(Math.PI * prog(t, ...T.pulseA)) * 2.5;
		set(dotA, {cx: pa.x, cy: pa.y, r: Math.max(0, 5 * growA + pulseA)});
		set(dotALabel, {opacity: prog(t, T.dotIn, T.dotIn + 0.4) * (1 - prog(t, T.enterA[0], T.enterA[0] + 0.3))});
		set(headA, {opacity: prog(t, T.cellA[1] - 0.3, T.cellA[1] + 0.1)});

		// Paper A: appears, composes, is cut, shrinks into its cell.
		const cellA = prog(t, ...T.cellA, E.inOutStrong);
		const posA = lerpPos(PA.big, PA.cell, cellA), sA = mix(BIG, SM, cellA);
		place(paperA.g, posA, sA);
		const inA = prog(t, ...T.sheetA, E.house);
		set(paperA.g, {opacity: inA});
		const lift = prog(t, ...T.lift, E.inOut);
		const hA = mix(sheetH(6), sheetH(5), lift);
		set(paperA.sheet, {height: hA});
		set(paperA.shadow, {height: hA});
		paperA.clip.rects.forEach((r, i) => set(r, {width: (paperA.lineW[i] + 10) * prog(t, T.composeA + T.line * i, T.composeA + T.line * (i + 1))}));
		const sk = prog(t, ...T.strike);
		const split = cutLen[0] / (cutLen[0] + cutLen[1]);
		const cuts = paperA.segs.filter((s) => s.k === 'cut');
		cuts.forEach((c, i) => {
			const k = i === 0 ? Math.min(1, sk / split) : Math.max(0, (sk - split) / (1 - split));
			set(strike[i], {x2: c.x + c.w * k, opacity: t < T.lift[0] ? 1 : 0});
			set(c.node, {opacity: t < T.lift[0] ? 1 : 0});
		});
		paperA.runs.forEach((r) => { if (r.cut) set(r.rect, {opacity: t < T.lift[0] ? 1 : 0}); });
		// The lifted card: from where the cut words sat to the first column's top row.
		const from = world(PA.big, BIG, cutStart.x - 10 * (BIG * P.fs / CUT_CARD.fs) / BIG, cutStart.y - 25 * (BIG * P.fs / CUT_CARD.fs) / BIG);
		const cardS = mix(BIG * P.fs / CUT_CARD.fs, 1, lift);
		place(cutCard, lerpPos(from, {x: CUT_CARD.x, y: CUT_CARD.y}, lift), cardS);
		// Half see-through mid-flight, so the lines it crosses stay readable.
		set(cutCard, {opacity: t >= T.lift[0] ? 1 - 0.5 * Math.sin(Math.PI * lift) : 0});
		set(cutLabel, {opacity: prog(t, ...T.cutLabel)});

		// Tags.
		// One label fades out before the next fades in, so they never overlap.
		const placeTag = (tg, pos) => [tg.ai, tg.kept].forEach((n) => set(n, {x: pos.x, y: pos.y - 8}));
		const swapTag = (tg, span, shown) => {
			const mid = (span[0] + span[1]) / 2;
			set(tg.ai, {opacity: shown * (1 - prog(t, span[0], mid))});
			set(tg.kept, {opacity: prog(t, mid, span[1])});
		};
		placeTag(tagA, posA);
		swapTag(tagA, T.tagA, inA);

		// Beat 4: the second student and the note.
		const growB = spring(t, T.dotB, {stiffness: 300, damping: 20});
		const pulseB = Math.sin(Math.PI * prog(t, ...T.pulseB)) * 2.5;
		const pb = dotBAt(t);
		set(dotB, {cx: pb.x, cy: pb.y, r: Math.max(0, 5 * growB + pulseB)});
		set(headB, {opacity: prog(t, T.dotB, T.dotB + 0.4)});
		const noteIn = prog(t, ...T.noteIn, E.house);
		const up = prog(t, ...T.noteUp, E.inOutStrong);
		place(note, lerpPos(NOTE.big, NOTE.cell, up), mix(1, NOTE_S, up));
		set(note, {opacity: noteIn});
		set(noteLabel, {opacity: noteIn * (1 - prog(t, T.noteUp[0], T.noteUp[0] + 0.3))});
		noteClip.rects.forEach((r, i) => set(r, {width: (noteW[i] + 8) * prog(t, ...noteTiming[i])}));
		set(rowOwn, {opacity: prog(t, ...T.rowOwn)});

		// Beat 5: the AI drafts from the note; the match sweep.
		const cellB = prog(t, ...T.cellB, E.inOutStrong);
		const posB = lerpPos(PB.big, PB.cell, cellB), sB = mix(BIG, SM, cellB);
		place(paperB.g, posB, sB);
		const inB = prog(t, ...T.sheetB, E.house);
		set(paperB.g, {opacity: inB});
		set(paperB.sheet, {height: sheetH(5)});
		set(paperB.shadow, {height: sheetH(5)});
		paperB.clip.rects.forEach((r, i) => set(r, {width: (paperB.lineW[i] + 10) * prog(t, T.composeB + T.line * i, T.composeB + T.line * (i + 1))}));
		const sweepOut = 1 - prog(t, T.cellB[0], T.cellB[0] + 0.4); // holds until the paper moves
		const step = (T.sweep[1] - T.sweep[0]) / 5;
		[paperA, paperB].forEach((p) => p.sweep.forEach((l, i) => {
			const k = prog(t, T.sweep[0] + step * i, T.sweep[0] + step * (i + 1));
			set(l, {x2: P.padX + p.sweepW[i] * k, opacity: k > 0 ? sweepOut : 0});
		}));
		placeTag(tagB, posB);
		swapTag(tagB, T.tagB, inB);

		// Row label (beat 6) and the key (beats 2 and 3).
		set(rowRecv, {opacity: prog(t, ...T.rowRecv)});
		set(keyGrey, {opacity: prog(t, ...T.keyGrey)});
		set(keyRed, {opacity: prog(t, ...T.keyRed)});
		if (sourceLine) set(sourceLine, {opacity: prog(t, ...T.source)});

		// Beat 7: papers set aside. Sheets and bands fade; the words stay readable.
		const dim = prog(t, ...T.dim, E.inOut);
		const bright = prog(t, ...T.bright) - prog(t, ...T.unbright);
		[paperA, paperB].forEach((p) => {
			set(p.sheet, {'fill-opacity': 1 - dim});
			set(p.shadow, {opacity: 1 - dim});
			p.runs.forEach((r) => { if (!r.cut) set(r.rect, {opacity: mix(1, 0.55, dim)}); });
			p.segs.forEach((s) => {
				if (s.over) set(s.over, {opacity: p === paperA ? dim * bright : 0});
				if (s.under) set(s.under, {opacity: p === paperA ? bright : 0});
			});
		});
		const rise = (g, span) => { const k = prog(t, ...span, E.house); set(g, {opacity: k, transform: `translate(0 ${mix(6, 0, k).toFixed(2)})`}); };
		rise(q1, T.q1);
		rise(q2, T.q2);

		// Answers: the panel opens, then the words arrive at speaking pace, in ink.
		// After the changed fact (beat 9), all four take their origin colours.
		const rv = prog(t, ...T.reveal, E.inOut);
		for (const [id, p] of Object.entries(panels)) {
			const span = T[id];
			set(p.g, {opacity: prog(t, span[0], span[0] + 0.2)});
			revealLines(p.clip.rects, p.w, t, span[0] + 0.1, span[1]);
			p.lines.forEach((l) => l.parts.forEach((pt) => {
				if (!pt.k) return;
				set(pt.ts, {fill: mixColor(C.ink, pt.k === 'ai' ? C.grey : C.red, rv)});
				if (pt.band) set(pt.band, {opacity: rv});
			}));
		}
		renderNarrow(t);
	};

	// ---- the narrow stage (below 480 px) ---------------------------------------------
	// A stacked text view of the same moments, driven by the same clock: what the
	// current beat is about, at readable sizes. The SVG is collapsed at this width.
	// From beat 6 on, one compact tile keeps the shared paper in view; answers sit
	// in two columns, first student on the left, as on desktop.
	const narrow = root.querySelector('[data-fs-narrow]');
	const h = (tag, cls, parent, txt) => { const n = document.createElement(tag); if (cls) n.className = cls; if (txt != null) n.textContent = txt; parent.append(n); return n; };
	const PARA = ed.paper.text;
	const N = {};
	const section = (key, label) => { const sec = h('div', 'fs-n-sec', narrow); const lab = label != null ? h('p', 'fs-n-label', sec, label) : null; N[key] = {sec, lab}; return sec; };
	const pair = (parent) => h('div', 'fs-n-pair', parent);
	const spans = (parent, segs) => segs.map(([str, k]) => ({k, node: h('span', k ? `fs-n-seg fs-n-${k}` : 'fs-n-seg', parent, str)}));
	{
		const sec = section('task', NW.task);
		h('p', 'fs-n-task', sec, ed.task.text);
	}
	{
		const sec = section('draftA', NW.draft);
		const para = h('p', 'fs-n-ai', sec);
		h('span', 'fs-n-band', para, PARA);
		para.append(' ');
		N.draftA.cut = h('span', 'fs-n-band', para, ed.paper.cut);
	}
	{
		const sec = section('own', NW.own);
		const row = pair(sec);
		const a = h('div', 'fs-n-cell', row);
		h('span', 'fs-n-who', a, L.first);
		h('p', 'fs-n-act', a, NW.cutAct);
		const cutP = h('p', 'fs-n-ai fs-n-sm', a);
		h('span', 'fs-n-band fs-n-struck', cutP, ed.paper.cut);
		const b = h('div', 'fs-n-cell', row);
		N.own.bWho = h('span', 'fs-n-who', b, L.second);
		N.own.a = a;
		N.own.note = h('p', 'fs-n-note', b, NW.note);
	}
	{
		const sec = section('draftB', NW.draftB);
		const para = h('p', 'fs-n-ai', sec);
		h('span', 'fs-n-band', para, PARA);
		N.draftB.same = h('p', 'fs-n-small', sec, NW.same);
	}
	{
		const sec = section('paper', NW.paper);
		sec.classList.add('fs-n-paper');
		// The border sits on the tile; the clamp sits on the paragraph inside it, so a
		// clamped line can't show through the tile's padding.
		const tile = h('div', 'fs-n-tile', sec);
		const para = h('p', 'fs-n-ai fs-n-sm', tile);
		h('span', 'fs-n-band', para, PARA);
		N.paper.tile = para;
	}
	const say = (parent, who, segs) => {
		const box = h('div', 'fs-n-say', parent);
		h('span', 'fs-n-who', box, who);
		const txt = h('span', 'fs-n-txt', box);
		return {box, parts: spans(txt, segs)};
	};
	for (const [q, ids] of [['q1', ['a1', 'b1']], ['q2', ['a2', 'b2']]]) {
		const sec = section(q, NW[q].label);
		h('p', 'fs-n-q', sec, NW[q].question);
		const row = pair(sec);
		N[q].a = say(row, L.first, NW.answers[ids[0]]);
		N[q].b = say(row, L.second, NW.answers[ids[1]]);
	}
	{
		const sec = section('key', null);
		sec.classList.add('fs-n-key');
		N.key.grey = h('span', 'fs-n-key-ai', sec, NW.keyAI);
		N.key.red = h('span', 'fs-n-key-own', sec, NW.keyOwn);
	}
	const SHOW = [['task'], ['task', 'draftA'], ['draftA'], ['own'], ['own', 'draftB'], ['own', 'paper'], ['paper', 'q1'], ['paper', 'q1', 'q2'], ['paper', 'q1', 'q2'], ['paper', 'q1', 'q2']];
	const beatIndex = (t) => { let i = 0; BEATS.forEach((b, j) => { if (t >= b.at) i = j; }); return i; };
	const fade = (node, k) => { node.style.opacity = k.toFixed(3); };
	function renderNarrow(t) {
		const bi = beatIndex(t);
		const show = new Set(SHOW[bi]);
		// Optional (business): the task stays on the stacked stage to the end, as one line from beat 3.
		if (NW.keepTask) {
			show.add('task');
			N.task.sec.classList.toggle('is-compact', bi >= 2);
			// With the task kept, the shared paper goes inline with its label from beat 8.
			N.paper.sec.classList.toggle('is-inline', bi >= 7);
		}
		// Optional (business): from beat 7 the second person's note stays on the stacked
		// stage under one label, so the final frame still shows why the two differ.
		if (NW.noteKept) {
			const keep = bi >= 6;
			if (keep) show.add('own');
			N.own.sec.classList.toggle('is-note-only', keep);
			N.own.bWho.textContent = keep ? NW.noteKept : L.second;
		}
		for (const [k, v] of Object.entries(N)) v.sec.hidden = !(show.has(k) || k === 'key');
		fade(N.task.sec, prog(t, ...T.card));
		// Once the papers are set aside (beat 7), the shared paper shrinks to a two-line
		// tile, and to one line when the fact changes (beat 8), so the phone player fits.
		N.paper.tile.classList.toggle('is-clamped', t >= BEATS[6].at);
		N.paper.tile.classList.toggle('is-one-line', t >= BEATS[7].at);
		N.draftA.lab.textContent = t >= (T.tagA[0] + T.tagA[1]) / 2 ? NW.draftKept : NW.draft;
		fade(N.draftA.sec, prog(t, ...T.sheetA));
		N.draftA.cut.classList.toggle('fs-n-struck', t >= T.strike[0] + 0.3);
		N.draftA.cut.hidden = t >= T.lift[1];
		fade(N.own.a, prog(t, ...T.lift));
		fade(N.own.note, prog(t, ...T.write));
		fade(N.draftB.sec, prog(t, ...T.sheetB));
		fade(N.draftB.same, prog(t, ...T.sweep));
		const rv = prog(t, ...T.reveal, E.inOut);
		for (const [q, ids] of [['q1', ['a1', 'b1']], ['q2', ['a2', 'b2']]]) {
			fade(N[q].sec, q === 'q1' ? prog(t, ...T.q1) : prog(t, ...T.q2));
			[N[q].a, N[q].b].forEach((sv, i) => {
				fade(sv.box, prog(t, T[ids[i]][0], T[ids[i]][1]));
				sv.parts.forEach((pt) => {
					if (!pt.k) return;
					pt.node.style.color = mixColor(C.ink, pt.k === 'ai' ? C.grey : C.red, rv);
					pt.node.style.backgroundColor = pt.k === 'ai' ? `rgba(222, 213, 196, ${rv.toFixed(3)})` : 'transparent';
				});
			});
		}
		fade(N.key.grey, prog(t, ...T.keyGrey));
		fade(N.key.red, prog(t, ...T.keyRed));
	}
	// The stacked stage keeps one height for the whole run at the current width: the
	// tallest of its beat layouts. Measured whenever the width changes.
	let sizedFor = 0;
	const sizeNarrow = () => {
		const w = narrow.clientWidth;
		if (!w || w === sizedFor) return;
		sizedFor = w;
		narrow.style.height = '';
		let tallest = 0;
		// Each beat's settled layout (and the draft before the cut), measured in turn.
		[T.composeA + 3, ...BEATS.map((b, i) => (i < BEATS.length - 1 ? BEATS[i + 1].at - 0.02 : T.end))].forEach((at) => {
			renderNarrow(at);
			tallest = Math.max(tallest, narrow.scrollHeight);
		});
		narrow.style.height = `${Math.ceil(tallest)}px`;
	};
	// The stacked stage takes over whenever the smallest picture text (MIN_TEXT-unit
	// mono, 12 by default) would render under 11 px at the runtime's letterboxed scale.
	const MIN_FS = MIN_TEXT;
	let player = null;
	const syncStacked = () => {
		const r = svg.getBoundingClientRect();
		if (!r.width) return;
		const scale = r.height ? Math.min(r.width / VW, r.height / (VW * 540 / 960)) : r.width / VW;
		const stacked = MIN_FS * scale < 11;
		root.classList.toggle('is-stacked', stacked);
		if (stacked) {
			root.classList.add('is-narrow');
			sizeNarrow();
			renderNarrow(player ? player.time() : 0); // figure time, not player time
		}
	};

	const BEATS = BEAT_AT.map((at, i) => ({at, ...ed.beats[i]}));
	BEATS[BEATS.length - 1].check = {...ed.check, followAt: T.follow};

	{
		measure();
		legibility(root, svg, VW, 11);
		new ResizeObserver(syncStacked).observe(svg);
		// Poster: the settled setup (the task and the student) while the figure waits to play.
		// Nameplate: the opening name card, the corner plate and the final name and definition.
		player = mount(root, {duration: T.end, render, beats: BEATS, poster: BEATS[1].at - 0.02,
			nameplate: {name: 'Fluency substitution', kicker: 'Failure mode 2 of 7', definition: 'Polished analysis stands in for owned reasoning.'}});
		syncStacked();
	}
	}
})();
