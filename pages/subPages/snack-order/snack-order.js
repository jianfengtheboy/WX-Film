// pages/subPages/snack-order/snack-order.js
Page({
  data: {
    orderList: []
  },
  onShow() {
    this.initPage()
  },
  //初始化
  initPage() {
    let orderList = wx.getStorageSync('snackOrder') || []
    this.setData({
      orderList
    })
  },
  //删除订单
  deleteOrder(e) {
    let index = e.currentTarget.dataset.index;
    let orderList = this.data.orderList.slice()
    orderList.splice(index, 1)
    wx.showModal({
      title: '提示',
      content: '确认删除订单吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            orderList
          })
          wx.setStorageSync('snackOrder', orderList)
        }
      }
    })
  }
})