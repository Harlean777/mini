<template>
	<view class="login-wrapper" capture-catch:touchmove="preventdefault" v-if="!hasLogin">
		<view class="phone-container">
			<!-- <view class="author-contain">
				<image src="../../static/images" mode="aspectFill" class="author-image"></image>
			</view> -->
			<view class="author-cap">{{setupTitle}}\n申请获得以下权限</view>
			<view class="author-desc">获得你的公开信息(昵称、头像等)</view>
			<button hover-class="none" lang="zh_CN" class="author-btn flex-wrap j-center a-center" @click="getUserInfo">
				<image class="image" src="../../static/images/icon_wx.png" mode="aspectFill"></image>
				微信登录
			</button>
			<!-- <button hover-class="none" lang="zh_CN" class="author-btn flex-wrap j-center a-center"  open-type="getUserInfo"  @getuserinfo="getUserInfo2" >
				<image class="image" src="../../static/images/icon_wx.png" mode="aspectFill"></image>
				微信登录
			</button> -->
			
		</view>
	</view>
</template>

<script>
	import dialog from '@/utils/dialog.js';
	import Api from '@/api/index.js';
	const app = getApp()
	// import {
	// 	mapState,
	// 	mapActions
	// } from 'vuex';
	export default {
		props: {
			hasLogin: {
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
			//获取个人资料
			getSelfInfo(){
				Api.apiGetSelfInfo({
					openid:uni.getStorageSync('openid'),
					nickname:uni.getStorageSync('nickName'),
					headimg:uni.getStorageSync('avatarUrl'),
					mobile:uni.getStorageSync('phone'),
				}).then(res=>{
					if(res.code === 200){
						uni.setStorageSync('sign',res.data.sign);
						uni.setStorageSync('id',res.data.member_id);
						uni.setStorageSync('is_participate',res.data.is_participate);
						app.globalData.id = res.data.member_id;
					}
				})
			},
			// 关闭弹窗
			closePhone() {
				// this.phoneVisible = false;
			},
			// 用户信息
			getUserInfo(context, info) {
				uni.getUserProfile({
					desc:'获取你的昵称、头像、地区及性别',
					success: (res) => {
						console.log('getUserInfo', res);
						if(res.errMsg === "getUserProfile:ok"){
							 uni.setStorageSync('nickName',res.userInfo.nickName);
							 uni.setStorageSync('avatarUrl',res.userInfo.avatarUrl);
							this.$emit('update:hasLogin',true)
							console.log("this.hasLogin",this.hasLogin)
							this.getSelfInfo()
						}
						// api.
				   },
				   fail() {
						dialog.toast({
						   title: '您拒绝了请求,不能正常使用小程序',
						   icon: 'error',
						   duration: 2000
						})
				   		return;
				   }
				 });
			},
			getUserInfo2(e){
				console.log("e",e)
			}
		},
		computed:{
			// ...mapState(['setupTitle'])
		}
	}
</script>

<style lang="scss">
	.login-wrapper {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		background-color: rgba(0,0,0,0.8);
		// padding: 64rpx 35rpx 0;
		// text-align: center;
		z-index: 1000;
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
