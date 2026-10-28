/* Responsibility laundering: motion figure 7 of 8. Built to storyboard.md (round 4,
   revised after storyboard cold read 2).
   Grey is what the AI supplied, red is a student's decision, navy is ink.
   One AI draft divides into two identical copies. Both students read and sign it;
   the second first writes a note they don't hand in. Faculty ask who made the call,
   then why each relied on the estimate. The split dot pictures the first answer, a
   red bracket marks the second, and a weight labelled "ANSWERABLE" rests on both.
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
		card: [1.0, 1.6], dots: [2.0, 2.4],
		// 2 · same prompt, same draft
		pulse: [7.4, 7.8], sheet: [7.8, 8.3], row1: [10.7, 11.5], keyGrey: [10.7, 11.1], row2: [12.9, 13.7], sigLine: [13.9, 14.2],
		divide: [14.5, 15.7], tags: [15.8, 16.2],
		// 3 · both read it closely
		onto: [19.1, 19.5], read: [[19.5, 20.5], [20.5, 21.5], [21.8, 22.8], [22.8, 23.8]],
		// 4 · the first signs; the second notes first
		aToSig: [26.3, 26.7], aSign: [26.7, 27.5], keyRed: [26.9, 27.3],
		bUp: [30.0, 30.4], note: [30.4, 32.4], noteLabel: [32.5, 32.9], bDown: [34.6, 35.0], bSign: [35.0, 35.8],
		// 5 · who made the call
		q1: [41.0, 41.6], aPanel: [42.2, 42.6], a1: [42.6, 46.3], bPanel: [46.5, 46.9], b1: [46.9, 49.9],
		// 6 · then they ask why
		q2: [52.7, 53.3], aRow2: [53.5, 53.9], a2: [53.9, 56.6], bRow2: [56.8, 57.2], b2: [57.2, 63.2],
		// 7 · the turn
		aPulse: [65.7, 66.1], split: [68.7, 69.9], bPulse: [70.1, 70.5], bracket: [70.5, 71.3],
		// 8 · suppose it proves wrong
		weights: [74.6, 75.0], aFall: [77.9, 79.3], aRest: [79.3, 79.7], bFall: [79.9, 80.9], bRest: [80.9, 81.2],
		// 9 · the check
		check: 82.7, follow: 85.6, end: 89.9,
	};
	const BEAT_AT = [0, 6.4, 18.1, 25.3, 37.3, 51.4, 64.7, 73.6, 82.7];

	// ---- geometry (stage units; the sheets use their own units) --------------
	const BIG = {x: 202, y: 140, s: 1.25};
	const ORIGIN = {a: {x: 24, y: 146}, b: {x: 492, y: 146}};
	const HOME = {a: {x: 60, y: 392}, b: {x: 528, y: 392}};
	const ROWS = [['The analysis estimates ships can', 'carry everyone out.'], ['It is recommended that civilians', 'wait for ships.']];
	const LINE_Y = [[40, 68], [108, 136]];
	const TX = 80, SHEET = {w: 444, h: 184}, FS = 17, READ_DY = 9;
	const SIG = {y: 166, x0: 20, x1: 300, dot: {x: 36, y: 161}, start: {x: 86, y: 162}, end: {x: 206, y: 154}};
	const SQUIGGLE = 'M86 162C90 152 96 150 100 158S104 168 110 160S118 148 123 156S129 166 135 158S144 148 148 155S154 163 160 157S170 151 176 156S184 160 206 154';
	const WT = {x: -22, w: 96, h: 34, hang: -6, rest: 122};
	const HALF = {x: 66, y: 35};
	const NOTE = {x: 508, ys: [98, 116], lines: ['Rests on an open port.', 'Harbor reports: normal.'], dot: {x: 496, y: 93}};
	const PANEL = {y0: 388, y1: 494, w: 444, rows: [[411, 430], [456, 475]], textDx: 34};
	const SPEECH = {
		a: {rows: [{n: '1', str: '“I signed it. The analysis estimated the ships could do it.”', at: T.a1, open: T.aPanel},
			{n: '2', str: '“It was the AI’s estimate. It seemed solid.”', at: T.a2, open: T.aRow2}]},
		b: {rows: [{n: '1', str: '“I did. I chose to rely on the estimate.”', at: T.b1, open: T.bPanel},
			{n: '2', str: '“It assumes an open port. Harbor reports looked normal, so I accepted it. I didn’t check for closures.”', at: T.b2, open: T.bRow2}]},
	};
	const Q = ['1 · Suppose the port closes. Who made the call to wait?', '2 · Why did you rely on the estimate?'];

	const root = document.querySelector('#responsibility-laundering');
	const svg = root.querySelector('svg');
	const defs = el(svg, 'defs');
	el(svg, 'rect', {width: VW, height: VH, fill: C.paper});
	const sceneBase = el(svg, 'g');
	const sceneCopies = el(svg, 'g');
	const sceneTop = el(svg, 'g');

	const text = (parent, x, y, str, {fs, family = FONT.sans, weight = 400, fill = C.ink, anchor = 'start', ls = 0, style} = {}) =>
		el(parent, 'text', {x, y, 'font-family': family, 'font-size': fs, 'font-weight': weight, fill, 'text-anchor': anchor, 'letter-spacing': ls, 'data-fs': fs, ...(style ? {'font-style': style} : {})}, str);
	const mono = (parent, x, y, str, opts = {}) => text(parent, x, y, str, {fs: MONO, family: FONT.mono, weight: 600, ls: 1.1, ...opts});
	const serif = (parent, x, y, str, opts = {}) => text(parent, x, y, str, {family: FONT.serif, ...opts});
	let clipN = 0;
	const clip = (parent) => {
		const id = `rl-clip-${clipN++}`;
		const rect = el(el(defs, 'clipPath', {id}), 'rect', {width: 0});
		return {g: el(parent, 'g', {'clip-path': `url(#${id})`}), rect};
	};
	const bump = (t, t0, t1) => Math.sin(Math.PI * prog(t, t0, t1));
	const st = (col, p) => ({x: ORIGIN[col].x + p.x, y: ORIGIN[col].y + p.y});

	// ---- task card ----------------------------------------------------------
	const card = el(sceneBase, 'g');
	const cardRect = el(card, 'rect', {x: 24, y: 16, width: 416, height: 36, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.15});
	const cardLabel = mono(card, 38, 39, 'EXAMPLE TASK');
	const cardText = serif(card, 160, 39, 'Recommend when to evacuate a port city.', {fs: 15});

	// ---- note row (the second student's own note, not handed in) ------------
	const noteLabel = mono(sceneBase, 24, 74, 'THEIR OWN NOTE · NOT HANDED IN');
	const noteRule = el(sceneBase, 'line', {x1: 24, y1: 126, x2: 936, y2: 126, stroke: C.ink, 'stroke-opacity': 0.18});
	const noteNone = serif(sceneBase, 40, 104, '—', {fs: 16, fill: mixColor(C.ink, C.paper, 0.55)});
	const noteWords = [];
	NOTE.lines.forEach((ln, li) => {
		const tn = serif(sceneBase, NOTE.x, NOTE.ys[li], '', {fs: 15, fill: C.red, style: 'italic'});
		ln.split(' ').forEach((wd, wi) => noteWords.push(el(tn, 'tspan', {'fill-opacity': 0}, (wi ? ' ' : '') + wd)));
	});

	// ---- the copies (one draft that divides in two) ---------------------------
	const copy = (col) => {
		const g = el(sceneCopies, 'g');
		el(g, 'rect', {x: 3, y: 4, width: SHEET.w, height: SHEET.h, fill: C.ink, 'fill-opacity': 0.06});
		el(g, 'rect', {x: 0, y: 0, width: SHEET.w, height: SHEET.h, fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.18, 'stroke-width': 1.2});
		const lines = [];
		ROWS.forEach((row, ri) => row.forEach((s, li) => {
			const c = clip(g);
			const y = LINE_Y[ri][li];
			const band = el(c.g, 'rect', {x: TX - 2, y: y - 14, height: 19, rx: 2, fill: C.band});
			const t = serif(c.g, TX, y, s, {fs: FS, fill: C.grey});
			lines.push({c, band, t, y, ri, li, w: 0});
		}));
		const sigLine = el(g, 'line', {x1: SIG.x0, y1: SIG.y, x2: SIG.x0, y2: SIG.y, stroke: C.ink, 'stroke-opacity': 0.35});
		const squiggle = el(g, 'path', {d: SQUIGGLE, fill: 'none', stroke: C.red, 'stroke-width': 1.7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round'});
		const tag = el(g, 'text', {x: 0, y: -8, 'font-family': FONT.mono, 'font-size': MONO, 'font-weight': 600, 'letter-spacing': 1.1, 'data-fs': MONO});
		el(tag, 'tspan', {fill: C.ink}, col === 'a' ? 'FIRST STUDENT' : 'SECOND STUDENT');
		el(tag, 'tspan', {fill: C.grey}, ' · DRAFTED WITH AI');
		const weight = el(g, 'g');
		el(weight, 'path', {d: `M${WT.x + 4} 0H${WT.x + WT.w - 4}L${WT.x + WT.w} ${WT.h}H${WT.x}Z`, fill: C.ink});
		mono(weight, WT.x + WT.w / 2, 22, 'ANSWERABLE', {anchor: 'middle', fill: C.bright, ls: 0.4});
		return {g, lines, sigLine, squiggle, tag, weight, len: 0};
	};
	const copies = {a: copy('a'), b: copy('b')};

	// ---- faculty's questions and the speech panels -----------------------------
	const qs = Q.map((s, i) => serif(sceneBase, 480, i ? 370 : 350, s, {fs: 17, style: 'italic', anchor: 'middle'}));
	const speech = (col) => {
		const x = ORIGIN[col].x, w = PANEL.w, y0 = PANEL.y0, y1 = PANEL.y1, r = 8;
		const g = el(sceneBase, 'g');
		const box = el(g, 'path', {d: `M${x + r} ${y0}H${x + 18}L${x + 24} ${y0 - 8}L${x + 30} ${y0}H${x + w - r}Q${x + w} ${y0} ${x + w} ${y0 + r}V${y1 - r}Q${x + w} ${y1} ${x + w - r} ${y1}H${x + r}Q${x} ${y1} ${x} ${y1 - r}V${y0 + r}Q${x} ${y0} ${x + r} ${y0}Z`,
			fill: C.bright, stroke: C.ink, 'stroke-opacity': 0.25});
		const rows = SPEECH[col].rows.map((row, ri) => {
			const num = mono(g, x + 14, PANEL.rows[ri][0], row.n);
			const lineEls = PANEL.rows[ri].map((y) => serif(g, x + PANEL.textDx, y, '', {fs: 15}));
			return {...row, num, lineEls, words: []};
		});
		return {g, box, rows, x};
	};
	const speeches = {a: speech('a'), b: speech('b')};
	const bracketX = ORIGIN.b.x + 26;
	const bracket = el(sceneBase, 'path', {d: `M${bracketX + 5} ${PANEL.rows[1][0] - 14}H${bracketX}V${PANEL.rows[1][1] + 6}H${bracketX + 5}`, fill: 'none', stroke: C.red, 'stroke-width': 2, 'stroke-linejoin': 'miter'});
	let bracketLen = 0;

	// ---- key ------------------------------------------------------------------
	const keyGrey = el(sceneBase, 'g');
	el(keyGrey, 'rect', {x: 24, y: 514, width: 16, height: 11, fill: C.band});
	const keyGreyT = mono(keyGrey, 48, 524, 'WRITTEN BY AI', {fill: C.grey});
	const keyRed = el(sceneBase, 'g');
	const keyRedDot = el(keyRed, 'circle', {cx: 0, cy: 519.5, r: 4.5, fill: C.red});
	const keyRedT = mono(keyRed, 0, 524, 'A STUDENT’S DECISION', {fill: C.red});

	// ---- dots -------------------------------------------------------------------
	const dot = (col, label) => {
		const g = el(sceneTop, 'g');
		const ring = el(g, 'circle', {r: 5, fill: 'none', stroke: C.red, 'stroke-width': 1.5, opacity: 0});
		const c = el(g, 'circle', {r: 5, fill: C.red});
		const half = el(g, 'circle', {r: 0, fill: C.red});
		const lab = text(g, HOME[col].x + 12, HOME[col].y + 4, label, {fs: 13, weight: 600, fill: C.red});
		return {g, ring, c, half, lab};
	};
	const dots = {a: dot('a', 'First student'), b: dot('b', 'Second student')};
	let pathA = () => HOME.a, pathB = () => HOME.b;

	// ---- measure (after fonts load) -------------------------------------------
	const W = (node) => node.getComputedTextLength();
	const wrap = (str, maxW, probe) => {
		const words = str.split(' '), out = [];
		let line = '';
		for (const wd of words) {
			const tryLine = line ? `${line} ${wd}` : wd;
			probe.textContent = tryLine;
			if (line && W(probe) > maxW) { out.push(line); line = wd; } else line = tryLine;
		}
		if (line) out.push(line);
		probe.textContent = '';
		return out;
	};
	function measure() {
		for (const cp of Object.values(copies)) {
			for (const l of cp.lines) {
				l.w = W(l.t);
				set(l.band, {width: l.w + 4});
				set(l.c.rect, {x: TX - 4, y: l.y - 17, height: 24});
			}
			cp.len = cp.squiggle.getTotalLength();
			set(cp.squiggle, {'stroke-dasharray': cp.len});
		}
		set(cardText, {x: 38 + W(cardLabel) + 14});
		set(cardRect, {width: W(cardLabel) + W(cardText) + 14 + 30});
		const kx = 48 + W(keyGreyT) + 28;
		set(keyRedDot, {cx: kx});
		set(keyRedT, {x: kx + 11});
		bracketLen = bracket.getTotalLength();
		set(bracket, {'stroke-dasharray': bracketLen});
		// Speech: wrap each answer to its panel and split it into words on the clock.
		for (const s of Object.values(speeches)) {
			for (const row of s.rows) {
				const maxW = PANEL.w - PANEL.textDx - 16;
				let lines = wrap(row.str, maxW, row.lineEls[0]);
				if (lines.length === 2) {
					// Balance two lines so no word is left alone on the second.
					for (let w2 = maxW; w2 > maxW * 0.5; w2 -= 6) {
						const tryL = wrap(row.str, w2, row.lineEls[0]);
						if (tryL.length > 2) break;
						lines = tryL;
					}
				}
				lines = lines.slice(0, 2);
				row.words = [];
				lines.forEach((ln, li) => {
					const tn = row.lineEls[li];
					tn.textContent = '';
					ln.split(' ').forEach((wd, wi) => row.words.push(el(tn, 'tspan', {'fill-opacity': 0}, (wi ? ' ' : '') + wd)));
				});
			}
		}
		// Dot paths: both read the same lines at the same pace.
		const lw = copies.a.lines.map((l) => l.w);
		const under = (col, i, end) => st(col, {x: TX + (end ? lw[i] : 0), y: copies.a.lines[i].y + READ_DY});
		const readSegs = (col) => {
			const segs = [[T.onto[0], T.onto[1], HOME[col], under(col, 0, false), E.inOut]];
			T.read.forEach(([t0, t1], i) => {
				if (i) segs.push([t0, t0 + 0.1, under(col, i - 1, true), under(col, i, false), E.inOut]);
				segs.push([i ? t0 + 0.1 : t0, t1, under(col, i, false), under(col, i, true)]);
			});
			return segs;
		};
		const endRead = (col) => under(col, 3, true);
		const signSegs = (col, [t0, t1], from, toSig) => {
			const tm = t0 + (t1 - t0) * 0.7;
			return [
				[toSig[0], toSig[1], from, st(col, SIG.start), E.inOut],
				[t0, tm, st(col, SIG.start), st(col, SIG.end)],
				[tm, t1, st(col, SIG.end), st(col, SIG.dot), E.inOut],
			];
		};
		pathA = pathAt([...readSegs('a'), ...signSegs('a', T.aSign, endRead('a'), T.aToSig)], HOME.a);
		pathB = pathAt([
			...readSegs('b'),
			[T.bUp[0], T.bUp[1], endRead('b'), NOTE.dot, E.inOut],
			...signSegs('b', T.bSign, NOTE.dot, T.bDown),
		], HOME.b);
	}

	// ---- render ------------------------------------------------------------------
	const render = (t) => {
		const kc = prog(t, ...T.card, E.house);
		set(card, {opacity: kc, transform: `translate(0 ${mix(6, 0, kc)})`});

		// The draft: one sheet at centre stage, which divides into the two copies.
		const kSheet = prog(t, ...T.sheet);
		const kDiv = prog(t, ...T.divide, E.inOut);
		for (const [col, cp] of Object.entries(copies)) {
			const o = ORIGIN[col];
			const x = mix(BIG.x, o.x, kDiv), y = mix(BIG.y, o.y, kDiv), s = mix(BIG.s, 1, kDiv);
			// Before the divide the two copies lie exactly on top of each other.
			set(cp.g, {transform: `translate(${x} ${y}) scale(${s})`, opacity: col === 'b' && kDiv === 0 ? 0 : kSheet});
			cp.lines.forEach((l, i) => {
				const span = l.ri ? T.row2 : T.row1, mid = (span[0] + span[1]) / 2;
				const k = l.li ? prog(t, mid, span[1]) : prog(t, span[0], mid);
				set(l.c.rect, {width: (l.w + 8) * k});
			});
			set(cp.sigLine, {x2: mix(SIG.x0, SIG.x1, prog(t, ...T.sigLine, E.inOut))});
			const sign = col === 'a' ? T.aSign : T.bSign;
			const kSig = prog(t, sign[0], sign[0] + (sign[1] - sign[0]) * 0.7);
			set(cp.squiggle, {'stroke-dashoffset': cp.len * (1 - kSig), opacity: kSig > 0 ? 1 : 0});
			set(cp.tag, {opacity: prog(t, ...T.tags)});
		}

		// Beat 4: the second student's note, in its own row, kept to the end.
		const nN = noteWords.length;
		noteWords.forEach((w, i) => { const ti = T.note[0] + ((T.note[1] - T.note[0]) * i) / nN; set(w, {'fill-opacity': prog(t, ti, ti + 0.15)}); });
		set(noteLabel, {opacity: prog(t, ...T.noteLabel)});
		set(noteNone, {opacity: prog(t, ...T.noteLabel)});
		set(noteRule, {opacity: prog(t, ...T.noteLabel)});

		// Faculty's questions and the two rounds of answers.
		set(qs[0], {opacity: prog(t, ...T.q1), transform: `translate(0 ${mix(6, 0, prog(t, ...T.q1, E.house))})`});
		set(qs[1], {opacity: prog(t, ...T.q2), transform: `translate(0 ${mix(6, 0, prog(t, ...T.q2, E.house))})`});
		for (const [col, s] of Object.entries(speeches)) {
			const pulse = bump(t, ...(col === 'a' ? T.aPulse : T.bPulse));
			set(s.g, {opacity: prog(t, ...s.rows[0].open)});
			set(s.box, {'stroke-opacity': 0.25 + 0.6 * pulse, 'stroke-width': 1 + 0.8 * pulse});
			for (const row of s.rows) {
				set(row.num, {opacity: prog(t, ...row.open)});
				const [t0, t1] = row.at, n = row.words.length;
				row.words.forEach((w, i) => { const ti = t0 + ((t1 - t0) * i) / n; set(w, {'fill-opacity': prog(t, ti, ti + 0.15)}); });
			}
		}
		const kBr = prog(t, ...T.bracket, E.inOut);
		set(bracket, {'stroke-dashoffset': bracketLen * (1 - kBr), opacity: kBr > 0 ? 1 : 0});

		// Key.
		set(keyGrey, {opacity: prog(t, ...T.keyGrey)});
		set(keyRed, {opacity: prog(t, ...T.keyRed)});

		// Beat 8: a weight per copy, in that copy's own units. The first falls, then the second.
		const kW = prog(t, ...T.weights);
		const fallY = (span, rest) => {
			const k = prog(t, ...span, (x) => x * x);
			return mix(WT.hang, WT.rest, k) - 2 * bump(t, ...rest);
		};
		const wyA = fallY(T.aFall, T.aRest), wyB = fallY(T.bFall, T.bRest);
		set(copies.a.weight, {opacity: kW, transform: `translate(0 ${wyA})`});
		set(copies.b.weight, {opacity: kW, transform: `translate(0 ${wyB})`});

		// Dots.
		const kDots = prog(t, ...T.dots, E.house);
		const labelOff = prog(t, ...T.onto);
		const pulseK = prog(t, ...T.pulse);
		for (const [col, d] of Object.entries(dots)) {
			const p = (col === 'a' ? pathA : pathB)(t);
			set(d.g, {opacity: kDots});
			set(d.ring, {cx: p.x, cy: p.y, r: 5 + 10 * pulseK, opacity: pulseK > 0 && pulseK < 1 ? 1 - pulseK : 0});
			set(d.lab, {opacity: 1 - labelOff});
			set(d.c, {cx: p.x, cy: p.y, r: 5 * Math.min(1, kDots * 1.2)});
			set(d.half, {r: 0});
		}
		// Beat 7: the first student's dot splits; half moves beside the AI's phrase.
		// Beat 8: the first weight collects that half, and the halves rejoin under it.
		const kSplit = prog(t, ...T.split, E.inOut);
		if (t >= T.split[0]) {
			const base = st('a', SIG.dot), beside = st('a', HALF);
			const kMerge = prog(t, ...T.aRest, E.inOut);
			let hp = {x: mix(base.x, beside.x, kSplit), y: mix(base.y, beside.y, kSplit)};
			const bottom = wyA + WT.h;
			if (bottom + 3.5 > HALF.y) hp = st('a', {x: HALF.x, y: Math.min(bottom + 3.5, SIG.dot.y)});
			if (kMerge > 0) hp = {x: mix(st('a', {x: HALF.x, y: 0}).x, base.x, kMerge), y: mix(hp.y, base.y, kMerge)};
			const rSmall = mix(5, 3.5, prog(t, T.split[0], T.split[0] + 0.3));
			set(dots.a.c, {r: mix(rSmall, 5, kMerge)});
			set(dots.a.half, {cx: hp.x, cy: hp.y, r: kMerge >= 1 ? 0 : mix(3.5, 5, kMerge)});
		}

		renderNarrow(t);
	};

	// ---- the stacked text stage ---------------------------------------------------------
	// A fixed layout: every section is placed from the start and only fades in, so its
	// height never changes. The draft card lies over the two copies until it divides.
	const narrow = root.querySelector('[data-rl-narrow]');
	const h = (tag, cls, parent, txt) => { const n = document.createElement(tag); if (cls) n.className = cls; if (txt != null) n.textContent = txt; parent.append(n); return n; };
	const N = {};
	const body = h('div', 'rl-n-body', narrow);
	{
		const s = N.task = h('div', 'rl-n-sec', body);
		const p = h('p', 'rl-n-task', s);
		h('span', 'rl-n-label', p, 'Example task');
		p.append('Recommend when to evacuate a port city.');
	}
	{
		const s = h('div', 'rl-n-sec rl-n-pair', body);
		N.names = ['First student', 'Second student'].map((n) => h('p', 'rl-n-label rl-n-red', s, `● ${n}`));
	}
	{
		const s = h('div', 'rl-n-sec', body);
		N.noteLabel = h('p', 'rl-n-label', s, 'Their own note · not handed in');
		const pair = h('div', 'rl-n-pair', s);
		N.none = h('p', 'rl-n-none', h('div', 'rl-n-col', pair), '—');
		const note = h('p', 'rl-n-note', h('div', 'rl-n-col', pair));
		N.noteWords = NOTE.lines.join(' ').split(' ').map((wd, i) => h('span', null, note, (i ? ' ' : '') + wd));
	}
	{
		const s = h('div', 'rl-n-sec rl-n-stack', body);
		const pair = h('div', 'rl-n-pair', s);
		const sq = (parent) => {
			const svgN = el(parent, 'svg', {viewBox: '82 144 128 28', width: 46, height: 10, 'aria-hidden': 'true'});
			return el(svgN, 'path', {d: SQUIGGLE, fill: 'none', stroke: C.red, 'stroke-width': 4, 'stroke-linecap': 'round', pathLength: 1, 'stroke-dasharray': 1, 'stroke-dashoffset': 1});
		};
		const cardN = (col) => {
			const c = h('div', 'rl-n-card', pair);
			h('p', 'rl-n-tag rl-n-grey', c, 'Drafted with AI');
			const r1 = h('p', 'rl-n-row', c);
			const half = col === 'a' ? h('span', 'rl-n-half', r1) : null;
			h('span', 'rl-n-band', r1, 'The analysis estimates ships can carry everyone out.');
			const r2 = h('p', 'rl-n-row', c);
			h('span', 'rl-n-band', r2, 'It is recommended that civilians wait for ships.');
			const sig = h('div', 'rl-n-sig', c);
			const dotN = h('span', 'rl-n-dot', sig);
			const di = h('i', null, dotN);
			const squig = sq(sig);
			const chip = h('span', 'rl-n-chip', sig, 'Answerable');
			return {c, half, di, squig, chip};
		};
		N.cards = {a: cardN('a'), b: cardN('b')};
		const d = N.draft = h('div', 'rl-n-draft', s);
		h('p', 'rl-n-tag rl-n-grey', d, 'One AI draft');
		N.draftRows = ['The analysis estimates ships can carry everyone out.', 'It is recommended that civilians wait for ships.'].map((x) => { const r = h('p', 'rl-n-row', d); h('span', 'rl-n-band', r, x); return r; });
	}
	{
		const s = h('div', 'rl-n-sec', body);
		N.q = Q.map((x) => h('p', 'rl-n-q', s, x));
	}
	{
		const s = h('div', 'rl-n-sec rl-n-pair', body);
		N.say = ['a', 'b'].map((k) => {
			const box = h('div', 'rl-n-say', s);
			return {box, lines: SPEECH[k].rows.map((r) => h('p', 'rl-n-line', box, `${r.n} · ${r.str}`))};
		});
	}
	{
		const s = h('div', 'rl-n-key', body);
		N.keyGrey = h('span', 'rl-n-grey', s); h('i', 'sw', N.keyGrey); N.keyGrey.append('Written by AI');
		N.keyRed = h('span', 'rl-n-red', s); h('i', 'rd', N.keyRed); N.keyRed.append('A student’s decision');
	}
	const op = (node, k) => { node.style.opacity = Math.max(0, Math.min(1, k)).toFixed(3); };
	function renderNarrow(t) {
		if (!root.classList.contains('is-stacked')) return;
		op(N.task, prog(t, ...T.card));
		N.names.forEach((n) => op(n, prog(t, ...T.dots)));
		op(N.noteLabel, prog(t, ...T.noteLabel));
		op(N.none, prog(t, ...T.noteLabel));
		const nW = N.noteWords.length;
		N.noteWords.forEach((w, i) => { const ti = T.note[0] + ((T.note[1] - T.note[0]) * i) / nW; op(w, prog(t, ti, ti + 0.15)); });
		const kDiv = prog(t, ...T.divide);
		op(N.draft, prog(t, ...T.sheet) * (1 - kDiv));
		N.draft.style.visibility = kDiv >= 1 ? 'hidden' : 'visible';
		op(N.draftRows[0], prog(t, ...T.row1));
		op(N.draftRows[1], prog(t, ...T.row2));
		for (const [col, cd] of Object.entries(N.cards)) {
			op(cd.c, kDiv);
			const sign = col === 'a' ? T.aSign : T.bSign;
			cd.squig.setAttribute('stroke-dashoffset', (1 - prog(t, sign[0], sign[0] + (sign[1] - sign[0]) * 0.7)).toFixed(3));
			op(cd.di, t >= sign[1] ? 1 : 0);
			const fall = col === 'a' ? T.aFall : T.bFall;
			const kChip = prog(t, fall[0], fall[1], (x) => x * x);
			op(cd.chip, kChip);
			cd.chip.style.transform = `translateY(${mix(-8, 0, kChip).toFixed(1)}px)`;
		}
		// The first card: the signature dot halves (beat 7) and is whole again (beat 8).
		const split = t >= T.split[0] && t < T.aRest[1];
		N.cards.a.half.style.visibility = split ? 'visible' : 'hidden';
		N.cards.a.di.style.transform = split ? 'scale(0.7)' : '';
		N.q.forEach((q, i) => op(q, prog(t, ...(i ? T.q2 : T.q1))));
		N.say.forEach((s, ci) => {
			const rows = SPEECH[ci ? 'b' : 'a'].rows;
			op(s.box, prog(t, ...rows[0].open));
			s.lines.forEach((ln, ri) => op(ln, prog(t, ...rows[ri].at)));
		});
		N.say[1].lines[1].classList.toggle('is-marked', t >= T.bracket[0]);
		op(N.keyGrey, prog(t, ...T.keyGrey));
		op(N.keyRed, prog(t, ...T.keyRed));
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
		{at: BEAT_AT[0], text: 'Two students get the same task.',
			detail: 'a task card appears at the top left: "Example task: Recommend when to evacuate a port city." Two red dots appear, labelled First student and Second student.'},
		{at: BEAT_AT[1], text: 'Suppose both give an AI the same prompt and get the same draft.',
			detail: 'both dots pulse. A sheet fills at the centre in grey on a beige band, and a key below names that band "Written by AI": "The analysis estimates ships can carry everyone out." "It is recommended that civilians wait for ships." It divides into two identical copies, labelled "First student, drafted with AI" and "Second student, drafted with AI".'},
		{at: BEAT_AT[2], text: 'Both students read it closely and agree.',
			detail: 'both dots read along every line of their copies, at the same pace and at the same time. Nothing changes.'},
		{at: BEAT_AT[3], text: 'The first student signs. The second notes what the estimate rests on, then signs.',
			detail: 'the first dot signs in red, and the key adds "A student\'s decision" in red. The second dot moves above its copy and writes a red note, "Rests on an open port. Harbor reports: normal.", in a row labelled "Their own note, not handed in"; the first student\'s cell shows a dash. Then the second dot signs. The note stays.'},
		{at: BEAT_AT[4], text: 'Faculty see only the papers. They ask who made the call.',
			detail: '"1. Suppose the port closes. Who made the call to wait?" The first student says, "I signed it. The analysis estimated the ships could do it." The second says, "I did. I chose to rely on the estimate."'},
		{at: BEAT_AT[5], text: 'Then they ask why.',
			detail: '"2. Why did you rely on the estimate?" The first student says, "It was the AI\'s estimate. It seemed solid." The second says, "It assumes an open port. Harbor reports looked normal, so I accepted it. I didn\'t check for closures."'},
		{at: BEAT_AT[6], text: 'The first leans on the AI. The second explains why they relied.',
			detail: 'the first student\'s dot splits in two; one half stays on the signature line and the other moves beside "The analysis estimates". A red bracket marks the second student\'s second answer.'},
		{at: BEAT_AT[7], text: 'Suppose it proves wrong. The AI can\'t answer for it. Both students will.',
			detail: 'a navy weight labelled "Answerable" falls down the first paper\'s margin, collects the half dot and rests on the first student, whose dot is whole again. A second weight falls down the second paper\'s margin and rests on the second student.'},
		{at: BEAT_AT[8], text: 'Faculty check: Who owns the recommendation if it proves wrong?',
			list: 'Faculty check: Who owns the recommendation if it proves wrong? Name one way it could prove wrong. Ask why they relied on it.',
			detail: 'the questions appear under the picture at the same size. Both papers, the note, all four answers and both weights stay in view.',
			check: {label: 'Faculty check', question: 'Who owns the recommendation if it proves wrong?', follow: 'Name one way it could prove wrong. Ask why they relied on it.', followAt: T.follow}},
	];

	document.fonts.ready.then(() => {
		measure();
		legibility(root, svg, VW, 11);
		new ResizeObserver(syncStacked).observe(svg);
		syncStacked();
		mount(root, {duration: T.end, render, beats: BEATS, poster: BEAT_AT[2] - 0.02});
	});
})();
