import axios from 'axios'

/**
 * axios基本写法
 */
axios({
		method: 'get', // post && get 
		url: 'xxx'
	})
	.then((response) => {
		console.log(response)
	})
	.catch((error) => {
		console.log(error)
	})

/**
 * API
 */
axios.get('url', {
		params: {
			abc: 'miaov',
			miaov: 'ketang'
		}
	})
	.then((response) => {
		console.log(response)
	})
	.catch((error) => {
		console.log(error)
	})

axios.post('url', {
		miaov: '课堂'
	})
	.then((response) => {
		console.log(response)
	})
	.catch((error) => {
		console.log(error)
	})

/**
 * 自定义请求配置
 */
//将query转字符串的模块
import queryString from 'queryString'

//创建取消请求令牌
let CancelToken = axios.CancelToken
let soure = CancelToken.source()

let HTTP = axios.create({
	baseURL: 'http://www.easy-mock.com/mock/59b39382e0dc663341a33b53/example/',
	timeout: 1000, //延时多少毫秒停止执行
	responseType: 'json',
	params: {
		book: '123'
	},
	headers: {
		'custome-header': 'miaov',
		'content-type': 'application/x-www-form-urlencoded' //转换data展现形式
	},
	transformRequest: [function (data) { //相当于中间件，用作发送数据转换(处理)，data参数为发送的ajax请求的data值
		// console.log(data)
		data.age = 20 //可以在函数里自行添加数据
		return queryString.stringify(data) //必须有返回值，要不是无法将数据传送出去
	}],
	transformResponse: [function (data) { //用作返回数据的转换
		// console.log(data)
		data: abc = 'miaov' //一样可以自行添加返回数据
		return data //必须有返回值，否则请求的的返回值为undefined
	}],
	validateStatus(status) { //判断状态码多少属于成功，多少属于失败；比较少使用
		return status < 400
	},
	CancelToken: source.token //需要使用再进行配置
})

// 使用方法：
HTTP.post('miaov', {
		miaov: 'ketang', //使用queryString.stringify() API只会把数据转成 miaov:ketang username:leo的字符串形式
		username: 'leo' //如果想转成miaov=ketang&username=leo形式，就需要在头部添加content-type
	})
	.then((response) => {
		console.log(response)
	})
	.catch((error) => {
		if (axios.isCancel(error)) { //判断人为取消请求还是服务器请求失败
			console.log(error.message)
		} else {
			console.log(error)
		}

		// 取消请求调用
		source.cancel('用户人为取消操作....')

	})

/**
 * 并发请求
 */
function http1() {
	return HTTP.get('miaov1')
}

function http2() {
	return HTTP.post('miaov2')
}

axios.all([http1(), http2()]) //axios.all(iterable) 并发请求
	.then(axios.spread((res1, res2) => { //axios.spread(callback) 接收并发请求并将返回的请求数据拆分
		console.log(res1)
		console.log(res2)
	}))
	.catch((error) => {
		console.log(error)
	})

/**
 * 全局拦截器
 */
//拦截请求
HTTP.interceptors.request.use(function (config) { //请求拦截，参数为自定义配置项信息
	//在发送请求前做某些事情
	return config //写上返回值才能发送成功
}, function (error) {
	//请求错误时做些事
	return Promise.reject(error)
})

//拦截响应
HTTP.interceptors.response.use()

//取消拦截
HTTP.interceptors.request.eject(myInterceptpor)

/**
 * vue全局引用axios
 */
// npm install axios vue-axios --save
// Vue.use(VueAxios,Axios)
// this.$http[method]()

//如：
this.$http.get('url')
	.then((response) => {
		console.log(response)
	})
	.catch((error) => {
		console.log(error)
	})

//自定义配置使用：
Vue.prototyte.$http = HTTP


/**
 * PS：引用axios有三种方法：
 * 	1.组件单独引用
 * 	2.全局引用
 * 	3.vuex中单独封装，封装在actions函数中，当单独组件需要使用时，直接dispatch('ajaxHandle')进行调用
 * 		(1).	http://www.jb51.net/article/110324.htm	详细使用方式
 */