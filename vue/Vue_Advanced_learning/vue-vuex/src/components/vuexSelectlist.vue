<template>
	<ul class="list">
		 <li v-for="item in data" :key="item.title" @click="titlehandle(item.title)">{{ item.title }}</li> 
	</ul>
</template>

<script>
	export default {
		computed: {
			data(){
				return this.$store.state.vuexSelect.listData
			}
		},
		methods: {
			titlehandle(title){
				this.$store.commit('changeTitle',title)
			}
		},
		created () {
			this.$store.dispatch('getListData')
		}
	}
</script>
