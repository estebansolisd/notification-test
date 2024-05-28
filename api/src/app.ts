import express from 'express';
import cors from "cors";
import sequelize from './config/database';
import { userRouter } from './routes/userRoutes';
import { notificationRouter } from './routes/notificationRoutes';
import { logRouter } from './routes/logRoutes';

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

// Use CORS middleware with options
app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/logs', logRouter);

sequelize.sync().then(() => {
  console.log('Database synced');
}).catch((err) => {
  console.error('Failed to sync database:', err);
});

export default app;