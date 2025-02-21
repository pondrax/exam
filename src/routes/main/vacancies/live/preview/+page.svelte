<script lang="ts">
	import { page } from '$app/state';
	import { io, type Socket } from 'socket.io-client';
	import * as mediasoupClient from 'mediasoup-client';
	import { tick } from 'svelte';
	import { PUBLIC_SOCKET_URL } from '$env/static/public';
	import { d, delay } from '$lib/utils';

	let batch = page.url.searchParams.get('batch');
	let clients: Record<string, Record<string, string>> = $state({});
	let remoteStreams: Record<string, any> = $state({});
	let remoteVideoStreams: Record<string, HTMLVideoElement> = $state({});

	let socket: Socket;
	let device: mediasoupClient.Device;
	let consumerTransport: mediasoupClient.types.Transport;

	async function createDevice() {
		device = new mediasoupClient.Device();
		const routerRtpCapabilities = await socket.emitWithAck('getRouterRtpCapabilities');
		await device.load({ routerRtpCapabilities });

		const consumerInfo = await socket.emitWithAck('createTransport');
		consumerTransport = device.createRecvTransport(consumerInfo);

		consumerTransport.on('connect', ({ dtlsParameters }, callback) => {
			socket.emit('connectTransport', { id: consumerTransport.id, dtlsParameters }, callback);
		});

		consumerTransport.on('connectionstatechange', (state) => {
			console.log('Transport state:', state);
			if (state === 'connected') startConsuming();
			if (state === 'failed' || state === 'disconnected') startConsuming();
		});
	}
	async function startConsuming() {
		console.log('Start Consumer', d().format('HH:mm:ss'));
		// Request consumer data from the server
		const consumerData: Record<
			string,
			Record<string, mediasoupClient.types.ConsumerOptions & { name?: string }>
		> = await socket.emitWithAck('consume', {
			id: consumerTransport.id,
			rtpCapabilities: device.rtpCapabilities
		});

		console.log('consumerData:', consumerData);

		// remoteStreams = {};
		for (const [key, consumer] of Object.entries(consumerData)) {
			console.log(consumer);
			// Skip if already consuming this stream
			// if (remoteStreams[key]) continue;
			let name;
			const stream = new MediaStream();
			for (const kind of ['video', 'audio']) {
				if (consumer[kind]) {
					const { track } = await consumerTransport.consume(consumer[kind]);
					stream.addTrack(track);
					name = consumer[kind]?.name;
					// console.log('track:', name, track);
				}
			}

			if (name) {
				remoteStreams[key] = { name };
				await tick();
				remoteVideoStreams[key].srcObject = stream;
				// remoteVideoStreams[key].muted = true;
				// remoteVideoStreams[key].play();
			}
		}
		// console.log(consumerTransport);
	}

	$effect(() => {
		socket = io(PUBLIC_SOCKET_URL, {
			path: '/stream'
		});

		socket.on('connect', async () => {
			console.log('Connected to server', d().format('HH:mm:ss'));
			await createDevice();
			await socket.emitWithAck('join', { room: batch, name: 'admin' });
			startConsuming();
		});
		// Listen for messages
		socket.on('userJoined', (data) => {
			startConsuming();
			console.log(`${data.name} has joined the room.`);
		});

		socket.on('userLeft', (data) => {
			startConsuming();
			// delete remoteStreams[data.id];
			console.log(data);
			console.log(`${data.name} has left the room.`);
		});

		socket.on('new-stream', (data) => {
			startConsuming();
			console.log(`${data.name} started a new stream: ${data.kind}`);
		});

		return () => {
			socket.disconnect();
		};
	});
</script>

<div class="flex flex-col md:flex-row md:justify-between">
	<h2 class="text-xl">Live Stream {batch}</h2>
	<div>
		<div class="join flex-none">
			<a class="btn btn-secondary join-item" href="./"> Kembali daftar Stream </a>
			<button
				class="btn btn-primary join-item tooltip"
				onclick={startConsuming}
				aria-label="Refresh Stream"
				data-tip="Refresh Stream"
			>
				<iconify-icon icon="bx:refresh" class="text-xl"> </iconify-icon>
			</button>
		</div>
		<!-- <button class="btn btn-sm btn-soft btn-secondary" onclick={() => (view.status = ['active'])}>
				<iconify-icon icon="bx:show"></iconify-icon>
				Inactive
			</button> -->
	</div>
</div>
<!-- <div class="navbar bg-base-100 sticky top-0 z-10 shadow-sm">
	<div class="flex-none">
		<img src="/favicon.png" class="w-15" alt="logo" />
	</div>
	<div class="flex-1">
		<div class="btn btn-ghost text-xl">
			<span class="uppercase">{batch}</span>
			Live Stream
		</div>
	</div>
	<div class="join flex-none">
		<a class="btn btn-secondary join-item" href="./"> Kembali daftar Stream </a>
		<button class="btn btn-primary join-item" onclick={startConsuming} aria-label="Refresh Stream">
			<iconify-icon icon="bx:refresh" class="text-xl"> </iconify-icon>
		</button>
	</div>
</div> -->

<div>
	<h2 class="text-lg">
		Remote Streams ({Object.keys(remoteStreams).length})
	</h2>
	<!-- {JSON.stringify(remoteStreams, null, 2)} -->
	<div class="my-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each Object.entries(remoteStreams) as [key, { name }]}
			<div class="card rounded-xl shadow-xl">
				<!-- svelte-ignore a11y_media_has_caption -->
				<video
					bind:this={remoteVideoStreams[key]}
					autoplay
					muted
					playsinline
					controls
					class="rounded-xl"
				></video>
				<!-- <div>{key}</div> -->
				<div class="p-2 text-center">{name}</div>
			</div>
		{/each}
	</div>
</div>
