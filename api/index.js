import { BASEURL } from '@/requests/base.js';
import { fly } from '@/requests/index.js';

// 获取openid
function apiGetOpenid(params = {}) {
	return fly.post(`${BASEURL}/user/api/wx/getopenid`, params);
}
// 获取新闻或者公告列表
function apiGetNewsList(params = {}) {
	return fly.post(`${BASEURL}/system/api/Applet/getnewList`, params);
}
// 获取新闻详情
function apiGetNewsDetail(params = {}) {
	return fly.post(`${BASEURL}/system/api/Applet/getnewinfo`, params);
}

export default {
	apiGetOpenid,
	apiGetNewsList,
	apiGetNewsDetail
}