import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { Services } from '../components/Services';
import { JourneyTimeline } from '../components/JourneyTimeline';
import { FinalCta } from '../components/FinalCta';
import { 
  Briefcase, 
  Car, 
  Home, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

interface ServicesPageProps {
  onOpenCounselling: (serviceName?: string) => void;
  onSelectServiceById: (serviceId: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onOpenCounselling,
  onSelectServiceById,
}) => {

  return (
    <div className="bg-[#FAF7F1]">
      {/* Page Header Banner */}
      <PageBanner
        breadcrumbs={[{ label: 'Services' }]}
        badge="END-TO-END ADMISSIONS & VISA SUPPORT"
        badgeIcon={<Briefcase className="w-3.5 h-3.5 text-[#D99A35]" />}
        title="Complete Support for Every Step of Your Global Journey"
        highlightWord="Every Step"
        description="Comprehensive global education solutions covering profile assessment, university shortlisting, SOP editing, loan assistance, student visas, and guaranteed post-arrival settlement."
      />

      {/* Main Core Services Grid */}
      <Services
        onOpenCounselling={(svc) => onOpenCounselling(svc)}
        onSelectService={onSelectServiceById}
      />

      {/* Special Signature Spotlight: Airport Pickup & Accommodation */}
      <section className="py-16 sm:py-20 bg-white border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#10243F] via-[#142C4C] to-[#10243F] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-card">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#D99A35]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF7EC] text-[#D99A35] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Unique Master Visa Guarantee</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold font-serif leading-tight">
                  Free Airport Pickup & Guaranteed Student <span className="text-[#D99A35] font-serif">Accommodation</span>
                </h2>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                  Unlike traditional consultancies that end their job once your visa is stamped, Masters Visa stands by you upon landing. Our vetted international network meets you right at the airport terminal and transports you directly to your verified, pre-inspected student accommodation.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-start gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
                    <Car className="w-5 h-5 text-[#D99A35] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Airport Meet & Greet</h4>
                      <p className="text-[11px] text-slate-300">Dedicated representative meets you at international arrivals.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
                    <Home className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Verified Safe Housing</h4>
                      <p className="text-[11px] text-slate-300">Pre-booked furnished dorms & apartments near your campus.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-4">
                  <button
                    onClick={() => onOpenCounselling('Airport Pickup & Accommodation')}
                    className="px-6 py-3 bg-gradient-to-r from-[#D99A35] via-[#E28330] to-[#F16B55] hover:opacity-95 text-white text-xs sm:text-sm font-bold rounded-full shadow-lg shadow-[#D99A35]/30 flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <span>Claim Free Airport Pickup</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onOpenCounselling('Accommodation Booking')}
                    className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-bold rounded-full cursor-pointer transition-all"
                  >
                    Explore Housing Options
                  </button>
                </div>
              </div>

              {/* Right Side Visual Cards */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#D99A35] uppercase">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Post-Arrival Checklist</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-200">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Local SIM Card & Emergency Connectivity</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Bank Account Opening & Student Transit Pass</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Campus Orientation & Course Registration Tour</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Part-time Job Work Rights Briefing & Guidance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Global Journey Roadmap */}
      <JourneyTimeline onOpenCounselling={() => onOpenCounselling()} />

      {/* Final Sunset Call to Action */}
      <FinalCta onOpenCounselling={() => onOpenCounselling()} />
    </div>
  );
};

export default ServicesPage;
