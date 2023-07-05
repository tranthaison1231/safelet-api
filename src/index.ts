import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/api', (req: Request, res: Response) => {
  res.send('Hello this is API Route 🚀🚀');
});

app.get('/api/:id', (req: Request, res: Response) => {
  res.send('Hello this is API Route:' + req.params.id);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
