const fs = require('fs');
const path = require('path');

const DIR = path.resolve('public/images/university_logos');

// 1. ANU
const anuSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path d="M20 14H80V46C80 72 50 90 50 90C50 90 20 72 20 46V14Z" fill="#002B49" />
  <path d="M20 14H80V38H20V14Z" fill="#BE830E" />
  <path d="M20 38H80" stroke="#FFFFFF" stroke-width="1.5" />
  <path d="M30 26C42 20 58 20 70 26C60 30 40 30 30 26Z" fill="#002B49" />
  <rect x="34" y="48" width="32" height="20" rx="2" fill="#FFFFFF" />
  <path d="M50 48V68" stroke="#002B49" stroke-width="2" />
  <text x="50" y="82" text-anchor="middle" fill="#FFFFFF" font-size="10" font-weight="bold" font-family="sans-serif">ANU</text>
</svg>`;

// 2. Melbourne
const melbourneSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path d="M20 14H80V46C80 72 50 90 50 90C50 90 20 72 20 46V14Z" fill="#092552"/>
  <path d="M35 32C42 28 58 28 65 32C62 44 58 56 50 72C42 56 38 44 35 32Z" fill="#D4AF37" fill-opacity="0.9"/>
  <polygon points="50,22 53,28 59,29 55,34 56,40 50,37 44,40 45,34 41,29 47,28" fill="#FFFFFF"/>
  <circle cx="50" cy="52" r="3" fill="#FFFFFF"/>
  <circle cx="42" cy="44" r="2.5" fill="#FFFFFF"/>
  <circle cx="58" cy="44" r="2.5" fill="#FFFFFF"/>
</svg>`;

// 3. Sydney
const sydneySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path d="M20 14H80V46C80 72 50 90 50 90C50 90 20 72 20 46V14Z" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" />
  <path d="M42 14H58V90C55 89 53 88 50 86C47 88 45 89 42 90V14Z" fill="#E61C24" />
  <path d="M20 36H80V52H20V36Z" fill="#E61C24" />
  <rect x="36" y="38" width="28" height="18" rx="2" fill="#FFFFFF" />
  <path d="M50 38V56" stroke="#E61C24" stroke-width="1.5" />
  <rect x="24" y="16" width="52" height="16" rx="2" fill="#FFC72C" />
  <circle cx="36" cy="24" r="4.5" fill="#E61C24" />
  <circle cx="64" cy="24" r="4.5" fill="#E61C24" />
  <path d="M44 24H56" stroke="#E61C24" stroke-width="2" stroke-linecap="round" />
  <polygon points="50,70 52,74 56,74 53,77 54,81 50,79 46,81 47,77 44,74 48,74" fill="#FFC72C" />
</svg>`;

// 4. UNSW
const unswSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path d="M20 14H80V46C80 72 50 90 50 90C50 90 20 72 20 46V14Z" fill="#000000" />
  <path d="M22 16H78V46C78 70 50 87 50 87C50 87 22 70 22 46V16Z" stroke="#FFE600" stroke-width="2" />
  <rect x="28" y="22" width="44" height="42" rx="4" fill="#FFE600" />
  <circle cx="44" cy="34" r="5" fill="#000000" />
  <path d="M48 38C52 38 56 42 56 48L54 58H44L46 48C46 44 44 42 40 44" stroke="#000000" stroke-width="3" stroke-linecap="round" />
  <rect x="36" y="52" width="28" height="14" rx="2" fill="#FFFFFF" stroke="#000000" stroke-width="1.5" />
  <text x="50" y="80" text-anchor="middle" fill="#FFE600" font-size="11" font-weight="900" font-family="sans-serif">UNSW</text>
</svg>`;

// 5. Monash
const monashSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path d="M20 14H80V46C80 72 50 90 50 90C50 90 20 72 20 46V14Z" fill="#006DAE" />
  <path d="M24 18H76V46C76 68 50 84 50 84C50 84 24 68 24 46V18Z" stroke="#FFFFFF" stroke-width="2" stroke-opacity="0.4" />
  <path d="M50 24V64M44 32H56" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" />
  <rect x="30" y="38" width="40" height="24" rx="2" fill="#FFFFFF" fill-opacity="0.25" stroke="#FFFFFF" stroke-width="1.5" />
  <text x="50" y="80" text-anchor="middle" fill="#FFFFFF" font-size="12" font-weight="900" font-family="sans-serif">MONASH</text>
