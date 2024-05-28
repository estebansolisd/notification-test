import express from 'express';
import sequelize from './config/database';
import { userRouter } from './routes/userRoutes';
import { notificationRouter } from './routes/notificationRoutes';
import { logRouter } from './routes/logRoutes';

const app = express();

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