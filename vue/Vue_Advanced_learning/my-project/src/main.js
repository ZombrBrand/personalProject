// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/css/app.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App />',
  components: { App }
})

/**
 * 模仿vue-cli router的使用
 */
// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import App from './App'
// import Hello from '@/components/Hello'

// Vue.use(VueRouter)

// let a = 1

// let router = new VueRouter({
//   routes: [{
//     path: '/',
//     name: 'Hello',
//     component: Hello
//   }]
// })

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   template: '<App />',
//   components: {
//     App
//   }
// })
