import http from 'http';
import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';
import { initSocketServer } from './socket/socket.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// Initialize Socket.IO
initSocketServer(server);

server.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});