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

interface EuropeEligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedConsultation?: (profileData?: {
    program: string;
    targetCountry: string;
    field: string;
    intake: string;
    academicGrade: string;
    englishStatus: string;
    scoreSummary: string;
  }) => void;
}

export const EuropeEligibilityModal: React.FC<EuropeEligibilityModalProps> = ({
  isOpen,
  onClose,
  onProceedConsultation,
}) => {
  const [step, setStep] = useState<number>(1);
  const [program, setProgram] = useState<string>('English-Taught Master’s Degree (MSc / MA)');
  const [targetCountry, setTargetCountry] = useState<string>('Germany (Tuition-Free Public Unis)');
  const [field, setField] = useState<string>('Engineering, Data Science & AI');
  const [intake, setIntake] = useState<string>('Winter / Autumn Semester 2026 (Sep/Oct)');
  const [academicGrade, setAcademicGrade] = useState<string>('65% – 75%+ (or German Grade 1.5 – 2.5)');
  const [englishStatus, setEnglishStatus] = useState<string>('IELTS 6.5+ / PTE 58+ / Medium of Instruction (MOI)');

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
        targetCountry,
        field,
        intake,
        academicGrade,
        englishStatus,
        scoreSummary: `${program} | ${targetCountry} | ${field} | ${intake} | ${academicGrade} | ${englishStatus}`,
      });
    }
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/75 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="europe-modal-title"
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
                <span className="text-[10px] font-bold tracking-widest text-[#155EEF] uppercase">European Admissions Compass</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-[#16A34A] font-semibold border border-emerald-200">Free Assessment</span>
              </div>
              <h2 id="europe-modal-title" className="text-lg sm:text-xl font-bold font-editorial text-[#14213D]">
                Check Your European University Eligibility
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#64748B] hover:text-[#14213D] rounded-xl hover:bg-slate-200/50 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5 flex">
          <div 
            className="bg-gradient-to-r from-[#0755F5] to-[#22C55E] h-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <span className="text-xs font-bold text-[#0755F5] uppercase tracking-wider">Step 1 of 3</span>
                <h3 className="text-xl font-bold font-editorial text-[#0A1330] mt-1">
                  What program and destination are you targeting?
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Select your academic degree level and country of study across Europe.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  Academic Degree Level
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    'English-Taught Master’s Degree (MSc / MA)',
                    'Grandes Écoles / Master in Management (MiM)',
                    'Bachelor’s Degree (Undergraduate)',
                    'PhD & Doctoral Research Fellowship',
                  ].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setProgram(p)}
                      className={`p-3.5 rounded-2xl border text-left text-sm font-semibold transition-all flex items-center justify-between ${
                        program === p
                          ? 'border-[#0755F5] bg-blue-50/70 text-[#0755F5] shadow-sm ring-1 ring-[#0755F5]'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Award className={`w-4 h-4 ${program === p ? 'text-[#0755F5]' : 'text-slate-400'}`} />
                        <span>{p}</span>
                      </div>
                      {program === p && <CheckCircle2 className="w-4 h-4 text-[#0755F5] shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  Primary Country of Interest
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { name: 'Germany', desc: 'Tuition-free public universities, 18-month stay-back' },
                    { name: 'France', desc: 'Top business schools, CAF housing aid, 2-yr APS visa' },
                    { name: 'Ireland', desc: 'English-native tech capital, 2-yr stay-back visa' },
                    { name: 'Netherlands', desc: 'Leading English courses, 1-year Zoekjaar permit' },
                    { name: 'Sweden & Nordics', desc: 'Pioneering sustainability & innovation hubs' },
                    { name: 'Italy & Spain', desc: 'Affordable regional fees, rich cultural heritage' },
                  ].map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setTargetCountry(item.name)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        targetCountry.startsWith(item.name)
                          ? 'border-[#0755F5] bg-blue-50/70 text-[#0755F5] shadow-sm ring-1 ring-[#0755F5]'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#14213D]">{item.name}</span>
                        {targetCountry.startsWith(item.name) && <CheckCircle2 className="w-3.5 h-3.5 text-[#0755F5]" />}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl bg-[#0755F5] hover:bg-[#0544C7] text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all"
                >
                  Continue to Academic Profile <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <span className="text-xs font-bold text-[#0755F5] uppercase tracking-wider">Step 2 of 3</span>
                <h3 className="text-xl font-bold font-editorial text-[#0A1330] mt-1">
                  Academic Background & Field of Study
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  European universities evaluate course credits (ECTS), curriculum alignment, and undergraduate marks.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  Approximate Undergraduate Score / GPA
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    '75%+ (or German Grade 1.0 – 2.0 / First Class Distinction)',
                    '65% – 74% (or German Grade 2.1 – 2.5 / First Class)',
                    '55% – 64% (Second Class Upper / English Pathway Eligible)',
                    '50% – 54% (Pre-Master’s & Foundation Options Available)',
                  ].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setAcademicGrade(g)}
                      className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                        academicGrade === g
                          ? 'border-[#0755F5] bg-blue-50/70 text-[#0755F5] shadow-sm ring-1 ring-[#0755F5]'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <span>{g}</span>
                      {academicGrade === g && <CheckCircle2 className="w-4 h-4 text-[#0755F5] shrink-0 ml-2" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  Field of Interest
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'Engineering, Data Science & AI',
                    'Computer Science & Software',
                    'Business Management & MBA',
                    'Finance & Economic Policy',
                    'Biotechnology & Health',
                    'Renewable Energy & Sustainability',
                  ].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setField(f)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                        field === f
                          ? 'border-[#0755F5] bg-blue-50/80 text-[#0755F5] font-semibold ring-1 ring-[#0755F5]'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-xl bg-[#0755F5] hover:bg-[#0544C7] text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all"
                >
                  Continue to Intake & Language <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Step 3 of 3 • Results Ready</span>
                <h3 className="text-xl font-bold font-editorial text-[#0A1330] mt-1">
                  Intake Timeline & Language Readiness
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Thousands of programs in Germany, France, Ireland, and Netherlands are taught 100% in English.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  Target Academic Intake
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { name: 'Winter / Autumn (Sep / Oct 2026)', desc: 'Primary intake, full funding & university selection' },
                    { name: 'Summer / Spring (Mar / Apr 2027)', desc: 'Secondary intake for select Master’s & fast-tracks' },
                  ].map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setIntake(item.name)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        intake === item.name
                          ? 'border-[#0755F5] bg-blue-50/70 text-[#0755F5] shadow-sm ring-1 ring-[#0755F5]'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold">{item.name.split(' (')[0]}</span>
                        {intake === item.name && <CheckCircle2 className="w-3.5 h-3.5 text-[#0755F5]" />}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  English Language Qualification
                </label>
                <div className="space-y-2.5">
                  {[
                    { name: 'IELTS Academic (Targeting 6.5+)', note: 'Accepted universally across all European institutions' },
                    { name: 'PTE Academic (Targeting 58–65+)', note: 'Fast automated scoring accepted by Ireland, Netherlands & Germany' },
                    { name: 'Medium of Instruction (MOI) Certificate', note: 'Accepted by selected institutions for English-taught undergrads' },
                    { name: 'TOEFL iBT (Targeting 80–95+)', note: 'Recognized for technical and business admissions' },
                  ].map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setEnglishStatus(item.name)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        englishStatus === item.name
                          ? 'border-[#0755F5] bg-blue-50/70 text-[#0755F5] shadow-sm ring-1 ring-[#0755F5]'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-slate-900">{item.name}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{item.note}</p>
                      </div>
                      {englishStatus === item.name && <CheckCircle2 className="w-5 h-5 text-[#0755F5] shrink-0 ml-3" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Assessment Card Output */}
              <div className="bg-gradient-to-br from-[#EAF2FF] via-[#F5F8FF] to-white rounded-2xl p-5 text-[#14213D] shadow-md relative overflow-hidden border-2 border-[#155EEF]/20">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#16A34A] text-[10px] font-bold border border-emerald-200 mb-2">
                      <Award className="w-3 h-3 text-[#16A34A]" />
                      Admissions Evaluation: HIGH ELIGIBILITY
                    </div>
                    <h4 className="text-base sm:text-lg font-bold font-editorial text-[#14213D]">
                      Profile Matches Top European Public & Technical Universities
                    </h4>
                    <p className="text-xs text-[#475569] mt-1">
                      Based on {program} in {field} for {intake}.
                    </p>
                  </div>
                  <div className="shrink-0 text-center bg-white rounded-xl p-2.5 border border-[#E2E8F0] shadow-sm">
                    <div className="text-2xl font-black font-editorial text-[#16A34A]">96%</div>
                    <div className="text-[9px] font-bold text-[#64748B] uppercase tracking-wider">Match Score</div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#E2E8F0] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2 text-[#475569]">
                    <Clock className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>Eligible for <strong>12 – 24 Month Post-Study Work</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-[#475569]">
                    <Briefcase className="w-4 h-4 text-[#155EEF] shrink-0" />
                    <span>Part-Time Student Work Rights Granted</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Recalculate
                </button>
                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleFinish}
                    className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-[#0755F5] hover:bg-[#0544C7] text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Connect with European Specialist</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
