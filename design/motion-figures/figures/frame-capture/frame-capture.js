/* Frame capture: motion figure 1 of 8. Built to storyboard.md (round 3).
   Grey is what the AI supplied, red is what the student decided, navy is ink.
   Every attribute is a pure function of t (render(t)), so the runtime can
   play, scrub, hold (?t=) and export it frame by frame. */
(() => {
	const {mount, E, mix, prog, spring, el, set, mixColor, bracketPath, pathAt, legibility, FONT} = MotionFigures;
	const C = {paper: '#f6f1e8', bright: '#fffdfa', ink: '#0a2242', red: '#b81b2b', grey: '#5b564f', band: '#ded5c4'};
	const VW = 960;

	// ---- timeline (absolute seconds, from the storyboard) -------------------
	const T = {
		card: [1.0, 1.6], dotIn: 1.6,
		chips: 7.0, chipStep: 0.45, chipDur: 0.35,
		pulse: [15.0, 15.4], snap: 15.5, tag: [16.2, 16.5],
		travel: [17.7, 18.5], fade: [18.5, 18.9], slide: [18.9, 19.2], deter: [19.2, 19.5],
		heads: [19.6, 20.3],
		labelOut: [23.0, 23.3], enter: [23.0, 23.8],
		push: [24.0, 25.9], write: 26.1, row: 0.25,
		d2: [31.0, 31.8], chartBar: [33.2, 33.35], chart: 33.35, conBar: [34.4, 34.5], con: [34.5, 35.2],
		pull: [38.0, 40.4],
		paperA: [45.3, 46.2], wipe: [48.0, 49.2], bracketsA: [49.5, 50.4], labelsA: [50.4, 50.8],
		paperB: [53.3, 54.2],
		end: 74.8,
	};

	// ---- geometry -----------------------------------------------------------
	const F = {x: 140, y: 130, w: 370, h: 280};           // the AI's frame
	const R0 = {x: 110, y: 104, w: 430, h: 332};          // where the brackets start
	const COL = [{x: 162, w: 154, bar: 153}, {x: 330, w: 158, bar: 321}];
	const ROW0 = 222, DY = 12, RH = 4.5;
	const D1 = [
		{w: [144, 116, 132, 70], off: [0, 5, -3, 8]},
		{w: [150, 124, 154, 88], off: [0, 6, -2, 3]},
	];
	const D2 = [[154, 154, 154, 154, 154, 96], [158, 158, 158, 158, 158, 104]];
	const CHART = {x: 330, step: 19, w: 12, base: 326, h: [20, 13, 28, 17]};
	const CON = {x: 162, y: 342, w: 326, h: 7};
	const rowY = (i) => ROW0 + DY * i;

	const CHIPS = [
		{text: 'Past buildups', x: 24, y: 60, order: 0},
		{text: "Adversary's intent", x: 249, y: 60, order: 2, head: {x: 162, y: 176}},
		{text: 'Room to negotiate', x: 480, y: 60, order: 4},
		{text: "Allies' interests", x: 24, y: 470, order: 1, head: {x: 330, y: 176}},
		{text: 'Domestic politics', x: 250, y: 470, order: 3},
		{text: 'Economic pressure', x: 480, y: 470, order: 5},
	];
	const CHIP_H = 30, CHIP_FS = 15, HEAD_S = 0.85;

	// Papers A and B: the frame's contents at 60%.
	const PAPER = {x: 680, y: 158, w: 220, h: 144, s: 0.6, ox: 690, oy: 168, cx: 156, cy: 144};
	const PAPER_B_DY = 176;

	const root = document.querySelector('#frame-capture');
	const svg = root.querySelector('svg');
	const defs = el(svg, 'defs');
	el(svg, 'rect', {width: 960, height: 540, fill: C.paper});
	const cam = el(svg, 'g');

	const text = (parent, x, y, str, {fs, family = FONT.sans, weight = 400, fill = C.ink, anchor = 'start', ls = 0, style} = {}) =>
		el(parent, 'text', {x, y, 'font-family': family, 'font-size': fs, 'font-weight': weight, fill, 'text-anchor': anchor, 'letter-spacing': ls, 'data-fs': fs, ...(style ? {'font-style': style} : {})}, str);
	const mono = (parent, x, y, str, opts = {}) => text(parent, x, y, str, {fs: 12, family: FONT.mono, weight: 600, ls: 1.2, ...opts});

	// ---- task card ------------------------------------------------------------
	const card = el(cam, 'g');
	el(card, 'rect', {x: 670, y: 24, width: 276, height: 82, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.15});
	mono(card, 684, 44, 'EXAMPLE TASK');
	const LINES = ['Recommend a response to an', "adversary's military buildup."];
	const cardLines = LINES.map((s, i) => text(card, 684, 68 + 22 * i, s, {fs: 16, family: FONT.serif}));

	// ---- six considerations ---------------------------------------------------
	const chips = CHIPS.map((c) => {
		const g = el(cam, 'g');
		const dashed = el(g, 'rect', {x: 0, y: 0, height: CHIP_H, rx: 3, fill: 'none', stroke: C.ink, 'stroke-opacity': 0.45, 'stroke-width': 1.2, 'stroke-dasharray': '4 3'});
		const solid = el(g, 'rect', {x: 0, y: 0, height: CHIP_H, rx: 3, fill: C.band, stroke: C.grey, 'stroke-width': 1.2, opacity: 0});
		const label = text(g, 11, 20.5, c.text, {fs: CHIP_FS, weight: 600});
		return {...c, g, dashed, solid, label};
	});

	// ---- the AI's frame ---------------------------------------------------------
	const hair = el(cam, 'rect', {fill: 'none', stroke: C.grey, 'stroke-opacity': 0.4, 'stroke-width': 1});
	const brackets = el(cam, 'path', {fill: 'none', stroke: C.grey, 'stroke-width': 2.6, 'stroke-linecap': 'square'});
	const tag = mono(cam, F.x, 120, "AI'S FRAME", {fill: C.grey});

	// Title: band + "Deter the adversary"; the travelling copy of the task.
	const titleBand = el(cam, 'rect', {x: 156, y: 145, height: 22, rx: 2, fill: C.band});
	const title = text(cam, 162, 160, 'Deter the adversary', {fs: 18, family: FONT.serif, weight: 600, fill: C.grey});
	const travel = el(cam, 'g');
	const words = []; // {node, line, x, keep, poss}

	// ---- the student's draft ---------------------------------------------------
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

	// ---- the student ---------------------------------------------------------------
	const dotLabel = text(cam, 80, 294, 'Student', {fs: 13, weight: 600, fill: C.red, anchor: 'middle'});
	const dot = el(cam, 'circle', {r: 5, fill: C.red});

	// ---- papers ------------------------------------------------------------------------
	// Paper content in frame coordinates, placed by a transform; the title is set a
	// little larger than scale so it stays readable (12.6 units on the stage).
	const paperContent = (parent, ink) => {
		const g = el(parent, 'g', {transform: `translate(${PAPER.ox} ${PAPER.oy}) scale(${PAPER.s}) translate(${-PAPER.cx} ${-PAPER.cy})`});
		const tFill = ink ? C.ink : C.grey;
		if (!ink) el(g, 'rect', {x: 156, y: 141, width: 0, height: 26, rx: 2, fill: C.band, 'data-band': 1});
		const pt = el(g, 'text', {x: 162, y: 161, 'font-family': FONT.serif, 'font-size': 21, 'font-weight': 600, fill: tFill, 'data-fs': 21 * PAPER.s}, 'Deter the adversary');
		CHIPS.forEach((c, i) => {
			if (!c.head) return;
			el(g, 'rect', {x: c.head.x, y: c.head.y, width: 0, height: CHIP_H * HEAD_S, rx: 3, 'data-head': i,
				fill: ink ? 'none' : C.band, stroke: ink ? C.ink : C.grey, 'stroke-opacity': ink ? 0.6 : 1, 'stroke-width': 1.6});
		});
		return {g, title: pt};
	};
	const paperStatic = (parent) => {
		const g = el(parent, 'g', {transform: `translate(${PAPER.ox} ${PAPER.oy}) scale(${PAPER.s}) translate(${-PAPER.cx} ${-PAPER.cy})`});
		COL.forEach((c, ci) => D2[ci].forEach((w, i) => el(g, 'rect', {x: c.x, y: rowY(i), width: w, height: RH + 1, rx: 2.5, fill: C.ink, 'fill-opacity': 0.85})));
		CHART.h.forEach((h, j) => el(g, 'rect', {x: CHART.x + j * CHART.step, y: CHART.base - h, width: CHART.w, height: h, fill: C.ink, 'fill-opacity': 0.85}));
		el(g, 'rect', {x: CON.x, y: CON.y, width: CON.w, height: CON.h + 1, rx: 4, fill: C.ink});
		return g;
	};
	const sheet = (parent, dy) => {
		el(parent, 'rect', {x: PAPER.x + 2, y: PAPER.y + dy + 3, width: PAPER.w, height: PAPER.h, fill: C.ink, 'fill-opacity': 0.06});
		el(parent, 'rect', {x: PAPER.x, y: PAPER.y + dy, width: PAPER.w, height: PAPER.h, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.15});
	};

	const clip = (id) => {
		const cp = el(defs, 'clipPath', {id});
		return el(cp, 'rect', {x: PAPER.x - 4, y: PAPER.y - 4, width: 0, height: PAPER.h + 8});
	};
	const inkClip = clip('fc-ink-clip');
	const greyClip = clip('fc-grey-clip');

	const paperA = el(cam, 'g');
	sheet(paperA, 0);
	paperStatic(paperA);
	const greyWrap = el(paperA, 'g', {'clip-path': 'url(#fc-grey-clip)'});
	const greyLayer = paperContent(greyWrap, false);
	const inkWrap = el(paperA, 'g', {'clip-path': 'url(#fc-ink-clip)'});
	paperContent(inkWrap, true);
	const wipeLine = el(paperA, 'line', {y1: PAPER.y, y2: PAPER.y + PAPER.h, stroke: C.ink, 'stroke-width': 1.5});
	const hairA = el(cam, 'rect', {x: PAPER.x - 6, y: PAPER.y - 6, width: PAPER.w + 12, height: PAPER.h + 12, fill: 'none', stroke: C.grey, 'stroke-opacity': 0.4, 'stroke-width': 1});
	const bracketsA = el(cam, 'path', {d: bracketPath({x: PAPER.x - 6, y: PAPER.y - 6, w: PAPER.w + 12, h: PAPER.h + 12}, 16), fill: 'none', stroke: C.grey, 'stroke-width': 2.2, 'stroke-linecap': 'square'});
	const labelsA = el(cam, 'g');
	mono(labelsA, 680, 132, 'WHAT FACULTY RECEIVE', {ls: 0.6});
	mono(labelsA, 680, 150, 'FROM THIS STUDENT', {weight: 500, ls: 0.6});

	const paperB = el(cam, 'g');
	sheet(paperB, PAPER_B_DY);
	const bInner = el(paperB, 'g', {transform: `translate(0 ${PAPER_B_DY})`});
	paperStatic(bInner);
	paperContent(bInner, true);
	mono(paperB, 680, 326, 'FROM A STUDENT WHO CHOSE THIS FRAME', {weight: 500, ls: 0.6});

	// ---- the dot's path ------------------------------------------------------------------
	const START = {x: 80, y: 270};
	const segs = [[T.enter[0], T.enter[1], START, {x: COL[0].x, y: rowY(0) + 2.25}, E.inOut]];
	let k = 0;
	COL.forEach((c, ci) => D1[ci].w.forEach((w, i) => {
		const t0 = T.write + T.row * k++;
		const y = rowY(i) + 2.25, x = c.x + D1[ci].off[i];
		segs.push([t0, t0 + T.row, {x, y}, {x: x + w, y}]);
	}));
	const endD1 = {x: COL[1].x + D1[1].off[3] + D1[1].w[3], y: rowY(3) + 2.25};
	const m = (c) => c.bar + 1.25;
	segs.push([31.0, 31.1, endD1, {x: m(COL[0]), y: 218}, E.inOut], [31.1, 31.8, {x: m(COL[0]), y: 218}, {x: m(COL[0]), y: 287}]);
	segs.push([31.8, 31.9, {x: m(COL[0]), y: 287}, {x: m(COL[1]), y: 218}, E.inOut], [31.9, 32.6, {x: m(COL[1]), y: 218}, {x: m(COL[1]), y: 287}]);
	segs.push([33.1, 33.2, {x: m(COL[1]), y: 287}, {x: m(COL[1]), y: 296}, E.inOut], [33.2, 33.35, {x: m(COL[1]), y: 296}, {x: m(COL[1]), y: 328}]);
	segs.push([33.35, 34.0, {x: CHART.x, y: CHART.base}, {x: CHART.x + 3 * CHART.step + CHART.w, y: CHART.base}]);
	segs.push([34.3, 34.4, {x: CHART.x + 3 * CHART.step + CHART.w, y: CHART.base}, {x: m(COL[0]), y: 339}, E.inOut], [34.4, 34.5, {x: m(COL[0]), y: 339}, {x: m(COL[0]), y: 352}]);
	segs.push([34.5, 35.2, {x: CON.x, y: CON.y + 3.5}, {x: CON.x + CON.w, y: CON.y + 3.5}, E.outCubic]);
	const dotAt = pathAt(segs, START);

	// Row k of draft 1 is written at T.write + 0.25 k; draft 2 straightens each
	// row as the dot passes it in the margin.
	const writeStart = (ci, i) => T.write + T.row * (ci * 4 + i);
	const d2Start = (ci) => T.d2[0] + ci * 0.8;
	const straighten = (t, ci, i) => {
		const s = d2Start(ci) + 0.1 + 0.7 * ((rowY(i) - 218) / 69) - 0.05;
		return prog(t, s, s + 0.3, E.outCubic);
	};

	let wordsReady = false;
	function buildWords() {
		// Measure each word's offset in the card's two lines, then place a grey copy.
		LINES.forEach((line, li) => {
			const node = cardLines[li];
			const parts = line.split(' ');
			let idx = 0;
			parts.forEach((p) => {
				const pieces = p === "adversary's" ? [['adversary', true, false], ["'s", false, true]] : [[p, false, false]];
				pieces.forEach(([str, keep, poss]) => {
					const x = idx ? node.getSubStringLength(0, idx) : 0;
					const w = el(travel, 'text', {'font-family': FONT.serif, 'font-size': 16, fill: C.grey, 'data-fs': 16}, str);
					words.push({node: w, line: li, x, keep, poss});
					idx += str.length;
				});
				idx += 1; // the space
			});
		});
		const deterW = title.getSubStringLength(0, 'Deter the '.length);
		words.forEach((w) => { if (w.keep) w.finalX = 162 + deterW; });
		set(titleBand, {width: title.getComputedTextLength() + 12});
		const band = greyLayer.g.querySelector('[data-band]');
		set(band, {width: greyLayer.title.getComputedTextLength() + 12});
		chips.forEach((c) => {
			const w = c.label.getComputedTextLength() + 22;
			c.w = w;
			set(c.dashed, {width: w});
			set(c.solid, {width: w});
		});
		svg.querySelectorAll('[data-head]').forEach((r) => set(r, {width: chips[+r.dataset.head].w * HEAD_S}));
		wordsReady = true;
	}

	const render = (t) => {
		// Camera: 1x, in to 1.6x on the frame (beat 4), back out (beat 6).
		const z = prog(t, ...T.push, E.inOutStrong) - prog(t, ...T.pull, E.inOutStrong);
		const s = 1 + 0.6 * z, cx = mix(480, 325, z);
		set(cam, {transform: `translate(480 270) scale(${s.toFixed(4)}) translate(${(-cx).toFixed(2)} -270)`});

		// Beat 1: task card, then the student.
		const ck = prog(t, ...T.card, E.house);
		set(card, {opacity: ck, transform: `translate(0 ${mix(6, 0, ck)})`});
		const grow = spring(t, T.dotIn, {stiffness: 300, damping: 20});
		const pulse = Math.sin(Math.PI * prog(t, ...T.pulse)) * 2.5;
		const p = dotAt(t);
		set(dot, {cx: p.x, cy: p.y, r: Math.max(0, 5 * grow + pulse)});
		set(dotLabel, {opacity: prog(t, T.dotIn, T.dotIn + 0.4) * (1 - prog(t, ...T.labelOut))});

		// Beat 2: six considerations; beat 3: two of them become the AI's headings.
		const hk = prog(t, ...T.heads, E.inOut);
		chips.forEach((c) => {
			const t0 = T.chips + T.chipStep * c.order;
			const a = prog(t, t0, t0 + T.chipDur, E.house);
			let x = c.x, y = c.y + mix(6, 0, a), sc = 1, solid = 0;
			if (c.head) { x = mix(c.x, c.head.x, hk); y = mix(y, c.head.y, hk); sc = mix(1, HEAD_S, hk); solid = hk; }
			set(c.g, {opacity: a, transform: `translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${sc.toFixed(4)})`});
			set(c.dashed, {opacity: 1 - solid});
			set(c.solid, {opacity: solid});
			set(c.label, {fill: mixColor(C.ink, C.grey, solid)});
		});

		// Beat 3: the AI's frame springs tight, then its tag.
		const snap = spring(t, T.snap, {stiffness: 420, damping: 24});
		const r = {x: mix(R0.x, F.x, snap), y: mix(R0.y, F.y, snap), w: mix(R0.w, F.w, snap), h: mix(R0.h, F.h, snap)};
		const fo = prog(t, T.snap, T.snap + 0.06);
		set(brackets, {d: bracketPath(r, 24), opacity: fo});
		set(hair, {x: r.x, y: r.y, width: r.w, height: r.h, opacity: fo});
		set(tag, {opacity: prog(t, ...T.tag)});

		// Beat 3: the task sentence travels into the frame and narrows.
		if (wordsReady) {
			const tv = prog(t, ...T.travel, E.inOut);
			const on = prog(t, T.travel[0], T.travel[0] + 0.15);
			const ox = mix(684, 162, tv), oy = mix(68, 152, tv);
			const fade = prog(t, ...T.fade);
			const slide = prog(t, ...T.slide, E.inOut);
			const deter = prog(t, ...T.deter);
			words.forEach((w) => {
				let x = ox + w.x, y = oy + 22 * w.line, o = on;
				if (w.keep) { x = mix(x, w.finalX, slide); y = mix(y, 160, slide); o *= 1 - deter; }
				else o *= 1 - fade;
				set(w.node, {x, y, opacity: o});
			});
		}
		const dk = prog(t, ...T.deter);
		set(title, {opacity: dk});
		set(titleBand, {opacity: dk});

		// Beat 4: draft 1; beat 5: drafts 2 and 3.
		COL.forEach((c, ci) => rows[ci].forEach((node, i) => {
			const st = straighten(t, ci, i);
			const w1 = i < 4 ? D1[ci].w[i] * prog(t, writeStart(ci, i), writeStart(ci, i) + T.row) : 0;
			const x1 = i < 4 ? c.x + D1[ci].off[i] : c.x;
			set(node, {x: mix(x1, c.x, st), y: rowY(i), width: Math.max(0, mix(w1, D2[ci][i], st))});
		}));
		set(bars.l, {height: 69 * prog(t, d2Start(0) + 0.1, d2Start(0) + 0.8)});
		set(bars.r, {height: 69 * prog(t, d2Start(1) + 0.1, d2Start(1) + 0.8)});
		set(bars.chart, {height: 32 * prog(t, ...T.chartBar)});
		set(bars.con, {height: 13 * prog(t, ...T.conBar)});
		chart.forEach((node, j) => {
			const h = CHART.h[j] * prog(t, T.chart + 0.16 * j, T.chart + 0.16 * j + 0.2, E.outCubic);
			set(node, {y: CHART.base - h, height: h});
		});
		set(con, {width: CON.w * prog(t, ...T.con, E.outCubic)});
		draftLabel.textContent = `STUDENT'S DRAFT ${t < T.d2[0] ? 1 : t < 33.1 ? 2 : 3}`;
		set(draftLabel, {opacity: prog(t, T.write, T.write + 0.3)});

		// Beat 7: paper A arrives grey and framed; the wipe turns it to ink; the frame goes.
		const pa = prog(t, ...T.paperA, E.house);
		set(paperA, {opacity: pa, transform: `translate(0 ${mix(6, 0, pa)})`});
		const wk = prog(t, ...T.wipe, E.inOut);
		const wx = PAPER.x - 4 + (PAPER.w + 8) * wk;
		set(inkClip, {width: (PAPER.w + 8) * wk});
		set(greyClip, {x: wx, width: (PAPER.w + 8) * (1 - wk)});
		set(wipeLine, {x1: wx, x2: wx, opacity: wk > 0 && wk < 1 ? 1 : 0});
		const ba = pa * (1 - prog(t, ...T.bracketsA));
		set(bracketsA, {opacity: ba, transform: `translate(0 ${mix(6, 0, pa)})`});
		set(hairA, {opacity: ba, transform: `translate(0 ${mix(6, 0, pa)})`});
		set(labelsA, {opacity: prog(t, ...T.labelsA)});

		// Beat 8: paper B, identical.
		const pb = prog(t, ...T.paperB, E.house);
		set(paperB, {opacity: pb, transform: `translate(0 ${mix(6, 0, pb)})`});
	};

	const BEATS = [
		{at: 0, text: 'A student gets an open strategy task.',
			detail: 'a task card appears at the top right: "Example task: Recommend a response to an adversary\'s military buildup." A red dot labelled Student appears on the left.'},
		{at: 6.0, text: 'Many things could matter. Framing means picking which ones define the problem.',
			detail: "six considerations appear one at a time in dashed outline, three above an open space and three below: past buildups, allies' interests, adversary's intent, domestic politics, room to negotiate, and economic pressure."},
		{at: 14.0, text: 'The student asks an AI. It proposes a reasonable, narrower frame.',
			detail: 'the dot pulses. Grey corner brackets labelled "AI\'s frame" snap around the open space beside the student. A grey copy of the task sentence moves into the frame; every word fades except "adversary", and "Deter the" appears in front of it. Adversary\'s intent and allies\' interests slide inside as grey headings.'},
		{at: 22.0, text: "The student takes up the frame. Up close, it's all they see.",
			detail: "the dot steps into the frame. The view moves in until the frame fills it, and the dot writes a rough first draft in two columns under the AI's headings."},
		{at: 30.0, text: 'The student revises twice, adding evidence and a firmer conclusion.',
			detail: "the dot straightens the rows, then adds a chart and a conclusion across both columns. Red change bars mark each revision. The red label reads Student's draft 3."},
		{at: 37.0, text: "Step back with us: every revision stayed inside the AI's frame.",
			detail: 'the view pulls back to the whole picture while the dot stays where it is. The four dashed considerations sit where they were. Every red mark is inside the grey brackets.'},
		{at: 44.3, text: "The paper faculty receive doesn't show where the frame came from.",
			detail: 'under the task card, a copy of the paper appears inside grey brackets. A wipe crosses it, and the grey title and headings turn the same ink as the student\'s text. The brackets fade, and the label "What faculty receive: from this student" appears.'},
		{at: 52.3, text: 'Another student weighed all six and chose this frame: same paper.',
			detail: 'a second, identical paper appears below the first, labelled "From a student who chose this frame".'},
		{at: 59.8, text: 'Ask why this frame, or change the case, and they come apart.',
			detail: 'nothing moves. The two papers stay identical.'},
		{at: 67.8, text: 'Faculty check: What problem did the student choose to solve?',
			list: 'Faculty check: What problem did the student choose to solve? Then ask: Why this frame? What would change it?',
			detail: 'the questions appear under the picture. The task card\'s "a response" and the papers\' title, "Deter the adversary", are both in view.',
			check: {label: 'Faculty check', question: 'What problem did the student choose to solve?', followLabel: 'Then ask', follow: 'Why this frame? What would change it?', followAt: 71.4}},
	];

	document.fonts.ready.then(() => {
		buildWords();
		legibility(root, svg, VW, 11);
		mount(root, {duration: T.end, render, beats: BEATS});
	});
})();
