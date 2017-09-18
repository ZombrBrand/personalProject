import Vue from 'vue'
import Router from 'vue-router'
import Select from '@/components/select'
import Calculator from '@/components/calculator'
import vuexSelect from '@/components/vuexSelect'
// import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
		{
			path: '/',
			name:	'Select',
			component: Select
		},
    {
      path: '/select',
      name: 'Select',
      component: Select
		},
		{
			path:	'/cal',
			name: 'Calculator',
			component: Calculator
		},
		{
			path: '/vuexselect',
			name: 'vuexSelect',
			component: vuexSelect
		}
  ]
})
