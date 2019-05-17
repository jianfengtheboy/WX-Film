// pages/subPages/search-page/search-page.js
Page({
  data: {
    value: '',
    stype: '',
    placeholder: '',
    movies: {},
    cinemas: {}
  },
  onLoad(query) {
   this.initPage(query)
  },
  initPage(query){
    //搜索类型，-1代表搜索影院或电影，2代表搜索影院
    let stype = query.stype
    let placeholder = ''
    if (stype === '-1') {
      placeholder = '搜电影、搜影院'
    } else {
      placeholder = '搜影院'
    }
    this.setData({
      stype,
      placeholder
    })
  },
  search(e) {
    let value = e.detail.value
    let _this = this
    this.setData({
      value
    })
    wx.request({
      url: `https://m.maoyan.com/ajax/search?kw=${value}&cityId=57&stype=${_this.data.stype}`,
      success(res) {
        let movies = res.data.movies ? res.data.movies.list : []
        movies = movies.map(item=>{
          item.img = item.img.replace('w.h','128.180')
          return item
        })
        _this.setData({
          movies: movies,
          cinemas: res.data.cinemas ? res.data.cinemas.list : []
        })
      }
    })
  },
  goBack() {
    wx.navigateBack({
      delta: 1
    })
  }
})