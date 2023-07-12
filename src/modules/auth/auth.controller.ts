import { logger } from '@/middlewares/logger';
import { NextFunction, Request, Response, Router } from 'express';
import { validateRequest } from 'zod-express-middleware';
import { AuthService } from './auth.service';
import { signUpDto, signInDto } from './dto/auth-payload.dto';
import { auth } from '@/middlewares/auth';

export const router: Router = Router();

router
  .post(
    '/sign-up',
    validateRequest({
      body: signUpDto,
    }),
    async (req: Request, res: Response) => {
      const user = await AuthService.signUp(req.body);
      res.status(201).json({ user });
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
