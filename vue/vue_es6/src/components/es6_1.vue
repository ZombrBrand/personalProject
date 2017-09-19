<template>
	
</template>

<script>
	export default {
		data(){
			es6_1()
			return {

			}
		}
	}

	// 解构赋值
	function es6_1(){
		// 1.数组解构
		let [a,b] = ['aa','bb']
		console.log('a,b:',a,b)

		//	2.嵌套数组解构
		let [c,[d,e]] = ['cc',['dd','ee']]
		console.log('c,d,e:',c,d,e)
		
		// 3.空缺变量
		let [f,,h] = ['ff','gg','hh']
		console.log('f,h:',f,h)

		// 4.多余变量
		let [i,,j] = ['ii','22']
		console.log('j:',j)

		// 5.对象结构
		let obj = new Object
				obj.uid = 121
				obj.uname = '张三'

		let {uid,uname} = obj
		console.log('uid,uname:',uid,uname)

		let {uid:id,uname:name} = obj
		console.log('id,name:',id,name)

		// 提前声明变量必须加小括号，否则{}会被解读为语句块
		let sid,sname
		({uid:sid,uname:sname} = obj)
		console.log('sid,sname:',sid,sname)

		// 6.字符串解构
		let [k,l,m,n] = '倚天屠龙'
		console.log('k,l,m,n:',k,l,m,n)

		// 7.函数解构
		prints(obj)
		function prints({uid,uname}){
			console.log('fn:',uid,uname)
		}
	}
</script>
