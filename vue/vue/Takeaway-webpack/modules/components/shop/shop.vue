<template>
	<div class="shop">
		<header>
			<h3>{{msg.title}}</h3>
			<p>
				<img v-if="msg.logo" :src="'img/' + msg.logo"/>
				<span>{{msg.info}}</span>
			</p>
		</header>
		<div class="nav">
			<router-link :to="'/shop/'+ msg.store + '/' + item.id" v-for="(item,index) in msg.menu" :key="index">{{item.text}}</router-link>
		</div>	
		<router-view></router-view>
		
		<footer>
			<span>共￥{{price}}元</span>
			<span class="ready">选好了</span>
		</footer>
	</div>
</template>

<script>	
	export default {
		data: () => {
			return {
				msg: {}
			}
		},
		created() {
			this.$http
				.get('data/' + this.$route.params.shopName + '.json')
				.then((res) => {
					let data = res.data
					if(data.errno === 0) {
						this.msg = data.data
					}
				})
		},
		computed: {
			price() {
				return this.$store.state.price
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url("shop.less");
</style>