export interface ServiceFilterCategory {

  id: string;

  label: string;

  iconName: 'LayoutGrid' | 'GraduationCap' | 'Coins' | 'FileText' | 'Plane' | 'Briefcase';

}

export interface ServiceCardData {

  id: string;

  title: string;

  category: 'admissions' | 'finance' | 'visa' | 'arrival' | 'internships';

  badgeLabel: string;

  badgeStyle: {

    bg: string;

    text: string;

    border: string;

    icon: string;

  };

  description: string;

  checklist: string[];

  illustration?: string;

  iconFallback?: 'Compass' | 'Building2' | 'FileCheck' | 'GraduationCap' | 'Banknote' | 'ShieldCheck' | 'PlaneTakeoff' | 'Car' | 'Briefcase' | 'Clock' | 'Home';

}

export const SERVICE_FILTER_CATEGORIES: ServiceFilterCategory[] = [

  { id: 'all', label: 'All 360° Services', iconName: 'LayoutGrid' },

  { id: 'admissions', label: 'Admissions Strategy', iconName: 'GraduationCap' },

  { id: 'finance', label: 'Financial Solutions', iconName: 'Coins' },

  { id: 'visa', label: 'Visa & Relocation', iconName: 'FileText' },

  { id: 'arrival', label: 'Arrival & Settlement', iconName: 'Plane' },

  { id: 'internships', label: 'Internships & Part-time Jobs', iconName: 'Briefcase' },

];

