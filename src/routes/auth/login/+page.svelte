<script lang="ts">
	import { UI } from '$lib/utils/index.svelte';
	import { pb } from '$lib/pb';
	import { goto } from '$app/navigation';

	const key = 'applicants';
	async function login(event: Event) {
		event.preventDefault();
		const target = event.target as HTMLFormElement;
		const form = new FormData(target);
		const email = form.get('email') as string;
		const password = form.get('password') as string;
		const authData = await pb.collection(key).authWithPassword(email, password);
		console.log(authData);
		setTimeout(() => {
			if (pb.authStore.isValid) {
				goto('/app');
			}
		}, 3000);
	}

	async function loginSSO() {
		const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
		console.log(authData);
		if (pb.authStore.isValid && authData.record.collectionId === '_pb_users_auth_') {
			goto('/main');
		}
	}
</script>

<svelte:head>
	<title>Masuk ke aplikasi</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center">
	<div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
		<div class="card-body">
			<figure class="">
				<img src="/favicon.png" alt="Icon" class="h-20" />
			</figure>
			<p class="text-neutral/50 text-center text-sm">Masuk ke akun anda</p>
			<form onsubmit={login} class="flex flex-col gap-3">
				<label class="floating-label">
					<span>Email</span>
					<input type="email" placeholder="Email" class="input" name="email" />
				</label>
				<label class="floating-label">
					<span>Password</span>
					<input type="password" placeholder="Password" class="input" name="password" />
				</label>
				<div>
					<a href="/auth/reset_password" class="link link-hover">Lupa password?</a>
				</div>
				<button type="submit" class="btn btn-primary mt-4" disabled={UI.loading}>
					<span class="loading-spinner" class:loading={UI.loading}></span>
					Masuk
				</button>
			</form>
			<div class="divider">Atau</div>

			<button type="submit" class="btn btn-secondary mt-4" onclick={loginSSO}>
				<img src="/logo-white.png" alt="logo" class="h-10" />
				Masuk dengan Single Sign On
			</button>
			<br />
			<div>
				<a href="/">
					<iconify-icon icon="bx-chevron-left" class="align-middle"></iconify-icon>
					Kembali ke beranda
				</a>
			</div>
		</div>
	</div>
</div>
