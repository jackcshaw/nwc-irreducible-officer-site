/* Judgment Lab motion figures: shared runtime.

   Grown from concepts-v0/motion.js and backward compatible with it: a v0
   figure (toggle button + beat grid) mounts unchanged. See CONVENTIONS.md.

   A figure is a pure function of time: figure.render(t) sets every attribute
   for time t in seconds. Nothing depends on the previous frame, so the same
   figure can be played, paused, scrubbed, jumped to a beat, held at a fixed
   time, or rendered frame by frame to video. Captions are drawn from t too.

   The runtime plays a figure once its picture, caption band and controls are in view, then rests on
   its final frame. The final frame carries the idea by itself: it is the
   reduced-motion view, the print view and the poster.

   Optional hooks inside the figure root (all additive to v0):
     [data-mf-toggle]   Play / Pause / Replay button (v0)
     [data-mf-beats]    beat list (v0). Add class "is-list" for the vertical
                        list with "On screen" details.
     [data-mf-caption]  caption band; shows the current beat's caption
     [data-mf-scrub]    <input type="range"> scrubber
     [data-mf-time]     "0:12 / 1:15" readout
     [data-mf-replay]   restart button

   Beat fields: {at, text, list?, detail?, check?: {label, question,
   followLabel?, follow?, followAt?}}. Figure fields: {duration, render, beats,
   poster?} (poster: a time shown while the figure waits to play).

   Optional, for interactive figures (appropriate reliance): gates: [{at,
   resumeAt}] stops playback at each `at` until resume() is called, which jumps
   to resumeAt (default `at`) and plays. A gate re-arms whenever the figure is
   drawn before it. onGate(i) is called when playback stops at gate i, and
   render(t, {gate}) receives the open gate's index (-1 when none). reducedAt is
   the moment reduced motion shows instead of the final frame. lockedAt() may
   return the time of a gate the reader hasn't answered: no seek, scrub or beat
   click passes it (the gate opens there instead), and play() does nothing
   while a gate is open. onGate(i, via) says how the gate opened ('play',
   'lock' or 'api'); onResume(i) runs before resume() moves on. mount()
   returns {play, pause, seek, redraw, resume, openGate, gateOpen}; figures
   without these fields behave exactly as before.

   A playing figure pauses when its shot (or, for a v0 figure, its root) is
   mostly scrolled out of view, and shows Play; it doesn't resume by itself.
   data-mf-offscreen="play" on the root opts out.

   Test hooks: ?t=4.2 (or ?t=1:04.2) renders that moment and holds; ?reduced
   forces the reduced-motion path; window.__motionFigures[id].seek(t) for export. */
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
	/** Corner brackets around a rect {x, y, w, h} with arm length a. */
	const bracketPath = ({x, y, w, h}, a = 20) =>
		`M${x} ${y + a}V${y}H${x + a}M${x + w - a} ${y}H${x + w}V${y + a}M${x + w} ${y + h - a}V${y + h}H${x + w - a}M${x + a} ${y + h}H${x}V${y + h - a}`;

	/** Piecewise path for a moving mark. segs: [t0, t1, from, to, ease?]. */
	const pathAt = (segs, start) => (t) => {
		let p = start;
		for (const [t0, t1, a, b, ease = E.linear] of segs) {
			if (t < t0) break;
			const k = prog(t, t0, t1, ease);
			p = {x: mix(a.x, b.x, k), y: mix(a.y, b.y, k)};
		}
		return p;
	};

	/** Hide picture text that would render under minPx. Text elements carry
	    data-fs (font size in viewBox units). Adds .is-narrow to root when any
	    text is hidden, so the page can show each beat's "On screen" line. */
	function legibility(root, svg, viewWidth, minPx = 11) {
		const nodes = [...svg.querySelectorAll('[data-fs]')];
		const apply = () => {
			const r = svg.getBoundingClientRect();
			if (!r.width) return;
			// The stage can be capped in height (figures.css), so the picture may be
			// letterboxed: the drawing scale is the smaller of the two fits.
			const vb = svg.viewBox && svg.viewBox.baseVal;
			const scale = vb && vb.width && r.height ? Math.min(r.width / vb.width, r.height / vb.height) : r.width / viewWidth;
			let hidden = 0;
			for (const n of nodes) {
				const small = +n.dataset.fs * scale < minPx;
				n.setAttribute('visibility', small ? 'hidden' : 'visible');
				if (small) hidden++;
			}
			root.classList.toggle('is-narrow', hidden > 0);
		};
		new ResizeObserver(apply).observe(svg);
		apply();
		return apply;
	}

	const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

	// ---- player ------------------------------------------------------------
	function mount(root, figure) {
		const {beats, duration} = figure;
		const toggle = root.querySelector('[data-mf-toggle]');
		const list = root.querySelector('[data-mf-beats]');
		const caption = root.querySelector('[data-mf-caption]');
		const scrub = root.querySelector('[data-mf-scrub]');
		const timeOut = root.querySelector('[data-mf-time]');
		const replay = root.querySelector('[data-mf-replay]');
		const isList = list.classList.contains('is-list');

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
			text.className = 'mf-text';
			text.textContent = b.list || b.text;
			button.append(n, text);
			li.append(button);
			if (isList && b.detail) {
				const d = document.createElement('p');
				d.className = 'mf-detail';
				d.innerHTML = `<span class="mf-detail-label">On screen:</span> `;
				d.append(b.detail);
				li.append(d);
			}
			list.append(li);
			return button;
		});

		let t = 0, playing = false, prev = 0, raf = 0, shown = -1, started = false;
		// Optional poster: while a figure waits to play, it shows this settled moment
		// instead of an empty first frame. Play still starts from 0.
		const poster = figure.poster;
		let capBody = null, capFollow = null;
		// Optional gates (see the header): each stops playback once until resumed.
		const gates = (figure.gates || []).map((g) => ({at: g.at, resumeAt: g.resumeAt ?? g.at, armed: true}));
		let gateOpen = -1;
		const reducedAt = figure.reducedAt ?? duration;

		const label = (text) => {
			if (!toggle) return;
			toggle.dataset.state = text.toLowerCase();
			const l = toggle.querySelector('[data-mf-label]');
			if (l) l.textContent = text;
		};
		const beatAt = (time) => {
			let current = 0;
			beats.forEach((b, i) => { if (time >= b.at) current = i; });
			return current;
		};
		// The settled look of a beat: just before the next one starts.
		const settle = (i) => (i < beats.length - 1 ? beats[i + 1].at - 0.02 : duration);

		const buildCaption = (i) => {
			const b = beats[i];
			caption.textContent = '';
			caption.classList.toggle('is-check', !!b.check);
			capFollow = null;
			if (b.check) {
				capBody = document.createElement('div');
				capBody.className = 'mf-check';
				capBody.innerHTML = `<p class="mf-check-label"></p><p class="mf-check-q"></p>`;
				capBody.children[0].textContent = b.check.label;
				capBody.children[1].textContent = b.check.question;
				if (b.check.follow) {
					// With no followLabel, the follow-up is set at the same size as the check.
					capFollow = document.createElement('p');
					capFollow.className = b.check.followLabel ? 'mf-follow' : 'mf-follow is-equal';
					if (b.check.followLabel) {
						const fl = document.createElement('span');
						fl.className = 'mf-follow-label';
						fl.textContent = b.check.followLabel;
						capFollow.append(fl, ' ');
					}
					const fq = document.createElement('span');
					fq.className = 'mf-follow-q';
					fq.textContent = b.check.follow;
					capFollow.append(fq);
					capBody.append(capFollow);
				}
			} else {
				capBody = document.createElement('p');
				capBody.className = 'mf-cap';
				const count = document.createElement('span');
				count.className = 'mf-count';
				count.textContent = `${i + 1} / ${beats.length}`;
				const text = document.createElement('span');
				text.className = 'mf-cap-text';
				text.textContent = b.text;
				capBody.append(count, text);
			}
			caption.append(capBody);
		};
		const drawCaption = (time, i) => {
			if (!caption) return;
			if (i !== shown) { buildCaption(i); shown = i; }
			const b = beats[i];
			// Deterministic fades, drawn from t like the picture.
			const k = b.check ? prog(time, b.at + 0.2, b.at + 0.8, E.house) : prog(time, b.at, b.at + 0.3);
			capBody.style.opacity = k.toFixed(3);
			capBody.style.transform = b.check ? `translateY(${mix(8, 0, k).toFixed(2)}px)` : '';
			if (capFollow) {
				const f = b.check.followAt == null ? 1 : prog(time, b.check.followAt, b.check.followAt + 0.5, E.house);
				capFollow.style.opacity = f.toFixed(3);
			}
		};

		const draw = (time) => {
			let target = clamp(time, 0, duration);
			// An unanswered gate can't be passed: the playhead stops there and the gate opens.
			const lock = figure.lockedAt ? figure.lockedAt() : null;
			const wasOpen = gateOpen;
			let lockGate = -1;
			if (lock != null && target > lock + 0.001) {
				target = lock;
				lockGate = gates.findIndex((g) => Math.abs(g.at - lock) < 0.001);
			}
			t = target;
			for (const g of gates) if (t < g.at - 0.001) g.armed = true;
			if (lockGate >= 0) { gates[lockGate].armed = false; gateOpen = lockGate; }
			if (gateOpen >= 0 && Math.abs(t - gates[gateOpen].at) > 0.001) gateOpen = -1;
			figure.render(t, {gate: gateOpen});
			const current = beatAt(t);
			drawCaption(t, current);
			beatButtons.forEach((b, i) => {
				if (i === current) b.setAttribute('aria-current', 'step');
				else b.removeAttribute('aria-current');
				b.classList.toggle('is-past', i < current);
			});
			if (scrub) {
				scrub.value = t.toFixed(2);
				scrub.setAttribute('aria-valuetext', `${fmt(t)} of ${fmt(duration)}, beat ${current + 1} of ${beats.length}`);
			}
			if (timeOut) timeOut.textContent = `${fmt(t)} / ${fmt(duration)}`;
			if (lockGate >= 0) {
				playing = false;
				cancelAnimationFrame(raf);
				label('Play');
				root.dataset.state = 'gate';
				if (wasOpen !== lockGate && figure.onGate) figure.onGate(lockGate, 'lock');
			}
		};
		const tick = (now) => {
			const dt = Math.min(0.1, (now - prev) / 1000);
			prev = now;
			const g = gates.findIndex((g) => g.armed && t < g.at && t + dt >= g.at);
			if (g >= 0) { openGate(g, 'play'); return; }
			draw(t + dt);
			if (t >= duration) { playing = false; label('Replay'); root.dataset.state = 'ended'; }
			else raf = requestAnimationFrame(tick);
		};
		const play = () => {
			if (gateOpen >= 0) return;
			if (!started && poster != null && t === poster) t = 0;
			started = true;
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
			label(t >= duration ? 'Replay' : 'Play');
			root.dataset.state = t >= duration ? 'ended' : 'paused';
		};
		// Gates: open one (playback stops there), or resume past it.
		function openGate(i, via = 'api') {
			pause();
			gates[i].armed = false;
			gateOpen = i;
			draw(gates[i].at);
			root.dataset.state = 'gate';
			if (figure.onGate) figure.onGate(i, via);
		}
		const resume = (i = gateOpen) => {
			if (i < 0 || !gates[i]) return;
			if (figure.onResume) figure.onResume(i);
			gates[i].armed = false;
			gateOpen = -1;
			draw(gates[i].resumeAt);
			play();
		};

		if (toggle) toggle.addEventListener('click', () => (gateOpen >= 0 ? resume() : playing ? pause() : play()));
		if (replay) replay.addEventListener('click', () => { draw(0); play(); });
		if (scrub) {
			scrub.min = 0;
			scrub.max = duration;
			scrub.step = 0.05;
			scrub.addEventListener('input', () => { pause(); draw(+scrub.value); label(t >= duration ? 'Replay' : 'Play'); });
			// Arrow keys move 1 s (Shift: 5 s). The fine step stays for dragging; Home, End
			// and Page keys keep the browser's behaviour.
			scrub.addEventListener('keydown', (e) => {
				const dir = {ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1}[e.key];
				if (!dir) return;
				e.preventDefault();
				pause();
				draw(t + dir * (e.shiftKey ? 5 : 1));
				label(t >= duration ? 'Replay' : 'Play');
			});
		}
		list.addEventListener('click', (e) => {
			const b = e.target.closest('[data-beat]');
			if (!b) return;
			const i = +b.dataset.beat;
			// Reduced motion: jump between still key frames. Otherwise play on from the beat.
			if (isReduced()) { pause(); draw(settle(i)); label('Play'); }
			else { draw(beats[i].at); play(); }
		});
		reducedQuery.addEventListener('change', () => {
			root.classList.toggle('is-reduced', isReduced());
			if (isReduced()) { pause(); draw(reducedAt); }
		});
		// Print the final frame, whatever moment is on screen.
		addEventListener('beforeprint', () => { pause(); draw(duration); });

		// Test and export hook: seek to any moment without the clock.
		const seek = (time) => { pause(); draw(time); };
		const api = {play, pause, seek, redraw: () => draw(t), resume, openGate, gateOpen: () => gateOpen};
		(window.__motionFigures ||= {})[root.id] = {duration, beats: beats.map((b) => b.at), settle, seek, resume, openGate, gates: gates.map((g) => g.at)};

		// Pause when scrolled away: once less than a quarter of the shot is in view, a playing
		// figure pauses and shows Play. It doesn't resume by itself (the reader may be reading
		// the beat list or the page). Gates and seeks are unaffected.
		const awayEl = root.querySelector('[data-mf-shot]') || root;
		if (root.dataset.mfOffscreen !== 'play' && 'IntersectionObserver' in window) {
			new IntersectionObserver((entries) => {
				for (const e of entries) if (playing && e.intersectionRatio < 0.25) pause();
			}, {threshold: [0, 0.1, 0.25, 0.5]}).observe(awayEl);
		}

		// ?t= takes seconds (12.5) or minutes and seconds (0:12.5).
		const tParam = (v) => (v.includes(':') ? v.split(':').reduce((a, b) => a * 60 + +b, 0) : +v);
		if (params.has('t')) { root.classList.toggle('is-reduced', isReduced()); draw(tParam(params.get('t'))); label('Play'); return api; }
		if (isReduced()) { root.classList.add('is-reduced'); draw(reducedAt); label('Play'); return api; }

		draw(poster ?? 0);
		label('Play');
		if (root.dataset.mfAutoplay === 'off') return api;
		// Autoplay waits until the picture, its caption band and the controls can all be
		// seen: half the shot (stage plus caption band) in view, and the caption band and
		// controls fully in view. figures.css caps the stage height so the three fit the
		// viewport together. A v0 figure without a shot keys on its root at 60%, as before.
		const shotEl = root.querySelector('[data-mf-shot]');
		if (!shotEl) {
			const io = new IntersectionObserver((entries) => {
				if (entries.some((e) => e.isIntersecting)) { io.disconnect(); if (!started) play(); }
			}, {threshold: 0.6});
			io.observe(root);
			return api;
		}
		const ctrlEl = root.querySelector('.mf-controls');
		const need = [[shotEl, 0.5], [caption, 0.98], [ctrlEl, 0.98]].filter(([n]) => n);
		const ratio = new Map(need.map(([n]) => [n, 0]));
		const io = new IntersectionObserver((entries) => {
			entries.forEach((e) => ratio.set(e.target, e.intersectionRatio));
			// Autoplay only if nobody has played yet: once the reader has started (or paused)
			// the figure, scrolling it into view never restarts it.
			if (need.every(([n, min]) => ratio.get(n) >= min)) { io.disconnect(); if (!started) play(); }
		}, {threshold: [0, 0.25, 0.5, 0.75, 0.98, 1]});
		need.forEach(([n]) => io.observe(n));
		return api;
	}

	const FONT = {serif: '"Source Serif 4", Georgia, serif', sans: '"Source Sans 3", system-ui, sans-serif', mono: '"IBM Plex Mono", ui-monospace, monospace'};
	window.MotionFigures = {mount, E, clamp, clamp01, mix, prog, spring, mixRgb, mixColor, css, el, set, bracketPath, pathAt, legibility, isReduced, FONT};
})();
