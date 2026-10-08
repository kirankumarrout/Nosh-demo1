import { readFileSync, existsSync, readdirSync } from 'node:fs';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const app = readFileSync(resolve(root, 'src/App.tsx'), 'utf8').replace(/\s+/g, ' ');
const data = readFileSync(resolve(root, 'src/data.ts'), 'utf8');
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const css = readFileSync(resolve(root, 'src/styles.css'), 'utf8');

const anchors = [...app.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
for (const anchor of anchors)
  assert(app.includes(`id="${anchor}"`), `Missing navigation target #${anchor}`);

const images = [
  'exterior',
  'interior',
  'dining-room',
  'arch-detail',
  'tables',
  'platters',
  'sandwich',
  'bread',
  'chicken',
];
for (const name of images) {
  for (const suffix of ['', '-sm'])
    assert(
      existsSync(resolve(root, `public/assets/${name}${suffix}.webp`)),
      `Missing image ${name}${suffix}`,
    );
}
for (const name of ['platter-cutout', 'special-menu'])
  assert(existsSync(resolve(root, `public/assets/${name}.webp`)), `Missing image ${name}`);

assert(data.includes('tel:+917751054666'), 'Incorrect phone destination');
assert(data.includes('https://www.instagram.com/n_o_s_h_25/'), 'Missing supplied Instagram');
assert(
  app.includes('This planner does not submit a booking.'),
  'Planner must not imply a confirmed reservation',
);
assert(app.includes('current availability and prices'), 'Special menu needs availability context');
assert(!/North Info S/i.test(app + data + html), 'Old restaurant name remains');
assert(/prefers-reduced-motion:\s*reduce/.test(css), 'Reduced-motion fallback missing');
assert(app.includes('onCancel={onClose}'), 'Dialog Escape handler missing');

const jsonLd = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
assert(jsonLd, 'Restaurant structured data missing');
const schema = JSON.parse(jsonLd[1]);
assert.equal(schema.name, 'Nosh');
assert.equal(schema.telephone, '+917751054666');
assert(!schema.openingHours, 'Unverified opening hours should not be published');

const dist = resolve(root, 'dist');
if (existsSync(dist)) {
  const built = readFileSync(resolve(dist, 'index.html'), 'utf8');
  for (const match of built.matchAll(/(?:src|href)="\.\/([^"#]+)"/g)) {
    assert(existsSync(resolve(dist, match[1])), `Broken built entry reference: ${match[1]}`);
  }
  assert(
    readdirSync(resolve(dist, 'assets')).some((name) => name.endsWith('.js')),
    'Built JavaScript missing',
  );
}
console.log(
  `Passed: ${new Set(anchors).size} section targets, 20 responsive food/interior assets, menu context, contact links, accessibility hooks, and structured data.`,
);
