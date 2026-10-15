export interface Destination {
  id: string;
  name: string;
  flag: string;
  image: string;
  shortDesc: string;
  popularUniversities: string[];
  avgTuition: string;
  visaSuccessRate: string;
  workPermit: string;
  topCourses: string[];
}

export interface ServiceStep {
  step: string;
  title: string;
  desc: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badgeBg: string;
  badgeColor: string;
  features?: string[];
  includes?: string[];
  steps?: ServiceStep[];
}

export interface Testimonial {
  id: string;
  name: string;
  university: string;
  country: string;
  flag: string;
  image: string;
  quote: string;
  rating: number;
  course: string;
}

export interface UniversityItem {
  id: string;
  name: string;
  country: string;
  flag: string;
  logoType: 'oxford' | 'cambridge' | 'toronto' | 'melbourne' | 'stanford' | 'auckland';
  established?: string;
  qsRank?: string;
}

export interface NewsItem {
  id: string;
  category: string;
  categoryColor: string;
  date: string;
  title: string;
  image: string;
  readTime: string;
  summary: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface Branch {
  id: string;
  city: string;
  image: string;
  address: string;
  phone: string;
  email: string;
  isHeadquarter?: boolean;
}
