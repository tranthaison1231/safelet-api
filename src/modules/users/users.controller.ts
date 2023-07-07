import { logger } from '@/middlewares/logger';
import { zodValidators } from '@/utils/zod-validators';
import { Request, Response, Router } from 'express';
import { z } from 'zod';
import { validateRequest } from 'zod-express-middleware';
import { userUpdatedDto } from './dto/user-payload.dto';
import { UserService } from './users.service';

export const router: Router = Router();

router
  .get('/', logger, async (_req: Request, res: Response) => {
    const users = await UserService.getAll();
    res.status(200).json({ users });
  })
  .get(
    '/:id',
    logger,
    validateRequest({
      params: z.object({
        id: zodValidators.mongoID,
      }),
    }),
    async (req: Request, res: Response) => {
      const user = await UserService.getBy(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ user });
    }
  )
  .delete(
    '/:id',
    logger,
    validateRequest({
      params: z.object({
        id: zodValidators.mongoID,
      }),
    }),
    async (req: Request, res: Response) => {
      const user = await UserService.delete(req.params.id);
      res.status(200).json({ user });
    }
  )
  .put(
    '/:id',
    logger,
    validateRequest({
      params: z.object({
        id: zodValidators.mongoID,
      }),
      body: userUpdatedDto,
    }),
    async (req: Request, res: Response) => {
      const user = await UserService.updateBy(req.params.id, req.body);
      res.status(201).json({ user });
    }
  );
