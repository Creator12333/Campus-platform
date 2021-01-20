// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'xiaoliu-k8902',//你的开发环境
  traceUser: true
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('shiwuzhaoling').doc(event._id).remove()

  } catch (e) {
    console.log(e)
  }
}
