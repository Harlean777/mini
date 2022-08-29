<template>
	<view class="wrap">
		<image class="top-banner" mode="aspectFill" :src="banner"></image>
		<view class="pd-32 content-wrap">
			<view class="top-search flex-wrap">
				<view class="search-bar">
					<input v-model="searchName" confirm-type="search" @confirm="confirm" placeholder="请输入作品名称/编号" type="text" name="" id="">
				</view>
				<!-- <view  class="notice flex-wrap flex-vertical j-center a-center">
					<text>官方</text>
					<text>通知</text>
					<span :class="{'redbot':messageList>0}"></span>
				</view> -->
			</view>
			<!-- 官方发布 -->
			<view class="banner-text">
				参赛作品
			</view>
			<view class="track-nav">
				<button class="mini-btn" size="mini" :class="{'curr_btn':tracktype === 1}" @click="swtichTab(1)">虚拟现实工程</button>
				<button class="mini-btn" size="mini" :class="{'curr_btn':tracktype === 2}" @click="swtichTab(2)">智能制造工程</button>
				<button class="mini-btn" size="mini" :class="{'curr_btn':tracktype === 3}" @click="swtichTab(3)">互联网营销师</button>
				<button class="mini-btn" size="mini" :class="{'curr_btn':tracktype === 4}" @click="swtichTab(4)">人工智能工程</button>
				<button class="mini-btn" size="mini" :class="{'curr_btn':tracktype === 5}" @click="swtichTab(5)">数字化管理师</button>
			</view>
			<view class="top-nav">
				<view class="nav-tab" :class="{'curr':type === 1}" @click="handleSwtichTab(1)">作品展示</view>
				<view class="nav-tab" :class="{'curr':type === 2}" @click="handleSwtichTab(2)">人气排名</view>
			</view>
			<view v-if="type === 1">
				<view>
					
					<view class="work-list">
						<view class="item" v-for="item,index in allList" :key="index">
							<!-- <image :src="item.cover" class="work-image" mode="aspectFill"></image> -->
							<image src="../../static/images/bg-img.png" class="work-image" mode="aspectFill"></image>
							<view class="tex-top">
								<view style="font-size: 40rpx;">
									{{splitNum("00" + item.id)}}
								</view>
								<view class="">
									{{item.customize}}
								</view>
								<view class="">
									{{item.nickname}}
								</view>
							</view>
							<view class="title w-elli-2">人气值{{item.votes}}</view>
							<view class="btn-sec">
								<view class="vote" @click="vote(item)">
									投票
								</view>
								<view class="view" @click="workShowHandle(item.id)">
									查看
								</view>
							</view>
						</view>
					</view>
					
					
					
					<block v-if="allList.length > 2">
						<uni-load-more :status="moreStatus[hasMoreData]"></uni-load-more>
					</block>
					<view-empty :hasEmpty="hasEmpty"></view-empty>
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
								{{item.sort}}
							</view>
							<view class="item">
								{{item.customize}}
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
		<wp-login :hasLogin.sync="hasLogin"></wp-login>
		<tabbar-com></tabbar-com>
	</view>
</template>

