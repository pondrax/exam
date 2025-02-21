<script lang="ts">
	import { pb } from '$lib/pb';
	import { Modal } from '$lib/components';
	import { _ } from '$lib/utils';

	const key = 'referencesCategories';

	type Collections = Awaited<ReturnType<typeof getCollections>>;
	let collections: Collections | undefined = $state();

	type Items = Collections['items'];
	type Reference = NonNullable<Items[number]['expand']>['references_via_category'][number];

	type Query = {
		key: string;
		page: number;
		perPage: number;
		filter: string;
		grid: boolean;
		selections: Collections['items'];
	};
	let query: Query = $state({
		key,
		page: 1,
		perPage: 500,
		filter: '',
		grid: false,
		selections: []
	});

	type Forms = {
		edit?: boolean;
		save?: Partial<Reference> & { list?: Items[number] };
		del?: Partial<Reference>[];
	};

	let forms: Forms = $state({
		edit: false,
		save: undefined,
		del: undefined
	});

	let view = $state({
		status: ['active']
	});

	async function getCollections() {
		const result = await pb.collection(key).getList(query.page, query.perPage, {
			filter: query.filter,
			expand: [
				{
					key: 'references_via_category'
				}
			]
		});
		return result;
	}
	async function save(data: NonNullable<Forms['save']>) {
		let result;
		if (data.id) {
			result = await pb.collection('references').update(data.id, data);
		} else {
			result = await pb.collection('references').create(data);
		}
		forms.save = undefined;
		collections = await getCollections();
	}
	async function del(data: NonNullable<Forms['del']>) {
		for (const item of data) {
			if (item.id) await pb.collection('references').delete(item.id);
		}
		forms.del = undefined;
		collections = await getCollections();
	}

	$effect(() => {
		(async () => {
			collections = await getCollections();
			pb.collection('references').subscribe('*', async (e) => {
				collections = await getCollections();
			});
		})();
		return () => {
			pb.collection(key).unsubscribe('*');
		};
	});
</script>

