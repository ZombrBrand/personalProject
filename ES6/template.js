// template 模板字符串
	 
console.log('-----template 模板字符串-----')	 

let name = 'peter';
let age = 1;

// console.log('ES5拼接: ' + name + ' is ' + age + ' years old');
// console.log(`ES6拼接: ${name} is ${age} years old`);

var word = print` ${name} is ${age} years old`
function print(str,name,age){
	console.log(str)
	console.log(name)
	console.log(age)

	// 将arguments里的下标从1开始到最后的字符串拼接成数组
	var values = Array.prototype.slice.call(arguments,1);
	var string = '';
	for(var i = 0,len = values.length; i < len; i++){
		string += (str[i] + values[i]);
	}
	string += str[i];
	console.log(string)
}