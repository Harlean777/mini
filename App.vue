<script>
	import dialog from '@/utils/dialog.js';
	import api from '@/api/index.js';
	export default {
		globalData: {
			banner: "",
			id: ""
		},
		onLaunch: function() {
			console.log('App Launch')
			uni.login({
				provider:'weixin',
				success: res => {
					console.log("resresres121",res)
					if (res.errMsg === 'login:ok') {
						this.getOpenid(res.code);
					}
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			getOpenid(code) {
				api.apiGetOpenid({
						code: code
					})
					.then(res => {
						console.log(res,'res=========')
						if (res.code === 200) {
							//存openid
							uni.setStorageSync('openid', res.data.openid);
							//存token
							// uni.setStorageSync('token',res.data.token)
						} else {
							dialog.toast({
								title: res.msg
							})
						}
					})
			},
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
