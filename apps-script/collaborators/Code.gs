// Judgment Lab collaborator sign-ups. The open call's form posts here; each
// sign-up becomes one row in a private Google Sheet and one email to Jack.
// Deploy as a web app that executes as the owner and is open to anyone (see
// README.md). Nothing here is secret: the Sheet's id lives in Script Properties.
// Helpers end in "_" so the web app does not expose them to client code.

const NOTIFY_TO = "jshaw@comprendo.dev";
const SHEET_TITLE = "Judgment Lab collaborators";
const TAB = "Sign-ups";
const HEADERS = ["Received", "Name", "Email", "Setting", "Role and institution", "Ways to collaborate", "Practice or question", "Open to public listing", "Newsletter", "Source page", "Status"];
const STATUS_COLUMN = HEADERS.indexOf("Status") + 1;
const SETTINGS = { pme: "PME", he: "Higher education", k12: "K–12 · High school", business: "Business", other: "Other" };
const WAYS = { pilot: "Pilot with learners", cases: "Contribute cases", design: "Design teaching materials", evidence: "Review the evidence" };
const LIMITS = { name: 120, email: 254, role: 160, note: 1500, page: 300 };
const REPEAT_WINDOW_SECONDS = 600; // the same sign-up twice in this window lands once
const HOURLY_CAP = 20; // anonymous sign-ups accepted per hour; past it visitors are offered email
const MAIL_RESERVE = 10; // leave this much of the day's mail quota for Jack's other scripts
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
  return page_("<p>Judgment Lab collaborator sign-ups are running. The open call is at <a href=\"" + SITE + "\">judgmentlab.net</a>.</p>");
}

function doPost(e) {
  const params = (e && e.parameter) || {};
  const multi = (e && e.parameters) || {};
  // Bots fill the hidden field; tell them it worked and keep nothing.
  if (text_(params.website)) return respond_({ ok: true }, params);
  const checked = validateSubmission_(params, multi);
  if (!checked.ok) return respond_({ ok: false, errors: checked.errors }, params);
  const record = checked.record;

  let sheet;
  try {
    sheet = signUps_();
  } catch (error) {
    console.error(error);
    return respond_({ ok: false, errors: ["unavailable"] }, params);
  }
  const mailAllowed = MailApp.getRemainingDailyQuota() >= MAIL_RESERVE;
  const status = (record.test ? "Test" : "New") + (mailAllowed ? "" : " (email skipped: quota)");
  const cache = CacheService.getScriptCache();
  const seenKey = "seen:" + fingerprint_(record);
  const hourKey = "count:" + Math.floor(Date.now() / 3600000);
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return respond_({ ok: false, errors: ["busy"] }, params);
  let row;
  try {
    if (cache.get(seenKey)) return respond_({ ok: true }, params);
    const count = Number(cache.get(hourKey) || 0);
    if (count >= HOURLY_CAP) return respond_({ ok: false, errors: ["busy"] }, params);
    sheet.appendRow(toRow_(record, status));
    row = sheet.getLastRow();
    cache.put(seenKey, "1", REPEAT_WINDOW_SECONDS);
    cache.put(hourKey, String(count + 1), 3600);
  } finally {
    lock.releaseLock();
  }
  if (mailAllowed) {
    // The Sheet is the record; a failed email is marked there rather than turning a saved sign-up into an error.
    try {
      notify_(record);
    } catch (error) {
      console.error(error);
      sheet.getRange(row, STATUS_COLUMN).setValue(status + " (email failed)");
    }
  }
  return respond_({ ok: true }, params);
}

function validateSubmission_(params, multi) {
  const name = text_(params.name);
  const email = text_(params.email).toLowerCase();
  const setting = text_(params.setting);
  const role = text_(params.role);
  // Browsers may send line breaks as \r\n; count each once, as the form does.
  const note = text_(params.note).replace(/\r\n?/g, "\n");
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
      listing: text_(params.listing) === "yes" ? "Yes" : "No",
      newsletter: text_(params.newsletter) === "yes" ? "Yes" : "No",
      page: text_(params.page).slice(0, LIMITS.page),
      test: text_(params.test) === "controlled-check",
    },
  };
}

// A fixed-length key for "this exact sign-up", well inside CacheService's key limit.
function fingerprint_(r) {
  const payload = [r.email, r.name, r.setting, r.role, r.ways, r.note, r.listing, r.newsletter, r.test].join("\n");
  return Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, payload));
}

function signUps_() {
  const id = PropertiesService.getScriptProperties().getProperty("SHEET_ID");
  if (!id) throw new Error("Run setup() before deploying.");
  const sheet = SpreadsheetApp.openById(id).getSheetByName(TAB);
  if (!sheet) throw new Error("The \"" + TAB + "\" tab is missing from the Sheet.");
  return sheet;
}

function toRow_(r, status) {
  return [new Date(), r.name, r.email, r.setting, r.role, r.ways, r.note, r.listing, r.newsletter, r.page, status].map(asText_);
}

function notify_(r) {
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
      "Newsletter: " + r.newsletter,
      "Source page: " + (r.page || "—"),
      "",
      "Practice or question:",
      r.note || "—",
      "",
      "Reply to this email to answer them directly. The sign-up is also in the \"" + SHEET_TITLE + "\" Sheet.",
    ].join("\n"),
  });
}

function respond_(result, params) {
  if (text_(params.format) === "json") {
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
  }
  const message = result.ok
    ? "<h1>Thanks.</h1><p>We read every sign-up and will reply by email.</p>"
    : "<h1>Something is missing from your sign-up.</h1><p>Go back and check the form, or email <a href=\"mailto:" + NOTIFY_TO + "\">" + NOTIFY_TO + "</a>.</p>";
  return page_(message + "<p><a href=\"" + SITE + "\">Back to Judgment Lab</a></p>");
}

// Apps Script serves these pages inside a frame; links must leave it.
function page_(body) {
  return HtmlService.createHtmlOutput('<base target="_top">' + body).setTitle("Judgment Lab");
}

function text_(value) {
  return String(value == null ? "" : value).trim();
}

// Spreadsheets run cells that start with these characters as formulas.
function asText_(value) {
  return typeof value === "string" && /^[=+\-@]/.test(value) ? "'" + value : value;
}
