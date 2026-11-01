# Production motion runtime

This candidate is derived from `design/motion-figures/runtime/motion.js` at source `8def5a1`. The reviewed rendering math, name card, timing conversion, captions and gate methods remain in place. Runtime parity and browser checks must pass before this candidate is accepted. No public pages import it in the runtime-only PR.

## Component contract

Register each drawing with `MotionFigures.define(slug, factory, {fonts})`. The factory receives `(root, {edition, scope, lifecycle})`; it builds synchronously and returns the handle from `MotionFigures.mount(root, figure)`. Declare required font faces in `fonts` so the runtime waits before the factory measures text. Use the pinned stylesheet in `figures/fonts/fonts.css`.

Call `mountFigure(root, {edition, scope, standalone})` with the pre-resolved edition used by the static page. The root names its factory through `data-mf-figure`. Mounting twice returns the same pending/completed mount. Embedded players wait for explicit Play; standalone players preserve the reviewed visibility/dwell behavior. Only standalone instances honor `?t=` and `?reduced`.

Pre-render beat items with `data-mf-beat-index="0"` through the last scene beat, plus `-1` for the name card. Use the reviewed `.mf-n`, `.mf-text` and `.mf-detail` markup. Hydration adopts these nodes and adds the beat buttons without duplicating the list. The selected version's static fallback remains available if mounting fails or is cancelled.

Factories must use root/scope queries and register event listeners and observers through the supplied lifecycle (`on`, `observe`, `add`). Register cleanup for any scheduled work or external scope nodes the factory owns. Descendant IDs and SVG/ARIA references are namespaced after construction; retain node references when drawing instead of looking up old global IDs.

Call `unmountFigure(root)` when a dialog closes, or the handle's `destroy()`. It cancels pending initialization, removes runtime listeners/observers/clocks/export hooks and restores the original root markup. Figure-specific listeners, observers and outside-root changes must also have lifecycle cleanup. A stale handle cannot restart the runtime after disposal.

## Legacy and export behavior

`mount`, `loadEdition`, `fillPage` and the resolver remain available for controlled parity fixtures. Production factories receive resolved data and must not fetch another edition or rewrite route metadata. `fillPage` accepts an element scope when needed.

The figure's handle uses figure time; `window.__motionFigures[root.id]` uses player time, including the 4.2-second name card. The export hook can seek past unanswered gates. Reader controls cannot; interactive gate tests must use actual controls separately from export screenshots.

`figure.css` contains scoped player tokens and styles. Page layout, masthead and navigation belong to the page stylesheet. Keep source geometry in parity fixtures and use the same pinned font bytes on both sides.
