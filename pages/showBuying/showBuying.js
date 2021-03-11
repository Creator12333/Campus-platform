const db = wx.cloud.database();
const admin = db.collection('shenhe1');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[],
    data1: [],
    dataId: ''
  },
  go_pay(res){
    var that=this
    wx.navigateTo({
      url: '../goPay/goPay?id='+that.data.dataId,
    })
  },
  get_number(res){
    var that=this
    wx.setClipboardData({
      data: that.data.array.lianxifangshi,
      success(res){
        console.log("复制成功")
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  },
  bindImg(){
    var that=this
    var imgUrl = that.data.array.fileList
    wx.navigateTo({
      url: '../seeImg/seeImg?data='+imgUrl,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var dataId=options.data1
    var array=[]
    that.setData({
      dataId:dataId
    })
    db.collection("fabu").where({
      _id: dataId
    }).get({
      success(res) {
        that.setData({
          array:res.data[0]
        })
      }
    })
   /* for(var i=0;i<data.length;i++){
      if(dataId==data[i]._id){
        array=data[i]
      }
    }
    that.setData({
      array:array
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
  onShareAppMessage: function (res) {
    /*console.log(res)
    return{
      title:'毛概课本',
      path:'../showBuying/showBuying?dataId=9c7ffb0a5ec4f856000af3184700ef0f'
    }*/
  }
})