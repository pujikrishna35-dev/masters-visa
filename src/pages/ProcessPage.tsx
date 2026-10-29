import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { JourneyTimeline } from '../components/JourneyTimeline';
import { FinalCta } from '../components/FinalCta';
import { 
  CheckCircle2, 
  ArrowRight,
  Compass
} from 'lucide-react';

interface ProcessPageProps {
  onOpenCounselling: () => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onOpenCounselling }) => {
  const deepSteps = [
    {
      num: '01',
      title: 'Free 1-on-1 Profile Assessment & Strategy',
      badge: 'Evaluation Stage',
      desc: 'Our senior study abroad counsellors evaluate your academic transcripts, GRE/GMAT/IELTS/TOEFL scores, budget expectations, and post-study career goals to map out your best international options.',
      points: [
        'Detailed GPA, backlogs, and academic profile audit',
        'Course match based on emerging industry job demands',
        'Estimated budget, scholarships, and return on investment (ROI) projection',
        'Zero consultation fees for initial assessment'
      ]
    },
    {
      num: '02',
      title: 'Strategic University Shortlisting & SOP / LOR Refinement',
      badge: 'Shortlisting & Documentation',
      desc: 'We construct a customized matrix of Dream, Reach, and Safe universities. Our editorial mentors help you craft winning Statements of Purpose and Letters of Recommendation.',
      points: [
        'Curated shortlist of 8-12 high-acceptance universities',
        'Direct application fee waivers worth up to $500 per student',
        'Iterative editing of SOP, CV/Resume, and academic essays',
        'Recommendation Letters (LOR) structuring with university faculty'
      ]
    },
    {
      num: '03',
      title: 'Offer Letter Acceptance, Education Loan & Airtight Visa Filing',
      badge: 'Admissions & Visa Stage',
      desc: 'Once your official I-20, CAS, or offer letter is received, our certified financial and consular experts handle your education loan sanction and official visa filing.',
      points: [
        'Negotiating merit scholarships directly with university admissions',
        'Education loan processing with collateral and non-collateral options',
        'Meticulous DS-160, UKVI, and embassy portal submission',
        '1-on-1 simulated consular mock interview drills with experts'
      ]
    },
    {
      num: '04',
      title: 'Pre-Departure Briefing, Free Airport Pickup & Dorm Settlement',
      badge: 'Arrival & Settlement',
      desc: 'We don’t stop when your visa is approved. We prepare you for student life abroad and provide our signature free airport pickup and verified dorm accommodation.',
      points: [
        'Comprehensive travel checklist, packing guide, and foreign exchange',
        'International SIM card activation and student bank account assistance',
        'Guaranteed airport terminal pickup and transfer to dorm',
        'Pre-inspected, furnished student accommodation waiting upon arrival'
      ]
    }
  ];

  return (
    <div className="bg-[#FAF7F1]">
      {/* Page Header Banner */}
      <PageBanner
        breadcrumbs={[{ label: 'Process & Roadmap' }]}
        badge="STREAMLINED 4-STEP ROADMAP"
        badgeIcon={<Compass className="w-3.5 h-3.5 text-[#D99A35]" />}
        title="Your Global Journey in 4 Simple Steps"
        highlightWord="4 Simple Steps"
        description="A proven, transparent step-by-step roadmap from your first profile evaluation to receiving admission offers, securing student visas, and arriving safely on your new university campus."
      />

      {/* Main Interactive Journey Timeline */}
      <div className="py-6">
        <JourneyTimeline onOpenCounselling={onOpenCounselling} />
      </div>

      {/* Comprehensive Step Deep-Dive */}
      <section className="py-16 sm:py-20 bg-white border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#64748B] block mb-2">
              DETAILED BREAKDOWN
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#10243F] font-serif tracking-tight">
              Every Stage Explained <span className="text-[#D99A35] font-serif">In Depth</span>
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] mt-3">
              Clear timelines, personalized deliverables, and full visibility so you always know what comes next.
            </p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {deepSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#FAF7F1] rounded-3xl p-6 sm:p-8 border border-slate-200/80 hover:border-[#D99A35]/50 hover:shadow-card transition-all duration-300 relative group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl font-black text-[#D99A35] font-mono">
                      {step.num}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white text-[#10243F] text-xs font-bold border border-slate-200 shadow-2xs">
                      {step.badge}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#10243F] font-serif mb-3">
                  {step.title}
                </h3>

                <p className="text-sm text-[#64748B] leading-relaxed mb-5">
                  {step.desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-slate-200/70">
                  {step.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-semibold text-[#10243F]">
                      <CheckCircle2 className="w-4 h-4 text-[#D99A35] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={onOpenCounselling}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#0755F5] via-[#2563EB] to-[#0877FF] hover:opacity-95 text-white font-bold text-sm rounded-full shadow-lg shadow-[#0755F5]/25 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <span>Begin Step 1: Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Final Sunset Call to Action */}
      <FinalCta onOpenCounselling={onOpenCounselling} />
    </div>
  );
};

export default ProcessPage;
