import type { Destination, Service, Testimonial, UniversityItem, NewsItem, FaqItem, Branch } from '../types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'usa',
    name: 'USA',
    flag: 'USA',
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'World-leading universities & global opportunities',
    popularUniversities: ['Stanford University', 'MIT', 'Harvard University', 'UC Berkeley'],
    avgTuition: '$25,000 - $55,000 / year',
    visaSuccessRate: '96%',
    workPermit: 'Up to 3 Years OPT for STEM',
    topCourses: ['MS Computer Science', 'MBA', 'Data Science', 'Biotechnology']
  },
  {
    id: 'uk',
    name: 'UK',
    flag: 'UK',
    image: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Globally recognized degrees and diverse programs',
    popularUniversities: ['Oxford', 'Cambridge', 'Imperial College', 'Leeds', 'Manchester'],
    avgTuition: '£15,000 - £35,000 / year',
    visaSuccessRate: '98%',
    workPermit: '2 Years Graduate Route (PSW)',
    topCourses: ['MSc Business Analytics', 'FinTech', 'AI & Robotics', 'International Law']
  },
  {
    id: 'canada',
    name: 'Canada',
    flag: 'Canada',
    image: 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'High-quality education and great career opportunities',
    popularUniversities: ['University of Toronto', 'UBC', 'McGill', 'Waterloo'],
    avgTuition: 'CAD 20,000 - 45,000 / year',
    visaSuccessRate: '94%',
    workPermit: 'Up to 3 Years PGWP',
    topCourses: ['Project Management', 'Computer Engineering', 'Finance', 'Supply Chain']
  },
  {
    id: 'australia',
    name: 'Australia',
    flag: 'Australia',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'World-class education and excellent post-study options',
    popularUniversities: ['University of Melbourne', 'UNSW Sydney', 'Univ of Sydney', 'Monash'],
    avgTuition: 'AUD 28,000 - 50,000 / year',
    visaSuccessRate: '95%',
    workPermit: '2 - 4 Years Post-Study Work',
    topCourses: ['Information Technology', 'Healthcare Administration', 'Cyber Security', 'Civil Eng']
  },
  {
    id: 'germany',
    name: 'Germany',
    flag: 'Germany',
    image: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Affordable education with strong career growth',
    popularUniversities: ['TU Munich', 'Heidelberg University', 'RWTH Aachen', 'TU Berlin'],
    avgTuition: '€0 - €3,000 / year (Low/No Tuition)',
    visaSuccessRate: '97%',
    workPermit: '18 Months Job Seeking Visa',
    topCourses: ['Automotive Engineering', 'Mechanical Systems', 'Renewable Energy', 'Embedded Systems']
  },
  {
    id: 'new-zealand',
    name: 'New Zealand',
    flag: 'New Zealand',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'High standard of living with globally accepted degrees',
    popularUniversities: ['University of Auckland', 'Univ of Otago', 'Victoria Univ of Wellington'],
    avgTuition: 'NZD 24,000 - 42,000 / year',
    visaSuccessRate: '96%',
    workPermit: '3 Years Open Work Visa',
    topCourses: ['Agribusiness', 'Environmental Science', 'Software Development', 'Hospitality']
  },
  {
    id: 'ireland',
    name: 'Ireland',
    flag: 'Ireland',
    image: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'European tech hub with booming job market',
    popularUniversities: ['Trinity College Dublin', 'University College Dublin', 'Univ of Galway'],
    avgTuition: '€12,000 - €26,000 / year',
    visaSuccessRate: '98%',
    workPermit: '2 Years Stay Back Visa',
    topCourses: ['Data Analytics', 'Pharmaceutical Sciences', 'Cloud Computing', 'Financial Risk']
  },
  {
    id: 'europe',
    name: 'Europe',
    flag: 'Europe',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'World-class universities, Schengen mobility, and low/zero tuition',
    popularUniversities: ['ETH Zurich', 'TU Munich', 'KU Leuven', 'TU Delft', 'Univ of Amsterdam'],
    avgTuition: '€0 - €15,000 / year (Low/No Tuition Options)',
    visaSuccessRate: '97%',
    workPermit: '18 Months - 2 Years EU Blue Card / Job Seeking',
    topCourses: ['Data Science & AI', 'Automotive Systems', 'Renewable Energy', 'International Business']
  }
];

