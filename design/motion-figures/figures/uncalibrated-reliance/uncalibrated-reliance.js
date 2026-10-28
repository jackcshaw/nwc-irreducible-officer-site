/* Uncalibrated reliance: motion figure 4 of 8. Built to storyboard.md (round 3,
   revised after storyboard cold read 2).
   Grey is what the AI supplied, red is a student's decision, navy is ink.
   Three columns: the first student's brief, the AI's answers, the second
   student's brief, with Part 1 in the upper row and Part 2 in the lower row.
   Both students check Part 1 the same way; only the second checks Part 2 at its
   source. The frontier, its reason and the study come after both have worked.
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
		card: [1.0, 1.6], p1: [1.8, 2.2], p2: [3.0, 3.4], dotA: [3.6, 4.0],
		reports: 8.7, reportStep: 0.37, reportDur: 0.3, pulseA: [10.2, 10.6], copies: 10.6,
		aiHead: [13.9, 14.3], cards: [14.3, 14.9], line1: [15.0, 15.8], line2: [16.0, 16.8], ready: [18.0, 18.4],
		aLabel: [23.9, 24.2], aOpen1: [24.5, 25.1], aOpen2: [25.5, 26.1], sheetA: [26.3, 27.0], markA1: [27.1, 27.5],
		slideA2: [27.6, 28.2], markA2: [28.2, 28.6], aClose: [29.6, 30.1],
		dotB: [32.6, 33.0], sheetB: [33.0, 33.4], pulseB: [33.5, 33.9], bLabel: [34.0, 34.3], bOpen1: [34.6, 35.2], bOpen2: [35.6, 36.2],
		slideB1: [36.4, 37.1], markB1: [37.2, 37.6], bClose: [37.7, 38.2],
		survey: [41.8, 42.4], surveyClose: [42.4, 42.8], log: [42.8, 43.6], slideB2: [43.7, 44.3],
		strike20: [44.4, 44.7], ins15: [44.7, 45.0], strike4: [45.15, 45.3], ins3: [45.3, 45.6], markB2: [45.7, 46.1],
		pulse1: [50.0, 50.6], pulse2: [50.8, 51.4], capacity: [54.3, 54.8], openToday: [54.9, 55.4], frontier: [55.6, 57.0], fLabels: [57.0, 57.4],
		dim: [60.7, 61.2], panel: [61.2, 61.8], bar1: [64.4, 65.0], bars2: [65.1, 65.7], bracket: [66.0, 66.5], bracketText: [66.5, 66.9],
		undim: [73.0, 73.5], marksOff: [73.6, 74.2], facLabel: [74.2, 74.7], outline: [76.7, 77.2], panels: [77.3, 77.7],
		a1: [77.7, 78.7], b1: [78.9, 79.9], outlineMove: [80.2, 80.7], a2: [80.9, 83.9], b2: [84.2, 86.5],
		check: 88.0, follow: 91.3, end: 94.7,
	};

	// ---- geometry ----------------------------------------------------------
	const COL = {a: 24, ai: 338, b: 652}, COLW = 284;
	const ROW = {p1: 140, p2: 300}, ROWH = 68;
	const LINE = {p1: [182, 200], p2: [342, 360]};
	const REPORTS = [{x: 338, label: 'AID REPORT'}, {x: 486, label: 'AID REPORT'}, {x: 652, label: 'PORT SURVEY'}, {x: 800, label: 'HARBOR LOG'}];
	const RY = 20, RH = 36, RW = 136;
	const HOME = {a: {x: 36, y: 456}, b: {x: 664, y: 456}};
	const READ = REPORTS.map((r) => ({x: r.x - 7, y: 38}));
	const ANS = {p1: ['24 ships a day:', '480 tons at 20 each'], p2: ['20 ships a day:', '4 docks at 5 each']};
	const SPEECH = {
		a: {x: 52, rows: [{n: '1', lines: ['“The aid reports.”'], at: T.a1}, {n: '2', lines: ['“Part 1 checked out, so I', 'trusted the rest.”'], at: T.a2}]},
		b: {x: 680, rows: [{n: '1', lines: ['“The aid reports.”'], at: T.b1}, {n: '2', lines: ['“The harbor log.', 'One dock is closed.”'], at: T.b2}]},
	};
	const FRONTIER = [[330, 252], [344, 243], [356, 259], [371, 246], [380, 262], [398, 240], [414, 266], [432, 249], [446, 256], [460, 238], [475, 268], [494, 250], [508, 245], [521, 261], [538, 253], [552, 239], [566, 264], [584, 248], [598, 257], [612, 242], [630, 253]];

	const root = document.querySelector('#uncalibrated-reliance');
	const svg = root.querySelector('svg');
	const defs = el(svg, 'defs');
	el(svg, 'rect', {width: 960, height: 540, fill: C.paper});
	const scene = el(svg, 'g');
	const layer = el(svg, 'g');

	const text = (parent, x, y, str, {fs, family = FONT.sans, weight = 400, fill = C.ink, anchor = 'start', ls = 0, style} = {}) =>
		el(parent, 'text', {x, y, 'font-family': family, 'font-size': fs, 'font-weight': weight, fill, 'text-anchor': anchor, 'letter-spacing': ls, 'data-fs': fs, ...(style ? {'font-style': style} : {})}, str);
	const mono = (parent, x, y, str, opts = {}) => text(parent, x, y, str, {fs: 12, family: FONT.mono, weight: 600, ls: 1.2, ...opts});
	const serif = (parent, x, y, str, opts = {}) => text(parent, x, y, str, {family: FONT.serif, ...opts});
	let clipN = 0;
	const clip = (parent) => {
		const id = `ur-clip-${clipN++}`;
		const rect = el(el(defs, 'clipPath', {id}), 'rect', {width: 0});
		return {g: el(parent, 'g', {'clip-path': `url(#${id})`}), rect};
	};
	const bump = (t, t0, t1) => Math.sin(Math.PI * prog(t, t0, t1));

	// ---- task card ----------------------------------------------------------
	const card = el(scene, 'g');
	el(card, 'rect', {x: 24, y: 16, width: 284, height: 84, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.15});
	mono(card, 40, 36, 'EXAMPLE TASK');
	const taskP1 = serif(card, 40, 62, 'Part 1 · Ships needed a day', {fs: 15});
	const taskP2 = serif(card, 40, 84, 'Part 2 · Ships the port takes a day', {fs: 15});

	// ---- reports and callouts ------------------------------------------------
	const reports = REPORTS.map((r) => {
		const g = el(scene, 'g');
		const rect = el(g, 'rect', {x: r.x, y: RY, width: RW, height: RH, rx: 3, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.15});
		mono(g, r.x + RW / 2, 42, r.label, {anchor: 'middle'});
		const bars = [el(g, 'rect', {x: r.x + 22, y: 52, width: 92, height: 3, fill: C.ink, 'fill-opacity': 0.7}), el(g, 'rect', {x: r.x + 22, y: 60, width: 64, height: 3, fill: C.ink, 'fill-opacity': 0.7})];
		return {g, rect, bars};
	});
	const callout = (x, lines) => {
		const g = el(scene, 'g');
		el(g, 'path', {d: `M${x + 18} 56V62`, stroke: C.ink, 'stroke-opacity': 0.3});
		el(g, 'rect', {x, y: 62, width: RW, height: 40, rx: 2, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.3});
		const ts = lines.map((s, i) => serif(g, x + 8, 78 + 17 * i, s, {fs: 14}));
		return {g, ts};
	};
	const surveyC = callout(652, ['4 docks,', '5 ships each']);
	const logC = callout(800, ['Dock 2: closed', 'for repairs.']);
	const copies = REPORTS.map(() => el(scene, 'rect', {width: 40, height: 24, rx: 2, fill: C.band, stroke: C.grey, 'stroke-opacity': 0.5, opacity: 0}));

	// ---- a line of the AI's words on its grey band ---------------------------------
	const bandLine = (parent, x, y, str, withClip) => {
		let g = parent, rect = null;
		if (withClip) ({g, rect} = clip(parent));
		const band = el(g, 'rect', {x: x - 2, y: y - 13, height: 17, rx: 2, fill: C.band});
		const t = serif(g, x, y, str, {fs: 16, fill: C.grey});
		return {band, t, rect, x, y, w: 0};
	};

	// ---- the AI's answers ----------------------------------------------------------
	const aiHead = mono(scene, COL.ai, 128, "AI'S ANSWERS", {fill: C.grey});
	const aiCard = (key) => {
		const y = ROW[key];
		const g = el(scene, 'g');
		const rect = el(g, 'rect', {x: COL.ai, y, width: COLW, height: ROWH, rx: 3, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.15});
		mono(g, COL.ai + 14, y + 18, key === 'p1' ? 'PART 1' : 'PART 2', {fill: C.grey});
		const pill = el(g, 'g');
		el(pill, 'rect', {x: COL.ai + COLW - 74, y: y + 7, width: 60, height: 17, rx: 8.5, fill: C.grey});
		mono(pill, COL.ai + COLW - 44, y + 20, 'READY', {anchor: 'middle', fill: C.bright, ls: 1});
		const lines = ANS[key].map((s, i) => bandLine(g, COL.ai + 14, LINE[key][i], s, true));
		return {g, rect, pill, lines, y};
	};
	const ai = {p1: aiCard('p1'), p2: aiCard('p2')};

	// Pattern marks: the AI worked from capacity; the real number depends on what's open today.
	const capLine = el(scene, 'line', {stroke: C.ink, 'stroke-width': 1.6});
	const capTag = mono(scene, 0, 360, 'CAPACITY');
	const openTag = mono(scene, 790, 84, 'OPEN TODAY', {anchor: 'end'});
	const openTick = el(scene, 'path', {d: 'M793 80H800', stroke: C.ink, 'stroke-width': 1.6, fill: 'none'});
	const openLine = el(scene, 'line', {stroke: C.ink, 'stroke-width': 1.6});

	// ---- the frontier ------------------------------------------------------------------
	const frontier = el(scene, 'path', {d: 'M' + FRONTIER.map((p) => p.join(' ')).join('L'), fill: 'none', stroke: C.ink, 'stroke-width': 1.6, 'stroke-linejoin': 'round'});
	const fIn = mono(scene, 480, 228, 'INSIDE THE FRONTIER', {anchor: 'middle'});
	const fOut = mono(scene, 480, 290, 'OUTSIDE THE FRONTIER', {anchor: 'middle'});
	let fLen = 0;

	// ---- briefs ----------------------------------------------------------------------------
	const sheet = (col, label) => {
		const x = COL[col];
		const g = el(scene, 'g');
		el(g, 'rect', {x: x + 3, y: 138, width: COLW, height: 240, fill: C.ink, 'fill-opacity': 0.06});
		el(g, 'rect', {x, y: 134, width: COLW, height: 240, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.18, 'stroke-width': 1.2});
		mono(g, x, 128, label);
		return g;
	};
	const sheetA = sheet('a', "FIRST STUDENT'S BRIEF");
	const sheetB = sheet('b', "SECOND STUDENT'S BRIEF");
	const section = (col, key) => {
		const g = el(scene, 'g');
		const lines = ANS[key].map((s, i) => bandLine(g, COL[col] + 16, LINE[key][i], s, false));
		return {g, lines};
	};
	const secA1 = section('a', 'p1'), secA2 = section('a', 'p2'), secB1 = section('b', 'p1');
	// The second student's Part 2: the AI's words, with two numbers struck and corrected in red.
	const secB2 = (() => {
		const g = el(scene, 'g');
		const mk = (y, segs) => segs.map(([s, kind]) => {
			const band = kind === 'ai' ? el(g, 'rect', {y: y - 13, height: 17, fill: C.band}) : null;
			const t = serif(g, 0, y, s, {fs: 16, fill: kind === 'ai' ? C.grey : C.red});
			return {band, t, kind, w: 0, y};
		});
		return {
			g, x: COL.b + 16,
			l1: mk(LINE.p2[0], [['20', 'ai'], [' 15', 'red'], [' ships a day:', 'ai']]),
			l2: mk(LINE.p2[1], [['4', 'ai'], [' 3 open', 'red'], [' docks at 5 each', 'ai']]),
			s1: el(g, 'line', {stroke: C.red, 'stroke-width': 2}),
			s2: el(g, 'line', {stroke: C.red, 'stroke-width': 2}),
		};
	})();

	// Working marks: what each student did with each part, written by their dot.
	const markEl = (col, key, str) => {
		const right = COL[col] + COLW - 12, y = ROW[key] + 18;
		const c = clip(scene);
		const t = mono(c.g, right, y, str, {anchor: 'end', fill: C.red});
		return {g: c.g, rect: c.rect, t, right, y, w: 0};
	};
	const marks = {
		a1: markEl('a', 'p1', '✓ CHECKED'), a2: markEl('a', 'p2', 'USED AS IS'),
		b1: markEl('b', 'p1', '✓ CHECKED'), b2: markEl('b', 'p2', '✓ CHECKED'),
	};

	// ---- faculty -----------------------------------------------------------------------------
	const facLabel = mono(scene, 480, 412, 'FACULTY SEE ONLY THE BRIEFS', {anchor: 'middle'});
	const outlines = ['a', 'b'].map((c) => el(scene, 'rect', {x: COL[c] + 6, width: COLW - 12, height: 76, rx: 6, fill: 'none', stroke: C.ink, 'stroke-width': 1.5}));
	const speech = (key) => {
		const s = SPEECH[key], x = s.x, w = 256, y0 = 384, y1 = 490, r = 8;
		const g = el(scene, 'g');
		el(g, 'path', {d: `M${x + r} ${y0}H${x + w - r}Q${x + w} ${y0} ${x + w} ${y0 + r}V${y1 - r}Q${x + w} ${y1} ${x + w - r} ${y1}H${x + r}Q${x} ${y1} ${x} ${y1 - r}V462L${x - 8} 456L${x} 449V${y0 + r}Q${x} ${y0} ${x + r} ${y0}Z`,
			fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.25});
		const rows = s.rows.map((row, ri) => {
			const base = ri === 0 ? 408 : 436;
			const num = mono(g, x + 12, base, row.n);
			const words = [];
			row.lines.forEach((ln, li) => {
				const t = serif(g, x + 28, base + 20 * li, '', {fs: 15});
				ln.split(' ').forEach((wd, wi) => words.push(el(t, 'tspan', {'fill-opacity': 0}, (wi ? ' ' : '') + wd)));
			});
			return {num, words, at: row.at};
		});
		return {g, rows};
	};
	const speeches = {a: speech('a'), b: speech('b')};

	// ---- dots ------------------------------------------------------------------------------------
	const dot = (home, label) => {
		const g = el(scene, 'g');
		const ring = el(g, 'circle', {r: 5, fill: 'none', stroke: C.red, 'stroke-width': 1.5, opacity: 0});
		const c = el(g, 'circle', {r: 5, fill: C.red});
		const lab = text(g, home.x + 12, home.y + 4, label, {fs: 13, weight: 600, fill: C.red});
		return {g, ring, c, lab};
	};
	const dotA = dot(HOME.a, 'Student');
	const dotB = dot(HOME.b, 'Second student');
	let pathA = () => HOME.a, pathB = () => HOME.b;

	// ---- the evidence panel (above the dimmed scene) ---------------------------------------
	const panel = el(layer, 'g');
	el(panel, 'rect', {x: 124, y: 145, width: 720, height: 260, fill: C.ink, 'fill-opacity': 0.07});
	el(panel, 'rect', {x: 120, y: 140, width: 720, height: 260, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.18, 'stroke-width': 1.2});
	text(panel, 148, 182, 'Right answers on a task outside the jagged frontier', {fs: 18, weight: 600});
	text(panel, 148, 238, 'Without AI', {fs: 16});
	text(panel, 148, 290, 'With AI', {fs: 16});
	mono(panel, 148, 308, 'TWO GROUPS', {weight: 500});
	const BAR = {x: 300, k: 4, h: 18};
	const bars = [{y: 224, v: 84.5, label: '84.5%'}, {y: 274, v: 60, label: '60%'}, {y: 298, v: 70, label: '70%'}].map((b) => ({
		...b, r: el(panel, 'rect', {x: BAR.x, y: b.y, height: BAR.h, fill: C.ink, 'fill-opacity': 0.85}),
		t: text(panel, BAR.x + b.v * BAR.k + 10, b.y + 14, b.label, {fs: 16, weight: 600}),
	}));
	const bracket = el(panel, 'path', {d: 'M642 274H652V316H642', fill: 'none', stroke: C.ink, 'stroke-width': 1.6});
	const bracketText = el(panel, 'g');
	serif(bracketText, 666, 292, 'Graders rated higher', {fs: 17, style: 'italic'});
	serif(bracketText, 666, 312, 'in quality', {fs: 17, style: 'italic'});
	text(panel, 148, 380, "DELL'ACQUA ET AL. (2023) · BCG CONSULTANTS · HBS WORKING PAPER 24-013", {fs: 12, family: FONT.mono, weight: 500, ls: 1, fill: mixColor(C.ink, C.paper, 0.35)});

	// ---- measure (after fonts load) -------------------------------------------------------
	const W = (node) => node.getComputedTextLength();
	let S = {};
	function measure() {
		for (const l of [...ai.p1.lines, ...ai.p2.lines, ...secA1.lines, ...secA2.lines, ...secB1.lines]) {
			l.w = W(l.t);
			set(l.band, {width: l.w + 4});
			if (l.rect) set(l.rect, {x: l.x - 4, y: l.y - 16, height: 22});
		}
		for (const seg of [...secB2.l1, ...secB2.l2]) seg.w = W(seg.t);
		for (const m of Object.values(marks)) { m.w = W(m.t); set(m.rect, {x: m.right - m.w - 3, y: m.y - 12, height: 16}); }
		const cap = ai.p2.lines[1];
		set(capLine, {x1: cap.x, y1: 364, x2: cap.x, y2: 364});
		set(capTag, {x: cap.x + cap.w + 10});
		S.openW = W(logC.ts[0]);
		set(openLine, {x1: 808, y1: 82, x2: 808, y2: 82});
		fLen = frontier.getTotalLength();
		set(frontier, {'stroke-dasharray': fLen});
		// Dot targets: just left of each mark, then a step clear of it.
		const left = (m, gap = 10) => ({x: m.right - m.w - gap, y: m.y - 4});
		const A1 = left(marks.a1), A2 = left(marks.a2), B1 = left(marks.b1), B2 = left(marks.b2);
		const bx = secB2.x, w20 = secB2.l1[0].w, w15 = secB2.l1[1].w, w4 = secB2.l2[0].w, w3 = secB2.l2[1].w;
		const y1 = LINE.p2[0] - 5, y2 = LINE.p2[1] - 5;
		S.strike = {y1, y2};
		pathA = pathAt([
			[T.aLabel[0], T.aOpen1[0], HOME.a, READ[0], E.inOut],
			[T.aOpen1[1], T.aOpen2[0], READ[0], READ[1], E.inOut],
			[T.sheetA[0], T.sheetA[1], READ[1], A1, E.inOut],
			[T.slideA2[0], T.slideA2[1], A1, A2, E.inOut],
			[T.markA2[1], T.markA2[1] + 0.3, A2, {x: A2.x - 40, y: A2.y}, E.inOut],
			[T.aClose[0], T.aClose[1], {x: A2.x - 40, y: A2.y}, HOME.a, E.inOut],
		], HOME.a);
		pathB = pathAt([
			[T.bLabel[0], T.bOpen1[0], HOME.b, READ[0], E.inOut],
			[T.bOpen1[1], T.bOpen2[0], READ[0], READ[1], E.inOut],
			[T.slideB1[0], T.slideB1[1], READ[1], B1, E.inOut],
			[T.markB1[1], T.markB1[1] + 0.3, B1, {x: B1.x - 40, y: B1.y}, E.inOut],
			[41.3, T.survey[0], {x: B1.x - 40, y: B1.y}, READ[2], E.inOut],
			[T.surveyClose[0], T.surveyClose[1], READ[2], READ[3], E.inOut],
			[T.slideB2[0], T.slideB2[1], READ[3], {x: bx - 6, y: y1}, E.inOut],
			[T.strike20[0], T.strike20[1], {x: bx - 6, y: y1}, {x: bx + w20, y: y1}],
			[T.ins15[0], T.ins15[1], {x: bx + w20, y: y1}, {x: bx + w20 + w15, y: y1}],
			[T.ins15[1], T.strike4[0], {x: bx + w20 + w15, y: y1}, {x: bx - 6, y: y2}, E.inOut],
			[T.strike4[0], T.strike4[1], {x: bx - 6, y: y2}, {x: bx + w4, y: y2}],
			[T.ins3[0], T.ins3[1], {x: bx + w4, y: y2}, {x: bx + w4 + w3, y: y2}],
			[T.ins3[1], T.markB2[0], {x: bx + w4 + w3, y: y2}, B2, E.inOut],
			[T.markB2[1], T.markB2[1] + 0.3, B2, {x: B2.x - 40, y: B2.y}, E.inOut],
			[47.0, 47.5, {x: B2.x - 40, y: B2.y}, HOME.b, E.inOut],
		], HOME.b);
	}

	// ---- render ------------------------------------------------------------------------------
	const render = (t) => {
		// The scene dims while the evidence panel is up.
		const dimK = prog(t, ...T.dim) - prog(t, ...T.undim);
		set(scene, {opacity: 1 - 0.75 * dimK});

		// Task card, its two parts, one at a time.
		const kc = prog(t, ...T.card, E.house);
		set(card, {opacity: kc, transform: `translate(0 ${mix(6, 0, kc)})`});
		set(taskP1, {opacity: prog(t, ...T.p1)});
		set(taskP2, {opacity: prog(t, ...T.p2)});

		// Reports: appear, open when read, close when the reader leaves.
		const open = [
			Math.max(prog(t, ...T.aOpen1) - prog(t, ...T.aClose), prog(t, ...T.bOpen1) - prog(t, ...T.bClose)),
			Math.max(prog(t, ...T.aOpen2) - prog(t, ...T.aClose), prog(t, ...T.bOpen2) - prog(t, ...T.bClose)),
			prog(t, ...T.survey) - prog(t, ...T.surveyClose),
			prog(t, ...T.log),
		];
		reports.forEach((r, i) => {
			const t0 = T.reports + i * T.reportStep;
			set(r.g, {opacity: prog(t, t0, t0 + T.reportDur)});
			const k = i < 2 ? open[i] : 0;
			set(r.rect, {height: RH + 14 * k});
			r.bars.forEach((b) => set(b, {opacity: k}));
			if (i >= 2) set(r.rect, {'stroke-opacity': 0.15 + 0.5 * open[i]});
		});
		set(surveyC.g, {opacity: open[2]});
		set(logC.g, {opacity: open[3]});

		// Copies of the reports slide to the AI.
		copies.forEach((c, i) => {
			const k = prog(t, T.copies + 0.1 * i, T.copies + 0.1 * i + 0.5, E.inOut);
			// They land in a small stack above the AI's column and stay: the AI has all four.
			const from = {x: REPORTS[i].x + 48, y: 58}, to = {x: 456 + 4 * i, y: 84 + 4 * i};
			set(c, {x: mix(from.x, to.x, k), y: mix(from.y, to.y, k), opacity: Math.min(1, k / 0.2)});
		});

		// The AI's answers: the same motion, the same moment, the same tag.
		set(aiHead, {opacity: prog(t, ...T.aiHead)});
		const kCards = prog(t, ...T.cards, E.house);
		const blink = 1 - 0.65 * bump(t, ...T.pulseB);
		for (const [key, c] of Object.entries(ai)) {
			const pulse = key === 'p1' ? bump(t, ...T.pulse1) : bump(t, ...T.pulse2);
			set(c.g, {opacity: kCards, transform: `translate(0 ${mix(8, 0, kCards)})`});
			set(c.rect, {stroke: mixColor(C.ink, C.grey, pulse), 'stroke-opacity': 0.15 + 0.85 * pulse, 'stroke-width': 1 + 1.6 * pulse});
			c.lines.forEach((l, i) => set(l.rect, {width: (l.w + 8) * prog(t, ...(i ? T.line2 : T.line1))}));
			set(c.pill, {opacity: prog(t, ...T.ready) * blink});
		}

		// Briefs: sheets fade in; each part slides in from the AI's card in the same row.
		set(sheetA, {opacity: prog(t, ...T.sheetA)});
		set(sheetB, {opacity: prog(t, ...T.sheetB)});
		const slide = (sec, span, dx) => {
			const k = prog(t, ...span, E.inOut);
			set(sec.g, {opacity: k > 0 ? Math.min(1, k * 4) : 0, transform: `translate(${mix(dx, 0, k)} 0)`});
		};
		slide(secA1, T.sheetA, COL.ai - COL.a);
		slide(secA2, T.slideA2, COL.ai - COL.a);
		slide(secB1, T.slideB1, COL.ai - COL.b);
		slide(secB2, T.slideB2, COL.ai - COL.b);
		// The second student's corrections: strike, then insert, pushing the AI's words along.
		const editLine = (segs, strikeSpan, insSpan, strikeEl, y) => {
			const ks = prog(t, ...strikeSpan), ki = prog(t, ...insSpan, E.inOut);
			let x = secB2.x;
			const [num, ins, tail] = segs;
			set(num.t, {x}); set(num.band, {x: x - 2, width: num.w + 2});
			set(strikeEl, {x1: x - 1, y1: y, x2: x - 1 + (num.w + 2) * ks, y2: y, opacity: ks > 0 ? 1 : 0});
			x += num.w;
			set(ins.t, {x, opacity: ki});
			x += ins.w * ki;
			set(tail.t, {x}); set(tail.band, {x, width: tail.w + 2});
		};
		editLine(secB2.l1, T.strike20, T.ins15, secB2.s1, S.strike ? S.strike.y1 : 337);
		editLine(secB2.l2, T.strike4, T.ins3, secB2.s2, S.strike ? S.strike.y2 : 355);

		// Working marks, written left to right; they lift off at hand-in.
		const off = prog(t, ...T.marksOff, E.inOut);
		for (const [id, m] of Object.entries(marks)) {
			const span = {a1: T.markA1, a2: T.markA2, b1: T.markB1, b2: T.markB2}[id];
			set(m.rect, {width: (m.w + 6) * prog(t, ...span)});
			set(m.g, {opacity: 1 - off, transform: `translate(0 ${-6 * off})`});
		}

		// Beat 7: why Part 2 sits outside, then the frontier.
		const kCap = prog(t, ...T.capacity, E.inOut);
		const cap = ai.p2.lines[1];
		set(capLine, {x2: cap.x + cap.w * kCap, opacity: kCap > 0 ? 1 : 0});
		set(capTag, {opacity: prog(t, T.capacity[0] + 0.2, T.capacity[1])});
		const kOpen = prog(t, ...T.openToday, E.inOut);
		set(openTag, {opacity: kOpen});
		set(openTick, {opacity: kOpen});
		set(openLine, {x2: 808 + (S.openW || 0) * kOpen, opacity: kOpen > 0 ? 1 : 0});
		set(frontier, {'stroke-dashoffset': fLen * (1 - prog(t, ...T.frontier, E.inOut)), opacity: t >= T.frontier[0] ? 1 : 0});
		set(fIn, {opacity: prog(t, ...T.fLabels)});
		set(fOut, {opacity: prog(t, ...T.fLabels)});

		// Beat 8: the study, centre stage.
		const kPanel = prog(t, ...T.panel, E.house) * (1 - prog(t, ...T.undim));
		set(panel, {opacity: kPanel, transform: `translate(0 ${mix(10, 0, prog(t, ...T.panel, E.house))})`});
		bars.forEach((b, i) => {
			const k = prog(t, ...(i ? T.bars2 : T.bar1), E.outCubic);
			set(b.r, {width: b.v * BAR.k * k});
			set(b.t, {opacity: prog(t, ...(i ? T.bars2 : T.bar1)) >= 1 ? 1 : 0});
		});
		set(bracket, {opacity: prog(t, ...T.bracket)});
		set(bracketText, {opacity: prog(t, ...T.bracketText)});

		// Beat 9: faculty see only the briefs, and point to each part in turn.
		set(facLabel, {opacity: prog(t, ...T.facLabel)});
		const kOut = prog(t, ...T.outline), kMove = prog(t, ...T.outlineMove, E.inOut);
		outlines.forEach((o) => set(o, {y: mix(ROW.p1 - 4, ROW.p2 - 4, kMove), opacity: kOut}));
		for (const s of Object.values(speeches)) {
			set(s.g, {opacity: prog(t, ...T.panels)});
			for (const row of s.rows) {
				const [t0, t1] = row.at, n = row.words.length;
				set(row.num, {opacity: prog(t, t0 - 0.1, t0 + 0.1)});
				row.words.forEach((w, i) => { const ti = t0 + ((t1 - t0) * i) / n; set(w, {'fill-opacity': prog(t, ti, ti + 0.15)}); });
			}
		}

		// Dots.
		const dotLayer = (d, p, kIn, labelOff, pulse) => {
			set(d.g, {opacity: kIn});
			set(d.c, {cx: p.x, cy: p.y, r: 5 * Math.min(1, kIn * 1.2)});
			set(d.ring, {cx: p.x, cy: p.y, r: 5 + 10 * pulse, opacity: pulse > 0 && pulse < 1 ? 1 - pulse : 0});
			set(d.lab, {opacity: 1 - labelOff});
		};
		dotLayer(dotA, pathA(t), prog(t, ...T.dotA, E.house), prog(t, ...T.aLabel), prog(t, ...T.pulseA));
		dotLayer(dotB, pathB(t), prog(t, ...T.dotB, E.house), prog(t, ...T.bLabel), prog(t, ...T.pulseB));

		renderNarrow(t);
	};

	// ---- the stacked text stage (any time a picture label would be hidden) -----------------
	const narrow = root.querySelector('[data-ur-narrow]');
	const h = (tag, cls, parent, txt) => { const n = document.createElement(tag); if (cls) n.className = cls; if (txt != null) n.textContent = txt; parent.append(n); return n; };
	const N = {};
	const sec = (k, label) => { const s = h('div', 'ur-n-sec', narrow); if (label) h('p', 'ur-n-label', s, label); N[k] = {sec: s}; return s; };
	const band = (parent, str) => h('span', 'ur-n-band', parent, str);
	{
		const s = sec('task', 'Example task');
		const box = h('div', 'ur-n-task', s);
		N.task.p1 = h('p', null, box, 'Part 1 · Ships needed a day');
		N.task.p2 = h('p', null, box, 'Part 2 · Ships the port takes a day');
	}
	{
		const s = sec('reports', 'Four reports');
		const row = h('div', 'ur-n-chips', s);
		N.reports.chips = ['Aid report', 'Aid report', 'Port survey', 'Harbor log'].map((l) => h('span', 'ur-n-chip', row, l));
		N.reports.survey = h('p', 'ur-n-call', s, 'Port survey: 4 docks, 5 ships each');
		const lg = h('p', 'ur-n-call', s);
		lg.append('Harbor log: Dock 2: closed for repairs.');
		N.reports.open = h('span', 'ur-n-tag', lg, 'Open today');
		N.reports.log = lg;
	}
	{
		const s = sec('ai', "AI's answers");
		const item = (key, txt) => {
			const r = h('div', 'ur-n-ai', s);
			h('span', 'ur-n-part', r, key);
			const p = h('span', 'ur-n-ans', r);
			band(p, txt);
			const ready = h('span', 'ur-n-ready', r, 'Ready');
			return {r, ready, p};
		};
		N.ai.p1 = item('Part 1', '24 ships a day: 480 tons at 20 each');
		N.ai.front = h('div', 'ur-n-front', s);
		h('span', null, N.ai.front, 'Inside the frontier ↑');
		const zig = el(N.ai.front, 'svg', {viewBox: '0 0 200 10', preserveAspectRatio: 'none', 'aria-hidden': 'true'});
		el(zig, 'polyline', {points: '0,5 9,1 16,9 27,3 33,8 45,1 55,9 66,4 74,7 83,1 93,9 105,4 113,2 121,8 132,5 141,1 150,9 161,3 170,7 180,2 192,8 200,5', fill: 'none', stroke: C.ink, 'stroke-width': 1.4, 'vector-effect': 'non-scaling-stroke'});
		h('span', null, N.ai.front, 'Outside the frontier ↓');
		N.ai.p2 = item('Part 2', '20 ships a day: 4 docks at 5 each');
		N.ai.cap = h('span', 'ur-n-tag', N.ai.p2.p, 'Capacity');
	}
	{
		const s = sec('briefs', null);
		const row = h('div', 'ur-n-pair', s);
		const col = (title) => { const c = h('div', 'ur-n-col', row); h('p', 'ur-n-label', c, title); return c; };
		const part = (c, txt, mark) => { const p = h('p', 'ur-n-brief', c); const b = band(p, txt); const m = h('span', 'ur-n-mark', p, mark); return {p, b, m}; };
		const a = col("First student's brief"), b = col("Second student's brief");
		N.briefs.a = a; N.briefs.b = b;
		N.briefs.a1 = part(a, '24 ships a day: 480 tons at 20 each', '✓ Checked');
		N.briefs.a2 = part(a, '20 ships a day: 4 docks at 5 each', 'Used as is');
		N.briefs.b1 = part(b, '24 ships a day: 480 tons at 20 each', '✓ Checked');
		const p = h('p', 'ur-n-brief', b);
		N.briefs.b20 = band(p, '20');
		N.briefs.b15 = h('span', 'ur-n-ins', p, ' 15');
		band(p, ' ships a day: ');
		N.briefs.b4 = band(p, '4');
		N.briefs.b3 = h('span', 'ur-n-ins', p, ' 3 open');
		band(p, ' docks at 5 each');
		N.briefs.b2m = h('span', 'ur-n-mark', p, '✓ Checked');
		N.briefs.b2 = {p};
	}
	{
		const s = sec('evidence', 'Right answers on a task outside the jagged frontier');
		N.evidence.rows = [['Without AI', '84.5%'], ['With AI, two groups', '60% and 70%']].map(([a, b]) => { const r = h('p', 'ur-n-ev', s); h('span', null, r, a); h('b', null, r, b); return r; });
		N.evidence.q = h('p', 'ur-n-evq', s, 'Graders rated the AI users’ work higher in quality.');
		h('p', 'ur-n-src', s, 'Dell’Acqua et al. (2023) · BCG consultants · HBS working paper 24-013');
	}
	{
		const s = sec('faculty', 'Faculty see only the briefs');
		const row = h('div', 'ur-n-pair', s);
		N.faculty.cols = ['a', 'b'].map((k) => {
			const c = h('div', 'ur-n-say', row);
			h('span', 'ur-n-who', c, k === 'a' ? 'First student' : 'Second student');
			return SPEECH[k].rows.map((r) => h('p', 'ur-n-line', c, `${r.n} · ${r.lines.join(' ')}`));
		});
	}
	const SHOW = [['task'], ['task', 'reports'], ['reports', 'ai'], ['reports', 'ai', 'briefs'], ['reports', 'ai', 'briefs'], ['reports', 'briefs'], ['reports', 'ai'], ['evidence'], ['briefs', 'faculty'], ['ai', 'briefs', 'faculty']];
	const beatIndex = (t) => { let i = 0; BEATS.forEach((b, j) => { if (t >= b.at) i = j; }); return i; };
	const fade = (node, k) => { node.style.opacity = Math.max(0, Math.min(1, k)).toFixed(3); };
	function renderNarrow(t) {
		if (!root.classList.contains('is-stacked')) return;
		const show = new Set(SHOW[beatIndex(t)]);
		for (const [k, v] of Object.entries(N)) v.sec.hidden = !show.has(k);
		fade(N.task.sec, prog(t, ...T.card));
		fade(N.task.p1, prog(t, ...T.p1));
		fade(N.task.p2, prog(t, ...T.p2));
		N.reports.chips.forEach((c, i) => {
			const t0 = T.reports + i * T.reportStep;
			fade(c, prog(t, t0, t0 + T.reportDur));
		});
		N.reports.chips.forEach((c, i) => c.classList.toggle('is-open', i < 2 ? (t >= T.aOpen1[0] && t < T.aClose[1]) || (t >= T.bOpen1[0] && t < T.bClose[1]) : i === 2 ? t >= T.survey[0] && t < T.surveyClose[1] : t >= T.log[0]));
		N.reports.survey.hidden = !(t >= T.survey[0] && t < T.surveyClose[1]);
		N.reports.log.hidden = t < T.log[0];
		fade(N.reports.open, prog(t, ...T.openToday));
		fade(N.ai.sec, prog(t, ...T.cards));
		fade(N.ai.p1.ready, prog(t, ...T.ready));
		fade(N.ai.p2.ready, prog(t, ...T.ready));
		fade(N.ai.cap, prog(t, ...T.capacity));
		N.ai.front.hidden = t < T.frontier[0];
		fade(N.ai.front, prog(t, ...T.frontier));
		const b = N.briefs;
		fade(b.a, prog(t, ...T.sheetA));
		fade(b.b, prog(t, ...T.sheetB));
		fade(b.a1.p, prog(t, ...T.sheetA));
		fade(b.a2.p, prog(t, ...T.slideA2));
		fade(b.b1.p, prog(t, ...T.slideB1));
		fade(b.b2.p, prog(t, ...T.slideB2));
		const off = 1 - prog(t, ...T.marksOff);
		[[b.a1.m, T.markA1], [b.a2.m, T.markA2], [b.b1.m, T.markB1], [b.b2m, T.markB2]].forEach(([m, span]) => {
			const k = prog(t, ...span) * off;
			m.hidden = k <= 0;
			fade(m, k);
		});
		b.b20.classList.toggle('is-struck', t >= T.strike20[1]);
		b.b4.classList.toggle('is-struck', t >= T.strike4[1]);
		b.b15.hidden = t < T.ins15[0];
		b.b3.hidden = t < T.ins3[0];
		fade(N.evidence.sec, prog(t, ...T.panel));
		fade(N.evidence.rows[0], prog(t, ...T.bar1));
		fade(N.evidence.rows[1], prog(t, ...T.bars2));
		fade(N.evidence.q, prog(t, ...T.bracketText));
		fade(N.faculty.sec, prog(t, ...T.facLabel));
		N.faculty.cols.forEach((rows, ci) => rows.forEach((r, ri) => fade(r, prog(t, SPEECH[ci ? 'b' : 'a'].rows[ri].at[0], SPEECH[ci ? 'b' : 'a'].rows[ri].at[1]))));
	}
	// The stacked stage takes over whenever the smallest picture text (12 units)
	// would render under 11 px.
	const syncStacked = () => {
		const w = svg.getBoundingClientRect().width;
		if (!w) return;
		const stacked = (12 * w) / VW < 11;
		if (stacked !== root.classList.contains('is-stacked')) {
			root.classList.toggle('is-stacked', stacked);
			const f = window.__motionFigures && window.__motionFigures[root.id];
			if (f) renderNarrow(+root.querySelector('[data-mf-scrub]').value || 0);
		}
	};

	const BEATS = [
		{at: 0, text: 'A student gets a two-part task.',
			detail: 'a task card appears at the top left: "Example task. Part 1: Ships needed a day. Part 2: Ships the port takes a day." A red dot labelled Student appears below.'},
		{at: 7.7, text: 'The student gives an AI four reports.',
			detail: 'four reports appear across the top: Aid report, Aid report, Port survey and Harbor log. The dot pulses, and a grey copy of each report slides into a small stack above the centre, where it stays.'},
		{at: 12.9, text: 'It answers both with equal confidence.',
			detail: 'two answer cards labelled "AI\'s answers" write in together, in grey on a beige band. Part 1: "24 ships a day: 480 tons at 20 each." Part 2: "20 ships a day: 4 docks at 5 each." Each gets the same grey "Ready" tag.'},
		{at: 22.9, text: 'The student checks Part 1, and it\'s right, so they use both.',
			detail: 'the dot opens both aid reports. Part 1 slides into a sheet labelled "First student\'s brief", and the dot marks it "Checked" in red. Part 2 slides in, and the dot marks it "Used as is".'},
		{at: 31.6, text: 'Another student, with the same AI answers, checks each part at its source.',
			detail: 'a second red dot labelled Second student and an empty sheet labelled "Second student\'s brief" appear. The dot pulses and both "Ready" tags blink. The dot opens both aid reports, and Part 1 slides into its brief, marked "Checked".'},
		{at: 40.3, text: 'That student checks Part 2 against the port reports, and corrects it.',
			detail: 'the dot opens the port survey, "4 docks, 5 ships each", then the harbor log, "Dock 2: closed for repairs." Part 2 slides into the second brief. The dot strikes out "20" and "4" in red and writes "15" and "3 open", so it reads "15 ships a day: 3 open docks at 5 each", and marks it "Checked". The first brief still says 20.'},
		{at: 49.0, text: 'On the page, both parts look the same. Checking shows Part 2 depends on what\'s open today.',
			detail: 'the AI\'s two cards pulse alike. The AI\'s "4 docks at 5 each" is underlined and marked "Capacity"; the harbor log\'s line is marked "Open today". An uneven line is drawn between the AI\'s two cards, labelled "Inside the frontier" above and "Outside the frontier" below.'},
		{at: 59.7, text: 'In a field experiment, consultants with AI were right less often outside the frontier.',
			detail: 'the picture dims and a panel rises: right answers on a task outside the jagged frontier. Without AI: 84.5%. With AI, two groups: 60% and 70%. A bracket beside the AI bars reads "Graders rated higher in quality". Source: Dell\'Acqua et al. (2023), BCG consultants, HBS working paper 24-013.'},
		{at: 72.0, text: 'Faculty point to each part in turn and ask what justified relying on it.',
			detail: 'the panel goes. The red marks lift off both briefs, and "Faculty see only the briefs" appears. Part 1 is outlined in both briefs, and each student says, "The aid reports." Then Part 2: the first student says, "Part 1 checked out, so I trusted the rest." The second says, "The harbor log. One dock is closed."'},
		{at: 88.0, text: 'Faculty check: What evidence justified relying on the system here?',
			list: 'Faculty check: What evidence justified relying on the system here? Point to each part. Was the evidence about that part?',
			detail: 'both lines appear under the picture at the same size. The briefs, the AI\'s answers, the frontier and both students\' answers stay in view.',
			check: {label: 'Faculty check', question: 'What evidence justified relying on the system here?', follow: 'Point to each part. Was the evidence about that part?', followAt: T.follow}},
	];

	document.fonts.ready.then(() => {
		measure();
		legibility(root, svg, VW, 11);
		new ResizeObserver(syncStacked).observe(svg);
		syncStacked();
		mount(root, {duration: T.end, render, beats: BEATS});
	});
})();
