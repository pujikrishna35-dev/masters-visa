import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { DESTINATIONS } from '../data/content';
import type { Destination } from '../types';
import { FlagIcon } from './FlagIcon';

interface Props {
  onSelectDestination: (dest: Destination) => void;
}

export const Destinations: React.FC<Props> = ({ onSelectDestination }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="destinations" className="py-12 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
              STUDY ABROAD
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
              Choose Your{' '}
              <span className="text-brand-coral font-serif italic">
                Study Destination
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-xl">
              Explore top countries, world-class universities and life-changing opportunities.
            </p>
          </div>

          {/* Action Links & Slider Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectDestination(DESTINATIONS[0])}
              className="text-sm font-bold text-brand-navy hover:text-brand-coral flex items-center gap-1.5 transition-colors group mr-2"
            >
              <span>View All Destinations</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scroll('left')}
                aria-label="Previous destination"
                className="w-9 h-9 rounded-full border border-slate-200 hover:border-brand-coral hover:text-brand-coral flex items-center justify-center transition-colors text-slate-600 bg-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                aria-label="Next destination"
                className="w-9 h-9 rounded-full border border-slate-200 hover:border-brand-coral hover:text-brand-coral flex items-center justify-center transition-colors text-slate-600 bg-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Cards Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto pb-6 pt-2 no-scrollbar scroll-smooth snap-x snap-mandatory"
        >
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              className="min-w-[240px] sm:min-w-[260px] md:min-w-[270px] bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col group snap-start"
            >
              {/* Card Image */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <FlagIcon country={dest.name} className="w-5 h-3.5 shadow-xs" />
                    <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-coral transition-colors">
                      {dest.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {dest.shortDesc}
                  </p>
                </div>

                <div className="pt-4 mt-2 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400">
                    Visa: <strong className="text-brand-navy">{dest.visaSuccessRate}</strong>
                  </span>
                  <button
                    onClick={() => onSelectDestination(dest)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-coral group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
