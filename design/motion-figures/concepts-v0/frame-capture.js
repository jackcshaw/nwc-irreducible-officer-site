/* Frame capture: "The crop".
   The camera starts tight on the model's frame, so the viewer accepts it too.
   The student (red) does real work inside it. Then the camera pulls back. */
(() => {
	const {mount, E, mix, prog, spring, mixRgb, css, el, set, FONT} = MotionFigures;
	const C = {paper: '#f6f1e8', bright: '#fffdfa', ink: '#0a2242', red: '#b81b2b', stone: '#5b564f', faintText: '#847d74', faint: '#d7d0c4'};

	const F = {x: 250, y: 128, w: 300, h: 170}; // the model's frame, in world units (viewBox 800x450)
	const T = {snap: 0.25, enter: 0.95, rev0: 1.45, rev1: 2.55, rev2: 3.6, rev2b: 4.15, pull: 4.85, pullDur: 1.5, tag: 6.1, check: 6.6, end: 8.8};

	// Three drafts of the same six lines: ragged, then aligned, then justified.
	const D = [
		{x: [0, 5, -2, 9, 2, 0], w: [196, 158, 184, 116, 170, 86], y0: 172, dy: 12.5, c: '#cdc6ba'},
		{x: [0, 0, 0, 0, 0, 0], w: [200, 194, 204, 180, 198, 130], y0: 184, dy: 12, c: '#b3aca1'},
		{x: [0, 0, 0, 0, 0, 0], w: [206, 206, 206, 206, 206, 140], y0: 184, dy: 12, c: '#978f84'},
	];
	const LX = 264;
	const CHART = {x: 488, base: 249, h: [38, 26, 50, 32]};
	const SPR = {stiffness: 240, damping: 22};

	const root = document.querySelector('#frame-capture');
	const svg = root.querySelector('svg');

	el(svg, 'rect', {width: 800, height: 450, fill: C.paper});
	const cam = el(svg, 'g');

	// More of the situation, all outside the first frame.
	const scatter = [[150, 120], [96, 210], [176, 286], [70, 300], [690, 150], [742, 230], [652, 300], [716, 320], [300, 60], [470, 44], [380, 80], [330, 360], [470, 372], [520, 330], [130, 410], [690, 420], [240, 330]];
	scatter.forEach(([x, y], i) => el(cam, 'circle', {cx: x, cy: y, r: 2 + (i % 3) * 0.8, fill: C.faint}));

	const chip = (parent, x, y, text, size, style) => {
		const g = el(parent, 'g');
		const box = el(g, 'rect', {x, y, height: size * 1.85, rx: 2, fill: style.fill, stroke: style.stroke, 'stroke-width': style.sw, 'stroke-dasharray': style.dash || 'none'});
		const label = el(g, 'text', {x: x + size * 0.75, y: y + size * 1.27, fill: style.text, 'font-family': FONT.sans, 'font-weight': 600, 'font-size': size}, text);
		g.fit = () => box.setAttribute('width', label.getComputedTextLength() + size * 1.5);
		return g;
	};
	const outside = [
		[36, 44, 'Alliance dynamics'],
		[612, 58, 'Domestic politics'],
		[34, 350, 'A constraint treated as fixed'],
		[578, 358, 'Whose interests count'],
	].map(([x, y, text]) => chip(cam, x, y, text, 15, {fill: C.paper, stroke: C.faintText, sw: 1.2, dash: '4 3', text: C.faintText}));
	const inside = [
		[264, 139, 'Adversary behavior'],
		[378, 139, 'Historical precedent'],
	].map(([x, y, text]) => chip(cam, x, y, text, 9.5, {fill: C.bright, stroke: 'rgba(10,34,66,.55)', sw: 0.8, text: C.ink}));

	const heading = el(cam, 'rect', {x: LX, y: 168, height: 6, rx: 3, fill: C.ink});
	const lines = D[0].w.map(() => el(cam, 'rect', {height: 5, rx: 2.5}));
	const bars = CHART.h.map((_, j) => el(cam, 'rect', {x: CHART.x + j * 12, width: 8, fill: j === 2 ? C.ink : '#978f84'}));
	const conclusion = el(cam, 'rect', {x: LX, y: 263, height: 7, rx: 3.5, fill: C.ink});
	const draftLabel = el(cam, 'text', {x: 538, y: 290, 'text-anchor': 'end', fill: C.stone, 'font-family': FONT.mono, 'font-size': 7.5, 'letter-spacing': 1.2});

	// The student's edits leave change bars in the margin.
	const change = [0, 1, 2].map(() => el(cam, 'rect', {x: 255.5, width: 2.2, fill: C.red}));
	const brackets = el(cam, 'path', {fill: 'none', stroke: C.stone, 'stroke-width': 2.4, 'stroke-linecap': 'square'});
	const tag = el(cam, 'text', {x: F.x, y: F.y - 9, fill: C.stone, 'font-family': FONT.mono, 'font-size': 10, 'letter-spacing': 1.5}, 'FIRST FRAME');
	const dot = el(cam, 'circle', {r: 4, fill: C.red});

	const check = el(svg, 'g');
	el(check, 'text', {x: 400, y: 407, 'text-anchor': 'middle', fill: C.red, 'font-family': FONT.mono, 'font-size': 10.5, 'font-weight': 600, 'letter-spacing': 2}, 'FACULTY CHECK');
	el(check, 'text', {x: 400, y: 434, 'text-anchor': 'middle', fill: C.ink, 'font-family': FONT.serif, 'font-size': 21, 'font-style': 'italic'}, 'What problem did the student choose to solve?');

	const bracketPath = ({x, y, w, h}, a = 20) =>
		`M${x} ${y + a}V${y}H${x + a}M${x + w - a} ${y}H${x + w}V${y + a}M${x + w} ${y + h - a}V${y + h}H${x + w - a}M${x + a} ${y + h}H${x}V${y + h - a}`;

	const lineY = (i, d) => D[d].y0 + D[d].dy * i;
	const lineAt = (i, t) => {
		const k1 = spring(t, T.rev1, SPR);
		const k2 = spring(t, T.rev2 + 0.05, SPR);
		const pick = (f) => mix(mix(f(0), f(1), k1), f(2), k2);
		const written = prog(t, T.rev0 + 0.12 * i, T.rev0 + 0.12 * (i + 1));
		return {
			x: pick((d) => LX + D[d].x[i]),
			y: pick((d) => lineY(i, d)),
			w: pick((d) => D[d].w[i]) * written,
			c: css(mixRgb(mixRgb(D[0].c, D[1].c, k1), D[2].c, k2)),
		};
	};

	// The red dot's path: wait, enter, then edit draft by draft.
	const start = {x: 234, y: 242};
	const segs = [[T.enter, T.enter + 0.4, start, {x: LX, y: 174.5}, E.inOut]];
	D[0].w.forEach((w, i) => {
		const y = lineY(i, 0) + 2.5, x = LX + D[0].x[i];
		segs.push([T.rev0 + 0.12 * i, T.rev0 + 0.12 * (i + 1), {x, y}, {x: x + w, y}, E.linear]);
	});
	const endOfDraft1 = {x: LX + 86, y: lineY(5, 0) + 2.5};
	segs.push([T.rev1, T.rev1 + 0.15, endOfDraft1, {x: LX, y: 171}, E.inOut]);
	segs.push([T.rev1 + 0.15, T.rev1 + 0.45, {x: LX, y: 171}, {x: LX + 110, y: 171}, E.outCubic]);
	segs.push([T.rev2, T.rev2 + 0.15, {x: LX + 110, y: 171}, {x: CHART.x, y: 214}, E.inOut]);
	segs.push([T.rev2 + 0.15, T.rev2 + 0.45, {x: CHART.x, y: 214}, {x: CHART.x + 44, y: 214}, E.outCubic]);
	segs.push([T.rev2b, T.rev2b + 0.15, {x: CHART.x + 44, y: 214}, {x: LX, y: 266.5}, E.inOut]);
	segs.push([T.rev2b + 0.15, T.rev2b + 0.5, {x: LX, y: 266.5}, {x: LX + 182, y: 266.5}, E.outCubic]);
	const dotAt = (t) => {
		let p = start;
		for (const [t0, t1, a, b, ease] of segs) {
			if (t < t0) break;
			const k = prog(t, t0, t1, ease);
			p = {x: mix(a.x, b.x, k), y: mix(a.y, b.y, k)};
		}
		return p;
	};

	const render = (t) => {
		// Camera: tight on the frame, then the pull-back.
		const k = prog(t, T.pull, T.pull + T.pullDur, E.inOutStrong);
		const s = mix(2, 1, k), cx = mix(400, 400, k), cy = mix(213, 225, k);
		set(cam, {transform: `translate(400 225) scale(${s.toFixed(4)}) translate(${-cx} ${-cy})`});

		// The model's frame snaps on before the student moves.
		const snap = spring(t, T.snap, {stiffness: 420, damping: 24});
		const R0 = {x: 206, y: 106, w: 388, h: 214};
		const r = {x: mix(R0.x, F.x, snap), y: mix(R0.y, F.y, snap), w: mix(R0.w, F.w, snap), h: mix(R0.h, F.h, snap)};
		set(brackets, {d: bracketPath(r), opacity: prog(t, T.snap, T.snap + 0.06)});

		lines.forEach((node, i) => {
			const l = lineAt(i, t);
			set(node, {x: l.x, y: l.y, width: Math.max(0, l.w), fill: l.c});
		});
		set(heading, {width: 110 * prog(t, T.rev1 + 0.15, T.rev1 + 0.45, E.outCubic)});
		bars.forEach((node, j) => {
			const g = prog(t, T.rev2 + 0.15 + 0.07 * j, T.rev2 + 0.4 + 0.07 * j, E.outCubic);
			const h = CHART.h[j] * g;
			set(node, {y: CHART.base - h, height: h});
		});
		set(conclusion, {width: 182 * prog(t, T.rev2b + 0.15, T.rev2b + 0.5, E.outCubic)});
		draftLabel.textContent = `DRAFT ${t < T.rev1 ? 1 : t < T.rev2 ? 2 : 3}`;
		set(draftLabel, {opacity: prog(t, T.rev0, T.rev0 + 0.2)});

		const top = lineAt(0, t).y - 2, bottom = lineAt(5, t).y + 7;
		set(change[0], {y: top, height: Math.max(0, (bottom - top) * prog(t, T.rev0, T.rev0 + 0.72))});
		set(change[1], {y: 166, height: 10 * prog(t, T.rev1 + 0.4, T.rev1 + 0.5)});
		set(change[2], {y: 261, height: 11 * prog(t, T.rev2b + 0.45, T.rev2b + 0.55)});

		const p = dotAt(t);
		set(dot, {cx: p.x, cy: p.y});

		const reveal = prog(t, T.pull + 0.3, T.pull + T.pullDur);
		outside.forEach((g) => set(g, {opacity: mix(0.35, 1, reveal)}));
		set(tag, {opacity: prog(t, T.tag, T.tag + 0.4)});
		const c = prog(t, T.check, T.check + 0.5, E.house);
		set(check, {opacity: c, transform: `translate(0 ${mix(8, 0, c)})`});
	};

	document.fonts.ready.then(() => {
		[...outside, ...inside].forEach((g) => g.fit());
		mount(root, {
			duration: T.end,
			render,
			beats: [
				{at: 0, text: 'The model offers a reasonable frame.'},
				{at: 1.4, text: 'The student revises. Each draft is better than the last.'},
				{at: 4.8, text: 'Every revision stayed inside the first frame.'},
				{at: 6.6, text: 'Faculty check: What problem did the student choose to solve?'},
			],
		});
	});
})();
