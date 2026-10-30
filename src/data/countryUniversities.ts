import type { UniversityDirectoryItem } from '../components/UniversityCard';

// Raw data imports
import usaDataRaw from './usa_universities_directory.json';
import canadaDataRaw from './canada_universities.json';
import australiaDataRaw from './australia_universities.json';
import germanyDataRaw from './germany_universities.json';
import newZealandDataRaw from './new_zealand_universities.json';
import irelandDataRaw from './ireland_universities.json';
import europeDataRaw from './europe_universities.json';
import availableLogosRaw from './available_logos.json';

export type { UniversityDirectoryItem };

export interface RegionOption {
  code: string;
  name: string;
  count: number;
}

export interface CountryConfig {
  id: string;
  slug: string;
  name: string;
  title: string;
  subtitle: string;
  backPath: string;
  backLabel: string;
  counsellingDestination: string;
  regionFilterLabel: string;
  items: UniversityDirectoryItem[];
  regions: RegionOption[];
  filterItemByRegion: (item: UniversityDirectoryItem, selectedRegion: string) => boolean;
}

// ─────────────────────────────────────────────────────────────
// US State Names Dictionary
// ─────────────────────────────────────────────────────────────
export const US_STATE_NAMES: Record<string, string> = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
  DC: 'District of Columbia',
  AS: 'American Samoa',
  GU: 'Guam',
  MP: 'Northern Mariana Islands',
  PR: 'Puerto Rico',
  VI: 'U.S. Virgin Islands',
  FM: 'Federated States of Micronesia',
  MH: 'Marshall Islands',
};

// ─────────────────────────────────────────────────────────────
// Pre-index Available Logos (5,195 files)
// ─────────────────────────────────────────────────────────────
const availableLogos = availableLogosRaw as string[];

const logoPrefixIdMap = new Map<string, string>();
const logoPrefixSlugMap = new Map<string, string>();

function slugify(s?: string | null): string {
  if (!s) return '';
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ' ')
    .trim()
    .replace(/\s+/g, '_');
}

