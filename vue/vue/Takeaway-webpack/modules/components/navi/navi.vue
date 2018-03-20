<template>
	<div class="nav" ref="navi">
		<div>
			<router-link :to="'/shop/' + $route.params.shopName + '/product/type/' + item.id" v-for="(item,index) in msg" :key="index">{{item.text}}</router-link>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'

	export default {
		data() {
			return {
				msg: []
			}
		},
		created() {
			this.$http
				.get('data/menu.json')
				.then((res) => {
					let data = res.data
					if(data && data.errno === 0) {
						this.msg = data.data
					}
				})
		},
		mounted() {
			this.$nextTick(() => {
				this.scroll = new BScroll(this.$refs.navi,{
					click: true
				})
			})
		}
	}
</script>

<style lang="less" scoped>
	@import url("navi.less");
</style>