import React, { useState } from 'react';
import DestinationPageTemplate from '../components/DestinationPageTemplate';
import { UkEligibilityModal } from '../components/UkEligibilityModal';
import { DESTINATIONS_DATA } from '../data/destinationPagesData';

interface StudyInUkPageProps {
  onOpenCounselling?: (destination?: string) => void;
}

export const StudyInUkPage: React.FC<StudyInUkPageProps> = ({ onOpenCounselling }) => {
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const data = DESTINATIONS_DATA['uk'];

  return (
    <>
      <DestinationPageTemplate
        data={data}
        onOpenCounselling={onOpenCounselling}
        onOpenEligibility={() => setIsEligibilityOpen(true)}
      />
      <UkEligibilityModal
        isOpen={isEligibilityOpen}
        onClose={() => setIsEligibilityOpen(false)}
        onProceedConsultation={() => {
          setIsEligibilityOpen(false);
          onOpenCounselling?.('United Kingdom');
        }}
      />
    </>
  );
};

export default StudyInUkPage;
