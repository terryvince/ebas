<template>
	<view class="shopManage">
		<view class="">
			<image src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1603365312,3218205429&fm=26&gp=0.jpg" style="width: 100%;"
			 mode="widthFix"></image>
		</view>
		<!-- 店铺介绍 -->
		<view class="bg-white comment-box">
			<view class="flex-main-between">
				<view class="flex-main-start">
					<image class="avator flex-none" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg"></image>
					<text class="left-15 fs-34">鹅把式店铺</text>
				</view>
				<view>
					<text class="fs-28 style-receive color-white">联系客服</text>
				</view>
			</view>
			<view class="padding30 bg-gray top-20 boder-radius fs-24 color-text">
				第一时间账务最新核心技术，让我们的产品高效便捷，贴合前 沿产品风向，让我们的解决方案永不落后,第一时间账务最新核 心技术，让我
			</view>
		</view>
		<view class="goodsCoupon bg-gray">
			<!-- 优惠券领取 -->
			<view class="index-coupon-wrap couponIndex" style="background: linear-gradient(0deg, #FE413F 0%, #FF6C5C 100%);">
				<view class="more flex-main-end fs-20 color-white" style="margin-top: 18rpx;">
					<text>更多</text>
					<text class="iconfont icon-jiantou fs-20"></text>
				</view>
				<view class="index-coupon-list top-10">
					<view v-for="item of [1,2,3]" class="coupon-item flex-main-between" style="background-color: #FFF76B5B;">
						<view class="flex-main-center" style="position: relative; top: -10rpx;">
							<text class="color-white lh-1" style="font-size: 19rpx;align-self:flex-end;position: relative;right: -6rpx;top: -6rpx;">￥</text>
							<text class="color-linear-yellow txt-bold lh-1" style="font-size: 65rpx;">10</text>
							<view class="color-linear-yellow fs-18 flex-main-start flex-column" style="margin: 0 10rpx;">
								<text>优</text>
								<text>惠</text>
								<text>券</text>
							</view>
						</view>
						<view class="color-red fs-20 radius-btn">点击领取</view>
					</view>
				</view>
				<!-- <image class="money-img" src="../../static/logo.png" style="width: 74rpx;height: 62rpx;"></image> -->
			</view>
			<!-- 商品 -->
			<!-- <view class="goodsList" style="margin-top: 200rpx;">
				<view class="nav acea-row row-middle">
					<view class="item" :class="title ? 'font-color-red' : ''" @click="set_where(0)">{{ title ? title : "综合" }}</view>
					<view class="item" @click="set_where(1)">
						价格
						<image src="../../../static/images/horn.png" v-if="price === 0" />
						<image src="@/static/images/up.png" v-if="price === 1" />
						<image src="@/static/images/down.png" v-if="price === 2" />
					</view>
					<view class="item" @click="set_where(2)">
						销量
						<image src="@/static/images/horn.png" v-if="stock === 0" />
						<image src="@/static/images/up.png" v-if="stock === 1" />
						<image src="@/static/images/down.png" v-if="stock === 2" />
					</view>
					<view class="item" :class="nows ? 'font-color-red' : ''" @click="set_where(3)">新品</view>
				</view>
				<view class="list acea-row row-between-wrapper" :class="Switch === true ? '' : 'on'" ref="container">
					<view @click="goGoodsCon(item)" class="item" :class="Switch === true ? '' : 'on'" v-for="(item, productListIndex) in productList"
					 :key="productListIndex" :title="item.storeName">
						<view class="pictrue" :class="Switch === true ? '' : 'on'">
							<image :src="item.image" :class="Switch === true ? '' : 'on'" />
						</view>
						<view class="text" :class="Switch === true ? '' : 'on'">
							<view class="name line1">{{ item.storeName }}</view>
							<view class="money font-color-red" :class="Switch === true ? '' : 'on'">
								￥
								<text class="num">{{ item.price }}</text>
							</view>
							<view class="vip acea-row row-between-wrapper" :class="Switch === true ? '' : 'on'">
								<view class="vip-money">￥{{ item.otPrice }}</view>
								<view>已售{{ item.sales }}件</view>
							</view>
						</view>
					</view>
				</view>
			</view> -->
		</view>

	</view>
</template>

<script>
</script>

<style scoped lang="less">
	@import "~@/assets/css/utils.less";

	.style-receive {
		padding: 6rpx 16rpx;
		background-color: #64CE5E;
		border-radius: 10rpx;
	}

	.comment-box {
		padding: 40rpx 30rpx 56rpx;

		.avator {
			width: 92rpx;
			height: 92rpx;
			border-radius: 50%;
		}

		.comment-reply {
			flex: 1;
			padding: 33rpx 18rpx 57rpx;
			background-color: #F5F5F5;
		}
	}

	.index-coupon-wrap {
		width: auto;
		margin: 0 20rpx;
		background-size: 100% 100%;
		padding: 63rpx 22rpx 36rpx;
		position: relative;
	}

	.index-coupon-list {
		width: auto;
		.grid(3, 32, 122rpx) // padding: ;
	}

	.coupon-item {

		// height: 122rpx;
		// flex:0 0 32%;
		// margin-right: 4% / 2;
		padding: 0 8rpx;
		box-sizing: border-box;
		border-radius: 16rpx;
		border: 2rpx solid #fff;
		// &:last-child{
		// 	margin-right: 0;
		// }
	}

	.money-img {
		position: absolute;
		left: 22rpx;
		bottom: 6rpx;
	}

	.color-linear-yellow {
		color: #F1EEC3;
		background-image: linear-gradient(0deg, #F1EEC3 0.48828125%, #FFFEF1 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.goodsCoupon {
		// position: relative;
		margin-top: 200rpx;

		.couponIndex {
			// position: absolute;
		}
	}

	.goodsList .nav {
		height: 86rpx;
		color: #4545454;
		width: 100%;
		font-size: 28rpx;
		background-color: #fff;
		display: flex;
		.item {
			width: 25%;
			text-align: center;
		}
	}
</style>
