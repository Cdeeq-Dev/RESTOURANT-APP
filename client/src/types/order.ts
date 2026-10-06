export type OrderType = 'ROOM_DELIVERY' | 'TAKEOUT';

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'ON_THE_WAY'
  | 'DELIVERED'
  | 'CANCELLED';

export interface CreateOrderItemInput {
  menuItemId: string;
  quantity: number;
  specialInstructions?: string | null;
}

export interface CreateOrderPayload {
  customerName: string;
  phone: string;
  orderType: OrderType;
  roomNumber?: string | null;
  specialInstructions?: string | null;
  items: CreateOrderItemInput[];
}

export interface OrderItemResponse {
  id: string;
  menuItemId: string;
  name: string;
  unitPrice: number; // integer KOBO
  quantity: number;
  specialInstructions?: string | null;
}

export interface OrderResponse {
  id?: string;
  orderNumber: string;
  customerName: string;
  phone?: string;
  orderType: OrderType;
  roomNumber?: string | null;
  specialInstructions?: string | null;
  status: OrderStatus;
  totalAmount: number; // integer KOBO
  createdAt: string;
  items: OrderItemResponse[];
}
