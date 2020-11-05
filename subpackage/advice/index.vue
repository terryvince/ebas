<style scoped lang="less">
	page{
		background: #F5F5F5;
		padding: 26rpx 0;
	}
	textarea{
		display: block;
		margin: 20rpx 20rpx 0;
		background: white;
		font-size: 28rpx;
		padding: 52rpx 31rpx;
		box-sizing: border-box;
		width: auto;
	}
</style>

<template>
	<view class="over-hide">
		<textarea class="boder-radius" v-model="text" placeholder="从多个角度评价,帮助更多想买的人~" />
		<view class="fix-bottom">
			<view @click="post()" class="post-btn bg-color-green">立即提交</view>
		</view>
	</view>	
</template>

<script>
	import {postAdvice} from '@/api/user.js'
	export default {
		data() {
			return {
				text:""
			};
		},
		methods:{
			post(){
				if(!this.text){
					uni.showToast({
						icon:'none',
						title:'请填写您的反馈建议'
					})
					return
				}
				uni.showLoading({
					title:'正在提交中...'
				})
				postAdvice({
					content:this.text
				}).then(()=>{
					uni.showToast({
						icon:'success',
						title:'提交成功!'
					})
				}).catch(err=>{
					console.log(err)
					uni.showToast({
						icon:'none',
						title:'提交失败!'
					})
				}).finally(uni.hideLoading)
			}
		}
	}
</script>
