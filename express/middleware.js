const http = require('http');
const url = require('url');
function createAppliction(){
    //app其实就是真正的请求监听函数
    let app = function(req,res){
    let {pathname} = url.parse(req.url,true);
    let index = 0;
    function next(){
        if(index>=app.routes.length){
            console.log(index);
            return res.end(`Cannot ${req.method} ${pathname}`);        
        }
        let route = app.routes[index++];
        if(route.method == 'middle'){//中间件
            //只要请求路径和中间件的path相同即可匹配上
            if(pathname.startsWith(route.path)){
                route.handler(req,res,next);
            }else{
                next();
            }
        }else{//路由
            for(let i=0;i<app.routes.length;i++){
                let route = app.routes[i];
                if((route.method==req.method.toLowerCase()||route.method == 'all')&&(route.path==pathname||route.path == "*")){
                    console.log(route,req.method,pathname);
                    return route.handler(req,res);
                }else{
                    next();
                }
            }
        }
    };
    next();        
        // for(let i=0;i<app.routes.length;i++){
        //     let route = app.routes[i];
        //     if((route.method==req.method.toLowerCase()||route.method == 'all')
        //     &&(route.path==pathname||route.path == "*")){
        //         return route.handler(req,res);
        //     }
        // }
    }
    app.listen = function(){
        let server = http.createServer(app);
        server.listen.apply(server,arguments);
    }
    //此数组用来保存路由规则
    app.routes = [];
    http.METHODS.forEach(method=>{
        method = method.toLowerCase();
        app[method] = function(path,handler){
            //向数组中放置路由对象
            app.routes.push({
                method,
                path,
                handler
            })
        }
    })
    //get就代表http的get请求
    // app.get = function(path,handler){
    //     //向数组中放置路由对象
    //     app.routes.push({
    //         method:'get',
    //         path,
    //         handler
    //     })
    // }
    app.all = function(path,handler){
        //向数组中放置路由对象
        app.routes.push({
            method:'all',
            path,
            handler
        })
    }
    //添加一个中间件
    app.use = function(path,handler){
        if(typeof handler != 'function'){
            handler = path;
            path = '/';
        }
        app.routes.push({
            method:'middle',
            path,
            handler
        })
    }
    return app;
}
module.exports = createAppliction;