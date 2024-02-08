Component({
  properties: {
    // 是否开始绘图
    isCanDraw: {
      type: Boolean,
      value: false,
      observer(newVal) {
        newVal && this.handleStartDrawImg()
      }
    },
  },
  data: {
    imgDraw: {}, // 绘制图片的大对象
    sharePath: '' // 生成的分享图
  },
  methods: {
    handleStartDrawImg() {
      wx.showLoading({
        title: '生成中'
      })
      this.setData({
        imgDraw: {
          width: '750rpx',
          height: '1334rpx',
          background: 'https://blessllm.bigmodel.cn/images/familyCard.png',
          views: [
            {
              type: 'text',
              text: getApp().globalData.UserConfig.response,
              css: {
                top: '760rpx',
                left: '380rpx',
                align: 'center',
                width: '600rpx',
                height: '550rpx',
                maxLines:'9',
                // fontWeight: 'bold',
                fontSize: '40rpx',
                color: '#000000',
              }
            },
            {
              type: 'image',
              url: 'https://blessllm.bigmodel.cn/images/QRcode.jpg',
              css: {
                top: '1180rpx',
                left: '600rpx',
                width: '145rpx',
                height: '145rpx',
                borderRadius: '96rpx'
              }
            }
          ]
        }
      })
    },
    onImgErr(e) {
      wx.hideLoading()
      wx.showToast({
        title: '生成分享图失败，请刷新页面重试'
      })
      //通知外部绘制完成，重置isCanDraw为false
      this.triggerEvent('initData') 
    },
    onImgOK(e) {
      wx.hideLoading()
      // 展示分享图
      wx.showShareImageMenu({
        path:  e.detail.path,
        fail: err => {
          console.log(err)
        }
      })
      //通知外部绘制完成，重置isCanDraw为false
      this.triggerEvent('initData') 
    }
  }
})