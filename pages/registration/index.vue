<template>
	<view class="wrap">
		<image class="top-banner" mode="aspectFill" :src="banner"></image>
		<view class="pd-32 content-wrap">
			<view class="top-search flex-wrap">
				<view class="search-bar">
					<input placeholder="请输入关键词" type="text" name="" id="">
				</view>
				<view  class="notice flex-wrap flex-vertical j-center a-center">
					<text>官方</text>
					<text>通知</text>
				</view>
			</view>
			<!-- 参赛报名 -->
			<view class="banner-text">
				参赛报名
			</view>
			<view class="top-nav">
				<view class="nav-tab" :class="{'curr':type === 1}" @click="handleSwtichTab(1)">报名须知</view>
				<view class="nav-tab" :class="{'curr':type === 2}" @click="handleSwtichTab(2)">资料下载</view>
			</view>
			<view class="content" v-if="type === 1">
				<!-- <rich-text nodes="content"></rich-text> -->
				<mp-html :content="content" />
			</view>
			<view v-if="type === 2">
				<view class="content-info">
					<view>说明文字</view>
				</view>
				<button type="primary" @click="downLoad" class="btn">下载文件报链接</button>
			</view>
		</view>
		<!--  -->
		<tabbar-com></tabbar-com>
	</view>
</template>

<script>
	import Api from '@/api/index.js';
	const app = getApp()
	
	export default {  
		data() {
			return {
				type: 1,
				content: '',
				banner: app.globalData.banner || ''
			};
		},
		onLoad() {
			this.fetchNotice();
		},
		
		onShow() {
			// uni.hideHomeButton()
		},
		methods: {
			// 切换项目
			handleSwtichTab(type) {
				if (this.type !== type) {
					this.type = type;
				}
			},
			downLoad(){
				//todo
			},
			fetchNotice(){
				Api.apiGetDocumentList().then(res=>{
					if(res.code === 200){
						let arr = res.data.list,
						index = res.data.list.findIndex(item => {
							 return item.key == 1
						 });
						this.content = arr[index].content
					}
					
				})
			}
		}
	}
</script>

<style lang="scss">
	.wrap{
		height: 100%;
		box-sizing: border-box;
		.top-nav{
			display: flex;
			margin-top: 24rpx;
			.nav-tab{
				font-size: 26rpx;
				color: #CCC;
				margin-bottom: 24rpx;
				position: relative;
				
				&.curr {
					color: #000c98;
					font-weight: bold;
					font-size: 30rpx;
				}
				
				&:first-child{
					padding-right: 24rpx;
					&::after{
						position: absolute;
						content: '';
						width: 1px;
						height: 30rpx;
						background: #a2a2a2;
						right: 0%;
						top: 50%;
						transform: translateY(-50%);
					}
					
				}
				&:last-child{
					padding-left: 24rpx;
				}
				
			}
		}
			
		.content,.content-info{
			// height: calc(100vh - 100rpx);
			// padding: 16rpx;
			width: 100%;
			border-radius: 16rpx;
			// background-color: #001A8C;
			box-sizing: border-box;
			font-size: 24rpx;
			color: #000;
		}
		.content-info{
			height: 500rpx;
			overflow-y: auto;
		}
		.btn{
			width: 50%;
			font-weight: bold;
			margin: 32rpx auto;
			background-color: #001A8C;
		}
	}
</style>