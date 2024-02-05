// pages/makeBless/blessWords/blessWords.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textareaValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    if (app.globalData.makingBlessBtnClicked) {
      // 按钮被点击，执行相应操作
      console.log('Button in Page1 was clicked.');
      this.submitForm();
      // 重置标志，以免再次进入页面时误触发
      app.globalData.makingBlessBtnClicked = false;
    }
  },

  // 提交表单
  submitForm: function() {
    var that = this; // 获取当前page的实例
    var form = app.globalData.UserConfig.formIndex;
    if (form == 0) {
      form = 'CTS'
    }
    else if (form == 1) {
      form = 'DL'
    }
    else if (form == 2) {
      form = 'BLESS'
    }
    console.log('submitForm');
    wx.request({
      url: 'https://blessllm.bigmodel.cn/bless', // 请求地址
      method: 'POST', 
      header: {
        'Content-Type': 'application/json' 
      },
      data: {
        user_id: "1234",
        target: app.globalData.UserConfig.targetName,
        role: app.globalData.UserConfig.target,
        style: app.globalData.UserConfig.style,
        bless_type: form,
        cty: app.globalData.UserConfig.acrosticPoetryContent,
        extra_info: {},
        model: "glm-3-turbo"
      }, // 请求的数据
      success(res) {
        console.log('Content of res:', res);
        if ('content' in res.data.data) {
          // 设置responseMessage以在页面上显示
          that.setData({
            textareaValue: res.data.data.content
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
  onInput: function(e) {
    // 更新文本框中的文本
    this.setData({
      text: e.detail.value
    });
  },
  onRefresh: function() {
    // 刷新文本框内容的逻辑
    this.setData({
      text: '' // 清空文本框
    });
  },
  onCopy: function() {
    // 复制文本框中的文本到剪贴板
    wx.setClipboardData({
      data: this.data.text,
      success: function() {
        wx.showToast({
          title: '文本已复制',
        });
      }
    });
  },
  onGenerateCard: function() {
    // 生成贺卡的逻辑
    // 这里你可能需要跳转到另一个页面或者使用canvas生成贺卡
    wx.showToast({
      title: '生成贺卡',
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})