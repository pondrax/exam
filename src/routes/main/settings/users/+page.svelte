<script lang="ts">
	import { pb } from '$lib/pb';
	import { Table, Toolbar } from '$lib/components';
	import { d } from '$lib/utils';
	// import Form from './form.svelte';

	const key = 'users';

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
		save?: Collections['items'][number];
	};
	let forms: Forms = $state({
		delete: undefined,
		save: undefined
	});

	async function getCollections() {
		const result = await pb.collection(key).getList(query.page, query.perPage, {
			filter: query.filter,
			expand: [{ key: 'role' }]
		});
		return result;
	}
	async function save(data: NonNullable<Forms['save']>) {
		let result;
		if (data.id) {
			result = await pb.collection(key).update(data.id, data);
		} else {
			result = await pb.collection(key).create(data);
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
			pb.collection(key).subscribe('*', async (e) => {
				collections = await getCollections();
			});
		})();
		return () => {
			pb.collection(key).unsubscribe('*');
		};
	});
</script>

<!-- <Form bind:query bind:forms /> -->

<Toolbar {collections} {key} bind:query>
	{#snippet header()}
		<h2 class="text-xl">Daftar Pengguna</h2>
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
			<th data-key="name">Nama</th>
			<!-- <th data-key="answer">Jawaban</th> -->
			<th data-key="email">Email</th>
			<th data-key="role">Hak Akses</th>
			<th data-key="status">Status</th>
			<th data-key="created">Created</th>
			<th data-key="updated">Updated</th>
		{/snippet}
		{#snippet children(item)}
			<!-- <td data-key="ID">{item.id}</td> -->
			<td data-key="question">
				<div class="font-semibold">{item.name}</div>
			</td>
			<td data-key="template">
				{item.email}
			</td>
			<td data-key="template">
				<span class="badge badge-secondary"> {item.expand?.role.name} </span>
			</td>
			<td data-key="status">
				<span
					class="badge badge-sm"
					class:badge-info={item.verified}
					class:badge-warning={!item.verified}
				>
					{item.verified ? 'Verified' : 'Unverified'}
				</span>
			</td>
			<td data-key="created">{d(item.created).date()}</td>
			<td data-key="updated">{d(item.updated).date()}</td>
		{/snippet}
	</Table>
</div>
