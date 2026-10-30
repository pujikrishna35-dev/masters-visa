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
  RotateCw
} from 'lucide-react';
import { UsaEligibilityModal } from '../components/UsaEligibilityModal';
import { UniversityLogo } from '../components/UniversityLogo';
import { DestinationNavBar } from '../components/DestinationNavBar';

interface StudyInUsaPageProps {
  onOpenCounselling?: (destination?: string) => void;
}

interface UniversityItem {
  id: string;
  name: string;
  location: string;
  rankBadge: string;
  logoType: 'harvard' | 'stanford' | 'mit' | 'uc' | 'caltech';
  categories: string[];
  shortDesc: string;
  image: string;
  tags: string[];
  programs: Array<{
    name: string;
    level: string;
    duration: string;
    stem: boolean;
    tuition: string;
  }>;
}

const CATEGORIES = [
  { id: 'all', label: 'All', icon: Layers },
  { id: 'engineering', label: 'Engineering', icon: Cpu },
  { id: 'business', label: 'Business', icon: Briefcase },
  { id: 'cs', label: 'Computer Science', icon: Code2 },
  { id: 'medicine', label: 'Medicine', icon: Stethoscope },
  { id: 'law', label: 'Law', icon: Scale },
  { id: 'arts', label: 'Arts', icon: Palette },
] as const;

const UNIVERSITIES_DATA: UniversityItem[] = [
  {
    id: 'harvard',
    name: 'Harvard University',
    location: 'Cambridge, Massachusetts',
    rankBadge: '#1',
    logoType: 'harvard',
    categories: ['all', 'business', 'medicine', 'law', 'arts', 'cs'],
    shortDesc: 'Established in 1636, celebrated worldwide for rigorous scholarship, faculty leadership, and global alumni networks.',
    image: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&w=1200&q=80',
    tags: ['MBA & Finance', 'Public Policy', 'Medicine', 'Law'],
    programs: [
      { name: 'Master of Business Administration (MBA)', level: "Master's", duration: '2 Years', stem: false, tuition: '$76,000 / yr' },
      { name: 'MS in Computational Science & Engineering', level: "Master's", duration: '1.5 Years', stem: true, tuition: '$62,000 / yr' },
      { name: 'Master of Public Health (MPH)', level: "Master's", duration: '1 – 2 Years', stem: true, tuition: '$54,000 / yr' },
    ],
  },
  {
    id: 'stanford',
    name: 'Stanford University',
    location: 'Stanford, California',
    rankBadge: '#2',
    logoType: 'stanford',
    categories: ['all', 'engineering', 'cs', 'business', 'medicine', 'law'],
    shortDesc: 'Located in Silicon Valley, blending academic intensity with pioneering technological innovation and venture entrepreneurship.',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    tags: ['Artificial Intelligence', 'Computer Science', 'Bio-Engineering'],
    programs: [
      { name: 'MS in Computer Science & AI', level: "Master's", duration: '1.5 – 2 Years', stem: true, tuition: '$58,000 / yr' },
      { name: 'MS in Management Science & Engineering', level: "Master's", duration: '2 Years', stem: true, tuition: '$61,000 / yr' },
      { name: 'MS in Electrical Engineering', level: "Master's", duration: '2 Years', stem: true, tuition: '$59,000 / yr' },
    ],
  },
  {
    id: 'mit',
    name: 'Massachusetts Institute of Technology (MIT)',
    location: 'Cambridge, Massachusetts',
    rankBadge: '#3',
    logoType: 'mit',
    categories: ['all', 'engineering', 'cs', 'arts', 'business'],
    shortDesc: 'World leader in science, robotics, and engineering education, addressing complex problems with measurable global impact.',
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=80',
    tags: ['Robotics', 'Quantum Computing', 'Aeronautics', 'FinTech'],
    programs: [
      { name: 'Master of Engineering in EECS', level: "Master's", duration: '1 Year', stem: true, tuition: '$60,000 / yr' },
      { name: 'Master of Finance (MFin)', level: "Master's", duration: '1.5 Years', stem: true, tuition: '$84,000 / yr' },
      { name: 'MS in Mechanical Engineering', level: "Master's", duration: '2 Years', stem: true, tuition: '$59,000 / yr' },
    ],
  },
  {
    id: 'uc',
    name: 'University of California',
    location: 'Berkeley & Los Angeles, California',
    rankBadge: '#4',
    logoType: 'uc',
    categories: ['all', 'engineering', 'cs', 'medicine', 'law', 'arts', 'business'],
    shortDesc: 'Premier public research university system, recognized globally for groundbreaking scientific discoveries and Nobel laureates.',
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=1200&q=80',
    tags: ['Data Science', 'Biotechnology', 'Environmental Science'],
    programs: [
      { name: 'MS in Data Science & Analytics', level: "Master's", duration: '1.5 Years', stem: true, tuition: '$44,000 / yr' },
      { name: 'Master of Engineering (M.Eng)', level: "Master's", duration: '1 Year', stem: true, tuition: '$48,000 / yr' },
      { name: 'Master of Laws (LL.M.)', level: "Master's", duration: '1 Year', stem: false, tuition: '$52,000 / yr' },
    ],
  },
  {
    id: 'caltech',
    name: 'California Institute of Technology (Caltech)',
    location: 'Pasadena, California',
    rankBadge: '#5',
    logoType: 'caltech',
    categories: ['all', 'engineering', 'cs', 'medicine'],
    shortDesc: 'World-renowned science and engineering institute with intimate student-faculty collaboration and NASA JPL management.',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80',
    tags: ['Astrophysics', 'Aerospace', 'Applied Mathematics'],
    programs: [
      { name: 'MS in Aeronautics (GALCIT)', level: "Master's", duration: '1 – 2 Years', stem: true, tuition: '$58,000 / yr' },
      { name: 'MS in Applied Physics', level: "Master's", duration: '2 Years', stem: true, tuition: '$56,000 / yr' },
      { name: 'MS in Computing & Mathematical Sciences', level: "Master's", duration: '2 Years', stem: true, tuition: '$58,000 / yr' },
    ],
  },
];

