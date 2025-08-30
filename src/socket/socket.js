import { Server } from 'socket.io';

let io;
const userSocketMap = {}; // { userId: socketId }

export const initSocketServer = (server) => {
    io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000', // Your frontend URL
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        const userId = socket.handshake.query.userId;
        if (userId) {
            userSocketMap[userId] = socket.id;
        }

        // Emit event to all clients with the list of online users
        io.emit('getOnlineUsers', Object.keys(userSocketMap));

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
            // Remove user from the map and update online status
            for (const [key, value] of Object.entries(userSocketMap)) {
                if (value === socket.id) {
                    delete userSocketMap[key];
                    break;
                }
            }
            io.emit('getOnlineUsers', Object.keys(userSocketMap));
        });
    });
};

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

export const getIo = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};