const express = require('express');
const app = express();
app.get('/', (req, res) => {
    
}); 
app.listen(3000,err=>{
    if(!err) console.log('路由连接成功');
    else console.log(err);
});