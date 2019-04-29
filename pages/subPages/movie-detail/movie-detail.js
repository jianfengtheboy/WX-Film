// pages/subPages/movie-detail/movie-detail.js
const util = require("../../../utils/util.js")

Page({
  data: {
    //电影详情
    detailMovie: null,
    isFold: false,
    //观众评论
    comments: {}
  },
  onLoad(options) {
    const movieId = options.movieId
    this.initPage(movieId)
  },
  //初始化页面
  initPage(movieId) {
    const _this = this
    wx.showLoading({
      title: '加载中...'
    })
    this.getComment(movieId)
    wx.request({
      url: `https://m.maoyan.com/ajax/detailmovie?movieId=${movieId}`,
      success(res) {
        wx.hideLoading()
        _this.setData({
          detailMovie: _this.handleData(res.data.detailMovie)
        })
      }
    })
  },
  //获取观众评论
  getComment(movieId) {

  },
  handleData(data) {

  }
})