import React from 'react';
import { PlaceholderPage } from '../components/PlaceholderPage';
import { Calendar } from 'lucide-react';

export const ReservationsPage: React.FC = () => {
  return (
    <PlaceholderPage
      title="Table Reservations"
      subtitle="Reserve a dining table for breakfast, lunch, or dinner at The Grand Horizon restaurant."
      stepName="Upcoming Step Placeholder"
      icon={<Calendar className="w-8 h-8" />}
    />
  );
};
