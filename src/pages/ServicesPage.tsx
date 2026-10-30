import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useMemo } from 'react';

import {

  Users,

  Star,

  GraduationCap,

  ShieldCheck,

  LayoutGrid,

  Coins,

  FileText,

  Plane,

  Briefcase,

  Check,

  ArrowRight,

  Compass,

  Building2,

  FileCheck,

  Banknote,

  PlaneTakeoff,

  Car,

  Clock,

  Home

} from 'lucide-react';

import {

  SERVICE_FILTER_CATEGORIES,

  SERVICES_DATA,

  SERVICE_STATS,

} from '../data/servicesData';


const HERO_SERVICE_HOTSPOTS = [
  {
    id: 'counselling',
    title: 'Career Counselling',
    targetServiceId: 'career-counselling',
    top: '6.2%',
    height: '13.1%',
  },
  {
    id: 'university-selection',
    title: 'University Selection',
    targetServiceId: 'university-selection',
    top: '20.3%',
    height: '13.1%',
  },
  {
    id: 'application-support',
    title: 'Application Support',
    targetServiceId: 'application-assistance',
    top: '34.4%',
    height: '13.1%',
  },
  {
    id: 'financial-solutions',
    title: 'Financial Solutions',
    targetServiceId: 'education-loans',
    top: '48.4%',
    height: '13.1%',
  },
  {
    id: 'visa-immigration',
    title: 'Visa & Immigration',
    targetServiceId: 'visa-assistance',
    top: '62.5%',
    height: '13.1%',
  },
  {
    id: 'arrival-settlement',
    title: 'Arrival & Settlement',
    targetServiceId: 'airport-pickup',
    top: '76.6%',
    height: '13.1%',
  },
];

interface ServicesPageProps {

  onOpenCounselling: (serviceName?: string) => void;

  onSelectServiceById: (serviceId: string) => void;

}

