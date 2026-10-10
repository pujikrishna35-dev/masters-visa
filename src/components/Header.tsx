import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowRight, ChevronDown, PhoneCall } from 'lucide-react';
import { Logo } from './Logo';

interface Props {
  onOpenCounselling: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<Props> = ({ onOpenCounselling, onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [studyDropdownOpen, setStudyDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-white transition-all duration-300 ${
          isScrolled
            ? 'shadow-md border-b border-slate-100 py-1.5 sm:py-2'
            : 'border-b border-slate-100/80 py-2 sm:py-2.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo size="sm" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1.5">
              <a
                href="#home"
                className="px-2.5 py-1 text-[13px] font-semibold text-brand-coral transition-colors relative"
              >
                Home
                <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-brand-coral rounded-full" />
              </a>

              {/* Study Abroad Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setStudyDropdownOpen(true)}
                onMouseLeave={() => setStudyDropdownOpen(false)}
              >
                <a
                  href="#destinations"
                  className="px-2.5 py-1 text-[13px] font-medium text-slate-700 hover:text-brand-coral transition-colors flex items-center gap-1 group"
                >
                  <span>Study Abroad</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 text-slate-400 group-hover:text-brand-coral ${
                    studyDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </a>

                {studyDropdownOpen && (
                  <div className="absolute top-full left-0 w-64 pt-2 animate-fadeIn">
                    <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-2 space-y-1">
                      {[
                        { name: 'USA', flag: '🇺🇸', sub: 'STEM OPT & Ivy League' },
                        { name: 'UK', flag: '🇬🇧', sub: '2-Year PSW & Top Unis' },
                        { name: 'Canada', flag: '🇨🇦', sub: 'PGWP & High Quality' },
                        { name: 'Australia', flag: '🇦🇺', sub: 'PR Pathways & Work' },
                        { name: 'Germany', flag: '🇩🇪', sub: 'Zero Tuition & Tech' },
                        { name: 'France', flag: '🇫🇷', sub: 'Business & Innovation' }
                      ].map((item) => (
                        <a
                          key={item.name}
                          href="#destinations"
                          onClick={() => setStudyDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-brand-bg-subtle transition-colors group"
                        >
                          <span className="text-xl">{item.flag}</span>
                          <div>
                            <p className="text-xs font-bold text-brand-navy group-hover:text-brand-coral transition-colors">{item.name}</p>
                            <p className="text-[10px] text-slate-400">{item.sub}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Our Services Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <a
                  href="#services"
                  className="px-2.5 py-1 text-[13px] font-medium text-slate-700 hover:text-brand-coral transition-colors flex items-center gap-1 group"
                >
                  <span>Our Services</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 text-slate-400 group-hover:text-brand-coral ${
                    servicesDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </a>

                {servicesDropdownOpen && (
                  <div className="absolute top-full left-0 w-72 pt-2 animate-fadeIn">
                    <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-2 space-y-1">
                      {[
                        { title: 'Career Counselling', desc: 'Profile & Course Match' },
                        { title: 'Test Preparation', desc: 'IELTS, TOEFL, GRE, GMAT' },
                        { title: 'Application Process', desc: 'SOP, LOR & Documentation' },
                        { title: 'Loan Assistance', desc: 'Collateral & Non-collateral' },
                        { title: 'Visa Guidance', desc: 'Mock Interviews & Filing' }
                      ].map((item) => (
                        <a
                          key={item.title}
                          href="#services"
                          onClick={() => setServicesDropdownOpen(false)}
                          className="block px-3 py-2 rounded-xl hover:bg-brand-bg-subtle transition-colors group"
                        >
                          <p className="text-xs font-bold text-brand-navy group-hover:text-brand-coral transition-colors">{item.title}</p>
                          <p className="text-[10px] text-slate-400">{item.desc}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <a
                href="#why-us"
                className="px-2.5 py-1 text-[13px] font-medium text-slate-700 hover:text-brand-coral transition-colors"
              >
                About Us
              </a>

              <a
                href="#news"
                className="px-2.5 py-1 text-[13px] font-medium text-slate-700 hover:text-brand-coral transition-colors"
              >
                News
              </a>

              <a
                href="#faq"
                className="px-2.5 py-1 text-[13px] font-medium text-slate-700 hover:text-brand-coral transition-colors"
              >
                FAQs
              </a>

              <a
                href="#branches"
                className="px-2.5 py-1 text-[13px] font-medium text-slate-700 hover:text-brand-coral transition-colors"
              >
                Contact Us
              </a>
            </nav>

            {/* Right Side Buttons */}
            <div className="flex items-center gap-2.5">
              {/* Search Button */}
              <button
                onClick={onOpenSearch}
                aria-label="Search site"
                className="w-8 h-8 rounded-full border border-slate-200 text-slate-600 hover:text-brand-coral hover:border-brand-coral/40 hover:bg-slate-50 flex items-center justify-center transition-all"
              >
                <Search className="w-3.5 h-3.5" />
              </button>

              {/* Large Rounded CTA Button */}
              <button
                onClick={onOpenCounselling}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-brand-coral hover:bg-brand-coral-hover text-white text-xs sm:text-[13px] font-bold rounded-full shadow-md shadow-brand-coral/20 hover:shadow-brand-coral/30 hover:-translate-y-0.5 active:translate-y-0 transition-all group"
              >
                <span>Book Free Counselling</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="lg:hidden p-1.5 text-slate-700 hover:text-brand-coral transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 shadow-xl animate-fadeIn">
            <div className="flex flex-col space-y-2">
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-bold text-brand-coral rounded-lg bg-brand-coral-light/50"
              >
                Home
              </a>
              <a
                href="#destinations"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-brand-coral rounded-lg"
              >
                Study Abroad
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-brand-coral rounded-lg"
              >
                Our Services
              </a>
              <a
                href="#why-us"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-brand-coral rounded-lg"
              >
                About Us
              </a>
              <a
                href="#news"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-brand-coral rounded-lg"
              >
                News
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-brand-coral rounded-lg"
              >
                FAQs
              </a>
              <a
                href="#branches"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-brand-coral rounded-lg"
              >
                Contact Us
              </a>

              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCounselling();
                  }}
                  className="w-full py-3 bg-brand-coral text-white font-bold text-sm rounded-full shadow-md flex items-center justify-center gap-2"
                >
                  <span>Book Free Counselling</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500">
                  <PhoneCall className="w-3.5 h-3.5 text-brand-coral" />
                  <span>Call Us: +91 81858 83705</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
