<style lang="less">
	page{
		background-color: #EDF4FC;
		padding-bottom: 24rpx;
	}
	.uspr{
		.header{
			height: 508rpx;
			background: linear-gradient(56deg, #71D676, #5FCB55);
		}
		.body{
			position: absolute;
			left: 41rpx;
			right: 38rpx;
			top: 69rpx;
			min-height: 936rpx;
			border-radius: 20rpx 20rpx 0 0;
			padding:0 26rpx 40rpx;
			box-sizing: border-box;
			background-color: white;
		}
		.title{
			background-color: #FBFBFB;
			height: 178rpx;
			color: #4F4F4F;
			font-size: 38rpx;
		}
		.content{
			margin: 68rpx 0 0;
			color: #333333;
			font-size: 26rpx;
		}
		.letter-box{
			position: absolute;
			height: 220rpx;
			left: -32rpx;
			right: -30rpx;
			bottom: -200rpx;
			background: url(https://res.sdebs.com/protocol-3-v1.png)no-repeat center;
			background-size: 100% 100%;
		}
	}
</style>
<template>
	<view class="uspr">
		<view class="header"></view>
		<view class="body">
			<view class="title flex-main-center">
				<span class="txt-bold">鹅把式平台协议</span>
			</view>
			<view class="content">
				<rich-text style="text-indent: 2em;" :nodes="rule"></rich-text>
			</view>
			<view class="letter-box">
				
			</view>
		</view>
	</view>
</template>

<script>
	import { getProtocol} from "@/api/store";
	export default {
		data() {
			return {
				rule:''
			};
		},
		onShow(){
			getProtocol("平台协议").then(res=>{
				this.rule = res.data[0].content;
			})
		}
	}
</script>
