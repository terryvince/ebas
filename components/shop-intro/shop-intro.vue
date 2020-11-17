<style scoped lang="less">
.comment-box {
	padding: 40rpx 30rpx 56rpx;

	.avator {
		width: 92rpx;
		height: 92rpx;
		border-radius: 50%;
	}
}
.style-receive {
	padding: 6rpx 16rpx;
	background-color: #64CE5E;
	border-radius: 10rpx;
}
</style>
<template>
	<view v-if="shopInfo" class="bg-white top-20 comment-box">
		<view class="flex-main-between">
			<view class="flex-main-start">
				<image class="avator flex-none" :src="shopInfo.headImage"></image>
				<text class="left-15 fs-34">{{shopInfo.name}}</text>
			</view>
			<view>
				<text @click="goShopManage()" class="fs-28 style-receive color-white">进入店铺</text>
			</view>
		</view>
		<view class="padding30 bg-gray top-20 boder-radius fs-24 color-text">
			{{shopInfo.introduce}}
		</view>
	</view>
</template>

<script>
	export default {
		props: ['shopInfo'],
		data() {
			return {
				
			};
		},
		methods:{
			goShopManage() {
				this.$yrouter.push({
					path: "/subpackage/shop/shop",
					query: {
						shopInfo: JSON.stringify(this.shopInfo)
					}
				});
			},
		}
	}
</script>
