<style lang="less" scoped>
	.return-menu{
		height: 110rpx;
		line-height: 110rpx;
		color: #101010;
		margin-bottom: 20rpx;
		font-size: 28rpx;
		box-sizing: border-box;
	}
	.return-menu-item{
		// width: 25%;
	}
	.red-bar{
		position: absolute;
		left: 0;
		bottom: 0;
		width: 60rpx;
		height: 8rpx;
		background: linear-gradient(90deg, #EB4559 0%, #F47454 100%);
		border-radius: 4rpx;
		transform: translate(0);
		transition: transform .3s;
		transition-timing-function: ease-out;
	}
	.goodWrapper{
		margin: 20rpx;
		border-radius: 20rpx;
		overflow: hidden;
	}
	.return-list .goodWrapper .totalSum {
	    padding: 30rpx 30rpx 32rpx 30rpx;
	}
	.goodWrapper .item {
		height: 250rpx;
	}
</style>
<template>
  <view class="return-list" ref="container">
	  <view class="padding-beside-20 bg-white">
		  <!-- type -1 申请中 -2 已退款 -4 已退货 -5 退货中 -3 退款 -->
		  <view class="relative return-menu flex-main-between txt-medium">
		  	<text @click="switchTab(-1)" class="return-menu-item">申请中</text>
			<text @click="switchTab(-5)" class="return-menu-item">退货中</text>
		  	<text @click="switchTab(-2)" class="return-menu-item">已退款</text>
			<text @click="switchTab(-4)" class="return-menu-item">已退货</text>
		  	<view class="red-bar" :style="{transform:`translate(${translate}px)`}"></view>
		  </view>
	  </view>
    <view class="goodWrapper" v-for="(order,orderListIndex) in orderList" :key="orderListIndex">
      <view class="iconfont icon-tuikuanzhong powder" v-if="order._status._type === -1"></view>
      <view class="iconfont icon-yituikuan" v-if="order._status._type === -2"></view>
      <view class="orderNum flex-main-between">
		  <text class="color-black txt-bold">{{order.cartInfo[0].shopName || '未设置店铺'}}</text>
		  <text class="color-danger fs-28 txt-bold">{{order|toRefundText}}</text>
	  </view>
      <view
        class="item acea-row row-between-wrapper flex-nowrap"
        v-for="(cart,cartInfoIndex) in order.cartInfo"
        :key="cartInfoIndex"
		style="border-bottom: 1px solid #eee;"
        @click="goOrderDetails(order)"
      >
        <view class="pictrue flex-none right-10">
          <image :src="cart.productInfo.image" class="image" @click.stop="goGoodsCon(cart)" />
        </view>
        <view class="text flex-1">
          <view class="acea-row row-between-wrapper">
            <view class="name txt-ellipsis row-2">{{ cart.productInfo.storeName }}</view>
            <view class="num">x {{ cart.cartNum }}</view>
          </view>
          <view
            class="attr line1"
			style="margin-top:18rpx;"
            v-if="cart.productInfo.attrInfo"
          >{{ cart.productInfo.attrInfo.sku }}</view>
          <view class="attr line1" style="width: 453rpx;margin-top:18rpx;" v-else>{{ cart.productInfo.storeName }}</view>
          <view class="money color-danger">￥{{ cart.productInfo.price }}</view>
        </view>
      </view>
      <view class="totalSum">
        共{{ order.cartInfo.length || 0 }}件商品，总金额
        <text
          class="font-color-red price left-10"
        >￥{{ order.payPrice }}</text>
      </view>
    </view>
    <view class="noCart" v-if="orderList.length === 0 && page > 1">
      <view class="pictrue flex-main-center">
        <image src="@/static/images/noOrder.png" />
      </view>
    </view>
    <Loading :loaded="true" :loading="loading"></Loading>
  </view>
</template>

<script>
import { getOrderList } from "@/api/order";
import { querySelectorAll } from "@/utils/utils";
import Loading from "@/components/Loading";

export default {
  name: "ReturnList",
  components: {
    Loading
  },
  data() {
    return {
      orderList: [],
      page: 1,
      limit: 20,
      loading: false,
      loaded: false,
	  translate:0,
	  type:-1,
	  menuPosition:[],
	  timer:null
    };
  },
  filters:{
	  toRefundText(order){
		  return {
			 0:'未退款',
			 1:'申请中',
			 2: order.refundType==0 ? '已退款':'已退货',
			 3:'待退货',
			 4:'买家发货'
		  }[order.refundStatus]||'0'
	  }
  },
  methods: {
    goGoodsCon(cart) {
      this.$yrouter.push({
        path: "/pages/shop/GoodsCon/index",
        query: { id: cart.productInfo.id }
      });
    },
    goOrderDetails(order) {
      this.$yrouter.push({
        path: "/pages/order/OrderDetails/index",
        query: { id: order._status._type ==0 ? order.orderId : order.extendOrderId }
      });
    },
	// type -1 申请中 -2 已退款 -4 已退货 -5 退货中 -3 退款 
    getOrderList() {
      const { page, limit } = this;
      if (this.loading || this.loaded) return;
      this.loading = true;
      getOrderList({
        page,
        limit,
        type: this.type
      }).then(res => {
		if(this.page == 1){
			this.orderList = res.data
		}else{
			this.orderList = this.orderList.concat(res.data);
		}
        this.loading = false;
        this.loaded = res.data.length < limit;
        this.page++;
      });
    },
	// 切换tab项
	switchTab(type){
		this.type = type || this.type;
		this.translate = {
				  "-1": this.menuPosition[0].left - this.menuPosition[0].left,
				  "-5": this.menuPosition[1].left - this.menuPosition[0].left,
				  "-2": this.menuPosition[2].left - this.menuPosition[0].left,
				  "-4": this.menuPosition[3].left - this.menuPosition[0].left,
		}[type+''] || 0;
		this.page = 1
		this.loading = this.loaded = false
		this.orderList = []
		
		this.timer && clearTimeout(this.timer)  // 500毫秒内重复点击取消上一次请求
		const get = ()=>{
			this.getOrderList();
		}
		this.timer = setTimeout(get,500)
		
	},
	async getMenuPosition(){
		  const data = await querySelectorAll('.return-menu-item')
		  this.menuPosition = data
	},
  },
  mounted() {
	this.getOrderList(-1);
	this.getMenuPosition()
  },
  onReachBottom() {
    !this.loading && this.getOrderList();
  }
};
</script>