export const CORE_SERVICES: Service[] = [
  {
    id: 'career-counselling',
    title: 'Career Counselling',
    description: 'Personalized 1-on-1 counseling to discover ideal courses, universities, and career pathways tailored to your academic profile and aspirations.',
    iconName: 'BarChart2',
    badgeBg: 'bg-purple-50',
    badgeColor: 'text-[#5B21B6]',
    features: ['1-on-1 Profile Mapping', 'STEM vs. Non-STEM Evaluation', 'Career ROI & Salary Benchmarking'],
    includes: [
      'Personalized one-on-one session with senior international education counselors',
      'In-demand STEM vs. Non-STEM course pathway evaluation and curriculum comparison',
      'Global employment trend analysis, starting salary benchmarks, and ROI calculations',
      'Post-study work permit (OPT, Graduate Route, PGWP) long-term planning'
    ],
    steps: [
      { step: '01', title: 'Profile Discovery', desc: 'Understanding your academic background, passions, and career vision.' },
      { step: '02', title: 'Industry Mapping', desc: 'Evaluating fast-growing global industries and employment sectors.' },
      { step: '03', title: 'Course Specialization', desc: 'Selecting specific academic specializations with proven industry demand.' },
      { step: '04', title: 'Career Roadmap', desc: 'Establishing actionable milestones for admission, internships, and graduation.' }
    ]
  },
  {
    id: 'test-preparation',
    title: 'Test Preparation',
    description: 'Expert coaching and diagnostic mock tests for IELTS, TOEFL, PTE, Duolingo, GRE, and GMAT with certified master trainers.',
    iconName: 'BookOpen',
    badgeBg: 'bg-emerald-50',
    badgeColor: 'text-[#047857]',
    features: ['Certified Master Faculty', 'Full-Length Diagnostic Mocks', 'Unlimited Doubt Clearing'],
    includes: [
      'Comprehensive study materials, official question banks, and simulated online test interfaces',
      'Personalized scoring evaluation with target band & percentile roadmaps',
      'Daily live sessions, recorded masterclasses, and weekend intensive review drills',
      'Exam booking assistance, voucher discounts, and free diagnostic evaluations'
    ],
    steps: [
      { step: '01', title: 'Diagnostic Assessment', desc: 'Free baseline diagnostic test to evaluate current score benchmarks and weaknesses.' },
      { step: '02', title: 'Targeted Curriculum', desc: 'Structured module breakdown across Reading, Writing, Listening, Speaking, and Quant.' },
      { step: '03', title: 'Full-Length Mock Drills', desc: 'Timed simulated exams recreating exact test-day pressure with instant analytics.' },
      { step: '04', title: 'Score Guarantee', desc: 'Final review drills and test-taking tips to hit target 7.5+ IELTS or 320+ GRE.' }
    ]
  },
  {
    id: 'application-process',
    title: 'Application Process',
    description: 'End-to-end university application management, portal submissions, compelling SOP and LOR crafting, and expedited offer letters.',
    iconName: 'GraduationCap',
    badgeBg: 'bg-blue-50',
    badgeColor: 'text-[#1E40AF]',
    features: ['Direct University Applications', 'Offer Letter Expedited Follow-up', 'Application Fee Waivers'],
    includes: [
      'Comprehensive profile evaluation & strategic university shortlisting across Dream, Target, and Safe institutions',
      'Statement of Purpose (SOP) narrative structuring, essay brainstorming, and expert proofreading',
      'Letters of Recommendation (LOR) formatting, resume / CV polish, and transcript verification',
      'Direct institutional portal submissions with university fee waiver representation and offer tracking'
    ],
    steps: [
      { step: '01', title: 'Shortlisting', desc: 'Curating Dream, Target, and Safe institutions across top destinations.' },
      { step: '02', title: 'Document Polish', desc: 'Drafting high-impact, plagiarism-free SOPs and academic LORs.' },
      { step: '03', title: 'Portal Dispatch', desc: 'Preparing and dispatching verified applications with fee-waiver representation.' },
      { step: '04', title: 'Offer Letter Acceptance', desc: 'Guiding through admission acceptance, tuition deposits, and I-20 / CAS issuance.' }
    ]
  },
  {
    id: 'loan-assistance',
    title: 'Loan Assistance',
    description: 'Hassle-free collateral and non-collateral education loan sanctions with top public and private national banks at lowest interest rates.',
    iconName: 'BadgePercent',
    badgeBg: 'bg-amber-50',
    badgeColor: 'text-[#D99A35]',
    features: ['Collateral & Non-Collateral Loans', 'Pre-Visa Loan Sanctions', 'Fast 48-Hour Approvals'],
    includes: [
      'Ties with top national banks, NBFCs, and international USD education loan lenders',
      'Unsecured non-collateral loan sanctions up to ₹75 Lakhs / $100,000 for top global universities',
      'Pre-visa disbursement letters and financial solvency certificates accepted by embassies',
      'Tax deduction optimization under Section 80E with lowest available interest margins'
    ],
    steps: [
      { step: '01', title: 'Eligibility Check', desc: 'Evaluating co-applicant income, CIBIL score, and university ranking for loan limits.' },
      { step: '02', title: 'Lender Matching', desc: 'Comparing collateral vs. non-collateral lenders for lowest interest rates and zero processing fees.' },
      { step: '03', title: 'Digital Documentation', desc: 'Rapid paperless document collection and doorstep financial verification.' },
      { step: '04', title: 'Sanction & Disbursal', desc: 'Receiving formal sanction letter for visa filing and timely tuition fee wire transfer.' }
    ]
  },
  {
    id: 'mock-interviews',
    title: 'Mock Interviews',
    description: '1-on-1 intensive consular interview drills, university admission defense, and behavioral coaching for guaranteed visa confidence.',
    iconName: 'UserCheck',
    badgeBg: 'bg-indigo-50',
    badgeColor: 'text-[#4338CA]',
    features: ['Simulated Embassy Drills', 'Consular Behavioral Coaching', '1-on-1 Video Recordings & Feedback'],
    includes: [
      'Tailored question banks customized to your destination (US F-1 consular, UK credibility, Germany visa, France Campus)',
      'Intensive non-immigrant intent alignment, home-tie justification, and career progression defense',
      'Simulated counter-questioning on university selection, gap years, backlogs, and financial documentation',
      'Live recorded video drill sessions with detailed performance analysis and body language guidance'
    ],
    steps: [
      { step: '01', title: 'Profile Analysis', desc: 'Scrutinizing DS-160, I-20, or visa dossier to anticipate consular scrutiny points.' },
      { step: '02', title: 'Question Bank Prep', desc: 'Drafting authentic, non-scripted answers for academics, finances, and post-study plans.' },
      { step: '03', title: 'Simulated Consular Drills', desc: 'Realistic high-pressure mock interview simulations replicating embassy counters.' },
      { step: '04', title: 'Confidence Polish', desc: 'Fine-tuning voice clarity, eye contact, and concise delivery for interview day.' }
    ]
  },
  {
    id: 'visa-guidance',
    title: 'Visa Guidance',
    description: 'Complete student visa guidance covering official forms, financial evidence audits, biometrics scheduling, and embassy compliance.',
    iconName: 'FileText',
    badgeBg: 'bg-rose-50',
    badgeColor: 'text-[#BE123C]',
    features: ['Complete Documentation Checklists', 'Financial Evidence Audits', 'Embassy Slot Booking Assistance'],
    includes: [
      'End-to-end guidance for US (F-1), UK, Canada (SDS), Australia (Subclass 500), and European student visas',
      'Financial evidence structuring, sponsor affidavits, CA valuation reports & liquid proof of funds checklists',
      'Official portal form assistance (DS-160, VFS, IRCC, ImmiAccount) and biometric slot scheduling',
      'Comprehensive visa dossier review ensuring 100% compliance with current consular guidelines'
    ],
    steps: [
      { step: '01', title: 'Document Checklist', desc: 'Receiving a tailored document checklist aligned with current embassy requirements.' },
      { step: '02', title: 'Financial Audit', desc: 'Detailed review of bank statements, loan sanction letters, and sponsorship proof.' },
      { step: '03', title: 'Filing & Biometrics', desc: 'Completing official visa application forms and booking consular appointment slots.' },
      { step: '04', title: 'Embassy Submission', desc: 'Final dossier verification and guidance on biometric submission.' }
    ]
  },
  {
    id: 'pre-departure-orientation',
    title: 'Pre-Departure Orientation',
    description: 'Essential pre-flight briefing covering flight bookings, student forex cards, luggage packing, customs clearance, and campus life.',
    iconName: 'PlaneTakeoff',
    badgeBg: 'bg-cyan-50',
    badgeColor: 'text-[#0E7490]',
    features: ['Packing & Travel Checklists', 'Forex Cards & International Banking', 'Customs & Port-of-Entry Briefings'],
    includes: [
      'Comprehensive pre-departure orientation session on local culture, university life, climate, and laws',
      'Discounted student airfares with extra baggage allowances (up to 46kg) via partner airlines',
      'Multi-currency zero-markup student forex cards, wire transfers, and international bank account opening',
      'Port-of-entry customs clearance checklists, immigration questioning tips, and emergency contacts'
    ],
    steps: [
      { step: '01', title: 'Orientation Briefing', desc: 'Essential briefing covering local laws, culture, climate, and campus regulations.' },
      { step: '02', title: 'Flight & Baggage Setup', desc: 'Booking student discounted flights with verified extra baggage allowances.' },
      { step: '03', title: 'Forex & Banking', desc: 'Setting up zero-markup student forex cards and student travel discounts.' },
      { step: '04', title: 'Port of Entry Kit', desc: 'Structuring your travel folder with immigration documents and immunization records.' }
    ]
  },
  {
    id: 'free-training',
    title: 'Free Training',
    description: 'Complimentary demo masterclasses, IELTS & GRE foundation bootcamps, spoken English accent polish, and free interview practice workshops.',
    iconName: 'Sparkles',
    badgeBg: 'bg-amber-50',
    badgeColor: 'text-[#D99A35]',
    features: ['100% Free Demo Masterclasses', 'Live Trainer Q&A Sessions', 'Free Practice Tests & Materials'],
    includes: [
      'Free IELTS & TOEFL foundation masterclasses covering all 4 modules with certified British Council / ETS trainers',
      'GRE & GMAT quant shortcut workshops and verbal critical reasoning masterclasses',
      'Complimentary spoken English coaching, pronunciation drills, and corporate communication polish',
      'Free visa mock drill workshops and diagnostic profile scorecards for university admissions'
    ],
    steps: [
      { step: '01', title: 'Free Registration', desc: 'Instant access to upcoming live masterclasses and recorded foundation sessions.' },
      { step: '02', title: 'Diagnostic Test', desc: 'Complimentary full-length mock assessment with detailed score band breakdown.' },
      { step: '03', title: 'Live Masterclasses', desc: 'Interactive strategy sessions with senior trainers covering proven test shortcuts.' },
      { step: '04', title: '1-on-1 Feedback', desc: 'Individual doubt-clearing consultation and personalized study schedule.' }
    ]
  },
  {
    id: 'pickup-accommodation',
    title: 'Airport Pickup & Accommodation',
    description: 'Guaranteed safe airport reception, verified student housing, and hassle-free relocation settlement.',
    iconName: 'Home',
    badgeBg: 'bg-amber-50',
    badgeColor: 'text-[#D99A35]',
    features: ['Airport Meet & Greet', 'Verified Student Housing', 'Local Settlement Support'],
    includes: [
      'Dedicated on-ground airport reception and direct transfer to your booked student accommodation',
      'Assistance securing verified on-campus dorms and vetted off-campus student apartments',
      'Lease contract verification, tenancy deposit protection, and utility setup advice',
      'Arrival essentials: International SIM card activation, transit pass, and student bank account opening'
    ],
    steps: [
      { step: '01', title: 'Housing Matching', desc: 'Curating safe, budget-friendly accommodations with verified proximity to campus.' },
      { step: '02', title: 'Lease & Booking', desc: 'Securing tenancy agreements with trusted student housing providers.' },
      { step: '03', title: 'Flight & Pickup Sync', desc: 'Scheduling chauffeur/rep pickup synchronized with your flight landing time.' },
      { step: '04', title: 'Settlement & Welcome', desc: 'Welcoming you upon arrival, keys handover, and neighborhood orientation.' }
    ]
  },
  {
    id: 'corporate-internships',
    title: 'Corporate Internships & Co-op',
    description: 'Vetted global corporate internships, CPT/co-op guidance, ATS resume optimization, portfolio improvement, and technical mock interviews.',
    iconName: 'Briefcase',
    badgeBg: 'bg-teal-50',
    badgeColor: 'text-[#0D9488]',
    features: ['Vetted Global Internships', 'CPT & Co-op Guidance', 'Technical Mock Interviews'],
    includes: [
      'Access to vetted global corporate internships, Fortune 500, and technology job listings',
      'Curricular Practical Training (CPT) and university co-op work authorization guidance',
      'ATS resume optimization, engineering/business portfolio improvement, and LinkedIn polish',
      '1-on-1 technical mock interview drill sessions, behavioral coding drills, and offer negotiations'
    ],
    steps: [
      { step: '01', title: 'Profile & Portfolio Audit', desc: 'Evaluating technical skills, projects, and target industry domains for corporate roles.' },
      { step: '02', title: 'ATS Resume & Profile Polish', desc: 'Optimizing your CV for global ATS filters and showcasing GitHub / case studies.' },
      { step: '03', title: 'CPT & Co-op Compliance', desc: 'Navigating university credit requirements, advisor approvals, and legal CPT authorization.' },
      { step: '04', title: 'Technical Mock Drills', desc: 'Simulating multi-round technical and behavioral interviews with experienced industry mentors.' }
    ]
  },
  {
    id: 'part-time-jobs',
    title: 'Part-Time Jobs & Student Work Rights',
    description: 'Student work authorization guidance, on-campus jobs, TA/RA opportunities, SSN/NIN/TFN setup guidance, and local job search strategies.',
    iconName: 'Clock',
    badgeBg: 'bg-sky-50',
    badgeColor: 'text-[#0284C7]',
    features: ['Student Work Rights Guidance', 'On-Campus TA / RA Opportunities', 'SSN / NIN / TFN Setup'],
    includes: [
      'Official student visa work authorization guidelines (20-24 hrs/week term-time, full-time during vacations)',
      'Strategic guidance for securing high-demand on-campus positions (Teaching Assistant, Research Assistant, campus library & admin)',
      'Step-by-step national tax identifier registration guidance (SSN in US, NIN in UK, TFN in Australia)',
      'Local student job search strategies, hourly wage optimization, and workplace compliance'
    ],
    steps: [
      { step: '01', title: 'Work Rights Briefing', desc: 'Reviewing host-country visa regulations, weekly hour ceilings, and legal employment boundaries.' },
      { step: '02', title: 'TA / RA & Campus Search', desc: 'Connecting with university job boards, faculty departments, and assistantship openings.' },
      { step: '03', title: 'SSN / NIN / TFN Registration', desc: 'Structuring required documentation and appointment bookings for legal tax identifier setup.' },
      { step: '04', title: 'Local Job Search Strategy', desc: 'Targeting verified flexible student employers, hourly rate benchmarking, and interview prep.' }
    ]
  }
];

