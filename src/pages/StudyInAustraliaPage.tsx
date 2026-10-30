import React, { useState } from 'react';
import DestinationPageTemplate from '../components/DestinationPageTemplate';
import { AustraliaEligibilityModal } from '../components/AustraliaEligibilityModal';
import { DESTINATIONS_DATA } from '../data/destinationPagesData';

interface StudyInAustraliaPageProps {
  onOpenCounselling?: (destination?: string) => void;
}

export const StudyInAustraliaPage: React.FC<StudyInAustraliaPageProps> = ({ onOpenCounselling }) => {
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const data = DESTINATIONS_DATA['australia'];

  return (
    <>
      <DestinationPageTemplate
        data={data}
        onOpenCounselling={onOpenCounselling}
        onOpenEligibility={() => setIsEligibilityOpen(true)}
      />
      <AustraliaEligibilityModal
        isOpen={isEligibilityOpen}
        onClose={() => setIsEligibilityOpen(false)}
        onProceedConsultation={() => {
          setIsEligibilityOpen(false);
          onOpenCounselling?.('Australia');
        }}
      />
    </>
  );
};

export default StudyInAustraliaPage;
