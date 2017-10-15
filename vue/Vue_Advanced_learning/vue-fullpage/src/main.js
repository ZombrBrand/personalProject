// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Fullpage from '@/components/fullpage.vue'
import Page1 from '@/components/page1.vue'
// import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	// template: '<App/>',
	data: {
		bgColor: ['#c90', '#0c9', '#90c', '#9c0']
	},
  components: {
		Fullpage,
		Page1
	}
})
