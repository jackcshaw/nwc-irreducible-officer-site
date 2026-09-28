import { createHash } from "node:crypto";
import {adaptTool, matrixMarkdown, matrixSvg} from "./workbench-audiences.mjs";
import { extractAtAGlance, collapseFacilitation } from "./at-a-glance.mjs";
import { rmSync, mkdirSync, readFileSync, writeFileSync, existsSync, copyFileSync, readdirSync } from "node:fs";
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
const siteUrl = process.env.SITE_URL || "https://judgmentlab.net";
const companionContextFilename = "companion-context.md";
const companionContextUrl = `${siteUrl}/assets/${companionContextFilename}`;
const workbenchContextFilename = "workbench-context.md";
const workbenchContextUrl = `${siteUrl}/assets/${workbenchContextFilename}`;
const companionRepoPath = process.env.COMPANION_REPO_PATH || join(root, "..", "companion");
const workbenchRepoPath = process.env.WORKBENCH_REPO_PATH || join(root, "..", "workbench");
// A light release stamp: the package version plus the commit each source repo was built from.
const commitOf = repo => {
  const r = spawnSync("git", ["-C", repo, "rev-parse", "--short=7", "HEAD"], { encoding: "utf8" });
  return r.status === 0 ? r.stdout.trim() : "unknown";
};
const release = {
  version: JSON.parse(readFileSync(join(root, "package.json"), "utf8")).version,
  commits: { site: commitOf(root), companion: commitOf(companionRepoPath), workbench: commitOf(workbenchRepoPath) },
};
// PDF/share-card generation needs reportlab + pillow. By default uv supplies
// them in an ephemeral environment; set PDF_PYTHON to a python3 that already
// has both installed to skip uv.
const assetCommand = process.env.PDF_PYTHON
  ? { command: process.env.PDF_PYTHON, baseArgs: [] }
  : { command: "uv", baseArgs: ["run", "--with", "reportlab", "--with", "pillow", "python3"] };

const discussionClaims = JSON.parse(readFileSync(join(root,"content/discussion-claims.json"),"utf8")).claims;
const audiences = JSON.parse(readRequiredCompanionFile("audiences/catalog.json"));
const companionEditions = audiences.filter(a => a.id !== "pme");
const labCheck = spawnSync("python3", [join(companionRepoPath, "scripts/build_failure_mode_lab.py"), "--check"], {stdio:"inherit"});
if (labCheck.status !== 0) throw new Error("Interactive context is stale; rebuild it in the companion repo first");
const source = readFileSync(sourcePath, "utf8");
if (source !== readRequiredCompanionFile("the-irreducible-officer.md")) throw new Error("Essay and companion mirror differ");
const essayMarkdown = source.trim();
const sourceSpineMarkdown = readRequiredCompanionFile("sources/source-spine.md").trim();
const { text: companionContextMarkdown, sectionCount: companionSectionCount } = buildCompanionContext();
const workbenchTools = getWorkbenchTools();
const workbenchConcepts = getWorkbenchConcepts();
const studentDataNote = "Remove names and identifying details from student work before pasting it into an AI assistant, and follow your school's or institution's policy.";
const workbenchJobs = [
  { id: "design", heading: "Design an assignment" },
  { id: "assess", heading: "Assess student work" },
  { id: "colleagues", heading: "Work with colleagues" },
  { id: "repeat", heading: "Make it repeatable" },
];
const profiles = JSON.parse(readRequiredWorkbenchFile("audiences/profiles.json"));
for (const p of profiles) {
  for (const k of ["label", "initial", "contribution", "change", "review"]) {
    if (typeof p.practice?.[k] !== "string") throw new Error(`profiles.json ${p.id}: practice.${k} missing`);
  }
  const a = p.assessment;
  if (!a?.rows?.length || !a?.questions?.length || a?.descriptors?.length !== 4) {
    throw new Error(`profiles.json ${p.id}: assessment needs rows, questions, and 4 descriptors`);
  }
  const text = v => typeof v === "string" && v.trim() !== "";
  a.rows.forEach((row, i) => {
    if (!Array.isArray(row) || row.length !== 2 || !row.every(text)) {
      throw new Error(`profiles.json ${p.id}: assessment.rows[${i}] must be two non-empty strings`);
    }
  });
  for (const field of ["questions", "descriptors"]) {
    a[field].forEach((v, i) => {
      if (!text(v)) throw new Error(`profiles.json ${p.id}: assessment.${field}[${i}] must be a non-empty string`);
    });
  }
}
const workbenchVariants = Object.fromEntries(profiles.map(p => [p.id, {
  profile:p, tools:workbenchTools.map(t => adaptTool(t,p,readRequiredWorkbenchFile,renderMarkdown,rewriteWorkbenchLinks,siteUrl)),
  guide:readRequiredWorkbenchFile("audiences/"+p.id+".md"), framework:matrixMarkdown(p)
}]));
const { text: workbenchContextMarkdown, sectionCount: workbenchSectionCount } = buildWorkbenchContext();
for (const variant of Object.values(workbenchVariants)) variant.bundle = buildWorkbenchContext(variant);

// Completeness assertion: all template files must have cards, and all cards must have files
const templateFiles = listWorkbenchFiles("templates");
const toolFilenames = new Set(workbenchTools.map((tool) => tool.filename));
templateFiles.forEach((name) => {
  if (!toolFilenames.has(name)) throw new Error(`templates/${name} has no getWorkbenchTools() card — add one`);
});
toolFilenames.forEach((name) => {
  if (!templateFiles.includes(name)) throw new Error(`getWorkbenchTools() lists ${name} but templates/${name} does not exist`);
});

rmSync(distDir, { recursive: true, force: true });
mkdirSync(workbenchAssetsDir, { recursive: true });

writeFileSync(join(assetsDir, "essay.md"), essayMarkdown + "\n", "utf8");
writeFileSync(join(assetsDir, companionContextFilename), companionContextMarkdown + "\n", "utf8");
writeFileSync(join(assetsDir, workbenchContextFilename), workbenchContextMarkdown + "\n", "utf8");
workbenchTools.forEach((tool) => {
  writeFileSync(join(workbenchAssetsDir, tool.filename), tool.markdown.trim() + "\n", "utf8");
});
mkdirSync(join(workbenchAssetsDir, "concepts"), { recursive: true });
workbenchConcepts.forEach((note) => {
  writeFileSync(join(workbenchAssetsDir, "concepts", note.filename), note.markdown.trim() + "\n", "utf8");
});

