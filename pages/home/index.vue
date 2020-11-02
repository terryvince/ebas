<!-- page 样式不能写在scope下 -->
<style lang="less">
	page{
		background: #F6F6F6;
	}
</style>
<style scoped lang="less">
	.index {
		background-color: #F6F6F6;
	}

	.fixed-header {
		position: fixed;
		z-index: 99;
		top: 0;
		left: 0;
		right: 0;
		background: #fff;
		box-shadow: 0 0 20rpx -10rpx #aaa;

		&+.fixed-header-box {
			height: 98rpx
		}
	}
	.color-black{
		color: #010001;
	}
	.color-reddish-brown{
		color: #C33725;
	}
	.notice{
		height: 110rpx;
		margin-bottom: 6rpx;
		background: white;
		padding-left: 24rpx;
		border-radius:20rpx 20rpx 0px 0px;
	}
	uni-notice-bar::v-deep .uni-noticebar{
		margin-bottom: 0!important;
	}
	.nav{
		background: white;
		margin: 0 20rpx;
		border-radius: 20rpx;
	}
	.top-20{
		margin-top: 20rpx;
	}
	.fixed-header{
		background-color: #EFEDEB;
		box-shadow: none;
		.search{
			background-color:#fff;
		}
	}
	// .title{
	// 	position: relative;
	// 	padding:45rpx 0;
	// 	&::after,&::before{
	// 		content: '';
	// 		width: 11rpx;
	// 		height: 11rpx;
	// 		background: #2C2C2C;
	// 		transform: rotateZ(45deg);
	// 		position: absolute;
	// 		top: 0;
	// 		bottom: 0;
	// 		margin: auto 0;
	// 	}
	// 	&::after{
	// 		right: -30rpx;
	// 	}
	// 	&::before{
	// 		left: -30rpx;
	// 	}
	// }
	goods-list::v-deep .goods-list{
		padding:0rpx 25rpx 54rpx;
	}
	.lottery-img{
		width: 648rpx;
		height: 639rpx;
	}
	.home-close{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		margin-bottom: -62rpx;
	}
	.header.fixed-header{
		background-color: white;
		padding: 0 20rpx;
		.search{
			background-color: #EEEEEE;
			border: 1px solid #EEEEEE;
			border-radius: 50rpx;
			overflow: hidden;
		}
		.icon-search{
			width: 34rpx;
		}
		.search-button{
			box-sizing: border-box;
			border: none;
			background: linear-gradient(80deg, #71D676, #5FCB55);
			height: 100%;
			border-radius:50rpx 0 0 50rpx;
			line-height: 1;
			padding: 0 40rpx;
			color: white;
			position: absolute;
			right: 0;
			top: 0;
		}
	}
	// banner
	.index .banner swiper,.index .banner image {
		border-radius: 20rpx;
	    height: 304rpx;
	}
	.slider-banner{
		padding: 0 20rpx;
		box-sizing: border-box;
		margin: 20rpx 0 0rpx;
	}
	.swiper-item {
		height: 100%;
	}
	.slider-banner.banner{
	  padding: 0 20rpx 0rpx;
	  height: auto;
	}
	
	.icon-notify{
		width: 33rpx;
		height: 33rpx;
		background: url(https://res.chunghengtrade.com/icon-notify.png)no-repeat center;
		background-size: 100%;
		margin-left: 20rpx;
	}
	.image-activity{
		width: 138rpx;
		height: auto;
	}
	.home-title{
		padding:45rpx 0;
		width: 336rpx;
	}
	.color-placeholder{
		color: #909090;
	}
	.y-line{
		width: 2rpx;
		height: 24rpx;
		background-color: #909090;
	}
	.features-box{
		margin: 18rpx 18rpx;
		text{
			margin-left: 9rpx;
			font-size: 22rpx;
			color: #949494;
		}
	}
	.index-coupon-wrap{
		width: auto;
		margin:0 20rpx;
		background-size: 100% 100%;
		padding: 63rpx 22rpx 36rpx;
		position: relative;
	}
	.coupon-list{
		width:auto;
		// padding: ;
	}
	.coupon-item{
		height: 122rpx;
		flex:0 0 33.333%;
	}
	.money-img{
		position: absolute;
		left: 22rpx;
		bottom: 6rpx;
	}
	.color-linear-yellow{
		background-image: linear-gradient(0deg, #F1EEC3 0.48828125%, #FFFEF1 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color:transparent; 
	}
	.radius-btn{
		width: 61rpx;
		background: #FFFFFF;
		border-radius: 15rpx;
		padding:9rpx 11rpx;
		box-sizing: border-box;
	}
</style>
<template>
	<view class="index">
		<view class="header fixed-header acea-row row-center-wrapper">
			<view @click="goGoodSearch()" class="search flex-main-start relative">
				<!-- <text class="iconfont icon-xiazai5"></text> -->
				<view class="acea-row row-middle">
					<image class="icon-search" src="../../static/icon-search-red.png" mode="widthFix"></image>
					<span class="y-line left-10"></span>
					<text class="left-10 color-placeholder">搜索请输入关键词</text>
				</view>
				<view class="search-button flex-main-center">搜索</view>
			</view>
			<!-- <view class="qr" @click="startQr()">
				<image src="@/static/images/qr.png" />
			</view> -->
		</view>
		<!-- 搜索栏占位 -->
		<view class="fixed-header-box"></view>
		<!-- banner -->
		<view class="slider-banner banner">
			<swiper indicatorDots="true" v-if="banner.length > 0" autoplay circular>
				<block v-for="(item, bannerIndex) in banner" :key="bannerIndex">
					<swiper-item>
						<view @click="goRoll(item)" class="swiper-item">
							<image :src="item.pic"/>
						</view>
					</swiper-item>
				</block>
			</swiper>
		</view>
		<!-- 间隙文字 -->
		<view class="features-box flex-main-between">
			<view class="feature flex-main-start">
				<image src="../../static/logo.png" style="width: 19rpx;height: 19rpx;" mode=""></image>
				<text>优选严检</text>
			</view>
			<view class="feature flex-main-start">
				<image src="../../static/logo.png" style="width: 23rpx;height: 19rpx;" mode=""></image>
				<text>品质溯源</text>
			</view>
			<view class="feature flex-main-start">
				<image src="../../static/logo.png" style="width: 16rpx;height: 20rpx;" mode=""></image>
				<text>全程安全</text>
			</view>
			<view class="feature flex-main-start">
				<image src="../../static/logo.png" style="width: 20rpx;height: 19rpx;" mode=""></image>
				<text>专享客服</text>
			</view>
		</view>
		
		<!-- 导航 -->
		<view class="nav acea-row">
			<view @click="goWxappUrl(item)" class="item" v-for="(item, menusIndex) in menus" :key="menusIndex">
				<view class="pictrue">
					<image :src="item.pic" />
				</view>
				<view>{{ item.name }}</view>
			</view>
		</view>
		
		<!-- 优惠券栏 -->
		<view class="index-coupon-wrap" style="background: linear-gradient(0deg, #FE413F 0%, #FF6C5C 100%);">
			<view class="more flex-main-end fs-20 color-white" style="margin-top: 18rpx;">
				<text>更多</text>
				<text class="iconfont icon-jiantou fs-20"></text>
			</view>
			<view class="coupon-list flex-main-start">
				<view class="coupon-item flex-main-center" style="background-color: #FFF76B5B;">
					<view class="flex-main-center" style="position: relative; top: -10rpx;">
						<text class="color-white lh-1" style="font-size: 19rpx;align-self:flex-end;">￥</text>
						<text class="color-linear-yellow txt-bold lh-1" style="font-size: 65rpx;">10</text>
						<view class="color-linear-yellow fs-18 flex-main-start flex-column" style="margin: 0 6rpx;">
							<text>优</text>
							<text>惠</text>
							<text>券</text>
						</view>
					</view>
					<view class="color-red fs-20 radius-btn">点击领取</view>
				</view>
			</view>
			<image class="money-img" src="../../static/logo.png" style="width: 74rpx;height: 62rpx;"></image>
		</view>
		
		<!-- <view class="notice flex-main-between top-20">
			<view class="fs-34 txt-bold txt-italic flex-none">
				<image src="https://res.chunghengtrade.com/title-avtivity.png" mode="widthFix" class="image-activity"></image>
			</view>
			<text class="y-line gray flex-none" style="height:45rpx;margin-left:20rpx"></text>
			<view class="icon-notify"></view>
			<uni-notice-bar class="flex-1" scrollable="true" @click="goRoll(singNew)" color="#212121" single="true" speed="10" :showIcon="false" :text="singNew.info" background-color="#fff"></uni-notice-bar>
		</view> -->
		
		<!-- 加一个flex容器，方便模块间排序 -->
		<view class="flex flex-wrap">
		<!-- 限时折扣 -->
			<view v-if="discountList.length>0" class="discount-goods bg-white flex-1" style="order:0">
				<view class="flex-main-center">
					<image src="https://res.chunghengtrade.com/home-title-2.png" class="home-title" mode="widthFix"></image>
				</view>
				<goods-list from="seckill" :list="discountList"></goods-list>
			</view>
			<!-- 精选商品新版 -->
			<view v-if="pickList.length > 0" class="choice-goods bg-white x-line gray flex-1" style="order:1">
				<view class="flex-main-center">
					<image src="https://res.chunghengtrade.com/home-title-1.png" class="home-title" mode="widthFix"></image>
				</view>
				<goods-list :list="pickList"></goods-list>
			</view>
		</view>
		<!-- 精选商品旧版 -->
	<!-- 	<view class="wrapper" v-if="bastList.length > 0">
			<view class="title no-border acea-row row-between-wrapper">
				<view class="text">
					<div class="name line1">
						 <span class="iconfont icon-jingpintuijian"></span>
			  <span class="label">精品推荐</span>
					</div>
				</view>
				<view @click="goHotNewGoods(1)" class="more">
					更多
					<text class="iconfont icon-jiantou"></text>
				</view>
			</view>
			<Good-list :good-list="bastList" :is-sort="false"></Good-list>
		</view> -->

		<!-- <view class="wrapper" v-if="firstList.length > 0">
			<view class="title acea-row row-between-wrapper">
				<view class="text">
					<view class="name line1">
						 <span class="iconfont icon-xinpin"></span>
			  			  <span class="label">首发新品</span>
					</view>
				</view>
				<view @click="goHotNewGoods(3)" class="more">
					更多
					<text class="iconfont icon-jiantou"></text>
				</view>
			</view>
			<view class="newProducts">
				<scroll-view :show-scrollbar="false" scroll-y="false" scroll-x="true">
					<view class="newProductsScroll">
						<view @click="goGoodsCon(item)" class="newProductsItem" v-for="(item, firstListIndex) in firstList" :key="firstListIndex">
							<view class="img-box">
								<image :src="item.image" />
							</view>
							<view class="pro-info line1">{{ item.storeName }}</view>
							<view class="money font-color-red">￥{{ item.price }}</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view> -->
		<!-- <view class="wrapper" v-if="benefit.length > 0">
			<view class="title acea-row row-center">
				<view class="text text-center">
					<div class="name line1 new-name">
              <span class="iconfont icon-shoucang"></span>
              <span class="txt">猜你喜欢</span>
            </div>
				</view> -->
				<!-- <view @click="goGoodsPromotion(4)" class="more">
					更多
					<text class="iconfont icon-jiantou"></text>
				</view> -->
			<!-- </view>
		</view>-->
		<!-- <PromotionGood :benefit="benefit"></PromotionGood> -->
		<Coupon-window :coupon-list="couponList" v-if="showCoupon" @checked="couponClose" @close="couponClose"></Coupon-window>
		<view :class="['modal-shadow modal-content-center',isShowLottery ? 'visible' : '']">
			<view class="relative" @click.stop="()=>false">
				<image @click="goLotteryType()" :src="$img_lottery" class="lottery-img" mode="widthFix"></image>
				<image @click="isShowLottery=false" src="../../static/icon-close-white.png" class="home-close" mode="widthFix" style="width: 44rpx;"></image>
			</view>
		</view>
	</view>
</template>
<script>
	// import { swiper, swiperSlide } from "vue-awesome-swiper";
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex';
	import GoodsList from '@/components/goodsList/goodsList';
	import { getSeckillConfig, getSeckillList,queryLotteryDialog } from "@/api/activity";
	import { getProducts } from "@/api/store";
	// import GoodList from '@/components/GoodList';
	// import PromotionGood from '@/components/PromotionGood';
	import CouponWindow from '@/components/CouponWindow';
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	import {
		getHomeData,
		getShare
	} from '@/api/public';
	import cookie from '@/utils/store/cookie';
	import {
		isWeixin,
		handleUrlParam
	} from '@/utils/index';

	const HAS_COUPON_WINDOW = 'has_coupon_window';

	export default {
		name: 'Index',
		components: {
			// swiper,
			// swiperSlide,
			uniNoticeBar,
			// GoodList,
			// PromotionGood,
			CouponWindow,
			GoodsList
		},
		props: {},
		data: function() {
			return {
				$img_lottery:'home-lottery-dialog1.png',
				// $img_url : '哈哈',
				discountList:[],
				showCoupon: false,
				logoUrl: '',
				banner: [],
				menus: [],
				roll: [],
				activity: [],
				activityOne: {},
				bastList: [], // 旧版精选商品列表
				pickList: [], // 新版精选商品列表
				firstList: [],
				info: {
					fastList: [],
					bastBanner: [],

					bastList: []
				},
				likeInfo: [],
				lovely: [],
				benefit: [],
				couponList: [],
				swiperOption: {
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					},
					autoplay: {
						disableOnInteraction: false,
						delay: 2000
					},
					loop: true,
					speed: 1000,
					observer: true,
					observeParents: true
				},
				swiperRoll: {
					direction: 'vertical',
					autoplay: {
						disableOnInteraction: false,
						delay: 2000
					},
					loop: true,
					speed: 1000,
					observer: true,
					observeParents: true
				},
				swiperScroll: {
					freeMode: true,
					freeModeMomentum: false,
					slidesPerView: 'auto',
					observer: true,
					observeParents: true
				},
				swiperBoutique: {
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					},
					autoplay: {
						disableOnInteraction: false,
						delay: 2000
					},
					loop: true,
					speed: 1000,
					observer: true,
					observeParents: true
				},
				swiperProducts: {
					freeMode: true,
					freeModeMomentum: false,
					slidesPerView: 'auto',
					observer: true,
					observeParents: true
				},
				params:{
					page: 1,
					limit: 4,
					type: 3 // 0 普通商品 1积分商品 2会员卡
				},
				isShowLottery:false,
			};
		},
		  computed:{
    singNew() {
      return this.roll.length > 0 ? this.roll[0] : "你还没添加通知哦！";
    }
  },
		onLoad(){
			// 查询弹框
			queryLotteryDialog().then(({data})=>{
				this.isShowLottery = data
			}).catch(console.error)
		},
		onShow: function() {
			// 测试专用启动跳转
			// this.$yrouter.push('/subpackage/mediaPlay/videoPlay/videoPlay')
			
			this.getLocation()
			let that = this;
			uni.showLoading({
				title: '加载中'
			});
			let count=0
			getHomeData().then(res => {
				that.logoUrl = res.data.logoUrl;
				that.$set(that, 'banner', res.data.banner);
				that.$set(that, 'menus', res.data.menus);
				that.$set(that, 'roll', res.data.roll);
				that.$set(that, 'info', res.data.info);
				that.$set(that, 'firstList', res.data.firstList);
				that.$set(that, 'bastList', res.data.bastList);
				that.$set(that, 'likeInfo', res.data.likeInfo);
				that.$set(that, 'lovely', res.data.lovely);
				that.$set(that, 'benefit', res.data.benefit);
				that.$set(that, 'couponList', res.data.couponList);
				that.setOpenShare();
			}).finally(()=>{
				if(++count == 3){
					uni.hideLoading();
				}
			})

			// 限时折扣同秒杀抢购
			let limitTime = 0 // 限时折扣的停止时间，同秒杀的stop
			getSeckillConfig().then(({data})=>{
				let item = data.seckillTime.find(v=>v.status===1)
				limitTime = item.stop
				return getSeckillList(item.id,{page:1,limit:4})
			}).then(({data})=>{
				data.forEach(v=>v.stop=limitTime) // 给商品加上结束时间，方便goodsList组件跳详情用
				this.discountList = data
			}).catch(err=>{
				console.error('拉取限时折扣列表发生错误',err)
			}).finally(()=>{
				if(++count == 3){
					uni.hideLoading();
				}
			})
			
			// 精选商品
			getProducts(this.params).then(res=>{
				this.pickList = res.data
			}).catch(err => {
				console.error("获取精选商品列表发生错误！",err)
			}).finally(()=>{
				if(++count == 3){
					uni.hideLoading();
				}
			})
		},
		methods: {
			...mapActions(["getLocation"]),
			goLotteryType(){
				this.$yrouter.push("/subpackage/lotteryDraw/lotteryType/lotteryType");
			},
			goMyNotify(){
				this.$yrouter.push("/subpackage/notify/index")
			},
			goRoll(item) {
				console.log(item)
				if (item.uniapp_url) {
					this.$yrouter.push(item.uniapp_url)
				}
			},
			goGoodSearch() {
				// this.$yrouter.push('/pages/shop/GoodsEvaluate/index');
				this.$yrouter.push('/pages/shop/GoodSearch/index');
			},
			goWxappUrl(item) {
				this.$yrouter.push(item.uniapp_url);
			},
			goHotNewGoods(type) {
				this.$yrouter.push({
					path: '/pages/shop/HotNewGoods/index',
					query: {
						type
					}
				});
			},
			goGoodsCon(item) {
				this.$yrouter.push({
					path: '/pages/shop/GoodsCon/index',
					query: {
						id: item.id
					}
				});
			},
			goGoodsPromotion() {
				this.$yrouter.push('/pages/shop/GoodsPromotion/index');
			},
			setOpenShare: function() {},
			startQr: function() {
				uni.scanCode({
					success: (res) => {
						let option = handleUrlParam(res.result)
						console.log(option)


						// {productId: "19", spread: "21", codeType: "routine"}
						// {productId: "19", spread: "21", pageType: "good", codeType: "routine"}
						switch (option.pageType) {
							case 'good':
								// 跳转商品详情
								this.$yrouter.push({
									path: '/pages/shop/GoodsCon/index',
									query: {
										q: res.result
									}
								});
								break;
							case 'group':
								// 跳转团购
								this.$yrouter.push({
									path: '/pages/activity/GroupRule/index',
									query: {
										q: res.result
									}
								});
								break;
							case 'dargain':
								// 跳转砍价
								this.$yrouter.push({
									path: '/pages/activity/DargainDetails/index',
									query: {
										q: res.result
									}
								});
								break;
							default:
								// 跳转分销
								this.$yrouter.push({
									path: '/pages/Loading/index',
									query: {

									}
								});
								break;
						}


					}
				});
			}
		}
	};
</script>
