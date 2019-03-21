
const rp = require('request-promise-native');
const fetchAccessToken = require('./accessToken');

const menu = {
    "button":[
      {
        "type":"click",  // 单击菜单
        "name":"首页☀",
        "key":"home"
      },
      {
           "name":"日常护肤	💆",
           "sub_button":[
           {    
               "type":"view",
               "name":"护肤tips",
               "url":"https://weibo.com/ttarticle/p/show?id=2309404150729240658960"
            },
            {    
              "type":"view",
              "name":"美白补水",
              "url":"https://zhuanlan.zhihu.com/p/37494878"
           },
            {
              "type": "pic_photo_or_album",
              "name": "测试皮肤",
              "key": "rselfmenu_1_1"
             },
            {
               "type":"click",
               "name":"赞一下我们",
               "key":"V1001_GOOD"
            }]
      },
      
      {
        "name":"分享歌单🎶",
        "sub_button":[
        {    
            "type":"view",
            "name":"华语单曲日榜",
            "url":"https://kma.kkbox.com/charts/daily/song"
         },
         {    
           "type":"view",
           "name":"英语歌单推荐",
           "url":"https://www.ximalaya.com/yinyue/3780235/"
        },
         {
          "type":"view",
          "name":"粤语歌单推荐",
          "url":"https://kma.kkbox.com/charts/daily/newrelease?terr=tw&lang=tc&cate=320"
          },
         {
          "type":"view",
          "name":"我喜欢的",
          "url":"https://music.163.com/#/my/m/music/playlist?id=573369629"
         }]
      },
    ]
 }


async function createMenu() {
  const { access_token } = await fetchAccessToken();
  const url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${access_token}`;
  const result = await rp({method: 'POST', url, json: true, body: menu});
  return result;
}

async function deleteMenu() {
  const {access_token} = await fetchAccessToken();
  const url = `https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=${access_token}`;
  const result = await rp({method: 'GET', url, json: true});
  return result;
}

(async () => {
  let result = await deleteMenu();
  console.log(result);
  result = await createMenu();
  console.log(result);
})()