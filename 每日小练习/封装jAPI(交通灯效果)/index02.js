const traffic = document.querySelector('#traffic')
let num = 0

function poll(...fnlist){
	let stateindex = 0

	return function(...args){
		let fn = fnlist[stateindex++ % fnlist.length] //fn的结果是一个函数，还未被调用
		// console.log('this:',this)
		// console.log(fn)
		return fn.apply(this,args)	//通过apply方法立即调用fn
	}
}

function setState(state){
	traffic.className = state
}
											// ***bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用
let trafficStatePoll = poll(setState.bind(null,'wait'),setState.bind(null,'stop'),setState.bind(null,'pass'))

setInterval(trafficStatePoll,2000)