import { redisService } from '@/lib/redis.service';
import { UserModel } from '@/modules/users/users.schema';
import { UnauthorizedException } from '@/utils/exceptions';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return next(new UnauthorizedException('Unauthorized'));
  }
  const jwtObject = jwt.decode(token) as { userId: string };
  const userID = jwtObject?.userId;
  const jwtSecret = await redisService.get(`jwt-secret:${userID}`);

  jwt.verify(token, jwtSecret, async (err: any, data: any) => {
    if (err) {
      return next(new UnauthorizedException('Unauthorized'));
    }
    const user = await UserModel.findById(data.userId);
    req.user = user;
    next();
  });
};
