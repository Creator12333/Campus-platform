const db = wx.cloud.database();
const admin = db.collection('shenhe1');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    banner:[],
    ppp:[],
    show: true,
    ne:[],
    activeId:0,
    list:[{
      id:0,
      title:"电子产品"
    }, 
    {
      id: 1,
      title: "生活日用品"
    },
    {
      id: 2,
      title: "化妆品"
    },
    {
      id: 3,
      title: "鞋子"
    },{
      id:4,
      title:"男士衣物"
    },{
      id:5,
      title:"女士衣物"
    },{
      id:6,
      title:"书籍"
    },{
      id:7,
      title:"军训相关用品"
    },{
      id:8,
      title:"交通工具"
    },{
      id:9,
      title:"游戏账号"
    },{
      id:10,
      title:"其它"
    }],
    TabCur:0,
    MainCur:0,
    VerticalNavTop:0,
    load: true,
    img:"https://gd4.alicdn.com/imgextra/i2/2522860159/TB2KwijesaK.eBjSspjXXXL.XXa_!!2522860159.jpg",
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
  showBuying(res) {
    let that=this
    let array=[]
    let qqq=res.currentTarget.dataset.id;
    wx.cloud.callFunction({
      name:'findWhere',
      data:{
        jihe:'fabu',
        id:qqq
      },
      success(res){
        console.log(res);
        var see = res.result.data[0].see;
        see = see + 9;
        console.log(see);
        wx.cloud.callFunction({
          name:'changSee',
          data:{
            jihe:'fabu',
            id:qqq,
            see:see
          },
          success(res){
            console.log(res)
          }
        })
      }
    })
    // db.collection("fabu").where({
    //   _id:qqq
    // }).get({
    //   success(res){
    //     var see = res.data[0].see
    //     see++;
    //     console.log(see)
    //     db.collection("fabu").doc(qqq).update({
    //       data: {
    //         see: see
    //       },
    //       success(res) {
    //         console.log("浏览量+1",see)
    //       }
    //     })
    //   }
    // })
    wx.navigateTo({
      url: '../showBuying/showBuying?data1='+qqq,
    })
  },
  onLoad: function (options) {
    var that = this;
    var ne = [];
    var ppp = [];
    var list = that.data.list;
    var listItem = [];
    var banner = [];
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name:'findBuying',
      success(res){
        db.collection('banner').get({
          success(res){
            for(var n = 0; n < res.data.length; n++){
              banner.push(res.data[n].img_src);
            }
            that.setData({
              banner:banner
            })
            console.log(that.data.banner);
          }
        })
        console.log(res.result.data)
        for(var i = 0;i < res.result.data.length; i++){
          if(res.result.data[i].shenhe == '通过'){
            ne.push(res.result.data[i]);
            ppp.push(res.result.data[i]);
          }
        }
        for(let x = 0; x < list.length; x++){
          listItem = [];
          for(let y = 0; y < ne.length; y++){
            if(ne[y].array == list[x].title){
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
          ppp:ppp,
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
    var that = this
    var ne=[]
    that.setData({
      activeId: e.currentTarget.dataset.id
    })
    for (var i = 0; i < that.data.ne.length; i++) {
      if (that.data.activeId == that.data.ne[i].index) {
        ne.push(that.data.ne[i])
      }
    }
    that.setData({
      ppp:ne
    })
  }
})