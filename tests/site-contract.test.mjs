import { existsSync, readFileSync, statSync } from "node:fs";
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
  (html.match(/https:\/\/nwc-learning-companion\.web\.app\/assets\/companion-context\.md/g) || []).length >= 7,
  "setup prompt and six starter prompts should all point at the context bundle",
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

assert(!html.includes("Open companion repo"), "companion should not default to repo-first behavior");
assert(!html.includes("Open workbench repo"), "workbench should not default to repo-first behavior");
assert(!html.includes("Faculty Guide"), "old combined faculty guide should be replaced");
assert(!html.includes("Agent Mode"), "public copy should avoid agent jargon as the main label");
assert(!html.includes("OpenClaw"), "public site should not include stale OpenClaw copy");
assert(!html.includes("OpenCode"), "public site should not include coding-agent tool names");
assert(!html.includes("Claude Code"), "public site should not include coding-agent tool names");
assert(!html.includes("Download companion note"), "companion download should be relabeled as a context file");
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
assert(html.includes("scrollIntoView"), "workbench cards should reveal the selected template");
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

console.log("site contract passed");
