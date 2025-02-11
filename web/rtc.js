import { createServer } from 'http';
import { Server } from 'socket.io';

import { handler } from '../build/handler.js';
const server = createServer((req, res) => {
  handler(req, res);
});

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', socket => {
  console.log('a user connected');

  // Relay offer/answer and ICE candidates
  socket.on('offer', (offer, roomId) => {
    socket.broadcast.to(roomId).emit('offer', offer);
  });

  socket.on('answer', (answer, roomId) => {
    socket.broadcast.to(roomId).emit('answer', answer);
  });

  socket.on('ice-candidate', (candidate, roomId) => {
    socket.broadcast.to(roomId).emit('ice-candidate', candidate);
  });

  // Create or join a room
  socket.on('join-room', roomId => {
    socket.join(roomId);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
