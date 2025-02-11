<script lang="ts">
	let { children } = $props();
</script>

<svelte:head>
	<title>Exam Page</title>
</svelte:head>

<div class="flex min-h-screen flex-col">
	{@render children()}
</div>
