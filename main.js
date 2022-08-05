import Vue from 'vue';
import App from './App';
import store from '@/stroe/index.js';
//配置公共方法防抖
import noMultipleClicks from './utils/noMultipleClicks.js'
Vue.prototype.$noMultipleClicks = noMultipleClicks;

Vue.config.productionTip = false;

App.mpType = 'app';
const app = new Vue({
	store,
    ...App
})
app.$mount()

