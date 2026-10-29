import React from 'react';
import { ArrowRight, Play, Globe, Landmark, FileText, Plane, Users, ShieldCheck, Award } from 'lucide-react';

interface Props {
  onOpenCounselling: (destination?: string) => void;
  onSelectDestination?: (destId: string) => void;
}

export const Hero: React.FC<Props> = ({ onOpenCounselling, onSelectDestination }) => {
  const studentAvatars = [
    { name: 'Student 1', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' },
    { name: 'Student 2', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' },
    { name: 'Student 3', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80' },
    { name: 'Student 4', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80' },
  ];

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-[#EDF4FF] min-h-[640px] sm:min-h-[720px] lg:min-h-[820px] flex flex-col justify-between pt-6 sm:pt-10 pb-8 sm:pb-12"
    >
      {/* ── 1. PANORAMIC INTERNATIONAL SKYLINE & STUDENT JOURNEY BACKGROUND ── */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img
          src="/hero-scene.jpg"
          alt="Master's Abroad Journey - Student walking toward international destinations and illuminated portal"
          className="w-full h-full object-cover object-[center_35%] lg:object-center transform scale-[1.01]"
        />

        {/* Soft atmospheric gradient on left ensuring high-contrast readability without hiding the landmarks */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#EDF4FF] via-[#EDF4FF]/85 via-35% lg:via-45% to-transparent pointer-events-none" />
        {/* Soft top gradient to blend seamlessly into navbar */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#EDF4FF]/70 to-transparent pointer-events-none" />
        {/* Soft bottom gradient to blend into stats panel and destinations */}
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#EDF4FF] via-[#EDF4FF]/60 to-transparent pointer-events-none" />
      </div>

      {/* ── 2. MAIN HERO VIEWPORT CONTENT & FLOATING JOURNEY CARDS ── */}
      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6 sm:py-10">
          
          {/* Left Column: Hero Editorial Headline, CTA Buttons & Trust Indicator */}
          <div className="lg:col-span-6 xl:col-span-5 text-left z-20">
            {/* Eyebrow text matching reference screenshot */}
            <div className="inline-flex items-center gap-2 mb-3.5 sm:mb-4">
              <span className="text-[11.5px] sm:text-xs font-bold tracking-[0.22em] text-[#63718E] uppercase">
                STUDY ANYWHERE. BELONG EVERYWHERE.
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[62px] xl:text-[66px] font-black tracking-tight leading-[1.08] text-[#101E49] mb-4 sm:mb-5">
              Master’s Abroad<br />
              <span className="text-gradient-blue bg-gradient-to-r from-[#0755F5] via-[#2D6EF8] to-[#0877FF] bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-sm sm:text-base lg:text-[17px] text-[#63718E] leading-relaxed max-w-lg mb-7 sm:mb-8 font-normal">
              Discover the right universities, courses and opportunities with end-to-end support for your global education journey.
            </p>

            {/* Hero Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 sm:mb-10">
              {/* Primary: Get Started → */}
              <button
                onClick={() => onOpenCounselling()}
                className="inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-[#0755F5] to-[#0877FF] hover:from-[#0544C7] hover:to-[#0766E6] text-white text-sm sm:text-[15.5px] font-bold rounded-full shadow-lg shadow-[#0755F5]/35 hover:shadow-xl hover:shadow-[#0755F5]/45 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Secondary: ▶ How It Works */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('journey');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    onOpenCounselling('How It Works - Student Journey');
                  }
                }}
                className="inline-flex items-center gap-3 text-[#101E49] hover:text-[#0755F5] text-sm sm:text-[15px] font-bold transition-colors cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full bg-white border border-[#DCE7FA] shadow-sm flex items-center justify-center text-[#0755F5] group-hover:scale-105 group-hover:border-[#0755F5]/40 transition-all">
                  <Play className="w-4 h-4 fill-[#0755F5] ml-0.5" />
                </div>
                <span>How It Works</span>
              </button>
            </div>

            {/* Student Trust Indicator */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-2.5 overflow-hidden p-0.5">
                {studentAvatars.map((st, i) => (
                  <img
                    key={i}
                    src={st.img}
                    alt={st.name}
                    className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover shadow-xs"
                  />
                ))}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-base font-extrabold text-[#101E49] leading-tight">
                  10K+
                </span>
                <span className="text-xs text-[#63718E] font-medium leading-tight">
                  Students Guided
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Glassmorphism Journey Cards Positioned on the Scene */}
          <div className="lg:col-span-6 xl:col-span-7 relative z-20 min-h-[320px] sm:min-h-[380px] lg:min-h-[460px] flex items-center justify-center">
            
            {/* Desktop Positioned Floating Cards (matching reference layout around the student pathway) */}
            <div className="hidden md:block w-full h-full relative">
              {/* Card 1: Choose Destination (left side) */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  const el = document.getElementById('destinations');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else if (onSelectDestination) onSelectDestination('usa');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const el = document.getElementById('destinations');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="absolute top-[28%] left-[2%] xl:left-[6%] w-40 glass-card-hero rounded-2xl p-4 text-center cursor-pointer hover:-translate-y-1.5 transition-all duration-300 group"
              >
                <div className="w-10 h-10 mx-auto rounded-xl bg-[#EDF4FF] text-[#0755F5] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <Globe className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h3 className="text-[13px] font-bold text-[#101E49] group-hover:text-[#0755F5] transition-colors leading-snug">
                  Choose<br />Destination
                </h3>
              </div>

              {/* Card 2: Find Universities (mid-left near gateway) */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  const el = document.getElementById('universities');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else onOpenCounselling('University Shortlisting');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const el = document.getElementById('universities');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="absolute top-[16%] left-[28%] xl:left-[30%] w-40 glass-card-hero rounded-2xl p-4 text-center cursor-pointer hover:-translate-y-1.5 transition-all duration-300 group"
              >
                <div className="w-10 h-10 mx-auto rounded-xl bg-[#EDF4FF] text-[#0755F5] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <Landmark className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h3 className="text-[13px] font-bold text-[#101E49] group-hover:text-[#0755F5] transition-colors leading-snug">
                  Find<br />Universities
                </h3>
              </div>

              {/* Card 3: Apply with Expert Support (mid-right near gateway) */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => onOpenCounselling('Application Guidance')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onOpenCounselling('Application Guidance');
                }}
                className="absolute top-[22%] right-[22%] xl:right-[24%] w-44 glass-card-hero rounded-2xl p-4 text-center cursor-pointer hover:-translate-y-1.5 transition-all duration-300 group"
              >
                <div className="w-10 h-10 mx-auto rounded-xl bg-[#EDF4FF] text-[#0755F5] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h3 className="text-[13px] font-bold text-[#101E49] group-hover:text-[#0755F5] transition-colors leading-snug">
                  Apply with<br />Expert Support
                </h3>
              </div>

              {/* Card 4: Fly to Your Future (right side) */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => onOpenCounselling('Visa & Pre-Departure Guidance')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onOpenCounselling('Visa & Pre-Departure Guidance');
                }}
                className="absolute top-[34%] right-[0%] xl:right-[3%] w-40 glass-card-hero rounded-2xl p-4 text-center cursor-pointer hover:-translate-y-1.5 transition-all duration-300 group"
              >
                <div className="w-10 h-10 mx-auto rounded-xl bg-[#EDF4FF] text-[#0755F5] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <Plane className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h3 className="text-[13px] font-bold text-[#101E49] group-hover:text-[#0755F5] transition-colors leading-snug">
                  Fly to Your<br />Future
                </h3>
              </div>
            </div>

            {/* Mobile/Tablet Compact Journey Cards Grid */}
            <div className="md:hidden grid grid-cols-2 gap-3 w-full max-w-md pt-4">
              <div
                onClick={() => {
                  const el = document.getElementById('destinations');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="glass-card-hero rounded-2xl p-3.5 text-center cursor-pointer"
              >
                <div className="w-9 h-9 mx-auto rounded-xl bg-[#EDF4FF] text-[#0755F5] flex items-center justify-center mb-2">
                  <Globe className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#101E49]">Choose Destination</span>
              </div>

              <div
                onClick={() => {
                  const el = document.getElementById('universities');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="glass-card-hero rounded-2xl p-3.5 text-center cursor-pointer"
              >
                <div className="w-9 h-9 mx-auto rounded-xl bg-[#EDF4FF] text-[#0755F5] flex items-center justify-center mb-2">
                  <Landmark className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#101E49]">Find Universities</span>
              </div>

              <div
                onClick={() => onOpenCounselling('Application Guidance')}
                className="glass-card-hero rounded-2xl p-3.5 text-center cursor-pointer"
              >
                <div className="w-9 h-9 mx-auto rounded-xl bg-[#EDF4FF] text-[#0755F5] flex items-center justify-center mb-2">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#101E49]">Apply with Support</span>
              </div>

              <div
                onClick={() => onOpenCounselling('Visa Guidance')}
                className="glass-card-hero rounded-2xl p-3.5 text-center cursor-pointer"
              >
                <div className="w-9 h-9 mx-auto rounded-xl bg-[#EDF4FF] text-[#0755F5] flex items-center justify-center mb-2">
                  <Plane className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#101E49]">Fly to Future</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── 3. BOTTOM STATISTICS PANEL MATCHING REFERENCE SCREENSHOT ── */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-[#DCE7FA] shadow-xl shadow-[#0755F5]/8 p-4 sm:p-6 lg:py-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#DCE7FA]/80">
            
            {/* Stat 1: 10K+ Students Guided (Purple circle icon) */}
            <div className="flex items-center gap-4 pl-0 sm:pl-3 pt-2 sm:pt-0">
              <div className="w-12 h-12 rounded-full bg-[#EDE9FE] text-[#6366F1] flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-black text-[#101E49] tracking-tight leading-none">
                  10K+
                </div>
                <div className="text-xs sm:text-[13px] text-[#63718E] font-medium mt-1">
                  Students Guided
                </div>
              </div>
            </div>

            {/* Stat 2: 500+ Partner Universities (Light blue circle icon) */}
            <div className="flex items-center gap-4 pl-0 sm:pl-6 lg:pl-8 pt-4 sm:pt-0">
              <div className="w-12 h-12 rounded-full bg-[#DBEAFE] text-[#0755F5] flex items-center justify-center shrink-0">
                <Landmark className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-black text-[#101E49] tracking-tight leading-none">
                  500+
                </div>
                <div className="text-xs sm:text-[13px] text-[#63718E] font-medium mt-1">
                  Partner Universities
                </div>
              </div>
            </div>

            {/* Stat 3: 95% Visa Success Rate (Green circle icon) */}
            <div className="flex items-center gap-4 pl-0 sm:pl-6 lg:pl-8 pt-4 sm:pt-0">
              <div className="w-12 h-12 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-black text-[#101E49] tracking-tight leading-none">
                  95%
                </div>
                <div className="text-xs sm:text-[13px] text-[#63718E] font-medium mt-1">
                  Visa Success Rate
                </div>
              </div>
            </div>

            {/* Stat 4: 15+ Years of Experience (Amber circle icon) */}
            <div className="flex items-center gap-4 pl-0 sm:pl-6 lg:pl-8 pt-4 sm:pt-0">
              <div className="w-12 h-12 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="text-left">
                <div className="text-2xl sm:text-3xl font-black text-[#101E49] tracking-tight leading-none">
                  15+
                </div>
                <div className="text-xs sm:text-[13px] text-[#63718E] font-medium mt-1">
                  Years of Experience
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
