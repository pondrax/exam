import express from 'express';
import { ParseServer } from 'parse-server';
import { default as ParseDashboard } from 'parse-dashboard';
import { createServer } from 'node:http';

const parseServer = new ParseServer({
	databaseURI: 'postgres://postgres:@localhost:5432/parse', // PostgreSQL connection
	// cloud: './cloud/main.js', // Path to your cloud code
	appId: 'myAppId',
	masterKey: 'myMasterKey', // Keep this secure!
	serverURL: 'http://localhost:4040/parse' // Public URL of Parse Server
	// liveQuery: {
	//   classNames: ['Chat', 'Posts'], // Enable LiveQuery on these classes
	// },
	// allowClientClassCreation: false, // Optional: prevent unauthorized class creation
});

await parseServer.start();

const dashboard = new ParseDashboard(
	{
		apps: [
			{
				serverURL: 'http://localhost:4040/parse',
				appId: 'myAppId',
				masterKey: 'myMasterKey',
				appName: 'MyParseApp'
			}
		],
		users: [
			{
				user: 'admin',
				pass: 'admin123' // Change this for security
			}
		]
	},
	{ allowInsecureHTTP: false }
);

const app = express();

// Make the Parse Server available at /parse
app.use('/parse', parseServer.app);

// Make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

const httpServer = createServer(app);
httpServer.listen(4040, () => {
	console.log('Parse Server running on http://localhost:4040/parse');
	console.log('Parse Dashboard running on http://localhost:4040/dashboard');
});
