import type { Category } from './category';

export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number; // integer KOBO (1 NGN = 100 kobo)
  imageUrl: string | null;
  isAvailable: boolean;
  isFeatured: boolean;
  category?: Category;
  createdAt?: string;
  updatedAt?: string;
}
