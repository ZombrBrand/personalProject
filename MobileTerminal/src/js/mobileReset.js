import sass from '../css/index.scss'
// import css from '../css/index.css'

// 设置1:1像素比
let ratio = 1 / window.devicePixelRatio
document.write('<meta name="viewport" content="width=device-width, initial-scale=' + ratio + ',maximum-scale=' +
    ratio + ',minimum-scale=' + ratio + '">')

function fn() {
    // 利用rem动态设置响应式
    let $html = document.querySelector('html')

    // 获取文档宽度
    let pageWidth = $html.getBoundingClientRect().width
    $html.style.fontSize = pageWidth / 16 + 'px'
}

fn()
window.onresize = function () {
    fn()
}