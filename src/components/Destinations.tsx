import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getCountryRoute } from './DestinationNavBar';
import type { Destination } from '../types';

interface Props {
  onSelectDestination?: (dest: Destination) => void;
  hideBottomWave?: boolean;
}

// Crisp circular vector flags matching reference screenshot badges
const FlagUSA = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6 rounded-full shrink-0 shadow-sm" aria-hidden="true">
    <clipPath id="dest-usa-clip"><circle cx="16" cy="16" r="16" /></clipPath>
    <g clipPath="url(#dest-usa-clip)">
      <rect width="32" height="32" fill="#B22234" />
      <path d="M0 2.46h32M0 7.38h32M0 12.3h32M0 17.23h32M0 22.15h32M0 27.07h32" stroke="#FFFFFF" strokeWidth="2.46" />
      <rect width="14" height="17.23" fill="#3C3B6E" />
      <circle cx="3.5" cy="4" r="0.9" fill="#FFF" />
      <circle cx="7" cy="4" r="0.9" fill="#FFF" />
      <circle cx="10.5" cy="4" r="0.9" fill="#FFF" />
      <circle cx="5.25" cy="8.5" r="0.9" fill="#FFF" />
      <circle cx="8.75" cy="8.5" r="0.9" fill="#FFF" />
      <circle cx="3.5" cy="13" r="0.9" fill="#FFF" />
      <circle cx="7" cy="13" r="0.9" fill="#FFF" />
      <circle cx="10.5" cy="13" r="0.9" fill="#FFF" />
    </g>
  </svg>
);

const FlagUK = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6 rounded-full shrink-0 shadow-sm" aria-hidden="true">
    <clipPath id="dest-uk-clip"><circle cx="16" cy="16" r="16" /></clipPath>
    <g clipPath="url(#dest-uk-clip)">
      <rect width="32" height="32" fill="#012169" />
      <path d="M0 0 L32 32 M32 0 L0 32" stroke="#FFF" strokeWidth="5.5" />
      <path d="M0 0 L32 32 M32 0 L0 32" stroke="#C8102E" strokeWidth="2" />
      <path d="M16 0 V32 M0 16 H32" stroke="#FFF" strokeWidth="8" />
      <path d="M16 0 V32 M0 16 H32" stroke="#C8102E" strokeWidth="4.8" />
    </g>
  </svg>
);

const FlagCanada = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6 rounded-full shrink-0 shadow-sm" aria-hidden="true">
    <clipPath id="dest-can-clip"><circle cx="16" cy="16" r="16" /></clipPath>
    <g clipPath="url(#dest-can-clip)">
      <rect width="32" height="32" fill="#FF0000" />
      <rect x="8" width="16" height="32" fill="#FFFFFF" />
      <path d="M16 8l1.5 3.5 2.5-.8-1.2 3.2 2.8 1.4-2.8 1.4.6 3.5-3.4-1.8V23h-1v-4.6L11.6 20.2l.6-3.5-2.8-1.4 2.8-1.4-1.2-3.2 2.5.8z" fill="#FF0000" />
    </g>
  </svg>
);

const FlagAustralia = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6 rounded-full shrink-0 shadow-sm" aria-hidden="true">
    <clipPath id="dest-aus-clip"><circle cx="16" cy="16" r="16" /></clipPath>
    <g clipPath="url(#dest-aus-clip)">
      <rect width="32" height="32" fill="#00008B" />
      <g transform="scale(0.5)">
        <rect width="32" height="32" fill="#012169" />
        <path d="M0 0 L32 32 M32 0 L0 32" stroke="#FFF" strokeWidth="5" />
        <path d="M0 0 L32 32 M32 0 L0 32" stroke="#C8102E" strokeWidth="2" />
        <path d="M16 0 V32 M0 16 H32" stroke="#FFF" strokeWidth="7" />
        <path d="M16 0 V32 M0 16 H32" stroke="#C8102E" strokeWidth="4.5" />
      </g>
      <circle cx="8" cy="22" r="2.5" fill="#FFF" />
      <circle cx="24" cy="9" r="1" fill="#FFF" />
      <circle cx="21" cy="14" r="1" fill="#FFF" />
      <circle cx="26" cy="17" r="1" fill="#FFF" />
      <circle cx="23" cy="24" r="1" fill="#FFF" />
      <circle cx="27" cy="21" r="0.7" fill="#FFF" />
    </g>
  </svg>
);

export const Destinations: React.FC<Props> = ({ onSelectDestination: _onSelectDestination }) => {
  const cardsData = [
    {
      id: 'usa',
      name: 'USA',
      Flag: FlagUSA,
      subtitle: 'Land of Opportunities',
      image: 'https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'uk',
      name: 'UK',
      Flag: FlagUK,
      subtitle: 'Globally Renowned Universities',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'canada',
      name: 'Canada',
      Flag: FlagCanada,
      subtitle: 'Quality Education & Bright Future',
      image: 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'australia',
      name: 'Australia',
      Flag: FlagAustralia,
      subtitle: 'Vibrant Culture & Career Growth',
      image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section id="destinations" className="pt-8 sm:pt-12 pb-0 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-12 sm:pb-16">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11.5px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#63718E]">
              EXPLORE THE WORLD
            </span>
            <span className="w-8 h-[2px] bg-[#FF6B6B] rounded-full inline-block" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#101E49] tracking-tight">
            Choose Your<br />
            <span className="text-gradient-blue bg-gradient-to-r from-[#0755F5] to-[#0877FF] bg-clip-text text-transparent">
              Dream Destination
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#63718E] mt-3 leading-relaxed max-w-lg">
            Discover world-class education, diverse cultures and limitless opportunities.
          </p>

          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#DCE7FA] hover:border-[#0755F5] bg-white hover:bg-[#EDF4FF] text-[#101E49] hover:text-[#0755F5] text-xs sm:text-sm font-bold transition-all shadow-xs group mt-4 active:scale-95 cursor-pointer"
          >
            <span>View All Countries</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Destination Photographic Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardsData.map((dest) => {
            const FlagComponent = dest.Flag;
            return (
              <Link
                key={dest.id}
                to={getCountryRoute(dest.id)}
                className="group bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_36px_rgba(37,99,235,0.14)] border border-slate-200/80 hover:border-[#3B82F6]/50 transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1.5 active:scale-[0.99] select-none text-left"
              >
                {/* Card Photo */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-60" />
                </div>

                {/* Card Bottom Meta */}
                <div className="p-4 sm:p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FlagComponent />
                    <div>
                      <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors leading-tight">
                        {dest.name}
                      </h3>
                      <p className="text-xs text-[#63718E] font-medium mt-0.5 leading-snug">
                        {dest.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Circular Arrow Button */}
                  <div className="w-9 h-9 rounded-full border border-slate-200 text-slate-500 flex items-center justify-center shrink-0 group-hover:btn-explore-royal group-hover:text-white group-hover:border-transparent group-hover:scale-105 transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
