import React from 'react';
import { ArrowRight, Plane, Compass, CheckCircle2, UserCheck } from 'lucide-react';

interface Props {
  onOpenCounselling: () => void;
}

export const FinalCta: React.FC<Props> = ({ onOpenCounselling }) => {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden bg-[#10243F] text-white">
      {/* ── SUNSET MEDITERRANEAN BACKGROUND IMAGE ── */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{
          backgroundImage: "url('/final-cta-sunset.jpg')",
        }}
      />
      {/* Dark Twilight Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#10243F] via-[#10243F]/80 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#10243F] via-transparent to-black/30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-left">
          
          {/* Left Text */}
          <div className="max-w-xl">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
              <Plane className="w-4 h-4 text-[#D99A35] fill-[#D99A35] transform -rotate-45" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#D99A35]">
                YOUR GLOBAL FUTURE AWAITS
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-serif leading-tight">
              Ready to Start<br />
              <span className="text-[#D99A35] font-serif">Your Journey?</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed max-w-md">
              Book a free consultation with our expert counsellors and take the first step towards your dream.
            </p>
          </div>

          {/* Right Action & Trust Badges */}
          <div className="flex flex-col items-center lg:items-end gap-5 shrink-0">
            <button
              onClick={onOpenCounselling}
              className="px-8 py-4 bg-gradient-to-r from-[#D99A35] via-[#E28330] to-[#F16B55] hover:opacity-95 active:scale-[0.98] text-white font-bold text-sm sm:text-base rounded-full shadow-xl shadow-[#D99A35]/30 hover:-translate-y-0.5 transition-all flex items-center gap-2.5 group"
            >
              <span>Book a Free Consultation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4 text-xs font-medium text-slate-300">
              <div className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#D99A35]" />
                <span>Expert Guidance</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>No Hidden Charges</span>
              </div>
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>Personalised Support</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
