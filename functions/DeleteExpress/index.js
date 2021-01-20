// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

exports.main = async (event, context) => {
  try {
    return await db.collection('ExpressAndTask').doc(event.id).remove({
    })
  } catch (e) {
    console.error(e)
  }
}