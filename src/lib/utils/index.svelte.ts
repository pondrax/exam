import { pb } from '$lib/pb';
type Alert = {
	id: number;
	title: string;
	message: string;
	type: 'info' | 'error';
};
export const UI: {
	user?: typeof pb.authStore.record;
	theme: string;
	loading: boolean;
	alert: Alert[];
	validator: any;
} = $state({
	theme: 'corporate',
	loading: false,
	alert: [],
	validator: []
});

export const theme = (value: string) => {
	localStorage.setItem('theme', value);
	document.body.dataset.theme = value;
	UI.theme = value;
};

export function enhance(node: HTMLFormElement) {
	// Add custom logic here
	node.addEventListener('submit', (event) => {
		event.preventDefault();
		// Perform form submission logic
		// Example: fetch('/submit-form', { method: 'POST', body: new FormData(node) });
	});
}

export const debounce = (func: Function, wait: number) => {
	let timeout: string | number | NodeJS.Timeout | undefined;
	return (...args: any[]) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			func.apply(this, args);
		}, 1);
	};
};
