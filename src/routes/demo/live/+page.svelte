<script lang="ts">
	import { io, type Socket } from 'socket.io-client';
	import * as mediasoupClient from 'mediasoup-client';
	import { tick } from 'svelte';

	let info = $state({});
	let localStream: MediaStream;
	let remoteStreams: Record<string, MediaStream> = $state({});
	let remoteVideoStreams: Record<string, HTMLVideoElement> = $state({});
	let videoEl: HTMLVideoElement;

	let socket: Socket;
	let device: mediasoupClient.Device;
	let producerTransport: mediasoupClient.types.Transport;
	let consumerTransport: mediasoupClient.types.Transport;

	async function createDevice() {
		device = new mediasoupClient.Device();
		const routerRtpCapabilities = await socket.emitWithAck('getRouterRtpCapabilities');
		await device.load({ routerRtpCapabilities });

		const producerInfo = await socket.emitWithAck('createTransport');
		producerTransport = device.createSendTransport(producerInfo);
		producerTransport.on('connect', ({ dtlsParameters }, callback) => {
			socket.emit('connectTransport', { id: producerTransport.id, dtlsParameters }, callback);
		});

		producerTransport.on('produce', async ({ kind, rtpParameters }, callback) => {
			socket.emit('produce', { id: producerTransport.id, kind, rtpParameters }, callback);
		});
		const consumerInfo = await socket.emitWithAck('createTransport');
		consumerTransport = device.createRecvTransport(consumerInfo);

		consumerTransport.on('connect', ({ dtlsParameters }, callback) => {
			socket.emit('connectTransport', { id: consumerTransport.id, dtlsParameters }, callback);
		});
	}

	async function startProducing() {
		console.log('startProducing');
		localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
		videoEl.srcObject = localStream;
		localStream.getTracks().forEach(async (track) => {
			producerTransport.produce({ track });
		});
	}

	async function startConsuming() {
		console.log('startConsuming');
		const consumerData: Record<
			string,
			Record<string, mediasoupClient.types.ConsumerOptions>
		> = await socket.emitWithAck('consume', {
			id: consumerTransport.id,
			rtpCapabilities: device.rtpCapabilities
		});

		console.log('consumerData:', consumerData);
		for (const [key, con] of Object.entries(consumerData)) {
			let active = false;
			const stream = new MediaStream();
			for (const kind of ['video', 'audio']) {
				if (con[kind]) {
					active = true;
					const consumer = await consumerTransport.consume(con[kind]);
					console.log(consumer.track.readyState);
					stream.addTrack(consumer.track);
				}
			}
			if (active) {
				remoteStreams[key] = stream;
				await tick();
				remoteVideoStreams[key].srcObject = stream;
			}
		}
	}

	async function getInfo() {
		console.log('getInfo');
		info = await socket.emitWithAck('getInfo');
		console.log(info);
	}

	$effect(() => {
		socket = io('https://node.dra.my.id', {
			path: '/stream'
		});

		socket.on('new-stream', () => {
			console.log('new-stream');
			startConsuming();
		});

		(async () => {
			await createDevice();
			await startProducing();
			// setTimeout(startConsuming, 1000);
		})();
		return () => {
			socket.disconnect();
		};
	});
</script>

<div class="min-h-screen">
	<button onclick={startProducing} class="btn">Send Video</button>
	<button onclick={startConsuming} class="btn">Receive Video</button>
	<button onclick={getInfo} class="btn">Get INFO</button>

	<!-- <div>{JSON.stringify(info, null, 2)}</div> -->
	<div>
		<h2 class="text-lg">Local Video</h2>
		<!-- svelte-ignore a11y_media_has_caption -->
		<video bind:this={videoEl} autoplay playsinline muted class="scale-x-[-1]"></video>
	</div>

	<div>
		<h2 class="text-lg">Remote Streams</h2>
		<!-- {JSON.stringify(remoteStreams, null, 2)} -->
		<div class="grid grid-cols-3 gap-5">
			{#each Object.entries(remoteStreams) as [key]}
				<div class="card">
					<!-- svelte-ignore a11y_media_has_caption -->
					<video bind:this={remoteVideoStreams[key]} autoplay playsinline></video>
					<div>{key}</div>
				</div>
			{/each}
		</div>
	</div>
</div>
