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
      color: 'text-[#0755F5]',
      bg: 'bg-blue-100/70'
    },
    {
      icon: HeartHandshake,
      title: 'End-to-End Handholding',
      desc: 'From initial shortlisting and SOP refinement to mock consular interviews and free airport pickup, we stay by your side until you are settled in your dorm.',
      color: 'text-purple-600',
      bg: 'bg-purple-100/70'
    },
    {
      icon: Award,
      title: '95%+ Visa Success',
      desc: 'Our visa dossiers are rigorously checked by seasoned counselors with country-specific mock interviews and financial documentation audits.',
      color: 'text-emerald-600',
      bg: 'bg-emerald-100/70'
    },
    {
      icon: Users,
      title: '10,000+ Alumni Network',
      desc: 'Join a thriving global student community studying and working across the USA, UK, Canada, Australia, Germany, and Europe.',
      color: 'text-amber-600',
      bg: 'bg-amber-100/70'
    }
  ];

  return (
    <div className="bg-[#EDF4FF]">
      {/* Page Header Banner */}
      <PageBanner
        breadcrumbs={[{ label: 'About Us' }]}
        badge="WHO WE ARE & OUR STORY"
        badgeIcon={<Target className="w-3.5 h-3.5 text-[#0755F5]" />}
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
      <section className="py-16 sm:py-20 bg-white border-y border-[#DCE7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#63718E] block mb-2">
              OUR GUIDING PRINCIPLES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#101E49] tracking-tight">
              Why Students & Parents <span className="bg-gradient-to-r from-[#0755F5] to-[#0877FF] bg-clip-text text-transparent font-extrabold">Trust Us</span>
            </h2>
            <p className="text-sm sm:text-base text-[#63718E] mt-3">
              We uphold the highest ethical standards in foreign education advising, putting student welfare and transparent admissions first.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#EDF4FF]/50 rounded-3xl p-6 border border-[#DCE7FA] hover:border-[#0755F5]/60 hover:shadow-card transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl ${v.bg} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}>
                      <Icon className={`w-6 h-6 ${v.color}`} />
                    </div>
                    <h3 className="text-base font-bold text-[#101E49] mb-2 group-hover:text-[#0755F5] transition-colors">
                      {v.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#63718E] leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-[#DCE7FA] flex items-center gap-1.5 text-xs font-semibold text-[#101E49]">
                    <CheckCircle2 className="w-4 h-4 text-[#0755F5]" />
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
