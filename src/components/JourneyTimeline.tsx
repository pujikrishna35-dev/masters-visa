import React from 'react';
import { 
  Compass, 
  UserCheck, 
  BookMarked, 
  Building2, 
  Send, 
  MailCheck, 
  Stamp, 
  Plane, 
  Award, 
  PlaneTakeoff 
} from 'lucide-react';
import { JOURNEY_STEPS } from '../data/content';

export const JourneyTimeline: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass': return Compass;
      case 'UserCheck': return UserCheck;
      case 'BookMarked': return BookMarked;
      case 'Building2': return Building2;
      case 'Send': return Send;
      case 'MailCheck': return MailCheck;
      case 'Stamp': return Stamp;
      case 'Plane': return Plane;
      case 'Award': return Award;
      default: return Compass;
    }
  };

  return (
    <section className="py-16 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1 block">
            YOUR JOURNEY WITH US
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            From <span className="text-blue-600 font-serif italic">Dream</span> to Destination
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            A simple and guided process to help you study abroad.
          </p>
        </div>

        {/* Desktop / Tablet Timeline (Horizontal with curved flight path line) */}
        <div className="relative hidden md:block">
          {/* Subtle curved dotted flight trail SVG connecting all 9 points */}
          <div className="absolute top-9 left-6 right-6 h-10 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 40" fill="none">
              <path
                d="M 20 20 Q 250 5 500 20 T 980 20"
                stroke="#E2E8F0"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
            </svg>
            {/* Mini airplane sitting on the path near step 7 */}
            <div className="absolute top-2 right-1/4 transform translate-x-4 -rotate-12 text-brand-coral">
              <PlaneTakeoff className="w-5 h-5 fill-brand-coral" />
            </div>
          </div>

          <div className="grid grid-cols-9 gap-2 relative z-10">
            {JOURNEY_STEPS.map((item, idx) => {
              const Icon = getIcon(item.icon);
              return (
                <div key={idx} className="flex flex-col items-center text-center group cursor-default">
                  {/* Circle Numbered Node */}
                  <div className="relative mb-3">
                    <div className="w-14 h-14 rounded-full bg-white border-2 border-slate-200 group-hover:border-brand-coral shadow-sm group-hover:shadow-md flex items-center justify-center transition-all duration-300">
                      <Icon className="w-6 h-6 text-brand-coral group-hover:scale-110 transition-transform" />
                    </div>
                    {/* Small Step Badge */}
                    <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                      <span className="bg-slate-100 group-hover:bg-brand-coral text-slate-600 group-hover:text-white text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors border border-slate-200 group-hover:border-brand-coral">
                        {item.step}
                      </span>
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-xs font-bold text-brand-navy group-hover:text-brand-coral transition-colors mt-2">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 px-1">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="md:hidden space-y-4 relative pl-6 before:absolute before:top-4 before:bottom-4 before:left-8 before:w-0.5 before:bg-slate-200 before:border-dashed">
          {JOURNEY_STEPS.map((item, idx) => {
            const Icon = getIcon(item.icon);
            return (
              <div key={idx} className="relative flex items-start gap-4 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-white border border-brand-coral/40 flex items-center justify-center shrink-0 shadow-sm z-10">
                  <Icon className="w-5 h-5 text-brand-coral" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold bg-brand-coral text-white px-1.5 py-0.5 rounded-md">
                      {item.step}
                    </span>
                    <h3 className="text-xs font-bold text-brand-navy">{item.title}</h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
