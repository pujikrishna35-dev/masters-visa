import React from 'react';
import { 
  MessageSquare, 
  Landmark, 
  FileCheck2, 
  PlaneTakeoff,
  Plane,
  ArrowRight
} from 'lucide-react';

interface Props {
  onOpenCounselling?: () => void;
}

export const JourneyTimeline: React.FC<Props> = ({ onOpenCounselling }) => {
  const steps = [
    {
      step: '01',
      title: 'Free Consultation',
      desc: 'Discuss your goals with expert international education mentors.',
      icon: MessageSquare,
    },
    {
      step: '02',
      title: 'University Shortlisting',
      desc: 'Get curated university & course recommendations based on your profile.',
      icon: Landmark,
    },
    {
      step: '03',
      title: 'Application & Visa',
      desc: 'Complete SOP review, document verification, and 1-on-1 visa interview drills.',
      icon: FileCheck2,
    },
    {
      step: '04',
      title: 'Fly to Your Future',
      desc: 'Pre-departure briefing, airport pickup, and verified accommodation.',
      icon: PlaneTakeoff,
    },
  ];

  return (
    <section id="journey" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <span id="process" className="sr-only" />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Header */}
          <div className="lg:col-span-4 text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11.5px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#63718E]">
                HOW IT WORKS
              </span>
              <span className="w-8 h-[2px] bg-[#0755F5] rounded-full inline-block" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#101E49] tracking-tight leading-tight">
              Your Global Journey<br />
              <span className="text-gradient-blue bg-gradient-to-r from-[#0755F5] to-[#0877FF] bg-clip-text text-transparent">
                in 4 Simple Steps
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#63718E] mt-3 leading-relaxed max-w-sm">
              Our structured 4-step framework takes you smoothly from initial consultation to campus arrival.
            </p>

            <button
              onClick={() => onOpenCounselling && onOpenCounselling()}
              className="inline-flex items-center gap-2 px-6 py-3 mt-6 bg-gradient-to-r from-[#0755F5] to-[#0877FF] hover:from-[#0544C7] hover:to-[#0766E6] text-white text-xs sm:text-sm font-bold rounded-full shadow-md shadow-[#0755F5]/25 hover:shadow-lg hover:shadow-[#0755F5]/35 hover:-translate-y-0.5 transition-all cursor-pointer group"
            >
              <span>Start Step 1 Now</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Right 4 Steps with connecting dashed flight trail */}
          <div className="lg:col-span-8 relative">
            {/* Curved Dotted Flight Trail SVG */}
            <div className="hidden sm:block absolute top-12 left-10 right-10 h-8 pointer-events-none z-0">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 600 30" fill="none">
                <path
                  d="M 10 15 Q 150 5 300 15 T 590 15"
                  stroke="#DCE7FA"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
              </svg>
              {/* Mini Airplane sitting on the path */}
              <div className="absolute -top-3.5 right-20 transform -rotate-12 text-[#0755F5]">
                <Plane className="w-5 h-5 fill-[#0755F5]" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
              {steps.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.step}
                    role="button"
                    tabIndex={0}
                    onClick={() => onOpenCounselling && onOpenCounselling()}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') onOpenCounselling && onOpenCounselling();
                    }}
                    className="group bg-[#EDF4FF]/40 hover:bg-white rounded-2xl p-5 border border-[#DCE7FA] hover:border-[#0755F5]/50 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between text-left cursor-pointer hover:-translate-y-1.5"
                  >
                    <div>
                      {/* Step Number Badge & Icon */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-black tracking-wider px-2.5 py-1 rounded-full bg-[#EDF4FF] border border-[#DCE7FA] text-[#0755F5]">
                          {item.step}
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0755F5] to-[#0877FF] text-white shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Icon className="w-5 h-5 stroke-[2.2]" />
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-[#101E49] group-hover:text-[#0755F5] transition-colors mb-1.5 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#63718E] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
