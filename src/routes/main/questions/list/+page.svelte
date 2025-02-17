<script lang="ts">
	import { pb } from '$lib/pb';
	import { Table, Toolbar } from '$lib/components';
	import { d } from '$lib/utils';
	import Form from './form.svelte';

	const key = 'questions';

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
			filter: query.filter,
			query: { decrypt: true },
			expand: [
				{
					key: 'template'
				}
			]
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
			<th data-key="question">Pertanyaan</th>
			<!-- <th data-key="answer">Jawaban</th> -->
			<th data-key="template">Template</th>
			<th data-key="created">Created</th>
			<th data-key="updated">Updated</th>
		{/snippet}
		{#snippet children(item)}
			<!-- <td data-key="ID">{item.id}</td> -->
			<td data-key="question">
				<details class="collapse-arrow collapse rounded-none">
					<summary class="collapse-title min-h-fit p-0">{item.question}</summary>
					<div class="collapse-content p-0 text-sm">
						<ul class="menu menu-sm gap-1">
							{#each item.options as opt}
								{@const answer = item?.answer?.find(({ id }: { id: string }) => id === opt.id)}
								<li>
									<button class="border">
										{answer.point} - {opt.label}
									</button>
								</li>
							{/each}
						</ul>
					</div>
				</details>
			</td>
			<!-- <td data-key="status">{item.answer}</td> -->
			<td data-key="template">
				<button
					class="btn btn-xs btn-secondary shrink-0"
					onclick={() => (query.filter = `template.name = '${item.expand?.template.name}' `)}
				>
					{item.expand?.template.name}
				</button>
			</td>
			<td data-key="created">{d(item.created).date()}</td>
			<td data-key="updated">{d(item.updated).date()}</td>
		{/snippet}
	</Table>
</div>
