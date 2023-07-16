import { auth } from '@/middlewares/auth';
import { NextFunction, Request, Response, Router } from 'express';
import { validateRequest } from 'zod-express-middleware';
import { AuthService } from './auth.service';
import { signInDto, signUpDto, forgotPasswordDto, resetPasswordDto, confirmEmailDto } from './dto/auth-payload.dto';

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
  });
