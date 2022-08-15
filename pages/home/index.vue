<template>
	<view class="index-wrap">
		<image class="top-banner" mode="aspectFill" :src="banner"></image>
		<view class="pd-32 content-wrap">
			<!-- 搜索 -->
			<view class="top-search flex-wrap">
				<view class="search-bar">
					<input v-model="searchKey" confirm-type="search" @confirm="confirm"  placeholder="请输入标题" type="text" name="" id="">
				</view>
				<!-- <view  class="notice flex-wrap flex-vertical j-center a-center">
					<text>官方</text>
					<text>通知</text>
					<span :class="{'redbot':messageList>0}"></span>
				</view> -->
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
					<view @tap="selectCap('联系官方')" class="cap-item " :class="activeCap == '联系官方' ? 'curr' :''">
						联系官方
					</view>
				</view>
				<view v-if="activeCap != '联系官方'">
					<view v-if="newsList.length > 0" class="news-list">
						<view v-for="(news,i) in newsList" :key="i" @click="showDetail(news.id)" class="news-item ">
							<view class="news-box flex-wrap">
								<image class="news-cover" :src="news.thumbnail" mode="aspectFill"></image>
								<view class="time-title flex-wrap">
									<view class="time-box">
										<text class="month">{{getMonthTime(news.create_time)}}</text>
										<text class="day">{{getDayTime(news.create_time)}}</text>
									</view>
									<view class="title-box">
										<view class="title1 w-elli-2">
											{{news.mtitle}}
										</view>
										<view class="title2 w-elli-2">
											{{news.stitle}}
										</view>
									</view>
								</view>
													
							</view>
						</view>
					</view>
					<block v-if="newsList.length > 2">
						<uni-load-more :status="moreStatus[hasMoreData]"></uni-load-more>
					</block>
					<view-empty :hasEmpty="hasEmpty"></view-empty>
				</view>
				<view v-else>
					 <view class="content-center flex-wrap flex-vertical a-center">
					 		<view class="offical-info">
					 			<view class="tip" v-for="item,index in officialInfo" :key="i">
					 				<view class="label">
					 					{{item.title}}
					 				</view>
					 				<view class="val">
					 					{{item.value}}
					 				</view>
					 			</view>
					 		</view>
					 </view>
				</view>
			</view>
			
		</view>
		<wp-login :hasLogin.sync="hasLogin"></wp-login>
		<tabbar-com></tabbar-com>
	</view>
</template>

