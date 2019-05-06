// pages/subPages/select-cinema/select-cinema.js
Page({
  data: {
    //电影上映日期
    showTime: "",
    //导航下拉框是否展开
    isShow: false,
    //影院过滤菜单
    cityCinemaInfo: {},
    //影院搜索条件
    params: {
      movieId: 0,
      day: "",
      offset: 0,
      limit: 20,
      districtId: -1,
      lineId: -1,
      hallType: -1,
      brandId: -1,
      serviceId: -1,
      areaId: -1,
      stationId: -1,
      item: '',
      updateShowDay: false
    },
    //影院列表
    cinemas: [],
    //数据是否加载完
    loadComplete: false,
    //是否有符合过滤的影院
    nothing: false,
    //当天是否有场次，原本时间是由后台返回的，但是缺少城市ID就没有返回，导致当天可能没有播放场次
    noSchedule: false
  },
  onLoad(options) {
    this.initpage(options)
  },
  //初始化
  initpage(options) {
    let movieId = options.movieId
    let movieName = options.movieName
    let showTime = options.showTime
    wx.setNavigationBarTitle({
      title: movieName
    })
    this.setData({
      showTime,
      params: {
        ...this.data.params,
        movieId
      }
    })
  },
  //获取影院列表
  getCinemas(params) {
    let _this = this
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://m.maoyan.com/ajax/movie?forceUpdate=${Date.now()}`,
        methods: "POST",
        data: params,
        success(res) {
          resolve(res.data.cinemas)
          _this.setData({
            cinemas: _this.data.cinemas.concat(res.data.cinemas),
            loadComplete: !res.data.paging.hasMore
          })
        }
      })
    })
  },
  //获取过滤菜单数据
  getFilter() {

  }
})