<template>
	<view class="wrap-work">
		<view class="content">
			<view class="top-title">
				<view class="img">
					<!-- <image :src="currentWork.cover" mode="aspectFill"></image> -->
					<image src="../../static/images/bg-img.png" mode="aspectFill"></image>
					<view class="info">
						<view>
							{{currentWork.member_id}}
						</view>
						<view>
							{{currentWork.nickname}}
						</view>
					</view>
				</view>
				<view class="name-sec">
					<view class="belong w-elli">{{currentWork.race_trackname}}</view>
					<view class="work-name-sec">
						<view class="work-name">
							{{currentWork.name}}
						</view>
						<view class="work-info w-elli-2">
							<mp-html :content="currentWork.content" />
							
						</view>
						
					</view>
				</view>
			</view>
			<view class="vote-sec j-center">
				<view class="item flex-wrap a-center j-center">
					<view style="margin-right: 16rpx;">
						当前票数
					</view>
					<view class="">
						{{currentWork.votes}}
					</view>
				</view>
				<view class="item flex-wrap a-center j-center">
					<view style="margin-right: 16rpx;">
						当前排名
					</view>
					<view class="">
						{{currentWork.sort}}
					</view>
				</view>
			</view>
			<view class="video-sec" v-if="currentWork.type === 1">
				<video :src="currentWork.file_link" class="uni-video-popup-contain" controls controlslist="nodownload noremoteplayback" disablePictureInPicture webkit-playsinline playsinline x5-playsinline></video>
			</view>
			<view class="video-sec file-icon" v-if="currentWork.type === 2">
				<image src="../../static/images/file-icon.svg" mode="aspectFill"></image>
				<view @click="preView(currentWork.file_link)" class="link">点击查看作品</view>
			</view>
			<view class="btn-sec flex-wrap j-between" v-if="currentWork.type">
				<button class="back-btn" type="primary" size="mini" @click="vote">为他投票</button>
				<button class="back-btn" type="primary" open-type="share" size="mini" :data-obj="currentWork">一键转发</button>
			</view>
		</view>
	</view>
</template>

<script>
	import Api from '@/api/index.js';
	import dialog from '@/utils/dialog.js';
	
	
	export default {
		onLoad(options){
			// this.currentWork = JSON.parse(decodeURIComponent(options.item)); 
			this.getDetail(options.id);
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 页面内分享按钮
				console.log(res.target)
				let obj = res.target.dataset.obj
				return {
					title: `${obj.name}`, // 标题
					path: `/pages/works/work-detail?id=${obj.id}` // 地址以及参数 
				};
			}else{
				// 右上角自带的菜单分享
				return {
					path: `pages/start-page/start-page`
				};
			}
		},
		data() {
			return {
				currentWork:{},
			}
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
			// 获取详情
			getDetail(id){
					Api.apiGetWorkdetail({
						work_id: id
					}).then(res=>{
						if(res.code === 200){
							this.currentWork = res.data
						}else{
							dialog.toast({
								  title: res.message,
								  duration: 2000
							})
						}
					})
			},
			// 投票 app.globalData.id
			vote(){
					Api.apiVote({
						openid:uni.getStorageSync('openid'),
						fans_id:uni.getStorageSync('id'),
						sign:uni.getStorageSync('sign'),
						work_id:this.currentWork.id,
						member_id:this.currentWork.member_id
					}).then(res=>{
						if(res.code === 200){
							dialog.toast({
								  title: res.message,
								  duration: 2000
							})
						}else{
							dialog.toast({
								  title: res.message,
								  duration: 2000
							})
						}
					})
			},
		}
	}
</script>

<style lang="scss">
	.wrap-work{
		padding: 32rpx;
	}
	.content{
		min-height: 600rpx;
		// padding: 16rpx;
		width: 100%;
		border-radius: 16rpx;
		// background-color: #001A8C;
		// border: 1px solid #3493e3;
		box-sizing: border-box;
		font-size: 28rpx;
		// color: #fff;
		
		.top-title {
			display: flex;
			align-items: center;
			margin-bottom: 16rpx;
			
			.img{
				margin-right: 16rpx;
				width: 240rpx;
				height: 240rpx;
				position: relative;
				
				image{
					width: 100%;
					height: 100%;
					border-radius: 16rpx;
					border: 2rpx solid #fff;
					box-sizing: border-box;
				}
				.info{
					height: 60rpx;
					// line-height: 60rpx;
					width: 100%;
					display: flex;
					color: #fff;
					border-bottom-right-radius: 16rpx;
					border-bottom-left-radius: 16rpx;
					justify-content: center;
					background: rgba(3, 78, 205, 0.2);
					position: absolute;
					bottom: 0;
					left: 0;
					view{
						padding: 0 .16rem;
					}
				}
			}
			.name-sec{
				width: 466rpx;
				font-size: 30rpx;
				font-weight: bold;
				box-sizing: border-box;
				.belong{
					margin-bottom: 16rpx;
					padding: 0 16rpx;
					line-height: 64rpx;
					border: 2rpx solid #001A8C;
					border-radius: 16rpx;
				}
				.work-info{
					margin-top: 16rpx;
					font-weight: 200;
					font-size: 28rpx;
				}
				.work-name-sec{
					height: 160rpx;
					padding: 16rpx;
					border: 2rpx solid #001A8C;
					border-radius: 16rpx;
					box-sizing: border-box;
				}
			}
		}
		.vote-sec{
			// height: 114rpx;
			padding: 20rpx 0;
			background:linear-gradient(90deg,#000c53 0%,#001a8c 30%,#001a8c 70%,#000c53 100%);
			font-size: 30rpx;
			font-weight: bold;
			display: flex;
			border-radius: 16rpx;
			box-sizing: border-box;
			.item{
				width: 50%;
				height: 40rpx;
				// line-height: 50rpx;
				// padding: 16rpx 0;
				text-align: center;
				border-right: 2rpx solid #fff;
				color: #fff;
				&:last-child{
					border: none;
				}
			}
		}
		.video-sec{
			width: 100%;
			padding: 24rpx;
			box-sizing: border-box;
			text-align: center;
			
			.link {
				color: #001A8C;
				font-size: 32rpx;
				font-weight: bold;
			}
		}
		.file-icon{
			display: flex;
			justify-content: center;
			
			image{
				width: 50rpx;
				height: 50rpx;
				margin-right: 16rpx;
			}
		}
		.btn-sec{
			padding-top: 16rpx;
			
			.back-btn{
				border-radius: 30rpx;
				background-color: #001A8C;
			}
		}
	}
</style>