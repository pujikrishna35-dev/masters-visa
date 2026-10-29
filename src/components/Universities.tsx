import React from 'react';
import { ArrowRight } from 'lucide-react';
import { UNIVERSITIES } from '../data/content';
import { UniversityLogo } from './UniversityLogo';
import { FlagIcon } from './FlagIcon';

interface Props {
  onOpenCounselling: () => void;
}

export const Universities: React.FC<Props> = ({ onOpenCounselling }) => {
  return (
    <section id="universities" className="py-16 sm:py-24 bg-[#EDF4FF]/50 relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
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

          <button
            onClick={onOpenCounselling}
            className="text-sm font-bold text-[#101E49] hover:text-[#0755F5] flex items-center gap-1.5 transition-colors group self-start md:self-auto cursor-pointer"
          >
            <span>View All 500+ Universities</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6 Universities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {UNIVERSITIES.map((uni) => (
            <div
              key={uni.id}
              role="button"
              tabIndex={0}
              onClick={onOpenCounselling}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenCounselling();
                }
              }}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-[#DCE7FA] hover:border-[#0755F5]/40 shadow-soft hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-14 h-14 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <UniversityLogo type={uni.logoType} className="w-12 h-12" />
              </div>
              <h3 className="text-xs font-bold text-[#101E49] group-hover:text-[#0755F5] transition-colors line-clamp-2">
                {uni.name}
              </h3>
              <div className="text-[11px] text-[#63718E] mt-1 font-medium flex items-center justify-center gap-1.5">
                <FlagIcon country={uni.country} className="w-3.5 h-2.5 rounded-xs" />
                <span>{uni.country}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
