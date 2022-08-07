<template>
	<view class="index-wrap">
		<image class="top-banner" mode="aspectFill" src="../../static/images/demo.jpeg"></image>
		<view class="pd-32 content-wrap">
			<!-- 搜索 -->
			<view class="top-search flex-wrap">
				<view class="search-bar">
					<input placeholder="请输入关键词" type="text" name="" id="">
				</view>
				<view  class="notice flex-wrap flex-vertical j-center a-center">
					<text>官方</text>
					<text>通知</text>
				</view>
			</view>
			<!-- 官方发布 -->
			<view class="banner-text">
				官方发布
			</view>
			<!-- 新闻列表页 -->
			<view class="newsList-box">
				<view class="cap flex-wrap a-center">
					<view @tap="selectCap('焦点新闻')" class="cap-item" :class="activeCap == '焦点新闻' ? 'curr' :''">
						焦点新闻
					</view>
					<view @tap="selectCap('公示公告')" class="cap-item " :class="activeCap == '公示公告' ? 'curr' :''">
						公示公告
					</view>
				</view>
				<view class="news-list">
					<view @click="showDetail" class="news-item ">
						<view class="news-box flex-wrap">
							<image class="news-cover" src="../../static/images/demo.jpeg" mode="aspectFill"></image>
							<view class="time-title flex-wrap">
								<view class="time-box">
									<text class="month">07</text>
									<text class="day">24</text>
								</view>
								<view class="title-box">
									<view class="title1 w-elli">
										主标主标主标主标主标
									</view>
									<view class="title2 w-elli">
										副标副标副标副标副标副标副标副标副标副标副标副标
									</view>
								</view>
							</view>
												
						</view>
					</view>
					<view class="news-item ">
						<view class="news-box flex-wrap">
							<image class="news-cover" src="../../static/images/demo.jpeg" mode="aspectFill"></image>
							<view class="time-title flex-wrap">
								<view class="time-box">
									<text class="month">07</text>
									<text class="day">24</text>
								</view>
								<view class="title-box">
									<view class="title1 w-elli">
										主标主标主标主标主标
									</view>
									<view class="title2 w-elli">
										副标副标副标副标副标副标副标副标副标副标副标副标
									</view>
								</view>
							</view>
												
						</view>
					</view>
					<view class="news-item ">
						<view class="news-box flex-wrap">
							<image class="news-cover" src="../../static/images/demo.jpeg" mode="aspectFill"></image>
							<view class="time-title flex-wrap">
								<view class="time-box">
									<text class="month">07</text>
									<text class="day">24</text>
								</view>
								<view class="title-box">
									<view class="title1 w-elli">
										主标主标主标主标主标
									</view>
									<view class="title2 w-elli">
										副标副标副标副标副标副标副标副标副标副标副标副标
									</view>
								</view>
							</view>
												
						</view>
					</view>
					<view class="news-item ">
						<view class="news-box flex-wrap">
							<image class="news-cover" src="../../static/images/demo.jpeg" mode="aspectFill"></image>
							<view class="time-title flex-wrap">
								<view class="time-box">
									<text class="month">07</text>
									<text class="day">24</text>
								</view>
								<view class="title-box">
									<view class="title1 w-elli">
										主标主标主标主标主标
									</view>
									<view class="title2 w-elli">
										副标副标副标副标副标副标副标副标副标副标副标副标
									</view>
								</view>
							</view>
												
						</view>
					</view>
					
				</view>
				
			</view>
		</view>
		
		<tabbar-com></tabbar-com>
	</view>
</template>

<script>
	import Nav from '@/utils/navigate.js'
	export default {
		data() {
			return {
				title: 'Hello',
				activeCap:'焦点新闻',//选中的cap文案
			}
		},
		onLoad() {
			uni.hideTabBar()//隐藏掉默认配置的这样尽可以显示自定义的tabbar,可以解决左上角小房子（回到首页）问题
		},
		onReachBottom() {
			console.log("111111111")
		},
		methods: {
			selectCap(text){
				this.activeCap = text
			},
			//查看详情
			showDetail(){
				Nav.navigateTo({
					url:'/pages/index/detail'
				})
			}
		}
	}
</script>

<style lang="scss">
	.index-wrap{
		background: #fff;
		
		.newsList-box{
			padding-top: 24rpx;
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
			.news-list{
				padding-top: 24rpx;
				.news-item{
					width: 100%;
					padding-bottom: 24rpx;
					border-bottom: 1px solid #8f8f8f;
					margin-bottom: 24rpx;
					.news-box{
						width: 100%;
						height: 150rpx;
						border-radius: 8rpx;
						background: #001a8c;
						overflow: hidden;
					}
					.news-cover{
						height: 100%;
						width: 30%;
					}
					.time-title{
						padding: 24rpx;
						height: 100%;
						box-sizing: border-box;
						flex: 1 0 0;
						min-width: 0;
						.time-box{
							width: 24%;
							height: 100%;
							position: relative;
							text{
								font-size: 46rpx;
								font-weight: bold;
								color: #fff;
								position: absolute;
								display: block;
								&.month{
									top: 0;
									left: 0;
								}
								&.day{
									bottom: 0;
									right: 0;
								}
							}
							
							&::after{
								position: absolute;
								content: '';
								width: 1px;
								height: 100rpx;
								background: #fff;
								transform: rotate(50deg);
								left: 50%;
								top: 0;
							}
						}
						.title-box{
							padding-left: 24rpx;
							flex: 1 0 0;
							min-width: 0;
							view{
								text-align: center;
								color: #fff;
								&.title1{
									font-size: 46rpx;
									margin-bottom: 10rpx;
								}
								&.title2{
									font-size: 22rpx;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
