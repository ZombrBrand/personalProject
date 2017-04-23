app.get('/loadMore',function(req,res){
	var text = req.query.text
	var idx = req.query.index
	var len = req.query.len
	var content = []

	for(var i = 0; i < len; i++) {
		content.push(text + (parseInt(idx) + i))
	}


	res.send({
		status:0,
		data:content
	});
})