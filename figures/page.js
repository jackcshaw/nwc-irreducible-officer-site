/* Static routes own edition selection. Hydration adopts their existing text. */
(() => {
  const root = document.querySelector('[data-mf-figure]');
  if (!root) return;
  const data = JSON.parse(document.getElementById('figure-data').textContent);
  const url = new URL(location.href);
  if (url.searchParams.has('edition') || url.searchParams.has('cast')) {
    const edition = url.searchParams.get('edition') || data.edition.id;
    const cast = url.searchParams.get('cast') || (edition === 'pme' ? 'seminar' : 'workplace');
    const target = data.routes.find(route => route.edition === edition && route.cast === cast);
    url.searchParams.delete('edition'); url.searchParams.delete('cast');
    if (target) url.pathname = target.path;
    if (url.pathname !== location.pathname) { location.replace(url.href); return; }
    history.replaceState(null, '', url.pathname + url.search + url.hash);
  }
  const status = document.querySelector('[data-figure-status]');
  // All page styles are same-origin and nonempty; failed sheets can still exist.
  const styles = [...document.querySelectorAll('link[rel="stylesheet"]')];
  const stylesReady = styles.every(link => {
    try { return !!link.sheet?.cssRules.length; }
    catch { return false; } // A failed request can leave an inaccessible sheet.
  });
  if (!window.MotionFigures || !stylesReady) { status.hidden = false; return; }
  MotionFigures.mountFigure(root, {edition: data.edition, scope: root.closest('[data-figure-instance]') || root, standalone: true})
    .then(() => { root.dataset.mfReady = ''; status.hidden = true; document.querySelectorAll('[data-read-figure]').forEach(link => { link.hash = root.querySelector('[data-mf-beats]').id; }); })
    .catch(() => { status.hidden = false; });
})();
