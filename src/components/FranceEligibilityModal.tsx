import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  RefreshCw,
  Compass,
  Clock,
  Briefcase
} from 'lucide-react';

interface FranceEligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedConsultation?: (profileData?: {
    program: string;
    intake: string;
    academicGrade: string;
    field: string;
    englishStatus: string;
    region: string;
    scoreSummary: string;
  }) => void;
}

export const FranceEligibilityModal: React.FC<FranceEligibilityModalProps> = ({
  isOpen,
  onClose,
  onProceedConsultation,
}) => {
  const [step, setStep] = useState<number>(1);
  const [program, setProgram] = useState<string>('Master in Management / MSc (Grande École / University)');
  const [field, setField] = useState<string>('International Business & Luxury Brand Management');
  const [intake, setIntake] = useState<string>('September / October 2026 (Major Autumn Intake)');
  const [region, setRegion] = useState<string>('Île-de-France (Paris & Greater Capital Region)');
  const [academicGrade, setAcademicGrade] = useState<string>('Upper Second / First Class (60% – 69% in Bachelor’s)');
  const [englishStatus, setEnglishStatus] = useState<string>('100% English-Taught Track (IELTS 6.5 / TOEFL 85+)');

  // Close on Escape key & prevent body scrolling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
  };

  const handleFinish = () => {
    if (onProceedConsultation) {
      onProceedConsultation({
        program,
        field,
        intake,
        region,
        academicGrade,
        englishStatus,
        scoreSummary: `${program} | ${field} | ${intake} | ${academicGrade} | ${englishStatus}`,
      });
    }
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/75 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="france-modal-title"
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#F5F8FF] px-6 sm:px-8 py-5 text-[#14213D] flex items-center justify-between border-b border-[#E2E8F0] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#155EEF]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EAF2FF] border border-[#B9D5FF] flex items-center justify-center text-[#155EEF]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest text-[#155EEF] uppercase">France Admissions Compass</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-[#16A34A] font-semibold border border-emerald-200">Free Assessment</span>
              </div>
              <h2 id="france-modal-title" className="text-lg sm:text-xl font-bold font-editorial text-[#14213D]">
                Check Your French University Eligibility
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors border border-slate-200"
            aria-label="Close eligibility modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Tracker */}
        <div className="bg-[#F8FAFF] px-6 sm:px-8 py-3 border-b border-[#E2E8F0] flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <span
                key={s}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                  step === s
                    ? 'bg-[#155EEF] text-white shadow-sm ring-2 ring-blue-500/20'
                    : step > s
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {step > s ? '✓' : s}
              </span>
            ))}
            <span className="ml-2 text-slate-600 font-medium">
              {step === 1 && 'Degree Level & Field'}
              {step === 2 && 'Intake & French Region'}
              {step === 3 && 'Academic Classification'}
              {step === 4 && 'English & Language Track'}
              {step === 5 && 'Eligibility Assessment'}
            </span>
          </div>
          <span className="text-slate-400 font-mono text-[11px]">Step {step} of 5</span>
        </div>

        {/* Modal Form Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* STEP 1: Degree Level & Academic Field */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Select Your Intended French Qualification
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { title: 'Master in Management / MSc (Grande École / University)', desc: '1 – 2 year Master’s with 2-year post-study APS/RECE residence permit', badge: '2-Yr Stay-Back' },
                    { title: '3-Year Licence Degree (Bachelor’s)', desc: 'European Bologna LMD 180 ECTS undergraduate framework', badge: 'Undergraduate' },
                    { title: 'Global MBA & Executive Management', desc: 'World Top 5 ranked FT business schools (HEC, INSEAD, ESSEC)', badge: 'Leadership' },
                    { title: 'Specialized Mastère Spécialisé / Pre-Master’s', desc: 'Industry-accredited CGE postgraduate pathway with internships', badge: 'Specialized' },
                  ].map((item) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setProgram(item.title)}
                      className={`p-4 rounded-2xl text-left border transition-all ${
                        program === item.title
                          ? 'border-[#155EEF] bg-[#F5F8FF] ring-2 ring-blue-500/10 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900">{item.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-[#155EEF] font-bold">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Primary Study Domain
                </label>
                <select
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-900 focus:border-[#155EEF] focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="International Business & Luxury Brand Management">International Business & Luxury Brand Management (HEC, ESSEC, EDHEC)</option>
                  <option value="Data Science, Artificial Intelligence & Quantum Tech">Data Science, Artificial Intelligence & Quantum Tech (Polytechnique, Sorbonne)</option>
                  <option value="Aerospace, Mechanical & Automotive Engineering">Aerospace, Mechanical & Automotive Engineering (Toulouse & Paris Tech)</option>
                  <option value="Public Policy, International Relations & Law">Public Policy, International Relations & Law (Sciences Po)</option>
                  <option value="Fashion Design, Haute Couture & Creative Arts">Fashion Design, Haute Couture & Creative Arts (IFM Paris)</option>
                  <option value="Culinary Arts, Gastronomy & Hospitality Management">Culinary Arts, Gastronomy & Hospitality Management (Le Cordon Bleu, Ferrandi)</option>
                  <option value="Biomedical Science, Pharmacology & Public Health">Biomedical Science, Pharmacology & Public Health (Sorbonne, Paris Cité)</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 2: Intake Preference & Target French Region */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Target Admission Intake
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { title: 'September / October 2026 (Major Autumn Intake)', desc: 'Primary intake across all public universities, Grandes Écoles, and Eiffel scholarships' },
                    { title: 'January / February 2027 (Spring Wave)', desc: 'Available for selected Master in Management and English-taught business programs' },
                    { title: 'Pre-Sessional French / Foundation Pathway', desc: 'Summer language and preparatory bridge for university matriculation' },
                    { title: 'Open to Either Intake', desc: 'Allow MasterVisa advisors to optimize for Études en France deadlines and visa slots' },
                  ].map((item) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setIntake(item.title)}
                      className={`p-4 rounded-2xl text-left border transition-all ${
                        intake === item.title
                          ? 'border-[#155EEF] bg-[#F5F8FF] ring-2 ring-blue-500/10 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900 mb-1">{item.title}</div>
                      <p className="text-[11px] text-slate-500">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Preferred French City / Region
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-900 focus:border-[#155EEF] focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="Île-de-France (Paris & Greater Capital Region)">Île-de-France (Paris & Greater Capital Region — Sorbonne, HEC, Sciences Po, Polytechnique)</option>
                  <option value="Auvergne-Rhône-Alpes (Lyon & Grenoble Tech Hub)">Auvergne-Rhône-Alpes (Lyon & Grenoble Tech & Biotech Innovation Hub)</option>
                  <option value="Occitanie (Toulouse Aerospace Hub)">Occitanie (Toulouse European Aerospace & Aviation Capital)</option>
                  <option value="Nouvelle-Aquitaine (Bordeaux Creative & Wine Region)">Nouvelle-Aquitaine (Bordeaux Creative & Sustainable Tech Region)</option>
                  <option value="Provence-Alpes-Côte d'Azur (Marseille / Nice Sophia Antipolis)">Provence-Alpes-Côte d'Azur (Marseille & Sophia Antipolis Tech Park)</option>
                  <option value="All French Regions (Open Recommendation)">All French Regions (Open Recommendation based on ranking & ROI)</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 3: Academic Qualifications & Bachelor's Classification */}
          {step === 3 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Undergraduate Academic Grade / GPA Classification
                </label>
                <div className="space-y-2.5">
                  {[
                    {
                      label: 'First Class / Mention Très Bien (70%+ or 3.7+ / 4.0 GPA)',
                      desc: 'Eligible for direct admission to elite Grandes Écoles (HEC Paris, École Polytechnique, Sciences Po) and competitive Eiffel Excellence scholarships.',
                      tag: 'Grandes Écoles Direct',
                    },
                    {
                      label: 'Upper Second / Mention Bien (60% – 69% in Bachelor’s)',
                      desc: 'Meets direct academic requirements for 95%+ of French Master’s degrees across public universities and top triple-accredited business schools.',
                      tag: 'High Eligibility',
                    },
                    {
                      label: 'Second Class (55% – 59% in Bachelor’s)',
                      desc: 'Eligible for numerous high-ranking English-taught Master’s programs (e.g., Skema, Kedge, Audencia, Montpellier).',
                      tag: 'Extensive University Matches',
                    },
                    {
                      label: 'Pass / 50% – 54% in Bachelor’s',
                      desc: 'Accepted for specialized graduate diplomas, pre-Master’s bridge semesters, or vocational management certificates.',
                      tag: 'Pathway Eligible',
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      onClick={() => setAcademicGrade(item.label)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        academicGrade === item.label
                          ? 'border-[#155EEF] bg-[#F5F8FF] ring-2 ring-blue-500/10 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900">{item.label}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-[#16A34A] border border-emerald-200 font-bold">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: English Language Track & French Status */}
          {step === 4 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Language Proficiency & Instructional Track
                </label>
                <div className="space-y-2.5">
                  {[
                    {
                      label: '100% English-Taught Track (IELTS 6.5 / TOEFL 85+)',
                      desc: 'Over 1,500 Master’s programs in France are taught entirely in English. Zero French language prerequisite required for admission or visa!',
                      highlight: true,
                    },
                    {
                      label: 'Medium of Instruction (MOI) Certificate',
                      desc: 'Numerous top French business schools and universities accept official MOI letters certifying an English-taught Bachelor’s degree.',
                      highlight: false,
                    },
                    {
                      label: 'PTE Academic (Targeting 58 – 65+ Score)',
                      desc: 'Accepted widely by French business schools and universities with fast computer scheduling and results.',
                      highlight: false,
                    },
                    {
                      label: 'French-Taught Track (DELF B2 / DALF C1 / TCF)',
                      desc: 'For students intending to study in French at public universities with nominal standard tuition fees (€243/year).',
                      highlight: false,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      onClick={() => setEnglishStatus(item.label)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        englishStatus === item.label
                          ? 'border-[#155EEF] bg-[#F5F8FF] ring-2 ring-blue-500/10 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900">{item.label}</span>
                        {item.highlight && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-[#16A34A] font-bold border border-emerald-200">
                            ★ 100% English Track
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Calculated Assessment Results */}
          {step === 5 && (
            <div className="space-y-6 animate-fade-in text-center sm:text-left">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#F5F8FF] to-white border-2 border-[#155EEF]/20 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-5 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#16A34A]">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                        Assessment Result
                      </span>
                      <h3 className="text-xl font-bold font-editorial text-[#14213D]">
                        High France Admissions Eligibility Match
                      </h3>
                    </div>
                  </div>
                  <div className="text-center sm:text-right">
                    <div className="text-2xl font-black font-editorial text-[#155EEF]">96%</div>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">Profile Compatibility</span>
                  </div>
                </div>

                <div className="py-4 space-y-3">
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <Award className="w-4 h-4 text-[#155EEF] shrink-0 mt-0.5" />
                    <span><strong>Qualification Route:</strong> Eligible for <strong>{program}</strong> in {field}.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <Clock className="w-4 h-4 text-[#155EEF] shrink-0 mt-0.5" />
                    <span><strong>Post-Study Residence (APS/RECE):</strong> Eligible for <strong>2-Year Post-Study Stay-Back Permit</strong> for Master’s graduates with direct path to European Blue Card.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <Briefcase className="w-4 h-4 text-[#155EEF] shrink-0 mt-0.5" />
                    <span><strong>Work Rights & Subsidies:</strong> Permitted to work <strong>up to 964 hours per year</strong> under the Long-Stay Student Visa (VLS-TS) + eligible for <strong>CAF monthly housing allowance</strong>.</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] bg-blue-50/50 -mx-6 -mb-6 p-6 rounded-b-3xl">
                  <div className="text-xs text-slate-600 mb-3">
                    <strong>Selected Parameters:</strong> {intake} • {academicGrade.split('(')[0]} • {region.split('(')[0]}
                  </div>
                  <p className="text-xs text-[#155EEF] font-semibold">
                    Our Senior French Admissions Specialists have helped over 2,500+ students secure unconditional Grand École admits, Eiffel Excellence scholarships, and VLS-TS student visas.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Start New Assessment</span>
                </button>

                <button
                  type="button"
                  onClick={handleFinish}
                  className="w-full sm:flex-1 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#155EEF] to-[#0040C1] hover:opacity-95 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Book Free 1-on-1 France Strategy Session</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {step < 5 && (
          <div className="bg-[#F8FAFF] px-6 sm:px-8 py-4 border-t border-[#E2E8F0] flex items-center justify-between">
            <button
              type="button"
              disabled={step === 1}
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                step === 1 
                  ? 'text-slate-300 cursor-not-allowed' 
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              Previous Step
            </button>

            <button
              type="button"
              onClick={() => setStep((s) => Math.min(5, s + 1))}
              className="px-6 py-2.5 rounded-xl bg-[#155EEF] hover:bg-[#0040C1] text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>{step === 4 ? 'Calculate Eligibility' : 'Continue'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
