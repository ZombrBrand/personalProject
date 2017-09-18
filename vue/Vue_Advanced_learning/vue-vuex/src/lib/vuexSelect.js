import axios from 'axios'

let vuexSelect = {
	state: {
		title: '',
		isShow: false,
		listData: []
	},
	mutations: {
		addListData(state,payload){
			state.listData = payload
		},
		changeIsShow(state,payload){
			state.isShow = payload
		},
		changeTitle(state,payload){
			state.title = payload
		}
	},
	actions: {
		getListData({commit}){
			axios.get('http://www.easy-mock.com/mock/59b39382e0dc663341a33b53/example/miaoV')
				.then((data) => {
					// console.log(data)
					commit('addListData',data.data)
				})
				.catch((error) => {
					console.log(error)
				})
		}
	}
}

export default vuexSelect