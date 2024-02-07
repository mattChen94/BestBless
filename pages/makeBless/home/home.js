// index.js
const app = getApp();
Page({
  data: {
    cardCur: 0,
    targetName: '',
    hasUserInfo: false,
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
  // getUserProfile(e) {
  //   // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
  //   // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  //   wx.getUserProfile({
  //     desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //     success: (res) => {
  //       console.info("user_info", res.userInfo)
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   })
  // },

  getUserProfile(that){
    // console.info("this", this)
    wx.login({
      success (res) {
        console.info("this", that)
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
                  })         
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