import React from 'react';

import { Link } from 'react-router-dom';

import { 

  GraduationCap, 

  FileText, 

  FolderCheck, 

  BarChart2, 

  PlaneTakeoff, 

  Car,
  Home,
  Briefcase,

  Clock,

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

      description: 'Get expert guidance on university selection, course applications, admission requirements, and offer letters.',

      icon: GraduationCap,

    },

    {

      id: 'visa',

      title: 'Student Visa Assistance',

      description: 'Step-by-step guidance on visa documentation, financial proofs, official submissions, and mock drills.',

      icon: FileText,

    },

    {

      id: 'document',

      title: 'Documentation & SOP Guidance',

      description: 'Professional review for SOPs, LORs, academic CVs, document checklists, and application paperwork.',

      icon: FolderCheck,

    },

    {

      id: 'counselling',

      title: 'Career & Course Counselling',

      description: 'Find tailored courses and universities aligned with your profile, academic score, and global career vision.',

      icon: BarChart2,

    },

    {

      id: 'predeparture',

      title: 'Pre-Departure Support',

      description: 'Comprehensive travel checklists, currency exchange, cultural orientation, and arrival preparation.',

      icon: PlaneTakeoff,

    },

    {

      id: 'airport-pickup',
      title: 'Airport Pickup',
      description: 'Guaranteed safe airport reception, luggage assistance, and direct airport transfer upon arrival.',
      icon: Car,
    },
    {
      id: 'accommodation',
      title: 'Accommodation',
      description: 'Safe transit to verified pre-inspected student housing, tenancy verification, and move-in support.',
      icon: Home,
    },

    {

      id: 'corporate-internships',

      title: 'Corporate Internships & Co-op',

      description: 'Vetted global corporate internships, CPT/co-op guidance, ATS resume optimization, and interview drills.',

      icon: Briefcase,

    },

    {

      id: 'part-time-jobs',

      title: 'Part-Time Jobs & Work Rights',

      description: 'Official student work authorization rules, on-campus jobs, SSN/NIN setup, and job search strategies.',

      icon: Clock,

    },

  ];

  return (

    <section id="services" className="py-16 sm:py-24 bg-[#EDF4FF]/60 relative overflow-hidden text-[#172344]">

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-14 gap-6">

          <div className="max-w-xl text-left">

            <div className="flex items-center gap-2 mb-2">

              <span className="text-[11.5px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#63718E]">

                OUR SERVICES

              </span>

              <span className="w-8 h-[2px] bg-[#0755F5] rounded-full inline-block" />

            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#101E49] tracking-tight">

              Complete Support<br />

              at <span className="text-gradient-blue bg-gradient-to-r from-[#0755F5] to-[#0877FF] bg-clip-text text-transparent">Every Step</span>

            </h2>

          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-left md:text-right">

            <p className="text-xs sm:text-sm text-[#63718E] max-w-xs leading-relaxed">

              From choosing the right university to landing and settling abroad, our mentors support you end-to-end.

            </p>

            <Link

              to="/services"

              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#DCE7FA] hover:border-[#0755F5] bg-white hover:bg-[#EDF4FF] text-[#101E49] hover:text-[#0755F5] text-xs sm:text-sm font-bold transition-all shadow-xs group self-start sm:self-center cursor-pointer"

            >

              <span>View All Services</span>

              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />

            </Link>

          </div>

        </div>

        {/* 8 Modern White Cards Grid with Electric Blue Accents */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

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

                className="group relative bg-white rounded-2xl p-5 sm:p-6 border border-[#DCE7FA] hover:border-[#0755F5]/50 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1.5 active:scale-[0.99] select-none min-h-[220px] text-left"

              >

                <div>

                  {/* Top: Icon + Arrow */}

                  <div className="flex items-center justify-between mb-5">

                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0755F5] to-[#0877FF] shadow-md shadow-[#0755F5]/25 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform text-white">

                      <Icon className="w-6 h-6 stroke-[2.2]" />

                    </div>

                    <div className="w-8 h-8 rounded-full bg-[#EDF4FF] border border-[#DCE7FA] flex items-center justify-center text-[#0755F5] group-hover:bg-[#0755F5] group-hover:text-white group-hover:border-transparent transition-all">

                      <ArrowRight className="w-3.5 h-3.5" />

                    </div>

                  </div>

                  {/* Title & Description */}

                  <h3 className="text-base font-bold text-[#101E49] group-hover:text-[#0755F5] transition-colors mb-2">

                    {service.title}

                  </h3>

                  <p className="text-xs sm:text-[13px] text-[#63718E] leading-relaxed font-normal">

                    {service.description}

                  </p>

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </section>

  );

};

