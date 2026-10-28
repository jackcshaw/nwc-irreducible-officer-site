/* Institutional monoculture: motion figure 6 of 8. Built to storyboard.md
   (round 3, revised after storyboard cold read 2).
   Grey is what the AI supplied, red is a student's decision, navy is ink and
   faculty's work. Ten students in a seminar ask an AI for outlines that open
   the same way, write ten different papers that each hold up, and faculty line
   up each paper's one-line problem: one frame, the AI's. Then the same seminar
   is imagined the way the essay proposes (define the problem first, then have
   the AI challenge it): one possible result spreads across three goals. The
   figure ends on the check and a move faculty can run.
   Papers never move or merge in the first layout; only copies of their problem
   lines do. Whenever a picture label would render under 11 px (a stage
   narrower than 880 px), the SVG gives way to a stacked text stage driven by
   the same clock. Every attribute is a pure function of t, so the runtime can
   play, scrub, hold (?t=) and export it frame by frame. */
(() => {
	const {mount, E, mix, prog, el, set, bracketPath, legibility, mixColor, FONT} = MotionFigures;
	const C = {paper: '#f6f1e8', bright: '#fffdfa', ink: '#0a2242', red: '#b81b2b', grey: '#5b564f', band: '#ded5c4'};
	const VW = 960;
	const N = 10;

	// ---- timeline (absolute seconds, from the storyboard) -------------------
	const T = {
		card: [1.0, 1.6], papersIn: 1.7, paperStep: 0.1, paperDur: 0.3,
		ctxLabel: [3.4, 3.8], ctx: 3.4, ctxStep: 0.75, ctxDur: 0.5,
		panel: [12.5, 12.9], req: 12.9, reqStep: 0.1, reqDur: 0.4,
		out: 15.5, outStep: 0.1, outDur: 0.6, panelLine: [15.5, 16.1],
		write: 20.5, writeStep: 0.2, writeDur: 0.8, tagA: [23.2, 23.6], ring: 24.5, ringStep: 0.2,
		marks: [29.2, 29.8], lift: 31.2, liftStep: 0.7, liftDur: 0.7,
		details: [42.7, 43.3], under: 45.7, underStep: 0.1, underDur: 0.3, bracket: [47.1, 47.9],
		panelBump: [50.7, 51.3], grey: [52.2, 53.0],
		compact: [57.7, 58.9], panelLineOut: [57.7, 58.3], seqA: [58.5, 58.9], blockB: [59.0, 59.6],
		red: 61.0, redStep: 0.1, redDur: 0.6, define: [61.0, 61.4],
		send: 65.5, sendStep: 0.06, sendDur: 0.5, note: 69.2, noteStep: 0.1, noteDur: 0.5, challenges: [69.2, 69.6],
		writeB: 70.8, writeBStep: 0.08, writeBDur: 0.5, seqWrite: [70.8, 71.2], tagB: [71.6, 72.0],
		undim: [74.5, 75.7], ringB: 74.5, ringBStep: 0.1,
		groups: [[77.5, 78.3], [78.5, 79.3], [79.5, 80.3]], brackets: [80.5, 81.3],
		check: 83.5, qmark: [86.5, 87.1], follow: 86.5, end: 90.5,
	};

	// ---- content -----------------------------------------------------------------
	const LINES = [['Outbid', 'lenders'], ['Block', 'ports'], ['Counter', 'media'], ['Undersell', 'arms'], ['Undercut', 'traders'],
		['Outbuild', 'roads'], ['Track', 'fleets'], ['Outspend', 'grants'], ['Contest', 'mines'], ['Replace', 'cables']];
	const CTX = [['Our trade,', 'its ports,', 'its election,'], ['its minerals,', 'a rival’s loans.']];
	const GOALS = [
		{label: 'COUNTER THE RIVAL', who: [0, 1, 2]},
		{label: 'BACK THE PARTNER’S GOALS', who: [3, 4, 5, 7]},
		{label: 'SECURE WHAT WE NEED', who: [6, 8, 9]},
	];
	const LAYOUT_B = [3, 7, 0, 9, 5, 1, 8, 2, 6, 4]; // the same ten kinds, in a different order

	// ---- geometry ----------------------------------------------------------------
	const YA = 146, YB = 334; // compact block tops
	const PW = 80, PH = 104, SC = 0.55;
	const large = (i) => ({x: 40 + 100 * (i % 5), y: i < 5 ? 164 : 300, s: 1});
	const compact = (i, Y) => ({x: 24 + 56 * (i % 5), y: Y + 38 + (i < 5 ? 0 : 64), s: SC});
	const PANEL = {x: 24, y: 16, w: 276, h: 84};
	const PANEL_HC = 40; // the panel shrinks once its opening line has done its job
	const sendTo = (i, kC = 0) => ({x: 52 + 22 * i, y: PANEL.y + mix(PANEL.h, PANEL_HC, kC) - 4});
	const LIST = {x: 600, y0: 204, dy: 26};
	const CLIST = {x: 350, y0: YA + 36, dy: 15, s: 12.4 / 16};
	const BR_L = {x: 578, y: 184, w: 222, h: 264};
	const BR_C = {x: 340, y: YA + 24, w: 180, h: 152};
	const COLS = [340, 536, 732], COLW = 180;
	const chipY = (k) => YB + 36 + 11 * k;

	const root = document.querySelector('#institutional-monoculture');
	const svg = root.querySelector('svg');
	const defs = el(svg, 'defs');
	el(svg, 'rect', {width: 960, height: 540, fill: C.paper});

	const text = (parent, x, y, str, {fs, family = FONT.sans, weight = 400, fill = C.ink, anchor = 'start', ls = 0, style} = {}) =>
		el(parent, 'text', {x, y, 'font-family': family, 'font-size': fs, 'font-weight': weight, fill, 'text-anchor': anchor, 'letter-spacing': ls, 'data-fs': fs, ...(style ? {'font-style': style} : {})}, str);
	const mono = (parent, x, y, str, opts = {}) => text(parent, x, y, str, {fs: 12, family: FONT.mono, weight: 600, ls: 1, ...opts});
	const serif = (parent, x, y, str, opts = {}) => text(parent, x, y, str, {family: FONT.serif, ...opts});
	const bar = (parent, x, y, w, h = 3.4, fill = C.ink, op = 0.75) => el(parent, 'rect', {x, y, width: w, height: h, fill, 'fill-opacity': op});
	const bump = (t, t0, t1) => Math.sin(Math.PI * prog(t, t0, t1));
	const staged = (t, t0, step, dur, i, ease) => prog(t, t0 + step * i, t0 + step * i + dur, ease);
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
	mono(panel, 36, 34, 'AI', {fill: C.grey});
	const opening = el(panel, 'g');
	mono(opening, 36, 58, 'EVERY OUTLINE OPENS WITH', {fill: C.grey, ls: 0.6});
	const openBand = el(opening, 'rect', {x: 33, y: 68, height: 20, rx: 2, fill: C.band});
	const openText = serif(opening, 36, 83, 'Counter the rival’s influence', {fs: 15, fill: C.grey});
	const sheet = el(opening, 'g');
	el(sheet, 'rect', {x: 248, y: 26, width: 38, height: 60, rx: 1.5, fill: C.band, stroke: C.grey, 'stroke-opacity': 0.6});
	bar(sheet, 253, 32, 24, 3.4, C.grey, 1);
	[44, 58, 72].forEach((y) => { bar(sheet, 253, y, 18, 2.8, C.grey, 0.9); bar(sheet, 253, y + 6, 26, 2, C.grey, 0.6); });

	// ---- task card -----------------------------------------------------------------
	const card = el(topLayer, 'g');
	el(card, 'rect', {x: 670, y: 16, width: 266, height: 122, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.15});
	mono(card, 686, 34, 'EXAMPLE TASK');
	serif(card, 686, 54, 'Recommend a strategy for our', {fs: 15});
	serif(card, 686, 72, 'partnership with Country A.', {fs: 15});
	const ctxHead = el(topLayer, 'g');
	el(ctxHead, 'line', {x1: 686, y1: 82, x2: 920, y2: 82, stroke: C.ink, 'stroke-opacity': 0.15});
	mono(ctxHead, 686, 98, 'CONTEXT');
	const ctxItems = [];
	CTX.forEach((row, r) => {
		const t = serif(topLayer, 686, 114 + 16 * r, '', {fs: 13});
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
	function makePaper(parent, i, run) {
		const p = {i, run};
		p.g = el(parent, 'g');
		el(p.g, 'rect', {x: 3, y: 3, width: PW, height: PH, fill: C.ink, 'fill-opacity': 0.06});
		el(p.g, 'rect', {x: 0, y: 0, width: PW, height: PH, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.2, 'stroke-width': 1.1, ...NSS});
		// The AI's outline (first seminar): one pattern, small differences in line lengths.
		if (run === 'a') {
			p.outline = el(p.g, 'g', {opacity: 0});
			el(p.outline, 'rect', {x: 4, y: 4, width: PW - 8, height: PH - 8, rx: 1.5, fill: C.band, 'fill-opacity': 0.8});
			[22, 48, 74].forEach((y, k) => { bar(p.outline, 8, y, 30, 4, C.grey, 1); bar(p.outline, 8, y + 9, 58 + ((i * 3 + k * 5) % 7), 2.8, C.grey, 0.85); bar(p.outline, 8, y + 16, 44 + ((i * 5 + k * 3) % 9), 2.8, C.grey, 0.85); });
		} else {
			// The AI's challenge (imagined seminar): a grey note under the student's line.
			p.note = el(p.g, 'g', {opacity: 0});
			el(p.note, 'rect', {x: 6, y: 17, width: 56, height: 12, rx: 1.5, fill: C.band, stroke: C.grey, 'stroke-opacity': 0.7, 'stroke-width': 1, ...NSS});
			bar(p.note, 10, 20.5, 32, 2.4, C.grey, 1);
			bar(p.note, 10, 24.5, 22, 2.4, C.grey, 1);
		}
		// The student's own layout.
		const holder = el(p.g, 'g', run === 'b' ? {transform: 'translate(0 14) scale(1 0.84)'} : {});
		p.layout = el(holder, 'g', {opacity: 0});
		drawLayout(p.layout, run === 'a' ? i : LAYOUT_B[i]);
		// The one-line problem statement.
		p.first = el(p.g, 'rect', {x: 8, y: 9, width: 46, height: 4.5, fill: run === 'a' ? C.grey : C.red, opacity: 0});
		p.mark = el(p.g, 'rect', {x: 5, y: 6, width: 52, height: 10.5, rx: 2, fill: 'none', stroke: C.ink, 'stroke-width': 1, opacity: 0, ...NSS});
		// Faculty: ring and tick.
		p.ring = el(p.g, 'rect', {x: -5, y: -5, width: PW + 10, height: PH + 10, rx: 5, fill: 'none', stroke: C.ink, 'stroke-width': 1.6, opacity: 0, ...NSS});
		p.tick = el(p.g, 'path', {d: 'M62 8L66 12L75 2', fill: 'none', stroke: C.ink, 'stroke-width': 2.2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: 0});
		// The student.
		p.dot = el(p.g, 'circle', {cx: -2, cy: -2, r: 5, fill: C.red, opacity: 0});
		return p;
	}

	// ---- first seminar ----------------------------------------------------------------
	const nameA = text(gA, 40, 138, 'The seminar', {fs: 13, weight: 600, fill: C.red});
	const seqA = mono(gA, 24, YA + 28, '', {ls: 0.6});
	const seqA1 = el(seqA, 'tspan', {fill: C.grey}, 'AI OUTLINE');
	const seqA2 = el(seqA, 'tspan', {}, ' → WRITE');
	const tagA = mono(gA, 0, 0, 'ALL DRAFTED WITH AI', {fill: C.grey, ls: 0.6});
	const papersA = Array.from({length: N}, (_, i) => makePaper(gA, i, 'a'));
	// The lineup: one group per line (text, underline, wash behind the last word).
	const lines = LINES.map(([verb, noun]) => {
		const g = el(gA, 'g', {opacity: 0});
		const wash = el(g, 'rect', {y: -14, height: 19, rx: 2, fill: C.ink, 'fill-opacity': 0});
		const t = serif(g, 0, 0, `${verb} rival ${noun}`, {fs: 16});
		t.setAttribute('data-fs', 12.4); // the smallest it is drawn (compact column)
		const under = el(g, 'line', {y1: 4, y2: 4, stroke: C.ink, 'stroke-width': 1.3, opacity: 0});
		return {g, wash, t, under, verb, noun};
	});
	const bracketA = el(gA, 'g', {opacity: 0});
	const brPath = el(bracketA, 'path', {fill: 'none', stroke: C.ink, 'stroke-width': 2.4});
	const brLine = el(bracketA, 'rect', {fill: 'none', stroke: C.ink, 'stroke-opacity': 0.35, 'stroke-width': 1});
	const brLabelL = mono(gA, BR_L.x, BR_L.y + BR_L.h + 22, '', {opacity: 0});
	const brLabelPre = el(brLabelL, 'tspan', {}, 'ONE FRAME');
	el(brLabelL, 'tspan', {}, ': COUNTER THE RIVAL');
	const oneFrame = mono(gA, 340, YA + 4, 'ONE FRAME', {opacity: 0});
	const colLabelA = mono(gA, 348, YA + 18, 'COUNTER THE RIVAL', {opacity: 0});
	const aiFrameC = mono(gA, 348, YA + 18, 'AI’S FRAME', {fill: C.grey, opacity: 0});
	// The question: dashed, empty, in open space.
	const qGroup = el(gA, 'g', {opacity: 0});
	const Q = {x: 600, y: 200, w: 160, h: 76};
	el(qGroup, 'path', {d: bracketPath(Q, 16), fill: 'none', stroke: C.ink, 'stroke-opacity': 0.45, 'stroke-width': 2, 'stroke-dasharray': '5 4'});
	el(qGroup, 'rect', {x: Q.x, y: Q.y, width: Q.w, height: Q.h, fill: 'none', stroke: C.ink, 'stroke-opacity': 0.25, 'stroke-dasharray': '4 4'});
	serif(qGroup, Q.x + Q.w / 2, Q.y + Q.h / 2 + 10, '?', {fs: 28, style: 'italic', anchor: 'middle', fill: mixColor(C.ink, C.paper, 0.4)});

	// ---- imagined seminar ---------------------------------------------------------------
	const divider = el(gB, 'line', {x1: 24, y1: 327, x2: 936, y2: 327, stroke: C.ink, 'stroke-opacity': 0.15});
	const nameB = text(gB, 24, YB + 12, 'The same seminar, imagined', {fs: 13, weight: 600, fill: C.red});
	const seqB = mono(gB, 24, YB + 28, '', {ls: 0.6});
	const seqB1 = el(seqB, 'tspan', {fill: C.red}, 'DEFINE PROBLEM');
	const seqB2 = el(seqB, 'tspan', {fill: C.grey}, ' → AI CHALLENGES');
	const seqB3 = el(seqB, 'tspan', {}, ' → WRITE');
	const tagB = mono(gB, 24, YB + 176, 'ALL DRAFTED WITH AI', {fill: C.grey, ls: 0.6});
	const papersB = Array.from({length: N}, (_, i) => makePaper(gB, i, 'b'));
	const result = mono(gB, 340, YB + 4, 'ONE POSSIBLE RESULT');
	const goalLabels = GOALS.map((g, k) => mono(gB, COLS[k] + 8, YB + 18, g.label, {ls: 0.4}));
	const goalBrackets = GOALS.map((g) => {
		const h = 12 + 11 * g.who.length + 4;
		const b = el(gB, 'g', {opacity: 0});
		el(b, 'path', {d: bracketPath({x: 0, y: 0, w: COLW, h}, 12), fill: 'none', stroke: C.ink, 'stroke-width': 2});
		el(b, 'rect', {x: 0, y: 0, width: COLW, height: h, fill: 'none', stroke: C.ink, 'stroke-opacity': 0.35});
		return b;
	});
	goalBrackets.forEach((b, k) => set(b, {transform: `translate(${COLS[k]} ${YB + 24})`}));
	const slotOf = {};
	GOALS.forEach((g, k) => g.who.forEach((i, j) => { slotOf[i] = {k, x: COLS[k] + 15, y: chipY(j), g: k}; }));

	// ---- moving marks -----------------------------------------------------------------
	const reqLines = Array.from({length: N}, () => el(flyLayer, 'line', {stroke: C.ink, 'stroke-width': 1, opacity: 0}));
	const sends = Array.from({length: N}, () => el(flyLayer, 'rect', {height: 2.6, width: 25, rx: 1, fill: C.red, opacity: 0}));
	const chips = Array.from({length: N}, () => el(flyLayer, 'rect', {height: 5, rx: 2, fill: C.ink, opacity: 0}));

	// ---- measure (after fonts load) -------------------------------------------------------
	const M = {};
	function measure() {
		lines.forEach((l) => {
			const vLen = l.verb.length + 1; // "Verb "
			l.rx = l.t.getStartPositionOfChar(vLen).x;
			l.rw = l.t.getSubStringLength(vLen, 5);
			const nIdx = vLen + 6;
			l.nx = l.t.getStartPositionOfChar(nIdx).x;
			l.nw = l.t.getSubStringLength(nIdx, l.noun.length);
			set(l.wash, {x: l.nx - 2, width: l.nw + 4});
			set(l.under, {x1: l.rx, x2: l.rx});
		});
		set(openBand, {width: openText.getComputedTextLength() + 6});
		M.colLabelW = colLabelA.getComputedTextLength();
		set(aiFrameC, {x: 348 + M.colLabelW + 12});
	}

	// ---- render ---------------------------------------------------------------------------
	const placeA = (i, kC) => {
		const a = large(i), b = compact(i, YA);
		return {x: mix(a.x, b.x, kC), y: mix(a.y, b.y, kC), s: mix(a.s, b.s, kC)};
	};
	function dotWrite(p, t, t0, dur, kIn) {
		// The dot runs down the paper's left edge while writing, then back.
		const k = prog(t, t0, t0 + dur * 0.75, E.inOut) - prog(t, t0 + dur * 0.75, t0 + dur, E.inOut);
		set(p.dot, {cy: -2 + 96 * Math.max(0, k), opacity: kIn});
	}

	const render = (t) => {
		const kC = prog(t, ...T.compact, E.inOutStrong);
		const dim = 1 - 0.65 * (prog(t, ...T.compact) - prog(t, ...T.undim));

		// Task card and context.
		const kc = prog(t, ...T.card, E.house);
		set(card, {opacity: kc, transform: `translate(0 ${mix(6, 0, kc)})`});
		set(ctxHead, {opacity: prog(t, ...T.ctxLabel)});
		ctxItems.forEach((s, j) => set(s, {'fill-opacity': staged(t, T.ctx, T.ctxStep, T.ctxDur, j)}));

		// AI panel and its opening line.
		set(panel, {opacity: prog(t, ...T.panel)});
		set(panelBox, {height: mix(PANEL.h, PANEL_HC, kC)});
		set(opening, {opacity: prog(t, ...T.panelLine) * (1 - prog(t, ...T.panelLineOut))});
		set(openBand, {'fill-opacity': 1, fill: mixColor(C.band, '#c9bda6', bump(t, ...T.panelBump))});

		// ---- first seminar ------------------------------------------------------------
		set(gA, {opacity: dim});
		set(nameA, {opacity: prog(t, T.papersIn, T.papersIn + 0.6), transform: `translate(${mix(0, 24 - 40, kC)} ${mix(0, YA + 12 - 138, kC)})`});
		set(seqA, {opacity: prog(t, ...T.seqA)});
		const tagPos = {x: mix(40, 24, kC), y: mix(432, YA + 176, kC)};
		set(tagA, {x: tagPos.x, y: tagPos.y, opacity: prog(t, ...T.tagA)});
		papersA.forEach((p, i) => {
			const pos = placeA(i, kC);
			set(p.g, {transform: `translate(${pos.x} ${pos.y}) scale(${pos.s})`, opacity: staged(t, T.papersIn, T.paperStep, T.paperDur, i)});
			// The outline flies in from the AI panel, then drains as the student writes.
			const kO = staged(t, T.out, T.outStep, T.outDur, i, E.inOut);
			const kW = staged(t, T.write, T.writeStep, T.writeDur, i, E.inOut);
			const L = large(i);
			const dx = (150 - L.x) * (1 - kO), dy = (50 - L.y) * (1 - kO), s = mix(0.22, 1, kO);
			set(p.outline, {opacity: Math.min(1, kO * 3) * (1 - kW), transform: `translate(${dx} ${dy}) scale(${s})`});
			set(p.layout, {opacity: kW});
			set(p.first, {opacity: kO > 0.5 ? 1 : 0, fill: mixColor(C.grey, C.ink, kW)});
			const kD = staged(t, T.papersIn, T.paperStep, T.paperDur, i, E.house);
			const pulse = staged(t, T.req, T.reqStep, T.reqDur, i);
			set(p.dot, {r: 5 * Math.min(1, kD * 1.2) * (1 + 0.5 * Math.sin(Math.PI * pulse))});
			dotWrite(p, t, T.write + T.writeStep * i, T.writeDur, kD);
			// Faculty read each paper.
			const r0 = T.ring + T.ringStep * i;
			set(p.ring, {opacity: bump(t, r0 - 0.05, r0 + 0.3)});
			set(p.tick, {opacity: prog(t, r0 + 0.12, r0 + 0.27)});
			// Faculty pick out each paper's first line, then lift a copy.
			const l0 = T.lift + T.liftStep * i;
			set(p.mark, {opacity: prog(t, ...T.marks) * (1 - prog(t, l0, l0 + 0.3))});
		});
		// Request lines (first seminar).
		reqLines.forEach((ln, i) => {
			const L = large(i);
			const k = staged(t, T.req, T.reqStep, T.reqDur, i, E.inOut);
			const a = {x: L.x - 2, y: L.y - 2}, b = sendTo(i);
			const len = Math.hypot(b.x - a.x, b.y - a.y);
			const fade = 1 - prog(t, T.req + T.reqStep * i + T.reqDur, T.req + T.reqStep * i + T.reqDur + 0.25);
			set(ln, {x1: a.x, y1: a.y, x2: b.x, y2: b.y, 'stroke-dasharray': len, 'stroke-dashoffset': len * (1 - k), opacity: k > 0 ? fade : 0});
		});

		// The lineup.
		const kDet = (i) => bump(t, T.details[0] + 0.03 * i, T.details[0] + 0.03 * i + 0.3);
		lines.forEach((l, i) => {
			const l0 = T.lift + T.liftStep * i;
			const kL = prog(t, l0, l0 + T.liftDur, E.inOut);
			const P = placeA(i, kC);
			const from = {x: P.x + 8, y: P.y + 13, s: 0.36};
			const at = {x: mix(LIST.x, CLIST.x, kC), y: mix(LIST.y0 + LIST.dy * i, CLIST.y0 + CLIST.dy * i, kC), s: mix(1, CLIST.s, kC)};
			const x = mix(from.x, at.x, kL), y = mix(from.y, at.y, kL), s = mix(from.s, at.s, kL);
			set(l.g, {opacity: Math.min(1, kL * 3), transform: `translate(${x} ${y}) scale(${s})`});
			set(l.wash, {'fill-opacity': 0.14 * kDet(i)});
			const kU = staged(t, T.under, T.underStep, T.underDur, i, E.inOut);
			set(l.under, {x2: l.rx + (l.rw || 30) * kU, opacity: kU > 0 ? 1 : 0});
		});
		// The frame bracket: large, then grey, then compact.
		const kB = prog(t, ...T.bracket, E.house);
		const kG = prog(t, ...T.grey);
		const box = lerpBox(BR_L, BR_C, kC);
		set(bracketA, {opacity: kB});
		set(brPath, {d: bracketPath(box, mix(20, 14, kC)), stroke: mixColor(C.ink, C.grey, kG)});
		set(brLine, {x: box.x, y: box.y, width: box.w, height: box.h, stroke: mixColor(C.ink, C.grey, kG)});
		brLabelPre.textContent = t >= T.grey[0] + 0.4 ? 'AI’S FRAME' : 'ONE FRAME';
		set(brLabelL, {opacity: kB * (1 - bump(t, T.grey[0], T.grey[1])) * (1 - prog(t, T.compact[0], T.compact[0] + 0.5)), fill: t >= T.grey[0] + 0.4 ? C.grey : C.ink});
		const kCL = prog(t, T.compact[1] - 0.5, T.compact[1]);
		set(oneFrame, {opacity: kCL});
		set(colLabelA, {opacity: kCL});
		set(aiFrameC, {opacity: kCL});
		set(qGroup, {opacity: prog(t, ...T.qmark), transform: `translate(${Q.x + Q.w / 2} ${Q.y + Q.h / 2}) scale(${mix(0.92, 1, prog(t, ...T.qmark, E.house))}) translate(${-(Q.x + Q.w / 2)} ${-(Q.y + Q.h / 2)})`});

		// ---- imagined seminar ------------------------------------------------------------
		const kBIn = prog(t, ...T.blockB);
		set(gB, {opacity: kBIn});
		set(seqB1, {'fill-opacity': prog(t, ...T.define)});
		set(seqB2, {'fill-opacity': prog(t, ...T.challenges)});
		set(seqB3, {'fill-opacity': prog(t, ...T.seqWrite)});
		set(tagB, {opacity: prog(t, ...T.tagB)});
		papersB.forEach((p, i) => {
			const pos = compact(i, YB);
			set(p.g, {transform: `translate(${pos.x} ${pos.y}) scale(${pos.s})`});
			const kR = staged(t, T.red, T.redStep, T.redDur, i, E.inOut);
			set(p.first, {opacity: kR > 0 ? 1 : 0, width: 46 * kR});
			// The dot writes the red line, later writes the paper.
			const r0 = T.red + T.redStep * i;
			const kRun = prog(t, r0, r0 + T.redDur * 0.8, E.inOut) - prog(t, r0 + T.redDur * 0.8, r0 + T.redDur, E.inOut);
			const w0 = T.writeB + T.writeBStep * i;
			const kWr = prog(t, w0, w0 + T.writeBDur * 0.75, E.inOut) - prog(t, w0 + T.writeBDur * 0.75, w0 + T.writeBDur, E.inOut);
			set(p.dot, {r: 5, opacity: 1, cx: -2 + 58 * Math.max(0, kRun), cy: -2 + 13 * Math.max(0, kRun) + 96 * Math.max(0, kWr)});
			const pulse = staged(t, T.send, T.sendStep, T.sendDur, i);
			set(p.dot, {r: 5 * (1 + 0.5 * Math.sin(Math.PI * pulse))});
			// The AI's challenge note flies in from the panel.
			const kN = staged(t, T.note, T.noteStep, T.noteDur, i, E.inOut);
			const dx = (150 - pos.x) / SC * (1 - kN), dy = (40 - pos.y) / SC * (1 - kN);
			set(p.note, {opacity: Math.min(1, kN * 3), transform: `translate(${dx} ${dy}) translate(34 23) scale(${mix(0.6, 1, kN)}) translate(-34 -23)`});
			set(p.layout, {opacity: staged(t, T.writeB, T.writeBStep, T.writeBDur, i)});
			const b0 = T.ringB + T.ringBStep * i;
			set(p.ring, {opacity: bump(t, b0, b0 + 0.25)});
			set(p.tick, {opacity: prog(t, b0 + 0.1, b0 + 0.22)});
		});
		// Red copies to the AI.
		sends.forEach((s, i) => {
			const pos = compact(i, YB);
			const a = {x: pos.x + 8 * SC, y: pos.y + 9 * SC}, b = sendTo(i, 1);
			const k = staged(t, T.send, T.sendStep, T.sendDur, i, E.inOut);
			set(s, {x: mix(a.x, b.x, k), y: mix(a.y, b.y, k), opacity: k > 0 && k < 1 ? 1 - 0.6 * prog(k, 0.7, 1) : 0});
		});
		// Lined up by frame: one group at a time.
		chips.forEach((c, i) => {
			const sl = slotOf[i];
			const [g0, g1] = T.groups[sl.g];
			const k = prog(t, g0, g1, E.inOut);
			const pos = compact(i, YB);
			const a = {x: pos.x + 8 * SC, y: pos.y + 9 * SC, w: 46 * SC, h: 4.5 * SC};
			const b = {x: sl.x, y: sl.y + 1, w: 130, h: 5};
			set(c, {x: mix(a.x, b.x, k), y: mix(a.y, b.y, k), width: mix(a.w, b.w, k), height: mix(a.h, b.h, k), fill: mixColor(C.red, C.ink, prog(k, 0, 0.6)), opacity: k > 0 ? 1 : 0});
		});
		goalLabels.forEach((g, k) => set(g, {opacity: prog(t, T.groups[k][0] + 0.3, T.groups[k][1])}));
		goalBrackets.forEach((b) => set(b, {opacity: prog(t, ...T.brackets, E.house)}));
		set(result, {opacity: prog(t, ...T.brackets)});
		set(divider, {opacity: 1});
		set(nameB, {opacity: 1});

		renderNarrow(t);
	};

	// ---- the stacked text stage (any time a picture label would be hidden) -----------------
	const narrow = root.querySelector('[data-im-narrow]');
	const h = (tag, cls, parent, txt) => { const n = document.createElement(tag); if (cls) n.className = cls; if (txt != null) n.textContent = txt; parent.append(n); return n; };
	const NR = {};
	{
		const task = h('div', 'im-n-task', narrow);
		const p1 = h('p', null, task);
		h('b', null, p1, 'Example task');
		p1.append(' Recommend a strategy for our partnership with Country A.');
		const ctx = h('p', 'im-n-ctx', task);
		h('b', null, ctx, 'Context ');
		NR.ctx = CTX.flat().map((s) => h('span', null, ctx, ` ${s}`));
		NR.task = task;
		NR.ai = h('p', 'im-n-ai', narrow);
		h('b', null, NR.ai, 'AI');
		NR.open = h('span', 'im-n-open', NR.ai);
		NR.open.append('Every outline opens with: ');
		h('i', null, NR.open, 'Counter the rival’s influence');
		const run = (key) => {
			const r = {};
			r.el = h('section', 'im-n-run', narrow);
			const who = h('p', 'im-n-who', r.el);
			who.append(key === 'a' ? 'The seminar' : 'The same seminar, imagined');
			r.seq = h('span', 'im-n-seq', who);
			if (key === 'a') { h('span', 'g', r.seq, 'AI outline'); r.seq.append(' → write'); }
			else { r.s1 = h('span', 'r', r.seq, 'Define problem'); r.s2 = h('span', 'g', r.seq, ' → AI challenges'); r.s3 = h('span', null, r.seq, ' → write'); }
			const body = h('div', 'im-n-body', r.el);
			const left = h('div', null, body);
			r.left = left;
			const grid = h('div', 'im-n-grid', left);
			r.papers = Array.from({length: N}, () => {
				const p = h('span', 'im-n-paper', grid);
				h('i', 'ln', p); h('i', 'note', p); h('i', 'body', p); h('i', 'tick', p, '✓');
				return p;
			});
			r.tag = h('p', 'im-n-tag', left, 'All drafted with AI');
			r.board = h('div', 'im-n-board', body);
			return r;
		};
		NR.a = run('a');
		NR.a.frame = h('p', 'im-n-frame im-n-label', NR.a.board, 'One frame: counter the rival');
		NR.a.lines = h('ol', 'im-n-lines', NR.a.board);
		NR.a.items = LINES.map(([v, n]) => { const li = h('li', null, NR.a.lines); li.append(`${v} `); h('u', null, li, 'rival'); li.append(` ${n}`); return li; });
		NR.a.q = h('span', 'im-n-q', NR.a.left, '?');
		NR.b = run('b');
		NR.b.result = h('p', 'im-n-frame im-n-label', NR.b.board, 'One possible result');
		const groups = h('div', 'im-n-groups', NR.b.board);
		NR.b.groups = GOALS.map((g) => {
			const d = h('div', 'im-n-group', groups);
			h('b', null, d, g.label.charAt(0) + g.label.slice(1).toLowerCase());
			const row = h('div', null, d);
			g.who.forEach(() => h('span', null, row));
			return d;
		});
	}
	const fade = (node, k) => { node.style.opacity = Math.max(0, Math.min(1, k)).toFixed(3); };
	const vis = (node, on) => { node.style.visibility = on ? 'visible' : 'hidden'; };
	function renderNarrow(t) {
		if (!root.classList.contains('is-stacked')) return;
		fade(NR.task, prog(t, ...T.card));
		NR.ctx.forEach((s, j) => vis(s, t >= T.ctx + T.ctxStep * j));
		vis(NR.ai, t >= T.panel[0]);
		NR.open.style.display = t >= T.panelLine[0] && t < T.panelLineOut[1] ? '' : 'none';
		NR.open.querySelector('i').style.background = t >= T.panelBump[0] && t < T.panelBump[1] ? '#c9bda6' : '';
		// First seminar.
		const a = NR.a;
		const dim = 1 - 0.65 * (prog(t, ...T.compact) - prog(t, ...T.undim));
		fade(a.el, prog(t, T.papersIn, T.papersIn + 0.6) * dim);
		vis(a.seq, t >= T.seqA[0]);
		a.papers.forEach((p, i) => {
			const outline = t >= T.out + T.outStep * i;
			const written = t >= T.write + T.writeStep * i + T.writeDur * 0.5;
			p.classList.toggle('is-outline', outline && !written);
			p.classList.toggle('is-written', written);
			p.classList.toggle('is-ticked', t >= T.ring + T.ringStep * i + 0.12);
		});
		vis(a.tag, t >= T.tagA[0]);
		vis(a.board, t >= T.lift);
		a.items.forEach((li, i) => vis(li, t >= T.lift + T.liftStep * i + 0.3));
		a.lines.classList.toggle('is-open', t < T.bracket[0]);
		a.lines.classList.toggle('is-marked', t >= T.under);
		a.lines.classList.toggle('is-ai', t >= T.grey[0]);
		vis(a.frame, t >= T.bracket[0]);
		a.frame.textContent = t >= T.grey[0] ? 'AI’s frame: counter the rival' : 'One frame: counter the rival';
		a.frame.classList.toggle('is-ai', t >= T.grey[0]);
		vis(a.q, t >= T.qmark[0]);
		// Imagined seminar.
		const b = NR.b;
		b.el.style.display = t >= T.blockB[0] ? '' : 'none';
		fade(b.el, prog(t, ...T.blockB));
		vis(b.s1, t >= T.define[0]); vis(b.s2, t >= T.challenges[0]); vis(b.s3, t >= T.seqWrite[0]);
		b.papers.forEach((p, i) => {
			p.classList.toggle('is-red', t >= T.red + T.redStep * i);
			p.classList.toggle('has-note', t >= T.note + T.noteStep * i + 0.3);
			p.classList.toggle('is-written', t >= T.writeB + T.writeBStep * i + 0.25);
			p.classList.toggle('is-ticked', t >= T.ringB + T.ringBStep * i + 0.1);
		});
		vis(b.tag, t >= T.tagB[0]);
		vis(b.result, t >= T.brackets[0]);
		b.groups.forEach((g, k) => {
			vis(g, t >= T.groups[k][0]);
			g.style.borderColor = t >= T.brackets[0] ? '' : 'transparent';
		});
	}
	// The narrow stage keeps the height of its tallest moment, so the caption band
	// and controls never move while it plays.
	let fitWidth = 0;
	const fitNarrow = () => {
		const now = +root.querySelector('[data-mf-scrub]').value || 0;
		narrow.style.minHeight = '0px';
		let max = 0;
		for (let t = 0; t <= T.end; t += 0.5) { renderNarrow(t); max = Math.max(max, narrow.scrollHeight); }
		renderNarrow(T.end); max = Math.max(max, narrow.scrollHeight);
		narrow.style.minHeight = `${Math.ceil(max)}px`;
		renderNarrow(now);
	};
	// The stacked stage takes over whenever the smallest picture text (12 units) would render under 11 px.
	const syncStacked = () => {
		const r = svg.getBoundingClientRect();
		if (!r.width) return;
		const vb = svg.viewBox.baseVal;
		const scale = r.height ? Math.min(r.width / vb.width, r.height / vb.height) : r.width / VW;
		const stacked = 12 * scale < 11;
		if (stacked !== root.classList.contains('is-stacked')) {
			root.classList.toggle('is-stacked', stacked);
			renderNarrow(+root.querySelector('[data-mf-scrub]').value || 0);
		}
		const w = Math.round(root.getBoundingClientRect().width);
		if (stacked && w !== fitWidth) { fitWidth = w; fitNarrow(); }
	};

	const BEATS = [
		{at: 0, text: 'Ten students in a seminar get the same task.',
			detail: 'a task card appears at the top right: "Example task. Recommend a strategy for our partnership with Country A." Ten blank papers appear in two rows of five, each with a red dot, labelled "The seminar". The card adds a context list, one item at a time: our trade, its ports, its election, its minerals, a rival\'s loans.'},
		{at: 11.5, text: 'Each asks an AI for an outline. The outlines come back alike.',
			detail: 'a grey box marked AI appears at the top left. A line runs from each dot up to it, and ten grey outlines drop back into the papers, all in one pattern. The box shows "Every outline opens with: Counter the rival\'s influence".'},
		{at: 19.5, text: 'Each writes their own paper. Faculty read each one, and each holds up.',
			detail: 'each dot writes over its outline, and each paper turns to ink in its own layout: headings, bullets, a chart, a table, dense text, two columns, a numbered list, a pull quote, a timeline, a map. "All drafted with AI" appears under them. A navy ring steps across the papers and leaves a tick on each.'},
		{at: 28.2, text: 'Then faculty line up the problem each paper defines.',
			detail: 'each paper\'s first line is outlined, then lifts out and joins a list at the right: outbid rival lenders, block rival ports, counter rival media, undersell rival arms, undercut rival traders, outbuild rival roads, track rival fleets, outspend rival grants, contest rival mines, replace rival cables. The papers stay where they are, ticked.'},
		{at: 41.7, text: 'Different details, one frame: every paper sets out to counter the rival.',
			detail: 'an underline runs under "rival" in every line, and a bracket closes around all ten, labelled "One frame: counter the rival".'},
		{at: 49.7, text: 'Every AI outline opened with that frame.',
			detail: 'the AI box\'s line, "Counter the rival\'s influence", brightens. The bracket turns grey and reads "AI\'s frame: counter the rival".'},
		{at: 56.7, text: 'Imagine the essay\'s proposal: each student defines the problem first.',
			detail: 'the first seminar moves to the upper half and dims, labelled "The seminar: AI outline, write". Below it, "The same seminar, imagined" appears with ten blank papers, and each dot writes a red first line. Its label begins "Define problem".'},
		{at: 64.5, text: 'Then each asks the AI to challenge it and suggest others, and writes.',
			detail: 'a copy of each red line goes up to the AI box, and a grey challenge note comes back into each paper under its line. Each dot writes its paper. The label now reads "Define problem, AI challenges, write", and the papers are marked "All drafted with AI".'},
		{at: 73.5, text: 'These papers hold up too. Faculty line up their problems by frame.',
			detail: 'the first seminar returns to full strength, and a navy ring ticks each imagined paper. The imagined problems move, group by group, into three labelled columns: counter the rival (three papers), back the partner\'s goals (four), secure what we need (three). Brackets close around them, under "One possible result".'},
		{at: 83.5, text: 'Faculty check: What frames are missing across the seminar?',
			list: 'Faculty check: What frames are missing across the seminar? Line up each paper\'s problem, then ask what other frames the task could take.',
			detail: 'the questions appear under the picture at the same size. In the open space beside the first seminar\'s single frame, a dashed, empty bracket with a question mark appears.',
			check: {label: 'Faculty check', question: 'What frames are missing across the seminar?', follow: 'Line up each paper\'s problem, then ask what other frames the task could take.', followAt: T.follow}},
	];

	document.fonts.ready.then(() => {
		measure();
		legibility(root, svg, VW, 11);
		new ResizeObserver(syncStacked).observe(svg);
		syncStacked();
		mount(root, {duration: T.end, render, beats: BEATS, poster: BEATS[3].at - 0.02});
	});
})();
