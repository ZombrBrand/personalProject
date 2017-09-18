<template>
	<div class="warp">
		<div class="searchIpt clearFix">
			<select-input :title="title" :is-show.sync="listShow"></select-input>
			<select-list v-show="listShow" :data="listData" @changeTitle="titleHandle"></select-list>
		</div>
	</div>
</template>

<script>
import selectInput from '@/components/selectinput'
import selectList from '@/components/selectlist'

let listData = [
	{
		title: 'javascript'
	},
	{
		title: 'html+css'
	},
	{
		title: 'jQuery'
	}
]

export default {
	data(){
		return {
			listShow: false,
			listData: listData,
			title: ''
		}
	},
	components: {
		selectInput,
		selectList
	},
	methods: {
		titleHandle(title){
			this.title = title
		}
	}
}

</script>
