/* Premature synthesis: motion figure 3 of 8. Built to storyboard.md (round 3).
   Grey is what the AI supplied, red is what a student decided or learned, navy
   is ink. Beats 1–6 play on the students' side: six reading cards, each
   student's connections drawn between them, and each student's paper in the
   left column. Beats 7–10 are the faculty side: the papers move aside into a
   strip at the top, and two rows (one per student) hold a sketch and an answer,
   both in plain ink, as faculty see and hear them. Every attribute is a pure
   function of t, so the runtime can play, scrub, hold (?t=) and export it.
   Every visible word comes from editions/<id>.json (default pme) and the shared
   ../../casts.json, loaded by MotionFigures.loadEdition; this file keeps the core:
   the timeline, layout, colours and the nameplate. See CONVENTIONS.md, Editions. */
(() => {
	const {mount, E, mix, prog, spring, el, set, pathAt, legibility, FONT, loadEdition, fillPage} = MotionFigures;
	const C = {paper: '#f6f1e8', bright: '#fffdfa', ink: '#0a2242', red: '#b81b2b', grey: '#5b564f'};
	const VW = 960;

	// ---- timeline (absolute seconds, from the storyboard) -------------------
	const T = {
		card: [1.0, 1.6], dotIn: 1.6, cardsIn: 2.2, cardStep: 0.48,
		labelAOut: [7.8, 8.1], readA: 8.1, read: 0.45, returnA: [10.8, 11.1], pulseA: [11.1, 11.5],
		sweepA: [11.6, 12.8], tagA: [12.8, 13.2],
		traceA: 16.5, trace: 0.5, toSheetA: [19.2, 20.2], sheetA: [19.8, 20.2], titleA: [20.2, 20.8], heavyA: [20.8, 21.2],
		parasA: 21.2, para: 0.5, aiNoteA: [22.8, 23.2],
		fadeA: [25.7, 26.2], dotB: 26.3, labelBOut: [26.8, 27.1], readB: 26.8,
		redB: 29.7, redStep: 0.5, try12: [31.8, 32.3], check12: [32.4, 33.4], x: [33.5, 33.9], note: [34.0, 34.5], retract: [34.6, 34.9],
		homeB: [35.0, 35.6], pulseB: [37.4, 37.8], sweepB: [38.0, 39.2], xBright: [39.2, 39.6], tagB: [39.6, 40.0],
		merge: [41.1, 41.7], check34: [41.8, 43.0], red34: [43.1, 43.5], homeB2: [43.6, 44.2],
		toSheetB: [46.7, 47.1], sheetB: [46.7, 47.1], titleB: [47.1, 47.7], heavyB: [47.7, 48.1],
		p1B: [48.1, 48.8], p2B: [48.8, 49.3], p3B: [49.3, 49.8], aiNoteB: [49.9, 50.3],
		fadeCards: [50.4, 51.0], header: [51.1, 51.5],
		aside: [54.0, 55.2], bothAI: [54.8, 55.2], q1: [55.3, 55.9], rows: [56.0, 56.4],
		sketchA: 56.5, sketchB: 58.0,
		q2: [61.9, 62.5], pointer: [62.7, 63.3], ansA: [66.2, 71.2],
		ringPulseB: [73.7, 74.1], learned: [76.4, 76.9], ansB: [77.1, 81.8],
		check: 83.3, follow: 86.6,
		end: 90.0,
	};

	// ---- geometry ------------------------------------------------------------
	const CARD = {w: 176, h: 40, open: 16};
	const CARDS = {
		1: {x: 334, y: 160},
		2: {x: 762, y: 160},
		3: {x: 574, y: 235},
		4: {x: 334, y: 310},
		5: {x: 762, y: 460},
		6: {x: 334, y: 460},
	};
	const IDS = ['1', '2', '3', '4', '5', '6'];
	const READ_ORDER = ['1', '4', '6', '3', '2', '5'];
	const AI_LINES = [['1', '4'], ['4', '6'], ['3', '4'], ['3', '5'], ['2', '5']];
	const RED_ORDER = [['5', '2'], ['3', '5'], ['1', '4'], ['4', '6']];
	const key = (a, b) => [a, b].sort().join('-');
	const centre = (id) => ({x: CARDS[id].x + CARD.w / 2, y: CARDS[id].y + CARD.h / 2});
	const openRect = (id) => ({x: CARDS[id].x - 3, y: CARDS[id].y - 3, w: CARD.w + 6, h: CARD.h + CARD.open + 6});
	const exitT = (c, d, r) => {
		const dx = d.x - c.x, dy = d.y - c.y;
		let t = Infinity;
		if (dx > 0) t = Math.min(t, (r.x + r.w - c.x) / dx); else if (dx < 0) t = Math.min(t, (r.x - c.x) / dx);
		if (dy > 0) t = Math.min(t, (r.y + r.h - c.y) / dy); else if (dy < 0) t = Math.min(t, (r.y - c.y) / dy);
		return t;
	};
	/** The visible part of the line from card a to card b: [leaves a, reaches b]. */
	const seg = (a, b) => {
		const ca = centre(a), cb = centre(b);
		const ta = exitT(ca, cb, openRect(a)), tb = exitT(cb, ca, openRect(b));
		return [{x: mix(ca.x, cb.x, ta), y: mix(ca.y, cb.y, ta)}, {x: mix(cb.x, ca.x, tb), y: mix(cb.y, ca.y, tb)}];
	};
	const lerp = (a, b, k) => ({x: mix(a.x, b.x, k), y: mix(a.y, b.y, k)});
	const drawLine = (node, s, k) => { const e = lerp(s[0], s[1], k); set(node, {x1: s[0].x, y1: s[0].y, x2: e.x, y2: e.y}); };

	const HOME_A = {x: 312, y: 258}, HOME_B = {x: 312, y: 444};
	const X_AT = {x: 636, y: 180};
	// Papers, in sheet-local units, placed by a transform.
	const P = {w: 276, h: 164, padX: 16, title: [28, 52], barH: 4.5, tagX: 262};
	const PAR_Y = [[64, 72, 80], [92, 100, 108], [120, 128, 136]];
	const TAG_Y = [68, 96, 124];
	const TAG_LINES = [['2-5'], ['3-4', '3-5'], ['1-4', '4-6']];
	// Same argument, own words: the same rows, different line lengths.
	const WIDTHS = {a: [[140, 168, 104], [156, 160, 88], [156, 170, 126]], b: [[134, 176, 120], [156, 144, 118], [148, 176, 96]]};
	const PAPER_AT = {a: {x: 24, y: 176}, b: {x: 24, y: 362}};
	const ASIDE = {a: {x: 24, y: 24, r: -2}, b: {x: 196, y: 24, r: 1.5}, s: 0.56};
	// Faculty side.
	const SK = {s: 0.42, x0: 380, top: [226, 392], r: 11};
	const node = (row, id) => ({x: SK.x0 + (centre(id).x - 422) * SK.s, y: SK.top[row] + (centre(id).y - 180) * SK.s});
	const DOT_ROW = [{x: 310, y: 289}, {x: 310, y: 455}];
	const PANEL = {x: 620, w: 326, padX: 14, fs: 16, rows: [
		{y: 226, h: 60, base: [24, 46]},
		{y: 392, h: 60, base: [24, 46]},
	]};

	const BEAT_AT = [0, 6.8, 15.5, 24.7, 36.4, 45.7, 53.0, 60.9, 72.7, 83.3];
	const root = document.querySelector('#premature-synthesis');
	Promise.all([loadEdition(root), document.fonts.ready]).then(([ed]) => { fillPage(document, ed); build(ed); });

	function build(ed) {
	const L = ed.labels, NW = ed.narrow;
	IDS.forEach((id) => { CARDS[id].title = ed.readings[id]; });
	PANEL.rows.forEach((r, i) => { r.lines = ed.answers[i]; });
	// The first paragraph carries the main claim; its tag says so.
	const TAGS = ed.paper.tags;
	const NOTE_LINES = ed.note;
	const ROLE = {ai: C.grey, own: C.red};
	const svg = root.querySelector('svg');
	const defs = el(svg, 'defs');
	el(svg, 'rect', {width: 960, height: 540, fill: C.paper});
	const stage = el(svg, 'g');

	const text = (parent, x, y, str, {fs, family = FONT.sans, weight = 400, fill = C.ink, anchor = 'start', ls = 0, style, dataFs} = {}) => {
		const attrs = {x, y, 'font-family': family, 'font-size': fs, 'font-weight': weight, fill, 'text-anchor': anchor, 'letter-spacing': ls, ...(style ? {'font-style': style} : {})};
		if (dataFs !== false) attrs['data-fs'] = dataFs ?? fs;
		return el(parent, 'text', attrs, str);
	};
	const mono = (parent, x, y, str, opts = {}) => text(parent, x, y, str, {fs: 12, family: FONT.mono, weight: 600, ls: 1.2, ...opts});
	const serif = (parent, x, y, str, opts = {}) => text(parent, x, y, str, {family: FONT.serif, ...opts});
	let clipN = 0;
	const clipRect = (parent, r) => {
		const id = `ps-clip-${clipN++}`;
		const cp = el(defs, 'clipPath', {id});
		const rect = el(cp, 'rect', {...r, width: 0});
		return {g: el(parent, 'g', {'clip-path': `url(#${id})`}), rect};
	};
	const rise = (g, k) => set(g, {opacity: k, transform: `translate(0 ${mix(6, 0, k).toFixed(2)})`});
	const pulse = (t, span) => Math.sin(Math.PI * prog(t, ...span));

	// ---- layers ---------------------------------------------------------------
	const lineLayer = el(stage, 'g');
	const cardLayer = el(stage, 'g');
	const markLayer = el(stage, 'g');
	const paperLayer = el(stage, 'g');
	const facLayer = el(stage, 'g');
	const dotLayer = el(stage, 'g');

	// ---- task card --------------------------------------------------------------
	const task = el(stage, 'g');
	el(task, 'rect', {x: 656, y: 24, width: 290, height: 82, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.15});
	mono(task, 672, 46, ed.task.label);
	serif(task, 672, 72, ed.task.lines[0], {fs: 16});
	serif(task, 672, 92, ed.task.lines[1], {fs: 16});

	// ---- lines ----------------------------------------------------------------------
	const dashed = (stroke, w = 2.2) => el(lineLayer, 'line', {stroke, 'stroke-width': w, 'stroke-dasharray': '6 5', 'stroke-linecap': 'butt', opacity: 0});
	const solid = (stroke, w = 2.2) => el(lineLayer, 'line', {stroke, 'stroke-width': w, 'stroke-linecap': 'round', opacity: 0});
	// The first student's map: the AI's dashed lines, then a solid grey overlay as each is taken up.
	const linesA = AI_LINES.map(([a, b]) => ({k: key(a, b), s: seg(a, b), dash: dashed(C.grey), solid: solid(C.grey)}));
	// The second student's own red lines, the one that doesn't hold, and the AI's map for them.
	const redB = RED_ORDER.map(([a, b]) => ({k: key(a, b), s: seg(a, b), node: solid(C.red, 2.4)}));
	const red34 = {k: '3-4', s: seg('3', '4'), node: solid(C.red, 2.4)};
	const try12 = {s: seg('1', '2'), node: solid(C.red, 2.4)};
	const aiB = AI_LINES.map(([a, b]) => ({k: key(a, b), s: seg(a, b), dash: dashed(C.grey)}));

	// ---- cards ------------------------------------------------------------------------
	const cards = {};
	for (const id of IDS) {
		const c = CARDS[id];
		const g = el(cardLayer, 'g');
		const box = el(g, 'rect', {x: c.x, y: c.y, width: CARD.w, height: CARD.h, rx: 3, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.15});
		el(g, 'rect', {x: c.x + 10, y: c.y + 11, width: 18, height: 18, rx: 3, fill: C.paper, stroke: C.ink, 'stroke-opacity': 0.2});
		mono(g, c.x + 19, c.y + 24.5, id, {anchor: 'middle', ls: 0});
		text(g, c.x + 36, c.y + 26, c.title, {fs: 15, weight: 600});
		const bars = [120, 84].map((w, i) => el(g, 'rect', {x: c.x + 36, y: c.y + 42 + 7 * i, width: w, height: 3, rx: 1, fill: C.ink, opacity: 0}));
		cards[id] = {g, box, bars};
	}
	const aiTag = mono(markLayer, 770, 300, L.aiMap, {fill: C.grey});

	// The cross and the note on the connection that doesn't hold.
	const cross = el(markLayer, 'g', {opacity: 0});
	el(cross, 'line', {x1: -6, y1: -6, x2: 6, y2: 6, stroke: C.red, 'stroke-width': 2.6, 'stroke-linecap': 'round'});
	el(cross, 'line', {x1: -6, y1: 6, x2: 6, y2: -6, stroke: C.red, 'stroke-width': 2.6, 'stroke-linecap': 'round'});
	const noteG = el(markLayer, 'g');
	const noteClips = NOTE_LINES.map((s, i) => {
		const c = clipRect(noteG, {x: 0, y: 140 + 18 * i - 14, height: 20});
		const n = serif(c.g, X_AT.x, 140 + 18 * i, s, {fs: 15, style: 'italic', fill: C.red, anchor: 'middle'});
		return {...c, n, w: 0};
	});

	// ---- papers --------------------------------------------------------------------------
	const paper = (which) => {
		const g = el(paperLayer, 'g');
		const shadow = el(g, 'rect', {x: 3, y: 4, width: P.w, height: P.h, rx: 1, fill: C.ink, 'fill-opacity': 0.06});
		el(g, 'rect', {x: 0, y: 0, width: P.w, height: P.h, rx: 1, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.18, 'stroke-width': 1.2});
		// Titles are shown or hidden by render (they shrink with the paper), so no data-fs.
		const title = ed.paper.title.map((s, i) => {
			const c = clipRect(g, {x: P.padX - 2, y: P.title[i] - 18, height: 24});
			return {...c, n: serif(c.g, P.padX, P.title[i], s, {fs: 19, weight: 600, dataFs: false}), w: 0};
		});
		const bars = PAR_Y.map((ys, pi) => ys.map((y, bi) => {
			const w = WIDTHS[which][pi][bi];
			return w == null ? null : {w, node: el(g, 'rect', {x: P.padX, y, width: 0, height: P.barH, rx: 1, fill: C.ink, 'fill-opacity': 0.82})};
		}));
		const tags = TAGS.map((s, i) => mono(g, P.tagX, TAG_Y[i], s, {weight: 500, ls: 0, anchor: 'end', opacity: 0}));
		const aiNote = mono(g, P.padX, 154, ed.paper.aiNote, {fill: C.grey, ls: 0.4, opacity: 0});
		return {g, shadow, title, bars, tags, aiNote};
	};
	const papers = {a: paper('a'), b: paper('b')};
	const paperLabel = {
		a: mono(paperLayer, 24, 168, L.paperA, {weight: 500}),
		b: mono(paperLayer, 24, 354, L.paperB, {weight: 500}),
	};
	// One line above the papers in beat 6; two lines beside them once they move aside.
	const head1 = mono(paperLayer, 24, 140, L.receive);
	const head2 = mono(paperLayer, 24, 140, L.sameArgInline, {weight: 500});
	let head2X = 200;
	const bothAI = mono(paperLayer, 372, 80, L.bothAI, {fill: C.grey});

	// ---- faculty side -----------------------------------------------------------------------
	const q1 = el(facLayer, 'g');
	mono(q1, 350, 160, L.q1Label);
	serif(q1, 350, 184, L.q1, {fs: 17, style: 'italic'});
	const q2 = el(facLayer, 'g');
	mono(q2, 620, 160, L.q2Label);
	serif(q2, 620, 184, L.q2[0], {fs: 17, style: 'italic'});
	serif(q2, 620, 204, L.q2[1], {fs: 17, style: 'italic'});

	const seq = (parent, x, y, parts) => {
		const n = mono(parent, x, y, '', {weight: 500, ls: 0.5});
		parts.forEach(({t: s, role}) => { const sp = el(n, 'tspan', {fill: ROLE[role] || C.ink}); sp.textContent = s; });
		return n;
	};
	const rowLab = [el(facLayer, 'g'), el(facLayer, 'g')];
	// Students are named in red, as the dots are (and as on the phone stage).
	text(rowLab[0], 24, 280, L.rowA, {fs: 13, weight: 600, fill: C.red});
	seq(rowLab[0], 24, 300, L.seqA);
	text(rowLab[1], 24, 446, L.rowB, {fs: 13, weight: 600, fill: C.red});
	seq(rowLab[1], 24, 466, L.seqB);

	const sketches = [0, 1].map((row) => {
		const g = el(facLayer, 'g');
		const lines = AI_LINES.map(([a, b]) => {
			const na = node(row, a), nb = node(row, b);
			const d = Math.hypot(nb.x - na.x, nb.y - na.y), off = SK.r + 2;
			const s = [lerp(na, nb, off / d), lerp(nb, na, off / d)];
			return {k: key(a, b), s, node: el(g, 'line', {stroke: C.ink, 'stroke-width': 1.6, 'stroke-linecap': 'round', opacity: 0})};
		});
		const nodes = IDS.map((id) => {
			const p = node(row, id);
			const ng = el(g, 'g', {opacity: 0});
			el(ng, 'circle', {cx: p.x, cy: p.y, r: SK.r, fill: C.bright, stroke: C.ink, 'stroke-width': 1.2});
			mono(ng, p.x, p.y + 4.2, id, {anchor: 'middle', ls: 0});
			return ng;
		});
		const mid = lerp(node(row, '2'), node(row, '5'), 0.5);
		const ring = el(g, 'circle', {cx: mid.x, cy: mid.y, r: 16, fill: 'none', stroke: C.ink, 'stroke-width': 1.5, opacity: 0});
		return {g, lines, nodes, ring, mid};
	});
	const RING_LEN = 2 * Math.PI * 16;

	const panels = PANEL.rows.map((p) => {
		const g = el(facLayer, 'g', {opacity: 0});
		el(g, 'rect', {x: PANEL.x, y: p.y, width: PANEL.w, height: p.h, rx: 8, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.25, 'stroke-width': 1});
		const cy = p.y + p.h / 2;
		el(g, 'path', {d: `M${PANEL.x + 0.5} ${cy - 7}L${PANEL.x - 9} ${cy}L${PANEL.x + 0.5} ${cy + 7}`, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.25, 'stroke-width': 1});
		const lines = p.lines.map((s, i) => {
			const c = clipRect(g, {x: PANEL.x + PANEL.padX - 4, y: p.y + p.base[i] - 15, height: 21});
			return {...c, n: serif(c.g, PANEL.x + PANEL.padX, p.y + p.base[i], s, {fs: PANEL.fs}), w: 0};
		});
		return {g, lines};
	});

	const learned = el(facLayer, 'g', {opacity: 0});
	const learnedLabel = mono(learned, 620, 476, L.learned, {fill: C.red});
	const lx = el(learned, 'g', {transform: 'translate(627 493)'});
	el(lx, 'line', {x1: -4, y1: -4, x2: 4, y2: 4, stroke: C.red, 'stroke-width': 2, 'stroke-linecap': 'round'});
	el(lx, 'line', {x1: -4, y1: 4, x2: 4, y2: -4, stroke: C.red, 'stroke-width': 2, 'stroke-linecap': 'round'});
	NOTE_LINES.forEach((s, i) => serif(learned, 640, 498 + 18 * i, s, {fs: 15, style: 'italic', fill: C.red}));
	// Optional (editions that cite a study): a one-line source under the final frame,
	// bottom left. On the stacked stage it sits under the controls, outside the fitted player.
	const sourceLine = L.source ? serif(facLayer, 24, 524, L.source, {fs: 13, style: 'italic'}) : null;
	const stackedSource = root.querySelector('[data-ps-source]');
	if (stackedSource && NW.source) { stackedSource.textContent = NW.source; stackedSource.hidden = false; }

	// ---- dots ------------------------------------------------------------------------------
	const dotA = el(dotLayer, 'circle', {r: 0, fill: C.red});
	const labA = text(dotLayer, 300, 262, L.dotA, {fs: 13, weight: 600, fill: C.red, anchor: 'end'});
	const dotB = el(dotLayer, 'circle', {r: 0, fill: C.red});
	const labB = text(dotLayer, 300, 448, L.dotB, {fs: 13, weight: 600, fill: C.red, anchor: 'end'});
	const dotsF = [0, 1].map(() => el(dotLayer, 'circle', {r: 0, fill: C.red}));

	// ---- measuring and paths ---------------------------------------------------------------
	let pathA = () => HOME_A, pathB = () => HOME_B, pathF = [() => DOT_ROW[0], () => DOT_ROW[1]], ready = false;
	let pxPerUnit = 1;
	const world = (which, lx, ly) => ({x: PAPER_AT[which].x + lx, y: PAPER_AT[which].y + ly});

	function measure() {
		noteClips.forEach((c) => { c.w = c.n.getComputedTextLength(); set(c.rect, {x: X_AT.x - c.w / 2 - 3}); });
		for (const p of Object.values(papers)) {
			p.title.forEach((tl) => { tl.w = tl.n.getComputedTextLength(); });
		}
		panels.forEach((p) => p.lines.forEach((l) => { l.w = l.n.getComputedTextLength(); }));
		head2X = 24 + head1.getComputedTextLength() + 10;

		// Reading: the dot visits each card's left edge, 0.45 s a card.
		const readSegs = (start, t0) => {
			const segs = [];
			let prev = start;
			READ_ORDER.forEach((id, k) => {
				const a = t0 + T.read * k, target = {x: CARDS[id].x - 9, y: CARDS[id].y + 20};
				segs.push([a, a + 0.25, prev, target, E.inOut]);
				prev = target;
			});
			return {segs, prev};
		};
		// Writing a paper: along each title line, then each bar.
		const writeSegs = (which, titleSpan, paraSpans) => {
			const segs = [];
			const p = papers[which];
			const tw = p.title.map((tl) => tl.w), tot = tw[0] + tw[1];
			let a = titleSpan[0];
			p.title.forEach((tl, i) => {
				const d = (titleSpan[1] - titleSpan[0]) * (tw[i] / tot);
				const y = P.title[i] - 6;
				segs.push([a, a + d, world(which, P.padX, y), world(which, P.padX + tw[i], y)]);
				a += d;
			});
			paraSpans.forEach((span, pi) => {
				const items = p.bars[pi].map((b, bi) => ({x0: P.padX, x1: P.padX + b.w, y: PAR_Y[pi][bi] + 2}));
				const dur = (span[1] - span[0]) * 0.86;
				const lens = items.map((it) => it.x1 - it.x0), L = lens.reduce((s, v) => s + v, 0);
				let b = span[0];
				items.forEach((it, i) => {
					const d = dur * (lens[i] / L);
					segs.push([b, b + d, world(which, it.x0, it.y), world(which, it.x1, it.y)]);
					b += d;
				});
			});
			return segs;
		};
		const paraSpansA = [0, 1, 2].map((i) => [T.parasA + T.para * i, T.parasA + T.para * (i + 1)]);
		const paraSpansB = [T.p1B, T.p2B, T.p3B];

		// The first student's dot.
		{
			const {segs, prev: afterRead} = readSegs(HOME_A, T.readA);
			segs.push([T.returnA[0], T.returnA[1], afterRead, HOME_A, E.inOut]);
			let prev = HOME_A;
			linesA.forEach((l, i) => {
				const a = T.traceA + T.trace * i;
				segs.push([a, a + 0.12, prev, l.s[0], E.inOut]);
				segs.push([a + 0.12, a + T.trace, l.s[0], l.s[1]]);
				prev = l.s[1];
			});
			const write = writeSegs('a', T.titleA, paraSpansA);
			segs.push([T.toSheetA[0], T.toSheetA[1], prev, write[0][2], E.inOutStrong]);
			segs.push(...write);
			pathA = pathAt(segs, HOME_A);
		}
		// The second student's dot.
		{
			const {segs, prev: afterRead} = readSegs(HOME_B, T.readB);
			let prev = afterRead;
			redB.forEach((l, i) => {
				const a = T.redB + T.redStep * i;
				segs.push([a, a + 0.15, prev, l.s[0], E.inOut]);
				segs.push([a + 0.15, a + T.redStep, l.s[0], l.s[1]]);
				prev = l.s[1];
			});
			const [t0, t1] = T.try12;
			segs.push([t0, t0 + 0.15, prev, try12.s[0], E.inOut]);
			segs.push([t0 + 0.15, t1, try12.s[0], try12.s[1]]);
			// Check: stop at card 2, run back along the line, stop at card 1.
			segs.push([T.check12[0] + 0.45, T.check12[0] + 0.6, try12.s[1], try12.s[0], E.inOut]);
			segs.push([T.homeB[0], T.homeB[1], try12.s[0], HOME_B, E.inOut]);
			const c3 = {x: CARDS['3'].x - 9, y: CARDS['3'].y + 20}, c4 = {x: CARDS['4'].x + CARD.w + 9, y: CARDS['4'].y + 20};
			segs.push([T.check34[0], T.check34[0] + 0.2, HOME_B, c3, E.inOut]);
			segs.push([T.check34[0] + 0.5, T.check34[0] + 0.7, c3, c4, E.inOut]);
			segs.push([T.homeB2[0], T.homeB2[1], c4, HOME_B, E.inOut]);
			const write = writeSegs('b', T.titleB, paraSpansB);
			segs.push([T.toSheetB[0], T.toSheetB[1], HOME_B, write[0][2], E.inOut]);
			segs.push(...write);
			pathB = pathAt(segs, HOME_B);
		}
		// The faculty-side dots draw their sketches.
		pathF = [0, 1].map((row) => {
			const home = DOT_ROW[row], t0 = (row ? T.sketchB : T.sketchA) + 0.4;
			const segs = [];
			let prev = home;
			sketches[row].lines.forEach((l, i) => {
				const a = t0 + 0.2 * i;
				segs.push([a, a + 0.05, prev, l.s[0]]);
				segs.push([a + 0.05, a + 0.2, l.s[0], l.s[1]]);
				prev = l.s[1];
			});
			segs.push([t0 + 1.0, t0 + 1.3, prev, home, E.inOut]);
			return pathAt(segs, home);
		});
		ready = true;
	}

	/** Reveal clipped lines left to right across [t0, t1], in proportion to their widths. */
	const reveal = (items, t, t0, t1, pad = 8) => {
		const total = items.reduce((s, it) => s + it.w, 0);
		let a = t0;
		items.forEach((it) => {
			const d = (t1 - t0) * (it.w / total);
			set(it.rect, {width: (it.w + pad) * prog(t, a, a + d)});
			a += d;
		});
	};
	const openAmount = (t, t0, id, closeSpan) => {
		const k = READ_ORDER.indexOf(id);
		const a = t0 + T.read * k + 0.2;
		const open = prog(t, a, a + 0.25, E.house);
		return closeSpan ? open * (1 - prog(t, ...closeSpan, E.inOut)) : open;
	};
	const flash = (t, a, b) => (t >= a && t <= b ? Math.sin(Math.PI * prog(t, a, b)) : 0);

	const render = (t) => {
		if (!ready) return;
		const tk = prog(t, ...T.card, E.house);
		set(task, {opacity: tk, transform: `translate(0 ${mix(6, 0, tk).toFixed(2)})`});

		// Cards: fade in one at a time; open per student; fade out before the faculty side.
		const cardsOut = 1 - prog(t, ...T.fadeCards, E.inOut);
		IDS.forEach((id, i) => {
			const c = cards[id];
			const a = T.cardsIn + T.cardStep * (+id - 1);
			const inK = prog(t, a, a + 0.3, E.house);
			const studentA = t < T.fadeA[1] + 0.01;
			const open = studentA ? openAmount(t, T.readA, id, T.fadeA) : openAmount(t, T.readB, id);
			// Flashes when a student goes back to a card to check.
			let fl = 0;
			if (id === '2') fl = flash(t, T.check12[0], T.check12[0] + 0.45);
			if (id === '1') fl = flash(t, T.check12[0] + 0.6, T.check12[1]);
			if (id === '3') fl = flash(t, T.check34[0] + 0.2, T.check34[0] + 0.5);
			if (id === '4') fl = flash(t, T.check34[0] + 0.7, T.check34[1]);
			set(c.g, {opacity: inK * cardsOut});
			set(c.box, {height: CARD.h + CARD.open * open, 'stroke-opacity': 0.15 + 0.6 * fl, 'stroke-width': 1 + fl});
			c.bars.forEach((b) => set(b, {opacity: open * (0.7 + 0.3 * fl), height: 3 + fl}));
		});

		// The first student's map: dashed sweep, then taken up line by line; 2–5 heavy from the title.
		const outA = 1 - prog(t, ...T.fadeA, E.inOut);
		const sweepA = prog(t, ...T.sweepA, E.inOut);
		const heavyA = prog(t, ...T.heavyA, E.inOut);
		linesA.forEach((l, i) => {
			const a = T.traceA + T.trace * i + 0.12;
			const taken = prog(t, a, T.traceA + T.trace * (i + 1));
			let w = 2.2;
			if (l.k === '2-5') w = mix(2.2, 3.8, heavyA);
			TAG_LINES.forEach((ks, pi) => { if (pi > 0 && ks.includes(l.k)) w += 1.4 * pulse(t, [T.parasA + T.para * pi + 0.3, T.parasA + T.para * pi + 0.7]); });
			drawLine(l.dash, l.s, sweepA);
			drawLine(l.solid, l.s, taken);
			set(l.dash, {opacity: (sweepA > 0 ? 1 : 0) * outA, 'stroke-width': w});
			set(l.solid, {opacity: (taken > 0 ? 1 : 0) * outA, 'stroke-width': w});
		});
		set(aiTag, {opacity: (prog(t, ...T.tagA) * outA) + prog(t, ...T.tagB) * cardsOut});

		// The second student's map.
		const heavyB = prog(t, ...T.heavyB, E.inOut);
		const mergeK = prog(t, ...T.merge, E.inOut);
		const brighten = pulse(t, T.merge);
		const redW = (k) => {
			let w = 2.4 + 1.2 * brighten;
			if (k === '2-5') w = mix(w, 3.9, heavyB);
			TAG_LINES.forEach((ks, pi) => {
				const span = [T.p1B, T.p2B, T.p3B][pi];
				if (pi > 0 && ks.includes(k)) w += 1.4 * pulse(t, [span[1] - 0.2, span[1] + 0.2]);
			});
			return w;
		};
		redB.forEach((l, i) => {
			const a = T.redB + T.redStep * i + 0.15;
			drawLine(l.node, l.s, prog(t, a, T.redB + T.redStep * (i + 1)));
			set(l.node, {opacity: (t >= a ? 1 : 0) * cardsOut, 'stroke-width': redW(l.k)});
		});
		drawLine(red34.node, red34.s, prog(t, ...T.red34));
		set(red34.node, {opacity: (t >= T.red34[0] ? 1 : 0) * cardsOut, 'stroke-width': redW('3-4')});
		// The connection from 1 to 2: drawn, checked, crossed, pulled back.
		const tryK = prog(t, T.try12[0] + 0.15, T.try12[1]) * (1 - prog(t, ...T.retract, E.inOut));
		drawLine(try12.node, try12.s, tryK);
		set(try12.node, {opacity: t >= T.try12[0] + 0.15 && tryK > 0.001 ? 1 : 0});
		const xIn = spring(t, T.x[0], {stiffness: 260, damping: 18});
		const xHalf = mix(1, 0.5, prog(t, ...T.retract));
		const xBright = pulse(t, T.xBright);
		set(cross, {opacity: (t >= T.x[0] ? Math.min(1, xHalf + 0.5 * xBright) : 0) * cardsOut, transform: `translate(${X_AT.x} ${X_AT.y}) scale(${(Math.max(0, xIn) * (1 + 0.35 * xBright)).toFixed(3)})`});
		reveal(noteClips, t, ...T.note);
		set(noteG, {opacity: cardsOut});
		// The AI's map for the second student: dashed sweep; four merge into the red; 3–4 waits for the check.
		const sweepB = prog(t, ...T.sweepB, E.inOut);
		aiB.forEach((l) => {
			drawLine(l.dash, l.s, sweepB);
			const fade = l.k === '3-4' ? 1 - prog(t, ...T.red34) : 1 - mergeK;
			set(l.dash, {opacity: (sweepB > 0 ? 1 : 0) * fade * cardsOut});
		});

		// Papers: sheets fade in; titles, bars, tags and notes are written.
		const asideK = prog(t, ...T.aside, E.inOutStrong);
		const writePaper = (which, sheetSpan, titleSpan, paraSpans, aiSpan) => {
			const p = papers[which];
			// Paper B travels right before it rises, so it never crosses paper A.
			const kx = which === 'b' ? prog(t, T.aside[0], T.aside[0] + 0.7, E.inOut) : asideK;
			const ky = which === 'b' ? prog(t, T.aside[0] + 0.35, T.aside[1], E.inOutStrong) : asideK;
			const s = mix(1, ASIDE.s, ky);
			const from = PAPER_AT[which], to = ASIDE[which];
			const x = mix(from.x, to.x, kx), y = mix(from.y, to.y, ky), r = mix(0, to.r, ky);
			set(p.g, {opacity: prog(t, ...sheetSpan, E.house), transform: `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${r.toFixed(3)} ${(P.w * s / 2).toFixed(2)} ${(P.h * s / 2).toFixed(2)}) scale(${s.toFixed(4)})`});
			reveal(p.title, t, ...titleSpan, 6);
			const titleVisible = 19 * s * pxPerUnit >= 11;
			p.title.forEach((tl) => set(tl.n, {visibility: titleVisible ? 'visible' : 'hidden'}));
			const small = 1 - asideK; // tags and AI note leave as the paper shrinks
			paraSpans.forEach((span, pi) => {
				const items = p.bars[pi];
				const dur = (span[1] - span[0]) * 0.86;
				const lens = items.map((b) => b.w), L = lens.reduce((a, v) => a + v, 0);
				let a = span[0];
				items.forEach((b, bi) => {
					const d = dur * (lens[bi] / L);
					set(b.node, {width: b.w * prog(t, a, a + d)});
					a += d;
				});
				set(p.tags[pi], {opacity: prog(t, span[0] + dur, span[1] + 0.05) * small});
			});
			set(p.aiNote, {opacity: prog(t, ...aiSpan) * small});
		};
		writePaper('a', T.sheetA, T.titleA, [0, 1, 2].map((i) => [T.parasA + T.para * i, T.parasA + T.para * (i + 1)]), T.aiNoteA);
		writePaper('b', T.sheetB, T.titleB, [T.p1B, T.p2B, T.p3B], T.aiNoteB);
		set(paperLabel.a, {opacity: prog(t, ...T.sheetA) * (1 - prog(t, T.aside[0], T.aside[0] + 0.4))});
		set(paperLabel.b, {opacity: prog(t, ...T.sheetB) * (1 - prog(t, T.aside[0], T.aside[0] + 0.4))});
		const hk = prog(t, ...T.header, E.house);
		// The header fades out above the papers and back in beside them, so its two parts never cross.
		const moved = t >= (T.aside[0] + T.aside[1]) / 2;
		const headK = hk * (moved ? prog(t, T.aside[1] - 0.4, T.aside[1]) : 1 - prog(t, T.aside[0], T.aside[0] + 0.4));
		set(head1, {opacity: headK, x: moved ? 372 : 24, y: moved ? 44 : 140});
		set(head2, {opacity: headK, x: moved ? 372 : head2X, y: moved ? 62 : 140});
		const h2 = moved ? L.sameArg : L.sameArgInline;
		if (head2.textContent !== h2) head2.textContent = h2;
		set(bothAI, {opacity: prog(t, ...T.bothAI)});

		// Faculty side.
		rise(q1, prog(t, ...T.q1, E.house));
		rise(q2, prog(t, ...T.q2, E.house));
		const rk = prog(t, ...T.rows, E.house);
		rowLab.forEach((g) => set(g, {opacity: rk}));
		const pointK = prog(t, ...T.pointer, E.inOut);
		sketches.forEach((sk, row) => {
			const t0 = row ? T.sketchB : T.sketchA;
			const nk = prog(t, t0, t0 + 0.4, E.house);
			sk.nodes.forEach((n) => set(n, {opacity: nk}));
			sk.lines.forEach((l, i) => {
				const a = t0 + 0.4 + 0.2 * i + 0.05;
				drawLine(l.node, l.s, prog(t, a, a + 0.15));
				const main = l.k === '2-5';
				// While faculty point, the other lines stay navy and only thin, so nothing reads as AI grey.
				set(l.node, {opacity: t >= a ? 1 : 0, 'stroke-width': main ? mix(1.6, 4, pointK) : mix(1.6, 1.1, pointK)});
			});
			const rp = row ? pulse(t, T.ringPulseB) : 0;
			set(sk.ring, {opacity: pointK > 0 ? 1 : 0, r: 16 + 3 * rp, 'stroke-width': 1.5 + rp, 'stroke-dasharray': RING_LEN.toFixed(2), 'stroke-dashoffset': (RING_LEN * (1 - pointK)).toFixed(2)});
		});
		[T.ansA, T.ansB].forEach((span, i) => {
			const p = panels[i];
			const hidden = p.lines[0].n.getAttribute('visibility') === 'hidden';
			set(p.g, {opacity: prog(t, span[0], span[0] + 0.25), display: hidden ? 'none' : 'inline'});
			reveal(p.lines, t, span[0] + 0.15, span[1]);
		});
		if (sourceLine) set(sourceLine, {opacity: prog(t, T.check, T.check + 0.5)});
		const lk = prog(t, ...T.learned, E.house);
		set(learned, {opacity: lk, transform: `translate(0 ${mix(6, 0, lk).toFixed(2)})`, display: learnedLabel.getAttribute('visibility') === 'hidden' ? 'none' : 'inline'});

		// Dots.
		const pa = pathA(t);
		const growA = spring(t, T.dotIn, {stiffness: 300, damping: 20});
		set(dotA, {cx: pa.x, cy: pa.y, r: Math.max(0, 5 * growA + 2.5 * pulse(t, T.pulseA)), opacity: outA});
		set(labA, {opacity: prog(t, T.dotIn, T.dotIn + 0.4) * (1 - prog(t, ...T.labelAOut))});
		const pb = pathB(t);
		const growB = spring(t, T.dotB, {stiffness: 300, damping: 20});
		set(dotB, {cx: pb.x, cy: pb.y, r: Math.max(0, 5 * growB + 2.5 * pulse(t, T.pulseB)), opacity: cardsOut});
		set(labB, {opacity: prog(t, T.dotB, T.dotB + 0.4) * (1 - prog(t, ...T.labelBOut))});
		dotsF.forEach((d, row) => {
			const p = pathF[row](t);
			const g = spring(t, T.rows[0], {stiffness: 300, damping: 20});
			set(d, {cx: p.x, cy: p.y, r: Math.max(0, 5 * g)});
		});
		renderNarrow(t);
	};

	// ---- the narrow stage (below 480 px) ---------------------------------------------
	// A stacked text view of the same moments, driven by the same clock, at 13–16 px.
	// The SVG is collapsed at this width (see index.html).
	const narrow = root.querySelector('[data-ps-narrow]');
	const h = (tag, cls, parent, txt) => { const n = document.createElement(tag); if (cls) n.className = cls; if (txt != null) n.textContent = txt; parent.append(n); return n; };
	const N = {};
	const section = (k, label) => { const sec = h('div', 'ps-n-sec', narrow); if (label) h('p', 'ps-n-label', sec, label); N[k] = {sec}; return sec; };
	const chip = (parent, txt, cls) => h('span', `ps-n-chip ${cls}`, parent, txt);
	const LINK = (k) => k.replace('-', '–');
	// Optional (business): the task as one line, kept to the final frame.
	const taskLine = NW.taskLine ? h('p', 'ps-n-tl', narrow) : null;
	if (taskLine) { h('span', 'ps-n-tlk', taskLine, NW.taskLabel); taskLine.append(' ' + NW.taskLine); }
	{
		const sec = section('task', NW.taskLabel);
		h('p', 'ps-n-task', sec, ed.task.text);
	}
	{
		const sec = section('readings', NW.readingsLabel);
		const grid = h('div', 'ps-n-cards', sec);
		N.readings.cards = IDS.map((id) => { const c = h('span', 'ps-n-card', grid); h('b', null, c, id); c.append(' ' + CARDS[id].title); return c; });
	}
	{
		const sec = section('mapA', NW.mapA);
		const row = h('div', 'ps-n-links', sec);
		N.mapA.chips = linesA.map((l) => chip(row, LINK(l.k), 'is-ai'));
		N.mapA.main = h('p', 'ps-n-small', sec, NW.mapAMain);
	}
	const paperBlock = (parent, who) => {
		const box = h('div', 'ps-n-paper', parent);
		h('span', 'ps-n-who', box, who);
		h('p', 'ps-n-ptitle', box, NW.paperTitle);
		h('p', 'ps-n-tags', box, NW.paperTags);
		h('p', 'ps-n-ai', box, NW.paperAI);
		return box;
	};
	{
		const sec = section('paperA', null);
		N.paperA.box = paperBlock(sec, NW.paperA);
	}
	{
		const sec = section('mapB', NW.mapB);
		const row = h('div', 'ps-n-links', sec);
		N.mapB.chips = redB.map((l) => chip(row, LINK(l.k), 'is-own'));
		N.mapB.try = chip(row, '1–2', 'is-own is-try');
		N.mapB.note = h('p', 'ps-n-note', sec, NW.note);
		const ai = h('div', 'ps-n-links', sec);
		N.mapB.aiLabel = h('span', 'ps-n-inline', ai, NW.aiMap);
		N.mapB.c34 = chip(ai, '3–4', 'is-ai');
		N.mapB.match = h('p', 'ps-n-small', sec, NW.match);
	}
	{
		const sec = section('papers', NW.papers);
		const pair = h('div', 'ps-n-pair', sec);
		N.papers.a = paperBlock(pair, NW.pairA);
		N.papers.b = paperBlock(pair, NW.pairB);
	}
	{
		const sec = section('aside', null);
		h('p', 'ps-n-small', sec, NW.aside);
	}
	{
		const sec = section('rows', NW.rows);
		const row = (who, parts) => {
			const r = h('div', 'ps-n-row', sec);
			h('span', 'ps-n-who', r, who);
			const o = h('p', 'ps-n-order', r);
			parts.forEach(({t: txt, role}) => h('span', role ? `is-${role}` : null, o, txt));
			const sk = h('p', 'ps-n-sketch', r, NW.sketch);
			return {r, sk};
		};
		N.rows.a = row(NW.rowA, NW.orderA);
		N.rows.b = row(NW.rowB, NW.orderB);
	}
	{
		const sec = section('q2', NW.q2Label);
		h('p', 'ps-n-q', sec, NW.q2);
		const say = (who) => { const b = h('div', 'ps-n-say', sec); h('span', 'ps-n-who', b, who); return h('span', 'ps-n-txt', b, ''); };
		N.q2.a = say(NW.sayA);
		N.q2.b = say(NW.sayB);
		const l = h('div', 'ps-n-learned', sec);
		h('span', 'ps-n-llabel', l, NW.learned);
		h('p', 'ps-n-lnote', l, NW.learnedNote);
		N.q2.learned = l;
	}
	const ANS = [PANEL.rows[0].lines.join(' '), PANEL.rows[1].lines.join(' ')];
	const words = (str, k) => { const w = str.split(' '); return w.slice(0, Math.ceil(w.length * k)).join(' '); };
	const SHOW = [['task', 'readings'], ['readings', 'mapA'], ['mapA', 'paperA'], ['readings', 'mapB'], ['mapB'], ['papers'], ['aside', 'rows'], ['rows', 'q2'], ['q2'], ['rows', 'q2']];
	const beatIndex = (t) => { let i = 0; BEATS.forEach((b, j) => { if (t >= b.at) i = j; }); return i; };
	const fade = (node, k) => { node.style.opacity = k.toFixed(3); };
	function renderNarrow(t) {
		if (!narrow) return;
		const show = new Set(SHOW[beatIndex(t)]);
		for (const [k, v] of Object.entries(N)) v.sec.hidden = !show.has(k) || (k === 'task' && !!taskLine);
		fade(N.task.sec, prog(t, ...T.card));
		if (taskLine) fade(taskLine, prog(t, ...T.card));
		const studentB = t >= T.fadeA[1];
		N.readings.cards.forEach((c, i) => {
			const id = IDS[i], a = T.cardsIn + T.cardStep * i;
			fade(c, prog(t, a, a + 0.3));
			c.classList.toggle('is-read', openAmount(t, studentB ? T.readB : T.readA, id, studentB ? null : T.fadeA) > 0.5);
		});
		N.mapA.chips.forEach((c, i) => {
			fade(c, prog(t, ...T.sweepA));
			c.classList.toggle('is-taken', t >= T.traceA + T.trace * (i + 1));
			c.classList.toggle('is-main', linesA[i].k === '2-5' && t >= T.heavyA[0]);
		});
		fade(N.mapA.main, prog(t, ...T.heavyA));
		fade(N.paperA.box, prog(t, ...T.sheetA));
		N.mapB.chips.forEach((c, i) => fade(c, prog(t, T.redB + T.redStep * i, T.redB + T.redStep * (i + 1))));
		fade(N.mapB.try, prog(t, ...T.try12));
		N.mapB.try.classList.toggle('is-struck', t >= T.x[0]);
		fade(N.mapB.note, prog(t, ...T.note));
		fade(N.mapB.aiLabel, prog(t, ...T.sweepB));
		fade(N.mapB.c34, prog(t, ...T.sweepB));
		N.mapB.c34.classList.toggle('is-own', t >= T.red34[0]);
		N.mapB.c34.classList.toggle('is-ai', t < T.red34[0]);
		fade(N.mapB.match, prog(t, ...T.merge));
		fade(N.papers.a, 1);
		fade(N.papers.b, prog(t, ...T.sheetB));
		fade(N.rows.sec, prog(t, ...T.rows));
		fade(N.rows.a.sk, prog(t, T.sketchA, T.sketchA + 1.4));
		fade(N.rows.b.sk, prog(t, T.sketchB, T.sketchB + 1.4));
		// Optional (editions whose final stacked view needs the room): the sketches,
		// shown in beat 7, step back in the final beat.
		if (NW.hideSketchAtEnd) { const end = beatIndex(t) === BEATS.length - 1; N.rows.a.sk.hidden = end; N.rows.b.sk.hidden = end; }
		fade(N.q2.sec, prog(t, ...T.q2));
		const ka = prog(t, T.ansA[0] + 0.15, T.ansA[1]), kb = prog(t, T.ansB[0] + 0.15, T.ansB[1]);
		N.q2.a.textContent = words(ANS[0], ka);
		N.q2.b.textContent = words(ANS[1], kb);
		N.q2.a.parentNode.hidden = ka <= 0;
		N.q2.b.parentNode.hidden = kb <= 0;
		fade(N.q2.learned, prog(t, ...T.learned));
	}

	const BEATS = BEAT_AT.map((at, i) => ({at, ...ed.beats[i]}));
	BEATS[BEATS.length - 1].check = {...ed.check, followAt: T.follow};

	let player = null;
	// Measure once the fonts the new SVG text asks for are in (the text exists now).
	document.fonts.ready.then(() => {
		measure();
		legibility(root, svg, VW, 11);
		// At narrow widths the text stage replaces the picture, so the beat list shows its "On screen" lines.
		// The stacked text stage takes over whenever the smallest picture text (mono 12)
		// would render under 11 px at the runtime's letterboxed scale: phones, and short
		// windows such as 1280×720, where the capped stage would otherwise lose labels.
		const syncStacked = () => {
			const r = svg.getBoundingClientRect();
			if (!r.width) return;
			const scale = r.height ? Math.min(r.width / VW, r.height / 540) : r.width / VW;
			const stacked = 12 * scale < 11;
			if (stacked) root.classList.add('is-narrow');
			if (stacked !== root.classList.contains('is-stacked')) {
				root.classList.toggle('is-stacked', stacked);
				// Figure time (the scrubber is in player time, which adds the name card).
				renderNarrow(player ? player.time() : 0);
			}
		};
		new ResizeObserver(syncStacked).observe(svg);
		syncStacked();
		const syncScale = () => { const r = svg.getBoundingClientRect(); if (r.width) pxPerUnit = Math.min(r.width / VW, r.height ? r.height / 540 : Infinity); };
		new ResizeObserver(syncScale).observe(svg);
		syncScale();
		// Poster: beat 1 settled (the task, the six readings and the student), so the waiting stage isn't empty.
		// The nameplate opens on the name, keeps it in the corner strip, and ends on the definition.
		player = mount(root, {duration: T.end, render, beats: BEATS, poster: BEATS[1].at - 0.02,
			nameplate: {name: 'Premature synthesis', kicker: 'Failure mode 3 of 7', definition: 'The model connects the material before anyone has built the map.'}});
	});
	}
})();
