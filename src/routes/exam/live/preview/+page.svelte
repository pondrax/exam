<script lang="ts">
	import { page } from '$app/state';
	import { io, type Socket } from 'socket.io-client';
	import * as mediasoupClient from 'mediasoup-client';
	import { tick } from 'svelte';
	import { PUBLIC_SOCKET_URL } from '$env/static/public';

	let batch = page.url.searchParams.get('batch');
	let clients: Record<string, Record<string, string>> = $state({});
	let remoteStreams: Record<string, MediaStream> = $state({});
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
					// console.log(consumer.track.readyState);
					stream.addTrack(consumer.track);
				}
			}
			if (active) {
				remoteStreams[key] = stream;
				await tick();
				remoteVideoStreams[key].srcObject = stream;
			}
		}
		getInfo();
	}

	async function getInfo() {
		console.log('getInfo');
		clients = (await socket.emitWithAck('getInfo')).clients;
		console.log(clients);
	}

	$effect(() => {
		socket = io(PUBLIC_SOCKET_URL, {
			path: '/stream'
		});

		socket.on('new-stream', () => {
			console.log('new-stream');
			startConsuming();
		});

		(async () => {
			await createDevice();
			// await startProducing();
			setTimeout(startConsuming, 1000);
			setTimeout(startConsuming, 1000);
		})();
		return () => {
			socket.disconnect();
		};
	});
</script>

<div class="navbar bg-base-100 sticky top-0 z-10 shadow-sm">
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
		<a class="btn btn-secondary join-item" href="/exam/live"> Kembali daftar Stream </a>
		<button class="btn btn-primary join-item" onclick={startConsuming}>
			Refresh Remote Stream
		</button>
	</div>
</div>

<div class="p-5">
	<!-- <button onclick={startConsuming} class="btn">Receive Video</button> -->
	<!-- <button onclick={getInfo} class="btn">Get INFO</button> -->

	<div>
		<h2 class="text-lg">Remote Streams</h2>
		<!-- {JSON.stringify(remoteStreams, null, 2)} -->
		<div class="grid grid-cols-3 gap-5">
			{#each Object.entries(remoteStreams) as [key]}
				<div class="card rounded-xl border">
					<!-- svelte-ignore a11y_media_has_caption -->
					<video bind:this={remoteVideoStreams[key]} autoplay playsinline class="rounded-xl"
					></video>
					<!-- <div>{key}</div> -->
					<div class="text-center">{clients[key]?.email}</div>
				</div>
			{/each}
		</div>
	</div>
</div>
