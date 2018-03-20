require('./list.css')
require('./item.css')

module.exports = Vue.extend({
	template: '#list',
	props: ['search'],
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
		this.$http
			.get('./data/list.json', {
				params: {
					id: this.$route.params.id
				}
			})
			.then(function(res) {
				var data = res.data
				if(data && data.errno === 0) {
					this.list = data.data.slice(0, 3)
					this.other = data.data.slice(3)
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