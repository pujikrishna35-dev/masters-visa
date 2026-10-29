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
  Trees
} from 'lucide-react';
import { NzEligibilityModal } from '../components/NzEligibilityModal';
import { UniversityLogo } from '../components/UniversityLogo';
import { DestinationNavBar } from '../components/DestinationNavBar';

interface StudyInNewZealandPageProps {
  onOpenCounselling?: (destination?: string) => void;
}

interface UniversityItem {
  id: string;
  name: string;
  location: string;
  rankBadge: string;
  rankingSource: string;
  logoType: 'auckland' | 'otago' | 'victoria_wgtn' | 'canterbury' | 'aut' | 'massey';
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
  { id: 'engineering', label: 'Engineering & STEM', icon: Cpu },
  { id: 'business', label: 'Business & Commerce', icon: Briefcase },
  { id: 'cs', label: 'Computer Science & AI', icon: Code2 },
  { id: 'medicine', label: 'Health & Medical', icon: Stethoscope },
  { id: 'agriculture', label: 'Agri & Environment', icon: Trees },
  { id: 'law', label: 'Law & Policy', icon: Scale },
] as const;

const UNIVERSITIES_DATA: UniversityItem[] = [
  {
    id: 'auckland',
    name: 'University of Auckland',
    location: 'Auckland, North Island',
    rankBadge: '#65 Global',
    rankingSource: 'QS World University Rankings 2025 • New Zealand #1',
    logoType: 'auckland',
    categories: ['all', 'engineering', 'business', 'cs', 'medicine', 'law'],
    shortDesc: 'New Zealand’s highest-ranked comprehensive university, recognized internationally for engineering innovation, medical sciences, and strong links to Auckland’s commercial tech sector.',
    image: '/images/nz/auckland.jpg',
    tags: ['Software Engineering', 'Biomedical Science', 'Commercial Law', 'Master of Management'],
    programs: [
      { name: 'Master of Information Technology (MIT)', level: "Master's (NZQF 9)", duration: '1.5 – 2 Years', pswEligible: true, tuition: 'NZ$48,900 / yr' },
      { name: 'Master of Management & Global Business', level: "Master's (NZQF 9)", duration: '15 Months', pswEligible: true, tuition: 'NZ$41,800 / yr' },
      { name: 'Bachelor of Engineering (Honours)', level: "Bachelor's (NZQF 7)", duration: '4 Years', pswEligible: true, tuition: 'NZ$53,500 / yr' },
      { name: 'Master of Data Science', level: "Master's (NZQF 9)", duration: '1.5 Years', pswEligible: true, tuition: 'NZ$49,200 / yr' },
    ],
  },
  {
    id: 'otago',
    name: 'University of Otago',
    location: 'Dunedin, South Island',
    rankBadge: '#206 Global',
    rankingSource: 'QS World University Rankings 2025 • Established 1869',
    logoType: 'otago',
    categories: ['all', 'medicine', 'agriculture', 'business', 'law'],
    shortDesc: 'New Zealand’s oldest university, world-renowned for its historic Gothic stone architecture, health sciences division, biomedical research, and vibrant residential collegiate campus.',
    image: '/images/nz/otago.jpg',
    tags: ['Health Sciences', 'Biomedical Research', 'Dentistry & Pharmacy', 'Marine Science'],
    programs: [
      { name: 'Master of Public Health (MPH)', level: "Master's (NZQF 9)", duration: '1 – 2 Years', pswEligible: true, tuition: 'NZ$45,600 / yr' },
      { name: 'Master of Finance (MFin)', level: "Master's (NZQF 9)", duration: '1 Year', pswEligible: true, tuition: 'NZ$42,500 / yr' },
      { name: 'Bachelor of Biomedical Sciences', level: "Bachelor's (NZQF 7)", duration: '3 Years', pswEligible: true, tuition: 'NZ$40,800 / yr' },
      { name: 'Master of Wildlife Management', level: "Master's (NZQF 9)", duration: '1 Year', pswEligible: true, tuition: 'NZ$44,200 / yr' },
    ],
  },
  {
    id: 'victoria_wgtn',
    name: 'Victoria University of Wellington',
    location: 'Wellington, Capital Region',
    rankBadge: '#241 Global',
    rankingSource: 'QS World Rankings 2025 • Top 2% Worldwide',
    logoType: 'victoria_wgtn',
    categories: ['all', 'law', 'business', 'cs', 'agriculture'],
    shortDesc: 'Located in the nation’s political and creative hub, Victoria University is distinguished for public policy, law, creative digital media (partnered with Weta Digital), and climate research.',
    image: '/images/nz/victoria.jpg',
    tags: ['Public Policy', 'Cybersecurity', 'Design & Digital Media', 'International Relations'],
    programs: [
      { name: 'Master of Software Development (MSwDev)', level: "Master's (NZQF 9)", duration: '1 Year', pswEligible: true, tuition: 'NZ$47,300 / yr' },
      { name: 'Master of Public Policy (MPP)', level: "Master's (NZQF 9)", duration: '1.5 Years', pswEligible: true, tuition: 'NZ$39,800 / yr' },
      { name: 'Master of Professional Accounting (MPA)', level: "Master's (NZQF 9)", duration: '1.5 Years', pswEligible: true, tuition: 'NZ$41,200 / yr' },
      { name: 'Bachelor of Design Innovation', level: "Bachelor's (NZQF 7)", duration: '3 Years', pswEligible: true, tuition: 'NZ$38,500 / yr' },
    ],
  },
  {
    id: 'canterbury',
    name: 'University of Canterbury',
    location: 'Christchurch, South Island',
    rankBadge: '#256 Global',
    rankingSource: 'QS World Rankings 2025 • Global Top 1% Engineering',
    logoType: 'canterbury',
    categories: ['all', 'engineering', 'cs', 'business', 'agriculture'],
    shortDesc: 'An engineering powerhouse situated in Christchurch, Canterbury is famed for civil and structural engineering, aerospace propulsion laboratories, and deep ties to high-tech manufacturing.',
    image: '/images/nz/canterbury.jpg',
    tags: ['Civil & Structural Engineering', 'Aerospace Technology', 'Data Analytics', 'Forestry Science'],
    programs: [
      { name: 'Master of Engineering Studies (MEngSt)', level: "Master's (NZQF 9)", duration: '1 Year', pswEligible: true, tuition: 'NZ$46,500 / yr' },
      { name: 'Master of Applied Data Science (MADS)', level: "Master's (NZQF 9)", duration: '1 Year', pswEligible: true, tuition: 'NZ$45,800 / yr' },
      { name: 'Bachelor of Forestry Science', level: "Bachelor's (NZQF 7)", duration: '4 Years', pswEligible: true, tuition: 'NZ$41,000 / yr' },
      { name: 'Master of Business Information Systems', level: "Master's (NZQF 9)", duration: '1.5 Years', pswEligible: true, tuition: 'NZ$43,200 / yr' },
    ],
  },
  {
    id: 'aut',
    name: 'Auckland University of Technology (AUT)',
    location: 'Auckland City, North Island',
    rankBadge: '#407 Global',
    rankingSource: 'Times Higher Education World Top 300 • Fastest Rising',
    logoType: 'aut',
    categories: ['all', 'cs', 'engineering', 'business', 'medicine'],
    shortDesc: 'New Zealand’s contemporary technology university, renowned for 95% graduate employment rates, state-of-the-art interactive facilities, and industry co-op placements.',
    image: '/images/nz/aut.jpg',
    tags: ['Artificial Intelligence', 'Construction Management', 'Creative Technologies', 'Physiotherapy'],
    programs: [
      { name: 'Master of Construction Management', level: "Master's (NZQF 9)", duration: '1 Year', pswEligible: true, tuition: 'NZ$42,800 / yr' },
      { name: 'Master of Computer & Information Sciences', level: "Master's (NZQF 9)", duration: '1.5 Years', pswEligible: true, tuition: 'NZ$44,600 / yr' },
      { name: 'Bachelor of Health Science (Nursing / Physio)', level: "Bachelor's (NZQF 7)", duration: '3 Years', pswEligible: true, tuition: 'NZ$39,400 / yr' },
      { name: 'Master of Global Business (MGB)', level: "Master's (NZQF 9)", duration: '1 Year', pswEligible: true, tuition: 'NZ$38,900 / yr' },
    ],
  },
  {
    id: 'massey',
    name: 'Massey University',
    location: 'Palmerston North & Auckland',
    rankBadge: '#239 Global',
    rankingSource: 'QS World University Rankings 2025 • World #29 Agriculture',
    logoType: 'massey',
    categories: ['all', 'agriculture', 'business', 'medicine', 'engineering'],
    shortDesc: 'A national leader in agricultural sciences, veterinary medicine, aviation, and food technology, with major research campuses across Auckland, Palmerston North, and Wellington.',
    image: '/images/nz/massey.jpg',
    tags: ['Aviation & Flight Training', 'Agritech & Sustainability', 'Veterinary Medicine', 'Food Technology'],
    programs: [
      { name: 'Master of AgriCommerce', level: "Master's (NZQF 9)", duration: '1.5 – 2 Years', pswEligible: true, tuition: 'NZ$41,500 / yr' },
      { name: 'Master of Food Technology (MFoodTech)', level: "Master's (NZQF 9)", duration: '1.5 Years', pswEligible: true, tuition: 'NZ$45,200 / yr' },
      { name: 'Bachelor of Aviation (Air Transport Pilot)', level: "Bachelor's (NZQF 7)", duration: '3 Years', pswEligible: true, tuition: 'NZ$49,000 / yr' },
      { name: 'Master of Supply Chain Management', level: "Master's (NZQF 9)", duration: '1.5 Years', pswEligible: true, tuition: 'NZ$39,800 / yr' },
    ],
  },
];

