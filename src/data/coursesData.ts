export interface CourseCategory {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  iconName: 'Briefcase' | 'Laptop' | 'Settings' | 'BarChart3' | 'Heart' | 'Stethoscope' | 'Palette' | 'Scale' | 'GraduationCap' | 'FlaskConical' | 'Truck';
  examples: string[];
  isRegulated?: boolean;
  regulatedNote?: string;
}

export interface StudyLevelOption {
  id: string;
  label: string;
  description?: string;
}

export const STUDY_LEVELS: StudyLevelOption[] = [
  { id: 'all', label: 'All levels' },
  { id: 'foundation', label: 'Foundation and pathway programmes', description: 'Preparatory study pathways bridging high school to university entry.' },
  { id: 'diploma', label: 'Diplomas', description: 'Practical, career-focused qualifications with university transfer options.' },
  { id: 'bachelors', label: "Bachelor's degrees", description: 'Undergraduate academic degrees spanning 3 to 4 years.' },
  { id: 'postgrad-cert', label: 'Postgraduate certificates and diplomas', description: 'Advanced specialized qualifications for career advancement.' },
  { id: 'masters', label: "Master's degrees", description: 'Postgraduate taught and coursework programmes spanning 1 to 2 years.' },
  { id: 'mba', label: 'MBAs', description: 'Master of Business Administration focused on strategic leadership and management.' },
  { id: 'research-phd', label: 'Research degrees and PhDs', description: 'Doctoral dissertations and research master degrees.' },
];

