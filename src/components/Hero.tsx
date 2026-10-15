import React from 'react';
import { ArrowRight, Play, GraduationCap, BarChart2, Building2, Globe2 } from 'lucide-react';

interface Props {
  onOpenCounselling: (destination?: string) => void;
  onSelectDestination?: (destId: string) => void;
}

// Crisp circular vector flags matching reference screenshot badges
const FlagUSA = () => (
  <svg viewBox="0 0 32 32" className="w-5 h-5 sm:w-6 sm:h-6 rounded-full shrink-0 shadow-sm" aria-hidden="true">
    <clipPath id="usa-clip"><circle cx="16" cy="16" r="16" /></clipPath>
    <g clipPath="url(#usa-clip)">
      <rect width="32" height="32" fill="#B22234" />
      <path d="M0 2.46h32M0 7.38h32M0 12.3h32M0 17.23h32M0 22.15h32M0 27.07h32" stroke="#FFFFFF" strokeWidth="2.46" />
      <rect width="14" height="17.23" fill="#3C3B6E" />
      <circle cx="3.5" cy="4" r="0.9" fill="#FFF" />
      <circle cx="7" cy="4" r="0.9" fill="#FFF" />
      <circle cx="10.5" cy="4" r="0.9" fill="#FFF" />
      <circle cx="5.25" cy="8.5" r="0.9" fill="#FFF" />
      <circle cx="8.75" cy="8.5" r="0.9" fill="#FFF" />
      <circle cx="3.5" cy="13" r="0.9" fill="#FFF" />
      <circle cx="7" cy="13" r="0.9" fill="#FFF" />
      <circle cx="10.5" cy="13" r="0.9" fill="#FFF" />
    </g>
  </svg>
);

const FlagUK = () => (
  <svg viewBox="0 0 32 32" className="w-5 h-5 sm:w-6 sm:h-6 rounded-full shrink-0 shadow-sm" aria-hidden="true">
    <clipPath id="uk-clip"><circle cx="16" cy="16" r="16" /></clipPath>
    <g clipPath="url(#uk-clip)">
      <rect width="32" height="32" fill="#012169" />
      <path d="M0 0 L32 32 M32 0 L0 32" stroke="#FFF" strokeWidth="5.5" />
      <path d="M0 0 L32 32 M32 0 L0 32" stroke="#C8102E" strokeWidth="2" />
      <path d="M16 0 V32 M0 16 H32" stroke="#FFF" strokeWidth="8" />
      <path d="M16 0 V32 M0 16 H32" stroke="#C8102E" strokeWidth="4.8" />
    </g>
  </svg>
);

const FlagCanada = () => (
  <svg viewBox="0 0 32 32" className="w-5 h-5 sm:w-6 sm:h-6 rounded-full shrink-0 shadow-sm" aria-hidden="true">
    <clipPath id="can-clip"><circle cx="16" cy="16" r="16" /></clipPath>
    <g clipPath="url(#can-clip)">
      <rect width="32" height="32" fill="#FF0000" />
      <rect x="8" width="16" height="32" fill="#FFFFFF" />
      <path d="M16 8l1.5 3.5 2.5-.8-1.2 3.2 2.8 1.4-2.8 1.4.6 3.5-3.4-1.8V23h-1v-4.6L11.6 20.2l.6-3.5-2.8-1.4 2.8-1.4-1.2-3.2 2.5.8z" fill="#FF0000" />
    </g>
  </svg>
);

const FlagAustralia = () => (
  <svg viewBox="0 0 32 32" className="w-5 h-5 sm:w-6 sm:h-6 rounded-full shrink-0 shadow-sm" aria-hidden="true">
    <clipPath id="aus-clip"><circle cx="16" cy="16" r="16" /></clipPath>
    <g clipPath="url(#aus-clip)">
      <rect width="32" height="32" fill="#00008B" />
      <g transform="scale(0.5)">
        <rect width="32" height="32" fill="#012169" />
        <path d="M0 0 L32 32 M32 0 L0 32" stroke="#FFF" strokeWidth="5" />
        <path d="M0 0 L32 32 M32 0 L0 32" stroke="#C8102E" strokeWidth="2" />
        <path d="M16 0 V32 M0 16 H32" stroke="#FFF" strokeWidth="7" />
        <path d="M16 0 V32 M0 16 H32" stroke="#C8102E" strokeWidth="4.5" />
      </g>
      <circle cx="8" cy="22" r="2.5" fill="#FFF" />
      <circle cx="24" cy="9" r="1" fill="#FFF" />
      <circle cx="21" cy="14" r="1" fill="#FFF" />
      <circle cx="26" cy="17" r="1" fill="#FFF" />
      <circle cx="23" cy="24" r="1" fill="#FFF" />
      <circle cx="27" cy="21" r="0.7" fill="#FFF" />
    </g>
  </svg>
);

