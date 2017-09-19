<template>

</template>

<script>
	export default {
		data(){
			es6_5()
			return {

			}
		}
	}

	// iterator遍历器
	function es6_5(){
		// 如果一个数据结构具有遍历器接口，那么就可以依次处理该数据结构的成员。 
		// 当前javascript用来表示集合的数据结构有四种，分别是数组、对象、Set和Map，并且这四种数据结构可以相互嵌套使用，比如数组的成员可以是对象，对象的成员又可以是Set等等。 

		// 如果一个结构具有Symbol.iterator属性，那么就称这个数据结构具有遍历器接口。 
		// Symbol.iterator返回Symbol对象的iterator属性，这是一个预定义好的、类型为Symbol的特殊值。 
		// Symbol.iterator属性指向一个方法，调用此方法返回一个遍历器对象，它是一个指针对象，默认指向数据结构的起始位置。 
		let arr = ["源库网", 4, "www.yuankuwang.com", "北京大学"]
		let it = arr[Symbol.iterator]()

		for(;;){
			let ele = it.next()
			if(ele.done){
				break
			}

			console.log('Symbol.iterator：',ele)
		}

		// 默认具有遍历器接口的数据结构,for of循环 
		// 当对一个数据结构使用for of循环遍历的时候，会自动调用遍历器接口。 
		// ES6中有四类数据结构默认具有遍历器接口: 
		// 数组 
		// 某些类数组 
		// Map 
		// Set 

		// 1.数组
		let arrIterator = [1,2,3,4,5]
		for(let ele of arrIterator){
			console.log('arrIterator：',ele)
		}

		// 2.某些类数组
		let Obj = {
			data: ['aa','bb','cc'],
			[Symbol.iterator](){
				const self = this
				let index = 0
				return {
					next(){
						if(index < self.data.length){
							return {
								value: self.data[index++],
								done:false
							}
						}else{
							return {
								value: undefined,
								done: true
							}
						}
					}
					
				}
			}
		}

		let itObj = Obj[Symbol.iterator]()
		for(;;){
			let ele = itObj.next()
			if(ele.done){
				break
			}

			console.log('itObj：',ele)
		}

		// 如果一个数据结构具有遍历器接口，那么除了可以使用for of循环以外，也可以使用扩展运算符。 
		// let arr = ["源库网", 4, "www.yuankuwang.com"]; 
		console.log('...arr：',...arr); 
	}
</script>

<style>

 
</style>
