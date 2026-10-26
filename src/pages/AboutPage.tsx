import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { StatsBar } from '../components/StatsBar';
import { Universities } from '../components/Universities';
import { JourneyTimeline } from '../components/JourneyTimeline';
import { FinalCta } from '../components/FinalCta';
import { ShieldCheck, HeartHandshake, Award, Users, Target, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  onOpenCounselling: (destOrService?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenCounselling }) => {
  const values = [
    {
      icon: ShieldCheck,
      title: '100% Genuine Guidance',
      desc: 'Transparent profile evaluation with no false promises. We match you only with accredited, recognized universities that align with your career goals.',
      color: 'text-amber-500',
      bg: 'bg-amber-50'
    },
    {
      icon: HeartHandshake,
      title: 'End-to-End Handholding',
      desc: 'From initial shortlisting and SOP refinement to mock consular interviews and free airport pickup, we stay by your side until you are settled in your dorm.',
      color: 'text-sky-500',
      bg: 'bg-sky-50'
    },
    {
      icon: Award,
      title: '95%+ Visa Success',
      desc: 'Our visa dossiers are rigorously checked by seasoned counselors with country-specific mock interviews and financial documentation audits.',
      color: 'text-emerald-500',
      bg: 'bg-emerald-50'
    },
    {
      icon: Users,
      title: '10,000+ Alumni Network',
      desc: 'Join a thriving global student community studying and working across the USA, UK, Canada, Australia, Germany, and Europe.',
      color: 'text-rose-500',
      bg: 'bg-rose-50'
    }
  ];

  return (
    <div className="bg-[#FAF7F1]">
      {/* Page Header Banner */}
      <PageBanner
        breadcrumbs={[{ label: 'About Us' }]}
        badge="WHO WE ARE & OUR STORY"
        badgeIcon={<Target className="w-3.5 h-3.5 text-[#D99A35]" />}
        title="Empowering Global Aspirations with Trusted Guidance"
        highlightWord="Trusted Guidance"
        description="Masters Visa is a premier global education consultancy dedicated to transforming overseas academic dreams into successful international careers across 35+ countries."
      />

      {/* Stats Bar */}
      <div className="pt-8">
        <StatsBar />
      </div>

      {/* Core Why Choose Us Section */}
      <WhyChooseUs onOpenCounselling={() => onOpenCounselling()} />

      {/* Our Guiding Values & Commitments */}
      <section className="py-16 sm:py-20 bg-white border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#64748B] block mb-2">
              OUR GUIDING PRINCIPLES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#10243F] font-serif tracking-tight">
              Why Students & Parents <span className="text-[#D99A35] font-serif">Trust Us</span>
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] mt-3">
              We uphold the highest ethical standards in foreign education advising, putting student welfare and transparent admissions first.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FAF7F1] rounded-2xl p-6 border border-slate-200/80 hover:border-[#D99A35]/50 hover:shadow-card transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl ${v.bg} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}>
                      <Icon className={`w-6 h-6 ${v.color}`} />
                    </div>
                    <h3 className="text-base font-bold text-[#10243F] mb-2 group-hover:text-[#D99A35] transition-colors">
                      {v.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-[#10243F]">
                    <CheckCircle2 className="w-4 h-4 text-[#D99A35]" />
                    <span>Verified Standard</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Global University Partners */}
      <Universities onOpenCounselling={() => onOpenCounselling()} />

      {/* 4-Step Process Overview */}
      <JourneyTimeline onOpenCounselling={() => onOpenCounselling()} />

      {/* Sunset Consultation CTA */}
      <FinalCta onOpenCounselling={() => onOpenCounselling()} />
    </div>
  );
};

export default AboutPage;
