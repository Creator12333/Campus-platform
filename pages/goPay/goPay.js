// pages/goPay/goPay.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payCode:[],
    demo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    console.log(options.id)
    db.collection("fabu").doc(options.id).get({
      success(res){
        console.log(res.data)
        if(res.data.fileList_pay==""){
          that.setData({
            demo:false
          })
        }else{
          that.setData({
            payCode:res.data.fileList_pay,
            demo:true
          })
        } 
      }
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