import mongoose from 'mongoose';

export interface User {
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber: string;
  password: string;
  salt?: string;
}

const UserSchema = new mongoose.Schema<User>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
  },
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

export type UserDocument = User & mongoose.Document;
export const UserModel = mongoose.model('users', UserSchema);
