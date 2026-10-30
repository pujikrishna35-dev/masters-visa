const fs = require('fs');
const content = fs.readFileSync('src/data/content.ts', 'utf8');

const regex = /\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*country:\s*'([^']+)',\s*flag:\s*'([^']+)',\s*logoType:\s*'([^']+)',\s*logoUrl:\s*'([^']+)',\s*qsRank:\s*'([^']+)',\s*established:\s*'([^']+)'\s*\}/g;

const list = [];
let m;
while ((m = regex.exec(content)) !== null) {
  list.push({
    id: m[1],
    name: m[2],
    country: m[3],
    logoUrl: m[6],
    qsRank: m[7]
  });
}

console.log('Total universities in carousel:', list.length);

const byCountry = {};
let allLogosExist = true;

list.forEach(u => {
  byCountry[u.country] = (byCountry[u.country] || 0) + 1;
  const diskPath = 'public' + u.logoUrl;
  const exists = fs.existsSync(diskPath);
  if (!exists) allLogosExist = false;
  console.log(`  [${u.country.padEnd(12)}] ${u.name.padEnd(45)} | ${u.qsRank.padEnd(28)} | Logo: ${exists ? 'OK' : 'MISSING'}`);
});

console.log('\nUniversities count per country:');
for (const [c, count] of Object.entries(byCountry)) {
  console.log(`  ${c}: ${count}`);
}
console.log('\nAll logos exist locally:', allLogosExist);

