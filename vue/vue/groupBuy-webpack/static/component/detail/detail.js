require('./detail.css')

module.exports = Vue.extend({
	template: '#detail',
	data: function() {
		return {
			data: ''
		}
	},
	created: function() {
		this.$http
			.get('data/product.json', {
				params: {
					id: this.$route.params.id
				}
			})
			.then(function(res) {
				var data = res.data
				if(data.errno === 0) {
					this.data = data.data
				}
			})
	}
})