const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const lockFile = path.join(__dirname, '.git', 'index.lock');

try {
  if (fs.existsSync(lockFile)) {
    fs.unlinkSync(lockFile);
  }
} catch (e) {}

try {
  console.log('Staging files...');
  execSync('git add src/App.jsx package.json vite.config.js setup-assets.js', { stdio: 'inherit' });
  
  console.log('Committing files...');
  execSync('git commit -m "Update interactive flavor selections and image assets"', { stdio: 'inherit' });
  
  console.log('Pushing to GitHub...');
  execSync('git push origin main', { stdio: 'inherit' });
  
  console.log('SUCCESSFULLY PUSHED TO GITHUB!');
} catch (err) {
  console.error('Git error:', err.message);
}
