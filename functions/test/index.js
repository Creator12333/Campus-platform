// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'xiaoliu-k8902'
})

exports.main = async (event, context) => {
  return {
    status:'success'
  }
}


// const db=cloud.database();
// 云函数入口函数
// exports.main = async (event, context) => {
//   var skip=event.skip;
//   var limit=event.limit;
//   try{
//     return await db.collection('test').skip(skip).limit(100).get({

//     })

//   }catch(e){
//     console.log(e)
//   }
// }