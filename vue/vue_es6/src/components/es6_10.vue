<template>

</template>

<script>
export default {
	data() {
		es6_10()
		return {

		}
	}
}

function es6_10() {
	// 基本写法
	class Person {
		constructor(name, age, job) {
			this.name = name
			this.age = age
			this.job = job
			this.friends = ['Shelby', 'Court']
		}

		sayName() {
			console.log(this.name)
		}
	}
	let person = new Person('张三', 26, '司机')
	person.sayName()

	console.log('========================')

	// 静态方法
	// 可以不用new对象即可以使用的方法
	class Point {
		constructor(x, y) {
			this.x = x
			this.y = y
		}

		static distance(a, b) { //静态方法
			const dx = a.x - b.x
			const dy = a.y - b.y

			return Math.sqrt(dx * dx + dy * dy)
		}
	}
	let p1 = new Point(5,5)
	let p2 = new Point(10,10)

	console.log('静态方法:',Point.distance(p1,p2))

	console.log('========================')

	// ES6明确规定，Class内部只有静态方法，没有静态属性，但可以用另外方式解决 
	class Foo{
		constructor(name,age){
			this.name = name
			this.age = age
		}

		sayName(){
			console.log(this.name)
		}
		sayJob(){
			console.log('静态属性:',Foo.job)
		}
	}
	Foo.job = '司机'	//静态属性

	let f1 = new Foo('李四',26)
	f1.sayJob()

	console.log('========================')

	// 静态属性运用在单例模式中
	class Cache{
		constructor(){
			this.name = '王五'
		}

		static getSingleTon(){
			if(!Cache.thisa){
				Cache.thisa = new Cache();
			}

			return Cache.thisa
		}
	}
	let c1 = Cache.getSingleTon()
	console.log(c1)
	c1.name = '诸葛亮'
	let c2 = Cache.getSingleTon()
	console.log(c2)

	console.log('========================')

	// 继承
	class Animal{
		constructor(name){
			this.name = name
		}

		speak(){
			console.log(this.name + 'make a noise')
		}
	}

	class Dog extends Animal {
		speak(){
			console.log('继承:',this.name + ' barks')
		}
	}
	let dog = new Dog('旺财')
	dog.speak()

}
</script>