export const COURSE_CATEGORIES: CourseCategory[] = [
  {
    id: 'business-management',
    title: 'Business & Management',
    shortDescription: 'Business administration, MBA, marketing and entrepreneurship.',
    description: 'Business administration, MBA, marketing, international business and entrepreneurship.',
    iconName: 'Briefcase',
    examples: [
      'Business Administration',
      'Master of Business Administration (MBA)',
      'Marketing & Digital Marketing',
      'International Business',
      'Entrepreneurship & Innovation'
    ]
  },
  {
    id: 'computing-technology',
    title: 'Computing & Technology',
    shortDescription: 'Computer science, software engineering, AI, data science and cybersecurity.',
    description: 'Computer science, software engineering, artificial intelligence, data science and cybersecurity.',
    iconName: 'Laptop',
    examples: [
      'Computer Science',
      'Software Engineering',
      'Artificial Intelligence & Machine Learning',
      'Data Science & Analytics',
      'Cybersecurity & Network Defence'
    ]
  },
  {
    id: 'engineering',
    title: 'Engineering',
    shortDescription: 'Civil, mechanical, electrical, aerospace, chemical and renewable energy engineering.',
    description: 'Civil, mechanical, electrical, aerospace, chemical and renewable energy engineering.',
    iconName: 'Settings',
    examples: [
      'Civil Engineering',
      'Mechanical Engineering',
      'Electrical & Electronic Engineering',
      'Aerospace Engineering',
      'Chemical Engineering',
      'Renewable Energy & Sustainable Engineering'
    ]
  },
  {
    id: 'finance-accounting',
    title: 'Finance & Accounting',
    shortDescription: 'Accounting, finance, economics, banking and financial technology.',
    description: 'Accounting, finance, economics, banking and financial technology.',
    iconName: 'BarChart3',
    examples: [
      'Accounting & Audit',
      'Corporate & Applied Finance',
      'Economics & Econometrics',
      'Banking & Financial Institutions',
      'Financial Technology (FinTech)'
    ]
  },
  {
    id: 'healthcare-life-sciences',
    title: 'Healthcare & Life Sciences',
    shortDescription: 'Public health, nursing, pharmacy, biomedical science and biotechnology.',
    description: 'Public health, nursing, pharmacy, biomedical science, biotechnology and healthcare management.',
    iconName: 'Heart',
    isRegulated: true,
    regulatedNote: 'Nursing, pharmacy and clinical health professions require licensing and recognition checks in the country where you intend to practise.',
    examples: [
      'Public Health',
      'Nursing Studies',
      'Pharmacy & Pharmacology',
      'Biomedical Science',
      'Biotechnology',
      'Healthcare Management'
    ]
  },
  {
    id: 'medicine-dentistry',
    title: 'Medicine & Dentistry',
    shortDescription: 'Medicine, dentistry and related clinical programmes, subject to admission requirements.',
    description: 'Medicine, dentistry and related clinical programmes, subject to admission and professional recognition requirements.',
    iconName: 'Stethoscope',
    isRegulated: true,
    regulatedNote: 'Subject to strict admission and professional recognition requirements. Students must verify medical council equivalencies in their destination country.',
    examples: [
      'Medicine (MBBS / MD)',
      'Dentistry & Oral Health',
      'Clinical Health Programmes',
      'Medical Sciences & Pre-Med Pathways'
    ]
  },
  {
    id: 'arts-design-media',
    title: 'Arts, Design & Media',
    shortDescription: 'Graphic design, animation, film, fashion, architecture and communications.',
    description: 'Graphic design, animation, film, fashion, architecture and communications.',
    iconName: 'Palette',
    isRegulated: true,
    regulatedNote: 'Architecture qualifications require specific professional board accreditations for local licence to practise.',
    examples: [
      'Graphic Design & Visual Communication',
      '3D Animation & VFX',
      'Film, Television & Digital Media',
      'Fashion Design & Brand Management',
      'Architecture & Spatial Design',
      'Media & Communications'
    ]
  },
  {
    id: 'law-social-sciences',
    title: 'Law & Social Sciences',
    shortDescription: 'Law, psychology, sociology, international relations and public policy.',
    description: 'Law, psychology, sociology, international relations and public policy.',
    iconName: 'Scale',
    isRegulated: true,
    regulatedNote: 'Practising law or clinical psychology requires bar admission and local professional board accreditation.',
    examples: [
      'Law (LLB / LLM)',
      'Psychology & Behavioural Sciences',
      'Sociology & Social Research',
      'International Relations & Global Affairs',
      'Public Policy & Governance'
    ]
  },
  {
    id: 'education',
    title: 'Education',
    shortDescription: 'Education studies, teaching-related programmes and educational leadership.',
    description: 'Education studies, teaching-related programmes and educational leadership.',
    iconName: 'GraduationCap',
    isRegulated: true,
    regulatedNote: 'Teaching credentials (e.g. PGCE, QTS, state teaching certificates) require local state/national education department registration.',
    examples: [
      'Education Studies',
      'Teaching-Related Programmes & TESOL',
      'Educational Leadership & Management',
      'Early Childhood & Special Education'
    ]
  },
  {
    id: 'science-environment',
    title: 'Science & Environment',
    shortDescription: 'Mathematics, physics, chemistry, environmental science, sustainability and agriculture.',
    description: 'Mathematics, physics, chemistry, environmental science, sustainability and agriculture.',
    iconName: 'FlaskConical',
    examples: [
      'Mathematics & Statistics',
      'Physics & Applied Physics',
      'Chemistry & Material Sciences',
      'Environmental Science & Ecology',
      'Sustainability & Climate Solutions',
      'Agricultural Sciences & Agribusiness'
    ]
  },
  {
    id: 'logistics-sport',
    title: 'Logistics & Sport',
    shortDescription: 'Supply chain management, logistics, sports science and sports management.',
    description: 'Supply chain management, logistics, sports science and sports management.',
    iconName: 'Truck',
    examples: [
      'Supply Chain Management',
      'Global Logistics & Freight Operations',
      'Sports Science & Exercise Physiology',
      'Sports Management & Athletic Administration'
    ]
  }
];

export const COURSE_DISCLAIMERS = {
  availability: 'Programme availability varies by institution and destination. Admission is not guaranteed.',
  regulatedProfessions: 'For regulated professions such as medicine, nursing, law, teaching and architecture, students must separately check recognition and licensing requirements in the country where they intend to practise.',
  counsellingFocus: 'Our counselling considers entry requirements, tuition fees, language of instruction, course content, location and your plans after graduation.',
  destinationsNote: 'We help students explore programmes across the United Kingdom, United States, Canada, Australia, New Zealand and European destinations, subject to institution availability and individual eligibility.'
};

