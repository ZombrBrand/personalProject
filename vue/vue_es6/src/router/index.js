import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Es6_1 from '@/components/es6_1'
import Es6_2 from '@/components/es6_2'
import Es6_3 from '@/components/es6_3'
import Es6_4 from '@/components/es6_4'
import Es6_5 from '@/components/es6_5'
import Es6_6 from '@/components/es6_6'
import Es6_7 from '@/components/es6_7'
import Es6_8 from '@/components/es6_8'
import Es6_9 from '@/components/es6_9'
import Es6_10 from '@/components/es6_10'
import Es6_11 from '@/components/es6_11'

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
      component: Es6_11
    }
  ]
})
