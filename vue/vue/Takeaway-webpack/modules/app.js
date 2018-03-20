import Vue from 'vue'
import router from './router/router.js'
import store from './store/store.js'
import FastClick from 'fastclick'

import axios from 'axios'
import App from './app.vue'

//注册插件
Vue.prototype.$http = axios

if('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
}

let app = new Vue({
	el: '#app',
	router,
	store,
	data: {},
	template: '<App />',
	components: {
		App
	}
})

window.onload = function() {
	function fn() {
		// 利用rem动态设置响应式
		let $html = document.querySelector('html')

		// 获取文档宽度
		let pageWidth = $html.getBoundingClientRect().width
		$html.style.fontSize = pageWidth / 16 + 'px'
	}

	fn()
}
// 设置1:1像素比
//let ratio = 1 / window.devicePixelRatio
//console.log(ratio)
//document.write('<meta name="viewport" content="width=device-width, initial-scale=' + ratio + ',maximum-scale=' +
//  ratio + ',minimum-scale=' + ratio + '">')

//window.addEventListener("resize", fn, false)