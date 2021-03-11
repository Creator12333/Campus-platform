const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title_select:1,
    Express:[],
    Task:[]
  },
  title_select(res){
    var that = this;
    var id = res.currentTarget.dataset.id;
    console.log(id);
    if(id == 1){
      that.setData({
        title_select:1
      })
    }else if(id == 2){
      that.setData({
        title_select:2
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var Express = [];
    var Task = [];
    wx.showModal({
      title:'注意',
      content:'如果您看到了可以帮助的任务需求，请根据发布者提供的联系方式，尽快联系他，后续的交接工作请妥善安排！',
      showCancel:false,
      success(res){
        wx.showLoading({
          title: '加载中',
        })
        wx.cloud.callFunction({
          name:'selectExpress',
          success(res){
            for(var i = 0; i < res.result.data.length; i++){
              if(res.result.data[i].leiXing == '代取快递' && res.result.data[i].shenHe == '已发布'){
               Express.push(res.result.data[i]);
              }else if(res.result.data[i].leiXing == '其它任务' && res.result.data[i].shenHe == '已发布'){
                Task.push(res.result.data[i])
              }
            }
            that.setData({
              Express:Express,
              Task:Task
            })
            wx.hideLoading({
              success: (res) => {},
            })
          }
        })  
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