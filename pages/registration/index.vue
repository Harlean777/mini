<template>
	<view class="wrap">
		<image class="top-banner" mode="aspectFill" :src="banner"></image>
		<view class="pd-32 content-wrap">
			<!-- <view class="top-search flex-wrap">
				<view class="search-bar">
					<input placeholder="请输入关键词" type="text" name="" id="">
				</view>
				<view  class="notice flex-wrap flex-vertical j-center a-center">
					<text>官方</text>
					<text>通知</text>
					<span :class="{'redbot':messageList>0}"></span>
				</view>
			</view> -->
			<!-- 参赛报名 -->
			<view class="banner-text">
				参赛报名
			</view>
			<view class="top-nav">
				<view class="nav-tab" :class="{'curr':type === 1}" @click="handleSwtichTab(1)">报名须知</view>
				<view class="nav-tab" :class="{'curr':type === 2}" @click="handleSwtichTab(2)">资料下载</view>
			</view>
			<view class="content" v-if="type === 1">
				<!-- <rich-text nodes="content"></rich-text> -->
				<mp-html :content="content" />
				<view class="link" @click="handleSwtichTab(2)">资料下载</view>
			</view>
			<view v-if="type === 2">
				<view class="content-info">
					<mp-html :content="content2" />
				</view>
				<button type="primary" @click="downLoad(officialInfo[0].value)" class="btn">
					下载文件包链接
				</button>
			</view>
		</view>
		<!--  -->
		<tabbar-com></tabbar-com>
	</view>
</template>

<script>
	import Api from '@/api/index.js';
	const app = getApp()
	
	export default {  
		data() {
			return {
				type: 1,
				content: '',
				content2: '',
				banner: app.globalData.banner || '',
				officialInfo: [],
				// messageList: app.globalData.messageList || []
			};
		},
		onLoad() {
			this.fetchNotice();
		},
		
		onShow() {
			// uni.hideHomeButton()
		},
		methods: {
			// 切换项目
			handleSwtichTab(type) {
				if (this.type !== type) {
					this.type = type;
					if(this.type == 2){
						this.getOfficial()
					}
				}
			},
			downLoad(url){
				//todo
				
			},
			// 下载附件
			downLoad(enclosure){
				var that = this
				//加载框动画
				uni.showLoading({title: '正在下载……'});
				// console.log(that.hostUrl + '/uploads'+ enclosure)
				uni.downloadFile({
					url: enclosure,//下载地址接口返回
					success: (data) => {
						console.log('打印data',data)
						if (data.statusCode === 200) {
							//隐藏加载框
							uni.hideLoading();
							//文件保存到本地
							uni.saveFile({
								tempFilePath: data.tempFilePath, //临时路径
								success: function(res) {
									console.log('打印res',res)
									uni.showToast({
										icon: 'success',
										mask: true,
										// title: '文件已保存：' + res.savedFilePath, //保存路径
										title: '下载成功' , 
										duration: 2000,
									});
												
							//自动打开文档查看
							setTimeout(() => {
								var filePath = res.savedFilePath;
								// var filePath = 'https://dingcang888.oss-cn-hangzhou.aliyuncs.com/applet/file/2022_08/9e43907a8b366462404e5cf7274cbc18.pptx'
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
					});
				}
				},
				fail: (err) => {
					console.log(err);
					uni.showToast({
						icon: 'none',
						mask: true,
						title: '文件下载失败',
					});
				},
			});
			},

			//获取官方资料
			getOfficial(){
				Api.apiGetOfficial({
					openid:uni.getStorageSync('openid'),
					sign:uni.getStorageSync('sign'),
					type:2
				}).then(res=>{
					if(res.code === 200){
						this.officialInfo = res.data
						console.log("this.officialInfo",this.officialInfo)
					}
				})
			},
			fetchNotice(){
				Api.apiGetDocumentList().then(res=>{
					if(res.code === 200){
						let arr = res.data.list,
						index = res.data.list.findIndex(item => {
							return item.key == 1
						}),
						index2 = res.data.list.findIndex(item => {
							return item.key == 5
						});
						this.content = arr[index].content;
						this.content2 = arr[index2].content;
					}
					
				})
			}
		}
	}
</script>

<style lang="scss">
	.wrap{
		height: 100%;
		box-sizing: border-box;
		.top-nav{
			display: flex;
			margin-top: 24rpx;
			.nav-tab{
				font-size: 26rpx;
				color: #CCC;
				margin-bottom: 24rpx;
				position: relative;
				
				&.curr {
					color: #3493e3;
					font-weight: bold;
					font-size: 30rpx;
				}
				
				&:first-child{
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
				&:last-child{
					padding-left: 24rpx;
				}
				
			}
		}
			
		.content,.content-info{
			// height: calc(100vh - 100rpx);
			// padding: 16rpx;
			width: 100%;
			border-radius: 16rpx;
			// background-color: #001A8C;
			box-sizing: border-box;
			font-size: 24rpx;
			color: #000;
		}
		.content-info{
			height: 500rpx;
			overflow-y: auto;
		}
		.btn{
			width: 50%;
			font-weight: bold;
			margin: 32rpx auto;
			background-color: #3594e3;
			font-size: 30rpx;
		}
	}
	.link{
		font-size: 32rpx;
		color: #3493e3;
	}
</style>