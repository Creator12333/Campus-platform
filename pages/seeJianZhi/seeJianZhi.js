const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    ne:[],
    ne_1:[],
    ne_2:[],
    array:[],
    postFaBu:true,
    postShenHeZhong:false,
    postShenHeShiBai:false,
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
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id-1)*60
      })
    },
  //导航栏的响应事件
  chooseFaBu(res){
    var that = this
    that.setData({
      postFaBu:true,
      postShenHeZhong:false,
      postShenHeShiBai:false
    })
  },
  chooseShenHeZhong(res){
    var that = this
    that.setData({
      postFaBu:false,
      postShenHeZhong:true,
      postShenHeShiBai:false
    })
  },
  chooseShenHeShiBai(res){
    var that = this
    that.setData({
      postFaBu:false,
      postShenHeZhong:false,
      postShenHeShiBai:true
    })
  },
  xiugai1(res){
    let that = this
    let id = res.currentTarget.dataset.id;
    let array = []
    for (var i = 0; i < that.data.array.length; i++) {
      if (that.data.array[i]._id == id) {
        array = that.data.array[i]
      }
    }
    let array1 = JSON.stringify(array)
    wx.navigateTo({
      url: '../changeJianZhi/changeJianZhi?data=' + id + '&data1=' + array1,
    })
  },
  shanchu1(res){
    wx.showLoading({
      title: '处理中',
    })
    var that = this
    var id = res.currentTarget.dataset.id;
    console.log(id)
    wx.cloud.callFunction({
      name:'DeleteJianZhi_1',
      data:{
        _id:id
      },
      success(res){
        wx.hideLoading({
          success: (res) => {},
        })
        console.log(res)
        wx.switchTab({
          url: '../mine/mine',
        })
        wx.showToast({
          title: '删除成功',
        })
      },
      fail(res){
        console.log(res)
        wx.showToast({
          icon: 'none',
          title: '删除失败',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var openid = options.data
    var ne = []
    var ne_1 = []
    var ne_2 = []
    that.setData({
      openid: openid
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name:'findJob',
      success(res){
        console.log(res.result.data)
        for(var i = 0; i < res.result.data.length; i++){
          if((res.result.data[i].UserID == openid) && (res.result.data[i].shenhe == '通过') ){
            ne.push(res.result.data[i])
          }else if((res.result.data[i].UserID == openid) && (res.result.data[i].shenhe == '审核中')){
            ne_1.push(res.result.data[i])
          }else if((res.result.data[i].UserID == openid) && (res.result.data[i].shenhe == '失败')){
            ne_2.push(res.result.data[i])
          }
        }
        that.setData({
          ne:ne,
          ne_1:ne_1,
          ne_2:ne_2,
          array:res.result.data
        })
        wx.hideLoading({
          success: (res) => {},
        })
      }
    })
    // admin.get({
    //   success(res) {
    //     for (var i = 0; i < res.data.length; i++) {
    //       if (res.data[i].UserID == openid) {
    //         ne1.push(res.data[i])
    //       }
    //     }
    //      that.setData({
    //        ne1: ne1
    //      })
    //   },
    // })
    // adminn.get({
    //   success: function (res) {
    //     for (var i = 0; i < res.data.length; i++) {
    //       if (res.data[i].UserID == openid) {
    //         ne0.push(res.data[i])
    //       }
    //     }
    //     that.setData({
    //       ne0: ne0
    //     })
    //   }
    // })
    // adminnn.get({
    //   success(res) {
    //     console.log(res.data)
    //     for (var i = 0; i < res.data.length; i++) {
    //       if (res.data[i].UserID == openid) {
    //         ne2.push(res.data[i])
    //       }
    //     }
    //     that.setData({
    //       ne2: ne2
    //     })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    wx.showToast({
      icon: 'none',
      title: '别滑了兄弟！到底了',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})