<template>

</template>

<script>
export default {
	data() {
		es6_9()
		return {

		}
	}
}

// 箭头函数
function es6_9() {

	// 默认是属于return返回值
	let add = (a, b) => a + b
	console.log('默认返回值：', add(2, 3))

	console.log('=================')

	// 无返回值，需要自行return
	let add1 = (a, b) => {
		console.log('无返回值：', a + b)
	}
	add1(3, 3)

	console.log('=================')

	// 箭头函数内部没有constructor方法，也没有prototype，所以不支持new操作。但是它对this的处理与一般的普通函数不一样。箭头函数的 this 始终指向函数定义时的this，而非执行时。

	window.func = function() {
		console.log('window的值')
	}

	let obj = {
		x: 'obj的值',
		func: function() { console.log(this.x) },
		test: function() {
			setTimeout(function() {
				console.log('普通函数的this：', this)
				this.func()
			}, 1000)
		}
	}

	obj.test()

	let obj1 = {
		x: 'obj的值',
		func: function() { console.log(this.x) },
		test: function() {
			setTimeout(() => {
				console.log('======================')
				console.log('箭头函数的this：', this)
				this.func()
			}, 1000)
		}
	}

	obj1.test()
}
</script>

