define(function(require, exprots, module) {
	require('./list.css')
	require('../item.css')
	
	var Util = require('../../util/util')
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
	Vue.component('list', list)
	
	module.exports = list
})