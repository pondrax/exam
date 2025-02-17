<script lang="ts">
	let { query = $bindable(), columns } = $props();

	let search = $state('');
	let focus = $state(false);
	let el = $state() as HTMLInputElement;
	function handleFocus(event: KeyboardEvent) {
		if (event.metaKey && event.key == 'k') {
			focus = true;
			el.focus();
		}
	}
</script>

<svelte:window onkeydown={handleFocus} />
<div class="relative h-10">
	<label class="input w-full">
		<iconify-icon icon="bx:search" class="text-xl"></iconify-icon>
		<input bind:this={el} type="text" class="grow" placeholder="Search" bind:value={search} />
		{#if search.length > 0}
			<button class="btn btn-xs btn-accent">Cari</button>
			<button class="btn btn-xs" onclick={() => (search = '')}> Hapus </button>
		{:else}
			<kbd class="kbd kbd-sm">⌘</kbd>
			<kbd class="kbd kbd-sm">K</kbd>
		{/if}
	</label>
	<div class="dropdown" class:dropdown-open={focus}>
		<ul
			class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 -mt-5 ml-[100px] shadow-sm"
		>
			{#each columns as column}
				<li>
					<button>{column}</button>
				</li>
			{/each}
		</ul>
	</div>
</div>
