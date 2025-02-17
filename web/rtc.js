import { createServer } from 'http';
import { Server } from 'socket.io';

import { handler } from '../build/handler.js';
const server = createServer((req, res) => {
	handler(req, res);
});

const io = new Server(server, {
	cors: {
		origin: '*'
	}
});

io.on('connection', (socket) => {
	console.log('a user connected');

	socket.on('join-room', (roomId) => {
		socket.join(roomId);
		console.log(`User joined room: ${roomId}`);
	});

	// Relay offer/answer and ICE candidates
	socket.on('offer', (offer, roomId) => {
		console.log('Relaying offer to', roomId);
		socket.broadcast.to(roomId).emit('offer', offer);
	});

	socket.on('answer', (answer, roomId) => {
		console.log('Relaying answer to', roomId);
		socket.broadcast.to(roomId).emit('answer', answer);
	});

	socket.on('ice-candidate', (candidate, roomId) => {
		console.log('Relaying ICE candidate to', roomId);
		socket.broadcast.to(roomId).emit('ice-candidate', candidate);
	});

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});

server.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});
