const express = require('./express/app.all');
const app = express();
//最重要的是路由功能 根据不同的方法和路径返回不同的结果
// app.get('/hello',(req,res)=>{
//     res.end('hello');
// })

// app.post('/world',(req,res)=>{
//     res.end('world');
// })
// * 表示匹配所有的路径
app.all('*',(req,res)=>{
    res.end('hello all');
})
app.listen(9001,function(){
    console.log('server is run in 9001');
});