<!-- <Form bind:query bind:forms /> -->
<Modal title="Hapus Item" data={forms.del}>
	{#snippet children(items)}
		<p>Apakah anda yakin menghapus item ini ?</p>
		{#each items as item (item.id)}
			<p>{item.name}</p>
		{/each}
		<button class="btn btn-error mt-5" onclick={() => del(items)}> Hapus </button>
	{/snippet}
</Modal>

<Modal title="Detail Item" data={forms.save}>
	{#snippet children(item)}
		<button
			class="btn btn-sm absolute top-4 right-15"
			class:btn-secondary={forms.edit}
			onclick={() => (forms.edit = !forms.edit)}
		>
			Edit
		</button>
		{#if forms.edit || !item.id}
			<form class="my-3 flex flex-col gap-3" onsubmit={() => save(item)}>
				<label class="label floating-label hidden">
					<span class=" text-gray-700">ID</span>
					<input type="text" class="input w-full" bind:value={item.id} />
					<input type="text" class="input w-full" bind:value={item.category} />
				</label>
				<label class="label floating-label">
					<span class="text-gray-700">Nama</span>
					<input type="text" class="input w-full" bind:value={item.name} data-autofocus />
				</label>
				<label class="label floating-label">
					<span class="text-gray-700">Nilai</span>
					<input type="text" class="input w-full" bind:value={item.value} />
				</label>
				<label class="label floating-label">
					<span class="text-gray-700">Deskripsi</span>
					<textarea class="textarea w-full" bind:value={item.description}></textarea>
				</label>
				{#if item.list?.type == 'browser'}
					<label class="label floating-label">
						<span class="text-gray-700">File</span>
						<input type="file" class="file-input w-full" />
					</label>
				{/if}

				<label class="label">
					<input
						type="checkbox"
						checked={item.status === 'active'}
						onchange={() => (item.status = item.status == 'active' ? 'inactive' : 'active')}
						class="toggle"
					/>
					<span class="text-sm text-gray-700">Status {item.status}</span>
				</label>
				<div>
					<button type="submit" class="btn btn-primary">Simpan</button>
				</div>
			</form>
		{:else}
			<div>
				<ul class="list mb-5">
					<li class="list-row">
						<div class="w-30">Nama</div>
						<div>: {item.name}</div>
					</li>
					<li class="list-row">
						<div class="w-30">Nilai</div>
						<div>
							:
							{#if item.list?.type == 'percent'}
								{Number(item.value) * 100}%
							{:else}
								{item.value}
							{/if}
						</div>
					</li>
					<li class="list-row">
						<div class="w-30">Deskripsi</div>
						<div>: {item.description}</div>
					</li>
					{#if item.list?.type == 'browser'}
						<li class="list-row">
							<div class="w-30">File</div>
							<div>: {item.file}</div>
						</li>
					{/if}
					<li class="list-row">
						<div class="w-30">Status</div>
						<div>: {item.status}</div>
					</li>
				</ul>
			</div>
		{/if}
	{/snippet}
</Modal>

<div class="flex flex-col md:flex-row md:justify-between">
	<h2 class="text-xl">Referensi</h2>
	<div>
		{#if view.status.length == 2}
			<button class="btn btn-sm btn-soft btn-secondary" onclick={() => (view.status = ['active'])}>
				<iconify-icon icon="bx:show"></iconify-icon>
				Inactive
			</button>
		{:else}
			<button
				class="btn btn-sm btn-soft btn-secondary"
				onclick={() => (view.status = ['active', 'inactive'])}
			>
				<iconify-icon icon="bx:hide"></iconify-icon>
				Inactive
			</button>
		{/if}
	</div>
</div>

<div class="grid grid-cols-1 gap-5">
	{#each Object.entries(_.groupBy(collections?.items || [], 'category')) as [category, lists] (category)}
		<div class="card">
			<div class="card-body px-0 py-2">
				<div class="card-title text-info border-info border-b-1">{category}</div>
				{#each lists as list}
					<div class="mt-1 -mb-2">
						{list.name}
					</div>
					<div class="text-base-content/50 text-sm">
						{list.description}
					</div>
					<div class="border-secondary flex flex-wrap gap-2 rounded border p-1">
						{#each list.expand?.references_via_category || [] as item (item.id)}
							{#if view.status.includes(item.status)}
								<div class="join">
									<button
										class="btn btn-sm btn-soft btn-secondary tooltip join-item"
										class:btn-secondary={item.status === 'active'}
										class:btn-error={item.status === 'inactive'}
										data-tip={list.type == 'percent'
											? `Value : ${Number(item.value) * 100}%`
											: `${item.value}`}
										onclick={() => (forms.save = { ...item, list })}
									>
										{item.name}
									</button>
									{#if item.status === 'active'}
										<button
											class="btn btn-sm btn-soft btn-secondary join-item px-1"
											aria-label="Set Inactive"
											onclick={() => save({ id: item.id, status: 'inactive' })}
										>
											<iconify-icon icon="bx:hide" class="text-xl"></iconify-icon>
										</button>
									{:else}
										<button
											class="btn btn-sm btn-soft btn-error join-item px-1"
											aria-label="Set Active"
											onclick={() => save({ id: item.id, status: 'active' })}
										>
											<iconify-icon icon="bx:show" class="text-xl"></iconify-icon>
										</button>
										<button
											class="btn btn-sm btn-soft btn-error join-item px-1"
											aria-label="Set Active"
											onclick={() => (forms.del = [item])}
										>
											<iconify-icon icon="bx:x" class="text-xl"></iconify-icon>
										</button>
									{/if}
								</div>
							{/if}
						{/each}
						<button
							class="btn btn-sm btn-info"
							onclick={() =>
								(forms.save = {
									name: '',
									description: '',
									value: '',
									status: 'active',
									category: list.id,
									file: ''
								})}
						>
							<iconify-icon icon="bx:plus" class="text-xl"></iconify-icon>
							Tambah
						</button>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>

<div class="h-100"></div>
