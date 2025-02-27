<script lang="ts">
	import { page } from '$app/state';
	import { d } from '$lib/utils';
	import * as mediasoupClient from 'mediasoup-client';
	import io, { type Socket } from 'socket.io-client';
	import questionsData from './questions';
	import { PUBLIC_SOCKET_URL } from '$env/static/public';

	let loading = $state(true);
	let localStream = $state() as MediaStream;
	let localVideo: HTMLVideoElement | undefined = $state();

	let examActive = $state(false);
	let socket: Socket;
	let device: mediasoupClient.Device;
	let producerTransport: mediasoupClient.types.Transport;
	let producers = $state<mediasoupClient.types.Producer[]>([]);

	let batch = page.url.searchParams.get('batch');
	let email = page.url.searchParams.get('email');

	let timer = $state(d());
	let duration = 60 * 2;
	let startTime = $state(d().add(-60, 'minute'));
	let endTime = $state(startTime.add(duration, 'minute'));

	let remainingTime = $derived(Math.max(0, Math.round(endTime.diff(timer, 'seconds'))));
	let formatTime = (s: number) =>
		`${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

	let questionIndex = $state(0);
	let questions = $state(shuffle(questionsData));

	function shuffle<T>(arr: T[]): T[] {
		return arr
			.map((v) => ({ v, r: Math.random() }))
			.sort((a, b) => a.r - b.r)
			.map(({ v }) => v);
	}

	async function createDevice() {
		device = new mediasoupClient.Device();
		await device.load({
			routerRtpCapabilities: await socket.emitWithAck('getRouterRtpCapabilities')
		});

		const producerInfo = await socket.emitWithAck('createTransport');
		producerTransport = device.createSendTransport(producerInfo);

		producerTransport.on('connect', ({ dtlsParameters }, callback) =>
			socket.emit('connectTransport', { id: producerTransport.id, dtlsParameters }, callback)
		);
		producerTransport.on('produce', async ({ kind, rtpParameters }, callback) =>
			socket.emit('produce', { id: producerTransport.id, kind, rtpParameters }, callback)
		);
		producerTransport.on('connectionstatechange', (state) => {
			console.log('Transport state:', state);
			if (state === 'connected') startProducing();
			if (state === 'failed' || state === 'disconnected') startProducing();
		});
	}

	async function startProducing() {
		console.log('Starting producer', d().format('HH:mm:ss'));
		if (!producerTransport) return console.warn('No transport');

		localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
		if (localVideo) localVideo.srcObject = localStream;

		localStream.getTracks().forEach(async (track) => {
			if (producers.some((p) => p.track === track)) return;

			const producer = await producerTransport.produce({
				track,
				encodings: [{ maxBitrate: 100_000, scaleResolutionDownBy: 1 }]
			});
			producers.push(producer);
			producer.on('trackended', producer.close);
			producer.on('transportclose', producer.close);
		});
	}

	$effect(() => {
		setInterval(() => (timer = d()), 1000);
	});

	$effect(() => {
		socket = io(PUBLIC_SOCKET_URL, { path: '/stream' });

		socket.emit('join', { room: batch, name: email });
		socket.on('connect', async () => {
			console.log('Connected:', d().format('HH:mm:ss'));
			await createDevice();
			await startProducing();
			examActive = true;
			setTimeout(() => (loading = false), 1000);
		});
		socket.on('disconnect', () => (examActive = false));

		return () => socket.disconnect();
	});
</script>

{#if loading}
	<div
		class="bg-base-200 fixed top-0 right-0 bottom-0 left-0 z-20 flex items-center justify-center"
	>
		<div class="loading"></div>
	</div>
{/if}

<div class="fixed right-0 bottom-0 left-0 w-100">
	<div class="mx-auto flex w-full max-w-7xl grow items-end gap-5 p-5">
		<!-- svelte-ignore a11y_media_has_caption -->
		<video bind:this={localVideo} autoplay playsinline class="bg-base-200 rounded-xl border"
		></video>
	</div>
</div>
<div class="navbar bg-base-100 fixed top-0 z-10 shadow-sm">
	<div class="flex-none">
		<img src="/favicon.png" class="w-15" alt="logo" />
	</div>
	<div class="flex-1">
		<div class="btn btn-ghost text-xl">
			<span class="uppercase">{batch}</span>
			-
			{email}
		</div>
	</div>
	<div class="join flex-none">
		<div class="btn btn-ghost join-item">
			{timer.format('YYYY-MM-DD HH:mm:ss')}
		</div>
		<div class="btn btn-ghost join-item">
			{formatTime(remainingTime)}
		</div>
		<button class="btn btn-primary"> Selesai </button>
		<!-- <button onclick={startProducing} class="btn">Start Produce</button> -->
	</div>
</div>
{#if !localStream}
	<div class="alert alert-error">
		<iconify-icon icon="bx:error-circle" class="text-xl"></iconify-icon>
		<div>Aktifkan Kamera Untuk Melanjutkan</div>
		<div>
			<button type="button" onclick={startProducing} class="btn btn-neutral">Muat Ulang</button>
		</div>
	</div>
{/if}
{#if examActive}
	<div class="mx-auto mt-10 flex w-full max-w-7xl grow gap-5 p-5">
		<div class="flex-grow p-5 text-xl">
			{#if questionIndex > -1}
				{#if questions[questionIndex]}
					{@const question = questions[questionIndex]}
					<div class="card">
						<div class="text-xl">
							{@html question.question}
						</div>
						<ul class="menu menu-lg">
							{#each question.options as opt}
								<li>
									<button>{opt.label}</button>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			{/if}
		</div>
		<div class="w-60 flex-none">
			<div class="grid grow grid-cols-5 gap-1">
				{#each questions as que, i}
					<button
						class="btn"
						class:btn-active={questionIndex === i}
						onclick={() => (questionIndex = i)}
					>
						{i + 1}
					</button>
				{/each}
			</div>
		</div>
	</div>
{/if}
