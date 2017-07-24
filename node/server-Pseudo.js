const http = require('http');
const url = require('url');
const server = http.createServer(); //创建服务器

server.listen(1333);

let users = [];

server.on('request',(req,res) => {
    const parseUrl = url.parse(req.url,true);   //url.parse()将URL转化为json对象
    console.log(parseUrl);
    if(parseUrl.path.indexOf('/user') === -1){
        res.statusCode = 403;
        res.end(`${res.statusCode} not allowed`);
        return;
    }
    
    //符合请求URL情况时，根据请求状态判断动作
    switch(req.method){
        case 'GET':
            if(parseUrl.path.indexOf('/user/') > -1){
                let userName = parseUrl.path.substring(6);
                let user = users.find(u => u.name === userName);
                if(user){
                    res.statusCode = 200;
                    res.end(JSON.stringify(user));
                }else{
                    res.statusCode = 200;
                    res.end(JSON.stringify(users));
                }
            }

            // filter 能够查询出所有符合条件的
            // find 查询到第一个符合条件的就返回
            // 因此 filter 相当于 find all

            //如果URL带有参数，则根据参数处理
            let query = parseUrl.query;
            if(query.address){
                let foud = users.filter(u => u.address === query.address);
                console.log(foud);
                res.statusCode = 200;
                res.end(JSON.stringify(foud));
            }else{
                res.statusCode = 200;
                res.end(JSON.stringify(users));
            }
            break;
        case 'POST':
            let user = '';

            req.on('data',(buffer) => {
                const userStr = buffer.toString();
                let CT = req.headers['content-type'] //获取当前data是什么type
                if(CT === 'application/json'){
                    user = JSON.parse(userStr);
                    users.push(user);
                }
            })
            req.on('end',() => {
                res.statusCode = 201;
                res.end('Great! User created!');
            })
            break;
        case 'PATCH':
            let userName = parseUrl.path.substring(6);

            req.on('data',(buffer) => {
                const userStr = buffer.toString();
                let CT = req.headers['content-type'];
                if(CT === 'application/json'){
                    let update = JSON.parse(userStr);
                    let user = users.find(u => u.name === userName);
                    if(update.name === user.name){
                        user.address = update.address;
                    }else{
                        user.name = update.name;
                    }
                }
            })
            req.on('end',() => {
                res.statusCode = 201;
                res.end('Great! User up!');
            })
            break;
        case 'DELETE':
            if(parseUrl.path.indexOf('/user/') > -1){
                let userName = parseUrl.path.substring(6);
                let index = users.findIndex(u => u.name === userName);
                users.splice(index,1);
                res.statusCode = 200;
                res.end(JSON.stringify(users));
            }
            break;
    }
})
