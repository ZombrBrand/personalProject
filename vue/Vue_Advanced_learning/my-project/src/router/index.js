import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import about from '@/components/about'
import document from '@/components/document'
import notfound from '@/components/404'
import study from '@/viewchildren/study'
import silder from '@/viewchildren/silder'
import work from '@/viewchildren/work'
import hobby from '@/viewchildren/hobby'
import user from '@/components/user'

import abc from '@/viewchildren/abc'
// import Hello from '@/components/Hello'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  scrollBehavior(to,from,savePosition){ //触发条件：点击前进后退或切换导航时触发
    // to 进入的目标路由对象、from 离开的路由对象、savePosition记录滚动条坐标，只有在点击前进后退才记录值
    if(to.hash){
      return {
        selector: to.hash
      }
    }
  },
  routes: [
    {
      path: '/',
      component: home,
      meta: {
        index: 1,
        title: 'home'
      }
    },
    {
      path: '/user/:tip?/:userId?',
      component: user,
      meta: {
        index: 4,
        title: 'user'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      alias: '/index'
    },
    {
      path: '/about',     
      component: about,
      children: [
        {
          path: '', //默认子路由
          name: 'about',
          component: study,
          meta: {
            index: 3,
            title: 'about'
          }
        },
        {
          path: 'silder',
          name: 'silder',
          component: silder
        },
        {
          path: 'work',
          name: 'work',
          component: work
        }
      ]
    },
    {
      path: '/document',
      name: 'document',
      beforeEnter(to,from,next){
        // console.log(to.meta.title)
        next()
      },
      components: {
        default: document,
        hobby: hobby,
        abc: abc
      },
      meta: {
        index: 2,
        login: true,
        title: 'document'
      }
    },
    {
      path: '*',
      // component: notfound
      // redirect: '/home'
      // redirect: {path: '/about'}
      // redirect: {name: 'document'}
      redirect: (to) => { //动态设置重定向的目标
        // 目标路由对象
        // console.log(to)
        if(to.path === '/123'){
          return '/home'
        }else if(to.path === '/456'){
          return {path: '/about'}
        }
      }
    }
  ]
})

// router.beforeEach((to,from,next) => {
//   if(to.meta.login){
//     next('/login')
//   }
//   next()
// })

router.afterEach((to,from) => {
  window.document.title = to.meta.title
})

export default router;