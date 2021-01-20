let canRoll = true, //加控制，防止用户点击两次
  Num = 1, //用在动画上，让用户在第二次点击的时候可以接着上次转动的角度继续转
  lotteryArrLen = 0, //放奖品的数组的长度
  lottery = ['一期一楼板面','一期一楼黄焖鸡','一期一楼炸鸡饭','一期一楼炒面炒饭','一期一楼米饭菜','一期二楼麻辣烫','一期二楼烤鱼饭','一期二楼自助','一期二楼饺子','一期二楼米饭菜','一期二楼卤肉饭','一期二楼烤肉饭','一期二楼麻辣香锅','一期三楼米饭菜','一期三楼麻辣烫','一期三楼小碗菜','一期三楼面','一期四楼炸串','一期四楼面','一期四楼火锅','一期四楼炸鸡','一期四楼烧烤','二期一楼炸鸡汉堡','二期一楼麻辣烫','二期一楼小笼包','二期一楼面','二期一楼自助','二期二楼刀削面','二期二楼驴肉火烧','二期二楼饺子','二期二楼麻辣香锅','二期三楼螺蛳粉','二期三楼炸鸡饭','二期三楼炸串','二期三楼自助','煎饼、烤冷面','轻餐吧','第三餐厅']; //放奖品
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  startRollTap() { //开始转盘
    let that = this;
    var time = util.formatTime(new Date());
    if (canRoll) {
      canRoll = false;
      let aniData = this.aniData; //获取this对象上的动画对象
      // var rightNum = ~~(Math.random() * lotteryArrLen); //生成随机数
      var rightNum = Math.floor(Math.random()*lottery.length);
      console.log(lottery.length);
      console.log(`随机数是${rightNum}`);
      console.log(`奖品是：${lottery[rightNum]}`);
      aniData.rotate(3600 * rightNum - 360 / lotteryArrLen * rightNum).step();     
      this.setData({
        aniData: aniData.export()
      })
      Num++;
      canRoll = true;
      setTimeout(function() {
      wx.showModal({
          title:'干饭人!干饭魂!',
          content:'这顿咱吃 [ ' + lottery[rightNum] + ' ] !',
          showCancel:false,
        })
      }.bind(this), 2000);
    }
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    lotteryArrLen = lottery.length; //获取新的数组长度
    this.setData({
      lottery: lottery //设置好值，用于页面展示
    })
    let aniData = wx.createAnimation({ //创建动画对象
      duration: 2000,
      timingFunction: 'ease'
    });
    this.aniData = aniData; //将动画对象赋值给this的aniData属性
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