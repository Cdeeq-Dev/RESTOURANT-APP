import { apiClient } from './api';
import type { CreateOrderPayload, OrderResponse } from '../types/order';
import axios from 'axios';

export interface ApiFieldError {
  message: string;
  fieldErrors?: Record<string, string[]>;
}

export async function createOrder(payload: CreateOrderPayload): Promise<OrderResponse> {
  try {
    const response = await apiClient.post<{ success: boolean; message?: string; data: OrderResponse }>(
      '/orders',
      payload
    );
    return response.data.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const serverData = error.response.data;
      const customErr: Error & ApiFieldError = new Error(serverData.message || 'Failed to place order.');
      if (serverData.errors) {
        customErr.fieldErrors = serverData.errors;
      }
      throw customErr;
    }
    throw new Error(error.message || 'Network error while placing order. Please try again.');
  }
}

export async function getOrderByOrderNumber(orderNumber: string): Promise<OrderResponse> {
  try {
    const response = await apiClient.get<{ success: boolean; data: OrderResponse }>(
      `/orders/${encodeURIComponent(orderNumber)}`
    );
    return response.data.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const serverData = error.response.data;
      const customErr = new Error(serverData.message || 'Order not found');
      (customErr as any).statusCode = error.response.status;
      throw customErr;
    }
    throw new Error(error.message || 'Network error while fetching order details.');
  }
}
