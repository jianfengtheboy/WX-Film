// pages/tabBar/user/user.js
Page({
  onShareAppMessage(res) {
    return {
      title: '仿猫眼电影',
      path: 'pages/tabBar/movie/movie'
    }
  }
})