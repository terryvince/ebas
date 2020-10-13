<style scoped lang="less">
 .goods-list{
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
 .overlay{
	 background-color: rgba(0,0,0,.6);
	 position: absolute;
	 left: 0;
	 top: 0;
	 right: 0;
	 bottom: 0;
	 .abs-left-top{
		 position: absolute;
		 left: 0;
		 top: 0;
	 }
 }
</style>
<template>
	<view class="goods-list" :style="{padding: hasPadding? '30rpx 25rpx 0': '0'}">
		<view @click="goDetail(item)" :class="['list-item lh-1']" v-for="(item,i) in list" :key="i">
			<view class="img-wrap over-hide relative">
				<view class="overlay full" v-show="item.isShow == 0">
					<image src="../../static/images/goods-off.png" mode="widthFix" class="width-half abs-left-top"></image>
				</view>
				<image :src="item.image" class="full"></image>
			</view> 
			<view class="fs-28 color-text top-19 txt-bold width-full txt-ellipsis">{{item.storeName}}</view>
			<view class="flex-main-start fs-28 top-23">
				<text class="color-danger">¥{{item.price|toFixed}} </text>
				<text class="color-text-secondary del-line left-6">¥{{item.otPrice|toFixed}}</text>
			</view>
			<view class="fs-24 color-text-secondary top-10">已售{{item.sales}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'GoodsList',
		props:{
			list:{
				type:[Array],
				default:[]
			},
			// 是否具有内边距
			hasPadding:{
				type:[Boolean],
				default:true
			},
			// 什么来源，普通商品，秒杀商品
			from:{
				type:[String],
				default:'goods'  // seckill 秒杀商品 goods 普通商品
			},
		},
		filters:{
			toFixed(value, option=2){
				if(typeof value !== 'number'){
					return '非数字'
				}
				value = +value
				return value.toFixed(option)
			}
		},
		created(){
			// setTimeout(()=>{
			// 	console.log(self,'this')
			// },5000)
		},
		data() {
			return {
			};
		},
		methods:{
			goDetail(item){
				if(item.isShow==0){
					uni.showToast({
						icon:'none',
						title:'商品已下架'
					})
					return
				}
				// console.log('------限时',this.from)
				if(this.from == 'seckill'){ //秒杀商品
					this.$yrouter.push({
					  path: "/pages/activity/SeckillDetails/index",
					  query: {
					    id:item.id,
					    time:item.stop
					  }
					});
					return
				}
				// 普通商品
				this.$yrouter.push({
				  path: "/pages/shop/GoodsCon/index",
				  query: {
					  id: item.pid || item.id
				  }
				});
			}
		}
	}
</script>
