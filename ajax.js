function ajax(opts) {
    opts.success = opts.success || function(){};
    opts.error = opts.error || function(){};
    opts.type = opts.type || 'get';
    opts.data = opts.data || {};
    opts.dataType = opts.dataType || 'json';

    var html = '';
    for(var key in opts.data) {
        html += key + '=' + opts.data[key] + '&';
    }

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200 || xhr.status === 304){
                if(opts.dataType == 'text'){
                    opts.success(xhr.responseText);
                }else if(opts.dataType == 'json'){
                    var json = JSON.parse(xhr.responseText);
                    opts.success(json);
                }  
            }else{
                opts.error();
            } 
        }   
    }
    var html = html.substr(0,html.length-1);

    if(opts.type.toLowerCase() === 'get'){
        html = opts.url + '?' + html;
        xhr.open(opts.type,html,true);
        xhr.send();
    }
    if(opts.type.toLowerCase() === 'post'){
        xhr.open(opts.type,opts.url,true);
        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        xhr.send(html);
    }
    
}

function render(contents){
	var fragment = document.createDocumentFragment();		
	for(var i = 0; i < contents.length; i++) {
		var node = document.createElement('li');
		node.innerText = contents[i];
		fragment.appendChild(nodeLi);
	}
	ct.appendChild(fragment);

}