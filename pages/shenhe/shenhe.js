// pages/shenhe/shenhe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:''
  },
 shenhe1(){
    var that = this;
    var openid = that.data.openid;
    wx.navigateTo({
      url: '../shenhe1/shenhe1?data=' + openid,
    })
  },
  shenhe2() {
    wx.navigateTo({
      url: '../shenhe2/shenhe2',
    })
  },
  shenhe3() {
    wx.navigateTo({
      url: '../shenhe3/shenhe3',
    })
  },
  shenhe4(res){
    wx.navigateTo({
      url: '../shenhe4/shenhe4',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    console.log(options)
    that.setData({
      openid:options.openid
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})