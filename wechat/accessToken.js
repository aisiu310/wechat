/*  */
const rp = require("request-promise-native");
const {writeFile, readFile} = require('fs');

async function getAccessToken() {
  const appId = "wx2cfa491c74190702";
  const appSecret = "ae0e035d8a7899136ea445bf6b3d5319";
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`;

  const result = await rp({ method: "GET", url, json: true });
  console.log(result);
  //设置过期时间,2小时更新,提前5分钟
  result.expires_in = Date.now() + 7200000 - 300000;
  //保存文件,将js对象转为json数据
  writeFile('./accessToken.txt', JSON.stringify(result), (err) => {
    if(!err) console.log('保存成功');
    else console.log(err);
  })
  return result;
}


module.exports = function fetchAccessToken(){
    return new Promise ((resolve, reject) => {
      readFile('./accessToken.txt', (err, data)=>{
        if(!err){
          resolve(JSON.parse(data.toString()));
        }else{
          reject(err);
        }
      })
    })
    .then(res => {
      if(res.expires_in < Date.now){
     
        return getAccessToken();
      } else {
        console.log(res);
        return res;
      }
    })
    .catch( err => {
      
      return getAccessToken();
    })
}

// (async () => {
//   const result = await fetchAccessToken();
//   console.log(result);
// })
