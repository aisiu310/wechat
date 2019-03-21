
module.exports = (userData) =>{
    let options = {
        toUserName: userData.FromUserName,
        fromUserName: userData.ToUserName,
        createTime: Date.now(),
        type: "text",
       
      };
    
      if (userData.MsgType === 'text'){

        if (userData.Content === "1") {
            options.content = "走过路过,\n 别错过 !";
          } else if (userData.Content && userData.Content.indexOf("2") !== -1) {
            options.content = "你在想什么 \n 我在想你 \n 希望你每天开心~";
          } else if (userData.Content && userData.Content.indexOf("3") !== -1) {
            options.content = `愿你有好运，如果没有，愿你在不幸中学会慈悲。
                              \n愿你被所有人爱，如果没有，愿你在寂寞中学会宽容。
                              \n愿你一生一世，每天能够睡到自然醒。`;
          }else{
            options.content = "你在说什么?我想再听听你的声音";
          }
        
      }else if(userData.MsgType === "image"){
        options.mediaId = userData.MediaId;
        options.type = 'image';
      }else if (userData.MsgType === "voice") {
           // 将用户发送的语音消息， 返回语音识别结果给用户（需要开通才能生效）
        options.content = userData.Recognition;
      }else if(userData.MsgType === 'location') {
          //用户发送的是地理位置信息
          options.content = 
          `地理位置纬度: ${userData.Location_X}
          \n 地理位置经度: ${userData.Location_Y}
          \n 地图缩放大小: ${userData.Scale}
          \n 地理位置信息: ${userData.Label}`
      }else if(userData.MsgType === "event") {
          if(userData.Event === 'subscribe') {
              //用户订阅事件
            options.content = `欢迎来到我的订阅公众号~ 
            \n 路过的回复: 1,
            \n 喜欢我的回复: 2,
            \n 爱自己回复: 3,`;
            if(userData.EventKey) {
                options.content = '欢迎扫描带参数二维码， 关注公众号~';
            }
          }else if(userData.Event === 'unsubscribe'){
            console.log('呜呜~小可爱它走了~');

        }else if(userData.Event === 'CLICK'){
            options.content = '有人在点我~'
        }
      }
      return options;
}