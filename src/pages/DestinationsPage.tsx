import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PageBanner } from '../components/PageBanner';
import { Universities } from '../components/Universities';
import { FinalCta } from '../components/FinalCta';
import { FlagIcon } from '../components/FlagIcon';
import { DestinationNavBar, getCountryRoute } from '../components/DestinationNavBar';
import { DESTINATIONS } from '../data/content';
import type { Destination } from '../types';
import { 
  Globe2, 
  DollarSign, 
  Award, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  GraduationCap, 
  Sparkles 
} from 'lucide-react';

interface DestinationsPageProps {
  onOpenCounselling: (destination?: string) => void;
  onSelectDestination?: (dest: Destination) => void;
  onSelectDestinationById?: (destId: string) => void;
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({
  onOpenCounselling,
}) => {
  const [searchParams] = useSearchParams();
  const rawCountryParam = searchParams.get('country')?.toLowerCase().trim() || '';

  // Match country safely regardless of hyphens, casing or spaces
  const matchedCountry = rawCountryParam
    ? DESTINATIONS.find(
        (d) =>
          d.id === rawCountryParam ||
          d.id === rawCountryParam.replace(/\s+/g, '-') ||
          d.name.toLowerCase() === rawCountryParam ||
          d.name.toLowerCase() === rawCountryParam.replace(/-/g, ' ')
      )
    : null;

  const activeFilter = matchedCountry ? matchedCountry.id : 'all';

  // Smoothly scroll to the target destination card if specified
  useEffect(() => {
    if (matchedCountry) {
      const timer = window.setTimeout(() => {
        const el = document.getElementById(`destination-${matchedCountry.id}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
      return () => window.clearTimeout(timer);
    }
  }, [matchedCountry]);

  const filteredDestinations = activeFilter === 'all'
    ? DESTINATIONS
    : DESTINATIONS.filter(d => d.id === activeFilter);

  return (
    <div className="bg-[#EDF4FF]">
      {/* 1. Page Header Banner */}
      <PageBanner
        breadcrumbs={[{ label: 'Destinations' }]}
        badge="WORLD-CLASS STUDY HUBS"
        badgeIcon={<Globe2 className="w-3.5 h-3.5 text-[#0755F5]" />}
        title="Explore Top Study Destinations Worldwide"
        highlightWord="Study Destinations"
        description="Compare premier universities, post-study work opportunities, tuition costs, and verified visa approval rates across the world's most sought-after study destinations."
        hideBottomBorder
        sideImage="/images/destinations-travel-illustration.png"
        sideImageAlt="Explore Top Study Destinations Worldwide"
      />

      {/* 2. Interactive Navigation Bar */}
      <DestinationNavBar activeCountry={activeFilter} />

      {/* 3. Comprehensive Destination Cards Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                {activeFilter === 'all'
                  ? `Showing all ${DESTINATIONS.length} premier countries`
                  : `Showing details for ${filteredDestinations[0]?.name}`}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#101E49] mt-1">
                {activeFilter === 'all' ? (
                  <>Compare Your Global <span className="bg-gradient-to-r from-[#0755F5] to-[#0877FF] bg-clip-text text-transparent font-extrabold">Options</span></>
                ) : (
                  <>Study in <span className="bg-gradient-to-r from-[#0755F5] to-[#0877FF] bg-clip-text text-transparent font-extrabold">{filteredDestinations[0]?.name}</span></>
                )}
              </h2>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#63718E]">
              <Sparkles className="w-4 h-4 text-[#0755F5]" />
              <span>Click any card for full university list</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredDestinations.map((country) => (
              <div
                key={country.id}
                id={`destination-${country.id}`}
                className="bg-white rounded-3xl overflow-hidden border border-[#DCE7FA] hover:border-[#0755F5]/60 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col group scroll-mt-36"
              >
                {/* Photo & Badge */}
                <Link 
                  to={getCountryRoute(country.id)}
                  className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900 cursor-pointer block"
                >
                  <img
                    src={country.image}
                    alt={country.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101E49] via-[#101E49]/40 to-transparent" />

                  {/* Top Flag & Visa Success Pill */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-sm">
                      <FlagIcon country={country.name} className="w-5 h-3.5 rounded-xs" />
                      <span className="text-xs font-bold text-[#101E49]">{country.name}</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/90 text-white backdrop-blur-md text-xs font-bold shadow-sm">
                      <Award className="w-3.5 h-3.5" />
                      <span>{country.visaSuccessRate} Visa Success</span>
                    </div>
                  </div>

                  {/* Bottom Title on Image */}
                  <div className="absolute bottom-5 left-6 right-6 text-white">
                    <p className="text-xs uppercase tracking-wider text-blue-200 font-semibold mb-1">
                      Premier Overseas Destination
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                      Study in {country.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-200 mt-1 line-clamp-1">
                      {country.shortDesc}
                    </p>
                  </div>
                </Link>

                {/* Country Meta & Information */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                  {/* 3 Metric Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-[#EDF4FF]/50 rounded-2xl border border-[#DCE7FA]">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#63718E] uppercase">
                        <Award className="w-3.5 h-3.5 text-[#0755F5]" />
                        <span>Approval Rate</span>
                      </div>
                      <p className="text-sm font-extrabold text-[#101E49] mt-1">
                        {country.visaSuccessRate}
                      </p>
                    </div>

                    <div className="p-3 bg-[#EDF4FF]/50 rounded-2xl border border-[#DCE7FA]">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#63718E] uppercase">
                        <Clock className="w-3.5 h-3.5 text-sky-500" />
                        <span>Work Permit</span>
                      </div>
                      <p className="text-xs font-bold text-[#101E49] mt-1 line-clamp-1">
                        {country.workPermit}
                      </p>
                    </div>

                    <div className="col-span-2 sm:col-span-1 p-3 bg-[#EDF4FF]/50 rounded-2xl border border-[#DCE7FA]">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#63718E] uppercase">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Avg Tuition</span>
                      </div>
                      <p className="text-xs font-bold text-[#101E49] mt-1 line-clamp-1">
                        {country.avgTuition}
                      </p>
                    </div>
                  </div>

                  {/* Popular Universities */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#63718E]">
                        Top Ranked Partner Universities
                      </span>
                      <Link
                        to={getCountryRoute(country.id)}
                        className="text-[11px] font-bold text-[#0755F5] hover:underline cursor-pointer"
                      >
                        View All &rarr;
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-[#172344]">
                      {country.popularUniversities.map((uni, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0755F5] shrink-0" />
                          <span className="truncate">{uni}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* High In-Demand Courses */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#63718E] block mb-2">
                      Popular Master's & Bachelor's Programs
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {country.topCourses.map((course, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-[#EDF4FF] border border-[#DCE7FA] text-xs font-medium text-[#101E49]"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <Link
                      to={getCountryRoute(country.id)}
                      className="w-full sm:flex-1 py-3 px-4 bg-gradient-to-r from-[#0755F5] via-[#2563EB] to-[#0877FF] hover:opacity-95 text-white text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#0755F5]/25 group/btn text-center"
                    >
                      <GraduationCap className="w-4 h-4 text-white" />
                      <span>Full {country.name} Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>

                    <button
                      onClick={() => onOpenCounselling(country.name)}
                      className="w-full sm:w-auto py-3 px-5 bg-white hover:bg-[#EDF4FF] border border-[#DCE7FA] text-[#0755F5] hover:text-[#0877FF] text-xs sm:text-sm font-bold rounded-xl transition-colors cursor-pointer text-center"
                    >
                      Apply to {country.name}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Top Universities Around The World */}
      <Universities onOpenCounselling={() => onOpenCounselling()} />

      {/* 6. Sunset Consultation CTA */}
      <FinalCta onOpenCounselling={() => onOpenCounselling()} />
    </div>
  );
};

export default DestinationsPage;