</svg>`;

// 6. UQ
const uqSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path d="M20 14H80V46C80 72 50 90 50 90C50 90 20 72 20 46V14Z" fill="#51247A" />
  <path d="M24 18H76V46C76 68 50 84 50 84C50 84 24 68 24 46V18Z" stroke="#D7B56D" stroke-width="2" />
  <line x1="28" y1="22" x2="72" y2="68" stroke="#D7B56D" stroke-width="4" />
  <line x1="72" y1="22" x2="28" y2="68" stroke="#D7B56D" stroke-width="4" />
  <rect x="36" y="36" width="28" height="18" rx="2" fill="#FFFFFF" />
  <path d="M50 36V54" stroke="#51247A" stroke-width="1.5" />
  <text x="50" y="80" text-anchor="middle" fill="#FFFFFF" font-size="11" font-weight="900" font-family="sans-serif">UQ</text>
</svg>`;

// Generator helper for authentic collegiate crests
function makeCrest(bg, fg, accent, acronym, name1, name2, symbol) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path d="M20 14H80V46C80 72 50 90 50 90C50 90 20 72 20 46V14Z" fill="${bg}" />
  <path d="M24 18H76V46C76 68 50 84 50 84C50 84 24 68 24 46V18Z" stroke="${accent}" stroke-width="1.5" stroke-opacity="0.6" fill="none" />
  ${symbol || `<rect x="36" y="28" width="28" height="20" rx="2" fill="#FFFFFF" /><path d="M50 28V48" stroke="${bg}" stroke-width="1.5" />`}
  <text x="50" y="${symbol ? 74 : 64}" text-anchor="middle" fill="${fg}" font-size="${acronym.length > 5 ? '9' : '11'}" font-weight="900" font-family="system-ui, sans-serif" letter-spacing="0.5">${acronym}</text>
  ${name1 ? `<text x="50" y="81" text-anchor="middle" fill="${accent}" font-size="6" font-weight="700" font-family="system-ui, sans-serif" letter-spacing="0.5">${name1.toUpperCase()}</text>` : ''}
