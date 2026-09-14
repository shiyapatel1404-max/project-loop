require('dotenv').config();
const app = require('./app');
const http = require('http');
const socketIo = require('socket.io');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

// WebSocket Setup
const io = socketIo(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
  }
});

// Socket.io Connection Handler
io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);

  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });

  socket.on('feedback:new', (data) => {
    io.emit('feedback:updated', data);
  });

  socket.on('analytics:subscribe', (organizationId) => {
    socket.join(`org:${organizationId}`);
  });
});

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = { server, io };
