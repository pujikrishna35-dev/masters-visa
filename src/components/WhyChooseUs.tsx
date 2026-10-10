import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { WHY_CHOOSE_ITEMS } from '../data/content';

interface Props {
  onOpenCounselling: () => void;
}

export const WhyChooseUs: React.FC<Props> = ({ onOpenCounselling }) => {
  return (
    <section id="why-us" className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Premium Multi-Photo Collage (Clean corporate - NO LEAVES) */}
          <div className="lg:col-span-6 relative">
            <div className="relative grid grid-cols-2 gap-4">
              
              {/* Photo 1: Indian/International Students collaborating */}
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden shadow-card border border-slate-100 h-52 sm:h-64 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
                    alt="Students group study and counselling"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Photo 2: Graduate in cap and gown with diploma */}
                <div className="rounded-3xl overflow-hidden shadow-card border border-slate-100 h-40 sm:h-48 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80"
                    alt="Successful University Graduate"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </div>

              {/* Photo 3 & 4 (Shifted vertically) */}
              <div className="space-y-4 pt-6 sm:pt-8">
                {/* Photo 3: Online Counselling / Video Session */}
                <div className="rounded-3xl overflow-hidden shadow-card border border-slate-100 h-40 sm:h-48 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=600&q=80"
                    alt="Mentorship and Online Counselling Session"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Photo 4: International Historic Campus */}
                <div className="rounded-3xl overflow-hidden shadow-card border border-slate-100 h-52 sm:h-64 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80"
                    alt="Prestigious University Campus"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </div>

              {/* Central Floating Handwritten Badge (Guiding Global Futures) */}
              <div className="absolute -top-4 -right-2 sm:right-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-floating border border-slate-100 z-10 rotate-3 pointer-events-none">
                <span className="font-handwriting text-xl sm:text-2xl font-bold text-brand-navy leading-none">
                  Guiding <br />
                  <span className="text-brand-coral">Global Futures ✨</span>
                </span>
              </div>

              {/* Subtle Travel Dotted Arc SVG overlay */}
              <svg className="absolute -bottom-6 -left-6 w-32 h-32 pointer-events-none text-brand-coral/40" viewBox="0 0 100 100" fill="none">
                <path d="M10 90 Q 60 90 90 20" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                <circle cx="90" cy="20" r="3" fill="#F05838" />
              </svg>
            </div>
          </div>

          {/* RIGHT: Checklist & Copy */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1 block">
                WHY CHOOSE MASTERS VISA
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-brand-navy tracking-tight leading-tight">
                More Than Counselling. <br />
                <span className="text-brand-coral font-serif italic">
                  A Partner in Your Dreams.
                </span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We are committed to turning your global education dreams into reality with personalized guidance, expert support and end-to-end assistance.
            </p>

            {/* Checklist: 2 Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3.5 pt-2">
              {WHY_CHOOSE_ITEMS.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-brand-navy">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={onOpenCounselling}
                className="px-7 py-3.5 bg-brand-coral hover:bg-brand-coral-hover text-white text-sm font-bold rounded-full shadow-lg shadow-brand-coral/25 hover:shadow-brand-coral/35 hover:-translate-y-0.5 active:translate-y-0 transition-all inline-flex items-center gap-2 group"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
