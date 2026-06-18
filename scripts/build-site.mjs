import { rmSync, mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const sourcePath = join(root, "nwc-human-machine-teaming-companion-draft.md");
const distDir = join(root, "dist");
const assetsDir = join(distDir, "assets");
const pdfPath = join(assetsDir, "assuring-learning-after-automation.pdf");
const siteUrl = "https://nwc-learning-companion.web.app";
const repoUrl = "https://github.com/jackcshaw/nwc-learning-companion";
const pythonPath =
  process.env.PDF_PYTHON ||
  "/Users/jackcshaw-2/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3";

const source = readFileSync(sourcePath, "utf8");
const marker = "\n# Companion Agentic Tool";
const markerIndex = source.indexOf(marker);

if (markerIndex === -1) {
  throw new Error("Could not find companion section marker");
}

const essayMarkdown = source
  .slice(0, markerIndex)
  .trim()
  .replace(/\n---\s*$/u, "")
  .trim();
const companionMarkdown = source.slice(markerIndex + 1).trim();

rmSync(distDir, { recursive: true, force: true });
mkdirSync(assetsDir, { recursive: true });

writeFileSync(join(assetsDir, "essay.md"), essayMarkdown + "\n", "utf8");
writeFileSync(join(assetsDir, "companion.md"), companionMarkdown + "\n", "utf8");

const assetResult = spawnSync(
  pythonPath,
  [join(root, "scripts", "generate-assets.py"), sourcePath, assetsDir],
  { cwd: root, stdio: "inherit" },
);

if (assetResult.status !== 0) {
  throw new Error("Asset generation failed");
}

if (!existsSync(pdfPath)) {
  throw new Error("PDF asset was not generated");
}

const essayToc = collectHeadings(essayMarkdown, { skipFirstH2: true });
const essayHtml = placeEssayFigures(
  renderMarkdown(essayMarkdown, { skipFirstH1: true, skipFirstH2: true }),
);
const companionModeHtml = buildCompanionMode();
const facultyGuideHtml = buildFacultyGuide();

writeFileSync(
  join(distDir, "index.html"),
  buildHtml({ essayToc, essayHtml, companionModeHtml, facultyGuideHtml }),
  "utf8",
);

console.log("Built dist/index.html and downloadable assets");

function buildHtml({ essayToc, essayHtml, companionModeHtml, facultyGuideHtml }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Assuring Learning After Automation</title>
  <meta name="description" content="A long-form NWC essay and companion exercise on assurance of learning, frame literacy, and AI-enabled judgment.">
  <style>${css()}</style>
</head>
<body data-active-mode="essay">
  <header class="site-header">
    <a class="download-link" href="assets/assuring-learning-after-automation.pdf" download>Download PDF</a>
  </header>

  <main id="top" class="article-shell">
    <aside class="toc" aria-label="Essay sections">
      ${essayToc
        .map((item, index) => `<a href="#${item.id}" data-toc-link="${item.id}"><span></span>${index + 1}. ${escapeHtml(item.text)}</a>`)
        .join("\n      ")}
    </aside>

    <div class="content-frame">
      <div class="published">Published June 17, 2026</div>
      <div class="rule-frame" aria-hidden="true"></div>
      <section class="article-hero">
        <h1>Assuring Learning After Automation</h1>
        <p class="dek">Teaching frame literacy as a leadership competency at NWC.</p>
      </section>

    <section class="mode-view is-active" data-mode="essay">
      <article class="essay article-body">
        ${essayHtml}
      </article>
    </section>

    <section class="mode-view" data-mode="companion">
      ${companionModeHtml}
    </section>

    <section class="mode-view" data-mode="guide">
      <div class="mode-shell faculty-guide">
        ${facultyGuideHtml}
      </div>
    </section>
    </div>
  </main>

  <nav class="mode-switch" aria-label="Switch reading mode">
    <button type="button" data-mode-tab="essay" aria-pressed="true">Essay</button>
    <button type="button" data-mode-tab="companion" aria-pressed="false">Companion</button>
    <button type="button" data-mode-tab="guide" aria-pressed="false">Faculty Guide</button>
  </nav>

  <script>${clientJs()}</script>
</body>
</html>
`;
}

function placeEssayFigures(html) {
  return html
    .replace('<h2 id="what-ai-makes-cheap">What AI Makes Cheap</h2>', `${humanAiLoopFigure()}
<h2 id="what-ai-makes-cheap">What AI Makes Cheap</h2>`)
    .replace('<h2 id="the-frame-is-not-the-framer">The Frame Is Not the Framer</h2>', `${framingLadderFigure()}
<h2 id="the-frame-is-not-the-framer">The Frame Is Not the Framer</h2>`);
}

function humanAiLoopFigure() {
  return `<figure class="argument-visual">
    <img src="assets/human-ai-human-loop.png" alt="Human frames the problem, AI collapses work inside the frame, and the human judges the result." width="1400" height="760">
    <figcaption>The companion is designed around the same loop the essay argues for: human framing, machine assistance, human judgment, and a traceable learning artifact.</figcaption>
  </figure>`;
}

function framingLadderFigure() {
  return `<figure class="argument-visual">
    <img src="assets/framing-ladder.png" alt="A ladder of framing responsibility from generic AI use to institution-shaped workflows." width="1400" height="760">
    <figcaption>The goal is not more tool use. The goal is clearer responsibility for the frame at each level of AI-enabled work.</figcaption>
  </figure>`;
}

function buildCompanionMode() {
  return `<div class="mode-shell agent-mode">
    <section class="mode-intro agent-intro">
      <p class="eyebrow">Agent Mode</p>
      <h2>Turn the essay into a working session.</h2>
      <p>
        The companion is not another appendix. It is a launcher for Codex,
        Claude Code, OpenClaw, or another coding agent. Copy the setup prompt,
        point the agent at the companion repo, and use the prompts to interrogate
        the essay, test claims, design an NWC exercise, and export a traceable
        learning artifact.
      </p>
      <div class="agent-actions">
        <button class="copy-button primary" type="button" data-copy-target="setup-prompt">Copy setup prompt</button>
        <a class="repo-link" href="${repoUrl}" target="_blank" rel="noreferrer">Open companion repo</a>
      </div>
    </section>

    <section class="setup-panel">
      <div class="panel-heading">
        <p class="eyebrow">Connect Your Agent</p>
        <h3>Paste this once into your agent.</h3>
      </div>
      ${copyBlock("setup-prompt", setupPrompt())}
    </section>

    <section class="repo-map">
      <p class="eyebrow">What The Repo Contains</p>
      <h3>The repo is the source kit the agent should read before helping.</h3>
      <div class="source-grid compact">
        ${sourceItem("README.md", "Explains the purpose, public-safe boundary, and first setup prompt.")}
        ${sourceItem("AGENTS.md", "Gives the agent operating rules for summaries, evidence checks, objections, and exercises.")}
        ${sourceItem("claims.md", "Maps the essay's core claims, evidence, unresolved questions, and where to look next.")}
        ${sourceItem("prompts/", "Holds starter prompts and objections so faculty can copy a task without inventing workflow language.")}
        ${sourceItem("sources/", "Keeps the public source spine separate from our interpretation of the argument.")}
        ${sourceItem("cases/ and artifacts/", "Frames the transfer exercise and the traceable learning artifact without publishing local course materials.")}
      </div>
    </section>

    <section class="starter-section">
      <p class="eyebrow">Start Here</p>
      <h3>Copy one prompt and let the agent work against the repo.</h3>
      <div class="prompt-grid">
        ${starterPromptCards()}
      </div>
    </section>
  </div>`;
}

function setupPrompt() {
  return `You are helping me read and use the essay "Assuring Learning After Automation."
${siteUrl}

Use this companion GitHub repo as your source of truth:
${repoUrl}

If you can access GitHub or run shell commands, clone or open that repo first. Start with only these files:
- README.md
- AGENTS.md
- claims.md
- prompts/starter-prompts.md
- prompts/objections-and-responses.md
- sources/source-spine.md
- cases/cyber-group-strategy-transfer-case.md
- artifacts/traceable-learning-artifact.md

Do not answer from the essay alone. Use the repo to help me do one useful thing with the argument.

Start by giving me:
1. the cleanest version of the core claim;
2. the part of the argument most relevant to an NWC instructor or curriculum leader;
3. the most useful starter prompt from the repo for my next step.

If I ask to inspect evidence, read claims.md and sources/source-spine.md. If I ask to design an exercise, read cases/cyber-group-strategy-transfer-case.md and artifacts/traceable-learning-artifact.md. If I ask to argue with the essay, read prompts/objections-and-responses.md.

If you cannot access GitHub directly, tell me the smallest set of repo files you need me to paste before you continue.`;
}

function starterPromptCards() {
  const prompts = [
    {
      id: "prompt-understand",
      title: "Understand The Argument",
      bestFor: "Get the clean version before debating or applying it.",
      text: `Use "Assuring Learning After Automation" and the companion repo to explain the argument in 10 bullets.

Start with README.md, AGENTS.md, claims.md, and sources/source-spine.md.

Do not turn this into a generic AI-in-education summary. Preserve the specific claim: once AI can produce the visible artifact, NWC must teach and assess frame ownership, appropriate reliance, and human accountability.

Return the thesis, 10-bullet argument, most likely misunderstanding, why it is tempting, and two questions NWC faculty should keep open.`,
    },
    {
      id: "prompt-claims",
      title: "Inspect The Claims",
      bestFor: "Let faculty pressure-test the essay instead of passively receiving it.",
      text: `Use the companion repo to help me inspect the evidence behind "Assuring Learning After Automation."

Read claims.md and sources/source-spine.md first.

List 5-7 important claims from the essay that are worth auditing. For each one, give me a short label and one sentence on why it matters. Then ask me which claim I want to inspect.

After I pick one, audit it with me: best evidence, strongest unresolved question or counterexample, where the evidence is strong or incomplete, what source I should read, and one implication for NWC instruction.`,
    },
    {
      id: "prompt-exercise",
      title: "Design An NWC Exercise",
      bestFor: "Turn the essay into a practical faculty activity.",
      text: `I want to turn "Assuring Learning After Automation" into a practical NWC learning exercise.

Read README.md, AGENTS.md, claims.md, cases/cyber-group-strategy-transfer-case.md, and artifacts/traceable-learning-artifact.md.

Design a 60-90 minute exercise that begins by interrogating the essay itself, then transfers the method to an approved NWC-style artifact. It must force the learner to identify the frame, assumptions, evidence standard, AI reliance decisions, and a flawed AI output or flawed frame.

Return the learning objective, materials, step-by-step flow, facilitator notes, outputs, assessment criteria, and likely failure modes.`,
    },
    {
      id: "prompt-flawed",
      title: "Create A Flawed AI Assessment",
      bestFor: "Make AI fluency an object of critique.",
      text: `Create a polished, confident, but flawed strategic assessment for students to critique.

Use claims.md, cases/cyber-group-strategy-transfer-case.md, and artifacts/traceable-learning-artifact.md.

The flaw should sit at the level of frame, assumptions, evidence standard, reliance, or risk treatment. It should not depend on an obvious factual error.

After the student-facing assessment, provide an instructor-only key: hidden frame, flawed assumptions, missing evidence, buried risk or tradeoff, oral-defense questions, stronger frame, and trace artifact entries students should record.`,
    },
    {
      id: "prompt-defense",
      title: "Run Oral Defense",
      bestFor: "Check whether the learner owns the frame.",
      text: `Act as an NWC seminar instructor conducting a short oral defense.

Read AGENTS.md, claims.md, and artifacts/traceable-learning-artifact.md.

Ask one question at a time. Your goal is to determine whether I own the frame behind my AI-assisted work.

Press me on problem frame, assumptions, evidence standards, alternative frames, reliance decisions, rejected AI outputs, risks and costs, what would change my conclusion, and where human judgment must interrupt automation.

After six questions, assess whether I demonstrated ownership of the reasoning and identify what evidence should be added to the traceable learning artifact.`,
    },
    {
      id: "prompt-trace",
      title: "Build The Trace",
      bestFor: "Create evidence faculty can inspect.",
      text: `Using the critique or exercise we just completed, create a traceable learning artifact.

Read artifacts/traceable-learning-artifact.md and claims.md.

Return a completed artifact with problem frame, assumptions, evidence standard, AI role and boundaries, accepted AI contributions, rejected or revised AI contributions, reliance decisions, oral-defense questions, final human judgment, and faculty review notes.

Keep it practical enough to use in one seminar, not as a compliance packet.`,
    },
  ];

  return prompts.map((prompt) => `<article class="prompt-card">
    <div>
      <h4>${escapeHtml(prompt.title)}</h4>
      <p>${escapeHtml(prompt.bestFor)}</p>
    </div>
    ${copyBlock(prompt.id, prompt.text)}
    <button class="copy-button" type="button" data-copy-target="${prompt.id}">Copy prompt</button>
  </article>`).join("\n        ");
}

function copyBlock(id, text) {
  return `<pre class="copy-block"><code id="${id}">${escapeHtml(text)}</code></pre>`;
}

function buildFacultyGuide() {
  return `<section class="mode-intro">
    <p class="eyebrow">Faculty Guide</p>
    <h2>How to use this package with instructors.</h2>
    <p>
      This guide is for Dr. Richard Andres, Col. Dan Whitnam, and NWC faculty
      who want to pressure-test the argument before turning it into a pilot.
      It explains what the source kit is for, what instructors should shape,
      and how the companion turns the essay into a useful steel man for critique.
    </p>
  </section>

  <section class="guide-band">
    <div>
      <p class="eyebrow">Purpose in the moment</p>
      <h3>Use the essay as the object of practice first.</h3>
      <p>
        The companion should not begin with an adjacent assignment. It should
        first ask readers to interrogate the essay itself. That makes the paper
        both the argument and the demonstration: identify the frame, find the
        assumptions, pressure-test objections, and decide what the teaching
        implications would actually require.
      </p>
    </div>
    <div>
      <p class="eyebrow">Then transfer</p>
      <h3>Move from argument to real NWC work.</h3>
      <p>
        After the essay has been mapped, the method transfers to Cyber Group
        Strategy. That artifact creates the right instructional friction because
        it is a real strategic product with problem framing, political aims,
        lines of effort, risks, and AI disclosure.
      </p>
    </div>
  </section>

  <section class="source-kit">
    <p class="eyebrow">Instructional Source Kit</p>
    <h2>A source kit is the instructor-planned context packet for an AI-enabled exercise.</h2>
    <p>
      For faculty who do not think in terms of repos or agent workspaces, the
      source kit is simply the curated teaching packet that tells the companion
      what materials matter, what standards to apply, and what outputs should be
      inspected. It is not a pile of files. It is a designed learning environment.
    </p>
    <div class="source-grid">
      ${sourceItem("Anchor", "The essay defines the argument and gives the companion something to examine before it broadens.")}
      ${sourceItem("Rubric", "The NWC Primer supplies the vocabulary of strategic logic: ends, ways, means, assumptions, costs, risk, and reassessment.")}
      ${sourceItem("Practice Object", "Cyber Group Strategy gives instructors and students a real artifact to critique rather than a generic classroom scenario.")}
      ${sourceItem("Bridge", "Dr. Andres's article on AI and military leadership can connect the exercise to NWC's faculty-facing conversation.")}
      ${sourceItem("Trace", "The required output is a traceable learning artifact that records frame choices, reliance decisions, rejected outputs, and oral-defense questions.")}
      ${sourceItem("Governance", "The kit should document boundaries, source status, intended users, and points where human judgment must interrupt automation.")}
    </div>
  </section>

  <section class="guide-band">
    <div>
      <p class="eyebrow">What faculty shape</p>
      <h3>Faculty judgment belongs inside the kit.</h3>
      <p>
        Instructors decide which friction is developmental, which evidence
        standards matter, which failure modes are worth teaching against, and
        what would count as demonstrated frame ownership. The companion can
        help operationalize those choices, but it should not replace them.
      </p>
    </div>
    <div>
      <p class="eyebrow">Conversation starter</p>
      <h3>This is a useful steel man, not a final doctrine.</h3>
      <p>
        A straw man is a weak version of an idea built to be easy to knock down.
        A steel man is the strongest useful version of an idea, built so smart
        reviewers can find the real weaknesses. This package should invite that
        kind of critique from NWC faculty.
      </p>
    </div>
  </section>`;
}

function sourceItem(title, body) {
  return `<article>
    <h3>${escapeHtml(title)}</h3>
    <p>${escapeHtml(body)}</p>
  </article>`;
}

function collectHeadings(markdown, options = {}) {
  let skippedFirstH2 = false;

  return markdown
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .flatMap((line) => {
      if (options.skipFirstH2 && !skippedFirstH2) {
        skippedFirstH2 = true;
        return [];
      }
      const text = line.replace(/^##\s+/u, "").trim();
      return [{ text, id: slugify(text) }];
    });
}

function renderMarkdown(markdown, options = {}) {
  const lines = markdown.split("\n");
  const html = [];
  let paragraph = [];
  let listType = null;
  let inCode = false;
  let codeLines = [];
  let skippedFirstH1 = false;
  let skippedFirstH2 = false;

  function flushParagraph() {
    if (paragraph.length) {
      html.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  }

  function closeList() {
    if (listType) {
      html.push(`</${listType}>`);
      listType = null;
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.startsWith("```")) {
      flushParagraph();
      closeList();
      if (inCode) {
        html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
        codeLines = [];
        inCode = false;
      } else {
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeLines.push(rawLine);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      closeList();
      continue;
    }

    if (/^---+$/u.test(line.trim())) {
      flushParagraph();
      closeList();
      html.push("<hr>");
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/u);
    if (heading) {
      flushParagraph();
      closeList();
      const level = heading[1].length;
      const text = heading[2].trim();
      if (level === 1 && options.skipFirstH1 && !skippedFirstH1) {
        skippedFirstH1 = true;
        continue;
      }
      if (level === 2 && options.skipFirstH2 && !skippedFirstH2) {
        skippedFirstH2 = true;
        continue;
      }
      const safeLevel = Math.min(level + (level === 1 ? 1 : 0), 4);
      const id = level === 2 ? ` id="${slugify(text)}"` : "";
      html.push(`<h${safeLevel}${id}>${renderInline(text)}</h${safeLevel}>`);
      continue;
    }

    const unordered = line.match(/^\s*-\s+(.+)$/u);
    if (unordered) {
      flushParagraph();
      if (listType !== "ul") {
        closeList();
        html.push("<ul>");
        listType = "ul";
      }
      html.push(`<li>${renderInline(unordered[1])}</li>`);
      continue;
    }

    const ordered = line.match(/^\s*\d+\.\s+(.+)$/u);
    if (ordered) {
      flushParagraph();
      if (listType !== "ol") {
        closeList();
        html.push("<ol>");
        listType = "ol";
      }
      html.push(`<li>${renderInline(ordered[1])}</li>`);
      continue;
    }

    paragraph.push(line.trim());
  }

  flushParagraph();
  closeList();

  return html.join("\n");
}

