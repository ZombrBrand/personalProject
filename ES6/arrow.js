// 箭头函数
let say = name => name
let say = (name,age) => {
	var a = 5;
	return `${name} ${age} ${5}`
}
// 相当于
// function say(name){
// 	return name;
// }
 
// 由于浏览器不支持ES6语法，故需要安装插件将ES5转ES5
// npm install -g babel-cli
// npm install --save-dev babel-preset-es2015

// 新建配置文件.babelrc
// {
// 	'presets': ['es2015'],
// 	'plugins': []
// }

// babel常用命令：
// 	babel -o 输出到一个文件 `babel mobile.js -o mobile.build.js`
// 	babel -w 提供watch方法 `babel -w mobile.js -o mobile.build.js`
// 	babel -s 生成sourcemap `babel -s -w mobile.js -o mobile.build.js`
// 	babel -d 指定要编译的目录 `babel -d es5/ es6/`