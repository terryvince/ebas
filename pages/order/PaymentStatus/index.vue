<style scoped lang="less">
	.payment-status {
		margin-left: auto !important;

		.iconfont {
			text-shadow: 0 4px 0 #00C65D;
		}
	}

	.cart-color {
		color: #00C65D !important;
		border: 1px solid #00C65D !important;
	}
</style>

<template>
	<view class="payment-status">
		<!--失败时： 用icon-iconfontguanbi fail替换icon-duihao2 bg-color-red-->
		<view class="iconfont icon-duihao2 bg-color-green"></view>
		<!-- 失败时：订单支付失败 -->
		<view class="status">订单支付成功</view>
		<view class="wrapper">
			<view class="item acea-row row-between-wrapper">
				<view>订单编号</view>
				<view class="itemCom">{{orderNo}}</view>
			</view>
			<view class="item acea-row row-between-wrapper">
				<view>下单时间</view>
				<view class="itemCom">{{createTime}}</view>
			</view>
			<view class="item acea-row row-between-wrapper">
				<view>支付方式</view>
				<view class="itemCom">微信支付</view>
			</view>
			<view class="item acea-row row-between-wrapper">
				<view>支付金额</view>
				<view class="itemCom">{{payMoney}}</view>
			</view>
			<!--失败时加上这个  -->
			<!--<view class='item acea-row row-between-wrapper'>-->
			<!--<view>失败原因</view>-->
			<!--<view class='itemCom'>账户余额不足</view>-->
			<!--</view>-->
		</view>
		<!--失败时： 重新购买 -->
		<view class="returnBnt bg-color-green">返回查看订单</view>
		<view class="returnBnt cart-color">返回首页</view>
	</view>
</template>

<script>
export default{
	data(){
		return {
			orderNo:"wx3265361456134568",
			createTime:"2020-11-09 18:05",
			payMoney:"1000.00"
		}
	}
}
</script>
