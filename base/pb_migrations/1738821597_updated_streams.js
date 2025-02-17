/// <reference path="../pb_data/types.d.ts" />
migrate(
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_2662073616');

		// remove field
		collection.fields.removeById('text406885876');

		return app.save(collection);
	},
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_2662073616');

		// add field
		collection.fields.addAt(
			3,
			new Field({
				autogeneratePattern: '',
				hidden: false,
				id: 'text406885876',
				max: 0,
				min: 0,
				name: 'imagexData',
				pattern: '',
				presentable: false,
				primaryKey: false,
				required: false,
				system: false,
				type: 'text'
			})
		);

		return app.save(collection);
	}
);
