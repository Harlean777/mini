<template>
	<view class="login-wrapper" capture-catch:touchmove="preventdefault" v-if="!hasMobile">
		<view class="phone-container">
			<view class="author-cap">{{setupTitle}}申请获得以下权限</view>
			<view class="author-desc">获得你的电话号码</view>
			<button class="author-btn flex-wrap j-center a-center" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
				<image class="image" src="../../static/images/icon_wx.png" mode="aspectFill"></image>
				微信登录
			</button>
		</view>
	</view>
</template>

<script>
	import dialog from '@/utils/dialog.js'; 
	import Api from '@/api/index.js';
	export default {
		props: {
			hasMobile: {
				default: false
			}
		},
		onload(){
			// this.phoneVisible =true
		},
		data() {
			return {
				setupTitle: '成都新经济人才技能直播大赛',
				// phoneVisible: false,
			};
		},
		methods: {
			// 关闭弹窗
			closePhone() {
				// this.phoneVisible = false;
			},
			getPhoneNumber(e){
				console.log(e);
				if(e.detail.errMsg === 'getPhoneNumber:ok'){
					// const js_code = await dispatch('getLoginCode');
					const phoneEnc = {
						// code: e.detail.encryptedData,
						// iv: e.detail.iv,
						code: e.detail.code,
					}
					console.log(phoneEnc,'phoneEnc');
					this.$emit('update:hasMobile',true)
					Api.apiGetPhone({
							// openid: uni.getStorageSync('openid'),
							...phoneEnc
						})
						.then(res => {
							if (res.code === 200) {
								uni.setStorageSync('phone',res.data.phoneNumber);
								// resolve(true)
							} else {
								dialog.toast({
									title: '请求失败请重试'
								});
								// resolve(false);
							}
						})
						.catch(() => {
							// resolve(false);
						})
				}
			}
		},
		computed:{
		}
	}
</script>

<style lang="scss">
	.login-wrapper {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		min-height: 100%;
		background-color: rgba(0,0,0,0.8);
		// padding: 64rpx 35rpx 0;
		// text-align: center;
		.phone-container{
			width: 620rpx;
			height: auto;
			padding: 4rpx;
			display: flex;
			align-items: center;
			flex-flow: column;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			background: #FFFFFF;
			border-radius: 20rpx;
			z-index: 5;
		}
	}

	// .author-contain {
	// 	width: 600rpx;
	// 	height: 600rpx;
	// 	margin: 0 auto;

	// 	.author-image {
	// 		display: block;
	// 		width: 100%;
	// 		height: 100%;
	// 	}
	// }

	.author-cap {
		font-size: 34rpx;
		color: #333333;
		margin-top: 47rpx;
		line-height: 1em;
		padding: 0 16rpx;
	}

	.author-desc {
		margin-top: 20rpx;
		font-size: 28rpx;
		color: #999999;
		line-height: 1em;
	}

	.author-btn {
		width: 500rpx;
		height: 82rpx;
		text-align: center;
		margin-top: 56rpx;
		margin-bottom: 47rpx;
		background-color: #fff;
		font-weight: 500;
		color: #48B34F;
		font-size: 36rpx;
		border-radius: 41rpx;
		border: 1rpx solid #BEBEBE;
		box-shadow: none;
		.image{
			width: 45rpx;
			height: 37rpx;
			margin-right: 20rpx;
		}
	}
	.close-phone-btn{
		width: 54rpx;
		height: 54rpx;
		position: absolute;
		bottom: 10%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
</style>
