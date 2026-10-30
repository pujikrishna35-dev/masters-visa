import React from 'react';
import { Hero } from '../components/Hero';
import { Destinations } from '../components/Destinations';
import { Services } from '../components/Services';
import { JourneyTimeline } from '../components/JourneyTimeline';
import { Testimonials } from '../components/Testimonials';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Universities } from '../components/Universities';
import { NewsSection } from '../components/NewsSection';
import { FaqAndEnquiry } from '../components/FaqAndEnquiry';
import { Branches } from '../components/Branches';
import { FinalCta } from '../components/FinalCta';
import type { Destination } from '../types';

interface HomePageProps {
  onOpenCounselling: (destOrService?: string) => void;
  onSelectDestinationById: (destId: string) => void;
  onSelectDestination: (dest: Destination) => void;
  onSelectServiceById: (serviceId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenCounselling,
  onSelectDestinationById,
  onSelectDestination,
  onSelectServiceById,
}) => {
  return (
    <>
      {/* 1. Cinematic Hero Section */}
      <Hero
        onOpenCounselling={(dest) => onOpenCounselling(dest)}
        onSelectDestination={onSelectDestinationById}
      />

      {/* 2. Choose Your Dream Destination */}
      <Destinations
        onSelectDestination={onSelectDestination}
      />

      {/* 3. Complete Support at Every Step (Services) */}
      <Services
        onOpenCounselling={(svc) => onOpenCounselling(svc)}
        onSelectService={onSelectServiceById}
      />

      {/* 4. Your Global Journey in 4 Simple Steps (Process) */}
      <JourneyTimeline
        onOpenCounselling={() => onOpenCounselling()}
      />

      {/* 5. Student Success Stories */}
      <Testimonials
        onOpenCounselling={() => onOpenCounselling()}
      />

      {/* 6. Why Choose Master Visa */}
      <WhyChooseUs
        onOpenCounselling={() => onOpenCounselling()}
      />

      {/* 7. Top Universities Around The World */}
      <Universities
        onOpenCounselling={() => onOpenCounselling()}
      />

      {/* 8. News & Insights */}
      <NewsSection
        onOpenCounselling={() => onOpenCounselling()}
      />

      {/* 9. Frequently Asked Questions & Enquire Now Form */}
      <FaqAndEnquiry />

      {/* 10. Our Branches */}
      <Branches
        onOpenCounselling={() => onOpenCounselling()}
      />

      {/* 11. Ready to Start Your Journey? (Final CTA) */}
      <FinalCta
        onOpenCounselling={() => onOpenCounselling()}
      />
    </>
  );
};

export default HomePage;
