import React from 'react';
import { useParams } from 'react-router-dom';
import { PlaceholderPage } from '../components/PlaceholderPage';
import { Utensils } from 'lucide-react';

export const FoodDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <PlaceholderPage
      title={`Dish Details: ${slug || 'Food'}`}
      subtitle={`Detailed food preview page for "${slug}". Full dish customization, ingredients, and room ordering form will be implemented in Step 08.`}
      stepName="STEP 08 Placeholder"
      icon={<Utensils className="w-8 h-8" />}
    />
  );
};
