<template>

</template>

<script>
export default {
	data() {
		es6_7()
		return {

		}
	}
}

// Promise
function es6_7() {
	// Promise对象是一个新的异步操作解决方案，比原有的回调函数等方式更为合理
	// Promise对象具有三种状态：Pending（等待）、Resolved（已完成）和Rejected（未完成）。
	// Promise对象状态的改变只有两种可能：Pending转变为Resolved或者Pending转变为Rejected。

	let text
	function p1(){
		return new Promise(function(resolve,reject){
			setTimeout(function(){
				console.log('aaa')
				text = '第一个'
				reject(text)
			},3000)
		})
	}

	function p2(){
		return new Promise(function(resolve,reject){
			setTimeout(function(){
				console.log(text)
				text = '第二个'
				resolve(text)
			},1000)
		})
	}

	function p3(err){
		return new Promise(function(resolve,reject){
			setTimeout(function(){
				console.log('p1错误：',err)
				console.log(text)
				text = '第三个'
				resolve(text)
			},500)
		})
	}

	p1().then(p2).then(p3).then(function(data){
		console.log(data)
	}).catch(function(err){
		console.log('err：',err)
		p3('p1发生reject')
	})
}
</script>

