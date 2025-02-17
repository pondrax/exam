import { createServer } from 'http';
import { Server } from 'socket.io';
import { createWorker } from 'mediasoup';
import { handler } from '../build/handler.js';

console.log(process.env);
const server = createServer((req, res) => {
	handler(req, res);
});

const io = new Server(server, {
	cors: { origin: '*' },
	path: '/stream'
});

let worker, router;
let clients = {};

async function initMediasoup() {
	worker = await createWorker();
	router = await worker.createRouter({
		mediaCodecs: [
			{ kind: 'video', mimeType: 'video/vp8', clockRate: 90000 },
			{ kind: 'audio', mimeType: 'audio/opus', clockRate: 48000, channels: 2 }
		]
	});
}

io.on('connection', async (socket) => {
	console.log('Client connected:', socket.id);
	clients[socket.id] = {
		video: null,
		audio: null,
		room: null, // Track the room the client is in
		name: null, // Track the name of the client
		transports: {}
	};

	// Listen for the 'join' event, where client sends room and name
	socket.on('join', async ({ room, name }) => {
		// Save room and name information
		clients[socket.id].room = room;
		clients[socket.id].name = name;

		// Join the room
		socket.join(room);
		console.log(`${name} joined room: ${room}`);

		// Emit to the client that they've successfully joined the room
		socket.emit('joinedRoom', { room, name });

		// Optionally, broadcast to the room that a new user has joined
		io.to(room).emit('userJoined', { userId: socket.id, name });
	});

	// Handle disconnection
	socket.on('disconnect', () => {
		const { room, name } = clients[socket.id];
		if (room) {
			// Broadcast to the room that the user has left
			io.to(room).emit('userLeft', { userId: socket.id, name });
		}
		console.log('Client disconnected:', socket.id, clients[socket.id].name);
		delete clients[socket.id];
	});

	socket.on('getRouterRtpCapabilities', (callback) => {
		callback(router.rtpCapabilities);
	});

	socket.on('createTransport', async (callback) => {
		const transport = await router.createWebRtcTransport({
			listenInfos: [{ ip: process.env.LISTEN_IP, announcedAddress: process.env.ANNOUNCED_ADDRESS }],
			enableUdp: true,
			enableTcp: false
		});

		callback({
			id: transport.id,
			iceParameters: transport.iceParameters,
			iceCandidates: transport.iceCandidates,
			dtlsParameters: transport.dtlsParameters
		});

		transport.on('dtlsstatechange', (state) => {
			if (state === 'closed') {
				transport.close();
				console.log('Transport closed %s', transport.id);
			}
		});
		clients[socket.id].transports[transport.id] = transport;
	});

	socket.on('connectTransport', async ({ id, dtlsParameters }, callback) => {
		const transport = clients[socket.id].transports[id];
		await transport.connect({ dtlsParameters });
		callback();
	});

	socket.on('produce', async ({ id, kind, rtpParameters }, callback) => {
		const transport = clients[socket.id].transports[id];
		if (!transport) return callback({});
		const producer = await transport.produce({ kind, rtpParameters });
		callback({ id: producer.id });
		clients[socket.id][kind] = producer;

		// Broadcast the new stream to all clients in the room
		const room = clients[socket.id].room;
		io.to(room).emit('new-stream', { userId: socket.id, name: clients[socket.id].name, kind });
	});
	socket.on('consume', async ({ id, rtpCapabilities }, callback) => {
		const transport = clients[socket.id].transports[id];
		if (!transport) return callback({});

		const room = clients[socket.id].room;
		const consumers = {};
		for (const [key, client] of Object.entries(clients)) {
			if (client.room !== room) continue;
			const consumerData = {};
			for (const kind of ['video', 'audio']) {
				const producer = client[kind];
				if (!producer) continue;
				if (router.canConsume({ producerId: producer.id, rtpCapabilities })) {
					const consumer = await transport.consume({
						producerId: producer.id,
						rtpCapabilities,
						paused: false
					});

					consumerData[kind] = {
						id: consumer.id,
						producerId: producer.id,
						kind: consumer.kind,
						rtpParameters: consumer.rtpParameters,
						name: client.name,
						room: client.room // Append client name to the consumer object
					};
				}
			}
			if (Object.keys(consumerData).length > 0) {
				consumers[key] = consumerData;
			}
		}
		callback(consumers);
	});
	socket.on('getInfo', async (callback) => {
		const rooms = [
			...new Set(
				Object.values(clients)
					.map((client) => client.room)
					.filter(Boolean)
			)
		];
		callback({ rooms, clients });
	});
});

server.listen(3000, async () => {
	await initMediasoup();
	console.log('Server running on http://localhost:3000');
});