function renderInline(text) {
  let value = escapeHtml(text);
  value = value.replace(/\[([^\]]+)\]\(([^)]+)\)/gu, (_match, label, href) => {
    return `<a href="${href}" target="_blank" rel="noreferrer">${label}</a>`;
  });
  value = value.replace(/\*\*([^*]+)\*\*/gu, "<strong>$1</strong>");
  value = value.replace(/`([^`]+)`/gu, "<code>$1</code>");
  return value;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/gu, "&amp;")
    .replace(/</gu, "&lt;")
    .replace(/>/gu, "&gt;")
    .replace(/"/gu, "&quot;");
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-|-$/gu, "");
}

function clientJs() {
  return `const buttons = Array.from(document.querySelectorAll("[data-mode-tab]"));
const views = Array.from(document.querySelectorAll("[data-mode]"));
const modeNames = ["essay", "companion", "guide"];
const toc = document.querySelector(".toc");
const tocEntries = Array.from(document.querySelectorAll("[data-toc-link]"))
  .map((link) => ({ link, heading: document.getElementById(link.dataset.tocLink) }))
  .filter((entry) => entry.heading);
let tocFrame = null;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function dotCenterY(entry) {
  const dot = entry.link.querySelector("span");
  if (!toc || !dot) return 0;
  const tocRect = toc.getBoundingClientRect();
  const dotRect = dot.getBoundingClientRect();
  return dotRect.top - tocRect.top + dotRect.height / 2;
}

