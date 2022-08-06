<template>
	<view class="wrap">
		<view class="top-nav">
			<view class="nav-tab" :class="{'curr':type === 1}" @click="handleSwtichTab(1)">报名须知</view>
			<view class="nav-tab" :class="{'curr':type === 2}" @click="handleSwtichTab(2)">资料下载</view>
		</view>
		<view class="content" v-if="type === 1">
			<view>内容</view>
		</view>
		<view v-if="type === 2">
			<view class="content-info">
				<view>说明文字</view>
			</view>
			<button type="primary" @click="downLoad" class="btn">下载文件报链接</button>
		</view>
		
	</view>
</template>

<script>
	export default {  
		data() {
			return {
				type: 1,
			};
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
			
			.nav-tab{
				font-size: 28rpx;
				color: #666;
				margin-bottom: 32rpx;
				
				&.curr {
					color: #001A8C;
					font-weight: bold;
					font-size: 32rpx;
				}
				
				&:first-child{
					border-right: 2rpx solid #666;
					padding-right: 40rpx;
					
				}
				&:last-child{
					padding-left: 40rpx;
				}
				
			}
		}
			
		.content,.content-info{
			height: calc(100vh - 100rpx);
			padding: 16rpx;
			width: 100%;
			border-radius: 16rpx;
			background-color: #001A8C;
			box-sizing: border-box;
			font-size: 28rpx;
			color: #fff;
		}
		.content-info{
			height: calc(100vh - 200rpx);
		}
		.btn{
			width: 50%;
			font-weight: bold;
			margin: 32rpx auto;
			background-color: #001A8C;
		}
	}
</style>