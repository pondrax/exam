import { createServer } from "http";
import { Server } from "socket.io";
import { createWorker } from "mediasoup";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: "*" },
  path: "/stream",
});

let worker, router;
let clients = {}

async function initMediasoup() {
  worker = await createWorker();
  router = await worker.createRouter({
    mediaCodecs: [
      { kind: "video", mimeType: "video/vp8", clockRate: 90000 },
      { kind: "audio", mimeType: "audio/opus", clockRate: 48000, channels: 2 },
    ],
  });
}

io.on("connection", async (socket) => {
  console.log("Client connected:", socket.id);
  clients[socket.id] = {
    video: null,
    audio: null,
    transports: {},
  }

  socket.on('disconnect', () => {
    console.log("Client disconnected:", socket.id);
    delete clients[socket.id];
  })
  socket.on("getRouterRtpCapabilities", (callback) => {
    callback(router.rtpCapabilities);
  });

  socket.on("createTransport", async (callback) => {
    const transport = await router.createWebRtcTransport({
      listenIps: [{ ip: "127.0.0.1" }],
      enableUdp: true,
      enableTcp: true,
    });

    callback({
      id: transport.id,
      iceParameters: transport.iceParameters,
      iceCandidates: transport.iceCandidates,
      dtlsParameters: transport.dtlsParameters,
    });

    transport.on("dtlsstatechange", (state) => {
      if (state === "closed") {
        transport.close();
      }
    });
    clients[socket.id].transports[transport.id] = transport
  });

  socket.on("connectTransport", async ({ id, dtlsParameters }, callback) => {
    const transport = clients[socket.id].transports[id]
    await transport.connect({ dtlsParameters });
    callback();
  });

  socket.on("produce", async ({ id, kind, rtpParameters }, callback) => {
    const transport = clients[socket.id].transports[id]
    const producer = await transport.produce({ kind, rtpParameters });
    callback({ id: producer.id });
    clients[socket.id][kind] = producer
  });

  socket.on("consume", async ({ id, rtpCapabilities }, callback) => {
    const transport = clients[socket.id].transports[id]

    const consumers = {}
    for (const [key, client] of Object.entries(clients)) {
      consumers[key] = {}
      for (const kind of ['video', 'audio']) {
        const producer = client[kind];
        if (!producer) continue;
        if (router.canConsume({ producerId: producer.id, rtpCapabilities })) {
          const consumer = await transport.consume({
            producerId: producer.id,
            rtpCapabilities,
            paused: false,
          });
          consumers[key][kind] = {
            id: consumer.id,
            producerId: producer.id,
            kind: consumer.kind,
            rtpParameters: consumer.rtpParameters,
          }
        }
      }
    }
    callback(consumers);
  });

  socket.on('getInfo', async (callback) => {
    callback({ clients })
  })
});

httpServer.listen(3000, async () => {
  await initMediasoup();
  console.log("Server running on http://localhost:3000");
});
