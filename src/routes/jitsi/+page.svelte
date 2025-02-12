<script lang="ts">
	let connections;
	$effect(() => {
		JitsiMeetJS.init();
		connection = new JitsiMeetJS.JitsiConnection(null, null, {});

		console.log(connection);
	});
</script>

<svelte:head>
	<script src="https://meet.jit.si/libs/lib-jitsi-meet.min.js"></script>
</svelte:head>
