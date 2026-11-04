/// <reference path="../database-types.d.ts" />
migrate(
	(app) => {
		const collection = new Collection({
			name: 'newsletter_signups',
			type: 'base',
			listRule: null,
			viewRule: null,
			createRule: '',
			updateRule: null,
			deleteRule: null,
			fields: [
				{
					name: 'first_name',
					type: 'text',
					required: true,
					min: 1,
					max: 120,
				},
				{
					name: 'email',
					type: 'email',
					required: true,
				},
				{
					name: 'source',
					type: 'text',
					required: false,
					max: 80,
				},
				{
					name: 'created',
					type: 'autodate',
					onCreate: true,
					onUpdate: false,
				},
				{
					name: 'updated',
					type: 'autodate',
					onCreate: true,
					onUpdate: true,
				},
			],
			indexes: [
				'CREATE UNIQUE INDEX idx_newsletter_email ON newsletter_signups (email)',
			],
		});
		app.save(collection);
	},
	(app) => {
		try {
			const collection = app.findCollectionByNameOrId('newsletter_signups');
			app.delete(collection);
		} catch {
			// already removed
		}
	},
);
