import { cancelOrder, takeOrder, delOrder, payOrder } from "@/api/order";
import dialog from "@/utils/dialog";
import { weappPay } from "@/libs/wechat";
import {
	_router
} from "@/utils";

export function cancelOrderHandle(orderId) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: '提示',
      content: '确认取消该订单?',
      success(res) {
        if (res.confirm) {
          cancelOrder(orderId)
            .then(res => {
              uni.showToast({
                title: '取消成功', icon: 'success', duration: 2000
              });
              resolve(res);
            })
            .catch(err => {
              uni.showToast({
                title: '取消失败', icon: 'none', duration: 2000
              });
              reject(err);
            });
        } else if (res.cancel) {
        }
      }
    })
  });
}

export function takeOrderHandle(orderId) {
  return new Promise((resolve, reject) => {
    takeOrder(orderId)
      .then(res => {
        uni.showToast({
          title: '收货成功', icon: 'success', duration: 2000
        });
        resolve(res);
      })
      .catch(err => {
        uni.showToast({
          title: '收货失败', icon: 'none', duration: 2000
        });
        reject(err);
      });
  });
}

export function delOrderHandle(orderId) {
  return new Promise((resolve, reject) => {
    dialog.confirm({
      mes: "确认删除该订单?",
      opts() {
        delOrder(orderId)
          .then(res => {
            uni.showToast({
              title: '删除成功', icon: 'success', duration: 2000
            });
            resolve(res);
          })
          .catch(err => {
            uni.showToast({
              title: '删除失败', icon: 'none', duration: 2000
            });
            reject(err);
          });
      }
    });
  });
}

export function payOrderHandle(orderId, type, from,payPrice) {
  console.log(orderId, type, from, '支付')
  return new Promise((resolve, reject) => {
    uni.showLoading({ title: '加载中' })
    payOrder(orderId, type, from)
      .then(res => {
        const data = res.data;
        uni.hideLoading()
        switch (data.status) {
          case "WECHAT_H5_PAY":
            location.replace(data.result.jsConfig.mweb_url);
            reject(data);
            break;
          case "ORDER_EXIST":
          case "EXTEND_ORDER":
          case "PAY_ERROR":
          case "PAY_DEFICIENCY":
            uni.showToast({ title: res.msg, icon: 'none', duration: 2000 });
            reject(data);
            break;
          case "SUCCESS":
            uni.showToast({ title: res.msg, icon: 'none', duration: 2000 });
            resolve(data);
            break;
          case "WECHAT_PAY":
		    // #ifdef MP
            weappPay(data.result.jsConfig).then(res => {
              resolve(data);
            });
			// #endif
			// 公众号支付
			// #ifdef H5
			const {nonceStr,paySign,signType,timestamp} = data.result.jsConfig
			const packagStr = data.result.jsConfig.package
			window.wxJs.chooseWXPay({
				nonceStr,
				package:packagStr, // 保留关键字，不允许同名变量
				paySign,
				signType,
				timestamp,
				success(ress){
					console.log('支付成功:',ress)
					_router.replace({
						path: "/pages/order/PaymentStatus/index",
						query: {
							orderNo: data.result.orderId,
							createTime: res.time,
							payMoney: payPrice
						}
					});
				},
				fail(err){
					console.error('支付失败:', err)
					_router.replace({
						path: "/pages/order/OrderDetails/index",
						query: {
							id: data.result.orderId
						}
					});
				}
			})
			// #endif
            break;
          case "WECHAT_APP_PAY":
            weappPay(data.result.jsConfig).then(res => {
              resolve(data);
            });
            break;
        }
      })
      .catch(err => {
		console.log(err)
        uni.hideLoading()
        uni.showToast({
          title: '订单支付失败', icon: 'none', duration: 2000
        });
      });
  });
}
