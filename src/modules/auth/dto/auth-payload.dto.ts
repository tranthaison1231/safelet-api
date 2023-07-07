import { Gender } from '@/modules/users/users.schema';
import { z } from 'zod';

export const signUpDto = z.object({
  name: z
    .string({
      required_error: 'Name is required',
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
  gender: z.nativeEnum(Gender),
});

export type SignUpDto = Required<z.infer<typeof signUpDto>>;