export const SERVICES: Service[] = [
  ...CORE_SERVICES,
  {
    id: 'test-prep',
    title: 'Test Preparation',
    description: 'IELTS, TOEFL, GRE, GMAT, SAT and more.',
    iconName: 'BookOpen',
    badgeBg: 'bg-emerald-50',
    badgeColor: 'text-emerald-500',
    features: ['Certified Master Trainers', 'Mock Diagnostic Exams', 'Personalized Doubt Clearing']
  },
  {
    id: 'loan-assistance',
    title: 'Loan Assistance',
    description: 'Education loan guidance and financial support.',
    iconName: 'BadgePercent',
    badgeBg: 'bg-amber-50',
    badgeColor: 'text-amber-500',
    features: ['Collateral & Non-Collateral', 'Lowest Interest Rate Ties', 'Fast-Track Sanctions']
  }
];

export const WHY_CHOOSE_ITEMS = [
  'Free & Personalized Counselling',
  'Top Universities Worldwide',
  'Scholarship Assistance',
  'Loan & Financial Support',
  'High Visa Success Rate',
  'Experienced Counsellors',
  'Application & Documentation',
  'Pre-Departure Guidance',
  'Airport Pickup & Accommodation',
  'Corporate Internships & Co-op',
  'Part-Time Jobs & Student Work Rights',
  'Post-Landing Support',
  'End-to-End Assistance'
];

