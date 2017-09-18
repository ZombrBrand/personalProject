<template>
	<div class="clearFix">
		<input type="text" class="keyWord" @click="isShowHandle" :value="title"/>
		<input type="button" value="搜索">
		<span></span>
	</div>
</template>

<script>
export default {
	props: ['isShow','title'],
	computed: {
		initShow(){
			return this.isShow
		}
	},
	methods: {
		isShowHandle(){
			this.$emit('update:isShow',!this.initShow)
		}
	}
}
</script>
