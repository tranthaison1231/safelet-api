import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import { router as alarms } from '@/modules/alarms/alarms.controller';
import { router as users } from '@/modules/users/users.controller';
import { router as auth } from '@/modules/auth/auth.controller';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

dotenv.config();

const app: Express = express();
app.use(bodyParser.json());
const port = process.env.PORT;

app.use('/api', auth);
app.use('/api/users', users);
app.use('/api/alarms', alarms);
app.get('*', function (_req: Request, res: Response) {
  return res.status(404).json({ status: 404, message: 'Not Found' });
});

const bootstrap = async () => {
  try {
    console.log('🚀 Connecting to MongoDB');
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
