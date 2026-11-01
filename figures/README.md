# Published motion figures

The production build reads this directory. `design/motion-figures/` is the frozen design record and is never a build dependency. Figure corrections begin on the `motion-figures` source branch and pass its frame gate before re-import. Current drawings and editions derive from source `8def5a1`.

`manifest.json` owns published routes, ordering and the four edition/cast combinations. It lists only figures whose pages exist. Each figure keeps the original edition JSON, a root-scoped factory, component CSS, player markup and one shared nameplate file. Page titles added during integration live with that nameplate; source scenario, evidence and checks stay in the editions. The renderer resolves editions with the runtime's own resolver and extracts the original PME quotation from the canonical essay. It labels that quotation on other versions and omits the explicit list of unpublished prototype links.

Normal `npm run build` validates committed poster receipts and emits static text, real setting links, metadata, a sitemap and content-hashed dependencies. JavaScript adopts that text. Before hydration, an invisible but laid-out stage allows SVG text measurement while the poster and beat list remain readable. The page supplies the source's 16px/normal inherited player metrics and keeps its print width. A failed mount restores the same version's fallback.

After a drawing, edition, CSS, runtime, renderer, generator, font or package-lock change, regenerate each affected figure explicitly:

```sh
npm run figures:posters -- frame-capture
npm run build
npm test
```

Generation uses one browser at a time on an owned ephemeral server. It exports final-frame posters for explanatory figures, 1200×630 share images, PNG origin metadata and receipts for every input/output hash. It retains a temporary export fixture for diagnosis. Never generate posters silently during the normal build.

`motion page parity` CI captures source, self-check, the actual production factory in source geometry, and the built player for all four versions. A test-only HTML wrapper offsets the whole page to place the component's outer top at document y=0 to remove page-header positioning from rasterization. Internal layout, drawing, sampling and zero-pixel tolerance stay unchanged. Whole-page images are excluded only from the built-player pixel comparison; actual page visuals and no-JS/interactive behavior receive separate review. The wrapper is absent from published output. Each failed comparison gets one retained quiet repeat; a second failure blocks acceptance.

No new figure event analytics are added. The homepage and hub do not load a player. Book and essay placements, later editorial choices and release/deployment remain separate gates in the integration plan.