</svg>`;
}

const list = [
  { file: 'australia_0001_adelaide_university.svg', svg: makeCrest('#0A1C3C', '#FFFFFF', '#D4AF37', 'ADELAIDE', 'AUSTRALIA', null, '<circle cx="50" cy="34" r="10" fill="#D4AF37" /><polygon points="50,26 52,31 57,32 53,35 55,40 50,37 45,40 47,35 43,32 48,31" fill="#0A1C3C" />') },
  { file: 'australia_0003_australian_national_university.svg', svg: anuSvg },
  { file: 'australia_0004_australian_university_of_theology.svg', svg: makeCrest('#1B365D', '#FFFFFF', '#C5A059', 'ACT', 'THEOLOGY', null, '<rect x="38" y="24" width="24" height="20" rx="2" fill="#FFFFFF"/><path d="M50 22V46M44 30H56" stroke="#C5A059" stroke-width="2"/>') },
  { file: 'australia_0005_avondale_university.svg', svg: makeCrest('#004B87', '#FFFFFF', '#F5A800', 'AVONDALE', 'EST. 1897', null, '<circle cx="50" cy="32" r="9" fill="#F5A800"/><path d="M45 42L50 22L55 42Z" fill="#FFFFFF"/>') },
  { file: 'australia_0006_bond_university.svg', svg: makeCrest('#00263E', '#FFFFFF', '#EAAA00', 'BOND', 'QUEENSLAND', null, '<path d="M35 44C35 28 65 28 65 44" stroke="#EAAA00" stroke-width="4" stroke-linecap="round" fill="none"/>') },
  { file: 'australia_0007_charles_darwin_university.svg', svg: makeCrest('#781D7E', '#FFFFFF', '#F39200', 'CDU', 'DARWIN', null, '<circle cx="50" cy="32" r="10" fill="#F39200"/><circle cx="50" cy="32" r="6" fill="#781D7E"/>') },
  { file: 'australia_0008_charles_sturt_university.svg', svg: makeCrest('#007680', '#FFFFFF', '#E31B23', 'CSU', 'CHARLES STURT', null, '<circle cx="50" cy="32" r="9" fill="#E31B23"/><polygon points="50,25 53,32 60,32 55,37 57,44 50,40 43,44 45,37 40,32 47,32" fill="#FFFFFF"/>') },
  { file: 'australia_0009_cquniversity_australia.svg', svg: makeCrest('#008272', '#FFFFFF', '#FFCC00', 'CQU', 'AUSTRALIA', null, '<circle cx="50" cy="32" r="10" fill="#FFCC00"/><path d="M40 32C40 26 60 26 60 32" stroke="#008272" stroke-width="3" fill="none"/>') },
  { file: 'australia_0010_curtin_university.svg', svg: makeCrest('#1A1A1A', '#FFFFFF', '#EF9F00', 'CURTIN', 'PERTH', null, '<polygon points="32,24 68,24 50,44" fill="#EF9F00"/>') },
  { file: 'australia_0011_deakin_university.svg', svg: makeCrest('#000000', '#FFFFFF', '#009688', 'DEAKIN', 'MELBOURNE', null, '<circle cx="50" cy="32" r="10" stroke="#009688" stroke-width="3" fill="none"/><circle cx="50" cy="32" r="5" fill="#FFFFFF"/>') },
  { file: 'australia_0012_edith_cowan_university.svg', svg: makeCrest('#000000', '#FFFFFF', '#FF8200', 'ECU', 'EDITH COWAN', null, '<circle cx="50" cy="32" r="9" fill="#FF8200"/><path d="M45 36C45 28 55 28 55 36" stroke="#FFFFFF" stroke-width="2" fill="none"/>') },
  { file: 'australia_0013_federation_university.svg', svg: makeCrest('#003366', '#FFFFFF', '#E4002B', 'FEDUNI', 'BALLARAT', null, '<polygon points="50,22 53,28 60,29 55,34 56,41 50,37 44,41 45,34 40,29 47,28" fill="#E4002B"/>') },
  { file: 'australia_0014_flinders_university.svg', svg: makeCrest('#C8102E', '#FFFFFF', '#FFCD00', 'FLINDERS', 'ADELAIDE', null, '<circle cx="50" cy="32" r="9" fill="#FFCD00"/><path d="M46 26H54M50 26V40M42 36C46 42 54 42 58 36" stroke="#002147" stroke-width="2" stroke-linecap="round"/>') },
  { file: 'australia_0015_griffith_university.svg', svg: makeCrest('#CC0000', '#FFFFFF', '#FFCC00', 'GRIFFITH', 'BRISBANE', null, '<polygon points="50,23 60,33 50,43 40,33" fill="#FFCC00"/>') },
  { file: 'australia_0016_james_cook_university.svg', svg: makeCrest('#00205B', '#FFFFFF', '#00A3E0', 'JCU', 'TOWNSVILLE', null, '<circle cx="50" cy="32" r="9" fill="#00A3E0"/><path d="M40 32C45 26 55 26 60 32C55 38 45 38 40 32Z" fill="#FFFFFF"/>') },
  { file: 'australia_0017_la_trobe_university.svg', svg: makeCrest('#D41B2C', '#FFFFFF', '#000000', 'LA TROBE', 'VICTORIA', null, '<path d="M36 28L50 40L64 28L50 22Z" fill="#FFFFFF"/>') },
  { file: 'australia_0018_macquarie_university.svg', svg: makeCrest('#A6192E', '#FFFFFF', '#00857C', 'MACQUARIE', 'SYDNEY', null, '<circle cx="50" cy="32" r="9" stroke="#00857C" stroke-width="2" fill="#FFFFFF"/><polygon points="50,26 52,30 56,31 53,34 54,38 50,36 46,38 47,34 44,31 48,30" fill="#A6192E"/>') },
  { file: 'australia_0019_monash_university.svg', svg: monashSvg },
  { file: 'australia_0020_murdoch_university.svg', svg: makeCrest('#CC0000', '#FFFFFF', '#000000', 'MURDOCH', 'PERTH', null, '<circle cx="50" cy="32" r="9" fill="#000000"/><path d="M44 32C44 26 56 26 56 32" stroke="#FFFFFF" stroke-width="2" fill="none"/>') },
  { file: 'australia_0021_queensland_university_of_technology.svg', svg: makeCrest('#00407A', '#FFFFFF', '#FFFFFF', 'QUT', 'BRISBANE', null, '<rect x="34" y="24" width="32" height="18" rx="2" fill="#FFFFFF"/><text x="50" y="37" text-anchor="middle" fill="#00407A" font-size="11" font-weight="900" font-family="sans-serif">QUT</text>') },
  { file: 'australia_0022_rmit_university.svg', svg: makeCrest('#E60000', '#FFFFFF', '#000000', 'RMIT', 'UNIVERSITY', null, '<rect x="34" y="25" width="32" height="16" fill="#000000"/><text x="50" y="37" text-anchor="middle" fill="#FFFFFF" font-size="10" font-weight="900" font-family="sans-serif">RMIT</text>') },
  { file: 'australia_0023_southern_cross_university.svg', svg: makeCrest('#003366', '#FFFFFF', '#F2A900', 'SCU', 'GOLD COAST', null, '<circle cx="50" cy="26" r="3" fill="#F2A900"/><circle cx="50" cy="40" r="3" fill="#F2A900"/><circle cx="43" cy="33" r="2.5" fill="#F2A900"/><circle cx="57" cy="33" r="2.5" fill="#F2A900"/>') },
  { file: 'australia_0024_swinburne_university_of_technology.svg', svg: makeCrest('#DC143C', '#FFFFFF', '#000000', 'SWINBURNE', 'TECH', null, '<rect x="36" y="26" width="28" height="16" rx="2" fill="#000000"/><text x="50" y="38" text-anchor="middle" fill="#FFFFFF" font-size="9" font-weight="bold" font-family="sans-serif">SUT</text>') },
  { file: 'australia_0025_torrens_university.svg', svg: makeCrest('#002855', '#FFFFFF', '#FFD100', 'TORRENS', 'AUSTRALIA', null, '<circle cx="50" cy="32" r="9" fill="#FFD100"/><path d="M43 32H57" stroke="#002855" stroke-width="2"/>') },
  { file: 'australia_0026_university_of_canberra.svg', svg: makeCrest('#002B49', '#FFFFFF', '#CBA052', 'CANBERRA', 'UC', null, '<circle cx="50" cy="32" r="9" fill="#CBA052"/><polygon points="50,26 53,33 60,33 55,38 57,44 50,40 43,44 45,38 40,33 47,33" fill="#002B49"/>') },
  { file: 'australia_0027_university_of_divinity.svg', svg: makeCrest('#4A154B', '#FFFFFF', '#D4AF37', 'DIVINITY', 'MELBOURNE', null, '<path d="M50 22V44M42 30H58" stroke="#D4AF37" stroke-width="3" stroke-linecap="round"/>') },
  { file: 'australia_0028_university_of_melbourne.svg', svg: melbourneSvg },
  { file: 'australia_0029_university_of_new_england.svg', svg: makeCrest('#003865', '#FFFFFF', '#D9381E', 'UNE', 'ARMIDALE', null, '<rect x="36" y="26" width="28" height="16" rx="2" fill="#D9381E"/><text x="50" y="38" text-anchor="middle" fill="#FFFFFF" font-size="9" font-weight="900" font-family="sans-serif">UNE</text>') },
  { file: 'australia_0030_university_of_new_south_wales.svg', svg: unswSvg },
  { file: 'australia_0031_university_of_newcastle.svg', svg: makeCrest('#002B49', '#FFFFFF', '#00A3E0', 'NEWCASTLE', 'AUSTRALIA', null, '<circle cx="50" cy="32" r="9" fill="#00A3E0"/><path d="M46 26C54 26 54 38 46 38" stroke="#FFFFFF" stroke-width="2" fill="none"/>') },
  { file: 'australia_0032_university_of_notre_dame_australia.svg', svg: makeCrest('#00263E', '#FFFFFF', '#C99700', 'NOTRE DAME', 'FREMANTLE', null, '<circle cx="50" cy="32" r="9" fill="#C99700"/><polygon points="50,25 53,32 60,32 55,37 57,44 50,40 43,44 45,37 40,32 47,32" fill="#00263E"/>') },
  { file: 'australia_0033_university_of_queensland.svg', svg: uqSvg },
  { file: 'australia_0034_university_of_southern_queensland.svg', svg: makeCrest('#FDB813', '#002B49', '#002B49', 'UniSQ', 'QUEENSLAND', null, '<circle cx="50" cy="32" r="9" fill="#002B49"/><path d="M43 32C43 28 57 28 57 32" stroke="#FDB813" stroke-width="2"/>') },
  { file: 'australia_0035_university_of_sydney.svg', svg: sydneySvg },
  { file: 'australia_0036_university_of_tasmania.svg', svg: makeCrest('#004731', '#FFFFFF', '#C41230', 'UTAS', 'TASMANIA', null, '<circle cx="50" cy="32" r="9" fill="#C41230"/><polygon points="50,25 53,32 60,32 55,37 57,44 50,40 43,44 45,37 40,32 47,32" fill="#FFFFFF"/>') },
  { file: 'australia_0037_university_of_technology_sydney.svg', svg: makeCrest('#000000', '#FFFFFF', '#0072CE', 'UTS', 'SYDNEY', null, '<rect x="34" y="24" width="32" height="18" fill="#0072CE"/><text x="50" y="37" text-anchor="middle" fill="#FFFFFF" font-size="11" font-weight="900" font-family="sans-serif">UTS</text>') },
  { file: 'australia_0038_university_of_the_sunshine_coast.svg', svg: makeCrest('#006699', '#FFFFFF', '#F58220', 'UniSC', 'SUNSHINE', null, '<circle cx="50" cy="32" r="9" fill="#F58220"/><path d="M42 34C46 30 54 30 58 34" stroke="#FFFFFF" stroke-width="2"/>') },
  { file: 'australia_0039_university_of_western_australia.svg', svg: makeCrest('#002B49', '#FFFFFF', '#CBA052', 'UWA', 'PERTH', null, '<circle cx="50" cy="32" r="9" fill="#CBA052"/><path d="M44 28C52 28 54 36 46 38" stroke="#002B49" stroke-width="2" fill="none"/>') },
  { file: 'australia_0040_university_of_wollongong.svg', svg: makeCrest('#002C6C', '#FFFFFF', '#EE3124', 'UOW', 'WOLLONGONG', null, '<circle cx="50" cy="32" r="9" fill="#EE3124"/><path d="M42 34C46 30 54 30 58 34" stroke="#FFFFFF" stroke-width="2"/>') },
  { file: 'australia_0041_victoria_university.svg', svg: makeCrest('#003399', '#FFFFFF', '#FFCC00', 'VU', 'MELBOURNE', null, '<circle cx="50" cy="32" r="9" fill="#FFCC00"/><path d="M44 26L50 38L56 26" stroke="#003399" stroke-width="2.5" fill="none"/>') },
  { file: 'australia_0042_western_sydney_university.svg', svg: makeCrest('#990000', '#FFFFFF', '#FFFFFF', 'WESTERN', 'SYDNEY', null, '<rect x="36" y="24" width="28" height="18" rx="2" fill="#FFFFFF"/><text x="50" y="37" text-anchor="middle" fill="#990000" font-size="12" font-weight="900" font-family="sans-serif">W</text>') }
];

let created = 0;
list.forEach(item => {
  const p = path.join(DIR, item.file);
  fs.writeFileSync(p, item.svg, 'utf8');
  created++;
});

console.log(`Created ${created} Australian university logo SVGs in ${DIR}`);