export const JOURNEY_STEPS = [
  { step: '01', title: 'Counselling', icon: 'Compass', desc: 'Understanding your academic background & career goals' },
  { step: '02', title: 'Profile Evaluation', icon: 'UserCheck', desc: 'Detailed scoring of GPA, scores & profile strengths' },
  { step: '03', title: 'Course Selection', icon: 'BookMarked', desc: 'Targeting programs with highest employability' },
  { step: '04', title: 'University Shortlisting', icon: 'Building2', desc: 'Categorizing Dream, Reach and Safe universities' },
  { step: '05', title: 'Application', icon: 'Send', desc: 'Crafting stellar SOPs, essays and document kits' },
  { step: '06', title: 'Offer Letter', icon: 'MailCheck', desc: 'Securing conditional and unconditional admission offers' },
  { step: '07', title: 'Visa Guidance', icon: 'Stamp', desc: 'Financial dossier preparation & visa interview drills' },
  { step: '08', title: 'Pre-Departure', icon: 'Plane', desc: 'Flights, forex, accommodation & packing checklist' },
  { step: '09', title: 'Arrival Support', icon: 'Award', desc: 'Airport welcome, SIM activation and community connect' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    university: 'University of Leeds',
    country: 'UK',
    flag: 'UK',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    quote: 'Masters Visa made my dream of studying in the UK a reality. The entire process was smooth, professional and completely stress-free.',
    rating: 5,
    course: 'MSc Data Science & AI'
  },
  {
    id: '2',
    name: 'Rohit Kumar',
    university: 'University of Toronto',
    country: 'Canada',
    flag: 'Canada',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    quote: 'Very professional and supportive team. They guided me with applications, visa process and even finding student accommodation in Toronto.',
    rating: 5,
    course: 'Master of Engineering'
  },
  {
    id: '3',
    name: 'Anitha Reddy',
    university: 'University of Melbourne',
    country: 'Australia',
    flag: 'Australia',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    quote: 'The counselling was excellent and their support was amazing from application to visa and pre-departure. Best education consultancy!',
    rating: 5,
    course: 'Master of International Business'
  }
];

