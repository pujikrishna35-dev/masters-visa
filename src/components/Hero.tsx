import React from 'react';
import { ArrowRight, Play, GraduationCap, BarChart2, Building2, Globe2, Car, Home, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface Props {
  onOpenCounselling: (destination?: string) => void;
  onSelectDestination?: (destId: string) => void;
}

export const Hero: React.FC<Props> = ({ onOpenCounselling, onSelectDestination: _onSelectDestination }) => {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-[#FAF7F1]"
    >
      {/* ── FULL-BLEED PANORAMIC CINEMATIC SCENE BACKGROUND ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <svg
          viewBox="0 0 1376 768"
          preserveAspectRatio="xMidYMin slice"
          className="w-full h-full pointer-events-none select-none block"
          aria-hidden="true"
        >
          {/* Panoramic clean sky, sunlight, and landmarks */}
          <image
            href="/hero-sky-clean.jpg"
            width="1376"
            height="768"
            preserveAspectRatio="none"
          />
        </svg>

        {/* Soft atmospheric gradient ensuring crisp left-side text contrast without darkening the scene */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/35 to-transparent pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />
      </div>

      {/* ── MAIN HERO VIEWPORT CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 lg:pt-20 pb-20 sm:pb-24 lg:pb-36 min-h-[560px] sm:min-h-[620px] lg:min-h-[700px] flex items-center">
        
        {/* Left Column: Editorial Headline & Actions */}
        <div className="w-full max-w-xl lg:max-w-2xl text-left relative z-20">
          
          {/* Eyebrow Label with Special Focus on Pickup & Accommodation */}
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4 flex-wrap">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.24em] text-[#10243F] uppercase">
              GLOBAL EDUCATION CONSULTANCY
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#D99A35]" />
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FDF7EC] border border-[#D99A35]/35 text-[10px] font-bold text-[#D99A35] uppercase tracking-wide">
              <Sparkles className="w-3 h-3 text-[#D99A35]" /> Free Airport Pickup & Accommodation
            </span>
          </div>

          {/* Headline with Champagne-Gold Accent on "Future" */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[62px] xl:text-[66px] font-bold tracking-tight leading-[1.08] text-[#10243F] mb-4 sm:mb-5 drop-shadow-sm">
            Your Global<br />
            <span className="text-[#D99A35] font-serif font-bold">Future</span> Awaits
          </h1>

          {/* Supporting Description */}
          <p className="text-sm sm:text-base lg:text-[17px] text-[#475569] leading-relaxed max-w-lg mb-6 sm:mb-7 font-normal drop-shadow-sm">
            Expert guidance for university admissions, visa assistance, and guaranteed airport pickup & verified student accommodation for a smooth, stress-free arrival abroad.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-5">
            <button
              onClick={() => onOpenCounselling()}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-[#D99A35] via-[#E28330] to-[#F16B55] hover:opacity-95 active:scale-[0.98] text-white text-sm sm:text-[15px] font-bold rounded-full shadow-lg shadow-[#D99A35]/35 hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('testimonials');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2.5 sm:gap-3 text-[#10243F] hover:text-[#D99A35] transition-colors text-sm font-semibold group cursor-pointer shrink-0"
              aria-label="Watch our student success stories"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 border border-slate-200/90 shadow-md flex items-center justify-center group-hover:scale-105 group-hover:border-[#D99A35] transition-all shrink-0">
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#10243F] text-[#10243F] ml-0.5 group-hover:fill-[#D99A35] group-hover:text-[#D99A35]" />
              </div>
              <span className="font-semibold text-slate-800">Watch Our Story</span>
            </button>
          </div>

          {/* ── SPECIAL FOCUS SPOTLIGHT: AIRPORT PICKUP & ACCOMMODATION ── */}
          <div className="mt-7 pt-5 border-t border-slate-300/60 max-w-lg">
            {/* Header / Accent Label */}
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#10243F] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D99A35] animate-ping inline-block" />
                <span className="w-2 h-2 rounded-full bg-[#D99A35] -ml-3.5 inline-block" />
                Special Master Visa Benefit
              </span>
              <span className="text-[10px] font-extrabold text-[#D99A35] bg-[#FDF7EC] px-2.5 py-0.5 rounded-full border border-[#D99A35]/35 shadow-2xs uppercase tracking-wide">
                Airport to Dorm
              </span>
            </div>

            {/* Premium Highlight Card */}
            <div 
              role="button"
              tabIndex={0}
              onClick={() => onOpenCounselling('Airport Pickup & Accommodation')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenCounselling('Airport Pickup & Accommodation');
                }
              }}
              className="group relative bg-gradient-to-br from-white/95 via-[#FFFDF8] to-[#FDF7EC]/90 hover:from-white hover:to-white border-2 border-[#D99A35]/40 hover:border-[#D99A35] rounded-2xl p-4 sm:p-4.5 shadow-md shadow-[#D99A35]/12 hover:shadow-xl hover:shadow-[#D99A35]/22 backdrop-blur-md transition-all duration-300 cursor-pointer text-left overflow-hidden"
            >
              {/* Subtle decorative glow in top-right */}
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#D99A35]/15 rounded-full blur-2xl pointer-events-none group-hover:bg-[#D99A35]/25 transition-colors" />

              <div className="relative z-10 flex items-start gap-3.5 sm:gap-4">
                {/* Glowing Icon Badge with Car */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D99A35] via-[#E28330] to-[#F16B55] text-white shadow-md shadow-[#D99A35]/35 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:rotate-1 transition-all">
                  <Car className="w-6 h-6 stroke-[2.2]" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm sm:text-[15px] font-extrabold text-[#10243F] group-hover:text-[#D99A35] transition-colors leading-snug">
                      Airport Pickup & Accommodation
                    </h3>
                    <div className="w-6 h-6 rounded-full bg-[#FAF7F1] border border-slate-200/80 group-hover:bg-[#D99A35] group-hover:text-white flex items-center justify-center text-slate-500 transition-all shrink-0">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                    Guaranteed on-ground airport greeting, luggage transfer & verified student accommodation before you take off.
                  </p>

                  {/* 3 Value Pillars */}
                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-semibold text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Airport Meet & Greet</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Verified Student Stay</span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Local SIM & Transit</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── HANDWRITTEN SCRIPT OVERLAY IN TOP-RIGHT SKY ── */}
        <div className="hidden sm:block absolute top-5 sm:top-6 lg:top-7 xl:top-8 right-6 sm:right-10 lg:right-14 xl:right-18 text-right pointer-events-none select-none z-20">
          <span className="font-handwriting text-xl sm:text-2xl lg:text-[26px] text-slate-700/85 rotate-[-4deg] block leading-tight font-semibold drop-shadow-xs">
            Different Countries<br />New Stories<br />Same You!
          </span>
        </div>
      </div>

      {/* ── BOTTOM SEAMLESS WHITE CURVE & DOCKED TRUST STATISTICS SHELF (EXACTLY MATCHING IMAGE 2) ── */}
      <div className="relative z-20 w-full">
        {/* Fluid curved wave svg transitioning from the panorama into the white stats & destinations ground */}
        <div className="w-full overflow-hidden leading-none pointer-events-none">
          <svg
            viewBox="0 0 1440 90"
            fill="none"
            className="w-full h-12 sm:h-16 lg:h-20 block"
            preserveAspectRatio="none"
          >
            <path
              d="M0,45 C360,95 1080,0 1440,35 L1440,90 L0,90 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>

        {/* White docked statistics row */}
        <div className="bg-white pb-8 sm:pb-10 pt-2 px-4 sm:px-6 lg:px-8 border-b border-slate-100/80">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              
              {/* Stat 1: 10K+ Students Placed */}
              <div className="flex items-center gap-3.5 sm:gap-4 pl-0 sm:pl-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#FDF7EC] border border-[#D99A35]/20 flex items-center justify-center shrink-0 text-[#D99A35]">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#10243F] tracking-tight leading-none">
                    10K+
                  </div>
                  <div className="text-xs sm:text-[13px] text-[#64748B] font-medium mt-1">
                    Students Placed
                  </div>
                </div>
              </div>

              {/* Stat 2: 98% Visa Success Rate */}
              <div className="flex items-center gap-3.5 sm:gap-4 pt-4 sm:pt-0 pl-0 sm:pl-8">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#FDF7EC] border border-[#D99A35]/20 flex items-center justify-center shrink-0 text-[#D99A35]">
                  <BarChart2 className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#10243F] tracking-tight leading-none">
                    98%
                  </div>
                  <div className="text-xs sm:text-[13px] text-[#64748B] font-medium mt-1">
                    Visa Success Rate
                  </div>
                </div>
              </div>

              {/* Stat 3: 300+ Partner Universities */}
              <div className="flex items-center gap-3.5 sm:gap-4 pt-4 sm:pt-0 pl-0 sm:pl-8">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#FDF7EC] border border-[#D99A35]/20 flex items-center justify-center shrink-0 text-[#D99A35]">
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#10243F] tracking-tight leading-none">
                    300+
                  </div>
                  <div className="text-xs sm:text-[13px] text-[#64748B] font-medium mt-1">
                    Partner Universities
                  </div>
                </div>
              </div>

              {/* Stat 4: 15+ Countries */}
              <div className="flex items-center gap-3.5 sm:gap-4 pt-4 sm:pt-0 pl-0 sm:pl-8">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#FDF7EC] border border-[#D99A35]/20 flex items-center justify-center shrink-0 text-[#D99A35]">
                  <Globe2 className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#10243F] tracking-tight leading-none">
                    15+
                  </div>
                  <div className="text-xs sm:text-[13px] text-[#64748B] font-medium mt-1">
                    Countries
                  </div>
                </div>
              </div>

            </div>

            {/* Seamless Service Availability Bar */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-slate-700">Master Visa Full Support:</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 font-medium text-slate-600">
                <button
                  type="button"
                  onClick={() => onOpenCounselling('Airport Pickup & Accommodation')}
                  className="inline-flex items-center gap-1.5 hover:text-[#D99A35] transition-colors cursor-pointer"
                >
                  <Car className="w-3.5 h-3.5 text-[#D99A35]" />
                  <span>Airport Pickup & Transfer</span>
                </button>
                <span className="text-slate-300">•</span>
                <button
                  type="button"
                  onClick={() => onOpenCounselling('Airport Pickup & Accommodation')}
                  className="inline-flex items-center gap-1.5 hover:text-[#D99A35] transition-colors cursor-pointer"
                >
                  <Home className="w-3.5 h-3.5 text-[#D99A35]" />
                  <span>Verified Student Accommodation</span>
                </button>
                <span className="text-slate-300">•</span>
                <button
                  type="button"
                  onClick={() => onOpenCounselling('Student Visa Assistance')}
                  className="inline-flex items-center gap-1.5 hover:text-emerald-600 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>100% Visa Guidance</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
