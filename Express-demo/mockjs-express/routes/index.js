var express = require('express')
var router = express.Router()
var Mock = require('mockjs')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/mock',function(req,res,next){
	// var data = Mock.mock({
	// 	'@float(0)'
	// })

	var data = Mock.mock('@character("pool")')

	var ret = JSON.stringify(data,null,4)

	res.send(ret)
})

module.exports = router;
