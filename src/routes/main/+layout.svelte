<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { pb } from '$lib/pb';
	import { theme, UI } from '$lib/utils/index.svelte';
	import { PUBLIC_API_URL } from '$env/static/public';

	let { children } = $props();

	let loading = $state(true);
	const links = [
		{ href: '/main', text: 'Dashboard', icon: 'bxs:dashboard' },
		null,
		{ text: 'Menu Utama' },
		{ href: '/main/menu/posts', text: 'Berita', icon: 'bx:news' },
		{ href: '/main/menu/pages', text: 'Halaman', icon: 'bx:file' },
		{ href: '/main/menu/agenda', text: 'Agenda', icon: 'bx:notepad' },
		{ href: '/main/menu/gallery', text: 'Galeri', icon: 'bx:image' },
		// { href: '/main/helpdesk', text: 'Helpdesk', icon: 'bx:chat' },
		null,
		{ text: 'Manajemen Lowongan' },
		{ href: '/main/vacancies', text: 'Overview', icon: 'bx:news' },
		{ href: '/main/vacancies/list', text: 'Daftar Lowongan', icon: 'bx:news' },
		{ href: '/main/vacancies/exam', text: 'Daftar Ujian', icon: 'bx:news' },
		{ href: '/main/vacancies/applicants', text: 'Daftar Pelamar', icon: 'bx:news' },
		null,
		{ text: 'Manajemen Pertanyaan' },
		// { href: '/main/questions', text: 'Overview', icon: 'bx:news' },
		{ href: '/main/questions/template', text: 'Template', icon: 'bx:news' },
		{ href: '/main/questions/category', text: 'Kategori', icon: 'bx:news' },
		{ href: '/main/questions/list', text: 'Daftar Pertanyaan', icon: 'bx:news' },
		null,
		{ text: 'Manajemen Aplikasi' },
		{ href: '/main/settings/users', text: 'Pengguna', icon: 'bx:user' },
		{ href: '/main/settings/roles', text: 'Hak Akses', icon: 'bx:award' },
		{ href: PUBLIC_API_URL + '/_/', text: 'Database', icon: 'bx:data', target: '_blank' },
		{ href: '/main/settings/config', text: 'Pengaturan', icon: 'bx:cog' }
	];
	async function init() {
		const isMainUser = pb.authStore.isValid && pb.authStore.record?.collectionName === 'users';
		UI.user = pb.authStore.record;
		// loading = false;
		if (isMainUser) {
			loading = false;
		} else {
			console.log('Please login');
			location.href = '/auth/login';
			// goto('/login');
		}
	}
	async function logout() {
		pb.authStore.clear();
		goto('/');
	}
	$effect(() => {
		init();
	});
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

{#snippet breadcrumbs()}
	{@const uris = String(page.route.id).split('/').filter(Boolean)}

	<div class="breadcrumbs text-sm">
		<ul>
			{#each uris as uri, i}
				{@const href = `/${uris.slice(0, i + 1).join('/')}`}
				<li class="capitalize">
					<a {href}>
						{#if i === 0}
							<iconify-icon icon="bx:home"></iconify-icon>
						{/if}
						{links.find((link) => link?.href == href)?.text || uri}
					</a>
				</li>
			{/each}
		</ul>
	</div>
{/snippet}

{#if loading}
	<div class="flex h-screen items-center justify-center">
		<div class="loading loading-spinner" role="status"></div>
	</div>
{:else}
	<div class="drawer lg:drawer-open bg-base-100">
		<input id="sidebar" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content min-h-screen p-2">
			<!-- Page content here -->
			<div class="app-background flex h-full flex-col gap-2 rounded-xl p-5 shadow-xl">
				<div class="sticky right-7 left-0 flex lg:absolute">
					<label for="sidebar" class="btn drawer-button lg:hidden">
						<iconify-icon icon="bx-menu" class="text-xl"></iconify-icon>
					</label>
					<div class="ml-auto">
						<label class="btn btn-circle swap swap-rotate">
							<input
								type="checkbox"
								checked={UI.theme === 'corporate'}
								onchange={() => theme(UI.theme === 'corporate' ? 'business' : 'corporate')}
							/>
							<iconify-icon icon="bx-sun" class="swap-on text-xl"></iconify-icon>
							<iconify-icon icon="bx-moon" class="swap-off text-xl"></iconify-icon>
						</label>
					</div>
				</div>

				{@render breadcrumbs()}
				{@render children()}
			</div>
		</div>
		<div class="drawer-side z-10">
			<label for="sidebar" aria-label="close sidebar" class="drawer-overlay"></label>
			<div class="bg-base-100 flex min-h-full flex-col">
				<div class="my-3 text-center">
					<div class="avatar my-3">
						<div
							class="bg-secondary ring-primary ring-offset-base-100 w-30 rounded-full ring ring-offset-4"
						>
							<img src="/ava1.png" alt="avatar" />
						</div>
					</div>
					<!-- <div class="mt-5 flex justify-center">
					<div class="w-32">
						<img src="/ava1.png" alt="avatar" class="w-full" />
					</div>
				</div> -->
					<div class="font-bold uppercase">{UI.user?.name}</div>
					<div class="join">
						<a href="/main/profile" class="btn btn-xs btn-primary join-item">
							<iconify-icon icon="bx:user" class="text-xl"></iconify-icon>
							Profile
						</a>
						<button type="button" class="btn btn-xs btn-neutral join-item" onclick={logout}>
							<iconify-icon icon="bx:exit" class="text-xl"></iconify-icon>
							Logout
						</button>
					</div>
				</div>

				<ul class="menu w-72">
					{#each links as link}
						{#if link == null}
							<li></li>
						{:else if !link.href}
							<li class="menu-title py-0">{link.text}</li>
						{:else}
							<li>
								<a href={link.href} class="menu-item" target={link.target}>
									<iconify-icon icon={link.icon} class="text-xl"></iconify-icon>
									{link.text}
								</a>
							</li>
						{/if}
					{/each}
				</ul>

				<div class="mt-auto px-5 py-2 text-sm">Admin Menu</div>
			</div>
		</div>
	</div>
{/if}
