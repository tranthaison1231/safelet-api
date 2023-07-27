import { auth } from '@/middlewares/auth';
import { NextFunction, Request, Response, Router } from 'express';
import { validateRequest } from 'zod-express-middleware';
import { AuthService } from './auth.service';
import {
  signInDto,
  signUpDto,
  forgotPasswordDto,
  resetPasswordDto,
  confirmEmailDto,
  updateProfileDto,
  refreshTokenDto,
  changePasswordDto,
} from './dto/auth-payload.dto';
import jwt from 'jsonwebtoken';
import { UnauthorizedException } from '@/utils/exceptions';

export const router: Router = Router();

router
  .post(
    '/sign-up',
    validateRequest({
      body: signUpDto,
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await AuthService.signUp(req.body);
        res.status(201).json({
          message: 'Sign up successfully. Please check your email to verify your account.',
        });
      } catch (error) {
        next(error);
      }
    }
  )
  .post(
    '/forgot-password',
    validateRequest({
      body: forgotPasswordDto,
    }),
    async (req: Request, res: Response) => {
      await AuthService.forgotPassword(req.body);
      res.status(200).json({
        message: 'Please check your email to reset your password.',
      });
    }
  )
  .put('/verify-email', auth, async (req: Request, res: Response) => {
    await AuthService.verifyEmail(req.user);
    res.status(200).json({
      message: 'Please check your email to verify your account.',
    });
  })
  .put(
    '/confirm-email',
    auth,
    validateRequest({
      body: confirmEmailDto,
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await AuthService.confirmEmail(req.user, req.body.code);
        res.status(200).json({
          message: 'Verify email successfully.',
        });
      } catch (error) {
        next(error);
      }
    }
  )
  .post(
    '/reset-password',
    auth,
    validateRequest({
      body: resetPasswordDto,
    }),
    async (req: Request, res: Response) => {
      await AuthService.resetPassword(req.body, req.user);
      res.status(200).json({
        message: 'Reset password successfully.',
      });
    }
  )
  .post(
    '/sign-in',
    validateRequest({
      body: signInDto,
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = await AuthService.signIn(req.body);
        res.status(200).json(data);
      } catch (error) {
        next(error);
      }
    }
  )
  .get('/profile', auth, async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({ user: req.user });
    } catch (error) {
      next(error);
    }
  })
  .put(
    '/profile',
    auth,
    validateRequest({
      body: updateProfileDto,
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = await AuthService.updateProfile(req.body, req.user);
        res.status(200).json({ user });
      } catch (error) {
        next(error);
      }
    }
  )
  .put(
    '/refresh-token',
    validateRequest({
      body: refreshTokenDto,
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const jwtObject = jwt.decode(token) as { userId: string };
        const userID = jwtObject?.userId;
        if (!userID) throw new UnauthorizedException('Invalid token');
        const data = await AuthService.refreshToken(req.body, userID as string);
        res.status(200).json(data);
      } catch (error) {
        next(error);
      }
    }
  )
  .put(
    '/change-password',
    auth,
    validateRequest({
      body: changePasswordDto,
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await AuthService.changePassword(req.body, req.user);
        res.status(200).json({
          message: 'Change password successfully.',
        });
      } catch (error) {
        next(error);
      }
    }
  )
  .put('/logout', auth, async (req: Request, res: Response, next: NextFunction) => {
    try {
      await AuthService.logout(req.user);
      res.status(200).json({
        message: 'Logout successfully.',
      });
    } catch (error) {
      next(error);
    }
  });
