# The Irreducible Officer Website

This repo is the public website layer for **The Irreducible Officer**.

To read the essay, run the AI Companion, or use the Faculty Workbench, start at:

https://judgmentlab.net

This repo builds the public site and hosts derived public assets, including the
essay PDF, ready-to-use workbench templates, and the Companion context file used
by ChatGPT, Claude, Gemini, or another AI assistant.

The source material behind the Companion lives in:

- AI Companion source: https://github.com/jackcshaw/nwc-irreducible-officer-companion
- Faculty Workbench source: https://github.com/jackcshaw/nwc-faculty-workbench

It should not contain private course materials, Proof scratch files,
transcripts, or audit notes.

## Source

- Essay source: `content/the-irreducible-officer.md`
- Companion source checkout: set `COMPANION_REPO_PATH` or use the default sibling checkout at `../companion`
- Workbench source checkout: set `WORKBENCH_REPO_PATH` or use the default sibling checkout at `../workbench`
- Build script: `scripts/build-site.mjs`
- Asset generator: `scripts/generate-assets.py`
- Site contract: `tests/site-contract.test.mjs`

## Commands

```bash
export COMPANION_REPO_PATH=/path/to/nwc-irreducible-officer-companion   # default: ../companion
export WORKBENCH_REPO_PATH=/path/to/nwc-faculty-workbench               # default: ../workbench

npm run build
npm test
npm run dev
```

Both `npm run build` and `npm test` read the companion and workbench checkouts,
so set the two env vars (or place the checkouts at the default sibling paths)
before running either. Asset generation (PDF + share card) runs via
`uv run --with reportlab --with pillow`; set `PDF_PYTHON` to a python3 that
already has both packages to skip uv.

The build writes public output to `dist/`.
