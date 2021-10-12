import Vue from 'vue';
import Vuex from 'vuex';
import Search from './modules/search.js';
import User from './modules/user.js'


Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		Search,
		User
	}
})

export default store