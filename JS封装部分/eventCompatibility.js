window.onload = function() {
	function binEvent(node,type,handler) {
        if(node.addEventListener) {
            node.addEventListener(type,handler);
        }else if(node.attachEvent){
            // 代码作者利用了闭包和引用类型的特性
            // 1.引用类型：赋予变量的只是指针，当需要使用时，只要找到指针即可
            // 2.闭包：内部函数调用外部函数变量，致使外部函数变量不释放，使得可以找到外部函数变量
            node['e' + type + handler] = handler;
            node[type + handler] = function(){
              node['e' + type + handler](window.event)
            }
            node.attachEvent('on' + type,node[type + handler]);
        }
    }

    function removeEvent(node,type,handler) {
        if(node.removeEventListener) {
            node.removeEventListener(type,handler);
        }else if(node.detachEvent) {
            node.detachEvent('on' + type + node[type + handler])
            node[type + handler] = null;
        }
    }

    function $(id) {
        return document.querySelector(id);
    }

    function $$(id) {
        return document.querySelectorAll(id);
    }

    function getEvent(e) {
        return e.target || e.srcElement;
    }
}