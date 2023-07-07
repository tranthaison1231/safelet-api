import { logger } from '@/middlewares/logger';
import { Request, Response, Router } from 'express';
import { validateRequest } from 'zod-express-middleware';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/auth-payload.dto';

export const router: Router = Router();

router.post(
  '/sign-up',
  logger,
  validateRequest({
    body: signUpDto,
  }),
  async (req: Request, res: Response) => {
    const user = await AuthService.signUp(req.body);
    res.status(201).json({ user });
  }
);
