// 创建蒙层
let _loading = '<div id="loadingDiv" style="width:100%;height:100%;background-color:#ccc;color:#fff;position:fixed;top:0;right:0;bottom:0;left:0;text-align:center"><span>加载动画</span></div>'

// 直接输出在页面上
document.write(_loading)

document.onloadystatechage = animation()

function animation(){
	if(document.readyState == 'complete'){	// 监控页面加载是否完成，完成后删除loading
		let loadingMask = document.querySelector('#loadingDiv')
		
		//删除loading加载动画
		document.parentNode.removeChild('loadingMask')
	}
}
