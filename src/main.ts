import * as Koa from 'koa';
import * as dotenv from 'dotenv';
// @ts-ignore
import * as logger from 'koa-pino-logger';
import * as xmlParser from 'koa-xml-body';
dotenv.config();
import router from './routes';
import { APP_PORT } from './config';
import { init } from './mysql';


const server = new Koa();

server
	.use(logger())
	.use(xmlParser({
		xmlOptions: {
			explicitArray: false
		}
	}))
	.use(router.routes())
	.use(router.allowedMethods());

async function bootstrap() {
	await init();
	server.listen(APP_PORT, () => {
		console.log(`App is running at http://localhost:${APP_PORT}`);
	});
}

bootstrap().catch(console.error);