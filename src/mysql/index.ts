import { DataSource } from 'typeorm';
import { MYSQL_OPTIONS } from '../config';

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_SYNC } = MYSQL_OPTIONS;


const mysqlDataSource = new DataSource({
	type: 'mysql',
	host: MYSQL_HOST,
	port: MYSQL_PORT,
	username: MYSQL_USERNAME,
	password: MYSQL_PASSWORD,
	database: MYSQL_DATABASE,
	entities: ['**/*.entity{.ts,.js}'],
	synchronize: MYSQL_SYNC,
});

async function init () {
	mysqlDataSource
		.initialize()
		.then(() => console.log('mysql connect success.'))
		.catch((err) => console.log(`mysql connect failed: ${err}`));
}

export {
	init,
	mysqlDataSource,
};