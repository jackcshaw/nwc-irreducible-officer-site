---
title: Force a reload before browser-verifying a rebuild — hash navigation serves the stale page
date: 2026-08-17
category: workflow-issues
module: development-workflow
problem_type: workflow_issue
component: development_workflow
severity: medium
applies_when:
  - Verifying a rebuilt static site in an already-open browser tab
  - "Navigating to a URL that differs from the current one only by #fragment (or not at all)"
  - Confirming a CSS/JS fix via screenshot after `npm run build`
tags: [browser-verification, hash-navigation, stale-cache, devtools, screenshots]
---

# Force a reload before browser-verifying a rebuild — hash navigation serves the stale page

## Context

During the PR #16 polish pass, a CSS grid fix was rebuilt into `dist/` and then "verified" in the browser — but the screenshot still showed the broken layout, and a computed-style probe showed the new rule missing from the page. The build was fine; the browser had never fetched it. Navigating to `http://localhost:5199/#essay` while the tab was already on that URL (or on the same document with a different hash) is a same-document navigation: Chrome does not re-request the HTML, even when the navigation is issued with cache disabled.

## Guidance

After rebuilding, force a real reload before trusting anything the page shows:

- In DevTools-driven checks, use an explicit reload action (e.g., `navigate_page` with `type: "reload"` and `ignoreCache: true`), not a URL navigation to the same document.
- Cheap belt-and-braces: assert the fix is actually present in the served document before eyeballing it — e.g. `curl -s <url> | grep -c "<new-css-selector>"` — and only then screenshot.
- Treat "the fix didn't work" and "the page is stale" as equally likely until the loaded document is confirmed fresh.

## Why This Matters

A stale page makes verification lie in both directions: a real fix looks broken (wasted re-debugging), and — worse — an earlier screenshot of a still-cached good state can pass a broken build. In this session the first confirmation round on the closing-standard element was a false pass for exactly this reason; the defect only surfaced in a later forced-reload round.

## When to Apply

- Any screenshot-based confirm round after `npm run build` in this repo (the dev server serves `dist/` from disk, but the browser decides whether to re-fetch).
- Any navigation where only the `#fragment` differs from the current URL — including "navigate with ignoreCache", which still short-circuits to a same-document navigation.

## Examples

Broken verification (same-document navigation — no fetch):

```
navigate_page { type: "url", url: "http://localhost:5199/#essay", ignoreCache: true }
# tab already at .../#essay → Chrome performs a hash scroll, serves nothing
```

Correct verification:

```
navigate_page { type: "reload", ignoreCache: true }
# document re-fetched; then probe:
curl -s http://localhost:5199/ | grep -c "closing-standard::before"   # → 1
```

## Related

- Companion learning: `docs/solutions/ui-bugs/before-pseudo-element-becomes-grid-item.md` (the fix whose verification this affected)
