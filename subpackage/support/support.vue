<style scoped lang="less">
	.content {
		margin-top: 20rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding-bottom: 20rpx;

		.title {
			font-size: 28rpx;
			height: 80rpx;
			font-weight: bold;
			border-bottom: 1px solid #f5f5f5;
			margin-left: 20rpx;
		}

		.input {
			padding-top: 20rpx;
			padding-left: 20rpx;
			margin-left: 20rpx;
			margin-right: 20rpx;
			margin-top: 20rpx;
			background-color: #F0F0F0;
			font-size: 26rpx;
		}
	}

	textarea {
		// background-color: #444444;
		width: 680rpx;
	}

	robby-image-upload::v-deep {
		.imageItem , .imageUpload {
		    width: 150rpx !important;
		    height: 150rpx !important;
		    margin: 10rpx !important;
		}
	}

	.photos {
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-top: 20rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		// min-height: 200rpx;
	}
</style>

<template>
	<view>
		<OrderGoods :evaluate="status.type || 0" :cartInfo="orderInfo.cartInfo || []"></OrderGoods>
		<view class="content">
			<view class="title flex-main-start">申请原因</view>
			<view class="input">
				<view class="uni-textarea">
					<textarea placeholder="请输入申请原因"></textarea>
				</view>
			</view>
		</view>

		<view class="photos">
			<robby-image-upload v-model="imageData" @delete="deleteImage" @add="addImage" :limit=4>
			</robby-image-upload>
		</view>
	</view>
</template>

<script>
	import OrderGoods from "@/components/OrderGoods";
	import robbyImageUpload from '@/components/robby-image-upload/robby-image-upload';
	export default {
		components: {
			robbyImageUpload
		},
		data: function() {
			return {
				orderInfo: {},
				imageData: "",
			};
		},
		methods: {
			deleteImage: function(e) {
				console.log(e)
			},
			addImage: function(e) {
				console.log(e)
			}
		}
	}
</script>
