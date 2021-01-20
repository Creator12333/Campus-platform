// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection(event.jihe).doc(event.id).update({
      // data 为 users 集合内我要修改的内容 lover 为字段名 event.lover 为要修改成的内容
      data: {
        see:event.see
      }
    })
  } catch (e) {
    console.error(e)
  }
}