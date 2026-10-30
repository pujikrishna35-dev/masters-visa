import React, { useState } from 'react';
import DestinationPageTemplate from '../components/DestinationPageTemplate';
import { NzEligibilityModal } from '../components/NzEligibilityModal';
import { DESTINATIONS_DATA } from '../data/destinationPagesData';

interface StudyInNewZealandPageProps {
  onOpenCounselling?: (destination?: string) => void;
}

export const StudyInNewZealandPage: React.FC<StudyInNewZealandPageProps> = ({ onOpenCounselling }) => {
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const data = DESTINATIONS_DATA['new-zealand'];

  return (
    <>
      <DestinationPageTemplate
        data={data}
        onOpenCounselling={onOpenCounselling}
        onOpenEligibility={() => setIsEligibilityOpen(true)}
      />
      <NzEligibilityModal
        isOpen={isEligibilityOpen}
        onClose={() => setIsEligibilityOpen(false)}
        onProceedConsultation={() => {
          setIsEligibilityOpen(false);
          onOpenCounselling?.('New Zealand');
        }}
      />
    </>
  );
};

export default StudyInNewZealandPage;
