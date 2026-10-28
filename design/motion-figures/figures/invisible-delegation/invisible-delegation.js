/* Invisible delegation: motion figure 5 of 8. Built to storyboard.md (round 3,
   revised after storyboard cold read 2).
   Grey is what the AI supplied, red is a student's decision, navy is ink.
   Each student has a block: their paper and the AI's notes at left, then a
   ledger in three lanes: THE STUDENT DECIDES, REQUESTS, THE AI DECIDES.
   The first student's plain requests carry each decision card across into the
   AI's lane. The second student writes each decision first (the criteria from
   the rubric), then asks with words that point back to it.
   Whenever any picture label would render under 11 px (a stage narrower than
   880 px), the SVG gives way to a stacked text stage driven by the same clock.
   Every attribute is a pure function of t, so the runtime can play, scrub,
   hold (?t=) and export it frame by frame. */
(() => {
	const {mount, E, mix, prog, el, set, pathAt, legibility, mixColor, FONT} = MotionFigures;
	const C = {paper: '#f6f1e8', bright: '#fffdfa', ink: '#0a2242', red: '#b81b2b', grey: '#5b564f', band: '#ded5c4'};
	const VW = 960;

	// ---- timeline (absolute seconds, from the storyboard) -------------------
	const T = {
		card: [1.0, 1.6], dotA: [1.7, 2.1], paperA: [2.2, 2.8], rubric: [3.0, 3.4],
		ledgerA: [9.7, 10.3], cardsA: 10.5, cardStep: 0.45, cardDur: 0.35, slotsA: [12.0, 12.4],
		// first student: three requests
		bubA: [[17.7, 18.1], [29.1, 29.5], [34.8, 35.2]],
		carryA: [[21.0, 23.4], [31.5, 32.9], [35.3, 36.7]],
		backA: [[23.5, 24.0], [33.0, 33.5], [36.8, 37.3]],
		notesA: [24.1, 24.5], tickA: [[24.6, 24.75], [25.15, 25.3], [25.55, 25.7]], draftA2: [25.6, 25.85], revA: [25.9, 26.2],
		headA: [33.6, 34.0], workA3: [34.1, 34.7], paraA: [37.4, 37.8], workA4: [37.9, 38.6],
		// the turn
		pulseQ: [41.5, 42.0], key: [44.4, 44.8], uns: [[44.9, 45.3], [45.4, 45.8], [45.9, 46.3]], pulseCards: [46.5, 47.1],
		// second student
		moveA: [50.6, 51.8], blockB: [51.9, 52.5], rubricUp: [54.3, 54.8], rubricLine: [54.8, 55.1], rubricDown: [55.2, 55.8],
		writeB: [[55.8, 56.5], [63.8, 64.3], [68.7, 69.2]],
		bubB: [[56.7, 57.1], [64.5, 64.9], [69.4, 69.8]],
		settleB: [[57.2, 58.0], [65.0, 65.8], [69.9, 70.7]],
		notesB: [58.1, 58.5], tickB: [[58.6, 58.75], [59.15, 59.3]], strikeB: [59.5, 59.8], reasonB: [59.9, 60.4], revB: [60.5, 60.8],
		headB: [67.3, 67.7], workB3: [67.8, 68.4], paraB: [70.8, 71.2], workB4: [71.3, 72.0],
		// faculty
		dim: [74.5, 75.5], fac: [77.5, 78.0], panelA: [78.2, 78.6], wordsA: [78.6, 82.3], panelB: [82.6, 83.0], wordsB: [83.0, 87.0],
		check: 88.5, undim: [92.0, 93.0], follow: 93.2, end: 96.1,
	};

	// ---- geometry (block-local; a block's top is Y) ---------------------------
	const Y = {a0: 168, a1: 108, b: 330};
	const X = {own: 178, req: 350, ai: 542, div1: 342, div2: 534};
	const CW = 156, CH = 30, CARRY = X.ai - X.own;
	const rowY = (k) => 44 + 58 * k; // card top
	const qY = (k) => 54 + 58 * k; // first quote baseline
	const HOME = {x: 168, y: 30};
	const LABELS = ['The criteria', 'How the argument runs', 'What “strategic” means'];
	const REQ_A = ['Give me feedback', 'Suggest a better structure', 'Make it more strategic'];
	const UNSAID = ['against your criteria', 'for your argument', 'as you define it'];
	const REQ_B = [['Give me feedback', 'against my criteria'], ['Suggest a better structure', 'for my argument'], ['Make it more strategic,', 'as I define it']];
	const NOTES = ['Tighten the opening', 'Add a cost estimate', 'Sound more decisive'];
	const NOTE_Y = [160, 173, 186];
	const SPEECH = {
		a: ['“The AI’s notes, I suppose.', 'I worked through what it', 'flagged.”'],
		b: ['“Mine, set first from the', 'rubric: does the evidence', 'back my call?”'],
	};

	const root = document.querySelector('#invisible-delegation');
	const svg = root.querySelector('svg');
	const defs = el(svg, 'defs');
	el(svg, 'rect', {width: 960, height: 540, fill: C.paper});
	const marker = el(el(defs, 'marker', {id: 'id-arrow', viewBox: '0 0 6 6', refX: 5, refY: 3, markerWidth: 5, markerHeight: 5, orient: 'auto'}), 'path', {d: 'M0 0L6 3L0 6Z', fill: C.red});
	void marker;
	const topLayer = el(svg, 'g');
	const gA = el(svg, 'g');
	const gB = el(svg, 'g');
	const facLayer = el(svg, 'g');

	const text = (parent, x, y, str, {fs, family = FONT.sans, weight = 400, fill = C.ink, anchor = 'start', ls = 0, style} = {}) =>
		el(parent, 'text', {x, y, 'font-family': family, 'font-size': fs, 'font-weight': weight, fill, 'text-anchor': anchor, 'letter-spacing': ls, 'data-fs': fs, ...(style ? {'font-style': style} : {})}, str);
	const mono = (parent, x, y, str, opts = {}) => text(parent, x, y, str, {fs: 12, family: FONT.mono, weight: 600, ls: 1, ...opts});
	const serif = (parent, x, y, str, opts = {}) => text(parent, x, y, str, {family: FONT.serif, ...opts});
	let clipN = 0;
	const clip = (parent) => {
		const id = `id-clip-${clipN++}`;
		const rect = el(el(defs, 'clipPath', {id}), 'rect', {width: 0, height: 0});
		return {g: el(parent, 'g', {'clip-path': `url(#${id})`}), rect};
	};
	const bump = (t, t0, t1) => Math.sin(Math.PI * prog(t, t0, t1));
	const bubblePath = (x, y, w, h, r = 8) =>
		`M${x + r} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}V${y + h - r}Q${x + w} ${y + h} ${x + w - r} ${y + h}H${x + r}Q${x} ${y + h} ${x} ${y + h - r}V${y + h / 2 + 4}L${x - 7} ${y + h / 2}L${x} ${y + h / 2 - 4}V${y + r}Q${x} ${y} ${x + r} ${y}Z`;

	// ---- task card (top band) ------------------------------------------------
	const card = el(topLayer, 'g');
	el(card, 'rect', {x: 24, y: 14, width: 400, height: 84, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.15});
	mono(card, 40, 34, 'EXAMPLE TASK');
	serif(card, 40, 58, 'Recommend whether to keep a forward base.', {fs: 16});
	const rubric = el(topLayer, 'g');
	mono(rubric, 40, 84, 'RUBRIC ·');
	const rubricText = serif(rubric, 108, 84, 'Evidence must back the call.', {fs: 15, style: 'italic'});
	const rubricLine = el(topLayer, 'line', {x1: 108, y1: 89, x2: 108, y2: 89, stroke: C.ink, 'stroke-width': 1.6});

	// ---- a student's block -----------------------------------------------------
	const ROWS_A = [[60, 52, 64, 56, 48, 62, 40], [60, 58, 50, 56, 60, 62, 40], [30, 54, 58, 30, 52, 62, 40], [30, 58, 54, 30, 56, 64, 64]];
	const ROWS_B = [[56, 62, 50, 60, 54, 44, 58], [56, 54, 60, 60, 50, 44, 58], [30, 60, 52, 30, 58, 44, 58], [30, 54, 60, 30, 52, 64, 64]];
	function block(g, key) {
		const isA = key === 'a';
		const o = {key, isA};
		o.name = text(g, 24, 12, isA ? 'First student' : 'Second student', {fs: 13, weight: 600, fill: C.red});
		// The paper: title bar and seven rows; four of them can turn into the AI's grey text.
		o.paper = el(g, 'g');
		el(o.paper, 'rect', {x: 27, y: 23, width: 80, height: 76, fill: C.ink, 'fill-opacity': 0.06});
		el(o.paper, 'rect', {x: 24, y: 20, width: 80, height: 76, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.18, 'stroke-width': 1.2});
		el(o.paper, 'rect', {x: 32, y: 27, width: 46, height: 4.5, fill: C.ink});
		o.rows = [0, 1, 2, 3, 4, 5, 6].map((i) => {
			const y = 38 + 8 * i;
			const ink = el(o.paper, 'rect', {x: 32, y, height: 3.4, fill: C.ink, 'fill-opacity': 0.75});
			const grey = el(o.paper, 'g', {opacity: 0});
			const band = el(grey, 'rect', {x: 31, y: y - 1.6, height: 6.6, rx: 1, fill: C.band});
			const bar = el(grey, 'rect', {x: 32, y, height: 3.4, fill: C.grey});
			return {ink, grey, band, bar, y};
		});
		o.draft = mono(g, 24, 110, '');
		o.rev = mono(g, 24, 124, 'REVISED WITH AI', {fill: C.grey});
		// The AI's notes, worked through by the student.
		o.notes = el(g, 'g');
		el(o.notes, 'rect', {x: 24, y: 132, width: 148, height: 70, rx: 2, fill: C.band, 'fill-opacity': 0.75, stroke: C.grey, 'stroke-opacity': 0.5});
		mono(o.notes, 30, 146, "AI'S NOTES", {fill: C.grey});
		o.noteText = NOTES.map((s, i) => serif(o.notes, 42, NOTE_Y[i], s, {fs: 12, fill: C.grey}));
		o.ticks = NOTES.map((s, i) => text(o.notes, 30, NOTE_Y[i], '✓', {fs: 12, weight: 600, fill: C.ink}));
		if (!isA) {
			o.strike = el(o.notes, 'line', {stroke: C.red, 'stroke-width': 1.6});
			const c = clip(o.notes);
			o.reasonClip = c.rect;
			o.reason = serif(c.g, 42, 199, 'only if the evidence is', {fs: 12, style: 'italic', fill: C.red});
		}
		// The ledger (dims when faculty ask).
		o.led = el(g, 'g');
		o.ledFrame = el(o.led, 'g');
		el(o.ledFrame, 'line', {x1: X.div1, y1: 2, x2: X.div1, y2: 202, stroke: C.ink, 'stroke-opacity': 0.3});
		el(o.ledFrame, 'line', {x1: X.div2, y1: 2, x2: X.div2, y2: 202, stroke: C.ink, 'stroke-opacity': 0.3});
		mono(o.ledFrame, X.own, 12, 'THE STUDENT DECIDES', {fill: C.red});
		mono(o.ledFrame, X.req, 12, 'REQUESTS');
		mono(o.ledFrame, X.ai, 12, 'THE AI DECIDES', {fill: C.grey});
		const slot = (x, k) => {
			const s = el(o.led, 'g', {opacity: 0});
			el(s, 'rect', {x, y: rowY(k), width: CW, height: CH, rx: 3, fill: 'none', stroke: C.ink, 'stroke-opacity': 0.15});
			text(s, x + CW / 2, rowY(k) + 20, '—', {fs: 14, anchor: 'middle', fill: mixColor(C.ink, C.paper, 0.55)});
			return s;
		};
		o.aiSlots = [0, 1, 2].map((k) => slot(X.ai, k));
		o.ownSlots = [0, 1, 2].map((k) => slot(X.own, k));
		o.cards = [0, 1, 2].map((k) => {
			const c = el(o.led, 'g', {opacity: 0});
			const rect = el(c, 'rect', {x: X.own, y: rowY(k), width: CW, height: CH, rx: 3, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.45, 'stroke-dasharray': '4 3', 'stroke-width': 1.2});
			const label = text(c, X.own + 9, rowY(k) + 18, LABELS[k], {fs: 13, weight: 600});
			const bar = el(c, 'rect', {x: X.own + 9, y: rowY(k) + 23, height: 2.5, width: 0, fill: C.grey});
			return {c, rect, label, bar};
		});
		// Requests: quote lines in the middle lane.
		o.quotes = [0, 1, 2].map((k) => {
			const q = el(o.led, 'g', {opacity: 0});
			const wash = el(q, 'rect', {x: X.req - 3, y: qY(k) - 12, height: 16, rx: 2, fill: C.ink, 'fill-opacity': 0});
			let t1, t2;
			if (isA) t1 = serif(q, X.req, qY(k), `“${REQ_A[k]}”`, {fs: 13, style: 'italic'});
			else {
				t1 = serif(q, X.req, qY(k), `“${REQ_B[k][0]}`, {fs: 13, style: 'italic'});
				t2 = serif(q, X.req, qY(k) + 16, '', {fs: 13, style: 'italic'});
				el(t2, 'tspan', {fill: C.red}, REQ_B[k][1]);
				el(t2, 'tspan', {}, '”');
			}
			return {q, wash, t1, t2};
		});
		if (isA) {
			o.unsaid = [0, 1, 2].map((k) => {
				const u = el(o.led, 'g', {opacity: 0});
				mono(u, X.req, qY(k) + 16, 'UNSAID', {ls: 0.4});
				const box = el(u, 'rect', {x: 398, y: qY(k) + 4, height: 15, rx: 2, fill: 'none', stroke: C.grey, 'stroke-width': 1.2, 'stroke-dasharray': '3 3'});
				const t = serif(u, 402, qY(k) + 16, UNSAID[k], {fs: 13, style: 'italic', fill: C.grey});
				return {u, box, t};
			});
			o.key = el(o.led, 'g', {opacity: 0});
			el(o.key, 'rect', {x: 420, y: 3, width: 14, height: 10, fill: 'none', stroke: C.grey, 'stroke-width': 1.2, 'stroke-dasharray': '3 2'});
			mono(o.key, 440, 12, 'LEFT UNSAID', {ls: 0.6});
		} else {
			o.pointers = [0, 1, 2].map((k) => el(o.led, 'path', {d: `M${X.req - 2} ${qY(k) + 12}C${X.req - 8} ${qY(k) + 12} ${X.req - 10} ${rowY(k) + 15} ${X.own + CW + 3} ${rowY(k) + 15}`, fill: 'none', stroke: C.red, 'stroke-width': 1.3, 'marker-end': 'url(#id-arrow)'}));
		}
		// Request bubbles (moving; drawn above the ledger).
		o.bubbles = [0, 1, 2].map((k) => {
			const b = el(g, 'g', {opacity: 0});
			const shape = el(b, 'path', {fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.3, 'stroke-width': 1.2});
			const t = serif(b, X.own + 10, rowY(k) - 10, '', {fs: 14});
			if (isA) t.textContent = REQ_A[k];
			else { el(t, 'tspan', {}, REQ_B[k][0] + ' '); el(t, 'tspan', {fill: C.red}, REQ_B[k][1]); }
			const clipMark = isA ? el(b, 'rect', {x: X.own + 20, y: rowY(k) - 4, width: 3, height: 7, fill: C.ink, 'fill-opacity': 0.6}) : null;
			return {b, shape, t, clipMark, w: 160};
		});
		// The dot.
		o.dotG = el(g, 'g');
		o.ring = el(o.dotG, 'circle', {r: 5, fill: 'none', stroke: C.red, 'stroke-width': 1.5, opacity: 0});
		o.dot = el(o.dotG, 'circle', {r: 5, fill: C.red});
		o.path = () => HOME;
		return o;
	}
	const A = block(gA, 'a');
	const B = block(gB, 'b');

	// ---- faculty --------------------------------------------------------------------------
	const fac = el(facLayer, 'g');
	mono(fac, 716, 44, 'FACULTY ASK EACH STUDENT');
	serif(fac, 716, 70, 'Better by whose standard?', {fs: 19, style: 'italic'});
	const speech = (key, y0) => {
		const x = 716, w = 220, h = 78, r = 8;
		const g = el(facLayer, 'g');
		el(g, 'path', {d: `M${x + r} ${y0}H${x + w - r}Q${x + w} ${y0} ${x + w} ${y0 + r}V${y0 + h - r}Q${x + w} ${y0 + h} ${x + w - r} ${y0 + h}H${x + r}Q${x} ${y0 + h} ${x} ${y0 + h - r}V${y0 + 34}L${x - 8} ${y0 + 28}L${x} ${y0 + 22}V${y0 + r}Q${x} ${y0} ${x + r} ${y0}Z`,
			fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.25});
		const words = [];
		SPEECH[key].forEach((ln, li) => {
			const t = serif(g, x + 12, y0 + 22 + 20 * li, '', {fs: 15});
			ln.split(' ').forEach((wd, wi) => words.push(el(t, 'tspan', {'fill-opacity': 0}, (wi ? ' ' : '') + wd)));
		});
		return {g, words};
	};
	const spA = speech('a', Y.a1 + 40);
	const spB = speech('b', Y.b + 40);

	// ---- measure (after fonts load) -------------------------------------------------------
	const W = (node) => node.getComputedTextLength();
	function measure() {
		for (const o of [A, B]) {
			o.bubbles.forEach((b, k) => {
				const tw = W(b.t);
				b.w = Math.max(tw + 22, o.isA ? CW + 14 : 0);
				set(b.shape, {d: bubblePath(X.own, rowY(k) - 28, b.w, 26)});
				set(b.t, {x: X.own + (b.w - tw) / 2});
			});
			o.quotes.forEach((q) => set(q.wash, {width: W(q.t1) + 6}));
			if (o.unsaid) o.unsaid.forEach((u) => set(u.box, {width: W(u.t) + 8}));
			if (o.strike) {
				o.strikeW = W(o.noteText[2]);
				o.reasonW = W(o.reason);
				set(o.reasonClip, {x: 40, y: 188, height: 16, width: 0});
			}
		}
		set(rubricLine, {x2: 108});
		S.rubricW = W(rubricText);
		// Dot paths (block-local).
		const N = (i) => ({x: 19, y: NOTE_Y[i] - 4});
		const R = (k) => ({x: 168, y: rowY(k) - 15});
		const Ptop = {x: 110, y: 40}, Pbot = {x: 110, y: 90};
		const tk = T.tickA;
		A.path = pathAt([
			[T.bubA[0][0], T.bubA[0][0] + 0.15, HOME, R(0), E.inOut],
			[24.2, 24.6, R(0), N(0), E.inOut], [tk[0][1] + 0.25, tk[1][0], N(0), N(1), E.inOut], [tk[1][1] + 0.1, tk[2][0], N(1), N(2), E.inOut],
			[T.revA[1], T.revA[1] + 0.4, N(2), HOME, E.inOut],
			[T.bubA[1][0], T.bubA[1][0] + 0.15, HOME, R(1), E.inOut],
			[T.workA3[0], T.workA3[0] + 0.15, R(1), Ptop, E.inOut], [T.workA3[0] + 0.15, T.workA3[1] - 0.15, Ptop, Pbot, E.inOut], [T.workA3[1] - 0.15, T.workA3[1], Pbot, R(2), E.inOut],
			[T.workA4[0], T.workA4[0] + 0.15, R(2), Ptop, E.inOut], [T.workA4[0] + 0.15, T.workA4[1] - 0.2, Ptop, Pbot, E.inOut], [T.workA4[1] - 0.2, T.workA4[1], Pbot, HOME, E.inOut],
		], HOME);
		// The second student's route to the rubric runs up the gutter at the first divider.
		const up1 = {x: X.div1, y: 10}, up2 = {x: X.div1, y: -228}, rub = {x: 316, y: 93 - Y.b};
		const cS = (k) => ({x: X.own + 12, y: rowY(k) + 15}), cE = (k) => ({x: X.own + CW - 14, y: rowY(k) + 15});
		const wB = T.writeB;
		B.path = pathAt([
			[T.rubricUp[0], T.rubricUp[0] + 0.15, HOME, up1, E.inOut], [T.rubricUp[0] + 0.15, T.rubricUp[1] - 0.1, up1, up2, E.inOut], [T.rubricUp[1] - 0.1, T.rubricUp[1], up2, rub, E.inOut],
			[T.rubricDown[0], T.rubricDown[0] + 0.1, rub, up2, E.inOut], [T.rubricDown[0] + 0.1, T.rubricDown[1] - 0.15, up2, {x: X.div1, y: rowY(0) + 15}, E.inOut], [T.rubricDown[1] - 0.15, T.rubricDown[1], {x: X.div1, y: rowY(0) + 15}, cS(0), E.inOut],
			[wB[0][0], wB[0][1], cS(0), cE(0)], [wB[0][1], wB[0][1] + 0.2, cE(0), R(0), E.inOut],
			[58.2, 58.6, R(0), N(0), E.inOut], [59.0, 59.15, N(0), N(1), E.inOut],
			[59.4, 59.5, N(1), {x: 40, y: NOTE_Y[2] - 4}, E.inOut], [T.strikeB[0], T.strikeB[1], {x: 40, y: NOTE_Y[2] - 4}, {x: 166, y: NOTE_Y[2] - 4}],
			[T.strikeB[1], T.reasonB[0], {x: 166, y: NOTE_Y[2] - 4}, {x: 42, y: 195}, E.inOut], [T.reasonB[0], T.reasonB[1], {x: 42, y: 195}, {x: 160, y: 195}],
			[T.revB[1], T.revB[1] + 0.3, {x: 160, y: 195}, HOME, E.inOut],
			[wB[1][0] - 0.2, wB[1][0], HOME, cS(1), E.inOut], [wB[1][0], wB[1][1], cS(1), cE(1)], [wB[1][1], wB[1][1] + 0.15, cE(1), R(1), E.inOut],
			[T.workB3[0], T.workB3[0] + 0.15, R(1), Ptop, E.inOut], [T.workB3[0] + 0.15, T.workB3[1] - 0.15, Ptop, Pbot, E.inOut], [T.workB3[1] - 0.15, T.workB3[1], Pbot, HOME, E.inOut],
			[wB[2][0] - 0.2, wB[2][0], HOME, cS(2), E.inOut], [wB[2][0], wB[2][1], cS(2), cE(2)], [wB[2][1], wB[2][1] + 0.15, cE(2), R(2), E.inOut],
			[T.workB4[0], T.workB4[0] + 0.15, R(2), Ptop, E.inOut], [T.workB4[0] + 0.15, T.workB4[1] - 0.2, Ptop, Pbot, E.inOut], [T.workB4[1] - 0.2, T.workB4[1], Pbot, HOME, E.inOut],
		], HOME);
	}
	const S = {};

	// ---- render ------------------------------------------------------------------------------
	const draftLabel = (t, d2, d3, d4) => (t >= d4 ? 'DRAFT 4' : t >= d3 ? 'DRAFT 3' : t >= d2 ? 'DRAFT 2' : '');
	function renderPaper(o, t, stages) {
		// stages: [feedback ticks..., structure span, work3 span, para span, work4 span]
		const W0 = o.isA ? ROWS_A : ROWS_B;
		const {ticks, head, work3, para, work4} = stages;
		const fb = ticks.map((s) => prog(t, ...s, E.inOut));
		const kH = prog(t, ...head), k3 = prog(t, ...work3, E.inOut), kP = prog(t, ...para), k4 = prog(t, ...work4, E.inOut);
		o.rows.forEach((r, i) => {
			// Width: draft, then after the notes (one row per note), after structure, after strategy.
			const fbK = i === 1 ? fb[0] : i === 2 ? fb[1] : i === 4 ? fb[2] || 0 : 0;
			let w = mix(W0[0][i], W0[1][i], fbK);
			w = mix(w, W0[2][i], k3);
			w = mix(w, W0[3][i], k4);
			const greyK = i === 0 || i === 3 ? kH : i === 5 || i === 6 ? kP : 0;
			set(r.ink, {width: w, 'fill-opacity': 0.75 * (1 - greyK)});
			set(r.grey, {opacity: greyK});
			set(r.band, {width: w + 2});
			set(r.bar, {width: w});
		});
	}
	function renderDot(o, t, kIn, pulses) {
		const p = o.path(t);
		const pulse = Math.max(...pulses.map((s) => prog(t, s[0], s[0] + 0.4)).map((k) => (k > 0 && k < 1 ? k : 0)));
		set(o.dotG, {opacity: kIn});
		set(o.dot, {cx: p.x, cy: p.y, r: 5 * Math.min(1, kIn * 1.2)});
		set(o.ring, {cx: p.x, cy: p.y, r: 5 + 10 * pulse, opacity: pulse > 0 ? 1 - pulse : 0});
	}

	const render = (t) => {
		const dimK = prog(t, ...T.dim) - prog(t, ...T.undim);
		const ledOp = 1 - 0.85 * dimK;

		// Task card and rubric.
		const kc = prog(t, ...T.card, E.house);
		set(card, {opacity: kc, transform: `translate(0 ${mix(6, 0, kc)})`});
		set(rubric, {opacity: prog(t, ...T.rubric)});
		const kr = prog(t, ...T.rubricLine, E.inOut);
		set(rubricLine, {x2: 108 + (S.rubricW || 190) * kr, opacity: kr > 0 ? 1 - 0.6 * prog(t, 56.0, 56.5) : 0});

		// ---- first student --------------------------------------------------------------
		set(gA, {transform: `translate(0 ${mix(Y.a0, Y.a1, prog(t, ...T.moveA, E.inOutStrong))})`});
		set(A.name, {opacity: prog(t, ...T.dotA)});
		set(A.paper, {opacity: prog(t, ...T.paperA)});
		renderPaper(A, t, {ticks: T.tickA, head: T.headA, work3: T.workA3, para: T.paraA, work4: T.workA4});
		A.draft.textContent = draftLabel(t, T.draftA2[0], T.workA3[1] - 0.1, T.workA4[1] - 0.2);
		set(A.draft, {opacity: prog(t, ...T.draftA2)});
		set(A.rev, {opacity: prog(t, ...T.revA)});
		set(A.notes, {opacity: prog(t, ...T.notesA) * ledOp});
		A.ticks.forEach((tk, i) => set(tk, {opacity: prog(t, ...T.tickA[i])}));
		set(A.led, {opacity: ledOp});
		set(A.ledFrame, {opacity: prog(t, ...T.ledgerA)});
		A.aiSlots.forEach((s) => set(s, {opacity: prog(t, ...T.slotsA)}));
		const pulseC = bump(t, ...T.pulseCards);
		A.cards.forEach((c, k) => {
			const t0 = T.cardsA + k * T.cardStep;
			const [c0, c1] = T.carryA[k];
			const carry = prog(t, c0, c1, E.inOutStrong);
			const g = prog(t, c1 - 0.4, c1);
			set(c.c, {opacity: prog(t, t0, t0 + T.cardDur), transform: `translate(${CARRY * carry} 0)`});
			set(c.rect, {fill: mixColor(C.bright, C.band, g), stroke: mixColor(C.ink, C.grey, g), 'stroke-opacity': mix(0.45, 1, g), 'stroke-dasharray': g > 0.5 ? 'none' : '4 3', 'stroke-width': 1.2 + 1.4 * pulseC});
			set(c.label, {fill: mixColor(C.ink, C.grey, g)});
			set(c.bar, {width: 64 * g});
			set(A.ownSlots[k], {opacity: prog(t, c0 + 0.2, c0 + 0.8)});
		});
		const pq = bump(t, ...T.pulseQ);
		A.quotes.forEach((q, k) => {
			set(q.q, {opacity: prog(t, (T.backA[k][0] + T.backA[k][1]) / 2, T.backA[k][1])});
			set(q.wash, {'fill-opacity': 0.12 * pq});
		});
		set(A.key, {opacity: prog(t, ...T.key)});
		A.unsaid.forEach((u, k) => set(u.u, {opacity: prog(t, ...T.uns[k])}));
		A.bubbles.forEach((b, k) => {
			const [g0, g1] = T.bubA[k], [c0, c1] = T.carryA[k], [b0, b1] = T.backA[k];
			const grow = prog(t, g0 + 0.15, g1, E.house);
			const carry = prog(t, c0, c1, E.inOutStrong);
			const back = prog(t, b0, b1, E.inOut);
			// Back: from the AI's lane to the quote line in the requests lane, fading out.
			const dx = CARRY * carry - (CARRY - (X.req - X.own)) * back;
			const dy = (qY(k) - (rowY(k) - 10)) * back;
			set(b.b, {opacity: grow * (1 - back), transform: `translate(${dx} ${dy}) translate(${X.own} ${rowY(k) - 15}) scale(${mix(0.85, 1, grow)}) translate(${-X.own} ${-(rowY(k) - 15)})`});
		});
		renderDot(A, t, prog(t, ...T.dotA, E.house), T.bubA.map((s) => [s[0] + 0.15]));

		// ---- second student ------------------------------------------------------------------
		set(gB, {opacity: prog(t, ...T.blockB), transform: `translate(0 ${Y.b})`});
		renderPaper(B, t, {ticks: T.tickB, head: T.headB, work3: T.workB3, para: T.paraB, work4: T.workB4});
		B.draft.textContent = draftLabel(t, T.revB[0], T.workB3[1] - 0.1, T.workB4[1] - 0.2);
		set(B.draft, {opacity: prog(t, ...T.revB)});
		set(B.rev, {opacity: prog(t, ...T.revB)});
		set(B.notes, {opacity: prog(t, ...T.notesB) * ledOp});
		B.ticks.forEach((tk, i) => set(tk, {opacity: i < 2 ? prog(t, ...T.tickB[i]) : 0}));
		const ks = prog(t, ...T.strikeB);
		const ny = NOTE_Y[2] - 4;
		set(B.strike, {x1: 40, y1: ny, x2: 40 + ((B.strikeW || 106) + 4) * ks, y2: ny, opacity: ks > 0 ? 1 : 0});
		set(B.noteText[2], {'fill-opacity': 1 - 0.35 * ks});
		set(B.reasonClip, {width: ((B.reasonW || 120) + 4) * prog(t, ...T.reasonB)});
		set(B.led, {opacity: ledOp});
		B.aiSlots.forEach((s) => set(s, {opacity: 1}));
		B.ownSlots.forEach((s) => set(s, {opacity: 0}));
		B.cards.forEach((c, k) => {
			const w = prog(t, ...T.writeB[k]);
			set(c.c, {opacity: 1});
			set(c.rect, {fill: C.bright, stroke: mixColor(C.ink, C.red, w > 0 ? 1 : 0), 'stroke-opacity': w > 0 ? 1 : 0.45, 'stroke-dasharray': w > 0 ? 'none' : '4 3', 'stroke-width': w > 0 ? 1.6 : 1.2});
			set(c.label, {fill: mixColor(C.ink, C.red, Math.min(1, w * 2))});
			set(c.bar, {width: 64 * w, fill: C.red});
		});
		B.quotes.forEach((q, k) => set(q.q, {opacity: prog(t, (T.settleB[k][0] + T.settleB[k][1]) / 2, T.settleB[k][1])}));
		B.pointers.forEach((p, k) => {
			const kp = prog(t, T.settleB[k][1] - 0.3, T.settleB[k][1] + 0.1);
			const len = 30;
			set(p, {'stroke-dasharray': len, 'stroke-dashoffset': len * (1 - kp), opacity: kp > 0 ? 1 : 0});
		});
		B.bubbles.forEach((b, k) => {
			const [g0, g1] = T.bubB[k], [s0, s1] = T.settleB[k];
			const grow = prog(t, g0, g1, E.house);
			const settle = prog(t, s0, s1, E.inOut);
			const dx = (X.req - X.own) * settle, dy = (qY(k) - (rowY(k) - 10)) * settle;
			set(b.b, {opacity: grow * (1 - settle), transform: `translate(${dx} ${dy}) translate(${X.own} ${rowY(k) - 15}) scale(${mix(0.85, 1, grow)}) translate(${-X.own} ${-(rowY(k) - 15)})`});
		});
		renderDot(B, t, prog(t, ...T.blockB, E.house), T.bubB.map((s) => [s[0]]));

		// ---- faculty -----------------------------------------------------------------------------
		const kf = prog(t, ...T.fac, E.house);
		set(fac, {opacity: kf, transform: `translate(0 ${mix(6, 0, kf)})`});
		set(spA.g, {opacity: prog(t, ...T.panelA)});
		set(spB.g, {opacity: prog(t, ...T.panelB)});
		const words = (sp, [t0, t1]) => sp.words.forEach((w, i) => { const ti = t0 + ((t1 - t0) * i) / sp.words.length; set(w, {'fill-opacity': prog(t, ti, ti + 0.15)}); });
		words(spA, T.wordsA);
		words(spB, T.wordsB);

		renderNarrow(t);
	};

	// ---- the stacked text stage (any time a picture label would be hidden) -----------------
	// The two students side by side, as on desktop: each column carries the paper's
	// counter and tag, the AI's notes, and one cell per decision (the request, what it
	// left unsaid, and a chip saying who decides).
	const narrow = root.querySelector('[data-id-narrow]');
	const h = (tag, cls, parent, txt) => { const n = document.createElement(tag); if (cls) n.className = cls; if (txt != null) n.textContent = txt; parent.append(n); return n; };
	const NR = {};
	{
		const task = h('div', 'id-n-task', narrow);
		const p1 = h('p', null, task);
		h('b', null, p1, 'Example task');
		p1.append(' Recommend whether to keep a forward base.');
		NR.rubric = h('p', 'id-n-rubric', task);
		h('b', null, NR.rubric, 'Rubric ·');
		h('span', null, NR.rubric, 'Evidence must back the call.');
		NR.task = task;
		NR.fac = h('p', 'id-n-fac', narrow);
		h('b', null, NR.fac, 'Faculty ask');
		NR.fac.append('Better by whose standard?');
		const grid = h('div', 'id-n-grid', narrow);
		const column = (key) => {
			const isA = key === 'a';
			const c = {};
			c.el = h('div', 'id-n-col', grid);
			const who = h('p', 'id-n-who', c.el);
			h('span', null, who, isA ? 'First student' : 'Second student');
			c.draft = h('span', 'id-n-draft', who, 'Draft 1');
			const paper = h('p', 'id-n-paper', c.el);
			c.rev = h('span', 'id-n-rev', paper, 'Revised with AI');
			c.notes = h('div', 'id-n-notes', c.el);
			h('b', null, c.notes, "AI's notes");
			c.noteEls = NOTES.map((n) => {
				const line = h('p', 'id-n-note', c.notes);
				const tick = h('i', null, line, '✓');
				const txt = h('span', null, line, n);
				return {line, tick, txt};
			});
			if (!isA) c.reason = h('p', 'id-n-reason', c.notes, 'only if the evidence is');
			c.ledger = h('div', 'id-n-ledger', c.el);
			if (isA) c.key = h('p', 'id-n-key', c.ledger, 'Left unsaid');
			c.cells = [0, 1, 2].map((k) => {
				const cell = h('div', 'id-n-cell', c.ledger);
				const q = h('p', 'id-n-q', cell);
				if (isA) q.textContent = `“${REQ_A[k]}”`;
				else { q.append(`“${REQ_B[k][0]} `); h('span', 'is-red', q, REQ_B[k][1]); q.append('”'); }
				let uns = null;
				if (isA) { uns = h('p', 'id-n-uns', cell, 'Unsaid'); h('span', 'id-n-ghost', uns, UNSAID[k]); }
				const chip = h('p', 'id-n-chip', cell);
				const who = h('b', null, chip, "Student's to decide");
				h('span', null, chip, LABELS[k]);
				return {cell, q, uns, chip, who};
			});
			c.say = h('p', 'id-n-say', c.el, SPEECH[key].join(' '));
			return c;
		};
		NR.a = column('a');
		NR.b = column('b');
	}
	const fade = (node, k) => { node.style.opacity = Math.max(0, Math.min(1, k)).toFixed(3); };
	const vis = (node, on) => { node.style.visibility = on ? 'visible' : 'hidden'; };
	function renderNarrow(t) {
		if (!root.classList.contains('is-stacked')) return;
		const dimK = prog(t, ...T.dim) - prog(t, ...T.undim);
		const ledOp = 1 - 0.85 * dimK;
		fade(NR.task, prog(t, ...T.card));
		vis(NR.rubric, t >= T.rubric[0]);
		NR.rubric.classList.toggle('is-consulted', t >= T.rubricLine[0]);
		vis(NR.fac, t >= T.fac[0]);
		fade(NR.fac, prog(t, ...T.fac));
		// First student.
		const a = NR.a;
		fade(a.el, prog(t, ...T.dotA));
		a.draft.textContent = draftLabel(t, T.draftA2[0], T.workA3[1] - 0.1, T.workA4[1] - 0.2) || 'Draft 1';
		vis(a.rev, t >= T.revA[0]);
		vis(a.notes, t >= T.notesA[0]);
		fade(a.notes, ledOp);
		a.noteEls.forEach((n, i) => vis(n.tick, t >= T.tickA[i][0]));
		vis(a.ledger, t >= T.ledgerA[0]);
		fade(a.ledger, ledOp);
		vis(a.key, t >= T.key[0]);
		a.cells.forEach((c, k) => {
			const [c0, c1] = T.carryA[k];
			const carry = prog(t, c0, c1, E.inOutStrong);
			const crossed = t >= c1 - 0.4;
			vis(c.chip, t >= T.cardsA + k * T.cardStep);
			c.chip.classList.toggle('is-ai', crossed);
			c.who.textContent = crossed ? 'AI decides' : "Student's to decide";
			c.chip.style.transform = `translateX(${(carry > 0 && carry < 1 ? 40 * Math.sin(Math.PI * carry) : 0).toFixed(1)}px)`;
			vis(c.q, t >= T.backA[k][0]);
			vis(c.uns, t >= T.uns[k][0]);
		});
		vis(a.say, t >= T.panelA[0]);
		// Second student.
		const b = NR.b;
		vis(b.el, t >= T.blockB[0]);
		fade(b.el, prog(t, ...T.blockB));
		b.draft.textContent = draftLabel(t, T.revB[0], T.workB3[1] - 0.1, T.workB4[1] - 0.2) || 'Draft 1';
		vis(b.rev, t >= T.revB[0]);
		vis(b.notes, t >= T.notesB[0]);
		fade(b.notes, ledOp);
		b.noteEls.forEach((n, i) => {
			vis(n.tick, i < 2 && t >= T.tickB[i][0]);
			n.line.classList.toggle('is-struck', i === 2 && t >= T.strikeB[0]);
		});
		vis(b.reason, t >= T.reasonB[0]);
		fade(b.ledger, ledOp);
		b.cells.forEach((c, k) => {
			const own = t >= T.writeB[k][0];
			c.chip.classList.toggle('is-own', own);
			c.who.textContent = own ? 'Student decides' : "Student's to decide";
			vis(c.q, t >= T.settleB[k][0]);
		});
		vis(b.say, t >= T.panelB[0]);
	}
	// The stacked stage takes over whenever the smallest picture text (12 units) would render under 11 px.
	// The narrow stage keeps the height of its tallest moment, so the caption band and
	// controls never move while it plays.
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
		{at: 0, text: 'A student wants to improve a draft strategy paper.',
			detail: 'a task card at the top left: "Example task. Recommend whether to keep a forward base. Rubric: evidence must back the call." A red dot labelled First student appears beside a draft paper.'},
		{at: 8.7, text: 'Improving it takes many decisions. We\'ll track three.',
			detail: 'a ledger in three lanes: "The student decides", "Requests" and "The AI decides". Three dashed cards in the student\'s lane: "The criteria", "How the argument runs" and "What \'strategic\' means". The AI\'s lane shows three empty slots.'},
		{at: 16.7, text: 'The student asks an AI for feedback. The request carries the criteria across.',
			detail: 'a speech bubble, "Give me feedback", clips onto the criteria card, and the two travel slowly across into the AI\'s lane, where the card turns grey. The request settles in the middle lane. The AI\'s notes appear under the paper: "Tighten the opening", "Add a cost estimate", "Sound more decisive". The student ticks all three: draft 2, revised with AI.'},
		{at: 28.1, text: 'Then for a better structure, and a more strategic version.',
			detail: '"Suggest a better structure" carries "How the argument runs" across, and "Make it more strategic" carries "What \'strategic\' means". Both turn grey in the AI\'s lane. The AI\'s grey headings and paragraph appear in the paper, and the student revises to draft 4.'},
		{at: 40.1, text: 'Each request left out whose standard to use. The AI used its own.',
			detail: 'a key appears, "Left unsaid". Under each request, a dashed line marked "unsaid": against your criteria; for your argument; as you define it. The three grey cards pulse.'},
		{at: 49.6, text: 'A second student writes down each decision first, then asks for the same help.',
			detail: 'a second student appears, with their own draft and the same three dashed cards. Their dot goes up to the rubric line, comes back, and writes in the criteria card, which turns red. Then it asks, "Give me feedback against my criteria," with a red pointer back to the card. The same notes come back. The student ticks two and strikes "Sound more decisive" in red: "only if the evidence is".'},
		{at: 62.6, text: 'Each request points to a decision already made. The AI helps just as much.',
			detail: 'the dot writes in "How the argument runs", then asks, "Suggest a better structure for my argument." It writes in "What \'strategic\' means", then asks, "Make it more strategic, as I define it." All three cards stay red, and the AI\'s lane stays empty. The same grey headings and paragraph appear in this paper, up to draft 4.'},
		{at: 73.5, text: 'Faculty have only the papers. They ask each student about the standard.',
			detail: 'the ledgers and notes fade; the two papers stay, both at draft 4 and marked "Revised with AI". "Faculty ask each student: Better by whose standard?" appears. The first student says, "The AI\'s notes, I suppose. I worked through what it flagged." The second says, "Mine, set first from the rubric: does the evidence back my call?"'},
		{at: 88.5, text: 'Faculty check: What did the AI decide for the student?',
			list: 'Faculty check: What did the AI decide for the student? To find out, ask each student: better by whose standard?',
			detail: 'both lines appear under the picture at the same size, and the ledgers and notes return: the first student\'s three decisions in the AI\'s lane, the second student\'s three in their own.',
			check: {label: 'Faculty check', question: 'What did the AI decide for the student?', follow: 'To find out, ask each student: better by whose standard?', followAt: T.follow}},
	];

	document.fonts.ready.then(() => {
		measure();
		legibility(root, svg, VW, 11);
		new ResizeObserver(syncStacked).observe(svg);
		syncStacked();
		mount(root, {duration: T.end, render, beats: BEATS, poster: BEATS[2].at - 0.02});
	});
})();
