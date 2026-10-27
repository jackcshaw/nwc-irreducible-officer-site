# Collaborator sign-ups (Google Apps Script)

The open call's form at `judgmentlab.net/#collaborate` posts here. Each sign-up becomes one row in a private Google Sheet, "Judgment Lab collaborators", and one email to jshaw@comprendo.dev with the person as reply-to. The Sheet is the list. Nothing is published from it automatically: the public roster on the site is `content/collaborators.json`, edited by hand after each person agrees.

`tests/apps-script/collaborators.test.mjs` runs this code against stand-ins for the Google services (`npm test`).

## Deploy (once, about five minutes)

Use the Google account that should own the list.

1. **Create the project.** At [script.google.com](https://script.google.com), choose **New project** and name it "Judgment Lab collaborators".
2. **Paste the code.** Replace the editor's `Code.gs` with this folder's `Code.gs`. Then, in **Project Settings**, tick **Show "appsscript.json" manifest file in editor**, and replace that file with this folder's `appsscript.json`.
3. **Run `setup`.** Choose `setup` in the function menu, then **Run**, and approve the permissions it asks for. Google warns that the app is unverified because it is your own script; choose **Advanced**, then **Go to Judgment Lab collaborators**. This creates the Sheet in your Drive.
4. **Check that the Sheet is private.** Open "Judgment Lab collaborators" in Drive, choose **Share**, and confirm that **General access** is Restricted. Some organisations share new files by default.
5. **Deploy.** Choose **Deploy**, then **New deployment**, with the type **Web app**. Set **Execute as** to Me and **Who has access** to Anyone, then **Deploy**.
6. **Copy the URL.** The web app URL ends in `/exec`. It goes in `content/collaborate.json` as `endpoint`.

Opening the URL in a browser should show "Judgment Lab collaborator sign-ups are running."

## The Newsletter column

The form's newsletter box is unticked by default. A sign-up that ticks it says "Yes" in the Newsletter column. The newsletter itself will go out through Resend: when the first issue is ready, the "Yes" rows move to a Resend audience. Nobody else gets it.

## Limits and the Status column

- **The same sign-up twice** within ten minutes lands once. A corrected sign-up is kept as a new row.
- **More than 20 sign-ups in an hour.** Any further ones are refused, and the site offers those visitors email instead, so a flood of fake sign-ups cannot use up your mail.
- **Near the end of the day's mail quota,** sign-ups are still saved with Status "New (email skipped: quota)". A sign-up whose email fails says "(email failed)". Check the Sheet if a day seems quiet.

## Updating the code

Paste the new `Code.gs`, then choose **Deploy**, then **Manage deployments**, edit the deployment, and select **New version**. The URL stays the same.

## Testing a live deployment

A sign-up posted with `test=controlled-check` is marked "Test" in the Status column, and its email subject starts with `[TEST]`. Delete that row afterwards; the Sheet's version history keeps the deletion reversible.
