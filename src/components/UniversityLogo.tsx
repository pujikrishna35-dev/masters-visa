import React from 'react';

interface Props {
  type: 'oxford' | 'cambridge' | 'toronto' | 'melbourne' | 'stanford' | 'auckland' | 'harvard' | 'mit' | 'uc' | 'caltech' | 'imperial' | 'lse' | 'ucl' | 'ubc' | 'mcgill' | 'alberta' | 'waterloo' | 'sydney' | 'unsw' | 'anu' | 'monash' | 'uq' | 'tum' | 'sorbonne' | 'tudelft' | 'trinity' | 'kth' | 'polimi' | 'otago' | 'victoria_wgtn' | 'canterbury' | 'aut' | 'massey' | 'polytechnique' | 'hec' | 'sciencespo' | 'ens' | 'insead' | 'ucd' | 'galway' | 'ucc' | 'dcu' | 'ul' | 'heidelberg' | 'rwth' | 'tuberlin' | 'kit' | 'lmu' | (string & {});
  logoUrl?: string;
  alt?: string;
  className?: string;
}

export const UniversityLogo: React.FC<Props> = ({ type, logoUrl, alt, className = "w-12 h-12" }) => {
  const [imgError, setImgError] = React.useState(false);

  const candidateUrl =
    logoUrl ||
    (typeof type === 'string' &&
    (type.startsWith('/') ||
      type.endsWith('.png') ||
      type.endsWith('.svg') ||
      type.endsWith('.jpg') ||
      type.endsWith('.webp'))
      ? type
      : undefined);

  if (candidateUrl && !imgError) {
    return (
      <img
        src={candidateUrl}
        alt={alt || `${type} logo`}
        loading="lazy"
        decoding="async"
        onError={() => setImgError(true)}
        className={`${className} object-contain`}
      />
    );
  }

  switch (type) {
    case 'ubc':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* UBC Shield: Pacific Blue with Setting Sun and Ocean Waves */}
          <path d="M18 12H82V48C82 74 50 90 50 90C50 90 18 74 18 48V12Z" fill="#002145" />
          {/* Upper Chief */}
          <path d="M18 12H82V32H18V12Z" fill="#001833" />
          <path d="M18 32H82" stroke="#FFFFFF" strokeWidth="1.5" />
          {/* Ocean Waves */}
          <path d="M22 45C30 42 40 48 50 45C60 42 70 48 78 45" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M22 55C30 52 40 58 50 55C60 52 70 58 78 55" stroke="#0055B7" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M26 65C34 62 42 67 50 65C58 62 66 67 74 65" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          {/* Golden Setting Sun radiating behind waves */}
          <circle cx="50" cy="42" r="14" fill="#E8B007" />
          <circle cx="50" cy="42" r="11" fill="#FFCC00" />
          {/* UBC Monogram */}
          <text x="50" y="27" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">UBC</text>
        </svg>
      );
    case 'mcgill':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* McGill University Classic Crimson Shield */}
          <path d="M18 12H82V48C82 74 50 90 50 90C50 90 18 74 18 48V12Z" fill="#ED1B2F" />
          <path d="M24 16H76V48C76 68 50 82 50 82C50 82 24 68 24 48V16Z" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.4" />
          {/* Open Book */}
          <rect x="36" y="24" width="28" height="18" rx="2" fill="#FFFFFF" />
          <path d="M50 24V42" stroke="#ED1B2F" strokeWidth="1.5" />
          <path d="M40 28H47M40 33H47M53 28H60M53 33H60" stroke="#ED1B2F" strokeWidth="1" strokeLinecap="round" />
          {/* Three Silver Martlets (Birds) in V-formation */}
          <path d="M35 52C32 50 30 53 35 57C40 55 38 51 35 52Z" fill="#FFFFFF" />
          <path d="M65 52C62 50 60 53 65 57C70 55 68 51 65 52Z" fill="#FFFFFF" />
          <path d="M50 64C47 62 45 65 50 69C55 67 53 63 50 64Z" fill="#FFFFFF" />
          {/* Crown */}
          <path d="M44 45L47 49L50 45L53 49L56 45L55 52H45L44 45Z" fill="#FFD700" />
        </svg>
      );
    case 'alberta':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* University of Alberta Green and Gold Shield */}
          <path d="M18 12H82V48C82 74 50 90 50 90C50 90 18 74 18 48V12Z" fill="#007C41" />
          {/* Golden Upper Field */}
          <path d="M18 12H82V38H18V12Z" fill="#FFDB00" />
          <path d="M18 38H82" stroke="#FFFFFF" strokeWidth="1.5" />
          {/* Rocky Mountain Peaks in silhouette */}
          <polygon points="26,38 38,20 48,38" fill="#5C5C5C" />
          <polygon points="34,26 38,20 42,26" fill="#FFFFFF" />
          <polygon points="44,38 56,18 68,38" fill="#3D3D3D" />
          <polygon points="52,24 56,18 60,24" fill="#FFFFFF" />
          {/* Golden Wheat Sheaf on green lower field */}
          <path d="M48 48C45 42 40 45 48 58C56 45 51 42 48 48Z" fill="#FFDB00" />
          <rect x="47.5" y="58" width="5" height="16" fill="#FFDB00" rx="1" />
          <path d="M42 62C46 64 54 64 58 62" stroke="#FFDB00" strokeWidth="2" strokeLinecap="round" />
          {/* UAlberta Monogram */}
          <text x="50" y="84" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">U OF A</text>
        </svg>
      );
    case 'waterloo':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* University of Waterloo Black, Gold & Red Shield */}
          <path d="M18 12H82V48C82 74 50 90 50 90C50 90 18 74 18 48V12Z" fill="#000000" />
          {/* Gold Chevron */}
          <polygon points="18,32 50,56 82,32 82,44 50,68 18,44" fill="#FFD54F" />
          {/* Red Lions / Martlets on black fields */}
          <circle cx="34" cy="22" r="6" fill="#E53935" />
          <circle cx="66" cy="22" r="6" fill="#E53935" />
          <circle cx="50" cy="74" r="5" fill="#E53935" />
          {/* Waterloo W Monogram */}
          <text x="50" y="52" textAnchor="middle" fill="#000000" fontSize="16" fontWeight="900" fontFamily="sans-serif">W</text>
        </svg>
      );
    case 'imperial':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Imperial College London Shield */}
          <path d="M18 14H82V48C82 72 50 90 50 90C50 90 18 72 18 48V14Z" fill="#002147" />
          <path d="M24 18H76V48C76 68 50 82 50 82C50 82 24 68 24 48V18Z" stroke="#0099FF" strokeWidth="1.5" />
          {/* Queen's Tower Silhouette */}
          <rect x="44" y="24" width="12" height="38" rx="1.5" fill="#FFFFFF" />
          <polygon points="44,24 50,15 56,24" fill="#D4AF37" />
          <rect x="42" y="32" width="16" height="3" fill="#D4AF37" />
          <rect x="47" y="28" width="6" height="7" rx="1" fill="#002147" />
          <rect x="47" y="40" width="6" height="12" rx="1" fill="#002147" />
          {/* Imperial Laurels */}
          <path d="M28 58C34 68 66 68 72 58" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'lse':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* LSE Iconic Red Square Monogram */}
          <rect width="100" height="100" rx="18" fill="#D0021B" />
          {/* Interlocking LSE Letters */}
          <text x="50" y="58" textAnchor="middle" fill="#FFFFFF" fontSize="30" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">LSE</text>
          {/* Beaver motif & open book underline */}
          <path d="M24 68H76" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="50" cy="76" r="3" fill="#FFD700" />
          <path d="M35 76L42 76" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
          <path d="M58 76L65 76" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'ucl':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* UCL Neoclassical Portico Shield */}
          <path d="M18 12H82V48C82 74 50 90 50 90C50 90 18 74 18 48V12Z" fill="#1C0F38" />
          {/* Wilkins Building Dome & Columns */}
          <path d="M35 32C35 23 41 18 50 18C59 18 65 23 65 32H35Z" fill="#8C1D40" />
          <polygon points="26,35 50,22 74,35" fill="#D4AF37" />
          <rect x="24" y="35" width="52" height="4" fill="#D4AF37" />
          {/* Classical Columns */}
          <rect x="28" y="39" width="5" height="28" fill="#FFFFFF" rx="1" />
          <rect x="38" y="39" width="5" height="28" fill="#FFFFFF" rx="1" />
          <rect x="47.5" y="39" width="5" height="28" fill="#FFFFFF" rx="1" />
          <rect x="57" y="39" width="5" height="28" fill="#FFFFFF" rx="1" />
          <rect x="67" y="39" width="5" height="28" fill="#FFFFFF" rx="1" />
          {/* Base */}
          <rect x="24" y="67" width="52" height="5" fill="#D4AF37" rx="1" />
          {/* UCL text */}
          <text x="50" y="82" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">UCL</text>
        </svg>
      );
    case 'harvard':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Harvard Crimson Shield */}
          <path d="M15 12C15 12 50 8 50 8C50 8 85 12 85 12V52C85 75 50 92 50 92C50 92 15 75 15 52V12Z" fill="#A51C30" />
          <path d="M20 16C20 16 50 12.5 50 12.5C50 12.5 80 16 80 16V50C80 70 50 85 50 85C50 85 20 70 20 50V16Z" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.3" />
          {/* Top Left Book (VE) */}
          <rect x="26" y="24" width="20" height="15" rx="1.5" fill="#FFFFFF" />
          <text x="36" y="35" textAnchor="middle" fill="#A51C30" fontSize="9" fontWeight="bold" fontFamily="serif">VE</text>
          {/* Top Right Book (RI) */}
          <rect x="54" y="24" width="20" height="15" rx="1.5" fill="#FFFFFF" />
          <text x="64" y="35" textAnchor="middle" fill="#A51C30" fontSize="9" fontWeight="bold" fontFamily="serif">RI</text>
          {/* Bottom Center Book (TAS) */}
          <rect x="40" y="46" width="20" height="15" rx="1.5" fill="#FFFFFF" />
          <text x="50" y="57" textAnchor="middle" fill="#A51C30" fontSize="8" fontWeight="bold" fontFamily="serif">TAS</text>
          {/* Subtle Laurel Sprig */}
          <path d="M30 72C38 78 62 78 70 72" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
        </svg>
      );
    case 'mit':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="16" fill="#750014" />
          {/* Distinctive MIT Architectural Pillar Monogram */}
          <rect x="18" y="28" width="8" height="44" fill="#FFFFFF" rx="1.5" />
          <rect x="30" y="28" width="8" height="44" fill="#FFFFFF" rx="1.5" />
          <rect x="42" y="28" width="8" height="26" fill="#CBD5E1" rx="1.5" />
          <rect x="54" y="28" width="8" height="44" fill="#FFFFFF" rx="1.5" />
          <rect x="66" y="28" width="20" height="8" fill="#CBD5E1" rx="1.5" />
          <rect x="72" y="38" width="8" height="34" fill="#FFFFFF" rx="1.5" />
        </svg>
      );
    case 'uc':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#003262" />
          <circle cx="50" cy="50" r="41" stroke="#FDB515" strokeWidth="2.5" />
          <path d="M50 18V26M50 74V82M18 50H26M74 50H82M27 27L33 33M67 67L73 73M27 73L33 67M67 33L73 27" stroke="#FDB515" strokeWidth="2" strokeLinecap="round" />
          <path d="M34 44C34 44 42 41 50 44C58 41 66 44 66 44V64C66 64 58 61 50 64C42 61 34 64 34 64V44Z" fill="#FFFFFF" />
          <path d="M50 44V64" stroke="#003262" strokeWidth="2" />
          <polygon points="50,30 52,35 57,36 53,40 54,45 50,42 46,45 47,40 43,36 48,35" fill="#FDB515" />
        </svg>
      );
    case 'caltech':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="16" fill="#FF6C0C" />
          <circle cx="50" cy="50" r="38" fill="#002B49" />
          <ellipse cx="50" cy="50" rx="30" ry="12" stroke="#FF6C0C" strokeWidth="1.5" transform="rotate(-30 50 50)" opacity="0.75" />
          <ellipse cx="50" cy="50" rx="30" ry="12" stroke="#FF6C0C" strokeWidth="1.5" transform="rotate(30 50 50)" opacity="0.75" />
          <path d="M50 25C47 33 42 38 42 44C42 50 46 54 50 54C54 54 58 50 58 44C58 38 53 33 50 25Z" fill="#FDB515" />
          <path d="M50 32C48 37 45 41 45 45C45 48 47 51 50 51C53 51 55 48 55 45C55 41 52 37 50 32Z" fill="#FF6C0C" />
          <path d="M46 55H54L52 70H48L46 55Z" fill="#E2E8F0" />
        </svg>
      );
    case 'oxford':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path d="M50 8C30 8 18 16 18 36C18 64 50 92 50 92C50 92 82 64 82 36C82 16 70 8 50 8Z" fill="#002147"/>
          <path d="M50 14C34 14 24 20 24 38C24 60 50 84 50 84C50 84 76 60 76 38C76 20 66 14 50 14Z" stroke="#D4AF37" strokeWidth="2.5"/>
          {/* Open Book */}
          <rect x="34" y="34" width="32" height="24" rx="2" fill="#FFFFFF"/>
          <path d="M50 34V58" stroke="#002147" strokeWidth="2"/>
          <path d="M38 40H46M38 46H46M38 52H44M54 40H62M54 46H62M54 52H60" stroke="#002147" strokeWidth="1.5" strokeLinecap="round"/>
          {/* Crowns */}
          <path d="M42 22L45 27L50 22L55 27L58 22L56 29H44L42 22Z" fill="#D4AF37"/>
          <path d="M38 65L40 68L44 65L48 68L50 65L49 70H39L38 65Z" fill="#D4AF37"/>
          <path d="M50 65L52 68L56 65L60 68L62 65L61 70H51L50 65Z" fill="#D4AF37"/>
        </svg>
      );
    case 'cambridge':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path d="M20 12H80V45C80 72 50 90 50 90C50 90 20 72 20 45V12Z" fill="#A81C26"/>
          {/* White Cross */}
          <rect x="42" y="12" width="16" height="78" fill="#FFFFFF"/>
          <rect x="20" y="36" width="60" height="16" fill="#FFFFFF"/>
          {/* Golden Lions */}
          <circle cx="32" cy="25" r="5" fill="#D4AF37"/>
          <circle cx="68" cy="25" r="5" fill="#D4AF37"/>
          <circle cx="32" cy="62" r="5" fill="#D4AF37"/>
          <circle cx="68" cy="62" r="5" fill="#D4AF37"/>
          <rect x="44" y="38" width="12" height="12" fill="#A81C26"/>
        </svg>
      );
    case 'toronto':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path d="M22 14H78V48C78 72 50 90 50 90C50 90 22 72 22 48V14Z" fill="#002A5C"/>
          <path d="M26 18H74V48C74 68 50 84 50 84C50 84 26 68 26 48V18Z" stroke="#FFFFFF" strokeWidth="2"/>
          {/* Crown and Tree motif */}
          <path d="M38 30L44 36L50 28L56 36L62 30L60 40H40L38 30Z" fill="#D4AF37"/>
          <circle cx="50" cy="58" r="14" fill="#FFFFFF" fillOpacity="0.2"/>
          <path d="M50 48L58 64H42L50 48Z" fill="#FFFFFF"/>
          <rect x="48" y="64" width="4" height="6" fill="#FFFFFF"/>
        </svg>
      );
    case 'melbourne':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path d="M20 14H80V46C80 72 50 90 50 90C50 90 20 72 20 46V14Z" fill="#092552"/>
          {/* Winged Victory / Stars */}
          <path d="M35 32C42 28 58 28 65 32C62 44 58 56 50 72C42 56 38 44 35 32Z" fill="#D4AF37" fillOpacity="0.9"/>
          <polygon points="50,22 53,28 59,29 55,34 56,40 50,37 44,40 45,34 41,29 47,28" fill="#FFFFFF"/>
          <circle cx="50" cy="52" r="3" fill="#FFFFFF"/>
          <circle cx="42" cy="44" r="2.5" fill="#FFFFFF"/>
          <circle cx="58" cy="44" r="2.5" fill="#FFFFFF"/>
        </svg>
      );
    case 'stanford':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <rect width="100" height="100" rx="16" fill="#8C1515"/>
          {/* Block S */}
          <text x="50" y="74" textAnchor="middle" fill="#FFFFFF" fontSize="68" fontWeight="bold" fontFamily="serif">S</text>
          {/* Redwood Tree Silhouette in center */}
          <path d="M50 24L55 35H52L57 46H53L58 58H42L47 46H43L48 35H45L50 24Z" fill="#005A36"/>
          <rect x="48.5" y="58" width="3" height="8" fill="#005A36"/>
        </svg>
      );
    case 'auckland':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none">
          <path d="M22 14H78V48C78 72 50 90 50 90C50 90 22 72 22 48V14Z" fill="#00356B"/>
          <path d="M30 36H70V38H30V36Z" fill="#D4AF37"/>
          {/* Southern cross stars */}
          <polygon points="50,24 52,28 56,29 53,32 54,36 50,34 46,36 47,32 44,29 48,28" fill="#D4AF37"/>
          <rect x="36" y="48" width="28" height="20" rx="2" fill="#FFFFFF"/>
          <path d="M50 48V68" stroke="#00356B" strokeWidth="2"/>
        </svg>
      );
    case 'sydney':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* University of Sydney Classic Shield: Silver/White with Red Cross & Golden Lion */}
          <path d="M20 14H80V46C80 72 50 90 50 90C50 90 20 72 20 46V14Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          {/* Saint George Cross in deep Crimson */}
          <path d="M42 14H58V90C55 89 53 88 50 86C47 88 45 89 42 90V14Z" fill="#E61C24" />
          <path d="M20 36H80V52H20V36Z" fill="#E61C24" />
          {/* Open Book in center with gold clasps */}
          <rect x="36" y="38" width="28" height="18" rx="2" fill="#FFFFFF" />
          <path d="M50 38V56" stroke="#E61C24" strokeWidth="1.5" />
          <path d="M40 43H46M40 48H46M54 43H60M54 48H60" stroke="#000000" strokeWidth="1" strokeLinecap="round" />
          {/* Golden Lion Passant Guardant at top */}
          <rect x="24" y="16" width="52" height="16" rx="2" fill="#FFC72C" />
          <circle cx="36" cy="24" r="4.5" fill="#E61C24" />
          <circle cx="64" cy="24" r="4.5" fill="#E61C24" />
          <path d="M44 24H56" stroke="#E61C24" strokeWidth="2" strokeLinecap="round" />
          {/* Latin stars (mullets) */}
          <polygon points="50,70 52,74 56,74 53,77 54,81 50,79 46,81 47,77 44,74 48,74" fill="#FFC72C" />
        </svg>
      );
    case 'unsw':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* UNSW Sydney Gold & Black Shield */}
          <path d="M20 14H80V46C80 72 50 90 50 90C50 90 20 72 20 46V14Z" fill="#000000" />
          <path d="M22 16H78V46C78 70 50 87 50 87C50 87 22 70 22 46V16Z" stroke="#FFE600" strokeWidth="2" />
          {/* Golden Lion Rampant holding an open book */}
          <rect x="28" y="22" width="44" height="42" rx="4" fill="#FFE600" />
          <circle cx="44" cy="34" r="5" fill="#000000" />
          <path d="M48 38C52 38 56 42 56 48L54 58H44L46 48C46 44 44 42 40 44" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
          <rect x="36" y="52" width="28" height="14" rx="2" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
          <text x="50" y="80" textAnchor="middle" fill="#FFE600" fontSize="11" fontWeight="900" fontFamily="sans-serif">UNSW</text>
        </svg>
      );
    case 'anu':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Australian National University Navy & Gold Shield */}
          <path d="M20 14H80V46C80 72 50 90 50 90C50 90 20 72 20 46V14Z" fill="#002B49" />
          {/* Golden Chief with Boomerang & Southern Cross */}
          <path d="M20 14H80V38H20V14Z" fill="#BE830E" />
          <path d="M20 38H80" stroke="#FFFFFF" strokeWidth="1.5" />
          {/* Boomerang / Wave motif in gold */}
          <path d="M30 26C42 20 58 20 70 26C60 30 40 30 30 26Z" fill="#002B49" />
          {/* Open Book in lower navy field */}
          <rect x="34" y="48" width="32" height="20" rx="2" fill="#FFFFFF" />
          <path d="M50 48V68" stroke="#002B49" strokeWidth="2" />
          <text x="50" y="82" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">ANU</text>
        </svg>
      );
    case 'monash':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Monash University Classic Deep Blue & White Shield */}
          <path d="M20 14H80V46C80 72 50 90 50 90C50 90 20 72 20 46V14Z" fill="#006DAE" />
          <path d="M24 18H76V46C76 68 50 84 50 84C50 84 24 68 24 46V18Z" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.4" />
          {/* Sword of Truth pointing upwards */}
          <path d="M50 24V64M44 32H56" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          {/* Open Book in background */}
          <rect x="30" y="38" width="40" height="24" rx="2" fill="#FFFFFF" fillOpacity="0.25" stroke="#FFFFFF" strokeWidth="1.5" />
          {/* Monash M monogram */}
          <text x="50" y="80" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="900" fontFamily="sans-serif">MONASH</text>
        </svg>
      );
    case 'uq':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* University of Queensland Purple and Gold Shield */}
          <path d="M20 14H80V46C80 72 50 90 50 90C50 90 20 72 20 46V14Z" fill="#51247A" />
          <path d="M24 18H76V46C76 68 50 84 50 84C50 84 24 68 24 46V18Z" stroke="#D7B56D" strokeWidth="2" />
          {/* Gold Saint Andrew Cross with Open Book */}
          <line x1="28" y1="22" x2="72" y2="68" stroke="#D7B56D" strokeWidth="4" />
          <line x1="72" y1="22" x2="28" y2="68" stroke="#D7B56D" strokeWidth="4" />
          <rect x="36" y="36" width="28" height="18" rx="2" fill="#FFFFFF" />
          <path d="M50 36V54" stroke="#51247A" strokeWidth="1.5" />
          <text x="50" y="80" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900" fontFamily="sans-serif">UQ</text>
        </svg>
      );
    case 'tum':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Technical University of Munich TUM Blue Square with Tower Crest */}
          <rect width="100" height="100" rx="18" fill="#0065BD" />
          {/* TUM Geometric Monogram: T, U, M intertwined */}
          <path d="M18 28H42V36H34V72H26V36H18V28Z" fill="#FFFFFF" />
          <path d="M46 28H54V62C54 68 58 72 64 72C70 72 74 68 74 62V28H82V62C82 74 74 80 64 80C54 80 46 74 46 62V28Z" fill="#FFFFFF" />
        </svg>
      );
    case 'sorbonne':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Sorbonne University Paris Imperial Gold and Deep Navy Shield */}
          <path d="M20 14H80V46C80 72 50 90 50 90C50 90 20 72 20 46V14Z" fill="#172B4D" />
          <path d="M24 18H76V46C76 68 50 84 50 84C50 84 24 68 24 46V18Z" stroke="#E3B341" strokeWidth="2" />
          {/* Sorbonne Neoclassical Chapel Dome */}
          <path d="M35 34C35 24 42 18 50 18C58 18 65 24 65 34H35Z" fill="#E3B341" />
          <rect x="47" y="14" width="6" height="5" fill="#E3B341" />
          <rect x="28" y="34" width="44" height="4" fill="#E3B341" />
          {/* Three Fleur-de-lis */}
          <circle cx="50" cy="52" r="4.5" fill="#FFFFFF" />
          <circle cx="36" cy="46" r="3.5" fill="#FFFFFF" />
          <circle cx="64" cy="46" r="3.5" fill="#FFFFFF" />
          <text x="50" y="78" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5">SORBONNE</text>
        </svg>
      );
    case 'tudelft':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* TU Delft Signature Cyan Geometric Emblem */}
          <rect width="100" height="100" rx="18" fill="#00A6D6" />
          {/* Prometheus Flame & Stylized T */}
          <path d="M22 30H78V38H54V76H46V38H22V30Z" fill="#FFFFFF" />
          <path d="M50 18C50 18 54 22 54 25C54 27 52 29 50 29C48 29 46 27 46 25C46 22 50 18 50 18Z" fill="#FFC800" />
          <text x="50" y="88" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900" fontFamily="sans-serif">DELFT</text>
        </svg>
      );
    case 'trinity':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Trinity College Dublin Royal Blue & Gold Shield with Lion, Castle & Harp */}
          <path d="M20 14H80V46C80 72 50 90 50 90C50 90 20 72 20 46V14Z" fill="#0C2340" />
          <path d="M24 18H76V46C76 68 50 84 50 84C50 84 24 68 24 46V18Z" stroke="#FDB913" strokeWidth="2" />
          {/* Castle motif in top-left */}
          <rect x="32" y="26" width="14" height="12" fill="#FFFFFF" />
          <rect x="30" y="24" width="4" height="4" fill="#FFFFFF" />
          <rect x="42" y="24" width="4" height="4" fill="#FFFFFF" />
          {/* Irish Harp in bottom-center */}
          <path d="M46 50C46 50 56 46 56 56C56 66 48 68 48 68H44L46 50Z" fill="#FDB913" />
          <path d="M48 52L53 66M50 52L52 64" stroke="#0C2340" strokeWidth="1" />
          {/* Golden Lion Passant top-right */}
          <rect x="54" y="28" width="16" height="8" rx="2" fill="#FDB913" />
        </svg>
      );
    case 'kth':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* KTH Royal Institute of Technology Royal Blue and Golden Crown */}
          <circle cx="50" cy="50" r="46" fill="#1954A6" />
          <circle cx="50" cy="50" r="40" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" />
          {/* Swedish Three Crowns Motif */}
          <path d="M38 34L40 38L44 34L48 38L50 34L49 42H39L38 34Z" fill="#FDB913" />
          <path d="M50 34L52 38L56 34L60 38L62 34L61 42H51L50 34Z" fill="#FDB913" />
          <path d="M44 48L46 52L50 48L54 52L56 48L55 56H45L44 48Z" fill="#FDB913" />
          {/* KTH Text */}
          <text x="50" y="74" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">KTH</text>
        </svg>
      );
    case 'polimi':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Politecnico di Milano Classic Seal in Dark Slate and Gold */}
          <circle cx="50" cy="50" r="46" fill="#1C2D42" />
          <circle cx="50" cy="50" r="40" stroke="#D1AC00" strokeWidth="2" />
          {/* Da Vinci Vitruvian / Geometric Rays */}
          <circle cx="50" cy="46" r="16" stroke="#FFFFFF" strokeWidth="1.5" />
          <rect x="36" y="32" width="28" height="28" stroke="#D1AC00" strokeWidth="1.5" />
          <line x1="28" y1="24" x2="72" y2="68" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
          <line x1="72" y1="24" x2="28" y2="68" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
          <text x="50" y="80" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">POLIMI</text>
        </svg>
      );
    case 'otago':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* University of Otago Royal Blue & Gold Heraldic Shield */}
          <path d="M20 14H80V46C80 72 50 90 50 90C50 90 20 72 20 46V14Z" fill="#002F6C" />
          <path d="M24 18H76V46C76 68 50 84 50 84C50 84 24 68 24 46V18Z" stroke="#EAA123" strokeWidth="2" />
          {/* Golden St. Andrew's Saltire Cross */}
          <line x1="26" y1="20" x2="74" y2="80" stroke="#EAA123" strokeWidth="6" strokeLinecap="round" />
          <line x1="74" y1="20" x2="26" y2="80" stroke="#EAA123" strokeWidth="6" strokeLinecap="round" />
          {/* Four Golden Mullets (8-pointed stars) in the quarters */}
          <polygon points="50,22 52,26 56,26 53,29 54,33 50,31 46,33 47,29 44,26 48,26" fill="#FFFFFF" />
          <polygon points="50,68 52,72 56,72 53,75 54,79 50,77 46,79 47,75 44,72 48,72" fill="#FFFFFF" />
          <polygon points="32,46 34,50 38,50 35,53 36,57 32,55 28,57 29,53 26,50 30,50" fill="#FFFFFF" />
          <polygon points="68,46 70,50 74,50 71,53 72,57 68,55 64,57 65,53 62,50 66,50" fill="#FFFFFF" />
          {/* Central Open Book */}
          <rect x="42" y="44" width="16" height="12" rx="1.5" fill="#FFFFFF" />
          <path d="M50 44V56" stroke="#002F6C" strokeWidth="1.5" />
        </svg>
      );
    case 'victoria_wgtn':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Victoria University of Wellington Heritage Forest Green & Gold Shield */}
          <path d="M20 14H80V46C80 72 50 90 50 90C50 90 20 72 20 46V14Z" fill="#004D25" />
          <path d="M24 18H76V46C76 68 50 84 50 84C50 84 24 68 24 46V18Z" stroke="#C9A050" strokeWidth="2" />
          {/* Three Royal Crowns of Victoria */}
          <path d="M36 30L38 34L42 30L46 34L48 30L47 38H37L36 30Z" fill="#C9A050" />
          <path d="M52 30L54 34L58 30L62 34L64 30L63 38H53L52 30Z" fill="#C9A050" />
          <path d="M44 46L46 50L50 46L54 50L56 46L55 54H45L44 46Z" fill="#C9A050" />
          {/* Open Book in base */}
          <rect x="36" y="62" width="28" height="16" rx="2" fill="#FFFFFF" />
          <path d="M50 62V78" stroke="#004D25" strokeWidth="1.5" />
          <path d="M40 66H46M40 70H46M54 66H60M54 70H60" stroke="#004D25" strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case 'canterbury':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* University of Canterbury Red and Black Christchurch Crest */}
          <path d="M20 14H80V46C80 72 50 90 50 90C50 90 20 72 20 46V14Z" fill="#A71930" />
          <path d="M24 18H76V46C76 68 50 84 50 84C50 84 24 68 24 46V18Z" stroke="#FFFFFF" strokeWidth="2" />
          {/* Inverted Black Chevron / Cross */}
          <path d="M24 48L50 66L76 48V36L50 54L24 36V48Z" fill="#1C1C1C" />
          {/* Golden Open Book on red field */}
          <rect x="38" y="24" width="24" height="15" rx="1.5" fill="#FFFFFF" />
          <path d="M50 24V39" stroke="#A71930" strokeWidth="1.5" />
          {/* Golden Fleece / Crest Symbol */}
          <circle cx="50" cy="74" r="5" fill="#FFC82E" />
          <path d="M47 79C47 79 50 82 53 79" stroke="#FFC82E" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'aut':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* AUT Auckland University of Technology Modern Sleek Monogram */}
          <rect width="100" height="100" rx="18" fill="#1A1A1A" />
          {/* Red Accent Bar */}
          <rect x="18" y="22" width="64" height="4" rx="2" fill="#E62B1E" />
          {/* Modern Bold Monogram */}
          <text x="50" y="62" textAnchor="middle" fill="#FFFFFF" fontSize="28" fontWeight="900" fontFamily="sans-serif" letterSpacing="2">AUT</text>
          {/* Subtitle */}
          <text x="50" y="78" textAnchor="middle" fill="#E62B1E" fontSize="9" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">NEW ZEALAND</text>
        </svg>
      );
    case 'massey':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Massey University Royal Blue & Gold Crest */}
          <path d="M20 14H80V46C80 72 50 90 50 90C50 90 20 72 20 46V14Z" fill="#002D62" />
          <path d="M24 18H76V46C76 68 50 84 50 84C50 84 24 68 24 46V18Z" stroke="#EAA123" strokeWidth="2" />
          {/* Golden Ram's Horn / Agriculture / Science Crest */}
          <circle cx="50" cy="38" r="12" fill="#EAA123" />
          <circle cx="50" cy="38" r="8" fill="#002D62" />
          <path d="M42 38C42 43 46 47 50 47C54 47 58 43 58 38" stroke="#EAA123" strokeWidth="2" />
          {/* Chevron and Stars */}
          <polygon points="50,58 52,62 56,62 53,65 54,69 50,67 46,69 47,65 44,62 48,62" fill="#FFFFFF" />
          <text x="50" y="80" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">MASSEY</text>
        </svg>
      );
    case 'polytechnique':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* École Polytechnique Deep Navy & Gold Crest with Crossed Cannons (L'X) */}
          <path d="M20 14H80V46C80 72 50 90 50 90C50 90 20 72 20 46V14Z" fill="#002147" />
          <path d="M24 18H76V46C76 68 50 84 50 84C50 84 24 68 24 46V18Z" stroke="#E5B25D" strokeWidth="2" />
          {/* Crossed Golden Cannons forming the iconic X */}
          <line x1="28" y1="26" x2="72" y2="70" stroke="#E5B25D" strokeWidth="5" strokeLinecap="round" />
          <line x1="72" y1="26" x2="28" y2="70" stroke="#E5B25D" strokeWidth="5" strokeLinecap="round" />
          {/* Central Flaming Bomb / Sun of Knowledge */}
          <circle cx="50" cy="48" r="8" fill="#D32F2F" />
          <circle cx="50" cy="48" r="5" fill="#E5B25D" />
          <text x="50" y="80" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">POLYTECHNIQUE</text>
        </svg>
      );
    case 'hec':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* HEC Paris Bold Crimson and French Navy Emblem */}
          <rect width="100" height="100" rx="18" fill="#141E30" />
          <path d="M16 20H84V24H16V20Z" fill="#C8102E" />
          {/* Stylized HEC Monogram */}
          <text x="50" y="60" textAnchor="middle" fill="#FFFFFF" fontSize="26" fontWeight="900" fontFamily="sans-serif" letterSpacing="2">HEC</text>
          <text x="50" y="78" textAnchor="middle" fill="#C8102E" fontSize="9" fontWeight="bold" fontFamily="sans-serif" letterSpacing="3">PARIS</text>
        </svg>
      );
    case 'sciencespo':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Sciences Po Signature Rouge Crimson & White Emblem */}
          <rect width="100" height="100" rx="18" fill="#E2001A" />
          {/* Classic Lion & Fox Profile Silhouette */}
          <circle cx="50" cy="44" r="22" fill="#FFFFFF" />
          <path d="M42 34C45 32 50 32 54 36C56 38 58 44 54 48L46 54H58" stroke="#E2001A" strokeWidth="3" strokeLinecap="round" />
          <text x="50" y="80" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">SCIENCES PO</text>
        </svg>
      );
    case 'ens':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* École Normale Supérieure (ENS Ulm) Paris Classical Seal */}
          <circle cx="50" cy="50" r="46" fill="#0C2340" />
          <circle cx="50" cy="50" r="40" stroke="#C59B27" strokeWidth="2" />
          {/* Torch of Enlightenment & Laurel Wreath */}
          <path d="M50 26L52 38H48L50 26Z" fill="#C59B27" />
          <path d="M47 24C47 24 50 20 50 20C50 20 53 24 53 24C53 26 50 28 50 28C50 28 47 26 47 24Z" fill="#D32F2F" />
          <path d="M35 50C35 58 42 64 50 64C58 64 65 58 65 50" stroke="#C59B27" strokeWidth="2" strokeLinecap="round" />
          <text x="50" y="78" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="serif" letterSpacing="2">ENS</text>
        </svg>
      );
    case 'insead':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* INSEAD Global Executive Emblem in Emerald Forest Green */}
          <circle cx="50" cy="50" r="46" fill="#005A36" />
          <circle cx="50" cy="50" r="40" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="4 2" />
          <text x="50" y="58" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">INSEAD</text>
          <text x="50" y="74" textAnchor="middle" fill="#B4E5A2" fontSize="7" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5">THE BUSINESS SCHOOL</text>
        </svg>
      );
    case 'ucd':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* UCD Dublin St. Patrick's Navy Blue & Gold Heraldic Shield with Irish Harp */}
          <path d="M20 14H80V46C80 72 50 90 50 90C50 90 20 72 20 46V14Z" fill="#002A54" />
          <path d="M24 18H76V46C76 68 50 84 50 84C50 84 24 68 24 46V18Z" stroke="#DFAC29" strokeWidth="2" />
          {/* Traditional Golden Celtic Harp */}
          <path d="M46 32C46 32 58 28 58 40C58 52 48 56 48 56H42L46 32Z" fill="#DFAC29" />
          <path d="M48 35L54 52M51 35L53 50" stroke="#002A54" strokeWidth="1.5" />
          {/* UCD Text Banner */}
          <rect x="30" y="66" width="40" height="12" rx="2" fill="#DFAC29" />
          <text x="50" y="76" textAnchor="middle" fill="#002A54" fontSize="10" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">UCD</text>
        </svg>
      );
    case 'galway':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* University of Galway Maroon & Gold Historic Quadrangle Crest */}
          <path d="M20 14H80V46C80 72 50 90 50 90C50 90 20 72 20 46V14Z" fill="#800020" />
          <path d="M24 18H76V46C76 68 50 84 50 84C50 84 24 68 24 46V18Z" stroke="#FDB913" strokeWidth="2" />
          {/* Galway Hooked Sailing Ship / Quadrangle motif */}
          <path d="M35 48C35 48 45 42 50 42C55 42 65 48 65 48L50 68L35 48Z" fill="#FDB913" />
          <polygon points="50,26 53,32 59,33 55,38 56,44 50,41 44,44 45,38 41,33 47,32" fill="#FFFFFF" />
          <text x="50" y="80" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5">GALWAY</text>
        </svg>
      );
    case 'ucc':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* UCC University College Cork Red & Golden Yellow Heraldic Shield */}
          <path d="M20 14H80V46C80 72 50 90 50 90C50 90 20 72 20 46V14Z" fill="#C8102E" />
          <path d="M24 18H76V46C76 68 50 84 50 84C50 84 24 68 24 46V18Z" stroke="#FFCD00" strokeWidth="2" />
          {/* Royal Coronet in chief */}
          <path d="M38 30L41 35L45 30L49 35L52 30L51 38H39L38 30Z" fill="#FFCD00" />
          <path d="M52 30L55 35L59 30L63 35L66 30L65 38H53L52 30Z" fill="#FFCD00" />
          {/* Open Book in center */}
          <rect x="36" y="44" width="28" height="16" rx="2" fill="#FFFFFF" />
          <path d="M50 44V60" stroke="#C8102E" strokeWidth="1.5" />
          <text x="50" y="78" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900" fontFamily="sans-serif">UCC</text>
        </svg>
      );
    case 'dcu':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* DCU Dublin City University Modern Teal and Navy Emblem */}
          <rect width="100" height="100" rx="18" fill="#002D42" />
          {/* Interlocking Celtic Waves / Tech lines in bright Teal */}
          <path d="M22 34C32 26 44 26 54 34C64 42 76 42 82 34" stroke="#00A3A6" strokeWidth="4" strokeLinecap="round" />
          <path d="M18 48C28 40 40 40 50 48C60 56 72 56 82 48" stroke="#FDB913" strokeWidth="4" strokeLinecap="round" />
          {/* DCU Bold Monogram */}
          <text x="50" y="78" textAnchor="middle" fill="#FFFFFF" fontSize="22" fontWeight="900" fontFamily="sans-serif" letterSpacing="1.5">DCU</text>
        </svg>
      );
    case 'ul':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* University of Limerick Irish Green and Gold Shield with Shannon River Waves */}
          <path d="M20 14H80V46C80 72 50 90 50 90C50 90 20 72 20 46V14Z" fill="#005A36" />
          <path d="M24 18H76V46C76 68 50 84 50 84C50 84 24 68 24 46V18Z" stroke="#FDB913" strokeWidth="2" />
          {/* Shannon Living Bridge / River wave curve */}
          <path d="M26 44C36 38 46 48 56 42C66 36 74 44 74 44" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <path d="M28 54C38 48 48 58 58 52C68 46 72 54 72 54" stroke="#FDB913" strokeWidth="2.5" strokeLinecap="round" />
          {/* UL Monogram in chief */}
          <text x="50" y="36" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">UL</text>
          <text x="50" y="78" textAnchor="middle" fill="#FDB913" fontSize="8" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">LIMERICK</text>
        </svg>
      );
    case 'heidelberg':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Heidelberg University Historic Burgundy and Gold Seal */}
          <rect width="100" height="100" rx="18" fill="#7A0026" />
          <circle cx="50" cy="50" r="38" stroke="#D4AF37" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M50 20L62 36H38L50 20Z" fill="#D4AF37" />
          <rect x="42" y="38" width="16" height="24" rx="2" fill="#FFFFFF" />
          <path d="M50 38V62" stroke="#7A0026" strokeWidth="1.5" />
          <text x="50" y="78" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">HEIDELBERG</text>
        </svg>
      );
    case 'rwth':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* RWTH Aachen Tech Blue Shield */}
          <rect width="100" height="100" rx="18" fill="#00549F" />
          <path d="M22 28H78V40H22V28Z" fill="#FFFFFF" />
          <path d="M22 46H50V58H22V46Z" fill="#8EBAE5" />
          <path d="M22 64H68V76H22V64Z" fill="#FFFFFF" />
          <text x="75" y="72" textAnchor="end" fill="#FFFFFF" fontSize="12" fontWeight="900" fontFamily="sans-serif">RWTH</text>
        </svg>
      );
    case 'tuberlin':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* TU Berlin Red Emblem */}
          <rect width="100" height="100" rx="18" fill="#C50E1F" />
          <path d="M26 28H44V36H38V72H32V36H26V28Z" fill="#FFFFFF" />
          <path d="M48 28H56V62C56 68 60 72 66 72C72 72 76 68 76 62V28H84V62C84 74 76 80 66 80C56 80 48 74 48 62V28Z" fill="#FFFFFF" />
          <text x="50" y="88" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.5">BERLIN</text>
        </svg>
      );
    case 'kit':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* KIT Green Tech Hexagon */}
          <rect width="100" height="100" rx="18" fill="#009682" />
          <circle cx="50" cy="42" r="18" stroke="#FFFFFF" strokeWidth="4" fill="none" />
          <path d="M50 28L58 42L50 56L42 42L50 28Z" fill="#FFFFFF" />
          <text x="50" y="78" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">KIT</text>
        </svg>
      );
    case 'lmu':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* LMU Munich Forest Green and Gold Shield */}
          <rect width="100" height="100" rx="18" fill="#006633" />
          <path d="M22 22H78V48C78 68 50 82 50 82C50 82 22 68 22 48V22Z" stroke="#FFCC00" strokeWidth="2" fill="none" />
          <text x="50" y="52" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">LMU</text>
          <text x="50" y="70" textAnchor="middle" fill="#FFCC00" fontSize="8" fontWeight="bold" fontFamily="sans-serif">MÜNCHEN</text>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Universal Academic Crest */}
          <rect width="100" height="100" rx="18" fill="#0F172A" />
          <path d="M22 20H78V50C78 72 50 86 50 86C50 86 22 72 22 50V20Z" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
          <polygon points="50,30 68,40 50,50 32,40" fill="#38BDF8" />
          <path d="M40 46V58C40 64 50 67 50 67C50 67 60 64 60 58V46" fill="none" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="68" cy="40" r="3" fill="#F59E0B" />
        </svg>
      );
  }
};
