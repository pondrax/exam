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

<ParaglideJS {i18n}>
	{@render children()}
</ParaglideJS>
