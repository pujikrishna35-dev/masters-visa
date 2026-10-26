import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageBanner } from '../components/PageBanner';
import { FinalCta } from '../components/FinalCta';
import { FlagIcon } from '../components/FlagIcon';
import { 
  GraduationCap, 
  DollarSign, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  Award, 
  ChevronDown, 
  BookOpen, 
  Globe2,
  FileCheck2
} from 'lucide-react';

interface DestinationDetailPageProps {
  countryId?: string;
  onOpenCounselling: (destination?: string) => void;
}

interface UniversityData {
  name: string;
  location: string;
  qsRank: string;
  established: string;
  popularFor: string;
}

interface ProgramData {
  name: string;
  duration: string;
  avgSalary: string;
  inDemand: string;
}

interface CountryDetails {
  id: string;
  countryName: string;
  pageTitle: string;
  tagline: string;
  flagCode: string;
  badge: string;
  heroImage: string;
  overview: string;
  stats: {
    avgTuition: string;
    workPermit: string;
    visaRate: string;
    intakes: string;
    avgLivingCost: string;
    minGpa: string;
  };
  keyAdvantages: Array<{
    title: string;
    desc: string;
    icon: 'award' | 'briefcase' | 'dollar' | 'globe';
  }>;
  universities: UniversityData[];
  programs: ProgramData[];
  visaInfo: {
    visaType: string;
    workDuringStudy: string;
    postStudyDuration: string;
    prPathway: string;
    keyHighlights: string[];
  };
  requirements: {
    academic: string;
    english: string;
    tests: string;
    financials: string;
  };
  faqs: Array<{
    q: string;
    a: string;
  }>;
}

