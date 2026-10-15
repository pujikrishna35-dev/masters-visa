import React from 'react';
import { 
  MessageSquare, 
  Landmark, 
  FileCheck2, 
  PlaneTakeoff,
  Plane
} from 'lucide-react';

interface Props {
  onOpenCounselling?: () => void;
}

export const JourneyTimeline: React.FC<Props> = ({ onOpenCounselling }) => {
  const steps = [
    {
      step: '01',
      title: 'Free Consultation',
      desc: 'Discuss your goals with our experts',
      icon: MessageSquare,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      step: '02',
      title: 'University Shortlisting',
      desc: 'Get the best matching universities',
      icon: Landmark,
      color: 'text-cyan-600',
      bg: 'bg-cyan-50',
    },
    {
      step: '03',
      title: 'Application & Visa',
      desc: 'Complete guidance and support',
      icon: FileCheck2,
      color: 'text-teal-600',
      bg: 'bg-teal-50',
    },
    {
      step: '04',
      title: 'Fly to Your Dream',
      desc: 'Begin your global journey with confidence',
      icon: PlaneTakeoff,
      color: 'text-[#FF783E]',
      bg: 'bg-orange-50',
    },
  ];

  return (
    <section id="journey" className="py-16 sm:py-20 bg-[#FAF7F1] relative overflow-hidden">
      <span id="process" className="sr-only" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Header */}
          <div className="lg:col-span-4 text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#64748B]">
                HOW IT WORKS
              </span>
              <span className="w-8 h-[2px] bg-[#D99A35] rounded-full inline-block" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#10243F] tracking-tight font-serif leading-tight">
              Your Global Journey<br />
              <span className="text-[#D99A35] font-serif">in 4 Simple Steps</span>
            </h2>
            <p className="text-sm text-[#64748B] mt-3 leading-relaxed max-w-sm">
              Our structured 4-step framework takes you smoothly from initial consultation to campus arrival.
            </p>
          </div>

          {/* Right 4 Steps with connecting dashed flight trail */}
          <div className="lg:col-span-8 relative">
            {/* Curved Dotted Flight Trail SVG */}
            <div className="hidden sm:block absolute top-10 left-8 right-8 h-8 pointer-events-none z-0">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 600 30" fill="none">
                <path
                  d="M 10 15 Q 150 5 300 15 T 590 15"
                  stroke="#CBD5E1"
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                />
              </svg>
              {/* Mini Airplane sitting on the path */}
              <div className="absolute -top-3 right-20 transform -rotate-12 text-[#D99A35]">
                <Plane className="w-5 h-5 fill-[#D99A35]" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-4 relative z-10">
              {steps.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.step}
                    role="button"
                    tabIndex={0}
                    onClick={() => onOpenCounselling && onOpenCounselling()}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onOpenCounselling && onOpenCounselling();
                      }
                    }}
                    className="flex flex-col items-center sm:items-start text-center sm:text-left group cursor-pointer"
                  >
                    {/* Circle Node */}
                    <div className="relative mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-white shadow-soft border border-slate-200/80 flex items-center justify-center group-hover:scale-110 group-hover:border-[#D99A35] group-hover:shadow-card transition-all duration-200">
                        <Icon className="w-7 h-7 text-[#1769AA] group-hover:text-[#D99A35] transition-colors stroke-[1.8]" />
                      </div>
                    </div>

                    {/* Step badge + Title */}
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-4 h-4 rounded-full bg-[#D99A35] text-white text-[9px] font-extrabold flex items-center justify-center shrink-0">
                        &gt;
                      </span>
                      <span className="text-xs font-black text-[#10243F] tracking-wide">
                        {item.step}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-[#10243F] group-hover:text-[#D99A35] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#64748B] mt-1 leading-relaxed max-w-[160px]">
                      {item.desc}
                    </p>
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
