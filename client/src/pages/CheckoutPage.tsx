import React from 'react';
import { PlaceholderPage } from '../components/PlaceholderPage.tsx';
import { ShieldCheck } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  return (
    <PlaceholderPage
      title="Guest Checkout & Room Confirmation"
      subtitle="Enter your room number, guest name, contact phone, and submit your room delivery order. Full order submission will be implemented in Step 09."
      stepName="STEP 09 Placeholder"
      icon={<ShieldCheck className="w-8 h-8" />}
    />
  );
};
