import React from 'react';

interface Props {
  country: string;
  className?: string;
}

export const FlagIcon: React.FC<Props> = ({ country, className = "w-5 h-3.5" }) => {
  const c = country.toUpperCase();
  
  if (c === 'USA' || c === 'US') {
    return (
      <svg className={`rounded-sm shadow-xs inline-block shrink-0 ${className}`} viewBox="0 0 640 480">
        <path fill="#bd3d44" d="M0 0h640v480H0z"/>
        <path stroke="#fff" strokeWidth="37" d="M0 55.4h640M0 129.2h640M0 203.1h640M0 276.9h640M0 350.8h640M0 424.6h640"/>
        <path fill="#192f5d" d="M0 0h260v258.5H0z"/>
        {/* Stars */}
        <circle cx="30" cy="30" r="12" fill="#fff"/>
        <circle cx="80" cy="30" r="12" fill="#fff"/>
        <circle cx="130" cy="30" r="12" fill="#fff"/>
        <circle cx="180" cy="30" r="12" fill="#fff"/>
        <circle cx="230" cy="30" r="12" fill="#fff"/>
        <circle cx="55" cy="75" r="12" fill="#fff"/>
        <circle cx="105" cy="75" r="12" fill="#fff"/>
        <circle cx="155" cy="75" r="12" fill="#fff"/>
        <circle cx="205" cy="75" r="12" fill="#fff"/>
      </svg>
    );
  }

  if (c === 'UK' || c === 'GB' || c === 'UNITED KINGDOM') {
    return (
      <svg className={`rounded-sm shadow-xs inline-block shrink-0 ${className}`} viewBox="0 0 640 480">
        <path fill="#012169" d="M0 0h640v480H0z"/>
        <path fill="#FFF" d="m75 0 245 180L565 0h75v60L435 240l205 180v60h-75L320 300 75 480H0v-60l205-180L0 60V0h75z"/>
        <path fill="#C8102E" d="m425 285 215 160v35h-35L390 310l35-25zM215 195 0 35V0h35l215 170-35 25zM640 0v35L425 195l-35-25L605 0h35zM0 445l215-160 35 25L35 480H0v-35z"/>
        <path fill="#FFF" d="M260 0h120v480H260zM0 180h640v120H0z"/>
        <path fill="#C8102E" d="M280 0h80v480H280zM0 200h640v80H0z"/>
      </svg>
    );
  }

  if (c === 'CANADA' || c === 'CA') {
    return (
      <svg className={`rounded-sm shadow-xs inline-block shrink-0 ${className}`} viewBox="0 0 640 480">
        <path fill="#f00" d="M0 0h160v480H0zm480 0h160v480H480z"/>
        <path fill="#fff" d="M160 0h320v480H160z"/>
        <path fill="#f00" d="M320 100l25 60 50-20-20 60 45 20-55 40 10 30-45-15-10 65h-10l-10-65-45 15 10-30-55-40 45-20-20-60 50 20z"/>
      </svg>
    );
  }

  if (c === 'AUSTRALIA' || c === 'AU') {
    return (
      <svg className={`rounded-sm shadow-xs inline-block shrink-0 ${className}`} viewBox="0 0 640 480">
        <path fill="#00008b" d="M0 0h640v480H0z"/>
        {/* Union Jack in canton */}
        <path fill="#fff" d="M0 0h320v240H0z" fillOpacity="0.1"/>
        <path fill="#fff" d="M130 0h60v240h-60zM0 90h320v60H0z"/>
        <path fill="#c00" d="M140 0h40v240h-40zM0 100h320v40H0z"/>
        {/* Southern Cross stars */}
        <circle cx="480" cy="120" r="16" fill="#fff"/>
        <circle cx="560" cy="180" r="16" fill="#fff"/>
        <circle cx="480" cy="360" r="16" fill="#fff"/>
        <circle cx="420" cy="220" r="16" fill="#fff"/>
        <circle cx="520" cy="260" r="12" fill="#fff"/>
        <circle cx="160" cy="360" r="30" fill="#fff"/>
      </svg>
    );
  }

  if (c === 'GERMANY' || c === 'DE') {
    return (
      <svg className={`rounded-sm shadow-xs inline-block shrink-0 ${className}`} viewBox="0 0 640 480">
        <path fill="#000" d="M0 0h640v160H0z"/>
        <path fill="#d00" d="M0 160h640v160H0z"/>
        <path fill="#ffce00" d="M0 320h640v160H0z"/>
      </svg>
    );
  }

  if (c === 'FRANCE' || c === 'FR') {
    return (
      <svg className={`rounded-sm shadow-xs inline-block shrink-0 ${className}`} viewBox="0 0 640 480">
        <path fill="#002654" d="M0 0h213.3v480H0z"/>
        <path fill="#fff" d="M213.3 0h213.4v480H213.3z"/>
        <path fill="#ce1126" d="M426.7 0H640v480H426.7z"/>
      </svg>
    );
  }

  if (c === 'NEW ZEALAND' || c === 'NZ') {
    return (
      <svg className={`rounded-sm shadow-xs inline-block shrink-0 ${className}`} viewBox="0 0 640 480">
        <path fill="#00247d" d="M0 0h640v480H0z"/>
        {/* Red stars with white border */}
        <circle cx="480" cy="120" r="16" fill="#cc142b" stroke="#fff" strokeWidth="4"/>
        <circle cx="560" cy="200" r="16" fill="#cc142b" stroke="#fff" strokeWidth="4"/>
        <circle cx="480" cy="360" r="16" fill="#cc142b" stroke="#fff" strokeWidth="4"/>
        <circle cx="420" cy="240" r="16" fill="#cc142b" stroke="#fff" strokeWidth="4"/>
      </svg>
    );
  }

  if (c === 'IRELAND' || c === 'IE') {
    return (
      <svg className={`rounded-sm shadow-xs inline-block shrink-0 ${className}`} viewBox="0 0 640 480">
        <path fill="#169b62" d="M0 0h213.3v480H0z"/>
        <path fill="#fff" d="M213.3 0h213.4v480H213.3z"/>
        <path fill="#ff883e" d="M426.7 0H640v480H426.7z"/>
      </svg>
    );
  }

  if (c === 'EUROPE' || c === 'EU') {
    return (
      <svg className={`rounded-sm shadow-xs inline-block shrink-0 ${className}`} viewBox="0 0 640 480">
        <path fill="#003399" d="M0 0h640v480H0z"/>
        <g fill="#ffcc00">
          <circle cx="320" cy="110" r="14"/>
          <circle cx="385" cy="127" r="14"/>
          <circle cx="435" cy="177" r="14"/>
          <circle cx="450" cy="240" r="14"/>
          <circle cx="435" cy="303" r="14"/>
          <circle cx="385" cy="353" r="14"/>
          <circle cx="320" cy="370" r="14"/>
          <circle cx="255" cy="353" r="14"/>
          <circle cx="205" cy="303" r="14"/>
          <circle cx="190" cy="240" r="14"/>
          <circle cx="205" cy="177" r="14"/>
          <circle cx="255" cy="127" r="14"/>
        </g>
      </svg>
    );
  }

  return <span className="text-base">🌐</span>;
};
