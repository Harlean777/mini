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
	return fly.post(`${BASEURL}/system/api/Applet/ranking`,params);
}
// 获取下载须知
function apiGetDocumentList(params = {}) {
	return fly.post(`${BASEURL}/system/api/Applet/getdocumentlist`,params);
}
// 获取轮播图背景图欢迎页等数据
function apiGetSlider(params) {
	return fly.get(`${BASEURL}/system/api/Applet/getslider`,params);
}
// 获取个人信息
function apiGetSelfInfo(params = {}){
	return fly.post(`${BASEURL}/user/api/user/getuserinfo`,params)
}
// 获取官方信息
function apiGetOfficial(params = {}){
	return fly.post(`${BASEURL}/system/api/Applet/getofficial`,params)
}
//投票
function apiVote(params ={}){
	return fly.post(`${BASEURL}/user/api/user/worksvote`,params)
}
//获取用户消息
function apiGetMessage(params ={}){
	return fly.post(`${BASEURL}/system/api/Applet/getwxmsg`,params)
}
//获取用户电话号码
function apiGetPhone(params ={}){
	return fly.post(`${BASEURL}/user/api/wx/getmemberphone`,params)
} 
//获取作品详情
function apiGetWorkdetail(params ={}){
	return fly.post(`${BASEURL}/system/api/Applet/getworkdetail`,params)
}
export default {
	apiGetOpenid,
	apiGetNewsList,
	apiGetNewsDetail,
	apiGetProduction,
	apiGetPopularityList,
	apiGetDocumentList,
	apiGetSlider,
	apiGetSelfInfo,
	apiGetOfficial,
	apiVote,
	apiGetMessage,
	apiGetPhone,
	apiGetWorkdetail
}