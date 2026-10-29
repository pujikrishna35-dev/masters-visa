import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, ArrowRight, ChevronDown, ChevronRight, PhoneCall } from 'lucide-react';
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
  { id: 'usa', name: 'Study in USA', country: 'USA', flag: '🇺🇸', sub: 'STEM OPT & Ivy League', path: '/study-in-usa' },
  { id: 'united-kingdom', name: 'Study in United Kingdom', country: 'United Kingdom', flag: '🇬🇧', sub: '1-Yr Master’s & 2-Yr PSW', path: '/study-in-uk' },
  { id: 'canada', name: 'Study in Canada', country: 'Canada', flag: '🇨🇦', sub: 'Paid Co-op & Up to 3-Yr PGWP', path: '/study-in-canada' },
  { id: 'australia', name: 'Study in Australia', country: 'Australia', flag: '🇦🇺', sub: 'Go8 Unis & Stay-Back Visa', path: '/study-in-australia' },
  { id: 'germany', name: 'Study in Germany', country: 'Germany', flag: '🇩🇪', sub: 'Tuition-Free & 18-Mo Visa', path: '/study-in-germany' },
  { id: 'france', name: 'Study in France', country: 'France', flag: '🇫🇷', sub: 'Top Business & 2-Yr APS Visa', path: '/study-in-france' },
  { id: 'new-zealand', name: 'Study in New Zealand', country: 'New Zealand', flag: '🇳🇿', sub: 'Safe Living & 3-Yr Work Visa', path: '/study-in-new-zealand' },
  { id: 'ireland', name: 'Study in Ireland', country: 'Ireland', flag: '🇮🇪', sub: 'EU Tech Hub & 2-Yr Stay-Back', path: '/study-in-ireland' },
  { id: 'europe', name: 'Study in Europe', country: 'Europe', flag: '🇪🇺', sub: 'Schengen Mobility & Low Tuition', path: '/study-in-europe' },
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
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const destTimerRef = useRef<number | null>(null);

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

  const handleDestinationSelect = () => {
    setDestDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleServiceSelect = (serviceId: string, serviceTitle: string) => {
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
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_20px_-2px_rgba(7,85,245,0.06)] border-b border-[#DCE7FA] py-2.5 sm:py-3'
            : 'bg-white/90 backdrop-blur-sm border-b border-[#DCE7FA]/80 py-3 sm:py-3.5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* 1. Left Logo */}
            <div className="flex-shrink-0">
              <Logo
                size="md"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDestDropdownOpen(false);
                }}
              />
            </div>

            {/* 2. Desktop Navigation Menu matching reference screenshot */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
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
                  className={`text-[14.5px] transition-colors flex items-center gap-1.5 relative py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0755F5] rounded-sm ${
                    activeSection === 'destinations'
                      ? 'font-bold text-[#0755F5]'
                      : 'font-medium text-[#172344] hover:text-[#0755F5]'
                  }`}
                  aria-expanded={destDropdownOpen}
                  aria-haspopup="true"
                >
                  <span>Destinations</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 text-slate-400 group-hover:text-[#0755F5] ${
                      destDropdownOpen ? 'rotate-180 text-[#0755F5]' : ''
                    }`}
                  />
                  {activeSection === 'destinations' && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0755F5] rounded-full" />
                  )}
                </Link>

                {destDropdownOpen && (
                  <div className="absolute top-full left-0 w-80 pt-2 animate-fadeIn z-50">
                    <div className="bg-white rounded-2xl shadow-xl shadow-[#0755F5]/10 border border-[#DCE7FA] p-2 space-y-1">
                      <div className="px-3 pt-2 pb-1.5 border-b border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Study Abroad Destinations
                        </span>
                        <Link
                          to="/destinations"
                          onClick={handleDestinationSelect}
                          className="text-[11px] font-bold text-[#0755F5] hover:underline"
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
                            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#EDF4FF] transition-all group cursor-pointer focus-visible:outline-none focus-visible:bg-[#EDF4FF]"
                          >
                            <span className="text-xl shrink-0 w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 group-hover:border-[#0755F5]/30 transition-transform">
                              {item.flag}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-[#101E49] group-hover:text-[#0755F5] transition-colors leading-tight truncate">
                                {item.name}
                              </p>
                              <p className="text-[10.5px] text-[#63718E] transition-colors truncate">
                                {item.sub}
                              </p>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-[#0755F5] group-hover:translate-x-0.5 transition-all shrink-0" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Courses */}
              <Link
                to="/services?service=test-preparation"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDestDropdownOpen(false);
                }}
                className={`text-[14.5px] transition-colors relative py-1 cursor-pointer ${
                  activeSection === 'services' && location.search.includes('test-preparation')
                    ? 'font-bold text-[#0755F5]'
                    : 'font-medium text-[#172344] hover:text-[#0755F5]'
                }`}
              >
                Courses
              </Link>

              {/* Universities */}
              <a
                href="#universities"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  setDestDropdownOpen(false);
                  const el = document.getElementById('universities');
                  if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-[14.5px] transition-colors relative py-1 cursor-pointer font-medium text-[#172344] hover:text-[#0755F5]"
              >
                Universities
              </a>

              {/* Scholarships */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCounselling('Scholarships & Financial Aid');
                }}
                className="text-[14.5px] transition-colors relative py-1 cursor-pointer font-medium text-[#172344] hover:text-[#0755F5]"
              >
                Scholarships
              </button>

              {/* Visa Guide */}
              <Link
                to="/visa"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDestDropdownOpen(false);
                }}
                className={`text-[14.5px] transition-colors relative py-1 cursor-pointer ${
                  activeSection === 'services' && (location.pathname === '/visa' || location.pathname === '/visa-information')
                    ? 'font-bold text-[#0755F5]'
                    : 'font-medium text-[#172344] hover:text-[#0755F5]'
                }`}
              >
                Visa Guide
              </Link>

              {/* Blog */}
              <Link
                to="/blog"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDestDropdownOpen(false);
                }}
                className={`text-[14.5px] transition-colors relative py-1 cursor-pointer ${
                  activeSection === 'blog'
                    ? 'font-bold text-[#0755F5]'
                    : 'font-medium text-[#172344] hover:text-[#0755F5]'
                }`}
              >
                Blog
                {activeSection === 'blog' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0755F5] rounded-full" />
                )}
              </Link>
            </nav>

            {/* 3. Right Side: Circular Search & Electric Blue "Book a Free Consultation" CTA */}
            <div className="flex items-center gap-3">
              {/* Circular Search Button matching screenshot */}
              <button
                onClick={onOpenSearch}
                aria-label="Search site"
                className="w-10 h-10 rounded-full border border-[#DCE7FA] bg-white text-[#172344] hover:text-[#0755F5] hover:border-[#0755F5]/40 hover:bg-[#EDF4FF]/50 flex items-center justify-center transition-all cursor-pointer shadow-xs"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Bright Electric Blue Gradient Button: Book a Free Consultation → */}
              <button
                onClick={() => onOpenCounselling()}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#0755F5] to-[#0877FF] hover:from-[#0544C7] hover:to-[#0766E6] text-white text-xs sm:text-[13.5px] font-bold rounded-full shadow-md shadow-[#0755F5]/25 hover:shadow-lg hover:shadow-[#0755F5]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all group cursor-pointer"
              >
                <span>Book a Free Consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="lg:hidden p-2 rounded-xl text-[#172344] hover:text-[#0755F5] hover:bg-[#EDF4FF] transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#DCE7FA] bg-white px-4 pt-3 pb-6 shadow-xl animate-fadeIn">
            <div className="flex flex-col space-y-1">
              {/* Destinations with expandable accordion for mobile */}
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
                        ? 'font-bold text-[#0755F5] bg-[#EDF4FF]'
                        : 'text-[#172344] hover:text-[#0755F5]'
                    }`}
                  >
                    Destinations
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileDestOpen(!mobileDestOpen)}
                    aria-label="Toggle Destinations submenu"
                    className="p-2 text-slate-400 hover:text-[#0755F5] transition-colors cursor-pointer"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileDestOpen ? 'rotate-180 text-[#0755F5]' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Mobile Expandable Destinations Submenu */}
                {mobileDestOpen && (
                  <div className="pl-3 pr-1 py-1.5 space-y-1 bg-[#EDF4FF]/70 rounded-xl mt-1 mb-2 border border-[#DCE7FA] animate-fadeIn">
                    <div className="px-3 py-1 flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                      <span>Study Abroad Options</span>
                      <Link
                        to="/destinations"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileDestOpen(false);
                        }}
                        className="text-[#0755F5] hover:underline"
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
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white hover:bg-white text-xs font-semibold text-[#101E49] hover:text-[#0755F5] transition-colors"
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

              {/* Courses */}
              <Link
                to="/services?service=test-preparation"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold rounded-lg text-[#172344] hover:text-[#0755F5] transition-colors"
              >
                Courses
              </Link>

              {/* Universities */}
              <a
                href="#universities"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  const el = document.getElementById('universities');
                  if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-3 py-2 text-sm font-semibold rounded-lg text-[#172344] hover:text-[#0755F5] transition-colors"
              >
                Universities
              </a>

              {/* Scholarships */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCounselling('Scholarships & Financial Aid');
                }}
                className="text-left px-3 py-2 text-sm font-semibold rounded-lg text-[#172344] hover:text-[#0755F5] transition-colors cursor-pointer"
              >
                Scholarships
              </button>

              {/* Visa Guide */}
              <Link
                to="/visa"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  activeSection === 'services' && (location.pathname === '/visa' || location.pathname === '/visa-information')
                    ? 'font-bold text-[#0755F5] bg-[#EDF4FF]'
                    : 'text-[#172344] hover:text-[#0755F5]'
                }`}
              >
                Visa Guide
              </Link>

              {/* Blog */}
              <Link
                to="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  activeSection === 'blog'
                    ? 'font-bold text-[#0755F5] bg-[#EDF4FF]'
                    : 'text-[#172344] hover:text-[#0755F5]'
                }`}
              >
                Blog
              </Link>

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
                      activeSection === 'services' && !location.pathname.startsWith('/visa')
                        ? 'font-bold text-[#0755F5] bg-[#EDF4FF]'
                        : 'text-[#172344] hover:text-[#0755F5]'
                    }`}
                  >
                    Our Services
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    aria-label="Toggle Services submenu"
                    className="p-2 text-slate-400 hover:text-[#0755F5] transition-colors cursor-pointer"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileServicesOpen ? 'rotate-180 text-[#0755F5]' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Mobile Expandable Services Submenu */}
                {mobileServicesOpen && (
                  <div className="pl-3 pr-1 py-1.5 space-y-1 bg-[#EDF4FF]/70 rounded-xl mt-1 mb-2 border border-[#DCE7FA] animate-fadeIn">
                    <div className="px-3 py-1 flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                      <span>Our Services</span>
                      <Link
                        to="/services"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileServicesOpen(false);
                        }}
                        className="text-[#0755F5] hover:underline"
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
                          className="flex items-center justify-between px-3 py-2 rounded-lg bg-white hover:bg-white text-xs font-semibold text-[#101E49] hover:text-[#0755F5] transition-colors"
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
                                className="block px-2.5 py-1.5 rounded-md text-[11px] text-slate-600 hover:text-[#0755F5] hover:bg-white transition-colors"
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
                className="px-3 py-2 text-sm font-semibold rounded-lg text-[#172344] hover:text-[#0755F5] transition-colors"
              >
                FAQ&apos;s
              </a>

              {/* Contact */}
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  activeSection === 'contact'
                    ? 'font-bold text-[#0755F5] bg-[#EDF4FF]'
                    : 'text-[#172344] hover:text-[#0755F5]'
                }`}
              >
                Contact
              </Link>

              <div className="pt-3 border-t border-[#DCE7FA] space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCounselling();
                  }}
                  className="w-full py-3 bg-gradient-to-r from-[#0755F5] to-[#0877FF] text-white font-bold text-sm rounded-full shadow-md shadow-[#0755F5]/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book a Free Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                  <PhoneCall className="w-3.5 h-3.5 text-[#0755F5]" />
                  <a href="tel:+918185883705" className="hover:text-[#0755F5] transition-colors font-medium">
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
