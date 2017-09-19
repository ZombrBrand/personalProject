import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Es6_1 from '@/components/es6_1'
import Es6_2 from '@/components/es6_2'
import Es6_3 from '@/components/es6_3'

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
		},
		{
      path: '/es6',
      name: 'Es6',
      component: Es6_3
    }
  ]
})
