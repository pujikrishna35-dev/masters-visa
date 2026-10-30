import React from 'react';
import { Users, Building2, FileCheck2, Stamp, PlaneTakeoff } from 'lucide-react';

interface Props {
  onSelectFeature?: (feature: string) => void;
}

export const HeroServiceHighlights: React.FC<Props> = ({ onSelectFeature }) => {
  const features = [
    {
      id: 'counselling',
      line1: 'Personalized',
      line2: 'Counselling',
      icon: Users,
    },
    {
      id: 'shortlisting',
      line1: 'University',
      line2: 'Shortlisting',
      icon: Building2,
    },
    {
      id: 'application',
      line1: 'Application',
      line2: 'Support',
      icon: FileCheck2,
    },
    {
      id: 'visa',
      line1: 'Visa',
      line2: 'Guidance',
      icon: Stamp,
    },
    {
      id: 'predeparture',
      line1: 'Pre-Departure',
      line2: 'Assistance',
      icon: PlaneTakeoff,
    },
  ];

  return (
    <div className="relative z-20 -mt-6 sm:-mt-8 lg:-mt-10 max-w-6xl mx-auto px-4 sm:px-6 mb-10">
      <div className="bg-white rounded-2xl sm:rounded-full shadow-lg shadow-slate-200/50 border border-slate-100 py-3 px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-0 md:divide-x md:divide-slate-100">
          {features.map((item, idx) => {
            const Icon = item.icon;
            const fullTitle = `${item.line1} ${item.line2}`;
            const isLastOdd = idx === 4;
            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelectFeature && onSelectFeature(fullTitle)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectFeature && onSelectFeature(fullTitle);
                  }
                }}
                className={`group flex items-center justify-start md:justify-center gap-3.5 px-3 py-2.5 sm:py-2 hover:bg-orange-50/40 rounded-xl md:rounded-full transition-all duration-200 cursor-pointer select-none ${
                  isLastOdd ? 'col-span-2 md:col-span-1 max-w-xs mx-auto md:max-w-none md:mx-0 w-full' : ''
                }`}
              >
                {/* Circular Orange Icon */}
                <div className="w-11 h-11 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0 text-brand-coral group-hover:scale-105 group-hover:bg-brand-coral group-hover:text-white transition-all duration-200">
                  <Icon className="w-5 h-5 stroke-[1.9]" />
                </div>

                {/* Two-Line Title */}
                <div className="flex flex-col text-left">
                  <span className="text-[13px] sm:text-sm font-bold text-slate-800 leading-tight group-hover:text-brand-coral transition-colors">
                    {item.line1}
                  </span>
                  <span className="text-[13px] sm:text-sm font-bold text-slate-800 leading-tight group-hover:text-brand-coral transition-colors">
                    {item.line2}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
