<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import 'iconify-icon';
	import '../app.css';
	import { UI } from '$lib/utils/index.svelte';

	let { children } = $props();

	$effect(() => {
		UI.theme = localStorage.theme || 'corporate';
		document.body.dataset.theme = UI.theme;
	});
</script>

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
			<div class="collapse-content max-h-40 overflow-y-auto text-xs whitespace-pre-wrap">
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

<div class="fixed right-5 bottom-5 z-50">
	<div class="not-hover:stack stack-top flex w-80 flex-col gap-3">
		{#each UI.alert as item}
			{@render alert(item)}
		{/each}
	</div>
</div>

<ParaglideJS {i18n}>
	{@render children()}
</ParaglideJS>
