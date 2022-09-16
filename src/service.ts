
async function queryUserInfo(openId: string): Promise<any> {
	const user = {
		openId,
		// 成交次数
		useCount: 132,
		// 累计提取金额
		allGetOut: 1000,
		// 当前可提红包
		canGetOut: 32,
		// 未收获商品红包
		willGetOut: 323,
		// 提现申请中(每月 22 号发放, 发送"取消提现"即可暂停)
		getOutIng: 12.1,
	};
}

// 余额查询
async function queryMoney(openId: string): Promise<string> {
	// 计算当前可提现金额
	const extracted = '253.32';
	const canExtract = '321.1';
	const willExtract = '24.21';
	const notReceived = '42.33';
	// 发审批请求, 同意后红包方式发送
	return `
一一一一 [玫瑰] 查询余额 [玫瑰] 一一一一
总提现金额: ${extracted}元
可提现金额: ${canExtract}元
未收货金额: ${notReceived}元
提现未到账: ${willExtract}元

每月 22 号结算本月费用，您随时可以提现哦`;
}

// 上手文档
async function getDocument(): Promise<string> {
	return `
    
    `;
}

// 提现申请
async function extractMoney(openId: string): Promise<string> {

	// message.send();
	return `
一一一一 [玫瑰] 提现申请 [玫瑰] 一一一一
    
您的提现申请已提交, 系统稍后将为您发送现金红包, 请注意查收。

如有疑问, 可通过公众号联系客服反馈。`;
}

// 申请成为推广合伙人
async function tobePartner(openid: string): Promise<string> {
	// 查询你的历史总金额, 超过 1000 才允许申请
	const totalCount = 899.32;
	const targetCount = 1000;
	return `
一一一一 [玫瑰] 提现申请 [玫瑰] 一一一一
    
您当前共计省钱 ${totalCount}元

很抱歉, 需要省钱达到 ${targetCount}元 才能成为推广合伙人哦`;
}

// TODO 动态佣金算法(core)
async function getAmountValueByDynamicAlgo(originValue: number, openid: string): string {

	return (originValue * 0.7).toFixed(2);
}