var app = getApp();
var util = require('../../utils/util.js');
const db = wx.cloud.database();
const admin = db.collection('fabu');
const adminn = db.collection('jianzhifabu');
const adminnn = db.collection('shiwuzhaoling');
var time = util.formatTime(new Date());
//闲置物品发布

//兼职发布

//失物招领发布

Page({
  /**
   * 页面的初始数据
   */
  data:{
    TabCur:0,
    TabCur_item:0,
    scrollLeft:0,
    scrollLeft_item:0,
    name: '',
    new1: '',
    jiage: '',
    miaoshu: '',
    lianxifangshi: '',
    navTitle:['闲置物品','兼职','失物招领','代取快递'],
    navTitle_item:['代取快递','其它任务'],
    picker:['电子产品','生活日用品','化妆品','鞋子','男士衣物','女士衣物','书籍','军训相关用品','交通工具','游戏账号','其它'],
    // 
    gongzuomingcheng: '',
    gongzuoshijian: '',
    gongzuodidian: '',
    renyuanyaoqiu: '',
    xinzifuli: '',
    lianxifangshi1: '',
    zhiweimiaoshu: '',
    // 
    picker1: ['思源楼', '知行楼', '通方楼', '天佑', '图书馆', '一期生活服务区', '一期食堂', '二期食堂', '操场', '宿舍楼附近', '旧实验楼', '新实验楼', '教工食堂', '大学生活动中心', '行政楼', '其它'],
    index1: 0,
    wupinmiaoshu: '',
    faxiandeshijian: '',
    lianxifangshi2: '',
    // 
    picker2:['大件','中件','小件'],
    index2:0,
    // 
    ExpressAddress:null,
    ExpressTime:null,
    ExpressMoney:null,
    ExpressQQ:null,
    ExpressPhone:null,
    // 
    TaskContent:null,
    TaskMoney:null,
    TaskQQ:null,
    TaskPhone:null,

    index:0,
    imgList: [],
    imgList_http:[],
    img_pay:[],
    img_pay_http:[],
    imgList_Lost:[],
    imgList_Lost_http:[],
    hidden:true,
    hidden1:true,
    hidden2:true
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  PickerChangeExpress(e) {
    console.log(e);
    this.setData({
      index2: e.detail.value
    })
  },
  tabSelect_item(e) {
    this.setData({
      TabCur_item: e.currentTarget.dataset.id,
      scrollLeft_item: (e.currentTarget.dataset.id-1)*60
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
    console.log(this.data.TabCur == 1);
  },
  upPayCode(res){
    var that=this
    var number=(Math.random()*1000).toFixed(0);
    var fileID_pay=[]
    wx.chooseImage({
      count:1,
      sizeType:['original','compressed'],
      sourceType:['album','camera'],
      success(res){
        wx.showLoading({
          title: '加载中',
        })
        var timestamp=Date.parse(new Date());
        timestamp=timestamp/1000
        //tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths=res.tempFilePaths
        console.log('tempFilePath:',tempFilePaths)
        wx.cloud.uploadFile({
          cloudPath:'payCode/' + timestamp+'-'+number,
          filePath:tempFilePaths[0],//文件路径
          success(res){
            console.log('res.fileID',res.fileID)
            fileID_pay.push(res.fileID)
            console.log(fileID_pay)
            that.setData({
              fileID_pay:fileID_pay
            })
            that.setData({
              img_pay:that.data.img_pay.concat(res.fileID)
            })
            wx.cloud.getTempFileURL({
              fileList: fileID_pay,
              success: res => {
               console.log("fileList_pay",res.fileList[0].tempFileURL)
              that.setData({
                img_pay_http:res.fileList[0].tempFileURL
              })
              wx.hideLoading({
                success: (res) => {},
              })
              }
            })
          },
          fail(res){
            console.log("获取fileID失败",res)
          }
        })
      }
    })
  },
  upload_img(res){
    var that=this
    var number=(Math.random()*1000).toFixed(0);
    var fileID=[]
    wx.chooseImage({
      count:1,
      sizeType:['original','compressed'],
      sourceType:['album','camera'],
      success(res){
        wx.showLoading({
          title: '加载中',
        })
        var timestamp=Date.parse(new Date());
        timestamp=timestamp/1000
        //tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths=res.tempFilePaths
        console.log('tempFilePath:',tempFilePaths)
        wx.cloud.uploadFile({
          cloudPath:'shop/' + timestamp+'-'+number,
          filePath:tempFilePaths[0],//文件路径
          success(res){
            console.log('res.fileID',res.fileID)
            fileID.push(res.fileID)
            console.log(fileID)
            that.setData({
              fileID:fileID
            })
            that.setData({
              imgList:that.data.imgList.concat(res.fileID)
            })
            wx.cloud.getTempFileURL({
              fileList: fileID,
              success: res => {
               console.log(res.fileList[0].tempFileURL)
              that.setData({
                imgList_http:res.fileList[0].tempFileURL
              })
              wx.hideLoading({
                success: (res) => {},
              })
              }
            })
          },
          fail(res){
            console.log("获取fileID失败",res)
          }
        })
      }
    })
  },
  delete_pay(res){
    wx.showLoading({
      title: '处理中',
    })
    var that=this;
    console.log(that.data.img_pay);
    console.log(res.currentTarget.dataset.id);
    var id=res.currentTarget.dataset.id;
    var img_pay=that.data.img_pay;
    img_pay.splice(id,1);
    that.setData({
      img_pay:img_pay
    })
    wx.cloud.deleteFile({
      fileList:[res.currentTarget.dataset.src],
      success(res){
        console.log(res.fileList)
        wx.hideLoading({
          success: (res) => {},
        })
      },
      fail(res){
        console.log("删除失败",res)
      }
    })
    console.log(that.data.img_pay)
  },
  delete(res){
    wx.showLoading({
      title: '处理中',
    })
    var that=this;
    console.log(that.data.imgList);
    console.log(res.currentTarget.dataset.id);
    var id=res.currentTarget.dataset.id;
    var imgList=that.data.imgList;
    imgList.splice(id,1);
    that.setData({
      imgList:imgList
    })
    wx.cloud.deleteFile({
      fileList:[res.currentTarget.dataset.src],
      success(res){
        console.log(res.fileList)
        wx.hideLoading({
          success: (res) => {},
        })
      },
      fail(res){
        console.log("删除失败",res)
      }
    })
    console.log(that.data.imgList)
  },
  getOpenId() {
    let that = this
    wx.cloud.callFunction({
      name: 'getOpenId',
      complete: res => {
        console.log('云函数获取到的openid:', res.result.openId)
        var openid = res.result.openId;
        that.setData({
          openid: openid
        })
      }
    })
  },
  //闲置物品发布页的弹窗
  cancel: function () {
    this.setData({
      hidden: true
    });
  },
  //兼职发布页的弹窗
  cancel1:function(){
    this.setData({
      hidden1:true
    })
  },
  //失物招领页的弹窗
  cancel2: function () {
    this.setData({
      hidden2: true
    })
  },
  shiwuzhaolingfabu(){
    var that=this
    var login = wx.getStorageSync("login");
    if (!login) {
      wx.showToast({
        icon: 'none',
        title: '请前往个人页授权登录',
      })
      return
    }
    //判断内容是否为空
    if (that.data.wupinmiaoshu.length > 10) {
      wx.showToast({
        icon: 'none',
        title: '物品描述字数应该小于10字',
      })
      return
    }
    if (that.data.wupinmiaoshu == "" || that.data.faxiandeshijian == "" || that.data.lianxifangshi2 == "" || that.data.lostImage == "") {
      wx.showToast({
        icon: 'none',
        title: '请完整填写信息',
      })
      return
    }
    that.setData({
      hidden2: !that.data.hidden2
    })
  },
  jianzhifabu:function(){
    var login = wx.getStorageSync("login");
    if (!login) {
      wx.showToast({
        icon: 'none',
        title: '请前往个人页授权登录',
      })
      return
    }
    var that=this
    //判断内容是否为空
    if(that.data.zhiweimiaoshu.length>65){
      wx.showToast({
        icon:'none',
        title: '职位描述应小于65个字',
      })
      return
    }
    if (that.data.gongzuomingcheng == "" || that.data.gongzuoshijian == "" || that.data.gongzuodidian == "" || that.data.renyuanyaoqiu == "" || that.data.xinzifuli == "" || that.data.lianxifangshi1 == "" || that.data.zhiweimiaoshu == "") {
      wx.showToast({
        icon: 'none',
        title: '请完整填写信息',
      })
      return
    }
    that.setData({
      hidden1: !that.data.hidden1
    })
  },
  fabu: function () {
    var login = wx.getStorageSync("login");
    if (!login) {
      wx.showToast({
        icon: 'none',
        title: '请前往个人页授权登录',
      })
      return
    }
    var that = this
    //判断内容是否为空
    if (that.data.miaoshu.length > 30) {
      wx.showToast({
        icon: 'none',
        title: '物品描述字数应该小于30字',
      })
      return
    }
    if (that.data.name == "" || that.data.new1 == "" || that.data.jiage == "" || that.data.miaoshu == "" || that.data.lianxifangshi == "" || that.data.imgList == "") {
      console.log(that.data.name,that.data.new1,that.data.jiage,that.data.miaoshu,that.data.lianxifangshi,that.data.imgList);
      wx.showToast({
        icon: 'none',
        title: '请完整填写信息',
      })
      return
    }
    that.setData({
      hidden: !that.data.hidden
    })
  },
  //闲置发布页的多项选择器
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  getName(event) {
    this.setData({
      name: event.detail.value
    })
  },
  getNew(event) {
    this.setData({
      new1: event.detail.value
    })
  },
  getJiaGe(event) {
    this.setData({
      jiage: event.detail.value
    })
  },
  getMiaoShu(event) {
    this.setData({
      miaoshu: event.detail.value
    })
  },
  getLianXiFangShi(event) {
    this.setData({
      lianxifangshi: event.detail.value
    })
  },
  //闲置物品发布页的信息提交按钮
  confirm() {
    let that = this
    admin.add({
      data: {
        name: that.data.name,
        new1: that.data.new1,
        jiage: that.data.jiage,
        miaoshu: that.data.miaoshu,
        lianxifangshi: that.data.lianxifangshi,
        array: that.data.picker[that.data.index],
        index: that.data.index,
        fileID:that.data.imgList,
        fileList:that.data.imgList_http,
        UserID:that.data.openid,
        fileID_pay:that.data.img_pay,
        fileList_pay:that.data.img_pay_http,
        see:0,
        shenhe:'审核中'
      },
      success: function (res) {
        //console.log("上传成功", res)
        wx.showToast({
          title: '已提交审核',
        })
        that.setData({
          name: '',
          new1: '',
          jiage: '',
          miaoshu: '',
          lianxifangshi: '',
          index: 0,
          imgList:[],
          img_pay:[]
        })
      },
      fail: function () {
        //console.log("上传失败", res)
      }
    })
    that.setData({
      hidden:true
    })
  },
  gongzuomingcheng(res) {
    this.setData({
      gongzuomingcheng: res.detail.value
    })
  },
  gongzuoshijian(res) {
    this.setData({
      gongzuoshijian: res.detail.value
    })
  },
  gongzuodidian(res) {
    this.setData({
      gongzuodidian: res.detail.value
    })
  },
  renyuanyaoqiu(res) {
    this.setData({
      renyuanyaoqiu: res.detail.value
    })
  },
  xinzifuli(res) {
    this.setData({
      xinzifuli: res.detail.value
    })
  },
  lianxifangshi1(res) {
    this.setData({
      lianxifangshi1: res.detail.value
    })
  },
  zhiweimiaoshu(res) {
    this.setData({
      zhiweimiaoshu: res.detail.value
    })
  },
  //兼职发布页的信息提交按钮
  confirm1() {
    let that = this
    adminn.add({
      data: {
        gongzuomingcheng: that.data.gongzuomingcheng,
        gongzuoshijian: that.data.gongzuoshijian,
        gongzuodidian: that.data.gongzuodidian,
        renyuanyaoqiu: that.data.renyuanyaoqiu,
        xinzifuli: that.data.xinzifuli,
        lianxifangshi1: that.data.lianxifangshi1,
        zhiweimiaoshu: that.data.zhiweimiaoshu,
        UserID: that.data.openid,
        see:0,
        shenhe:'审核中'
      },
      success: function (res) {
        //console.log("上传成功", res)
        wx.showToast({
          title: '已提交审核',
        })
        that.setData({
          gongzuomingcheng: '',
          gongzuoshijian: '',
          gongzuodidian: '',
          renyuanyaoqiu: '',
          xinzifuli: '',
          lianxifangshi1: '',
          zhiweimiaoshu: '',
        })
      },
      fail: function (res) {
        //console.log("上传失败")
      }
    })
    that.setData({
      hidden1:!that.data.hidden1
    })
  },
  wupinmiaoshu(res) {
    this.setData({
      wupinmiaoshu: res.detail.value
    })
  },
  faxiandeshijian(res) {
    this.setData({
      faxiandeshijian: res.detail.value
    })
  },
  lianxifangshi2(res) {
    this.setData({
      lianxifangshi2: res.detail.value
    })
  },
  //失物招领页的信息提交按钮
  confirm2() {
    let that = this;
    // console.log(that.data.file)
    adminnn.add({
      data: {
        wupinmiaoshu: that.data.wupinmiaoshu,
        array1: that.data.picker1[that.data.index1],
        index1: that.data.index1,
        faxiandeshijian: that.data.faxiandeshijian,
        lianxifangshi2: that.data.lianxifangshi2,
        fileList1:that.data.imgList_Lost_http,
        fileID:that.data.imgList_Lost,
        UserID: that.data.openid,
        see:0,
        shenhe:'审核中'
      },
      success(res) {
        //console.log("发布成功", res)
        wx.showToast({
          title: '已提交审核',
        })
        that.setData({
          wupinmiaoshu: '',
          index1: 0,
          faxiandeshijian: '',
          lianxifangshi2: '',
          imgList_Lost:[],
        })
      },
      fail(res) {
        console.log("发布失败", res)
      }
    })
    that.setData({
      hidden2:true
    })
  },
  delete_lost(res){
    wx.showLoading({
      title: '处理中',
    })
    var that=this;
    console.log(that.data.imgList_Lost);
    console.log(res.currentTarget.dataset.id);
    var id=res.currentTarget.dataset.id;
    var imgList_Lost=that.data.imgList_Lost;
    imgList_Lost.splice(id,1);
    that.setData({
      imgList_Lost:imgList_Lost
    })
    wx.cloud.deleteFile({
      fileList:[res.currentTarget.dataset.src],
      success(res){
        console.log(res.fileList)
        wx.hideLoading({
          success: (res) => {},
        })
      },
      fail(res){
        console.log("删除失败",res)
      }
    })
    console.log(that.data.imgList_Lost)
  },
  bindImage(){
    var that=this
    var number=(Math.random()*1000).toFixed(0);
    var imgList_Lost=[]
    wx.chooseImage({
      count:1,
      sizeType:['original','compressed'],
      sourceType:['album','camera'],
      success(res){
        wx.showLoading({
          title: '加载中',
        })
        var timestamp=Date.parse(new Date());
        timestamp=timestamp/1000
        //tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths=res.tempFilePaths
        console.log('tempFilePath:',tempFilePaths)
        wx.cloud.uploadFile({
          cloudPath:'失物招领图片/' + timestamp+'-'+number,
          filePath:tempFilePaths[0],//文件路径
          success(res){
            console.log('res.fileID',res.fileID)
            imgList_Lost.push(res.fileID)
            console.log(imgList_Lost)
            that.setData({
              imgList_Lost:that.data.imgList_Lost.concat(res.fileID)
            })
            wx.cloud.getTempFileURL({
              fileList: imgList_Lost,
              success: res => {
               console.log("fileList_pay",res.fileList[0].tempFileURL)
              that.setData({
                imgList_Lost_http:res.fileList[0].tempFileURL
              })
              wx.hideLoading({
                success: (res) => {},
              })
              }
            })
          },
          fail(res){
            console.log("获取fileID失败",res)
          }
        })
      }
    })
  },

  //失物招领页的多项选择器
  bindPickerLost: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getOpenId()
    var login = wx.getStorageSync("login");
    if (!login) {
      wx.showToast({
        icon: 'none',
        title: '请前往个人页授权登录',
      })
      return
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
    wx.showToast({
      icon: 'none',
      title: '别滑了兄弟！到底了',
    })
  },

  // 代取快递信息校验
  ExpressReceiveAddress(res){
    this.setData({
      ExpressAddress:res.detail.value
    })
  },
  ExpressTime(res){
    this.setData({
      ExpressTime:res.detail.value
    })
  },
  ExpressMoney(res){
    this.setData({
      ExpressMoney:res.detail.value
    })
  },
  ExpressQQ(res){
    this.setData({
      ExpressQQ:res.detail.value
    })
  },
  ExpressPhone(res){
    this.setData({
      ExpressPhone:res.detail.value
    })
  },
  ExpressSubmit(res){
    var login = wx.getStorageSync('login');
    if(login != true){
      wx.showToast({
        title: '请前往个人中心授权登录',
      })
      return;
    }
    var that = this;
    var avatarUrl = null;
    var nickName = null;
    var time = util.formatTime(new Date());
    if(that.data.ExpressAddress == null || that.data.ExpressTime == null || that.data.ExpressMoney == null || that.data.ExpressQQ == null || that.data.ExpressPhone == null){
      wx.showToast({
        title: '请完整填写信息',
      })
    }else {
        avatarUrl = wx.getStorageSync('userInfo').avatarUrl;
        nickName = wx.getStorageSync('userInfo').nickName;
        db.collection('ExpressAndTask').add({
        data:{
          avatarUrl:avatarUrl,
          nickName:nickName,
          status:'新发布',
          leiXing:'代取快递',
          ExpressLeiXing:that.data.picker2[that.data.index2],
          ExpressAddress:that.data.ExpressAddress,
          ExpressTime:that.data.ExpressTime,
          Money:that.data.ExpressMoney,
          ExpressQQ:that.data.ExpressQQ,
          ExpressPhone:that.data.ExpressPhone,
          timeNow:time,
          shenHe:'审核中',
         },
        success(res){
            console.log("代取快递发布成功");
            that.setData({
              ExpressLeiXing:null,
              ExpressAddress:null,
              ExpressTime:null,
              ExpressMoney:null,
              ExpressQQ:null,
              ExpressPhone:null
              })
              wx.showToast({
                title: '已提交审核',
                })
              },
            fail(res){
            console.log("代取快递发布失败")
          }
      })
    }
  },

  // 其它任务
  otherTaskContent(res){
    this.setData({
      TaskContent:res.detail.value
    })
  },
  otherTaskMoney(res){
    this.setData({
      TaskMoney:res.detail.value
    })
  },
  otherTaskQQ(res){
    this.setData({
      TaskQQ:res.detail.value
    })
  },
  otherTaskPhone(res){
    this.setData({
      TaskPhone:res.detail.value
    })
  },
  otherTaskSubmit(res){
    var that = this;
    var time = util.formatTime(new Date());
    var avatarUrl = null;
    var nickName = null;
    if(that.data.TaskContent == null || that.data.TaskMoney == null || that.data.TaskQQ == null || that.data.TaskPhone == null){
      wx.showToast({
        title: '请完整填写信息',
      })
    }else{
                avatarUrl = wx.getStorageSync('userInfo').avatarUrl;
                nickName = wx.getStorageSync('userInfo').nickName;
                db.collection('ExpressAndTask').add({
                  data:{
                    avatarUrl:avatarUrl,
                    nickName:nickName,
                    status:'新发布',
                    leiXing:'其它任务',
                    TaskContent:that.data.TaskContent,
                    Money:that.data.TaskMoney,
                    TaskQQ:that.data.TaskQQ,
                    TaskPhone:that.data.TaskPhone,
                    timeNow:time,
                    shenHe:'审核中'
                  },
                  success(res){
                    console.log("其它任务发布成功");
                    wx.showToast({
                      title: '已提交审核',
                    })
                    that.setData({
                      TaskContent:'',
                      TaskMoney:'',
                      TaskQQ:'',
                      TaskPhone:''
                    })
                  },
                  fail(res){
                    console.log("其它任务发布失败")
                  }
                })
              }
    }


  //响应事件


  //发布物品的响应事件




  //发布兼职的响应事件


})