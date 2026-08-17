---
title: A ::before rule on a grid container becomes a grid item and breaks cell layout
date: 2026-08-17
category: ui-bugs
module: site-css
problem_type: ui_bug
component: frontend_stimulus
symptoms:
  - "Four-cell closing-standard grid rendered as two rows: first cell empty, fourth cell wrapped to a second row"
  - "Decorative rule intended as a full-width opener occupied the first grid cell instead"
root_cause: logic_error
resolution_type: code_fix
severity: medium
tags: [css-grid, pseudo-element, before, layout, argument-insert]
---

# A ::before rule on a grid container becomes a grid item and breaks cell layout

## Problem

A decorative `::before` element (the site's ink-and-red opening rule) was added to all `.argument-insert` asides. On block-level inserts it rendered as a full-width rule, but `.closing-standard` is a 4-column CSS grid — there the pseudo-element became a grid item, occupied cell 1, and pushed the fourth `<p>` ("Own the decision.") onto a second row.

## Symptoms

- The closing standard rendered as: [rule][Frame the problem.][Calibrate the tool.][Refuse the garden path.] on row 1, [Own the decision.] alone on row 2.
- No console errors, no test failures — purely visual, only on the one insert that is itself a grid.

## What Didn't Work

- The first browser "confirmation" after adding the fix appeared to still show the bug — that was a stale page, not a failed fix (see `docs/solutions/workflow-issues/stale-page-verification-hash-navigation.md`).

## Solution

Span the pseudo-element across the full grid row (`scripts/build-site.mjs:2545` in the generated CSS):

```css
/* The insert's opening rule (::before) must span the full grid row, not sit
   in the first cell. */
.closing-standard::before {
  grid-column: 1 / -1;
}
```

The shared rule that creates the pseudo-element lives at `scripts/build-site.mjs:2406` (`.argument-insert::before`).

## Why This Works

In CSS grid (and flex) layout, generated content from `::before`/`::after` participates in layout as an anonymous item — it is treated like a first child, not like decoration painted on the container. `grid-column: 1 / -1` gives that item its own full-width row, restoring the four content cells to a single row below it.

## Prevention

- When adding a `::before`/`::after` to a shared class, check every subclass whose `display` is `grid`, `flex`, or `inline-flex` — the pseudo-element becomes an item in those containers.
- Verify the specific variant in the browser after a rebuild with a forced reload, not just the common block-level case.

## Related Issues

- Fixed in PR #16 (merged 2026-08-17).
- Companion learning: `docs/solutions/workflow-issues/stale-page-verification-hash-navigation.md`
