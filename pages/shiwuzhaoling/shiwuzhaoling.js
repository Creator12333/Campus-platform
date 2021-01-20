const db = wx.cloud.database();
const admin = db.collection('shiwuzhaoling');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    a:'-->',
    ppp:[],
    ne:[],
    activeId: 0,
    list: [{
      id: 0,
      title: "思源楼"
    },
    {
      id: 1,
      title: "知行楼"
    },
    {
      id: 2,
      title: "通方楼"
    },
    {
      id: 3,
      title: "天佑"
    }, {
      id: 4,
      title: "图书馆"
    }, {
      id: 5,
      title: "一期生活服务区"
    }, {
      id: 6,
      title: "一期食堂"
    }, {
      id: 7,
      title: "二期食堂"
    }, {
      id: 8,
      title: "操场"
    }, {
      id: 9,
      title: "宿舍楼附近"
    }, {
      id: 10,
      title: "旧实验楼"
    }, {
      id: 11,
      title: "新实验楼"
    }, {
      id: 12,
      title: "教工食堂"
    }, {
      id: 13,
      title: "大学生活动中心"
    }, {
      id: 14,
      title: "行政楼"
    }, {
      id: 15,
      title: "其它"
    }],
    TabCur:0,
    MainCur:0,
    VerticalNavTop:0,
    load: true,
    img: "https://gd4.alicdn.com/imgextra/i2/2522860159/TB2KwijesaK.eBjSspjXXXL.XXa_!!2522860159.jpg",
    ne:[]
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
    console.log(e.currentTarget.dataset.id);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var ne = [];
    var list = that.data.list;
    var listItem = [];
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name:'findLost',
      success(res){
        console.log(res.result.data)
        for(var i = 0; i < res.result.data.length; i++){
          if(res.result.data[i].shenhe == '通过'){
            ne.push(res.result.data[i])
          }
        }
        for(let x = 0; x < list.length; x++){
          listItem = [];
          for(let y = 0; y < ne.length; y++){
            if(ne[y].array1 == list[x].title){
              listItem.push(ne[y])
            }
            if(y == ne.length - 1){
              list[x].product = listItem;
            }
          }
        }
        console.log(list);
      that.setData({
        ne:ne,
        ppp:ne,
        list:list
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
  selectType(e) {
     var that=this
     var ne=[]
    that.setData({
      activeId: e.currentTarget.dataset.id
    })
    for (var i = 0; i < that.data.ne.length; i++) {
      if (that.data.activeId == that.data.ne[i].index1) {
        ne.push(that.data.ne[i])
      }
    }
    that.setData({
      ppp: ne
    })
  },
  showLost(event){
    var that=this
    var array=[]
    var qqq=event.currentTarget.dataset.id;
    wx.cloud.callFunction({
      name:'findWhere',
      data:{
        jihe:'shiwuzhaoling',
        id:qqq
      },
      success(res){
        var see = res.result.data[0].see;
        see = see + 9;
        console.log(see);
        wx.cloud.callFunction({
          name:'changSee',
          data:{
            jihe:'shiwuzhaoling',
            id:qqq,
            see:see
          },
          success(res){
            console.log(see);
          }
        })
      }
    })
    // db.collection("shiwuzhaoling").where({
    //   _id: qqq
    // }).get({
    //   success(res) {
    //     var see = res.data[0].see
    //     see++;
    //     console.log(see)
    //     db.collection("shiwuzhaoling").doc(qqq).update({
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
      url: '../showLost/showLost?data='+qqq,
    })
  }
})