import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';

// Replay exactly the stylesheet and font bytes selected for the reference build.
// Both source and candidate use this lock; an unknown font request is an error.
export function loadFontLock(path) {
  const manifestBytes = readFileSync(path);
  const manifest = JSON.parse(manifestBytes);
  const root = dirname(resolve(path));
  const sha = bytes => createHash('sha256').update(bytes).digest('hex');
  const read = entry => {
    if (!entry || !/^[a-z0-9.-]+$/i.test(entry.file)) throw new Error('Invalid font lock file');
    const body = readFileSync(resolve(root, entry.file));
    if (sha(body) !== entry.sha256) throw new Error(`Font lock hash mismatch: ${entry.file}`);
    return body;
  };
  if (manifest.schema !== 1 || !manifest.origin?.startsWith('https://fonts.googleapis.com/')) throw new Error('Invalid font lock manifest');
  const responses = new Map([[manifest.origin, {body: read(manifest.stylesheet), contentType: 'text/css'}]]);
  for (const [url, entry] of Object.entries(manifest.resources)) {
    if (!url.startsWith('https://fonts.gstatic.com/')) throw new Error(`Invalid locked font URL: ${url}`);
    responses.set(url, {body: read(entry), contentType: entry.contentType || 'font/woff2'});
  }
  return {
    sha256: sha(manifestBytes),
    async install(context) {
      await context.route(/^https:\/\/fonts\.(googleapis|gstatic)\.com\//, async route => {
        const response = responses.get(route.request().url());
        if (!response) { await route.abort('failed'); return; }
        await route.fulfill({...response, headers: {'access-control-allow-origin': '*'}});
      });
    },
  };
}
