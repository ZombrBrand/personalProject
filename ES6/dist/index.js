'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
// var a = 'aaa_aa_a'
// var b = /a+/g
// var c = /a+/y   //y修饰符 粘连符

// var v,i 
// do{
//     v = c.exec(a);
//     document.write(v);
//     document.write('<br/>');
// }while(v != null)

/**
*   数字的判断与扩展
*/
// let a = 22/7;
// let b = Math.pow(2,53);

// console.log(Number.isFinite(a));    //判断是否为数字
// console.log(Number.isNaN(a));       //判断是否为NaN
// console.log(Number.isInteger(a));   //判断是否为正整数
// console.log(Number.isSafeInteger(b)); //判断是否超出js正整数数值范围
// console.log(Number.MAX_SAFE_INTEGER); //获取js最大常数
// console.log(Number.MIN_SAFE_INTEGER); //获取js最小常数

/**
*   Math对象
*/
// Math.trunc(4.1) //去除小数
// Math.sign(1)    //判断正负数
// Math.cbrt(4)    //计算平方根
// Math.clz32(5)   //计算32位2进制
// Math.imul(5,7)  //乘法(用于更高精度的计算)
// Math.hypot()    //返回参数平方和的平方根

/**
*   数组的实例应用
*/
// let json = {
//     '0':'a',
//     '1':'b',
//     '2':'c',
//     length:3
// }
// console.log(Array.from(json));  //将json转换为数组
// console.log(Array.of(1,2,3));   //将文本转化为数组

// let a = [0,1,2,3,4,5,6,7,8,9]
// console.log(a.copyWithin(1,3,5))    //浅复制数组的一部分到同一数组中的另一个位置，并返回它，而不修改其大小,arr.copyWithin(目标索引, [源开始索引], [结束源索引])
// console.log(a.find(u => u > 5));    //查找数组，返回满足条件的第一个值
// console.log(a.fill('*',3,6))        //用一个固定值填充一个数组中从起始索引到终止索引内的全部元素,arr.fill(value, start, end)

// for(let [idx,val] of a.entries()){  //返回一个给定对象自己的可枚举属性[key，value]对的数组
//     console.log(idx,val);
// }

// let b = a.entries();    //手动遍历数组，必须将a.entries()赋值后才能使用obj.next().value;
// console.log("b:",typeof(b))
// console.log(b.next().value);    
// console.log(b.next().value);

/**
*   函数与数组遍历
*/
// var fn = x => console.log(x);   //箭头函数
// var fn1 = x=> {return x}    //使用return必须加大括号

// let json = {
//     'x':1,
//     'y':2
// }
// let arr = [,2,3,4,5]
// console.log('z' in json);   //关键字in,基本用于判断json对象是否拥有该属性
// console.log(0 in arr)   //判断数组是判断当前下标是否存在js类型的值
// console.log(1 in arr)

// let arr1 = [1,2,3,4,5,6,7,,9]
// arr1.forEach((val,idx) => console.log(val,idx));
// arr1.filter(val => console.log(val));
// arr1.some(val => console.log(val));
// console.log(arr1.map(val => 1));

/**
*   对象
*/
var name = 'xxx';
var id = _defineProperty({}, name, 'wos');
console.log(id.xxx);

// ===为同值相等
// Object.is()为严格相等
console.log(+0 === -0);
console.log(NaN === NaN); //由于在同值相等当中，NaN是没有声明类型，所有判断为false;
console.log(Object.is(+0, -0));
console.log(Object.is(NaN, NaN));

// 对象合并
var a = { a: 1 };
var b = { b: 1 };
var c = Object.assign(a, b);
console.log(c);
console.log(Object.keys(c)); //将Object对象的key放在数组中输出