export const StudyInUsaPage: React.FC<StudyInUsaPageProps> = ({ onOpenCounselling }) => {
  // Modal States
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const [selectedUniForPrograms, setSelectedUniForPrograms] = useState<UniversityItem | null>(null);

  // 1. Showcase States: Category Filter & 3D University Orbit
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeUniIndex, setActiveUniIndex] = useState<number>(1); // Default to Stanford as featured center
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

  // Coordinated manual navigation (locks scroll override briefly for smoothness)
  const triggerManualNav = (indexSetter: (prev: number) => number) => {
    isManualNavRef.current = true;
    if (manualNavTimeoutRef.current) clearTimeout(manualNavTimeoutRef.current);
    manualNavTimeoutRef.current = setTimeout(() => {
      isManualNavRef.current = false;
    }, 2500);
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

  // Natural, non-trapping scroll-driven rotation
  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      if (!trackRef.current || filteredUniversities.length <= 1) return;
      const rect = trackRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Track as showcase traverses the active viewing zone
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
    top100: 0,
    studentsMillion: 0,
    states: 0,
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
              universities: Math.floor(ease * 5300),
              top100: Math.floor(ease * 100),
              studentsMillion: Number((ease * 1.0).toFixed(1)),
              states: Math.floor(ease * 50),
            });

            if (progress < 1) {
              requestAnimationFrame(animateCounts);
            } else {
              setStatCounts({
                universities: 5300,
                top100: 100,
                studentsMillion: 1.0,
                states: 50,
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
      title: 'World-Class Education',
      shortDesc: 'Explore diverse programs, established institutions, and innovative teaching environments.',
      longDesc:
        'US universities lead the world in academic flexibility, interdisciplinary degrees, and cutting-edge pedagogical frameworks. With access to over 5,300 colleges, students can customize major-minor combinations, collaborate directly with faculty mentors, and gain globally respected credentials.',
      accent: '#155EEF',
      badge: 'Academic Eminence',
      stats: '50 of Top 100 Worldwide',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'research',
      index: '02',
      title: 'Research and Innovation',
      shortDesc: 'Discover opportunities in science, engineering, business, technology, and other disciplines.',
      longDesc:
        'With billions of dollars invested annually in university research through NSF, NIH, and DARPA grants, graduate students work in Tier-1 (R1) laboratories. From autonomous robotics to genomic medicine and artificial intelligence, you conduct research that shapes the global frontier.',
      accent: '#16A34A',
      badge: 'Tier-1 R1 Research',
      stats: '$80B+ Annual R&D Funding',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'global-community',
      index: '03',
      title: 'Global Community',
      shortDesc: 'Experience multicultural campuses and connect with students from around the world.',
      longDesc:
        'American universities host over 1 million international scholars representing more than 160 nations. Campuses are vibrant micro-cities featuring cultural festivals, multicultural graduate unions, debate societies, and lifelong professional networks spanning every continent.',
      accent: '#3B82F6',
      badge: '1M+ International Scholars',
      stats: '160+ Nations Represented',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'career-dev',
      index: '04',
      title: 'Career Development',
      shortDesc: 'Develop professional skills, industry connections, and international experience.',
      longDesc:
        'Eligible STEM degree graduates can access up to 36 months of full-time Optional Practical Training (OPT) in the United States without requiring immediate lottery sponsorship. Direct pipelines into Silicon Valley, Wall Street, and Fortune 500 corporations accelerate global career trajectories.',
      accent: '#155EEF',
      badge: '3-Year STEM OPT',
      stats: 'Up to 36 Months Post-Study Work',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  // 4. US Admission Intakes
  const [selectedIntake, setSelectedIntake] = useState<number>(0);
  const intakes = [
    {
      id: 'fall',
      season: 'FALL INTAKE',
      months: 'August / September',
      cycle: 'Primary Academic Intake',
      accent: '#155EEF',
      headline: 'The Flagship Admission Cycle with Maximum Financial Aid',
      desc: 'The fall intake is a major admission cycle and often offers a wide range of courses.',
      highlights: [
        'Largest availability of university scholarships, tuition waivers, and departmental grants.',
        'Maximum Graduate Assistantships: Teaching Assistant (TA) & Research Assistant (RA) opportunities.',
        'Primary recruiting cycle for US Fortune 500 summer internships and on-campus career fairs.',
        'Recommended application timeline: Submit dossiers between November and January.',
      ],
      idealFor: 'Students seeking maximum degree program options, scholarship eligibility, and full campus collegiate experience.',
      status: 'High Volume • Full Funding Availability',
    },
    {
      id: 'spring',
      season: 'SPRING INTAKE',
      months: 'January / February',
      cycle: 'Secondary Academic Intake',
      accent: '#16A34A',
      headline: 'A Streamlined Secondary Gateway with Fast Turnaround',
      desc: 'The spring intake provides another opportunity to begin your academic journey.',
      highlights: [
        'Ideal for applicants who completed degrees in summer and needed extra time for English test retakes.',
        'Less crowded applicant pools allow more personalized application scrutiny by admission committees.',
        'Fast visa processing turnaround with winter consular appointment windows.',
        'Recommended application timeline: Submit dossiers between June and September.',
      ],
      idealFor: 'Graduates seeking to avoid a gap year while refining their statement of purpose and credentials.',
      status: 'Moderate Volume • Selective Program Availability',
    },
    {
      id: 'summer',
      season: 'SUMMER INTAKE',
      months: 'May / June',
      cycle: 'Accelerated & Specialty Intake',
      accent: '#3B82F6',
      headline: 'Accelerated Tracks & Specialty Certification Sessions',
      desc: 'Selected institutions offer summer entry for specific courses and programs.',
      highlights: [
        'Focused on specialized STEM bridge semesters, accelerated Master’s cohorts, and language pathways.',
        'Smaller class sizes enabling intimate faculty access from day one.',
        'Allows early campus integration before the major Fall semester rush.',
        'Recommended application timeline: Submit dossiers between January and March.',
      ],
      idealFor: 'Students in pre-master preparatory courses, accelerated business analytics, or summer research fellowships.',
      status: 'Specialized Track • University Specific',
    },
  ];

  // 5. English Proficiency Tests
  const [activeTestTab, setActiveTestTab] = useState<'ielts' | 'toefl' | 'pte'>('ielts');

  // 6. Study Without IELTS Pathway Nodes
  const [selectedPathway, setSelectedPathway] = useState<number>(0);
  const pathways = [
    {
      id: 'conditional',
      index: '01',
      title: 'Conditional Admission',
      summary: 'Some institutions offer conditional admission combined with English-language preparation.',
      details:
        'Under conditional admission, a US university evaluates and accepts your academic qualifications first. You receive an I-20 that includes pre-academic intensive English language coursework (IEP/ESL). Upon reaching the required proficiency benchmark on campus, you automatically matriculate into your degree program.',
      requirements: ['Academic qualifications reviewed first', 'Enrolment in university IEP / ESL center', 'Concurrent I-20 issuance for seamless visa'],
      badge: 'Bridge to Degree',
    },
    {
      id: 'previous-education',
      index: '02',
      title: 'Previous Education in English',
      summary: 'Some applicants may qualify for a waiver based on their previous education.',
      details:
        'Candidates who have completed at least 3 to 4 years of higher education where the sole Medium of Instruction (MOI) was English can apply for a formal language waiver at select universities. An official university-stamped MOI letter is required for committee evaluation.',
      requirements: ['Official institutional MOI certificate', 'Full 3–4 year English-medium undergraduate curriculum', 'Subject to department approval'],
      badge: 'MOI Waiver Pathway',
    },
    {
      id: 'university-assessment',
      index: '03',
      title: 'University-Specific Assessment',
      summary: 'Certain institutions may accept alternative tests or conduct their own assessments.',
      details:
        'Numerous progressive US institutions now evaluate candidates using online institutional diagnostic tests, Duolingo English Test (DET), or direct video faculty interviews to evaluate communicative fluency and academic speaking capability directly.',
      requirements: ['Online diagnostic assessment', 'Duolingo English Test (DET) alternative', 'Faculty or admissions panel interview'],
      badge: 'Modern Diagnostic',
    },
    {
      id: 'pathway-programs',
      index: '04',
      title: 'Pathway Programs',
      summary: 'Some programs combine English-language learning with academic preparation.',
      details:
        'Graduate pathway and bridge programs allow students to earn academic credit toward their Master’s degree while concurrently refining advanced academic writing, research methodologies, and specialized terminology alongside native speakers.',
      requirements: ['Earn transferable degree credits concurrently', 'Integrated collegiate tutoring and mentoring', 'Seamless transition to Year 2'],
      badge: 'Credit-Bearing Foundation',
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
      title: 'Build Your Application',
      summary: 'Prepare academic records, statements of purpose, recommendation letters when required, and supporting documents.',
      details: [
        'Procure official transcripts from all post-secondary colleges (WES evaluation if requested).',
        'Craft a compelling Statement of Purpose (SOP) tailored to your specific department and professors.',
        'Secure 2–3 Letters of Recommendation (LOR) from academic professors or workplace supervisors.',
        'Refine a modern US-format technical resume highlighting projects, publications, and leadership.',
      ],
    },
    {
      number: '02',
      title: 'Research Your Universities',
      summary: 'Compare courses, tuition fees, locations, entry criteria, and available scholarships.',
      details: [
        'Shortlist 8–12 institutions balanced across Dream, Target, and Safe categories.',
        'Review faculty research labs, curriculum electives, and graduate employment statistics.',
        'Compare city cost of living (Metropolitan vs. College Town living expenses).',
        'Verify departmental deadlines, application fees, and priority scholarship dates.',
      ],
    },
    {
      number: '03',
      title: 'Plan Your Timeline',
      summary: 'Track application deadlines, English test requirements, and document submission dates.',
      details: [
        'Register and sit for English proficiency tests (IELTS, TOEFL, or PTE) at least 6 months before deadlines.',
        'Order standardized score reports early to avoid international processing backlogs.',
        'Submit Fall applications before priority deadlines (typically Dec 1 – Jan 15).',
        'Track portal status and confirm arrival of all recommendation submissions.',
      ],
    },
    {
      number: '04',
      title: 'Organize Your Finances',
      summary: 'Research tuition, living expenses, funding opportunities, and other costs.',
      details: [
        'Secure liquid financial documentation demonstrating 1-year total Cost of Attendance (COA) for Form I-20.',
        'Explore non-collateral or collateral education loans with approved international lending partners.',
        'Apply for departmental Graduate Assistantships (TA/RA) or merit tuition discounts upon admission.',
        'Budget for SEVIS I-901 fee ($350) and US Embassy F-1 visa appointment charges.',
      ],
    },
  ];

  const totalStepsCompleted = Object.values(completedSteps).filter(Boolean).length;

  // 8. Eligibility Criteria
  const eligibilityCriteria = [
    {
      title: 'Academic Excellence',
      points: [
        'Bachelor’s degree from an accredited higher education institution',
        '60%+ marks (or equivalent 3.0 / 4.0 GPA benchmark)',
        '3-year or 4-year degree evaluation depends on university policy',
      ],
    },
  ];

  const handleOpenConsultation = () => {
    if (onOpenCounselling) {
      onOpenCounselling('USA');
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

    // Mobile viewport (< 768px): Focus solely on 1 clean center card.
    // Side cards are safely hidden to prevent any horizontal overflow on small screens.
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

    // Laptop viewport (1024px - 1399px, e.g. 1366x768 & 1280x720):
    // Center card + 2 balanced visible neighbors (total span ~820px, perfectly within 1280px & 1366px)
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

    // Wide Desktop (>= 1440px, e.g. 1920x1080):
    // Full 5-card orbital depth
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

  return (
    <div className="bg-white text-[#475569] min-h-screen selection:bg-[#155EEF] selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Destination Country Navigation Bar */}
      <DestinationNavBar activeCountry="usa" />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: 3D UNIVERSITY ORBIT SHOWCASE
          Full-width, premium white and pale-blue theme with 3D CSS
          elliptical orbit, clear campus photography, and smooth flow
         ───────────────────────────────────────────────────────────── */}
      <section 
        ref={trackRef}
        className="relative bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFF] to-[#FFFFFF] text-[#14213D] pt-4 pb-8 sm:pt-6 sm:pb-10 lg:pt-6 lg:pb-10 border-b border-[#E2E8F0] overflow-hidden"
      >
        {/* Subtle Decorative Ambient Lighting & Orbit Path Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Ambient Pale Blue Glow Radii */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[360px] bg-gradient-to-r from-[#155EEF]/8 via-[#3B82F6]/6 to-[#155EEF]/8 rounded-full blur-[100px]" />
          <div className="absolute top-1/4 left-1/4 w-[380px] h-[380px] bg-[#155EEF]/4 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 right-12 w-[380px] h-[380px] bg-[#3B82F6]/4 rounded-full blur-[120px]" />

          {/* Concentric Dotted Elliptical 3D Orbit Lines */}
          <svg 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1240px] h-[520px] pointer-events-none overflow-visible select-none opacity-35" 
            viewBox="0 0 1240 520"
          >
            <defs>
              <linearGradient id="orbitGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#155EEF" stopOpacity="0.08" />
                <stop offset="50%" stopColor="#155EEF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#155EEF" stopOpacity="0.08" />
              </linearGradient>
              <linearGradient id="orbitGlow2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.05" />
                <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            {/* Outer Primary Orbit Ring */}
            <ellipse cx="620" cy="260" rx="560" ry="175" fill="none" stroke="url(#orbitGlow)" strokeWidth="1.8" strokeDasharray="6 8" />
            {/* Inner Nested Orbit Ring */}
            <ellipse cx="620" cy="260" rx="430" ry="130" fill="none" stroke="url(#orbitGlow2)" strokeWidth="1.2" strokeDasharray="4 6" />
            {/* Planetary Nodes */}
            <circle cx="160" cy="260" r="4.5" fill="#155EEF" opacity="0.6" className="animate-pulse" />
            <circle cx="1080" cy="260" r="4.5" fill="#155EEF" opacity="0.6" className="animate-pulse" />
            <circle cx="390" cy="145" r="3.5" fill="#3B82F6" opacity="0.5" />
            <circle cx="850" cy="145" r="3.5" fill="#3B82F6" opacity="0.5" />
          </svg>

          {/* Dotted Flight Path with Floating Plane */}
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M -50 200 C 250 110, 650 290, 1150 130 S 1650 180, 2100 80"
              fill="none"
              stroke="#155EEF"
              strokeWidth="1.5"
              strokeDasharray="6 8"
            />
          </svg>
          <div className="absolute top-28 left-[18%] opacity-65 animate-float-slow">
            <Plane className="w-5 h-5 text-[#155EEF] transform -rotate-45" />
          </div>

          {/* Faint Architectural Skyline Silhouette on Far-Right */}
          <div 
            className="absolute -right-8 bottom-0 w-72 h-72 opacity-[0.025] bg-contain bg-no-repeat bg-right-bottom"
            style={{ backgroundImage: `url('/images/nyc-skyline.jpg')` }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Breadcrumb strip */}
          <nav aria-label="Breadcrumb" className="mb-2 sm:mb-3">
            <ol className="flex items-center gap-2 text-xs font-semibold text-[#64748B]">
              <li>
                <Link to="/" className="hover:text-[#155EEF] transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link to="/destinations" className="hover:text-[#155EEF] transition-colors">Destinations</Link>
              </li>
              <li>/</li>
              <li className="text-[#14213D] font-bold" aria-current="page">Study in USA</li>
            </ol>
          </nav>

          {/* A. Header (Centered Layout) */}
          <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6">
            {/* Top Rounded Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-sm mb-2 sm:mb-2.5 animate-fade-in">
              <GraduationCap className="w-3.5 h-3.5 text-[#155EEF]" />
              <span>TOP UNIVERSITIES</span>
            </div>

            {/* Heading */}
            <h1 className="font-editorial font-bold text-[#14213D] tracking-tight text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[44px] leading-tight max-w-2xl mx-auto break-words">
              Explore the Best <br className="sm:hidden" /> Universities <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#155EEF] to-[#3B82F6]">
                in the USA
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-xs sm:text-sm text-[#475569] mt-2 max-w-xl mx-auto leading-relaxed font-normal">
              Discover world-class universities, explore academic opportunities, and find the right destination for your future.
            </p>

            {/* Orbit Status Indicator & CTAs */}
            <div className="mt-3 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 w-full max-w-xs sm:max-w-2xl mx-auto px-2">
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#E2E8F0] text-xs font-semibold text-[#64748B] shadow-sm whitespace-nowrap shrink-0">
                <RotateCw className={`w-3.5 h-3.5 text-[#155EEF] ${!isHovered && !prefersReducedMotion ? 'animate-spin-slow' : ''}`} />
                <span>3D Orbit Mode • Auto Rotating</span>
              </div>

              <button
                type="button"
                onClick={() => setIsEligibilityOpen(true)}
                className="w-full sm:w-auto px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-white hover:bg-[#F5F8FF] text-[#155EEF] border border-[#CBD5E1] font-bold text-xs shadow-sm hover:shadow-md hover:border-[#155EEF]/50 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <span>Check Your Eligibility</span>
                <span className="text-[#155EEF]">↗</span>
              </button>

              <button
                type="button"
                onClick={handleOpenConsultation}
                className="w-full sm:w-auto px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#155EEF] hover:bg-[#104ECC] text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* B. 3D Orbit Stage */}
          <div 
            className="relative w-full max-w-5xl mx-auto my-auto h-[420px] sm:h-[450px] flex items-center justify-center overflow-visible select-none"
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
            {/* Floating Carousel Navigation Arrows (Desktop) */}
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

            {/* 3D Orbit Cards */}
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
                    className={`absolute top-1/2 left-1/2 w-[285px] sm:w-[320px] lg:w-[335px] rounded-3xl border flex flex-col justify-between overflow-hidden bg-white ${
                      isCenter
                        ? 'border-[#155EEF] ring-2 ring-[#155EEF]/20 cursor-default'
                        : 'border-[#E2E8F0] cursor-pointer hover:border-[#155EEF]/50'
                    }`}
                  >
                    {/* Top Campus Photograph Area - Crisp, Clear, Bright! */}
                    <div className="relative h-40 sm:h-44 lg:h-46 w-full overflow-hidden bg-slate-100 rounded-t-3xl">
                      <img
                        src={uni.image}
                        alt={uni.name}
                        loading="eager"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                      />
                      {/* Subtle top vignette only for white ranking badge contrast */}
                      <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-black/25 to-transparent pointer-events-none" />

                      {/* Ranking Badge (Top-Left) */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E2E8F0] text-xs font-mono font-bold text-[#155EEF] shadow-sm flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-[#155EEF]" />
                          <span>{uni.rankBadge}</span>
                        </span>
                      </div>

                      {/* Favorite Heart Button (Top-Right) */}
                      <button
                        type="button"
                        onClick={(e) => toggleFavorite(uni.id, e)}
                        className="absolute top-3 right-3 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 backdrop-blur-md border border-[#E2E8F0] flex items-center justify-center shadow-sm hover:scale-110 transition-transform focus:outline-none"
                        aria-label="Save to favorites"
                      >
                        <Heart className={`w-3.5 h-3.5 transition-colors ${isFav ? 'fill-rose-500 text-rose-500' : 'text-[#64748B] hover:text-rose-500'}`} />
                      </button>

                      {/* Authentic University Emblem Badge (Overlapping Bottom-Left) */}
                      <div className="absolute -bottom-2.5 left-4 sm:left-5 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white shadow-md border border-[#E2E8F0] p-1 flex items-center justify-center z-10 transition-transform hover:scale-105">
                        <UniversityLogo type={uni.logoType} className="w-full h-full" />
                      </div>
                    </div>

                    {/* Card Body Area */}
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

          {/* Orbit Controls (Mobile/Tablet Arrows & Pagination Dots) */}
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

          {/* C. Animated Category Filters */}
          <div className="mt-3 sm:mt-4 overflow-x-auto no-scrollbar py-1">
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
          USA EDUCATION STATISTICS PANEL
          Directly below the 3D orbit showcase, with animated count-up
         ───────────────────────────────────────────────────────────── */}
      <section className="py-12 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={statsRef}
            className="bg-[#F5F8FF] rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-[0_12px_36px_rgba(21,94,239,0.06)]"
            aria-label="USA Higher Education Core Metrics"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#E2E8F0]">
              {/* Stat 1: 5,300+ */}
              <div className="pt-2 sm:pt-0 sm:px-6 first:pl-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-2 rounded-xl bg-[#EAF2FF] text-[#155EEF]">
                    <Building2 className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                    Universities in USA
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-editorial text-[#14213D] tracking-tight">
                  {statCounts.universities.toLocaleString()}+
                </div>
                <p className="text-xs text-[#475569] mt-1 font-medium">
                  Accredited higher education institutions
                </p>
              </div>

              {/* Stat 2: Top 100 */}
              <div className="pt-4 sm:pt-0 sm:px-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-2 rounded-xl bg-emerald-50 text-[#16A34A]">
                    <Award className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                    World Rankings
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-editorial text-[#16A34A] tracking-tight">
                  Top {statCounts.top100}
                </div>
                <p className="text-xs text-[#475569] mt-1 font-medium">
                  World-ranked global universities
                </p>
              </div>

              {/* Stat 3: 1M+ */}
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
                  {statCounts.studentsMillion.toFixed(0)}M+
                </div>
                <p className="text-xs text-[#475569] mt-1 font-medium">
                  International students enrolled
                </p>
              </div>

              {/* Stat 4: 50 */}
              <div className="pt-4 sm:pt-0 sm:px-6 last:pr-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-2 rounded-xl bg-amber-50 text-[#F59E0B]">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                    Destinations
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-editorial text-[#F59E0B] tracking-tight">
                  {statCounts.states}
                </div>
                <p className="text-xs text-[#475569] mt-1 font-medium">
                  States with diverse opportunities
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: WHY CHOOSE THE USA? — INTERACTIVE STORYTELLING
          Alternate Section Background: #F5F8FF
         ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F5F8FF] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <Globe2 className="w-3.5 h-3.5" />
              <span>Academic Advantages</span>
            </div>
            <h2 className="section-clamp-title font-editorial font-bold text-[#14213D] tracking-tight">
              More Than a Degree. A World of Possibilities.
            </h2>
            <p className="text-base sm:text-lg text-[#475569] mt-3 leading-relaxed">
              The United States offers a diverse academic environment, innovative research opportunities, internationally recognized qualifications, and exposure to global career pathways.
            </p>
          </div>

          {/* Split-Screen Interactive Storytelling Component */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Interactive Benefit Rows */}
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
          SECTION 3: US ADMISSION INTAKES — ANIMATED ACADEMIC TIMELINE
          Main Background: #FFFFFF (White Theme)
         ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-b border-[#E2E8F0]" aria-label="US Admission Intakes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <Calendar className="w-3.5 h-3.5" />
              <span>Academic Calendar & Cycles</span>
            </div>
            <h2 className="section-clamp-title font-editorial font-bold text-[#14213D] tracking-tight">
              Choose Your Moment to Begin.
            </h2>
            <p className="text-base sm:text-lg text-[#475569] mt-3 leading-relaxed">
              US universities offer different application cycles. Availability and deadlines vary by institution and program.
            </p>
          </div>

          {/* Timeline Component */}
          <div className="relative">
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
                      <span>Shortlist Universities for {intakes[selectedIntake].season.split(' ')[0]}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="mt-8 pt-4 border-t border-[#E2E8F0] text-[11px] text-[#64748B] flex items-center gap-2">
                <Info className="w-3.5 h-3.5 text-[#155EEF] shrink-0" />
                <span>Note: Admission deadlines vary by academic program and institution. Verify specific dates with your target universities.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: ENGLISH PROFICIENCY — INTERACTIVE SCORE GUIDE
          Alternate Section Background: #F5F8FF
         ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F5F8FF] border-b border-[#E2E8F0]" aria-label="English Proficiency Score Guide">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Language Benchmarks</span>
            </div>
            <h2 className="section-clamp-title font-editorial font-bold text-[#14213D] tracking-tight">
              Your English Score. Your Next Step.
            </h2>
            <p className="text-base sm:text-lg text-[#475569] mt-3 leading-relaxed">
              Understand common English proficiency tests used in international admissions and check the requirements of your target universities.
            </p>
          </div>

          {/* Test Panels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 1. IELTS ACADEMIC */}
            <div 
              role="button"
              tabIndex={0}
              onClick={() => setActiveTestTab('ielts')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveTestTab('ielts'); }}
              className={`rounded-3xl p-8 border cursor-pointer flex flex-col justify-between transition-all duration-300 ${
                activeTestTab === 'ielts'
                  ? 'border-[#155EEF] ring-2 ring-[#155EEF]/20 shadow-[0_12px_36px_rgba(15,23,42,0.08)] bg-white scale-[1.02]'
                  : 'bg-white border-[#E2E8F0] hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#EAF2FF] text-[#155EEF] border border-[#B9D5FF] font-bold text-xs">
                    IELTS ACADEMIC
                  </span>
                  <span className="text-[11px] font-bold text-[#64748B]">9.0 Band Scale</span>
                </div>

                <div className="mt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Illustrative Benchmark</div>
                  <div className="text-4xl sm:text-5xl font-black font-editorial text-[#155EEF] mt-1">
                    Around 6.5
                  </div>
                </div>

                <div className="mt-5 space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-[#475569]">
                    <span>Proficiency Scale</span>
                    <span>6.5 / 9.0</span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#155EEF] h-full rounded-full transition-all duration-500" style={{ width: '72%' }} />
                  </div>
                </div>

                <p className="text-xs text-[#475569] mt-5 leading-relaxed">
                  Recognized by over 3,400 US colleges and universities. Most competitive Master's programs seek an overall 6.5 with individual section band minimums of 6.0.
                </p>

                {activeTestTab === 'ielts' && (
                  <div className="mt-4 pt-4 border-t border-blue-100 text-[11px] text-[#155EEF] font-semibold animate-fade-in">
                    ✓ Recommended section bands: Reading 6.0, Listening 6.5, Writing 6.0, Speaking 6.5.
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#E2E8F0] text-[11px] text-[#64748B] flex items-center justify-between">
                <span><strong>Format:</strong> In-person / Computer</span>
                <span className="text-xs font-bold text-[#155EEF]">{activeTestTab === 'ielts' ? 'Selected' : 'Select'}</span>
              </div>
            </div>

            {/* 2. TOEFL iBT */}
            <div 
              role="button"
              tabIndex={0}
              onClick={() => setActiveTestTab('toefl')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveTestTab('toefl'); }}
              className={`rounded-3xl p-8 border cursor-pointer flex flex-col justify-between transition-all duration-300 ${
                activeTestTab === 'toefl'
                  ? 'border-[#16A34A] ring-2 ring-[#16A34A]/20 shadow-[0_12px_36px_rgba(15,23,42,0.08)] bg-white scale-[1.02]'
                  : 'bg-white border-[#E2E8F0] hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#16A34A] border border-emerald-200 font-bold text-xs">
                    TOEFL iBT
                  </span>
                  <span className="text-[11px] font-bold text-[#64748B]">120 Total Points</span>
                </div>

                <div className="mt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Illustrative Range</div>
                  <div className="text-4xl sm:text-5xl font-black font-editorial text-[#16A34A] mt-1">
                    80–100
                  </div>
                </div>

                <div className="mt-5 space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-[#475569]">
                    <span>Proficiency Scale</span>
                    <span>80–100 / 120</span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#16A34A] h-full rounded-full transition-all duration-500" style={{ width: '80%' }} />
                  </div>
                </div>

                <p className="text-xs text-[#475569] mt-5 leading-relaxed">
                  Administered by ETS, TOEFL is universally recognized across the United States. Many top engineering and STEM graduate departments require 80 to 100 points.
                </p>

                {activeTestTab === 'toefl' && (
                  <div className="mt-4 pt-4 border-t border-emerald-100 text-[11px] text-[#16A34A] font-semibold animate-fade-in">
                    ✓ Recommended section scores: ~20-25 per section across Reading, Listening, Speaking & Writing.
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#E2E8F0] text-[11px] text-[#64748B] flex items-center justify-between">
                <span><strong>Format:</strong> 100% Internet-delivered</span>
                <span className="text-xs font-bold text-[#16A34A]">{activeTestTab === 'toefl' ? 'Selected' : 'Select'}</span>
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
                  <div className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Illustrative Range</div>
                  <div className="text-4xl sm:text-5xl font-black font-editorial text-purple-600 mt-1">
                    50–70
                  </div>
                </div>

                <div className="mt-5 space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-[#475569]">
                    <span>Proficiency Scale</span>
                    <span>50–70 / 90</span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full rounded-full transition-all duration-500" style={{ width: '68%' }} />
                  </div>
                </div>

                <p className="text-xs text-[#475569] mt-5 leading-relaxed">
                  Pearson PTE Academic is widely accepted by US institutions for international applications, celebrated for rapid 48-hour computer-automated score turnarounds.
                </p>

                {activeTestTab === 'pte' && (
                  <div className="mt-4 pt-4 border-t border-purple-100 text-[11px] text-purple-700 font-semibold animate-fade-in">
                    ✓ Recommended section scores: 58+ in all communicative skills for competitive graduate programs.
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#E2E8F0] text-[11px] text-[#64748B] flex items-center justify-between">
                <span><strong>Format:</strong> AI-evaluated Computer Test</span>
                <span className="text-xs font-bold text-purple-600">{activeTestTab === 'pte' ? 'Selected' : 'Select'}</span>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white border border-[#E2E8F0] rounded-2xl p-5 text-[#475569] text-xs flex items-start gap-3 shadow-sm">
            <Info className="w-5 h-5 text-[#155EEF] shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-[#14213D]">Official Guidance Notice:</strong> These figures are illustrative benchmarks, not universal minimums. Requirements depend on the university, course, and applicant. Check official admissions guidance before applying.
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: STUDY WITHOUT IELTS — INTERACTIVE PATHWAY MAP
          Main Background: #FFFFFF (White Theme)
         ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white text-[#14213D] relative overflow-hidden border-b border-[#E2E8F0]" aria-label="Alternative English Pathways">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <Compass className="w-3.5 h-3.5" />
              <span>Alternative Pathways</span>
            </div>
            <h2 className="section-clamp-title font-editorial font-bold text-[#14213D] tracking-tight">
              There May Be Another Path.
            </h2>
            <p className="text-base sm:text-lg text-[#475569] mt-3 leading-relaxed">
              Some universities provide alternative ways to demonstrate English proficiency. Explore the possible pathways and confirm whether you qualify.
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

          <div className="mt-10 bg-[#F5F8FF] border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 text-[#14213D] shadow-sm relative">
            <div className="flex items-start justify-between gap-4">
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
          SECTION 6: ADMISSION PREPARATION — INTERACTIVE CHECKLIST
          Alternate Section Background: #F5F8FF
         ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F5F8FF] border-b border-[#E2E8F0]" aria-label="Application Preparation Checklist">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
                <CheckSquare className="w-3.5 h-3.5" />
                <span>Applicant Roadmap</span>
              </div>
              <h2 className="section-clamp-title font-editorial font-bold text-[#14213D] tracking-tight">
                Prepare Smarter. Apply with Confidence.
              </h2>
              <p className="text-base sm:text-lg text-[#475569] mt-2 leading-relaxed max-w-2xl">
                Follow this verified four-stage roadmap to ensure your dossier stands out to admissions committees.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm shrink-0 min-w-[240px]">
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
                              Explored
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
          SECTION 7: ELIGIBILITY CRITERIA — FLOATING EDITORIAL ASYMMETRIC LAYOUT
          Main Background: #FFFFFF (White Theme)
         ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-b border-[#E2E8F0]" aria-label="Eligibility Criteria">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Application Qualifications</span>
            </div>
            <h2 className="section-clamp-title font-editorial font-bold text-[#14213D] tracking-tight">
              Your Journey Begins with the Right Foundation.
            </h2>
            <p className="text-base sm:text-lg text-[#475569] mt-3 leading-relaxed">
              Understand the common requirements you may need to meet when applying to a university or an eligible scholarship.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Feature Panel */}
            <div className="lg:col-span-7 bg-[#F5F8FF] rounded-3xl p-8 sm:p-10 text-[#14213D] shadow-sm border-2 border-[#155EEF]/30 flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF2FF] border border-[#B9D5FF] flex items-center justify-center text-[#155EEF]">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#EAF2FF] text-[#155EEF] border border-[#B9D5FF] font-bold text-xs uppercase tracking-wider">
                    Core Admission Pillar
                  </span>
                </div>

                <div className="text-xs font-mono font-bold text-[#155EEF]">CRITERION 01</div>
                <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-[#14213D] mt-1">
                  Academic Excellence
                </h3>
                <p className="text-sm sm:text-base text-[#155EEF] font-semibold mt-3 leading-relaxed">
                  Meet the academic entry requirements of your selected program.
                </p>
                <p className="text-xs sm:text-sm text-[#475569] mt-2 leading-relaxed">
                  US admissions evaluate undergraduate performance holistically. While competitive Tier-1 programs seek 60%+ marks or 3.0+ GPA, admissions committees also review coursework difficulty and upward grade progression.
                </p>

                <div className="mt-8 space-y-2.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#14213D]">
                    Typical Academic Benchmarks
                  </div>
                  {eligibilityCriteria[0].points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#475569]">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex items-center justify-between relative z-10">
                <span className="text-xs text-[#64748B]">Unsure of your GPA equivalence?</span>
                <button
                  type="button"
                  onClick={() => setIsEligibilityOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#155EEF] hover:bg-[#104ECC] text-white text-xs font-bold transition-colors shadow-sm"
                >
                  Calculate Eligibility
                </button>
              </div>
            </div>

            {/* Supporting Panels */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div className="bg-[#F5F8FF] rounded-3xl p-6 sm:p-7 shadow-sm border border-[#E2E8F0]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#16A34A] border border-emerald-200 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#64748B]">CRITERION 02</span>
                    <h4 className="text-base font-bold font-editorial text-[#14213D]">
                      Leadership and Involvement
                    </h4>
                  </div>
                </div>
                <p className="text-xs text-[#475569] leading-relaxed mt-2">
                  Highlight relevant extracurricular activities, leadership, or community involvement where appropriate.
                </p>
              </div>

              <div className="bg-[#F5F8FF] rounded-3xl p-6 sm:p-7 shadow-sm border border-[#E2E8F0]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-[#EAF2FF] text-[#155EEF] border border-[#B9D5FF] flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#64748B]">CRITERION 03</span>
                    <h4 className="text-base font-bold font-editorial text-[#14213D]">
                      English Proficiency
                    </h4>
                  </div>
                </div>
                <p className="text-xs text-[#475569] leading-relaxed mt-2">
                  Meet the institution’s language requirements or qualify for an accepted exemption via IELTS, TOEFL, PTE, or MOI pathways.
                </p>
              </div>

              <div className="bg-[#F5F8FF] rounded-3xl p-6 sm:p-7 shadow-sm border border-[#E2E8F0]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#64748B]">CRITERION 04</span>
                    <h4 className="text-base font-bold font-editorial text-[#14213D]">
                      Admission to a Qualifying Program
                    </h4>
                  </div>
                </div>
                <p className="text-xs text-[#475569] leading-relaxed mt-2">
                  Secure admission to an SEVP-certified institution that issues the requisite Form I-20 for your F-1 student visa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 8: FINAL CTA — BEGIN YOUR STUDY JOURNEY
          Alternate Section Background: #F5F8FF
         ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F5F8FF] relative overflow-hidden border-b border-[#E2E8F0]" aria-label="Book a Consultation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#EAF2FF] via-[#F5F8FF] to-white rounded-3xl p-8 sm:p-12 lg:p-16 border-2 border-[#155EEF]/20 shadow-[0_12px_36px_rgba(15,23,42,0.08)] text-[#14213D] relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start Your Overseas Education Chapter</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#14213D] tracking-tight leading-tight">
                  Your Future Is Waiting. <br />
                  <span className="text-[#155EEF]">Let’s Plan It.</span>
                </h2>

                <p className="text-base sm:text-lg text-[#475569] max-w-2xl leading-relaxed">
                  Take the next step toward studying in the United States. Explore university options, understand application requirements, and plan your overseas education journey with Master Visa.
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={handleOpenConsultation}
                    className="px-7 py-4 rounded-2xl bg-[#155EEF] hover:bg-[#104ECC] text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 group"
                  >
                    <span>Book a Consultation</span>
                    <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsEligibilityOpen(true)}
                    className="px-6 py-4 rounded-2xl bg-white hover:bg-[#EAF2FF] text-[#155EEF] border border-[#CBD5E1] font-bold text-sm sm:text-base shadow-sm transition-all flex items-center gap-2"
                  >
                    <span>Check Eligibility</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="pt-6 border-t border-[#E2E8F0] text-[11px] text-[#64748B]">
                  Master Visa provides educational guidance and profile consulting. We do not guarantee visa approvals, university acceptances, or scholarships.
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-[#E2E8F0] p-4 flex items-center justify-center bg-white shadow-md animate-float-slow">
                  <div className="w-full h-full rounded-full border border-dashed border-[#155EEF]/30 flex items-center justify-center p-6 text-center">
                    <div>
                      <Plane className="w-10 h-10 text-[#155EEF] mx-auto mb-2 transform -rotate-45" />
                      <div className="text-xl font-black font-editorial text-[#14213D]">USA 2026/27</div>
                      <div className="text-[10px] uppercase font-bold text-[#155EEF] tracking-wider mt-1">
                        Admissions Open
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
          SECTION 9: CONCLUSION — MAKE YOUR NEXT CHAPTER COUNT
          Main Background: #FFFFFF
         ───────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white" aria-label="Conclusion">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-[#14213D] tracking-tight">
            Make Your Next Chapter Count.
          </h3>
          <p className="text-sm sm:text-base text-[#475569] mt-4 leading-relaxed font-normal">
            Studying in the USA can offer valuable academic and international experiences. Researching universities, understanding entry requirements, preparing documents early, and planning finances carefully can help you make informed decisions about your future.
          </p>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs font-semibold text-[#64748B]">
            <Link to="/destinations" className="hover:text-[#155EEF] transition-colors">
              Explore All Destinations →
            </Link>
            <span>•</span>
            <Link to="/visa-information" className="hover:text-[#155EEF] transition-colors">
              F-1 Visa Guide →
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-[#155EEF] transition-colors">
              Contact Advisors →
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          VIEW PROGRAMS MODAL (Triggered when user clicks "View Programs")
         ───────────────────────────────────────────────────────────── */}
      {selectedUniForPrograms && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="programs-modal-title"
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
                  {selectedUniForPrograms.rankBadge} Featured Institution
                </span>
                <h3 id="programs-modal-title" className="text-xl sm:text-2xl font-bold font-editorial mt-1 leading-tight text-white">
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
                  Featured Academic & Master's Programs
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
                          {prog.stem && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-[#16A34A] border border-emerald-200">
                              3-Yr STEM OPT
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
                        <span className="text-[10px] text-[#64748B]">Est. Cost / Year</span>
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
          INTERACTIVE USA ELIGIBILITY MODAL
         ───────────────────────────────────────────────────────────── */}
      <UsaEligibilityModal
        isOpen={isEligibilityOpen}
        onClose={() => setIsEligibilityOpen(false)}
        onProceedConsultation={(_data) => {
          setIsEligibilityOpen(false);
          if (onOpenCounselling) {
            onOpenCounselling('USA');
          }
        }}
      />
    </div>
  );
};
