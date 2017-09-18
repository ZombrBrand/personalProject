<template>
	<div class="warp">
		<div class="searchIpt clearFix">
			<select-input></select-input>
			<select-list v-show="isShow"></select-list>
		</div>
	</div>
</template>

<script>
	import selectInput from '@/components/vuexSelectinput'
	import selectList from '@/components/vuexSelectlist'

	export default {
		computed: {
			isShow(){
				return this.$store.state.vuexSelect.isShow
			}
		},
		components: {
			selectInput,
			selectList
		}
	}
</script>