const DESTINATION_PROFILES: Record<string, CountryDetails> = {
  usa: {
    id: 'usa',
    countryName: 'USA',
    pageTitle: 'Study in USA',
    tagline: 'World-Leading Research Universities, F-1 Visa & Up to 3 Years STEM OPT',
    flagCode: 'USA',
    badge: 'WORLD #1 HIGHER EDUCATION DESTINATION',
    heroImage: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80',
    overview: 'The United States is the premier global hub for international higher education, offering unmatched academic flexibility, cutting-edge research laboratories, world-renowned faculty, and direct pipelines into Fortune 500 tech and financial giants.',
    stats: {
      avgTuition: '$25,000 – $55,000 / yr',
      workPermit: 'Up to 3 Years (STEM OPT)',
      visaRate: '96% Visa Success',
      intakes: 'Fall (Aug/Sep) & Spring (Jan)',
      avgLivingCost: '$10,000 – $18,000 / yr',
      minGpa: '60% (or 3.0 / 4.0 GPA)',
    },
    keyAdvantages: [
      {
        title: 'Ivy League & Top 100 World Ranks',
        desc: 'Over 50 of the world’s top 100 universities are situated in the USA, providing unparalleled international prestige and alumni networks.',
        icon: 'award',
      },
      {
        title: '3-Year Post-Study STEM OPT',
        desc: 'Graduates of STEM-designated Master’s programs can work full-time in the US for up to 36 months without needing an immediate H-1B lottery sponsorship.',
        icon: 'briefcase',
      },
      {
        title: 'Generous Assistantships & On-Campus Work',
        desc: 'Students can work 20 hrs/week on campus and apply for Teaching Assistantships (TA) or Graduate Research Assistantships (RA) offering tuition waivers.',
        icon: 'dollar',
      },
      {
        title: 'Silicon Valley & Global Tech Hubs',
        desc: 'Direct proximity to tech titans like Google, Apple, Microsoft, Amazon, and financial institutions in New York, Chicago, and Austin.',
        icon: 'globe',
      },
    ],
    universities: [
      { name: 'Stanford University', location: 'Stanford, California', qsRank: '#5 Global', established: '1885', popularFor: 'Computer Science, AI & Entrepreneurship' },
      { name: 'Massachusetts Institute of Technology (MIT)', location: 'Cambridge, Massachusetts', qsRank: '#1 Global', established: '1861', popularFor: 'Engineering, Robotics & Data Systems' },
      { name: 'Harvard University', location: 'Cambridge, Massachusetts', qsRank: '#4 Global', established: '1636', popularFor: 'MBA, Public Policy & Life Sciences' },
      { name: 'University of California, Berkeley', location: 'Berkeley, California', qsRank: '#10 Global', established: '1868', popularFor: 'EECS, Data Analytics & FinTech' },
      { name: 'Carnegie Mellon University', location: 'Pittsburgh, Pennsylvania', qsRank: '#52 Global', established: '1900', popularFor: 'Artificial Intelligence & Software Eng' },
      { name: 'Columbia University', location: 'New York, New York', qsRank: '#23 Global', established: '1754', popularFor: 'Finance, Applied Analytics & BioTech' },
    ],
    programs: [
      { name: 'MS in Computer Science & AI', duration: '1.5 – 2 Years', avgSalary: '$115,000 – $145,000', inDemand: 'Very High' },
      { name: 'Master of Business Administration (MBA)', duration: '2 Years', avgSalary: '$130,000 – $175,000', inDemand: 'High' },
      { name: 'MS in Data Science & Business Analytics', duration: '1 – 2 Years', avgSalary: '$105,000 – $130,000', inDemand: 'Very High' },
      { name: 'MS in Electrical & Computer Engineering', duration: '2 Years', avgSalary: '$100,000 – $125,000', inDemand: 'High' },
    ],
    visaInfo: {
      visaType: 'F-1 Non-Immigrant Student Visa',
      workDuringStudy: '20 hours/week on-campus during term; full-time during official vacations; CPT eligible after 1 academic year.',
      postStudyDuration: '12 months initial Optional Practical Training (OPT) + 24 months STEM extension (36 months total).',
      prPathway: 'H-1B Specialty Occupation visa transition followed by EB-2 / EB-3 permanent residency sponsorship.',
      keyHighlights: [
        'Form I-20 issued by SEVP-approved universities',
        'DS-160 filing & SEVIS I-901 fee payment',
        'Intensive consular mock interviews for proven visa confidence',
      ],
    },
    requirements: {
      academic: 'Bachelor’s degree with 60%+ (or 3.0+ GPA on 4.0 scale). 15 or 16-year education accepted depending on university.',
      english: 'IELTS 6.5 – 7.5, TOEFL iBT 80 – 100, or Duolingo English Test 115 – 130.',
      tests: 'GRE / GMAT (Waivers available for numerous partner institutions with high undergraduate GPAs).',
      financials: 'Demonstration of 1-year total cost of attendance (tuition + living) via liquid savings, education loan, or fixed deposits.',
    },
    faqs: [
      { q: 'Can I study in the USA without GRE?', a: 'Yes! Over 200+ top accredited US universities have waived GRE requirements for Fall and Spring intakes, especially for candidates with strong undergraduate grades.' },
      { q: 'How does MasterVisa help with F-1 Visa Mock Interviews?', a: 'We conduct 1-on-1 simulated consular interviews that thoroughly drill non-immigrant intent, university selection logic, course justification, and financial clarity.' },
      { q: 'Is on-campus accommodation guaranteed?', a: 'Through our dedicated MasterVisa Student Arrival service, we arrange verified accommodation and airport pickup so you have a confirmed bed before boarding.' },
    ],
  },

  'united-kingdom': {
    id: 'united-kingdom',
    countryName: 'United Kingdom',
    pageTitle: 'Study in United Kingdom',
    tagline: 'Accelerated 1-Year Master’s Degrees & Guaranteed 2-Year Graduate Route (PSW)',
    flagCode: 'UK',
    badge: '1-YEAR FAST-TRACK MASTER’S WITH 2-YEAR PSW',
    heroImage: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=1200&q=80',
    overview: 'The UK is home to centuries of academic brilliance, Russell Group research institutions, and accelerated 1-year Master’s courses that save you an entire year of tuition and living expenses while conferring globally celebrated credentials.',
    stats: {
      avgTuition: '£15,000 – £35,000 / yr',
      workPermit: '2 Years Unrestricted (PSW)',
      visaRate: '98% Visa Success',
      intakes: 'September/October & January/February',
      avgLivingCost: '£9,000 – £14,000 / yr',
      minGpa: '55% – 65% in Bachelor’s',
    },
    keyAdvantages: [
      {
        title: 'Accelerated 1-Year Master’s Degree',
        desc: 'Graduate and enter the job market a whole year sooner than in most countries, cutting your total tuition and living costs in half.',
        icon: 'clock' as any,
      },
      {
        title: '2-Year Graduate Route Stay-Back Visa',
        desc: 'Work in any job role or sector in the UK for 2 years without needing employer sponsorship or minimum salary thresholds upon graduation.',
        icon: 'briefcase',
      },
      {
        title: 'English Language Waivers Available',
        desc: 'Many partner universities accept 70%+ in 12th Standard English (CBSE/ICSE/State Boards) in lieu of IELTS.',
        icon: 'award',
      },
      {
        title: 'Global Tech & FinTech Capital',
        desc: 'London is Europe’s primary tech unicorn and banking headquarters, providing extraordinary career launchpads.',
        icon: 'globe',
      },
    ],
    universities: [
      { name: 'University of Oxford', location: 'Oxford, England', qsRank: '#3 Global', established: '1096', popularFor: 'Humanities, Science & MBA' },
      { name: 'University of Cambridge', location: 'Cambridge, England', qsRank: '#2 Global', established: '1209', popularFor: 'Engineering, Mathematics & Computing' },
      { name: 'Imperial College London', location: 'London, England', qsRank: '#6 Global', established: '1907', popularFor: 'STEM, Robotics & Data Analytics' },
      { name: 'University College London (UCL)', location: 'London, England', qsRank: '#9 Global', established: '1826', popularFor: 'Biomedical, AI & Management' },
      { name: 'University of Manchester', location: 'Manchester, England', qsRank: '#32 Global', established: '1824', popularFor: 'Advanced Materials, CS & Finance' },
      { name: 'University of Leeds', location: 'Leeds, England', qsRank: '#75 Global', established: '1904', popularFor: 'Business, Communication & Engineering' },
    ],
    programs: [
      { name: 'MSc Data Science & AI', duration: '1 Year', avgSalary: '£42,000 – £62,000', inDemand: 'Very High' },
      { name: 'MSc International Business & Management', duration: '1 Year', avgSalary: '£38,000 – £55,000', inDemand: 'High' },
      { name: 'MSc FinTech & Financial Technology', duration: '1 Year', avgSalary: '£45,000 – £70,000', inDemand: 'Very High' },
      { name: 'MSc Cyber Security & Cloud Systems', duration: '1 Year', avgSalary: '£40,000 – £60,000', inDemand: 'High' },
    ],
    visaInfo: {
      visaType: 'UK Student Visa (Points-Based System)',
      workDuringStudy: '20 hours/week during term-time; full-time during vacations.',
      postStudyDuration: '2 years for Master’s graduates (3 years for PhD) under Graduate Route.',
      prPathway: 'Transition from Graduate Route to Skilled Worker Visa (5-year route to Indefinite Leave to Remain - ILR).',
      keyHighlights: [
        'Confirmation of Acceptance for Studies (CAS) from university',
        'Immigration Health Surcharge (IHS) coverage under NHS',
        'No consular interview required for standard low-risk visa streams',
      ],
    },
    requirements: {
      academic: 'Recognized 3 or 4-year Bachelor’s degree with 55% – 65% aggregate.',
      english: 'IELTS 6.0 – 6.5 (or 70%+ in Class 12 English subject for IELTS waiver).',
      tests: 'No GRE or GMAT required for 95% of UK Master’s programs.',
      financials: 'Tuition balance + 9 months maintenance funds (£1,334/mo in London or £1,023/mo outside London) held for 28 consecutive days.',
    },
    faqs: [
      { q: 'Can I study in the UK without taking IELTS?', a: 'Yes! Numerous prestigious UK universities grant IELTS waivers if you scored 70% or higher in English in your 12th standard CBSE, ICSE, or major State Board examinations.' },
      { q: 'Can my spouse accompany me to the UK?', a: 'Under current UKVI regulations, dependents are permitted for students enrolled in postgraduate research courses and government-sponsored programs.' },
    ],
  },

  canada: {
    id: 'canada',
    countryName: 'Canada',
    pageTitle: 'Study in Canada',
    tagline: 'High Quality of Life, Paid Co-op Internships & Clear PR Pathways',
    flagCode: 'CANADA',
    badge: 'WORLD-CLASS DEGREES & UP TO 3-YEAR PGWP',
    heroImage: 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&w=1200&q=80',
    overview: 'Canada consistently ranks as the most welcoming, safe, and student-friendly country in the world. With subsidized high-quality education, integrated paid co-op programs, and clear immigration pathways, Canada is a favorite for international students.',
    stats: {
      avgTuition: 'CAD 20,000 – 45,000 / yr',
      workPermit: 'Up to 3 Years (PGWP)',
      visaRate: '94% Visa Success',
      intakes: 'Fall (September) & Winter (January)',
      avgLivingCost: 'CAD 12,000 – 18,000 / yr',
      minGpa: '65%+ in Bachelor’s',
    },
    keyAdvantages: [
      {
        title: 'Post-Graduation Work Permit (PGWP)',
        desc: 'Eligible 2-year Master’s graduates can receive up to a 3-year open work permit allowing employment anywhere across Canada.',
        icon: 'briefcase',
      },
      {
        title: 'Integrated Paid Co-op Programs',
        desc: 'Gain 4 to 8 months of accredited Canadian corporate work experience and earn competitive wages before graduating.',
        icon: 'dollar',
      },
      {
        title: 'Express Entry & PNP Immigration Paths',
        desc: 'Canadian education and work experience grant premium Comprehensive Ranking System (CRS) points toward Permanent Residency (PR).',
        icon: 'award',
      },
      {
        title: 'Safe, Multicultural & High Standard of Living',
        desc: 'Ranked top 3 globally for quality of life, universal public safety, and student healthcare support.',
        icon: 'globe',
      },
    ],
    universities: [
      { name: 'University of Toronto', location: 'Toronto, Ontario', qsRank: '#21 Global', established: '1827', popularFor: 'AI Research, Computer Science & Business' },
      { name: 'University of British Columbia (UBC)', location: 'Vancouver, BC', qsRank: '#34 Global', established: '1908', popularFor: 'Forestry, Data Science & Clean Tech' },
      { name: 'McGill University', location: 'Montreal, Quebec', qsRank: '#30 Global', established: '1821', popularFor: 'Medicine, Law & Engineering' },
      { name: 'University of Waterloo', location: 'Waterloo, Ontario', qsRank: '#112 Global', established: '1957', popularFor: 'World-Leading Co-op Tech & Math' },
      { name: 'University of Alberta', location: 'Edmonton, Alberta', qsRank: '#111 Global', established: '1908', popularFor: 'Energy Systems, AI & Petroleum Eng' },
    ],
    programs: [
      { name: 'Master of Engineering in Applied Computing', duration: '2 Years', avgSalary: 'CAD 85,000 – 115,000', inDemand: 'Very High' },
      { name: 'Master of Management Analytics (MMA)', duration: '1 – 2 Years', avgSalary: 'CAD 80,000 – 110,000', inDemand: 'Very High' },
      { name: 'Project Management & Supply Chain (PG Diploma/MS)', duration: '2 Years', avgSalary: 'CAD 70,000 – 95,000', inDemand: 'High' },
    ],
    visaInfo: {
      visaType: 'Canada Study Permit (IRCC)',
      workDuringStudy: '20 hours/week off-campus during terms; full-time during scheduled breaks.',
      postStudyDuration: 'Up to 3-Year Post-Graduation Work Permit (PGWP).',
      prPathway: 'Express Entry Canadian Experience Class (CEC), Provincial Nominee Programs (OINP, BC PNP, AAIP).',
      keyHighlights: [
        'Guaranteed Investment Certificate (GIC) proof of funds',
        'Official Provincial Attestation Letter (PAL) guidance',
        'Dedicated SOP drafting emphasizing career progression back home',
      ],
    },
    requirements: {
      academic: 'Recognized 4-year Bachelor’s degree (or 3-year with evaluation/Master’s) with minimum 65% – 70% aggregate.',
      english: 'IELTS Academic 6.5 (min 6.0 each band) or PTE Academic 60+.',
      tests: 'Most Canadian Master’s programs do not require GRE, except select top CS faculties.',
      financials: 'First year tuition payment + CAD 20,635 living expenses deposited into an approved Canadian GIC account.',
    },
    faqs: [
      { q: 'What is a GIC for Canadian student visas?', a: 'A Guaranteed Investment Certificate (GIC) is a special Canadian bank account where you deposit 1 year of living funds ($20,635 CAD) before filing your visa.' },
      { q: 'Can I apply for PR after studying in Canada?', a: 'Yes! Canadian degrees give you bonus CRS points in the Express Entry pool, and graduates can qualify for the Canadian Experience Class (CEC) or Provincial Nominee Programs.' },
    ],
  },

  australia: {
    id: 'australia',
    countryName: 'Australia',
    pageTitle: 'Study in Australia',
    tagline: 'Top 50 Ranked Universities, High Minimum Wages & Generous Stay-Back Rights',
    flagCode: 'AUSTRALIA',
    badge: 'GROUP OF EIGHT (GO8) PREMIER INSTITUTIONS',
    heroImage: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1200&q=80',
    overview: 'Australia is famed for its world-leading Group of Eight research institutions, stunning lifestyle, high student minimum wages, and lucrative post-study work rights spanning 2 to 4 years across cosmopolitan and regional hubs.',
    stats: {
      avgTuition: 'AUD 28,000 – 50,000 / yr',
      workPermit: '2 – 4 Years (Subclass 485)',
      visaRate: '95% Visa Success',
      intakes: 'Semester 1 (February) & Semester 2 (July)',
      avgLivingCost: 'AUD 21,000 – 26,000 / yr',
      minGpa: '60%+ in Bachelor’s',
    },
    keyAdvantages: [
      {
        title: 'Group of Eight (Go8) Global Distinction',
        desc: '7 out of 8 Australian Go8 universities rank in the world’s top 100, celebrated for groundbreaking research and elite graduate employability.',
        icon: 'award',
      },
      {
        title: 'Generous Post-Study Work Visas (2 – 4 Years)',
        desc: 'Temporary Graduate Visa (subclass 485) allows unrestricted employment in Sydney, Melbourne, Brisbane, Perth, or Adelaide.',
        icon: 'briefcase',
      },
      {
        title: 'Highest Global Student Minimum Wage',
        desc: 'Australia offers one of the world’s highest minimum wages (~AUD $24/hr), helping students cover living costs comfortably.',
        icon: 'dollar',
      },
      {
        title: 'Regional Migration & PR Incentives',
        desc: 'Studying in designated regional cities (Perth, Adelaide, Gold Coast) grants an additional 1 to 2 years of stay-back and PR point bonuses.',
        icon: 'globe',
      },
    ],
    universities: [
      { name: 'University of Melbourne', location: 'Melbourne, Victoria', qsRank: '#14 Global', established: '1853', popularFor: 'Business, IT, Medicine & Architecture' },
      { name: 'University of New South Wales (UNSW)', location: 'Sydney, NSW', qsRank: '#19 Global', established: '1949', popularFor: 'Engineering, Solar Tech & FinTech' },
      { name: 'University of Sydney', location: 'Sydney, NSW', qsRank: '#18 Global', established: '1850', popularFor: 'Law, Data Science & Management' },
      { name: 'Monash University', location: 'Melbourne, Victoria', qsRank: '#42 Global', established: '1958', popularFor: 'Pharmacy, Banking & Software Systems' },
      { name: 'University of Queensland (UQ)', location: 'Brisbane, Queensland', qsRank: '#43 Global', established: '1909', popularFor: 'Biotechnology, Mining & Environmental Science' },
    ],
    programs: [
      { name: 'Master of Information Technology (Cloud & AI)', duration: '2 Years', avgSalary: 'AUD 85,000 – 120,000', inDemand: 'Very High' },
      { name: 'Master of Professional Engineering', duration: '2 – 3 Years', avgSalary: 'AUD 90,000 – 125,000', inDemand: 'High' },
      { name: 'Master of Business Analytics', duration: '1.5 – 2 Years', avgSalary: 'AUD 80,000 – 115,000', inDemand: 'Very High' },
    ],
    visaInfo: {
      visaType: 'Subclass 500 Student Visa',
      workDuringStudy: '48 hours per fortnight during study terms; unrestricted hours during vacations.',
      postStudyDuration: '2 to 4 years under Subclass 485 Temporary Graduate Visa.',
      prPathway: 'General Skilled Migration (Subclass 189, 190, 491) points-tested permanent visa pathways.',
      keyHighlights: [
        'Electronic Confirmation of Enrolment (eCoE)',
        'Genuine Student (GS) compliance assessment',
        'Overseas Student Health Cover (OSHC) comprehensive coverage',
      ],
    },
    requirements: {
      academic: 'Recognized 3 or 4-year Bachelor’s degree with 60% – 65% aggregate.',
      english: 'IELTS Academic 6.5 (min 6.0 in all bands) or PTE Academic 58+.',
      tests: 'No GRE or GMAT required for the vast majority of courses.',
      financials: 'Demonstration of 1-year tuition fee + AUD $29,710 living costs + travel expenses through approved bank funds or loan sanctions.',
    },
    faqs: [
      { q: 'How many hours can I work as an international student in Australia?', a: 'You can work up to 48 hours per fortnight during your semester, and unlimited hours during semester breaks and holidays.' },
      { q: 'What is the Genuine Student (GS) requirement?', a: 'The GS assessment verifies your educational intentions, career goals, family circumstances, and value of the course to your future.' },
    ],
  },

  europe: {
    id: 'europe',
    countryName: 'Europe',
    pageTitle: 'Study in Europe',
    tagline: 'Zero to Low Tuition Fees, 29-Nation Schengen Mobility & EU Blue Card',
    flagCode: 'EUROPE',
    badge: 'AFFORDABLE WORLD-CLASS EDUCATION ACROSS SCHENGEN',
    heroImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80',
    overview: 'Europe represents the ultimate value in world-class international education. Public universities across Germany, France, Austria, Italy, and the Netherlands offer world-renowned technical and business programs at zero to low tuition fees, with unrestricted visa-free travel across all 29 Schengen member states.',
    stats: {
      avgTuition: '€0 – €15,000 / yr (Low/No Tuition)',
      workPermit: '18 Months – 2 Years (Job Seeker / EU Blue Card)',
      visaRate: '97% Visa Success',
      intakes: 'Winter (September/October) & Summer (March/April)',
      avgLivingCost: '€8,000 – €12,000 / yr',
      minGpa: '65%+ (ECTS Credit Match)',
    },
    keyAdvantages: [
      {
        title: 'Zero or Subsidized Tuition Fees',
        desc: 'Public universities in Germany, Norway, and Austria charge little to no tuition fees for international students, saving up to $60,000.',
        icon: 'dollar',
      },
      {
        title: '29-Nation Schengen Visa-Free Mobility',
        desc: 'Your European student visa gives you unrestricted travel across 29 Schengen countries including Germany, France, Switzerland, Italy, and Spain.',
        icon: 'globe',
      },
      {
        title: 'EU Blue Card Fast-Track Residency',
        desc: 'Highly qualified STEM and business graduates can obtain the EU Blue Card, unlocking permanent residency within 21 to 27 months.',
        icon: 'award',
      },
      {
        title: 'Industrial Heavyweights & Automotive Titans',
        desc: 'Direct career connections to global conglomerates like BMW, Siemens, Bosch, Airbus, SAP, ASML, and Philips.',
        icon: 'briefcase',
      },
    ],
    universities: [
      { name: 'Technical University of Munich (TUM)', location: 'Munich, Germany', qsRank: '#28 Global', established: '1868', popularFor: 'Automotive Eng, Robotics & Informatics' },
      { name: 'ETH Zurich', location: 'Zurich, Switzerland', qsRank: '#7 Global', established: '1855', popularFor: 'Mathematics, Quantum Computing & Physics' },
      { name: 'Delft University of Technology (TU Delft)', location: 'Delft, Netherlands', qsRank: '#49 Global', established: '1842', popularFor: 'Civil, Aerospace & Sustainable Energy' },
      { name: 'KU Leuven', location: 'Leuven, Belgium', qsRank: '#63 Global', established: '1425', popularFor: 'Biomedical, Microelectronics & Philosophy' },
      { name: 'Heidelberg University', location: 'Heidelberg, Germany', qsRank: '#84 Global', established: '1386', popularFor: 'Medicine, Life Sciences & Physics' },
      { name: 'Politecnico di Milano', location: 'Milan, Italy', qsRank: '#111 Global', established: '1863', popularFor: 'Industrial Design, Architecture & Mechanical' },
    ],
    programs: [
      { name: 'MSc Automotive & Mechanical Engineering', duration: '2 Years', avgSalary: '€55,000 – €75,000', inDemand: 'Very High' },
      { name: 'MSc Data Science & Artificial Intelligence', duration: '2 Years', avgSalary: '€58,000 – €80,000', inDemand: 'Very High' },
      { name: 'MSc Renewable & Sustainable Energy Systems', duration: '2 Years', avgSalary: '€52,000 – €70,000', inDemand: 'High' },
    ],
    visaInfo: {
      visaType: 'National Type D Student Visa (Schengen Residence Permit)',
      workDuringStudy: '120 full days or 240 half days per calendar year (Germany); equivalent part-time rights across other member states.',
      postStudyDuration: '18 months (Germany) to 2 years stay-back visa to search for qualified employment.',
      prPathway: 'EU Blue Card leading to Permanent Residency (Niederlassungserlaubnis) in as little as 21 months with German B1.',
      keyHighlights: [
        'Blocked Bank Account (Sperrkonto) proof of living expenses',
        'APS (Akademische Prüfstelle) certificate verification for German universities',
        'Full health insurance coverage via statutory public providers (TK, AOK)',
      ],
    },
    requirements: {
      academic: 'Relevant Bachelor’s degree matching strict ECTS curriculum credits (65%+ minimum).',
      english: 'IELTS 6.5 – 7.0 or TOEFL iBT 90+ for 100% English-taught programs. No German/French required for admission.',
      tests: 'GATE or GRE recommended for specific technical universities.',
      financials: 'Standard Blocked Bank Account holding €11,208 for 1-year living expenses.',
    },
    faqs: [
      { q: 'Are European Master’s programs taught in English?', a: 'Yes! Germany, the Netherlands, France, and Nordic countries offer thousands of 100% English-taught Master’s degrees in Engineering, Data Science, and Business.' },
      { q: 'Is university really tuition-free in Germany?', a: 'Yes! Public universities in 15 of 16 German states charge zero tuition fee for all students regardless of nationality, requiring only a nominal semester contribution of €150 – €350.' },
    ],
  },

  'new-zealand': {
    id: 'new-zealand',
    countryName: 'New Zealand',
    pageTitle: 'Study in New Zealand',
    tagline: 'World Top 3% Ranked Universities, Unbeatable Lifestyle & 3-Year Open Work Visa',
    flagCode: 'NEW ZEALAND',
    badge: '100% OF UNIVERSITIES RANKED IN WORLD TOP 3%',
    heroImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    overview: 'New Zealand offers world-class education where all 8 national universities rank in the top 3% globally. Known for its breathtaking natural beauty, safety, progressive innovation, and direct pathways to skilled residency through the Green List.',
    stats: {
      avgTuition: 'NZD 24,000 – 42,000 / yr',
      workPermit: 'Up to 3 Years (Open Work Visa)',
      visaRate: '96% Visa Success',
      intakes: 'February & July',
      avgLivingCost: 'NZD 18,000 – 22,000 / yr',
      minGpa: '60%+ in Bachelor’s',
    },
    keyAdvantages: [
      {
        title: '3-Year Post-Study Open Work Visa',
        desc: 'Master’s degree graduates receive a 3-year open work visa with the freedom to work for any employer in New Zealand.',
        icon: 'briefcase',
      },
      {
        title: 'Fast-Track Green List Residence Pathway',
        desc: 'Graduates in designated Tier 1 and Tier 2 occupations (IT, Engineering, Healthcare, Construction) qualify for accelerated PR.',
        icon: 'award',
      },
      {
        title: 'Partner Work Rights Included',
        desc: 'Students enrolled in Level 9 Master’s degrees can support full-time open work visas for their spouses and domestic fee schooling for children.',
        icon: 'globe',
      },
      {
        title: 'Ranked World #2 for Peace & Safety',
        desc: 'Global Peace Index consistently ranks New Zealand as one of the safest and most harmonious societies in the world.',
        icon: 'shield' as any,
      },
    ],
    universities: [
      { name: 'University of Auckland', location: 'Auckland, NZ', qsRank: '#65 Global', established: '1883', popularFor: 'Software Eng, Architecture & Business' },
      { name: 'University of Otago', location: 'Dunedin, NZ', qsRank: '#206 Global', established: '1869', popularFor: 'Biomedical, Health Sciences & Law' },
      { name: 'Victoria University of Wellington', location: 'Wellington, NZ', qsRank: '#241 Global', established: '1897', popularFor: 'Public Policy, AI & Creative Media' },
      { name: 'University of Canterbury', location: 'Christchurch, NZ', qsRank: '#256 Global', established: '1873', popularFor: 'Civil & Structural Engineering' },
    ],
    programs: [
      { name: 'Master of Information Technology', duration: '1.5 – 2 Years', avgSalary: 'NZD 75,000 – 105,000', inDemand: 'Very High' },
      { name: 'Master of Professional Accounting', duration: '1.5 Years', avgSalary: 'NZD 65,000 – 85,000', inDemand: 'High' },
      { name: 'Master of Construction Management', duration: '1 – 1.5 Years', avgSalary: 'NZD 80,000 – 110,000', inDemand: 'Very High' },
    ],
    visaInfo: {
      visaType: 'Fee Paying Student Visa (Immigration New Zealand)',
      workDuringStudy: '20 hours/week during semester; full-time during holidays.',
      postStudyDuration: 'Up to 3-Year Post Study Work Visa for Master’s graduates.',
      prPathway: 'Skilled Migrant Category (SMC) 6-point system and Green List straight-to-residence tracks.',
      keyHighlights: [
        'Offer of Place from accredited NZQA university',
        'Funds to cover tuition + NZD $20,000/yr living expenses',
        'Full medical clearance and genuine student interview prep',
      ],
    },
    requirements: {
      academic: 'Recognized Bachelor’s degree with minimum 60% aggregate.',
      english: 'IELTS Academic 6.5 (no sub-score under 6.0) or PTE 58+.',
      tests: 'No GRE or GMAT required for New Zealand universities.',
      financials: 'Demonstration of tuition fees paid or sanctioned + NZD 20,000 living expenses in savings held for 6 months or education loan.',
    },
    faqs: [
      { q: 'Can my spouse work while I study in New Zealand?', a: 'Yes! If you are enrolled in an eligible Level 9 Master’s program, your partner can apply for a full-time open work visa for the entire duration of your studies.' },
      { q: 'What is the New Zealand Green List?', a: 'The Green List outlines in-demand occupations in tech, construction, healthcare, and engineering that offer fast-tracked residency pathways.' },
    ],
  },

  france: {
    id: 'france',
    countryName: 'France',
    pageTitle: 'Study in France',
    tagline: 'Top-Ranked European Business Schools, Subsidized Public Universities & 2-Year APS Visa',
    flagCode: 'FRANCE',
    badge: 'WORLD #1 IN MANAGEMENT & LUXURY BRAND INNOVATION',
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    overview: 'France combines historic intellectual prestige with Europe’s most formidable Grandes Écoles and business schools. With 100% English-taught programs, substantial government housing subsidies (CAF), and a special 2-year post-study APS visa for Indian Master’s graduates.',
    stats: {
      avgTuition: '€4,000 – €18,000 / yr',
      workPermit: '2 Years (APS Stay-Back Visa)',
      visaRate: '95% Visa Success',
      intakes: 'Autumn (September/October) & Spring (January)',
      avgLivingCost: '€7,000 – €11,000 / yr',
      minGpa: '55%+ in Bachelor’s',
    },
    keyAdvantages: [
      {
        title: 'World #1 Ranked Business Schools',
        desc: 'Home to top Financial Times ranked management institutes: HEC Paris, INSEAD, ESSEC, ESCP, and EDHEC.',
        icon: 'award',
      },
      {
        title: '2-Year APS Stay-Back & 5-Year Schengen Visa',
        desc: 'Indian Master’s graduates in France enjoy a 2-year stay-back visa plus eligibility for a 5-year short-stay circulation Schengen visa.',
        icon: 'briefcase',
      },
      {
        title: 'Government Subsidized Housing (CAF Allowance)',
        desc: 'The French government provides monthly accommodation subsidies (CAF) paying up to 30% – 40% of international students’ monthly rent.',
        icon: 'dollar',
      },
      {
        title: 'European Aerospace, Tech & Luxury Epicenter',
        desc: 'Headquarters for Airbus, LVMH, L’Oréal, Renault, Danone, TotalEnergies, and Europe’s largest tech startup campus (Station F).',
        icon: 'globe',
      },
    ],
    universities: [
      { name: 'HEC Paris', location: 'Jouy-en-Josas, France', qsRank: '#1 European Business', established: '1881', popularFor: 'Master in Management, Finance & Luxury' },
      { name: 'Sorbonne University', location: 'Paris, France', qsRank: '#59 Global', established: '1257', popularFor: 'Humanities, Artificial Intelligence & Physics' },
      { name: 'INSEAD', location: 'Fontainebleau, France', qsRank: '#2 Global MBA', established: '1957', popularFor: 'Global Executive MBA & Strategy' },
      { name: 'École Polytechnique', location: 'Palaiseau, France', qsRank: '#38 Global', established: '1794', popularFor: 'Mathematics, Data Science & Quantum Tech' },
      { name: 'ESSEC Business School', location: 'Cergy, France', qsRank: '#6 European Business', established: '1907', popularFor: 'International Finance & Marketing' },
    ],
    programs: [
      { name: 'Master in International Management (MIM)', duration: '1 – 2 Years', avgSalary: '€50,000 – €75,000', inDemand: 'Very High' },
      { name: 'MSc Luxury Brand Management & Marketing', duration: '1 – 1.5 Years', avgSalary: '€48,000 – €68,000', inDemand: 'Very High' },
      { name: 'MSc Data Analytics & AI for Business', duration: '1.5 Years', avgSalary: '€52,000 – €72,000', inDemand: 'High' },
    ],
    visaInfo: {
      visaType: 'Long-Stay Student Visa (VLS-TS)',
      workDuringStudy: 'Up to 964 hours per year (approx 60% of normal full-time work).',
      postStudyDuration: '2 years under the Autorisation Provisoire de Séjour (APS) / Master’s stay-back.',
      prPathway: 'Passeport Talent (European Blue Card) and Carte de Séjour leading to citizenship eligibility after 5 years.',
      keyHighlights: [
        'Campus France Études en France official processing',
        'OFII validation on arrival in France',
        'Direct access to national healthcare (Sécurité Sociale) free of charge',
      ],
    },
    requirements: {
      academic: 'Recognized 3 or 4-year Bachelor’s degree with minimum 55% aggregate.',
      english: 'IELTS 6.5 or TOEFL 85+ (no French language prerequisite for English-taught programs).',
      tests: 'GMAT / GRE optional or waived for most partner Grand Écoles.',
      financials: 'Demonstration of minimum €615/month (€7,380 for 1 year) in living funds + tuition receipt.',
    },
    faqs: [
      { q: 'Do I need to speak French to study in France?', a: 'No! Over 1,500 Master’s programs in France are taught entirely in English. Learning basic conversational French is recommended for everyday life and local networking.' },
      { q: 'What is the CAF student housing subsidy?', a: 'CAF (Caisse d’Allocations Familiales) is a French government program that refunds international students approximately €150 to €250 per month towards their rental cost.' },
    ],
  },

  ireland: {
    id: 'ireland',
    countryName: 'Ireland',
    pageTitle: 'Study in Ireland',
    tagline: 'The Silicon Valley of Europe, Only Native English EU Member & 2-Year Stay-Back',
    flagCode: 'IRELAND',
    badge: 'EUROPEAN TECH CAPITAL & HIGHEST STARTING SALARIES',
    heroImage: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&w=1200&q=80',
    overview: 'Ireland is the sole native English-speaking nation in the European Union and the European headquarters for 9 of the top 10 global software companies. With 1-year Master’s degrees and an automatic 2-year Third Level Graduate Scheme work visa, Ireland is a powerhouse for STEM, FinTech, and Pharma careers.',
    stats: {
      avgTuition: '€12,000 – €26,000 / yr',
      workPermit: '2 Years (Third Level Graduate Scheme)',
      visaRate: '98% Visa Success',
      intakes: 'Autumn (September) & Spring (January)',
      avgLivingCost: '€9,000 – €14,000 / yr',
      minGpa: '60%+ in Bachelor’s',
    },
    keyAdvantages: [
      {
        title: 'European Headquarters for 1,000+ Multinational Giants',
        desc: 'Google, Apple, Meta, Pfizer, LinkedIn, Stripe, and Intel operate their primary EMEA operations in Dublin and Cork.',
        icon: 'globe',
      },
      {
        title: 'Guaranteed 2-Year Stay-Back (Stamp 1G)',
        desc: 'Master’s degree graduates automatically receive a 24-month unrestricted Stamp 1G work permit to work in Irish companies.',
        icon: 'briefcase',
      },
      {
        title: 'Only Native English-Speaking EU Nation',
        desc: 'Study, work, and build your corporate career completely in English while retaining full access to the European single market.',
        icon: 'award',
      },
      {
        title: 'Fast-Track Critical Skills Employment Permit',
        desc: 'Tech, data, and pharma jobs offer the Critical Skills permit, providing a direct 2-year route to Irish Permanent Residency (Stamp 4).',
        icon: 'dollar',
      },
    ],
    universities: [
      { name: 'Trinity College Dublin (TCD)', location: 'Dublin, Ireland', qsRank: '#81 Global', established: '1592', popularFor: 'Computer Science, Law, Immunology & Business' },
      { name: 'University College Dublin (UCD)', location: 'Dublin, Ireland', qsRank: '#171 Global', established: '1854', popularFor: 'Smurfit Business School, Data Analytics & BioTech' },
      { name: 'University of Galway', location: 'Galway, Ireland', qsRank: '#289 Global', established: '1845', popularFor: 'Medical Technology, Marine Science & AI' },
      { name: 'University College Cork (UCC)', location: 'Cork, Ireland', qsRank: '#292 Global', established: '1845', popularFor: 'Pharmaceutical, Microelectronics & Food Tech' },
      { name: 'Dublin City University (DCU)', location: 'Dublin, Ireland', qsRank: '#436 Global', established: '1989', popularFor: 'FinTech, Computing & Electronic Engineering' },
    ],
    programs: [
      { name: 'MSc Data Analytics & Machine Learning', duration: '1 Year', avgSalary: '€45,000 – €65,000', inDemand: 'Very High' },
      { name: 'MSc Cloud Computing & Software Architecture', duration: '1 Year', avgSalary: '€48,000 – €70,000', inDemand: 'Very High' },
      { name: 'MSc Pharmaceutical Sciences & Regulatory Affairs', duration: '1 Year', avgSalary: '€42,000 – €60,000', inDemand: 'High' },
      { name: 'MSc FinTech & Quantitative Finance', duration: '1 Year', avgSalary: '€46,000 – €68,000', inDemand: 'Very High' },
    ],
    visaInfo: {
      visaType: 'Irish Stamp 2 Student Visa',
      workDuringStudy: '20 hours/week during term; 40 hours/week during June – September and Dec 15 – Jan 15.',
      postStudyDuration: '24 months under the Third Level Graduate Scheme (Stamp 1G).',
      prPathway: 'Transition from Stamp 1G to Critical Skills Employment Permit (2 years) leading to Stamp 4 permanent residency.',
      keyHighlights: [
        'Electronic Visa Application Facility (AVATS) filing',
        'Proof of private medical insurance coverage',
        'Simple tuition fee escrow or university bank wire receipts',
      ],
    },
    requirements: {
      academic: 'Recognized 3 or 4-year Bachelor’s degree with minimum 60% – 65% aggregate.',
      english: 'IELTS Academic 6.5 (min 6.0 in each band) or Duolingo English Test 110 – 120.',
      tests: 'No GRE or GMAT required for the vast majority of courses.',
      financials: 'Proof of tuition fee payment + €10,000 living expenses in savings account held for 6 months or education loan sanction.',
    },
    faqs: [
      { q: 'Why is Ireland called the Silicon Valley of Europe?', a: 'Over 1,000 leading multinational technology and pharmaceutical firms have their European headquarters in Dublin’s Silicon Docks due to Ireland’s pro-business climate.' },
      { q: 'How long is the post-study work visa in Ireland?', a: 'Master’s degree graduates from accredited Irish institutions receive an automatic 2-year Stamp 1G work visa.' },
    ],
  },
};

