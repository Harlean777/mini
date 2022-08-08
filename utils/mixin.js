// loadMore 的mixin
export const loadMoreMixin = {
	data(){
		return{
			// 是否有更多数据
			hasMoreData:true,
			// more 的状态用于 uni-load-more 组件的使用
			moreStatus:{
				true: 'loading',
				false: 'noMore'
			}
		}
	},
	methods:{
		setHasMore(hasMoreData){
			this.hasMoreData = hasMoreData;
		},
		getHasMore(hasMoreData){
			return hasMoreData;
		}
	}
}

export default {
	loadMoreMixin:loadMoreMixin
}