export const ServicesPage: React.FC<ServicesPageProps> = ({

  onOpenCounselling,

  onSelectServiceById

}) => {

  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Filter services by category tab

  const filteredServices = useMemo(() => {

    if (activeCategory === 'all') return SERVICES_DATA;

    return SERVICES_DATA.filter((s) => s.category === activeCategory);

  }, [activeCategory]);

  // Fallback icon resolver for services without an image

  const renderFallbackIcon = (name?: string) => {

    switch (name) {

      case 'Compass': return <Compass className="w-8 h-8 text-[#0755F5]" />;

      case 'Building2': return <Building2 className="w-8 h-8 text-[#0755F5]" />;

      case 'FileCheck': return <FileCheck className="w-8 h-8 text-[#0755F5]" />;

      case 'GraduationCap': return <GraduationCap className="w-8 h-8 text-[#0755F5]" />;

      case 'Banknote': return <Banknote className="w-8 h-8 text-amber-500" />;

      case 'ShieldCheck': return <ShieldCheck className="w-8 h-8 text-emerald-500" />;

      case 'PlaneTakeoff': return <PlaneTakeoff className="w-8 h-8 text-sky-500" />;

      case 'Car': return <Car className="w-8 h-8 text-sky-500" />;

      case 'Home': return <Home className="w-8 h-8 text-sky-500" />;

      case 'Briefcase': return <Briefcase className="w-8 h-8 text-purple-500" />;

      case 'Clock': return <Clock className="w-8 h-8 text-purple-500" />;

      default: return <GraduationCap className="w-8 h-8 text-[#0755F5]" />;

    }

  };

  // Category Filter Icon Resolver

  const renderFilterIcon = (name: string, isActive: boolean) => {

    const iconClass = `w-4 h-4 ${isActive ? 'text-white' : 'text-[#0755F5]'}`;

    switch (name) {

      case 'LayoutGrid': return <LayoutGrid className={iconClass} />;

      case 'GraduationCap': return <GraduationCap className={iconClass} />;

      case 'Coins': return <Coins className={iconClass} />;

      case 'FileText': return <FileText className={iconClass} />;

      case 'Plane': return <Plane className={iconClass} />;

      case 'Briefcase': return <Briefcase className={iconClass} />;

      default: return <LayoutGrid className={iconClass} />;

    }

  };

  // Stat Icon Resolver

  const renderStatIcon = (name: string) => {

    switch (name) {

      case 'Users': return <Users className="w-5 h-5 text-[#0755F5]" />;

      case 'Star': return <Star className="w-5 h-5 text-amber-500 fill-amber-500" />;

      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-emerald-500" />;

      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-purple-500" />;

      default: return <Users className="w-5 h-5 text-[#0755F5]" />;

    }

  };

  

  return (

    <div className="min-h-screen bg-[#EDF4FF]">

      {/* =========================================================================
          1. HERO SECTION (Matching Image 2 Specification)
          - Left column (50%): Eyebrow, Main Heading, Description
          - Right column (50%): Real interactive office desk still-life + 6 individual service labels
      ========================================================================= */}
      <section className="relative overflow-hidden border-b border-[#DCE7FA] bg-gradient-to-r from-white via-[#F6FAFF] to-[#EAF2FF] py-8 sm:py-10 lg:py-12 min-h-[280px] sm:min-h-[300px] lg:min-h-[320px] flex items-center">
        {/* Soft background light glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0755F5]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Right-side 3D Scene: Fit flush to screen from right side end */}
        <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[58%] lg:w-[54%] xl:w-[50%] flex items-center justify-end select-none pointer-events-none overflow-hidden">
          <div className="relative w-full h-full max-w-[860px]">
            <img
              src="/images/services-hero-scene.png"
              alt="Complete Support for Your Global Journey - Services Overview"
              className="w-full h-full object-cover object-right pointer-events-none"
              loading="eager"
            />

            {/* Interactive Hotspot Links over each of the 6 service book spines */}
            {HERO_SERVICE_HOTSPOTS.map((spot) => (
              <Link
                key={spot.id}
                to={`/services/${spot.targetServiceId}`}
                title={spot.title}
                style={{
                  position: 'absolute',
                  left: '60.4%',
                  width: '34.6%',
                  top: spot.top,
                  height: spot.height,
                }}
                className="pointer-events-auto group rounded-md transition-all duration-200 hover:bg-[#0755F5]/10 hover:ring-2 hover:ring-[#0755F5]/40 cursor-pointer flex items-center px-2"
              >
                <span className="sr-only">{spot.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Left Column Content — Aligned within page container grid */}
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="max-w-[520px] lg:max-w-[560px] text-left">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-[2px] bg-[#0755F5] rounded-full inline-block" />
              <span className="text-[12px] font-extrabold tracking-[0.2em] text-[#0755F5] uppercase">
                OUR SERVICES
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-black text-[#101E49] tracking-tight leading-[1.14] mb-3.5 sm:mb-4">
              Complete Support<br />
              for Your <span className="text-[#0755F5]">Global Journey</span>
            </h1>

            {/* Description */}
            <p className="text-[15px] sm:text-[16px] text-[#63718E] leading-relaxed max-w-[490px] font-normal">
              From university selection to post-arrival support, we provide complete guidance at every step so you can study abroad with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================

          2. STAT CARDS BAR (Matching Image 1)

          - 15,000+ Students Counseled

          - 100% Visa Success Rate

          - ₹25 Cr+ Scholarships Secured

          - 100% Zero Service Charges

      ========================================================================= */}

      <section className="py-6 sm:py-8 bg-white border-b border-[#DCE7FA]">

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

            {SERVICE_STATS.map((stat) => (

              <div

                key={stat.id}

                className="bg-white rounded-2xl p-4 sm:p-5 border border-[#DCE7FA] shadow-xs flex items-center gap-3.5 sm:gap-4 hover:border-[#0755F5]/40 transition-colors"

              >

                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${stat.bgColor} flex items-center justify-center shrink-0`}>

                  {renderStatIcon(stat.iconName)}

                </div>

                <div className="min-w-0">

                  <div className="text-xl sm:text-2xl font-black text-[#101E49] leading-tight">

                    {stat.value}

                  </div>

                  <div className="text-xs sm:text-[13px] font-medium text-[#63718E] truncate mt-0.5">

                    {stat.label}

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* =========================================================================

          3. CATEGORY FILTER PILLS & SERVICES GRID (Matching Image 1)

      ========================================================================= */}

      <section className="py-10 sm:py-16">

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Category Filter Pills Row */}

          <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 sm:mb-10 no-scrollbar">

            {SERVICE_FILTER_CATEGORIES.map((tab) => {

              const isActive = activeCategory === tab.id;

              return (

                <button

                  key={tab.id}

                  type="button"

                  onClick={() => setActiveCategory(tab.id)}

                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${

                    isActive

                      ? 'bg-[#101E49] text-white shadow-md shadow-[#101E49]/20'

                      : 'bg-white text-[#101E49] hover:bg-[#EDF4FF] hover:text-[#0755F5] border border-[#DCE7FA]'

                  }`}

                >

                  {renderFilterIcon(tab.iconName, isActive)}

                  <span>{tab.label}</span>

                </button>

              );

            })}

          </div>

          {/* 3-Column Services Card Grid */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

            {filteredServices.map((service) => (

              <div

                key={service.id}

                onClick={() => navigate(`/services/${service.id}`)}

                className="bg-white rounded-3xl border border-[#DCE7FA] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-xl hover:shadow-[#0755F5]/8 hover:border-[#0755F5]/40 transition-all duration-300 group cursor-pointer text-left relative"

              >

                <div>

                  {/* Top Row: Category Badge + 3D Illustration / Icon */}

                  <div className="flex items-start justify-between gap-3 mb-4">

                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-wider ${service.badgeStyle.bg} ${service.badgeStyle.text} border ${service.badgeStyle.border}`}>

                      {service.badgeLabel}

                    </span>

                    {/* 3D Illustration or Icon Box */}

                    {service.illustration ? (

                      <div className="w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center shrink-0 -mt-1 group-hover:scale-105 transition-transform duration-300">

                        <img

                          src={service.illustration}

                          alt={service.title}

                          className="w-full h-full object-contain"

                          loading="lazy"

                        />

                      </div>

                    ) : (

                      <div className="w-12 h-12 rounded-2xl bg-[#EDF4FF] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">

                        {renderFallbackIcon(service.iconFallback)}

                      </div>

                    )}

                  </div>

                  {/* Title */}

                  <h3 className="text-xl sm:text-[22px] font-black text-[#101E49] group-hover:text-[#0755F5] transition-colors leading-tight mb-2">

                    {service.title}

                  </h3>

                  {/* Description */}

                  <p className="text-xs sm:text-[13.5px] text-[#63718E] leading-relaxed mb-5">

                    {service.description}

                  </p>

                  {/* 3 Checklist Highlights with Green Checks */}

                  <div className="space-y-2 mb-6">

                    {service.checklist.map((item, idx) => (

                      <div key={idx} className="flex items-start gap-2.5">

                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 stroke-[2.5]" />

                        <span className="text-xs sm:text-[12.5px] font-semibold text-[#101E49] leading-snug">

                          {item}

                        </span>

                      </div>

                    ))}

                  </div>

                </div>

                {/* Bottom Row: View Details Link + Circular Dark Arrow Button */}

                <div 
                  className="pt-4 border-t border-slate-100 flex items-center justify-between"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/services/${service.id}`);
                  }}
                >
                  <Link
                    to={`/services/${service.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs sm:text-sm font-bold text-[#0755F5] group-hover:text-[#0047D4] inline-flex items-center gap-1 group-hover:underline cursor-pointer"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectServiceById(service.id);
                    }}
                    className="px-4 py-1.5 rounded-full bg-[#101E49] hover:bg-[#0755F5] text-white text-xs sm:text-[13px] font-bold transition-all shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer shrink-0"
                  >
                    Book
                  </button>
                </div>

              </div>

            ))}

          </div>

          {/* Empty State when a filter has no items */}

          {filteredServices.length === 0 && (

            <div className="bg-white rounded-3xl border border-[#DCE7FA] p-12 text-center shadow-sm max-w-md mx-auto my-8">

              <p className="text-sm text-[#63718E] mb-4">No services available in this category yet.</p>

              <button

                type="button"

                onClick={() => setActiveCategory('all')}

                className="px-6 py-2.5 bg-[#0755F5] text-white font-bold rounded-xl text-xs hover:bg-[#0047D4] transition-all cursor-pointer"

              >

                View All Services

              </button>

            </div>

          )}

        </div>

      </section>

      {/* =========================================================================

          4. COUNSELLING CTA BANNER

      ========================================================================= */}

      <section className="pb-16 sm:pb-20">

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">

          <div className="bg-[#EBF2FE] rounded-2xl sm:rounded-3xl border border-[#D6E4FC] p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">

            <div className="flex items-center gap-4 w-full lg:w-auto">

              <div className="w-13 h-13 rounded-2xl bg-white border border-[#D6E4FC] text-[#0755F5] flex items-center justify-center shadow-sm shrink-0">

                <ShieldCheck className="w-6 h-6 text-[#0755F5]" />

              </div>

              <div>

                <h3 className="text-lg sm:text-[19px] font-bold text-[#101E49]">

                  Need a customized education & visa plan?

                </h3>

                <p className="text-xs sm:text-[13.5px] text-[#63718E] mt-0.5">

                  Get personalized guidance across all 360° services from our expert counsellors.

                </p>

              </div>

            </div>

            <div className="w-full lg:w-auto shrink-0">

              <button

                type="button"

                onClick={() => onOpenCounselling('All Services')}

                className="w-full sm:w-auto px-7 py-3.5 bg-[#0755F5] hover:bg-[#0047D4] text-white font-bold rounded-full text-sm transition-all shadow-md shadow-[#0755F5]/20 flex items-center justify-center gap-2 cursor-pointer group"

              >

                <span>Book Free Consultation</span>

                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />

              </button>

            </div>

          </div>

        </div>

      </section>

    </div>

  );

};

export default ServicesPage;

