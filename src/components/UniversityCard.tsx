import React, { useState } from 'react';
import { MapPin, ExternalLink, Globe2, GraduationCap } from 'lucide-react';

export interface UniversityDirectoryItem {
  directory_id: string;
  institution_name: string;
  location: string | null;
  website_url: string | null;
  country?: string | null;
  logo_url?: string;
  campus_image_url?: string;
  image_source_url?: string;
  image_attribution?: string;
  category?: string;
}

export function formatUniversityUrl(url?: string | null): string | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed || trimmed === '#' || trimmed === '/') return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function getUniversityInitials(name?: string | null): string {
  if (!name || typeof name !== 'string') return 'UN';
  const clean = name.replace(/^The\s+/i, '').trim();
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export interface UniversityCardProps {
  uni: UniversityDirectoryItem;
  defaultCountryName?: string;
  formatUrl?: (url?: string | null) => string | null;
  getInitials?: (name?: string | null) => string;
}

/**
 * Reusable Horizontal University Card (100% Matching Reference Screenshot)
 * - LEFT: Fixed logo area with centered contain-fit logo (130px–145px)
 * - DIVIDER: Light-blue subtle vertical divider
 * - RIGHT: Full university name, blue map-pin location, and blue external website link
 * - NO campus photos or banners
 */
export const UniversityCard: React.FC<UniversityCardProps> = ({
  uni,
  defaultCountryName = 'International',
  formatUrl = formatUniversityUrl,
  getInitials = getUniversityInitials,
}) => {
  const [logoError, setLogoError] = useState(false);

  const url = formatUrl(uni.website_url);
  const initials = getInitials(uni.institution_name);
  const hasLogo = Boolean(uni.logo_url && !logoError);

  const displayLocation =
    uni.location && uni.location.trim()
      ? uni.location
      : uni.country && uni.country.trim()
      ? uni.country
      : defaultCountryName;

  return (
    <div className="bg-white rounded-2xl border border-blue-100/90 hover:border-[#155EEF]/50 shadow-xs hover:shadow-md transition-all flex flex-row items-center h-[165px] min-h-[160px] relative overflow-hidden group">
      {/* LEFT SECTION: Fixed Logo Area (approx 130–145px wide) */}
      <div className="w-[130px] sm:w-[145px] shrink-0 h-full flex items-center justify-center p-3.5 sm:p-4 bg-white">
        {hasLogo ? (
          <img
            src={uni.logo_url}
            alt={`${uni.institution_name} logo`}
            loading="lazy"
            decoding="async"
            onError={() => setLogoError(true)}
            className="max-w-[110px] sm:max-w-[125px] max-h-[105px] sm:max-h-[115px] w-auto h-auto object-contain transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F5F8FF] to-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] shadow-xs flex flex-col items-center justify-center p-1.5 text-center transition-transform group-hover:scale-105">
            <GraduationCap className="w-4 h-4 text-[#155EEF]/80 mb-0.5" />
            <span className="font-bold text-[11px] font-mono tracking-wider leading-none">{initials}</span>
          </div>
        )}
      </div>

      {/* THIN LIGHT-BLUE VERTICAL DIVIDER */}
      <div className="w-px h-[75%] bg-blue-100/90 my-auto shrink-0" />

      {/* RIGHT SECTION: Details Area */}
      <div className="flex-1 flex flex-col justify-between py-3.5 sm:py-4 px-3.5 sm:px-5 h-full min-w-0">
        <div>
          {/* Full University Name */}
          <h3 className="font-bold text-sm sm:text-base text-[#10243F] leading-snug break-words line-clamp-2 group-hover:text-[#155EEF] transition-colors">
            {uni.institution_name}
          </h3>

          {/* Location with Blue Map Pin */}
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[#64748B]">
            <MapPin className="w-3.5 h-3.5 text-[#155EEF] shrink-0" />
            <span className="truncate">{displayLocation}</span>
          </div>
        </div>

        {/* Visit Official Website Link */}
        <div className="mt-2">
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#155EEF] hover:text-[#104ECC] text-xs font-semibold hover:underline transition-colors"
            >
              <span>Visit Official Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Globe2 className="w-3.5 h-3.5 text-slate-300" />
              <span>Domain unavailable</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UniversityCard;
