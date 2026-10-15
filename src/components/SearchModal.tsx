import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, 
  X, 
  ArrowRight, 
  Globe, 
  Newspaper, 
  FileText, 
  Compass, 
  Sparkles,
  SearchX,
  GraduationCap
} from 'lucide-react';
import { DESTINATIONS, CORE_SERVICES, UNIVERSITIES, NEWS_ITEMS } from '../data/content';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectDestination: (destId: string) => void;
  onSelectService?: (serviceId: string) => void;
}

type SearchCategory = 'Destination' | 'Service' | 'University' | 'Page' | 'Blog';

interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: SearchCategory;
  targetSection: string;
  destId?: string;
  serviceId?: string;
  iconType: 'destination' | 'service' | 'university' | 'page' | 'blog';
  keywords?: string[];
}

const SITE_PAGES: SearchResultItem[] = [
  {
    id: 'page-home',
    title: 'Home',
    subtitle: 'Welcome to MasterVisa global education consultancy',
    category: 'Page',
    targetSection: 'home',
    iconType: 'page',
    keywords: ['homepage', 'start', 'main', 'intro', 'welcome']
  },
  {
    id: 'page-about',
    title: 'About MasterVisa',
    subtitle: 'Why Choose Us, our counsellors & global experience',
    category: 'Page',
    targetSection: 'about',
    iconType: 'page',
    keywords: ['about us', 'why choose us', 'why-us', 'experience', 'who we are']
  },
  {
    id: 'page-destinations',
    title: 'Study Destinations',
    subtitle: 'Explore USA, UK, Canada, Australia, Germany & Europe',
    category: 'Page',
    targetSection: 'destinations',
    iconType: 'page',
    keywords: ['countries', 'study abroad', 'destinations', 'options']
  },
  {
    id: 'page-services',
    title: 'Our Services',
    subtitle: 'Admissions, visas, documentation & pre-departure support',
    category: 'Page',
    targetSection: 'services',
    iconType: 'page',
    keywords: ['services', 'support', 'assistance', 'features']
  },
  {
    id: 'page-process',
    title: '4-Step Journey Process',
    subtitle: 'Step-by-step roadmap from profile review to flying abroad',
    category: 'Page',
    targetSection: 'process',
    iconType: 'page',
    keywords: ['process', 'journey', 'steps', 'timeline', 'how it works', 'roadmap']
  },
  {
    id: 'page-testimonials',
    title: 'Student Success Stories',
    subtitle: 'Real student reviews, success rates, and visa approvals',
    category: 'Page',
    targetSection: 'testimonials',
    iconType: 'page',
    keywords: ['testimonials', 'reviews', 'success stories', 'ratings', 'alumni']
  },
  {
    id: 'page-universities',
    title: 'Partner Universities',
    subtitle: 'Top ranked global universities and institutions',
    category: 'Page',
    targetSection: 'universities',
    iconType: 'page',
    keywords: ['universities', 'colleges', 'institutions', 'rankings', 'qs rank']
  },
  {
    id: 'page-blog',
    title: 'News & Insights (Blog)',
    subtitle: 'Latest visa policy updates, deadlines & scholarship articles',
    category: 'Blog',
    targetSection: 'blog',
    iconType: 'blog',
    keywords: ['news', 'blog', 'insights', 'articles', 'updates']
  },
  {
    id: 'page-faq',
    title: 'FAQs & Enquiries',
    subtitle: 'Frequently asked questions & book consultation form',
    category: 'Page',
    targetSection: 'faq',
    iconType: 'page',
    keywords: ['faq', 'questions', 'enquiry', 'help', 'answers']
  },
  {
    id: 'page-contact',
    title: 'Contact Us & Branches',
    subtitle: 'Offices in Nellore HQ, Hyderabad, Vijayawada, Bangalore, Chennai, Tirupati',
    category: 'Page',
    targetSection: 'contact',
    iconType: 'page',
    keywords: ['contact', 'branches', 'offices', 'phone', 'address', 'locations', 'email']
  }
];

