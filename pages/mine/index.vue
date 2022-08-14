<template>
	<view class="mine-cneter">
		<image class="top-banner" mode="aspectFill" :src="banner"></image>
		<view class="pd-32 content-wrap">
			<!-- 搜索 -->
			<!-- <view class="top-search flex-wrap">
				<view class="search-bar">
					<input confirm-type="search" @confirm="search"  placeholder="请输入关键词" type="text" name="" id="">
				</view>
				<view  class="notice flex-wrap flex-vertical j-center a-center">
					<text>官方</text>
					<text>通知</text>
					<span :class="{'redbot':messageList>0}"></span>
				</view>
			</view> -->
			<!-- 资料中心 -->
			<view class="banner-text">
				选手中心
			</view>
			<view class="box-cneter" v-if="is_participate === 1">
				<view class="cap flex-wrap a-center">
					<view @tap="selectCap('个人资料')" class="cap-item" :class="activeCap == '个人资料' ? 'curr' :''">
						个人资料
					</view>
					<view @tap="selectCap('作品信息')" class="cap-item " :class="activeCap == '作品信息' ? 'curr' :''">
						作品信息
					</view>
					<view @tap="selectCap('官方消息')" class="cap-item " :class="activeCap == '官方消息' ? 'curr' :''">
						官方消息
					</view>
				</view>
				<view v-if="activeCap == '个人资料'" class="content-center flex-wrap flex-vertical a-center">
					<view class="mine-cover">
						<image class="head-cover" :src="headImg" mode="aspectFill"></image>
						<!-- <view class="mine-info">
							
						</view> -->
					</view>
					<view class="content-item">
						<view class="">{{nickName}}</view>
					</view>
				</view>
				<view v-if="activeCap == '作品信息'" class="content-center no-border flex-wrap flex-vertical a-center">
						<view class="offical-info">
							<view class="work-item flex-wrap" v-for="item,index in myWorks" :key="index">
								<view class="left">
									<view class="">
										名称：<text>{{item.name}}</text>
									</view>
									<view class="">
										作品编号：<text>{{item.id}}</text>
									</view>
									<view class="">
										当前排名：<text>{{item.sort}}</text>
									</view>
									<view class="w-elli-2">
										作品详情：<text style="color:#3493e3" @click="preView(item.file_link)">{{item.file_link}}</text>
									</view>
									<view class="">
										作品状态：<text>{{switchStatus(item.status)}}</text>
									</view>
								</view>
								<view class="right">
									<img src="../../static/images/bg-img.png" alt="">
									<!-- <view class="tex-top">
										<view class="">
											002
										</view>
										<view class="">
											作品1
										</view>
										<view class="">
											作者
										</view>
										<view class="">
											人气值<text>10000</text>
										</view>
									</view> -->
								</view>
							</view>
						</view>
				</view>
				<view v-if="activeCap == '官方消息'" class="content-center flex-wrap flex-vertical a-center">
						<view class="offical-info">
							<view class="tip" v-for="item,index in messageList" :key="index">
								<view class="label" @click="messageHandle(item)">
									{{item.title}}
								</view>
								<!-- <view class="val">
									{{item.value}}
								</view> -->
							</view>
						</view>
				</view>
			</view>
			<view class="box-cneter tip-text" v-else>
				感谢关注本次大赛，你目前尚未报名成为选手，如需报名请点击下方菜单栏“报名须知”了解报名需求。
			</view>
		</view>
		
		<tabbar-com></tabbar-com>
	</view>
</template>

