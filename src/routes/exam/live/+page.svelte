<script lang="ts">
	import { page } from '$app/state';
	import { io, type Socket } from 'socket.io-client';
	import * as mediasoupClient from 'mediasoup-client';
	import { tick } from 'svelte';
	import { PUBLIC_SOCKET_URL } from '$env/static/public';

	let batch = $state([]);
	let clients: Record<string, Record<string, string>> = $state({});

	let socket: Socket;

	async function getInfo() {
		console.log('getInfo');
		batch = (await socket.emitWithAck('getInfo')).rooms;
		console.log(batch);
	}

	$effect(() => {
		socket = io(PUBLIC_SOCKET_URL, {
			path: '/stream'
		});

		getInfo();
		// setInterval(getInfo, 1000);

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
		<div class="btn btn-ghost text-xl">Live Stream</div>
	</div>
	<div class="join flex-none">
		<div class="btn btn-ghost join-item"></div>
		<div class="btn btn-ghost join-item"></div>
	</div>
</div>

<div class="p-5">
	<!-- <h2 class="text-xl">Available Live Stream</h2> -->
	<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
		{#each batch as batchName}
			<div class="card card-dash bg-base-100">
				<div class="card-body">
					<h2 class="card-title">{batchName}</h2>
					<p>Ujian tentang Lorem Ipsum</p>
					<div class="card-actions justify-end">
						<a href={`/exam/live/preview?batch=${batchName}`} class="btn btn-secondary btn-wide"
							>Preview</a
						>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
