import mongoose from 'mongoose';

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}
export interface User {
  name?: string;
  email: string;
  gender: Gender;
  password: string;
  salt?: string;
}

export const UserSchema = mongoose.model(
  'users',
  new mongoose.Schema<User>({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender: String,
    password: {
      type: String,
      required: true,
    },
    salt: String,
  })
);
