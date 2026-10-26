// Judgment Lab collaborator sign-ups. The open call's form posts here; each
// sign-up becomes one row in a private Google Sheet and one email to Jack.
// Deploy as a web app that executes as the owner and is open to anyone (see
// README.md). Nothing here is secret: the Sheet's id lives in Script Properties.

const NOTIFY_TO = "jshaw@comprendo.com";
const SHEET_TITLE = "Judgment Lab collaborators";
const TAB = "Sign-ups";
const HEADERS = ["Received", "Name", "Email", "Setting", "Role and institution", "Ways to collaborate", "Practice or question", "Open to public listing", "Source page", "Status"];
const SETTINGS = { pme: "PME", he: "Higher education", k12: "K–12 · High school", other: "Other" };
const WAYS = { pilot: "Pilot with learners", cases: "Contribute cases", design: "Design teaching materials", evidence: "Review the evidence" };
const LIMITS = { name: 120, email: 254, role: 160, note: 1500, page: 300 };
const REPEAT_WINDOW_SECONDS = 600; // a double submit from one address lands once
const SITE = "https://judgmentlab.net/#collaborate";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Run once from the editor: creates the Sheet and remembers it.
function setup() {
  const props = PropertiesService.getScriptProperties();
  const existing = props.getProperty("SHEET_ID");
  if (existing) return existing;
  const book = SpreadsheetApp.create(SHEET_TITLE);
  const sheet = book.getSheets()[0];
  sheet.setName(TAB);
  sheet.appendRow(HEADERS);
  sheet.setFrozenRows(1);
  props.setProperty("SHEET_ID", book.getId());
  return book.getId();
}

function doGet() {
  return HtmlService.createHtmlOutput("<p>Judgment Lab collaborator sign-ups are running. The open call is at <a href=\"" + SITE + "\">judgmentlab.net</a>.</p>").setTitle("Judgment Lab");
}

function doPost(e) {
  const params = (e && e.parameter) || {};
  const multi = (e && e.parameters) || {};
  // Bots fill the hidden field; tell them it worked and keep nothing.
  if (text(params.website)) return respond({ ok: true }, params);
  const checked = validateSubmission(params, multi);
  if (!checked.ok) return respond({ ok: false, errors: checked.errors }, params);
  const record = checked.record;

  let sheet;
  try {
    sheet = signUps();
  } catch (error) {
    console.error(error);
    return respond({ ok: false, errors: ["unavailable"] }, params);
  }
  const cache = CacheService.getScriptCache();
  const seenKey = "seen:" + record.email;
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    if (cache.get(seenKey)) return respond({ ok: true }, params);
    sheet.appendRow(toRow(record));
    cache.put(seenKey, "1", REPEAT_WINDOW_SECONDS);
  } finally {
    lock.releaseLock();
  }
  // The Sheet is the record; a mail failure must not turn a saved sign-up into an error.
  try {
    notify(record);
  } catch (error) {
    console.error(error);
  }
  return respond({ ok: true }, params);
}

function validateSubmission(params, multi) {
  const name = text(params.name);
  const email = text(params.email).toLowerCase();
  const setting = text(params.setting);
  const role = text(params.role);
  const note = text(params.note);
  const errors = [];
  if (!name || name.length > LIMITS.name) errors.push("name");
  if (!EMAIL.test(email) || email.length > LIMITS.email) errors.push("email");
  if (!SETTINGS[setting]) errors.push("setting");
  if (role.length > LIMITS.role) errors.push("role");
  if (note.length > LIMITS.note) errors.push("note");
  const ways = [].concat(multi.ways || params.ways || []).filter((way) => WAYS[way]);
  return {
    ok: errors.length === 0,
    errors,
    record: {
      name,
      email,
      setting: SETTINGS[setting],
      role,
      ways: ways.map((way) => WAYS[way]).join("; "),
      note,
      listing: text(params.listing) === "yes" ? "Yes" : "No",
      page: text(params.page).slice(0, LIMITS.page),
      test: text(params.test) === "controlled-check",
    },
  };
}

function signUps() {
  const id = PropertiesService.getScriptProperties().getProperty("SHEET_ID");
  if (!id) throw new Error("Run setup() before deploying.");
  return SpreadsheetApp.openById(id).getSheetByName(TAB);
}

function toRow(r) {
  return [new Date(), r.name, r.email, r.setting, r.role, r.ways, r.note, r.listing, r.page, r.test ? "Test" : "New"].map(asText);
}

function notify(r) {
  MailApp.sendEmail({
    to: NOTIFY_TO,
    replyTo: r.email,
    subject: (r.test ? "[TEST] " : "") + "Judgment Lab collaborator: " + r.name,
    body: [
      "New Judgment Lab collaborator sign-up",
      "",
      "Name: " + r.name,
      "Email: " + r.email,
      "Setting: " + r.setting,
      "Role and institution: " + (r.role || "—"),
      "Ways to collaborate: " + (r.ways || "—"),
      "Open to public listing: " + r.listing,
      "Source page: " + (r.page || "—"),
      "",
      "Practice or question:",
      r.note || "—",
      "",
      "Reply to this email to answer them directly. The sign-up is also in the \"" + SHEET_TITLE + "\" Sheet.",
    ].join("\n"),
  });
}

function respond(result, params) {
  if (text(params.format) === "json") {
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
  }
  const message = result.ok
    ? "<h1>Thank you.</h1><p>Jack Shaw reads every sign-up and will reply by email.</p>"
    : "<h1>Some details need another look.</h1><p>Please go back and check the form, or write to <a href=\"mailto:" + NOTIFY_TO + "\">" + NOTIFY_TO + "</a>.</p>";
  return HtmlService.createHtmlOutput(message + "<p><a href=\"" + SITE + "\">Return to Judgment Lab</a></p>").setTitle("Judgment Lab");
}

function text(value) {
  return String(value == null ? "" : value).trim();
}

// Spreadsheets run cells that start with these characters as formulas.
function asText(value) {
  return typeof value === "string" && /^[=+\-@]/.test(value) ? "'" + value : value;
}
