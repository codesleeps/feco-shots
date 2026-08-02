import fs from 'node:fs';
import path from 'node:path';

const srcDir = '/Users/user/Desktop/feco-shots/public/img/chocolates';
const destDirs = [
  '/Users/user/Desktop/feco-shots/app/img/chocolates',
  '/Users/user/Desktop/feco-shots/public/app/img/chocolates'
];

destDirs.forEach((dest) => {
  fs.mkdirSync(dest, { recursive: true });
  const files = fs.readdirSync(srcDir);
  files.forEach((f) => {
    if (f !== '.DS_Store') {
      const srcFile = path.join(srcDir, f);
      const destFile = path.join(dest, f);
      fs.copyFileSync(srcFile, destFile);
      console.log('Successfully copied:', f, 'to', dest);
    }
  });
});
