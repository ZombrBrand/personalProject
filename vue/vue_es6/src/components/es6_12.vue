<template>

</template>

<script>
export default {
	data() {
		es6_12()
		return {

		}
	}
}

// Decorator修饰器
function es6_12() {

	// 修饰器（Decorator）是一个函数，用来修改类的行为。这是ES7的一个提案，目前Babel转码器已经支持。
	// 需要先安装一个插件：
	// npm install babel- plugin - transform - decorators - legacy--save- dev
	// 然后在项目根目录下，找到：.babelrc => 修改为
	// "plugins": ["transform-runtime", "transform-decorators-legacy"]

	// 给类添加静态属性和方法
	function chooseCourse(target) {
		target.cours = '物理'
	}
	function classroom(target) {
		target.study = function() {
			console.log(target.cours + '学习')
		}
	}

	@chooseCourse
	@classroom
	class Student {
	}
	Student.study()	//由于使用修饰器添加的是静态属性和方法，所以直接使用类名而不是实例去调用

	console.log('===================')

	// 修饰器带参数
	function choose(courseName) {
		return function(target) {
			target.courseName = courseName
		}
	}
	function room(roomName) {
		return function(target) {
			target.study = function() {
				console.log('在' + roomName + '学习' + target.courseName)
			}
		}
	}
	@room('家里')
	@choose('数学')
	class Student1 {
	}
	Student1.study()

	console.log('===================')

	// 修饰器不仅可以修饰类，还可以修饰类的方法(属性)  
	function course(courseName) {
		return function(target) {
			console.log('检查准考证：' + target.uid)
			//this指针发生偏移,因为类实例化，this指针发生改变，指向构造函数中的uid，而target指向的是类中的静态属性，所以是undenfined

			target.courseName = courseName
		}
	}

	class Student2 {
		constructor() {
			this.uid = 15
		}
		@course('化学')
		exam() {
			console.log(this.uid + '号，考试，考：' + this.courseName)
		}
	}

	let student = new Student2()
	student.exam()

	// 修饰器只能用于类和类的方法，不能用于函数，会导致函数提升而发生错误
	// //---------错误-------------------------  
	// @chooseCourse('物理')
	// function Teacher() {
	// 	teach(){  
	// 		console.log('讲师教:' + this.courseName);
	// 	}
	// }
	// Teacher.teach();

	// 装饰模式与代理模式的差别  
	// 装饰器模式关注于在一个对象上动态的添加方法，然而代理模式关注于控制对对象的访问。换句话 说，用代理模式，代理类（proxy class）可以对它的客户隐藏一个对象的具体信息。因此，当使用代理模式的时候，我们常常在一个代理类中创建一个对象的实例。并且，当我们使用装饰器模 式的时候，我们通常的做法是将原始对象作为一个参数传给装饰者的构造器。

	// 使用代理模式，代理和真实对象之间的的关系通常在编译时就已经确定了，而装饰者能够在运行时递归地被构造。
}
</script>