for (const folder of ["templates", "framework", "framework/assets"]) {
  mkdirSync(join(workbenchAssetsDir, folder), {recursive: true});
  for (const name of readdirSync(join(workbenchRepoPath, folder))) {
    if (/\.(md|svg|png)$/.test(name)) copyFileSync(join(workbenchRepoPath, folder, name), join(workbenchAssetsDir, folder, name));
  }
}
for (const tool of workbenchTools) {
  // Flat download URLs predate the directory tree; make their relative links resolve.
  const portable = tool.markdown.replace(/\]\(\.\.\//g, "](");
  writeFileSync(join(workbenchAssetsDir, tool.filename), portable.trim() + "\n");
  tool.markdown = portable;
}

// Workbench browsing data, fetched on demand when the Workbench surface opens
// so essay readers never download it.
writeFileSync(
  join(assetsDir, "workbench-data.json"),
  JSON.stringify({
    audiences: workbenchVariants,
    tools: workbenchTools.map((tool) => ({
      id: tool.id,
      title: tool.title,
      toolName: tool.toolName,
      job: tool.job,
      filename: tool.filename,
      useNote: tool.useNote,
      cardDesc: tool.cardDesc,
      markdown: tool.markdown.trim(),
      html: tool.html,
      glance: tool.glance,
    })),
    concepts: workbenchConcepts.map((note) => ({
      id: note.id,
      title: note.title,
      filename: note.filename,
      summary: note.summary,
      markdown: note.markdown.trim(),
      html: note.html,
    })),
  }),
  "utf8",
);

const workbenchDataVersion = createHash("sha256").update(readFileSync(join(assetsDir,"workbench-data.json"))).digest("hex").slice(0,16);
mkdirSync(join(assetsDir, "audiences"), { recursive: true });
for (const name of ["shared-foundations.md", ...audiences.map(a => a.file)]) {
  writeFileSync(join(assetsDir, "audiences", name), readRequiredCompanionFile("audiences/" + name));
}
writeFileSync(join(assetsDir, "judgment-lab-interactive-context.md"), readRequiredCompanionFile("artifacts/judgment-lab-interactive-context.md"));
mkdirSync(join(workbenchAssetsDir, "audiences"), { recursive: true });
writeFileSync(join(workbenchAssetsDir, "audiences/guide.md"), readRequiredWorkbenchFile("audiences/guide.md"));
writeFileSync(join(assetsDir, "audiences", "evidence-notes.md"), readRequiredCompanionFile("sources/audience-foundations.md"));
for (const [id,v] of Object.entries(workbenchVariants)) {
  mkdirSync(join(workbenchAssetsDir,id),{recursive:true});
  writeFileSync(join(workbenchAssetsDir,"audiences",id+".md"),v.guide);
  writeFileSync(join(workbenchAssetsDir,id,"framework.md"),v.framework);
  writeFileSync(join(workbenchAssetsDir,id,"reference-matrix.svg"),matrixSvg(v.profile,escapeHtml));
  for (const t of v.tools) writeFileSync(join(workbenchAssetsDir,id,t.filename),t.markdown+"\n");
  writeFileSync(join(assetsDir,"workbench-context-"+id+".md"),v.bundle.text+"\n");
}
// Preserve repository-relative links in the new standalone essay downloads.
for (const name of ["essays/he.md", "essays/k12.md", "essays/adaptation-map.md", "artifacts/frame-first-assignment-design.md", "tasks/companion-essay-spine.md", "sources/source-spine.md", "sources/audience-foundations.md", "claims.md", "the-irreducible-officer.md"]) {
  mkdirSync(dirname(join(assetsDir,name)),{recursive:true});
  writeFileSync(join(assetsDir,name),readRequiredCompanionFile(name));
}
writeFileSync(join(assetsDir,"release.json"),JSON.stringify({...release,edition:"2026-09-companion-essays",audiences:audiences.map(a=>a.id),companionSections:companionSectionCount,workbenchSections:workbenchSectionCount,workbenchAudienceSections:Object.fromEntries(Object.entries(workbenchVariants).map(([id,v])=>[id,v.bundle.sectionCount]))},null,2));

const progressionSvgPath = join(workbenchRepoPath, "framework", "assets", "asking-to-supervising.svg");
if (!existsSync(progressionSvgPath)) {
  throw new Error(`Missing workbench file: ${progressionSvgPath}. Set WORKBENCH_REPO_PATH to the workbench repo checkout.`);
}
copyFileSync(progressionSvgPath, join(assetsDir, "asking-to-supervising.svg"));

// The intro reel's site cut (rendered in the judgment-lab-showreel project).
// One content version covers all three files so an updated reel is never
// served stale from cache.
const reelFiles = ["judgment-lab-reel.mp4", "judgment-lab-reel.webm", "poster.jpg"];
const reelVersionHash = createHash("sha256");
mkdirSync(join(assetsDir, "reel"), { recursive: true });
for (const name of reelFiles) {
  const source = join(root, "media", "reel", name);
  if (!existsSync(source)) throw new Error(`Missing reel asset: ${source}`);
  copyFileSync(source, join(assetsDir, "reel", name));
  reelVersionHash.update(readFileSync(source));
}
const reelVersion = reelVersionHash.digest("hex").slice(0, 10);

const assetResult = spawnSync(
  assetCommand.command,
  [...assetCommand.baseArgs, join(root, "scripts", "generate-assets.py"), sourcePath, assetsDir],
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
    workbenchHtml: buildWorkbenchMode(workbenchTools, workbenchConcepts),
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

function readRequiredWorkbenchFile(relativePath) {
  const filePath = join(workbenchRepoPath, relativePath);
  if (!existsSync(filePath)) {
    throw new Error(`Missing workbench file: ${filePath}. Set WORKBENCH_REPO_PATH to the workbench repo checkout.`);
  }
  return readFileSync(filePath, "utf8").replaceAll("https://judgmentlab.net", siteUrl);
}

function listWorkbenchFiles(relativeDir) {
  const dirPath = join(workbenchRepoPath, relativeDir);
  if (!existsSync(dirPath)) {
    throw new Error(`Missing workbench directory: ${dirPath}. Set WORKBENCH_REPO_PATH to the workbench repo checkout.`);
  }
  return readdirSync(dirPath).filter((name) => name.endsWith(".md")).sort();
}

function buildCompanionContext() {
  const sections = [
    ["OPERATING RULES", "AGENTS.md"],
    ["ESSAY", "the-irreducible-officer.md"],
    ...companionEditions.map(a => ["ESSAY " + a.id.toUpperCase(), a.essayFile]),
    ["ESSAY ADAPTATION MAP", "essays/adaptation-map.md"],
    ["CLAIMS", "claims.md"],
    ["SOURCE SPINE", "sources/source-spine.md"],
    ["OBJECTIONS", "prompts/objections-and-responses.md"],
    ["WORKFLOW PATTERNS", "patterns/nwc-ai-enabled-learning-workflows.md"],
    ["TRANSFER CASE", "cases/cyber-group-strategy-transfer-case.md"],
    ["TRACEABLE ARTIFACT", "artifacts/traceable-learning-artifact.md"],
    ["STARTER PROMPTS", "prompts/starter-prompts.md"],
    ["SHARED FOUNDATION", "audiences/shared-foundations.md"],
    ["ADAPTATION EVIDENCE", "sources/audience-foundations.md"],
    ...audiences.map(a => ["AUDIENCE " + a.id.toUpperCase(), "audiences/" + a.file]),
    ["INTERACTIVE LAB PROTOCOL", "labs/failure-mode-lab/facilitator.md"],
    ["FAILURE MODE CASES", "labs/failure-mode-lab/cases.md"],
  ];

  const parts = [
    "# Judgment Lab - Companion Context Bundle",
    "",
    "Read this whole file before answering. Sections are marked with clear SECTION headers.",
    "This bundle is generated from the public companion source materials.",
    "Relative links inside sections refer to files in the companion repository; if a linked file is not among the sections, say so rather than describing it from memory.",
  ];

  sections.forEach(([label, relativePath]) => {
    parts.push("", "", `# ===== SECTION: ${label} =====`, "", readRequiredCompanionFile(relativePath).trim());
  });

  const text = parts.join("\n");
  const sectionCount = (text.match(/# ===== SECTION:/g) || []).length;
  return { text, sectionCount };
}

function buildWorkbenchContext(variant = null) {
  const conceptFiles = [
    "concepts/README.md",
    ...listWorkbenchFiles("concepts")
      .filter((name) => name !== "README.md")
      .map((name) => `concepts/${name}`),
  ];
  const sections = [
    ["OPERATING RULES", "workbench-source-kit.md"],
    ["AUDIENCE GUIDE", "audiences/guide.md"],
    ...(!variant ? profiles.map(p => ["AUDIENCE " + p.id.toUpperCase(), "audiences/"+p.id+".md"]) : [["AUDIENCE " + variant.profile.id.toUpperCase(), "audiences/"+variant.profile.id+".md"]]),
    ["FRAMEWORK", "framework/ai-fluency-progression.md"],
    ["CONCEPTS", conceptFiles],
    ...workbenchTools.map((tool) => [tool.title.toUpperCase(), `templates/${tool.filename}`]),
  ];

  const parts = [
    "# Judgment Lab Educator Workbench - " + (variant ? variant.profile.label : "All settings") + " Context Bundle",
    "",
    "Read this whole file before answering. Sections are marked with clear SECTION headers.",
    "Start from the OPERATING RULES. Every template contains an AI Facilitation Block; follow it exactly when facilitating.",
    "Relative links inside sections refer to files in the workbench repository; nearly all of their contents appear as SECTIONs of this bundle. If a linked file is not among the sections, say so rather than describing it from memory.",
  ];

  sections.forEach(([label, relativePath]) => {
    let body = Array.isArray(relativePath)
      ? relativePath.map((p) => readRequiredWorkbenchFile(p).trim()).join("\n\n")
      : readRequiredWorkbenchFile(relativePath).trim();
    if (variant && label === "FRAMEWORK") body = variant.framework;
    if (variant && typeof relativePath === "string" && relativePath.startsWith("templates/")) body = variant.tools.find(t=>relativePath.endsWith(t.filename)).markdown;
    parts.push("", "", `# ===== SECTION: ${label} =====`, "", body);
  });

  for (const a of audiences.filter(a => variant && a.id === variant.profile.id)) {
    parts.push("", "# ===== SECTION: ESSAY " + a.id.toUpperCase() + " =====", "", readRequiredCompanionFile(a.essayFile).trim());
  }
  if (!variant) parts.push("", "Select a setting and use its workbench-context-pme.md, workbench-context-he.md, or workbench-context-k12.md bundle before essay discussion. Each includes the full selected essay. The all-settings bundle contains the adaptation map, not the full essays.");
  parts.push("", "# ===== SECTION: ESSAY ADAPTATION MAP =====", "", readRequiredCompanionFile("essays/adaptation-map.md").trim());
  const text = parts.join("\n");
  const sectionCount = (text.match(/# ===== SECTION:/g) || []).length;
  return { text, sectionCount };
}

function buildHtml({ essayToc, overviewHtml, essayHtml, companionHtml, workbenchHtml, sourcesHtml }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Judgment Lab · PME, Higher Education &amp; K–12</title>
  <meta name="description" content="Strengthening human judgment in AI-enabled work. Learn, discuss, practice, and design for PME, higher education, and K–12.">
  <link rel="canonical" href="${siteUrl}/">
  <meta name="theme-color" content="#f6f1e8">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Judgment Lab">
  <meta property="og:description" content="Strengthening human judgment in AI-enabled work. Learn · Discuss · Practice · Design · References.">
  <meta property="og:url" content="${siteUrl}/">
  <meta property="og:image" content="${siteUrl}/assets/share-card.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Judgment Lab">
  <meta name="twitter:description" content="Strengthening human judgment in AI-enabled work. Learn · Discuss · Practice · Design · References.">
  <meta name="twitter:image" content="${siteUrl}/assets/share-card.png">
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Crect width='16' height='16' fill='%230a2242'/%3E%3Crect y='12' width='16' height='2' fill='%23d82032'/%3E%3C/svg%3E">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400..700;1,8..60,400..700&family=Source+Sans+3:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&display=swap" rel="stylesheet">
  ${plausibleAnalytics()}
  <script>${reelEligibility()}</script>
  <style>${css()}</style>
</head>
<body data-active-mode="overview">
  <a class="skip-link" href="#top">Skip to content</a>
  <header class="lab-masthead" aria-label="Judgment Lab">
    <div class="masthead-inner">
      <a class="package-brand" href="#overview" data-mode-link="overview">Judgment Lab<span class="brand-period" aria-hidden="true">.</span></a>
      <p class="brand-purpose">Strengthening human judgment in AI-enabled work.</p>
      <button class="reel-replay" type="button" data-reel-replay aria-haspopup="dialog" aria-controls="reel-dialog"><span class="reel-replay-dot" aria-hidden="true"></span>Watch the reel <span class="reel-replay-length" aria-hidden="true">0:15</span><span class="sr-only">(15 seconds)</span></button>
    </div>
  </header>
  <nav class="package-nav" aria-label="Learning paths"><div class="package-nav-inner">
    <div class="package-tabs" role="tablist" aria-label="Learning paths">
      ${modeButton("overview", "Learn", true)}
      ${modeButton("discuss", "Discuss")}
      ${modeButton("companion", "Practice")}
      ${modeButton("workbench", "Design")}
      ${modeButton("sources", "References")}
    </div>
    <label class="audience-setting" for="lab-audience">Audience
      <select id="lab-audience"><option value="">All settings</option>${audiences.map(a=>`<option value="${a.id}">${escapeHtml(a.label)}</option>`).join("")}</select>
    </label>
    </div>
  </nav>
  <noscript><p class="surface">Interactive navigation requires JavaScript. Read <a href="assets/essays/he.md">the HE essay</a>, <a href="assets/essays/k12.md">the high-school educator essay</a>, or <a href="assets/essay.md">read the essay</a> or <a href="assets/judgment-lab-interactive-context.md">download the complete lab context</a>.</p></noscript>
  <main id="top" class="site-shell" tabindex="-1">
    ${audiences.map(a => {
      const headings = a.id === "pme" ? essayToc : collectHeadings(readRequiredCompanionFile(a.essayFile),{skipFirstH2:true});
      const prefix = a.id === "pme" ? "" : a.essayMode + "-";
      return `<aside class="toc" data-essay-rail="${a.essayMode}" aria-label="${escapeHtml(a.essayTitle)} sections" hidden>${headings.map((item,index)=>`<a href="#${prefix}${item.id}" data-toc-link="${prefix}${item.id}"><span></span>${index+1}. ${escapeHtml(item.text.replace(/^[IVX]+\.\s*/, ""))}</a>`).join("")}</aside>`;
    }).join("")}

    <div class="content-frame">
      <section class="mode-view is-active" data-mode="overview" id="panel-overview" role="tabpanel" aria-labelledby="tab-overview">${overviewHtml}</section>
      ${audiences.map(a => `<section class="mode-view" data-mode="${a.id}" id="panel-${a.id}" role="region" aria-label="${escapeHtml(a.title)}">${buildAudienceMode(a)}</section>`).join("")}
      ${companionEditions.map(a => `<section class="mode-view" data-mode="${a.essayMode}" id="panel-${a.essayMode}" role="region" aria-label="${escapeHtml(a.essayTitle)}">${buildCompanionEssay(a)}</section>`).join("")}
      <section class="mode-view" data-mode="essay" id="panel-essay" role="region" aria-label="The Irreducible Officer">
        <div class="published">Published June 28, 2026</div>
        <div class="nwc-rule" aria-hidden="true"><span></span></div>
        <section class="essay-hero">
          <h1>The Irreducible Officer</h1>
          <p class="dek">Purpose, accountability, and AI-enabled strategic judgment.</p>
          <p>The original PME argument. Read the companion editions for other settings.</p>${editionLinks()}
          <a class="quiet-action" href="assets/the-irreducible-officer.pdf" download>Download PDF</a>
        </section>
        <article class="essay article-body">${essayHtml}</article>
      </section>
      <section class="mode-view" data-mode="discuss" id="panel-discuss" role="tabpanel" aria-labelledby="tab-discuss">${buildDiscussMode()}</section>
      <section class="mode-view" data-mode="companion" id="panel-companion" role="tabpanel" aria-labelledby="tab-companion">${companionHtml}</section>
      <section class="mode-view" data-mode="workbench" id="panel-workbench" data-wb-view="overview" role="tabpanel" aria-labelledby="tab-workbench">${workbenchHtml}</section>
      <section class="mode-view" data-mode="sources" id="panel-sources" role="tabpanel" aria-labelledby="tab-sources">${sourcesHtml}</section>
    </div>
  </main>

  <footer class="lab-footer"><a href="#overview" data-mode-link="overview">Judgment Lab</a><p>Strengthening human judgment in AI-enabled work.</p><a href="#sources" data-mode-link="sources">Explore the evidence and its limits</a><p class="lab-version">Version ${escapeHtml(release.version)} · ${escapeHtml(release.commits.site)}</p></footer>
  <div class="sr-only" id="copy-status" role="status" aria-live="polite"></div>
  ${reelDialog()}

  <script>${clientJs()}</script>
  <script>${readFileSync(join(root, "scripts", "reel-client.js"), "utf8")}</script>
</body>
</html>
`;
}

// Decided in <head> so a first-time visitor never sees the page flash before
// the reel covers it: home page only, first visit only, and never when the
// visitor prefers reduced motion or has asked to save data.
function reelEligibility() {
  return `try{var h=location.hash.slice(1);if((!h||h==="overview"||h==="learn")&&localStorage.getItem("jl-reel-seen")!=="1"&&!matchMedia("(prefers-reduced-motion: reduce)").matches&&!(navigator.connection&&navigator.connection.saveData)&&window.HTMLDialogElement&&"showModal" in HTMLDialogElement.prototype)document.documentElement.classList.add("reel-pending")}catch(e){}`;
}

function reelDialog() {
  const asset = (name) => `assets/reel/${name}?v=${reelVersion}`;
  return `<dialog id="reel-dialog" class="reel" tabindex="-1" aria-label="Judgment Lab reel" aria-describedby="reel-description" data-mp4="${asset("judgment-lab-reel.mp4")}" data-webm="${asset("judgment-lab-reel.webm")}" data-poster="${asset("poster.jpg")}">
    <div class="reel-surface"><video class="reel-video" playsinline preload="none" disablepictureinpicture disableremoteplayback aria-hidden="true"></video></div>
    <p id="reel-description" class="sr-only">A 15-second film. A red dot, standing for human judgment, holds still while pages of machine-written analysis flood the screen. Everything freezes and four words form a question: whose judgment is this? The film then works through the closing line of The Irreducible Officer: frame the problem, calibrate the tool, refuse the garden path, own the decision. The dot becomes the period in the Judgment Lab wordmark.</p>
    <div class="reel-controls">
      <button class="reel-button" type="button" data-reel-sound aria-label="Turn sound on">Sound on</button>
      <button class="reel-button reel-button-primary" type="button" data-reel-close aria-label="Skip the reel">Skip</button>
    </div>
    <div class="reel-progress" aria-hidden="true"><span data-reel-progress></span></div>
    <span class="reel-dot" aria-hidden="true" hidden></span>
  </dialog>`;
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
  return `<button type="button" id="tab-${mode}" role="tab" data-mode-tab="${mode}" aria-selected="${String(active)}" aria-controls="panel-${mode}" tabindex="${active ? "0" : "-1"}">${label}</button>`;
}

function buildOverviewMode() {
  return `<div class="surface overview">
    <section class="learn-opening">
      <div><h1>When AI helps,<br>who owns the judgment?</h1><p class="dek">Better work can make human understanding harder to see.</p><p>Explore the argument. Challenge it with others. Test a decision, then design practice that makes the reasoning visible.</p></div>
      <aside class="featured-reading"><h2>The Irreducible Officer</h2><p>The essay that started the Lab: purpose, accountability, and judgment in work shaped by AI.</p><a href="#essay" data-mode-link="essay">Read the essay <span aria-hidden="true">→</span></a><span class="reading-context">The original PME argument, with full companion essays for higher education and high-school educators.</span></aside>
    </section>
    ${buildOpeningPractice("home", "he")}
    <section class="detail-band"><h2 class="band-label">Three settings, one argument to test</h2>${editionLinks()}</section>
    <section class="audience-paths" aria-label="Choose your setting">
      ${audiences.map(a => `<a class="audience-path" href="#${a.id}" data-mode-link="${a.id}"><h2>${escapeHtml(a.title)}</h2><p>${escapeHtml(a.question)}</p><span>${escapeHtml(a.summary)}</span><strong>Open this view →</strong></a>`).join("")}
    </section>
    <section class="method-band"><h2>One method, different teaching decisions</h2><p>Own the purpose. Examine the frame. Calibrate reliance. Defend the decision. Change the conditions.</p><p>Every setting builds foundations inside the work while learners direct AI. High school is the first K–12 starting point; younger-grade adaptations are still to come.</p><a class="quiet-action" href="assets/audiences/shared-foundations.md" download>Read the shared foundation</a></section>
    <section class="learning-paths" aria-label="Ways to use the Lab">
      <a href="#discuss" data-mode-link="discuss"><h2>Discuss</h2><p>Bring an example. Challenge one of five claims with colleagues.</p><span>Open Judgment in Practice →</span></a>
      <a href="#companion" data-mode-link="companion"><h2>Practice</h2><p>Make a judgment before the assistant contributes. See what changes.</p><span>Set up a session →</span></a>
      <a href="#workbench" data-mode-link="workbench"><h2>Design</h2><p>Turn an insight into an assignment, assessment, or reusable teaching method.</p><span>Open the educator workbench →</span></a>
    </section>
    <section class="testing-note"><h2>Ready for educator testing</h2><p>These teaching designs are proposals to test. A successful conversation does not establish learning gains. Inspect the decisions it records and revise from what happens.</p><a href="#ix-a-foundation-pilot" data-essay-section-link="ix-a-foundation-pilot">See the five-step pilot</a></section>
  </div>`;
}

function buildDiscussMode() {
  return `<div class="surface discuss-surface">
    <section class="surface-hero"><h1>Judgment in Practice</h1><p class="dek">A conversation worth having before the next AI-assisted assignment.</p><p>Choose a claim to challenge. Bring a concrete example, a serious objection, and a willingness to reconsider. Use this 20–30 minute guided discussion with colleagues, supported by a facilitator guide.</p><div class="action-row"><a class="copy-button primary" href="https://judgment-in-practice.web.app/guide.html" target="_blank" rel="noreferrer">Open the facilitator guide</a><a class="quiet-action" href="https://judgment-in-practice.web.app/" target="_blank" rel="noreferrer">Open the guided discussion</a></div></section>
    <section class="detail-band"><h2 class="band-label">Read the argument in your setting</h2>${editionLinks()}</section>
    <section class="discussion-opening"><h2>Where does the judgment happen?</h2><p>A student submits an excellent paper with help from an AI agent. The agent helped define the problem and develop the argument. Which choices can the student explain—and what happens when an assumption changes?</p><p>Start with an example from your work. Whose decision is it, and what would make their understanding visible?</p><p class="source-note">Fictional education example adapted from <a href="#essay" data-mode-link="essay">The Irreducible Officer</a>.</p></section>
    <p class="discussion-setting" data-discussion-setting>Choose a setting above to frame the discussion for your audience.</p>
    <section class="discussion-claims" aria-label="Five claims to challenge">
      ${discussionClaims.map(c=>`<details id="discuss-${c.id}" class="discussion-claim"><summary>${escapeHtml(c.title)}</summary><div class="discussion-body"><p class="discussion-question">${escapeHtml(c.question)}</p><div class="discussion-columns"><section><h3>A fictional example</h3><p>${escapeHtml(c.example)}</p></section><section><h3>A serious objection</h3><p>${escapeHtml(c.objection)}</p></section></div><h3>Discuss</h3><p>${escapeHtml(c.discussion)}</p><div class="discussion-sources">${c.sources.map(source=>`<a href="${escapeHtml(source.href)}" target="_blank" rel="noreferrer">${escapeHtml(source.label)}</a>`).join("")}</div><a class="quiet-action" href="#companion" data-mode-link="companion" data-discussion-claim="${c.id}">Test this claim in Practice</a></div></details>`).join("")}
    </section>
    <section class="discussion-close"><h2>Take one judgment back to your work.</h2><p>Name a choice that could disappear inside AI assistance. Decide what the person responsible should explain or demonstrate.</p><div class="action-row"><a class="copy-button primary" href="#workbench" data-mode-link="workbench">Design a teaching activity</a><a class="quiet-action" href="#sources" data-mode-link="sources">Examine the evidence</a></div></section>
    <div class="discussion-library"><h2>Continue the conversation</h2><a href="https://judgment-in-practice.web.app/case.html" target="_blank" rel="noreferrer">A school-leadership case: accurate data, an incomplete picture →</a><p>This case concerns adult institutional decisions. The high-school learning exercises address different responsibilities.</p><a href="https://judgment-in-practice.web.app/reading.html" target="_blank" rel="noreferrer">Further reading: seven patterns of AI-assisted work →</a><p>The five claims and objections above come from Jack Shaw’s <a href="https://judgment-in-practice.web.app/" target="_blank" rel="noreferrer">Judgment in Practice</a>, originally prepared for EduFish. Links retain the original evidence notes and their limits.</p></div>
  </div>`;
}

function buildOpeningPractice(key, audience) {
  const c = profiles.find(p => p.id === audience).practice;
  return `<section class="judgment-try" data-try="${key}" data-try-audience="${audience}"><h2>Try a judgment before you read on.</h2><p>${c.label} · fictional example. A short, scripted practice sequence. Your responses stay in this tab unless you download or share them; reloading clears them.</p>
    <form data-try-form>
      <div data-try-stage="0"><h3>Your starting point</h3><p>${c.initial}</p><label for="${key}-initial">Your judgment and reason</label><textarea id="${key}-initial" name="initial" rows="3" required maxlength="4000"></textarea><button class="copy-button" type="submit">Examine a contribution</button></div>
      <div data-try-stage="1" hidden><h3>A contribution to examine</h3><p>Constructed AI-style contribution for practice:</p><blockquote>${c.contribution}</blockquote><label for="${key}-reliance">What would you accept, check, revise, or refuse—and why?</label><textarea id="${key}-reliance" name="reliance" rows="3" disabled required maxlength="4000"></textarea><button class="copy-button" type="submit">Change a condition</button></div>
      <div data-try-stage="2" hidden><h3>Now change a condition</h3><p>${c.change}</p><label for="${key}-changed">Your decision now, with a reason</label><textarea id="${key}-changed" name="changed" rows="3" disabled required maxlength="4000"></textarea><button class="copy-button" type="submit">Compare your reasoning</button></div>
    </form>
    <div data-try-stage="3" hidden tabindex="-1"><h3>Review the decisions you made</h3><p>${c.review}</p><p>This note does not grade your response. Keep a justified disagreement. One exercise cannot establish lasting understanding.</p><div data-try-record></div><div class="action-row"><button class="copy-button" type="button" data-try-download>Download your record</button><a class="quiet-action" href="?audience=${audience}#companion" data-mode-link="companion" data-practice-audience="${audience}">Continue in Practice</a></div><p>Bring the record to your assistant for a fuller conversation. The record preserves the case and your responses, with review status left open.</p></div>
  </section>`;
}

function editionLinks() {
  return `<div class="edition-links" aria-label="Essay editions">${audiences.map(a => `<a href="#${a.essayMode}" data-mode-link="${a.essayMode}">${escapeHtml(a.essayTitle)} <span>(${escapeHtml(a.label)})</span></a>`).join("")}</div>`;
}

function buildCompanionEssay(a) {
  const markdown = readRequiredCompanionFile(a.essayFile);
  const prefix = a.essayMode + "-";
  const body = prefixIds(renderMarkdown(markdown,{skipFirstH1:true,skipFirstH2:true}).replaceAll("*The Irreducible Officer*", "<em>The Irreducible Officer</em>"), prefix)
    .replace(/href="(?!https?:|#)([^"]+)"/g,(_,path)=>`href="assets/${path.startsWith("../") ? path.slice(3) : "essays/"+path}"`);
  const subtitle = markdown.split("\n").find(line=>line.startsWith("## ")).slice(3);
  return `<div class="companion-edition"><div class="published">Companion testing edition · September 2026</div><section class="essay-hero"><h1>${escapeHtml(a.essayTitle)}</h1><p class="dek">${escapeHtml(subtitle)}</p><div class="action-row"><a class="quiet-action" href="assets/${a.essayFile}" download>Download essay</a><a class="quiet-action" href="#companion" data-mode-link="companion">Test the argument in Practice</a><a class="quiet-action" href="#${a.id}" data-mode-link="${a.id}">Open the teaching guide</a></div></section><article class="essay article-body">${body}</article><section class="detail-band"><h2>Read across settings</h2>${editionLinks()}</section></div>`;
}

function buildAudienceMode(a) {
  return `<div class="surface audience-surface"><div class="nwc-rule" aria-hidden="true"><span></span></div>
    <section class="surface-hero"><h1>${escapeHtml(a.title)}</h1><p class="dek">${escapeHtml(a.question)}</p><p>${escapeHtml(a.summary)}</p>
    <div class="action-row"><a class="copy-button primary" href="#companion" data-mode-link="companion">Start an interactive session</a><a class="quiet-action" href="#workbench" data-mode-link="workbench">Adapt your teaching</a><a class="quiet-action" href="assets/audiences/${a.file}" download>Download this guide</a></div></section>
    <section class="detail-band"><h2 class="band-label">The argument in your setting</h2><p><a href="#${a.essayMode}" data-mode-link="${a.essayMode}">${escapeHtml(a.essayTitle)}</a></p><p>Read the full essay, then use the guide below to try its method. ${a.id === "pme" ? "The original PME argument." : "Companion testing edition; the adaptation record makes its changes explicit."}</p></section>
    ${buildOpeningPractice(a.id, a.id)}
    <details class="edition-toc teaching-guide"><summary>Teaching guide and review notes (reveals the case analysis)</summary><article class="article-body audience-guide">${prefixIds(renderMarkdown(readRequiredCompanionFile("audiences/" + a.file), {skipFirstH1: true}).replace(/href="\.\.\/essays\/(he|k12)\.md" target="_blank" rel="noreferrer"/g, (_,id)=>`href="#${id}-essay" data-mode-link="${id}-essay"`), a.id + "-")}</article></details>
  </div>`;
}

function buildCompanionMode() {
  return `<div class="surface companion-surface">
    <div class="nwc-rule" aria-hidden="true"><span></span></div>
    <section class="surface-hero">
      <h1>Practice your judgment</h1><div class="discussion-carry" data-discussion-carry hidden><p data-discussion-focus></p><button type="button" class="quiet-action" data-clear-discussion>Clear discussion focus</button></div>
      <p class="dek">Use ChatGPT, Claude, Gemini, or another AI assistant to work through the essay, test claims, design an exercise, and create a traceable learning artifact.</p>
      <p>
        The setup prompt reads the whole companion file, tests that the read is
        complete, and facilitates your next step. Choose your setting above; the prompt follows it. You make the decisions, one question at a time.
      </p>
      <h2 class="door-question">How will your assistant get the file?</h2>
      <div class="door-grid">
        <div class="door">
          <h3>Attach the context file</h3>
          <p>Download the context file, attach it to a new chat, then paste the setup prompt. If attachments are unavailable, paste the file text. A partial read needs to be resolved before the session starts.</p>
          <div class="action-row">
            <a class="copy-button primary" href="assets/${companionContextFilename}" download>Download context file</a>
            <button class="quiet-action" type="button" data-copy-target="setup-prompt">Copy the prompt</button>
          </div>
        </div>
        <div class="door">
          <h3>My assistant reads the web</h3>
          <p>Copy the setup prompt and paste it into ChatGPT, Claude, or Gemini. It fetches the companion file itself.</p>
          <div class="action-row">
            <button class="copy-button" type="button" data-copy-target="setup-prompt">Copy setup prompt</button>
          </div>
        </div>
      </div>
    </section>

    <section class="detail-band"><h2 class="band-label">Test a failure mode</h2><p>Current setting: <strong data-audience-current>Choose your setting above</strong>. Begin with your setting’s essay as an educator, then transfer to your teaching. <a href="#essay" data-selected-essay data-mode-link="essay">Read your setting’s essay</a>.</p><p>Frame capture · Fluency substitution · Premature synthesis · Uncalibrated reliance · Invisible delegation · Institutional monoculture · Responsibility laundering</p><div class="action-row"><button class="copy-button primary" type="button" data-copy-target="failure-mode-prompt">Copy interactive lab prompt</button><a class="quiet-action" href="assets/judgment-lab-interactive-context.md" download>Download lab context</a></div>${copyBlock("failure-mode-prompt", labPrompt())}</section>
    <section class="setup-panel">
      <div class="panel-heading">
        <h2>Paste this once into your AI assistant.</h2>
      </div>
      ${copyBlock("setup-prompt", setupPrompt())}
    </section>

    <section class="capability-section">
      <h2 class="section-title">What You Can Do</h2>
      <div class="capability-grid">
        ${miniCard("Understand", "Get the thesis, argument map, likely misunderstanding, and open questions.")}
        ${miniCard("Inspect", "Audit claims against the source spine before deciding what you believe.")}
        ${miniCard("Argue", "Test objections in their strongest form, including workload, restrictions, and faculty readiness.")}
        ${miniCard("Practice", "Run a faculty fluency lab around purpose, frame, reliance, accountability, and transfer.")}
      </div>
    </section>

    <section class="starter-section">
      <h2 class="section-title">Choose A Starting Path</h2>
      <div class="prompt-grid">
        ${starterPromptCards()}
      </div>
    </section>
  </div>`;
}

function setupPrompt() {
  return `You are a close-reading and analysis assistant working under my direction. I am exploring Judgment Lab’s original PME essay and its HE and high-school companion editions. I own my judgments; you structure, challenge, and point to evidence.

${companionContextInstruction()}

Use my stated audience, or ask which setting I want. Read ESSAY for PME, ESSAY HE for higher education, or ESSAY K12 for high school. Give the selected edition’s core claim briefly, distinguish adaptations from the original, then ask what I want to test. For an interactive session, follow INTERACTIVE LAB PROTOCOL: one question at a time, wait for my judgment before the contribution, then test a changed condition. Use the selected AUDIENCE section for teaching transfer. Do not assume PME prerequisites in HE or K–12. Preserve disagreement and source limits. Save only decisions I actually made.`;
}

function labPrompt() {
  return `Run the Judgment Lab interactive failure-mode session. Use an attached judgment-lab-interactive-context.md if provided; otherwise read ${siteUrl}/assets/judgment-lab-interactive-context.md in full. If you cannot read the complete file, ask me to attach or paste it before proceeding.

Follow labs/failure-mode-lab/facilitator.md. Use my stated audience or ask for my setting. Read the selected edition: the-irreducible-officer.md for PME, essays/he.md for HE, or essays/k12.md for high school. Begin with that essay and help me choose one of its seven failure modes. Collect my judgment before presenting the constructed contribution. Ask one question at a time and WAIT. Do not reveal case notes early unless I ask. Test my reasons, change a consequential condition, and let me retain or revise my view. Then use the audience guide to adapt the method to my teaching objective and learners' readiness. Save a short record of my actual decisions, support used, proposals, and open questions. Do not certify competence or invent classroom evidence.`;
}

function workbenchSetupPrompt(id = null) {
  const variant = workbenchVariants[id];
  const url = variant ? `${siteUrl}/assets/workbench-context-${id}.md` : workbenchContextUrl;
  const count = variant ? variant.bundle.sectionCount : workbenchSectionCount;
  return `You are a facilitation assistant for the Judgment Lab Educator Workbench, working under my direction. I am an educator designing AI-enabled teaching in PME, higher education, or high school. I own every pedagogical judgment; you ask, structure, and challenge.

Before you answer anything, use the attached context file if provided; otherwise fetch and read this file in full. It contains the operating rules, the AI fluency progression, the phase placement diagnostic, and every workbench template with its AI Facilitation Block:

${url}

If you cannot reach that URL, tell me you could not read it and ask me to paste or attach the context file. Do not answer from memory.

After reading, tell me exactly how many "===== SECTION:" headers the file contains and the name of the last section — it should be ${count}. If your count differs or you cannot see the whole file, say so and ask me to attach the file instead; do not continue from a partial read — a partial read causes you to invent workbench content that is not in the file.

Use my selected setting or ask for it, then read the AUDIENCE GUIDE and the matching AUDIENCE section. Confirm the bundle setting matches mine; if it does not, ask for the matching file before facilitating. Apply that setting’s reference matrix, worked example, support and responsibility limits throughout. The example is optional; preserve my actual teaching task. Ask whether I have practiced with the essay or already have a concrete teaching task. If I need that practice first, direct me to the interactive lab context at ${siteUrl}/assets/judgment-lab-interactive-context.md; the matching ESSAY section is included here, but the interactive lab context supplies the full facilitation protocol and cases. Otherwise run the Phase Placement Diagnostic, one question at a time, with task readiness and support explicit. Then facilitate the chosen template. The progression is a design lens, not a universal developmental ladder.`;
}

function companionContextInstruction() {
  return `Before you answer anything, use the attached context file if provided; otherwise fetch and read this file in full. It contains the essay and companion materials: claim map, source spine, objections, workflow patterns, transfer case, traceable-artifact template, and starter prompts.

${companionContextUrl}

If you cannot reach that URL, tell me you could not read it and ask me to paste or attach the context file. Do not answer from the essay alone or from memory.

After reading, tell me exactly how many "===== SECTION:" headers the file contains and the name of the last section — it should be ${companionSectionCount}. If your count differs or you cannot see the whole file, say so and ask me to paste or attach the context file instead; do not continue from a partial read — a partial read causes you to invent content that is not in the file.`;
}

function starterPromptCards() {
  const prompts = [
    {
      id: "prompt-understand",
      title: "Understand the argument",
      bestFor: "Get the thesis, argument map, likely misunderstanding, and open questions.",
      text: `${companionContextInstruction()}

After you read the context file, help me understand "The Irreducible Officer."

Do not turn this into a generic AI-in-education summary. Preserve the specific claim: NWC must teach and certify AI-enabled strategic judgment by making purpose, frame, reliance, accountability, and transfer visible.

Return:
1. the thesis in one sentence;
2. the argument in 10 bullets;
3. the claim most likely to be misunderstood;
4. why that misunderstanding is tempting;
5. two questions educators in my setting should keep open.`,
    },
    {
      id: "prompt-claims",
      title: "Inspect a claim",
      bestFor: "Choose a claim, then audit the evidence and unresolved questions.",
      text: `${companionContextInstruction()}

After you read the context file, help me inspect the evidence behind "The Irreducible Officer." Use the CLAIMS and SOURCE SPINE sections.

List 5-7 important claims worth auditing. For each one, give me a short label and one sentence on why it matters. Then ask me which claim I want to inspect.

After I pick one, audit it with me: best evidence, strongest unresolved question or counterexample, where the evidence is strong or incomplete, what source I should read, and one implication for teaching in my setting, clearly distinguished from the essay’s original PME claim. Quote the CLAIMS and SOURCE SPINE entries you are drawing on — if you cannot point to the entry, say so rather than filling the gap.`,
    },
    {
      id: "prompt-objection",
      title: "Test an objection",
      bestFor: "Start with the strongest version before deciding what survives.",
      text: `${companionContextInstruction()}

After you read the context file, help me test an objection to "The Irreducible Officer." Use the OBJECTIONS, CLAIMS, and SOURCE SPINE sections.

Start by naming the objection in its strongest form, quoting the OBJECTIONS section's formulation before sharpening it further. Then give:
1. the essay's answer in plain English;
2. the best evidence that supports that answer;
3. the strongest way the objection could still be right;
4. how the objection changes instructional design in my setting;
5. one experiment, source, or review loop that would make the answer more concrete.`,
    },
    {
      id: "prompt-exercise",
      title: "Design an exercise",
      bestFor: "Move from the essay to a task in your setting.",
      text: `${companionContextInstruction()}

After you read the context file, help me turn "The Irreducible Officer" into a practical learning exercise. Use my AUDIENCE section and TRACEABLE ARTIFACT; the NWC TRANSFER CASE is a PME example.

Before designing anything, ask me: my course or seminar, the artifact my students actually produce, and how much session time I have. Build on my answers rather than assuming.

Then design an exercise sized to my time that begins by interrogating the essay itself, then transfers the method to an appropriate task in my setting. Check prerequisite knowledge, readiness, and needed support first. Requirements, in order:
1. identify inherited AI-shaped inputs;
2. force the learner to identify the frame, assumptions, evidence standard, and AI reliance decisions;
3. include a flawed AI output or flawed frame;
4. end with a traceable learning artifact.

Return the learning objective, materials, step-by-step flow, facilitator notes, outputs, assessment criteria, and likely failure modes.`,
    },
    {
      id: "prompt-fluency",
      title: "Practice faculty fluency",
      bestFor: "Build, direct, question, and assess AI-enabled work.",
      text: `${companionContextInstruction()}

After you read the context file, use "The Irreducible Officer" as a faculty fluency lab. Use the WORKFLOW PATTERNS and TRACEABLE ARTIFACT sections.

Ask me for one task, case, assignment, or problem in my setting. Help me define the purpose, problem frame, assumptions, and evidence standard. Propose an AI-assisted workflow that could sharpen the work, identify where the workflow might hide judgment, and ask me to defend which AI outputs I would accept, reject, verify, or withhold.

After the session, assess what I commanded well, where I let the system set the terms, and what faculty artifact should be improved.`,
    },
    {
      id: "prompt-defense",
      title: "Run oral defense",
      bestFor: "Press whether the learner owns the frame behind the artifact.",
      text: `${companionContextInstruction()}

After you read the context file, help me rehearse a short defense appropriate to my setting. Written or accessible equivalent responses are welcome. Use the CLAIMS and TRACEABLE ARTIFACT sections.

Start by asking me what work I am defending and what role AI played in producing it. Then ask one question at a time. Your goal is to determine whether I own the frame behind my AI-assisted work.

Press me on problem frame, assumptions, evidence standards, alternative frames, reliance decisions, rejected AI outputs, risks and costs, what would change my conclusion, and where human judgment must interrupt automation.

After six questions, describe what the responses show and leave uncertain about ownership and identify what evidence should be added to the traceable learning artifact.`,
    },
  ];

  return prompts.map((prompt) => `<article class="prompt-card">
    <h3>${escapeHtml(prompt.title)}</h3>
    <p>${escapeHtml(prompt.bestFor)}</p>
    ${copyBlock(prompt.id, prompt.text)}
    <button class="copy-button link-style" type="button" data-copy-target="${prompt.id}">Copy prompt &rarr;</button>
  </article>`).join("\n        ");
}

function buildWorkbenchMode(tools, concepts) {
  const selected = tools[0];
  const selectedJobHeading = (workbenchJobs.find((job) => job.id === selected.job) || {}).heading;
  const selectedName = selected.toolName || selected.title;
  return `<div class="surface workbench-surface">
    <div class="nwc-rule" aria-hidden="true"><span></span></div>
    <div class="wb-overview">
    <section class="surface-hero">
      <h1 id="workbench-title" tabindex="-1">Educator Workbench</h1><div class="discussion-carry" data-discussion-carry hidden><p data-discussion-focus></p><button type="button" class="quiet-action" data-clear-discussion>Clear discussion focus</button></div>
      <p class="dek" id="workbench-summary">Choose a setting to open its teaching examples, reference matrix, and adapted tools.</p>
      <p id="workbench-setting-status" role="status">PME, HE, and high-school materials each require evidence from use in their own setting.</p>
    </section>

    <section class="detail-band" id="workbench-progression">
      <h2 class="band-label">Practice in your setting</h2>
      <div data-workbench-audience=""><p>Choose PME, higher education, or high school to see a worked example and its reference matrix. Ask, understand, produce, judge, codify, and supervise are optional task designs; they are not an age ladder.</p><a href="#wb-doc-frame-check" data-wb-link class="example-next">Build or check a case like this → Frame Check</a></div>
      ${profiles.map(p => `<div data-workbench-audience="${p.id}" hidden>
        <h3>${escapeHtml(p.case)}</h3><p>Authored, fictional teaching example.</p><p>${escapeHtml(p.facts)}</p><p>${escapeHtml(p.baseline)}</p>
        <details><summary>Inspect the changed case and teaching record</summary><p>${escapeHtml(p.change)}</p><p>${escapeHtml(p.record)}</p></details>
        <details><summary>Read the ${escapeHtml(p.label)} reference matrix and review criteria</summary><div class="audience-matrix article-body">${prefixIds(renderMarkdown(matrixMarkdown(p),{skipFirstH1:true}), `wb-${p.id}-`)}</div></details>
        <div class="action-row"><a class="quiet-action" href="assets/workbench/audiences/${p.id}.md" download>Download ${escapeHtml(p.label)} guide</a><a class="quiet-action" href="assets/workbench/${p.id}/reference-matrix.svg" download>Download ${escapeHtml(p.label)} matrix</a></div>
        <a href="#wb-doc-frame-check" data-wb-link class="example-next">Build or check a case like this → Frame Check</a>
      </div>`).join("")}
      <p class="visual-status"><a href="#wb-doc-why-the-matrix-is-a-hypothesis" data-wb-link>Why each audience needs its own evidence</a>. The original framework has PME roots; evidence from one setting does not validate another.</p>
    </section>

    <p id="workbench-error" role="alert" hidden>Could not load the workbench documents. Choose a tool again to retry, or download the context file under “How this works with your assistant” below.</p>
    <section id="workbench-tools" aria-label="Educator workbench tools">
      <a href="#wb-doc-phase-placement-diagnostic" data-wb-link class="start-link">Not sure where to start? Find your starting point</a>
      ${workbenchJobs.map((job) => `<section class="job-group" data-job="${job.id}">
        <h2 class="band-label">${escapeHtml(job.heading)}</h2>
        <div class="tool-grid">
          ${tools.filter((tool) => tool.job === job.id).map((tool) => workbenchCard(tool)).join("\n          ")}
        </div>
      </section>`).join("\n      ")}
    </section>

    <details class="assistant-setup">
      <summary>How this works with your assistant</summary>
      <h2 class="door-question">How will your assistant get the file?</h2>
      <div class="door-grid">
        <div class="door">
          <h3>Attach the context file</h3>
          <p>Download the context file, attach it to a new chat, then paste the setup prompt. If attachments are unavailable, paste the file text. A partial read needs to be resolved before the session starts.</p>
          <div class="action-row">
            <a class="copy-button primary" id="workbench-context-download" href="assets/${workbenchContextFilename}" download>Download context file</a>
            <button class="quiet-action" type="button" data-copy-target="workbench-setup-prompt">Copy setup prompt</button>
          </div>
        </div>
        <div class="door">
          <h3>My assistant reads the web</h3>
          <p>Copy the setup prompt and paste it into ChatGPT, Claude, or Gemini. It fetches the workbench itself.</p>
          <div class="action-row">
            <button class="copy-button" type="button" data-copy-target="workbench-setup-prompt">Copy setup prompt</button>
          </div>
        </div>
      </div>
      <section class="setup-panel">
        <div class="panel-heading">
          <h2>Paste this once into your AI assistant.</h2>
        </div>
        ${copyBlock("workbench-setup-prompt", workbenchSetupPrompt())}
      </section>
      <p class="student-data-note">${escapeHtml(studentDataNote)}</p>
    </details>

    <details class="workbench-concepts">
      <summary>Why these tools work</summary>
      <section class="detail-band">
        <h2 class="band-label">The design behind the tools</h2>
        <p>Why each artifact has the fields it does — each note bridges a workbench tool to an idea you may already know.</p>
      </section>

      <section id="workbench-concepts" class="tool-grid" aria-label="Workbench concept notes">
        ${concepts.map((note) => `<button class="tool-card" type="button" data-concept-id="${note.id}">
          <span class="tool-title">${escapeHtml(note.title)}</span>
          <span class="tool-desc">${escapeHtml(note.summary)}</span>
          <span class="tool-action">Read note &rarr;</span>
        </button>`).join("\n        ")}
      </section>
    </details>
    </div>

    <div class="wb-doc">
    <section class="selected-tool">
      <nav class="wb-breadcrumb" aria-label="Breadcrumb">
        <a href="#workbench" data-wb-home>Workbench</a>
        <span class="wb-crumb-sep" data-wb-crumb-sep="job" aria-hidden="true"${selectedJobHeading ? "" : " hidden"}>&rsaquo;</span>
        <span data-wb-crumb-job${selectedJobHeading ? "" : " hidden"}>${selectedJobHeading ? escapeHtml(selectedJobHeading) : ""}</span>
        <span class="wb-crumb-sep" aria-hidden="true">&rsaquo;</span>
        <span data-wb-crumb-tool aria-current="page">${escapeHtml(selectedName)}</span>
      </nav>
      <div class="selected-heading">
        <div>
          <h2 id="selected-tool-title" tabindex="-1">${escapeHtml(selectedName)}</h2>
        </div>
        <div class="tool-actions">
          <button class="copy-button primary" type="button" data-start-assistant>Start in your assistant</button>
          <a id="selected-tool-download" class="quiet-action" href="assets/workbench/${selected.filename}" download>Download</a>
        </div>
      </div>
      <section class="wb-next-step" id="wb-next-step" aria-label="Next step" hidden>
        <p class="wb-next-lead" data-next-lead>Copied. Paste it into a new chat in ChatGPT, Claude, or Gemini.</p>
        <p class="wb-next-line"><code id="wb-next-line" tabindex="-1"></code></p>
        <p>Assistant can't read web links? <a id="wb-next-download" href="assets/workbench/${selected.filename}" download>Download the file</a> and attach it instead.</p>
        <p class="wb-next-note">${escapeHtml(studentDataNote)}</p>
        <button class="quiet-action" type="button" data-next-dismiss>Dismiss</button>
      </section>
      <div class="template-layout">
        <section class="wb-glance" id="wb-glance" aria-labelledby="wb-glance-title"${selected.glance ? "" : " hidden"}>
          <h3 id="wb-glance-title">What you'll do</h3>
          <dl>${(selected.glance || []).map(g => `<div><dt>${escapeHtml(g.label)}</dt><dd>${escapeHtml(g.text)}</dd></div>`).join("")}</dl>
        </section>
        <aside class="use-note">
          <h3 class="band-label">How to use it</h3>
          <p id="selected-tool-note">${escapeHtml(selected.useNote)}</p>
        </aside>
        <article class="template-rendered article-body" id="workbench-doc-view" aria-label="Selected document">${selected.html}</article>
        <pre hidden><code id="workbench-template">${escapeHtml(selected.markdown.trim())}</code></pre>
      </div>
    </section>
    </div>
  </div>`;
}

function workbenchCard(tool) {
  return `<button class="tool-card" type="button" data-tool-id="${tool.id}">
    <span class="tool-title">${escapeHtml(tool.cardTitle)}</span>
    <span class="tool-name">${escapeHtml(tool.toolName)}</span>
    <span class="tool-desc">${escapeHtml(tool.cardDesc)}</span>
    <span class="tool-action">${escapeHtml(tool.cardAction)} &rarr;</span>
  </button>`;
}

function buildSourcesMode() {
  return `<div class="surface sources-surface">
    <div class="nwc-rule" aria-hidden="true"><span></span></div>
    <section class="surface-hero">
      <h1>References</h1>
      <p class="dek">The evidence map separates the essay's claims from the sources and open questions behind them.</p>
      <p>
        Use this as the working source spine for claim audits and deeper
        reading. The formal reference list remains at the end of the essay.
      </p>
    </section>
    <section class="detail-band"><h2 class="band-label">Essay editions and changes</h2>${editionLinks()}<a class="quiet-action" href="assets/essays/adaptation-map.md" download>Download the section and claim comparison</a></section>
    <section class="detail-band"><h2 class="band-label">Shared method and audience limits</h2><p>Read the shared foundation alongside the original source spine. HE and high-school examples are constructed teaching proposals. The source notes are not a substitute for inspecting the original papers, and this refresh adds no claim of cross-domain validation.</p><a class="quiet-action" href="assets/audiences/shared-foundations.md" download>Download the shared foundation</a></section>
    <details class="foundation-detail"><summary>Read the shared foundation</summary><article class="article-body">${prefixIds(renderMarkdown(readRequiredCompanionFile("audiences/shared-foundations.md"), {skipFirstH1: true}), "shared-")}</article></details>
    <details class="edition-toc teaching-guide"><summary>Teaching guide and review notes (reveals the case analysis)</summary><article class="article-body audience-guide">${renderMarkdown(readRequiredCompanionFile("sources/audience-foundations.md"))}</article></details>
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
  return `<pre class="copy-block" tabindex="0" role="region" aria-label="Prompt text"><code id="${id}" data-session-prompt>${escapeHtml(text)}</code></pre>`;
}

function placeEssayFigures(html) {
  // Each insert is anchored to a sentence in the essay source. String.replace
  // silently returns the input unchanged on a miss, which would ship the essay
  // without its visual argument — so a missed anchor fails the build instead.
  function insertAfter(input, anchor, insert) {
    if (!input.includes(anchor)) {
      throw new Error(`Essay figure anchor not found (essay prose changed?): "${anchor.slice(0, 80)}..."`);
    }
    return input.replace(anchor, `${anchor}\n${insert}`);
  }
  function insertBefore(input, anchor, insert) {
    if (!input.includes(anchor)) {
      throw new Error(`Essay figure anchor not found (essay prose changed?): "${anchor.slice(0, 80)}..."`);
    }
    return input.replace(anchor, `${insert}\n${anchor}`);
  }
  function replaceExact(input, anchor, replacement) {
    if (!input.includes(anchor)) {
      throw new Error(`Essay figure anchor not found (essay prose changed?): "${anchor.slice(0, 80)}..."`);
    }
    return input.replace(anchor, replacement);
  }

  let out = html;
  out = insertAfter(out, "The person is still present. The ownership may not be.</p>",
    pullQuote("AI did not lower the bar for strategic judgment. It raised it, then hid whether the officer cleared it."));
  out = insertBefore(out, '<p><strong>Frame capture</strong> occurs when the model supplies the first plausible frame and the student never achieves enough distance to revise it.',
    failureModesTable());
  out = insertAfter(out, "The framing is where the judgment lives: in the determination of what the situation requires, whose interests are implicated, what assumptions are doing work, and what kind of answer would actually matter. That is the intellectual work, not a preliminary step before it.</p>",
    pullQuote("The framing is where the judgment lives."));
  out = insertAfter(out, "The educational target is specific. Students need to predict, with reasonable accuracy, when AI performs well for a given type of task and when it does not, and calibrate their use accordingly.</p>",
    relianceTable());
  out = insertAfter(out, "Friction worth removing is real and abundant. Formatting, search, repetitive drafting, clerical assembly: these consume time without building judgment. AI can eliminate them and free student and faculty attention for the work that actually matters, a gain the design should capture.</p>",
    frictionCard());
  out = insertAfter(out, "AI can compress the work before a decision. It cannot own what follows. A system that did not choose the purpose cannot answer for the consequences of pursuing it.</p>",
    pullQuote("AI can compress the work before a decision. It cannot own what follows."));
  out = insertAfter(out, "The sequence runs inside a single existing assignment where framing is the central demand.</p>",
    pilotSequence());
  out = replaceExact(out, "<p>Frame the problem. Calibrate the tool. Refuse the garden path. Own the decision.</p>", closingStandard());
  return out;
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
  const tools = [
    {
      id: "phase-diagnostic",
      title: "Phase Placement Diagnostic",
      toolName: "Placement diagnostic",
      cardTitle: "Find your starting point",
      cardDesc: "Find your phase on the fluency progression and the right tool.",
      cardAction: "Open",
      filename: "phase-placement-diagnostic.md",
      useNote: "Give this to your AI assistant and say: run this diagnostic with me. Record the actual time needed.",
    },
    {
      id: "frame-check",
      title: "Frame Check",
      toolName: "Frame Check",
      job: "design",
      cardTitle: "Build a case students must frame",
      cardDesc: "Build or check a case that makes students own the frame.",
      cardAction: "Open",
      filename: "frame-check.md",
      useNote: "Give this to your AI assistant and say: run Frame Check with me. Bring your objective and the materials students will use.",
    },
    {
      id: "assignment-design",
      title: "Assignment Design Worksheet",
      toolName: "Assignment design worksheet",
      job: "design",
      cardTitle: "Decide where AI belongs in an assignment",
      cardDesc: "Decide where AI belongs and what students must own.",
      cardAction: "Open",
      filename: "assignment-design-worksheet.md",
      useNote: "Use this as a working document with faculty before revising an assignment.",
    },
    {
      id: "source-kit",
      title: "Source Kit Template",
      toolName: "Source kit",
      job: "design",
      cardTitle: "Package the materials students will use",
      cardDesc: "Package materials and boundaries for an AI-assisted exercise.",
      cardAction: "Open",
      filename: "source-kit-template.md",
      useNote: "Use this to tell an AI assistant what materials, standards, and boundaries matter.",
    },
    {
      id: "supervised-delegation",
      title: "Supervised Delegation Exercise",
      toolName: "Supervised delegation exercise",
      job: "design",
      cardTitle: "Let students direct multi-step AI work",
      cardDesc: "Design bounded student supervision of multi-step AI work.",
      cardAction: "Open",
      filename: "supervised-delegation-exercise.md",
      useNote: "Use this when students are ready to direct AI work they remain accountable for.",
    },
    {
      id: "assessment",
      title: "Assessment And Oral-Defense Rubric",
      toolName: "Assessment rubric",
      job: "assess",
      cardTitle: "Grade the reasoning, not just the product",
      cardDesc: "Review purpose, frame, reliance, accountability, and transfer.",
      cardAction: "Open",
      filename: "assessment-and-oral-defense-rubric.md",
      useNote: "Use this to decide what evidence faculty need beyond the finished artifact.",
    },
    {
      id: "flawed-output",
      title: "Flawed Output Library Template",
      toolName: "Flawed output library",
      job: "assess",
      cardTitle: "Collect AI answers worth critiquing",
      cardDesc: "Create a useful contribution with a consequential reasoning problem.",
      cardAction: "Open",
      filename: "flawed-output-library-template.md",
      useNote: "Use this to build inspectable contributions, including warranted ones, against the learning objective.",
    },
    {
      id: "calibration",
      title: "Faculty Calibration Protocol",
      toolName: "Faculty calibration protocol",
      job: "colleagues",
      cardTitle: "Compare how colleagues judge the same work",
      cardDesc: "Compare how faculty diagnose the same AI-assisted work.",
      cardAction: "Open",
      filename: "faculty-calibration-protocol.md",
      useNote: "Use this when faculty need to make tacit judgment easier to explain and reuse.",
    },
    {
      id: "after-action",
      title: "After-Action Note Template",
      toolName: "After-action note",
      job: "colleagues",
      cardTitle: "Record what worked after a class",
      cardDesc: "Save what worked, what failed, and what faculty should change.",
      cardAction: "Open",
      filename: "after-action-note-template.md",
      useNote: "Use this after running an exercise so lesson rationale and faculty judgment do not disappear.",
    },
    {
      id: "method-card",
      title: "Method Card Template",
      toolName: "Method card",
      job: "repeat",
      cardTitle: "Turn a task that works into a reusable method",
      cardDesc: "Codify a recurring AI-enabled task into a reusable method.",
      cardAction: "Open",
      filename: "method-card-template.md",
      useNote: "Use this once a task has worked at least twice and is worth writing down.",
    },
  ];
  return tools.map((tool) => {
    // With no audience selected every primer shows; drop the markers that audience adaptation keys on.
    const markdown = readRequiredWorkbenchFile(join("templates", tool.filename))
      .replace(/^<!-- \/?frame-check:primer [a-z0-9]+ -->\n?/gmu, "");
    const where = `templates/${tool.filename}`;
    const { glance, body } = extractAtAGlance(markdown, where);
    return {
      ...tool,
      markdown,
      glance,
      html: collapseFacilitation(renderMarkdown(rewriteWorkbenchLinks(body), { skipFirstH1: true }), where),
    };
  });
}

function getWorkbenchConcepts() {
  const files = ["README.md", ...listWorkbenchFiles("concepts").filter((name) => name !== "README.md")];
  return files.map((name) => {
    const markdown = readRequiredWorkbenchFile(`concepts/${name}`);
    const title = (markdown.match(/^#\s+(.+)$/mu) || [, name])[1].trim();
    const summary = (markdown.match(/^\*\*(.+)\*\*$/mu) || [, ""])[1].trim();
    return {
      id: name.replace(/\.md$/u, ""),
      title: name === "README.md" ? "Start Here: The Concepts Index" : title,
      summary,
      filename: name,
      markdown,
      html: renderMarkdown(rewriteWorkbenchLinks(markdown), { skipFirstH1: true }),
    };
  });
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
  let tableLines = [];
  let quoteLines = [];
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

  function flushTable() {
    if (tableLines.length) {
      html.push(renderTable(tableLines));
      tableLines = [];
    }
  }

  function flushQuote() {
    if (quoteLines.length) {
      html.push(`<blockquote><p>${renderInline(quoteLines.join(" "))}</p></blockquote>`);
      quoteLines = [];
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.startsWith("```")) {
      flushParagraph();
      closeList();
      flushTable();
      flushQuote();
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

    // Whole-line HTML comments are authoring notes, never reader text.
    if (/^\s*<!--.*-->\s*$/u.test(line)) continue;

    if (line.trim().startsWith("|")) {
      flushParagraph();
      closeList();
      flushQuote();
      tableLines.push(line.trim());
      continue;
    }
    flushTable();

    const quoted = line.match(/^>\s?(.*)$/u);
    if (quoted) {
      flushParagraph();
      closeList();
      if (quoted[1].trim()) quoteLines.push(quoted[1].trim());
      continue;
    }
    flushQuote();

    if (!line.trim()) {
      flushParagraph();
      closeList();
      flushTable();
      flushQuote();
      continue;
    }

    if (/^(?:---+|\*\*\*+)$/u.test(line.trim())) {
      flushParagraph();
      closeList();
      if (!html.length) {
        continue;
      }
      html.push('<hr aria-hidden="true">');
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
  flushTable();
  flushQuote();

  return html.join("\n");
}

function renderTable(lines) {
  const rows = lines.map((line) =>
    line.replace(/^\|/u, "").replace(/\|$/u, "").split("|").map((cell) => cell.trim()),
  );
  const header = rows[0] ?? [];
  const body = rows.slice(1).filter((cells) => !cells.every((cell) => /^:?-{3,}:?$/u.test(cell)));
  const head = `<thead><tr>${header.map((cell) => `<th>${renderInline(cell)}</th>`).join("")}</tr></thead>`;
  const rowsHtml = body
    .map((cells) => `<tr>${cells.map((cell) => `<td>${renderInline(cell)}</td>`).join("")}</tr>`)
    .join("");
  return `<table>${head}<tbody>${rowsHtml}</tbody></table>`;
}

function rewriteWorkbenchLinks(markdown) {
  return markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/gu, (match, label, href) => {
    if (/^https?:/u.test(href) || href.startsWith("#")) return match;
    const target = href.replace(/^(?:\.\.\/)+/u, "").replace(/^\.\//u, "");
    const mdName = (target.match(/^(?:templates\/|concepts\/)?([A-Za-z0-9-]+)\.md$/u) || [])[1];
    if (mdName && (target.startsWith("templates/") || target.startsWith("concepts/") || !target.includes("/"))) {
      return `[${label}](#wb-doc-${mdName})`;
    }
    if (target === "audiences/guide.md") return `[${label}](assets/workbench/audiences/guide.md)`;
    if (target === "framework/ai-fluency-progression.md") {
      return `[${label}](#workbench-progression)`;
    }
    return label; // unresolvable internal link: render as plain text, never a dead link
  });
}

function renderInline(text) {
  let value = escapeHtml(text);
  value = value.replace(/\[([^\]]+)\]\(([^)]+)\)/gu, (_match, label, href) => {
    if (href.startsWith("#")) {
      return `<a href="${href}" data-wb-link>${label}</a>`;
    }
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

function prefixIds(html, prefix) {
  return html.replace(/id="([^"]+)"/g, `id="${prefix}$1"`);
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
const modeAliases = {learn:"overview",practice:"companion",design:"workbench",references:"sources"};
const modeNames = ["discuss", "overview", "essay", "companion", "workbench", "sources", "pme", "he", "k12", "he-essay", "k12-essay"];
const workbenchProfiles = ${JSON.stringify(profiles.map(({tools,rows,practice,assessment,...p})=>p)).replaceAll("<","\\u003c")};
const workbenchPrompts = ${JSON.stringify(Object.fromEntries(profiles.map(p=>[p.id,workbenchSetupPrompt(p.id)]))).replaceAll("<","\\u003c")};
const workbenchJobs = ${JSON.stringify(workbenchJobs).replaceAll("<","\\u003c")};
let currentWorkbenchAudience = "";
const audienceLabels = {pme: "PME", he: "higher education", k12: "high school"};
const promptBases = new Map(Array.from(document.querySelectorAll("[data-session-prompt]")).map(el => [el, el.textContent]));
function applyAudience(id) {
  currentWorkbenchAudience = audienceLabels[id] ? id : "";
  const label = audienceLabels[id];
  const selectedEssayMode = id === "he" || id === "k12" ? id + "-essay" : "essay";
  document.querySelectorAll("[data-selected-essay]").forEach(el=>{el.href="#"+selectedEssayMode;el.dataset.modeLink=selectedEssayMode;});
  const discussionSetting = {pme:"Discuss a professional recommendation: who framed it, who can authorize it, and what risk remains?",he:"Discuss an assignment in your discipline: which inference should the student own, and what evidence would demonstrate it?",k12:"Discuss as educators first: which concepts have been taught, what support is needed, and which choices can students own? Adult institutional duties remain with adults."};
  document.querySelectorAll("[data-discussion-setting]").forEach(el=>el.textContent=discussionSetting[id] || "Choose a setting above to frame the discussion for your audience.");
  const currentClaim = new URL(location.href).searchParams.get("claim");
  const claimNames = {learning:"Evidence of learning",approval:"Judgment before approval",friction:"Developmental effort",better:"Who defines better?",frames:"Different answers, shared frames"};
  document.querySelectorAll("[data-discussion-carry]").forEach(el=>el.hidden=!claimNames[currentClaim]);
  document.querySelectorAll("[data-discussion-focus]").forEach(el=>el.textContent=claimNames[currentClaim] ? "From your discussion: " + claimNames[currentClaim] : "");
  const profile = workbenchProfiles.find(p=>p.id===id);
  document.getElementById("workbench-title").textContent = profile ? profile.title : "Educator Workbench";
  document.getElementById("workbench-summary").textContent = profile ? profile.summary : "Choose a setting to open its teaching examples, reference matrix, and adapted tools.";
  document.getElementById("workbench-setting-status").textContent = profile ? profile.status : "PME, HE, and high-school materials each require evidence from use in their own setting.";
  document.getElementById("lab-audience").value = currentWorkbenchAudience;
  document.getElementById("workbench-context-download").href = "assets/workbench-context"+(profile?"-"+id:"")+".md";
  document.querySelectorAll("[data-workbench-audience]").forEach(el=>el.hidden=el.dataset.workbenchAudience!==currentWorkbenchAudience);
  document.querySelectorAll("[data-audience-current]").forEach(el => el.textContent = label || "Choose your setting above");
  document.querySelectorAll("[data-audience-link]").forEach(el => { if (el.dataset.audienceLink === id) el.setAttribute("aria-current", "true"); else el.removeAttribute("aria-current"); });
  promptBases.forEach((text, el) => {
    const base = el.id === "workbench-setup-prompt" && profile ? workbenchPrompts[id] : text;
    const local = base.replaceAll("${siteUrl}/assets/", new URL("assets/", location.href).href);
    const claim = new URL(location.href).searchParams.get("claim");
    const claimFocus = {learning:"Fluency substitution: distinguish assisted output from evidence of understanding",approval:"Frame capture: examine the judgment made before approval",friction:"Premature synthesis: distinguish useful support from lost practice",better:"Invisible delegation: inspect who supplied the criteria",frames:"Institutional monoculture: test whether different answers share the same frame"};
    const discussionContext = claimFocus[claim] && ["failure-mode-prompt","setup-prompt","workbench-setup-prompt"].includes(el.id) ? "Coming from the group discussion, I want to examine " + claimFocus[claim] + ". Help me test this claim; do not assume it is correct.\\n\\n" : "";
    el.textContent = discussionContext + (label ? "My setting is " + label + ". Use the " + id.toUpperCase() + " audience guide and its matching full essay edition.\\n\\n" : "") + local;
  });
  if (typeof refreshWorkbench === "function") refreshWorkbench();
}
// Initial audience application occurs through setMode after client state is initialized.
const essayRails = Array.from(document.querySelectorAll("[data-essay-rail]"));
let toc = null;
let tocEntries = [];
const allTocEntries = Array.from(document.querySelectorAll("[data-toc-link]"))
  .map((link) => ({ link, heading: document.getElementById(link.dataset.tocLink) }))
  .filter((entry) => entry.heading);
function selectEssayRail(mode) {
  toc = essayRails.find(rail => rail.dataset.essayRail === mode) || null;
  essayRails.forEach(rail => {rail.hidden = rail !== toc;});
  tocEntries = allTocEntries.filter(({link}) => link.closest("[data-essay-rail]") === toc);
}
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// Workbench documents are fetched on demand the first time the Workbench
// surface opens, so essay readers never download them.
let workbenchTools = [];
let workbenchConcepts = [];
let workbenchDataPromise = null;
let loadedWorkbenchData = null;
let selectedWorkbenchFile = "phase-placement-diagnostic.md";
let selectedWorkbenchConcept = false;
// Each Start click takes a token; hiding the next-step panel retires it, so a
// late clipboard result from an earlier click cannot reopen the panel.
let startAssistantToken = 0;
function refreshWorkbench() {
  if (!loadedWorkbenchData) return;
  const variant = loadedWorkbenchData.audiences[currentWorkbenchAudience];
  workbenchTools = variant ? variant.tools : loadedWorkbenchData.tools;
  workbenchConcepts = loadedWorkbenchData.concepts;
  for (const tool of workbenchTools) {
    const card = document.querySelector('[data-tool-id="'+tool.id+'"]');
    if (card) card.querySelector(".tool-desc").textContent = tool.cardDesc || tool.useNote;
  }
  const item = (selectedWorkbenchConcept ? workbenchConcepts : workbenchTools).find(t=>t.filename===selectedWorkbenchFile) || workbenchTools[0];
  renderWorkbenchDocument(item,selectedWorkbenchConcept);
}


function ensureWorkbenchData() {
  if (!workbenchDataPromise) {
    workbenchDataPromise = fetch("assets/workbench-data.json?v=${workbenchDataVersion}")
      .then((response) => {
        if (!response.ok) throw new Error("workbench data " + response.status);
        return response.json();
      })
      .then((data) => {
        document.getElementById("workbench-error").hidden = true;
        loadedWorkbenchData = data;
        refreshWorkbench();
        return data;
      })
      .catch((error) => {
        workbenchDataPromise = null;
        document.getElementById("workbench-error").hidden = false;
        throw error;
      });
  }
  return workbenchDataPromise;
}

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

// TOC geometry only changes on layout (resize, font load, mode change), never
// on scroll — measure it once per layout instead of on every frame.
let tocGeometry = null;

function measureTocGeometry() {
  if (!toc || !tocEntries.length) return null;
  const tocRect = toc.getBoundingClientRect();
  const dotYs = tocEntries.map(({ link }) => {
    const dot = link.querySelector("span");
    if (!dot) return 0;
    const dotRect = dot.getBoundingClientRect();
    return dotRect.top - tocRect.top + dotRect.height / 2;
  });
  const headingTops = tocEntries.map(({ heading }) => heading.getBoundingClientRect().top + window.scrollY);
  return { dotYs, headingTops };
}

function invalidateTocGeometry() {
  tocGeometry = null;
  requestTocUpdate();
}

function updateTocProgress() {
  if (!toc || !tocEntries.length) return;
  if (!["essay","he-essay","k12-essay"].includes(document.body.dataset.activeMode)) {
    toc.style.setProperty("--toc-progress", "0px");
    tocEntries.forEach(({ link }) => {
      link.classList.remove("is-active", "is-past");
    });
    return;
  }

  if (!tocGeometry) tocGeometry = measureTocGeometry();
  if (!tocGeometry) return;
  const { dotYs, headingTops } = tocGeometry;

  const marker = window.scrollY + Math.min(window.innerHeight * 0.36, 280);
  const positions = headingTops;
  let activeIndex = 0;

  positions.forEach((top, index) => {
    if (top <= marker) {
      activeIndex = index;
    }
  });

  const firstY = dotYs[0];
  const lastY = dotYs[dotYs.length - 1];
  const activeY = dotYs[activeIndex];
  const nextY = dotYs[Math.min(activeIndex + 1, dotYs.length - 1)];
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

function smoothBehavior() {
  return reducedMotion.matches ? "auto" : "smooth";
}

function setMode(mode, shouldScroll = true, push = false) {
  const url = new URL(location.href);
  if (audienceLabels[mode]) url.searchParams.set("audience", mode);
  if (["he-essay","k12-essay"].includes(mode)) url.searchParams.set("audience",mode.replace("-essay",""));
  applyAudience(url.searchParams.get("audience"));
  const previousMode = activeMode;
  activeMode = mode;
  document.body.dataset.activeMode = mode;
  document.body.dataset.readingEssay = String(["essay","he-essay","k12-essay"].includes(mode));
  selectEssayRail(mode);
  buttons.forEach((button) => {
    const active = button.dataset.modeTab === (audienceLabels[mode] || mode === "essay" || mode.endsWith("-essay") ? "overview" : mode);
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
  });
  views.forEach((view) => {
    view.classList.toggle("is-active", view.dataset.mode === mode);
    view.hidden = view.dataset.mode !== mode;
  });
  if (location.hash !== "#" + mode || location.search !== url.search) {
    // User-initiated surface changes push a history entry so Back returns to
    // the previous surface instead of leaving the site.
    if (push) {
      url.hash = mode; history.pushState(null, "", url);
    } else {
      url.hash = mode; history.replaceState(null, "", url);
    }
  }
  if (mode === "workbench") {
    const panel = document.getElementById("panel-workbench");
    const wasDoc = panel && panel.dataset.wbView === "doc";
    if (panel) panel.dataset.wbView = "overview";
    hideNextStep();
    ensureWorkbenchData().catch(() => {});
    if (wasDoc && !shouldScroll) {
      window.requestAnimationFrame(() => {
        // A document route re-claimed the panel before this frame; it owns focus.
        if (panel.dataset.wbView === "doc") return;
        const current = document.querySelector('[data-tool-id][aria-current="true"], [data-concept-id][aria-current="true"]');
        // Concept cards live in a collapsed <details>; open it so the card can take focus.
        const closed = current && current.closest("details:not([open])");
        if (closed) closed.open = true;
        const target = current && current.getClientRects().length ? current : document.getElementById("workbench-title");
        if (target) { scrollElementBelowNav(target, { behavior: "smooth" }); target.focus(); }
      });
    }
  }
  if (shouldScroll) {
    window.scrollTo({ top: 0, behavior: smoothBehavior() });
  }
  if (mode !== previousMode || shouldScroll) {
    trackPackageEvent("Surface Viewed", { surface: mode, label: eventLabelFromMode(mode) });
  }
  invalidateTocGeometry();
}

function scrollElementBelowNav(element, { behavior = "auto", offset = 34 } = {}) {
  const nav = document.querySelector(".package-nav");
  const navBottom = nav ? nav.getBoundingClientRect().bottom : 0;
  const top = element.getBoundingClientRect().top + window.scrollY - navBottom - offset;
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo({ top: Math.max(0, top), behavior: behavior === "smooth" ? smoothBehavior() : behavior });
  root.style.scrollBehavior = previousScrollBehavior;
}

function openDiscussionRoute(route) {
  const claim = document.getElementById(route);
  if (!claim || !claim.classList.contains("discussion-claim")) return false;
  setMode("discuss",false); claim.open = true;
  history.replaceState(null,"","#"+route);
  window.requestAnimationFrame(()=>scrollElementBelowNav(claim));
  return true;
}

function scrollHeadingIntoView(heading) {
  scrollElementBelowNav(heading);
}

function openEssaySection(sectionId, track = true) {
  const heading = document.getElementById(sectionId);
  const edition = heading && heading.closest("[data-mode]");
  if (!edition || !["essay","he-essay","k12-essay"].includes(edition.dataset.mode)) return false;
  setMode(edition.dataset.mode, false);
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
    setMode(button.dataset.modeTab, true, true);
  });
});

// Arrow-key navigation between surface tabs (roving tabindex).
const tablist = document.querySelector('[role="tablist"]');
if (tablist) {
  tablist.addEventListener("keydown", (event) => {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(event.key) || event.ctrlKey || event.metaKey || event.altKey) return;
    event.preventDefault();
    const current = buttons.findIndex((button) => button.getAttribute("aria-selected") === "true");
    let next = current;
    if (event.key === "ArrowLeft") next = (current - 1 + buttons.length) % buttons.length;
    if (event.key === "ArrowRight") next = (current + 1) % buttons.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = buttons.length - 1;
    setMode(buttons[next].dataset.modeTab, true, true);
    buttons[next].focus();
  });
}

modeLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const mode = link.dataset.modeLink;
    if (!modeNames.includes(mode)) return;
    event.preventDefault();
    if (link.dataset.practiceAudience) {
      const url = new URL(location.href); url.searchParams.set("audience",link.dataset.practiceAudience); history.replaceState(null,"",url);
    }
    if (link.dataset.discussionClaim) {
      const url = new URL(location.href); url.searchParams.set("claim",link.dataset.discussionClaim); history.replaceState(null,"",url);
    }
    trackPackageEvent("Package Path Opened", { surface: mode, label: eventLabelFromMode(mode) });
    setMode(mode, true, true);
  });
});

essaySectionLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openEssaySection(link.dataset.essaySectionLink);
  });
});

