import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
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
  FileCheck2
} from 'lucide-react';
import { CanadaEligibilityModal } from '../components/CanadaEligibilityModal';
import { UniversityLogo } from '../components/UniversityLogo';
import { DestinationNavBar } from '../components/DestinationNavBar';

interface StudyInCanadaPageProps {
  onOpenCounselling?: (destination?: string) => void;
}

interface UniversityItem {
  id: string;
  name: string;
  location: string;
  province: string;
  rankBadge: string;
  rankingSource: string;
  logoType: 'toronto' | 'ubc' | 'mcgill' | 'alberta' | 'waterloo';
  categories: string[];
  shortDesc: string;
  image: string;
  tags: string[];
  programs: Array<{
    name: string;
    level: string;
    duration: string;
    coop: boolean;
    tuition: string;
  }>;
}

const CATEGORIES = [
  { id: 'all', label: 'All', icon: Layers },
  { id: 'engineering', label: 'Engineering & STEM', icon: Cpu },
  { id: 'business', label: 'Business & Management', icon: Briefcase },
  { id: 'cs', label: 'Computer Science & AI', icon: Code2 },
  { id: 'health', label: 'Health & Medicine', icon: Stethoscope },
  { id: 'law', label: 'Law & Public Policy', icon: Scale },
  { id: 'arts', label: 'Arts & Media', icon: Palette },
] as const;

const UNIVERSITIES_DATA: UniversityItem[] = [
  {
    id: 'toronto',
    name: 'University of Toronto',
    location: 'Toronto, Ontario',
    province: 'Ontario',
    rankBadge: '#25 Global',
    rankingSource: 'QS World University Rankings 2025 • #1 in Canada',
    logoType: 'toronto',
    categories: ['all', 'cs', 'business', 'engineering', 'health', 'law', 'arts'],
    shortDesc: 'Canada’s leading research powerhouse and birthplace of deep learning, situated in the commercial and technological heart of downtown Toronto.',
    image: '/images/canada/toronto.jpg',
    tags: ['Artificial Intelligence', 'Rotman MBA', 'Data Science', 'Biomedical'],
    programs: [
      { name: 'MSc in Applied Computing (MScAC - AI & Data)', level: "Master's", duration: '16 Months', coop: true, tuition: 'CAD $42,500 / yr' },
      { name: 'Master of Business Administration (Rotman MBA)', level: "Master's", duration: '2 Years', coop: true, tuition: 'CAD $67,200 / yr' },
      { name: 'MEng in Mechanical & Industrial Engineering', level: "Master's", duration: '1 – 2 Years', coop: false, tuition: 'CAD $44,800 / yr' },
      { name: 'Honours Bachelor of Science (Computer Science)', level: "Bachelor's", duration: '4 Years', coop: true, tuition: 'CAD $60,510 / yr' },
    ],
  },
  {
    id: 'ubc',
    name: 'University of British Columbia',
    location: 'Vancouver, British Columbia',
    province: 'British Columbia',
    rankBadge: '#38 Global',
    rankingSource: 'QS World University Rankings 2025',
    logoType: 'ubc',
    categories: ['all', 'engineering', 'cs', 'business', 'health', 'arts'],
    shortDesc: 'A top-40 global university located on Vancouver’s stunning coastal Point Grey peninsula, celebrated for sustainable innovation and global industry ties.',
    image: '/images/canada/ubc.jpg',
    tags: ['Data Science', 'Sauder MBA', 'Clean Energy', 'Cognitive Systems'],
    programs: [
      { name: 'Master of Data Science (MDS)', level: "Master's", duration: '10 Months', coop: false, tuition: 'CAD $47,600 total' },
      { name: 'Master of Business Administration (Sauder MBA)', level: "Master's", duration: '16 Months', coop: true, tuition: 'CAD $58,500 / yr' },
      { name: 'MEng in Clean Energy & Environmental Engineering', level: "Master's", duration: '1 Year', coop: false, tuition: 'CAD $41,200 / yr' },
      { name: 'Bachelor of Applied Science (Electrical & Computer)', level: "Bachelor's", duration: '4 Years', coop: true, tuition: 'CAD $55,300 / yr' },
    ],
  },
  {
    id: 'mcgill',
    name: 'McGill University',
    location: 'Montreal, Quebec',
    province: 'Quebec',
    rankBadge: '#29 Global',
    rankingSource: 'QS World University Rankings 2025',
    logoType: 'mcgill',
    categories: ['all', 'engineering', 'cs', 'business', 'health', 'law', 'arts'],
    shortDesc: 'Established in 1821 in cosmopolitan Montreal, McGill boasts more Nobel laureates and Rhodes scholars than any other Canadian higher education institution.',
    image: '/images/canada/mcgill.jpg',
    tags: ['Desautels Management', 'Neuroscience', 'Robotics', 'International Law'],
    programs: [
      { name: 'Master of Management in Analytics (MMA)', level: "Master's", duration: '1 Year', coop: true, tuition: 'CAD $51,800 total' },
      { name: 'MSc in Computer Science (Thesis & Project)', level: "Master's", duration: '1.5 – 2 Years', coop: false, tuition: 'CAD $28,400 / yr' },
      { name: 'MEng in Electrical & Computer Engineering', level: "Master's", duration: '1.5 Years', coop: false, tuition: 'CAD $31,200 / yr' },
      { name: 'Bachelor of Commerce (BCom - Desautels)', level: "Bachelor's", duration: '3 – 4 Years', coop: true, tuition: 'CAD $63,000 / yr' },
    ],
  },
  {
    id: 'alberta',
    name: 'University of Alberta',
    location: 'Edmonton, Alberta',
    province: 'Alberta',
    rankBadge: '#96 Global',
    rankingSource: 'QS World University Rankings 2025 • Top 5 in Canada',
    logoType: 'alberta',
    categories: ['all', 'engineering', 'cs', 'business', 'health'],
    shortDesc: 'A global epicenter for artificial intelligence (Amii) and energy engineering, offering outstanding research funding and lower cost-of-living advantages.',
    image: '/images/canada/alberta.jpg',
    tags: ['Amii Artificial Intelligence', 'Energy Systems', 'Petroleum', 'Pharmacy'],
    programs: [
      { name: 'MSc in Computing Science (Machine Learning & AI)', level: "Master's", duration: '2 Years', coop: true, tuition: 'CAD $21,500 / yr' },
      { name: 'Master of Business Administration (Alberta MBA)', level: "Master's", duration: '20 Months', coop: true, tuition: 'CAD $33,200 / yr' },
      { name: 'MEng in Mechanical & Petroleum Engineering', level: "Master's", duration: '1 – 2 Years', coop: false, tuition: 'CAD $24,800 / yr' },
      { name: 'BSc in Computer Engineering (Co-op Stream)', level: "Bachelor's", duration: '4 Years', coop: true, tuition: 'CAD $39,500 / yr' },
    ],
  },
  {
    id: 'waterloo',
    name: 'University of Waterloo',
    location: 'Waterloo, Ontario',
    province: 'Ontario',
    rankBadge: '#115 Global',
    rankingSource: 'QS World University Rankings 2025 • #1 for Co-op',
    logoType: 'waterloo',
    categories: ['all', 'cs', 'engineering', 'business', 'arts'],
    shortDesc: 'Canada’s foremost tech innovation university, operating the world’s largest post-secondary co-operative education network with 7,500+ global employers.',
    image: '/images/canada/waterloo.jpg',
    tags: ['World’s #1 Co-op Program', 'Quantum Computing', 'Software Eng', 'Actuarial'],
    programs: [
      { name: 'Master of Mathematics (MMath) in Computer Science', level: "Master's", duration: '1.5 – 2 Years', coop: true, tuition: 'CAD $25,200 / yr' },
      { name: 'MEng in Electrical & Computer Engineering', level: "Master's", duration: '1 Year', coop: false, tuition: 'CAD $28,900 / yr' },
      { name: 'Master of Actuarial Science (MActSc)', level: "Master's", duration: '1 Year', coop: true, tuition: 'CAD $39,000 total' },
      { name: 'Bachelor of Applied Science in Software Engineering', level: "Bachelor's", duration: '4.5 Years', coop: true, tuition: 'CAD $64,200 / yr' },
    ],
  },
];

