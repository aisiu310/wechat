const sha1 = require('sha1');
const { getUserDataAsync, parseXMLData,formatJsData } = require('../utils/tools');

module.exports = () => {
    return async (req, res) => {
        console.log(req.query);
    
        // 微信要求验证开发者服务器的有效性，同样的开发者也得验证消息是否来自于微信服务器
        // 1）将token、timestamp、nonce三个参数进行字典序排序
        // 2）将三个参数字符串拼接成一个字符串进行sha1加密
        // 3）开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    
        // { signature: '1cb14d6a4135b686c3c96924d151b1f304c6d9c6',
        //   echostr: '6479586856852454763',
        //   timestamp: '1552996681',
        //   nonce: '1888952291' }
    
        const { signature, echostr, timestamp, nonce } = req.query;
        const token = 'wechat http1128';
        // 1）将token、timestamp、nonce三个参数进行字典序排序
        // const sortedArr = [token, timestamp, nonce].sort();
        //console.log(sortedArr);
        // 2）将三个参数字符串拼接成一个字符串进行sha1加密
        // const sha1Str = sha1(sortedArr.join(''));
        //console.log(sha1Str);
        // 3）开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
        const sha1Str = sha1([token, timestamp, nonce].sort().join(''));
    
        if (req.method === 'GET') {
            if (sha1Str === signature) {
                res.end(echostr);
            } else {
                res.end('error');
            }
        } else if (req.method === 'POST') {
            if (sha1Str !== signature) {
                res.end('error');
                return;
            }
    
            const xmlData = await getUserDataAsync(req);
    
            const jsData =  parseXMLData(xmlData);
          
            const userData =formatJsData(jsData);
    
            let content = '你在说什么?我想再听听你的声音';
            if (userData.Content === '1') {
                content = '别抱怨,\n抱我!';
            } else if (userData.Content.indexOf('2') !== -1) {
                content = '你在想什么? \n 我在想你~';
            } else if (userData.Content.indexOf('3') !== -1) {
                content = '新的一天,\n 2019.3.20祝我破壳日快乐!';
    
    
                let replyMessage = `<xml>
                <ToUserName><![CDATA[${userData.FromUserName}]]></ToUserName>
                <FromUserName><![CDATA[${userData.ToUserName}]]></FromUserName>
                <CreateTime>${Date.now()}</CreateTime>
                <MsgType><![CDATA[text]]></MsgType>
                <Content><![CDATA[${content}]]></Content>
             </xml>`
                res.send(replyMessage)
    
            } else {
                res.end('error')
            }
        }
    }
}