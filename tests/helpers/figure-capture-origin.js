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
  };
  await new Promise(requestAnimationFrame);
  await new Promise(requestAnimationFrame);
  // Source pages fill their setup and stacked view after the first fonts.ready.
  // Wait for those newly used faces before measuring the surrounding layout.
  await document.fonts.ready;
  await new Promise(requestAnimationFrame);
  await new Promise(requestAnimationFrame);
  align();
  window.addEventListener('beforeprint', () => requestAnimationFrame(align));
  matchMedia('print').addEventListener('change', () => requestAnimationFrame(align));
})();
