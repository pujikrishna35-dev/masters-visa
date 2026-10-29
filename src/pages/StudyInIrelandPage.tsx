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
  Phone,
  Building
} from 'lucide-react';
import { IrelandEligibilityModal } from '../components/IrelandEligibilityModal';
import { UniversityLogo } from '../components/UniversityLogo';
import { DestinationNavBar } from '../components/DestinationNavBar';

interface StudyInIrelandPageProps {
  onOpenCounselling?: (destination?: string) => void;
}

interface UniversityItem {
  id: string;
  name: string;
  location: string;
  rankBadge: string;
  rankingSource: string;
  logoType: 'trinity' | 'ucd' | 'galway' | 'ucc' | 'dcu' | 'ul';
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
  { id: 'business', label: 'Business & Finance', icon: Briefcase },
  { id: 'cs', label: 'Data Science & AI', icon: Code2 },
  { id: 'engineering', label: 'Engineering & Tech', icon: Cpu },
  { id: 'medicine', label: 'Pharma & MedTech', icon: Stethoscope },
  { id: 'law', label: 'Law & Policy', icon: Scale },
] as const;

const UNIVERSITIES_DATA: UniversityItem[] = [
  {
    id: 'trinity',
    name: 'Trinity College Dublin (TCD)',
    location: 'College Green, Dublin',
    rankBadge: '#87 Global',
    rankingSource: 'QS World University Rankings 2025 • Ireland #1',
    logoType: 'trinity',
    categories: ['all', 'business', 'cs', 'engineering', 'medicine', 'law'],
    shortDesc: 'Ireland’s historic university, founded in 1592 in the heart of Dublin, globally revered for research prestige, computer science, law, biomedical sciences, and business innovation.',
    image: '/images/ireland/trinity.jpg',
    tags: ['Computer Science', 'Trinity Business School', 'Biomedical Science', 'International Law'],
    programs: [
      { name: 'MSc in Computer Science (Data Science / AI)', level: "Master's (NFQ 9)", duration: '1 Year', pswEligible: true, tuition: '€25,800 / yr' },
      { name: 'MSc in Financial Risk Management', level: "Master's (NFQ 9)", duration: '1 Year', pswEligible: true, tuition: '€24,500 / yr' },
      { name: 'Bachelor in Computer Science (Honours)', level: "Bachelor's (NFQ 8)", duration: '4 Years', pswEligible: true, tuition: '€27,200 / yr' },
      { name: 'MSc in Pharmaceutical Sciences', level: "Master's (NFQ 9)", duration: '1 Year', pswEligible: true, tuition: '€23,000 / yr' },
    ],
  },
  {
    id: 'ucd',
    name: 'University College Dublin (UCD)',
    location: 'Belfield, Dublin',
    rankBadge: '#126 Global',
    rankingSource: 'QS World University Rankings 2025 • #1 Graduate Employability',
    logoType: 'ucd',
    categories: ['all', 'business', 'cs', 'engineering', 'medicine'],
    shortDesc: 'Ireland’s largest research university with a modern 330-acre campus, home to the triple-accredited Michael Smurfit Graduate Business School and world-class O’Brien Centre for Science.',
    image: '/images/ireland/ucd.jpg',
    tags: ['Smurfit Business School', 'Cloud Computing', 'Biopharmaceutical Eng', 'Data Analytics'],
    programs: [
      { name: 'MSc in Business Analytics (FT #13 World)', level: "Master's (NFQ 9)", duration: '1 Year', pswEligible: true, tuition: '€26,200 / yr' },
      { name: 'MSc in Computer Science (Conversion)', level: "Master's (NFQ 9)", duration: '16 Months', pswEligible: true, tuition: '€29,100 total' },
      { name: 'ME in Electronic & Computer Engineering', level: "Master's (NFQ 9)", duration: '2 Years', pswEligible: true, tuition: '€27,700 / yr' },
      { name: 'Bachelor of Engineering (BE Honours)', level: "Bachelor's (NFQ 8)", duration: '4 Years', pswEligible: true, tuition: '€28,500 / yr' },
    ],
  },
  {
    id: 'galway',
    name: 'University of Galway',
    location: 'Galway, West Coast',
    rankBadge: '#273 Global',
    rankingSource: 'QS World Rankings 2025 • World Top 1% MedTech',
    logoType: 'galway',
    categories: ['all', 'medicine', 'cs', 'engineering', 'business'],
    shortDesc: 'Situated along the scenic River Corrib on Ireland’s creative west coast, University of Galway is an international epicenter for biomedical engineering, medical device technology, and marine research.',
    image: '/images/ireland/galway.jpg',
    tags: ['Medical Device Technology', 'Software Design & Cloud', 'Regenerative Medicine', 'FinTech'],
    programs: [
      { name: 'MSc in Biomedical Engineering (MedTech)', level: "Master's (NFQ 9)", duration: '1 Year', pswEligible: true, tuition: '€25,500 / yr' },
      { name: 'MSc in Software Design & Cloud Computing', level: "Master's (NFQ 9)", duration: '1 Year', pswEligible: true, tuition: '€24,800 / yr' },
      { name: 'MSc in Business Analytics', level: "Master's (NFQ 9)", duration: '1 Year', pswEligible: true, tuition: '€20,000 / yr' },
      { name: 'Bachelor of Science in Marine Science', level: "Bachelor's (NFQ 8)", duration: '4 Years', pswEligible: true, tuition: '€23,500 / yr' },
    ],
  },
  {
    id: 'ucc',
    name: 'University College Cork (UCC)',
    location: 'Cork City, South Coast',
    rankBadge: '#273 Global',
    rankingSource: 'QS World University Rankings 2025 • Established 1845',
    logoType: 'ucc',
    categories: ['all', 'medicine', 'engineering', 'business', 'cs'],
    shortDesc: 'Famous as the historic academic home of George Boole (father of Boolean logic), UCC is situated in Ireland’s pharmaceutical manufacturing capital, surrounded by Pfizer, Eli Lilly, and Johnson & Johnson.',
    image: '/images/ireland/ucc.jpg',
    tags: ['Pharmaceutical Technology', 'Computing & IT', 'Food Science', 'Cybersecurity'],
    programs: [
      { name: 'MSc in Computing Science', level: "Master's (NFQ 9)", duration: '1 Year', pswEligible: true, tuition: '€20,100 / yr' },
      { name: 'MSc in Pharmaceutical & Biopharmaceutical Systems', level: "Master's (NFQ 9)", duration: '1 Year', pswEligible: true, tuition: '€24,500 / yr' },
      { name: 'MSc in Information Systems for Business Performance', level: "Master's (NFQ 9)", duration: '1 Year', pswEligible: true, tuition: '€19,500 / yr' },
      { name: 'Bachelor of Science (Data Science & Analytics)', level: "Bachelor's (NFQ 8)", duration: '4 Years', pswEligible: true, tuition: '€23,000 / yr' },
    ],
  },
  {
    id: 'dcu',
    name: 'Dublin City University (DCU)',
    location: 'Glasnevin, North Dublin',
    rankBadge: '#421 Global',
    rankingSource: 'QS World University Rankings 2025 • Top Young University',
    logoType: 'dcu',
    categories: ['all', 'cs', 'business', 'engineering', 'law'],
    shortDesc: 'Ireland’s designated University of Enterprise, celebrated for integrated INTRA work-placements, groundbreaking artificial intelligence research, and high employment outcomes in Dublin’s Silicon Docks.',
    image: '/images/ireland/dcu.jpg',
    tags: ['Artificial Intelligence', 'Financial Technology (FinTech)', 'Electronic Commerce', 'Bioprocess Engineering'],
    programs: [
      { name: 'MSc in Computing (AI & Cloud Streams)', level: "Master's (NFQ 9)", duration: '1 Year', pswEligible: true, tuition: '€20,000 / yr' },
      { name: 'MSc in Electronic Commerce (Business & Tech)', level: "Master's (NFQ 9)", duration: '1 Year', pswEligible: true, tuition: '€19,500 / yr' },
      { name: 'MSc in Bioprocess Engineering', level: "Master's (NFQ 9)", duration: '1 Year', pswEligible: true, tuition: '€22,500 / yr' },
      { name: 'Bachelor of Science in Computer Applications', level: "Bachelor's (NFQ 8)", duration: '4 Years', pswEligible: true, tuition: '€16,500 / yr' },
    ],
  },
  {
    id: 'ul',
    name: 'University of Limerick (UL)',
    location: 'Limerick, River Shannon',
    rankBadge: '#426 Global',
    rankingSource: 'QS World University Rankings 2025 • #1 Student Experience',
    logoType: 'ul',
    categories: ['all', 'engineering', 'business', 'cs', 'medicine'],
    shortDesc: 'A pioneer of cooperative education in Europe, UL guarantees work placements with global aerospace and medical firms, featuring an exceptional parkland campus spanning the River Shannon.',
    image: '/images/ireland/ul.jpg',
    tags: ['Aeronautical Engineering', 'Software Engineering', 'Kemmy Business School', 'Biomedical Devices'],
    programs: [
      { name: 'MSc in Software Engineering (Immersive)', level: "Master's (NFQ 9)", duration: '1 Year', pswEligible: true, tuition: '€18,900 / yr' },
      { name: 'MEng in Aeronautical Engineering', level: "Master's (NFQ 9)", duration: '1 Year', pswEligible: true, tuition: '€21,500 / yr' },
      { name: 'Master of International Management', level: "Master's (NFQ 9)", duration: '1 Year', pswEligible: true, tuition: '€17,800 / yr' },
      { name: 'Bachelor of Engineering in Robotics', level: "Bachelor's (NFQ 8)", duration: '4 Years', pswEligible: true, tuition: '€20,200 / yr' },
    ],
  },
];

