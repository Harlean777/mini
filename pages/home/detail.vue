<template>
	<view class="index-detail-wrap">
		<image class="top-banner" mode="aspectFill" :src="banner"></image>
		<view class="pd-32 content-wrap">
			<!-- 搜索 -->
			<!-- <view class="top-search flex-wrap">
				<view class="search-bar">
					<input placeholder="请输入关键词" type="text" name="" id="">
				</view>
				<view  class="notice flex-wrap flex-vertical j-center a-center">
					<text>官方</text>
					<text>通知</text>
					<span :class="{'redbot':messageList>0}"></span>
				</view>
			</view> -->
			<view class="title-text">
				{{content.mtitle}}
			</view>
			<view class="time-box">
				<view class="time1">
					{{formateTime(content.create_time)}}
				</view>
				<view class="time2">
					{{}}
				</view>
			</view>
			<view class="content">
				<rich-text :nodes="content.content"></rich-text>
			</view>
		</view>
		<tabbar-com></tabbar-com>
	</view>
</template>

<script>
	import Nav from '@/utils/navigate.js'
	import api from '@/api/index.js';
	import { getFullDate } from '@/utils/date.js';
	const app = getApp()
	
	export default{
		data() {
			return {
				content:{},
				banner: app.globalData.banner || '',
				// messageList: app.globalData.messageList || []
			}
		},
		onLoad(options){
			this.getNewsDetail(options.id)
		},
		methods:{
			formateTime(time){
				return getFullDate(new Date(time * 1000))
			},
			// 获取资讯详情
			getNewsDetail(id) {
				api.apiGetNewsDetail({
						id:id
					})
					.then(res => {
						if (res.code === 200) {
							this.content = res.data
						}
					})
					.catch(() => {
						//
					})
			},
				
			switchTab(url){
				Nav.reLaunch({
					url:`/pages/${url}/index`
				})
			}
		}
	}
</script>

<style lang="scss">
	.index-detail-wrap{
		.title-text{
			margin-top: 34rpx;
			width: 100%;
			box-sizing: border-box;
			padding: 0 20rpx;
			text-align: center;
			height: fit-content;
			padding: 20rpx;
			line-height: 1.5;
			color: #fff;
			border-radius: 10rpx;
			background:linear-gradient(90deg,#1d72ce 0%,#0019a6 30%,#0019a6 70%,#1d72ce 100%);
			font-weight: bold;
			font-size: 32rpx;
		}
		.time-box{
			margin: 24rpx 0;
			color: #8f8f8f;
			font-size: 24rpx;
			.time1{
				margin-bottom: 10rpx;
			}
		}
		.content{
			border-radius: 10rpx;
			padding: 16rpx;
			width: 100%;
			font-size: 28rpx;
			box-sizing: border-box;
		}
		// .tabbar-box{
		// 	height:100rpx;
		// 	box-sizing: border-box;
		// 	padding: 10rpx 0;
		// 	width: 100vw;
		// 	// background: #000c98;
		// 	background: #fff;
		// 	border-top: 1px solid #ddd;
		// 	position: fixed;
		// 	bottom: 0;
		// 	.tabbar-item{
		// 		flex: 1 1 0;
		// 		border-right: 1px solid #fff;
		// 		image{
		// 			width: 150rpx;
		// 			height: 40rpx;
		// 		}
		// 		.menu-text{
		// 			margin-top: 10rpx;
		// 			font-size: 24rpx;
		// 			color: #000;
		// 		}
		// 	}
		// }
	}
</style>