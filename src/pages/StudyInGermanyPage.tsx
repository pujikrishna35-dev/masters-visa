import React, { useState } from 'react';
import DestinationPageTemplate from '../components/DestinationPageTemplate';
import GermanyEligibilityModal from '../components/GermanyEligibilityModal';
import { DESTINATIONS_DATA } from '../data/destinationPagesData';

interface StudyInGermanyPageProps {
  onOpenCounselling: (destination?: string) => void;
}

export const StudyInGermanyPage: React.FC<StudyInGermanyPageProps> = ({ onOpenCounselling }) => {
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const data = DESTINATIONS_DATA['germany'];

  return (
    <>
      <DestinationPageTemplate
        data={data}
        onOpenCounselling={onOpenCounselling}
        onOpenEligibility={() => setIsEligibilityOpen(true)}
      />
      <GermanyEligibilityModal
        isOpen={isEligibilityOpen}
        onClose={() => setIsEligibilityOpen(false)}
        onOpenCounselling={onOpenCounselling}
      />
    </>
  );
};

export default StudyInGermanyPage;
