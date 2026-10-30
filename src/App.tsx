import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useSearchParams, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CounsellingModal } from './components/CounsellingModal';
import { SearchModal } from './components/SearchModal';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ScrollToTop } from './components/ScrollToTop';

// Multi-Page Route Components
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { DestinationDetailPage } from './pages/DestinationDetailPage';
import { StudyInUsaPage } from './pages/StudyInUsaPage';
import { AllUsaUniversitiesPage } from './pages/AllUsaUniversitiesPage';
import { CountryUniversitiesPage } from './pages/CountryUniversitiesPage';
import { StudyInUkPage } from './pages/StudyInUkPage';
import { StudyInCanadaPage } from './pages/StudyInCanadaPage';
import { StudyInAustraliaPage } from './pages/StudyInAustraliaPage';
import { StudyInEuropePage } from './pages/StudyInEuropePage';
import { StudyInNewZealandPage } from './pages/StudyInNewZealandPage';
import { StudyInFrancePage } from './pages/StudyInFrancePage';
import { StudyInIrelandPage } from './pages/StudyInIrelandPage';
import StudyInGermanyPage from './pages/StudyInGermanyPage';
import { ServicesPage } from './pages/ServicesPage';
import { VisaInfoPage } from './pages/VisaInfoPage';
import { ProcessPage } from './pages/ProcessPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

import type { Destination, Service } from './types';
import { DESTINATIONS, CORE_SERVICES } from './data/content';

export const SERVICE_ALIASES: Record<string, string> = {
  // Corporate Internships & Co-op aliases
  'corporate-internships': 'corporate-internships',
  'corporate-internship': 'corporate-internships',
  'internships': 'corporate-internships',
  'internship': 'corporate-internships',
  'co-op': 'corporate-internships',
  'coop': 'corporate-internships',
  'cpt': 'corporate-internships',
  'corporate': 'corporate-internships',
  'corporate internships & co-op': 'corporate-internships',

  // Part-Time Jobs & Student Work Rights aliases
  'part-time-jobs': 'part-time-jobs',
  'part-time-job': 'part-time-jobs',
  'part-time': 'part-time-jobs',
  'parttime-jobs': 'part-time-jobs',
  'parttime': 'part-time-jobs',
  'campus-jobs': 'part-time-jobs',
  'campus-job': 'part-time-jobs',
  'campus': 'part-time-jobs',
  'student-work-rights': 'part-time-jobs',
  'work-rights': 'part-time-jobs',
  'student-jobs': 'part-time-jobs',
  'part-time jobs & student work rights': 'part-time-jobs',

  // Legacy combined alias routing to corporate internships
  'internship-parttime': 'corporate-internships',
  'internships & part-time jobs': 'corporate-internships',
  'internship & part-time jobs': 'corporate-internships',

  // Navigation aliases for Services
  'career-counselling': 'career-counselling',
  'career counselling': 'career-counselling',
  'counselling': 'career-counselling',
  'test-preparation': 'test-preparation',
  'test preparation': 'test-preparation',
  'test-prep': 'test-preparation',
  'ielts': 'test-preparation',
  'toefl': 'test-preparation',
  'gre': 'test-preparation',
  'gmat': 'test-preparation',
  'application-process': 'application-process',
  'application process': 'application-process',
  'admissions': 'application-process',
  'university-shortlisting': 'application-process',
  'document': 'application-process',
  'loan-assistance': 'loan-assistance',
  'loan assistance': 'loan-assistance',
  'loan': 'loan-assistance',
  'mock-interviews': 'mock-interviews',
  'mock interviews': 'mock-interviews',
  'mock-interview': 'mock-interviews',
  'mock interview': 'mock-interviews',
  'visa-guidance': 'visa-guidance',
  'visa guidance': 'visa-guidance',
  'visa': 'visa-guidance',
  'pre-departure-orientation': 'pre-departure-orientation',
  'pre-departure orientation': 'pre-departure-orientation',
  'pre-departure-briefing': 'pre-departure-orientation',
  'predeparture': 'pre-departure-orientation',
  'free-training': 'free-training',
  'free training': 'free-training',
  'training': 'free-training',
  'free-ielts-demo': 'free-training',
  'free-gre-strategy': 'free-training',
  'free-spoken-english': 'free-training',
  'free-visa-mock': 'free-training',
  'pickup-accommodation': 'pickup-accommodation',
  'airport-pickup': 'pickup-accommodation',
};

