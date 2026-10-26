import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { createHash } from "node:crypto";

// Runs the collaborator sign-up web app (apps-script/collaborators/Code.gs) in
// a VM with stand-ins for the Google services it uses.
const code = readFileSync(new URL("../../apps-script/collaborators/Code.gs", import.meta.url), "utf8");

function makeEnv({ sheetId = "sheet-123", mailFails = false, quota = 100, lockFree = true, tabMissing = false } = {}) {
  const props = new Map(sheetId ? [["SHEET_ID", sheetId]] : []);
  const rows = [];
  const mails = [];
  const cache = new Map();
  const created = [];
  const sheet = {
    name: "Sheet1",
    frozen: 0,
    // Rows come from the VM's realm; copy them into this one for deepEqual.
    appendRow(row) { rows.push(Array.from(row)); },
    getLastRow() { return rows.length + 1; }, // row 1 is the header written by setup()
    getRange(row, column) { return { setValue(value) { rows[row - 2][column - 1] = value; } }; },
    setName(name) { this.name = name; },
    setFrozenRows(n) { this.frozen = n; },
  };
  const book = { getId: () => "sheet-123", getSheets: () => [sheet], getSheetByName: (name) => (!tabMissing && name === sheet.name ? sheet : null) };
  const context = {
    console: { log() {}, error() {} },
    PropertiesService: { getScriptProperties: () => ({ getProperty: (k) => props.get(k) ?? null, setProperty: (k, v) => props.set(k, v) }) },
    SpreadsheetApp: {
      create(title) { created.push(title); return book; },
      openById(id) { if (id !== "sheet-123") throw new Error("no such sheet"); return book; },
    },
    MailApp: {
      sendEmail(message) { if (mailFails) throw new Error("quota"); mails.push(message); },
      getRemainingDailyQuota: () => quota,
    },
    LockService: { getScriptLock: () => ({ tryLock: () => lockFree, releaseLock() {} }) },
    Utilities: {
      DigestAlgorithm: { SHA_256: "sha256" },
      computeDigest: (algorithm, value) => Array.from(createHash(algorithm).update(value).digest()),
      base64EncodeWebSafe: (bytes) => Buffer.from(bytes).toString("base64url"),
    },
    CacheService: { getScriptCache: () => ({ get: (k) => cache.get(k) ?? null, put: (k, v) => cache.set(k, v) }) },
    ContentService: {
      MimeType: { JSON: "application/json" },
      createTextOutput: (content) => ({ content, mime: null, setMimeType(m) { this.mime = m; return this; } }),
    },
    HtmlService: { createHtmlOutput: (html) => ({ html, title: "", setTitle(t) { this.title = t; return this; } }) },
  };
  vm.createContext(context);
  vm.runInContext(code, context);
  if (sheetId) sheet.name = "Sign-ups";
  const post = (parameter, parameters = {}) => context.doPost({ parameter, parameters });
  return { context, rows, mails, props, created, sheet, post };
}

const json = (output) => {
  assert.equal(output.mime, "application/json");
  return JSON.parse(output.content);
};

const ada = {
  name: " Ada Lovelace ",
  email: "Ada@Example.org",
  setting: "he",
  role: "Lecturer, Example University",
  note: "Testing AI critiques in a methods seminar.",
  listing: "yes",
  page: "https://judgmentlab.net/#collaborate",
  format: "json",
};

// setup() creates the private Sheet once and remembers it.
{
  const env = makeEnv({ sheetId: null });
  const id = env.context.setup();
  assert.equal(id, "sheet-123");
  assert.deepEqual(env.created, ["Judgment Lab collaborators"]);
  assert.equal(env.sheet.name, "Sign-ups");
  assert.equal(env.sheet.frozen, 1);
  assert.deepEqual(env.rows[0], ["Received", "Name", "Email", "Setting", "Role and institution", "Ways to collaborate", "Practice or question", "Open to public listing", "Source page", "Status"]);
  assert.equal(env.props.get("SHEET_ID"), "sheet-123");
  env.context.setup();
  assert.equal(env.created.length, 1, "setup() must not create a second Sheet");
}

// A valid sign-up adds one row and emails Jack, with the person as reply-to.
{
  const env = makeEnv();
  assert.deepEqual(json(env.post(ada, { ways: ["pilot", "evidence", "bogus"] })), { ok: true });
  assert.equal(env.rows.length, 1);
  const [received, ...rest] = env.rows[0];
  assert.equal(Object.prototype.toString.call(received), "[object Date]");
  assert.deepEqual(rest, [
    "Ada Lovelace",
    "ada@example.org",
    "Higher education",
    "Lecturer, Example University",
    "Pilot with learners; Review the evidence",
    "Testing AI critiques in a methods seminar.",
    "Yes",
    "https://judgmentlab.net/#collaborate",
    "New",
  ]);
  assert.equal(env.mails.length, 1);
  const mail = env.mails[0];
  assert.equal(mail.to, "jshaw@comprendo.com");
  assert.equal(mail.replyTo, "ada@example.org");
  assert.equal(mail.subject, "Judgment Lab collaborator: Ada Lovelace");
  assert.match(mail.body, /Pilot with learners; Review the evidence/);
  assert.match(mail.body, /Testing AI critiques in a methods seminar\./);

  // The exact same sign-up again (address in any case) within the window adds nothing.
  assert.deepEqual(json(env.post({ ...ada, email: "ADA@example.org" }, { ways: ["pilot", "evidence"] })), { ok: true });
  assert.equal(env.rows.length, 1, "a double submit must reach the Sheet once");
  assert.equal(env.mails.length, 1);
  // A corrected sign-up is a new sign-up, not a duplicate.
  assert.deepEqual(json(env.post({ ...ada, note: "Corrected: a staff college seminar." }, { ways: ["pilot", "evidence"] })), { ok: true });
  assert.equal(env.rows.length, 2, "a corrected resubmission must be kept");
}

