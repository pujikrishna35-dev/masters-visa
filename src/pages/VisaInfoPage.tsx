import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { FinalCta } from '../components/FinalCta';
import { FAQS, DESTINATIONS } from '../data/content';
import { 
  FileCheck2, 
  ShieldCheck, 
  Award, 
  HelpCircle, 
  ArrowRight, 
  Clock, 
  FileText
} from 'lucide-react';

interface VisaInfoPageProps {
  onOpenCounselling: (destOrService?: string) => void;
}

export const VisaInfoPage: React.FC<VisaInfoPageProps> = ({ onOpenCounselling }) => {
  const visaSteps = [
    {
      step: '01',
      title: 'Profile Audit & Document Checklist',
      desc: 'We verify your academic transcripts, English scores, and financial prerequisites against official immigration requirements.',
    },
    {
      step: '02',
      title: 'Financial Dossier Preparation',
      desc: 'Guiding you on liquid funds, education loan sanction letters, fixed deposits, sponsor affidavits, and source of funds verification.',
    },
    {
      step: '03',
      title: 'Application Filing & Biometrics',
      desc: 'Flawless completion of official visa portals (DS-160, UKVI, IRCC, ImmiAccount) and booking consular/biometric appointment slots.',
    },
    {
      step: '04',
      title: 'Intensive Consular Mock Interviews',
      desc: 'Simulated 1-on-1 consular drills covering course justification, university choice, career intent, and non-immigrant intent.',
    },
  ];

  const visaFaqs = FAQS.filter(f => 
    f.question.toLowerCase().includes('visa') || 
    f.answer.toLowerCase().includes('visa') ||
    f.category?.toLowerCase().includes('visa')
  );

  return (
    <div className="bg-[#FAF7F1]">
      {/* Page Header Banner */}
      <PageBanner
        breadcrumbs={[{ label: 'Visa Information' }]}
        badge="95%+ VISA SUCCESS RATE"
        badgeIcon={<ShieldCheck className="w-3.5 h-3.5 text-[#D99A35]" />}
        title="Student Visa Guidance & Consular Interview Preparation"
        highlightWord="Consular Interview"
        description="Comprehensive visa support including financial dossier verification, official embassy filing, and intensive mock interview drills tailored to each country's consular guidelines."
      />

      {/* Country Visa Success Rates & Work Permits */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#64748B] block mb-2">
              COUNTRY-BY-COUNTRY GUIDE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#10243F] font-serif tracking-tight">
              Student Visa Requirements & <span className="text-[#D99A35] font-serif">Work Permits</span>
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] mt-3">
              Official approval rates and post-study stay-back visa durations for top study destinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DESTINATIONS.map((dest) => (
              <div
                key={dest.id}
                className="bg-[#FAF7F1] rounded-2xl p-5 border border-slate-200/80 hover:border-[#D99A35]/50 hover:shadow-card transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl">{dest.flag}</span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-100 flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {dest.visaSuccessRate} Success
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#10243F] mb-1 group-hover:text-[#D99A35] transition-colors">
                    {dest.name} Student Visa
                  </h3>
                  <p className="text-xs text-[#64748B] mb-4">
                    {dest.shortDesc}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-slate-200/60 text-xs">
                    <div className="flex items-start gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                      <span className="text-slate-600">
                        <strong className="text-[#10243F]">Work Permit:</strong> {dest.workPermit}
                      </span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span className="text-slate-600">
                        <strong className="text-[#10243F]">Avg Tuition:</strong> {dest.avgTuition}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onOpenCounselling(`${dest.name} Visa Guidance`)}
                  className="mt-5 w-full py-2 px-3 bg-white hover:bg-[#FAF7F1] text-[#10243F] border border-slate-200 hover:border-[#D99A35] rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Apply for {dest.name} Visa</span>
                  <ArrowRight className="w-3 h-3 text-[#D99A35]" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Stage Visa Dossier Preparation Roadmap */}
      <section className="py-16 sm:py-20 bg-[#FAF7F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#64748B] block mb-2">
              OUR 4-STAGE RIGOROUS SYSTEM
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#10243F] font-serif tracking-tight">
              How We Ensure Airtight <span className="text-[#D99A35] font-serif">Visa Approvals</span>
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] mt-3">
              Every student dossier undergoes multi-tier reviews before consular appointment filing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visaSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card hover:border-[#D99A35]/50 transition-all duration-300 relative group"
              >
                <span className="text-3xl font-black text-[#D99A35]/25 group-hover:text-[#D99A35] transition-colors block mb-3 font-mono">
                  {step.step}
                </span>
                <h3 className="text-base font-bold text-[#10243F] mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Special Banner on Mock Interviews */}
          <div className="mt-12 bg-gradient-to-r from-[#10243F] to-[#1E3A5F] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#D99A35] text-white flex items-center justify-center shrink-0">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold font-serif text-white">
                  Schedule 1-on-1 Consular Mock Visa Interview
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                  Practice with real visa officers and former consular advisors. Learn exact answers for course choices, ties to home country, and financial justification.
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenCounselling('Mock Visa Interview')}
              className="px-6 py-3 bg-gradient-to-r from-[#D99A35] to-[#F16B55] hover:opacity-95 text-white font-bold text-xs sm:text-sm rounded-full shadow-md shrink-0 cursor-pointer"
            >
              Book Mock Interview Session
            </button>
          </div>
        </div>
      </section>

      {/* Frequently Asked Visa Questions */}
      {visaFaqs.length > 0 && (
        <section className="py-16 sm:py-20 bg-white border-t border-slate-200/70">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#64748B] block mb-2">
                STUDENT VISA FAQ
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#10243F] font-serif tracking-tight">
                Answers to Your <span className="text-[#D99A35] font-serif">Visa Questions</span>
              </h2>
            </div>

            <div className="space-y-4">
              {visaFaqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-[#FAF7F1] rounded-2xl p-5 border border-slate-200/80"
                >
                  <h4 className="text-sm sm:text-base font-bold text-[#10243F] mb-2 flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-[#D99A35] shrink-0 mt-0.5" />
                    <span>{faq.question}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final Call to Action */}
      <FinalCta onOpenCounselling={() => onOpenCounselling()} />
    </div>
  );
};

export default VisaInfoPage;
