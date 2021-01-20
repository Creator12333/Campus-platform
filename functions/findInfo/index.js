
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var docid = event.docid
  var vdata1 = event.data1
  var vdata2 = event.data2
  var skip=event.skip;
  var limit=event.limit;
  try {
    return await db.collection('userInformation').skip(skip).limit(limit).get({
    })
  } catch (e) {
    console.log(e)
  }
}