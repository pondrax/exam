<script lang="ts">
	import { UI } from '$lib/utils/index.svelte';
	const { children } = $props();

	const app = $state({
		name: 'PT PP',
		description: 'Recruitment Page',
		version: '0.0.1',
		navigations: [
			{
				name: 'Beranda',
				slug: '/'
			},
			{
				name: 'Alur',
				slug: '/procedure'
			},
			{
				name: 'Profil',
				slug: '#',
				children: [
					{
						name: 'Tentang Kami',
						slug: '/about'
					},
					{
						name: 'Visi Misi',
						slug: '/mission'
					}
				]
			},
			{
				name: 'FAQ',
				slug: '/faq'
			},
			{
				name: 'Helpdesk',
				slug: '/helpdesk'
			}
		]
	});
</script>

<div>
	<!-- Alert -->
	{#snippet alert(item: (typeof UI.alert)[number])}
		<div role="alert" class="alert alert-horizontal gap-0 py-0 shadow">
			{#if item.type == 'error'}
				<iconify-icon icon="bx-error" class="text-error text-xl"></iconify-icon>
			{:else}
				<iconify-icon icon="bx-info-circle" class="text-info text-xl"></iconify-icon>
			{/if}
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<div tabindex="0" class="collapse">
				<div class="collapse-title min-h-fit font-semibold">{item.title}</div>
				<div class="collapse-content max-h-40 overflow-y-auto whitespace-pre-wrap text-xs">
					{item.message}
				</div>
			</div>
			<button
				class="btn btn-sm px-0"
				aria-label="close"
				onclick={() => (UI.alert = UI.alert.filter((i) => i !== item))}
			>
				<iconify-icon icon="bx-x" class="text-lg"></iconify-icon>
			</button>
		</div>
	{/snippet}

	<div class="fixed bottom-5 right-5 z-50">
		<div class="not-hover:stack stack-top flex w-80 flex-col gap-3">
			{#each UI.alert as item}
				{@render alert(item)}
			{/each}
		</div>
	</div>

	<!-- Navbar -->
	{#snippet navigations()}
		{#each app.navigations as nav}
			{#if nav.children}
				<li>
					<details>
						<summary>{nav.name}</summary>
						<ul class="bg-base-100 w-48 rounded-t-none p-2">
							{#each nav.children as menu}
								<li><a href={menu.slug}>{menu.name}</a></li>
							{/each}
						</ul>
					</details>
				</li>
			{:else}
				<li><a href={nav.slug}>{nav.name}</a></li>
			{/if}
		{/each}
	{/snippet}

	<div class="navbar bg-base-100 sticky top-0 z-10 shadow-sm">
		<div class="navbar-start">
			<div class="dropdown">
				<div tabindex="0" role="button" class="btn btn-ghost text-3xl lg:hidden">
					<iconify-icon icon="bx-menu"></iconify-icon>
				</div>
				<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
				<ul
					tabindex="0"
					class="menu dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
				>
					{@render navigations()}
				</ul>
			</div>
			<a href="/" class="btn btn-ghost text-xl">
				<img src="/favicon.png" alt="Favicon" class="h-10" />
			</a>
		</div>
		<div class="navbar-center hidden lg:flex">
			<ul class="menu menu-horizontal px-1">
				{@render navigations()}
			</ul>
		</div>
		<div class="navbar-end">
			<a href="/auth/login" class="btn btn-primary">Masuk</a>
			<div class="divider divider-horizontal w-1"></div>
			<a href="/auth/register" class="btn btn-secondary">Daftar</a>
		</div>
	</div>

	{@render children()}
</div>
