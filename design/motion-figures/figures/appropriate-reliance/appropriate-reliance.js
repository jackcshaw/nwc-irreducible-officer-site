/* Appropriate reliance: motion figure 8 of 8. Built to storyboard.md (round 3).
   The one interactive figure: the reader decides where one check goes, the study's
   results split the two tasks, then one condition changes and the reader calls again.
   Grey is what the AI supplied, red is the reader, navy is ink.
   The figure is a pure function of time and the reader's calls: render(t) sets every
   attribute from t and `calls`. Captions never branch; only the red marks, one pill
   label and the live-region text depend on the calls. Playback stops at two gates
   (the runtime's optional `gates`), and every view that doesn't play shows the
   question before the answer. Whenever any picture label would render under 11 px,
   the SVG gives way to a stacked stage driven by the same clock and calls. */
(() => {
	const {mount, E, mix, prog, el, set, legibility, FONT, isReduced} = MotionFigures;
	const C = {paper: '#f6f1e8', bright: '#fffdfa', ink: '#0a2242', red: '#b81b2b', grey: '#5b564f', band: '#ded5c4'};
	const VW = 960, VH = 540, MONO = 13;
	const ID = 'appropriate-reliance';

	// ---- timeline (absolute seconds, from the storyboard) -------------------
	const T = {
		// 1 · two tasks
		cardA: [1.0, 1.6], a1: [1.6, 1.9], a2: [1.9, 2.2], src: [2.4, 2.8], cardB: [4.0, 4.6], b1: [4.6, 5.0], b2: [5.0, 5.4],
		// 2 · the AI answers both
		aiHead: [16.0, 16.4], aiL1: [16.4, 16.8], aiL2: [16.8, 17.2], ready: [18.4, 18.8],
		// 3 · one check (gate 1 at 25.5)
		band: [22.7, 23.1], cond1: [24.4, 24.8], pills1: [25.0, 25.5],
		// 4 · the frontier, and inside it
		frontier: [32.7, 34.3], fLabels: [34.3, 34.7], inTitle: [36.7, 37.1], n1: [37.5, 37.9], n2: [38.1, 38.5], n3: [38.7, 39.1],
		// 5 · outside the frontier
		dim: [44.7, 45.2], panel: [45.2, 45.8], bar1: [47.1, 47.7], bars2: [47.9, 48.5], bracket: [49.1, 49.6], bracketText: [49.6, 50.0], settle: [53.5, 54.7],
		// 6 · what set them apart
		tagA: [57.2, 57.8], tagB1: [60.6, 61.2], tagB2: [61.4, 61.8],
		// 7 · the suggested call
		key: [68.2, 68.6], fade1: [68.8, 69.2], sugA: [69.7, 70.1], noteA: [70.5, 70.9], sugB: [72.2, 72.6], call1Off: [72.8, 73.2],
		// 8 · one thing changes (gate 2 at 83.5)
		cond2: [79.7, 80.1], pills2: [83.0, 83.5],
		// 9 · the call changes
		fade2: [91.2, 91.6], sug2: [94.9, 95.3], note2: [95.7, 96.1], call2Off: [96.3, 96.7],
		// 10 · the check
		follow: 105.9, end: 110.4,
	};
	const BEAT_AT = [0, 15.0, 21.7, 31.7, 43.7, 56.2, 67.2, 78.7, 90.2, 100.7];
	const GATES = [{at: 25.5, resumeAt: 30.2}, {at: 83.5, resumeAt: 88.7}];
	const GKEY = ['g1', 'g2'];

	// ---- the reader's calls ------------------------------------------------------
	// g1: which task gets the one check ('a' | 'b'); g2: Task A in the launch plan
	// ('rely' | 'move' | 'time'). ?calls=g1:a,g2:move preloads them for stills.
	const calls = {g1: null, g2: null};
	const params = new URLSearchParams(location.search);
	if (params.has('calls')) for (const kv of params.get('calls').split(',')) { const [k, v] = kv.split(':'); if (k in calls && v) calls[k] = v; }

	// ---- copy ------------------------------------------------------------------------
	const S = {
		src: "DELL'ACQUA ET AL. · FIELD EXPERIMENT, 2023 · 758 BCG CONSULTANTS · SOME WITH GPT-4",
		a1: 'Segment the footwear industry market', a2: 'based on users.',
		b1pre: 'Use a spreadsheet and ', b1mark: 'insider interviews', b1post: ' to', b2: 'pick the brand a clothing firm should back.',
		cond1: "IF IT'S YOUR TEAM'S FIRST DRAFT", cond2: 'IF IT GOES STRAIGHT INTO THE LAUNCH PLAN',
		band: 'TIME FOR ONE CHECK · A CHECK: WORK IT YOURSELF, THEN COMPARE',
		tagA: 'NO HIDDEN FACT · READING SHOWS A WEAK ANSWER',
		tagB1: 'THE DECIDING DETAILS WERE IN THE INTERVIEWS', tagB2: 'THE SPREADSHEET ONLY LOOKED COMPLETE',
		sugA: 'RELY ON IT', noteA: 'A CHECK HERE LEAVES TASK B UNCHECKED',
		sugB: 'WORK IT FROM THE INTERVIEWS, THEN COMPARE',
		sug2: 'MOVE YOUR CHECK HERE, OR ASK FOR TIME FOR BOTH', note2: "MOVING IT LEAVES TASK B'S DRAFT UNCHECKED",
		inTitle: 'WITH AI, ACROSS TASKS INSIDE THE FRONTIER',
		outTitle: 'RIGHT ANSWERS ON TASK B', bracket: 'Rated higher in quality, right or wrong',
	};
	const moveLabel = () => (calls.g1 === 'a' ? 'Keep my check here' : 'Move my check here');

	// ---- geometry ----------------------------------------------------------------------
	const X = {a: 24, b: 504}, CW = 432, CY = 48, CH = 428;
	const FRONTIER = [[480, 52], [471, 80], [489, 104], [468, 141], [486, 170], [474, 207], [492, 233], [467, 270], [485, 306], [473, 333], [490, 367], [469, 403], [484, 429], [474, 452], [480, 470]];
	const BAR = {x: 620, k: 2.8, h: 14};
	// Task B's evidence sits in its card slot; at the reveal it is drawn at 1.5x centre stage.
	const PANEL_T = {dx: -588, dy: -269.5, s: 1.5};

	const root = document.getElementById(ID);
	const svg = root.querySelector('svg');
	const shot = root.querySelector('[data-mf-shot]');
	el(svg, 'rect', {width: VW, height: VH, fill: C.paper});
	const scene = el(svg, 'g');
	const topLayer = el(svg, 'g');

	const text = (parent, x, y, str, {fs, family = FONT.sans, weight = 400, fill = C.ink, anchor = 'start', ls = 0, style} = {}) =>
		el(parent, 'text', {x, y, 'font-family': family, 'font-size': fs, 'font-weight': weight, fill, 'text-anchor': anchor, 'letter-spacing': ls, 'data-fs': fs, ...(style ? {'font-style': style} : {})}, str);
	const mono = (parent, x, y, str, opts = {}) => text(parent, x, y, str, {fs: MONO, family: FONT.mono, weight: 600, ls: 0.4, ...opts});
	const serif = (parent, x, y, str, opts = {}) => text(parent, x, y, str, {family: FONT.serif, fs: 18, ...opts});
	const sans600 = (parent, x, y, str, opts = {}) => text(parent, x, y, str, {fs: 13, weight: 600, ...opts});

	// ---- top band -------------------------------------------------------------------------
	const srcLine = mono(scene, 24, 18, S.src);
	const fIn = mono(scene, 456, 40, 'INSIDE THE FRONTIER', {anchor: 'end'});
	const fOut = mono(scene, 504, 40, 'OUTSIDE THE FRONTIER');

	// ---- cards -------------------------------------------------------------------------------
	const card = (k) => {
		const x0 = X[k], g = el(scene, 'g');
		el(g, 'rect', {x: x0, y: CY, width: CW, height: CH, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.15});
		mono(g, x0 + 16, 68, k === 'a' ? 'TASK A' : 'TASK B');
		return g;
	};
	const cardA = card('a'), cardB = card('b');
	const taskA1 = serif(cardA, 40, 92, S.a1), taskA2 = serif(cardA, 40, 114, S.a2);
	const taskB1 = serif(cardB, 520, 92, '');
	el(taskB1, 'tspan', {}, S.b1pre);
	const markSpan = el(taskB1, 'tspan', {}, S.b1mark);
	el(taskB1, 'tspan', {}, S.b1post);
	const taskB2 = serif(cardB, 520, 114, S.b2);

	// The AI's answers: identical on both cards.
	const aiBlock = (k) => {
		const x0 = X[k], g = el(scene, 'g');
		const head = el(g, 'g');
		mono(head, x0 + 16, 172, "AI'S ANSWER", {fill: C.grey});
		el(head, 'rect', {x: x0 + 16, y: 180, width: 400, height: 20, rx: 2, fill: C.band});
		const l1 = el(g, 'rect', {x: x0 + 26, y: 185, width: 0, height: 3.5, rx: 1.75, fill: C.grey, 'fill-opacity': 0.8});
		const l2 = el(g, 'rect', {x: x0 + 26, y: 192.5, width: 0, height: 3.5, rx: 1.75, fill: C.grey, 'fill-opacity': 0.8});
		const ready = el(g, 'g');
		el(ready, 'rect', {x: x0 + 344, y: 160, width: 72, height: 16, rx: 8, fill: C.grey});
		mono(ready, x0 + 380, 172.5, 'READY', {anchor: 'middle', fill: C.bright, ls: 0.6});
		return {head, l1, l2, ready};
	};
	const ai = {a: aiBlock('a'), b: aiBlock('b')};

	// A pill: an option the reader can choose, with a radio at its left.
	const pill = (parent, x, y, w, h, label) => {
		const g = el(parent, 'g');
		const rect = el(g, 'rect', {x, y, width: w, height: h, rx: h / 2, fill: C.bright, stroke: C.ink, 'stroke-width': 1.1, 'stroke-opacity': 0.55});
		el(g, 'circle', {cx: x + 14, cy: y + h / 2, r: 6.5, fill: C.bright, stroke: C.ink, 'stroke-width': 1.1, 'stroke-opacity': 0.7});
		const dot = el(g, 'circle', {cx: x + 14, cy: y + h / 2, r: 4.5, fill: C.red, opacity: 0});
		const t = sans600(g, x + 27, y + h / 2 + 4.5, label);
		return {g, rect, dot, t, x, y, w, h};
	};
	// A suggested call: a filled navy tag.
	const tag = (parent, x, y, str) => {
		const g = el(parent, 'g');
		const rect = el(g, 'rect', {x, y, width: 10, height: 17, rx: 3, fill: C.ink});
		const t = mono(g, x + 7, y + 12.6, str, {fill: C.bright});
		return {g, rect, t, x};
	};

	// Row 1 on both cards: the first-draft condition and the one check.
	const row1 = (k) => {
		const x0 = X[k];
		const cond = mono(scene, x0 + 16, 220, S.cond1);
		const yourCall = sans600(scene, x0 + 416, 220, 'Your call', {fill: C.red, anchor: 'end'});
		const p = pill(scene, x0 + 16, 228, 160, 26, 'Check this one');
		const rely = sans600(scene, x0 + 192, 246, 'You rely on it', {fill: C.red});
		return {cond, yourCall, p, rely};
	};
	const r1 = {a: row1('a'), b: row1('b')};
	const sugA = tag(scene, 40, 262, S.sugA);
	const noteA = mono(scene, 40, 294, S.noteA);
	const sugB = tag(scene, 520, 262, S.sugB);

	// Row 2 on card A: the launch plan.
	const cond2 = mono(scene, 40, 316, S.cond2);
	const yourCall2 = sans600(scene, 440, 316, 'Your call', {fill: C.red, anchor: 'end'});
	const r2 = {
		rely: pill(scene, 40, 324, 94, 24, 'Rely on it'),
		move: pill(scene, 142, 324, 146, 24, 'Move my check here'),
		time: pill(scene, 40, 352, 192, 24, 'Ask for time to check both'),
	};
	const sug2 = tag(scene, 40, 384, S.sug2);
	const note2 = mono(scene, 40, 416, S.note2);

	// Card A's evidence slot: the study, inside the frontier.
	const inTitle = mono(scene, 40, 436, S.inTitle);
	const nums = [['12.2%', 'more tasks', 40], ['25.1%', 'faster', 176], ['40%+', 'higher quality', 312]].map(([n, l, x]) => {
		const g = el(scene, 'g');
		serif(g, x, 456, n, {fs: 20, weight: 600});
		text(g, x, 469.5, l, {fs: 13});
		return g;
	});

	// Pattern tags: what set the tasks apart.
	const tagA = mono(scene, 40, 136, S.tagA);
	const underB = el(scene, 'line', {stroke: C.ink, 'stroke-width': 1.5});
	const tagB1 = mono(scene, 520, 136, S.tagB1);
	const tagB2 = mono(scene, 520, 151, S.tagB2);

	// The frontier.
	const frontier = el(scene, 'path', {d: 'M' + FRONTIER.map((p) => p.join(' ')).join('L'), fill: 'none', stroke: C.ink, 'stroke-width': 1.8, 'stroke-linejoin': 'round'});
	let fLen = 0;

	// Bottom band: the budget and the definition, then the keys.
	const bandLine = mono(scene, 480, 498, S.band, {anchor: 'middle'});
	const keySug = el(scene, 'g');
	const keySugT = mono(keySug, 936, 526, 'SUGGESTED CALL', {anchor: 'end'});
	const keySugSw = el(keySug, 'rect', {y: 516.5, width: 16, height: 11, rx: 2, fill: C.ink});
	const keyYou = el(scene, 'g');
	el(keyYou, 'circle', {cx: 29, cy: 521.5, r: 5, fill: C.red});
	mono(keyYou, 40, 526, 'YOUR CALLS', {fill: C.red});

	// Task B's evidence: above the dim, centre stage at first, then in its slot.
	const panelBg = el(topLayer, 'g');
	el(panelBg, 'rect', {x: 172, y: 170, width: 624, height: 212, fill: C.ink, 'fill-opacity': 0.07});
	el(panelBg, 'rect', {x: 168, y: 166, width: 624, height: 212, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.18, 'stroke-width': 1.2});
	const evB = el(topLayer, 'g');
	mono(evB, 520, 316, S.outTitle);
	text(evB, 520, 341, 'Without AI', {fs: 14});
	text(evB, 520, 369, 'With AI', {fs: 14});
	mono(evB, 520, 385, 'TWO GROUPS', {weight: 500});
	const bars = [{y: 329, v: 84.5, label: '84.5%'}, {y: 357, v: 60, label: '60%'}, {y: 375, v: 70, label: '70%'}].map((b) => ({
		...b, r: el(evB, 'rect', {x: BAR.x, y: b.y, height: BAR.h, width: 0, fill: C.ink, 'fill-opacity': 0.85}),
		t: text(evB, BAR.x + b.v * BAR.k + 8, b.y + 12, b.label, {fs: 14, weight: 600}),
	}));
	const bracket = el(evB, 'path', {d: `M${BAR.x} 395V400H${BAR.x + 70 * BAR.k}V395`, fill: 'none', stroke: C.ink, 'stroke-width': 1.5});
	const bracketText = serif(evB, BAR.x + 35 * BAR.k, 418, S.bracket, {fs: 15, style: 'italic', anchor: 'middle'});

	// ---- measure (after fonts load) -------------------------------------------------------
	const W = (node) => node.getComputedTextLength();
	const layout = {};
	function measure() {
		const fitPill = (p, extra = 37) => {
			p.w = Math.ceil(W(p.t) + extra);
			set(p.rect, {width: p.w});
		};
		// Row 2 widths fit their labels; the move pill fits either wording.
		fitPill(r2.rely);
		r2.move.t.textContent = 'Keep my check here';
		const keepW = W(r2.move.t);
		r2.move.t.textContent = 'Move my check here';
		r2.move.w = Math.ceil(Math.max(keepW, W(r2.move.t)) + 37);
		set(r2.move.rect, {width: r2.move.w});
		const moveX = r2.rely.x + r2.rely.w + 8;
		for (const n of r2.move.g.querySelectorAll('circle')) set(n, {cx: moveX + 14});
		set(r2.move.rect, {x: moveX});
		set(r2.move.t, {x: moveX + 27});
		r2.move.x = moveX;
		fitPill(r2.time);
		for (const tg of [sugA, sugB, sug2]) set(tg.rect, {width: Math.ceil(W(tg.t) + 14)});
		set(keySugSw, {x: 936 - W(keySugT) - 24});
		// The underline under "insider interviews".
		const b1 = taskB1.getStartPositionOfChar(S.b1pre.length).x;
		const b2 = b1 + W(markSpan);
		layout.under = [b1, b2];
		set(underB, {x1: b1, y1: 97, x2: b1, y2: 97});
		fLen = frontier.getTotalLength();
		set(frontier, {'stroke-dasharray': fLen});
		// Layout check: every line inside its card (exposed for the shot script).
		const right = (n) => n.getBBox().x + n.getBBox().width;
		layout.overflow = [
			[taskA1, 456], [tagA, 456], [noteA, 456], [note2, 456], [inTitle, 456], [cond2, 456],
			[taskB1, 936], [taskB2, 936], [tagB1, 936], [tagB2, 936], [bracketText, 936],
			[sugA.rect, 456], [sugB.rect, 936], [sug2.rect, 456], [r2.move.rect, 456], [r2.time.rect, 456], [srcLine, 960],
		].filter(([n, lim]) => right(n) > lim - 8).map(([n]) => n.textContent || 'rect');
		window.__arLayout = layout;
	}

	// ---- render ---------------------------------------------------------------------------
	let curGate = -1, reached = 0, lastT = 0;
	const chosen1 = (k) => calls.g1 === k;
	const drawPill = (p, kIn, isChosen, kFade) => {
		set(p.g, {opacity: kIn * (isChosen ? 1 : mix(1, 0.4, kFade))});
		set(p.dot, {opacity: isChosen ? 1 : 0});
		set(p.rect, {'stroke-width': isChosen ? 1.8 : 1.1, 'stroke-opacity': isChosen ? 0.95 : 0.55});
	};
	const render = (t, info = {}) => {
		curGate = info.gate ?? -1;
		const dimK = prog(t, ...T.dim) - prog(t, ...T.settle);
		set(scene, {opacity: 1 - 0.75 * dimK});

		// 1 · the tasks and the source.
		const kA = prog(t, ...T.cardA, E.house), kB = prog(t, ...T.cardB, E.house);
		set(cardA, {opacity: kA, transform: `translate(0 ${mix(6, 0, kA)})`});
		set(cardB, {opacity: kB, transform: `translate(0 ${mix(6, 0, kB)})`});
		set(taskA1, {opacity: prog(t, ...T.a1)}); set(taskA2, {opacity: prog(t, ...T.a2)});
		set(taskB1, {opacity: prog(t, ...T.b1)}); set(taskB2, {opacity: prog(t, ...T.b2)});
		set(srcLine, {opacity: prog(t, ...T.src)});

		// 2 · the AI's answers: the same motion, the same moment, the same tag.
		for (const b of Object.values(ai)) {
			set(b.head, {opacity: prog(t, ...T.aiHead)});
			set(b.l1, {width: 384 * prog(t, ...T.aiL1, E.inOut)});
			set(b.l2, {width: 236 * prog(t, ...T.aiL2, E.inOut)});
			const kr = prog(t, ...T.ready, E.house);
			set(b.ready, {opacity: kr});
		}

		// 3 · one check: the budget, the condition, the pills; the reader's marks.
		set(bandLine, {opacity: prog(t, ...T.band)});
		const kP1 = prog(t, ...T.pills1), kF1 = prog(t, ...T.fade1, E.inOut);
		for (const k of ['a', 'b']) {
			const r = r1[k];
			set(r.cond, {opacity: prog(t, ...T.cond1)});
			set(r.yourCall, {opacity: kP1 * (1 - prog(t, ...T.call1Off))});
			drawPill(r.p, kP1, chosen1(k), kF1);
			const other = k === 'a' ? 'b' : 'a';
			set(r.rely, {opacity: chosen1(other) ? kP1 : 0});
		}

		// 4 · the frontier, then the inside numbers.
		set(frontier, {'stroke-dashoffset': fLen * (1 - prog(t, ...T.frontier, E.inOut)), opacity: t >= T.frontier[0] ? 1 : 0});
		set(fIn, {opacity: prog(t, ...T.fLabels)});
		set(fOut, {opacity: prog(t, ...T.fLabels)});
		set(inTitle, {opacity: prog(t, ...T.inTitle)});
		nums.forEach((n, i) => set(n, {opacity: prog(t, ...[T.n1, T.n2, T.n3][i])}));

		// 5 · Task B's evidence, centre stage, then into its slot.
		const kPanel = prog(t, ...T.panel, E.house) * (1 - prog(t, ...T.settle, E.inOut));
		const kShow = prog(t, ...T.panel, E.house);
		set(panelBg, {opacity: kPanel});
		set(evB, {opacity: kShow, transform: `translate(${PANEL_T.dx * kPanel} ${PANEL_T.dy * kPanel}) scale(${mix(1, PANEL_T.s, kPanel)})`});
		bars.forEach((b, i) => {
			const span = i ? T.bars2 : T.bar1;
			set(b.r, {width: b.v * BAR.k * prog(t, ...span, E.outCubic)});
			set(b.t, {opacity: prog(t, span[1] - 0.1, span[1] + 0.1)});
		});
		set(bracket, {opacity: prog(t, ...T.bracket)});
		set(bracketText, {opacity: prog(t, ...T.bracketText)});

		// 6 · what set them apart.
		set(tagA, {opacity: prog(t, ...T.tagA)});
		const kU = prog(t, ...T.tagB1, E.inOut);
		if (layout.under) set(underB, {x2: mix(layout.under[0], layout.under[1], kU), opacity: kU > 0 ? 1 : 0});
		set(tagB1, {opacity: prog(t, ...T.tagB1)});
		set(tagB2, {opacity: prog(t, ...T.tagB2)});

		// 7 · the suggested call.
		set(keySug, {opacity: prog(t, ...T.key)});
		set(sugA.g, {opacity: prog(t, ...T.sugA)});
		set(noteA, {opacity: prog(t, ...T.noteA)});
		set(sugB.g, {opacity: prog(t, ...T.sugB)});
		set(keyYou, {opacity: Math.max(calls.g1 ? prog(t, ...T.call1Off) : 0, calls.g2 ? prog(t, ...T.call2Off) : 0)});

		// 8–9 · the launch plan, and the call it suggests.
		set(cond2, {opacity: prog(t, ...T.cond2)});
		const kP2 = prog(t, ...T.pills2), kF2 = prog(t, ...T.fade2, E.inOut);
		set(yourCall2, {opacity: kP2 * (1 - prog(t, ...T.call2Off))});
		if (r2.move.t.textContent !== moveLabel()) r2.move.t.textContent = moveLabel();
		for (const [id, p] of Object.entries(r2)) drawPill(p, kP2, calls.g2 === id, kF2);
		set(sug2.g, {opacity: prog(t, ...T.sug2)});
		set(note2, {opacity: prog(t, ...T.note2)});

		renderNarrow(t);
		track(t);
		syncUI();
	};

	// ---- the stacked stage --------------------------------------------------------------------
	// A fixed layout: every part is placed from the start and only fades in, so its height
	// never changes. Task B's centre-stage panel is an overlay over the dimmed stage.
	const narrow = root.querySelector('[data-ar-narrow]');
	const h = (tag, cls, parent, txt) => { const n = document.createElement(tag); if (cls) n.className = cls; if (txt != null) n.textContent = txt; parent.append(n); return n; };
	const N = {a: {}, b: {}};
	const nBody = h('div', 'ar-n-body', narrow);
	N.src = h('p', 'ar-n-src', nBody, S.src);
	const grid = h('div', 'ar-n-grid', nBody);
	const col = (k) => {
		const c = h('div', 'ar-n-col', grid);
		const n = N[k];
		n.flab = h('p', 'ar-n-flab', c, k === 'a' ? 'Inside the frontier' : 'Outside the frontier');
		n.card = h('div', 'ar-n-card', c);
		h('p', 'ar-n-tag', n.card, k === 'a' ? 'Task A' : 'Task B');
		const task = h('p', 'ar-n-task', n.card);
		if (k === 'a') { n.t1 = h('span', null, task, S.a1 + ' '); n.t2 = h('span', null, task, S.a2); }
		else {
			n.t1 = h('span', null, task);
			n.t1.append(S.b1pre);
			n.mark = h('span', 'ar-n-mark', n.t1, S.b1mark);
			n.t1.append(S.b1post + ' ');
			n.t2 = h('span', null, task, S.b2);
		}
		n.pat = h('p', 'ar-n-pat', n.card);
		if (k === 'a') n.pat1 = h('span', null, n.pat, 'No hidden fact · reading shows a weak answer');
		else { n.pat1 = h('span', null, n.pat, 'The deciding details were in the interviews. '); n.pat2 = h('span', null, n.pat, 'The spreadsheet only looked complete.'); }
		n.ai = h('div', 'ar-n-ai', n.card);
		const aiHead = h('p', 'ar-n-aihead', n.ai);
		h('span', null, aiHead, "AI's answer");
		n.ready = h('span', 'ar-n-ready', aiHead, 'Ready');
		const lines = h('div', 'ar-n-lines', n.ai);
		n.aiL1 = h('i', 'ar-n-line', lines); n.aiL2 = h('i', 'ar-n-line is-short', lines);
		n.cond = h('p', 'ar-n-cond', n.card);
		h('span', null, n.cond, "If it's your team's first draft");
		n.yc = h('span', 'ar-n-yc', n.cond, 'Your call');
		n.opt = h('div', 'ar-n-opt', n.card);
		h('span', 'ar-n-radio', n.opt);
		h('span', null, n.opt, 'Check this one');
		n.rely = h('p', 'ar-n-rely', n.card, 'You rely on it');
		n.sug = h('p', 'ar-n-sugp', n.card);
		n.sugT = h('span', 'ar-n-sug', n.sug, k === 'a' ? 'Rely on it' : 'Work it from the interviews, then compare');
		if (k === 'a') {
			n.note = h('p', 'ar-n-note', n.card, 'A check here leaves Task B unchecked');
			n.cond2 = h('p', 'ar-n-cond', n.card);
			h('span', null, n.cond2, 'If it goes straight into the launch plan');
			n.yc2 = h('span', 'ar-n-yc', n.cond2, 'Your call');
			n.opts2 = {};
			for (const [id, label] of [['rely', 'Rely on it'], ['move', 'Move my check here'], ['time', 'Ask for time to check both']]) {
				const o = h('div', 'ar-n-opt', n.card);
				h('span', 'ar-n-radio', o);
				n.opts2[id] = {o, label: h('span', null, o, label)};
			}
			n.sug2p = h('p', 'ar-n-sugp', n.card);
			n.sug2 = h('span', 'ar-n-sug', n.sug2p, 'Move your check here, or ask for time for both');
			n.note2 = h('p', 'ar-n-note', n.card, "Moving it leaves Task B's draft unchecked");
			n.ev = h('div', 'ar-n-ev', n.card);
			n.evTitle = h('p', 'ar-n-evtitle', n.ev, 'With AI, across tasks inside the frontier');
			n.nums = [['12.2%', 'more tasks'], ['25.1%', 'faster'], ['40%+', 'higher quality']].map(([a, b]) => { const p = h('p', 'ar-n-num', n.ev); h('b', null, p, a); p.append(' ' + b); return p; });
		} else {
			n.ev = h('div', 'ar-n-ev', n.card);
			n.evIn = h('div', null, n.ev);
		}
		return c;
	};
	col('a');
	N.gut = h('div', 'ar-n-gut', grid);
	{
		const zig = el(N.gut, 'svg', {viewBox: '0 0 18 200', preserveAspectRatio: 'none', 'aria-hidden': 'true'});
		N.zig = el(zig, 'polyline', {points: '9,0 4,14 14,27 3,44 13,60 6,77 15,92 3,111 12,128 6,143 14,160 4,177 11,190 9,200', fill: 'none', stroke: C.ink, 'stroke-width': 1.6, 'vector-effect': 'non-scaling-stroke', 'pathLength': 1, 'stroke-dasharray': 1});
	}
	col('b');
	// Task B's evidence, written once and used in the slot and in the overlay.
	const evHtml = (parent) => {
		h('p', 'ar-n-evtitle', parent, 'Right answers on Task B');
		const rows = [['Without AI', 84.5, '84.5%'], ['With AI · two groups', 60, '60%'], ['', 70, '70%']].map(([l, v, s]) => {
			const r = h('div', 'ar-n-bar', parent);
			h('span', 'ar-n-barl', r, l);
			const track = h('span', 'ar-n-bart', r);
			const fill = h('i', null, track);
			fill.style.width = `${v}%`;
			h('b', null, r, s);
			return {r, fill};
		});
		const q = h('p', 'ar-n-evq', parent, 'Rated higher in quality, right or wrong');
		return {rows, q};
	};
	N.evSlot = evHtml(N.b.evIn);
	N.band = h('p', 'ar-n-band', nBody, 'Time for one check · A check: work it yourself, then compare');
	N.keys = h('div', 'ar-n-keys', nBody);
	N.keyYou = h('span', 'ar-n-keyyou', N.keys, 'Your calls');
	N.keySug = h('span', 'ar-n-keysug', N.keys, 'Suggested call');
	N.panel = h('div', 'ar-n-panel', narrow);
	N.evPanel = evHtml(N.panel);

	const op = (node, k) => { node.style.opacity = Math.max(0, Math.min(1, k)).toFixed(3); };
	function renderNarrow(t) {
		if (!root.classList.contains('is-stacked')) return;
		const dimK = prog(t, ...T.dim) - prog(t, ...T.settle);
		op(nBody, 1 - 0.85 * dimK);
		const kPanel = prog(t, ...T.panel) * (1 - prog(t, ...T.settle));
		op(N.panel, kPanel);
		N.panel.style.visibility = kPanel > 0 ? 'visible' : 'hidden';
		op(N.src, prog(t, ...T.src));
		op(N.a.card, prog(t, ...T.cardA)); op(N.b.card, prog(t, ...T.cardB));
		op(N.a.t1, prog(t, ...T.a1)); op(N.a.t2, prog(t, ...T.a2));
		op(N.b.t1, prog(t, ...T.b1)); op(N.b.t2, prog(t, ...T.b2));
		const kF1 = prog(t, ...T.fade1), kP1 = prog(t, ...T.pills1);
		for (const k of ['a', 'b']) {
			const n = N[k];
			op(n.flab, prog(t, ...T.fLabels));
			op(n.ai, prog(t, ...T.aiHead));
			n.aiL1.style.transform = `scaleX(${prog(t, ...T.aiL1).toFixed(3)})`;
			n.aiL2.style.transform = `scaleX(${prog(t, ...T.aiL2).toFixed(3)})`;
			op(n.ready, prog(t, ...T.ready));
			op(n.cond, prog(t, ...T.cond1));
			op(n.yc, kP1 * (1 - prog(t, ...T.call1Off)));
			const isChosen = chosen1(k);
			op(n.opt, kP1 * (isChosen ? 1 : mix(1, 0.4, kF1)));
			n.opt.classList.toggle('is-chosen', isChosen);
			op(n.rely, chosen1(k === 'a' ? 'b' : 'a') ? kP1 : 0);
		}
		op(N.zig.parentNode, t >= T.frontier[0] ? 1 : 0);
		set(N.zig, {'stroke-dashoffset': 1 - prog(t, ...T.frontier)});
		op(N.a.evTitle, prog(t, ...T.inTitle));
		N.a.nums.forEach((p, i) => op(p, prog(t, ...[T.n1, T.n2, T.n3][i])));
		op(N.b.ev, prog(t, ...T.settle));
		[N.evSlot, N.evPanel].forEach((ev, j) => {
			ev.rows.forEach((r, i) => {
				const k = j ? prog(t, ...(i ? T.bars2 : T.bar1)) : 1;
				r.fill.style.transform = `scaleX(${k.toFixed(3)})`;
				op(r.r, j ? Math.min(1, prog(t, ...(i ? T.bars2 : T.bar1)) * 3) : 1);
			});
			op(ev.q, j ? prog(t, ...T.bracketText) : 1);
		});
		op(N.a.pat, prog(t, ...T.tagA));
		op(N.b.pat1, prog(t, ...T.tagB1)); op(N.b.pat2, prog(t, ...T.tagB2));
		op(N.b.pat, prog(t, ...T.tagB1) > 0 ? 1 : 0);
		N.b.mark.classList.toggle('is-under', t >= T.tagB1[0]);
		op(N.a.sug, prog(t, ...T.sugA)); op(N.a.note, prog(t, ...T.noteA));
		op(N.b.sug, prog(t, ...T.sugB));
		op(N.keySug, prog(t, ...T.key));
		op(N.keyYou, Math.max(calls.g1 ? prog(t, ...T.call1Off) : 0, calls.g2 ? prog(t, ...T.call2Off) : 0));
		op(N.band, prog(t, ...T.band));
		const kP2 = prog(t, ...T.pills2), kF2 = prog(t, ...T.fade2);
		op(N.a.cond2, prog(t, ...T.cond2));
		op(N.a.yc2, kP2 * (1 - prog(t, ...T.call2Off)));
		if (N.a.opts2.move.label.textContent !== moveLabel()) N.a.opts2.move.label.textContent = moveLabel();
		for (const [id, o] of Object.entries(N.a.opts2)) {
			const isChosen = calls.g2 === id;
			op(o.o, kP2 * (isChosen ? 1 : mix(1, 0.4, kF2)));
			o.o.classList.toggle('is-chosen', isChosen);
		}
		op(N.a.sug2p, prog(t, ...T.sug2)); op(N.a.note2, prog(t, ...T.note2));
	}
	// The stacked stage takes over whenever the smallest picture text would render under
	// 11 px at the runtime's letterboxed scale.
	let api = null;
	const syncStacked = () => {
		const r = svg.getBoundingClientRect();
		if (!r.width) return;
		const scale = r.height ? Math.min(r.width / VW, r.height / VH) : r.width / VW;
		const stacked = MONO * scale < 11;
		if (stacked !== root.classList.contains('is-stacked')) {
			root.classList.toggle('is-stacked', stacked);
			if (api) api.redraw();
		} else if (curGate >= 0) positionHits(curGate);
	};

	// ---- gates, controls and the text equivalent --------------------------------------------
	const hitsets = [...root.querySelectorAll('[data-ar-gate]')];
	const gatebar = root.querySelector('[data-ar-gatebar]');
	const btnContinue = root.querySelector('[data-ar-continue]');
	const btnSkip = root.querySelector('[data-ar-skip]');
	const live = root.querySelector('[data-ar-live]');
	const sum2 = root.querySelector('[data-ar-sum2]');
	const showAll = root.querySelector('[data-ar-showall]');
	const after = document.getElementById('ar-after');
	let released = 3, showAllBeats = false, autoOpened = false;
	// The drawn element each option's hit target sits over, in each mode.
	const target = (gate, value) => {
		const stacked = root.classList.contains('is-stacked');
		if (gate === 0) return stacked ? N[value].opt : r1[value].p.rect;
		return stacked ? N.a.opts2[value].o : r2[value].rect;
	};
	function positionHits(gate) {
		const base = shot.getBoundingClientRect();
		for (const label of hitsets[gate].querySelectorAll('[data-ar-opt]')) {
			const r = target(gate, label.dataset.arOpt).getBoundingClientRect();
			const pad = 3;
			Object.assign(label.style, {left: `${r.left - base.left - pad}px`, top: `${r.top - base.top - pad}px`, width: `${r.width + 2 * pad}px`, height: `${r.height + 2 * pad}px`});
		}
	}
	function syncUI() {
		hitsets.forEach((fs, i) => { fs.hidden = curGate !== i; });
		gatebar.hidden = curGate < 0;
		if (curGate >= 0) {
			btnContinue.disabled = !calls[GKEY[curGate]];
			for (const inp of hitsets[curGate].querySelectorAll('input')) inp.checked = calls[GKEY[curGate]] === inp.value;
			positionHits(curGate);
		}
		const moveSr = root.querySelector('[data-ar-movelabel]');
		if (moveSr && moveSr.textContent !== moveLabel()) moveSr.textContent = moveLabel();
	}
	const say = (msg) => { live.textContent = ''; requestAnimationFrame(() => { live.textContent = msg; }); };
	const ASK = [
		'You have time to check one of the two tasks. Choose Task A or Task B, then Continue, or skip this question.',
		'Now your segmentation goes straight into the launch plan. For Task A, choose Rely on it, ' + 'Move my check here, or Ask for time to check both, then Continue.',
	];
	const verdict1 = () => {
		const base = 'Suggested call: rely on Task A, and work Task B yourself from the interviews, then compare. A check on Task A leaves Task B unchecked.';
		if (calls.g1 === 'a') return base + ' You checked Task A and relied on Task B.';
		if (calls.g1 === 'b') return base + ' You checked Task B and relied on Task A.';
		return base;
	};
	const verdict2 = () => {
		const base = "Suggested call: move your check to Task A, or ask for time to check both. A miss now goes into the launch. Moving the check leaves Task B's draft unchecked.";
		const mine = {rely: ' You chose to rely on it.', move: ` You chose: ${moveLabel().toLowerCase()}.`, time: ' You chose to ask for time to check both.'}[calls.g2];
		return base + (mine || '');
	};
	// Track how far the reader has got: release the beat list and the page copy gate by
	// gate, and announce each suggested call as it appears.
	function track(t) {
		reached = Math.max(reached, t);
		const n = showAllBeats ? 10 : 3 + (reached > GATES[0].at + 0.05 ? 5 : 0) + (reached > GATES[1].at + 0.05 ? 2 : 0);
		if (n !== released) {
			released = n;
			[...root.querySelectorAll('[data-mf-beats] > li')].forEach((li, i) => { li.hidden = i >= n; });
			sum2.hidden = n < 4;
			showAll.hidden = n >= 10;
		}
		if (!autoOpened && reached >= BEAT_AT[9] && after) { after.open = true; autoOpened = true; }
		if (lastT < T.sugB[1] && t >= T.sugB[1] && t - lastT < 1) say(verdict1());
		if (lastT < T.sug2[1] && t >= T.sug2[1] && t - lastT < 1) say(verdict2());
		lastT = t;
	}
	const reducedNow = () => isReduced() && !params.has('t');
	// Continue / Skip. Under reduced motion they step to the next settled question, then
	// to the final frame; otherwise playback resumes past the gate.
	const pass = (skip) => {
		const g = curGate;
		if (g < 0 || !api) return;
		if (skip) calls[GKEY[g]] = null;
		if (reducedNow()) {
			if (g === 0) api.openGate(1);
			else { api.seek(T.end); if (after) after.open = true; }
		} else api.resume(g);
	};
	btnContinue.addEventListener('click', () => pass(false));
	btnSkip.addEventListener('click', () => pass(true));
	hitsets.forEach((fs, i) => fs.addEventListener('change', (e) => {
		if (!e.target.matches('input')) return;
		calls[GKEY[i]] = e.target.value;
		if (api) api.redraw();
	}));
	showAll.addEventListener('click', () => { showAllBeats = true; if (api) api.redraw(); });
	// Start over clears the calls (registered before the runtime's own restart handler).
	root.querySelector('[data-mf-replay]').addEventListener('click', () => {
		calls.g1 = calls.g2 = null;
		reached = 0; lastT = 0; showAllBeats = false;
	});
	// Under reduced motion, a beat-list click on a question opens that question.
	root.querySelector('[data-mf-beats]').addEventListener('click', (e) => {
		const b = e.target.closest('[data-beat]');
		if (!b || !api || !reducedNow()) return;
		const i = +b.dataset.beat;
		if (i === 2) api.openGate(0);
		if (i === 7) api.openGate(1);
	});
	// Print: the question on the first page, then the final frame and the full text.
	// Printing shows the whole answer, so afterwards the screen goes back to where it was.
	const printQ = document.querySelector('[data-ar-printq]');
	let beforePrint = null;
	addEventListener('beforeprint', () => {
		const f = window.__motionFigures && window.__motionFigures[ID];
		if (!f || !printQ) return;
		const scrub = root.querySelector('[data-mf-scrub]');
		beforePrint = {t: scrub ? +scrub.value : 0, reached, open: after ? after.open : false, autoOpened};
		f.seek(GATES[0].at);
		printQ.querySelector('[data-ar-printq-svg]').replaceChildren(svg.cloneNode(true));
		if (after) after.open = true;
	});
	addEventListener('afterprint', () => {
		if (!beforePrint || !api) return;
		reached = beforePrint.reached; autoOpened = beforePrint.autoOpened; released = -1;
		if (after) after.open = beforePrint.open;
		api.seek(beforePrint.t);
		beforePrint = null;
	});

	const BEATS = [
		{at: BEAT_AT[0], text: 'Two tasks from one study.',
			detail: 'two task cards. Task A: "Segment the footwear industry market based on users." Task B: "Use a spreadsheet and insider interviews to pick the brand a clothing firm should back." At top left: "Dell\'Acqua et al. · Field experiment, 2023 · 758 BCG consultants · some with GPT-4".'},
		{at: BEAT_AT[1], text: 'An AI answers both. The two answers look equally finished.',
			detail: 'under each task, "AI\'s answer" and two grey lines of writing on a beige band. Each gets the same grey "Ready" tag at the same moment.'},
		{at: BEAT_AT[2], text: 'You have time to check one. Which one?',
			detail: 'along the bottom, "Time for one check. A check: work it yourself, then compare." Each card gets the line "If it\'s your team\'s first draft" and a "Check this one" button. The figure waits for your choice. Your choice shows as a red dot on that card, and "You rely on it" in red on the other.'},
		{at: BEAT_AT[3], text: 'A jagged frontier marks where an AI stops being reliable. Inside this one, AI helped.',
			detail: 'an uneven line is drawn down between the cards, labelled "Inside the frontier" over Task A and "Outside the frontier" over Task B. On Task A\'s card: with AI, across tasks inside the frontier, 12.2% more tasks, 25.1% faster, more than 40% higher quality.'},
		{at: BEAT_AT[4], text: 'On Task B, consultants with AI were right less often. Graders still rated their work higher.',
			detail: 'the picture dims and a panel rises: right answers on Task B. Without AI, 84.5%. With AI, two groups, 60% and 70%. A bracket under the AI bars: "Rated higher in quality, right or wrong." The panel settles onto Task B\'s card.'},
		{at: BEAT_AT[5], text: 'Task A had no hidden fact. Task B had one, in the interviews.',
			detail: 'under Task A: "No hidden fact. Reading shows a weak answer." In Task B, "insider interviews" is underlined, with "The deciding details were in the interviews. The spreadsheet only looked complete."'},
		{at: BEAT_AT[6], text: 'The evidence suggests relying on Task A and working Task B yourself from the interviews.',
			detail: 'a key at bottom right, "Suggested call". The options you didn\'t choose fade. Task A gets a navy "Rely on it" tag, with the note "A check here leaves Task B unchecked". Task B gets "Work it from the interviews, then compare". Your choice stays in red.'},
		{at: BEAT_AT[7], text: 'Now your segmentation goes straight into the launch plan. What about Task A?',
			detail: 'a second line appears on Task A: "If it goes straight into the launch plan", with three buttons: "Rely on it", "Move my check here" and "Ask for time to check both". The figure waits for your choice.'},
		{at: BEAT_AT[8], text: 'Same task, same side of the frontier. Now a miss goes into the launch.',
			detail: 'the options you didn\'t choose fade. Task A\'s second line gets a navy tag, "Move your check here, or ask for time for both", with the note "Moving it leaves Task B\'s draft unchecked".'},
		{at: BEAT_AT[9], text: 'Faculty check: What evidence justified relying on the system here, and what would have changed the call?',
			list: 'Faculty check: What evidence justified relying on the system here, and what would have changed the call? Change one condition and ask for the call again.',
			detail: 'both lines under the picture at the same size. Both tasks, both answers, the frontier, the evidence and every suggested call stay in view.',
			check: {label: 'Faculty check', question: 'What evidence justified relying on the system here, and what would have changed the call?', follow: 'Change one condition and ask for the call again.', followAt: T.follow}},
	];

	document.fonts.ready.then(() => {
		measure();
		legibility(root, svg, VW, 11);
		new ResizeObserver(syncStacked).observe(svg);
		syncStacked();
		api = mount(root, {
			duration: T.end, render, beats: BEATS, poster: GATES[0].at, gates: GATES, reducedAt: GATES[0].at,
			onGate: (i) => {
				const controls = root.querySelector('.mf-controls');
				const focusWasOnPlayer = controls && controls.contains(document.activeElement);
				say(ASK[i]);
				if (focusWasOnPlayer) {
					const inputs = [...hitsets[i].querySelectorAll('input')];
					(inputs.find((x) => x.checked) || inputs[0]).focus();
				}
			},
		});
		// The beat list starts released up to the first question.
		[...root.querySelectorAll('[data-mf-beats] > li')].forEach((li, i) => { li.hidden = i >= released; });
		if (reducedNow()) api.openGate(0);
	});
})();
