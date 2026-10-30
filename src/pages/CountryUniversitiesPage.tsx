import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { UniversityCard } from '../components/UniversityCard';
import { FlagIcon } from '../components/FlagIcon';
import { getCountryConfig, DIRECTORY_DESTINATIONS } from '../data/countryUniversities';
import type { CountryConfig } from '../data/countryUniversities';

export interface CountryUniversitiesPageProps {
  countryId?: string;
  onOpenCounselling?: (destination?: string) => void;
}

export const CountryUniversitiesPage: React.FC<CountryUniversitiesPageProps> = ({
  countryId: propCountryId,
  onOpenCounselling,
}) => {
  const routeParams = useParams<{ countryId?: string }>();
  const activeCountryId = propCountryId || routeParams.countryId || 'usa';

  const config: CountryConfig = useMemo(() => {
    return getCountryConfig(activeCountryId);
  }, [activeCountryId]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(24);
  const gridTopRef = useRef<HTMLDivElement>(null);

  // Filtered universities based on search query and region filter
  const filteredUniversities = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return config.items.filter((item) => {
      // 1. Region filter
      if (selectedRegion !== 'all') {
        if (!config.filterItemByRegion(item, selectedRegion)) {
          return false;
        }
      }

      // 2. Search query filter
      if (q) {
        const nameMatch = item.institution_name?.toLowerCase().includes(q);
        const locMatch = item.location?.toLowerCase().includes(q);
        const idMatch = item.directory_id?.toLowerCase().includes(q);
        if (!nameMatch && !locMatch && !idMatch) return false;
      }

      return true;
    });
  }, [config, searchQuery, selectedRegion]);

  // Reset page when country, search, region, or page size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCountryId, searchQuery, selectedRegion, pageSize]);

  // Reset selected region if country changes
  useEffect(() => {
    setSelectedRegion('all');
    setSearchQuery('');
  }, [activeCountryId]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredUniversities.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredUniversities.length);

  const paginatedUniversities = useMemo(() => {
    return filteredUniversities.slice(startIndex, endIndex);
  }, [filteredUniversities, startIndex, endIndex]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Generate pagination buttons with smart ellipsis
  const paginationRange = useMemo(() => {
    const delta = 2;
    const range: (number | string)[] = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift('...');
    }
    if (currentPage + delta < totalPages - 1) {
      range.push('...');
    }

    range.unshift(1);
    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  }, [currentPage, totalPages]);

  return (
    <div className="bg-[#FAF7F1] min-h-screen">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER & SEARCH / FILTER SECTION (EXACT DESIGN AS USA PAGE)
         ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-6 pb-7 sm:pb-8 bg-gradient-to-b from-[#EDF5FF] via-[#F5F8FF] to-[#FAF7F1] border-b border-[#E2E8F0] overflow-hidden">
        {/* Subtle Decorative Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#155EEF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs & Back link */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#64748B]">
              <Link to="/" className="hover:text-[#155EEF] transition-colors">
                Home
              </Link>
              <span className="text-[#CBD5E1]">/</span>
              <Link to={config.backPath} className="hover:text-[#155EEF] transition-colors">
                Study in {config.name}
              </Link>
              <span className="text-[#CBD5E1]">/</span>
              <span className="text-[#155EEF] font-bold">All Universities</span>
            </nav>

            <Link
              to={config.backPath}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#155EEF] hover:text-[#104ECC] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{config.backLabel}</span>
            </Link>
          </div>

          {/* Destination Selector / Filter Buttons above the University Directory */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#64748B] mr-1 shrink-0">
              Destinations ({DIRECTORY_DESTINATIONS.length}):
            </span>
            {DIRECTORY_DESTINATIONS.map((dest) => {
              const isActive = activeCountryId === dest.id || activeCountryId === dest.slug;
              return (
                <Link
                  key={dest.id}
                  to={`/study-in-${dest.slug}/universities`}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#155EEF] text-white shadow-sm shadow-blue-500/25 scale-[1.02]'
                      : 'bg-white hover:bg-[#F5F8FF] text-[#14213D] border border-[#CBD5E1] hover:border-[#155EEF]/50 shadow-xs'
                  }`}
                >
                  <FlagIcon country={dest.name} className="w-3.5 h-2.5 rounded-2xs inline-block" />
                  <span>{dest.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Header Row: Title on Left, Search & Region on Right */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
            {/* Title Block */}
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#EAF2FF] text-[#155EEF] text-[11px] font-extrabold uppercase tracking-wider mb-2">
                STUDY IN {config.name.toUpperCase()}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#10243F]">
                Explore <span className="text-[#155EEF]">{config.name} Universities</span>
              </h1>

              <p className="text-sm sm:text-base text-[#475569] mt-1 font-normal">
                {config.subtitle}
              </p>
            </div>

            {/* Controls Block: Search Bar & Region Dropdown */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search Bar */}
              <div className="relative w-full sm:w-72 md:w-84">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${config.name} universities...`}
                  className="w-full pl-11 pr-9 py-2.5 rounded-full bg-white border border-[#CBD5E1] text-xs sm:text-sm text-[#14213D] placeholder-[#94A3B8] font-medium shadow-xs focus:outline-hidden focus:border-[#155EEF] focus:ring-2 focus:ring-[#155EEF]/20 transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Region Filter Dropdown (if regions available) */}
              {config.regions.length > 0 && (
                <div className="relative shrink-0">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#155EEF] pointer-events-none">
                    <SlidersHorizontal className="w-4 h-4" />
                  </div>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="appearance-none pl-10 pr-9 py-2.5 rounded-full bg-white border border-[#CBD5E1] text-xs sm:text-sm font-semibold text-[#14213D] shadow-xs focus:outline-hidden focus:border-[#155EEF] focus:ring-2 focus:ring-[#155EEF]/20 transition-all cursor-pointer max-w-[220px] truncate"
                    aria-label={`Filter by ${config.regionFilterLabel}`}
                  >
                    <option value="all">{config.regionFilterLabel}</option>
                    {config.regions.map((reg) => (
                      <option key={reg.code} value={reg.code}>
                        {reg.name} ({reg.count})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              )}

              {/* Reset filter button if active */}
              {(searchQuery || selectedRegion !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedRegion('all');
                  }}
                  className="px-3.5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap self-center"
                  title="Reset search and filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Results Summary */}
          <div className="mt-4 pt-3 border-t border-[#E2E8F0]/70 flex items-center justify-between text-xs text-[#64748B]">
            <div>
              <span>
                Showing{' '}
                <strong className="text-[#10243F]">
                  {filteredUniversities.length === 0 ? 0 : (startIndex + 1).toLocaleString()}
                </strong>{' '}
                –{' '}
                <strong className="text-[#10243F]">
                  {Math.min(endIndex, filteredUniversities.length).toLocaleString()}
                </strong>{' '}
                of{' '}
                <strong className="text-[#155EEF]">
                  {filteredUniversities.length.toLocaleString()}
                </strong>{' '}
                institutions
                {filteredUniversities.length < config.items.length &&
                  ` (filtered from ${config.items.length.toLocaleString()} total)`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline">
                Page {currentPage} of {totalPages}
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <div className="flex items-center gap-1">
                <span className="text-[11px] text-[#64748B]">Per page:</span>
                {[24, 48, 96].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setPageSize(size)}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-colors ${
                      pageSize === size
                        ? 'bg-[#155EEF] text-white'
                        : 'text-[#64748B] hover:text-[#10243F] hover:bg-slate-200/60'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. UNIVERSITY DIRECTORY GRID (100% IDENTICAL HORIZONTAL CARDS)
         ───────────────────────────────────────────────────────────── */}
      <section ref={gridTopRef} className="py-8 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredUniversities.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E2E8F0] shadow-sm max-w-lg mx-auto">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 text-[#155EEF] flex items-center justify-center mb-4">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-[#10243F]">No universities found</h3>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1.5">
              We couldn't find any institutions matching &ldquo;{searchQuery}&rdquo;
              {selectedRegion !== 'all' ? ` in the selected area` : ''}.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedRegion('all');
              }}
              className="mt-5 px-5 py-2.5 rounded-xl bg-[#155EEF] hover:bg-[#104ECC] text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {paginatedUniversities.map((uni) => (
              <UniversityCard
                key={`${uni.directory_id}-${uni.institution_name}`}
                uni={uni}
                defaultCountryName={config.name}
              />
            ))}
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            3. PAGINATION CONTROLS
           ───────────────────────────────────────────────────────────── */}
        {totalPages > 1 && (
          <div className="mt-10 sm:mt-12 flex items-center justify-center gap-2 flex-wrap">
            {/* Prev Button */}
            <button
              type="button"
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                currentPage === 1
                  ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'
                  : 'bg-white hover:bg-[#F5F8FF] text-[#155EEF] border-[#CBD5E1] hover:border-[#155EEF] shadow-xs'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Page Number Buttons with Ellipsis */}
            <div className="flex items-center gap-1.5">
              {paginationRange.map((pageItem, idx) => {
                if (pageItem === '...') {
                  return (
                    <span key={`ellipsis-${idx}`} className="px-2 text-slate-400 text-xs font-bold">
                      ...
                    </span>
                  );
                }

                const pageNum = Number(pageItem);
                const isActive = pageNum === currentPage;

                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => handlePageChange(pageNum)}
                    className={`min-w-[36px] h-9 px-2 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#155EEF] text-white shadow-md shadow-blue-500/25 scale-105'
                        : 'bg-white hover:bg-slate-100 text-[#475569] border border-slate-200 hover:border-[#155EEF]/50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                currentPage === totalPages
                  ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'
                  : 'bg-white hover:bg-[#F5F8FF] text-[#155EEF] border-[#CBD5E1] hover:border-[#155EEF] shadow-xs'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. BOTTOM CONSULTATION BANNER
         ───────────────────────────────────────────────────────────── */}
      {onOpenCounselling && (
        <section className="py-12 bg-[#F5F8FF] border-t border-[#E2E8F0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#10243F] via-[#14213D] to-[#155EEF] rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-wider text-[#93C5FD] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Personalized University Shortlisting</span>
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-editorial mt-1">
                  Need Help Choosing Between {config.items.length.toLocaleString()}+ {config.name} Institutions?
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Connect with our {config.name} admissions advisors to assess your profile, budget, and career goals for a tailored university shortlist.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onOpenCounselling(config.counsellingDestination)}
                className="px-6 py-3 rounded-xl bg-[#155EEF] hover:bg-[#104ECC] text-white text-xs font-bold shadow-md transition-all whitespace-nowrap shrink-0 hover:scale-105 active:scale-100"
              >
                Book Free Consultation
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CountryUniversitiesPage;
