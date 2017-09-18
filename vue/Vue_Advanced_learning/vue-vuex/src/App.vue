<template>
	<div id="app">
		<ul class="nav">
			<router-link to="/select" tag="li">原生双向数据搜索组件</router-link>
			<router-link to="/cal" tag="li">简易计算器</router-link>
			<router-link to="/vuexselect" tag="li">vuex绑定数据搜索组件</router-link>	
		</ul>
		<transition mode="out-in" name="fade">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'app'
}
</script>


