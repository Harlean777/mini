<template>
	<view class="start-image">
	  <image src="../../static/images/start-page.jpeg" mode="aspectFill" class="image"></image>
	  <view class="btn" @click="skipHome">
		进入小程序
	  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onShow() {
			// uni.hideHomeButton()
		},
		methods: {
			  skipHome() {
			    uni.reLaunch({
			      url: '/pages/index/index'
			    })
			  },
		}
	}
</script>

<style>
	page,
	.start-image {
	  width: 100%;
	  height: 100%;
	  overflow: hidden;
	}
	
	.start-image {
	  position: relative;
	}
	
	.start-image .image {
	  width: 100%;
	  height: 100%;
	}
	
	.btn {
	  position: absolute;
	  left: 50%;
	  bottom: 164rpx;
	  margin-left: -315rpx;
	  width: 630rpx;
	  height: 96rpx;
	  border-radius: 48rpx;
	  line-height: 96rpx;
	  text-align: center;
	  background-color: #CF9947;
	  color: #fff;
	  font-size: 34rpx;
	}
</style>