import React from 'react';
import { useParams } from 'react-router-dom';
import { PlaceholderPage } from '../components/PlaceholderPage';
import { Clock } from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();

  return (
    <PlaceholderPage
      title={`Live Order Tracking: ${orderNumber || 'Order'}`}
      subtitle={`Track live room delivery status for order "${orderNumber}". Real-time status updates will be displayed here.`}
      stepName="Upcoming Step Placeholder"
      icon={<Clock className="w-8 h-8" />}
    />
  );
};
