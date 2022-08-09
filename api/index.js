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
// 获取参赛作品列表
function apiGetProduction(params = {}){
	return fly.post(`${BASEURL}/system/api/Applet/getworksList`, params);
}
// 获取人气排行列表
function apiGetPopularityList(params = {}) {
	return fly.post(`${BASEURL}/system/api/Applet/ranking`);
}
// 获取下载须知
function apiGetDocumentList(params = {}) {
	return fly.post(`${BASEURL}/system/api/Applet/getdocumentlist`);
}
// 获取轮播图背景图欢迎页等数据
function apiGetSlider(params = {}) {
	return fly.post(`${BASEURL}/system/api/Applet/getslider`);
}

export default {
	apiGetOpenid,
	apiGetNewsList,
	apiGetNewsDetail,
	apiGetProduction,
	apiGetPopularityList,
	apiGetDocumentList,
	apiGetSlider
}