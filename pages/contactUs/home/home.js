// index.js
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    target: '',
    role: '',
    style: '',
    responseMessage: '' // 用于存储和显示返回的信息
  },

  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  // 绑定输入事件
  bindInput: function(e) {
    this.setData({
      [e.target.id]: e.detail.value
    });
  },

  // 提交表单
  submitForm: function() {
    var that = this; // 获取当前page的实例
    wx.request({
      url: 'https://blessllm.bigmodel.cn/bless', // 请求地址
      method: 'POST', 
      header: {
        'Content-Type': 'application/json' 
      },
      data: {
        user_id: "1234",
        target: this.data.target,
        role: this.data.role,
        style: this.data.style,
        image: false,
        model: "glm-3-turbo"
      }, // 请求的数据
      success(res) {
        console.log('Content of res:', res);
        if ('content' in res.data.data) {
          // 设置responseMessage以在页面上显示
          that.setData({
            responseMessage: res.data.data.content
          });
        } else {
          // 服务器返回的数据不符合预期的格式
          console.error('Unexpected server response:', res.data.data);
        }
      },
      fail(err) {
        // 处理请求失败的情况
        that.setData({
          responseMessage: '请求失败'
        });
        console.error('Request failed:', err);
      }
    });
  },
  
	getLoginCode() {
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://blessllm.bigmodel.cn/bless',
            method: 'GET',
            data: {
              code: res.code
            },
            success: function(response) {
              // 这里处理从服务器返回的数据
              console.log('服务器返回:', response);
            },
            fail: function(error) {
              // 处理请求失败的情况
              console.error('请求失败:', error);
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
        console.log("userInfo", res.userInfo);
      },
      fail: (err) => {
        // 处理错误
        console.error("Error getting user profile:", err);
      }
    });
  },
  // 用户点击右上角分享
  onShareAppMessage: function () {
    // 分享配置...
  }
});