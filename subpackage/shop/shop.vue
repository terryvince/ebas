<style lang="less">
	page {
		background: #FFFFFF;
	}
</style>
<style scoped lang="less">
	@import "~@/assets/css/utils.less";

	.style-receive {
		padding: 6rpx 16rpx;
		background-color: #64CE5E;
		border-radius: 10rpx;
	}

	.comment-box {
		padding: 30rpx 30rpx 20rpx;

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
		background: url(http://qj5wtf3w8.hn-bkt.clouddn.com/index-coupon.png)no-repeat center;
		background-size: 100% 100%;
		padding: 24rpx 22rpx 36rpx;
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

	.radius-btn {
		width: 61rpx;
		background: #FFFFFF;
		border-radius: 15rpx;
		padding: 9rpx 11rpx;
		box-sizing: border-box;
	}

	.goodsCoupon {
		border-top: 2rpx solid #ffffff;
		position: relative;
		// margin-top: 200rpx;
		background-color: #16AC57;
		margin-top: 100rpx;
		min-height: 500rpx;

		.couponIndex {
			position: absolute;
			top: -100rpx;
		}
	}

	.goodsList {
		margin-top: 150rpx;
		background-color: #1CD1DC;

		.nav {
			height: 86rpx;
			color: #4545454;
			width: 100%;
			font-size: 28rpx;
			background-color: #fff;
			display: flex;

			.item {
				width: 25%;
				text-align: center;

				image {
					width: 15rpx;
					height: 19rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
</style>

<template>
	<view class="shopManage">
		<view class="">
			<image src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1603365312,3218205429&fm=26&gp=0.jpg" style="width: 100%;"
			 mode="widthFix"></image>
		</view>
		<!-- 店铺介绍 -->
		<view class="bg-white comment-box line-down">
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
		<view class="goodsCoupon">
			<!-- 优惠券领取 -->
			<coupon-list class="couponIndex" :list="[1,2,3]"></coupon-list>
			<!-- 商品 -->
			<view class="goodsList">
				<view class="nav acea-row row-middle">
					<view class="item" :class="title ? 'font-color-red' : ''" @click="set_where(0)">{{ title ? title : "综合" }}</view>
					<view class="item" @click="set_where(1)">
						价格
						<image src="../../static/images/horn.png" v-if="price === 0" />
						<image src="../../static/images/up.png" v-if="price === 1" />
						<image src="../../static/images/down.png" v-if="price === 2" />
					</view>
					<view class="item" @click="set_where(2)">
						销量
						<image src="../../static/images/horn.png" v-if="stock === 0" />
						<image src="../../static/images/up.png" v-if="stock === 1" />
						<image src="../../static/images/down.png" v-if="stock === 2" />
					</view>
					<view class="item" :class="nows ? 'font-color-red' : ''" @click="set_where(3)">新品</view>
				</view>
				<view class="choice-goods x-line gray flex-1" style="order:1">
					<goodsList :list="pickList" :from="goodsType"></goodsList>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		name: "Shop",
		components: {

		},
		data: function() {
			return {
				price: 0,
				stock: 0,
				nows: false,
				// 商品类型
				goodsType: "goods",
				where: {
					page: 1,
					limit: 8,
					// keyword: s,
					// sid: id, //二级分类id
					news: 0,
					priceOrder: "",
					salesOrder: "",
					type: 0
				},
			}
		},
		methods: {
			//点击筛选事件处理
			set_where: function(index) {
				let that = this;
				switch (index) {
					case 0:
						return that.$yrouter.push({
							path: "/subpackage/shop/shop"
						});
					case 1:
						if (that.price === 0) that.price = 1;
						else if (that.price === 1) that.price = 2;
						else if (that.price === 2) that.price = 0;
						that.stock = 0;
						break;
					case 2:
						if (that.stock === 0) that.stock = 1;
						else if (that.stock === 1) that.stock = 2;
						else if (that.stock === 2) that.stock = 0;
						that.price = 0;
						break;
					case 3:
						that.nows = !that.nows;
						break;
					default:
						break;
				}
				that.$set(that, "Shop", []);
				that.where.page = 1;
				that.loadend = false;
				// that.get_product_list();
			},
		}
	}
</script>
