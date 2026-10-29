/* Invisible delegation: motion figure 5 of 8. Built to storyboard.md (round 5,
   revised after figure cold read 2).
   Grey is what the AI supplied, red is a student's decision, navy is ink.
   Each student has a block: their name and dot, their paper and the AI's notes
   at left, then a ledger in three lanes: THE STUDENT DECIDES, REQUESTS, THE AI
   DECIDES. The first student's plain requests carry each decision card across
   into the AI's lane. The second student starts from the rubric, writes each
   decision on its card before the request (real words: what they decided), and
   asks with words that point back to it. Both get the same notes; the second
   student judges them against those decisions and turns one down.
   Key evidence (notes, ticks, the struck note and its reason, UNSAID lines) is
   set at 15 units, so it renders at 13 px or more on any drawn stage.
   Whenever any picture label would render under 11 px (a stage narrower than
   880 px), the SVG gives way to a stacked text stage driven by the same clock.
   Every attribute is a pure function of t, so the runtime can play, scrub,
   hold (?t=) and export it frame by frame. */
(() => {
	const {mount, E, mix, prog, el, set, pathAt, legibility, mixColor, FONT, loadEdition, fillPage} = MotionFigures;
	const C = {paper: '#f6f1e8', bright: '#fffdfa', ink: '#0a2242', red: '#b81b2b', grey: '#5b564f', band: '#ded5c4'};
	const VW = 960;

	// ---- timeline (absolute seconds, from the storyboard) -------------------
	const T = {
		// beat 1: the draft and the three decisions
		card: [1.0, 1.6], dotA: [1.7, 2.1], paperA: [2.2, 2.8], rubric: [3.0, 3.4],
		// optional (an edition with firstReadsStandard): the first person reads the standard in beat 1
		readA: [6.4, 6.9], readBackA: [9.0, 9.4],
		ledgerA: [3.6, 4.2], cardsA: 4.4, cardStep: 0.45, cardDur: 0.35, slotsA: [5.9, 6.3],
		// beats 2-3: first student, three requests
		toRowA: [[10.5, 10.9], [21.8, 22.1]],
		bubA: [[10.9, 11.3], [22.1, 22.5], [27.5, 27.9]],
		carryA: [[12.8, 15.2], [24.2, 25.6], [28.0, 29.4]],
		backA: [[15.3, 15.8], [25.7, 26.2], [29.5, 30.0]],
		notesA: [15.9, 16.3], toNotesA: [16.4, 16.8], tickA: [[16.8, 16.95], [17.45, 17.6], [18.1, 18.25]], draftA2: [18.3, 18.6], revA: [18.6, 18.9], homeA: [18.9, 19.3],
		headA: [26.3, 26.7], workA3: [26.8, 27.4], paraA: [30.1, 30.5], workA4: [30.6, 31.4],
		// beat 4: the turn
		pulseQ: [33.9, 34.4], key: [34.5, 34.9], uns: [[35.0, 35.4], [35.5, 35.9], [36.0, 36.4]], pulseCards: [36.6, 37.2],
		// beat 5: second student, the rubric
		moveA: [42.6, 43.8], blockB: [43.9, 44.5], rubricUp: [45.3, 45.9], rubricHi: [45.9, 46.4], rubricBack: [49.9, 50.3],
		// beat 6: decision, then request, three times
		downB: [51.5, 52.0],
		writeB: [[52.2, 53.1], [54.4, 55.3], [56.6, 57.5]],
		bubB: [[53.2, 53.5], [55.4, 55.7], [57.6, 57.9]],
		settleB: [[53.6, 54.1], [55.8, 56.3], [58.0, 58.5]],
		homeB6: [58.5, 58.8],
		// beat 7: the same notes, judged against the decisions
		notesB: [61.3, 61.7], toNotesB: [61.8, 62.2], tickB: [[62.2, 62.4], [63.0, 63.2]], strikeB: [65.0, 65.4], pulseCrit: [65.0, 65.6], reasonB: [65.55, 66.2], revB: [66.3, 66.6],
		headB: [66.7, 67.1], workB3: [67.2, 67.8], paraB: [67.9, 68.3], workB4: [68.4, 69.0],
		// beat 8: faculty
		dim: [71.5, 72.5], fac: [72.6, 73.1], panelA: [73.3, 73.7], wordsA: [73.7, 77.4], panelB: [77.7, 78.1], wordsB: [78.1, 82.1],
		// beat 9: the check
		check: 83.6, undim: [85.6, 86.6], follow: 87.0, end: 90.5,
	};


	// ---- geometry (block-local; a block's top is Y) ---------------------------
	const Y = {a0: 168, a1: 108, b: 320};
	const X = {own: 178, req: 346, ai: 558, div1: 338, div2: 552};
	const CW = 154, CH = 30, CARRY = X.ai - X.own;
	const rowY = (k) => 44 + 58 * k; // card top
	const qY = (k) => 56 + 58 * k; // first quote baseline
	const HOME = {x: 30, y: 7};
	const BH = 54; // a written card's height
	const NOTE_Y = [133, 151, 169];

	// The beat times are core; the words come from the edition (editions/<id>.json).
	const BEAT_AT = [0, 9.5, 20.8, 32.9, 41.6, 48.9, 60.3, 70.5, 83.6];

	const root = document.querySelector('#invisible-delegation');
	const svg = root.querySelector('svg');
	Promise.all([loadEdition(root), document.fonts.ready]).then(([ed]) => { fillPage(document, ed); build(ed); });

	function build(ed) {
	const L = ed.labels, NW = ed.narrow;
	const LABELS = ed.decisions, REQ_A = ed.requests.first, UNSAID = ed.requests.unsaid, REQ_B = ed.requests.second;
	const NOTES = ed.notes.items, REASON = ed.notes.reason, DECIDED = ed.decided;
	const SPEECH = {a: {name: L.first, lines: ed.answers.first}, b: {name: L.second, lines: ed.answers.second}};
	// Optional (business): the second person's requests can carry no clause of their own (same words as the
	// first's); the first person can read the standard too; the note they keep can leave AI text in their
	// paper; the card a struck note is judged against can be named; a written card can hold one line.
	const plainB = REQ_B.every((r) => !r[1]);
	const FIRST_READS = !!ed.firstReadsStandard;
	const EXTRA_ROW = ed.notes.extraRow;
	const JUDGED = ed.notes.judgedBy ?? 0;
	const cardH = (k) => (DECIDED[k].length > 1 ? BH : 40);
	// Optional (business): a follow-up question. Both answer the first question alike, together; the
	// follow-up separates them. It needs about 1.8 s more before the check.
	const FOLLOW = ed.followUp ? {q: L.askQ2, split: ed.answers.split} : null;
	if (FOLLOW) Object.assign(T, {panelB: [73.3, 73.7], words1: [73.7, 74.7], q2: [75.6, 76.1], wordsA: [78.0, 79.6], wordsB: [80.2, 82.0], check: 85.4, undim: [87.4, 88.4], follow: 88.8, end: 92.3});
	if (ed.notes.judgedBy != null) T.pulseCrit = [64.6, 66.6];
	const defs = el(svg, 'defs');
	el(svg, 'rect', {width: 960, height: 540, fill: C.paper});
	el(el(defs, 'marker', {id: 'id-arrow', viewBox: '0 0 6 6', refX: 5, refY: 3, markerWidth: 5, markerHeight: 5, orient: 'auto'}), 'path', {d: 'M0 0L6 3L0 6Z', fill: C.red});
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
	el(card, 'rect', {x: 24, y: 14, width: 400, height: 78, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.15});
	mono(card, 40, 34, ed.task.label);
	serif(card, 40, 56, ed.task.text, {fs: 16});
	const RUB = {x: 40, y: 78};
	const rubricWash = el(topLayer, 'rect', {x: 32, y: 57, height: 30, rx: 3, fill: C.ink, 'fill-opacity': 0});
	const rubric = el(topLayer, 'g');
	mono(rubric, 40, RUB.y, ed.task.rubricLabel);
	const rubricLabel = rubric.lastChild;
	const rubricText = serif(rubric, 108, RUB.y, ed.task.rubric, {fs: 16, style: 'italic'});
	const rubricLine = el(rubric, 'line', {x1: 108, y1: RUB.y + 5, x2: 108, y2: RUB.y + 5, stroke: C.ink, 'stroke-width': 1.6});

	// ---- a student's block -----------------------------------------------------
	const ROWS_A = [[54, 47, 58, 50, 43, 56, 36], [54, 52, 45, 50, 54, 56, 36], [27, 49, 52, 27, 47, 56, 36], [27, 52, 49, 27, 50, 58, 58]];
	const ROWS_B = [[50, 56, 45, 54, 49, 40, 52], [50, 49, 54, 54, 45, 40, 52], [27, 54, 47, 27, 52, 40, 52], [27, 49, 54, 27, 47, 58, 58]];
	function block(g, key) {
		const isA = key === 'a';
		const o = {key, isA};
		o.name = text(g, 42, 12, isA ? L.first : L.second, {fs: 13, weight: 600, fill: C.red});
		// The paper: title bar and seven rows; four of them can turn into the AI's grey text.
		o.paper = el(g, 'g');
		el(o.paper, 'rect', {x: 27, y: 25, width: 72, height: 70, fill: C.ink, 'fill-opacity': 0.06});
		el(o.paper, 'rect', {x: 24, y: 22, width: 72, height: 70, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.18, 'stroke-width': 1.2});
		el(o.paper, 'rect', {x: 31, y: 28, width: 42, height: 4.5, fill: C.ink});
		o.rows = [0, 1, 2, 3, 4, 5, 6].map((i) => {
			const y = 39 + 7 * i;
			const ink = el(o.paper, 'rect', {x: 31, y, height: 3.2, fill: C.ink, 'fill-opacity': 0.75});
			const grey = el(o.paper, 'g', {opacity: 0});
			const band = el(grey, 'rect', {x: 30, y: y - 1.4, height: 6, rx: 1, fill: C.band});
			const bar = el(grey, 'rect', {x: 31, y, height: 3.2, fill: C.grey});
			return {ink, grey, band, bar};
		});
		o.draft = mono(g, 104, 36, '');
		o.rev = el(g, 'g');
		mono(o.rev, 104, 52, L.revised[0], {fill: C.grey});
		mono(o.rev, 104, 66, L.revised[1], {fill: C.grey});
		// The AI's notes, worked through by the student.
		o.notes = el(g, 'g');
		el(o.notes, 'rect', {x: 24, y: 100, width: 144, height: 100, rx: 2, fill: C.band, 'fill-opacity': 0.75, stroke: C.grey, 'stroke-opacity': 0.5});
		mono(o.notes, 29, 115, ed.notes.label, {fill: C.grey});
		o.noteText = NOTES.map((s, i) => serif(o.notes, 44, NOTE_Y[i], s, {fs: 15, fill: C.grey}));
		o.ticks = NOTES.map((s, i) => text(o.notes, 28, NOTE_Y[i], '✓', {fs: 15, weight: 600, fill: C.ink}));
		if (!isA) {
			o.strike = el(o.notes, 'line', {stroke: C.red, 'stroke-width': 1.8});
			const c = clip(o.notes);
			o.reasonClip = c.rect;
			o.reason = serif(c.g, 44, 189, REASON, {fs: 15, style: 'italic', fill: C.red});
		}
		// The ledger (dims when faculty ask).
		o.led = el(g, 'g');
		o.ledFrame = el(o.led, 'g');
		el(o.ledFrame, 'line', {x1: X.div1, y1: 2, x2: X.div1, y2: 202, stroke: C.ink, 'stroke-opacity': 0.3});
		el(o.ledFrame, 'line', {x1: X.div2, y1: 2, x2: X.div2, y2: 202, stroke: C.ink, 'stroke-opacity': 0.3});
		mono(o.ledFrame, X.own, 12, L.laneOwn, {fill: C.red});
		mono(o.ledFrame, X.req, 12, L.laneRequests);
		mono(o.ledFrame, X.ai, 12, L.laneAI, {fill: C.grey});
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
			const bar = isA ? el(c, 'rect', {x: X.own + 9, y: rowY(k) + 23, height: 2.5, width: 0, fill: C.grey}) : null;
			const lines = isA ? [] : DECIDED[k].map((ln, li) => {
				const cl = clip(c);
				const tx = serif(cl.g, X.own + 9, rowY(k) + 35 + 15 * li, ln, {fs: 14.5, style: 'italic', fill: C.red});
				set(cl.rect, {x: X.own + 4, y: rowY(k) + 22 + 15 * li, height: 18, width: 0});
				return {clip: cl.rect, tx, w: 140};
			});
			return {c, rect, label, bar, lines};
		});
		// Requests: quote lines in the middle lane.
		o.quotes = [0, 1, 2].map((k) => {
			const q = el(o.led, 'g', {opacity: 0});
			const wash = el(q, 'rect', {x: X.req - 3, y: qY(k) - 14, height: 19, rx: 2, fill: C.ink, 'fill-opacity': 0});
			let t1;
			if (isA) t1 = serif(q, X.req, qY(k), `“${REQ_A[k]}”`, {fs: 15, style: 'italic'});
			else {
				t1 = serif(q, X.req, qY(k), plainB ? `“${REQ_B[k][0]}”` : `“${REQ_B[k][0]}`, {fs: 15, style: 'italic'});
				if (plainB) return {q, wash, t1};
				const t2 = serif(q, X.req, qY(k) + 18, '', {fs: 15, style: 'italic'});
				el(t2, 'tspan', {fill: C.red}, REQ_B[k][1]);
				el(t2, 'tspan', {}, '”');
			}
			return {q, wash, t1};
		});
		if (isA) {
			// What each request left unsaid: its own line, outside the quotation marks.
			o.unsaid = [0, 1, 2].map((k) => {
				const u = el(o.led, 'g', {opacity: 0});
				const tag = mono(u, X.req, qY(k) + 20, L.unsaid, {fs: 15, ls: 0});
				const box = el(u, 'rect', {x: X.req, y: qY(k) + 6, height: 19, rx: 2, fill: 'none', stroke: C.grey, 'stroke-width': 1.3, 'stroke-dasharray': '3 3'});
				const t = serif(u, X.req, qY(k) + 20, UNSAID[k], {fs: 15, style: 'italic', fill: C.grey});
				return {u, tag, box, t};
			});
			o.key = el(o.led, 'g', {opacity: 0});
			el(o.key, 'rect', {x: 424, y: 2, width: 14, height: 11, fill: 'none', stroke: C.grey, 'stroke-width': 1.3, 'stroke-dasharray': '3 2'});
			mono(o.key, 444, 12, L.unsaidKey, {fs: 13, ls: 0.5});
		} else {
			o.pointers = plainB ? [] : [0, 1, 2].map((k) => el(o.led, 'path', {d: `M${X.req - 2} ${qY(k) + 13}C${X.req - 6} ${qY(k) + 13} ${X.req - 6} ${rowY(k) + BH / 2} ${X.own + CW + 3} ${rowY(k) + BH / 2}`, fill: 'none', stroke: C.red, 'stroke-width': 1.3, 'marker-end': 'url(#id-arrow)'}));
		}
		// Request bubbles (moving; drawn above the ledger).
		o.bubbles = [0, 1, 2].map((k) => {
			const b = el(g, 'g', {opacity: 0});
			const shape = el(b, 'path', {fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.3, 'stroke-width': 1.2});
			const t = serif(b, isA ? X.own + 10 : X.req + 12, isA ? rowY(k) - 10 : rowY(k) + 22, '', {fs: 14});
			if (isA) t.textContent = REQ_A[k];
			else if (plainB) t.textContent = REQ_B[k][0];
			else { el(t, 'tspan', {}, REQ_B[k][0] + ' '); el(t, 'tspan', {fill: C.red}, REQ_B[k][1]); }
			if (isA) el(b, 'rect', {x: X.own + 20, y: rowY(k) - 4, width: 3, height: 7, fill: C.ink, 'fill-opacity': 0.6});
			return {b, shape, t, w: 160};
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
	mono(fac, 724, 44, L.askLabel);
	serif(fac, 724, 70, L.askQ, {fs: 19, style: 'italic'});
	const facQ2 = FOLLOW ? el(facLayer, 'g') : null;
	if (FOLLOW) FOLLOW.q.forEach((ln, i) => serif(facQ2, 724, 96 + 20 * i, ln, {fs: 17, style: 'italic'}));
	const speech = (key, y0) => {
		const n = SPEECH[key].lines.length, gap = FOLLOW ? 8 : 0;
		const x = 724, w = 212, h = 88 + 19 * Math.max(0, n - 3) + gap, r = 8;
		const g = el(facLayer, 'g');
		el(g, 'path', {d: `M${x + r} ${y0}H${x + w - r}Q${x + w} ${y0} ${x + w} ${y0 + r}V${y0 + h - r}Q${x + w} ${y0 + h} ${x + w - r} ${y0 + h}H${x + r}Q${x} ${y0 + h} ${x} ${y0 + h - r}V${y0 + 30}L${x - 8} ${y0 + 24}L${x} ${y0 + 18}V${y0 + r}Q${x} ${y0} ${x + r} ${y0}Z`,
			fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.25});
		text(g, x + 12, y0 + 19, SPEECH[key].name, {fs: 13, weight: 600, fill: C.red});
		const words = [], words2 = [];
		SPEECH[key].lines.forEach((ln, li) => {
			const second = FOLLOW && li >= FOLLOW.split;
			const t = serif(g, x + 12, y0 + 39 + 19 * li + (second ? gap : 0), '', {fs: 15});
			ln.split(' ').forEach((wd, wi) => (second ? words2 : words).push(el(t, 'tspan', {'fill-opacity': 0}, (wi ? ' ' : '') + wd)));
		});
		return {g, words, words2};
	};
	// An edition's source line, drawn only when the edition has one (business, option A).
	const sourceLines = L.source ? L.source.map((ln, i) => serif(facLayer, 724, 500 + 17 * i, ln, {fs: 13, style: 'italic'})) : [];
	const spA = speech('a', Y.a1 + 36);
	const spB = speech('b', Y.b + 36);

	// ---- measure (after fonts load) -------------------------------------------------------
	const S = {};
	const W = (node) => node.getComputedTextLength();
	function measure() {
		for (const o of [A, B]) {
			o.bubbles.forEach((b, k) => {
				const tw = W(b.t);
				if (o.isA) {
					b.w = Math.max(tw + 22, CW + 14);
					set(b.shape, {d: bubblePath(X.own, rowY(k) - 28, b.w, 26)});
					set(b.t, {x: X.own + (b.w - tw) / 2});
				} else {
					b.w = tw + 24;
					set(b.shape, {d: bubblePath(X.req + 2, rowY(k) + 4, b.w, 26)});
					set(b.t, {x: X.req + 14});
				}
			});
			o.quotes.forEach((q) => set(q.wash, {width: W(q.t1) + 6}));
			if (o.unsaid) o.unsaid.forEach((u) => {
				const bx = X.req + W(u.tag) + 4;
				set(u.box, {x: bx, width: W(u.t) + 8});
				set(u.t, {x: bx + 4});
			});
			o.cards.forEach((c) => c.lines.forEach((l) => { l.w = W(l.tx) + 4; }));
			if (o.strike) {
				o.strikeW = W(o.noteText[2]);
				o.reasonW = W(o.reason);
				set(o.reasonClip, {x: 42, y: 175, height: 20, width: 0});
			}
		}
		S.rubricW = W(rubricText);
		// A longer standard label pushes the text right; PME's "RUBRIC ·" keeps it at 108.
		S.rubricX = Math.max(108, 40 + W(rubricLabel) + 2);
		set(rubricText, {x: S.rubricX});
		set(rubricLine, {x1: S.rubricX, x2: S.rubricX});
		// The enlarged rubric stays inside the task card.
		S.rubricScale = Math.min(1.3, (416 - RUB.x) / (S.rubricX + S.rubricW - RUB.x));
		// Dot paths (block-local).
		const N = (i) => ({x: 16, y: NOTE_Y[i] - 5});
		const R = (k) => ({x: 173, y: rowY(k) - 15}); // beside a first-student bubble
		const Ptop = {x: 60, y: 34}, Pbot = {x: 60, y: 86};
		const tk = T.tickA;
		const readA = FIRST_READS ? (() => {
			const a0 = {x: 12, y: 0}, a1 = {x: 12, y: RUB.y - Y.a0}, ar = {x: 30, y: RUB.y - 4 - Y.a0}, [u0, u1] = T.readA, [d0, d1] = T.readBackA;
			return [[u0, u0 + 0.1, HOME, a0, E.inOut], [u0 + 0.1, u1 - 0.1, a0, a1, E.inOut], [u1 - 0.1, u1, a1, ar, E.inOut],
				[d0, d0 + 0.1, ar, a1, E.inOut], [d0 + 0.1, d1 - 0.1, a1, a0, E.inOut], [d1 - 0.1, d1, a0, HOME, E.inOut]];
		})() : [];
		A.path = pathAt([
			...readA,
			[T.toRowA[0][0], T.toRowA[0][1], HOME, R(0), E.inOut],
			[T.toNotesA[0], T.toNotesA[1], R(0), N(0), E.inOut], [tk[0][1] + 0.35, tk[1][0], N(0), N(1), E.inOut], [tk[1][1] + 0.35, tk[2][0], N(1), N(2), E.inOut],
			[T.homeA[0], T.homeA[1], N(2), HOME, E.inOut],
			[T.toRowA[1][0], T.toRowA[1][1], HOME, R(1), E.inOut],
			[T.workA3[0], T.workA3[0] + 0.15, R(1), Ptop, E.inOut], [T.workA3[0] + 0.15, T.workA3[1] - 0.15, Ptop, Pbot, E.inOut], [T.workA3[1] - 0.15, T.workA3[1], Pbot, R(2), E.inOut],
			[T.workA4[0], T.workA4[0] + 0.15, R(2), Ptop, E.inOut], [T.workA4[0] + 0.15, T.workA4[1] - 0.2, Ptop, Pbot, E.inOut], [T.workA4[1] - 0.2, T.workA4[1], Pbot, HOME, E.inOut],
		], HOME);
		// The second student goes to the rubric up the left margin, and back; then writes
		// each card (two lines) and asks from the card's edge.
		const m0 = {x: 12, y: 0}, m1 = {x: 12, y: RUB.y - Y.b}, rub = {x: 30, y: RUB.y - 4 - Y.b}, m2 = {x: 12, y: 16};
		const L = (k, li, end) => ({x: X.own + (end ? CW - 14 : 12), y: rowY(k) + 30 + 15 * li});
		const RB = (k) => ({x: X.own + CW + 5, y: rowY(k) + 17});
		const wB = T.writeB, bB = T.bubB, ru = T.rubricUp, dn = T.downB;
		const segs = [
			[ru[0], ru[0] + 0.1, HOME, m0, E.inOut], [ru[0] + 0.1, ru[1] - 0.1, m0, m1, E.inOut], [ru[1] - 0.1, ru[1], m1, rub, E.inOut],
			[dn[0], dn[0] + 0.1, rub, m1, E.inOut], [dn[0] + 0.1, dn[1] - 0.15, m1, m2, E.inOut], [dn[1] - 0.15, dn[1], m2, L(0, 0, false), E.inOut],
		];
		[0, 1, 2].forEach((k) => {
			const [w0, w1] = wB[k], mid = w0 + (w1 - w0) * 0.5;
			if (k) segs.push([w0 - 0.2, w0, RB(k - 1), L(k, 0, false), E.inOut]);
			segs.push([w0 + 0.05, mid - 0.05, L(k, 0, false), L(k, 0, true)], [mid - 0.05, mid + 0.05, L(k, 0, true), L(k, 1, false), E.inOut], [mid + 0.05, w1, L(k, 1, false), L(k, 1, true)]);
			segs.push([w1, bB[k][0], L(k, 1, true), RB(k), E.inOut]);
		});
		const ny = (i) => NOTE_Y[i] - 5;
		segs.push(
			[T.homeB6[0], T.homeB6[1], RB(2), HOME, E.inOut],
			[T.toNotesB[0], T.toNotesB[1], HOME, N(0), E.inOut], [T.tickB[0][1] + 0.4, T.tickB[1][0], N(0), N(1), E.inOut],
			[T.strikeB[0] - 0.2, T.strikeB[0], N(1), {x: 42, y: ny(2)}, E.inOut], [T.strikeB[0], T.strikeB[1], {x: 42, y: ny(2)}, {x: 164, y: ny(2)}],
			[T.strikeB[1], T.reasonB[0], {x: 164, y: ny(2)}, {x: 44, y: 184}, E.inOut], [T.reasonB[0], T.reasonB[1], {x: 44, y: 184}, {x: 160, y: 184}],
			[T.workB3[0], T.workB3[0] + 0.2, {x: 160, y: 184}, Ptop, E.inOut], [T.workB3[0] + 0.2, T.workB3[1], Ptop, Pbot, E.inOut],
			[T.workB4[0], T.workB4[0] + 0.15, Pbot, Ptop, E.inOut], [T.workB4[0] + 0.15, T.workB4[1] - 0.2, Ptop, Pbot, E.inOut], [T.workB4[1] - 0.2, T.workB4[1], Pbot, HOME, E.inOut],
		);
		B.path = pathAt(segs, HOME);
	}

	// ---- render ------------------------------------------------------------------------------
	const draftLabel = (t, d2, d3, d4, word = L.draft) => (t >= d4 ? `${word} 4` : t >= d3 ? `${word} 3` : t >= d2 ? `${word} 2` : '');
	const draftsA = (t) => draftLabel(t, T.draftA2[0], T.workA3[1] - 0.1, T.workA4[1] - 0.2);
	const draftsB = (t) => draftLabel(t, T.revB[0], T.workB3[1] - 0.1, T.workB4[1] - 0.2);
	function renderPaper(o, t, {ticks, head, work3, para, work4}, extra = null) {
		const W0 = o.isA ? ROWS_A : ROWS_B;
		const fb = ticks.map((s) => prog(t, ...s, E.inOut));
		const kH = prog(t, ...head), k3 = prog(t, ...work3, E.inOut), kP = prog(t, ...para), k4 = prog(t, ...work4, E.inOut);
		o.rows.forEach((r, i) => {
			const fbK = i === 1 ? fb[0] : i === 2 ? fb[1] : i === 4 ? fb[2] || 0 : 0;
			let w = mix(W0[0][i], W0[1][i], fbK);
			w = mix(w, W0[2][i], k3);
			w = mix(w, W0[3][i], k4);
			const greyK = i === 0 || i === 3 ? kH : i === 5 || i === 6 ? kP : i === extra ? fb[2] || 0 : 0;
			set(r.ink, {width: w, 'fill-opacity': 0.75 * (1 - greyK)});
			set(r.grey, {opacity: greyK});
			set(r.band, {width: w + 2});
			set(r.bar, {width: w});
		});
	}
	function renderDot(o, t, kIn, pulses) {
		const p = o.path(t);
		const pulse = Math.max(0, ...pulses.map((s) => { const k = prog(t, s, s + 0.4); return k > 0 && k < 1 ? k : 0; }));
		set(o.dotG, {opacity: kIn});
		set(o.dot, {cx: p.x, cy: p.y, r: 5 * Math.min(1, kIn * 1.2)});
		set(o.ring, {cx: p.x, cy: p.y, r: 5 + 10 * pulse, opacity: pulse > 0 ? 1 - pulse : 0});
	}
	const bubbleTransform = (k, dx, dy, grow) => `translate(${dx} ${dy}) translate(${X.own} ${rowY(k) - 15}) scale(${mix(0.85, 1, grow)}) translate(${-X.own} ${-(rowY(k) - 15)})`;

	const render = (t) => {
		const dimK = prog(t, ...T.dim) - prog(t, ...T.undim);
		const ledOp = 1 - 0.85 * dimK;

		// Task card and rubric. The second student's visit enlarges and highlights the rubric line.
		const kc = prog(t, ...T.card, E.house);
		set(card, {opacity: kc, transform: `translate(0 ${mix(6, 0, kc)})`});
		const hiA = FIRST_READS ? prog(t, T.readA[1] - 0.3, T.readA[1] + 0.2, E.house) - prog(t, T.readBackA[0], T.readBackA[0] + 0.4, E.inOut) : 0;
		const hi = prog(t, ...T.rubricHi, E.house) - prog(t, ...T.rubricBack, E.inOut) + hiA;
		const sc = 1 + ((S.rubricScale || 1.3) - 1) * hi;
		set(rubric, {opacity: prog(t, ...T.rubric), transform: `translate(${RUB.x} ${RUB.y}) scale(${sc}) translate(${-RUB.x} ${-RUB.y})`});
		set(rubricWash, {'fill-opacity': 0.09 * hi, width: ((S.rubricX || 108) - 40 + (S.rubricW || 196)) * sc + 14});
		const kr = Math.max(prog(t, ...T.rubricHi, E.inOut), hiA);
		const krBack = FIRST_READS ? (t < T.rubricHi[0] ? 0 : prog(t, ...T.rubricBack)) : 0.6 * prog(t, ...T.rubricBack);
		set(rubricLine, {x2: (S.rubricX || 108) + (S.rubricW || 196) * kr, opacity: kr > 0 ? 1 - krBack : 0});

		// ---- first student --------------------------------------------------------------
		set(gA, {transform: `translate(0 ${mix(Y.a0, Y.a1, prog(t, ...T.moveA, E.inOutStrong))})`});
		set(A.name, {opacity: prog(t, ...T.dotA)});
		set(A.paper, {opacity: prog(t, ...T.paperA)});
		renderPaper(A, t, {ticks: T.tickA, head: T.headA, work3: T.workA3, para: T.paraA, work4: T.workA4}, EXTRA_ROW ?? null);
		A.draft.textContent = draftsA(t);
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
			const grow = prog(t, g0, g1, E.house);
			const carry = prog(t, c0, c1, E.inOutStrong);
			const back = prog(t, b0, b1, E.inOut);
			// Back: from the AI's lane to the quote line in the requests lane, fading out.
			const dx = CARRY * carry - (CARRY - (X.req - X.own)) * back;
			const dy = (qY(k) - (rowY(k) - 10)) * back;
			set(b.b, {opacity: grow * Math.max(0, 1 - 2 * back), transform: bubbleTransform(k, dx, dy, grow)});
		});
		renderDot(A, t, prog(t, ...T.dotA, E.house), T.bubA.map((s) => s[0]));

		// ---- second student ------------------------------------------------------------------
		set(gB, {opacity: prog(t, ...T.blockB), transform: `translate(0 ${Y.b})`});
		renderPaper(B, t, {ticks: T.tickB, head: T.headB, work3: T.workB3, para: T.paraB, work4: T.workB4});
		B.draft.textContent = draftsB(t);
		set(B.draft, {opacity: prog(t, ...T.revB)});
		set(B.rev, {opacity: prog(t, ...T.revB)});
		set(B.notes, {opacity: prog(t, ...T.notesB) * ledOp});
		B.ticks.forEach((tk, i) => set(tk, {opacity: i < 2 ? prog(t, ...T.tickB[i]) : 0}));
		const ks = prog(t, ...T.strikeB);
		const ny = NOTE_Y[2] - 5;
		set(B.strike, {x1: 44, y1: ny, x2: 44 + ((B.strikeW || 115) + 4) * ks, y2: ny, opacity: ks > 0 ? 1 : 0});
		set(B.noteText[2], {'fill-opacity': 1 - 0.3 * ks});
		set(B.reasonClip, {width: ((B.reasonW || 120) + 6) * prog(t, ...T.reasonB)});
		set(B.led, {opacity: ledOp});
		B.aiSlots.forEach((s) => set(s, {opacity: 1}));
		B.ownSlots.forEach((s) => set(s, {opacity: 0}));
		B.cards.forEach((c, k) => {
			const [w0, w1] = T.writeB[k];
			const w = prog(t, w0, w1);
			const grow = prog(t, w0, w0 + 0.25, E.house);
			const pulse = k === JUDGED ? bump(t, ...T.pulseCrit) : 0;
			set(c.c, {opacity: 1});
			set(c.rect, {height: mix(CH, cardH(k), grow), fill: C.bright, stroke: w > 0 ? C.red : C.ink, 'stroke-opacity': w > 0 ? 1 : 0.45, 'stroke-dasharray': w > 0 ? 'none' : '4 3', 'stroke-width': (w > 0 ? 1.6 : 1.2) + 1.6 * pulse});
			set(c.label, {fill: mixColor(C.ink, C.red, Math.min(1, w * 2))});
			const mid = w0 + (w1 - w0) * 0.5;
			c.lines.forEach((l, li) => set(l.clip, {width: l.w * (li ? prog(t, mid + 0.05, w1) : prog(t, w0 + 0.05, mid - 0.05))}));
		});
		B.quotes.forEach((q, k) => set(q.q, {opacity: prog(t, (T.settleB[k][0] + T.settleB[k][1]) / 2, T.settleB[k][1])}));
		B.pointers.forEach((p, k) => {
			const kp = prog(t, T.settleB[k][1] - 0.3, T.settleB[k][1] + 0.1);
			set(p, {'stroke-dasharray': 30, 'stroke-dashoffset': 30 * (1 - kp), opacity: kp > 0 ? 1 : 0});
		});
		B.bubbles.forEach((b, k) => {
			const [g0, g1] = T.bubB[k], [s0, s1] = T.settleB[k];
			const grow = prog(t, g0, g1, E.house);
			const settle = prog(t, s0, s1, E.inOut);
			set(b.b, {opacity: grow * Math.max(0, 1 - 2 * settle), transform: `translate(${X.req} ${rowY(k) + 17}) scale(${mix(0.85, 1, grow)}) translate(${-X.req} ${-(rowY(k) + 17)})`});
		});
		renderDot(B, t, prog(t, ...T.blockB, E.house), T.bubB.map((s) => s[0]));

		// ---- faculty -----------------------------------------------------------------------------
		const kf = prog(t, ...T.fac, E.house);
		set(fac, {opacity: kf, transform: `translate(0 ${mix(6, 0, kf)})`});
		set(spA.g, {opacity: prog(t, ...T.panelA)});
		set(spB.g, {opacity: prog(t, ...T.panelB)});
		const words = (sp, [t0, t1]) => sp.words.forEach((w, i) => { const ti = t0 + ((t1 - t0) * i) / sp.words.length; set(w, {'fill-opacity': prog(t, ti, ti + 0.15)}); });
		if (FOLLOW) {
			set(facQ2, {opacity: prog(t, ...T.q2)});
			words(spA, T.words1);
			words(spB, T.words1);
			words({words: spA.words2}, T.wordsA);
			words({words: spB.words2}, T.wordsB);
		} else {
			words(spA, T.wordsA);
			words(spB, T.wordsB);
		}
		sourceLines.forEach((n) => set(n, {opacity: prog(t, T.check + 1.0, T.check + 1.5)}));

		renderNarrow(t);
	};

	// ---- the stacked text stage (any time a picture label would be hidden) -----------------
	// The two students side by side, as on desktop: each column carries the draft
	// counter and tag, the AI's notes, and one cell per decision (the request, what it
	// left unsaid, and a chip saying who decides).
	const narrow = root.querySelector('[data-id-narrow]');
	const h = (tag, cls, parent, txt) => { const n = document.createElement(tag); if (cls) n.className = cls; if (txt != null) n.textContent = txt; parent.append(n); return n; };
	const NR = {};
	{
		const task = h('div', 'id-n-task', narrow);
		const p1 = h('p', null, task);
		h('b', null, p1, NW.taskLabel);
		p1.append(` ${ed.task.text}`);
		NR.rubric = h('p', 'id-n-rubric', task);
		h('b', null, NR.rubric, NW.rubricLabel);
		h('span', null, NR.rubric, ed.task.rubric);
		NR.task = task;
		NR.fac = h('p', 'id-n-fac', narrow);
		h('b', null, NR.fac, NW.askLabel);
		NR.fac.append(L.askQ);
		NR.q2 = FOLLOW ? h('span', 'id-n-q2', NR.fac, ' ' + FOLLOW.q.join(' ')) : null;
		// One key for the cells, in place of a tag on every chip.
		NR.key = h('p', 'id-n-keys', narrow);
		NR.keyItems = ['is-open', 'is-ai', 'is-own', 'is-uns'].map((cls, i) => [cls, NW.keys[i]]).map(([cls, txt]) => h('span', cls, NR.key, txt));
		const grid = h('div', 'id-n-grid', narrow);
		const column = (key) => {
			const isA = key === 'a';
			const c = {};
			c.el = h('div', 'id-n-col', grid);
			const who = h('p', 'id-n-who', c.el);
			h('span', null, who, isA ? L.first : L.second);
			c.draft = h('span', 'id-n-draft', who, NW.draft1);
			const paper = h('p', 'id-n-paper', c.el);
			c.rev = h('span', 'id-n-rev', paper, NW.revised);
			c.notes = h('div', 'id-n-notes', c.el);
			h('b', null, c.notes, NW.notesLabel);
			c.noteEls = NOTES.map((n) => {
				const line = h('p', 'id-n-note', c.notes);
				const tick = h('i', null, line, '✓');
				const txt = h('span', null, line, n);
				return {line, tick, txt};
			});
			if (!isA) c.reason = h('p', 'id-n-reason', c.notes, REASON);
			c.ledger = h('div', 'id-n-ledger', c.el);
			// Optional (an edition with narrow.lanes): lane names over the cells, for a stage wide enough to slide chips across.
			if (NW.lanes) { const ln = h('p', 'id-n-lanes', c.ledger); h('span', null, ln, NW.lanes[0]); h('span', null, ln, NW.lanes[1]); }
			c.cells = [0, 1, 2].map((k) => {
				const cell = h('div', 'id-n-cell', c.ledger);
				const q = h('p', 'id-n-q', cell);
				if (isA) q.textContent = `“${REQ_A[k]}”`;
				else if (plainB) q.textContent = `“${REQ_B[k][0]}”`;
				else { q.append(`“${REQ_B[k][0]} `); h('span', 'is-red', q, REQ_B[k][1]); q.append('”'); }
				let uns = null;
				if (isA) { uns = h('p', 'id-n-uns', cell, NW.unsaid); h('span', 'id-n-ghost', uns, UNSAID[k]); }
				const chip = h('p', 'id-n-chip', cell);
				const label = h('span', null, chip, LABELS[k]);
				const decided = isA ? null : h('i', 'id-n-decided', chip, DECIDED[k].join(' '));
				return {cell, q, uns, chip, label, decided};
			});
			c.say = h('p', 'id-n-say', c.el, FOLLOW ? SPEECH[key].lines.slice(0, FOLLOW.split).join(' ') : SPEECH[key].lines.join(' '));
			c.say2 = FOLLOW ? h('span', 'id-n-say2', c.say, ' ' + SPEECH[key].lines.slice(FOLLOW.split).join(' ')) : null;
			return c;
		};
		NR.a = column('a');
		NR.b = column('b');
		NR.source = NW.source ? h('p', 'id-n-source', narrow, NW.source) : null;
		if (NW.lanes) narrow.classList.add('has-lanes');
	}
	const fade = (node, k) => { node.style.opacity = Math.max(0, Math.min(1, k)).toFixed(3); };
	const vis = (node, on) => { node.style.visibility = on ? 'visible' : 'hidden'; };
	const wideStack = matchMedia('(min-width: 600px)');
	function renderNarrow(t) {
		if (!root.classList.contains('is-stacked')) return;
		const dimK = prog(t, ...T.dim) - prog(t, ...T.undim);
		const ledOp = 1 - 0.85 * dimK;
		fade(NR.task, prog(t, ...T.card));
		vis(NR.rubric, t >= T.rubric[0]);
		const readingB = t >= T.rubricHi[0] && t < T.rubricBack[1], readingA = FIRST_READS && t >= T.readA[1] && t < T.readBackA[1];
		// When both people read the standard (business), the underline shows only while either reads, as in
		// the wide picture; PME keeps it from the second person's read on.
		NR.rubric.classList.toggle('is-consulted', FIRST_READS ? readingA || readingB : t >= T.rubricHi[0]);
		NR.rubric.classList.toggle('is-lit', readingB || readingA);
		vis(NR.fac, t >= T.fac[0]);
		fade(NR.fac, prog(t, ...T.fac));
		// First student.
		const a = NR.a;
		fade(a.el, prog(t, ...T.dotA));
		a.draft.textContent = draftsA(t) || NW.draft1;
		vis(a.rev, t >= T.revA[0]);
		vis(a.notes, t >= T.notesA[0]);
		fade(a.notes, ledOp);
		a.noteEls.forEach((n, i) => vis(n.tick, t >= T.tickA[i][0]));
		vis(a.ledger, t >= T.ledgerA[0]);
		fade(a.ledger, ledOp);
		vis(NR.key, t >= T.ledgerA[0]);
		vis(NR.keyItems[2], t >= T.blockB[0]);
		vis(NR.keyItems[3], t >= T.key[0]);
		a.cells.forEach((c, k) => {
			const [c0, c1] = T.carryA[k];
			const carry = prog(t, c0, c1, E.inOutStrong);
			const crossed = t >= c1 - 0.4;
			vis(c.chip, t >= T.cardsA + k * T.cardStep);
			c.chip.classList.toggle('is-ai', crossed);
			c.chip.style.transform = NW.lanes && wideStack.matches ? `translateX(calc(${(carry * 100).toFixed(2)}% + ${(carry * 6).toFixed(2)}px))` : `translateX(${(carry > 0 && carry < 1 ? 40 * Math.sin(Math.PI * carry) : 0).toFixed(1)}px)`;
			// The request shows when it is asked, before its decision crosses.
			vis(c.q, t >= T.bubA[k][0]);
			vis(c.uns, t >= T.uns[k][0]);
		});
		vis(a.say, t >= T.panelA[0]);
		// Second student.
		const b = NR.b;
		vis(b.el, t >= T.blockB[0]);
		fade(b.el, prog(t, ...T.blockB));
		b.draft.textContent = draftsB(t) || NW.draft1;
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
			// Once written, the chip shows the decision itself in place of its name.
			c.decided.hidden = !own;
			c.label.hidden = own;
			c.chip.classList.toggle('is-pulse', k === JUDGED && t >= T.pulseCrit[0] && t < T.pulseCrit[1]);
			vis(c.q, t >= T.bubB[k][0]);
		});
		vis(b.say, t >= T.panelB[0]);
		if (FOLLOW) { vis(NR.q2, t >= T.q2[0]); vis(a.say2, t >= T.wordsA[0]); vis(b.say2, t >= T.wordsB[0]); }
		if (NR.source) vis(NR.source, t >= T.check + 1.0);
	}
	// The narrow stage keeps the height of its tallest moment, so the caption band and
	// controls never move while it plays.
	let fitWidth = 0;
	let player = null;
	// The figure's own time (the scrubber shows player time, which includes the name card).
	const figTime = () => (player ? player.time() : 0);
	const fitNarrow = () => {
		const now = figTime();
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
			renderNarrow(figTime());
		}
		const w = Math.round(root.getBoundingClientRect().width);
		if (stacked && w !== fitWidth) { fitWidth = w; fitNarrow(); }
	};

	const BEATS = BEAT_AT.map((at, i) => ({at, ...ed.beats[i]}));
	if (FOLLOW) BEATS[BEATS.length - 1].at = T.check;
	BEATS[BEATS.length - 1].check = {...ed.check, followAt: T.follow};

	// The faces the picture uses must be loaded before text is measured: the SVG is built
	// after the edition loads, so its italic and mono faces may not have been requested yet.
	const FACES = ['400 16px "Source Serif 4"', 'italic 400 16px "Source Serif 4"', '600 13px "Source Sans 3"', '400 14px "Source Sans 3"', '600 12px "IBM Plex Mono"'];
	Promise.all(FACES.map((f) => document.fonts.load(f))).then(() => {
		measure();
		legibility(root, svg, VW, 11);
		new ResizeObserver(syncStacked).observe(svg);
		syncStacked();
		// Poster: the setup settled (task, student, rubric, the three open decisions).
		// Nameplate: the opening name card, the corner plate, and the name and definition above the check.
		player = mount(root, {duration: T.end, render, beats: BEATS, poster: BEATS[1].at - 0.02,
			nameplate: {name: 'Invisible delegation', kicker: 'Failure mode 5 of 7', definition: 'A request for help hands over criteria, structure, or meaning.'}});
		fitWidth = 0;
		syncStacked();
	});
	}
})();
