const traffic = document.querySelector('#traffic')
let num = 0

function poll(...fnlist){
	let stateindex = 0

	return function(...args){
		let fn = fnlist[stateindex++ % fnlist.length]
		// console.log('poll:'+ num++,this)
		// console.log(args)
		// console.log(fn)
		// console.log(fn.apply(this,args))
		return fn.apply(this,args)
	}
}

function setState(state){
	traffic.className = state
}

let trafficStatePoll = poll(setState.bind(null,'wait'),setState.bind(null,'stop'),setState.bind(null,'pass'))

setInterval(trafficStatePoll,2000)