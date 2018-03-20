require('./home.css')
require('../list/item.css')

module.exports = Vue.extend({
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
		this.$http
			.get('./data/home.json', {
				params: {
					id: this.$route.params.id
				}
			})
			.then(function(res) {
				var data = res.data
				if(data && data.errno === 0) {
					this.ad = data.data.ad
					this.list = data.data.list
				}

			})
	}
})