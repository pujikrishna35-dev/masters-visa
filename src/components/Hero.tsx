import React from 'react';
import { ArrowRight, Play, Plane, GraduationCap, FileCheck, ShieldCheck, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  onOpenCounselling: (destinationOrService?: string) => void;
  onSelectDestination?: (destId: string) => void;
}

interface FeatureCard {
  id: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
}

export const Hero: React.FC<Props> = ({ onOpenCounselling, onSelectDestination }) => {
  const navigate = useNavigate();

  const studentAvatars = [
    { name: 'Student 1', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' },
    { name: 'Student 2', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' },
    { name: 'Student 3', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80' },
    { name: 'Student 4', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80' },
  ];

  const featureCards: FeatureCard[] = [
    {
      id: 'destination',
      titleLine1: 'CHOOSE',
      titleLine2: 'DESTINATION',
      description: 'Explore top study destinations like USA, UK, Canada, Australia and more.',
      icon: <Plane className="w-7 h-7 text-white stroke-[2.2] -rotate-12 group-hover:rotate-0 transition-transform duration-300" />,
      action: () => {
        const el = document.getElementById('destinations');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else if (onSelectDestination) {
          onSelectDestination('usa');
        } else {
          navigate('/destinations');
        }
      },
    },
    {
      id: 'universities',
      titleLine1: 'FIND',
      titleLine2: 'UNIVERSITIES',
      description: 'Find the right universities and courses based on your goals.',
      icon: <GraduationCap className="w-7 h-7 text-white stroke-[2.2] group-hover:scale-110 transition-transform duration-300" />,
      action: () => {
        const el = document.getElementById('universities');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          navigate('/courses');
        }
      },
    },
    {
      id: 'application',
      titleLine1: 'APPLY WITH',
      titleLine2: 'EXPERT SUPPORT',
      description: 'Get expert assistance with SOPs, LORs and applications.',
      icon: <FileCheck className="w-7 h-7 text-white stroke-[2.2] group-hover:scale-110 transition-transform duration-300" />,
      action: () => onOpenCounselling('Application Support & SOP/LOR'),
    },
    {
      id: 'visa',
      titleLine1: 'GET',
      titleLine2: 'VISA GUIDANCE',
      description: 'Complete your visa process with confidence and expert guidance.',
      icon: <ShieldCheck className="w-7 h-7 text-white stroke-[2.2] group-hover:scale-110 transition-transform duration-300" />,
      action: () => {
        navigate('/visa');
      },
    },
    {
      id: 'future',
      titleLine1: 'FLY TO YOUR',
      titleLine2: 'FUTURE',
      description: 'Receive pre-departure support and start your global journey.',
      icon: <Users className="w-7 h-7 text-white stroke-[2.2] group-hover:scale-110 transition-transform duration-300" />,
      action: () => onOpenCounselling('Pre-Departure Guidance & Flight Settlement'),
    },
  ];

  return (
    <section id="home" className="relative w-full bg-white overflow-hidden">
      {/* ── 1. CINEMATIC TWILIGHT SKYLINE & AIRPLANE HERO VIEWPORT ── */}
      <div className="relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] xl:min-h-[680px] bg-[#031338] flex flex-col justify-between pt-8 sm:pt-12 pb-24 sm:pb-28 lg:pb-36 overflow-hidden">
        {/* Twilight Skyline Background with Contrail */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <img
            src="/hero-cinematic.jpg"
            alt="Master's Abroad Skyline with Airplane and Contrail"
            className="w-full h-full object-cover object-[center_30%] lg:object-center transform scale-[1.01]"
          />

          {/* Deep blue overlay on the left to guarantee 100% crisp typography legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#031338]/95 via-[#062460]/85 via-45% to-transparent pointer-events-none" />

          {/* Top subtle fade */}
          <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#031338]/60 to-transparent pointer-events-none" />
        </div>

        {/* ── 2. HERO LEFT EDITORIAL CONTENT ── */}
        <div className="relative z-20 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 xl:col-span-6 text-left">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-3.5 sm:mb-4">
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.24em] text-[#93C5FD] uppercase">
                  STUDY ANYWHERE. BELONG EVERYWHERE.
                </span>
                <span className="w-8 h-[1.5px] bg-[#38BDF8]" />
              </div>

              {/* Main Headline matching reference */}
              <h1 className="text-4xl sm:text-5xl lg:text-[62px] xl:text-[66px] font-black tracking-tight leading-[1.08] text-white mb-4 sm:mb-5">
                Master’s Abroad,<br />
                <span className="text-[#38BDF8]">
                  Made Simple
                </span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base lg:text-[17px] text-[#CBD5E1] leading-relaxed max-w-lg mb-7 sm:mb-9 font-normal">
                Discover the right universities, courses and opportunities with end-to-end support for your global education journey.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 sm:mb-10">
                {/* Primary Button */}
                <button
                  onClick={() => onOpenCounselling()}
                  className="inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-[#0755F5] to-[#0877FF] hover:from-[#0544C7] hover:to-[#0766E6] text-white text-sm sm:text-[15.5px] font-bold rounded-full shadow-lg shadow-[#0755F5]/40 hover:shadow-xl hover:shadow-[#0755F5]/50 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer group whitespace-nowrap"
                >
                  <span>Book a Free Consultation</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                {/* Secondary Button: How It Works */}
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
                  className="inline-flex items-center gap-3 text-white hover:text-[#38BDF8] text-sm sm:text-[15px] font-bold transition-colors cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#0755F5] shadow-md group-hover:scale-105 group-hover:bg-[#EDF4FF] transition-all">
                    <Play className="w-4 h-4 fill-[#0755F5] ml-0.5" />
                  </div>
                  <span>How It Works</span>
                </button>
              </div>

              {/* Trust Indicators: Avatars + 10K+ Students Guided */}
              <div className="flex items-center gap-3.5 pt-1">
                <div className="flex -space-x-2.5 overflow-hidden p-0.5">
                  {studentAvatars.map((st, i) => (
                    <img
                      key={i}
                      src={st.img}
                      alt={st.name}
                      className="inline-block h-9 w-9 rounded-full ring-2 ring-white/90 object-cover shadow-sm"
                    />
                  ))}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-base font-extrabold text-white leading-tight">
                    10K+
                  </span>
                  <span className="text-xs text-[#94A3B8] font-medium leading-tight">
                    Students Guided
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. SWEEPING CONCAVE WAVE WITH GLOWING CYAN HORIZON ARC ── */}
        <div className="absolute bottom-0 inset-x-0 overflow-hidden leading-none z-10 pointer-events-none">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-16 sm:h-20 lg:h-28"
            preserveAspectRatio="none"
          >
            {/* White solid concave fill */}
            <path
              d="M0,0 C480,105 960,105 1440,0 L1440,120 L0,120 Z"
              fill="#FFFFFF"
            />
            {/* Glowing cyan horizon curve */}
            <path
              d="M0,0 C480,105 960,105 1440,0"
              stroke="#38BDF8"
              strokeWidth="2.5"
              fill="none"
              className="filter drop-shadow-[0_0_12px_rgba(56,189,248,0.85)]"
            />
          </svg>
        </div>
      </div>

      {/* ── 4. THE 5 HEXAGONAL FEATURE CARDS STRUCTURE MATCHING REFERENCE MOCKUP ── */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 lg:-mt-24 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 xl:gap-8">
          {featureCards.map((card) => (
            <div
              key={card.id}
              onClick={card.action}
              className="flex flex-col items-center text-center cursor-pointer group"
            >
              {/* Pointy-Top Pointy-Bottom Royal Blue Hexagon Badge with Cyan Outline */}
              <div className="relative w-32 sm:w-36 h-36 sm:h-40 flex flex-col items-center justify-center p-3 transition-transform duration-300 group-hover:-translate-y-2">
                {/* SVG Hexagon Shape with Gradient and Cyan Glow */}
                <svg
                  viewBox="0 0 140 156"
                  className="absolute inset-0 w-full h-full filter drop-shadow-[0_8px_16px_rgba(7,85,245,0.32)] group-hover:drop-shadow-[0_12px_24px_rgba(56,189,248,0.5)] transition-all duration-300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id={`hexGrad-${card.id}`} x1="70" y1="0" x2="70" y2="156" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#0B42B0" />
                      <stop offset="45%" stopColor="#0755F5" />
                      <stop offset="100%" stopColor="#022878" />
                    </linearGradient>
                    <radialGradient id={`hexRadial-${card.id}`} cx="50%" cy="30%" r="60%">
                      <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Hexagon Body */}
                  <polygon
                    points="70,4 134,39 134,117 70,152 6,117 6,39"
                    fill={`url(#hexGrad-${card.id})`}
                    stroke="#38BDF8"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />

                  {/* Subtle Inner Highlight */}
                  <polygon
                    points="70,4 134,39 134,117 70,152 6,117 6,39"
                    fill={`url(#hexRadial-${card.id})`}
                  />
                </svg>

                {/* Content Inside Hexagon */}
                <div className="relative z-10 flex flex-col items-center justify-center pt-1 pb-1">
                  <div className="mb-2">
                    {card.icon}
                  </div>
                  <h3 className="text-white text-[11px] sm:text-[11.5px] font-black tracking-wider uppercase leading-tight text-center px-1">
                    {card.titleLine1}
                    <br />
                    {card.titleLine2}
                  </h3>
                </div>
              </div>

              {/* Description Below Hexagon on White Background */}
              <p className="text-xs sm:text-[13px] text-[#475569] leading-relaxed text-center font-normal mt-3 px-2 max-w-[220px]">
                {card.description}
              </p>

              {/* Action Link: Learn More → */}
              <div className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-[#0755F5] group-hover:text-[#0544C7] mt-2.5 transition-colors">
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
