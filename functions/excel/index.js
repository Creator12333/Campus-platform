const cloud = require('wx-server-sdk')
cloud.init({
  env:'xiaoliu-k8902'
})
const xlsx = require('node-xlsx')    //导入Excel类库
const db = cloud.database()   //声明数据库对象
const _ = db.command
exports.main = async (event, context) => {   //主函数入口
    try {
        let StuInfo = event.data;
        console.log(StuInfo);
        let dataCVS = `studentInfo-${Math.floor(Math.random()*1000000000)}.xlsx`
        //声明一个Excel表，表的名字用随机数产生
        let alldata = [];
        let row = ['系统准确时间', '日期','宿舍号','宿舍是否有请假人员','是否有未请假且夜不归宿的人员','图片链接']; //表格的属性，也就是表头说明对象
        alldata.push(row);  //将此行数据添加到一个向表格中存数据的数组中
//接下来是通过循环将数据存到向表格中存数据的数组中
        for (let key = 0; key<StuInfo.length; key++) {
            let arr = [];
            arr.push(StuInfo[key].timeNow);
            arr.push(StuInfo[key].time);
            arr.push(StuInfo[key].suSheId);
            arr.push(StuInfo[key].qingJia);
            arr.push(StuInfo[key].yeBuGuiSu);
            arr.push(StuInfo[key].img_src);
            alldata.push(arr)
            }
            var buffer = await xlsx.build([{   
            name: "mySheetName",
            data: alldata
            }]); 
            //将表格存入到存储库中并返回文件ID
            return await cloud.uploadFile({
            cloudPath: dataCVS,
            fileContent: buffer, //excel二进制文件
            })
    } catch (error) {
        console.error(error)
    }
}
