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
  Globe2,
  GraduationCap,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Building2,
  Info,
  Clock,
  ChevronDown,
  ChevronUp,
  CheckSquare,
  Square,
  Plane,
  Heart,
  Layers,
  Cpu,
  Briefcase,
  Code2,
  Stethoscope,
  Scale,
  Palette,
  X,
  RotateCw,
  Landmark,
  Coins
} from 'lucide-react';
import { UkEligibilityModal } from '../components/UkEligibilityModal';
import { UniversityLogo } from '../components/UniversityLogo';
import { DestinationNavBar } from '../components/DestinationNavBar';

interface StudyInUkPageProps {
  onOpenCounselling?: (destination?: string) => void;
}

interface UniversityItem {
  id: string;
  name: string;
  location: string;
  rankBadge: string;
  rankingSource: string;
  logoType: 'oxford' | 'cambridge' | 'imperial' | 'lse' | 'ucl';
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
  { id: 'all', label: 'All', icon: Layers },
  { id: 'engineering', label: 'Engineering & STEM', icon: Cpu },
  { id: 'business', label: 'Business & Finance', icon: Briefcase },
  { id: 'cs', label: 'Computer Science & AI', icon: Code2 },
  { id: 'medicine', label: 'Medicine & Health', icon: Stethoscope },
  { id: 'law', label: 'Law & Policy', icon: Scale },
  { id: 'arts', label: 'Humanities & Arts', icon: Palette },
] as const;

const UNIVERSITIES_DATA: UniversityItem[] = [
  {
    id: 'oxford',
    name: 'University of Oxford',
    location: 'Oxford, Oxfordshire',
    rankBadge: '#1 World',
    rankingSource: 'Times Higher Education 2025 • QS #3',
    logoType: 'oxford',
    categories: ['all', 'business', 'medicine', 'law', 'arts', 'cs'],
    shortDesc: 'The oldest university in the English-speaking world, revered globally for personalized collegiate tutorials, groundbreaking research, and world leaders.',
    image: '/images/uk/oxford.jpg',
    tags: ['Economics & Management', 'Computer Science', 'Law (BCL)', 'Medical Sciences'],
    programs: [
      { name: 'MSc in Advanced Computer Science', level: "Master's", duration: '1 Year', pswEligible: true, tuition: '£36,000 / yr' },
      { name: 'Master of Business Administration (MBA)', level: "Master's", duration: '1 Year', pswEligible: true, tuition: '£71,440 / yr' },
      { name: 'Bachelor of Arts in PPE (Politics, Philosophy & Economics)', level: "Bachelor's", duration: '3 Years', pswEligible: true, tuition: '£35,080 / yr' },
      { name: 'MSc in Financial Economics (MFE)', level: "Master's", duration: '9 Months', pswEligible: true, tuition: '£52,560 / yr' },
    ],
  },
  {
    id: 'cambridge',
    name: 'University of Cambridge',
    location: 'Cambridge, Cambridgeshire',
    rankBadge: '#5 Global',
    rankingSource: 'QS World University Rankings 2025',
    logoType: 'cambridge',
    categories: ['all', 'engineering', 'cs', 'business', 'medicine', 'law'],
    shortDesc: 'A world-leading research powerhouse in Silicon Fen, combining 800 years of intellectual rigor with global leadership in artificial intelligence and biotechnology.',
    image: '/images/uk/cambridge.jpg',
    tags: ['Machine Learning', 'Engineering Tripos', 'Bio-Science', 'FinTech'],
    programs: [
      { name: 'MPhil in Machine Learning and Machine Intelligence', level: "Master's", duration: '1 Year', pswEligible: true, tuition: '£39,852 / yr' },
      { name: 'Master of Finance (MFin)', level: "Master's", duration: '1 Year', pswEligible: true, tuition: '£53,000 / yr' },
      { name: 'BA / MEng in Computer Science', level: "Undergraduate", duration: '3 – 4 Years', pswEligible: true, tuition: '£37,293 / yr' },
      { name: 'MPhil in Advanced Chemical Engineering', level: "Master's", duration: '1 Year', pswEligible: true, tuition: '£36,250 / yr' },
    ],
  },
  {
    id: 'imperial',
    name: 'Imperial College London',
    location: 'South Kensington, London',
    rankBadge: '#2 Global',
    rankingSource: 'QS World University Rankings 2025',
    logoType: 'imperial',
    categories: ['all', 'engineering', 'cs', 'business', 'medicine'],
    shortDesc: 'Europe’s preeminent science, technology, engineering, medicine, and business institution, located in the museum district of central London.',
    image: '/images/uk/imperial.jpg',
    tags: ['Artificial Intelligence', 'Financial Technology', 'Robotics', 'Aerospace'],
    programs: [
      { name: 'MSc in Computing (Artificial Intelligence & ML)', level: "Master's", duration: '1 Year', pswEligible: true, tuition: '£41,750 / yr' },
      { name: 'MSc in Financial Technology (FinTech)', level: "Master's", duration: '1 Year', pswEligible: true, tuition: '£42,200 / yr' },
      { name: 'MSc in Advanced Mechanical Engineering', level: "Master's", duration: '1 Year', pswEligible: true, tuition: '£38,600 / yr' },
      { name: 'BSc in Biological Sciences', level: "Bachelor's", duration: '3 Years', pswEligible: true, tuition: '£36,700 / yr' },
    ],
  },
  {
    id: 'lse',
    name: 'London School of Economics (LSE)',
    location: 'Holborn, Central London',
    rankBadge: '#6 Global',
    rankingSource: 'QS World Subject Rankings (Social Sciences)',
    logoType: 'lse',
    categories: ['all', 'business', 'law', 'arts', 'cs'],
    shortDesc: 'A world-class social science institution situated beside the City of London financial district, driving global economic thought, policy, and market analysis.',
    image: '/images/uk/lse.jpg',
    tags: ['Finance & Private Equity', 'Data Science', 'Economics', 'International Law'],
    programs: [
      { name: 'MSc in Finance & Private Equity', level: "Master's", duration: '10 Months', pswEligible: true, tuition: '£44,928 / yr' },
      { name: 'MSc in Data Science', level: "Master's", duration: '1 Year', pswEligible: true, tuition: '£35,472 / yr' },
      { name: 'Master of Public Administration (MPA)', level: "Master's", duration: '2 Years', pswEligible: true, tuition: '£30,480 / yr' },
      { name: 'BSc in Economics', level: "Bachelor's", duration: '3 Years', pswEligible: true, tuition: '£28,176 / yr' },
    ],
  },
  {
    id: 'ucl',
    name: 'University College London (UCL)',
    location: 'Bloomsbury, Central London',
    rankBadge: '#9 Global',
    rankingSource: 'QS World University Rankings 2025',
    logoType: 'ucl',
    categories: ['all', 'engineering', 'cs', 'medicine', 'law', 'arts', 'business'],
    shortDesc: 'London’s multidisciplinary research powerhouse, internationally renowned for progressive research in neurosciences, the built environment, and enterprise.',
    image: '/images/uk/ucl.jpg',
    tags: ['Data Science', 'Bartlett Architecture', 'Neuroscience', 'Commercial Law'],
    programs: [
      { name: 'MSc in Data Science & Machine Learning', level: "Master's", duration: '1 Year', pswEligible: true, tuition: '£38,300 / yr' },
      { name: 'MSc in Financial Risk Management', level: "Master's", duration: '1 Year', pswEligible: true, tuition: '£37,500 / yr' },
      { name: 'MSc in Management', level: "Master's", duration: '1 Year', pswEligible: true, tuition: '£39,400 / yr' },
      { name: 'BSc in Computer Science', level: "Bachelor's", duration: '3 Years', pswEligible: true, tuition: '£37,500 / yr' },
    ],
  },
];

