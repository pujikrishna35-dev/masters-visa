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
  Coins
} from 'lucide-react';
import { EuropeEligibilityModal } from '../components/EuropeEligibilityModal';
import { UniversityLogo } from '../components/UniversityLogo';
import { DestinationNavBar } from '../components/DestinationNavBar';

interface StudyInEuropePageProps {
  onOpenCounselling?: (destination?: string) => void;
}

interface UniversityItem {
  id: string;
  name: string;
  country: string;
  location: string;
  rankBadge: string;
  rankingSource: string;
  logoType: 'tum' | 'sorbonne' | 'tudelft' | 'trinity' | 'kth' | 'polimi';
  categories: string[];
  shortDesc: string;
  image: string;
  tags: string[];
  programs: Array<{
    name: string;
    level: string;
    duration: string;
    postStudyEligible: boolean;
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
    id: 'tum',
    name: 'Technical University of Munich (TUM)',
    country: 'Germany',
    location: 'Munich, Bavaria, Germany',
    rankBadge: '#28 Global',
    rankingSource: 'QS World University Rankings 2025 • #1 in Germany',
    logoType: 'tum',
    categories: ['all', 'engineering', 'cs', 'business', 'medicine'],
    shortDesc: 'Germany’s premier University of Excellence, revered worldwide for technological innovation, enterprise startup spin-offs, and Nobel laureates.',
    image: '/images/europe/tum.jpg',
    tags: ['Data Engineering', 'Robotics & AI', 'Automotive & Aerospace', 'Management & Tech'],
    programs: [
      { name: 'MSc in Data Engineering & Analytics', level: "Master's", duration: '2 Years', postStudyEligible: true, tuition: '€0 – €6,000 / yr (Varies by course)' },
      { name: 'MSc in Mechanical Engineering', level: "Master's", duration: '2 Years', postStudyEligible: true, tuition: '€0 – €4,000 / yr + semester fee' },
      { name: 'Master in Management & Technology (TUM-BWL)', level: "Master's", duration: '2 Years', postStudyEligible: true, tuition: '€0 – €6,000 / yr' },
      { name: 'MSc in Biomedical Computing', level: "Master's", duration: '2 Years', postStudyEligible: true, tuition: '€0 – €4,000 / yr' },
    ],
  },
  {
    id: 'sorbonne',
    name: 'Sorbonne University / HEC Paris',
    country: 'France',
    location: 'Paris, Île-de-France, France',
    rankBadge: '#1 in Europe',
    rankingSource: 'FT European Business Rankings / QS World Top 60',
    logoType: 'sorbonne',
    categories: ['all', 'business', 'arts', 'cs', 'law', 'medicine'],
    shortDesc: 'Combines the historic intellectual heritage of the Latin Quarter with Europe’s foremost business and management Grand École elite training.',
    image: '/images/europe/sorbonne.jpg',
    tags: ['Grand École MiM', 'Artificial Intelligence', 'Luxury Brand Management', 'Mathematics'],
    programs: [
      { name: 'Master in Management (Grande École - HEC)', level: "Master's", duration: '2 Years', postStudyEligible: true, tuition: '€24,500 / yr (Subsidies available)' },
      { name: 'MSc in Computer Science (Sorbonne)', level: "Master's", duration: '2 Years', postStudyEligible: true, tuition: '€243 / yr (National public fee)' },
      { name: 'MSc in International Finance (HEC Paris)', level: "Master's", duration: '1 Year', postStudyEligible: true, tuition: '€39,500 total' },
      { name: 'Master in Data Science & Society (Sorbonne)', level: "Master's", duration: '2 Years', postStudyEligible: true, tuition: '€243 / yr (National public fee)' },
    ],
  },
  {
    id: 'tudelft',
    name: 'Delft University of Technology (TU Delft)',
    country: 'Netherlands',
    location: 'Delft, South Holland, Netherlands',
    rankBadge: '#49 Global',
    rankingSource: 'QS World University Rankings 2025 • Top 3 EU Tech',
    logoType: 'tudelft',
    categories: ['all', 'engineering', 'cs', 'arts'],
    shortDesc: 'The largest and oldest public technical university in the Netherlands, globally acclaimed for aerospace engineering, water resource management, and quantum computing.',
    image: '/images/europe/tudelft.jpg',
    tags: ['Aerospace Engineering', 'Computer Science', 'Sustainable Energy', 'Quantum Tech'],
    programs: [
      { name: 'MSc in Computer Science (AI & Data)', level: "Master's", duration: '2 Years', postStudyEligible: true, tuition: '€21,500 / yr' },
      { name: 'MSc in Aerospace Engineering', level: "Master's", duration: '2 Years', postStudyEligible: true, tuition: '€21,500 / yr' },
      { name: 'MSc in Sustainable Energy Technology', level: "Master's", duration: '2 Years', postStudyEligible: true, tuition: '€21,500 / yr' },
      { name: 'BSc in Computer Science & Engineering', level: "Bachelor's", duration: '3 Years', postStudyEligible: true, tuition: '€16,000 / yr' },
    ],
  },
  {
    id: 'trinity',
    name: 'Trinity College Dublin',
    country: 'Ireland',
    location: 'Dublin, Leinster, Ireland',
    rankBadge: '#87 Global',
    rankingSource: 'QS World University Rankings 2025 • #1 in Ireland',
    logoType: 'trinity',
    categories: ['all', 'engineering', 'cs', 'business', 'medicine', 'law', 'arts'],
    shortDesc: 'Ireland’s historic premier university located in Dublin’s Silicon Docks, surrounded by European headquarters for Google, Meta, Pfizer, and Stripe.',
    image: '/images/europe/trinity.jpg',
    tags: ['FinTech & Finance', 'Computer Science', 'Immunology & Pharma', 'Intellectual Property'],
    programs: [
      { name: 'MSc in Computer Science (Data Science / AI)', level: "Master's", duration: '1 Year', postStudyEligible: true, tuition: '€25,800 / yr' },
      { name: 'MSc in Finance & Quantitative Investing', level: "Master's", duration: '1 Year', postStudyEligible: true, tuition: '€26,500 / yr' },
      { name: 'MSc in Pharmaceutical Sciences', level: "Master's", duration: '1 Year', postStudyEligible: true, tuition: '€20,500 / yr' },
      { name: 'Bachelor in Business & Economics (BESS)', level: "Bachelor's", duration: '4 Years', postStudyEligible: true, tuition: '€20,600 / yr' },
    ],
  },
  {
    id: 'kth',
    name: 'KTH Royal Institute of Technology',
    country: 'Sweden',
    location: 'Stockholm, Sweden',
    rankBadge: '#73 Global',
    rankingSource: 'QS World University Rankings 2025 • #1 in Sweden',
    logoType: 'kth',
    categories: ['all', 'engineering', 'cs', 'arts'],
    shortDesc: 'Sweden’s largest technical research powerhouse, leading Scandinavian innovation in green tech, machine learning, and clean telecommunications.',
    image: '/images/europe/kth.jpg',
    tags: ['Machine Learning', 'Software Engineering', 'Sustainable Energy', 'Electrification'],
    programs: [
      { name: 'MSc in Machine Learning', level: "Master's", duration: '2 Years', postStudyEligible: true, tuition: 'SEK 310,000 (~€27,000 total)' },
      { name: 'MSc in Software Engineering of Distributed Systems', level: "Master's", duration: '2 Years', postStudyEligible: true, tuition: 'SEK 310,000 (~€27,000 total)' },
      { name: 'MSc in Industrial Management & Innovation', level: "Master's", duration: '2 Years', postStudyEligible: true, tuition: 'SEK 310,000 (~€27,000 total)' },
      { name: 'MSc in Sustainable Energy Engineering', level: "Master's", duration: '2 Years', postStudyEligible: true, tuition: 'SEK 310,000 (~€27,000 total)' },
    ],
  },
  {
    id: 'polimi',
    name: 'Politecnico di Milano',
    country: 'Italy',
    location: 'Milan, Lombardy, Italy',
    rankBadge: '#111 Global',
    rankingSource: 'QS World Rankings 2025 • #7 World in Design & Engineering',
    logoType: 'polimi',
    categories: ['all', 'engineering', 'cs', 'arts'],
    shortDesc: 'Italy’s greatest scientific-technological university, internationally recognized for design, mechanical engineering, industrial robotics, and high affordability.',
    image: '/images/europe/polimi.jpg',
    tags: ['Design & Architecture', 'Mechanical Engineering', 'Computer Science', 'Management Eng.'],
    programs: [
      { name: 'MSc in Computer Science and Engineering', level: "Master's", duration: '2 Years', postStudyEligible: true, tuition: '€3,900 / yr (Standard public max fee)' },
      { name: 'MSc in Mechanical Engineering', level: "Master's", duration: '2 Years', postStudyEligible: true, tuition: '€3,900 / yr (Regional waivers avail.)' },
      { name: 'MSc in Management Engineering', level: "Master's", duration: '2 Years', postStudyEligible: true, tuition: '€3,900 / yr' },
      { name: 'MSc in Integrated Product Design', level: "Master's", duration: '2 Years', postStudyEligible: true, tuition: '€3,900 / yr' },
    ],
  },
];