allTocEntries.forEach(({ link, heading }) => {
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
window.addEventListener("resize", invalidateTocGeometry);
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(invalidateTocGeometry);
}
window.addEventListener("hashchange", () => {
  const rawMode = location.hash.replace("#", "");
  const mode = modeAliases[rawMode] || rawMode;
  if (modeNames.includes(mode)) {
    setMode(mode, false);
    return;
  }
  if (mode.startsWith("discuss-")) { openDiscussionRoute(mode); return; }
  if (mode.startsWith("wb-doc-")) { openWorkbenchRoute(mode); return; }
  if (openEssaySection(mode, false)) {
    return;
  }
  requestTocUpdate();
});

const initialHash = location.hash.replace("#", "");
const initial = modeAliases[initialHash] || initialHash;
if (modeNames.includes(initial)) {
  setMode(initial, false);
} else if (initial.startsWith("discuss-")) {
  openDiscussionRoute(initial);
} else if (initial.startsWith("wb-doc-")) {
  openWorkbenchRoute(initial);
} else if (initial) {
  if (!openEssaySection(initial, false)) setMode("overview", false);
} else {
  setMode("overview", false);
}
requestTocUpdate();

document.querySelectorAll("[data-try]").forEach(container => {
  const form=container.querySelector("[data-try-form]");
  const stages=Array.from(container.querySelectorAll("[data-try-stage]"));
  const fields=Array.from(form.querySelectorAll("textarea"));
  let step=0;
  let record="";
  form.addEventListener("submit",event=>{
    event.preventDefault();
    if (step>=3) return;
    if (!fields[step].value.trim()) {fields[step].setCustomValidity("Add your judgment and a reason before continuing.");fields[step].reportValidity();return;}
    fields[step].readOnly=true;
    stages[step].hidden=true;
    step+=1;
    stages[step].hidden=false;
    if (step<3) {fields[step].disabled=false;fields[step].focus();return;}
    const labels=["Initial judgment","Decision about the contribution","Changed-condition response"];
    const output=container.querySelector("[data-try-record]");
    fields.forEach((field,i)=>{const heading=document.createElement("h4");heading.textContent=labels[i];const p=document.createElement("p");p.textContent=field.value;output.append(heading,p);});
    const caseText="## Case\\n\\n"+stages[0].querySelector("p").textContent+"\\n\\n## Constructed contribution\\n\\n"+stages[1].querySelector("blockquote").textContent+"\\n\\n## Changed condition\\n\\n"+stages[2].querySelector("p").textContent+"\\n\\n";
    record="# Judgment Lab practice record\\n\\nSetting: "+container.dataset.tryAudience+"\\nFictional, scripted practice. Review notes shown after responses. No proficiency assessment.\\n\\n"+caseText+fields.map((field,i)=>"## "+labels[i]+"\\n\\n"+field.value).join("\\n\\n")+"\\n\\nEducator review: pending. Classroom evidence: absent. Further support or prior familiarity: not recorded.\\n";
    stages[step].focus();
  });
  fields.forEach(field=>field.addEventListener("input",()=>field.setCustomValidity("")));
  container.querySelector("[data-try-download]").addEventListener("click",()=>{
    if (!record) return;
    const url=URL.createObjectURL(new Blob([record],{type:"text/markdown;charset=utf-8"}));
    const link=document.createElement("a");link.href=url;link.download="judgment-lab-"+container.dataset.tryAudience+"-practice.md";link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
});

const copyStatus = document.getElementById("copy-status");

function announceCopy(message) {
  if (copyStatus) copyStatus.textContent = message;
}

function copyTextToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    const policy = document.permissionsPolicy || document.featurePolicy;
    if (policy && !policy.allowsFeature("clipboard-write")) return Promise.reject(new Error("clipboard blocked"));
    return new Promise((resolve, reject) => {
      const write = navigator.clipboard.writeText(text);
      // Keep the manual fallback for hung writes; pass the write along so a late success can correct the UI.
      const timeout = window.setTimeout(() => reject(Object.assign(new Error("clipboard timeout"), {pending: write})), 1800);
      write.then(() => { clearTimeout(timeout); resolve(); }, error => { clearTimeout(timeout); reject(error); });
    });
  }
  // Fallback for non-secure contexts, where navigator.clipboard is unavailable.
  return new Promise((resolve, reject) => {
    const scratch = document.createElement("textarea");
    scratch.value = text;
    scratch.setAttribute("readonly", "");
    scratch.style.position = "fixed";
    scratch.style.opacity = "0";
    document.body.appendChild(scratch);
    scratch.select();
    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    }
    scratch.remove();
    if (copied) resolve();
    else reject(new Error("copy command failed"));
  });
}

