/* Institutional monoculture: "Turn the seminar" (CSS 3D sketch).
   Thirty essays differ on the surface. Turned to show how each one defines
   the problem, they share one plane, and the other planes stand empty. */
(() => {
	const {mount, E, mix, prog, spring, isReduced} = MotionFigures;
	const T = {in: 0.1, turn: 2.6, turnDur: 2.4, plane: 4.9, empty: 5.6, check: 6.9, end: 9.4};
	const root = document.querySelector('#monoculture');
	const stage = root.querySelector('.mono-stage');
	const world = stage.querySelector('.mono-world');

	// Deterministic variety: widths, heights, structure.
	let seed = 7;
	const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
	const tiles = [];
	for (let r = 0; r < 5; r++) {
		for (let c = 0; c < 6; c++) {
			const w = 64 + rnd() * 40, h = 46 + rnd() * 34;
			const tile = document.createElement('div');
			tile.className = 'mono-tile';
			tile.style.width = `${w}px`;
			tile.style.height = `${h}px`;
			tile.style.margin = `${-h / 2}px 0 0 ${-w / 2}px`;
			const kind = Math.floor(rnd() * 4);
			const lines = 2 + Math.floor(rnd() * 4);
			if (kind === 0) tile.append(Object.assign(document.createElement('b'), {className: 'mono-head'}));
			if (kind === 1) tile.append(Object.assign(document.createElement('em'), {className: 'mono-chart'}));
			for (let i = 0; i < lines; i++) {
				const line = document.createElement('i');
				line.style.width = `${55 + rnd() * 45}%`;
				tile.append(line);
			}
			if (kind === 2) tile.classList.add('is-bullets');
			if (kind === 3) tile.classList.add('is-dense');
			world.append(tile);
			tiles.push({el: tile, x: -300 + c * 120 + (rnd() - 0.5) * 30, y: -150 + r * 75 + (rnd() - 0.5) * 18, z: (rnd() - 0.5) * 6, d: rnd()});
		}
	}
	// Planes where other problem definitions could sit.
	const planes = [-300, -150, 150, 300].map((z) => {
		const p = document.createElement('div');
		p.className = 'mono-plane is-empty';
		world.append(p);
		return {el: p, z};
	});
	const shared = document.createElement('div');
	shared.className = 'mono-plane is-shared';
	world.append(shared);
	const labelShared = root.querySelector('[data-mono-shared]');
	const labelEmpty = root.querySelector('[data-mono-empty]');
	const check = root.querySelector('[data-mono-check]');

	const fit = () => stage.style.setProperty('--k', (stage.clientWidth / 800).toFixed(4));
	new ResizeObserver(fit).observe(stage);
	fit();

	const render = (t) => {
		const turn = prog(t, T.turn, T.turn + T.turnDur, E.inOutStrong);
		const ry = mix(-8, -80, turn);
		const rx = mix(6, 9, turn);
		const zoom = mix(1, 0.6, turn);
		world.style.transform = `scale(calc(var(--k) * ${zoom.toFixed(4)})) rotateX(${rx}deg) rotateY(${ry}deg)`;
		tiles.forEach((tile) => {
			const k = spring(t, T.in + tile.d * 1.1, {stiffness: 200, damping: 20});
			tile.el.style.opacity = Math.min(1, k * 1.4).toFixed(3);
			tile.el.style.transform = `translate3d(${tile.x}px, ${tile.y}px, ${tile.z + (1 - k) * 80}px)`;
		});
		const s = prog(t, T.plane, T.plane + 0.6, E.house);
		shared.style.opacity = s.toFixed(3);
		labelShared.style.opacity = s.toFixed(3);
		planes.forEach((p, i) => {
			const e = prog(t, T.empty + i * 0.12, T.empty + 0.5 + i * 0.12, E.house);
			p.el.style.opacity = e.toFixed(3);
			p.el.style.transform = `translateZ(${p.z * mix(0.6, 1, e)}px)`;
		});
		labelEmpty.style.opacity = prog(t, T.empty + 0.4, T.empty + 0.9).toFixed(3);
		const c = prog(t, T.check, T.check + 0.5, E.house);
		check.style.opacity = c.toFixed(3);
		check.style.translate = `0 ${mix(8, 0, c).toFixed(1)}px`;
	};

	document.fonts.ready.then(() =>
		mount(root, {
			duration: T.end,
			render,
			beats: [
				{at: 0, text: 'Thirty essays. Different arguments, structures and evidence.'},
				{at: 2.5, text: 'Turn them to see how each one defines the problem.'},
				{at: 4.9, text: 'They share one frame. The other frames stand empty.'},
				{at: 6.9, text: 'Faculty check: What frames are missing across the seminar?'},
			],
		}),
	);
})();
