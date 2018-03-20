define(function(require, exports, module) {
	require('./home.css')
	require('../item.css')
	
	var Util = require('../../util/util')
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
	Vue.component('home', home)
	
	module.exports = home
})