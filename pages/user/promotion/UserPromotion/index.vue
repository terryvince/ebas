<style lang="less">
	.my-promotion .header{
		background: url(https://res.chunghengtrade.com/spread-bg.png)no-repeat center;
	}
	.s-btn{
		width:142rpx;
		height:98rpx;
		background:#F16356;
		color: white;
	}
</style>
<template>
  <view class="my-promotion">
    <view class="header">
      <view class="name acea-row row-center-wrapper">
        <view>当前积分</view>
        <!-- <view class="record" @click="goCashRecord()">
          提现记录
          <text class="iconfont icon-xiangyou"></text>
        </view> -->
      </view>
      <view class="num">{{ Info.integral }}</view>
      <view class="profit acea-row row-between-wrapper">
        <view class="item">
          <view>累计收益</view>
          <view class="money">{{ Info.commissionCount }}</view>
        </view>
        <view @click="goUserIntegral()" class="item">
          <view>积分转余额</view> 
          <text class="money">&nbsp;</text>
        </view>
      </view>
    </view>
    <!-- <view class="bnt bg-color-red" @click="toCash">立即提现</view> -->
	<view class="ipnut-group fs-28 color-text-secondary padding-beside-20 top-30">
		<view class="s-row flex-main-start">
			<view class="flex-main-start padding-beside-30 flex-1 bg-white boder-radius flex-item-align-stretch">
				我的推广码:  {{uid}}
			</view>
			<view @click="copy()" class="s-btn left-15 flex-none boder-radius flex-main-center">复制</view>
		</view>
		<view class="s-row flex-main-start top-15">
			<view class="flex-main-start padding-beside-30 flex-1 bg-white boder-radius flex-item-align-stretch">
				<text>绑定上级</text>
				<input :disabled="!!spreadUid" v-model="code" type="number" class="flex-1 fs-28 left-30" placeholder="输入邀请推广码" placeholder-style="color:#BCBCBC"/>
			</view>
			<view @click="bind()" class="s-btn left-15 flex-none boder-radius flex-main-center">绑定</view>
		</view>
	</view>
    <view class="list acea-row row-between-wrapper">
      <view class="item acea-row row-center-wrapper row-column" @click="goPoster()">
        <text class="iconfont icon-erweima"></text>
        <view>推广名片</view>
      </view>
      <view class="item acea-row row-center-wrapper row-column" @click="goPromoterList()">
        <text class="iconfont icon-tongji"></text>
        <view>推广人统计</view>
      </view>
      <view class="item acea-row row-center-wrapper row-column" @click="goCommissionDetails()">
        <text class="iconfont icon-qiandai"></text>
        <view>积分明细</view>
      </view>
      <view class="item acea-row row-center-wrapper row-column" @click="goPromoterOrder()">
        <text class="iconfont icon-dingdan"></text>
        <view>推广人订单</view>
      </view>
      <!-- <view class="item acea-row row-center-wrapper row-column" @click="toCash()">
        <text class="iconfont icon-chongzhi"></text>
        <view>立即提现</view>
      </view> -->
	  
    </view>
  </view>
</template>
<script>
import { getSpreadInfo,bindSuperior } from "@/api/user";

export default {
  name: "UserPromotion",
  components: {},
  props: {},
  data: function() {
    return {
	  spreadUid:'',
	  code:'',
	  uid:'',
      Info: {
		integral:0,
        lastDayCount: 0,
        extractCount: 0,
        commissionCount: 0
      }
    };
  },
  mounted: function() {
	let userInfo = uni.getStorageSync('userInfo')
    this.uid = userInfo ? userInfo.uid : ''
	this.Info.integral = userInfo ? userInfo.integral : 0
	this.spreadUid = userInfo ? userInfo.spreadUid : 0
	if(this.spreadUid){
		this.code = this.spreadUid
	}
	this.getInfo();
  },
  methods: {
	goUserIntegral(){
		this.$yrouter.push("/subpackage/userIntegral/index");
	},
    goPoster() {
      this.$yrouter.push("/pages/user/promotion/Poster/index");
    },
    goCashRecord() {
      this.$yrouter.push("/pages/user/promotion/CashRecord/index");
    },
    goPromoterList() {
      this.$yrouter.push("/pages/user/promotion/PromoterList/index");
    },
    goCommissionDetails() {
      this.$yrouter.push("/pages/user/promotion/CommissionDetails/index");
    },
    goPromoterOrder() {
      this.$yrouter.push("/pages/user/promotion/PromoterOrder/index");
    },
	bind(){
		if(!this.code){
			uni.showToast({
				icon:'none',
				title:'请填写邀请推广码'
			})
			return
		}
		uni.showLoading({
			title:'正在提交中...'
		})
		bindSuperior({
			spread:this.code
		}).then(()=>{
			uni.showToast({
				icon:'success',
				title:'绑定成功!'
			})
		}).catch(err=>{
			console.log(err)
			uni.showToast({
				icon:'none',
				title:'绑定失败!'
			})
		}).finally(uni.hideLoading)
	},
	copy(){
		uni.setClipboardData({
			data: this.uid+'',
			success: () => {
				uni.showToast({
					icon:'none',
					title:'复制推广码成功！'
				})
			},
			fail(err){
				console.log(err)
			}
		})
	},
    getInfo: function() {
      let that = this;
      getSpreadInfo().then(
        res => {
          that.Info = Object.assign(this.Info,res.data);
        },
        function(err) {
          uni.showToast({
				title: err.msg || err.response.data.msg|| err.response.data.message,
				icon: 'none',
				duration: 2000
			});
        }
      );
    },
    toCash: function() {
      this.$yrouter.push({ path: "/pages/user/promotion/UserCash/index" });
    }
  }
};
</script>
