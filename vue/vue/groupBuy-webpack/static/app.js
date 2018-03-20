var router = require('./router/router.js')

require('./app.css')

var app = new Vue({
	el: '#app',
	router: router,
	data: {
		search: '',
		searchValue: ''
	},
	computed: {
		searchShow: function() {
			return this.$route.path.indexOf('detail') < 0
		}
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