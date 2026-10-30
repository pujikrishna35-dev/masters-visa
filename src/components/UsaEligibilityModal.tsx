import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  GraduationCap, 
  Award, 
  ShieldCheck, 
  AlertCircle,
  RefreshCw,
  Compass
} from 'lucide-react';

interface UsaEligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedConsultation?: (profileData?: {
    program: string;
    intake: string;
    gpa: string;
    field: string;
    englishStatus: string;
    scoreSummary: string;
  }) => void;
}

export const UsaEligibilityModal: React.FC<UsaEligibilityModalProps> = ({
  isOpen,
  onClose,
  onProceedConsultation,
}) => {
  const [step, setStep] = useState<number>(1);
  const [program, setProgram] = useState<string>('STEM Master’s Degree (MS)');
  const [intake, setIntake] = useState<string>('Fall 2026 (Aug/Sep)');
  const [gpa, setGpa] = useState<string>('70% – 79% (or 3.2 – 3.5 GPA)');
  const [field, setField] = useState<string>('Computer Science & Data');
  const [englishTest, setEnglishTest] = useState<string>('IELTS Academic (Targeting 6.5+)');

  // Close on Escape key
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
        intake,
        gpa,
        field,
        englishStatus: englishTest,
        scoreSummary: `${program} | ${intake} | ${gpa} | ${englishTest}`,
      });
    }
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/75 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
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
                <span className="text-[10px] font-bold tracking-widest text-[#155EEF] uppercase">USA Admissions Compass</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-[#16A34A] font-semibold border border-emerald-200">Free Assessment</span>
              </div>
              <h2 id="modal-title" className="text-lg sm:text-xl font-bold font-editorial text-[#14213D]">
                Check Your US University Eligibility
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
                  What program and intake are you planning for?
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Select your academic degree level and target semester in the United States.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  Target Degree Level
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    'STEM Master’s Degree (MS)',
                    'MBA & Management Master’s',
                    'Bachelor’s Degree (Undergrad)',
                    'PhD & Doctoral Research',
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
                        <GraduationCap className={`w-4 h-4 ${program === p ? 'text-[#0755F5]' : 'text-slate-400'}`} />
                        <span>{p}</span>
                      </div>
                      {program === p && <CheckCircle2 className="w-4 h-4 text-[#0755F5] shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  Target Admission Intake
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { name: 'Fall 2026 (Aug/Sep)', desc: 'Primary intake, full funding' },
                    { name: 'Spring 2027 (Jan)', desc: 'Fast-track turnaround' },
                    { name: 'Later Intake (2027+)', desc: 'Long-term roadmap' },
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
                        <span className="text-xs font-bold">{item.name.split(' ')[0]} {item.name.split(' ')[1]}</span>
                        {intake === item.name && <CheckCircle2 className="w-3.5 h-3.5 text-[#0755F5]" />}
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
                  US universities assess overall holistic standing, undergraduate marks, and program fit.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  Approximate Undergraduate Score / GPA
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    '80%+ or 3.7+ / 4.0 GPA (First Class Distinction)',
                    '70% – 79% (or 3.2 – 3.5 GPA)',
                    '60% – 69% (or 2.8 – 3.1 GPA)',
                    '50% – 59% (Pathways & Pre-Master’s available)',
                  ].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGpa(g)}
                      className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                        gpa === g
                          ? 'border-[#0755F5] bg-blue-50/70 text-[#0755F5] shadow-sm ring-1 ring-[#0755F5]'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <span>{g}</span>
                      {gpa === g && <CheckCircle2 className="w-4 h-4 text-[#0755F5] shrink-0 ml-2" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  Primary Field of Interest
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'Computer Science & Data',
                    'AI & Robotics Engineering',
                    'Business Analytics & MBA',
                    'Mechanical / Civil Eng.',
                    'Biotech & Health Sciences',
                    'Other Interdisciplinary',
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
                  Continue to English Test <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Step 3 of 3 • Results Ready</span>
                <h3 className="text-xl font-bold font-editorial text-[#0A1330] mt-1">
                  English Proficiency & Test Readiness
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  How do you plan to meet institutional English language requirements?
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  { name: 'IELTS Academic (Targeting 6.5+)', note: 'Accepted by 3,400+ US institutions' },
                  { name: 'TOEFL iBT (Targeting 80–100)', note: 'Classic standard across US graduate programs' },
                  { name: 'PTE Academic (Targeting 58–70)', note: 'Computer-based with fast 48h scoring' },
                  { name: 'Exploring IELTS Waiver / MOI Pathway', note: 'Based on English-medium instruction or university assessment' },
                ].map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setEnglishTest(item.name)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      englishTest === item.name
                        ? 'border-[#0755F5] bg-blue-50/70 text-[#0755F5] shadow-sm ring-1 ring-[#0755F5]'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-slate-900">{item.name}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{item.note}</p>
                    </div>
                    {englishTest === item.name && <CheckCircle2 className="w-5 h-5 text-[#0755F5] shrink-0 ml-3" />}
                  </button>
                ))}
              </div>

              {/* Assessment Card Output */}
              <div className="bg-gradient-to-br from-[#EAF2FF] via-[#F5F8FF] to-white rounded-2xl p-5 text-[#14213D] shadow-md relative overflow-hidden border-2 border-[#155EEF]/20">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#16A34A] text-[10px] font-bold border border-emerald-200 mb-2">
                      <Sparkles className="w-3 h-3 text-[#16A34A]" />
                      Preliminary Assessment: HIGH ELIGIBILITY
                    </div>
                    <h4 className="text-base sm:text-lg font-bold font-editorial text-[#14213D]">
                      Profile matches Top 100 US Universities
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
                    <ShieldCheck className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>Eligible for <strong>3-Year STEM OPT</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-[#475569]">
                    <Award className="w-4 h-4 text-[#155EEF] shrink-0" />
                    <span>Tuition Assistantships (TA/RA) Available</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 text-amber-800 text-[11px] flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Admissions Note:</strong> This self-assessment provides illustrative guidance. Final admission and visa issuance depend on individual university faculty review and US consular interview.
                </p>
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
                    <span>Connect with USA Specialist</span>
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
