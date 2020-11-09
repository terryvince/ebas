<style scoped lang="less">
	.header{
		background-color: white;
		padding: 0 20rpx;
		.search{
			background-color: #EEEEEE;
			border: 1px solid #EEEEEE;
			border-radius: 50rpx;
			overflow: hidden;
		}
		.icon-search{
			width: 22rpx;
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
</style>
<template>
	<view class="header flex-main-center">
		<view @click="goGoodSearch()" class="search flex-main-start relative">
			<!-- <text class="iconfont icon-xiazai5"></text> -->
			<view class="acea-row row-middle">
				<image class="icon-search" src="http://qj5wtf3w8.hn-bkt.clouddn.com/icon-search-gray.png" mode="widthFix"></image>
				<span class="y-line left-10"></span>
				<text class="left-10 color-placeholder">搜索请输入关键词</text>
			</view>
			<view class="search-button flex-main-center">搜索</view>
		</view>
		<view class="qr" @click="startQr()">
			<image src="@/static/images/qr.png" />
		</view>
	</view>
</template>

<script>
	export default {
		name:'search-bar',
		data() {
			return {
				
			};
		}
	}
</script>
