// pages/customConfig/customConfig.js
Page({
  data: {
    roles: ["我的同事", "我的上级领导", "我的下属员工", "我的团队成员", "我的跨部门合作伙伴"],
    selectedRoleIndex: 0,
    blessingStyles: ["藏头诗风格", "对联风格", "普通风格"],
    selectedBlessingStyleIndex: 0,
    blessingTypes: ["团队", "职业", "合作", "友好", "感激", "创新"],
    selectedBlessingTypeIndex: 0,
    acrosticPoemInput: "",
    personalizedRequest: ""
  },

  handleRoleChange: function(e) {
    this.setData({
      selectedRoleIndex: e.detail.value
    });
  },

  handleBlessingStyleChange: function(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      selectedBlessingStyleIndex: index
    });
  },

  handleBlessingTypeChange: function(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      selectedBlessingTypeIndex: index
    });
  },

  handleAcrosticPoemInput: function(e) {
    this.setData({
      acrosticPoemInput: e.detail.value
    });
  },

  handlePersonalizedRequestInput: function(e) {
    this.setData({
      personalizedRequest: e.detail.value
    });
  }
});



// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {

//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad(options) {

//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady() {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow() {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide() {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload() {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh() {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom() {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage() {

//   }
// })