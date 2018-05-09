const http = require('http');
const url = require('url');
function createAppliction(){
    //app其实就是真正的请求监听函数
    let app = function(req,res){
    let {pathname} = url.parse(req.url,true);        
        for(let i=0;i<app.routes.length;i++){
            let route = app.routes[i];
            if(route.method==req.method.toLowerCase()&&route.path==pathname){
                return route.handler(req,res);
            }
        }
        res.end(`Cannot ${req.method} ${pathname}`)
    }
    app.listen = function(){
        let server = http.createServer(app);
        server.listen.apply(server,arguments);
    }
    //此数组用来保存路由规则
    app.routes = [];
    //get就代表http的get请求
    app.get = function(path,handler){
        //向数组中放置路由对象
        app.routes.push({
            method:'get',
            path,
            handler
        })
    }
    return app;
}
module.exports = createAppliction;