import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn, Unique } from "typeorm";

/**
 * 通过数据库存储字符串, 反传统数据库设计, 降低了些许查询效率
 * 代码扩展性和可维护性提高: 状态新增、数据写入和查询转换、前后端协议理解
 */

export type PLATFORM_TYPE = 'tb' | 'jd' | 'dy' | 'pdd';

export type ORDER_STATE_TYPE = 'paid' | 'voided' | 'cleared' | 'working' | 'completed';

@Entity()
@Unique(['platform', 'orderid'])
export class Order {
	@PrimaryColumn({
		comment: '主键',
	})
	@Generated('uuid')
	id: number;

	@Column({
		comment: '用户标识',
		default: '',
		length: 50,
	})
	openid: string;

	@Column({
		comment: '订单号',
		default: '',
		length: 100,
	})
	orderid: string;

	@Column({
		comment: '用户名称',
		default: '',
		length: 50,
	})
	username: string;


	@Column({
		comment: '电商平台',
		default: 'tb',
		length: 50,
	})
	platform: PLATFORM_TYPE;

	@Column({
		comment: '优惠金额',
		default: '0',
		length: 50,
	})
	coupon: string;

	@Column({
		comment: '付款金额',
		default: '0',
		length: 50,
	})
	payment: string;

	@Column({
		comment: '全量佣金(100%)',
		default: '0',
		length: 50,
	})
	commission: string;

	@Column({
		comment: '预估佣金(动态)',
		default: '0',
		length: 50,
	})
	tip: string;

	@CreateDateColumn({
		name: 'order_time',
		comment: '下单时间',
	})
	orderTime: string;

	@CreateDateColumn({
		name: 'success_time',
		comment: '成交时间',
	})
	successTime: string;

	@Column({
		name: 'order_state',
		comment: '订单状态',
		default: 'paid',
		length: 50,
	})
	orderState: ORDER_STATE_TYPE;
}