function updateTocProgress() {
  if (!toc || !tocEntries.length) return;
  if (document.body.dataset.activeMode !== "essay") {
    toc.style.setProperty("--toc-progress", "0px");
    tocEntries.forEach(({ link }) => {
      link.classList.remove("is-active", "is-past");
    });
    return;
  }

  const marker = window.scrollY + Math.min(window.innerHeight * 0.36, 280);
  const positions = tocEntries.map(({ heading }) => heading.getBoundingClientRect().top + window.scrollY);
  let activeIndex = 0;

  positions.forEach((top, index) => {
    if (top <= marker) {
      activeIndex = index;
    }
  });

  const firstY = dotCenterY(tocEntries[0]);
  const lastY = dotCenterY(tocEntries[tocEntries.length - 1]);
  const activeY = dotCenterY(tocEntries[activeIndex]);
  const nextEntry = tocEntries[Math.min(activeIndex + 1, tocEntries.length - 1)];
  const nextY = dotCenterY(nextEntry);
  const activeTop = positions[activeIndex];
  const nextTop = positions[Math.min(activeIndex + 1, positions.length - 1)] || activeTop + window.innerHeight;
  const sectionProgress = nextTop === activeTop ? 0 : clamp((marker - activeTop) / (nextTop - activeTop), 0, 1);
  const fillY = activeY + (nextY - activeY) * sectionProgress;

  toc.style.setProperty("--toc-fill-top", firstY + "px");
  toc.style.setProperty("--toc-progress", clamp(fillY - firstY, 0, lastY - firstY) + "px");

  tocEntries.forEach(({ link }, index) => {
    link.classList.toggle("is-active", index === activeIndex);
    link.classList.toggle("is-past", index < activeIndex);
  });
}

