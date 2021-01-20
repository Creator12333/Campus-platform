const app=getApp()
const db = wx.cloud.database();
const admin = db.collection('userInformation');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    array:[],
    userRoot:'',
    touxiang:'',
    name:'',
    login:false,
    userInfo:''
  },
  wenJuanHouTai(){
    wx.navigateTo({
      url: '../wenJuanHouTai/wenJuanHouTai',
    })
  },
  seeUp(res){
    wx.navigateTo({
      url: '../seeUp/seeUp?openid='+this.data.openid,
    })
  },
  getUserInfo(e){
    var that = this
    wx.getSetting({
      success(res){
        if([res.authSetting['scope.userInfo']]){
          wx.getUserInfo({
            success(res){
              that.setData({
                login:true,
                userInfo:res.userInfo
              })
             wx.setStorageSync('userInfo', res.userInfo);
             wx.setStorageSync('login', true);
             db.collection('userInformation').add({
               data:res.userInfo,
               success(res){
                 console.log("用户信息上传成功");
               },
               fail(res){
                 console.log("用户信息上传失败",res);
               }
             })
            }
          })
        }
      }
    })
  },
  shenhe(){
    wx.navigateTo({
      url: '../shenhe/shenhe?openid='+this.data.openid,
    })
  },
  getOpenId(){
    var that=this
    wx.cloud.callFunction({
      name: 'getOpenId',
      complete: res => {
        console.log('云函数获取到的openid:', res.result.openId)
         var openid = res.result.openId;
        that.setData({
          openid: openid
        })
        if (openid == "o-36g4il0baMUiFNaU25N0VP6LsM") {
          that.setData({
            userRoot: true
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    that.getOpenId();
    var login = wx.getStorageSync('login');
    if(login == ''){
      that.getUserInfo();
    }else {
      that.setData({
        login:login,
        userInfo:wx.getStorageSync('userInfo')
      })
    }
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