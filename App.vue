<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */

	@import '@/styles/common.scss';
	.pd-32{
		padding: 0 32rpx;
	}
	// iphonex 公共样式
	.iphonx {
		box-sizing: content-box !important;
		// padding-bottom: env(safe-area-inset-bottom);
		padding-bottom: 18px !important;
	}
</style>
