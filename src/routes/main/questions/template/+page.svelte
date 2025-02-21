<script lang="ts">
	import { pb } from '$lib/pb';
	import { Table, Toolbar } from '$lib/components';
	import { d } from '$lib/utils';
	import Form from './form.svelte';

	const key = 'questionsTemplates';

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
			<th data-key="name">Template</th>
			<!-- <th data-key="answer">Jawaban</th> -->
			<th data-key="stages" style="width: 400px;">Tahapan</th>
			<th data-key="status">status</th>
			<th data-key="created">Created</th>
			<th data-key="updated">Updated</th>
		{/snippet}
		{#snippet children(item)}
			<!-- <td data-key="ID">{item.id}</td> -->
			<td data-key="question">
				<div class="font-semibold">{item.name}</div>
				<div>{item.description}</div>
			</td>
			<!-- <td data-key="status">{item.answer}</td> -->
			<td data-key="template">
				<ul class="menu">
					{#each item.stages as stage}
						<li>
							<div class="font-semibold uppercase">
								{stage.id}. {stage.name}
							</div>
							<ul>
								{#each stage.related as step}
									<li>
										<div class="uppercase">
											{step.id}
											{#if step.number}
												<span class="badge badge-secondary">{step.number}</span>
											{/if}
										</div>
									</li>
								{/each}
							</ul>
						</li>
					{/each}
				</ul>
			</td>
			<td data-key="status">
				<span
					class="badge badge-sm"
					class:badge-info={item.status == 'active'}
					class:badge-warning={item.status != 'active'}
				>
					{item.status}
				</span>
			</td>
			<td data-key="created">{d(item.created).date()}</td>
			<td data-key="updated">{d(item.updated).date()}</td>
		{/snippet}
	</Table>
</div>
