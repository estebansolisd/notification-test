import express from 'express';
import { userRouter } from './routes/userRoutes';
import sequelize from './config/database';

const app = express();

app.use(express.json());
app.use('/api/users', userRouter);

sequelize.sync().then(() => {
  console.log('Database synced');
}).catch((err) => {
  console.error('Failed to sync database:', err);
});

export default app;