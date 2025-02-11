<script lang="ts">
	import { page } from '$app/state';
	import { d } from '$lib/utils';
	import * as mediasoupClient from 'mediasoup-client';
	import io, { type Socket } from 'socket.io-client';
	import questionsData from './questions';
	import { PUBLIC_SOCKET_URL } from '$env/static/public';

	let localStream: MediaStream;
	let localVideo: HTMLVideoElement;

	let socket: Socket;
	let device: mediasoupClient.Device;
	let producerTransport: mediasoupClient.types.Transport;

	let batch = page.url.searchParams.get('batch');
	let email = page.url.searchParams.get('email');

	let timer = $state(d());
	let duration = 60 * 2;
	let startTime = $state(d().add(-60, 'minute'));
	let endTime = $state(startTime.add(duration, 'minute'));

	let remainingTime = $derived(Math.max(0, Math.round(endTime.diff(timer, 'seconds'))));
	function formatTime(seconds: number) {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
	}

	let questionIndex = $state(0);
	let questions = $state(shuffleQuestionsAndOptions(questionsData));
	function shuffleArray<T>(array: T[]): T[] {
		return array
			.map((item) => ({ item, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ item }) => item);
	}

	function shuffleQuestionsAndOptions(questions: any[]) {
		return shuffleArray(questions).map((q) => ({
			...q,
			options: shuffleArray(q.options)
		}));
	}
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
	}

	async function startProducing() {
		console.log('startProducing');
		localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
		localVideo.srcObject = localStream;
		localStream.getTracks().forEach(async (track) => {
			producerTransport.produce({ track });
		});
	}

	$effect(() => {
		setInterval(() => {
			timer = d();
		}, 1000);
	});

	$effect(() => {
		socket = io(PUBLIC_SOCKET_URL, {
			path: '/stream'
		});

		socket.on('connect', () => {
			console.log('Connected to server');
			socket.emit('join', { batch, email });
		});

		(async () => {
			await createDevice();
			await startProducing();
		})();
		return () => {
			socket.disconnect();
		};
	});
</script>

<div class="navbar bg-base-100 shadow-sm">
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
	</div>
</div>
<div class="mx-auto flex w-full max-w-7xl grow gap-5 p-5">
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
	<div class="flex-none">
		<div class="flex w-60 flex-grow-0 flex-col gap-5">
			<div class="shrink-0">
				<!-- svelte-ignore a11y_media_has_caption -->
				<video bind:this={localVideo} autoplay playsinline class="rounded-xl border"></video>
			</div>
			<div class="max-h-100 grid grow grid-cols-5 gap-1 overflow-auto">
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
</div>
