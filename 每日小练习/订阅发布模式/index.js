var EventCenter = (function(){
	var event = {}

	// 保存回调
	// 1.查看对象中该key是否存在，存在即替换
	// 2.将handle保存在对应的key中
	function on(evt,handle){
		event[evt] = event[evt] || []
		event[evt].push({
			handle:handle
		})
	}

	// 调用相应的回调
	// 1.查看回调是否存在，不存在跳出调用
	// 2.回调存在，执行回调
	function fire(evt,args){
		if(!event[evt]){
			return
		}
		for(var i=0; i<event[evt].length; i++){
			event[evt][i].handle(args)
		}
	}

	return {
		on:on,
		fire:fire
	}
})()