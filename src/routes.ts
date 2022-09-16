import * as Router from 'koa-router';
import { mysqlDataSource } from './mysql';
import { Order } from './entity/order.entity';
import { getHashValue, getXmlResult } from './utils';
import { defaultTemplate } from './constant';
import { extractMoney, getDocument, queryMoney } from './service';

const router = new Router();
const token = 'erchoc';
const funcKeyMapping = new Map([
	['余额', queryMoney],
	['文档', getDocument],
	['提现', extractMoney],
	// ['合伙人', tobePartner],
]);

// 签名测试
router.get("/", async (ctx) => {
	console.log('验签参数', ctx.query);
	/**
	 * 验签流程: https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Access_Overview.html
	 *
	 * token、timestamp、nonce 内容字典序排序 => 拼接字符串 => SHA1 加密 => 与 signature 对比
	 **/
	const { nonce, timestamp, signature, echostr } = ctx.query;
	const list = [token, nonce, timestamp];
	const stringToSign = list.sort().join('');
	const sign = getHashValue('sha1', stringToSign);
	if (sign === signature) {
		console.log(`验签成功: sign = ${sign}`);
		ctx.body = echostr;
	} else {
		console.log(
			`验签失败: sign(${sign}) !== signature(${signature}), stringToSign=${stringToSign}`,
		);
		ctx.body = `验签失败: sign(${sign}) = ${signature}`;
	}

	// const orderRepo = mysqlDataSource.getRepository(Order);
	//
	// const result = await orderRepo.save({
	// 	openid: 'xxx',
	// 	orderid: Date.now().toString(),
	// });
	// console.log(result);
	// ctx.body = {
	// 	code: 0,
	// 	data: result,
	// };
});

// 请求入口
router.post("/", async (ctx) => {
	let Template = defaultTemplate;
	const { Event, EventKey, MsgType, Content, CreateTime, ToUserName, FromUserName } = ctx.request.body.xml;
	// 点击事件直接当作发消息处理
  let keywords = Event === 'CLICK' ? EventKey : Content;
	if (MsgType === 'text' || Event === 'CLICK') {
		console.log('用户输入', keywords);
		// Template = getTemplateFromContent(keywords);
		if (funcKeyMapping.has(keywords)) {
			// 关键词导航
			// @ts-ignore
			Template = funcKeyMapping.get(keywords)(ctx.query.openid);
		} else {
			// TODO SDK 搜索

		}

	}
	ctx.response.body = getXmlResult({
		ToUserName: FromUserName,
		FromUserName: ToUserName,
		CreateTime: CreateTime,
		MsgType: 'text',
		Content: Template,
	});
});

export default router;