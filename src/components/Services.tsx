import React from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  FileCheck, 
  BadgePercent, 
  Users, 
  Stamp, 
  Compass, 
  Briefcase, 
  ArrowRight 
} from 'lucide-react';
import { SERVICES } from '../data/content';
import type { Service } from '../types';

interface Props {
  onOpenCounselling: () => void;
}

export const Services: React.FC<Props> = ({ onOpenCounselling }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return GraduationCap;
      case 'BookOpen': return BookOpen;
      case 'FileCheck': return FileCheck;
      case 'BadgePercent': return BadgePercent;
      case 'Users': return Users;
      case 'Stamp': return Stamp;
      case 'Compass': return Compass;
      case 'Briefcase': return Briefcase;
      default: return GraduationCap;
    }
  };

  return (
    <section id="services" className="py-14 bg-brand-bg-subtle/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
              OUR SERVICES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
              Complete Support for Your{' '}
              <span className="text-brand-coral font-serif italic">
                Global Education
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-2xl">
              From career counselling to visa guidance, we're with you at every important step.
            </p>
          </div>

          <button
            onClick={onOpenCounselling}
            className="text-sm font-bold text-brand-navy hover:text-brand-coral flex items-center gap-1.5 transition-colors group self-start md:self-auto"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 8 Cards Grid (2 rows of 4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service: Service) => {
            const Icon = getIcon(service.iconName);
            return (
              <div
                key={service.id}
                onClick={onOpenCounselling}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft hover:shadow-card-hover transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Icon badge */}
                  <div className={`w-12 h-12 rounded-2xl ${service.badgeBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${service.badgeColor}`} />
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-base font-bold text-brand-navy group-hover:text-brand-coral transition-colors mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Sub Features bullet points */}
                {service.features && (
                  <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between text-[11px] font-semibold text-slate-400 group-hover:text-brand-coral transition-colors">
                    <span>Explore service</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
