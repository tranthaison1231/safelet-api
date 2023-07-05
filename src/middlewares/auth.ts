import { NextFunction, Request, Response } from 'express';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (req.query.admin === 'true') {
    next();
  }
  res.json({
    message: 'You are not authorized to access this resource',
  });
};
