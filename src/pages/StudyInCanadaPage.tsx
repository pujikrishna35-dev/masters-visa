import React, { useState } from 'react';
import DestinationPageTemplate from '../components/DestinationPageTemplate';
import { CanadaEligibilityModal } from '../components/CanadaEligibilityModal';
import { DESTINATIONS_DATA } from '../data/destinationPagesData';

interface StudyInCanadaPageProps {
  onOpenCounselling?: (destination?: string) => void;
}

export const StudyInCanadaPage: React.FC<StudyInCanadaPageProps> = ({ onOpenCounselling }) => {
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const data = DESTINATIONS_DATA['canada'];

  return (
    <>
      <DestinationPageTemplate
        data={data}
        onOpenCounselling={onOpenCounselling}
        onOpenEligibility={() => setIsEligibilityOpen(true)}
      />
      <CanadaEligibilityModal
        isOpen={isEligibilityOpen}
        onClose={() => setIsEligibilityOpen(false)}
        onProceedConsultation={() => {
          setIsEligibilityOpen(false);
          onOpenCounselling?.('Canada');
        }}
      />
    </>
  );
};

export default StudyInCanadaPage;
