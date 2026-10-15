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
    <section className="py-16 sm:py-20 bg-[#FAF7F1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#64748B]">
                TOP UNIVERSITIES
              </span>
              <span className="w-8 h-[2px] bg-[#D99A35] rounded-full inline-block" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#10243F] tracking-tight font-serif">
              Top Universities{' '}
              <span className="text-[#D99A35] font-serif">Around the World</span>
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] mt-2">
              Explore some of the top universities our students choose.
            </p>
          </div>

          <button
            onClick={onOpenCounselling}
            className="text-sm font-bold text-[#10243F] hover:text-[#D99A35] flex items-center gap-1.5 transition-colors group self-start md:self-auto"
          >
            <span>View More Universities</span>
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
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-soft hover:shadow-card-hover hover:border-[#D99A35]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-14 h-14 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <UniversityLogo type={uni.logoType} className="w-12 h-12" />
              </div>
              <h3 className="text-xs font-bold text-[#10243F] group-hover:text-[#D99A35] transition-colors line-clamp-2">
                {uni.name}
              </h3>
              <div className="text-[11px] text-[#64748B] mt-1 font-medium flex items-center justify-center gap-1.5">
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
