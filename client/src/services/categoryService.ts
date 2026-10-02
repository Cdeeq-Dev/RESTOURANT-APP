import { apiClient } from './api';
import type { Category } from '../types/category';

export async function fetchCategories(): Promise<Category[]> {
  const response = await apiClient.get<{ success: boolean; data: Category[] }>('/categories');
  return response.data.data;
}
