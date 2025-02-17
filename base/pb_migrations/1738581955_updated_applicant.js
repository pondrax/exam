/// <reference path="../pb_data/types.d.ts" />
migrate(
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_3231175423');

		// update collection data
		unmarshal(
			{
				indexes: [
					'CREATE UNIQUE INDEX `idx_tokenKey_pbc_3231175423` ON `applicants` (`tokenKey`)',
					"CREATE UNIQUE INDEX `idx_email_pbc_3231175423` ON `applicants` (`email`) WHERE `email` != ''"
				],
				name: 'applicants'
			},
			collection
		);

		return app.save(collection);
	},
	(app) => {
		const collection = app.findCollectionByNameOrId('pbc_3231175423');

		// update collection data
		unmarshal(
			{
				indexes: [
					'CREATE UNIQUE INDEX `idx_tokenKey_pbc_3231175423` ON `applicant` (`tokenKey`)',
					"CREATE UNIQUE INDEX `idx_email_pbc_3231175423` ON `applicant` (`email`) WHERE `email` != ''"
				],
				name: 'applicant'
			},
			collection
		);

		return app.save(collection);
	}
);
