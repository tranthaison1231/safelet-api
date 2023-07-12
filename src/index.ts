import { router as alarms } from '@/modules/alarms/alarms.controller';
import { router as auth } from '@/modules/auth/auth.controller';
import { router as users } from '@/modules/users/users.controller';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import { logger } from './middlewares/logger';
import { errorFilter } from './middlewares/error-filter';
import { logging } from './middlewares/logging';

dotenv.config();

const bootstrap = async () => {
  try {
    console.log('🚀 Connecting to MongoDB');

    const app: Express = express();
    app.use(express.json());
    app.use(logger);
    app.use(logging);
    const port = process.env.PORT;

    app.use('/api', auth);
    app.use('/api/users', users);
    app.use('/api/alarms', alarms);
    app.get('*', function (_req: Request, res: Response) {
      return res.status(404).json({ status: 404, message: 'Not Found' });
    });

    app.use(errorFilter);

    await mongoose.connect(process.env.MONGO_URI);
    console.log('🚀 Connected to MongoDB');
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to the Mongo server!!');
    console.log(error);
    throw error;
  }
};

bootstrap();
