Page({
  data: {
    PageCur: 'makeBless'
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  onShareAppMessage() {
    return {
      title: '拜年神器',
      imageUrl: '',
      path: '/pages/index/index'
    }
  },
})