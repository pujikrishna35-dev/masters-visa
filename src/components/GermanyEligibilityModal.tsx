import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  RefreshCw,
  Building2
} from 'lucide-react';

interface GermanyEligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedConsultation?: (profileData?: {
    program: string;
    intake: string;
    gpa: string;
    field: string;
    apsStatus: string;
    scoreSummary: string;
  }) => void;
  onOpenCounselling?: (destination?: string) => void;
}

export const GermanyEligibilityModal: React.FC<GermanyEligibilityModalProps> = ({
  isOpen,
  onClose,
  onProceedConsultation,
  onOpenCounselling,
}) => {
  const [step, setStep] = useState<number>(1);
  const [program, setProgram] = useState<string>('English-Taught Public University Master’s (TU9 / State)');
  const [intake, setIntake] = useState<string>('Winter Semester 2026/27 (Sep/Oct)');
  const [gpa, setGpa] = useState<string>('65% – 75%+ (German Grade 2.0 – 2.5)');
  const [field, setField] = useState<string>('Engineering & Computer Science (Informatik)');
  const [apsStatus, setApsStatus] = useState<string>('IELTS 6.5+ / MOI Waiver Ready');

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
        apsStatus,
        scoreSummary: `${program} | ${intake} | ${gpa} | ${apsStatus}`,
      });
    } else if (onOpenCounselling) {
      onOpenCounselling('Germany');
    }
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/75 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="germany-modal-title"
    >
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden text-[#14213D] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 sm:p-7 bg-gradient-to-r from-[#F5F8FF] via-white to-[#F5F8FF] border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EAF2FF] border border-[#B9D5FF] flex items-center justify-center text-[#155EEF] shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#155EEF] px-2 py-0.5 rounded-full bg-white border border-[#B9D5FF]">
                Germany Public University Check
              </span>
              <h3 id="germany-modal-title" className="text-xl font-bold font-editorial text-[#14213D] mt-0.5">
                Eligibility Calculator
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 border border-[#E2E8F0] text-[#64748B] hover:text-[#14213D] flex items-center justify-center transition-colors shadow-xs"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step 1: Program, Field & Intake */}
        {step === 1 && (
          <div className="p-6 sm:p-7 space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2">
                1. Target Qualification in Germany
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  'English-Taught Public University Master’s (TU9 / State)',
                  'Applied Sciences Master’s (Fachhochschule UAS)',
                  'Direct Bachelor’s / Studienkolleg Bridge',
                  'Doctoral / PhD Research Fellowship',
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setProgram(opt)}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                      program === opt
                        ? 'bg-[#EAF2FF] border-[#155EEF] text-[#155EEF] ring-1 ring-[#155EEF]/20 font-bold'
                        : 'bg-white hover:bg-slate-50 border-[#E2E8F0] text-[#475569]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2">
                2. Academic Discipline
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Engineering & Tech (Automotive/Mech)',
                  'Computer Science & AI (Informatik)',
                  'Data Science & Analytics',
                  'Management & Business (TUM-BWL)',
                  'Renewable Energy & Environmental',
                  'Life Sciences & Biotechnology',
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setField(opt)}
                    className={`p-2.5 rounded-xl border text-[11px] font-semibold text-left transition-all ${
                      field === opt
                        ? 'bg-[#EAF2FF] border-[#155EEF] text-[#155EEF] ring-1 ring-[#155EEF]/20 font-bold'
                        : 'bg-white hover:bg-slate-50 border-[#E2E8F0] text-[#475569]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2">
                3. Target Semester Intake
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Winter Semester 2026/27 (Sep/Oct)',
                  'Summer Semester 2027 (Mar/Apr)',
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setIntake(opt)}
                    className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                      intake === opt
                        ? 'bg-[#EAF2FF] border-[#155EEF] text-[#155EEF] ring-1 ring-[#155EEF]/20 font-bold'
                        : 'bg-white hover:bg-slate-50 border-[#E2E8F0] text-[#475569]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#155EEF] hover:bg-[#104ECC] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Continue to Academic Grades</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: GPA & English / APS Status */}
        {step === 2 && (
          <div className="p-6 sm:p-7 space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2">
                4. Undergraduate Marks / German Grade Equivalence
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  '75%+ Marks (German Grade 1.5 – 1.9) — High TU9 Direct Entry',
                  '65% – 75%+ (German Grade 2.0 – 2.5) — Competitive Public University',
                  '55% – 64% (German Grade 2.6 – 3.0) — UAS / Pre-Master’s Options',
                  'Final Year Student (Awaiting Final Semester Transcripts)',
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setGpa(opt)}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                      gpa === opt
                        ? 'bg-[#EAF2FF] border-[#155EEF] text-[#155EEF] ring-1 ring-[#155EEF]/20 font-bold'
                        : 'bg-white hover:bg-slate-50 border-[#E2E8F0] text-[#475569]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2">
                5. English / APS Verification Status
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  'IELTS 6.5+ or TOEFL 88+ Already Scored',
                  'Eligible for English Medium of Instruction (MOI) Waiver',
                  'APS Certificate Process Initiated / Planned',
                  'Need Guidance on Sperrkonto (Blocked Account €11,904)',
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setApsStatus(opt)}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                      apsStatus === opt
                        ? 'bg-[#EAF2FF] border-[#155EEF] text-[#155EEF] ring-1 ring-[#155EEF]/20 font-bold'
                        : 'bg-white hover:bg-slate-50 border-[#E2E8F0] text-[#475569]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl border border-[#CBD5E1] text-[#64748B] font-bold text-xs hover:bg-slate-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-xl bg-[#155EEF] hover:bg-[#104ECC] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <span>Calculate Eligibility Result</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Result Summary */}
        {step === 3 && (
          <div className="p-6 sm:p-7 space-y-5 animate-fade-in">
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3.5">
              <CheckCircle2 className="w-6 h-6 text-[#16A34A] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-base font-bold text-emerald-900">
                  Strong Eligibility for German Public Universities!
                </h4>
                <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                  Based on your academic profile, you qualify for tuition-free Master’s degree programs at recognized German state universities (including TU9 members).
                </p>
              </div>
            </div>

            <div className="bg-[#F5F8FF] rounded-2xl p-4 border border-[#E2E8F0] space-y-2.5 text-xs">
              <div className="font-bold text-[#14213D] uppercase tracking-wider text-[10px]">
                Profile Assessment Blueprint:
              </div>
              <div className="flex justify-between py-1 border-b border-[#E2E8F0]">
                <span className="text-[#64748B]">Qualification:</span>
                <span className="font-bold text-[#14213D]">{program}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E2E8F0]">
                <span className="text-[#64748B]">Discipline:</span>
                <span className="font-bold text-[#155EEF]">{field}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E2E8F0]">
                <span className="text-[#64748B]">Target Intake:</span>
                <span className="font-bold text-[#14213D]">{intake}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#64748B]">Estimated Tuition:</span>
                <span className="font-black text-[#16A34A]">€0 / year (State Subsidized)</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-[#155EEF] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Includes 18-month stay-back jobseeker visa & fast-track EU Blue Card pathway.</span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#CBD5E1] text-[#64748B] hover:text-[#14213D] font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Re-calculate</span>
              </button>

              <button
                type="button"
                onClick={handleFinish}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#155EEF] hover:bg-[#104ECC] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Book Free University Shortlisting</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GermanyEligibilityModal;
