<template>
	<view class="tabbar-box">
		<view class="tabbar-list flex-wrap" :class="{'iphonx':isIphoneX}">
			<view @tap="switchTab('index')" class="tabbar-item flex-wrap flex-vertical a-center j-center">
				<image class="menu-icon" src="../../static/images/menu-icon1.png" mode="widthFix"></image>
				<view class="menu-text">
					官方发布
				</view>
			</view>
			<view @tap="switchTab('registration')" class="tabbar-item flex-wrap flex-vertical a-center j-center">
				<image class="menu-icon" src="../../static/images/menu-icon2.png" mode="heightFix"></image>
				<view class="menu-text">
					参赛报名
				</view>
			</view>
			<view @tap="switchTab('works')" class="tabbar-item flex-wrap flex-vertical a-center j-center">
				<image class="menu-icon" src="../../static/images/menu-icon3.png" mode="heightFix"></image>
				<view class="menu-text">
					参赛作品
				</view>
			</view>
			<view @tap="switchTab('mine')" class="tabbar-item flex-wrap flex-vertical a-center j-center">
				<image class="menu-icon" src="../../static/images/menu-icon4.png" mode="heightFix"></image>
				<view class="menu-text">
					资料中心
				</view>
			</view>
		</view>
		<view class="tabbar-height" :class="{'iphonx':isIphoneX}"></view>
	</view>
	
</template>

<script>
	import Nav from '@/utils/navigate.js'
	import { isIphoneX } from '@/utils/common.js';
	export default{
		data() {
			return {
				isIphoneX: isIphoneX()
			}
		},
		methods:{
			switchTab(url){
				// console.log("11111111",this.$route.path)
				Nav.switchTab({
					url:`/pages/${url}/index`
				})
			}
		}
	}
</script>

<style lang="scss">
	.tabbar-box{
		.tabbar-height{
			position: relative;
			height: 180rpx;
			// bottom: calc(120rpx + env(safe-area-inset-bottom));
		}
		.tabbar-list{
			height:100rpx;
			box-sizing: border-box;
			padding: 10rpx 0;
			width: 100vw;
			background: #000c98;
			position: fixed;
			bottom: 0;
			z-index: 10;
			// bottom: env(safe-area-inset-bottom);
		}
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
			&:last-child{
				border: none;
			}
		}
	}
</style>