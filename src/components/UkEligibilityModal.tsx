import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  RefreshCw,
  Compass,
  Clock,
  Briefcase,
  FileCheck2
} from 'lucide-react';

interface UkEligibilityModalProps {
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

export const UkEligibilityModal: React.FC<UkEligibilityModalProps> = ({
  isOpen,
  onClose,
  onProceedConsultation,
}) => {
  const [step, setStep] = useState<number>(1);
  const [program, setProgram] = useState<string>('Accelerated 1-Year Master’s (MSc / MA)');
  const [field, setField] = useState<string>('Data Science & Artificial Intelligence');
  const [intake, setIntake] = useState<string>('September / October 2026 (Major Autumn)');
  const [region, setRegion] = useState<string>('London & Greater South East');
  const [academicGrade, setAcademicGrade] = useState<string>('Upper Second 2:1 (60% – 69% in Bachelor’s)');
  const [englishStatus, setEnglishStatus] = useState<string>('CBSE / ICSE 12th English 70%+ (IELTS Waiver Eligible)');

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
      aria-labelledby="uk-modal-title"
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
                <span className="text-[10px] font-bold tracking-widest text-[#155EEF] uppercase">UK Admissions Compass</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-[#16A34A] font-semibold border border-emerald-200">Free Assessment</span>
              </div>
              <h2 id="uk-modal-title" className="text-lg sm:text-xl font-bold font-editorial text-[#14213D]">
                Check Your UK University Eligibility
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
              {step === 2 && 'Intake & UK Region'}
              {step === 3 && 'Academic Classification'}
              {step === 4 && 'English & IELTS Waivers'}
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
                  Select Your Intended UK Qualification
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { title: 'Accelerated 1-Year Master’s (MSc / MA)', desc: 'Fast-track degree saving 1 yr living & tuition', badge: 'Most Popular' },
                    { title: '3-Year Bachelor’s Degree (BSc / BA)', desc: 'Standard UK undergraduate honors track', badge: 'Undergraduate' },
                    { title: 'Master of Business Administration (MBA)', desc: '1-year executive with industry placement', badge: 'Leadership' },
                    { title: 'Pre-Master’s / Foundation Pathway', desc: 'Bridge programme with guaranteed progression', badge: 'Pathway' },
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
                  <option value="Data Science & Artificial Intelligence">Data Science & Artificial Intelligence</option>
                  <option value="Computer Science & Cyber Security">Computer Science & Cyber Security</option>
                  <option value="FinTech, Banking & Financial Economics">FinTech, Banking & Financial Economics</option>
                  <option value="International Business & Management (MSc/MBA)">International Business & Management (MSc/MBA)</option>
                  <option value="Advanced Mechanical & Aerospace Engineering">Advanced Mechanical & Aerospace Engineering</option>
                  <option value="Biomedical Science, Biotechnology & Public Health">Biomedical Science, Biotechnology & Public Health</option>
                  <option value="International Commercial Law (LLM)">International Commercial Law (LLM)</option>
                  <option value="Architecture & Sustainable Built Environment">Architecture & Sustainable Built Environment</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 2: Intake Preference & Target UK Region */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Target Admission Intake
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { title: 'September / October 2026 (Major Autumn)', desc: 'Maximum course variety & full scholarship availability' },
                    { title: 'January / February 2027 (Winter / Spring)', desc: 'Popular second wave with expedited visa turnaround' },
                    { title: 'May / June 2027 (Pre-Sessional / Summer)', desc: 'English language pathways & bridge terms' },
                    { title: 'Open to Either Intake', desc: 'Allow MasterVisa advisors to optimize for scholarships' },
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
                  Preferred UK Location / Region
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-900 focus:border-[#155EEF] focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="London & Greater South East">London & Greater South East (Imperial, UCL, LSE, King’s)</option>
                  <option value="Oxford & Cambridge (Oxbridge Triangle)">Oxford & Cambridge (Oxbridge Triangle)</option>
                  <option value="Midlands & Northern Powerhouse">Midlands & Northern Powerhouse (Manchester, Leeds, Birmingham, Sheffield)</option>
                  <option value="Scotland & Wales">Scotland & Wales (Edinburgh, Glasgow, Cardiff)</option>
                  <option value="All UK Regions (Open Recommendation)">All UK Regions (Open Recommendation based on ranking & ROI)</option>
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
                      label: 'First Class Honours (70%+ or 3.7+ / 4.0 GPA)',
                      desc: 'Eligible for direct admission to top Russell Group institutions (Oxford, Cambridge, Imperial, LSE, UCL) and competitive departmental merit scholarships.',
                      tag: 'Russell Group Direct',
                    },
                    {
                      label: 'Upper Second 2:1 (60% – 69% in Bachelor’s)',
                      desc: 'Meets primary academic requirements for 95%+ of top UK Master’s programmes across all Tier-1 research universities.',
                      tag: 'High Eligibility',
                    },
                    {
                      label: 'Lower Second 2:2 (55% – 59% in Bachelor’s)',
                      desc: 'Accepted by numerous prestigious UK institutions (e.g., Queen Mary, Coventry, Brunel, Hertfordshire, Nottingham Trent).',
                      tag: 'Extensive University Matches',
                    },
                    {
                      label: 'Pass / Third Class (50% – 54% in Bachelor’s)',
                      desc: 'Eligible for direct Pre-Master’s pathways with guaranteed matriculation into full Master’s degrees upon 1-semester completion.',
                      tag: 'Pre-Master’s Pathway',
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

          {/* STEP 4: English Language Status & Class 12th Waiver */}
          {step === 4 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  English Language Proficiency & Waiver Eligibility
                </label>
                <div className="space-y-2.5">
                  {[
                    {
                      label: 'CBSE / ICSE 12th English 70%+ (IELTS Waiver Eligible)',
                      desc: 'Most sought-after advantage: Over 60 UK universities accept 70% or higher in 12th grade English to waive IELTS/PTE completely!',
                      highlight: true,
                    },
                    {
                      label: 'IELTS Academic (Targeting 6.5+ overall, 6.0 in bands)',
                      desc: 'Universally accepted by 100% of UK universities for direct unconditional CAS issuance.',
                      highlight: false,
                    },
                    {
                      label: 'PTE Academic (Targeting 58 – 65+ Score)',
                      desc: 'Pearson PTE Academic accepted for UKVI student visa applications with swift 48-hour score delivery.',
                      highlight: false,
                    },
                    {
                      label: 'Medium of Instruction (MOI) Certificate',
                      desc: 'Select UK universities accept official institutional certificates verifying English-medium graduation.',
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
                            ★ Direct Waiver
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
                        High UK Admissions Eligibility Match
                      </h3>
                    </div>
                  </div>
                  <div className="text-center sm:text-right">
                    <div className="text-2xl font-black font-editorial text-[#155EEF]">96%</div>
                    <span className="text-[10px] font-semibold text-slate-500">Profile Match Index</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5">
                  <div className="p-3.5 rounded-2xl bg-white border border-[#E2E8F0] text-left">
                    <div className="text-[10px] font-bold uppercase text-slate-400">Post-Study Work</div>
                    <div className="text-sm font-bold text-[#14213D] mt-0.5 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#155EEF]" />
                      <span>2-Year Graduate Route</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">Unrestricted work permit upon graduation</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-[#E2E8F0] text-left">
                    <div className="text-[10px] font-bold uppercase text-slate-400">Degree Duration</div>
                    <div className="text-sm font-bold text-[#14213D] mt-0.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>1 Year Fast-Track</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">Saves 1 full year living & tuition fees</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-[#E2E8F0] text-left">
                    <div className="text-[10px] font-bold uppercase text-slate-400">Scholarships</div>
                    <div className="text-sm font-bold text-[#14213D] mt-0.5 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      <span>£2,000 – £8,000</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">Merit & early acceptance fee reductions</p>
                  </div>
                </div>

                {/* Profile Snapshot Summary */}
                <div className="mt-5 pt-4 border-t border-[#E2E8F0] text-xs text-slate-600 space-y-1.5 text-left">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-400">Selected Program:</span>
                    <span className="font-bold text-slate-800">{program}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-400">Target Field:</span>
                    <span className="font-bold text-slate-800">{field}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-400">Intake / Term:</span>
                    <span className="font-bold text-slate-800">{intake}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-400">Language Qualification:</span>
                    <span className="font-bold text-emerald-600">{englishStatus.split(' (')[0]}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-[#155EEF] flex items-start gap-3">
                <FileCheck2 className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="text-left">
                  <strong className="font-bold">Next Recommended Step:</strong> MasterVisa provides 1-on-1 university shortlisting, official CAS documentation support, Statement of Purpose (SOP) refinement, and UKVI student visa interview training.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Bar */}
        <div className="bg-[#F8FAFF] px-6 sm:px-8 py-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-3">
          {step > 1 && step < 5 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors"
            >
              Back
            </button>
          ) : step === 5 ? (
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Recalculate</span>
            </button>
          ) : (
            <div className="hidden sm:block text-xs text-slate-400">
              No login required • Free student assessment
            </div>
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#155EEF] hover:bg-[#104ECC] text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>{step === 4 ? 'Calculate Eligibility Match' : 'Continue'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#155EEF] hover:bg-[#104ECC] text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Book UK Consultation with this Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
