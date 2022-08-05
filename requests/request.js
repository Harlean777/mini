import {
	_baseUrl
} from './base.js';
import { toast, hideLoading, alert } from '../utils/dialog.js';
import Nav from '../utils/navigate.js'
// 错误提示
const _tips = (msg) => {
	toast({
		msg:msg
	})
}
// 需要跳转到授权的操作
const needAuthorize = function(info){
	/**
	 * 错误信息码
	 * 1001	token未传入
	 * 1002	认证失败请联系管理员
	 * 1003	账号信息过期，请重新登录！
	 * 1005	未授权不能进行操作
	 * 
	 * 2000	Ok
	 * >2000	各种错误提示
	 */
	if(info.code === 1003 || info.code === 1005){
		alert({
			msg:info.msg,
			cb(){
				Nav.navigateTo({
					url:'../login/login'
				})
			}
		});
		return true;
	}
	else{
		return false;
	}
}
// 封装http方法
export function http(params = {}) {
	const token = uni.getStorageSync('token') || '';
	return new Promise(resolve => {
		const requestTask = uni.request({
			url: _baseUrl + params.url,
			header: Object.assign(
				{
					applyCode: 'sys100005',
					token:token || ''
				}, 
				params.header || {}
			),
			data:params.data,
			method: params.method,
			timeout:120000,
			success(res){
				if(res.statusCode === 200){
					if(res.data.code === 2000){
						resolve(res.data);
					}
					else{
						resolve(res.data);
						const hasNeed = needAuthorize(res);
						if(!hasNeed){
							_tips(res.data?.msg ?? '请求失败，请重试');
						}
					}
				}
			},
			fail(err){
				resolve('error');
				_tips('请求失败，请重试');
				setTimeout(() => {
					hideLoading();
				},60000)
			}
		})
	})
}
// 扩展get和post请求
http.post = function(url,data,configs) {
	return http(Object.assign({}, {
		method: 'POST',
		url,
		data
	}, configs))
}
http.get = function(url,data){
	return http(Object.assign({},{url,data}));
}
export default {
	http
}
