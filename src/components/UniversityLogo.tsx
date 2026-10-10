import React from 'react';

interface Props {
  type: 'oxford' | 'cambridge' | 'toronto' | 'melbourne' | 'stanford' | 'auckland';
  className?: string;
}

export const UniversityLogo: React.FC<Props> = ({ type, className = "w-12 h-12" }) => {
  switch (type) {
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
  }
};
