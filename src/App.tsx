import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HeroServiceHighlights } from './components/HeroServiceHighlights';
import { StatsBar } from './components/StatsBar';
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
import type { Destination } from './types';
import { DESTINATIONS } from './data/content';

export function App() {
  const [isCounsellingOpen, setIsCounsellingOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [counsellingDest, setCounsellingDest] = useState<string>('USA');

  const handleOpenCounselling = (destName?: string) => {
    if (destName) {
      setCounsellingDest(destName);
    }
    setIsCounsellingOpen(true);
  };

  const handleSelectDestinationById = (destId: string) => {
    const found = DESTINATIONS.find(d => d.id === destId);
    if (found) {
      setSelectedDestination(found);
    }
  };

  return (
    <div className="min-h-screen bg-white text-brand-navy flex flex-col font-sans selection:bg-brand-coral selection:text-white">
      {/* 1. Sticky Header */}
      <Header
        onOpenCounselling={() => handleOpenCounselling()}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onOpenCounselling={() => handleOpenCounselling()}
        />

        {/* 3. Hero Service Highlights (5 feature pills) */}
        <HeroServiceHighlights
          onSelectFeature={(feature) => handleOpenCounselling(feature)}
        />

        {/* 4. Statistics Bar */}
        <StatsBar />

        {/* 5. Study Destinations */}
        <Destinations
          onSelectDestination={(dest) => setSelectedDestination(dest)}
        />

        {/* 6. Services Grid */}
        <Services
          onOpenCounselling={() => handleOpenCounselling()}
        />

        {/* 7. Why Choose Masters Visa */}
        <WhyChooseUs
          onOpenCounselling={() => handleOpenCounselling()}
        />

        {/* 8. Student Journey Timeline */}
        <JourneyTimeline />

        {/* 9. Student Success Stories */}
        <Testimonials
          onOpenCounselling={() => handleOpenCounselling()}
        />

        {/* 10. Top Universities Around The World */}
        <Universities
          onOpenCounselling={() => handleOpenCounselling()}
        />

        {/* 11. News & Insights */}
        <NewsSection
          onOpenCounselling={() => handleOpenCounselling()}
        />

        {/* 12. Frequently Asked Questions & Enquire Now Form */}
        <FaqAndEnquiry />

        {/* 13. Our Branches */}
        <Branches
          onOpenCounselling={() => handleOpenCounselling()}
        />

        {/* 14. Final CTA Banner */}
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
      />

      <DestinationDetailModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onBookCounselling={(destName) => handleOpenCounselling(destName)}
      />
    </div>
  );
}

export default App;
