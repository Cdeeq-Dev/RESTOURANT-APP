import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import categoryRoutes from './routes/categoryRoutes';
import menuRoutes from './routes/menuRoutes';
import orderRoutes from './routes/orderRoutes';
import reservationRoutes from './routes/reservationRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Health Check Endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Hotel Restaurant API is running',
  });
});

// API Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reservations', reservationRoutes);

// 404 & Error Handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
