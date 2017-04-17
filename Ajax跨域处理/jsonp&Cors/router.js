/*
 *
 * 处理Jsonp跨域请求
 * 
*/

app.get('/getJsonp',function(req,res){
	var userName = req.query.username
	var content = req.query.content
	var cb = req.query.callback
	var data = userName + ',' + content
	
	if(cb){
		res.send(cb + '(' + JSON.stringify(data) + ')')	
	}else{
		res.send(data)
	}

})


/*
 *
 * 处理Cors跨域请求
 * 
*/

app.get('/getCors',function(req,res){
	var userName = req.query.username
	var content = req.query.content
	var cb = req.query.callback
	var data = userName + ',' + content
	
	res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
	res.send(data);
})
