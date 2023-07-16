import { mailService } from '@/lib/mail.service';
import { CLIENT_URL, JWT_SECRET } from '@/utils/constants';
import { NotFoundException, UnauthorizedException } from '@/utils/exceptions';
import { comparePassword, hashPassword } from '@/utils/password';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, UserDocument, UserModel } from '../users/users.schema';
import { ForgotPasswordDto, ResetPasswordDto, SignInDto, SignUpDto } from './dto/auth-payload.dto';

export class AuthService {
  static async signUp(signUpDto: SignUpDto) {
    const body: User = signUpDto;
    const user = await UserModel.findOne({ email: signUpDto.email }).exec();
    if (user) throw new UnauthorizedException('Email already exists');
    const salt = bcrypt.genSaltSync(10);
    body.password = await hashPassword(signUpDto.password, salt);
    body.salt = salt;

    const newUser = await UserModel.create(body);
    return newUser;
  }

  static async createToken({ userId }: { userId: string }) {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1d' });
  }

  static async signIn({ email, password }: SignInDto) {
    const user = await UserModel.findOne({ email: email }).exec();
    if (!user) throw new NotFoundException('User not found');
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Password does not match');
    const token = await this.createToken({ userId: user._id.toString() });
    return { token };
  }

  static async forgotPassword({ email }: ForgotPasswordDto) {
    try {
      const user = await UserModel.findOne({ email: email }).exec();
      if (!user) throw new NotFoundException('User not found');
      const token = await this.createToken({ userId: user._id.toString() });
      await mailService.sendMail({
        to: user.email,
        subject: 'Reset Password',
        html: `<p>Click <a href="${CLIENT_URL}/reset-password?token=${token}">here</a> to reset your password.</p>`,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async resetPassword({ password }: ResetPasswordDto, user: UserDocument) {
    try {
      user.password = await hashPassword(password, user.salt);
      await user.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
