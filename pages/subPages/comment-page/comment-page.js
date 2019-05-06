// pages/subPages/comment-page/comment-page.js
const util = require("../../../utils/util.js")

Page({
  data: {
    movieId: '',
    //最新评论
    cmts: [],
    //热门评论
    hcmts: [],
    //是否加载完成
    loadComplete: false
  },
  onLoad(options) {
    this.initPage(options)
  },
  //初始化
  initPage(options) {
    let movieId = options.movieId
    let movieName = options.movieName
    wx.setNavigationBarTitle({
      title: `观众评论-${movieName}`
    })
    wx.showLoading({
      title: '正在加载...'
    })
    this.getComment(movieId)
    this.setData({
      movieId
    })
  },
  onReachBottom() {
    this.getComment(this.data.movieId)
  },
  //获取观众评论
  getComment(movieId) {
    if (this.data.loadComplete) {
      return
    }
    let cmts = this.data.cmts
    let _this = this
    wx.request({
      url: `https://m.maoyan.com/mmdb/comments/movie/${movieId}.json?_v_=yes&offset=${cmts.length}`,
      success(res) {
        let comments = { ...res.data }
        const newCmts = cmts.concat(_this.formatData(comments.cmts))
        wx.hideLoading()
        _this.setData({
          hcmts: _this.formatData(comments.hcmts),
          cmts: newCmts,
          loadComplete: newCmts.length >= comments.total
        })
      }
    })
  },
  //处理数据
  formatData(arr) {
    let list = []
    if (arr.length) {
      list = arr.map(item => {
        let temp = { ...item }
        temp.avatarurl = temp.avatarurl || '/assets/images/avatar.png'
        temp.purchase = !!(temp.tagList && temp.tagList.fixed.some(item => item.id === 4))
        temp.stars = this.formatStar(temp.score)
        temp.calcTime = util.calcTime(temp.startTime)
        return temp
      })
    }
    return list
  },
  //处理评分星星
  formatStar(sc) {
    //1分对应满星，0.5对应半星
    let stars = new Array(5).fill('star-empty')
    //满星的个数
    const fullStars = Math.floor(sc)
    //半星的个数，半星最多1个
    const halfStar = sc % 1 ? 'star-half' : 'star-empty'
    //填充满星
    stars.fill('star-full', 0, fullStars)
    if (fullStars < 5) {
      //填充半星
      stars[fullStars] = halfStar
    }
    return stars
  }
})