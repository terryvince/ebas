<style lang="less">
	page {
		background: #FFFFFF;
	}
	.good-list-card {
		flex-wrap: wrap!important;
	}
</style>
<style scoped lang="less">
	@import "~@/assets/css/utils.less";
	.shopBanner{
		image{
			height: 366rpx;
		    width: 100%;
		}
		
	}

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
		background-color: #F5F5F5;
		position: relative;
		margin-top: 100rpx;
		min-height: 500rpx;

		.couponIndex {
			position: absolute;
			width: 100%;
			top: -100rpx;
		}
	}

	.goodsList {
		margin-top: 150rpx;

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

		.goodsListItem {
			padding: 30rpx 20rpx 60rpx;
			min-height: 1000rpx;
		}
	}
	.gl-icon-triangle{
		position: relative;
		width: 15rpx;
		height: 19rpx;
		margin-left: 10rpx;
		&::before,&::after{
			content: '';
			width: 0;
			height: 0;
			border-width: 8rpx;
			border-color: transparent;
			border-style: solid;
			position: absolute;
		}
		&::before{
			top: 0;
			left: 0;
			border-color: transparent transparent #A9A9A9 transparent;
			transform: translate(0,-55%);
		}
		&::after{
			bottom: 0;
			left: 0;
			border-color: #A9A9A9 transparent transparent transparent;
			transform: translate(0, 55%);
		}
		&.up::before{
			border-color: transparent transparent #6DD36F transparent;
		}
		&.down::after{
			border-color: #6DD36F transparent transparent transparent;
		}
	}
	.font-color-red {color: #6DD36F;}
</style>

<template>
	<view class="shopManage">
		<view class="shopBanner">
			<image :src="shopInfo.coverImage"></image>
		</view>
		<!-- 店铺介绍 -->
		<view class="bg-white comment-box line-down">
			<view class="flex-main-between">
				<view class="flex-main-start">
					<image class="avator flex-none" :src="shopInfo.headImage"></image>
					<text class="left-15 fs-34">{{shopInfo.name}}</text>
				</view>
				<view>
					<button type="default" class="hide-full" open-type="contact"></button>
					<text class="fs-28 style-receive color-white">联系客服</text>
				</view>
			</view>
			<view class="padding30 bg-gray top-20 boder-radius fs-24 color-text">
				{{shopInfo.content}}
			</view>
		</view>
		<view class="goodsCoupon">
			<!-- 优惠券领取 -->
			<!-- v-if="couponList.length>0" -->
			<coupon-list class="couponIndex" :ids = "where.merId"></coupon-list>
			<!-- 商品 -->
			<view class="goodsList">
				<view class="nav acea-row row-middle">
					<view class="item" :class="['item',title ? 'font-color-red' : '']" @click="set_where(0)">{{ title ? title : "综合" }}</view>
					<view class="item" @click="set_where(1)">
						价格
						<!-- <image src="../../static/images/horn.png" v-if="price === 0" />
						<image src="../../static/images/up.png" v-if="price === 1" />
						<image src="../../static/images/down.png" v-if="price === 2" /> -->
						<view :class="['inline gl-icon-triangle',price === 1 ? 'up':'',price === 2 ? 'down':'']"></view>
					</view>
					<view class="item" @click="set_where(2)">
						销量
						<!-- <image src="../../static/images/horn.png" v-if="stock === 0" />
						<image src="../../static/images/up.png" v-if="stock === 1" />
						<image src="../../static/images/down.png" v-if="stock === 2" /> -->
						<view :class="['inline gl-icon-triangle',stock === 1 ? 'up':'',stock === 2 ? 'down':'']"></view>
					</view>
					<view class="item" :class="nows ? 'font-color-red' : ''" @click="set_where(3)">新品</view>
				</view>
				<view class="goodsListItem choice-goods x-line gray">
					<goodsList :list="pickList" :from="goodsType"></goodsList>
				</view>
			</view>
		</view>
		<Loading :loaded="loaded" :loading="loading"></Loading>
	</view>

</template>

<script>
	import {
		getProducts
	} from "@/api/store";
	import goodsList from '@/components/goodsList/goodsList';
	import Loading from "@/components/Loading";
	export default {
		name: "Shop",
		components: {
			goodsList,
			Loading
		},
		data: function() {
			return {
				loading: false,
				loaded: false,
				// 店铺信息
				shopInfo: {},
				// 商品筛选
				price: 0,
				stock: 0,
				nows: false,
				// 商品类型
				goodsType: "goods",
				// 商品数据
				pickList: [],
				where: {
					page: 1,
					limit: 10,
					// keyword: s,
					// sid: id, //二级分类id
					news: 0,
					priceOrder: "",
					salesOrder: "",
					type: 0, // 0 普通商品 1积分商品 2精选商品
					merId: 0,
				},
				// 记录上次点击的筛选项
				clickChange: 0,
				clickChangePrev:0,
				// 优惠券
				couponList:[]
			}
		},
		onShow: function() {
			this.shopInfo = JSON.parse(this.$yroute.query.shopInfo);
			this.where.merId = this.shopInfo.id;
			
			this.get_product_list();
		},
		mounted: function() {
			// console.log(JSON.parse(this.$yroute.query.shopInfo))
		},
		methods: {
			// 获取商品数据
			get_product_list() {
				var that = this;
				if (this.loading || this.loaded) return;
				this.loading = true;
				this.setWhere();
				getProducts(this.where).then(res => {
					this.pickList = this.pickList.concat(res.data);
					
					this.loading = false;
					this.where.page++;
					this.loaded = res.data.length < this.where.limit;
				}).catch(err => {
					console.error("获取商品列表发生错误！", err)
				})
			},
			//设置where条件
			setWhere: function() {
				let that = this;
				if (that.price === 0) {
					that.where.priceOrder = "";
				} else if (that.price === 1) {
					that.where.priceOrder = "asc";
				} else if (that.price === 2) {
					that.where.priceOrder = "desc";
				}
				if (that.stock === 0) {
					that.where.salesOrder = "";
				} else if (that.stock === 1) {
					that.where.salesOrder = "asc";
				} else if (that.stock === 2) {
					that.where.salesOrder = "desc";
				}
				that.where.news = that.nows ? "1" : "0";
			},
			//点击筛选事件处理
			set_where: function(index) {
				let that = this;
				that.loaded = false;
				that.where.page = 1;
				that.clickChangePrev=that.clickChange;
				that.clickChange = index;
				console.log(index)
				switch (index) {
					case 0:
						that.price = 0;
						that.stock = 0;
						that.nows = false;
						// return that.$yrouter.push({
						// 	path: "/subpackage/shop/shop"
						// });
						break;
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
				if (!(that.clickChange == 0 && that.clickChangePrev ==0)) {
					console.log('11', that.clickChange)
					that.where.page = 1;
					that.loadend = false;
					that.pickList = [];
					that.get_product_list();
				}
			},
			// 下滑加载
			onReachBottom() {
				!this.loading && this.get_product_list();
			},
		}
	}
</script>
