import cors from 'cors';
import cookieParser from 'cookie-parser';
import { router as alarms } from '@/modules/alarms/alarms.controller';
import { router as auth } from '@/modules/auth/auth.controller';
import { router as users } from '@/modules/users/users.controller';
import { router as upload } from '@/modules/upload/upload.controller';
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import { logger } from './middlewares/logger';
import { errorFilter } from './middlewares/error-filter';
import { logging } from './middlewares/logging';
import { MONGO_URI, PORT } from './utils/constants';

const bootstrap = async () => {
  try {
    console.log('🚀 Connecting to MongoDB');

    const app: Express = express();

    app.use(express.json());
    app.use(
      cors({
        origin: true,
        credentials: true,
      })
    );
    app.use(cookieParser());
    app.use(logger);
    app.use(logging);

    app.use('/api', auth);
    app.use('/api/users', users);
    app.use('/api/alarms', alarms);
    app.use('/api/upload', upload);

    app.use('*', function (_req: Request, res: Response) {
      return res.status(404).json({ status: 404, message: 'Not Found' });
    });

    app.use(errorFilter);

    await mongoose.connect(MONGO_URI);
    console.log('🚀 Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the Mongo server!!');
    console.log(error);
    throw error;
  }
};

bootstrap();