document.querySelectorAll("[data-copy-target]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copyTarget);
    if (!target) return;
    const original = button.textContent;
    const copyTarget = button.dataset.copyTarget;
    try {
      await copyTextToClipboard(target.textContent);
      button.textContent = "Copied";
      announceCopy("Copied to clipboard.");
      trackPackageEvent("Copy Action", {
        target: copyTarget,
        surface: document.body.dataset.activeMode || activeMode,
      });
      window.setTimeout(() => {
        button.textContent = original;
      }, 1400);
    } catch (error) {
      button.textContent = "Copy failed";
      announceCopy("Copy failed. Select the prompt text and copy it manually.");
      if (error && error.pending) error.pending.then(() => { button.textContent = "Copied"; announceCopy("Copied to clipboard."); }, () => {});
      const block = target.closest("pre");
      if (block) { block.hidden = false; block.style.display = "block"; block.tabIndex = 0; block.focus(); }
      window.setTimeout(() => {
        button.textContent = original;
      }, 1400);
    }
  });
});

async function openWorkbenchRoute(route) {
  setMode("workbench", false);
  history.replaceState(null, "", "#" + route);
  try { await ensureWorkbenchData(); } catch { return; }
  const id = route.replace("wb-doc-", "");
  const tool = workbenchTools.find(item => item.filename === id + ".md");
  const concept = workbenchConcepts.find(item => item.filename === id + ".md");
  if (tool || concept) selectDocument(tool || concept, !tool, false);
  else { const message = document.getElementById("workbench-error"); message.textContent = "That document was not found. Choose a workbench tool below."; message.hidden = false; }
}

