import React, { useState } from 'react';
import DestinationPageTemplate from '../components/DestinationPageTemplate';
import { EuropeEligibilityModal } from '../components/EuropeEligibilityModal';
import { DESTINATIONS_DATA } from '../data/destinationPagesData';

interface StudyInEuropePageProps {
  onOpenCounselling?: (destination?: string) => void;
}

export const StudyInEuropePage: React.FC<StudyInEuropePageProps> = ({ onOpenCounselling }) => {
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const data = DESTINATIONS_DATA['europe'];

  return (
    <>
      <DestinationPageTemplate
        data={data}
        onOpenCounselling={onOpenCounselling}
        onOpenEligibility={() => setIsEligibilityOpen(true)}
      />
      <EuropeEligibilityModal
        isOpen={isEligibilityOpen}
        onClose={() => setIsEligibilityOpen(false)}
        onProceedConsultation={() => {
          setIsEligibilityOpen(false);
          onOpenCounselling?.('Europe');
        }}
      />
    </>
  );
};

export default StudyInEuropePage;
