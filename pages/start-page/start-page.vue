<template>
	<view class="start-image">
	  <image :src="welcomeImg" mode="aspectFill" class="image"></image>
	  <view class="btn" @click="skipHome">
		进入小程序
	  </view>
	  <wp-phone :hasMobile.sync="hasMobile"></wp-phone>
	</view>
</template>

<script>
	import Api from '@/api/index.js';
	const app = getApp();
	
	export default {
		data() {
			return {
				welcomeImg: '',
				hasMobile: false,
			};
		},
		onShow() {
			// uni.hideHomeButton()
		},
		onLoad(){
			this.getBanner();
			if(uni.getStorageSync('phone')){
				this.hasMobile = true
			};
		},
		methods: {
			  skipHome() {
			    uni.reLaunch({
			      url: '/pages/home/index'
			    })
			  },
			  //获取图片
			  getBanner(){
			  	Api.apiGetSlider().then(res=>{
			  		if(res.code === 200){
			  			let arr = res.data,
			  			index = res.data.findIndex(item => {
			  				 return item.jump_type == 1
			  			 }),
						 index2 = res.data.findIndex(item => {
			  				 return item.jump_type == 2
			  			 });
			  			this.welcomeImg = arr[index].img;
						app.globalData.banner = arr[index2].img;
			  		}
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
	  margin-left: -160rpx;
	  width: 320rpx;
	  height: 96rpx;
	  border-radius: 48rpx;
	  line-height: 96rpx;
	  text-align: center;
	  background-color: #03b6fc;
	  color: #fff;
	  font-size: 34rpx;
	}
</style>