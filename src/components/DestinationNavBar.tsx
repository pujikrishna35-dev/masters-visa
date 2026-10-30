import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FlagIcon } from './FlagIcon';
import { DESTINATIONS } from '../data/content';

interface DestinationNavBarProps {
  activeCountry?: string; // 'usa' | 'uk' | 'canada' | 'australia' | 'germany' | 'france' | 'new-zealand' | 'ireland' | 'europe'
  onSelectCountry?: (countryId: string) => void;
}

export const getCountryRoute = (countryId: string): string => {
  const normalized = countryId.toLowerCase().trim();
  switch (normalized) {
    case 'usa':
      return '/study-in-usa';
    case 'uk':
    case 'united-kingdom':
      return '/study-in-uk';
    case 'canada':
      return '/study-in-canada';
    case 'australia':
      return '/study-in-australia';
    case 'germany':
      return '/study-in-germany';
    case 'france':
      return '/study-in-france';
    case 'new-zealand':
    case 'newzealand':
      return '/study-in-new-zealand';
    case 'ireland':
      return '/study-in-ireland';
    case 'europe':
      return '/study-in-europe';
    default:
      return `/study-in-${normalized}`;
  }
};

// Exactly 8 unique countries in strict requested order:
// USA, UK, Canada, Australia, Germany, New Zealand, Ireland, Europe
const EXACT_COUNTRY_ORDER = [
  'usa',
  'uk',
  'canada',
  'australia',
  'germany',
  'new-zealand',
  'ireland',
  'europe',
];

export const DestinationNavBar: React.FC<DestinationNavBarProps> = ({ 
  activeCountry: propActive,
  onSelectCountry 
}) => {
  const location = useLocation();
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Compute active country if not explicitly passed
  let currentCountry = propActive;
  if (!currentCountry) {
    const searchParams = new URLSearchParams(location.search);
    const countryQuery = searchParams.get('country')?.toLowerCase().trim();
    if (countryQuery) {
      currentCountry = countryQuery;
    } else {
      const path = location.pathname.toLowerCase();
      if (path.includes('usa')) {
        currentCountry = 'usa';
      } else if (path.includes('uk') || path.includes('united-kingdom')) {
        currentCountry = 'uk';
      } else if (path.includes('canada')) {
        currentCountry = 'canada';
      } else if (path.includes('australia')) {
        currentCountry = 'australia';
      } else if (path.includes('germany')) {
        currentCountry = 'germany';
      } else if (path.includes('france')) {
        currentCountry = 'france';
      } else if (path.includes('new-zealand') || path.includes('newzealand')) {
        currentCountry = 'new-zealand';
      } else if (path.includes('ireland')) {
        currentCountry = 'ireland';
      } else if (path.includes('europe')) {
        currentCountry = 'europe';
      }
    }
  }

  // Build the ordered 8 unique destination objects
  const uniqueCountries = EXACT_COUNTRY_ORDER
    .map((id) => DESTINATIONS.find((d) => d.id === id))
    .filter(Boolean) as typeof DESTINATIONS;

  // Exactly 2 sets: Set 0 (Primary) and Set 1 (Seamless Animation Clone)
  const TRACK_SETS = [0, 1];

  return (
    <section className="sticky top-[58px] sm:top-[66px] z-30 bg-white/95 backdrop-blur-md py-4 sm:py-5 border-t-0 border-b-0 border-none outline-none ring-0 select-none shadow-none overflow-hidden">
      <div 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onTouchCancel={() => setIsPaused(false)}
        className="country-carousel-wrapper relative w-full overflow-hidden no-scrollbar select-none py-2"
      >
        {/* Continuous Seamless Infinite Circular Track */}
        <div
          className="country-carousel-track flex items-center shrink-0 w-max"
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {TRACK_SETS.map((setIndex) => (
            <div
              key={`set-${setIndex}`}
              className="flex items-center gap-6 sm:gap-7 md:gap-8 pr-6 sm:pr-7 md:pr-8 shrink-0"
              aria-hidden={setIndex > 0 ? true : undefined}
            >
              {uniqueCountries.map((country) => {
                const isActive =
                  currentCountry === country.id ||
                  (country.id === 'uk' && currentCountry === 'united-kingdom') ||
                  (country.id === 'new-zealand' && currentCountry === 'newzealand');

                return (
                  <Link
                    key={setIndex === 0 ? `primary-${country.id}` : `clone-${country.id}`}
                    to={getCountryRoute(country.id)}
                    tabIndex={setIndex > 0 ? -1 : 0}
                    onClick={() => {
                      if (onSelectCountry) {
                        onSelectCountry(country.id);
                      }
                    }}
                    className={`inline-flex items-center justify-center gap-3 sm:gap-3.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base font-semibold whitespace-nowrap shrink-0 select-none cursor-pointer border-0 border-none outline-none transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#0066FF] to-[#0088FF] text-white font-bold shadow-lg shadow-[#0066FF]/25 hover:brightness-105'
                        : 'bg-white text-[#111827] shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-md hover:bg-slate-50/90'
                    }`}
                  >
                    {/* Circular vector flag badge */}
                    <span 
                      className={`w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full overflow-hidden shrink-0 flex items-center justify-center ${
                        isActive ? 'shadow-xs ring-2 ring-white/30 bg-white/10' : 'shadow-xs ring-1 ring-black/5 bg-slate-100'
                      }`}
                    >
                      <FlagIcon 
                        country={country.name} 
                        className="w-full h-full object-cover scale-125" 
                      />
                    </span>

                    <span className="leading-none">{country.name}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationNavBar;