function renderWorkbenchDocument(item, isFromConcept = false) {
  document.getElementById("workbench-error").hidden = true;
  const name = item.toolName || item.title;
  const jobHeading = isFromConcept ? "Why these tools work" : (workbenchJobs.find((job) => job.id === item.job) || {}).heading;
  const jobCrumb = document.querySelector("[data-wb-crumb-job]");
  const jobSep = document.querySelector('[data-wb-crumb-sep="job"]');
  if (jobCrumb) { jobCrumb.hidden = !jobHeading; jobCrumb.textContent = jobHeading || ""; }
  if (jobSep) jobSep.hidden = !jobHeading;
  const toolCrumb = document.querySelector("[data-wb-crumb-tool]");
  if (toolCrumb) toolCrumb.textContent = name;
  document.getElementById("selected-tool-title").textContent = name;
  document.getElementById("selected-tool-note").textContent = item.useNote || (isFromConcept ? "Read it here, or download it to share with a colleague." : "");
  document.getElementById("workbench-template").textContent = item.markdown;
  document.getElementById("workbench-doc-view").innerHTML = item.html;
  const glance = document.getElementById("wb-glance");
  const rows = (item.glance || []).map((g) => {
    const row = document.createElement("div");
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = g.label;
    dd.textContent = g.text;
    row.append(dt, dd);
    return row;
  });
  glance.querySelector("dl").replaceChildren(...rows);
  glance.hidden = rows.length === 0;
  const download = document.getElementById("selected-tool-download");
  const basePath = isFromConcept ? "assets/workbench/concepts/" : "assets/workbench/";
  download.href = item.downloadPath || basePath + item.filename;
  download.download = item.filename;
  const nextDownload = document.getElementById("wb-next-download");
  nextDownload.href = download.href;
  nextDownload.download = item.filename;
  // Concept notes are for reading, not running: only Download applies.
  const start = document.querySelector("[data-start-assistant]");
  if (start) start.hidden = isFromConcept;
}

