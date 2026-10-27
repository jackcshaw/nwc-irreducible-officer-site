# Open call for collaborators: design

Date: 2026-10-26. Status: authoritative. It supersedes the email-only invitation drafted in PR #34, whose Maven session panel it keeps.

## Purpose

Judgment Lab had no way for anyone to reach the people behind it. Jack wants more than an address in the footer. He wants an open call that invites people to collaborate and builds a list of who is interested.

Decisions Jack made:

- **The list is private first.** Sign-ups go to a private list that only Jack sees. A public roster on the site lists only people who agree to it separately; no submission is ever published automatically.
- **Four ways to collaborate:**
  - pilot with learners;
  - contribute cases;
  - design teaching materials;
  - review the evidence.
- **Sign-ups:** a native form on the site posts to a Google Apps Script web app. The script adds a row to a Google Sheet Jack owns and emails each sign-up to jshaw@comprendo.com.
- **Styling:** the page gets an Impeccable pass.

Alignment with the Codex draft (PR #34), agreed between the two agents at Jack's request:

- There is one form and one private Sheet.
- The Maven practitioner session stays on Discuss as a practitioner perspective, not evidence of learning gains. Its call to action points to the same form.
- The five primary navigation paths are unchanged.
- Email to jshaw@comprendo.com remains as the fallback.

## What visitors see

**The page.** The open call lives at `#collaborate`, built as a page region like the essays and setting pages. It is not a sixth tab. Top to bottom:

1. **Heading and pitch.** The Lab's teaching designs are proposals to test. We are looking for educators and practitioners in PME, higher education and high school to test, extend and challenge them.
2. **Four ways to collaborate,** each with one sentence on what it involves.
3. **Who convenes it:** Jack Shaw, with jshaw@comprendo.com for anyone who would rather write directly.
4. **The sign-up form.**
5. **What happens next:** Jack reads every sign-up and replies by email. Details stay on a private list for Judgment Lab collaboration. They are not shared, there is no mailing list, and nothing is published without separate agreement. To be removed, email jshaw@comprendo.com.
6. **Collaborators:** the curated public roster, hidden while it is empty.

**Entry points:**

- **Home page:** the "Ready for educator testing" section keeps its caution that these are proposals to test, and adds the invitation with a button to the call.
- **Masthead, every page:** a quiet "Open call" link beside "Watch the reel".
- **Footer, every page:** a "Collaborate" link.
- **Discuss:** the practitioner invitation's button opens the call. The home page's Discuss card keeps its original copy, because Discuss is about challenging claims.

## The form

| Field | Required | Notes |
| --- | --- | --- |
| Name | yes | up to 120 characters |
| Email | yes | `type=email`; checked again on the server |
| Setting | yes | PME, Higher education, K–12 · High school, or Other. Preselected from the site's chosen setting when there is one. |
| Role and institution | no | up to 160 characters |
| Ways to collaborate | no | checkboxes for the four ways |
| A practice you're trying, or a question you're working on | no | up to 1,500 characters |
| I'd be glad to be listed publicly as a collaborator | no | unticked by default. Jack confirms with the person before listing anyone. |
| Send me the Judgment Lab newsletter to stay informed about judgment in AI | no | unticked by default. Added October 27 at Jack's request. The newsletter will go out through Resend; ticked sign-ups move to a Resend audience when the first issue is ready. |

A hidden honeypot field catches simple bots.

**States:**

- **Sending:** the button is disabled and says so.
- **Success:** the form is replaced by a confirmation that names the next step (Jack replies by email), and focus moves to it.
- **Error, timeout or network failure:** the entries stay in the form, and the message offers an email to jshaw@comprendo.com prefilled with them.
- **No endpoint configured:** submitting opens that prefilled email. This exists for development only; the site is not released in this state.
- **Without JavaScript:** the form posts directly to the web app, which answers with a plain confirmation page that links back.

## Backend: Apps Script web app

The code lives in `apps-script/collaborators/`: `Code.gs`, `appsscript.json` and a deploy README. It holds no secrets: the Sheet's id is kept in Script Properties, set by `setup()`.

- `setup()` creates the Sheet "Judgment Lab collaborators" with a header row and stores its id.
- `doPost(e)` handles each sign-up:
  - It validates the fields.
  - If the honeypot is filled, it drops the submission while still reporting success.
  - It ignores an identical repeat within ten minutes, so a double submit adds one row, while a corrected sign-up is kept. A digest of the sign-up keys this.
  - It accepts at most 20 sign-ups an hour. Past that it answers `busy`, and the site offers email instead, so anonymous volume cannot exhaust Jack's mail.
  - When the day's mail quota is nearly spent it skips the email, and it marks that, or a failed email, in the Status column.
  - It appends a row under a script lock. A busy lock or a missing tab is refused cleanly.
  - It emails jshaw@comprendo.com with the submitter as reply-to.
  - It responds with JSON (`{"ok":true}`, or `{"ok":false,"errors":[…]}` with status details) when the request carries `format=json`. Otherwise it serves the confirmation page.
- **Columns:** Received, Name, Email, Setting, Role and institution, Ways to collaborate, Practice or question, Open to public listing, Newsletter, Source page, Status.
- **Deployment (Jack's one step):** in the Google account that should own the list:
  1. Create the project.
  2. Run `setup()` and authorize the Sheets and Mail scopes.
  3. Deploy as a web app that executes as Jack and is accessible to anyone.
  4. Share the `/exec` URL.

## Public roster

`content/collaborators.json` is an array of `{ "name", "role", "setting" }` entries. It starts empty, and Jack adds people after they agree. The build renders a "Collaborators" list when the array has entries and leaves the section out when it is empty.

## Configuration

`content/collaborate.json` holds `endpoint`, the web app's `/exec` URL. A contract test requires a `https://script.google.com/macros/s/…/exec` URL whenever it is set.

## Testing

- **Node tests for `Code.gs`,** run in a VM with stub Google services:
  - validation;
  - the honeypot;
  - the duplicate guard (one row);
  - the notification's routing and reply-to;
  - JSON versus HTML responses.
- **Site contract tests:**
  - the page and its entry points;
  - the form fields and requirements;
  - the mailto fallback;
  - the endpoint format;
  - the roster rendered from the content file, or absent when empty;
  - Discuss pointing to the call.
- **Browser tests,** with the endpoint mocked:
  - validation;
  - success and focus;
  - error with the prefilled email;
  - setting preselection;
  - masthead and footer navigation;
  - no horizontal overflow at desktop and phone widths.
  - All existing browser checks keep passing.

## Verification and release

1. **Controlled submission.** After Jack deploys, submit one marked test entry. Confirm it reaches the Sheet exactly once and that the notification goes to jshaw@comprendo.com. Then remove the test row, which Sheet version history keeps reversible.
2. **Release.** The feature PR carries no version bump. A separate release PR sets the version. One deploy by Claude Code, from a clean worktree, verified with the live footer, `release.json` and a hash-compare of every file.

## Out of scope

- A mailing list.
- Automatic publication of sign-ups.
- Analytics events.
- Changes to the five primary paths.

## Implementation order

1. Spec; remove the version bump.
2. Apps Script, test first, then hand Jack the deploy step.
3. Site page, form, client script and entry points, test first.
4. Impeccable pass.
5. Review and simplify.
6. Configure the endpoint and verify a controlled submission.
7. Merge, release and deploy.
