import React from 'react';
import { CountryUniversitiesPage } from './CountryUniversitiesPage';
import { US_STATE_NAMES } from '../data/countryUniversities';
import type { UniversityDirectoryItem } from '../components/UniversityCard';

export type { UniversityDirectoryItem };
export { US_STATE_NAMES };

export interface AllUsaUniversitiesPageProps {
  onOpenCounselling?: (destination?: string) => void;
}

export const AllUsaUniversitiesPage: React.FC<AllUsaUniversitiesPageProps> = ({ onOpenCounselling }) => {
  return <CountryUniversitiesPage countryId="usa" onOpenCounselling={onOpenCounselling} />;
};

export default AllUsaUniversitiesPage;