function selectDocument(item, isFromConcept = false, push = true) {
  const route = "#wb-doc-" + item.filename.replace(/\\.md$/, "");
  if (location.hash !== route) { if (push) history.pushState(null, "", route); else history.replaceState(null, "", route); }
  document.querySelectorAll("[data-tool-id], [data-concept-id]").forEach((card) => {
    card.removeAttribute("aria-current");
  });
  const selector = isFromConcept ? '[data-concept-id="' + item.id + '"]' : '[data-tool-id="' + item.id + '"]';
  const card = document.querySelector(selector);
  if (card) card.setAttribute("aria-current", "true");
  selectedWorkbenchFile = item.filename;
  selectedWorkbenchConcept = isFromConcept;
  const panel = document.getElementById("panel-workbench");
  if (panel) panel.dataset.wbView = "doc";
  renderWorkbenchDocument(item,isFromConcept);
  // Announce and reset only on an actual open; audience re-renders stay silent.
  hideNextStep();
  announceCopy("Opened " + (item.toolName || item.title));
  window.requestAnimationFrame(() => {
    // Scroll first so the heading is already near its resting position before
    // focus() runs, so the two don't visibly fight over where to land.
    if (panel) scrollElementBelowNav(panel, { behavior: "smooth" });
    const heading = document.getElementById("selected-tool-title");
    if (heading) heading.focus();
  });
}

