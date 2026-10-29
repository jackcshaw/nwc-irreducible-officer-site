/* Frame capture: motion figure 1 of 8. Built to storyboard.md (PME) and
   storyboard-business.md. Grey is what the AI supplied, red is what a person
   decided, navy is ink. The world is two panels wide: the person's side
   (x 0-960) and the reviewer's side (x 960-1920); the view pans across in beat 7.
   Every attribute is a pure function of t, so the runtime can play, scrub,
   hold (?t=) and export it frame by frame.

   Editions: every visible word comes from editions/<id>.json (the scenario) and
   ../../casts.json (role words), loaded by MotionFigures.loadEdition (?edition=,
   default PME). This file holds only the core: timeline, layout, motion and the
   universal nameplate. */
(() => {
	const {mount, E, mix, prog, spring, el, set, mixColor, bracketPath, pathAt, legibility, FONT, loadEdition, fillPage} = MotionFigures;
	const C = {paper: '#f6f1e8', bright: '#fffdfa', ink: '#0a2242', red: '#b81b2b', grey: '#5b564f', band: '#ded5c4'};
	const VW = 960, DX = 960; // DX: where the faculty side starts in the world
	// Universal across editions: the failure mode's name, kicker and role-neutral definition.
	const NAMEPLATE = {name: 'Frame capture', kicker: 'Failure mode 1 of 7', definition: 'The first plausible frame becomes the working frame, unexamined.'};

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
		note: [62.5, 63.0], source: [80.5, 81.0], // used only by editions that supply them
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
	// Six consideration slots (core layout); their words come from the edition, in this order.
	const CHIP_SLOTS = [
		{x: 24, y: 60, order: 0},
		{x: 249, y: 60, order: 2, head: {x: 162, y: 176}, kept: 0},
		{x: 480, y: 60, order: 4},
		{x: 24, y: 470, order: 1, head: {x: 330, y: 176}, kept: 1},
		{x: 250, y: 470, order: 3},
		{x: 480, y: 470, order: 5},
	];
	const BEAT_AT = [0, 6.0, 14.0, 23.0, 31.0, 38.0, 45.3, 55.3, 64.7, 71.5, 79.5];
	const FOLLOW_AT = 83.1;

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
	Promise.all([loadEdition(root), document.fonts.ready]).then(([ed]) => { fillPage(document, ed); build(ed); });

	function build(ed) {
	const L = ed.labels, NW = ed.narrow;
	const CHIPS = CHIP_SLOTS.map((c, i) => ({text: ed.considerations[i], ...c}));
	// The AI's restatement: segments kept from the task's words or added; joined with spaces.
	const TITLE_SEGS = [];
	let TITLE_TEXT = '';
	ed.narrowing.title.forEach((sg) => {
		const str = sg.add ?? sg.keep;
		if (TITLE_TEXT && !sg.join) TITLE_TEXT += ' ';
		TITLE_SEGS.push({...sg, str, start: TITLE_TEXT.length});
		TITLE_TEXT += str;
	});
	const KEPT_TEXT = TITLE_SEGS.filter((sg) => sg.keep != null).map((sg) => sg.str).join(' ');
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
	mono(card, 684, 44, ed.task.label);
	const LINES = ed.task.lines;
	LINES.forEach((s, i) => text(card, 684, 68 + 22 * i, s, {fs: 16, family: FONT.serif}));

	// ---- the student's side ------------------------------------------------------
	const chips = CHIPS.map((c) => ({...c, ...chip(cam, c.text)}));
	const hair = el(cam, 'rect', {fill: 'none', stroke: C.grey, 'stroke-opacity': 0.4, 'stroke-width': 1});
	const brackets = el(cam, 'path', {fill: 'none', stroke: C.grey, 'stroke-width': 2.6, 'stroke-linecap': 'square'});
	const tag = mono(cam, F.x, 120, L.aiFrame, {fill: C.grey});
	const titleBand = el(cam, 'rect', {x: 156, y: 145, height: 22, rx: 2, fill: C.band});
	const TITLE = {x: 162, y: 160, fs: 18};
	const titleAdds = TITLE_SEGS.filter((sg) => sg.add != null).map((sg) => ({sg, node: text(cam, TITLE.x, TITLE.y, sg.str, {fs: TITLE.fs, family: FONT.serif, weight: 600, fill: C.grey})}));
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
	const draftLabel = mono(cam, 492, 398, `${L.draft} 1`, {fill: C.red, anchor: 'end'});
	const dotLabel = text(cam, 80, 294, L.person, {fs: 13, weight: 600, fill: C.red, anchor: 'middle'});
	const dot = el(cam, 'circle', {r: 5, fill: C.red});

	// ---- the faculty side: labels, strips (behind the papers), papers, question --------
	const deskLabels = el(cam, 'g');
	mono(deskLabels, DX + 40, 34, L.receive, {ls: 0.6});
	const fromThis = mono(deskLabels, DX + 40, 53, L.fromThis, {weight: 500, ls: 0.6});
	// Once there are two students, each is named in red, as in the other figures.
	const nameA = text(cam, DX + 40, 53, L.first, {fs: 13, weight: 600, fill: C.red});
	const labelB = text(cam, DX + 356, 53, L.second, {fs: 13, weight: 600, fill: C.red});

	// Strip A: what the first student can show (the AI's two, in the AI's frame).
	// Each strip is clipped to the area below its paper, so it slides out from underneath.
	const underClip = (id, x, w) => el(el(defs, 'clipPath', {id}), 'rect', {x, y: 250, width: w, height: 300});
	underClip('fc-under-a', DX + 20, 330);
	underClip('fc-under-b', DX + 336, 330);
	const stripA = el(el(cam, 'g', {'clip-path': 'url(#fc-under-a)'}), 'g');
	mono(stripA, SA.x, 268, L.aiFrame, {fill: C.grey});
	frameMarks(stripA, {x: SA.x, y: 274, w: 300, h: 46}, 12, C.grey, 2.2);
	el(stripA, 'circle', {cx: SA.x + 14, cy: 297, r: 5, fill: C.red});
	const stripAChips = CHIPS.filter((c) => c.head).map((c) => ({...c, ...chip(stripA, c.text, STRIP_S)}));

	// Strip B: the second student's weighing, later what they can show.
	const stripB = el(el(cam, 'g', {'clip-path': 'url(#fc-under-b)'}), 'g');
	const aiTagB = mono(stripB, SB.x, 268, L.aiFrame, {fill: C.grey});
	const chosenTag = mono(stripB, SB.x, 268, L.chosen, {fill: C.red});
	const chosenMarks = frameMarks(stripB, {x: SB.x, y: 274, w: 300, h: 46}, 12, C.grey, 2.2);
	const asideLabel = mono(stripB, SB.chipX, 408, L.setAside, {fill: C.red});
	const stripBDot = el(stripB, 'circle', {cx: SB.x + 14, cy: 297, r: 5, fill: C.red});
	const stripBChips = CHIPS.map((c) => ({...c, ...chip(stripB, c.text, STRIP_S)}));
	stripBChips.forEach((c) => { c.touch = el(c.g, 'circle', {cx: -3, cy: -3, r: 2.6, fill: C.red}); });
	// Optional (business): what the second person wrote would change the frame. It sits
	// under "SET ASIDE", so strip B hides further up to clear it.
	let changeNote = null;
	if (L.changeNote) {
		changeNote = el(stripB, 'g');
		mono(changeNote, SB.chipX, 432, L.changeNote.label, {fill: C.red});
		L.changeNote.lines.forEach((ln, i) => text(changeNote, SB.chipX, 452 + 18 * i, ln, {fs: 15, family: FONT.serif, fill: C.red, style: 'italic'}));
	}
	const STRIP_HIDE_B = changeNote ? -240 : STRIP_HIDE;

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
		out.title = el(g, 'text', {x: PT.x, y: PT.y, 'font-family': FONT.serif, 'font-size': PT.fs, 'font-weight': 600, fill: ai ? C.grey : C.ink, 'data-fs': PT.fs * PS}, TITLE_TEXT);
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
	const centreLabel = mono(cam, DX + 250, 140, L.centre, {ls: 0.6});
	const key = el(cam, 'g');
	el(key, 'rect', {x: DX + 622, y: 168, width: 18, height: 12, rx: 2, fill: C.band, stroke: C.grey, 'stroke-width': 1});
	mono(key, DX + 646, 179, L.key, {fill: C.grey});
	el(key, 'path', {d: `M${DX + 618} 174H${DX + 600}`, stroke: C.grey, 'stroke-width': 1.2});

	const ask = el(cam, 'g');
	mono(ask, DX + 670, 150, L.askEach, {ls: 0.6});
	text(ask, DX + 670, 184, L.askQ, {fs: 24, family: FONT.serif, style: 'italic'});

	// Optional (business): a one-line source under the final frame, on the reviewer's side.
	const sourceLine = L.source ? text(cam, DX + 40, 524, L.source, {fs: 13, family: FONT.serif, style: 'italic', fill: C.ink}) : null;
	// The stacked view has no room under its final beat within the phone budget, so the
	// source sits just under the controls there (outside the fixed-height player).
	const stackedSource = root.querySelector('[data-fc-source]');
	if (stackedSource && NW.source) { stackedSource.textContent = NW.source; stackedSource.hidden = false; }

	const dotB = el(cam, 'circle', {r: 5, fill: C.red});
	const dotBLabel = text(cam, DX + 500, 462, L.second, {fs: 13, weight: 600, fill: C.red, anchor: 'middle'});

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
				const pieces = (ed.narrowing.split && ed.narrowing.split[p] ? ed.narrowing.split[p] : [p]).map((str) => [str, false]);
				pieces.forEach(([str, keep]) => {
					const x = idx ? probe.getSubStringLength(0, idx) : 0;
					const node = el(travel, 'text', {'font-family': FONT.serif, 'font-size': TITLE.fs, 'font-weight': 600, fill: C.grey, 'data-fs': TITLE.fs, opacity: 0}, str);
					words.push({node, line: li, x, keep});
					idx += str.length;
				});
				idx += 1;
			});
		});
		probe.textContent = TITLE_TEXT;
		const at = (i) => (i ? probe.getSubStringLength(0, i) : 0);
		// Each kept segment claims the first unclaimed travelling word with its text.
		TITLE_SEGS.filter((sg) => sg.keep != null).forEach((sg) => {
			const w = words.find((x) => !x.keep && x.node.textContent === sg.str);
			if (w) { w.keep = true; w.finalX = TITLE.x + at(sg.start); }
		});
		titleAdds.forEach(({sg, node}) => { if (sg.start) set(node, {x: TITLE.x + at(sg.start)}); });
		const fullW = probe.getComputedTextLength();
		probe.remove();
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
		titleAdds.forEach(({node}) => set(node, {opacity: dk}));
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
		draftLabel.textContent = `${L.draft} ${t < T.d2 ? 1 : t < T.chartHop ? 2 : 3}`;
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
		set(stripB, {transform: `translate(0 ${(STRIP_HIDE_B * hideB * (1 - reveal)).toFixed(2)})`});
		if (changeNote) set(changeNote, {opacity: prog(t, ...T.note)});
		if (sourceLine) set(sourceLine, {opacity: prog(t, ...T.source)});
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
		renderNarrow(t);
	};

	// ---- the stacked stage ----------------------------------------------------------------
	// Whenever a picture label would render under 11 px, a stacked text view of the same
	// moments replaces the SVG (see index.html), driven by the same clock, at 13–16 px.
	const narrow = root.querySelector('[data-fc-narrow]');
	const h = (tag, cls, parent, txt) => { const n = document.createElement(tag); if (cls) n.className = cls; if (txt != null) n.textContent = txt; parent.append(n); return n; };
	const N = {};
	const section = (k, label, cls) => { const sec = h('div', 'fc-n-sec', narrow); N[k] = {sec}; if (label) N[k].label = h('p', `fc-n-label ${cls || ''}`, sec, label); return sec; };
	const TASK = ed.task.text;
	const KEPT = CHIPS.filter((c) => c.head).map((c) => c.text);
	const ASIDE = CHIPS.filter((c) => !c.head).map((c) => c.text);
	const paperBlock = (parent, who, body = true) => {
		const box = h('div', 'fc-n-paper', parent);
		const w = h('span', 'fc-n-who', box, who);
		const ti = h('p', 'fc-n-ptitle', box);
		const tiSpan = h('span', null, ti, TITLE_TEXT);
		const heads = h('div', 'fc-n-heads', box);
		const hs = KEPT.map((k) => h('span', 'fc-n-head', heads, k));
		if (body) h('p', 'fc-n-body', box, NW.paperBody);
		return {box, who: w, tiSpan, hs};
	};
	if (narrow) {
		{ const sec = section('student'); N.student.who = h('span', 'fc-n-who', sec, L.person); }
		{ const sec = section('task', NW.taskLabel); h('p', 'fc-n-task', sec, TASK); }
		{
			const sec = section('field', NW.fieldLabel);
			const row = h('div', 'fc-n-chips', sec);
			N.field.chips = CHIPS.map((c) => ({c, n: h('span', 'fc-n-chip', row, c.text)}));
			N.field.note = h('p', 'fc-n-small', sec, NW.fieldNote);
		}
		{
			const sec = section('aiFrame', NW.aiFrame, 'is-ai');
			const fr = h('div', 'fc-n-frame', sec);
			N.aiFrame.title = h('p', 'fc-n-title', fr);
			N.aiFrame.titleSpan = h('span', null, N.aiFrame.title, '');
			const row = h('div', 'fc-n-chips', fr);
			N.aiFrame.chips = KEPT.map((k) => h('span', 'fc-n-chip is-ai', row, k));
		}
		{
			const sec = section('draft');
			N.draft.who = h('span', 'fc-n-who', sec, L.person);
			N.draft.lines = [T.write, T.d2, T.chartHop, T.con[0]]
				.map((at, i) => ({n: h('p', `fc-n-line${i ? ' is-rev' : ''}`, sec, NW.draftLines[i]), at}));
			N.draft.label = h('span', 'fc-n-dl', sec, `${L.draft} 1`);
		}
		{
			const sec = section('faculty', NW.receiveFinal);
			N.faculty.paper = paperBlock(sec, NW.fromThis);
			N.faculty.key = h('p', 'fc-n-key', sec);
			h('i', null, N.faculty.key);
			N.faculty.key.append(NW.key);
		}
		{
			const sec = section('second');
			N.second.who = h('span', 'fc-n-who', sec, L.second);
			h('p', 'fc-n-small', sec, NW.proposes);
			N.second.frame = h('div', 'fc-n-frame', sec);
			N.second.tag = h('span', 'fc-n-tag is-ai', N.second.frame, NW.aiFrame);
			const kr = h('div', 'fc-n-chips', N.second.frame);
			N.second.kept = KEPT.map((k) => h('span', 'fc-n-chip is-ai', kr, k));
			N.second.asideTag = h('span', 'fc-n-tag is-red', sec, NW.setAside);
			const ar = h('div', 'fc-n-chips', sec);
			N.second.aside = ASIDE.map((k) => h('span', 'fc-n-chip', ar, k));
			if (NW.changeNote) N.second.note = h('p', 'fc-n-note', sec, NW.changeNote);
		}
		{
			const sec = section('papers', NW.receive);
			const pair = h('div', 'fc-n-pair', sec);
			N.papers.a = paperBlock(pair, L.first, false);
			N.papers.b = paperBlock(pair, L.second, false);
			N.papers.note = h('p', 'fc-n-small', sec, NW.weighingNote);
		}
		{
			const sec = section('ask');
			N.ask.q = h('p', 'fc-n-q', sec, NW.askQ);
			const pair = h('div', 'fc-n-pair', sec);
			const col = (who) => { const c = h('div', null, pair); h('span', 'fc-n-who', c, who); return c; };
			const a = col(L.first);
			h('span', 'fc-n-tag is-ai', a, NW.aiFrame);
			const ar = h('div', 'fc-n-chips', a);
			KEPT.forEach((k) => h('span', 'fc-n-chip is-ai', ar, k));
			const b = col(L.second);
			h('span', 'fc-n-tag is-red', b, NW.chosen);
			const br = h('div', 'fc-n-chips', b);
			KEPT.forEach((k) => h('span', 'fc-n-chip is-seen', br, k));
			h('span', 'fc-n-tag is-red', b, NW.setAside);
			h('p', 'fc-n-aside', b, ASIDE.join(' · '));
			if (NW.changeNote) h('p', 'fc-n-note', b, NW.changeNote);
			N.ask.cols = [a, b];
		}
	}
	const SHOW = [
		['student', 'task'], ['student', 'task', 'field'], ['task', 'field', 'aiFrame'],
		['aiFrame', 'draft'], ['aiFrame', 'draft'], ['field', 'aiFrame', 'draft'],
		['task', 'faculty'], ['faculty', 'second'], ['papers'], ['papers', 'ask'], ['papers', 'ask'],
	];
	const beatIndex = (t) => { let i = 0; BEATS.forEach((b, j) => { if (t >= b.at) i = j; }); return i; };
	const fade = (node, k) => { node.style.opacity = k.toFixed(3); };
	// Grey AI text drains to ink as the wipe crosses (beat 7), keeping its words.
	const drain = (node, k) => { node.style.color = mixColor(C.grey, C.ink, k); node.style.backgroundColor = `rgba(222, 213, 196, ${(1 - k).toFixed(3)})`; };
	function renderNarrow(t) {
		if (!narrow || !root.classList.contains('is-stacked')) return;
		const bi = beatIndex(t);
		const show = new Set(SHOW[bi]);
		for (const [k, v] of Object.entries(N)) v.sec.hidden = !show.has(k);
		fade(N.student.sec, prog(t, T.dotIn, T.dotIn + 0.4));
		fade(N.task.sec, prog(t, ...T.card));
		const hk = prog(t, ...T.heads);
		N.field.chips.forEach(({c, n}) => {
			const t0 = T.chips + T.chipStep * c.order;
			fade(n, prog(t, t0, t0 + T.chipDur));
			n.classList.toggle('is-ai', !!c.head && hk >= 0.5);
		});
		N.field.note.hidden = bi < 5;
		fade(N.field.note, prog(t, ...T.pull));
		// The AI's frame: the task sentence arrives in grey and narrows to "Deter the adversary".
		fade(N.aiFrame.sec, prog(t, T.snap, T.snap + 0.3));
		const ti = N.aiFrame.titleSpan;
		if (t < T.fade[0]) { ti.textContent = TASK; fade(ti, prog(t, ...T.travel)); }
		else if (t < T.deter[0]) { ti.textContent = KEPT_TEXT; fade(ti, 1); }
		else { ti.textContent = TITLE_TEXT; fade(ti, 1); }
		N.aiFrame.title.classList.toggle('is-band', t >= T.deter[0]);
		N.aiFrame.chips.forEach((n) => fade(n, hk));
		N.draft.lines.forEach(({n, at}) => fade(n, prog(t, at, at + 0.4)));
		N.draft.label.textContent = `${L.draft} ${t < T.d2 ? 1 : t < T.chartHop ? 2 : 3}`;
		fade(N.draft.label, prog(t, T.write, T.write + 0.3));
		// What faculty receive: the paper arrives grey and framed, the wipe drains it, the frame goes.
		const fp = N.faculty.paper, wk = prog(t, ...T.wipe), bo = 1 - prog(t, ...T.bracketsA);
		fade(fp.box, prog(t, ...T.pan));
		fp.box.classList.toggle('is-framed', bo > 0.5);
		[fp.tiSpan, ...fp.hs].forEach((n) => drain(n, wk));
		fade(N.faculty.key, prog(t, ...T.key) * bo);
		const named = t >= T.nameSwap + 0.25;
		N.faculty.label.textContent = named ? NW.receive : NW.receiveFinal;
		fp.who.textContent = named ? L.first : NW.fromThis;
		// The second student: the AI proposes the same frame; each consideration is examined; the frame is claimed.
		fade(N.second.sec, prog(t, T.dotB, T.dotB + 0.4));
		const claim = t >= T.claim[0] + 0.2;
		N.second.frame.classList.toggle('is-chosen', claim);
		N.second.tag.textContent = claim ? NW.chosen : NW.aiFrame;
		N.second.tag.classList.toggle('is-ai', !claim);
		N.second.tag.classList.toggle('is-red', claim);
		fade(N.second.frame, prog(t, T.aiB, T.aiB + 0.4));
		const seen = (name) => { const c = stripBChips.find((x) => x.text === name); return c && t >= T.visit + T.visitStep * c.visit + 0.3; };
		N.second.kept.forEach((n, i) => { const v = seen(KEPT[i]); n.classList.toggle('is-ai', !v); n.classList.toggle('is-seen', v); });
		N.second.aside.forEach((n, i) => { fade(n, prog(t, ...T.chipsB)); n.classList.toggle('is-seen', seen(ASIDE[i])); });
		fade(N.second.asideTag, prog(t, ...T.aside));
		if (N.second.note) fade(N.second.note, prog(t, ...T.note));
		// Both papers, then what each student can show when asked.
		fade(N.papers.b.box, prog(t, ...T.sweep));
		N.papers.note.hidden = bi !== 8;
		fade(N.papers.note, prog(t, ...T.hideB));
		fade(N.ask.q, prog(t, ...T.ask));
		N.ask.cols.forEach((c) => fade(c, prog(t, ...T.reveal)));
	}
	// Hold the stacked view at its tallest beat, so the caption band and controls never move.
	let player = null;
	const sizeNarrow = () => {
		if (!narrow || !root.classList.contains('is-stacked')) return;
		narrow.style.minHeight = '';
		let tallest = 0;
		BEATS.forEach((b, i) => { renderNarrow(i < BEATS.length - 1 ? BEATS[i + 1].at - 0.02 : T.end); tallest = Math.max(tallest, narrow.getBoundingClientRect().height); });
		narrow.style.minHeight = `${Math.ceil(tallest)}px`;
		renderNarrow(player ? player.time() : 0);
	};

	// Beat times are core; their words come from the edition.
	const BEATS = BEAT_AT.map((at, i) => ({at, ...ed.beats[i]}));
	BEATS[BEATS.length - 1].check = {...ed.check, followAt: FOLLOW_AT};

	{
		measure();
		legibility(root, svg, VW, 11);
		// The stacked stage takes over whenever the smallest picture text (13 units) would
		// render under 11 px at the runtime's letterboxed scale.
		let lastW = 0;
		const syncStacked = () => {
			const r = svg.getBoundingClientRect();
			if (!r.width) return;
			const scale = r.height ? Math.min(r.width / VW, r.height / 540) : r.width / VW;
			const stacked = 13 * scale < 11;
			if (stacked) root.classList.add('is-narrow');
			const changed = stacked !== root.classList.contains('is-stacked');
			if (changed) root.classList.toggle('is-stacked', stacked);
			if (stacked && (changed || Math.abs(r.width - lastW) > 1)) { lastW = r.width; sizeNarrow(); }
		};
		new ResizeObserver(syncStacked).observe(svg);
		// Poster: the setup settled (task, student, six considerations) before anything goes wrong.
		// Nameplate: the opening name card, the corner plate and the final name and definition.
		player = mount(root, {duration: T.end, render, beats: BEATS, poster: BEATS[2].at - 0.02,
			nameplate: NAMEPLATE});
		syncStacked();
	}
	}
})();
