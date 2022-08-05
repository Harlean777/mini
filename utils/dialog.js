/**
 * 封装原生的弹窗
 * 问题：
 * showToast 和 showLoading 是底层同一个（按的小程序的设计），所以 showToast 和 showLoading 会相互覆盖，而 hideLoading 也会关闭 showToast 。
 */
// toast 弹窗
export function toast(params = {}) {
	const nParams = {
		icon: params.icon || 'none',
		title: params.title || params.msg,
		mask: params.mask || false,
		duration: params.duration || 1500,
	};
	// 兼容百度小程序，如果设置了image:'' ,即使icon:'none'，依然会变成icon:'success'的默认
	if(params.icon !== 'none' && params.icon != null && params.icon != ''){
		nParams.image = params.image || ''
	}
	uni.showToast(nParams);
}
// 隐藏 toast 弹窗
export function hideToast() {
	uni.hideToast();
}
// loading 弹窗
export function loading(params = {}) {
	uni.showLoading({
		title: params.title || (params.msg || '加载中...'),
		mask: params.mark || true
	});
}
// 隐藏 loading 弹窗
export function hideLoading() {
	uni.hideLoading();
}
// alert 弹窗
export function alert(params = {}) {
	uni.showModal({
		title: params.title || '',
		content: params.content || params.msg,
		showCancel: false,
		cancelText: '',
		confirmText: params.confirmText || '确定',
		confirmColor: params.confirmColor || '#3CC51F',
		complete: res => {
			if (res.confirm) {
				params.cb && typeof params.cb === 'function' && params.cb();
			}
		}
	})
}
// alert 弹窗
export function confirm(params = {}) {
	uni.showModal({
		title: params.title || '',
		content: params.content || params.msg,
		showCancel: true,
		cancelText: params.cancelText || '取消',
		cancelColor: params.cancelColor || '#000000',
		confirmText: params.confirmText || '确定',
		confirmColor: params.confirmColor || '#3CC51F',
		complete: res => {
			if (res.confirm) {
				params.sureCb && typeof params.sureCb === 'function' && params.sureCb();
			} else if (res.cancel) {
				params.cancelCb && typeof params.cancelCb === 'function' && params.cancelCb();
			}
		}
	})
}
export default {
	toast,
	hideToast,
	loading,
	hideLoading,
	alert,
	confirm
}
