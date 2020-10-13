<style scoped lang="less">
 .list{
	 background: white;
	 display: flex;
	 justify-content: space-between;
	 flex-wrap: wrap;
	 padding:30rpx 25rpx 0;
	 .list-item{
		 width:336rpx;
		 margin-bottom: 30rpx;
		 flex: none;
	 }
	 .img-wrap{
		 width: 100%;
		 height: 260rpx;
		 border-radius:8rpx 4rpx 4rpx 4rpx;
	 }
 }
 .top-23{
	 margin-top: 23rpx;
 }
 .top-19{
	 margin-top:19rpx;
 }
 .top-10{
	 margin-top:10rpx;
 }
 .left-6{
	 margin-left: 6rpx;
 }
</style>
<template>
	<view class="point-shopping">
		<view v-if="list.length>0">
			<view class="list">
				<view @click="goDetail(item)" class="list-item lh-1" v-for="item in list" :key="item.id">
					<view class="img-wrap over-hide">
						<image :src="item.image" class="full"></image>
					</view>
					<view class="fs-28 color-text top-19 txt-bold width-full txt-ellipsis">{{item.storeName}}</view>
					<view class="flex-main-start fs-28 top-23">
						<text class="color-danger">{{item.price}}积分 </text>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="flex-main-center top-20 color-text-secondary fs-24">暂时没有数据哦</view>
	</view>
</template>

<script>
	import { getProducts } from "@/api/store";
	export default {
		data() {
			return {
				params:{
					page: 1,
					limit: 8,
					// keyword: '',
					// sid: '', //二级分类id
					// news: 0,
					// priceOrder: "",
					// salesOrder: "",
					type: 1 // 0 普通商品 1积分商品 2会员卡
				},
				list:[
					// {
					// 	img: require("../static/logo.png"),
					// 	title: "实木复合静音门",
					// 	point: 400
					// },
					// {
					// 	img: require("../static/logo.png"),
					// 	title: "实木复合静音门",
					// 	point: 400
					// },
					// {
					// 	img: require("../static/logo.png"),
					// 	title: "实木复合静音门",
					// 	point: 400
					// }
				]
			};
		},
		created(){
			this.getProductList(1)
		},
		onPullDownRefresh(){
			this.getProductList(1).finally(()=>{
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom(){
			this.getProductList()
		},
		methods:{
			goDetail(item){
				this.$yrouter.push({
				  path: "/pages/shop/GoodsCon/index",
				  query: {
					  id: item.id,
					  mode:'point'
				  }
				});
			},
			getProductList(page=1){
				if(page){
					this.params.page = page
				}
				uni.showLoading({
					title:'加载中...'
				})
				return getProducts(this.params).then(res=>{
					if(this.params.page == 1) {
						this.list = res.data
						return
					}
					this.list = this.list.concat(res.data)
					this.params.page++
				}).catch(err => {
					console.error("获取积分商品列表发生错误！",err)
				}).finally(uni.hideLoading)
			}
		}
	}
</script>
