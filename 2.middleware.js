const express = require('./express/middleware');
const app = express();
//使用use定义中间件 next是一个函数 调用next就代表当前中间件执行完毕 可以继续向下执行别的中间件或者路由
app.use(function(req,res,next){
    console.log('没有路径的中间件');
    next();
})
app.use('/water',(req,res,next)=>{
    console.log('guo lv water');
    next();
})
app.get('/water',(req,res)=>{
    console.log('this is over');
    res.write('water');
    res.end();
})
app.listen(9001,()=>{
    console.log('server is run in 9001');
})