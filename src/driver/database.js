import { Sequelize } from 'sequelize';
import config from 'config'

const database = (db) => {
	const databases = config.get('databases');
	let database = databases.filter((item) => item.db === db);
	if (database.length == 0) {
		throw new Error(`Database ${db} not found`)
	}

	database = database[0]
	const connection = new Sequelize(
		database.db,
		database.username,
		database.password,
		{
			host: database.host,
			port: database.port,
			dialect: database.dialect,
			logging: true,
			// add
			// ssl: true,
			dialectOptions: {
				ssl: {
					require: true,
					rejectUnauthorized: false, // Bypass self-signed SSL
				},
			},
			// add
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			deletedAt: 'deleted_at',
		},
	);
	return connection;
};


export default database

let connection = database(config.get("server.database"))
connection.authenticate();

export {
	connection
}