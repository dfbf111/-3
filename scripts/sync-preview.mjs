import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const distDir = resolve('dist');
const source = resolve(distDir, 'index.html');
const target = resolve(distDir, 'preview.html');

if (!existsSync(source)) {
  throw new Error('dist/index.html not found. Run the Vite build first.');
}

copyFileSync(source, target);
console.log('Synced dist/preview.html');
