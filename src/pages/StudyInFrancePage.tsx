import React, { useState } from 'react';
import DestinationPageTemplate from '../components/DestinationPageTemplate';
import { FranceEligibilityModal } from '../components/FranceEligibilityModal';
import { DESTINATIONS_DATA } from '../data/destinationPagesData';

interface StudyInFrancePageProps {
  onOpenCounselling?: (destination?: string) => void;
}

export const StudyInFrancePage: React.FC<StudyInFrancePageProps> = ({ onOpenCounselling }) => {
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const data = DESTINATIONS_DATA['france'];

  return (
    <>
      <DestinationPageTemplate
        data={data}
        onOpenCounselling={onOpenCounselling}
        onOpenEligibility={() => setIsEligibilityOpen(true)}
      />
      <FranceEligibilityModal
        isOpen={isEligibilityOpen}
        onClose={() => setIsEligibilityOpen(false)}
        onProceedConsultation={() => {
          setIsEligibilityOpen(false);
          onOpenCounselling?.('France');
        }}
      />
    </>
  );
};

export default StudyInFrancePage;
