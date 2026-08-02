import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, 'app', 'img', 'contender');
const dest = path.join(__dirname, 'public', 'img', 'cocktails');

const files = fs.readdirSync(src);
for (const file of files) {
  if (file === '.DS_Store') continue;
  const srcFile = path.join(src, file);
  const destFile = path.join(dest, file);
  try {
    fs.writeFileSync(destFile, fs.readFileSync(srcFile));
    console.log('SUCCESS WRITING COCKTAIL:', file);
  } catch (e) {
    console.error('ERROR WRITING:', file, e.message);
  }
}
