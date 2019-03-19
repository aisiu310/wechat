const express = require('express');
const reply = require('./reply')


const app = express();

app.use(reply());


app.listen(3000, err => {
    if (!err) console.log('路由连接成功');
    else console.log(err);
});