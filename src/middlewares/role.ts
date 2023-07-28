import { ForbiddenException, UnauthorizedException } from '@/utils/exceptions';
import { NextFunction, Request, Response } from 'express';

export const role = (roles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user) {
    return next(new UnauthorizedException('Unauthorized'));
  }
  if (!roles.includes(user.role)) {
    return next(new ForbiddenException('Forbidden'));
  }
  next();
};
