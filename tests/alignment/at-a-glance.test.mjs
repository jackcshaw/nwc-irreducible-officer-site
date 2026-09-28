import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { extractAtAGlance, collapseFacilitation } from "../../scripts/at-a-glance.mjs";

const good = "# T\n\nIntro.\n\n## At a glance\n\n- **You bring:** A.\n- **You do:** B.\n- **You get:** C.\n\n## Audience and readiness\n\nX\n";
const { glance, body } = extractAtAGlance(good, "t.md");
assert.deepEqual(glance, [{ label: "You bring", text: "A." }, { label: "You do", text: "B." }, { label: "You get", text: "C." }]);
assert(!body.includes("At a glance") && body.includes("## Audience and readiness"), "body drops only the section");
assert.throws(() => extractAtAGlance("# T\n\n## Audience and readiness\n", "t.md"), /t\.md: missing "## At a glance"/);
assert.throws(() => extractAtAGlance(good.replace("You do", "You make"), "t.md"), /line 2 must start "- \*\*You do:\*\*"/);
assert.throws(() => extractAtAGlance(good.replace("- **You get:** C.\n", ""), "t.md"), /exactly three bullets/);
assert.throws(() => extractAtAGlance(good.replace("A.", "A **bold** claim."), "t.md"), /plain text/);
assert.throws(() => extractAtAGlance(good.replace("## Audience and readiness", "## Other\n\n## Audience and readiness"), "t.md"), /directly before "## Audience and readiness"/);

const html = '<p>Intro</p>\n<h2 id="ai-facilitation-block">AI Facilitation Block</h2>\n<p>Say hi.</p>\n<h2 id="next">Next</h2>\n<p>After</p>';
const wrapped = collapseFacilitation(html, "t.md");
assert(wrapped.startsWith('<details class="assistant-script"><summary><span class="script-label">What your assistant will do <span class="script-tag">AI Facilitation Block</span></span></summary>\n<p>Say hi.</p>\n</details>'), "the assistant's script leads the document, right under the card, tagged with the template's section name: " + wrapped);
assert(wrapped.includes("<p>Intro</p>") && wrapped.indexOf("<p>Intro</p>") > wrapped.indexOf("</details>"), "the intro follows the script");
assert(wrapped.includes('<h2 id="next">Next</h2>') && !wrapped.includes('<details class="assistant-script" open'));
assert.throws(() => collapseFacilitation("<p>none</p>", "t.md"), /t\.md: no AI Facilitation Block/);

const workbench = process.env.WORKBENCH_REPO_PATH || join(process.cwd(), "../workbench");
const files = readdirSync(join(workbench, "templates")).filter(f => f.endsWith(".md"));
assert.equal(files.length, 10, "expected ten templates");
for (const f of files) extractAtAGlance(readFileSync(join(workbench, "templates", f), "utf8"), `templates/${f}`);

const data = JSON.parse(readFileSync(join(process.cwd(), "dist/assets/workbench-data.json"), "utf8"));
const sets = [["shared", data.tools], ...Object.entries(data.audiences).map(([id, v]) => [id, v.tools])];
for (const [who, tools] of sets) {
  for (const t of tools) {
    const where = `${who}/${t.filename}`;
    assert.deepEqual(t.glance?.map(g => g.label), ["You bring", "You do", "You get"], `${where}: glance missing`);
    const source = extractAtAGlance(readFileSync(join(workbench, "templates", t.filename), "utf8"), t.filename).glance;
    assert.deepEqual(t.glance, source, `${where}: card text differs from the template`);
    assert(!t.html.includes("You bring:"), `${where}: At a glance rendered twice`);
    assert.equal((t.html.match(/<details class="assistant-script">/g) || []).length, 1, `${where}: script not collapsed once`);
    assert(t.markdown.includes("## At a glance") && t.markdown.includes("## AI Facilitation Block"), `${where}: markdown lost a section`);
  }
}
for (const f of files) {
  const shipped = readFileSync(join(process.cwd(), "dist/assets/workbench", f), "utf8");
  assert(shipped.includes("## At a glance") && shipped.includes("## AI Facilitation Block"), `download ${f} lost a section`);
}
const bundle = readFileSync(join(process.cwd(), "dist/assets/workbench-context.md"), "utf8");
assert(bundle.includes("## At a glance"), "context bundle lost At a glance");
console.log(`at a glance passed: module and ${files.length} templates`);
