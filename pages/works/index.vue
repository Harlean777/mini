<template>
	<view class="wrap">
		<image class="top-banner" mode="aspectFill" :src="banner"></image>
		<view class="pd-32 content-wrap">
			<view class="top-search flex-wrap">
				<view class="search-bar">
					<input v-model="searchName" confirm-type="search" @confirm="confirm" placeholder="请输入关键词" type="text" name="" id="">
				</view>
				<view  class="notice flex-wrap flex-vertical j-center a-center">
					<text>官方</text>
					<text>通知</text>
					<span :class="{'redbot':messageList>0}"></span>
				</view>
			</view>
			<!-- 官方发布 -->
			<view class="banner-text">
				参赛作品
			</view>
			<view class="top-nav">
				<view class="nav-tab" :class="{'curr':type === 1}" @click="handleSwtichTab(1)">作品展示</view>
				<view class="nav-tab" :class="{'curr':type === 2}" @click="handleSwtichTab(2)">人气排名</view>
			</view>
			<view v-if="type === 1">
				<view v-if="!workShow">
					<button class="mini-btn" type="primary" size="mini">虚拟现实工程技术人员赛道</button>
					<view>
						<view class="work-list">
							<view class="item" v-for="item,index in list1" :key="index">
								<image :src="item.cover" class="work-image" mode="aspectFill"></image>
								<view class="title w-elli-2">{{item.id +' '+ item.name +' '+ item.votes}}</view>
								<view class="btn-sec">
									<view class="vote" @click="vote(item)">
										投票
									</view>
									<view class="view" @click="workShowHandle(item)">
										查看
									</view>
								</view>
							</view>
						</view>
					</view>
					<button class="mini-btn" type="primary" size="mini">智能制造工程技术人员赛道</button>
					<view>
						<view class="work-list">
							<view class="item" v-for="item,index in list2" :key="index">
								<image :src="item.cover" class="work-image" mode="aspectFill"></image>
								<view class="title w-elli-2">{{item.id +' '+ item.name +' '+ item.votes}}</view>
								<view class="btn-sec">
									<view class="vote" @click="vote(item)">
										投票
									</view>
									<view class="view" @click="workShowHandle(item)">
										查看
									</view>
								</view>
							</view>
						</view>
					</view>
					<button class="mini-btn" type="primary" size="mini">互联网营销师赛道</button>
					<view>
						<view class="work-list">
							<view class="item" v-for="item,index in list3" :key="index">
								<image :src="item.cover" class="work-image" mode="aspectFill"></image>
								<view class="title w-elli-2">{{item.id +' '+ item.name +' '+ item.votes}}</view>
								<view class="btn-sec">
									<view class="vote" @click="vote(item)">
										投票
									</view>
									<view class="view" @click="workShowHandle(item)">
										查看
									</view>
								</view>
							</view>
						</view>
					</view>
					<button class="mini-btn" type="primary" size="mini">人工智能工程技术人员赛道</button>
					<view>
						<view class="work-list">
							<view class="item" v-for="item,index in list4" :key="index">
								<image :src="item.cover" class="work-image" mode="aspectFill"></image>
								<view class="title w-elli-2">{{item.id +' '+ item.name +' '+ item.votes}}</view>
								<view class="btn-sec">
									<view class="vote" @click="vote(item)">
										投票
									</view>
									<view class="view" @click="workShowHandle(item)">
										查看
									</view>
								</view>
							</view>
						</view>
					</view>
					<button class="mini-btn" type="primary" size="mini">数字化管理师赛道</button>
					<view>
						<view class="work-list">
							<view class="item" v-for="item,index in list5" :key="index">
								<image :src="item.cover" class="work-image" mode="aspectFill"></image>
								<view class="title w-elli-2">{{item.id +' '+ item.name +' '+ item.votes}}</view>
								<view class="btn-sec">
									<view class="vote" @click="vote(item)">
										投票
									</view>
									<view class="view" @click="workShowHandle(item)">
										查看
									</view>
								</view>
							</view>
						</view>
					</view>
				
					<block v-if="allList.length > 2">
						<uni-load-more :status="moreStatus[hasMoreData]"></uni-load-more>
					</block>
					<view-empty :hasEmpty="hasEmpty"></view-empty>
				</view>
				<view v-else>
					<button @tap="back" class="mini-btn" type="primary" size="mini">返回</button>
					<view class="content">
						<view class="top-title">
							<view class="img">
								<image src="../../static/images/test.jpeg" mode="aspectFill"></image>
								<view class="info">
									
								</view>
							</view>
							<view class="name-sec">
								<view class="belong">{{currentWork.race_trackname}}</view>
								<view class="work-name-sec">
									<view class="work-name">
										{{currentWork.name}}
									</view>
									<view class="work-info w-elli-2">
										<!-- 富文本内容 -->
										<mp-html :content="currentWork.content" />
										
									</view>
									
								</view>
							</view>
						</view>
						<view class="vote-sec ">
							<view class="item flex-wrap flex-vertical a-center">
								<view class="">
									当前票数
								</view>
								<view class="">
									{{currentWork.votes}}
								</view>
							</view>
							<view class="item flex-wrap flex-vertical a-center">
								<view class="">
									当前排名
								</view>
								<view class="">
									{{currentWork.sort}}
								</view>
							</view>
							<view class="item">
								上周排名
							</view>
							<view class="item">
								转发拉票
							</view>
						</view>
					</view>
					
				</view>
				
			</view>
			<view v-if="type === 2">
				<view class="content-info">
					<view class="leaderboard">排行榜</view>
					<view class="leaderboard-data">
						<view class="top-sec">
							<view class="item">
								排行
							</view>
							<view class="item">
								作者
							</view>
							<view class="item">
								作品编号
							</view>
							<view class="item">
								票数
							</view>
						</view>
						<view class="top-sec border-top" v-for="item,index in PopList" :key="index">
							<view class="item">
								{{item.race_track}}
							</view>
							<view class="item">
								{{item.nickname}}
							</view>
							<view class="item">
								{{item.id}}
							</view>
							<view class="item">
								{{item.votes}}
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
	import Api from '@/api/index.js';
	import { loadMoreMixin} from '@/utils/mixin.js';
	import dialog from '@/utils/dialog.js';
	const app = getApp()
	export default {  
		mixins:[loadMoreMixin],
		data() {
			return {
				searchName:'',
				type: 1,
				list1:[],
				list2:[],
				list3:[],
				list4:[],
				list5:[],
				allList:[],
				workShow:false,
				pageNo:1,
				pageSize:10,
				PopList:[],//人气排名
				isLoadMore:false,
				currentWork:{},
				banner: app.globalData.banner || '',
				messageList: app.globalData.messageList || []
			};
		},
		onLoad() {
			// this.fetchList();//请求列表数据
			// this.getList(1);
			// this.getList(2);
			// this.getList(3);
			// this.getList(4);
			// this.getList(5);
			this.getList('')
		},
		computed:{
			hasEmpty(){
				return this.allList.length === 0;
			}
		},
		methods: {
			confirm(){
				this.pageNo = 1
				this.getList()
			},
			// 获取列表数据
			getList(num){
				Api.apiGetProduction({
					race_track: num,
					page: this.pageNo,
					page_size: this.pageSize,
					sort:'id',
					name:this.searchName
				}).then(res=>{
					console.log("resres",res)
					if(res.code == 200){
						let list1 = []
						let list2 = []
						let list3 = []
						let list4 = []
						let list5 = []
						for(let arr of res.data.list){
							if(arr.race_track == 1){
								list1.push(arr)
							}else if(arr.race_track == 2){
								list2.push(arr)
							}else if(arr.race_track == 3){
								list3.push(arr)
							}else if(arr.race_track == 4){
								list4.push(arr)
							}else if(arr.race_track == 5){
								list5.push(arr)
							}
						}
						if(!this.isLoadMore){//从以第一条数据开始请求
							this.allList = res.data.list
							this.list1 = list1;
							this.list2 = list2;
							this.list3 = list3;
							this.list4 = list4;
							this.list5 = list5;
							
						}else{//加载更多数据相拼接
							this.allList = this.allList.concat(res.data.list)
							this.list1 = this.list1.concat(list1);
							this.list2 = this.list2.concat(list2);
							this.list3 = this.list3.concat(list3);
							this.list4 = this.list4.concat(list4);
							this.list5 = this.list5.concat(list5);
							
						}
						//如果获取到的数据length小于pageSize 就是false说明是最后的数据了 显示没有更多了
						this.setHasMore(res.data.list.length >= this.pageSize);
					}else{
						//
					}
				});
			},
			// 获取数据的后续操作
			fetchList(isLoadMore = false,done){
				this.setHasMore(this.list.length >= this.pageSize);
				this.getList().then(res => {
					console.log("res454545", res)
					if(res.code == 200){
						if(!isLoadMore){//从以第一条数据开始请求
							this.list = res.data.data.list;
							console.log("111")
						}else{//加载更多数据相拼接
							this.list = this.list.concat(res.data.data.list)
							console.log("2222222")
						}
						console.log("listlist3333333333",this.list)
						//如果获取到的数据length小于pageSize 就是false说明是最后的数据了 显示没有更多了
						this.setHasMore(res.data.data.list.length >= this.pageSize);
						console.log("listlist",this.list)
					}else{
						console.log("listlist2",this.list)
					}
					typeof done === 'function' && done();
				}).catch(() => {typeof done === 'function' && done();});
			},
			// 切换项目
			handleSwtichTab(type) {
				if (this.type !== type) {
					this.type = type;
				}
				if(this.type == 2){ //人气排名
					this.fetchPopList();
				}else if(this.type == 1){//参赛作品
					// this.fetchList();
				}
			},
			back(){
				this.workShow = false
			},
			workShowHandle(data){
				this.workShow = true;
				this.currentWork = data;
			},
			// 投票 app.globalData.id
			vote(item){
					Api.apiVote({
						openid:uni.getStorageSync('openid'),
						fans_id:uni.getStorageSync('id'),
						work_id:item.id,
						member_id:item.member_id
					}).then(res=>{
						console.log("78787878",res)
						if(res.code === 200){
							dialog.toast({
								  title: res.message,
							})
						}
						
					})
			},
			fetchPopList(){
				Api.apiGetPopularityList().then(res=>{
					console.log("人气排名",res)
					if(res.code === 200){
						this.PopList = res.data
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
				font-size: 28rpx;
				color: #666;
				margin-bottom: 32rpx;
				
				&.curr {
					color: #001A8C;
					font-weight: bold;
					font-size: 32rpx;
				}
				
				&:first-child{
					border-right: 2rpx solid #666;
					padding-right: 40rpx;
					
				}
				&:last-child{
					padding-left: 40rpx;
				}
				
			}
		}
			
		.content,.content-info{
			min-height: 600rpx;
			padding: 16rpx;
			width: 100%;
			border-radius: 16rpx;
			// background-color: #001A8C;
			border: 1px solid #001A8C;
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
						height: 50rpx;
						width: 240rpx;
						bottom: 0rpx;
						background: rgba(3, 78, 205, 0.2);
						position: absolute;
						bottom: 0;
						left: 0;
					}
				}
				.name-sec{
					width: 466rpx;
					font-size: 36rpx;
					font-weight: bold;
					box-sizing: border-box;
					.belong{
						margin-bottom: 16rpx;
						padding: 0 16rpx;
						line-height: 64rpx;
						border: 2rpx solid #fff;
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
						border: 2rpx solid #fff;
						border-radius: 16rpx;
						box-sizing: border-box;
					}
				}
			}
			.vote-sec{
				height: 114rpx;
				padding: 20rpx 0;
				background-color: #5DA9D8;
				font-size: 30rpx;
				font-weight: bold;
				display: flex;
				border-radius: 16rpx;
				box-sizing: border-box;
				.item{
					width: 25%;
					height: 40rpx;
					// line-height: 50rpx;
					// padding: 16rpx 0;
					text-align: center;
					border-right: 2rpx solid #fff;
					&:last-child{
						border: none;
					}
				}
			}
		}
		.content-info{
			height: calc(100vh - 200rpx);
			padding: 0;
			
			.leaderboard{
				height: 90rpx;
				font-size: 32rpx;
				line-height: 90rpx;
				font-weight: bold;
				background-color: #5DA9D8;
				text-align: center;
				border-top-left-radius: 16rpx;
				border-top-right-radius: 16rpx;
				
			}
			.leaderboard-data{
				padding: 0 16rpx;
				.top-sec{
					height: 90rpx;
					padding: 0 20rpx;
					font-size: 30rpx;
					font-weight: bold;
					display: flex;
					box-sizing: border-box;
					.item{
						width: 25%;
						// height: 40rpx;
						line-height: 80rpx;
						// padding: 16rpx 0;
						text-align: center;
						// border-right: 2rpx solid #fff;
					}
				}
				.border-top{
					border-top: 2rpx solid #666;
				}
			}
		}
		.btn{
			width: 50%;
			font-weight: bold;
			margin: 32rpx auto;
			background-color: #001A8C;
		}
		.mini-btn{
			border-radius: 30rpx;
			background-color: #001A8C;
			margin-bottom: 16rpx;
		}
		.work-list{
			display: flex;
			flex-wrap: wrap;
			// justify-content: space-between;
			
			.item{
				width: 30%;
				margin-right: 32rpx;
				margin-bottom: 32rpx;
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				
				&:nth-child(3n){
					margin-right: 0;
				}
				
				.work-image{
					width: 100%;
					height: 300rpx;
					border-top-left-radius: 16rpx;
					border-top-right-radius: 16rpx;
				}
				
				.title{
					line-height: 60rpx;
					text-align: center;
					background-color: #001A8C;
					color: #fff;
					font-size: 28rpx;
					height: 60rpx;
				}
				
				.btn-sec{
					display: flex;
					font-size: 28rpx;
					line-height: 60rpx;
					.vote{
						width: 50%;
						text-align: center;
						color: #fff;
						font-weight: bold;
						background-color: #FFBA55;
					}
					.view{
						width: 50%;
						text-align: center;
						color: #fff;
						font-weight: bold;
						background-color: #6AB26B;
					}
				}
			}
		}
	}
</style>