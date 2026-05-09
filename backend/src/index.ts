import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pagesRouter from './routes/pages';
import authRouter from './routes/auth';
import menusRouter from './routes/menus';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/pages', pagesRouter);
app.use('/api/auth', authRouter);
app.use('/api/menus', menusRouter);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root route to verify server is up
app.get('/', (req, res) => {
  res.send('KITS Akshar API is running.');
});

app.listen(PORT, () => {
  console.log('-------------------------------------------');
  console.log(`🚀 KITS Akshar Backend Initialized`);
  console.log(`📡 Listening on: http://localhost:${PORT}`);
  console.log('-------------------------------------------');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
