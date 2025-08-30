import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true,
}));
app.use(express.json()); // to parse JSON payloads from requests
app.use(cookieParser()); // to parse cookies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

export default app;