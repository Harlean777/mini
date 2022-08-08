<template>
	<view class="wp-empty-wrapper" :style="{height:height}" v-if="hasEmpty">
		<view class="wp-empty-contain">
			<view class="empty-cotain">
				<image class="empty-image" src="../../static/images/empty.png" mode="widthFix"></image>
				<view class="empty-text">{{emptyText}}</view>
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * 公共的空白页面
	 */
	export default {
		name:'ViewEmpty',
		props: {
			hasEmpty: {
				default: false,
			},
			imageUrl: {
				default: ''
			},
			emptyText: {
				default: '暂无数据'
			},
			height: {
				default: '60vh'
			},
		}
	}
</script>

<style lang="scss" scoped>
	.wp-empty-wrapper {
		width: 100%;
		height: 60vh;

		.wp-empty-contain {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: center;

			.empty-image {
				display: block;
				width: 119rpx;
				height: 95rpx;
			}

			.empty-text {
				line-height: 1em;
				font-size: 24rpx;
				color: #ccc;
				margin-top: 28rpx;
			}
		}
	}
</style>