for (const file of availableLogos) {
  const parts = file.replace(/\.(png|svg|jpg)$/i, '').split('_');
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

/**
 * Robust Logo Resolver
 * Matches official local logo from /images/universities_logos/
 * Uses verified institution country prefixes, directory IDs, and name slugs.
 */
export function resolveUniversityLogo(
  countryId: string,
  directoryId: string,
  institutionName: string
): string | undefined {
  const cleanId = String(parseInt(directoryId, 10));
  const slug = slugify(institutionName);

  const prefixes: string[] = [];
  const normalizedCountry = countryId.toLowerCase().replace(/_/g, '-');

  if (normalizedCountry === 'usa' || normalizedCountry === 'united-states') {
    prefixes.push('usa');
  } else if (normalizedCountry === 'canada') {
    prefixes.push('canada');
  } else if (normalizedCountry === 'australia') {
    prefixes.push('australia');
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

  // 1. Match by prefix + ID
  for (const p of prefixes) {
    const file = logoPrefixIdMap.get(`${p}:${cleanId}`);
    if (file) return `/images/universities_logos/${file}`;
  }

  // 2. Match by prefix + exact slug
  for (const p of prefixes) {
    const file = logoPrefixSlugMap.get(`${p}:${slug}`);
    if (file) return `/images/universities_logos/${file}`;
  }

  // 3. Match by partial slug inside same country prefix
  if (slug.length >= 6) {
    for (const p of prefixes) {
      for (const [key, file] of logoPrefixSlugMap.entries()) {
        if (key.startsWith(`${p}:`)) {
          const kSlug = key.slice(p.length + 1);
          if (kSlug.length >= 6 && (kSlug.includes(slug) || slug.includes(kSlug))) {
            return `/images/universities_logos/${file}`;
          }
        }
      }
    }
  }

  return undefined;
}

// ─────────────────────────────────────────────────────────────
// Normalization Helper
// ─────────────────────────────────────────────────────────────
interface RawItem {
  directory_id?: string | number;
  institution_name?: string;
  name?: string;
  location?: string | null;
  website_url?: string | null;
  country?: string | null;
  logo_url?: string;
  campus_image_url?: string;
  category?: string;
}

function normalizeItems(
  rawList: RawItem[],
  countryId: string,
  defaultCountryName: string
): UniversityDirectoryItem[] {
  return rawList.map((raw, idx) => {
    const directoryId = String(raw.directory_id ?? idx + 1);
    const name = raw.institution_name || raw.name || 'Unknown University';
    const location = raw.location ?? null;
    const website = raw.website_url ?? null;
    const country = raw.country || defaultCountryName;

    let logoUrl = raw.logo_url;
    if (!logoUrl || logoUrl.includes('placeholder')) {
      const resolved = resolveUniversityLogo(countryId, directoryId, name);
      if (resolved) {
        logoUrl = resolved;
      }
    }

    return {
      directory_id: directoryId,
      institution_name: name,
      location,
      website_url: website,
      country,
      logo_url: logoUrl,
      category: raw.category,
    };
  });
}

// ─────────────────────────────────────────────────────────────
// Region Extraction Helpers
// ─────────────────────────────────────────────────────────────
function extractUsaRegions(items: UniversityDirectoryItem[]): RegionOption[] {
  const counts: Record<string, number> = {};
  for (const u of items) {
    if (!u.location || !u.location.trim()) continue;
    const parts = u.location.split(',');
    const st = parts.length > 1 ? parts[parts.length - 1].trim().toUpperCase() : parts[0].trim().toUpperCase();
    if (st && st.length <= 4) {
      counts[st] = (counts[st] || 0) + 1;
    }
  }

  return Object.keys(counts)
    .sort((a, b) => {
      const nameA = US_STATE_NAMES[a] || a;
      const nameB = US_STATE_NAMES[b] || b;
      return nameA.localeCompare(nameB);
    })
    .map((code) => ({
      code,
      name: US_STATE_NAMES[code] || code,
      count: counts[code],
    }));
}

function extractSeparatorRegions(items: UniversityDirectoryItem[]): RegionOption[] {
  const counts: Record<string, number> = {};
  for (const u of items) {
    const loc = u.location || '';
    if (!loc.trim()) continue;

    let region = '';
    if (loc.includes(' · ')) {
      const parts = loc.split(' · ');
      region = parts[parts.length - 1].trim();
    } else if (loc.includes(',')) {
      const parts = loc.split(',');
      region = parts[parts.length - 1].trim();
    } else {
      region = loc.trim();
    }

    // Clean region text
    if (region.includes('/')) {
      region = region.split('/')[0].trim();
    }

    if (region && region.length >= 2 && region.length <= 40) {
      counts[region] = (counts[region] || 0) + 1;
    }
  }

  return Object.keys(counts)
    .sort((a, b) => a.localeCompare(b))
    .map((code) => ({
      code,
      name: code,
      count: counts[code],
    }));
}

function extractEuropeCountryRegions(items: UniversityDirectoryItem[]): RegionOption[] {
  const counts: Record<string, number> = {};
  for (const u of items) {
    const c = u.country || 'Other';
    counts[c] = (counts[c] || 0) + 1;
  }

  return Object.keys(counts)
    .sort((a, b) => a.localeCompare(b))
    .map((code) => ({
      code,
      name: code,
      count: counts[code],
    }));
}

export interface DirectoryDestination {
  id: string;
  slug: string;
  name: string;
  flag: string;
}

export const DIRECTORY_DESTINATIONS: DirectoryDestination[] = [
  { id: 'usa', slug: 'usa', name: 'USA', flag: 'USA' },
  { id: 'uk', slug: 'uk', name: 'UK', flag: 'UK' },
  { id: 'canada', slug: 'canada', name: 'Canada', flag: 'Canada' },
  { id: 'australia', slug: 'australia', name: 'Australia', flag: 'Australia' },
  { id: 'germany', slug: 'germany', name: 'Germany', flag: 'Germany' },
  { id: 'new-zealand', slug: 'new-zealand', name: 'New Zealand', flag: 'New Zealand' },
  { id: 'ireland', slug: 'ireland', name: 'Ireland', flag: 'Ireland' },
  { id: 'europe', slug: 'europe', name: 'Europe', flag: 'Europe' },
];

// ─────────────────────────────────────────────────────────────
// Country Datasets Initialization
// ─────────────────────────────────────────────────────────────
const usaItems = normalizeItems(usaDataRaw as unknown as RawItem[], 'usa', 'United States');
const canadaItems = normalizeItems(canadaDataRaw as unknown as RawItem[], 'canada', 'Canada');
const australiaItems = normalizeItems(australiaDataRaw as unknown as RawItem[], 'australia', 'Australia');
const germanyItems = normalizeItems(germanyDataRaw as unknown as RawItem[], 'germany', 'Germany');
const newZealandItems = normalizeItems(newZealandDataRaw as unknown as RawItem[], 'new-zealand', 'New Zealand');
const irelandItems = normalizeItems(irelandDataRaw as unknown as RawItem[], 'ireland', 'Ireland');

// Filter France out of Europe dataset so French universities never appear in the directory
const europeRawNonFrance = (europeDataRaw as unknown as RawItem[]).filter(
  (u) => u.country !== 'France'
);
const europeItems = normalizeItems(europeRawNonFrance, 'europe', 'Europe');

// Filtered European subsets for UK
const ukItems = europeItems.filter((u) => u.country === 'United Kingdom');

export const COUNTRY_CONFIGS: Record<string, CountryConfig> = {
  usa: {
    id: 'usa',
    slug: 'usa',
    name: 'United States',
    title: 'All USA Universities',
    subtitle: 'Browse 2,800+ accredited colleges and universities across all 50 U.S. states.',
    backPath: '/study-in-usa',
    backLabel: 'Back to Study in USA',
    counsellingDestination: 'USA',
    regionFilterLabel: 'All States / Territories',
    items: usaItems,
    regions: extractUsaRegions(usaItems),
    filterItemByRegion: (item, selectedRegion) => {
      if (!item.location) return false;
      const parts = item.location.split(',');
      const st = parts.length > 1 ? parts[parts.length - 1].trim().toUpperCase() : parts[0].trim().toUpperCase();
      return st === selectedRegion;
    },
  },
  canada: {
    id: 'canada',
    slug: 'canada',
    name: 'Canada',
    title: 'All Canadian Universities',
    subtitle: 'Explore 150+ recognised universities and higher education institutions across Canada.',
    backPath: '/study-in-canada',
    backLabel: 'Back to Study in Canada',
    counsellingDestination: 'Canada',
    regionFilterLabel: 'All Provinces / Territories',
    items: canadaItems,
    regions: extractSeparatorRegions(canadaItems),
    filterItemByRegion: (item, selectedRegion) => {
      if (!item.location) return false;
      return item.location.toLowerCase().includes(selectedRegion.toLowerCase());
    },
  },
  uk: {
    id: 'uk',
    slug: 'uk',
    name: 'United Kingdom',
    title: 'All UK Universities',
    subtitle: 'Discover 190+ world-class universities across England, Scotland, Wales, and Northern Ireland.',
    backPath: '/study-in-uk',
    backLabel: 'Back to Study in UK',
    counsellingDestination: 'United Kingdom',
    regionFilterLabel: 'All Categories / Nations',
    items: ukItems,
    regions: extractSeparatorRegions(ukItems),
    filterItemByRegion: (item, selectedRegion) => {
      if (!item.location) return true;
      return item.location.toLowerCase().includes(selectedRegion.toLowerCase());
    },
  },
  germany: {
    id: 'germany',
    slug: 'germany',
    name: 'Germany',
    title: 'All German Universities',
    subtitle: 'Browse 390+ public and state-recognised universities and TU9 technical institutes in Germany.',
    backPath: '/study-in-germany',
    backLabel: 'Back to Study in Germany',
    counsellingDestination: 'Germany',
    regionFilterLabel: 'All Bundesländer / States',
    items: germanyItems,
    regions: extractSeparatorRegions(germanyItems),
    filterItemByRegion: (item, selectedRegion) => {
      if (!item.location) return false;
      return item.location.toLowerCase().includes(selectedRegion.toLowerCase());
    },
  },
  australia: {
    id: 'australia',
    slug: 'australia',
    name: 'Australia',
    title: 'All Australian Universities',
    subtitle: 'Explore 40+ leading public universities and Group of Eight institutions in Australia.',
    backPath: '/study-in-australia',
    backLabel: 'Back to Study in Australia',
    counsellingDestination: 'Australia',
    regionFilterLabel: 'All Cities / States',
    items: australiaItems,
    regions: extractSeparatorRegions(australiaItems),
    filterItemByRegion: (item, selectedRegion) => {
      if (!item.location) return false;
      return item.location.toLowerCase().includes(selectedRegion.toLowerCase());
    },
  },
  ireland: {
    id: 'ireland',
    slug: 'ireland',
    name: 'Ireland',
    title: 'All Irish Universities',
    subtitle: 'Explore recognized universities, institutes of technology, and colleges across Ireland.',
    backPath: '/study-in-ireland',
    backLabel: 'Back to Study in Ireland',
    counsellingDestination: 'Ireland',
    regionFilterLabel: 'All Counties / Cities',
    items: irelandItems,
    regions: extractSeparatorRegions(irelandItems),
    filterItemByRegion: (item, selectedRegion) => {
      if (!item.location) return false;
      return item.location.toLowerCase().includes(selectedRegion.toLowerCase());
    },
  },
  'new-zealand': {
    id: 'new-zealand',
    slug: 'new-zealand',
    name: 'New Zealand',
    title: 'All New Zealand Universities',
    subtitle: 'Discover all 8 world-ranked national universities across New Zealand.',
    backPath: '/study-in-new-zealand',
    backLabel: 'Back to Study in New Zealand',
    counsellingDestination: 'New Zealand',
    regionFilterLabel: 'All Regions',
    items: newZealandItems,
    regions: extractSeparatorRegions(newZealandItems),
    filterItemByRegion: (item, selectedRegion) => {
      if (!item.location) return false;
      return item.location.toLowerCase().includes(selectedRegion.toLowerCase());
    },
  },
  europe: {
    id: 'europe',
    slug: 'europe',
    name: 'Europe',
    title: 'All European Universities',
    subtitle: 'Browse 2,600+ universities across 50 European countries.',
    backPath: '/study-in-europe',
    backLabel: 'Back to Study in Europe',
    counsellingDestination: 'Europe',
    regionFilterLabel: 'All European Countries',
    items: europeItems,
    regions: extractEuropeCountryRegions(europeItems),
    filterItemByRegion: (item, selectedRegion) => {
      return (item.country || '').toLowerCase() === selectedRegion.toLowerCase();
    },
  },
};

// Aliases
COUNTRY_CONFIGS['united-kingdom'] = COUNTRY_CONFIGS['uk'];
COUNTRY_CONFIGS['newzealand'] = COUNTRY_CONFIGS['new-zealand'];

export function getCountryConfig(countryId?: string): CountryConfig {
  if (!countryId) return COUNTRY_CONFIGS['usa'];
  const key = countryId.toLowerCase().trim().replace(/_/g, '-');
  return COUNTRY_CONFIGS[key] || COUNTRY_CONFIGS['usa'];
}
