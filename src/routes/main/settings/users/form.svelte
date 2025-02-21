<script lang="ts" generics="T">
	let { query = $bindable(), forms = $bindable() } = $props();

	$effect(() => {});
	function handleClose(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			forms.del = undefined;
		} // Close modal when escape key is pressed.  // The rest of your code remains the same...
	}
</script>

<svelte:window onkeydown={handleClose} />

{#if forms.del}
	<dialog class="modal modal-open">
		<div class="modal-box">
			<h3 class="text-lg font-bold">Hapus Item</h3>
			<p class="py-4">Apakah anda yakin menghapus item ini ?</p>
			<div>
				{#each forms.del as item}
					<div>
						{item.name}
					</div>
				{/each}
			</div>
			<div class="modal-action">
				<form method="dialog">
					<!-- if there is a button in form, it will close the modal -->
					<button class="btn" onclick={() => (forms.del = undefined)}>Tutup</button>
				</form>
			</div>
		</div>
	</dialog>
{/if}
