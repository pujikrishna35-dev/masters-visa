import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Compass,
  Building2,
  FileCheck,
  Banknote,
  ShieldCheck,
  PlaneTakeoff,
  Car,
  Home,
  Briefcase,
  Clock,
  Layers,
  Calendar
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';

interface ServiceDetailPageProps {
  onOpenCounselling: (serviceName?: string) => void;
  onSelectServiceById: (serviceId: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  onOpenCounselling,
  onSelectServiceById
}) => {
  const { serviceId } = useParams<{ serviceId: string }>();

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [serviceId]);

  const normalizedId = serviceId?.toLowerCase().trim() || '';

  const service = SERVICES_DATA.find(
    (s) => s.id.toLowerCase() === normalizedId
  );

  const isCareerCounselling = normalizedId === 'career-counselling' || normalizedId === 'career-counseling' || normalizedId === 'counselling';

  // Fallback icon resolver for generic service detail view
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

  // If Career Counselling page, render the exact page design matching reference image
  if (isCareerCounselling) {
    return (
      <div className="min-h-screen bg-[#EDF4FF] text-[#172344] font-sans pb-16 sm:pb-24">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
          
          {/* Top Breadcrumb Link: Back to All Services */}
          <div className="mb-6 sm:mb-8">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0755F5] hover:text-[#0047D4] transition-colors group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to All Services</span>
            </Link>
          </div>

          {/* =========================================================================
              HERO SECTION (Matching Reference Image)
              ========================================================================= */}
          <section className="mb-10 sm:mb-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Eyebrow + Title + Subtitle + Description + Primary CTA */}
              <div className="lg:col-span-7 text-left space-y-4 sm:space-y-5">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10.5px] sm:text-xs font-bold uppercase tracking-wider bg-[#FEF6EE] text-[#C46210] border border-[#FCD2B3]">
                    ADMISSIONS STRATEGY
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#101E49] tracking-tight leading-[1.15]">
                  Career Counselling
                </h1>

                <p className="text-base sm:text-lg lg:text-xl font-bold text-[#101E49] leading-snug">
                  Align your passions with high-growth international career opportunities.
                </p>

                <p className="text-sm sm:text-[14.5px] text-[#63718E] leading-relaxed max-w-xl font-normal">
                  Masters Visa provides free career counseling to help individuals navigate their career paths, aiding in selecting the ideal course and institute. Our comprehensive service analyzes student profiles, narrows down course options, and delves into preferred destinations.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenCounselling('Career Counselling')}
                    className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-[#0755F5] hover:bg-[#0047D4] text-white text-sm sm:text-[14.5px] font-bold transition-all shadow-md shadow-[#0755F5]/25 hover:shadow-lg hover:shadow-[#0755F5]/35 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Get Free Counselling</span>
                    <ArrowRight className="w-4 h-4 ml-0.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Hero 3D Illustration */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[480px]">
                  <img
                    src="/images/career-hero-illustration.png"
                    alt="Career Counselling, Goal Setting & Global Education Planning"
                    className="w-full h-auto object-contain transform hover:scale-[1.02] transition-transform duration-500 drop-shadow-sm"
                    loading="eager"
                  />
                </div>
              </div>

            </div>
          </section>

          {/* =========================================================================
              4 MAIN NUMBERED SECTIONS (Matching Reference Image)
              ========================================================================= */}
          <div className="space-y-6 sm:space-y-8">
            
            {/* SECTION 01: Student's Profile Analysis */}
            <div className="bg-white rounded-3xl border border-[#DCE7FA] p-6 sm:p-8 lg:p-10 shadow-[0_4px_20px_rgba(7,85,245,0.03)] hover:border-[#0755F5]/40 transition-colors">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Text */}
                <div className="lg:col-span-7 text-left space-y-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#EDF4FF] text-[#0755F5] font-black text-lg flex items-center justify-center border border-[#DCE7FA] shrink-0">
                    01
                  </div>
                  <h2 className="text-2xl sm:text-[26px] font-black text-[#101E49] tracking-tight">
                    Student's Profile Analysis
                  </h2>
                  <p className="text-xs sm:text-[14px] text-[#63718E] leading-relaxed">
                    Analysis of the student profile is a vital part of the free career counselling process at Masters Visa. Our counsellors assess the student's strengths, weaknesses, interests, and personality traits to form a comprehensive profile. The evaluation is based on academic performance, extracurricular activities, work or volunteer experience, and other criteria. This helps in understanding the student's aptitude for a particular field of study and recommending the most suitable courses that align with their interests, career goals, and skills set.
                  </p>
                </div>

                {/* Right Illustration */}
                <div className="lg:col-span-5 flex justify-center lg:justify-end">
                  <div className="w-full max-w-[380px] flex items-center justify-center">
                    <img
                      src="/images/career-sec1-profile.png"
                      alt="Student Profile Analysis Dashboard & Assessment Report"
                      className="w-full h-auto object-contain rounded-2xl"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 02: Narrowed Course Options (Alternating Layout: Image Left, Text Right) */}
            <div className="bg-white rounded-3xl border border-[#DCE7FA] p-6 sm:p-8 lg:p-10 shadow-[0_4px_20px_rgba(7,85,245,0.03)] hover:border-[#0755F5]/40 transition-colors">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Illustration */}
                <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center lg:justify-start">
                  <div className="w-full max-w-[380px] flex items-center justify-center">
                    <img
                      src="/images/career-sec2-courses.png"
                      alt="Narrowed Course Options, Top Universities & Course Details"
                      className="w-full h-auto object-contain rounded-2xl"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Right Text */}
                <div className="lg:col-span-7 order-1 lg:order-2 text-left space-y-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#EDF4FF] text-[#0755F5] font-black text-lg flex items-center justify-center border border-[#DCE7FA] shrink-0">
                    02
                  </div>
                  <h2 className="text-2xl sm:text-[26px] font-black text-[#101E49] tracking-tight">
                    Narrowed Course Options
                  </h2>
                  <p className="text-xs sm:text-[14px] text-[#63718E] leading-relaxed">
                    After analysing the student profile, our counsellors provide a list of narrowed course options suitable for the student. Detailed information on courses' duration, fees, curriculum, and career opportunities is shared. We also guide on the best institutions for each course and provide options from top destinations such as the United States, United Kingdom, Canada, Australia, New Zealand, Germany, and more. The course options are carefully selected based on the student's interests and financial situation, ensuring the best fit.
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 03: Dealing on Interested Destinations */}
            <div className="bg-white rounded-3xl border border-[#DCE7FA] p-6 sm:p-8 lg:p-10 shadow-[0_4px_20px_rgba(7,85,245,0.03)] hover:border-[#0755F5]/40 transition-colors">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Text */}
                <div className="lg:col-span-7 text-left space-y-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#EDF4FF] text-[#0755F5] font-black text-lg flex items-center justify-center border border-[#DCE7FA] shrink-0">
                    03
                  </div>
                  <h2 className="text-2xl sm:text-[26px] font-black text-[#101E49] tracking-tight">
                    Dealing on Interested Destinations
                  </h2>
                  <p className="text-xs sm:text-[14px] text-[#63718E] leading-relaxed">
                    Our free career counselling process also includes in-depth discussions about your preferred study destinations. We provide detailed guidance on lifestyle, academic qualification recognition, career opportunities, cost of living, safety, and cultural aspects. Our counsellors also advise on immigration laws, travel restrictions, and post-study work options, helping you make an informed decision and choose the right country for your academic journey.
                  </p>
                </div>

                {/* Right Illustration: Destination Map */}
                <div className="lg:col-span-5 flex justify-center lg:justify-end">
                  <div className="w-full max-w-[390px] flex items-center justify-center">
                    <img
                      src="/images/career-sec3-destinations.png"
                      alt="Interested Destinations Map with USA, UK, Canada, Australia, Germany, New Zealand"
                      className="w-full h-auto object-contain rounded-2xl"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 04: Join Us Now! (Pale-Blue Container with Signpost Illustration) */}
            <div className="bg-gradient-to-r from-[#EBF3FF] via-[#F1F6FF] to-[#EAF2FF] rounded-3xl border border-[#D5E4FA] p-6 sm:p-8 lg:p-10 shadow-[0_4px_20px_rgba(7,85,245,0.04)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Text + CTA Button */}
                <div className="lg:col-span-7 text-left space-y-4">
                  <div className="w-11 h-11 rounded-2xl bg-white text-[#0755F5] font-black text-lg flex items-center justify-center border border-[#DCE7FA] shadow-xs shrink-0">
                    04
                  </div>
                  <h2 className="text-2xl sm:text-[26px] font-black text-[#101E49] tracking-tight">
                    Join Us Now!
                  </h2>
                  <p className="text-xs sm:text-[14px] text-[#63718E] leading-relaxed max-w-xl">
                    Masters Visa's free career counselling program is comprehensive and highly personalized to suit individual student needs. From profile analysis to course shortlisting and destination guidance, we ensure you make the right decisions for your future. Our tailored approach has helped numerous students achieve their dreams of studying abroad with high success rates in placements. Start your career counselling journey with Masters Visa today!
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => onOpenCounselling('Career Counselling')}
                      className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-[#0755F5] hover:bg-[#0047D4] text-white text-sm sm:text-[14.5px] font-bold transition-all shadow-md shadow-[#0755F5]/25 hover:shadow-lg hover:shadow-[#0755F5]/35 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Get Free Assistance</span>
                      <ArrowRight className="w-4 h-4 ml-0.5" />
                    </button>
                  </div>
                </div>

                {/* Right Illustration: Direction Signpost */}
                <div className="lg:col-span-5 flex justify-center lg:justify-end">
                  <div className="w-full max-w-[380px] flex items-center justify-center">
                    <img
                      src="/images/career-sec4-join.png"
                      alt="Right Guidance, Better Career, Global Opportunities, Brighter Future Signpost"
                      className="w-full h-auto object-contain rounded-2xl"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  }

  // =========================================================================
  // Generic Placeholder View for other services (waiting for user data)
  // =========================================================================
  if (!service) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#EDF4FF] px-4 py-16">
        <div className="bg-white rounded-3xl border border-[#DCE7FA] p-10 text-center max-w-md shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-[#EDF4FF] text-[#0755F5] flex items-center justify-center mx-auto mb-4">
            <Layers className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#101E49] mb-2">Service Not Found</h2>
          <p className="text-sm text-[#63718E] mb-6">
            The requested service details could not be found or may have been relocated.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0755F5] hover:bg-[#0047D4] text-white font-bold rounded-xl text-sm transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EDF4FF] text-[#172344]">
      {/* 1. Header / Breadcrumbs */}
      <div className="bg-white border-b border-[#DCE7FA] py-8 sm:py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0755F5] hover:text-[#0047D4] mb-6 transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Services</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${service.badgeStyle.bg} ${service.badgeStyle.text} border ${service.badgeStyle.border}`}>
                  {service.badgeLabel}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#101E49] tracking-tight">
                {service.title}
              </h1>
              <p className="text-sm sm:text-base text-[#63718E] max-w-2xl mt-2 leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onSelectServiceById ? onSelectServiceById(service.id) : onOpenCounselling(service.title)}
                className="px-6 py-3 rounded-full bg-[#0755F5] hover:bg-[#0047D4] text-white text-sm font-bold transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book This Service</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Full Page Empty Cart Container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-white rounded-3xl border border-[#DCE7FA] shadow-xs p-8 sm:p-14 min-h-[460px] flex flex-col items-center justify-center text-center relative overflow-hidden">
          {service.illustration ? (
            <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center shrink-0 mb-6">
              <img
                src={service.illustration}
                alt={service.title}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-3xl bg-[#EDF4FF] flex items-center justify-center shrink-0 mb-6 shadow-xs">
              {renderFallbackIcon(service.iconFallback)}
            </div>
          )}

          <h2 className="text-2xl sm:text-3xl font-black text-[#101E49] mb-3">
            {service.title}
          </h2>

          <p className="text-sm sm:text-base text-[#63718E] max-w-lg mb-8 leading-relaxed">
            Detailed information, curriculum guidelines, eligibility criteria, and process breakdown for this service will be displayed here.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onSelectServiceById ? onSelectServiceById(service.id) : onOpenCounselling(service.title)}
              className="px-7 py-3 rounded-full bg-[#0755F5] hover:bg-[#0047D4] text-white text-sm font-bold transition-all shadow-sm hover:shadow-md cursor-pointer inline-flex items-center gap-2"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/services"
              className="px-7 py-3 rounded-full border border-[#DCE7FA] hover:border-[#0755F5] bg-white hover:bg-[#EDF4FF] text-[#101E49] hover:text-[#0755F5] text-sm font-bold transition-all shadow-xs cursor-pointer"
            >
              Back to Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