// The sticky action bar sits just below the sticky site nav, whose height
// changes with the viewport.
function syncStickyOffsets() {
  const nav = document.querySelector(".package-nav");
  const bar = document.querySelector(".selected-heading");
  document.documentElement.style.setProperty("--wb-nav-h", (nav ? nav.getBoundingClientRect().height : 0) + "px");
  if (bar && bar.offsetHeight) document.documentElement.style.setProperty("--wb-bar-h", bar.offsetHeight + "px");
}
syncStickyOffsets();
if (window.ResizeObserver) {
  const stickyObserver = new ResizeObserver(syncStickyOffsets);
  document.querySelectorAll(".package-nav, .selected-heading").forEach((el) => stickyObserver.observe(el));
} else {
  window.addEventListener("resize", syncStickyOffsets);
}

const pasteInstruction = "Copied. Paste it into a new chat in ChatGPT, Claude, or Gemini.";

// Desktop sticks the whole heading row; phones stick only the actions
// (the heading row becomes display:contents there).
function stickyActionBar() {
  return [".selected-heading", ".selected-heading .tool-actions"]
    .map((q) => document.querySelector(q))
    // display:contents keeps a computed position but has no box, so require geometry.
    .find((el) => el && el.getClientRects().length > 0 && getComputedStyle(el).position === "sticky") || null;
}

function hideNextStep() {
  startAssistantToken++;
  const nextStep = document.getElementById("wb-next-step");
  if (nextStep) nextStep.hidden = true;
}

// After Start: say what to do next, and keep it on screen until the view changes or it is dismissed.
function showNextStep(line, copied) {
  const nextStep = document.getElementById("wb-next-step");
  const lineEl = document.getElementById("wb-next-line");
  nextStep.querySelector("[data-next-lead]").textContent = copied
    ? pasteInstruction
    : "Copying didn't work. Copy the selected line below, then paste it into a new chat in ChatGPT, Claude, or Gemini.";
  lineEl.textContent = line;
  nextStep.hidden = false;
  const rect = nextStep.getBoundingClientRect();
  const bar = stickyActionBar();
  const barBottom = bar ? bar.getBoundingClientRect().bottom : 0;
  if (rect.top < barBottom || rect.bottom > window.innerHeight) {
    // Instant jump (behavior "auto"), so reduced-motion users get no smooth scroll.
    scrollElementBelowNav(nextStep, { offset: (bar ? bar.offsetHeight : 0) + 16 });
  }
  if (!copied) {
    lineEl.focus();
    window.getSelection().selectAllChildren(lineEl);
  }
}

document.querySelector("[data-next-dismiss]").addEventListener("click", () => {
  hideNextStep();
  if (startAssistantButton) startAssistantButton.focus();
});

const startAssistantButton = document.querySelector("[data-start-assistant]");
const startAssistantLabel = startAssistantButton ? startAssistantButton.textContent : "";
let startAssistantClicks = 0;
if (startAssistantButton) {
  startAssistantButton.addEventListener("click", async () => {
    const item = (selectedWorkbenchConcept ? workbenchConcepts : workbenchTools).find((t) => t.filename === selectedWorkbenchFile);
    if (!item) return;
    const token = ++startAssistantToken;
    const click = ++startAssistantClicks;
    // Show a result briefly, then restore the label unless a newer click owns the button.
    const settle = (label) => {
      startAssistantButton.textContent = label;
      window.setTimeout(() => {
        if (click !== startAssistantClicks) return;
        startAssistantButton.textContent = startAssistantLabel;
        startAssistantButton.style.minWidth = "";
      }, 1400);
    };
    // Hold the button's width so "Copied" does not reflow the sticky bar.
    startAssistantButton.style.minWidth = startAssistantButton.offsetWidth + "px";
    const setting = audienceLabels[currentWorkbenchAudience];
    const basePath = selectedWorkbenchConcept
      ? "assets/workbench/concepts/"
      : currentWorkbenchAudience ? "assets/workbench/" + currentWorkbenchAudience + "/" : "assets/workbench/";
    // Use the current origin so preview sessions point the assistant at preview assets.
    const text = "Read " + new URL(basePath + item.filename, location.href).href + " in full and run it with me." + (setting ? " My setting is " + setting + "." : "");
    try {
      await copyTextToClipboard(text);
      settle("Copied");
      trackPackageEvent("Copy Action", { target: "start-assistant", surface: document.body.dataset.activeMode || activeMode });
      // The reader moved on while the copy was in flight: don't reopen a panel for the old view.
      if (token !== startAssistantToken) return;
      showNextStep(text, true);
      announceCopy(pasteInstruction);
    } catch (error) {
      settle("Copy failed");
      if (token !== startAssistantToken) return;
      showNextStep(text, false);
      announceCopy("Copy failed. The line to paste is selected below; copy it manually.");
      if (error && error.pending) error.pending.then(() => {
        if (token !== startAssistantToken) return;
        settle("Copied");
        showNextStep(text, true);
        announceCopy(pasteInstruction);
      }, () => {});
    }
  });
}

document.querySelectorAll("[data-clear-discussion]").forEach(button=>button.addEventListener("click",()=>{
  const url = new URL(location.href); url.searchParams.delete("claim");
  history.replaceState(null,"",url); applyAudience(url.searchParams.get("audience"));
}));

function changeAudience(event) {
  const id = audienceLabels[event.target.value] ? event.target.value : "";
  const url = new URL(location.href);
  if (id) url.searchParams.set("audience",id); else url.searchParams.delete("audience");
  const readingEssay = activeMode === "essay" || activeMode.endsWith("-essay");
  const nextMode = readingEssay ? (id === "he" || id === "k12" ? id+"-essay" : id === "pme" ? "essay" : "overview") : activeMode === "overview" || audienceLabels[activeMode] ? id || "overview" : activeMode;
  if (nextMode !== activeMode) url.hash = nextMode;
  history.pushState(null,"",url);
  // A panel copied for the previous audience would point at the wrong file.
  hideNextStep();
  if (nextMode !== activeMode) setMode(nextMode,false); else applyAudience(id);
}
document.getElementById("lab-audience").addEventListener("change",changeAudience);
window.addEventListener("popstate",()=>{
  const id = new URL(location.href).searchParams.get("audience");
  if ((audienceLabels[id] ? id : "") !== currentWorkbenchAudience) hideNextStep();
  applyAudience(id);
});

