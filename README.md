# The Irreducible Officer Website

This repo is the public website layer for **The Irreducible Officer**.

The website presents the final essay, exposes a downloadable PDF, and routes
readers to the two downstream repos:

- AI Companion: https://github.com/jackcshaw/nwc-irreducible-officer-agent-mode
- Faculty Workbench: https://github.com/jackcshaw/nwc-faculty-workbench

It should not contain the companion source kit, workbench templates, private
course materials, Proof scratch files, transcripts, or audit notes.

## Source

- Essay source: `content/the-irreducible-officer.md`
- Build script: `scripts/build-site.mjs`
- Asset generator: `scripts/generate-assets.py`
- Site contract: `tests/site-contract.test.mjs`

## Commands

```bash
npm run build
npm test
npm run dev
```

The build writes public output to `dist/`.
