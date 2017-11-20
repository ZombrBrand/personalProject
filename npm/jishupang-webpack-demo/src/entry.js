import css from './css/index.css'
import less from './css/black.less'
import sass from './css/yellow.scss'
// import $ from 'jquery'
// import print from './console.js'

let str = "Hello JSpang"

// print()

document.getElementById("title").innerHTML = str

$('#title').html('Hello,wellow to JSpang.com')

let json = require('../config.json')
document.getElementById("json").innerHTML = json.name + "，address:" + json.address