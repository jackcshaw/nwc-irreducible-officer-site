import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
const root = process.cwd();
const companion = process.env.COMPANION_REPO_PATH || join(root, "../companion");
const workbench = process.env.WORKBENCH_REPO_PATH || join(root, "../workbench");
const doc = readFileSync(join(companion, "artifacts/frame-first-assignment-design.md"), "utf8");
const tpl = readFileSync(join(workbench, "templates/frame-check.md"), "utf8");

const section = (md, title) => {
  const m = md.match(new RegExp(`^## ${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\n([\\s\\S]*?)(?=^## |(?![\\s\\S]))`, "m"));
  assert(m, `Missing section "## ${title}"`);
  return m[1];
};
const tests = md => section(md, "The five tests").split(/^### /m).slice(1).map(t => ({
  name: t.split("\n")[0].trim(),
  ask: (t.match(/^- \*\*Ask:\*\* (.+)$/m) || [])[1],
  fails: (t.match(/^- \*\*Fails when:\*\* (.+)$/m) || [])[1],
}));
const bullets = md => section(md, "Grading a defended frame").split("\n").filter(l => l.startsWith("- "));
const steps = md => section(md, "Frame Check workflow").split("\n").filter(l => /^\d\. /.test(l));
const out = (item) => `Frame Check out of sync: ${item} — change templates/frame-check.md to match artifacts/frame-first-assignment-design.md (companion is the source of truth)`;

assert.equal(tests(doc).length, 5, "Companion should define five tests");
assert.deepEqual(tests(tpl), tests(doc), out("the five tests (name, Ask, or Fails when)"));
assert.deepEqual(bullets(tpl), bullets(doc), out("defended-frame rubric bullets"));
assert.deepEqual(steps(tpl), steps(doc), out("workflow steps"));
assert.equal(steps(doc).length, 6, "Companion workflow should have six steps");

// Primer ratings must match the calibration table row whose first cell starts with the example name.
const rows = section(doc, "Calibration set").split("\n").filter(l => l.startsWith("| ") && !l.startsWith("| Example") && !l.startsWith("| ---"))
  .map(l => l.slice(2, -2).split(" | "));
const examples = [...section(tpl, "Calibration primer").matchAll(/^\*\*(?:Weak|Strong) example — (.+?)\.?\*\*[\s\S]*?^Ratings: (.+)$/gm)];
assert.equal(examples.length, 6, "Template primer should hold six examples (a weak and a strong pair per audience)");
for (const [, name, ratings] of examples) {
  const row = rows.find(r => r[0].startsWith(name));
  assert(row, out(`primer example "${name}" has no calibration row`));
  const expected = row.slice(1, 6).map((c, i) => `${i + 1} ${c.split(":")[0].trim()}`).join(" · ");
  assert.equal(ratings.trim(), expected, out(`ratings for "${name}"`));
}
console.log("frame check sync passed: tests, rubric, workflow, and 6 primer ratings match the companion");
