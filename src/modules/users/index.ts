import { Request, Response, Router } from 'express';
import { logger } from '../../middlewares/logger';
import { auth } from '../../middlewares/auth';
import { User } from './schema';

export const router: Router = Router();

router.get('/', logger, async (_req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).json({ users });
});

router.get('/:id', logger, auth, (req: Request, res: Response) => {
  res.send('API Route:' + req.params.id);
});