// The honeypot drops bots while still reporting success.
{
  const env = makeEnv();
  assert.deepEqual(json(env.post({ ...ada, website: "http://spam.example" })), { ok: true });
  assert.equal(env.rows.length, 0);
  assert.equal(env.mails.length, 0);
}

// Invalid input is refused with field errors and stores nothing.
{
  const env = makeEnv();
  const result = json(env.post({ name: "", email: "not-an-email", setting: "mars", format: "json" }));
  assert.equal(result.ok, false);
  assert.deepEqual(result.errors, ["name", "email", "setting"]);
  assert.deepEqual(json(env.post({ ...ada, note: "x".repeat(1501) })).errors, ["note"]);
  assert.deepEqual(json(env.post({ ...ada, role: "r".repeat(161) })).errors, ["role"]);
  assert.equal(env.rows.length, 0);
  assert.equal(env.mails.length, 0);
}

// Values a spreadsheet would run as formulas are stored as text.
{
  const env = makeEnv();
  json(env.post({ ...ada, name: '=HYPERLINK("http://x","y")', note: "+1 to this", role: "@admin" }));
  const row = env.rows[0];
  assert.equal(row[1], '\'=HYPERLINK("http://x","y")');
  assert.equal(row[4], "'@admin");
  assert.equal(row[6], "'+1 to this");
}

// A controlled check is marked in the Sheet and in the email subject.
{
  const env = makeEnv();
  json(env.post({ ...ada, test: "controlled-check" }));
  assert.equal(env.rows[0][9], "Test");
  assert.equal(env.mails[0].subject, "[TEST] Judgment Lab collaborator: Ada Lovelace");
}

// A mail failure never loses the sign-up: the Sheet is the record.
{
  const env = makeEnv({ mailFails: true });
  assert.deepEqual(json(env.post(ada)), { ok: true });
  assert.equal(env.rows.length, 1);
  assert.equal(env.rows[0][9], "New (email failed)", "a sign-up whose email failed must say so in the Sheet");
}

// Anonymous volume is capped: past the hourly cap, sign-ups are refused and nothing is stored.
{
  const env = makeEnv();
  for (let i = 0; i < 20; i++) assert.deepEqual(json(env.post({ ...ada, email: `person${i}@example.org` })), { ok: true });
  assert.deepEqual(json(env.post({ ...ada, email: "one-too-many@example.org" })), { ok: false, errors: ["busy"] });
  assert.equal(env.rows.length, 20);
  assert.equal(env.mails.length, 20);
}

// Near the end of the day's mail quota the sign-up is kept but no email is sent.
{
  const env = makeEnv({ quota: 5 });
  assert.deepEqual(json(env.post(ada)), { ok: true });
  assert.equal(env.mails.length, 0);
  assert.equal(env.rows[0][9], "New (email skipped: quota)");
}

// A busy lock or a renamed tab is refused cleanly instead of throwing.
{
  assert.deepEqual(json(makeEnv({ lockFree: false }).post(ada)), { ok: false, errors: ["busy"] });
  const env = makeEnv({ tabMissing: true });
  assert.deepEqual(json(env.post(ada)), { ok: false, errors: ["unavailable"] });
  assert.equal(env.mails.length, 0);
}

// Line breaks count once, whichever form the browser sends; the longest address still works.
{
  const env = makeEnv();
  const note = "line\r\n".repeat(300); // 1,500 characters once \r\n becomes \n
  assert.deepEqual(json(env.post({ ...ada, note })), { ok: true });
  const longEmail = "a".repeat(240) + "@example.org";
  assert.deepEqual(json(env.post({ ...ada, email: longEmail })), { ok: true });
}

// Without JavaScript, one ticked box arrives as a single value.
{
  const env = makeEnv();
  json(env.post({ ...ada, ways: "cases" }));
  assert.equal(env.rows[0][5], "Contribute cases");
}

// Only the web app's entry points are public: helpers are private to the script.
for (const [, name] of code.matchAll(/^function (\w+)\(/gm)) {
  if (["setup", "doGet", "doPost"].includes(name)) continue;
  assert.ok(name.endsWith("_"), `${name} must end in "_" so the web app does not expose it`);
}

// Before setup() has run, sign-ups are refused rather than silently lost.
{
  const env = makeEnv({ sheetId: null });
  assert.deepEqual(json(env.post(ada)), { ok: false, errors: ["unavailable"] });
  assert.equal(env.mails.length, 0);
}

// Without JavaScript the form posts directly and gets a plain page back.
{
  const env = makeEnv();
  const { format, ...plain } = ada;
  const done = env.post(plain);
  assert.match(done.html, /Thanks\./);
  assert.match(done.html, /href="https:\/\/judgmentlab\.net\/#collaborate"/);
  assert.match(done.html, /^<base target="_top">/, "links on the plain page must leave Apps Script's frame");
  const refused = env.post({ name: "<b>x</b>", email: "bad" });
  assert.match(refused.html, /Something is missing/);
  assert.doesNotMatch(refused.html, /<b>x<\/b>/, "the page must not echo submitted input");
  assert.match(env.context.doGet().html, /^<base target="_top">[\s\S]*running/);
}

console.log("collaborator sign-ups passed: setup, validation, honeypot, exact repeats once, hourly cap, mail quota and failures marked, busy lock, missing tab, line breaks, formulas, test marker, private helpers, framed links");
