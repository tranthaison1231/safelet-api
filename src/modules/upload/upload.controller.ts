import { s3Service } from '@/lib/s3.service';
import { auth } from '@/middlewares/auth';
import { NextFunction, Request, Response, Router } from 'express';
import multer from 'multer';

export const router: Router = Router();

router.post('/', auth, multer().single('file'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await s3Service.uploadFile(req.file);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});
