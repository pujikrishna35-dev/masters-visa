import React from 'react';
import { Users2, Globe2, Landmark, Award, ShieldCheck } from 'lucide-react';

export const StatsBar: React.FC = () => {
  const stats = [
    {
      value: '10,000+',
      label: 'Students Guided',
      icon: Users2,
      color: 'text-amber-500',
      bg: 'bg-amber-50'
    },
    {
      value: '35+',
      label: 'Countries',
      icon: Globe2,
      color: 'text-orange-500',
      bg: 'bg-orange-50'
    },
    {
      value: '1,200+',
      label: 'Partner Universities',
      icon: Landmark,
      color: 'text-brand-coral',
      bg: 'bg-rose-50'
    },
    {
      value: '95%',
      label: 'Visa Success Rate',
      icon: Award,
      color: 'text-amber-500',
      bg: 'bg-amber-50'
    },
    {
      value: 'End-to-End',
      label: 'Support',
      icon: ShieldCheck,
      color: 'text-brand-coral',
      bg: 'bg-rose-50'
    }
  ];

  return (
    <section className="relative z-20 -mt-2 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-card border border-slate-100 p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-4 divide-y sm:divide-y-0 lg:divide-x divide-slate-100">
            {stats.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3.5 sm:gap-4 ${
                    idx !== 0 ? 'pt-4 sm:pt-0 lg:pl-6' : ''
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                      {item.value}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium whitespace-nowrap">
                      {item.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
