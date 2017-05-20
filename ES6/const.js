// const	常量
// 使用const声明变量，非引用类型不能改变值，引用类型可以
	
console.log('-----const	常量-----')	 

const a = 10;
a = 20;
// console.log(a);	//	会报错Assignment to constant variable.

const obj = {name:'peter',age:'1'}

obj.age = 10;

console.log(obj); //	{name:'peter',age:'10'}