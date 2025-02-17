<script lang="ts">
	import { pb } from '$lib/pb';
	import { Table, Toolbar } from '$lib/components';
	import { d } from '$lib/utils';
	import Form from './form.svelte';

	const key = 'posts';

	type Collections = Awaited<ReturnType<typeof getCollections>>;
	let collections: Collections | undefined = $state();

	type Query = {
		page: number;
		perPage: number;
		filter: string;
		grid: boolean;
		selections: Collections['items'];
	};
	let query: Query = $state({
		page: 1,
		perPage: 15,
		filter: '',
		grid: false,
		selections: []
	});
	type Forms = {
		del?: Collections['items'];
		save?: Collections['items'];
	};
	let forms: Forms = $state({
		delete: undefined,
		save: undefined
	});

	async function getCollections() {
		const result = await pb.collection(key).getList(query.page, query.perPage, {
			filter: query.filter
		});
		return result;
	}

	$effect(() => {
		(async () => {
			collections = await getCollections();
			pb.collection(key).subscribe('*', async (e) => {
				collections = await getCollections();
			});
		})();
		return () => {
			pb.collection(key).unsubscribe('*');
		};
	});
</script>

<Form bind:query bind:forms />

<Toolbar {collections} {key} bind:query>
	{#snippet header()}
		<h2 class="text-xl">Pertanyaan</h2>
	{/snippet}
	{#snippet tool()}
		<button class="btn btn-sm btn-primary join-item">
			<iconify-icon icon="bx:plus" class="text-xl"></iconify-icon>
			Tambah
		</button>
	{/snippet}
	{#snippet choosen()}
		<button class="btn btn-sm btn-error join-item" onclick={() => (forms.del = query.selections)}>
			<iconify-icon icon="bx:trash" class="text-xl"></iconify-icon>
			Hapus
		</button>
	{/snippet}
</Toolbar>

<div class="bg-base-100 flex flex-grow flex-col overflow-x-auto rounded-xl shadow">
	<Table items={collections?.items || []} bind:query>
		{#snippet header()}
			<!-- <th data-key="id">ID</th> -->
			<th data-key="media" style="width: 160px;">Media</th>
			<th data-key="title">Post</th>
			<th data-key="tags">Tags</th>
			<th data-key="created">Scheduled</th>
			<th data-key="created">Created</th>
			<th data-key="updated">Updated</th>
		{/snippet}
		{#snippet children(item)}
			<!-- <td data-key="ID">{item.id}</td> -->
			<td data-key="media">
				<!-- {item.media} -->
				<img src="/favicon.png" alt="title" class="w-full" />
			</td>
			<td data-key="title">
				<details class="collapse-arrow collapse rounded-none">
					<summary class="collapse-title min-h-fit font-semibold">{item.title}</summary>
					<div class="collapse-content ml-5 border-l-2 text-sm">
						{@html item.content}
					</div>
				</details>
			</td>
			<!-- <td data-key="status">{item.answer}</td> -->
			<td data-key="tags">
				<div class="flex flex-wrap gap-1">
					{#each item.tags.split(',') as tag}
						<span class="badge badge-xs badge-secondary shrink-0">{tag}</span>
					{/each}
				</div>
			</td>
			<td data-key="created">{item.schedule && d(item.schedule).date()}</td>
			<td data-key="created">{d(item.created).date()}</td>
			<td data-key="updated">{d(item.updated).date()}</td>
		{/snippet}
	</Table>
</div>
