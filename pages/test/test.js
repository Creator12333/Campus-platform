const db = wx.cloud.database();
var skip = 0;
var array = [];
const util = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[],
    time:null,
    suSheId:null,
    qingJia:null,
    yeBuGuiSu:null,
    img_src:null,
    fileID:null,
    list:[
      {id:0,name:'电子产品'},
      {id:1,name:'生活日用品'},
      {id:2,name:'化妆品'},
      {id:3,name:'鞋子'},
      {id:4,name:'男士衣物'},
      {id:5,name:'女士衣物'},
      {id:6,name:'书籍'},
      {id:7,name:'军训相关用品'},
      {id:8,name:'交通工具'},
      {id:9,name:'游戏账号'},
      {id:10,name:'其它'}
    ],
    TabCur:0,
    MainCur:0,
    VerticalNavTop:0,
    load: true
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;     
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  wenJuan1(res){
    this.setData({
      time:res.detail.value
    })
  },
  wenJuan2(res){
    this.setData({
      suSheId:res.detail.value
    })
  },
  wenJuan3(res){
    this.setData({
      qingJia:res.detail.value
    })
  },
  wenJuan4(res){
    this.setData({
      yeBuGuiSu:res.detail.value
    })
  },
  upImg(res){
    var that = this;
    var time = Date.parse(new Date()) / 1000;
    var num0 = Math.floor(Math.random()*100);
    var num1 = Math.floor(Math.random()*1000);
    var fileID = [];
    wx.chooseImage({
      count: 1,
      success:res => {
        wx.showLoading({
          title: '上传中',
        })
        console.log(res);
        wx.cloud.uploadFile({
          cloudPath:'wenJuan/'+ time + num0 +num1 + '.png',
          filePath:res.tempFilePaths[0],
          success:e =>{
            console.log(e);
            fileID.push(e.fileID);
            that.setData({
              fileID:fileID
            })
            console.log("上传成功",e);
            wx.cloud.getTempFileURL({
              fileList:fileID,
              success:res => {
                console.log(res.fileList[0].tempFileURL);
                that.setData({
                  img_src:res.fileList[0].tempFileURL
                })
                wx.hideLoading({
                  success: (res) => {},
                })
              }
            })
          }
        })
      }
    })
  },
  subMit(res){
    var that = this;
    var timeNow = util.formatTime(new Date());
    if(that.data.time == null || that.data.suSheId == null || that.data.qingJia == null || that.data.yeBuGuiSu == null || that.data.img_src == null){
      wx.showToast({
        title: '请完整填写信息',
      })
    }else {
      wx.showLoading({
        title: '加载中',
      })
      db.collection('test').add({
        data:{
          timeNow:timeNow,
          time:that.data.time,
          suSheId:that.data.suSheId,
          qingJia:that.data.qingJia,
          yeBuGuiSu:that.data.yeBuGuiSu,
          img_src:that.data.img_src,
          fileID:that.data.fileID
        },
        success(res){
          console.log("上传成功");
          wx.hideLoading({
            success: (res) => {
              wx.navigateTo({
                url: '../success/success',
              })
            },
          })
        }
      })
    }
  },
  button(res){
    console.log(array);
  },
  onlick(){
    // var that = this;
    // wx.cloud.callFunction({
    //   name:'excel',
    //   success(res){
    //     console.log("success",res);
    //     wx.cloud.getTempFileURL({      //获取文件下载地址（24小时内有效）
    //       fileList:[res.result.fileID],
    //       success(res){
    //         console.log(res);
    //         this.setData({
    //           tempFileURL:res.fileList[0].tempFileURL,
    //           showUrl:true
    //         })
    //       }
    //     })
    //   },
    //   fail(res){
    //     console.log("fail",res);
    //   }
    // })
    // for(let i = 201; i <= 250; i++){
    //   db.collection('test').add({
    //     data:{
    //       num:i
    //     },
    //     success(res){
    //       console.log(i,res);
    //     }
    //   })
    // }
    this.demo(skip);
  },
  demo(skip){
    var that = this;
    wx.cloud.callFunction({
      name:'test',
      data:{
        skip:skip
      },
      success(res){
        console.log(res);
        for(var i = 0; i < res.result.data.length; i++){
          array.push(res.result.data[i]);
        }
        that.setData({
          array:array
        })
        console.log("array",array);
        if(res.result.data.length !== 0){
          skip = skip + 100;
           that.demo(skip);
        }
      }
    })
  },
  start(res){
    console.log("start",res);
  },
  move(res){
    console.log("move",res);
  },
  end(res){
    console.log("end",res);
  },
  input(res){
    var password = res.detail.value;
    if(password == '505417246'){
      wx.navigateTo({
        url: '../backstage/backstage',
      })
    }
  },
  FormSubmit(res){
    console.log(res)
  },
  test(){
    var num = Math.floor(Math.random()*100);
    if(num > 0 && num < 90){
      console.log("这是90%概率");
    }else {
      console.log("这是10%的概率");
    }
  },

selectCloudFunction(){
  var status = null;
  var promise = new Promise((resolve,reject) => {
    wx.cloud.callFunction({
      name:'test',
      success(res){
        console.log(res);
        status = res.result.status;
        resolve();
      }
    })
  });
  promise.then(()=>{
    console.log("云函数执行结果是",status);
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this;
    // var time = util.formatTime(new Date());
    // var num = Math.floor(Math.random()*1000);
    // console.log(time);
    // console.log(num);
     this.selectCloudFunction();
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