const DESTINATION_RESULTS: SearchResultItem[] = DESTINATIONS.map(d => ({
  id: `dest-${d.id}`,
  title: `Study in ${d.name}`,
  subtitle: `${d.shortDesc} • ${d.visaSuccessRate} visa success`,
  category: 'Destination',
  targetSection: 'destinations',
  destId: d.id,
  iconType: 'destination',
  keywords: [d.name, 'visa', d.avgTuition, d.workPermit, ...d.topCourses, ...d.popularUniversities]
}));

const SERVICE_RESULTS: SearchResultItem[] = CORE_SERVICES.map(s => ({
  id: `svc-${s.id}`,
  title: s.title,
  subtitle: s.description,
  category: 'Service',
  targetSection: 'services',
  serviceId: s.id,
  iconType: 'service',
  keywords: [s.title, s.description, ...(s.features || []), ...(s.includes || [])]
}));

const UNIVERSITY_RESULTS: SearchResultItem[] = UNIVERSITIES.map(u => ({
  id: `uni-${u.id}`,
  title: u.name,
  subtitle: `${u.country}${u.qsRank ? ` • ${u.qsRank}` : ''}`,
  category: 'University',
  targetSection: 'universities',
  iconType: 'university',
  keywords: [u.name, u.country, u.qsRank || '', 'university', 'college'].filter(Boolean)
}));

const BLOG_RESULTS: SearchResultItem[] = NEWS_ITEMS.map(n => ({
  id: `blog-${n.id}`,
  title: n.title,
  subtitle: n.summary,
  category: 'Blog',
  targetSection: 'blog',
  iconType: 'blog',
  keywords: [n.title, n.summary, n.category, 'article', 'blog', 'news']
}));

const ALL_SEARCH_ITEMS: SearchResultItem[] = [
  ...DESTINATION_RESULTS,
  ...SERVICE_RESULTS,
  ...SITE_PAGES,
  ...UNIVERSITY_RESULTS,
  ...BLOG_RESULTS
];

const POPULAR_SEARCHES = [
  { label: 'Study in USA', query: 'USA' },
  { label: 'Student Visa', query: 'Student Visa' },
  { label: 'Universities', query: 'Universities' },
  { label: 'Documentation & SOP', query: 'SOP' },
  { label: 'Study in UK', query: 'UK' },
  { label: 'Contact Branches', query: 'Contact' }
];

