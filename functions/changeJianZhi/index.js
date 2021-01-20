// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数

const db = cloud.database()
// 云函数入口函数

// event 为调用此云函数传递的参数，传递的参数可通过event.xxx得到

exports.main = async (event, context) => {
  try {
    // 调用 update 方法
    // users 是我要修改的集合的名字
    // event.dataId 和 event.lover 是我调用此云函数带的参数

    return await db.collection('jianzhifabu').doc(event.dataId).update({
      // data 为 users 集合内我要修改的内容 lover 为字段名 event.lover 为要修改成的内容
      data: {
        gongzuomingcheng: event.gongzuomingcheng,
        gongzuoshijian: event.gongzuoshijian,
        gongzuodidian: event.gongzuodidian,
        renyuanyaoqiu: event.renyuanyaoqiu,
        xinzifuli: event.xinzifuli,
        lianxifangshi1: event.lianxifangshi1,
        zhiweimiaoshu: event.zhiweimiaoshu
      }
    })
  } catch (e) {
    console.error(e)
  }
}