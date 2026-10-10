import React from 'react';
import { Star, ArrowRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/content';
import { FlagIcon } from './FlagIcon';

interface Props {
  onOpenCounselling: () => void;
}

export const Testimonials: React.FC<Props> = ({ onOpenCounselling }) => {
  return (
    <section className="py-16 bg-brand-bg-subtle/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
              STUDENT SUCCESS STORIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
              Real Students.{' '}
              <span className="text-brand-coral font-serif italic">Global Futures.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2">
              Hear from our students about their life-changing experiences.
            </p>
          </div>

          <button
            onClick={onOpenCounselling}
            className="text-sm font-bold text-brand-navy hover:text-brand-coral flex items-center gap-1.5 transition-colors group self-start md:self-auto"
          >
            <span>View All Reviews</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* Header with Photo & Country Flag */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm border border-slate-100 flex items-center justify-center">
                      <FlagIcon country={item.country} className="w-4 h-3 rounded-xs" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-brand-navy">{item.name}</h3>
                    <p className="text-xs font-semibold text-brand-coral">{item.university}</p>
                    <p className="text-[11px] text-slate-400">{item.country} • {item.course}</p>
                  </div>
                </div>

                {/* Quote */}
                <div className="relative mb-5">
                  <Quote className="w-6 h-6 text-slate-200 absolute -top-2 -left-1 opacity-50" />
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic relative z-10 pl-3">
                    "{item.quote}"
                  </p>
                </div>
              </div>

              {/* 5-Star Rating */}
              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  Verified Admit
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
