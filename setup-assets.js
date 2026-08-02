import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcImg = path.join(__dirname, 'app', 'img');
const destImg = path.join(__dirname, 'public', 'app', 'img');
const srcCss = path.join(__dirname, 'app', 'css');
const destCss = path.join(__dirname, 'public', 'app', 'css');

try {
  console.log('Creating directories...');
  fs.mkdirSync(destImg, { recursive: true });
  fs.mkdirSync(destCss, { recursive: true });

  console.log('Copying images...');
  fs.cpSync(srcImg, destImg, { recursive: true });

  console.log('Copying css...');
  fs.cpSync(srcCss, destCss, { recursive: true });

  console.log('Successfully copied assets to public directory!');
} catch (err) {
  console.error('Failed to copy assets:', err.message);
}
