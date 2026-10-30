import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Layers,
  BookOpen,
  ChevronDown,
  ArrowRight,
  Briefcase,
  Laptop,
  Settings,
  BarChart3,
  Heart,
  Stethoscope,
  Palette,
  Scale,
  GraduationCap,
  FlaskConical,
  Truck,
  Users,
  Compass,
  FileText,
  X,
  CheckCircle2,
} from 'lucide-react';
import {
  COURSE_CATEGORIES,
  STUDY_LEVELS,
  COURSE_DISCLAIMERS,
  type CourseCategory
} from '../data/coursesData';

interface CoursesPageProps {
  onOpenCounselling: (serviceOrCourse?: string) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({ onOpenCounselling }) => {
  const navigate = useNavigate();

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedLevelId, setSelectedLevelId] = useState<string>('all');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');

  // Dropdown Open States
  const [isLevelDropdownOpen, setIsLevelDropdownOpen] = useState(false);
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);

  // Refs for click outside
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const levelDropdownRef = useRef<HTMLDivElement>(null);
  const subjectDropdownRef = useRef<HTMLDivElement>(null);

  // Click outside listener for search suggestions & dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (levelDropdownRef.current && !levelDropdownRef.current.contains(event.target as Node)) {
        setIsLevelDropdownOpen(false);
      }
      if (subjectDropdownRef.current && !subjectDropdownRef.current.contains(event.target as Node)) {
        setIsSubjectDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Icon Resolver
  const renderCategoryIcon = (iconName: CourseCategory['iconName'], className = 'w-6 h-6') => {
    switch (iconName) {
      case 'Briefcase':
        return <Briefcase className={className} />;
      case 'Laptop':
        return <Laptop className={className} />;
      case 'Settings':
        return <Settings className={className} />;
      case 'BarChart3':
        return <BarChart3 className={className} />;
      case 'Heart':
        return <Heart className={className} />;
      case 'Stethoscope':
        return <Stethoscope className={className} />;
      case 'Palette':
        return <Palette className={className} />;
      case 'Scale':
        return <Scale className={className} />;
      case 'GraduationCap':
        return <GraduationCap className={className} />;
      case 'FlaskConical':
        return <FlaskConical className={className} />;
      case 'Truck':
        return <Truck className={className} />;
      default:
        return <BookOpen className={className} />;
    }
  };

  // Find active label objects
  const currentLevel = useMemo(() => {
    return STUDY_LEVELS.find((l) => l.id === selectedLevelId) || STUDY_LEVELS[0];
  }, [selectedLevelId]);

  const currentSubject = useMemo(() => {
    if (selectedSubjectId === 'all') return { id: 'all', title: 'All subjects' };
    const found = COURSE_CATEGORIES.find((c) => c.id === selectedSubjectId);
    return found ? { id: found.id, title: found.title } : { id: 'all', title: 'All subjects' };
  }, [selectedSubjectId]);

  // Autocomplete Suggestions - Instant recognition as user types
  interface SearchSuggestion {
    id: string;
    title: string;
    categoryTitle: string;
    categoryId: string;
    isPrefixMatch: boolean;
  }

  const searchSuggestions = useMemo<SearchSuggestion[]>(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q || q.length < 1) return [];

    const list: SearchSuggestion[] = [];
    const seen = new Set<string>();

    COURSE_CATEGORIES.forEach((cat) => {
      // Match within subject examples / specialisations
      cat.examples.forEach((ex) => {
        if (ex.toLowerCase().includes(q)) {
          const key = `${ex.toLowerCase()}-${cat.id}`;
          if (!seen.has(key)) {
            seen.add(key);
            list.push({
              id: key,
              title: ex,
              categoryTitle: cat.title,
              categoryId: cat.id,
              isPrefixMatch: ex.toLowerCase().startsWith(q),
            });
          }
        }
      });

      // Match within category title
      if (cat.title.toLowerCase().includes(q)) {
        const key = `cat-${cat.id}`;
        if (!seen.has(key)) {
          seen.add(key);
          list.push({
            id: key,
            title: cat.title,
            categoryTitle: 'Subject Area',
            categoryId: cat.id,
            isPrefixMatch: cat.title.toLowerCase().startsWith(q),
          });
        }
      }
    });

    // Sort by prefix matches first
    return list.sort((a, b) => {
      if (a.isPrefixMatch && !b.isPrefixMatch) return -1;
      if (!a.isPrefixMatch && b.isPrefixMatch) return 1;
      return a.title.localeCompare(b.title);
    }).slice(0, 8);
  }, [searchQuery]);

  // Handle Search Submission
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSearchFocused(false);
  };

  // Select a suggestion
  const handleSelectSuggestion = (item: SearchSuggestion) => {
    setSearchQuery(item.title);
    setIsSearchFocused(false);
    navigate(`/courses/${item.categoryId}`);
  };

  // Reset all filters and search
  const handleResetAll = () => {
    setSearchQuery('');
    setIsSearchFocused(false);
    setSelectedLevelId('all');
    setSelectedSubjectId('all');
  };

  // Live filter categories as user types
  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return COURSE_CATEGORIES.filter((category) => {
      // 1. Subject Filter
      if (selectedSubjectId !== 'all' && category.id !== selectedSubjectId) {
        return false;
      }

      // 2. Study Level Filter (If MBA is specifically chosen, prioritize Business & Management)
      if (selectedLevelId === 'mba') {
        const matchesMba = category.id === 'business-management' || category.examples.some(e => e.toLowerCase().includes('mba'));
        if (!matchesMba) return false;
      }

      // 3. Instant Search Query Filter: Recognizes partial words (e.g. 'chemic' -> Chemical Engineering)
      if (q) {
        const titleMatch = category.title.toLowerCase().includes(q);
        const descMatch = category.description.toLowerCase().includes(q);
        const exampleMatch = category.examples.some((ex) =>
          ex.toLowerCase().includes(q)
        );
        if (!titleMatch && !descMatch && !exampleMatch) {
          return false;
        }
      }

      return true;
    });
  }, [selectedSubjectId, selectedLevelId, searchQuery]);

  // Highlight matching letters in search suggestions
  const highlightMatch = (text: string, query: string) => {
    const q = query.trim();
    if (!q) return text;
    const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      part.toLowerCase() === q.toLowerCase() ? (
        <span key={i} className="text-[#0755F5] font-extrabold bg-[#EDF4FF] rounded px-0.5">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#EDF4FF]">
      {/* =========================================================================
          HERO SECTION
          Composition matches reference screenshot:
          - Eyebrow: "COURSES —"
          - Headline: "Explore Courses for a Brighter Future"
          - Subtitle: "Find a study pathway that matches your interests..."
          - Search bar: With icon, input and bright-blue button
          - Filters: ONLY TWO: "Study Level" and "Subject Area"
          - Right Side: Stack of books (DISCOVER, LEARN, GROW, ACHIEVE) + Cap
      ========================================================================= */}
      <section className="relative z-30 pt-8 sm:pt-12 pb-12 sm:pb-16 border-b border-[#DCE7FA] bg-gradient-to-b from-[#EDF4FF] via-[#EDF4FF]/60 to-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 xl:col-span-7">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[12px] font-extrabold tracking-[0.2em] text-[#101E49] uppercase">
                  COURSES
                </span>
                <span className="w-9 h-[2.5px] bg-[#0755F5] rounded-full inline-block" />
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#101E49] tracking-tight leading-[1.12] mb-4">
                Explore Courses<br />
                for a <span className="text-[#0755F5]">Brighter Future</span>
              </h1>

              {/* Description */}
              <p className="text-[15.5px] sm:text-[17px] text-[#63718E] leading-relaxed max-w-[580px] mb-8">
                Find a study pathway that matches your interests, academic background and career goals.
              </p>

              {/* Course Search Bar with Live Recognition & Autocomplete */}
              <div className="relative max-w-[620px] mb-4 z-50" ref={searchContainerRef}>
                <form
                  onSubmit={handleSearchSubmit}
                  className="bg-white rounded-2xl border border-[#DCE7FA] shadow-[0_4px_25px_-4px_rgba(7,85,245,0.08)] p-2 sm:p-2.5 flex flex-col sm:flex-row items-center gap-2 w-full transition-all focus-within:border-[#0755F5]/60 focus-within:shadow-[0_6px_28px_-4px_rgba(7,85,245,0.14)]"
                >
                  <div className="flex items-center gap-3 px-3 flex-1 w-full">
                    <Search className="w-5 h-5 text-[#0755F5] shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setIsSearchFocused(true);
                      }}
                      onFocus={() => setIsSearchFocused(true)}
                      placeholder="Search courses, subjects or specialisations"
                      className="w-full bg-transparent text-[#101E49] placeholder:text-[#94A3B8] text-sm sm:text-[15px] focus:outline-none"
                      aria-label="Search courses, subjects or specialisations"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery('');
                          setIsSearchFocused(false);
                        }}
                        className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                        aria-label="Clear search text"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-[#0755F5] hover:bg-[#0047D4] text-white font-bold rounded-xl text-sm transition-all shadow-sm shrink-0 cursor-pointer"
                  >
                    Search
                  </button>
                </form>

                {/* Live Recognized Course Suggestions Dropdown */}
                {isSearchFocused && searchQuery.trim().length >= 1 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl shadow-[#0755F5]/20 border border-[#DCE7FA] p-2 z-[1000] animate-fadeIn max-h-80 overflow-y-auto">
                    {searchSuggestions.length > 0 ? (
                      <>
                        <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          <span>Recognized Courses & Specialisations</span>
                          <span className="text-[#0755F5]">{searchSuggestions.length} found</span>
                        </div>
                        <div className="py-1 space-y-0.5">
                          {searchSuggestions.map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => handleSelectSuggestion(item)}
                              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#EDF4FF] transition-colors text-left cursor-pointer group"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-8 h-8 rounded-lg bg-[#EDF4FF] text-[#0755F5] flex items-center justify-center shrink-0 group-hover:bg-[#0755F5] group-hover:text-white transition-colors">
                                  <BookOpen className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                  <span className="text-sm font-bold text-[#101E49] group-hover:text-[#0755F5] transition-colors block truncate">
                                    {highlightMatch(item.title, searchQuery)}
                                  </span>
                                  <span className="text-[11px] text-[#63718E] block truncate">
                                    Faculty: <span className="font-semibold text-[#101E49]">{item.categoryTitle}</span>
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0755F5] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span>Open</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="p-4 text-center">
                        <p className="text-xs text-[#63718E]">
                          No direct matches for "<span className="font-semibold text-[#101E49]">{searchQuery}</span>".
                        </p>
                        <p className="text-[11px] text-slate-400 mt-1">
                          Try searching for another keyword or browse the 11 subject categories below.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Two Filters: Study Level and Subject Area (NO DESTINATION FILTER) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-[620px] relative z-40">
                
                {/* 1. Study Level Dropdown */}
                <div className={`relative flex-1 ${isLevelDropdownOpen ? 'z-50' : 'z-20'}`} ref={levelDropdownRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsLevelDropdownOpen(!isLevelDropdownOpen);
                      setIsSubjectDropdownOpen(false);
                    }}
                    className={`w-full bg-white rounded-2xl border px-4 py-2.5 flex items-center justify-between gap-3 cursor-pointer transition-all shadow-sm text-left ${
                      isLevelDropdownOpen
                        ? 'border-[#0755F5] ring-2 ring-[#0755F5]/10'
                        : 'border-[#DCE7FA] hover:border-[#0755F5]/40'
                    }`}
                    aria-haspopup="listbox"
                    aria-expanded={isLevelDropdownOpen}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-[#EDF4FF] text-[#0755F5] flex items-center justify-center shrink-0">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10.5px] font-medium text-[#63718E] leading-tight block">
                          Study Level
                        </span>
                        <span className="text-[13.5px] font-bold text-[#101E49] leading-snug block truncate">
                          {currentLevel.label}
                        </span>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isLevelDropdownOpen ? 'rotate-180 text-[#0755F5]' : ''
                      }`}
                    />
                  </button>

                  {/* Study Level Options Popover */}
                  {isLevelDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl shadow-[#0755F5]/15 border border-[#DCE7FA] p-2 z-[999] max-h-72 overflow-y-auto animate-fadeIn">
                      <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
                        <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                          Select Study Level
                        </span>
                        {selectedLevelId !== 'all' && (
                          <button
                            type="button"
                            onClick={() => setSelectedLevelId('all')}
                            className="text-[11px] font-bold text-[#0755F5] hover:underline cursor-pointer"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                      <div className="py-1 space-y-0.5">
                        {STUDY_LEVELS.map((level) => (
                          <button
                            key={level.id}
                            type="button"
                            onClick={() => {
                              setSelectedLevelId(level.id);
                              setIsLevelDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                              selectedLevelId === level.id
                                ? 'bg-[#EDF4FF] text-[#0755F5] font-bold'
                                : 'text-[#101E49] hover:bg-slate-50 font-medium'
                            }`}
                          >
                            <span className="text-[13px]">{level.label}</span>
                            {selectedLevelId === level.id && (
                              <CheckCircle2 className="w-4 h-4 text-[#0755F5] shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Subject Area Dropdown */}
                <div className={`relative flex-1 ${isSubjectDropdownOpen ? 'z-50' : 'z-20'}`} ref={subjectDropdownRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubjectDropdownOpen(!isSubjectDropdownOpen);
                      setIsLevelDropdownOpen(false);
                    }}
                    className={`w-full bg-white rounded-2xl border px-4 py-2.5 flex items-center justify-between gap-3 cursor-pointer transition-all shadow-sm text-left ${
                      isSubjectDropdownOpen
                        ? 'border-[#0755F5] ring-2 ring-[#0755F5]/10'
                        : 'border-[#DCE7FA] hover:border-[#0755F5]/40'
                    }`}
                    aria-haspopup="listbox"
                    aria-expanded={isSubjectDropdownOpen}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-[#EDF4FF] text-[#0755F5] flex items-center justify-center shrink-0">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10.5px] font-medium text-[#63718E] leading-tight block">
                          Subject Area
                        </span>
                        <span className="text-[13.5px] font-bold text-[#101E49] leading-snug block truncate">
                          {currentSubject.title}
                        </span>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isSubjectDropdownOpen ? 'rotate-180 text-[#0755F5]' : ''
                      }`}
                    />
                  </button>

                  {/* Subject Area Options Popover */}
                  {isSubjectDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl shadow-[#0755F5]/15 border border-[#DCE7FA] p-2 z-[999] max-h-72 overflow-y-auto animate-fadeIn">
                      <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
                        <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                          Select Subject Area
                        </span>
                        {selectedSubjectId !== 'all' && (
                          <button
                            type="button"
                            onClick={() => setSelectedSubjectId('all')}
                            className="text-[11px] font-bold text-[#0755F5] hover:underline cursor-pointer"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                      <div className="py-1 space-y-0.5">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedSubjectId('all');
                            setIsSubjectDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                            selectedSubjectId === 'all'
                              ? 'bg-[#EDF4FF] text-[#0755F5] font-bold'
                              : 'text-[#101E49] hover:bg-slate-50 font-medium'
                          }`}
                        >
                          <span className="text-[13px]">All subjects</span>
                          {selectedSubjectId === 'all' && (
                            <CheckCircle2 className="w-4 h-4 text-[#0755F5] shrink-0" />
                          )}
                        </button>

                        {COURSE_CATEGORIES.map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => {
                              setSelectedSubjectId(cat.id);
                              setIsSubjectDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                              selectedSubjectId === cat.id
                                ? 'bg-[#EDF4FF] text-[#0755F5] font-bold'
                                : 'text-[#101E49] hover:bg-slate-50 font-medium'
                            }`}
                          >
                            <span className="text-[13px] truncate">{cat.title}</span>
                            {selectedSubjectId === cat.id && (
                              <CheckCircle2 className="w-4 h-4 text-[#0755F5] shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Active Filter Badges */}
              {(searchQuery.trim() || selectedLevelId !== 'all' || selectedSubjectId !== 'all') && (
                <div className="flex flex-wrap items-center gap-2 mt-4 pt-1 animate-fadeIn">
                  <span className="text-xs text-slate-400 font-medium">Active filters:</span>
                  {searchQuery.trim() && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDF4FF] text-[#0755F5] text-xs font-semibold border border-[#DCE7FA]">
                      Search: "{searchQuery.trim()}"
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery('');
                          setIsSearchFocused(false);
                        }}
                        className="hover:text-red-500 cursor-pointer"
                        aria-label="Remove search filter"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedLevelId !== 'all' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDF4FF] text-[#0755F5] text-xs font-semibold border border-[#DCE7FA]">
                      Level: {currentLevel.label}
                      <button
                        type="button"
                        onClick={() => setSelectedLevelId('all')}
                        className="hover:text-red-500 cursor-pointer"
                        aria-label="Remove level filter"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedSubjectId !== 'all' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDF4FF] text-[#0755F5] text-xs font-semibold border border-[#DCE7FA]">
                      Subject: {currentSubject.title}
                      <button
                        type="button"
                        onClick={() => setSelectedSubjectId('all')}
                        className="hover:text-red-500 cursor-pointer"
                        aria-label="Remove subject filter"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={handleResetAll}
                    className="text-xs text-[#0755F5] hover:underline font-bold ml-1 cursor-pointer"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Right Visual Column (Graduation Books + Cap matching reference) */}
            <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[420px] lg:max-w-[440px]">
                {/* Decorative Soft Background Glow */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#0755F5]/10 via-[#0755F5]/5 to-transparent rounded-3xl blur-2xl -z-10" />

                <div className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-[0_8px_30px_rgba(7,85,245,0.08)] border border-[#DCE7FA]/80 bg-white">
                  <img
                    src="/images/courses-hero-visual.png"
                    alt="Graduation mortarboard cap over books stack inscribed Discover, Learn, Grow, Achieve"
                    className="w-full h-auto object-cover object-center transform hover:scale-[1.02] transition-transform duration-500"
                    loading="eager"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          COURSE CATEGORIES GRID SECTION
          Matches the reference image exactly:
          - Eyebrow: COURSE CATEGORIES —
          - Heading: "Explore by subject" (subject highlighted in bright blue)
          - Description: "Discover programmes across a wide range of study areas."
          - Right: "View All Courses" action
          - 4-column cards grid on desktop
          - Exactly 11 categories from supplied DOCX
      ========================================================================= */}
      <section className="py-12 sm:py-16 relative z-10">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[12px] font-extrabold tracking-[0.2em] text-[#101E49] uppercase">
                  COURSE CATEGORIES
                </span>
                <span className="w-9 h-[2.5px] bg-[#0755F5] rounded-full inline-block" />
              </div>
              <h2 className="text-3xl sm:text-[34px] font-extrabold text-[#101E49] tracking-tight leading-snug">
                Explore by <span className="text-[#0755F5]">subject</span>
              </h2>
              <p className="text-[15px] text-[#63718E] mt-1">
                Discover programmes across a wide range of study areas.
              </p>
            </div>

            {/* View All Courses Action */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={handleResetAll}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0755F5] hover:text-[#0047D4] transition-colors cursor-pointer group py-1"
              >
                <span>View All Courses</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Empty State when filters yield no matches */}
          {filteredCategories.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#DCE7FA] p-12 text-center shadow-sm max-w-xl mx-auto my-8">
              <div className="w-16 h-16 rounded-2xl bg-[#EDF4FF] text-[#0755F5] flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#101E49] mb-2">
                No matching course categories found
              </h3>
              <p className="text-sm text-[#63718E] mb-6">
                We couldn't find any subject areas matching your criteria. Try adjusting your search term or filters.
              </p>
              <button
                type="button"
                onClick={handleResetAll}
                className="px-6 py-2.5 bg-[#0755F5] text-white font-bold rounded-xl text-sm hover:bg-[#0047D4] transition-all cursor-pointer shadow-sm"
              >
                Reset Filters & Search
              </button>
            </div>
          ) : (
            /* 4-Column Desktop Grid for all 11 Categories */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {filteredCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/courses/${category.id}`}
                  className="bg-white rounded-2xl border border-[#DCE7FA] p-6 flex flex-col justify-between hover:border-[#0755F5]/50 hover:shadow-xl hover:shadow-[#0755F5]/8 transition-all duration-200 group cursor-pointer text-left relative"
                >
                  <div>
                    {/* Card Top Row: Bright Blue Icon + Circular Arrow */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#0755F5] text-white flex items-center justify-center shadow-sm shadow-[#0755F5]/25 group-hover:scale-105 transition-transform shrink-0">
                        {renderCategoryIcon(category.iconName, 'w-6 h-6')}
                      </div>
                      <div className="w-8 h-8 rounded-full border border-[#DCE7FA] flex items-center justify-center text-[#0755F5] group-hover:bg-[#0755F5] group-hover:text-white group-hover:border-[#0755F5] transition-all shrink-0">
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>

                    {/* Card Title */}
                    <h3 className="text-[17px] font-bold text-[#101E49] group-hover:text-[#0755F5] transition-colors leading-snug mb-2">
                      {category.title}
                    </h3>

                    {/* Card Description */}
                    <p className="text-[13px] text-[#63718E] leading-relaxed line-clamp-3">
                      {category.shortDescription}
                    </p>
                  </div>

                  {/* Bottom Indicator */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#0755F5] font-semibold">
                    <span>Explore programmes</span>
                    <span className="text-slate-400 group-hover:text-[#0755F5] font-normal transition-colors">
                      {category.examples.length} pathways
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* =========================================================================
              COUNSELLING CTA BANNER
              Matches reference screenshot bottom banner:
              - Pale-blue background
              - Left: Document/Certificate Icon, Heading + Subtitle
              - Middle: 3 Bullet items with icons
              - Right: "Book Course Counselling →" CTA Button
          ========================================================================= */}
          <div className="mt-12 sm:mt-16 bg-[#EBF2FE] rounded-2xl sm:rounded-3xl border border-[#D6E4FC] p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
            {/* Left Content */}
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="w-13 h-13 rounded-2xl bg-white border border-[#D6E4FC] text-[#0755F5] flex items-center justify-center shadow-sm shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-[19px] font-bold text-[#101E49]">
                  Not sure which course is right for you?
                </h3>
                <p className="text-xs sm:text-[13.5px] text-[#63718E] mt-0.5">
                  Get personalised course guidance from our expert counsellors.
                </p>
              </div>
            </div>

            {/* Middle Feature List (Desktop / Tablet) */}
            <div className="hidden xl:flex items-center gap-6 text-xs text-[#172344]">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#0755F5] shrink-0" />
                <span className="font-semibold leading-tight max-w-[130px]">Understand eligibility and career options</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#0755F5] shrink-0" />
                <span className="font-semibold leading-tight max-w-[130px]">Compare study levels and course options</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#0755F5] shrink-0" />
                <span className="font-semibold leading-tight max-w-[130px]">Plan your global education journey</span>
              </div>
            </div>

            {/* Right Action Button */}
            <div className="w-full lg:w-auto shrink-0">
              <button
                type="button"
                onClick={() => onOpenCounselling()}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#0755F5] hover:bg-[#0047D4] text-white font-bold rounded-full text-sm transition-all shadow-md shadow-[#0755F5]/20 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Book Course Counselling</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Discreet Legal & Editorial Advisory (Source: DOCX) */}
          <div className="mt-8 pt-6 border-t border-slate-200/60 text-center">
            <p className="text-[11.5px] text-[#94A3B8] leading-relaxed max-w-4xl mx-auto">
              {COURSE_DISCLAIMERS.availability} {COURSE_DISCLAIMERS.regulatedProfessions} {COURSE_DISCLAIMERS.counsellingFocus}
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default CoursesPage;

