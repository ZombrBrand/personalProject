<template>

</template>

<script>
export default {
	data() {
		es6_6()
		return {

		}
	}
}

// Generator
function es6_6() {
	// Generator函数指的是一种新的语法结构,是一个遍历器对象生成器,它内部可以封装多个状态，非常适合用于异步操作。
	// Generator函数语法和普通的function函数类似，但是有三个不同点: 
	// 	（1）function关键字和函数名称之间有一个星号（*）。 
	// 	（2）函数体内可以使用yield语句。 
	// 	（3）函数调用后不会立即执行，返回的是一个遍历器对象。

	function* yuanku1() {
		yield '资源网'
		yield '北京海淀'
		yield 'www.yuankuwang.com'
		yield 'end'
	}

	let y = yuanku1()
	for (let i = 0; i < 4; i++) {
		console.log(y.next())
	}

	console.log('================')

	// yield语句: 
	// 每一个yield语句定义不同的状态,它也是一个代码执行暂停标识。 
	// yield语句不能在普通函数中使用，否则会报错。 
	// 调用Generator函数可以返回一个遍历器对象,要想访问Generator函数中的每一个状态，需要使用遍历器对象调用next()方法。 

	// 如果yield语句作为其他语句的一部分，那么必须使用小括号包裹，否则会报错 
	function* yuanku2() {
		//console.log("欢迎来到" + yield "源库网");//报错 
		console.log("欢迎来到" + (yield "源库网"));//正确 
	}
	let y1 = yuanku2();
	console.log(y1.next().value);
	console.log(y1.next().value);

	console.log('================')

	// next()方法:
	// next()一个主要功能，就是从暂停状态继续下一段代码的执行。
	// next()还有一个重要的功能，那就是可以接受一个参数，此参数作为上一个yield语句的返回值。
	// 虽然当代码执行到yield语句的时候，能够将其后面的表达式的值作为对象的value属性值，但是默认情况下yield语句是没有返回值的，或者说它的返回值是undefined
	function* yuanku3() {
		let x = 2 * (yield "你好");
		console.log(x);
	}
	var y2 = yuanku3();
	console.log(y2.next());
	y2.next(5);

	console.log('================')

	// 异步方法实测
	let y3;
	var func = function(time) {
		setTimeout(function() {
			console.log(time, "  on");
			y3.next(true);
		}, time);
	};

	var gen = function* () {
		var f1 = yield func(3000);
		console.log('f1:', f1);
		var f2 = yield func(1000);
		console.log('f2:', f2);
	};

	y3 = gen();

	y3.next();
	console.log('end');
}

</script>

