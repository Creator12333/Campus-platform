// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    let msgR = false;
    let imageR = false;
    //  检查文本内容是否违规
    if (event.msg) {
      msgR = await cloud.openapi.security.msgSecCheck({
        content: event.msg
      })
    }
    //  检查图像内容是否违规
    if (event.img) {
      imageR = await cloud.openapi.security.imgSecCheck({
        media: {
          header: {
            'Content-Type': 'application/octet-stream'
          },
          contentType: 'image/png',
          value: Buffer.from(event.img)
        }
      })
    }
    return {
      msgR,
      imageR
    };
  } catch (e) {
    return e
  }
}