/* Institutional monoculture: motion figure 6 of 8. Built to storyboard.md
   (round 5, revised after figure cold read 2).
   Grey is what the AI supplied, red is a student's decision, navy is ink and
   faculty's work. Ten students in a seminar ask an AI for outlines that come
   back alike, write ten different papers that each hold up, and faculty line up
   each paper's one-line problem: differently worded, one frame, which faculty
   judge and bracket, and which the AI's outlines opened with. Faculty then ask
   what other frames the task could take, and the question stays open. Last, the
   same seminar is imagined the way the essay proposes (define the problem
   first, then have the AI challenge it): one possible spread, in words.
   Papers never move or merge in the first layout; only copies of their problem
   lines do. The picture scales to fit the viewport; below 480 px of figure
   width it gives way to a stacked text stage driven by the same clock. Every
   attribute is a pure function of t, so the runtime can play, scrub, hold (?t=)
   and export it frame by frame.

   Editions: every visible word comes from editions/<id>.json (the scenario) and
   ../../casts.json (role words), loaded by MotionFigures.loadEdition (?edition=,
   default PME). This file holds only the core: timeline, layout, motion, the
   colour grammar and the universal nameplate. */
(() => {
	const {mount, E, mix, prog, el, set, bracketPath, legibility, mixColor, FONT, loadEdition, fillPage, rich} = MotionFigures;
	const C = {paper: '#f6f1e8', bright: '#fffdfa', ink: '#0a2242', red: '#b81b2b', grey: '#5b564f', band: '#ded5c4'};
	const VW = 960;
	const N = 10;
	// Universal across editions: the failure mode's name, kicker and role-neutral definition.
	const NAMEPLATE = {name: 'Institutional monoculture', kicker: 'Failure mode 6 of 7', definition: 'Shared systems and defaults narrow the range of frames a group considers.'};

	// ---- timeline (absolute seconds, from the storyboard) -------------------
	const T = {
		card: [1.0, 1.6], papersIn: 1.7, paperStep: 0.1, paperDur: 0.3, ctx: 3.4, ctxStep: 0.75, ctxDur: 0.5,
		panel: [11.9, 12.3], req: 12.3, reqStep: 0.1, reqDur: 0.6, out: 14.6, outStep: 0.1, outDur: 0.6,
		write: 19.3, writeStep: 0.2, writeDur: 0.8, tagA: [22.0, 22.4], ring: 22.3, ringStep: 0.2,
		marks: [27.3, 27.9], lift: 28.3, liftStep: 0.7, liftDur: 0.7,
		read: 40.8, readStep: 0.12, readDur: 0.3, bracket: [42.8, 43.6],
		callout: [47.0, 47.8], grey: [48.5, 49.3],
		qmark: [55.9, 56.5],
		compact: [59.9, 61.1], blockB: [61.2, 61.8],
		red: 61.9, redStep: 0.1, redDur: 0.6, define: [61.9, 62.3],
		send: 67.1, sendStep: 0.06, sendDur: 0.5, ask: [69.1, 69.7],
		note: 69.4, noteStep: 0.1, noteDur: 0.5, challenges: [69.4, 69.8],
		writeB: 71.0, writeBStep: 0.08, writeBDur: 0.5, seqWrite: [71.0, 71.4], tagB: [71.8, 72.2],
		askOut: [75.3, 75.8], undim: [75.3, 76.5], ringB: 75.3, ringBStep: 0.1,
		groups: [[77.3, 78.3], [78.5, 79.5], [79.7, 80.7]], brackets: [80.9, 81.7],
		check: 87.8, follow: 90.8, qPulse: [90.8, 91.6], end: 96.3,
		source: [88.8, 89.3], answer: [61.2, 61.9], // used only by editions that supply them
	};
	const AT = [0, 10.9, 18.3, 26.3, 39.8, 46.0, 52.9, 58.9, 66.1, 74.3, 87.8]; // beat starts

	// ---- content (the words are the edition's) ---------------------------------------
	// problems: ten differently worded problems that set one goal. imagined.problems: the
	// same students, imagined, grouped under imagined.goals by the goal each sets.
	const LAYOUT_B = [3, 7, 0, 9, 5, 1, 8, 2, 6, 4]; // the same ten kinds, in a different order

	// ---- geometry ----------------------------------------------------------------
	const YA = 146, YB = 340; // compact block tops
	const PW = 80, PH = 104, SC = 0.55;
	const large = (i) => ({x: 40 + 100 * (i % 5), y: i < 5 ? 164 : 300, s: 1});
	const compact = (i, Y) => ({x: 24 + 56 * (i % 5), y: Y + 38 + (i < 5 ? 0 : 64), s: SC});
	const PANEL = {x: 24, y: 16, w: 276, h: 84}, PANEL_HC = 40; // the panel shrinks when the layout compacts
	const sendTo = (i, kC = 0) => ({x: 52 + 22 * i, y: PANEL.y + mix(PANEL.h, PANEL_HC, kC) - 4});
	const LIST = {x: 600, y0: 204, dy: 26};
	const CLIST = {x: 350, y0: YA + 36, dy: 15, s: 13 / 16};
	const BR_L = {x: 578, y: 184, w: 222, h: 264};
	const BR_C = {x: 340, y: YA + 24, w: 180, h: 152};
	// The AI's card keeps its full size in both layouts, so its label stays at 11 px or more.
	const CALL_L = {x: 330, y: 22, s: 1}, CALL_C = {x: 340, y: 64, s: 1}, CALL_W = 300, CALL_H = 70;
	const PILL_L = {x: 578, y: 157}, PILL_C = {x: 528, y: YA + 22};
	const Q_L = {x: 812, y: 240}, Q_C = {x: 675, y: 186}, QW = 120, QH = 72;
	const COLS = [340, 540, 750], COLW = 180;
	const lineYB = (k) => YB + 44 + 15 * k;

	const root = document.querySelector('#institutional-monoculture');
	const svg = root.querySelector('svg');
	// Page copy fillPage's rich text doesn't carry: links ([text](href)) in the essay quote
	// and the evidence list, and a bold lead ({lead, text}) on the example note.
	const linked = (str) => rich(str).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
	const pick = (ed, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), ed);
	function fillMore(ed) {
		document.querySelectorAll('[data-im-linked]').forEach((n) => { n.innerHTML = linked(pick(ed, n.dataset.imLinked) ?? ''); });
		document.querySelectorAll('[data-im-linked-items]').forEach((n) => {
			n.textContent = '';
			(pick(ed, n.dataset.imLinkedItems) || []).forEach((item) => { const li = document.createElement('li'); li.innerHTML = linked(item); n.append(li); });
		});
		document.querySelectorAll('[data-im-lead]').forEach((n) => {
			const v = pick(ed, n.dataset.imLead);
			n.innerHTML = v ? `<strong>${rich(v.lead)}</strong> ${rich(v.text)}` : '';
		});
	}
	Promise.all([loadEdition(root), document.fonts.ready]).then(([ed]) => { fillPage(document, ed); fillMore(ed); build(ed); });

	function build(ed) {
	const L = ed.labels, NW = ed.narrow;
	const LINES = ed.problems, LINES_B = ed.imagined.problems, GOALS = ed.imagined.goals, CTX = ed.context;
	// An edition's own clock (business): edits to the core clock, in core seconds. A cut skips a
	// static stretch; a hold freezes the core and adds time. With no edits (PME) both maps are
	// the identity, so the core renders exactly as before.
	const EDITS = ((ed.timeline && ed.timeline.edits) || []).slice().sort((a, b) => a.at - b.at);
	const toCore = (tau) => {
		let o = 0;
		for (const e of EDITS) {
			const bs = e.at + o;
			if (tau < bs) break;
			if (e.hold) { if (tau < bs + e.hold) return e.at; o += e.hold; } else o -= e.cut;
		}
		return tau - o;
	};
	const toBiz = (t) => { let o = 0; for (const e of EDITS) { if (e.at >= t) break; o += e.hold ? e.hold : -Math.min(e.cut, t - e.at); } return t + o; };
	el(svg, 'defs');
	el(svg, 'rect', {width: 960, height: 540, fill: C.paper});

	const text = (parent, x, y, str, {fs, family = FONT.sans, weight = 400, fill = C.ink, anchor = 'start', ls = 0, style} = {}) =>
		el(parent, 'text', {x, y, 'font-family': family, 'font-size': fs, 'font-weight': weight, fill, 'text-anchor': anchor, 'letter-spacing': ls, 'data-fs': fs, ...(style ? {'font-style': style} : {})}, str);
	const mono = (parent, x, y, str, opts = {}) => text(parent, x, y, str, {fs: 13, family: FONT.mono, weight: 600, ls: 1, ...opts});
	const serif = (parent, x, y, str, opts = {}) => text(parent, x, y, str, {family: FONT.serif, ...opts});
	const bar = (parent, x, y, w, h = 3.4, fill = C.ink, op = 0.75) => el(parent, 'rect', {x, y, width: w, height: h, fill, 'fill-opacity': op});
	const bump = (t, t0, t1) => Math.sin(Math.PI * prog(t, t0, t1));
	const staged = (t, t0, step, dur, i, ease) => prog(t, t0 + step * i, t0 + step * i + dur, ease);
	const lerp = (a, b, k) => ({x: mix(a.x, b.x, k), y: mix(a.y, b.y, k), s: mix(a.s ?? 1, b.s ?? 1, k)});
	const lerpBox = (a, b, k) => ({x: mix(a.x, b.x, k), y: mix(a.y, b.y, k), w: mix(a.w, b.w, k), h: mix(a.h, b.h, k)});
	const NSS = {'vector-effect': 'non-scaling-stroke'};

	// ---- layers ------------------------------------------------------------------
	const topLayer = el(svg, 'g');
	const gA = el(svg, 'g');
	const gB = el(svg, 'g');
	const flyLayer = el(svg, 'g');

	// ---- AI panel ----------------------------------------------------------------
	const panel = el(topLayer, 'g');
	const panelBox = el(panel, 'rect', {x: PANEL.x, y: PANEL.y, width: PANEL.w, height: PANEL.h, rx: 6, fill: C.band, 'fill-opacity': 0.4, stroke: C.grey, 'stroke-width': 1.5});
	mono(panel, 36, 34, L.ai, {fill: C.grey});

	// ---- task card -----------------------------------------------------------------
	const card = el(topLayer, 'g');
	el(card, 'rect', {x: 670, y: 16, width: 266, height: 122, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.15});
	mono(card, 686, 34, ed.task.label);
	serif(card, 686, 56, ed.task.lines[0], {fs: 15});
	serif(card, 686, 75, ed.task.lines[1], {fs: 15});
	const ctxRule = el(topLayer, 'line', {x1: 686, y1: 88, x2: 920, y2: 88, stroke: C.ink, 'stroke-opacity': 0.15});
	const ctxItems = [];
	CTX.forEach((row, r) => {
		const t = serif(topLayer, 686, 107 + 17 * r, '', {fs: 13.5});
		row.forEach((s, j) => ctxItems.push(el(t, 'tspan', {'fill-opacity': 0}, (j ? ' ' : '') + s)));
	});

	// ---- papers ----------------------------------------------------------------------
	function drawLayout(g, kind) {
		const L = el(g, 'g');
		switch (kind) {
			case 0: [20, 46, 72].forEach((y) => { bar(L, 8, y, 34, 4.5, C.ink, 1); bar(L, 8, y + 9, 62); bar(L, 8, y + 16, 50); }); break;
			case 1: [0, 1, 2, 3, 4, 5, 6].forEach((k) => { const y = 22 + 10.5 * k; el(L, 'circle', {cx: 10.5, cy: y + 1.7, r: 1.7, fill: C.ink}); bar(L, 16, y, [52, 44, 56, 38, 50, 46, 30][k]); }); break;
			case 2: bar(L, 8, 22, 64); bar(L, 8, 29, 58); bar(L, 8, 36, 40);
				el(L, 'line', {x1: 8, y1: 92, x2: 72, y2: 92, stroke: C.ink, 'stroke-opacity': 0.6});
				[[12, 18], [24, 30], [36, 12], [48, 24], [60, 36]].forEach(([x, h]) => el(L, 'rect', {x, y: 92 - h, width: 8, height: h, fill: C.ink, 'fill-opacity': 0.75})); break;
			case 3: el(L, 'rect', {x: 8, y: 22, width: 64, height: 60, fill: 'none', stroke: C.ink, 'stroke-opacity': 0.6});
				[37, 52, 67].forEach((y) => el(L, 'line', {x1: 8, y1: y, x2: 72, y2: y, stroke: C.ink, 'stroke-opacity': 0.45}));
				[30, 52].forEach((x) => el(L, 'line', {x1: x, y1: 22, x2: x, y2: 82, stroke: C.ink, 'stroke-opacity': 0.45}));
				bar(L, 8, 89, 56); break;
			case 4: for (let k = 0; k < 15; k++) bar(L, 8, 21 + 5.1 * k, [64, 60, 62, 50][k % 4], 2.6); break;
			case 5: for (let k = 0; k < 10; k++) { bar(L, 8, 22 + 7.2 * k, [30, 26, 30, 22][k % 4]); bar(L, 42, 22 + 7.2 * k, [28, 30, 24, 30][k % 4]); } break;
			case 6: for (let k = 0; k < 5; k++) { const y = 22 + 15 * k; el(L, 'rect', {x: 8, y, width: 3.4, height: 3.4, fill: C.ink}); bar(L, 15, y, 54); bar(L, 15, y + 6.5, 40); } break;
			case 7: bar(L, 8, 22, 64); bar(L, 8, 29, 52);
				el(L, 'rect', {x: 10, y: 38, width: 2.6, height: 23, fill: C.ink});
				[40, 47, 54].forEach((y, k) => bar(L, 16, y, [52, 48, 30][k], 4, C.ink, 0.9));
				[68, 75, 82, 89].forEach((y, k) => bar(L, 8, y, [62, 58, 64, 36][k])); break;
			case 8: el(L, 'line', {x1: 8, y1: 30, x2: 72, y2: 30, stroke: C.ink, 'stroke-width': 1.4});
				[12, 30, 48, 66].forEach((x) => el(L, 'circle', {cx: x, cy: 30, r: 2.6, fill: C.ink}));
				[44, 52, 60, 68, 76, 84, 92].forEach((y, k) => bar(L, 8, y, [60, 54, 62, 40, 58, 50, 34][k])); break;
			case 9: el(L, 'path', {d: 'M14 30C22 20 40 24 50 22C62 21 70 30 66 40C63 50 70 56 58 61C46 66 30 58 22 60C12 62 8 50 12 42C14 38 10 34 14 30Z', fill: C.ink, 'fill-opacity': 0.06, stroke: C.ink, 'stroke-opacity': 0.6, 'stroke-width': 1.1});
				el(L, 'circle', {cx: 40, cy: 42, r: 2.4, fill: C.ink});
				[72, 80, 88].forEach((y, k) => bar(L, 8, y, [62, 54, 42][k])); break;
		}
		return L;
	}
	// A speech bubble with a tail at its lower left.
	const bubblePath = (x, y, w, h, r = 6) => `M${x + r} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}V${y + h - r}Q${x + w} ${y + h} ${x + w - r} ${y + h}H${x + 16}L${x + 6} ${y + h + 8}L${x + 9} ${y + h}H${x + r}Q${x} ${y + h} ${x} ${y + h - r}V${y + r}Q${x} ${y} ${x + r} ${y}Z`;
	function makePaper(parent, i, run) {
		const p = {i, run};
		p.g = el(parent, 'g');
		el(p.g, 'rect', {x: 3, y: 3, width: PW, height: PH, fill: C.ink, 'fill-opacity': 0.06});
		el(p.g, 'rect', {x: 0, y: 0, width: PW, height: PH, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.2, 'stroke-width': 1.1, ...NSS});
		if (run === 'a') {
			// The AI's outline: the same pattern for every student.
			p.outline = el(p.g, 'g', {opacity: 0});
			el(p.outline, 'rect', {x: 4, y: 4, width: PW - 8, height: PH - 8, rx: 1.5, fill: C.band, 'fill-opacity': 0.8});
			[22, 48, 74].forEach((y) => { bar(p.outline, 8, y, 30, 4, C.grey, 1); bar(p.outline, 8, y + 9, 60, 2.8, C.grey, 0.85); bar(p.outline, 8, y + 16, 46, 2.8, C.grey, 0.85); });
		} else {
			// The AI's challenge: a question in a grey speech bubble under the student's own line.
			p.note = el(p.g, 'g', {opacity: 0});
			el(p.note, 'path', {d: bubblePath(16, 15, 58, 14, 5), fill: C.band, stroke: C.grey, 'stroke-width': 1, ...NSS});
			bar(p.note, 22, 19.5, 40, 2.2, C.grey, 1);
			bar(p.note, 22, 23.8, 28, 2.2, C.grey, 1);
		}
		const holder = el(p.g, 'g', run === 'b' ? {transform: 'translate(0 18) scale(1 0.8)'} : {});
		p.layout = el(holder, 'g', {opacity: 0});
		drawLayout(p.layout, run === 'a' ? i : LAYOUT_B[i]);
		// The one-line problem statement.
		p.first = el(p.g, 'rect', {x: 8, y: 9, width: 46, height: 4.5, fill: run === 'a' ? C.grey : C.red, opacity: 0});
		p.mark = el(p.g, 'rect', {x: 5, y: 6, width: 52, height: 10.5, rx: 2, fill: 'none', stroke: C.ink, 'stroke-width': 1, opacity: 0, ...NSS});
		p.ring = el(p.g, 'rect', {x: -5, y: -5, width: PW + 10, height: PH + 10, rx: 5, fill: 'none', stroke: C.ink, 'stroke-width': 1.6, opacity: 0, ...NSS});
		p.tick = el(p.g, 'path', {d: 'M62 8L66 12L75 2', fill: 'none', stroke: C.ink, 'stroke-width': 2.2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: 0});
		p.dot = el(p.g, 'circle', {cx: -2, cy: -2, r: 5, fill: C.red, opacity: 0});
		return p;
	}

	// ---- first seminar ----------------------------------------------------------------
	const nameA = text(gA, 40, 138, L.runA, {fs: 13, weight: 600, fill: C.red});
	const seqA = mono(gA, 0, 0, '', {ls: 0.4});
	el(seqA, 'tspan', {fill: C.grey}, L.seqA[0]);
	el(seqA, 'tspan', {}, ` → ${L.seqA[1]}`);
	const tagA = mono(gA, 0, 0, L.drafted, {fill: C.grey, ls: 0.4});
	const papersA = Array.from({length: N}, (_, i) => makePaper(gA, i, 'a'));
	// The lineup: each line with the faculty's reading mark.
	const lines = LINES.map((str) => {
		const g = el(gA, 'g', {opacity: 0});
		const t = serif(g, 0, 0, str, {fs: 16});
		t.setAttribute('data-fs', 13); // the smallest it is drawn (compact column)
		const mark = el(g, 'circle', {cx: -9, cy: -5, r: 2.4, fill: C.ink, opacity: 0});
		return {g, t, mark};
	});
	const bracketA = el(gA, 'g', {opacity: 0});
	const brPath = el(bracketA, 'path', {fill: 'none', stroke: C.ink, 'stroke-width': 2.4});
	const brLine = el(bracketA, 'rect', {fill: 'none', stroke: C.ink, 'stroke-opacity': 0.35, 'stroke-width': 1});
	const brLabelL = mono(gA, BR_L.x, BR_L.y + BR_L.h + 22, L.frame, {opacity: 0});
	const oneFrame = mono(gA, 348, YA + 4, L.oneFrame, {opacity: 0});
	const colLabelA = mono(gA, 348, YA + 18, L.frameGoal, {opacity: 0, ls: 0});
	// Whose frame: a grey pill beside the bracket, apart from the goal's name.
	const pill = el(gA, 'g', {opacity: 0});
	const pillBox = el(pill, 'rect', {x: 0, y: 0, width: 100, height: 21, rx: 10.5, fill: C.band, stroke: C.grey, 'stroke-width': 1.2});
	const pillText = mono(pill, 10, 15, L.aiFrame, {fill: C.grey, ls: 0.4});
	// Where the frame came from: the AI's opening line, traced to the bracket.
	const callout = el(gA, 'g', {opacity: 0});
	el(callout, 'rect', {x: 0, y: 0, width: CALL_W, height: CALL_H, rx: 6, fill: C.band, 'fill-opacity': 0.55, stroke: C.grey, 'stroke-width': 1.2});
	mono(callout, 14, 24, L.opened, {fill: C.grey, ls: 0.4});
	const callBand = el(callout, 'rect', {x: 10, y: 33, height: 26, rx: 2, fill: C.band});
	const callText = serif(callout, 14, 52, ed.aiOpening, {fs: 18, fill: C.grey});
	// Optional (business): the card is the viewer's view, labelled as unseen by the reviewer.
	if (L.unseen) mono(callout, 0, -7, L.unseen, {fill: C.grey, ls: 0.4});
	const leader = el(gA, 'line', {stroke: C.grey, 'stroke-width': 1.4, opacity: 0});
	// The faculty's question: dashed, empty, in open space, aligned with nothing that answers it.
	const qGroup = el(gA, 'g', {opacity: 0});
	const askLabel = mono(qGroup, 0, 0, L.ask, {ls: 0.6});
	const qPath = el(qGroup, 'path', {d: bracketPath({x: 0, y: 10, w: QW, h: QH}, 14), fill: 'none', stroke: C.ink, 'stroke-opacity': 0.5, 'stroke-width': 2, 'stroke-dasharray': '5 4'});
	el(qGroup, 'rect', {x: 0, y: 10, width: QW, height: QH, fill: 'none', stroke: C.ink, 'stroke-opacity': 0.25, 'stroke-dasharray': '4 4'});
	// The box holds a "?" (PME) or the manager's question in words (business, labels.askQ).
	if (L.askQ) L.askQ.forEach((ln, i) => serif(qGroup, QW / 2, 10 + QH / 2 + 21 * (i - (L.askQ.length - 1) / 2) + 6, ln, {fs: 17, style: 'italic', anchor: 'middle', fill: C.ink}));
	else serif(qGroup, QW / 2, 10 + QH / 2 + 10, '?', {fs: 28, style: 'italic', anchor: 'middle', fill: mixColor(C.ink, C.paper, 0.35)});

	// ---- imagined seminar ---------------------------------------------------------------
	const divider = el(gB, 'line', {x1: 24, y1: 331, x2: 936, y2: 331, stroke: C.ink, 'stroke-opacity': 0.15});
	text(gB, 24, YB + 12, L.runB, {fs: 13, weight: 600, fill: C.red});
	const seqB = mono(gB, 24, YB + 28, '', {ls: 0.2});
	const seqB1 = el(seqB, 'tspan', {fill: C.red}, L.seqB[0]);
	const seqB2 = el(seqB, 'tspan', {fill: C.grey}, ` → ${L.seqB[1]}`);
	const seqB3 = el(seqB, 'tspan', {}, ` → ${L.seqB[2]}`);
	const tagB = mono(gB, 24, YB + 176, L.drafted, {fill: C.grey, ls: 0.4});
	const headB = mono(gB, 348, YB + 4, L.answer || L.spread, {ls: 0.6});
	// Optional (business): the imagined board answers the manager's question. Its heading arrives
	// with the goals, and a navy line runs from the question box to it.
	const answerLine = L.answer ? el(gB, 'path', {fill: 'none', stroke: C.ink, 'stroke-width': 1.4, opacity: 0}) : null;
	const answerHead = L.answer ? el(gB, 'path', {fill: 'none', stroke: C.ink, 'stroke-width': 1.4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: 0}) : null;
	const papersB = Array.from({length: N}, (_, i) => makePaper(gB, i, 'b'));
	// The AI's challenge, once, in words.
	const askCard = el(gB, 'g', {opacity: 0});
	el(askCard, 'path', {d: `M372 ${YB + 36}H640Q648 ${YB + 36} 648 ${YB + 44}V${YB + 104}Q648 ${YB + 112} 640 ${YB + 112}H372Q364 ${YB + 112} 364 ${YB + 104}V${YB + 70}L350 ${YB + 64}L364 ${YB + 58}V${YB + 44}Q364 ${YB + 36} 372 ${YB + 36}Z`, fill: C.band, 'fill-opacity': 0.75, stroke: C.grey, 'stroke-width': 1.2});
	serif(askCard, 382, YB + 68, ed.aiChallenge[0], {fs: 18, style: 'italic', fill: C.grey});
	serif(askCard, 382, YB + 96, ed.aiChallenge[1], {fs: 18, style: 'italic', fill: C.grey});
	const goalLabels = GOALS.map((g, k) => mono(gB, COLS[k] + 8, YB + 22, g.label, {ls: 0}));
	const goalBrackets = GOALS.map((g, k) => {
		const h = 16 + 15 * g.who.length;
		const b = el(gB, 'g', {opacity: 0, transform: `translate(${COLS[k]} ${YB + 28})`});
		el(b, 'path', {d: bracketPath({x: 0, y: 0, w: COLW, h}, 12), fill: 'none', stroke: C.ink, 'stroke-width': 2});
		el(b, 'rect', {x: 0, y: 0, width: COLW, height: h, fill: 'none', stroke: C.ink, 'stroke-opacity': 0.35});
		return b;
	});
	const slotOf = {};
	GOALS.forEach((g, k) => g.who.forEach((i, j) => { slotOf[i] = {g: k, x: COLS[k] + 12, y: lineYB(j)}; }));
	// Optional (business): a one-line source under the final frame, below the imagined goals.
	const sourceLine = L.source ? text(gB, 340, YB + 176, L.source, {fs: 13, family: FONT.serif, style: 'italic', fill: C.ink}) : null;
	// The stacked view has no room under its last beat, so the source sits just under the
	// controls there (outside the fixed-height player).
	const stackedSource = root.querySelector('[data-im-source]');
	if (stackedSource && NW.source) { stackedSource.textContent = NW.source; stackedSource.hidden = false; }
	const linesB = LINES_B.map((str) => {
		const g = el(flyLayer, 'g', {opacity: 0});
		const t = serif(g, 0, 0, str, {fs: 16});
		t.setAttribute('data-fs', 13);
		return {g, t};
	});

	// ---- moving marks -----------------------------------------------------------------
	const reqDots = Array.from({length: N}, () => el(flyLayer, 'circle', {r: 3.6, fill: C.ink, opacity: 0}));
	const sends = Array.from({length: N}, () => el(flyLayer, 'rect', {height: 2.8, width: 25, rx: 1, fill: C.red, opacity: 0}));

	// ---- measure (build runs after fonts load) ------------------------------------------
	const M = {};
	function measure() {
		set(callBand, {width: callText.getComputedTextLength() + 8});
		M.pillW = pillText.getComputedTextLength() + 20;
		M.headW = headB.getComputedTextLength();
		set(pillBox, {width: M.pillW});
		// A label wider than the question box ends at the box's right edge (business:
		// "THE MANAGER ASKS"), so it stays clear of the stage edge; PME's fits and is unchanged.
		if (askLabel.getComputedTextLength() > QW) set(askLabel, {x: QW, 'text-anchor': 'end'});
	}

	// ---- render ---------------------------------------------------------------------------
	const placeA = (i, kC) => lerp(large(i), compact(i, YA), kC);
	function dotWrite(p, t, t0, dur) {
		// The dot runs down the paper's left edge while writing, then back.
		return Math.max(0, prog(t, t0, t0 + dur * 0.75, E.inOut) - prog(t, t0 + dur * 0.75, t0 + dur, E.inOut));
	}

	const render = (t) => {
		const kC = prog(t, ...T.compact, E.inOutStrong);
		const dim = 1 - 0.65 * (prog(t, ...T.compact) - prog(t, ...T.undim));

		// Task card and context.
		const kc = prog(t, ...T.card, E.house);
		set(card, {opacity: kc, transform: `translate(0 ${mix(6, 0, kc)})`});
		set(ctxRule, {opacity: prog(t, T.ctx, T.ctx + 0.4)});
		ctxItems.forEach((s, j) => set(s, {'fill-opacity': staged(t, T.ctx, T.ctxStep, T.ctxDur, j)}));

		// AI panel.
		set(panel, {opacity: prog(t, ...T.panel)});
		set(panelBox, {height: mix(PANEL.h, PANEL_HC, kC)});

		// ---- first seminar ------------------------------------------------------------
		set(gA, {opacity: dim});
		set(nameA, {opacity: prog(t, T.papersIn, T.papersIn + 0.6), transform: `translate(${mix(0, 24 - 40, kC)} ${mix(0, YA + 12 - 138, kC)})`});
		set(seqA, {x: mix(130, 24, kC), y: mix(138, YA + 28, kC), opacity: prog(t, ...T.tagA)});
		set(tagA, {x: mix(40, 24, kC), y: mix(432, YA + 176, kC), opacity: prog(t, ...T.tagA)});
		papersA.forEach((p, i) => {
			const pos = placeA(i, kC);
			set(p.g, {transform: `translate(${pos.x} ${pos.y}) scale(${pos.s})`, opacity: staged(t, T.papersIn, T.paperStep, T.paperDur, i)});
			const kO = staged(t, T.out, T.outStep, T.outDur, i, E.inOut);
			const kW = staged(t, T.write, T.writeStep, T.writeDur, i, E.inOut);
			const L = large(i);
			set(p.outline, {opacity: Math.min(1, kO * 3) * (1 - kW), transform: `translate(${(150 - L.x) * (1 - kO)} ${(50 - L.y) * (1 - kO)}) scale(${mix(0.22, 1, kO)})`});
			set(p.layout, {opacity: kW});
			set(p.first, {opacity: kO > 0.5 ? 1 : 0, fill: mixColor(C.grey, C.ink, kW)});
			const kD = staged(t, T.papersIn, T.paperStep, T.paperDur, i, E.house);
			const pulse = staged(t, T.req, T.reqStep, T.reqDur, i);
			set(p.dot, {r: 5 * Math.min(1, kD * 1.2) * (1 + 0.5 * Math.sin(Math.PI * pulse)), cy: -2 + 96 * dotWrite(p, t, T.write + T.writeStep * i, T.writeDur), opacity: kD});
			const r0 = T.ring + T.ringStep * i;
			set(p.ring, {opacity: bump(t, r0 - 0.05, r0 + 0.3)});
			set(p.tick, {opacity: prog(t, r0 + 0.12, r0 + 0.27)});
			const l0 = T.lift + T.liftStep * i;
			set(p.mark, {opacity: prog(t, ...T.marks) * (1 - prog(t, l0, l0 + 0.3))});
		});
		// Requests: a small ink mark travels from each student to the AI.
		reqDots.forEach((d, i) => {
			const L = large(i);
			const k = staged(t, T.req, T.reqStep, T.reqDur, i, E.inOut);
			const b = sendTo(i);
			set(d, {cx: mix(L.x - 2, b.x, k), cy: mix(L.y - 2, b.y, k), opacity: k > 0 && k < 1 ? 1 - prog(k, 0.8, 1) : 0});
		});

		// The lineup, the faculty's reading and their bracket.
		lines.forEach((l, i) => {
			const l0 = T.lift + T.liftStep * i;
			const kL = prog(t, l0, l0 + T.liftDur, E.inOut);
			const P = placeA(i, kC);
			const from = {x: P.x + 8, y: P.y + 13, s: 0.36};
			const at = {x: mix(LIST.x, CLIST.x, kC), y: mix(LIST.y0 + LIST.dy * i, CLIST.y0 + CLIST.dy * i, kC), s: mix(1, CLIST.s, kC)};
			const q = lerp(from, at, kL);
			set(l.g, {opacity: Math.min(1, kL * 3), transform: `translate(${q.x} ${q.y}) scale(${q.s})`});
			set(l.mark, {opacity: staged(t, T.read, T.readStep, T.readDur, i) * (1 - prog(t, T.compact[0], T.compact[0] + 0.4))});
		});
		const kB = prog(t, ...T.bracket, E.house);
		const kG = prog(t, ...T.grey);
		const box = lerpBox(BR_L, BR_C, kC);
		set(bracketA, {opacity: kB});
		set(brPath, {d: bracketPath(box, mix(20, 14, kC)), stroke: mixColor(C.ink, C.grey, kG)});
		set(brLine, {x: box.x, y: box.y, width: box.w, height: box.h, stroke: mixColor(C.ink, C.grey, kG)});
		set(brLabelL, {opacity: kB * (1 - prog(t, T.compact[0], T.compact[0] + 0.5))});
		const kCL = prog(t, T.compact[1] - 0.5, T.compact[1]);
		set(oneFrame, {opacity: kCL});
		set(colLabelA, {opacity: kCL});
		// The AI's opening line comes out of the panel, and a grey line traces it to the bracket.
		const kCa = prog(t, ...T.callout, E.house);
		const cAt = lerp(CALL_L, CALL_C, kC);
		set(callout, {opacity: Math.min(1, kCa * 2), transform: `translate(${mix(150, cAt.x, kCa)} ${mix(40, cAt.y, kCa)}) scale(${mix(0.3, 1, kCa)})`});
		const pAt = lerp(PILL_L, PILL_C, kC);
		set(pill, {opacity: kG, transform: `translate(${pAt.x} ${pAt.y})`});
		const la = {x: cAt.x + 220, y: cAt.y + CALL_H}, lb = {x: pAt.x + (M.pillW || 100) / 2, y: pAt.y};
		const len = Math.hypot(lb.x - la.x, lb.y - la.y);
		// With an unseen card (business) the drawn line settles dashed: a link for the viewer only.
		const dashed = L.unseen && kG >= 1;
		set(leader, {x1: la.x, y1: la.y, x2: lb.x, y2: lb.y, 'stroke-dasharray': dashed ? '5 4' : len, 'stroke-dashoffset': dashed ? 0 : len * (1 - kG), opacity: kG > 0 ? 1 : 0});
		// The faculty's question.
		const kQ = prog(t, ...T.qmark, E.house);
		const qAt = lerp(Q_L, Q_C, kC);
		set(qGroup, {opacity: kQ, transform: `translate(${qAt.x} ${qAt.y + mix(6, 0, kQ)})`});
		set(qPath, {'stroke-width': 2 + 1.6 * bump(t, ...T.qPulse), 'stroke-opacity': 0.5 + 0.4 * bump(t, ...T.qPulse)});

		// ---- imagined seminar ------------------------------------------------------------
		set(gB, {opacity: prog(t, ...T.blockB)});
		set(seqB1, {'fill-opacity': prog(t, ...T.define)});
		set(seqB2, {'fill-opacity': prog(t, ...T.challenges)});
		set(seqB3, {'fill-opacity': prog(t, ...T.seqWrite)});
		set(tagB, {opacity: prog(t, ...T.tagB)});
		set(headB, {opacity: L.answer ? prog(t, ...T.answer) : 1});
		if (answerLine) {
			const q = lerp(Q_L, Q_C, kC), x0 = q.x + QW / 2, y0 = q.y + 10 + QH + 4, x1 = 348 + (M.headW || 160) + 10, y1 = YB - 1;
			const len = (y1 - y0) + (x0 - x1), kA = prog(t, ...T.answer);
			set(answerLine, {d: `M${x0} ${y0}V${y1}H${x1}`, 'stroke-dasharray': len, 'stroke-dashoffset': len * (1 - kA), opacity: kA > 0 ? 1 : 0});
			set(answerHead, {d: `M${x1 + 6} ${y1 - 5}L${x1} ${y1}L${x1 + 6} ${y1 + 5}`, opacity: prog(kA, 0.85, 1)});
		}
		papersB.forEach((p, i) => {
			const pos = compact(i, YB);
			set(p.g, {transform: `translate(${pos.x} ${pos.y}) scale(${pos.s})`});
			const kR = staged(t, T.red, T.redStep, T.redDur, i, E.inOut);
			set(p.first, {opacity: kR > 0 ? 1 : 0, width: 46 * kR});
			const r0 = T.red + T.redStep * i;
			const kRun = Math.max(0, prog(t, r0, r0 + T.redDur * 0.8, E.inOut) - prog(t, r0 + T.redDur * 0.8, r0 + T.redDur, E.inOut));
			const kWr = dotWrite(p, t, T.writeB + T.writeBStep * i, T.writeBDur);
			const pulse = staged(t, T.send, T.sendStep, T.sendDur, i);
			set(p.dot, {r: 5 * (1 + 0.5 * Math.sin(Math.PI * pulse)), opacity: 1, cx: -2 + 58 * kRun, cy: -2 + 13 * kRun + 96 * kWr});
			const kN = staged(t, T.note, T.noteStep, T.noteDur, i, E.inOut);
			const dx = ((150 - pos.x) / SC) * (1 - kN), dy = ((40 - pos.y) / SC) * (1 - kN);
			set(p.note, {opacity: Math.min(1, kN * 3), transform: `translate(${dx} ${dy}) translate(40 22) scale(${mix(0.6, 1, kN)}) translate(-40 -22)`});
			set(p.layout, {opacity: staged(t, T.writeB, T.writeBStep, T.writeBDur, i)});
			const b0 = T.ringB + T.ringBStep * i;
			set(p.ring, {opacity: bump(t, b0, b0 + 0.25)});
			set(p.tick, {opacity: prog(t, b0 + 0.1, b0 + 0.22)});
		});
		set(askCard, {opacity: prog(t, ...T.ask, E.house) * (1 - prog(t, ...T.askOut))});
		// Red copies to the AI.
		sends.forEach((s, i) => {
			const pos = compact(i, YB);
			const b = sendTo(i, 1);
			const k = staged(t, T.send, T.sendStep, T.sendDur, i, E.inOut);
			set(s, {x: mix(pos.x + 8 * SC, b.x, k), y: mix(pos.y + 9 * SC, b.y, k), opacity: k > 0 && k < 1 ? 1 - 0.6 * prog(k, 0.7, 1) : 0});
		});
		// Lined up the same way, group by group, in words.
		linesB.forEach((l, i) => {
			const sl = slotOf[i];
			const k = prog(t, ...T.groups[sl.g], E.inOut);
			const pos = compact(i, YB);
			const q = lerp({x: pos.x + 8 * SC, y: pos.y + 13 * SC, s: 0.2}, {x: sl.x, y: sl.y, s: CLIST.s}, k);
			set(l.g, {opacity: Math.min(1, k * 3), transform: `translate(${q.x} ${q.y}) scale(${q.s})`});
			set(l.t, {fill: mixColor(C.red, C.ink, prog(k, 0, 0.6))});
		});
		goalLabels.forEach((g, k) => set(g, {opacity: prog(t, T.groups[k][0] + 0.3, T.groups[k][1])}));
		goalBrackets.forEach((b) => set(b, {opacity: prog(t, ...T.brackets, E.house)}));
		if (sourceLine) set(sourceLine, {opacity: prog(t, ...T.source)});
		set(divider, {opacity: 1});

		renderNarrow(t);
	};

	// ---- the stacked text stage (figures narrower than 480 px) ----------------------------
	// Each run is a row of paper glyphs over its board. Glyphs are large enough to watch
	// change, and the one changing pulses. Sections that arrive later stay display:none
	// until they arrive, so the held height is the tallest real moment.
	const narrow = root.querySelector('[data-im-narrow]');
	const h = (tag, cls, parent, txt) => { const n = document.createElement(tag); if (cls) n.className = cls; if (txt != null) n.textContent = txt; parent.append(n); return n; };
	const NR = {};
	{
		NR.task = h('div', 'im-n-task', narrow);
		const p1 = h('p', null, NR.task);
		h('b', null, p1, NW.taskLabel);
		p1.append(` ${ed.task.text}`);
		NR.ctxP = h('p', 'im-n-ctx', NR.task);
		NR.ctx = CTX.flat().map((s, j) => h('span', null, NR.ctxP, `${j ? ' ' : ''}${s}`));
		NR.ai = h('p', NW.keep ? 'im-n-ai is-keep' : 'im-n-ai', narrow);
		h('b', null, NR.ai, NW.ai);
		NR.open = h('span', 'im-n-open', NR.ai);
		NR.open.append(`${NW.opened} `);
		h('i', null, NR.open, ed.aiOpening);
		if (NW.unseen) h('span', 'im-n-unseen', NR.open, NW.unseen);
		NR.asks = h('span', 'im-n-open', NR.ai);
		NR.asks.append(`${NW.asks} `);
		h('i', null, NR.asks, ed.aiChallenge.join(' '));
		const run = (key) => {
			const r = {};
			r.el = h('section', 'im-n-run', narrow);
			const who = h('p', 'im-n-who', r.el);
			who.append(key === 'a' ? NW.runA : NW.runB);
			r.seq = h('span', 'im-n-seq', who);
			if (key === 'a') { h('span', 'g', r.seq, NW.seqA[0]); r.seq.append(` → ${NW.seqA[1]}`); }
			else { r.s1 = h('span', 'r', r.seq, NW.seqB[0]); r.s2 = h('span', 'g', r.seq, ` → ${NW.seqB[1]}`); r.s3 = h('span', null, r.seq, ` → ${NW.seqB[2]}`); }
			const grid = r.grid = h('div', 'im-n-grid', r.el);
			r.papers = Array.from({length: N}, () => {
				const p = h('span', 'im-n-paper', grid);
				h('i', 'ln', p); h('i', 'note', p); h('i', 'body', p); h('i', 'tick', p, '✓');
				return p;
			});
			r.tag = h('p', 'im-n-tag', r.el, NW.drafted);
			r.board = h('div', 'im-n-board', r.el);
			return r;
		};
		NR.a = run('a');
		NR.a.frame = h('p', 'im-n-frame', NR.a.board);
		NR.a.frameText = h('span', null, NR.a.frame, NW.frame);
		NR.a.pill = h('span', 'im-n-pill', NR.a.frame, NW.aiFrame);
		NR.a.q = h('span', 'im-n-q', NR.a.frame, '?');
		NR.a.lines = h('ol', 'im-n-lines', NR.a.board);
		NR.a.items = LINES.map((s) => h('li', null, NR.a.lines, s));
		if (NW.keep) NR.a.compact = h('p', 'im-n-compact', NR.a.board, [...LINES.slice(0, 3), NW.more].join(' · '));
		if (NW.askQ) NR.a.ask = h('p', 'im-n-ask', NR.a.board, NW.askQ);
		NR.b = run('b');
		NR.b.head = h('p', 'im-n-frame', NR.b.board, NW.answer || NW.spread);
		NR.b.groups = GOALS.map((g) => {
			const d = h('p', 'im-n-group', NR.b.board);
			h('b', null, d, g.name);
			d.append(g.who.map((i) => LINES_B[i]).join(' · '));
			return d;
		});
	}
	const fade = (node, k) => { node.style.opacity = Math.max(0, Math.min(1, k)).toFixed(3); };
	const vis = (node, on) => { node.style.visibility = on ? 'visible' : 'hidden'; };
	const show = (node, on) => { node.style.display = on ? '' : 'none'; };
	const near = (t, t0, d = 0.5) => t >= t0 && t < t0 + d;
	function renderNarrow(t) {
		if (!root.classList.contains('is-stacked')) return;
		fade(NR.task, prog(t, ...T.card));
		show(NR.ctxP, t < T.lift);
		NR.ctx.forEach((s, j) => vis(s, t >= T.ctx + T.ctxStep * j));
		vis(NR.ai, t >= T.panel[0]);
		show(NR.ai, NW.keep || t < T.askOut[0]);
		NR.ai.classList.toggle('is-pulse', near(t, T.req, 1.6) || near(t, T.send, 1.2) || near(t, T.callout[0], 0.8));
		show(NR.open, t >= T.callout[0] && (t < T.send || (NW.keep && t >= T.askOut[0])));
		show(NR.asks, t >= T.ask[0] && t < T.askOut[0]);
		// First seminar.
		const a = NR.a;
		const dim = 1 - 0.65 * (prog(t, ...T.compact) - prog(t, ...T.undim));
		fade(a.el, prog(t, T.papersIn, T.papersIn + 0.6) * dim);
		vis(a.seq, t >= T.tagA[0]);
		a.papers.forEach((p, i) => {
			const o0 = T.out + T.outStep * i, w0 = T.write + T.writeStep * i, r0 = T.ring + T.ringStep * i, l0 = T.lift + T.liftStep * i;
			const written = t >= w0 + T.writeDur * 0.5;
			p.classList.toggle('is-outline', t >= o0 && !written);
			p.classList.toggle('is-written', written);
			p.classList.toggle('is-ticked', t >= r0 + 0.12);
			p.classList.toggle('is-pulse', near(t, o0, 0.6) || near(t, w0, T.writeDur) || near(t, r0, 0.3) || near(t, l0, 0.7));
		});
		vis(a.tag, t >= T.tagA[0]);
		// Business keeps more words to the end, so the paper rows give way once the goals form.
		const rows = !(NW.keep && t >= T.groups[0][0]);
		show(a.grid, rows); show(a.tag, rows);
		show(a.board, t >= T.lift);
		vis(a.frameText, t >= T.bracket[0]);
		show(a.pill, t >= T.grey[0]);
		show(a.q, !a.ask && t >= T.qmark[0]);
		if (a.ask) { show(a.ask, t >= T.qmark[0]); a.ask.classList.toggle('is-pulse', near(t, T.qPulse[0], 0.8)); }
		a.q.classList.toggle('is-pulse', near(t, T.qPulse[0], 0.8));
		show(a.lines, t < T.compact[0]);
		if (a.compact) show(a.compact, t >= T.compact[0]);
		a.items.forEach((li, i) => { vis(li, t >= T.lift + T.liftStep * i + 0.3); li.classList.toggle('is-read', t >= T.read + T.readStep * i); });
		a.lines.classList.toggle('is-open', t < T.bracket[0]);
		a.lines.classList.toggle('is-ai', t >= T.grey[0]);
		// Imagined seminar.
		const b = NR.b;
		show(b.el, t >= T.blockB[0]);
		fade(b.el, prog(t, ...T.blockB));
		vis(b.s1, t >= T.define[0]); vis(b.s2, t >= T.challenges[0]); vis(b.s3, t >= T.seqWrite[0]);
		if (NW.answer) show(b.head, t >= T.answer[0]);
		b.papers.forEach((p, i) => {
			const r0 = T.red + T.redStep * i, n0 = T.note + T.noteStep * i, w0 = T.writeB + T.writeBStep * i, k0 = T.ringB + T.ringBStep * i;
			p.classList.toggle('is-red', t >= r0);
			p.classList.toggle('has-note', t >= n0 + 0.3);
			p.classList.toggle('is-written', t >= w0 + 0.25);
			p.classList.toggle('is-ticked', t >= k0 + 0.1);
			const g = slotOf[i].g;
			p.classList.toggle('is-pulse', near(t, r0, 0.6) || near(t, T.send + T.sendStep * i, 0.5) || near(t, n0, 0.5) || near(t, w0, 0.5) || near(t, T.groups[g][0], 1.0));
		});
		vis(b.tag, t >= T.tagB[0]);
		show(b.grid, rows); show(b.tag, rows);
		b.groups.forEach((g, k) => {
			show(g, t >= T.groups[k][0]);
			g.style.borderColor = t >= T.brackets[0] ? '' : 'transparent';
		});
	}
	let fitWidth = 0, player = null;
	const fitNarrow = () => {
		const now = player ? toCore(player.time()) : 0;
		narrow.style.minHeight = '0px';
		let max = 0;
		for (let t = 0; t <= T.end; t += 0.5) { renderNarrow(t); max = Math.max(max, narrow.scrollHeight); }
		renderNarrow(T.end); max = Math.max(max, narrow.scrollHeight);
		narrow.style.minHeight = `${Math.ceil(max)}px`;
		renderNarrow(now);
	};
	const syncStacked = () => {
		const r = svg.getBoundingClientRect();
		if (!r.width && !root.classList.contains('is-stacked')) return;
		// The papers carry the figure without labels, so the picture stays whenever there is
		// width for it; only a genuinely narrow figure gets the stacked text stage.
		const stacked = root.getBoundingClientRect().width < 480;
		if (stacked !== root.classList.contains('is-stacked')) {
			root.classList.toggle('is-stacked', stacked);
			renderNarrow(player ? toCore(player.time()) : 0);
		}
		const w = Math.round(root.getBoundingClientRect().width);
		if (stacked && w !== fitWidth) { fitWidth = w; fitNarrow(); }
	};

	// Beat times are core; an edition with its own clock maps them (identity for PME).
	const BEATS = AT.map((at, i) => ({at: toBiz(at), ...ed.beats[i]}));
	BEATS[BEATS.length - 1].check = {...ed.check, followAt: toBiz(T.follow)};
	const renderEd = EDITS.length ? (tau) => render(toCore(tau)) : render;

	// fonts.ready above resolved before the edition's words were on the page, so fonts
	// used only by them (the SVG's mono 600 and serif italic) may still be loading. Lay
	// the new text out so they start, wait for them, then measure.
	void document.body.offsetHeight;
	document.fonts.ready.then(() => {
		measure();
		legibility(root, svg, VW, 11);
		new ResizeObserver(syncStacked).observe(root);
		syncStacked();
		player = mount(root, {duration: toBiz(T.end), render: renderEd, beats: BEATS, poster: toBiz(AT[3] - 0.02), nameplate: NAMEPLATE});
	});
	}
})();