export const SearchModal: React.FC<Props> = ({ 
  isOpen, 
  onClose, 
  onSelectDestination, 
  onSelectService 
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input and reset state on open/close
  useEffect(() => {
    if (isOpen) {
      const timer = window.setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => window.clearTimeout(timer);
    } else {
      setQuery('');
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  // Filter items matching query
  const trimmedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!trimmedQuery) return [];

    return ALL_SEARCH_ITEMS.filter(item => {
      const matchTitle = item.title.toLowerCase().includes(trimmedQuery);
      const matchSubtitle = item.subtitle.toLowerCase().includes(trimmedQuery);
      const matchCategory = item.category.toLowerCase().includes(trimmedQuery);
      const matchKeywords = item.keywords?.some(k => k.toLowerCase().includes(trimmedQuery));
      return matchTitle || matchSubtitle || matchCategory || matchKeywords;
    });
  }, [trimmedQuery]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(-1);
  }, [trimmedQuery]);

  // Scroll active item into view
  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const activeEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  const handleSelectResult = (item: SearchResultItem) => {
    onClose();

    // If destination item, open its destination modal
    if (item.destId) {
      onSelectDestination(item.destId);
    }

    // If service item, open its service detail modal
    if (item.serviceId && onSelectService) {
      onSelectService(item.serviceId);
    }

    // Update URL hash cleanly
    const hashTarget = item.destId ? 'destinations' : (item.serviceId ? 'services' : item.targetSection);
    if (window.location.hash !== `#${hashTarget}`) {
      window.history.pushState(null, '', `#${hashTarget}`);
    }

    // Smooth scroll to target section with sticky header offset
    const targetElement = 
      hashTarget === 'process' ? (document.getElementById('process') || document.getElementById('journey')) :
      hashTarget === 'blog' ? (document.getElementById('blog') || document.getElementById('news')) :
      hashTarget === 'about' ? (document.getElementById('about') || document.getElementById('why-us')) :
      hashTarget === 'contact' ? (document.getElementById('contact') || document.getElementById('branches')) :
      document.getElementById(hashTarget);

    if (targetElement) {
      const headerOffset = 76;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }

    if (results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < results.length) {
        handleSelectResult(results[selectedIndex]);
      } else if (results.length > 0) {
        handleSelectResult(results[0]);
      }
    }
  };

  const renderCategoryBadge = (category: SearchCategory) => {
    switch (category) {
      case 'Destination':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#1769AA] border border-blue-100 flex-shrink-0">
            Destination
          </span>
        );
      case 'Service':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FDF7EC] text-[#D99A35] border border-[#D99A35]/30 flex-shrink-0">
            Service
          </span>
        );
      case 'University':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100 flex-shrink-0">
            University
          </span>
        );
      case 'Blog':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-100 flex-shrink-0">
            Blog
          </span>
        );
      case 'Page':
      default:
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 flex-shrink-0">
            Page
          </span>
        );
    }
  };

  const renderItemIcon = (iconType: SearchResultItem['iconType']) => {
    switch (iconType) {
      case 'destination':
        return <Globe className="w-4 h-4 text-[#1769AA]" />;
      case 'service':
        return <FileText className="w-4 h-4 text-[#D99A35]" />;
      case 'university':
        return <GraduationCap className="w-4 h-4 text-purple-600" />;
      case 'blog':
        return <Newspaper className="w-4 h-4 text-rose-600" />;
      case 'page':
      default:
        return <Compass className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-24 px-3 sm:px-4 bg-[#10243F]/40 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search MasterVisa"
    >
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-floating border border-slate-200/90 overflow-hidden animate-search-in flex flex-col max-h-[82vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="border-b border-slate-100 px-4 sm:px-6 py-3.5 sm:py-4 flex items-center gap-2.5 sm:gap-3 bg-white">
          {/* Rounded Search Input Container */}
          <div className="relative flex-1 flex items-center bg-white rounded-xl border border-[#E2E8F0] shadow-2xs transition-all duration-200 hover:border-slate-300 focus-within:border-[#D99A35] focus-within:ring-2 focus-within:ring-[#D99A35]/20">
            <Search className="w-4.5 h-4.5 text-[#94A3B8] ml-3.5 shrink-0 transition-colors pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search destinations, visas, universities..."
              className="w-full py-2.5 sm:py-3 pl-3 pr-9 text-sm sm:text-base text-[#10243F] placeholder-[#94A3B8] bg-transparent outline-none border-none font-medium focus:outline-none focus:ring-0"
              aria-label="Search destinations, visas, universities"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                aria-label="Clear search input"
                className="absolute right-2.5 p-1 rounded-full text-slate-400 hover:text-[#10243F] hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Close Modal Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search overlay"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-slate-500 hover:text-[#10243F] hover:bg-slate-100 border border-slate-200/80 hover:border-slate-300 transition-all cursor-pointer flex-shrink-0 active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div ref={listRef} className="overflow-y-auto px-3 sm:px-5 py-3 flex-1">
          {/* Popular searches when query is empty */}
          {!trimmedQuery && (
            <div className="py-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                <Sparkles className="w-3.5 h-3.5 text-[#D99A35]" />
                <span>Popular Searches</span>
              </div>
              <div className="flex flex-wrap gap-2 px-3 pt-1 pb-3">
                {POPULAR_SEARCHES.map(item => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setQuery(item.query);
                      inputRef.current?.focus();
                    }}
                    className="px-3 py-1.5 bg-[#FAF7F1] hover:bg-[#FDF7EC] hover:text-[#D99A35] hover:border-[#D99A35]/40 text-xs font-semibold text-[#10243F] rounded-full border border-slate-200/80 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-2xs"
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Quick Navigation Links */}
              <div className="mt-3 pt-3 border-t border-slate-100">
                <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                  Quick Navigation
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 px-1">
                  {SITE_PAGES.slice(1, 7).map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelectResult(p)}
                      className="text-left px-3 py-2 rounded-xl hover:bg-[#FAF7F1] transition-colors flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FDF7EC] transition-colors">
                          {renderItemIcon(p.iconType)}
                        </div>
                        <div className="truncate">
                          <p className="text-xs font-bold text-[#10243F] group-hover:text-[#D99A35] transition-colors truncate">
                            {p.title}
                          </p>
                          <p className="text-[10px] text-[#64748B] truncate">
                            {p.subtitle}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#D99A35] group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Search results list */}
          {trimmedQuery && results.length > 0 && (
            <div className="py-2 space-y-1">
              <div className="px-3 py-1 flex items-center justify-between text-[11px] font-semibold text-[#64748B]">
                <span>Found {results.length} result{results.length > 1 ? 's' : ''}</span>
                <span>Click to view</span>
              </div>
              {results.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={item.id}
                    data-index={idx}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSelectResult(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`px-3 py-2.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected 
                        ? 'bg-[#FAF7F1] border-[#D99A35]/50 shadow-2xs' 
                        : 'bg-white hover:bg-[#FAF7F1]/70 border-transparent hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-8 h-8 rounded-lg bg-slate-100/90 flex items-center justify-center flex-shrink-0">
                        {renderItemIcon(item.iconType)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-[#10243F] truncate">
                            {item.title}
                          </h4>
                          {renderCategoryBadge(item.category)}
                        </div>
                        <p className="text-[11px] text-[#64748B] truncate mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 text-slate-300 transition-all flex-shrink-0 ${
                      isSelected ? 'text-[#D99A35] translate-x-0.5' : ''
                    }`} />
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty state when no matches found */}
          {trimmedQuery && results.length === 0 && (
            <div className="py-12 px-6 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
                <SearchX className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-[#10243F]">
                No results found for "{query}"
              </p>
              <p className="text-xs text-[#64748B] mt-1 max-w-sm mx-auto">
                Try searching for destinations like <span className="font-semibold text-[#10243F]">USA</span> or <span className="font-semibold text-[#10243F]">UK</span>, services like <span className="font-semibold text-[#10243F]">Visa</span> or <span className="font-semibold text-[#10243F]">SOP</span>, or partner universities.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-1.5">
                {POPULAR_SEARCHES.map(item => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setQuery(item.query);
                      inputRef.current?.focus();
                    }}
                    className="px-2.5 py-1 bg-white hover:bg-[#FDF7EC] hover:text-[#D99A35] hover:border-[#D99A35]/30 text-[11px] font-semibold text-[#10243F] rounded-full border border-slate-200 transition-colors shadow-2xs cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Keyboard hints footer */}
        <div className="border-t border-slate-100 px-5 py-2.5 bg-slate-50/70 flex items-center justify-between text-[11px] text-[#64748B]">
          <div className="flex items-center gap-3 hidden sm:flex">
            <span>
              <kbd className="font-mono bg-white border border-slate-200 px-1 py-0.5 rounded text-[10px] shadow-2xs">↑</kbd>{' '}
              <kbd className="font-mono bg-white border border-slate-200 px-1 py-0.5 rounded text-[10px] shadow-2xs">↓</kbd>{' '}
              Navigate
            </span>
            <span>
              <kbd className="font-mono bg-white border border-slate-200 px-1 py-0.5 rounded text-[10px] shadow-2xs">↵</kbd>{' '}
              Select
            </span>
            <span>
              <kbd className="font-mono bg-white border border-slate-200 px-1 py-0.5 rounded text-[10px] shadow-2xs">Esc</kbd>{' '}
              Close
            </span>
          </div>
          <div className="sm:hidden text-[10px]">
            Tap any result to navigate
          </div>
          <span className="text-[10px] text-slate-400">MasterVisa Global Search</span>
        </div>
      </div>
    </div>
  );
};
