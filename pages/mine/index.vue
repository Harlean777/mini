<template>
	<view class="mine-cneter">
		<image class="top-banner" mode="aspectFill" :src="banner"></image>
		<view class="pd-32 content-wrap">
			<!-- 搜索 -->
			<view class="top-search flex-wrap">
				<view class="search-bar">
					<input confirm-type="search" @confirm="search"  placeholder="请输入关键词" type="text" name="" id="">
				</view>
				<view  class="notice flex-wrap flex-vertical j-center a-center">
					<text>官方</text>
					<text>通知</text>
					<span :class="{'redbot':messageList>0}"></span>
				</view>
			</view>
			<!-- 资料中心 -->
			<view class="banner-text">
				资料中心
			</view>
			<view class="box-cneter">
				<view class="cap flex-wrap a-center">
					<view @tap="selectCap('个人资料')" class="cap-item" :class="activeCap == '个人资料' ? 'curr' :''">
						个人资料
					</view>
					<view @tap="selectCap('联系官方')" class="cap-item " :class="activeCap == '联系官方' ? 'curr' :''">
						联系官方
					</view>
				</view>
				<view v-if="activeCap == '个人资料'" class="content-center flex-wrap flex-vertical a-center">
					<view class="mine-cover">
						<image class="head-cover" :src="headImg" mode="aspectFill"></image>
						<!-- <view class="mine-info">
							
						</view> -->
					</view>
					<view class="btn-box flex-wrap">
						<view @tap="selectBtn('我的')" class="btn-item btn-item1" :class="btnItem == '我的' ? 'curr':''">
							我的
						</view>
						<view  @tap="selectBtn('官方推送消息')" class="btn-item btn-item2" :class="btnItem == '官方推送消息' ? 'curr':''">
							官方推送消息
						</view>
					</view>
					<view v-if="showBtn" class="">
						<view v-if="btnItem === '我的'" class="content-item content-item1">
							<view class="">官方审核通过</view>
							<view class="">查看上传结果</view>
							<view class="">作品编号</view>
							<view class="">作品排名</view>
						</view>
						<view v-if="btnItem === '官方推送消息'" class="content-item content-item2">
							<view class="">初赛消息</view>
							<view class="">辅导期通知</view>
							<view class="">决赛通知</view>
						</view>
					</view>
					
					
				</view>
				<view v-if="activeCap == '联系官方'" class="content-center flex-wrap flex-vertical a-center">
						<view class="offical-info">
							<view class="tip" v-for="item,index in officialInfo" :key="i">
								<view class="label">
									{{item.title}}
								</view>
								<view class="val">
									{{item.value}}
								</view>
							</view>
								<!-- <view class="tip">
									<view class="label">
										官方企业报名联系人：
									</view>
									<view class="val">
										官方企业报名联系人
									</view>
								</view>
								<view class="tip">
									<view class="label">
										官方组委会电话：
									</view>
									<view class="val">
										官方组委会电话
									</view>
								</view> -->
							
						</view>
				</view>
			</view>
		</view>
		
		<tabbar-com></tabbar-com>
	</view>
</template>

<script>
	import Api from '@/api/index.js';
	const app = getApp()
	
	export default{
		data(){
			return{
				hasPhone:false,
				activeCap:'个人资料',
				btnItem:'我的',
				showBtn:true,//当前显示按钮 false则显示结果
				banner: app.globalData.banner || '',
				officialInfo: [],
				headImg: uni.getStorageSync('avatarUrl'),
				messageList: app.globalData.messageList || []
			}
		},
		onLoad() {
			// this.getSelfInfo();
		},
		methods:{
			//获取官方资料
			getOfficial(){
				Api.apiGetOfficial({
					openid:uni.getStorageSync('openid'),
					sign:uni.getStorageSync('sign'),
					type:1
				}).then(res=>{
					if(res.code === 200){
						this.officialInfo = res.data
					}
				})
			},
				
			selectCap(text){
				this.activeCap = text
				if(text == '联系官方'){
					this.getOfficial()
				}
			},
			// 
			selectBtn(text){
				console.log("text",text)
				this.btnItem = text
				this.showBtn = true
			},
			showRes(){
				this.showBtn = false
			},
			search(){
				
			}
		}
	}
</script>

<style lang="scss">
	.mine-cneter{
		.box-cneter{
			padding-top: 24rpx;
		}
		.cap{
			.cap-item{
				font-size: 26rpx;
				font-weight: 400;
				color: #CCCCCC;
				position: relative;
				&.curr{
					font-size: 30rpx;
					color: #000c98;
					font-weight: bold;
				}
				&:first-of-type{
					padding-right: 24rpx;
					&::after{
						position: absolute;
						content: '';
						width: 1px;
						height: 30rpx;
						background: #a2a2a2;
						right: 0%;
						top: 50%;
						transform: translateY(-50%);
					}
				}
				&:nth-of-type(2){
					padding-left: 24rpx;
				}
			}
		}
		.content-center{
			border-radius: 10rpx;
			background: #fff;
			width: 100%;
			margin-top: 24rpx;
			border: 1px solid #001a8c;
			min-height: 600rpx;
			.mine-cover{
				width: 200rpx;
				height: 200rpx;
				position: relative;
				border-radius: 10rpx;
				overflow: hidden;
				margin: 24rpx 0rpx;
				.head-cover{
					width: 100%;
					height: 100%;
				}
				.mine-info{
					height: 50rpx;
					width: 200rpx;
					bottom: 0rpx;
					background: rgba(3, 78, 205, 0.2);
					position: absolute;
					bottom: 0%;
					left: 0%;
				}
			}
			.btn-box{
				width: 96%;
				height: 70rpx;
				background: #5da9d8;
				border-radius: 10rpx;
				.btn-item{
					width: 50%;
					text-align: center;
					line-height: 70rpx;
					color: #fff;
					font-size: 24rpx;
					position: relative;
					&.curr{
						font-weight: bold;
						font-size: 30rpx;
					}
					&:first-of-type{
						&::after{
							position: absolute;
							content: '';
							width: 1rpx;
							height: 40rpx;
							background: #fff;
							top: 50%;
							right: 0rpx;
							transform: translateY(-50%);
						}
					}
				}
			}
			.content-item{
				padding: 100rpx 0rpx;
				view{
					font-size: 24rpx;
					color: #666;
					width: 200rpx;
					text-align: center;
					height: 60rpx;
					line-height: 60rpx;
					border-radius: 8rpx;
					margin-bottom: 24rpx;
					// &:nth-of-type(odd){
					// 	background: #6ab36b;
					// }
					// &:nth-of-type(even){
					// 	background: #ffba55;
					// }
				}
			}
			.offical-info{
				padding: 80rpx 0rpx;
			}
			.tip{
				width: 100%;
				font-size: 26rpx;
				// color: #fff;
				padding: 0rpx 24rpx;
				margin-bottom: 60rpx;
				view{
					text-align: center;
					&.label{
						margin-bottom: 30rpx;
					}
				}
			}
		}
	}
</style>