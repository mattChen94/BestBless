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
      response: ''
    }
  }
})