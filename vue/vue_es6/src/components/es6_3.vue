<template>

</template>

<script>
	export default {
		data(){
			es6_3()
			return {

			}
		}
	}

	// WeakSet
	function es6_3(){
		// 和Set作用十分相似，对象的值不能重复，不同点在于成员只能是对象
		// 作为WeakSet成员的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于WeakSet之中。这个特点意味着，无法引用WeakSet的成员，因此WeakSet是不可遍历的。   
		// 使用WeakSet存储对象实例的好处是，由于是对对象实例的引用，不会被计入内存回收机制，所以删除实例的时候，不用考虑weakset，也不会出现内存泄漏。

		// 成员不是对象会报错
		// let weakset = new WeakSet()
		// weakset.add(5)

		// 正确写法
		let weakset = new WeakSet()
		let num = new Number(5)
		weakset.add(num)
		console.log(weakset.has(num)) //weakset不能取值，不能显示，只能查询是否有重复的对象

	}
</script>

<style>

 
</style>
