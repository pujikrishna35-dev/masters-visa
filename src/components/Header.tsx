import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X, ArrowRight, ChevronDown, PhoneCall, Globe, Plane } from 'lucide-react';
import { Logo } from './Logo';

interface Props {
  onOpenCounselling: (serviceOrDest?: string) => void;
  onOpenSearch: () => void;
  onSelectDestination?: (destId: string) => void;
  onSelectService?: (serviceId: string) => void;
}

const getNavFromHash = (): string => {
  if (typeof window === 'undefined') return 'home';
  const raw = window.location.hash.replace(/^#/, '').toLowerCase();
  if (!raw || raw === 'home') return 'home';
  if (raw === 'about' || raw === 'why-us') return 'about';
  if (raw === 'destinations') return 'destinations';
  if (raw === 'services') return 'services';
  if (raw === 'process' || raw === 'journey') return 'process';
  if (raw === 'testimonials' || raw === 'success-stories') return 'testimonials';
  if (raw === 'blog' || raw === 'news') return 'blog';
  if (raw === 'contact' || raw === 'branches' || raw === 'contact-us') return 'contact';
  return 'home';
};

// Subtle digital dotted world-map texture for left side (Americas / Atlantic)
const LeftWorldMapDots: React.FC = () => (
  <svg
    viewBox="0 0 240 64"
    className="absolute left-0 top-0 h-full w-60 pointer-events-none select-none opacity-35"
    fill="none"
    aria-hidden="true"
  >
    <g fill="#38bdf8">
      {/* North America dots */}
      <circle cx="28" cy="16" r="1.1" opacity="0.6" />
      <circle cx="36" cy="14" r="1.2" opacity="0.8" />
      <circle cx="44" cy="18" r="1.0" opacity="0.7" />
      <circle cx="32" cy="22" r="1.3" opacity="0.9" />
      <circle cx="40" cy="24" r="1.1" opacity="0.6" />
      <circle cx="48" cy="22" r="1.2" opacity="0.85" />
      <circle cx="56" cy="20" r="1.0" opacity="0.5" />
      <circle cx="26" cy="28" r="1.0" opacity="0.5" />
      <circle cx="34" cy="30" r="1.2" opacity="0.7" />
      <circle cx="42" cy="32" r="1.1" opacity="0.8" />
      <circle cx="50" cy="28" r="1.2" opacity="0.9" />
      <circle cx="58" cy="26" r="1.0" opacity="0.6" />

      {/* Central & South America dots */}
      <circle cx="46" cy="38" r="1.0" opacity="0.5" />
      <circle cx="52" cy="42" r="1.2" opacity="0.75" />
      <circle cx="58" cy="46" r="1.3" opacity="0.8" />
      <circle cx="64" cy="48" r="1.1" opacity="0.6" />
      <circle cx="56" cy="52" r="1.2" opacity="0.7" />
      <circle cx="62" cy="56" r="1.0" opacity="0.5" />

      {/* Atlantic connection points */}
      <circle cx="74" cy="24" r="0.9" opacity="0.4" />
      <circle cx="86" cy="28" r="1.0" opacity="0.45" />
      <circle cx="98" cy="22" r="0.8" opacity="0.35" />
      <circle cx="112" cy="30" r="0.9" opacity="0.3" />
      <circle cx="126" cy="26" r="0.8" opacity="0.25" />
      <circle cx="82" cy="40" r="0.9" opacity="0.35" />
      <circle cx="96" cy="44" r="0.8" opacity="0.3" />
    </g>
    {/* Delicate connecting grid lines */}
    <path
      d="M32 22 L40 24 L50 28 L58 46 L64 48 M44 18 L48 22 L74 24 L86 28"
      stroke="#38bdf8"
      strokeWidth="0.5"
      strokeDasharray="2 3"
      opacity="0.3"
    />
  </svg>
);

// Subtle digital dotted world-map texture for right side (Eurasia / Australia / Pacific)
const RightWorldMapDots: React.FC = () => (
  <svg
    viewBox="0 0 280 64"
    className="absolute right-0 top-0 h-full w-72 pointer-events-none select-none opacity-40"
    fill="none"
    aria-hidden="true"
  >
    <g fill="#38bdf8">
      {/* Europe & Middle East */}
      <circle cx="70" cy="18" r="1.1" opacity="0.5" />
      <circle cx="80" cy="16" r="1.2" opacity="0.7" />
      <circle cx="92" cy="14" r="1.0" opacity="0.6" />
      <circle cx="74" cy="24" r="1.2" opacity="0.8" />
      <circle cx="86" cy="22" r="1.3" opacity="0.9" />
      <circle cx="96" cy="20" r="1.1" opacity="0.75" />
      <circle cx="82" cy="30" r="1.0" opacity="0.5" />
      <circle cx="92" cy="28" r="1.2" opacity="0.8" />

      {/* Asia & Pacific */}
      <circle cx="110" cy="16" r="1.1" opacity="0.6" />
      <circle cx="122" cy="18" r="1.2" opacity="0.8" />
      <circle cx="134" cy="16" r="1.0" opacity="0.65" />
      <circle cx="146" cy="20" r="1.2" opacity="0.75" />
      <circle cx="116" cy="24" r="1.3" opacity="0.85" />
      <circle cx="128" cy="26" r="1.1" opacity="0.7" />
      <circle cx="140" cy="28" r="1.2" opacity="0.8" />
      <circle cx="154" cy="26" r="1.0" opacity="0.6" />
      <circle cx="168" cy="30" r="1.1" opacity="0.55" />
      <circle cx="132" cy="34" r="1.0" opacity="0.5" />
      <circle cx="144" cy="36" r="1.2" opacity="0.7" />

      {/* Australia dots */}
      <circle cx="178" cy="44" r="1.2" opacity="0.8" />
      <circle cx="188" cy="42" r="1.3" opacity="0.9" />
      <circle cx="196" cy="46" r="1.1" opacity="0.75" />
      <circle cx="184" cy="50" r="1.2" opacity="0.85" />
      <circle cx="192" cy="52" r="1.0" opacity="0.6" />

      {/* Far right nodes */}
      <circle cx="210" cy="24" r="0.9" opacity="0.4" />
      <circle cx="224" cy="20" r="1.1" opacity="0.5" />
      <circle cx="238" cy="28" r="1.0" opacity="0.4" />
      <circle cx="252" cy="22" r="1.2" opacity="0.6" />
      <circle cx="264" cy="32" r="1.0" opacity="0.45" />
      <circle cx="244" cy="40" r="0.9" opacity="0.35" />
    </g>
    {/* Delicate connecting violet/cyan flight network lines */}
    <path
      d="M86 22 L116 24 L140 28 L188 42 M146 20 L168 30 L224 20 L252 22"
      stroke="#818cf8"
      strokeWidth="0.5"
      strokeDasharray="2 3"
      opacity="0.35"
    />
  </svg>
);

export const Header: React.FC<Props> = ({
  onOpenCounselling,
  onOpenSearch,
  onSelectDestination,
  onSelectService,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [studyDropdownOpen, setStudyDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [activeSection, setActiveSection] = useState<string>(() => getNavFromHash());

  const isClickScrollingRef = useRef(false);
  const clickScrollTimerRef = useRef<number | null>(null);

  const destDropdownRef = useRef<HTMLDivElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Sync active section on hashchange and popstate
  useEffect(() => {
    const handleUrlHashSync = () => {
      const navId = getNavFromHash();
      setActiveSection(navId);
    };

    window.addEventListener('hashchange', handleUrlHashSync);
    window.addEventListener('popstate', handleUrlHashSync);

    return () => {
      window.removeEventListener('hashchange', handleUrlHashSync);
      window.removeEventListener('popstate', handleUrlHashSync);
    };
  }, []);

  // Scroll spy: determine active section and sticky header elevation
  useEffect(() => {
    let ticking = false;

    const sectionsInDomOrder = [
      { id: 'home', elIds: ['home'] },
      { id: 'destinations', elIds: ['destinations'] },
      { id: 'services', elIds: ['services'] },
      { id: 'process', elIds: ['process', 'journey'] },
      { id: 'testimonials', elIds: ['testimonials'] },
      { id: 'about', elIds: ['about', 'why-us'] },
      { id: 'blog', elIds: ['blog', 'news'] },
      { id: 'contact', elIds: ['contact', 'branches', 'contact-us'] },
    ];

    const determineActiveSection = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 15);

      if (isClickScrollingRef.current) return;

      if (scrollY < 120) {
        setActiveSection('home');
        return;
      }

      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection('contact');
        return;
      }

      let currentActive = 'home';
      let maxTop = -Infinity;

      for (const section of sectionsInDomOrder) {
        for (const elId of section.elIds) {
          const el = document.getElementById(elId);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 160 && rect.top > maxTop) {
              maxTop = rect.top;
              currentActive = section.id;
            }
            break;
          }
        }
      }

      setActiveSection(currentActive);
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          determineActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    determineActiveSection();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (clickScrollTimerRef.current) {
        window.clearTimeout(clickScrollTimerRef.current);
      }
    };
  }, []);

  // Close dropdowns on outside click or tap
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (destDropdownRef.current && !destDropdownRef.current.contains(target)) {
        setStudyDropdownOpen(false);
      }
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(target)) {
        setServicesDropdownOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(target)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Keyboard navigation: Escape key closes all dropdowns
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setStudyDropdownOpen(false);
        setServicesDropdownOpen(false);
        setLangDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Navigation handlers
  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setStudyDropdownOpen(false);
    setServicesDropdownOpen(false);
    setLangDropdownOpen(false);

    setActiveSection('home');
    isClickScrollingRef.current = true;
    if (clickScrollTimerRef.current) window.clearTimeout(clickScrollTimerRef.current);
    clickScrollTimerRef.current = window.setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 850);

    if (window.location.hash) {
      window.history.pushState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionNav = (e: React.MouseEvent, navId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setStudyDropdownOpen(false);
    setServicesDropdownOpen(false);
    setLangDropdownOpen(false);

    setActiveSection(navId);
    isClickScrollingRef.current = true;
    if (clickScrollTimerRef.current) window.clearTimeout(clickScrollTimerRef.current);
    clickScrollTimerRef.current = window.setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 850);

    if (window.location.hash !== `#${navId}`) {
      window.history.pushState(null, '', `#${navId}`);
    }

    const el =
      navId === 'process' ? (document.getElementById('process') || document.getElementById('journey')) :
      navId === 'blog' ? (document.getElementById('blog') || document.getElementById('news')) :
      navId === 'about' ? (document.getElementById('about') || document.getElementById('why-us')) :
      navId === 'contact' ? (document.getElementById('contact') || document.getElementById('branches')) :
      document.getElementById(navId);

    if (el) {
      const headerOffset = 84;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleDestinationClick = (destId: string) => {
    setStudyDropdownOpen(false);
    setMobileMenuOpen(false);
    setActiveSection('destinations');
    isClickScrollingRef.current = true;
    if (clickScrollTimerRef.current) window.clearTimeout(clickScrollTimerRef.current);
    clickScrollTimerRef.current = window.setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 850);

    if (window.location.hash !== '#destinations') {
      window.history.pushState(null, '', '#destinations');
    }

    if (onSelectDestination) {
      onSelectDestination(destId);
    }
    const el = document.getElementById('destinations');
    if (el) {
      const headerOffset = 84;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleServiceClick = (serviceId: string, title: string) => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    setActiveSection('services');
    isClickScrollingRef.current = true;
    if (clickScrollTimerRef.current) window.clearTimeout(clickScrollTimerRef.current);
    clickScrollTimerRef.current = window.setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 850);

    if (window.location.hash !== '#services') {
      window.history.pushState(null, '', '#services');
    }

    const el = document.getElementById('services');
    if (el) {
      const headerOffset = 84;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    if (onSelectService) {
      onSelectService(serviceId);
    } else {
      onOpenCounselling(title);
    }
  };

  const destinationOptions = [
    { id: 'usa', name: 'USA', flag: '🇺🇸', sub: 'Top Universities & OPT' },
    { id: 'uk', name: 'UK', flag: '🇬🇧', sub: 'World-Class Education' },
    { id: 'canada', name: 'Canada', flag: '🇨🇦', sub: 'Bright Opportunities' },
    { id: 'australia', name: 'Australia', flag: '🇦🇺', sub: 'Global Careers & PR' },
    { id: 'germany', name: 'Germany', flag: '🇩🇪', sub: 'Low/No Tuition & Tech' },
    { id: 'ireland', name: 'Ireland', flag: '🇮🇪', sub: 'European Tech Hub' },
  ];

  const serviceOptions = [
    {
      id: 'admissions',
      title: 'University Admissions',
      desc: 'Get guidance on university selection, course applications, admission requirements, and offer letters.',
    },
    {
      id: 'visa',
      title: 'Student Visa Assistance',
      desc: 'Get guidance on visa applications, required documents, financial evidence, and interview preparation.',
    },
    {
      id: 'document',
      title: 'Documentation & SOP Guidance',
      desc: 'Assistance with SOPs, LORs, CVs, document checklists, and application paperwork.',
    },
    {
      id: 'counselling',
      title: 'Career & Course Counselling',
      desc: 'Find suitable courses and universities aligned with your academic background and career goals.',
    },
    {
      id: 'predeparture',
      title: 'Pre-Departure Support',
      desc: 'Prepare for your international journey with travel checklists, accommodation guidance, and practical advice.',
    },
  ];

  const supportedLanguages = [{ code: 'EN', name: 'English (US)' }];

  return (
    <>
      {/* ── STICKY TOP CONTAINER (FULL VIEWPORT WIDTH) ── */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 pointer-events-none select-none ${
          isScrolled ? 'pt-1.5 sm:pt-2 pb-1 px-2.5 sm:px-4 lg:px-6' : 'pt-2 sm:pt-3 pb-1.5 px-2.5 sm:px-4 lg:px-6'
        }`}
      >
        <div className="w-full pointer-events-auto">
          {/* ── MAIN HORIZONTAL PILL-SHAPED NAVBAR CONTAINER (FULL WIDTH ACROSS VIEWPORT) ── */}
          <div
            className={`w-full relative rounded-full transition-all duration-300 flex items-center justify-between px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 ${
              isScrolled
                ? 'shadow-[0_16px_40px_-6px_rgba(0,0,0,0.85),0_0_24px_rgba(14,165,233,0.32),inset_0_1px_1px_rgba(255,255,255,0.18)]'
                : 'shadow-[0_12px_36px_-6px_rgba(0,0,0,0.75),0_0_20px_rgba(14,165,233,0.25),inset_0_1px_1px_rgba(255,255,255,0.14)]'
            }`}
            style={{
              background:
                'linear-gradient(90deg, #050d26 0%, #07153a 22%, #0b1e4f 50%, #09173f 78%, #0f183d 100%)',
              border: '1px solid rgba(56, 189, 248, 0.42)',
            }}
          >
            {/* ── CLIPPED BACKGROUND DECORATIONS (GLOWS, DOTTED MAPS, ARCS & TRAILS) ── */}
            <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
              {/* Left Electric Cyan Ambient */}
              <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-sky-400/20 via-sky-500/5 to-transparent rounded-l-full" />
              {/* Right Restrained Violet / Purple Glow */}
              <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-violet-600/30 via-purple-600/10 to-transparent rounded-r-full" />

              {/* Dotted World-Map Textures */}
              <LeftWorldMapDots />
              <RightWorldMapDots />

              {/* Glowing Orange Light Arc Over The Brand Section (Top-Left) */}
              <svg
                className="absolute -top-1 left-2 sm:left-3 w-56 sm:w-64 h-8 overflow-visible z-10"
                viewBox="0 0 240 32"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M 6,26 C 30,5 95,0 155,5 C 190,9 215,18 225,26"
                  stroke="url(#nav-brand-arc-glow)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  filter="url(#nav-arc-shadow)"
                />
                <defs>
                  <linearGradient id="nav-brand-arc-glow" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FF7A29" stopOpacity="0" />
                    <stop offset="35%" stopColor="#FF8A3D" stopOpacity="0.95" />
                    <stop offset="70%" stopColor="#FFA45B" stopOpacity="1" />
                    <stop offset="100%" stopColor="#FF7A29" stopOpacity="0" />
                  </linearGradient>
                  <filter id="nav-arc-shadow" x="-20%" y="-40%" width="140%" height="180%">
                    <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#FF7A29" floodOpacity="0.8" />
                  </filter>
                </defs>
              </svg>

              {/* Delicate Curved Orange Flight Trail (Far Right) */}
              <svg
                className="absolute -bottom-1 -right-1 w-32 h-16 overflow-visible z-10"
                viewBox="0 0 120 60"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M 2,42 C 34,48 68,40 92,23 C 102,13 108,7 112,5"
                  stroke="url(#nav-flight-trail-gradient)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  filter="url(#nav-trail-shadow)"
                />
                <defs>
                  <linearGradient id="nav-flight-trail-gradient" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FF7A29" stopOpacity="0" />
                    <stop offset="45%" stopColor="#FF7A29" stopOpacity="0.85" />
                    <stop offset="85%" stopColor="#FFAE68" stopOpacity="1" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
                  </linearGradient>
                  <filter id="nav-trail-shadow" x="-20%" y="-40%" width="140%" height="180%">
                    <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#FF7A29" floodOpacity="0.75" />
                  </filter>
                </defs>
              </svg>
            </div>

            {/* ── BRAND SECTION (LEFT) ── */}
            <div className="relative z-20 flex items-center shrink-0">
              {/* Rounded capsule chamber for the brand matching screenshot */}
              <div
                className="flex items-center bg-[#091538]/75 border border-sky-400/25 rounded-full px-3 py-1 sm:px-3.5 sm:py-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-transform duration-200 hover:border-sky-400/40"
              >
                <Logo variant="light" size="sm" onClick={handleHomeClick} />
              </div>

              {/* Subtle divider between brand area and navigation */}
              <div
                className="hidden lg:block h-6 w-[1px] bg-gradient-to-b from-transparent via-sky-400/30 to-transparent ml-2.5 mr-1"
                aria-hidden="true"
              />
            </div>

            {/* ── DESKTOP NAVIGATION LINKS (CENTERED & BALANCED) ── */}
            <nav className="hidden lg:flex items-center justify-center flex-1 space-x-1 xl:space-x-1.5 2xl:space-x-2 relative z-20 mx-2">
              {/* 1. Home */}
              <a
                href="#home"
                onClick={handleHomeClick}
                className={`transition-all duration-200 flex flex-col items-center justify-center cursor-pointer select-none ${
                  activeSection === 'home'
                    ? 'px-3.5 py-1 rounded-full bg-[#12234e]/95 border border-sky-400/40 shadow-[0_0_14px_rgba(14,165,233,0.25)]'
                    : 'px-2.5 py-1 rounded-full text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                <span
                  className={`text-[13px] xl:text-[13.5px] leading-tight whitespace-nowrap ${
                    activeSection === 'home' ? 'font-bold text-[#FF8A3D]' : 'font-medium'
                  }`}
                >
                  Home
                </span>
                {activeSection === 'home' && (
                  <span className="w-5 h-[2.5px] bg-gradient-to-r from-[#FF7A29] to-[#FF5500] rounded-full mt-0.5 shadow-[0_0_8px_#FF7A29] block animate-fadeIn" />
                )}
              </a>

              {/* 2. About */}
              <a
                href="#about"
                onClick={(e) => handleSectionNav(e, 'about')}
                className={`transition-all duration-200 flex flex-col items-center justify-center cursor-pointer select-none ${
                  activeSection === 'about'
                    ? 'px-3.5 py-1 rounded-full bg-[#12234e]/95 border border-sky-400/40 shadow-[0_0_14px_rgba(14,165,233,0.25)]'
                    : 'px-2.5 py-1 rounded-full text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                <span
                  className={`text-[13px] xl:text-[13.5px] leading-tight whitespace-nowrap ${
                    activeSection === 'about' ? 'font-bold text-[#FF8A3D]' : 'font-medium'
                  }`}
                >
                  About
                </span>
                {activeSection === 'about' && (
                  <span className="w-5 h-[2.5px] bg-gradient-to-r from-[#FF7A29] to-[#FF5500] rounded-full mt-0.5 shadow-[0_0_8px_#FF7A29] block animate-fadeIn" />
                )}
              </a>

              {/* 3. Destinations Dropdown */}
              <div ref={destDropdownRef} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setStudyDropdownOpen(!studyDropdownOpen);
                    setServicesDropdownOpen(false);
                    setLangDropdownOpen(false);
                  }}
                  aria-expanded={studyDropdownOpen}
                  aria-haspopup="true"
                  className={`transition-all duration-200 flex flex-col items-center justify-center cursor-pointer select-none group ${
                    activeSection === 'destinations'
                      ? 'px-3.5 py-1 rounded-full bg-[#12234e]/95 border border-sky-400/40 shadow-[0_0_14px_rgba(14,165,233,0.25)]'
                      : 'px-2.5 py-1 rounded-full text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <span
                      className={`text-[13px] xl:text-[13.5px] leading-tight whitespace-nowrap ${
                        activeSection === 'destinations' ? 'font-bold text-[#FF8A3D]' : 'font-medium'
                      }`}
                    >
                      Destinations
                    </span>
                    <ChevronDown
                      className={`w-3 h-3 text-white/60 group-hover:text-white transition-transform duration-200 ${
                        studyDropdownOpen ? 'rotate-180 text-[#FF8A3D]' : ''
                      }`}
                    />
                  </div>
                  {activeSection === 'destinations' && (
                    <span className="w-5 h-[2.5px] bg-gradient-to-r from-[#FF7A29] to-[#FF5500] rounded-full mt-0.5 shadow-[0_0_8px_#FF7A29] block animate-fadeIn" />
                  )}
                </button>

                {studyDropdownOpen && (
                  <div className="absolute top-[calc(100%+8px)] left-0 w-64 animate-fadeIn z-50">
                    <div className="bg-[#081333]/98 backdrop-blur-xl rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(14,165,233,0.25)] border border-sky-400/35 p-2 space-y-1">
                      {destinationOptions.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleDestinationClick(item.id)}
                          className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 hover:border hover:border-sky-400/30 transition-all group cursor-pointer"
                        >
                          <span className="text-xl">{item.flag}</span>
                          <div>
                            <p className="text-xs font-bold text-white group-hover:text-[#FF8A3D] transition-colors">
                              {item.name}
                            </p>
                            <p className="text-[10px] text-sky-200/70">{item.sub}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Services Dropdown */}
              <div ref={servicesDropdownRef} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setServicesDropdownOpen(!servicesDropdownOpen);
                    setStudyDropdownOpen(false);
                    setLangDropdownOpen(false);
                  }}
                  aria-expanded={servicesDropdownOpen}
                  aria-haspopup="true"
                  className={`transition-all duration-200 flex flex-col items-center justify-center cursor-pointer select-none group ${
                    activeSection === 'services'
                      ? 'px-3.5 py-1 rounded-full bg-[#12234e]/95 border border-sky-400/40 shadow-[0_0_14px_rgba(14,165,233,0.25)]'
                      : 'px-2.5 py-1 rounded-full text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <span
                      className={`text-[13px] xl:text-[13.5px] leading-tight whitespace-nowrap ${
                        activeSection === 'services' ? 'font-bold text-[#FF8A3D]' : 'font-medium'
                      }`}
                    >
                      Services
                    </span>
                    <ChevronDown
                      className={`w-3 h-3 text-white/60 group-hover:text-white transition-transform duration-200 ${
                        servicesDropdownOpen ? 'rotate-180 text-[#FF8A3D]' : ''
                      }`}
                    />
                  </div>
                  {activeSection === 'services' && (
                    <span className="w-5 h-[2.5px] bg-gradient-to-r from-[#FF7A29] to-[#FF5500] rounded-full mt-0.5 shadow-[0_0_8px_#FF7A29] block animate-fadeIn" />
                  )}
                </button>

                {servicesDropdownOpen && (
                  <div className="absolute top-[calc(100%+8px)] left-0 w-80 animate-fadeIn z-50">
                    <div className="bg-[#081333]/98 backdrop-blur-xl rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(14,165,233,0.25)] border border-sky-400/35 p-2 space-y-1">
                      {serviceOptions.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleServiceClick(item.id, item.title)}
                          className="w-full text-left block px-3 py-2 rounded-xl hover:bg-white/10 hover:border hover:border-sky-400/30 transition-all group cursor-pointer"
                        >
                          <p className="text-xs font-bold text-white group-hover:text-[#FF8A3D] transition-colors">
                            {item.title}
                          </p>
                          <p className="text-[10px] text-sky-200/70 leading-snug mt-0.5">
                            {item.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Process */}
              <a
                href="#process"
                onClick={(e) => handleSectionNav(e, 'process')}
                className={`transition-all duration-200 flex flex-col items-center justify-center cursor-pointer select-none ${
                  activeSection === 'process'
                    ? 'px-3.5 py-1 rounded-full bg-[#12234e]/95 border border-sky-400/40 shadow-[0_0_14px_rgba(14,165,233,0.25)]'
                    : 'px-2.5 py-1 rounded-full text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                <span
                  className={`text-[13px] xl:text-[13.5px] leading-tight whitespace-nowrap ${
                    activeSection === 'process' ? 'font-bold text-[#FF8A3D]' : 'font-medium'
                  }`}
                >
                  Process
                </span>
                {activeSection === 'process' && (
                  <span className="w-5 h-[2.5px] bg-gradient-to-r from-[#FF7A29] to-[#FF5500] rounded-full mt-0.5 shadow-[0_0_8px_#FF7A29] block animate-fadeIn" />
                )}
              </a>

              {/* 6. Success Stories */}
              <a
                href="#testimonials"
                onClick={(e) => handleSectionNav(e, 'testimonials')}
                className={`transition-all duration-200 flex flex-col items-center justify-center cursor-pointer select-none ${
                  activeSection === 'testimonials'
                    ? 'px-3.5 py-1 rounded-full bg-[#12234e]/95 border border-sky-400/40 shadow-[0_0_14px_rgba(14,165,233,0.25)]'
                    : 'px-2.5 py-1 rounded-full text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                <span
                  className={`text-[13px] xl:text-[13.5px] leading-tight whitespace-nowrap ${
                    activeSection === 'testimonials' ? 'font-bold text-[#FF8A3D]' : 'font-medium'
                  }`}
                >
                  Success Stories
                </span>
                {activeSection === 'testimonials' && (
                  <span className="w-5 h-[2.5px] bg-gradient-to-r from-[#FF7A29] to-[#FF5500] rounded-full mt-0.5 shadow-[0_0_8px_#FF7A29] block animate-fadeIn" />
                )}
              </a>

              {/* 7. Blog */}
              <a
                href="#blog"
                onClick={(e) => handleSectionNav(e, 'blog')}
                className={`transition-all duration-200 flex flex-col items-center justify-center cursor-pointer select-none ${
                  activeSection === 'blog'
                    ? 'px-3.5 py-1 rounded-full bg-[#12234e]/95 border border-sky-400/40 shadow-[0_0_14px_rgba(14,165,233,0.25)]'
                    : 'px-2.5 py-1 rounded-full text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                <span
                  className={`text-[13px] xl:text-[13.5px] leading-tight whitespace-nowrap ${
                    activeSection === 'blog' ? 'font-bold text-[#FF8A3D]' : 'font-medium'
                  }`}
                >
                  Blog
                </span>
                {activeSection === 'blog' && (
                  <span className="w-5 h-[2.5px] bg-gradient-to-r from-[#FF7A29] to-[#FF5500] rounded-full mt-0.5 shadow-[0_0_8px_#FF7A29] block animate-fadeIn" />
                )}
              </a>

              {/* 8. Contact */}
              <a
                href="#contact"
                onClick={(e) => handleSectionNav(e, 'contact')}
                className={`transition-all duration-200 flex flex-col items-center justify-center cursor-pointer select-none ${
                  activeSection === 'contact'
                    ? 'px-3.5 py-1 rounded-full bg-[#12234e]/95 border border-sky-400/40 shadow-[0_0_14px_rgba(14,165,233,0.25)]'
                    : 'px-2.5 py-1 rounded-full text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                <span
                  className={`text-[13px] xl:text-[13.5px] leading-tight whitespace-nowrap ${
                    activeSection === 'contact' ? 'font-bold text-[#FF8A3D]' : 'font-medium'
                  }`}
                >
                  Contact
                </span>
                {activeSection === 'contact' && (
                  <span className="w-5 h-[2.5px] bg-gradient-to-r from-[#FF7A29] to-[#FF5500] rounded-full mt-0.5 shadow-[0_0_8px_#FF7A29] block animate-fadeIn" />
                )}
              </a>
            </nav>

            {/* ── RIGHT-SIDE CONTROLS ── */}
            <div className="flex items-center gap-2 sm:gap-2.5 xl:gap-3 relative z-20 shrink-0">
              {/* 1. Circular Search Button */}
              <button
                type="button"
                onClick={onOpenSearch}
                aria-label="Search site"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0e1b3d]/90 border border-sky-400/40 shadow-[0_0_12px_rgba(56,189,248,0.25)] flex items-center justify-center text-sky-200 hover:text-white hover:border-sky-300 hover:bg-[#142654] hover:shadow-[0_0_18px_rgba(56,189,248,0.4)] transition-all cursor-pointer active:scale-95"
              >
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-100" />
              </button>

              {/* 2. Language Selector Pill */}
              <div ref={langDropdownRef} className="relative hidden sm:block">
                <button
                  type="button"
                  onClick={() => {
                    setLangDropdownOpen(!langDropdownOpen);
                    setStudyDropdownOpen(false);
                    setServicesDropdownOpen(false);
                  }}
                  aria-label="Select Language"
                  aria-expanded={langDropdownOpen}
                  aria-haspopup="true"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0e1b3d]/90 border border-sky-400/35 shadow-[0_0_10px_rgba(56,189,248,0.18)] text-xs font-semibold text-white hover:border-sky-300 hover:bg-[#142654] transition-all cursor-pointer focus:outline-none"
                >
                  <Globe className="w-3.5 h-3.5 text-sky-300" />
                  <span>{selectedLang}</span>
                  <ChevronDown
                    className={`w-3 h-3 text-sky-300/80 transition-transform duration-200 ${
                      langDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {langDropdownOpen && (
                  <div className="absolute top-[calc(100%+8px)] right-0 w-36 animate-fadeIn z-50">
                    <div className="bg-[#081333]/98 backdrop-blur-xl rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(14,165,233,0.25)] border border-sky-400/35 p-1 space-y-0.5">
                      {supportedLanguages.map((lang) => (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            setSelectedLang(lang.code);
                            setLangDropdownOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg font-medium transition-colors flex items-center justify-between ${
                            selectedLang === lang.code
                              ? 'bg-white/15 text-[#FF8A3D] font-bold'
                              : 'text-slate-200 hover:bg-white/10'
                          }`}
                        >
                          <span>{lang.name}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A3D]" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Orange-to-Coral Pill CTA Button */}
              <button
                type="button"
                onClick={() => onOpenCounselling()}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 bg-gradient-to-r from-[#FF6B00] via-[#FF5514] to-[#FF3D57] hover:from-[#ff7714] hover:to-[#ff4a62] text-white font-bold text-xs sm:text-[13px] rounded-full shadow-[0_0_20px_rgba(255,107,0,0.55)] hover:shadow-[0_0_28px_rgba(255,107,0,0.85)] active:scale-[0.98] transition-all group cursor-pointer whitespace-nowrap"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* 4. White Airplane Silhouette Accent (Right Edge) */}
              <div
                className="hidden sm:flex items-center justify-center pointer-events-none z-20 shrink-0 pr-0.5"
                aria-hidden="true"
              >
                <Plane className="w-3.5 h-3.5 text-white fill-white rotate-45 drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
              </div>

              {/* 5. Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                aria-expanded={mobileMenuOpen}
                className="lg:hidden w-8 h-8 rounded-full bg-[#0e1b3d]/90 border border-sky-400/40 flex items-center justify-center text-white hover:text-[#FF8A3D] active:scale-90 transition-all cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* ── MOBILE NAVIGATION DRAWER (MATCHING DARK NAVY THEME) ── */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-2 rounded-3xl bg-[#06102a]/98 backdrop-blur-2xl border border-sky-400/35 px-4 pt-3 pb-5 shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_25px_rgba(14,165,233,0.25)] animate-fadeIn">
              <div className="flex flex-col space-y-1.5">
                <a
                  href="#home"
                  onClick={handleHomeClick}
                  className={`px-3 py-2 text-sm rounded-xl transition-all flex items-center justify-between ${
                    activeSection === 'home'
                      ? 'font-bold text-[#FF8A3D] bg-white/10 border border-sky-400/30'
                      : 'font-medium text-slate-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>Home</span>
                  {activeSection === 'home' && (
                    <span className="w-2 h-2 rounded-full bg-[#FF7A29] shadow-[0_0_6px_#FF7A29]" />
                  )}
                </a>

                <a
                  href="#about"
                  onClick={(e) => handleSectionNav(e, 'about')}
                  className={`px-3 py-2 text-sm rounded-xl transition-all flex items-center justify-between ${
                    activeSection === 'about'
                      ? 'font-bold text-[#FF8A3D] bg-white/10 border border-sky-400/30'
                      : 'font-medium text-slate-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>About</span>
                  {activeSection === 'about' && (
                    <span className="w-2 h-2 rounded-full bg-[#FF7A29] shadow-[0_0_6px_#FF7A29]" />
                  )}
                </a>

                <a
                  href="#destinations"
                  onClick={(e) => handleSectionNav(e, 'destinations')}
                  className={`px-3 py-2 text-sm rounded-xl transition-all flex items-center justify-between ${
                    activeSection === 'destinations'
                      ? 'font-bold text-[#FF8A3D] bg-white/10 border border-sky-400/30'
                      : 'font-medium text-slate-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>Destinations</span>
                  {activeSection === 'destinations' && (
                    <span className="w-2 h-2 rounded-full bg-[#FF7A29] shadow-[0_0_6px_#FF7A29]" />
                  )}
                </a>

                <a
                  href="#services"
                  onClick={(e) => handleSectionNav(e, 'services')}
                  className={`px-3 py-2 text-sm rounded-xl transition-all flex items-center justify-between ${
                    activeSection === 'services'
                      ? 'font-bold text-[#FF8A3D] bg-white/10 border border-sky-400/30'
                      : 'font-medium text-slate-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>Services</span>
                  {activeSection === 'services' && (
                    <span className="w-2 h-2 rounded-full bg-[#FF7A29] shadow-[0_0_6px_#FF7A29]" />
                  )}
                </a>

                <a
                  href="#process"
                  onClick={(e) => handleSectionNav(e, 'process')}
                  className={`px-3 py-2 text-sm rounded-xl transition-all flex items-center justify-between ${
                    activeSection === 'process'
                      ? 'font-bold text-[#FF8A3D] bg-white/10 border border-sky-400/30'
                      : 'font-medium text-slate-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>Process</span>
                  {activeSection === 'process' && (
                    <span className="w-2 h-2 rounded-full bg-[#FF7A29] shadow-[0_0_6px_#FF7A29]" />
                  )}
                </a>

                <a
                  href="#testimonials"
                  onClick={(e) => handleSectionNav(e, 'testimonials')}
                  className={`px-3 py-2 text-sm rounded-xl transition-all flex items-center justify-between ${
                    activeSection === 'testimonials'
                      ? 'font-bold text-[#FF8A3D] bg-white/10 border border-sky-400/30'
                      : 'font-medium text-slate-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>Success Stories</span>
                  {activeSection === 'testimonials' && (
                    <span className="w-2 h-2 rounded-full bg-[#FF7A29] shadow-[0_0_6px_#FF7A29]" />
                  )}
                </a>

                <a
                  href="#blog"
                  onClick={(e) => handleSectionNav(e, 'blog')}
                  className={`px-3 py-2 text-sm rounded-xl transition-all flex items-center justify-between ${
                    activeSection === 'blog'
                      ? 'font-bold text-[#FF8A3D] bg-white/10 border border-sky-400/30'
                      : 'font-medium text-slate-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>Blog</span>
                  {activeSection === 'blog' && (
                    <span className="w-2 h-2 rounded-full bg-[#FF7A29] shadow-[0_0_6px_#FF7A29]" />
                  )}
                </a>

                <a
                  href="#contact"
                  onClick={(e) => handleSectionNav(e, 'contact')}
                  className={`px-3 py-2 text-sm rounded-xl transition-all flex items-center justify-between ${
                    activeSection === 'contact'
                      ? 'font-bold text-[#FF8A3D] bg-white/10 border border-sky-400/30'
                      : 'font-medium text-slate-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>Contact</span>
                  {activeSection === 'contact' && (
                    <span className="w-2 h-2 rounded-full bg-[#FF7A29] shadow-[0_0_6px_#FF7A29]" />
                  )}
                </a>

                {/* Mobile Consultation and Call buttons */}
                <div className="pt-3 mt-1 border-t border-sky-400/20 space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenCounselling();
                    }}
                    className="w-full py-2.5 bg-gradient-to-r from-[#FF6B00] via-[#FF5514] to-[#FF3D57] text-white font-bold text-sm rounded-full shadow-[0_0_15px_rgba(255,107,0,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Book a Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <div className="flex items-center justify-center gap-2 text-xs text-sky-200/80 pt-1">
                    <PhoneCall className="w-3.5 h-3.5 text-[#FF7A29]" />
                    <span>Call Us: +91 81858 83705</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
