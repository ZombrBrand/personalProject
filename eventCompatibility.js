window.onload = function() {
	function binEvent(node,type,handler) {
        if(node.addEventListener) {
            node.addEventListener(type,handler);
        }else if(node.attachEvent){
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