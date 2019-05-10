// pages/subPages/snack-page/snack-page.js
Page({
  data: {
    //小吃详情
    info: null,
    cinemaName: "",
    //影院地图详情
    cinemaData: null
  },
  onLoad(obj) {
    let paramsObj = JSON.parse(obj.paramsStr)
    this.initPage(paramsObj)
  },
  //初始化
  initPage(obj) {
    wx.showLoading({
      title: '正在加载...'
    })
    let data = {
      dealId: obj.dealId,
      quantity: 1,
      cinemaId: obj.cinemaId
    }
    wx.request({
      url: 'https://m.maoyan.com/deal/goods/price?_v_=yes&token=gde4_JGfbHs-M3rXVjNsvpH4FZIAAAAAZggAANery34ujvNsZJGUqUOw9titPeJIWbPn9lnhm56NEcH2Czjk9z6J-jlwnZbgMN9T-Q',
      method: 'POST',
      data: data,
      success: (res) => {
        wx.hideLoading()
        this.setData({
          cinemaName: obj.cinemaName,
          cinemaId: obj.cinemaId,
          cinemaData: obj.cinemaData,
          info: res.data.data
        })
      }
    })
  },
  //跳转到“提交订单”页面
  buySnack() {
    let { info, cinemaName, cinemaId } = this.data
    //添加订单信息
    let paramsStr = JSON.stringify({
      cinemaName,
      cinemaId,
      title: info.dealBrief.title,//套餐名
      img: info.dealBrief.imageUrl,//图片
      amount:1,//数量
      price: info.dealBrief.originPrice,//单价
      total: info.dealBrief.originPrice * 1//合计
    })
    wx.navigateTo({
      url: `/pages/subPages/buy-snack/buy-snack?paramsStr=${paramsStr}`
    })
  }
})