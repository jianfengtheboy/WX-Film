// pages/subPages/movie-order/movie-order.js
Page({
  data: {
    orderList: []
  },
  onShow: function () {
    this.initPage()
  },
  initPage() {
    let orderList = wx.getStorageSync('movieOrder') || []
    this.setData({
      orderList
    })
  },
  //删除订单
  deleteOrder(e) {
    let index = e.currentTarget.dataset.index
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
          wx.setStorageSync('movieOrder', orderList)
        }
      }
    })
  },
  //跳转到订单详情页面
  goTo(e) {
    let order = e.currentTarget.dataset.order
    let paramsStr = JSON.stringify(order)
    wx.navigateTo({
      url: `../movie-order-detail/movie-order-detail?paramsStr=${paramsStr}`
    })
  }
})