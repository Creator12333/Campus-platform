const db = wx.cloud.database();
const admin = db.collection('shenhe2');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data1:[],
    dataId:'',
    array:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    let dataId = options.data
    let array=[]
    that.setData({
      dataId:dataId
    })
    db.collection("jianzhifabu").where({
      _id: dataId
    }).get({
      success(res) {
        that.setData({
          array: res.data[0]
        })
      }
    })
  },
  //
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