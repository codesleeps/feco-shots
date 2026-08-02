import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lockFile = path.join(__dirname, '.git', 'index.lock');

try {
  if (fs.existsSync(lockFile)) {
    fs.rmSync(lockFile, { force: true });
    console.log('Removed index.lock');
  }
} catch (e) {
  console.error('Error removing lock:', e.message);
}
