<template>
	<view class="wrap-work">
		<mp-html :content="message.content"/>
	</view>
</template>

<script>
	import Api from '@/api/index.js';
	
	export default {
		onLoad(options){
			this.message = JSON.parse(decodeURIComponent(options.item));
		},
		data() {
			return {
				message:{},
			}
		},
		methods:{
		}
	}
</script>

<style lang="scss">
	.wrap-work{
		padding: 32rpx;
		font-size: 24rpx;
		color: #666;
	}
</style>