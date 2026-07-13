import { existsSync, readFileSync, statSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const indexPath = join(dist, "index.html");
const pdfPath = join(dist, "assets", "the-irreducible-officer.pdf");
const companionContextPath = join(dist, "assets", "companion-context.md");
const workbenchDir = join(dist, "assets", "workbench");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

assert(existsSync(indexPath), "dist/index.html should exist after build");
assert(existsSync(pdfPath), "downloadable essay PDF should exist after build");
assert(existsSync(companionContextPath), "companion context bundle should exist after build");
assert(!existsSync(join(dist, "assets", "companion.md")), "old companion.md asset should not be generated");
assert(statSync(pdfPath).size > 20_000, "essay PDF should be a real generated artifact");
assert(statSync(companionContextPath).size > 80_000, "companion context bundle should contain the companion source materials");

const html = readFileSync(indexPath, "utf8");
const companionContext = readFileSync(companionContextPath, "utf8");
const inlineScripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((match) => match[1]);

[
  "Format Reference",
  "After Automation",
  "Dan Shipper",
  "every.to/p/after-automation",
].forEach((needle) => {
  assert(!html.includes(needle), "site should not include " + needle);
  assert(!companionContext.includes(needle), "context bundle should not include " + needle);
});

inlineScripts.forEach((script, index) => {
  try {
    new Function(script);
  } catch (error) {
    throw new Error(`inline script ${index} should parse: ${error.message}`);
  }
});

[
  "The Irreducible Officer",
  "Overview",
  "Essay",
  "Companion",
  "Workbench",
  "Sources",
  "What This Package Does",
  "A Working Example",
  "One concrete model for operationalizing AI in professional military education",
  "Not a policy. A worked example",
  "Next Step",
  "Set up a session",
  "See the five-step pilot",
  "Read",
  "Practice",
  "Build",
  "AI Companion",
  "ChatGPT, Claude, Gemini, or another AI assistant",
  "Copy setup prompt",
  "Download context file",
  "assets/companion-context.md",
  "Before you answer anything, fetch and read this file in full",
  "If you cannot reach that URL, tell me you could not read it",
  "Choose A Starting Path",
  "Understand the argument",
  "Inspect a claim",
  "Test an objection",
  "Design an exercise",
  "Practice faculty fluency",
  "Run oral defense",
  "Faculty Workbench",
  "Copy template",
  "Download template",
  "Assignment Design Worksheet",
  "Assessment And Oral-Defense Rubric",
  "Flawed Output Library Template",
  "Source Kit Template",
  "Faculty Calibration Protocol",
  "After-Action Note Template",
  "The Design Behind The Tools",
  "Future Context Layer",
  "not a current NWC system",
  "Evidence And Source Spine",
  "Use this as the working source spine",
  "The formal reference list remains at the end of the essay",
  "A National Security Strategy Primer",
  "Generative AI without guardrails can harm learning",
  "From Trust to Appropriate Reliance",
  "Optimization's neglected normative commitments",
  "Apprenticeship Was the Point",
  "Oral exams: A more meaningful assessment",
  "Download PDF",
  "AI did not lower the bar for strategic judgment. It raised it, then hid whether the officer cleared it.",
  "The framing is where the judgment lives.",
  "AI can compress the work before a decision. It cannot own what follows.",
  "Core Failure Modes",
  "Can the student independently explain the judgment in plain speech?",
  "What Counts As Reliance Evidence",
  "Reliance decision",
  "Which Friction Matters",
  "AI can remove the first. Faculty have to protect the second.",
  "Foundation Pilot Sequence",
  "Misframed assessment",
  "pa-Gh2glh6gJCHm0mnnXSYbp.js",
  "Privacy-friendly analytics by Plausible",
  "Essay Section Reached",
  "Surface Viewed",
  "Package Path Opened",
  "Workbench Tool Selected",
  "Source Link Clicked",
].forEach((needle) => {
  assert(html.includes(needle), `site should include ${needle}`);
});

[
  "SECTION: OPERATING RULES",
  "SECTION: ESSAY",
  "SECTION: CLAIMS",
  "SECTION: SOURCE SPINE",
  "SECTION: OBJECTIONS",
  "SECTION: WORKFLOW PATTERNS",
  "SECTION: TRANSFER CASE",
  "SECTION: TRACEABLE ARTIFACT",
  "SECTION: STARTER PROMPTS",
  "AI Assistant Instructions",
  "NWC must teach and certify AI-enabled strategic judgment",
].forEach((needle) => {
  assert(companionContext.includes(needle), `context bundle should include ${needle}`);
});

assert(
  (html.match(/https:\/\/judgmentlab\.net\/assets\/companion-context\.md/g) || []).length >= 7,
  "setup prompt and six starter prompts should all point at the context bundle",
);

const workbenchContextPath = join(dist, "assets", "workbench-context.md");
assert(existsSync(workbenchContextPath), "workbench context bundle should exist after build");
const workbenchContextSize = statSync(workbenchContextPath).size;
assert(workbenchContextSize > 30_000, "workbench context bundle should contain the workbench source materials");
assert(workbenchContextSize < 150_000, "workbench context bundle should stay within a one-paste size budget");
const workbenchContext = readFileSync(workbenchContextPath, "utf8");
[
  "SECTION: OPERATING RULES",
  "SECTION: FRAMEWORK",
  "SECTION: CONCEPTS",
  "Start From Your Question",
  "Vocabulary Bridge",
  "the card is the source",
  "assistant is the runtime",
  "gated on evals",
  "curated context",
  "inter-rater reliability",
  "AI Facilitation Block",
  "Hypothesis — awaiting NWC validation",
].forEach((needle) => {
  assert(workbenchContext.includes(needle), `workbench bundle should include ${needle}`);
});

const workbenchRepoPath = process.env.WORKBENCH_REPO_PATH || join(root, "..", "workbench");
["templates", "concepts"].forEach((dir) => {
  const dirPath = join(workbenchRepoPath, dir);
  assert(existsSync(dirPath), `workbench ${dir}/ directory should exist`);
  const files = readdirSync(dirPath).filter((name) => name.endsWith(".md"));
  assert(files.length > 0, `workbench ${dir}/ should contain markdown files`);
  files.forEach((name) => {
    const probe = readFileSync(join(dirPath, name), "utf8").trim().slice(0, 200);
    assert(workbenchContext.includes(probe), `workbench bundle should include content of ${dir}/${name}`);
  });
});

const conceptsAt = workbenchContext.indexOf("SECTION: CONCEPTS");
assert(
  workbenchContext.indexOf("SECTION: FRAMEWORK") < conceptsAt &&
    conceptsAt < workbenchContext.indexOf("SECTION: PHASE PLACEMENT DIAGNOSTIC"),
  "CONCEPTS section should sit between FRAMEWORK and the templates",
);

assert(
  /No repository\s+knowledge required/.test(html),
  "workbench should tell faculty no repository knowledge is required",
);

[
  'data-mode="overview"',
  'data-mode="essay"',
  'data-mode="companion"',
  'data-mode="workbench"',
  'data-mode="sources"',
].forEach((needle) => {
  assert(html.includes(needle), `site should include ${needle}`);
});

[
  "assets/workbench/assignment-design-worksheet.md",
  "assets/workbench/assessment-and-oral-defense-rubric.md",
  "assets/workbench/flawed-output-library-template.md",
  "assets/workbench/source-kit-template.md",
  "assets/workbench/faculty-calibration-protocol.md",
  "assets/workbench/after-action-note-template.md",
].forEach((asset) => {
  const filename = asset.split("/").pop();
  assert(html.includes(filename), `site should include ${filename}`);
  assert(existsSync(join(dist, asset)), `${asset} should be generated`);
});

assert(
  html.includes("AI Facilitation Block"),
  "workbench templates should be read from the workbench repo (facilitation blocks present)",
);

[
  "assets/workbench/phase-placement-diagnostic.md",
  "assets/workbench/method-card-template.md",
  "assets/workbench/supervised-delegation-exercise.md",
].forEach((asset) => {
  const filename = asset.split("/").pop();
  assert(html.includes(filename), `site should include ${filename}`);
  assert(existsSync(join(dist, asset)), `${asset} should be generated`);
});

const firstToolId = html.match(/data-tool-id="([a-z-]+)"/);
assert(firstToolId && firstToolId[1] === "phase-diagnostic", "workbench should lead with the phase placement diagnostic");
assert(html.includes('data-copy-target="workbench-setup-prompt"'), "workbench should include a copyable setup prompt");
assert(html.includes('href="assets/workbench-context.md"'), "workbench should link the context bundle");
assert(
  (html.match(/https:\/\/judgmentlab\.net\/assets\/workbench-context\.md/g) || []).length >= 1,
  "workbench setup prompt should point at the workbench bundle",
);
assert(existsSync(join(dist, "assets", "asking-to-supervising.svg")), "progression visual should be copied into assets");
assert(html.includes("assets/asking-to-supervising.svg"), "workbench page should show the fluency progression visual");

[
  ["Open", "companion", "repo"],
  ["Open", "workbench", "repo"],
  ["Faculty", "Guide"],
  ["Agent", "Mode"],
  ["Open", "Claw"],
  ["Open", "Code"],
  ["Claude", "Code"],
  ["Download", "companion", "note"],
].forEach((parts) => {
  const label = parts.join(parts.length === 2 && parts[0] === "Open" ? "" : " ");
  assert(!html.includes(label), "public copy should not include stale labels or tool names");
});
assert(!html.includes("Start session"), "overview should not imply an in-page chat session starts");
assert(!html.includes("<h3>Library</h3>"), "public package should not expose the old library card");
assert(!html.includes("codeministry.net"), "public package should not link to the old librarian reference as a package card");
assert(!html.includes("Site source"), "public package should not show old site-source framing");
assert(!html.includes("class=\"brand\""), "site should not include the NWC badge/logo treatment");

assert(html.includes("fonts.googleapis.com"), "site should load approved web fonts");
assert(html.includes("Fraunces"), "site should include Fraunces display font");
assert(html.includes("Newsreader"), "site should include Newsreader body font");
assert(html.includes("IBM Plex Mono"), "site should include IBM Plex Mono UI font");

assert(
  html.includes('body:not([data-active-mode="essay"]) .toc'),
  "essay navigation should be hidden outside essay mode",
);
assert(html.includes(".toc::after"), "essay navigation should include a fill layer for reading progress");
assert(html.includes("--toc-progress"), "essay navigation should expose a progress variable");
assert(html.includes("function updateTocProgress()"), "site should update essay navigation as the reader scrolls");
assert(html.includes('window.addEventListener("hashchange"'), "site should respond to mode hash changes");
assert(html.includes("classList.toggle(\"is-active\""), "site should mark the active essay section");
assert(html.includes("classList.toggle(\"is-past\""), "site should mark completed essay sections");
assert(html.includes("function openEssaySection"), "site should support opening essay sections from overview links");

assert(html.includes("data-copy-target=\"setup-prompt\""), "companion should include a copyable setup prompt");
assert(html.includes("data-essay-section-link=\"ix-a-foundation-pilot\""), "overview should link directly to the foundation pilot");
assert(html.includes("navigator.clipboard.writeText"), "copy buttons should write prompt/template text to the clipboard");
assert(html.includes("data-tool-id=\"assignment-design\""), "workbench should expose selectable template cards");
assert(html.includes("function scrollElementBelowNav"), "site should share one sticky-nav-aware scroll helper");
assert(html.includes("scrollElementBelowNav(selectedTool"), "workbench cards should reveal the selected template below the sticky nav");
assert(html.includes("id=\"workbench-tools\""), "workbench should expose a target for returning to the tool grid");
assert(html.includes("data-workbench-tools-link"), "selected workbench templates should include a return-to-tools control");
assert(html.includes("function trackPackageEvent"), "site should include a Plausible event wrapper");
assert(html.includes("location.hostname === \"localhost\""), "analytics events should be suppressed on localhost");
assert(html.includes("window.plausible(name, { props })"), "analytics wrapper should send custom event properties");
assert(html.includes("width: 16%;"), "argument tables should use a compact first column");
assert((html.match(/width: 42%;/g) || []).length >= 2, "argument tables should split the remaining columns evenly");

assert(
  !html.includes('<h2 id="purpose-accountability-and-ai-enabled-strategic-judgment">Purpose, Accountability, and AI-Enabled Strategic Judgment</h2>'),
  "essay body should not repeat the subtitle as its first heading",
);

const articleStart = html.indexOf('<article class="essay article-body">');
const articleEnd = html.indexOf("</article>", articleStart);
const articleHtml = html.slice(articleStart, articleEnd);
const firstParagraph = articleHtml.indexOf("Strategic decisions are increasingly built from AI-shaped inputs");
const firstPullQuote = articleHtml.indexOf("AI did not lower the bar for strategic judgment. It raised it, then hid whether the officer cleared it.");
const framingPullQuote = articleHtml.indexOf("The framing is where the judgment lives.");
const accountabilityPullQuote = articleHtml.indexOf("AI can compress the work before a decision. It cannot own what follows.");
const failureTable = articleHtml.indexOf("Core Failure Modes");
const relianceTable = articleHtml.indexOf("What Counts As Reliance Evidence");
const relianceSection = articleHtml.indexOf("Appropriate Reliance as a Teachable Competency");
const frictionCard = articleHtml.indexOf("Which Friction Matters");
const frictionSection = articleHtml.indexOf("Friction as Developmental Design");
const accountabilitySection = articleHtml.indexOf("Accountability Is Structural");
const pilotSequence = articleHtml.indexOf("Foundation Pilot Sequence");
const pilotSection = articleHtml.indexOf("A Foundation Pilot");
const closingStandard = articleHtml.indexOf("Frame the problem.");

assert((articleHtml.match(/class="argument-insert pull-quote"/g) || []).length === 3, "essay should render three modest pull quotes");
assert(firstPullQuote > firstParagraph, "first pull quote should reinforce the opening claim after the first paragraph");
assert(failureTable > firstPullQuote, "failure mode table should appear after the opening pull quote");
assert(failureTable < relianceSection, "failure mode table should appear before the reliance section");
assert(relianceTable > relianceSection, "reliance table should appear inside the reliance section");
assert(relianceTable < frictionSection, "reliance table should appear before the friction section");
assert(framingPullQuote > failureTable, "framing pull quote should appear after the failure table");
assert(frictionCard > frictionSection, "friction card should appear inside the friction section");
assert(frictionCard < accountabilitySection, "friction card should appear before the accountability section");
assert(accountabilityPullQuote > accountabilitySection, "accountability pull quote should appear inside the accountability section");
assert(pilotSequence > pilotSection, "pilot sequence should appear inside the pilot section");
assert(closingStandard > pilotSequence, "closing standard should appear after the pilot sequence");
assert(articleHtml.includes("class=\"argument-insert closing-standard\""), "essay should render the closing standard as a designed element");
assert(!articleHtml.includes("assets/human-ai-human-loop.png"), "essay should use argument inserts instead of the old loop figure");
assert(!articleHtml.includes("assets/framing-ladder.png"), "essay should use argument inserts instead of the old ladder figure");

const workbenchToolsJson = html.match(/const workbenchTools = (\[.*?\]);/u);
assert(workbenchToolsJson, "client script should embed the workbench tools JSON");
const embeddedWorkbenchTools = JSON.parse(workbenchToolsJson[1]);
assert(
  embeddedWorkbenchTools.filter((tool) => tool.html && tool.html.includes("<table>")).length >= 2,
  "rendered workbench documents should include real tables",
);
embeddedWorkbenchTools.forEach((tool) => {
  assert(tool.html && tool.html.length > 0, `embedded tool ${tool.filename} should carry rendered html`);
  assert(tool.markdown && tool.markdown.length > 0, `embedded tool ${tool.filename} should keep raw markdown for copy`);
  assert(
    !/\]\(\.\.\//u.test(tool.html),
    `rendered HTML for ${tool.filename} should contain no raw relative markdown links`,
  );
});

const workbenchConceptsJson = html.match(/const workbenchConcepts = (\[.*?\]);/u);
assert(workbenchConceptsJson, "client script should embed the workbench concepts JSON");
const embeddedWorkbenchConcepts = JSON.parse(workbenchConceptsJson[1]);
assert(
  embeddedWorkbenchConcepts.filter((note) => note.html && note.html.includes("<blockquote>")).length >= 4,
  "rendered concept surfaces should include blockquotes (at least 4)",
);
embeddedWorkbenchConcepts.forEach((note) => {
  assert(note.html && note.html.length > 0, `embedded concept ${note.filename} should carry rendered html`);
  assert(note.markdown && note.markdown.length > 0, `embedded concept ${note.filename} should keep raw markdown for copy`);
  assert(
    !/\]\(\.\.\//u.test(note.html),
    `rendered HTML for concept ${note.filename} should contain no raw relative markdown links`,
  );
});

const conceptLink = embeddedWorkbenchTools.find((tool) => tool.html.includes("#wb-doc-method-cards-and-agent-skills"));
if (conceptLink) {
  const targetConcept = embeddedWorkbenchConcepts.find((note) => note.id === "method-cards-and-agent-skills");
  assert(targetConcept, "template link to concept method-cards-and-agent-skills should resolve to embedded concept");
}

const docViewStart = html.indexOf('id="workbench-doc-view"');
assert(docViewStart !== -1, "workbench should display the selected document as rendered HTML");
const docViewHtml = html.slice(docViewStart, html.indexOf("</article>", docViewStart));
assert(!/\]\(\.\.\//u.test(docViewHtml), "rendered HTML should contain no raw relative markdown links");
assert(docViewHtml.includes("data-wb-link"), "rendered documents should rewrite internal links to workbench anchors");

assert(
  html.includes('id="workbench-concepts"'),
  "workbench should include a section for concept notes",
);
assert(
  html.includes('data-concept-id='),
  "workbench should include clickable concept cards",
);

const conceptsDir = join(dist, "assets", "workbench", "concepts");
assert(existsSync(conceptsDir), "concepts directory should be created in dist/assets/workbench/");
const conceptFiles = readdirSync(conceptsDir).filter((name) => name.endsWith(".md"));
assert(conceptFiles.length === 6, "six concept files should be emitted to dist/assets/workbench/concepts/");
conceptFiles.forEach((file) => {
  const path = join(conceptsDir, file);
  const content = readFileSync(path, "utf8");
  assert(content.length > 0, `concept file ${file} should have content`);
});

console.log("site contract passed");
