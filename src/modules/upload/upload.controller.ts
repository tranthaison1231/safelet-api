import { s3Service } from '@/lib/s3.service';
import { auth } from '@/middlewares/auth';
import { NextFunction, Request, Response, Router } from 'express';
import multer from 'multer';
import { validateRequest } from 'zod-express-middleware';
import { getPresignedUrlDto } from './dto/upload.dto';

export const router: Router = Router();

router
  .post('/', auth, multer().single('file'), async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await s3Service.uploadFile(req.file);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  })
  .post(
    '/presigned-url',
    auth,
    validateRequest({
      body: getPresignedUrlDto,
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = await s3Service.presignedUrlS3(req.body);
        res.status(201).json(data);
      } catch (error) {
        next(error);
      }
    }
  );
