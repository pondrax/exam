<script lang="ts">
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pb';

	let { children } = $props();

	async function init() {
		console.log(pb.authStore);
		if (!pb.authStore.isValid) {
			goto('/login');
		}
	}
	async function logout() {
		pb.authStore.clear();
		goto('/login');
	}
	$effect(() => {
		init();
	});
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="drawer lg:drawer-open">
	<input id="sidebar" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content min-h-screen p-2">
		<!-- Page content here -->
		<div class="app-background h-full rounded-xl p-5 shadow-xl">
			<label for="sidebar" class="btn drawer-button lg:hidden">
				<iconify-icon icon="bx-menu" class="text-xl"></iconify-icon>
			</label>
			{@render children()}
		</div>
	</div>
	<div class="drawer-side">
		<label for="sidebar" aria-label="close sidebar" class="drawer-overlay"></label>
		<div class="bg-base-100 flex min-h-full flex-col">
			<div class="p-5 text-center">
				<div class="avatar mt-10">
					<div class="mask mask-squircle w-24">
						<img
							src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
							alt="avatar"
						/>
					</div>
				</div>
				<div>Nama User</div>
				<div class="join">
					<a href="/app/profile" class="btn btn-xs btn-primary join-item">
						<iconify-icon icon="bx:user" class="text-xl"></iconify-icon>
						Profile
					</a>
					<button type="button" class="btn btn-xs btn-neutral join-item" onclick={logout}>
						<iconify-icon icon="bx:exit" class="text-xl"></iconify-icon>
						Logout
					</button>
				</div>
			</div>

			<ul class="menu w-60">
				<!-- Sidebar content here -->
				<li></li>
				<li>
					<a href="/app">
						<iconify-icon icon="bxs:dashboard" class="text-xl"></iconify-icon>
						Overview
					</a>
				</li>
				<li><a href="/app">Lowongan </a></li>
				<li><a href="/app/profile">Sidebar Item 2</a></li>
			</ul>
		</div>
	</div>
</div>
