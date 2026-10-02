import { z } from 'zod';

export const createReservationSchema = z
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
    email: z
      .string()
      .trim()
      .email('Invalid email address')
      .max(255, 'email must not exceed 255 characters')
      .optional()
      .nullable()
      .or(z.literal('')),
    reservationDate: z.coerce
      .date({
        required_error: 'reservationDate is required',
        invalid_type_error: 'reservationDate must be a valid date',
      })
      .refine((date) => !isNaN(date.getTime()), {
        message: 'reservationDate must be a valid date',
      })
      .refine((date) => date.getTime() > Date.now(), {
        message: 'reservationDate must be in the future',
      }),
    guestCount: z
      .number({ required_error: 'guestCount is required' })
      .int('guestCount must be an integer')
      .min(1, 'guestCount must be at least 1')
      .max(20, 'guestCount cannot exceed 20'),
    specialRequests: z
      .string()
      .trim()
      .max(500, 'specialRequests must not exceed 500 characters')
      .optional()
      .nullable(),
  })
  .strict();

export type CreateReservationInput = z.infer<typeof createReservationSchema>;
