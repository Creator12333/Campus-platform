const db = wx.cloud.database();
const admin = db.collection('fabu');
// const aaa = db.collection("shenhe1")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    ne: [],
    TabCur:0,
    scrollLeft:0,
    navTitle:['已发布','审核中','审核失败'],
    ListTouchStart:'',
    ListTouchDirection:'',
    modalName:''
  },
      // ListTouch触摸开始
      ListTouchStart(e) {
        this.setData({
          ListTouchStart: e.touches[0].pageX
        })
        console.log(e);
      },
    
      // ListTouch计算方向
      ListTouchMove(e) {
        this.setData({
          ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
        })
        console.log(e)
      },
    
      // ListTouch计算滚动
      ListTouchEnd(e) {
        if (this.data.ListTouchDirection =='left'){
          this.setData({
            modalName: e.currentTarget.dataset.target
          })
        } else {
          this.setData({
            modalName: null
          })
        }
        this.setData({
          ListTouchDirection: null
        })
      },
  seeShenHe(res) {
    var that = this
    var id = res.target.id
    var array = []
    for (var i = 0; i < that.data.ne.length; i++) {
      if (that.data.ne[i]._id == id) {
        array.push(that.data.ne[i])
      }
    }
    var array1 = JSON.stringify(array)
    wx.navigateTo({
      url: '../seeShenHe/seeShenHe?data=' + array1,
    })
  },
  ok(res) {
    var that = this
    var id = res.target.dataset.id
    console.log("id: ", id)
    var array = [];
    // var fileList = []
    for (var i = 0; i < that.data.ne.length; i++) {
      if (that.data.ne[i]._id == id) {
        array.push(that.data.ne[i])
      }
    }
    wx.cloud.callFunction({
      name:'shenHe',
      data:{
        jihe:'fabu',
        id:id,
        shenhe:'通过'
      },
      success(res){
        console.log(res)
        wx.switchTab({
          url: '../mine/mine',
          })
          wx.showToast({
            title: '审核成功(通过)',
          })
          },
      fail(res){
        console.log('修改数据失败',res)
        wx.switchTab({
           url: '../mine/mine',
          })
          wx.showToast({
            title: '审核失败',
          })
          }
    })
  },
  no(res) {
    var that = this
    var id = res.target.dataset.id;
    console.log(id);
    var array = []
    var fileList = []
    wx.cloud.callFunction({
      name:'shenHe',
      data:{
        jihe:'fabu',
        id:id,
        shenhe:'失败'
      },
      success(res){
        console.log('修改数据成功');
        wx.switchTab({
          url: '../mine/mine',
      })
      wx.showToast({
         title: '审核成功(不通)',
      })

       },
       fail(res){
         console.log('修改数据失败',res)
         wx.switchTab({
          url: '../mine/mine',
        })
        wx.showToast({
         title: '审核失败',
        })
        }
    })
    // db.collection('fabu').doc(id).update({
    //   data:{
    //     shenhe:'失败'
    //   },
    //   success(res){
    //     console.log('修改数据成功');
    //     wx.switchTab({
    //       url: '../mine/mine',
    //   })
    //   wx.showToast({
    //      title: '审核成功(不通)',
    //   })

    //    },
    //    fail(res){
    //      console.log('修改数据失败',res)
    //      wx.switchTab({
    //       url: '../mine/mine',
    //     })
    //     wx.showToast({
    //      title: '审核失败',
    //     })
    //     }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var ne = []
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name:'findBuying',
      success(res){
        console.log(res)
        for(var i = 0; i < res.result.data.length; i++){
          if(res.result.data[i].shenhe == '审核中'){
            ne.push(res.result.data[i])
          }
        }
        that.setData({
          ne:ne 
        })
        wx.hideLoading({
          success: (res) => {},
        })
      }
    })
    // admin.get({
    //   success(res) {

    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.onLoad();
    wx.stopPullDownRefresh({
      success: (res) => {},
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})