<script>
	import Nav from '@/utils/navigate.js'
	import { loadMoreMixin} from '@/utils/mixin.js';
	import api from '@/api/index.js';
	import { getMonth,getDay } from '@/utils/date.js';
	const app = getApp()
	
	export default {
		mixins:[loadMoreMixin],
		data() {
			return {
				hasLogin: true,
				searchKey:'',
				title: 'Hello',
				activeCap:'焦点新闻',//选中的cap文案，
				newsList:[],
				pageNo:1,
				pageSize:10,
				banner: app.globalData.banner || '',
				pageN: 1,
				pageS: 10,
				// messageList: [],
				officialInfo: []
			}
		},
		onLoad() {
			this.getCaseListThen();//请求列表数据
			uni.hideTabBar();//隐藏掉默认配置的这样尽可以显示自定义的tabbar,可以解决左上角小房子（回到首页）问题
			if(!uni.getStorageSync('avatarUrl')){
				this.hasLogin = false
			};
			// if(uni.getStorageSync('phone')){
			// 	this.hasMobile = true
			// };
			// this.getMessageList();
		},
		onPullDownRefresh(){
			this.pageNo = 1;
			
			this.getCaseListThen(false,uni.stopPullDownRefresh)
		},
		onReachBottom(){//触底加载更多数据
			if(this.hasMoreData){//true则加载更多，页数增加
				this.pageNo++;
				this.getCaseListThen(true);
			}
		},
		computed:{
			hasEmpty(){
				return this.newsList.length === 0;
			}
		},
		methods: {
			getMonthTime(time){
				return getMonth(new Date(time * 1000))
			},
			getDayTime(time){
				return getDay(new Date(time * 1000))
			},
			confirm(){
				console.log("11111111")
				this.pageNo = 1
				this.getCaseListThen();//请求列表数据
			},
			selectCap(text){
				this.activeCap = text
				if(text == '联系官方'){
					this.getOfficial()
					return
				}
				this.pageNo = 1
				this.newsList = []
				this.getCaseListThen();//请求列表数据
			},
			//获取官方资料
			getOfficial(){
				api.apiGetOfficial({
					openid:uni.getStorageSync('openid'),
					sign:uni.getStorageSync('sign'),
					type:1
				}).then(res=>{
					if(res.code === 200){
						this.officialInfo = res.data
					}
				})
			},
			//查看详情
			showDetail(id){
				Nav.navigateTo({
					url:'/pages/home/detail',
					query: {
						id
					}
				})
			},
			// 获取列表数据
			getCaseList(){
				return api.apiGetNewsList({
					class_id: this.activeCap === '焦点新闻' ? 1 : 2,
					page: this.pageNo,
					page_size: this.pageSize,
					mtitle:this.searchKey
				});
			},
			// 获取数据的后续操作
			getCaseListThen(isLoadMore = false,done){
				this.setHasMore(this.newsList.length >= this.pageSize);
				this.getCaseList().then(res => {
					if(res.code === 200){
						if(!isLoadMore){//从以第一条数据开始请求
							this.newsList = res.data.list;
						}else{//加载更多数据相拼接
							this.newsList = this.newsList.concat(res.data.list)
						}
						//如果获取到的数据length小于pageSize 就是false说明是最后的数据了 显示没有更多了
						this.setHasMore(res.data.list.length >= this.pageSize);
					}
					typeof done === 'function' && done();
				}).catch(() => {typeof done === 'function' && done();});
			},
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
			.news-list{
				padding-top: 24rpx;
				.news-item{
					width: 100%;
					padding-bottom: 24rpx;
					border-bottom: 1px solid #8f8f8f;
					margin-bottom: 24rpx;
					.news-box{
						width: 100%;
						height: 154rpx;
						// border-radius: 8rpx;
						// background: #001a8c;
						overflow: hidden;
					}
					.news-cover{
						height: 100%;
						width: 30%;
						border-radius: 8rpx;
					}
					.time-title{
						padding-left: 24rpx;
						height: 100%;
						box-sizing: border-box;
						flex: 1 0 0;
						min-width: 0;
						.time-box{
							width: 24%;
							height: 100%;
							position: relative;
							text{
								font-size: 52rpx;
								font-weight: bold;
								color: #000;
								position: absolute;
								display: block;
								&.month{
									top: 12rpx;
									left: 0;
								}
								&.day{
									bottom: 12rpx;
									right: 0;
								}
							}
							
							&::after{
								position: absolute;
								content: '';
								width: 1px;
								height: 100rpx;
								background: #000;
								transform: rotate(50deg);
								left: 50%;
								top: 24rpx;
							}
						}
						.title-box{
							padding-left: 12rpx;
							margin-left: 12rpx;
							border-left: 1px solid #999;
							flex: 1 0 0;
							min-width: 0;
							view{
								// text-align: center;
								// color: #fff;
								&.title1{
									font-size: 32rpx;
									font-weight: bold;
								}
								&.title2{
									font-size: 24rpx;
									color: #908f90;
								}
							}
						}
					}
				}
			}
		}
		.content-center{
			border-radius: 10rpx;
			background: #fff;
			width: 100%;
			margin-top: 24rpx;
			// border: 1px solid #001a8c;
			min-height: 600rpx;
			
			.offical-info{
				width: 100%;
				padding: 24rpx;
				.tip{
					width: 100%;
					font-size: 30rpx;
					color: #333;
					padding: 0rpx 24rpx;
					margin-bottom: 12rpx;
					
					view{
						// text-align: center;
						&.label{
							margin-bottom: 12rpx;
							color: #999;
							font-size: 26rpx;
						}
					}
				}
			}
		}
	}
</style>
