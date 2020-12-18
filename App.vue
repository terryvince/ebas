<script>
	export default {
		onLaunch: function(options) {
			uni.loadFontFace({
				family: 'HanSans',
				  source: 'url("https://res.sdebs.com/HanSans.ttf")',
				  success() {
				      console.log('加载字体成功！')
				  },
				  fail(err) {
				  	console.error(err)
				  }
			})
			// #ifdef MP
			const updateManager = uni.getUpdateManager();
			updateManager.onCheckForUpdate(function (res) {
			  // 请求完新版本信息的回调
			  console.log('是否有版本更新：', res.hasUpdate)
			})
		
			updateManager.onUpdateReady(function () {
			  uni.showModal({
				title: '更新提示',
				content: '新版本已经准备好，是否重启应用？',
				success(res) {
				  if (res.confirm) {
					// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
					updateManager.applyUpdate()
				  }
				}
			  })
			})
		
			updateManager.onUpdateFailed(function (err) {
			  // 新版本下载失败
			  uni.showToast({
				title: '更新版本失败！',
				icon: 'none'
			  })
			  console.error(err)
			})
			// #endif
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {

			console.log('App Hide')
		}
	}
</script>


<style lang="less">
	/*每个页面公共css */
	@import "animate.css";
	@import "./assets/iconfont/iconfont.css";
	@import "./assets/iconfont/iconfont1.css";
	@import "./assets/css/base.less";
	@import "./assets/css/reset.less";
	@import "./assets/css/style.less";
	@import "./assets/css/common.less";
	@import "./assets/css/flex.less";
	@import "./assets/css/public.less";
</style>
