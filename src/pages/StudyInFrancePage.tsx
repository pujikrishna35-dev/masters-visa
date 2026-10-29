import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  Sparkles,
  MapPin,
  Calendar,
  CheckCircle2,
  BookOpen,
  Award,
  GraduationCap,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Clock,
  ChevronDown,
  ChevronUp,
  CheckSquare,
  Square,
  Plane,
  Layers,
  Cpu,
  Briefcase,
  Code2,
  Stethoscope,
  Scale,
  X,
  RotateCw,
  Coins,
  Palette
} from 'lucide-react';
import { FranceEligibilityModal } from '../components/FranceEligibilityModal';
import { UniversityLogo } from '../components/UniversityLogo';
import { DestinationNavBar } from '../components/DestinationNavBar';

interface StudyInFrancePageProps {
  onOpenCounselling?: (destination?: string) => void;
}

interface UniversityItem {
  id: string;
  name: string;
  location: string;
  rankBadge: string;
  rankingSource: string;
  logoType: 'sorbonne' | 'polytechnique' | 'hec' | 'sciencespo' | 'ens' | 'insead';
  categories: string[];
  shortDesc: string;
  image: string;
  tags: string[];
  programs: Array<{
    name: string;
    level: string;
    duration: string;
    pswEligible: boolean;
    tuition: string;
  }>;
}

const CATEGORIES = [
  { id: 'all', label: 'All Institutions', icon: Layers },
  { id: 'business', label: 'Business & Management', icon: Briefcase },
  { id: 'engineering', label: 'Engineering & Tech', icon: Cpu },
  { id: 'cs', label: 'AI & Data Science', icon: Code2 },
  { id: 'humanities', label: 'Politics & Social Sciences', icon: Scale },
  { id: 'medicine', label: 'Medicine & Health', icon: Stethoscope },
  { id: 'arts', label: 'Design & Luxury', icon: Palette },
] as const;

const UNIVERSITIES_DATA: UniversityItem[] = [
  {
    id: 'sorbonne',
    name: 'Sorbonne University',
    location: 'Paris, Île-de-France',
    rankBadge: '#59 Global',
    rankingSource: 'QS World University Rankings 2025 • France Top University',
    logoType: 'sorbonne',
    categories: ['all', 'cs', 'humanities', 'medicine', 'engineering'],
    shortDesc: 'Located in the historic Latin Quarter of Paris, Sorbonne University is renowned worldwide for multidisciplinary excellence spanning artificial intelligence, physics, medicine, and the humanities.',
    image: '/images/france/sorbonne.jpg',
    tags: ['Artificial Intelligence', 'Computational Mechanics', 'Biomedical Science', 'Humanities'],
    programs: [
      { name: 'Master in Computer Science & AI', level: "Master's (Bologna LMD)", duration: '2 Years', pswEligible: true, tuition: '€243 / yr (Public standard)' },
      { name: 'Master in Biomedical Engineering', level: "Master's (Bologna LMD)", duration: '2 Years', pswEligible: true, tuition: '€243 / yr (Public standard)' },
      { name: 'Licence in Mathematics & Computer Science', level: "Bachelor's (Licence)", duration: '3 Years', pswEligible: true, tuition: '€175 / yr (Public standard)' },
      { name: 'Master in Quantum Information Science', level: "Master's (Bologna LMD)", duration: '2 Years', pswEligible: true, tuition: '€243 / yr (Public standard)' },
    ],
  },
  {
    id: 'polytechnique',
    name: 'École Polytechnique (IP Paris)',
    location: 'Palaiseau / Paris-Saclay',
    rankBadge: '#38 Global',
    rankingSource: 'QS World University Rankings 2025 • World #1 Grandes Écoles',
    logoType: 'polytechnique',
    categories: ['all', 'engineering', 'cs'],
    shortDesc: 'France’s premier institution for science and technology (L’X), producing Nobel laureates, Field Medalists, and CEOs of multinational tech conglomerates in the Paris-Saclay innovation cluster.',
    image: '/images/france/polytechnique.jpg',
    tags: ['Applied Mathematics', 'Data Science for Business', 'Aerospace Engineering', 'Energy Systems'],
    programs: [
      { name: 'MSc&T in Data Science For Business (X-HEC)', level: "Master's (Grand École)", duration: '2 Years', pswEligible: true, tuition: '€23,500 / yr' },
      { name: 'Master in Artificial Intelligence & Advanced Visual Computing', level: "Master's (Grand École)", duration: '2 Years', pswEligible: true, tuition: '€15,500 / yr' },
      { name: 'Bachelor of Science (Mathematics & Physics)', level: "Bachelor's (BSc)", duration: '3 Years', pswEligible: true, tuition: '€16,000 / yr' },
      { name: 'Master in Cybersecurity & Threat Intelligence', level: "Master's (Grand École)", duration: '2 Years', pswEligible: true, tuition: '€14,800 / yr' },
    ],
  },
  {
    id: 'hec',
    name: 'HEC Paris',
    location: 'Jouy-en-Josas, Paris Region',
    rankBadge: '#1 European Business',
    rankingSource: 'Financial Times European Business School Ranking 2024',
    logoType: 'hec',
    categories: ['all', 'business', 'cs'],
    shortDesc: 'The undisputed benchmark for European business education, offering world-leading programs in management, quantitative finance, and entrepreneurship on a 300-acre residential campus.',
    image: '/images/france/hec.jpg',
    tags: ['Master in Management (MIM)', 'International Finance', 'Strategic Marketing', 'Sustainability'],
    programs: [
      { name: 'Master in International Management (MIM)', level: "Master's (Grand École)", duration: '2 Years', pswEligible: true, tuition: '€26,500 / yr' },
      { name: 'MSc in International Finance (FT #1 World)', level: "Master's (MSc)", duration: '1 Year', pswEligible: true, tuition: '€39,800 / yr' },
      { name: 'Master of Business Administration (MBA)', level: "MBA", duration: '16 Months', pswEligible: true, tuition: '€98,000 total' },
      { name: 'MSc in Strategic Management', level: "Master's (MSc)", duration: '1 Year', pswEligible: true, tuition: '€34,500 / yr' },
    ],
  },
  {
    id: 'sciencespo',
    name: 'Sciences Po (Paris Institute of Political Studies)',
    location: 'Saint-Germain-des-Prés, Paris',
    rankBadge: '#2 Global Politics',
    rankingSource: 'QS World University Rankings by Subject 2024',
    logoType: 'sciencespo',
    categories: ['all', 'humanities', 'business'],
    shortDesc: 'France’s elite social sciences institution, having trained six French presidents and international diplomats, specializing in public policy, international governance, and global affairs.',
    image: '/images/france/sciencespo.jpg',
    tags: ['International Public Policy', 'Human Rights', 'Global Economics', 'Diplomacy'],
    programs: [
      { name: 'Master in International Public Management', level: "Master's (Grand École)", duration: '2 Years', pswEligible: true, tuition: '€19,500 / yr' },
      { name: 'Master in International Development (PSIA)', level: "Master's (Grand École)", duration: '2 Years', pswEligible: true, tuition: '€19,500 / yr' },
      { name: 'Bachelor of Arts in Social Sciences', level: "Bachelor's (Licence)", duration: '3 Years', pswEligible: true, tuition: '€14,210 / yr' },
      { name: 'Master in Finance and Strategy', level: "Master's (Grand École)", duration: '2 Years', pswEligible: true, tuition: '€19,500 / yr' },
    ],
  },
  {
    id: 'ens',
    name: 'École Normale Supérieure (ENS Ulm - PSL)',
    location: 'Paris, Île-de-France',
    rankBadge: '#24 Global',
    rankingSource: 'QS World Rankings 2025 • Université PSL',
    logoType: 'ens',
    categories: ['all', 'engineering', 'cs', 'humanities'],
    shortDesc: 'A pinnacle of French intellectual tradition, ENS Paris fosters elite research careers across pure mathematics, fundamental physics, philosophy, and classical humanities.',
    image: '/images/france/ens.jpg',
    tags: ['Pure Mathematics', 'Theoretical Physics', 'Cognitive Sciences', 'Philosophy'],
    programs: [
      { name: 'Master in Fundamental Mathematics', level: "Master's (ENS Diploma)", duration: '2 Years', pswEligible: true, tuition: '€243 / yr (Public standard)' },
      { name: 'Master in Cognitive Science (CogMaster)', level: "Master's (ENS Diploma)", duration: '2 Years', pswEligible: true, tuition: '€243 / yr (Public standard)' },
      { name: 'Master in Physics of Complex Systems', level: "Master's (ENS Diploma)", duration: '2 Years', pswEligible: true, tuition: '€243 / yr (Public standard)' },
      { name: 'Doctorate in Theoretical Computer Science', level: "Doctorate (PhD)", duration: '3 Years', pswEligible: true, tuition: '€391 / yr (Salaried contract)' },
    ],
  },
  {
    id: 'insead',
    name: 'INSEAD',
    location: 'Fontainebleau, Greater Paris',
    rankBadge: '#2 Global MBA',
    rankingSource: 'Financial Times Global MBA Rankings 2024',
    logoType: 'insead',
    categories: ['all', 'business'],
    shortDesc: 'Renowned as "The Business School for the World," INSEAD brings together global executives and ambitious postgraduates in a picturesque campus adjacent to the historic Forest of Fontainebleau.',
    image: '/images/france/insead.jpg',
    tags: ['Global MBA', 'Master in Management (MIM)', 'Executive Finance', 'Entrepreneurship'],
    programs: [
      { name: 'Master in Management (MIM)', level: "Master's (MIM)", duration: '14 Months', pswEligible: true, tuition: '€49,500 total' },
      { name: 'Full-time Global MBA', level: "MBA", duration: '10 Months', pswEligible: true, tuition: '€99,500 total' },
      { name: 'Executive Master in Finance (EMFin)', level: "Master's", duration: '18 Months', pswEligible: true, tuition: '€55,000 total' },
    ],
  },
];

