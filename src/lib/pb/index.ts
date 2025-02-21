import { PUBLIC_API_URL } from '$env/static/public';
import { PocketBaseTS } from 'pocketbase-ts';
import type { Schema as SchemaTS } from './schema';
import schemaJson from './schema.json';
import { UI } from '$lib/utils/index.svelte';
import { d } from '$lib/utils';
export const schema = schemaJson;

export type Schema = SchemaTS | typeof schemaJson.fields;

export const pb = new PocketBaseTS<SchemaTS>(PUBLIC_API_URL);

pb.autoCancellation(false);
pb.beforeSend = async (url: string, options) => {
	UI.loading = true;
	// loading.set(true);
	if (options.body) {
		try {
			// const token = await getCaptchaToken();
			// console.log(options.body);
			// options.body = { ...JSON.parse(options.body), token };
			// console.log(options.body);
		} catch (e) {}
	}
	setTimeout(() => {
		// addToast({
		// 	title: 'Error',
		// 	message: JSON.stringify({ error: 'Gateway Timeout' }),
		// 	type: 'error',
		// 	time: -1
		// });
		// loading.set(false);
	}, 60_000);
	return { url, options };
};

pb.afterSend = (response: Response, data) => {
	UI.loading = false;
	if (response.ok) {
		if (response.url.includes('/records/')) {
			const alert = {
				id: d().millisecond(),
				title: 'Data Saved',
				message: JSON.stringify(data, null, 2),
				type: 'info' as const
			};
			UI.alert = [alert, ...UI.alert];
			UI.validator = data.data;

			setTimeout(() => {
				// UI.alert = []
				UI.alert = UI.alert.filter((i) => i.id != alert.id);
				// $inspect(UI.alert)
			}, 3000);
		}
	}

	return data;
};

// pb.afterSend = (response: Response, data) => {
//   if (response.ok) {
//     if (response.url.indexOf('hidden') > -1) {
//     } else if (
//       Object.keys(data).length > 0 && // Data is object and has keys
//       !data.items && // Data dont have items
//       !Array.isArray(data) // Data is not array
//     ) {
//       // console.log(response);
//       // addToast({
//       // 	message: data.message ?? 'Data has been updated'
//       // });
//     } else if (response.url.includes('/records/')) {
//       // console.log('del', response, data);
//       // addToast({
//       // 	message: 'Data has been deleted'
//       // });
//       console.log('after', response, data);

//       const alert = {
//         title: data.message,
//         message: JSON.stringify(data.data, null, 2),
//         type: 'info' as const
//       };
//       UI.alert = [alert, ...UI.alert];
//       UI.validator = data.data;

//       setTimeout(() => {
//         UI.alert = UI.alert.filter((i) => i != alert);
//       }, 3000);
//     }
//   } else {
//     const alert = {
//       title: data.message,
//       message: JSON.stringify(data.data, null, 2),
//       type: 'error' as const
//     };
//     UI.alert = [alert, ...UI.alert];
//     UI.validator = data.data;

//     setTimeout(() => {
//       UI.alert = UI.alert.filter((i) => i != alert);
//     }, 3000);
//     // addToast({
//     // 	title: 'Error',
//     // 	message: data.message ?? m.message_error(),
//     // 	type: 'error',
//     // 	time: -1
//     // });
//   }
//   setTimeout(() => {
//     // loading.set(false);
//     UI.loading = false;
//   }, 500);
//   // console.log('after', response, data, loading.get());
//   return data;
// };
