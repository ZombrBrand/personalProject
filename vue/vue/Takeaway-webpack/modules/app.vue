<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				msg: '主页'
			}
		}
	}
</script>

<style lang="less">
	@import url("app.less");
</style>