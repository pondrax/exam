<script lang="ts">
	let batch = $state(`Batch_${Math.round(Math.random() * 100)}`);
	let email = $state(`user_${Math.round(Math.random() * 100)}@example.com`);
</script>

<div class="flex h-screen items-center justify-center">
	<div class="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
		<h1 class="text-2xl font-bold">Selamat Datang!</h1>
		<p class="text-neutral/50 text-sm">Masukkan kode batch dan email untuk masuk</p>
		<form method="get" action="/exam/test" class="my-5 flex flex-col gap-3">
			<label class="floating-label">
				<span>Batch</span>
				<input type="text" name="batch" placeholder="Batch" class="input" bind:value={batch} />
			</label>
			<label class="floating-label">
				<span>Email</span>
				<input type="text" name="email" placeholder="Email" class="input" bind:value={email} />
			</label>
			<button class="btn btn-primary"> Start Exam </button>
		</form>
	</div>
</div>
