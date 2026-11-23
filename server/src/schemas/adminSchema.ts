import { z } from 'zod';

export const adminLoginSchema = z
  .object({
    email: z
      .string({ required_error: 'email is required' })
      .trim()
      .min(1, 'email is required')
      .email('email must be a valid email address')
      .transform((value) => value.toLowerCase()),
    password: z
      .string({ required_error: 'password is required' })
      .min(1, 'password is required'),
  })
  .strict();

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
