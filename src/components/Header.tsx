import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, ArrowRight, ChevronDown, ChevronRight, PhoneCall, Globe } from 'lucide-react';
import { Logo } from './Logo';

interface Props {
  onOpenCounselling: (serviceOrDest?: string) => void;
  onOpenSearch: () => void;
  onSelectDestination?: (destId: string) => void;
  onSelectService?: (serviceId: string) => void;
}

interface DestinationItem {
  id: string;
  name: string;
  country: string;
  flag: string;
  sub: string;
  path: string;
}

interface ServiceSubItem {
  id: string;
  title: string;
}

interface ServiceItem {
  id: string;
  title: string;
  hasSubmenu?: boolean;
  subItems?: ServiceSubItem[];
}

const DESTINATION_ITEMS: DestinationItem[] = [
  { id: 'usa', name: 'Study in USA', country: 'USA', flag: '🇺🇸', sub: 'STEM OPT & Ivy League', path: '/destinations/usa' },
  { id: 'united-kingdom', name: 'Study in United Kingdom', country: 'United Kingdom', flag: '🇬🇧', sub: '1-Yr Master’s & 2-Yr PSW', path: '/destinations/united-kingdom' },
  { id: 'canada', name: 'Study in Canada', country: 'Canada', flag: '🇨🇦', sub: 'Paid Co-op & Up to 3-Yr PGWP', path: '/destinations/canada' },
  { id: 'australia', name: 'Study in Australia', country: 'Australia', flag: '🇦🇺', sub: 'Go8 Unis & Stay-Back Visa', path: '/destinations/australia' },
  { id: 'europe', name: 'Study in Europe', country: 'Europe', flag: '🇪🇺', sub: 'Schengen Mobility & Low Tuition', path: '/destinations/europe' },
  { id: 'new-zealand', name: 'Study in New Zealand', country: 'New Zealand', flag: '🇳🇿', sub: 'Safe Living & 3-Yr Work Visa', path: '/destinations/new-zealand' },
  { id: 'france', name: 'Study in France', country: 'France', flag: '🇫🇷', sub: 'Top Business & 2-Yr APS Visa', path: '/destinations/france' },
  { id: 'ireland', name: 'Study in Ireland', country: 'Ireland', flag: '🇮🇪', sub: 'EU Tech Hub & 2-Yr Stay-Back', path: '/destinations/ireland' },
];

const SERVICE_ITEMS: ServiceItem[] = [
  { id: 'career-counselling', title: 'Career Counselling' },
  { id: 'test-preparation', title: 'Test Preparation' },
  { id: 'application-process', title: 'Application Process' },
  { id: 'loan-assistance', title: 'Loan Assistance' },
  { id: 'mock-interviews', title: 'Mock Interviews' },
  { id: 'visa-guidance', title: 'Visa Guidance' },
  { id: 'pre-departure-orientation', title: 'Pre-Departure Orientation' },
  { 
    id: 'free-training', 
    title: 'Free Training',
    hasSubmenu: true,
    subItems: [
      { id: 'free-ielts-demo', title: 'Free IELTS & TOEFL Demo' },
      { id: 'free-gre-strategy', title: 'Free GRE & GMAT Strategy' },
      { id: 'free-spoken-english', title: 'Spoken English & Soft Skills' },
      { id: 'free-visa-mock', title: 'Visa Mock Interview Drills' },
    ]
  },
];

const LANGUAGES = [
  { code: 'EN', name: 'English (US)' },
  { code: 'HI', name: 'Hindi (हिंदी)' },
  { code: 'TE', name: 'Telugu (తెలుగు)' },
];

