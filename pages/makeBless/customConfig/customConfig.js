// pages/customConfig/customConfig.js
const app = getApp();

Page({
  data: {
    sceneId: 0,
    scene: [
      {
        sceneName: '家庭场景',
        target:['我的父母','我的晚辈','我的配偶','我的兄弟姐妹','我的爷爷奶奶','我的亲戚'],
        style:['慈爱','关怀','尊敬','支持','理解','友好','感激'],
      },
      {
        sceneName: '校园场景',
        target:['我的同学','我的导师','我的学弟学妹','我的学长学姐','我的研究伙伴'],
        style:['恶搞','鼓励','友谊','求知','友好','感激'],
      },
      {
        sceneName: '办公场景',
        target:['我的同事','我的上级领导','我的下属员工','我的团队成员','我的跨部门合作伙伴','我的客户'],
        style:['团队','职业','合作','友好','感激','创新'],
      },
      {
        sceneName: '商务场景',
        target:['我的客户','我的供应商','我的合作伙伴','我的投资者','我的行业同行','我的顾问'],
        style:['业务','合作','专业','友好','感激'],
      },
      {
        sceneName: '通用场景',
        target:['我的朋友','我的熟人','其他'],
        style:['友好','感激'],
      }
    ],
    selectedTargetIndex: 0,
    blessingForms: ["藏头诗风格", "对联风格", "普通风格"],
    selectedBlessingFormIndex: 0,
    selectedBlessingStyleIndex: 0,
    acrosticPoemInput: "",
    personalizedRequest: ""
  },
  onLoad: function() {
    // 从全局变量获取sceneId并更新页面的sceneId
    this.setData({
      sceneId: app.globalData.UserConfig.sceneId,
      selectedBlessingFormIndex: app.globalData.UserConfig.formInex,
      selectedBlessingStyleIndex: app.globalData.UserConfig.StyleIndex
    });
  },
  handleTargetChange: function(e) {
    this.setData({
      selectedTargetIndex: e.detail.value
    });
  },

  handleBlessingFormChange: function(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      selectedBlessingFormIndex: index
    });
    // 更新全局数据
    app.globalData.UserConfig.formInex = index;
    app.globalData.UserConfig.form = this.data.blessingForms[index];
    console.log('选择祝福形式：' + this.data.blessingForms[index]);
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
  },

  handlePersonalizedRequestInput: function(e) {
    this.setData({
      personalizedRequest: e.detail.value
    });
  }
});
