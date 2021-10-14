import Vue from 'vue';
import Vuex from 'vuex';
import Search from './modules/search.js';
import user from './modules/user.js'


Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		Search,
		user
	}
})

export default store