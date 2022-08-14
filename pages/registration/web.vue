<template>
	<view class="webview-contain">
		<!-- <web-view class="web-view" :src="webUrl"></web-view> -->
		<video :src="webUrl" class="uni-video-popup-contain" controls controlslist="nodownload noremoteplayback" disablePictureInPicture webkit-playsinline playsinline x5-playsinline></video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webUrl:''
			};
		},
		onLoad(options){
			this.webUrl = options.enclosure;
		}
	}
</script>

<style lang="scss">
.webview-contain,.web-view{
	width: 100%;
	// min-height: 100%;
	padding-top: 32rpx;
	text-align: center;
}
</style>
