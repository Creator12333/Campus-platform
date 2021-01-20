
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'xiaoliu-k8902',//你的开发环境
  traceUser: true
})
// 云函数入口函数
exports.main = async (event, context) => {
  var fileList=event.fileList
  try {
    return await cloud.deleteFile({
      fileList:fileList
    })
  }catch (e) {
    return e
  }
}