export const SERVICES_DATA: ServiceCardData[] = [

  // 1. Admissions Strategy

  {

    id: 'career-counselling',

    title: 'Career Counselling',

    category: 'admissions',

    badgeLabel: 'ADMISSIONS STRATEGY',

    badgeStyle: {

      bg: 'bg-amber-50',

      text: 'text-amber-800',

      border: 'border-amber-200/80',

      icon: 'text-amber-600'

    },

    description: 'Align your passions with high-growth international career opportunities.',

    checklist: [

      'Psychometric aptitude and skill gap evaluation',

      'Course alignment with global demand',

      'Personalized career roadmap'

    ],

    illustration: '/images/service-ill-counselling.png',

    iconFallback: 'Compass'

  },

  {

    id: 'university-selection',

    title: 'University Selection',

    category: 'admissions',

    badgeLabel: 'ADMISSIONS STRATEGY',

    badgeStyle: {

      bg: 'bg-amber-50',

      text: 'text-amber-800',

      border: 'border-amber-200/80',

      icon: 'text-amber-600'

    },

    description: 'Data-driven university shortlisting with balanced risk-reward ratios.',

    checklist: [

      'Shortlist 8-12 verified global universities',

      'Compare tuition fees, cost of living and scholarships',

      'Program accreditation and industry recognition'

    ],

    illustration: '/images/service-ill-university.png',

    iconFallback: 'Building2'

  },

  {

    id: 'application-assistance',

    title: 'Application Assistance',

    category: 'admissions',

    badgeLabel: 'ADMISSIONS STRATEGY',

    badgeStyle: {

      bg: 'bg-blue-50',

      text: 'text-[#0755F5]',

      border: 'border-[#DCE7FA]',

      icon: 'text-[#0755F5]'

    },

    description: 'Transform your application from ordinary to extraordinary.',

    checklist: [

      'SOP polishing and expert review',

      'CV optimization and document checklist',

      'Fast-track submission with fee waivers'

    ],

    illustration: '/images/service-ill-application.png',

    iconFallback: 'FileCheck'

  },

  // 2. Financial Solutions

  {

    id: 'scholarships-guidance',

    title: 'Scholarships Guidance',

    category: 'finance',

    badgeLabel: 'FINANCIAL SUPPORT',

    badgeStyle: {

      bg: 'bg-amber-50',

      text: 'text-amber-800',

      border: 'border-amber-200/80',

      icon: 'text-amber-600'

    },

    description: 'Make your global education affordable through targeted financial grants.',

    checklist: [

      'Scholarship eligibility audit',

      'Essay drafting and review',

      'Early-bird application submission'

    ],

    illustration: '/images/service-ill-scholarship.png',

    iconFallback: 'GraduationCap'

  },

  {

    id: 'education-loans',

    title: 'Education Loans',

    category: 'finance',

    badgeLabel: 'FINANCIAL SUPPORT',

    badgeStyle: {

      bg: 'bg-amber-50',

      text: 'text-amber-800',

      border: 'border-amber-200/80',

      icon: 'text-amber-600'

    },

    description: 'Fast, transparent education financing with lowest interest rates.',

    checklist: [

      'Collateral and non-collateral loan options',

      'Loans up to ₹2 Crore+ at concessional rates',

      'Pre-visa sanction letters from partner banks'

    ],

    illustration: '/images/service-ill-loans.png',

    iconFallback: 'Banknote'

  },

  // 3. Visa & Relocation

  {

    id: 'visa-assistance',

    title: 'Visa Assistance',

    category: 'visa',

    badgeLabel: 'VISA & IMMIGRATION',

    badgeStyle: {

      bg: 'bg-emerald-50',

      text: 'text-emerald-800',

      border: 'border-emerald-200/80',

      icon: 'text-emerald-600'

    },

    description: 'Navigate complex immigration regulations with total confidence.',

    checklist: [

      'Complete visa documentation support',

      'Mock embassy interview preparation',

      'Funds audit and compliance filing'

    ],

    illustration: '/images/service-ill-visa.png',

    iconFallback: 'ShieldCheck'

  },

  // 4. Arrival & Settlement

  {

    id: 'predeparture',

    title: 'Pre-Departure Support',

    category: 'arrival',

    badgeLabel: 'ARRIVAL & SETTLEMENT',

    badgeStyle: {

      bg: 'bg-sky-50',

      text: 'text-sky-800',

      border: 'border-sky-200/80',

      icon: 'text-sky-600'

    },

    description: 'Comprehensive travel checklists, currency exchange, cultural orientation, and arrival preparation.',

    checklist: [

      'Packing & essential travel documentation check',

      'Forex currency exchange & international student card',

      'Cultural briefing & pre-arrival checklist'

    ],

    iconFallback: 'PlaneTakeoff'

  },

  {

    id: 'airport-pickup',

    title: 'Airport Pickup',

    category: 'arrival',

    badgeLabel: 'ARRIVAL & SETTLEMENT',

    badgeStyle: {

      bg: 'bg-sky-50',

      text: 'text-sky-800',

      border: 'border-sky-200/80',

      icon: 'text-sky-600'

    },

    description: 'Guaranteed safe airport reception, luggage assistance, and direct transit upon arrival.',

    checklist: [

      'Airport meet & greet with designated escort',

      'Luggage assistance & safe airport transit',

      'Local SIM card & transit pass activation'

    ],

    iconFallback: 'Car'

  },

  {

    id: 'accommodation',

    title: 'Accommodation',

    category: 'arrival',

    badgeLabel: 'ARRIVAL & SETTLEMENT',

    badgeStyle: {

      bg: 'bg-sky-50',

      text: 'text-sky-800',

      border: 'border-sky-200/80',

      icon: 'text-sky-600'

    },

    description: 'Safe transit to verified pre-inspected student housing and hassle-free relocation settlement.',

    checklist: [

      'Verified pre-inspected student dorms & apartments',

      'Tenancy contract verification & deposit assistance',

      'Move-in coordination & neighborhood amenities guide'

    ],

    iconFallback: 'Home'

  },

  // 5. Internships & Part-time Jobs

  {

    id: 'corporate-internships',

    title: 'Corporate Internships & Co-op',

    category: 'internships',

    badgeLabel: 'INTERNSHIPS & WORK RIGHTS',

    badgeStyle: {

      bg: 'bg-purple-50',

      text: 'text-purple-800',

      border: 'border-purple-200/80',

      icon: 'text-purple-600'

    },

    description: 'Vetted global corporate internships, CPT/co-op guidance, ATS resume optimization, and interview drills.',

    checklist: [

      'CPT/OPT internship application coaching',

      'ATS-friendly international resume building',

      'Technical & behavioral mock interviews'

    ],

    iconFallback: 'Briefcase'

  },

  {

    id: 'part-time-jobs',

    title: 'Part-Time Jobs & Work Rights',

    category: 'internships',

    badgeLabel: 'INTERNSHIPS & WORK RIGHTS',

    badgeStyle: {

      bg: 'bg-purple-50',

      text: 'text-purple-800',

      border: 'border-purple-200/80',

      icon: 'text-purple-600'

    },

    description: 'Official student work authorization rules, on-campus jobs, SSN/NIN setup, and job search strategies.',

    checklist: [

      'In-depth briefing on 20 hrs/week work rules',

      'On-campus job search & application support',

      'Tax ID (SSN/NIN) & local bank setup'

    ],

    iconFallback: 'Clock'

  }

];

export const SERVICE_STATS = [

  {

    id: 'students',

    value: '15,000+',

    label: 'Students Counseled',

    iconName: 'Users',

    iconColor: 'text-[#0755F5]',

    bgColor: 'bg-[#EDF4FF]'

  },

  {

    id: 'visa-rate',

    value: '100%',

    label: 'Visa Success Rate',

    iconName: 'Star',

    iconColor: 'text-amber-500',

    bgColor: 'bg-amber-50'

  },

  {

    id: 'scholarships',

    value: '₹25 Cr+',

    label: 'Scholarships Secured',

    iconName: 'GraduationCap',

    iconColor: 'text-emerald-500',

    bgColor: 'bg-emerald-50'

  },

  {

    id: 'zero-charges',

    value: '100%',

    label: 'Zero Service Charges',

    iconName: 'ShieldCheck',

    iconColor: 'text-purple-500',

    bgColor: 'bg-purple-50'

  }

];

