import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  try {
    fs.mkdirSync(dest, { recursive: true });
  } catch (e) {}
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === '.DS_Store') continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      try {
        fs.copyFileSync(srcPath, destPath);
        console.log('COPIED:', destPath);
      } catch (err) {
        console.error('File copy warning:', entry.name, err.message);
      }
    }
  }
}

try {
  copyDir(path.join(__dirname, 'app', 'img'), path.join(__dirname, 'public', 'img'));
  console.log('ASSETS COPY COMPLETE');
} catch (e) {
  console.error('Error during copy:', e.message);
}
