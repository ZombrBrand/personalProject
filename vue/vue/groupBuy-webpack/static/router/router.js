var Home = require('../component/home/home.js')
var List = require('../component/list/list.js')
var Detail = require('../component/detail/detail.js')

var routes = [{
	path: '/home',
	component: Home
}, {
	path: '/list/:type/:id',
	component: List
}, {
	path: '/detail/:id',
	component: Detail
}, {
	path: '*',
	redirect: '/home'
}]

module.exports = new VueRouter({
	routes: routes
})