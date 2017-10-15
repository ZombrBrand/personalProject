// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'

let url = 'http://rap.taobao.org/mockjsdata/11037/slide/listSlides.do?'

Vue.config.productionTip = false

/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  // template: '<App/>',
  components: {
    App
  },
  data: {
    msg: 'lifecycle',
    imgs: [1, 2, 3]
  },
  methods: {
    getLists() {
      axios.post(url).then((res) => {
        this.imgs = res.data.data.slideList
      })
    },
    init() {
      // do something
      console.log('初始化数据')
    }
  },
  beforeCreate() { //在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
    // console.log('beforeCreate：',this.msg,this.getLists)
  },
  created() { //异步数据和初始化适宜在created的钩子中调用
    // this.getLists()
    // this.init()
    setTimeout(() => {
      this.imgs = [4, 5, 6, 7]
      this.$nextTick(() => {	//如果需要将异步请求单独做处理可以使用nextTick方法去操作
        console.log('nextTick：', document.querySelectorAll('li').length)
      })
		})

		setTimeout(() => {
      this.imgs = [14, 15, 16, 17, 18]
      this.$nextTick(() => {
        console.log('nextTick：', document.querySelectorAll('li').length)
      })
    })
  },
  beforeMount() { //在挂载开始之前被调用：相关的 render 函数首次被调用。该钩子在服务器端渲染期间不被调用。
    console.log('beforeMount：', document.querySelectorAll('li').length)
  },
  mounted() { //初始数据DOM挂载渲染完成,只能操作初始数据，但对于异步数据却无法获取
    console.log('mounted：', document.querySelectorAll('li').length)
  },
  beforeUpdate() {

  },
  updated() { //异步数据渲染完成，如果想对数据做统一处理，就在此生命周期里操作
    console.log('updated：', document.querySelectorAll('li').length)
  },
  beforeDestroy() {	//组件被停用前调用
		console.log('====beforeDestroy====')
  },
  destroyed() {	//组件被停用时调用
		console.log('====destroyed====')
  },
  activated() {

  },
  deactivated() {

	},
	watch: {	//对某个数据变化可以统一处理
		'imgs': function(){

		}
	}
})

// 停止实例或者组件方法
// vm.$destroy()