export const Header: React.FC<Props> = ({
  onOpenCounselling,
  onOpenSearch,
  onSelectDestination: _onSelectDestination,
  onSelectService,
}) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [destDropdownOpen, setDestDropdownOpen] = useState(false);
  const [mobileDestOpen, setMobileDestOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [freeTrainingHover, setFreeTrainingHover] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');

  const destTimerRef = useRef<number | null>(null);
  const servicesTimerRef = useRef<number | null>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll listener for header elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute active navigation item from current route pathname
  const currentPath = location.pathname.toLowerCase();
  let activeSection = 'home';
  if (currentPath === '/about' || currentPath === '/about-us') {
    activeSection = 'about';
  } else if (currentPath.startsWith('/destinations') || currentPath.startsWith('/study-in-')) {
    activeSection = 'destinations';
  } else if (currentPath.startsWith('/services') || currentPath.startsWith('/visa')) {
    activeSection = 'services';
  } else if (currentPath === '/process' || currentPath === '/journey') {
    activeSection = 'process';
  } else if (currentPath === '/testimonials' || currentPath === '/success-stories') {
    activeSection = 'testimonials';
  } else if (currentPath === '/blog' || currentPath === '/news') {
    activeSection = 'blog';
  } else if (currentPath === '/contact' || currentPath === '/contact-us') {
    activeSection = 'contact';
  } else if (currentPath === '/') {
    activeSection = 'home';
  }

  const handleDestMouseEnter = () => {
    if (destTimerRef.current) clearTimeout(destTimerRef.current);
    setDestDropdownOpen(true);
  };

  const handleDestMouseLeave = () => {
    destTimerRef.current = window.setTimeout(() => {
      setDestDropdownOpen(false);
    }, 150);
  };

  const handleServicesMouseEnter = () => {
    if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
    setServicesDropdownOpen(true);
  };

  const handleServicesMouseLeave = () => {
    servicesTimerRef.current = window.setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 150);
  };

  const handleDestinationSelect = () => {
    setDestDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleServiceSelect = (serviceId: string, serviceTitle: string) => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);

    if (onSelectService) {
      onSelectService(serviceId);
    } else {
      onOpenCounselling(serviceTitle);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-white transition-all duration-300 ${
          isScrolled
            ? 'shadow-[0_4px_20px_-2px_rgba(16,36,63,0.08)] border-b border-slate-100 py-2 sm:py-2.5'
            : 'border-b border-slate-100/90 py-2.5 sm:py-3'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* 1. Left Logo */}
            <div className="flex-shrink-0">
              <Logo
                size="sm"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDestDropdownOpen(false);
                  setServicesDropdownOpen(false);
                }}
              />
            </div>

            {/* 2. Desktop Navigation Menu */}
            <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7">
              {/* Home */}
              <Link
                to="/"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDestDropdownOpen(false);
                  setServicesDropdownOpen(false);
                }}
                className={`text-[14px] transition-colors relative pb-1 cursor-pointer ${
                  activeSection === 'home'
                    ? 'font-bold text-[#10243F]'
                    : 'font-medium text-[#10243F]/80 hover:text-[#D99A35]'
                }`}
              >
                Home
                {activeSection === 'home' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#D99A35] rounded-full" />
                )}
              </Link>

              {/* About */}
              <Link
                to="/about"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDestDropdownOpen(false);
                  setServicesDropdownOpen(false);
                }}
                className={`text-[14px] transition-colors relative pb-1 cursor-pointer ${
                  activeSection === 'about'
                    ? 'font-bold text-[#10243F]'
                    : 'font-medium text-[#10243F]/80 hover:text-[#D99A35]'
                }`}
              >
                About
                {activeSection === 'about' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#D99A35] rounded-full" />
                )}
              </Link>

              {/* Destinations Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleDestMouseEnter}
                onMouseLeave={handleDestMouseLeave}
              >
                <Link
                  to="/destinations"
                  onClick={() => {
                    setDestDropdownOpen(false);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-[14px] transition-colors flex items-center gap-1.5 relative pb-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D99A35] rounded-sm ${
                    activeSection === 'destinations'
                      ? 'font-bold text-[#10243F]'
                      : 'font-medium text-[#10243F]/80 hover:text-[#D99A35]'
                  }`}
                  aria-expanded={destDropdownOpen}
                  aria-haspopup="true"
                >
                  <span>Destinations</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 text-slate-400 group-hover:text-[#D99A35] ${
                      destDropdownOpen ? 'rotate-180 text-[#D99A35]' : ''
                    }`}
                  />
                  {activeSection === 'destinations' && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#D99A35] rounded-full" />
                  )}
                </Link>

                {destDropdownOpen && (
                  <div className="absolute top-full left-0 w-80 pt-2 animate-fadeIn z-50">
                    <div className="bg-white rounded-2xl shadow-xl shadow-[#10243F]/12 border border-slate-100 p-2 space-y-1">
                      <div className="px-3 pt-2 pb-1.5 border-b border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Study Abroad Destinations
                        </span>
                        <Link
                          to="/destinations"
                          onClick={handleDestinationSelect}
                          className="text-[11px] font-bold text-[#D99A35] hover:underline"
                        >
                          View All ({DESTINATION_ITEMS.length}) →
                        </Link>
                      </div>

                      <div className="py-1 space-y-0.5">
                        {DESTINATION_ITEMS.map((item) => (
                          <Link
                            key={item.id}
                            to={item.path}
                            onClick={handleDestinationSelect}
                            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#FAF7F1] transition-all group cursor-pointer focus-visible:outline-none focus-visible:bg-[#FAF7F1]"
                          >
                            <span className="text-xl shrink-0 w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 group-hover:border-[#D99A35]/30 transition-transform">
                              {item.flag}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-[#10243F] group-hover:text-[#D99A35] transition-colors leading-tight truncate">
                                {item.name}
                              </p>
                              <p className="text-[10.5px] text-slate-400 group-hover:text-slate-500 transition-colors truncate">
                                {item.sub}
                              </p>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-[#D99A35] group-hover:translate-x-0.5 transition-all shrink-0" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Services Dropdown */}
              {/* Our Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
              >
                <Link
                  to="/services"
                  onClick={() => {
                    setServicesDropdownOpen(false);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-[14px] transition-colors flex items-center gap-1.5 relative pb-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D99A35] rounded-sm ${
                    activeSection === 'services'
                      ? 'font-bold text-[#10243F]'
                      : 'font-medium text-[#10243F]/80 hover:text-[#D99A35]'
                  }`}
                  aria-expanded={servicesDropdownOpen}
                  aria-haspopup="true"
                >
                  <span>Our Services</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 text-slate-400 group-hover:text-[#D99A35] ${
                      servicesDropdownOpen ? 'rotate-180 text-[#D99A35]' : ''
                    }`}
                  />
                  {activeSection === 'services' && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#D99A35] rounded-full" />
                  )}
                </Link>

                {servicesDropdownOpen && (
                  <div className="absolute top-full left-0 w-64 pt-2 animate-fadeIn z-50">
                    <div className="bg-white rounded-xl shadow-xl shadow-[#10243F]/15 border border-slate-200/90 divide-y divide-slate-100 overflow-visible">
                      {SERVICE_ITEMS.map((item) => (
                        <div
                          key={item.id}
                          className="relative"
                          onMouseEnter={() => {
                            if (item.hasSubmenu) setFreeTrainingHover(true);
                          }}
                          onMouseLeave={() => {
                            if (item.hasSubmenu) setFreeTrainingHover(false);
                          }}
                        >
                          <Link
                            to={`/services?service=${item.id}`}
                            onClick={() => handleServiceSelect(item.id, item.title)}
                            className="flex items-center justify-between px-4 py-2.5 text-[14px] font-medium text-[#10243F] hover:text-[#D99A35] hover:bg-[#FAF7F1] transition-colors group cursor-pointer"
                          >
                            <span>{item.title}</span>
                            {item.hasSubmenu ? (
                              <ChevronRight className="w-4 h-4 text-slate-800 font-bold stroke-[2.5] group-hover:text-[#D99A35] group-hover:translate-x-0.5 transition-all" />
                            ) : null}
                          </Link>

                          {/* Flyout Submenu for Free Training */}
                          {item.hasSubmenu && freeTrainingHover && (
                            <div className="absolute top-0 left-full pl-1.5 w-60 z-50 animate-fadeIn">
                              <div className="bg-white rounded-xl shadow-xl shadow-[#10243F]/15 border border-slate-200/90 divide-y divide-slate-100 overflow-hidden">
                                {item.subItems?.map((sub) => (
                                  <Link
                                    key={sub.id}
                                    to={`/services?service=${sub.id}`}
                                    onClick={() => handleServiceSelect(sub.id, sub.title)}
                                    className="block px-4 py-2 text-[13px] font-medium text-[#10243F] hover:text-[#D99A35] hover:bg-[#FAF7F1] transition-colors cursor-pointer"
                                  >
                                    {sub.title}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* FAQ's Link matching screenshot */}
              <a
                href="#faqs"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  setDestDropdownOpen(false);
                  setServicesDropdownOpen(false);
                  const el = document.getElementById('faqs');
                  if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-[14px] transition-colors relative pb-1 cursor-pointer font-medium text-[#10243F]/80 hover:text-[#D99A35]"
              >
                FAQ&apos;s
              </a>

              {/* Process */}
              <Link
                to="/process"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDestDropdownOpen(false);
                  setServicesDropdownOpen(false);
                }}
                className={`text-[14px] transition-colors relative pb-1 cursor-pointer ${
                  activeSection === 'process'
                    ? 'font-bold text-[#10243F]'
                    : 'font-medium text-[#10243F]/80 hover:text-[#D99A35]'
                }`}
              >
                Process
                {activeSection === 'process' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#D99A35] rounded-full" />
                )}
              </Link>

              {/* Success Stories */}
              <Link
                to="/testimonials"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDestDropdownOpen(false);
                  setServicesDropdownOpen(false);
                }}
                className={`text-[14px] transition-colors relative pb-1 cursor-pointer ${
                  activeSection === 'testimonials'
                    ? 'font-bold text-[#10243F]'
                    : 'font-medium text-[#10243F]/80 hover:text-[#D99A35]'
                }`}
              >
                Success Stories
                {activeSection === 'testimonials' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#D99A35] rounded-full" />
                )}
              </Link>

              {/* Blog */}
              <Link
                to="/blog"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDestDropdownOpen(false);
                  setServicesDropdownOpen(false);
                }}
                className={`text-[14px] transition-colors relative pb-1 cursor-pointer ${
                  activeSection === 'blog'
                    ? 'font-bold text-[#10243F]'
                    : 'font-medium text-[#10243F]/80 hover:text-[#D99A35]'
                }`}
              >
                Blog
                {activeSection === 'blog' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#D99A35] rounded-full" />
                )}
              </Link>

              {/* Contact */}
              <Link
                to="/contact"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDestDropdownOpen(false);
                  setServicesDropdownOpen(false);
                }}
                className={`text-[14px] transition-colors relative pb-1 cursor-pointer ${
                  activeSection === 'contact'
                    ? 'font-bold text-[#10243F]'
                    : 'font-medium text-[#10243F]/80 hover:text-[#D99A35]'
                }`}
              >
                Contact
                {activeSection === 'contact' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#D99A35] rounded-full" />
                )}
              </Link>
            </nav>

            {/* 3. Right Side: Search, Language Selector & Consultation CTA */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Circular Search Button */}
              <button
                onClick={onOpenSearch}
                aria-label="Search site"
                className="w-9 h-9 rounded-full border border-slate-200 text-slate-600 hover:text-[#D99A35] hover:border-[#D99A35]/50 hover:bg-slate-50 flex items-center justify-center transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Language Selector Pill */}
              <div className="relative" ref={langDropdownRef}>
                <button
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  aria-label="Select language"
                  className="h-9 px-3 rounded-full border border-slate-200 hover:border-slate-300 bg-white text-slate-700 hover:text-[#10243F] flex items-center gap-1.5 transition-colors text-xs sm:text-[13px] font-semibold cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  <span>{selectedLang}</span>
                  <ChevronDown
                    className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
                      langDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {langDropdownOpen && (
                  <div className="absolute top-full right-0 mt-1.5 w-40 bg-white rounded-xl shadow-card border border-slate-100 p-1.5 animate-fadeIn z-50">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSelectedLang(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                          selectedLang === lang.code
                            ? 'bg-[#FAF7F1] text-[#D99A35] font-bold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{lang.name}</span>
                        <span className="text-[10px] uppercase text-slate-400 font-mono">
                          {lang.code}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Book a Consultation Button */}
              <button
                onClick={() => onOpenCounselling()}
                className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-[#D99A35] via-[#E28330] to-[#F16B55] hover:opacity-95 active:scale-[0.98] text-white text-xs sm:text-[13.5px] font-bold rounded-full shadow-md shadow-[#D99A35]/25 hover:shadow-lg hover:shadow-[#D99A35]/35 hover:-translate-y-0.5 transition-all group cursor-pointer"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="lg:hidden p-1.5 text-slate-700 hover:text-[#D99A35] transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 shadow-xl animate-fadeIn">
            <div className="flex flex-col space-y-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  activeSection === 'home'
                    ? 'font-bold text-[#10243F] bg-[#FAF7F1]'
                    : 'text-slate-700 hover:text-[#D99A35]'
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  activeSection === 'about'
                    ? 'font-bold text-[#10243F] bg-[#FAF7F1]'
                    : 'text-slate-700 hover:text-[#D99A35]'
                }`}
              >
                About
              </Link>
              <div>
                <div className="flex items-center justify-between rounded-lg">
                  <Link
                    to="/destinations"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMobileDestOpen(false);
                    }}
                    className={`flex-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                      activeSection === 'destinations'
                        ? 'font-bold text-[#10243F] bg-[#FAF7F1]'
                        : 'text-slate-700 hover:text-[#D99A35]'
                    }`}
                  >
                    Destinations
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileDestOpen(!mobileDestOpen)}
                    aria-label="Toggle Destinations submenu"
                    className="p-2 text-slate-400 hover:text-[#D99A35] transition-colors cursor-pointer"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileDestOpen ? 'rotate-180 text-[#D99A35]' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Mobile Expandable Destinations Submenu */}
                {mobileDestOpen && (
                  <div className="pl-3 pr-1 py-1.5 space-y-1 bg-[#FAF7F1]/80 rounded-xl mt-1 mb-2 border border-slate-200/60 animate-fadeIn">
                    <div className="px-3 py-1 flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                      <span>Study Abroad Options</span>
                      <Link
                        to="/destinations"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileDestOpen(false);
                        }}
                        className="text-[#D99A35] hover:underline"
                      >
                        All Countries
                      </Link>
                    </div>
                    {DESTINATION_ITEMS.map((item) => (
                      <Link
                        key={item.id}
                        to={item.path}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileDestOpen(false);
                        }}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/70 hover:bg-white text-xs font-semibold text-[#10243F] hover:text-[#D99A35] transition-colors"
                      >
                        <span className="text-base shrink-0">{item.flag}</span>
                        <div className="flex-1 min-w-0">
                          <span className="block font-bold truncate">{item.name}</span>
                          <span className="block text-[10px] text-slate-400 font-normal truncate">{item.sub}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {/* Our Services with expandable accordion for mobile */}
              <div>
                <div className="flex items-center justify-between">
                  <Link
                    to="/services"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMobileServicesOpen(false);
                    }}
                    className={`flex-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                      activeSection === 'services'
                        ? 'font-bold text-[#10243F] bg-[#FAF7F1]'
                        : 'text-slate-700 hover:text-[#D99A35]'
                    }`}
                  >
                    Our Services
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    aria-label="Toggle Services submenu"
                    className="p-2 text-slate-400 hover:text-[#D99A35] transition-colors cursor-pointer"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileServicesOpen ? 'rotate-180 text-[#D99A35]' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Mobile Expandable Services Submenu */}
                {mobileServicesOpen && (
                  <div className="pl-3 pr-1 py-1.5 space-y-1 bg-[#FAF7F1]/80 rounded-xl mt-1 mb-2 border border-slate-200/60 animate-fadeIn">
                    <div className="px-3 py-1 flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                      <span>Our Services</span>
                      <Link
                        to="/services"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileServicesOpen(false);
                        }}
                        className="text-[#D99A35] hover:underline"
                      >
                        All Services
                      </Link>
                    </div>
                    {SERVICE_ITEMS.map((item) => (
                      <div key={item.id} className="space-y-1">
                        <Link
                          to={`/services?service=${item.id}`}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileServicesOpen(false);
                            handleServiceSelect(item.id, item.title);
                          }}
                          className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/70 hover:bg-white text-xs font-semibold text-[#10243F] hover:text-[#D99A35] transition-colors"
                        >
                          <span>{item.title}</span>
                          {item.hasSubmenu ? (
                            <ChevronRight className="w-3.5 h-3.5 text-slate-700 font-bold stroke-[2.5]" />
                          ) : (
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </Link>
                        {item.hasSubmenu && item.subItems && (
                          <div className="pl-4 pr-1 py-1 space-y-1">
                            {item.subItems.map((sub) => (
                              <Link
                                key={sub.id}
                                to={`/services?service=${sub.id}`}
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setMobileServicesOpen(false);
                                  handleServiceSelect(sub.id, sub.title);
                                }}
                                className="block px-2.5 py-1.5 rounded-md text-[11px] text-slate-600 hover:text-[#D99A35] hover:bg-white/90 transition-colors"
                              >
                                • {sub.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* FAQ's Link in Mobile Menu */}
              <a
                href="#faqs"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  const el = document.getElementById('faqs');
                  if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-3 py-2 text-sm font-semibold rounded-lg text-slate-700 hover:text-[#D99A35] transition-colors"
              >
                FAQ&apos;s
              </a>
              <Link
                to="/process"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  activeSection === 'process'
                    ? 'font-bold text-[#10243F] bg-[#FAF7F1]'
                    : 'text-slate-700 hover:text-[#D99A35]'
                }`}
              >
                Process
              </Link>
              <Link
                to="/testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  activeSection === 'testimonials'
                    ? 'font-bold text-[#10243F] bg-[#FAF7F1]'
                    : 'text-slate-700 hover:text-[#D99A35]'
                }`}
              >
                Success Stories
              </Link>
              <Link
                to="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  activeSection === 'blog'
                    ? 'font-bold text-[#10243F] bg-[#FAF7F1]'
                    : 'text-slate-700 hover:text-[#D99A35]'
                }`}
              >
                Blog
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  activeSection === 'contact'
                    ? 'font-bold text-[#10243F] bg-[#FAF7F1]'
                    : 'text-slate-700 hover:text-[#D99A35]'
                }`}
              >
                Contact
              </Link>

              <div className="pt-3 border-t border-slate-100 space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCounselling();
                  }}
                  className="w-full py-3 bg-gradient-to-r from-[#D99A35] via-[#E28330] to-[#F16B55] text-white font-bold text-sm rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                  <PhoneCall className="w-3.5 h-3.5 text-[#D99A35]" />
                  <a href="tel:+918185883705" className="hover:text-[#D99A35] transition-colors">
                    Call Us: +91 81858 83705
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