export const UNIVERSITIES: UniversityItem[] = [
  // ─── 1. USA (Top 3) ──────────────────────────────────────────
  {
    id: 'harvard',
    name: 'Harvard University',
    country: 'USA',
    flag: 'USA',
    logoType: 'harvard',
    logoUrl: '/images/universities_logos/usa_0948_harvard_university.png',
    qsRank: '#1 US News • Top 4 World',
    established: '1636'
  },
  {
    id: 'stanford',
    name: 'Stanford University',
    country: 'USA',
    flag: 'USA',
    logoType: 'stanford',
    logoUrl: '/images/universities_logos/usa_2058_stanford_university.png',
    qsRank: '#2 US News • Top 5 World',
    established: '1885'
  },
  {
    id: 'mit',
    name: 'Massachusetts Institute of Technology (MIT)',
    country: 'USA',
    flag: 'USA',
    logoType: 'mit',
    logoUrl: '/images/universities_logos/usa_1283_massachusetts_institute_of_technology.png',
    qsRank: 'QS #1 World',
    established: '1861'
  },

  // ─── 2. United Kingdom (Top 3) ─────────────────────────────────
  {
    id: 'oxford',
    name: 'University of Oxford',
    country: 'UK',
    flag: 'UK',
    logoType: 'oxford',
    logoUrl: '/images/universities_logos/europe_2654_university_of_oxford.png',
    qsRank: 'QS #3 World • #1 UK',
    established: '1096'
  },
  {
    id: 'cambridge',
    name: 'University of Cambridge',
    country: 'UK',
    flag: 'UK',
    logoType: 'cambridge',
    logoUrl: '/images/universities_logos/uk_0088_university_of_cambridge.png',
    qsRank: 'QS #5 World • #2 UK',
    established: '1209'
  },
  {
    id: 'imperial',
    name: 'Imperial College London',
    country: 'UK',
    flag: 'UK',
    logoType: 'imperial',
    logoUrl: '/images/universities_logos/uk_0035_imperial_college_london.png',
    qsRank: 'QS #2 World • #3 UK',
    established: '1907'
  },

  // ─── 3. Canada (Top 3) ─────────────────────────────────────────
  {
    id: 'toronto',
    name: 'University of Toronto',
    country: 'Canada',
    flag: 'Canada',
    logoType: 'toronto',
    logoUrl: '/images/universities_logos/canada_0091_university_of_toronto.png',
    qsRank: 'QS #25 World • #1 Canada',
    established: '1827'
  },
  {
    id: 'mcgill',
    name: 'McGill University',
    country: 'Canada',
    flag: 'Canada',
    logoType: 'mcgill',
    logoUrl: '/images/universities_logos/canada_0042_mcgill_university.png',
    qsRank: 'QS #29 World • #2 Canada',
    established: '1821'
  },
  {
    id: 'ubc',
    name: 'University of British Columbia (UBC)',
    country: 'Canada',
    flag: 'Canada',
    logoType: 'ubc',
    logoUrl: '/images/universities_logos/canada_0076_university_of_british_columbia.png',
    qsRank: 'QS #38 World • #3 Canada',
    established: '1908'
  },

  // ─── 4. Australia (Top 3) ──────────────────────────────────────
  {
    id: 'melbourne',
    name: 'The University of Melbourne',
    country: 'Australia',
    flag: 'Australia',
    logoType: 'melbourne',
    logoUrl: '/images/universities_logos/australia_0028_university_of_melbourne.svg',
    qsRank: 'QS #13 World • #1 Australia',
    established: '1853'
  },
  {
    id: 'sydney',
    name: 'The University of Sydney',
    country: 'Australia',
    flag: 'Australia',
    logoType: 'sydney',
    logoUrl: '/images/universities_logos/australia_0035_university_of_sydney.svg',
    qsRank: 'QS #18 World • #2 Australia',
    established: '1850'
  },
  {
    id: 'unsw',
    name: 'UNSW Sydney',
    country: 'Australia',
    flag: 'Australia',
    logoType: 'unsw',
    logoUrl: '/images/universities_logos/australia_0030_university_of_new_south_wales.svg',
    qsRank: 'QS #19 World • #3 Australia',
    established: '1949'
  },

  // ─── 5. New Zealand (Top 3) ────────────────────────────────────
  {
    id: 'auckland',
    name: 'The University of Auckland',
    country: 'New Zealand',
    flag: 'New Zealand',
    logoType: 'auckland',
    logoUrl: '/images/universities_logos/new_zealand_0004_university_of_auckland.png',
    qsRank: 'QS #65 World • #1 NZ',
    established: '1883'
  },
  {
    id: 'otago',
    name: 'University of Otago',
    country: 'New Zealand',
    flag: 'New Zealand',
    logoType: 'otago',
    logoUrl: '/images/universities_logos/new_zealand_0006_university_of_otago.png',
    qsRank: 'QS #214 World • #2 NZ',
    established: '1869'
  },
  {
    id: 'victoria_wgtn',
    name: 'Victoria University of Wellington',
    country: 'New Zealand',
    flag: 'New Zealand',
    logoType: 'victoria_wgtn',
    logoUrl: '/images/universities_logos/new_zealand_0008_victoria_university_of_wellington.png',
    qsRank: 'QS #244 World • #3 NZ',
    established: '1897'
  },

  // ─── 6. Ireland (Top 3) ────────────────────────────────────────
  {
    id: 'trinity',
    name: 'Trinity College Dublin (TCD)',
    country: 'Ireland',
    flag: 'Ireland',
    logoType: 'trinity',
    logoUrl: '/images/universities_logos/ireland_0011_trinity_college_dublin_university_of_dublin.png',
    qsRank: 'QS #87 World • #1 Ireland',
    established: '1592'
  },
  {
    id: 'ucd',
    name: 'University College Dublin (UCD)',
    country: 'Ireland',
    flag: 'Ireland',
    logoType: 'ucd',
    logoUrl: '/images/universities_logos/ireland_0013_university_college_dublin.png',
    qsRank: 'QS #126 World • #2 Ireland',
    established: '1854'
  },
  {
    id: 'galway',
    name: 'University of Galway',
    country: 'Ireland',
    flag: 'Ireland',
    logoType: 'galway',
    logoUrl: '/images/universities_logos/ireland_0014_university_of_galway.png',
    qsRank: 'QS #273 World • #3 Ireland',
    established: '1845'
  },

  // ─── 7. Germany (Top 3) ────────────────────────────────────────
  {
    id: 'tum',
    name: 'Technical University of Munich (TUM)',
    country: 'Germany',
    flag: 'Germany',
    logoType: 'tum',
    logoUrl: '/images/universities_logos/germany_0338_technische_universit_t_m_nchen.png',
    qsRank: 'QS #28 World • #1 Germany',
    established: '1868'
  },
  {
    id: 'lmu',
    name: 'Ludwig Maximilian University of Munich (LMU)',
    country: 'Germany',
    flag: 'Germany',
    logoType: 'lmu',
    logoUrl: '/images/universities_logos/germany_0258_ludwig_maximilians_univer_sit_t_m_nchen.png',
    qsRank: 'QS #54 World • #2 Germany',
    established: '1472'
  },
  {
    id: 'heidelberg',
    name: 'Heidelberg University',
    country: 'Germany',
    flag: 'Germany',
    logoType: 'heidelberg',
    logoUrl: '/images/universities_logos/germany_0300_ruprecht_karls_universit_t_heidelberg.png',
    qsRank: 'QS #87 World • #3 Germany',
    established: '1386'
  },

  // ─── 8. France (Top 3) ─────────────────────────────────────────
  {
    id: 'polytechnique',
    name: 'École Polytechnique (IP Paris)',
    country: 'France',
    flag: 'France',
    logoType: 'polytechnique',
    logoUrl: '/images/universities_logos/europe_0678_cole_polytechnique.png',
    qsRank: 'QS #46 World • #1 Tech France',
    established: '1794'
  },
  {
    id: 'sorbonne',
    name: 'Sorbonne University',
    country: 'France',
    flag: 'France',
    logoType: 'sorbonne',
    logoUrl: '/images/universities_logos/europe_0577_sorbonne_universit_facult_des_sciences_paris_vi.png',
    qsRank: 'QS #63 World • #1 Comprehensive',
    established: '1257'
  },
  {
    id: 'hec',
    name: 'HEC Paris',
    country: 'France',
    flag: 'France',
    logoType: 'hec',
    logoUrl: '/images/universities_logos/europe_0676_cole_des_hautes_tudes_commerciales_hec_business_school.png',
    qsRank: 'FT #1 Europe Business',
    established: '1881'
  }
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'news-1',
    category: 'Study Abroad',
    categoryColor: 'bg-rose-500 text-white',
    date: 'Apr 12, 2026',
    title: 'Germany is now the second most popular study destination for international students',
    image: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&w=800&q=80',
    readTime: '4 min read',
    summary: 'With zero tuition fees at public universities and expanding English-taught Master programs, Germany sees unprecedented student enrollments.'
  },
  {
    id: 'news-2',
    category: 'UK Visa',
    categoryColor: 'bg-blue-600 text-white',
    date: 'Mar 28, 2026',
    title: 'UK Student Visa Updates: Key Changes You Should Know Before Applying',
    image: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=800&q=80',
    readTime: '5 min read',
    summary: 'The UK Home Office outlines vital pointers regarding maintenance fund requirements, CAS deadlines, and the Graduate Route PSW extension.'
  },
  {
    id: 'news-3',
    category: 'Canada',
    categoryColor: 'bg-orange-500 text-white',
    date: 'Mar 15, 2026',
    title: 'Canada Student Visa Processing Times: Latest Official Updates & Tips',
    image: 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&w=800&q=80',
    readTime: '3 min read',
    summary: 'Understand the latest IRCC provincial attestation letter (PAL) guidelines, biometric appointment scheduling, and fast-track processing.'
  },
  {
    id: 'news-4',
    category: 'Scholarships',
    categoryColor: 'bg-sky-500 text-white',
    date: 'Mar 10, 2026',
    title: 'Top Scholarships for International Students: Deadlines, Eligibility & How to Win',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    readTime: '6 min read',
    summary: 'A comprehensive curated guide to Chevening, Fulbright, DAAD, Erasmus Mundus, and university-specific merit grants covering 100% tuition.'
  }
];

