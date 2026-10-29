/* Uncalibrated reliance: motion figure 4 of 8. Built to storyboard.md (round 5,
   revised after figure cold read 2).
   Grey is what the AI supplied, red is a student's decision, navy is ink.
   Three columns: the first student's brief, the AI's answers, the second
   student's brief, with Part 1 in the upper row and Part 2 in the lower row.
   Both students check Part 1 the same way; only the second checks Part 2 at its
   source. The reason, the frontier and the study come after both have worked.
   Whenever any picture label would render under 11 px (the runtime's letterboxed
   scale), the SVG gives way to a stacked text stage driven by the same clock. That
   stage has a fixed layout: sections are placed from the start and only fade in,
   so the caption and controls never move. Every attribute is a pure function of t.
   Every visible word comes from editions/<id>.json (default pme) with role words from
   ../../casts.json, loaded by MotionFigures.loadEdition; see CONVENTIONS.md, Editions. */
(() => {
	const {mount, E, mix, prog, el, set, pathAt, legibility, mixColor, FONT, loadEdition, fillPage, rich} = MotionFigures;
	const C = {paper: '#f6f1e8', bright: '#fffdfa', ink: '#0a2242', red: '#b81b2b', grey: '#5b564f', band: '#ded5c4'};
	const VW = 960, VH = 540, MONO = 13;

	// ---- timeline (absolute seconds, from the storyboard) -------------------
	const T = {
		// 1 · the task and the reports
		card: [1.0, 1.6], p1: [1.7, 2.1], p2: [2.2, 2.6], dotA: [2.7, 3.0],
		reports: 4.0, reportStep: 0.28, reportDur: 0.3, pulseA: [5.2, 5.5], copies: 5.5, stackLabel: [6.3, 6.7],
		// 2 · equal confidence
		aiHead: [9.6, 10.0], cards: [10.0, 10.6], line1: [10.7, 11.5], line2: [11.7, 12.5], ready: [12.7, 13.1],
		// 3 · the first student checks Part 1
		aLabel: [16.6, 16.9], aOpen1: [17.2, 17.8], aOpen2: [18.2, 18.8], sheetA: [19.6, 20.3], markA1: [20.4, 20.8],
		// 4 · and uses Part 2
		readyPulse: [24.1, 24.7], aLook: [24.9, 25.5], slideA2: [26.4, 27.0], markA2: [27.0, 27.4], aClose: [28.3, 28.8],
		// 5 · the second student checks each part: Part 1
		dotB: [31.3, 31.7], sheetB: [31.7, 32.1], pulseB: [32.2, 32.6], bLabel: [32.7, 33.0], bOpen: [33.3, 33.9],
		slideB1: [34.1, 34.8], markB1: [34.9, 35.3], bClose: [35.6, 36.1],
		// 6 · and Part 2, slowly
		survey: [39.1, 39.7], slot1: [39.7, 40.1], log: [40.7, 41.3], slot2: [41.3, 41.7], slideB2: [43.2, 43.8],
		strike20: [43.9, 44.2], ins15: [44.2, 44.5], strike4: [44.7, 45.0], ins3: [45.0, 45.3], markB2: [45.5, 45.9], bHome: [46.6, 47.1],
		// 7 · the reason and the frontier
		openToday: [49.6, 50.1], capacity: [50.3, 50.8], frontier: [54.3, 55.7], fLabels: [55.7, 56.1], together: [56.3, 56.9],
		// 8 · the study
		dim: [59.4, 59.8], panel: [59.8, 60.4], bar1: [60.5, 61.1], bars2: [61.2, 61.8], bracket: [62.0, 62.5], bracketText: [62.5, 62.9],
		// 9 · faculty
		undim: [68.9, 69.4], marksOff: [69.5, 70.1], facLabel: [70.1, 70.6], outline: [72.6, 73.1], panels: [73.2, 73.6],
		a1: [73.6, 74.6], b1: [74.8, 75.8], outlineMove: [76.1, 76.6], a2: [76.8, 79.8], b2: [80.1, 82.4],
		// 10 · the check
		check: 83.9, follow: 87.2, end: 90.6,
		source: [84.9, 85.4], // used only by editions that supply labels.source (business)
	};
	const BEAT_AT = [0, 8.6, 15.6, 23.1, 30.3, 37.6, 48.6, 58.4, 67.9, 83.9];

	// ---- geometry ----------------------------------------------------------
	const COL = {a: 24, ai: 338, b: 652}, COLW = 284;
	const ROW = {p1: 140, p2: 300}, ROWH = 68;
	const LINE = {p1: [182, 200], p2: [342, 360]};
	const REPORTS = [{x: 338}, {x: 486}, {x: 652}, {x: 800}];
	const RY = 20, RH = 36, RW = 136;
	const HOME = {a: {x: 36, y: 456}, b: {x: 664, y: 456}};
	const READ = REPORTS.map((r) => ({x: r.x - 7, y: 38}));
	const FRONTIER = [[330, 252], [344, 243], [356, 259], [371, 246], [380, 262], [398, 240], [414, 266], [432, 249], [446, 256], [460, 238], [475, 268], [494, 250], [508, 245], [521, 261], [538, 253], [552, 239], [566, 264], [584, 248], [598, 257], [612, 242], [630, 253]];

	const root = document.querySelector('#uncalibrated-reliance');
	// Every face the picture uses is loaded before anything is measured. The page copy now
	// arrives with the edition, so it no longer triggers these loads early.
	const FACES = ['500 13px "IBM Plex Mono"', '600 13px "IBM Plex Mono"', '400 16px "Source Sans 3"', '600 16px "Source Sans 3"',
		'400 16px "Source Serif 4"', '600 16px "Source Serif 4"', 'italic 400 16px "Source Serif 4"'];
	Promise.all([loadEdition(root), document.fonts.ready, ...FACES.map((f) => document.fonts.load(f))])
		.then(([ed]) => { fillPage(document, ed); fillLinked(ed); build(ed); });

	// Page copy with inline links (the essay's citation, the study): an array of segments,
	// each a string (escaped, *words* in italics) or {text, href}.
	function fillLinked(ed) {
		document.querySelectorAll('[data-ur-linked]').forEach((n) => {
			const segs = n.dataset.urLinked.split('.').reduce((o, k) => (o == null ? o : o[k]), ed) || [];
			n.textContent = '';
			segs.forEach((sg) => {
				if (typeof sg === 'string') { n.insertAdjacentHTML('beforeend', rich(sg)); return; }
				const a = document.createElement('a');
				a.href = sg.href;
				a.textContent = sg.text;
				n.append(a);
			});
		});
	}

	function build(ed) {
	const L = ed.labels, NW = ed.narrow;
	// Optional (business): moments moved within a beat (ed.timing, e.g. the frontier drawn as
	// beat 7's caption lands). Beat starts (BEAT_AT) stay shared; PME has no timing.
	Object.assign(T, ed.timing || {});
	const ANS = ed.answers;
	const SPEECH = {
		a: {x: 52, rows: ed.speech.a.map((r, i) => ({...r, at: i ? T.a2 : T.a1}))},
		b: {x: 680, rows: ed.speech.b.map((r, i) => ({...r, at: i ? T.b2 : T.b1}))},
	};
	const svg = root.querySelector('svg');
	const defs = el(svg, 'defs');
	el(svg, 'rect', {width: VW, height: VH, fill: C.paper});
	const scene = el(svg, 'g');
	const sceneOurs = el(scene, 'g');   // the AI's column, the reports and our marks: recede at hand-in
	const sceneSrc = el(scene, 'g');    // the port callouts: the source behind "3 open" stays at full strength
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
	const muted = mixColor(C.ink, C.paper, 0.3);

	// ---- task card ----------------------------------------------------------
	const card = el(sceneBase, 'g');
	el(card, 'rect', {x: 24, y: 16, width: 284, height: 84, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.15});
	mono(card, 40, 37, ed.task.label);
	const taskP1 = serif(card, 40, 61, ed.task.lines[0], {fs: 16});
	const taskP2 = serif(card, 40, 81, ed.task.lines[1], {fs: 16});

	// ---- reports and callouts ------------------------------------------------
	const reports = REPORTS.map((r, i) => {
		const g = el(sceneOurs, 'g');
		const rect = el(g, 'rect', {x: r.x, y: RY, width: RW, height: RH, rx: 3, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.15});
		mono(g, r.x + RW / 2, 43, ed.reports[i], {anchor: 'middle'});
		const bars = [el(g, 'rect', {x: r.x + 22, y: 52, width: 92, height: 3, fill: C.ink, 'fill-opacity': 0.7}), el(g, 'rect', {x: r.x + 22, y: 60, width: 64, height: 3, fill: C.ink, 'fill-opacity': 0.7})];
		return {g, rect, bars};
	});
	// Each port report opens to a heading and its lines, and stays open. The harbor log
	// says what is open today; the closed dock sits apart in muted italic.
	const callout = (x, heading, lines) => {
		const g = el(sceneSrc, 'g');
		el(g, 'path', {d: `M${x + 18} 56V60`, stroke: C.ink, 'stroke-opacity': 0.3});
		el(g, 'rect', {x, y: 60, width: RW, height: 52, rx: 2, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.3});
		mono(g, x + 8, 74, heading);
		const ts = lines.map(([s, style], i) => serif(g, x + 8, 89 + 15 * i, s, style === 'off' ? {fs: 13, style: 'italic', fill: muted} : {fs: 13}));
		return {g, ts};
	};
	const surveyC = callout(652, ed.callouts.survey.heading, ed.callouts.survey.lines);
	const logC = callout(800, ed.callouts.log.heading, ed.callouts.log.lines);
	// Optional (business): ed.reportsGiven says which documents go to the AI (default: all).
	const GIVEN = ed.reportsGiven || REPORTS.map(() => true);
	const copies = REPORTS.map(() => el(sceneOurs, 'rect', {width: 40, height: 24, rx: 2, fill: C.band, stroke: C.grey, 'stroke-opacity': 0.5, opacity: 0}));
	const stackLabel = mono(sceneOurs, 448, 102, L.given, {anchor: 'end', fill: C.grey});

	// ---- a line of the AI's words on its grey band ---------------------------------
	const bandLine = (parent, x, y, str, withClip) => {
		let g = parent, rect = null;
		if (withClip) ({g, rect} = clip(parent));
		const band = el(g, 'rect', {x: x - 2, y: y - 13, height: 17, rx: 2, fill: C.band});
		const t = serif(g, x, y, str, {fs: 16, fill: C.grey});
		return {band, t, rect, x, y, w: 0};
	};

	// ---- the AI's answers ----------------------------------------------------------
	const aiHead = mono(sceneOurs, COL.ai, 129, L.aiHead, {fill: C.grey});
	const aiCard = (key) => {
		const y = ROW[key];
		const g = el(sceneOurs, 'g');
		const rect = el(g, 'rect', {x: COL.ai, y, width: COLW, height: ROWH, rx: 3, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.15});
		mono(g, COL.ai + 14, y + 19, L.parts[key === 'p1' ? 0 : 1], {fill: C.grey});
		const pill = el(g, 'g');
		el(pill, 'rect', {x: COL.ai + COLW - 78, y: y + 6, width: 66, height: 19, rx: 9.5, fill: C.grey});
		mono(pill, COL.ai + COLW - 45, y + 20, L.ready, {anchor: 'middle', fill: C.bright, ls: 1});
		const lines = ANS[key].map((s, i) => bandLine(g, COL.ai + 14, LINE[key][i], s, true));
		return {g, rect, pill, lines, y};
	};
	const ai = {p1: aiCard('p1'), p2: aiCard('p2')};

	// Beat 7: the AI worked from capacity; the real number depends on what's open today.
	const capLine = el(sceneOurs, 'line', {stroke: C.ink, 'stroke-width': 1.6});
	const capTag = mono(sceneOurs, 0, 360, L.capacity);
	const openLine = el(sceneSrc, 'line', {stroke: C.ink, 'stroke-width': 1.6});

	// ---- the frontier ------------------------------------------------------------------
	const frontier = el(sceneOurs, 'path', {d: 'M' + FRONTIER.map((p) => p.join(' ')).join('L'), fill: 'none', stroke: C.ink, 'stroke-width': 1.8, 'stroke-linejoin': 'round'});
	const fIn = mono(sceneOurs, 480, 228, L.inside, {anchor: 'middle'});
	const fOut = mono(sceneOurs, 480, 290, L.outside, {anchor: 'middle'});
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
	const sheetA = sheet('a', L.briefA);
	const sheetB = sheet('b', L.briefB);
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
			l1: mk(LINE.p2[0], ANS.corrected.l1),
			l2: mk(LINE.p2[1], ANS.corrected.l2),
			s1: el(g, 'line', {stroke: C.red, 'stroke-width': 2}),
			s2: el(g, 'line', {stroke: C.red, 'stroke-width': 2}),
		};
	})();
	// What the second student reads in the port reports, set large in the empty middle of
	// their sheet before they correct anything. A working note: it lifts off at hand-in.
	// Optional: an edition without labels.slot (business) draws no reading note.
	const SL = L.slot || {label: '', lines: ['', '']};
	const slot = el(sceneBase, 'g');
	const slotLabel = mono(slot, COL.b + 16, 232, SL.label);
	const slotL1 = serif(slot, COL.b + 16, 255, SL.lines[0], {fs: 16});
	const slotL2 = serif(slot, COL.b + 16, 277, SL.lines[1], {fs: 16});

	// Working marks: what each student did with each part, written by their dot.
	const markEl = (col, key, str) => {
		const right = COL[col] + COLW - 12, y = ROW[key] + 19;
		const c = clip(sceneBase);
		const t = mono(c.g, right, y, str, {anchor: 'end', fill: C.red});
		return {g: c.g, rect: c.rect, t, right, y, w: 0};
	};
	const marks = {
		a1: markEl('a', 'p1', L.marks.checked), a2: markEl('a', 'p2', L.marks.used),
		b1: markEl('b', 'p1', L.marks.checked), b2: markEl('b', 'p2', L.marks.checked),
	};

	// ---- faculty -----------------------------------------------------------------------------
	const facLabel = mono(sceneBase, 480, 412, L.faculty, {anchor: 'middle'});
	// The final frame's key: the grey band is the AI's words; red is a student's own work.
	const key = el(sceneBase, 'g');
	el(key, 'rect', {x: 372, y: 437, width: 18, height: 12, rx: 2, fill: C.band, stroke: C.grey, 'stroke-width': 1});
	mono(key, 398, 448, L.key.ai, {fill: C.grey});
	el(key, 'circle', {cx: 381, cy: 466, r: 5, fill: C.red});
	mono(key, 398, 470, L.key.own, {fill: C.red});
	// Each person named once in red in the final frame, under what they say.
	const names = [text(sceneBase, 52, 512, L.names.first, {fs: 13, weight: 600, fill: C.red}), text(sceneBase, 680, 512, L.names.second, {fs: 13, weight: 600, fill: C.red})];
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
	const dotA = dot(HOME.a, L.dot.a);
	const labA2 = text(sceneBase, HOME.a.x + 12, HOME.a.y + 4, L.dot.a2, {fs: 13, weight: 600, fill: C.red});
	const dotB = dot(HOME.b, L.dot.b);
	let pathA = () => HOME.a, pathB = () => HOME.b;

	// ---- the evidence panel (above the dimmed scene) ---------------------------------------
	const panel = el(layer, 'g');
	el(panel, 'rect', {x: 104, y: 145, width: 760, height: 260, fill: C.ink, 'fill-opacity': 0.07});
	el(panel, 'rect', {x: 100, y: 140, width: 760, height: 260, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.18, 'stroke-width': 1.2});
	// Optional (business): a mono heading above the title (L.panel.heading).
	if (L.panel.heading) mono(panel, 128, 176, L.panel.heading);
	text(panel, 128, L.panel.heading ? 204 : 182, L.panel.title, {fs: 18, weight: 600});
	let bars, bracket, bracketText;
	if (L.panel.rows) {
		// Optional (business): signed results on rows around a zero line, for a study that
		// reports changes rather than rates. A bar grows from zero toward its sign; a zero
		// result is a short tick. Each value label sits just right of its bar or of zero.
		// An uncertain row (row.uncertain) is drawn light and dashed, with its note under the
		// value. The bracket is optional.
		const n = L.panel.rows.length;
		const Z = {x: L.panel.zeroX || 360, k: 6, h: 18, ys: n === 2 ? [244, 294] : [214, 262, 296]};
		el(panel, 'path', {d: `M${Z.x} ${Z.ys[0] - 8}V${Z.ys[n - 1] + Z.h + 8}`, stroke: C.ink, 'stroke-opacity': 0.45, 'stroke-width': 1.2});
		bars = L.panel.rows.map((row, i) => {
			const y = Z.ys[i], w = Math.abs(row.v) * Z.k;
			text(panel, 128, y + 14, row.label, {fs: 16});
			const r = el(panel, 'rect', {x: Z.x, y, height: Z.h, width: 0, fill: C.ink, 'fill-opacity': row.uncertain ? 0.22 : 0.85,
				...(row.uncertain ? {stroke: C.ink, 'stroke-width': 1.4, 'stroke-dasharray': '5 3'} : {})});
			const tick = row.v ? null : el(panel, 'rect', {x: Z.x - 2, y: y - 2, width: 4, height: Z.h + 4, fill: C.ink});
			const vx = Z.x + (row.v > 0 ? w : 0) + 12;
			const t = text(panel, vx, y + 14, row.value, {fs: 16, weight: 600});
			const note = row.note ? mono(panel, vx, y + 34, row.note, {weight: 500, ls: 0.8, fill: mixColor(C.ink, C.paper, 0.35)}) : null;
			const draw = (k) => { set(r, {x: row.v < 0 ? Z.x - w * k : Z.x, width: w * k}); if (tick) set(tick, {opacity: k}); };
			return {r, t, note, draw};
		});
		bracketText = el(panel, 'g');
		if (L.panel.bracket) {
			const bx = Math.round(Math.max(...bars.map((b) => b.t.getComputedTextLength() + Number(b.t.getAttribute('x'))))) + 16;
			bracket = el(panel, 'path', {d: `M${bx} ${Z.ys[1]}H${bx + 10}V${Z.ys[n - 1] + Z.h}H${bx}`, fill: 'none', stroke: C.ink, 'stroke-width': 1.6});
			L.panel.bracket.forEach((s, i) => serif(bracketText, bx + 24, Z.ys[1] + 8 + 19 * i, s, {fs: 16, style: 'italic'}));
		} else bracket = el(panel, 'path', {d: ''});
	} else {
		text(panel, 128, 238, L.panel.without, {fs: 16});
		text(panel, 128, 290, L.panel.with, {fs: 16});
		mono(panel, 128, 309, L.panel.groups, {weight: 500});
		const BAR = {x: 272, k: 4, h: 18};
		bars = [{y: 224, v: 84.5}, {y: 274, v: 60}, {y: 298, v: 70}].map((b, i) => ({...b, label: L.panel.bars[i]})).map((b) => ({
			...b, r: el(panel, 'rect', {x: BAR.x, y: b.y, height: BAR.h, fill: C.ink, 'fill-opacity': 0.85}),
			t: text(panel, BAR.x + b.v * BAR.k + 10, b.y + 14, b.label, {fs: 16, weight: 600}),
		}));
		bars.forEach((b) => { b.draw = (k) => set(b.r, {width: b.v * BAR.k * k}); });
		bracket = el(panel, 'path', {d: 'M610 274H620V316H610', fill: 'none', stroke: C.ink, 'stroke-width': 1.6});
		bracketText = el(panel, 'g');
		L.panel.bracket.forEach((s, i) => serif(bracketText, 634, 278 + 19 * i, s, {fs: 16, style: 'italic'}));
	}
	text(panel, 128, 380, L.panel.source, {fs: MONO, family: FONT.mono, weight: 500, ls: 0.8, fill: mixColor(C.ink, C.paper, 0.35)});
	// Optional (business): a one-line source under the final frame. The stacked stage
	// carries its own copy as its last line (narrow.source), inside the player.
	const sourceLine = L.source ? text(sceneBase, 480, 522, L.source, {fs: 13, family: FONT.serif, style: 'italic', fill: C.ink, anchor: 'middle'}) : null;

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
		set(openLine, {x1: 808, y1: 92, x2: 808, y2: 92});
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
			[T.aLook[0], T.aLook[1], away(A1), away(A2), E.inOut],
			[T.slideA2[0], T.slideA2[1], away(A2), A2, E.inOut],
			[T.markA2[1], T.markA2[1] + 0.3, A2, away(A2), E.inOut],
			[T.aClose[0], T.aClose[1], away(A2), HOME.a, E.inOut],
		], HOME.a);
		pathB = pathAt([
			[T.bLabel[0], T.bOpen[0], HOME.b, READ[1], E.inOut],
			[T.slideB1[0], T.slideB1[1], READ[1], B1, E.inOut],
			[T.markB1[1], T.markB1[1] + 0.3, B1, away(B1), E.inOut],
			[T.survey[0] - 0.5, T.survey[0], away(B1), READ[2], E.inOut],
			[T.log[0] - 0.4, T.log[0], READ[2], READ[3], E.inOut],
			[T.slideB2[0], T.slideB2[1], READ[3], {x: bx - 6, y: y1}, E.inOut],
			[T.strike20[0], T.strike20[1], {x: bx - 6, y: y1}, {x: bx + w20, y: y1}],
			[T.ins15[0], T.ins15[1], {x: bx + w20, y: y1}, {x: bx + w20 + w15, y: y1}],
			[T.ins15[1], T.strike4[0], {x: bx + w20 + w15, y: y1}, {x: bx - 6, y: y2}, E.inOut],
			[T.strike4[0], T.strike4[1], {x: bx - 6, y: y2}, {x: bx + w4, y: y2}],
			[T.ins3[0], T.ins3[1], {x: bx + w4, y: y2}, {x: bx + w4 + w3, y: y2}],
			[T.ins3[1], T.markB2[0], {x: bx + w4 + w3, y: y2}, B2, E.inOut],
			[T.markB2[1], T.markB2[1] + 0.3, B2, away(B2), E.inOut],
			[T.bHome[0], T.bHome[1], away(B2), HOME.b, E.inOut],
		], HOME.b);
	}

	// ---- render ------------------------------------------------------------------------------
	const render = (t) => {
		// The scene dims while the evidence panel is up; at hand-in our side recedes.
		const dimK = prog(t, ...T.dim) - prog(t, ...T.undim);
		set(scene, {opacity: 1 - (L.panel.dim || 0.75) * dimK});
		set(sceneOurs, {opacity: 1 - 0.40 * prog(t, ...T.facLabel)});

		const kc = prog(t, ...T.card, E.house);
		set(card, {opacity: kc, transform: `translate(0 ${mix(6, 0, kc)})`});
		set(taskP1, {opacity: prog(t, ...T.p1)});
		set(taskP2, {opacity: prog(t, ...T.p2)});

		// Reports: appear, open when read, close when the reader leaves.
		const open = [
			Math.max(prog(t, ...T.aOpen1) - prog(t, ...T.aClose), prog(t, ...T.bOpen) - prog(t, ...T.bClose)),
			Math.max(prog(t, ...T.aOpen2) - prog(t, ...T.aClose), prog(t, ...T.bOpen) - prog(t, ...T.bClose)),
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
			set(c, {x: mix(from.x, to.x, k), y: mix(from.y, to.y, k), opacity: GIVEN[i] ? Math.min(1, k / 0.2) : 0});
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
			set(num.t, {x}); set(num.band, {x: x - 2, width: num.w ? num.w + 2 : 0});
			set(strikeEl, {x1: x - 1, y1: y, x2: x - 1 + (num.w + 2) * ks, y2: y, opacity: ks > 0 && num.w ? 1 : 0});
			x += num.w;
			set(ins.t, {x, opacity: ki});
			x += ins.w * ki;
			set(tail.t, {x}); set(tail.band, {x, width: tail.w ? tail.w + 2 : 0});
		};
		editLine(secB2.l1, T.strike20, T.ins15, secB2.s1, S.strike ? S.strike.y1 : 337);
		editLine(secB2.l2, T.strike4, T.ins3, secB2.s2, S.strike ? S.strike.y2 : 355);

		// Working marks and the reading note, written while working; they lift off at hand-in.
		const off = prog(t, ...T.marksOff, E.inOut);
		for (const [id, m] of Object.entries(marks)) {
			const span = {a1: T.markA1, a2: T.markA2, b1: T.markB1, b2: T.markB2}[id];
			set(m.rect, {width: (m.w + 6) * prog(t, ...span)});
			set(m.g, {opacity: 1 - off, transform: `translate(0 ${-6 * off})`});
		}
		set(slot, {opacity: 1 - off, transform: `translate(0 ${-6 * off})`});
		set(slotLabel, {opacity: prog(t, ...T.slot1)});
		set(slotL1, {opacity: prog(t, ...T.slot1)});
		set(slotL2, {opacity: prog(t, ...T.slot2)});

		// Beat 7: why Part 2 sits outside, then the frontier.
		const kOpen = prog(t, ...T.openToday, E.inOut);
		set(openLine, {x2: 808 + (S.openW || 0) * kOpen, opacity: kOpen > 0 ? 1 : 0});
		const kCap = prog(t, ...T.capacity, E.inOut);
		const cap = ai.p2.lines[1];
		set(capLine, {x2: cap.x + cap.w * kCap, opacity: kCap > 0 ? 1 : 0});
		set(capTag, {opacity: prog(t, T.capacity[0] + 0.2, T.capacity[1])});
		set(frontier, {'stroke-dashoffset': fLen * (1 - prog(t, ...T.frontier, E.inOut)), opacity: t >= T.frontier[0] ? 1 : 0});
		set(fIn, {opacity: prog(t, ...T.fLabels)});
		set(fOut, {opacity: prog(t, ...T.fLabels)});

		// Beat 8: the study, centre stage.
		const kP = prog(t, ...T.panel, E.house);
		set(panel, {opacity: kP * (1 - prog(t, ...T.undim)), transform: `translate(0 ${mix(10, 0, kP)})`});
		bars.forEach((b, i) => {
			const span = i ? T.bars2 : T.bar1;
			b.draw(prog(t, ...span, E.outCubic));
			set(b.t, {opacity: prog(t, span[1] - 0.1, span[1] + 0.1)});
			if (b.note) set(b.note, {opacity: prog(t, span[1] - 0.1, span[1] + 0.1)});
		});
		set(bracket, {opacity: prog(t, ...T.bracket)});
		set(bracketText, {opacity: prog(t, ...T.bracketText)});
		if (sourceLine) set(sourceLine, {opacity: prog(t, ...T.source)});

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
		// Once there are two, the first is named "First student" while at home; at the end both are named under their answers.
		set(labA2, {opacity: prog(t, ...T.dotB) * (1 - prog(t, ...T.panels))});
		set(key, {opacity: prog(t, ...T.facLabel)});
		names.forEach((n) => set(n, {opacity: prog(t, ...T.panels)}));
		// Optional (business, L.dot.keepB): the second dot's label stays until the names appear.
		dotLayer(dotB, pathB(t), prog(t, ...T.dotB, E.house), prog(t, ...(L.dot.keepB ? T.panels : T.bLabel)), prog(t, ...T.pulseB));

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
		h('span', 'ur-n-label', p, NW.taskLabel);
		N.p1 = h('span', null, p, NW.taskLines[0]);
		N.p2 = h('span', null, p, NW.taskLines[1]);
		N.task = s;
		N.who = h('span', 'ur-n-who', p, NW.who);
	}
	{
		const s = h('div', 'ur-n-sec', body);
		const p = h('p', 'ur-n-reports', s);
		N.rep = NW.reports.map((l) => h('span', 'ur-n-chip', p, l));
		const calls = N.calls = h('div', 'ur-n-calls', s);
		N.survey = h('p', 'ur-n-call', calls);
		h('b', 'ur-n-head', N.survey, NW.survey.head);
		N.survey.append(NW.survey.text);
		N.log = h('p', 'ur-n-call', calls);
		h('b', 'ur-n-head', N.log, NW.log.head);
		N.logLine = h('span', null, N.log, NW.log.text);
		N.closed = h('p', 'ur-n-call ur-n-off', calls, NW.closed);
	}
	{
		const s = h('div', 'ur-n-sec', body);
		const head = h('p', 'ur-n-label ur-n-grey ur-n-head2', s);
		N.aiHead = h('span', null, head, NW.aiHead);
		N.given = h('span', null, head, NW.given);
		const item = (key, txt) => {
			const r = h('div', 'ur-n-ai', s);
			h('span', 'ur-n-part', r, key);
			const p = h('span', 'ur-n-ans', r);
			band(p, txt);
			const ready = h('span', 'ur-n-ready', r, NW.ready);
			return {r, ready, p};
		};
		// Optional narrow.answers / narrow.speech: shorter wordings for the stacked stage (business).
		N.ai1 = item(NW.parts[0], NW.answers ? NW.answers.p1 : ANS.p1.join(' '));
		N.front = h('div', 'ur-n-front', s);
		const fl = h('div', 'ur-n-flabels', N.front);
		h('span', null, fl, NW.inside);
		h('span', null, fl, NW.outside);
		const zig = el(N.front, 'svg', {viewBox: '0 0 200 10', preserveAspectRatio: 'none', 'aria-hidden': 'true'});
		el(zig, 'polyline', {points: '0,5 9,1 16,9 27,3 33,8 45,1 55,9 66,4 74,7 83,1 93,9 105,4 113,2 121,8 132,5 141,1 150,9 161,3 170,7 180,2 192,8 200,5', fill: 'none', stroke: C.ink, 'stroke-width': 1.4, 'vector-effect': 'non-scaling-stroke'});
		N.ai2 = item(NW.parts[1], NW.answers ? NW.answers.p2 : ANS.p2.join(' '));
		N.cap = h('span', 'ur-n-tag', N.ai2.p, NW.capacity);
	}
	{
		const s = h('div', 'ur-n-sec', body);
		const row = h('div', 'ur-n-pair', s);
		const col = (title) => { const c = h('div', 'ur-n-col', row); h('p', 'ur-n-name', c, title); return c; };
		const part = (c, txt, mark) => { const p = h('p', 'ur-n-brief', c); band(p, txt); const m = h('span', 'ur-n-mark', p, mark); return {p, m}; };
		N.colA = col(NW.first); N.colB = col(NW.second);
		N.a1 = part(N.colA, NW.briefs.p1, NW.marks.checked);
		N.a2 = part(N.colA, NW.briefs.p2, NW.marks.used);
		N.b1 = part(N.colB, NW.briefs.p1, NW.marks.checked);
		// The original and the corrected text share one cell, so swapping them never changes the height.
		const p = h('p', 'ur-n-brief', N.colB);
		const stack = h('span', 'ur-n-stack', p);
		N.bOrig = h('span', null, stack);
		band(N.bOrig, NW.briefs.p2);
		N.bEdit = h('span', null, stack);
		NW.corrected.forEach(([str, kind]) => {
			if (kind === 'ins') h('span', 'ur-n-ins', N.bEdit, str);
			else { const b = band(N.bEdit, str); if (kind === 'struck') b.classList.add('is-struck'); }
		});
		N.b2 = {p, m: h('span', 'ur-n-mark', p, NW.marks.checked)};
	}
	{
		const s = h('div', 'ur-n-sec', body);
		N.facLabel = h('p', 'ur-n-label', s, NW.faculty);
		const row = h('div', 'ur-n-pair', s);
		N.say = ['a', 'b'].map((k) => {
			const c = h('div', 'ur-n-say', row);
			return SPEECH[k].rows.map((r, ri) => h('p', 'ur-n-line', c, `${r.n} · ${NW.speech ? NW.speech[k][ri] : r.lines.join(' ')}`));
		});
		N.sayBox = [...row.children];
		// Optional (business): the source line, the stage's last line, so it stays in the player.
		N.src = NW.source ? h('p', 'ur-n-srcline', s, NW.source) : null;
	}
	{
		const o = h('div', 'ur-n-evidence', narrow);
		h('p', 'ur-n-label', o, NW.evidence.label);
		N.ev = NW.evidence.rows.map(([a, b]) => { const r = h('p', 'ur-n-ev', o); h('span', null, r, a); h('b', null, r, b); return r; });
		N.evq = NW.evidence.quality ? h('p', 'ur-n-evq', o, NW.evidence.quality) : null;
		h('p', 'ur-n-src', o, NW.evidence.source);
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
		op(N.who, prog(t, ...T.dotA));
		N.rep.forEach((c, i) => {
			const t0 = T.reports + (i ? i + 1 : 0) * T.reportStep;
			op(c, prog(t, t0, t0 + T.reportDur));
			c.classList.toggle('is-open', i === 0 ? (t >= T.aOpen1[0] && t < T.aClose[1]) || (t >= T.bOpen[0] && t < T.bClose[1]) : t >= (i === 1 ? T.survey[0] : T.log[0]));
		});
		op(N.calls, prog(t, ...T.survey));
		op(N.survey, prog(t, ...T.survey));
		op(N.log, prog(t, ...T.log));
		op(N.closed, prog(t, ...T.log));
		N.logLine.classList.toggle('is-under', t >= T.openToday[0]);
		op(N.aiHead, prog(t, ...T.aiHead));
		op(N.given, prog(t, ...T.stackLabel));
		op(N.ai1.r, prog(t, ...T.cards));
		op(N.ai2.r, prog(t, ...T.cards));
		op(N.ai1.ready, prog(t, ...T.ready));
		op(N.ai2.ready, prog(t, ...T.ready));
		N.ai2.ready.style.transform = `scale(${(1 + 0.25 * bump(t, ...T.readyPulse)).toFixed(3)})`;
		N.ai2.r.classList.toggle('is-looked', t >= T.readyPulse[0] && t < T.slideA2[1]);
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
		const edited = t >= T.ins15[0];
		N.bOrig.style.visibility = edited ? 'hidden' : 'visible';
		N.bEdit.style.visibility = edited ? 'visible' : 'hidden';
		// Faculty point to the part they ask about.
		const onP1 = t >= T.outline[0] && t < T.outlineMove[0], onP2 = t >= T.outlineMove[0];
		[N.a1.p, N.b1.p].forEach((n) => n.classList.toggle('is-pointed', onP1));
		[N.a2.p, N.b2.p].forEach((n) => n.classList.toggle('is-pointed', onP2));
		N.ev.forEach((r, i) => op(r, prog(t, ...(i ? T.bars2 : T.bar1))));
		if (N.evq) op(N.evq, prog(t, ...(L.panel.bracket ? T.bracketText : T.panel)));
		op(N.facLabel, prog(t, ...T.facLabel));
		N.sayBox.forEach((b) => op(b, prog(t, ...T.panels)));
		if (N.src) op(N.src, prog(t, ...T.source));
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
			renderNarrow(api ? api.time() : 0);
		}
	};

	const BEATS = BEAT_AT.map((at, i) => ({at, ...ed.beats[i]}));
	BEATS[BEATS.length - 1].check = {...ed.check, followAt: T.follow};

	let api = null;
	{
		measure();
		legibility(root, svg, VW, 11);
		new ResizeObserver(syncStacked).observe(svg);
		syncStacked();
		// The nameplate is core: the same name, kicker and role-neutral definition in every edition.
		api = mount(root, {duration: T.end, render, beats: BEATS, poster: BEAT_AT[1] - 0.02,
			nameplate: {name: 'Uncalibrated reliance', kicker: 'Failure mode 4 of 7', definition: 'Confident output is accepted without knowing whether the task fits the tool.'}});
		if (root.classList.contains('is-stacked')) renderNarrow(api.time());
	}
	}
})();
