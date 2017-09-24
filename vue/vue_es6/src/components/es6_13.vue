<template>

</template>

<script>
export default {
	data() {
		es6_13()
		return {

		}
	}
}

// model模块
function es6_13() {
	// 所谓的模块就是一个独立的文件，文件与文件之间是相互封闭的。
	// //--------modeltest.js------------
	// export var webName = "源库网";
	// export let url = "www.yuanku.com";
	// export const year = 2016;
	// // export {
	// //   webName as web, 
	// //   url as webUrl, 
	// //   year as webYear
	// // }

	// export function add(a, b) {
	// 	return a + b;
	// }

	// export default class User {
	// 	constructor() {
	// 		console.log('user被创建了');
	// 	}
	// }
	// //-----------Hello.vue----------------------
	// //import User,{webName, url, year,add} from '../models/modeltest.js';
	// //import User,* as uu from '../models/modeltest.js';
	// //var mt = require('../models/modeltest.js');
	// import Student, * as uu from '../models/modelChild.js';

	// console.log('webName:' + uu.webName);
	// console.log('add:' + uu.add(9, 12));
	// var user = new uu.User();  //继承中如果有default前缀,降无法访问
	// var student = new Student();
	// // console.log(mt.webName);
	// // console.log(mt.url);
	// // console.log(mt.age);
	// // console.log(mt.add(3,4));

	// //------------modelChild.js(继承)---------------------
	// export { webName, url, year, add, User } from './modeltest.js'; //User类的default必须去掉，否则无法访问

	// export default class Student {
	// 	constructor() {
	// 		console.log('Student被创建了');
	// 	}
	// }

	// //------------------require和import差别-------------------------
	// require相当于module.exports的传送门，module.exports后面的内容是什么，require的结果就是什么，对象、数字、字符串、函数……再把require的结果赋值给某个变量，相当于把require和module.exports进行平行空间的位置重叠。

	// 而且require理论上可以运用在代码的任何地方，甚至不需要赋值给某个变量之后再使用，比如：

	// require('./a')(); // a模块是一个函数，立即执行a模块函数
	// var data = require('./a').data; // a模块导出的是一个对象
	// var a = require('./a')[0]; // a模块导出的是一个数组

	// 在使用时，完全可以忽略模块化这个概念来使用require，仅仅把它当做一个node内置的全局函数，它的参数甚至可以是表达式：
	// require(process.cwd() + '/a');

	// 但是import则不同，它是编译时的（require是运行时的），它必须放在文件开头，而且使用格式也是确定的，不容置疑。它不会将整个模块运行后赋值给某个变量，而是只选择import的接口进行编译，这样在性能上比require好很多。

	// 从理解上，require是赋值过程，import是解构过程

	// ES7很快也会发布，js引擎们会尽快实现ES6标准的规定，如果一个引擎连标准都实现不了，就会被淘汰， ES6是迟早的事 。如果你现在仍然在代码中部署require，那么等到ES6被引擎支持时，你必须升级你的代码，而如果现在开始部署import，那么未来可能只需要做很少的改动。
}
</script>