export const FAQS: FaqItem[] = [
  {
    question: 'What services does Masters Visa provide?',
    answer: 'Masters Visa provides end-to-end global education consulting including profile evaluation, career guidance, university shortlisting, application & SOP editing, education loan assistance, consular visa interview training, and post-arrival accommodation support.'
  },
  {
    question: 'Which countries can I study in?',
    answer: 'We assist students in securing admissions across 35+ top study destinations including the USA, UK, Canada, Australia, Germany, France, Ireland, New Zealand, Netherlands, Sweden, and Singapore.'
  },
  {
    question: 'Do you provide IELTS/TOEFL classes?',
    answer: 'Yes! We provide rigorous classroom and online training for IELTS, TOEFL, PTE, GRE, and GMAT with certified master faculty, comprehensive mock tests, and personalized performance feedback.'
  },
  {
    question: 'How does the application process work?',
    answer: 'Our 9-step streamlined roadmap starts with a free profile assessment, followed by choosing right-fit universities, perfecting your SOP/LORs, tracking admission offers, locking scholarships, and submitting airtight visa dossiers.'
  },
  {
    question: 'Do you provide education loan assistance?',
    answer: 'Yes, we have established direct partnerships with leading nationalized and private banks as well as NBFCs to help you secure collateral and non-collateral education loans with the fastest sanction times and lowest interest rates.'
  },
  {
    question: 'Can you help with offer letters?',
    answer: 'Absolutely. We hold direct partnerships with 1,200+ top-ranked international universities, ensuring prioritized processing, application fee waivers where available, and faster conditional/unconditional offer rollouts.'
  },
  {
    question: 'How long does visa processing take?',
    answer: 'Visa processing durations vary by country: UK student visas typically take 2-3 weeks, USA F-1 approvals occur immediately upon interview, Canada requires 4-8 weeks, and Germany typically requires 6-10 weeks. We guide you well in advance to avoid last-minute delays.'
  },
  {
    question: 'Where are your branches located?',
    answer: 'Our flagship centres are located in Nellore, Hyderabad, Vijayawada, Bangalore, Chennai, and Visakhapatnam. We also offer full virtual counselling to students worldwide via HD video appointments.'
  }
];

