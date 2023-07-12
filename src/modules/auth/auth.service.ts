import { comparePassword, hashPassword } from '@/utils/password';
import { User, UserModel } from '../users/users.schema';
import { SignInDto, SignUpDto } from './dto/auth-payload.dto';
import * as bcrypt from 'bcrypt';
import { NotFoundException, UnauthorizedException } from '@/utils/exceptions';
import jwt from 'jsonwebtoken';

export class AuthService {
  static async signUp(signUpDto: SignUpDto) {
    try {
      const body: User = signUpDto;
      const salt = bcrypt.genSaltSync(10);
      body.password = await hashPassword(signUpDto.password, salt);
      body.salt = salt;

      const user = await UserModel.create(body);
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async createToken({ userId }: { userId: string }) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
  }

  static async signIn({ email, password }: SignInDto) {
    const user = await UserModel.findOne({ email: email }).exec();
    if (!user) throw new NotFoundException('User not found');
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Password does not match');
    const token = await this.createToken({ userId: user._id.toString() });
    return { token };
  }
}
