const Fly = require('./flyio.min.js');
const qs = require('./qs.js');
const fly = new Fly();
import dialog from '@/utils/dialog.js';	
fly.config.timeout = 50000;
fly.config.headers = {
	// 'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
	'Content-Type':'application/json',
}
const stopPullDownRefresh = function(){
	setTimeout(() => {
		uni.stopPullDownRefresh && uni.stopPullDownRefresh();
	},100);
}
//添加请求拦截器
fly.interceptors.request.use((request) => {
	//可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
	// if(request.method === 'POST'){
	// 	request.body = qs.stringify(request.body);
	// }
	// if(request.method === 'GET'){
	// 	request.body = qs.stringify(request.body);
	// }
	const token = uni.getStorageSync('token') || '';
	if (token) {
      request.headers['token'] = token;
    }
	// request.headers['applyCode'] = 'sys100002';
	return request;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
	(response) => {
		stopPullDownRefresh();
		//只将请求结果的data字段返回
		return response.data
	},
	(err) => {
		//发生网络错误后会走到这里
		stopPullDownRefresh();
		dialog.toast({
			icon:'none',
			title:'请求失败，请重试'
		})
	}
)
export {
	fly
}
export default{
	fly
}