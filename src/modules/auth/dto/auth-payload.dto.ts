import { z } from 'zod';

export const signUpDto = z.object({
  firstName: z
    .string({
      required_error: 'First Name is required',
    })
    .min(4)
    .max(255),
  lastName: z
    .string({
      required_error: 'Last Name is required',
    })
    .min(4)
    .max(255),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Email is not valid. Please provide a valid email address.'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(4),
  phoneNumber: z
    .string({
      required_error: 'PhoneNumber is required',
    })
    .min(10),
});

export type SignUpDto = Required<z.infer<typeof signUpDto>>;

export const signInDto = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Email is not valid. Please provide a valid email address.'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(4),
});

export type SignInDto = Required<z.infer<typeof signInDto>>;

export const forgotPasswordDto = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Email is not valid. Please provide a valid email address.'),
});

export type ForgotPasswordDto = Required<z.infer<typeof forgotPasswordDto>>;

export const resetPasswordDto = z.object({
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(4),
});

export type ResetPasswordDto = Required<z.infer<typeof resetPasswordDto>>;
