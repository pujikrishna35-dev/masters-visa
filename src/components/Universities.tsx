import React, { useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { UNIVERSITIES } from '../data/content';
import { UniversityLogo } from './UniversityLogo';
import { FlagIcon } from './FlagIcon';

interface Props {
  onOpenCounselling: () => void;
}

export const Universities: React.FC<Props> = ({ onOpenCounselling }) => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Manual nudge helpers for optional arrow navigation
  const handleScrollManual = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Duplicate the list of 24 universities for seamless continuous loop
  const duplicatedUniversities = [...UNIVERSITIES, ...UNIVERSITIES];

  return (
    <section id="universities" className="py-16 sm:py-24 bg-[#EDF4FF]/50 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11.5px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#63718E]">
                TOP UNIVERSITIES
              </span>
              <span className="w-8 h-[2px] bg-[#0755F5] rounded-full inline-block" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#101E49] tracking-tight">
              Top Universities{' '}
              <span className="text-gradient-blue bg-gradient-to-r from-[#0755F5] to-[#0877FF] bg-clip-text text-transparent">Around the World</span>
            </h2>
            <p className="text-sm sm:text-base text-[#63718E] mt-2">
              Explore 500+ global partner institutions across USA, UK, Canada, Australia and Europe.
            </p>
          </div>

          <div className="flex items-center gap-4 self-start md:self-auto">
            {/* Optional subtle arrow navigation for manual browsing */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleScrollManual('left')}
                className="w-8 h-8 rounded-full bg-white border border-[#DCE7FA] hover:border-[#0755F5] text-[#101E49] hover:text-[#0755F5] flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleScrollManual('right')}
                className="w-8 h-8 rounded-full bg-white border border-[#DCE7FA] hover:border-[#0755F5] text-[#101E49] hover:text-[#0755F5] flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onOpenCounselling}
              className="text-sm font-bold text-[#101E49] hover:text-[#0755F5] flex items-center gap-1.5 transition-colors group cursor-pointer"
            >
              <span>View All 500+ Universities</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Continuously Scrolling University Carousel */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="carousel-marquee-wrapper relative overflow-x-auto lg:overflow-hidden select-none py-3 -my-3 no-scrollbar"
        >
          {/* Subtle side fading gradient masks */}
          <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-[#EDF4FF] via-[#EDF4FF]/80 to-transparent z-10 pointer-events-none" />
          <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-[#EDF4FF] via-[#EDF4FF]/80 to-transparent z-10 pointer-events-none" />

          {/* Scrolling Marquee Track */}
          <div
            className="animate-marquee-scroll flex gap-4 sm:gap-5 w-max"
            style={{
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {duplicatedUniversities.map((uni, idx) => (
              <div
                key={`${uni.id}-${idx}`}
                role="button"
                tabIndex={0}
                onClick={onOpenCounselling}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenCounselling();
                  }
                }}
                className="w-[195px] sm:w-[215px] md:w-[225px] shrink-0 bg-white rounded-2xl p-4 sm:p-5 border border-[#DCE7FA] hover:border-[#0755F5]/40 shadow-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group cursor-pointer"
              >
                {/* Logo Area */}
                <div className="w-14 h-14 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <UniversityLogo
                    type={uni.logoType}
                    logoUrl={uni.logoUrl}
                    alt={uni.name}
                    className="w-12 h-12"
                  />
                </div>

                {/* University Name */}
                <h3 className="text-xs font-bold text-[#101E49] group-hover:text-[#0755F5] transition-colors line-clamp-2 h-[32px] flex items-center justify-center leading-snug">
                  {uni.name}
                </h3>

                {/* Country Flag & Name */}
                <div className="text-[11px] text-[#63718E] mt-1.5 font-medium flex items-center justify-center gap-1.5">
                  <FlagIcon country={uni.country} className="w-3.5 h-2.5 rounded-xs" />
                  <span>{uni.country}</span>
                </div>

                {/* Rank Badge */}
                {uni.qsRank && (
                  <span className="mt-2.5 px-2.5 py-0.5 rounded-full bg-[#EDF4FF] text-[10px] font-bold text-[#0755F5] border border-[#DCE7FA] line-clamp-1">
                    {uni.qsRank}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
