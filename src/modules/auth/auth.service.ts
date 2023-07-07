import { hashPassword } from '@/utils/password';
import { User, UserSchema } from '../users/users.schema';
import { SignUpDto } from './dto/auth-payload.dto';
import * as bcrypt from 'bcrypt';

export class AuthService {
  static async signUp(signUpDto: SignUpDto) {
    try {
      const body: User = signUpDto;
      const salt = bcrypt.genSaltSync(10);
      body.password = await hashPassword(signUpDto.password, salt);
      body.salt = salt;

      const user = await UserSchema.create(body);
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
