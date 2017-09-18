<template>
	<div class="clearFix">
		<input type="text" class="keyWord" :value="titleData" @click="showHandle"/>
		<input type="button" value="搜索" @click="baidu">
		<span></span>
	</div>
</template>

<script>
	export default {
		computed: {
			titleData(){
				return this.$store.state.vuexSelect.title
			},
			getShow(){
				return this.$store.state.vuexSelect.isShow
			}
		},
		methods: {
			showHandle(){
				this.$store.commit('changeIsShow',!this.getShow)
			},
			baidu(){
				// window.location.href = "http://www.baidu.com/s?wd=" + this.titleData
				window.open("http://www.baidu.com/s?wd=" + this.titleData)
			}
		}
	}
</script>
