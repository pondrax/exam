<script lang="ts">
	const app = $state({
		name: 'PT PP',
		description: 'Recruitment Page',
		version: '0.0.1',
		navigations: [
			{
				name: 'Beranda',
				slug: '/'
			},
			{
				name: 'Alur',
				slug: '/procedure'
			},
			{
				name: 'Profil',
				slug: '#',
				children: [
					{
						name: 'Tentang Kami',
						slug: '/about'
					},
					{
						name: 'Visi Misi',
						slug: '/mission'
					}
				]
			},
			{
				name: 'FAQ',
				slug: '/faq'
			},
			{
				name: 'Helpdesk',
				slug: '/helpdesk'
			}
		]
	});

	const posts = $state([
		{
			title: 'Post 1',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies ultricies, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies ultricies, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
			published: '2023-01-01',
			featured: true,
			createdAt: '2023-01-01',
			updatedAt: '2023-01-01'
		}
	]);
</script>

<svelte:head>
	<title>{app.name} - {app.description}</title>
</svelte:head>

<!-- Featured Posts -->
<div class="carousel min-h-screen w-full">
	<div id="slide1" class="carousel-item relative w-full">
		<div class="hero bg-base-200 min-h-screen">
			<div class="hero-content flex-col lg:flex-row-reverse">
				<img
					src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
					class="max-w-sm rounded-lg shadow-2xl"
					alt="imagex"
				/>
				<div>
					<h1 class="text-5xl font-bold">Box Office News!</h1>
					<p class="py-6">
						Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
						exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
					</p>
					<a href="/exam" class="btn btn-primary" target="_blank">DEMO EXAM</a>
					<a href="/exam/live" class="btn btn-secondary" target="_blank">DEMO EXAM LIVE</a>
				</div>
			</div>
		</div>
		<!-- <img
			src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
			alt="sample"
			class="w-full"
		/> -->
		<div class="absolute top-1/2 right-5 left-5 flex -translate-y-1/2 transform justify-between">
			<a href="#slide4" class="btn btn-circle">❮</a>
			<a href="#slide2" class="btn btn-circle">❯</a>
		</div>
	</div>
	<div id="slide2" class="carousel-item relative w-full">
		<img
			src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
			alt="sample"
			class="w-full"
		/>
		<div class="absolute top-1/2 right-5 left-5 flex -translate-y-1/2 transform justify-between">
			<a href="#slide1" class="btn btn-circle">❮</a>
			<a href="#slide3" class="btn btn-circle">❯</a>
		</div>
	</div>
	<div id="slide3" class="carousel-item relative w-full">
		<img
			src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
			alt="sample"
			class="w-full"
		/>
		<div class="absolute top-1/2 right-5 left-5 flex -translate-y-1/2 transform justify-between">
			<a href="#slide2" class="btn btn-circle">❮</a>
			<a href="#slide4" class="btn btn-circle">❯</a>
		</div>
	</div>
	<div id="slide4" class="carousel-item relative w-full">
		<img
			src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
			alt="sample"
			class="w-full"
		/>
		<div class="absolute top-1/2 right-5 left-5 flex -translate-y-1/2 transform justify-between">
			<a href="#slide3" class="btn btn-circle">❮</a>
			<a href="#slide1" class="btn btn-circle">❯</a>
		</div>
	</div>
</div>

<!-- Footer -->
<footer class="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
	<aside>
		<svg
			width="50"
			height="50"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			fill-rule="evenodd"
			clip-rule="evenodd"
			class="fill-current"
		>
			<path
				d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"
			></path>
		</svg>
		<p>
			ACME Industries Ltd.
			<br />
			Providing reliable tech since 1992
		</p>
	</aside>
	<nav>
		<h6 class="footer-title">Services</h6>
		<a href="/" class="link link-hover">Branding</a>
		<a href="/" class="link link-hover">Design</a>
		<a href="/" class="link link-hover">Marketing</a>
		<a href="/" class="link link-hover">Advertisement</a>
	</nav>
	<nav>
		<h6 class="footer-title">Company</h6>
		<a href="/" class="link link-hover">About us</a>
		<a href="/" class="link link-hover">Contact</a>
		<a href="/" class="link link-hover">Jobs</a>
		<a href="/" class="link link-hover">Press kit</a>
	</nav>
	<nav>
		<h6 class="footer-title">Legal</h6>
		<a href="/" class="link link-hover">Terms of use</a>
		<a href="/" class="link link-hover">Privacy policy</a>
		<a href="/" class="link link-hover">Cookie policy</a>
	</nav>
</footer>
