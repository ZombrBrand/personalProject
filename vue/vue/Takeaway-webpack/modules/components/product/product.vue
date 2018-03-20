<template>
	<div class="produect">
		<!--<div class="nav" ref="nav">
			<router-link :to="'/shop/' + $route.params.shopName + '/product/type/' + item.id" v-for="(item,index) in msg" :key="index">{{item.text}}</router-link>
		</div>-->
		<navi></navi>
		<div class="main">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import Navi from '../navi/navi.vue'
	
	export default {
		data() {
			return {}
		},
		components: {
			Navi
		}
	}
</script>

<style lang="less" scoped>
	@import url("product.less");
</style>