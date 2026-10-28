/* Appropriate reliance: motion figure 8 of 8. Built to storyboard.md (round 5,
   revised after figure cold read 2).
   The one interactive figure: the reader decides where one check goes, the study's
   results split the two tasks, then one condition changes and the reader calls again.
   Grey is what the AI supplied, red is the reader, navy is ink.
   The figure is a pure function of time and the reader's calls: render(t) sets every
   attribute from t, `calls` and which questions were skipped. Captions never branch.
   Nothing reveals a call before it is made: the figure opens on the first question,
   no seek, scrub or beat click passes an unanswered question (the runtime's
   lockedAt), and the beat list, the hidden summary and the page copy unlock question
   by question. Whenever any picture label would render under 11 px, the SVG gives way
   to a stacked stage driven by the same clock and calls; it grows only at a question,
   so it is compact while the reader decides. */
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
		// 3 · one check (question 1 at 25.5)
		band: [22.7, 23.1], cond1: [24.4, 24.8], pills1: [25.0, 25.5],
		// 4 · the frontier, and inside it
		frontier: [32.7, 34.3], fLabels: [34.3, 34.7], inTitle: [36.7, 37.1], n1: [37.5, 37.9], n2: [38.1, 38.5], n3: [38.7, 39.1],
		// 5 · outside the frontier
		dim: [44.7, 45.2], panel: [45.2, 45.8], bar1: [47.1, 47.7], bars2: [47.9, 48.5], bracket: [49.1, 49.6], bracketText: [49.6, 50.0], settle: [54.0, 55.2],
		// 6 · what set them apart: Task B's study fact first, then what the evidence suggests about A
		tagB1: [57.7, 58.3], tagB2: [58.5, 58.9], tagA1: [61.8, 62.2], tagA2: [62.4, 62.8],
		// 7 · the suggested call
		key: [71.2, 71.6], fade1: [71.8, 72.2], sugA: [72.7, 73.1], noteA: [73.5, 73.9], sugB: [75.2, 75.6], call1Off: [75.8, 76.2],
		// 8 · one thing changes (question 2 at 88.0)
		cond2: [84.2, 84.6], pills2: [87.5, 88.0],
		// 9 · the call
		fade2: [97.2, 97.6], sug2: [102.2, 102.6], noteMove: [103.0, 103.4], noteAsk: [103.6, 104.0], call2Off: [104.2, 104.6],
		// 10 · the check
		follow: 113.4, end: 117.9,
	};
	// The card's progress (0 large, 1 in its corner) from which question 1's options fade in:
	// by then it has moved clear of them at every size (checked at 1440 × 900, 1366 × 768,
	// 1280 × 720 and 390 × 844).
	const CARD_CLEAR = 0.9;
	const BEAT_AT = [0, 15.0, 21.7, 31.7, 43.7, 56.7, 70.2, 83.2, 96.2, 108.2];
	const GATES = [{at: 25.5, resumeAt: 30.2}, {at: 88.0, resumeAt: 94.7}];
	const GKEY = ['g1', 'g2'];

	// ---- the reader's calls ------------------------------------------------------
	// g1: which task gets the one check ('a' | 'b'); g2: Task A in the launch plan
	// ('rely' | 'move' | 'time'). A question is resolved once the reader continues or
	// skips it; only the explicit Skip records "No call made". ?t= holds a moment but
	// still stops at an unanswered question; the runtime's window seek hook is the
	// export path. ?calls=g1:a,g2:move preloads calls for stills, and g1:skip a skip.
	const params = new URLSearchParams(location.search);
	const testMode = params.has('t');
	const calls = {g1: null, g2: null};
	const resolved = {g1: false, g2: false};
	const skipped = {g1: false, g2: false};
	if (params.has('calls')) for (const kv of params.get('calls').split(',')) {
		const [k, v] = kv.split(':');
		if (!(k in calls) || !v) continue;
		if (v === 'skip') skipped[k] = true; else calls[k] = v;
	}

	// ---- copy ------------------------------------------------------------------------
	const S = {
		src: "DELL'ACQUA ET AL. · FIELD EXPERIMENT, 2023 · 758 BCG CONSULTANTS · SOME WITH GPT-4",
		a1: 'Segment the footwear industry market', a2: 'based on users.',
		b1pre: 'Use a spreadsheet and ', b1mark: 'insider interviews', b1post: ' to', b2: 'pick the brand a clothing firm should back.',
		cond1: "IF IT'S YOUR TEAM'S FIRST DRAFT", cond2: 'IF IT GOES STRAIGHT INTO THE LAUNCH PLAN',
		band: 'TIME FOR ONE CHECK · A CHECK: WORK IT YOURSELF, THEN COMPARE',
		tagA1: 'WHAT THE EVIDENCE SUGGESTS', tagA2: 'No hidden facts: a weak answer shows when read.',
		tagB1: 'THE DECIDING DETAILS WERE IN THE INTERVIEWS', tagB2: 'THE SPREADSHEET ONLY LOOKED COMPLETE',
		sugA: 'RELY ON IT', noteA: 'A CHECK HERE LEAVES TASK B UNCHECKED',
		sugB: 'WORK IT FROM THE INTERVIEWS, THEN COMPARE',
		sug2: "RELY ON IT · READ IT BEFORE IT'S BUILT", noteMove: 'TASK B: READ-THROUGH ONLY', noteAsk: 'LAUNCH SLIPS A WEEK',
		rely2: 'Rely on it, after a careful read', ask2: 'Ask for a week to check both',
		inTitle: 'WITH AI, ACROSS TASKS INSIDE THE FRONTIER',
		outTitle: 'RIGHT ANSWERS ON TASK B', bracket: 'Rated higher in quality, right or wrong',
		keySug: 'SUGGESTED CALL · REASONED FROM THE RESULTS',
	};
	const moveLabel = () => (calls.g1 === 'a' ? 'Keep my check here' : calls.g1 === 'b' ? 'Move my check here' : 'Put my check here');
	const movedFromB = () => calls.g1 === 'b' && calls.g2 === 'move';

	// ---- geometry ----------------------------------------------------------------------
	const X = {a: 24, b: 504}, CW = 432, CY = 48, CH = 428;
	const FRONTIER = [[480, 52], [471, 80], [489, 104], [468, 141], [486, 170], [474, 207], [492, 233], [467, 270], [485, 306], [473, 333], [490, 367], [469, 403], [484, 429], [474, 452], [480, 470]];
	const BAR = {x: 648, k: 2.6, h: 13};
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
	// Answer text exists in the DOM only once it is revealed: render(t) fills each of these
	// from t (empty before its moment), so find-in-page, innerText and a printed page's text
	// layer can't give a call away, and Start over (t = 0) clears them again.
	const LAZY = [];
	const lazy = (node, str, at) => { LAZY.push([node, str, at]); return node; };

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
		const ring = el(g, 'circle', {cx: x + 14, cy: y + h / 2, r: 4, fill: 'none', stroke: C.red, 'stroke-width': 1.6, opacity: 0});
		const t = sans600(g, x + 27, y + h / 2 + 4.5, label);
		return {g, rect, dot, ring, t, x, y, w, h};
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

	// Row 2 on card A: the launch plan. The pills stack, each cost note beside its pill.
	const cond2 = mono(scene, 40, 316, S.cond2);
	const yourCall2 = sans600(scene, 440, 340.5, 'Your call', {fill: C.red, anchor: 'end'});
	const r2 = {
		rely: pill(scene, 40, 324, 220, 24, S.rely2),
		move: pill(scene, 40, 352, 150, 24, 'Move my check here'),
		time: pill(scene, 40, 380, 200, 24, S.ask2),
	};
	const noteMove = mono(scene, 0, 368.5, S.noteMove);
	const noteAsk = mono(scene, 0, 396.5, S.noteAsk);
	const sug2 = tag(scene, 40, 410, S.sug2);

	// Card A's evidence slot: the study, inside the frontier.
	const inRule = el(scene, 'line', {x1: 40, y1: 435, x2: 440, y2: 435, stroke: C.ink, 'stroke-opacity': 0.15});
	const inTitle = mono(scene, 40, 449, S.inTitle);
	const outRule = el(scene, 'line', {x1: 520, y1: 302, x2: 920, y2: 302, stroke: C.ink, 'stroke-opacity': 0.15});
	const nums = [['12.2%', ' more tasks', 40], ['25.1%', ' faster', 172], ['40%+', ' higher quality', 290]].map(([n, l, x]) => {
		const t = serif(scene, x, 468, '', {fs: 17, weight: 600});
		el(t, 'tspan', {}, n);
		el(t, 'tspan', {'font-family': FONT.sans, 'font-size': 13, 'font-weight': 400}, l);
		return t;
	});

	// What set the tasks apart: Task B's line is the study's; Task A's is reasoning, so it
	// sits under its own label in italic serif.
	const tagA1 = mono(scene, 40, 136, S.tagA1, {weight: 500});
	const tagA2 = serif(scene, 40, 153, S.tagA2, {fs: 15, style: 'italic'});
	const underB = el(scene, 'line', {stroke: C.ink, 'stroke-width': 1.5});
	const tagB1 = mono(scene, 520, 136, S.tagB1);
	const tagB2 = mono(scene, 520, 151, S.tagB2);

	// The frontier.
	const frontier = el(scene, 'path', {d: 'M' + FRONTIER.map((p) => p.join(' ')).join('L'), fill: 'none', stroke: C.ink, 'stroke-width': 1.8, 'stroke-linejoin': 'round'});
	let fLen = 0;

	// Bottom band: the budget and the definition, then the keys.
	const bandLine = mono(scene, 480, 498, S.band, {anchor: 'middle'});
	const keySug = el(scene, 'g');
	const keySugT = mono(keySug, 936, 526, S.keySug, {anchor: 'end'});
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
	const bars = [{y: 329, v: 84.5, label: '84.5%', name: 'Without AI'}, {y: 351, v: 70.6, label: '70.6%', name: 'GPT-4 alone'}, {y: 373, v: 60, label: '60%', name: 'GPT-4 + overview'}].map((b) => ({
		...b, name: text(evB, 520, b.y + 11, b.name, {fs: 14}),
		r: el(evB, 'rect', {x: BAR.x, y: b.y, height: BAR.h, width: 0, fill: C.ink, 'fill-opacity': 0.85}),
		t: text(evB, BAR.x + b.v * BAR.k + 8, b.y + 11, b.label, {fs: 14, weight: 600}),
	}));
	const bracket = el(evB, 'path', {d: `M${BAR.x} 392V397H${BAR.x + 70.6 * BAR.k}V392`, fill: 'none', stroke: C.ink, 'stroke-width': 1.5});
	const bracketText = serif(evB, BAR.x + 35.3 * BAR.k, 415, S.bracket, {fs: 15, style: 'italic', anchor: 'middle'});

	// What each piece of revealed text says, and the moment it may exist.
	lazy(fIn, 'INSIDE THE FRONTIER', T.fLabels[0]);
	lazy(fOut, 'OUTSIDE THE FRONTIER', T.fLabels[0]);
	lazy(inTitle, S.inTitle, T.inTitle[0]);
	nums.forEach((n, i) => { for (const sp of n.children) lazy(sp, sp.textContent, [T.n1, T.n2, T.n3][i][0]); });
	for (const n of evB.querySelectorAll('text')) lazy(n, n.textContent, T.panel[0]);
	lazy(tagA1, S.tagA1, T.tagA1[0]); lazy(tagA2, S.tagA2, T.tagA2[0]);
	lazy(tagB1, S.tagB1, T.tagB1[0]); lazy(tagB2, S.tagB2, T.tagB2[0]);
	lazy(keySugT, S.keySug, T.key[0]);
	lazy(sugA.t, S.sugA, T.sugA[0]); lazy(noteA, S.noteA, T.noteA[0]); lazy(sugB.t, S.sugB, T.sugB[0]);
	lazy(cond2, S.cond2, T.cond2[0]);
	lazy(r2.rely.t, S.rely2, T.pills2[0]); lazy(r2.move.t, moveLabel, T.pills2[0]); lazy(r2.time.t, S.ask2, T.pills2[0]);
	lazy(sug2.t, S.sug2, T.sug2[0]); lazy(noteMove, S.noteMove, T.noteMove[0]); lazy(noteAsk, S.noteAsk, T.noteAsk[0]);
	const fillLazy = (t) => {
		for (const [n, str, at] of LAZY) {
			const want = t >= at - 1e-6 ? (typeof str === 'function' ? str() : str) : '';
			if (n.textContent !== want) n.textContent = want;
		}
	};

	// ---- measure (after fonts load) -------------------------------------------------------
	const W = (node) => node.getComputedTextLength();
	const layout = {};
	function measure() {
		fillLazy(Infinity); // measure with every text present; render(t) then empties what isn't revealed
		const fitPill = (p, extra = 37) => { p.w = Math.ceil(W(p.t) + extra); set(p.rect, {width: p.w}); };
		fitPill(r2.rely);
		let moveW = 0;
		for (const w of ['Keep my check here', 'Put my check here', 'Move my check here']) { r2.move.t.textContent = w; moveW = Math.max(moveW, W(r2.move.t)); }
		r2.move.w = Math.ceil(moveW + 37);
		set(r2.move.rect, {width: r2.move.w});
		fitPill(r2.time);
		set(noteMove, {x: r2.move.x + r2.move.w + 10});
		set(noteAsk, {x: r2.time.x + r2.time.w + 10});
		for (const tg of [sugA, sugB, sug2]) set(tg.rect, {width: Math.ceil(W(tg.t) + 14)});
		set(keySugSw, {x: 936 - W(keySugT) - 24});
		const b1 = taskB1.getStartPositionOfChar(S.b1pre.length).x;
		layout.under = [b1, b1 + W(markSpan)];
		set(underB, {x1: b1, y1: 97, x2: b1, y2: 97});
		fLen = frontier.getTotalLength();
		set(frontier, {'stroke-dasharray': fLen});
		// Layout check: every line inside its card (exposed for the check scripts).
		const right = (n) => n.getBBox().x + n.getBBox().width;
		layout.overflow = [
			[taskA1, 456], [tagA2, 456], [noteA, 456], [noteMove, 456], [noteAsk, 456], [inTitle, 456], [cond2, 456], [nums[2], 456],
			[taskB1, 936], [taskB2, 936], [tagB1, 936], [tagB2, 936], [bracketText, 936], [bars[0].t, 936],
			[sugA.rect, 456], [sugB.rect, 936], [sug2.rect, 456], [r2.rely.rect, 456], [r2.time.rect, 456], [srcLine, 960],
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
	// "Your call" while a question is open; "No call made" once it was skipped.
	const callLabel = (node, kIn, kOff, wasSkipped) => {
		const want = wasSkipped ? 'No call made' : 'Your call';
		if (node.textContent !== want) node.textContent = want;
		set(node, wasSkipped ? {fill: C.ink, opacity: 0.7 * kIn} : {fill: C.red, opacity: kIn * (1 - kOff)});
	};
	// While the name card holds over question 1 at load (info.card, from the runtime's card
	// intro), the options stay out: they fade in only as the card reaches its corner, so the
	// card never covers them.
	let cardHold = 1;
	const render = (t, info = {}) => {
		curGate = info.gate ?? -1;
		cardHold = info.card == null ? 1 : prog(info.card, CARD_CLEAR, 1);
		fillLazy(t);
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
			set(b.ready, {opacity: prog(t, ...T.ready, E.house)});
		}

		// 3 · one check: the budget, the condition, the pills; the reader's marks.
		set(bandLine, {opacity: prog(t, ...T.band)});
		const kP1 = prog(t, ...T.pills1) * cardHold, kF1 = prog(t, ...T.fade1, E.inOut), kP2 = prog(t, ...T.pills2);
		for (const k of ['a', 'b']) {
			const r = r1[k];
			set(r.cond, {opacity: prog(t, ...T.cond1)});
			callLabel(r.yourCall, kP1, prog(t, ...T.call1Off), skipped.g1);
			drawPill(r.p, kP1, chosen1(k), kF1);
			const other = k === 'a' ? 'b' : 'a';
			// If the reader moves their check from Task B to Task A at question 2, B's mark
			// becomes a ring and says so; A keeps its first-draft label.
			const moved = k === 'b' && movedFromB();
			set(r.p.dot, {opacity: chosen1(k) ? 1 - kP2 * (moved ? 1 : 0) : 0});
			set(r.p.ring, {opacity: moved ? kP2 : 0});
			const relyText = moved ? 'Check moved to Task A' : 'You rely on it';
			if (r.rely.textContent !== relyText) r.rely.textContent = relyText;
			set(r.rely, {opacity: moved ? kP2 : chosen1(other) ? kP1 : 0});
		}

		// 4 · the frontier, then the inside numbers.
		set(frontier, {'stroke-dashoffset': fLen * (1 - prog(t, ...T.frontier, E.inOut)), opacity: t >= T.frontier[0] ? 1 : 0});
		set(fIn, {opacity: prog(t, ...T.fLabels)});
		set(fOut, {opacity: prog(t, ...T.fLabels)});
		set(inTitle, {opacity: prog(t, ...T.inTitle)});
		set(inRule, {opacity: prog(t, ...T.inTitle)});
		set(outRule, {opacity: prog(t, ...T.settle)});
		nums.forEach((n, i) => set(n, {opacity: prog(t, ...[T.n1, T.n2, T.n3][i])}));

		// 5 · Task B's evidence, centre stage, then into its slot.
		const kPanel = prog(t, ...T.panel, E.house) * (1 - prog(t, ...T.settle, E.inOut));
		set(panelBg, {opacity: kPanel});
		set(evB, {opacity: prog(t, ...T.panel, E.house), transform: `translate(${PANEL_T.dx * kPanel} ${PANEL_T.dy * kPanel}) scale(${mix(1, PANEL_T.s, kPanel)})`});
		bars.forEach((b, i) => {
			const span = i ? T.bars2 : T.bar1;
			set(b.r, {width: b.v * BAR.k * prog(t, ...span, E.outCubic)});
			set(b.t, {opacity: prog(t, span[1] - 0.1, span[1] + 0.1)});
		});
		set(bracket, {opacity: prog(t, ...T.bracket)});
		set(bracketText, {opacity: prog(t, ...T.bracketText)});

		// 6 · what set them apart.
		set(tagA1, {opacity: prog(t, ...T.tagA1)});
		set(tagA2, {opacity: prog(t, ...T.tagA2)});
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
		const kF2 = prog(t, ...T.fade2, E.inOut);
		callLabel(yourCall2, kP2, prog(t, ...T.call2Off), skipped.g2);
		for (const [id, p] of Object.entries(r2)) drawPill(p, kP2, calls.g2 === id, kF2);
		set(sug2.g, {opacity: prog(t, ...T.sug2)});
		set(noteMove, {opacity: prog(t, ...T.noteMove)});
		set(noteAsk, {opacity: prog(t, ...T.noteAsk)});

		renderNarrow(t);
		track(t);
		follow(t);
		syncUI();
	};

	// ---- the stacked stage --------------------------------------------------------------------
	// Within a phase every part is placed from the start and only fades in. The phase
	// changes only at a question (data-ph="2" parts join after question 1, "3" after
	// question 2), so the stage is compact while the reader decides.
	const narrow = root.querySelector('[data-ar-narrow]');
	const h = (tagName, cls, parent, txt, ph) => {
		const n = document.createElement(tagName);
		if (cls) n.className = cls;
		if (txt != null) n.textContent = txt;
		if (ph) n.dataset.ph = ph;
		parent.append(n);
		return n;
	};
	const N = {a: {}, b: {}};
	const nBody = h('div', 'ar-n-body', narrow);
	N.src = h('p', 'ar-n-src', nBody, S.src);
	const grid = h('div', 'ar-n-grid', nBody);
	const col = (k) => {
		const c = h('div', 'ar-n-col', grid);
		const n = N[k];
		n.flab = h('p', 'ar-n-flab', c, k === 'a' ? 'Inside the frontier' : 'Outside the frontier', '2');
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
		n.pat = h('p', k === 'a' ? 'ar-n-pat is-reasoning' : 'ar-n-pat', n.card, null, '2');
		n.pat1 = h('span', k === 'a' ? 'ar-n-plabel' : null, n.pat, k === 'a' ? 'What the evidence suggests ' : 'The deciding details were in the interviews. ');
		n.pat2 = h('span', null, n.pat, k === 'a' ? 'No hidden facts: a weak answer shows when read.' : 'The spreadsheet only looked complete.');
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
		n.sug = h('p', 'ar-n-sugp', n.card, null, '2');
		n.sugT = h('span', 'ar-n-sug', n.sug, k === 'a' ? 'Rely on it' : 'Work it from the interviews, then compare');
		if (k === 'a') {
			n.note = h('p', 'ar-n-note', n.card, 'A check here leaves Task B unchecked', '2');
			n.cond2 = h('p', 'ar-n-cond', n.card, null, '2');
			h('span', null, n.cond2, 'If it goes straight into the launch plan');
			n.yc2 = h('span', 'ar-n-yc', n.cond2, 'Your call');
			n.opts2 = {};
			for (const [id, label, note] of [['rely', S.rely2, ''], ['move', 'Move my check here', 'Task B: read-through only'], ['time', S.ask2, 'Launch slips a week']]) {
				const o = h('div', 'ar-n-opt', n.card, null, '2');
				h('span', 'ar-n-radio', o);
				n.opts2[id] = {o, label: h('span', null, o, label), note: note ? h('p', 'ar-n-note', n.card, note, '3') : null};
			}
			n.sug2p = h('p', 'ar-n-sugp', n.card, null, '3');
			n.sug2 = h('span', 'ar-n-sug', n.sug2p, "Rely on it · read it before it's built");
			n.ev = h('div', 'ar-n-ev', n.card, null, '2');
			n.evTitle = h('p', 'ar-n-evtitle', n.ev, 'With AI, across tasks inside the frontier');
			n.nums = [['12.2%', 'more tasks'], ['25.1%', 'faster'], ['40%+', 'higher quality']].map(([a, b]) => { const p = h('p', 'ar-n-num', n.ev); h('b', null, p, a); p.append(' ' + b); return p; });
		} else {
			n.ev = h('div', 'ar-n-ev', n.card, null, '2');
			n.evIn = h('div', null, n.ev);
		}
		return c;
	};
	col('a');
	N.gut = h('div', 'ar-n-gut', grid, null, '2');
	{
		const zig = el(N.gut, 'svg', {viewBox: '0 0 18 200', preserveAspectRatio: 'none', 'aria-hidden': 'true'});
		N.zig = el(zig, 'polyline', {points: '9,0 4,14 14,27 3,44 13,60 6,77 15,92 3,111 12,128 6,143 14,160 4,177 11,190 9,200', fill: 'none', stroke: C.ink, 'stroke-width': 1.6, 'vector-effect': 'non-scaling-stroke'});
	}
	col('b');
	// Task B's evidence, written once and used in the slot and in the overlay.
	const evHtml = (parent) => {
		h('p', 'ar-n-evtitle', parent, 'Right answers on Task B');
		const rows = [['Without AI', 84.5, '84.5%'], ['GPT-4 alone', 70.6, '70.6%'], ['GPT-4 + overview', 60, '60%']].map(([l, v, s]) => {
			const r = h('div', 'ar-n-bar', parent);
			h('span', 'ar-n-barl', r, l);
			const trk = h('span', 'ar-n-bart', r);
			const fill = h('i', null, trk);
			fill.style.width = `${v}%`;
			h('b', null, r, s);
			return {r, fill};
		});
		const q = h('p', 'ar-n-evq', parent, 'Rated higher in quality, right or wrong');
		return {rows, q};
	};
	N.evSlot = evHtml(N.b.evIn);
	N.band = h('p', 'ar-n-band', nBody, 'Time for one check · A check: work it yourself, then compare');
	N.keys = h('div', 'ar-n-keys', nBody, null, '2');
	N.keyYou = h('span', 'ar-n-keyyou', N.keys, 'Your calls');
	N.keySug = h('span', 'ar-n-keysug', N.keys, 'Suggested call · reasoned from the results');
	N.panel = h('div', 'ar-n-panel', narrow);
	N.evPanel = evHtml(N.panel);

	const op = (node, k) => { node.style.opacity = Math.max(0, Math.min(1, k)).toFixed(3); };
	let phase = 0;
	function renderNarrow(t) {
		if (!root.classList.contains('is-stacked')) return;
		const ph = t <= GATES[0].at + 0.01 ? 1 : t <= GATES[1].at + 0.01 ? 2 : 3;
		if (ph !== phase) { phase = ph; root.dataset.phase = ph; }
		const dimK = prog(t, ...T.dim) - prog(t, ...T.settle);
		op(nBody, 1 - 0.85 * dimK);
		const kPanel = prog(t, ...T.panel) * (1 - prog(t, ...T.settle));
		op(N.panel, kPanel);
		N.panel.style.visibility = kPanel > 0 ? 'visible' : 'hidden';
		op(N.src, prog(t, ...T.src));
		op(N.a.card, prog(t, ...T.cardA)); op(N.b.card, prog(t, ...T.cardB));
		op(N.a.t1, prog(t, ...T.a1)); op(N.a.t2, prog(t, ...T.a2));
		op(N.b.t1, prog(t, ...T.b1)); op(N.b.t2, prog(t, ...T.b2));
		const kF1 = prog(t, ...T.fade1), kP1 = prog(t, ...T.pills1) * cardHold, kP2 = prog(t, ...T.pills2);
		for (const k of ['a', 'b']) {
			const n = N[k];
			op(n.flab, prog(t, ...T.fLabels));
			op(n.ai, prog(t, ...T.aiHead));
			n.aiL1.style.transform = `scaleX(${prog(t, ...T.aiL1).toFixed(3)})`;
			n.aiL2.style.transform = `scaleX(${prog(t, ...T.aiL2).toFixed(3)})`;
			op(n.ready, prog(t, ...T.ready));
			op(n.cond, prog(t, ...T.cond1));
			n.yc.textContent = skipped.g1 ? 'No call made' : 'Your call';
			n.yc.classList.toggle('is-skipped', skipped.g1);
			op(n.yc, skipped.g1 ? kP1 : kP1 * (1 - prog(t, ...T.call1Off)));
			const isChosen = chosen1(k);
			const moved = k === 'b' && movedFromB() && kP2 > 0;
			op(n.opt, kP1 * (isChosen ? 1 : mix(1, 0.4, kF1)));
			n.opt.classList.toggle('is-chosen', isChosen && !moved);
			n.opt.classList.toggle('is-moved', moved);
			n.rely.textContent = moved ? 'Check moved to Task A' : 'You rely on it';
			op(n.rely, moved ? kP2 : chosen1(k === 'a' ? 'b' : 'a') ? kP1 : 0);
		}
		op(N.gut, prog(t, ...T.frontier));
		op(N.a.evTitle, prog(t, ...T.inTitle));
		N.a.nums.forEach((p, i) => op(p, prog(t, ...[T.n1, T.n2, T.n3][i])));
		op(N.b.ev, prog(t, ...T.settle));
		[N.evSlot, N.evPanel].forEach((ev, j) => {
			ev.rows.forEach((r, i) => {
				const k = j ? prog(t, ...(i ? T.bars2 : T.bar1)) : 1;
				r.fill.style.transform = `scaleX(${k.toFixed(3)})`;
				op(r.r, j ? Math.min(1, k * 3) : 1);
			});
			op(ev.q, j ? prog(t, ...T.bracketText) : 1);
		});
		op(N.a.pat1, prog(t, ...T.tagA1)); op(N.a.pat2, prog(t, ...T.tagA2));
		op(N.b.pat1, prog(t, ...T.tagB1)); op(N.b.pat2, prog(t, ...T.tagB2));
		N.b.mark.classList.toggle('is-under', t >= T.tagB1[0]);
		op(N.a.sug, prog(t, ...T.sugA)); op(N.a.note, prog(t, ...T.noteA));
		op(N.b.sug, prog(t, ...T.sugB));
		op(N.keySug, prog(t, ...T.key));
		op(N.keyYou, Math.max(calls.g1 ? prog(t, ...T.call1Off) : 0, calls.g2 ? prog(t, ...T.call2Off) : 0));
		op(N.band, prog(t, ...T.band));
		const kF2 = prog(t, ...T.fade2);
		op(N.a.cond2, prog(t, ...T.cond2));
		N.a.yc2.textContent = skipped.g2 ? 'No call made' : 'Your call';
		N.a.yc2.classList.toggle('is-skipped', skipped.g2);
		op(N.a.yc2, skipped.g2 ? kP2 : kP2 * (1 - prog(t, ...T.call2Off)));
		if (N.a.opts2.move.label.textContent !== moveLabel()) N.a.opts2.move.label.textContent = moveLabel();
		for (const [id, o] of Object.entries(N.a.opts2)) {
			const isChosen = calls.g2 === id;
			op(o.o, kP2 * (isChosen ? 1 : mix(1, 0.4, kF2)));
			o.o.classList.toggle('is-chosen', isChosen);
		}
		op(N.a.sug2p, prog(t, ...T.sug2));
		op(N.a.opts2.move.note, prog(t, ...T.noteMove)); op(N.a.opts2.time.note, prog(t, ...T.noteAsk));
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
			phase = 0;
			if (api) api.redraw();
		} else if (curGate >= 0) positionHits(curGate);
	};

	// ---- phones: the caption and controls stay at the bottom, and while the figure plays the
	// page follows the action, gently, so the part each caption is about is in view.
	const controlsEl = root.querySelector('.mf-controls');
	const capwrap = root.querySelector('.ar-capwrap');
	const stickyOn = () => root.classList.contains('is-stacked') && matchMedia('(max-width: 719px)').matches;
	const stickyH = () => (stickyOn() ? capwrap.offsetHeight + controlsEl.offsetHeight : 0);
	const syncStickyVar = () => root.style.setProperty('--ar-ctrl-h', `${controlsEl.offsetHeight}px`);
	function bringIntoView(el, smooth = true) {
		const r = el.getBoundingClientRect();
		const top = 8, bottom = innerHeight - stickyH() - 8;
		let dy = 0;
		if (r.top < top) dy = r.top - top;
		else if (r.bottom > bottom) dy = Math.min(r.bottom - bottom, r.top - top);
		if (Math.abs(dy) > 2) scrollBy({top: dy, behavior: smooth && !reducedNow() ? 'smooth' : 'auto'});
	}
	let followT = 0;
	const FOLLOW = () => [[BEAT_AT[3], N.a.flab], [T.inTitle[0], N.a.ev], [BEAT_AT[4], N.panel], [BEAT_AT[5], N.b.pat], [T.tagA1[0], N.a.pat],
		[BEAT_AT[6], N.a.sug], [T.sugB[0], N.b.sug], [BEAT_AT[7], N.a.cond2], [BEAT_AT[8], N.a.sug2p]];
	function follow(t) {
		const prev = followT;
		followT = t;
		if (!stickyOn() || root.dataset.state !== 'playing' || t <= prev || t - prev > 1) return;
		for (const [at, el] of FOLLOW()) if (prev < at && t >= at) { requestAnimationFrame(() => bringIntoView(el)); break; }
	}

	// ---- questions, controls and the text equivalent ---------------------------------------
	const hitsets = [...root.querySelectorAll('[data-ar-gate]')];
	const gatebar = root.querySelector('[data-ar-gatebar]');
	const btnContinue = root.querySelector('[data-ar-continue]');
	const btnSkip = root.querySelector('[data-ar-skip]');
	const toggle = root.querySelector('[data-mf-toggle]');
	const live = root.querySelector('[data-ar-live]');
	const sums = [root.querySelector('[data-ar-sum2]'), root.querySelector('[data-ar-sum3]')];
	const after = document.getElementById('ar-after');
	const afterLocked = document.querySelector('[data-ar-after-locked]');
	const prompt = root.querySelector('[data-ar-prompt]');
	let autoOpened = false;
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
		syncLocks();
	}
	// The beat list, the hidden summary and the page copy unlock question by question.
	let lockState = '';
	function syncLocks() {
		const key = `${resolved.g1}${resolved.g2}`;
		if (key === lockState) return;
		lockState = key;
		// The name card (beat 0, added by the runtime) is never locked.
		[...root.querySelectorAll('[data-mf-beats] > li:not(.mf-namebeat)')].forEach((li, i) => {
			const locked = (i >= 3 && !resolved.g1) || (i >= 8 && !resolved.g2);
			li.classList.toggle('is-locked', locked);
			const b = li.querySelector('button');
			if (b) b.disabled = locked;
		});
		sums[0].hidden = !resolved.g1;
		sums[1].hidden = !resolved.g2;
		// The page copy that explains both answers stays shut until both questions are done.
		if (after) after.hidden = !(resolved.g1 && resolved.g2);
		if (afterLocked) afterLocked.hidden = resolved.g1 && resolved.g2;
	}
	const say = (msg) => { live.textContent = ''; requestAnimationFrame(() => { live.textContent = msg; }); };
	const ASK = (i) => [
		'Question 1. You have time to check one of the two tasks. Choose Task A or Task B, then press Enter or Continue. You can also skip the question.',
		'Question 2. Now your segmentation goes straight into the launch plan. For Task A, choose Rely on it after a careful read, ' + `${moveLabel()}, or Ask for a week to check both, then press Enter or Continue.`,
	][i];
	const verdict1 = () => {
		const base = 'Suggested call, reasoned from the results: rely on Task A, and work Task B yourself from the interviews, then compare. A check on Task A leaves Task B unchecked.';
		if (calls.g1 === 'a') return base + ' You checked Task A and relied on Task B.';
		if (calls.g1 === 'b') return base + ' You checked Task B and relied on Task A.';
		return base + ' You made no call.';
	};
	const verdict2 = () => {
		const base = "Suggested call: Task A is still inside the frontier, so rely on it, and read it before it's built. Task B needs the check. Moving the check leaves Task B to a read-through only; asking for a week slips the launch a week.";
		const mine = {rely: ' You chose to rely on it after a careful read.', move: ` You chose: ${moveLabel().toLowerCase()}.`, time: ' You chose to ask for a week to check both.'}[calls.g2];
		return base + (mine || ' You made no call.');
	};
	function track(t) {
		reached = Math.max(reached, t);
		if (!autoOpened && reached >= BEAT_AT[9] && resolved.g2 && after) { after.open = true; autoOpened = true; }
		if (lastT < T.sugB[1] && t >= T.sugB[1] && t - lastT < 1) say(verdict1());
		if (lastT < T.sug2[1] && t >= T.sug2[1] && t - lastT < 1) say(verdict2());
		lastT = t;
	}
	const reducedNow = () => isReduced() && !testMode;
	const resolve = (g) => { resolved[GKEY[g]] = true; skipped[GKEY[g]] = !calls[GKEY[g]]; };
	// Continue / Skip. Under reduced motion they step to the next settled question, then to
	// the final frame; otherwise playback resumes past the question. Focus moves to the
	// player's Play/Pause button, never the page body.
	const pass = (skip) => {
		const g = curGate;
		if (g < 0 || !api) return;
		if (skip) calls[GKEY[g]] = null;
		if (prompt) prompt.hidden = true;
		if (g === 0) releaseFit();
		if (reducedNow()) {
			resolve(g);
			if (g === 0) api.openGate(1);
			else { api.seek(T.end); if (after) after.open = true; toggle.focus(); }
		} else {
			api.resume(g);
			toggle.focus({preventScroll: true});
			// After the first question the picture carries the next beats: bring the cards
			// into view (on a phone, the top of the stacked stage).
			if (g === 0) requestAnimationFrame(() => showPicture());
		}
	};
	// Play at a question asks for the call; only Skip passes it without one.
	const onGatePlay = (g) => {
		if (calls[GKEY[g]]) { pass(false); return; }
		if (prompt) prompt.hidden = false;
		say('Make your call first, or skip this question.');
		// Bring the options into view if they aren't (on a phone, above the sticky caption
		// band), then focus the first one.
		presentGate(g);
	};
	function showPicture() {
		const stacked = root.classList.contains('is-stacked');
		const r = (stacked ? narrow : shot).getBoundingClientRect();
		if (r.top < 0 || r.top > 80) scrollBy({top: r.top - 8, behavior: reducedNow() ? 'auto' : 'smooth'});
	}
	// First view: until the first question is answered, the picture is capped so the
	// question and Continue fit on screen with it, without moving the page.
	let fitOn = false;
	// While it's capped, the caption band is compact too (.ar-firstq): it holds only the
	// question until then, and takes its full height when the cap lifts.
	function fitFirstView() {
		if (testMode) return;
		root.classList.add('ar-firstq');
		const top = root.querySelector('.mf-stage').getBoundingClientRect().top + scrollY; // below the plate strip
		const chrome = root.querySelector('.ar-capwrap').offsetHeight + root.querySelector('.mf-controls').offsetHeight + 6;
		const avail = Math.floor(innerHeight - top - chrome);
		svg.style.maxHeight = `${Math.max(120, avail)}px`;
		fitOn = true;
	}
	function releaseFit() {
		if (!fitOn) return;
		fitOn = false;
		root.classList.remove('ar-firstq');
		svg.style.maxHeight = '';
	}
	addEventListener('resize', () => { if (fitOn) fitFirstView(); });
	btnContinue.addEventListener('click', () => pass(false));
	btnSkip.addEventListener('click', () => pass(true));
	hitsets.forEach((fs, i) => {
		fs.addEventListener('change', (e) => {
			if (!e.target.matches('input')) return;
			calls[GKEY[i]] = e.target.value;
			if (prompt) prompt.hidden = true;
			if (api) api.redraw();
		});
		// Enter on a chosen option continues.
		fs.addEventListener('keydown', (e) => {
			if (e.key !== 'Enter' || !e.target.matches('input')) return;
			e.preventDefault();
			if (calls[GKEY[i]]) pass(false);
		});
	});
	// When a question opens, bring its options and Continue into view and focus the first
	// option. At load the first question is open without moving the page.
	let quietOpen = false;
	function presentGate(i) {
		if (stickyOn()) {
			// Continue sits in the sticky caption; bring the options into the space above it.
			const opts = [...hitsets[i].querySelectorAll('[data-ar-opt]')];
			const box = opts.map((e) => e.getBoundingClientRect());
			const first = {getBoundingClientRect: () => ({top: Math.min(...box.map((r) => r.top)), bottom: Math.max(...box.map((r) => r.bottom))})};
			bringIntoView(first, false);
			const inputs = [...hitsets[i].querySelectorAll('input')];
			(inputs.find((x) => x.checked) || inputs[0]).focus({preventScroll: true});
			return;
		}
		const els = [...hitsets[i].querySelectorAll('[data-ar-opt]'), gatebar];
		const rects = els.map((e) => e.getBoundingClientRect());
		const top = Math.min(...rects.map((r) => r.top)), bottom = Math.max(...rects.map((r) => r.bottom));
		const m = 12;
		const whole = shot.getBoundingClientRect();
		let dy = 0;
		// Show the whole picture when it fits; otherwise at least the options and Continue.
		if (whole.height + 2 * m <= innerHeight && (whole.top < m || whole.bottom > innerHeight - m)) dy = whole.top - m;
		else if (whole.height + 2 * m <= innerHeight) dy = 0;
		else if (bottom - top + 2 * m > innerHeight) dy = top - m;
		else if (top < m) dy = top - m;
		else if (bottom > innerHeight - m) dy = bottom - (innerHeight - m);
		if (dy) scrollBy({top: dy, behavior: 'auto'});
		const inputs = [...hitsets[i].querySelectorAll('input')];
		(inputs.find((x) => x.checked) || inputs[0]).focus({preventScroll: true});
	}
	// Start over clears the calls (registered before the runtime's own restart handler).
	root.querySelector('[data-mf-replay]').addEventListener('click', () => {
		calls.g1 = calls.g2 = null;
		resolved.g1 = resolved.g2 = false;
		skipped.g1 = skipped.g2 = false;
		reached = 0; lastT = 0;
		// Nothing a reader heard or unlocked stays behind: empty the live region, re-hide the
		// summary parts and the page copy, and re-lock the beat list.
		live.textContent = '';
		lockState = '';
		syncLocks();
		if (prompt) prompt.hidden = true;
	});
	// Under reduced motion, a beat-list click on a question opens that question.
	root.querySelector('[data-mf-beats]').addEventListener('click', (e) => {
		const b = e.target.closest('[data-beat]');
		if (!b || !api || !reducedNow()) return;
		const i = +b.dataset.beat;
		if (i === 2) api.openGate(0);
		if (i === 7 && resolved.g1) api.openGate(1);
	});
	// Print: the question on the first page, then the final frame and the full text.
	// Printing shows the whole answer, so afterwards the screen goes back to where it was.
	const printQ = document.querySelector('[data-ar-printq]');
	let beforePrint = null;
	addEventListener('beforeprint', () => {
		if (!api || !printQ) return;
		// Figure time throughout (api.time and api.seek), so the name card's offset doesn't apply.
		beforePrint = {t: api.time(), reached, open: after ? after.open : false, autoOpened, resolved: {...resolved}};
		resolved.g1 = resolved.g2 = true;
		lockState = '';
		api.seek(GATES[0].at);
		printQ.querySelector('[data-ar-printq-svg]').replaceChildren(svg.cloneNode(true));
		if (after) after.open = true;
	});
	addEventListener('afterprint', () => {
		if (!beforePrint || !api) return;
		Object.assign(resolved, beforePrint.resolved);
		reached = beforePrint.reached; autoOpened = beforePrint.autoOpened; lockState = '';
		if (after) after.open = beforePrint.open;
		const back = beforePrint.t;
		beforePrint = null;
		quietOpen = true;
		if (!resolved.g1) api.openGate(0);
		else if (!resolved.g2 && Math.abs(back - GATES[1].at) < 0.01) api.openGate(1);
		else api.seek(back);
		quietOpen = false;
	});

	const BEATS = [
		{at: BEAT_AT[0], text: 'Two tasks from one study.',
			detail: 'two task cards. Task A: "Segment the footwear industry market based on users." Task B: "Use a spreadsheet and insider interviews to pick the brand a clothing firm should back." At top left: "Dell\'Acqua et al. · Field experiment, 2023 · 758 BCG consultants · some with GPT-4".'},
		{at: BEAT_AT[1], text: 'An AI answers both. The two answers look equally finished.',
			detail: 'under each task, "AI\'s answer" and two grey lines of writing on a beige band. Each gets the same grey "Ready" tag at the same moment.'},
		{at: BEAT_AT[2], text: 'You have time to check one. Which one?',
			detail: 'along the bottom, "Time for one check. A check: work it yourself, then compare." Each card gets the line "If it\'s your team\'s first draft" and a "Check this one" button. The figure waits for your choice. Your choice shows as a red dot on that card, and "You rely on it" in red on the other. If you skip, both cards say "No call made".'},
		{at: BEAT_AT[3], text: 'A jagged frontier marks where an AI stops being reliable. Inside it, AI helped.',
			detail: 'an uneven line is drawn down between the cards, labelled "Inside the frontier" over Task A and "Outside the frontier" over Task B. On Task A\'s card: with AI, across tasks inside the frontier, 12.2% more tasks, 25.1% faster, more than 40% higher quality.'},
		{at: BEAT_AT[4], text: 'On Task B, consultants with AI were right less often. Graders still rated their work higher.',
			detail: 'the picture dims and a panel rises: right answers on Task B. Without AI, 84.5%. GPT-4 alone, 70.6%. GPT-4 plus a prompt-engineering overview, 60%. A bracket under the two GPT-4 bars: "Rated higher in quality, right or wrong." The panel settles onto Task B\'s card.'},
		{at: BEAT_AT[5], text: 'Task B\'s deciding details were in the interviews. For Task A, the evidence suggests none.',
			detail: 'in Task B, "insider interviews" is underlined, with "The deciding details were in the interviews. The spreadsheet only looked complete." Then under Task A, labelled "What the evidence suggests": "No hidden facts: a weak answer shows when read."'},
		{at: BEAT_AT[6], text: 'The evidence suggests relying on Task A and working Task B yourself from the interviews.',
			detail: 'a key at bottom right: "Suggested call · reasoned from the results". The options you didn\'t choose fade. Task A gets a navy "Rely on it" tag, with the note "A check here leaves Task B unchecked". Task B gets "Work it from the interviews, then compare". Your choice stays in red.'},
		{at: BEAT_AT[7], text: 'Now your segmentation goes straight into the launch plan. What about Task A?',
			detail: 'a second line appears on Task A: "If it goes straight into the launch plan", with three buttons: "Rely on it, after a careful read", "Move my check here" and "Ask for a week to check both". The figure waits for your choice. If you move your check from Task B, Task B\'s mark turns to a ring that says "Check moved to Task A".'},
		{at: BEAT_AT[8], text: 'Still inside the frontier: rely on it, and read it before it\'s built. Task B needs the check.',
			detail: 'the options you didn\'t choose fade. Beside "Move my check here": "Task B: read-through only". Beside "Ask for a week to check both": "Launch slips a week". Task A\'s second line gets a navy tag: "Rely on it. Read it before it\'s built."'},
		{at: BEAT_AT[9], text: 'Faculty check: What evidence justified relying on the system here, and what would have changed the call?',
			list: 'Faculty check: What evidence justified relying on the system here, and what would have changed the call? Change one condition and ask for the call again.',
			detail: 'both lines under the picture at the same size. Both tasks, both answers, the frontier, the evidence and every suggested call stay in view.',
			check: {label: 'Faculty check', question: 'What evidence justified relying on the system here, and what would have changed the call?', follow: 'Change one condition and ask for the call again.', followAt: T.follow}},
	];

	document.fonts.ready.then(() => {
		measure();
		fitFirstView();
		syncStickyVar();
		addEventListener('resize', syncStickyVar);
		legibility(root, svg, VW, 11);
		new ResizeObserver(syncStacked).observe(svg);
		syncStacked();
		quietOpen = true; // a ?t= hold past a question opens it without moving the page
		api = mount(root, {
			duration: T.end, render, beats: BEATS, poster: GATES[0].at, gates: GATES, reducedAt: GATES[0].at,
			// The name card adds 3 s of player time before the figure's own t = 0; every time
			// here (gates, locks, poster, reducedAt, api.seek) stays in figure time.
			nameplate: {name: 'Appropriate reliance', kicker: 'The skill', definition: 'Accept AI support where it’s warranted, check or refuse it where it isn’t, and be able to say why.'},
			lockedAt: () => (!resolved.g1 ? GATES[0].at : !resolved.g2 ? GATES[1].at : null),
			onResume: (i) => resolve(i),
			onGatePlay,
			onGate: (i, via) => {
				if (quietOpen) return;
				say(ASK(i));
				// A drag on the scrubber keeps its focus; every other way in focuses the options.
				if (via === 'lock' && document.activeElement && document.activeElement.matches('[data-mf-scrub]')) return;
				presentGate(i);
			},
		});
		quietOpen = false;
		// Each beat-list entry carries a placeholder shown while it is locked.
		for (const btn of root.querySelectorAll('[data-mf-beats] > li:not(.mf-namebeat) > button')) {
			const ph = document.createElement('span');
			ph.className = 'ar-locked';
			ph.textContent = 'Make your call to see this.';
			btn.append(ph);
		}
		lockState = '';
		syncLocks();
		// The figure opens on the first question, live, in every view but the ?t= hold.
		if (!testMode) { quietOpen = true; api.openGate(0); quietOpen = false; }
		// The runtime has added the nameplate strip above the stage: fit the first view again
		// and settle the stage's layout now, so no later relayout redraws over the card.
		if (fitOn) { fitFirstView(); syncStacked(); }
		// The name card shows over that question, then settles into the corner once the
		// figure is in view (1.2 s, then a 0.8 s move). The question is live underneath, and
		// any touch, click, key, wheel or focus in the figure puts the card in its corner at
		// once, so it never delays focus or covers the options while the reader acts.
		if (!testMode && !reducedNow()) {
			api.introCard();
			const settleNow = () => { if (root.dataset.mfCard) api.settleCard(0, 0); };
			for (const ev of ['pointerdown', 'keydown', 'wheel', 'focusin']) root.addEventListener(ev, settleNow, {passive: true});
			const io = new IntersectionObserver((entries) => {
				const e = entries[0];
				if (e.intersectionRatio < 0.5 && e.intersectionRect.height < innerHeight * 0.5) return;
				io.disconnect();
				if (root.dataset.mfCard) api.settleCard(1.2, 0.8);
			}, {threshold: [0, 0.25, 0.5, 0.75, 1]});
			io.observe(shot);
		}
	});
})();
