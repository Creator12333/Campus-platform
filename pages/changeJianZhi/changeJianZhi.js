const db = wx.cloud.database();
const admin = db.collection('jianzhifabu');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ne:[],
    gongzuomingcheng:'',
    gongzuoshijian:'',
    gongzuodidian:'',
    renyuanyaoqiu:'',
    xinzifuli:'',
    lianxifangshi1:'',
    zhiweimiaoshu:'',
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
      gongzuomingcheng:that.data.ne.gongzuomingcheng
    })
    that.setData({
      gongzuoshijian:that.data.ne.gongzuoshijian
    })
    that.setData({
      gongzuodidian:that.data.ne.gongzuodidian
  })
    that.setData({
      renyuanyaoqiu:that.data.ne.renyuanyaoqiu
    })
    that.setData({
      xinzifuli:that.data.ne.xinzifuli
    })
    that.setData({
      lianxifangshi1:that.data.ne.lianxifangshi1
    })
    that.setData({
      zhiweimiaoshu:that.data.ne.zhiweimiaoshu
    })
  },
  gongzuomingcheng(res){
    this.setData({
      gongzuomingcheng:res.detail
    })
  },
  gongzuoshijian(res){
    this.setData({
      gongzuoshijian:res.detail
    })
  },
  gongzuodidian(res){
    this.setData({
      gongzuodidian:res.detail
    })
  },
  renyuanyaoqiu(res){
    this.setData({
      renyuanyaoqiu:res.detail
    })
  },
  xinzifuli(res){
    this.setData({
      xinzifuli:res.detail
    })
  },
  lianxifangshi1(res){
    this.setData({
      lianxifangshi1:res.detail
    })
  },
  zhiweimiaoshu(res){
    this.setData({
      zhiweimiaoshu:res.detail
    })
  },
  fabu(){
    let that = this
    let dataId = that.data.ne._id
    console.log(dataId)
    wx.cloud.callFunction({
      name:'changeJianZhi',
      data:{
        dataId:dataId,
        gongzuomingcheng: that.data.gongzuomingcheng,
        gongzuoshijian: that.data.gongzuoshijian,
        gongzuodidian: that.data.gongzuodidian,
        renyuanyaoqiu: that.data.renyuanyaoqiu,
        xinzifuli: that.data.xinzifuli,
        lianxifangshi1: that.data.lianxifangshi1,
        zhiweimiaoshu: that.data.zhiweimiaoshu
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
          title: '修改失败',
        })
      }
    })
    /*db.collection("shenhe2").doc(id).update({
      data: {
        gongzuomingcheng: that.data.gongzuomingcheng,
        gongzuoshijian: that.data.gongzuoshijian,
        gongzuodidian: that.data.gongzuodidian,
        renyuanyaoqiu: that.data.renyuanyaoqiu,
        xinzifuli: that.data.xinzifuli,
        lianxifangshi1: that.data.lianxifangshi1,
        zhiweimiaoshu: that.data.zhiweimiaoshu
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