import { rmSync, mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const sourcePath = join(root, "content", "the-irreducible-officer.md");
const distDir = join(root, "dist");
const assetsDir = join(distDir, "assets");
const workbenchAssetsDir = join(assetsDir, "workbench");
const pdfPath = join(assetsDir, "the-irreducible-officer.pdf");
const siteUrl = "https://nwc-learning-companion.web.app";
const companionContextFilename = "companion-context.md";
const companionContextUrl = `${siteUrl}/assets/${companionContextFilename}`;
const companionRepoPath = process.env.COMPANION_REPO_PATH || join(root, "..", "companion");
const pythonPath =
  process.env.PDF_PYTHON ||
  "/Users/jackcshaw-2/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3";

const source = readFileSync(sourcePath, "utf8");
const essayMarkdown = source.trim();
const sourceSpineMarkdown = readRequiredCompanionFile("sources/source-spine.md").trim();
const companionContextMarkdown = buildCompanionContext();
const workbenchTools = getWorkbenchTools();

rmSync(distDir, { recursive: true, force: true });
mkdirSync(workbenchAssetsDir, { recursive: true });

writeFileSync(join(assetsDir, "essay.md"), essayMarkdown + "\n", "utf8");
writeFileSync(join(assetsDir, companionContextFilename), companionContextMarkdown + "\n", "utf8");
workbenchTools.forEach((tool) => {
  writeFileSync(join(workbenchAssetsDir, tool.filename), tool.markdown.trim() + "\n", "utf8");
});

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

writeFileSync(
  join(distDir, "index.html"),
  buildHtml({
    essayToc,
    overviewHtml: buildOverviewMode(),
    essayHtml,
    companionHtml: buildCompanionMode(),
    workbenchHtml: buildWorkbenchMode(workbenchTools),
    sourcesHtml: buildSourcesMode(),
  }),
  "utf8",
);

console.log("Built dist/index.html and downloadable assets");

function readRequiredCompanionFile(relativePath) {
  const filePath = join(companionRepoPath, relativePath);
  if (!existsSync(filePath)) {
    throw new Error(`Missing companion context file: ${filePath}. Set COMPANION_REPO_PATH to the companion repo checkout.`);
  }
  return readFileSync(filePath, "utf8");
}

function buildCompanionContext() {
  const sections = [
    ["OPERATING RULES", "AGENTS.md"],
    ["ESSAY", "the-irreducible-officer.md"],
    ["CLAIMS", "claims.md"],
    ["SOURCE SPINE", "sources/source-spine.md"],
    ["OBJECTIONS", "prompts/objections-and-responses.md"],
    ["WORKFLOW PATTERNS", "patterns/nwc-ai-enabled-learning-workflows.md"],
    ["TRANSFER CASE", "cases/cyber-group-strategy-transfer-case.md"],
    ["TRACEABLE ARTIFACT", "artifacts/traceable-learning-artifact.md"],
    ["STARTER PROMPTS", "prompts/starter-prompts.md"],
  ];

  const parts = [
    "# The Irreducible Officer - Companion Context Bundle",
    "",
    "Read this whole file before answering. Sections are marked with clear SECTION headers.",
    "This bundle is generated from the public companion source materials.",
  ];

  sections.forEach(([label, relativePath]) => {
    parts.push("", "", `# ===== SECTION: ${label} =====`, "", readRequiredCompanionFile(relativePath).trim());
  });

  return parts.join("\n");
}

function buildHtml({ essayToc, overviewHtml, essayHtml, companionHtml, workbenchHtml, sourcesHtml }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>The Irreducible Officer</title>
  <meta name="description" content="A public essay and working package for AI-enabled strategic judgment.">
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Crect width='16' height='16' fill='%230a2242'/%3E%3Crect y='12' width='16' height='2' fill='%23d82032'/%3E%3C/svg%3E">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,420;9..144,520;9..144,620&family=IBM+Plex+Mono:wght@400;500;600&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&display=swap" rel="stylesheet">
  ${plausibleAnalytics()}
  <style>${css()}</style>
</head>
<body data-active-mode="overview">
  <header class="package-nav" aria-label="Package navigation">
    <a class="package-brand" href="#overview" data-mode-link="overview">The Irreducible Officer</a>
    <nav class="package-tabs">
      ${modeButton("overview", "Overview", true)}
      ${modeButton("essay", "Essay")}
      ${modeButton("companion", "Companion")}
      ${modeButton("workbench", "Workbench")}
      ${modeButton("sources", "Sources")}
    </nav>
  </header>

  <main id="top" class="site-shell">
    <aside class="toc" aria-label="Essay sections">
      ${essayToc
        .map((item, index) => `<a href="#${item.id}" data-toc-link="${item.id}"><span></span>${index + 1}. ${escapeHtml(item.text)}</a>`)
        .join("\n      ")}
    </aside>

    <div class="content-frame">
      <section class="mode-view is-active" data-mode="overview">${overviewHtml}</section>
      <section class="mode-view" data-mode="essay">
        <div class="published">Published June 28, 2026</div>
        <div class="nwc-rule" aria-hidden="true"><span></span></div>
        <section class="essay-hero">
          <h1>The Irreducible Officer</h1>
          <p class="dek">Purpose, accountability, and AI-enabled strategic judgment.</p>
          <a class="quiet-action" href="assets/the-irreducible-officer.pdf" download>Download PDF</a>
        </section>
        <article class="essay article-body">${essayHtml}</article>
      </section>
      <section class="mode-view" data-mode="companion">${companionHtml}</section>
      <section class="mode-view" data-mode="workbench">${workbenchHtml}</section>
      <section class="mode-view" data-mode="sources">${sourcesHtml}</section>
    </div>
  </main>

  <script>${clientJs()}</script>
</body>
</html>
`;
}

function plausibleAnalytics() {
  return `<!-- Privacy-friendly analytics by Plausible -->
  <script>
    if (!["localhost", "127.0.0.1", ""].includes(window.location.hostname) && window.location.protocol !== "file:") {
      const plausibleScript = document.createElement("script");
      plausibleScript.async = true;
      plausibleScript.src = "https://plausible.io/js/pa-Gh2glh6gJCHm0mnnXSYbp.js";
      document.head.appendChild(plausibleScript);
    }
    window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
    plausible.init()
  </script>`;
}

function modeButton(mode, label, active = false) {
  return `<button type="button" data-mode-tab="${mode}" aria-pressed="${String(active)}">${label}</button>`;
}

function buildOverviewMode() {
  return `<div class="surface overview">
    <div class="nwc-rule" aria-hidden="true"><span></span></div>
    <section class="overview-hero">
      <p class="eyebrow">A Working Example</p>
      <h1>The Irreducible Officer</h1>
      <p class="dek">One concrete model for operationalizing AI in professional military education, built as an essay, a practice companion, and a faculty workbench.</p>
      <p>
        Not a policy. A worked example of what teaching and assessing
        AI-enabled judgment could look like in practice.
      </p>
    </section>

    <section class="path-cards" aria-label="Package paths">
      ${pathCard("Read", "Essay", "The core argument and standard.", "Open essay", "essay")}
      ${pathCard("Practice", "AI Companion", "A guided AI session.", "Set up a session", "companion")}
      ${pathCard("Build", "Faculty Workbench", "Tools for faculty adaptation.", "Open workbench", "workbench")}
    </section>

    <section class="detail-band">
      <p class="band-label">What This Package Does</p>
      <p>
        The essay makes the case for teaching and assessing AI-enabled strategic
        judgment. The AI Companion helps a reader use ChatGPT, Claude, Gemini,
        or another AI assistant to work through the argument. The Faculty
        Workbench turns the method into materials faculty can use and revise.
      </p>
    </section>

    <section class="detail-band next-step-band">
      <p class="band-label">Next Step</p>
      <p>
        Want to see it work? Open the companion and run one session, then look
        at the workbench to see how faculty would use it.
      </p>
      <div class="action-row">
        <a class="quiet-action" href="#companion" data-mode-link="companion">Set up a session</a>
        <a class="quiet-action" href="#ix-a-foundation-pilot" data-essay-section-link="ix-a-foundation-pilot">See the five-step pilot</a>
      </div>
    </section>
  </div>`;
}

function pathCard(verb, target, body, action, mode) {
  return `<a class="path-card" href="#${mode}" data-mode-link="${mode}">
    <span class="path-verb">${escapeHtml(verb)}</span>
    <span class="path-target">${escapeHtml(target)}</span>
    <span class="path-body">${escapeHtml(body)}</span>
    <span class="path-action">${escapeHtml(action)} &rarr;</span>
  </a>`;
}

function buildCompanionMode() {
  return `<div class="surface companion-surface">
    <div class="nwc-rule" aria-hidden="true"><span></span></div>
    <section class="surface-hero">
      <p class="eyebrow">Practice</p>
      <h1>AI Companion</h1>
      <p class="dek">Use ChatGPT, Claude, Gemini, or another AI assistant to work through the essay, test claims, design an exercise, and create a traceable learning artifact.</p>
      <p>
        Start by copying the setup prompt. The assistant will read one context
        file that contains the essay, claim map, source spine, objections,
        workflow patterns, transfer case, and trace artifact before answering.
      </p>
      <p class="helper-note">
        Running this needs an assistant that can read a web page. Turn web
        access on before you paste. If the assistant cannot open the file,
        download the context file below and paste or attach it into the chat,
        then paste the prompt.
      </p>
      <div class="action-row">
        <button class="copy-button primary" type="button" data-copy-target="setup-prompt">Copy setup prompt</button>
        <a class="quiet-action" href="assets/${companionContextFilename}" download>Download context file</a>
      </div>
    </section>

    <section class="setup-panel">
      <div class="panel-heading">
        <p class="eyebrow">First Step</p>
        <h2>Paste this once into your AI assistant.</h2>
      </div>
      ${copyBlock("setup-prompt", setupPrompt())}
    </section>

    <section class="capability-section">
      <p class="eyebrow">What You Can Do</p>
      <div class="capability-grid">
        ${miniCard("Understand", "Get the thesis, argument map, likely misunderstanding, and open questions.")}
        ${miniCard("Inspect", "Audit claims against the source spine before deciding what you believe.")}
        ${miniCard("Argue", "Test objections in their strongest form, including workload, restrictions, and faculty readiness.")}
        ${miniCard("Practice", "Run a faculty fluency lab around purpose, frame, reliance, accountability, and transfer.")}
      </div>
    </section>

    <section class="starter-section">
      <p class="eyebrow">Choose A Starting Path</p>
      <div class="prompt-grid">
        ${starterPromptCards()}
      </div>
    </section>
  </div>`;
}

function setupPrompt() {
  return `You are helping me read and use the essay "The Irreducible Officer," a piece about purpose, accountability, and AI-enabled strategic judgment at the National War College.

${companionContextInstruction()}

Start by giving me:
1. the cleanest version of the core claim;
2. the part of the argument most relevant to an NWC instructor or curriculum leader;
3. the most useful next path for what I want to do.

Then follow my lead. If I ask to inspect evidence, use the CLAIMS and SOURCE SPINE sections. If I ask to design an exercise, use the TRANSFER CASE and TRACEABLE ARTIFACT sections. If I ask to argue with the essay, start from the strongest version of the objection in the OBJECTIONS section. If I ask to practice faculty fluency, use the WORKFLOW PATTERNS section.

Do not turn this into a generic AI-in-education summary. Keep the focus on
AI-enabled strategic judgment: purpose, frame, reliance, accountability, and
transfer.`;
}

function companionContextInstruction() {
  return `Before you answer anything, fetch and read this file in full. It contains the essay and companion materials: claim map, source spine, objections, workflow patterns, transfer case, traceable-artifact template, and starter prompts.

${companionContextUrl}

If you cannot reach that URL, tell me you could not read it and ask me to paste or attach the context file. Do not answer from the essay alone or from memory.`;
}

function starterPromptCards() {
  const prompts = [
    {
      id: "prompt-understand",
      title: "Understand the argument",
      bestFor: "Get the thesis, argument map, likely misunderstanding, and open questions.",
      text: `${companionContextInstruction()}

After you read the context file, explain "The Irreducible Officer" in 10 bullets.

Do not turn this into a generic AI-in-education summary. Preserve the specific claim: NWC must teach and certify AI-enabled strategic judgment by making purpose, frame, reliance, accountability, and transfer visible.

Return:
1. the thesis in one sentence;
2. the argument in 10 bullets;
3. the claim most likely to be misunderstood;
4. why that misunderstanding is tempting;
5. two questions NWC faculty should keep open.`,
    },
    {
      id: "prompt-claims",
      title: "Inspect a claim",
      bestFor: "Choose a claim, then audit the evidence and unresolved questions.",
      text: `${companionContextInstruction()}

After you read the context file, help me inspect the evidence behind "The Irreducible Officer." Use the CLAIMS and SOURCE SPINE sections.

List 5-7 important claims worth auditing. For each one, give me a short label and one sentence on why it matters. Then ask me which claim I want to inspect.

After I pick one, audit it with me: best evidence, strongest unresolved question or counterexample, where the evidence is strong or incomplete, what source I should read, and one implication for NWC instruction.`,
    },
    {
      id: "prompt-objection",
      title: "Test an objection",
      bestFor: "Start with the strongest version before deciding what survives.",
      text: `${companionContextInstruction()}

After you read the context file, help me test an objection to "The Irreducible Officer." Use the OBJECTIONS, CLAIMS, and SOURCE SPINE sections.

Start by naming the objection in its strongest form. Then give:
1. the essay's answer in plain English;
2. the best evidence that supports that answer;
3. the strongest way the objection could still be right;
4. how the objection changes NWC instructional design;
5. one experiment, source, or review loop that would make the answer more concrete.`,
    },
    {
      id: "prompt-exercise",
      title: "Design an exercise",
      bestFor: "Move from the essay to an approved NWC-style artifact.",
      text: `${companionContextInstruction()}

After you read the context file, help me turn "The Irreducible Officer" into a practical NWC learning exercise. Use the TRANSFER CASE and TRACEABLE ARTIFACT sections.

Design a 60-90 minute exercise that begins by interrogating the essay itself, then transfers the method to an approved NWC-style artifact. It must identify inherited AI-shaped inputs, force the learner to identify the frame, assumptions, evidence standard, and AI reliance decisions, include a flawed AI output or flawed frame, and end with a traceable learning artifact.

Return the learning objective, materials, step-by-step flow, facilitator notes, outputs, assessment criteria, and likely failure modes.`,
    },
    {
      id: "prompt-fluency",
      title: "Practice faculty fluency",
      bestFor: "Build, direct, question, and assess AI-enabled work.",
      text: `${companionContextInstruction()}

After you read the context file, use "The Irreducible Officer" as a faculty fluency lab. Use the WORKFLOW PATTERNS and TRACEABLE ARTIFACT sections.

Ask me for one NWC-style task, case, assignment, or strategic problem. Help me define the purpose, problem frame, assumptions, and evidence standard. Propose an AI-assisted workflow that could sharpen the work, identify where the workflow might hide judgment, and ask me to defend which AI outputs I would accept, reject, verify, or withhold.

After the session, assess what I commanded well, where I let the system set the terms, and what faculty artifact should be improved.`,
    },
    {
      id: "prompt-defense",
      title: "Run oral defense",
      bestFor: "Press whether the learner owns the frame behind the artifact.",
      text: `${companionContextInstruction()}

After you read the context file, act as an NWC seminar instructor conducting a short oral defense. Use the CLAIMS and TRACEABLE ARTIFACT sections.

Ask one question at a time. Your goal is to determine whether I own the frame behind my AI-assisted work.

Press me on problem frame, assumptions, evidence standards, alternative frames, reliance decisions, rejected AI outputs, risks and costs, what would change my conclusion, and where human judgment must interrupt automation.

After six questions, assess whether I demonstrated ownership of the reasoning and identify what evidence should be added to the traceable learning artifact.`,
    },
  ];

  return prompts.map((prompt) => `<article class="prompt-card">
    <h3>${escapeHtml(prompt.title)}</h3>
    <p>${escapeHtml(prompt.bestFor)}</p>
    ${copyBlock(prompt.id, prompt.text)}
    <button class="copy-button link-style" type="button" data-copy-target="${prompt.id}">Copy prompt &rarr;</button>
  </article>`).join("\n        ");
}

function buildWorkbenchMode(tools) {
  const selected = tools[0];
  return `<div class="surface workbench-surface">
    <div class="nwc-rule" aria-hidden="true"><span></span></div>
    <section class="surface-hero">
      <p class="eyebrow">Build</p>
      <h1>Faculty Workbench</h1>
      <p class="dek">Ready-to-use teaching materials for adapting the essay into faculty practice.</p>
      <p>
        Choose a tool, copy the template, and use it in a seminar, assignment
        design conversation, or faculty calibration session. No repository
        knowledge required.
      </p>
    </section>

    <section id="workbench-tools" class="tool-grid" aria-label="Faculty workbench tools">
      ${tools.map((tool) => workbenchCard(tool)).join("\n      ")}
    </section>

    <section class="selected-tool" aria-live="polite">
      <div class="selected-heading">
        <div>
          <p class="eyebrow">Selected Tool</p>
          <h2 id="selected-tool-title">${escapeHtml(selected.title)}</h2>
        </div>
        <div class="tool-actions">
          <button class="copy-button primary" type="button" data-copy-target="workbench-template">Copy template</button>
          <a id="selected-tool-download" class="quiet-action" href="assets/workbench/${selected.filename}" download>Download template</a>
          <button class="quiet-action" type="button" data-workbench-tools-link>Back to tools</button>
        </div>
      </div>
      <div class="template-layout">
        <pre class="copy-block template-block"><code id="workbench-template">${escapeHtml(selected.markdown.trim())}</code></pre>
        <aside class="use-note">
          <p class="eyebrow">How To Use It</p>
          <p id="selected-tool-note">${escapeHtml(selected.useNote)}</p>
        </aside>
      </div>
    </section>

    <section class="detail-band future-layer">
      <p class="band-label">Future Context Layer</p>
      <p>
        A future Librarian-style system could help faculty govern source kits,
        handoffs, proposals, diffs, and rollback. That belongs inside the
        workbench roadmap. It is not a current NWC system.
      </p>
    </section>
  </div>`;
}

function workbenchCard(tool) {
  return `<button class="tool-card" type="button" data-tool-id="${tool.id}">
    <span class="tool-title">${escapeHtml(tool.cardTitle)}</span>
    <span class="tool-desc">${escapeHtml(tool.cardDesc)}</span>
    <span class="tool-action">${escapeHtml(tool.cardAction)} &rarr;</span>
  </button>`;
}

function buildSourcesMode() {
  return `<div class="surface sources-surface">
    <div class="nwc-rule" aria-hidden="true"><span></span></div>
    <section class="surface-hero">
      <p class="eyebrow">Sources</p>
      <h1>Evidence And Source Spine</h1>
      <p class="dek">The evidence map separates the essay's claims from the sources and open questions behind them.</p>
      <p>
        Use this as the working source spine for claim audits and deeper
        reading. The formal reference list remains at the end of the essay.
      </p>
    </section>
    <article class="source-spine article-body">
      ${renderMarkdown(sourceSpineMarkdown, { skipFirstH1: true })}
    </article>
  </div>`;
}

function miniCard(title, body) {
  return `<article class="mini-card">
    <h3>${escapeHtml(title)}</h3>
    <p>${escapeHtml(body)}</p>
  </article>`;
}

function copyBlock(id, text) {
  return `<pre class="copy-block"><code id="${id}">${escapeHtml(text)}</code></pre>`;
}

function placeEssayFigures(html) {
  return html
    .replace("The person is still present. The ownership may not be.</p>", `The person is still present. The ownership may not be.</p>
${pullQuote("AI did not lower the bar for strategic judgment. It raised it, then hid whether the officer cleared it.")}`)
    .replace('<p><strong>Frame capture</strong> occurs when the model supplies the first plausible frame and the student never achieves enough distance to revise it.', `${failureModesTable()}
<p><strong>Frame capture</strong> occurs when the model supplies the first plausible frame and the student never achieves enough distance to revise it.`)
    .replace("The framing is where the judgment lives: in the determination of what the situation requires, whose interests are implicated, what assumptions are doing work, and what kind of answer would actually matter. That is the intellectual work, not a preliminary step before it.</p>", `The framing is where the judgment lives: in the determination of what the situation requires, whose interests are implicated, what assumptions are doing work, and what kind of answer would actually matter. That is the intellectual work, not a preliminary step before it.</p>
${pullQuote("The framing is where the judgment lives.")}`)
    .replace("The educational target is specific. Students need to predict, with reasonable accuracy, when AI performs well for a given type of task and when it does not, and calibrate their use accordingly.</p>", `The educational target is specific. Students need to predict, with reasonable accuracy, when AI performs well for a given type of task and when it does not, and calibrate their use accordingly.</p>
${relianceTable()}`)
    .replace("Friction worth removing is real and abundant. Formatting, search, repetitive drafting, clerical assembly: these consume time without building judgment. AI can eliminate them and free student and faculty attention for the work that actually matters, a gain the design should capture.</p>", `Friction worth removing is real and abundant. Formatting, search, repetitive drafting, clerical assembly: these consume time without building judgment. AI can eliminate them and free student and faculty attention for the work that actually matters, a gain the design should capture.</p>
${frictionCard()}`)
    .replace("AI can compress the work before a decision. It cannot own what follows. A system that did not choose the purpose cannot answer for the consequences of pursuing it.</p>", `AI can compress the work before a decision. It cannot own what follows. A system that did not choose the purpose cannot answer for the consequences of pursuing it.</p>
${pullQuote("AI can compress the work before a decision. It cannot own what follows.")}`)
    .replace("The sequence runs inside a single existing assignment where framing is the central demand.</p>", `The sequence runs inside a single existing assignment where framing is the central demand.</p>
${pilotSequence()}`)
    .replace("<p>Frame the problem. Calibrate the tool. Refuse the garden path. Own the decision.</p>", closingStandard());
}

function pullQuote(text) {
  return `<aside class="argument-insert pull-quote" aria-label="Key argument">
    <p>${escapeHtml(text)}</p>
  </aside>`;
}

function failureModesTable() {
  const rows = [
    ["Frame capture", "The first plausible frame becomes the student's frame.", "What problem did the student choose to solve?"],
    ["Fluency substitution", "Polished analysis stands in for owned reasoning.", "Can the student independently explain the judgment in plain speech?"],
    ["Premature synthesis", "The model connects material before the student has built the map.", "Can the student explain why these connections matter?"],
    ["Uncalibrated reliance", "The student accepts confident output without knowing whether the task fits the tool.", "What evidence justified relying on the system here?"],
    ["Invisible delegation", "A request for help transfers criteria, structure, or meaning.", "What did the AI decide for the student?"],
    ["Institutional monoculture", "Shared systems and defaults narrow the range of frames available to the class.", "What frames are missing across the seminar?"],
    ["Responsibility laundering", "The model's recommendation makes agency feel distributed or easier to defend.", "Who owns the recommendation if it proves wrong?"],
  ];
  return argumentTable("Core Failure Modes", ["Failure", "What Goes Wrong", "Faculty Check"], rows);
}

function relianceTable() {
  const rows = [
    ["Trust", "The student says the system seemed reliable or useful.", "A feeling, not evidence of judgment."],
    ["Use", "The student used AI somewhere in the workflow.", "Disclosure, not ownership."],
    ["Reliance decision", "The student accepted, changed, rejected, verified, or withheld AI for a specific task.", "A judgment faculty can question."],
    ["Appropriate reliance", "The student can explain why that choice fit the task, risk, evidence, and model limits.", "The competency NWC should assess."],
  ];
  return argumentTable("What Counts As Reliance Evidence", ["Signal", "What Faculty See", "What It Shows"], rows);
}

function frictionCard() {
  return `<aside class="argument-insert friction-card" aria-label="Which friction matters">
    <p class="insert-label">Which Friction Matters</p>
    <div class="friction-grid">
      <div>
        <h3>Remove</h3>
        <p>Formatting, search, repetitive drafting, clerical assembly.</p>
      </div>
      <div>
        <h3>Protect</h3>
        <p>Initial framing, failed synthesis, seminar challenge, revision that changes the argument.</p>
      </div>
    </div>
    <p class="insert-note">AI can remove the first. Faculty have to protect the second.</p>
  </aside>`;
}

function argumentTable(label, headers, rows) {
  return `<aside class="argument-insert argument-table" aria-label="${escapeHtml(label)}">
    <p class="insert-label">${escapeHtml(label)}</p>
    <table>
      <thead>
        <tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr>
      </thead>
      <tbody>
        ${rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}
      </tbody>
    </table>
  </aside>`;
}

function pilotSequence() {
  const steps = [
    ["01", "Unaided frame"],
    ["02", "AI challenge"],
    ["03", "Misframed assessment"],
    ["04", "Diagnosis and revision"],
    ["05", "Oral defense"],
  ];
  return `<aside class="argument-insert pilot-sequence" aria-label="Foundation pilot sequence">
    <p class="insert-label">Foundation Pilot Sequence</p>
    <ol>
      ${steps.map(([number, label]) => `<li><span>${number}</span><strong>${escapeHtml(label)}</strong></li>`).join("")}
    </ol>
  </aside>`;
}

function closingStandard() {
  const steps = ["Frame the problem.", "Calibrate the tool.", "Refuse the garden path.", "Own the decision."];
  return `<aside class="argument-insert closing-standard" aria-label="Closing standard">
    ${steps.map((step) => `<p>${escapeHtml(step)}</p>`).join("")}
  </aside>`;
}

function getWorkbenchTools() {
  return [
    {
      id: "assignment-design",
      title: "Assignment Design Worksheet",
      cardTitle: "Assignment design",
      cardDesc: "Decide where AI belongs and what students must own.",
      cardAction: "Open worksheet",
      filename: "assignment-design-worksheet.md",
      useNote: "Use this as a working document with faculty before revising an assignment.",
      markdown: `# Assignment Design Worksheet

## 1. Learning Purpose

- Course or seminar:
- Learning objective:
- Strategic judgment students should practice:
- Why this task matters for future AI-enabled leadership:

## 2. Problem Frame Students Must Own

- Strategic problem:
- AI-shaped inputs students inherit before direct AI use:
- Purpose of the work:
- Key actors:
- Assumptions:
- Evidence standard:
- Success standard:
- Risks or tradeoffs:

## 3. Developmental Friction

- Work students should do without AI:
- First-frame activity:
- Ambiguity or uncertainty students should face:
- Seminar challenge or peer critique:
- What failure should teach:

## 4. Wasteful Friction

- Formatting or synthesis work:
- Search or retrieval work:
- Alternative framing:
- Counterargument generation:
- Red-team questions:

## 5. AI-Free And AI-Mediated Sequence

| Phase | Student action | AI role | Faculty observation |
| --- | --- | --- | --- |
| AI-free first frame |  | None |  |
| AI-mediated challenge |  | Challenge, critique, expand, or compare |  |
| Human revision |  | Optional support |  |
| Oral defense or seminar challenge |  | None or limited |  |
| Trace artifact |  | Formatting support only, if allowed |  |

## 6. Reliance Decisions Students Must Make

- AI output they may accept:
- AI output they must verify:
- AI output they should reject or challenge:
- Part of the task where AI should be withheld:
- Evidence required before reliance is justified:

## 7. Assessment Evidence

- Purpose through frame:
- Inherited AI-shaped inputs:
- Assumptions:
- Evidence standard:
- Accepted AI contributions:
- Rejected or revised AI contributions:
- Final human judgment:
- Transfer check:`,
    },
    {
      id: "assessment",
      title: "Assessment And Oral-Defense Rubric",
      cardTitle: "Assessment",
      cardDesc: "Review purpose, frame, reliance, accountability, and transfer.",
      cardAction: "Open rubric",
      filename: "assessment-and-oral-defense-rubric.md",
      useNote: "Use this to decide what evidence faculty need beyond the finished artifact.",
      markdown: `# Assessment And Oral-Defense Rubric

## Rating Scale

| Rating | Meaning |
| --- | --- |
| 1 - Thin | Student relies on surface language or retrospective explanation. |
| 2 - Emerging | Student explains some choices but struggles under follow-up. |
| 3 - Proficient | Student owns purpose, frame, reliance decisions, and judgment. |
| 4 - Strong | Student uses AI with discipline and transfers the method. |

## Dimensions

- Purpose through frame
- Inherited AI-shaped inputs
- Assumptions
- Evidence standard
- Reliance
- Accountability
- Transfer
- Developmental friction

## Oral-Defense Questions

- What problem did you decide this work was actually solving?
- What inputs had already sorted, summarized, or framed the problem?
- Which assumption is doing the most work?
- What evidence would change your conclusion?
- Where did you rely on AI, and what justified that reliance?
- What did you reject, withhold from AI, or rewrite?
- State the final judgment in first person.
- What part of your method would transfer to a different case?

## Minimal Faculty Note

1. Evidence of purpose through frame.
2. Inherited AI-shaped input worth probing.
3. Reliance decision worth probing.
4. Accountability question asked.
5. Transfer result.
6. Follow-up needed.`,
    },
    {
      id: "flawed-output",
      title: "Flawed Output Library Template",
      cardTitle: "Flawed outputs",
      cardDesc: "Create polished AI work with a hidden strategic problem.",
      cardAction: "Open template",
      filename: "flawed-output-library-template.md",
      useNote: "Use this to build examples that fail under strategic questioning, not surface reading.",
      markdown: `# Flawed Output Library Template

## Entry Metadata

- Title:
- Course or seminar:
- Case or topic:
- Date created:
- Created by:
- Intended use:
- Public, internal, or restricted:

## Flaw Type

- Frame error
- Hidden assumption
- Weak evidence standard
- Uncalibrated reliance
- Risk or tradeoff buried
- Accountability evasion
- Transfer failure

## Student-Facing Artifact

Paste or link the flawed AI output students will inspect.

## Instructor Key

### Hidden Frame

### Flawed Assumptions

### Missing Evidence

### Risk Or Tradeoff

### Accountability Problem

### Stronger Frame

## Oral-Defense Questions

- Question 1:
- Question 2:
- Question 3:

## Expected Student Trace

- hidden frame identified;
- assumptions revised;
- evidence standard;
- accepted, rejected, or revised AI outputs;
- final human judgment;
- transfer check.`,
    },
    {
      id: "source-kit",
      title: "Source Kit Template",
      cardTitle: "Source kits",
      cardDesc: "Package materials and boundaries for an AI-assisted exercise.",
      cardAction: "Open template",
      filename: "source-kit-template.md",
      useNote: "Use this to tell an AI assistant what materials, standards, and boundaries matter.",
      markdown: `# Source Kit Template

A source kit is not a file dump. It is the curated teaching packet for an AI-enabled exercise.

## 1. Overview

- Source kit title:
- Course or seminar:
- Faculty owner:
- Public, internal, or restricted:
- Intended exercise:

## 2. Learning Purpose

- Course objective:
- Strategic judgment students should practice:
- Why AI belongs in this exercise:
- What students must own:

## 3. Anchor Materials

- Essay, prompt, or assignment:
- Case materials:
- AI-shaped inputs already present:
- Doctrine or primer materials:
- Public sources:
- Course-specific sources:

## 4. Allowed And Excluded Sources

### Allowed

### Excluded

## 5. AI Role

What AI may do:
- retrieve;
- summarize;
- challenge;
- generate alternatives;
- create flawed output;
- ask oral-defense questions;
- help format a trace.

What AI may not do:
- choose the final purpose;
- own the problem frame;
- replace independent first-frame work;
- make the final judgment;
- convert private material into public output.

## 6. Faculty Review Notes

- What faculty should observe:
- Common failure modes:
- Reliance concern:
- Accountability concern:
- Transfer concern:`,
    },
    {
      id: "calibration",
      title: "Faculty Calibration Protocol",
      cardTitle: "Faculty calibration",
      cardDesc: "Compare how faculty diagnose the same AI-assisted work.",
      cardAction: "Open protocol",
      filename: "faculty-calibration-protocol.md",
      useNote: "Use this when faculty need to make tacit judgment easier to explain and reuse.",
      markdown: `# Faculty Calibration Protocol

## Purpose

Faculty compare how they read the same AI-assisted work, where they think reliance was justified, and what questions expose whether the human still owns the frame.

## Materials

- One student trace, flawed AI output, or AI-assisted strategic product.
- Current rubric or review criteria.
- Individual diagnosis form.
- Shared calibration note.

## 1. Individual Review

Record:
- strongest part of the work;
- weakest part of the work;
- hidden frame;
- key assumption;
- reliance concern;
- accountability concern;
- transfer concern;
- one oral-defense question.

## 2. Compare Diagnoses

- where judgments converged;
- where judgments diverged;
- which concern mattered most;
- which rubric language caused ambiguity;
- which oral-defense question would reveal the issue fastest.

## 3. Revise Shared Artifacts

Update one or more:
- rubric;
- oral-defense question set;
- flawed-output instructor key;
- trace artifact fields;
- source-kit instructions;
- after-action note.

## Calibration Note

- Agreement:
- Disagreement:
- Rubric language to revise:
- Oral-defense question to keep:
- Failure mode to watch:
- Decision: approve, revise, archive, or run again.`,
    },
    {
      id: "after-action",
      title: "After-Action Note Template",
      cardTitle: "After-action note",
      cardDesc: "Save what worked, what failed, and what faculty should change.",
      cardAction: "Open note",
      filename: "after-action-note-template.md",
      useNote: "Use this after running an exercise so lesson rationale and faculty judgment do not disappear.",
      markdown: `# After-Action Note Template

## Exercise Information

- Exercise:
- Course or seminar:
- Date:
- Faculty:
- Source kit used:

## What The Exercise Was For

- Learning purpose:
- Judgment students were supposed to practice:
- AI role:
- Assessment evidence faculty expected:

## What Worked

- Strongest student performance:
- Strongest faculty observation:
- Useful AI contribution:
- Useful friction preserved:
- Reusable artifact created:

## What Failed Or Confused Students

- Common frame error:
- Assumption students missed:
- Reliance problem:
- Accountability problem:
- Transfer problem:
- Confusing instructions:

## Faculty Calibration Notes

- Where faculty agreed:
- Where faculty disagreed:
- Rubric language to revise:
- Oral-defense question to keep:
- Trace field to revise:

## Proposed Updates

| Proposed update | Reason | Approve / revise / reject | Owner |
| --- | --- | --- | --- |
|  |  |  |  |

## Next Run

- Change before next use:
- Source-kit update:
- New flawed output needed:
- Faculty calibration needed:`,
    },
  ];
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

    if (/^(?:---+|\*\*\*+)$/u.test(line.trim())) {
      flushParagraph();
      closeList();
      if (!html.length) {
        continue;
      }
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
const modeLinks = Array.from(document.querySelectorAll("[data-mode-link]"));
const essaySectionLinks = Array.from(document.querySelectorAll("[data-essay-section-link]"));
const views = Array.from(document.querySelectorAll("[data-mode]"));
const modeNames = ["overview", "essay", "companion", "workbench", "sources"];
const toc = document.querySelector(".toc");
const tocEntries = Array.from(document.querySelectorAll("[data-toc-link]"))
  .map((link) => ({ link, heading: document.getElementById(link.dataset.tocLink) }))
  .filter((entry) => entry.heading);
const workbenchTools = ${JSON.stringify(workbenchTools.map((tool) => ({
    id: tool.id,
    title: tool.title,
    filename: tool.filename,
    useNote: tool.useNote,
    markdown: tool.markdown.trim(),
  })))};
let tocFrame = null;
let activeMode = document.body.dataset.activeMode || "overview";
const reachedEssaySections = new Set();

function trackPackageEvent(name, props = {}) {
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.protocol === "file:") return;
  if (typeof window.plausible !== "function") return;
  window.plausible(name, { props });
}

function eventLabelFromMode(mode) {
  return mode.charAt(0).toUpperCase() + mode.slice(1);
}

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

  const section = tocEntries[activeIndex];
  if (section && !reachedEssaySections.has(section.heading.id)) {
    reachedEssaySections.add(section.heading.id);
    trackPackageEvent("Essay Section Reached", {
      section: section.heading.textContent,
      section_id: section.heading.id,
      section_index: String(activeIndex + 1),
    });
  }
}

function requestTocUpdate() {
  if (tocFrame !== null) return;
  tocFrame = window.requestAnimationFrame(() => {
    tocFrame = null;
    updateTocProgress();
  });
}

function setMode(mode, shouldScroll = true) {
  const previousMode = activeMode;
  activeMode = mode;
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
  if (mode !== previousMode || shouldScroll) {
    trackPackageEvent("Surface Viewed", { surface: mode, label: eventLabelFromMode(mode) });
  }
  requestTocUpdate();
}

function scrollElementBelowNav(element, { behavior = "auto", offset = 34 } = {}) {
  const nav = document.querySelector(".package-nav");
  const navBottom = nav ? nav.getBoundingClientRect().bottom : 0;
  const top = element.getBoundingClientRect().top + window.scrollY - navBottom - offset;
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo({ top: Math.max(0, top), behavior });
  root.style.scrollBehavior = previousScrollBehavior;
}

function scrollHeadingIntoView(heading) {
  scrollElementBelowNav(heading);
}

function openEssaySection(sectionId, track = true) {
  const heading = document.getElementById(sectionId);
  if (!heading) return false;
  setMode("essay", false);
  window.requestAnimationFrame(() => {
    scrollHeadingIntoView(heading);
    history.replaceState(null, "", "#" + sectionId);
    if (track) {
      trackPackageEvent("Essay Section Link Opened", {
        section: heading.textContent,
        section_id: heading.id,
      });
    }
    requestTocUpdate();
  });
  return true;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    trackPackageEvent("Top Navigation Clicked", { surface: button.dataset.modeTab });
    setMode(button.dataset.modeTab);
  });
});

modeLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const mode = link.dataset.modeLink;
    if (!modeNames.includes(mode)) return;
    event.preventDefault();
    trackPackageEvent("Package Path Opened", { surface: mode, label: eventLabelFromMode(mode) });
    setMode(mode);
  });
});

essaySectionLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openEssaySection(link.dataset.essaySectionLink);
  });
});

tocEntries.forEach(({ link, heading }) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    scrollHeadingIntoView(heading);
    history.replaceState(null, "", "#" + heading.id);
    trackPackageEvent("Essay TOC Clicked", {
      section: heading.textContent,
      section_id: heading.id,
    });
    window.setTimeout(requestTocUpdate, 220);
  });
});

window.addEventListener("scroll", requestTocUpdate, { passive: true });
window.addEventListener("resize", requestTocUpdate);
window.addEventListener("hashchange", () => {
  const mode = location.hash.replace("#", "");
  if (modeNames.includes(mode)) {
    setMode(mode, false);
    return;
  }
  if (openEssaySection(mode, false)) {
    return;
  }
  requestTocUpdate();
});

const initial = location.hash.replace("#", "");
if (modeNames.includes(initial)) {
  setMode(initial, false);
} else if (initial) {
  openEssaySection(initial, false);
}
requestTocUpdate();

document.querySelectorAll("[data-copy-target]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copyTarget);
    if (!target) return;
    const original = button.textContent;
    const copyTarget = button.dataset.copyTarget;
    try {
      await navigator.clipboard.writeText(target.textContent);
      button.textContent = "Copied";
      trackPackageEvent("Copy Action", {
        target: copyTarget,
        surface: document.body.dataset.activeMode || activeMode,
      });
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
});

document.querySelectorAll("[data-tool-id]").forEach((button) => {
  button.addEventListener("click", () => {
    const tool = workbenchTools.find((item) => item.id === button.dataset.toolId);
    if (!tool) return;
    trackPackageEvent("Workbench Tool Selected", { tool_id: tool.id, tool_title: tool.title });
    document.querySelectorAll("[data-tool-id]").forEach((card) => {
      card.classList.toggle("is-selected", card === button);
    });
    document.getElementById("selected-tool-title").textContent = tool.title;
    document.getElementById("selected-tool-note").textContent = tool.useNote;
    document.getElementById("workbench-template").textContent = tool.markdown;
    const download = document.getElementById("selected-tool-download");
    download.href = "assets/workbench/" + tool.filename;
    download.download = tool.filename;
    window.requestAnimationFrame(() => {
      const selectedTool = document.querySelector(".selected-tool");
      if (selectedTool) {
        scrollElementBelowNav(selectedTool, { behavior: "smooth" });
      }
    });
  });
});

document.querySelectorAll("[data-workbench-tools-link]").forEach((button) => {
  button.addEventListener("click", () => {
    const toolGrid = document.getElementById("workbench-tools");
    if (toolGrid) {
      scrollElementBelowNav(toolGrid, { behavior: "smooth" });
    }
  });
});

const firstTool = document.querySelector("[data-tool-id]");
if (firstTool) {
  firstTool.classList.add("is-selected");
}

document.querySelectorAll("a[download]").forEach((link) => {
  link.addEventListener("click", () => {
    const href = link.getAttribute("href") || "";
    let asset = "other";
    if (href.endsWith(".pdf")) asset = "essay_pdf";
    if (href.endsWith("${companionContextFilename}")) asset = "companion_context";
    if (href.includes("/workbench/")) asset = "workbench_template";
    trackPackageEvent("Download", {
      asset,
      href,
      surface: document.body.dataset.activeMode || activeMode,
    });
  });
});

document.querySelectorAll(".article-body a[target='_blank'], .source-spine a[target='_blank']").forEach((link) => {
  link.addEventListener("click", () => {
    trackPackageEvent("Source Link Clicked", {
      href: link.href,
      label: link.textContent.trim().slice(0, 80),
    });
  });
});
`;
}

function css() {
  return `:root {
  --paper: #f6f1e8;
  --paper-soft: #fbf8f2;
  --ink: #0a2242;
  --body: #242a31;
  --muted: #4d5360;
  --faint: #d7d0c4;
  --navy-wash: rgba(8, 35, 70, 0.055);
  --navy-soft: rgba(8, 35, 70, 0.1);
  --navy-border: rgba(8, 35, 70, 0.15);
  --red: #d82032;
  --font-display: "Fraunces", Georgia, serif;
  --font-body: "Newsreader", Georgia, serif;
  --font-mono: "IBM Plex Mono", ui-monospace, monospace;
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
  color: var(--body);
  font-family: var(--font-body);
  font-size: 18px;
  line-height: 1.5;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
}

button {
  font: inherit;
}

button,
a {
  transition: background-color 180ms ease, color 180ms ease, border-color 180ms ease, transform 160ms var(--ease-out);
}

button:active,
a:active {
  transform: scale(0.99);
}

.package-nav {
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 18px 30px 12px;
  background: color-mix(in srgb, var(--paper) 92%, transparent);
  backdrop-filter: blur(10px);
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.02em;
}

.package-brand {
  color: var(--ink);
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
}

.package-tabs {
  display: flex;
  gap: 5px;
  padding: 4px;
  background: var(--navy-wash);
}

.package-tabs button {
  position: relative;
  border: 0;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  padding: 8px 11px;
  font-family: var(--font-mono);
  font-size: 12px;
}

.package-tabs button[aria-pressed="true"] {
  background: var(--navy-soft);
  color: var(--ink);
  padding-left: 13px;
}

.package-tabs button[aria-pressed="true"]::before {
  content: "";
  position: absolute;
  left: 0;
  top: 7px;
  bottom: 7px;
  width: 3px;
  background: var(--red);
}

.site-shell {
  display: grid;
  grid-template-columns: minmax(170px, 220px) minmax(0, 920px);
  gap: 48px;
  max-width: 1240px;
  margin: 0 auto;
  padding: 28px 28px 132px;
}

body:not([data-active-mode="essay"]) .site-shell {
  grid-template-columns: minmax(0, 980px);
  justify-content: center;
}

.content-frame {
  min-width: 0;
}

.mode-view {
  display: none;
}

.mode-view.is-active {
  display: block;
}

.surface,
.essay-hero {
  padding-top: 12px;
}

.nwc-rule {
  display: flex;
  align-items: flex-start;
  height: 2px;
  margin: 0 0 38px;
  background: var(--faint);
}

.nwc-rule::before {
  content: "";
  display: block;
  width: 110px;
  height: 2px;
  background: var(--ink);
}

.nwc-rule span {
  display: block;
  width: 30px;
  height: 2px;
  background: var(--red);
}

.eyebrow,
.published,
.path-target,
.path-action,
.band-label,
.copy-button,
.quiet-action,
.tool-action,
.prompt-card button,
.tool-actions,
.toc,
.package-nav {
  font-family: var(--font-mono);
}

.eyebrow {
  margin: 0 0 18px;
  color: var(--red);
  font-size: 11px;
  letter-spacing: 0.08em;
  line-height: 1.25;
  text-transform: uppercase;
}

h1,
h2,
h3,
p {
  margin: 0;
}

h1,
h2,
h3 {
  color: var(--ink);
  font-family: var(--font-display);
  font-weight: 520;
  line-height: 1.06;
}

h1 {
  max-width: 820px;
  font-size: clamp(48px, 5.2vw, 70px);
}

.surface-hero,
.overview-hero {
  max-width: 820px;
  margin-bottom: 30px;
}

.surface-hero > p:not(.eyebrow),
.overview-hero > p:not(.eyebrow) {
  max-width: 740px;
  color: var(--body);
  font-size: 18px;
  line-height: 1.58;
}

.surface-hero .helper-note {
  margin-top: 14px;
  color: #4f5661;
  font-size: 16px;
  line-height: 1.5;
}

.dek {
  max-width: 780px;
  margin: 18px 0 22px;
  color: var(--muted);
  font-size: clamp(22px, 2.4vw, 30px);
  line-height: 1.22;
}

.path-cards,
.tool-grid,
.prompt-grid,
.capability-grid,
.source-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.capability-grid,
.source-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.path-card,
.tool-card,
.prompt-card,
.mini-card {
  display: flex;
  flex-direction: column;
  min-height: 168px;
  border: 1px solid var(--navy-border);
  background: var(--paper-soft);
  color: inherit;
  padding: 20px;
  text-align: left;
  text-decoration: none;
}

.tool-card {
  cursor: pointer;
}

.path-card:hover,
.tool-card:hover,
.prompt-card:hover,
.mini-card:hover,
.tool-card.is-selected {
  border-color: rgba(216, 32, 50, 0.38);
  background: #fffdfa;
}

.path-verb,
.tool-title,
.prompt-card h3,
.mini-card h3 {
  color: var(--ink);
  font-family: var(--font-display);
  font-size: 25px;
  line-height: 1.08;
}

.path-target {
  margin: 7px 0 14px;
  color: var(--red);
  font-size: 11px;
  letter-spacing: 0.02em;
}

.path-body,
.tool-desc,
.prompt-card p,
.mini-card p {
  color: var(--muted);
  font-size: 15px;
  line-height: 1.38;
}

.path-action,
.tool-action,
.link-style {
  margin-top: auto;
  padding-top: 18px;
  color: var(--red);
  font-size: 11px;
  text-align: right;
}

.detail-band {
  margin-top: 18px;
  padding: 18px 20px;
  border: 1px solid rgba(8, 35, 70, 0.1);
  background: rgba(8, 35, 70, 0.045);
}

.band-label {
  margin-bottom: 8px;
  color: var(--ink);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.detail-band > p:not(.band-label) {
  color: #39404a;
  font-size: 16px;
  line-height: 1.48;
}

.next-step-band .action-row {
  margin-top: 14px;
}

.action-row,
.tool-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.copy-button,
.quiet-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  border: 1px solid rgba(8, 35, 70, 0.2);
  background: var(--paper-soft);
  color: var(--ink);
  cursor: pointer;
  font-size: 11px;
  padding: 0 12px;
  text-decoration: none;
}

.copy-button.primary {
  border-color: var(--ink);
  background: var(--ink);
  color: var(--paper);
}

.copy-button:hover,
.quiet-action:hover {
  border-color: var(--red);
}

.link-style {
  display: block;
  min-height: auto;
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 18px 0 0;
}

.setup-panel,
.capability-section,
.starter-section,
.selected-tool {
  margin-top: 30px;
  padding-top: 18px;
  border-top: 1px solid rgba(8, 35, 70, 0.14);
}

.panel-heading {
  margin-bottom: 14px;
}

.panel-heading h2,
.selected-heading h2 {
  font-size: 30px;
}

.copy-block {
  max-height: 360px;
  margin: 0;
  overflow: auto;
  border: 1px solid rgba(8, 35, 70, 0.12);
  background: rgba(8, 35, 70, 0.055);
  color: var(--body);
  padding: 16px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.copy-block code {
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.58;
}

.prompt-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.prompt-card {
  min-height: 210px;
}

.prompt-card .copy-block {
  display: none;
}

.source-spine {
  max-width: 900px;
  border-top: 1px solid rgba(8, 35, 70, 0.14);
  padding-top: 10px;
}

.source-spine.article-body h2 {
  margin: 30px 0 10px;
  padding-top: 20px;
  border-top: 1px solid rgba(8, 35, 70, 0.14);
  color: var(--red);
  font-family: var(--font-mono);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 1.35;
  text-transform: uppercase;
}

.source-spine ul {
  margin-top: 10px;
}

.source-spine li {
  margin-bottom: 12px;
}

.tool-grid {
  margin-bottom: 22px;
}

.selected-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}

.template-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(220px, 0.6fr);
  gap: 16px;
}

.template-block {
  max-height: 520px;
}

.use-note {
  border: 1px solid rgba(8, 35, 70, 0.1);
  background: rgba(8, 35, 70, 0.045);
  padding: 18px;
}

.use-note p:last-child {
  color: #39404a;
  font-size: 15px;
  line-height: 1.45;
}

.future-layer {
  margin-top: 18px;
}

.published {
  margin: 0 0 18px;
  color: var(--muted);
  font-size: 13px;
}

.essay-hero {
  padding-bottom: 34px;
}

.essay-hero .quiet-action {
  margin-top: 4px;
}

.toc {
  --toc-fill-top: 7px;
  --toc-progress: 0px;
  position: sticky;
  top: 86px;
  align-self: start;
  max-height: calc(100vh - 112px);
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
  font-size: 12px;
  line-height: 1.35;
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

.toc a:hover,
.toc a.is-active,
.toc a.is-past {
  color: var(--ink);
}

.toc a.is-active {
  font-weight: 600;
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
  max-width: 800px;
  color: var(--body);
  font-size: 21px;
  line-height: 1.55;
}

.article-body h2 {
  margin: 48px 0 18px;
  padding-top: 18px;
  border-top: 1px solid var(--faint);
  font-size: clamp(28px, 2.7vw, 36px);
  scroll-margin-top: 112px;
}

.article-body hr + h2 {
  margin-top: 0;
  padding-top: 0;
  border-top: 0;
}

.article-body > h2:first-child {
  padding-top: 0;
  border-top: 0;
}

.article-body h3 {
  margin: 36px 0 12px;
  color: var(--ink);
  font-size: 27px;
}

.article-body h4 {
  margin: 28px 0 10px;
  color: var(--red);
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 600;
}

.article-body p {
  margin: 0 0 22px;
  overflow-wrap: anywhere;
}

.article-body ul,
.article-body ol {
  margin: 0 0 26px;
  padding-left: 24px;
}

.article-body li {
  margin: 8px 0;
  overflow-wrap: anywhere;
}

.article-body a {
  color: var(--ink);
  text-decoration-color: rgba(216, 32, 50, 0.45);
  text-underline-offset: 0.18em;
  overflow-wrap: anywhere;
}

.article-body code {
  font-family: var(--font-mono);
  font-size: 0.82em;
}

.article-body pre {
  margin: 26px 0;
  padding: 18px;
  overflow: auto;
  border: 1px solid var(--faint);
  background: #211f1e;
  color: #fffaf1;
}

.article-body hr {
  position: relative;
  width: 1px;
  height: 104px;
  margin: 54px auto 38px;
  border: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(8, 35, 70, 0.34) 24%, rgba(8, 35, 70, 0.34) 76%, transparent 100%);
}

.article-body hr::before {
  content: "* * *";
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 2px 9px;
  transform: translate(-50%, -50%);
  background: var(--paper);
  color: var(--red);
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.16em;
  line-height: 1;
}

.argument-insert {
  margin: 34px 0 36px;
  border: 1px solid var(--navy-border);
  border-left: 3px solid var(--red);
  background: linear-gradient(90deg, rgba(8, 35, 70, 0.06), rgba(8, 35, 70, 0.025));
  color: var(--body);
}

.pull-quote {
  padding: 20px 24px 20px 26px;
}

.pull-quote p {
  max-width: 690px;
  margin: 0;
  color: var(--ink);
  font-family: var(--font-body);
  font-size: clamp(22px, 2.2vw, 28px);
  font-style: italic;
  line-height: 1.22;
}

.insert-label {
  margin: 0;
  padding: 14px 18px 10px;
  border-bottom: 1px solid rgba(8, 35, 70, 0.1);
  color: var(--red);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  line-height: 1.25;
  text-transform: uppercase;
}

.argument-table {
  overflow: hidden;
}

.argument-table table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.42;
  table-layout: fixed;
}

.argument-table th,
.argument-table td {
  border-bottom: 1px solid rgba(8, 35, 70, 0.1);
  padding: 13px 14px;
  text-align: left;
  vertical-align: top;
}

.argument-table th {
  color: var(--ink);
  font-weight: 600;
}

.argument-table td {
  color: #39404a;
}

.argument-table tbody tr:last-child td {
  border-bottom: 0;
}

.argument-table td:first-child {
  color: var(--ink);
  font-weight: 600;
}

.argument-table th:nth-child(1),
.argument-table td:nth-child(1) {
  width: 16%;
}

.argument-table th:nth-child(2),
.argument-table td:nth-child(2) {
  width: 42%;
}

.argument-table th:nth-child(3),
.argument-table td:nth-child(3) {
  width: 42%;
}

.friction-card {
  overflow: hidden;
}

.friction-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-bottom: 1px solid rgba(8, 35, 70, 0.1);
}

.friction-grid > div {
  padding: 17px 18px 16px;
}

.friction-grid > div:first-child {
  border-right: 1px solid rgba(8, 35, 70, 0.1);
}

.friction-card h3 {
  margin: 0 0 8px;
  color: var(--ink);
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 520;
}

.friction-card p {
  margin: 0;
  color: #39404a;
  font-size: 17px;
  line-height: 1.4;
}

.friction-card .insert-note {
  padding: 14px 18px 16px;
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.45;
}

.closing-standard {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  margin-top: 44px;
  overflow: hidden;
}

.closing-standard p {
  margin: 0;
  min-height: 96px;
  border-right: 1px solid rgba(8, 35, 70, 0.1);
  color: var(--ink);
  font-family: var(--font-display);
  font-size: 24px;
  line-height: 1.08;
  padding: 18px 16px 16px;
}

.closing-standard p:last-child {
  border-right: 0;
}

.pilot-sequence {
  padding-bottom: 8px;
}

.pilot-sequence ol {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0;
  margin: 0;
  padding: 0;
  list-style: none;
}

.pilot-sequence li {
  position: relative;
  min-height: 116px;
  padding: 18px 14px 16px;
  border-right: 1px solid rgba(8, 35, 70, 0.1);
}

.pilot-sequence li:last-child {
  border-right: 0;
}

.pilot-sequence span {
  display: block;
  margin-bottom: 24px;
  color: var(--red);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
}

.pilot-sequence strong {
  display: block;
  color: var(--ink);
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 520;
  line-height: 1.1;
}

.argument-visual {
  margin: 46px 0 36px;
  border: 1px solid var(--navy-border);
  background: var(--paper-soft);
  padding: 14px;
}

.argument-visual img {
  display: block;
  width: 100%;
  height: auto;
}

.argument-visual figcaption {
  margin: 12px 4px 0;
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.45;
}

@media (max-width: 980px) {
  .package-nav {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
    overflow: hidden;
  }

  .package-tabs {
    align-self: stretch;
    flex-wrap: wrap;
    max-width: 100%;
    min-width: 0;
  }

  .site-shell,
  body:not([data-active-mode="essay"]) .site-shell {
    display: block;
    max-width: 900px;
    padding: 22px 18px 86px;
  }

  .toc {
    display: none;
  }

  .path-cards,
  .tool-grid,
  .prompt-grid,
  .capability-grid,
  .source-grid,
  .template-layout {
    grid-template-columns: 1fr;
  }

  .argument-table {
    overflow-x: auto;
  }

  .argument-table table {
    min-width: 620px;
  }

  .friction-grid,
  .closing-standard {
    grid-template-columns: 1fr;
  }

  .friction-grid > div:first-child,
  .closing-standard p {
    border-right: 0;
    border-bottom: 1px solid rgba(8, 35, 70, 0.1);
  }

  .closing-standard p:last-child {
    border-bottom: 0;
  }

  .closing-standard p {
    min-height: 0;
  }

  .pilot-sequence ol {
    grid-template-columns: 1fr;
  }

  .pilot-sequence li {
    min-height: 0;
    border-right: 0;
    border-bottom: 1px solid rgba(8, 35, 70, 0.1);
  }

  .pilot-sequence li:last-child {
    border-bottom: 0;
  }

  .selected-heading {
    display: block;
  }

  .tool-actions {
    margin-top: 14px;
  }

  .article-body {
    font-size: 19px;
  }
}

@media (max-width: 560px) {
  h1 {
    font-size: 42px;
  }

  .dek {
    font-size: 21px;
  }

  .package-tabs button {
    font-size: 11px;
    padding: 8px 9px;
  }

  .pull-quote {
    padding: 21px 20px 22px;
  }

  .pull-quote p {
    font-size: 22px;
  }
}`;
}
