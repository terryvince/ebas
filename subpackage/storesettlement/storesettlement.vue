<style>
	page {
		height: 100%;
		width: 100%;
	}
</style>

<style scoped lang="less">
	.storesettlement {
		width: 100%;
		height: 100%;

		.imageBg {
			width: 100%;
			background-size: 100%;
			position: fixed;
			left: 0;
			top: 0;
			z-index: -1;
		}
		.storeInfo{
			margin: 0 20rpx;
			margin-top: 490rpx;
		}
		.iconfont {
		    font-size: 26rpx !important;
		    color: #666;
		}
		.photos {
			margin: 20rpx 10rpx 0 10rpx;
			background-color: #F5F5F5;
			border-radius: 20rpx;
		}
		.textContent{
			margin: 20rpx 10rpx 10rpx;
			padding: 15rpx;
			background-color: #F5F5F5;
			border-radius: 20rpx;
			textarea{
				width: 100%;
				height: 200rpx;
			}
		}
		.agreement{
			display: flex;
			justify-content: space-between;
			margin-top: 20rpx;
			.agreementItem{
				width: 340rpx;
				height: 80rpx;
				background-color: #fff;
				line-height: 80rpx;
				text-align: center;
				border-radius: 15rpx;
			}
		}
		.idTitle,.licenseTitle,.orderTitle,.logoTitle,.textTitle{
			padding: 10rpx 10rpx 20rpx;
			border-bottom: 1rpx solid #EBEBEB;
		}
		.footerBtm{
			width: 100%;
			height: 160rpx;
			margin-top: 20rpx;
			background-color: #fff;
			border-top: 1rpx solid #fff;
			.button{
				width: 710rpx;
				height: 98rpx;
				background:linear-gradient(to right,#5FCB55,50%,#71D676);
				font-size: 36rpx;
				color: #fff;
				text-align: center;
				line-height: 98rpx;
				margin: 31rpx 20rpx;
				border-radius: 10rpx;
			}
		}
	}
</style>

<template>
	<view class="storesettlement">
		<image class="imageBg" src="http://qj5wtf3w8.hn-bkt.clouddn.com/index-settlement.png" mode="widthFix"></image>
		<!-- 信息 -->
		<view class="storeInfo">
			<!-- 基本信息 -->
			<view class="list">
				<view class="item acea-row row-between-wrapper">
					<view class="name">姓名：</view>
					<input type="text" placeholder="请输入姓名" v-model="storeInfo.name" required />
				</view>
				<view class="item acea-row row-between-wrapper">
					<view class="name">店铺名称：</view>
					<input type="text" placeholder="请输入联系电话" v-model="storeInfo.storeName" required />
				</view>
				<view class="item acea-row row-between-wrapper">
					<view class="name">电话：</view>
					<input type="text" placeholder="请输入联系电话" v-model="storeInfo.phone" required />
				</view>
				<view class="item acea-row row-between-wrapper">
					<view class="name">商品类别</view>
					<view class="picker acea-row row-between-wrapper select-value form-control">
						<view class="address">
							<input type="text" v-model="storeInfo.category" required />
						</view>
						<view class="iconfont icon-jiantou"></view>
					</view>
				</view>
				<view class="item acea-row row-between-wrapper">
					<view class="name">地区</view>
					<view class="picker acea-row row-between-wrapper select-value form-control">
						<view class="address">
							<CitySelect ref="cityselect" :defaultValue="addressText" :value1="addressText" @callback="result" :items="district"></CitySelect>
						</view>
						<view class="iconfont icon-jiantou"></view>
					</view>
				</view>
			</view>
			<!-- 身份证 -->
			<view class="storeId">
				<view class="idTitle">
					身份证正反面
				</view>
				<view class="photos">
					<robby-image-upload v-model="imageStoreId" @delete="deleteImage" @add="addImage" :limit=2>

					</robby-image-upload>
				</view>
			</view>
			<!-- 营业执照 -->
			<view class="license">
				<view class="licenseTitle">
					营业执照
				</view>
				<view class="photos">
					<robby-image-upload v-model="imageLicense" @delete="deleteImage" @add="addImage" :limit=3>

					</robby-image-upload>
				</view>
			</view>
			<!-- 其他证件 -->
			<view class="orderCertificates">
				<view class="orderTitle">
					其他证件
				</view>
				<view class="photos">
					<robby-image-upload v-model="imageOrder" @delete="deleteImage" @add="addImage" :limit=4>

					</robby-image-upload>
				</view>
			</view>
			<!-- 店铺LOGO -->
			<view class="storeLogo">
				<view class="logoTitle">
					店铺LOGO
				</view>
				<view class="photos">
					<robby-image-upload v-model="imageLogo" @delete="deleteImage" @add="addImage" :limit=1>

					</robby-image-upload>
				</view>
			</view>
			<!-- 文字介绍 -->
			<view class="textIntroduce">
				<view class="textTitle">
					文字介绍
				</view>
				<view class="textContent">
					<textarea v-model="textContent" placeholder-style="color:#D5D5D5" placeholder="请输入文字介绍" />
					</view>
			</view>
			<!-- 协议 -->
			<view class="agreement">
				<view class="agreementItem">
					<checkbox style="size: 30rpx;" value="cb" checked="true" />平台协议
				</view>
				<view class="agreementItem">
					<checkbox value="cb" checked="true" />行业协议
				</view>
			</view>
		</view>
		<!-- 入驻 -->
		<view class="footerBtm">
			<view class="button">
				入驻
			</view>
		</view>
	</view>
</template>

<script>
	import CitySelect from "@/components/CitySelect";
	import { getCity} from "@/api/user";
	import robbyImageUpload from '@/components/robby-image-upload/robby-image-upload';
	export default {
		components: {
			CitySelect,
			robbyImageUpload
		},
		data:function(){
			return{
				// 地址
				addressText:"111",
				district:[],
				address:{},
				// 身份证
				imageStoreId:"",
				// 营业执照
				imageLicense:"",
				// 其他证件
				imageOrder:"",
				// 店铺LOGO
				imageLogo:"",
				// 文字介绍
				textContent:""
			}
		},
		mounted: function() {
		  this.getCityList();
		},
		methods:{
			// 获取子组件传递的地址数据
			result(values) {
			  // console.log(this);
			  console.log('1',values);
			  this.address = {
			    province: values.province.name || "",
			    city: values.city.name || "",
			    district: values.district.name || "",
			    city_id: values.city.id
			  };
			  this.addressText = `${this.address.province}${this.address.city}${this.address.district}`;
			  // this.addressText =
			  //   this.address.province + this.address.city + this.address.district;
			},
			getCityList: function() {
			  let that = this;
			  getCity()
			    .then(res => {
			      that.district = res.data;
			      that.ready = true;
			    })
			    .catch(err => {
			      that.$dialog.error(err.msg);
			    });
			},
		}
	}
</script>
