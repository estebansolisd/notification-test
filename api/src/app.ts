import express from 'express';
import userRoutes from './routes/userRoutes';
import sequelize from './config/database';

const app = express();

app.use(express.json());
app.use('/api', userRoutes);

sequelize.sync().then(() => {
  console.log('Database synced');
}).catch((err) => {
  console.error('Failed to sync database:', err);
});

export default app;