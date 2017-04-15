* JS特效部分
	* [关闭状态](https://github.com/lzj222312/personalProject/blob/master/SimulationBox.html)
		* 比较有意思部分是通过冒泡控制父盒子的其中两个按钮去关闭弹出层，而不会作用在父盒子上
	
		`closeBox.addEventListener('click',function(e){`
	        `e.stopPropagation();`
	        `if(hasClass(e.target,'close') || hasClass(e.target,'btn-cancel')) {`
	          `$('.gray').classList.remove('active');`
	        `}`            
	      `});`

		`function hasClass(ele,cls) { `
		  `//找到当前target的className，然后通过!去转成布尔`
		    `return !!ele.className.match(new RegExp('\\b' + cls + '\\b'));`
		  `}`

	* [Tab切换](https://github.com/lzj222312/personalProject/blob/master/TabCutover.html)
	
		* 浏览器解析html会有个问题：
            * 如果下一行开头是用的是{}、[]的话就会自动上移到上一段代码结尾，所以一定要加上';'
            * 如：
             	`var a = function(){}`
             	`[].forEach.call()`
             	`结果解析为：`
             	`a = function(){}[].forEach.call(),这样就会报错`

* JS封装部分
	* [事件封装（兼容）](https://github.com/lzj222312/personalProject/blob/master/eventCompatibility.js)
	* [Ajax封装]()