<script>
	import Api from '@/api/index.js';
	import Nav from '@/utils/navigate.js'
	const app = getApp()
	
	export default{
		data(){
			return{
				hasPhone:false,
				activeCap:'个人资料',
				btnItem:'我的',
				// showBtn:true,//当前显示按钮 false则显示结果
				banner: app.globalData.banner || '',
				officialInfo: [],
				headImg: uni.getStorageSync('avatarUrl'),
				messageList: [],
				nickName: uni.getStorageSync('nickName') || '',
				myWorks: [{name:'作品1'}],//用户自己的作品
				pageN: 1,
				pageS: 10,
				is_participate: uni.getStorageSync('is_participate'),
			}
		},
		onLoad() {
			// this.getSelfInfo();
		},
		methods:{
			//预览文件
			preView(url){
				console.log("url",url)
				uni.downloadFile({
				    url: url, 
				    success: (res) => {
				        if (res.statusCode === 200) {
				            // 使用uni.saveFile获取文件临时路径
				            uni.saveFile({
				                tempFilePath: res.tempFilePath,
				                success: function (save) {
									
									setTimeout(() => {
										var filePath = save.savedFilePath;
										uni.openDocument({  //新开页面打开文档，支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx。
											 filePath: filePath,
											showMenu: true,
											success: function (res) {
												 console.log('打开文档成功');
											},
											fail:function(res) {
												uni.showToast({
													icon: 'error',
													mask: true,
													// title: '文件已保存：' + res.savedFilePath, //保存路径
													title: '文件不支持查看' , 
													duration: 2000,
												});
											}
										});
									}, 2000)
				                }
				            })
				        }
				    }
				})
			},
			// 状态1正常0下架 后台默认筛选上架
			switchStatus(status){
				switch (status){
					case 0:
						return '下架';
					case 1:
						return '正常';
					default:
						return '';
				}
			},
			messageHandle(info){
				var item = encodeURIComponent(JSON.stringify(info));
				// this.workShow = true;
				Nav.navigateTo({
					url:'/pages/message/detail',
					query: {
						item
					}
				})
			},
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
			//获取消息
			getMessageList(){
				Api.apiGetMessage({
					openid: uni.getStorageSync('openid'),
					member_id: uni.getStorageSync('id'),
					page: this.pageN,
					page_size: this.pageS,
					sign: uni.getStorageSync('sign'),
				}).then(res => {
					if(res.code == 200){
						this.messageList = res.data.list;
						// app.globalData.messageList = res.data.list;
					}
				})
			},
			
			getMyworksList(){
				Api.apiGetProduction({
					race_track: '',
					page: 1,
					page_size: 10,
					openid: uni.getStorageSync('openid'),
					sign: uni.getStorageSync('sign'),
					sort:'',
					name:'',
					member_id:uni.getStorageSync('id'),
				}).then(res=>{
					console.log("resres",res)
					if(res.code == 200){
						this.myWorks = res.data.list
					}
				})
			},
				
			selectCap(text){
				this.activeCap = text
				if(text == '官方消息'){
					this.getMessageList()
				}
				if(text == '作品信息'){
					this.getMyworksList()
				}
			},
			// 
			selectBtn(text){
				console.log("text",text)
				this.btnItem = text
				// this.showBtn = true
			},
			showRes(){
				// this.showBtn = false
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
					color: #3493e3;
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
					padding: 0 24rpx;
					
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
				&:last-child{
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
				background:linear-gradient(90deg,#000c53 0%,#001a8c 30%,#001a8c 70%,#000c53 100%);
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
				// width: 100%;
				// padding: 24rpx;
				
				view{
					font-size: 24rpx;
					color: #666;
					// width: 200rpx;
					// text-align: center;
					height: 40rpx;
					line-height: 40rpx;
					// border-radius: 8rpx;
					margin-bottom: 12rpx;
					// &:nth-of-type(odd){
					// 	background: #6ab36b;
					// }
					// &:nth-of-type(even){
					// 	background: #ffba55;
					// }
				}
			}
			.offical-info{
				width: 100%;
				padding: 24rpx;
			}
			.work-item{
				width: 600rpx;
				height: 400rpx;
				border: 1px solid #3493e3;
				margin: 0 auto;
				border-radius: 8rpx;
				.left{
					width: 60%;
					font-size: 24rpx;
					color: #999;
					padding: 16rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					
					// view {
					// 	margin-bottom: 10rpx;
					// }
				}
				.right{
					width: 40%;
					height: 100%;
					font-size: 24rpx;
					color: #FFF;
					position: relative;
					
					img{
						width: 100%;
						height: 100%;
					}
					
					.tex-top{
						padding: 16rpx;
						position: absolute;
						width: 100%;
						height: 100%;
						top: 0;
						left: 0;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: center;
						padding-bottom: 60rpx;
						box-sizing: border-box;
					}
					
				}
			}
			.tip{
				width: 100%;
				font-size: 30rpx;
				color: #333;
				padding: 0rpx 24rpx;
				margin-bottom: 12rpx;
				
				view{
					// text-align: center;
					&.label{
						margin-bottom: 16rpx;
						color: #999;
						font-size: 28rpx;
					}
				}
			}
		}
		.no-border{
			border: none;
		}
		.tip-text{
			margin-top: 32rpx;
			font-size: 24rpx;
			color: #666;
		}
	}
</style>