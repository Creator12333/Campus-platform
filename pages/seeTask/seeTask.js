const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select:'已发布',
    array:[],
    arrayAll:[],
    openid:''
  },
  ok(res){
    var that = this;
    var id = res.currentTarget.dataset.id;
    var array = [];
    wx.showLoading({
      title: '处理中',
    })
    wx.cloud.callFunction({
      name:'changeExpressStatus',
      data:{
        status:'已完成',
        id:id
      },
      success(res){
        console.log("更改完成");
        wx.cloud.callFunction({
          name:'selectExpress',
          success(res){
            console.log(res.result.data);
            for(var i = 0; i < res.result.data.length; i++){
              if(res.result.data[i]._openid == that.data.openid){
                array.push(res.result.data[i]);
              }
            }
            that.setData({
              array:array,
              arrayAll:res.data
            })
            wx.hideLoading({
              success: (res) => {
                wx.showToast({
                  title: '处理完成',
                })
              },
            })
          }
        })
      }
    })
  },
  no(res){
    var that = this;
    var id = res.currentTarget.dataset.id;
    var array = [];
    wx.showLoading({
      title: '处理中',
    })
    wx.cloud.callFunction({
      name:'DeleteExpress',
      data:{
        id:id
      },
      success(res){
        console.log("删除成功");
        wx.cloud.callFunction({
          name:'selectExpress',
          success(res){
            console.log(res.result.data);
            for(var i = 0; i < res.result.data.length; i++){
              if(res.result.data[i]._openid == that.data.openid){
                array.push(res.result.data[i]);
              }
            }
            that.setData({
              array:array,
              arrayAll:res.data
            })
            wx.hideLoading({
              success: (res) => {
                wx.showToast({
                  title: '处理完成',
                })
                wx.switchTab({
                  url: '../mine/mine',
                })
              },
            })
          }
        })
      }
    })
  },
  selectTap(res){
    var that = this;
    var id = res.currentTarget.dataset.id;
    var array = [];
    for(var i = 0; i < that.data.arrayAll.length; i++){
      if(that.data.arrayAll[i].shenHe == id){
        array.push(that.data.arrayAll[i]);
      }
    }
    that.setData({
      select:id,
      array:array
    })
    console.log(id);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var openid = options.data;
    var array = [];
    console.log(openid);
    that.setData({
      openid:openid
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name:'selectExpress',
      success(res){
        console.log(res.result.data);
        for(var i = 0; i < res.result.data.length; i++){
          if(res.result.data[i]._openid == openid && res.result.data[i].shenHe == '已发布'){
            array.push(res.result.data[i]);
          }
        }
        that.setData({
          array:array,
          arrayAll:res.result.data
        })
        wx.hideLoading({
          success: (res) => {},
        })
      }
    })
    // db.collection('ExpressAndTask').get({
    //   success(res){
    //     console.log(res.data);

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