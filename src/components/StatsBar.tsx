import React from 'react';
import { Users2, Globe2, Landmark, Award, ShieldCheck } from 'lucide-react';

export const StatsBar: React.FC = () => {
  const stats = [
    {
      value: '10K+',
      label: 'Students Guided',
      icon: Users2,
      color: 'text-purple-600',
      bg: 'bg-purple-100/70'
    },
    {
      value: '500+',
      label: 'Partner Universities',
      icon: Landmark,
      color: 'text-[#0755F5]',
      bg: 'bg-blue-100/70'
    },
    {
      value: '95%',
      label: 'Visa Success Rate',
      icon: ShieldCheck,
      color: 'text-emerald-600',
      bg: 'bg-emerald-100/70'
    },
    {
      value: '15+',
      label: 'Years of Experience',
      icon: Award,
      color: 'text-amber-600',
      bg: 'bg-amber-100/70'
    },
    {
      value: '35+',
      label: 'Countries Guided',
      icon: Globe2,
      color: 'text-sky-600',
      bg: 'bg-sky-100/70'
    }
  ];

  return (
    <section className="relative z-20 -mt-2 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-glass border border-[#DCE7FA] p-4 sm:p-6 lg:p-7">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-6 gap-x-4 sm:gap-6 lg:gap-0 lg:divide-x lg:divide-[#DCE7FA]">
            {stats.map((item, idx) => {
              const Icon = item.icon;
              const isLastOdd = idx === 4;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3.5 sm:gap-4 lg:px-5 ${
                    isLastOdd ? 'col-span-2 sm:col-span-1 justify-center sm:justify-start' : ''
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full ${item.bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#101E49] tracking-tight">
                      {item.value}
                    </h3>
                    <p className="text-xs text-[#63718E] font-medium whitespace-nowrap">
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
