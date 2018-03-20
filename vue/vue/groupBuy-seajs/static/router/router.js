define(function(require, exports, module) {
	var app = require('../components/app')
	//自定义路由
	function route() {
		var hash = location.hash
		hash = hash.replace(/^#\/?/, '').split('/')

		var map = {
			home: 'home',
			list: 'list',
			detail: 'detail'
		}

		if(map[hash[0]]) {
			app.view = hash[0]
		} else {
			app.view = 'home'
		}

		app.query = hash.slice(1)
	}

	//监听路由变化
	window.addEventListener('hashchange', route)

	//初始化加载页面
	//window.addEventListener('load', route)	//由于load事件要等HTML和CSS加载完成后才会进行，那样会造成空白页
	route()
})