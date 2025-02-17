/// <reference path="../pb_data/types.d.ts" />
migrate(
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_2662073616');

		return app.delete(collection);
	},
	(app) => {
		const collection = new Collection({
			createRule: '',
			deleteRule: null,
			fields: [
				{
					autogeneratePattern: '[a-z0-9]{15}',
					hidden: false,
					id: 'text3208210256',
					max: 15,
					min: 15,
					name: 'id',
					pattern: '^[a-z0-9]+$',
					presentable: false,
					primaryKey: true,
					required: true,
					system: true,
					type: 'text'
				},
				{
					autogeneratePattern: '',
					hidden: false,
					id: 'text3885137012',
					max: 0,
					min: 0,
					name: 'email',
					pattern: '',
					presentable: false,
					primaryKey: false,
					required: false,
					system: false,
					type: 'text'
				},
				{
					autogeneratePattern: '',
					hidden: false,
					id: 'text105650625',
					max: 0,
					min: 0,
					name: 'category',
					pattern: '',
					presentable: false,
					primaryKey: false,
					required: false,
					system: false,
					type: 'text'
				},
				{
					autogeneratePattern: '',
					hidden: false,
					id: 'text776227588',
					max: 0,
					min: 0,
					name: 'audioData',
					pattern: '',
					presentable: false,
					primaryKey: false,
					required: false,
					system: false,
					type: 'text'
				},
				{
					convertURLs: false,
					hidden: false,
					id: 'editor406885876',
					maxSize: 0,
					name: 'imageData',
					presentable: false,
					required: false,
					system: false,
					type: 'editor'
				},
				{
					hidden: false,
					id: 'autodate2990389176',
					name: 'created',
					onCreate: true,
					onUpdate: false,
					presentable: false,
					system: false,
					type: 'autodate'
				},
				{
					hidden: false,
					id: 'autodate3332085495',
					name: 'updated',
					onCreate: true,
					onUpdate: true,
					presentable: false,
					system: false,
					type: 'autodate'
				}
			],
			id: 'pbc_2662073616',
			indexes: [],
			listRule: '',
			name: 'streams',
			system: false,
			type: 'base',
			updateRule: '',
			viewRule: ''
		});

		return app.save(collection);
	}
);
