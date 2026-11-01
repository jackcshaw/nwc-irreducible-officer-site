import {createHash} from 'node:crypto';
import {mkdirSync, readFileSync, realpathSync, writeFileSync} from 'node:fs';
import {dirname, isAbsolute, relative, resolve} from 'node:path';

export const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');

// All player dependencies are named explicitly by the build. Runtime and figure
// scripts are classic scripts; resolved edition data is embedded in the page.
// Return a URL for every file so loaders never reuse the top-level script's hash.
export function writeFigureAssets({sourceDir, outputDir, files}) {
  const source = realpathSync(sourceDir);
  const output = resolve(outputDir);
  const manifest = {};
  for (const file of files) {
    if (typeof file !== 'string' || !/^[a-z0-9][a-z0-9._/-]*$/i.test(file) || file.split('/').some(part => !part || part === '.' || part === '..')) {
      throw new Error(`Invalid figure asset path: ${file}`);
    }
    if (Object.hasOwn(manifest, file)) throw new Error(`Duplicate figure asset: ${file}`);
    const path = realpathSync(resolve(source, file));
    const inside = relative(source, path);
    if (inside === '..' || inside.startsWith('../') || isAbsolute(inside)) throw new Error(`Figure asset escapes source: ${file}`);
    const bytes = readFileSync(path);
    const digest = sha256(bytes);
    const dest = resolve(output, file);
    mkdirSync(dirname(dest), {recursive: true});
    writeFileSync(dest, bytes);
    manifest[file] = {url: `/assets/figures/${file}?v=${digest}`, sha256: digest, bytes: bytes.length};
  }
  return manifest;
}
