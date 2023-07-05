import { Request, Response, Router } from 'express';
import { logger } from '@/middlewares/logger';
import { auth } from '@/middlewares/auth';

export const router: Router = Router();

router.get('/', logger, (_req: Request, res: Response) => {
  res.json({ message: 'Hello this is API Route 🚀🚀' });
});

router.get('/:id', logger, auth, (req: Request, res: Response) => {
  res.send('Hello this is API Route:' + req.params.id);
});
