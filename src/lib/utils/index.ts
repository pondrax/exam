import dayjs from 'dayjs';
dayjs.prototype.date = function (format = 'YYYY-MM-DD') {
	return this.format(format);
};
dayjs.prototype.time = function (format = 'HH:mm:ss') {
	return this.format(format);
};
export const d = dayjs;

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function groupBy<T, K extends keyof T>(array: T[], key: K): Record<T[K] & string, T[]> {
	return array.reduce(
		(acc, item) => {
			const groupKey = item[key] as T[K] & string;
			(acc[groupKey] ||= []).push(item);
			return acc;
		},
		{} as Record<T[K] & string, T[]>
	);
}

export const _ = {
	groupBy
};
