// 全局声明严格模式,如果不使用严格模式，let声明会报错
'use strict'

// let 
// 1.声明未赋值，表现相同
var test1 = function(){
	var a;
	let b;

	console.log('------1-----');
	console.log(a);	//	undefined
	console.log(b);	//	undefined
}

// 2.使用未声明变量
var test2 = function(){
	console.log('------2-----');
	console.log(a);	//	undefined
	console.log(b);	//	b is not defined

	var a = 1;	//	var会做变量提升
	// let b = 1;
}

//	3.重复声明同一变量
var test3 = function(){
	var a = 1;
	let b = 1;

	var a = 10;
	// let b = 10;

	console.log('------3-----');
	console.log(a);	//	10, var声明最后一个变量会覆盖上一个
	console.log(b);	//	let声明会报错
}

// 4.变量作用范围
var test4 = function(){
	var a = 1;
	let b = 1;

	{
		var a = 10;
		let b = 10;
	}


	console.log('------4-----');
	console.log(a);	//	10, var声明最后一个变量会覆盖上一个
	console.log(b);	//	1,内部的声明和外部声明变量不一样
}