export const StudyInEuropePage: React.FC<StudyInEuropePageProps> = ({ onOpenCounselling }) => {
  // Modal States
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const [selectedUniForPrograms, setSelectedUniForPrograms] = useState<UniversityItem | null>(null);

  // 1. Showcase States: Category Filter & 3D University Orbit
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeUniIndex, setActiveUniIndex] = useState<number>(0); // Default to TUM as featured center
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
    schengen: 0,
    studentsMillion: 0,
    freeTuitionUnis: 0,
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
              universities: Math.floor(ease * 4000),
              schengen: Math.floor(ease * 29),
              studentsMillion: Number((ease * 1.5).toFixed(1)),
              freeTuitionUnis: Math.floor(ease * 100),
            });

            if (progress < 1) {
              requestAnimationFrame(animateCounts);
            } else {
              setStatCounts({
                universities: 4000,
                schengen: 29,
                studentsMillion: 1.5,
                freeTuitionUnis: 100,
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
      id: 'academic',
      index: '01',
      title: 'Diverse Academic Opportunities',
      shortDesc: 'Undergraduate, postgraduate, and doctoral degrees across engineering, business, and humanities.',
      longDesc:
        'European higher education spans over 4,000 accredited universities, technical institutes (TU9), and elite Grandes Écoles. Curricula are strictly anchored to the European Higher Education Area (Bologna Process with ECTS credits), ensuring seamless international qualification recognition.',
      accent: '#155EEF',
      badge: 'Bologna ECTS System',
      stats: '4,000+ Higher Ed Institutions',
      image: '/images/europe/tum.jpg',
    },
    {
      id: 'language',
      index: '02',
      title: 'English-Taught & Language Options',
      shortDesc: 'Thousands of programs taught 100% in English across Germany, Netherlands, France, and Nordics.',
      longDesc:
        'While local language skills enrich your social immersion, over 15,000 Bachelor’s and Master’s programs across mainland Europe are delivered entirely in English. Language requirements are set individually per course, and many institutions offer free concurrent language classes.',
      accent: '#16A34A',
      badge: '100% English Taught',
      stats: '15,000+ English Degrees',
      image: '/images/europe/tudelft.jpg',
    },
    {
      id: 'work-rights',
      index: '03',
      title: 'Country-Specific Student Work Rights',
      shortDesc: 'Work opportunities in accordance with national immigration regulations and study permits.',
      longDesc:
        'Student employment permissions vary by country: Germany permits 140 full days (or 280 half days) annually; France permits 964 hours per year (approx. 60% of legal working time); Ireland permits 20 hours per week during term time and 40 hours during holidays. Conditions depend on valid residence status.',
      accent: '#3B82F6',
      badge: 'Part-Time Work Permitted',
      stats: 'Verified National Limits',
      image: '/images/europe/trinity.jpg',
    },
    {
      id: 'culture-travel',
      index: '04',
      title: 'Cultural Diversity & Schengen Mobility',
      shortDesc: 'Multicultural lifestyle, historic campuses, and convenient transport networks across 29 Schengen states.',
      longDesc:
        'Living in Europe combines timeless cultural heritage with safe, bike-friendly infrastructure and high standard of living. Holding a student residence permit in a Schengen country allows short-term travel across 29 member states in accordance with Schengen border rules and passport nationality.',
      accent: '#8B5CF6',
      badge: '29 Schengen Countries',
      stats: 'High Liveability Standards',
      image: '/images/europe/europe-culture.jpg',
    },
  ];

  // 4. European Country Spotlights (Interactive selector)
  const [selectedCountryTab, setSelectedCountryTab] = useState<number>(0);
  const countrySpotlights = [
    {
      id: 'germany',
      country: 'Germany',
      flag: '🇩🇪',
      tuition: '€0 – Low Tuition (€150–€350/sem contribution)',
      livingCost: '€992 / month (€11,904/yr Sperrkonto blocked account)',
      visa: 'National Visa (Type D) & Student Residence Permit (Aufenthaltserlaubnis § 16b)',
      workRights: '140 full days or 280 half days per calendar year',
      postStudy: '18-month Jobseeker Residence Permit (§ 20 AufenthG)',
      officialLink: 'https://www.study-in-germany.de/',
      summary: 'Renowned for tuition-free public universities, world-class automotive/engineering R&D, and the EU’s largest national economy.',
    },
    {
      id: 'france',
      country: 'France',
      flag: '🇫🇷',
      tuition: 'Public: €243 (Master) / €175 (Bachelor); Grandes Écoles: €12k–€25k/yr',
      livingCost: '€615 – €900 / month (Paris higher; CAF housing subsidy available)',
      visa: 'VLS-TS (Long-Stay Visa equivalent to Residence Permit)',
      workRights: 'Up to 964 hours per year (~60% of annual working time)',
      postStudy: '2-Year APS / RECE Post-Study Visa for eligible Master’s graduates',
      officialLink: 'https://www.campusfrance.org/',
      summary: 'Home to Europe’s premier business schools, luxury powerhouses, Airbus aerospace hubs, and French government CAF housing allowances.',
    },
    {
      id: 'ireland',
      country: 'Ireland',
      flag: '🇮🇪',
      tuition: '€10,000 – €26,000 / yr (Varies by discipline and institution)',
      livingCost: '€10,000 / yr demonstrated proof of maintenance (€12k+ in Dublin)',
      visa: 'Irish Stamp 2 Student Visa',
      workRights: '20 hours/week during term-time; 40 hours/week during scheduled holidays',
      postStudy: '24 Months under Third Level Graduate Scheme (Stamp 1G)',
      officialLink: 'https://www.educationinireland.com/',
      summary: 'The sole native English-speaking EU member state and European tech headquarters for Google, Apple, Meta, Stripe, and Pfizer.',
    },
    {
      id: 'netherlands',
      country: 'Netherlands',
      flag: '🇳🇱',
      tuition: '€10,000 – €22,000 / yr for non-EEA students at research universities',
      livingCost: '€1,218 / month (~€14,616/yr IND financial benchmark requirement)',
      visa: 'VVR Residence Permit (Applied via University Sponsor to IND)',
      workRights: 'Up to 16 hours/week (requires employer work permit / TWV)',
      postStudy: '1-Year Orientation Year (Zoekjaar) work permit for graduates',
      officialLink: 'https://www.studyinnl.org/',
      summary: 'Over 2,100 English-taught programs, world-renowned cycling cities, and direct corporate pipelines in ASML, Philips, and Shell.',
    },
    {
      id: 'sweden',
      country: 'Sweden',
      flag: '🇸🇪',
      tuition: 'SEK 90,000 – 170,000 / yr (~€8,000 – €15,000 / yr non-EU)',
      livingCost: 'SEK 10,314 / month (Swedish Migration Agency requirement)',
      visa: 'Residence Permit for Higher Education (Uppehållstillstånd för studier)',
      workRights: 'No statutory hourly limit provided academic progress is sustained',
      postStudy: '12-Month Post-Study Job Search Residence Permit',
      officialLink: 'https://studyinsweden.se/',
      summary: 'Global leader in sustainable energy, telecom (Ericsson), music tech (Spotify), and autonomous vehicle innovation.',
    },
    {
      id: 'italy',
      country: 'Italy',
      flag: '🇮🇪',
      tuition: 'Public: €1,000 – €4,000 / yr (Based on family ISEE income assessment)',
      livingCost: '€700 – €1,000 / month (Regional variations between North and South)',
      visa: 'National Visa Type D (Studio) followed by Permesso di Soggiorno',
      workRights: 'Up to 20 hours/week (max 1,040 hours per year)',
      postStudy: '12-Month Permesso di Soggiorno per Ricerca Lavoro',
      officialLink: 'https://www.universitaly.it/',
      summary: 'Home to Europe’s oldest universities, world #1 design & architecture programs, and generous DSU regional welfare grants.',
    },
  ];

  // 5. European Admission Intakes
  const [selectedIntake, setSelectedIntake] = useState<number>(0);
  const intakes = [
    {
      id: 'winter',
      season: 'WINTER / AUTUMN INTAKE',
      months: 'September / October',
      cycle: 'Primary Academic Intake',
      accent: '#155EEF',
      headline: 'The Flagship Academic Cycle with Full Degree & Public Funding Offerings',
      desc: 'The winter intake is the primary admission cycle across mainland Europe, offering 100% of Bachelor’s, Master’s, and PhD programs.',
      highlights: [
        'Complete catalogue of English-taught engineering, computing, business, and science degrees.',
        'Primary application window for DAAD, Erasmus+ EMJM, and university merit scholarships.',
        'Optimal integration with European student union orientation, accommodation allocations, and career days.',
        'Recommended application timeline: Apply between December and May (Uni-Assist / Direct Portals).',
      ],
      idealFor: 'Students seeking maximum university options, tuition-free public programs, and major European scholarships.',
      status: 'High Volume • Full Degree Catalogue',
    },
    {
      id: 'summer',
      season: 'SUMMER / SPRING INTAKE',
      months: 'March / April',
      cycle: 'Secondary Fast-Track Intake',
      accent: '#16A34A',
      headline: 'A Focused Mid-Year Gateway for Accelerated Degree Starts',
      desc: 'The summer semester provides entry for select Master’s degrees in Germany, Netherlands, and Scandinavian universities.',
      highlights: [
        'Ideal for applicants who completed summer bachelor’s degrees and needed extra time for language tests.',
        'Less crowded application pools allowing targeted academic committee evaluation.',
        'Smooth visa appointment availability at national European embassies during winter months.',
        'Recommended application timeline: Apply between August and November of prior year.',
      ],
      idealFor: 'Graduates aiming to avoid a gap year with targeted eligibility in computer science, business, or mechanics.',
      status: 'Selected Master’s Degrees • Focused Intake',
    },
    {
      id: 'foundation',
      season: 'STUDIENKOLLEG & PREPARATORY',
      months: 'Rolling & Pre-Semester',
      cycle: 'Bridging & Preparatory Intake',
      accent: '#3B82F6',
      headline: 'Academic Bridging, Studienkolleg & Intensive Language Pathways',
      desc: 'Specialized preparatory cohorts for students requiring 13th-year qualification bridging or German/French proficiency.',
      highlights: [
        'Prepares 12-year high school graduates for Feststellungsprüfung (FSP) to enter German public universities.',
        'Campus-based intensive language and scientific subject preparation.',
        'Direct matriculation into degree studies upon successful course completion.',
        'Recommended application timeline: Varies by regional Studienkolleg and university.',
      ],
      idealFor: 'Undergraduate candidates needing curriculum bridging or students entering language foundation tracks.',
      status: 'Preparatory Track • Institution Specific',
    },
  ];

  // 6. English Proficiency Tests
  const [activeTestTab, setActiveTestTab] = useState<'ielts' | 'pte' | 'toefl'>('ielts');

  // 7. Study Without IELTS Pathway Nodes
  const [selectedPathway, setSelectedPathway] = useState<number>(0);
  const pathways = [
    {
      id: 'moi-waiver',
      index: '01',
      title: 'Medium of Instruction (MOI)',
      summary: 'Institutional waiver based on completing an undergraduate degree taught entirely in English.',
      details:
        'Numerous progressive European universities in Germany, France, Ireland, and the Netherlands accept an official university-stamped Medium of Instruction (MOI) certificate confirming your 3 or 4-year Bachelor’s was conducted in English, waiving commercial IELTS requirements.',
      requirements: ['Official institutional MOI letter', 'Accredited undergraduate curriculum transcripts', 'Subject to departmental committee review'],
      badge: 'MOI Letter Pathway',
    },
    {
      id: 'conditional-admissions',
      index: '02',
      title: 'Preparatory Language Foundation',
      summary: 'Conditional admission paired with pre-academic language training on campus.',
      details:
        'Students seeking entry into bilingual or local-language programs can receive conditional admission, completing intensive German, French, or Italian language modules on campus before beginning their primary academic degree.',
      requirements: ['Conditional university admission letter', 'Enrolment in recognized language institute', 'Progression upon B2/C1 test passing'],
      badge: 'Language Bridge',
    },
    {
      id: 'internal-interviews',
      index: '03',
      title: 'Faculty Interview / Diagnostic Test',
      summary: 'Admissions committee video evaluation or internal diagnostic testing.',
      details:
        'Many European private and business institutions assess prospective international students directly via structured video admissions interviews and communicative case studies, evaluating English command without requiring external standardized scores.',
      requirements: ['Structured video faculty interview', 'Academic statement & analytical writing sample', 'Direct institutional offer issuance'],
      badge: 'Diagnostic Assessment',
    },
    {
      id: 'cambridge-cae',
      index: '04',
      title: 'Cambridge C1 / Duolingo Alternatives',
      summary: 'Alternative proficiency credentials accepted across European faculties.',
      details:
        'Cambridge C1 Advanced (CAE), Cambridge C2 Proficiency (CPE), and at select universities Duolingo English Test (DET) are accepted alongside classic IELTS and TOEFL benchmarks across the continent.',
      requirements: ['Cambridge C1 Advanced minimum 176–180', 'Accepted by leading EU universities', 'Lifelong validity for Cambridge awards'],
      badge: 'Alternative Testing',
    },
  ];

  // 8. Admission Preparation Checklist
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
      title: 'Choose Destination Country & Courses',
      summary: 'Select target European countries based on language of instruction, tuition costs, and career goals.',
      details: [
        'Shortlist target destinations (e.g., Germany for engineering, France for business, Ireland for tech).',
        'Verify course language of instruction (ensure 100% English-taught or review required language level).',
        'Compare public subsidized tuition fees versus private institution fees.',
        'Review specific course prerequisite subjects and ECTS credit matching requirements.',
      ],
    },
    {
      number: '02',
      title: 'Prepare Application Dossier & APS/Evaluations',
      summary: 'Compile transcripts, Statements of Purpose, APS certificates (for Germany), and verified credentials.',
      details: [
        'Secure academic transcripts, degree certificates, and syllabus module descriptions for credit checks.',
        'Obtain APS certificate for Germany (mandatory for Indian applicants prior to university/visa application).',
        'Craft an academically rigorous Statement of Purpose (SOP) tailored to European faculty research.',
        'Submit applications through national portals (Uni-Assist in Germany, Études en France, Studielink in Netherlands).',
      ],
    },
    {
      number: '03',
      title: 'Receive Admission & Arrange Financial Proof',
      summary: 'Accept your university offer, pay tuition deposits where required, and establish proof of living funds.',
      details: [
        'Receive official Zulassungsbescheid (Germany) or unconditional acceptance letter.',
        'Open a blocked bank account (Sperrkonto in Germany: €11,904/yr) or assemble national financial documentation.',
        'Apply for government, Erasmus+, or institutional scholarships before their respective deadlines.',
        'Secure statutory or private international student health insurance (e.g., TK, Barmer, or OSHC equivalent).',
      ],
    },
    {
      number: '04',
      title: 'National Student Visa & Schengen Residence Permit',
      summary: 'Lodge your National Long-Stay Visa (Type D) with the destination country’s embassy or consulate.',
      details: [
        'Book national visa appointment at VFS Global or destination embassy with complete documentation.',
        'Undergo visa credibility interview covering your study plans, background, and career intentions.',
        'Receive National Long-Stay Visa (Type D) granting legal entry and Schengen mobility.',
        'Register local residence (Anmeldung / Mairie) and convert visa into a Residence Permit upon arrival.',
      ],
    },
  ];

  const totalStepsCompleted = Object.values(completedSteps).filter(Boolean).length;

  const handleOpenConsultation = () => {
    if (onOpenCounselling) {
      onOpenCounselling('Europe');
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
      <DestinationNavBar activeCountry="europe" />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO SECTION — AN ANIMATED JOURNEY TO EUROPE
         ───────────────────────────────────────────────────────────── */}
      <section 
        className="relative bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFF] to-[#FFFFFF] text-[#14213D] pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-18 border-b border-[#E2E8F0] overflow-hidden"
      >
        {/* Ambient Decorative Lighting */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-gradient-to-r from-[#155EEF]/10 via-[#3B82F6]/8 to-[#155EEF]/10 rounded-full blur-[110px]" />
          <div className="absolute top-10 left-10 w-[350px] h-[350px] bg-[#155EEF]/5 rounded-full blur-[100px]" />
          <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-[#3B82F6]/6 rounded-full blur-[120px]" />

          {/* Dotted Flight Path with Animated Plane */}
          <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="flightGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#155EEF" stopOpacity="0.2" />
                <stop offset="60%" stopColor="#155EEF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <path
              d="M -40 280 C 260 140, 680 320, 1150 170 S 1700 240, 2200 90"
              fill="none"
              stroke="url(#flightGrad)"
              strokeWidth="2"
              strokeDasharray="6 8"
            />
          </svg>
          <div className="absolute top-36 left-[22%] opacity-80 animate-float-slow">
            <Plane className="w-6 h-6 text-[#155EEF] transform -rotate-45" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Breadcrumb strip */}
          <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
            <ol className="flex items-center gap-2 text-xs font-semibold text-[#64748B]">
              <li>
                <Link to="/" className="hover:text-[#155EEF] transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link to="/destinations" className="hover:text-[#155EEF] transition-colors">Destinations</Link>
              </li>
              <li>/</li>
              <li className="text-[#14213D] font-bold" aria-current="page">Study in Europe</li>
            </ol>
          </nav>

          {/* Hero Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading, Value Props, Actions */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-wider shadow-sm animate-fade-in">
                <span className="text-base leading-none">🇪🇺</span>
                <span>STUDY IN EUROPE · DESTINATION GUIDE</span>
              </div>

              {/* Main Editorial Heading */}
              <h1 className="font-editorial font-bold text-[#14213D] tracking-tight text-3xl xs:text-4xl sm:text-5xl lg:text-[54px] leading-[1.1] break-words">
                Study in Europe
              </h1>

              {/* Supporting Text */}
              <p className="text-sm sm:text-base lg:text-lg text-[#475569] leading-relaxed max-w-2xl font-normal">
                Explore international education opportunities across Europe, with diverse academic programs, multicultural experiences, research opportunities, and potential scholarship pathways.
              </p>

              {/* Dual Action CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 max-w-md sm:max-w-none">
                <button
                  type="button"
                  onClick={() => setIsEligibilityOpen(true)}
                  className="px-6 py-3.5 sm:px-7 sm:py-4 rounded-2xl bg-[#155EEF] hover:bg-[#104ECC] text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Check Your Eligibility</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={scrollToUniversities}
                  className="px-6 py-3.5 sm:px-7 sm:py-4 rounded-2xl bg-white hover:bg-[#F5F8FF] text-[#155EEF] border border-[#CBD5E1] font-bold text-sm sm:text-base shadow-sm hover:border-[#155EEF]/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4 text-[#155EEF]" />
                  <span>Explore European Universities</span>
                </button>
              </div>

              {/* Trust Indicator Strip */}
              <div className="pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#64748B]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>Tuition-Free & Low-Fee Public Universities</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>29 Schengen Countries Mobility</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>1 to 2 Years Post-Study Work</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual with Campus & Floating Badges */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-2xl bg-white aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="/images/europe/europe-hero.jpg"
                  alt="Historic European University and Architectural Landmark"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Floating Badge Bottom Left */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
                  <span className="px-3 py-1 rounded-full bg-[#155EEF] text-[10px] font-bold uppercase tracking-wider">
                    Schengen Higher Education Area
                  </span>
                  <div className="text-lg sm:text-xl font-bold font-editorial mt-1 text-white leading-tight">
                    World-Class Degrees. Global Career Mobility.
                  </div>
                  <p className="text-xs text-blue-100 mt-0.5">
                    Subsidized higher education across Germany, France, Ireland & Netherlands
                  </p>
                </div>
              </div>

              {/* Floating Stat Pill (Top-Right) */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 px-4 py-2 rounded-2xl bg-white shadow-xl border border-[#E2E8F0] flex items-center gap-2.5 animate-bounce-subtle">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center font-bold text-sm">
                  €
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#64748B]">Public Tuition</div>
                  <div className="text-xs font-black text-[#14213D]">€0 – Subsidized Fees</div>
                </div>
              </div>

              {/* Floating Stat Pill (Bottom-Left) */}
              <div className="hidden sm:flex absolute -bottom-4 -left-4 px-4 py-2 rounded-2xl bg-white shadow-xl border border-[#E2E8F0] items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#EAF2FF] text-[#155EEF] flex items-center justify-center font-bold text-sm">
                  🇪🇺
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#64748B]">Schengen Area</div>
                  <div className="text-xs font-black text-[#14213D]">29 Member States</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: EUROPEAN EDUCATION STATISTICS STRIP
         ───────────────────────────────────────────────────────────── */}
      <section className="py-12 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={statsRef}
            className="bg-[#F5F8FF] rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-[0_12px_36px_rgba(21,94,239,0.06)]"
            aria-label="Europe Higher Education Core Metrics"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#E2E8F0]">
              {/* Stat 1: 4,000+ */}
              <div className="pt-2 sm:pt-0 sm:px-6 first:pl-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-2 rounded-xl bg-[#EAF2FF] text-[#155EEF]">
                    <Building2 className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                    Universities in Europe
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-editorial text-[#14213D] tracking-tight">
                  {statCounts.universities.toLocaleString()}+
                </div>
                <p className="text-xs text-[#475569] mt-1 font-medium">
                  Institutions across the Bologna Higher Education Area
                </p>
              </div>

              {/* Stat 2: 29 Schengen */}
              <div className="pt-4 sm:pt-0 sm:px-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-2 rounded-xl bg-emerald-50 text-[#16A34A]">
                    <Globe2 className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                    Schengen Member States
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-editorial text-[#16A34A] tracking-tight">
                  {statCounts.schengen} Countries
                </div>
                <p className="text-xs text-[#475569] mt-1 font-medium">
                  Border-free travel for valid student residence holders
                </p>
              </div>

              {/* Stat 3: 1.5M+ */}
              <div className="pt-4 sm:pt-0 sm:px-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-2 rounded-xl bg-purple-50 text-[#8B5CF6]">
                    <GraduationCap className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                    International Students
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-editorial text-[#8B5CF6] tracking-tight">
                  {statCounts.studentsMillion.toFixed(1)}M+
                </div>
                <p className="text-xs text-[#475569] mt-1 font-medium">
                  Global scholars studying across European destinations
                </p>
              </div>

              {/* Stat 4: 100+ Free/Low Fee */}
              <div className="pt-4 sm:pt-0 sm:px-6 last:pr-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-2 rounded-xl bg-amber-50 text-[#F59E0B]">
                    <Coins className="w-4 h-4" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                    Tuition Affordability
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-editorial text-[#F59E0B] tracking-tight">
                  €0 – Low Fee
                </div>
                <p className="text-xs text-[#475569] mt-1 font-medium">
                  Public tuition models across Germany & EU polytechnics
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: 3D EUROPEAN UNIVERSITIES ORBIT SHOWCASE
         ───────────────────────────────────────────────────────────── */}
      <section 
        ref={trackRef}
        className="relative bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFF] to-[#FFFFFF] text-[#14213D] py-16 sm:py-20 lg:py-24 border-b border-[#E2E8F0] overflow-hidden"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-sm mb-2 sm:mb-2.5 animate-fade-in">
              <GraduationCap className="w-3.5 h-3.5 text-[#155EEF]" />
              <span>TOP EUROPEAN UNIVERSITIES</span>
            </div>

            <h2 className="font-editorial font-bold text-[#14213D] tracking-tight text-2xl xs:text-3xl sm:text-4xl lg:text-[44px] leading-tight max-w-2xl mx-auto break-words">
              Explore Europe’s Leading <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#155EEF] to-[#3B82F6]">
                Research & Technical Institutions
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-[#475569] mt-2 max-w-xl mx-auto leading-relaxed font-normal">
              Discover renowned technical universities, Grand Écoles, and historic research centers across Germany, France, Netherlands, Ireland, Sweden, and Italy.
            </p>

            {/* Orbit Status Indicator & CTAs */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 w-full max-w-xs sm:max-w-2xl mx-auto px-2">
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

          {/* 3D Orbit Stage */}
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
            {/* Desktop Navigation Arrows */}
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
                    className={`absolute top-1/2 left-1/2 w-[285px] sm:w-[320px] lg:w-[335px] rounded-3xl border flex flex-col justify-between overflow-hidden bg-white ${
                      isCenter
                        ? 'border-[#155EEF] ring-2 ring-[#155EEF]/20 cursor-default'
                        : 'border-[#E2E8F0] cursor-pointer hover:border-[#155EEF]/50'
                    }`}
                  >
                    {/* Top Campus Photograph */}
                    <div className="relative h-40 sm:h-44 lg:h-46 w-full overflow-hidden bg-slate-100 rounded-t-3xl">
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

                      {/* Favorite Button */}
                      <button
                        type="button"
                        onClick={(e) => toggleFavorite(uni.id, e)}
                        className="absolute top-3 right-3 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 backdrop-blur-md border border-[#E2E8F0] flex items-center justify-center shadow-sm hover:scale-110 transition-transform focus:outline-none"
                        aria-label="Save to favorites"
                      >
                        <Heart className={`w-3.5 h-3.5 transition-colors ${isFav ? 'fill-rose-500 text-rose-500' : 'text-[#64748B] hover:text-rose-500'}`} />
                      </button>

                      {/* Emblem Badge */}
                      <div className="absolute -bottom-2.5 left-4 sm:left-5 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white shadow-md border border-[#E2E8F0] p-1 flex items-center justify-center z-10 transition-transform hover:scale-105">
                        <UniversityLogo type={uni.logoType} className="w-full h-full" />
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="pt-4 p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white rounded-b-3xl">
                      <div>
                        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-[#155EEF] mb-1">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{uni.location}</span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold font-editorial text-[#14213D] leading-tight line-clamp-1">
                          {uni.name}
                        </h3>

                        <p className="text-[11px] sm:text-xs text-[#475569] mt-1.5 line-clamp-2 leading-relaxed">
                          {uni.shortDesc}
                        </p>

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
                            <span>View Programs & Fees</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSelectUniversity(idx)}
                            className="w-full py-2 px-3 rounded-xl font-semibold text-xs bg-[#F5F8FF] hover:bg-[#EAF2FF] text-[#155EEF] border border-[#E2E8F0] flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <span>Explore Institution</span>
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

          {/* Orbit Controls (Dots & Arrows) */}
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
          SECTION 4: WHY CHOOSE EUROPE? — INTERACTIVE STORYTELLING
         ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-[#F5F8FF] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <Globe2 className="w-3.5 h-3.5" />
              <span>Academic & Lifestyle Advantages</span>
            </div>
            <h2 className="section-clamp-title font-editorial font-bold text-[#14213D] tracking-tight">
              Why Study in Europe? Unrivaled Education & Cultural Richness.
            </h2>
            <p className="text-base sm:text-lg text-[#475569] mt-3 leading-relaxed">
              Explore international education opportunities across Europe, with diverse academic programs, multicultural experiences, research opportunities, and potential scholarship pathways.
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

                    {isSelected && (
                      <div className="mt-4 pt-4 border-t border-[#E2E8F0] text-xs text-[#475569] leading-relaxed animate-fade-in">
                        {benefit.longDesc}
                        <div className="mt-3 flex items-center gap-2 font-bold text-xs text-[#155EEF]">
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
          SECTION 5: COUNTRY-BY-COUNTRY GUIDE (INTERACTIVE SELECTOR)
         ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#E2E8F0]" aria-label="Country-Specific Guide">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <Compass className="w-3.5 h-3.5" />
              <span>Destination Country Profiles</span>
            </div>
            <h2 className="section-clamp-title font-editorial font-bold text-[#14213D] tracking-tight">
              Compare European Study Destinations.
            </h2>
            <p className="text-base sm:text-lg text-[#475569] mt-3 leading-relaxed">
              Tuition structures, visa rules, work rights, and post-study opportunities differ by country. Explore official verified guidelines for top European destinations.
            </p>
          </div>

          {/* Country Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8">
            {countrySpotlights.map((c, cIdx) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCountryTab(cIdx)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 shrink-0 transition-all border ${
                  selectedCountryTab === cIdx
                    ? 'bg-[#155EEF] text-white border-[#155EEF] shadow-md shadow-blue-500/25 scale-[1.02]'
                    : 'bg-[#F5F8FF] hover:bg-white text-[#475569] border-[#E2E8F0]'
                }`}
              >
                <span>{c.flag}</span>
                <span>{c.country}</span>
              </button>
            ))}
          </div>

          {/* Active Country Detail Card */}
          <div className="bg-[#F5F8FF] rounded-3xl p-6 sm:p-10 border border-[#E2E8F0] shadow-sm relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold text-[#155EEF] uppercase tracking-wider">
                  {countrySpotlights[selectedCountryTab].flag} Verified Destination Blueprint
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-[#14213D] mt-1">
                  Study in {countrySpotlights[selectedCountryTab].country}
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] mt-1">
                  {countrySpotlights[selectedCountryTab].summary}
                </p>
              </div>

              <a
                href={countrySpotlights[selectedCountryTab].officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white hover:bg-[#EAF2FF] border border-[#CBD5E1] text-[#155EEF] font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Official National Portal</span>
                <span className="text-xs">↗</span>
              </a>
            </div>

            {/* 4 Feature Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0]">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5 mb-1.5">
                  <Coins className="w-3.5 h-3.5 text-[#155EEF]" />
                  <span>Tuition Fee Policy</span>
                </div>
                <p className="text-xs font-bold text-[#14213D] leading-snug">
                  {countrySpotlights[selectedCountryTab].tuition}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0]">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5 mb-1.5">
                  <Coins className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Proof of Living Funds</span>
                </div>
                <p className="text-xs font-bold text-[#14213D] leading-snug">
                  {countrySpotlights[selectedCountryTab].livingCost}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0]">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5 mb-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                  <span>Student Work Rights</span>
                </div>
                <p className="text-xs font-bold text-[#14213D] leading-snug">
                  {countrySpotlights[selectedCountryTab].workRights}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0]">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5 mb-1.5">
                  <Clock className="w-3.5 h-3.5 text-purple-600" />
                  <span>Post-Graduation Stay-Back</span>
                </div>
                <p className="text-xs font-bold text-[#14213D] leading-snug">
                  {countrySpotlights[selectedCountryTab].postStudy}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#64748B]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#155EEF] shrink-0" />
                <span><strong>Visa Category:</strong> {countrySpotlights[selectedCountryTab].visa}</span>
              </div>
              <button
                type="button"
                onClick={handleOpenConsultation}
                className="text-xs font-bold text-[#155EEF] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Plan your application for {countrySpotlights[selectedCountryTab].country}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: EUROPEAN ADMISSION INTAKES — ACADEMIC TIMELINE
         ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-[#F5F8FF] border-b border-[#E2E8F0]" aria-label="European Admission Intakes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <Calendar className="w-3.5 h-3.5" />
              <span>Academic Calendar & Intakes</span>
            </div>
            <h2 className="section-clamp-title font-editorial font-bold text-[#14213D] tracking-tight">
              European Admission Intakes & Deadlines.
            </h2>
            <p className="text-base sm:text-lg text-[#475569] mt-3 leading-relaxed">
              European universities operate primarily on Winter (Autumn) and Summer (Spring) semesters. Availability and deadlines vary by institution and country.
            </p>
          </div>

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
                        : 'bg-white hover:bg-slate-50 border-[#E2E8F0] shadow-sm'
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

            {/* Active Intake Breakdown */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-[0_12px_36px_rgba(15,23,42,0.06)] border border-[#E2E8F0] relative overflow-hidden">
              <div 
                className="absolute top-0 left-0 right-0 h-2 transition-all duration-300"
                style={{ backgroundColor: intakes[selectedIntake].accent }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#64748B]">
                    <Clock className="w-4 h-4 text-[#155EEF]" />
                    <span>Intake Analysis & Timelines</span>
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-bold font-editorial text-[#14213D]">
                    {intakes[selectedIntake].headline}
                  </h4>
                  <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                    {intakes[selectedIntake].desc}
                  </p>

                  <div className="pt-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#14213D] mb-3">
                      Key Highlights & Submission Milestones
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

                <div className="lg:col-span-5 bg-[#F5F8FF] rounded-2xl p-6 border border-[#E2E8F0] space-y-5 shadow-sm">
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
                      <span>Shortlist European Universities</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#E2E8F0] text-[11px] text-[#64748B] flex items-center gap-2">
                <Info className="w-3.5 h-3.5 text-[#155EEF] shrink-0" />
                <span>Note: Individual application deadlines depend on the university, country portal (e.g. Uni-Assist, Studielink), and visa appointment wait times. Apply 6–8 months in advance.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 7: ENGLISH PROFICIENCY & LANGUAGE REQUIREMENTS
         ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#E2E8F0]" aria-label="English Proficiency Score Guide">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Language Benchmarks</span>
            </div>
            <h2 className="section-clamp-title font-editorial font-bold text-[#14213D] tracking-tight">
              English Proficiency for European Admissions.
            </h2>
            <p className="text-base sm:text-lg text-[#475569] mt-3 leading-relaxed">
              Understand standard English testing benchmarks accepted across European institutions. Specific requirements vary by institution and academic program.
            </p>
          </div>

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
                  <div className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Typical Score Range</div>
                  <div className="text-4xl sm:text-5xl font-black font-editorial text-[#155EEF] mt-1">
                    6.0 – 6.5
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
                  Universally recognized by 100% of English-taught programs in Germany, Netherlands, Ireland, Sweden, and France. Master’s degrees typically require 6.5 overall.
                </p>

                {activeTestTab === 'ielts' && (
                  <div className="mt-4 pt-4 border-t border-blue-100 text-[11px] text-[#155EEF] font-semibold animate-fade-in">
                    ✓ Recommended section bands: Minimum 6.0 in Reading, Listening, Speaking, and Writing.
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#E2E8F0] text-[11px] text-[#64748B] flex items-center justify-between">
                <span><strong>Format:</strong> Computer or Paper</span>
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
                  <div className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Typical Score Range</div>
                  <div className="text-4xl sm:text-5xl font-black font-editorial text-purple-600 mt-1">
                    58 – 65
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
                  Pearson PTE Academic is widely accepted by Irish, Dutch, German, and French universities, celebrated for fast 48-hour automated score turnarounds.
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
                  <div className="text-xs font-bold uppercase tracking-wider text-[#64748B]">Typical Score Range</div>
                  <div className="text-4xl sm:text-5xl font-black font-editorial text-[#16A34A] mt-1">
                    80 – 95
                  </div>
                </div>

                <div className="mt-5 space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-[#475569]">
                    <span>Proficiency Scale</span>
                    <span>80–95 / 120</span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#16A34A] h-full rounded-full transition-all duration-500" style={{ width: '78%' }} />
                  </div>
                </div>

                <p className="text-xs text-[#475569] mt-5 leading-relaxed">
                  Administered by ETS, TOEFL is standard across European technical universities (TU Delft, TUM, KTH) and business faculties.
                </p>

                {activeTestTab === 'toefl' && (
                  <div className="mt-4 pt-4 border-t border-emerald-100 text-[11px] text-[#16A34A] font-semibold animate-fade-in">
                    ✓ Recommended section scores: Minimum 20 in each sub-score.
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#E2E8F0] text-[11px] text-[#64748B] flex items-center justify-between">
                <span><strong>Format:</strong> 100% Internet-Delivered</span>
                <span className="text-xs font-bold text-[#16A34A]">{activeTestTab === 'toefl' ? 'Selected' : 'Select'}</span>
              </div>
            </div>
          </div>

          {/* Official Guidance Banner */}
          <div className="mt-12 bg-[#F5F8FF] border border-[#E2E8F0] rounded-2xl p-5 text-[#475569] text-xs flex items-start gap-3 shadow-sm">
            <Info className="w-5 h-5 text-[#155EEF] shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-[#14213D]">Advisory Guidance:</strong> Minimum score thresholds and waiver acceptance vary by country, faculty, and academic discipline. Check target university admissions guidelines before submitting test bookings.
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 8: STUDY IN EUROPE WITHOUT IELTS — ALTERNATIVE PATHWAYS
         ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white text-[#14213D] relative overflow-hidden border-b border-[#E2E8F0]" aria-label="Alternative Language Pathways">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <Compass className="w-3.5 h-3.5" />
              <span>Alternative Language Pathways</span>
            </div>
            <h2 className="section-clamp-title font-editorial font-bold text-[#14213D] tracking-tight">
              Study in Europe Without IELTS.
            </h2>
            <p className="text-base sm:text-lg text-[#475569] mt-3 leading-relaxed">
              Explore recognized alternative pathways to demonstrate English language competence at select European institutions.
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
          SECTION 9: SCHOLARSHIPS IN EUROPE — FINANCIAL GUIDE
         ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-[#F5F8FF] border-b border-[#E2E8F0]" aria-label="Scholarships in Europe">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#B9D5FF] text-[#155EEF] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <Award className="w-3.5 h-3.5" />
              <span>Financial Support & Grants</span>
            </div>
            <h2 className="section-clamp-title font-editorial font-bold text-[#14213D] tracking-tight">
              Scholarships in Europe
            </h2>
            <p className="text-base sm:text-lg text-[#475569] mt-3 leading-relaxed">
              Explore scholarship opportunities offered by European governments, universities, and international education programs. Eligibility, funding, and application procedures depend on the destination country and the specific scholarship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Erasmus+ Joint Master Degrees */}
            <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#155EEF] border border-blue-200 text-xs font-bold">
                    EUROPEAN UNION
                  </span>
                  <span className="text-[11px] font-bold text-emerald-600">Full Funding</span>
                </div>
                <h3 className="text-lg font-bold font-editorial text-[#14213D]">
                  Erasmus+ (EMJM) Scholarships
                </h3>
                <p className="text-xs text-[#475569] mt-2 leading-relaxed">
                  EU-funded Erasmus Mundus Joint Masters cover full tuition fees, international travel costs, and provide a monthly living allowance (~€1,400/mo) across 2 to 3 European universities.
                </p>
                <div className="mt-3 text-[11px] text-[#64748B]">
                  <strong>Eligibility:</strong> Open to international graduates globally; highly competitive academic merit selection.
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E8F0]">
                <a
                  href="https://erasmus-plus.ec.europa.eu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#155EEF] hover:underline flex items-center gap-1"
                >
                  <span>Official Erasmus+ Portal</span> ↗
                </a>
              </div>
            </div>

            {/* 2. DAAD Scholarships Germany */}
            <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#16A34A] border border-emerald-200 text-xs font-bold">
                    GERMAN GOVERNMENT
                  </span>
                  <span className="text-[11px] font-bold text-[#14213D]">€934 / Month</span>
                </div>
                <h3 className="text-lg font-bold font-editorial text-[#14213D]">
                  DAAD Scholarships (Germany)
                </h3>
                <p className="text-xs text-[#475569] mt-2 leading-relaxed">
                  German Academic Exchange Service grants provide postgraduate stipends (€934/month), health insurance coverage, and travel subsidies for eligible Master’s and doctoral scholars.
                </p>
                <div className="mt-3 text-[11px] text-[#64748B]">
                  <strong>Eligibility:</strong> Bachelor degree completed within last 6 years, strong academic record (some programs require 2 yrs experience).
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E8F0]">
                <a
                  href="https://www.daad.de/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#155EEF] hover:underline flex items-center gap-1"
                >
                  <span>Official DAAD Database</span> ↗
                </a>
              </div>
            </div>

            {/* 3. Eiffel Excellence Scholarship France */}
            <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold">
                    FRENCH GOVERNMENT
                  </span>
                  <span className="text-[11px] font-bold text-purple-700">€1,181 / Month</span>
                </div>
                <h3 className="text-lg font-bold font-editorial text-[#14213D]">
                  Eiffel Excellence Program
                </h3>
                <p className="text-xs text-[#475569] mt-2 leading-relaxed">
                  Established by the French Ministry for Europe and Foreign Affairs to attract top international candidates for Master’s (€1,181/mo) and PhD (€1,800/mo) programs.
                </p>
                <div className="mt-3 text-[11px] text-[#64748B]">
                  <strong>Eligibility:</strong> Candidates must be nominated by a participating French higher education institution.
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E8F0]">
                <a
                  href="https://www.campusfrance.org/en/eiffel-scholarship-program-of-excellence"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#155EEF] hover:underline flex items-center gap-1"
                >
                  <span>Campus France Eiffel Details</span> ↗
                </a>
              </div>
            </div>

            {/* 4. Government of Ireland (GOI-IES) */}
            <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold">
                    GOVERNMENT OF IRELAND
                  </span>
                  <span className="text-[11px] font-bold text-emerald-600">Full Waiver + €10k</span>
                </div>
                <h3 className="text-lg font-bold font-editorial text-[#14213D]">
                  GOI-IES Scholarship (Ireland)
                </h3>
                <p className="text-xs text-[#475569] mt-2 leading-relaxed">
                  Awarded by the Higher Education Authority (HEA) to 60 high-caliber international students, providing a full tuition fee waiver plus €10,000 stipend for one study year.
                </p>
                <div className="mt-3 text-[11px] text-[#64748B]">
                  <strong>Eligibility:</strong> Offer of admission from an eligible Irish higher education institution; stellar academic credentials.
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E8F0]">
                <a
                  href="https://hea.ie/funding-governance-performance/funding/student-finance/government-of-ireland-international-education-scholarships/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#155EEF] hover:underline flex items-center gap-1"
                >
                  <span>HEA Ireland Scholarship Portal</span> ↗
                </a>
              </div>
            </div>

            {/* 5. Swedish Institute (SI) Scholarships */}
            <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#155EEF] border border-blue-200 text-xs font-bold">
                    SWEDISH INSTITUTE
                  </span>
                  <span className="text-[11px] font-bold text-[#14213D]">Full Tuition + Living</span>
                </div>
                <h3 className="text-lg font-bold font-editorial text-[#14213D]">
                  SI Global Professionals
                </h3>
                <p className="text-xs text-[#475569] mt-2 leading-relaxed">
                  Full tuition fee coverage, monthly living grant (SEK 12,000/month), travel subsidy, and membership in the SI Network for Future Global Leaders.
                </p>
                <div className="mt-3 text-[11px] text-[#64748B]">
                  <strong>Eligibility:</strong> Open to qualifying nationalities with proven leadership and minimum 3,000 hours of work experience.
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E8F0]">
                <a
                  href="https://si.se/en/apply/scholarships/swedish-institute-scholarships-for-global-professionals/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#155EEF] hover:underline flex items-center gap-1"
                >
                  <span>Swedish Institute Portal</span> ↗
                </a>
              </div>
            </div>

            {/* 6. NL / Holland Scholarship */}
            <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200 text-xs font-bold">
                    DUTCH MINISTRY
                  </span>
                  <span className="text-[11px] font-bold text-orange-700">€5,000 Grant</span>
                </div>
                <h3 className="text-lg font-bold font-editorial text-[#14213D]">
                  NL Scholarship (Netherlands)
                </h3>
                <p className="text-xs text-[#475569] mt-2 leading-relaxed">
                  Financed by the Dutch Ministry of Education, Culture and Science, awarded to incoming non-EEA students for their first year of Bachelor’s or Master’s degrees.
                </p>
                <div className="mt-3 text-[11px] text-[#64748B]">
                  <strong>Eligibility:</strong> Applying to a participating Dutch research university or university of applied sciences.
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E2E8F0]">
                <a
                  href="https://www.studyinnl.org/finances/nl-scholarship"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#155EEF] hover:underline flex items-center gap-1"
                >
                  <span>Study in NL Grant Details</span> ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 10: ADMISSION PREPARATION — INTERACTIVE CHECKLIST
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
                Prepare Smarter. Apply Across Europe.
              </h2>
              <p className="text-base sm:text-lg text-[#475569] mt-2 leading-relaxed max-w-2xl">
                Follow this 4-stage admissions roadmap to prepare documentation, submit applications on time, and secure national European student visas.
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
                  Start Your Study in Europe Journey
                </h2>

                <p className="text-base sm:text-lg text-[#475569] max-w-2xl leading-relaxed">
                  Get personalized guidance on selecting a destination, choosing universities, understanding admission requirements, and exploring suitable scholarship opportunities.
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={handleOpenConsultation}
                    className="px-7 py-4 rounded-2xl bg-[#155EEF] hover:bg-[#104ECC] text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 group cursor-pointer"
                  >
                    <span>Book a European Consultation</span>
                    <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsEligibilityOpen(true)}
                    className="px-6 py-4 rounded-2xl bg-white hover:bg-[#EAF2FF] text-[#155EEF] border border-[#CBD5E1] font-bold text-sm sm:text-base shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Check Your Eligibility</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="pt-6 border-t border-[#E2E8F0] text-[11px] text-[#64748B]">
                  MasterVisa provides authorized educational guidance and advisory consulting. We do not guarantee visa approvals or university admissions, which remain subject to official university and national immigration authority decisions.
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-[#E2E8F0] p-4 flex items-center justify-center bg-white shadow-md animate-float-slow">
                  <div className="w-full h-full rounded-full border border-dashed border-[#155EEF]/30 flex items-center justify-center p-6 text-center">
                    <div>
                      <Plane className="w-10 h-10 text-[#155EEF] mx-auto mb-2 transform -rotate-45" />
                      <div className="text-xl font-black font-editorial text-[#14213D]">Europe 2026/27</div>
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
          SECTION 12: CONCLUSION & QUICK LINKS
         ───────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#F5F8FF]" aria-label="Conclusion">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-[#14213D] tracking-tight">
            Make Your Next Educational Chapter Count.
          </h3>
          <p className="text-sm sm:text-base text-[#475569] mt-4 leading-relaxed font-normal">
            A European degree confers internationally celebrated prestige, advanced research competence, and cultural immersion across the Schengen area. Connect with our dedicated European counselors to find your ideal program and destination.
          </p>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs font-semibold text-[#64748B]">
            <Link to="/destinations" className="hover:text-[#155EEF] transition-colors">
              Explore All Destinations →
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
          VIEW PROGRAMS MODAL (When user clicks "View Programs & Fees")
         ───────────────────────────────────────────────────────────── */}
      {selectedUniForPrograms && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="europe-programs-modal-title"
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
                  {selectedUniForPrograms.rankBadge} · {selectedUniForPrograms.country}
                </span>
                <h3 id="europe-programs-modal-title" className="text-xl sm:text-2xl font-bold font-editorial mt-1 leading-tight text-white">
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
                          {prog.postStudyEligible && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-[#16A34A] border border-emerald-200">
                              Post-Study Visa
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
                        <span className="text-[10px] text-[#64748B]">Indicative Tuition</span>
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
          INTERACTIVE EUROPE ELIGIBILITY MODAL
         ───────────────────────────────────────────────────────────── */}
      <EuropeEligibilityModal
        isOpen={isEligibilityOpen}
        onClose={() => setIsEligibilityOpen(false)}
        onProceedConsultation={(_data) => {
          setIsEligibilityOpen(false);
          if (onOpenCounselling) {
            onOpenCounselling('Europe');
          }
        }}
      />
    </div>
  );
};

export default StudyInEuropePage;