function requestTocUpdate() {
  if (tocFrame !== null) return;
  tocFrame = window.requestAnimationFrame(() => {
    tocFrame = null;
    updateTocProgress();
  });
}

function setMode(mode, shouldScroll = true) {
  document.body.dataset.activeMode = mode;
  buttons.forEach((button) => {
    const active = button.dataset.modeTab === mode;
    button.setAttribute("aria-pressed", String(active));
  });
  views.forEach((view) => {
    view.classList.toggle("is-active", view.dataset.mode === mode);
  });
  if (location.hash !== "#" + mode) {
    history.replaceState(null, "", "#" + mode);
  }
  if (shouldScroll) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  requestTocUpdate();
}

buttons.forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.modeTab));
});

window.addEventListener("scroll", requestTocUpdate, { passive: true });
window.addEventListener("resize", requestTocUpdate);
window.addEventListener("hashchange", () => {
  const mode = location.hash.replace("#", "");
  if (modeNames.includes(mode)) {
    setMode(mode, false);
    return;
  }
  requestTocUpdate();
});

const initial = location.hash.replace("#", "");
if (modeNames.includes(initial)) {
  setMode(initial, false);
}
requestTocUpdate();

document.querySelectorAll("[data-copy-target]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copyTarget);
    if (!target) return;
    const original = button.textContent;
    try {
      await navigator.clipboard.writeText(target.textContent);
      button.textContent = "Copied";
      window.setTimeout(() => {
        button.textContent = original;
      }, 1400);
    } catch {
      button.textContent = "Copy failed";
      window.setTimeout(() => {
        button.textContent = original;
      }, 1400);
    }
  });
});`;
}

function css() {
  return `:root {
  --paper: #fbfaf7;
  --paper-2: #ffffff;
  --ink: #171514;
  --muted: #76716c;
  --faint: #d7d2ca;
  --rail: #a9a5a0;
  --brick: #7c372b;
  --blue: #244f61;
  --green: #526c4d;
  --shadow: 0 14px 36px rgba(42, 31, 22, 0.12);
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", serif;
}

