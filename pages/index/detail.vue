<template>
	<view class="index-detail-wrap">
		<image class="top-banner" mode="aspectFill" src="../../static/images/demo.jpeg"></image>
		<view class="pd-32 content-wrap">
			<!-- 搜索 -->
			<view class="top-search flex-wrap">
				<view class="search-bar">
					<input placeholder="请输入关键词" type="text" name="" id="">
				</view>
				<view  class="notice flex-wrap flex-vertical j-center a-center">
					<text>官方</text>
					<text>通知</text>
				</view>
			</view>
			<view class="title-text">
				主标题主标题主标题主标题主标题主标题
			</view>
			<view class="time-box">
				<view class="time1">
					2022年08月04日
				</view>
				<view class="time2">
					13:08:53
				</view>
			</view>
			<view class="content">
				内容
			</view>
		</view>
		<tabbar-com></tabbar-com>
	</view>
</template>

<script>
	import Nav from '@/utils/navigate.js'
	export default{
		methods:{
				
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
			background: #000c98;
			font-weight: bold;
			font-size: 26rpx;
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
			width: 100%;
			height: 100rpx;
			background: #000c98;
		}
		.tabbar-box{
			height:100rpx;
			box-sizing: border-box;
			padding: 10rpx 0;
			width: 100vw;
			background: #000c98;
			position: fixed;
			bottom: 0;
			.tabbar-item{
				flex: 1 1 0;
				border-right: 1px solid #fff;
				image{
					width: 150rpx;
					height: 40rpx;
				}
				.menu-text{
					margin-top: 10rpx;
					font-size: 24rpx;
					color: #fff;
				}
			}
		}
	}
</style>