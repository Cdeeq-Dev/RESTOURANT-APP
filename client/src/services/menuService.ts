import { apiClient } from './api';
import type { MenuItem } from '../types/menu';

export async function fetchMenuItems(categorySlug?: string): Promise<MenuItem[]> {
  const params: Record<string, string> = {};
  if (categorySlug && categorySlug !== 'all') {
    params.category = categorySlug;
  }
  const response = await apiClient.get<{ success: boolean; data: MenuItem[] }>('/menu', { params });
  return response.data.data;
}

export async function fetchFeaturedMenuItems(): Promise<MenuItem[]> {
  const response = await apiClient.get<{ success: boolean; data: MenuItem[] }>('/menu/featured');
  return response.data.data;
}

export async function fetchMenuItemBySlug(slug: string): Promise<MenuItem> {
  const response = await apiClient.get<{ success: boolean; data: MenuItem }>(`/menu/${slug}`);
  return response.data.data;
}
