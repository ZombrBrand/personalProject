import Vue from 'vue'
import Vuex from 'vuex'

import vuexSelect from '@/lib/vuexSelect'

Vue.use(Vuex)


let store = new Vuex.Store({
	state: {
		count: 100,
	},
	mutations: {	//使用vuex状态值不能直接修改，必须通过mutations进行提交修改
		addIncrement(state,payload){
			state.count += payload.n
		},
		deIncrement(state,payload){
			if(state.count <= 50){
				console.log('不能再减了！')
				return
			}
			state.count -= payload.n
		}
	},
	getters: {	//有点类似computed，可以理解为属于vuex的计算属性
		filterCount(state){
			return state.count <= 120 ? state.count:120
		}
	},
	actions: {	//当使用vuex进行异步请求时，需要用到actions提交mutations
		addAction({commit,dispatch}){	//context参数是一个对象，里面包含了store的所有方法; 因为context是对象可以使用ES6新增的json解构赋值,直接将所需要的方法当作参数即可
			setTimeout(() => {
				// 改变状态，提交mutation
				// context.commit('addIncrement',{n:5})
				//context.dispatch('ajaxAction',{x:10})	//只要使用异步进行请求都需要使用dispatch方法进行触发

				commit('addIncrement',{n:5})
				dispatch('ajaxAction',{x:10})
			},500)
		},
		ajaxAction(context,payload){
			console.log('出发第二次ajax或者异步请求！',payload)
		}
	},
	modules: {
		vuexSelect
	}
})

export default store