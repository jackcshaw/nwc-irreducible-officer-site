// Intro reel. A first-time visitor to the home page sees the 15-second reel
// before the site; when it ends, its red period flies into the masthead's
// period and the page takes over. The masthead button replays it with sound.
// Whether to autoplay is decided in <head> (html.reel-pending) so the page
// never flashes before the reel covers it.
(() => {
  const root = document.documentElement;
  const dialog = document.getElementById("reel-dialog");
  const replay = document.querySelector("[data-reel-replay]");
  const reveal = () => root.classList.remove("reel-pending");
  if (!dialog || !replay || typeof dialog.showModal !== "function") {
    if (replay) replay.hidden = true;
    reveal();
    return;
  }

  const video = dialog.querySelector("video");
  const surface = dialog.querySelector(".reel-surface");
  const controls = dialog.querySelector(".reel-controls");
  const sound = dialog.querySelector("[data-reel-sound]");
  const close = dialog.querySelector("[data-reel-close]");
  const progress = dialog.querySelector("[data-reel-progress]");
  const dot = dialog.querySelector(".reel-dot");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  const SEEN = "jl-reel-seen";
  const HANDOFF_AT = 13.6; // seconds: the end card has held long enough to read
  const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
  const FADE_OUT = [{ opacity: 1 }, { opacity: 0 }];
  // The reel's closing red period, as fractions of its 1920×1080 frame.
  const PERIOD = { x: 1421.5 / 1920, y: 528.6 / 1080, size: 21.3 / 1920 };
  // Source Serif 4's period: ink centre 0.1297em from the glyph origin and
  // 0.0549em above the baseline; ascent 1.036em; diameter 0.127em.
  const GLYPH = { x: 0.1297, lift: 0.0549, ascent: 1.036, size: 0.127 };

  let session = 0; // every open and close starts a new session; stale callbacks check it
  let leaving = false;
  let startTimer = 0;
  let frame = 0;

  function load() {
    if (video.dataset.loaded) {
      if (video.error) video.load();
      return;
    }
    video.dataset.loaded = "true";
    video.poster = dialog.dataset.poster;
    // H.264 plays almost everywhere with hardware decoding; VP9 covers
    // browsers built without it.
    for (const [src, type] of [
      [dialog.dataset.mp4, 'video/mp4; codecs="avc1.640032, mp4a.40.2"'],
      [dialog.dataset.webm, 'video/webm; codecs="vp9, opus"'],
    ]) {
      const source = document.createElement("source");
      source.src = src;
      source.type = type;
      video.append(source);
    }
    video.load();
  }

  function syncSound() {
    const on = !video.muted;
    sound.textContent = on ? "Sound off" : "Sound on";
    sound.setAttribute("aria-label", on ? "Turn sound off" : "Turn sound on");
  }

  function resetMotion() {
    for (const el of [surface, video, controls, dot]) el.getAnimations().forEach((a) => a.cancel());
    dot.hidden = true;
    progress.style.transform = "scaleX(0)";
  }

  function open(intro) {
    if (dialog.open) return;
    const id = ++session;
    leaving = false;
    load();
    resetMotion();
    video.muted = intro;
    video.volume = 1;
    syncSound();
    close.textContent = intro ? "Skip" : "Close";
    close.setAttribute("aria-label", intro ? "Skip the reel" : "Close the reel");
    root.classList.add("reel-open");
    dialog.showModal();
    // Focus the dialog itself: screen readers announce it, Tab reaches the
    // controls, and no button wears a focus ring nobody asked for.
    dialog.focus({ preventScroll: true });
    reveal();
    // A replay rewinds; a first play already starts at the beginning.
    if (video.currentTime > 0) video.currentTime = 0;
    // Never keep the site waiting on the network. The first frame is already on
    // screen as the poster and Skip is available, so the intro allows for a
    // cold media start; a replay was asked for, so it waits longer still.
    const giveUp = () => {
      if (id === session) dismiss(false);
    };
    clearTimeout(startTimer);
    startTimer = setTimeout(giveUp, intro ? 8000 : 12000);
    const playing = video.play();
    if (playing) playing.catch(giveUp);
    track(id);
  }

  function track(id) {
    cancelAnimationFrame(frame);
    const step = () => {
      if (id !== session || leaving) return;
      if (video.duration) progress.style.transform = `scaleX(${Math.min(1, video.currentTime / video.duration)})`;
      if (video.currentTime >= HANDOFF_AT) return handoff();
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
  }

  function fadeVolume(ms) {
    if (video.muted) return;
    const start = performance.now();
    const from = video.volume;
    const step = (now) => {
      const t = Math.min(1, (now - start) / ms);
      video.volume = from * (1 - t);
      if (t < 1 && dialog.open) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // Stops the film and anything it scheduled; callbacks still in flight see a
  // new session and bail.
  function stop() {
    session++;
    leaving = true;
    clearTimeout(startTimer);
    cancelAnimationFrame(frame);
    video.pause();
  }

  function dismiss(fade = true) {
    if (!dialog.open) return;
    stop();
    const id = session;
    if (!fade || reduce.matches) return finish(id);
    dialog.animate(FADE_OUT, { duration: 320, easing: "ease-out" }).finished.then(() => finish(id));
  }

  function finish(id) {
    if (id === session && dialog.open) dialog.close();
  }

  // The reel's final period flies to the masthead's period, where it lands on
  // the real glyph, while the film and its paper fade into the page.
  function handoff() {
    if (leaving || !dialog.open) return;
    leaving = true;
    const id = session;
    cancelAnimationFrame(frame);
    clearTimeout(startTimer);
    progress.style.transform = "scaleX(1)";
    fadeVolume(700);
    const period = document.querySelector(".package-brand .brand-period");
    const target = period && period.getBoundingClientRect();
    const onScreen = target && target.width > 0 && target.bottom > 0 && target.top < window.innerHeight;
    if (reduce.matches || !onScreen) return dismiss();

    const box = video.getBoundingClientRect();
    const from = { x: box.left + PERIOD.x * box.width, y: box.top + PERIOD.y * box.height, size: PERIOD.size * box.width };
    const em = parseFloat(getComputedStyle(period).fontSize);
    const to = { x: target.left + GLYPH.x * em, y: target.top + (GLYPH.ascent - GLYPH.lift) * em, size: GLYPH.size * em };
    // A quadratic curve that bows above both ends, sampled into keyframes.
    const bow = Math.hypot(to.x - from.x, to.y - from.y) * 0.12;
    const cx = (from.x + to.x) / 2;
    const cy = Math.min(from.y, to.y) - bow;
    const path = [];
    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      const u = 1 - t;
      const x = u * u * from.x + 2 * u * t * cx + t * t * to.x;
      const y = u * u * from.y + 2 * u * t * cy + t * t * to.y;
      const scale = (from.size + (to.size - from.size) * t) / from.size;
      path.push({ offset: t, transform: `translate(${x - from.size / 2}px, ${y - from.size / 2}px) scale(${scale})` });
    }

    dot.style.width = dot.style.height = `${from.size}px`;
    dot.style.transform = path[0].transform;
    dot.hidden = false;
    const timing = (duration, delay = 0) => ({ duration, delay, easing: EASE, fill: "forwards" });
    controls.animate(FADE_OUT, timing(200));
    video.animate(FADE_OUT, timing(280));
    surface.animate(FADE_OUT, timing(700, 160));
    dot
      .animate(path, timing(1000, 80))
      .finished.then(() => {
        if (id !== session) return;
        replay.classList.add("is-cued");
        finish(id);
      })
      .catch(() => {});
  }

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    dismiss();
  });
  // Every way out lands here, including an Escape the browser will not let
  // the page intercept.
  dialog.addEventListener("close", () => {
    stop();
    resetMotion();
    root.classList.remove("reel-open");
  });
  video.addEventListener("playing", () => clearTimeout(startTimer));
  video.addEventListener("ended", () => handoff());
  // Source errors do not bubble; catch them on the way down and give up only
  // once no source is left to try.
  video.addEventListener(
    "error",
    () => video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE && dismiss(false),
    true,
  );
  sound.addEventListener("click", () => {
    video.muted = !video.muted;
    syncSound();
  });
  close.addEventListener("click", () => dismiss());
  replay.addEventListener("click", () => open(false));
  replay.addEventListener("animationend", () => replay.classList.remove("is-cued"));

  if (root.classList.contains("reel-pending")) {
    try {
      localStorage.setItem(SEEN, "1");
    } catch {}
    open(true);
  }
})();
