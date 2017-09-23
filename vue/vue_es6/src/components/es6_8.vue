<template>

</template>

<script>
export default {
	data(){
		es6_8()
		return {

		}
	}
}

// async函数
function es6_8(){

	let time = 2000

	// await等待的虽然是promise对象，但不必写.then(..)，直接可以得到返回值。
	let sleep1 = function(time){
		return new Promise(function(resolve,reject){
			console.log('执行')
			setTimeout(function(){
				console.log('延迟:',time)
				resolve('resolve返回值')
			},time)
		})
	}

	let start1 = async function(time){
		console.log('start')
		let result = await sleep1(time)
		console.log(result)
		console.log('end')

		// return result
	}

	
	start1(time)
	// start1(time).then(function(data){
	// 	console.log('data：',data)
	// })

	setTimeout(() => console.log('================：1'),time)

	let sleep2 = function(time){
		return new Promise(function(resolve,reject){
			console.log('执行')
			setTimeout(function(){
				console.log('延迟:',time)
				reject('reject返回值')
			},time)
		})
	}

	// 既然.then(..)不用写了，那么.catch(..)也不用写，可以直接用标准的try catch语法捕捉错误
	let start2 = async function(time){
		try {
			console.log('start')
			await sleep2(time)
			console.log('end')
		}
		catch(err){
			console.log('err：',err)
		}	
	}

	setTimeout(() => {
		start2(time)
		setTimeout(() => console.log('================：2'),time)
	},time)


	// await看起来就像是同步代码，所以可以理所当然的写在for循环里，不必担心以往需要闭包才能解决的问题。
	let start3 = async function(time){
		for(let i=0; i <= 5; i++){
			console.log(`当前是第${i}次等待`)
			try {
				await sleep1(time)
			}
			catch(err) {
				console.log('err：',err)
			}
		}

		// await必须在async函数的上下文中的。如果嵌套在普通函数中会报错
		// 错误例子		
		// Array.forEach.apply(null,[1,2,3,4,5]){
		// 	console.log(`当前是第${i}次等待`)
		// 	await sleep1(time)
		// }
	}

	// setTimeout(() => start3(time),time)
	
	
}
</script>