a {
  color: var(--blue);
  text-decoration-thickness: 0.08em;
  text-underline-offset: 0.18em;
}

button,
.download-link {
  transition: transform 160ms var(--ease-out), background-color 180ms ease, color 180ms ease, border-color 180ms ease;
}

button:active,
.download-link:active {
  transform: scale(0.98);
}

.site-header {
  position: absolute;
  top: 24px;
  right: 28px;
  z-index: 20;
}

.download-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  border: 1px solid var(--ink);
  border-radius: 999px;
  background: rgba(251, 250, 247, 0.86);
  backdrop-filter: blur(10px);
  color: var(--ink);
  font: 750 14px/1 ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  padding: 0 18px;
  text-decoration: none;
}

.download-link {
  color: var(--ink);
}

.download-link:hover {
  background: var(--ink);
  color: var(--paper-2);
}

.article-shell {
  display: grid;
  grid-template-columns: minmax(170px, 220px) minmax(0, 800px);
  gap: 48px;
  max-width: 1180px;
  margin: 0 auto;
  padding: 42px 28px 132px;
}

body:not([data-active-mode="essay"]) .article-shell {
  grid-template-columns: minmax(0, 800px);
  justify-content: center;
  max-width: 856px;
}

.content-frame {
  min-width: 0;
  padding-top: 5px;
}

