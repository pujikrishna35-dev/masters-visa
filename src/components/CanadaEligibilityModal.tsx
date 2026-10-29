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
  FileCheck2,
  DollarSign
} from 'lucide-react';

interface CanadaEligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedConsultation?: (profileData?: {
    program: string;
    field: string;
    intake: string;
    province: string;
    academicGrade: string;
    englishStatus: string;
    scoreSummary: string;
  }) => void;
}

export const CanadaEligibilityModal: React.FC<CanadaEligibilityModalProps> = ({
  isOpen,
  onClose,
  onProceedConsultation,
}) => {
  const [step, setStep] = useState<number>(1);
  const [program, setProgram] = useState<string>('Master’s Degree (MSc / MEng / MA)');
  const [field, setField] = useState<string>('Computer Science, AI & Data Engineering');
  const [intake, setIntake] = useState<string>('Fall 2026 (September - Primary Intake)');
  const [province, setProvince] = useState<string>('Ontario (Toronto & Tech Corridor)');
  const [academicGrade, setAcademicGrade] = useState<string>('High Second Class (65% – 74% or 3.0 – 3.5 GPA)');
  const [englishStatus, setEnglishStatus] = useState<string>('IELTS Academic (Targeting 6.5+ overall, 6.0 bands)');

  // Close on Escape key & lock body scroll
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
        province,
        academicGrade,
        englishStatus,
        scoreSummary: `${program} | ${field} | ${intake} | ${province} | ${academicGrade} | ${englishStatus}`,
      });
    }
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/75 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="canada-modal-title"
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#F5F8FF] px-6 sm:px-8 py-5 text-[#14213D] flex items-center justify-between border-b border-[#E2E8F0] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E63946]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-[#E63946]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest text-[#E63946] uppercase">Canada Admissions Compass</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-[#16A34A] font-semibold border border-emerald-200">Free Assessment</span>
              </div>
              <h2 id="canada-modal-title" className="text-lg sm:text-xl font-bold font-editorial text-[#14213D]">
                Check Your Canadian University Eligibility
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
              {step === 1 && 'Degree & Academic Domain'}
              {step === 2 && 'Intake & Province'}
              {step === 3 && 'Academic Qualifications'}
              {step === 4 && 'Language & IRCC Funds'}
              {step === 5 && 'Eligibility Assessment'}
            </span>
          </div>
          <span className="text-slate-400 font-mono text-[11px]">Step {step} of 5</span>
        </div>

        {/* Modal Form Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* STEP 1: Degree Level & Domain */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Select Your Target Canadian Credential
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { title: 'Master’s Degree (MSc / MEng / MA)', desc: '1–2 Years • Full 3-Year PGWP eligible', badge: 'High ROI' },
                    { title: 'Post-Graduate Diploma (PG Diploma)', desc: '1 or 2 Years with integrated paid Co-op', badge: 'Co-op Focus' },
                    { title: '4-Year Bachelor’s Degree (BSc / BEng)', desc: 'Direct university entry for 12th standard graduates', badge: 'Undergraduate' },
                    { title: 'MBA & Executive Management', desc: 'Accelerated business leadership with networking', badge: 'Leadership' },
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
                  Primary Academic Field
                </label>
                <select
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-900 focus:border-[#155EEF] focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="Computer Science, AI & Data Engineering">Computer Science, AI & Data Engineering</option>
                  <option value="Business Analytics, FinTech & Supply Chain">Business Analytics, FinTech & Supply Chain</option>
                  <option value="Mechanical, Aerospace & Robotics Engineering">Mechanical, Aerospace & Robotics Engineering</option>
                  <option value="Electrical, Computer & Telecommunications Engineering">Electrical, Computer & Telecommunications Engineering</option>
                  <option value="Biomedical Science, Public Health & Nursing">Biomedical Science, Public Health & Nursing</option>
                  <option value="Civil, Environmental & Sustainable Construction">Civil, Environmental & Sustainable Construction</option>
                  <option value="International Business Administration (MBA)">International Business Administration (MBA)</option>
                  <option value="Interactive Media, UX & Creative Technology">Interactive Media, UX & Creative Technology</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 2: Intake & Target Province */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Admission Intake
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { title: 'Fall 2026 (September - Primary Intake)', desc: '100% course availability & maximum university entrance scholarships' },
                    { title: 'Winter 2027 (January - Secondary Intake)', desc: 'High availability for STEM and business programs with quick turnaround' },
                    { title: 'Spring / Summer 2027 (May Intake)', desc: 'Accelerated modules, language pathways & selective diploma entries' },
                    { title: 'Open to Either Intake', desc: 'Optimize my profile for faster PAL and visa allocation' },
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
                  Target Canadian Province / Territory
                </label>
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-900 focus:border-[#155EEF] focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="Ontario (Toronto & Tech Corridor)">Ontario (Toronto, Waterloo, Ottawa - Tech & Finance Hub)</option>
                  <option value="British Columbia (Vancouver & Pacific Coast)">British Columbia (Vancouver, Victoria - Tech & Trade Gateway)</option>
                  <option value="Alberta (Calgary & Edmonton)">Alberta (Calgary, Edmonton - Energy, Tech & Low Cost of Living)</option>
                  <option value="Quebec (Montreal Cultural & AI Capital)">Quebec (Montreal - Bilingual AI & Innovation Hub)</option>
                  <option value="Atlantic Canada (Nova Scotia, New Brunswick)">Atlantic Canada (Halifax, Moncton - Accelerated Provincial Nominee PR)</option>
                  <option value="All Provinces (Open to Best Fit)">All Provinces (Open to Best Fit based on ranking & employment)</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 3: Academic Qualifications */}
          {step === 3 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Prior Academic Performance (Bachelor’s or 12th Standard)
                </label>
                <div className="space-y-2.5">
                  {[
                    {
                      label: 'First Class / Distinction (75%+ or 3.6+ / 4.0 GPA)',
                      desc: 'Eligible for direct admission to U15 flagship institutions (Toronto, UBC, McGill, Alberta, Waterloo) and entrance scholarships.',
                      tag: 'U15 Direct',
                    },
                    {
                      label: 'High Second Class (65% – 74% or 3.0 – 3.5 GPA)',
                      desc: 'Meets direct entry criteria across 90%+ of top Canadian comprehensive universities and prestigious graduate schools.',
                      tag: 'High Eligibility',
                    },
                    {
                      label: 'Second Class (55% – 64% or 2.5 – 2.9 GPA)',
                      desc: 'Strong admission eligibility for leading Post-Graduate Diplomas, Co-op programs, and polytechnic institutes with high hiring rates.',
                      tag: 'PG Diploma / Co-op',
                    },
                    {
                      label: '15-Year Education / 3-Year Bachelor’s Graduate',
                      desc: 'Widely accepted by top Canadian institutions (WES evaluation or partner university direct recognition).',
                      tag: '3-Yr Degree Accepted',
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

          {/* STEP 4: Language & IRCC Proof of Funds */}
          {step === 4 && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  English Language Status & Test Strategy
                </label>
                <div className="space-y-2.5">
                  {[
                    {
                      label: 'IELTS Academic (Targeting 6.5+ overall, 6.0 bands)',
                      desc: 'Universally accepted by 100% of Canadian Designated Learning Institutions (DLIs) and SDS visa processing streams.',
                      highlight: true,
                    },
                    {
                      label: 'PTE Academic (Targeting 60+ Score)',
                      desc: 'Fully approved by IRCC for Canadian Student Direct Stream (SDS) study permits and top university admissions.',
                      highlight: false,
                    },
                    {
                      label: 'TOEFL iBT (Targeting 88 – 100 Points)',
                      desc: 'Widely accepted across Canadian research faculties for graduate and engineering fellowships.',
                      highlight: false,
                    },
                    {
                      label: 'Medium of Instruction (MOI) Certificate',
                      desc: 'Select colleges and universities accept verified English-medium undergraduate degrees for language waivers.',
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
                            ★ SDS Standard
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* IRCC Financial Requirement Note */}
              <div className="p-4 rounded-2xl bg-[#F5F8FF] border border-[#E2E8F0] text-xs text-[#475569] space-y-1">
                <div className="font-bold text-[#14213D] flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-[#155EEF]" />
                  <span>IRCC Living Funds Benchmark ($20,635 CAD)</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Per current IRCC guidelines, single applicants must demonstrate $20,635 CAD in living maintenance funds plus first-year tuition through liquid savings, an education loan, or a Guaranteed Investment Certificate (GIC).
                </p>
              </div>
            </div>
          )}

          {/* STEP 5: Calculated Results */}
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
                        Strong Canadian Admission Match
                      </h3>
                    </div>
                  </div>
                  <div className="text-center sm:text-right">
                    <div className="text-2xl font-black font-editorial text-[#155EEF]">96%</div>
                    <span className="text-[10px] font-semibold text-slate-500">Profile Eligibility Index</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5">
                  <div className="p-3.5 rounded-2xl bg-white border border-[#E2E8F0] text-left">
                    <div className="text-[10px] font-bold uppercase text-slate-400">Post-Study Work</div>
                    <div className="text-sm font-bold text-[#14213D] mt-0.5 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#155EEF]" />
                      <span>Up to 3-Year PGWP</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">Open work permit per IRCC degree duration rules</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-[#E2E8F0] text-left">
                    <div className="text-[10px] font-bold uppercase text-slate-400">Work While Studying</div>
                    <div className="text-sm font-bold text-[#14213D] mt-0.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>24 Hrs / Week Off-Campus</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">Full-time permitted during scheduled breaks</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-[#E2E8F0] text-left">
                    <div className="text-[10px] font-bold uppercase text-slate-400">Paid Co-op Programs</div>
                    <div className="text-sm font-bold text-[#14213D] mt-0.5 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      <span>$18 – $32 / hr</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">Average Canadian student co-op compensation</p>
                  </div>
                </div>

                {/* Profile Snapshot Summary */}
                <div className="mt-5 pt-4 border-t border-[#E2E8F0] text-xs text-slate-600 space-y-1.5 text-left">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-400">Selected Credential:</span>
                    <span className="font-bold text-slate-800">{program}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-400">Target Field:</span>
                    <span className="font-bold text-slate-800">{field}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-400">Target Intake:</span>
                    <span className="font-bold text-slate-800">{intake}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-400">Preferred Region:</span>
                    <span className="font-bold text-slate-800">{province}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-400">Academic Standing:</span>
                    <span className="font-bold text-emerald-600">{academicGrade.split(' (')[0]}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-[#155EEF] flex items-start gap-3">
                <FileCheck2 className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="text-left">
                  <strong className="font-bold">Next Recommended Step:</strong> MasterVisa provides 1-on-1 university selection, Provincial Attestation Letter (PAL) quota guidance, SOP review, and complete IRCC study permit filing support.
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
              <span>Book Canada Consultation with this Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
