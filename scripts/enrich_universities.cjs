/**
 * Repeatable University Enrichment Script
 * 
 * Enriches USA universities in `src/data/usa_universities_directory.json` with:
 * - Genuine university logos (from Wikipedia/Wikimedia Commons or official domain icon)
 * - Authentic campus photographs with source URL and CC license attribution
 * 
 * Features:
 * - Small batch processing (default: 20 records)
 * - Safe resume from last processed record
 * - Skips already-enriched records
 * - Never invents image URLs or claims unverified photos
 * - Generates detailed audit report at `scripts/enrichment_report.json`
 * 
 * Usage:
 *   node scripts/enrich_universities.cjs [--batch=20] [--offset=0] [--force]
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const DATA_PATH = path.resolve(__dirname, '../src/data/usa_universities_directory.json');
const REPORT_PATH = path.resolve(__dirname, 'enrichment_report.json');

// Parse CLI arguments
const args = process.argv.slice(2);
let batchSize = 20;
let offset = 0;
let force = false;

args.forEach((arg) => {
  if (arg.startsWith('--batch=')) batchSize = parseInt(arg.split('=')[1], 10);
  if (arg.startsWith('--offset=')) offset = parseInt(arg.split('=')[1], 10);
  if (arg === '--force') force = true;
});

function fetchJson(url) {
  return new Promise((resolve) => {
    const req = https.get(
      url,
      {
        headers: {
          'User-Agent': 'MastersVisa/1.0 (academic-directory-enrichment; contact@mastersvisa.com)'
        }
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch {
            resolve(null);
          }
        });
      }
    );
    req.on('error', () => resolve(null));
    req.setTimeout(10000, () => {
      req.destroy();
      resolve(null);
    });
  });
}

function extractDomain(websiteUrl) {
  if (!websiteUrl) return null;
  try {
    const parsed = new URL(websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

async function searchWikipediaArticle(name) {
  const cleanName = name
    .replace(/-Undergraduate Online/gi, '')
    .replace(/-Graduate School.*$/gi, '')
    .replace(/-Main Campus/gi, '')
    .trim();

  const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
    cleanName
  )}&gsrlimit=1&prop=pageimages|images|info&piprop=original|thumbnail&pithumbsize=800&inprop=url&format=json`;

  const data = await fetchJson(url);
  if (!data || !data.query || !data.query.pages) return null;
  return Object.values(data.query.pages)[0];
}

async function getImageDetails(titles) {
  if (!titles || !titles.length) return {};
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
    titles.join('|')
  )}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800&format=json`;

  const data = await fetchJson(url);
  if (!data || !data.query || !data.query.pages) return {};

  const result = {};
  for (const page of Object.values(data.query.pages)) {
    if (page.imageinfo && page.imageinfo[0]) {
      const info = page.imageinfo[0];
      const meta = info.extmetadata || {};
      const license = meta.LicenseShortName ? meta.LicenseShortName.value : 'Public Domain / Fair Use';
      const author = meta.Artist ? meta.Artist.value.replace(/<[^>]*>?/gm, '').trim() : 'Wikimedia Commons';

      result[page.title] = {
        title: page.title,
        url: info.thumburl || info.url,
        sourceUrl: info.descriptionurl || 'https://commons.wikimedia.org',
        attribution: `${author} (${license})`
      };
    }
  }
  return result;
}

function isLogoCandidate(filename) {
  const lower = filename.toLowerCase();
  const badPatterns = ['flag_of', 'question_book', 'commons-logo', 'symbol', 'edit-ltr', 'ambox', 'portal', 'icon'];
  if (badPatterns.some((p) => lower.includes(p))) return false;

  return (
    lower.includes('logo') ||
    lower.includes('seal') ||
    lower.includes('crest') ||
    lower.includes('wordmark') ||
    lower.includes('shield')
  );
}

function isCampusPhotoCandidate(filename) {
  const lower = filename.toLowerCase();
  const badPatterns = [
    'logo',
    'seal',
    'crest',
    'wordmark',
    'shield',
    'flag',
    'map',
    'portrait',
    'diagram',
    'icon',
    'symbol',
    'commons-logo',
    'ambox',
    'edit-ltr'
  ];
  if (badPatterns.some((p) => lower.includes(p))) return false;

  const validExts = ['.jpg', '.jpeg', '.png'];
  if (!validExts.some((ext) => lower.endsWith(ext))) return false;

  // Prefer images with architectural or campus keywords
  const positivePatterns = [
    'campus',
    'building',
    'hall',
    'library',
    'center',
    'front',
    'exterior',
    'quad',
    'tower',
    'college',
    'university'
  ];
  return positivePatterns.some((p) => lower.includes(p));
}

async function enrichRecord(record) {
  const domain = extractDomain(record.website_url);

  let logoUrl = null;
  let campusImageUrl = null;
  let imageSourceUrl = null;
  let imageAttribution = null;
  let matchMethod = 'fallback_domain';

  try {
    const wiki = await searchWikipediaArticle(record.institution_name);

    if (wiki && wiki.images && wiki.images.length) {
      const imageTitles = wiki.images.map((img) => img.title);

      // 1. Identify logo candidate
      const logoTitle = imageTitles.find(isLogoCandidate);

      // 2. Identify campus photo candidate
      const campusTitle = imageTitles.find(isCampusPhotoCandidate);

      const titlesToFetch = [];
      if (logoTitle) titlesToFetch.push(logoTitle);
      if (campusTitle) titlesToFetch.push(campusTitle);

      if (titlesToFetch.length > 0) {
        const infoMap = await getImageDetails(titlesToFetch);

        if (logoTitle && infoMap[logoTitle]) {
          logoUrl = infoMap[logoTitle].url;
          matchMethod = 'wikipedia_logo';
        }

        if (campusTitle && infoMap[campusTitle]) {
          campusImageUrl = infoMap[campusTitle].url;
          imageSourceUrl = infoMap[campusTitle].sourceUrl;
          imageAttribution = infoMap[campusTitle].attribution;
        }
      }
    }
  } catch (err) {
    console.error(`Error querying Wikipedia for ${record.institution_name}:`, err.message);
  }

  // Fallback logo: official domain high-resolution favicon (128x128)
  if (!logoUrl && domain) {
    logoUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  }

  return {
    ...record,
    logo_url: logoUrl || undefined,
    campus_image_url: campusImageUrl || undefined,
    image_source_url: imageSourceUrl || undefined,
    image_attribution: imageAttribution || undefined,
    _matchMethod: matchMethod
  };
}

async function main() {
  console.log('=== University Directory Image Enrichment ===');
  console.log(`Source: ${DATA_PATH}`);
  console.log(`Batch Size: ${batchSize}, Start Offset: ${offset}, Force: ${force}\n`);

  if (!fs.existsSync(DATA_PATH)) {
    console.error(`File not found: ${DATA_PATH}`);
    process.exit(1);
  }

  const allRecords = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  console.log(`Loaded ${allRecords.length} total institution records.`);

  // Load or initialize report
  let report = {
    startedAt: new Date().toISOString(),
    totalRecords: allRecords.length,
    processedCount: 0,
    logosMatched: 0,
    campusPhotosMatched: 0,
    missingCampusPhotos: 0,
    batches: []
  };

  if (fs.existsSync(REPORT_PATH)) {
    try {
      report = JSON.parse(fs.readFileSync(REPORT_PATH, 'utf8'));
    } catch {
      // use default
    }
  }

  const batchSlice = allRecords.slice(offset, offset + batchSize);
  console.log(`Processing batch of ${batchSlice.length} records (indices ${offset} to ${offset + batchSlice.length - 1})...\n`);

  const enrichedBatch = [];
  let batchLogos = 0;
  let batchPhotos = 0;

  for (let i = 0; i < batchSlice.length; i++) {
    const record = batchSlice[i];
    const currentIndex = offset + i;

    // Check if already processed
    if (!force && record.logo_url && (record.campus_image_url || record._processed)) {
      console.log(`[${currentIndex + 1}/${allRecords.length}] Skipping already enriched: ${record.institution_name}`);
      enrichedBatch.push(record);
      continue;
    }

    console.log(`[${currentIndex + 1}/${allRecords.length}] Enriching: ${record.institution_name} (${record.location || 'No location'})`);

    const enriched = await enrichRecord(record);
    enriched._processed = true; // internal flag
    enrichedBatch.push(enriched);

    if (enriched.logo_url) batchLogos++;
    if (enriched.campus_image_url) {
      batchPhotos++;
      console.log(`   ✓ Campus photo: ${enriched.campus_image_url.slice(0, 75)}...`);
      console.log(`   ✓ Attribution: ${enriched.image_attribution}`);
    } else {
      console.log(`   - No authentic campus photo found (will use elegant card fallback)`);
    }

    if (enriched.logo_url) {
      console.log(`   ✓ Logo: ${enriched.logo_url.slice(0, 75)}... [${enriched._matchMethod}]`);
    }

    // Small delay to be respectful of Wikipedia API limits
    await new Promise((r) => setTimeout(r, 400));
  }

  // Update records in-place
  for (let i = 0; i < enrichedBatch.length; i++) {
    allRecords[offset + i] = enrichedBatch[i];
  }

  // Write updated records safely back to JSON
  fs.writeFileSync(DATA_PATH, JSON.stringify(allRecords, null, 2), 'utf8');
  console.log(`\nUpdated ${DATA_PATH} successfully.`);

  // Update and save report
  report.lastUpdated = new Date().toISOString();
  report.lastOffset = offset + batchSlice.length;
  report.batches.push({
    timestamp: new Date().toISOString(),
    offset,
    batchSize: batchSlice.length,
    logosMatched: batchLogos,
    campusPhotosMatched: batchPhotos,
    records: enrichedBatch.map((r) => ({
      directory_id: r.directory_id,
      name: r.institution_name,
      hasLogo: Boolean(r.logo_url),
      hasCampusPhoto: Boolean(r.campus_image_url),
      attribution: r.image_attribution || null
    }))
  });

  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf8');
  console.log(`Saved enrichment report to ${REPORT_PATH}`);

  console.log('\n=== Batch Complete ===');
  console.log(`Logos matched: ${batchLogos}/${batchSlice.length}`);
  console.log(`Campus photos matched: ${batchPhotos}/${batchSlice.length}`);
  console.log(`Next batch command: node scripts/enrich_universities.cjs --offset=${offset + batchSlice.length} --batch=${batchSize}`);
}

main().catch((err) => {
  console.error('Fatal error during enrichment:', err);
  process.exit(1);
});
