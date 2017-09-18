<template>
	<ul class="list">
		 <li v-for='item of data' :key="item.title" @click="getData(item.title)">{{ item.title }}</li> 
	</ul>
</template>

<script>
export default {
	props: ['data'],
	methods: {
		getData(title){
			this.$emit('changeTitle',title)
		}
	}
}
</script>

