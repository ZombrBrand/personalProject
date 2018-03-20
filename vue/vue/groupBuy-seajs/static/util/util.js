define(function(require, exports, module) {
	//定义工具
	module.exports = {
		ajax: function(method, url, fn) {
			method = method || 'get'
			var xhr = new XMLHttpRequest
			xhr.onreadystatechange = function() {
				if(xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
					fn(JSON.parse(xhr.responseText))
				}
			}
			xhr.open(method, url, true)
			xhr.send(null)
		}
	}
})