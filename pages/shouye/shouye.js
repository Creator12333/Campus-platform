const app = getApp()
const db = wx.cloud.database();
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:[],
    iconList: [
  {imageUrl:'../img/mairu.png',text:'淘好货'},
  {imageUrl:'../img/jianzhichakan.png',text:'兼职'},
  {imageUrl:'../img/shiwuzhaolingchakan.png',text:'失物招领'},
  {imageUrl:'../img/kuaidi.png',text:'代取快递'},
  {imageUrl:'../img/zhuanpan.png',text:'干饭神器'},
  {imageUrl:'../img/fabu1.png',text:'发布内容'},
  {imageUrl:'../img/hezuo.png',text:'推广合作'},
  {imageUrl:'../img/jiaoliu.png',text:'交流群'},
    ],
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
    login:false
  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  selectList(res){
    var that = this;
    var name = res.currentTarget.dataset.name;
    var login = wx.getStorageSync('login')
    if(login == false){
      wx.showToast({
        icon:'none',
        title: '请前往个人页授权登录',
      })
      return;
    }else {
      if(name == '淘好货'){
        wx.navigateTo({
          url: '../buying/buying',
        })
      }else if(name == '兼职'){
        wx.navigateTo({
          url: '../jianzhi/jianzhi',
        })
      }else if(name == '失物招领'){
        wx.navigateTo({
          url: '../shiwuzhaoling/shiwuzhaoling',
        })
      }else if(name == '代取快递'){
        wx.navigateTo({
          url: '../daiqukuaidi/daiqukuaidi',
        })
      }else if(name == '发布内容'){
        wx.switchTab({
          url: '../fabu/fabu',
        })
      }else if(name == '推广合作'){
        wx.navigateTo({
          url: '../tuiguanghezuo/tuiguanghezuo',
        })
      }else if(name == '意见反馈'){
        wx.navigateTo({
          url: '../yijianfankui/yijianfankui',
        })
      }else if(name == '交流群'){
        wx.navigateTo({
          url: '../jiaoliu/jiaoliu',
        })
      }else if(name == '干饭神器'){
        wx.navigateTo({
          url: '../zhuanPan/zhuanPan',
        })
      }
    }
  },
  daiqukuaidi(res){
    var logged = wx.getStorageSync("logged");
    if(!logged){
      wx.showToast({
        icon:'none',
        title: '请前往个人页授权登录',
      })
      return
    }
    wx.navigateTo({
      url: '../daiqukuaidi/daiqukuaidi',
    })
  },
  guanyu(res){
    var logged = wx.getStorageSync("logged");
    if(!logged){
      wx.showToast({
        icon:'none',
        title: '请前往个人页授权登录',
      })
      return
    }
    wx.navigateTo({
      url: '../guanyu/guanyu',
    })
  },
  fabu(){
    var logged = wx.getStorageSync("logged");
    if(!logged){
      wx.showToast({
        icon:'none',
        title: '请前往个人页授权登录',
      })
      return
    }
   wx.switchTab({
     url: '../fabu/fabu',
   })
  },
  jiaoliu(){
    var logged = wx.getStorageSync("logged");
    if(!logged){
      wx.showToast({
        icon:'none',
        title: '请前往个人页授权登录',
      })
      return
    }
    wx.navigateTo({
      url: '../jiaoliu/jiaoliu',
    })
  },
  bindBuying(){
    var logged = wx.getStorageSync("logged");
    if(!logged){
      wx.showToast({
        icon:'none',
        title: '请前往个人页授权登录',
      })
      return
    }
    var that=this
    wx.navigateTo({
      url: '../buying/buying',
    })
  },
  bindSelling(){
    var logged = wx.getStorageSync("logged");
    if (!logged) {
      wx.showToast({
        icon: 'none',
        title: '请前往个人页授权登录',
      })
      return
    }
    wx.switchTab({
      url: '../fabu/fabu',
    })
  },
  chakanshiwuzhaoling(){
    var logged = wx.getStorageSync("logged");
    if (!logged) {
      wx.showToast({
        icon: 'none',
        title: '请前往个人页授权登录',
      })
      return
    }
    wx.navigateTo({
      url: '../shiwuzhaoling/shiwuzhaoling',
    })
  },
  fabushiwuzhaoling(){
    var logged = wx.getStorageSync("logged");
    if (!logged) {
      wx.showToast({
        icon: 'none',
        title: '请前往个人页授权登录',
      })
      return
    }
    wx.switchTab({
      url: '../fabu/fabu',
    })
  },
  chakanjianzhi(){
    var logged = wx.getStorageSync("logged");
    if (!logged) {
      wx.showToast({
        icon: 'none',
        title: '请前往个人页授权登录',
      })
      return
    }
    wx.navigateTo({
      url: '../jianzhi/jianzhi',
    })
  },
  fabujianzhi(){
    var logged = wx.getStorageSync("logged");
    if (!logged) {
      wx.showToast({
        icon: 'none',
        title: '请前往个人页授权登录',
      })
      return
    }
    wx.switchTab({
      url: '../fabu/fabu',
    })
  },
  tuiguanghezuo(){
    var logged = wx.getStorageSync("logged");
    if (!logged) {
      wx.showToast({
        icon: 'none',
        title: '请前往个人页授权登录',
      })
      return
    }
    wx.navigateTo({
      url: '../tuiguanghezuo/tuiguanghezuo',
    })
  },
  yijianfankui(){
    var logged = wx.getStorageSync("logged");
    if (!logged) {
      wx.showToast({
        icon: 'none',
        title: '请前往个人页授权登录',
      })
      return
    }
    wx.navigateTo({
      url: '../yijianfankui/yijianfankui',
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
    var login = wx.getStorageSync("login");
    var banner = [];
    db.collection('banner').get({
      success(res){
        console.log(res.data);
        for(var n = 0; n < res.data.length; n++){
          banner.push(res.data[n].img_src);
        }
        that.setData({
          banner:banner
        })
        wx.hideLoading({
          success: (res) => {},
        })
      }
    })
    console.log(login)
    if(!login){
      wx.showToast({
        icon:'none',
        title: '请前往个人页授权登录',
      })
    }else {
      this.setData({
        login:login
      })
    }
    // wx.showModal({
    //   title:'注意',
    //   content:'如果您是河北政法职业学院的同学，请直接点击首页的问卷填写即可，其它功能不适用，有问题联系QQ：505417246',
    //   showCancel:false
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