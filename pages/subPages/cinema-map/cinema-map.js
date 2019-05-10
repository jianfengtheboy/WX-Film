// pages/subPages/cinema-map/cinema-map.js
Page({
  data: {
    cinemaData: null,
    markers: []
  },
  onLoad(opt) {
    this.initPage(opt)
  },
  initPage(cinemaData) {
    this.setData({
      cinemaData,
      markers: [{
        latitude: cinemaData.latitude,
        longitude: cinemaData.longitude
      }]
    })
  },
  //定位自己的位置
  position() {
    let MapContext = wx.createMapContext('map')
    MapContext.moveToLocation()
  }
})