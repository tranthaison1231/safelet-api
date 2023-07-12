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

const UserSchema = new mongoose.Schema<User>({
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
});

UserSchema.set('toJSON', {
  transform: function (_doc, ret) {
    delete ret.password;
    delete ret.salt;
    return ret;
  },
});

export const UserModel = mongoose.model('users', UserSchema);
