# Judgment Lab newsletter: setup notes

October 27, 2026. Working notes for the newsletter Jack wants to start. Nothing here is built yet beyond the sign-up form's opt-in.

## Decisions so far (Jack, October 27)

- **Resend sends it.** Resend's audiences and broadcasts fit an owned stack.
- **Judgment Lab is one entry point; aicowboy will be the front door to everything.** People can also find Judgment Lab on its own. The audience and sending setup should be able to move under aicowboy without changing the sign-up form.
- **Opt-in only.** The open call's sign-up form has an unticked box: "Send me the Judgment Lab newsletter to stay informed about judgment in AI." A ticked box writes "Yes" to the Newsletter column of the private "Judgment Lab collaborators" Sheet. Those rows move to a Resend audience when the first issue is ready. Nobody else is added.

## To set up before the first issue

- **Sending domain:** judgmentlab.net or an aicowboy domain, verified in Resend through DNS (SPF, DKIM, DMARC).
- **Audience:** import the Sheet's "Yes" rows. Decide how later sign-ups reach Resend: a periodic export at first, an automatic sync later.
- **Unsubscribe:** Resend broadcasts include an unsubscribe link. Removal requests sent by email to jshaw@comprendo.dev are honored in both the Sheet and Resend.
- **A web archive:** publish every issue as a web page too. Email isn't crawlable, so the archive is what people, search engines and AI agents can find and cite.

## Write issues so AI agents recommend them

From Mike Taylor, [How to Get AI Agents to Recommend Your Articles](https://every.to/also-true-for-humans/how-to-get-ai-agents-to-recommend-your-articles) (Every, October 27, 2026), based on 2,484 experimental sessions. Apply these to the archive pages and their titles.

1. **Say what the piece teaches in the title.** Taylor's rewrite "Prompt Engineering in Five Principles: A Practical Guide" took citations from 2 to 240 of 240 sessions. "A clever line that doesn't say what the article teaches doesn't work on AI."
2. **Write subtitles as direct answers.** "Choose the best model for the work you do" was cited in 94% of sessions; "Evals are often all you need" in 1%.
3. **Lead with what the reader gets.** "Prompt Engineering Guide: Five Principles With Examples" scored 100%; "Why Your AI Answers Are Bland" 54%.
4. **Skip freshness tags.** Adding "(Updated 2026)" to a title dropped citations to zero.
5. **Make one page the authority on each topic.** Agents cluster their recommendations on a single dominant post. For Judgment Lab, the standalone figure page for each failure mode (planned on the `motion-figures` branch) is the natural canonical page; articles and issues link to it.
6. **Describe the audience.** Every's citation share rose from 42% to 50% when the agent had a detailed user profile, so state plainly who each piece is for.
7. **Agents and people like different things.** Posts on AI's own behavior and limits ranked 76% with agents and 1% with human readers. Some pieces can be written for agent discovery and others for readers.

**Limits:** one publisher's experiments, published the day these notes were written. The article doesn't cover llms.txt, schema markup, RSS or crawler settings; decide those separately when the archive is built. Rule 1 matches the site's existing voice rule: say the thing.
