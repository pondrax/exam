<script lang="ts">
	import { UI } from '$lib/utils/index.svelte';
	import { pb } from '$lib/pb';
	import { goto } from '$app/navigation';

	const key = 'applicants';
	async function resetPassword(event: Event) {
		event.preventDefault();
		const target = event.target as HTMLFormElement;
		const form = new FormData(target);
		const authData = await pb.collection(key).requestPasswordReset(String(form.get('email')));

		console.log(authData);
		// setTimeout(() => {
		// 	if (pb.authStore.isValid) {
		// 		goto('/app');
		// 	}
		// }, 3000);
	}
</script>

<svelte:head>
	<title>Reset Password</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center">
	<div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
		<div class="card-body">
			<figure class="">
				<img src="/favicon.png" alt="Icon" class="h-20" />
			</figure>
			<p class="text-neutral/50 my-2 text-center text-sm">
				Masukkan email anda untuk mereset password
			</p>
			<form onsubmit={resetPassword} class="flex flex-col gap-3">
				<label class="floating-label">
					<span>Email</span>
					<input type="email" placeholder="Email" class="input" name="email" />
				</label>
				<button type="submit" class="btn btn-primary mt-4" disabled={UI.loading}>
					<span class="loading-spinner" class:loading={UI.loading}></span>
					Reset Password
				</button>
			</form>
			<div>
				<a href="/">
					<iconify-icon icon="bx-chevron-left" class="align-middle"></iconify-icon>
					Kembali ke beranda
				</a>
			</div>
		</div>
	</div>
</div>
