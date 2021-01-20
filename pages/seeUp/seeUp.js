// pages/seeUp/seeUp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:''
  },
  seeThing(res){
    wx.navigateTo({
      url: '../seeShowing/seeShowing?data='+this.data.openid,
    })
  },
  seeJianZhi(res){
    wx.navigateTo({
      url: '../seeJianZhi/seeJianZhi?data='+this.data.openid,
    })
  },
  seeLost(res){
    wx.navigateTo({
      url: '../seeLost/seeLost?data='+this.data.openid,
    })
  },
  seeTask(res){
    wx.navigateTo({
      url: '../seeTask/seeTask?data='+this.data.openid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.openid)
    this.setData({
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