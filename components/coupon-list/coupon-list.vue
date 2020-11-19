<style scoped lang="less">
.grid(@count:4,@itemWidth:20,@itemHeight:auto){
	@rest:100 - @itemWidth * @count; // 剩余空间
	@space: @rest/(@count - 1) * 1%; // 边距
	display: flex;
	& > view {
		flex: 0 0 @itemWidth * 1%;
		height: @itemHeight;
		margin-right: @space;
		margin-top: @space;
		box-sizing: border-box;
		&:nth-child( @{count}n ){
			margin-right: 0;
		}
		&:nth-child( -n + @{count} ){
			margin-top: 0;
		}
		&:last-child{
			margin-right: auto;
		}
	}
}
.index-coupon-wrap{
		width: auto;
		margin:0 20rpx;
		background: url(http://qj5wtf3w8.hn-bkt.clouddn.com/index-coupon.png)no-repeat center;
		background-size: 100% 100%;
		padding: 24rpx 22rpx 36rpx;
		position: relative;
	}
	.index-coupon-list{
		width:auto;
		.grid(3,32,122rpx)
		// padding: ;
	}
	.coupon-item{
		
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
	.money-img{
		position: absolute;
		left: 10rpx;
		bottom: 6rpx;
	}
	.color-linear-yellow{
		color: #F1EEC3;
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
		text-align: center;
	}
	.price-sign{
		font-size: 19rpx;align-self:flex-end;position: relative;right: -6rpx;top: -16rpx;
	}
</style>

<template>
	<view class="index-coupon-wrap">
		<view class="more flex-main-end fs-20 color-white">
			<text @tap="moreOther()">更多</text>
			<text class="iconfont icon-jiantou fs-20"></text>
		</view>
		<view class="index-coupon-list top-10">
			<view v-for="(item,i) of list" :key="i" class="coupon-item flex-main-between" style="background-color: #FFF76B5B;">
				<view style="position: relative; top: -10rpx;">
					<view class="flex-main-start">
						<text class="color-white lh-1 price-sign">￥</text>
						<!-- {{item.coupon_price}} -->
						<text class="color-linear-yellow txt-bold lh-1" style="font-size: 45rpx;">{{item.couponPrice}}</text>
						<view class="color-linear-yellow fs-18 flex-main-start flex-column" style="margin: 0 10rpx;">
							<text>优</text>
							<text>惠</text>
							<text>券</text>
						</view>
					</view>
					<view class="color-white fs-16 flex-main-start txt-ellipsis" style="margin: 6rpx 0 0 10rpx;">满{{item.useMinPrice}}元可使用</view>
				</view>
				<view class="color-red fs-20 radius-btn" @tap="couponReceive(item)">{{item.isUse?"已领取":"点击领取"}}</view>
			</view>
		</view>
		<image class="money-img" src="http://qj5wtf3w8.hn-bkt.clouddn.com/index-money.png" style="width: 74rpx;height: 62rpx;"></image>
	</view>
</template>

<script>
	import { getCoupon,getCouponReceive} from "@/api/user";
	export default {
		props:{
			ids:{
				type:[String,Number],
				default:0
			}
		},
		data() {
			return {
				list:[],
				params:{
					page: 1,
					limit: 3,
					merId:""
				}
			};
		},
		mounted(){
			this.params.merId = this.ids?this.ids:0; 
			this.getCouponList();
		},
		methods:{
			// 获取优惠券
			getCouponList(){
				getCoupon(this.params).then(res=>{
				this.list = res.data;
			})
			},
			// 点击领取优惠券
			couponReceive(item){
				let id = item.id,
					isUse = item.isUse;
				if(!isUse){
					getCouponReceive(id).then(res=>{
						if(res.success){
							uni.showToast({
								title:"成功领取优惠券",
								icon:"none",
								duration:2000
							})
							this.getCouponList();
						}
					})
				}else{
					uni.showToast({
						title:"该优惠券已领取",
						icon:"none",
						duration:2000
					})
				}
			},
			// 更多
			moreOther(){
				this.$yrouter.push({
					path:"/pages/user/coupon/GetCoupon/index",
					query:{"merId":this.params.merId}
				})
			}
		}
	}
</script>
