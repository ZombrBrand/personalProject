<template>

</template>

<script>
	export default {
		data(){
			es6_4()
			return {

			}
		}
	}

	// Map
	function es6_4(){
		// 它们本质与对象一样，都是键值对的集合，但是他们与Object对象主要的不同是，键可以是各种类型的数值，而Object对象的键只能是字符串类型或者Symbol类型值。
		// Map和WeakMap是更为完善的Hash结构。

		// 对象
		let keyObj = {}
		let obj = {}
		obj[keyObj] = '字符串'
		for(let key in obj){
			console.log('obj.keyObj：',typeof(key))
		}

		// Map
		let mapKeyObj = {}
		let mapObj = new Map(); 
		mapObj.set(mapKeyObj,'字符串')	//添加新元素API
		mapObj.set('deleteEle','删除元素')
		mapObj.forEach((value,key) => {
			console.log('mapObj.mapKeyObj：',typeof(key))
		})

		console.log('get：',mapObj.get('deleteEle')) //获取元素
		console.log('has：',mapObj.has(mapKeyObj))	//判断元素是否存在
		console.log('delete：',mapObj.delete('deleteEle'))	//删除元素
		
		mapObj.clear()	//清空
		console.log(mapObj)

		// 数组作为构造参数
		let mapData = new Map([['webName','资源库'],['url','www.yuankuwang.com']])
		mapData.forEach((value,key) => {
			console.log(`mapData：key=${key},value=${value}`)
		})

		// 由于Map对象的键可以是对象，所以只有对同一个对象的引用，Map对象才将其视为同一个键。 
		// NaN不严格相等于自身，但Map将其视为同一个键 
		let mapNaN = new Map(); 
		mapNaN.set(NaN, 5); 
		console.log('mapNaN：',mapNaN.get(NaN)); 
		mapNaN.set(-0, 5); 
		console.log('mapNaN：',mapNaN.get(+0)); 

		// Map遍历
		// 转成数组
		let mapArr = new Map([['webName','资源库'],['url','www.yuankuwang.com']])
		let arr = [...mapArr]
		console.log('mapArr：',arr)

		// for..of
		for(let ele of mapArr){
			console.log('for...of：',ele)
		}

		// 键遍历器
		let keyIterator = mapArr.keys()
		console.log('keyIterator：',keyIterator)

		// 值遍历器
		let valueIterator = mapArr.values()
		console.log('valueIterator：',valueIterator)

		// 遍历器用法
		console.log('next()：',keyIterator.next())
		console.log('next()：',keyIterator.next())

		// 键值对数量
		console.log('size：',mapArr.size)


		// WeakMap
		// WeakMap结构与Map结构基本类似。 
		// 区别是它只接受对象作为键名，不接受其他类型的值作为键名。键名是对象的弱引用，当对象被回收后，WeakMap自动移除对应的键值对，WeakMap结构有助于防止内存泄漏。
		// 由于WeakMap对象不可遍历，所以没有size属性
		let wm = new WeakMap()
		let wmObj = {}
		wm.set(wmObj,'对象')
		console.log('wm.get(wmObj)：',wm.get(wmObj))
		console.log('wm.has(obj)：',wm.has(obj))

		wmObj = null
		console.log('wm.get(wmObj)：',wm.get(wmObj))
		console.log('wm.has(obj)：',wm.has(obj))

	}
</script>
