const db = wx.cloud.database();
const admin = db.collection('fabu');
const _=db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ne:[],
    array: ['暂未选择', '电子产品', '生活日用品', '化妆品', '鞋子', '男士衣物', '女士衣物', '书籍', '军训相关用品', '交通工具', '游戏账号'],
    index: 0,
    name:'',
    new1:'',
    jiage:'',
    miaoshu:'',
    lianxifangshi:'',
    thingImage:'',
    arr:[],
    fileList:'',
    fileID_pay:'',
    fileList_pay:'',
    payCode:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    let id=options.data;
    let array=JSON.parse(options.data1)
    that.setData({
      ne:array
    })
    that.setData({
      index:that.data.ne.index
    })
    that.setData({
      thingImage:that.data.ne.fileList
    })
    that.setData({
      name:that.data.ne.name
    })
    that.setData({
      new1:that.data.ne.new1
    })
    that.setData({
      jiage:that.data.ne.jiage
    })
    that.setData({
      miaoshu:that.data.ne.miaoshu
    })
    that.setData({
      lianxifangshi:that.data.ne.lianxifangshi
    })
    that.setData({
      fileList:that.data.ne.fileList
    })
    that.setData({
      payCode:that.data.ne.fileList_pay
    })
    //console.log(that.data.ne)
  },
  getName(res){
    this.setData({
      name:res.detail
    })
  },
  getNew(res){
    this.setData({
      new1:res.detail
    })
  },
  getJiaGe(res){
    this.setData({
      jiage:res.detail
    })
  },
  bindPickerChange(res){
    let that=this
    that.setData({
      index: res.detail.value
    })
  },
  bindPayCode(res){
    var that=this
    var fileList_pay=that.data.ne.fileList_pay
    var file=[]
    var fileID_pay=[]
    var timestamp=Date.parse(new Date());
    var number=(Math.random()*1000).toFixed(0);
    timestamp=timestamp/1000;
    if(that.data.ne.fileList_pay!==""){
      wx.cloud.callFunction({
        name:'DeleteImage',
        data:{
          fileList:fileList_pay
        },
        success(res){
          console.log("图片删除成功",res)
        },
        fail(res){
          console.log("图片删除失败",res)
        }
      })
      wx.chooseImage({
        count:1,
        sizeType:['original','compressed'],
        sourceType:['album','camera'],
        success(res){
          //tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths=res.tempFilePaths
          console.log('tempFilePath:',tempFilePaths)
          that.setData({
            payCode:res.tempFilePaths
          })
          wx.cloud.uploadFile({
            cloudPath:'payCode/' + timestamp+'-'+number,
            filePath:tempFilePaths[0],//文件路径
            success(res){
              console.log('res.fileID_pay',res.fileID)
              fileID_pay.push(res.fileID)
              console.log(fileID_pay)
              that.setData({
                fileID_pay:fileID_pay
              })
              wx.cloud.getTempFileURL({
                fileList: fileID_pay,
                success: res => {
                 console.log("fileList_pay",res.fileList[0].tempFileURL)
                that.setData({
                  fileList_pay:res.fileList[0].tempFileURL
                })
                },
                fail:res=>{
                  console.log("失败",res)
                }
              })
            },
            fail(res){
              console.log("获取fileID失败",res)
            }
          })
        }
      })
    }else{
      wx.chooseImage({
        count:1,
        sizeType:['original','compressed'],
        sourceType:['album','camera'],
        success(res){
          var timestamp=Date.parse(new Date());
          timestamp=timestamp/1000
          //tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths=res.tempFilePaths
          console.log('tempFilePath:',tempFilePaths)
          that.setData({
            payCode:res.tempFilePaths
          })
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
                  fileList_pay:res.fileList[0].tempFileURL
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
    }
  },
  bindThingImageInput(){
    var that = this;
    var fileList=that.data.ne.fileList
    var file = []
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    wx.cloud.callFunction({
      name: 'DeleteImage',
      data: {
        fileList: fileList
      },
      success(res) {
        console.log("图片删除成功", res)
      },
      fail(res) {
        console.log("图片删除失败", res)
      },
    })
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success: function (res) {
        const thingImage = res.tempFilePaths;
        that.setData({
          thingImage: thingImage
        })
        const cloudPath = [];
        thingImage.forEach((item, i) => {
          cloudPath.push('shop/' + timestamp)
        })
        for (let i = 0, h = thingImage.length; i < h; i++) {
          wx.cloud.uploadFile({
            cloudPath: cloudPath[i],
            filePath: thingImage[i],
            success(res) {
              that.data.arr.push(res.fileID)
              wx.cloud.getTempFileURL({
                fileList: that.data.arr,
                success: res => {
                  //console.log("res.fileList=", res.fileList[0].tempFileURL)
                  that.setData({
                    fileList: res.fileList[0].tempFileURL
                  })
                }
              })
            }
          })
        }
  }
    })
  },
  getMiaoShu(res){
    this.setData({
      miaoshu:res.detail
    })
  },
  getLianXiFangShi(res){
    this.setData({
      lianxifangshi:res.detail
    })
  },
  fabu(){
    let that = this
    let dataId=that.data.ne._id
    if (that.data.index == 0) {
      wx.showToast({
        icon: 'none',
        title: '请选择物品类型',
      })
      return
    }
    console.log(that.data.fileID_pay,that.data.fileList_pay)
    wx.cloud.callFunction({
      name:'changeThing',
      data:{
        dataId:dataId,
        name: that.data.name,
        new1: that.data.new1,
        jiage: that.data.jiage,
        miaoshu: that.data.miaoshu,
        lianxifangshi: that.data.lianxifangshi,
        array: that.data.array[that.data.index],
        index: that.data.index,
        fileID: that.data.arr,
        fileList: that.data.fileList,
        fileID_pay:that.data.fileID_pay,
        fileList_pay:that.data.fileList_pay
      },
      success(res) {
        console.log("上传成功", res)
        wx.switchTab({
          url: '../mine/mine',
        })
        wx.showToast({
          title: '修改成功',
        })
      },
      fail(res) {
        console.log("上传失败", res)
        wx.switchTab({
          url: '../mine/mine',
        })
        wx.showToast({
          icon:'none',
          title: '修改失败',
        })
      }
    })
    /*db.collection("fabu").doc(id).update({
      data:{
        name: that.data.name,
        new1: that.data.new1,
        jiage: that.data.jiage,
        miaoshu: that.data.miaoshu,
        lianxifangshi: that.data.lianxifangshi,
        array: that.data.array[that.data.index],
        index: that.data.index,
        fileID: that.data.arr,
        thingImage: that.data.thingImage,
        fileList: that.data.fileList
      },
      success(res){
        console.log("上传成功",res)
        wx.switchTab({
          url: '../shouye/shouye',
        })
        wx.showToast({
          title: '已提交审核',
        })
      },
      fail(res){
        console.log("上传失败",res)
      }
    })*/
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})