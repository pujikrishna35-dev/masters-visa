import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FlagIcon } from './FlagIcon';
import { DESTINATIONS } from '../data/content';

interface DestinationNavBarProps {
  activeCountry?: string; // 'all' | 'usa' | 'uk' | 'canada' | 'australia' | 'germany' | 'france' | 'new-zealand' | 'ireland' | 'europe'
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

export const DestinationNavBar: React.FC<DestinationNavBarProps> = ({ activeCountry: propActive }) => {
  const location = useLocation();

  // Compute active country if not explicitly passed
  let currentCountry = propActive;
  if (!currentCountry) {
    const path = location.pathname.toLowerCase();
    if (path === '/destinations' || path === '/destinations/') {
      currentCountry = 'all';
    } else if (path.includes('usa')) {
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
    } else {
      currentCountry = 'all';
    }
  }

  return (
    <section className="sticky top-[58px] sm:top-[66px] z-30 bg-white/95 backdrop-blur-md border-b border-[#DCE7FA] py-3.5 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto">
            {/* All Destinations Hub Link */}
            <Link
              to="/destinations"
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                currentCountry === 'all'
                  ? 'bg-gradient-to-r from-[#0755F5] to-[#0877FF] text-white shadow-sm shadow-[#0755F5]/25'
                  : 'bg-[#EDF4FF] text-[#172344] hover:bg-blue-100/70 border border-[#DCE7FA]'
              }`}
            >
              All Destinations ({DESTINATIONS.length})
            </Link>

            {/* Individual Dedicated Country Links */}
            {DESTINATIONS.map((d) => {
              const isActive =
                currentCountry === d.id ||
                (d.id === 'uk' && currentCountry === 'united-kingdom');

              return (
                <Link
                  key={d.id}
                  to={getCountryRoute(d.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0755F5] to-[#0877FF] text-white shadow-sm shadow-[#0755F5]/25'
                      : 'bg-[#EDF4FF] text-[#172344] hover:bg-blue-100/70 border border-[#DCE7FA]'
                  }`}
                >
                  <FlagIcon country={d.name} className="w-4 h-3 rounded-2xs inline-block" />
                  <span>{d.name}</span>
                </Link>
              );
            })}
          </div>

          {currentCountry !== 'all' && (
            <Link
              to="/destinations"
              className="hidden sm:inline-flex text-xs font-bold text-[#0755F5] hover:underline cursor-pointer shrink-0"
            >
              Show All &times;
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default DestinationNavBar;
