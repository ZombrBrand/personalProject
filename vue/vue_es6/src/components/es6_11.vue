<template>

</template>

<script>
export default {
	data() {
		es6_11()
		return {

		}
	}
}

// proxy
function es6_11() {

	// Proxy实际上是重载（overload）了点运算符

	let obj = {
		webName: '资源网',
		url: 'www.yuanku.com'
	}

	let p = new Proxy(obj, {
		get: function(target, key) {
			console.log('target:', target)
			return target[key]
		},
		set: function(target, key, value) {
			target[key] = value

			return Reflect.set(target, key, value)
		}

	})

	p.webName = 'yuankuwang'
	console.log(p.webName)

	console.log('=======================')

	class Point {
		constructor() {
			this.id = '1',
				this.name = '张三'
		}
	}
	let point = new Point()

	let p1 = new Proxy(point, {
		get: function(target, key) {
			return target[key]
		},
		set: function(target, key, value) {
			console.log(target)
			if (key == 'id' && value == '15') {
				target['prefix'] = '此人是逃犯' //添加静态属性
			}
			target[key] = value
			if (key == 'name') {
				value = target[key] + ',' + target['prefix']
			}
			return Reflect.set(target, key, value)
		}
	})
	console.log(p1.name)

	p1.id = 15
	p1.name = '李四'
	console.log(p1.name)

	// Proxy对象方法列表:
	// 方法            描述   
	// handler.apply()    拦截Proxy实例作为函数调用的操作。
	// handler.construct()    拦截Proxy实例作为构造函数调用的操作。
	// handler.defineProperty()    拦截Object.defineProperty操作。
	// handler.deleteProperty()    拦截delete删除属性操作。
	// handler.enumerate()    此方法将被废弃，不建议使用。
	// handler.get()    拦截属性的读取操作。
	// handler.getOwnPropertyDescriptor()    拦截Object.getOwnPropertyDescriptor()操作。
	// handler.getPrototypeOf()    拦截获取原型对象操作。
	// handler.has()    拦截属性检索操作。
	// handler.isExtensible()    拦截Object.isExtensible()操作。
	// handler.ownKeys()    拦截Object.getOwnPropertyNames()操作。
	// handler.preventExtensions()    拦截Object.preventExtensions()操作。
	// handler.set()    拦截属性赋值操作。
	// handler.setPrototypeOf()    拦截Object.setPrototypeOf()操作。
	// Proxy.revocable()    创建一个可取消的Proxy实例。

}
</script>

