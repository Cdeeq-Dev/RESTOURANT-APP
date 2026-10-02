import React from 'react';
import { PlaceholderPage } from '../components/PlaceholderPage';
import { ShoppingBag } from 'lucide-react';

export const CartPage: React.FC = () => {
  return (
    <PlaceholderPage
      title="Shopping Cart & Room Order"
      subtitle="View your selected room dining items, adjust quantities, enter room delivery details, and submit your order."
      stepName="Upcoming Step Placeholder"
      icon={<ShoppingBag className="w-8 h-8" />}
    />
  );
};
