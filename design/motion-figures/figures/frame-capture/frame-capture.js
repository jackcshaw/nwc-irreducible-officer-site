/* Frame capture: motion figure 1 of 8. Built to storyboard.md (revised after
   figure cold read 1). Grey is what the AI supplied, red is what a student
   decided, navy is ink. The world is two panels wide: the student's side
   (x 0-960) and the faculty side (x 960-1920); the view pans across in beat 7.
   Every attribute is a pure function of t, so the runtime can play, scrub,
   hold (?t=) and export it frame by frame. */
(() => {
	const {mount, E, mix, prog, spring, el, set, mixColor, bracketPath, pathAt, legibility, FONT} = MotionFigures;
	const C = {paper: '#f6f1e8', bright: '#fffdfa', ink: '#0a2242', red: '#b81b2b', grey: '#5b564f', band: '#ded5c4'};
	const VW = 960, DX = 960; // DX: where the faculty side starts in the world

	// ---- timeline (absolute seconds, from the storyboard) -------------------
	const T = {
		card: [1.0, 1.6], dotIn: 1.6,
		chips: 7.0, chipStep: 0.45, chipDur: 0.35,
		pulse: [15.0, 15.4], snap: 15.5, tag: [16.2, 16.5],
		travel: [17.7, 18.5], fade: [18.5, 18.9], slide: [18.9, 19.2], deter: [19.2, 19.5],
		heads: [20.8, 21.5],
		labelOut: [24.0, 24.3], enter: [24.0, 24.8],
		push: [25.0, 26.9], write: 27.1, row: 0.25,
		d2: 32.0, chartHop: 34.1, chart: 34.35, conHop: 35.3, con: [35.5, 36.2],
		pull: [39.0, 41.4],
		pan: [46.3, 48.5], centreLabel: [48.3, 48.7], key: [48.8, 49.2], wipe: [50.0, 51.4], bracketsA: [51.6, 52.4],
		toSlot: [52.6, 53.6], slotLabels: [53.4, 53.8],
		dotB: 56.3, chipsB: [56.8, 57.3], aiB: 57.4, aiTagB: [57.7, 58.0], visit: 58.2, visitStep: 0.5, claim: [61.4, 62.0], aside: [62.0, 62.4],
		nameSwap: 56.3, up: [65.7, 66.0], sweep: [66.0, 67.2], labelB: [67.2, 67.5], back: [67.5, 67.8], hideB: [68.0, 68.9],
		ask: [72.5, 73.0], reveal: [75.5, 76.5],
		end: 86.2,
	};

	// ---- geometry: the student's side --------------------------------------
	const F = {x: 140, y: 130, w: 370, h: 280};
	const R0 = {x: 110, y: 104, w: 430, h: 332};
	const COL = [{x: 162, bar: 153}, {x: 330, bar: 321}];
	const ROW0 = 222, DY = 12, RH = 4.5;
	const D1 = [
		{w: [144, 116, 132, 70], off: [0, 5, -3, 8]},
		{w: [150, 124, 154, 88], off: [0, 6, -2, 3]},
	];
	const D2 = [[154, 154, 154, 154, 154, 96], [158, 158, 158, 158, 158, 104]];
	const CHART = {x: 330, step: 19, w: 12, base: 326, h: [20, 13, 28, 17]};
	const CON = {x: 162, y: 342, w: 326, h: 7};
	const rowY = (i) => ROW0 + DY * i;
	const CHIP_H = 30, CHIP_FS = 15, HEAD_S = 0.87, STRIP_S = 0.87;
	const CHIPS = [
		{text: 'Past buildups', x: 24, y: 60, order: 0},
		{text: "Adversary's intent", x: 249, y: 60, order: 2, head: {x: 162, y: 176}, kept: 0},
		{text: 'Room to negotiate', x: 480, y: 60, order: 4},
		{text: "Allies' interests", x: 24, y: 470, order: 1, head: {x: 330, y: 176}, kept: 1},
		{text: 'Domestic politics', x: 250, y: 470, order: 3},
		{text: 'Economic pressure', x: 480, y: 470, order: 5},
	];

	// ---- geometry: the faculty side ------------------------------------------
	// Papers hold the frame's contents (local x 156-492, y 141-350) at 80%.
	const PS = 0.8;
	const PAPER_A = {ox: DX + 48.5, oy: 71};
	const PAPER_B = {ox: DX + 364.5, oy: 71};
	const SHEET = {x: 145, y: 130, w: 358, h: 231};       // paper-local units
	const PB = {x: 139, y: 124, w: 370, h: 243};          // grey brackets around the paper, local
	const STRIP_HIDE = -185;
	const SA = {x: DX + 40, chipX: DX + 68, y: 284};      // strip A (revealed position)
	const SB = {x: DX + 356, chipX: DX + 384, y: 284};    // strip B
	// Centre stage on the faculty side, at full size, for the wipe (beat 7).
	const PAPER_C = {ox: DX + 261, oy: 161};

	const root = document.querySelector('#frame-capture');
	const svg = root.querySelector('svg');
	const defs = el(svg, 'defs');
	el(svg, 'rect', {width: 960, height: 540, fill: C.paper});
	const cam = el(svg, 'g');

	const text = (parent, x, y, str, {fs, family = FONT.sans, weight = 400, fill = C.ink, anchor = 'start', ls = 0, style} = {}) =>
		el(parent, 'text', {x, y, 'font-family': family, 'font-size': fs, 'font-weight': weight, fill, 'text-anchor': anchor, 'letter-spacing': ls, 'data-fs': fs, ...(style ? {'font-style': style} : {})}, str);
	const mono = (parent, x, y, str, opts = {}) => text(parent, x, y, str, {fs: 13, family: FONT.mono, weight: 600, ls: 1.2, ...opts});
	const frameMarks = (parent, r, arm, colour, sw) => ({
		hair: el(parent, 'rect', {x: r.x, y: r.y, width: r.w, height: r.h, fill: 'none', stroke: colour, 'stroke-opacity': 0.4, 'stroke-width': 1}),
		corners: el(parent, 'path', {d: bracketPath(r, arm), fill: 'none', stroke: colour, 'stroke-width': sw, 'stroke-linecap': 'square'}),
	});
	// A consideration chip drawn at its own origin, with three styles: dashed
	// (nobody has examined it), solid ink (a person examined it), grey (the AI's).
	const chip = (parent, str, s = 1) => {
		const g = el(parent, 'g');
		const inner = el(g, 'g', {transform: `scale(${s})`});
		const dashed = el(inner, 'rect', {height: CHIP_H, rx: 3, fill: 'none', stroke: C.ink, 'stroke-opacity': 0.45, 'stroke-width': 1.2, 'stroke-dasharray': '4 3'});
		const solid = el(inner, 'rect', {height: CHIP_H, rx: 3, fill: 'none', stroke: C.ink, 'stroke-opacity': 0.8, 'stroke-width': 1.2, opacity: 0});
		const ai = el(inner, 'rect', {height: CHIP_H, rx: 3, fill: C.band, stroke: C.grey, 'stroke-width': 1.2, opacity: 0});
		const label = el(inner, 'text', {x: 11, y: 20.5, 'font-family': FONT.sans, 'font-size': CHIP_FS, 'font-weight': 600, fill: C.ink, 'data-fs': CHIP_FS * s}, str);
		return {g, dashed, solid, ai, label, s, rects: [dashed, solid, ai]};
	};
	const fitChip = (c) => { const w = c.label.getComputedTextLength() + 22; c.w = w * c.s; c.rects.forEach((r) => set(r, {width: w})); };

	// ---- task card (stays put on screen through the pan) ----------------------
	const card = el(cam, 'g');
	el(card, 'rect', {x: 670, y: 24, width: 276, height: 82, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.15});
	mono(card, 684, 44, 'EXAMPLE TASK');
	const LINES = ['Recommend a response to an', "adversary's military buildup."];
	LINES.forEach((s, i) => text(card, 684, 68 + 22 * i, s, {fs: 16, family: FONT.serif}));

	// ---- the student's side ------------------------------------------------------
	const chips = CHIPS.map((c) => ({...c, ...chip(cam, c.text)}));
	const hair = el(cam, 'rect', {fill: 'none', stroke: C.grey, 'stroke-opacity': 0.4, 'stroke-width': 1});
	const brackets = el(cam, 'path', {fill: 'none', stroke: C.grey, 'stroke-width': 2.6, 'stroke-linecap': 'square'});
	const tag = mono(cam, F.x, 120, "AI'S FRAME", {fill: C.grey});
	const titleBand = el(cam, 'rect', {x: 156, y: 145, height: 22, rx: 2, fill: C.band});
	const TITLE = {x: 162, y: 160, fs: 18};
	const titleLead = text(cam, TITLE.x, TITLE.y, 'Deter the', {fs: TITLE.fs, family: FONT.serif, weight: 600, fill: C.grey});
	const travel = el(cam, 'g');
	const words = [];
	const rows = COL.map(() => D2[0].map(() => el(cam, 'rect', {height: RH, rx: RH / 2, fill: C.ink, 'fill-opacity': 0.85})));
	const chart = CHART.h.map((_, j) => el(cam, 'rect', {x: CHART.x + j * CHART.step, width: CHART.w, fill: C.ink, 'fill-opacity': 0.85}));
	const con = el(cam, 'rect', {x: CON.x, y: CON.y, height: CON.h, rx: 3.5, fill: C.ink});
	const bars = {
		l: el(cam, 'rect', {x: COL[0].bar, y: 218, width: 2.5, fill: C.red}),
		r: el(cam, 'rect', {x: COL[1].bar, y: 218, width: 2.5, fill: C.red}),
		chart: el(cam, 'rect', {x: COL[1].bar, y: 296, width: 2.5, fill: C.red}),
		con: el(cam, 'rect', {x: COL[0].bar, y: 339, width: 2.5, fill: C.red}),
	};
	const draftLabel = mono(cam, 492, 398, "STUDENT'S DRAFT 1", {fill: C.red, anchor: 'end'});
	const dotLabel = text(cam, 80, 294, 'Student', {fs: 13, weight: 600, fill: C.red, anchor: 'middle'});
	const dot = el(cam, 'circle', {r: 5, fill: C.red});

	// ---- the faculty side: labels, strips (behind the papers), papers, question --------
	const deskLabels = el(cam, 'g');
	mono(deskLabels, DX + 40, 34, 'WHAT FACULTY RECEIVE', {ls: 0.6});
	const fromThis = mono(deskLabels, DX + 40, 53, 'FROM THIS STUDENT', {weight: 500, ls: 0.6});
	// Once there are two students, each is named in red, as in the other figures.
	const nameA = text(cam, DX + 40, 53, 'First student', {fs: 13, weight: 600, fill: C.red});
	const labelB = text(cam, DX + 356, 53, 'Second student', {fs: 13, weight: 600, fill: C.red});

	// Strip A: what the first student can show (the AI's two, in the AI's frame).
	// Each strip is clipped to the area below its paper, so it slides out from underneath.
	const underClip = (id, x, w) => el(el(defs, 'clipPath', {id}), 'rect', {x, y: 250, width: w, height: 300});
	underClip('fc-under-a', DX + 20, 330);
	underClip('fc-under-b', DX + 336, 330);
	const stripA = el(el(cam, 'g', {'clip-path': 'url(#fc-under-a)'}), 'g');
	mono(stripA, SA.x, 268, "AI'S FRAME", {fill: C.grey});
	frameMarks(stripA, {x: SA.x, y: 274, w: 300, h: 46}, 12, C.grey, 2.2);
	el(stripA, 'circle', {cx: SA.x + 14, cy: 297, r: 5, fill: C.red});
	const stripAChips = CHIPS.filter((c) => c.head).map((c) => ({...c, ...chip(stripA, c.text, STRIP_S)}));

	// Strip B: the second student's weighing, later what they can show.
	const stripB = el(el(cam, 'g', {'clip-path': 'url(#fc-under-b)'}), 'g');
	const aiTagB = mono(stripB, SB.x, 268, "AI'S FRAME", {fill: C.grey});
	const chosenTag = mono(stripB, SB.x, 268, 'CHOSEN', {fill: C.red});
	const chosenMarks = frameMarks(stripB, {x: SB.x, y: 274, w: 300, h: 46}, 12, C.grey, 2.2);
	const asideLabel = mono(stripB, SB.chipX, 408, 'SET ASIDE', {fill: C.red});
	const stripBDot = el(stripB, 'circle', {cx: SB.x + 14, cy: 297, r: 5, fill: C.red});
	const stripBChips = CHIPS.map((c) => ({...c, ...chip(stripB, c.text, STRIP_S)}));
	stripBChips.forEach((c) => { c.touch = el(c.g, 'circle', {cx: -3, cy: -3, r: 2.6, fill: C.red}); });

	// Papers: the frame's contents, placed by a transform.
	const PT = {x: 162, y: 162, fs: 21}, PH_FS = 16.3;
	const paperBody = (g) => {
		el(g, 'rect', {x: SHEET.x + 3, y: SHEET.y + 4, width: SHEET.w, height: SHEET.h, fill: C.ink, 'fill-opacity': 0.06});
		el(g, 'rect', {x: SHEET.x, y: SHEET.y, width: SHEET.w, height: SHEET.h, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.18, 'stroke-width': 1.2});
		COL.forEach((c, ci) => D2[ci].forEach((w, i) => el(g, 'rect', {x: c.x, y: rowY(i), width: w, height: RH + 0.5, rx: 2.5, fill: C.ink, 'fill-opacity': 0.85})));
		CHART.h.forEach((h, j) => el(g, 'rect', {x: CHART.x + j * CHART.step, y: CHART.base - h, width: CHART.w, height: h, fill: C.ink, 'fill-opacity': 0.85}));
		el(g, 'rect', {x: CON.x, y: CON.y, width: CON.w, height: CON.h + 1, rx: 4, fill: C.ink});
	};
	// Title and headings in the AI's grey (on bands) or in ink. The words always stay.
	const paperHeads = (g, ai) => {
		const out = {};
		if (ai) out.band = el(g, 'rect', {x: PT.x - 6, y: PT.y - 20, height: 27, rx: 2, fill: C.band});
		out.title = el(g, 'text', {x: PT.x, y: PT.y, 'font-family': FONT.serif, 'font-size': PT.fs, 'font-weight': 600, fill: ai ? C.grey : C.ink, 'data-fs': PT.fs * PS}, 'Deter the adversary');
		out.heads = CHIPS.filter((c) => c.head).map((c) => ({
			r: el(g, 'rect', {x: c.head.x, y: c.head.y, height: 25.5, rx: 3, fill: ai ? C.band : 'none', stroke: ai ? C.grey : C.ink, 'stroke-opacity': ai ? 1 : 0.7, 'stroke-width': 1.3}),
			tx: el(g, 'text', {x: c.head.x + 8, y: c.head.y + 18, 'font-family': FONT.sans, 'font-size': PH_FS, 'font-weight': 600, fill: ai ? C.grey : C.ink, 'data-fs': PH_FS * PS}, c.text),
		}));
		return out;
	};
	const clipRect = (id) => el(el(defs, 'clipPath', {id}), 'rect', {x: SHEET.x - 8, y: SHEET.y - 8, width: 0, height: SHEET.h + 16});

	// Paper A travels from the frame to the faculty side; the wipe drains its grey.
	const paperA = el(cam, 'g');
	paperBody(paperA);
	const inkClip = clipRect('fc-ink');
	const greyClip = clipRect('fc-grey');
	const greyHeads = paperHeads(el(paperA, 'g', {'clip-path': 'url(#fc-grey)'}), true);
	const inkHeads = paperHeads(el(paperA, 'g', {'clip-path': 'url(#fc-ink)'}), false);
	const wipeLine = el(paperA, 'line', {y1: SHEET.y - 4, y2: SHEET.y + SHEET.h + 4, stroke: C.ink, 'stroke-width': 2.5});
	const pBrackets = frameMarks(paperA, PB, 22, C.grey, 3);

	// Paper B is written by the second student: revealed top to bottom.
	const revealClip = clipRect('fc-reveal');
	set(revealClip, {width: SHEET.w + 16});
	const paperB = el(cam, 'g', {transform: `translate(${PAPER_B.ox} ${PAPER_B.oy}) scale(${PS}) translate(-156 -141)`});
	const paperBInner = el(paperB, 'g', {'clip-path': 'url(#fc-reveal)'});
	paperBody(paperBInner);
	const inkHeadsB = paperHeads(paperBInner, false);

	// Centre stage for the wipe: a label for the copy and a key for the tint.
	const centreLabel = mono(cam, DX + 250, 140, 'WHAT FACULTY RECEIVE: THE FINAL COPY', {ls: 0.6});
	const key = el(cam, 'g');
	el(key, 'rect', {x: DX + 622, y: 168, width: 18, height: 12, rx: 2, fill: C.band, stroke: C.grey, 'stroke-width': 1});
	mono(key, DX + 646, 179, 'AI-SUPPLIED', {fill: C.grey});
	el(key, 'path', {d: `M${DX + 618} 174H${DX + 600}`, stroke: C.grey, 'stroke-width': 1.2});

	const ask = el(cam, 'g');
	mono(ask, DX + 670, 150, 'FACULTY ASK EACH STUDENT', {ls: 0.6});
	text(ask, DX + 670, 184, 'Why this frame?', {fs: 24, family: FONT.serif, style: 'italic'});

	const dotB = el(cam, 'circle', {r: 5, fill: C.red});
	const dotBLabel = text(cam, DX + 500, 462, 'Second student', {fs: 13, weight: 600, fill: C.red, anchor: 'middle'});

	// ---- paths ---------------------------------------------------------------------------
	const START = {x: 80, y: 270};
	const segs = [[T.enter[0], T.enter[1], START, {x: COL[0].x, y: rowY(0) + 2.25}, E.inOut]];
	let k = 0;
	COL.forEach((c, ci) => D1[ci].w.forEach((w, i) => {
		const t0 = T.write + T.row * k++;
		const y = rowY(i) + 2.25, x = c.x + D1[ci].off[i];
		segs.push([t0, t0 + T.row, {x, y}, {x: x + w, y}]);
	}));
	const m = (c) => c.bar + 1.25;
	const endD1 = {x: COL[1].x + D1[1].off[3] + D1[1].w[3], y: rowY(3) + 2.25};
	const d2 = T.d2;
	segs.push([d2, d2 + 0.1, endD1, {x: m(COL[0]), y: 218}, E.inOut], [d2 + 0.1, d2 + 0.8, {x: m(COL[0]), y: 218}, {x: m(COL[0]), y: 287}]);
	segs.push([d2 + 0.8, d2 + 0.9, {x: m(COL[0]), y: 287}, {x: m(COL[1]), y: 218}, E.inOut], [d2 + 0.9, d2 + 1.6, {x: m(COL[1]), y: 218}, {x: m(COL[1]), y: 287}]);
	const ch = T.chartHop, cEnd = {x: CHART.x + 3 * CHART.step + CHART.w, y: CHART.base};
	segs.push([ch, ch + 0.1, {x: m(COL[1]), y: 287}, {x: m(COL[1]), y: 296}, E.inOut], [ch + 0.1, ch + 0.25, {x: m(COL[1]), y: 296}, {x: m(COL[1]), y: 328}]);
	segs.push([T.chart, T.chart + 0.65, {x: CHART.x, y: CHART.base}, cEnd]);
	const cn = T.conHop;
	segs.push([cn, cn + 0.1, cEnd, {x: m(COL[0]), y: 339}, E.inOut], [cn + 0.1, cn + 0.2, {x: m(COL[0]), y: 339}, {x: m(COL[0]), y: 352}]);
	segs.push([T.con[0], T.con[1], {x: CON.x, y: CON.y + 3.5}, {x: CON.x + CON.w, y: CON.y + 3.5}, E.outCubic]);
	const dotAt = pathAt(segs, START);

	// The second student: visit each grid slot, into the chosen frame, then write.
	const B_START = {x: DX + 500, y: 440};
	const bSegs = [];
	const IN_CHOSEN = {x: SB.x + 14, y: 297};
	const buildBPath = () => {
		let prev = B_START;
		stripBChips.slice().sort((a, b) => a.visit - b.visit).forEach((c) => {
			const t0 = T.visit + T.visitStep * c.visit;
			const pt = {x: c.final.x - 7, y: c.final.y + 12};
			bSegs.push([t0, t0 + 0.3, prev, pt, E.inOut]);
			prev = pt;
		});
		bSegs.push([T.claim[0], T.claim[0] + 0.3, prev, IN_CHOSEN, E.inOut]);
	const front = (kk) => PAPER_B.oy + (SHEET.y - 141 + SHEET.h * kk) * PS; // world y of paper B's reveal edge
	const penX = PAPER_B.ox + (SHEET.x - 156) * PS - 4;
	bSegs.push([T.up[0], T.up[1], IN_CHOSEN, {x: penX, y: front(0) + 6}, E.inOut]);
	bSegs.push([T.sweep[0], T.sweep[1], {x: penX, y: front(0) + 6}, {x: penX, y: front(1) - 6}]);
	bSegs.push([T.back[0], T.back[1], {x: penX, y: front(1) - 6}, IN_CHOSEN, E.inOut]);
	};
	let dotBAt = () => B_START;

	const writeStart = (ci, i) => T.write + T.row * (ci * 4 + i);
	const d2Start = (ci) => T.d2 + ci * 0.8;
	const straighten = (t, ci, i) => {
		const s = d2Start(ci) + 0.1 + 0.7 * ((rowY(i) - 218) / 69) - 0.05;
		return prog(t, s, s + 0.3, E.outCubic);
	};

	let ready = false;
	function measure() {
		// Word offsets for the travelling copy, set in the title's face so "adversary"
		// lands exactly where the title needs it (no crossfade, no double image).
		const probe = el(travel, 'text', {'font-family': FONT.serif, 'font-size': TITLE.fs, 'font-weight': 600});
		LINES.forEach((line, li) => {
			probe.textContent = line;
			let idx = 0;
			line.split(' ').forEach((p) => {
				const pieces = p === "adversary's" ? [['adversary', true], ["'s", false]] : [[p, false]];
				pieces.forEach(([str, keep]) => {
					const x = idx ? probe.getSubStringLength(0, idx) : 0;
					const node = el(travel, 'text', {'font-family': FONT.serif, 'font-size': TITLE.fs, 'font-weight': 600, fill: C.grey, 'data-fs': TITLE.fs, opacity: 0}, str);
					words.push({node, line: li, x, keep});
					idx += str.length;
				});
				idx += 1;
			});
		});
		probe.textContent = 'Deter the adversary';
		const leadW = probe.getSubStringLength(0, 'Deter the '.length);
		const fullW = probe.getComputedTextLength();
		probe.remove();
		words.forEach((w) => { if (w.keep) w.finalX = TITLE.x + leadW; });
		set(titleBand, {width: fullW + 12});
		[...chips, ...stripAChips, ...stripBChips].forEach(fitChip);
		set(greyHeads.band, {width: greyHeads.title.getComputedTextLength() + 12});
		[greyHeads, inkHeads, inkHeadsB].forEach((h) => h.heads.forEach(({r, tx}) => set(r, {width: tx.getComputedTextLength() + 16})));
		// Strip layouts that depend on measured widths.
		const [a0, a1] = stripAChips;
		set(a0.g, {transform: `translate(${SA.chipX} ${SA.y})`});
		set(a1.g, {transform: `translate(${SA.chipX + a0.w + 8} ${SA.y})`});
		[a0, a1].forEach((c) => { set(c.ai, {opacity: 1}); set(c.dashed, {opacity: 0}); set(c.label, {fill: C.grey}); });
		const kept = stripBChips.filter((c) => c.kept != null).sort((x, y) => x.kept - y.kept);
		const aside = stripBChips.filter((c) => c.kept == null);
		const asideW = Math.max(...aside.map((c) => c.w));
		kept[0].final = {x: SB.chipX, y: SB.y};
		kept[1].final = {x: SB.chipX + kept[0].w + 8, y: SB.y};
		aside.forEach((c, i) => { c.final = {x: SB.chipX + (i % 2) * (asideW + 8), y: 334 + Math.floor(i / 2) * 32}; c.visit = i; });
		kept.forEach((c, i) => { c.visit = aside.length + i; });
		stripBChips.forEach((c) => set(c.g, {transform: `translate(${c.final.x} ${c.final.y})`}));
		buildBPath();
		dotBAt = pathAt(bSegs, B_START);
		ready = true;
	}

	const render = (t) => {
		// Camera: in (beat 4), out (beat 6), across to the faculty side (beat 7).
		const z = prog(t, ...T.push, E.inOutStrong) - prog(t, ...T.pull, E.inOutStrong);
		const pan = prog(t, ...T.pan, E.inOutStrong);
		const s = 1 + 0.6 * z, cx = mix(480, 325, z) + DX * pan;
		set(cam, {transform: `translate(480 270) scale(${s.toFixed(4)}) translate(${(-cx).toFixed(2)} -270)`});

		// Beat 1.
		const ck = prog(t, ...T.card, E.house);
		set(card, {opacity: ck, transform: `translate(${(DX * pan).toFixed(2)} ${mix(6, 0, ck).toFixed(2)})`});
		const grow = spring(t, T.dotIn, {stiffness: 300, damping: 20});
		const pulse = Math.sin(Math.PI * prog(t, ...T.pulse)) * 2.5;
		const p = dotAt(t);
		set(dot, {cx: p.x, cy: p.y, r: Math.max(0, 5 * grow + pulse)});
		set(dotLabel, {opacity: prog(t, T.dotIn, T.dotIn + 0.4) * (1 - prog(t, ...T.labelOut))});

		// Beats 2-3: considerations; two become the AI's headings.
		const hk = prog(t, ...T.heads, E.inOut);
		chips.forEach((c) => {
			const t0 = T.chips + T.chipStep * c.order;
			const a = prog(t, t0, t0 + T.chipDur, E.house);
			let x = c.x, y = c.y + mix(6, 0, a), sc = 1, ai = 0;
			if (c.head) { x = mix(c.x, c.head.x, hk); y = mix(y, c.head.y, hk); sc = mix(1, HEAD_S, hk); ai = hk; }
			set(c.g, {opacity: a, transform: `translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${sc.toFixed(4)})`});
			set(c.dashed, {opacity: 1 - ai});
			set(c.ai, {opacity: ai});
			set(c.label, {fill: mixColor(C.ink, C.grey, ai)});
		});

		// Beat 3: the AI's frame, its tag, and the narrowing.
		const snap = spring(t, T.snap, {stiffness: 420, damping: 24});
		const r = {x: mix(R0.x, F.x, snap), y: mix(R0.y, F.y, snap), w: mix(R0.w, F.w, snap), h: mix(R0.h, F.h, snap)};
		const fo = prog(t, T.snap, T.snap + 0.06);
		set(brackets, {d: bracketPath(r, 24), opacity: fo});
		set(hair, {x: r.x, y: r.y, width: r.w, height: r.h, opacity: fo});
		set(tag, {opacity: prog(t, ...T.tag)});
		if (ready) {
			const tv = prog(t, ...T.travel, E.inOut);
			const on = prog(t, T.travel[0], T.travel[0] + 0.15);
			const ox = mix(684, TITLE.x, tv), oy = mix(68, 152, tv);
			const fade = prog(t, ...T.fade), slide = prog(t, ...T.slide, E.inOut);
			words.forEach((w) => {
				let x = ox + w.x, y = oy + 22 * w.line, o = on;
				if (w.keep) { x = mix(x, w.finalX, slide); y = mix(y, TITLE.y, slide); }
				else o *= 1 - fade;
				set(w.node, {x, y, opacity: o});
			});
		}
		const dk = prog(t, ...T.deter);
		set(titleLead, {opacity: dk});
		set(titleBand, {opacity: dk});

		// Beats 4-5: the first student's drafts.
		COL.forEach((c, ci) => rows[ci].forEach((node, i) => {
			const st = straighten(t, ci, i);
			const w1 = i < 4 ? D1[ci].w[i] * prog(t, writeStart(ci, i), writeStart(ci, i) + T.row) : 0;
			const x1 = i < 4 ? c.x + D1[ci].off[i] : c.x;
			set(node, {x: mix(x1, c.x, st), y: rowY(i), width: Math.max(0, mix(w1, D2[ci][i], st))});
		}));
		set(bars.l, {height: 69 * prog(t, d2Start(0) + 0.1, d2Start(0) + 0.8)});
		set(bars.r, {height: 69 * prog(t, d2Start(1) + 0.1, d2Start(1) + 0.8)});
		set(bars.chart, {height: 32 * prog(t, T.chartHop + 0.1, T.chartHop + 0.25)});
		set(bars.con, {height: 13 * prog(t, T.conHop + 0.1, T.conHop + 0.2)});
		chart.forEach((node, j) => {
			const h = CHART.h[j] * prog(t, T.chart + 0.16 * j, T.chart + 0.16 * j + 0.2, E.outCubic);
			set(node, {y: CHART.base - h, height: h});
		});
		set(con, {width: CON.w * prog(t, ...T.con, E.outCubic)});
		draftLabel.textContent = `STUDENT'S DRAFT ${t < T.d2 ? 1 : t < T.chartHop ? 2 : 3}`;
		set(draftLabel, {opacity: prog(t, T.write, T.write + 0.3)});

		// Beat 7: paper A travels with the pan, then the wipe, then the brackets go.
		const slot = prog(t, ...T.toSlot, E.inOut);
		const ps = mix(1, PS, slot), pox = mix(mix(156, PAPER_C.ox, pan), PAPER_A.ox, slot), poy = mix(mix(141, PAPER_C.oy, pan), PAPER_A.oy, slot);
		set(paperA, {opacity: prog(t, T.pan[0], T.pan[0] + 0.3), transform: `translate(${pox.toFixed(2)} ${poy.toFixed(2)}) scale(${ps.toFixed(4)}) translate(-156 -141)`});
		const wk = prog(t, ...T.wipe, E.inOut);
		const wx = SHEET.x - 8 + (SHEET.w + 16) * wk;
		set(inkClip, {width: (SHEET.w + 16) * wk});
		set(greyClip, {x: wx, width: (SHEET.w + 16) * (1 - wk)});
		set(wipeLine, {x1: wx, x2: wx, opacity: wk > 0 && wk < 1 ? 1 : 0});
		const bo = 1 - prog(t, ...T.bracketsA);
		set(pBrackets.hair, {opacity: bo});
		set(pBrackets.corners, {opacity: bo});
		set(centreLabel, {opacity: prog(t, ...T.centreLabel) * (1 - prog(t, T.toSlot[0], T.toSlot[0] + 0.3))});
		set(key, {opacity: prog(t, ...T.key) * bo});

		// Beats 8-10: the second student, paper B, and what each can show.
		const reveal = prog(t, ...T.reveal, E.inOut);
		set(stripA, {opacity: t >= T.toSlot[1] ? 1 : 0, transform: `translate(0 ${(STRIP_HIDE * (1 - reveal)).toFixed(2)})`});
		const hideB = prog(t, ...T.hideB, E.inOut);
		set(stripB, {transform: `translate(0 ${(STRIP_HIDE * hideB * (1 - reveal)).toFixed(2)})`});
		// Beat 8: the AI proposes the same frame to the second student, who
		// examines all six (each turns solid), then claims the frame (grey to red).
		const chipsIn = prog(t, ...T.chipsB, E.house);
		if (ready) stripBChips.forEach((c) => {
			const t0 = T.visit + T.visitStep * c.visit;
			const touched = prog(t, t0 + 0.3, t0 + 0.5);
			const isKept = c.kept != null;
			set(c.g, {opacity: chipsIn});
			set(c.dashed, {opacity: isKept ? 0 : 1 - touched});
			set(c.ai, {opacity: isKept ? 1 - touched : 0});
			set(c.solid, {opacity: touched});
			set(c.label, {fill: isKept ? mixColor(C.grey, C.ink, touched) : C.ink});
			set(c.touch, {opacity: touched});
		});
		const aiB = spring(t, T.aiB, {stiffness: 420, damping: 24});
		const co = prog(t, T.aiB, T.aiB + 0.06);
		const claim = prog(t, T.claim[0], T.claim[0] + 0.4);
		const fc = mixColor(C.grey, C.red, claim);
		const cr = {x: mix(SB.x - 14, SB.x, aiB), y: mix(262, 274, aiB), w: mix(328, 300, aiB), h: mix(70, 46, aiB)};
		set(chosenMarks.corners, {d: bracketPath(cr, 12), opacity: co, stroke: fc});
		set(chosenMarks.hair, {x: cr.x, y: cr.y, width: cr.w, height: cr.h, opacity: co, stroke: fc});
		set(aiTagB, {opacity: prog(t, ...T.aiTagB) * (1 - claim)});
		set(chosenTag, {opacity: claim});
		set(asideLabel, {opacity: prog(t, ...T.aside)});

		const bIn = spring(t, T.dotB, {stiffness: 300, damping: 20});
		const inStrip = t >= T.back[1];
		const pb = dotBAt(t);
		set(dotB, {cx: pb.x, cy: pb.y, r: Math.max(0, 5 * bIn), opacity: inStrip ? 0 : 1});
		set(stripBDot, {opacity: inStrip ? 1 : 0});
		set(dotBLabel, {opacity: prog(t, T.dotB, T.dotB + 0.4) * (1 - prog(t, T.visit, T.visit + 0.3))});
		set(revealClip, {y: SHEET.y - 8, height: (SHEET.h + 16) * prog(t, ...T.sweep)});
		set(labelB, {opacity: prog(t, ...T.labelB)});

		set(deskLabels, {opacity: prog(t, ...T.slotLabels)});
		set(fromThis, {opacity: 1 - prog(t, T.nameSwap, T.nameSwap + 0.25)});
		set(nameA, {opacity: prog(t, T.nameSwap + 0.25, T.nameSwap + 0.5)});
		const ak = prog(t, ...T.ask, E.house);
		set(ask, {opacity: ak, transform: `translate(0 ${mix(6, 0, ak).toFixed(2)})`});
	};

	const BEATS = [
		{at: 0, text: 'A student gets an open strategy task.',
			detail: 'a task card appears at the top right: "Example task: Recommend a response to an adversary\'s military buildup." A red dot labelled Student appears on the left.'},
		{at: 6.0, text: 'Many things could matter. Framing means picking which ones define the problem.',
			detail: "six considerations appear one at a time in dashed outline, three above an open space and three below: past buildups, allies' interests, adversary's intent, domestic politics, room to negotiate, and economic pressure."},
		{at: 14.0, text: 'The student asks an AI. It proposes a reasonable, narrower frame.',
			detail: 'the dot pulses. Grey corner brackets labelled "AI\'s frame" snap around the open space beside the student. A grey copy of the task sentence moves into the frame; every word fades except "adversary", and "Deter the" appears in front of it. Adversary\'s intent and allies\' interests slide inside as grey headings.'},
		{at: 23.0, text: "The student takes up the frame. Up close, it's all they see.",
			detail: "the dot steps into the frame. The view moves in until the frame fills it, and the dot writes a rough first draft in two columns under the AI's headings."},
		{at: 31.0, text: 'The student revises twice, adding evidence and a firmer conclusion.',
			detail: "the dot straightens the rows, then adds a chart and a conclusion across both columns. Red change bars mark each revision. The red label reads Student's draft 3."},
		{at: 38.0, text: "Step back with us: every revision stayed inside the AI's frame.",
			detail: 'the view pulls back to the whole picture while the dot stays where it is. The four dashed considerations sit where they were. Every red mark is inside the grey brackets.'},
		{at: 45.3, text: 'Faculty receive the final copy. Nothing in it shows the frame came from the AI.',
			detail: 'a clean final copy of the paper travels to the faculty side and stops in the middle, large, labelled "What faculty receive: the final copy". It is still inside grey brackets, and a key marks its tinted title and headings as "AI-supplied". A wipe crosses it, and the title and headings turn the same ink as the rest, keeping their words. The brackets and the key fade, and the paper moves to the top left, labelled "From this student".'},
		{at: 55.3, text: 'A second student, also working with AI, weighs all six and chooses this frame.',
			detail: 'the label over the first paper becomes "First student". A second red dot labelled Second student appears. Its AI proposes the same frame: grey brackets tagged "AI\'s frame" around adversary\'s intent and allies\' interests, with the other four outside. The dot touches each of the six in turn, and each turns solid. Then the brackets turn red and the tag reads "Chosen"; the other four go under "Set aside".'},
		{at: 64.7, text: "That student writes the same paper; the weighing doesn't show.",
			detail: 'the second dot writes a paper identical to the first, labelled "Second student". Then the weighing slides up behind the paper and is hidden.'},
		{at: 71.5, text: 'Ask each student why this frame. One can show what they weighed.',
			detail: '"Faculty ask each student: Why this frame?" appears. From behind each paper, what it rests on slides into view. Under the first is only the AI\'s grey frame around its two considerations, with the first student inside. Under the second is the same frame in red, chosen, with the four set aside below.'},
		{at: 79.5, text: 'Faculty check: What problem did the student choose to solve?',
			list: 'Faculty check: What problem did the student choose to solve? Why this frame? What would change it?',
			detail: 'the questions appear under the picture, at the same size. The task card\'s "a response" and the papers\' title, "Deter the adversary", are both in view.',
			check: {label: 'Faculty check', question: 'What problem did the student choose to solve?', follow: 'Why this frame? What would change it?', followAt: 83.1}},
	];

	document.fonts.ready.then(() => {
		measure();
		legibility(root, svg, VW, 11);
		// Poster: the setup settled (task, student, six considerations) before anything goes wrong.
		mount(root, {duration: T.end, render, beats: BEATS, poster: BEATS[2].at - 0.02});
	});
})();
