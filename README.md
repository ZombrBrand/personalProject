* JS特效部分
	* [关闭弹出层源码](https://github.com/lzj222312/personalProject/blob/master/JS%E7%89%B9%E6%95%88%E9%83%A8%E5%88%86/SimulationBox.html)
		* [效果](https://lzj222312.github.io/personalProject/JS%E7%89%B9%E6%95%88%E9%83%A8%E5%88%86/SimulationBox.html)
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

	* [Tab切换源码](https://github.com/lzj222312/personalProject/blob/master/JS%E7%89%B9%E6%95%88%E9%83%A8%E5%88%86/TabCutover.html)
		* [效果](https://lzj222312.github.io/personalProject/JS%E7%89%B9%E6%95%88%E9%83%A8%E5%88%86/TabCutover.html)
	
		* 浏览器解析html会有个问题：
            * 如果下一行开头是用的是{}、[]的话就会自动上移到上一段代码结尾，所以一定要加上';'
            * 如：
             	`var a = function(){}`
             	`[].forEach.call()`
             	`结果解析为：`
             	`a = function(){}[].forEach.call(),这样就会报错`

* JS封装部分
	* [事件封装（兼容）](https://github.com/lzj222312/personalProject/blob/master/JS%E5%B0%81%E8%A3%85%E9%83%A8%E5%88%86/eventCompatibility.js)
	* [Ajax封装](https://github.com/lzj222312/personalProject/blob/master/JS%E5%B0%81%E8%A3%85%E9%83%A8%E5%88%86/ajax.js)

