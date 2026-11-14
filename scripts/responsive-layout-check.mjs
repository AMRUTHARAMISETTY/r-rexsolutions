import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

function collectSource(dir) {
  let combined = '';
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      combined += collectSource(fullPath);
    } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) {
      combined += readFileSync(fullPath, 'utf8');
    }
  }
  return combined;
}

const css = readFileSync('src/index.css', 'utf8');
const source = collectSource('src');

const expectations = [
  ['desktop/tablet breakpoint', css.includes('@media (max-width: 980px)')],
  ['mobile breakpoint', css.includes('@media (max-width: 640px)')],
  ['reduced motion fallback', css.includes('prefers-reduced-motion: reduce')],
  ['touch target sizing', css.includes('min-height: 44px')],
  ['mobile stacked grids', css.includes('grid-template-columns: 1fr')],
  ['hero anchor', source.includes('id="top"')],
  ['services anchor', source.includes('id="services"')],
  ['process anchor', source.includes('id="process"')],
  ['capabilities anchor', source.includes('id="capabilities"')],
  ['contact anchor', source.includes('id="contact"')],
];

const failures = expectations.filter(([, passed]) => !passed);

if (failures.length > 0) {
  console.error('Responsive layout smoke check failed:');
  for (const [label] of failures) console.error(`- Missing ${label}`);
  process.exit(1);
}

console.log('Responsive layout smoke check passed.');