export const StudyInIrelandPage: React.FC<StudyInIrelandPageProps> = ({
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

  // Active benefit card for Why Study in Ireland
  const [activeBenefitId, setActiveBenefitId] = useState<string>('multinational-hub');

  // Intake Timeline Active Tab
  const [activeIntakeTab, setActiveIntakeTab] = useState<'autumn' | 'spring'>('autumn');

  // English Proficiency Active Card
  const [activeEnglishCard, setActiveEnglishCard] = useState<'ielts' | 'pte' | 'det'>('ielts');

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
      onOpenCounselling('Ireland');
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
      title: 'Course Shortlisting & NFQ Qualification Matching',
      summary: 'Explore 1-year Level 9 Master’s and Level 8 Bachelor’s programs across Ireland’s 8 research universities.',
      details: [
        'Shortlist 5–8 Irish institutions matching academic background and career goals.',
        'Evaluate 1-year Master’s curricula, industrial dissertation projects, and industry co-op placements.',
        'Verify in-demand skills aligning with the Irish Critical Skills Employment List (IT, Engineering, Pharma, Finance).',
        'Check tuition fees (€12,000 – €26,000) and eligibility for €2,000 – €5,000 university merit scholarships.',
      ],
    },
    {
      number: '02',
      title: 'Application Dossier & Unconditional Offer Acceptance',
      summary: 'Submit direct university portal applications with transcripts, SOP, and certified English test scores.',
      details: [
        'Draft a specialized academic Statement of Purpose emphasizing technical competence and post-study career aims.',
        'Submit official degree certificates, consolidated mark sheets, and 2 academic letters of recommendation.',
        'Provide verified English proficiency scores (IELTS Academic 6.5, PTE 61+, or TOEFL 88+).',
        'Receive your formal Offer Letter and pay the tuition fee deposit (or full fee) to secure your unconditional placement.',
      ],
    },
    {
      number: '03',
      title: 'AVATS Electronic Study Visa & Living Funds (€10,000)',
      summary: 'Lodge your visa online via AVATS, showing tuition receipt and minimum €10,000 living funds.',
      details: [
        'Complete the online visa application form on the Electronic Visa Application Facility (AVATS).',
        'Demonstrate minimum accessible living maintenance funds of €10,000 held for 6 months (or an approved education loan sanction).',
        'Obtain mandatory private medical insurance policy covering at least €25,000 for medical emergencies.',
        'Submit passport and biometric documents to VFS Global for visa stamping by the Irish Department of Justice.',
      ],
    },
    {
      number: '04',
      title: 'Arrival in Ireland: IRP Registration & Stamp 2 Residence',
      summary: 'Register with Irish Immigration Service Delivery (ISD), obtain your IRP card, and activate part-time work rights.',
      details: [
        'Book and attend your Irish Residence Permit (IRP) appointment at Burgh Quay (Dublin) or local Garda District Headquarters.',
        'Pay the €300 government registration fee to receive your official Stamp 2 residence card.',
        'Obtain your Personal Public Service (PPS) Number and open an Irish bank account.',
        'Exercise legal work rights: up to 20 hrs/week during term and up to 40 hrs/week during designated holidays at €14.15/hr.',
      ],
    },
  ];

  return (
    <div className="bg-[#FAF7F1] min-h-screen font-sans text-slate-800 antialiased selection:bg-[#155EEF] selection:text-white">
      {/* Destination Country Navigation Bar */}
      <DestinationNavBar activeCountry="ireland" />

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
                <span>IRELAND HIGHER EDUCATION ADMISSIONS</span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-600 font-semibold">Silicon Valley of Europe</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-editorial text-[#14213D] tracking-tight leading-[1.12]">
                Study in <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#155EEF] via-[#0040C1] to-[#14213D]">
                  Ireland
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Discover world-class education, welcoming communities, internationally recognized qualifications, and exciting career opportunities while studying in Ireland.
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
                  <span>Consult Irish Specialist</span>
                </button>
              </div>

              {/* Key Trust Signals */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#155EEF]" />
                  <span>Education in Ireland Certified</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#155EEF]" />
                  <span>Up to 24-Mo Stamp 1G</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#155EEF]" />
                  <span>1,000+ Multinationals</span>
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
                    src="/images/ireland/ireland-hero.jpg"
                    alt="Study in Ireland - Dublin Silicon Docks and Grand Canal Tech Hub"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14213D]/70 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                      Dublin, Cork & Galway Technology Epicenters
                    </span>
                    <p className="text-base font-bold font-editorial mt-0.5">
                      1-Year Master's Degrees • Up to 2-Year Stamp 1G Stay-Back
                    </p>
                  </div>
                </div>

                {/* Floating Glassmorphic Pill Badge */}
                <div className="absolute -bottom-5 -left-5 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Stamp 2 Visa</p>
                    <p className="text-sm font-extrabold text-[#14213D]">98% Visa Success Rate</p>
                  </div>
                </div>

                {/* Floating Badge Right */}
                <div className="absolute -top-4 -right-4 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-slate-100 hidden sm:flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#D99A35]" />
                  <span className="text-xs font-bold text-[#14213D]">Only Native English EU Member</span>
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
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Multinational Presence</p>
              <p className="text-lg sm:text-xl font-extrabold text-[#14213D] mt-0.5">1,000+ Multinationals</p>
              <p className="text-[11px] text-slate-500">European Headquarters</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 sm:pt-0 pl-0 sm:pl-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 text-emerald-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Post-Study Work</p>
              <p className="text-lg sm:text-xl font-extrabold text-[#14213D] mt-0.5">Up to 24 Months</p>
              <p className="text-[11px] text-slate-500">Third Level Graduate Stamp 1G</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 sm:pt-0 pl-0 sm:pl-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 text-[#155EEF]">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Stamp 2 Work Rights</p>
              <p className="text-lg sm:text-xl font-extrabold text-[#14213D] mt-0.5">20 / 40 Hrs</p>
              <p className="text-[11px] text-slate-500">20h term, 40h holidays</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 sm:pt-0 pl-0 sm:pl-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 text-[#D99A35]">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">National Minimum Wage</p>
              <p className="text-lg sm:text-xl font-extrabold text-[#14213D] mt-0.5">€14.15 / Hour</p>
              <p className="text-[11px] text-slate-500">Workplace Relations 2026</p>
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
              <span>World-Ranked Universities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#14213D] tracking-tight">
              Explore Top Universities in Ireland
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Ireland boasts globally recognized public universities delivering cutting-edge research, intensive 1-year Master’s degrees, and strong corporate ties into Dublin's Silicon Docks.
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

      {/* 4. WHY STUDY IN IRELAND (BENEFITS & SPLIT PREVIEW) */}
      <section className="py-20 sm:py-28 bg-white border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#155EEF] text-xs font-bold uppercase tracking-wider border border-blue-200">
              <Award className="w-3.5 h-3.5" />
              <span>Why Study in Ireland</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#14213D] tracking-tight">
              An English-Speaking Innovation Hub in Europe
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Ireland combines world-class academic institutions with vibrant international student communities and unmatched access to European tech, finance, and pharmaceutical multinationals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 4 Interactive Selector Cards */}
            <div className="lg:col-span-5 space-y-3.5">
              {[
                {
                  id: 'multinational-hub',
                  title: 'European Silicon Valley & Global HQs',
                  summary: 'Over 1,000 multinational giants—including Google, Apple, Meta, Pfizer, and Stripe—base their European headquarters in Dublin and Cork.',
                  icon: Cpu,
                },
                {
                  id: 'post-study-work',
                  title: 'Up to 24-Month Stamp 1G Stay-Back',
                  summary: 'Graduates of Level 9 Master’s programs qualify for up to 24 months of full-time work permission to launch professional careers.',
                  icon: Briefcase,
                },
                {
                  id: 'english-speaking',
                  title: 'Sole Native English-Speaking EU Nation',
                  summary: 'Complete academic and cultural immersion in English while enjoying unrestricted student mobility across the European Union single market.',
                  icon: GraduationCap,
                },
                {
                  id: 'one-year-masters',
                  title: 'Accelerated 1-Year Master’s Degrees (NFQ 9)',
                  summary: 'Intensive 12-month postgraduate programs save an entire year of living expenses while delivering globally recognized qualifications.',
                  icon: Award,
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
              {activeBenefitId === 'multinational-hub' && (
                <div className="space-y-5 animate-fade-in">
                  <div className="h-56 rounded-2xl overflow-hidden relative shadow-sm">
                    <img
                      src="/images/ireland/ireland-hero.jpg"
                      alt="Dublin Silicon Docks Multi-National Tech District"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                        Corporate Tech & Pharma Hub
                      </span>
                      <h4 className="text-lg font-bold font-editorial">
                        Silicon Docks & Cork Biopharmaceutical Cluster
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold font-editorial text-[#14213D]">
                      European Epicenter for Technology, Pharma & FinTech
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Ireland hosts the EMEA headquarters for 9 of the top 10 global software companies and 9 of the top 10 pharmaceutical conglomerates. While corporate presence does not automatically guarantee internship or job offers, it creates deep industry curriculum partnerships and research opportunities.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                        <span className="text-xs font-bold text-[#155EEF] block">Tech & Data Giants</span>
                        <p className="text-[11px] text-slate-500 mt-0.5">Google, Meta, Microsoft, Apple, Intel, Stripe, TikTok, and LinkedIn.</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                        <span className="text-xs font-bold text-[#155EEF] block">Life Sciences & MedTech</span>
                        <p className="text-[11px] text-slate-500 mt-0.5">Pfizer, Boston Scientific, Medtronic, Johnson & Johnson, and Novartis.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeBenefitId === 'post-study-work' && (
                <div className="space-y-5 animate-fade-in">
                  <div className="h-56 rounded-2xl overflow-hidden relative shadow-sm">
                    <img
                      src="/images/ireland/ucd.jpg"
                      alt="Graduate Career Pathways in Ireland"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                        Third Level Graduate Programme
                      </span>
                      <h4 className="text-lg font-bold font-editorial">
                        Stamp 1G Work Permission for Graduates
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold font-editorial text-[#14213D]">
                      Stamp 1G Post-Study Work Permission Rules
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Under the official Third Level Graduate Programme, eligible non-EEA students graduating from recognized Irish higher education institutions can apply for Stamp 1G permission to work full-time while seeking graduate employment:
                    </p>
                    <div className="space-y-2 pt-1 text-xs text-slate-700">
                      <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Level 9 Master's / Level 10 PhD:</strong> Eligible for up to <strong>24 months Stamp 1G</strong> (initially granted for 12 months, with a possible further 12-month renewal subject to compliance).</span>
                      </div>
                      <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Level 8 Honours Bachelor’s:</strong> Eligible for <strong>12 months Stamp 1G</strong> work permission.</span>
                      </div>
                      <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Conditions:</strong> Stamp 1G permits full-time employment, but does not allow self-employment or operating a business. Transition to a Critical Skills Employment Permit is the pathway to long-term residency.</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeBenefitId === 'english-speaking' && (
                <div className="space-y-5 animate-fade-in">
                  <div className="h-56 rounded-2xl overflow-hidden relative shadow-sm">
                    <img
                      src="/images/ireland/trinity.jpg"
                      alt="Trinity College Dublin Historic Campus Grounds"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                        100% English Environment
                      </span>
                      <h4 className="text-lg font-bold font-editorial">
                        Academic, Legal & Commercial Fluency
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold font-editorial text-[#14213D]">
                      Sole Native English-Speaking Nation in the EU
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Following the UK's departure from the European Union, Ireland is the only native English-speaking EU member state. International students study, socialize, and work entirely in English while benefiting from Ireland’s direct access to European single-market mobility.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                        <span className="text-xs font-bold text-[#155EEF] block">Zero Language Barrier</span>
                        <p className="text-[11px] text-slate-500 mt-0.5">Lectures, examinations, corporate interviews, and daily life are 100% in English.</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                        <span className="text-xs font-bold text-[#155EEF] block">European Market Access</span>
                        <p className="text-[11px] text-slate-500 mt-0.5">Full integration with the EU digital single market and European research frameworks.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeBenefitId === 'one-year-masters' && (
                <div className="space-y-5 animate-fade-in">
                  <div className="h-56 rounded-2xl overflow-hidden relative shadow-sm">
                    <img
                      src="/images/ireland/galway.jpg"
                      alt="Galway University Quadrangle and Research Excellence"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                        Accelerated Postgraduate Degrees
                      </span>
                      <h4 className="text-lg font-bold font-editorial">
                        12-Month Level 9 Master’s (NFQ)
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold font-editorial text-[#14213D]">
                      Intensive 1-Year Master's Degrees Save Time & Cost
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Most Irish taught Master’s degrees (NFQ Level 9) are structured over 1 calendar year (3 trimesters / 90 ECTS credits). By completing your Master’s in 12 months instead of 2 years, you save an entire year of living expenses while entering the graduate workforce sooner.
                    </p>
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                      <span className="text-xs font-bold text-[#155EEF] block">High Return on Investment</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Average starting graduate salaries in Irish technology, data analytics, and pharma sectors range between €42,000 and €65,000 per annum.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTAKES IN IRELAND */}
      <section className="py-20 sm:py-28 bg-[#FAF7F1] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#155EEF] text-xs font-bold uppercase tracking-wider border border-blue-200">
              <Calendar className="w-3.5 h-3.5" />
              <span>Academic Calendar</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#14213D] tracking-tight">
              Irish University Intakes
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Irish higher education follows a two-semester academic calendar. Application opening dates, deadlines, and intake availability vary by course and university.
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
              Autumn Intake (September / October) — Major
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
              Spring Intake (January / February) — Select
            </button>
          </div>

          {/* Intake Detail View */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
            {activeIntakeTab === 'autumn' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                      Major Academic Intake
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-editorial text-[#14213D]">
                      September / October 2026 Intake
                    </h3>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-400 font-semibold block">Application Deadline</span>
                    <span className="text-sm font-bold text-[#155EEF]">March 31 – June 30</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                    <span className="font-bold text-[#155EEF] block mb-1">Course Availability</span>
                    <p className="text-slate-600">100% of undergraduate, postgraduate Master’s, and doctoral programs open across all universities.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                    <span className="font-bold text-emerald-700 block mb-1">Scholarship Pool</span>
                    <p className="text-slate-600">Full eligibility for Government of Ireland (GOI-IES) and university merit scholarships.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
                    <span className="font-bold text-[#D99A35] block mb-1">AVATS Visa Lodgement</span>
                    <p className="text-slate-600">Lodge electronic study visa by June/July to allow 4–8 weeks processing prior to departure.</p>
                  </div>
                </div>
              </div>
            )}

            {activeIntakeTab === 'spring' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#155EEF]">
                      Secondary Intake
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-editorial text-[#14213D]">
                      January / February 2027 Intake
                    </h3>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-400 font-semibold block">Application Deadline</span>
                    <span className="text-sm font-bold text-[#155EEF]">October 15 – November 30</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                    <span className="font-bold text-[#155EEF] block mb-1">Select Program Focus</span>
                    <p className="text-slate-600">Offered for selected Master’s degrees in Data Analytics, Software Engineering, and International Business.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                    <span className="font-bold text-emerald-700 block mb-1">Ideal for Spring Graduates</span>
                    <p className="text-slate-600">Allows mid-year graduates to commence studies without an entire gap year.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
                    <span className="font-bold text-[#D99A35] block mb-1">Visa Processing Window</span>
                    <p className="text-slate-600">Submit electronic visa via AVATS by November for travel in early January.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. ENGLISH LANGUAGE REQUIREMENTS */}
      <section className="py-20 sm:py-28 bg-white border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#155EEF] text-xs font-bold uppercase tracking-wider border border-blue-200">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Language Proficiency</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#14213D] tracking-tight">
              English Language Requirements
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              English is the primary language of instruction for Irish higher education. Minimum score requirements depend on the university, faculty, and degree level.
            </p>
          </div>

          {/* Test Score Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div
              onClick={() => setActiveEnglishCard('ielts')}
              className={`p-6 rounded-3xl border transition-all cursor-pointer ${
                activeEnglishCard === 'ielts'
                  ? 'bg-[#F5F8FF] border-[#155EEF] shadow-sm ring-2 ring-blue-500/10'
                  : 'bg-white hover:bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-[#155EEF]">
                  IELTS Academic
                </span>
                <span className="text-xs text-slate-400 font-semibold">Universally Accepted</span>
              </div>
              <div className="text-3xl font-black font-editorial text-[#14213D] mb-2">
                6.5 <span className="text-sm font-normal text-slate-500">(Min 6.0 in bands)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standard unconditional benchmark across Irish Master’s degrees. Selected programs in journalism, clinical medicine, or corporate law may require an overall score of 7.0.
              </p>
            </div>

            <div
              onClick={() => setActiveEnglishCard('pte')}
              className={`p-6 rounded-3xl border transition-all cursor-pointer ${
                activeEnglishCard === 'pte'
                  ? 'bg-[#F5F8FF] border-[#155EEF] shadow-sm ring-2 ring-blue-500/10'
                  : 'bg-white hover:bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                  PTE Academic
                </span>
                <span className="text-xs text-slate-400 font-semibold">Fast Computer Results</span>
              </div>
              <div className="text-3xl font-black font-editorial text-[#14213D] mb-2">
                61 – 63+ <span className="text-sm font-normal text-slate-500">(No skill &lt; 58)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pearson PTE Academic is widely recognized by Irish university admissions offices and immigration authorities with rapid 48-hour online computer test results.
              </p>
            </div>

            <div
              onClick={() => setActiveEnglishCard('det')}
              className={`p-6 rounded-3xl border transition-all cursor-pointer ${
                activeEnglishCard === 'det'
                  ? 'bg-[#F5F8FF] border-[#155EEF] shadow-sm ring-2 ring-blue-500/10'
                  : 'bg-white hover:bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-700">
                  Duolingo English Test
                </span>
                <span className="text-xs text-slate-400 font-semibold">Where Accepted</span>
              </div>
              <div className="text-3xl font-black font-editorial text-[#14213D] mb-2">
                115 – 125+ <span className="text-sm font-normal text-slate-500">(Subscores 100+)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accepted by several major Irish universities (such as UCD, DCU, and University of Galway). Confirm program-specific acceptance before scheduling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. COST OF STUDYING IN IRELAND & WORK OPPORTUNITIES */}
      <section className="py-20 sm:py-28 bg-[#FAF7F1] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#155EEF] text-xs font-bold uppercase tracking-wider border border-blue-200">
              <Coins className="w-3.5 h-3.5" />
              <span>Financial Planning</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#14213D] tracking-tight">
              Tuition Fees & Part-Time Work Rights
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Understand estimated tuition costs and living maintenance requirements alongside official student employment rights under Irish Stamp 2 permission.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Left: Tuition & Living Costs */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold font-editorial text-[#14213D]">
                Estimated Tuition & Living Expenses (2025/2026)
              </h3>
              <p className="text-xs text-slate-600">
                Tuition fees and living costs vary considerably between Dublin and regional university cities:
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">Postgraduate Master’s Tuition (NFQ 9)</span>
                    <span className="text-slate-500">Business, IT, Engineering & Data Science</span>
                  </div>
                  <span className="font-mono font-bold text-[#155EEF] text-sm">€12,000 – €28,000 / yr</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">Undergraduate Honours Degree (NFQ 8)</span>
                    <span className="text-slate-500">3 to 4-year Bachelor’s courses</span>
                  </div>
                  <span className="font-mono font-bold text-[#155EEF] text-sm">€10,000 – €25,000 / yr</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">Living Costs in Dublin (Capital)</span>
                    <span className="text-slate-500">Rent, food, transport, and utilities</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-700 text-sm">€1,200 – €1,600 / mo</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">Living Costs Outside Dublin (Cork/Galway)</span>
                    <span className="text-slate-500">Regional university cities</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-700 text-sm">€900 – €1,200 / mo</span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-500">
                <strong>Visa Living Proof:</strong> Non-EEA students must demonstrate minimum accessible funds of <strong>€10,000</strong> for 1 year of study, without relying on future part-time earnings.
              </div>
            </div>

            {/* Right: Stamp 2 Student Work Rights & Minimum Wage */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold font-editorial text-[#14213D]">
                  Student Work Rights (Stamp 2 Permission)
                </h3>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  €14.15 / Hr Min Wage
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Eligible full-time international students holding a valid <strong>Stamp 2 permission</strong> are legally entitled to work in Ireland under statutory rules:
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="p-3.5 rounded-2xl bg-blue-50/50 border border-blue-100">
                  <span className="font-bold text-[#155EEF] block mb-1">Term-Time Work Allowance</span>
                  <p className="text-slate-600">Up to <strong>20 hours per week</strong> during standard university semester periods.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                  <span className="font-bold text-emerald-700 block mb-1">Holiday Work Allowance</span>
                  <p className="text-slate-600">Up to <strong>40 hours per week</strong> during designated holiday periods: <strong>June 1 to September 30</strong>, and <strong>December 15 to January 15</strong>.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-100">
                  <span className="font-bold text-[#D99A35] block mb-1">National Minimum Hourly Wage</span>
                  <p className="text-slate-600">Ireland’s national minimum wage for workers aged 20+ is <strong>€14.15 per hour</strong> (effective January 1, 2026 under the Workplace Relations Commission).</p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px]">Source: Workplace Relations Commission</span>
                <a
                  href="https://www.workplacerelations.ie/en/what_you_should_know/hours-and-wages/national%20minimum_wage/national_minimum_wage.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#155EEF] hover:underline"
                >
                  Official Wage Source &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SCHOLARSHIPS IN IRELAND */}
      <section className="py-20 sm:py-28 bg-white border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#155EEF] text-xs font-bold uppercase tracking-wider border border-blue-200">
              <Coins className="w-3.5 h-3.5" />
              <span>Financial Aid & Grants</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#14213D] tracking-tight">
              Scholarships in Ireland for International Students
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Explore scholarship opportunities offered by Irish universities, government-supported programs, and research organizations. Eligibility, funding, deadlines, and application procedures depend on the specific scholarship and applicant.
            </p>
          </div>

          {/* 6 Verified Scholarship Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: 'Government of Ireland Scholarships (GOI-IES)',
                provider: 'Higher Education Authority (HEA) / Government of Ireland',
                value: '€10,000 Stipend + Full Tuition Fee Waiver',
                desc: 'Highly competitive national scholarship awarded to 60 international students for 1 year of Master’s or PhD study at eligible Irish higher education institutions.',
                coverage: 'Full tuition fee waiver plus €10,000 direct living stipend paid in installments.',
                link: 'https://hea.ie/policy/internationalisation/goi-ies/',
                badge: 'Govt Flagship',
              },
              {
                title: 'Trinity College Dublin Global Excellence',
                provider: 'Trinity College Dublin',
                value: 'Up to €5,000 Tuition Fee Reduction',
                desc: 'Awarded to high-achieving international postgraduate students enrolling in full-time taught Master’s degree programs.',
                coverage: 'Direct tuition fee credit based on academic performance and personal achievements.',
                link: 'https://www.tcd.ie/study/international/scholarships/',
                badge: 'University Merit',
              },
              {
                title: 'UCD Global Excellence Scholarships',
                provider: 'University College Dublin',
                value: '50% to 100% Tuition Fee Waiver',
                desc: 'Competitive excellence awards for top-ranking international undergraduate and postgraduate students joining UCD faculties.',
                coverage: 'Substantial tuition fee reduction for exemplary academic profiles and demonstrated leadership.',
                link: 'https://www.ucd.ie/global/scholarships/',
                badge: 'Excellence Grant',
              },
              {
                title: 'University of Galway International Awards',
                provider: 'University of Galway',
                value: '€2,000 – €4,000 Tuition Deduction',
                desc: 'Merit-based scholarships automatically assessed upon admissions offer for students entering engineering, computing, and business.',
                coverage: 'Applied directly against the first-year non-EU tuition fee.',
                link: 'https://www.universityofgalway.ie/international-students/feesfinance/scholarships/',
                badge: 'Faculty Award',
              },
              {
                title: 'UCC Global Merit & Excellence Scholarships',
                provider: 'University College Cork',
                value: '€1,000 – €5,000 Fee Credit',
                desc: 'Merit awards granted upon academic admission across UCC College of Science, Engineering and Food Science, and Business faculties.',
                coverage: 'Direct fee reduction credited towards annual tuition balance.',
                link: 'https://www.ucc.ie/en/international/scholarships/',
                badge: 'STEM & Business',
              },
              {
                title: 'University of Limerick Kemmy Business Awards',
                provider: 'University of Limerick',
                value: 'Up to €4,000 Tuition Waiver',
                desc: 'Dedicated merit-based scholarships for international applicants entering the Kemmy Business School and Faculty of Science & Engineering.',
                coverage: 'Tuition reduction awarded to academically accomplished postgraduate applicants.',
                link: 'https://www.ul.ie/international/scholarships',
                badge: 'Business Merit',
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
                { step: '01', title: 'Target Scholarships', desc: 'Identify GOI-IES and university-specific merit schemes.' },
                { step: '02', title: 'Check Deadlines', desc: 'GOI-IES closes early (March); verify institutional deadlines.' },
                { step: '03', title: 'Secure Admission', desc: 'Apply to the Irish university first to obtain your Offer of Place.' },
                { step: '04', title: 'Compile Dossier', desc: 'Prepare transcripts, academic reference letters, and personal statement.' },
                { step: '05', title: 'Submit Portal', desc: 'Lodge application via the official HEA or university portal.' },
                { step: '06', title: 'Award & Visa', desc: 'Apply scholarship fee credits into your AVATS visa financial filings.' },
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

      {/* 9. 4-STAGE APPLICATION & VISA ROADMAP */}
      <section className="py-20 sm:py-28 bg-[#FAF7F1] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#155EEF] text-xs font-bold uppercase tracking-wider border border-blue-200">
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Admissions & Immigration</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#14213D] tracking-tight">
              4-Stage Ireland Admission Checklist
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Track your preparation from university application through to AVATS visa filing, IRP registration, and Stamp 1G post-study employment.
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

      {/* 10. WHY CHOOSE MASTERS VISA & BRANCH CONTACTS */}
      <section className="py-20 sm:py-24 bg-white border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#155EEF] text-xs font-bold uppercase tracking-wider border border-blue-200">
              <Building className="w-3.5 h-3.5" />
              <span>Dedicated Consultation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#14213D] tracking-tight">
              Why Partner with Masters Visa for Ireland?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We provide end-to-end guidance from university evaluation through to AVATS visa filing, financial escrow verification, and accommodation planning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <div className="p-6 rounded-3xl bg-[#FAF7F1] border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#155EEF]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Education Counselling & University Selection</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Personalized shortlisting across Trinity, UCD, Galway, UCC, DCU, and UL based on your undergraduate GPA, budget, and post-study career goals.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF7F1] border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Application & SOP Dossier Support</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rigorous review of your Statement of Purpose (SOP), letters of recommendation, and academic CV to maximize unconditional offer acceptance.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF7F1] border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
                <Coins className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">AVATS Visa & Financial Guidance</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Step-by-step assistance with Ireland’s Electronic Visa Application Facility (AVATS), 6-month bank statement audit (€10,000), and medical insurance verification.
              </p>
            </div>
          </div>

          {/* Masters Visa Branch Network */}
          <div className="bg-[#FAF7F1] rounded-3xl p-6 sm:p-10 border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200">
              <div>
                <h3 className="text-xl font-bold font-editorial text-[#14213D]">
                  Visit Our Masters Visa Branches
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Corporate Office: <strong>Guntur</strong> | Regional Hubs across Andhra Pradesh & Telangana
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#155EEF]" />
                <a href="tel:9133855571" className="text-sm font-bold text-[#155EEF] hover:underline">
                  +91 91338 55571
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { city: 'Guntur (HQ)', url: 'https://mastersvisa.com/study-abroad-consultants-in-guntur/' },
                { city: 'Vijayawada', url: 'https://mastersvisa.com/study-abroad-consultants-in-vijayawada/' },
                { city: 'Tirupati', url: 'https://mastersvisa.com/study-abroad-consultants-in-tirupati/' },
                { city: 'Nellore', url: 'https://mastersvisa.com/study-abroad-consultants-in-nellore/' },
                { city: 'Bapatla', url: 'https://mastersvisa.com/study-abroad-consultants-in-bapatla/' },
                { city: 'Nalgonda', url: 'https://mastersvisa.com/study-abroad-consultants-in-nalgonda/' },
              ].map((branch, bIdx) => (
                <a
                  key={bIdx}
                  href={branch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white border border-slate-200 text-center hover:border-[#155EEF] hover:shadow-xs transition-all group"
                >
                  <span className="text-xs font-bold text-slate-900 group-hover:text-[#155EEF] block truncate">
                    {branch.city}
                  </span>
                  <span className="text-[10px] text-slate-400 group-hover:text-[#155EEF] flex items-center justify-center gap-0.5 mt-1">
                    <span>Branch Page</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11. FINAL CTA SECTION (MATCHING UK PAGE) */}
      <section className="py-20 sm:py-24 bg-gradient-to-br from-[#14213D] via-[#0F1A30] to-[#14213D] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#155EEF]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D99A35]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>Begin Your Study in Ireland Journey</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-white tracking-tight">
            Start Your Study in Ireland Journey
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Get guidance on choosing an Irish university, preparing your application, understanding visa requirements, and exploring scholarship opportunities.
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

      {/* 12. DESTINATION SWITCHER NAVIGATION */}
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
                  d.id === 'ireland'
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
                  Featured Master's & Bachelor's Degrees
                </h4>
                <div className="space-y-2">
                  {activeUniModal.programs.map((prog, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-900 block">{prog.name}</span>
                        <span className="text-[11px] text-slate-500">{prog.level} • {prog.duration} • Stamp 1G Eligible</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-[#155EEF] block">{prog.tuition}</span>
                        <span className="text-[10px] text-slate-400">Estimate</span>
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
      <IrelandEligibilityModal
        isOpen={isEligibilityModalOpen}
        onClose={() => setIsEligibilityModalOpen(false)}
        onProceedConsultation={(data) => {
          if (onOpenCounselling) {
            onOpenCounselling(data ? `Ireland: ${data.scoreSummary}` : 'Ireland');
          }
        }}
      />
    </div>
  );
};
