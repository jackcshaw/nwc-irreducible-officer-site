import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
const root = process.cwd();
const workbench = process.env.WORKBENCH_REPO_PATH || join(root, "../workbench");
const profiles = JSON.parse(readFileSync(join(workbench, "audiences/profiles.json"), "utf8"));
const scripts = ["scripts/build-site.mjs", "scripts/workbench-audiences.mjs"].map(f => readFileSync(join(root, f), "utf8")).join("\n");
// Only rendered markup counts: embedded script data must not satisfy "is on the page".
const html = readFileSync(join(root, "dist/index.html"), "utf8").replace(/<script\b[\s\S]*?<\/script>/gi, " ");
const wbData = JSON.parse(readFileSync(join(root, "dist/assets/workbench-data.json"), "utf8"));
// Short labels ("Frame", "PME") legitimately appear in code; only sentences prove duplication.
const sentence = s => s.length > 25;

for (const p of profiles) {
  assert(p.practice && p.assessment, `profiles.json ${p.id}: practice and assessment are required`);
  for (const [k, v] of Object.entries(p.practice)) {
    assert(html.includes(v), `${p.id} practice.${k} is not on the page`);
    if (sentence(v)) assert(!scripts.includes(v), `${p.id} practice.${k} is duplicated in a site script; read it from profiles.json`);
  }
  const rubric = wbData.audiences[p.id].tools.find(t => t.id === "assessment").markdown;
  for (const v of [...p.assessment.rows.flat(), ...p.assessment.questions, ...p.assessment.descriptors]) {
    assert(rubric.includes(v), `${p.id} assessment text missing from the rubric: ${v.slice(0, 60)}`);
    if (sentence(v)) assert(!scripts.includes(v), `${p.id} assessment text is duplicated in a site script: ${v.slice(0, 60)}`);
  }
}
console.log("single source passed: practice and rubric text come only from profiles.json");

// Failure-mode table copy has one owner; new script modules cannot reintroduce it.
const companion = process.env.COMPANION_REPO_PATH || join(root, "../companion");
const failureModes = JSON.parse(readFileSync(join(companion, "audiences/failure-modes.json"), "utf8"));
const siteScripts = readdirSync(join(root, "scripts"), {recursive: true})
  .filter(f => /\.m?js$/.test(f))
  .map(f => readFileSync(join(root, "scripts", f), "utf8")).join("\n");
for (const row of failureModes) {
  for (const key of ["whatGoesWrong", "check"]) {
    const value = row[key];
    assert(!siteScripts.includes(value) && !siteScripts.includes(JSON.stringify(value).slice(1, -1)),
      `${row.slug}.${key} is duplicated in a site script; read the companion rows`);
  }
}
console.log("single source passed: failure-mode table copy comes from the companion");
