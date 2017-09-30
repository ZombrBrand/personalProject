// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'

let url = 'http://rap.taobao.org/mockjsdata/11037/slide/listSlides.do?'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // template: '<App/>',
  components: {
    App
  },
  data: {
    msg: 'lifecycle',
    imgs: null
  },
  methods: {
    getLists() {
      axios.post(url).then((res) => {
				console.log(res)
        this.imgs = res.data.data.slideList
      })
    },
    init() {
			// do something
			console.log('初始化数据')
    }
  },
  beforeCreate() {
    // console.log('beforeCreate：',this.msg,this.getLists)
  },
  created() { //异步数据和初始化适宜在created的钩子中调用
		this.getLists()
		this.init()
  },
  beforeMount() {

  },
  mounted() {

  },
  beforeUpdate() {

  },
  updated() {

  },
  beforeDestroy() {

  },
  destroyed() {

  },
  activated() {

  },
  deactivated() {

  }
})
