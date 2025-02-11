<script lang="ts">
	import { UI } from '$lib/utils/index.svelte';
	import { enhance } from '$lib/utils/index.svelte';
	import { pb } from '$lib/pb';

	const key = 'applicants';
	async function handleSubmit(event: Event) {
		event.preventDefault();
		const target = event.target as HTMLFormElement;
		const form = new FormData(target);
		const authData = await pb.collection(key).create(form);
		await pb.collection(key).requestVerification(String(form.get('email')));
	}
</script>

<svelte:head>
	<title>Daftar Akun</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center">
	<div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
		<div class="card-body">
			<figure class="">
				<img src="/favicon.png" alt="Icon" class="h-20" />
			</figure>
			<p class="text-neutral/50 text-center text-lg">Daftar akun baru</p>

			<p class="text-success">
				Kami akan mengirimkan email verifikasi ke alamat email yang Anda masukkan. Silahkan cek
				inbox Anda dan lakukan verifikasi terlebih dahulu.
				<br />
				Jika Anda belum menerima email verifikasi, coba cek spam folder Anda.
			</p>
			{#if UI.validator?.email}
				<p class="text-error">Email telah terdaftar, masuk untuk melanjutkan</p>
			{/if}
			<form onsubmit={handleSubmit} class="flex flex-col gap-3">
				<label class="floating-label">
					<span>Email</span>
					<input type="email" placeholder="Email" class="input validator" name="email" required />
					<div class="validator-hint hidden">Masukkan alamat email yang valid</div>
				</label>
				<label class="floating-label">
					<span>Password</span>
					<input
						type="password"
						placeholder="Password"
						class="input validator"
						name="password"
						minlength="8"
						pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{'{8,}'}"
						required
					/>
					<p class="validator-hint hidden">
						Minimal 8 karakter, ada huruf besar, huruf kecil dan angka
					</p>
				</label>
				<label class="floating-label">
					<span>Konfirmasi Password</span>
					<input
						type="password"
						placeholder="Password"
						class="input validator"
						name="passwordConfirm"
						minlength="8"
						pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{'{8,}'}"
						required
					/>
					<p class="validator-hint hidden">Harus sama dengan password sebelumnya</p>
				</label>
				<!-- <div class="divider">Data Diri</div>
				<label class="floating-label">
					<span>Nama</span>
					<input type="text" placeholder="Nama" class="input" name="name" />
				</label>
				<label class="floating-label">
					<span>NIK</span>
					<input type="text" placeholder="NIK" class="input" name="nik" />
				</label>
				<label class="floating-label">
					<span>Alamat</span>
					<input type="text" placeholder="Alamat" class="input" name="address" />
				</label>
				<label class="floating-label">
					<span>Tanggal Lahir</span>
					<input type="date" placeholder="Email" class="input" name="birthDate" />
				</label> -->
				<button type="submit" class="btn btn-primary mt-4" disabled={UI.loading}>Daftar</button>
			</form>
			<div>
				<a href="/">
					<iconify-icon icon="bx-chevron-left" class="align-middle"></iconify-icon>
					Kembali ke Beranda
				</a>
			</div>
		</div>
	</div>
</div>