<script>
	import Api from '@/api/index.js';
	import { loadMoreMixin} from '@/utils/mixin.js';
	import dialog from '@/utils/dialog.js';
	import Nav from '@/utils/navigate.js'
	const app = getApp()
	export default {  
		mixins:[loadMoreMixin],
		data() {
			return {
				searchName:'',
				type: 1, //1作品 2人气排名
				tracktype:1, //赛道  
				allList:[],
				// workShow:false,
				pageNo:1,
				pageSize:10,
				PopList:[],//人气排名
				isLoadMore:false,
				currentWork:{},
				banner: app.globalData.banner || '',
				// messageList: app.globalData.messageList || []
				hasLogin: true,
			};
		},
		onLoad() {
			
			this.getList(this.tracktype);
			if(!uni.getStorageSync('avatarUrl')){
				this.hasLogin = false
			};
		},
		computed:{
			hasEmpty(){
				return this.allList.length === 0;
			}
		},
		onPullDownRefresh(){
			this.pageNo = 1;
			// this.getHouseListThen(false,uni.stopPullDownRefresh);
			this.type = 1,
			this.tracktype =1,
			this.getList(1,false,uni.stopPullDownRefresh)
		},
		onReachBottom(){//触底加载更多数据
			if(this.hasMoreData){//true则加载更多，页数增加
				this.pageNo++;
				this.getList(this.tracktype,true);
			}
		},
		methods: {
			confirm(){
				this.pageNo = 1
				this.getList(this.tracktype,false)
			},
			splitNum(string){
				console.log("item",string)
				var strL = string.length
				var newstr =  string.substring(strL-3,strL)
				return newstr
			},
			// 获取列表数据
			getList(num=1,isLoadMore = false,done){
				console.log("num1111",num,isLoadMore)
				Api.apiGetProduction({
					race_track: num,
					page: this.pageNo,
					page_size: this.pageSize,
					openid: uni.getStorageSync('openid'),
					sign: uni.getStorageSync('sign'),
					sort:'',
					name:this.searchName,
					member_id:'',
				}).then(res=>{
					if(res.code == 200){
						console.log("作品列表",res)
						if(!isLoadMore){//从以第一条数据开始请求
							this.allList = res.data.list
							
						}else{//加载更多数据相拼接
							this.allList = this.allList.concat(res.data.list)
						}
						//如果获取到的数据length小于pageSize 就是false说明是最后的数据了 显示没有更多了
						this.setHasMore(res.data.list.length >= this.pageSize);
					}
					typeof done === 'function' && done();
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
					this.fetchPopList(this.tracktype);
				}else if(this.type == 1){//参赛作品
					// 暂不处理
				}
			},
			// 切换赛道
			swtichTab(type) {
				if (this.tracktype !== type) {
					this.tracktype = type;
					this.pageNo = 1
					this.getList(type)
					this.type = 1
				}
			},
			workShowHandle(id){
				Nav.navigateTo({
					url:'/pages/works/work-detail',
					query: {
						id
					}
				})
				// this.currentWork = data;
			},
			// 投票 app.globalData.id
			vote(item){
					Api.apiVote({
						openid:uni.getStorageSync('openid'),
						fans_id:uni.getStorageSync('id'),
						sign:uni.getStorageSync('sign'),
						work_id:item.id,
						member_id:item.member_id
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
			fetchPopList(num){
				Api.apiGetProduction({
					race_track: num,
					page: 1,
					page_size: 5,
					sign:uni.getStorageSync('sign'),
					openid:uni.getStorageSync('openid'),
					sort:1,
					name: ''
				}).then(res=>{
					console.log("人气排名",res)
					if(res.code === 200){
						this.PopList = res.data.list
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
		.track-nav{
			margin-top: 24rpx;
			text-align: center;
		}
		.top-nav{
			display: flex;
			margin-top: 24rpx;
			.nav-tab{
				font-size: 28rpx;
				color: #666;
				margin-bottom: 32rpx;
				
				&.curr {
					color: #3493e3;
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
			border: 1px solid #3493e3;
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
				
				.link {
					color: #001A8C;
					font-size: 32rpx;
					font-weight: bold;
				}
			}
			.btn-sec{
				padding-top: 16rpx;
			}
		}
		.content-info{
			height: calc(100vh - 200rpx);
			padding: 0;
			
			.leaderboard{
				height: 90rpx;
				font-size: 32rpx;
				color: #fff;
				line-height: 90rpx;
				font-weight: bold;
				background:linear-gradient(90deg,#1d72ce 0%,#0019a6 30%,#0019a6 70%,#1d72ce 100%);
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
			width: 100rpx;
			height: 100rpx;
			line-height: 30rpx;
			border-radius: 12rpx;
			border: 1px solid #3594e3;
			// margin-bottom: 16rpx;
			padding: 16rpx 6rpx;
			margin-right: 16rpx;
			
			&.curr_btn{
				background-color: #3594e3;
				color: #fff;
			}
		}
		
		.back-btn{
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
				position: relative;
				
				&:nth-child(3n){
					margin-right: 0;
				}
				
				.work-image{
					width: 100%;
					height: 300rpx;
					border-top-left-radius: 16rpx;
					border-top-right-radius: 16rpx;
				}
				
				.tex-top{
					padding: 16rpx;
					position: absolute;
					width: 100%;
					height: 300rpx;
					top: 0;
					left: 0;
					color: #fff;
					font-size: 24rpx;
					font-weight: bold;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					padding-bottom: 60rpx;
					box-sizing: border-box;
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