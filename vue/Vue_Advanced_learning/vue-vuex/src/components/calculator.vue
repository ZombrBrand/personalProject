<template>
	<div class="calculator">
		<h1>简易计算器</h1>
		<input type="button" value="-" @click="deIncrement({n:10})">
		<span>{{ count }}</span>
		<input type="button" value="+" @click="addIncrement">
		 <p>{{ num2 }}</p> 
	</div>
</template>

<script>
// export default {	
// 	computed: {
// 		count(){
// 			return this.$store.state.count
// 		},
// 		num2(){
// 			return this.$store.getters.filterCount
// 		}
// 	},
// 	methods: {
// 		addIncrement(){
// 			// $store.commit是提交mutations的API
// 			// this.$store.commit('addIncrement',{
// 			// 	n:5
// 			// })

// 			// 当出现异步请求时（如ajax）就要使用$store.dispatch这个API触发actions的函数
// 			this.$store.dispatch('addAction')
// 		},
// 		deIncrement(){
// 			this.$store.commit({
// 				type:	'deIncrement',
// 				n: 10
// 			})
// 		}
// 	}
// }

import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'

export default {
  // computed: mapState({	//使用这种方法时，computed无法再添加function
	// 	// num: state => state.count
	// 	// num: 'count'
	// 	num(state){
	// 		return state.count
	// 	}
	// })
	// computed: mapState(['count'])
	computed: {	//使用ES6拓展运算符的rest运算符来拓展多个组件
		abc(){
			return 123
		},
		...mapGetters({
			num2: 'filterCount'
		}),
		...mapState(['count'])
	},
	methods: {
		...mapActions({
			addIncrement:	'addAction'
		}),
		...mapMutations({	//当使用辅助函数在自定义函数中传参必须在标签的事件中传参
			deIncrement: 'deIncrement'
		})
	}
}
</script>
