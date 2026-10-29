import React, { useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck,
  Briefcase,
  Clock,
  GraduationCap,
  FileText,
  FolderCheck,
  BarChart2,
  PlaneTakeoff,
  Car,
  BookOpen,
  BadgePercent,
  UserCheck
} from 'lucide-react';
import type { Service } from '../types';

interface Props {
  service: Service | null;
  onClose: () => void;
  onBookCounselling: (serviceTitle: string) => void;
}

const SERVICE_ICONS: Record<string, React.ElementType> = {
  Briefcase,
  Clock,
  GraduationCap,
  FileText,
  FolderCheck,
  BarChart2,
  PlaneTakeoff,
  Car,
  Home: Car,
  BookOpen,
  BadgePercent,
  UserCheck,
  Sparkles,
};

export const ServiceDetailModal: React.FC<Props> = ({ service, onClose, onBookCounselling }) => {
  useEffect(() => {
    if (!service) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [service, onClose]);

  if (!service) return null;

  const IconComponent = service.iconName ? SERVICE_ICONS[service.iconName] : null;

  const headerGradient = 'bg-gradient-to-r from-[#101E49] via-[#1E3A8A] to-[#101E49]';

  const badgeStyle = 'bg-[#EDF4FF] text-[#0755F5] border-[#DCE7FA]';
  const checkColor = 'text-[#0755F5]';
  const stepBadgeStyle = 'bg-[#EDF4FF] text-[#0755F5] border-[#DCE7FA]';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#101E49]/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${service.title} Details`}
    >
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-floating border border-[#DCE7FA] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className={`${headerGradient} p-6 text-white relative transition-colors`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 mb-2">
              {IconComponent && (
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${badgeStyle} shrink-0`}>
                  <IconComponent className="w-3.5 h-3.5" />
                </div>
              )}
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wider ${badgeStyle}`}>
                <Sparkles className="w-3.5 h-3.5" /> MasterVisa Core Service
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              aria-label="Close service details"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 pointer-events-none" />
            </button>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            {service.title}
          </h3>
          <p className="text-xs sm:text-sm text-blue-200 mt-1.5 max-w-xl leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Section 1: What this service includes */}
          {service.includes && service.includes.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#101E49] mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0755F5]" /> What This Service Includes
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {service.includes.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 bg-[#EDF4FF]/50 rounded-2xl border border-[#DCE7FA] text-xs font-semibold text-[#172344]"
                  >
                    <CheckCircle2 className={`w-4 h-4 ${checkColor} shrink-0 mt-0.5`} />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: Step-by-Step Process */}
          {service.steps && service.steps.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#101E49] mb-3">
                Simple Step-by-Step Process
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.steps.map((st) => (
                  <div
                    key={st.step}
                    className="p-3.5 bg-slate-50 rounded-2xl border border-[#DCE7FA] flex items-start gap-3"
                  >
                    <span className={`w-7 h-7 rounded-full font-bold text-xs flex items-center justify-center shrink-0 border ${stepBadgeStyle}`}>
                      {st.step}
                    </span>
                    <div>
                      <h5 className="text-xs font-bold text-[#101E49] mb-0.5">{st.title}</h5>
                      <p className="text-[11px] text-[#63718E] leading-relaxed">{st.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: MasterVisa Guidance Reassurance */}
          <div className="p-4 bg-[#EDF4FF] rounded-2xl border border-[#DCE7FA]">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#0755F5] mb-1">
              Personalized 1-on-1 Mentorship
            </h5>
            <p className="text-xs text-[#63718E] leading-relaxed">
              Every applicant is paired with an experienced overseas education advisor to review your profile, avoid common pitfalls, and guide you through each stage with transparent support.
            </p>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 sm:p-6 border-t border-[#DCE7FA] bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#63718E] text-center sm:text-left">
            Have questions about this service? Speak with our senior counselor.
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              onBookCounselling(service.title);
            }}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#0755F5] via-[#2563EB] to-[#0877FF] hover:opacity-95 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-[#0755F5]/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Book a Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
