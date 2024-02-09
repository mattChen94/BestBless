//app.js
App({
  onLaunch: function() {
    if (wx.cloud) {
      wx.cloud.init({
        traceUser: true
      })
    }
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
		if (capsule) {
		 	this.globalData.Custom = capsule;
			this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
		} else {
			this.globalData.CustomBar = e.statusBarHeight + 50;
		}
      }
    })
  },
  globalData: {
    makingBlessBtnClicked: false,
    UserConfig: {
      sceneId: 0,
      targetName: '',
      target: '',
      targetIndex: 0,
      form: '',
      formIndex: 2,
      style: '',
      StyleIndex: 0,
      acrosticPoetryContent: '',
      response: '',
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
    },
    
  }
})