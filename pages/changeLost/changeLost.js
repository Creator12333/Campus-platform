const db = wx.cloud.database();
const admin = db.collection('shiwuzhaoling');
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ne:'',
    wupinmiaoshu: '',
    array1: ['暂未选择', '思源楼', '知行楼', '通方楼', '天佑', '图书馆', '一期生活服务区', '一期食堂', '二期食堂', '操场', '宿舍楼附近', '旧实验楼', '新实验楼', '教工食堂', '大学生活动中心', '行政楼', '其它'],
    index1: 0,
    faxiandeshijian: '',
    lianxifangshi2: '',
    fileList:'',
    arr1:[],
    fileList1:'',
    lostImage:'',
    fileID:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let id = options.data;
    let array = JSON.parse(options.data1)
    that.setData({
      ne:array
    })
    that.setData({
      wupinmiaoshu:that.data.ne.wupinmiaoshu
    })
    that.setData({
      faxiandeshijian:that.data.ne.faxiandeshijian
    })
    that.setData({
      lianxifangshi2:that.data.ne.lianxifangshi2
    })
    that.setData({
      index1:that.data.ne.index1
    })
    that.setData({
      fileList1:that.data.ne.fileList1
    })
  },
  wupinmiaoshu(res){
    this.setData({
      wupinmiaoshu:res.detail
    })
  },
  faxiandeshijian(res){
    this.setData({
      faxiandeshijian:res.detail
    })
  },
  lianxifangshi2(res){
    this.setData({
      lianxifangshi2:res.detail
    })
  },
  bindPickerLost: function (res) {
    this.setData({
      index1: res.detail.value
    })
  },
  bindImage: function () {
    var that = this;
    var fileList = that.data.ne.fileList
    var file = []
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    wx.cloud.callFunction({
      name: 'DeleteImage',
      data: {
        fileList: fileList
      },
      success(res) {
        console.log("图片删除成功", res)
      },
      fail(res) {
        console.log("图片删除失败", res)
      },
    })
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success: function (res) {
        const lostImage = res.tempFilePaths;
        that.setData({
          lostImage: lostImage
        })
        const cloudPath = [];
        lostImage.forEach((item, i) => {
          cloudPath.push('失物招领图片/' + timestamp)
        })
        for (let i = 0; i < lostImage.length; i++) {
          wx.cloud.uploadFile({
            cloudPath: cloudPath[i],
            filePath: lostImage[i],
            success: function (res) {
              that.data.arr1.push(res.fileID)
              //console.log(that.data.arr1)
              wx.cloud.getTempFileURL({
                fileList: that.data.arr1,
                success(res) {
                  that.setData({
                    fileList1: res.fileList[0].tempFileURL
                  })
                }
              })
            },
          })
        }
      },
    })
  },
  shiwuzhaolingfabu(){
    let that = this
    let dataId = that.data.ne._id
    wx.cloud.callFunction({
      name:'changeLost',
      data:{
        dataId:dataId,
        wupinmiaoshu: that.data.wupinmiaoshu,
        array1: that.data.array1[that.data.index1],
        index1: that.data.index1,
        faxiandeshijian: that.data.faxiandeshijian,
        lianxifangshi2: that.data.lianxifangshi2,
        fileID: that.data.arr1,
        lostImage: that.data.lostImage,
        fileList1: that.data.fileList1
      },
      success(res) {
        console.log("上传成功", res)
        wx.switchTab({
          url: '../mine/mine',
        })
        wx.showToast({
          title: '修改成功',
        })
      },
      fail(res) {
        console.log("上传失败", res)
        wx.switchTab({
          url: '../mine/mine',
        })
        wx.showToast({
          icon:'none',
          title: '修改失败',
        })
      }
    })
    /*db.collection("shiwuzhaoling").doc(id).update({
      data: {
        wupinmiaoshu: that.data.wupinmiaoshu,
        array1: that.data.array1[that.data.index1],
        index1: that.data.index1,
        faxiandeshijian: that.data.faxiandeshijian,
        lianxifangshi2: that.data.lianxifangshi2,
        fileID: that.data.arr1,
        lostImage: that.data.lostImage,
        fileList1: that.data.fileList1
      },
      success(res) {
        //console.log("上传成功", res)
        wx.switchTab({
          url: '../shouye/shouye',
        })
        wx.showToast({
          title: '已提交审核',
        })
      },
      fail(res) {
        //console.log("上传失败", res)
      }
    })*/
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showToast({
      icon: 'none',
      title: '别滑了兄弟！到底了',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})