document.querySelectorAll("[data-tool-id]").forEach((button) => {
  button.addEventListener("click", async () => {
    try {
      await ensureWorkbenchData();
    } catch {
      return;
    }
    const tool = workbenchTools.find((item) => item.id === button.dataset.toolId);
    if (!tool) return;
    trackPackageEvent("Workbench Tool Selected", { tool_id: tool.id, tool_title: tool.title });
    selectDocument(tool, false);
  });
});

document.querySelectorAll("[data-concept-id]").forEach((button) => {
  button.addEventListener("click", async () => {
    try {
      await ensureWorkbenchData();
    } catch {
      return;
    }
    const concept = workbenchConcepts.find((item) => item.id === button.dataset.conceptId);
    if (!concept) return;
    trackPackageEvent("Workbench Concept Selected", { concept_id: concept.id, concept_title: concept.title });
    selectDocument(concept, true);
  });
});

document.addEventListener("click", async (event) => {
  const link = event.target.closest("[data-wb-link]");
  if (!link) return;
  event.preventDefault();
  try {
    await ensureWorkbenchData();
  } catch {
    return;
  }
  if (link.getAttribute("href") === "#workbench-progression") { scrollElementBelowNav(document.getElementById("workbench-progression")); return; }
  const id = link.getAttribute("href").replace("#wb-doc-", "");
  const toolDoc = workbenchTools.find((tool) => tool.filename === \`\${id}.md\`);
  const conceptDoc = workbenchConcepts.find((note) => note.id === id || note.filename === \`\${id}.md\`);
  if (toolDoc) {
    const button = document.querySelector(\`[data-tool-id="\${toolDoc.id}"]\`);
    if (button) button.click(); else selectDocument(toolDoc, false);
  } else if (conceptDoc) {
    const button = document.querySelector(\`[data-concept-id="\${conceptDoc.id}"]\`);
    if (button) button.click(); else selectDocument(conceptDoc, true);
  }
});

document.querySelectorAll("a[download]").forEach((link) => {
  link.addEventListener("click", () => {
    const href = link.getAttribute("href") || "";
    let asset = "other";
    if (href.endsWith(".pdf")) asset = "essay_pdf";
    if (href.endsWith("${companionContextFilename}")) asset = "companion_context";
    if (href.includes("/workbench/concepts/")) asset = "workbench_concept";
    else if (href.includes("/workbench/")) asset = "workbench_template";
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
  return `[data-workbench-audience][hidden] {display:none;}
[data-workbench-audience] details {margin:20px 0;}
[data-workbench-audience] summary {cursor:pointer;text-decoration:underline;text-underline-offset:4px;}
.audience-matrix {overflow-x:auto;}
.audience-matrix table {min-width:650px;}
.audience-nav {display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:12px 24px; padding:16px 24px; border-bottom:1px solid var(--faint); font-family:var(--font-mono); font-size:13px;}
.audience-nav a {padding:7px 3px; text-underline-offset:6px;}
.audience-nav [aria-current] {color:var(--red); text-decoration-thickness:2px;}
.audience-paths {margin:36px 0; border-top:1px solid var(--faint);}
.audience-path {display:grid; grid-template-columns:1fr 1.2fr; gap:6px 28px; padding:25px 0; border-bottom:1px solid var(--faint); text-decoration:none;}
.audience-path h2 {font-size:28px; margin:0; font-family:var(--font-display);}
.audience-path p {margin:0; font-size:23px; color:var(--ink);}
.audience-path span {grid-column:2; max-width:65ch;}
.audience-path strong {grid-column:2; font-size:16px; color:var(--red); font-weight:500; margin-top:8px;}
.audience-path:hover h2 {text-decoration:underline; text-underline-offset:5px;}
.audience-guide,.foundation-detail {max-width:75ch; margin:32px auto;}
.foundation-detail summary {cursor:pointer; padding:16px 0; color:var(--ink);}
[hidden] {display:none !important;}
@media(max-width:640px) {.audience-path {grid-template-columns:1fr;}.audience-path span,.audience-path strong {grid-column:1;}.audience-nav {gap:6px 14px;padding:10px 16px;}.audience-nav>span {width:100%;text-align:center;}}
:root {
  --paper: #f6f1e8;
  --paper-soft: #fbf8f2;
  --paper-bright: #fffdfa;
  --ink: #0a2242;
  --ink-soft: #39404a;
  --body: #242a31;
  --muted: #4d5360;
  --stone: #5b564f;
  --stone-faint: #847d74;
  --faint: #d7d0c4;
  --rail: #c9c5c0;
  --navy-wash: rgba(8, 35, 70, 0.055);
  --navy-band: rgba(8, 35, 70, 0.045);
  --navy-line: rgba(8, 35, 70, 0.1);
  --navy-soft: rgba(8, 35, 70, 0.1);
  --navy-hairline: rgba(8, 35, 70, 0.12);
  --navy-divider: rgba(8, 35, 70, 0.14);
  --navy-border: rgba(8, 35, 70, 0.15);
  --code-bg: #211f1e;
  --code-ink: #fffaf1;
  --red: #b81b2b;
  --font-display: "Source Serif 4", Georgia, serif;
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

::selection {
  background: var(--ink);
  color: var(--paper);
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

:focus-visible {
  outline: 2px solid var(--ink);
  outline-offset: 2px;
}

.copy-block,
.template-rendered {
  scrollbar-width: thin;
  scrollbar-color: var(--stone-faint) transparent;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  button,
  a,
  .toc a,
  .toc a span,
  .toc::after {
    transition: none;
  }

  button:active,
  a:active {
    transform: none;
  }
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
  padding: 13px 0;
}

.package-tabs {
  display: flex;
  gap: 5px;
  padding: 4px;
  background: var(--navy-wash);
}

.package-tabs button {
  position: relative;
  min-height: 44px;
  border: 0;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  padding: 12px 13px;
  font-family: var(--font-mono);
  font-size: 12px;
}

.package-tabs button[aria-selected="true"] {
  background: var(--navy-soft);
  color: var(--ink);
}

.package-tabs button[aria-selected="true"]::after {
  content: "";
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 5px;
  height: 2px;
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

body:not([data-reading-essay="true"]) .site-shell {
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

.published,
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

.surface-hero > p,
.overview-hero > p {
  max-width: 740px;
  color: var(--body);
  font-size: 18px;
  line-height: 1.58;
}

.surface-hero .helper-note {
  margin-top: 14px;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.5;
}

.dek {
  max-width: 780px;
  margin: 18px 0 22px;
  color: var(--muted);
  font-size: clamp(22px, 2.4vw, 30px);
  line-height: 1.32;
}

.section-title {
  margin: 0 0 18px;
  font-size: 30px;
}

.door-question {
  margin: 34px 0 14px;
  font-size: 24px;
}

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

.tool-card[aria-current="true"] {
  border-color: rgba(184, 27, 43, 0.42);
  background: var(--paper-bright);
}

/* Hover only where a pointer can hover, so a tap never leaves a stuck state. */
@media (hover: hover) {
  .tool-card:hover,
  .prompt-card:hover,
  .mini-card:hover {
    border-color: rgba(184, 27, 43, 0.42);
    background: var(--paper-bright);
  }
}

.tool-title,
.prompt-card h3,
.mini-card h3 {
  color: var(--ink);
  font-family: var(--font-display);
  font-size: 25px;
  line-height: 1.08;
}

.tool-desc,
.prompt-card p,
.mini-card p {
  color: var(--muted);
  font-size: 15px;
  line-height: 1.38;
}

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
  border: 1px solid var(--navy-line);
  background: var(--navy-band);
}

.band-label {
  margin: 0 0 8px;
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  line-height: 1.3;
  text-transform: uppercase;
}

.detail-band > p:not(.band-label) {
  color: var(--ink-soft);
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
  min-height: 44px;
  border: 1px solid rgba(8, 35, 70, 0.2);
  background: var(--paper-soft);
  color: var(--ink);
  cursor: pointer;
  font-size: 11px;
  padding: 0 14px;
  text-decoration: none;
}

.copy-button.primary {
  border-color: var(--ink);
  background: var(--ink);
  color: var(--paper);
}

@media (hover: hover) {
  .copy-button:hover,
  .quiet-action:hover {
    border-color: var(--red);
  }
}

.link-style {
  display: block;
  min-height: auto;
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 18px 0 10px;
}

.setup-panel,
.capability-section,
.starter-section,
.selected-tool {
  margin-top: 30px;
  padding-top: 18px;
  border-top: 1px solid var(--navy-divider);
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
  border: 1px solid var(--navy-hairline);
  background: var(--navy-wash);
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
  min-height: 176px;
}

.prompt-card .copy-block {
  display: none;
}

.source-spine {
  max-width: 900px;
  border-top: 1px solid var(--navy-divider);
  padding-top: 10px;
}

.source-spine.article-body h2 {
  margin: 30px 0 10px;
  padding-top: 20px;
  border-top: 1px solid var(--navy-divider);
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

#panel-workbench[data-wb-view="doc"] .wb-overview {
  display: none;
}

#panel-workbench[data-wb-view="overview"] .wb-doc {
  display: none;
}

/* Font, size, colour, and spacing come from lab-refresh.css. */
.wb-breadcrumb {
  letter-spacing: 0.02em;
}

.wb-breadcrumb a {
  text-decoration: underline;
  text-underline-offset: 3px;
}

@media (hover: hover) {
  .wb-breadcrumb a:hover {
    color: var(--red);
  }
}

.wb-crumb-sep {
  color: var(--muted);
}

#workbench-doc-view {
  max-width: 57ch;
}

/* Programmatic focus (route-change heading, card returned to) doesn't reliably
   trigger :focus-visible, so give these an explicit, visible ring rather than
   leaving them silently unfocused-looking. */
#workbench-title:focus,
.tool-card:focus {
  outline: 2px solid var(--ink);
  outline-offset: 3px;
}

/* The doc heading takes focus on every open so screen readers land on it. It is
   not keyboard-reachable (tabindex -1) and sits in the sticky bar, so it draws no
   ring: one would linger there and compete with the What you'll do card. */
#selected-tool-title:focus {
  outline: none;
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

.template-rendered {
  padding: 20px 24px;
  background: var(--paper-soft);
  border: 1px solid var(--navy-hairline);
}

.template-rendered table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92em;
}

.template-rendered th,
.template-rendered td {
  border: 1px solid var(--navy-border);
  padding: 6px 10px;
  text-align: left;
}

.template-rendered blockquote {
  margin: 12px 0;
  padding: 8px 16px;
  border: 1px solid var(--navy-line);
  background: var(--navy-band);
}

.use-note {
  border: 1px solid var(--navy-line);
  background: var(--navy-band);
  padding: 18px;
}

.use-note p:last-child {
  color: var(--ink-soft);
  font-size: 15px;
  line-height: 1.45;
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

.toc[hidden] {display:none;}

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

body:not([data-reading-essay="true"]) .toc {
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
  background: var(--rail);
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
}

.toc a {
  position: relative;
  z-index: 1;
  display: block;
  min-height: 31px;
  margin: 0 0 15px;
  padding: 0 0 0 34px;
  color: var(--stone);
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
  border: 1px solid var(--stone-faint);
  border-radius: 50%;
  background: var(--paper);
  transition: background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
}

.toc a.is-active,
.toc a.is-past {
  color: var(--ink);
}

.toc a.is-active {
  font-weight: 600;
}

@media (hover: hover) {
  .toc a:hover {
    color: var(--ink);
  }
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
  overflow-wrap: break-word;
}

.article-body ul,
.article-body ol {
  margin: 0 0 26px;
  padding-left: 24px;
}

.article-body li {
  margin: 8px 0;
  overflow-wrap: break-word;
}

.article-body a {
  color: var(--ink);
  text-decoration-color: rgba(184, 27, 43, 0.5);
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
  background: var(--code-bg);
  color: var(--code-ink);
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
  background: linear-gradient(90deg, rgba(8, 35, 70, 0.06), rgba(8, 35, 70, 0.025));
  color: var(--body);
}

/* Argument inserts open with the site's horizontal ink-and-red rule signature
   (see .nwc-rule) rather than a colored side tab. */
.argument-insert::before {
  content: "";
  display: block;
  height: 2px;
  background: linear-gradient(90deg, var(--ink) 0, var(--ink) 78px, var(--red) 78px, var(--red) 106px, transparent 106px);
}

.pull-quote {
  padding: 18px 24px 20px;
}

.pull-quote p {
  max-width: 690px;
  margin: 0;
  color: var(--ink);
  font-family: var(--font-body);
  font-size: clamp(22px, 2.2vw, 28px);
  font-style: italic;
  line-height: 1.3;
}

.insert-label {
  margin: 0;
  padding: 12px 18px 10px;
  border-bottom: 1px solid var(--navy-line);
  color: var(--red);
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1.25;
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
  border-bottom: 1px solid var(--navy-line);
  padding: 13px 14px;
  text-align: left;
  vertical-align: top;
}

.argument-table th {
  color: var(--ink);
  font-weight: 600;
}

.argument-table td {
  color: var(--ink-soft);
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
  border-bottom: 1px solid var(--navy-line);
}

.friction-grid > div {
  padding: 17px 18px 16px;
}

.friction-grid > div:first-child {
  border-right: 1px solid var(--navy-line);
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
  color: var(--ink-soft);
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

/* The insert's opening rule (::before) must span the full grid row, not sit
   in the first cell. */
.closing-standard::before {
  grid-column: 1 / -1;
}

.closing-standard p {
  margin: 0;
  min-height: 96px;
  border-right: 1px solid var(--navy-line);
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
  border-right: 1px solid var(--navy-line);
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

.door-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 14px;
  margin-top: 8px;
}

.door {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--navy-border);
  background: var(--paper-soft);
  padding: 20px;
}

.door h3 {
  margin: 0 0 6px;
  font-size: 21px;
  line-height: 1.15;
}

.door p {
  margin: 0 0 16px;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.45;
}

.door .action-row {
  margin-top: auto;
}

.visual-status {
  margin-top: 8px;
  color: var(--muted);
  font-size: 15px;
}

.progression-visual {
  display: block;
  width: 100%;
  height: auto;
  margin-top: 12px;
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
  body:not([data-reading-essay="true"]) .site-shell {
    display: block;
    max-width: 900px;
    padding: 22px 18px 86px;
  }

  .toc {
    display: none;
  }

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
    border-bottom: 1px solid var(--navy-line);
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
    border-bottom: 1px solid var(--navy-line);
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
}
${readFileSync(join(root,"styles/lab-refresh.css"),"utf8")}
${readFileSync(join(root,"styles/reel.css"),"utf8")}`;
}
