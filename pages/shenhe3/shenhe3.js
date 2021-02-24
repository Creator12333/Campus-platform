const db = wx.cloud.database();
const admin = db.collection('shiwuzhaoling');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ne:[],
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
      url: '../seeShenHe1/seeShenHe1?data=' + array1,
    })
  },
ok(res){
  var that=this
  var id=res.target.dataset.id
  console.log("id:",id)
  wx.cloud.callFunction({
    name:'shenHe',
    data:{
      jihe:'shiwuzhaoling',
      id:id,
      shenhe:'通过'
    },
    success(res){
      console.log('修改数据成功');
      wx.switchTab({
        url: '../mine/mine',
      })
      wx.showToast({
       title: '审核成功(通过)',
      })
    },
    fail(res){
      console.log('修改数据失败');
      wx.switchTab({
        url: '../mine/mine',
      })
      wx.showToast({
       title: '审核失败',
      })
    }
  })
  // db.collection('shiwuzhaoling').doc(id).update({
  //   data:{
  //     shenhe:'通过'
  //   },
  //   success(res){
  //     console.log('修改数据成功');
  //     wx.switchTab({
  //       url: '../mine/mine',
  //     })
  //     wx.showToast({
  //      title: '审核成功(通过)',
  //     })
  //   },
  //   fail(res){
  //     console.log('修改数据失败');
  //     wx.switchTab({
  //       url: '../mine/mine',
  //     })
  //     wx.showToast({
  //      title: '审核失败',
  //     })
  //   }
  // })
  // var array=[]
  // var fileList=[]
  // for(var i=0;i<that.data.ne.length;i++){
  //   if(that.data.ne[i]._id==id){
  //     array.push(that.data.ne[i])
  //   }
  // }
  // console.log(array)
  // fileList.push(array[0].fileID)
  // //将审核过的信息上传至新数据库
  // ccc.add({
  //   data:{
  //     wupinmiaoshu: array[0].wupinmiaoshu,
  //     array1: array[0].array1,
  //     index1: array[0].index1,
  //     faxiandeshijian: array[0].faxiandeshijian,
  //     lianxifangshi2: array[0].lianxifangshi2,
  //     lostImage: array[0].lostImage,
  //     fileList1: array[0].fileList1,
  //     fileID: array[0].fileID1,
  //     see:array[0].see,
  //     UserID:array[0].UserID
  //   },
  //   success(res){
  //     console.log("上传到新数据库成功",res)
  //     //审核通过，删除原始数据库书库
  //     //删除图片
  //    /* console.log(fileList)
  //     wx.cloud.callFunction({
  //       name: 'DeleteImage',
  //       data: {
  //         fileList: fileList
  //       },
  //       success(res) {
  //         console.log("图片删除成功", res)
  //       },
  //       fail(res) {
  //         console.log("图片删除失败", res)
  //       },
  //     })*/
  //     //删除数据
  //     wx.cloud.callFunction({
  //       name: 'DeleteLost',
  //       data: {
  //         _id: id
  //       },
  //       success(res) {
  //         console.log("云函数删除云数据库内容成功", res)
  //         wx.switchTab({
  //           url: '../mine/mine',
  //         })
  //         wx.showToast({
  //           title: '审核成功(通过)',
  //         })
  //       },
  //       fail(res) {
  //         console.log("云函数删除失败")
  //         wx.switchTab({
  //           url: '../mine/mine',
  //         })
  //         wx.showToast({
  //           icon:'none',
  //           title: '审核失败',
  //         })
  //       }
  //     })
  //   },
  //   fail(res){
  //     console.log("上传到新数据库失败",res)
  //     wx.showToast({
  //       icon:'none',
  //       title: '上传至新数据库失败',
  //     })
  //   }
  // })
},
no(res){
  var that = this
  var id = res.target.dataset.id;
  wx.cloud.callFunction({
    name:'shenHe',
    data:{
      jihe:'shiwuzhaoling',
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
      console.log('修改数据失败');
      wx.switchTab({
        url: '../mine/mine',
    })
    wx.showToast({
       title: '审核失败',
    })
    }
  })

  // db.collection('shiwuzhaoling').doc(id).update({
  //   data:{
  //     shenhe:'失败'
  //   },
  //   success(res){
  //     console.log('修改数据成功');
  //     wx.switchTab({
  //       url: '../mine/mine',
  //   })
  //   wx.showToast({
  //      title: '审核成功(通过)',
  //   })
  //   },
  //   fail(res){
  //     console.log('修改数据失败');
  //     wx.switchTab({
  //       url: '../mine/mine',
  //   })
  //   wx.showToast({
  //      title: '审核失败',
  //   })
  //   }
  // })
  // var array = []
  // var fileList = []
  // for (var i = 0; i < that.data.ne.length; i++) {
  //   if (that.data.ne[i]._id == id) {
  //     array.push(that.data.ne[i])
  //   }
  // }
  // fileList.push(array[0].fileID)
  // //   console.log(fileList[0])
  // wx.cloud.callFunction({
  //   name: 'DeleteImage',
  //   data: {
  //     fileList: fileList
  //   },
  //   success(res) {
  //     console.log("图片删除成功", res)
  //   },
  //   fail(res) {
  //     console.log("图片删除失败", res)
  //   },
  // })
  // //删除数据
  // wx.cloud.callFunction({
  //   name: 'DeleteLost',
  //   data: {
  //     _id: id
  //   },
  //   success(res) {
  //     console.log("云函数删除云数据库内容成功", res)
  //     wx.switchTab({
  //       url: '../mine/mine',
  //     })
  //     wx.showToast({
  //       title: '审核成功(不通)',
  //     })
  //   },
  //   fail(res) {
  //     console.log("云函数删除失败")
  //     wx.switchTab({
  //       url: '../mine/mine',
  //     })
  //     wx.showToast({
  //       title: '审核失败',
  //     })
  //   }
  // })

},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var ne = [];
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name:'findLost',
      success(res){
        console.log(res.result.data)
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
    this.onLoad();
    wx.stopPullDownRefresh({
      success: (res) => {},
    })
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