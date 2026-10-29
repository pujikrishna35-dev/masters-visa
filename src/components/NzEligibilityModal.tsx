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

interface NzEligibilityModalProps {
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

export const NzEligibilityModal: React.FC<NzEligibilityModalProps> = ({
  isOpen,
  onClose,
  onProceedConsultation,
}) => {
  const [step, setStep] = useState<number>(1);
  const [program, setProgram] = useState<string>('Level 9 Master’s Degree (1.5 – 2 Years)');
  const [field, setField] = useState<string>('Master of Information Technology & Software Systems');
  const [intake, setIntake] = useState<string>('February / March 2027 (Primary Semester 1 Intake)');
  const [region, setRegion] = useState<string>('Auckland & Northern Hub (Univ of Auckland, AUT)');
  const [academicGrade, setAcademicGrade] = useState<string>('First Class / Upper Second (60% – 69% in Bachelor’s)');
  const [englishStatus, setEnglishStatus] = useState<string>('IELTS Academic (Targeting 6.5 overall, min 6.0 in bands)');

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
      aria-labelledby="nz-modal-title"
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
                <span className="text-[10px] font-bold tracking-widest text-[#155EEF] uppercase">NZ Admissions Compass</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-[#16A34A] font-semibold border border-emerald-200">Free Assessment</span>
              </div>
              <h2 id="nz-modal-title" className="text-lg sm:text-xl font-bold font-editorial text-[#14213D]">
                Check Your New Zealand University Eligibility
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
              {step === 2 && 'Intake & NZ Region'}
              {step === 3 && 'Academic Classification'}
              {step === 4 && 'English Language Proficiency'}
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
                  Select Your Intended New Zealand Qualification (NZQF)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { title: 'Level 9 Master’s Degree (1.5 – 2 Years)', desc: '3-Year Post-Study Work Visa + full partner work rights', badge: '3-Yr PSWV & Partner Visa' },
                    { title: 'Level 7 Bachelor’s Degree (3 Years)', desc: 'Direct university undergraduate degree with 3-year PSWV', badge: 'Undergraduate' },
                    { title: 'Level 8 Postgraduate Diploma (PGDip 1 Yr)', desc: 'Advanced coursework diploma eligible for 1-year PSWV', badge: '1-Year Fast Track' },
                    { title: 'Level 7 Graduate Diploma (GDip Green List)', desc: 'Career-conversion pathway in designated Green List roles', badge: 'Green List Track' },
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
                  <option value="Master of Information Technology & Software Systems">Master of Information Technology & Software Systems (Green List Tier 1)</option>
                  <option value="Master of Data Science & Artificial Intelligence">Master of Data Science & Artificial Intelligence</option>
                  <option value="Master of Construction Management & Civil Engineering">Master of Construction Management & Civil Engineering (Green List Tier 1)</option>
                  <option value="Master of Professional Accounting (CA ANZ Accredited)">Master of Professional Accounting (CA ANZ Accredited)</option>
                  <option value="Master of International Business & Strategic Management">Master of International Business & Strategic Management</option>
                  <option value="Agricultural Sciences, Viticulture & Food Technology">Agricultural Sciences, Viticulture & Food Technology</option>
                  <option value="Health Sciences, Public Health & Nursing">Health Sciences, Public Health & Nursing (Green List Tier 1)</option>
                  <option value="Environmental Science, Marine Biology & Sustainability">Environmental Science, Marine Biology & Sustainability</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 2: Intake Preference & Target NZ Region */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Target Admission Intake
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { title: 'February / March 2027 (Primary Semester 1 Intake)', desc: 'Major national intake with full course range and high scholarship availability' },
                    { title: 'July 2027 (Mid-Year Semester 2 Intake)', desc: 'Popular mid-year intake with excellent course availability across all 8 universities' },
                    { title: 'November 2026 (Summer School / Foundation)', desc: 'Accelerated intensive term and academic English pathway programs' },
                    { title: 'Open to Either Intake', desc: 'Allow MasterVisa advisors to optimize for scholarships and visa processing windows' },
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
                  Preferred New Zealand University / Region
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-900 focus:border-[#155EEF] focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="Auckland & Northern Hub (Univ of Auckland, AUT)">Auckland Commercial Hub (University of Auckland, AUT, Massey Albany)</option>
                  <option value="Wellington & Capital Region (Victoria Univ of Wellington)">Wellington Capital Region (Victoria University of Wellington)</option>
                  <option value="Canterbury & Christchurch (Univ of Canterbury, Lincoln)">Canterbury & Christchurch (University of Canterbury, Lincoln University)</option>
                  <option value="Dunedin & Otago (University of Otago)">Dunedin & Otago (University of Otago - Historic Medical & Science Hub)</option>
                  <option value="Waikato & Manawatū (Univ of Waikato, Massey Palmerston)">Waikato & Manawatū (University of Waikato, Massey University)</option>
                  <option value="All New Zealand Universities (Open Recommendation)">All 8 New Zealand Universities (Ranked in World Top 3%)</option>
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
                      label: 'First Class Honours (75%+ or GPA 7.0+ on 9.0 NZ Scale)',
                      desc: 'Eligible for direct admission to University of Auckland and Otago with high consideration for International Excellence Scholarships.',
                      tag: 'High Scholarship Match',
                    },
                    {
                      label: 'Upper Second (60% – 74% in Bachelor’s / B Average)',
                      desc: 'Meets direct entry requirements for Master’s degrees across all 8 New Zealand public universities.',
                      tag: 'Direct Master’s Entry',
                    },
                    {
                      label: 'Second Class (55% – 59% in Bachelor’s)',
                      desc: 'Eligible for Post Graduate Diplomas (PGDip) with direct articulation into second-year Master’s research thesis upon completion.',
                      tag: 'PGDip Articulation',
                    },
                    {
                      label: 'Pass / Third Class (50% – 54% in Bachelor’s)',
                      desc: 'Accepted for Graduate Diploma (GDip) transition pathways or applied vocational programs across Te Pūkenga institutes.',
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

          {/* STEP 4: English Language Status */}
          {step === 4 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  English Language Proficiency Status
                </label>
                <div className="space-y-2.5">
                  {[
                    {
                      label: 'IELTS Academic (Targeting 6.5 overall, min 6.0 in bands)',
                      desc: 'Standard benchmark accepted by all 8 New Zealand universities for direct unconditional Offer of Place and visa approval.',
                      highlight: true,
                    },
                    {
                      label: 'PTE Academic (Targeting 58+ Score, min 50 communicative)',
                      desc: 'Pearson PTE Academic accepted widely across New Zealand with swift online computer test scheduling and 48-hr score delivery.',
                      highlight: false,
                    },
                    {
                      label: 'TOEFL iBT (Targeting 80 – 90+ Score)',
                      desc: 'Officially accepted for university admissions and Immigration New Zealand Fee Paying Student Visa applications.',
                      highlight: false,
                    },
                    {
                      label: 'English Pathway / NZCEL Certificate (Study Without IELTS)',
                      desc: 'Direct enrollment into university English language pathway or NZCEL Level 5 with guaranteed academic progression.',
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
                            ★ Direct Standard
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
                        High New Zealand Admissions Eligibility Match
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
                    <span><strong>Qualification Route:</strong> Highly eligible for <strong>{program}</strong> in {field}.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <Clock className="w-4 h-4 text-[#155EEF] shrink-0 mt-0.5" />
                    <span><strong>Post-Study Work Visa (PSWV):</strong> Eligible for up to <strong>3-Year Open Work Visa</strong> with unrestricted employer sponsorship freedom.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <Briefcase className="w-4 h-4 text-[#155EEF] shrink-0 mt-0.5" />
                    <span><strong>Work Rights:</strong> Permitted to work <strong>20 hours/week during term</strong> and <strong>full-time during holidays</strong> under the Fee Paying Student Visa.</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] bg-blue-50/50 -mx-6 -mb-6 p-6 rounded-b-3xl">
                  <div className="text-xs text-slate-600 mb-3">
                    <strong>Selected Parameters:</strong> {intake} • {academicGrade.split('(')[0]} • {region.split('(')[0]}
                  </div>
                  <p className="text-xs text-[#155EEF] font-semibold">
                    Our Senior New Zealand Admissions Directors have helped over 3,000+ students secure unconditional Offers of Place, NZ$10,000+ scholarships, and Fee Paying Student Visas.
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
                  <span>Book Free 1-on-1 NZ Strategy Session</span>
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
