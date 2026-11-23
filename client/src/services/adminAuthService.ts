import axios from 'axios';
import { apiClient } from './api';
import type { AdminLoginPayload, AdminLoginResponse, AdminUser } from '../types/admin';

export async function loginAdmin(payload: AdminLoginPayload): Promise<AdminLoginResponse> {
  try {
    const response = await apiClient.post<{
      success: boolean;
      message?: string;
      data: AdminLoginResponse;
    }>('/admin/login', payload);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const serverData = error.response.data as {
        message?: string;
        errors?: Record<string, string[]>;
      };
      const customError = new Error(serverData.message || 'Failed to sign in.');
      (customError as Error & { fieldErrors?: Record<string, string[]> }).fieldErrors =
        serverData.errors;
      throw customError;
    }
    throw new Error('Network error while signing in. Please try again.');
  }
}

export async function getCurrentAdmin(): Promise<AdminUser> {
  try {
    const response = await apiClient.get<{ success: boolean; data: AdminUser }>('/admin/me');
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const serverData = error.response.data as { message?: string };
      const customError = new Error(serverData.message || 'Unable to verify admin session.');
      (customError as Error & { statusCode?: number }).statusCode = error.response.status;
      throw customError;
    }
    throw new Error('Network error while verifying admin session.');
  }
}
