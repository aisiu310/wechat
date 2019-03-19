const express = require('express');
const sha1 = require('sha1');
const app = express();

app.use((req, res) => {
    console.log(req.query);

    // 微信要求验证开发者服务器的有效性，同样的开发者也得验证消息是否来自于微信服务器
    // 1）将token、timestamp、nonce三个参数进行字典序排序
    // 2）将三个参数字符串拼接成一个字符串进行sha1加密
    // 3）开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
   
    // { signature: '1cb14d6a4135b686c3c96924d151b1f304c6d9c6',
    //   echostr: '6479586856852454763',
    //   timestamp: '1552996681',
    //   nonce: '1888952291' }

    const {signature,echostr,timestamp,nonce} = req.query;
    const token ='wechat http1128';
   // 1）将token、timestamp、nonce三个参数进行字典序排序
    const sortedArr = [token,timestamp,nonce].sort();
    console.log(sortedArr);
    // 2）将三个参数字符串拼接成一个字符串进行sha1加密
    const sha1Str = sha1(sortedArr.join(''));
    console.log(sha1Str);
    // 3）开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    if(sha1Str===signature){
        res.end(echostr);
    }else{
        res.end('error');
    }

});

app.listen(3000, err => {
    if (!err) console.log('路由连接成功');
    else console.log(err);
});