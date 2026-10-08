import { existsSync, readFileSync, readdirSync } from 'node:fs';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const app = readFileSync(resolve(root, 'src/App.tsx'), 'utf8');
const css = readFileSync(resolve(root, 'src/styles.css'), 'utf8');
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
for (const id of ['top', 'dumplings', 'menu', 'recipes', 'newsletter']) assert(app.includes(`id="${id}"`) || app.includes(`href="#${id}"`), `Missing reference section ${id}`);
for (const name of ['hero-dumplings', 'sizzled-fish', 'kung-pao', 'pork-chops', 'noodles']) assert(existsSync(resolve(root, `public/assets/${name}.webp`)), `Missing generated food asset ${name}`);
assert(app.includes('Take a taste') && app.includes('Come join us.'), 'Hero copy does not match reference');
assert(app.includes("What’s on our Plate"), 'Plate section is missing');
assert(app.includes("Let’s see what other says"), 'Story section is missing');
assert(app.includes('Easy recipes will send to your inbox'), 'Newsletter section is missing');
assert(/prefers-reduced-motion:\s*reduce/.test(css), 'Reduced-motion fallback missing');
assert(html.includes('luscious') && html.includes('hero-dumplings.webp'), 'Reference metadata is missing');
const dist = resolve(root, 'dist');
if (existsSync(resolve(dist, 'index.html'))) {
  const built = readFileSync(resolve(dist, 'index.html'), 'utf8');
  for (const match of built.matchAll(/(?:src|href)="\.\/([^"#]+)"/g)) assert(existsSync(resolve(dist, match[1])), `Broken built entry reference: ${match[1]}`);
  assert(readdirSync(resolve(dist, 'assets')).some((name) => name.endsWith('.js')), 'Built JavaScript missing');
}
console.log('Passed: reference sections, generated food assets, responsive motion hooks, metadata, and built asset references.');
