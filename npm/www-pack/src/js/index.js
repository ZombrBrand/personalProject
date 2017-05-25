// 测试模块引入打包代码
// var add = require('./add').add;
// add(1,2)

// var $ = require("jquery");
import $ from "jquery"

// var stuJson = require("./stu.json");
import stuJson from "./stu.json"

//css-loader
require('../css/index.css');

$('#ct').html(`hello word my name is ${stuJson.name}`)

var a = (x,y) => x*y
