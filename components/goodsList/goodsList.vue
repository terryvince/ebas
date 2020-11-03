<style scoped lang="less">
// 多行多列布局
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
 .good-list-card{
	 padding:30rpx 25rpx 0;
	 .grid(2,48);
	 .list-item{
		 background-color: white;
		 border-radius: 20rpx;
		 overflow: hidden;
		 flex-wrap: wrap;
	 }
	 .img-wrap{
		 width: 100%;
		 height: 345rpx;
		 border-radius:8rpx 4rpx 4rpx 4rpx;
	 }
	 .content{
		 padding: 22rpx 18rpx;
	 }
 }
 .top-31{
	 margin-top: 31rpx;
 }
 .top-22{
	 margin-top:22rpx;
 }
 .top-19{
	 margin-top:19rpx;
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
	<view>
		<!-- 普通商品或者积分商品 -->
		<view v-if="from == 'goods' || from == 'point'" class="good-list-card">
			<view @click="goDetail(item)" :class="['list-item lh-1']" v-for="(item,i) in list" :key="i">
				<!-- 商品下架蒙尘 -->
				<view class="img-wrap over-hide relative">
					<view class="overlay full" v-show="item.isShow == 0">
						<image src="../../static/images/goods-off.png" mode="widthFix" class="width-half abs-left-top"></image>
					</view>
					<image :src="item.image" class="full"></image>
				</view>
				<view class="content">
					<!-- 商品名 -->
					<view class="fs-26 color-text top-22 txt-medium width-full txt-ellipsis row-2" style="height: 56rpx;">{{item.storeName}}</view>
					<view v-if="from == 'goods'">
						<!-- 商品价格 -->
						<view class="flex-main-start top-31 fs-22">
							<text class="color-danger">¥</text>
							<text class="color-danger fs-32">{{item.price|toFixed}} </text>
							<text class="color-text-secondary del-line left-6">¥{{item.otPrice|toFixed}}</text>
						</view>
						<!-- 商户已售 -->
						<view class="fs-20 color-text-secondary top-19 flex-main-between">
							<text class="txt-bold">鹅把式商户</text>
							<text class="txt-light">已售{{item.sales}}</text>
						</view>
					</view>
					<view v-else class="color-danger txt-heavy fs-28">
						199积分 
					</view>
				</view>
			</view>
		</view>
		<!-- 团购 -->
		<view v-else-if="from='group'">
			
		</view>
		<!-- 秒杀商品 -->
		<view v-else-if="from='seckill'">
			
		</view>
	</view>
</template>

<script>
	export default {
		name:'GoodsList',
		props:{
			list:{  // 列表数据，元素项暂定符合格式{storeName:"商品名",price:'商品现价',otPrice:'商品原价',sales:'已售数量',image:'商品图片'}
				type:[Array],
				default:[]
			},
			// 什么来源，普通商品，秒杀商品
			from:{
				type:[String],
				default:'goods'  // seckill 秒杀商品 goods 普通商品 point 积分商品 group 团购商品
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
