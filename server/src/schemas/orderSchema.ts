import { z } from 'zod';
import { OrderType } from '@prisma/client';

export const orderItemSchema = z
  .object({
    menuItemId: z
      .string({ required_error: 'menuItemId is required' })
      .min(1, 'menuItemId cannot be empty'),
    quantity: z
      .number({ required_error: 'quantity is required' })
      .int('quantity must be an integer')
      .min(1, 'quantity must be at least 1')
      .max(20, 'quantity cannot exceed 20'),
    specialInstructions: z
      .string()
      .max(500, 'specialInstructions must not exceed 500 characters')
      .optional()
      .nullable(),
  })
  .strict();

export const createOrderSchema = z
  .object({
    customerName: z
      .string({ required_error: 'customerName is required' })
      .trim()
      .min(2, 'customerName must be at least 2 characters')
      .max(100, 'customerName must not exceed 100 characters'),
    phone: z
      .string({ required_error: 'phone is required' })
      .trim()
      .min(5, 'phone must be at least 5 characters')
      .max(20, 'phone must not exceed 20 characters'),
    orderType: z.nativeEnum(OrderType, {
      errorMap: () => ({ message: 'orderType must be ROOM_DELIVERY or TAKEOUT' }),
    }),
    roomNumber: z
      .string()
      .trim()
      .max(50, 'roomNumber must not exceed 50 characters')
      .optional()
      .nullable(),
    specialInstructions: z
      .string()
      .max(500, 'specialInstructions must not exceed 500 characters')
      .optional()
      .nullable(),
    items: z
      .array(orderItemSchema, { required_error: 'items must be provided' })
      .min(1, 'items must contain at least one item'),
  })
  .strict()
  .superRefine((data, ctx) => {
    if (data.orderType === OrderType.ROOM_DELIVERY) {
      if (!data.roomNumber || data.roomNumber.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'roomNumber is required when orderType is ROOM_DELIVERY',
          path: ['roomNumber'],
        });
      }
    }
  });

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
