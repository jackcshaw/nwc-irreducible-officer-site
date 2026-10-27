import { readFileSync } from "node:fs";
import { join } from "node:path";
import vm from "node:vm";

// The open call for collaborators: one page, one form, the ways into it, and
// the public roster that lists only people who agreed separately.
const root = process.cwd();
const html = readFileSync(join(root, "dist", "index.html"), "utf8");
const { endpoint } = JSON.parse(readFileSync(join(root, "content", "collaborate.json"), "utf8"));
const roster = JSON.parse(readFileSync(join(root, "content", "collaborators.json"), "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
const section = (mode) => {
  const start = html.indexOf(`data-mode="${mode}"`);
  assert(start > -1, `the ${mode} page should be built`);
  const end = html.indexOf('<section class="mode-view"', start + 10);
  return html.slice(start, end > -1 ? end : html.indexOf("</main>", start));
};
const escapeHtml = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Configuration: the endpoint is empty until the web app is deployed, then its /exec URL.
assert(endpoint === "" || /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(endpoint), `content/collaborate.json endpoint should be empty or an Apps Script /exec URL (${endpoint})`);
assert(Array.isArray(roster), "content/collaborators.json should be an array");

// The page is a region outside the five primary paths, which stay as they are.
const call = section("collaborate");
assert(/<section class="mode-view" data-mode="collaborate" id="panel-collaborate" role="region" aria-label="Open call for collaborators"/.test(html), "the open call should be a page region, not a tab");
assert((html.match(/role="tab"/g) || []).length === 5, "the five primary paths should be unchanged");
assert(/const modeNames = \[[^\]]*"collaborate"/.test(html), "#collaborate should be a routable page");
assert(call.includes("<h1>Help keep human judgment at the forefront of AI</h1>"), "the page should lead with the mission");
for (const way of ["Pilot with learners", "Contribute cases", "Design teaching materials", "Review the evidence"]) {
  assert(call.includes(way), `the call should describe "${way}"`);
}
assert(call.includes('href="mailto:jshaw@comprendo.com"'), "the call should offer direct email");
for (const promise of ["reply by email", "private Judgment Lab list", "mailing list", "without asking first", "To be removed"]) {
  assert(call.includes(promise), `the call should state what happens to a sign-up ("${promise}")`);
}

// One form, posting to the web app (or, before it is configured, to email).
const form = (call.match(/<form[^>]*data-collaborate-form[^>]*>/) || [])[0];
assert(form, "the call should have the sign-up form");
assert(form.includes('method="post"'), "the form should post");
assert(form.includes(`data-endpoint="${endpoint}"`), "the form should carry the configured endpoint");
assert(form.includes(`action="${endpoint || "mailto:jshaw@comprendo.com"}"`), "without JavaScript the form should still reach the list (or email)");
assert((html.match(/<form[^>]*data-collaborate-form/g) || []).length === 1, "there should be exactly one sign-up form on the site");
const field = (pattern, message) => assert(pattern.test(call), message);
field(/<input[^>]*name="name"[^>]*required/, "name is required");
field(/<input[^>]*type="email"[^>]*name="email"[^>]*required/, "email is required and typed");
field(/<select[^>]*name="setting"[^>]*required/, "setting is required");
for (const value of ["pme", "he", "k12", "business", "other"]) field(new RegExp(`<option value="${value}"`), `setting offers ${value}`);
for (const setting of ["pme", "he", "k12", "business"]) field(new RegExp(`<li class="setting-${setting}">`), `the hero names the ${setting} setting`);
field(/<input[^>]*name="role"[^>]*maxlength="160"/, "role and institution is optional and bounded");
for (const value of ["pilot", "cases", "design", "evidence"]) field(new RegExp(`<input type="checkbox" name="ways" value="${value}"`), `ways to collaborate offers ${value}`);
field(/<textarea[^>]*name="note"[^>]*maxlength="1500"/, "the practice or question is optional and bounded");
field(/<input type="checkbox" name="listing" value="yes"(?![^>]*checked)/, "public listing is an unticked opt-in");
field(/<input type="checkbox" name="newsletter" value="yes"(?![^>]*checked)[^>]*>\s*<label[^>]*>Send me the Judgment Lab newsletter/, "the newsletter is an unticked opt-in");
field(/aria-hidden="true"[^>]*>[\s\S]{0,200}<input[^>]*name="website"[^>]*tabindex="-1"[^>]*autocomplete="off"/, "the honeypot is hidden from people and assistive technology");
for (const id of [...call.matchAll(/<(?:input|select|textarea)[^>]*\bid="([^"]+)"/g)].map((m) => m[1])) {
  if (id === "collaborate-website") continue;
  assert(call.includes(`for="${id}"`), `#${id} should have a label`);
}
assert(/data-collaborate-success[^>]*hidden/.test(call) && call.includes("Thanks."), "a hidden confirmation waits for a successful sign-up");
assert(/data-collaborate-fallback[^>]*hidden/.test(call) && /data-collaborate-mailto/.test(call), "a hidden email fallback waits for a failed sign-up");

// The form and the web app agree: every option the form offers, at the form's own
// length limits, is accepted by the web app's validation.
const webApp = vm.createContext({});
vm.runInContext(readFileSync(join(root, "apps-script", "collaborators", "Code.gs"), "utf8"), webApp);
const maxlength = (name) => Number((call.match(new RegExp(`<(?:input|textarea)[^>]*name="${name}"[^>]*maxlength="(\\d+)"`)) || [])[1]);
const settingValues = [...call.matchAll(/<option value="([a-z0-9]+)"/g)].map((m) => m[1]);
const wayValues = [...call.matchAll(/<input type="checkbox" name="ways" value="([a-z]+)"/g)].map((m) => m[1]);
for (const setting of settingValues) {
  const params = { name: "n".repeat(maxlength("name")), email: "ada@example.org", setting, role: "r".repeat(maxlength("role")), note: "x".repeat(maxlength("note")) };
  const checked = webApp.validateSubmission_(params, { ways: wayValues });
  assert(checked.ok, `the web app should accept setting "${setting}" at the form's length limits (${JSON.stringify(checked.errors)})`);
  assert(checked.record.ways.split("; ").length === wayValues.length, "the web app should accept every way the form offers");
}

// The ways in: masthead and footer on every page, the home page, and Discuss.
const masthead = html.slice(html.indexOf('<header class="lab-masthead"'), html.indexOf("</header>"));
assert(masthead.includes('href="#collaborate"'), "the masthead should link to the open call");
const footer = html.slice(html.indexOf('<footer class="lab-footer"'), html.indexOf("</footer>"));
assert(footer.includes('href="#collaborate"'), "the footer should link to the open call");
const home = section("overview");
assert(/<section class="testing-note">[\s\S]*?href="#collaborate"[\s\S]*?<\/section>/.test(home), "the home page's testing section should open the call");
assert(home.includes("Open Judgment in Practice →"), "the home page's Discuss card keeps its own purpose");
const strip = home.indexOf('class="open-call-strip"');
assert(strip > -1 && strip < home.indexOf('class="setting-chooser-band"') && /class="open-call-strip"[\s\S]*?href="#collaborate"/.test(home), "the home page should offer the call near the top, before the settings");
assert(/<section class="learning-paths"[\s\S]*?href="#collaborate"[\s\S]*?<h2>Collaborate<\/h2>/.test(home), "Ways to use the Lab should include Collaborate");
assert(!/not proven curricula/.test(call), "the call should open with what it asks, not a contrast");
assert(call.includes('href="https://gaidfly.com"'), "the call should link GAiDFLY for practising a defense out loud");
const discuss = section("discuss");
assert(discuss.includes('href="#collaborate"'), "the Discuss invitation should open the same form");
assert(!/Join by email|subject=Join%20the%20Judgment%20Lab%20conversation/.test(discuss), "the email-only sign-up is superseded by the form");
assert(discuss.includes('href="mailto:jshaw@comprendo.com"'), "Discuss keeps direct email as a fallback");
assert(discuss.includes('href="https://maven.com/p/7b4117"') && discuss.includes("coming soon"), "the Maven session keeps its official link and dated status");

// The public roster lists only the curated file, and is absent while it is empty.
const rosterSection = (call.match(/<section[^>]*data-collaborators[\s\S]*?<\/section>/) || [])[0];
if (roster.length === 0) {
  assert(!rosterSection, "an empty roster should not render");
} else {
  assert(rosterSection, "the roster should render once it has entries");
  for (const person of roster) assert(rosterSection.includes(escapeHtml(person.name)), `the roster should list ${person.name}`);
}

console.log(`collaborate contract passed: one form, ${endpoint ? "live endpoint" : "no endpoint yet"}, four entry points, roster of ${roster.length}`);
