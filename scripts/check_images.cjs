const fs = require('fs');
const content = fs.readFileSync('src/data/destinationPagesData.ts', 'utf8');
const regex = /\/images\/[a-zA-Z0-9_\-\.\/]+/g;
const matches = content.match(regex) || [];
const unique = [...new Set(matches)];
const missing = [];
const present = [];

unique.forEach(img => {
  const localPath = 'public' + img;
  if (fs.existsSync(localPath)) {
    present.push(img);
  } else {
    missing.push(img);
  }
});

console.log('Present (' + present.length + '):');
present.forEach(p => console.log('  OK: ' + p));
console.log('Missing (' + missing.length + '):');
missing.forEach(m => console.log('  MISSING: ' + m));

