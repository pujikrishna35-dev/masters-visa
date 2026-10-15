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
    id: 'france',
    name: 'France',
    flag: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Quality education with rich culture and innovation',
    popularUniversities: ['HEC Paris', 'Sorbonne University', 'INSEAD', 'École Polytechnique'],
    avgTuition: '€4,000 - €18,000 / year',
    visaSuccessRate: '95%',
    workPermit: '2 Years APS Visa',
    topCourses: ['Luxury Brand Management', 'Culinary Arts', 'Aeronautical Eng', 'Finance']
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
  }
];

export const CORE_SERVICES: Service[] = [
  {
    id: 'admissions',
    title: 'University Admissions',
    description: 'Get guidance on university selection, course applications, admission requirements, and offer letters.',
    iconName: 'GraduationCap',
    badgeBg: 'bg-blue-50',
    badgeColor: 'text-[#1E40AF]',
    features: ['Direct University Applications', 'Offer Letter Expedited Follow-up', 'Application Fee Waivers'],
    includes: [
      'Comprehensive profile evaluation & strategic university shortlisting',
      'Assistance with university application portals and required documentation',
      'Eligibility verification, prerequisite mapping, and deadline calendars',
      'Tracking and securing conditional and unconditional offer letters'
    ],
    steps: [
      { step: '01', title: 'Profile Assessment', desc: 'Evaluating academic background, GPA, and test scores to establish target parameters.' },
      { step: '02', title: 'University Shortlisting', desc: 'Curating Dream, Target, and Safe institutions across top global destinations.' },
      { step: '03', title: 'Application Dispatch', desc: 'Preparing and dispatching verified applications with institutional fee-waiver representation.' },
      { step: '04', title: 'Offer Letter Acceptance', desc: 'Guiding through admission acceptance, tuition deposits, and I-20 / CAS issuance.' }
    ]
  },
  {
    id: 'visa',
    title: 'Student Visa Assistance',
    description: 'Get guidance on visa applications, required documents, financial evidence, and interview preparation.',
    iconName: 'FileText',
    badgeBg: 'bg-rose-50',
    badgeColor: 'text-[#BE123C]',
    features: ['Complete Documentation Checklists', 'Financial Evidence Audits', '1-on-1 Mock Consular Interviews'],
    includes: [
      'End-to-end guidance for US (F-1), UK, Canada, Australia, and European student visas',
      'Financial evidence structuring, sponsor affidavits & proof of funds checklists',
      'Official form assistance (DS-160, VFS, ImmiAccount) and appointment booking',
      'Intensive 1-on-1 consular interview preparation and behavioral mock drills'
    ],
    steps: [
      { step: '01', title: 'Document Checklist', desc: 'Receiving a tailored document checklist aligned with current embassy requirements.' },
      { step: '02', title: 'Financial Audit', desc: 'Detailed review of bank statements, loan sanction letters, and sponsorship proof.' },
      { step: '03', title: 'Filing & Biometrics', desc: 'Completing official visa application forms and booking consular appointment slots.' },
      { step: '04', title: 'Mock Interview Prep', desc: 'Practicing simulated embassy interview drills to build confidence and readiness.' }
    ]
  },
  {
    id: 'document',
    title: 'Documentation & SOP Guidance',
    description: 'Assistance with SOPs, LORs, CVs, document checklists, and application paperwork.',
    iconName: 'FolderCheck',
    badgeBg: 'bg-emerald-50',
    badgeColor: 'text-[#047857]',
    features: ['SOP Brainstorming & Polishing', 'LOR Structural Frameworks', 'Plagiarism & Quality Checks'],
    includes: [
      'Statement of Purpose (SOP) brainstorming, narrative structuring, and editorial polishing',
      'Letters of Recommendation (LOR) formatting and academic alignment',
      'International standard CV / Resume restructuring tailored to university guidelines',
      'Transcripts, notarizations, and official document compliance checklists'
    ],
    steps: [
      { step: '01', title: 'Brainstorming Session', desc: 'Uncovering your individual milestones, motivations, and unique story.' },
      { step: '02', title: 'Narrative Framing', desc: 'Drafting structured outlines that directly address university-specific prompts.' },
      { step: '03', title: 'Editorial Review', desc: 'Line-by-line editorial feedback focusing on flow, academic tone, and impact.' },
      { step: '04', title: 'Plagiarism-Free Polish', desc: 'Thorough grammar review and final compliance check for portal upload.' }
    ]
  },
  {
    id: 'counselling',
    title: 'Career & Course Counselling',
    description: 'Find suitable courses and universities aligned with your academic background and career goals.',
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
    id: 'predeparture',
    title: 'Pre-Departure Support',
    description: 'Prepare for your international journey with travel checklists, accommodation guidance, and practical advice.',
    iconName: 'PlaneTakeoff',
    badgeBg: 'bg-cyan-50',
    badgeColor: 'text-[#0E7490]',
    features: ['Accommodation Sourcing', 'Forex & Banking Advice', 'Pre-Flight Document Briefs'],
    includes: [
      'Verified student accommodation guidance (on-campus dorms & verified off-campus housing)',
      'Student forex cards, international bank accounts, and health insurance guidance',
      'Student baggage allowances, transit rules, and discounted flight booking advice',
      'Comprehensive pre-flight packing checklist, arrival customs, and emergency networks'
    ],
    steps: [
      { step: '01', title: 'Orientation Briefing', desc: 'Essential briefing covering local laws, culture, climate, and currency.' },
      { step: '02', title: 'Housing Guidance', desc: 'Assistance in reviewing vetted student residences close to university campuses.' },
      { step: '03', title: 'Forex & Travel Setup', desc: 'Setting up zero-markup student forex cards and student travel discounts.' },
      { step: '04', title: 'Pre-Flight Folder Check', desc: 'Final audit of travel documents, immunization records, and arrival logistics.' }
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
  },
  {
    id: 'part-time-job',
    title: 'Part-Time Job Assistance',
    description: 'Support for part-time employment opportunities.',
    iconName: 'Briefcase',
    badgeBg: 'bg-indigo-50',
    badgeColor: 'text-indigo-500',
    features: ['Local Resume Templates', 'Campus Job Fair Prep', 'Legal Hourly Regulations Guide']
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
  {
    id: 'oxford',
    name: 'University of Oxford',
    country: 'UK',
    flag: 'UK',
    logoType: 'oxford',
    qsRank: 'Top 3 World',
    established: '1096'
  },
  {
    id: 'cambridge',
    name: 'University of Cambridge',
    country: 'UK',
    flag: 'UK',
    logoType: 'cambridge',
    qsRank: 'Top 5 World',
    established: '1209'
  },
  {
    id: 'toronto',
    name: 'University of Toronto',
    country: 'Canada',
    flag: 'Canada',
    logoType: 'toronto',
    qsRank: '#1 in Canada',
    established: '1827'
  },
  {
    id: 'melbourne',
    name: 'University of Melbourne',
    country: 'Australia',
    flag: 'Australia',
    logoType: 'melbourne',
    qsRank: '#1 in Australia',
    established: '1853'
  },
  {
    id: 'stanford',
    name: 'Stanford University',
    country: 'USA',
    flag: 'USA',
    logoType: 'stanford',
    qsRank: 'Top 5 World',
    established: '1885'
  },
  {
    id: 'auckland',
    name: 'University of Auckland',
    country: 'New Zealand',
    flag: 'New Zealand',
    logoType: 'auckland',
    qsRank: '#1 in New Zealand',
    established: '1883'
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
