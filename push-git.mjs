import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lockFile = path.join(__dirname, '.git', 'index.lock');

try {
  if (fs.existsSync(lockFile)) {
    fs.unlinkSync(lockFile);
  }
} catch (e) {}

try {
  console.log('Staging files...');
  execSync('git add index.html src/', { stdio: 'inherit' });
  
  console.log('Committing files...');
  execSync('git commit -m "Fix GitHub Pages blank page runtime"', { stdio: 'inherit' });
  
  console.log('Pushing to GitHub...');
  execSync('git push origin main', { stdio: 'inherit' });
  
  console.log('SUCCESSFULLY PUSHED TO GITHUB!');
} catch (err) {
  console.error('Git error:', err.message);
}
