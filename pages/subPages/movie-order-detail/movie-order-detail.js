// pages/subPages/movie-order-detail/movie-order-detail.js
Page({
  data: {
    order: null
  },
  onLoad(opt) {
    let paramsObj = JSON.parse(opt.paramsStr)
    this.initPage(paramsObj)
  },
  initPage(order) {
    this.setData({
      order
    })
  }
})