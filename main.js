import Vue from 'vue'
import App from './App'
import store from './store'

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import Request from './utils/luch-request/index.js' 
Vue.prototype.$http = new Request()

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
		store
})
app.$mount()

 

