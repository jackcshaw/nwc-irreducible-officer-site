# First public motion release

Jack authorized this release with “make it so” after the cross-site placement assessment. Codex owns this release. It supersedes the earlier release hold for this scope; book/dialog work and page turns remain deferred. Collaborator-intake PR34 and the separate business essay branch are excluded.

## Reader paths

- `/failure-modes/` is the shareable collection, with native setting links to `/failure-modes/classroom/`, `/failure-modes/high-school/` and `/failure-modes/pme/`. Each collection has seven failure modes and a separate appropriate-reliance warm-up.
- Learn and the footer provide collection entrances. The three setting pages place one frame-capture entry after opening practice and before the teaching-guide disclosure.
- The original PME essay contains all eight figure entries. The HE essay has five at its own named passages: frame capture, fluency substitution, premature synthesis, invisible delegation and institutional monoculture. The high-school essay has four: the same list without premature synthesis. Exact source paragraphs are validated; essay prose is unchanged.
- Practice offers seven setting-specific entries and complete copyable lab prompts, plus the separate appropriate-reliance warm-up. The adaptation notes distinguish modes absent from the selected essay.
- Discuss links its five claims to fluency substitution, frame capture, premature synthesis, invisible delegation and institutional monoculture respectively.
- Design links Frame Check to frame capture, Supervised Delegation to invisible delegation, and the assessment rubric to fluency substitution and responsibility laundering. Other tools have no added motion links.

Ordinary pages use static posters and links, without loading player scripts. Standalone figures preserve their selected setting when returning to the collection, Practice, Design or an essay. Primary essay links return to the matching adapted passage where one exists, otherwise the original PME passage. Quotation citations continue to identify the original PME source. Collections and all three essay reading fallbacks work without JavaScript. Appropriate reliance retains its first-question opening.

## Release sequence

1. Merge Practice PR48, then the site-access PR after local checks, independent visual/documentation review and exact-head CI receipts.
2. Open the separate version-only release PR. Check for another release in flight before merging.
3. Build the merged release commit from clean canonical companion/workbench mains, with explicit source paths and no SITE_URL override.
4. Publish a short-lived Firebase preview; verify directory redirects, metadata, native reading paths, selected-setting navigation and question gates.
5. Deploy the same checked build to Firebase project `nwc-learning-companion`. Compare every generated file against judgmentlab.net, verify the live release receipt and exercise representative live paths.
6. Archive unique evidence, remove completed worktrees through Git, retain remote branches and update the active-work index.

A merged PR is not proof of deployment. The release receipt and hosted byte comparison establish what is public. The teaching examples remain proposals for educator testing, not validated curricula.
