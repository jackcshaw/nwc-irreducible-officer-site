# Concepts

> Shared domain vocabulary for this project — entities, named processes, and status concepts with project-specific meaning. Seeded with core domain vocabulary, then accretes as ce-compound and ce-compound-refresh process learnings; direct edits are fine. Glossary only, not a spec or catch-all.

## Intro reel

### Intro reel
The short film that opens the home page, ahead of the site, for a visitor's first visit.

It autoplays, muted, only on the home page and only for a first visit. A visitor who prefers reduced motion or has asked to save data never gets the autoplay, and a link to any other page goes straight to that page. Once the reel starts, the browser remembers it, so every later visit is a returning visit whether or not the reel was watched to the end. The reel never holds the site hostage: it steps aside, dismissing itself so the site takes over, when it cannot start in time, stops making progress after starting, or fails to load. When it finishes, its closing red dot flies into the period of the masthead wordmark (the handoff), and the masthead keeps a control that replays the reel with sound.

## Publishing

### Release
A numbered publication of the site to the live domain, made deliberately after work has merged; merging to the main branch never changes the live site by itself.

A release is a pull request that only raises the site's date-shaped version, followed by a manual publish. The publish builds from the main branch of each source repository (the site, the companion and the workbench), runs every suite, then proves two things: the live site matches the build file for file, and its footer shows the new version. Each build stamps the version and the commit it drew from each source repository, so the live site always says which release and which sources it serves. A publish replaces the entire live site, so the last one wins. Two releases prepared in parallel must go out one after the other, each from a build that includes everything merged before it.
