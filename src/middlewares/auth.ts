import { UserModel } from '@/modules/users/users.schema';
import { JWT_SECRET } from '@/utils/constants';
import { UnauthorizedException } from '@/utils/exceptions';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return next(new UnauthorizedException('Unauthorized'));
  }
  jwt.verify(token, JWT_SECRET, async (err: any, data: any) => {
    if (err) {
      return next(new UnauthorizedException('Unauthorized'));
    }
    const user = await UserModel.findById(data.userId);
    req.user = user;
    next();
  });
};