export const StudyInFrancePage: React.FC<StudyInFrancePageProps> = ({
  onOpenCounselling,
}) => {
  const [isEligibilityModalOpen, setIsEligibilityModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState<'normal' | 'slow' | 'paused'>('normal');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeUniModal, setActiveUniModal] = useState<UniversityItem | null>(null);

  // Active benefit card for Why Study in France
  const [activeBenefitId, setActiveBenefitId] = useState<string>('prestigious-institutions');

  // Intake Timeline Active Tab
  const [activeIntakeTab, setActiveIntakeTab] = useState<'autumn' | 'spring' | 'pre-sessional'>('autumn');

  // English Proficiency Active Card
  const [activeEnglishCard, setActiveEnglishCard] = useState<'english-taught' | 'french-taught' | 'moi'>('english-taught');

  // Checklist Stage
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({
    0: true,
    1: false,
    2: false,
    3: false,
  });
  const [expandedPrepStage, setExpandedPrepStage] = useState<number>(0);

  const timerRef = useRef<number | null>(null);

  // Filter universities based on selected discipline category
  const filteredUniversities = UNIVERSITIES_DATA.filter((item) =>
    selectedCategory === 'all' ? true : item.categories.includes(selectedCategory)
  );

  // Handle window resize and media motion preferences
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // 3D Orbit Carousel auto-rotation
  useEffect(() => {
    if (!isAutoPlaying || rotationSpeed === 'paused' || prefersReducedMotion) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const interval = rotationSpeed === 'slow' ? 6500 : 4200;
    timerRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredUniversities.length);
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying, rotationSpeed, filteredUniversities.length, prefersReducedMotion]);

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredUniversities.length) % filteredUniversities.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredUniversities.length);
  };

  const toggleStepCompleted = (index: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const totalStepsCompleted = Object.values(completedSteps).filter(Boolean).length;

  const handleOpenConsultation = () => {
    if (onOpenCounselling) {
      onOpenCounselling('France');
    }
  };

  // 3D Orbit card positioning and responsive perspective styling
  const getCard3DStyle = (diff: number) => {
    const isDesktop = windowWidth >= 1024 && windowWidth < 1440;
    const isTablet = windowWidth >= 768 && windowWidth < 1024;
    const isMobile = windowWidth < 768;

    if (prefersReducedMotion) {
      if (diff === 0) {
        return {
          transform: 'translate(-50%, -50%) scale(1)',
          opacity: 1,
          zIndex: 30,
          pointerEvents: 'auto' as const,
          boxShadow: '0 20px 45px -10px rgba(21, 94, 239, 0.2)',
        };
      }
      return {
        transform: `translate(-50%, -50%) translateX(${diff * (isMobile ? 260 : 300)}px) scale(0.85)`,
        opacity: Math.abs(diff) === 1 && !isMobile ? 0.75 : 0,
        zIndex: 20 - Math.abs(diff) * 5,
        pointerEvents: (Math.abs(diff) === 1 && !isMobile ? 'auto' : 'none') as 'auto' | 'none',
      };
    }

    if (diff === 0) {
      return {
        transform: 'translate(-50%, -50%) translate3d(0px, 0px, 40px) rotateY(0deg) scale(1)',
        opacity: 1,
        zIndex: 30,
        boxShadow: '0 20px 50px -10px rgba(21, 94, 239, 0.22), 0 8px 20px -4px rgba(0, 0, 0, 0.04)',
        borderColor: '#155EEF',
        pointerEvents: 'auto' as const,
      };
    }

    if (isMobile) {
      return {
        transform: `translate(-50%, -50%) translateX(${diff * 280}px) scale(0.85)`,
        opacity: 0,
        zIndex: 1,
        pointerEvents: 'none' as const,
      };
    }

    if (isTablet) {
      if (diff === -1) {
        return {
          transform: 'translate(-50%, -50%) translate3d(-205px, 0px, -30px) rotateY(7deg) scale(0.82)',
          opacity: 0.88,
          zIndex: 20,
          boxShadow: '0 10px 25px -5px rgba(21, 94, 239, 0.08)',
          borderColor: '#E2E8F0',
          pointerEvents: 'auto' as const,
        };
      }
      if (diff === 1) {
        return {
          transform: 'translate(-50%, -50%) translate3d(205px, 0px, -30px) rotateY(-7deg) scale(0.82)',
          opacity: 0.88,
          zIndex: 20,
          boxShadow: '0 10px 25px -5px rgba(21, 94, 239, 0.08)',
          borderColor: '#E2E8F0',
          pointerEvents: 'auto' as const,
        };
      }
      return {
        transform: `translate(-50%, -50%) translate3d(${diff < 0 ? -380 : 380}px, 0px, -100px) scale(0.65)`,
        opacity: 0,
        zIndex: 5,
        pointerEvents: 'none' as const,
      };
    }

    if (isDesktop) {
      if (diff === -1) {
        return {
          transform: 'translate(-50%, -50%) translate3d(-265px, 0px, -35px) rotateY(8deg) scale(0.86)',
          opacity: 0.92,
          zIndex: 20,
          boxShadow: '0 12px 30px -5px rgba(21, 94, 239, 0.1)',
          borderColor: '#E2E8F0',
          pointerEvents: 'auto' as const,
        };
      }
      if (diff === 1) {
        return {
          transform: 'translate(-50%, -50%) translate3d(265px, 0px, -35px) rotateY(-8deg) scale(0.86)',
          opacity: 0.92,
          zIndex: 20,
          boxShadow: '0 12px 30px -5px rgba(21, 94, 239, 0.1)',
          borderColor: '#E2E8F0',
          pointerEvents: 'auto' as const,
        };
      }
      return {
        transform: `translate(-50%, -50%) translate3d(${diff < 0 ? -480 : 480}px, 0px, -120px) scale(0.70)`,
        opacity: 0,
        zIndex: 5,
        pointerEvents: 'none' as const,
      };
    }

    if (diff === -1) {
      return {
        transform: 'translate(-50%, -50%) translate3d(-315px, 0px, -35px) rotateY(10deg) scale(0.88)',
        opacity: 0.95,
        zIndex: 20,
        boxShadow: '0 12px 30px -5px rgba(21, 94, 239, 0.1)',
        borderColor: '#E2E8F0',
        pointerEvents: 'auto' as const,
      };
    }
    if (diff === 1) {
      return {
        transform: 'translate(-50%, -50%) translate3d(315px, 0px, -35px) rotateY(-10deg) scale(0.88)',
        opacity: 0.95,
        zIndex: 20,
        boxShadow: '0 12px 30px -5px rgba(21, 94, 239, 0.1)',
        borderColor: '#E2E8F0',
        pointerEvents: 'auto' as const,
      };
    }
    if (diff === -2) {
      return {
        transform: 'translate(-50%, -50%) translate3d(-520px, 0px, -90px) rotateY(16deg) scale(0.75)',
        opacity: 0.6,
        zIndex: 10,
        borderColor: '#E2E8F0',
        pointerEvents: 'auto' as const,
      };
    }
    if (diff === 2) {
      return {
        transform: 'translate(-50%, -50%) translate3d(520px, 0px, -90px) rotateY(-16deg) scale(0.75)',
        opacity: 0.6,
        zIndex: 10,
        borderColor: '#E2E8F0',
        pointerEvents: 'auto' as const,
      };
    }
    return {
      transform: `translate(-50%, -50%) translate3d(${diff < 0 ? -650 : 650}px, 0px, -150px) scale(0.6)`,
      opacity: 0,
      zIndex: 1,
      pointerEvents: 'none' as const,
    };
  };

  // Preparation checklist stages
  const prepStages = [
    {
      number: '01',
      title: 'Program Selection & Études en France (EEF) Mapping',
      summary: 'Explore over 1,500 English-taught programs across public universities and CGE Grandes Écoles.',
      details: [
        'Shortlist 5–8 French universities and Grandes Écoles matching academic credentials and budget.',
        'Review curriculum structure, 6-month mandatory paid internships, and industry partnerships.',
        'Determine application portal: Études en France (Campus France EEF) or direct university portals.',
        'Assess whether your program offers tuition fee exemptions or Eiffel Excellence scholarship nomination.',
      ],
    },
    {
      number: '02',
      title: 'Prepare Dossier & Campus France Academic Interview',
      summary: 'Assemble academic transcripts, Statement of Purpose, and attend the Campus France verification interview.',
      details: [
        'Draft a focused academic project statement aligned with French educational values and post-study career plans.',
        'Compile official degree certificates, semester mark sheets, and letters of recommendation.',
        'Submit the Études en France online dossier and pay the Campus France national processing fee.',
        'Attend the mandatory Campus France pedagogical interview to receive your official NOC / EEF validation.',
      ],
    },
    {
      number: '03',
      title: 'Long-Stay Student Visa (VLS-TS) & Proof of Funds (€615/mo)',
      summary: 'Lodge your visa on France-Visas with verified accommodation and proof of minimum €615/month living funds.',
      details: [
        'Demonstrate minimum living maintenance funds of €615/month (€7,380 for 1 academic year) via bank statements or education loan.',
        'Provide official proof of accommodation in France for the initial 3 months (CROUS attestation, lease, or hotel booking).',
        'Submit your visa file online through France-Visas and schedule biometrics at VFS Global.',
        'Receive your passport with the Long-Stay Student Visa equivalent to a Residence Permit (VLS-TS Étudiant).',
      ],
    },
    {
      number: '04',
      title: 'Arrival in France: OFII Validation, CAF & Free Healthcare',
      summary: 'Validate your VLS-TS online with OFII, register for free national healthcare, and claim your CAF monthly rent subsidy.',
      details: [
        'Complete online OFII validation within 3 months of arrival and pay the €50 residence permit tax stamp.',
        'Apply for the CAF (Caisse d’Allocations Familiales) housing subsidy, saving up to 30% – 40% of your monthly rent.',
        'Register for the French National Health Insurance (Sécurité Sociale) free of charge at etudiant-etranger.ameli.fr.',
        'Open a French bank account and obtain an SNCF Carte Avantage Jeune for 30% discounts on European TGV rail travel.',
      ],
    },
  ];

  return (
    <div className="bg-[#FAF7F1] min-h-screen font-sans text-slate-800 antialiased selection:bg-[#155EEF] selection:text-white">
      {/* Destination Country Navigation Bar */}
      <DestinationNavBar activeCountry="france" />

      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-20 sm:pt-12 sm:pb-28 overflow-hidden bg-gradient-to-b from-[#F2F6FE] via-[#FAF7F1] to-[#FAF7F1]">
        <div className="absolute inset-0 bg-[radial-gradient(#155EEF_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#155EEF]/10 via-[#0040C1]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Copy & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D0E2FF] shadow-xs text-xs font-bold text-[#155EEF] animate-fade-in">
                <span className="w-2 h-2 rounded-full bg-[#155EEF] animate-pulse" />
                <span>FRANCE HIGHER EDUCATION ADMISSIONS</span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-600 font-semibold">Grandes Écoles & Universities</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-editorial text-[#14213D] tracking-tight leading-[1.12]">
                Study in <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#155EEF] via-[#0040C1] to-[#14213D]">
                  France
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Discover world-class universities, diverse academic programs, rich cultural experiences, and exciting research opportunities while studying in France.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEligibilityModalOpen(true)}
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-[#155EEF] via-[#2563EB] to-[#0040C1] hover:opacity-95 text-white text-sm sm:text-base font-bold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-white" />
                  <span>Check Your Eligibility</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>

                <button
                  type="button"
                  onClick={handleOpenConsultation}
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#155EEF] text-sm sm:text-base font-bold shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4 text-[#155EEF]" />
                  <span>Consult French Specialist</span>
                </button>
              </div>

              {/* Key Trust Signals */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#155EEF]" />
                  <span>Campus France Authorized Partner</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#155EEF]" />
                  <span>2-Year Post-Study Stay-Back</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#155EEF]" />
                  <span>CAF Housing Subsidies Included</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card matching UK layout */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* SVG Flight Path Curved Indicator */}
                <svg
                  className="absolute -top-10 -left-10 w-44 h-44 text-[#155EEF]/30 pointer-events-none hidden sm:block z-0"
                  viewBox="0 0 100 100"
                  fill="none"
                >
                  <path
                    d="M10,80 Q40,10 90,30"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  <Plane className="w-5 h-5 text-[#155EEF] -rotate-12 translate-x-[78px] translate-y-[22px]" />
                </svg>

                {/* Main Hero Photo Container */}
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 bg-white aspect-[4/3] group">
                  <img
                    src="/images/france/supplied-france.png"
                    alt="Study in France - Higher Education and Historic Campus Architecture"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14213D]/70 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                      Paris, Lyon & Toulouse Innovation Hubs
                    </span>
                    <p className="text-base font-bold font-editorial mt-0.5">
                      World #1 Business Schools • Subsidized Public Universities
                    </p>
                  </div>
                </div>

                {/* Floating Glassmorphic Pill Badge */}
                <div className="absolute -bottom-5 -left-5 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">VLS-TS Visa</p>
                    <p className="text-sm font-extrabold text-[#14213D]">95% Visa Success Rate</p>
                  </div>
                </div>

                {/* Floating Badge Right */}
                <div className="absolute -top-4 -right-4 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-slate-100 hidden sm:flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#D99A35]" />
                  <span className="text-xs font-bold text-[#14213D]">Over 1,500 English Programs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS STRIP SECTION */}
      <section className="relative z-20 -mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="flex items-center gap-4 pl-0 sm:pl-2">
            <div className="w-12 h-12 rounded-2xl bg-[#F0F5FF] border border-[#D0E2FF] flex items-center justify-center shrink-0 text-[#155EEF]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Institution Network</p>
              <p className="text-lg sm:text-xl font-extrabold text-[#14213D] mt-0.5">3,500+</p>
              <p className="text-[11px] text-slate-500">Universities & Grandes Écoles</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 sm:pt-0 pl-0 sm:pl-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 text-emerald-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Post-Study Work</p>
              <p className="text-lg sm:text-xl font-extrabold text-[#14213D] mt-0.5">2 Years (APS/RECE)</p>
              <p className="text-[11px] text-slate-500">Stay-Back for Master's Grads</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 sm:pt-0 pl-0 sm:pl-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 text-[#155EEF]">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Annual Work Rights</p>
              <p className="text-lg sm:text-xl font-extrabold text-[#14213D] mt-0.5">964 Hours / Yr</p>
              <p className="text-[11px] text-slate-500">60% of annual full-time work</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 sm:pt-0 pl-0 sm:pl-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 text-[#D99A35]">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Public Tuition Fees</p>
              <p className="text-lg sm:text-xl font-extrabold text-[#14213D] mt-0.5">€243 / Year</p>
              <p className="text-[11px] text-slate-500">+ CAF Monthly Rent Subsidies</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 3D UNIVERSITY ORBIT SHOWCASE */}
      <section className="py-20 sm:py-28 overflow-hidden bg-[#FAF7F1] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#155EEF] text-xs font-bold uppercase tracking-wider border border-blue-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Elite Institutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#14213D] tracking-tight">
              Explore Top French Universities & Grandes Écoles
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              France features a distinctive binary higher education system: historic research universities and highly selective Grandes Écoles ranked among the world’s best in business, engineering, and mathematics.
            </p>
          </div>

          {/* Discipline Category Filter Buttons */}
          <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#155EEF] text-white shadow-md shadow-blue-500/20'
                      : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* 3D Orbit Carousel Canvas */}
          <div 
            className="relative h-[480px] sm:h-[520px] w-full max-w-5xl mx-auto select-none"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {filteredUniversities.map((uni, idx) => {
              const n = filteredUniversities.length;
              let diff = (idx - currentIndex) % n;
              if (diff > n / 2) diff -= n;
              if (diff < -n / 2) diff += n;

              const style3d = getCard3DStyle(diff);

              return (
                <div
                  key={uni.id}
                  style={style3d}
                  className="absolute top-1/2 left-1/2 w-[310px] sm:w-[350px] md:w-[380px] rounded-3xl bg-white border transition-all duration-700 ease-out overflow-hidden shadow-xl"
                >
                  {/* Card Image */}
                  <div className="relative h-44 overflow-hidden bg-slate-900">
                    <img
                      src={uni.image}
                      alt={uni.name}
                      className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Logo & Badges */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm p-1.5 rounded-xl shadow-md border border-white">
                      <UniversityLogo type={uni.logoType} className="w-7 h-7" />
                    </div>

                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-[#155EEF] border border-blue-200">
                      {uni.rankBadge}
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <p className="text-xs text-blue-200 font-semibold">{uni.rankingSource}</p>
                      <h3 className="text-lg font-bold font-editorial text-white leading-tight truncate">
                        {uni.name}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-3.5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-[#155EEF]" />
                      <span>{uni.location}</span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {uni.shortDesc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {uni.tags.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md bg-[#F2F6FE] text-[#155EEF] text-[10.5px] font-semibold border border-blue-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setActiveUniModal(uni)}
                        className="text-xs font-bold text-[#155EEF] hover:text-[#0040C1] flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Programs & Fees</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (onOpenCounselling) onOpenCounselling(uni.name);
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-[#155EEF] hover:bg-[#0040C1] text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Orbit Carousel Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous University"
              className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Orbit Speed Indicator */}
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600">
              <RotateCw className="w-3.5 h-3.5 text-[#155EEF]" />
              <button
                type="button"
                onClick={() => setRotationSpeed((s) => (s === 'normal' ? 'slow' : s === 'slow' ? 'paused' : 'normal'))}
                className="hover:text-[#155EEF] cursor-pointer"
              >
                Speed: <span className="capitalize text-[#155EEF] font-bold">{rotationSpeed}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next University"
              className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. WHY STUDY IN FRANCE (BENEFITS & SPLIT PREVIEW) */}
      <section className="py-20 sm:py-28 bg-white border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#155EEF] text-xs font-bold uppercase tracking-wider border border-blue-200">
              <Award className="w-3.5 h-3.5" />
              <span>Why Study in France</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#14213D] tracking-tight">
              An Academic, Cultural & Professional Hub
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              France provides globally renowned academic quality, heavily subsidized tuition at public institutions, and dynamic post-study career paths in European commerce and technology.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 4 Interactive Selector Cards */}
            <div className="lg:col-span-5 space-y-3.5">
              {[
                {
                  id: 'prestigious-institutions',
                  title: 'Prestigious Universities & Elite Grandes Écoles',
                  summary: 'Home to historic institutions like the Sorbonne alongside triple-accredited Grandes Écoles dominating global management and engineering ranks.',
                  icon: GraduationCap,
                },
                {
                  id: 'affordable-tuition',
                  title: 'Affordable Public Tuition & CAF Housing Subsidies',
                  summary: 'Public university degrees are state-subsidized, while international students are eligible for CAF rent reimbursement up to 40%.',
                  icon: Coins,
                },
                {
                  id: 'post-study-work',
                  title: '2-Year Stay-Back (APS/RECE) & Schengen Mobility',
                  summary: 'Master’s graduates qualify for a 2-year job search residence permit, leading directly to the European Blue Card and 5-year circulation visas.',
                  icon: Briefcase,
                },
                {
                  id: 'aerospace-tech-luxury',
                  title: 'European Aerospace, Tech & Luxury Epicenter',
                  summary: 'Direct proximity to corporate headquarters of Airbus, LVMH, L’Oréal, Dassault, Sanofi, and Station F, the world’s largest startup campus.',
                  icon: Cpu,
                },
              ].map((benefit) => {
                const Icon = benefit.icon;
                const isActive = activeBenefitId === benefit.id;
                return (
                  <div
                    key={benefit.id}
                    onClick={() => setActiveBenefitId(benefit.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#F5F8FF] border-[#155EEF] shadow-sm ring-2 ring-blue-500/10'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isActive
                            ? 'bg-[#155EEF] text-white shadow-sm'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-slate-900">{benefit.title}</h3>
                          <ChevronRight
                            className={`w-4 h-4 text-slate-400 transition-transform ${
                              isActive ? 'translate-x-1 text-[#155EEF]' : ''
                            }`}
                          />
                        </div>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {benefit.summary}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Split Dynamic Detail Card */}
            <div className="lg:col-span-7 bg-[#FAF7F1] rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              {activeBenefitId === 'prestigious-institutions' && (
                <div className="space-y-5 animate-fade-in">
                  <div className="h-56 rounded-2xl overflow-hidden relative shadow-sm">
                    <img
                      src="/images/france/sorbonne.jpg"
                      alt="Sorbonne University Historic Courtyard in Paris"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                        Academic Prestige & Dual System
                      </span>
                      <h4 className="text-lg font-bold font-editorial">
                        Universities & Highly Selective Grandes Écoles
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold font-editorial text-[#14213D]">
                      Dual Higher Education Excellence
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      France is famous for its complementary binary system: comprehensive public research universities (like Sorbonne, Paris Cité, and Université Paris-Saclay) and Grandes Écoles (such as HEC, École Polytechnique, and Sciences Po) that offer rigorous specialized curricula and high recruiter placement rates.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                        <span className="text-xs font-bold text-[#155EEF] block">Top FT-Ranked Business</span>
                        <p className="text-[11px] text-slate-500 mt-0.5">HEC, INSEAD, ESSEC, ESCP, and EDHEC consistently rank among the world's top 10.</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                        <span className="text-xs font-bold text-[#155EEF] block">Bologna LMD Architecture</span>
                        <p className="text-[11px] text-slate-500 mt-0.5">Fully aligned with the European credit framework (Licence 180 ECTS, Master 120 ECTS).</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeBenefitId === 'affordable-tuition' && (
                <div className="space-y-5 animate-fade-in">
                  <div className="h-56 rounded-2xl overflow-hidden relative shadow-sm">
                    <img
                      src="/images/france/hec.jpg"
                      alt="French University Campus and Subsidized Student Facilities"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                        Tuition & Welfare Subsidies
                      </span>
                      <h4 className="text-lg font-bold font-editorial">
                        State-Subsidized Fees & CAF Housing Refunds
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold font-editorial text-[#14213D]">
                      Subsidized Higher Education & Student Benefits
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      The French government heavily finances higher education. At public universities, standard statutory registration fees are approximately €175/year for Bachelor’s (Licence) and €243/year for Master’s programs (or €2,770–€3,770/year where non-EU differentiated rates apply).
                    </p>
                    <div className="space-y-2 pt-1 text-xs text-slate-700">
                      <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>CAF Housing Allowance:</strong> International students can receive €150 – €250/month rent subsidy refunded directly into their French bank accounts.</span>
                      </div>
                      <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Free Healthcare (Sécurité Sociale):</strong> 100% free basic health coverage for all international students registered on etudiant-etranger.ameli.fr.</span>
                      </div>
                      <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>CROUS Subsidized Student Dining:</strong> Balanced hot university meals provided across France for only €1 to €3.30.</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeBenefitId === 'post-study-work' && (
                <div className="space-y-5 animate-fade-in">
                  <div className="h-56 rounded-2xl overflow-hidden relative shadow-sm">
                    <img
                      src="/images/france/sciencespo.jpg"
                      alt="Paris Career Opportunities for International Graduates"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                        Post-Study Career Gateway
                      </span>
                      <h4 className="text-lg font-bold font-editorial">
                        RECE / APS Residence Permit & EU Blue Card
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold font-editorial text-[#14213D]">
                      Post-Study Work Authorization for Master’s Graduates
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      International students completing a Master’s degree (Grade de Master) or accredited Mastère Spécialisé in France can apply for the <em>Recherche d’Emploi ou Création d’Entreprise (RECE)</em> residence permit (formerly APS):
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                        <span className="text-xs font-bold text-emerald-600 block">2-Year Stay-Back Authorization</span>
                        <p className="text-[11px] text-slate-500 mt-0.5">Indian Master’s graduates benefit from a 2-year post-study residence permit under the bilateral framework.</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                        <span className="text-xs font-bold text-[#155EEF] block">Passeport Talent & EU Blue Card</span>
                        <p className="text-[11px] text-slate-500 mt-0.5">Direct transition to a 4-year European Blue Card once securing employment earning 1.5× the French minimum wage (SMIC).</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeBenefitId === 'aerospace-tech-luxury' && (
                <div className="space-y-5 animate-fade-in">
                  <div className="h-56 rounded-2xl overflow-hidden relative shadow-sm">
                    <img
                      src="/images/france/france-lifestyle.jpg"
                      alt="French Lifestyle, Culture and European Tech Landscape"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                        Industry Leadership
                      </span>
                      <h4 className="text-lg font-bold font-editorial">
                        Station F, Aerospace & Global Luxury Houses
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold font-editorial text-[#14213D]">
                      Europe's Industrial & Entrepreneurial Leader
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      France is the world’s luxury capital (LVMH, Kering, Chanel, Hermès, L’Oréal) and a European titan in aerospace, energy, and AI. Paris hosts Station F, housing over 1,000 startups alongside dedicated tech labs from Google, Meta, and Microsoft.
                    </p>
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                      <span className="text-xs font-bold text-[#155EEF] block">5-Year Short-Stay Circulation Visa</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Alumni who completed a Master's degree in France are eligible for a 5-year multi-entry Schengen circulation visa to travel freely across 29 European countries.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. STUDY INTAKES IN FRANCE */}
      <section className="py-20 sm:py-28 bg-[#FAF7F1] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#155EEF] text-xs font-bold uppercase tracking-wider border border-blue-200">
              <Calendar className="w-3.5 h-3.5" />
              <span>Admissions Timeline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#14213D] tracking-tight">
              French University Intakes
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              French higher education follows an academic calendar commencing primarily in autumn. Application deadlines depend on the procedure (Études en France vs. direct university portals).
            </p>
          </div>

          {/* Intakes Tabs */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <button
              type="button"
              onClick={() => setActiveIntakeTab('autumn')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeIntakeTab === 'autumn'
                  ? 'bg-[#155EEF] text-white shadow-md shadow-blue-500/20'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              Autumn Intake (Sep / Oct) — Major
            </button>
            <button
              type="button"
              onClick={() => setActiveIntakeTab('spring')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeIntakeTab === 'spring'
                  ? 'bg-[#155EEF] text-white shadow-md shadow-blue-500/20'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              Spring Intake (Jan / Feb) — Select
            </button>
            <button
              type="button"
              onClick={() => setActiveIntakeTab('pre-sessional')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeIntakeTab === 'pre-sessional'
                  ? 'bg-[#155EEF] text-white shadow-md shadow-blue-500/20'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              FLE French Language Bridges
            </button>
          </div>

          {/* Intake Detail View */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
            {activeIntakeTab === 'autumn' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                      Major National Intake
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-editorial text-[#14213D]">
                      Autumn Intake (September / October 2026)
                    </h3>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-400 font-semibold block">Application Window</span>
                    <span className="text-sm font-bold text-[#155EEF]">November 1 – March 31</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                    <span className="font-bold text-[#155EEF] block mb-1">Course Availability</span>
                    <p className="text-slate-600">100% of university degrees, Grandes Écoles MIM/MSc programs, and doctoral schools open.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                    <span className="font-bold text-emerald-700 block mb-1">Scholarship Pool</span>
                    <p className="text-slate-600">Full eligibility for Eiffel Excellence, Charpak, and institutional tuition fee reductions.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
                    <span className="font-bold text-[#D99A35] block mb-1">Campus France Visa</span>
                    <p className="text-slate-600">Complete Campus France interview by June to ensure VLS-TS visa issuance before August travel.</p>
                  </div>
                </div>
              </div>
            )}

            {activeIntakeTab === 'spring' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#155EEF]">
                      Secondary Wave
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-editorial text-[#14213D]">
                      Spring Intake (January / February 2027)
                    </h3>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-400 font-semibold block">Application Window</span>
                    <span className="text-sm font-bold text-[#155EEF]">August 1 – November 15</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                    <span className="font-bold text-[#155EEF] block mb-1">Specialized Focus</span>
                    <p className="text-slate-600">Primarily offered by leading business schools (MSc in Management, Luxury, and FinTech).</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                    <span className="font-bold text-emerald-700 block mb-1">Accelerated Timeline</span>
                    <p className="text-slate-600">Allows mid-year graduates to commence studies without an entire gap year.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
                    <span className="font-bold text-[#D99A35] block mb-1">Visa Submission</span>
                    <p className="text-slate-600">Submit Études en France and France-Visas files by November for swift winter arrival.</p>
                  </div>
                </div>
              </div>
            )}

            {activeIntakeTab === 'pre-sessional' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D99A35]">
                      Preparatory Programs
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-editorial text-[#14213D]">
                      FLE (Français Langue Étrangère) & Foundation
                    </h3>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-400 font-semibold block">Admissions</span>
                    <span className="text-sm font-bold text-[#155EEF]">Rolling Year-Round Intakes</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                    <span className="font-bold text-[#155EEF] block mb-1">Language Bridge</span>
                    <p className="text-slate-600">Intensive French language semesters bringing students to certified B2/C1 levels.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                    <span className="font-bold text-emerald-700 block mb-1">Direct Progression</span>
                    <p className="text-slate-600">Guarantees matriculation into French-taught public university faculties upon passing.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
                    <span className="font-bold text-[#D99A35] block mb-1">Visa Category</span>
                    <p className="text-slate-600">Long-Stay VLS-TS issued covering pre-sessional module through to degree completion.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. LANGUAGE REQUIREMENTS IN FRANCE */}
      <section className="py-20 sm:py-28 bg-white border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#155EEF] text-xs font-bold uppercase tracking-wider border border-blue-200">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Language Proficiency</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#14213D] tracking-tight">
              Language Requirements for France
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              France offers over 1,500 programs taught 100% in English with zero French language requirement for admission. Requirements vary depending on the chosen instructional track.
            </p>
          </div>

          {/* Test Score Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div
              onClick={() => setActiveEnglishCard('english-taught')}
              className={`p-6 rounded-3xl border transition-all cursor-pointer ${
                activeEnglishCard === 'english-taught'
                  ? 'bg-[#F5F8FF] border-[#155EEF] shadow-sm ring-2 ring-blue-500/10'
                  : 'bg-white hover:bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-[#155EEF]">
                  English-Taught Programs
                </span>
                <span className="text-xs text-slate-400 font-semibold">1,500+ Degrees</span>
              </div>
              <div className="text-3xl font-black font-editorial text-[#14213D] mb-2">
                IELTS 6.5 <span className="text-sm font-normal text-slate-500">or TOEFL 85+</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standard requirement for Master’s programs in engineering, business, and data science. No French test scores required for admission or student visa approval.
              </p>
            </div>

            <div
              onClick={() => setActiveEnglishCard('moi')}
              className={`p-6 rounded-3xl border transition-all cursor-pointer ${
                activeEnglishCard === 'moi'
                  ? 'bg-[#F5F8FF] border-[#155EEF] shadow-sm ring-2 ring-blue-500/10'
                  : 'bg-white hover:bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                  Medium of Instruction (MOI)
                </span>
                <span className="text-xs text-slate-400 font-semibold">IELTS Waiver</span>
              </div>
              <div className="text-3xl font-black font-editorial text-[#14213D] mb-2">
                MOI Letter <span className="text-sm font-normal text-slate-500">(Accepted)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Numerous French business schools and universities accept an official university letter certifying that your Bachelor's degree was taught in English to waive IELTS/TOEFL.
              </p>
            </div>

            <div
              onClick={() => setActiveEnglishCard('french-taught')}
              className={`p-6 rounded-3xl border transition-all cursor-pointer ${
                activeEnglishCard === 'french-taught'
                  ? 'bg-[#F5F8FF] border-[#155EEF] shadow-sm ring-2 ring-blue-500/10'
                  : 'bg-white hover:bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-700">
                  French-Taught Programs
                </span>
                <span className="text-xs text-slate-400 font-semibold">Public Faculties</span>
              </div>
              <div className="text-3xl font-black font-editorial text-[#14213D] mb-2">
                DELF B2 <span className="text-sm font-normal text-slate-500">or DALF C1 / TCF</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Required for standard French-language university programs in law, medicine, literature, and social sciences. DELF B2 is the universal benchmark.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SCHOLARSHIPS IN FRANCE */}
      <section className="py-20 sm:py-28 bg-[#FAF7F1] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#155EEF] text-xs font-bold uppercase tracking-wider border border-blue-200">
              <Coins className="w-3.5 h-3.5" />
              <span>Financial Aid & Grants</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#14213D] tracking-tight">
              Scholarships in France
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Explore scholarship opportunities available through French institutions, government programs, and eligible international funding schemes. Funding, eligibility, and application procedures vary by program, nationality, academic level, and chosen institution.
            </p>
          </div>

          {/* 6 Verified Scholarship Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: 'Eiffel Excellence Scholarship Program',
                provider: 'French Ministry for Europe and Foreign Affairs (MEAE)',
                value: '€1,181 / Month + Return Flights & Insurance',
                desc: 'France’s flagship excellence scholarship for top international students pursuing Master’s degrees (€1,181/mo) and PhD programs (€1,700/mo).',
                coverage: 'Monthly stipend, direct international travel, healthcare, and cultural activities (tuition waiver governed by institution).',
                link: 'https://www.campusfrance.org/en/eiffel-scholarship-program-of-excellence',
                badge: 'Govt Excellence',
              },
              {
                title: 'Charpak Scholarship Program',
                provider: 'French Embassy in India / Campus France',
                value: '€860 / Mo Living Stipend + Free Visa',
                desc: 'Dedicated bilateral scholarships for Indian students pursuing Master’s degrees in France across all disciplines.',
                coverage: 'Monthly living allowance of €860, student visa fee waiver, and student social security coverage.',
                link: 'https://www.inde.campusfrance.org/',
                badge: 'Bilateral Award',
              },
              {
                title: 'HEC Paris Excellence Scholarships',
                provider: 'HEC Paris Foundation',
                value: 'Up to €20,000 Tuition Fee Reduction',
                desc: 'Merit-based scholarships automatically considered upon admission for high-achieving candidates in the Master in Management (MIM) and MBA.',
                coverage: 'Direct tuition fee credit based on GMAT/GRE scores and undergraduate academic excellence.',
                link: 'https://www.hec.edu/',
                badge: 'Business Merit',
              },
              {
                title: 'Sciences Po Émile Boutmy Scholarship',
                provider: 'Sciences Po Paris',
                value: '€3,900 – €14,210 / Year Tuition Grant',
                desc: 'Named after the founder of Sciences Po, awarded to top non-EU students admitted to undergraduate and Master’s degree programs.',
                coverage: 'Annual tuition fee grant awarded based on academic merit and profile diversity.',
                link: 'https://www.sciencespo.fr/',
                badge: 'University Grant',
              },
              {
                title: 'École Polytechnique Foundation Scholarships',
                provider: 'Institut Polytechnique de Paris',
                value: 'Up to €15,000 / Year + Housing Support',
                desc: 'Merit-based financial aid for exemplary international students admitted to MSc&T and Bachelor programs in science and engineering.',
                coverage: 'Tuition reduction and interest-free student loans supported by corporate alumni partners.',
                link: 'https://www.polytechnique.edu/',
                badge: 'STEM Bursary',
              },
              {
                title: 'Erasmus+ EMJM in France',
                provider: 'European Commission',
                value: 'Full Tuition + €1,400 / Month Allowance',
                desc: 'Fully funded joint Master’s degree programs hosted across French universities in consortium with other European institutions.',
                coverage: 'Complete tuition coverage, monthly subsistence allowance of €1,400, and travel support.',
                link: 'https://erasmus-plus.ec.europa.eu/',
                badge: 'EU Consortium',
              },
            ].map((sch, sIdx) => (
              <div
                key={sIdx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#155EEF] border border-blue-200 uppercase">
                      {sch.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold truncate max-w-[150px]">
                      {sch.provider}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-editorial text-[#14213D] leading-tight">
                    {sch.title}
                  </h3>

                  <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-xs font-bold text-emerald-800">
                    {sch.value}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {sch.desc}
                  </p>

                  <div className="text-[11px] text-slate-500 pt-1">
                    <strong>Coverage:</strong> {sch.coverage}
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={sch.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#155EEF] hover:underline flex items-center gap-1"
                  >
                    <span>Official Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenCounselling) onOpenCounselling(sch.title);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-[#155EEF] hover:text-white text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Apply with Us
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Scholarship Application Process Roadmap */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200">
            <h3 className="text-xl sm:text-2xl font-bold font-editorial text-[#14213D] text-center mb-8">
              Scholarship Application Roadmap
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 text-xs">
              {[
                { step: '01', title: 'Identify Awards', desc: 'Search Eiffel, Charpak, and institutional awards on Campus Bourses.' },
                { step: '02', title: 'Check Deadlines', desc: 'Eiffel deadline is early (November/December); confirm application windows.' },
                { step: '03', title: 'Gain Admission', desc: 'Secure an admission offer; French institutions nominate applicants for Eiffel.' },
                { step: '04', title: 'Assemble Dossier', desc: 'Prepare transcripts, academic recommendation letters, and CV.' },
                { step: '05', title: 'Campus France', desc: 'Submit application through Campus France and your host institution.' },
                { step: '06', title: 'Award & Visa', desc: 'Use official scholarship attestation for expedited VLS-TS visa processing.' },
              ].map((s, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center space-y-1.5">
                  <span className="text-xs font-mono font-bold text-[#155EEF]">{s.step}</span>
                  <h4 className="font-bold text-slate-900">{s.title}</h4>
                  <p className="text-[11px] text-slate-500">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. ELIGIBILITY CRITERIA & VISA/IMMIGRATION INFORMATION */}
      <section className="py-20 sm:py-28 bg-white border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#155EEF] text-xs font-bold uppercase tracking-wider border border-blue-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admissions & Immigration</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#14213D] tracking-tight">
              General Eligibility & Visa Requirements
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              These general checkpoints outline admission and visa preparation steps for international applicants to France. Requirements vary by program, nationality, and institution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-[#FAF7F1] border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#155EEF]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Academic Entry Qualifications</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Recognized 3 or 4-year Bachelor’s degree with minimum 55%–60% aggregate for Master’s programs (Licence requires high school Class 12 completion).
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF7F1] border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Language Proficiency Evidence</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                IELTS 6.5, TOEFL 85+, or MOI letter for English-taught tracks. DELF B2/DALF C1 for French-taught university faculties.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF7F1] border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
                <Coins className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Proof of Living Funds (€615/mo)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Official demonstration of minimum €615/month (€7,380/year) in liquid savings or education loan sanction, as stipulated by French consular authorities.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF7F1] border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#D99A35]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Long-Stay Student Visa (VLS-TS)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Filing via France-Visas following Études en France pedagogical interview. Requires online OFII validation within 3 months of arrival.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. 4-STAGE APPLICATION & PREPARATION CHECKLIST */}
      <section className="py-20 sm:py-28 bg-[#FAF7F1] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#155EEF] text-xs font-bold uppercase tracking-wider border border-blue-200">
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Admissions Roadmap</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#14213D] tracking-tight">
              4-Stage France Admission Checklist
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Track your preparation from Campus France shortlisting through to visa filing, OFII validation, and CAF rent subsidies.
            </p>

            {/* Live Readiness Progress Bar */}
            <div className="max-w-md mx-auto pt-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1.5">
                <span>Application Readiness</span>
                <span className="font-bold text-[#155EEF]">
                  {Math.round((totalStepsCompleted / 4) * 100)}% Complete
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#155EEF] to-[#0040C1] transition-all duration-500 rounded-full"
                  style={{ width: `${(totalStepsCompleted / 4) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {prepStages.map((stage, idx) => {
              const isDone = !!completedSteps[idx];
              const isExpanded = expandedPrepStage === idx;

              return (
                <div
                  key={idx}
                  className={`bg-white rounded-3xl border transition-all ${
                    isDone ? 'border-emerald-200 shadow-xs' : 'border-slate-200'
                  }`}
                >
                  <div
                    className="p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer"
                    onClick={() => setExpandedPrepStage(isExpanded ? -1 : idx)}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStepCompleted(idx);
                        }}
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                          isDone
                            ? 'bg-emerald-500 text-white'
                            : 'border-2 border-slate-300 text-transparent hover:border-[#155EEF]'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                      </button>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[#155EEF]">
                            STAGE {stage.number}
                          </span>
                          {isDone && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                              Completed
                            </span>
                          )}
                        </div>
                        <h3 className="text-base sm:text-lg font-bold font-editorial text-[#14213D] truncate">
                          {stage.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-2 border-t border-slate-100 space-y-3 text-xs sm:text-sm text-slate-600 animate-fade-in">
                      <p className="font-semibold text-slate-700">{stage.summary}</p>
                      <ul className="space-y-2 pt-1">
                        {stage.details.map((d, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#155EEF] shrink-0 mt-2" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA SECTION (MATCHING UK PAGE) */}
      <section className="py-20 sm:py-24 bg-gradient-to-br from-[#14213D] via-[#0F1A30] to-[#14213D] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#155EEF]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D99A35]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>Begin Your Study in France Journey</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-white tracking-tight">
            Start Your Study in France Journey
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Get personalized guidance on choosing a French university, understanding admission requirements, exploring scholarships, and preparing your study-abroad application.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => setIsEligibilityModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#155EEF] to-[#0040C1] hover:opacity-95 text-white text-sm sm:text-base font-bold shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Check Your Eligibility</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleOpenConsultation}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white text-sm sm:text-base font-bold backdrop-blur-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-blue-300" />
              <span>Book Free 1-on-1 Consultation</span>
            </button>
          </div>
        </div>
      </section>

      {/* 11. DESTINATION SWITCHER NAVIGATION */}
      <section className="py-8 bg-[#FAF7F1] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            EXPLORE OTHER STUDY ABROAD DESTINATIONS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'usa', label: 'Study in USA', path: '/destinations/usa' },
              { id: 'united-kingdom', label: 'Study in United Kingdom', path: '/destinations/united-kingdom' },
              { id: 'canada', label: 'Study in Canada', path: '/destinations/canada' },
              { id: 'australia', label: 'Study in Australia', path: '/destinations/australia' },
              { id: 'europe', label: 'Study in Europe', path: '/destinations/europe' },
              { id: 'new-zealand', label: 'Study in New Zealand', path: '/destinations/new-zealand' },
              { id: 'france', label: 'Study in France', path: '/destinations/france' },
              { id: 'ireland', label: 'Study in Ireland', path: '/destinations/ireland' },
            ].map((d) => (
              <Link
                key={d.id}
                to={d.path}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  d.id === 'france'
                    ? 'bg-[#14213D] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-[#155EEF] hover:bg-slate-50 border border-slate-200/80'
                }`}
              >
                {d.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* UNIVERSITY DETAIL POPUP MODAL */}
      {activeUniModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#F5F8FF] px-6 py-5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <UniversityLogo type={activeUniModal.logoType} className="w-9 h-9" />
                <div>
                  <h3 className="text-lg font-bold font-editorial text-[#14213D] leading-tight">
                    {activeUniModal.name}
                  </h3>
                  <span className="text-xs text-[#155EEF] font-semibold">{activeUniModal.rankBadge} • {activeUniModal.location}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveUniModal(null)}
                className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 text-slate-500 flex items-center justify-center border border-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <p className="text-xs text-slate-600 leading-relaxed">
                {activeUniModal.shortDesc}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Featured Master's & Licence Programs
                </h4>
                <div className="space-y-2">
                  {activeUniModal.programs.map((prog, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-900 block">{prog.name}</span>
                        <span className="text-[11px] text-slate-500">{prog.level} • {prog.duration} • 2-Yr APS/RECE Eligible</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-[#155EEF] block">{prog.tuition}</span>
                        <span className="text-[10px] text-slate-400">Tuition Rate</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveUniModal(null);
                    if (onOpenCounselling) onOpenCounselling(activeUniModal.name);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#155EEF] hover:bg-[#0040C1] text-white text-xs font-bold transition-all"
                >
                  Apply to {activeUniModal.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ELIGIBILITY MODAL */}
      <FranceEligibilityModal
        isOpen={isEligibilityModalOpen}
        onClose={() => setIsEligibilityModalOpen(false)}
        onProceedConsultation={(data) => {
          if (onOpenCounselling) {
            onOpenCounselling(data ? `France: ${data.scoreSummary}` : 'France');
          }
        }}
      />
    </div>
  );
};
