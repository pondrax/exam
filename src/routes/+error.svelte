<script>
	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages';
</script>

<div class="flex min-h-screen items-center justify-center">
	<div>
		<div class="text-xl">
			{page.status}
			|
			{page.error?.message}
		</div>
		<div class="my-5 mb--10 text-center">
			<a href="/" class="btn btn-primary btn-sm"> Kembali ke Beranda</a>
		</div>
	</div>
</div>