export function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCounsellingOpen, setIsCounsellingOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [counsellingDest, setCounsellingDest] = useState<string>('USA');

  const handleOpenCounselling = (destOrService?: string) => {
    if (destOrService) {
      const lower = destOrService.toLowerCase().trim();
      if (['corporate-internships', 'internships', 'internship', 'co-op', 'coop', 'corporate'].includes(lower)) {
        setCounsellingDest('Corporate Internships & Co-op');
      } else if (['part-time-jobs', 'part-time', 'parttime', 'campus-jobs', 'campus-job', 'student-work-rights', 'work-rights'].includes(lower)) {
        setCounsellingDest('Part-Time Jobs & Student Work Rights');
      } else {
        setCounsellingDest(destOrService);
      }
    }
    setIsCounsellingOpen(true);
  };

  const handleSelectDestinationById = (destId: string) => {
    const found = DESTINATIONS.find(d => d.id === destId || d.name.toLowerCase() === destId.toLowerCase());
    if (found) {
      setSelectedDestination(found);
    }
  };

  const handleSelectServiceById = useCallback((serviceId: string) => {
    if (!serviceId) return;
    const normalized = serviceId.toLowerCase().trim();
    const resolvedId = SERVICE_ALIASES[normalized] || SERVICE_ALIASES[normalized.replace(/_/g, '-')] || normalized;

    const found = CORE_SERVICES.find(
      s => s.id.toLowerCase() === resolvedId || 
           s.id.toLowerCase() === normalized ||
           s.title.toLowerCase() === normalized ||
           s.title.toLowerCase() === resolvedId
    );
    if (found) {
      setSelectedService(found);
    }
  }, []);

  // Sync service query parameter from URL (e.g. /services?service=corporate-internships)
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      handleSelectServiceById(serviceParam);
    }
  }, [searchParams, handleSelectServiceById]);

  const handleCloseServiceModal = useCallback(() => {
    setSelectedService(null);
    if (searchParams.has('service')) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('service');
      setSearchParams(nextParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className="min-h-screen bg-[#FAF7F1] text-brand-navy flex flex-col font-sans selection:bg-[#D99A35]/25 selection:text-[#10243F]">
      {/* Automatically reset scroll position on page transition */}
      <ScrollToTop />

      {/* 1. Shared Sticky Header */}
      <Header
        onOpenCounselling={(svc) => handleOpenCounselling(svc)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectDestination={handleSelectDestinationById}
        onSelectService={handleSelectServiceById}
      />

      {/* 2. Page Content Route Switcher */}
      <main className="flex-1">
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <HomePage
                onOpenCounselling={handleOpenCounselling}
                onSelectDestinationById={handleSelectDestinationById}
                onSelectDestination={(dest) => setSelectedDestination(dest)}
                onSelectServiceById={handleSelectServiceById}
              />
            }
          />

          {/* About Us Page */}
          <Route
            path="/about"
            element={<AboutPage onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/about-us"
            element={<AboutPage onOpenCounselling={handleOpenCounselling} />}
          />

          {/* Destinations Hub Page */}
          <Route
            path="/destinations"
            element={
              <DestinationsPage
                onOpenCounselling={handleOpenCounselling}
                onSelectDestination={(dest) => setSelectedDestination(dest)}
                onSelectDestinationById={handleSelectDestinationById}
              />
            }
          />

          {/* Dedicated Individual Study Abroad Destination Pages */}
          <Route
            path="/destinations/usa"
            element={<StudyInUsaPage onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/study-in-usa"
            element={<StudyInUsaPage onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/study-in-usa/universities"
            element={<AllUsaUniversitiesPage onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/destinations/usa/universities"
            element={<AllUsaUniversitiesPage onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/destinations/united-kingdom"
            element={<StudyInUkPage onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/destinations/uk"
            element={<StudyInUkPage onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/study-in-uk"
            element={<StudyInUkPage onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/study-in-united-kingdom"
            element={<StudyInUkPage onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/study-in-uk/universities"
            element={<CountryUniversitiesPage countryId="uk" onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/study-in-united-kingdom/universities"
            element={<CountryUniversitiesPage countryId="uk" onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/destinations/uk/universities"
            element={<CountryUniversitiesPage countryId="uk" onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/destinations/united-kingdom/universities"
            element={<CountryUniversitiesPage countryId="uk" onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/destinations/canada"
            element={<StudyInCanadaPage onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/study-in-canada"
            element={<StudyInCanadaPage onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/study-in-canada/universities"
            element={<CountryUniversitiesPage countryId="canada" onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/destinations/canada/universities"
            element={<CountryUniversitiesPage countryId="canada" onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/destinations/australia"
            element={<StudyInAustraliaPage onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/study-in-australia"
            element={<StudyInAustraliaPage onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/study-in-australia/universities"
            element={<CountryUniversitiesPage countryId="australia" onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/destinations/australia/universities"
            element={<CountryUniversitiesPage countryId="australia" onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/destinations/europe"
            element={<StudyInEuropePage onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/study-in-europe"
            element={<StudyInEuropePage onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/study-in-europe/universities"
            element={<CountryUniversitiesPage countryId="europe" onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/destinations/europe/universities"
            element={<CountryUniversitiesPage countryId="europe" onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/destinations/new-zealand"
            element={<StudyInNewZealandPage onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/study-in-new-zealand"
            element={<StudyInNewZealandPage onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/study-in-new-zealand/universities"
            element={<CountryUniversitiesPage countryId="new-zealand" onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/destinations/new-zealand/universities"
            element={<CountryUniversitiesPage countryId="new-zealand" onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/destinations/france"
            element={<StudyInFrancePage onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/study-in-france"
            element={<StudyInFrancePage onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/study-in-france/universities"
            element={<Navigate to="/study-in-europe/universities" replace />}
          />
          <Route
            path="/destinations/france/universities"
            element={<Navigate to="/study-in-europe/universities" replace />}
          />
          <Route
            path="/destinations/ireland"
            element={<StudyInIrelandPage onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/study-in-ireland"
            element={<StudyInIrelandPage onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/study-in-ireland/universities"
            element={<CountryUniversitiesPage countryId="ireland" onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/destinations/ireland/universities"
            element={<CountryUniversitiesPage countryId="ireland" onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/destinations/germany"
            element={<StudyInGermanyPage onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/study-in-germany"
            element={<StudyInGermanyPage onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/study-in-germany/universities"
            element={<CountryUniversitiesPage countryId="germany" onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/destinations/germany/universities"
            element={<CountryUniversitiesPage countryId="germany" onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/study-in-:countryId/universities"
            element={<CountryUniversitiesPage onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/destinations/:countryId/universities"
            element={<CountryUniversitiesPage onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/destinations/:countryId"
            element={<DestinationDetailPage onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/study-in-:countryId"
            element={<DestinationDetailPage onOpenCounselling={handleOpenCounselling} />}
          />

          {/* Services Page */}
          <Route
            path="/services"
            element={
              <ServicesPage
                onOpenCounselling={handleOpenCounselling}
                onSelectServiceById={handleSelectServiceById}
              />
            }
          />
          <Route
            path="/our-services"
            element={
              <ServicesPage
                onOpenCounselling={handleOpenCounselling}
                onSelectServiceById={handleSelectServiceById}
              />
            }
          />

          {/* Visa Information Page */}
          <Route
            path="/visa-information"
            element={<VisaInfoPage onOpenCounselling={handleOpenCounselling} />}
          />
          <Route
            path="/visa"
            element={<VisaInfoPage onOpenCounselling={handleOpenCounselling} />}
          />

          {/* Process Roadmap Page */}
          <Route
            path="/process"
            element={<ProcessPage onOpenCounselling={() => handleOpenCounselling()} />}
          />
          <Route
            path="/journey"
            element={<ProcessPage onOpenCounselling={() => handleOpenCounselling()} />}
          />

          {/* Student Success Stories & Testimonials Page */}
          <Route
            path="/testimonials"
            element={<TestimonialsPage onOpenCounselling={() => handleOpenCounselling()} />}
          />
          <Route
            path="/success-stories"
            element={<TestimonialsPage onOpenCounselling={() => handleOpenCounselling()} />}
          />

          {/* Blog & News Insights Page */}
          <Route
            path="/blog"
            element={<BlogPage onOpenCounselling={() => handleOpenCounselling()} />}
          />
          <Route
            path="/news"
            element={<BlogPage onOpenCounselling={() => handleOpenCounselling()} />}
          />

          {/* Contact Us & Branches Page */}
          <Route
            path="/contact"
            element={<ContactPage onOpenCounselling={() => handleOpenCounselling()} />}
          />
          <Route
            path="/contact-us"
            element={<ContactPage onOpenCounselling={() => handleOpenCounselling()} />}
          />

          {/* 404 Catch-All Route */}
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </main>

      {/* 3. Shared Global Footer */}
      <Footer />

      {/* 4. Global Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* 5. Interactive Global Modals */}
      <CounsellingModal
        isOpen={isCounsellingOpen}
        onClose={() => setIsCounsellingOpen(false)}
        defaultDestination={counsellingDest}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectDestination={handleSelectDestinationById}
        onSelectService={(svc) => handleSelectServiceById(svc)}
      />

      <DestinationDetailModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onBookCounselling={(destName) => handleOpenCounselling(destName)}
      />

      <ServiceDetailModal
        service={selectedService}
        onClose={handleCloseServiceModal}
        onBookCounselling={(serviceTitle) => handleOpenCounselling(serviceTitle)}
      />
    </div>
  );
}

export default App;
