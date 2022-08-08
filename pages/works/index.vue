<template>
	<view class="wrap">
		<image class="top-banner" mode="aspectFill" src="../../static/images/demo.jpeg"></image>
		<view class="pd-32 content-wrap">
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
				参赛作品
			</view>
			<view class="top-nav">
				<view class="nav-tab" :class="{'curr':type === 1}" @click="handleSwtichTab(1)">作品展示</view>
				<view class="nav-tab" :class="{'curr':type === 2}" @click="handleSwtichTab(2)">人气排名</view>
			</view>
			<view v-if="type === 1">
				<view v-if="!workShow">
					<button class="mini-btn" type="primary" size="mini" @click="workShowHandle">所属赛道</button>
					<view>
						<view class="work-list">
							<view class="item" v-for="item,index in list" :key="index">
								<image src="../../static/images/test.jpeg" class="work-image" mode="aspectFill"></image>
								<view class="title">{{item.num +' '+ item.name +' '+ item.vote}}</view>
								<view class="btn-sec">
									<view class="vote">
										投票
									</view>
									<view class="view">
										查看
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-else>
					<view class="content">
						<view class="top-title">
							<view class="img">
								<image src="../../static/images/test.jpeg" mode="aspectFill"></image>
								<view class="info">
									
								</view>
							</view>
							<view class="name-sec">
								<view class="belong">所属赛道</view>
								<view class="work-name-sec">
									<view class="work-name">
										作品名称
									</view>
									<view class="work-info">
										作品介绍
									</view>
									
								</view>
							</view>
						</view>
						<view class="vote-sec">
							<view class="item">
								当前票数
							</view>
							<view class="item">
								当前排名
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
						<view class="top-sec border-top" v-for="item,index in dataList" :key="index">
							<view class="item">
								{{item.rank}}
							</view>
							<view class="item">
								{{item.author}}
							</view>
							<view class="item">
								{{item.number}}
							</view>
							<view class="item">
								{{item.vote}}
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
	export default {  
		data() {
			return {
				type: 1,
				list:[{imgUrl:'../../static/images/test.jpg',num: 1,name:'一号作品',vote:100},
				{imgUrl:'../../static/images/test.jpg',num: 2,name:'一号作品',vote:100},
				{imgUrl:'../../static/images/test.jpg',num: 1,name:'一号作品',vote:100},
				{imgUrl:'../../static/images/test.jpg',num: 3,name:'一号作品',vote:100},
				{imgUrl:'../../static/images/test.jpg',num: 4,name:'一号作品',vote:100}],
				dataList:[{rank:1,author:'小明',number:1,vote:1000},
				{rank:2,author:'小明',number:1,vote:1000},
				{rank:3,author:'小明',number:1,vote:1000},
				{rank:4,author:'小明',number:1,vote:1000},
				{rank:5,author:'小明',number:1,vote:1000},
				{rank:6,author:'小明',number:1,vote:1000}],
				workShow:false,
			};
		},
		methods: {
			// 切换项目
			handleSwtichTab(type) {
				if (this.type !== type) {
					this.type = type;
				}
			},
			workShowHandle(){
				this.workShow = true
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
			height: calc(100vh - 100rpx);
			padding: 16rpx;
			width: 100%;
			border-radius: 16rpx;
			background-color: #001A8C;
			box-sizing: border-box;
			font-size: 28rpx;
			color: #fff;
			
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
				height: 90rpx;
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
					border-top: 2rpx solid #fff;
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