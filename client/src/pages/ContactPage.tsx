import React from 'react';
import { PlaceholderPage } from '../components/PlaceholderPage';
import { PhoneCall } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <PlaceholderPage
      title="Contact & Guest Assistance"
      subtitle="Reach out directly to the hotel dining desk, request special room setups, or ask about allergen guidelines."
      stepName="Upcoming Step Placeholder"
      icon={<PhoneCall className="w-8 h-8" />}
    />
  );
};
