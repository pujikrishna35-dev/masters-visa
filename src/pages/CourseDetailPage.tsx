import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
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
  BookOpen,
  FileText,
  Users,
  Compass,
  Layers,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import {
  COURSE_CATEGORIES,
  COURSE_DISCLAIMERS,
  STUDY_LEVELS,
  type CourseCategory
} from '../data/coursesData';

interface CourseDetailPageProps {
  onOpenCounselling: (serviceOrCourse?: string) => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ onOpenCounselling }) => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [categoryId]);

  const category = COURSE_CATEGORIES.find(
    (c) => c.id.toLowerCase() === categoryId?.toLowerCase()
  );

  // If category not found, provide a clean fallback
  if (!category) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#EDF4FF] px-4 py-16">
        <div className="bg-white rounded-3xl border border-[#DCE7FA] p-10 text-center max-w-md shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-[#EDF4FF] text-[#0755F5] flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#101E49] mb-2">Subject Area Not Found</h2>
          <p className="text-sm text-[#63718E] mb-6">
            The course category you are looking for does not exist or has been relocated.
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0755F5] hover:bg-[#0047D4] text-white font-bold rounded-xl text-sm transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Courses
          </Link>
        </div>
      </div>
    );
  }

  // Icon Resolver
  const renderIcon = (iconName: CourseCategory['iconName'], className = 'w-7 h-7') => {
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

  // Other categories for quick recommendations at the bottom
  const otherCategories = COURSE_CATEGORIES.filter((c) => c.id !== category.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#EDF4FF]">
      
      {/* =========================================================================
          HERO / HEADER SECTION FOR DEDICATED COURSE PAGE
      ========================================================================= */}
      <section className="relative pt-8 sm:pt-12 pb-12 sm:pb-16 border-b border-[#DCE7FA] bg-gradient-to-b from-[#EDF4FF] via-[#EDF4FF]/60 to-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#63718E] mb-6">
            <Link to="/" className="hover:text-[#0755F5] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/courses" className="hover:text-[#0755F5] transition-colors font-medium">Courses</Link>
            <span>/</span>
            <span className="text-[#101E49] font-bold truncate">{category.title}</span>
          </div>

          {/* Back button */}
          <button
            type="button"
            onClick={() => navigate('/courses')}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0755F5] hover:text-[#0047D4] transition-colors cursor-pointer group mb-6"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to All Courses
          </button>

          {/* Category Hero Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-[#0755F5] text-white flex items-center justify-center shadow-lg shadow-[#0755F5]/25 shrink-0">
                  {renderIcon(category.iconName, 'w-8 h-8')}
                </div>
                <div>
                  <span className="text-[11.5px] font-extrabold uppercase tracking-[0.2em] text-[#0755F5]">
                    Study Field Overview
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101E49] tracking-tight leading-tight mt-0.5">
                    {category.title}
                  </h1>
                </div>
              </div>

              <p className="text-base sm:text-lg text-[#63718E] leading-relaxed max-w-2xl mt-4">
                {category.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-6">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EDF4FF] text-[#0755F5] text-xs font-bold border border-[#DCE7FA]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Recognised Global Pathways
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#101E49] text-xs font-semibold border border-[#DCE7FA] shadow-sm">
                  {category.examples.length} Specialisations Documented
                </span>
              </div>
            </div>

            {/* Quick Action Card in Hero */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-[#DCE7FA] p-6 shadow-md shadow-[#0755F5]/5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                Free Guidance Session
              </span>
              <h2 className="text-lg font-bold text-[#101E49] leading-snug mb-2">
                Plan Your {category.title} Journey
              </h2>
              <p className="text-xs text-[#63718E] leading-relaxed mb-5">
                Our counsellors assess your profile, test scores and career goals to shortlist optimal universities and admission pathways.
              </p>
              <button
                type="button"
                onClick={() => onOpenCounselling()}
                className="w-full py-3.5 px-5 bg-[#0755F5] hover:bg-[#0047D4] text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-[#0755F5]/20 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Book Course Counselling</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          DETAILED CONTENT SECTION
      ========================================================================= */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Left Content (8 Cols) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Specialisations Box */}
              <div className="bg-white rounded-3xl border border-[#DCE7FA] p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#0755F5]">
                    CURATED SUBJECTS
                  </span>
                  <span className="w-7 h-[2px] bg-[#0755F5] rounded-full inline-block" />
                </div>
                <h2 className="text-2xl font-extrabold text-[#101E49] mb-2">
                  Popular Specialisations & Subject Examples
                </h2>
                <p className="text-sm text-[#63718E] mb-6">
                  Key areas of study and high-demand specialisations outlined in our international education syllabus:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {category.examples.map((example, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-2xl bg-[#F8FBFF] border border-[#DCE7FA]/80 hover:border-[#0755F5]/40 transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#0755F5] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-[#101E49] leading-snug">{example}</h4>
                        <span className="text-[11.5px] text-[#63718E] mt-0.5 block">
                          Degree, diploma and pathway options available
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regulatory Notice (If Applicable) */}
              {category.isRegulated && (
                <div className="p-6 rounded-3xl bg-amber-50/80 border border-amber-200/90 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-amber-900">
                      Professional Recognition & Licensing Requirements
                    </h3>
                    <p className="text-sm text-amber-900/90 mt-1 leading-relaxed">
                      {category.regulatedNote || COURSE_DISCLAIMERS.regulatedProfessions}
                    </p>
                    <p className="text-xs text-amber-800/80 mt-2 font-medium">
                      Our counsellors assist students in checking professional accreditation bodies in target destinations before application.
                    </p>
                  </div>
                </div>
              )}

              {/* Choosing Your Programme & Counselling Considerations (from DOCX) */}
              <div className="bg-white rounded-3xl border border-[#DCE7FA] p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#0755F5]">
                    HOW WE EVALUATE
                  </span>
                  <span className="w-7 h-[2px] bg-[#0755F5] rounded-full inline-block" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#101E49] mb-3">
                  Choosing Your Ideal Programme
                </h3>
                <p className="text-sm text-[#63718E] leading-relaxed mb-6">
                  {COURSE_DISCLAIMERS.counsellingFocus}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#101E49] mb-1">
                      1. Academic & Entry Requirements
                    </h4>
                    <p className="text-xs text-[#63718E] leading-relaxed">
                      Evaluating minimum GPA, prerequisites, standardized test scores (GRE/GMAT) and language proficiency (IELTS/TOEFL).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#101E49] mb-1">
                      2. Tuition Fees & Funding
                    </h4>
                    <p className="text-xs text-[#63718E] leading-relaxed">
                      Assessing program investment, living expenses, merit scholarships and education loan options.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#101E49] mb-1">
                      3. Curriculum & Language
                    </h4>
                    <p className="text-xs text-[#63718E] leading-relaxed">
                      Confirming English-taught tracks, hands-on lab access, internship credits and faculty specialization.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#101E49] mb-1">
                      4. Post-Graduation Career Plans
                    </h4>
                    <p className="text-xs text-[#63718E] leading-relaxed">
                      Aligning study programmes with post-study work visas (OPT, Graduate Route, PGWP) and industry employability.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Sidebar (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Study Levels Tier Card */}
              <div className="bg-white rounded-3xl border border-[#DCE7FA] p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="w-5 h-5 text-[#0755F5]" />
                  <h3 className="text-base font-bold text-[#101E49]">
                    Available Study Levels
                  </h3>
                </div>
                <p className="text-xs text-[#63718E] leading-relaxed mb-4">
                  Degrees and credentials offered in this discipline across partner institutions:
                </p>

                <div className="space-y-2.5">
                  {STUDY_LEVELS.filter(l => l.id !== 'all').map((level) => (
                    <div
                      key={level.id}
                      className="p-3 rounded-xl bg-slate-50/80 border border-slate-100"
                    >
                      <h4 className="text-xs font-bold text-[#101E49]">{level.label}</h4>
                      {level.description && (
                        <p className="text-[11px] text-[#63718E] mt-0.5 leading-snug">
                          {level.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Admissions Advisory Note */}
              <div className="bg-[#EDF4FF]/50 rounded-3xl border border-[#DCE7FA] p-6">
                <div className="flex items-center gap-2 mb-2">
                  <HelpCircle className="w-4 h-4 text-[#0755F5]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#101E49]">
                    Admissions Advisory
                  </h4>
                </div>
                <p className="text-xs text-[#63718E] leading-relaxed">
                  {COURSE_DISCLAIMERS.availability} {COURSE_DISCLAIMERS.destinationsNote}
                </p>
                <div className="pt-4 mt-4 border-t border-[#DCE7FA]/80">
                  <button
                    type="button"
                    onClick={() => onOpenCounselling()}
                    className="w-full py-3 bg-[#0755F5] hover:bg-[#0047D4] text-white font-bold rounded-xl text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Check Your Eligibility</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* =========================================================================
              EXPLORE OTHER SUBJECT AREAS
          ========================================================================= */}
          <div className="mt-14 pt-10 border-t border-[#DCE7FA]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-[#101E49]">
                  Explore Other Study Areas
                </h3>
                <p className="text-xs text-[#63718E] mt-0.5">
                  Discover opportunities in alternative fields and faculties.
                </p>
              </div>
              <Link
                to="/courses"
                className="text-xs font-bold text-[#0755F5] hover:underline flex items-center gap-1"
              >
                <span>View All 11 Subjects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherCategories.map((other) => (
                <Link
                  key={other.id}
                  to={`/courses/${other.id}`}
                  className="bg-white rounded-2xl border border-[#DCE7FA] p-5 hover:border-[#0755F5]/40 hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#0755F5] text-white flex items-center justify-center shadow-sm mb-3 group-hover:scale-105 transition-transform">
                      {renderIcon(other.iconName, 'w-5 h-5')}
                    </div>
                    <h4 className="text-sm font-bold text-[#101E49] group-hover:text-[#0755F5] transition-colors leading-snug mb-1">
                      {other.title}
                    </h4>
                    <p className="text-xs text-[#63718E] line-clamp-2 leading-relaxed">
                      {other.shortDescription}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#0755F5] font-semibold">
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* =========================================================================
              BOTTOM COUNSELLING CTA BANNER
          ========================================================================= */}
          <div className="mt-12 sm:mt-16 bg-[#EBF2FE] rounded-2xl sm:rounded-3xl border border-[#D6E4FC] p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
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

        </div>
      </section>

    </div>
  );
};

export default CourseDetailPage;

