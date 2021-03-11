const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select:'代取快递',
    Express:[],
    Task:[]
  },
  ok(res){
    var that = this;
    var id = res.currentTarget.dataset.id;
    wx.cloud.callFunction({
      name:'changeExpress',
      data:{
        shenHe:'已发布',
        id:id
      },
      success(res){
        console.log('ok更改成功');
        wx.showToast({
          title: '操作成功',
        })
        that.onLoad();
      },
      fail(res){
        console.log('ok更改失败');
      }
    })
  },
  no(res){
    var that = this;
    var id = res.currentTarget.dataset.id;
    wx.cloud.callFunction({
      name:'changeExpress',
      data:{
        shenHe:'审核失败',
        id:id
      },
      success(res){
        console.log('no更改成功');
        wx.showToast({
          title: '操作成功',
        })
        that.onLoad();
      },
      fail(res){
        console.log('no更改失败');
      }
    })

  },
  select(res){
    var that = this;
    var id = res.currentTarget.dataset.id;
    that.setData({
      select:id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var Express = [];
    var Task = [];
    db.collection('ExpressAndTask').get({
      success(res){
        console.log(res.data);
        for(var i = 0; i < res.data.length; i++){
          if(res.data[i].leiXing == '代取快递' && res.data[i].shenHe == '审核中'){
            Express.push(res.data[i]);
            console.log('Express---------');
          }else if(res.data[i].leiXing == '其它任务' && res.data[i].shenHe == '审核中'){
            Task.push(res.data[i]);
            console.log('Express---------');
          }
        }
        that.setData({
          Express:Express,
          Task:Task
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