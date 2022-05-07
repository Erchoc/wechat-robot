import * as Router from 'koa-router';
import { mysqlDataSource } from './mysql';
import { Order } from './entity/order.entity';

const router = new Router();

// 签名测试
router.get("/", async (ctx) => {
	const orderRepo = mysqlDataSource.getRepository(Order);

	// TODO check unique index

	const result = await orderRepo.save({
		openid: 'xxx',
		orderid: Date.now().toString(),
	});
	console.log(result);
	ctx.body = {
		code: 0,
		data: result,
	};
});

// 请求入口
router.post("/", async (ctx) => {

	console.log(ctx.body);
	ctx.body = {
		code: 0,
		data: 1,
	};
});

export default router;