export const StudyInUkPage: React.FC<StudyInUkPageProps> = ({ onOpenCounselling }) => {
  // Modal States
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const [selectedUniForPrograms, setSelectedUniForPrograms] = useState<UniversityItem | null>(null);

  // 1. Showcase States: Category Filter & 3D University Orbit
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeUniIndex, setActiveUniIndex] = useState<number>(2); // Default to Imperial College London as featured center
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Scroll & Animation control refs
  const trackRef = useRef<HTMLDivElement>(null);
  const isManualNavRef = useRef<boolean>(false);
  const manualNavTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollIndexRef = useRef<number>(activeUniIndex);
  const touchStartX = useRef<number | null>(null);

  // Filtered universities based on category selection
  const filteredUniversities = UNIVERSITIES_DATA.filter((uni) =>
    selectedCategory === 'all' ? true : uni.categories.includes(selectedCategory)
  );

  // Responsive viewport width listener
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Keep active index in bounds when category changes
  useEffect(() => {
    if (activeUniIndex >= filteredUniversities.length) {
      setActiveUniIndex(Math.max(0, filteredUniversities.length - 1));
    }
  }, [filteredUniversities.length, activeUniIndex]);

  // Coordinated manual navigation
  const triggerManualNav = (indexSetter: (prev: number) => number) => {
    isManualNavRef.current = true;
    if (manualNavTimeoutRef.current) clearTimeout(manualNavTimeoutRef.current);
    manualNavTimeoutRef.current = setTimeout(() => {
      isManualNavRef.current = false;
    }, 3000);
    setActiveUniIndex(indexSetter);
  };

  const handlePrevUniversity = () => {
    if (filteredUniversities.length === 0) return;
    triggerManualNav((prev) => (prev > 0 ? prev - 1 : filteredUniversities.length - 1));
  };

  const handleNextUniversity = () => {
    if (filteredUniversities.length === 0) return;
    triggerManualNav((prev) => (prev < filteredUniversities.length - 1 ? prev + 1 : 0));
  };

  const handleSelectUniversity = (targetIdx: number) => {
    triggerManualNav(() => targetIdx);
  };

  const toggleFavorite = (uniId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({
      ...prev,
      [uniId]: !prev[uniId],
    }));
  };

  // Keyboard navigation for 3D carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevUniversity();
      if (e.key === 'ArrowRight') handleNextUniversity();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Touch swipe support for mobile/tablet screens
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const currentX = e.touches[0].clientX;
    const diffX = touchStartX.current - currentX;
    if (Math.abs(diffX) > 45) {
      if (diffX > 0) {
        handleNextUniversity();
      } else {
        handlePrevUniversity();
      }
      touchStartX.current = null;
    }
  };

  const handleTouchEnd = () => {
    touchStartX.current = null;
  };

  // Automatic gentle orbit rotation (5-second cadence)
  useEffect(() => {
    if (prefersReducedMotion || isHovered || filteredUniversities.length <= 1) return;

    const interval = setInterval(() => {
      if (!isManualNavRef.current && !document.hidden) {
        setActiveUniIndex((prev) => (prev < filteredUniversities.length - 1 ? prev + 1 : 0));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [filteredUniversities.length, prefersReducedMotion, isHovered]);

  // Natural scroll-driven rotation
  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      if (!trackRef.current || filteredUniversities.length <= 1) return;
      const rect = trackRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight * 0.75 && rect.bottom > windowHeight * 0.25) {
        const totalDistance = windowHeight * 0.7;
        const currentDistance = windowHeight * 0.75 - rect.top;
        const progress = Math.max(0, Math.min(1, currentDistance / totalDistance));
        const targetIndex = Math.min(
          filteredUniversities.length - 1,
          Math.floor(progress * filteredUniversities.length)
        );

        if (!isManualNavRef.current && targetIndex !== lastScrollIndexRef.current) {
          lastScrollIndexRef.current = targetIndex;
          setActiveUniIndex(targetIndex);
        }
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [filteredUniversities.length]);

  // 2. Animated Education Statistics Counter Hook
  const [hasStatsAnimated, setHasStatsAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statCounts, setStatCounts] = useState({
    universities: 0,
    students: 0,
    ugYears: 0,
    pgYears: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStatsAnimated) {
          setHasStatsAnimated(true);
          const duration = 1800;
          const startTime = performance.now();

          const animateCounts = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);

            setStatCounts({
              universities: Math.floor(ease * 160),
              students: Math.floor(ease * 680),
              ugYears: Math.floor(ease * 3),
              pgYears: Math.floor(ease * 1),
            });

            if (progress < 1) {
              requestAnimationFrame(animateCounts);
            } else {
              setStatCounts({
                universities: 160,
                students: 680,
                ugYears: 3,
                pgYears: 1,
              });
            }
          };

          requestAnimationFrame(animateCounts);
        }
      },
      { threshold: 0.25 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasStatsAnimated]);

  // 3. Interactive Benefits State (Section 4)
  const [activeBenefit, setActiveBenefit] = useState<number>(0);
  const benefits = [
    {
      id: 'world-class',
      index: '01',
      title: 'World-Class Universities',
      shortDesc: 'Centuries of academic heritage, Russell Group research powerhouses, and global standing.',
      longDesc:
        'The United Kingdom is home to 4 of the world’s top 10 universities and 24 research-intensive Russell Group institutions. With globally renowned faculty and rigorous external quality audits (QAA & REF), a British degree signals supreme analytical excellence and leadership to employers worldwide.',
      accent: '#155EEF',
      badge: 'Academic Eminence',
      stats: '4 of World Top 10 in UK',
      image: '/images/uk/oxford.jpg',
    },
    {
      id: 'multicultural',
      index: '02',
      title: 'Multicultural Environment',
      shortDesc: 'Vibrant international campuses welcoming scholars from more than 180 nations.',
      longDesc:
        'With over 680,000 international students, UK campuses are among the most culturally rich and cosmopolitan in higher education. You will debate ideas with peers from every continent, forge worldwide professional networks, and thrive in an open, inclusive, English-speaking society.',
      accent: '#16A34A',
      badge: 'Global Community',
      stats: '680,000+ International Scholars',
      image: '/images/uk/uk-culture.jpg',
    },
    {
      id: 'work-rights',
      index: '03',
      title: 'Part-Time Work Opportunities',
      shortDesc: 'Work during term-time and vacations in accordance with UK Student visa conditions.',
      longDesc:
        'Under UK Student visa regulations, students enrolled in full-time degree-level courses at higher education institutions with a track record of compliance are permitted to work up to 20 hours per week during term-time and full-time during official vacation periods, providing valuable practical exposure and pocket-money support.',
      accent: '#3B82F6',
      badge: '20 Hrs / Wk Permitted',
      stats: 'Full-Time Work During Breaks',
      image: '/images/uk/lse.jpg',
    },
    {
      id: 'culture',
      index: '04',
      title: 'Rich Cultural Experience',
      shortDesc: 'Historic architecture, world-renowned museums, iconic landmarks, and contemporary British life.',
      longDesc:
        'From London’s West End theatres and free national museums to historic university towns like Oxford, Cambridge, and Edinburgh, studying in the UK blends timeless heritage with modern innovation. Enjoy Premier League football, international music festivals, and seamless rail travel across Europe.',
      accent: '#8B5CF6',
      badge: 'Heritage & Life',
      stats: 'Free Entry to Major Museums',
      image: '/images/uk/london-hero.jpg',
    },
  ];

  // 4. UK Admission Intakes
  const [selectedIntake, setSelectedIntake] = useState<number>(0);
  const intakes = [
    {
      id: 'autumn',
      season: 'AUTUMN INTAKE',
      months: 'September / October',
      cycle: 'Primary Academic Intake',
      accent: '#155EEF',
      headline: 'The Flagship Academic Intake with Full Course & Scholarship Pools',
      desc: 'The September intake is the UK’s primary admission window, offering the full catalogue of undergraduate, postgraduate, and doctoral degrees.',
      highlights: [
        'Largest availability of university merit scholarships, Vice-Chancellor awards, and Chevening grants.',
        '100% of all undergraduate and postgraduate taught programmes open for entry.',
        'Primary recruitment cycle for UK graduate training schemes, Autumn career fairs, and corporate internships.',
        'Recommended application timeline: Apply between October and April for priority CAS processing.',
      ],
      idealFor: 'Students seeking maximum degree course selection, high-value scholarships, and the traditional British collegiate experience.',
      status: 'High Volume • Full Degree Catalogue',
    },
    {
      id: 'spring',
      season: 'SPRING INTAKE',
      months: 'January / February',
      cycle: 'Secondary Fast-Track Intake',
      accent: '#16A34A',
      headline: 'A Streamlined Winter Gateway with Rapid Turnaround',
      desc: 'The January intake offers popular Business, Computing, Engineering, and Law Master’s degrees with focused cohorts.',
      highlights: [
        'Ideal for applicants who completed summer bachelor’s degrees and needed additional time for documentation or tests.',
        'Smaller class sizes enabling intimate faculty access and dedicated career placement workshops.',
        'Speedy winter CAS issuance and reduced congestion at UKVI visa biometric centres.',
        'Recommended application timeline: Apply between July and October.',
      ],
      idealFor: 'Graduates aiming to avoid a full gap year while completing 1-year Master’s degrees on a fast track.',
      status: 'Selected Master’s Courses • Rapid Turnaround',
    },
    {
      id: 'summer',
      season: 'SUMMER INTAKE',
      months: 'May / June',
      cycle: 'Pre-Sessional & Pathway Intake',
      accent: '#3B82F6',
      headline: 'Pre-Sessional English & Foundation Academic Pathways',
      desc: 'Targeted entry sessions for international students requiring English language preparation or academic bridging modules.',
      highlights: [
        'Integrated 4-week, 8-week, or 12-week pre-sessional English courses directly on university campuses.',
        'Combines language refinement with academic writing, citation standards, and seminar presentation skills.',
        'Smooth progression directly into the September degree without needing to return home for visa re-filing.',
        'Recommended application timeline: Apply between February and April.',
      ],
      idealFor: 'Students with conditional academic offers seeking on-campus English certification.',
      status: 'Specialized Pathway • University Specific',
    },
  ];

  // 5. English Proficiency Tests
  const [activeTestTab, setActiveTestTab] = useState<'waiver' | 'ielts' | 'pte'>('waiver');

  // 6. Study Without IELTS Pathway Nodes
  const [selectedPathway, setSelectedPathway] = useState<number>(0);
  const pathways = [
    {
      id: 'class-12-waiver',
      index: '01',
      title: 'Class 12th English Waiver',
      summary: 'Scores of 70%+ in CBSE, ICSE, or State Board 12th English can waive IELTS at over 60 UK universities.',
      details:
        'The vast majority of leading UK universities recognize high school English performance from established boards. If you achieved 70% or higher in your 12th Standard English exam (some universities accept 65%+), your IELTS requirement is automatically waived, saving test fees and preparation time.',
      requirements: ['CBSE, ICSE, or recognized State Board certificate', 'Minimum 70% in 12th Standard English', 'Direct unconditional CAS offer'],
      badge: '★ Most Popular Route',
    },
    {
      id: 'moi-waiver',
      index: '02',
      title: 'Medium of Instruction (MOI)',
      summary: 'Official institutional verification of an English-taught degree for qualifying universities.',
      details:
        'Candidates who have completed a 3-year or 4-year Bachelor’s degree where the medium of instruction and examination was English can present a university-stamped MOI letter to select partner institutions to satisfy English language competence.',
      requirements: ['Official institutional MOI letter', 'Accredited university undergraduate transcript', 'Departmental admissions sign-off'],
      badge: 'MOI Letter Pathway',
    },
    {
      id: 'pre-sessional',
      index: '03',
      title: 'Pre-Sessional English (PSE)',
      summary: '4 to 12-week campus-based English language modules that bridge slight score gaps.',
      details:
        'If your test score is slightly below unconditional thresholds (e.g. 6.0 instead of 6.5), you can enroll in a pre-sessional course on campus. Successfully completing the course grants automatic unconditional progression onto your Master’s without retaking IELTS.',
      requirements: ['UKVI SELT IELTS for visa eligibility', 'Combined CAS issued for course + degree', 'Direct campus integration before term'],
      badge: 'Campus Progression',
    },
    {
      id: 'internal-assessment',
      index: '04',
      title: 'University Internal Test',
      summary: 'Free online English diagnostic test conducted directly by university language centers.',
      details:
        'Several modern UK universities administer their own free internal English proficiency tests online or conduct a brief video faculty interview to verify speaking and listening readiness directly.',
      requirements: ['University online language test', 'No external test fee required', 'Accepted directly for CAS issuance'],
      badge: 'Diagnostic Test',
    },
  ];

  // 7. Admission Preparation Checklist
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({
    0: true,
    1: false,
    2: false,
    3: false,
  });
  const [expandedPrepStage, setExpandedPrepStage] = useState<number>(0);

  const toggleStepCompleted = (index: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const prepStages = [
    {
      number: '01',
      title: 'Course & University Shortlisting',
      summary: 'Evaluate Russell Group and partner UK institutions based on module electives, location, and fees.',
      details: [
        'Shortlist 5–8 UK universities across Dream, Target, and Safe tiers.',
        'Review 1-year Master’s curriculum modules, dissertation credits, and industry placement options.',
        'Check tuition fees (£15,000 – £35,000) and eligibility for £2,000 – £5,000 automatic merit scholarships.',
        'Confirm whether target universities offer Class 12th English waivers.',
      ],
    },
    {
      number: '02',
      title: 'Prepare Statement of Purpose & Dossier',
      summary: 'Craft a specialized UK-format Statement of Purpose focusing on academic rationale and career ambitions.',
      details: [
        'Write an academically focused SOP (UK admissions prioritize subject mastery and academic justification over personal narrative).',
        'Secure 2 academic or professional letters of recommendation on institutional letterheads.',
        'Compile official degree certificates, semester mark sheets, and Class 10/12 mark sheets.',
        'Submit applications via UCAS (undergraduate) or direct university portals (postgraduate).',
      ],
    },
    {
      number: '03',
      title: 'Offer Acceptance & CAS Issuance',
      summary: 'Meet conditional terms, pay tuition deposit, and receive your Confirmation of Acceptance for Studies (CAS).',
      details: [
        'Receive Conditional Offer Letters and clear conditions (final grades, degree certificate, or waiver letters).',
        'Pay the mandatory university tuition deposit (typically £2,000 – £5,000) to secure your seat.',
        'Complete pre-CAS video credibility interviews if required by the university compliance office.',
        'Receive official 14-digit electronic Confirmation of Acceptance for Studies (CAS) reference number.',
      ],
    },
    {
      number: '04',
      title: 'UKVI Student Visa & Financial Maintenance',
      summary: 'Prepare 28-day financial proof, pay Immigration Health Surcharge (IHS), and file for your visa.',
      details: [
        'Demonstrate 28 consecutive days of living maintenance funds (£1,334/mo in London, £1,023/mo outside London for 9 months).',
        'Pay the UK Student Visa fee (£490) and Immigration Health Surcharge (IHS) for NHS healthcare access.',
        'Book and attend your biometric appointment at VFS Global.',
        'Receive your Student Route Visa and plan your pre-departure travel to the UK.',
      ],
    },
  ];

  const totalStepsCompleted = Object.values(completedSteps).filter(Boolean).length;

  const handleOpenConsultation = () => {
    if (onOpenCounselling) {
      onOpenCounselling('United Kingdom');
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

    // diff === 0: Center Featured Card (sharp, prominent, elevated, full focus)
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

    // Mobile viewport (< 768px): Focus solely on 1 clean center card
    if (isMobile) {
      return {
        transform: `translate(-50%, -50%) translateX(${diff * 280}px) scale(0.85)`,
        opacity: 0,
        zIndex: 1,
        pointerEvents: 'none' as const,
      };
    }

    // Tablet viewport (768px - 1023px): Center card + gentle flanking cards
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

    // Laptop viewport (1024px - 1399px)
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

    // Wide Desktop (>= 1440px): Full 5-card depth
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
      transform: `translate(-50%, -50%) translate3d(${diff < 0 ? -620 : 620}px, 0px, -180px) scale(0.5)`,
      opacity: 0,
      zIndex: 1,
      pointerEvents: 'none' as const,
    };
  };

  const scrollToUniversities = () => {
    if (trackRef.current) {
      trackRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white text-[#475569] min-h-screen selection:bg-[#155EEF] selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Destination Country Navigation Bar */}
      <DestinationNavBar activeCountry="uk" />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO SECTION — AN ANIMATED JOURNEY TO THE UK
          Large editorial heading, blue gradient, word-by-word reveal,
          animated flight path to the UK, authentic British landmarks,
          ambient royal-blue lighting & floating decorative elements
         ───────────────────────────────────────────────────────────── */}
      <section 
        className="relative bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFF] to-[#FFFFFF] text-[#14213D] pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-18 border-b border-[#E2E8F0] overflow-hidden"
      >
        {/* Ambient Decorative Lighting & Architectural Silhouette */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Pale Blue Glow Radii */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-gradient-to-r from-[#155EEF]/10 via-[#3B82F6]/8 to-[#155EEF]/10 rounded-full blur-[110px]" />
          <div className="absolute top-10 left-10 w-[350px] h-[350px] bg-[#155EEF]/5 rounded-full blur-[100px]" />
          <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-[#3B82F6]/6 rounded-full blur-[120px]" />

          {/* Dotted Flight Path with Animated Plane Traveling to UK */}
          <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="flightGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#155EEF" stopOpacity="0.2" />
                <stop offset="60%" stopColor="#155EEF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <path
              d="M -50 420 C 300 360, 600 180, 950 140 S 1400 240, 1920 80"
              fill="none"
              stroke="url(#flightGrad)"
              strokeWidth="2"
              strokeDasharray="6 8"
              className="animate-flight-dash"
            />
          </svg>

          {/* Plane Flying along Flight Route */}
          <div className="absolute top-28 left-[22%] opacity-85 animate-float-slow">
            <div className="relative p-2.5 rounded-full bg-white/90 shadow-md border border-[#B9D5FF] backdrop-blur-md">
              <Plane className="w-5 h-5 text-[#155EEF] transform -rotate-45" />
            </div>
          </div>

          {/* Faint London Big Ben & Westminster Architectural Silhouette Outline */}
          <div className="absolute right-4 bottom-0 opacity-[0.045] pointer-events-none select-none hidden lg:block">
            <svg width="420" height="340" viewBox="0 0 420 340" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Big Ben Clock Tower Outline */}
              <rect x="180" y="80" width="60" height="260" stroke="#002147" strokeWidth="2.5" />
              <polygon points="175,80 210,20 245,80" stroke="#002147" strokeWidth="2.5" />
              <circle cx="210" cy="120" r="18" stroke="#002147" strokeWidth="2" />
              {/* Westminster Abbey Gothic Arches */}
              <rect x="250" y="160" width="140" height="180" stroke="#002147" strokeWidth="2" />
              <path d="M265 240 C265 200, 305 200, 305 240 V340 H265 Z" stroke="#002147" strokeWidth="1.5" />
              <path d="M325 240 C325 200, 365 200, 365 240 V340 H325 Z" stroke="#002147" strokeWidth="1.5" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Breadcrumb strip */}
          <nav aria-label="Breadcrumb" className="mb-3 sm:mb-4">
            <ol className="flex items-center gap-2 text-xs font-semibold text-[#64748B]">
              <li>
                <Link to="/" className="hover:text-[#155EEF] transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link to="/destinations" className="hover:text-[#155EEF] transition-colors">Destinations</Link>
              </li>
              <li>/</li>
              <li className="text-[#14213D] font-bold" aria-current="page">Study in UK</li>
            </ol>
          </nav>

          {/* Hero Header Layout */}
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            {/* Destination Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-wider shadow-sm mb-4 animate-fade-in">
              <span className="w-4 h-3 rounded-[2px] overflow-hidden inline-flex items-center justify-center border border-slate-200">
                <svg viewBox="0 0 60 30" className="w-full h-full">
                  <clipPath id="uk-flag-clip"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
                  <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
                  <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                  <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk-flag-clip)" stroke="#C8102E" strokeWidth="4"/>
                  <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
                  <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
                </svg>
              </span>
              <span>STUDY IN THE UK • DESTINATION GUIDE</span>
            </div>

            {/* Editorial Heading with Staggered Word Reveal */}
            <h1 className="font-editorial font-bold text-[#14213D] tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.12] max-w-3xl mx-auto break-words">
              Your Future Begins in the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#155EEF] via-[#2563EB] to-[#3B82F6]">
                United Kingdom.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-sm sm:text-base md:text-lg text-[#475569] mt-3 sm:mt-4 max-w-2xl mx-auto leading-relaxed font-normal">
              Experience centuries of academic prestige, accelerated 1-year Master’s degrees, world-class research facilities, vibrant British culture, and the 2-year Graduate Route post-study work visa.
            </p>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <button
                type="button"
                onClick={scrollToUniversities}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#155EEF] hover:bg-[#104ECC] text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Explore UK Universities</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => setIsEligibilityOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-[#F5F8FF] text-[#155EEF] border border-[#CBD5E1] font-bold text-sm shadow-sm hover:shadow-md hover:border-[#155EEF]/50 transition-all flex items-center justify-center gap-2"
              >
                <span>Check Your Eligibility</span>
                <span className="text-[#155EEF]">↗</span>
              </button>
            </div>
          </div>

          {/* Hero Feature Panoramic Image Panel */}
          <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-[0_16px_40px_rgba(21,94,239,0.1)] border border-[#E2E8F0] bg-slate-900 aspect-[16/8] sm:aspect-[21/9]">
            <img
              src="/images/uk/london-hero.jpg"
              alt="London Tower Bridge & River Thames at Sunset"
              className="w-full h-full object-cover animate-slow-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-4 left-6 right-6 sm:bottom-6 sm:left-8 sm:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase mb-1">
                  <Landmark className="w-3.5 h-3.5 text-blue-300" />
                  <span>London & Historic Campus Centres</span>
                </div>
                <h2 className="text-lg sm:text-2xl font-bold font-editorial text-white">
                  Europe’s Premier Academic & FinTech Capital
                </h2>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="px-3 py-1.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 text-xs font-semibold text-white">
                  2-Year PSW Graduate Route
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-[#155EEF] text-xs font-bold text-white shadow-md">
                  1-Year Master’s
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: ANIMATED UK EDUCATION STATISTICS
          Floating statistics panel directly beneath the hero
          Displays 4 metrics: Universities, International Students,
          UG degree duration (3 yrs), and PG degree duration (1 yr)
         ───────────────────────────────────────────────────────────── */}
      <section className="py-10 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={statsRef}
            className="bg-[#F5F8FF] rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-[0_12px_36px_rgba(21,94,239,0.06)]"
            aria-label="UK Higher Education Core Metrics"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#E2E8F0]">
              {/* Stat 1: 160+ Universities */}
              <div className="pt-2 sm:pt-0 sm:px-6 first:pl-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-2 rounded-xl bg-[#EAF2FF] text-[#155EEF]">
                    <Building2 className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                    World-Class Institutions
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-editorial text-[#14213D] tracking-tight">
                  {statCounts.universities}+
                </div>
                <p className="text-xs text-[#475569] mt-1 font-medium">
                  Universities (4 in QS World Top 10)
                </p>
              </div>

              {/* Stat 2: 680,000+ Students */}
              <div className="pt-4 sm:pt-0 sm:px-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-2 rounded-xl bg-purple-50 text-[#8B5CF6]">
                    <GraduationCap className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                    Global Community
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-editorial text-[#8B5CF6] tracking-tight">
                  {statCounts.students.toLocaleString()}k+
                </div>
                <p className="text-xs text-[#475569] mt-1 font-medium">
                  International students from 180+ nations
                </p>
              </div>

              {/* Stat 3: 3 Years Undergraduate */}
              <div className="pt-4 sm:pt-0 sm:px-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-2 rounded-xl bg-emerald-50 text-[#16A34A]">
                    <Clock className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                    Typical Undergraduate
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-editorial text-[#16A34A] tracking-tight">
                  {statCounts.ugYears} Years
                </div>
                <p className="text-xs text-[#475569] mt-1 font-medium">
                  Accelerated Bachelor’s (England & Wales)*
                </p>
              </div>

              {/* Stat 4: 1 Year Master's */}
              <div className="pt-4 sm:pt-0 sm:px-6 last:pr-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-2 rounded-xl bg-amber-50 text-[#F59E0B]">
                    <Award className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                    Postgraduate Taught
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-editorial text-[#F59E0B] tracking-tight">
                  {statCounts.pgYears} Year
                </div>
                <p className="text-xs text-[#475569] mt-1 font-medium">
                  Fast-Track Master’s saving 1 yr fees*
                </p>
              </div>
            </div>

            {/* Sourced Explanatory Footnote */}
            <div className="mt-6 pt-4 border-t border-[#E2E8F0] text-[11px] text-[#64748B] flex items-center justify-between flex-wrap gap-2">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#155EEF] shrink-0" />
                <span>*Course durations vary by course and institution (e.g. 4-year Scottish MA Honours or integrated MEng degrees). Sourced from HESA and QS 2025.</span>
              </span>
              <span className="font-semibold text-[#155EEF]">UKVI Student Visa Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: TOP UK UNIVERSITIES — ANIMATED 3D ORBIT SHOWCASE
          Main Visual Attraction: Oxford, Cambridge, Imperial, LSE, UCL
          Smooth auto-rotation (4-6s), pause on hover/focus, 3D perspective,
          authentic campus photography & crests, category filters, View Programs
         ───────────────────────────────────────────────────────────── */}
      <section 
        ref={trackRef}
        className="relative bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFF] to-[#FFFFFF] text-[#14213D] pt-8 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-18 border-b border-[#E2E8F0] overflow-hidden"
      >
        {/* Ambient Orbit Path Background Graphics */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[360px] bg-gradient-to-r from-[#155EEF]/8 via-[#3B82F6]/6 to-[#155EEF]/8 rounded-full blur-[100px]" />

          {/* Dotted Elliptical 3D Orbit Lines */}
          <svg 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1240px] h-[520px] pointer-events-none overflow-visible select-none opacity-35" 
            viewBox="0 0 1240 520"
          >
            <defs>
              <linearGradient id="ukOrbitGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#155EEF" stopOpacity="0.08" />
                <stop offset="50%" stopColor="#155EEF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#155EEF" stopOpacity="0.08" />
              </linearGradient>
            </defs>
            <ellipse cx="620" cy="260" rx="560" ry="175" fill="none" stroke="url(#ukOrbitGlow)" strokeWidth="1.8" strokeDasharray="6 8" />
            <ellipse cx="620" cy="260" rx="430" ry="130" fill="none" stroke="#3B82F6" strokeOpacity="0.2" strokeWidth="1.2" strokeDasharray="4 6" />
            <circle cx="160" cy="260" r="4.5" fill="#155EEF" opacity="0.6" className="animate-pulse" />
            <circle cx="1080" cy="260" r="4.5" fill="#155EEF" opacity="0.6" className="animate-pulse" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-widest shadow-sm mb-2.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#155EEF]" />
              <span>THE RUSSELL GROUP & TOP INSTITUTIONS</span>
            </div>

            <h2 className="font-editorial font-bold text-[#14213D] tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-tight">
              Explore the Best Universities <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#155EEF] to-[#3B82F6]">
                in the United Kingdom
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-[#475569] mt-2 max-w-xl mx-auto leading-relaxed">
              Immerse yourself in centuries of intellectual excellence, cutting-edge laboratories, and world-ranked university departments.
            </p>

            {/* Orbit Indicator & Quick CTAs */}
            <div className="mt-3 flex items-center justify-center gap-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-[#E2E8F0] text-xs font-semibold text-[#64748B] shadow-sm">
                <RotateCw className={`w-3.5 h-3.5 text-[#155EEF] ${!isHovered && !prefersReducedMotion ? 'animate-spin-slow' : ''}`} />
                <span>3D Orbit Mode • Auto Rotating</span>
              </div>

              <button
                type="button"
                onClick={() => setIsEligibilityOpen(true)}
                className="px-4 py-1.5 rounded-full bg-white hover:bg-[#F5F8FF] text-[#155EEF] border border-[#CBD5E1] font-bold text-xs shadow-sm hover:border-[#155EEF] transition-all"
              >
                Check Eligibility
              </button>
            </div>
          </div>

          {/* 3D Orbit Stage */}
          <div 
            className="relative w-full max-w-5xl mx-auto my-auto h-[440px] sm:h-[470px] flex items-center justify-center overflow-visible select-none"
            style={{
              perspective: '1400px',
              transformStyle: 'preserve-3d',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Carousel Arrows */}
            <button
              type="button"
              onClick={handlePrevUniversity}
              className="hidden lg:flex absolute -left-6 xl:-left-10 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-[#155EEF] border border-[#E2E8F0] shadow-lg items-center justify-center transition-all hover:scale-110 z-40 focus:outline-none focus:ring-2 focus:ring-[#155EEF]"
              aria-label="Previous University"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNextUniversity}
              className="hidden lg:flex absolute -right-6 xl:-right-10 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-[#155EEF] border border-[#E2E8F0] shadow-lg items-center justify-center transition-all hover:scale-110 z-40 focus:outline-none focus:ring-2 focus:ring-[#155EEF]"
              aria-label="Next University"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Orbit Cards */}
            {filteredUniversities.length === 0 ? (
              <div className="text-center py-12 px-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm max-w-md mx-auto">
                <p className="text-sm font-semibold text-[#64748B]">No universities found for this category.</p>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className="mt-4 px-4 py-2 rounded-xl bg-[#155EEF] text-white text-xs font-bold"
                >
                  View All Universities
                </button>
              </div>
            ) : (
              filteredUniversities.map((uni, idx) => {
                const n = filteredUniversities.length;
                let diff = (idx - activeUniIndex) % n;
                if (diff > n / 2) diff -= n;
                if (diff < -n / 2) diff += n;

                const isCenter = diff === 0;
                const isFav = !!favorites[uni.id];
                const cardStyle = getCard3DStyle(diff);

                return (
                  <div
                    key={uni.id}
                    onClick={() => !isCenter && handleSelectUniversity(idx)}
                    style={{
                      ...cardStyle,
                      transition: prefersReducedMotion
                        ? 'none'
                        : 'transform 750ms cubic-bezier(0.22, 1, 0.36, 1), opacity 750ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 750ms ease, border-color 750ms ease',
                    }}
                    className={`absolute top-1/2 left-1/2 w-[290px] sm:w-[325px] lg:w-[340px] rounded-3xl border flex flex-col justify-between overflow-hidden bg-white ${
                      isCenter
                        ? 'border-[#155EEF] ring-2 ring-[#155EEF]/20 cursor-default'
                        : 'border-[#E2E8F0] cursor-pointer hover:border-[#155EEF]/50'
                    }`}
                  >
                    {/* Campus Photograph */}
                    <div className="relative h-42 sm:h-46 lg:h-48 w-full overflow-hidden bg-slate-100 rounded-t-3xl">
                      <img
                        src={uni.image}
                        alt={uni.name}
                        loading="eager"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                      />
                      <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-black/25 to-transparent pointer-events-none" />

                      {/* Ranking Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E2E8F0] text-xs font-mono font-bold text-[#155EEF] shadow-sm flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-[#155EEF]" />
                          <span>{uni.rankBadge}</span>
                        </span>
                      </div>

                      {/* Favorite Heart Button */}
                      <button
                        type="button"
                        onClick={(e) => toggleFavorite(uni.id, e)}
                        className="absolute top-3 right-3 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 backdrop-blur-md border border-[#E2E8F0] flex items-center justify-center shadow-sm hover:scale-110 transition-transform focus:outline-none"
                        aria-label="Save to favorites"
                      >
                        <Heart className={`w-3.5 h-3.5 transition-colors ${isFav ? 'fill-rose-500 text-rose-500' : 'text-[#64748B] hover:text-rose-500'}`} />
                      </button>

                      {/* Authentic University Emblem Logo Badge */}
                      <div className="absolute -bottom-2.5 left-4 sm:left-5 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white shadow-md border border-[#E2E8F0] p-1 flex items-center justify-center z-10 transition-transform hover:scale-105">
                        <UniversityLogo type={uni.logoType} className="w-full h-full" />
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="pt-4 p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white rounded-b-3xl">
                      <div>
                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-[#155EEF] mb-1">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span>{uni.location}</span>
                        </div>

                        {/* University Name */}
                        <h3 className="text-base sm:text-lg font-bold font-editorial text-[#14213D] leading-tight line-clamp-1">
                          {uni.name}
                        </h3>

                        {/* Verified Ranking Source */}
                        <div className="text-[10px] text-[#64748B] font-medium mt-0.5">
                          {uni.rankingSource}
                        </div>

                        {/* Short Description */}
                        <p className="text-[11px] sm:text-xs text-[#475569] mt-1.5 line-clamp-2 leading-relaxed">
                          {uni.shortDesc}
                        </p>

                        {/* Subject Tags */}
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {uni.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-md bg-[#F5F8FF] border border-[#E2E8F0] text-[10px] sm:text-[11px] font-medium text-[#155EEF]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Action Button */}
                      <div className="mt-3.5 pt-2.5 border-t border-[#E2E8F0]">
                        {isCenter ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedUniForPrograms(uni);
                            }}
                            className="w-full py-2 sm:py-2.5 px-4 rounded-xl font-bold text-xs bg-[#155EEF] hover:bg-[#104ECC] text-white shadow-md shadow-blue-500/25 flex items-center justify-center gap-1.5 transition-all hover:scale-[1.01]"
                          >
                            <span>View Programs</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSelectUniversity(idx)}
                            className="w-full py-2 px-3 rounded-xl font-semibold text-xs bg-[#F5F8FF] hover:bg-[#EAF2FF] text-[#155EEF] border border-[#E2E8F0] flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <span>Explore University</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Controls: Pagination Dots */}
          <div className="flex items-center justify-center gap-4 mt-4 sm:mt-5">
            <button
              type="button"
              onClick={handlePrevUniversity}
              className="w-9 h-9 rounded-full bg-white text-[#155EEF] border border-[#E2E8F0] shadow-sm flex items-center justify-center hover:scale-105 transition-transform"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 px-2">
              {filteredUniversities.map((_, dotIdx) => (
                <span
                  key={dotIdx}
                  onClick={() => handleSelectUniversity(dotIdx)}
                  className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                    activeUniIndex === dotIdx ? 'w-6 bg-[#155EEF]' : 'w-2 bg-[#CBD5E1] hover:bg-[#94A3B8]'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={handleNextUniversity}
              className="w-9 h-9 rounded-full bg-white text-[#155EEF] border border-[#E2E8F0] shadow-sm flex items-center justify-center hover:scale-105 transition-transform"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Category Filters */}
          <div className="mt-4 sm:mt-5 overflow-x-auto no-scrollbar py-1">
            <div className="flex items-center justify-center min-w-max gap-2 mx-auto">
              {CATEGORIES.map((cat) => {
                const IconComponent = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setActiveUniIndex(0);
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all duration-200 border ${
                      isActive
                        ? 'bg-[#155EEF] border-[#155EEF] text-white shadow-md shadow-blue-500/25 scale-[1.03]'
                        : 'bg-white hover:bg-[#F5F8FF] border-[#E2E8F0] text-[#475569] hover:text-[#14213D] shadow-sm'
                    }`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#155EEF]'}`} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: WHY STUDY IN THE UK? — INTERACTIVE BENEFITS
          Pale-blue section (#F5F8FF) with 4 interactive benefit cards:
          1. World-Class Universities
          2. Multicultural Environment
          3. Part-Time Work Opportunities
          4. Rich Cultural Experience
          Interactive split-screen with dynamic visual preview
         ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-[#F5F8FF] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <Globe2 className="w-3.5 h-3.5" />
              <span>Global Educational Leadership</span>
            </div>
            <h2 className="section-clamp-title font-editorial font-bold text-[#14213D] tracking-tight">
              Why Choose the United Kingdom?
            </h2>
            <p className="text-base sm:text-lg text-[#475569] mt-3 leading-relaxed">
              From accelerated degrees that save you an entire year to unrestricted post-study work routes and globally respected credentials.
            </p>
          </div>

          {/* Split-Screen Interactive Storytelling Component */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Interactive Cards */}
            <div className="lg:col-span-6 space-y-3.5">
              {benefits.map((benefit, index) => {
                const isSelected = activeBenefit === index;
                return (
                  <div
                    key={benefit.id}
                    onClick={() => setActiveBenefit(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setActiveBenefit(index);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-pressed={isSelected}
                    className={`p-6 rounded-3xl transition-all duration-300 cursor-pointer text-left border relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#155EEF] ${
                      isSelected
                        ? 'bg-white shadow-[0_12px_36px_rgba(15,23,42,0.08)] border-[#155EEF] ring-1 ring-[#155EEF]/20'
                        : 'bg-white/80 hover:bg-white border-[#E2E8F0] shadow-sm'
                    }`}
                  >
                    {/* Active Indicator Bar */}
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#155EEF]" />
                    )}

                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-mono font-bold ${isSelected ? 'text-[#155EEF]' : 'text-[#64748B]'}`}>
                          {benefit.index}
                        </span>
                        <h3 className={`text-lg sm:text-xl font-bold font-editorial ${
                          isSelected ? 'text-[#14213D]' : 'text-[#475569]'
                        }`}>
                          {benefit.title}
                        </h3>
                      </div>
                      {isSelected && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#EAF2FF] text-[#155EEF] border border-[#B9D5FF] shrink-0">
                          {benefit.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-[#475569] mt-2 leading-relaxed">
                      {benefit.shortDesc}
                    </p>

                    {/* Expanded description when selected */}
                    {isSelected && (
                      <div className="mt-4 pt-4 border-t border-[#E2E8F0] text-xs text-[#475569] leading-relaxed animate-fade-in">
                        {benefit.longDesc}
                        <div className="mt-3 flex items-center gap-2 font-bold text-xs text-[#155EEF]">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Key Highlight: {benefit.stats}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Column: Dynamic Sticky Visual Panel */}
            <div className="lg:col-span-6 sticky top-24">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_12px_36px_rgba(15,23,42,0.08)] border border-[#E2E8F0] bg-white aspect-[4/3] sm:aspect-[16/11]">
                <img
                  key={benefits[activeBenefit].image}
                  src={benefits[activeBenefit].image}
                  alt={benefits[activeBenefit].title}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />

                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-[#14213D]">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-xs font-bold text-[#155EEF] mb-2 shadow-sm">
                    <span>{benefits[activeBenefit].badge}</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold font-editorial text-[#14213D]">
                    {benefits[activeBenefit].title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#475569] mt-1 line-clamp-2">
                    {benefits[activeBenefit].longDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: UK ADMISSION INTAKES — TIMELINE & CYCLES
          September/October (Autumn) & January/February (Spring) & Summer
         ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#E2E8F0]" aria-label="UK Admission Intakes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <Calendar className="w-3.5 h-3.5" />
              <span>Academic Cycles & Application Deadlines</span>
            </div>
            <h2 className="section-clamp-title font-editorial font-bold text-[#14213D] tracking-tight">
              Choose Your Optimal UK Intake.
            </h2>
            <p className="text-base sm:text-lg text-[#475569] mt-3 leading-relaxed">
              UK universities offer two major entry waves annually. Explore intake highlights, timelines, and scholarship eligibility.
            </p>
          </div>

          {/* Timeline Selector Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {intakes.map((intake, idx) => {
              const isSelected = selectedIntake === idx;
              return (
                <button
                  key={intake.id}
                  type="button"
                  onClick={() => setSelectedIntake(idx)}
                  className={`p-6 rounded-3xl text-left border transition-all duration-300 relative ${
                    isSelected
                      ? 'bg-white shadow-[0_12px_36px_rgba(15,23,42,0.08)] border-[#155EEF] ring-2 ring-[#155EEF]/20'
                      : 'bg-[#F5F8FF] hover:bg-white border-[#E2E8F0] shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span 
                      className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white"
                      style={{ backgroundColor: intake.accent }}
                    >
                      {intake.season}
                    </span>
                    <span className="text-xs font-bold text-[#64748B]">{intake.months}</span>
                  </div>
                  <h3 className="text-lg font-bold font-editorial text-[#14213D]">
                    {intake.cycle}
                  </h3>
                  <p className="text-xs text-[#475569] mt-1 line-clamp-2">
                    {intake.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Intake Comprehensive Breakdown Panel */}
          <div className="bg-[#F5F8FF] rounded-3xl p-6 sm:p-10 shadow-[0_12px_36px_rgba(15,23,42,0.06)] border border-[#E2E8F0] relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 right-0 h-2 transition-all duration-300"
              style={{ backgroundColor: intakes[selectedIntake].accent }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#64748B]">
                  <Clock className="w-4 h-4 text-[#155EEF]" />
                  <span>Cycle Analysis & Features</span>
                </div>
                <h4 className="text-2xl sm:text-3xl font-bold font-editorial text-[#14213D]">
                  {intakes[selectedIntake].headline}
                </h4>
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  {intakes[selectedIntake].desc}
                </p>

                <div className="pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#14213D] mb-3">
                    Key Advantages & Guidelines
                  </div>
                  <ul className="space-y-2.5">
                    {intakes[selectedIntake].highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#475569]">
                        <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#E2E8F0] space-y-5 shadow-sm">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                    Who Is This Intake Best For?
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-[#14213D] mt-1 leading-snug">
                    {intakes[selectedIntake].idealFor}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0]">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                    Intake Availability Status
                  </div>
                  <div className="text-xs font-bold text-[#16A34A] mt-1">
                    {intakes[selectedIntake].status}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleOpenConsultation}
                    className="w-full py-3 rounded-xl bg-[#155EEF] hover:bg-[#104ECC] text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Shortlist UK Universities for {intakes[selectedIntake].season.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="mt-8 pt-4 border-t border-[#E2E8F0] text-[11px] text-[#64748B] flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-[#155EEF] shrink-0" />
              <span>Note: CAS issuance cutoffs and UCAS deadlines vary. Apply early to allow ample time for visa biometric processing and visa approval.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: ENGLISH PROFICIENCY & IELTS WAIVERS
          Interactive benchmark guide featuring Class 12th English 70%+ waiver!
         ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-[#F5F8FF] border-b border-[#E2E8F0]" aria-label="English Proficiency Score Guide">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Language Benchmarks & Exemptions</span>
            </div>
            <h2 className="section-clamp-title font-editorial font-bold text-[#14213D] tracking-tight">
              English Benchmarks & Direct IELTS Waivers.
            </h2>
            <p className="text-base sm:text-lg text-[#475569] mt-3 leading-relaxed">
              Understand standard English testing scores or check if you qualify for a 100% direct IELTS exemption based on your high school marks.
            </p>
          </div>

          {/* Test Panels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 1. CLASS 12TH ENGLISH WAIVER (FEATURED) */}
            <div 
              role="button"
              tabIndex={0}
              onClick={() => setActiveTestTab('waiver')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveTestTab('waiver'); }}
              className={`rounded-3xl p-8 border cursor-pointer flex flex-col justify-between transition-all duration-300 ${
                activeTestTab === 'waiver'
                  ? 'border-[#155EEF] ring-2 ring-[#155EEF]/20 shadow-[0_12px_36px_rgba(15,23,42,0.08)] bg-white scale-[1.02]'
                  : 'bg-white border-[#E2E8F0] hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#16A34A] border border-emerald-200 font-bold text-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>CLASS 12TH WAIVER</span>
                  </span>
                  <span className="text-[11px] font-bold text-[#155EEF]">60+ UK Universities</span>
                </div>

                <div className="mt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Typical Benchmark</div>
                  <div className="text-4xl sm:text-5xl font-black font-editorial text-[#155EEF] mt-1">
                    70%+ Marks
                  </div>
                </div>

                <div className="mt-5 space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-[#475569]">
                    <span>Waiver Probability</span>
                    <span>95% Acceptance</span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#155EEF] h-full rounded-full transition-all duration-500" style={{ width: '95%' }} />
                  </div>
                </div>

                <p className="text-xs text-[#475569] mt-5 leading-relaxed">
                  CBSE, ICSE, and major State Boards are widely accepted. Scoring 70%+ in 12th Standard English allows you to bypass IELTS entirely for direct CAS issuance.
                </p>

                {activeTestTab === 'waiver' && (
                  <div className="mt-4 pt-4 border-t border-blue-100 text-[11px] text-[#155EEF] font-semibold animate-fade-in">
                    ✓ Accepted by Queen Mary, Brunel, Essex, Swansea, Coventry, Hertfordshire, and 50+ other accredited institutions.
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#E2E8F0] text-[11px] text-[#64748B] flex items-center justify-between">
                <span><strong>Requirement:</strong> 12th Grade Mark Sheet</span>
                <span className="text-xs font-bold text-[#155EEF]">{activeTestTab === 'waiver' ? 'Selected' : 'Select'}</span>
              </div>
            </div>

            {/* 2. IELTS ACADEMIC */}
            <div 
              role="button"
              tabIndex={0}
              onClick={() => setActiveTestTab('ielts')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveTestTab('ielts'); }}
              className={`rounded-3xl p-8 border cursor-pointer flex flex-col justify-between transition-all duration-300 ${
                activeTestTab === 'ielts'
                  ? 'border-[#16A34A] ring-2 ring-[#16A34A]/20 shadow-[0_12px_36px_rgba(15,23,42,0.08)] bg-white scale-[1.02]'
                  : 'bg-white border-[#E2E8F0] hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-[#155EEF] border border-blue-200 font-bold text-xs">
                    IELTS ACADEMIC
                  </span>
                  <span className="text-[11px] font-bold text-[#64748B]">9.0 Band Scale</span>
                </div>

                <div className="mt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Standard Master’s Benchmark</div>
                  <div className="text-4xl sm:text-5xl font-black font-editorial text-[#16A34A] mt-1">
                    6.5 Overall
                  </div>
                </div>

                <div className="mt-5 space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-[#475569]">
                    <span>Band Target</span>
                    <span>6.5 / 9.0 (Min 6.0 in bands)</span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#16A34A] h-full rounded-full transition-all duration-500" style={{ width: '72%' }} />
                  </div>
                </div>

                <p className="text-xs text-[#475569] mt-5 leading-relaxed">
                  The gold standard for UK higher education admissions. 100% of UK universities accept IELTS Academic for direct unconditional admission.
                </p>

                {activeTestTab === 'ielts' && (
                  <div className="mt-4 pt-4 border-t border-emerald-100 text-[11px] text-[#16A34A] font-semibold animate-fade-in">
                    ✓ Typical band requirement: Reading 6.0, Listening 6.0, Speaking 6.0, Writing 6.0.
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#E2E8F0] text-[11px] text-[#64748B] flex items-center justify-between">
                <span><strong>Format:</strong> Computer / Paper-based</span>
                <span className="text-xs font-bold text-[#16A34A]">{activeTestTab === 'ielts' ? 'Selected' : 'Select'}</span>
              </div>
            </div>

            {/* 3. PTE ACADEMIC */}
            <div 
              role="button"
              tabIndex={0}
              onClick={() => setActiveTestTab('pte')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveTestTab('pte'); }}
              className={`rounded-3xl p-8 border cursor-pointer flex flex-col justify-between transition-all duration-300 ${
                activeTestTab === 'pte'
                  ? 'border-purple-500 ring-2 ring-purple-500/20 shadow-[0_12px_36px_rgba(15,23,42,0.08)] bg-white scale-[1.02]'
                  : 'bg-white border-[#E2E8F0] hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-bold text-xs">
                    PTE ACADEMIC
                  </span>
                  <span className="text-[11px] font-bold text-[#64748B]">90 Score Scale</span>
                </div>

                <div className="mt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Typical Score Range</div>
                  <div className="text-4xl sm:text-5xl font-black font-editorial text-purple-600 mt-1">
                    58–65
                  </div>
                </div>

                <div className="mt-5 space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-[#475569]">
                    <span>Scale Target</span>
                    <span>58–65 / 90</span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full rounded-full transition-all duration-500" style={{ width: '70%' }} />
                  </div>
                </div>

                <p className="text-xs text-[#475569] mt-5 leading-relaxed">
                  Pearson PTE Academic is approved by UK Visas and Immigration (UKVI) for Student Route applications, popular for rapid 48-hour computer results.
                </p>

                {activeTestTab === 'pte' && (
                  <div className="mt-4 pt-4 border-t border-purple-100 text-[11px] text-purple-700 font-semibold animate-fade-in">
                    ✓ Recommended section scores: 54+ in all communicative skills (Speaking, Writing, Reading, Listening).
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#E2E8F0] text-[11px] text-[#64748B] flex items-center justify-between">
                <span><strong>Format:</strong> AI-evaluated Computer Test</span>
                <span className="text-xs font-bold text-purple-600">{activeTestTab === 'pte' ? 'Selected' : 'Select'}</span>
              </div>
            </div>
          </div>

          {/* Official Guidance Banner */}
          <div className="mt-12 bg-white border border-[#E2E8F0] rounded-2xl p-5 text-[#475569] text-xs flex items-start gap-3 shadow-sm">
            <Info className="w-5 h-5 text-[#155EEF] shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-[#14213D]">Advisory Guidance:</strong> Minimum score thresholds and waiver board acceptance vary by academic course and institution. MasterVisa advisors pre-screen your transcripts to confirm waiver eligibility before fee submission.
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 7: STUDY IN THE UK WITHOUT IELTS — INTERACTIVE PATHWAYS
         ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white text-[#14213D] relative overflow-hidden border-b border-[#E2E8F0]" aria-label="Alternative English Pathways">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <Compass className="w-3.5 h-3.5" />
              <span>Alternative Language Pathways</span>
            </div>
            <h2 className="section-clamp-title font-editorial font-bold text-[#14213D] tracking-tight">
              Study in the UK Without IELTS.
            </h2>
            <p className="text-base sm:text-lg text-[#475569] mt-3 leading-relaxed">
              Explore four recognized routes to satisfy UK university admissions and CAS issuance without sitting for an external IELTS test.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pathways.map((path, idx) => {
              const isSelected = selectedPathway === idx;
              return (
                <div
                  key={path.id}
                  onClick={() => setSelectedPathway(idx)}
                  className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#EAF2FF] border-[#155EEF] ring-2 ring-[#155EEF]/30 shadow-[0_12px_36px_rgba(21,94,239,0.12)] -translate-y-1'
                      : 'bg-[#F5F8FF] hover:bg-white border-[#E2E8F0] hover:border-[#CBD5E1] shadow-sm hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-[#155EEF]">
                        {path.index}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white border border-[#B9D5FF] text-[#155EEF]">
                        {path.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-editorial text-[#14213D]">
                      {path.title}
                    </h3>

                    <p className="text-xs text-[#475569] mt-2 leading-relaxed">
                      {path.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E2E8F0]">
                    <span className="text-xs font-bold text-[#155EEF] flex items-center gap-1.5">
                      <span>{isSelected ? 'Active Pathway' : 'Click to inspect'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Expanded Selected Pathway Details Panel */}
          <div className="mt-10 bg-[#F5F8FF] border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 text-[#14213D] shadow-sm relative">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#155EEF]">
                  Detailed Pathway Blueprint: {pathways[selectedPathway].index}
                </span>
                <h4 className="text-xl sm:text-2xl font-bold font-editorial text-[#14213D] mt-1">
                  {pathways[selectedPathway].title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsEligibilityOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#155EEF] hover:bg-[#104ECC] text-white text-xs font-bold shrink-0 transition-colors shadow-sm"
              >
                Check If You Qualify
              </button>
            </div>

            <p className="text-sm text-[#475569] mt-3 leading-relaxed max-w-4xl">
              {pathways[selectedPathway].details}
            </p>

            <div className="mt-6 pt-5 border-t border-[#E2E8F0] grid grid-cols-1 sm:grid-cols-3 gap-4">
              {pathways[selectedPathway].requirements.map((req, rIdx) => (
                <div key={rIdx} className="flex items-center gap-2.5 text-xs text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 8: 2-YEAR GRADUATE ROUTE (PSW) STAY-BACK VISA
          Unrestricted post-study work authorization, sponsor-free
         ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-[#F5F8FF] border-b border-[#E2E8F0]" aria-label="UK Graduate Route Visa">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-white via-[#F8FAFF] to-[#EAF2FF] rounded-3xl p-8 sm:p-12 border-2 border-[#155EEF]/20 shadow-[0_12px_36px_rgba(21,94,239,0.08)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-wider shadow-sm">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>POST-STUDY STAY-BACK RIGHTS</span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-editorial text-[#14213D] tracking-tight">
                  The UK Graduate Route: 2 Years Unrestricted Work Rights.
                </h3>

                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  Upon graduating from an eligible UK higher education provider, international graduates can live and work in the UK for up to <strong>2 full years (3 years for doctoral / PhD graduates)</strong> in any sector or role without requiring company visa sponsorship.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm">
                    <div className="flex items-center gap-2 font-bold text-sm text-[#14213D]">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                      <span>Zero Employer Sponsorship Needed</span>
                    </div>
                    <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                      Work in full-time corporate roles, startups, freelancing, or self-employment without employer endorsement.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm">
                    <div className="flex items-center gap-2 font-bold text-sm text-[#14213D]">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                      <span>Direct Skilled Worker Transition</span>
                    </div>
                    <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                      Switch easily into the 5-year Skilled Worker Visa with favorable "New Entrant" salary thresholds leading to Indefinite Leave to Remain (ILR).
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleOpenConsultation}
                    className="px-6 py-3 rounded-xl bg-[#155EEF] hover:bg-[#104ECC] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                  >
                    <span>Consult with UK Visa Specialist</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEligibilityOpen(true)}
                    className="px-5 py-3 rounded-xl bg-white hover:bg-[#F5F8FF] text-[#155EEF] border border-[#CBD5E1] font-bold text-xs transition-colors"
                  >
                    Check Stay-Back Eligibility
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center">
                <div className="p-6 rounded-3xl bg-white border border-[#B9D5FF] shadow-lg text-center w-full max-w-sm space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#EAF2FF] text-[#155EEF] mx-auto flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-3xl font-black font-editorial text-[#14213D]">24 Months</div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#155EEF] mt-0.5">Graduate Route Stay-Back</div>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Available to all international students completing an eligible undergraduate or master's degree from a UK higher education institution with a track record of compliance.
                  </p>
                  <div className="pt-3 border-t border-[#E2E8F0] text-[11px] font-bold text-emerald-600">
                    ✓ 36 Months for PhD Graduates
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 9: ADMISSION PREPARATION — INTERACTIVE CHECKLIST
         ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#E2E8F0]" aria-label="Application Preparation Checklist">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
                <CheckSquare className="w-3.5 h-3.5" />
                <span>Applicant Roadmap</span>
              </div>
              <h2 className="section-clamp-title font-editorial font-bold text-[#14213D] tracking-tight">
                Prepare Smarter. Secure Your UK CAS.
              </h2>
              <p className="text-base sm:text-lg text-[#475569] mt-2 leading-relaxed max-w-2xl">
                Follow this proven 4-stage admissions roadmap to ensure your dossier receives fast unconditional offers and CAS issuance.
              </p>
            </div>

            <div className="bg-[#F5F8FF] rounded-2xl p-4 border border-[#E2E8F0] shadow-sm shrink-0 min-w-[240px]">
              <div className="flex items-center justify-between text-xs font-bold text-[#14213D] mb-1.5">
                <span>Readiness Tracker</span>
                <span className="text-[#155EEF]">{totalStepsCompleted} of 4 stages checked</span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#155EEF] h-full rounded-full transition-all duration-300"
                  style={{ width: `${(totalStepsCompleted / 4) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {prepStages.map((stage, idx) => {
              const isDone = completedSteps[idx];
              const isExpanded = expandedPrepStage === idx;

              return (
                <div
                  key={stage.number}
                  className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden ${
                    isExpanded ? 'shadow-[0_12px_36px_rgba(15,23,42,0.08)] border-[#CBD5E1]' : 'shadow-sm border-[#E2E8F0] hover:border-slate-300'
                  }`}
                >
                  <div className="p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <button
                        type="button"
                        onClick={() => toggleStepCompleted(idx)}
                        className={`p-2 rounded-xl transition-colors mt-0.5 ${
                          isDone ? 'bg-emerald-50 text-[#16A34A]' : 'bg-[#F5F8FF] text-[#64748B] hover:text-[#14213D]'
                        }`}
                        aria-label={`Mark stage ${stage.number} as completed`}
                      >
                        {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                      </button>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[#64748B]">STAGE {stage.number}</span>
                          {isDone && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-[#16A34A] border border-emerald-200">
                              Completed
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold font-editorial text-[#14213D] mt-0.5">
                          {stage.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#475569] mt-1 max-w-2xl leading-relaxed">
                          {stage.summary}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setExpandedPrepStage(isExpanded ? -1 : idx)}
                      className="self-end sm:self-auto px-4 py-2 rounded-xl bg-[#F5F8FF] hover:bg-[#EAF2FF] text-[#14213D] text-xs font-bold flex items-center gap-1.5 transition-colors border border-[#E2E8F0]"
                    >
                      <span>{isExpanded ? 'Collapse' : 'View Action Steps'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="px-6 pb-7 sm:px-7 pt-2 border-t border-[#E2E8F0] bg-[#F5F8FF] animate-fade-in">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-3">
                        Required Action Items & Document Milestones
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {stage.details.map((detail, dIdx) => (
                          <div key={dIdx} className="p-3 rounded-xl bg-white border border-[#E2E8F0] text-xs text-[#475569] flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-[#155EEF] shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 10: LIVING COSTS & UKVI PROOF OF FUNDS
         ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-[#F5F8FF] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <Coins className="w-3.5 h-3.5" />
              <span>Financial Requirements & Budgeting</span>
            </div>
            <h2 className="section-clamp-title font-editorial font-bold text-[#14213D] tracking-tight">
              UKVI Financial Maintenance Guidelines.
            </h2>
            <p className="text-base sm:text-lg text-[#475569] mt-3 leading-relaxed">
              UK Visas and Immigration requires international students to demonstrate verified living expense funds held in a bank account for 28 consecutive days before visa filing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Inner London */}
            <div className="bg-white rounded-3xl p-8 border border-[#E2E8F0] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-[#155EEF] border border-blue-200 text-xs font-bold">
                  GREATER LONDON CAMPUSES
                </span>
                <span className="text-xs font-mono font-bold text-[#64748B]">Inner London Area</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black font-editorial text-[#14213D]">
                £1,334 <span className="text-base font-normal text-[#64748B]">/ month</span>
              </div>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                For universities situated within the Greater London metropolitan zone (e.g., Imperial, UCL, LSE, King’s, Queen Mary), students must demonstrate £1,334 per month for up to 9 months (£12,006 total living expenses).
              </p>
              <div className="pt-3 border-t border-[#E2E8F0] text-xs text-[#155EEF] font-semibold">
                ✓ Total 9-Month Maintenance: £12,006 + remaining tuition
              </div>
            </div>

            {/* Outside London */}
            <div className="bg-white rounded-3xl p-8 border border-[#E2E8F0] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#16A34A] border border-emerald-200 text-xs font-bold">
                  OUTSIDE LONDON CAMPUSES
                </span>
                <span className="text-xs font-mono font-bold text-[#64748B]">Rest of the UK</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black font-editorial text-[#16A34A]">
                £1,023 <span className="text-base font-normal text-[#64748B]">/ month</span>
              </div>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                For universities outside Greater London (e.g., Oxford, Cambridge, Manchester, Birmingham, Leeds, Edinburgh), students must demonstrate £1,023 per month for up to 9 months (£9,207 total living expenses).
              </p>
              <div className="pt-3 border-t border-[#E2E8F0] text-xs text-[#16A34A] font-semibold">
                ✓ Total 9-Month Maintenance: £9,207 + remaining tuition
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 11: FINAL HIGH-CONVERSION CTA BANNER
         ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white relative overflow-hidden border-b border-[#E2E8F0]" aria-label="Book a Consultation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#EAF2FF] via-[#F5F8FF] to-white rounded-3xl p-8 sm:p-12 lg:p-16 border-2 border-[#155EEF]/20 shadow-[0_12px_36px_rgba(15,23,42,0.08)] text-[#14213D] relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start Your Overseas Education Chapter</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#14213D] tracking-tight leading-tight">
                  Your Future in the UK Is Waiting. <br />
                  <span className="text-[#155EEF]">Let’s Plan It Together.</span>
                </h2>

                <p className="text-base sm:text-lg text-[#475569] max-w-2xl leading-relaxed">
                  Take the definitive step toward studying in the United Kingdom. Shortlist top universities, evaluate automatic scholarship discounts, verify IELTS waivers, and secure your CAS with MasterVisa.
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={handleOpenConsultation}
                    className="px-7 py-4 rounded-2xl bg-[#155EEF] hover:bg-[#104ECC] text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 group"
                  >
                    <span>Book a UK Consultation</span>
                    <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsEligibilityOpen(true)}
                    className="px-6 py-4 rounded-2xl bg-white hover:bg-[#EAF2FF] text-[#155EEF] border border-[#CBD5E1] font-bold text-sm sm:text-base shadow-sm transition-all flex items-center gap-2"
                  >
                    <span>Check UK Eligibility</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="pt-6 border-t border-[#E2E8F0] text-[11px] text-[#64748B]">
                  MasterVisa provides authorized educational guidance and advisory consulting. We do not guarantee visa approvals or university acceptances, which remain subject to official university and UKVI decisions.
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-[#E2E8F0] p-4 flex items-center justify-center bg-white shadow-md animate-float-slow">
                  <div className="w-full h-full rounded-full border border-dashed border-[#155EEF]/30 flex items-center justify-center p-6 text-center">
                    <div>
                      <Plane className="w-10 h-10 text-[#155EEF] mx-auto mb-2 transform -rotate-45" />
                      <div className="text-xl font-black font-editorial text-[#14213D]">UK 2026/27</div>
                      <div className="text-[10px] uppercase font-bold text-[#155EEF] tracking-wider mt-1">
                        Autumn Admissions Open
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 12: CONCLUSION & QUICK LINKS
         ───────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#F5F8FF]" aria-label="Conclusion">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-[#14213D] tracking-tight">
            Make Your Next Educational Chapter Count.
          </h3>
          <p className="text-sm sm:text-base text-[#475569] mt-4 leading-relaxed font-normal">
            A British degree confers internationally celebrated prestige, advanced professional competence, and lifelong global networks. Connect with our dedicated UK counselors to find your ideal program and university.
          </p>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs font-semibold text-[#64748B]">
            <Link to="/destinations" className="hover:text-[#155EEF] transition-colors">
              Explore All Destinations →
            </Link>
            <span>•</span>
            <Link to="/destinations/usa" className="hover:text-[#155EEF] transition-colors">
              Study in USA →
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-[#155EEF] transition-colors">
              Contact Advisors →
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          VIEW PROGRAMS MODAL (When user clicks "View Programs")
         ───────────────────────────────────────────────────────────── */}
      {selectedUniForPrograms && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="uk-programs-modal-title"
          onClick={() => setSelectedUniForPrograms(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E2E8F0] overflow-hidden text-[#14213D]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Campus Visual */}
            <div className="relative h-44 w-full overflow-hidden">
              <img
                src={selectedUniForPrograms.image}
                alt={selectedUniForPrograms.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" />
              
              <div className="absolute top-4 right-4">
                <button
                  type="button"
                  onClick={() => setSelectedUniForPrograms(null)}
                  className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="px-2.5 py-0.5 rounded-full bg-[#155EEF] text-[10px] font-bold uppercase tracking-wider">
                  {selectedUniForPrograms.rankBadge} Featured UK Institution
                </span>
                <h3 id="uk-programs-modal-title" className="text-xl sm:text-2xl font-bold font-editorial mt-1 leading-tight text-white">
                  {selectedUniForPrograms.name}
                </h3>
                <p className="text-xs text-blue-100 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{selectedUniForPrograms.location}</span>
                </p>
              </div>
            </div>

            {/* Modal Body: Popular Programs */}
            <div className="p-6 sm:p-8 space-y-5 max-h-[60vh] overflow-y-auto">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-3">
                  Featured Academic & Master’s Degrees
                </h4>
                <div className="space-y-3">
                  {selectedUniForPrograms.programs.map((prog, pIdx) => (
                    <div 
                      key={pIdx}
                      className="p-4 rounded-2xl bg-[#F5F8FF] border border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#CBD5E1] transition-all"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#14213D]">{prog.name}</span>
                          {prog.pswEligible && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-[#16A34A] border border-emerald-200">
                              2-Yr PSW Route
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-[#64748B] mt-1">
                          <span>{prog.level}</span>
                          <span>•</span>
                          <span>{prog.duration}</span>
                        </div>
                      </div>

                      <div className="text-left sm:text-right shrink-0">
                        <div className="text-xs font-bold text-[#155EEF]">{prog.tuition}</div>
                        <span className="text-[10px] text-[#64748B]">Est. Tuition / Year</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedUniForPrograms(null);
                    setIsEligibilityOpen(true);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-[#F5F8FF] text-[#155EEF] border border-[#CBD5E1] text-xs font-bold transition-colors"
                >
                  Check Eligibility for this Uni
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedUniForPrograms(null);
                    if (onOpenCounselling) {
                      onOpenCounselling(selectedUniForPrograms.name);
                    }
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#155EEF] hover:bg-[#104ECC] text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Consult with Advisor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          INTERACTIVE UK ELIGIBILITY MODAL
         ───────────────────────────────────────────────────────────── */}
      <UkEligibilityModal
        isOpen={isEligibilityOpen}
        onClose={() => setIsEligibilityOpen(false)}
        onProceedConsultation={(_data) => {
          setIsEligibilityOpen(false);
          if (onOpenCounselling) {
            onOpenCounselling('United Kingdom');
          }
        }}
      />
    </div>
  );
};

export default StudyInUkPage;
