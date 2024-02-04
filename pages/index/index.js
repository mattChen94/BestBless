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
      title: '整个好“话”',
      imageUrl: '',
      path: '/pages/index/index'
    }
  },
})