.published {
  margin: 0 0 22px;
  color: #5f5b56;
  font: 500 14px/1.3 ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.rule-frame {
  height: 9px;
  border-top: 2px solid var(--ink);
  border-bottom: 2px solid var(--ink);
}

.article-hero {
  padding: 84px 0 34px;
  text-align: left;
}

.eyebrow {
  margin: 0 0 16px;
  color: var(--brick);
  font: 800 12px/1.25 ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  letter-spacing: 0;
  text-transform: uppercase;
}

h1,
h2,
h3,
p {
  margin: 0;
}

h1 {
  max-width: 760px;
  font-size: clamp(48px, 5.2vw, 70px);
  font-weight: 520;
  line-height: 1.02;
}

.dek {
  max-width: 720px;
  margin: 24px 0 0;
  color: var(--ink);
  font-size: clamp(22px, 2.4vw, 30px);
  line-height: 1.22;
}

.mode-view {
  display: none;
}

.mode-view.is-active {
  display: block;
}

.toc {
  --toc-fill-top: 7px;
  --toc-progress: 0px;
  position: sticky;
  top: 28px;
  align-self: start;
  max-height: calc(100vh - 56px);
  overflow: auto;
  padding: 0 0 22px;
}

body:not([data-active-mode="essay"]) .toc {
  display: none;
}

.toc::before {
  content: "";
  position: absolute;
  z-index: 0;
  left: 9px;
  top: 7px;
  bottom: 14px;
  width: 1px;
  background: #c9c5c0;
}

.toc::after {
  content: "";
  position: absolute;
  z-index: 0;
  left: 9px;
  top: var(--toc-fill-top);
  width: 1px;
  height: var(--toc-progress);
  max-height: calc(100% - var(--toc-fill-top) - 14px);
  background: var(--ink);
  transition: height 140ms linear;
}

.toc a {
  position: relative;
  z-index: 1;
  display: block;
  min-height: 31px;
  margin: 0 0 15px;
  padding: 0 0 0 34px;
  color: #918d89;
  font: 500 13px/1.35 ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  text-decoration: none;
  transition: color 160ms ease;
}

.toc a span {
  position: absolute;
  left: 5px;
  top: 3px;
  width: 9px;
  height: 9px;
  border: 1px solid #9b9792;
  border-radius: 50%;
  background: var(--paper);
  transition: background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
}

.toc a:hover {
  color: var(--ink);
}

.toc a.is-active,
.toc a.is-past {
  color: var(--ink);
}

.toc a.is-active {
  font-weight: 750;
}

.toc a.is-active span,
.toc a.is-past span {
  border-color: var(--ink);
  background: var(--ink);
}

.toc a.is-active span {
  box-shadow: 0 0 0 4px var(--paper);
}

.article-body {
  font-size: 21px;
  line-height: 1.55;
}

.article-body h2 {
  margin: 48px 0 18px;
  padding-top: 18px;
  border-top: 1px solid var(--faint);
  font-size: clamp(28px, 2.7vw, 36px);
  font-weight: 520;
  line-height: 1.08;
}

.article-body h3 {
  margin: 36px 0 12px;
  color: var(--blue);
  font-size: 27px;
  font-weight: 650;
  line-height: 1.12;
}

.article-body h4 {
  margin: 28px 0 10px;
  font: 800 16px/1.25 ui-sans-serif, system-ui, sans-serif;
  color: var(--brick);
}

.article-body p {
  margin: 0 0 22px;
}

.article-body ul,
.article-body ol {
  margin: 0 0 26px;
  padding-left: 24px;
}

.article-body li {
  margin: 8px 0;
}

.article-body pre {
  margin: 26px 0;
  padding: 18px;
  overflow: auto;
  border: 1px solid var(--faint);
  border-radius: 8px;
  background: #211f1e;
  color: #fffaf1;
  font: 14px/1.55 ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
}

.article-body code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
  font-size: 0.9em;
}

