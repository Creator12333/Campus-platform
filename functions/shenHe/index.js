// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数

const db = cloud.database()
// 云函数入口函数

// event 为调用此云函数传递的参数，传递的参数可通过event.xxx得到

exports.main = async (event, context) => {
  console.log(event);
  try {
    return await db.collection(event.jihe).doc(event.id).update({
      // data 为 users 集合内我要修改的内容 lover 为字段名 event.lover 为要修改成的内容
      data: {
        shenhe:event.shenhe
      }
    })
  } catch (e) {
    console.error(e)
  }
}