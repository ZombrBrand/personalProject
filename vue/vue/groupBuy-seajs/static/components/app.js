define(function(require, exports, module) {
	require('./app.css')
	require('./home/home')
	require('./list/list')
	require('./detail/detail')
	
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
				history.go(-1) //控制浏览器返回键
			}
		}
	})
	
	module.exports = app
})