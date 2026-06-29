import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const indexPath = join(dist, "index.html");
const pdfPath = join(dist, "assets", "the-irreducible-officer.pdf");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

assert(existsSync(indexPath), "dist/index.html should exist after build");
assert(existsSync(pdfPath), "downloadable essay PDF should exist after build");
assert(statSync(pdfPath).size > 20_000, "essay PDF should be a real generated artifact");

const html = readFileSync(indexPath, "utf8");

[
  "The Irreducible Officer",
  "Published June 28, 2026",
  "Essay",
  "Companion",
  "Faculty Guide",
  "Agent Mode",
  "Copy setup prompt",
  "Open companion repo",
  "https://github.com/jackcshaw/nwc-irreducible-officer-agent-mode",
  "https://github.com/jackcshaw/nwc-faculty-workbench",
  "AGENTS.md",
  "claims.md",
  "prompts/starter-prompts.md",
  "prompts/objections-and-responses.md",
  "sources/source-spine.md",
  "patterns/nwc-ai-enabled-learning-workflows.md",
  "cases/cyber-group-strategy-transfer-case.md",
  "artifacts/traceable-learning-artifact.md",
  "Design An NWC Exercise",
  "Create A Flawed AI Assessment",
  "Run Oral Defense",
  "NWC Primer",
  "Instructional Source Kit",
  "traceable learning artifact",
  "interrogate the essay itself",
  "Download PDF",
].forEach((needle) => {
  assert(html.includes(needle), `site should include ${needle}`);
});

["data-mode=\"essay\"", "data-mode=\"companion\"", "data-mode=\"guide\""].forEach((needle) => {
  assert(html.includes(needle), `site should include ${needle}`);
});

assert(!html.includes("class=\"brand\""), "site should not include the NWC badge/logo treatment");
assert(!html.includes("class=\"top-nav\""), "site should not include a competing top tab bar");
assert(!html.includes("class=\"hero-actions\""), "site should not include duplicate hero mode controls");
assert(html.includes("class=\"mode-switch\""), "site should include one clean mode switch");
assert(html.includes("class=\"article-shell\""), "site should use the clean article frame");
assert(html.includes("data-toc-link="), "essay table of contents should expose progress-aware links");
assert(
  !html.includes('data-toc-link="purpose-accountability-and-ai-enabled-strategic-judgment"'),
  "essay table of contents should skip the suppressed subtitle heading",
);
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
assert(html.includes("data-copy-target=\"setup-prompt\""), "companion should include a copyable setup prompt");
assert(html.includes("navigator.clipboard.writeText"), "copy buttons should write prompt text to the clipboard");
assert(!html.includes("## Purpose"), "companion tab should not render the old markdown appendix as its primary surface");
assert(!html.includes(".site-header {\n  position: fixed;"), "PDF header should not float over the article while reading");
assert(
  !html.includes('<h2 id="purpose-accountability-and-ai-enabled-strategic-judgment">Purpose, Accountability, and AI-Enabled Strategic Judgment</h2>'),
  "essay body should not repeat the subtitle as its first heading",
);

const articleStart = html.indexOf('<article class="essay article-body">');
const articleEnd = html.indexOf("</article>", articleStart);
const articleHtml = html.slice(articleStart, articleEnd);
const firstParagraph = articleHtml.indexOf("Strategic decisions are increasingly built from AI-shaped inputs");
const loopImage = articleHtml.indexOf("assets/human-ai-human-loop.png");
const relianceSection = articleHtml.indexOf("Appropriate Reliance as a Teachable Competency");
const frictionSection = articleHtml.indexOf("Friction as Developmental Design");
const ladderImage = articleHtml.indexOf("assets/framing-ladder.png");
const assessmentSection = articleHtml.indexOf("Assessment That Makes Ownership Visible");
const pilotSection = articleHtml.indexOf("A Foundation Pilot");

assert(loopImage < relianceSection, "human-AI-human loop figure should introduce the reliance section");
assert(loopImage < frictionSection, "human-AI-human loop figure should appear before the essay moves to friction");
assert(loopImage > firstParagraph, "human-AI-human loop figure should not appear before the opening prose");
assert(ladderImage < assessmentSection, "framing ladder figure should introduce the assessment section");
assert(ladderImage < pilotSection, "framing ladder figure should appear before the pilot section");

console.log("site contract passed");
