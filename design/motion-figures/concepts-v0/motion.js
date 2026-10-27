/* Judgment Lab motion figures: shared runtime (prototype).

   A figure is a pure function of time: figure.render(t) sets every attribute
   for time t in seconds. Because nothing depends on the previous frame, the
   same figure can be played, paused, scrubbed, jumped to a beat, tested at a
   fixed time, or rendered frame by frame to video.

   The runtime plays a figure once when it is mostly in view, then rests on
   its final frame. The final frame is designed to carry the idea by itself:
   it is the reduced-motion view, the print view and the poster.

   Test hooks: ?t=4.2 renders that moment and holds; ?reduced forces the
   reduced-motion path. */
(() => {
	const params = new URLSearchParams(location.search);
	const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');
	const isReduced = () => params.has('reduced') || reducedQuery.matches;

	// ---- easing (same curves as the reel's src/lib/ease.ts) ----------------
	const bezier = (x1, y1, x2, y2) => {
		const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
		const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
		const sx = (t) => ((ax * t + bx) * t + cx) * t;
		const sy = (t) => ((ay * t + by) * t + cy) * t;
		const dx = (t) => (3 * ax * t + 2 * bx) * t + cx;
		const solve = (x) => {
			let t = x;
			for (let i = 0; i < 8; i++) {
				const e = sx(t) - x;
				if (Math.abs(e) < 1e-6) return t;
				const d = dx(t);
				if (Math.abs(d) < 1e-6) break;
				t -= e / d;
			}
			let lo = 0, hi = 1;
			t = x;
			for (let i = 0; i < 30; i++) {
				if (sx(t) < x) lo = t; else hi = t;
				t = (lo + hi) / 2;
			}
			return t;
		};
		return (x) => (x <= 0 ? 0 : x >= 1 ? 1 : sy(solve(x)));
	};
	const E = {
		house: bezier(0.23, 1, 0.32, 1), // the site's --ease-out
		inOut: bezier(0.65, 0, 0.35, 1),
		inOutStrong: bezier(0.76, 0, 0.24, 1),
		outCubic: bezier(0.33, 1, 0.68, 1),
		linear: (t) => t,
	};
	const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
	const clamp01 = (t) => clamp(t, 0, 1);
	const mix = (a, b, t) => a + (b - a) * t;
	/** Eased progress of t across [t0, t1] seconds. */
	const prog = (t, t0, t1, ease = E.linear) => ease(clamp01((t - t0) / (t1 - t0)));
	/** Analytic damped spring from 0 to 1 starting at t0 seconds. */
	const spring = (t, t0, {stiffness = 170, damping = 26} = {}) => {
		const s = t - t0;
		if (s <= 0) return 0;
		const w0 = Math.sqrt(stiffness);
		const z = damping / (2 * w0);
		if (z < 1) {
			const wd = w0 * Math.sqrt(1 - z * z);
			return 1 - Math.exp(-z * w0 * s) * (Math.cos(wd * s) + ((z * w0) / wd) * Math.sin(wd * s));
		}
		return 1 - Math.exp(-w0 * s) * (1 + w0 * s);
	};
	const rgb = (c) => (Array.isArray(c) ? c : [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16)));
	/** Blend colours (hex or [r,g,b]); returns [r,g,b] so blends can chain. */
	const mixRgb = (a, b, t) => rgb(a).map((v, i) => mix(v, rgb(b)[i], clamp01(t)));
	const css = (c) => `rgb(${rgb(c).map(Math.round).join(',')})`;
	const mixColor = (a, b, t) => css(mixRgb(a, b, t));

	// ---- SVG helpers -------------------------------------------------------
	const NS = 'http://www.w3.org/2000/svg';
	const el = (parent, tag, attrs = {}, text) => {
		const node = document.createElementNS(NS, tag);
		for (const k in attrs) node.setAttribute(k, attrs[k]);
		if (text != null) node.textContent = text;
		parent.appendChild(node);
		return node;
	};
	const set = (node, attrs) => {
		for (const k in attrs) node.setAttribute(k, typeof attrs[k] === 'number' ? +attrs[k].toFixed(2) : attrs[k]);
	};

	// ---- player ------------------------------------------------------------
	function mount(root, figure) {
		const {beats, duration} = figure;
		const toggle = root.querySelector('[data-mf-toggle]');
		const list = root.querySelector('[data-mf-beats]');
		const beatButtons = beats.map((b, i) => {
			const li = document.createElement('li');
			const button = document.createElement('button');
			button.type = 'button';
			button.dataset.beat = i;
			const n = document.createElement('span');
			n.className = 'mf-n';
			n.setAttribute('aria-hidden', 'true');
			n.textContent = i + 1;
			const text = document.createElement('span');
			text.textContent = b.text;
			button.append(n, text);
			li.append(button);
			list.append(li);
			return button;
		});
		let t = 0, playing = false, prev = 0, raf = 0;

		const label = (text) => {
			toggle.dataset.state = text.toLowerCase();
			toggle.querySelector('[data-mf-label]').textContent = text;
		};
		// The settled look of a beat: just before the next one starts.
		const settle = (i) => (i < beats.length - 1 ? beats[i + 1].at - 0.02 : duration);
		const draw = (time) => {
			t = clamp(time, 0, duration);
			figure.render(t);
			let current = 0;
			beats.forEach((b, i) => { if (t >= b.at) current = i; });
			beatButtons.forEach((b, i) => {
				if (i === current) b.setAttribute('aria-current', 'step');
				else b.removeAttribute('aria-current');
				b.classList.toggle('is-past', i < current);
			});
		};
		const tick = (now) => {
			const dt = Math.min(0.1, (now - prev) / 1000);
			prev = now;
			draw(t + dt);
			if (t >= duration) { playing = false; label('Replay'); root.dataset.state = 'ended'; }
			else raf = requestAnimationFrame(tick);
		};
		const play = () => {
			if (t >= duration) t = 0;
			playing = true;
			prev = performance.now();
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(tick);
			label('Pause');
			root.dataset.state = 'playing';
		};
		const pause = () => {
			playing = false;
			cancelAnimationFrame(raf);
			label('Play');
			root.dataset.state = 'paused';
		};

		toggle.addEventListener('click', () => (playing ? pause() : play()));
		list.addEventListener('click', (e) => {
			const b = e.target.closest('[data-beat]');
			if (!b) return;
			const i = +b.dataset.beat;
			// Reduced motion: jump between still key frames. Otherwise play on from the beat.
			if (isReduced()) { pause(); draw(settle(i)); }
			else { draw(beats[i].at); play(); }
		});
		reducedQuery.addEventListener('change', () => {
			root.classList.toggle('is-reduced', isReduced());
			if (isReduced()) { pause(); draw(duration); }
		});

		// Test and export hook: seek to any moment without the clock.
		(window.__motionFigures ||= {})[root.id] = {duration, seek: (time) => { pause(); draw(time); }};

		if (params.has('t')) { root.classList.toggle('is-reduced', isReduced()); draw(+params.get('t')); label('Play'); return; }
		if (isReduced()) { root.classList.add('is-reduced'); draw(duration); label('Play'); return; }

		draw(0);
		label('Play');
		const io = new IntersectionObserver((entries) => {
			if (entries.some((e) => e.isIntersecting)) { io.disconnect(); play(); }
		}, {threshold: 0.6});
		io.observe(root);
	}

	const FONT = {serif: '"Source Serif 4", Georgia, serif', sans: '"Source Sans 3", system-ui, sans-serif', mono: '"IBM Plex Mono", ui-monospace, monospace'};
	window.MotionFigures = {mount, E, clamp, clamp01, mix, prog, spring, mixRgb, mixColor, css, el, set, isReduced, FONT};
})();
