import { z } from 'zod';

export const authLoginZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'Phone Number is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

export const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});