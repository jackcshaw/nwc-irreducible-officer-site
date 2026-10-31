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
   'lock' or 'api'); onResume(i) runs before resume() moves on; onGatePlay(i)
   replaces what Play does at an open gate (default: resume). The ?t= hold
   respects lockedAt; window.__motionFigures[id].seek(t) is the export hook and
   ignores it, so scripts can render every frame. mount()
   returns {play, pause, seek, redraw, resume, openGate, gateOpen, time}
   (time(): the figure's current time), plus introCard and settleCard with a
   nameplate (below); figures
   without these fields behave exactly as before.

   A playing figure pauses when its shot (or, for a v0 figure, its root) is
   mostly scrolled out of view, and shows Play; it doesn't resume by itself.
   data-mf-offscreen="play" on the root opts out.

   Optional nameplate (every figure uses it; see CONVENTIONS.md):
     nameplate: {name, kicker, definition, plate?, card?}
   - name: "Frame capture"; kicker: "Failure mode 1 of 7" (or "The skill");
     definition: the one-line "what goes wrong";
     plate: the corner text after the name (default: the kicker without
     "Failure mode "); card: the opening card's length in seconds (default 4.2:
     a 3.2 s hold, then a 1 s move into the corner; the hold is the kicker's
     reading time, "Failure mode 1 of 7" at 5 ÷ 3 + 1.5 = 3.17 s).
   The runtime then (1) opens on a large name card, centred over the stage,
   that moves and shrinks into the corner; (2) keeps "NAME · 1 OF 7" in a
   reserved strip above the stage's top-left corner in every view; (3) sets
   the name and definition above the faculty check in the last caption; and
   (4) lists the card as beat 0. The figure's own clock is offset by the card:
   render(t), beats, poster, gates, lockedAt, reducedAt and api.seek stay in
   figure time, while ?t=, the scrubber and window.__motionFigures[id]
   (duration, beats, settle, seek) are in player time (figure time + card).
   A figure that opens on a live moment (appropriate reliance opens on its
   first question) can show the card over that moment instead: api.introCard()
   sets it large over the frame on screen, api.settleCard(hold, move) moves it
   into the corner on the wall clock, and any draw ends it at once. During the
   intro, render(t, info) gets info.card, the card's progress (0 large, 1 in
   its corner), so the figure can hold back what the card would cover.
   Without nameplate, nothing changes.

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
		// Nameplate (optional): the opening card adds C seconds before the figure's own t = 0.
		// Everything below runs in player time; the figure keeps its own clock (toFig).
		const plate = figure.nameplate || null;
		const C = plate ? (plate.card ?? 4.2) : 0;
		const HOLD = Math.max(0, C - 1);
		// Both ways rounded to the microsecond, so a moment typed or scrubbed in player time
		// lands exactly on the figure's own constant: unrounded, (6 + 4.2) - 4.2 is
		// 5.999999999999999, one step short of a beat at 6, and 117.9 + 4.2 is
		// 122.10000000000001, past the scrubber's last step.
		const us = (x) => Math.round(x * 1e6) / 1e6;
		const toPlayer = (f) => us(f + C);
		// The figure's own moments (beats, follow-ups, gates, poster, end) map back exactly, so a
		// seek to one draws the figure at its own constant, even one with float noise from an
		// edition's retiming (64.60000000000001).
		const exact = new Map();
		const mark = (f) => { const T = toPlayer(f); exact.set(T, f); return T; };
		const toFig = (T) => exact.get(T) ?? Math.max(0, us(T - C));
		const beats = C ? figure.beats.map((b) => ({...b, at: mark(b.at), check: b.check && {...b.check, followAt: b.check.followAt == null ? b.check.followAt : mark(b.check.followAt)}})) : figure.beats;
		const duration = mark(figure.duration);
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

		// The name card is beat 0 in the list (a button that plays it from the start).
		let nameButton = null;
		if (plate) {
			const li = document.createElement('li');
			li.className = 'mf-namebeat';
			nameButton = document.createElement('button');
			nameButton.type = 'button';
			nameButton.dataset.beat = -1;
			const n = document.createElement('span');
			n.className = 'mf-n';
			n.setAttribute('aria-hidden', 'true');
			n.textContent = 0;
			const text = document.createElement('span');
			text.className = 'mf-text';
			text.textContent = `${plate.name} · ${plate.kicker}`;
			nameButton.append(n, text);
			li.append(nameButton);
			if (isList) {
				const d = document.createElement('p');
				d.className = 'mf-detail';
				const dl = document.createElement('span');
				dl.className = 'mf-detail-label';
				dl.textContent = 'On screen:';
				d.append(dl, ` the name, "${plate.name}", appears large over the stage with "${plate.kicker}" above it, then moves into the top-left corner, where it stays.`);
				li.append(d);
			}
			list.prepend(li);
		}

		let t = 0, playing = false, prev = 0, raf = 0, shown = -1, started = false;
		// driving: the reader (or a script) has taken over (focus in the player, or a seek), so
		// autoplay stands down. printing: never autoplay once a print has begun.
		let driving = false, printing = false;
		// Optional poster: while a figure waits to play, it shows this settled moment
		// instead of an empty first frame. Play still starts from 0.
		const poster = figure.poster == null ? figure.poster : mark(figure.poster);
		let waiting = false; // the waiting view shows the name card large over the poster
		let capBody = null, capFollow = null;
		// Optional gates (see the header): each stops playback once until resumed.
		const gates = (figure.gates || []).map((g) => ({at: mark(g.at), resumeAt: mark(g.resumeAt ?? g.at), armed: true}));
		let gateOpen = -1;
		const reducedAt = figure.reducedAt == null ? duration : mark(figure.reducedAt);

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
				if (plate && plate.definition) {
					// Name, then what goes wrong, directly above the check, in two columns
					// (labels left, words right) so the band grows only a few pixels.
					capBody.classList.add('has-final');
					const fn = document.createElement('p');
					fn.className = 'mf-final-name';
					fn.textContent = plate.name;
					const fd = document.createElement('p');
					fd.className = 'mf-final-def';
					fd.textContent = plate.definition;
					capBody.prepend(fn, fd);
				}
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
			// While the name card waits large over the poster, the caption band stays quiet.
			// So does it while a card intro holds the card over a live moment (introCard, below).
			const quiet = waiting ? 0 : introK != null ? prog(introK, 0.6, 1) : 1;
			const k = quiet * (b.check ? prog(time, b.at + 0.2, b.at + 0.8, E.house) : prog(time, b.at, b.at + 0.3));
			capBody.style.opacity = k.toFixed(3);
			capBody.style.transform = b.check ? `translateY(${mix(8, 0, k).toFixed(2)}px)` : '';
			if (capFollow) {
				const f = b.check.followAt == null ? 1 : prog(time, b.check.followAt, b.check.followAt + 0.5, E.house);
				capFollow.style.opacity = f.toFixed(3);
			}
		};

		// ---- nameplate: a reserved strip with "NAME · 1 OF 7", and the opening card ----
		const shot = root.querySelector('[data-mf-shot]');
		let P = null;
		let introK = null, introRaf = 0;
		if (plate && shot) {
			root.classList.add('has-nameplate');
			const bar = document.createElement('div');
			bar.className = 'mf-platebar';
			bar.setAttribute('aria-hidden', 'true');
			const tag = document.createElement('span');
			tag.className = 'mf-plate';
			tag.textContent = `${plate.name} · ${plate.plate ?? plate.kicker.replace(/^failure mode\s+/i, '')}`;
			bar.append(tag);
			shot.prepend(bar);
			const scrim = document.createElement('div');
			scrim.className = 'mf-namescrim';
			scrim.setAttribute('aria-hidden', 'true');
			const card = document.createElement('div');
			card.className = 'mf-namecard';
			card.setAttribute('aria-hidden', 'true');
			const ck = document.createElement('p');
			ck.className = 'mf-namecard-k';
			ck.textContent = plate.kicker;
			const cn = document.createElement('p');
			cn.className = 'mf-namecard-n';
			cn.textContent = plate.name;
			card.append(ck, cn);
			shot.append(scrim, card);
			P = {bar, tag, scrim, card, ck, cn};
		}
		// Drawn from t like the picture: k = 0 is the large card, k = 1 the plate in its corner.
		function drawPlate(time) {
			if (!P) return;
			const k = waiting ? 0 : introK != null ? introK : prog(time, HOLD, C, E.inOutStrong);
			P.tag.style.opacity = prog(k, 0.8, 1).toFixed(3);
			if (k >= 1) { P.card.style.visibility = 'hidden'; P.scrim.style.visibility = 'hidden'; return; }
			P.card.style.visibility = 'visible';
			P.scrim.style.visibility = 'visible';
			const sr = shot.getBoundingClientRect();
			const top = P.bar.getBoundingClientRect().bottom - sr.top;
			const bottom = (caption ? caption.getBoundingClientRect().top : sr.bottom) - sr.top;
			P.scrim.style.top = `${top}px`;
			P.scrim.style.height = `${Math.max(0, bottom - top)}px`;
			P.scrim.style.opacity = (1 - k).toFixed(3);
			const cw = P.card.offsetWidth, ch = P.card.offsetHeight;
			const tr = P.tag.getBoundingClientRect();
			const s1 = Math.min(1, tr.height / Math.max(1, P.cn.offsetHeight));
			const x0 = (sr.width - cw) / 2, y0 = top + Math.max(0, (bottom - top - ch) / 2);
			const x1 = tr.left - sr.left - P.cn.offsetLeft * s1, y1 = tr.top - sr.top - P.cn.offsetTop * s1;
			P.card.style.transform = `translate(${mix(x0, x1, k).toFixed(2)}px, ${mix(y0, y1, k).toFixed(2)}px) scale(${mix(1, s1, k).toFixed(4)})`;
			P.card.style.opacity = (1 - prog(k, 0.8, 1)).toFixed(3);
			P.ck.style.opacity = (1 - prog(k, 0, 0.4)).toFixed(3);
		}

		// Card intro, for a figure that opens on a live moment instead of playing from the
		// start (appropriate reliance opens on its first question): introCard(k = 0) sets the
		// card over the frame on screen, k = 0 large, with the caption band quiet;
		// settleCard(hold, move) holds it, then moves it into the corner on the wall clock
		// (settleCard(0, 0) puts it there at once). Any draw (play, seek, scrub, a gate, a
		// redraw) ends the intro with the plate in its corner. Neither changes t.
		const endIntro = () => {
			cancelAnimationFrame(introRaf);
			introRaf = 0;
			if (introK == null) return;
			introK = null;
			delete root.dataset.mfCard;
		};
		// The figure renders each intro frame too, with info.card = the card's k (0 large,
		// rising to 1 in its corner; null once it has settled), so it can hold back anything
		// the large card would cover until the card has moved off it.
		const drawCard = () => { figure.render(toFig(t), {gate: gateOpen, card: introK}); drawCaption(t, beatAt(t)); drawPlate(t); };
		const introCard = (k = 0) => {
			if (!P) return;
			endIntro();
			waiting = false;
			introK = clamp(k, 0, 1);
			root.dataset.mfCard = 'intro';
			drawCard();
		};
		const settleCard = (hold = HOLD, move = C - HOLD) => {
			if (introK == null) return;
			cancelAnimationFrame(introRaf);
			const from = introK, t0 = performance.now();
			const step = (now) => {
				const e = (now - t0) / 1000;
				introK = e < hold ? from : move > 0 ? mix(from, 1, prog(e, hold, hold + move, E.inOutStrong)) : 1;
				if (introK >= 1) { endIntro(); drawCard(); return; }
				drawCard();
				introRaf = requestAnimationFrame(step);
			};
			if (hold <= 0 && move <= 0) { endIntro(); drawCard(); return; }
			introRaf = requestAnimationFrame(step);
		};

		const draw = (time, force = false, hold = false) => {
			if (!hold) waiting = false;
			endIntro();
			let target = clamp(time, 0, duration);
			// An unanswered gate can't be passed: the playhead stops there and the gate opens.
			const lockFig = !force && figure.lockedAt ? figure.lockedAt() : null;
			const lock = lockFig == null ? null : toPlayer(lockFig);
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
			figure.render(toFig(t), {gate: gateOpen});
			const current = beatAt(t);
			drawCaption(t, current);
			const onCard = !!plate && t < C;
			if (nameButton) {
				if (onCard) nameButton.setAttribute('aria-current', 'step');
				else nameButton.removeAttribute('aria-current');
				nameButton.classList.toggle('is-past', !onCard);
			}
			beatButtons.forEach((b, i) => {
				if (i === current && !onCard) b.setAttribute('aria-current', 'step');
				else b.removeAttribute('aria-current');
				b.classList.toggle('is-past', i < current);
			});
			drawPlate(t);
			if (scrub) {
				scrub.value = t.toFixed(2);
				scrub.setAttribute('aria-valuetext', onCard ? `${fmt(t)} of ${fmt(duration)}, name card` : `${fmt(t)} of ${fmt(duration)}, beat ${current + 1} of ${beats.length}`);
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

		const atGate = () => (figure.onGatePlay ? figure.onGatePlay(gateOpen) : resume());
		if (toggle) toggle.addEventListener('click', () => (gateOpen >= 0 ? atGate() : playing ? pause() : play()));
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
			// Beat 0 is the name card: it plays from the start (reduced: the plate in place).
			if (i < 0) { if (isReduced()) { pause(); draw(C); label('Play'); } else { draw(0); play(); } return; }
			if (isReduced()) { pause(); draw(settle(i)); label('Play'); }
			else { draw(beats[i].at); play(); }
		});
		reducedQuery.addEventListener('change', () => {
			root.classList.toggle('is-reduced', isReduced());
			if (isReduced()) { pause(); draw(reducedAt); }
		});
		// Print the final frame, whatever moment is on screen.
		addEventListener('beforeprint', () => { printing = true; pause(); draw(duration); });

		// Test and export hook: seek to any moment without the clock.
		const seek = (time) => { driving = true; pause(); draw(toPlayer(time)); };
		const api = {play, pause, seek, redraw: () => draw(t), resume, openGate, gateOpen: () => gateOpen, time: () => toFig(t), introCard, settleCard};
		(window.__motionFigures ||= {})[root.id] = {duration, beats: beats.map((b) => b.at), settle, seek: (time) => { driving = true; pause(); draw(time, true); }, resume, openGate, gates: gates.map((g) => g.at), card: C, introCard, settleCard};

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

		waiting = !!plate;
		draw(poster ?? 0, false, true);
		label('Play');
		if (root.dataset.mfAutoplay === 'off') return api;
		// The reader is driving: once focus enters the figure (tabbing to Play scrolls it into
		// view), autoplay stands down, so their first Enter plays instead of pausing.
		root.addEventListener('focusin', () => { driving = true; }, {once: true});
		// Autoplay starts when the picture and its caption band are substantially in view:
		// 85% of the shot (stage plus caption band) and 85% of the caption band, even with the
		// controls partly below the fold, where a reader scrolling down naturally stops. The
		// earlier gate still counts too (half the shot, with the caption band and controls
		// fully in view), so the change only adds stopping points. A shot taller than the
		// window counts against what can fit. The view has to hold for 0.7 s, so scrolling past
		// doesn't start it, and a seek, focus in the player or printing stands it down.
		// A v0 figure without a shot keys on its root at 60%.
		const shotEl = root.querySelector('[data-mf-shot]');
		if (!shotEl) {
			const io = new IntersectionObserver((entries) => {
				if (entries.some((e) => e.isIntersecting)) { io.disconnect(); if (!started && !driving) play(); }
			}, {threshold: 0.6});
			io.observe(root);
			return api;
		}
		const ctrlEl = root.querySelector('.mf-controls');
		const watch = [shotEl, caption, ctrlEl].filter(Boolean);
		const seen = new Map(watch.map((n) => [n, 0]));
		const at = (n, min) => !n || seen.get(n) >= min;
		const inView = () => (at(shotEl, 0.85) && at(caption, 0.85)) || (at(shotEl, 0.5) && at(caption, 0.98) && at(ctrlEl, 0.98));
		let dwell = 0;
		const io = new IntersectionObserver((entries) => {
			// Each element's visible share, measured against what the window can show of it.
			entries.forEach((e) => {
				const fit = e.rootBounds && e.boundingClientRect.height ? Math.min(1, e.rootBounds.height / e.boundingClientRect.height) : 1;
				seen.set(e.target, e.intersectionRatio / fit);
			});
			// Autoplay only if nobody has played yet: once the reader has started (or paused)
			// the figure, scrolling it into view never restarts it.
			clearTimeout(dwell);
			if (!inView()) return;
			dwell = setTimeout(() => {
				if (!inView()) return;
				io.disconnect();
				if (!started && !driving && !printing && !matchMedia('print').matches) play();
			}, 700);
		}, {threshold: Array.from({length: 21}, (_, i) => i / 20)});
		watch.forEach((n) => io.observe(n));
		return api;
	}

	// ---- editions (additive; figures that don't call these are unchanged) ----
	// Hold page copy back until an edition fills it, so no edition's words flash on load. Each
	// figure page's <head> snippet does this before first paint (html.ed-pending); after 3 s it
	// shows a neutral loading state (html.ed-loading: "<title>: loading…") and keeps waiting.
	// For a page without the snippet, the runtime sets html[data-ed-pending] instead
	// (figures.css hides .fig-page, revealed after 3 s).
	const docEl = document.documentElement;
	if (!docEl.hasAttribute('data-ed-gate') && document.querySelector('[data-ed], [data-ed-rich], [data-ed-section]')) docEl.setAttribute('data-ed-pending', '');
	const edReady = () => { docEl.removeAttribute('data-ed-pending'); docEl.classList.remove('ed-pending', 'ed-loading'); };
	// Nothing could be loaded: keep the page's words hidden and say so.
	const edFailed = () => {
		const m = document.querySelector('main.fig-page');
		if (m) m.setAttribute('data-loading', `${document.title}: this figure couldn\u2019t load. Reload the page to try again.`);
		docEl.removeAttribute('data-ed-pending');
		docEl.classList.remove('ed-pending');
		docEl.classList.add('ed-loading');
	};
	// Cast families for the edition switch: a variant counts as its family's cast.
	const CAST_FAMILY = {'high-school': 'classroom'};
	const castFamily = (c) => CAST_FAMILY[c] || c;
	/* casts:begin — generated from casts.json, which is the source of truth; regenerate after
	   editing it (CONVENTIONS.md, Editions). Used only if casts.json can't be loaded. */
	const BUILTIN_CASTS = {"seminar":{"person":"student","Person":"Student","people":"students","a_person":"a student","A_person":"A student","the_person":"the student","The_person":"The student","first":"First student","second":"Second student","a_second":"a second student","A_second":"A second student","reviewer":"faculty","Reviewer":"Faculty","side":"the faculty side","check":"Faculty check","check_l":"faculty check","receive":"What faculty receive","reviewer_receives":"Faculty receive","reviewer_asks_each":"Faculty ask each student","ask_each":"Ask each student","reviewer_ask":"Faculty ask","reviewer_ask_l":"faculty ask","reviewer_has":"Faculty have","reviewer_sees":"Faculty see","what_reviewer_sees":"What faculty see","reviewer_doesnt_see":"Faculty don’t see this","reviewer_points":"Faculty point","reviewer_puts":"Faculty put","then_ask":"Then they ask","the_first":"the first student","Another":"Another student","That_person":"That student","each_person":"each student","group":"seminar","reviewer_lines":"Faculty line","reviewer_sends":"faculty send","Each_person":"Each student","The_first":"The first student","the_second":"the second student","The_second":"The second student"},"classroom":{"person":"student","Person":"Student","people":"students","a_person":"a student","A_person":"A student","the_person":"the student","The_person":"The student","first":"First student","second":"Second student","a_second":"a second student","A_second":"A second student","reviewer":"the instructor","Reviewer":"The instructor","side":"the instructor’s side","check":"Instructor’s check","check_l":"instructor’s check","receive":"What the instructor receives","reviewer_receives":"The instructor receives","reviewer_asks_each":"The instructor asks each student","ask_each":"Ask each student","reviewer_ask":"The instructor asks","reviewer_ask_l":"the instructor asks","reviewer_has":"The instructor has","reviewer_sees":"The instructor sees","what_reviewer_sees":"What the instructor sees","reviewer_doesnt_see":"The instructor doesn’t see this","reviewer_points":"The instructor points","reviewer_puts":"The instructor puts","then_ask":"Then the instructor asks","the_first":"the first student","Another":"Another student","That_person":"That student","each_person":"each student","group":"class","reviewer_lines":"The instructor lines","reviewer_sends":"the instructor sends","Each_person":"Each student","The_first":"The first student","the_second":"the second student","The_second":"The second student"},"high-school":{"person":"student","Person":"Student","people":"students","a_person":"a student","A_person":"A student","the_person":"the student","The_person":"The student","first":"First student","second":"Second student","a_second":"a second student","A_second":"A second student","reviewer":"the teacher","Reviewer":"The teacher","side":"the teacher’s side","check":"Teacher’s check","check_l":"teacher’s check","receive":"What the teacher receives","reviewer_receives":"The teacher receives","reviewer_asks_each":"The teacher asks each student","ask_each":"Ask each student","reviewer_ask":"The teacher asks","reviewer_ask_l":"the teacher asks","reviewer_has":"The teacher has","reviewer_sees":"The teacher sees","what_reviewer_sees":"What the teacher sees","reviewer_doesnt_see":"The teacher doesn’t see this","reviewer_points":"The teacher points","reviewer_puts":"The teacher puts","then_ask":"Then the teacher asks","the_first":"the first student","Another":"Another student","That_person":"That student","each_person":"each student","group":"class","reviewer_lines":"The teacher lines","reviewer_sends":"the teacher sends","Each_person":"Each student","The_first":"The first student","the_second":"the second student","The_second":"The second student"},"workplace":{"person":"analyst","Person":"Analyst","people":"analysts","a_person":"an analyst","A_person":"An analyst","the_person":"the analyst","The_person":"The analyst","first":"First analyst","second":"Second analyst","a_second":"a second analyst","A_second":"A second analyst","reviewer":"the manager","Reviewer":"The manager","side":"the manager’s side","check":"Reviewer’s check","check_l":"reviewer’s check","receive":"What the manager receives","reviewer_receives":"The manager receives","reviewer_asks_each":"The manager asks each analyst","ask_each":"Ask each analyst","reviewer_ask":"The manager asks","reviewer_ask_l":"the manager asks","reviewer_has":"The manager has","reviewer_sees":"The manager sees","what_reviewer_sees":"What the manager sees","reviewer_doesnt_see":"The manager doesn’t see this","reviewer_points":"The manager points","reviewer_puts":"The manager puts","then_ask":"Then the manager asks","the_first":"the first analyst","Another":"Another analyst","That_person":"That analyst","each_person":"each analyst","group":"team","reviewer_lines":"The manager lines","reviewer_sends":"the manager sends","Each_person":"Each analyst","The_first":"The first analyst","the_second":"the second analyst","The_second":"The second analyst"}};
	/* casts:end */
	/** Resolve an edition for a cast, without fetching (scripts/edition-check.mjs runs this in
	    Node). raw: the edition file; all: casts.json; requested: ?cast= (or null). Three optional
	    edition fields, applied in this order: the edition, then the byCast patches, then {key}
	    and {key|upper} filled from casts.json[cast] merged with castOverrides[cast].
	      casts          ["workplace", "classroom", …]: the casts the edition supports. A requested
	                     cast outside it falls back to the edition's own cast. No list: any cast.
	      castOverrides  {cast: {key: words}}: this edition's role words, over casts.json's. Only
	                     keys casts.json has; any other is ignored with a console warning.
	      byCast         {cast: {"path.to.string": "words"}}, or {cast: "other cast"} to inherit
	                     that cast's patches: whole-string replacements by path ("beats.0.text").
	    An edition without them resolves exactly as before. Returns {ed, castId, words, patched}:
	    ed is the filled edition plus {castId, cast (the edition's own cast id), castWords}.
	    The default cast is 'seminar', PME's (plural "Faculty"): an edition without a cast, or
	    a cast missing from casts.json, gets the words the classroom cast had before it became
	    the singular instructor. */
	function resolveEdition(raw, all, requested, warn = (m) => console.warn(m)) {
		const own = raw.cast || 'seminar';
		let castId = Array.isArray(raw.casts) ? (requested && raw.casts.includes(requested) ? requested : own) : requested || own;
		if (!all[castId]) castId = 'seminar';
		const words = {...all[castId]};
		const over = (raw.castOverrides || {})[castId] || {};
		for (const k in over) {
			if (k in words) words[k] = over[k];
			else warn(`${raw.id}: castOverrides.${castId}.${k} isn\u2019t a casts.json key, so it is ignored. Add new keys to casts.json, for every cast.`);
		}
		// byCast: a string value inherits another cast's patches.
		let patches = (raw.byCast || {})[castId];
		for (const seen = new Set([castId]); typeof patches === 'string';) {
			if (seen.has(patches)) { warn(`${raw.id}: byCast for ${castId} inherits in a loop (${patches}).`); patches = null; break; }
			seen.add(patches);
			patches = raw.byCast[patches];
		}
		let patched = raw;
		if (patches && typeof patches === 'object') {
			patched = JSON.parse(JSON.stringify(raw));
			for (const [path, value] of Object.entries(patches)) {
				const keys = path.split('.'), last = keys.pop();
				const parent = keys.reduce((o, k) => (o == null ? o : o[k]), patched);
				if (parent == null || typeof parent[last] !== 'string' || typeof value !== 'string') { warn(`${raw.id}: byCast patch for ${castId}, "${path}", doesn\u2019t replace a string, so it is skipped.`); continue; }
				parent[last] = value;
			}
		}
		const fillStr = (str) => str.replace(/\{(\w+)(\|upper)?\}/g, (m, k, up) => (k in words ? (up ? words[k].toUpperCase() : words[k]) : m));
		const fill = (v) => (typeof v === 'string' ? fillStr(v) : Array.isArray(v) ? v.map(fill) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, fill(x)])) : v);
		return {ed: {...fill(patched), castId, cast: own, castWords: words}, castId, words, patched};
	}
	/** Load a figure's words. The edition comes from ?edition=, else data-edition on
	    the root, else `fallback` (default 'pme'); an unknown edition falls back. The
	    cast comes from ?cast= (within the edition's `casts`, if it lists them), else the
	    edition's own "cast", else 'seminar'; resolveEdition (above) fills the words.
	    Returns the filled edition plus {id, castId, cast, castWords, fellBack}: cast is the
	    edition's own cast id, castWords the role words used. */
	async function loadEdition(root, {base = 'editions/', casts = '../../casts.json', fallback = 'pme'} = {}) {
		// A slow edition is waited for (the page shows its loading state from 3 s). Only a real
		// failure (a network error, a 404, invalid JSON, or no answer in 10 s) falls back to PME,
		// and the page then says so. Casts that fail or are slow use the built-in copy, which
		// has the same words.
		const get = (u, ms = 0) => {
			const ctl = ms && 'AbortController' in window ? new AbortController() : null;
			const timer = ctl ? setTimeout(() => ctl.abort(), ms) : 0;
			return fetch(u, ctl ? {signal: ctl.signal} : undefined)
				.then((r) => { if (!r.ok) throw new Error(`${u}: ${r.status}`); return r.json(); })
				.finally(() => clearTimeout(timer));
		};
		let id = params.get('edition') || root.dataset.edition || fallback, raw, fellBack = false;
		try { raw = await get(`${base}${id}.json`, 10000); }
		catch (e) {
			if (id === fallback) { edFailed(); throw e; }
			id = fallback;
			fellBack = true;
			try { raw = await get(`${base}${fallback}.json`, 10000); } catch (e2) { edFailed(); throw e2; }
		}
		let all;
		try { all = await get(casts, 2500); } catch (e) { all = BUILTIN_CASTS; }
		const {ed, castId} = resolveEdition(raw, all, params.get('cast'));
		root.dataset.editionId = id;
		root.dataset.cast = castId;
		return {...ed, id, fellBack};
	}
	/** Inline markup for page copy: escapes HTML, then *words* become <em>words</em>. */
	const rich = (str) => String(str).replace(/[&<>"]/g, (c) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c])).replace(/\*([^*]+)\*/g, '<em>$1</em>');
	const pathGet = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
	/** Fill page copy from an edition (the standard figure page):
	      [data-ed="path"]        text
	      [data-ed-rich="path"]   text with *em*
	      [data-ed-lines="path"]  one <p class="(data-ed-class)"> per array item
	      [data-ed-links="path"]  <li><span>lead</span> <a href>text</a></li> per item
	      [data-ed-content="path"] the content attribute (a meta description)
	      [data-ed-section="path"] hidden when the value is empty
	      [data-edition-link="id"] an edition switch link (href and aria-current), with
	                              data-cast-link="cast" to name a cast (see below) */
	function fillPage(doc, ed) {
		doc.querySelectorAll('[data-ed]').forEach((n) => { n.textContent = pathGet(ed, n.dataset.ed) ?? ''; });
		doc.querySelectorAll('[data-ed-rich]').forEach((n) => { n.innerHTML = rich(pathGet(ed, n.dataset.edRich) ?? ''); });
		doc.querySelectorAll('[data-ed-lines]').forEach((n) => {
			n.textContent = '';
			(pathGet(ed, n.dataset.edLines) || []).forEach((line) => {
				const p = doc.createElement('p');
				if (n.dataset.edClass) p.className = n.dataset.edClass;
				p.innerHTML = rich(line);
				n.append(p);
			});
		});
		doc.querySelectorAll('[data-ed-links]').forEach((n) => {
			n.textContent = '';
			(pathGet(ed, n.dataset.edLinks) || []).forEach((l) => {
				const li = doc.createElement('li');
				const sp = doc.createElement('span');
				sp.textContent = l.lead;
				const a = doc.createElement('a');
				a.href = l.href;
				a.textContent = l.text;
				li.append(sp, ' ', a);
				n.append(li);
			});
		});
		doc.querySelectorAll('[data-ed-content]').forEach((n) => { const v = pathGet(ed, n.dataset.edContent); if (v != null) n.setAttribute('content', v); });
		doc.querySelectorAll('[data-ed-section]').forEach((n) => { const v = pathGet(ed, n.dataset.edSection); n.hidden = v == null || (Array.isArray(v) && !v.length); });
		// Edition switch: <a data-edition-link="business">Workplace</a> links to ?edition=business,
		// and <a data-edition-link="business" data-cast-link="classroom">Classroom</a> to
		// ?edition=business&cast=classroom. A link without data-cast-link clears cast, so its
		// edition shows in its own cast. aria-current marks the link whose edition and cast are
		// the ones on screen. Other query parameters stay, except the ?t= test hook.
		// A cast link names a family: data-cast-link may list casts ("classroom high-school"),
		// and CAST_FAMILY folds variants into it, so on a high-school page "Classroom" is
		// current and keeps cast=high-school.
		const onScreen = ed.castId || 'seminar';
		doc.querySelectorAll('[data-edition-link]').forEach((a) => {
			const u = new URL(location.href);
			const castList = (a.dataset.castLink || '').split(/\s+/).filter(Boolean);
			const sameEdition = a.dataset.editionLink === ed.id;
			const inFamily = castList.some((c) => c === onScreen || castFamily(onScreen) === c);
			u.searchParams.set('edition', a.dataset.editionLink);
			if (castList.length) u.searchParams.set('cast', sameEdition && inFamily ? onScreen : castList[0]);
			else u.searchParams.delete('cast');
			u.searchParams.delete('t');
			a.href = u.pathname + u.search;
			const current = sameEdition && (castList.length ? inFamily : (ed.cast || 'seminar') === onScreen);
			if (current) a.setAttribute('aria-current', 'page');
			else a.removeAttribute('aria-current');
		});
		// The requested edition failed and PME stands in: say so under the switch.
		if (ed.fellBack && !doc.querySelector('.fig-fallback-note')) {
			const n = doc.createElement('p');
			n.className = 'fig-fallback-note';
			n.textContent = 'Showing the original example.';
			const at = doc.querySelector('.fig-editions') || doc.querySelector('main h1');
			if (at) at.after(n);
		}
		edReady();
	}

	const FONT = {serif: '"Source Serif 4", Georgia, serif', sans: '"Source Sans 3", system-ui, sans-serif', mono: '"IBM Plex Mono", ui-monospace, monospace'};
	window.MotionFigures = {mount, E, clamp, clamp01, mix, prog, spring, mixRgb, mixColor, css, el, set, bracketPath, pathAt, legibility, isReduced, FONT, loadEdition, resolveEdition, fillPage, rich};
})();