.argument-visual {
  margin: 48px 0 34px;
  padding: 0;
}

.argument-visual img {
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid var(--faint);
  border-radius: 8px;
  background: var(--paper-2);
  box-shadow: var(--shadow);
}

.argument-visual figcaption {
  margin-top: 10px;
  color: var(--muted);
  font: 650 13px/1.45 ui-sans-serif, system-ui, sans-serif;
}

.mode-shell {
  max-width: 800px;
  margin: 0;
  padding: 0 0 54px;
}

.mode-intro {
  max-width: 760px;
  border-top: 1px solid var(--faint);
  padding-top: 18px;
}

.mode-intro h2,
.source-kit h2 {
  font-size: clamp(34px, 4vw, 52px);
  font-weight: 520;
  line-height: 1.04;
}

.mode-intro p:not(.eyebrow),
.source-kit > p:not(.eyebrow) {
  margin-top: 18px;
  color: var(--muted);
  font-size: 22px;
  line-height: 1.48;
}

.agent-mode {
  max-width: 820px;
}

.agent-intro {
  border-top: 2px solid var(--ink);
}

.agent-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
}

.copy-button,
.repo-link {
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--ink);
  border-radius: 999px;
  cursor: pointer;
  font: 750 13px/1 ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  padding: 0 16px;
  text-decoration: none;
  transition: transform 160ms var(--ease-out), background-color 180ms ease, color 180ms ease, border-color 180ms ease;
}

.copy-button {
  background: var(--paper-2);
  color: var(--ink);
}

.copy-button.primary,
.copy-button:hover,
.repo-link:hover {
  background: var(--ink);
  color: var(--paper-2);
}

.copy-button.primary:hover {
  background: #34302d;
}

