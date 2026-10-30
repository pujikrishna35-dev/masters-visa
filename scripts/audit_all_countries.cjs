const fs = require('fs');
const path = require('path');

const availableLogosRaw = JSON.parse(fs.readFileSync('src/data/available_logos.json', 'utf8'));
const availableLogosSet = new Set(availableLogosRaw);

// Also check actual files on disk
const diskFiles = new Set(fs.readdirSync('public/images/university_logos'));

console.log('Available logos in JSON:', availableLogosSet.size);
console.log('Available logos on disk:', diskFiles.size);

const datasets = [
  { country: 'usa', file: 'src/data/usa_universities_directory.json' },
  { country: 'canada', file: 'src/data/canada_universities.json' },
  { country: 'australia', file: 'src/data/australia_universities.json' },
  { country: 'germany', file: 'src/data/germany_universities.json' },
  { country: 'new-zealand', file: 'src/data/new_zealand_universities.json' },
  { country: 'ireland', file: 'src/data/ireland_universities.json' },
  { country: 'europe', file: 'src/data/europe_universities.json' },
];

function slugify(s) {
  if (!s) return '';
  return s.toLowerCase().replace(/[^a-z0-9]/g, ' ').trim().replace(/\s+/g, '_');
}

// Build index exactly as countryUniversities.ts does
const logoPrefixIdMap = new Map();
const logoPrefixSlugMap = new Map();

for (const file of diskFiles) {
  const parts = file.replace(/\.png$/i, '').split('_');
  let prefix = parts[0];
  let id = parts[1];
  let slug = parts.slice(2).join('_');

  if (file.startsWith('new_zealand_')) {
    prefix = 'new_zealand';
    id = parts[2];
    slug = parts.slice(3).join('_');
  }

  const cleanId = String(parseInt(id, 10));
  logoPrefixIdMap.set(`${prefix}:${cleanId}`, file);
  logoPrefixSlugMap.set(`${prefix}:${slug}`, file);
}

function resolveLogo(countryId, directoryId, name) {
  const cleanId = String(parseInt(directoryId, 10));
  const slug = slugify(name);
  const prefixes = [];
  const normalizedCountry = countryId.toLowerCase().replace(/_/g, '-');

  if (normalizedCountry === 'usa' || normalizedCountry === 'united-states') {
    prefixes.push('usa');
  } else if (normalizedCountry === 'canada') {
    prefixes.push('canada');
  } else if (normalizedCountry === 'germany') {
    prefixes.push('germany', 'europe');
  } else if (normalizedCountry === 'new-zealand' || normalizedCountry === 'newzealand') {
    prefixes.push('new_zealand');
  } else if (normalizedCountry === 'uk' || normalizedCountry === 'united-kingdom') {
    prefixes.push('uk', 'europe');
  } else if (normalizedCountry === 'ireland') {
    prefixes.push('ireland', 'europe');
  } else if (normalizedCountry === 'france') {
    prefixes.push('europe');
  } else if (normalizedCountry === 'europe') {
    prefixes.push('europe', 'germany', 'uk', 'ireland');
  } else {
    prefixes.push(normalizedCountry);
  }

  // 1. Prefix + ID
  for (const p of prefixes) {
    const file = logoPrefixIdMap.get(`${p}:${cleanId}`);
    if (file) return file;
  }
  // 2. Prefix + slug
  for (const p of prefixes) {
    const file = logoPrefixSlugMap.get(`${p}:${slug}`);
    if (file) return file;
  }
  // 3. Partial slug
  if (slug.length >= 6) {
    for (const p of prefixes) {
      for (const [key, file] of logoPrefixSlugMap.entries()) {
        if (key.startsWith(`${p}:`)) {
          const kSlug = key.slice(p.length + 1);
          if (kSlug.length >= 6 && (kSlug.includes(slug) || slug.includes(kSlug))) {
            return file;
          }
        }
      }
    }
  }
  return null;
}

datasets.forEach(ds => {
  const data = JSON.parse(fs.readFileSync(ds.file, 'utf8'));
  let hasExplicitLogo = 0;
  let resolvedLogo = 0;
  let missingLogo = 0;
  const missingSamples = [];

  data.forEach((u, idx) => {
    const dirId = String(u.directory_id ?? idx + 1);
    const name = u.institution_name || u.name;
    let logo = u.logo_url;
    if (logo && !logo.includes('placeholder')) {
      hasExplicitLogo++;
    } else {
      const res = resolveLogo(ds.country, dirId, name);
      if (res) {
        resolvedLogo++;
      } else {
        missingLogo++;
        if (missingSamples.length < 5) missingSamples.push(name);
      }
    }
  });

  console.log(`\n--- ${ds.country.toUpperCase()} (${data.length} unis) ---`);
  console.log(`  Explicit logo_url: ${hasExplicitLogo}`);
  console.log(`  Resolved via index: ${resolvedLogo}`);
  console.log(`  Missing: ${missingLogo}`);
  if (missingSamples.length > 0) {
    console.log(`  Missing samples:`, missingSamples);
  }
});

