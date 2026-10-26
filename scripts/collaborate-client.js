// Open call sign-up. Posts the form to the collaborator web app
// (apps-script/collaborators) and confirms. On any failure, or before the web
// app is configured, it offers the same entries as an email to Jack instead.
(() => {
  const form = document.querySelector("[data-collaborate-form]");
  if (!form) return;
  const submit = form.querySelector("[data-collaborate-submit]");
  const success = document.querySelector("[data-collaborate-success]");
  const fallback = document.querySelector("[data-collaborate-fallback]");
  const mailto = fallback.querySelector("[data-collaborate-mailto]");
  const failedNote = fallback.querySelector("[data-fallback-failed]");
  const unknownNote = fallback.querySelector("[data-fallback-unknown]");
  const setting = form.elements.setting;
  const label = submit.textContent;
  const TIMEOUT_MS = 15000;

  // Follow the setting the reader chose elsewhere on the site until they pick one here.
  function presetSetting(chosen) {
    if (setting.dataset.touched) return;
    setting.value = ["pme", "he", "k12"].includes(chosen) ? chosen : "";
  }
  setting.addEventListener("change", () => {
    setting.dataset.touched = "true";
  });
  // The site announces every setting change (navigation, the chooser, Back) from applyAudience.
  document.addEventListener("lab:audience", (event) => presetSetting(event.detail));
  presetSetting(new URL(location.href).searchParams.get("audience"));

  function emailHref() {
    const data = new FormData(form);
    const ways = Array.from(form.querySelectorAll('input[name="ways"]:checked'), (box) => box.labels[0].textContent.trim());
    const body = [
      "Hi Jack,",
      "",
      "I'd like to join the Judgment Lab open call.",
      "",
      "Name: " + data.get("name"),
      "Email: " + data.get("email"),
      "Setting: " + (setting.value ? setting.selectedOptions[0].textContent : ""),
      "Role and institution: " + data.get("role"),
      "Ways to take part: " + ways.join("; "),
      "Open to public listing: " + (data.get("listing") ? "Yes" : "No"),
      "",
      "A practice I'm trying, or a question I'm working on:",
      data.get("note"),
    ].join("\n");
    // Mail apps show "+" literally, so spaces are sent as %20.
    return "mailto:jshaw@comprendo.com?" + new URLSearchParams({ subject: "Judgment Lab open call", body }).toString().replace(/\+/g, "%20");
  }

  function show(panel) {
    for (const each of [success, fallback]) each.hidden = each !== panel;
    panel.focus();
  }

  // A timed-out request may still have been saved, so it is not reported as a failure.
  function offerEmail(outcomeUnknown = false) {
    failedNote.hidden = outcomeUnknown;
    unknownNote.hidden = !outcomeUnknown;
    mailto.href = emailHref();
    submit.disabled = false;
    submit.textContent = label;
    show(fallback);
  }

  // Invalid forms never reach this handler: the browser's own validation stops them first.
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const endpoint = form.dataset.endpoint;
    if (!endpoint) return offerEmail();
    const body = new URLSearchParams(new FormData(form));
    body.set("format", "json");
    body.set("page", location.href);
    submit.disabled = true;
    submit.textContent = "Sending…";
    fallback.hidden = true;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const response = await fetch(endpoint, { method: "POST", body, signal: controller.signal });
      const result = response.ok ? await response.json() : null;
      if (!result || !result.ok) return offerEmail();
      form.hidden = true;
      show(success);
    } catch (error) {
      offerEmail(error.name === "AbortError");
    } finally {
      clearTimeout(timer);
    }
  });
})();
