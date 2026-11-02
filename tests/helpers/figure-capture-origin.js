/* Capture-only surrounding-layout normalization. Offset the whole document so
   the component starts at y=0. Moving only the figure would overlap page chrome
   beneath its translucent border. Internal player styles and geometry stay intact. */
(async () => {
  await document.fonts.ready;
  const root = document.querySelector('figure.mf');
  if (!root) return;
  while (!window.__motionFigures?.[root.id]) await new Promise(requestAnimationFrame);
  const align = () => {
    document.body.style.position = 'relative';
    document.body.style.top = '0px';
    const original = root.getBoundingClientRect().top + window.scrollY;
    document.body.style.top = `${-original}px`;
    // Chromium can retain non-scaling SVG stroke caches from the previous page
    // origin even though every DOM coordinate now agrees. Rebuild the outer
    // document's layout at its normalized origin before capturing. This is one
    // synchronous refresh: no player styles, geometry, timing or pixels are
    // masked, and no intermediate hidden state reaches a frame.
    // Other figures retain their established capture lifecycle: rebuilding
    // their layout can disturb source-specific measurement caches.
    if (root.id === 'institutional-monoculture') {
      const display = document.body.style.display;
      document.body.style.display = 'none';
      void document.body.offsetHeight;
      document.body.style.display = display;
    }
  };
  await new Promise(requestAnimationFrame);
  await new Promise(requestAnimationFrame);
  // Source pages fill their setup and stacked view after the first fonts.ready.
  // Wait for those newly used faces before measuring the surrounding layout.
  await document.fonts.ready;
  await new Promise(requestAnimationFrame);
  await new Promise(requestAnimationFrame);
  align();
  // AR's public resize handler budgets its first view from the document position.
  // Re-measure after the outer offset so source and built page use the same origin.
  // This invokes the unchanged responsive code; real page fit is tested separately.
  if (root.id === 'appropriate-reliance') window.dispatchEvent(new Event('resize'));
  window.addEventListener('beforeprint', () => requestAnimationFrame(align));
  matchMedia('print').addEventListener('change', () => requestAnimationFrame(align));
})();
