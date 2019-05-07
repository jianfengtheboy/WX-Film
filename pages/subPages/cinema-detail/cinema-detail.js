// pages/subPages/cinema-detail/cinema-detail.js
const util = require("../../../utils/util.js")
const formatNumber = util.formatNumber
const getRandom = util.getRandom

Page({
  data: {
    cinemaId: "",
    movieId: "",
    //影院详情
    cinemaDetail: null,
    //选中的电影
    movie: null,
    //电影列表
    movies: null,
    //该电影的排片日期列表
    days: [],
    //当天播放电影的时间段
    timeList: [],
    //影院分类零食列表
    divideDealList: [],
    //只在第一次提示
    first: true
  },
  onLoad(query) {
    this.initPage(query)
  },
  //初始化
  initPage(query) {
    const { cinemaId = '', movieId = '', day = ''} = query
    this.setData({
      cinemaId,
      movieId,
      day
    })
    let _this = this
    wx.showLoading({
      title: '正在加载...'
    })
    wx.request({
      url: `https://m.maoyan.com/ajax/cinemaDetail?cinemaId=${cinemaId}&movieId=${movieId}`,
      success(res) {
        wx.hideLoading()
        _this.setData({
          cinemaDetail: res.data,
          movies: _this.formatMovie(res.data.showData.movies),
          divideDealList: _this.formatUrl(res.data.dealList.divideDealList)
        })
      }
    })
  },
  //选择电影
  selectMovie(e) {
    let movie = e.detail.movie
    let days = []
    movie.shows.forEach(item => {
      days.push({
        title: item.dateShow,
        day: item.showDate
      })
    })
    this.setData({
      movie,
      days,
      timeList: this.createEndTime(movie.shows[0].plist, movie.dur)
    })
  },
  //选择时间
  selectDay(e) {
    let day = e.detail.day
    let movie = this.data.movie
    let index = movie.shows.findIndex(item => item.showDate === day)
    this.setData({
      timeList: this.createEndTime(movie.shows[index].plist, movie.dur)
    })
  },
  //跳转到“套餐详情”页面
  goSnackPage(e) {
    let info = e.currentTarget.dataset.info
    //将参数转化为JSON通过页面跳转时传递
    let paramsStr = JSON.stringify({
      cinemaName: this.data.cinemaDetail.cinemaData.nm,
      cinemaId: this.data.cinemaId,
      dealId: info.dealId,
      cinemaData: this.data.cinemaDetail.cinemaData
    })
    wx.navigateTo({
      url: `/pages/subPages/snack-page/snack-page?paramsStr=${paramsStr}`
    })
  },
  //购票
  buyTicket(e) {
    let info = e.currentTarget.dataset.info
    let { movie, cinemaId, cinemaDetail, first } = this.data
    //添加订单信息
    let paramsStr = JSON.stringify({
      //电影院名
      cinemaName: cinemaDetail.cinemaData.nm,
      //电影院ID
      cinemaId: cinemaId,
      //大厅
      hall: info.th,
      //电影名
      movieName: movie.nm,
      //海报
      movieImg: movie.img,
      //语言
      lang: info.lang + info.tp,
      //时间
      time: `${info.dt} ${info.tm}`,
      //票价
      price: (info.vipPrice && info.vipPrice * 1 + 10) || 37,
      //座位
      seat: `${getRandom(1, 21,true)}排${getRandom(1, 21,true)}座`,
      //模拟6位数的验证码
      Vcode: getRandom(100000,999999),
      //模拟9位数的流水号
      flowNumber: getRandom(100000000, 999999999),
      //模拟10位数的订单号
      orderId: getRandom(1000000000, 9999999999),
      //影院信息
      cinemaData: cinemaDetail.cinemaData
    })
    //只提示一次
    if (first) {
      wx.showModal({
        title: '提示',
        content: 'I love you three thousand times...余婧婷',
        success: (res) => {
          this.setData({
            first: false
          })
          if (res.confirm) {
            wx.navigateTo({
              url: `/pages/subPages/buy-ticket/buy-ticket?paramsStr=${paramsStr}`
            })
          }
        }
      })
    } else {
      wx.navigateTo({
        url: `/pages/subPages/buy-ticket/buy-ticket?paramsStr=${paramsStr}`
      })
    }
  },
  //处理散场时间
  createEndTime(arr, dur) {
    let timeList = []
    if (Array.isArray(arr)) {
      timeList = arr.map(item => {
        let temp = { ...item }
        let time = new Date(`${item.dt} ${item.tm}`)
        time = time.setMinutes(time.getMinutes() + dur)
        let endTime = new Date(time)
        temp.endTime = `${formatNumber(endTime.getHours())}:${formatNumber(endTime.getMinutes())}`
        return temp
      })
    }
    return timeList
  },
  //处理电影图片的url
  formatMovie(arr) {
    let list = []
    if (Array.isArray(arr)) {
      arr.forEach(item => {
        list.push({
          ...item,
          img: item.img.replace('w.h', '148.208')
        })
      })
    }
    return list
  },
  //处理url
  formatUrl(arr) {
    let divideDealList = []
    if (Array.isArray(arr)) {
      arr.forEach(item => {
        let temp = {
          ...item
        }
        temp.dealList = temp.dealList.map(i => ({
          ...i,
          imageUrl: i.imageUrl.replace('w.h', '440.0')
        }))
        divideDealList.push(temp)
      })
    }
    return divideDealList
  }
})