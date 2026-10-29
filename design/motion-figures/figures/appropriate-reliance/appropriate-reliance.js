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
   so it is compact while the reader decides.
   Editions: every visible word (picture, stacked stage, live region, beat list, check,
   page) comes from editions/<id>.json with cast words from ../../casts.json, loaded by
   the runtime's loadEdition; the timeline, layout, gates and nameplate stay here.
   Regression: regression/ar-regress.mjs (frame-diff plus branches and gate flows). */
(() => {
	const {mount, E, mix, prog, el, set, legibility, FONT, isReduced, loadEdition, fillPage, rich} = MotionFigures;
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

	// ---- geometry ----------------------------------------------------------------------
	const X = {a: 24, b: 504}, CW = 432, CY = 48, CH = 428;
	const FRONTIER = [[480, 52], [471, 80], [489, 104], [468, 141], [486, 170], [474, 207], [492, 233], [467, 270], [485, 306], [473, 333], [490, 367], [469, 403], [484, 429], [474, 452], [480, 470]];
	const BAR = {x: 648, k: 2.6, h: 13};
	// Task B's evidence sits in its card slot; at the reveal it is drawn at 1.5x centre stage.
	const PANEL_T = {dx: -588, dy: -269.5, s: 1.5};

	const root = document.getElementById(ID);

	// The nameplate is core: the same name, kicker and definition in every edition.
	const NAMEPLATE = {name: 'Appropriate reliance', kicker: 'The skill', definition: 'Accept AI support where it’s warranted, check or refuse it where it isn’t, and be able to say why.'};
	// Page copy with links: [text](href) becomes a link, *words* <em> (the runtime's rich()).
	const richLinks = (str) => String(str ?? '').split(/(\[[^\]]+\]\([^)\s]+\))/).map((part) => {
		const m = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
		return m ? `<a href="${m[2].replace(/"/g, '&quot;')}">${rich(m[1])}</a>` : rich(part);
	}).join('');
	const pathGet = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);

	// Every visible word comes from the edition (editions/<id>.json, cast words from
	// ../../casts.json); the figure builds once it and the fonts have loaded.
	Promise.all([loadEdition(root), document.fonts.ready]).then(([ed]) => {
		fillPage(document, ed);
		document.querySelectorAll('[data-ar-ed-rich]').forEach((n) => { n.innerHTML = richLinks(pathGet(ed, n.dataset.arEdRich)); });
		document.querySelectorAll('[data-ar-plate]').forEach((n) => { n.textContent = `${NAMEPLATE.name} · ${NAMEPLATE.kicker}`; });
		build(ed);
	});

	function build(ed) {
		const L = ed.labels, NW = ed.narrow, G = ed.gates, R = ed.results;
		const moveLabel = () => L.options2.move[calls.g1 === 'a' ? 'keep' : calls.g1 === 'b' ? 'move' : 'put'];
		const movedFromB = () => calls.g1 === 'b' && calls.g2 === 'move';
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
		const srcLine = mono(scene, 24, 18, L.source);
		const fIn = mono(scene, 456, 40, L.inside, {anchor: 'end'});
		const fOut = mono(scene, 504, 40, L.outside);

		// ---- cards -------------------------------------------------------------------------------
		const card = (k) => {
			const x0 = X[k], g = el(scene, 'g');
			el(g, 'rect', {x: x0, y: CY, width: CW, height: CH, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.15});
			mono(g, x0 + 16, 68, k === 'a' ? L.cardA : L.cardB);
			return g;
		};
		const cardA = card('a'), cardB = card('b');
		const taskA1 = serif(cardA, 40, 92, L.taskA[0]), taskA2 = serif(cardA, 40, 114, L.taskA[1]);
		const taskB1 = serif(cardB, 520, 92, '');
		el(taskB1, 'tspan', {}, L.taskB.pre);
		const markSpan = el(taskB1, 'tspan', {}, L.taskB.mark);
		el(taskB1, 'tspan', {}, L.taskB.post);
		const taskB2 = serif(cardB, 520, 114, L.taskB.line2);

		// The AI's answers: identical on both cards.
		const aiBlock = (k) => {
			const x0 = X[k], g = el(scene, 'g');
			const head = el(g, 'g');
			mono(head, x0 + 16, 172, L.aiAnswer, {fill: C.grey});
			el(head, 'rect', {x: x0 + 16, y: 180, width: 400, height: 20, rx: 2, fill: C.band});
			const l1 = el(g, 'rect', {x: x0 + 26, y: 185, width: 0, height: 3.5, rx: 1.75, fill: C.grey, 'fill-opacity': 0.8});
			const l2 = el(g, 'rect', {x: x0 + 26, y: 192.5, width: 0, height: 3.5, rx: 1.75, fill: C.grey, 'fill-opacity': 0.8});
			const ready = el(g, 'g');
			el(ready, 'rect', {x: x0 + 344, y: 160, width: 72, height: 16, rx: 8, fill: C.grey});
			mono(ready, x0 + 380, 172.5, L.ready, {anchor: 'middle', fill: C.bright, ls: 0.6});
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
			const cond = mono(scene, x0 + 16, 220, L.cond1);
			const yourCall = sans600(scene, x0 + 416, 220, L.yourCall, {fill: C.red, anchor: 'end'});
			const p = pill(scene, x0 + 16, 228, 160, 26, L.checkThis);
			const rely = sans600(scene, x0 + 192, 246, L.youRely, {fill: C.red});
			return {cond, yourCall, p, rely};
		};
		const r1 = {a: row1('a'), b: row1('b')};
		const sugA = tag(scene, 40, 262, L.sugA);
		const noteA = mono(scene, 40, 294, L.noteA);
		const sugB = tag(scene, 520, 262, L.sugB);

		// Row 2 on card A: the launch plan. The pills stack, each cost note beside its pill.
		const cond2 = mono(scene, 40, 316, L.cond2);
		const yourCall2 = sans600(scene, 440, 340.5, L.yourCall, {fill: C.red, anchor: 'end'});
		const r2 = {
			rely: pill(scene, 40, 324, 220, 24, L.options2.rely),
			move: pill(scene, 40, 352, 150, 24, L.options2.move.move),
			time: pill(scene, 40, 380, 200, 24, L.options2.time),
		};
		const noteMove = mono(scene, 0, 368.5, L.noteMove);
		const noteAsk = mono(scene, 0, 396.5, L.noteTime);
		const sug2 = tag(scene, 40, 410, L.sug2);

		// Card A's evidence slot: the study, inside the frontier.
		const inRule = el(scene, 'line', {x1: 40, y1: 435, x2: 440, y2: 435, stroke: C.ink, 'stroke-opacity': 0.15});
		const inTitle = mono(scene, 40, 449, L.insideTitle);
		const outRule = el(scene, 'line', {x1: 520, y1: 302, x2: 920, y2: 302, stroke: C.ink, 'stroke-opacity': 0.15});
		const nums = R.inside.map(({value, label}, i) => [value, ' ' + label, [40, 172, 290][i]]).map(([n, l, x]) => {
			const t = serif(scene, x, 468, '', {fs: 17, weight: 600});
			el(t, 'tspan', {}, n);
			el(t, 'tspan', {'font-family': FONT.sans, 'font-size': 13, 'font-weight': 400}, l);
			return t;
		});

		// What set the tasks apart: Task B's line is the study's; Task A's is reasoning, so it
		// sits under its own label in italic serif.
		const tagA1 = mono(scene, 40, 136, L.factA.label, {weight: 500});
		const tagA2 = serif(scene, 40, 153, L.factA.text, {fs: 15, style: 'italic'});
		const underB = el(scene, 'line', {stroke: C.ink, 'stroke-width': 1.5});
		const tagB1 = mono(scene, 520, 136, L.factB[0]);
		const tagB2 = mono(scene, 520, 151, L.factB[1]);

		// The frontier.
		const frontier = el(scene, 'path', {d: 'M' + FRONTIER.map((p) => p.join(' ')).join('L'), fill: 'none', stroke: C.ink, 'stroke-width': 1.8, 'stroke-linejoin': 'round'});
		let fLen = 0;

		// Bottom band: the budget and the definition, then the keys.
		const bandLine = mono(scene, 480, 498, L.budget, {anchor: 'middle'});
		const keySug = el(scene, 'g');
		const keySugT = mono(keySug, 936, 526, L.keySuggested, {anchor: 'end'});
		const keySugSw = el(keySug, 'rect', {y: 516.5, width: 16, height: 11, rx: 2, fill: C.ink});
		const keyYou = el(scene, 'g');
		el(keyYou, 'circle', {cx: 29, cy: 521.5, r: 5, fill: C.red});
		const keyYouT = mono(keyYou, 40, 526, L.keyYours, {fill: C.red});
		// Optional (business): from the last beat the key sets the reader's calls against the
		// suggested calls in words, so the comparison doesn't rest on colour. It exists in the DOM
		// only from that beat.
		const verdict = (V) => {
			const first = calls.g1 === 'b' ? V.matches : calls.g1 === 'a' ? V.differs : V.none;
			const plan = calls.g2 === 'rely' ? V.matches : calls.g2 === 'time' ? V.defensible : calls.g2 === 'move' ? V.differs : V.none;
			return `${V.lead} · ${V.first}: ${first} · ${V.plan}: ${plan}`;
		};
		const verdictK = (t) => (L.keyVerdict ? prog(t, BEAT_AT[9], BEAT_AT[9] + 0.4) : 0);
		const keyText = (t, V, plain) => (V && t >= BEAT_AT[9] - 1e-6 ? verdict(V) : plain);

		// Task B's evidence: above the dim, centre stage at first, then in its slot.
		const panelBg = el(topLayer, 'g');
		el(panelBg, 'rect', {x: 172, y: 170, width: 624, height: 212, fill: C.ink, 'fill-opacity': 0.07});
		el(panelBg, 'rect', {x: 168, y: 166, width: 624, height: 212, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.18, 'stroke-width': 1.2});
		const evB = el(topLayer, 'g');
		mono(evB, 520, 316, L.outsideTitle);
		const bars = R.outside.map(({name, value, label}, i) => ({y: [329, 351, 373][i], v: value, label, name})).map((b) => ({
			...b, name: text(evB, 520, b.y + 11, b.name, {fs: 14}),
			r: el(evB, 'rect', {x: BAR.x, y: b.y, height: BAR.h, width: 0, fill: C.ink, 'fill-opacity': 0.85}),
			t: text(evB, BAR.x + b.v * BAR.k + 8, b.y + 11, b.label, {fs: 14, weight: 600}),
		}));
		// The bracket spans the AI bars (all but the first), out to the longest.
		const bracketV = Math.max(...R.outside.slice(1).map((b) => b.value));
		const bracket = el(evB, 'path', {d: `M${BAR.x} 392V397H${BAR.x + bracketV * BAR.k}V392`, fill: 'none', stroke: C.ink, 'stroke-width': 1.5});
		const bracketText = serif(evB, BAR.x + bracketV / 2 * BAR.k, 415, L.bracket, {fs: 15, style: 'italic', anchor: 'middle'});

		// What each piece of revealed text says, and the moment it may exist.
		lazy(fIn, L.inside, T.fLabels[0]);
		lazy(fOut, L.outside, T.fLabels[0]);
		lazy(inTitle, L.insideTitle, T.inTitle[0]);
		nums.forEach((n, i) => { for (const sp of n.children) lazy(sp, sp.textContent, [T.n1, T.n2, T.n3][i][0]); });
		for (const n of evB.querySelectorAll('text')) lazy(n, n.textContent, T.panel[0]);
		lazy(tagA1, L.factA.label, T.tagA1[0]); lazy(tagA2, L.factA.text, T.tagA2[0]);
		lazy(tagB1, L.factB[0], T.tagB1[0]); lazy(tagB2, L.factB[1], T.tagB2[0]);
		lazy(keySugT, L.keySuggested, T.key[0]);
		lazy(sugA.t, L.sugA, T.sugA[0]); lazy(noteA, L.noteA, T.noteA[0]); lazy(sugB.t, L.sugB, T.sugB[0]);
		lazy(cond2, L.cond2, T.cond2[0]);
		lazy(r2.rely.t, L.options2.rely, T.pills2[0]); lazy(r2.move.t, moveLabel, T.pills2[0]); lazy(r2.time.t, L.options2.time, T.pills2[0]);
		lazy(sug2.t, L.sug2, T.sug2[0]); lazy(noteMove, L.noteMove, T.noteMove[0]); lazy(noteAsk, L.noteTime, T.noteAsk[0]);
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
			for (const w of [L.options2.move.keep, L.options2.move.put, L.options2.move.move]) { r2.move.t.textContent = w; moveW = Math.max(moveW, W(r2.move.t)); }
			r2.move.w = Math.ceil(moveW + 37);
			set(r2.move.rect, {width: r2.move.w});
			fitPill(r2.time);
			set(noteMove, {x: r2.move.x + r2.move.w + 10});
			set(noteAsk, {x: r2.time.x + r2.time.w + 10});
			for (const tg of [sugA, sugB, sug2]) set(tg.rect, {width: Math.ceil(W(tg.t) + 14)});
			set(keySugSw, {x: 936 - W(keySugT) - 24});
			const b1 = taskB1.getStartPositionOfChar(L.taskB.pre.length).x;
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
			const want = wasSkipped ? L.noCall : L.yourCall;
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
				const relyText = moved ? L.moved : L.youRely;
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
			set(keyYou, {opacity: Math.max(calls.g1 ? prog(t, ...T.call1Off) : 0, calls.g2 ? prog(t, ...T.call2Off) : 0, verdictK(t))});
			if (L.keyVerdict) { const want = keyText(t, L.keyVerdict, L.keyYours); if (keyYouT.textContent !== want) keyYouT.textContent = want; }

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
		N.src = h('p', 'ar-n-src', nBody, NW.source);
		const grid = h('div', 'ar-n-grid', nBody);
		const col = (k) => {
			const c = h('div', 'ar-n-col', grid);
			const n = N[k];
			n.flab = h('p', 'ar-n-flab', c, k === 'a' ? NW.inside : NW.outside, '2');
			n.card = h('div', 'ar-n-card', c);
			h('p', 'ar-n-tag', n.card, k === 'a' ? NW.cardA : NW.cardB);
			const task = h('p', 'ar-n-task', n.card);
			if (k === 'a') { n.t1 = h('span', null, task, L.taskA[0] + ' '); n.t2 = h('span', null, task, L.taskA[1]); }
			else {
				n.t1 = h('span', null, task);
				n.t1.append(L.taskB.pre);
				n.mark = h('span', 'ar-n-mark', n.t1, L.taskB.mark);
				n.t1.append(L.taskB.post + ' ');
				n.t2 = h('span', null, task, L.taskB.line2);
			}
			n.pat = h('p', k === 'a' ? 'ar-n-pat is-reasoning' : 'ar-n-pat', n.card, null, '2');
			n.pat1 = h('span', k === 'a' ? 'ar-n-plabel' : null, n.pat, (k === 'a' ? NW.factA.label : NW.factB[0]) + ' ');
			n.pat2 = h('span', null, n.pat, k === 'a' ? NW.factA.text : NW.factB[1]);
			n.ai = h('div', 'ar-n-ai', n.card);
			const aiHead = h('p', 'ar-n-aihead', n.ai);
			h('span', null, aiHead, NW.aiAnswer);
			n.ready = h('span', 'ar-n-ready', aiHead, NW.ready);
			const lines = h('div', 'ar-n-lines', n.ai);
			n.aiL1 = h('i', 'ar-n-line', lines); n.aiL2 = h('i', 'ar-n-line is-short', lines);
			n.cond = h('p', 'ar-n-cond', n.card);
			h('span', null, n.cond, NW.cond1);
			n.yc = h('span', 'ar-n-yc', n.cond, L.yourCall);
			n.opt = h('div', 'ar-n-opt', n.card);
			h('span', 'ar-n-radio', n.opt);
			h('span', null, n.opt, L.checkThis);
			n.rely = h('p', 'ar-n-rely', n.card, L.youRely);
			n.sug = h('p', 'ar-n-sugp', n.card, null, '2');
			n.sugT = h('span', 'ar-n-sug', n.sug, k === 'a' ? NW.sugA : NW.sugB);
			if (k === 'a') {
				n.note = h('p', 'ar-n-note', n.card, NW.noteA, '2');
				n.cond2 = h('p', 'ar-n-cond', n.card, null, '2');
				h('span', null, n.cond2, NW.cond2);
				n.yc2 = h('span', 'ar-n-yc', n.cond2, L.yourCall);
				n.opts2 = {};
				for (const [id, label, note] of [['rely', L.options2.rely, ''], ['move', L.options2.move.move, NW.noteMove], ['time', L.options2.time, NW.noteTime]]) {
					const o = h('div', 'ar-n-opt', n.card, null, '2');
					h('span', 'ar-n-radio', o);
					n.opts2[id] = {o, label: h('span', null, o, label), note: note ? h('p', 'ar-n-note', n.card, note, '3') : null};
				}
				n.sug2p = h('p', 'ar-n-sugp', n.card, null, '3');
				n.sug2 = h('span', 'ar-n-sug', n.sug2p, NW.sug2);
				n.ev = h('div', 'ar-n-ev', n.card, null, '2');
				n.evTitle = h('p', 'ar-n-evtitle', n.ev, NW.insideTitle);
				n.nums = R.inside.map(({value: a, label: b}) => { const p = h('p', 'ar-n-num', n.ev); h('b', null, p, a); p.append(' ' + b); return p; });
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
			h('p', 'ar-n-evtitle', parent, NW.outsideTitle);
			const rows = R.outside.map(({name: l, value: v, label: s}) => {
				const r = h('div', 'ar-n-bar', parent);
				h('span', 'ar-n-barl', r, l);
				const trk = h('span', 'ar-n-bart', r);
				const fill = h('i', null, trk);
				fill.style.width = `${v}%`;
				h('b', null, r, s);
				return {r, fill};
			});
			const q = h('p', 'ar-n-evq', parent, NW.bracket);
			return {rows, q};
		};
		N.evSlot = evHtml(N.b.evIn);
		N.band = h('p', 'ar-n-band', nBody, NW.budget);
		N.keys = h('div', 'ar-n-keys', nBody, null, '2');
		N.keyYou = h('span', 'ar-n-keyyou', N.keys, NW.keyYours);
		N.keySug = h('span', 'ar-n-keysug', N.keys, NW.keySuggested);
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
				n.yc.textContent = skipped.g1 ? L.noCall : L.yourCall;
				n.yc.classList.toggle('is-skipped', skipped.g1);
				op(n.yc, skipped.g1 ? kP1 : kP1 * (1 - prog(t, ...T.call1Off)));
				const isChosen = chosen1(k);
				const moved = k === 'b' && movedFromB() && kP2 > 0;
				op(n.opt, kP1 * (isChosen ? 1 : mix(1, 0.4, kF1)));
				n.opt.classList.toggle('is-chosen', isChosen && !moved);
				n.opt.classList.toggle('is-moved', moved);
				n.rely.textContent = moved ? L.moved : L.youRely;
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
			op(N.keyYou, Math.max(calls.g1 ? prog(t, ...T.call1Off) : 0, calls.g2 ? prog(t, ...T.call2Off) : 0, verdictK(t)));
			if (NW.keyVerdict) { const want = keyText(t, NW.keyVerdict, NW.keyYours); if (N.keyYou.textContent !== want) N.keyYou.textContent = want; }
			op(N.band, prog(t, ...T.band));
			const kF2 = prog(t, ...T.fade2);
			op(N.a.cond2, prog(t, ...T.cond2));
			N.a.yc2.textContent = skipped.g2 ? L.noCall : L.yourCall;
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
		// What the live region says: each question as it opens, then each suggested call and the
		// reader's own (%move% is the move option's label as shown).
		const ASK = (i) => G.ask[i].replace('%move%', moveLabel());
		const verdict1 = () => G.verdict1.base + G.verdict1[calls.g1 === 'a' ? 'a' : calls.g1 === 'b' ? 'b' : 'none'];
		const verdict2 = () => G.verdict2.base + (calls.g2 ? G.verdict2[calls.g2].replace('%move%', moveLabel().toLowerCase()) : G.verdict2.none);
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
			// Optional (business, layout.holdFirstView): where the first view already shows the
			// drawn picture, it keeps that size, so nothing jumps when the reader continues. A
			// stacked first view (short windows) still gives way to the drawn picture.
			const hold = g === 0 && ed.layout && ed.layout.holdFirstView && fitOn && !root.classList.contains('is-stacked');
			if (g === 0 && !hold) releaseFit();
			if (reducedNow()) {
				resolve(g);
				if (g === 0) api.openGate(1);
				else { api.seek(T.end); if (after) after.open = true; toggle.focus(); }
			} else {
				api.resume(g);
				toggle.focus({preventScroll: true});
				// After the first question the picture carries the next beats: bring the cards
				// into view (on a phone, the top of the stacked stage).
				if (g === 0 && !hold) requestAnimationFrame(() => showPicture());
			}
		};
		// Play at a question asks for the call; only Skip passes it without one.
		const onGatePlay = (g) => {
			if (calls[GKEY[g]]) { pass(false); return; }
			if (prompt) prompt.hidden = false;
			say(G.prompt);
			// Bring the options into view if they aren't (on a phone, above the sticky caption
			// band), then focus the first one.
			presentGate(g);
		};
		// The shot's top, so the nameplate strip above the stage stays in view too.
		function showPicture() {
			const r = shot.getBoundingClientRect();
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

		// Beat words come from the edition; the times stay here (BEAT_AT), and the last beat
		// carries the check.
		const BEATS = BEAT_AT.map((at, i) => ({at, ...ed.beats[i]}));
		BEATS[BEATS.length - 1].check = {...ed.check, followAt: T.follow};

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
			nameplate: NAMEPLATE,
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
			ph.textContent = G.locked;
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
	}
})();
