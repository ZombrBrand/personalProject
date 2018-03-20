import Vue from 'vue'
import Vuex,{ Store } from 'vuex'

Vue.use(Vuex)

export default new Store({
	state: {
		price: 0
	},
	mutations: {
		addNum(store, price) {
			store.price += +price
		},
		redNum(store, price) {
			store.price -= price
		}
	}
})
