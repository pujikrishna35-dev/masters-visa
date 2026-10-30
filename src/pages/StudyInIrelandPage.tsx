import React, { useState } from 'react';
import DestinationPageTemplate from '../components/DestinationPageTemplate';
import { IrelandEligibilityModal } from '../components/IrelandEligibilityModal';
import { DESTINATIONS_DATA } from '../data/destinationPagesData';

interface StudyInIrelandPageProps {
  onOpenCounselling?: (destination?: string) => void;
}

export const StudyInIrelandPage: React.FC<StudyInIrelandPageProps> = ({ onOpenCounselling }) => {
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const data = DESTINATIONS_DATA['ireland'];

  return (
    <>
      <DestinationPageTemplate
        data={data}
        onOpenCounselling={onOpenCounselling}
        onOpenEligibility={() => setIsEligibilityOpen(true)}
      />
      <IrelandEligibilityModal
        isOpen={isEligibilityOpen}
        onClose={() => setIsEligibilityOpen(false)}
        onProceedConsultation={() => {
          setIsEligibilityOpen(false);
          onOpenCounselling?.('Ireland');
        }}
      />
    </>
  );
};

export default StudyInIrelandPage;
