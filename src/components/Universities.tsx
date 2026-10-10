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
    <section className="py-14 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
              TOP UNIVERSITIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
              Top Universities{' '}
              <span className="text-brand-coral font-serif italic">Around the World</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2">
              Explore some of the top universities our students choose.
            </p>
          </div>

          <button
            onClick={onOpenCounselling}
            className="text-sm font-bold text-brand-navy hover:text-brand-coral flex items-center gap-1.5 transition-colors group self-start md:self-auto"
          >
            <span>View More Universities</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6 Universities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {UNIVERSITIES.map((uni) => (
            <div
              key={uni.id}
              onClick={onOpenCounselling}
              className="bg-white rounded-3xl p-5 border border-slate-100 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-14 h-14 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <UniversityLogo type={uni.logoType} className="w-12 h-12" />
              </div>
              <h3 className="text-xs font-bold text-brand-navy group-hover:text-brand-coral transition-colors line-clamp-2">
                {uni.name}
              </h3>
              <div className="text-[11px] text-slate-400 mt-1 font-medium flex items-center justify-center gap-1.5">
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