.repo-link {
  background: transparent;
  color: var(--ink);
}

.setup-panel,
.repo-map,
.starter-section {
  margin-top: 44px;
  padding-top: 24px;
  border-top: 1px solid var(--faint);
}

.panel-heading {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 6px;
  margin-bottom: 16px;
}

.panel-heading h3,
.repo-map h3,
.starter-section h3 {
  max-width: 760px;
  font-size: clamp(28px, 3vw, 40px);
  font-weight: 520;
  line-height: 1.08;
}

.copy-block {
  margin: 0;
  max-height: 360px;
  overflow: auto;
  border: 1px solid var(--faint);
  border-radius: 8px;
  background: #211f1e;
  color: #fffaf1;
  padding: 18px;
  white-space: pre-wrap;
}

.copy-block code {
  font: 13px/1.55 ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
}

.source-grid.compact {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin-bottom: 0;
}

.source-grid.compact h3 {
  margin-top: 0;
  font-size: 20px;
}

.prompt-grid {
  display: grid;
  gap: 16px;
  margin-top: 24px;
}

.prompt-card {
  display: grid;
  gap: 16px;
  border: 1px solid var(--faint);
  border-radius: 8px;
  background: var(--paper-2);
  padding: 20px;
}

.prompt-card h4 {
  margin: 0 0 8px;
  color: var(--blue);
  font: 800 18px/1.2 ui-sans-serif, system-ui, sans-serif;
}

.prompt-card p {
  color: var(--muted);
  font: 16px/1.45 ui-sans-serif, system-ui, sans-serif;
}

.prompt-card .copy-button {
  justify-self: start;
}

.workbench-grid,
.source-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin: 34px 0 52px;
}

.workbench-card,
.source-grid article {
  min-height: 0;
  border: 1px solid var(--faint);
  border-radius: 8px;
  background: var(--paper-2);
  padding: 20px;
  box-shadow: none;
}

.workbench-card span {
  display: inline-grid;
  width: 30px;
  height: 30px;
  place-items: center;
  border-radius: 50%;
  background: var(--blue);
  color: white;
  font: 800 12px/1 ui-sans-serif, system-ui, sans-serif;
}

.workbench-card h3,
.source-grid h3,
.guide-band h3 {
  margin: 34px 0 10px;
  font-size: 24px;
  line-height: 1.1;
}

.workbench-card p,
.source-grid p,
.guide-band p:not(.eyebrow) {
  color: var(--muted);
  font-size: 16px;
  line-height: 1.5;
}

.companion-body {
  max-width: 780px;
}

.guide-band {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px;
  margin-top: 40px;
  padding: 30px 0;
  border-top: 1px solid var(--faint);
  border-bottom: 1px solid var(--faint);
}

.source-kit {
  margin-top: 52px;
  padding-top: 30px;
  border-top: 2px solid var(--green);
}

.source-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.mode-switch {
  position: fixed;
  left: 50%;
  bottom: 18px;
  z-index: 25;
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 6px;
  border-radius: 10px;
  background: rgba(17, 15, 14, 0.96);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.22);
  transform: translateX(-50%);
}

.mode-switch button {
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: #aaa5a0;
  cursor: pointer;
  font: 700 13px/1 ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  padding: 11px 16px;
}

.mode-switch button[aria-pressed="true"] {
  background: #34302d;
  color: #ffffff;
}

@media (max-width: 980px) {
  .site-header {
    top: 16px;
    right: 16px;
  }

  .article-shell {
    grid-template-columns: 1fr;
    gap: 0;
    max-width: 820px;
    padding-top: 84px;
  }

  .toc {
    display: none;
  }

  .workbench-grid,
  .source-grid,
  .guide-band {
    grid-template-columns: 1fr;
  }

  .workbench-card,
  .source-grid article {
    min-height: 0;
  }
}

@media (max-width: 640px) {
  .download-link {
    min-height: 38px;
    padding: 0 13px;
    font-size: 12px;
  }

  .article-shell {
    padding: 78px 18px 120px;
  }

  .article-hero {
    padding: 58px 0 26px;
  }

  h1 {
    font-size: clamp(40px, 12vw, 54px);
  }

  .article-body {
    font-size: 18px;
  }

  .workbench-grid,
  .source-grid,
  .guide-band {
    grid-template-columns: 1fr;
  }

  .mode-switch {
    width: calc(100% - 28px);
    justify-content: center;
  }

  .mode-switch button {
    flex: 1;
    padding-left: 8px;
    padding-right: 8px;
  }
}
`;
}
