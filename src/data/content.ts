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

export const SERVICES: Service[] = [
  {
    id: 'career-counselling',
    title: 'Career Counselling',
    description: 'Expert guidance to choose the right course and university.',
    iconName: 'GraduationCap',
    badgeBg: 'bg-rose-50',
    badgeColor: 'text-rose-500',
    features: ['1-on-1 Profile Mapping', 'Aptitude & Career Alignment', 'Long-term ROI Analysis']
  },
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
    id: 'application-process',
    title: 'Application Process',
    description: 'University selection, applications & documentation.',
    iconName: 'FileCheck',
    badgeBg: 'bg-blue-50',
    badgeColor: 'text-blue-500',
    features: ['SOP & LOR Polishing', 'Application Fee Waivers', 'Timely Portal Submissions']
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
    id: 'mock-interviews',
    title: 'Mock Interviews',
    description: 'Preparation for university and visa interviews.',
    iconName: 'Users',
    badgeBg: 'bg-red-50',
    badgeColor: 'text-red-500',
    features: ['Consular Style Mock Drills', 'University Committee Prep', 'Confidence & Body Language']
  },
  {
    id: 'visa-guidance',
    title: 'Visa Guidance',
    description: 'Complete documentation and interview guidance.',
    iconName: 'Stamp',
    badgeBg: 'bg-cyan-50',
    badgeColor: 'text-cyan-500',
    features: ['Proof of Funds Structuring', 'DS-160 & CAS Checklist', '95%+ Success Rate Track Record']
  },
  {
    id: 'pre-departure',
    title: 'Pre-Departure Orientation',
    description: 'Insights about travel, living and studying abroad.',
    iconName: 'Compass',
    badgeBg: 'bg-teal-50',
    badgeColor: 'text-teal-500',
    features: ['Accommodation Booking', 'SIM Card & Forex Cards', 'Airport Pickup Assistance']
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
