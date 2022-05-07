const APP_PORT = process.env.APP_PORT || 9999;

const MYSQL_OPTIONS: I_MYSQL = {
	MYSQL_HOST: process.env.MYSQL_HOST || '127.0.0.1',
	MYSQL_PORT: Number(process.env.MYSQL_PORT) || 3306,
	MYSQL_USERNAME: process.env.MYSQL_USERNAME || 'root',
	MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || '123456',
	MYSQL_DATABASE: process.env.MYSQL_DATABASE || 'test',
	MYSQL_SYNC: process.env.MYSQL_SYNC === 'true',
}

interface I_MYSQL {
	MYSQL_HOST: string,
	MYSQL_PORT: number,
	MYSQL_USERNAME: string,
	MYSQL_PASSWORD: string,
	MYSQL_DATABASE: string,
	MYSQL_SYNC: boolean,
}

export {
	APP_PORT,
	MYSQL_OPTIONS,
}