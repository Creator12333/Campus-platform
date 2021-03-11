const db = wx.cloud.database();
const admin = db.collection('shenhe2');
Page({
/**标题：工作名称
*状态：薪资福利
*描述信息：职位描述
*/
  /**
   * 页面的初始数据
   */
  data: {
    ne:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var ne = [];
    wx.showLoading({
      title: '加载中',
    })
    /*const db = wx.cloud.database({
      env: 'xiaoliu-k8902'
    })*/
    /*db.collection('shenhe2').get({
      success: function (res) {
        that.setData({
          ne: res.data
        })
        //console.log(res.data)
      }
    })*/
    wx.cloud.callFunction({
      name:'findJob',
      success(res){
        console.log(res.result.data)
        for(var i = 0; i < res.result.data.length; i++){
          if(res.result.data[i].shenhe == '通过'){
            ne.push(res.result.data[i])
          }
        }
        that.setData({
          ne:ne
        })
        wx.hideLoading({
          
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
    wx.showToast({
      icon: 'none',
      title: '别滑了兄弟！到底了',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  bindjianzhi(event) {
    let that = this
    let qqq=event.currentTarget.dataset.id;
    console.log(event)
    wx.cloud.callFunction({
      name:'findWhere',
      data:{
        jihe:'jianzhifabu',
        id:qqq
      },
      success(res){
        var see = res.result.data[0].see
        see = see + 9;
        console.log(see);
        wx.cloud.callFunction({
          name:'changSee',
          data:{
            jihe:'jianzhifabu',
            id:qqq,
            see:see
          },
          success(res){
            console.log(see)
          }
        })
      }
    })
    // db.collection("jianzhifabu").where({
    //   _id: qqq
    // }).get({
    //   success(res) {
    //     var see = res.data[0].see
    //     see++;
    //     console.log(see)
    //     db.collection("jianzhifabu").doc(qqq).update({
    //       data: {
    //         see: see
    //       },
    //       success(res) {
    //         console.log("浏览量+1", see)
    //       }
    //     })
    //   }
    // })
    wx.navigateTo({
      url: '../bindjianzhi/bindjianzhi?data='+qqq,
    })
  },
})