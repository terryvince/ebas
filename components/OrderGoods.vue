<style lang="less">
	.goodWrapper .item .text {
	  width: 500rpx !important;
	}
	.goodWrapper .item .pictrue {
	    margin-left: 10rpx !important;
	}
	.classIcon {
		width: 24rpx;
		height: 25rpx;
		margin-right: 8rpx;
	}
	
	.text {
		font-size: 28rpx;
		font-weight: bold;
	}
	.goodWrapper .acea-row{
		flex-wrap: nowrap!important;
	}
</style>

<template>
	<view class="orderGoods">
		<view v-if="name" class="acea-row row-middle total" style="padding-left: 30rpx;">
			<!-- 						<span class="sign cart-color acea-row row-center-wrapper" v-if="order.combinationId > 0">拼团</span>
			<span class="sign cart-color acea-row row-center-wrapper" v-if="order.seckillId > 0">秒杀</span>
			<span class="sign cart-color acea-row row-center-wrapper" v-if="order.bargainId > 0">砍价</span>
			<span class="sign cart-color acea-row row-center-wrapper" v-if="order.storeId > 0">门店</span> -->
		
			<block v-if="name.indexOf('积分') != -1">
				<image src="https://res.sdebs.com/icon-order-ji.png" class="classIcon">
					<view class="text">积分</view>
				</image>
			</block>
		
			<block v-if="name.indexOf('拼团') != -1">
				<image src="https://res.sdebs.com/icon-order-ping.png" class="classIcon">
					<view class="text">拼团</view>
				</image>
			</block>
		
			<block v-if="name.indexOf('秒杀') != -1">
				<image src="https://res.sdebs.com/icon-order-miao.png" class="classIcon">
					<view class="text">秒杀</view>
				</image>
			</block>
			<block v-if="name.indexOf('普通') != -1 || name.indexOf('精选') != -1">
				<view v-if="useIntegral>0" class="flex-main-start">
					<image src="https://res.sdebs.com/icon-order-ji.png" class="classIcon">
						<view class="text">积分</view>
					</image>
				</view>
				<view v-else class="text">普通订单</view>
			</block>
		</view>
		<view v-else class="total">共{{ cartInfo.length }}件商品</view>
		<view class="goodWrapper">
			<view class="item acea-row row-between-wrapper no-border" v-for="cart in cartInfo" :key="cart.id">
				<view class="pictrue flex-none" style="margin-right: 10rpx;">
					<image :src="cart.productInfo.image" class="image" />
				</view>
				<view class="text">
					<view class="acea-row row-between-wrapper">
						<view class="name line1">{{ cart.productInfo.storeName }}</view>
						<view class="num flex-none">x {{ cart.cartNum }}</view>
					</view>
					<!-- <view class="money font-color-red">{{ cart.shopName }}</view> -->
					<view class="attr line1 acea-row" v-if="cart.productInfo.attrInfo"><view style="margin-right: 8rpx;">{{ cart.shopName }}</view>{{ cart.productInfo.attrInfo.sku }}</view>
					<view class="money font-color-red">
						<text>￥</text>
						<text>{{ cart.productInfo? cart.productInfo.price : 0 }}</text>
						<text v-if="useIntegral>0">+{{ cart.productInfo? cart.productInfo.giveIntegral : 0 }}积分</text>
					</view>
					<view class="evaluate" v-if="evaluate == 3" @click="routerGo(cart)">评价</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "OrderGoods",
		props: {
			evaluate: Number,
			cartInfo: {
				type: Array,
				default: () => []
			},
			useIntegral:{
				type:[String,Number],
				default:0
			},
			name:{
				type:[String],
				default:''
			}
		},
		data: function() {
			return {};
		},
		mounted: function() {},
		methods: {
			routerGo(cart) {
				this.$yrouter.push({
					path: "/pages/shop/GoodsEvaluate/index",
					query: {
						id: cart.unique
					}
				});
			}
		}
	};
</script>