export const Hero: React.FC<Props> = ({ onOpenCounselling, onSelectDestination }) => {
  const destinations = [
    {
      id: 'usa',
      name: 'USA',
      subtitle: 'Top Universities',
      Flag: FlagUSA,
      // Positioned to the upper-left of the central Earth globe
      className: 'top-[15%] left-[45%] lg:left-[47%]',
    },
    {
      id: 'uk',
      name: 'UK',
      subtitle: 'World-Class Education',
      Flag: FlagUK,
      // Positioned to the upper-right of the Earth globe
      className: 'top-[19%] right-[22%] lg:right-[24%]',
    },
    {
      id: 'canada',
      name: 'Canada',
      subtitle: 'Bright Opportunities',
      Flag: FlagCanada,
      // Positioned mid-right of the Earth globe
      className: 'top-[37%] right-[15%] lg:right-[17%]',
    },
    {
      id: 'australia',
      name: 'Australia',
      subtitle: 'Global Careers',
      Flag: FlagAustralia,
      // Positioned lower-right of the Earth globe
      className: 'top-[54%] right-[20%] lg:right-[22%]',
    },
  ];

  const handleDestinationClick = (id: string, name: string) => {
    if (onSelectDestination) {
      onSelectDestination(id);
    } else {
      onOpenCounselling(name);
    }
  };

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-[#FAF7F1]"
    >
      {/* ── FULL-BLEED PANORAMIC CINEMATIC SCENE BACKGROUND WITH ROTATING GLOBE ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <svg
          viewBox="0 0 1376 768"
          preserveAspectRatio="xMidYMin slice"
          className="w-full h-full pointer-events-none select-none block"
          aria-hidden="true"
        >
          {/* Panoramic sky, sunlight, landmarks, airliner and contrail */}
          <image
            href="/hero-sky-clean.jpg"
            width="1376"
            height="768"
            preserveAspectRatio="none"
          />

          {/* Earth Globe: Rotating Clockwise and Anticlockwise */}
          <image
            href="/earth-isolated.png"
            x="591"
            y="39"
            width="538"
            height="538"
            className="animate-globe-oscillate"
          />
        </svg>

        {/* Soft atmospheric gradient ensuring crisp left-side text contrast without darkening the scene */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/35 to-transparent pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />
      </div>

      {/* ── MAIN HERO VIEWPORT CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-20 pb-16 sm:pb-24 lg:pb-36 min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center">
        
        {/* Left Column: Editorial Headline & Actions (occupying ~42% width) */}
        <div className="w-full lg:w-[46%] text-left relative z-20">
          
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.24em] text-[#10243F] uppercase">
              GLOBAL EDUCATION CONSULTANCY
            </span>
          </div>

          {/* Headline with Champagne-Gold Accent on "Future" */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-[62px] xl:text-[66px] font-bold tracking-tight leading-[1.08] text-[#10243F] mb-4 sm:mb-5 drop-shadow-sm">
            Your Global<br />
            <span className="text-[#D99A35] font-serif font-bold">Future</span> Awaits
          </h1>

          {/* Supporting Description */}
          <p className="text-sm sm:text-base lg:text-[17px] text-[#475569] leading-relaxed max-w-lg mb-8 font-normal drop-shadow-sm">
            Expert guidance for university admissions, visa assistance and a brighter future in top countries.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <button
              onClick={() => onOpenCounselling()}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#D99A35] via-[#E28330] to-[#F16B55] hover:opacity-95 active:scale-[0.98] text-white text-sm sm:text-[15px] font-bold rounded-full shadow-lg shadow-[#D99A35]/35 hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer"
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
              className="inline-flex items-center gap-3 text-[#10243F] hover:text-[#D99A35] transition-colors text-sm font-semibold group cursor-pointer"
              aria-label="Watch our student success stories"
            >
              <div className="w-10 h-10 rounded-full bg-white/95 border border-slate-200/90 shadow-md flex items-center justify-center group-hover:scale-105 group-hover:border-[#D99A35] transition-all">
                <Play className="w-4 h-4 fill-[#10243F] text-[#10243F] ml-0.5 group-hover:fill-[#D99A35] group-hover:text-[#D99A35]" />
              </div>
              <span className="font-semibold text-slate-800">Watch Our Story</span>
            </button>
          </div>
        </div>

        {/* ── HANDWRITTEN SCRIPT OVERLAY IN TOP-RIGHT SKY ── */}
        <div className="hidden lg:block absolute top-8 sm:top-12 right-6 sm:right-10 text-right pointer-events-none select-none z-20">
          <span className="font-handwriting text-2xl lg:text-[27px] text-slate-700/80 rotate-[-5deg] block leading-tight font-semibold">
            Different Countries<br />New Stories<br />Same You!
          </span>
        </div>

        {/* ── FLOATING DESTINATION BADGES ANCHORED OVER THE GLOBE IN SCENE ── */}
        {destinations.map((dest) => {
          const FlagComponent = dest.Flag;
          return (
            <button
              key={dest.id}
              onClick={() => handleDestinationClick(dest.id, dest.name)}
              className={`hidden sm:flex absolute ${dest.className} z-20 items-center gap-2.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-white/95 hover:bg-white text-[#10243F] shadow-lg shadow-[#10243F]/12 border border-slate-200/90 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-[#D99A35] active:scale-95 group text-left cursor-pointer`}
              aria-label={`Explore ${dest.name}`}
            >
              <FlagComponent />
              <div className="flex flex-col leading-none">
                <span className="text-xs font-bold text-[#10243F] group-hover:text-[#D99A35] transition-colors">
                  {dest.name}
                </span>
                <span className="text-[10px] text-[#64748B] mt-0.5 font-medium">
                  {dest.subtitle}
                </span>
              </div>
            </button>
          );
        })}
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
          </div>
        </div>
      </div>
    </section>
  );
};
