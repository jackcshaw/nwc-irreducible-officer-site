/* Capture-only surrounding-layout normalization. No player styles or drawing
   coordinates change. Different page headers put the same component at different document
   coordinates; align its outer top at document y=0 before comparing its pixels. */
(async () => {
  await document.fonts.ready;
  const root = document.querySelector('figure.mf');
  if (!root) return;
  while (!window.__motionFigures?.[root.id]) await new Promise(requestAnimationFrame);
  const align = () => {
    const prior = parseFloat(root.style.top) || 0;
    const original = root.getBoundingClientRect().top + window.scrollY - prior;
    root.style.position = 'relative';
    root.style.top = `${-original}px`;
  };
  await new Promise(requestAnimationFrame);
  await new Promise(requestAnimationFrame);
  align();
  window.addEventListener('beforeprint', () => requestAnimationFrame(align));
  matchMedia('print').addEventListener('change', () => requestAnimationFrame(align));
})();
