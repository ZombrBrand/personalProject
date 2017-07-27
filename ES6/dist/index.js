'use strict';

/**
 * 声明
 */

// let a = 3;
// {
//     let a = 4;
// }

// console.log(a)

/**
 * 数据结构
 */
//数组结构
// let array = [3,5,6]
// let [a,b,c] = [1,2,3];
// let [z,[x,s],v] = [0,[9,8],7];

// let [t,y='hello'] = ['say']; //y为默认值
// document.write(t,y);

// //json结构
// let {a,b} = {a:1,b:2}

// let x
// ({x} = {x:1}) //如果提前声明变量未赋值，在使用ES6数据结构时必须放在括号内才能解析

//字符结构
// const [a,b,c,d,e] = 'hello';
// console.log(a,b,c,d,e)

// function add([a,b=3]){
//     console.log(a+b);
// }
// add([1])

// let json = {
//     a:1,
//     b:2
// }
// let {a,b} = json;

/**
 * 对象扩展运算符和rest运算符的应用
 */
// function a(){
//     console.log(arguments[0]);
//     console.log(arguments[1]);
//     console.log(arguments[2]);
// }
// a(1,2,3)

// // 等同于
// function b(...arg){
//     console.log(arg[0]);
//     console.log(arg[0]);
//     console.log(arg[0]);
// }
// b(1,2,3)

// // ES6方法实现引用类型深拷贝
// let x = [1,2,3];
// let y = [...x,7,8,9];
// console.log(y)  //实现深拷贝
// y.push(12);
// console.log(y);
// console.log(x);

// // rest运算符应用
// function test(first,...arg){ //主要用于多重组件
//     console.log(first);
//     console.log(arg.length);

//     // 新增for循环
//     for(let val of arg){
//         console.log(val)
//     }
// }
// test(1,2,3,4,5,6,7)

/**
 * 字符串模板
 */
// let a = '藿香正气液';
// let b = `${a},云南白药集团生产`;
// document.write(b);

// // ES5查找字符串方法
// console.log(b.indexOf(a));
// // ES6查找字符串方法
// console.log(b.includes(a)); //在字符串中找到即返回true
// console.log(b.startsWith(a)); //在字符串开头找到返回true,反之false
// console.log(b.endsWith(a)); //在字符串结尾找到返回true,反之false

// // ES6新增重复字符串方法
// console.log('hello'.repeat(3));

/**
 * 正则表达式
 */
var a = 'aaa_aa_a';
var b = /a+/g;
var c = new RegExp('a+', 'y'); //y修饰符 粘连符

var v, i;
do {
  v = c.exec(a);
  document.write(v);
  document.write('<br/>');
} while (v != null);