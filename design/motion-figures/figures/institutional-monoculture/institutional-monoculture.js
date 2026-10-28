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
   and export it frame by frame. */
(() => {
	const {mount, E, mix, prog, el, set, bracketPath, legibility, mixColor, FONT} = MotionFigures;
	const C = {paper: '#f6f1e8', bright: '#fffdfa', ink: '#0a2242', red: '#b81b2b', grey: '#5b564f', band: '#ded5c4'};
	const VW = 960;
	const N = 10;

	// ---- timeline (absolute seconds, from the storyboard) -------------------
	const T = {
		card: [1.0, 1.6], papersIn: 1.7, paperStep: 0.1, paperDur: 0.3, ctx: 3.4, ctxStep: 0.75, ctxDur: 0.5,
		panel: [12.0, 12.4], req: 12.4, reqStep: 0.1, reqDur: 0.6, out: 15.0, outStep: 0.1, outDur: 0.6,
		write: 20.0, writeStep: 0.2, writeDur: 0.8, tagA: [22.7, 23.1], ring: 24.0, ringStep: 0.2,
		marks: [28.7, 29.3], lift: 30.7, liftStep: 0.7, liftDur: 0.7,
		read: 42.0, readStep: 0.12, readDur: 0.3, bracket: [44.0, 44.8],
		callout: [49.0, 49.8], grey: [50.5, 51.3],
		qmark: [57.5, 58.1],
		compact: [61.5, 62.7], seqA: [62.3, 62.7], blockB: [62.8, 63.4],
		red: 64.8, redStep: 0.1, redDur: 0.6, define: [64.8, 65.2],
		send: 69.3, sendStep: 0.06, sendDur: 0.5, ask: [71.8, 72.4],
		note: 72.1, noteStep: 0.1, noteDur: 0.5, challenges: [72.1, 72.5],
		writeB: 73.7, writeBStep: 0.08, writeBDur: 0.5, seqWrite: [73.7, 74.1], tagB: [74.5, 74.9],
		askOut: [78.0, 78.5], undim: [78.0, 79.2], ringB: 78.0, ringBStep: 0.1,
		groups: [[81.0, 82.0], [82.2, 83.2], [83.4, 84.4]], brackets: [84.6, 85.4],
		check: 90.7, follow: 93.7, qPulse: [93.7, 94.5], end: 97.7,
	};
	const AT = [0, 11.0, 19.0, 27.7, 41.0, 48.0, 54.5, 60.5, 68.3, 77.0, 90.7]; // beat starts

	// ---- content -----------------------------------------------------------------
	// Ten differently worded problems that set one goal: counter the rival.
	const LINES = ['Outbid rival lenders', 'Block rival ports', 'Outshout their media', 'Undersell foreign arms', 'Win back trade',
		'Fund competing roads', 'Shadow foreign fleets', 'Outspend their grants', 'Deny them mines', 'Replace rival cables'];
	// The same students, imagined: three still counter the rival, seven set other goals.
	const LINES_B = ['Outbid rival lenders', 'Block rival ports', 'Outshout their media', 'Ease its debts', 'Grow export jobs',
		'Back fair elections', 'Keep port access', 'Fund its plans', 'Secure mineral supplies', 'Protect undersea cables'];
	const CTX = [['Our trade,', 'its ports,', 'its election,'], ['its minerals,', 'a rival’s loans.']];
	const GOALS = [
		{label: 'COUNTER THE RIVAL', who: [0, 1, 2]},
		{label: 'BACK THE PARTNER’S GOALS', who: [3, 4, 5, 7]},
		{label: 'SECURE WHAT WE NEED', who: [6, 8, 9]},
	];
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
	const CALL_L = {x: 320, y: 20, s: 1}, CALL_C = {x: 340, y: 80, s: 0.75}, CALL_W = 330, CALL_H = 76;
	const PILL_L = {x: 578, y: 157}, PILL_C = {x: 528, y: YA + 22};
	const Q_L = {x: 812, y: 240}, Q_C = {x: 675, y: 186}, QW = 120, QH = 72;
	const COLS = [340, 540, 750], COLW = 180;
	const lineYB = (k) => YB + 44 + 15 * k;

	const root = document.querySelector('#institutional-monoculture');
	const svg = root.querySelector('svg');
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
	mono(panel, 36, 34, 'AI', {fill: C.grey});

	// ---- task card -----------------------------------------------------------------
	const card = el(topLayer, 'g');
	el(card, 'rect', {x: 670, y: 16, width: 266, height: 122, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.15});
	mono(card, 686, 34, 'EXAMPLE TASK');
	serif(card, 686, 56, 'Recommend a strategy for our', {fs: 15});
	serif(card, 686, 75, 'partnership with Country A.', {fs: 15});
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
	const nameA = text(gA, 40, 138, 'The seminar', {fs: 13, weight: 600, fill: C.red});
	const seqA = mono(gA, 24, YA + 28, '', {ls: 0.4});
	el(seqA, 'tspan', {fill: C.grey}, 'AI OUTLINE');
	el(seqA, 'tspan', {}, ' → WRITE');
	const tagA = mono(gA, 0, 0, 'ALL DRAFTED WITH AI', {fill: C.grey, ls: 0.4});
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
	const brLabelL = mono(gA, BR_L.x, BR_L.y + BR_L.h + 22, 'ONE FRAME: COUNTER THE RIVAL', {opacity: 0});
	const oneFrame = mono(gA, 340, YA + 4, 'ONE FRAME', {opacity: 0});
	const colLabelA = mono(gA, 348, YA + 18, 'COUNTER THE RIVAL', {opacity: 0, ls: 0});
	// Whose frame: a grey pill beside the bracket, apart from the goal's name.
	const pill = el(gA, 'g', {opacity: 0});
	const pillBox = el(pill, 'rect', {x: 0, y: 0, width: 100, height: 21, rx: 10.5, fill: C.band, stroke: C.grey, 'stroke-width': 1.2});
	const pillText = mono(pill, 10, 15, 'AI’S FRAME', {fill: C.grey, ls: 0.4});
	// Where the frame came from: the AI's opening line, traced to the bracket.
	const callout = el(gA, 'g', {opacity: 0});
	el(callout, 'rect', {x: 0, y: 0, width: CALL_W, height: CALL_H, rx: 6, fill: C.band, 'fill-opacity': 0.55, stroke: C.grey, 'stroke-width': 1.2});
	mono(callout, 14, 26, 'EVERY AI OUTLINE OPENED WITH', {fill: C.grey, ls: 0.4});
	const callBand = el(callout, 'rect', {x: 10, y: 37, height: 27, rx: 2, fill: C.band});
	const callText = serif(callout, 14, 57, 'Counter the rival’s influence', {fs: 18, fill: C.grey});
	const leader = el(gA, 'line', {stroke: C.grey, 'stroke-width': 1.4, opacity: 0});
	// The faculty's question: dashed, empty, in open space, aligned with nothing that answers it.
	const qGroup = el(gA, 'g', {opacity: 0});
	mono(qGroup, 0, 0, 'FACULTY ASK', {ls: 0.6});
	const qPath = el(qGroup, 'path', {d: bracketPath({x: 0, y: 10, w: QW, h: QH}, 14), fill: 'none', stroke: C.ink, 'stroke-opacity': 0.5, 'stroke-width': 2, 'stroke-dasharray': '5 4'});
	el(qGroup, 'rect', {x: 0, y: 10, width: QW, height: QH, fill: 'none', stroke: C.ink, 'stroke-opacity': 0.25, 'stroke-dasharray': '4 4'});
	serif(qGroup, QW / 2, 10 + QH / 2 + 10, '?', {fs: 28, style: 'italic', anchor: 'middle', fill: mixColor(C.ink, C.paper, 0.35)});

	// ---- imagined seminar ---------------------------------------------------------------
	const divider = el(gB, 'line', {x1: 24, y1: 331, x2: 936, y2: 331, stroke: C.ink, 'stroke-opacity': 0.15});
	text(gB, 24, YB + 12, 'The same seminar, imagined', {fs: 13, weight: 600, fill: C.red});
	const seqB = mono(gB, 24, YB + 28, '', {ls: 0.2});
	const seqB1 = el(seqB, 'tspan', {fill: C.red}, 'DEFINE PROBLEM');
	const seqB2 = el(seqB, 'tspan', {fill: C.grey}, ' → AI CHALLENGES');
	const seqB3 = el(seqB, 'tspan', {}, ' → WRITE');
	const tagB = mono(gB, 24, YB + 176, 'ALL DRAFTED WITH AI', {fill: C.grey, ls: 0.4});
	const headB = mono(gB, 340, YB + 4, 'IMAGINED: ONE POSSIBLE SPREAD', {ls: 0.6});
	const papersB = Array.from({length: N}, (_, i) => makePaper(gB, i, 'b'));
	// The AI's challenge, once, in words.
	const askCard = el(gB, 'g', {opacity: 0});
	el(askCard, 'path', {d: `M372 ${YB + 36}H660Q668 ${YB + 36} 668 ${YB + 44}V${YB + 122}Q668 ${YB + 130} 660 ${YB + 130}H372Q364 ${YB + 130} 364 ${YB + 122}V${YB + 70}L350 ${YB + 64}L364 ${YB + 58}V${YB + 44}Q364 ${YB + 36} 372 ${YB + 36}Z`, fill: C.band, 'fill-opacity': 0.75, stroke: C.grey, 'stroke-width': 1.2});
	mono(askCard, 380, YB + 58, 'THE AI ASKS', {fill: C.grey, ls: 0.4});
	serif(askCard, 380, YB + 86, 'What did you assume?', {fs: 18, style: 'italic', fill: C.grey});
	serif(askCard, 380, YB + 112, 'What else could it be?', {fs: 18, style: 'italic', fill: C.grey});
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
	const linesB = LINES_B.map((str) => {
		const g = el(flyLayer, 'g', {opacity: 0});
		const t = serif(g, 0, 0, str, {fs: 16});
		t.setAttribute('data-fs', 13);
		return {g, t};
	});

	// ---- moving marks -----------------------------------------------------------------
	const reqDots = Array.from({length: N}, () => el(flyLayer, 'circle', {r: 3.6, fill: C.ink, opacity: 0}));
	const sends = Array.from({length: N}, () => el(flyLayer, 'rect', {height: 2.8, width: 25, rx: 1, fill: C.red, opacity: 0}));

	// ---- measure (after fonts load) -------------------------------------------------------
	const M = {};
	function measure() {
		set(callBand, {width: callText.getComputedTextLength() + 8});
		M.pillW = pillText.getComputedTextLength() + 20;
		set(pillBox, {width: M.pillW});
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
		set(seqA, {opacity: prog(t, ...T.seqA)});
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
		set(callout, {opacity: Math.min(1, kCa * 2), transform: `translate(${mix(150, cAt.x, kCa)} ${mix(40, cAt.y, kCa)}) scale(${mix(0.3, cAt.s, kCa)})`});
		const pAt = lerp(PILL_L, PILL_C, kC);
		set(pill, {opacity: kG, transform: `translate(${pAt.x} ${pAt.y})`});
		const la = {x: cAt.x + 250 * cAt.s, y: cAt.y + CALL_H * cAt.s}, lb = {x: pAt.x + (M.pillW || 100) / 2, y: pAt.y};
		const len = Math.hypot(lb.x - la.x, lb.y - la.y);
		set(leader, {x1: la.x, y1: la.y, x2: lb.x, y2: lb.y, 'stroke-dasharray': len, 'stroke-dashoffset': len * (1 - kG), opacity: kG > 0 ? 1 : 0});
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
		set(headB, {opacity: 1});
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
		h('b', null, p1, 'Example task');
		p1.append(' Recommend a strategy for our partnership with Country A.');
		NR.ctxP = h('p', 'im-n-ctx', NR.task);
		NR.ctx = CTX.flat().map((s, j) => h('span', null, NR.ctxP, `${j ? ' ' : ''}${s}`));
		NR.ai = h('p', 'im-n-ai', narrow);
		h('b', null, NR.ai, 'AI');
		NR.open = h('span', 'im-n-open', NR.ai);
		NR.open.append('Every AI outline opened with: ');
		h('i', null, NR.open, 'Counter the rival’s influence');
		NR.asks = h('span', 'im-n-open', NR.ai);
		NR.asks.append('The AI asks: ');
		h('i', null, NR.asks, 'What did you assume? What else could it be?');
		const run = (key) => {
			const r = {};
			r.el = h('section', 'im-n-run', narrow);
			const who = h('p', 'im-n-who', r.el);
			who.append(key === 'a' ? 'The seminar' : 'The same seminar, imagined');
			r.seq = h('span', 'im-n-seq', who);
			if (key === 'a') { h('span', 'g', r.seq, 'AI outline'); r.seq.append(' → write'); }
			else { r.s1 = h('span', 'r', r.seq, 'Define problem'); r.s2 = h('span', 'g', r.seq, ' → AI challenges'); r.s3 = h('span', null, r.seq, ' → write'); }
			const grid = h('div', 'im-n-grid', r.el);
			r.papers = Array.from({length: N}, () => {
				const p = h('span', 'im-n-paper', grid);
				h('i', 'ln', p); h('i', 'note', p); h('i', 'body', p); h('i', 'tick', p, '✓');
				return p;
			});
			r.tag = h('p', 'im-n-tag', r.el, 'All drafted with AI');
			r.board = h('div', 'im-n-board', r.el);
			return r;
		};
		NR.a = run('a');
		NR.a.frame = h('p', 'im-n-frame', NR.a.board);
		NR.a.frameText = h('span', null, NR.a.frame, 'One frame: counter the rival');
		NR.a.pill = h('span', 'im-n-pill', NR.a.frame, 'AI’s frame');
		NR.a.q = h('span', 'im-n-q', NR.a.frame, '?');
		NR.a.lines = h('ol', 'im-n-lines', NR.a.board);
		NR.a.items = LINES.map((s) => h('li', null, NR.a.lines, s));
		NR.b = run('b');
		NR.b.head = h('p', 'im-n-frame', NR.b.board, 'Imagined: one possible spread');
		NR.b.groups = GOALS.map((g) => {
			const d = h('div', 'im-n-group', NR.b.board);
			h('b', null, d, g.label.charAt(0) + g.label.slice(1).toLowerCase());
			d.items = g.who.map((i) => h('span', null, d, LINES_B[i]));
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
		NR.ai.classList.toggle('is-pulse', near(t, T.req, 1.6) || near(t, T.send, 1.2) || near(t, T.callout[0], 0.8));
		show(NR.open, t >= T.callout[0] && t < T.send);
		show(NR.asks, t >= T.ask[0] && t < T.askOut[0]);
		// First seminar.
		const a = NR.a;
		const dim = 1 - 0.65 * (prog(t, ...T.compact) - prog(t, ...T.undim));
		fade(a.el, prog(t, T.papersIn, T.papersIn + 0.6) * dim);
		vis(a.seq, t >= T.seqA[0]);
		a.papers.forEach((p, i) => {
			const o0 = T.out + T.outStep * i, w0 = T.write + T.writeStep * i, r0 = T.ring + T.ringStep * i, l0 = T.lift + T.liftStep * i;
			const written = t >= w0 + T.writeDur * 0.5;
			p.classList.toggle('is-outline', t >= o0 && !written);
			p.classList.toggle('is-written', written);
			p.classList.toggle('is-ticked', t >= r0 + 0.12);
			p.classList.toggle('is-pulse', near(t, o0, 0.6) || near(t, w0, T.writeDur) || near(t, r0, 0.3) || near(t, l0, 0.7));
		});
		vis(a.tag, t >= T.tagA[0]);
		show(a.board, t >= T.lift);
		vis(a.frameText, t >= T.bracket[0]);
		show(a.pill, t >= T.grey[0]);
		show(a.q, t >= T.qmark[0]);
		a.q.classList.toggle('is-pulse', near(t, T.qPulse[0], 0.8));
		show(a.lines, t < T.compact[0]);
		a.items.forEach((li, i) => { vis(li, t >= T.lift + T.liftStep * i + 0.3); li.classList.toggle('is-read', t >= T.read + T.readStep * i); });
		a.lines.classList.toggle('is-open', t < T.bracket[0]);
		a.lines.classList.toggle('is-ai', t >= T.grey[0]);
		// Imagined seminar.
		const b = NR.b;
		show(b.el, t >= T.blockB[0]);
		fade(b.el, prog(t, ...T.blockB));
		vis(b.s1, t >= T.define[0]); vis(b.s2, t >= T.challenges[0]); vis(b.s3, t >= T.seqWrite[0]);
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
		b.groups.forEach((g, k) => {
			show(g, t >= T.groups[k][0]);
			g.style.borderColor = t >= T.brackets[0] ? '' : 'transparent';
		});
	}
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
	const syncStacked = () => {
		const r = svg.getBoundingClientRect();
		if (!r.width && !root.classList.contains('is-stacked')) return;
		// The papers carry the figure without labels, so the picture stays whenever there is
		// width for it; only a genuinely narrow figure gets the stacked text stage.
		const stacked = root.getBoundingClientRect().width < 480;
		if (stacked !== root.classList.contains('is-stacked')) {
			root.classList.toggle('is-stacked', stacked);
			renderNarrow(+root.querySelector('[data-mf-scrub]').value || 0);
		}
		const w = Math.round(root.getBoundingClientRect().width);
		if (stacked && w !== fitWidth) { fitWidth = w; fitNarrow(); }
	};

	const BEATS = [
		{at: AT[0], text: 'Ten students in a seminar get the same task.',
			detail: 'a task card appears at the top right: "Example task. Recommend a strategy for our partnership with Country A." Ten blank papers appear in two rows of five, each with a red dot, labelled "The seminar". Under a line on the card, the context appears one item at a time: our trade, its ports, its election, its minerals, a rival\'s loans.'},
		{at: AT[1], text: 'Each asks an AI for an outline. The outlines come back alike.',
			detail: 'a grey box marked AI appears at the top left. A small mark travels from each red dot up to it, and ten grey outlines drop back into the papers, all in the same pattern.'},
		{at: AT[2], text: 'Each writes their own paper. Faculty read each one, and each holds up.',
			detail: 'each dot writes over its outline, and each paper turns to ink in its own layout: headings, bullets, a chart, a table, dense text, two columns, a numbered list, a pull quote, a timeline, a map. "All drafted with AI" appears under them. A navy ring steps across the papers and leaves a tick on each.'},
		{at: AT[3], text: 'Then faculty line up the problem each paper defines.',
			detail: 'each paper\'s first line is outlined, then lifts out and joins a list at the right: outbid rival lenders, block rival ports, outshout their media, undersell foreign arms, win back trade, fund competing roads, shadow foreign fleets, outspend their grants, deny them mines, replace rival cables. The papers stay where they are, ticked.'},
		{at: AT[4], text: 'Different words, one frame: each paper counters the rival.',
			detail: 'a navy mark appears beside each line in turn as faculty read it. Then a bracket closes around all ten, labelled "One frame: counter the rival".'},
		{at: AT[5], text: 'Every AI outline opened with that frame.',
			detail: 'a grey card comes out of the AI box: "Every AI outline opened with: Counter the rival\'s influence". A grey line runs from it to the bracket, which turns grey, and a grey tag beside the bracket reads "AI\'s frame".'},
		{at: AT[6], text: 'Faculty ask what other frames the task could take.',
			detail: 'beside the bracket, in open space, a dashed, empty box with a question mark appears, labelled "Faculty ask". Nothing fills it.'},
		{at: AT[7], text: 'Imagine the essay\'s proposal: each student defines the problem first.',
			detail: 'the first seminar moves to the upper half and dims, labelled "The seminar: AI outline, write", with the grey card above its list and the question box beside it. Below a line, "The same seminar, imagined" appears with ten blank papers and the heading "Imagined: one possible spread". Each dot writes a red first line, and the label begins "Define problem".'},
		{at: AT[8], text: 'Then each asks the AI to challenge it, and writes.',
			detail: 'a copy of each red line goes up to the AI box. A grey speech bubble appears: "The AI asks: What did you assume? What else could it be?", and small grey speech bubbles land on each paper under its red line. Each dot writes its paper. The label now reads "Define problem, AI challenges, write", and the papers are marked "All drafted with AI".'},
		{at: AT[9], text: 'These papers hold up too. Faculty line them up the same way.',
			detail: 'the speech bubble fades, the first seminar returns to full strength, and a navy ring ticks each imagined paper. Group by group, their problem lines lift out as words into three labelled columns: counter the rival (outbid rival lenders, block rival ports, outshout their media); back the partner\'s goals (ease its debts, grow export jobs, back fair elections, fund its plans); secure what we need (keep port access, secure mineral supplies, protect undersea cables). Brackets close around them.'},
		{at: AT[10], text: 'Faculty check: What frames are missing across the seminar?',
			list: 'Faculty check: What frames are missing across the seminar? Line up each paper\'s problem, then ask what other frames the task could take.',
			detail: 'the questions appear under the picture at the same size, and the dashed question box beside the first seminar\'s frame pulses once. It stays empty.',
			check: {label: 'Faculty check', question: 'What frames are missing across the seminar?', follow: 'Line up each paper\'s problem, then ask what other frames the task could take.', followAt: T.follow}},
	];

	document.fonts.ready.then(() => {
		measure();
		legibility(root, svg, VW, 11);
		new ResizeObserver(syncStacked).observe(root);
		syncStacked();
		mount(root, {duration: T.end, render, beats: BEATS, poster: AT[3] - 0.02});
	});
})();
