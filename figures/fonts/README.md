# Motion figure fonts

These are the unmodified font responses frozen on November 1, 2026 from the Google Fonts stylesheet requested by all eight reviewed source figures at `8def5a1`.

`manifest.json` records the upstream URLs, SHA-256 hashes, browser user agent and license sources. `google-fonts.css` preserves the exact stylesheet response for source replay. `fonts.css` changes only the resource URLs to local, content-hashed URLs; production uses it. The three accompanying OFL files retain the font licenses.

The external service returned two different Source Sans 3 / Source Serif 4 font representations during identical source captures. Their small metric differences caused exact pixel checks to fail. Reference captures now replay this bundle using `--font-lock=figures/fonts/manifest.json`; the candidate player must use these same bytes. No figure copy, timing or drawing was changed to hide those differences.

Font changes require a new explicit input record, regeneration of the local CSS URLs and posters, and the complete source/candidate visual gate. Do not update font files during the normal site build.