export const StudyInNewZealandPage: React.FC<StudyInNewZealandPageProps> = ({
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

  // Active benefit card for Why Study in New Zealand
  const [activeBenefitId, setActiveBenefitId] = useState<string>('world-class-system');

  // Intake Timeline Active Tab
  const [activeIntakeTab, setActiveIntakeTab] = useState<'february' | 'july' | 'summer'>('february');

  // English Proficiency Active Card
  const [activeEnglishCard, setActiveEnglishCard] = useState<'ielts' | 'pte' | 'toefl'>('ielts');

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
      onOpenCounselling('New Zealand');
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
      title: 'Course Evaluation & NZQF Shortlisting',
      summary: 'Evaluate all 8 public universities based on course offerings, campus locations, tuition fees, and NZQF qualification levels.',
      details: [
        'Select between Level 7 Bachelor’s (3 Yrs), Level 8 PGDip (1 Yr), or Level 9 Master’s (1.5–2 Yrs).',
        'Review syllabus modules, research thesis credits, and practical industry internships.',
        'Compare tuition fees (NZ$24,000 – NZ$45,000/yr) and assess automatic university merit scholarships.',
        'Verify in-demand skills aligning with the New Zealand Green List (Tier 1 Straight to Residence & Tier 2 Work to Residence).',
      ],
    },
    {
      number: '02',
      title: 'Prepare Dossier & Institutional Application',
      summary: 'Submit your formal application to target institutions along with verified transcripts and Statement of Purpose.',
      details: [
        'Draft an academically rigorous Statement of Purpose highlighting motivation and post-study career goals.',
        'Submit official degree certificates, consolidated mark sheets, and academic references.',
        'Provide verified English proficiency scores (IELTS Academic 6.5, PTE 58+, or institutional pathway).',
        'Receive your formal Conditional or Unconditional Offer of Place from the university admissions office.',
      ],
    },
    {
      number: '03',
      title: 'Offer Acceptance, Tuition & Living Funds (NZ$20,000)',
      summary: 'Accept the Offer of Place, pay tuition fee deposit, and demonstrate required Immigration New Zealand maintenance funds.',
      details: [
        'Pay the required first-year tuition fee or agreed deposit directly to the university.',
        'Receive your official Receipt of Fee Payment and Unconditional Offer of Place confirming your confirmed placement.',
        'Prepare liquid maintenance funds of at least NZ$20,000/year (or NZ$1,667/month for programs under 1 year) held in recognized accounts.',
        'Arrange additional funds or pre-paid flight tickets to prove outward travel capability.',
      ],
    },
    {
      number: '04',
      title: 'Fee Paying Student Visa Application (Immigration NZ)',
      summary: 'Undergo medical examinations, obtain police clearance, and submit your official visa via Immigration Online.',
      details: [
        'Complete chest X-ray and medical examination with an Immigration New Zealand approved panel physician.',
        'Obtain an official Police Clearance Certificate (PCC) for applicants intending to stay in New Zealand for 24 months or longer.',
        'Secure mandatory comprehensive medical and travel insurance under the Education Pastoral Care Code.',
        'Submit your Fee Paying Student Visa application online (fee NZ$750) and prepare for genuine student interview questions.',
      ],
    },
  ];

  return (
    <div className="bg-[#FAF7F1] min-h-screen font-sans text-slate-800 antialiased selection:bg-[#155EEF] selection:text-white">
      {/* Destination Country Navigation Bar */}
      <DestinationNavBar activeCountry="new-zealand" />

      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-20 sm:pt-12 sm:pb-28 overflow-hidden bg-gradient-to-b from-[#F2F6FE] via-[#FAF7F1] to-[#FAF7F1]">
        {/* Subtle decorative grid and lighting glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#155EEF_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#155EEF]/10 via-[#0040C1]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Copy & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D0E2FF] shadow-xs text-xs font-bold text-[#155EEF] animate-fade-in">
                <span className="w-2 h-2 rounded-full bg-[#155EEF] animate-pulse" />
                <span>NEW ZEALAND ADMISSIONS 2026 / 2027</span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-600 font-semibold">100% Universities in World Top 3%</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-editorial text-[#14213D] tracking-tight leading-[1.12]">
                Study in <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#155EEF] via-[#0040C1] to-[#14213D]">
                  New Zealand
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Discover quality education, practical learning opportunities, welcoming communities, and breathtaking natural landscapes while studying in New Zealand.
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
                  <span>Consult NZ Specialist</span>
                </button>
              </div>

              {/* Key Trust Signals */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#155EEF]" />
                  <span>NZQA & Pastoral Care Code</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#155EEF]" />
                  <span>Up to 3-Year PSWV</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#155EEF]" />
                  <span>Green List Fast-Track PR</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card with Flight Path & Floating Card */}
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

                {/* Main Hero Photo Container matching UK image dimensions */}
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 bg-white aspect-[4/3] group">
                  <img
                    src="/images/nz/nz-hero.jpg"
                    alt="Auckland Skyline, Waitematā Harbour and New Zealand Higher Education"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14213D]/70 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                      Auckland & Wellington Innovation Hubs
                    </span>
                    <p className="text-base font-bold font-editorial mt-0.5">
                      World-Class Education • Unmatched Lifestyle
                    </p>
                  </div>
                </div>

                {/* Floating Glassmorphic Pill Badge */}
                <div className="absolute -bottom-5 -left-5 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Fee Paying Visa</p>
                    <p className="text-sm font-extrabold text-[#14213D]">96% Visa Success Rate</p>
                  </div>
                </div>

                {/* Floating Badge Right */}
                <div className="absolute -top-4 -right-4 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-slate-100 hidden sm:flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#D99A35]" />
                  <span className="text-xs font-bold text-[#14213D]">All 8 Unis in QS Top 500</span>
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
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Global Standing</p>
              <p className="text-lg sm:text-xl font-extrabold text-[#14213D] mt-0.5">100% in Top 3%</p>
              <p className="text-[11px] text-slate-500">All 8 NZ Public Universities</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 sm:pt-0 pl-0 sm:pl-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 text-emerald-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Post-Study Work</p>
              <p className="text-lg sm:text-xl font-extrabold text-[#14213D] mt-0.5">Up to 3 Years</p>
              <p className="text-[11px] text-slate-500">Open Work Visa (Level 9 Master's)</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 sm:pt-0 pl-0 sm:pl-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 text-[#155EEF]">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Student Work Rights</p>
              <p className="text-lg sm:text-xl font-extrabold text-[#14213D] mt-0.5">20 Hrs / Wk</p>
              <p className="text-[11px] text-slate-500">Full-time during scheduled breaks</p>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 sm:pt-0 pl-0 sm:pl-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 text-[#D99A35]">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Living Proof Benchmark</p>
              <p className="text-lg sm:text-xl font-extrabold text-[#14213D] mt-0.5">NZ$20,000 / Yr</p>
              <p className="text-[11px] text-slate-500">Immigration NZ official standard</p>
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
              <span>Ranked Institutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#14213D] tracking-tight">
              Explore Top New Zealand Universities
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every single university in New Zealand is internationally ranked among the world’s top 3%. Compare tuition, degree specializations, and post-study opportunities across the country.
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

      {/* 4. WHY STUDY IN NEW ZEALAND (BENEFITS & SPLIT PREVIEW) */}
      <section className="py-20 sm:py-28 bg-white border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#155EEF] text-xs font-bold uppercase tracking-wider border border-blue-200">
              <Award className="w-3.5 h-3.5" />
              <span>Why Study in New Zealand</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#14213D] tracking-tight">
              An Unsurpassed Academic & Career Journey
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              New Zealand pairs hands-on, research-driven higher education with generous post-study work rights and a tranquil, safe lifestyle ranked among the finest on Earth.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 4 Interactive Selector Cards */}
            <div className="lg:col-span-5 space-y-3.5">
              {[
                {
                  id: 'world-class-system',
                  title: 'World-Class Education & Practical Learning',
                  summary: 'All 8 universities rank in the QS World Top 3%, delivering internationally accredited qualifications under the NZQF framework.',
                  icon: GraduationCap,
                },
                {
                  id: 'post-study-work',
                  title: 'Up to 3-Year Post-Study Open Work Visa',
                  summary: 'Graduates of Level 9 Master’s programs receive 3 years of open work rights without requiring an immediate employer sponsor.',
                  icon: Briefcase,
                },
                {
                  id: 'green-list-pr',
                  title: 'Fast-Track Green List Residence Pathways',
                  summary: 'Specialized occupations in IT, engineering, construction, and healthcare offer straight-to-residence or work-to-residence tracks.',
                  icon: Award,
                },
                {
                  id: 'pastoral-care-lifestyle',
                  title: 'Pastoral Care Code & Peaceful Lifestyle',
                  summary: 'Ranked #2 on the Global Peace Index, protected under the world’s first mandatory Pastoral Care Code for international students.',
                  icon: ShieldCheck,
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
              {activeBenefitId === 'world-class-system' && (
                <div className="space-y-5 animate-fade-in">
                  <div className="h-56 rounded-2xl overflow-hidden relative shadow-sm">
                    <img
                      src="/images/nz/auckland.jpg"
                      alt="New Zealand University Lecture and Campus Setting"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                        Rigorous Academic Excellence
                      </span>
                      <h4 className="text-lg font-bold font-editorial">
                        Hands-On Learning Built into Every Syllabus
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold font-editorial text-[#14213D]">
                      World-Class Education System & Practical Learning
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      New Zealand tertiary education operates under the strict quality assurance of the New Zealand Qualifications Authority (NZQF). Qualifications range from Level 7 Bachelor’s Degrees to Level 9 Master’s Degrees and Level 10 Doctorates.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                        <span className="text-xs font-bold text-[#155EEF] block">100% University Standing</span>
                        <p className="text-[11px] text-slate-500 mt-0.5">All 8 public universities hold QS World Top 500 status.</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                        <span className="text-xs font-bold text-[#155EEF] block">Direct Practical Learning</span>
                        <p className="text-[11px] text-slate-500 mt-0.5">Applied industry projects, lab research, and corporate internships.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeBenefitId === 'post-study-work' && (
                <div className="space-y-5 animate-fade-in">
                  <div className="h-56 rounded-2xl overflow-hidden relative shadow-sm">
                    <img
                      src="/images/nz/victoria.jpg"
                      alt="Wellington Corporate Tech District"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                        Post-Study Work Visa (PSWV)
                      </span>
                      <h4 className="text-lg font-bold font-editorial">
                        Unrestricted Employment Freedom for 3 Full Years
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold font-editorial text-[#14213D]">
                      Post-Study Work Rights Tailored to Qualification Level
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Under Immigration New Zealand regulations, Post-Study Work Visa durations directly reflect your qualification level on the NZQF framework:
                    </p>
                    <div className="space-y-2 pt-1 text-xs text-slate-700">
                      <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Level 9 Master’s & Level 10 PhD:</strong> 3-year open work visa with freedom to work for any employer in New Zealand.</span>
                      </div>
                      <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Level 7 Bachelor’s (3 Years):</strong> 3-year open work visa upon successful completion.</span>
                      </div>
                      <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Level 8 Postgraduate Diploma:</strong> 1-year post-study work permit.</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeBenefitId === 'green-list-pr' && (
                <div className="space-y-5 animate-fade-in">
                  <div className="h-56 rounded-2xl overflow-hidden relative shadow-sm">
                    <img
                      src="/images/nz/canterbury.jpg"
                      alt="Christchurch Engineering Innovation"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                        Immigration New Zealand Green List
                      </span>
                      <h4 className="text-lg font-bold font-editorial">
                        Accelerated Skilled Residency Pathways
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold font-editorial text-[#14213D]">
                      Direct Alignment with New Zealand’s Critical Skill Shortages
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      New Zealand’s Green List categorizes high-demand occupations into two fast-tracked residence tiers:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                        <span className="text-xs font-bold text-emerald-600 block">Tier 1: Straight to Residence</span>
                        <p className="text-[11px] text-slate-500 mt-0.5">Software Engineers, ICT Managers, Civil Engineers, Doctors, Registered Nurses.</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                        <span className="text-xs font-bold text-[#155EEF] block">Tier 2: Work to Residence</span>
                        <p className="text-[11px] text-slate-500 mt-0.5">Teachers, Construction Supervisors, and skilled trades after 24 months of working.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeBenefitId === 'pastoral-care-lifestyle' && (
                <div className="space-y-5 animate-fade-in">
                  <div className="h-56 rounded-2xl overflow-hidden relative shadow-sm">
                    <img
                      src="/images/nz/nz-lifestyle.jpg"
                      alt="New Zealand Natural Landscapes and Student Wellbeing"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                        Safety, Manaakitanga & Student Care
                      </span>
                      <h4 className="text-lg font-bold font-editorial">
                        Statutory Protection Under the Pastoral Care Code
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold font-editorial text-[#14213D]">
                      Ranked #2 on the Global Peace Index
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      New Zealand was the first nation in the world to adopt a mandatory code of practice for international students. The <em>Education (Pastoral Care of Tertiary and International Learners) Code of Practice 2021</em> legally ensures all institutions provide 24/7 student welfare, mental health care, and fair accommodation standards.
                    </p>
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                      <span className="text-xs font-bold text-[#155EEF] block">Partner & Family Work Rights</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Spouses of students enrolled in Level 9 Master’s programs can obtain full-time open work visas, and dependent school-aged children are eligible for domestic student fee tuition.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEW ZEALAND ACADEMIC INTAKES TIMELINE */}
      <section className="py-20 sm:py-28 bg-[#FAF7F1] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#155EEF] text-xs font-bold uppercase tracking-wider border border-blue-200">
              <Calendar className="w-3.5 h-3.5" />
              <span>Academic Calendar</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#14213D] tracking-tight">
              New Zealand Admission Intakes
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              New Zealand runs on a southern-hemisphere academic year. Understanding application deadlines and visa processing timelines is vital for a smooth transition.
            </p>
          </div>

          {/* Intakes Tabs */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <button
              type="button"
              onClick={() => setActiveIntakeTab('february')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeIntakeTab === 'february'
                  ? 'bg-[#155EEF] text-white shadow-md shadow-blue-500/20'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              Semester 1 (Feb / Mar) — Major Intake
            </button>
            <button
              type="button"
              onClick={() => setActiveIntakeTab('july')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeIntakeTab === 'july'
                  ? 'bg-[#155EEF] text-white shadow-md shadow-blue-500/20'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              Semester 2 (July) — Mid-Year
            </button>
            <button
              type="button"
              onClick={() => setActiveIntakeTab('summer')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeIntakeTab === 'summer'
                  ? 'bg-[#155EEF] text-white shadow-md shadow-blue-500/20'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              Summer School (Nov / Dec)
            </button>
          </div>

          {/* Intake Detail View */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
            {activeIntakeTab === 'february' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                      Primary Southern Hemisphere Intake
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-editorial text-[#14213D]">
                      Semester 1 (February / March 2027)
                    </h3>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-400 font-semibold block">Application Deadline</span>
                    <span className="text-sm font-bold text-[#155EEF]">October 31 – November 30</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                    <span className="font-bold text-[#155EEF] block mb-1">Course Availability</span>
                    <p className="text-slate-600">100% of undergraduate, postgraduate, and doctoral degrees commence in Semester 1.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                    <span className="font-bold text-emerald-700 block mb-1">Scholarship Pool</span>
                    <p className="text-slate-600">Maximum allocation of university excellence and government scholarships.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
                    <span className="font-bold text-[#D99A35] block mb-1">Visa Processing Window</span>
                    <p className="text-slate-600">Submit Fee Paying Student Visa applications by November for smooth travel.</p>
                  </div>
                </div>
              </div>
            )}

            {activeIntakeTab === 'july' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#155EEF]">
                      Mid-Year Intake
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-editorial text-[#14213D]">
                      Semester 2 (July 2027)
                    </h3>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-400 font-semibold block">Application Deadline</span>
                    <span className="text-sm font-bold text-[#155EEF]">April 30 – May 31</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                    <span className="font-bold text-[#155EEF] block mb-1">Course Availability</span>
                    <p className="text-slate-600">Over 80% of business, IT, engineering, and data science Master’s programs open.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                    <span className="font-bold text-emerald-700 block mb-1">Ideal for Spring Grads</span>
                    <p className="text-slate-600">Ideal for students completing Indian degrees in May/June without a gap year.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
                    <span className="font-bold text-[#D99A35] block mb-1">Visa Submission</span>
                    <p className="text-slate-600">Lodge visa documents by May to ensure arrival prior to orientation week.</p>
                  </div>
                </div>
              </div>
            )}

            {activeIntakeTab === 'summer' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D99A35]">
                      Intensive Pathway Term
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-editorial text-[#14213D]">
                      Summer School (November / December)
                    </h3>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-400 font-semibold block">Application Deadline</span>
                    <span className="text-sm font-bold text-[#155EEF]">September 30</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                    <span className="font-bold text-[#155EEF] block mb-1">Program Focus</span>
                    <p className="text-slate-600">English language bridges, Foundation courses, and accelerated business certificates.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                    <span className="font-bold text-emerald-700 block mb-1">Progression Track</span>
                    <p className="text-slate-600">Successful completion leads directly into February Semester 1 degree matriculation.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
                    <span className="font-bold text-[#D99A35] block mb-1">Pre-sessional Visa</span>
                    <p className="text-slate-600">Pathway student visa issued covering pathway course through final degree.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. ENGLISH PROFICIENCY GUIDE & STUDY WITHOUT IELTS */}
      <section className="py-20 sm:py-28 bg-white border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#155EEF] text-xs font-bold uppercase tracking-wider border border-blue-200">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Language Requirements</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#14213D] tracking-tight">
              English Language Requirements
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              New Zealand universities accept major standardized English tests. Exact score prerequisites depend on the institution and level of study.
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
                Standard unconditional benchmark for postgraduate Master’s programs (Level 9). Undergraduate Bachelor’s degrees typically require an overall 6.0 with no band less than 5.5.
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
                58+ <span className="text-sm font-normal text-slate-500">(No skill &lt; 50)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pearson Test of English is widely favored by international applicants across New Zealand for swift 48-hour computer test scoring and direct online institutional score reporting.
              </p>
            </div>

            <div
              onClick={() => setActiveEnglishCard('toefl')}
              className={`p-6 rounded-3xl border transition-all cursor-pointer ${
                activeEnglishCard === 'toefl'
                  ? 'bg-[#F5F8FF] border-[#155EEF] shadow-sm ring-2 ring-blue-500/10'
                  : 'bg-white hover:bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-700">
                  TOEFL iBT
                </span>
                <span className="text-xs text-slate-400 font-semibold">Global Standard</span>
              </div>
              <div className="text-3xl font-black font-editorial text-[#14213D] mb-2">
                80 – 90+ <span className="text-sm font-normal text-slate-500">(Writing 21+)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accepted across all 8 New Zealand public universities and approved by Immigration New Zealand for Fee Paying Student Visa applications.
              </p>
            </div>
          </div>

          {/* Study Without IELTS / Alternative Pathways */}
          <div className="bg-[#FAF7F1] rounded-3xl p-6 sm:p-10 border border-slate-200">
            <div className="max-w-2xl mb-8">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#155EEF]">Alternative Pathways</span>
              <h3 className="text-2xl font-bold font-editorial text-[#14213D] mt-1">
                Study in New Zealand Without IELTS
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Candidates with prior English-medium education or those seeking institutional language bridge pathways can satisfy English proficiency without an IELTS test.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200">
                <span className="text-xs font-bold text-[#155EEF] block mb-1">01. Medium of Instruction (MOI)</span>
                <p className="text-xs text-slate-600">Select institutions accept official university confirmation that your Bachelor’s degree was taught and examined in English.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200">
                <span className="text-xs font-bold text-[#155EEF] block mb-1">02. NZCEL Language Pathway</span>
                <p className="text-xs text-slate-600">Enrolling in the New Zealand Certificate in English Language (Level 4 or 5) guarantees direct academic entry without external exams.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200">
                <span className="text-xs font-bold text-[#155EEF] block mb-1">03. University English Academy</span>
                <p className="text-xs text-slate-600">Pre-sessional English courses (e.g., ELA at University of Auckland) provide conditional admission progression.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200">
                <span className="text-xs font-bold text-[#155EEF] block mb-1">04. Prior English Study</span>
                <p className="text-xs text-slate-600">Applicants who completed secondary schooling or degrees in an English-speaking country meet requirements automatically.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SCHOLARSHIPS IN NEW ZEALAND */}
      <section className="py-20 sm:py-28 bg-[#FAF7F1] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#155EEF] text-xs font-bold uppercase tracking-wider border border-blue-200">
              <Coins className="w-3.5 h-3.5" />
              <span>Financial Aid & Funding</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#14213D] tracking-tight">
              Scholarships in New Zealand
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Explore scholarships and funding opportunities offered by eligible New Zealand universities, government programs, and other education providers. Availability and eligibility depend on your nationality, academic background, chosen qualification, institution, and the specific scholarship.
            </p>
          </div>

          {/* 6 Verified Scholarship Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: 'Manaaki New Zealand Scholarships',
                provider: 'New Zealand Foreign Affairs & Trade (MFAT)',
                value: 'Full Tuition + NZ$531/Wk Living Allowance',
                desc: 'Prestigious government-funded awards for eligible international students from partner developing countries pursuing tertiary qualifications.',
                coverage: 'Full tuition, weekly living stipend, establishment allowance, and medical insurance.',
                link: 'https://www.nzscholarships.govt.nz/',
                badge: 'Govt Funded',
              },
              {
                title: 'University of Auckland Excellence Scholarship',
                provider: 'University of Auckland',
                value: 'Up to NZ$10,000 Tuition Fee Waiver',
                desc: 'Awarded bi-annually to outstanding international undergraduate and postgraduate students entering full-time degree programs.',
                coverage: 'Direct tuition fee deduction for high academic performance (GPA equivalent 7.0+ on 9.0 scale).',
                link: 'https://www.auckland.ac.nz/',
                badge: 'Merit-Based',
              },
              {
                title: 'VUW Tongarewa Scholarship',
                provider: 'Victoria University of Wellington',
                value: 'NZ$5,000 or NZ$10,000 Fee Contribution',
                desc: 'Competitive excellence scholarship for international students with proven academic track records starting Bachelor’s or Master’s degrees.',
                coverage: 'Credited directly towards first-year university tuition fees.',
                link: 'https://www.wgtn.ac.nz/',
                badge: 'University Award',
              },
              {
                title: 'Otago International Research Master’s',
                provider: 'University of Otago',
                value: 'NZ$17,172 Stipend / Yr + Tuition Waiver',
                desc: 'Dedicated funding for high-achieving international postgraduate students enrolling in research-focused Master’s thesis degrees.',
                coverage: 'Annual living stipend plus complete domestic/international tuition fee subsidy.',
                link: 'https://www.otago.ac.nz/',
                badge: 'Research Funding',
              },
              {
                title: 'Canterbury International First Year Scholarship',
                provider: 'University of Canterbury',
                value: 'NZ$15,000 – NZ$20,000 Award',
                desc: 'Recognizes academic excellence in top-ranking international students entering undergraduate or postgraduate coursework.',
                coverage: 'Tuition reduction applied directly during the first academic year.',
                link: 'https://www.canterbury.ac.nz/',
                badge: 'First Year Merit',
              },
              {
                title: 'AUT International Excellence Scholarship',
                provider: 'Auckland University of Technology',
                value: 'NZ$7,500 Fee Contribution',
                desc: 'Awarded to accomplished international students commencing studies across business, engineering, and computer science faculties.',
                coverage: 'Direct fee reduction for applicants demonstrating exemplary academic and leadership records.',
                link: 'https://www.aut.ac.nz/',
                badge: 'Excellence Grant',
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
                { step: '01', title: 'Research Awards', desc: 'Identify scholarships matching your target university, degree level, and subject.' },
                { step: '02', title: 'Check Deadlines', desc: 'Verify eligibility requirements and strict application cut-off dates.' },
                { step: '03', title: 'Secure Offer', desc: 'Apply to the university first to obtain your provisional Offer of Place.' },
                { step: '04', title: 'Prepare Dossier', desc: 'Assemble transcripts, academic references, personal statements, and English evidence.' },
                { step: '05', title: 'Submit Portal', desc: 'Lodge applications directly through official university or MFAT channels.' },
                { step: '06', title: 'Accept Award', desc: 'Accept the scholarship award and integrate fee credits into visa financial filings.' },
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

      {/* 8. ELIGIBILITY CRITERIA & VISA REQUIREMENTS */}
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
              These general checkpoints outline academic and visa preparations. Exact prerequisites depend on the institution, qualification level, and Immigration New Zealand regulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-[#FAF7F1] border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#155EEF]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Academic Entry Requirements</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Recognized undergraduate degree with minimum 60% aggregate for Master’s programs (Level 9). Minimum 65%+ in Class 12 for Bachelor’s programs.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF7F1] border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">English Language Proof</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                IELTS Academic 6.5 (min 6.0 in bands), PTE 58+, TOEFL 80–90+, or qualifying English pathway / NZCEL Level 5 certification.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF7F1] border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
                <Coins className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Financial Maintenance (NZ$20k)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Demonstration of paid tuition fees plus minimum NZ$20,000 per year living funds held in savings or sanctioned education loans.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF7F1] border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#D99A35]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Fee Paying Student Visa</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Panel physician chest X-ray and medical clearance, police clearance certificates, and comprehensive medical insurance under the Pastoral Care Code.
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
              4-Stage New Zealand Admission Checklist
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Track your preparation from university selection through to visa lodgement with our interactive readiness guide.
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
            <span>Begin Your New Zealand Journey</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-white tracking-tight">
            Start Your Study in New Zealand Journey
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Get personalized guidance on selecting a destination, choosing universities, understanding admission requirements, and exploring suitable scholarship opportunities.
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
                  d.id === 'new-zealand'
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
                        <span className="text-[11px] text-slate-500">{prog.level} • {prog.duration} • 3-Yr PSWV Eligible</span>
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
      <NzEligibilityModal
        isOpen={isEligibilityModalOpen}
        onClose={() => setIsEligibilityModalOpen(false)}
        onProceedConsultation={(data) => {
          if (onOpenCounselling) {
            onOpenCounselling(data ? `New Zealand: ${data.scoreSummary}` : 'New Zealand');
          }
        }}
      />
    </div>
  );
};
