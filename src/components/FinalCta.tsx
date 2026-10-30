import React from 'react';
import { ArrowRight, Plane, Compass, CheckCircle2, UserCheck } from 'lucide-react';

interface Props {
  onOpenCounselling: () => void;
}

export const FinalCta: React.FC<Props> = ({ onOpenCounselling }) => {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden bg-[#EDF4FF]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Futuristic Card with Deep Navy and Electric Blue Glow */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#101E49] via-[#0D193E] to-[#122353] text-white p-8 sm:p-12 lg:p-16 border border-[#DCE7FA]/20 shadow-2xl shadow-[#0755F5]/15">
          {/* Subtle Ambient Glowing Orbs */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#0755F5]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#0877FF]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-left">
            
            {/* Left Text */}
            <div className="max-w-xl">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-3.5">
                <Plane className="w-4 h-4 text-[#3B7BFF] fill-[#3B7BFF] transform -rotate-45" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#3B7BFF]">
                  YOUR GLOBAL FUTURE AWAITS
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Ready to Start<br />
                <span className="bg-gradient-to-r from-[#3B7BFF] via-[#60A5FA] to-[#93C5FD] bg-clip-text text-transparent">
                  Your Journey?
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed max-w-md">
                Book a free consultation with our expert counsellors and take the first step towards your international Master's degree.
              </p>
            </div>

            {/* Right Action & Trust Badges */}
            <div className="flex flex-col items-center lg:items-end gap-5 shrink-0">
              <button
                onClick={onOpenCounselling}
                className="px-9 py-4 bg-gradient-to-r from-[#0755F5] to-[#0877FF] hover:from-[#0544C7] hover:to-[#0766E6] text-white font-bold text-sm sm:text-base rounded-full shadow-xl shadow-[#0755F5]/40 hover:shadow-2xl hover:shadow-[#0755F5]/50 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2.5 group cursor-pointer"
              >
                <span>Book a Free Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4 text-xs font-medium text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#3B7BFF]" />
                  <span>Expert Mentorship</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>No Hidden Charges</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-sky-400" />
                  <span>End-to-End Support</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
