const db=wx.cloud.database();
Page({
  data: {
    showModal: false,
    array:[],
    number:3,
    timer:''
  },
  go(res){
    wx.switchTab({
      url: '../shouye/shouye',
    })
  },
  onLoad: function () {
    /*var that=this
    var array=[]
    db.collection('shenhe1').get({
      success(res){
        console.log(res.data)
        that.setData({
          array:res.data
        })
      }
    })
    if(that.data.array!=""){
      console.log("没被异步坑")
    }else{
      console.log("被异步坑了")
    }*/
   var that=this
   var number=that.data.number
    that.setData({
      timer:setInterval(function(){
        number--;
        that.setData({
          number:number
        })
        if(that.data.number==0){
          clearInterval(that.data.timer)
          wx.switchTab({
            url: '../shouye/shouye',
          })
        }
      },1000)
    })
    
  }
  ,
  /**
   * 弹窗
   */
  

  showDialogBtn: function() {
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
  }
})
