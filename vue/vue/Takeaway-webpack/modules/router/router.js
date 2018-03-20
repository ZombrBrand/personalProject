import Vue from 'vue'
import VueRouter from 'vue-router'
import Shop from '../components/shop/shop.vue'
import Product from '../components/product/product.vue'
import Type from '../components/type/type.vue'

Vue.use(VueRouter)


let routes = [{
	path: '/shop/:shopName',
	component: Shop,
	children: [{
		path: 'product',
		redirect: 'product/type/01',
		component: Product,
		children: [{
			path: 'type/:id',
			component: Type
		}]
	}]
	
}
,{
	path: '*',
	redirect: '/shop/dks/product/type/01'
}]


export default new VueRouter({
	routes
})