export const DestinationDetailPage: React.FC<DestinationDetailPageProps> = ({
  countryId: propCountryId,
  onOpenCounselling,
}) => {
  const params = useParams<{ countryId?: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Normalize requested country ID from prop or route params
  const rawId = (propCountryId || params.countryId || 'usa').toLowerCase().trim();
  const normalizedId = rawId === 'uk' ? 'united-kingdom' : rawId;

  const country = DESTINATION_PROFILES[normalizedId] || DESTINATION_PROFILES.usa;

  return (
    <div className="bg-[#FAF7F1] min-h-screen">
      {/* 1. Page Header Banner with Breadcrumbs */}
      <PageBanner
        breadcrumbs={[
          { label: 'Destinations', href: '/destinations' },
          { label: country.pageTitle }
        ]}
        badge={country.badge}
        badgeIcon={<FlagIcon country={country.countryName} className="w-4 h-3 rounded-2xs inline-block" />}
        title={country.pageTitle}
        highlightWord={country.countryName}
        description={country.tagline}
      />

      {/* 2. Key Metric Stat Ribbon */}
      <section className="relative z-20 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-card border border-slate-100 grid grid-cols-2 lg:grid-cols-4 gap-5 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="flex items-center gap-3.5 pl-0 sm:pl-2">
            <div className="w-12 h-12 rounded-2xl bg-[#FDF7EC] border border-[#D99A35]/30 flex items-center justify-center shrink-0 text-[#D99A35]">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Avg Tuition</p>
              <p className="text-sm sm:text-base font-extrabold text-[#10243F] mt-0.5">{country.stats.avgTuition}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 pt-4 sm:pt-0 pl-0 sm:pl-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200/50 flex items-center justify-center shrink-0 text-blue-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Post-Study Work</p>
              <p className="text-sm sm:text-base font-extrabold text-[#10243F] mt-0.5">{country.stats.workPermit}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 pt-4 sm:pt-0 pl-0 sm:pl-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/50 flex items-center justify-center shrink-0 text-emerald-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Visa Success</p>
              <p className="text-sm sm:text-base font-extrabold text-[#10243F] mt-0.5">{country.stats.visaRate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 pt-4 sm:pt-0 pl-0 sm:pl-6">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200/50 flex items-center justify-center shrink-0 text-purple-600">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Primary Intakes</p>
              <p className="text-sm sm:text-base font-extrabold text-[#10243F] mt-0.5">{country.stats.intakes}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Master Visa Exclusive Benefit: Free Airport Pickup & Stay Guarantee */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#10243F] via-[#16355C] to-[#10243F] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-card">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D99A35]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D99A35]/20 border border-[#D99A35]/40 text-[#D99A35] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#D99A35]" /> Free Master Visa On-Arrival Guarantee
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif mb-2">
                Guaranteed Airport Pickup & Verified Student Stay in {country.countryName}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Landing in {country.countryName} shouldn't be stressful. Every Master Visa student receives complimentary airport meet & greet, direct private transport to their student dorm or apartment, and a pre-activated local SIM card.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => onOpenCounselling(`Airport Pickup & Accommodation - ${country.countryName}`)}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D99A35] via-[#E28330] to-[#F16B55] hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Claim Free Arrival Support</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Country Overview & Why Study Here */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual & Overview */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft">
            <div className="relative h-60 sm:h-72 w-full rounded-2xl overflow-hidden mb-6 shadow-sm">
              <img
                src={country.heroImage}
                alt={country.pageTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10243F]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <FlagIcon country={country.countryName} className="w-6 h-4 rounded-xs shadow-xs" />
                  <span className="font-bold text-sm">{country.countryName} Study Guide</span>
                </div>
                <span className="text-[11px] bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full font-semibold">
                  {country.stats.minGpa} Min
                </span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-[#10243F] font-serif mb-3">
              Why Choose {country.countryName}?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
              {country.overview}
            </p>

            <div className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="font-medium text-slate-500">Average Living Expense:</span>
                <span className="font-bold text-[#10243F]">{country.stats.avgLivingCost}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="font-medium text-slate-500">Post-Study Visa Duration:</span>
                <span className="font-bold text-[#D99A35]">{country.stats.workPermit}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="font-medium text-slate-500">Visa Processing Rate:</span>
                <span className="font-bold text-emerald-600">{country.stats.visaRate}</span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Key Advantages */}
          <div className="lg:col-span-7 space-y-4">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D99A35] block mb-1">
                STRATEGIC ADVANTAGES
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#10243F] font-serif">
                Key Benefits of Studying in {country.countryName}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {country.keyAdvantages.map((adv, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-[#D99A35]/50 hover:shadow-card transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FAF7F1] border border-[#D99A35]/25 flex items-center justify-center text-[#D99A35] mb-3.5 group-hover:scale-105 group-hover:bg-[#D99A35] group-hover:text-white transition-all">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-[#10243F] mb-1.5 leading-snug group-hover:text-[#D99A35] transition-colors">
                    {adv.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {adv.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Consultation Trigger */}
            <div className="mt-4 p-5 bg-[#FAF7F1] rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-[#10243F]">
                  Need personalized course advice for {country.countryName}?
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Our certified senior counselors will shortlist Dream, Target, and Safe universities matching your profile.
                </p>
              </div>
              <button
                onClick={() => onOpenCounselling(country.countryName)}
                className="px-5 py-2.5 rounded-full bg-[#10243F] hover:bg-[#D99A35] text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
              >
                Book Free Profile Evaluation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Top Partner Universities */}
      <section className="py-12 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D99A35] block mb-1">
                PREMIER INSTITUTIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#10243F] font-serif">
                Top Ranked Universities in {country.countryName}
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-sm">
              We represent top accredited universities across {country.countryName} with fast-tracked offer letters and application fee waivers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {country.universities.map((uni, idx) => (
              <div
                key={idx}
                className="bg-[#FAF7F1] rounded-2xl p-5 border border-slate-200/70 hover:border-[#D99A35]/50 hover:bg-white hover:shadow-card transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-[#10243F] text-[10px] font-bold">
                      {uni.qsRank}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Est. {uni.established}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#10243F] group-hover:text-[#D99A35] transition-colors leading-snug mb-1">
                    {uni.name}
                  </h3>
                  <p className="text-xs text-slate-500 mb-3">{uni.location}</p>

                  <div className="p-2.5 bg-white rounded-xl border border-slate-200/60 mb-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Top Faculties</p>
                    <p className="text-xs font-semibold text-[#10243F] mt-0.5">{uni.popularFor}</p>
                  </div>
                </div>

                <button
                  onClick={() => onOpenCounselling(`${uni.name} (${country.countryName})`)}
                  className="w-full py-2 rounded-xl bg-white border border-slate-300 hover:border-[#D99A35] hover:bg-[#FAF7F1] text-[#10243F] hover:text-[#D99A35] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Apply with MasterVisa</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Popular In-Demand Master's Programs */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D99A35] block mb-1">
            CAREER OUTCOMES
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#10243F] font-serif">
            High In-Demand Programs in {country.countryName}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {country.programs.map((prog, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-100">
                    Demand: {prog.inDemand}
                  </span>
                  <span className="text-[11px] text-slate-400">{prog.duration}</span>
                </div>
                <h4 className="text-sm font-bold text-[#10243F] leading-snug mb-2">
                  {prog.name}
                </h4>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 font-semibold uppercase">Avg Graduate Salary</p>
                <p className="text-xs font-extrabold text-[#D99A35] mt-0.5">{prog.avgSalary}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Visa Guidance & Work Rights Breakdown */}
      <section className="py-12 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D99A35] block mb-1">
                IMMIGRATION & WORK RIGHTS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#10243F] font-serif mb-4">
                Student Visa & Stay-Back in {country.countryName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Our certified visa department has guided over 10,000 students to successful visas with an audited 96%+ approval track record across major embassies.
              </p>

              <div className="p-4 bg-[#FAF7F1] rounded-2xl border border-slate-200/80 space-y-2">
                <p className="text-xs font-bold text-[#10243F] flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-[#D99A35]" /> MasterVisa End-to-End Filing
                </p>
                <p className="text-xs text-slate-500">
                  From financial affidavits and bank audits to official consular appointment bookings and mock interview drills.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#FAF7F1] rounded-3xl p-6 sm:p-7 border border-slate-200/80 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-100">
                  <p className="text-[11px] font-bold text-slate-400 uppercase">Official Visa Category</p>
                  <p className="text-sm font-bold text-[#10243F] mt-1">{country.visaInfo.visaType}</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100">
                  <p className="text-[11px] font-bold text-slate-400 uppercase">Part-Time Work Permission</p>
                  <p className="text-sm font-bold text-emerald-600 mt-1">{country.visaInfo.workDuringStudy}</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-100">
                <p className="text-[11px] font-bold text-slate-400 uppercase">Post-Study Work Permit (PSW)</p>
                <p className="text-sm font-bold text-[#D99A35] mt-1">{country.visaInfo.postStudyDuration}</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-100">
                <p className="text-[11px] font-bold text-slate-400 uppercase">Permanent Residency (PR) Pathway</p>
                <p className="text-xs font-semibold text-slate-700 mt-1 leading-relaxed">{country.visaInfo.prPathway}</p>
              </div>

              <div className="pt-2">
                <p className="text-xs font-bold text-[#10243F] mb-2">Key Highlights:</p>
                <ul className="space-y-1.5">
                  {country.visaInfo.keyHighlights.map((hl, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Admission & Visa Requirements Checklist */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D99A35] block mb-1">
            ELIGIBILITY CRITERIA
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#10243F] font-serif">
            Admission Requirements for {country.countryName}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Academic Background</h4>
            <p className="text-xs font-semibold text-[#10243F] leading-relaxed">{country.requirements.academic}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Globe2 className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">English Proficiency</h4>
            <p className="text-xs font-semibold text-[#10243F] leading-relaxed">{country.requirements.english}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Standardized Tests</h4>
            <p className="text-xs font-semibold text-[#10243F] leading-relaxed">{country.requirements.tests}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#D99A35] flex items-center justify-center mb-3">
              <DollarSign className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Proof of Funds</h4>
            <p className="text-xs font-semibold text-[#10243F] leading-relaxed">{country.requirements.financials}</p>
          </div>
        </div>
      </section>

      {/* 9. Frequently Asked Questions */}
      <section className="py-12 bg-white border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D99A35] block mb-1">
              HELP & ADVICE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#10243F] font-serif">
              Frequently Asked Questions: {country.countryName}
            </h2>
          </div>

          <div className="space-y-3">
            {country.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 overflow-hidden bg-[#FAF7F1] transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm font-bold text-[#10243F]">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#D99A35]' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-200/50 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. Destination Switcher Footer Navigation */}
      <section className="py-8 bg-[#FAF7F1] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            EXPLORE OTHER STUDY ABROAD DESTINATIONS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'usa', label: 'Study in USA' },
              { id: 'united-kingdom', label: 'Study in United Kingdom' },
              { id: 'canada', label: 'Study in Canada' },
              { id: 'australia', label: 'Study in Australia' },
              { id: 'europe', label: 'Study in Europe' },
              { id: 'new-zealand', label: 'Study in New Zealand' },
              { id: 'france', label: 'Study in France' },
              { id: 'ireland', label: 'Study in Ireland' },
            ].map((d) => (
              <Link
                key={d.id}
                to={`/destinations/${d.id}`}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  d.id === country.id
                    ? 'bg-[#10243F] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-[#D99A35] hover:bg-slate-50 border border-slate-200/80'
                }`}
              >
                {d.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Final CTA */}
      <FinalCta onOpenCounselling={() => onOpenCounselling(country.countryName)} />
    </div>
  );
};
