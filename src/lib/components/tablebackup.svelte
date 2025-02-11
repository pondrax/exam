<script lang="ts" generics="T">
	import { tick, type Snippet } from 'svelte';
	import { onMount } from 'svelte';

	const {
		grid = false,
		items,
		height = 400,
		header,
		children,
		getKey
		// itemsPerRow = 1
	}: {
		grid?: boolean;
		items: Array<T>;
		height?: number;
		header: Snippet;
		children: Snippet<[T]>;
		getKey?: (item: T) => string | number;
		// itemsPerRow?: number;
	} = $props();

	let itemsPerRow = $state(3);
	let start = $state(0);
	let end = $state(0);
	let height_map: Array<number> = $state([]);
	let viewport: HTMLElement = $state(null!);
	let tbody: HTMLElement = $state(null!);
	let thead: HTMLElement = $state(null!);
	let viewportHeight = $state(0);

	let top = $state(0);
	let bottom = $state(0);
	let averageHeight: number = $state(30); // Initial estimate

	const visible: Array<{ id: number | string; data: T }> = $derived(
		items.slice(start, end).map((data, i) => ({
			id: getKey?.(data) ?? start + i,
			data
		}))
	);

	let resizeObserver: ResizeObserver;

	// $effect(() => {
	// 	grid;
	//   viewport
	//   refresh(items, viewportHeight);
	// });
	$effect(() => {
		grid;
		// Set up viewport height observer
		const parent = viewport.parentElement;
		if (!parent) return;

		resizeObserver?.disconnect();
		resizeObserver = new ResizeObserver((entries) => {
			viewportHeight = entries[0].contentRect.height;
			refresh(items, viewportHeight);
		});
		resizeObserver.observe(parent);

		return () => resizeObserver?.disconnect();
	});

	// function observeRow(node: HTMLElement) {
	// 	const index = parseInt(node.dataset.index!);
	// 	const observer = new ResizeObserver((entries) => {
	// 		const height = entries[0].contentRect.height;
	// 		if (height_map[index] !== height) {
	// 			height_map[index] = height;
	// 			// Update average height for non-grid
	// 			if (!grid) {
	// 				const validHeights = height_map.filter((h) => h > 0);
	// 				if (validHeights.length > 0) {
	// 					averageHeight = validHeights.reduce((a, b) => a + b, 0) / validHeights.length;
	// 				}
	// 			}
	// 		}
	// 	});
	// 	observer.observe(node);
	// 	return { destroy: () => observer.disconnect() };
	// }

	async function refresh(items: Array<T>, viewportHeight: number) {
		if (grid) {
			itemsPerRow = window.innerWidth >= 768 ? 3 : window.innerWidth >= 640 ? 2 : 1;
		} else {
			itemsPerRow = 1;
		}
		// Initial height estimate
		// const estimatedItems = Math.ceil(viewportHeight / averageHeight) * (grid ? itemsPerRow : 1);
		// end = Math.min(estimatedItems, items.length);

		start = 0;
		top = 0;
		bottom = 0;
		end = 20;

		await tick();
		const contentHeight = tbody.offsetHeight;

		const rowCount = grid ? Math.ceil(end / itemsPerRow) : end;
		averageHeight = rowCount > 0 ? contentHeight / rowCount : averageHeight;

		requestAnimationFrame(handleScroll);
	}

	function handleScroll() {
		// console.log(averageHeight);
		if (!viewport) return;
		const { scrollTop } = viewport;
		const old_start = start;

		if (grid) {
			const rowHeight = averageHeight;
			const scrollRow = Math.floor(scrollTop / rowHeight);
			start = Math.max(scrollRow - 1, 0) * itemsPerRow;
			end = Math.min(
				(scrollRow + Math.ceil(viewportHeight / rowHeight) + 2) * itemsPerRow,
				items.length
			);
			top = Math.max(scrollRow - 1, 0) * rowHeight;
			const remainingItems = items.length - end;
			const remainingRows = Math.ceil(remainingItems / itemsPerRow);
			bottom = Math.max(remainingRows * rowHeight, 0);
		} else {
			let y = 0;
			let i = 0;
			// Find start index
			while (i < items.length && y + (height_map[i] || averageHeight) <= scrollTop) {
				y += height_map[i] || averageHeight;
				i++;
			}
			start = i;
			top = y;

			// Find end index
			while (i < items.length && y <= scrollTop + viewportHeight) {
				y += height_map[i] || averageHeight;
				i++;
			}
			end = i;
			bottom = Math.max((items.length - end) * averageHeight, 0);
		}

		// Prevent infinite loop
		if (start < old_start) {
			requestAnimationFrame(() => {
				viewport.scrollTop = scrollTop;
			});
		}
		// console.log('changed', {
		// 	start,
		// 	end,
		// 	viewportHeight,
		// 	top,
		// 	bottom,
		// 	averageHeight,
		// 	grid,
		// 	itemsPerRow,
		// 	scrollTop,
		// 	old_start
		// });
	}
</script>

<div
	bind:this={viewport}
	onscroll={handleScroll}
	style="height: {viewportHeight}px; overflow-y: auto;"
>
	<div class="sticky top-0 z-10">
		{start} - {end} -- {top} - {bottom}
	</div>
	<table class="table-pin-rows table" class:table-grid={grid}>
		<thead bind:this={thead}>
			<tr>
				<th class="sticky top-0 z-10 w-1">
					<label>
						<input type="checkbox" class="checkbox" />
					</label>
				</th>
				{@render header?.()}
			</tr>
		</thead>
		<tbody bind:this={tbody} style="position: relative;">
			{#if top > 0}
				<tr style="height: {top}px;" class="sm:col-span-2 md:col-span-3"> </tr>
			{/if}

			{#each visible as row, i (row.id)}
				<tr data-index={start + i}>
					<th>
						<label>
							<input type="checkbox" class="checkbox" />
						</label>
					</th>
					{@render children?.(row.data)}
				</tr>
			{/each}

			{#if bottom > 0}
				<tr style="height: {bottom}px;" class="sm:col-span-2 md:col-span-3"> </tr>
			{/if}
		</tbody>
	</table>
</div>