export const StudyInCanadaPage: React.FC<StudyInCanadaPageProps> = ({ onOpenCounselling }) => {
  // Modal States
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const [selectedUniForPrograms, setSelectedUniForPrograms] = useState<UniversityItem | null>(null);

  // 1. Showcase States: Category Filter & 3D University Orbit
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeUniIndex, setActiveUniIndex] = useState<number>(0); // Default to University of Toronto
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
    studentsMillion: 0,
    pgwpYears: 0,
    coopCompensation: 0,
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
              universities: Math.floor(ease * 100),
              studentsMillion: Number((ease * 1.0).toFixed(1)),
              pgwpYears: Math.floor(ease * 3),
              coopCompensation: Math.floor(ease * 25),
            });

            if (progress < 1) {
              requestAnimationFrame(animateCounts);
            } else {
              setStatCounts({
                universities: 100,
                studentsMillion: 1.0,
                pgwpYears: 3,
                coopCompensation: 25,
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

  // 3. Interactive Benefits State (Section 5)
  const [activeBenefit, setActiveBenefit] = useState<number>(0);
  const benefits = [
    {
      id: 'world-class',
      index: '01',
      title: 'World-Class Education',
      shortDesc: 'Globally respected degrees, Tier-1 research labs, and U15 faculty excellence.',
      longDesc:
        'Canadian universities consistently rank among the top worldwide for academic rigor, cutting-edge laboratory facilities, and external quality benchmarks. Degrees from institutions like Toronto, UBC, and McGill confer international prestige and seamless credit recognition across North America and Europe.',
      accent: '#155EEF',
      badge: 'Academic Eminence',
      stats: '3 in World Top 40',
      image: '/images/canada/toronto.jpg',
    },
    {
      id: 'safe-welcoming',
      index: '02',
      title: 'Safe and Welcoming Environment',
      shortDesc: 'Inclusive multicultural campuses and celebrated global diversity.',
      longDesc:
        'Canada is celebrated for its multicultural society, progressive social policies, and welcoming attitude toward international students. Campuses offer robust mental health, career, and housing advisory services to help newcomers settle safely into Canadian collegiate life.',
      accent: '#16A34A',
      badge: 'Inclusive Society',
      stats: '190+ Nationalities Represented',
      image: '/images/canada/canada-culture.jpg',
    },
    {
      id: 'affordable-options',
      index: '03',
      title: 'Affordable Education Options',
      shortDesc: 'Subsidized tuition fee models with high long-term return on investment.',
      longDesc:
        'While tuition costs vary depending on the chosen institution, program, and province, Canadian universities and public colleges frequently offer lower overall attendance costs compared to equivalent private institutions in the United States and United Kingdom.',
      accent: '#3B82F6',
      badge: 'Competitive Tuition',
      stats: 'Subsidized Public System',
      image: '/images/canada/alberta.jpg',
    },
    {
      id: 'pgwp',
      index: '04',
      title: 'Post-Graduation Work Opportunities',
      shortDesc: 'Up to 3 years open work authorization through the Post-Graduation Work Permit (PGWP).',
      longDesc:
        'Graduates of eligible programs at Canadian Designated Learning Institutions (DLIs) can qualify for an open work permit of up to 3 years per current IRCC guidelines, providing valuable Canadian work experience to support career advancement and provincial permanent residency pathways.',
      accent: '#E63946',
      badge: 'Up to 3-Yr PGWP',
      stats: 'Open Work Authorization',
      image: '/images/canada/canada-hero.jpg',
    },
    {
      id: 'diverse-programs',
      index: '05',
      title: 'Diverse Courses and Programs',
      shortDesc: 'Interdisciplinary specializations from quantum computing to sustainable architecture.',
      longDesc:
        'Whether pursuing cutting-edge AI and data engineering, international commerce, clean energy systems, biomedical sciences, or creative arts, Canadian curricula blend theoretical rigor with applied case studies, field research, and capstone team projects.',
      accent: '#8B5CF6',
      badge: 'Program Flexibility',
      stats: '10,000+ Available Majors',
      image: '/images/canada/mcgill.jpg',
    },
    {
      id: 'global-recognition',
      index: '06',
      title: 'Global Recognition',
      shortDesc: 'Degrees validated by Fortune 500 corporations and world universities.',
      longDesc:
        'A credential from an accredited Canadian institution is recognized across government bodies, professional associations, and multinational employers worldwide, giving graduates a competitive edge in global hiring pools and higher education.',
      accent: '#155EEF',
      badge: 'Worldwide Credibility',
      stats: '100% International Equivalence',
      image: '/images/canada/waterloo.jpg',
    },
    {
      id: 'quality-of-life',
      index: '07',
      title: 'Quality of Life',
      shortDesc: 'Clean cities, universal healthcare access, and iconic outdoor wilderness.',
      longDesc:
        'Canadian metropolitan centres like Toronto, Vancouver, Montreal, and Calgary routinely place in global top livability indices. Students enjoy four distinct seasons, safe public transportation, universal provincial health plans, and access to national parks and outdoor activities.',
      accent: '#16A34A',
      badge: 'High Livability',
      stats: 'Top 10 Global Livability',
      image: '/images/canada/canada-culture.jpg',
    },
    {
      id: 'student-work',
      index: '08',
      title: 'Student Work Opportunities',
      shortDesc: 'Up to 24 hours/week off-campus during terms and full-time during breaks.',
      longDesc:
        'Under updated IRCC regulations, eligible full-time international students can work off-campus up to 24 hours per week during regular academic terms and full-time during scheduled winter and summer vacations, providing practical exposure and supplementary income.',
      accent: '#E63946',
      badge: '24 Hrs / Wk Off-Campus',
      stats: 'Full-Time During Breaks',
      image: '/images/canada/ubc.jpg',
    },
  ];

  // 4. Canadian Admission Intakes
  const [selectedIntake, setSelectedIntake] = useState<number>(0);
  const intakes = [
    {
      id: 'fall',
      season: 'FALL INTAKE',
      months: 'September',
      cycle: 'Primary Academic Intake',
      accent: '#155EEF',
      headline: 'The Flagship Canadian Academic Cycle with Full Course & Scholarship Pools',
      desc: 'The September intake is Canada’s primary entry point, offering 100% of undergraduate degrees, master’s courses, and post-graduate diplomas.',
      highlights: [
        'Largest availability of university entrance scholarships, departmental bursaries, and teaching assistantships (TA/RA).',
        'Full quota of Provincial Attestation Letters (PAL) available across all designated institutions.',
        'Primary recruiting cycle for Canadian corporate co-ops, career fairs, and on-campus networking events.',
        'Recommended application timeline: Submit dossiers between October and January for early consideration.',
      ],
      idealFor: 'Applicants seeking the widest degree options, university funding eligibility, and the complete collegiate orientation experience.',
      status: 'High Volume • Full Degree Catalogue',
    },
    {
      id: 'winter',
      season: 'WINTER INTAKE',
      months: 'January',
      cycle: 'Secondary Academic Intake',
      accent: '#16A34A',
      headline: 'A Streamlined Winter Gateway with Rapid Turnaround',
      desc: 'The January intake offers high availability across STEM, Computer Science, Business Analytics, and post-graduate diplomas.',
      highlights: [
        'Ideal for applicants who completed summer bachelor’s degrees or required extra time for English proficiency retakes.',
        'Fast turnaround on offer letters and focused provincial PAL allocations.',
        'Smaller cohort sizes enabling closer faculty collaboration and dedicated co-op placement support.',
        'Recommended application timeline: Submit dossiers between May and August.',
      ],
      idealFor: 'Graduates looking to avoid a gap year while matriculating into fast-paced Master’s or PG diploma courses.',
      status: 'Selected Programs • Expedited Processing',
    },
    {
      id: 'summer',
      season: 'SPRING / SUMMER INTAKE',
      months: 'May',
      cycle: 'Accelerated & Pathway Intake',
      accent: '#E63946',
      headline: 'Accelerated Co-op Tracks & Academic English Pathways',
      desc: 'Selective Canadian institutions offer May entry for specialized engineering semesters, co-op terms, and language bridge programs.',
      highlights: [
        'Focused on accelerated diploma programs, pre-master language pathways, and executive certificates.',
        'Smaller class sizes providing personal attention from academic advisors.',
        'Allows early campus integration and Canadian orientation prior to the major Fall semester rush.',
        'Recommended application timeline: Submit dossiers between November and February.',
      ],
      idealFor: 'Students enrolled in academic bridge programs, specialized diploma cohorts, or summer research initiatives.',
      status: 'Specialized Track • University Specific',
    },
  ];

  // 5. English Proficiency Tests
  const [activeTestTab, setActiveTestTab] = useState<'ielts' | 'pte' | 'toefl'>('ielts');

  // 6. Scholarships in Canada Interactive Guide Steps
  const [completedScholarshipSteps, setCompletedScholarshipSteps] = useState<Record<number, boolean>>({
    0: true,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const toggleScholarshipStep = (index: number) => {
    setCompletedScholarshipSteps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const scholarshipSteps = [
    {
      number: '01',
      title: 'Identify Relevant Scholarships',
      desc: 'Research institutional entrance awards, provincial graduate scholarships (e.g., OGS, QEII-GSST), and government fellowships like Vanier Canada Graduate Scholarships.',
    },
    {
      number: '02',
      title: 'Review Academic Merit & Eligibility Thresholds',
      desc: 'Ensure undergraduate grades satisfy minimum GPA benchmarks (typically 75%+ or 3.5+ GPA on a 4.0 scale for funded graduate research awards).',
    },
    {
      number: '03',
      title: 'Prepare Statement of Purpose & Research Proposal',
      desc: 'Tailor a specialized academic proposal outlining research methodology, faculty alignment, and proposed contributions to Canadian innovation.',
    },
    {
      number: '04',
      title: 'Secure Strong Academic Letters of Recommendation',
      desc: 'Obtain 2–3 confidential appraisal letters from university professors highlighting analytical capability, integrity, and scholarly potential.',
    },
    {
      number: '05',
      title: 'Meet Early Application Deadlines',
      desc: 'Scholarship priority deadlines typically close between December and February, well before standard admission deadlines.',
    },
    {
      number: '06',
      title: 'Track Decision Notifications & Accept Terms',
      desc: 'Review official scholarship offer letters, verify renewal requirements (maintaining minimum GPA), and confirm acceptance.',
    },
  ];

  const totalScholarshipDone = Object.values(completedScholarshipSteps).filter(Boolean).length;

  // 7. Interactive Application Readiness Checklist
  const [completedReadiness, setCompletedReadiness] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
  });
  const [expandedPrepStage, setExpandedPrepStage] = useState<number>(0);

  const toggleReadiness = (index: number) => {
    setCompletedReadiness((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const prepStages = [
    {
      number: '01',
      title: 'Choose Universities and Programs',
      summary: 'Shortlist Canadian DLIs and compare curriculum, co-op partnerships, location, and fees.',
      details: [
        'Shortlist 5–8 Canadian Designated Learning Institutions (DLIs) balanced across Dream, Target, and Safe tiers.',
        'Review co-op internship terms, graduate employment statistics, and industry employer networks.',
        'Verify tuition fees ($20,000 – $45,000 CAD) and program eligibility for Post-Graduation Work Permits (PGWP).',
        'Check specific departmental entry deadlines and required prerequisite coursework.',
      ],
    },
    {
      number: '02',
      title: 'Review Academic and Language Requirements',
      summary: 'Confirm GPA equivalence, course prerequisites, and English proficiency test scores.',
      details: [
        'Obtain official transcripts from all post-secondary colleges (WES evaluation if required by the university).',
        'Verify required English scores (IELTS 6.5+, PTE 60+, or TOEFL 90+) for chosen faculties.',
        'Check for 15-year undergraduate education acceptance (3-year Bachelor’s degrees recognized by numerous DLIs).',
        'Schedule test dates early to ensure score reports arrive before departmental application deadlines.',
      ],
    },
    {
      number: '03',
      title: 'Prepare Application Documents',
      summary: 'Craft a compelling Statement of Purpose (SOP), technical resume, and letters of recommendation.',
      details: [
        'Draft an academically rigorous SOP focusing on course rationale, faculty research, and post-study career goals.',
        'Procure 2–3 Letters of Recommendation (LOR) on official institutional letterhead.',
        'Format a modern Canadian-style chronological resume highlighting projects, publications, and technical skills.',
        'Submit official application forms through provincial portals (e.g., OUAC for Ontario) or direct university portals.',
      ],
    },
    {
      number: '04',
      title: 'Research Scholarships and Funding',
      summary: 'Explore university entrance awards, research assistantships, and education loan sanctions.',
      details: [
        'Apply for departmental entrance awards and automatic international student merit waivers upon admission.',
        'Contact prospective faculty supervisors regarding Graduate Research Assistantships (GRA) or Teaching Assistantships (GTA).',
        'Secure liquid financial documentation or pre-approved education loan sanction letters from recognized financial institutions.',
        'Budget for university application fees ($100 – $250 CAD per institution).',
      ],
    },
    {
      number: '05',
      title: 'Submit Applications and Track Decisions',
      summary: 'Monitor applicant portals, clear conditional terms, and secure your Letter of Acceptance (LOA).',
      details: [
        'Track online application portals and confirm timely arrival of all supporting transcripts and recommendations.',
        'Receive and review Conditional and Unconditional Offer Letters from target universities.',
        'Pay the mandatory tuition deposit (typically $2,000 – $10,000 CAD) to confirm your seat.',
        'Receive the official Letter of Acceptance (LOA) containing DLI number and course details.',
      ],
    },
    {
      number: '06',
      title: 'Prepare Study Permit & PAL Documentation',
      summary: 'Secure Provincial Attestation Letter (PAL), purchase GIC ($20,635 CAD), and file with IRCC.',
      details: [
        'Ensure the university allocates a Provincial Attestation Letter (PAL) under the applicable provincial quota.',
        'Purchase a Guaranteed Investment Certificate (GIC) of $20,635 CAD from an approved Canadian financial institution.',
        'Undergo an upfront immigration medical examination (IME) with a panel physician if required.',
        'Submit the Canadian Study Permit application online via the IRCC portal with comprehensive financial and ties-to-home-country documentation.',
      ],
    },
  ];

  const totalReadinessDone = Object.values(completedReadiness).filter(Boolean).length;
  const readinessPercent = Math.round((totalReadinessDone / 6) * 100);

  const handleOpenConsultation = () => {
    if (onOpenCounselling) {
      onOpenCounselling('Canada');
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
    <div className="bg-white text-[#475569] min-h-screen selection:bg-[#E63946] selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Destination Country Navigation Bar */}
      <DestinationNavBar activeCountry="canada" />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO SECTION — YOUR FUTURE BEGINS IN CANADA
          Large heading, red maple leaf motif, dotted flight path,
          Toronto skyline & campus imagery, restrained Canadian red accents
         ───────────────────────────────────────────────────────────── */}
      <section 
        className="relative bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFF] to-[#FFFFFF] text-[#14213D] pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-18 border-b border-[#E2E8F0] overflow-hidden"
      >
        {/* Ambient Decorative Lighting & Canadian Maple Leaf Motifs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Pale Blue & Soft Red Glow Radii */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-gradient-to-r from-[#155EEF]/8 via-[#E63946]/5 to-[#3B82F6]/8 rounded-full blur-[110px]" />
          <div className="absolute top-10 left-10 w-[350px] h-[350px] bg-[#155EEF]/5 rounded-full blur-[100px]" />
          <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-[#E63946]/5 rounded-full blur-[120px]" />

          {/* Dotted Flight Path with Animated Plane Traveling to Canada */}
          <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="canadaFlightGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#155EEF" stopOpacity="0.2" />
                <stop offset="60%" stopColor="#E63946" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#155EEF" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <path
              d="M -50 420 C 300 360, 600 180, 950 140 S 1400 240, 1920 80"
              fill="none"
              stroke="url(#canadaFlightGrad)"
              strokeWidth="2"
              strokeDasharray="6 8"
              className="animate-flight-dash"
            />
          </svg>

          {/* Floating Plane */}
          <div className="absolute top-28 left-[22%] opacity-85 animate-float-slow">
            <div className="relative p-2.5 rounded-full bg-white/90 shadow-md border border-[#B9D5FF] backdrop-blur-md">
              <Plane className="w-5 h-5 text-[#E63946] transform -rotate-45" />
            </div>
          </div>

          {/* Floating Subtle Maple Leaf Graphic */}
          <div className="absolute top-20 right-[15%] opacity-15 pointer-events-none select-none animate-float-slow hidden md:block">
            <svg width="120" height="120" viewBox="0 0 100 100" fill="#E63946">
              <path d="M50 10 L55 28 L64 24 L62 36 L74 36 L70 48 L84 52 L76 60 L80 66 L66 66 L68 76 L56 72 L52 90 L48 90 L44 72 L32 76 L34 66 L20 66 L24 60 L16 52 L30 48 L26 36 L38 36 L36 24 L45 28 Z" />
            </svg>
          </div>

          {/* Faint Toronto Skyline Silhouette on Right */}
          <div className="absolute right-4 bottom-0 opacity-[0.04] pointer-events-none select-none hidden lg:block">
            <svg width="450" height="320" viewBox="0 0 450 320" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* CN Tower Outline */}
              <line x1="220" y1="20" x2="220" y2="320" stroke="#14213D" strokeWidth="4" />
              <ellipse cx="220" cy="110" rx="22" ry="8" stroke="#14213D" strokeWidth="3" />
              <polygon points="214,110 220,50 226,110" stroke="#14213D" strokeWidth="2" />
              {/* Downtown Towers */}
              <rect x="90" y="140" width="50" height="180" stroke="#14213D" strokeWidth="2" />
              <rect x="150" y="170" width="45" height="150" stroke="#14213D" strokeWidth="2" />
              <rect x="250" y="150" width="55" height="170" stroke="#14213D" strokeWidth="2" />
              <rect x="315" y="180" width="60" height="140" stroke="#14213D" strokeWidth="2" />
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
              <li className="text-[#14213D] font-bold" aria-current="page">Study in Canada</li>
            </ol>
          </nav>

          {/* Hero Header Layout */}
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            {/* Canadian Destination Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#14213D] text-xs font-bold uppercase tracking-wider shadow-sm mb-4 animate-fade-in">
              <span className="w-4 h-3 rounded-[2px] overflow-hidden inline-flex items-center justify-center border border-slate-200">
                <svg viewBox="0 0 60 30" className="w-full h-full">
                  <rect width="15" height="30" fill="#E63946" />
                  <rect x="15" width="30" height="30" fill="#FFFFFF" />
                  <rect x="45" width="15" height="30" fill="#E63946" />
                  {/* Central Maple Leaf */}
                  <path d="M30 6 L32 12 L36 10 L35 15 L40 15 L38 20 L44 21 L40 24 L42 26 L36 26 L37 29 L32 27 L31 30 L29 30 L28 27 L23 29 L24 26 L18 26 L20 24 L16 21 L22 20 L20 15 L25 15 L24 10 L28 12 Z" fill="#E63946" />
                </svg>
              </span>
              <span>STUDY IN CANADA · DESTINATION GUIDE</span>
            </div>

            {/* Editorial Heading */}
            <h1 className="font-editorial font-bold text-[#14213D] tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.12] max-w-3xl mx-auto break-words">
              Your Future Begins in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#155EEF] via-[#E63946] to-[#E63946]">
                Canada.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-sm sm:text-base md:text-lg text-[#475569] mt-3 sm:mt-4 max-w-2xl mx-auto leading-relaxed font-normal">
              Experience world-class universities, paid co-op internships, safe multicultural cities, and post-graduation work opportunities in Canada with MasterVisa.
            </p>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <button
                type="button"
                onClick={scrollToUniversities}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#155EEF] hover:bg-[#104ECC] text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Explore Canadian Universities</span>
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
              src="/images/canada/canada-hero.jpg"
              alt="Toronto Waterfront & Skyline with CN Tower"
              className="w-full h-full object-cover animate-slow-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-4 left-6 right-6 sm:bottom-6 sm:left-8 sm:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase mb-1">
                  <Landmark className="w-3.5 h-3.5 text-blue-300" />
                  <span>Canada · Premier U15 & Co-op Campuses</span>
                </div>
                <h2 className="text-lg sm:text-2xl font-bold font-editorial text-white">
                  Innovation, Technology & Exceptional Quality of Life
                </h2>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="px-3 py-1.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 text-xs font-semibold text-white">
                  Up to 3-Yr PGWP
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-[#E63946] text-xs font-bold text-white shadow-md">
                  Paid Co-op
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: ANIMATED CANADIAN EDUCATION STATISTICS
          Responsive stats strip below hero with count-up animations
         ───────────────────────────────────────────────────────────── */}
      <section className="py-10 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={statsRef}
            className="bg-[#F5F8FF] rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-[0_12px_36px_rgba(21,94,239,0.06)]"
            aria-label="Canadian Higher Education Core Metrics"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#E2E8F0]">
              {/* Stat 1: 100+ Universities */}
              <div className="pt-2 sm:pt-0 sm:px-6 first:pl-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-2 rounded-xl bg-[#EAF2FF] text-[#155EEF]">
                    <Building2 className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                    Universities in Canada
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-editorial text-[#14213D] tracking-tight">
                  {statCounts.universities}+
                </div>
                <p className="text-xs text-[#475569] mt-1 font-medium">
                  Recognized public & research universities
                </p>
              </div>

              {/* Stat 2: 1M+ International Students */}
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
                  {statCounts.studentsMillion.toFixed(1)}M+
                </div>
                <p className="text-xs text-[#475569] mt-1 font-medium">
                  Active international study permit holders
                </p>
              </div>

              {/* Stat 3: Up to 3 Years PGWP */}
              <div className="pt-4 sm:pt-0 sm:px-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-2 rounded-xl bg-emerald-50 text-[#16A34A]">
                    <Clock className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                    Post-Graduation Work
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-editorial text-[#16A34A] tracking-tight">
                  Up to {statCounts.pgwpYears} Yrs
                </div>
                <p className="text-xs text-[#475569] mt-1 font-medium">
                  PGWP duration depends on study length*
                </p>
              </div>

              {/* Stat 4: $25/hr Average Co-op */}
              <div className="pt-4 sm:pt-0 sm:px-6 last:pr-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-2 rounded-xl bg-red-50 text-[#E63946]">
                    <Award className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                    Paid Co-op Earnings
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-editorial text-[#E63946] tracking-tight">
                  ${statCounts.coopCompensation} / hr
                </div>
                <p className="text-xs text-[#475569] mt-1 font-medium">
                  Typical student co-op compensation ($18–$32 CAD)
                </p>
              </div>
            </div>

            {/* Verified Footnote */}
            <div className="mt-6 pt-4 border-t border-[#E2E8F0] text-[11px] text-[#64748B] flex items-center justify-between flex-wrap gap-2">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#155EEF] shrink-0" />
                <span>*Source: Statistics Canada, IRCC, and Universities Canada. Work permit duration and eligibility depend on DLI status and program length.</span>
              </span>
              <span className="font-semibold text-[#155EEF]">Designated Learning Institution (DLI) Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: TOP UNIVERSITIES IN CANADA — 3D ORBIT SHOWCASE
          Toronto, UBC, McGill, Alberta, Waterloo
          Smooth auto-rotation, 3D perspective, authentic photography & crests
         ───────────────────────────────────────────────────────────── */}
      <section 
        ref={trackRef}
        className="relative bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFF] to-[#FFFFFF] text-[#14213D] pt-8 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-18 border-b border-[#E2E8F0] overflow-hidden"
      >
        {/* Ambient Orbit Path Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[360px] bg-gradient-to-r from-[#155EEF]/8 via-[#E63946]/5 to-[#155EEF]/8 rounded-full blur-[100px]" />

          <svg 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1240px] h-[520px] pointer-events-none overflow-visible select-none opacity-35" 
            viewBox="0 0 1240 520"
          >
            <defs>
              <linearGradient id="canadaOrbitGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#155EEF" stopOpacity="0.08" />
                <stop offset="50%" stopColor="#E63946" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#155EEF" stopOpacity="0.08" />
              </linearGradient>
            </defs>
            <ellipse cx="620" cy="260" rx="560" ry="175" fill="none" stroke="url(#canadaOrbitGlow)" strokeWidth="1.8" strokeDasharray="6 8" />
            <ellipse cx="620" cy="260" rx="430" ry="130" fill="none" stroke="#3B82F6" strokeOpacity="0.2" strokeWidth="1.2" strokeDasharray="4 6" />
            <circle cx="160" cy="260" r="4.5" fill="#E63946" opacity="0.6" className="animate-pulse" />
            <circle cx="1080" cy="260" r="4.5" fill="#155EEF" opacity="0.6" className="animate-pulse" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-widest shadow-sm mb-2.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#155EEF]" />
              <span>THE U15 & CANADIAN RESEARCH LEADERS</span>
            </div>

            <h2 className="font-editorial font-bold text-[#14213D] tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-tight">
              Explore the Best Universities <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#155EEF] via-[#E63946] to-[#E63946]">
                in Canada
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-[#475569] mt-2 max-w-xl mx-auto leading-relaxed">
              Discover top-ranked institutions, world-renowned faculty, and leading co-operative education programs across Canada.
            </p>

            {/* Orbit Status Indicator & Quick CTA */}
            <div className="mt-3 flex items-center justify-center gap-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-[#E2E8F0] text-xs font-semibold text-[#64748B] shadow-sm">
                <RotateCw className={`w-3.5 h-3.5 text-[#155EEF] ${!isHovered && !prefersReducedMotion ? 'animate-spin-slow' : ''}`} />
                <span>3D Orbit Mode · Auto Rotating</span>
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
            {/* Carousel Navigation Arrows */}
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
          SECTION 4: ANIMATED "WHY STUDY IN CANADA?" SECTION
          8 benefits with interactive selection & dynamic image preview
         ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-[#F5F8FF] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <Globe2 className="w-3.5 h-3.5" />
              <span>Educational & Career Advantages</span>
            </div>
            <h2 className="section-clamp-title font-editorial font-bold text-[#14213D] tracking-tight">
              Why Choose Canada for Higher Education?
            </h2>
            <p className="text-base sm:text-lg text-[#475569] mt-3 leading-relaxed">
              Explore why Canada is one of the world's most sought-after higher education destinations for ambitious international scholars.
            </p>
          </div>

          {/* Split-Screen Interactive Storytelling Component */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Interactive Benefit Cards */}
            <div className="lg:col-span-6 space-y-3 max-h-[640px] overflow-y-auto pr-1">
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
                    className={`p-5 rounded-2xl transition-all duration-300 cursor-pointer text-left border relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#155EEF] ${
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
                        <h3 className={`text-base sm:text-lg font-bold font-editorial ${
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

                    <p className="text-xs sm:text-sm text-[#475569] mt-1.5 leading-relaxed">
                      {benefit.shortDesc}
                    </p>

                    {/* Expanded description when selected */}
                    {isSelected && (
                      <div className="mt-3 pt-3 border-t border-[#E2E8F0] text-xs text-[#475569] leading-relaxed animate-fade-in">
                        {benefit.longDesc}
                        <div className="mt-2.5 flex items-center gap-2 font-bold text-xs text-[#155EEF]">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Key Metric: {benefit.stats}</span>
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
          SECTION 5: CANADIAN ADMISSIONS AND INTAKE TIMELINE
          Fall (Sept), Winter (Jan), Spring/Summer (May)
         ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#E2E8F0]" aria-label="Canadian Admission Intakes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <Calendar className="w-3.5 h-3.5" />
              <span>Academic Cycles & Application Windows</span>
            </div>
            <h2 className="section-clamp-title font-editorial font-bold text-[#14213D] tracking-tight">
              Canadian University Admission Intakes.
            </h2>
            <p className="text-base sm:text-lg text-[#475569] mt-3 leading-relaxed">
              Understand approximate application timelines, program availability, and provincial attestation deadlines across Canada.
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
                    <span>Plan My Application for {intakes[selectedIntake].season.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="mt-8 pt-4 border-t border-[#E2E8F0] text-[11px] text-[#64748B] flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-[#155EEF] shrink-0" />
              <span>Note: Program availability, application deadlines, and Provincial Attestation Letter (PAL) allocations vary by institution and province. Confirm specific program dates with an advisor.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: ENGLISH PROFICIENCY & ADMISSION REQUIREMENTS
          IELTS, PTE, TOEFL & Exemptions with accessible tabs
         ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-[#F5F8FF] border-b border-[#E2E8F0]" aria-label="English Proficiency Requirements">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Standardized Language Benchmarks</span>
            </div>
            <h2 className="section-clamp-title font-editorial font-bold text-[#14213D] tracking-tight">
              English Proficiency & Admission Standards.
            </h2>
            <p className="text-base sm:text-lg text-[#475569] mt-3 leading-relaxed">
              Understand indicative English test benchmarks accepted by Canadian DLIs and IRCC for Student Direct Stream (SDS) study permits.
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
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-[#155EEF] border border-blue-200 font-bold text-xs">
                    IELTS ACADEMIC
                  </span>
                  <span className="text-[11px] font-bold text-[#64748B]">9.0 Band Scale</span>
                </div>

                <div className="mt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Indicative Master’s Score</div>
                  <div className="text-4xl sm:text-5xl font-black font-editorial text-[#155EEF] mt-1">
                    6.5 Overall
                  </div>
                </div>

                <div className="mt-5 space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-[#475569]">
                    <span>Band Target</span>
                    <span>6.5 / 9.0 (Min 6.0 in components)</span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#155EEF] h-full rounded-full transition-all duration-500" style={{ width: '72%' }} />
                  </div>
                </div>

                <p className="text-xs text-[#475569] mt-5 leading-relaxed">
                  Recognized by 100% of Canadian Designated Learning Institutions (DLIs) and approved for Student Direct Stream (SDS) study permits.
                </p>

                {activeTestTab === 'ielts' && (
                  <div className="mt-4 pt-4 border-t border-blue-100 text-[11px] text-[#155EEF] font-semibold animate-fade-in">
                    ✓ Undergraduate standard: 6.0 overall (min 5.5). Postgraduate standard: 6.5 overall (min 6.0 in bands).
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#E2E8F0] text-[11px] text-[#64748B] flex items-center justify-between">
                <span><strong>Format:</strong> Computer / Paper-based</span>
                <span className="text-xs font-bold text-[#155EEF]">{activeTestTab === 'ielts' ? 'Selected' : 'Select'}</span>
              </div>
            </div>

            {/* 2. PTE ACADEMIC */}
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
                  <div className="text-xs font-bold uppercase tracking-wider text-[#64748B]">SDS Approved Score</div>
                  <div className="text-4xl sm:text-5xl font-black font-editorial text-purple-600 mt-1">
                    60+ Score
                  </div>
                </div>

                <div className="mt-5 space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-[#475569]">
                    <span>Proficiency Scale</span>
                    <span>60 / 90 (Min 60 across communicative skills)</span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full rounded-full transition-all duration-500" style={{ width: '68%' }} />
                  </div>
                </div>

                <p className="text-xs text-[#475569] mt-5 leading-relaxed">
                  Pearson PTE Academic is officially recognized by IRCC for SDS student visa applications with swift 48-hour automated score delivery.
                </p>

                {activeTestTab === 'pte' && (
                  <div className="mt-4 pt-4 border-t border-purple-100 text-[11px] text-purple-700 font-semibold animate-fade-in">
                    ✓ Fully accepted across top Ontario, British Columbia, and Alberta colleges & research universities.
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#E2E8F0] text-[11px] text-[#64748B] flex items-center justify-between">
                <span><strong>Format:</strong> AI-evaluated Computer Test</span>
                <span className="text-xs font-bold text-purple-600">{activeTestTab === 'pte' ? 'Selected' : 'Select'}</span>
              </div>
            </div>

            {/* 3. TOEFL iBT */}
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
                  <div className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Indicative Range</div>
                  <div className="text-4xl sm:text-5xl font-black font-editorial text-[#16A34A] mt-1">
                    88–100
                  </div>
                </div>

                <div className="mt-5 space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-[#475569]">
                    <span>Score Scale</span>
                    <span>88–100 / 120 (Min 20–22 per subscore)</span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#16A34A] h-full rounded-full transition-all duration-500" style={{ width: '80%' }} />
                  </div>
                </div>

                <p className="text-xs text-[#475569] mt-5 leading-relaxed">
                  Administered by ETS and widely recognized by Canadian graduate research faculties and professional business schools.
                </p>

                {activeTestTab === 'toefl' && (
                  <div className="mt-4 pt-4 border-t border-emerald-100 text-[11px] text-[#16A34A] font-semibold animate-fade-in">
                    ✓ Preferred by engineering faculties at Toronto, McGill, and UBC for graduate research fellowships.
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#E2E8F0] text-[11px] text-[#64748B] flex items-center justify-between">
                <span><strong>Format:</strong> Internet-delivered (iBT)</span>
                <span className="text-xs font-bold text-[#16A34A]">{activeTestTab === 'toefl' ? 'Selected' : 'Select'}</span>
              </div>
            </div>
          </div>

          {/* Sourced Disclaimer */}
          <div className="mt-12 bg-white border border-[#E2E8F0] rounded-2xl p-5 text-[#475569] text-xs flex items-start gap-3 shadow-sm">
            <Info className="w-5 h-5 text-[#155EEF] shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-[#14213D]">Advisory Guidance:</strong> Minimum test scores and course prerequisites vary by academic institution, degree level, and faculty. MasterVisa advisors evaluate your complete academic profile to ensure compliance with university and IRCC standards.
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 7: STUDY PERMITS, PAL & WORK OPPORTUNITIES (IRCC GUIDANCE)
         ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#E2E8F0]" aria-label="Canadian Study Permits & Work Rights">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#F8FAFF] via-white to-[#EAF2FF] rounded-3xl p-8 sm:p-12 border-2 border-[#155EEF]/20 shadow-[0_12px_36px_rgba(21,94,239,0.08)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-wider shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>IRCC IMMIGRATION & WORK REGULATIONS</span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-editorial text-[#14213D] tracking-tight">
                  Study Permits, Provincial Attestations & Post-Study Work.
                </h3>

                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  Navigating Canadian study permits requires compliance with current Immigration, Refugees and Citizenship Canada (IRCC) standards. University admission is distinct from visa issuance, which is determined by Canadian immigration authorities.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm">
                    <div className="flex items-center gap-2 font-bold text-sm text-[#14213D]">
                      <FileCheck2 className="w-4 h-4 text-[#155EEF]" />
                      <span>Provincial Attestation Letter (PAL)</span>
                    </div>
                    <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                      Most post-secondary applicants require a Provincial Attestation Letter (PAL) issued through their DLI under annual provincial study caps.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm">
                    <div className="flex items-center gap-2 font-bold text-sm text-[#14213D]">
                      <Clock className="w-4 h-4 text-[#16A34A]" />
                      <span>24 Hours / Week Off-Campus Work</span>
                    </div>
                    <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                      Eligible full-time students can work up to 24 hours per week off-campus during academic sessions and full-time during breaks.
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleOpenConsultation}
                    className="px-6 py-3 rounded-xl bg-[#155EEF] hover:bg-[#104ECC] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                  >
                    <span>Speak to an Advisor</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEligibilityOpen(true)}
                    className="px-5 py-3 rounded-xl bg-white hover:bg-[#F5F8FF] text-[#155EEF] border border-[#CBD5E1] font-bold text-xs transition-colors"
                  >
                    Check Study Permit Eligibility
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center">
                <div className="p-6 rounded-3xl bg-white border border-[#B9D5FF] shadow-lg text-center w-full max-w-sm space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#E63946] mx-auto flex items-center justify-center">
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-3xl font-black font-editorial text-[#14213D]">Up to 3 Yrs</div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#155EEF] mt-0.5">Post-Graduation Work Permit (PGWP)</div>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Available to graduates of eligible programs at Canadian Designated Learning Institutions per official IRCC criteria.
                  </p>
                  <div className="pt-3 border-t border-[#E2E8F0] text-[11px] font-bold text-emerald-600">
                    ✓ Open work permit with no specific employer tie
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 8: SCHOLARSHIPS IN CANADA — INTERACTIVE GUIDE
          Interactive step-by-step application tracker with progress
         ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-[#F5F8FF] border-b border-[#E2E8F0]" aria-label="Canadian Scholarships Guide">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
                <Award className="w-3.5 h-3.5" />
                <span>Financial Aid & Merit Awards</span>
              </div>
              <h2 className="section-clamp-title font-editorial font-bold text-[#14213D] tracking-tight">
                Scholarships in Canada: Interactive Guide.
              </h2>
              <p className="text-base sm:text-lg text-[#475569] mt-2 leading-relaxed max-w-2xl">
                Explore Canadian entrance scholarships, provincial graduate awards, and funding milestones through this verified step-by-step roadmap.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm shrink-0 min-w-[240px]">
              <div className="flex items-center justify-between text-xs font-bold text-[#14213D] mb-1.5">
                <span>Scholarship Roadmap</span>
                <span className="text-[#155EEF]">{totalScholarshipDone} of 6 steps tracked</span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#155EEF] h-full rounded-full transition-all duration-300"
                  style={{ width: `${(totalScholarshipDone / 6) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scholarshipSteps.map((step, idx) => {
              const isDone = completedScholarshipSteps[idx];
              return (
                <div
                  key={step.number}
                  onClick={() => toggleScholarshipStep(idx)}
                  className={`p-6 rounded-3xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                    isDone
                      ? 'bg-white border-[#155EEF] ring-1 ring-blue-500/20 shadow-sm'
                      : 'bg-white/80 hover:bg-white border-[#E2E8F0] shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-[#155EEF]">STEP {step.number}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleScholarshipStep(idx);
                        }}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isDone ? 'bg-emerald-50 text-[#16A34A]' : 'bg-[#F5F8FF] text-slate-400'
                        }`}
                        aria-label={`Mark step ${step.number} as completed`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                      </button>
                    </div>

                    <h3 className="text-base font-bold font-editorial text-[#14213D] leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-xs text-[#475569] mt-2 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#E2E8F0] text-[11px] font-semibold text-[#155EEF]">
                    {isDone ? '✓ Milestone Tracked' : 'Click to mark complete'}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 p-4 rounded-2xl bg-white border border-[#E2E8F0] text-xs text-[#475569] flex items-center justify-between flex-wrap gap-2 shadow-xs">
            <span>Scholarship awards and criteria depend on individual institutional endowments and are not guaranteed by MasterVisa.</span>
            <button
              type="button"
              onClick={handleOpenConsultation}
              className="text-xs font-bold text-[#155EEF] hover:underline"
            >
              Discuss Canadian Scholarship Opportunities →
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 9: INTERACTIVE APPLICATION READINESS CHECKLIST
          6 stages with derived percentage and eligibility trigger
         ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#E2E8F0]" aria-label="Application Preparation Checklist">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
                <CheckSquare className="w-3.5 h-3.5" />
                <span>Canadian Applicant Roadmap</span>
              </div>
              <h2 className="section-clamp-title font-editorial font-bold text-[#14213D] tracking-tight">
                Prepare Smarter. Apply with Confidence.
              </h2>
              <p className="text-base sm:text-lg text-[#475569] mt-2 leading-relaxed max-w-2xl">
                Follow this six-stage admissions roadmap to organize your dossier and navigate Canadian DLI applications seamlessly.
              </p>
            </div>

            <div className="bg-[#F5F8FF] rounded-2xl p-4 border border-[#E2E8F0] shadow-sm shrink-0 min-w-[240px]">
              <div className="flex items-center justify-between text-xs font-bold text-[#14213D] mb-1.5">
                <span>Readiness Score</span>
                <span className="text-[#155EEF]">{readinessPercent}% Complete</span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#155EEF] h-full rounded-full transition-all duration-300"
                  style={{ width: `${readinessPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {prepStages.map((stage, idx) => {
              const isDone = completedReadiness[idx];
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
                        onClick={() => toggleReadiness(idx)}
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
          SECTION 10: HIGH-CONVERSION FINAL CTA BANNER & CONCLUSION
         ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-[#F5F8FF] relative overflow-hidden border-b border-[#E2E8F0]" aria-label="Book a Consultation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#EAF2FF] via-[#F5F8FF] to-white rounded-3xl p-8 sm:p-12 lg:p-16 border-2 border-[#155EEF]/20 shadow-[0_12px_36px_rgba(15,23,42,0.08)] text-[#14213D] relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start Your Overseas Education Chapter</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-[#14213D] tracking-tight leading-tight">
                  Your Future in Canada Is Waiting. <br />
                  <span className="text-[#155EEF]">Let’s Plan It Together.</span>
                </h2>

                <p className="text-base sm:text-lg text-[#475569] max-w-2xl leading-relaxed">
                  Take the next step toward studying in Canada. Explore DLI programs, verify Provincial Attestation Letter requirements, and plan your overseas education journey with MasterVisa.
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={handleOpenConsultation}
                    className="px-7 py-4 rounded-2xl bg-[#155EEF] hover:bg-[#104ECC] text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 group"
                  >
                    <span>Book a Canada Consultation</span>
                    <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsEligibilityOpen(true)}
                    className="px-6 py-4 rounded-2xl bg-white hover:bg-[#EAF2FF] text-[#155EEF] border border-[#CBD5E1] font-bold text-sm sm:text-base shadow-sm transition-all flex items-center gap-2"
                  >
                    <span>Check Canada Eligibility</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="pt-6 border-t border-[#E2E8F0] text-[11px] text-[#64748B]">
                  MasterVisa provides authorized educational guidance and advisory profile consulting. We do not guarantee visa approvals or university acceptances, which remain subject to official university and IRCC determinations.
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-[#E2E8F0] p-4 flex items-center justify-center bg-white shadow-md animate-float-slow">
                  <div className="w-full h-full rounded-full border border-dashed border-[#E63946]/30 flex items-center justify-center p-6 text-center">
                    <div>
                      <Plane className="w-10 h-10 text-[#E63946] mx-auto mb-2 transform -rotate-45" />
                      <div className="text-xl font-black font-editorial text-[#14213D]">CANADA 2026/27</div>
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
          SECTION 11: CONCLUSION & QUICK LINKS
         ───────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white" aria-label="Conclusion">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-[#14213D] tracking-tight">
            Make Your Next Educational Chapter Count.
          </h3>
          <p className="text-sm sm:text-base text-[#475569] mt-4 leading-relaxed font-normal">
            A Canadian degree confers globally respected academic prestige, practical co-op work experience, and internationally recognized credentials. Connect with our dedicated Canada counselors to find your ideal program and institution.
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
            <Link to="/destinations/united-kingdom" className="hover:text-[#155EEF] transition-colors">
              Study in UK →
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
          aria-labelledby="canada-programs-modal-title"
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
                  {selectedUniForPrograms.rankBadge} Featured Canadian DLI
                </span>
                <h3 id="canada-programs-modal-title" className="text-xl sm:text-2xl font-bold font-editorial mt-1 leading-tight text-white">
                  {selectedUniForPrograms.name}
                </h3>
                <p className="text-xs text-blue-100 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{selectedUniForPrograms.location} ({selectedUniForPrograms.province})</span>
                </p>
              </div>
            </div>

            {/* Modal Body: Popular Programs */}
            <div className="p-6 sm:p-8 space-y-5 max-h-[60vh] overflow-y-auto">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-3">
                  Featured Academic & Co-op Programs
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
                          {prog.coop && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-[#16A34A] border border-emerald-200">
                              Paid Co-op
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
                        <span className="text-[10px] text-[#64748B]">Indicative Tuition (CAD)</span>
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
          INTERACTIVE CANADA ELIGIBILITY MODAL
         ───────────────────────────────────────────────────────────── */}
      <CanadaEligibilityModal
        isOpen={isEligibilityOpen}
        onClose={() => setIsEligibilityOpen(false)}
        onProceedConsultation={(_data) => {
          setIsEligibilityOpen(false);
          if (onOpenCounselling) {
            onOpenCounselling('Canada');
          }
        }}
      />
    </div>
  );
};

export default StudyInCanadaPage;
