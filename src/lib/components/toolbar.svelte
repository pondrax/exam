<script lang="ts" generics="T">
	import { schema } from '$lib/pb';
	import type { Snippet } from 'svelte';
	import Search from './search.svelte';
	import { fade } from 'svelte/transition';

	type Props = {
		collections?: {
			totalItems: number;
			totalPages: number;
		};
		key: keyof typeof schema.indexes;
		query: {
			page: number;
			perPage: number;
			grid: boolean;
			selections: Array<T>;
		};
		header?: Snippet;
		tool?: Snippet;
		choosen?: Snippet;
	};
	let { collections, key, query = $bindable(), header, tool, choosen }: Props = $props();

	let columns = $derived(schema.indexes[key]);

	function prevItem() {
		query.page = Math.max(query.page - 1, 1);
	}
	function nextItem() {
		query.page = Math.min(query.page + 1, collections?.totalPages || 0);
	}
</script>

<div class="flex flex-col md:flex-row md:justify-between">
	<div>
		{@render header?.()}
	</div>
	<div class="flex flex-wrap gap-2">
		{@render tool?.()}
		<div class="join">
			<span class="btn btn-sm join-item pointer-events-none flex-col gap-0 text-[7pt] font-normal">
				<span class="">
					{collections?.totalItems || 0} item
				</span>
				<span class="text-7">
					{query?.page || 0} / {collections?.totalPages} halaman
				</span>
			</span>
			<button class="btn btn-sm join-item" onclick={prevItem} aria-label="Prev Item">
				<iconify-icon icon="bx:chevron-left" class="text-lg"></iconify-icon>
			</button>
			<button class="btn btn-sm join-item" onclick={nextItem} aria-label="Next Item">
				<iconify-icon icon="bx:chevron-right" class="text-lg"></iconify-icon>
			</button>

			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<div tabindex="0" class="dropdown dropdown-end">
				<button class="btn btn-sm join-item border-l-0" aria-label="sort">
					<iconify-icon icon="bx:sort" class="text-lg"></iconify-icon>
				</button>
				<ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
					{#each columns as col}
						{#if col.indexOf(':lower') == -1}
							<li>
								<div>{col}</div>
							</li>
						{/if}
					{/each}
				</ul>
			</div>

			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<div tabindex="0" class="dropdown dropdown-end">
				<button class="btn btn-sm join-item border-l-0" aria-label="download">
					<iconify-icon icon="bx:download" class="text-lg"></iconify-icon>
				</button>
				<ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
					<li>
						<div>XLS</div>
					</li>
				</ul>
			</div>

			<button
				class="btn btn-sm join-item"
				aria-label="Grid"
				onclick={() => (query.grid = !query.grid)}
			>
				<iconify-icon icon={query.grid ? 'bx:grid-alt' : 'bx:list-ul'} class="text-xl"
				></iconify-icon>
			</button>
		</div>
	</div>
</div>

<Search bind:query {columns} />

{#if query.selections.length > 0}
	<div class="bg-base-100 flex items-center gap-3 p-1 shadow" transition:fade>
		<button class="btn btn-sm btn-neutral" onclick={() => (query.selections = [])}>
			Reset Pilihan ({query.selections.length})
		</button>
		<!-- <div>{query.selections.length} Item terpilih</div> -->
		{@render choosen?.()}
	</div>
{/if}
