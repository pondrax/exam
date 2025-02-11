'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.generateDocString = void 0;
const generateDocString = (field, multiple, collectionMap) => {
	const type = field.type();
	const optionEntries = Object.entries(field)
		.filter(([key, value]) => {
			const unnecessaryKeys = [
				'id',
				'name',
				'system',
				'presentable',
				'values',
				'primaryKey',
				'cost'
			];
			if (!multiple) {
				unnecessaryKeys.push('maxSelect', 'minSelect');
			}
			const isFunction = typeof value === 'function';
			const hasValue =
				value !== null && (Array.isArray(value) ? value.length > 0 : value.toString() !== '');
			const notDefined =
				type !== 'number' &&
				['max', 'min', 'maxSize', 'minSelect', 'maxSelect'].includes(key) &&
				value === 0;
			return !isFunction && hasValue && !notDefined && !unnecessaryKeys.includes(key);
		})
		.map(([key, value]) => {
			if (Array.isArray(value)) {
				return [key, `${value.map((v) => `\`${v}\``).join(', ')}`];
			}
			return [key, `\`${value}\``];
		});
	const typeNameStr = `\`${type}${['file', 'relation', 'select'].includes(type) ? (multiple ? '(multiple)' : '(single)') : ''}\``;
	const requiredStr = `\`${field.required}\``;
	const relatedCollectionNameStr =
		type === 'relation' ? `\`${collectionMap[field.collectionId]}\`` : '';
	const leftColWidth = Math.max(
		type === 'relation' ? 14 : 8,
		...optionEntries.map(([key]) => key.length)
	);
	const rightColWidth = Math.max(
		type === 'relation' ? 15 : 0,
		relatedCollectionNameStr.length,
		typeNameStr.length,
		requiredStr.length,
		...optionEntries.map(([_, value]) => value.length)
	);
	const rows = [
		`/**`,
		`| ${' '.repeat(leftColWidth)} | ${' '.repeat(rightColWidth)} |`,
		`| ${'-'.repeat(leftColWidth)} | ${'-'.repeat(rightColWidth)} |`,
		`| ${'type'.padEnd(leftColWidth, ' ')} | ${typeNameStr.padEnd(rightColWidth, ' ')} |`
	];
	for (const [key, value] of optionEntries) {
		rows.push(`| ${key.padEnd(leftColWidth, ' ')} | ${value.padEnd(rightColWidth, ' ')} |`);
		if (key === 'collectionId') {
			rows.push(`| collectionName | ${relatedCollectionNameStr.padEnd(rightColWidth, ' ')} |`);
		}
	}
	return rows.join('\n     * ') + '\n     */';
};
exports.generateDocString = generateDocString;
