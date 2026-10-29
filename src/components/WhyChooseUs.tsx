import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { WHY_CHOOSE_ITEMS } from '../data/content';

interface Props {
  onOpenCounselling: () => void;
}

export const WhyChooseUs: React.FC<Props> = ({ onOpenCounselling }) => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <span id="why-us" className="sr-only" />
      <span id="scholarships" className="sr-only" />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Premium Multi-Photo Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative grid grid-cols-2 gap-4">
              
              {/* Photo 1: Indian/International Students collaborating */}
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden shadow-card border border-[#DCE7FA] h-52 sm:h-64 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
                    alt="Students group study and counselling"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>

                {/* Photo 2: Graduate in cap and gown with diploma */}
                <div className="rounded-3xl overflow-hidden shadow-card border border-[#DCE7FA] h-40 sm:h-48 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80"
                    alt="Successful University Graduate"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </div>

              {/* Photo 3 & 4 (Shifted vertically) */}
              <div className="space-y-4 pt-6 sm:pt-8">
                {/* Photo 3: Online Counselling / Video Session */}
                <div className="rounded-3xl overflow-hidden shadow-card border border-[#DCE7FA] h-40 sm:h-48 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=600&q=80"
                    alt="Mentorship and Online Counselling Session"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>

                {/* Photo 4: International Historic Campus */}
                <div className="rounded-3xl overflow-hidden shadow-card border border-[#DCE7FA] h-52 sm:h-64 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80"
                    alt="Prestigious University Campus"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </div>

              {/* Central Floating Badge (Guiding Global Futures) */}
              <div className="absolute -top-4 -right-2 sm:right-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-floating border border-[#DCE7FA] z-10 rotate-3 pointer-events-none">
                <span className="font-handwriting text-xl sm:text-2xl font-bold text-[#101E49] leading-none">
                  Guiding <br />
                  <span className="text-[#0755F5]">Global Futures ✨</span>
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Checklist & Copy */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11.5px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#63718E]">
                  WHY CHOOSE MASTERS VISA
                </span>
                <span className="w-8 h-[2px] bg-[#0755F5] rounded-full inline-block" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#101E49] tracking-tight leading-tight">
                More Than Counselling. <br />
                <span className="text-gradient-blue bg-gradient-to-r from-[#0755F5] to-[#0877FF] bg-clip-text text-transparent">
                  A Partner in Your Dreams.
                </span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#63718E] leading-relaxed">
              We are committed to turning your global education dreams into reality with personalized guidance, scholarship assistance, and end-to-end relocation support.
            </p>

            {/* Checklist: 2 Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3.5 pt-2">
              {WHY_CHOOSE_ITEMS.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#EDF4FF] border border-[#DCE7FA] flex items-center justify-center shrink-0 text-[#0755F5]">
                    <CheckCircle2 className="w-4 h-4 text-[#0755F5]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#101E49]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={onOpenCounselling}
                className="px-8 py-3.5 bg-gradient-to-r from-[#0755F5] to-[#0877FF] hover:from-[#0544C7] hover:to-[#0766E6] text-white text-sm font-bold rounded-full shadow-md shadow-[#0755F5]/30 hover:shadow-lg hover:shadow-[#0755F5]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all inline-flex items-center gap-2 group cursor-pointer"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
