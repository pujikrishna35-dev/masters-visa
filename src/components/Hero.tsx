import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { HeroImageCarousel } from './HeroImageCarousel';

interface Props {
  onOpenCounselling: () => void;
}

export const Hero: React.FC<Props> = ({ onOpenCounselling }) => {

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-white"
    >
      {/* ── BACKGROUND IMAGE (Exact Landmarks, Student, Airplane, Handwriting) ── */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-no-repeat bg-[center_center]"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
        }}
      />

      {/* ── ANIMATED AIRPLANE SOARING ACROSS HERO SKY ── */}
      <div className="absolute inset-0 z-[4] pointer-events-none overflow-hidden select-none">
        <div className="absolute animate-airplane-flight">
          <div className="animate-airplane-bob relative">
            {/* Subtle Jet Contrail Vapor Stream */}
            <div
              className="absolute -left-16 sm:-left-20 top-[58%] -translate-y-1/2 w-20 sm:w-28 h-[2px] opacity-60 pointer-events-none"
              style={{
                background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.7) 70%, rgba(255,255,255,0.95))',
                filter: 'blur(0.5px)',
                borderRadius: '999px',
                transform: 'rotate(-24deg)',
                transformOrigin: 'right center'
              }}
            />
            {/* Airplane Image (Decreased Size) */}
            <img
              src="/airplane.png"
              alt="International Flight"
              className="w-16 sm:w-20 md:w-24 lg:w-28 h-auto object-contain drop-shadow-[0_10px_18px_rgba(18,38,68,0.25)]"
              loading="eager"
            />
          </div>
        </div>
      </div>

      {/* ── GRADUATE STUDENT IN THE MIDDLE (STARTS FROM BOTTOM) ── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-[48%] lg:-translate-x-[44%] xl:-translate-x-[42%] z-[20] pointer-events-none flex items-end justify-center">
        <img
          src="/graduate-student.png?v=4"
          alt="Masters Visa Graduate Student"
          className="h-[320px] sm:h-[390px] md:h-[460px] lg:h-[520px] xl:h-[570px] w-auto object-contain object-bottom drop-shadow-[0_16px_32px_rgba(18,38,68,0.35)]"
          loading="eager"
        />
      </div>

      {/* ── MAIN HERO CONTENT CONTAINER ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-14 lg:pb-24 min-h-[540px] lg:min-h-[580px] xl:min-h-[610px] flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* ── LEFT COLUMN: HEADLINE & ACTIONS (Col 1-7) ── */}
          <div className="lg:col-span-7 xl:col-span-7 text-left max-w-xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
              <span className="text-xs sm:text-[13px] font-extrabold tracking-[0.22em] text-slate-600 uppercase">
                GLOBAL EDUCATION &bull; BRIGHTER CAREERS
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-bold tracking-tight leading-[1.08] text-brand-navy mb-4 sm:mb-5">
              Your Master&apos;s<br />
              Journey<br />
              <span className="text-brand-coral">Beyond Borders</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg mb-6 sm:mb-7 font-normal">
              Expert guidance to help you choose the right country, university and Master&apos;s program &mdash; from application to visa and beyond.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-6 sm:mb-8">
              {/* Primary button */}
              <button
                onClick={onOpenCounselling}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-coral hover:bg-brand-coral-hover text-white text-sm sm:text-base font-bold rounded-full shadow-lg shadow-brand-coral/25 hover:shadow-brand-coral/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
              >
                <span>Book Free Counselling</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Secondary button */}
              <a
                href="#destinations"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/95 hover:bg-white text-brand-navy text-sm sm:text-base font-semibold rounded-full border border-slate-300 hover:border-slate-400 shadow-sm hover:shadow transition-all duration-200"
              >
                <span>Explore Destinations</span>
              </a>
            </div>

            {/* Trust Features */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs sm:text-sm font-semibold text-slate-700">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span>100% Free Consultation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span>35+ Global Study Hubs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                <span>95% Visa Success Rate</span>
              </div>
            </div>
          </div>

          {/* Spacer for right column on desktop grid */}
          <div className="hidden lg:block lg:col-span-5 min-h-[120px]" />

        </div>
      </div>

      {/* ── CONTINUOUS HORIZONTAL IMAGE CAROUSEL (STARTS FROM FAR RIGHT SIDE OF SCREEN) ── */}
      {/* Mobile & Tablet (< lg): Flows smoothly under content */}
      <div className="lg:hidden relative z-[5] w-full px-4 pb-6 overflow-hidden">
        <HeroImageCarousel onSelectCountry={() => onOpenCounselling()} />
      </div>

      {/* Desktop (lg+): Extends all the way to the far right edge of the screen, elevated higher up */}
      <div className="hidden lg:block absolute right-0 bottom-28 xl:bottom-36 left-[43%] xl:left-[41%] z-[5] overflow-hidden">
        <HeroImageCarousel onSelectCountry={() => onOpenCounselling()} />
      </div>
    </section>
  );
};
