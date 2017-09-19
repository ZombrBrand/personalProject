<template>
</template>

<script>
	export default {
		data(){
			es6_2()
			return {
				
			}
		}
	}

	// set
	function es6_2(){	
		let set = new Set([1,2,3,4,2,8,4])
		for(let ele of set){
			console.log('第一步：',ele)
		}

		console.log('================');

		// add添加赋值
		[5,6].map(function(ele){
			set.add(ele)
		})
		for(let ele of set){
			console.log('第二步：',ele)
		}

		console.log('================');

		// 扩展运算符
		let arr = [...set] //扩展运算符内部自行使用for循环遍历
		console.log('扩展运算符：',arr)

		console.log('================');

		// 遍历键值
		set.forEach((val,key) => console.log(`遍历键值：${val} == ${key}`))

		console.log('================');

		// 长度
		console.log('set长度：',set.size)

		console.log('================');

		// es5新增的map和filter也可以用于set中
		let setMap = [...set].map(x => x * 2)
		console.log('setMap：',setMap)

		let setFilter = [...set].filter(x => x > 4)
		console.log('setFilter：',setFilter)

		// 清空、删除
		set.delete(8)
		console.log('delete：',[...set])

		set.clear()
		console.log('clear：',[...set])
	}
</script>

