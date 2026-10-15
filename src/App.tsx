import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Destinations } from './components/Destinations';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { JourneyTimeline } from './components/JourneyTimeline';
import { Testimonials } from './components/Testimonials';
import { Universities } from './components/Universities';
import { NewsSection } from './components/NewsSection';
import { FaqAndEnquiry } from './components/FaqAndEnquiry';
import { Branches } from './components/Branches';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CounsellingModal } from './components/CounsellingModal';
import { SearchModal } from './components/SearchModal';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import type { Destination, Service } from './types';
import { DESTINATIONS, CORE_SERVICES } from './data/content';

export function App() {
  const [isCounsellingOpen, setIsCounsellingOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [counsellingDest, setCounsellingDest] = useState<string>('USA');

  // Handle direct URL navigation on initial page load, hash changes, and browser history buttons
  useEffect(() => {
    const handleUrlNavigation = () => {
      const rawTarget = (window.location.hash.replace(/^#/, '') || 
                         window.location.pathname.replace(/^\//, '')).toLowerCase();
      if (!rawTarget) return;

      if (rawTarget === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      let targetId = rawTarget;
      if (rawTarget === 'contact' || rawTarget === 'branches' || rawTarget === 'contact-us') targetId = 'contact';
      else if (rawTarget === 'process' || rawTarget === 'journey') targetId = 'process';
      else if (rawTarget === 'blog' || rawTarget === 'news') targetId = 'blog';
      else if (rawTarget === 'about' || rawTarget === 'why-us') targetId = 'about';

      setTimeout(() => {
        const el = document.getElementById(targetId) || 
          (targetId === 'process' ? document.getElementById('journey') : null) ||
          (targetId === 'blog' ? document.getElementById('news') : null) ||
          (targetId === 'about' ? document.getElementById('why-us') : null) ||
          (targetId === 'contact' ? (document.getElementById('contact') || document.getElementById('branches')) : null);

        if (el) {
          const headerOffset = 76;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 150);
    };

    handleUrlNavigation();
    window.addEventListener('hashchange', handleUrlNavigation);
    window.addEventListener('popstate', handleUrlNavigation);
    return () => {
      window.removeEventListener('hashchange', handleUrlNavigation);
      window.removeEventListener('popstate', handleUrlNavigation);
    };
  }, []);

  const handleOpenCounselling = (destOrService?: string) => {
    if (destOrService) {
      setCounsellingDest(destOrService);
    }
    setIsCounsellingOpen(true);
  };

  const handleSelectDestinationById = (destId: string) => {
    const found = DESTINATIONS.find(d => d.id === destId);
    if (found) {
      setSelectedDestination(found);
    }
  };

  const handleSelectServiceById = (serviceId: string) => {
    const found = CORE_SERVICES.find(
      s => s.id === serviceId || s.title.toLowerCase() === serviceId.toLowerCase()
    );
    if (found) {
      setSelectedService(found);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F1] text-brand-navy flex flex-col font-sans selection:bg-[#D99A35]/25 selection:text-[#10243F]">
      {/* 1. Sticky Header */}
      <Header
        onOpenCounselling={(svc) => handleOpenCounselling(svc)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectDestination={handleSelectDestinationById}
        onSelectService={handleSelectServiceById}
      />

      <main className="flex-1">
        {/* 1. Cinematic Hero Section */}
        <Hero
          onOpenCounselling={(dest) => handleOpenCounselling(dest)}
          onSelectDestination={handleSelectDestinationById}
        />

        {/* 2. Choose Your Dream Destination */}
        <Destinations
          onSelectDestination={(dest) => setSelectedDestination(dest)}
        />

        {/* 3. Complete Support at Every Step (Services) */}
        <Services
          onOpenCounselling={(svc) => handleOpenCounselling(svc)}
          onSelectService={handleSelectServiceById}
        />

        {/* 4. Your Global Journey in 4 Simple Steps (Process) */}
        <JourneyTimeline
          onOpenCounselling={() => handleOpenCounselling()}
        />

        {/* 5. Student Success Stories */}
        <Testimonials
          onOpenCounselling={() => handleOpenCounselling()}
        />

        {/* 6. Why Choose Master Visa */}
        <WhyChooseUs
          onOpenCounselling={() => handleOpenCounselling()}
        />

        {/* 7. Top Universities Around The World */}
        <Universities
          onOpenCounselling={() => handleOpenCounselling()}
        />

        {/* 8. News & Insights */}
        <NewsSection
          onOpenCounselling={() => handleOpenCounselling()}
        />

        {/* 9. Frequently Asked Questions & Enquire Now Form */}
        <FaqAndEnquiry />

        {/* 10. Our Branches */}
        <Branches
          onOpenCounselling={() => handleOpenCounselling()}
        />

        {/* 11. Ready to Start Your Journey? (Final Sunset CTA) */}
        <FinalCta
          onOpenCounselling={() => handleOpenCounselling()}
        />
      </main>

      {/* 15. Footer */}
      <Footer />

      {/* 16. Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* 17. Interactive Modals */}
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
        onClose={() => setSelectedService(null)}
        onBookCounselling={(serviceTitle) => handleOpenCounselling(serviceTitle)}
      />
    </div>
  );
}

export default App;
