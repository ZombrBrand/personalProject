<template>
	<div class="type" ref="type">
		<ul id="move">
			<li v-for="(item,index) in msg" :key="index" class="clearfix">
				<div>
					<img v-if="item.img" :src="'img/item/' + item.img" alt="" />
				</div>
				<div class="main-right">
					<h4 class="title">{{item.title}}</h4>
					<p class="sales">已售{{item.sales}}份</p>
					<span class="add f-r" @click="add(item)">+</span>
					<span class="num f-r" v-show="item.num > 0">{{item.num}}</span>
					<span class="red f-r" @click="red(item)" v-show="item.num > 0">-</span>
					<p class="price">￥{{item.price}}</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	
	export default {
		data() {
			return {
				msg: [],
				//缓存请求过的商品列表,减少请求，缓解服务器压力
				allCommodityCach: {}
			}
		},
		created() {
			this.getData()
		},
		mounted() {
			this.scroll = new BScroll(this.$refs.type,{
					click: true
				})
		},
		methods: {
			add(item) {
				item.num = +item.num + 1
				this.$store.commit('addNum', item.price)
			},
			red(item) {
				item.num = item.num - 1
				this.$store.commit('redNum', item.price)
			},
			getData() {
				let id = this.$route.params.id
				
				if(this.allCommodityCach[id]) {
					this.msg = this.allCommodityCach[id]
					return
				}

				this.$http
					.get("data/" + id + ".json")
					.then((res) => {
						let data = res.data
						if(data && data.errno === 0) {
							this.msg = data.data
							this.allCommodityCach[id] = data.data
						}
					})
			}
		},
		watch: {
			$route() {
				this.getData()
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url("type.less");
</style>