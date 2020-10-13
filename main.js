import Vue from 'vue'
import App from './App'

// import router from "./router";
import store from "./store";
import schema from "async-validator";
import dialog from "./utils/dialog";
// import cookie from "@/utils/store/cookie";
import dayjs from 'dayjs'

// // import "@/assets/iconfont/iconfont";
// import "@/assets/iconfont/iconfont.css";
// // import "@/assets/js/media_750";
// // import "vue-ydui/dist/ydui.base.css";
// import "@/assets/css/base.less";
// import "@/assets/css/reset.less";
// import "@/assets/css/style.less";

import {
	parseRoute,
	_router
} from "@/utils";
import {
	VUE_APP_RESOURCES_URL,
	VUE_APP_API_URL,
	VUE_APP_IMAGE_URL
} from "@/config";

Vue.config.productionTip = false;
Vue.config.devtools = process.env.NODE_ENV !== "production";

Vue.prototype.$validator = function(rule) {
	return new schema(rule);
};

Vue.filter('toFixed',function(value, keepNumber=2){
	// console.log(value, '调用toFixed过滤器')
	if(typeof value !== 'number'){
		return '非数字'
	}
	value = +value
	return value.toFixed(keepNumber)
})
// 默认大于3个字显示*号
Vue.filter('nameFilter',function(value, keepNumber=3){
	// console.log(value, '调用toFixed过滤器')
	if(typeof value !== 'string'){
		return ''
	}
	return value.split('').reduce((pre,cur,i)=>{
		if(value.length>3 && i>keepNumber-1){ // 大于三位，则屏蔽后面的字符串
			pre+='*'
		} else if(value.length<=3 && i>0){	// 小于三位的，只保留第一位，后面全*号代替
			pre+='*'
		} else{
		    pre+=cur
		}
		return pre
	},'')
})

Vue.filter('timeFormat',function(value, option){
	// console.log(value, '调用timeFormat过滤器')
	if(typeof value == 'string' && value.length==10){ // 如果是unix时间戳
		value *= 1000
	}
	if(!dayjs(value).isValid()){
		return '非日期'
	}
	const mode = {
		'date':'YYYY-MM-DD',
		'time':'HH:mm:ss',
		'datetime':'YYYY-MM-DD HH:mm:ss'
	}[option] || 'YYYY-MM-DD HH:mm:ss'
	return dayjs(value).format(mode)
})

const showToast = uni.showToast
uni.showToast = function(...rest){  // 解决loadding 和 Toast 同时使用时，hideLoading bug
	setTimeout(()=>{
		showToast(...rest)
	})
}

// const CACHE_KEY = "clear_0.0.1";

// if (!cookie.has(CACHE_KEY)) {
// 	cookie.clearAll();
// 	cookie.set(CACHE_KEY, 1);
// }


Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store

const app = new Vue(App)

Vue.mixin({
	onLoad() {
		const {
			$mp
		} = this.$root
		this._route = parseRoute($mp)
		// this.$VUE_APP_RESOURCES_URL = VUE_APP_RESOURCES_URL;
		this._data.$VUE_APP_RESOURCES_URL = VUE_APP_RESOURCES_URL;
		// this._data.$img_url = VUE_APP_IMAGE_URL;
	},
	// beforeCreate(){
	// 	console.log('options:',this.$options)
	// 	this.$nextTick(()=>{
	// 		let imgKeys = Object.keys(this.$data).filter(v=> v.includes('$img_'))
	// 		imgKeys.map(url=> {
	// 			this[url] = VUE_APP_IMAGE_URL + this.$data[url]
	// 		})
	// 	})
		
	// },
	created(){
		// console.log('--当前的data值',this._data)
		let imgKeys = Object.keys(this._data).filter(v=> v.includes('$img_'))
		imgKeys.map(url=> {
			this[url] = VUE_APP_IMAGE_URL + this._data[url]
		})
	},
	onShow() {
		_router.app = this
		_router.currentRoute = this._route
	}
})

Object.defineProperty(Vue.prototype, '$yrouter', {
	get() {
		return _router
	}
})

Object.defineProperty(Vue.prototype, '$yroute', {
	get() {
		return this._route
	}
})

Vue.prototype.$VUE_APP_RESOURCES_URL = VUE_APP_RESOURCES_URL
Vue.prototype.$VUE_APP_API_URL = VUE_APP_API_URL

// #ifdef H5
// H5编译的代码
Vue.prototype.$deviceType = 'h5'
store.commit('updateDevicetype','h5')
// #endif

// #ifdef APP-PLUS
// App平台编译的代码
Vue.prototype.$deviceType = 'app'
store.commit('updateDevicetype','app')
Vue.prototype.$platform = uni.getSystemInfoSync().platform
// #endif

// #ifdef MP-WEIXIN
// 微信小程序编译的代码
Vue.prototype.$deviceType = 'routine'
store.commit('updateDevicetype','routine')
// #endif

// !!! ps  不建议在 template 中使用 $deviceType 去判断当前环境，很有可能出现 $deviceType 为 undefined 导致判断出错的问题，可以在 script 模块中正常使用
// 建议通过 store 去获取 $deviceType 可以保证 template 中取到的值有效
// import { mapState, mapMutations, mapActions } from 'vuex';
// computed: {
// 		...mapState(['$deviceType'])
// },

app.$mount()
