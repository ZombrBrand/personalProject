//定义工具
var Util = {
	ajax: function(method, url, fn) {
		method = method || 'get'
		var xhr = new XMLHttpRequest
		xhr.onreadystatechange = function() {
			if(xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
				fn(JSON.parse(xhr.responseText))
			}
		}
		xhr.open(method, url, true)
		xhr.send(null)
	}
}

//1.定义组建类
var home = Vue.extend({
	template: '#home',
	data: function() {
		return {
			types: [{
					id: 1,
					url: 'img/icon/01.png',
					text: '美食'
				},
				{
					id: 2,
					url: 'img/icon/02.png',
					text: '电影'
				},
				{
					id: 3,
					url: 'img/icon/03.png',
					text: '酒店'
				},
				{
					id: 4,
					url: 'img/icon/04.png',
					text: '休闲'
				},
				{
					id: 5,
					url: 'img/icon/05.png',
					text: '外卖'
				},
				{
					id: 6,
					url: 'img/icon/06.png',
					text: 'ktv'
				},
				{
					id: 7,
					url: 'img/icon/07.png',
					text: '周边游'
				},
				{
					id: 8,
					url: 'img/icon/08.png',
					text: '丽人'
				},
				{
					id: 9,
					url: 'img/icon/09.png',
					text: '小吃'
				},
				{
					id: 10,
					url: 'img/icon/10.png',
					text: '火车票'
				}
			],
			ad: [],
			list: []
		}
	},
	created: function() {
		var _this = this
		Util.ajax('get', './data/home.json', function(res) {
			if(res && res.errno === 0) {
				var data = res.data
				_this.ad = data.ad
				_this.list = data.list
			}
		})
	}
})

var list = Vue.extend({
	template: '#list',
	props: ['query', 'search'],
	data: function() {
		return {
			order: [{
					id: 'price',
					text: '价格排序'
				},
				{
					id: 'sales',
					text: '销量排序'
				},
				{
					id: 'evaluate',
					text: '好评排序'
				},
				{
					id: 'discount',
					text: '优惠排序'
				}
			],
			list: [],
			other: [],
			toggle: true
		}
	},
	created: function() {
		var _this = this
		var query = '?id=' + this.query[1]
		Util.ajax('get', './data/list.json' + query, function(res) {
			if(res && res.errno === 0) {
				var data = res.data
				_this.list = data.slice(0, 3)
				_this.other = data.slice(3)
			}
		})
	},
	computed: {
		listFilter: function(v) {
			var _this = this
			_this.other = _this.other.filter(function(item) {
				return item.title.indexOf(_this.search) >= 0
			})
			return _this.list.filter(function(item) {
				return item.title.indexOf(_this.search) >= 0
			})
		}
	},
	methods: {
		showList: function() {
			this.list = this.list.concat(this.other)
			this.other = []
		},
		orderList: function(value) {
			if(value === "discount") {
				this.list.sort(function(a, b) {
					a = a['originPrice'] - a['price']
					b = b['originPrice'] - b['price']

					return a - b
				})
			}

			if(this.toggle) {
				this.list.sort(function(a, b) {
					return a[value] - b[value]
				})
				this.toggle = false
			} else {
				this.list.sort(function(a, b) {
					return b[value] - a[value]
				})
				this.toggle = true
			}
		}
	}
})

var detail = Vue.extend({
	template: '#detail',
	props: ['query'],
	data: function() {
		return {
			data: ''
		}
	},
	created: function() {
		var _this = this
		var query = '?id=' + this.query[0]
		Util.ajax('get', 'data/product.json', function(res) {
			if(res && res.errno === 0) {
				_this.data = res.data
			}
		})
	}
})

Vue.component('home', home)
Vue.component('list', list)
Vue.component('detail', detail)

var app = new Vue({
	el: '#app',
	data: {
		view: '', //不要设定字符串值，否则会导致去到该字符串值页面的时候不重新渲染使得组建不进行通信
		query: [],
		search: '',
		searchValue: ''
	},
	methods: {
		seachResult: function() {
			if(this.search === '') {
				return
			}
			this.searchValue = this.search
			this.search = ''
		},
		goBack: function() {
			console.log(1)
			history.go(-1) //控制浏览器返回键
		}
	}
})

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