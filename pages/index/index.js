const app = getApp();
Page({
  data: {
    cardCur: 0,
    targetName: '',
    hasUserInfo: false,
    swiperList: [
      {
        id: 0,
        type: 'image',
        url: 'https://blessllm.bigmodel.cn/images/general_low.png'
      },
      {
      id: 1,
      type: 'image',
      url: 'https://blessllm.bigmodel.cn/images/family_low.png'
    },
    {
      id: 2,
      type: 'image',
      url: 'https://blessllm.bigmodel.cn/images/campus_low.png'
    }, 
    {
      id: 3,
      type: 'image',
      url: 'https://blessllm.bigmodel.cn/images/workplace_low.png'
    },
    {
      id: 4,
        type: 'image',
        url: 'https://blessllm.bigmodel.cn/images/business_low.png',
    }
  ],    
    PageCur: 'makeBless'
  },

  onLoad() {
    this.towerSwiper('swiperList');
    // 初始化towerSwiper 传已有的数组名即可
    this.setData({
      cardCur: app.globalData.UserConfig.sceneId,
      targetName: app.globalData.UserConfig.targetName,
    })
  },

  getUserProfile(that){
    // console.info("this", this)
    wx.login({
      success (res) {
        if (res.code) {
          console.log("code", res.code)
          wx.request({
              url: 'https://blessllm.bigmodel.cn/wx_login/'+res.code , 
                success:function(res){ 
                  console.log(res.data)//res.data中有openid
                  let openid = res.data.data["openid"]
                  console.log("openid", openid)
                  app.globalData.openid=openid
                  that.setData({
                    hasUserInfo: true
                  });
                  wx.navigateTo({
                    url: '/pages/makeBless/blessWords/blessWords'
                  });         
              }
          })
  

        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
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
      if (!this.data.hasUserInfo)
        this.getUserProfile(this)
      else
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


  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
    if (this.data.PageCur === 'contactUs') {
      wx.navigateTo({
        url: '/pages/contactUs/home/home',
      })
    }
  },
  onShareAppMessage() {
    return {
      title: '拜年神器',
      imageUrl: '',
      path: '/pages/index/index'
    }
  },
})