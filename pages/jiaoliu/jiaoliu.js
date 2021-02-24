const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[],
    show:0,
    imgUrl:''
  },
  copy(res){
    var that=this;
    var id = res.currentTarget.id;
    var number = '';
    console.log(id)
    for(var i = 0; i < that.data.array.length; i++){
      if(that.data.array[i]._id == id){
        number = String(that.data.array[i].number)
      }
    }
    console.log(number)
    console.log(typeof(number))
    wx.setClipboardData({
      data:number,
     success(res){
       wx.showToast({
         title: '复制成功',
       })
     },
     fail(res){
       wx.showToast({
         icon:'none',
         title: '复制失败',
       })
     }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    db.collection('freeClassroom').get({
      success(res){
        console.log(res.data[0]);
        that.setData({
          imgUrl:res.data[0].img_src
        })
        wx.hideLoading({
          success: (res) => {},
        })
      },
      fail(res){
        console.log(res);
      }
    })
    // var that = this;
    // var show = '';
    // var array = [];
    // db.collection('jiaoLiuGroup').get({
    //   success(res){
    //     console.log('成功',res.data)
    //     if(res.data.length==0){
    //       show = 2;
    //     }else{
    //       show = 1;
    //       array = res.data
    //     }
    //     wx.hideLoading({
    //       success: (res) => {},
    //     })
    //     that.setData({
    //       show:show,
    //       array:array
    //     })
    //     console.log(that.data.show)
    //     console.log(that.data.array)
    //   },
    //   fail(res){
    //     console.log(res)
    //   }
    // })
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