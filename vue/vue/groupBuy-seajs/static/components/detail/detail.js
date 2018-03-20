define(function(require, exports, module) {
	require('./detail.css')
	
	var Util = require('../../util/util')
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
	Vue.component('detail', detail)

	module.exports = detail
})