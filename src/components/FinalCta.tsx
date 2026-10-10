import React from 'react';
import { ArrowRight, PhoneCall, PlaneTakeoff } from 'lucide-react';

interface Props {
  onOpenCounselling: () => void;
}

export const FinalCta: React.FC<Props> = ({ onOpenCounselling }) => {
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden bg-brand-navy">
      {/* Background Landmarks Collage with Deep Blue Overlay (NO leaves/foliage) */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1800&q=80"
          alt="International landmarks panorama"
          className="w-full h-full object-cover opacity-20 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy-light/80" />
      </div>

      {/* Dotted Flight Path Graphic */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg className="w-full h-full" viewBox="0 0 1200 300" fill="none">
          <path
            d="M 50 250 Q 600 50 1150 150"
            stroke="#F05838"
            strokeWidth="2"
            strokeDasharray="6 6"
            className="animate-flight-dash opacity-30"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-brand-coral border border-white/15 text-xs font-bold uppercase tracking-wider mb-4">
              <PlaneTakeoff className="w-3.5 h-3.5" />
              <span>Admissions Open for 2026 - 2027</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Let's Build Your <br className="hidden sm:inline" />
              <span className="text-brand-coral font-serif italic">Global Future Together</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
              Talk to our experts and get personalised guidance for your study-abroad journey — from profile shortlisting to visa approval.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4 shrink-0">
            <button
              onClick={onOpenCounselling}
              className="px-8 py-4 bg-brand-coral hover:bg-brand-coral-hover text-white font-bold text-sm sm:text-base rounded-full shadow-lg shadow-brand-coral/30 hover:shadow-brand-coral/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2.5 group"
            >
              <span>Book Free Counselling</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="tel:+918185883705"
              className="px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base rounded-full border border-white/20 backdrop-blur-md transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Talk to Us</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
