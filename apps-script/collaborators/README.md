# Collaborator sign-ups (Google Apps Script)

The open call's form at `judgmentlab.net/#collaborate` posts here. Each sign-up becomes one row in a private Google Sheet, "Judgment Lab collaborators", and one email to jshaw@comprendo.com with the person as reply-to. The Sheet is the list. Nothing is published from it automatically: the public roster on the site is `content/collaborators.json`, edited by hand after each person agrees.

`tests/apps-script/collaborators.test.mjs` runs this code against stand-ins for the Google services (`npm test`).

## Deploy (once, about five minutes)

Use the Google account that should own the list.

1. **Create the project.** At [script.google.com](https://script.google.com), choose **New project** and name it "Judgment Lab collaborators".
2. **Paste the code.** Replace the editor's `Code.gs` with this folder's `Code.gs`. Then, in **Project Settings**, tick **Show "appsscript.json" manifest file in editor**, and replace that file with this folder's `appsscript.json`.
3. **Run `setup`.** Choose `setup` in the function menu, then **Run**, and approve the permissions it asks for. Google warns that the app is unverified because it is your own script; choose **Advanced**, then **Go to Judgment Lab collaborators**. This creates the Sheet in your Drive.
4. **Deploy.** Choose **Deploy**, then **New deployment**, with the type **Web app**. Set **Execute as** to Me and **Who has access** to Anyone, then **Deploy**.
5. **Copy the URL.** The web app URL ends in `/exec`. It goes in `content/collaborate.json` as `endpoint`.

Opening the URL in a browser should show "Judgment Lab collaborator sign-ups are running."

## Updating the code

Paste the new `Code.gs`, then choose **Deploy**, then **Manage deployments**, edit the deployment, and select **New version**. The URL stays the same.

## Testing a live deployment

A sign-up posted with `test=controlled-check` is marked "Test" in the Status column, and its email subject starts with `[TEST]`. Delete that row afterwards; the Sheet's version history keeps the deletion reversible.