export const BRANCHES: Branch[] = [
  {
    id: 'nellore',
    city: 'Nellore',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
    address: '123, Education Square, Trunk Road, Nellore, AP - 524001',
    phone: '+91 81858 83705',
    email: 'nellore@mastersvisa.com',
    isHeadquarter: true
  },
  {
    id: 'hyderabad',
    city: 'Hyderabad',
    image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=600&q=80',
    address: 'Level 4, Cyber Gateway, Hitec City, Hyderabad, TS - 500081',
    phone: '+91 81858 83706',
    email: 'hyderabad@mastersvisa.com'
  },
  {
    id: 'vijayawada',
    city: 'Vijayawada',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80',
    address: 'MG Road, Opposite Gateway Hotel, Vijayawada, AP - 520010',
    phone: '+91 81858 83707',
    email: 'vijayawada@mastersvisa.com'
  },
  {
    id: 'bangalore',
    city: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80',
    address: 'Brigade Road, Ashok Nagar, Bengaluru, KA - 560025',
    phone: '+91 81858 83708',
    email: 'bangalore@mastersvisa.com'
  },
  {
    id: 'chennai',
    city: 'Chennai',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
    address: 'Anna Salai, Mount Road, Teynampet, Chennai, TN - 600018',
    phone: '+91 81858 83709',
    email: 'chennai@mastersvisa.com'
  },
  {
    id: 'visakhapatnam',
    city: 'Visakhapatnam',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    address: 'Dwaraka Nagar, Main Road, Visakhapatnam, AP - 530016',
    phone: '+91 81858 83710',
    email: 'vizag@mastersvisa.com'
  }
];
