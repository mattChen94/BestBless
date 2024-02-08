// pages/customConfig/customConfig.js
const app = getApp();

Page({
  data: {
    sceneId: 0,
    hasUserInfo: false,
    scene: [
      {
        sceneName: '通用场景',
        target:['我的闺蜜','我的哥们','我的损友','我的恋人','我的其他'],
        style:['幽默','温暖','正式','浪漫'],
      },
      {
        sceneName: '家庭场景',
        target:['我的长辈','我的晚辈','我的平辈'],
        style:['幽默','温暖','正式','浪漫'],
      },
      {
        sceneName: '校园场景',
        target:['我的同学','我的老师'],
        style:['幽默','温暖','正式','浪漫'],
      },
      {
        sceneName: '办公场景',
        target:['我的领导','我的下属','我的同事'],
        style:['幽默','温暖','正式','浪漫'],
      },
      {
        sceneName: '商务场景',
        target:['我的客户','我的伙伴','我的同行'],
        style:['幽默','温暖','正式','浪漫'],
      },
    ],
    selectedTargetIndex: null,
    blessingForms: ["藏头诗", "对联", "普通"],
    selectedBlessingFormIndex: 2,
    selectedBlessingStyleIndex: 0,
    acrosticPoemInput: "",
  },
  onLoad: function() {
    // 从全局变量获取sceneId并更新页面的sceneId
    this.setData({
      sceneId: app.globalData.UserConfig.sceneId,
      selectedBlessingFormIndex: app.globalData.UserConfig.formIndex,
      selectedBlessingStyleIndex: app.globalData.UserConfig.StyleIndex,
      selectedTargetIndex:app.globalData.UserConfig.targetIndex,
      acrosticPoemInput: app.globalData.UserConfig.acrosticPoetryContent,
    });
    // 和服务端对齐，把“我的”两个字去掉
    app.globalData.UserConfig.target = this.data.scene[this.data.sceneId].target[this.data.selectedTargetIndex].substring(2);

    app.globalData.UserConfig.style = this.data.scene[this.data.sceneId].style[this.data.selectedBlessingStyleIndex];
  },
  handleTargetChange: function(e) {
    this.setData({
      selectedTargetIndex: e.detail.value
    });
    app.globalData.UserConfig.targetIndex = this.data.selectedTargetIndex;
    app.globalData.UserConfig.target = this.data.scene[this.data.sceneId].target[this.data.selectedTargetIndex];
    console.log('选择祝福形式：' + this.data.scene[this.data.sceneId].target[this.data.selectedTargetIndex]);
  },

  handleBlessingFormChange: function(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      selectedBlessingFormIndex: index
    });
    // 更新全局数据
    app.globalData.UserConfig.formIndex = index;
    app.globalData.UserConfig.form = this.data.blessingForms[index];
    console.log('选择祝福形式：' + this.data.blessingForms[index] + index);
  },

  handleBlessingStyleChange: function(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      selectedBlessingStyleIndex: index
    });
    app.globalData.UserConfig.StyleIndex = index;
    app.globalData.UserConfig.style = this.data.scene[this.data.sceneId].style[index];
    console.log('选择祝福风格：' + this.data.scene[this.data.sceneId].style[index]);
  },

  handleAcrosticPoemInput: function(e) {
    this.setData({
      acrosticPoemInput: e.detail.value
    });
    app.globalData.UserConfig.acrosticPoetryContent = this.data.acrosticPoemInput;
  },

  buttonClick: function() {
    app.globalData.makingBlessBtnClicked = true;
    console.log("acrosticPoemInput",this.data.acrosticPoemInput.length)
    if (this.data.selectedBlessingFormIndex === 0) {
      if (this.data.acrosticPoemInput.length === 0) {
        wx.showToast({
          title: '藏头语不能为空哦',
          icon: 'none'
        });
        return;
      };

    }
    console.log("点击生产祝福")
    console.log("hasUserInfo ",this.data.hasUserInfo)
    if (!this.data.hasUserInfo)
      this.getUserProfile(this)
    else
      wx.navigateTo({
        url: '/pages/makeBless/blessWords/blessWords'
      });
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
});
