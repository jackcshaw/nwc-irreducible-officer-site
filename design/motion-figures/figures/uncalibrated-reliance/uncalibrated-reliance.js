/* Uncalibrated reliance: motion figure 4 of 8. Built to storyboard.md (round 4,
   revised after figure cold read 1).
   Grey is what the AI supplied, red is a student's decision, navy is ink.
   Three columns: the first student's brief, the AI's answers, the second
   student's brief, with Part 1 in the upper row and Part 2 in the lower row.
   Both students check Part 1 the same way; only the second checks Part 2 at its
   source. The reason, the frontier and the study come after both have worked.
   Whenever any picture label would render under 11 px (the runtime's letterboxed
   scale), the SVG gives way to a stacked text stage driven by the same clock. That
   stage has a fixed layout: sections are placed from the start and only fade in,
   so the caption and controls never move. Every attribute is a pure function of t. */
(() => {
	const {mount, E, mix, prog, el, set, pathAt, legibility, mixColor, FONT} = MotionFigures;
	const C = {paper: '#f6f1e8', bright: '#fffdfa', ink: '#0a2242', red: '#b81b2b', grey: '#5b564f', band: '#ded5c4'};
	const VW = 960, VH = 540, MONO = 13;

	// ---- timeline (absolute seconds, from the storyboard) -------------------
	const T = {
		// 1 · the task
		card: [1.0, 1.6], p1: [1.8, 2.2], p2: [3.0, 3.4], dotA: [3.6, 4.0],
		// 2 · the reports go to the AI
		reports: 8.7, reportStep: 0.37, reportDur: 0.3, pulseA: [10.2, 10.6], copies: 10.6, stackLabel: [11.5, 11.9],
		// 3 · equal confidence
		aiHead: [15.0, 15.4], cards: [15.4, 16.0], line1: [16.1, 16.9], line2: [17.1, 17.9], ready: [19.1, 19.5],
		// 4 · the first student checks Part 1
		aLabel: [25.0, 25.3], aOpen1: [25.6, 26.2], aOpen2: [26.6, 27.2], sheetA: [28.0, 28.7], markA1: [28.8, 29.2],
		// 5 · and uses Part 2 as is
		readyPulse: [33.0, 33.6], slideA2: [36.0, 36.6], markA2: [36.6, 37.0], aClose: [38.0, 38.5],
		// 6 · the second student checks each part: Part 1
		dotB: [41.1, 41.5], sheetB: [41.5, 41.9], pulseB: [42.0, 42.4], bLabel: [42.5, 42.8], bOpen1: [43.1, 43.7], bOpen2: [44.1, 44.7],
		slideB1: [44.9, 45.6], markB1: [45.7, 46.1], bClose: [46.2, 46.7],
		// 7 · and Part 2
		survey: [50.3, 50.9], log: [51.3, 52.1], slideB2: [52.2, 52.8],
		strike20: [52.9, 53.2], ins15: [53.2, 53.5], strike4: [53.65, 53.8], ins3: [53.8, 54.1], markB2: [54.2, 54.6],
		// 8 · the reason
		capacity: [58.5, 59.0], openToday: [61.5, 62.0],
		// 9 · the frontier
		frontier: [66.5, 67.9], fLabels: [67.9, 68.3], together: [70.8, 71.4],
		// 10 · the study
		dim: [77.2, 77.7], panel: [77.7, 78.3], bar1: [80.9, 81.5], bars2: [81.6, 82.2], bracket: [82.5, 83.0], bracketText: [83.0, 83.4],
		// 11 · faculty
		undim: [91.5, 92.0], marksOff: [92.1, 92.7], facLabel: [92.7, 93.2], outline: [95.2, 95.7], panels: [95.8, 96.2],
		a1: [96.2, 97.2], b1: [97.4, 98.4], outlineMove: [98.7, 99.2], a2: [99.4, 102.4], b2: [102.7, 105.0],
		// 12 · the check
		check: 106.5, follow: 109.8, end: 113.2,
	};
	const BEAT_AT = [0, 7.7, 14.0, 24.0, 32.0, 40.1, 48.8, 57.5, 65.5, 76.2, 90.5, 106.5];

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
	el(svg, 'rect', {width: VW, height: VH, fill: C.paper});
	const scene = el(svg, 'g');
	const sceneOurs = el(scene, 'g');   // the AI's column, the reports and our marks: recede at hand-in
	const sceneBase = el(scene, 'g');   // the students' side: task, briefs, dots, faculty
	const layer = el(svg, 'g');

	const text = (parent, x, y, str, {fs, family = FONT.sans, weight = 400, fill = C.ink, anchor = 'start', ls = 0, style} = {}) =>
		el(parent, 'text', {x, y, 'font-family': family, 'font-size': fs, 'font-weight': weight, fill, 'text-anchor': anchor, 'letter-spacing': ls, 'data-fs': fs, ...(style ? {'font-style': style} : {})}, str);
	const mono = (parent, x, y, str, opts = {}) => text(parent, x, y, str, {fs: MONO, family: FONT.mono, weight: 600, ls: 1.1, ...opts});
	const serif = (parent, x, y, str, opts = {}) => text(parent, x, y, str, {family: FONT.serif, ...opts});
	let clipN = 0;
	const clip = (parent) => {
		const id = `ur-clip-${clipN++}`;
		const rect = el(el(defs, 'clipPath', {id}), 'rect', {width: 0});
		return {g: el(parent, 'g', {'clip-path': `url(#${id})`}), rect};
	};
	const bump = (t, t0, t1) => Math.sin(Math.PI * prog(t, t0, t1));

	// ---- task card ----------------------------------------------------------
	const card = el(sceneBase, 'g');
	el(card, 'rect', {x: 24, y: 16, width: 284, height: 84, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.15});
	mono(card, 40, 37, 'EXAMPLE TASK');
	const taskP1 = serif(card, 40, 63, 'Part 1 · Ships needed a day', {fs: 15});
	const taskP2 = serif(card, 40, 85, 'Part 2 · Ships the port takes a day', {fs: 15});

	// ---- reports and callouts ------------------------------------------------
	const reports = REPORTS.map((r) => {
		const g = el(sceneOurs, 'g');
		const rect = el(g, 'rect', {x: r.x, y: RY, width: RW, height: RH, rx: 3, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.15});
		mono(g, r.x + RW / 2, 43, r.label, {anchor: 'middle'});
		const bars = [el(g, 'rect', {x: r.x + 22, y: 52, width: 92, height: 3, fill: C.ink, 'fill-opacity': 0.7}), el(g, 'rect', {x: r.x + 22, y: 60, width: 64, height: 3, fill: C.ink, 'fill-opacity': 0.7})];
		return {g, rect, bars};
	});
	// Both port callouts stay open once opened, so the source of "3 open" stays on screen.
	const callout = (x, lines) => {
		const g = el(sceneOurs, 'g');
		el(g, 'path', {d: `M${x + 18} 56V60`, stroke: C.ink, 'stroke-opacity': 0.3});
		el(g, 'rect', {x, y: 60, width: RW, height: 52, rx: 2, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.3});
		const ts = lines.map((s, i) => serif(g, x + 8, 75 + 15 * i, s, {fs: 13}));
		return {g, ts};
	};
	const surveyC = callout(652, ['4 docks,', '5 ships each']);
	const logC = callout(800, ['Dock 2: closed', 'for repairs.']);
	const copies = REPORTS.map(() => el(sceneOurs, 'rect', {width: 40, height: 24, rx: 2, fill: C.band, stroke: C.grey, 'stroke-opacity': 0.5, opacity: 0}));
	const stackLabel = mono(sceneOurs, 448, 102, 'GIVEN TO THE AI', {anchor: 'end', fill: C.grey});

	// ---- a line of the AI's words on its grey band ---------------------------------
	const bandLine = (parent, x, y, str, withClip) => {
		let g = parent, rect = null;
		if (withClip) ({g, rect} = clip(parent));
		const band = el(g, 'rect', {x: x - 2, y: y - 13, height: 17, rx: 2, fill: C.band});
		const t = serif(g, x, y, str, {fs: 16, fill: C.grey});
		return {band, t, rect, x, y, w: 0};
	};

	// ---- the AI's answers ----------------------------------------------------------
	const aiHead = mono(sceneOurs, COL.ai, 129, "AI'S ANSWERS", {fill: C.grey});
	const aiCard = (key) => {
		const y = ROW[key];
		const g = el(sceneOurs, 'g');
		const rect = el(g, 'rect', {x: COL.ai, y, width: COLW, height: ROWH, rx: 3, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.15});
		mono(g, COL.ai + 14, y + 19, key === 'p1' ? 'PART 1' : 'PART 2', {fill: C.grey});
		const pill = el(g, 'g');
		el(pill, 'rect', {x: COL.ai + COLW - 78, y: y + 6, width: 66, height: 19, rx: 9.5, fill: C.grey});
		mono(pill, COL.ai + COLW - 45, y + 20, 'READY', {anchor: 'middle', fill: C.bright, ls: 1});
		const lines = ANS[key].map((s, i) => bandLine(g, COL.ai + 14, LINE[key][i], s, true));
		return {g, rect, pill, lines, y};
	};
	const ai = {p1: aiCard('p1'), p2: aiCard('p2')};

	// Beat 8: the AI worked from capacity; the real number depends on what's open today.
	const capLine = el(sceneOurs, 'line', {stroke: C.ink, 'stroke-width': 1.6});
	const capTag = mono(sceneOurs, 0, 360, 'CAPACITY');
	const openLine = el(sceneOurs, 'line', {stroke: C.ink, 'stroke-width': 1.6});
	const openTag = mono(sceneOurs, 808, 106, 'OPEN TODAY');

	// ---- the frontier ------------------------------------------------------------------
	const frontier = el(sceneOurs, 'path', {d: 'M' + FRONTIER.map((p) => p.join(' ')).join('L'), fill: 'none', stroke: C.ink, 'stroke-width': 1.8, 'stroke-linejoin': 'round'});
	const fIn = mono(sceneOurs, 480, 228, 'INSIDE THE FRONTIER', {anchor: 'middle'});
	const fOut = mono(sceneOurs, 480, 290, 'OUTSIDE THE FRONTIER', {anchor: 'middle'});
	let fLen = 0;

	// ---- briefs ----------------------------------------------------------------------------
	const sheet = (col, label) => {
		const x = COL[col];
		const g = el(sceneBase, 'g');
		el(g, 'rect', {x: x + 3, y: 138, width: COLW, height: 240, fill: C.ink, 'fill-opacity': 0.06});
		el(g, 'rect', {x, y: 134, width: COLW, height: 240, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.18, 'stroke-width': 1.2});
		mono(g, x, 129, label);
		return g;
	};
	const sheetA = sheet('a', "FIRST STUDENT'S BRIEF");
	const sheetB = sheet('b', "SECOND STUDENT'S BRIEF");
	const section = (col, key) => {
		const g = el(sceneBase, 'g');
		const lines = ANS[key].map((s, i) => bandLine(g, COL[col] + 16, LINE[key][i], s, false));
		return {g, lines};
	};
	const secA1 = section('a', 'p1'), secA2 = section('a', 'p2'), secB1 = section('b', 'p1');
	// The second student's Part 2: the AI's words, with two numbers struck and corrected in red.
	const secB2 = (() => {
		const g = el(sceneBase, 'g');
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
		const right = COL[col] + COLW - 12, y = ROW[key] + 19;
		const c = clip(sceneBase);
		const t = mono(c.g, right, y, str, {anchor: 'end', fill: C.red});
		return {g: c.g, rect: c.rect, t, right, y, w: 0};
	};
	const marks = {
		a1: markEl('a', 'p1', '✓ CHECKED'), a2: markEl('a', 'p2', 'USED AS IS'),
		b1: markEl('b', 'p1', '✓ CHECKED'), b2: markEl('b', 'p2', '✓ CHECKED'),
	};

	// ---- faculty -----------------------------------------------------------------------------
	const facLabel = mono(sceneBase, 480, 412, 'FACULTY SEE ONLY THE BRIEFS', {anchor: 'middle'});
	const outlines = ['a', 'b'].map((c) => el(sceneBase, 'rect', {x: COL[c] + 6, width: COLW - 12, height: 76, rx: 6, fill: 'none', stroke: C.ink, 'stroke-width': 1.5}));
	const speech = (key) => {
		const s = SPEECH[key], x = s.x, w = 256, y0 = 384, y1 = 490, r = 8;
		const g = el(sceneBase, 'g');
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
		const g = el(sceneBase, 'g');
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
	el(panel, 'rect', {x: 104, y: 145, width: 760, height: 260, fill: C.ink, 'fill-opacity': 0.07});
	el(panel, 'rect', {x: 100, y: 140, width: 760, height: 260, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.18, 'stroke-width': 1.2});
	text(panel, 128, 182, 'Right answers on a task outside the jagged frontier', {fs: 18, weight: 600});
	text(panel, 128, 238, 'Without AI', {fs: 16});
	text(panel, 128, 290, 'With AI', {fs: 16});
	mono(panel, 128, 309, 'TWO GROUPS', {weight: 500});
	const BAR = {x: 272, k: 4, h: 18};
	const bars = [{y: 224, v: 84.5, label: 'about 84.5%'}, {y: 274, v: 60, label: '60%'}, {y: 298, v: 70, label: '70%'}].map((b) => ({
		...b, r: el(panel, 'rect', {x: BAR.x, y: b.y, height: BAR.h, fill: C.ink, 'fill-opacity': 0.85}),
		t: text(panel, BAR.x + b.v * BAR.k + 10, b.y + 14, b.label, {fs: 16, weight: 600}),
	}));
	const bracket = el(panel, 'path', {d: 'M610 274H620V316H610', fill: 'none', stroke: C.ink, 'stroke-width': 1.6});
	const bracketText = el(panel, 'g');
	['Graders still rated these', 'higher in quality,', 'regardless of correctness'].forEach((s, i) => serif(bracketText, 634, 278 + 19 * i, s, {fs: 16, style: 'italic'}));
	text(panel, 128, 380, "DELL'ACQUA ET AL. (2023) · BCG CONSULTANTS · HBS WORKING PAPER 24-013", {fs: MONO, family: FONT.mono, weight: 500, ls: 0.8, fill: mixColor(C.ink, C.paper, 0.35)});

	// ---- measure (after fonts load) -------------------------------------------------------
	const W = (node) => node.getComputedTextLength();
	const S = {};
	function measure() {
		for (const l of [...ai.p1.lines, ...ai.p2.lines, ...secA1.lines, ...secA2.lines, ...secB1.lines]) {
			l.w = W(l.t);
			set(l.band, {width: l.w + 4});
			if (l.rect) set(l.rect, {x: l.x - 4, y: l.y - 16, height: 22});
		}
		for (const seg of [...secB2.l1, ...secB2.l2]) seg.w = W(seg.t);
		for (const m of Object.values(marks)) { m.w = W(m.t); set(m.rect, {x: m.right - m.w - 3, y: m.y - 13, height: 17}); }
		const cap = ai.p2.lines[1];
		set(capLine, {x1: cap.x, y1: 364, x2: cap.x, y2: 364});
		set(capTag, {x: cap.x + cap.w + 10});
		S.openW = W(logC.ts[0]);
		set(openLine, {x1: 808, y1: 78, x2: 808, y2: 78});
		fLen = frontier.getTotalLength();
		set(frontier, {'stroke-dasharray': fLen});
		// Dot targets: just left of each mark, then a step clear of it.
		const left = (m, gap = 10) => ({x: m.right - m.w - gap, y: m.y - 4});
		const away = (p) => ({x: p.x - 40, y: p.y});
		const A1 = left(marks.a1), A2 = left(marks.a2), B1 = left(marks.b1), B2 = left(marks.b2);
		const bx = secB2.x, w20 = secB2.l1[0].w, w15 = secB2.l1[1].w, w4 = secB2.l2[0].w, w3 = secB2.l2[1].w;
		const y1 = LINE.p2[0] - 5, y2 = LINE.p2[1] - 5;
		S.strike = {y1, y2};
		pathA = pathAt([
			[T.aLabel[0], T.aOpen1[0], HOME.a, READ[0], E.inOut],
			[T.aOpen1[1], T.aOpen2[0], READ[0], READ[1], E.inOut],
			[T.sheetA[0], T.sheetA[1], READ[1], A1, E.inOut],
			[T.markA1[1], T.markA1[1] + 0.3, A1, away(A1), E.inOut],
			[T.slideA2[0], T.slideA2[1], away(A1), A2, E.inOut],
			[T.markA2[1], T.markA2[1] + 0.3, A2, away(A2), E.inOut],
			[T.aClose[0], T.aClose[1], away(A2), HOME.a, E.inOut],
		], HOME.a);
		pathB = pathAt([
			[T.bLabel[0], T.bOpen1[0], HOME.b, READ[0], E.inOut],
			[T.bOpen1[1], T.bOpen2[0], READ[0], READ[1], E.inOut],
			[T.slideB1[0], T.slideB1[1], READ[1], B1, E.inOut],
			[T.markB1[1], T.markB1[1] + 0.3, B1, away(B1), E.inOut],
			[T.survey[0] - 0.5, T.survey[0], away(B1), READ[2], E.inOut],
			[T.survey[1], T.log[0], READ[2], READ[3], E.inOut],
			[T.slideB2[0], T.slideB2[1], READ[3], {x: bx - 6, y: y1}, E.inOut],
			[T.strike20[0], T.strike20[1], {x: bx - 6, y: y1}, {x: bx + w20, y: y1}],
			[T.ins15[0], T.ins15[1], {x: bx + w20, y: y1}, {x: bx + w20 + w15, y: y1}],
			[T.ins15[1], T.strike4[0], {x: bx + w20 + w15, y: y1}, {x: bx - 6, y: y2}, E.inOut],
			[T.strike4[0], T.strike4[1], {x: bx - 6, y: y2}, {x: bx + w4, y: y2}],
			[T.ins3[0], T.ins3[1], {x: bx + w4, y: y2}, {x: bx + w4 + w3, y: y2}],
			[T.ins3[1], T.markB2[0], {x: bx + w4 + w3, y: y2}, B2, E.inOut],
			[T.markB2[1], T.markB2[1] + 0.3, B2, away(B2), E.inOut],
			[T.markB2[1] + 0.9, T.markB2[1] + 1.4, away(B2), HOME.b, E.inOut],
		], HOME.b);
	}

	// ---- render ------------------------------------------------------------------------------
	const render = (t) => {
		// The scene dims while the evidence panel is up; at hand-in our side recedes.
		const dimK = prog(t, ...T.dim) - prog(t, ...T.undim);
		set(scene, {opacity: 1 - 0.75 * dimK});
		set(sceneOurs, {opacity: 1 - 0.45 * prog(t, ...T.facLabel)});

		const kc = prog(t, ...T.card, E.house);
		set(card, {opacity: kc, transform: `translate(0 ${mix(6, 0, kc)})`});
		set(taskP1, {opacity: prog(t, ...T.p1)});
		set(taskP2, {opacity: prog(t, ...T.p2)});

		// Reports: appear, open when read, close when the reader leaves.
		const open = [
			Math.max(prog(t, ...T.aOpen1) - prog(t, ...T.aClose), prog(t, ...T.bOpen1) - prog(t, ...T.bClose)),
			Math.max(prog(t, ...T.aOpen2) - prog(t, ...T.aClose), prog(t, ...T.bOpen2) - prog(t, ...T.bClose)),
			prog(t, ...T.survey), prog(t, ...T.log),
		];
		reports.forEach((r, i) => {
			const t0 = T.reports + i * T.reportStep;
			set(r.g, {opacity: prog(t, t0, t0 + T.reportDur)});
			const k = i < 2 ? open[i] : 0;
			set(r.rect, {height: RH + 14 * k, 'stroke-opacity': i < 2 ? 0.15 : 0.15 + 0.4 * open[i]});
			r.bars.forEach((b) => set(b, {opacity: k}));
		});
		set(surveyC.g, {opacity: open[2]});
		set(logC.g, {opacity: open[3]});

		// Copies of the reports slide into a stack beside the AI's column, and stay.
		copies.forEach((c, i) => {
			const k = prog(t, T.copies + 0.1 * i, T.copies + 0.1 * i + 0.5, E.inOut);
			const from = {x: REPORTS[i].x + 48, y: 58}, to = {x: 456 + 4 * i, y: 84 + 4 * i};
			set(c, {x: mix(from.x, to.x, k), y: mix(from.y, to.y, k), opacity: Math.min(1, k / 0.2)});
		});
		set(stackLabel, {opacity: prog(t, ...T.stackLabel)});

		// The AI's answers: the same motion, the same moment, the same tag.
		set(aiHead, {opacity: prog(t, ...T.aiHead)});
		const kCards = prog(t, ...T.cards, E.house);
		const blink = 1 - 0.65 * bump(t, ...T.pulseB);
		const together = bump(t, ...T.together);
		for (const [key, c] of Object.entries(ai)) {
			set(c.g, {opacity: kCards, transform: `translate(0 ${mix(8, 0, kCards)})`});
			set(c.rect, {stroke: mixColor(C.ink, C.grey, together), 'stroke-opacity': 0.15 + 0.85 * together, 'stroke-width': 1 + 1.6 * together});
			c.lines.forEach((l, i) => set(l.rect, {width: (l.w + 8) * prog(t, ...(i ? T.line2 : T.line1))}));
			const pulse = key === 'p2' ? bump(t, ...T.readyPulse) : 0;
			const cx = COL.ai + COLW - 45, cy = c.y + 15.5;
			set(c.pill, {opacity: prog(t, ...T.ready) * blink, transform: `translate(${cx} ${cy}) scale(${1 + 0.18 * pulse}) translate(${-cx} ${-cy})`});
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

		// Beat 8: why Part 2 sits outside.
		const kCap = prog(t, ...T.capacity, E.inOut);
		const cap = ai.p2.lines[1];
		set(capLine, {x2: cap.x + cap.w * kCap, opacity: kCap > 0 ? 1 : 0});
		set(capTag, {opacity: prog(t, T.capacity[0] + 0.2, T.capacity[1])});
		const kOpen = prog(t, ...T.openToday, E.inOut);
		set(openLine, {x2: 808 + (S.openW || 0) * kOpen, opacity: kOpen > 0 ? 1 : 0});
		set(openTag, {opacity: prog(t, T.openToday[0] + 0.2, T.openToday[1])});

		// Beat 9: the frontier, in its own beat.
		set(frontier, {'stroke-dashoffset': fLen * (1 - prog(t, ...T.frontier, E.inOut)), opacity: t >= T.frontier[0] ? 1 : 0});
		set(fIn, {opacity: prog(t, ...T.fLabels)});
		set(fOut, {opacity: prog(t, ...T.fLabels)});

		// Beat 10: the study, centre stage.
		const kP = prog(t, ...T.panel, E.house);
		set(panel, {opacity: kP * (1 - prog(t, ...T.undim)), transform: `translate(0 ${mix(10, 0, kP)})`});
		bars.forEach((b, i) => {
			const span = i ? T.bars2 : T.bar1;
			set(b.r, {width: b.v * BAR.k * prog(t, ...span, E.outCubic)});
			set(b.t, {opacity: prog(t, span[1] - 0.1, span[1] + 0.1)});
		});
		set(bracket, {opacity: prog(t, ...T.bracket)});
		set(bracketText, {opacity: prog(t, ...T.bracketText)});

		// Beat 11: faculty see only the briefs, and point to each part in turn.
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

	// ---- the stacked text stage --------------------------------------------------------------
	// A fixed layout: every section is placed from the start and only fades in, so its
	// height never changes. The task and both port reports stay to the end; the AI's
	// answers and both briefs are added, never swapped out. The study is an overlay.
	const narrow = root.querySelector('[data-ur-narrow]');
	const h = (tag, cls, parent, txt) => { const n = document.createElement(tag); if (cls) n.className = cls; if (txt != null) n.textContent = txt; parent.append(n); return n; };
	const band = (parent, str) => h('span', 'ur-n-band', parent, str);
	const N = {};
	const body = h('div', 'ur-n-body', narrow);
	{
		const s = h('div', 'ur-n-sec', body);
		const p = h('p', 'ur-n-task', s);
		h('span', 'ur-n-label', p, 'Example task ');
		N.p1 = h('span', null, p, 'Part 1 · Ships needed a day. ');
		N.p2 = h('span', null, p, 'Part 2 · Ships the port takes a day.');
		N.task = s;
	}
	{
		const s = h('div', 'ur-n-sec', body);
		const p = h('p', 'ur-n-reports', s);
		N.rep = ['2 aid reports', 'Port survey', 'Harbor log'].map((l) => h('span', 'ur-n-chip', p, l));
		const calls = N.calls = h('div', 'ur-n-calls', s);
		N.survey = h('p', 'ur-n-call', calls, 'Port survey: 4 docks, 5 ships each.');
		N.log = h('p', 'ur-n-call', calls);
		N.log.append('Harbor log: ');
		N.logLine = h('span', null, N.log, 'Dock 2: closed for repairs.');
		N.open = h('span', 'ur-n-tag', N.log, 'Open today');
	}
	{
		const s = h('div', 'ur-n-sec', body);
		const head = h('p', 'ur-n-label ur-n-grey ur-n-head', s);
		N.aiHead = h('span', null, head, "AI's answers");
		N.given = h('span', null, head, 'Given all four reports');
		const item = (key, txt) => {
			const r = h('div', 'ur-n-ai', s);
			h('span', 'ur-n-part', r, key);
			const p = h('span', 'ur-n-ans', r);
			band(p, txt);
			const ready = h('span', 'ur-n-ready', r, 'Ready');
			return {r, ready, p};
		};
		N.ai1 = item('1', '24 ships a day: 480 tons at 20 each');
		N.front = h('div', 'ur-n-front', s);
		const fl = h('div', 'ur-n-flabels', N.front);
		h('span', null, fl, 'Inside the frontier ↑');
		h('span', null, fl, 'Outside the frontier ↓');
		const zig = el(N.front, 'svg', {viewBox: '0 0 200 10', preserveAspectRatio: 'none', 'aria-hidden': 'true'});
		el(zig, 'polyline', {points: '0,5 9,1 16,9 27,3 33,8 45,1 55,9 66,4 74,7 83,1 93,9 105,4 113,2 121,8 132,5 141,1 150,9 161,3 170,7 180,2 192,8 200,5', fill: 'none', stroke: C.ink, 'stroke-width': 1.4, 'vector-effect': 'non-scaling-stroke'});
		N.ai2 = item('2', '20 ships a day: 4 docks at 5 each');
		N.cap = h('span', 'ur-n-tag', N.ai2.p, 'Capacity');
	}
	{
		const s = h('div', 'ur-n-sec', body);
		const row = h('div', 'ur-n-pair', s);
		const col = (title) => { const c = h('div', 'ur-n-col', row); h('p', 'ur-n-label', c, title); return c; };
		const part = (c, txt, mark) => { const p = h('p', 'ur-n-brief', c); band(p, txt); const m = h('span', 'ur-n-mark', p, mark); return {p, m}; };
		N.colA = col('First student'); N.colB = col('Second student');
		N.a1 = part(N.colA, '24 ships a day: 480 tons at 20 each', '✓ Checked');
		N.a2 = part(N.colA, '20 ships a day: 4 docks at 5 each', 'Used as is');
		N.b1 = part(N.colB, '24 ships a day: 480 tons at 20 each', '✓ Checked');
		const p = h('p', 'ur-n-brief', N.colB);
		N.b20 = band(p, '20');
		N.b15 = h('span', 'ur-n-ins', p, ' 15');
		band(p, ' ships a day: ');
		N.b4 = band(p, '4');
		N.b3 = h('span', 'ur-n-ins', p, ' 3 open');
		band(p, ' docks at 5 each');
		N.b2 = {p, m: h('span', 'ur-n-mark', p, '✓ Checked')};
	}
	{
		const s = h('div', 'ur-n-sec', body);
		N.facLabel = h('p', 'ur-n-label', s, 'Faculty see only the briefs');
		const row = h('div', 'ur-n-pair', s);
		N.say = ['a', 'b'].map((k) => {
			const c = h('div', 'ur-n-say', row);
			return SPEECH[k].rows.map((r) => h('p', 'ur-n-line', c, `${r.n} · ${r.lines.join(' ')}`));
		});
		N.sayBox = [...row.children];
	}
	{
		const o = h('div', 'ur-n-evidence', narrow);
		h('p', 'ur-n-label', o, 'Right answers on a task outside the jagged frontier');
		N.ev = [['Without AI', 'about 84.5%'], ['With AI, two groups', '60% and 70%']].map(([a, b]) => { const r = h('p', 'ur-n-ev', o); h('span', null, r, a); h('b', null, r, b); return r; });
		N.evq = h('p', 'ur-n-evq', o, 'Graders still rated these higher in quality, regardless of correctness.');
		h('p', 'ur-n-src', o, 'Dell’Acqua et al. (2023) · BCG consultants · HBS working paper 24-013');
		N.evidence = o;
	}
	const op = (node, k) => { node.style.opacity = Math.max(0, Math.min(1, k)).toFixed(3); };
	function renderNarrow(t) {
		if (!root.classList.contains('is-stacked')) return;
		const dimK = prog(t, ...T.dim) - prog(t, ...T.undim);
		op(body, 1 - 0.85 * dimK);
		op(N.evidence, prog(t, ...T.panel) * (1 - prog(t, ...T.undim)));
		N.evidence.style.visibility = dimK > 0 ? 'visible' : 'hidden';
		op(N.task, prog(t, ...T.card));
		op(N.p1, prog(t, ...T.p1));
		op(N.p2, prog(t, ...T.p2));
		N.rep.forEach((c, i) => {
			const t0 = T.reports + (i ? i + 1 : 0) * T.reportStep;
			op(c, prog(t, t0, t0 + T.reportDur));
			c.classList.toggle('is-open', i === 0 ? (t >= T.aOpen1[0] && t < T.aClose[1]) || (t >= T.bOpen1[0] && t < T.bClose[1]) : t >= (i === 1 ? T.survey[0] : T.log[0]));
		});
		op(N.given, prog(t, ...T.stackLabel));
		op(N.calls, prog(t, ...T.survey));
		op(N.survey, prog(t, ...T.survey));
		op(N.log, prog(t, ...T.log));
		N.logLine.classList.toggle('is-under', t >= T.openToday[0]);
		op(N.open, prog(t, ...T.openToday));
		op(N.aiHead, prog(t, ...T.aiHead));
		op(N.ai1.r, prog(t, ...T.cards));
		op(N.ai2.r, prog(t, ...T.cards));
		op(N.ai1.ready, prog(t, ...T.ready));
		op(N.ai2.ready, prog(t, ...T.ready));
		op(N.cap, prog(t, ...T.capacity));
		op(N.front, prog(t, ...T.frontier));
		op(N.colA, prog(t, ...T.sheetA));
		op(N.colB, prog(t, ...T.sheetB));
		op(N.a1.p, prog(t, ...T.sheetA));
		op(N.a2.p, prog(t, ...T.slideA2));
		op(N.b1.p, prog(t, ...T.slideB1));
		op(N.b2.p, prog(t, ...T.slideB2));
		const off = 1 - prog(t, ...T.marksOff);
		[[N.a1.m, T.markA1], [N.a2.m, T.markA2], [N.b1.m, T.markB1], [N.b2.m, T.markB2]].forEach(([m, span]) => op(m, prog(t, ...span) * off));
		N.b20.classList.toggle('is-struck', t >= T.strike20[1]);
		N.b4.classList.toggle('is-struck', t >= T.strike4[1]);
		N.b15.style.visibility = t >= T.ins15[0] ? 'visible' : 'hidden';
		N.b3.style.visibility = t >= T.ins3[0] ? 'visible' : 'hidden';
		op(N.ev[0], prog(t, ...T.bar1));
		op(N.ev[1], prog(t, ...T.bars2));
		op(N.evq, prog(t, ...T.bracketText));
		op(N.facLabel, prog(t, ...T.facLabel));
		N.sayBox.forEach((b) => op(b, prog(t, ...T.panels)));
		N.say.forEach((rows, ci) => rows.forEach((r, ri) => { const at = SPEECH[ci ? 'b' : 'a'].rows[ri].at; op(r, prog(t, at[0], at[1])); }));
	}
	// The stacked stage takes over whenever the smallest picture text would render
	// under 11 px at the runtime's letterboxed scale.
	const syncStacked = () => {
		const r = svg.getBoundingClientRect();
		if (!r.width) return;
		const scale = r.height ? Math.min(r.width / VW, r.height / VH) : r.width / VW;
		const stacked = MONO * scale < 11;
		if (stacked !== root.classList.contains('is-stacked')) {
			root.classList.toggle('is-stacked', stacked);
			const scrub = root.querySelector('[data-mf-scrub]');
			renderNarrow(scrub ? +scrub.value || 0 : 0);
		}
	};

	const BEATS = [
		{at: BEAT_AT[0], text: 'A student gets a two-part task.',
			detail: 'a task card appears at the top left: "Example task. Part 1: Ships needed a day. Part 2: Ships the port takes a day." A red dot labelled Student appears below.'},
		{at: BEAT_AT[1], text: 'The student gives an AI four reports.',
			detail: 'four reports appear across the top: Aid report, Aid report, Port survey and Harbor log. The dot pulses, and a grey copy of each report slides into a small stack labelled "Given to the AI", where it stays.'},
		{at: BEAT_AT[2], text: 'It answers both with equal confidence.',
			detail: 'two answer cards labelled "AI\'s answers" write in together, in grey on a beige band. Part 1: "24 ships a day: 480 tons at 20 each." Part 2: "20 ships a day: 4 docks at 5 each." Each gets the same grey "Ready" tag at the same moment.'},
		{at: BEAT_AT[3], text: 'The student checks Part 1 against the two aid reports. It\'s right.',
			detail: 'the dot opens both aid reports. A sheet labelled "First student\'s brief" appears, Part 1 slides into it, and the dot marks it "Checked" in red.'},
		{at: BEAT_AT[4], text: 'Part 2 looks just as sure, so they use it as is.',
			detail: 'the "Ready" tag on the AI\'s Part 2 pulses. Part 2 slides into the first brief, and the dot marks it "Used as is". The aid reports close.'},
		{at: BEAT_AT[5], text: 'Another student, with the same AI answers, checks each part at its source.',
			detail: 'a second red dot labelled Second student and an empty sheet labelled "Second student\'s brief" appear. The dot pulses and both "Ready" tags blink. The dot opens both aid reports, and Part 1 slides into its brief, marked "Checked".'},
		{at: BEAT_AT[6], text: 'That student checks Part 2 against the port reports, and corrects it.',
			detail: 'the dot opens the port survey, "4 docks, 5 ships each", then the harbor log, "Dock 2: closed for repairs." Both stay open. Part 2 slides into the second brief. The dot strikes out "20" and "4" in red and writes "15" and "3 open", so it reads "15 ships a day: 3 open docks at 5 each", and marks it "Checked". The first brief still says 20.'},
		{at: BEAT_AT[7], text: 'The AI worked from capacity. Part 2 depends on what\'s open today.',
			detail: 'the AI\'s "4 docks at 5 each" is underlined and marked "Capacity". The harbor log\'s "Dock 2: closed" is underlined and marked "Open today".'},
		{at: BEAT_AT[8], text: 'A jagged frontier marks where an AI stops being reliable. It doesn\'t follow how tasks look.',
			detail: 'an uneven line is drawn between the AI\'s two answer cards, labelled "Inside the frontier" above and "Outside the frontier" below. Then the two cards, alike in form, pulse together.'},
		{at: BEAT_AT[9], text: 'In a field experiment, consultants with AI were right less often outside the frontier.',
			detail: 'the picture dims and a panel rises: right answers on a task outside the jagged frontier. Without AI: about 84.5%. With AI, two groups: 60% and 70%. A bracket beside the AI bars: "Graders still rated these higher in quality, regardless of correctness." Source: Dell\'Acqua et al. (2023), BCG consultants, HBS working paper 24-013.'},
		{at: BEAT_AT[10], text: 'Faculty point to each part in turn and ask what justified relying on it.',
			detail: 'the panel goes. The red marks lift off both briefs, the reports and the AI\'s column fade back, and "Faculty see only the briefs" appears. Part 1 is outlined in both briefs, and each student says, "The aid reports." Then Part 2: the first student says, "Part 1 checked out, so I trusted the rest." The second says, "The harbor log. One dock is closed."'},
		{at: BEAT_AT[11], text: 'Faculty check: What evidence justified relying on the system here?',
			list: 'Faculty check: What evidence justified relying on the system here? Point to each part. Was the evidence about that part?',
			detail: 'both lines appear under the picture at the same size. The briefs, both answers, the AI\'s answers, the frontier and the harbor log stay in view.',
			check: {label: 'Faculty check', question: 'What evidence justified relying on the system here?', follow: 'Point to each part. Was the evidence about that part?', followAt: T.follow}},
	];

	document.fonts.ready.then(() => {
		measure();
		legibility(root, svg, VW, 11);
		new ResizeObserver(syncStacked).observe(svg);
		syncStacked();
		mount(root, {duration: T.end, render, beats: BEATS, poster: BEAT_AT[1] - 0.02});
	});
})();
