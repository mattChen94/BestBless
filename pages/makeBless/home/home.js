const app = getApp();
Page({
  data: {
    cardCur: 0,
    targetName: '',
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://blessllm.bigmodel.cn/images/family_low.png'
    },
    {
      id: 1,
      type: 'image',
      url: 'https://blessllm.bigmodel.cn/images/campus_low.png'
    }, 
    {
      id: 2,
      type: 'image',
      url: 'https://blessllm.bigmodel.cn/images/workplace_low.png'
    },
    {
      id: 3,
        type: 'image',
        url: 'https://blessllm.bigmodel.cn/images/business_low.png',
    },
    {
      id: 4,
      type: 'image',
      url: 'https://blessllm.bigmodel.cn/images/general_low.png'
    }
  ],
  },
  onLoad() {
    this.towerSwiper('swiperList');
    // 初始化towerSwiper 传已有的数组名即可
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
        cardCur: app.globalData.UserConfig.sceneId,
        targetName: app.globalData.UserConfig.targetName,
      })
    }
  },

    // cardSwiper
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
      app.globalData.UserConfig.sceneId = this.data.cardCur;
      console.log(app.globalData.UserConfig.sceneId);
    },

    handleInput: function(e) {
      // 更新祝福对象的数据
      this.setData({
        targetName: e.detail.value
      });
      app.globalData.UserConfig.targetName = this.data.targetName,
      console.log(app.globalData.UserConfig.targetName);
    },

    buttonClick: function() {
      app.globalData.makingBlessBtnClicked = true;
      console.log("点击生产祝福")
      wx.navigateTo({
        url: '/pages/makeBless/blessWords/blessWords'
      });
    }, 

  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    console.log('towerSwiper')
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  }
});