import React from 'react';
import { 
  GraduationCap, 
  FileText, 
  FolderCheck, 
  BarChart2, 
  PlaneTakeoff, 
  ArrowRight 
} from 'lucide-react';

interface Props {
  onOpenCounselling: (serviceName?: string) => void;
  onSelectService?: (serviceId: string) => void;
}

export const Services: React.FC<Props> = ({ onOpenCounselling, onSelectService }) => {
  const serviceCards = [
    {
      id: 'admissions',
      title: 'University Admissions',
      description: 'Get guidance on university selection, course applications, admission requirements, and offer letters.',
      icon: GraduationCap,
      tileGradient: 'bg-gradient-to-br from-[#1E40AF] to-[#2563EB]',
      tileShadow: 'shadow-blue-900/30',
    },
    {
      id: 'visa',
      title: 'Student Visa Assistance',
      description: 'Get guidance on visa applications, required documents, financial evidence, and interview preparation.',
      icon: FileText,
      tileGradient: 'bg-gradient-to-br from-[#BE123C] to-[#E11D48]',
      tileShadow: 'shadow-rose-900/30',
    },
    {
      id: 'document',
      title: 'Documentation & SOP Guidance',
      description: 'Assistance with SOPs, LORs, CVs, document checklists, and application paperwork.',
      icon: FolderCheck,
      tileGradient: 'bg-gradient-to-br from-[#047857] to-[#059669]',
      tileShadow: 'shadow-emerald-900/30',
    },
    {
      id: 'counselling',
      title: 'Career & Course Counselling',
      description: 'Find suitable courses and universities aligned with your academic background and career goals.',
      icon: BarChart2,
      tileGradient: 'bg-gradient-to-br from-[#5B21B6] to-[#7C3AED]',
      tileShadow: 'shadow-purple-900/30',
    },
    {
      id: 'predeparture',
      title: 'Pre-Departure Support',
      description: 'Prepare for your international journey with travel checklists, accommodation guidance, and practical advice.',
      icon: PlaneTakeoff,
      tileGradient: 'bg-gradient-to-br from-[#0E7490] to-[#0284C7]',
      tileShadow: 'shadow-cyan-900/30',
    },
  ];

  return (
    <section id="services" className="pt-14 pb-0 bg-[#10243F] relative overflow-hidden text-white">
      {/* ── CINEMATIC MOUNTAIN LANDSCAPE BACKGROUND ── */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-screen"
        style={{
          backgroundImage: "url('/services-bg.jpg')",
        }}
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#10243F] via-[#10243F]/85 to-[#10243F] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-16 sm:pb-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-md text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#D99A35]">
                OUR SERVICES
              </span>
              <span className="w-8 h-[2px] bg-[#D99A35] rounded-full inline-block" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight font-serif">
              Complete Support<br />
              at <span className="text-[#D99A35] font-serif italic">Every Step</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-left md:text-right">
            <p className="text-xs sm:text-sm text-slate-300 max-w-xs leading-relaxed">
              From choosing the right university to settling abroad, we are with you throughout your journey.
            </p>
            <button
              onClick={() => onOpenCounselling('All Services')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 hover:border-[#D99A35] bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-all shadow-sm group self-start sm:self-center"
            >
              <span>View All Services</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 5 Glassmorphic Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {serviceCards.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelectService ? onSelectService(service.id) : onOpenCounselling(service.title)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (onSelectService) {
                      onSelectService(service.id);
                    } else {
                      onOpenCounselling(service.title);
                    }
                  }
                }}
                className="group relative bg-[#142C4C]/75 hover:bg-[#18355B] backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-[#D99A35]/50 shadow-lg hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1.5 active:scale-[0.99] select-none min-h-[220px] text-left"
              >
                <div>
                  {/* Top: Icon + Arrow */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl ${service.tileGradient} shadow-md ${service.tileShadow} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform text-white`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:bg-[#D99A35] group-hover:text-white group-hover:border-[#D99A35] transition-all">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-[15px] font-bold text-white group-hover:text-[#D99A35] transition-colors mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-300/90 leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── CURVED WAVE TRANSITION INTO WARM IVORY PROCESS SECTION ── */}
      <div className="relative w-full overflow-hidden leading-none z-10 -mt-1 pointer-events-none">
        <svg
          viewBox="0 0 1440 90"
          fill="none"
          className="w-full h-12 sm:h-16 lg:h-20 block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C380,80 1020,80 1440,10 L1440,90 L0,90 Z"
            fill="#FAF7F1"
          />
        </svg>
      </div>
    </section>
  );
};
