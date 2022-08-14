<script>
	import dialog from '@/utils/dialog.js';
	import api from '@/api/index.js';
	export default {
		globalData: {
			banner: "",
			id: "",
			messageList: []
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
		onShow: function () {
			console.log('App Show')
			let updateManager = uni.getUpdateManager();
			if (!updateManager) {
				return
			} else {
				//新版本更新
				if (uni.canIUse('getUpdateManager')) {
					//判断当前微信版本是否支持版本更新
					updateManager.onCheckForUpdate(function(res) {
						if (res.hasUpdate) {
							// 请求完新版本信息的回调
							updateManager.onUpdateReady(function() {
								uni.showModal({
									title: '更新提示',
									content: '新版本已经准备好，是否重启应用？',
									success: function(res) {
										if (res.confirm) {
											// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
											updateManager.applyUpdate();
										}
									},
								});
							});
							updateManager.onUpdateFailed(function() {
								uni.showModal({
									// 新的版本下载失败
									title: '已经有新版本了哟~',
									content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
								});
							});
						} else {}
					});
				} else {
					uni.showModal({
						// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
						title: '提示',
						content: '当前微信版本过低，部分功能无法使用，请升级到最新微信版本后重试。',
					});
				}

			}

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
